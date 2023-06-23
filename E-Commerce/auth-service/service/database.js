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
        console.log('(Auth-service) Connection database success.');
    } catch (error) {
        console.error('(Auth-service) Unable to connect to the database:', error);
    }
}

const UsersAccount = () => {
    const users_account = sequelize.define(
        'users_account',
        {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'id' },
            username: { type: Sequelize.STRING, allowNull: false, field: 'username' },
            password: { type: Sequelize.STRING, allowNull: false, field: 'password' },
            token: { type: Sequelize.STRING, allowNull: true, field: 'token' }
        },
        {
            tableName: 'User_Account',
            timestamps: false
        }
    );

    return users_account;
}


module.exports =
{
    sequelize, DatabaseConnect, UsersAccount
}