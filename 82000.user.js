// ==UserScript==
// @name           Reddit Precise Time
// @namespace      itsnotlupus
// @description    While settle for "submitted 3 months ago" when you can have "submitted 3 months 13 days 21 hours 8 minutes 54 seconds ago" ?
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// @exclude        http://www.reddit.com/comscore-iframe/*
// ==/UserScript==

var domReady = false,
    dataReady = false,
    items = {};

// Check if jQuery's loaded
(function GM_wait() {
    if (typeof $ != 'undefined') { setup(); } //Opera
    else if (typeof this.jQuery != 'undefined') { $ = this.jQuery; setup(); } //Chrome
    else if (typeof unsafeWindow != 'undefined' && typeof unsafeWindow.jQuery != 'undefined') { $ = unsafeWindow.jQuery; setup(); } //Firefox
    else window.setTimeout(GM_wait, 100);
})();

// don't bother trying to load a json feed for the comscore iframe.
if (!/comscore-iframe/.test(location.href)) {
    //Get the URL for the JSON details of this comments page
    var loc = ""+location;
    var jsonURL = loc + "/.json";
    if(loc.indexOf("?") != -1) {
        jsonURL = loc.replace("?","/.json?");
    }

    //load the JSON
    GM_xmlhttpRequest({
        method: "GET",
        url:    jsonURL,
        onload: onloadJSON
    });
}

// this waits for the dom to be ready. boring.
function setup() {
    $(function() {
        domReady = true;
        parseDom();
    });
}

function onloadJSON(response) {
    var jsonText = response.responseText;
    //Parse the json text
    processTree(eval("("+jsonText+")"));
}

function processTree(data) {
    var hash = {};

    function processData(data) {
        if (data.name && data.created_utc) {
            hash[data.name] = data;
        }
        var c = data.replies?data.replies.data.children:data.children;
        if (c) {
          for (var i=0,l=c.length;i<l;i++) {
            processData(c[i].data);
          }
        }
    }

    dataReady = true;
    //console.log("data=", data);
    if (!data.length) {
        data = [ data ];
    }
    for (var i=0;i<data.length;i++) {
      processData(data[i].data);
    }
    items = hash;
    //console.log("items: ",items);
    parseDom();
}


function parseDom() {
  if (!domReady || !dataReady) {
    return;
  }
  $(".thing").each(function(i,e){ 
    var id = e.className.replace(/.* id-([^ ]+) .*/,'$1'), line = $(e).find(".tagline");
    if (line[0]&&line[0].firstChild) {
      var t = line[0].firstChild;
      if (t.tagName&&t.tagName.toLowerCase() == "a") {
        t = t.parentNode.getElementsByClassName("score likes")[0].nextSibling;
      }
      if (items[id]) {
          items[id].date_node = t;
      }
    }
  });
  // ready to roll.
  setInterval(updateDates, 1000); // increase interval if too distracting.
  updateDates();
}

function updateDates() {
    var item, now = Math.floor(new Date/1000), str, text, node, delta, v;
    for (var id in items) {
        item = items[id];
        node = item.date_node;
        if (!node||!node.nodeValue) { continue; }
        delta = now - item.created_utc;
        str = "";
        function chunk(period,singular,plural){
            if (delta>=period) {
                v = Math.floor(delta/period);
                if (v>0) {
                    str += v+" "+(v>1?plural:singular)+" ";
                }
                delta %= period;
            }
        }
        // some of those computations are approximative, and go against the very spirit of this userscript. sorry.
        chunk( 3600*24*365.25, "year", "years");
        chunk( 3600*24*30.4167, "month", "months");
        chunk( 3600*24, "day", "days");
        chunk( 3600, "hour", "hours");
        chunk( 60, "minute", "minutes");
        chunk( 1, "second", "seconds");
        // awkward attempt at not trashing strings we don't modify.
        node.nodeValue = node.nodeValue.replace(/^(.*? )(\d+ \w+,? ?)+(.*?)$/, "$1"+str+" $3");
    }
}
