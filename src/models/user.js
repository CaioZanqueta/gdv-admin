import Sequelize, { Model } from "sequelize";
import { createPasswordHash, checkPassword } from "../services/auth";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        initials: {
          type: Sequelize.VIRTUAL,
          get() {
            const match = this.name.split(" ");
            if (match.length > 1) {
              return `${match[0][0]}${match[match.length - 1][0]}`;
            } else {
              return match[0][0];
            }
          },
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        google_id: Sequelize.STRING,
        role: Sequelize.ENUM("admin", "manager", "developer"),
        status: Sequelize.ENUM("active", "archived"),
      },
      {
        sequelize,
        name: {
          singular: "user",
          plural: "users",
        },
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await createPasswordHash(user.password);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Project);
    this.hasMany(models.Task);
    this.hasMany(models.Ticket, { foreignKey: 'userId' });
    this.hasMany(models.Comment, { foreignKey: 'user_id' }); // <<-- ADICIONADO
  }

  checkPassword(password) {
    if (!this.password_hash) {
      return false;
    }
    return checkPassword(this, password);
  }
}

export default User;