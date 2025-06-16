-- Enable the uuid-ossp extension (run once)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Correct table creation
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  emial VARCHAR(250) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  customer_id VARCHAR(255) UNIQUE,
  price_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pdf_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR(255) NOT NULL,
  original_file_url TEXT NOT NULL,
  summary_text TEXT NOT NULL ,
  status VARCHAR(255) DEFAULT 'completed',
  title text,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount INTEGER NOT NULL,
  status VARCHAR(255) NOT NULL,
  stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
  price_id VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL REFERENCES users(email),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
);

-- creted update_AT tigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURN TRIGGER AS $$
BEGIN 
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggeres to the update updated_at
CREATE TRIGGER update_users_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdf_summries_updated_at 
      BEFORE UPDATE ON pdf_summaries
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at 
      BEFORE UPDATE ON payment
      FOR EACH ROW 
      EXECUTE FUNCTION update_updated_at_column();