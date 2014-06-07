// ==UserScript==
// @name			Mediafire Helper
// @namespace		http://userscripts.org/scripts/show/24984
// @description		Mediafire Helper
// @include			*
// @exclude			http://*.mediafire.com/*
// @exclude			http://mediafire.com/*
// @exclude			http://*mf.huhiho.com*
// @version			1.1
// @author			redphoenix89
// ==/UserScript==

const currentVersion = '1.1';

function checkForUpdate() {
	var date = new Date();
	var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastCheck = GM_getValue('lastCheck');

	if (!lastCheck || lastCheck != today) {
		GM_xmlhttpRequest({
        	method: "GET",
        	url: 'http://mf.huhiho.com/version.txt?t='+today,
        	onload: function(results) {
				var version = results.responseText;
				if (version.length && version != currentVersion) {
					if (confirm('[ Greasemonkey ] Mediafire Helper : Version '+ version +' is now available. Update ?')) {
						GM_openInTab('http://mf.huhiho.com');
					}
				}
			},
        });
	}
	GM_setValue('lastCheck',today);
}

checkForUpdate();

var currentURL = window.location.href;

var extraInfo = true;

var downloadIcon	=	'data:image/gif;base64,R0lGODlhEAAQAMQAAIWOl8rKyoibetPT02hoarm6usPDw/Pz89ra2uTk5Hl6e6mrpmGNRH2vWunp6e3t7ZPNX47LVbW1tZPIa5nXWvv7+1hZXfT2+HFxcfNXV2FhYZ6ens7OzvDw8GOPRf///yH5BAAAAAAALAAAAAAQABAAAAWf4CeOX9SQJGIYi+CZniBsQCEa5Nt44nUBIlvCQ6RMiB7ORRH8JCoeCAUSYVQ4H+ZH8kEgDp5Gg9HhYDGiRRcRODDIBvMH/VEPBgVJpyORyOl2d2aDcgQiGwd7D4sPDo6Ohh8bHSoFlpYSBRwOkZN3AxwBHxMGGQYJGocXn6EBKwYFHakfAAgXHY2PDgkdARYiAArCGBgExhrIFpEozCQhADs=';
var liveIcon		=	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAACUUlEQVQoU02SzUsUcQCG39/Mzq7rrrPOfinukmlUCooRRV8KXsrEPHRKISKqY/9Bp65d7OCxP0DqVhCIJJkrYRBWFmiWsatrjmuz7uzn/D47aT2n9/A+t4fgP+4tDxuMsTjnzKLc8ykpOIQqciH2X95YY4c/cjjuvh+KMsFGLJKcCBvWoJQyJCSrOpW9zJb7a0YKOTt/K+scSXeWrkSp4A9S/u6HJ0MDaUMPEk9S+DU/6l5Zrewuba/ufp0mEs8+3N9y9NvvLhmU8/EOf/ejAWso7fAS2fNsONRBhbkgmk5OR/pMt1rq2SntbSZHzXWNMxpvJbHJU+GBtO3ZxK7bKNMy6rQOyin6rTOgipFzHRfT7U2pyQZFXPN4Ixr2R4Z8viBxqYuYP45EIAFTD+NqagzDqevotfrQHAgS04gP0TqivmqjrvMmEaKiASUlxrpuIqAFUPT+oD92Ft8KK8hk59AaaAXhekjVla5xTwjKaNWAAV1p2Cyu47h5AueTl7G2/wWvN56jRl34oEMyXiUCwseZcvYPCou1lvJ4MwmQ5Z0FNGgNyWAbMrk5OLUCkqE2HFQqynbtRUg4etuo6RXKJVGj9Qu9sT5TSUZypR9YK3yGEBzRYBSWv03Nf1rY/p7LThFBPur5V66MXTN3ck6Bu9WDnmOR42YilCQtvhZYwRi8hlRvVt5ur/7cmCYaeZGdylePiuh6ko5KT410RtonEk3JQSL0kJC8uufama3f9gzRyGz2af5fEYd0Pk4b4CoOBkt5ykdAOIAiGPaz0/mj9v4Cx7ky5wFaf6oAAAAASUVORK5CYII=';
var deadIcon		=	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAABxUlEQVQoFQXBMW+VVQAG4Od8X0so0l7sRXGh0sGYsAA3Kcqgi4uJA8ZN04Gk6mT8Be4669Y6QeMCm3+ApCS6YCfDYkJCooFYMRe5vdB+57w+TwGAsI4RBAFg2vMQoACEidHytnNnJ0opSSShJfn7n/08e/7lIvehQJhYPfO9SxevGa92OXxJq1IbJ3r592nq73/82qb/fbXEb11YN1reduniNefPdz68zosqfx3IfOCjT+S110t5+8I7Tp/anrG+gJFzZycZr5by/gdc/5i1N+XWLd3mpnL5shwdyZ3drr26MmnPD0cLAYrZXNv9SVm7oFy9qt/YoBTt3j1150fpB5HS0AVJZBg4ONBu3iSh72lN3dnRHj+WYSABHUgYBlle1m1uUgrDQCm6rS1GIzk+ltYEXUNaSxZ75bNPlStXtL09RzduqHt7uo0N/RdbnFyUlgT9NyxlqO9ZOfWGPx+VNpsbvv1Oe/BAvXuXrqg/31bn81qfPL3fjutugTkTK6d/KG+tvVsW+q49O6QOUisnT6it1uHRk1/a7MXXY/YLwIxJe2Vpu5xZnqAkTULSUqez/cxffj5mHwoATFnHCIKgAdMxDwH+B9QA5vpODNE3AAAAAElFTkSuQmCC';

