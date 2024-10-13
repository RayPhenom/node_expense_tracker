const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',  
    user: 'root',       
    password: '',  
    database: 'expense_tracker'  
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});


const createTables = () => {
  const usersTable = `
    CREATE TABLE  Users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  const categoriesTable = `
    CREATE TABLE Categories (
      category_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      category_name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
    );
  `;

  const expensesTable = `
    CREATE TABLE  Expenses (
      expense_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      category_id INT,
      amount DECIMAL(10, 2) NOT NULL,
      date DATE NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
    );
  `;

  const paymentMethodsTable = `
    CREATE TABLE Payment_Methods (
      payment_method_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      payment_method_name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
    );
  `;

  const budgetsTable = `
    CREATE TABLE  Budgets (
      budget_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      category_id INT,
      amount DECIMAL(10, 2) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
    );
  `;

  connection.query(usersTable, (err, results) => {
    if (err) throw err;
    console.log('Users table created.');
  });

  connection.query(categoriesTable, (err, results) => {
    if (err) throw err;
    console.log('Categories table created.');
  });

  connection.query(expensesTable, (err, results) => {
    if (err) throw err;
    console.log('Expenses table created.');
  });

  connection.query(paymentMethodsTable, (err, results) => {
    if (err) throw err;
    console.log('Payment Methods table created.');
  });

  connection.query(budgetsTable, (err, results) => {
    if (err) throw err;
    console.log('Budgets table created.');
  });
};

createTables();

connection.end();
