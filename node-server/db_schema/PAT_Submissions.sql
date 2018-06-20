-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: PAT
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Submissions`
--

DROP TABLE IF EXISTS `Submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Submissions` (
  `ID` varchar(25) NOT NULL,
  `StudentID` varchar(25) NOT NULL,
  `Version` int(11) NOT NULL DEFAULT '1',
  `Scanned` tinyint(4) DEFAULT '0',
  `Marked` tinyint(4) DEFAULT '0',
  `Result` float DEFAULT '0',
  `Path` varchar(255) DEFAULT NULL,
  `LastSubmited` datetime NOT NULL,
  `AssignmentID` varchar(25) NOT NULL,
  `Comments` longtext,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `StudentID_UNIQUE` (`StudentID`),
  KEY `AssignmentID_idx` (`AssignmentID`),
  CONSTRAINT `AssignmentID` FOREIGN KEY (`AssignmentID`) REFERENCES `Assignments` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Submissions`
--

LOCK TABLES `Submissions` WRITE;
/*!40000 ALTER TABLE `Submissions` DISABLE KEYS */;
INSERT INTO `Submissions` VALUES ('CSSE2002_test_integrate_1','1',2,1,1,60,'/files/submissions/CSSE2002_test_integrate_1/','2018-05-13 15:41:47','AWNX-s3AV9_odTcKf-NS','<p>good job!!!<strong>hey</strong></p>');
/*!40000 ALTER TABLE `Submissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-13 20:12:30
