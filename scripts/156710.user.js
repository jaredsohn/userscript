// ==UserScript==
// @name        yahoo_dir
// @namespace   http://y_test.0tt.0t0.jp
// @description analyze yahoo_dir
// @include     http://dir.yahoo.co.jp/*
// @version     0.1
// ==/UserScript==

setHTML('/html/body/div[5]/div/div/div[2]/ul/li/strong/a');

function setHTML(xpath)  {
  var e = document.evaluate(xpath, document, null,
                     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if(!e.snapshotLength) {
    console.log('none');
  } 
  else {
      var i = 0;
      getHttp(e,i);
  }
}

function getHttp(e,n){
    if(n >= e.snapshotLength){
	return 0;
    }
    var newElement = document.createElement('div');
    var fqdn = String(e.snapshotItem(n)).replace(/https?:\/\//,"").replace(/\/.*/,"");
    
    GM_xmlhttpRequest({
	    method: "GET",
	    url: "http://whois-snumano4.dotcloud.com/result?textarea="+fqdn,
	    onload: function(response) {
		var result = response.responseText.match(/(AS\d+)<\/A><\/TD>\n\s+<TD>(.*)<\/TD>/);
		newElement.innerHTML = (fqdn+" : "+result[1]+" : "+result[2]);
		e.snapshotItem(n).parentNode.insertBefore(newElement,e.snapshotItem(n).nextSibling);

		getHttp(e,n+1);
	    }
	});
}
