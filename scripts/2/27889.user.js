// Copyright 2008 Kliakhandler Kosta - http://www.kosta.tk

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ==UserScript==
// @name Horde imp mailto linker
// @namespace http://www.kosta.tk
// @description Changes mailto links to open a compose window in horde-imp
// ==/UserScript==

GM_registerMenuCommand("Change mail server address", setNewMailtoAddress);

var address = GM_getValue("compose");
if (!address)
    setNewMailtoAdress();

changeMailtoLinks(address);

function changeMailtoLinks(address){
    // Get the list of links in the page.
    var links = document.links;
    // Iterate through them and check whether they are mailto links
    for (linknum=0; linknum < links.length; linknum++){
	if (links[linknum].protocol == "mailto:"){
		
	    // Create a new link with the given address andother params
	    var mailto = links[linknum].href.substr(7);
	    mailto = mailto.replace("\?","&");
	    var link = address + "?to=" + mailto;
	    
	    // Replace the link's address with the new parameters
	    links[linknum].href = encodeURI(link);
	}
    }
}

// Allows to set the server address to be used in the compose links.
function setNewMailtoAddress(){
    var address = GM_getValue("compose",
			     "http;//www.example.com/horde/imp/compose.php");
    address = prompt("Please enter the address to your compose.php",
		     address);
    GM_setValue("compose", address);
    alert("Please reload the page for the new address to take effect.");
}
