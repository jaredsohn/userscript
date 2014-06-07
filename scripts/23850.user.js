// ==UserScript==
// @name           SU About Enhancements
// @namespace      thlayli.detrave.net
// @description    Modifies About pages on StumbleUpon, adding several new features.
// @include        http://*.stumbleupon.com/about/
// @license        http://www.gnu.org/copyleft/gpl.html
// @version        2.1
// ==/UserScript==

// external site links (same format as keyword searches, %s is replaced with the search term)
var thingsLink = 'http://en.wikipedia.org/wiki/Special:Search?search=%s&fulltext=Search';
var musicLink = 'http://www.discogs.com/search/?q=%s&amp;action=Go&type=all';
var booksLink = 'http://www.amazon.com/gp/search/?url=search-alias%3Dstripbooks&field-keywords=%s';
var moviesLink = 'http://www.imdb.com/find?q=%s';
var tvLink = 'http://www.imdb.com/find?q=%s';

// auto-update variables
var script_title = 'SU About Enhancements';
var source_location = 'http://thlayli.detrave.net/su-aboutenhancements.user.js';
var version_holder = 'http://thlayli.detrave.net/su-aboutenhancements.version.txt';
var current_version = '2.1';
var latest_version = '';
var manual_check = true;
var lastupdatecheck = GM_getValue('Updated', 'never');

// xpath variables
var aboutHeader = xpath(document,'//p[starts-with(text(),"About ")]').snapshotItem(0);
var avatar = xpath(document,'//div[contains(@class,"textCenter mgnTopSm mgnBottomSm")]').snapshotItem(0);
var curStumbler = xpath(document,'//span[contains(@class,"textLg")]').snapshotItem(0).textContent;
var firstLikes = xpath(document,'//div[contains(@class,"round groupBanner")]').snapshotItem(0);
var secondLikes = xpath(document,'//div[contains(@class,"round groupBanner")]').snapshotItem(2);
var groupDiv = xpath(document,'//div[contains(@class,"listGroup")]').snapshotItem(0);
var groupHeader = xpath(document,'//h2[contains(@class,"dividerBottom")]');
var langText = xpath(document,'//div[contains(@class,"textCenter") and contains(text(),"I speak")]');
var mainTd = xpath(document,'//td[contains(@class,"main pdgTop")]').snapshotItem(0);
var publicNotice = xpath(document,'//div[contains(@class,"round alert mgnBottomSm")]');
var uls = xpath(document,'//ul');

// empty node variables
var newGroupHeader = document.createElement('div');
var newHeader = document.createElement('div');
var loadDesc = document.createElement('ul');
var newDesc = document.createElement('ul');
var offDesc = document.createElement('ul');

// list variables
for(i=0;i<uls.snapshotLength;i++){
	if(uls.snapshotItem(i).className == 'listLikes'){
		sectionTitle = uls.snapshotItem(i).parentNode.previousSibling.previousSibling.textContent;
		if(sectionTitle.indexOf('Things')!=-1&&!likes)
		  var likes = uls.snapshotItem(i);
		if(sectionTitle.indexOf('Music')!=-1&&!music)
		  var music = uls.snapshotItem(i);
		if(sectionTitle.indexOf('Books')!=-1&&!books)
		  var books = uls.snapshotItem(i);
		if(sectionTitle.indexOf('Movie')!=-1&&!movies)
		  var movies = uls.snapshotItem(i);
		if(sectionTitle.indexOf('TV')!=-1&&!tv)
		  var tv = uls.snapshotItem(i);
	}
}

// other variables
var curTarget = GM_getValue('Stumbler', '');
var url = document.location.href.split('.');
var shortGroups = '';

// set load text
loadDesc.innerHTML = '<h4 style="font-size: 12px;">Please wait while About Enhancements completes loading...</h4>';

// compare or store
if(url[0]=="http://"+curTarget)
	storeLikes();
