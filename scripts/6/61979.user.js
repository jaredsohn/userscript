// ==UserScript==
// @name          Power Fanfiction.net / Fictionpress.com
// @author        Utimer
// @version       1.5.12
// @description   Enhances fanfiction.net and fictionpress.com. 
// @namespace     http://userscripts.org/scripts/show/61979
// @include       http://*.fanfiction.net/*
// @include       http://*.fictionpress.com/*
// @updateURL     http://userscripts.org/scripts/source/61979.meta.js
// @history       1.5.12 Fixed the script to work on the new FF.net layout...  again.
// @history       1.5.11 Minor update to fix the script to work better in chrome
// @history       1.5.10 Minor fixes so it works on the new ff.net layout and added fictionpress.com to supported sites
// @history       1.5.9 Actually use the build-in updater.
// @history       1.5.8 Fixed the list view
// @history       1.5.7 Fixed autoload (again)
// @history       1.5.6 Fixed autoload again, as well as the menu hiding code
// @history       1.5.5 They seem to breaking stuff daily ... partly fixed it
// @history       1.5.4 Fixed it again. But will remove author images and lines between stories.
// @history       1.5.3 Fixed it for for the new Fanfiction.net page
// @history       1.5.2 Fixed it for now - Remember to switch to the new "Fanfiction Tools", which will be actually updated!
// @history       1.5.1 Added the option to disable relative dates (shouldRelativeDate=false)
// @history       1.5 Also works on the favorite stories tab now
// @history       1.4 Autoload now works again
// @history       1.3.1 Fixed a minor bug that could cause the script to load the wrong page
// @history       1.3 Update code to work with new FF.net mark-up
// @history       1.2 Added auto-closing menu (can be disabled with shouldAutoClose=false)
// @history       1.1 List will now auto load as well
// @history       1.0.2 Made the userscript more compatible with non-Firefox browsers
// @history       1.0.1 Improved preformance when using fullStoryLoad and added an automatic update checker.
// @history       1.0 First version.
// ==/UserScript==


/* Settings */

// Color the dates. [true/false]
var colorDate =  true;
// Add a unique color to completed stories [true/false]
var colorComplete =  true;
// Count words in a chapter [true/false] (Not used during autoloading)
var enableWordCount = true;
// Format of the date [0/1] 0:US date format, 1:UK date format
var dateFormat = 1; 
// Order of the date [0/1] 0: Published-Updated, 1: Updated-Published
var dateOrder = 1;
// Seperator of the dates ( '-' would result in 1-2-2000)
var sep =  '-';
// Combine the review link with the review count [true/false]
var combineReview = true;
// Load the entire story when opening a story [true/false]
var fullStoryLoad =  false;
// Load the next chapter as you read [true/false]. Ignored when fullStoryLoad = true.
var loadAsYouGo = true;
// Words that are marked in the story summary
var markWords = ['slash', 'M/M', 'MPREG'];
// use relative dates [true/false]
var shouldRelativeDate = true;

/* end settings */

if (typeof(xmlhttpRequest) == "undefined")
{
	xmlhttpRequest = function (configObj)
	{
		var req = new XMLHttpRequest();
		req.open(configObj.method, configObj.url, true);
		req.onreadystatechange = function (aEvt) {
		  if (req.readyState == 4) {
			configObj.onload(req);
		  }
		};
		req.send(null);
	}
}

var elms = document.getElementsByClassName("z-list"),done = false,currentChapter = -1,totalChapter = -1,ajaxActivity = false,loading,highestHash=-1,lastSepTop = 0,
	chapterselect,fullLoader=-1,nextLink='', lastList = null;

makeLoadingBar();

if (unsafeWindow)
{
	var $ = unsafeWindow.jQuery;
}
$('.z-indent').removeClass('z-indent');
$('.cimage').remove();
$('.z-list').css({border: 'none', 'minHeight':0});

for (var i=0;i<elms.length;i++)
{
	doList(elms[i]);
	lastList = elms[i];
	done = true;
}

