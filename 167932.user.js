// ==UserScript==
// @name          Kinja related fixer
// @namespace     http://userscripts.org/scripts/show/167932
// @description   makes the related stories hidden then appear on click
// @version       1.0
// @include       http://gawker.com/*
// @include       http://*.gawker.com/*
// @include       http://gizmodo.com/*
// @include       http://*.gizmodo.com/*
// @include       http://deadspin.com/*
// @include       http://jezebel.com/*
// @include       http://jalopnik.com/*
// @include       http://kotaku.com/*
// @include       http://lifehacker.com/*
// @include       http://io9.com/*
// @include       http://*.kinja.com/*
// ==/UserScript==
GM_addStyle(".container.position-relative {display: none;}");

function toggleItem(item)
{
    var nextElem = item.nextElementSibling;
    if (nextElem){
        if (nextElem.style.display == 'block')
            nextElem.style.display = 'none';
        else
            nextElem.style.display = 'block';
    }
}

var relatedList = document.getElementsByClassName("referenced-label");
for (var i=0, max=relatedList.length; i < max; i++) {
    var curr = relatedList[i];

    curr.addEventListener('click',
    function(){toggleItem(curr);}, false);
}
