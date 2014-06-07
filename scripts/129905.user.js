// ==UserScript==
// @name           Cheg-pornium
// @namespace      http://upyerbum.org
// @include        http://torrents.empornium.me/browse.php*
// ==/UserScript==


//Chrome GM val support
if (navigator.userAgent.indexOf("Firefox")==-1) {
	if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
		this.GM_getValue=function (key,def) {
			return localStorage[key] || def;
		};
		this.GM_setValue=function (key,value) {
			return localStorage[key]=value;
		};
	}	
}

var sversion = "<p>1.02</p>"
var wTop = 0;
var ImageCount;
var torrents;
var tds;
var tOpt = GM_getValue("tOpt", "pClick");
var newClick = GM_getValue("newClick", "Yes");
var innerScroll = GM_getValue("innerScroll", "Yes");
var maxImg = GM_getValue("maxImg", 5)*1;
var torrTimeout = GM_getValue("torrTimeout", 0)*1;
var seedThreshold = GM_getValue("seedThreshold", 0)*1;
var favTags = GM_getValue("favTags", "Yes");
var cancelLoad = false;

var lastTorrent = "";
var lastTorrentTime = new Date();


img_new='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEMSURBVDjL3ZLBSgJRFIYvtO0BfIPeI3qBNj2Cy1rWzlWbkcBNYhC0TletJKOFq1lIILhQJCywaDZOkINiGl/n3DNj6LaF4MDHGebc/5tz544D3H9w2yAI3LkQp7UgREJRSIS+0BJqwr6QTzkWulqdD09juD3Ah5PI7r8TiPvw0YJeDUq7cJ83NDzqwmUOFUyYT/ASfasGm6d4kQo1OB3JszN4fTDujuBrqP2hW4baVxbMBIuZTfAeQucGxm/w+WzB6AleGipo/Am06hTrEwQupLhjwkFdtlOFnzlc72n/cFWgQb3WJ8i22a7A44mtCfQQ7BSyL6617BtWZ+kphMKFlwSusrJmW/7ETQt+AQhq/TxibW0lAAAAAElFTkSuQmCC';
img_pic='data:image/gif;base64,R0lGODlhEAAQAOZ8APTr4uny+vn7/T6DN+jx+dSwcPf6/fbv5L6HTeHJuFOeS1yoUu/1+zV5MPTs3Ony+YvGg+nXpdKuhPn7/t3Ckd7EjebRryprJuTOrNi5i72FTMqfZTJ0LNKubTBxK+jVo97Eo8OSW9KtbPHl2N/Fj/D2+2OyWfLn2ePMmb+LUOXPqde1fffw5d3DkdCoatm7jMGOWHa3bd7Dpuzz+ovHhePNu/P4/ODHky5vKcyhZ2WnXmGwV8+oY2usY9Grg8GPWs2mYsiaYMmbYc6nY/H3/J7RlZ/Sl9/Fo+bRrjN2LubRudGqdsORVvH2++LLuYbFfbyEUffx7eTMrPHm2LmASMqgb/r29JdhRprPkl+tVoLCffPo2rZ7Uffv5de2fezcv+71+/L3/ESLPefTuqxlP82naN/Ep9a1f8mbY82kcdq7gK5tSKbVnZDKiM+pZdKtd+z0+k2WRV6rVOfToLd5Ute3fVqbU2e2XPjx7byDT+ry+uvz+v///wAAAAAAAAAAACH5BAEAAHwALAAAAAAQABAAAAe6gHyCg4SFgw4tHW5DLi9bhnxfBXUWLAcYbzljhQ4FKgYMentNAkdoU4QUXgZ7BA8BemACaRKEIkglrrB7e2FmIYQ8XXuwonc7CwAphEAHM3qie1lsCgAIhGVSRLwmcjFFPWIDhBlLAgxwC0ZYT20QDYQnGyATNgpxOjR2STg1hEpBqsgAAGCAFg4oKuTBQ2iEjx8INDTwcOFDBDVkokAS5AQGiTk3hFzZKCgBlBVnmHAhWXINFTpW+AQCADs=';
img_pic_out = 'data:image/gif;base64,R0lGODlhEAAQAOZ0APTr4u/1+/n7/eny+uzz+tSwcPbv5Ojx+fRFSO71++waI/Ts3O4mLvdUVvpjYvxvbff6/fE1Or6HTeny+ez0+sGPWvjx7c2mYuPMmdKtd9Grg/D2+/Hl2PHm2MORVunXpbyEUc6nY9/Fj9a1f8mbY/H3/OfTuuoRHL+LUObRrvPo2vfw5d3Dkd7DptCoavn7/va2rvjy782kceDHk+LLueHJuNGqdvfv5eDHtvjIv/54dNu/h9i5i8qfZdm7jPH2+7uGUtKubde2fd7EjfSrpN7Eo9KuhM+oY7FyRffx7ebRuejVo8mbYeXPqbyDT8GNU9q7gN/Ep82naPL3/PfAt+zcv7uBTN3CkeTMrM+pZePNu8GOWL2FTMOSW5dhRrNzS/Ln2bmASMqgb/P4/KxlP+bRr9y+pNa0eefToNe1faVcM8iaYNe3fdKtbN/Fo8yhZ+TOrPOgm+ry+uvz+v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHQALAAAAAAQABAAAAe4gHSCg4SFgwssQVkhLj4qhnRVBWxlKwZwGW8mhQsFTRABcnM/Am4kHYRXQhBzBxMDcgkCMkaEbSkbrrBzc1NRXYRHN3OwonMECQAohBcGBHLGBBQBABKEUlglvDoPDg0IEQyEPDYCARQPOVQwRHEKhGA9RS9j3uAMCidahEprYi0AAJh5cgbDECcWCHHQUEECFyBWdiz5AIVMEkiCaGwRgWYGEy8YBdUAkWaEByQhBeFQE+ZLDDqBAAA7';
img_dl = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8xNC8wOFZL9aYAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAABhklEQVQ4je1UzUpCQRg9M96rKMYNKuhn4U8tWpTQsoVFtI42bdq06LpS6DF6gODqRqFNL9AztIggKwhUChnFxFKUW/7f650Wlos0vZSboAMfDMM55zvMNzOEc45xgo7V7U8YCoM2CSG99dGp9256TvJRymFwA4WsCkVmZJBuZELOOQgl6qrXD9/SBnyL/p8l7EsMgkL9Hh1DG8k1fYYG19Ex9JG8gQmDUZcNgD0Uc0O0Cr2mersD0Wp5CsXckwA6iszezCY8FK3Cjd1huxZFwUPpB40AhEISRJoglGRDMfeWKcNwIBMBkFhb3lzwr2/PU0t3qKLVAu/KlFOasUmE4hZA3GxCaG09mM6mElrdgmIzCaD7RGuvbajFVs7Q+Y4iM9W0YTiQYYVSZv8qfgEHZgEArYaGUr6W0jXjQJFZdZBu6JQVmSWrzfJuOp15niAe5B4qlUZVO1ZkdvmdZuS1UWR2nn9JR9hjrqxrxgmAs6ECznlffUUw6nIGo669YZrPIv//4a/xDpTEr9PrL2tRAAAAAElFTkSuQmCC'


