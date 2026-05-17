const { connectMySQL } = require('./db.js');

async function initMySQL() {
  try {
    const db = await connectMySQL();

    await db.query(`
      CREATE TABLE IF NOT EXISTS goals (
        id_ INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT not null,
        duedate DATETIME not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id_ INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT not null,
        duedate DATETIME not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        `);

        console.log('Tablas de MySQL verificadas');
    return db;
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
    throw error;
  }
}

module.exports = initMySQL;