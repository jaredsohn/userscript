// ==UserScript==
// @name        Edna.cz Subtitle Downloader
// @namespace   http://userscripts.org/users/526415
// @description Gives you the opportunity to download the subtitles or go directly to the original YT video
// @include     http://*edna.cz/*
// @version     0.8.1
// @grant       GM_addStyle
// @downloadURL http://userscripts.org/scripts/source/376095.user.js
// @updateURL   http://userscripts.org/scripts/source/376095.meta.js
// ==/UserScript==

function saveFile(url) {
  // Get file name from url.
  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
    a.download = filename; // Set the file name.
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    delete a;
  };
  xhr.open('GET', url);
  xhr.send();
}

var jwplayers = document.getElementsByClassName('video-box');
for (i = 0; i < jwplayers.length; i++){
    var dataSource = jwplayers[i].childNodes[0];
    var result = dataSource.getAttribute('data-subtitles');
    var youtube = dataSource.getAttribute('data-video');
    
    var zNode       = document.createElement ('span');
    zNode.setAttribute ('style', 'display: block; margin: 20px 0; text-align: center;');
    zNode.setAttribute ('id', 'downloadBlock');
    
    var srt = document.createElement ('a');
    if (result) {
        srt.innerHTML = 'Stáhnout titulky';
        srt.setAttribute ('download', result.split("/").pop().replace(/\..+$/, '.srt'));
        srt.setAttribute ('id', 'downloadSRTButton');
        srt.setAttribute ('href', 'http://www.edna.cz/runtime/userfiles/'+result);
        //srt.setAttribute ('href', 'javascript:saveFile('+result+')');
    } else {
        srt.innerHTML = 'Titulky nenalezeny';
        srt.setAttribute ('id', 'failedButton');
    }
    zNode.innerHTML += srt.outerHTML;
    
    var yt       = document.createElement ('a');
    if (youtube) {
        yt.innerHTML = 'Přejít na YouTube';
        yt.setAttribute ('id', 'downloadSRTButton');
        yt.setAttribute ('href', youtube);
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