var $ = unsafeWindow.jQuery.noConflict();


function insertBefore_IMG(element, img_data, style) {
	var img_element = document.createElement('img');
	img_element.setAttribute("src", img_data);
	img_element.setAttribute("style", style);
	element.parentNode.insertBefore(img_element, element);
	return img_element;
}

function insertAfter( referenceNode, newNode ) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

function insertAfter_IMG(element, img_data, style) {
	return insertBefore_IMG(element.nextSibling, img_data, style);
}

function resetNew() {
	doNew( GM_getValue("maxtorr", 1) );
}

function doNew(someNum) {
	var imgs = document.evaluate("//img[@class='newTorrent']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	GM_setValue("last_torrent_id", someNum*1);
	GM_setValue("maxtorr", someNum*1);
	var num = someNum;
	for (var i=0; i<imgs.snapshotLength; i++) {
		var img = imgs.snapshotItem(i)
		if ( (img.parentNode.parentNode.parentNode.getAttribute("id").substr(2)*1) <= someNum ) {
			img.setAttribute("style", "display:none");
		}		
	}
}

function doInline(tid) {
	//console.log(tid);
	//Save some shit for tracking
	ImageCount = 0;
	lastTorrent = tid;
	lastTorrentTime = new Date();
	
	var td = document.getElementById("td"+tid);
	tbl = td.parentNode.parentNode.parentNode ;
	
	//if (tOpt == "pClick") {
	
		if (document.getElementById("click" + tid).getAttribute("class") == "magnify") {
			document.getElementById("click" + tid).setAttribute("src", img_pic_out);	
			document.getElementById("click" + tid).setAttribute("class", "");	
			document.getElementById("row" + tid).setAttribute("style", "");
		} else {
			document.getElementById("click" + tid).setAttribute("src", img_pic);	
			document.getElementById("click" + tid).setAttribute("class", "magnify");	
			document.getElementById("row" + tid).setAttribute("style", "display: none");
			return;
		}
	//}
	
	document.getElementById("row" + tid).setAttribute("style", "");
	 
	var span = document.getElementById("load"+tid);
	span.innerHTML = "<br><br><br><br><br><br><br>Loading Pictures... Please wait...";
	
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: '/details.php?id=' + tid,
			headers: {
								'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
			          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			          'Referer': 'http://torrents.empornium.me/browse.php'
			          },
	    onerror: function() {
	    	commitScroll();
	    	span.innerHTML = "<br><br><br><br><br><br><br>Error Loading Pictures."
	    },
	    onload: function(responseDetails) {
	    		
	    		var imgCount = 0;
					
	        var myHTML = responseDetails.responseText;
	        //console.log(myHTML);
	        if ( document.getElementById("tempDiv"+tid) ) {
	        	document.getElementById("frame").removeChild( document.getElementById("tempDiv"+tid) )
	        }
					var tempDiv = document.createElement('div');
					tempDiv.setAttribute("id", 'tempDiv'+tid);
					tempDiv.setAttribute("style", 'display:none;');
					tempDiv.innerHTML = myHTML.replace(/<script(.|\s)*?\/script>/g, '');
					document.getElementById("frame").appendChild(tempDiv)
					var content = document.getElementById('description');
					var a = content.getElementsByTagName('a'); 
					span.innerHTML = "";
					
					//grab regular links with thumnbails in the anchor..
					if (a.length > 0) {
						for (var i=0; i<a.length; i++) {
							al = a[i].getElementsByTagName('img');
							if (al.length > 0) {
								try {
									if (a[i].getAttribute("href").indexOf("users.php?userid=") == -1 && a[i].getAttribute("href").length > 6 && a[i].getAttribute("href").indexOf("an3mia.net/") == -1 && a[i].getAttribute("href").indexOf("http://cheggit.net/") == -1 && a[i].getAttribute("href").indexOf("adbrite") == -1  ) {

										if (maxImg == 0 || imgCount < maxImg) {
											var newA = document.createElement('a');
											newA.setAttribute("href", a[i].getAttribute("href") );
											newA.setAttribute("target", "_blank");
											newA.setAttribute("style", "float:left; margin-top:10px; padding: 2px; ");
											var src = al[0].getAttribute("src");
											img = document.createElement('img');
											img.setAttribute("style", "max-height: 200px; max-width: 200px");
											img.setAttribute("class", "loadingIMG");
											img.setAttribute("onLoad", "this.setAttribute('class', '');");
											img.setAttribute("onError", "this.setAttribute('class', '');");
											img.addEventListener("load", function handler(evt){ this.setAttribute("class", ""); }, true);
											img.addEventListener("error", function handler(evt){ this.setAttribute("class", ""); }, true);
											img.setAttribute("src", isCheggitThumb(src));
											imgCount++;
											newA.appendChild(img);
											span.appendChild(newA);
										}
									}
								} catch(e){}
							}
						}
					}
					
					
					//grab flat images 
					spanHTML = span.innerHTML;
					var allimg = content.getElementsByTagName('img'); 
					if (allimg.length > 0) {
						for (var i=0; i<allimg.length; i++) {
							try {
								var src = allimg[i].getAttribute("src");
								if (src.indexOf("an3mia.net/") == -1 && spanHTML.indexOf(src) == -1 ) {
									if (maxImg == 0 || imgCount < maxImg) {
										var newA = document.createElement('a');
										newA.setAttribute("href", src );
										newA.setAttribute("target", "_blank");
										newA.setAttribute("style", "float:left; margin-top:10px; padding: 2px; ");
										img = document.createElement('img');
										img.setAttribute("style", "max-height: 200px; max-width: 200px");
										img.setAttribute("class", "loadingIMG");
										img.setAttribute("onLoad", "this.setAttribute('class', '');");
										img.setAttribute("onError", "this.setAttribute('class', '');");
										img.addEventListener("load", function handler(evt){ this.setAttribute("class", ""); }, true);
										img.addEventListener("error", function handler(evt){ this.setAttribute("class", ""); }, true);
										img.setAttribute("src", isCheggitThumb(src));
										imgCount++;
										newA.appendChild(img);
										span.appendChild(newA);
									}
								}	
							} catch (e) {;}
						}
					}
					
					//grab flat cheggit urls
					spanHTML = span.innerHTML;
					if (a.length > 0) {
						for (var i=0; i<a.length; i++) {
								try {
									if (a[i].getAttribute("href").indexOf("pics.cheggit") > -1 && spanHTML.indexOf(src) == -1 ) {
										var src = a[i].getAttribute("href");
										if ( src.lastIndexOf("/") > -1 ) {
											src = src.substr( src.lastIndexOf("/") + 1 ) 
											if (src.substr(0,1) != "t") {
												if (maxImg == 0 || imgCount < maxImg) {
													src = a[i].getAttribute("href");
													var newA = document.createElement('a');
													newA.setAttribute("href", src );
													newA.setAttribute("target", "_blank");
													newA.setAttribute("style", "float:left; margin-top:10px; padding: 2px; ");
													img = document.createElement('img');
													img.setAttribute("style", "max-height: 200px; max-width: 200px");
													img.setAttribute("class", "loadingIMG");
													img.setAttribute("onLoad", "this.setAttribute('class', '');");
													img.setAttribute("onError", "this.setAttribute('class', '');");
													img.addEventListener("load", function handler(evt){ this.setAttribute("class", ""); }, true);
													img.addEventListener("error", function handler(evt){ this.setAttribute("class", ""); }, true);
													img.setAttribute("src", isCheggitThumb(src));
													imgCount++;
													newA.appendChild(img);
													span.appendChild(newA);
												}
											}
										}
									}
								} catch (e) {;}
						}
					}
					
					if (span.innerHTML == "" || span.innerHTML == "<br><br><br><br><br><br><br>Loading Pictures... Please wait...") {
						span.innerHTML = "<br><br><br><br><br><br><br>No Pictures Found."
					}
					
					document.getElementById("tempDiv"+tid).innerHTML = ""
					document.getElementById("frame").removeChild( document.getElementById("tempDiv"+tid) );
					
					setTimeout(function() { commitScroll() }, 1000);   		
										
	    }
	});
}


