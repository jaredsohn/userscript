// ==UserScript==
// @name           Pigskin empire: Add links box score page
// @copyright      wozz
// @version        0.2
// @description    Add links to game pages to watch & view box score. 
// @include        http://*pigskinempire.com/boxscore.aspx*
// ==/UserScript==

window.setTimeout( function() {
	main();
}, 100);


function main()
{
	var string = document.innerHTML;
        var watchlink = window.location.toString().replace("boxscore.aspx?","game.aspx?");
        watchlink = watchlink.replace("&level=College","");
        watchlink = watchlink.replace("level=College&","");
        watchlink = watchlink.replace("w=","gnum=");
        watchlink = watchlink.replace("s=","gslot=");   
        watchlink = watchlink.replace("?","?level=College&");
  
        var scoutlink =  window.location.toString().replace("boxscore.aspx?","scout.aspx?");
        scoutlink = scoutlink.replace("&level=College","");
        scoutlink = scoutlink.replace("level=College&","");
        scoutlink = scoutlink.replace("w=","gnum=");
        scoutlink = scoutlink.replace("?","?level=College&");

        var elm = document.getElementById("CPH1_lnkTeamStats");

        var href1 = document.createElement("a");
        href1.href = watchlink;
        href1.innerHTML = " | Watch";
        
        var href2 = document.createElement("a");
        href2.href = scoutlink;
        href2.innerHTML = " | Scout";

        elm.parentNode.insertBefore(href1, elm.nextSibling);
        elm.parentNode.insertBefore(href2, elm.nextSibling);

	
}