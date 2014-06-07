// ==UserScript==
// @name MyAnimeList.net: Simple Html Enhancements
// @author svaax@MAL
// @description ,because no one fixed it yet!
// @version 1.0.10.3
// @license GPL v3
// @updateURL https://userscripts.org/scripts/source/174853.meta.js
// @include http://myanimelist.net/manga/*
// @include http://myanimelist.net/manga.php*
// @include http://myanimelist.net/anime/*
// @include http://myanimelist.net/anime.php?id=*
// @include http://myanimelist.net/people/*
// @include http://myanimelist.net/people.php?id=*
// @include http://myanimelist.net/dbchanges.php?go=voiceactor&do=addstaffposition&id=*
// @include http://myanimelist.net/dbchanges.php?go=voiceactor&do=publishedmanga&id=*
// @include http://myanimelist.net/dbchanges.php?cid=*&t=addpicture
// @include http://myanimelist.net/character/*
// @include http://myanimelist.net/character.php?id=*
// @include http://myanimelist.net/profile/*
// @include http://myanimelist.net/profile.php?username=*
// ==/UserScript==
var url = document.URL,


// ==start/SETTINGS==
// values, unless stated otherwise, are:
// 0 - no, 1 - yes

	formatSynonyms = 0, /* format synonyms list	; not recommended, but could be used */
	formatRelatedItems = 1, /* format "related items" on manga or anime page */
	formatPeopleName = 1, /* people page*/
	
	formatDate = 1, /* format publishing/airing dates to one of the formats below */
		/* new date format in which date should appear 
		; available formats: 
		; 0 = yyyy/mm/dd 
		; 1 = dd/mm/yyyy 
		; 2 = mm/dd/yyyy
		; 3 = yyyy-mm-dd
		; 4 = dd-mm-yyyy
		; 5 = mm-dd-yyyy */
		dateFormat = 0,
		
		highlightFutureDate = 1, /* highlight date if it's in the future; could only be used if formatDate = 1 */
		removeEndYear = 1, /* remove year from end date if it's the same as in start date */
			
	/* change manga authors to appear like list - each author in one line
	; values: 
	; 0 - no
	; 1 - yes (complex)
	; 2 - yes (simple - just adds break line after each author) */
	formatMangaAuthors = 1,
	
		/* could only be used if formatMangaAuthors = 1
		; sort manga authors desc by name */
		sortMangaAuthors = 1,
		
		/* remove colon from people names (peoples page, manga authors) */
		removeColon = 1,
	
	addLimiterForPeopleJobs = 1, /* add character limit in details box when adding anime jobs so it won't get cut-off */
	addReportButtonForChars = 0, /* add report buttons */
	
	manga_manual_addition = 1, /* add manga manually by id instead of searching it */
	create_clickable_link_to_list = 1, /* creates links to each list in the stats section on user profile */


// ==end/SETTINGS==

htmlcodecache,htmlcodewrite,matchcode,newreplace;



