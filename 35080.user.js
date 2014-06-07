// ==UserScript==
// @name			Social Media Metrics Plugin for Google Anayltics
// @author			Erik Vold (erikvvold@gmail.com)
// @namespace		smmPluginForGA
// @datecreated		October 10th 2008
// @lastupdated		March 17th 2009
// @version			1.2.1
// @include			http://google.com/analytics/reporting/content_detail?*
// @include			http://www.google.com/analytics/reporting/content_detail?*
// @include			http://adwords.google.com/analytics/reporting/content_detail?*
// @include			https://google.com/analytics/reporting/content_detail?*
// @include			https://www.google.com/analytics/reporting/content_detail?*
// @include			https://adwords.google.com/analytics/reporting/content_detail?*
// @description		This will display social media metric data in google analytics
// ==/UserScript==

var smmDataInGA = {};

smmDataInGA.divID = "smmPluginForGA";

smmDataInGA.cleanURL = function(str, bDeleteDomain){
// source: http://www.devguy.com/bb/viewtopic.php?t=854
	
	if (str == null || str.length == 0)
		//   return "";
	var i = str.indexOf("http://");

	if( i == 0 ){
		str = str.substr(7);
	}
	else{
		i = str.indexOf("https://");

		if (i == 0){
			str = str.substr(8);
		}
	}

	i = str.indexOf("?");
	if ( i > -1 )
		str = str.substring(0,i);

	i = str.indexOf("&");
	if ( i > -1 )
		str = str.substring(0,i);

	for(;;){
		i = str.lastIndexOf("/");

		if ( i == -1 || i < (str.length -1) )
			break;

		str = str.substring(0,i);         
	}

	while (str.indexOf("/") == 0)
      str = str.substring(1);
                              
   if (bDeleteDomain){
      i = str.indexOf("/");
      if ( i > -1 )
      {
         str = str.substring(i+1);   
      }
   }
      
   for (;;){   
      i = str.indexOf("//");
      if (i == -1)
         break;
      str = str.replace(/\/\//g, "/");
   }
   
   return str;
}

smmDataInGA.getDomain = function(str){
// source: http://www.devguy.com/bb/viewtopic.php?p=1899
	
   if (str == null || str.length == 0)
      return "";
   
   str = smmDataInGA.cleanURL(str).toLowerCase();
   
   var i = str.indexOf("/");
   if (i > -1)
      str = str.substring(0, i);
      
   var parts = str.split('.');
   
   var len = parts.length;
   
   if (len < 3)
      return str;

   var lastPart = parts[len-1];
   var secondPart;
         
   secondPart = parts[len-2];
   
   var two = 2;
   
   if (lastPart == "uk" && secondPart == "co")
      ++two;
   
   if (len >= 0)
      return parts.splice(len-two, two).join('.');
   
   return "";
}

// digg
smmDataInGA.addDiggCount = function(){
	try{
		var addDiggToGA = {};
		addDiggToGA.numberOfDiggs = "?";
		addDiggToGA.tempDiv = document.createElement('div');
		addDiggToGA.tempDiv.style.display = "none";
		addDiggToGA.newDisplayDiv = document.createElement('div');
		
		// get digg count and display it
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://digg.com/tools/diggthis.php?u='+smmDataInGA.pageURL,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
		
			addDiggToGA.tempDiv.innerHTML = responseDetails.responseText.match(/<li class="digg-count"[^>]*>([^<]|<[^\/]|<\/[^l]|<\/l[^i]|<\/li\s*[^>])*<\/li\s*>/);
		
			addDiggToGA.link = addDiggToGA.tempDiv.getElementsByTagName('a')[0];
			addDiggToGA.link = addDiggToGA.link.href.replace(/https?:\/\/[^\/]*/i,"http://digg.com");
			
			// START: Get the number of diggs
			addDiggToGA.numberOfDiggs = addDiggToGA.tempDiv.getElementsByTagName('strong')[0].innerHTML;
			if( addDiggToGA.numberOfDiggs == "Digg" ){
				addDiggToGA.numberOfDiggs = 0;
			}
			else{
				addDiggToGA.numberOfDiggs = addDiggToGA.numberOfDiggs.match(/\d*/);
		
				if( addDiggToGA.numberOfDiggs == "" ){
					addDiggToGA.numberOfDiggs = 0;
				}
			}
			// END: Get the number of diggs
				
			addDiggToGA.newDisplayDiv.innerHTML = "<div class='sparkline'>"+
								"<div>"+
								  "<div class='visualization'>"+
								  "<a title='Digg it!' target='_blank' href='"+addDiggToGA.link+"'>"+
								"<img alt='Digg' src='http://erikvold.com/images/external/digg-logo-small.png' border='0' /></a>"+
								  "</div>"+
								"</div>"+
								"<div>"+
								  "<div class='statistic'>"+
								"<h3>"+
								  "<a title='Digg it!' target='_blank' href='"+addDiggToGA.link+"'>"+
								  "<span class='primary_value'>"+
								  addDiggToGA.numberOfDiggs+
								  "&nbsp;</span>"+
								  "<span class='label'>&nbsp;Total&nbsp;Digg(s)</span></a>"+
								"</h3>"+
								  "</div>"+
								"</div>"+
							  "</div>";
							
			
					smmDataInGA.gaPageSparkLine.appendChild( addDiggToGA.newDisplayDiv );
			}
		});
		
	}
	catch(e){};
}

