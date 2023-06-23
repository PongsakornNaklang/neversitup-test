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
        console.log('(User-service) Connection database success.');
    } catch (error) {
        console.error('(User-service) Unable to connect to the database:', error);
    }
}

const Users = () => {
    const users = sequelize.define(
        'users',
        {
            id: { type: Sequelize.INTEGER, primaryKey: true, references: 'User_Account', referencesKey: 'id' },
            firstname: { type: Sequelize.STRING, allowNull: false, field: 'firstname' },
            lastname: { type: Sequelize.STRING, allowNull: false, field: 'lastname' },
            address: { type: Sequelize.STRING, allowNull: true, field: 'address' },
            email: { type: Sequelize.STRING, allowNull: false, field: 'email' },
            phone: { type: Sequelize.STRING, allowNull: true, field: 'phone' },
        },
        {
            tableName: 'User',
            timestamps: false
        }
    );

    return users;
}

module.exports =
{
    sequelize, DatabaseConnect, Users
}