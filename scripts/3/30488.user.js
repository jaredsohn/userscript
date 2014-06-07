// ==UserScript==
// @name           MySpace - Comments on Homepage
// @namespace      RunningBlind
// @description    Displays last few comments on your MySpace homepage.
// @include        http://home.myspace.com/*fuseaction=user*
// @include        *fuseaction=user.*
// ==/UserScript==

refreshRate = 30; //number of seconds between refreshing comments
showVideos = false; //set to false to avoid loading videos
defCmtNum = 3; //default number of comments to display [ any number 1-50 ]
newTab = false; //opens reply links in a new tab/window [ true or false ]
relativeDates = true; //instead of "Apr 5, 2008 4:53 PM" you get something like "two minutes ago" [ true or false ]
position = 'before friendspace'; /*the id of the element to place the comments before or after
can be 'before or 'after' followed by any of the following:
'userstatus' -- the status messages of your friends
'friendUpdate' -- so-and-so added a new song, updated profile information, etc.
'friendspace' -- [default] top friends
'bulletins' -- self-expanitory
'today' -- today's date and the current time

the following only work if you do not have 'Home Skin Switchup' by Insane Ninja installed:
'ctl00_cpMain_MarketingBox_userHomeTabs_userHomeTabs' -- the 'featured content' box
'squareAd' -- the right-hand side advertisment
'grayboxrounded' -- the links to other places around myspace
*/

iComment = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQs' +
	'AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcG' +
	'AAAAZlJREFUOMudkz1rVEEYhc87d40RY3BXBdGwgilEF%2FwVamOnVVqLgGJpo3%2FAwsZKtD' +
	'AgYkhpSBcwCoKFWMkqKZKsMQp%2BLGtEvHdzvTOPxd27mhCyuzkwMAwvD%2BfMmZEkAREwz2D' +
	'KgA3gF3BDkkrKdU%2FS%2Bef1b5p5taZeMpOcWVRyFl29MD50emz0DpBax5l%2FvdRyfwKqVS' +
	'saRO8%2BtnR4ZEinjh344YrDqYWGatWKUi%2F9bNPXSr1Uq1Z0f35Z%2F8eUmZR6KW5nfbuKv' +
	'RRLcs42wYIzc5KUZEGDynKWL2J650zeDw6SJJfTfOHMW2ezkdlunYXCWYg6ufeW2LWz4mm0Pr' +
	'eS8odmrOOHRrtDSRa0nuwcPaSxxsrDOnFk%2F2oBuyhpdq0ZR7efLsqH3N3Ny2c3FXJ3tp63F' +
	'pmG90QqOdPkuZMaPzoSJE10B4FLne8BwIv6VyYfvKHRTGk0Ux4%2BW9n6nRLgO%2FAJuLKtba' +
	'AMzAHcmn7L%2By9tpha6oMfAQcD1faHAPmB5%2FXfKk5erBehRz1Z3AJ6RdP1f%2FXatF%2Bw' +
	'vfuo5nSuflJkAAAAASUVORK5CYII%3D';

//function $(sObj) {return document.getElementById(sObj);} //revised dollar sign function from Prototype Javascript Framework

function e(nodeName, attributes, styles) { //prototype javascript framework [only basic functionality]
	element = document.createElement(nodeName);
	for (i in attributes) {
		element[i] = attributes[i];
	}
	for (j in styles) {
		element.style[j] = styles[j];
	}
	return element;
}