// sphinn
smmDataInGA.addSphinnCount = function(){
	try{
	
		var addSphinnToGA = {};
		addSphinnToGA.numberOfSphinns = "?";
		
		addSphinnToGA.tempDiv = document.createElement('div');
		addSphinnToGA.tempDiv.style.display = "none";
		addSphinnToGA.newDisplayDiv = document.createElement('div');
	
		
		// get sphinn count and display it
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://sphinn.com/evb/url.php?url='+smmDataInGA.pageURL,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
		
			addSphinnToGA.tempDiv.innerHTML = responseDetails.responseText.match(/<ul class="wrap"[^>]*>([^<]|<[^\/]|<\/[^u]|<\/u[^l]|<\/ul\s*[^>])*<\/ul\s*>/);
		
			addSphinnToGA.link = addSphinnToGA.tempDiv.getElementsByTagName('a')[0].href;
		
			addSphinnToGA.numberOfSphinns = addSphinnToGA.tempDiv.getElementsByTagName('b')[0].innerHTML;
		
			if( addSphinnToGA.numberOfSphinns == "Sphinn it!" ){
				addSphinnToGA.numberOfSphinns = 0;
			}
			else{
				addSphinnToGA.numberOfSphinns = addSphinnToGA.numberOfSphinns.match(/\d*/);
		
				if( addSphinnToGA.numberOfSphinns == "" ){
					addSphinnToGA.numberOfSphinns = 0;
				}
			}
				
			addSphinnToGA.newDisplayDiv.innerHTML = "<div class='sparkline'>"+
								"<div>"+
								  "<div class='visualization'>"+
								  "<a title='Sphinn it!' target='_blank' href='"+addSphinnToGA.link+"'>"+
								"<img alt='Sphinn' src='http://erikvold.com/images/external/sphinn-logo-sm.jpg' border='0' /></a>"+
								  "</div>"+
								"</div>"+
								"<div>"+
								  "<div class='statistic'>"+
								"<h3>"+
								  "<a title='Sphinn it!' target='_blank' href='"+addSphinnToGA.link+"'>"+
								  "<span class='primary_value'>"+
								  addSphinnToGA.numberOfSphinns+
								  "&nbsp;</span>"+
								  "<span class='label'>&nbsp;Total&nbsp;Sphinn(s)</span></a>"+
								"</h3>"+
								  "</div>"+
								"</div>"+
							  "</div>";;
							
			
					smmDataInGA.gaPageSparkLine.appendChild( addSphinnToGA.newDisplayDiv );
			}
		});
	}
	catch(e){};
}

