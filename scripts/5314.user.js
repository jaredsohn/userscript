// ==UserScript==
// @name           GenerateTinyUrls
// @namespace      http://www.defhoboz.biz/
// @description    Generate tiny urls from all links on a page
// @include        *
// ==/UserScript==

function getTinyAndInsert() {
  var theanchor=this;
  GM_xmlhttpRequest({
		method: 'GET',
		url: "http://tinyurl.com/create.php?url=" + this.parentNode.previousSibling.href,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				var thetinyurl=responseDetails.responseText.match(/<blockquote><b>(http\:\/\/tinyurl\.com\/[a-zA-Z0-9]+)<\/b><p>/)[1];
        theanchor.parentNode.previousSibling.href=thetinyurl
        theanchor.parentNode.innerHTML=""
			}	
		}
	});
}

var d,rid
var alinkholder=document.getElementsByTagName('a')

for (var i=0;i<alinkholder.length;i++) {
  var alink=alinkholder[i];
  if (alink.href&&(alink.href.match('http://'))&&(alink.href.length>23)) {
    d=document.createElement('span')
    rid=parseInt(Math.random() * 100 * Math.random()* 100 * Math.random()* 100* Math.random()* 100)
    d.innerHTML+="&nbsp;<a title='Make this link a TinyURL!' href='javascript://change this to TinyURL' id='"+rid+"'>&laquo;</a>"
    alinkholder[i].parentNode.insertBefore(d,alinkholder[i].nextSibling)
    document.getElementById(rid).addEventListener("click",getTinyAndInsert,false)
  }
}