function addStyle() {
	j = 0;
	links = document.getElementsByTagName('link');
	while (!links[j].title) {j++};
	theme = links[j].title;
	
	switch (theme) {
		case 'IceCream':		colors = ['6B5636', 'DFD9C7', '6B5636']; break;
		case 'BlueRounded': 	colors = ['729FCF', 'BABDB6', '888A85']; break;
		case 'Glam': 			colors = ['C16269', 'BABDB6', '888A85']; break;
		case 'StealthNick': 	colors = ['D3D7CF', 'BABDB6', '888A85']; break;
		case 'Scenic': 			colors = ['64AEF0', '3465a4', '053959']; break;
		case 'Cartoon': 		colors = ['729FCF', '7ADCFE', '0069BC']; break;
		case 'Retro': 			colors = ['6B5636', '6B5636', '463923']; break;
		case 'Zodiac': 			colors = ['8C5F1C', '8C5F1C', '007AC6']; break;
		case 'CartoonSimple': 	colors = ['7ADCFE', '7ADCFE', '0069BC']; break;
		case 'RetroSimple': 	colors = ['463923', '463923', '000000']; break;
		default: 				colors = ['D3D7CF', 'BABDB6', '888A85'];
	}
	
	style = '#commentsicon {display: block; float: left; height: 21px;\
	margin: 0pt; padding: 0pt; vertical-align: middle; width: 24px;\
	background: transparent url(' + iComment + ') no-repeat scroll left top;}\
	#commentsContent {max-height: 250px; overflow: auto;}\
	#commentsContent > div {border-top: 0pt none; overflow-x: auto;}\
	#commentsContent > div + div {border-top: 1px dotted #' + colors[0] + ';}\
	.userpic {float: left; border: 1px solid #' + colors[1] + '; padding: 1px !important;}\
	.userpic img {width: 45px;}\
	.commenttext {margin-left: 54px;}\
	.commentinfo a {font-size: 115%;}\
	.online {background: transparent url(http:\/\/a177.ac-images.myspacecdn.com\/images01\/59\/l_12ac26c7a736a49e68dbec859b357e88.gif) no-repeat scroll left top;\
	padding-left:20px;}\
	.commentinfo span {float: right; color: #' + colors[2] + ';}\
	.commenttext img, .commenttext object {max-width: 100%;}\
	.reply {text-align: right;}\
	.reply a {cursor: pointer;}\
	.replybox textarea, .replybox input {float: left}\
	.replybox textarea {width: 79%; height: 49px; font-family: inherit; font-size: inherit;}\
	.replybox input {height: 51px; border: 1px solid #999; width: 20% }\
	#viewall {text-align: center;}\
	.disabled {color: #' + colors[2] + '}';
	GM_addStyle(style.replace(/}/g, '}\n'));
}

function monthNum(sMonth) {
	switch (sMonth) {
		case 'Jan': m = 1; break;
		case 'Feb': m = 2; break;
		case 'Mar': m = 3; break;
		case 'Apr': m = 4; break;
		case 'May': m = 5; break;
		case 'Jun': m = 6; break;
		case 'Jul': m = 7; break;
		case 'Aug': m = 8; break;
		case 'Sep': m = 9; break;
		case 'Oct': m = 10; break;
		case 'Nov': m = 11; break;
		case 'Dec': m = 12; break;
	}
	return m;
}

function getMins(currenttime, year, month, date, hours, minutes) {
	cmtDate = new Date(year, month-1, date, hours, minutes);
	mins = Math.ceil((currenttime.getTime() - cmtDate.getTime())/60000);
	return mins;
}

function twentyfour(hour, half) {
	newHour = (hour == '12')?((half == 'AM')?0:12):((half == 'PM')?hour*1+12:hour*1);
	return newHour;
}

