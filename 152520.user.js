// ==UserScript==
// @name       RYM: wiki-image autohide
// @version    0.4
// @match      http://rateyourmusic.com/*
// @exclude    http://rateyourmusic.com/customchart*
// @copyright  2012+, AnniesBoobs
// ==/UserScript==
wiColour = '#FF3333';
wiTextColour = 'white';
wikiImages = document.getElementsByClassName('wiki-image');
if (wikiImages.length > 0){
    for (y=0; y<wikiImages.length; y++){
        if (wikiImages[y].parentNode.parentNode.hasAttribute('id') && wikiImages[y].parentNode.parentNode.getAttribute('id').indexOf('spoilerinner') == 0){}
        else{
            spoilOut = document.createElement('span');
            spoilOut.setAttribute('id','wi'+y);
            wikiImages[y].parentNode.parentNode.insertBefore(spoilOut, wikiImages[y].parentNode);
            spoilIn = document.createElement('span');
            spoilIn.setAttribute('class','spoiler');
            spoilIn.innerHTML = 'Spoiler: click to view';
            //spoilIn.style.backgroundColor = wiColour;
            //spoilIn.style.color = wiTextColour;
            spoilOut.appendChild(spoilIn);
            spoilSub = document.createElement('span');
            spoilSub.setAttribute('id','wiinner'+y);
            spoilSub.style.display = 'none';
            wikiImages[y].parentNode.insertBefore(spoilSub, wikiImages[y].previousSibling);
            spoilSub.appendChild(wikiImages[y]);
            spoilIn.addEventListener('click', (function(n) {
                return function (e) {
                    e.preventDefault();
                    spoilToggle(n);
                };
            })(y), false);
            
        }
    }
}
function spoilToggle(spoilId){
    spoilMain = document.getElementById('wi'+spoilId);
    spoilSub = document.getElementById('wiinner'+spoilId);
    spoilMain.innerHTML = spoilSub.innerHTML;
    spoilUnhide = document.createElement('span');
    spoilUnhide.setAttribute('class','spoiler');
    spoilUnhide.innerHTML = 'Spoiler: click to hide';
    //spoilUnhide.style.backgroundColor = wiColour;
    //spoilUnhide.style.color = wiTextColour;
    spoilMain.insertBefore(document.createElement('br'), spoilMain.firstChild);
    spoilMain.insertBefore(spoilUnhide, spoilMain.firstChild);
    spoilUnhide.addEventListener('click', (function(n) {
        return function (e) {
            e.preventDefault();
            spoilRehide(n);
        };
    })(spoilId), false);
    
    
    spoilersx = spoilMain.getElementsByClassName('spoiler');
    if (spoilersx != undefined){
        for (g=1; g<spoilersx.length; g++){
            spoilIdx = spoilersx[g].parentNode.getAttribute('id').split('wi')[1];
            spoilersx[g].removeAttribute('onclick');
            spoilersx[g].addEventListener('click', (function(n) {
                return function (f) {
                    spoilToggle(n);
                };
            })(spoilIdx), false);
            
        }
    }
    
}
function spoilRehide(spoilId){
    spoilMain = document.getElementById('wi'+spoilId);
    spoilHide = document.createElement('span');
    spoilMain.innerHTML = '';
    spoilHide.setAttribute('class','spoiler');
    spoilHide.innerHTML = 'Spoiler: click to view';
    //spoilHide.style.backgroundColor = wiColour;
    //spoilHide.style.color = wiTextColour;
    spoilMain.insertBefore(spoilHide, spoilMain.firstChild);
    spoilHide.addEventListener('click', (function(n) {
        return function (e) {
            e.preventDefault();
            spoilToggle(n);
        };
    })(spoilId), false);
    
}