else
	compareLikes();

// load groups if needed
if(groupHeader.snapshotLength > 0){
	groupHeader.snapshotItem(0).style.display = 'none';
	newGroupHeader.className = 'round groupBanner';
	newGroupHeader.innerHTML = '<div class="roundHead"><p class="textEm">' + groupHeader.snapshotItem(0).textContent + '</p></div><div class="roundBottom"><!-- --></div>';
	groupHeader.snapshotItem(0).parentNode.insertBefore(newGroupHeader,groupHeader.snapshotItem(0).nextSibling);
	if(newGroupHeader.nextSibling.nextSibling.innerHTML.indexOf('Show me more')!=-1){
		newGroupHeader.nextSibling.nextSibling.style.display = 'none';

		// store short group list in case of failure
		var shortGroups = groupDiv.innerHTML;
		groupDiv.innerHTML = '<h4 style="font-size: 12px; margin: 2px 0px 0px 20px;">Please wait while '+curStumbler+'\'s full group list is retrieved...</h4>';
		fetchGroups();
	}else{
		compressGroups();
		loadDesc.style.display = 'none';
		newDesc.style.display = 'block';
	}
}else{
	loadDesc.style.display = 'none';
	newDesc.style.display = 'block';
}

// hide avatar
if(avatar){
	avatar.firstChild.nextSibling.style.display = 'none';
	if(avatar.firstChild.nextSibling.width > 185 || avatar.firstChild.nextSibling.height > 185){
		avatar.innerHTML = avatar.innerHTML + '<a href="javascript:void(0);" id="show_avatar">Show ' + curStumbler + '\'s full-size avatar</a>';
		document.getElementById("show_avatar").wrappedJSObject.addEventListener("click", showAvatar, true);
	}
}

// hide public profile notice
if(publicNotice.snapshotLength > 0)
	publicNotice.snapshotItem(0).style.display = 'none';

// fix about margins
if(aboutHeader){
	aboutHeader = aboutHeader.parentNode.parentNode;
	aboutHeader.nextSibling.nextSibling.style.marginLeft = '13px';
	var aboutHeaderNext = aboutHeader.nextSibling.nextSibling.nextSibling.nextSibling;
	if(aboutHeaderNext.nextSibling.nextSibling && aboutHeaderNext.nextSibling.nextSibling.className == 'spacer pdgBottom')
		aboutHeaderNext.style.display = 'none';
}

// correct tense and dim language
if(langText.snapshotLength > 0){
	langText.snapshotItem(0).className = 'textCenter textDisabled';
	langText.snapshotItem(0).innerHTML = langText.snapshotItem(0).innerHTML.replace('I speak',(curStumbler + ' speaks'));
}

