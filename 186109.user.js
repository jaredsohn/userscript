// ==UserScript==
// @name        Zmaga.com natisni lekcijo
// @version     2.0
// @description Dodaj gumb za tiskanje lekcij(Code originally created by KeepTube)
// @include     *zmaga.com/content.php*
// @include     *zmaga.si/content.php*
// @copyright   Keep-tube, sasko.123
// ==/UserScript==

var local_version = '1.0';

var vars = {};

var zmprintIcon = '/favicon.ico';

var url = encodeURIComponent(document.URL);

var position = url.indexOf("id%3D");
    
var lekcija = position + 5;

var stevilo = url.slice(lekcija)

var printurl = 'http://www.zmaga.com/program_ucenje_print.php?id=' + stevilo;

addDownloadBox();;

function addDownloadLink(){
    var link =' [ <a href="' + printurl + '" title="Natisni lekcijo"><img src="' + zmprintIcon + '" alt="" valign="middle"/></a> ]';
    var title = document.getElementById("watch-headline-title").innerHTML.replace("</h1>",link+"</h1>");
    document.getElementById("watch-headline-title").innerHTML = title;
}

function addDownloadBox() {
    

    var styles = [
        '#zmprintBox {position: fixed; right: 5px; bottom: 10px; z-index: 1000;opacity: 0.95;}',
        '#zmprintBox a {font-size:11px;font-family:Verdana;font-weight:bold;color:#dee1da !important;text-align:center;outline:none;background-color: #abb29f;border:2px solid #79836a;padding:4px;display:block;text-decoration:none;}',
        '#zmprintBox a:hover {border:2px solid #9ca096;background-color:#dee1da;color:#abb29f !important;text-decoration:none;}',
        '#zmprintBox img, #zmprintBox a:hover img {background:none;margin:0px;padding:0px;border:none;vertical-align:middle}'
    ];
    
    GM_addStyle(styles.join("\r\n"));

    var downloadBox = document.createElement('div');
    document.body.appendChild(downloadBox);
    
    downloadBox.id = 'zmprintBox';
    downloadBox.innerHTML = '<a title="Natisni lekcijo" target="_blank" href="' + printurl + '"><img src="' + zmprintIcon + '" width="16" height="16" /> Natisni lekcijo</a>';
}