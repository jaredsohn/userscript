// ==UserScript==
// @name           Welt
// @namespace      http://welt.de
// @include        http://www.welt.de/*
// ==/UserScript==

function dummy() {
}

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/prototype/1.6.0.2/prototype.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
  if(typeof unsafeWindow.Prototype == 'undefined') { window.setTimeout(GM_wait,100); }
  else { 
    PT = unsafeWindow;
    /* open all links in a new tab */
    /*
    var arr = PT.$$("a");
    for(i=0; i<arr.length;i++) {
      arr[i].target = "_blank";
    }
    */
    var link=PT.$$("a.nextPage"); 
    link[0].href.match(/page=([0-9]+)/);
    var startpage = parseInt(RegExp.$1);
    loadPage(link[0].href, startpage);
  }
}
GM_wait();



function loadPage(link, page) {
  var l = link.replace(/page=[0-9]+/,"page="+page);
  console.debug(l);
  
  GM_xmlhttpRequest({
    method: 'GET',
	url: l,
	onload: function(responseDetails) {
	var t = responseDetails.responseText;
	t = t.replace(/\n/g,'');
	t = t.replace(/\r/g,'');
	
	var re = /id="readcomments".*?(<dl.*?<\/dl>)/;
	re.exec(t);
	
	var dl = RegExp.$1;
	var commentDiv=PT.$("readcomments").select("dl")[0];
	
	var e = new PT.Element("DIV").update(dl);
	commentDiv.appendChild(e);
	if (t.match(/class="nextPage"/)) {
	  loadPage(link,page+1);
	} else {
	  PT.$$("div.pagination")[0].update("<b>Sucessfully loaded "+(page+1)+" pages.</b>");
	}
      }
    });
}
