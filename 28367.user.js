// ==UserScript==
// @name          YESHfinder
// @namespace     http://rjpower.org/greasemonkey
// @description   Finds greasemonkey scripts related to the site you are currently 
//                viewing.  To use, just hit CTRL+ALT+f while viewing a site you 
//                are interested in.  Results will appear in a tab at the top of 
//                the page.
// @include       *
// @exclude       *userscripts.org*
// ==/UserScript==

(function () {

function getMatching() {
  GM_addStyle('.fsresults {                     \
  z-index: 100;                                 \
  position: absolute;                           \
  font-size: 10pt;                              \
  left: 1em;                                    \
  top: 1em;                                     \
  width: 20%;                                   \
  background-color: #eeeeee;                    \
  border: dotted 1px;                           \
}');

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

  // Add a hidden div to the page to hold the contents of the RPC.
  var searchFrame = document.createElement('div');
  searchFrame.setAttribute('id', 'scriptSearchResults');
  searchFrame.setAttribute('name', 'scriptSearchResults');

  resObj = document.body.appendChild(searchFrame);
  resObj.style.display = 'none';

  // Add a div to hold the results.
  resultDiv = document.body.appendChild(document.createElement('div'));
  resultDiv.className = 'fsresults';  
  header = resultDiv.appendChild(document.createElement('div'));
  header.style.backgroundColor = '#333366';
  header.style.color = '#ffffff';
  header.innerHTML = 'Matching Scripts (click here to hide)';
  
  header.addEventListener('mousedown', 
                          function (e) {
                            resultDiv.style.display = 'none';
                          }, false);

  status = resultDiv.appendChild(document.createElement('p'));
  status.innerHTML = "Please wait, searching...";

  GM_xmlhttpRequest({
   method: 'GET',
        url: 'http://www.google.com/search?q=site:userscripts.org+inurl:scripts+inurl:show+' + site,
        headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
        onload: function(rd) {
        try {
          resObj.innerHTML = rd.responseText;
          titles = document.evaluate("//a[@class='l']", resObj, null,
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

// Disabled util GM_registerMenuCommand stops inserting multiple entries.
// try { GM_registerMenuCommand("Find Scripts", getMatching); }catch(e) {}

 function keyHandler(e) {
   if (e.altKey && e.ctrlKey && String.fromCharCode(e.charCode) == 'f') {
     getMatching();
   }
 }

 document.addEventListener('keypress', keyHandler, false);
})();
