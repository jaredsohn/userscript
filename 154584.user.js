// ==UserScript==
// @name        Root.cz - zpruhledneni PR clanku
// @namespace   366.hopto.org
// @include     http://www.root.cz/
// @version     1
// ==/UserScript==

function addStyle(style) {
  var head = document.getElementsByTagName("HEAD")[0];
  var ele = head.appendChild(window.document.createElement('style'));
  ele.innerHTML = style;
  return ele;
}

var result = document.evaluate("//h4[@class='admarker']/..", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(i=0;i<result.snapshotLength;i++){
  var h=result.snapshotItem(i);
  h.className+=" adfix";
}

//addStyle('.adfix { opacity: 0.2; } .adfix:hover { opacity: 0.95; }');
addStyle('.adfix { opacity: 0.2; }');

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
//        alert($); // check if the dollar (jquery) function works
//        alert($().jquery); // check jQuery version
        
        $(".adfix").hover(
          function() {
            $(this).stop().animate({"opacity": "0.95"}, "slow");
          },
          function() {
            $(this).stop().animate({"opacity": "0.2"}, "slow");
        });
    }
    