function didScroll() {
	//var t = setTimeout(commitScroll( document.documentElement.scrollTop ),500 );
	wTop = window.pageYOffset + window.innerHeight;
	setTimeout(function() { commitScroll() }, 500);
}

function isCheggitThumb(str) {
	out = str;
	if (str.indexOf("pics.cheggit") > 0) {
		var i = str.lastIndexOf("/");
		if ( str.substring(i+1, i+2) != "t" ) {
			out = str.substring(0, i+1);
			out = out + "t" + str.substring(i+1);
		}
	}
	return out;
}

function DateDiff(date1, date2) {
    return (date1 - date2)/1000;
}

function commitScroll() {
	
	if (cancelLoad == true) {
		return;
	}

	var tid = lastTorrent;
	if ( document.getElementById("load"+tid) && torrTimeout != 0 ) {
		var stillRunning = false;
		var elm = document.getElementById("load"+tid)
		for(var i=0; i<elm.getElementsByTagName("img").length; i++){
			if (elm.getElementsByTagName("img")[i].getAttribute("class") != "" || elm.getElementsByTagName("img")[i].complete==false ) {
				//elm.getElementsByTagName("img")[i].setAttribute('src', '');
				stillRunning = true;
			}
		}
		var now = new Date();
		if (stillRunning == true ) {
			if (DateDiff(now, lastTorrentTime) > torrTimeout) {
				//console.log("Timeout: " + tid)
				window.stop;	
			} else {
				//console.log("Waiting: " + tid + " Time:" + DateDiff(now, lastTorrentTime));
				setTimeout(function() { commitScroll(); }, 1000);
				return;
			}
		}
		
	}
	
	var tid = "";
	if (tOpt == "pScroll") {
			for (var i = 0; i < torrents.snapshotLength; i++){
				var elem = torrents.snapshotItem(i);
				if ( elem.getAttribute("class") == "doPreview" && isVisible(elem) ) {
					var tid = elem.getAttribute("tid");
					var perc = Math.floor((i/torrents.snapshotLength)*100)
					document.getElementById("loadText").innerHTML = "Loading " + perc + "%"
					document.getElementById("progressBar").setAttribute("style", "width: " + perc + "%")
					elem.setAttribute("class", "");
					doInline(tid);
					break;
				}
			}
	} else {
		for (var i = 0; i < torrents.snapshotLength; i++){
			var elem = torrents.snapshotItem(i);
			if ( elem.getAttribute("class") == "doPreview" && elem.parentNode.parentNode.getAttribute("style") == "" ) {
				if (tOpt == "pFull" || elem.getAttribute("favTag") == "1") {
					var tid = elem.getAttribute("tid");
					elem.setAttribute("class", "");
					var perc = Math.floor((i/torrents.snapshotLength)*100)
					document.getElementById("loadText").innerHTML = "Loading " + perc + "%"
					document.getElementById("progressBar").setAttribute("style", "width: " + perc + "%")
					doInline(tid);
					break;
				}
			}
		}
	}	
	
	
	if (i == torrents.snapshotLength) {
		document.getElementById("loadText").innerHTML = "100% Complete"
		document.getElementById("progressBar").setAttribute("style", "width: 100%")			
	}

}


