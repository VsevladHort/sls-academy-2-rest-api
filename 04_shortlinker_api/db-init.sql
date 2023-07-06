CREATE TABLE IF NOT EXISTS site_user
(
    short_link TEXT NOT NULL,
    long_link  TEXT NOT NULL,
    PRIMARY KEY (short_link)
);