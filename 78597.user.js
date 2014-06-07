// ==UserScript==
// @name           eIgnore
// @namespace      eignore
// @description    A simple eRepublik comment ignore script for easier article reading
// @include        http://www.erepublik.com/*/article/*
// @include        http://www.erepublik.com/*/badges
// @include        http://www.erepublik.com/*
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @author		   mobster1930
// ==/UserScript==

// Gets a string between a prefix and a suffix string (minified function)
String.prototype.between=function(prefix,suffix){s=this;var i=s.indexOf(prefix);if(i>=0){s=s.substring(i+prefix.length);}else{return'';}if(suffix){i=s.indexOf(suffix);if(i>=0){s=s.substring(0,i);} else{return'';}}return s;}

// The list of trolls we're ignoring
var trollstring = GM_getValue("trolls", "");
if(trollstring == -1) GM_setValue("trolls", "");
var trolls = trollstring.split("|");

// If we are on the tools page, add settings then
if(document.location.href.search("http://www.erepublik.com/.*/badges") != -1)
{
	var settings = '<div class=bordersep><div class=badgeholder><img alt="by mobster1930" src="http://mafioso.nihplod.com/erepublik/eignore/eignore.png"></div><div class=codeholder><p class=padded><strong>Ignore list:&nbsp;</strong>';
	for(i = 0; i < trolls.length; i++)
	{
		if(trolls[i] != "")
		{
			settings = settings + trolls[i] + ' <a id="deleteIgnore" href="http://www.eignore.com/delete/' + trolls[i] + '/">X</a>, ';
		}
	}
	settings = settings + '</p><p class=padded><strong>Add someone:</strong><form><input id="ignoreguy" value="" class=field>&nbsp;<input id="ignorebtn" type=submit value="Ignore"></form></p></div></div>';
	
	$(settings).insertAfter('.tabs');
	
	var button = document.getElementById("ignorebtn");
	button.addEventListener('click', ignoreSomeone, false);	
}

// Incase we are on some article page ...
if(document.location.href.search("http://www.erepublik.com/.*/article") != -1)
{
	// Loop through all comments in the article
	var allDivs, thisDiv;
	allDivs = document.evaluate("//div[@class='articlecomments']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		
		// Now check for a match with the ignored trolls and delete the comment if the match is found
		for(var b = 0; b < trolls.length; b++)
		{
			if(thisDiv.innerHTML.between('<a title="', '" href="/en/citizen/profile/') == trolls[b])
			{
				thisDiv.style.display = 'none';
			}
		}
		// do something with thisDiv
	}
}

// Incase we are at the homepage, delete troll articles
if(document.body.innerHTML.match("var news_component =") != null)
{			
	populateTopRated();
}

