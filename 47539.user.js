// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TheGft2Imdb", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TheGft2Imdb
// @description   Fetches movie info from imdb for the browse page.
// @include       *thegft.org/browse.php*
// ==/UserScript==

tags			=	document.getElementsByTagName("a");



for(var i = 0;i < tags.length;i++)
{
	var title			=	tags[i].title.toLowerCase();
	if(title.indexOf("xvid") != -1 || title.indexOf("dvdrip") != -1 || title.indexOf(".ts.") != -1 || title.indexOf("x264") != -1 || title.indexOf("bd5") != -1 || title.indexOf("dvdr") != -1){
		tags[i].addEventListener("mouseover",function(event){
			var rlsName						=	this.title;
			this.title						=	"";
			var myAnchor					=	this;
			var outerDiv					=	document.createElement("div");
			outerDiv.id						=	"IMDB_DIV";
			document.body.insertBefore(outerDiv, document.body.firstChild);
			document.getElementById("IMDB_DIV").innerHTML		=	'<img src="http://hp-consumer.my.aol.se/gd/pictureOfTheDay/loading.gif" style="margin: 0 auto; width: 200px; margin-left: 75px;">';

			if(document.getElementById("ADDED_STYLE"))
			{
				document.getElementsByTagName("head")[0].removeChild(document.getElementById("ADDED_STYLE"))
			}



			window.addGlobalStyle(
			"#IMDB_DIV {\n " + 
			"position: absolute;\n" + 
			"width: 370px;\n" +
			"padding: 5px\n" +  
			"min-height: 250px;\n" + 
			"left: " + (event.pageX + 20) + "px;\n" + 
			"top: " + (event.pageY - 10) + "px;\n" + 
			"float: left;\n" + 
			"background: #ffffff;\n" + 
			"border: 1px solid #000000;\n" + 
			"}\n\n" + 
			"#IMDB_POSTER {\n" +
			"width: 120px;\n" + 
			"height: 150px;\n" + 			
			"border: none;\n" + 
			"float: left;\n" + 
			"}\n\n");
			
			GM_log("Sending THEGFT request");
			GM_xmlhttpRequest({
				'method': 'GET',
				'url': myAnchor.href,
				onload: function (responseData)
				{

					var imdbId					=	responseData.responseText.match(/\/title\/tt(.*?)\//i);
					
					if(imdbId)
					{
						GM_log("Sending IMDB request");
						GM_xmlhttpRequest({
						'method': 'GET',
						'url': 'http://www.imdb.com' + imdbId[0] + '',
						onload: function(responseData)
						{
								GM_log("Completed");
								var poster					=	window.getImdbLargePoster(responseData.responseText);
								var plot					=	window.getImdbPlot(responseData.responseText);
								var title					=	window.getImdbTitle(responseData.responseText);
								var genres					=	window.getImdbGenres(responseData.responseText);
								var ratings					=	window.getImdbRatings(responseData.responseText);
								var officialRlsDate			=	window.getImdbRlsDate(responseData.responseText);
								var html					=	'<div style="width: 100%; text-align: center;">';
								html						+=	'<h2>' + title + '</h2>';
								html						+=	rlsName + "</div><br />";
								html						+=	'<div style="width: 120px; height: 150px; float: left;">';
								html						+=	'<img width="150px" height="200px" src="'+poster+'" id="IMDB_POSTER" /></div>';
								html						+=	"<div style='width: 229px; float: right;margin-right: 10px;'>";								
								if(plot)								
								html						+=	plot + "<br /><br />";
								if(genres)								
								html						+=	"Genres: " + genres + "<br />";
								if(ratings)								
								html						+=	"Ratings: " + ratings + "<br />";
								if(officialRlsDate)
								html						+=	"Release Date: <b>" + officialRlsDate + "</b><br />";
								html						+=	"</div>";
								document.getElementById("IMDB_DIV").
								innerHTML					=	html;
								myAnchor.title				=	rlsName;
							}
						});
					}
					else
					{
						myAnchor.title				=	rlsName;
						document.getElementById("IMDB_DIV").innerHTML					=	"<h2> Could not find an imdb info page for " + rlsName + "</h2>";
					}
				}
			});
		},1);
	
	tags[i].addEventListener("mouseout",function(event){ document.getElementsByTagName("body")[0].removeChild(document.getElementById("IMDB_DIV")) }, 0);
	}
}








window.getImdbLargePoster = function (data) 
{
	var poster		=	data.match(/<a name="poster".*?src="(.*?)"/);
	
	if(poster && poster.length < 200)
	return poster[1];
	else
	return false;
}

window.getImdbPlot = function (data) 
{
	var plot		=	data.match(/<h5>Plot:<\/h5>\s(.*?)</);
	
	if(plot && plot.length < 1000)
	return plot[1];
	else
	return false;
}
window.getImdbTitle = function (data)
{
	var start		=	data.indexOf("<title>") + 7;
	var end			=	data.indexOf("</title>", start) - start;
	return "<b>" + data.substr(start, end) + "</b>";
}
window.getImdbGenres = function (data) 
{
	var genres		=	data.match(/\/Sections\/Genres\/(.*?)\//);
	if(genres)
	return "<b>" + genres[1] + "</b>";
	else
	return false;
}
window.getImdbRatings = function (data)
{
	var start		=	data.indexOf('<div class="meta">') + 18;
	var end			=	data.indexOf('</b>', start) - start;
	var ratings		=	data.substr(start, end);

	if(ratings && ratings.length < 20)
	return ratings + "</b>";
	else
	return false;
}

window.addGlobalStyle =	function (css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }    
	style = document.createElement('style');
    style.type = 'text/css';
	style.id = 'ADDED_STYLE';
    style.innerHTML = css;
    head.appendChild(style);
}

window.getImdbRlsDate = function (data)
{
	var start			=	data.indexOf("<h5>Release Date:</h5>") + 24;
	var end				=	data.indexOf("\n", start) - start;
	var releaseTime		=	data.substr(start, end);	

	if(releaseTime && releaseTime.length < 80)
	return releaseTime;
}