unsafeWindow.storylist_render = function(story_array, startrow, show_cat, show_author) {
    var buffer = new Array();
    var story;
    for (i = story_array.length, c = startrow; i > 0; i--, c++) {
        story = story_array[i - 1];
        buffer[buffer.length] = c + ". <a  href='/s/" + story.storyid + "/1/" + story.stitleu + "'>";
        buffer[buffer.length] = story.stitle + "</a> ";
        if (story.chapters > 1) {
            buffer[buffer.length] = " <a  style='text-decoration:none;' href='/s/" + story.storyid + "/" + story.chapters + "/" + story.stitleu + "'>Â»</a> ";
        }
        if (show_author == 1) buffer[buffer.length] = "by <a href='/u/" + story.userid + "/" + story.pennameu + "'>" + story.penname + "</a> ";
		
		var sum = story.summary;
		for (var j=0;j<markWords.length;j++)
		{
			var exact = sum.match(new RegExp(markWords[j], "ig"));
			if (exact)
				sum = sum.replace(exact[0], "<span style=\"color: red;\">"+exact[0]+"</span>");
		}
		
        buffer[buffer.length] = "<blockquote>" + sum + "<br><span class='gray' style='font-size=11px'>";
        if (show_cat == 1) {
            if (story.crossover > 0) {
                buffer[buffer.length] = "Crossover - " + story.category + " - ";
            }
            else {
                buffer[buffer.length] = story.category + " - ";
            }
        }
        buffer[buffer.length] = unsafeWindow.array_censors[story.censorid] + " - ";
        buffer[buffer.length] = unsafeWindow.array_languages[story.languageid] + " - ";
        if (story.genreid > 0) {
            buffer[buffer.length] = unsafeWindow.array_genres[story.genreid];
            if (story.subgenreid > 0) {
                buffer[buffer.length] = "/" + unsafeWindow.array_genres[story.subgenreid];
            }
        }
        else if (story.subgenreid > 0) {
            buffer[buffer.length] = unsafeWindow.array_genres[story.subgenreid] + " - ";
        }
        buffer[buffer.length] = " - Size: <abbr title=\"Average: "+addCommas(Math.round(story.wordcount/story.chapters))+"\">" + story.chapters + "/" + addCommas(story.wordcount) + "</abbr> - <a href='/r/" + story.storyid + "/'><span style=\"color: gray;border-bottom: 1px dotted;\">Reviews: " + addCommas(story.ratingtimes) + "</span></a>";
		
		var today = new Date();
		// Change the published date format to match the update date format.
		p = story.datesubmittext.match("([0-9]{1,2})-([0-9]{1,2})-([0-9]{2})");
		if (p)
		{
			var published = '';
			if (dateFormat == 0) {
				published = p[1]+sep+p[2]+sep+((p[3] < 50)?'20':'19')+p[3]; // US date format
			} else {
				published = p[2]+sep+p[1]+sep+((p[3] < 50)?'20':'19')+p[3]; // UK date format
			}
			var date = new Date(((p[3] < 50)?'20':'19')+p[3], (p[1]-1),p[2],today.getHours(),today.getMinutes(),today.getSeconds());
		}
		
		u = story.dateupdatetext.match("([0-9]{1,2})-([0-9]{1,2})-([0-9]{2})");
	
		var datestring = '';
		if (dateFormat == 0) {
			datestring = u[1]+sep+u[2]+sep+((u[3]<50)?'20':'19')+u[3]; // US date format
		} else {
			datestring = u[2]+sep+u[1]+sep+((u[3]<50)?'20':'19')+u[3]; // UK date format
		}
		var date = new Date(((u[3]<50)?'20':'19')+u[3], (u[1]-1),u[2],today.getHours(),today.getMinutes(),today.getSeconds());
			

		var diff = 0, updated = '';

		diff = Math.round((today - date)/(1000*60*60*24)); // number of days since update

		var color = '';
		if (colorDate == true) {
			switch (true) {
				case (diff < 14): color = "#00A000"; break;   // Green
				case (diff < 31): color = "#0000CD"; break;   // Blue
				case (diff < 90): color = "#800080"; break;   // Purple
				case (diff < 180): color = "#FF8C00"; break;  // Orange
				case (diff >= 180): color = "#FF0000"; break; // Red
			}
		}
		
		if (shouldRelativeDate)
		{
			if (diff == 0) {
				updated = "Today";
			} else if (diff == 1) {
				updated = "Yesterday";
			} else {
				var resultArray=new Array();
				var years = Math.floor(diff / 365);
				var weeks = Math.floor((diff % 365) / 7);
				var days = Math.floor(diff % 7);
				if (years > 0) resultArray.push(years+" year"+((years>1?'s':'')));
				if (weeks > 0) resultArray.push(weeks+" week"+((weeks>1?'s':'')));
				if (days  > 0) resultArray.push(days +" day" +((days >1?'s':'')));
				updated = resultArray.join(', ');
			}
		}else{
			updated=datestring;
		}
		
		var bCompleted =(story.statusid == 2);
		var strUpdated = "";
		if (colorDate) {
			if (!(bCompleted)) {
				strUpdated = "<span style=\"color: "+color+";\"><abbr title=\""+datestring+"\">"+updated+"</abbr></span>"; // If the story is not complete, add color.
			} else {
				if (colorComplete)
					strUpdated = " <span style=\"color: #00EEEE;\"><abbr title=\""+datestring+" - "+updated+"\">Complete</abbr></span>";
				else
					strUpdated = " <span><abbr title=\""+datestring+" - "+updated+"\">Complete</abbr></span>";
			}
		}else{
			if (!(bCompleted)) {
				strUpdated = "<abbr title=\""+datestring+"\">"+updated+"</abbr>"; 
			} else {
				if (colorComplete)
					strUpdated = " <span style=\"color: #00EEEE;\"><abbr title=\""+datestring+" - "+updated+"\">Complete</abbr></span>";
				else
					strUpdated = " <abbr title=\""+datestring+" - "+updated+"\">Complete</abbr>";
			}
		}

		// Set the new date formats.
		if (dateOrder == 1) {
			buffer[buffer.length] = " - Updated: " + strUpdated + " - Published: " + published;
		} else {
			if (bCompleted)
				buffer[buffer.length] = " - Published: " + published + " - " + strUpdated;
			else
				buffer[buffer.length] = " - Published: " + published + " - Updated: " + strUpdated;
		}

		
		//buffer[buffer.length] = " - Updated: " + story.dateupdatetext + " - Published: " + story.datesubmittext;
        if (story.chars.length) 
			buffer[buffer.length] = story.chars;		
		
        //if (story.statusid == 2) buffer[buffer.length] = " - Complete";
        buffer[buffer.length] = "</span></blockquote>";
    }
    return buffer.join("");
};

