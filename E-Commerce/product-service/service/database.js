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
        console.log('(Product-service) Connection database success.');
        await sequelize.sync();
    } catch (error) {
        console.error('(Product-service) Unable to connect to the database:', error);
    }
}

const Products = () => {
    const product = sequelize.define(
        'products',
        {
            id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
            brand_name: { type: Sequelize.STRING, allowNull: false },
            model_name: { type: Sequelize.STRING, allowNull: false },
            size: { type: Sequelize.REAL, allowNull: false },
            color: { type: Sequelize.STRING, allowNull: false },
            price: { type: Sequelize.REAL, allowNull: false },
        },
        {
            tableName: 'Product',
            timestamps: false
        }
    );
    return product
}

module.exports = { sequelize, DatabaseConnect, Products }