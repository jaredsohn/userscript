// ==UserScript==
// @name          COinS-SIRSI@NIST.user.js
// @description   Activates OpenURL COinS for NIST 
// @include       http://*
// ==/UserScript==

var links = document.evaluate("//span[contains(@class,'Z3988')]", 
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (!links) return;

// start configuration

var baseURL = 'http://nist-resolver.sirsi.net';
var linkText = 'Check the NIST library for the availability of resource';
var linkImage = 'http://nvl.nist.gov/emplibrary/findatNIST.jpg'; 

// end configuration

for (var i = 0; i < links.snapshotLength; i++) {

    var e = links.snapshotItem(i);
    if (e.className.match(/\bZ3988\b/)) {

        var a = document.createElement('a');
        a.href = baseURL + '?' + e.title.replace(/ctx_ver/, 'url_ver') +
            '&url_ctx_fmt=ori:fmt:kev:mtx:ctx';

        if (linkImage){
            var button = document.createElement('img');
            button.setAttribute('src', linkImage);
            button.setAttribute('alt', linkText);
            button.setAttribute('title', linkText);
			button.setAttribute('border', '0');
            a.appendChild(button);
        }
        else{
            a.innerHTML = linkText;
        }

        e.innerHTML = '';
        e.appendChild(a);

    }
}