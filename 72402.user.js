// ==UserScript==
// @name		ClickNope
// @description		Makes the Hidden Temple more accurate.
// @include		*127.0.0.1:*/adventure.php*
// @exclude		*forums.kingdomofloathing.com*
// ==/UserScript==

//pretty much all coded by zero

if (document.body.innerHTML.match(/Adventure Again \(The Hidden Temple\)/)) {
	GM_log('hi, temple!');
    if(!document.body.innerHTML.match(/Not Full Of Trash|Dvorak\'s Revenge|No Visible Means of Support/)) {
        head = document.getElementsByTagName('head')[0];
        if(head) {
            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = 'button { border: 2px black solid; font-family: Arial, Helvetica, sans-serif; font-size: 10pt; font-weight: bold;  background-color: #FFFFFF; color=#000000; }';
            head.appendChild(style);
        }
        var tables = document.getElementsByTagName("table");
         var sec_row = tables[1].firstChild;
    	if (sec_row.length != -1){
         GM_log('unimportant temple adv');
    		sec_row.innerHTML = 'Nope.<br><a href="adventure.php?snarfblat=17"><button type="button">Click</button></a>';

    	}
    }
}
