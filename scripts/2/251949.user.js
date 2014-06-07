// ==UserScript==
// @name        QuickScrim GLB2
// @namespace   QuickScrim GLB2
// @include     http://glb2.warriorgeneral.com/game/rankings*
// @version     1.0
// @grant       none
// ==/UserScript==

window.setTimeout(
        function() {
		getInetPage("/game/home", replaceScrimLinks);
        }, 500
);

function replaceScrimLinks(address, page) {
	var text = page.responseText.toString().split("<img src=\"/game/avatar/team/")[1].split("\" class=\"avatar_lnk_tiny\">")[0];
	var myTeamId = text;

	var links,thisLink;
	links = document.evaluate("//a[@href]",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i=0;i<links.snapshotLength;i++) {
	    var thisLink = links.snapshotItem(i);

	    thisLink.href = thisLink.href.replace('/game/team/',
		                                  '/game/team_quick_scrimmage/'+myTeamId+'/');
	}
}

function getInetPage(address, func) {
    console.log("getInetPage : "+address);
    var req = new XMLHttpRequest();
    req.open( 'GET', address, true );
    req.onload = function() {
        if (this.status != 200) {
            alert("pbr gm script: Error "+this.status+" loading "+address);
        }
        else {
//            console.log("loaded: "+address)
            func(address,this);
        }
    };

    req.send(null);
    return req;
}