function createHeader(target){
	newHeader.className = 'round groupBanner';
	newDesc.style.margin = '5px 5px 20px 13px';
	newDesc.style.display = 'none';
	loadDesc.style.margin = '5px 5px 20px 13px';
	loadDesc.style.display = 'block';
	// groups exist, place above them
	if(groupHeader.snapshotLength > 0){
		groupHeader.snapshotItem(0).parentNode.insertBefore(newDesc,groupHeader.snapshotItem(0));
		groupHeader.snapshotItem(0).parentNode.insertBefore(loadDesc,newDesc);
		groupHeader.snapshotItem(0).parentNode.insertBefore(newHeader,loadDesc);
	}else{
		// no groups, place above first likes
		if(firstLikes && !aboutHeader){
			firstLikes.parentNode.insertBefore(newDesc,firstLikes);
			firstLikes.parentNode.insertBefore(loadDesc,newDesc);
			firstLikes.parentNode.insertBefore(newHeader,loadDesc);
		}else{
			if(aboutHeader){
				// no likes, place above about
				aboutHeader.parentNode.insertBefore(newDesc,aboutHeader);
				aboutHeader.parentNode.insertBefore(loadDesc,newDesc);
				aboutHeader.parentNode.insertBefore(newHeader,loadDesc);
			}else{
				// no likes or about, append note
				offDesc.innerHTML = '<h4 style="font-size: 12px;">This stumbler has not joined any groups or listed any items.</h4>';
				offDesc.style.margin = '5px 5px 20px 13px';
				mainTd.appendChild(newHeader);
				mainTd.appendChild(offDesc);
				mainTd.appendChild(loadDesc);
			}
		}
	}
	newHeader.innerHTML = '<div class="roundHead"><p class="textEm">SU About Enhancements</p></div><div class="roundBottom"><!-- --></div>';
	var helpText = 'Hover over items to view their popularity. Click on "<a style="text-decoration: none;" href="javascript:void(0);">+</a>" links to search for the item on the web.<br>Results are from Wikipedia for things, Discogs for music, Amazon for books, and IMDb for movies and TV.';
	if(curTarget==''){
			newDesc.innerHTML = '<h4 style="font-size: 12px;">To compare items you must select a stumbler. Use the link below to select ' + curStumbler + '.<br><br>' + helpText + '<br><br><a href="javascript:void(0);" id="set_stumbler" style="cursor: pointer;">Start comparing ' + curStumbler + '\'s items to those of other stumblers.</a>';
			document.getElementById('set_stumbler').wrappedJSObject.addEventListener('click', setStumbler, true);
	}else{
		if(target==true){
			newDesc.innerHTML = '<h4 style="font-size: 12px;">' + curStumbler + '\'s data has been stored. Items listed below will be underlined on other Stumblers\' About pages.<br><br>' + helpText + '<br><br><a href="javascript:void(0);" id="set_stumbler" style="cursor: pointer;">Stop comparing ' + curStumbler + '\'s items to those of other stumblers.</a>';
			document.getElementById('set_stumbler').wrappedJSObject.addEventListener('click', delStumbler, true);
		}else{
			newDesc.innerHTML = '<h4 style="font-size: 12px;">' + curStumbler + ' and <a href="http://' + GM_getValue('Stumbler','') + '.stumbleupon.com/about/">' + GM_getValue("FancyStumbler", "") + '</a> have <span id="similar_groups"><b>0</b> groups</span> and <span id="similar_items"><b>0</b> items</span> in common. Similar items are underlined below.<br><br>' + helpText + '<br><br><a href="javascript:void(0);" id="set_stumbler" style="cursor: pointer;">Start comparing ' + curStumbler + '\'s items to those of other stumblers.</a>';
			if(document.getElementById('set_stumbler'))
				document.getElementById('set_stumbler').wrappedJSObject.addEventListener('click', setStumbler, true);
		}
	}
}

