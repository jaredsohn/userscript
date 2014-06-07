// ==UserScript==
// @name           Hotmail View Message Source Fix
// @description    Fixes "View Message Source" in Hotmail, which sends raw gzipped data
// @include        http://*.mail.live.com/mail/GetMessageSource.aspx?msgid=*
// @exclude        *
// ==/UserScript==

// NOTE: the downside is that the data will be transfered twice over the net, first the original gzipped one
//       and then the second one, but afaik there's no way around that using GreaseMonkey because GM scripts
//       are only executed after a page has been loaded

// temporarily replace original gibberish page with empty page, to avoid it being displayed while page is
// fetched again (this time readable)
document.body.innerHTML = '';

// re-request page, this time without suporting gzip, that forces hotmail to send it unpacked
GM_xmlhttpRequest({
    method: 'GET',
    url: window.location.href,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
        'Accept-Encoding': 'deflate',
    },
    onload: function(responseDetails) {
    	// replace page with new readable one
    	document.body.innerHTML = responseDetails.responseText;
    }
});
