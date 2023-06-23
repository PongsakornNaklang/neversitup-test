const { Sequelize } = require('sequelize');
const filepath = './db-service/ecom.db';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: filepath,
    dialectOptions: {
        timeout: 30000
    }
});

const DatabaseConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('(Order-service) Connection database success.');
        await sequelize.sync();
    } catch (error) {
        console.error('(Order-service) Unable to connect to the database:', error);
    }
}

const Orders = () => {
    const orders = sequelize.define(
        'orders',
        {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'User_Account', key: 'id' } },
            total_amount: { type: Sequelize.REAL, allowNull: false },
            created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
            status: { type: Sequelize.TEXT, defaultValue: 'pending' },
        },
        {
            tableName: 'Orders',
            timestamps: false
        }
    );
    return orders
}

const ProductInOrder = () => {
    const prod_in_order = sequelize.define(
        'product_in_order',
        {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            product_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Product', key: 'id' } },
            order_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Orders', key: 'id' } }
        },
        {
            tableName: 'Product_In_Order',
            timestamps: false
        }
    );
    return prod_in_order
}

module.exports = { sequelize, DatabaseConnect, Orders, ProductInOrder }