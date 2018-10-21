create table if not exists ${migrationTable~}
(
    id serial PRIMARY KEY,
    category text not null,
    environment text not null,
    version text not null unique,
    description text not null,
    checksum text not null,
    success boolean default false,
    created_at timestamp with time zone not null,
    modified_at timestamp with time zone not null
)
