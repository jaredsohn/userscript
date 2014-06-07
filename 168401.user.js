// ==UserScript==   
// @name           Twitter t.co killer (at load, scroll and new tweets)
// @description    Cut the t.co redirection of links in twitter. This is automatically done at load, scroll and also on new tweets but, if needed, you can allways click anywhere in the window to force replacement to be done.
// @namespace      
// @licence        GPLv3
// @include        http://*twitter.com/*
// @include        http://twitter.com/*
// @include        https://*twitter.com/*
// @include        https://twitter.com/*
// @grant          none
// @version        1.01
// ==/UserScript==

// Based on marxmery's disintertwitifier, jadi's Twitter URL shortener and Kevin B's t.co Bypasser

/*
    t.co killer by Cryptie and gloupin, 2013.
	
	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function fix_links () {
	var links=document.getElementsByTagName("a");
	for (var key in links){
		if (links.hasOwnProperty(key)) {
			var expanded = links[key].getAttribute("data-expanded-url");
			if(expanded !== null) {
				links[key].href = expanded;
				links[key].setAttribute("arrow", "true");;
			}
		}
	}
}

    var sty = document.createElement("style"); // prepare the green arrow we want to add on our repaired links.
    sty.type = 'text/css';
    sty.id = 'cokiller';
    sty.innerHTML = 
	"a[arrow]:before { content: '\u2192'; }\n" +
	"a[arrow] { color: green; }" ;

    document.head.appendChild(sty);

fix_links();			// fix on load

function stutter () { // needed to wait for the twitts to load before to fix their links.
    fix_links();
    setTimeout(function() {
	       fix_links();
    }, 700);
}

window.addEventListener("scroll", function() { // start stutter whenever you arrive at 800pixels of the bottom of the window
	// ideally this would hook into Twitter's call, but this seems to work fine
	if(window.scrollY > window.scrollMaxY - 800) { // give it some margin, change 800 if necessary
		stutter();
	}
});

// following allow to catch click and new twitter event to kill their t.co

window.addEventListener("click", stutter, true);
window.addEventListener("contextmenu", stutter, true);