GM_addStyle(".mfLiveLink {background:transparent url("+liveIcon+") no-repeat scroll 100% 50% !important;padding-right:17px;}");
GM_addStyle(".mfDeadLink {background:transparent url("+deadIcon+") no-repeat scroll 100% 50% !important;padding-right:17px;}");


Array.prototype.inArray = function (value,begin) {
	var begin = (begin)?begin:0;
	for (var i=begin; i < this.length; i++) {
		if (this[i] === value) {
			return i;
		}
	}
	return false;
};


function $(id) {
	return document.getElementById(id);
}

function $$(name) {
	var elmt =  document.getElementsByName(name);
	if (!elmt.length) return false;
	if (elmt.length == 1) return elmt[0];
	return elmt;
}

function $$$(element) {
	return document.createElement(element);
}

function createButton(id) {
	var dlButton = $$$('a');
	dlButton.href = 'http://mf.huhiho.com/file/' + id;
	dlButton.title = 'Download this file';
	dlButton.target = '_blank';
	dlButton.innerHTML = '<img class="mf_download" src="'+ downloadIcon +'" />';
	return dlButton;
}

var googleRegEx = new RegExp(/^http:\/\/(www\.|blogsearch\.)?google\.[^\/]+\/(blog)?search/);

if (googleRegEx.test(currentURL)) {
	var links = document.evaluate("id('res')//div[@class='s' or @class='s hc']|/html/body/div[6]/div[2]//td[@class='j']/font[not(@color)][1]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=0;i<links.snapshotLength;i++) {
		var link = links.snapshotItem(i);
		with (link) {
			if (textContent.indexOf('mediafire.com/') != -1) {
				innerHTML = innerHTML.replace(/<em>/gi,'').replace(/<\/em>/gi,'').replace(/<b>/gi,'').replace(/<\/b>/gi,'').replace(/<wbr>/gi,'');
			}
		}
	}
}


GM_addStyle('.mf_download { border:none; vertical-align:middle; padding:2px; }');

var urlRegEx = new RegExp('(?:h\\w{2}p|hs{2}p|h\\*\\*p)?(?:\://)?(?:www\\.)?mediafire\\.com/(?:file/|(?:download\\.php)?\\?)([a-zA-Z0-9]+)/?',"gi");

var notAllowedParents = ['a', 'head', 'script', 'style', 'title', 'option', 'textarea'];

var xpath = "//text()[not(ancestor::" + notAllowedParents.join(" or ancestor::") +")]"; 
var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var ripped = "";


for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
	if (!urlRegEx.test(cand.nodeValue)) {
		continue;
	}
	
	if (ripped) {
		cand.nodeValue = ripped + cand.nodeValue;
	}
	if (cand.nodeValue.length - ripped.length >= 4096) {
		val = cand.nodeValue;
		end = val.length - 1;
		for (x = end; x > end - 255; x--) {
			char = val.charAt(x);
			if (char == " " || char == "\n" || char == "\t") {
				ripped = val.substring(x+1);
				cand.nodeValue = val.substring(0,x+1);
				break;
			}
		}
	}

	cand.nodeValue = cand.nodeValue.replace(/h\w\wp:\/\/|h  p:\/\/|h\*\*p:\/\//gi,'http://');
	var span = $$$('span');
	var source = cand.nodeValue;
	
	if (cand.parentNode && cand.parentNode.tagName != 'A') {
		cand.parentNode.replaceChild(span, cand);
	}
	
	urlRegEx.lastIndex = 0;
	
	for (var match = null, lastLastIndex = 0; (match = urlRegEx.exec(source)); ) {
		var url = match[0];
		var id = match[1];
		if (id == 'sharekey') {
			continue;
		}
		
		if (/^\:\/\//.test(url)) {
			url = 'http'+url;
		}
		else if (!/^http\:\/\//.test(url)) {
			url = 'http://'+url;
		}
		
		span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
		
		var a = $$$('a');
		a.href = url;
		a.appendChild(document.createTextNode(url));
		span.appendChild(a);
		
		lastLastIndex = urlRegEx.lastIndex;
	}
	span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
	span.normalize();
}

