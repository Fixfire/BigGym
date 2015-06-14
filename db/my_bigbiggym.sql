-- phpMyAdmin SQL Dump
-- version 4.1.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Giu 14, 2015 alle 15:03
-- Versione del server: 5.1.71-community-log
-- PHP Version: 5.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `my_bigbiggym`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `awards`
--

CREATE TABLE IF NOT EXISTS `awards` (
  `Id_Instructor` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Year` int(4) NOT NULL,
  `HasImg` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id_Instructor`,`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `awards`
--

INSERT INTO `awards` (`Id_Instructor`, `Name`, `Year`, `HasImg`) VALUES
(1, 'Best Personal Trainer & Educator of the USA', 1996, 0),
(1, 'Bronze Medal Woman Weight at Los Angeles XXIII Olympic Games', 1984, 1),
(1, 'Personal Trainer of the Year (New York)', 1985, 0),
(1, 'Personal Trainer of the Year (Newport News)', 1995, 0),
(2, 'EHS Sport achievements', 2009, 0),
(2, 'Ellensburg''s Worker Gold prize', 2013, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `client`
--

CREATE TABLE IF NOT EXISTS `client` (
  `CardNumber` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Surname` varchar(100) NOT NULL,
  `Appellative` enum('Mr.','Mrs.','Miss') NOT NULL,
  `BirthDate` date NOT NULL,
  `Address` varchar(255) NOT NULL,
  `City` varchar(45) NOT NULL,
  `ZIP` int(11) NOT NULL,
  `Country` varchar(255) NOT NULL,
  `State` varchar(255) NOT NULL,
  `PhoneNumber` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `IsStudent` bit(1) NOT NULL,
  `MedicalOk` bit(1) NOT NULL,
  `HasPaid` bit(1) NOT NULL,
  `Weight` int(11) NOT NULL,
  `Height` int(11) NOT NULL,
  PRIMARY KEY (`CardNumber`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dump dei dati per la tabella `client`
--

INSERT INTO `client` (`CardNumber`, `Name`, `Surname`, `Appellative`, `BirthDate`, `Address`, `City`, `ZIP`, `Country`, `State`, `PhoneNumber`, `Email`, `IsStudent`, `MedicalOk`, `HasPaid`, `Weight`, `Height`) VALUES
(2, 'Zanella', 'Michele', 'Mr.', '0000-00-00', 'Corridoni', 'Fagnano Olona', 21054, 'Varese', 'Italia', 1234455, 'zanella.michele@gmail.com', b'0', b'0', b'1', 78, 180);

-- --------------------------------------------------------

--
-- Struttura della tabella `contacts`
--

CREATE TABLE IF NOT EXISTS `contacts` (
  `Name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Tel` varchar(20) NOT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `contacts`
--

INSERT INTO `contacts` (`Name`, `Email`, `Tel`) VALUES
('General info', 'info@biggym.com', '+1 757-599-1888'),
('Sponsor request', 'sponsor@biggym.com', '+1 757-599-1889'),
('External collaboration', 'collaboration@biggym.com', '+1 757-599-1810'),
('Personal scheduling management', 'course@biggym.com', '+1 757-599-1811');

-- --------------------------------------------------------

--
-- Struttura della tabella `course`
--

CREATE TABLE IF NOT EXISTS `course` (
  `Name` varchar(150) NOT NULL,
  `Level` enum('beginner','intermediate','advanced') NOT NULL,
  `Target` varchar(4255) NOT NULL,
  `Category` varchar(45) NOT NULL,
  `Description` varchar(10000) NOT NULL,
  `ShortDescription` varchar(1000) NOT NULL,
  `Room` int(11) NOT NULL,
  PRIMARY KEY (`Name`),
  KEY `Room_idx` (`Room`),
  KEY `Category_idx` (`Category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `course`
--

INSERT INTO `course` (`Name`, `Level`, `Target`, `Category`, `Description`, `ShortDescription`, `Room`) VALUES
('AquaFitness', 'beginner', 'all type of athlets', 'WaterFitness', 'AquaFitness is the performance of aerobic exercise in fairly shallow water such as in a swimming pool. Done mostly vertically and without swimming typically in waist deep or deeper water, it is a type of resistance training. AquaFitness is a form of aerobic exercise that requires water-immersed participants. Most AquaFitness is in a group fitness class setting with a trained professional teaching for about an hour. \r\n\r\nSpecific activity , aimed at toning the upper limbs , lower limbs , abdomen , buttocks and trunk muscles . The use of special equipment ( gloves , dumbbells , tubes , etc. ) increases the workload .', 'AquaFitness is the performance of aerobic exercise in fairly shallow water such as in a swimming pool. Done mostly vertically and without swimming.', 1),
('Beat', 'intermediate', 'experienced athlets that want to suerpass their limits', 'Aerobics', 'BEAT is a highly motivating heart rate based training class, tailor made for optimising every workout.\r\nIf you want to achieve results this is class for you.\r\neart rate based training optimises your workouts by ensuring you always train at the right intensity level for you and our experts are on hand in every session. You can track and monitor your progress and we can guarantee the quality of your workout, as everyone works out at their own personal best.\r\n\r\nThe class is complete with innovative equipment which can be used between sessions also allowing you to train your own way, it’s up to you. \r\n\r\nThe only competition is with yourself.', 'Beat is a highly motivating heart rate based training class, tailor made for optimising every workout.\r\nIf you want to achieve results this is class for you.', 2),
('Step', 'beginner', 'all type of athlets', 'Aerobics', 'Step aerobics is a form of aerobic power distinguished from other types of aerobic exercise by its use of an elevated platform (the step). The height can be tailored to individual needs by inserting risers under the step. Step aerobics classes are offered at many gyms and fitness centers which have a group exercise program.\r\n\r\nStep aerobics was innovated by Gin Miller around 1989. After a knee injury, Gin consulted with an orthopedic doctor, who recommended she strengthen the muscles supporting the knee by stepping up and down on a milk crate and from this she developed the step regimen.\r\n\r\nStep aerobics can also be involved in dancing games, such as Dance Dance Revolution or In the Groove.\r\n\r\nStep aerobics helps burn calories and fat. It also helps to reduce stress, promote restful sleep, strengthen muscles and gives the body a more streamline appearance. The number of calories burned depends on the speed of movements, step height, and length of exercise. Exercise sessions can create social connections with others and step as well as low-impact aerobics is suitable for all ages, low cost, and has no restrictions on place.', 'Aerobic training with individual platform with  adjustable height . Improves endurance , cardiovascular efficiency and strengthens the lower limbs.', 3);

-- --------------------------------------------------------

--
-- Struttura della tabella `coursecategory`
--

CREATE TABLE IF NOT EXISTS `coursecategory` (
  `Name` varchar(45) NOT NULL,
  `ShortDescription` varchar(5000) NOT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `coursecategory`
--

INSERT INTO `coursecategory` (`Name`, `ShortDescription`) VALUES
('Aerobics', 'Aerobics is a form of physical exercise that combines rhythmic aerobic exercise  with stretching and strenght training routines with the goal of improving all elements of fitness (flexibility, muscular strenght, and cardio-vascular fitness). It is usually performed to music and may be practiced in a group setting led by an instructor (partecipating in one of our courses), although it can be done solo and without musical accompaniment (in the free gym hours). With the goal of preventing illness and promoting physical fitness, practitioners perform various routines comprising a number of different dance-like exercises. Formal aerobics classes are divided into different levels of intensity and complexity.<br>Courses example : Aerobics Step, Beat..'),
('BodyandMind', 'The courses of body and mind provide a wider view and experience of our body. Mixing the calssical  indian style of "training your soul" with the more traditional body training, our courses provides a full experience that will grant a physical and mental well-being.\r\nIt set of activities including gymnastics body and breathing , psycho-physical disciplines aimed to meditation or relaxation, mixed techniques that would unite Yoga with distant traditions , et cetera.<br>Courses example : Yoga, Power Yoga ...'),
('WaterFitness', 'Water Fitness(waterobics, aquatic fitness, aquafitness, aquafit) is the performance of aerobics exercise in fairly shallow water such as in a swimming pool Done mostly vertically and without swimming typically in waist deep or deeper water, it is a type of resistance training. Water aerobics is a form of aerobic exercise that requires water-immersed participants. Most water aerobics is in a group fitness class setting with a trained professional teaching for about an hour. The classes focus on aerobic endurance and creating an enjoyable atmosphere with music.<br>Courses example: AquaFitness, AquaFusion ...');

-- --------------------------------------------------------

--
-- Struttura della tabella `instructor`
--

CREATE TABLE IF NOT EXISTS `instructor` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Surname` varchar(100) NOT NULL,
  `Position` varchar(45) DEFAULT NULL,
  `Certifications` varchar(255) NOT NULL,
  `Biography` varchar(10000) NOT NULL,
  `TwitterURL` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dump dei dati per la tabella `instructor`
--

INSERT INTO `instructor` (`Id`, `Name`, `Surname`, `Position`, `Certifications`, `Biography`, `TwitterURL`) VALUES
(1, 'Audra', 'Fuller', 'Chief Instructor', 'NETA Certified Personal Trainer,<br>spec. in Internal Wellness via nutrition', 'Certified Personal Trainer specializing in Advanced Individual programs since 1986.  Former WA & OR bodybuilding show judge and trainer of competitive bodybuilders  all levels (from first timers to Olympic competitors); long term training of athletes for specific sports; designed and ran full rehab and personal training facility for injury recovery and prevention; worked for several chiropractors and physical therapists on rehab of athletes; ran fitness center for Elderly Adults; managed a country club fitness center and specialized in golf training for 4 yrs; trained clients in either their homes or in home-gym; corporate fitness and wellness at several businesses (saves money on their insurance besides the fitness benefit); currently designing a specified law enforcement fitness program for testing candidates and current officers with their agencies.\r\n \r\nIn addition I specialize in Internal Wellness via nutrition. I have worked with a vast amount of clients who were dealing with diabetes, hypertension, IBS, hormones and various other health issues.  ', 'j_fuller'),
(2, 'Nicole', 'Prigge', NULL, 'BS in Exercise Science,<br>NETA Certified Personal Trainer', 'I am a born and raised Ellensburg gal and graduated from EHS in 2009. I have my BS in Exercise Science with minors in Athletic Training and PE & Coaching. In June of 2013, I became a NETA Certified personal trainer and over the last two years I have accumulated over 800 hours of personal training contact hours. I enjoy working with clients who wish to make long term lifestyle changes. I have helped everyone from a 70 year old woman who wanted to be able to do a push up again to a 17 year old gentleman looking to pass his military fitness test. If you are ready to have fun and get fit, let''s get started!', ''),
(3, 'Bryan', 'Mack', NULL, 'BS in Exercise Science,<br>CSCS Certification by NSCA', 'Graduated from CWU Summer 2013. CSCS certification by NSCA. Recent Alumni of CWU now working as the Sprints coach for CWU Track. My areas of experience lie in the development of athletes at the collegiate and high school level, but I love to work with all ages and experience levels! In training, I am a huge proponent of the mental game (we win the day before we ever touch the first weight!) When I''m not coaching track or working at the gym, my days consist of training for USAs, reading, and drawing.', ''),
(4, 'Chris', 'Mcleod', 'Co-chief Instructor', 'LV3 PT Qualification', 'Chris is a certified personal trainer through the American Council on Exercise (ACE), and was a collegiate track and field athlete. He has been an elementary school teacher for the past 5 years and is now a full-time grad student at AU.  He has completed 4 Tough Mudders, loves getting around DC on his mountain bike, and has a passion for both cardio and strength training. He hopes to become a high-school track and field coach someday. Chris enjoys motivating others to become the healthiest versions of themselves. ', 'ChrisJMcleod'),
(5, 'Sam', 'Fynes', NULL, 'MSc in Psychology,<br>NETA Certified Personal Trainer', 'Sam is currently working towards a Physical Therapy master at Howard University.  He is a certified personal trainer through the International Sports & Sciences Association.  In addition to playing football and swimming on the collegiate level, he is also a certified swim coach and lifeguard.  Sport specific drills and athletic conditioning are his passion.  His long term goal is to own a facility that combines fitness and physical therapy.', '');

-- --------------------------------------------------------

--
-- Struttura della tabella `lesson`
--

CREATE TABLE IF NOT EXISTS `lesson` (
  `Course` varchar(150) NOT NULL,
  `Day` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL,
  `StartingTime` time NOT NULL,
  `EndingTime` time NOT NULL,
  PRIMARY KEY (`Course`,`Day`,`StartingTime`,`EndingTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `lesson`
--

INSERT INTO `lesson` (`Course`, `Day`, `StartingTime`, `EndingTime`) VALUES
('AquaFitness', 'monday', '15:00:00', '16:00:00'),
('AquaFitness', 'tuesday', '20:00:00', '21:00:00'),
('AquaFitness', 'thursday', '20:00:00', '21:00:00'),
('AquaFitness', 'friday', '15:00:00', '16:00:00'),
('AquaFitness', 'saturday', '21:00:00', '22:00:00'),
('Beat', 'monday', '14:00:00', '16:00:00'),
('Beat', 'tuesday', '14:00:00', '16:00:00'),
('Beat', 'wednesday', '10:00:00', '12:00:00'),
('Beat', 'friday', '14:00:00', '16:00:00'),
('Beat', 'saturday', '14:00:00', '16:00:00'),
('Step', 'monday', '10:00:00', '12:00:00'),
('Step', 'tuesday', '10:00:00', '12:00:00'),
('Step', 'wednesday', '14:00:00', '16:00:00'),
('Step', 'friday', '10:00:00', '12:00:00'),
('Step', 'saturday', '10:00:00', '12:00:00');

-- --------------------------------------------------------

--
-- Struttura della tabella `location`
--

CREATE TABLE IF NOT EXISTS `location` (
  `Latitude` float(7,3) NOT NULL,
  `Longitude` float(7,3) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `CivicNumber` int(5) NOT NULL,
  `City` varchar(100) NOT NULL,
  `ZIP` int(5) NOT NULL,
  `State` varchar(2) NOT NULL,
  `Country` varchar(100) NOT NULL,
  `Url` varchar(5000) NOT NULL,
  PRIMARY KEY (`Latitude`,`Longitude`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `location`
--

INSERT INTO `location` (`Latitude`, `Longitude`, `Address`, `CivicNumber`, `City`, `ZIP`, `State`, `Country`, `Url`) VALUES
(37.091, -76.478, 'City Center Blwd', 815, 'Newport News', 23606, 'VA', 'United States', 'https://www.google.it/maps/place/37%C2%B005''27.6%22N+76%C2%B028''40.8%22W/@37.091,-76.478,17z/data=!3m1!4b1!4m2!3m1!1s0x0:0x0?hl=en');

-- --------------------------------------------------------

--
-- Struttura della tabella `rates`
--

CREATE TABLE IF NOT EXISTS `rates` (
  `Type` varchar(30) NOT NULL,
  `Registration` int(3) NOT NULL,
  `Annual` int(3) NOT NULL,
  `Discount` int(3) NOT NULL,
  PRIMARY KEY (`Type`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `rates`
--

INSERT INTO `rates` (`Type`, `Registration`, `Annual`, `Discount`) VALUES
('Normal', 10, 50, 0),
('Under25', 0, 0, 0),
('Over60', 0, 25, 0),
('UniversityStudents', 0, 0, 10);

-- --------------------------------------------------------

--
-- Struttura della tabella `room`
--

CREATE TABLE IF NOT EXISTS `room` (
  `Id_number` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id_number`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dump dei dati per la tabella `room`
--

INSERT INTO `room` (`Id_number`) VALUES
(1),
(2),
(3);

-- --------------------------------------------------------

--
-- Struttura della tabella `staff`
--

CREATE TABLE IF NOT EXISTS `staff` (
  `Instructor` int(11) NOT NULL,
  `Category` varchar(45) NOT NULL,
  PRIMARY KEY (`Instructor`,`Category`),
  KEY `CourseCategory_idx` (`Category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `staff`
--

INSERT INTO `staff` (`Instructor`, `Category`) VALUES
(3, 'Aerobics'),
(4, 'Aerobics'),
(5, 'Aerobics'),
(1, 'BodyandMind'),
(5, 'BodyandMind'),
(1, 'WaterFitness'),
(2, 'WaterFitness');

-- --------------------------------------------------------

--
-- Struttura della tabella `teaches`
--

CREATE TABLE IF NOT EXISTS `teaches` (
  `Instructor` int(11) NOT NULL,
  `Course` varchar(150) NOT NULL,
  PRIMARY KEY (`Instructor`,`Course`),
  KEY `Course_idx` (`Course`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `teaches`
--

INSERT INTO `teaches` (`Instructor`, `Course`) VALUES
(1, 'AquaFitness'),
(2, 'AquaFitness'),
(3, 'Beat'),
(5, 'Beat'),
(3, 'Step'),
(4, 'Step');

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `awards`
--
ALTER TABLE `awards`
  ADD CONSTRAINT `Id_Instructor` FOREIGN KEY (`Id_Instructor`) REFERENCES `instructor` (`Id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Limiti per la tabella `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `Category` FOREIGN KEY (`Category`) REFERENCES `coursecategory` (`Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Room` FOREIGN KEY (`Room`) REFERENCES `room` (`Id_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `lesson`
--
ALTER TABLE `lesson`
  ADD CONSTRAINT `Course_name` FOREIGN KEY (`Course`) REFERENCES `course` (`Name`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `CourseCategory` FOREIGN KEY (`Category`) REFERENCES `coursecategory` (`Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `InstructorId` FOREIGN KEY (`Instructor`) REFERENCES `instructor` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `teaches`
--
ALTER TABLE `teaches`
  ADD CONSTRAINT `Course` FOREIGN KEY (`Course`) REFERENCES `course` (`Name`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Instructor` FOREIGN KEY (`Instructor`) REFERENCES `instructor` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
