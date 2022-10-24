import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  // declare <campo>: <tipo>;
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string;
}

User.init({
  // ... Campos
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  username: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  tableName: 'users',
  // modelName: 'example',
  modelName: 'User',
  timestamps: false,
});

export default User;