if (!done)
{
	var data = document.getElementsByTagName('div');
	for (var i = 0; i < data.length; i++) {
		if (data[i].innerHTML.match("Published:")) {
			data[i].innerHTML = doWork(data[i].innerHTML, false, "");
		}
	}
}else{
	var matches = document.body.innerHTML.match('<a href=[\'"]([^"]+?)[\'"]>next.*</a>','i');
	if (matches != null)
		nextLink = matches[1].replace(/&amp;/g, '&');
	
	if (loadAsYouGo && nextLink != '')
		setInterval(testScrollPositionList,50);
}

var selects = document.getElementsByTagName('select'); 
for (var i = 0; i < selects.length; i++) {
	if (selects[i].title.toLowerCase() == 'chapter navigation'){
		if (chapterselect==null)
			chapterselect = selects[i];
		else
			if (loadAsYouGo || fullStoryLoad) // hide the bottom navigator when auto-loading (leave the buttons though)
				selects[i].style.display = 'none';
	}
}
var loc = /(.*)\/s\/(\d+)\/(\d+)\/(.*)/i.exec(document.location);
if (loc && loc[3])
	currentChapter = parseInt( loc[3] );
	
var storytext = document.getElementById('storytext');
if (storytext && chapterselect)
{
	for (var i = 0; i < chapterselect.options.length; i++) 
	{
		totalChapter = Math.max(chapterselect.options[i].value,totalChapter);
	}
	storytext.innerHTML = "<!-- start story -->"+ storytext.innerHTML + "<!-- end story -->";
	
	if (fullStoryLoad)
	{
		storytext.innerHTML = storytext.innerHTML.replace('<!-- start story -->','<!-- start story -->'+ "<span style=\"background-color:black;color:white;display:block;\" id=\"GEASEMONKEYSEPERATOR"+currentChapter+"\">"+currentChapter+"/"+totalChapter +  ": "+ filterTitle(currentChapter, getChapterTitle(currentChapter)) + "</span>");
		if (currentChapter == totalChapter)
			storytext.innerHTML = storytext.innerHTML.replace('<!-- end story -->','<!-- end story -->'+ "<span style=\"background-color:black;color:white;display:block;\">End of story</span>");
	
		fullStoryLoadStep();
	}else{
		if (getHash()!= '' && isFinite(getHash()) && parseInt(getHash()) != currentChapter) {
			document.location = getChapterLink(getHash());
			setAjaxActivity(true, ' -- JUMPING TO CHAPTER '+getHash()+" ("+getChapterTitle(getHash()) +") -- ");
		}else{
			if (loadAsYouGo && !fullStoryLoad)
				setInterval(testScrollPosition,50);
				
			storytext.innerHTML = storytext.innerHTML.replace('<!-- start story -->','<!-- start story -->'+ "<span style=\"background-color:black;color:white;display:block;\" id=\"GEASEMONKEYSEPERATOR"+currentChapter+"\">"+currentChapter+"/"+totalChapter +  ": "+ filterTitle(currentChapter, getChapterTitle(currentChapter)) + "</span>");
			if (currentChapter == totalChapter)
				storytext.innerHTML = storytext.innerHTML.replace('<!-- end story -->','<!-- end story -->'+ "<span style=\"background-color:black;color:white;display:block;\">End of story</span>");
				
			fullStoryLoadStep();
		}
	}
}

