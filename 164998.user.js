// ==UserScript==
// @name        ProxFree
// @namespace   proxfree
// @description ProxFree is Proxad and free.
// @include     http*//*.youtube.*/watch*
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var proxfreeLoc = "fr";
var container = "player";

var youtubeContainer = document.getElementById(container); 
var youtubeInfos = document.getElementById('watch7-content');
            
function getVideo(reqUrl, reqMethod, reqData) {
	GM_xmlhttpRequest({
		method: reqMethod,
		url: reqUrl,
		data: reqData,
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0',
			'Accept': 'application/xml,text/xml',
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(responseDetails) {
			var doc = document.implementation.createHTMLDocument("proxfree_page");
			doc.documentElement.innerHTML = responseDetails.responseText;

			var proxfreeContainer = doc.getElementById(container);

			youtubeContainer.innerHTML = proxfreeContainer.innerHTML;
			
			var doc = document.implementation.createHTMLDocument("proxfreePage");
			doc.documentElement.innerHTML = responseDetails.responseText;
			var headline = doc.getElementById("watch7-headline");
			var qualityLinks = headline.getElementsByTagName('a');
			
			var linksContainer = document.getElementById('links-container') || document.createElement('div')
			if(linksContainer) {
                linksContainer = document.createElement('div');
                linksContainer.innerHTML = "";
                linksContainer.setAttribute('id', 'links-container');
		        linksContainer.style.padding = '10px';
      		    linksContainer.style.background = '#eeeeee';
                youtube_infos.insertBefore(linksContainer, youtubeInfos.firstChild);
            }
            
			var displayed = [];
			for(var i=0; i<qualityLinks.length; i++){
			    var qualityLink = qualityLinks[i];
			    if(qualityLink.innerHTML.match('[0-9]+p') && displayed.indexOf(qualityLink.innerHTML) == -1) {
    			    displayed.push(qualityLink.innerHTML);
    			    qualityLink.style.marginRight = '10px';
	                qualityLink.href = 'http://' + proxfreeLoc + '.proxfree.com' + qualityLink.href;
      				qualityLink.addEventListener('click', function(e) { e.preventDefault(); getVideo(this.href, 'GET', '');
      				  return false; }, false);
    				linksContainer.appendChild(qualityLink);
			    }
			}
		}
	});
}

if(youtubeContainer) {
	console.log('Starting');
	var page = getVideo('http://' + proxfreeLoc + '.proxfree.com/request.php?do=go', 'POST', 'get=' + encodeURIComponent(window.location.href));
}