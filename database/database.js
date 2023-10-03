import SQLite from 'react-native-sqlite-storage';

const DATABASE_NAME = 'money.db';

const SQL = 'CREATE TABLE wallets ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, amount FLOAT, icon TEXT ); CREATE TABLE expense_type ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT ); CREATE TABLE expenses ( id INTEGER PRIMARY KEY AUTOINCREMENT, expense_type_id INTEGER REFERENCES expense_type(id), amount FLOAT, date DATE ); CREATE TABLE add_type ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT ); CREATE TABLE additives ( id INTEGER PRIMARY KEY AUTOINCREMENT, add_type_id INTEGER REFERENCES add_type(id), amount FLOAT, date DATE ); CREATE TABLE debt ( id INTEGER PRIMARY KEY AUTOINCREMENT, creditor TEXT, amount FLOAT, due_date DATE ); CREATE TABLE savings ( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, amount FLOAT, last_updated DATE, percentage DECIMAL );';

const createTables = (db) => {
  try {
    const statements = SQL.split(';').filter(Boolean);
    for (const statement of statements) {
      executeQuery(db,statement);
    }
    addWallet("Example Wallet", 0, 'icon1.png');
    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables: ', error);
  }
};

const init = () => {
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

const openDatabase = () => {return SQLite.openDatabase({name: DATABASE_NAME, location: 'default'})}

const executeQuery = (db, query, params = []) => {
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

const addWallet=(name, amount, icon)=>{
  const db = openDatabase();
  return executeQuery(db, 'INSERT INTO wallets(name, amount, icon) VALUES(?,?,?);', [name, amount, icon]);
};

const readWallets = () => {
  const db = openDatabase();

  const wallets = new Promise((resolve, reject) => {
    executeQuery(db, 'SELECT * FROM wallets', [])
      .then(result => {
        let items=[];
        for (let i = 0; i < result.rows.length; i++){
          items.push(result.rows.item(i));
        }
        resolve(items);
      })
      .catch(error => {
        console.log(error)
        reject(error);
      });
  });

  return wallets;
};


export { openDatabase, addWallet, createTables, readWallets, init };
