// ==UserScript==
// @name           Nav Route Planner Upgrade
// @namespace      apache1990.dod.net
// @description    Allows you to send your fleet to a planet at each nav-route stop.  No three-step travel legs!
// @include        *.war-facts.com/route_request.php?view=*
// ==/UserScript==

javascript:(function(){var a=document.getElementsByTagName('a');for(var l=0,len=a.length;l<len;l++){if(parseInt(a[l].innerHTML)>0&&a[l].href.indexOf('fleet_navigation.php')>1)a[l].href='/extras/view_system.php?system='+parseInt(a[l].innerHTML);}})();