if (url.match("/manga") || url.match("/anime"))
{
	htmlcodecache = document.getElementById('content');
	htmlcodewrite = htmlcodecache.innerHTML;

// synonyms
 	matchcode = htmlcodewrite.match(new RegExp("Alternative Titles[\u0000-\uFFFF]+Information</h2>"));
		if (matchcode != null && formatSynonyms == 1) {
			newreplace = matchcode[0].replace(/, /g, "<br>&nbsp; ");
			htmlcodewrite = htmlcodewrite.replace(matchcode, newreplace);
		} 

// authors
	matchcode = htmlcodewrite.match(new RegExp("Authors[\u0000-\uFFFF]+<span class=\"dark_text\">Serialization"));
	if (matchcode != null && formatMangaAuthors > 0)
	{
		if (formatMangaAuthors == 1)
		{
			if (matchcode[0].match("None") == null)
			{
				var authors = new Array('','',''),
				authorsnew = new Array(),
				regexp = /<a [^>]+>([\w\d,.:;'+@*! -]+)<\/a> \((?:Story &amp; Art|Story|Art)\)/g,
				match, matchauthors = [], i=0;
				
				while (match = regexp.exec(matchcode[0])) {
					matchauthors[i] = {"author" : match[1], "html" : match[0]};
					i++;
				}
					
				var matchauthorslenght = matchauthors.length;
								
				if (sortMangaAuthors == 1) matchauthors.sort(function(a,b) {
					var field = "author", reverse = 1, first = function(a) {return a.toUpperCase()}, key = function(x) {return first(x[field])};
					return a = key(a), b = key(b), [-1, 1][+!!reverse] * ((a > b) - (b > a)); });
				
				if (matchauthorslenght > 1)
				{
					for (i=0; i < matchauthorslenght; i++)
					{
						if (removeColon == 1) matchauthors[i]['html'] = matchauthors[i]['html'].replace(', ', ' ');
						var insertbreakline = (i != matchauthorslenght-1) ? '<br>' : '';
						var authorRegex = new RegExp(/<a [^>]+>[\w\d,.:;'+@*! -]+<\/a>/);
					 
						switch (matchauthors[i]['html'].match(/(Story &amp; Art|Story|Art)/)[0])
						{
							case "Story &amp; Art":
								authors[0] += '&nbsp;&nbsp;' + matchauthors[i]['html'].match(authorRegex) + '<br>';
								break;
							case "Story":
								authors[1] += '&nbsp;&nbsp;' + matchauthors[i]['html'].match(authorRegex) + '<br>';
								break;
							case "Art":
								authors[2] += '&nbsp;&nbsp;' + matchauthors[i]['html'].match(authorRegex) + '<br>';
								break;
						}
					}
					
					if (authors[0].length > 0) authorsnew[0] = "<br>&nbsp;<u>Story &amp; Art:</u><br>" + authors[0];
					if (authors[1].length > 0) authorsnew[1] = "<br>&nbsp;<u>Story:</u><br>" + authors[1];
					if (authors[2].length > 0) authorsnew[2] = "<br>&nbsp;<u>Art:</u><br>" + authors[2];
				
					htmlcodewrite = htmlcodewrite.replace(matchcode, "Authors:</span>" + authorsnew.join('') + '</div><div class="spaceit"><span class="dark_text">Serialization');
				}
				else
				{
					authors[0] = matchcode[0].replace("Authors","Author").replace(" (Story &amp; Art)",'');
					if (removeColon == 1) authors[0] = authors[0].replace(', ', ' ');
					htmlcodewrite = htmlcodewrite.replace(matchcode, authors[0]);
				}
			}
		}
		else if (formatMangaAuthors == 2)
		{
			newreplace = matchcode[0].replace(/(<a [^>]+>[\w\d,.'+ -]+<\/a> \((?:Story|Art|Story &amp; Art)\)),/g,'$1<br>');
			htmlcodewrite = htmlcodewrite.replace(matchcode, newreplace);
		}
	}
	

// related manga | anime items
	if (formatRelatedItems == 1)
	{
		var adaptation;
		
		if (url.match("/manga")) {
			matchcode = htmlcodecache.innerHTML.match(new RegExp("Related Manga</h2>[\u0000-\uFFFF]+Characters</h2>"));	
			adaptation = "Anime adaptation";
		}
		else if (url.match("/anime")) {
			matchcode = htmlcodecache.innerHTML.match(new RegExp("Related Anime</h2>[\u0000-\uFFFF]+Characters &amp; Voice Actors</h2>"));
			adaptation = "Manga adaptation";
		}

			if (matchcode != null) {
				newreplace = matchcode[0].replace(/a>, <a/g, "a><br><a").replace(/<\/h2>([\w: -]+) <a/, "</h2>$1<br><a").replace(/<br>([\w: -]+) <a/g,"<br><br>$1<br><a").replace(/<a /g, "&nbsp;&nbsp;<a ").replace(/Adaptation/, adaptation);
				htmlcodewrite = htmlcodewrite.replace(matchcode[0], newreplace);
			}
	}

// format dates
	if (formatDate == 1) 
	{
		if (url.match("/manga")) matchcode = htmlcodewrite.match(new RegExp("Published[\u0000-\uFFFF]+<span class=\"dark_text\">Genres"));
		else if (url.match("/anime")) matchcode = htmlcodewrite.match(new RegExp("Aired[\u0000-\uFFFF]+<span class=\"dark_text\">Producers"));
		
		if (matchcode != null && !matchcode[0].match("Not available"))
		{
			newreplace = matchcode[0].replace('to', '-').replace(/([\w]{3})  ([0-9]{1,2}), ([0-9]{4})/g, '$3/$1/$2').replace(/([\w]{3}) ([0-9]{4})/g, '$2/$1/ ').replace(/([0-9]{1,2}), ([0-9]{4})/g, '$2/ /$1');

			var matchmonths = newreplace.match(/\/[\w]{3}\//g);
			var months = {'Jan':1,'Feb':2,'Mar':3,'Apr':4,'May':5,'Jun':6,'Jul':7,'Aug':8,'Sep':9,'Oct':10,'Nov':11,'Dec':12};

			if (matchmonths != null) {
				for (var n in matchmonths) {
					var matchedmonth = matchmonths[n].replace(/\//g,'');
					newreplace = newreplace.replace(matchedmonth, months[matchedmonth]);
			}}
			
			// do other things
			var match_dates = newreplace.match(/[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}/g);
			if (match_dates == null) var match_dates = newreplace.match(/[0-9]{4}\/[0-9]{1,2}\//g);
			if (match_dates == null) var match_dates = newreplace.match(/[0-9]{4}/g);
			
			if (match_dates != null)
			{
				var split_date, year, month, day, current_year, current_month, current_day, new_date;
				
				for (var n in match_dates)
				{
					split_date = match_dates[n].split('/');
					if (split_date[1] == undefined) split_date[1] = 0;
					if (split_date[2] == undefined) split_date[2] = 0;

					// check if date is in the future
					if (highlightFutureDate == 1)
					{
						// gets current date ?
						var d = new Date().getTime();
						var c = new Date(d+9*60*60*1000);
						current_year = c.getUTCFullYear();
						current_month = c.getUTCMonth()+1;
						current_month = new String(current_month).length == 1 ? '0' + current_month : current_month;
						current_day = c.getUTCDate();
						current_day = new String(current_day).length == 1 ? '0' + current_day : current_day;
						current_date = current_year + current_month + current_day;

						// matched date
						year = split_date[0];
						month = split_date[1].length == 1 ? '0' + split_date[1] : split_date[1];
						day = split_date[2].length == 1 ? '0' + split_date[2] : split_date[2];
						date_to_compare = year + month + day;
						
						// if date is in the future add styling to that date
						if (date_to_compare > current_date)
						{
							new_date = '<span style="color:red;">' + match_dates[n] + '</span>';
							newreplace = newreplace.replace(match_dates[n], new_date);
						}
						else if (date_to_compare == current_date)
						{
							new_date = '<span style="font-style: italic;">' + match_dates[n] + '</span>';
							newreplace = newreplace.replace(match_dates[n], new_date);
						}
					}
				
					// change date format
					if (dateFormat > 0)
					{
						var delimiter = (dateFormat > 2) ? '-' : '/';
						var dateFormats = {1 : [split_date[2], split_date[1], split_date[0]], // mm/dd/yyyy
								2: [split_date[1], split_date[2], split_date[0]], // dd/mm/yyyy
								3: [split_date[0], split_date[1], split_date[2]] // yyyy/mm/dd
							};
								
						newreplace = newreplace.replace(match_dates[n], dateFormats[([0,1,2,3,1,2,3][dateFormat])].join(delimiter));
					}
				}
				
				// remove end date year if it matches start date year
				if (match_dates.length == 2 && removeEndYear == 1)
				{
					var matchyears = newreplace.match(/[0-9]{4}/g);
					if (matchyears != null && (matchyears[0] == matchyears[1]))
					{
						var n = newreplace.lastIndexOf(matchyears[0]);
						newreplace = newreplace.substring(0, n) + newreplace.substring(n+4, newreplace.length);
					}
				}
			}
			
			htmlcodewrite = htmlcodewrite.replace(matchcode[0], newreplace);
		}
		
		// other dates: "just added" page
		else if (url.match(/[oacsd%5BD]+=[09ad]/g) != null)
		{
			var otherdates = htmlcodewrite.match(/(\?|[\d]{2})\-(\?|[\d]{2})\-(\?|[\d]{2})/g);
			for(var i = 0; i < otherdates.length; i++)	
			{
			   splitdate = otherdates[i].split('-');
			   htmlcodewrite = htmlcodewrite.replace(otherdates[i], splitdate[2] +'/'+ splitdate[0] +'/'+ splitdate[1])
			}
		
		}
	}
		
	htmlcodecache.innerHTML = htmlcodewrite;
}
    
// people.php
else if (url.match("/people") != null)
{
	// merge given and family name in one line
	htmlcodecache = document.getElementsByTagName('table')[0];
	
	if (formatPeopleName == 1) {
		var matchcode = htmlcodecache.innerHTML.match("<div class=\"spaceit_pad\"><span class=\"dark_text\">Given name:[\u0000-\uFFFF]+Birthday:</span>");

		if (matchcode != null) {
			var newcode = matchcode[0].replace(/<div class="spaceit_pad"><span class="dark_text">Given name:<\/span> ([^>]+|)<\/div>[\n\t ]+<span class="dark_text">Family name:<\/span> ([^>]+|)<div/, "<div class=\"spaceit_pad\" style=\"font-size: 22px; text-align: center;\">$2 $1</div><div")
			htmlcodecache.innerHTML = htmlcodecache.innerHTML.replace(matchcode, newcode);
		}
	}
	
	// create twitter/facebook/pixiv /yfrog/ tumblr link
	htmlcodecache = document.getElementsByClassName('borderClass')[0];
	htmlcodecache.innerHTML = htmlcodecache.innerHTML.replace(/Twitter: (@|)([^\s<]+)/ig, 'Twitter: $1<a href="https://twitter.com/$2" target="_blank">$2</a>').replace(/Facebook: @([^\s<]+)/i, 'Facebook: @<a href="https://www.facebook.com/$1" target="_blank">$1</a>').replace(/Facebook: #([0-9]+)/i, 'Facebook: #<a href="https://www.facebook.com/profile.php?id=$1" target="_blank">$1</a>').replace(/(?:pixiv([0-9])|pixiv id|pixiv): (?:#|)([0-9^\s]+)/ig,'pixiv$1: #<a href="http://www.pixiv.net/member.php?id=$2" target="_blank">$2</a>').replace(/Yfrog: (@|)([^\s<]+)/ig, 'Yfrog: $1<a href="http://twitter.yfrog.com/user/$2/profile" target="_blank">$2</a>').replace(/tumblr: (@|)([^\s<]+)/ig, 'tumblr: $1<a href="http://$2.tumblr.com/" target="_blank">$2</a>').replace(/Youtube: (?:@|)([^\s<]+)/i, 'Youtube: @<a href="http://www.youtube.com/user/$1" target="_blank">$1</a>').replace(/Nicovideo: mylist\/([[0-9^\s]+)/i, 'Nicovideo: <a href="http://www.nicovideo.jp/mylist/$1" target="_blank">mylist/$1</a>').replace(/Deviantart: (?:@|)([^\s<]+)/i, 'Deviantart: @<a href="http://$1.deviantart.com/" target="_blank">$1</a>');
	
	// remove colon in name
	if (removeColon == 1) $('#contentWrapper h1')[0].innerHTML = $('#contentWrapper h1')[0].innerHTML.replace(',','');
	
}

// anime jobs addition
else if (url.match('go=voiceactor&do=addstaffposition') && addLimiterForPeopleJobs == 1)
{
	// add character limit in details field
    $("#workedOn").bind("DOMSubtreeModified", function()
	{
        var lastelement = this.lastChild;
		var replace = lastelement.innerHTML.replace('size="6"', 'size="25" maxlength="50"');
		lastelement.innerHTML = replace;
		
    },false);

}

// report main character pic
else if (url.match('/character') && addReportButtonForChars == 1)
{
	htmlcodecache = document.getElementsByTagName('table')[0].getElementsByTagName('div')[0];
	matchcode = htmlcodecache.innerHTML.match(/characters\/[0-9]+\/([0-9]+)\.jpg/)[1];

	if (document.getElementsByClassName('delete_picture').length > 0) {
		var text = '<a href="http://myanimelist.net/modules.php?go=report&amp;type=charpic&amp;id='+matchcode+'">Report</a>-';
		document.getElementsByClassName('delete_picture')[0].innerHTML = text + document.getElementsByClassName('delete_picture')[0].innerHTML;
	} else {
		var text = '<div class="delete_picture" style="margin-top: 4px; text-align: center;"><a href="http://myanimelist.net/modules.php?go=report&amp;type=charpic&amp;id='+matchcode+'">Report</a></div>';
		htmlcodecache.innerHTML += text;
	}
}

//character picture submission
else if (url.match('t=addpicture'))
{
	htmlcodecache = document.getElementsByClassName('goodresult')[0];
	var firstlink = htmlcodecache.getElementsByTagName('a')[0];
	firstlink.innerHTML = "Back to Profile";
	var newlink = '<br /><br />' + firstlink.outerHTML + ' - <a href="' + firstlink + '/pictures">Back to Pictures</a>';
	htmlcodecache.innerHTML = htmlcodecache.innerHTML.replace(firstlink.outerHTML, newlink)
}


// fix report recomendations link
else if (url.match('/recommendations'))
{
 	var report = $('.lightLink:contains(report)');
	
	for(var i=1; i < report.length; i++)
	{
		var match = report[i].href.match(/\?go=report(anime|manga)recommendation&id=([0-9]+)/);
		report[i].href = '/dbchanges.php'+match[0];
		i++;
	}

}


// add manga manually by id instead of searching title first
else if (url.match('go=voiceactor&do=publishedmanga&id=') != null && manga_manual_addition == 1)
{
	document.getElementById("publishedManga").outerHTML += '<br /><div id="publishedManga2"><a id="addManualBox" href="javascript:void(0);">Add manually by id (+1)</a> </div><small style="padding-left:10px">*Don\'t ever leave empty fields! It won\'t be submitted properly.</small><br />';
	
	var counter = 1,
	publishedMangaDiv = document.getElementById("publishedManga2");
	
	document.getElementById('addManualBox').addEventListener('click', function()
	{
		var newDiv1 = document.createElement('div');
			newDiv1.className = 'spaceit';
			newDiv1.id = 'mm' + counter;
		newDiv1.innerHTML = '<input type="text" size="10" class="inputtext" name="manga_id[]">&nbsp;<select name="jtype[]" class="inputtext"><option value="sa" selected="selected">Story and Art</option><option value="s">Story</option><option value="a">Art</option></select>  <a onclick="removeDiv(\'m'+counter+'\')" href="javascript:void(0);">Remove</a>';

		publishedMangaDiv.appendChild(newDiv1);
		counter++;
		delete newDiv1;
	}, false);
	
}


// create links to lists in Anime/Manga stats section on the profile page
else if (url.match(/\/profile\/[^\/]+\//) == null && url.match('profile') != null && create_clickable_link_to_list == 1) {
	
	var list = {'Watching' : 1, 'Reading' : 1, 'Completed' : 2, 'On Hold' : 3, 'Dropped' : 4, 'Plan to Watch' : 6, 'Plan to Read' : 6, 'Total Entries': 7};
	var listType = {0 : 'animelist', 1: 'mangalist'};
    var username = url.match('username') == null ? url.match(/\/profile\/([^]+)/)[1] : url.match(/username=([^]+)/)[1];
	
	htmlcodecache = document.getElementById("content").getElementsByTagName('table')[0].children[0].children[0].children[1].children[1].children[2].getElementsByTagName("table");
    for (var i = 0; i < 2; i++) {
		htmlcodewrite = htmlcodecache[i].innerHTML;
		for (var x in list) {
			htmlcodewrite = htmlcodewrite.replace('<span class="lightLink">' + x + '</span>', '<a href="http://myanimelist.net/' + listType[i] + '/' + username + '&status=' + list[x] + '&order=0">' + x + '</a>')
		}
		htmlcodecache[i].innerHTML = htmlcodewrite;
	}
}
