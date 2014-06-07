// ==UserScript==
// @name        iGoogle GMailman
// @namespace    http://soundofmotion.blog.siol.net
// @description    Updates the title of the iGoogle page with the number of new mail in brackets
// @include    http://www.google.*/ig*
// ==/UserScript==

    window.setTimeout("document.location.reload();", 5*60*1000);
    GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://mail.google.com/mail/feed/atom/',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {       
            xmlString = responseDetails.responseText;
            var parser = new DOMParser();   
            var xmlDoc = parser.parseFromString(xmlString, "application/xml");
            newMail = xmlDoc.getElementsByTagName("fullcount")[0].textContent;
            if(newMail != "0")
                document.title = document.title + " (" + newMail + ")";   
    }});