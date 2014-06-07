//
//	Written By The Best!
//
//	Be gratified!
//
// ==UserScript==
// @name           PardusJobListing
// @namespace      pardus.at
// @include        http://*.pardus.at/main.php
// @include	   http://*.pardus.at/msgframe.php
// ==/UserScript==

var td = document.getElementsByTagName('td');

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://artemis.pardus.at/overview_jobs.php',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/stuff+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        jobtext = responseDetails.responseText;

	split = jobtext.split('bgdark.gif)\'><tr><td>');

	split2 = split[1].split('<\/body>');

	td[34].innerHTML += split2[0];


    }
});