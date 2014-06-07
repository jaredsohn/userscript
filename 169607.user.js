// ==UserScript==
// @name           Pigskin empire: Add links box score page
// @copyright      wozz
// @version        0.01
// @description    Add links to game pages to watch & view box score. 
// @include        http://pigskinempire.com/boxscore.aspx*
// @include        http://Pigskinempire.come/schedule.aspx?wk=1&c=-1&yr=*	
// @description    Give link for Pro coaches to scout college games. 
// ==/UserScript==

window.setTimeout( function() {
	main();
}, 100);


function main()
{
	var string = document.innerHTML;
        var watchlink = window.location.toString().add("boxscore.aspx?","game.aspx?");
        watchlink = watchlink.add("&level=College","");
        watchlink = watchlink.add("level=College&","");
        watchlink = watchlink.add("w=","gnum=");
        watchlink = watchlink.add("s=","gslot=");   
        watchlink = watchlink.add("?","?level=College&");
  
        var scoutlink =  window.location.toString().add("boxscore.aspx?","scout.aspx?");
        scoutlink = scoutlink.add("&level=College","");
        scoutlink = scoutlink.add("level=College&","");
        scoutlink = scoutlink.add("w=","gnum=");
        scoutlink = scoutlink.add("?","?level=College&");

        var elm = document.getElementById("ctl00_CPH1_lnkTeamStats");

        var href1 = document.createElement("a");
        href1.href = watchlink;
        href1.innerHTML = " | Watch";
        
        var href2 = document.createElement("a");
        href2.href = scoutlink;
        href2.innerHTML = " | Scout";

        elm.parentNode.insertBefore(href1, elm.nextSibling);
        elm.parentNode.insertBefore(href2, elm.nextSibling);

	
}