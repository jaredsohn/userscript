// ==UserScript==
// @name           Buglist
// @description    dummy one
// @include http://bug.corp.yahoo.com/buglist.cgi*
// ==/UserScript==

var styles = '<style type="text/css">span.yregfloathelp{ border: 1px solid #FFC30E; padding:2px 2 2 2px;background-color: #FFFBB8;text-align: left;color: #9C7600;width: 24em;font-size: 11px;font-family: arial, sans-serif;display:none;position:absolute;z-index:3;}</style>';
 document.body.innerHTML += styles;

/************************************************************/
var YAHOO;
var GM_DYNLOADER = {};

GM_DYNLOADER.scriptList = [
    { obj: 'YAHOO', libURL: "http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/yahoo_2.1.0.js" },
    { obj: 'YAHOO.util.Event', libURL: "http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/event_2.1.0.js" },
    { obj: 'YAHOO.util.Dom', libURL: "http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/dom_2.1.0.js" },
    { obj: 'YAHOO.util.Anim', libURL: "http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/animation_2.1.0.js" },
    { obj: 'YAHOO.widget.Module', libURL: "http://us.js2.yimg.com/us.js.yimg.com/lib/common/widgets/2/container/container_2.1.0.js" },
];


// START LOADER CODE -- THIS IS WHERE THE MAGIC HAPPENS

GM_DYNLOADER.loaderTimer = { timeout: 6000, interval: 300, current: 0 }

GM_DYNLOADER.loaderCheck = function() {
    var t = GM_DYNLOADER.loaderTimer;
    var ud = unsafeWindow.document;

    t.current += t.interval;

    if (t.current >= t.timeout) { unsafeWindow.console.warn("GM_DYNLOADER.loaderCheck() timeout!"); return; }

    if (ud.GM_DYNLOADER.go) {
        YAHOO = unsafeWindow.YAHOO;
        delete ud.GM_DYNLOADER;
        GM_DYNLOADER.run()
    } else {
        setTimeout(GM_DYNLOADER.loaderCheck, t.interval);
    }
}

GM_DYNLOADER.loader = function() {
    if (document.contentType != 'text/html') { return; }

    var ud = unsafeWindow.document;
    ud.GM_DYNLOADER = {
                            numberLoaded: 0,
                            numberTotal: 0,
                            go: false,
                            countLoaded: function() {
                                if (++this.numberLoaded == this.numberTotal) { this.go = true; }
                            }
                        };

    for (var i in GM_DYNLOADER.scriptList) {
        var lib = GM_DYNLOADER.scriptList[i];

        var libIsLoadedAlready;
        try { eval('libIsLoadedAlready = unsafeWindow.'+lib.obj); } catch(e) {}

        if (!libIsLoadedAlready) {
            ud.GM_DYNLOADER.numberTotal++;

            var tag = document.createElement("SCRIPT");
            tag.src = lib.libURL;

            // this needs more elegance, but hey, it's late
            tag.setAttribute("onload", "document.GM_DYNLOADER.countLoaded();");

            document.body.appendChild(tag);
        }
    }

    if (ud.GM_DYNLOADER.numberTotal > 0) {
        setTimeout(GM_DYNLOADER.loaderCheck, GM_DYNLOADER.loaderTimer.interval);
    }
    else {
        ud.GM_DYNLOADER.go = true;
        GM_DYNLOADER.loaderCheck();
    }
}
// END LOADER CODE

GM_DYNLOADER.run = function() {
    // ALL YOUR GREASEMONKEY STUFF USING THE YUI LIBRARY GOES HERE
    // unsafeWindow.console.info("GM_DYNLOADER.run() triggered!");

var a = document.getElementsByTagName('td');
var b = a[2].getElementsByTagName('b');

var userid = b[0].innerHTML;

   var tp = document.getElementsByTagName('table');
   var tpp = tp[3].getElementsByTagName('tbody');
   var tppp = tpp[0].getElementsByTagName('tr');

  for(var i=1;i<=tppp.length;i++)
 { 
  var tpppp = tppp[i].getElementsByTagName('td');
 var bugnumber = tpppp[0].innerHTML;

 tpppp[0].innerHTML="<a href='show_bug.cgi?id="+bugnumber+"' id='"+bugnumber+"'>"+bugnumber+"</a>";

var ifl=document.createElement("SPAN");
ifl.setAttribute("id","popup");
ifl.setAttribute("class","yregfloathelp");

var queryBox=document.getElementById(bugnumber);
var wholeCell=queryBox.parentNode;
wholeCell.appendChild(ifl);


YAHOO.util.Event.addListener(bugnumber,"mouseover",function() {
	
      document.getElementById('popup').style.display = 'block';
      GM_xmlhttpRequest({     method:'GET',   
      url:'http://csathya.bangalore.corp.yahoo.com/hacks/call.php?user='+userid+'&bug='+bugnumber,
      onload: function(responseDetails) {  
	if(responseDetails.responseText == ' ')
	{
     document.getElementById('popup').innerHTML = 'No notes entered yet';
      }
     document.getElementById('popup').innerHTML = responseDetails.responseText;
       }
    });
   },false);     
   
YAHOO.util.Event.addListener(bugnumber,"mouseout",function() { 
		document.getElementById('popup').style.display = 'none';
	},false);

}
}

setTimeout(GM_DYNLOADER.loader, 500);