function isVisible(element) {
		var top = element.offsetTop;
		var p = element.offsetParent;
		while(p) {
			top += p.offsetTop;
			p = p.offsetParent;
		}
		return (top < (window.pageYOffset + window.innerHeight) && 
				(top + element.offsetHeight) > window.pageYOffset);
}

function triggerSave() {
	
	if(document.getElementById("pClick").checked) {
		GM_setValue("tOpt", "pClick");
	}
	if(document.getElementById("pScroll").checked) {
		GM_setValue("tOpt", "pScroll");
	}
	if(document.getElementById("pFull").checked) {
		GM_setValue("tOpt", "pFull");
	}
	if(document.getElementById("pNone").checked) {
		GM_setValue("tOpt", "pNone");
	}
	if(document.getElementById("innerScroll").checked) {
		GM_setValue("innerScroll", "Yes");
	} else {
		GM_setValue("innerScroll", "No");
	}
	if(document.getElementById("newClick").checked) {
		GM_setValue("newClick", "Yes");
	} else {
		GM_setValue("newClick", "No");
	}
	
	if (document.getElementById("showFav") ) {
		if(document.getElementById("showFav").checked) {
			GM_setValue("favTags", "Yes");
		} else {
			GM_setValue("favTags", "No");
		}
	} else {
		GM_setValue("favTags", "No");
	}
	
	
	if( IsNumeric(document.getElementById("seedThreshold").value) ) {
		GM_setValue("seedThreshold", (document.getElementById("seedThreshold").value*1) );
	} else {
		alert("Seed Threshold Timeout must be numeric");
		return;
	}
	
	if( IsNumeric(document.getElementById("torrTimeout").value) ) {
		GM_setValue("torrTimeout", (document.getElementById("torrTimeout").value*1) );
	} else {
		alert("Torrent Timeout must be numeric");
		return;
	}
	
	if( IsNumeric(document.getElementById("maxImg").value) ) {
		GM_setValue("maxImg", (document.getElementById("maxImg").value*1) );
	} else {
		alert("Max Images must be numeric");
		return;
	}
	
	var resp = confirm("Changes have been saved. Press OK to reload page")
	if (resp){
		window.location.href = window.location.href;
	}
}

function IsNumeric(input) {
   return (input - 0) == input && input.length > 0;
}


function showControls() {
	var opt = document.getElementById("controlBar").getAttribute("style")
	
	if (opt.indexOf("none") > 1) {
		document.getElementById("controlBar").setAttribute("style", "width: 100%;padding-top:20px; display: block")
	} else {
		document.getElementById("controlBar").setAttribute("style", "width: 100%;padding-top:20px; display: none")	
	}
	
}