function getRelTime(sDate) {
	mdyhm = /(\w+)\s(\d{1,2}),\s(\d{4})\s(\d{1,2}):(\d{2})\s([A|P]M)/; //Apr 11, 2008 8:13 AM
	dmyhm = /(\d{1,2})\s(\w+)\s(\d{4})\s(\d{1,2}):(\d{2})\s([A|P]M)/; //11 Apr 2008 8:13 AM
	dmyhm24 = /(\d{1,2})\s(\w+)\s(\d{4})\s(\d{1,2}):(\d{2})/; //11 Apr 2008 8:13 (24 hr. clock)
	if (sDate.match(mdyhm)) {cmttime = sDate.match(mdyhm); cmttime[4] = twentyfour(cmttime[4], cmttime[6]);}
	else if (sDate.match(dmyhm)) cmttime = [sDate.match(dmyhm)[0], sDate.match(dmyhm)[2], sDate.match(dmyhm)[1], sDate.match(dmyhm)[3], twentyfour(sDate.match(dmyhm)[4], sDate.match(dmyhm)[6]), sDate.match(dmyhm)[5]];
	else if (sDate.match(dmyhm24)) cmttime = [sDate.match(dmyhm24)[0], sDate.match(dmyhm24)[2], sDate.match(dmyhm24)[1], sDate.match(dmyhm24)[3], sDate.match(dmyhm24)[4], sDate.match(dmyhm24)[5]];
	else cmttime = null;
	if (cmttime) {
		cmtmins = getMins(d, cmttime[3]*1, monthNum(cmttime[1]), cmttime[2]*1, cmttime[4], cmttime[5]*1);
		if (cmtmins >= 365 * 24 * 60) reltime = (cmtmins < 2*365*24*60) ? 'a year ago' : Math.floor(cmtmins/(365*24*60)) + ' years ago';
		else if (cmtmins >= 30 * 24 * 60) reltime = (cmtmins < 2*30*24*60) ? 'a month ago' : Math.floor(cmtmins/(30*24*60)) + ' months ago';
		else if (cmtmins >= 7 * 24 * 60) reltime = (cmtmins < 2*7*24*60) ? 'a week ago' : Math.floor(cmtmins/(7*24*60)) + ' weeks ago';
		else if (cmtmins >= 24 * 60) reltime = (cmtmins < 2*24*60) ? 'a day ago' : Math.floor(cmtmins/(24*60))  + ' days ago';
		else if (cmtmins >= 60) reltime = (cmtmins < 2*60) ? 'an hour ago' : Math.floor(cmtmins/60) + ' hours ago';
		else reltime = (cmtmins < 2) ? 'just now' : cmtmins + ' minutes ago';
	}
	else reltime = sDate;
	return reltime;
}

function getComments(cmtNum) {
	cmtInfo = [];
	cmtExp = /profile_comments_(\d+).*?<a href="http:\/\/profile\.[^&]+&friendid=(\d+)">.*?<img.*?src="([^"]+)".*?title="(.*?)"(.*?)<h4>([^<]+)<\/h4>.*?<span id="[^"]+">(.*?)<\/span>/g;
	GM_xmlhttpRequest({ 
		method: 'GET',
		url: 'http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=' + friendId + '&MyToken=' + token,
		headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
		onload: function(responseDetails) {
			html = responseDetails.responseText.replace(/[\t\r\n]/g, '');
			cmtDiv = e('div', {id: 'commentsContent'});
			if (html.match(cmtExp)) {
				for (i = 0; i < html.match(cmtExp).length; i++) {
					info = cmtExp.exec(html.match(cmtExp)[i]);
					cmtInfo[i] = {
						id: info[1],
						friendId: info[2],
						pic: info[3],
						name: info[4],
						online: (info[5].match('onlinenow.gif'))?true:false,
						timestamp: info[6],
						text: (showVideos)?info[7]:info[7].replace(/<object.*?<\/object>/g, '<span class="disabled">[video disabled]</span>')
					};
				}
				//console.log(cmtInfo);
				if (currentCmtInfo[0] == null || cmtInfo[0].timestamp != currentCmtInfo[0].timestamp) {
					currentCmtInfo = cmtInfo;
					$(eCommentContent).empty();
					eCommentContent.appendChild(cmtDiv);
					d = new Date();
					for (j = 0; j < cmtInfo.length; j++) {
						reltime = (relativeDates) ? getRelTime(cmtInfo[j].timestamp) : cmtInfo[j].timestamp.replace(/\s\d{4}/, '');
						newDiv = e('div', {id: 'comments_'+j, innerHTML: '<div class="userpic"><a href="http://www.myspace.com/' + cmtInfo[j].friendId + '">' +
							'<img src="' + cmtInfo[j].pic + '" /></a></div>' + 
							'<div class="commenttext"><div class="commentinfo">' +
							'<span' + ((relativeDates)?' onmouseover="this.textContent=\'' + cmtInfo[j].timestamp + 
								'\'" onmouseout="this.textContent=\'' + reltime+'\'"':'') + '>' + reltime + '</span>' +
							'<a ' + ((cmtInfo[j].online)?'class="online"':'') + 'href="http://www.myspace.com/' + cmtInfo[j].friendId + '">' + 
								cmtInfo[j].name + '</a></div>' + cmtInfo[j].text +
							'<div class="reply">' +
							'<a>Reply \u00BB</a>\
							<div class="replybox"><form method="post" action="http://comments.myspace.com/index.cfm?fuseaction=user.ConfirmComment">\
							<input type="hidden" name="friendID" value="'+cmtInfo[j].friendId+'">\
							<textarea name="f_comments"></textarea>\
							<input type="submit" value="Send"></div>\
							</div>' + 
							'<div class="clear" />'
						});
						//newDiv.style.display = (j < cmtNum)?'block':'none';
						cmtDiv.appendChild(newDiv);
						
					}
					$('#commentsContent > div').hide();
					$('#commentsContent > div .replybox').hide();
					$('#commentsContent > div .reply a').click(function() {
						$(this).next().slideToggle();
					});
					$('#commentsContent > div:lt('+cmtNum+')').show();
					//$('#commentsContent .hidden').slideUp('slow');
					eCommentContent.appendChild(viewAll);
				}
			}
			else eCommentContent.innerHTML = '<div>No comments to display.</div>';
		}
	});
	//console.log(cmtInfo);
}

