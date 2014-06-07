// ==UserScript==
// @name           ZipSane
// @namespace      http://www.google.com
// @description    check zippyshare links in google search results
// @include        https://encrypted.google.*/search*
// @include        https://*.google.*/search*
// @include        http://*.google.*/search*
// ==/UserScript==

var tickimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACmklEQVR4XqWT60tTcRyH+zt2znZsggQyohBBQqi9ChKJTbOhmJdlabqdXbzSNmPYTIsycl7GSCkts9Rqc05t6tTm1pQycdlRQsy96UK1YXSxTz/Oi5kkvvHFA+fFeZ4vv9s+AHviP6HAfzQ+d/qIIdubwmU8OxSRjUgiMnciJ3MlGtIdB+J3DeT5UuUKb3JY71XgTsiKvuUuns7FZpS4T0Lay4SlPYx8xwCZKs8cT4remDPBtdoP+5ubMM9V8pBvOFf70DhThcN2YTTZLpRvC+R4U8SZnqR1IvM/1gTLUBEogXbmPPSEckK1/wIc7x7iylQFJFZ6XXKLFscCCk+SkR3L4icTmRdZ31mopguhmiqAZqoQnrVBGH1qOEkkt+c4Eq7TxlggY0TCdYaaYQs1ocJfDPVzJRHzoZ4kePMx/t4NAAhH19D2qhH2uUbE1dNcLHDCkbDxeOUeaoNa6HxFZA8GsPh5HuxEIcbWhnj59+YvtL28CuNEMfpCnRCZqI1YQPqI2ehf7oYpwKI2oMPXH1946dP3DzHZOlsPjTsbBs859Ic6IKr5N9DDcLfnm9C+cA36SSUs/mpEf37j5c0/m7C+uIwyVxa0JNASrEO7zwKmitpaQupdkVE5kAbHygNUTyih8ZxB3XQ5lj4uoG22AaWDp6BynobelQPH226k246BqaS2NjHZJhQfJEdj8WrxhLuPytE86IZzwA4poHYSeDkbT5e6YBoqhkgjWGc0VOwYeRKbaHlcAxU1e8rgJJHWoAWG0SJcHFailSzBQWSDqwjCUkGUyPIdr/L+BlrOmKmwrEOK9oAFva9t6J23weozI60lFSKVIMywRN7tMTGX6HjGSBmYGooT6QQRESuIkIkcwcCUUjs+pj3xF2fQrOXD2GDaAAAAAElFTkSuQmCC';
var resultlinks = document.evaluate("//a[@class='l']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var zippylinkstd = /www(\d{1,3})\.zippyshare\.com\/view\.jsp\?locale=[A-Za-z]+&key=(\d+)/;
var zippylinkshort = /www(\d{1,3})\.zippyshare\.com\/v\/(\d+)\/file\.html/;
var deadexp = /File does not exist on this server/;
var zippyuri = 'http://www%server%.zippyshare.com/v/%key%/file.html';
var zippylinks = [];
var zippylink = '';

for (var i=0; i<resultlinks.snapshotLength; i++)
{
	var matches = [];
	if(zippylinkstd.test(resultlinks.snapshotItem(i).href))
	{
		matches = zippylinkstd.exec(resultlinks.snapshotItem(i).href);
		zippylink = zippyuri;
		zippylink = zippylink.replace('%server%', matches[1]);
		zippylink = zippylink.replace('%key%', matches[2]);
		resultlinks.snapshotItem(i).href = zippylink; // rewrite to short for later fixing
		zippylinks.push(zippylink);
	}
	else if(zippylinkshort.test(resultlinks.snapshotItem(i).href))
	{
		matches = zippylinkshort.exec(resultlinks.snapshotItem(i).href);
		zippylink = zippyuri;
		zippylink = zippylink.replace('%server%', matches[1]);
		zippylink = zippylink.replace('%key%', matches[2]);
		zippylinks.push(zippylink);
	}
}

zippylinks = unique(zippylinks);
for (var i in zippylinks)
{
	(function(l) {
		GM_xmlhttpRequest({
			url: l,
			method: "GET",
			onload: function(data) {
				if(deadexp.test(data.responseText))
				{
					// format dead link
					for (var j=0; j<resultlinks.snapshotLength; j++)
					{
						if(resultlinks.snapshotItem(j).href == l)
						{
							resultlinks.snapshotItem(j).style.textDecoration = 'line-through';
							resultlinks.snapshotItem(j).style.color = '#ccc';
						}
					}
				}
				else
				{
					// alive!
					for (var j=0; j<resultlinks.snapshotLength; j++)
					{
						if(resultlinks.snapshotItem(j).href == l)
						{
							tick = document.createElement('img');
							tick.alt = 'Zippyshare link alive!';
							tick.src = tickimg;
							
							resultlinks.snapshotItem(j).parentNode.insertBefore(tick, resultlinks.snapshotItem(j));
						}
					}
				}
			},
			synchronous: false
		});
	})(zippylinks[i]);
}

function unique(array){
  var b = [];
  for(var i=0; i<array.length; i++){
     if(b.indexOf(array[i]) == -1) b.push(array[i]);
  }
  return b;
}