var links = document.getElementsByTagName('a');

var allLinks = new Array();
var numberOfLinks = 0;
var linksPerRequest = 20;

for (var i = 0; i < links.length; i++) {
	var url = links[i].href;
	var match = urlRegEx.exec(url);

	if (!match) {
		continue;
	}
	var id = match[1];
	if (id == 'sharekey') {
		continue;
	}
		
	var dlButton = createButton(id);
	links[i].parentNode.insertBefore(dlButton, links[i]);
	
	if (url && allLinks.inArray(url) === false) {
		numberOfLinks++;
		if (numberOfLinks % linksPerRequest == 0) {
			allLinks.push('xxxczxczxcsasdasdasdx4234-redphx');
		}
		allLinks.push(url);
	}
}

if (!numberOfLinks) {
	return;
}

allLinks = allLinks.join();
allLinks = allLinks.replace(/,/g,"\n");
var allLinks = allLinks.split("xxxczxczxcsasdasdasdx4234");
var totalLinks = numberOfLinks;

checkLinks(allLinks);

function checkLinks(all) {
	if (!all.length) return false;
	
	for (var i = all.length - 1; i >= 0; i--) {
		GM_xmlhttpRequest({
			method: "POST",
			url: 'http://xkanner.com/check.php',
			headers:{'User-agent': 'Mediafire Helper '+currentVersion,'Content-type':'application/x-www-form-urlencoded'},
			data:'type=short&extra=' + ((extraInfo)?1:0) + '&links='+encodeURIComponent(all[i]),  // or all.join('\n') is good also
			onload:function(result) {
				var data = result.responseText;
				
				if (extraInfo) {
					matches = data.match(/<(?:a n=".*?" s=".*?"|d)>(.*)<\/[ad]>/g);
				}
				else {
					matches = data.match(/<[ad]>(.*)<\/[ad]>/g);
				}
				
				if (matches) {
					var liveLinks = new Array(new Array(), new Array());
					var deadLinks = new Array();  
					
					for (var x = matches.length - 1; x >= 0; x--) {
						--totalLinks;
						if (extraInfo) {
							var mlink = /<(?:a n="(.*?)" s="(.*?)"|d)>(.*)<\/([ad])>/.exec(matches[x]);
							var sttPos = 4;
							var linkPos = 3;
						}
						else {
							var mlink = /<([ad])>(.*)<\/[ad]>/.exec(matches[x]);
							var sttPos = 1;
							var linkPos = 2;
						}
						
						if (mlink) {
							var stt=mlink[sttPos];
							if (stt == 'd') {
								deadLinks.push('http://'+unescape(mlink[linkPos]));
								//totalDeleted++;
							}
							else if (stt == 'a') {
								liveLinks[0].push('http://'+mlink[linkPos]);
								if (extraInfo) {
									liveLinks[1].push(mlink[1].replace("&amp;","&"),mlink[2]);
								}
								//totalLive++;
							}
						}
					}
					if (deadLinks.length) {
						displayLinks('d',deadLinks);
					}
					if (liveLinks[0].length) {
						displayLinks('a',liveLinks);
					}
				}
			}
		});
	}
}

var notContains = new Array('?q=','%3Fq%3D','&q=','%26q%3D');

function displayLinks(type,links_arr) {
	var arr = (type=='a')?links_arr[0]:links_arr;

	var xpath = "//a[(contains(@href,'" + arr.join("') or contains(@href,'") +"')) and not(contains(@href,'" + notContains.join("') or contains(@href,'") +"'))]";
	
	var allLinks = document.evaluate(xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	var x = 0;
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		var thisLink = allLinks.snapshotItem(i);

		if (type == 'd') {
			thisLink.style.textDecoration = 'line-through';
			thisLink.title = thisLink.href;
			thisLink.removeAttribute("href","");
			
			thisLink.className = 'mfDeadLink';
			
		}
		else if (type == 'a') {
			thisLink.className = 'mfLiveLink';
			if (extraInfo) {
				var pos = arr.inArray(thisLink.href)*2;
				/*
				if (prefs.linkToFileName) {
					thisLink.textContent = links_arr[1][pos] + ' (' + links_arr[1][pos+1] +')';
				}
				else {
				*/
				thisLink.title = 'Name : "' + links_arr[1][pos]  + '" - Size : '+ links_arr[1][pos+1];
				//}
			}
		}
	}
}
