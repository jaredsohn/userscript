// ==UserScript==
// @name           GAE Log Timezone Adjuster
// @namespace      http://d.hatena.ne.jp/matsuza
// @include        http://appengine.google.com/logs*
// @include        https://appengine.google.com/logs*
// @description    Adjusts GAE's log timezone(PST) to your local timezone.
// Thanks to Matthew Flaschen; http://userscripts.org/topics/41840
// ==/UserScript==

var PAT_DATE = /^(\d\d)-(\d\d) (\d\d):(\d\d)(AM|PM) (\d\d)\.(\d\d\d)$/;
var PST_TZ_URL = "http://json-time.appspot.com/time.json?tz=America/Los_Angeles";
var potentialUpdate = false;

function padding(text, pad, len){
  var ret = "";
  var i;
  for(i = 0; i < len; ++i){
    ret += pad;
  }
  ret += text;
  return ret.substring(ret.length - len, ret.length);
}

function adjustTz(offset, xpath){
  var node;
  var date;
  var match;
  var iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
  var nodes = [];
  var node;
  var i;
  var hour;
  while(node = iterator.iterateNext()){
    if(node.textContent.match(PAT_DATE)){
      nodes[nodes.length] = node;
    }
  }
  for(i = 0; i < nodes.length; ++i){
    node = nodes[i];
    match = node.textContent.match(PAT_DATE);
    if(match){
      date = new Date();

      date.setMonth(match[1] - 1, match[2]);
      hour = parseInt(match[3], 10);
      if(hour == 12){
        hour -= 12;
      }
      date.setHours(match[5] == "AM" ? hour : hour + 12);
      date.setMinutes(match[4]);
      date.setSeconds(match[6], match[7]);
      date.setTime(date.getTime() + offset);
      var hours = date.getHours();
      var meridian;
      if(hours >= 12)
      {
	      meridian = "PM";
	      if(hours != 12)
	      {
		      hours -= 12;
	      }
      }
      else
      {
	      meridian = "AM";
	      if(hours == 0)
	      {
		      hours = 12;
	      }
      }
      node.textContent = padding(date.getMonth() + 1, "0", 2) + "-" + padding(date.getDate(), "0", 2) + " " + padding(hours, "0", 2) + ":" + padding(date.getMinutes(), "0", 2) + meridian + " " + padding(date.getSeconds(), "0", 2) + "." + padding(date.getMilliseconds(), "0", 3); 
    }
  }
}

function periodicalUpdate(offset){
  if(!potentialUpdate){
    return;
  }
  adjustTz(offset, "//h5/span");
  potentialUpdate = false;
}

GM_xmlhttpRequest({
  method : "GET",
  url : PST_TZ_URL,
  onload : function(resp){
    var o = eval("(" + resp.responseText + ")");
    var psttz = o.datetime.match(/.*((\+|-)\d\d\d\d)$/)[1] / 100 * 60 * 60 * 1000;
    var yourtz = - new Date().getTimezoneOffset() * 60 * 1000;
    var offset = yourtz - psttz;
    adjustTz(offset, "//h5/span");
    document.getElementById("ae-logs").addEventListener("DOMNodeInserted", 
      function(){potentialUpdate = true;}, false);
    setInterval((function(){return function(){periodicalUpdate(offset);}})(), 1000);
  }
});

