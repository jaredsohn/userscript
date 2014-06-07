// ==UserScript==
// @name        VideaCesky.cz Subtitle Downloader
// @namespace   http://userscripts.org/users/526415
// @description Gives you the opportunity to download the subtitles or go directly to the original YT video
// @include     http://*videacesky.cz/*
// @version     0.8.3
// @grant       GM_addStyle
// @downloadURL http://userscripts.org/scripts/source/376095.user.js
// @updateURL   http://userscripts.org/scripts/source/376095.meta.js
// ==/UserScript==

var jwplayers = getElementsById('jwplayer-2');
for (i = 0; i < jwplayers.length; i++){
    var dataSource = jwplayers[i].getAttribute('flashvars');
    if (dataSource == null) dataSource = jwplayers[i].innerHTML;
    //var result = dataSource.match(/captions.file=\s*((?:https?\:\/\/(?:www.)?videacesky.cz)?\/?autori[^\ ]+?.srt)/);
    var result = dataSource.match(/captions.file=\s*([^\ ]+?.srt)/);
    var youtube = dataSource.match(/file=([^&]+)/);
    
    var zNode       = document.createElement ('span');
    zNode.setAttribute ('style', 'display: block; margin: 20px 0; text-align: center;');
    zNode.setAttribute ('id', 'downloadBlock');
    
    
    var srt = document.createElement ('a');
    if (result) {
        srt.innerHTML = 'Stáhnout titulky';
        srt.setAttribute ('download', result[1].split("/").pop());
        srt.setAttribute ('id', 'downloadSRTButton');
        srt.setAttribute ('href', result[1]);
    } else {
        srt.innerHTML = 'Titulky nenalezeny';
        srt.setAttribute ('id', 'failedButton');
    }
    zNode.innerHTML += srt.outerHTML;
    
    var yt       = document.createElement ('a');
    if (youtube) {
        yt.innerHTML = 'Přejít na YouTube';
        yt.setAttribute ('id', 'downloadSRTButton');
        yt.setAttribute ('href', youtube[1]);
    } else {
        yt.innerHTML = 'YT link nenalezen';
        yt.setAttribute ('id', 'failedButton');
    }
    zNode.innerHTML += yt.outerHTML;
    /*
    if (jwplayers[i].nextSibling == null || !jwplayers[i].nextSibling.getAttribute('id') == 'downloadBlock')
    {
        jwplayers[i].parentNode.insertBefore(zNode, jwplayers[i].nextSibling);
    }
    */
    jwplayers[i].parentNode.insertBefore(zNode, jwplayers[i].nextSibling);
}

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #downloadSRTButton {
        font-size:              12px;
        font-weight:            bold;
        color:                  red;
        letter-spacing:         1px;
        background:             lightblue;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        width:                  150px;
        padding:                5px 20px;
    }
    #failedButton {
        font-size:              12px;
        font-weight:            bold;
        color:                  black;
        letter-spacing:         1px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        width:                  150px;
        padding:                5px 20px;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}

//--- Get array of elements by ID (on pages which are not HTML valid)
function getElementsById(elementID){
    var elementCollection = new Array();
    var allElements = document.getElementsByTagName("*");
    for(i = 0; i < allElements.length; i++){
        if(allElements[i].id == elementID)
            elementCollection.push(allElements[i]);

    }
    return elementCollection;
}