// Incase we're reading More news
if(document.location.href.search("http://www.erepublik.com/.*/news/.*/1/\d*") != -1)
{
	// Loop through all articles on the page
	var allDivs, thisDiv;
	allDivs = document.evaluate("//div[@class='holder bordersep']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < allDivs.snapshotLength; i++) 
	{
		thisDiv = allDivs.snapshotItem(i);
		
		var part_url = thisDiv.innerHTML.between('<a class="dotted" href="/en/newspaper/', '">');
		checkArticle(thisDiv, part_url);	
	}
}

function checkArticle(divToHide, part_url)
{
	GM_xmlhttpRequest({
			method: 'GET',
			url: "http://www.erepublik.com/en/newspaper/" + part_url,
			onload: function (article) {		
				// <a class="smalldotted" href="/en/citizen/profile/1338609">Brdar Dragan</a>
				var match1 = article.responseText.between('<a class="smalldotted" href="/en/citizen/profile/', '/a>')
				// 1338609">Brdar Dragan<
				var match2 = match1.between('">', '<');
										
				// Now check for a match with the ignored trolls and delete the article if a match is found
				for(var i = 0; i < trolls.length; i++)
				{						
					if(match2 == trolls[i])
					{			
						divToHide.style.display = 'none';
					}
				}
			}
		});	
}

function populateTopRated()
{
	var sReq = "http://www.erepublik.com/en/homepage_ajax/articles/friend/national/top_rated/0";
	GM_xmlhttpRequest({
		method: 'GET',
		url: sReq,
		onload: function (json) {		
			eval("rawJsonObj = " + json.responseText);
			prePopulateArticles(rawJsonObj);
		}
	});
}

function populateLatest()
{
	var sReq = "http://www.erepublik.com/en/homepage_ajax/articles/friend/national/latest/0";
	GM_xmlhttpRequest({
		method: 'GET',
		url: sReq,
		onload: function (json) {		
			eval("rawJsonObj = " + json.responseText);
			prePopulateArticles(rawJsonObj);
		}
	});
}

function populateInternational()
{
	var sReq = "http://www.erepublik.com/en/homepage_ajax/articles/friend/national/international/0";
	GM_xmlhttpRequest({
		method: 'GET',
		url: sReq,
		onload: function (json) {		
			eval("rawJsonObj = " + json.responseText);
			prePopulateArticles(rawJsonObj);
		}
	});
}

function prePopulateArticles(data) 
{
	var has_modified = '';
	var shouts = '';
	var shout_attr = '';
	var articles = '';
	var events = '';
	if (data['json_object1']) 
	{
		shouts_attr = data['json_object3']['shout_attributes'];
		shouts = data['json_object3']['shouts'];
		articles = data['json_object1']['articles'];
		events = data['json_object2']['events'];
		has_modified = 'all';
	} else 
	{
		has_modified = data['modified'];
		shouts_attr = data['shout_attributes'];
		shouts = data['shouts'];
		articles = data['articles'];
		events = data['events'];
	}
	if (has_modified === 'all' || has_modified === 'articles') 
	{
		populateArticles(articles);
	}
}
	

// Adds someone to the ignore list
function ignoreSomeone()
{	
	if(trollstring == "")
	{
		GM_setValue("trolls", $("#ignoreguy").val());
	}
	else
	{
		GM_setValue("trolls", trollstring + "|" + $("#ignoreguy").val());
	}	
}

// Takes care if user clicks on Top / Latest / International and if he wants to delete someone
document.addEventListener('click', function(event) {
	//alert("Event: " + event + " || " + event.target + " || " + event.target.innerHTML);
	if(event.target.innerHTML == "Top")
	{
		event.stopPropagation();
    	event.preventDefault();
		populateTopRated();
		
		// Fix the hover
		document.getElementById("latesttab").children[0].setAttribute("class", "");
		document.getElementById("topratedtab").children[0].setAttribute("class", "on");
		document.getElementById("internationaltab").children[0].setAttribute("class", "");
	}
	else if(event.target.innerHTML == "Latest")
	{
		event.stopPropagation();
    	event.preventDefault();
		populateLatest();
		
		// Fix the hover
		document.getElementById("latesttab").children[0].setAttribute("class", "on");
		document.getElementById("topratedtab").children[0].setAttribute("class", "");
		document.getElementById("internationaltab").children[0].setAttribute("class", "");
	}
	else if(event.target.innerHTML == "International")
	{
		event.stopPropagation();
    	event.preventDefault();
		populateInternational();
		
		// Fix the hover
		document.getElementById("latesttab").children[0].setAttribute("class", "");
		document.getElementById("topratedtab").children[0].setAttribute("class", "");
		document.getElementById("internationaltab").children[0].setAttribute("class", "on");
	}
	
	var url = event.target.href.toString();	
	if(url.search("http://www.eignore.com/delete/") == 0)
	{		
		var troll = unescape(url.between("http://www.eignore.com/delete/", "/"));	
		var newtrollstring = trollstring.replace(troll, "");
		GM_setValue("trolls", newtrollstring);
		event.stopPropagation();
    	event.preventDefault();
		alert('Succesfully deleted ' + troll + ' from the ignore list!');
		location.reload(true);
	}
}, true);

// Ripped straight from eRepublik
function populateArticles(data) {
	if (data) {
		$("#article_ajax").children('.art_elem').remove();
		$.each(data, function(idx, n){
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://www.erepublik.com" + n['url'],
				onload: function (article) {		
					// <a class="smalldotted" href="/en/citizen/profile/1338609">Brdar Dragan</a>
					var match1 = article.responseText.between('<a class="smalldotted" href="/en/citizen/profile/', '/a>')
					// 1338609">Brdar Dragan<
					var match2 = match1.between('">', '<');
					
					var print = 1;
						
					// Now check for a match with the ignored trolls and delete the article if a match is found
					for(var i = 0; i < trolls.length; i++)
					{						
						if(match2 == trolls[i])
						{			
							print = 0;
						}
					}
					
					if(print == 1)
					{
						var object = $("#art_item div.item").clone().insertBefore("#top_rated_more_link").get(0);
						var link = $(object).children('.holder').children('p').children('a').get(0);
						var c_at = $(object).children('.holder').children('p').get(1);
						$(object).children('.rankholder').children('span').html(''+n['votes']+'');
						$(link).attr('href', n['url']);
						$(link).html(n['text']);
						$(c_at).html(n['date']);
					}
				}
			});
		});
		$("#article_ajax").slideDown();
	}
}