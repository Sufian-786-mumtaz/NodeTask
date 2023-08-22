-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 22, 2023 at 10:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodeTask`
--

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `stock_ids` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `sku`, `stock_ids`, `createdAt`, `updatedAt`) VALUES
(76, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(77, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(78, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(79, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(80, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(81, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(82, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(83, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(84, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(85, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(86, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(87, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54'),
(88, NULL, NULL, '2023-08-22 18:46:54', '2023-08-22 18:46:54');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `refreshToken` varchar(255) NOT NULL,
  `user` int(11) NOT NULL,
  `type` enum('AUTH','REFRESH') NOT NULL,
  `expires` datetime NOT NULL,
  `blacklisted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `token`, `refreshToken`, `user`, `type`, `expires`, `blacklisted`, `createdAt`, `updatedAt`) VALUES
(56, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMyLCJpYXQiOjE2OTI3Mjk5NTgsImV4cCI6MTY5MjczMTc1OCwidHlwZSI6IkFDQ0VTUyJ9.ZwklYr7JQZPGmZcmzR551_brF1sS3oKsWacOUngDseo', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMyLCJpYXQiOjE2OTI3Mjk5NTgsImV4cCI6MTY5NTMyMTk1OCwidHlwZSI6IlJFRlJFU0gifQ.Hp2K5QYlElDrOYvS86amfT-RIs_c_UixloAPdL31PDg', 32, 'AUTH', '2023-08-22 19:15:58', 0, '2023-08-22 18:45:58', '2023-08-22 18:45:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `isSignedIn` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phoneNumber`, `isSignedIn`, `createdAt`, `updatedAt`) VALUES
(32, 'safyan mumtaz', 'safyanmumtaz@gmail.com', '$2a$10$p9BFr0xD4HL8xFgaQsKmp.VX7kohz04JbTz4j6zMq3CUPKaenJXhi', '03064570107', 0, '2023-08-22 18:45:58', '2023-08-22 18:45:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
