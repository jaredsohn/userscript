// ==UserScript==
// @name           Q-Load DI
// @author         PattyPat
// @version        1.0
// @namespace      http://q-board.me/pattypat-u2356/
// @description    Auf q-load.me/download wird angezeigt welche Datei geladen werden soll..
// @include        http://*q-load.me/download
// ==/UserScript==
    
////////////////////////////////////////////////////////////
//                                                        //
//  Visit my Profil: http://q-board.me/pattypat-u2356/     //
//                                                        //
////////////////////////////////////////////////////////////    
    
    download_name = document.getElementById('reqFile').getAttribute('value');
    oldE = document.getElementById('reqFile');
    if (oldE)
    {
        newdiv = document.createElement('div');
        newdiv.setAttribute('style', 'border:1px solid #ffe400; background-color:#fff284; font-family:verdana; font-size:11px; padding:3px;');
        newdiv.innerHTML = 'Du willst dir folgende Datei herunterladen: <a target="_blank" href="'+download_name+'">[URL Öffnen]</a><br />'+download_name;
        oldE.parentNode.insertBefore(newdiv, oldE);
    }