function storeLikes(){
	createHeader(true);
	countLikes();
	GM_setValue('Likes', '');
	GM_setValue('Music', '');
	GM_setValue('Books', '');
	GM_setValue('Movies', '');
	GM_setValue('Tv', '');
	if(likes){
		var likesNodes = xpath(likes,'.//li/a');
		myLikes = new Array(likesNodes.snapshotLength);
		for(i=0;i<likesNodes.snapshotLength;i++)
			  myLikes[i] = likesNodes.snapshotItem(i).href.substring(27,likesNodes.snapshotItem(i).href.length-1).replace('like/','');
		GM_setValue('Likes', myLikes.join(','));
	}
	if(music){
		var musicNodes = xpath(music,'.//li/a');
		myMusic = new Array(musicNodes.snapshotLength);
		for(i=0;i<musicNodes.snapshotLength;i++)
			  myMusic[i] = musicNodes.snapshotItem(i).href.substring(27,musicNodes.snapshotItem(i).href.length-1).replace('music/','');
		GM_setValue('Music', myMusic.join(','));
	}
	if(books){
		var booksNodes = xpath(books,'.//li/a');
		myBooks = new Array(booksNodes.snapshotLength);
		for(i=0;i<booksNodes.snapshotLength;i++)
			  myBooks[i] = booksNodes.snapshotItem(i).href.substring(27,booksNodes.snapshotItem(i).href.length-1).replace('book/','');
		GM_setValue('Books', myBooks.join(','));
	}
	if(movies){
		var moviesNodes = xpath(movies,'.//li/a');
		myMovies = new Array(moviesNodes.snapshotLength);
		for(i=0;i<moviesNodes.snapshotLength;i++)
			  myMovies[i] = moviesNodes.snapshotItem(i).href.substring(27,moviesNodes.snapshotItem(i).href.length-1).replace('movie/','');
		GM_setValue('Movies', myMovies.join(','));
	}
	if(tv){
		var tvNodes = xpath(tv,'.//li/a');
		myTv = new Array(tvNodes.snapshotLength);
		for(i=0;i<tvNodes.snapshotLength;i++)
			  myTv[i] = tvNodes.snapshotItem(i).href.substring(27,tvNodes.snapshotItem(i).href.length-1).replace('tv/','');
		GM_setValue('Tv', myTv.join(','));
	}
	modifyLikes();
}

function compareLikes(){
	createHeader(false);
	countLikes();
	var similarItems = 0;
	if(likes){
		var likesNodes = xpath(likes,'.//li/a');
		var masterLikes = GM_getValue('Likes', '').split(',');
		for(i=0;i<likesNodes.snapshotLength;i++){
			for(n=0;n<masterLikes.length;n++){
				if(likesNodes.snapshotItem(i).href.substring(27,likesNodes.snapshotItem(i).href.length-1).replace('like/','')==masterLikes[n]){
					likesNodes.snapshotItem(i).style.textDecoration = 'underline';
					similarItems++;
					break;
				}
			}
		}
	}
	if(music){
		var musicNodes = xpath(music,'.//li/a');
		var masterMusic = GM_getValue('Music', '').split(',');
		for(i=0;i<musicNodes.snapshotLength;i++){
			for(n=0;n<masterMusic.length;n++){
				if(musicNodes.snapshotItem(i).href.substring(27,musicNodes.snapshotItem(i).href.length-1).replace('music/','')==masterMusic[n]){
					musicNodes.snapshotItem(i).style.textDecoration = 'underline';
					similarItems++;
					break;
				}
			}
		}
	}
	if(books){
		var booksNodes = xpath(books,'.//li/a');
		var masterBooks = GM_getValue('Books', '').split(',');
		for(i=0;i<booksNodes.snapshotLength;i++){
			for(n=0;n<masterBooks.length;n++){
				if(booksNodes.snapshotItem(i).href.substring(27,booksNodes.snapshotItem(i).href.length-1).replace('book/','')==masterBooks[n]){
					booksNodes.snapshotItem(i).style.textDecoration = 'underline';
					similarItems++;
					break;
				}
			}
		}
	}
	if(movies){
		var moviesNodes = xpath(movies,'.//li/a');
		var masterMovies = GM_getValue('Movies', '').split(',');
		for(i=0;i<moviesNodes.snapshotLength;i++){
			for(n=0;n<masterMovies.length;n++){
				if(moviesNodes.snapshotItem(i).href.substring(27,moviesNodes.snapshotItem(i).href.length-1).replace('movie/','')==masterMovies[n]){
					moviesNodes.snapshotItem(i).style.textDecoration = 'underline';
					similarItems++;
					break;
				}
			}
		}
	}
	if(tv){
		var tvNodes = xpath(tv,'.//li/a');
		var masterTv = GM_getValue('Tv', '').split(',');
		for(i=0;i<tvNodes.snapshotLength;i++){
			for(n=0;n<masterTv.length;n++){
				if(tvNodes.snapshotItem(i).href.substring(27,tvNodes.snapshotItem(i).href.length-1).replace('tv/','')==masterTv[n]){
					tvNodes.snapshotItem(i).style.textDecoration = 'underline';
					similarItems++;
					break;
				}
			}
		}
	}
	// store similar items count
	if(document.getElementById('similar_items'))
		document.getElementById('similar_items').innerHTML = (similarItems == 1) ? '<b>' + similarItems + '</b> item' : '<b>' + similarItems + '</b> items';
	modifyLikes();
}

