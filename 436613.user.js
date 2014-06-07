// ==UserScript==
// @name        Stop Displaying of Multiple Reshares on Brilliant.org
// @namespace   megh
// @include     https://brilliant.org/
// @version     3
// @grant       none
// ==/UserScript==

var index=0,tr=[];
function hideMultipleReshares()
{
    var allElements = document.getElementsByClassName('nf-feed-item-wrapper modal-feed-item');

    for (var i = index; i < allElements.length; i++)
    {
        if (allElements[i].hasAttribute('data-modal-url')) {
            var x = allElements[i].getAttribute('data-modal-url') .split('?') [0];
            if (tr.indexOf(x) === - 1)
            {
                tr.push(x);
            } 
            else allElements[i].parentNode.parentNode.style.display = 'none';
        }
    }index=allElements.length;
}

function checkDocumentHeight(callback){
    var lastHeight = document.body.clientHeight, newHeight, timer;
    (function run(){
        newHeight = document.body.clientHeight;
        if( lastHeight != newHeight )
            callback();
        lastHeight = newHeight;
        timer = setTimeout(run, 200);
    })();
}

checkDocumentHeight(hideMultipleReshares);

