// ==UserScript==
// @name           Messages go scan
// @namespace      Snaquekiller
// @description    allez directement a l'onglet espionnages avec le compte commandant si non nouveau messages
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude http://*.ogame.*/game/index.php?page=buddies*
// @exclude http://*.ogame.*/game/index.php?page=notices*
// @exclude http://*.ogame.*/game/index.php?page=search*
// @exclude http://*.ogame.*/game/index.php?page=eventList*
// @exclude http://*.ogame.*/game/index.php?page=jump*
// @exclude http://*.ogame.*/game/index.php?page=phalanx*
// @exclude http://*.ogame.*/game/index.php?page=showmessage*
// @exclude http://*.ogame.*/game/index.php?page=combatreport*
// @exclude http://*.ogame.*/game/index.php?page=techtree*
// @exclude http://*.ogame.*/game/index.php?page=techinfo*
// @exclude http://*.ogame.*/game/index.php?page=globalTechtree*
// ==/UserScript==

		if(document.getElementById('officers').getElementsByTagName('img')[0].src.indexOf('http://gf1.geo.gfsrv.net/cdndf/3e567d6f16d040326c7a0ea29a4f41.gif') != -1)
		 {/*7 espionner , 5combat , 6joueur , 8expe,2 alli, 4 divers, 3 corbeilles  ^^*/
			if(document.getElementById('message_alert_box_default')){
				document.getElementById('message_alert_box_default').href = document.getElementById('message_alert_box_default').href + '&displayCategory=7';
			}
			if(location.href.indexOf('page=messages') != -1)
			{
				var nb_total = document.getElementById('rechts').getElementsByTagName('a').length;
				var lien = '';
				for(var i=0; i<nb_total; i++)
				{
					lien = document.getElementById('rechts').getElementsByTagName('a')[i].href +'&displayCategory=7';
					document.getElementById('rechts').getElementsByTagName('a')[i].href = lien;
				}
			}
		 }