function countLikes(){
	if(likes)
		xpath(likes.parentNode.previousSibling.previousSibling,".//p").snapshotItem(0).innerHTML += (xpath(likes,".//li/a").snapshotLength > 1) ? '<span class="textDisabled"> (' + xpath(likes,".//li/a").snapshotLength + ' items)</span>' : '<span class="textDisabled"> (' + xpath(likes,".//li/a").snapshotLength + ' item)</span>';
	if(music)
		xpath(music.parentNode.previousSibling.previousSibling,".//p").snapshotItem(0).innerHTML += (xpath(music,".//li/a").snapshotLength > 1) ? '<span class="textDisabled"> (' + xpath(music,".//li/a").snapshotLength + ' items)</span>' : '<span class="textDisabled"> (' + xpath(music,".//li/a").snapshotLength + ' item)</span>';
	if(books)
		xpath(books.parentNode.previousSibling.previousSibling,".//p").snapshotItem(0).innerHTML += (xpath(books,".//li/a").snapshotLength > 1) ? '<span class="textDisabled"> (' + xpath(books,".//li/a").snapshotLength + ' items)</span>' : '<span class="textDisabled"> (' + xpath(books,".//li/a").snapshotLength + ' item)</span>';
	if(movies)
		xpath(movies.parentNode.previousSibling.previousSibling,".//p").snapshotItem(0).innerHTML += (xpath(movies,".//li/a").snapshotLength > 1) ? '<span class="textDisabled"> (' + xpath(movies,".//li/a").snapshotLength + ' items)</span>' : '<span class="textDisabled"> (' + xpath(movies,".//li/a").snapshotLength + ' item)</span>';
	if(tv)
		xpath(tv.parentNode.previousSibling.previousSibling,".//p").snapshotItem(0).innerHTML += (xpath(tv,".//li/a").snapshotLength > 1) ? '<span class="textDisabled"> (' + xpath(tv,".//li/a").snapshotLength + ' items)</span>' : '<span class="textDisabled"> (' + xpath(tv,".//li/a").snapshotLength + ' item)</span>';
}

function modifyLikes(){
	var listItems = xpath(document,'//li/span[contains(@class,"textSm textUncolor")]');
	if(listItems.snapshotLength > 0 && likes)
		sortThings();
	for(i=0;i<listItems.snapshotLength;i++){
		// move count to title
		var others = listItems.snapshotItem(i).textContent.replace(/(\(|\))/g,'') - 1;
		listItems.snapshotItem(i).style.display = 'none';
		listItems.snapshotItem(i).previousSibling.previousSibling.title = (others>0) ? others + ' other people like this' : 'nobody else likes this';
		// create + links
		switch(listItems.snapshotItem(i).previousSibling.previousSibling.href.split('/')[3]){
			case 'like':
				var searchPattern = thingsLink;
				break;
			case 'music':
				var searchPattern = musicLink;
				break;
			case 'book':
				var searchPattern = booksLink;
				break;
			case 'movie':
				var searchPattern = moviesLink;
				break;
			case 'tv':
				var searchPattern = tvLink;
				break;
		}
		var plusLink = '<a style="text-decoration: none !important; margin: 0px -2px 0px -4px;" href="' + searchPattern.replace('%s',listItems.snapshotItem(i).previousSibling.previousSibling.textContent) + '">+</a> ';
		listItems.snapshotItem(i).parentNode.setAttribute('style','white-space: nowrap; width: 170px;');
		listItems.snapshotItem(i).parentNode.innerHTML = plusLink + listItems.snapshotItem(i).parentNode.innerHTML;
	}
}

