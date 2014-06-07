// ==UserScript==
// @name        MendeleyTagger
// @namespace   http://userscripts.org/users/mariannebezaire
// @author      http://userscripts.org/users/mariannebezaire
// @license     Apache License 2.0; http://www.apache.org/licenses/LICENSE-2.0
// @copyright   2014+, Marianne Bezaire (http://www.mariannebezaire.com)
// @description Add a tag and streamline import from Mendeley import URL
// @include     http://www.mendeley.com/import/?url=*
// @include     http://www.mendeley.com/import/?doi=*
// @version     1.3
// @grant       none
// ==/UserScript==

/*
PURPOSE: To automatically tag an article while adding it to Mendeley via the URL
or DOI import links and streamline the import process.

DETAILS: Apply a general tag to all articles imported via the Mendeley URL (see 
http://www.mendeley.com/import/information-for-publishers/), put the focus on
the "Save" button so simply pushing 'Enter' will import a found article 
(eliminating use of the mouse), and then automatically close the Mendeley window
and return to the previous tab.

This script can be used in conjunction with feedly2mendeley to enable direct
importing of journal articles from feedly (in list view) to Mendeley.

*****************************************************************

Script name: MendeleyTagger

Copyright 2014 Marianne Bezaire

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*****************************************************************/
(function(){
// always add a default tag when importing articles to Mendeley using
// the URL or DOI import URLs.
var x = document.getElementById("import-tags");
x.value="toread" // add "toread" tag
// if you want the tag to say something else, change the
// word in the quotes above. If you don't want a tag
// added automatically, add double slashes // to the 
// front of the "x.value = ..." line to comment it out.

var all = document.querySelectorAll("input, button");
for (var i=0, max=all.length; i < max; i++) {
    if (all[i].value=="Save") { // look for a "Save" (import) button
        all[i].focus() // Put the focus on the "Save" button so hitting
					   // "Enter" will click the button
    }
}

function closeAfterImport() {
    var all = document.getElementsByClassName("import-doc imported");
    if (all.length>0) { // If the article has been successfully imported,
        window.close()	// close the window
    }
}

window.setInterval(function () {closeAfterImport()}, 500) // Check for successful import every half second
}());