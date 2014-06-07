// ==UserScript==
// @name        ETIWikiNotes
// @namespace   etiwikinotes
// @description Displays a user's wiki page upon request.
// @include     https://boards.endoftheinter.net/showmessages.php*
// @include     http://boards.endoftheinter.net/showmessages.php*
// @grant       none
// @version     1

var wikiURL = 'http://wiki.endoftheinter.net/index.php/';
var wikiElement = document.createElement('span');
var messageTops = document.getElementsByClassName('message-top');
var displayWiki = new Array();
displayWiki.length = messageTops.length;

function func(){
        var testFrame = this.parentNode.getElementsByClassName('wikiFrame');
        if (testFrame.length<1){
            var divNode = document.createElement('div');
            var frameNode = document.createElement('iframe');
            var username = this.parentNode.getElementsByTagName('a');
            username = username[0].textContent;
            frameNode.setAttribute('style','width:100%;');
            frameNode.setAttribute('class','wikiFrame');
            frameNode.setAttribute('src',wikiURL+username);
            divNode.appendChild(frameNode);
            this.appendChild(divNode);
        } else {
            //testFrame[0].parentNode.removeChild(testFrame[0]);
            var j = Array.prototype.indexOf.call(this.parentNode.children,this);
            if(displayWiki[j]<1){
            testFrame[0].setAttribute('style','visibility:visible;width:100%;');
            displayWiki[j] = 1;
            } else {
            testFrame[0].setAttribute('style','visibility:hidden;height:0px;');
            displayWiki[j] = 0;
            }
        }
}

for (var i=0; i<messageTops.length; i++)
{
    var wikiNode = document.createElement('span');
    wikiNode.addEventListener('click',func,false);
    wikiNode.appendChild(document.createTextNode('Wiki'));
    messageTops[i].appendChild(document.createTextNode(' | '));
    messageTops[i].appendChild(wikiNode);
}
// ==/UserScript==