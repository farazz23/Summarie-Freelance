create table if not exists users (
  id UUID DEFAULT gen_random_uuid(),
  email VARCHAR(250)  UNIQUE not null,
  fullname varchar(250) not null,
  customer_id varchar(250) not null unique,
  price_id varchar(250) not null,
  status VARCHAR(50) DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


create table if not exists pdf_summaries (
  id UUID primary key default  gen_random_uuid(),
  user_id varchar(255) not null,
  original_file_url text not null,
  summary_text text not null,
  status varchar(255) default 'completed',
  title text,
  file_name text,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);


create table if not exists payment (
  id UUID primary key default gen_random_uuid(),
  amount integer not null,
  status varchar(255) not null,
  stripe_payment_id varchar(255) unique not null,
  price_id varchar(255) not null,
  user_email varchar(255) not null references users(email),
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

create or replace function update_updated_at_column()
returns trigger as $$
begin 
  new.updated_at = current_timestamp;
  return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at
    before update on users
    for each row
    execute function update_updated_at_column();

create trigger update_pdf_summaries_updated_at
    before update on pdf_summaries
    for each row
    execute function update_updated_at_column();

create trigger update_payments_updated_at
    before update on payment
    for each row
    execute function update_updated_at_column();