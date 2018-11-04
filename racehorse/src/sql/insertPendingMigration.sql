create table if not exists ${schema~}.migrations
(
    id serial primary key,
    category text not null,
    environment text,
    version text not null unique,
    description text not null,
    checksum text not null,
    success boolean default false,
    created_at timestamp with time zone not null,
    modified_at timestamp with time zone not null
)
