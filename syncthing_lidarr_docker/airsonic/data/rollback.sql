-- *********************************************************************
-- SQL to roll back currently unexecuted changes
-- *********************************************************************
-- Change Log: classpath:liquibase/db-changelog.xml
-- Ran at: 6/6/19 2:54 PM
-- Against: SA@jdbc:hsqldb:file:/airsonic/data/db/airsonic
-- Liquibase version: 3.6.3
-- *********************************************************************

-- Lock Database
UPDATE DATABASECHANGELOGLOCK SET LOCKED = TRUE, LOCKEDBY = '51fd72d01dad (172.23.0.5)', LOCKGRANTED = '2019-06-06 14:54:49.103' WHERE ID = 1 AND LOCKED = FALSE;

-- Release Database Lock
UPDATE DATABASECHANGELOGLOCK SET LOCKED = FALSE, LOCKEDBY = NULL, LOCKGRANTED = NULL WHERE ID = 1;

