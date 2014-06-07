// ==UserScript==
// @name           Yahoo Movie Showtimes + Rotten Tomatoes
// @version        1.1
// @namespace      http://swornpacifist.net/YahooMovieShowtimesRottenTomatoes/
// @description    Yahoo Movie Showtimes + Rotten Tomatoes
// @include        http://movies.yahoo.com/showtimes/*
// ==/UserScript==
//
// BASED ON "IMDb DirectSearch Plus" by Hiromacu (link: http://userscripts.org/scripts/show/25297 )
//      AND "Cinemark + Rotten Tomatoes" by BetaAlpha (link: http://userscripts.org/scripts/show/13296 )
// ==/UserScript==


var strScriptName = 'Yahoo Movie Showtimes + Rotten Tomatoes';
var strScriptNumber = '28839';

var intScriptVersion = '1.2';

var strURLScriptText = 'http://userscripts.org/scripts/review/' + strScriptNumber+ '?format=txt';
var strURLScriptInstall = 'http://userscripts.org/scripts/source/' + strScriptNumber+ '.user.js';
var strURLScriptInfo = 'http://userscripts.org/scripts/show/' + strScriptNumber;



GM_xmlhttpRequest({
	   method:"GET",
	   url:strURLScriptText,
	   headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey script by SwornPacifist'},
	   onload:function(response) {
		var strScriptText = response.responseText;
		var intVersionStart = strScriptText.indexOf("var intScriptVersion = '") + 24;
		var intVersionStop = strScriptText.indexOf("'", intVersionStart);
		var dblVersion = parseFloat(strScriptText.substring(intVersionStart, intVersionStop));
		
		if (dblVersion > parseFloat(intScriptVersion))
		{
			var answer = confirm('There is a newer version of the Greasemonkey script: "' + strScriptName + '" script, it will now install the most recent version');

			if (answer == true)
			{
				GM_openInTab(strURLScriptInfo);
				window.location.href = strURLScriptInstall;
			}
		}
	}
});





GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://i.rottentomatoes.com/syndication/rss/complete_movies.xml',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var rtXMLparser = new DOMParser();
        var rtXMLdom = rtXMLparser.parseFromString(responseDetails.responseText,"application/xml");
        var rtXMLentries = rtXMLdom.getElementsByTagName('item');
	var anch = ''
        
        
        
		var links = document.getElementsByTagName('a');
		for (var x = 0; x < links.length; x++) {

		if (
		(links[x].href.indexOf('movies.yahoo.com/movie/')>0) ||
		(links[x].href.indexOf('movie?mid=')>0) 
		) {
			anch = links[x].text.toUpperCase();
			anch = anch.replace(/  /g, " ");
			anch = anch.replace(/^THE /, "");
			
			
			for (var intIndex = 0; intIndex < rtXMLentries.length; intIndex++) {
				var rtTitle = rtXMLentries[intIndex].getElementsByTagName('title')[0].textContent;
				var rtURL = rtXMLentries[intIndex].getElementsByTagName('link')[0].textContent;
				var rtDesc = rtXMLentries[intIndex].getElementsByTagName('description')[0].textContent;
				var strTitle = rtTitle.substr(rtTitle.indexOf('%')+2).toUpperCase();
				strTitle = strTitle.toUpperCase().replace(/^THE /, "");

				if (
					(strTitle.indexOf(anch) == 0) || 
					(anch.indexOf(strTitle) == 0)
				) {
				
				
					var intPercent = -1;
					var fontcol='';
					var rotten_rating_image_url='';
					var rotten_rating_text='';

					if ((rtTitle.indexOf('%') > 0) && (rtTitle.indexOf('%') < rtTitle.indexOf(' '))) {
						strTitle = rtTitle.substr(rtTitle.indexOf('%')+2).toUpperCase();
						intPercent = rtTitle.substr(0,rtTitle.indexOf('%'));
						if (parseInt(intPercent) >= 60) {
							fontcol='007800';
							rotten_rating_image_url = 'data:image/gif;base64,R0lGODlhEAAQALMAAFViHKY0F9c7FJdiHPtGF/51VDuIJlahLYmJJ/6Ia////wAAAP///wAAAAAAAAAAACH5BAEAAAwALAAAAAAQABAAAARdkMlJq2WpFHJnyhvBXZpIHKIgVIkpHoOAjNKXHviAoKsUCoQBAGcAqHoulRAACBwlQNNgcDAEDNaAJCVyHprfgJYBVBFUgaZAPHGWj+40xXk+rtkVsX7f2es7gBQRADs=';
							rotten_rating_text = "Fresh";
						} else {
							fontcol='FF0000';
							rotten_rating_image_url = 'data:image/gif;base64,R0lGODlhEAAQANUAAECdJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///yH5BAEAAD8ALAAAAAAQABAAAAY2wJ/wBygOj0hiEZBMLpnN43O4pBqrSqwW+uQas1PptRvtQstm59e83jLJ2Kz1K6bT6+eoPBkEADs=';
							rotten_rating_text = "Rotten";
						}
					} else {
						intPercent = '??';
						fontcol='0000FF';
					}

					var PercentDiv = document.createElement('span');
					PercentDiv.innerHTML='&nbsp;<br><a href="'+ rtURL +'" target="_blank"><font color="#'+fontcol+'">'+ rotten_rating_text +' score: '+intPercent+'%</font>'+'</a> <IMG SRC="' + rotten_rating_image_url + '" ALT="' + rotten_rating_text + '" BORDER=0 HEIGHT=14 WIDTH=14>';
					var descdiv = document.createElement('span');
					descdiv.innerHTML='<br/><font size="1">'+rtDesc+'</font><br/>';


					links[x].parentNode.insertBefore(PercentDiv,links[x].nextSibling);
					PercentDiv.parentNode.insertBefore(descdiv,PercentDiv.nextSibling);
					break;
					}
				}
			}
		}
	}
});
 