window.gm_updateComments = function() {
	getComments(cmtNum);
	window.setTimeout(window.gm_updateComments, refreshRate*1000);
}

function toggleAllComments() {
	if (eCommentContent.firstChild.childNodes[defCmtNum].style.display == 'none') {
		cmtNum = 50;
		viewAll.innerHTML = '<a>\u00AB Collapse</a>';
		$('#commentsContent > div').show();
	}
	else {
		cmtNum = defCmtNum;
		viewAll.innerHTML = '<a>View More \u00BB</a>';
		/*for (i = 0; i < document.getElementById('commentsContent').childNodes.length; i++) {
			document.getElementById('commentsContent').childNodes[i].style.display = (i < cmtNum)?'block':'none';
		}*/
		$('#commentsContent > div:gt('+(cmtNum-1)+')').hide();
	}
	/*for (i = 0; i < $('#commentsContent > *').length; i++) {
		$('#commentsContent').childNodes[i].style.display = (i < cmtNum)?'block':'none';
	}*/
	//$('#commentsContent > *').css('display', (i < cmtNum)?'block':'none');
}

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	}
	else { 
		$ = unsafeWindow.jQuery;
		letsJQuery(); 
	}
}

document.getElementsByTagName('head')[0].appendChild(e('script', {src: 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js', type: 'text/javascript'}));

GM_wait();

function letsJQuery() {
	if ($('#col3')) {
		friendId = $('#col1').html().match(/friendid=(\d+)/i)[1];
		token  = $('#col1').html().match(/MyToken=([\d\w-]+)/i)[1];
		addStyle();
		eComments = e('div', {id: 'comments', className: 'module', innerHTML: "<h4 class=\"top\"><div><div>\
			<span class=\"title\"><span id=\"commentsicon\"></span>Comments</span></span>\
			<div style=\"padding: 0pt; clear: both;\"></div>\
			</div></div></h4>\
			<div class=\"middle\"><div style=\"text-align: center; padding: 5px;\">\
			<img src=\"http://x.myspace.com/modules/common/static/img/loadercircles.gif\" /><br /><br />:: Loading Comments ::</div></div>\
			<div class=\"bottom\"><div><div>&nbsp;</div></div></div>"
		});
		eCommentContent = eComments.childNodes[2];
		position = position.split(' ');
		if (position[0] == 'before') $(eComments).insertBefore($('#'+position[1]));
		else $(eComments).insertAfter($('#'+position[1]));
		viewAll = e('div', {id: 'viewall'});
		if (defCmtNum < 50) {
			viewAll.innerHTML = '<a>View More \u00BB</a>';
			viewAll.addEventListener('click', toggleAllComments, false);
		}
		if (!document.getElementById('GM_Script_Links')) {
			GM_addStyle('#GM_Script_Links a {display:block;color:#CCC!important;}');
			$('#col1').append(e('p', {id: 'GM_Script_Links'}));
		}
		$('#GM_Script_Links').append('<a href="http://userscripts.org/scripts/show/24394">GM - Comments on Homepage</a>');
		cmtNum = defCmtNum;
		currentCmtInfo = [];
		getComments(cmtNum);
		window.setTimeout(window.gm_updateComments, refreshRate*1000);
	}
}