function fullStoryLoadStep()
{
	if (!fullStoryLoad)
		return;
	
	fullLoader++;
	if (fullLoader > totalChapter)
		return;
	if(chapterselect.options[fullLoader].value != currentChapter)
	{
		setAjaxActivity(true, ' -- LOADING CHAPTER '+chapterselect.options[fullLoader].value+" ("+chapterselect.options[fullLoader].text+") -- ");
		getChapter(storytext, chapterselect.options[fullLoader].value, chapterselect.options[fullLoader].text, (parseInt(chapterselect.options[fullLoader].value) < currentChapter));
	}else{
		fullStoryLoadStep();
	}
}

function getChapterTitle( chapter )
{
	for (var i = 0; i < chapterselect.options.length; i++) 
	{
		if(parseInt(chapterselect.options[i].value) == parseInt(chapter))
		{
			return chapterselect.options[i].text;
		}	
	}
}

function testScrollPosition()
{
	if ( (currentChapter<totalChapter) && (!ajaxActivity) && (document.body.offsetHeight-window.pageYOffset<1.5*window.innerHeight) )
	{
		currentChapter++;
		setAjaxActivity( true, ' -- Loading chapter '+currentChapter+'/'+totalChapter+': '+getChapterTitle(currentChapter) + ' -- ' );
		getChapter(storytext, currentChapter, getChapterTitle( currentChapter ) , false );
	}
	
	if ((window.pageYOffset+100) > lastSepTop && (window.pageYOffset-100) < lastSepTop && lastSepTop > 0 && getHash() != currentChapter && highestHash < currentChapter)
		document.location.hash = highestHash = currentChapter;
}

function testScrollPositionList()
{
	if ( (nextLink != '') && (!ajaxActivity) && (document.body.offsetHeight-window.pageYOffset<1.5*window.innerHeight) )
	{
		setAjaxActivity( true, ' -- Loading next page -- ' );
		getResultPage();
	}
	
	/*if ((window.pageYOffset+100) > lastSepTop && (window.pageYOffset-100) < lastSepTop && lastSepTop > 0 && getHash() != currentChapter && highestHash < currentChapter)
		document.location.hash = highestHash = currentChapter;*/
}

function getChapterLink( chapter )
{
	var loc = /(.*)\/s\/(\d+)\/(\d+)\/(.*)/i.exec(document.location);
	return loc[1]+'/s/'+loc[2]+'/'+ chapter +'/'+loc[4]
}

