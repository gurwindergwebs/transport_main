"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminEmail = "admin@topntech.com";

    const existingUser = await queryInterface.rawSelect(
      "Users",
      {
        where: { email: adminEmail },
      },
      ["id"]
    );

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("root1234", 10);

      await queryInterface.bulkInsert("Users", [
        {
          username: "admin",
          email: adminEmail,
          password: hashedPassword,
          role: "ADMIN",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      console.log("Admin user created!");
    } else {
      console.log("Admin user already exists. Skipping seeder...");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Users",
      { email: "admin@topntech.com" },
      {}
    );
  },
};
