// ==UserScript==
// @name           pTube Helper
// @version	   0.2
// @namespace      http://www.porntube.com
// @description    I'm not a pervert... 
// @match			http://www.porntube.com/*
// ==/UserScript==

var xData = document.getElementById('mpl').getAttribute('flashvars');
xData = xData.replace('config=','')
http = new XMLHttpRequest();http = new XMLHttpRequest();
http.open("GET", 'http://www.porntube.com' + xData, true);
http.onreadystatechange = useHttpResponse;
http.send(null);

function useHttpResponse() {
  if (http.readyState == 4) {
	//alert(http.responseText);
	var res = http.responseText.split('<file>');
	var res1 = res[1].split('</file>');
	var dlButt = document.createElement('a');
	dlButt.setAttribute('target','_blank');
	dlButt.innerHTML = '<b>[Download]</b>'
	dlButt.setAttribute('href',res1[0]);
	var h2s = document.getElementsByTagName('h2');
	var y = 0;
	for (var x = 0; x < h2s.length; x++){
		if(h2s.item(x).getAttribute('class')=='videoTitle'){
			h2s.item(x).appendChild(dlButt);
		}
	}
  }
}