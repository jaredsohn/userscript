// ==UserScript==
// @name          FindScripts
// @namespace     http://rjpower.org/greasemonkey
// @description   Finds greasemonkey scripts related to the site you are currently 
//                viewing.  To use, just hit CTRL+ALT+f while viewing a site you 
//                are interested in.  Results will appear in a tab at the top of 
//                the page.
// @include       *
// @exclude       *userscripts.org*
// ==/UserScript==


function getMatching() {
    // get the hostname of the site from the current url
    siteBits = window.location.host.split('.');
    site = "";
    
    // start from the end and work our way backwards until we find something
    // reasonably sized.  (so that we work properly with .co.il, .co.uk, etc.
    for (var i = siteBits.length - 2; i > 0; --i) {
        site = siteBits[i].replace(/\./g, '+');
        if (site.length > 2) { break; }
    }
    
    // if we couldn't find anything meaningful, take the second to last element.
    if (site.length <= 2) {
        site = siteBits[siteBits.length - 2].replace(/\./g, '+');    
    }
    
    
    // Add a div to hold the results.
    resultDiv = document.body.appendChild(document.createElement('div'));
    resultDiv.style.position = 'absolute';
    resultDiv.style.left = '100px';
    resultDiv.style.top = '100px';
    resultDiv.style.zIndex = 10;
    resultDiv.style.backgroundColor = "#EEE";
    resultDiv.style.border = "1px dotted black";
    
    header = resultDiv.appendChild(document.createElement('h2'));
    header.innerHTML = 'Matching Scripts (click to hide)';
    
    
    // Add a hidden div to the page to hold the contents of the RPC.
    var searchFrame = document.createElement('div');
    searchFrame.setAttribute('id', 'scriptSearchResults');
    searchFrame.setAttribute('name', 'scriptSearchResults');
    
    resObj = document.body.appendChild(searchFrame);
    resObj.style.display = 'none';
    
    
    header.addEventListener('mousedown', 
            function (e) {
                resultDiv.style.display = 'none';
            }, false);
    
    status = resultDiv.appendChild(document.createElement('p'));
    status.innerHTML = "Please wait, searching...";
    status.style.backgroundColor = '#111111';
    status.style.color = 'white';
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://search.yahoo.com/search?n=40&q=site:userscripts.org+inurl:scripts+inurl:show+' + site,
        headers: { 'User-agent': 'Mozilla/5.0 (Greasemonkey) Firefox/3.0', },
        onload: function(rd) {
            try {
                resObj.innerHTML = rd.responseText;
                titles = document.evaluate('//a[@class="yschttl"]', 
                    document.body, 
                    null, 
                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
                    null);
                
                if (titles.snapshotLength == 0) {
                    status.innerHTML = '<b>No results found for this site.</b>';
                    return;
                } else {
                resultDiv.removeChild(status);
            }
            
            for (var i = 0; i < titles.snapshotLength; ++i) {
                res = titles.snapshotItem(i);
                text = res.textContent.replace(/user.*?\:/i, '');
                a = resultDiv.appendChild(document.createElement('a'));
                a.href = res.href;
                a.innerHTML = text;
                resultDiv.appendChild(document.createElement('br'));
            }
        } catch(err) {
            GM_log('error occured: ' + err);
        }
      }
    });
}

GM_registerMenuCommand("FindScripts", getMatching, "f", "control alt", "f");