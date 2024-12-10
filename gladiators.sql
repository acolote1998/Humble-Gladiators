-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 05:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gladiatorsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `gladiators`
--

CREATE TABLE `gladiators` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `level` int(10) UNSIGNED DEFAULT 1,
  `somatotype` varchar(50) NOT NULL,
  `height` int(10) UNSIGNED NOT NULL,
  `weight` int(10) UNSIGNED NOT NULL,
  `constitution` int(10) UNSIGNED NOT NULL,
  `dexterity` int(10) UNSIGNED NOT NULL,
  `strength` int(10) UNSIGNED NOT NULL,
  `speed` int(10) UNSIGNED NOT NULL,
  `luck` int(10) UNSIGNED NOT NULL,
  `maxHP` int(10) UNSIGNED NOT NULL,
  `hp` int(11) NOT NULL,
  `localvictories` int(10) UNSIGNED DEFAULT 0,
  `onlineVictories` int(10) UNSIGNED DEFAULT 0,
  `totalVictories` int(10) UNSIGNED DEFAULT 0,
  `defeatedEnemies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `diedAgainst` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `critic` tinyint(1) DEFAULT 0,
  `focused` tinyint(1) DEFAULT 0,
  `weapon` varchar(50) NOT NULL,
  `weaponSRC` varchar(255) NOT NULL,
  `bodySRC` varchar(255) NOT NULL,
  `headSRC` varchar(255) NOT NULL,
  `weaponURL` varchar(255) NOT NULL,
  `bodyURL` varchar(255) NOT NULL,
  `headURL` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gladiators`
--

INSERT INTO `gladiators` (`id`, `username`, `name`, `level`, `somatotype`, `height`, `weight`, `constitution`, `dexterity`, `strength`, `speed`, `luck`, `maxHP`, `hp`, `localvictories`, `onlineVictories`, `totalVictories`, `defeatedEnemies`, `diedAgainst`, `critic`, `focused`, `weapon`, `weaponSRC`, `bodySRC`, `headSRC`, `weaponURL`, `bodyURL`, `headURL`) VALUES
(96090309, 'Test', 'Dracon', 1, 'Mesomorph', 200, 100, 18, 20, 15, 15, 18, 108, 108, 0, 0, 0, '[]', '[]', 0, 0, 'Sword', 'img/weapons/sword.png', 'img/bodies/mesomorph/0.png', 'img/heads/03.png', 'url(\\\'img/weapons/sword.png\\\')', 'url(\\\'img/bodies/mesomorph/0.png\\\')', 'url(\\\'img/heads/03.png\\\')'),
(37141158, 'Test', 'Merciless', 1, 'Mesomorph', 200, 100, 18, 22, 21, 18, 18, 120, 120, 0, 0, 0, '[]', '[]', 1, 0, 'Sword', 'img/weapons/sword.png', 'img/bodies/mesomorph/5.png', 'img/heads/11.png', 'url(\\\'img/weapons/sword.png\\\')', 'url(\\\'img/bodies/mesomorph/5.png\\\')', 'url(\\\'img/heads/11.png\\\')'),
(25030249, 'Test', 'Brutus the Bold', 1, 'Mesomorph', 200, 100, 18, 18, 16, 18, 18, 108, 108, 0, 0, 0, '[]', '[]', 0, 0, 'Sword', 'img/weapons/sword.png', 'img/bodies/mesomorph/4.png', 'img/heads/02.png', 'url(\\\'img/weapons/sword.png\\\')', 'url(\\\'img/bodies/mesomorph/4.png\\\')', 'url(\\\'img/heads/02.png\\\')'),
(69802144, 'Test', 'Minerva', 1, 'Mesomorph', 200, 100, 18, 21, 20, 18, 18, 132, 132, 0, 0, 0, '[]', '[]', 0, 0, 'Sword', 'img/weapons/sword.png', 'img/bodies/mesomorph/4.png', 'img/heads/21.png', 'url(\\\'img/weapons/sword.png\\\')', 'url(\\\'img/bodies/mesomorph/4.png\\\')', 'url(\\\'img/heads/21.png\\\')');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gladiators`
--
ALTER TABLE `gladiators`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
