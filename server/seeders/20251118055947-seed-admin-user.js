"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminEmail = "admin@topntech.com";

    // Check if admin already exists
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
          name: "Admin",
          email: adminEmail,
          phone: null, // optional
          tenant_id: null, // optional
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
