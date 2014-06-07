// Copyright 2008 Kliakhandler Kosta - http://www.kosta.tk
// Copyright 2011 R.J. Vrijhof - Adapted for use in RoundCube
// webmail instead of Horde imp

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
// @name RoundCube webmail mailto linker
// @namespace http://www.vrijhof.info/
// @description Changes mailto links to open a compose window in RoundCube webmail instead of an e-mail application
// ==/UserScript==

GM_registerMenuCommand("Change RoundCube compose mail URL", setComposeMailtoURL);

var address = GM_getValue("compose");
if (! address) {
  setComposeMailtoURL();
}

changeMailtoLinks(address);

function changeMailtoLinks(address) {
  // Get the list of links in the page.
  var links = document.links;
  // Iterate through them and check whether they are mailto links
  for (linknum = 0; linknum < links.length; linknum++) {
    // Found a mailto link
    if (links[linknum].protocol == "mailto:") {
      // Change the mailto link to the given address in function
      // setComposeMailtoAddress, minus the "mailto:" part
      var mailto = links[linknum].href.substr(7);
      // If there is a query string in the mailto link, include it
      mailto = mailto.replace("\?","&");
      // Build up the replacement link
      var link = address + "&_to=" + mailto;
      
      // Replace the mailto link's address
      links[linknum].href = encodeURI(link);
      // Add a "target" attribute to the "a" tag, or replace the
      // target attribute (unlikely, with a mailto link), so the
      // RoundCube webmail compose page will open in a new window/tab
      links[linknum].target = "_blank";
    }
  }
} // function changeMailtoLinks

// Allows to set the URL that is to be used for the RoundCube webmail
// compose links, so a user can personalize it to his/her situation
function setComposeMailtoURL() {
  var address = GM_getValue(
    "compose",
    "https://www.domain.name/path/to/roundcube/?_task=mail&_action=compose"
  );
  address = prompt(
    "Please enter the URL to the mail compose page of your RoundCube webmail installation:",
    address
  );
  GM_setValue("compose", address);
  // Reload the page so the new URL should be working
  location.reload();
} // function setComposeMailtoURL