
// ==UserScript==
@@ -2,7 +2,7 @@
 // @name           Goalll  // @namespace      Made by Pepernoot, thx to X_choice
 // @description    Staff+ voegt enkele snelle links voor moderators toe aan Goalll. Extra functies zullen volgen.
-// @version        Finito
+// @version        Finito 1
 // @include        http://*goalll.nl*
 // ==/UserScript==
 
@@ -47,44 +47,12 @@
 		var pmcount = pmcount[1].split(')');
 		var pmcount = pmcount[0];
 
-nav[0].innerHTML = nav[0].innerHTML + '<li><a class="a_menu" href="../index.php?a=over-Staff-plus">Beheer</a>&nbsp;<img src="http://www.goalll.nl/images/layout/arrow_down.gif"/><ul><li><a class="a_menu" href="../index.php?a=over-Staff-plus">Over Staff+</a></li><li><a class="a_menu" href="../index.php?a=admin">Paneel ingame</a></li><li><a class="a_menu" href="../forum/mcp.php">Paneel forum mod</a></li><li><a class="a_menu" href="../forum/adm/index.php">Paneel forum adm</a></li><li><a class="a_menu" href="../forum/viewforum.php?f=13">Moderatorfora</a></li><li><a class="a_menu" href="../index.php?a=messages">inbox (' + pmcount + ')</a></li></ul></li>';
+nav[0].innerHTML = nav[0].innerHTML + '<li><a class="a_menu" href="../index.php?a=over-Staff-plus">Beheer</a>&nbsp;<img src="http://www.goalll.nl/images/layout/arrow_down.gif"/><ul><li><a class="a_menu" href="../index.php?a=over-Staff-plus">Over Staff+</a></li><li><a class="a_menu" href="../index.php?a=admin">Paneel ingame</a></li><li><a class="a_menu" href="../forum/mcp.php">Paneel forum mod</a></li><li><a class="a_menu" href="../forum/adm/index.php">Paneel forum adm</a></li><li><a class="a_menu" href="../forum/viewforum.php?f=13">Moderatorfora</a></li></ul></li>';
 	}
 });
 }
 }
 
-//testje
-switch(param['a']) {
-case "admin":
-var tabadmin = document.getElementsByClassName ('tab-container');
-tabadmin[0].innerHTML = tabadmin[0].innerHTML + '<div id="6" class="tab"><a href="javascript:alert(\'Dit is nog niet gerealiseerd. Helaas!\')">Transfercheck</a></div>';
-}
-
-//Checken of er een nieuwe versie is 
-//WERKT
-var sidebar = document.getElementById ('side_bar');
-sidebar.innerHTML = sidebar.innerHTML + '<div style="padding-top: 25px; padding-left: 7px;"><a href="../index.php?a=over-Staff-plus"><center><small>Staff+<br /><TT>Versie 0.9.1 <i>BETA</i></TT></small></center></a>'
-GM_xmlhttpRequest({
-method: 'GET',
-url: 'http://robinrutten.nl/overig/versiestaffplus.php',
-headers:
-{
-'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
-'Accept': 'text/html',
-},
-onload: function(responseDetails)
-{
-var recentversion = responseDetails.responseText;
-var sidebar = document.getElementById ('side_bar');
-if (recentversion > 09.1)
-{
-sidebar.innerHTML = sidebar.innerHTML + '<div><a href="http://userscripts.org/scripts/source/82201.user.js" style="color: blue;"><small><b><center><BLINK>Er is een nieuwe versie beschikbaar!</BLINK></center></b></small></a></div>';
-alert("Er is een nieuwe versie van Staff+ beschikbaar!!");
-window.open('http://userscripts.org/scripts/source/82201.user.js');
-}
-}
-});
-
 
 // www. toevoegen voor URL
 // WERKT?
@@ -103,6 +71,6 @@
 		var titel = document.getElementsByTagName ('h2');
 		titel[0].innerHTML = 'Over Staff+';
 		var content = document.getElementsByClassName ('white_bg white_bg_content')
-		content[0].innerHTML = 'Welkom op Staff+. Een simpel userscript dat het voor moderators gemakkelijker maakt om te switchen tussen panelen als het forumpaneel voor moderators, het forumpaneel voor beheerders (admins, hoofdmoderator en eventuele coordinators), het ingame paneel waarin o.a. cheaters worden opgespoord en meer. Dit userscript is gebaseerd op Goalll Extended. Zonder X_choices geweldige creatie had ik, Pepernoot, zelfs dit simpele ding nooit kunnen maken dus alle credits naar X_choice. Voor meer informatie zie het bijbehorende topic in het Junior-mod forum. <b><TT>Deze tekst wordt nog uitgebreid.</TT></b><br /><br /><a href="http://userscripts.org/scripts/source/82201.user.js">Update beschikbaar? Klik dan hier!</a>';
+		content[0].innerHTML = '<>Welkom op Staff+. Een simpel userscript dat het voor moderators gemakkelijker maakt om te switchen tussen panelen als het forumpaneel voor moderators, het forumpaneel voor beheerders (admins, hoofdmoderator en eventuele coordinators), het ingame paneel waarin o.a. cheaters worden opgespoord en meer. Dit userscript is gebaseerd op Goalll Extended. Zonder X_choices geweldige creatie had ik, Pepernoot, zelfs dit simpele ding nooit kunnen maken dus alle credits naar X_choice. Voor meer informatie zie het bijbehorende topic in het Junior-mod forum. <b><TT>Deze tekst wordt nog uitgebreid.</TT></b><br /><br /><a href="http://userscripts.org/scripts/source/82201.user.js">Update beschikbaar? Klik dan hier!</a></s><br/><br/><br/><b>update 19/10: Staff+ officieel overbodig, ingevoerd door Kentucky';
 }
 