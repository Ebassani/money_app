CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    amount INTEGER,
    icon VARCHAR
);

CREATE TABLE expense_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    icon VARCHAR
);

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    expense_type_id INTEGER REFERENCES expense_type(id),
    amount INTEGER,
    date DATE
);

CREATE TABLE add_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    icon VARCHAR
);

CREATE TABLE additives (
    id SERIAL PRIMARY KEY,
    add_type_id INTEGER REFERENCES add_type(id),
    amount INTEGER,
    date DATE
);

CREATE TABLE debt (
    id SERIAL PRIMARY KEY,
    creditor VARCHAR,
    amount INTEGER,
    due_date DATE
);

CREATE TABLE savings (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    amount INTEGER,
    last_updated DATE,
    percentage DECIMAL
);
