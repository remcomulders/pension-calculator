CREATE TABLE IF NOT EXISTS pension_account (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(255) NOT NULL,
    current_investment_value BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS participant (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    full_time_salary BIGINT NOT NULL,
    part_time_percentage NUMERIC(5, 2) NOT NULL,
    is_employed BOOLEAN NOT NULL,
    pension_account_id INTEGER,
    FOREIGN KEY (pension_account_id) REFERENCES pension_account (id)
);
