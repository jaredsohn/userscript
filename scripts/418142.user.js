// ==UserScript==
// @name        soundcloud-likepercent
// @namespace   ds
// @author      Damian Stewart
// @include     https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
// @version     1
// @include	http://www.soundcloud.com/*
// @include	http://soundcloud.com/*
// @include	https://www.soundcloud.com/*
// @include	https://soundcloud.com/*
// @grant       none
// ==/UserScript==
(function () {
    /*
        <ul class="soundStats sc-ministats-group" aria-label="Track stats">

    <li class="sc-ministats-item" title="9708 plays">
        <span class="sc-ministats sc-ministats-small sc-ministats-plays">
            <span class="sc-visuallyhidden"></span>
            <span aria-hidden="true">

                9,708

            </span>
        </span>
    </li>
    <li class="sc-ministats-item" title="142 likes">
        <a class="sc-ministats sc-ministats-small sc-ministats-likes" title="View all likes" href="/birch_1992/deep/likes">
            <span class="sc-visuallyhidden"></span>
            <span aria-hidden="true">

                142

            </span>
        </a>
    </li>

        // sc-ministats-plays
        // sc-ministats-likes
    */
    function processMinistatsGroup(g) {
        /*alert(g.innerHTML);
        .log(g.innerHTML);*/
        var playsElements = g.getElementsByClassName('sc-ministats-plays');
        var likesElements = g.getElementsByClassName('sc-ministats-likes');
        if ( playsElements.length>0 && likesElements.length>0 )
        {
            var likesElement = likesElements[0];
            var likesRaw = likesElement.children[1].textContent;
            var likes = parseFloat(likesRaw.replace(/,/g,'').replace(/K/,'000'));
                        
            var playsElement = playsElements[0];
            var playsRaw = playsElement.children[1].textContent;
            var plays = parseFloat(playsRaw.replace(/,/g,'').replace(/K/,'000'));

            var likePercent = 0;
            if ( plays>0 ) {
               likePercent = likes/plays;
            }
            var likePercentNodes = g.getElementsByClassName('ds-likePercent');
            var likePercentNode;
            if ( likePercentNodes.length>0 ) {
                likePercentNode = likePercentNodes[0];
            } else {
                likePercentNode = document.createElement('span');
                likePercentNode.className = 'ds-likePercent';
                g.appendChild(likePercentNode);
            }
            likePercentNode.innerHTML = '' + (100.0*likePercent).toFixed(1);
        }
    }
    function go() {
        // sc-ministats-group
        var allMinistatsGroups = document.getElementsByClassName('sc-ministats-group');
        for (var i = 0; i < allMinistatsGroups.length; i++) {
            processMinistatsGroup(allMinistatsGroups[i]);
        }
        //console.log("processed "+allMinistatsGroups.length);
    }
    function go2(mutations) {
        setTimeout(go, 5000);
    }
    window.addEventListener('DOMContentLoaded', go, false);
    window.addEventListener('load', go2, false);
}) ();