function getChapter( storyelm, chapter, chapterTitle, addBefore )
{
	xmlhttpRequest({
		method: 'GET',
		url: getChapterLink(chapter),
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		},
		onload: function(responseDetails) {
			var text = responseDetails.responseText.replace(new RegExp('<div class=\'a2a_([\\s\\S]*?)<\\/div>'),'');
			var regmatch = (new RegExp('<div.* id=\'storytext\'>([\\s\\S]*?)<\\/div>')).exec(text );
			if (regmatch == null)
			{
				setAjaxActivity( true, 'Error loading next page' );
				return;
			}
			if (regmatch[1] == '')
			{
				setAjaxActivity( true, 'Error loading next page' );
				return;
			}
			var storytext = "<span style=\"background-color:black;color:white;display:block;\" id=\"GEASEMONKEYSEPERATOR"+currentChapter+"\">"+chapter+"/"+totalChapter +  ": "+ filterTitle(currentChapter, chapterTitle) + "</span>" + regmatch[1];
			
			if (addBefore)
				storyelm.innerHTML = storyelm.innerHTML.replace('<!-- start story -->',storytext+'<!-- start story -->');
			else
				storyelm.innerHTML = storyelm.innerHTML.replace('<!-- end story -->',storytext+'<!-- end story -->');
				
			if (currentChapter == totalChapter)
				storyelm.innerHTML = storyelm.innerHTML.replace('<!-- end story -->','<!-- end story -->'+ "<span style=\"background-color:black;color:white;display:block;\">End of story</span>");
			var lastSep = document.getElementById('GEASEMONKEYSEPERATOR'+currentChapter);
			if (lastSep)
				lastSepTop = lastSep.offsetTop;
			
			setAjaxActivity( false );
			fullStoryLoadStep();
		}
	});
}