function sortThings(){
	var thingLists = xpath(likes,'.//li');
	sortedThings = new Array();
	for(i=0;i<thingLists.snapshotLength;i++)
		sortedThings[sortedThings.length] = thingLists.snapshotItem(i);
	sortedThings.sort(itemSort);
	for(i=0;i<thingLists.snapshotLength;i++)
		likes.removeChild(thingLists.snapshotItem(i));
	for(i=0;i<sortedThings.length;i++)
		likes.appendChild(sortedThings[i]);
}

function fetchGroups(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: document.location.href.split('about/')[0] + 'groups/',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html,text/xhtml',
		},
		onload: function(responseDetails) {
			try{
				replaceGroups(responseDetails.responseText);
			}catch(er){
				alert(er);
			}
		}
	});
}

function replaceGroups(responseText){
	if(responseText.indexOf('Recent conversations in my groups')!=-1){
		var groups = responseText.split('<div  class="listGroup">')[1];
		groupDiv.innerHTML = groups.split('</div>\n\t\t</div>')[0];
	}else{
		var groups = responseText.split('groups</h2>')[1];
		groupDiv.innerHTML = groups.split('<div class="spacer pdgBottom">')[0].replace('<div class="listGroup">','');
	}
	compressGroups();
}

function compressGroups(){
	var similarGroups = 0;
	var groupIcons = xpath(document,'//dd[contains(@class,"thumbnail")]/a[contains(@href,"group.stumbleupon.com")]');
	groupIcons.snapshotItem(0).parentNode.parentNode.parentNode.style.marginLeft = '19px';
	var myGroups = new Array(groupIcons.snapshotLength);
	var masterGroups = GM_getValue('Groups', '').split(",");
	for(i=0;i<groupIcons.snapshotLength;i++){
		var groupDd = groupIcons.snapshotItem(i).parentNode;
		groupDd.style.display = 'none';
		groupDd.parentNode.style.marginTop = '5px';
		groupDd.parentNode.style.width = '170px';
		groupDd.nextSibling.nextSibling.style.textAlign = 'left';
		groupDd.nextSibling.nextSibling.firstChild.href = groupDd.nextSibling.nextSibling.firstChild.href.replace('forum/','');
		if(url[0]!='http://'+curTarget){
			for(n=0;n<masterGroups.length;n++){
				if(groupDd.nextSibling.nextSibling.textContent==masterGroups[n]){
					groupDd.nextSibling.nextSibling.firstChild.style.textDecoration = 'underline';
					similarGroups++;
				}
			}
		}
		groupDd.nextSibling.nextSibling.nextSibling.nextSibling.style.display = 'none';
		groupDd.nextSibling.nextSibling.title = groupDd.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
		myGroups[i] = groupDd.nextSibling.nextSibling.textContent;
	}
	// sort groups
	var groupDls = xpath(groupDiv,'.//dl');
	sortedGroups = new Array();
	for(i=0;i<groupDls.snapshotLength;i++)
		sortedGroups[sortedGroups.length] = groupDls.snapshotItem(i);
	sortedGroups.sort(itemSort);
	for(i=0;i<groupDls.snapshotLength;i++){
		groupDiv.removeChild(groupDls.snapshotItem(i));
	}
	for(i=0;i<sortedGroups.length;i++)
		groupDiv.appendChild(sortedGroups[i]);
	// write group count
	xpath(newGroupHeader,".//p").snapshotItem(0).innerHTML += (groupIcons.snapshotLength) ? '<span class="textDisabled"> (' + groupIcons.snapshotLength + ' groups)</span>' :  '<span class="textDisabled"> (' + groupIcons.snapshotLength + ' group)</span>';;
	// store groups and similar groups count
	if(url[0]=='http://'+curTarget)
		GM_setValue('Groups', myGroups.join(','));
	else
		if(document.getElementById('similar_groups'))
			document.getElementById('similar_groups').innerHTML = (similarGroups == 1) ? '<b>' + similarGroups + '</b> group' : '<b>' + similarGroups + '</b> groups';
	if(shortGroups != ''){
		loadDesc.style.display = 'none';
		newDesc.style.display = 'block';
	}
}

