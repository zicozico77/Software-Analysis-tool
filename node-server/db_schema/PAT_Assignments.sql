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
-- Table structure for table `Assignments`
--

DROP TABLE IF EXISTS `Assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Assignments` (
  `ID` varchar(125) NOT NULL,
  `CourseCode` varchar(8) NOT NULL,
  `Comments` text,
  `StartDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DueDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TotalMarks` float NOT NULL,
  `Weight` float NOT NULL,
  `SpecFilePath` varchar(255) DEFAULT NULL,
  `ExtraFilePath` varchar(255) DEFAULT NULL,
  `CkjmMetrics` varchar(255) DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  `Active` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Assignments`
--

LOCK TABLES `Assignments` WRITE;
/*!40000 ALTER TABLE `Assignments` DISABLE KEYS */;
INSERT INTO `Assignments` VALUES ('AWM-IBcEV9_odTcKf-M2','CSSE2002','<p>fleflkwejfkl</p>','2018-05-08 05:30:55','2018-05-08 05:30:01',100,25,'/files/assignments/AWM-IBcEV9_odTcKf-M2/spec.pdf','/files/assignments/AWM-IBcEV9_odTcKf-M2/extra.zip', '', 'Assignmnet 3', '1'),('AWM49PiYV9_odTcKf-Mg','CSSE2002','<p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p><br></p>','2018-05-07 04:00:25','2018-05-13 04:30:30',100,25,'/files/assignments/AWM49PiYV9_odTcKf-Mg/spec.pdf','/files/assignments/AWM49PiYV9_odTcKf-Mg/extra.zip', '', 'Assignment 2', '1'),('AWM4dFb_V9_odTcKf-LN','CSSE2002','test program','2018-05-06 16:00:17','2018-05-12 16:00:24',100,25,'/files/assignments/AWM4dFb_V9_odTcKf-LN/spec.pdf',NULL, '', 'Assignment 1', '1'),('AWNX-s3AV9_odTcKf-NS','CSSE2002','<p>nice</p>','2018-05-13 05:30:31','2018-05-13 05:30:34',100,25,'/files/assignments/AWNX-s3AV9_odTcKf-NS/spec.pdf',NULL,'', 'test integrate', '1');
/*!40000 ALTER TABLE `Assignments` ENABLE KEYS */;
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