// del.icio.us
smmDataInGA.addDeliciousCount = function(){
	try{
	
		var addDeliciousToGA = {};
		addDeliciousToGA.numberOfSaves = "?";
		
		addDeliciousToGA.tempDiv = document.createElement('div');
		addDeliciousToGA.tempDiv.style.display = "none";
		addDeliciousToGA.newDisplayDiv = document.createElement('div');
	
	
		// get del.icio.us save count and display it
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://badges.del.icio.us/feeds/json/url/data?url='+smmDataInGA.pageURL,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				
			addDeliciousToGA.tempDiv.innerHTML = responseDetails.responseText.match(/"total_posts":\d+/);
			
			addDeliciousToGA.numberOfSaves = addDeliciousToGA.tempDiv.innerHTML.match(/\d+/);
			
			if(addDeliciousToGA.numberOfSaves == '' || addDeliciousToGA.numberOfSaves == null){
				addDeliciousToGA.numberOfSaves = 0;
			}
				
			addDeliciousToGA.newDisplayDiv.innerHTML = "<div class='sparkline'>"+
								"<div>"+
								  "<div class='visualization'>"+
								  "<a title='Bookmark it!' target='_blank' href='http://delicious.com/save?url="+smmDataInGA.pageURL+"'>"+
								"<img alt='Del.icio.us' src='http://erikvold.com/images/external/delicious-logo-small.jpg' border='0' /></a>"+
								  "</div>"+
								"</div>"+
								"<div>"+
								  "<div class='statistic'>"+
								"<h3>"+
								  "<a title='Bookmark it!' target='_blank' href='http://delicious.com/save?url="+smmDataInGA.pageURL+"'>"+
								  "<span class='primary_value'>"+
								  addDeliciousToGA.numberOfSaves+
								  "&nbsp;</span>"+
								  "<span class='label'>&nbsp;Total&nbsp;Save(s)</span></a>"+
								"</h3>"+
								  "</div>"+
								"</div>"+
							  "</div>";;
							
			
					smmDataInGA.gaPageSparkLine.appendChild( addDeliciousToGA.newDisplayDiv );
			}
		});
	}
	catch(e){};
}

// StumbleUpon Review COunt
smmDataInGA.addStumbleUponReviewCount = function(){
	try{
		var addStumbleUponReviewsToGA = {};
		addStumbleUponReviewsToGA.numberOfReviews = "?";
		
		addStumbleUponReviewsToGA.tempDiv = document.createElement('div');
		addStumbleUponReviewsToGA.tempDiv.style.display = "none";
		addStumbleUponReviewsToGA.newDisplayDiv = document.createElement('div');
	
		
		// get stumbleupon review count and display it
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.stumbleupon.com/url/'+smmDataInGA.pageURL.replace(/^https?:\/\//i,""),
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				
			addStumbleUponReviewsToGA.numberOfReviews = responseDetails.responseText.match(/<span\s+class="textOk"\s*>\s*<strong>\s*[\d,]+s*<\/strong>\s*<\/span>\s*reviews/i);
			
			if(addStumbleUponReviewsToGA.numberOfReviews == '' || addStumbleUponReviewsToGA.numberOfReviews == null){
				addStumbleUponReviewsToGA.numberOfReviews = "0";
			}
			
			addStumbleUponReviewsToGA.numberOfReviews = addStumbleUponReviewsToGA.numberOfReviews.toString().match(/[\d,]+/);
			
			// try a second attempt due to 2nd poosible design displayed by stumble upon
			if( addStumbleUponReviewsToGA.numberOfReviews == 0 ){
				addStumbleUponReviewsToGA.tempString = responseDetails.responseText.match(/<h2\s+class="subDividerBottom">\d+\s+review/i);
				if(addStumbleUponReviewsToGA.tempString == null){
					addStumbleUponReviewsToGA.numberOfReviews = "0";
				}
				else{
					addStumbleUponReviewsToGA.numberOfReviews = addStumbleUponReviewsToGA.tempString[0].match(/2[^\d]*([\d,])+/i)[1];
				}
			}
				
			addStumbleUponReviewsToGA.newDisplayDiv.innerHTML = "<div class='sparkline'>"+
								"<div>"+
								  "<div class='visualization'>"+
								  "<a title='View StumbleUpon Review(s)' target='_blank' href='http://www.stumbleupon.com/url/"+smmDataInGA.pageURL.replace(/^https?:\/\//i,"")+"'>"+
								"<img alt='StumbleUpon' src='http://erikvold.com/images/external/stumbleupon-logo-sm.jpg' border='0' /></a>"+
								  "</div>"+
								"</div>"+
								"<div>"+
								  "<div class='statistic'>"+
								"<h3>"+
								  "<a title='View StumbleUpon Review(s)' target='_blank' href='http://www.stumbleupon.com/url/"+smmDataInGA.pageURL.replace(/^https?:\/\//i,"")+"'>"+
								  "<span class='primary_value'>"+
								  addStumbleUponReviewsToGA.numberOfReviews+
								  "&nbsp;</span>"+
								  "<span class='label'>&nbsp;Total&nbsp;Review(s)</span></a>"+
								"</h3>"+
								  "</div>"+
								"</div>"+
							  "</div>";
							
			
					smmDataInGA.gaPageSparkLine.appendChild( addStumbleUponReviewsToGA.newDisplayDiv );
			}
		});
	}
	catch(e){};
}