function init() {

	
	$("div.img01:first").css({"float":"left","width":"400px","height": "100px"}).html("<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVkAAABMCAYAAADHnsRHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJGMkQ2NzcxN0JBNTExRTE4QTRCRDI2QkIyNEM5RTlBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJGMkQ2NzcyN0JBNTExRTE4QTRCRDI2QkIyNEM5RTlBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkYyRDY3NkY3QkE1MTFFMThBNEJEMjZCQjI0QzlFOUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkYyRDY3NzA3QkE1MTFFMThBNEJEMjZCQjI0QzlFOUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4grU1vAAA7gElEQVR42uydDZhVZbX4j41iqFzQybEhEgFBwEEQBBkYRAdBChLzG0Mtk6t/6WqK2vXjav/UzD+lkfbgpcSvUNBCSU0CIUiuyKeOgcggIDaCzJVCMQiS5r9+5+41z+J1f7z7zBm66V7Ps585c87e734/1ru+13r3a2hoyGWQQQYZZNA8sF9GZDPIIIMMMiKbQQYZZJAR2QwyyCCDDDIim0EGGWSQEdkMMsggg4zIZpBBBhlk8I8nsps2bSqfOXPmTc8999y4d955J7dr167cRx99lP/t73//e/5vSUlJbr/99sv/bdGiRa5169a53r17rzj77LNv7d69+9w2bdrszJYrgwwyyIhsADU1NZV33nnn3Jdeeqnl7t27c3/5y19yO3bsaCSqiR0TgnvIIYfkDj744Nz++++fKysry11wwQVTx48fPyZbtgwyiIYPP/ywRPbOHvvd9u3bS1q1arUnm51PAJGdPn36v9922213ivSa+/Of/1y0dj/zmc/kBElyn/vc53IjRoxY+Z3vfGdY27ZtN2dLmMGnDSZMmPD4nDlzzuczWiGX7uM9e/bkBRkEEwSVAw44IL93Nm7cmJs2bdqXKisrZ2UzuI+BxSnGJYv+tUGDBrHSzX6JdNtwzDHHNAihfalY/c+u7PpnuH77299eJIJGQfvm3HPP3bVt27YW2Tzu2+szTSXS9fX1pdddd93iM8888xcvvvjiPmEMmB5qa2tzkydPrhwzZsyfN2/eXJaxyww+DfDKK6+M/Nvf/lbQs926dVvQunXr3dks/hNJsv/93//dZuzYsW+JOpKaq4oqs9ffpki1p5xySsOsWbMuyrhmdn3Sr9mzZ3+tXbt23vtLr5KSkobly5cPzuZw31/7N4VAX3PNNW8++uijpUkOLCXmLnEvllT7u9/9DsP+wx07dlzauXPn1RnrzOCTCn/605++iCPZR3jS/cdnIcy5tm3bZnvjHwAFmQveeeed8lGjRjUogWUhoy5LbKN+j3ve5wJeffXV3I033viHbEkz+CSDaGxXC6H13jcKOMBWrlw5NJvBfxIi+9RTT/3fefPm7SWp/iOBPhB3O3fu3JLbbrvtmWxZM/ikws6dO1uplOqrrgJvvvlmrry8PJNk/wGQ2lzwzDPPXD5x4sSxH3744f8KAmuBkDGRrkdWVVWdc8oppzyZLW8GnzTo0qXLotatW1cTc07ijjUN7LWx99+/8XfCurp3756ZC/4ZiOx7773X5p577pkEVywWgaUd4vhABJCl0HbV9rRhw4bcvffe+4QQ2f2y5U0PBK3rfLoB7Z822LZtW8vmyjTEaSw436JRpfzMZ/aUlZVtTXquffv2K7785S/3/tznPrfxsMMO+6Pg/P5///vfS2S9GtdKtLoWIrXWCjHezDrKOMoHDx78s0MPPfQTnTW5devWVoyVuVQcPuigg7b5zKulce+//36ZMWXuERzY1JS5S5WM8Ktf/epqgbv/+Mc/FoXIktH19a9//dEBAwb8RqTjCYsXL27XFEKrXL1jx465xx57bNiJJ544p7kWlLjgn//851PeeeedFpgqkBp49znnnPPIueee++9f+MIXEhMl3n777fY/+9nPpixcuLAaJsO4CSQfNmzYsxdccMH4Tp061Sa1QXaPM6d77PeWUIZlAilhra+v7zR58uSHli5dWkkfBDlzMn+zRo8efZ1ITyubOl+CuC1kjAdKHw5bsWLFqDVr1lQdcMABu4VYvAXh6NChw3Lp259kDj4qFKEZx9/+9reDaCPAhf3D8Ns6Y0tLS7c72lBLkRLb/OIXv5i4bNmyMwU//8+IESN+xm8ffPABa30gnyFscXsHAvrZz352u0uk8WdgbhP8HGuTdf7lX/4ld/bZZ0+T62aZi3VR7W7ZsiXvBzniiCO2NnVNaEuFk2A+SsIkY0tw3PeSMg9Rc9twnuf3/HwdeOCBO2XNt7ltuM/o/FpaoO9o2bLlh7YNngefHnzwwUkvvPBCqfyeC96V69Onz7aLL774W8cff/xz7nstCE1rt27dusqHHnrovpdeeqkMwU/T/L/0pS8tkT19g+BpTRqCXRCRvf766xdPmDChn534QgmhEKHcd7/73f9z6aWX3s93U6dOvfDaa6995N13321y22SG3XTTTU9+5zvfOdf+9vrrr/cW5L77jTfeqDr44IO3wfG5n43DooIsFun4XTbJ5iuuuGLMCSecMI9NLM8O/ta3vjV37dq1oRltshB5T65sznvOP//868KImjCToXfdddfsP/zhD3lbmQuf//zncyKl5AYOHLhRmNqobt261YSN9Y477nh61qxZo0AILkCJPeOQTd5YE0IQb6cQiZann376T2ACSsieeOKJf3/ggQfupC+bN+/NFw4//PB8DQkhttvGjRs3upBsIaTB3/3ud2OF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'>");
	
	$("div.img01:first").after("<div style='border-bottom: 1px solid silver; background-color: #F0FFFF; height: 100px;' id='newtopmenu'></div>")
	$("#submenu, div.img01:first").appendTo("#newtopmenu");
	$("#submenu").css({"float": "right", "padding-top": "70px"})
	$("#submenu a").css({"font-size": "18px !important"});
	$("#submenu div").css({"padding-right": "5px"});
	$("#submenu").attr("id", "foobar");
	
	$("div.body01").append("<div id='side'><div style='background-color: #F2F2F2; border: 1px solid silver;height: 200px;margin-left: 10px;'><h5>Menu</h5></div></div>")
	$("#submenu").attr("id", "foobar");
	
	//annoucements
	if ($("div.a11:first").size() > 0) {
		$("div.a11:first").attr("id", "announce").hide();
		$("div.a11:first").next().remove();
		$("div.main01").prepend("<div id='annoucements' style='margin-left: 15px ;margin-right:15px; color: black; background-color:#A7FFAA; border: 1px solid #59AF5C;margin-top: 10px;padding: 5px;text-align: center;'><a href='#' onclick='document.getElementById(\"announce\").setAttribute(\"style\", \"display:block; margin-bottom: 10px\")'>Show Announcements</a></div>")
	}
	
	$("div.main01").prepend("<div id='controls' style='margin-left: 15px ;margin-right:15px; color: black'></div>")
	$("div.sstop").appendTo("#controls");
	
	$("div.sstop").css({"color": "black", "height": "30px"});

	$("div.main01").css({"float":"right", "margin-left": "250px", "border": "none", "min-width": "860px"});
	$("#newtopmenu a").css({"color": "#0055AA"});
	$("#newtopmenu").append("<div style='clear: both'></div>");


	
	$("div.body01:first").attr("style", "max-width: 99999px !important; margin: 0 !important");
	$("div.img01:first").css({"text-align": "left", "float": "left" });
	
	$("tr.tr11:odd").attr("style", "background: #FFFFFF !important");
	$("tr.tr11:even").attr("style", " background: #EEEEEC !important");
	
	$("div.sstop:first").css({"background" : "#F0FEFE", "border" : "1px solid silver", "width": "auto", "height": "auto", "min-height": "30px"});
	$("div.sstop:first a").css({"color": "#0055AA" });
	$("#side div:first").css({"width": "auto", "height": "auto", "padding": "5px"});
	
	$("div.bg07 > table").css({"background": "none"}).parent().css({"background": "none", "border": "none", "padding" : "0px" });
	
	//search bar
	$("#top").parent().remove();
	$("#search101").css({"background-color": "#F2F2F2", "border": "1px solid silver"});
	$("#search101 table.bottom:first").hide();
	$("#search101 table.bottom:first").next().remove();
	$("#search101 p").css({"text-align": "left"});
	$("#s-toggle-cloud").hide();

	var toggleCats = $("<input type='button' class='btn' value='Categories'>").bind("click", function () {
		$(this).parents("form").find("table.bottom:first").toggle();
	});
	$("#search101 input[type='submit']:first").after( toggleCats );
	$("#search101 table.bottom:first").appendTo("#search101 form:first");
	
	//pagenumbers
	$("div.bg07 > div:last").css({"background-color": "#F2F2F2", "border": "1px solid silver", "margin": "10px 0"}).find("a").css({"color": "#0055AA" });
	
	$("div.bg07 > div:last").clone().prependTo("div.bg07:eq(1)")
	
	var h = "";
	$("div.bg07 > table tr").each(function() {

		var kids = $(this).find("td").size()
		if ( kids == 1 ) {
			var d = $(this).text();
			$(this).find("td").remove();
			d = d.substring(12, 9999);
			$(this).html(h);
			$(this).find("td:eq(0)").html(d);
			$(this).css({"border" : "1px solid silver"});
			$(this).prev().remove();
		}
		if ( kids == 10 && $(this).find("td.colhead").size() > 0 ) {
			$(this).find("td:eq(3) a").text("Com");
			$(this).find("td:eq(4)").text("DL");
			$(this).find("td:eq(7) a").text("Sd");
			$(this).find("td:eq(8) a").text("Lch");
			$(this).find("td:eq(9) a").text("Owner");
			$(this).find("td:first").remove();
			$(this).find("td a").css({"color": "#0055AA" });
			h = $(this).html();
			
		} else {
			if ( kids == 10  ) {	
				
				$(this).find("td:first").remove();
				$(this).find("td:eq(0) br").remove();
				$(this).find("td:eq(0) p").css({"width": "auto" });
				$(this).find("td:eq(0) p:eq(1) a").css({"color": "#808080", "font-size": "14px", "font-style": "italic" });
				var linktext = $(this).find("td:eq(0) a:first").attr("href");
				var torrentid = linktext.substr(linktext.indexOf("=")+1, linktext.length);
				$(this).find("td:eq(3)").html( "<a href='/download.php?torrent=" + torrentid+ "' title='Download Torrent'> <img src='" + img_dl + "'></a>");
				
				$(this).find("td:eq(0) a:first").css({"color": "#0055AA" });

			}
		}
		
		
		
	});

	document.styleSheets[0].insertRule(".breakrow {display:none !important;}", 0);
	document.styleSheets[0].insertRule("#loadingBar{border:1px solid silver;height:2px;text-align:left;line-height:0;margin:0;padding:0;overflow:hidden; }", 0);
	document.styleSheets[0].insertRule("#progressBar{height:2px;line-height:0;margin:0;padding:0;background:#AAFFAA;width:20%;}", 0);
	document.styleSheets[0].insertRule("#loadText{text-align:right;overflow:hidden;width:100%;height:20px;font-family:verdana,helvetica;font-size:12px;font-style:italic;color: #666; }", 0);
	document.styleSheets[0].insertRule(" body { color:black;  background: #fff !important}", 0);
	document.styleSheets[0].insertRule("td {height: auto !important;}", 0);
	document.styleSheets[0].insertRule("td.colhead {background: none repeat scroll 0 0 #C0C0C0 !important; border: none !important; font-family:'Lucida Grande','Lucida Sans Unicode',Verdana,Arial,sans-serif !important; font-size:13px !important;}", 0);
	document.styleSheets[0].insertRule(".btn {background-color: #FFFFFF;padding: 3px;margin-top: 4px;border: 1px solid #ADADAD;color: #444444; width: 100px !important; margin-left: 5px;}", 0);
	document.styleSheets[0].insertRule("#search101 input {margin-left: 5px;}", 0);
	document.styleSheets[0].insertRule("p, div, a { font-size:13px !important; line-height:1.5em !important; font-family:'Lucida Grande','Lucida Sans Unicode',Verdana,Arial,sans-serif !important;}", 0);
	document.styleSheets[0].insertRule("#side { width:240px; float:left; overflow: hidden; position: fixed; left:0; top: 120px; }", 0);
	document.styleSheets[0].insertRule("#side a { font-size: 11px !important; }", 0);

		$("#search101").append("<div id='searchfacility'></div>")
		
		var btn = $("<input class='btn' type='button' value='Clear New' />")
		$(btn).get(0).addEventListener("click", function handler(evt){ resetNew() }, true);
		$("#search101 p:first").append(btn);
		
		var btn = $("<input class='btn' type='button' value='Config' />")
		$(btn).get(0).addEventListener("click", function handler(evt){ showControls() }, true);
		$("#search101 p:first").append(btn);
		

		var favTag = ""
		
		if ( $("div.tb-top-right-link a:contains('ETH Config')").size() > 0 ) {
			//Tag manager is installed..
			favTag = "<input type='checkbox' id='showFav'><label style='padding-right: 20px;' for='showFav'>&nbsp;Always show for Green Tags</label>"
		}

		var tdiv = document.createElement('div');
		tdiv.setAttribute("id", "controlBar")
		tdiv.setAttribute("style", "width: 100%;padding-top:20px; display: none")
		tdiv.innerHTML = ("<p class='title' style='width:100%;display:block;padding-bottom:15px'>Torrent Preview Options</p><input type='radio' name='tPrev' value='pClick' checked='' id='pClick'><label for='pClick' style='padding-right: 20px;'>Preview Icon Click</label><input type='radio' name='tPrev' checked='' value='pScroll' id='pScroll'><label for='pScroll' style='padding-right: 20px'>On Page Scroll</label><input type='radio' checked='' name='tPrev' value='pFull' id='pFull'><label for='pFull' style='padding-right: 20px'>Load Full Page</label><input type='radio'  name='tPrev' checked='' value='pNone' id='pNone'><label for='pNone' style='padding-right: 20px'>Disabled</label><br><br><input type='checkbox' id='innerScroll'><label style='padding-right: 20px;' for='innerScroll'>&nbsp;Torrent Inner Scroll</label><input type='checkbox' id='newClick'><label style='padding-right: 20px;' for='newClick'>&nbsp;Clear new on icon click</label>" + favTag + "<br><br>AutoOpen Seed/Leech > <input type='text' style='width: 30px' value='"+seedThreshold+"' id='seedThreshold'>&nbsp;&nbsp;Torrent Preview Timeout (secs): <input type='text' style='width: 30px' value='"+torrTimeout+"' id='torrTimeout'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Max Images per torrent: <input type='text' style='width: 30px' value='"+maxImg+"' id='maxImg'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 = disabled<br><br><input type='button'  value='Save' class='text' id='optSavebutton'>&nbsp;&nbsp;&nbsp;<input type='button' value='Cancel' class='text' id='optCancelbutton'>")
		
		
		document.getElementById("searchfacility").appendChild(tdiv);
		document.getElementById(tOpt).setAttribute("checked", "checked");
		document.getElementById("optSavebutton").addEventListener("click", function handler(evt){ triggerSave() }, true);
		document.getElementById("optCancelbutton").addEventListener("click", function handler(evt){ showControls() }, true);
	
		if ( newClick == "Yes") {
			document.getElementById("newClick").checked = true;
		}
		
		if ( innerScroll == "Yes") {
			document.getElementById("innerScroll").checked = true;
		}
		
		if ( $("div.tb-top-right-link a:contains('ETH Config')").size() > 0 ) {
			if ( favTags == "Yes" ) {
				document.getElementById("showFav").checked = true;
			}
		}

	
	
	var maxtorr = GM_getValue("maxtorr", 1);
	var last_torrent_id = GM_getValue("last_torrent_id", 1);
	
	var f = document.createElement('div');
	f.setAttribute("id", "frame");
	f.setAttribute("style", "display:none");

	$("body").append(f);
	tds = document.evaluate("//tr[@class='tr11']//td[1]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	for (var i=0; i<tds.snapshotLength; i++) {

		var td = tds.snapshotItem(i);
		
		var firstlink = td.getElementsByTagName('a')[0]

		var linktext = firstlink.getAttribute("href");
		var torrentid = linktext.substr(linktext.indexOf("=")+1, linktext.length);
		torrentid = torrentid.substr(0, torrentid.indexOf("&"))*1;

		if (torrentid > maxtorr) {
			GM_setValue("maxtorr", torrentid);
			maxtorr = torrentid;
		}
		
		td.setAttribute("id", "td" + torrentid);

		if(torrentid > last_torrent_id) {
			//create new icon
			var img_element = document.createElement('img');
			img_element.setAttribute("src", img_new);
			img_element.setAttribute("class", "newTorrent");
			img_element.setAttribute("style", "padding-right: 6px;");
			img_element.setAttribute("tid", torrentid);			
			if (newClick == "Yes") {
				img_element.setAttribute("style", "padding-right: 6px; cursor: pointer;");
				img_element.addEventListener("click", function handler(evt){ doNew(this.getAttribute('tid')) }, true);
			}
			firstlink.parentNode.insertBefore(img_element, firstlink);
		}
		
		if (tOpt != "pNone") {
		
			//create pic button
			var img_element = document.createElement('img');
			img_element.setAttribute("src", img_pic);
			img_element.setAttribute("class", "magnify");
			img_element.setAttribute("style", "padding-right: 6px; cursor: pointer;");
			img_element.setAttribute("tid", torrentid);		
			img_element.setAttribute("id", "click" + torrentid);	
			img_element.addEventListener("click", function handler(evt){ doInline(this.getAttribute('tid')) }, true);
			firstlink.parentNode.insertBefore(img_element, firstlink);

		
			//create pic holder
			var newtr = document.createElement('tr');
			newtr.setAttribute("class", "pagination");
			if (tOpt == "pClick" || tOpt == "pNone") {
				newtr.setAttribute("style", "display: none");
			}
			newtr.setAttribute("id", "row" + torrentid);
			var newtd = document.createElement('td');
			newtd.setAttribute("colspan", "9");
			var span = document.createElement('div');
			span.innerHTML = "<br><br><br><br><br><br><br>Loading Pictures... Please wait...";
			span.setAttribute("id", "load" + torrentid);
			span.setAttribute("tid", torrentid);
			span.setAttribute("class", "doPreview");
			if (innerScroll == "Yes") {
				span.setAttribute("style", "background-color: #F2F2F2; height: 220px; width: 100%; display: block; overflow: auto; font-family: Verdana;font-size: 12px;");	
			} else {
				span.setAttribute("style", "background-color: #F2F2F2; height: 220px; width: 100%; display: block; overflow: none; font-family: Verdana;font-size: 12px;");	
			}

			if (favTags == "Yes") {
				if ( $(td).find("span.s-good").size() > 0) { //show fav automajically
					newtr.setAttribute("style", "");
					span.setAttribute("class", "doPreview");
					span.setAttribute("favTag", "1");
				}
			}
						
			//seed auto open
			if (seedThreshold > 0) {
				try {
					seed = $(td.parentNode.getElementsByTagName("td")[6]).text()*1;
					leech = $(td.parentNode.getElementsByTagName("td")[7]).text()*1;
					if (seed > seedThreshold || leech > seedThreshold ) {
							newtr.setAttribute("style", "");
							span.setAttribute("class", "doPreview");
							span.setAttribute("favTag", "1");
					}
				} catch (E) {}	
			}

			if (tOpt == "pFull") {
				newtr.setAttribute("style", "");
			}
			
			newtd.appendChild(span);
			newtr.appendChild(newtd);
			
			var tr = td.parentNode;
			tbl = td.parentNode.parentNode.parentNode;
			tbl.getElementsByTagName("tbody")[0].insertBefore(newtr, tr.nextSibling);
		}
			
	}

	torrents = document.evaluate("//div[@class='doPreview']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	var sticky = document.createElement('div');
	sticky.setAttribute("id", "GMsticky");
	sticky.setAttribute("class", "menubox");
	sticky.innerHTML = '<p class="title">Torrent Previews</p><div id="loadText">Loading...</div><div id="loadingBar"><div id="progressBar">&nbsp;</div></div><br><small>[<a id="closeit" href="javascript:void(0)">Close Box</a>]&nbsp;&nbsp;&nbsp;&nbsp;[<a id="CancelLoad" href="javascript:void(0)">Cancel Load</a>]<br>[<a href="javascript:void(0)" id="stickyNew">Clear New</a>]&nbsp;&nbsp;&nbsp;&nbsp;[<a href="javascript:scrollTo(0,0)">Top</a>]&nbsp;&nbsp;&nbsp;&nbsp;[<a href="javascript:scrollTo(0,0)" id="Config2">Config</a>]&nbsp;&nbsp;&nbsp;&nbsp;</small>'
	$("#side div:first").append( sticky );
	
	document.getElementById("Config2").addEventListener("click", function handler(evt){ showControls() }, true);
	document.getElementById("stickyNew").addEventListener("click", function handler(evt){ resetNew() }, true);
	document.getElementById("closeit").addEventListener("click", function handler(evt){ document.getElementById("GMsticky").setAttribute("style", "display:none") }, true);
	document.getElementById("CancelLoad").addEventListener("click", function handler(evt){ cancelLoad = true; window.stop; document.getElementById("loadText").innerHTML="Cancelled"; }, true);
	
	if (tOpt == "pScroll") {
		document.addEventListener("scroll", function handler(evt){ didScroll() }, true);
		wTop = window.pageYOffset + window.innerHeight;
	}
	commitScroll();

	
}



	setTimeout(function() { 
		//This should wait until other GM scripts are done...
		init();
	}, (1000) );
	
	setTimeout(function() { 
		//check new version
	
		var yql = 'http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20%20html%20where%20url%20=%20%27http%3A%2F%2Fuserscripts.org%2Fscripts%2Fshow%2F129905%27%20and%20xpath=%27//div[@id=%22full_description%22]/div[1]/p[1]%27&format=xml&callback=?';
		$.getJSON(yql,{},function(data) {
			// Handle response here
			data = data.results[0].replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').toString();
			if (data != sversion && data != "") {
				if ( confirm("There is an updated version " + data + "of the cheg-pornium script. Go there now?") ) {
					window.location.href = "http://userscripts.org/scripts/show/129905"
				}
			} else {
				console.log("cheg-pornium: up to date, server has " + data)
			}
			
		});
	}, (15000) );


