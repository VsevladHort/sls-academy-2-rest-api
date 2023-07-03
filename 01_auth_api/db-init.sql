CREATE TABLE IF NOT EXISTS site_user (
    id_site_user UUID NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    user_pass VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_site_user)
);