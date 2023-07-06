CREATE TABLE IF NOT EXISTS short_links
(
    short_link TEXT NOT NULL,
    long_link  TEXT NOT NULL,
    PRIMARY KEY (short_link)
);