CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user_addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  address VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);
ALTER TABLE users ADD INDEX idx_email (email);
ALTER TABLE user_addresses ADD INDEX idx_user_address (userId, address);

SELECT
  u.id,
  u.firstName,
  u.lastName,
  u.email,
  COUNT(ua.id) AS userAddressCount
FROM
  users u
LEFT JOIN
  user_addresses ua ON u.id = ua.userId
GROUP BY
  u.id, u.firstName, u.lastName, u.email;

SELECT
  t1.*
FROM
  table1 t1
LEFT JOIN
  table2 t2 ON t1.id = t2.table1_id
WHERE
  t2.table1_id IS NULL;

SELECT
  t2.*,
  COUNT(*) AS iteration
FROM
  table2 t2
GROUP BY
  t2.column1, t2.column2, 
HAVING
  COUNT(*) > 1;

