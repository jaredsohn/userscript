// ==UserScript==
// @name          Gmail Full Width 2
// @author        Raffles
// @namespace     http://ratherodd.com/
// @description   For new version of Gmail: when viewing a message/conversation, the advertisement box on the right is removed and messages and reply box occupy the full width available. Long titles are optionally truncated.
// @include       http*://mail.google.tld/mail/*
// @version       0.3.2
// ==/UserScript==

var truncate = true; // truncate long subject lines so they fit on the same line as the sidebar links. Full subject revealed on mouseover
var minsubjchars = 14; // minimum length for subject line (if truncate === true, it will be truncated to this length)
var debug = 0; // set to 1 to enable error messages

window.addEventListener('load', function() {  
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
      gmail.registerViewChangeCallback(function() {
        if (gmail.getActiveViewType() !== 'cv') return;
        
        // references to key elements
        var ave = gmail.getActiveViewElement(), msgbod = ave.getElementsByTagName('td')[0], mid = msgbod.nextSibling, rhs = mid.nextSibling;
        var h1 = ave.getElementsByTagName('h1')[0];
        var h1text = h1.firstChild;
        
        // move rhs links to h1 block
        var mtools = rhs.getElementsByTagName('u')[0].parentNode.parentNode.parentNode;
        mtools = h1.appendChild(mtools);
        Array.forEach(h1.childNodes, function(block) {
          block.style.cssFloat = 'left';
          block.style.clear = 'none';
        });
        h1.parentNode.nextSibling.style.clear = 'both';
        mtools.style.cssFloat = 'right';
        mtools.style.margin = '-4px 8px 0 4px';
        Array.forEach(mtools.childNodes, function(div) {
          div.style.cssFloat = 'left';
          div.style.marginLeft = '4px';
          div.style.marginRight = '4px';
          div.style.fontWeight = 'normal';
          div.style.mozAppearance = '-moz-win-glass';
        });
        
        // hide rhs
        rhs.style.display = 'none';
        
        // Extra features in rhs kept, everything else (ads) removed
        var extrasInt = window.setInterval(function() {
          if (rhs.innerHTML.length > 0 && rhs.innerHTML.indexOf('Would you like') > -1) {
            var xres = document.evaluate('//div[contains(text(), "Would you like")]', rhs, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var mapthis = xres.snapshotItem(0).parentNode.cloneNode(true);
            rhs.innerHTML = '';
            rhs.appendChild(mapthis);
            rhs.style.display = '';
          }
          window.clearTimeout(extrasInt);
        }, 25);
        
        // truncation of subject line
        var truncInt = window.setInterval(function() { // otherwise offsetWidth measurements fail
          if (!mtools.offsetWidth) return;
          var h1w = msgbod.offsetWidth - mtools.offsetWidth - h1text.nextSibling.offsetWidth - 50;
          if (truncate && h1text.offsetWidth > h1w) {
            var loopcount = 0, subj = truncsubj = h1text.innerHTML.replace(/<wbr>/g,'');
            if (subj.length < minsubjchars) return window.clearTimeout(truncInt);
            while (h1text.offsetWidth > h1w) { // shorten subject until h1text will fit in h1 with space for other stuff to the right 
              h1text.innerHTML = truncsubj = truncsubj.substr(0, truncsubj.length - 4);
              loopcount++;
              if (loopcount > 100) {
                if (debug == 1) alert("loopcount has exceeded 100.\n\nPlease tell author of Gmail Full Width 2 at http://userscripts.org/scripts/show/15998 that this has happened, and that the subject line was " + subj.length + " characters long.\n\nAlso please mention whether the script is working properly other than for this annoying message.");
                break;
              }
            }
            if (loopcount <= 100) { // i.e. if no error with measuring h1text optimal width
              if (truncsubj.length < minsubjchars) truncsubj = subj.substr(0, minsubjchars);
              h1text.innerHTML = truncsubj + '...';
              h1.style.position = 'relative';
              h1text.style.width = h1w + 'px';
              h1text.style.position = 'absolute';
              h1text.style.left = '-1px';
              h1text.style.paddingLeft = '8px';
              h1text.style.backgroundColor = 'white';
              h1text.style.zIndex = '4';
              h1text.addEventListener('mouseover', function() {
                h1text.firstChild.nodeValue = subj.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&');
                h1text.style.borderBottom = '2px solid #CCC';
                h1text.style.paddingBottom = '4px';
                h1text.style.width = (msgbod.clientWidth - 36) + 'px';
              }, false);
              h1text.addEventListener('mouseout', function() {
                h1text.firstChild.nodeValue = truncsubj.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&') + '...';
                h1text.style.borderBottom = '';
                h1text.style.paddingBottom = '';
                h1text.style.width = h1w + 'px';
              }, false);
              h1text.nextSibling.style.marginLeft = (h1w + 20) + 'px';
            }
          }
          window.clearInterval(truncInt);
        }, 50);
        
        // Make reply textareas full width
        Array.forEach(msgbod.getElementsByTagName('textarea'), function(ta) {
          ta.style.width = '99%';
        });
      });
    });
  }
}, false);