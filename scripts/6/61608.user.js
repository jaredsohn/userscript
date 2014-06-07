// ==UserScript==
// @name          Bloodlines iBranch Attack Fix
// @namespace     HappyBunnyMan55
// @description   Modifies Bloodlines attack hyperlinks for use with the iMacros plugin for faster DCing.
// @include       http://bloodlinesrpg.info/world.php?*
// ==/UserScript==

oaf = function () {

    window.addEventListener("load", fixLinks, false); 

    function fixLinks(){
        fn = function(e){
            GM_openInTab(this.href);
            e.preventDefault();
        };

        el = document.getElementsByTagName('a');
        if (el) {          
            loadEvents(el,fn);
        };
    }

    function loadEvents(links, fn){
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.indexOf("attackmob.php?") > 0) {
                var link = document.createElement('a');
                link.setAttribute('href',links[i].href);
                link.setAttribute('title',"iBranch Attack");
                link.appendChild(document.createTextNode('iBranch'));
                link.addEventListener("click", fn, false);
                links[i].parentNode.appendChild(link);
                links[i].parentNode.removeChild(links[i]);
            };
        };
    };
};

oaf();

if ( document.URL.indexOf("world.php") != -1 ) {

	//Create div that will contain the Attack All Mobs Link, and the Attack All Mobs Link
	var box = document.createElement('div');
	var link = document.createElement('a');
	link.addEventListener("click", attackmobs, false);
	link.setAttribute('title',"Attack All Mobs");
	link.appendChild(document.createTextNode('Attack All Mobs'));
	link.setAttribute('href','#');
	// Make it pretty
	link.setAttribute('style','color: #ffa500; font-weight: bold')

	//Insert it after the Mobs in room div:
	box.appendChild(link);

	/*
	 * 8th table holds all room details
	 * 1st row holds the info we want ( 0th row is the one with the title of the room that is -> room name and Room Details
	 * 64th column is the one that holds the mobs and players in the room
	 * 0th div holds all data and is the main div, 1st div holds the In this room text, we want to insert before the 2nd div
	 *
	 * If the In this room: text appears and is not in the right place then Outwar changed the structure of the page
	 */

	var room = document.getElementsByTagName('table')[8].getElementsByTagName('tr')[1].getElementsByTagName('td')[66];
	if ( room.innerHTML.indexOf("In this room") != -1 ) {
		var maindiv = room.getElementsByTagName('div');
		maindiv[0].insertBefore(box,maindiv[2]);

	}
	else {
		if ( document.body.innerHTML.indexOf("In this room") != -1 ) {
			alert("Page changed?! Contact developer or download most updated version.");
		}
	}
}