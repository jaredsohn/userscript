// ==UserScript==
// @name       RYM: Spoiler tag close button
// @version    0.3
// @description  reclose spoiler tags on rym
// @include    http://rateyourmusic.com/*
// @exclude    http://rateyourmusic.com/boards*
// @include    https://rateyourmusic.com/*
// @exclude    https://rateyourmusic.com/boards*
// @copyright  2012+, AnniesBoobs
// ==/UserScript==
function spoilToggle(spoilId){
    spoilMain = document.getElementById('spoiler'+spoilId);
    spoilSub = document.getElementById('spoilerinner'+spoilId);
    spoilMain.innerHTML = spoilSub.innerHTML;
    spoilUnhide = document.createElement('span');
    spoilUnhide.setAttribute('class','spoiler');
    spoilUnhide.innerHTML = 'spoiler: click to hide';
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
            spoilIdx = spoilersx[g].parentNode.getAttribute('id').split('spoiler')[1];
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
    spoilMain = document.getElementById('spoiler'+spoilId);
    spoilHide = document.createElement('span');
    spoilMain.innerHTML = '';
    spoilHide.setAttribute('class','spoiler');
    spoilHide.innerHTML = 'spoiler: click to read';
    spoilMain.insertBefore(spoilHide, spoilMain.firstChild);
    spoilHide.addEventListener('click', (function(n) {
        return function (e) {
            e.preventDefault();
            spoilToggle(n);
        };
    })(spoilId), false);
    
}

spoilers = document.getElementsByClassName('spoiler');
if (spoilers != undefined){
    for (i=0; i<spoilers.length; i++){
        spoilId = spoilers[i].parentNode.getAttribute('id').split('spoiler')[1];
        spoilers[i].removeAttribute('onclick');
        
        spoilers[i].addEventListener('click', (function(n) {
            return function (e) {
                e.preventDefault();
                spoilToggle(n);
            };
        })(spoilId), false);
        
    }
}
