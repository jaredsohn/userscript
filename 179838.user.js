// ==UserScript==
// @id             www.dailymotion.com-f7a449c1-fce1-4f45-b9e7-1a6a54ab713d@http://foobar.com/baz
// @name           DailyMotion: Usable Dailymotion Feed 
// @version        0.9
// @namespace      http://foobar.com/baz
// @author         David Toso
// @description    Fix up the 'feed' sidebar so that it's more usable.
// @include        http://www.dailymotion.com/*
// @run-at         document-end
// ==/UserScript==

(function(){
  
  // Replace whatever unsafeWindow we find with itself or a useful equivalent
  unsafeWindow = (function () {
    var dummy = document.createElement('p');
    dummy.setAttribute('onclick', 'return window;');
    return dummy.onclick ();
  })();

  // Build selector engine from whatever we have! (as of 1.1: jQuery, or document.querySelectorAll)
  var sel = unsafeWindow.jQuery ? unsafeWindow.jQuery : function(_sel, _doc) { return _doc.querySelectorAll(_sel); };
  var first = function(e) { return unsafeWindow.jQuery ? e.get(0) : e[0]; };
  var nth = function(e,n) { return unsafeWindow.jQuery ? e.get(n) : e[n]; };
 
  // Get document!
  var doc = unsafeWindow.document;

  // helper: Wait for some element to exist in the DOM
  var waitFor = function(selector, cb) {
    if (sel(selector, doc).length > 0) return cb();
    else setTimeout(function(){ waitFor(selector, cb); }, 200); // TO DO: give up eventually?
  };

  // Wait for the first message in the feed to be available
  waitFor('div#feed_section.viewport div.overview div.media div.bd div.message', function(){

    // find facebook shite & remove it!
    var fbc_call = first(sel('div#fbc_call', doc));
    fbc_call.parentNode.removeChild(fbc_call);

    // find bottom bar & remove it
    var bottom_bar = first(sel('div#ticker.sd_ticker div.content div.bottom_bar', doc));
    bottom_bar.parentNode.removeChild(bottom_bar);

    // restyle the feed section!
    var mpfx = "div#feed_section div.overview div.media div.bd div.message"
    var act_cont = first(sel('div#activities_cont', doc));
    var feed_height = parseInt(doc.defaultView.getComputedStyle(act_cont,null).getPropertyValue('height')) - 19;
    var css = doc.createElement('STYLE'); css.type = "text/css"; css.innerHTML = "\n"+
      mpfx+" span.dm_playlist a { color: red !important; }\n"+mpfx+" span.dm_video a { color: green !important; }\n"+
      mpfx+" span.dm_num_others { color: blue; }\n"+mpfx+" { width: 237px !important; }\ndiv#feed_title.title span.title_icon { "+
      "display: block !important; height: 4px !important; visibility: hidden !important; position: inherit !important; }\n"+
      "div#feed_title { height: 45px !important; background-color: #006DA1 !important; background-image: "+
      "-moz-linear-gradient(center bottom , #004E72 20%, #006DA1 100%) !important; border-top: 1px solid #006DA1 !important; "+
      "color: white !important; font-size: 19px !important; padding: 0 0 0 9px !important; }\ndiv#feed_section div.overview { "+
      "width: 303px !important; }\ndiv#feed_section { width: 313px !important; box-shadow: 0 0 5px #888888 !important; height: "+
      feed_height+"px !important; background-color: white !important; }\ndiv#ticker div.content { width: 315px !important; }\n"+
      "div#ticker_tooltip { left: -300px; width: 230px; }\ndiv#ticker.sd_ticker { width: 316px !important; background-color: "+
      "transparent !important; border-left: 0px !important; box-shadow: none !important; }\n";
    doc.body.appendChild(css);

    // color-code "and N other(s)." textNodes
    var messages = sel('div#feed_section div.overview div.media div.bd div.message', doc);
    for (var i=0; i<messages.length; i++) {
      var msg_span = nth(messages, i);
      var last_child = msg_span.childNodes[msg_span.childNodes.length - 1];
      if (last_child.nodeType == 3) {
        last_child.nodeValue.replace(/and ([0-9]+ others?)\./, function(_m, _no) { 
          msg_span.removeChild(last_child);
          msg_span.appendChild(doc.createTextNode(' and '));
          var num_span = doc.createElement('SPAN');
          num_span.className = 'dm_num_others';
          num_span.appendChild(doc.createTextNode(_no));
          msg_span.appendChild(num_span);
          msg_span.appendChild(doc.createTextNode('.'));
        });
      }
    }

  });

})();


