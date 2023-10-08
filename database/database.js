import SQLite from 'react-native-sqlite-storage';

const DATABASE_NAME = 'money.db';

const SQL = 'CREATE TABLE wallets ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount FLOAT, icon TEXT ); CREATE TABLE expense_type ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT ); CREATE TABLE expenses ( id INTEGER PRIMARY KEY AUTOINCREMENT, expense_type_id INTEGER REFERENCES expense_type(id), amount FLOAT, date DATE ); CREATE TABLE add_type ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT ); CREATE TABLE additives ( id INTEGER PRIMARY KEY AUTOINCREMENT, add_type_id INTEGER REFERENCES add_type(id), amount FLOAT, date DATE ); CREATE TABLE debt ( id INTEGER PRIMARY KEY AUTOINCREMENT, creditor TEXT, amount FLOAT, due_date DATE ); CREATE TABLE savings ( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, amount FLOAT, last_updated DATE, percentage DECIMAL );';


// GENERAL FUNCTIONS
export const init = () => {
  const db = SQLite.openDatabase(
    {
      name: DATABASE_NAME,
      location: 'default',
    },
    () => {
      db.executeSql('SELECT 1 FROM wallets LIMIT 1', [], () => {
      },
      () => {
        createTables(db);
      });
    },
    error => {
      console.error('Error opening or creating database: ', error);
    }
  );

  return db;
}

const createTables = (db) => {
  try {
    const statements = SQL.split(';').filter(Boolean);
    for (const statement of statements) {
      executeQuery(db,statement);
    }
    addWallet("Example Wallet", 0, 'icon1.png');
    addExpenseType('Miscellaneous', 'icon1.png');
    addAdditiveType('Miscellaneous', 'icon1.png');
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables: ', error);
  }
};

export const openDatabase = () => {return SQLite.openDatabase({name: DATABASE_NAME, location: 'default'})}

export const executeQuery = (db, query, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const read = (tableName) => {
  const db = openDatabase();

  const data = new Promise((resolve, reject) => {
    executeQuery(db, 'SELECT * FROM '+tableName, [])
      .then(result => {
        let items=[];
        for (let i = 0; i < result.rows.length; i++){
          items.push(result.rows.item(i));
        }
        resolve(items);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

  return data;
};


// WALLET FUNCTIONS
export const addWallet=(name, amount, icon)=>{
  const db = openDatabase();
  return executeQuery(db, 'INSERT INTO wallets(name, amount, icon) VALUES(?,?,?);', [name, amount, icon]);
};

export const deleteWallet = (id) => {
  const db = openDatabase();
  return executeQuery(db, 'DELETE FROM wallets WHERE id=?',[id]);
}

export const updateWallet = (id, name, amount, icon) => {
  const db = openDatabase();
  return executeQuery(db, 'UPDATE wallets SET name=?, amount=?, icon=? WHERE id=?',[name, amount, icon, id]);
}

// EXPENSE-TYPE FUNCTIONS
export const addExpenseType=(name, icon)=>{
  const db = openDatabase();
  return executeQuery(db, 'INSERT INTO expense_type(name, icon) VALUES(?,?);', [name, icon]);
};

export const deleteExpenseType = (id) => {
  const db = openDatabase();

  // SETS THE EXPENSE TYPE TO ID=1 AS DEFAULT, ID=1 EXPENSE_TYPE SHOULD NOT BE DELETED
  executeQuery(db, 'UPDATE expenses SET expense_type_id=1 WHERE expense_type_id=?',[id])
  .then(() => {
    return executeQuery(db, 'DELETE FROM expense_type WHERE id=?',[id])
  }).catch(error => {
    console.log(error)
    return reject(error);
  })
}

export const updateExpenseType = (id, name, icon) => {
  const db = openDatabase();
  return executeQuery(db, 'UPDATE expense_type SET name=?, icon=? WHERE id=?',[name, icon, id]);
}

// EXPENSE FUNCTIONS
export const addExpenses=(typeId, amount, date)=>{
  const db = openDatabase();
  //date format: YYYY-MM-DD
  return executeQuery(db, 'INSERT INTO expenses(expense_type_id, amount, date) VALUES(?, ?, ?);', [typeId, amount, date]);
};

export const deleteExpenses = (id) => {
  const db = openDatabase();
  return executeQuery(db, 'DELETE FROM expenses WHERE id=?',[id]);
}

export const updateExpenses = (id, typeId, amount, date) => {
  const db = openDatabase();
  //date format: YYYY-MM-DD
  return executeQuery(db, 'UPDATE expenses SET expense_type_id=?, amount=?, date=? WHERE id=?',[typeId, amount, date, id]);
}

// ADDITIVE TYPE FUNCTIONS
export const addAdditiveType=(name, icon)=>{
  const db = openDatabase();
  return executeQuery(db, 'INSERT INTO add_type(name, icon) VALUES(?,?);', [name, icon]);
};

export const deleteAdditiveType = (id) => {
  const db = openDatabase();

  // SETS THE ADDITIVE TYPE TO ID=1 AS DEFAULT, ID=1 ADD_TYPE SHOULD NOT BE DELETED
  executeQuery(db, 'UPDATE additives SET add_type_id=1 WHERE add_type_id=?',[id])
  .then(() => {
    return executeQuery(db, 'DELETE FROM add_type WHERE id=?',[id])
  }).catch(error => {
    console.log(error)
    return reject(error);
  })
}

export const updateAdditiveType = (id, name, icon) => {
  const db = openDatabase();
  return executeQuery(db, 'UPDATE add_type SET name=?, icon=? WHERE id=?',[name, icon, id]);
}

// ADDITIVES FUNCTIONS
export const addAdditive=(typeId, amount, date)=>{
  const db = openDatabase();
  //date format: YYYY-MM-DD
  return executeQuery(db, 'INSERT INTO additives(add_type_id, amount, date) VALUES(?, ?, ?);', [typeId, amount, date]);
};

export const deleteAdditive = (id) => {
  const db = openDatabase();
  return executeQuery(db, 'DELETE FROM additives WHERE id=?',[id]);
}

export const updateAdditive = (id, typeId, amount, date) => {
  const db = openDatabase();
  //date format: YYYY-MM-DD
  return executeQuery(db, 'UPDATE additives SET add_type_id=?, amount=?, date=? WHERE id=?',[typeId, amount, date, id]);
}

// DEBT FUNCTIONS
export const addDebdtNoDate=(creditor, amount)=>{
  const db = openDatabase();
  return executeQuery(db, 'INSERT INTO debt(creditor, amount) VALUES(?, ?);', [creditor, amount]);
};

export const addDebdtDueDate=(creditor, amount, due_date)=>{
  const db = openDatabase();
  //date format: YYYY-MM-DD
  return executeQuery(db, 'INSERT INTO debt(creditor, amount, due_date) VALUES(?, ?, ?);', [creditor, amount, due_date]);
};

export const updateDebtNoDate=(id, creditor, amount) => {
  const db = openDatabase();
  return executeQuery(db, 'UPDATE debt SET creditor=?, amount=? WHERE id=?',[creditor, amount, id]);
}

export const updateDebtDueDate=(id, creditor, amount, due_date) => {
  const db = openDatabase();
  return executeQuery(db, 'UPDATE debt SET creditor=?, amount=?, due_date=? WHERE id=?',[creditor, amount, due_date, id]);
}

export const deleteDebt = (id) => {
  const db = openDatabase();
  return executeQuery(db, 'DELETE FROM debt WHERE id=?',[id]);
}