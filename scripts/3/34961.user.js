// ==UserScript==
// @name           Torrentz IMDB Rating
// @description   Adds  IMDB ratings to movie torrents on torrentz.com
// @namespace      http://userscripts.org/users/68426
// @include        http://www.torrentz.com/*
// ==/UserScript==

var loggingOn=false;

function addScore(){
	
	a_dt = document.getElementsByTagName('dt');
	for(i=0; i<a_dt.length; i++) {
		currElement=a_dt[i];
		descText = currElement.getElementsByTagName('a');
		movieTitle = descText[0].innerHTML;
		if(m=descText[0].innerHTML.match(/aXXo|FXG|FxM/)){
			temp = a_dt[i].firstChild.innerHTML;
			temp = temp.toLowerCase();
			temp = temp.substring(0, temp.indexOf('dvdrip'));
			temp = temp.replace(/<b>/g, '');
			temp = temp.replace(/<\/b>/g, '');
			temp = temp.replace(/\[/, ' (');
			temp = temp.replace(/\]/, ')');
			temp = temp.replace(/\./g, ' ');
			temp = temp.replace(/_/g, ' ');
			searchTitle = temp.replace(/' '/g, '+');
			loggingOn?GM_log(m+" movieName: "+searchTitle):void(0);
			handleDTentry(searchTitle, currElement);
			
		} else if(descText[0].innerHTML.match(/KLAXXON/)) {
			temp = currElement.firstChild.innerHTML;
			searchTitle = temp.substring(0, temp.indexOf('KLAXXON'));
			handleDTentry(searchTitle, currElement);
		} else {
			match = movieTitle.search(/([^\w ]|dvd|hdtv|720p|1080p|proper|r5|limited|italian|french|german| ts|telesync|avi|xvid|bluray|hddvd|nhd| ws|spanish).*$/gi);
            if (match >= 3) movieTitle = movieTitle.substring(0, match);
			movieTitle = movieTitle.replace(/<b>|<\/b>/g, '')
                                   .replace(/\./g, ' ')
                                   .replace(/_/g, ' ')
                                   .replace(/[\',]/g, '');
			movieTitle = movieTitle.replace(/\[.*?\]/g, '')
                                   .replace(/ +/g, ' ')
                                   .replace(/^ +| +$/g, '');
			handleDTentry(movieTitle, currElement);					   
		}		
	}
}

function handleDTentry(searchTitle, element){
	var googleUrl = 'http://www.google.com/search?q=intitle:[' + searchTitle + ']+site:imdb.com/title'+"&btnI=I'm Feeling Lucky";
	var cachedValue = GM_getValue("cache_"+searchTitle);
	if (cachedValue && (cachedValue == -1 || cachedValue.charAt(0)=='[')) {
		cachedratingLink = eval(cachedValue);
		loggingOn?GM_log("found cached version for: "+searchTitle+ " rating is: "+(cachedValue == -1?"-1":cachedratingLink[0])):void(0);
		if (cachedValue != -1) {
			addratingLinkToElement(element, cachedratingLink);
		}
	} else {
		loggingOn?GM_log("couldn not find cached version for: " +searchTitle):void(0);
		GM_xmlhttpRequest({
			method: 'GET',
			url: googleUrl,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				var res = responseDetails.responseText;  
				loggingOn?GM_log("got response text from imdb for:" +searchTitle):void(0);
				var ratingMatch = res.match(/<div class="meta">\s*<b>(\d\.\d)\/10<\/b>/);
				if (ratingMatch) {
					rating = ratingMatch[1];
					GM_setValue("cache_"+searchTitle, uneval([rating, responseDetails.finalUrl]));
					addratingLinkToElement(element, [rating, responseDetails.finalUrl]);
				} else {
					loggingOn?GM_log("could not match: "+searchTitle):void(0);
					loggingOn?GM_log("final URL = "+responseDetails.finalUrl):void(0);
					loggingOn? GM_log(res) : void(0);
					GM_setValue("cache_"+searchTitle, -1);
				}
			}
		});
	}
}

function addratingLinkToElement(element, ratingLink){
	loggingOn?GM_log("now in function addratingLinkToElement"):void(0);
	if (ratingLink && ratingLink != -1) {
		ratingElement = document.createElement('a');
		ratingElement.setAttribute("href", ratingLink[1]);
		ratingElement.setAttribute("style", "background-color:yellow");
		ratingElement.innerHTML = ""+ratingLink[0];
		text=element.innerHTML;
		newText=text+"&nbsp;";
		element.innerHTML=newText;
		element.appendChild(ratingElement);
	}
}
addScore();

