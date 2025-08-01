"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Admin User",
          email: "admin@kakautech.com",
          password_hash:
            "$2a$08$QkPpPHgYyxPcHlqLIIqCKuZ3NYFis7FoMDBLmceXV7/D/W3CBfMqG", // secret
          role: "admin",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Manager User",
          email: "manager@kakautech.com",
          password_hash:
            "$2a$08$QkPpPHgYyxPcHlqLIIqCKuZ3NYFis7FoMDBLmceXV7/D/W3CBfMqG", // secret
          role: "manager",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Dev User",
          email: "dev@kakautech.com",
          password_hash:
            "$2a$08$QkPpPHgYyxPcHlqLIIqCKuZ3NYFis7FoMDBLmceXV7/D/W3CBfMqG", // secret
          role: "developer",
          status: "active",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
