// ==UserScript==
// @name           Pigskin empire: Add links to evalplayer.aspx
// @copyright      wozz
// @version        0.2
// @description    Easy navigation to other player pages. 
// @include        http://*pigskinempire.com/evalplayer.aspx*
// ==/UserScript==


window.setTimeout( function() {
	main();
}, 100);


function main()
{

	var namespan = document.getElementById("CPH1_lblPlayerName");
	var name = namespan.innerHTML;
        var plink = window.location.toString().replace(/evalplayer.aspx?.*[ID,id]=/,"prospect.aspx?m=P&id=");
        name = "<a href="+plink+">"+name+"</a>";
        namespan.innerHTML = name;
}