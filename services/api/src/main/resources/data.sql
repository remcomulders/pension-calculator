-- Clear data in the dependent (child) table first
DELETE FROM participant;
DELETE FROM pension_account;

-- Insert data into the parent table (pension_account)
INSERT INTO pension_account (id, account_number, current_investment_value) VALUES 
(1, 'ACC123456', 10000000),
(2, 'ACC789012', 7500000),
(3, 'ACC345678', 12000000);

-- Insert data into the dependent (child) table (participant) with references to pension_account
INSERT INTO participant (id, name, birth_date, email, full_time_salary, part_time_percentage, is_employed, pension_account_id) VALUES 
(1, 'John Doe', '1964-05-10', 'johndoe@befrank.nl', 6000000, 0.80, true, 1),
(2, 'Jane Smith', '1970-08-24', 'janesmith@befrank.nl', 5000000, 1.00, true, 2),
(3, 'Emily Brown', '1980-11-15', 'emilybrown@befrank.nl', 5500000, 0.60, false, 3);
