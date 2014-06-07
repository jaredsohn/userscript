// ==UserScript==
// @name           Tribal Wars Auto Log In All Servers Supported
// @namespace      ~dkhal~
// @include        http://www.tribalwars.net/*
// @include        http://www.die-staemme.de/*
// @include        http://www.staemme.ch/*
// @include        http://www.tribalwars.net/*
// @include        http://www.tribalwars.nl/*
// @include        http://www.plemiona.pl/*
// @include        http://www.tribalwars.se/*
// @include        http://www.tribalwars.com.br/*
// @include        http://www.tribos.com.pt/*
// @include        http://www.divokekmeny.cz/*
// @include        http://www.bujokjeonjaeng.kr/*
// @include        http://www.triburile.ro/*
// @include        http://www.voyna-plemyon.ru/*
// @include        http://www.fyletikesmaxes.gr/*
// @include        http://www.tribalwars.no/*
// @include        http://www.divoke-kmene.sk/*
// @include        http://www.klanhaboru.hu/*
// @copyright dkhal
// ==/UserScript==
// Configurations:
user="username";
pass="password";
server="serverseeexamplesbelow";

// examples of available servers:
// tribalwars.net Servers:
// en1 (= world 1), ..., en24 (= world 24), ens1 (for Speed Rounds), enc1 (for High Performance)
// die-staemme.de Servers:
// de3 (= world 3), ..., de30 (= world 30), des1 (for Premium-Schnells), dec1 (for Classic)
// staemme.ch Servers:
// ch1 (= world 1), ..., ch4 (= world 4)
// tribalwars.nl Servers:
// nl1 (= world 1), ..., nl9 (= world 9)
// tribalwars.pl Servers:
// pl1 (= world 1), ..., pl21 (= world 21), plc1 (for Classic), sds (for Szybkie)
// tribalwars.se Servers:
// sv1 (= world 1), ..., sv4 (= world 4)
// tribalwars.com.br Servers:
// br1 (= world 1), ..., br7 (= world 7), brs1 (for Speed Rounds)
// tribos.com.pt Servers:
// pt1 (= world 1), ..., pt3 (= world 3)
// divokekmeny.cz Servers:
// cs1 (= world 1), ..., cs9 (= world 9)
// bujokjeonjaeng.kr Servers:
// kr1 (= world 1)
// triburile.ro Servers:
// ro1 (= world 1), ..., ro7 (= world 7), roc1 (for Lumea Clasica), ros1 (for Speed Rounds)
// voyna-plemyon.ru Servers:
// ru1 (= world 1), ..., ru4 (= world 4)
// fyletikesmaxes.gr Servers:
// gr1 (= world 1), ..., gr2 (= world 2)
// tribalwars.no Servers:
// no1 (= world 1), ..., no2 (= world 2)
// divoke-kmene.sk Servers:
// sk1 (= world 1), ..., sk2 (= world 2)
// klanhaboru.hu Servers:
// hu1 (= world 1), ..., hu2 (= world 2)

document.getElementById('user').value=user;         // Write username
document.getElementById('password').value=pass;     // Write password
servers=document.getElementsByTagName('option');
for(i=0; i<servers.length; i++){
if(servers[i].value==server){                       // Select your server
servers[i].selected=true;
}
else{
servers[i].selected=false;
}
}
document.getElementsByTagName('form')[0].submit();  // Submit everything to log on