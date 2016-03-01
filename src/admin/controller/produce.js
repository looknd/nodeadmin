'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }

    /**
     * 获得数据库表 think_produce 中所有的用户信息
     * 
     * @return {object} JSON 格式数据
     */
    async getdataAction() {
        // 查询数据库，获取所有的用户信息
        let data = await this.model('produce').order({
            id: "DESC",
        }).select();

        // 为了最后的显示，进行数据处理
        data = data.map(item => {

            // 为表格中的每一行增加id：DT_RowId，以便后续方便操作
            item.DT_RowId = 'row_' + item.id;

            if (item.state < 0) {
                // 为表格中的无效数据增加样式：DT_RowClass，默认值有'active', 'success', 'warning', 'danger'，也可以自定义
                item.DT_RowClass = 'warning';
                item.stateShow = '无效';
            } else {
                item.stateShow = '有效';
            }

            return item;
        });

        // 成功返回
        return this.success(data);
    }

    /**
     * 新增数据到数据库表 think_produce 中
     * 
     * @return {object} JSON 格式数据
     */
    addAction() {
        // 获取参数
        let {
            tableName, targetName, targetDesc, menuId, breadcrumb, state
        } = this.post();

        let record = {
            tableName: tableName,
            targetName: targetName,
            targetDesc: targetDesc,
            menuId: menuId,
            state: state,
            breadcrumb: breadcrumb
        };

        // 参数校验，在logic中已完成

        // 保存
        return this._save(record);

    }

    /**
     * 修改数据到数据库表 think_produce 中
     * 
     * @return {object} JSON 格式数据
     */
    modifyAction() {
        // 获取参数
        let {
            id, tableName, targetName, targetDesc, menuId, breadcrumb, state
        } = this.post();


        let record = {
            id: id,
            // tableName: tableName, // TODO 不能修改的值则这里就不需要赋值了。
            targetName: targetName,
            targetDesc: targetDesc,
            menuId: menuId,
            state: state,
            breadcrumb: breadcrumb
        };

        // 参数校验，在logic中已完成

        // 保存
        return this._save(record);

    }

    /**
     * 从数据库表 think_produce 中删除一条记录
     *
     * @return {object} JSON 格式数据
     */
    async deleteAction() {
        // 获取参数
        let id = this.post('id');
        let model = this.model('produce');

        // 参数校验，在logic中已完成

        // TODO 检查外键情况，查询是否有其他的数据表有用到该数据

        // 删除
        let affectedRows = await model
            .where({
                id: id
            })
            .delete()
            .catch(err => {
                return this.fail(err.message || 'error')
            });

        // 处理返回结果
        if (affectedRows) {
            return this.success({
                _type: 'delete',
                affectedRows: affectedRows,
                id: id
            });
        } else {
            return this.fail('delete failed!', {
                _type: 'delete',
                id: id
            });
        }
    }

    /**
     * 保存数据
     */
    async _save(record) {
        let {
            id, tableName
        } = record;

        let model = this.model('produce');


        if (!id) {
            // 新增，同时保证 tableName 值不重复
            let result = await model
                .thenAdd(record, {
                    tableName: tableName
                })
                .catch(err => {
                    return this.fail(err.message || 'error');
                });

            // 处理返回结果
            if (result.type === 'add') {

                return this.success({
                    _type: result.type,
                    record
                });
            } else {
                return this.fail('already exist same tableName!', {
                    _type: result.type,
                    record
                });
            }
        } else {
            // 修改
            // TODO 修改的时候没考虑tableName重名情况，注意可以和自己重名，但不能和其他人重名
            let affectedRows = await model
                .where({
                    id: id
                })
                .update(record)
                .catch(err => {
                    return this.fail(err.message || 'error');
                });

            // 处理返回结果
            if (affectedRows) {
                return this.success({
                    _type: 'modify',
                    affectedRows: affectedRows,
                    record
                });
            } else {
                return this.fail('modify failed!', {
                    _type: 'modify',
                    record
                });
            }
        }
    }

}