// Reddit
smmDataInGA.addRedditCount = function(){
	try{
		var addRedditToGA = {};
		addRedditToGA.numberOfPoints = "?";
		
		addRedditToGA.tempDiv = document.createElement('div');
		addRedditToGA.tempDiv.style.display = "none";
		addRedditToGA.newDisplayDiv = document.createElement('div');
	
	
		// get reddit point count and display it
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.reddit.com/button_content?t=1&url='+encodeURIComponent(smmDataInGA.pageURL),
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				
			addRedditToGA.tempDiv.innerHTML = responseDetails.responseText.match(/\d+\s+point/i);
			
			addRedditToGA.numberOfPoints = addRedditToGA.tempDiv.innerHTML.match(/\d+/);
			
			if(addRedditToGA.numberOfPoints == '' || addRedditToGA.numberOfPoints == null){
				addRedditToGA.numberOfPoints = 0;
			}
				
			addRedditToGA.newDisplayDiv.innerHTML = "<div class='sparkline'>"+
								"<div>"+
								  "<div class='visualization'>"+
								  "<a title='Submit it!' target='_blank' href='http://reddit.com/submit?url="+encodeURIComponent(smmDataInGA.pageURL)+"'>"+
								"<img alt='Reddit' src='http://erikvold.com/images/external/reddit-logo-small.jpg' border='0' /></a>"+
								  "</div>"+
								"</div>"+
								"<div>"+
								  "<div class='statistic'>"+
								"<h3>"+
								  "<a title='Submit it!' target='_blank' href='http://reddit.com/submit?url="+encodeURIComponent(smmDataInGA.pageURL)+"'>"+
								  "<span class='primary_value'>"+
								  addRedditToGA.numberOfPoints+
								  "&nbsp;</span>"+
								  "<span class='label'>&nbsp;Total&nbsp;Point(s)</span></a>"+
								"</h3>"+
								  "</div>"+
								"</div>"+
							  "</div>";;
							
			
					smmDataInGA.gaPageSparkLine.appendChild( addRedditToGA.newDisplayDiv );
			}
		});
	}
	catch(e){};
}


