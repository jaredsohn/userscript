// ==UserScript==
// @name            _Cross domain (XSS) GM_xmlhttpRequest, Chrome too
// @include         https://warp.nga.mil/cgi-bin/nlprime/SimpleQueryPage.cgi*
// ==/UserScript==

function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}

function submitQuery() {
    submitButton = document.getElementsByName("Submit Query");
    click(submitButton[0]);
}

GM_xmlhttpRequest ( {
    method:     "GET",
    url:        "http://csv-dev.pgc.umn.edu/spit.php",
    onload:     function (response) {
                   	document.getElementsByName("searchValue")[0].value=response.responseText;
        			document.getElementsByName("ANY_SENSOR")[0].checked=true;
        			document.getElementsByName("ANY_FORMAT")[0].checked=true;
        			document.getElementsByName("dateSelection")[0].checked=true;
        			submitQuery();
                }
} );