function getResultPage( )
{
	xmlhttpRequest({
		method: 'GET',
		url: nextLink,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		},
		onload: function(responseDetails) {
			var matches = responseDetails.responseText.match('<a href=[\'"]([^"]+?)[\'"]>next.*</a>','i');
			
			if (matches != null)
				nextLink = matches[1].replace(/&amp;/g, '&');
			else
				nextLink = '';
			
			matches = responseDetails.responseText.match(/<div class=['"]z-list zhover zpointer['"] style=['"]min-height:77px;border-bottom:1px #cdcdcd solid;['"]>([\s\S]*?)<\/div><\/div><\/div>/g);
			if (matches != null)
			{
				for (var i=0,j=matches.length;i<j;i++)
				{
					matchText = matches[i].match(/<div class=['"]z-list zhover zpointer['"] style=['"]min-height:77px;border-bottom:1px #cdcdcd solid;['"]>([\s\S]*?)<\/div><\/div><\/div>/);
					matchText[1]=matchText[1].replace(/\<img (.*?)\>/, '');
					matchText[1]=matchText[1].replace(/z-indent/g, '');
					var newDiv = document.createElement('div');
					newDiv.className = 'z-list';
					newDiv.innerHTML = doList( matchText[1] +" </div></div>" );
					// next bit is a bit hackish
					newDiv.addEventListener('mouseover', function(){this.className="z-list z-high"},false);
					newDiv.addEventListener('mouseout', function(){this.className="z-list"},false);
					insertAfter( newDiv , lastList );
					lastList = newDiv ;
				}
			}
			setAjaxActivity( false );
		}
	});
}

// Delete the center tag
/*var evil = document.getElementsByTagName("center");
for(var i=0;i<evil.length;i++)
	evil[i].parentNode.removeChild(evil[i]);*/
	
function doList(elm) {
	var elmText = '', reviewlink = "", matches;

	if (typeof(elm) == "object")
		elmText = elm.innerHTML;
	else
		elmText = elm;
		
	for (var i=0;i<markWords.length;i++)
	{
		var exact = elmText.match(new RegExp(markWords[i], "ig"));
		if (exact)
			elmText = elmText.replace(exact[0], "<span style=\"color: red;\">"+exact[0]+"</span>");
	}
	
	matches = elmText.match(/<a (.*)\/r\/(\d*)\/(.*)<\/a>/);
	if (matches != null)
	{
		reviewlink = "/r/"+matches[2]+"/";
		elmText=elmText.replace(/<a class="?reviews"? href=["']?\/r\/(\d*)\/["']?>(.*)<\/a>/, "<a style=\"display:none\" class=\"reviews\" href=\"/r/$1/\">$2</a>")
	}
	
	matches = elmText.match(/<div class=['"]z-padtop2 xgray['"]>(.*?)<\/div>/);
	if (matches != null)
	{
		elmText = elmText.replace(/<div class=['"]z-padtop2 xgray['"]>(.*?)<\/div>/, "<div class=\"z-padtop2 xgray\">"+doWork(matches[1], true, reviewlink)+"<\/div>");
	}
	if (typeof(elm) == "object")
		elm.innerHTML = elmText;
	return elmText;
}

function doWork(html, list, review) {
	var bCompleted = false;
	if (list) {
		if (html.match(/[ -]?Complete[ -]?/)) {
			bCompleted = true;
			html = html.replace(/[ -]{0,}Complete[ -]{0,}/, "");
		}
	}
	if (!(list) && html.match("- Status: Complete -")) {
		// If story has been completed, then show the Complete sign in green.
		bCompleted = true;
		html = html.replace("- Status: Complete -", "- ");
	}
	
	// Review with commas, always shows
	var r = html.match("Reviews: ([0-9,]{1,}) -");
	var reviewline = "";
	if (r && r[0])
		html = html.replace(r[0],"<a href=\""+review+"\"><span style=\"color: gray;border-bottom: 1px dotted;\">Reviews: "+addCommas(r[1])+"</span></a> -");
	else
		reviewline = "Reviews: 0 -"; // Doesn't work on a one-shot that is not reviewed... not sure where to anchor it...

	// Alternative Word Count
	var w = html.match("Chapters: ([0-9,]{1,}) - Words: ([0-9,]{1,}) -");
	if (w && w[0] && w[1])
	{
		var average = addCommas(Math.round(  parseFloat(w[2].replace(',','')) / parseFloat(w[1].replace(',',''))));
		var storysize = "Size: <abbr title=\"Average: "+average+"\">"+w[1] + "/" + w[2]+"</abbr> - ";
		html = html.replace(w[0],storysize+reviewline);
	}
	
	var today = new Date();
	// Change the published date format to match the update date format.
	p = html.match("Published: ([0-9]{1,2})-([0-9]{1,2})-([0-9]{2})");
	if (p)
	{
		var published = '';
		if (dateFormat == 0) {
			published = p[1]+sep+p[2]+sep+((p[3] < 50)?'20':'19')+p[3]; // US date format
		} else {
			published = p[2]+sep+p[1]+sep+((p[3] < 50)?'20':'19')+p[3]; // UK date format
		}
		var date = new Date(((p[3] < 50)?'20':'19')+p[3], (p[1]-1),p[2],today.getHours(),today.getMinutes(),today.getSeconds());
	}
	
	var bUpdated = false;
	var u = html.match("Updated: ([0-9]{1,2})-([0-9]{1,2})-([0-9]{2})");
	if (u) {
		// Only if the story has more than one chapter, it shows the Updated date value.
		bUpdated = true;
		u = html.match("Updated: ([0-9]{1,2})-([0-9]{1,2})-([0-9]{2})");
	
		var datestring = '';
		if (dateFormat == 0) {
			datestring = u[1]+sep+u[2]+sep+((u[3]<50)?'20':'19')+u[3]; // US date format
		} else {
			datestring = u[2]+sep+u[1]+sep+((u[3]<50)?'20':'19')+u[3]; // UK date format
		}
		var date = new Date(((u[3]<50)?'20':'19')+u[3], (u[1]-1),u[2],today.getHours(),today.getMinutes(),today.getSeconds());
	} else {
		datestring = published;
	}

	var diff = 0, updated = '';

	
	diff = Math.round((today - date)/(1000*60*60*24)); // number of days since update

	var color = '';
	if (colorDate == true) {
		switch (true) {
			case (diff < 14): color = "#00A000"; break;   // Green
			case (diff < 31): color = "#0000CD"; break;   // Blue
			case (diff < 90): color = "#800080"; break;   // Purple
			case (diff < 180): color = "#FF8C00"; break;  // Orange
			case (diff >= 180): color = "#FF0000"; break; // Red
		}
	}

	if (shouldRelativeDate)
	{
		if (diff == 0) {
			updated = "Today";
		} else if (diff == 1) {
			updated = "Yesterday";
		} else {
			var resultArray=new Array();
			var years = Math.floor(diff / 365);
			var weeks = Math.floor((diff % 365) / 7);
			var days = Math.floor(diff % 7);
			if (years > 0) resultArray.push(years+" year"+((years>1?'s':'')));
			if (weeks > 0) resultArray.push(weeks+" week"+((weeks>1?'s':'')));
			if (days  > 0) resultArray.push(days +" day" +((days >1?'s':'')));
			updated = resultArray.join(', ');
		}
	}else{
		updated = datestring;
	}

	var strUpdated = "";
	if (colorDate) {
		if (!(bCompleted)) {
			strUpdated = "<span style=\"color: "+color+";\"><abbr title=\""+datestring+"\">"+updated+"</abbr></span>"; // If the story is not complete, add color.
		} else {
			if (colorComplete)
				strUpdated = " <span style=\"color: #00EEEE;\"><abbr title=\""+datestring+" - "+updated+"\">Complete</abbr></span>";
			else
				strUpdated = " <span><abbr title=\""+datestring+" - "+updated+"\">Complete</abbr></span>";
		}
	}else{
		if (!(bCompleted)) {
			strUpdated = "<abbr title=\""+datestring+"\">"+updated+"</abbr>"; 
		} else {
			if (colorComplete)
				strUpdated = " <span style=\"color: #00EEEE;\"><abbr title=\""+datestring+" - "+updated+"\">Complete</abbr></span>";
			else
				strUpdated = " <abbr title=\""+datestring+" - "+updated+"\">Complete</abbr>";
		}
	}

	if (p)
	{
		if (bUpdated) {
			// Set the new date formats.
			if (dateOrder == 1) {
				html = html.replace(u[0]+" - "+p[0], "Updated: "+strUpdated+" - Published: "+published);
			} else {
				if (bCompleted)
					html = html.replace(u[0]+" - "+p[0], "Published: "+published+" - "+strUpdated);
				else
					html = html.replace(u[0]+" - "+p[0], "Published: "+published+" - Updated: "+strUpdated);
			}
		} else {
			// Just set the new published format.
			html = html.replace(p[0], "Published: "+strUpdated);
		}
	}
	
	return html; // Apply Changes
}

function setAjaxActivity( bool, text )
{
	ajaxActivity = bool;
	if (!text) text = '-- Loading --';
	loading.innerHTML = text;
	loading.style.display = (bool?'inherit':'none');
}

function makeLoadingBar()
{
	loading = document.createElement('div');
	loading.style.position = 'fixed';
	loading.style.left = '0px';
	loading.style.right = '0px';
	loading.style.bottom = '0px';
	loading.innerHTML = '-- Loading --';
	loading.style.backgroundColor = 'black';
	loading.style.border="3px solid red";
	loading.style.color = 'white';
	loading.style.padding = '4px';
	loading.style.textAlign = 'center';
	loading.style.display = (ajaxActivity?'inherit':'none');
	document.body.appendChild(loading);
}
function filterTitle( chapnum, title )
{
	var matcher = new RegExp('^'+chapnum+' ?[\.\):]? ?'+chapnum+'', "ig")
	return title.replace(matcher, chapnum);
}

function getHash() {
	var hash = document.location.hash;
	return hash.substr(1);
}

function addCommas(num)
{
	var str = (num+"").split("."),
	dec=str[1]||"",
	num=str[0].replace(/(\d)(?=(\d{3})+\b)/g,"$1,");
	return (dec) ? num+'.'+dec : num;
}

function insertAfter( node, referenceNode) {
	referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}