// Mixx
smmDataInGA.addMixxCount = function(){
	try{
		var addMixxToGA = {};
		addMixxToGA.numberOfPoints = "?";
		
		addMixxToGA.tempDiv = document.createElement('div');
		addMixxToGA.tempDiv.style.display = "none";
		addMixxToGA.newDisplayDiv = document.createElement('div');
	
	
		// get mixx vote count and display it
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://api.mixx.com/services/v1r1/thingies/show?api_key=NAichla33jPL9g3ugl7KQw&url="+encodeURIComponent(smmDataInGA.pageURL),
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				
			addMixxToGA.numberOfPoints = responseDetails.responseText.match(/<vote_count>\s*[\d,]+\s*<\/vote_count>/i);
			
			if(addMixxToGA.numberOfPoints == '' || addMixxToGA.numberOfPoints == null){
				addMixxToGA.numberOfPoints = 0;
			}
			else{
				addMixxToGA.numberOfPoints = addMixxToGA.numberOfPoints[0].match(/[\d,]+/);	
			}
			
			if(addMixxToGA.numberOfPoints <= 0){
				addMixxToGA.linkURLString = "http://www.mixx.com/submit?page_url="+encodeURIComponent(smmDataInGA.pageURL);	
			}
			else{
				addMixxToGA.linkURLString = responseDetails.responseText.match(/<permalink>\s*(.*?)\s*<\/permalink>/i)[1];
			}
				
			addMixxToGA.newDisplayDiv.innerHTML = "<div class='sparkline'>"+
								"<div>"+
								  "<div class='visualization'>"+
								  "<a title='Vote for it!' target='_blank' href='"+addMixxToGA.linkURLString+"'>"+
								"<img alt='Mixx' src='http://erikvold.com/images/external/mixx-logo-sm.jpg' border='0' /></a>"+
								  "</div>"+
								"</div>"+
								"<div>"+
								  "<div class='statistic'>"+
								"<h3>"+
								  "<a title='Vote for it!' target='_blank' href='"+addMixxToGA.linkURLString+"'>"+
								  "<span class='primary_value'>"+
								  addMixxToGA.numberOfPoints+
								  "&nbsp;</span>"+
								  "<span class='label'>&nbsp;Total&nbsp;Vote(s)</span></a>"+
								"</h3>"+
								  "</div>"+
								"</div>"+
							  "</div>";;
							
			
					smmDataInGA.gaPageSparkLine.appendChild( addMixxToGA.newDisplayDiv );
			}
		});
	}
	catch(e){};
}


// Yahoo Buzz
smmDataInGA.addYahooBuzz = function(){
	try{
		var addRedditToGA = {};
		addRedditToGA.numberOfPoints = "?";
		
		addRedditToGA.tempDiv = document.createElement('div');
		addRedditToGA.tempDiv.style.display = "none";
		addRedditToGA.newDisplayDiv = document.createElement('div');

		addRedditToGA.urlString = 'http://votes.buzz.yahoo.com/article/V1/votecount?guid='+encodeURIComponent("http://www.trendhunter.com/trends/hugh-hefner-holly-madison");
	
		alert(addRedditToGA.urlString);
	
		// get del.icio.us save count and display it
		GM_xmlhttpRequest({
			method: 'GET',
			//url: 'http://votes.buzz.yahoo.com/article/V1/votecount?guid='+encodeURIComponent(smmDataInGA.pageURL),
			url: addRedditToGA.urlString,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				
			addRedditToGA.numberOfPoints = responseDetails.responseText;
				
			addRedditToGA.newDisplayDiv.innerHTML = "<div class='sparkline'>"+
								"<div>"+
								  "<div class='visualization'>"+
								  "<a title='Buzz up!' target='_blank' href='http://buzz.yahoo.com/article/pub/"+encodeURIComponent(smmDataInGA.pageURL)+"'>"+
								"<img alt='Yahoo Buzz' src='http://erikvold.com/images/external/yahoo-buzz-small.jpg' border='0' /></a>"+
								  "</div>"+
								"</div>"+
								"<div>"+
								  "<div class='statistic'>"+
								"<h3>"+
								  "<a title='Buzz up' target='_blank' href='http://buzz.yahoo.com/article/pub/"+encodeURIComponent(smmDataInGA.pageURL)+"'>"+
								  "<span class='primary_value'>"+
								  addRedditToGA.numberOfPoints+
								  "&nbsp;</span>"+
								  "<span class='label'>&nbsp;Total&nbsp;Vote(s)</span></a>"+
								"</h3>"+
								  "</div>"+
								"</div>"+
							  "</div>";;
							
			
					smmDataInGA.gaPageSparkLine.appendChild( addRedditToGA.newDisplayDiv );
			}
		});
	}
	catch(e){};
}

