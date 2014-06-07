// ==UserScript==
// @name			hepsiburada - add Metacritic ratings
// @description    Add Metacritic ratings to IMDB page
// @author         Caw based on script by Curtis Gibby
// @namespace		http://userscripts.org/users/97261/scripts
// @version			1.0
// @permission		http://*.google.com/*
// @include			http://*.hepsiburada.com/*
// ==/UserScript==

// ==User-Defined Variables==

//useMetaCriticColors = false;
useMetaCriticColors = true;
useProxy=true;

// ==/User-Defined Variables==

insertMCBase();

function getMovieName(xnode, includeYear) {
	
	if(includeYear == 1) {
		return encodeURIComponent(document.title);
	} // end if include year
	else {
		var sub1=xnode.childNodes[1];
		var inner = sub1.innerHTML;
		var x1=inner.split('title="')[1];
		var x2=x1.split('"')[0];
		return x2;
	}// end else (! include year)
	
}

function getResults(movieName,i, alreadyTryingAKAs) {
	var mn1="";
	var mn2="";
	if (movieName.indexOf('(')!=-1){
		var mn=movieName.split('(');
		mn1=mn[0].replace('','i').trim();
		mn2=mn[1].split(')')[0].replace('','i').trim();
	}else
		mn1=movieName.trim();

	if(movieName != "") {
		
	
	GoogleAJAXURL = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=site%3Ametacritic.com/movie%20metascore%20" + mn1;
		GM_xmlhttpRequest({
			method: 'GET',
			url: GoogleAJAXURL,
			onload: function(responseDetails) {
				var json = eval("(" +responseDetails.responseText+")");
				if(json.responseData.results[0]){
					var url=json.responseData.results[0].url;
					if (useProxy){	
						url=url.replace("http","");
						url="http://www.trt-2.com/browse.php?u="+url+"&b=60";
					}
					setLink(i,url);
					getMCRating(url, alreadyTryingAKAs,mn1,mn2,i);
				}
				else if(alreadyTryingAKAs == 1) {
					ultimateFailure(i);
				}
				else
					getResults(mn2,i, 1);
			}
		});
	
	} // end if movieName != ""
	else
		ultimateFailure(i);

} // end function getResults

function findNode(nodex,i){

	doc = document.createElement('div');
	doc.innerHTML = nodex.innerHTML;
	findPattern = "//span[@id='j"+i+"']";
	var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	return results.snapshotItem(0);
}

function setLink(i,url){
	var ms=document.getElementById('ms'+i);
	ms.innerHTML="<a href='"+url+"'>metascore</a>";
}

var errorcount=0;

function getMCRating(MC_url, alreadyTryingAKAs,mn1,mn2,i) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: MC_url,
		onload: function (response) {
			
			var addedMetaCriticResult= document.getElementById('j'+i);
			
			doc = document.createElement('div');
			doc.innerHTML = response.responseText;
			
			findPattern = "//span[@class='score_value']";
			var results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			
			if (results.snapshotItem(0) !== null) {			
				var metaCriticResult =parseInt(results.snapshotItem(0).innerHTML);
				if(useMetaCriticColors == true) {

					addedMetaCriticResult.style.fontWeight = 'bold';
					addedMetaCriticResult.style.paddingLeft = '3px';
					addedMetaCriticResult.style.paddingRight = '3px';
					addedMetaCriticResult.style.fontFamily='Arial,Helvetica,sans-serif';
					addedMetaCriticResult.style.fontSize='11px';

					if (metaCriticResult >= 81) {
						addedMetaCriticResult.style.backgroundColor='#33CC00';
						addedMetaCriticResult.title='Universal Acclaim';
					} // end if 81 - 100
					else if (metaCriticResult >= 61) {
						addedMetaCriticResult.style.backgroundColor='#33CC00';
						addedMetaCriticResult.title='Generally Favorable Reviews';
					} // end if 61 - 80
					else if (metaCriticResult >= 40) {
						addedMetaCriticResult.style.backgroundColor='#FFFF00';
						addedMetaCriticResult.title='Mixed or Average Reviews';
					} // end if 40 - 60
					else if (metaCriticResult >= 20) {
						addedMetaCriticResult.style.color='#FFFFFF';
						addedMetaCriticResult.style.backgroundColor='#FF0000';
						addedMetaCriticResult.title='Generally Unfavorable Reviews';
					} // end if 20 - 39
					else {
						addedMetaCriticResult.style.color='#FFFFFF';
						addedMetaCriticResult.style.backgroundColor='#FF0000';
						addedMetaCriticResult.title='Overwhelming Dislike';
					} // end if 0 - 19
					
				} // end if useMetaCriticColors
				addedMetaCriticResult.innerHTML = "<a href='"+MC_url+"'>"+metaCriticResult+"</a>";
				
			} // end if (! null)
			else {
				if(alreadyTryingAKAs == 1) {
					ultimateFailure(i);
				}
				else
					getResults(mn2,i, 1);
					// one more time!
					
			} //end else
		}
	});

} // end function getMCRating

function ultimateFailure(i) {
	var addedMetaCriticResult= document.getElementById('j'+i);
	addedMetaCriticResult.innerHTML = ":(";
} // end function ultimateFailure

function insertMCBase() {
	var i =0;
	xfindPattern = "//div[@class='ImagesContainer200x200 fnone mAuto']";
	xresults = document.evaluate( xfindPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	while (xresults.snapshotItem(i)!=null)
	{
		var next = xresults.snapshotItem(i);
		var mn=getMovieName(next.parentNode,0);
		addedDivMetaCritic = document.createElement('div');
		addedDivMetaCritic.innerHTML = '<span id="ms'+i+'">metascore</span><span id="j'+i+'"> checking <img src="'+'data:image/gif;base64,'+
	    'R0lGODlhEAAQAPYAAP///wAAANTU1JSUlGBgYEBAQERERG5ubqKiotzc3KSkpCQkJCgoKDAwMDY2'+
	    'Nj4+Pmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6+vtDQ0Do6OhYWFoyMjKqqqlxcXHx8'+
	    'fOLi4oaGhg4ODmhoaJycnGZmZra2tkZGRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKC'+
	    'gqioqPr6+vz8/MDAwMrKyvj4+NbW1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4NjY2PLy8tra'+
	    '2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq6ioqKo6OjlhYWCwsLB4eHqCg'+
	    'oE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5ri4uH5+fpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQ'+
	    'EAwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAACH/'+
	    'C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwA'+
	    'AAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAML'+
	    'E4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaD'+
	    'ERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAH'+
	    'jIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hL'+
	    'UbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb'+
	    '04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkK'+
	    'E2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0pu'+
	    'aoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtA'+
	    'L9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZ'+
	    'Z1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zH'+
	    'kFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwF'+
	    'GAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVE'+
	    'PAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3'+
	    'Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5'+
	    'BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZW'+
	    'QYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyD'+
	    'N9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAA'+
	    'EAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjcz'+
	    'rJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUW'+
	    'VnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6'+
	    'RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpj'+
	    'ggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgce'+
	    'YY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA'+'" alt ="checking"></span>';
		addedDivMetaCritic.setAttribute('id','greaseTextMetaCritic');

		next.parentNode.insertBefore(addedDivMetaCritic, next);
		getResults(mn,i,0);
		i++;
	}
} // end function insertMCBase
