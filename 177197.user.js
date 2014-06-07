// ==UserScript==
// @name           Youtube Watch History to Playlist
// @namespace      http://www.blogger.com/blogger.g?blogID=626020518553429424#editor/target=post;postID=480965726540526449
// ==/UserScript==

var getInputs = document.getElementsByTagName("input");
var i = 0;
var id = localStorage.getItem('LastID');
while (getInputs[i].value !== id) {
   
    if (getInputs[i].type === 'checkbox') {
        
        if (i === 7) {
            localStorage.setItem('LastID', getInputs[i].value);
        } else {
            getInputs[i].checked = true;
        }
        
        if (i === 5) {
            getInputs[i].checked = false;
        }
    }
    i++;
}