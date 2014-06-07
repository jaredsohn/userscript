// ==UserScript==
// @name          friend Homepage
// @namespace     r4wr[dot]com
// @description	  move tables
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==


//friends table
s = "#home_friends {width:450px;height:250px;position:absolute!important;left:-390px;top:610px}\n";

//bulletin table
s+= "#home_bulletins {width:450px;height:230px;position:absolute!important;left:-53px;top:360px}\n";

//hello yayie table
s+= "#home_profileInfo {width:450px;height:206px;position:absolute!important;left:-53px;top:10px}\n";

//messages table
s+= "#home_messages {width:450px;height:100px;position:absolute!important;left:-54px;top:240px}\n";

//cool new people/mp3 table
s+= "#splash_coolNewPeople {width:400px;position:absolute!important;left:80px;top:6px}\n";

//profile views table
s+= "#home_infoBar {width:400px;height:170px;position:absolute!important;left:79px;top:180px}\n";

GM_addStyle(s);