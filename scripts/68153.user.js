// ==UserScript==
// @name           FreeTV: IMDB search
// @version        1.0.0
// @author         danmana
// @namespace      http://userscripts.org/users/103443
// @description    Adds a small imdb search button next to each movie title.
// @include        http://www.free-tv-video-online.info/movies/*
// @exclude        http://www.free-tv-video-online.info/movies/
// @include        http://www.free-tv-video-online.info/internet/
// @include        http://www.free-tv-video-online.info/internet/index.html
// @include        http://www.free-tv-video-online.info/internet/index_status.html
// @include        http://www.free-tv-video-online.info/internet/index_rating.html
// @include        http://www.free-tv-video-online.info/internet/index_last.html
// ==/UserScript==

window.addEventListener('load', main, false);

function main(){
	try{
		//add the css styles needed
		var style = document.createElement('style');
		style.setAttribute('type','text/css');
		style.appendChild(document.createTextNode('.imdb{cursor:pointer;width:33px;height:16px;display:inline-block;margin-right:4px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAQCAMAAACvHOZVAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMAUExURdW7O8eqMsOkLiYiI9/JPNPAS+/aPaecVLyqStK3OFNNODg0LunVOtrBNs2zNDItJvbiPBcUGvflQ72oRf7++dm9PN/EP+jTPda+OezaRpKHVOLJNunUPeLRT52SW9zEOM2zOGNeSl1VNeXNN25lRNC1M5aLU4N6Td3AOdK+SjUzMx4aG9fBNpmOVTk2M9S5MHVuTZmOW4+GTu7aTfHZOxoXGufROnxyS2tkTPLfQsmrMoN3RaSYYdK6Nt/INtnBOMuvM+zXPHFoPImBTeHMOwcFE2lfPu3bOs20NubRPObSOEVCO8uyNaOWXtnFSd7DPi0qK9K4PNG3NElFPFdSQufTOuPMPePMOuLMOGZePtrEOIyDTtO8NNS6NNO5NW1lO8+0Nc+1MsqxM8qsMY2CW/ThTeTPOuPOOuPLOeDKOuLJO9/GN93HN9fAOdW+NzEuLxAOFtG1NCgkJmBYOGlgPiMfISEdHBQRGP///2RbPuDMOcaoLebPOvLbRN/MU+/uyc6vMsSmMt/HPNC3Nz47OHl3cIV8WejXUNW7NtzGOdG6NNO6NpOLYOjTRsmxN97FN+HLRqGVS7OkUtzIStK+ReDHNtW6Pta8Pta7OPjmT+/dSeHQdPX07N3EM8uuNs2vNa+jXeXMMox+RbajSbmlSfDfSufUPc+zKmBXO+bPPtK0OMCsT/flT+LLOuXQN09MS09OUOLPNl9aTsaqOujRO/rqaEZBNvPjWUxGNJ2TT09KO4uFTunYPK+fVvn33vPeN5OFTEE9N8iySWBZP2ZeO+3XRNHBcfPhSM2xMuXQO6SWSMWqQMesM8uyNsutMsuuMeHLOfvxoG9mPfLaPPLeOcy0NdjDMM61N9zCNc62ONrEMtO4NurSN9O2NJ2TZI+EUZGHXt/FOunUR9jFUJiJSpuMSJ2PT8mwNO3WOeTNO+XOON3FNu/cN97FNe3rw9W9NR8cINS9NurdlNi/N+rhnaaXT6mbVKucU9e8MtbAMrOlW9/NT9S4NdO5ONa7NvThR1fwLWkAAAIdSURBVHjaYqgQ2bpfRkZG3PNkWlpaekRERFUmCwtL00N5IOCdO2FOBYPIRQHxFyZsjo6OPKFmoV7r1m1Md3HJypKemt1/g7fb7osIw3Y2cXGhmWv+H09NtbRcOktS0tj4aO3lLY96V2asDfvcEVXH8MZMRqBd0ZvdKDh4J3twsPqC4F07Dp96HOI9ySSiU/591zUGdzPHK7L5rrvjCwqOGBQUKOkWlGmVF/0qKpCayJGjo2Oby7DHk8ddVq/cyMnUNETR1LRYV1CvR5vZl79MS/DgFHuJv6IM4jXLHH+DVZTptWiDVHDLaTPb8JtaBDCv1phxewZDzSuzO5P1yqOdBPWKyrQ+FKsJchuCVTzgLuL4ERQUxCCtrLzQD6jiUvn6AO0NpUpwFSncRcL6iaqJDJkvwzMe65U7xxds0itq1Yaq8AWrWJJ4NsGHoellph0rWIXFNv57pkpSgtwG2qVy/KZt3MyL+Z579DFEueTc0sx3VT/iqsLF/bWA636BqWB5/l5mwQDTAOHkZL4zDD+rLuhomld+e7Li2QFrjspF3ytLjpQ8PaTiZs5lPb/6PF81g99nFpcZ/mIzJPz/dTB4TA9UmBYYyHmCcdWqhnlWTA6q1ZsZ9n1iyJZ++xoYkby5uRJ5eR8/xnTb2v65W1hYmJAQxHTsHUNFxezlsbFxcUHNN29ev379qo9PUpKDg8O5ZCsrRsbG0/UVAAEGACc+x9n/0n9YAAAAAElFTkSuQmCC");}'));
		var head = document.head;
		if (head == null)
			head = document.getElementsByTagName('head')[0]; 
		head.appendChild(style);
		
		//create a search button
		var imdb = document.createElement('a');
		imdb.className = 'imdb';
		imdb.title = 'Search IMDB';
		
		//for each title add a copy of the search button, but with a different action
		var titles = getPatternResult('//td[@class="mnlcategorylist"]');
		for (var i=0;i<titles.snapshotLength;i++){
			var title = titles.snapshotItem(i);
			var href = 'http://www.imdb.com/find?s=all&q='+encodeURIComponent(title.firstChild.firstChild.firstChild.nodeValue);
			var copy = imdb.cloneNode(true);
			copy.setAttribute('href',href);
			title.insertBefore(copy,title.firstChild);
		}
	
	}catch(ex){
		alert('exception:\n'+ex);
	}
}

function getPatternResult(pattern, context){
    if (context == null) 
        context = document;
    return document.evaluate(pattern, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