// Yahoo.ca Site Explorer Inlinks
smmDataInGA.addYahooCAInLinks = function(){
	try{
	
		var addYahooCAInlinksToGA = {};
		addYahooCAInlinksToGA.numberOfInlinks = "?";
		
		addYahooCAInlinksToGA.tempDiv = document.createElement('div');
		addYahooCAInlinksToGA.tempDiv.style.display = "none";
		addYahooCAInlinksToGA.newDisplayDiv = document.createElement('div');
	
		// get yahoo inlink count and display it
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://ca.siteexplorer.search.yahoo.com/siteexplorer/search?p='+smmDataInGA.pageURL+"&bwm=i&bwmo=d&bwmf=u",
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				
			addYahooCAInlinksToGA.tempDiv.innerHTML = responseDetails.responseText.match(/Inlinks \([\d,]+\)/i);
			
			addYahooCAInlinksToGA.numberOfInlinks = addYahooCAInlinksToGA.tempDiv.innerHTML.match(/[\d,]+/);
			
			if(addYahooCAInlinksToGA.numberOfInlinks == '' || addYahooCAInlinksToGA.numberOfInlinks == null){
				addYahooCAInlinksToGA.numberOfInlinks = 0;
			}
				
			addYahooCAInlinksToGA.newDisplayDiv.innerHTML = "<div class='sparkline'>"+
								"<div>"+
								  "<div class='visualization'>"+
								  "<a title='View Yahoo.ca Site Explorer Inlinks Report' target='_blank' href='http://ca.siteexplorer.search.yahoo.com/siteexplorer/search?p="+smmDataInGA.pageURL+"&bwm=i&bwmo=d&bwmf=u'>"+
								"<img alt='Yahoo.ca Site Explorer' src='http://erikvold.com/images/external/se-ylogo.png' border='0' /></a>"+
								  "</div>"+
								"</div>"+
								"<div>"+
								  "<div class='statistic'>"+
								"<h3>"+
								  "<a title='View Yahoo.ca Site Explorer Inlinks Report' target='_blank' href='http://ca.siteexplorer.search.yahoo.com/siteexplorer/search?p="+smmDataInGA.pageURL+"&bwm=i&bwmo=d&bwmf=u'>"+
								  "<span class='primary_value'>"+
								  addYahooCAInlinksToGA.numberOfInlinks+
								  "&nbsp;</span>"+
								  "<span class='label'>&nbsp;Total&nbsp;Inlink(s)</span></a>"+//" (Yahoo.ca)"+
								"</h3>"+
								  "</div>"+
								"</div>"+
							  "</div>";;
							
			
					smmDataInGA.gaPageSparkLine.appendChild( addYahooCAInlinksToGA.newDisplayDiv );
			}
		});
	}
	catch(e){};
}

// Yahoo.com Site Explorer Inlinks
smmDataInGA.addYahooComInLinks = function(){
	try{
		if( smmDataInGA.pageDomain == '' ){
			alert('bad domain');
			return;	
		}
	
		var addYahooCOMInlinksToGA = {};
		
		addYahooCOMInlinksToGA.urlString = 'http://search.yahoo.com/search?p=link:'+smmDataInGA.pageURL+'%20-site:'+smmDataInGA.pageDomain;
		
		addYahooCOMInlinksToGA.numberOfInlinks = "?";
		
		addYahooCOMInlinksToGA.tempDiv = document.createElement('div');
		addYahooCOMInlinksToGA.tempDiv.style.display = "none";
		addYahooCOMInlinksToGA.newDisplayDiv = document.createElement('div');
	
		// get yahoo inlink count and display it
		GM_xmlhttpRequest({
			method: 'GET',
			url: addYahooCOMInlinksToGA.urlString,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				
			addYahooCOMInlinksToGA.numberOfInlinks = responseDetails.responseText.match(/1\s+-\s+[\d,]+\s+of\s+([\d,]+)\s+for/i);
			
			if(addYahooCOMInlinksToGA.numberOfInlinks == null){
				addYahooCOMInlinksToGA.numberOfInlinks = 0;
			}
			else{
				addYahooCOMInlinksToGA.numberOfInlinks = addYahooCOMInlinksToGA.numberOfInlinks[1];	
			}
				
			addYahooCOMInlinksToGA.newDisplayDiv.innerHTML = "<div class='sparkline'>"+
								"<div>"+
								  "<div class='visualization'>"+
								  "<a title='View Yahoo.com Site Explorer Inlinks Report' target='_blank' href='"+addYahooCOMInlinksToGA.urlString+"'>"+
								"<img alt='Yahoo.com Site Explorer' src='http://erikvold.com/images/external/se-ylogo.png' border='0' /></a>"+
								  "</div>"+
								"</div>"+
								"<div>"+
								  "<div class='statistic'>"+
								"<h3>"+
								  "<a title='View Yahoo.com Site Explorer Inlinks Report' target='_blank' href='"+addYahooCOMInlinksToGA.urlString+"'>"+
								  "<span class='primary_value'>"+
								  addYahooCOMInlinksToGA.numberOfInlinks+
								  "&nbsp;</span>"+
								  "<span class='label'>&nbsp;Total&nbsp;Inlink(s)</span></a>"+//" (Yahoo.com)"+
								"</h3>"+
								  "</div>"+
								"</div>"+
							  "</div>";;
							
			
					smmDataInGA.gaPageSparkLine.appendChild( addYahooCOMInlinksToGA.newDisplayDiv );
			}
		});
	}
	catch(e){};	
}

