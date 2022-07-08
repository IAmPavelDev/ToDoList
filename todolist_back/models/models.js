const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
	email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
});

const List = sequelize.define("list", {
    listId: { type: DataTypes.INTEGER, primaryKey: true, unique: true}
});

const item = sequelize.define("item", {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: {type: DataTypes.STRING},
    main: {type: DataTypes.STRING}
});

List.hasMany(item);
item.belongsTo(List)

User.hasOne(List);
List.belongsTo(User);

module.exports = {
    User,
    List,
    item
}
