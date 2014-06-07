// ==UserScript==

// @name            NewsGator Custom UI
// @author          Mark Husson <http://michaelhusson.com/mark>
// @namespace       http://michaelhusson.com/mark/greasemonkey/
// @description     Many Customizable Twaks to the Excellent NewsGator Interface
// @include         http://www.newsgator.com/ngs/subscriber/WebEd*
// @include         http://newsgator.com/ngs/subscriber/WebEd*

// ==/UserScript==

	//* Settings *//
	var sidebarLineWrap = 'true'; //true for wrapped items, [site-default = true] (now that feed renaming is easy, this isn't as much of a big deal)
	
	var compactFeedList = 'true'; // [site-default = false] 
		var compactFeedPadding = '0 0 0 0px'; // Even more compact, try '0px 0px'
	
	var useOutlinesForAlternatingStories = 'true'; //add a small border to the alternation stories for better definition [site-default = false]
		var altOutline = '#C6DDF2';
	
	var customArticleTitles = 'true';
		var articleTitleWeight = 'bold'; // '' for non-bold ['bold' = site-default]
		var articleTitleSize = '1.5em'; // ['1em' = site-default]
		var articleTitleFont = 'Trebuchet MS'; // Other good choices: 'Verdana', 'Helvetica', 'Georgia'
		var articleTitleBullet = ''; // Other good choices: 'Ã½ ', 'Ã½ ', 'Ã½ ', '<img src="../images/last_page.gif"/> ',  ['' = site-default]
		var articleTitleOwner = 'true'; // This will put the owner of the articled website link after the article title. false = site-default
	
	var customArticleFontSize = 'true';
		var articleSize = '1em'; // ['1em' = site-default]
	
	var hideTipBox = 'true'; //Remove the "tip" box
	var hideSidebarExtras = 'true'; //Remove the "Latest Buzz", "Factiva", and "Help"
	
	//* Global ID's *//
	var sidebar = document.getElementById('sidebar');
	var content = document.getElementById('content-wrapper');
	var folders = document.getElementById('sidebarbox-feeds');
	
	//* All the Divs for Anything *//
	// If you need something in a div, heres where you get it
	var divsAltentryArray = new Array();
	var divsAnyentryArray = new Array();
	var divsFeedListArray = new Array();
	var divsSidebarExtraArray = new Array();
	var divsFeedBannerArray = new Array();
	
	var thedivs = unsafeWindow.document.getElementsByTagName('div');
	for(var i=0;i<thedivs.length;i++){
		if(thedivs[i].className == 'altentry'){
			divsAltentryArray.push(thedivs[i]);
		}
		if(thedivs[i].className.indexOf('entry') > -1){
			if(customArticleFontSize == 'true'){
				thedivs[i].style.fontSize = articleSize;
			}
			divsAnyentryArray.push(thedivs[i]);
		}
		if(thedivs[i].className == 'row'){
			divsFeedListArray.push(thedivs[i]);
		}
		if(thedivs[i].className == 'sidebarbox-gray'){
			divsSidebarExtraArray.push(thedivs[i]);
		}
		if(thedivs[i].id == 'FeedBanner'){
			divsFeedBannerArray.push(thedivs[i]);
		}
	}
	
	//* Element Arrays *//
	var theh1s  = document.getElementsByTagName('h1');
	
	//* Hiding Things *//
	if(hideTipBox == 'true'){
		if((document.getElementById('content').innerHTML.indexOf('Get the most out of NewsGator Online') > 0)){
			document.getElementById('divTips').style.display = 'none';
		}
	}
	if(hideSidebarExtras == 'true'){
		for(var i=0;i<divsSidebarExtraArray.length;i++){
			divsSidebarExtraArray[i].style.display = 'none';
		}
	}
	
	
	//* Sidebar Wrap Style *//
	if(sidebarLineWrap == 'false'){
		folders.style.whiteSpace = 'nowrap';
	}
	
	//* Alt-Entry Border *//
	if(useOutlinesForAlternatingStories == 'true'){
		for(var i=0;i<divsAltentryArray.length;i++){
			divsAltentryArray[i].style.border = '1px solid '+altOutline;
		}
	}
	
	//* Article Titles *//
	if(customArticleTitles == 'true'){
		for(var i=0;i<theh1s.length;i++){
			var theh1a = theh1s[i].getElementsByTagName('a')[0];
			theh1a.innerHTML = articleTitleBullet + theh1a.innerHTML;
			var pThing = theh1s[i].parentNode.getElementsByTagName('p');
			var referingSiteLink = pThing[pThing.length-1].getElementsByTagName('a')[0];
			var referingSiteLinkCopy = document.createElement('a');
			referingSiteLinkCopy.href = referingSiteLink.href;
			referingSiteLinkCopy.innerHTML = ' '+referingSiteLink.innerHTML;
			referingSiteLinkCopy.style.opacity = '.4';
			referingSiteLinkCopy.style.marginLeft = '5px';
			
			theh1s[i].innerHTML = '';
			theh1s[i].appendChild(theh1a);
			if(articleTitleOwner == 'true'){
				if(referingSiteLinkCopy.href.indexOf("javascript:deletePost") < 0){
					theh1s[i].appendChild(referingSiteLinkCopy);
				}
			}
			
			theh1a.style.fontWeight = articleTitleWeight;
			theh1a.style.fontSize = articleTitleSize;
			theh1a.style.fontFamily = articleTitleFont;
		}
	}
	
	//* Compact Feed List *//
	if(compactFeedList == 'true'){
		for(var i=0;i<divsFeedListArray.length;i++){
			divsFeedListArray[i].style.padding = compactFeedPadding;
		}
	}