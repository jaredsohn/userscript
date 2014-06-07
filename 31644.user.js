// ==UserScript==
// @name           W3C Validation Service
// @description    Shows the result of the validation in the title of every page.
// @author         Pnoexz (pnoexz@hotmail.com)
// @include        http://*
// @version        1.1
// ==/UserScript==


GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://validator.w3.org/check?uri='+window.location.href,
  onload: function(responseDetails) {
    var rtitle = responseDetails.responseText.split('<title>')[1].split('</title>')[0].split(']')[0].split('[')[1];
    if (rtitle == 'Invalid') { changeTitle('Invalid: '+responseDetails.responseText.split('<td colspan="2" class="invalid">\n      ')[1].split("\n     <!-- this case where validation")[0].split('!')[0]); }
    if (rtitle == 'Valid') { changeTitle('Valid '+responseDetails.responseText.split('<h2 class="valid">This document was successfully checked as \n     ')[1].split('</h2>')[0].split('!')[0]); }
    if (rtitle == null || rtitle == "") { changeTitle('Invalid character encoding'); }
  }
});

function changeTitle(newtitle) { document.title = document.title+' || W3C: '+newtitle; }


// Change log
//
// v1 First release
// v1.1 Fixed small bug with subpages