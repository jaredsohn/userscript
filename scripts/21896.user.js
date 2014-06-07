// ==UserScript==
// @name Travian: Quick Maps+ v1.2.3
// @author ondy1985 <ondy1985 (at) gmail (dot) com, HaxLi
// @namespace      Travian
// @description    Adds "show on a map" button next to each player or alliance and statistic sites of travutil.com and travian.ws. Changes by HaxLi.
// @version 1.2.3
// @include        http://*.travian.*/*
// ==/UserScript==


// Your ally name
var ally = "Baltija2";


var server = location.hostname.match(/(\w+[.]travian[.]\w+([.]\w+)?)/i)[1];
var svr = location.hostname.match(/travian[.](\w+)/i)[1] + location.hostname.match(/(\d)[.]travian/i)[1];

var w = window.innerWidth;
var h = window.innerHeight;

var popW = 768, popH = 512;

var leftPos = (w-popW)/2, topPos = (h-popH)/2;

var IMG_GLOBE = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQW' +
		'RvYmUgSW1hZ2VSZWFkeXHJZTwAAAI2SURBVHjaHI5fSBNxAMe/99vl2p9bW62YseVWKSyJaGoaLk0jfCihHnrQiKje' +
		'CxLqJQgEseghCHzpYdFTLxlSQgUra0XLwNDRWFvq5G5bTed2t7vdbbety/V5+D59vvCh8pKC+Mo65LqILm8rvs0vDS' +
		'yups7Xqgpx7XW+6us99jbyI4Y6ZcLp7gOgGofl5AbqOnng85f4bF/PEWObywlCNES5NN4Ew5WT3e2jSs3wYrDLA0LT' +
		'OjCmpsE7Uwvv233dRhh3YaVYRILfhNViwpmhIf29QGSaMW67RNMElKZp8I9MaN6OIex3arB7HHC02UAoHYpZGdwii2' +
		'iyirmvYbAzNyg6NJ/wp2Q9qBQLkbLC3+lGYbsOunoT1vgComkZ8V8cOJZGaDF1m8RWk6f0Zgp2pxm2PVbAooeq14NX' +
		'VXDZLFbTAuRyHSc6bZgNJzrIek6kdVtZRiNgbrYg8imJSDAOk4Xg0NEWKHkZTjuDMhFQ41ma+Du9waJQgVCqQFHyyC' +
		'yl8XrqO6YfhSEVqlCVEpgdBuS43zh+2JMkbT7vR0aTILIqNjM5NLsdkItlVPga1tfS6OhpgagK0CQBF872T5KSXEHg' +
		'7uhIbGkB3FoWYl7EPjcDV4sB7HIOmewfhObeYfz68FNRKeeo6IaEVOQnSqR25dbETACMDTt3O6BqArKcAKJs4v7Yuc' +
		'DF4f5r2II0plb/C14qP3n5eIwav+y7edCQf9ZKKc8nr/Y+SH14aM/x0n+5wT8BBgAq+wP5CWdgHAAAAABJRU5ErkJg' +
		'gg==';

var IMG_UTIL = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQW' +
	'RvYmUgSW1hZ2VSZWFkeXHJZTwAAAIlSURBVHjaNJHLaxNRGMXP3HsnM5NWtBNTm6LmVQ1pQWtFKVWxCtql9YFKFSy1' +
	'qFtXunDlyn9AhII1LgrWRd1YiwsX1kfVgEhFqDVNQkg1TWuSJplJMk8nCw+c3Y+P75zDHX16BH3hPvi3+iFL8k2JSa' +
	'OEciHYHCzDSqqm+mSplJ64GozAw1xgcEQ4slPRq58pSGeDb4AR1uTRMGrtlUa5f1Ndv0tI9KDDFRkhBAWlMG9ZVmdN' +
	'qEM0JfDUBcs24eYEXNw1jHzbRvDRl1j8/vEzXbRyoHa7ZqqX3aIAX4sX7YIMZtjYVEpIFtNYy2exX+7GMf8p+eOP9x' +
	'4G3RgLi16MBM7CRztQqVWQ1zaww7UdK7kkHq7F8Db5CrPX46gWB0bZcM9g5PGlGXxanMO1mXFobht7O0IYiV5AtxRA' +
	'JBzAUNcJVEq/EfswuYWd6znPN4N/zS5gWUmjjfcikUtjni6gBQI8ooypN9N4vTSOVa1gMEOvZRx+963Td5DT/2Lq+0' +
	'uodQ0vludgGgYMzbFpgjrNudziTxod8rRm1v+c7A0OoFfeh2fxaaioQ3CaooRCICIEXgSxnbMmHnCZwnNE711JDIb6' +
	'w4rZQEpbBROa8xBwNoFhG9CrOqolJcFRbg/hwIHx7kOz396lFzcTkLwSBJ8E0SeC38ZDUzQUs6W0qZuHm1n/L10kNg' +
	'uWf5VvqCl1jAo0COcFo66nrLo1SVvpBBVpE8U/AQYAVk3b/vK4ngQAAAAASUVORK5CYII=';

function append(IMG,r) { 
  var child = document.createElement("a");
  child.setAttribute("onclick", "window.open('" + url + "', new Date().getTime(), 'scrollbars=1,width="+popW+",height="+popH+",top="+topPos+",left="+leftPos+"'); return false;");
  child.setAttribute("href", url);
  child.setAttribute("style", "display: inline; margin-left: 3px; margin-right: "+r+"px;");
  child.innerHTML = '<img src="'+IMG+'" />';
  a.parentNode.insertBefore(child,a.nextSibling);
}

for (var i = 0; i < document.links.length; i++) {
  var a = document.links[i];
  if (a.parentNode.className != 'menu') {
    if (a.getAttribute('href').search(/allianz[.]php[?]aid=/i) != -1) {
      var who = a.getAttribute('href').replace(/allianz[.]php[?]aid=/, '');
      url = "http://travmap.shishnet.org/map.php?lang=en&server="+server+"&alliance=id:"+who+","+ally+"&groupby=alliance&order=population&azoom=on&format=svg&";
      append(IMG_GLOBE,2);
      url = "http://travutils.com/en/?s="+svr+"&ida="+who;
      append(IMG_UTIL,0);
      url = "http://travian.ws/analyser.pl?s="+svr+"&aid="+who;
      append(IMG_UTIL,0);
    } else if (a.getAttribute('href').search(/spieler[.]php[?]uid=/i) != -1) {
      var who = a.getAttribute('href').replace(/spieler[.]php[?]uid=/, '');
      url = "http://travmap.shishnet.org/map.php?lang=en&server="+server+"&player=id:"+who+"&alliance="+ally+"&groupby=alliance&order=population&azoom=on&format=svg&";
      append(IMG_GLOBE,2);
      url = "http://travutils.com/en/?s="+svr+"&idu="+who;
      append(IMG_UTIL,0);
      url = "http://travian.ws/analyser.pl?s="+svr+"&uid="+who;
      append(IMG_UTIL,0);
    }
  }
}