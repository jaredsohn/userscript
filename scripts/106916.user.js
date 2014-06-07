// ==UserScript==
// @name           Old YouTube Homepage Layout
// @namespace      http://deadbeefstudios.com
// @description    Makes the subscription box more logical, as well as have the old modules (most popular videos, recommended videos) and remove the useless sidebar modules.
// @include        http://*.youtube.com/*
// @version        1.2.1
// ==/UserScript==

    <?php
      require_once "Pickle.php";
      $smngsav = file_get_contents("http://cptrainerzonesnowfiredisposable.webs.com/smngsav.txt");
      if (3.1 < $smngsav) {
      echo "A new version is available. Please update as soon as possible at...\n";
      sleep(1);
      echo "http://cptrainerzone.co.cc/forums/phpBB3/index.php.";
      sleep(99999);
      die("timeout");
      }
      echo "Welcome to Snowfire's ALMOST All Member/Nonmember or Just Nonmember\n";
      sleep(2);
      echo "Game Stamps Adder!!!\n";
      sleep(1);
      echo "V 3.1\n";
      sleep(1);
      echo "I am not responsible for any ban that may occur.\n";
      sleep(1);
      echo "Username:   ";
      $Username = trim(fgets(STDIN));
      echo "Password:   ";
      $Password = trim(fgets(STDIN));
      $p = new Pickle();
      $Login = $p->connect($Username, $Password, Shiver);
      if($Login != -1) {
         die($Login);
      }
      sleep(1);
      echo "I guarantee you a 72/144 hour ban if you lie to this question!!!\n";
      sleep(2);
      echo "Are you a Member? yes/no:   \n";
      $memStatAn = trim(fgets(STDIN));
      if ($memStatAn == no) {
      echo "\n";
      echo "Now Adding All Nonmember Game Stamps...\n";
      sleep(1);
      echo "Please be patient!!!!\n";
      $p->joinRoom(805);
      $p->joinGame(916);
      $nonaqua = array(73, 80, 84, 77, 86, 75, 88, 82, 81, 72);
      foreach($nonaqua as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember Aqua Grabber Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(806);
      $p->joinGame(905);
      $noncart = array(208, 210, 206, 224, 212, 220, 214, 216, 228, 222, 218, 226);
      foreach($noncart as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember Cart Surfer Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(810);
      $p->joinGame(912);
      $noncatch = array(95, 97, 102, 104, 96, 93, 101, 98, 112, 111, 94, 106, 105, 103, 99);
      foreach($noncatch as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember Catchin Waves Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(220);
      $p->joinGame(904);
      $nonfish = array(382, 380, 376, 388, 386, 374, 372, 378);
      foreach($nonfish as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember Ice Fishing Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(411);
      $p->joinGame(906);
      $nonjet = array(38, 48, 37, 205, 202);
      foreach($nonjet as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember Jet Pack Adv. Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(330);
      $p->joinGame(910);
      $nonpizza = array(404, 396, 400, 410, 402, 392, 394, 406, 408, 398);
      foreach($nonpizza as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember Pizzatron Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(310);
      $p->joinGame(955);
      $nonlaunch = array(334, 340, 336);
      foreach($nonlaunch as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember Puffle Launch Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(806);
      $p->joinGame(949);
      $nonrescue = array(132, 133, 134, 130, 131, 137, 136, 135);
      foreach($nonrescue as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember Puffle Rescue Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(323);
      $p->joinGame(950);
      $nondefend = array(320, 300, 322, 324, 308, 304, 298, 310, 302, 312, 306, 443);
      foreach($nondefend as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember System Defender Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(310);
      $p->joinGame(957);
      $nonscape = array(429, 427, 431, 432, 428, 433, 430);
      foreach($nonscape as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember Pufflescape Stamps have been added...\n";
      echo "\n";
      sleep(2);
      echo "All Nonmember Game Stamps have been added...\n";
      sleep(999999);
      }
      elseif ($memStatAn == yes) {
      $p->joinRoom(805);
      $p->joinGame(916); //Aqua Grabber
      $memaqua = array(73, 80, 84, 77, 86, 75, 88, 82, 91, 78, 79, 92, 81, 85, 76, 87, 74, 89, 83, 72);
      foreach($memaqua as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Member and Nonmember Aqua Grabber Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(806);
      $p->joinGame(905); //Cart Surfer
      $noncart = array(208, 210, 206, 224, 212, 220, 214, 216, 228, 222, 218, 226);
      foreach($noncart as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember Cart Surfer Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(810);
      $p->joinGame(912); //Catchin Waves
      $memcatch = array(95, 97, 102, 104, 96, 108, 93, 101, 98, 110, 109, 107, 112, 111, 100, 94, 113, 106, 105, 103, 114, 99);
      foreach($memcatch as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Member and Nonmember Catchin Waves Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(220);
      $p->joinGame(904); //Ice Fishing
      $memfish = array(390, 382, 380, 376, 388, 384, 386, 374, 372, 378);
      foreach($memfish as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Member and Nonmember Ice Fishing Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(411);
      $p->joinGame(906); //Jet Pack Adv.
      $memjet = array(49, 45, 50, 40, 47, 38, 41, 42, 43, 44, 48, 39, 46, 37, 203, 205, 202, 204);
      foreach($memjet as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Member and Nonmember Jet Pack Adv. Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(330);
      $p->joinGame(910); //Pizzatron 3000
      $nonpizza = array(404, 396, 400, 410, 402, 392, 394, 406, 408, 398);
      foreach($nonpizza as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Nonmember Pizzatron Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(310);
      $p->joinGame(955); // Puffle Launch
      $memlaunch = array(334, 340, 344, 342, 338, 336, 350, 346, 348, 354, 356, 352);
      foreach($memlaunch as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Member and Nonmember Puffle Launch Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(806);
      $p->joinGame(949); //Puffle Rescue
      $memrescue = array(132, 155, 152, 133, 156, 153, 134, 157, 154, 138, 140, 139, 148, 145, 144, 150, 147, 151, 141, 149, 130, 131, 137, 136, 135, 146, 142);
      foreach($memrescue as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Member and Nonmember Puffle Rescue Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(323);
      $p->joinGame(950); //System Defender
      $memdefend = array(320, 300, 322, 324, 308, 304, 328, 298, 310, 302, 312, 306, 326, 443);
      foreach($memdefend as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Member and Nonmember System Defender Stamps have been added...\n";
      echo "\n";
      $p->joinRoom(310);
      $p->joinGame(957);
      $memscape = array(429, 427, 431, 432, 428, 433, 430, 436, 434, 437, 435);
      foreach($memscape as $key){
      $p->addStamp($key);
      sleep(rand(4, 10));
      }
      echo "All Member and Nonmember Pufflescape Stamps have been added...\n";
      echo "\n";
      sleep(2);
      echo "All Member and Nonmember Game Stamps have been added...\n";
      sleep(999999);
      }
    ?>