var smmDataInGASetup = function(){
	try{		
		// get a handle on a link to the page in question
		smmDataInGA.pageURLAnchorTag = document.getElementById('ControlBar').getElementsByTagName('a')[0];
		
		if(!smmDataInGA.pageURL){
			smmDataInGA.pageURL = "";	
		}
		
		// get the page url
		if( smmDataInGA.pageURL != smmDataInGA.pageURLAnchorTag.href){
			smmDataInGA.pageURL = smmDataInGA.pageURLAnchorTag.href;
		}
		else{
			//quit
			return true;
		}
		
		// get domain name(s)
		smmDataInGA.pageLongDomain = smmDataInGA.pageURL.match(/^(https?:\/\/)?([^\/]*)[\/$]/i)[2];
		try{
			smmDataInGA.pageDomain = smmDataInGA.getDomain(smmDataInGA.pageLongDomain);
		}
		catch(e){
			smmDataInGA.pageLongDomain = "";
			smmDataInGA.pageDomain = "";
		};

		// Add listener for the event that the current page (being reported on) is changed.
		document.getElementById('DollarIndexSparkline').addEventListener( 'DOMNodeRemoved', function(){
				// resetup the metrics
				setTimeout( smmDataInGASetup, 1 );
		}, false);
		
		// get a handle on the display area (used for the display div)
		smmDataInGA.displayArea = document.getElementById('PageviewsSparkline').parentNode.parentNode.parentNode;
		
		// remove existing display div (if it exists)
		if( document.getElementById( smmDataInGA.divID ) ){
			smmDataInGA.displayArea.removeChild( document.getElementById( smmDataInGA.divID ) );
		}
		
		// create a display div
		smmDataInGA.gaPageSparkLine = document.createElement('div');
		smmDataInGA.gaPageSparkLine.id = smmDataInGA.divID;
		smmDataInGA.displayArea.appendChild( smmDataInGA.gaPageSparkLine );

		// digg
		smmDataInGA.addDiggCount();		
		
		// sphinn
		smmDataInGA.addSphinnCount();
		
		// del.icio.us
		smmDataInGA.addDeliciousCount();
		
		// StumbleUpon Reviews
		smmDataInGA.addStumbleUponReviewCount();
		
		// Reddit
		smmDataInGA.addRedditCount();
		
		// Mixx
		smmDataInGA.addMixxCount();
		
		// Yahoo Buzz
		//smmDataInGA.addYahooBuzz();
		
		// Yahoo.ca Site Explorer Inlinks
		if(false){
			smmDataInGA.addYahooCAInLinks();
		}
		
		// Yahoo.com Site Explorer Inlinks
		if(true){
			smmDataInGA.addYahooComInLinks();
		}
	}
	catch(e){};
}

smmDataInGASetup();