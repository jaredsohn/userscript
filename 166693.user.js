// ==UserScript==
// @name           Pigskin empire: Add links to player.aspx
// @copyright      wozz
// @version        0.01
// @description    Easy navigation to other player pages. 
// @include        http://*pigskinempire.com/player.aspx*
// ==/UserScript==


window.setTimeout( function() {
	main();
}, 100);


function main()
{
	var linkbar = document.getElementsByClassName("profileLnk")[0];
	var string = linkbar.innerHTML;
        var plink = window.location.toString().replace(/player.aspx?.*id=/,"prospect.aspx?m=P&id=");
        var scoutlink = window.location.toString().replace(/player.aspx?.*id=/,"prospect.aspx?V=S&m=P&id=");
        var optionslink = window.location.toString().replace(/player.aspx?.*id=/,"prospect.aspx?V=O&m=P&id=");
        var newhtml =  "Injuries</a> | <a href="+plink+" style=\"color:#FDD017\" class=\"profile\">Prospect Page</a> | <a href="+scoutlink+" style=\"color:#FDD017\" class=\"profile\">Scouting</a> | <a href="+optionslink+" style=\"color:#FDD017\" class=\"profile\">Options</a>";
        string = string.replace("Injuries</a>",newhtml);
	linkbar.innerHTML = string;
	
	
}