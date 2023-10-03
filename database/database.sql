CREATE TABLE wallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    amount FLOAT,
    icon TEXT
);

CREATE TABLE expense_type (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    icon TEXT
);

CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    expense_type_id INTEGER REFERENCES expense_type(id),
    amount FLOAT,
    date DATE
);

CREATE TABLE add_type (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    icon TEXT
);

CREATE TABLE additives (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    add_type_id INTEGER REFERENCES add_type(id),
    amount FLOAT,
    date DATE
);

CREATE TABLE debt (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    creditor TEXT,
    amount FLOAT,
    due_date DATE
);

CREATE TABLE savings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    amount FLOAT,
    last_updated DATE,
    percentage DECIMAL
);
