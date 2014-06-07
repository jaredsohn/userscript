// ==UserScript==
// @name           Nettby 2.1
// @namespace      Markussss
// @description    Fiks nettby til noe bedre
// @include        http://*nettby.no/*
// ==/UserScript==

document.getElementById("tab_user").innerHTML+='<li><a href="http://nettby.no/index.php">Forsiden</a></li>';

document.getElementById("tab_news").innerHTML='<li><a href="/user/index.php" class="tab_selected"><img alt="" src="http://img.nettby.no/img/icons/14/home.png" class="icon"> Min side</a></li><li><a href="/user/diary.php"><img alt="" style="margin-bottom: 1px;" src="http://img.nettby.no/img/icons/14/diary.png" class="icon"> Dagbok</a></li><li><a href="/user/guestbook.php"><img alt="" style="margin-bottom: 1px;" src="http://img.nettby.no/img/icons/14/guestbook.png" class="icon"> Gjestebok</a></li><li><a href="/user/communities.php"><img alt="" style="margin-bottom: 1px;" src="http://img.nettby.no/img/icons/14/group_open.png" class="icon"> Grupper</a></li><li><a href="/user/calendar.php"><img alt="" src="http://img.nettby.no/img/icons/14/calendar2.png" class="icon"> Kalender</a></li><li><a href="/user/friends.php"><img alt="" src="http://img.nettby.no/img/icons/14/friends.png" class="icon"> Venner</a></li><li><a href="/user/view_photos.php"><img alt="" src="http://img.nettby.no/img/icons/14/pictures.png" class="icon"> Bilder</a></li><li><a href="/user/links.php"><img alt="" src="http://img.nettby.no/img/icons/14/links2.png" class="icon"> Lenker</a></li>';

// det kommer mer.