function itemSort(a,b){
    var x = a.textContent;
    var y = b.textContent;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function showAvatar(){
	avatar.firstChild.nextSibling.style.display = 'inline';
	document.getElementById('show_avatar').style.display = 'none';
	document.getElementById('show_avatar').wrappedJSObject.removeEventListener('click', showAvatar, true);
}

function setStumbler(){
	if(confirm('Are you sure you want to start comparing items with ' + curStumbler + '?')){
		GM_setValue('Stumbler', url[0].split('/')[2]);
		GM_setValue('FancyStumbler',curStumbler);
		document.location.href=document.location.href;
	}
}

function delStumbler(){
	if(confirm('Are you sure you want to discard comparison data from ' + curStumbler + '?\n')){
		GM_setValue('Stumbler', '');
		GM_setValue('FancyStumbler','');
		GM_setValue('Likes', '');
		GM_setValue('Music', '');
		GM_setValue('Books', '');
		GM_setValue('Movies', '');
		GM_setValue('Tv', '');
		document.location.href=document.location.href;
	}
}

function xpath(obj,query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Userscript Auto-Update - http://userscripts.org/scripts/show/22372 - edited July 2008 by Nathan Blume

function GetNewVersion() {
        var today = new Date();
        GM_setValue('Updated', String(today));
        window.location = source_location;
}

function CheckForUpdate(){   
    var today = new Date();
    var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
    if(lastupdatecheck != 'never'){
        today = today.getTime(); //Get today's date
        lastupdatecheck = new Date(lastupdatecheck).getTime();
        var interval = (today - lastupdatecheck) / one_day; //Find out how many days have passed       
        if(interval >= 7){
			manual_check = false;
            CheckVersion();
		}
    }else{
        lastupdatecheck = new Date(lastupdatecheck).getTime();
		manual_check = false;
        CheckVersion();
	}
}

function CheckVersion(){
    GM_xmlhttpRequest({
            method: 'GET',
            url: version_holder,
            headers: {'Content-type':'application/x-www-form-urlencoded'},           
            onload: function(responseDetails){
                var latest_version = responseDetails.responseText.match(/version=([0-9\.]+)/);
                if(latest_version[1] != null && latest_version[1] != 'undefined'){
                    if(current_version != latest_version[1]){
                        if(confirm('A more recent version of ' + script_title + ' (' + latest_version[1] + ') has been found.\nWould you like to get it now?'))
                            GetNewVersion();
                        else
                            AskForReminder();
                    }else{
						if(current_version == latest_version[1] && manual_check == true)
							alert('You have the latest version of ' + script_title + '.');
					}
                }else{
                    alert('Sorry, there was problem checking for the update.\nPlease try again later.');
                    SkipWeeklyUpdateCheck();
                }
                   
            }
        });
}

function AskForReminder(){
    if(confirm('Would you like to be reminded in 24 hours ?\n(Cancel to be reminded in one week.)')){
        var today = new Date();
        today = today.getTime();       
        var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
        var sda_ms = today - sixdays_ms;       
        var sixdaysago = new Date(sda_ms)
        GM_setValue('Updated', String(sixdaysago));
    }else{
        SkipWeeklyUpdateCheck();
	}
}

function SkipWeeklyUpdateCheck(){
    var today = new Date();
    GM_setValue('Updated', String(today));
}

GM_registerMenuCommand('Update - '+script_title, CheckVersion);
CheckForUpdate();