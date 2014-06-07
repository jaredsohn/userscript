// ==UserScript==
// @name           YouTube Subscriber Info
// @description	   Displays information about Subscribers
// @author         sdddlt@googlemail.com
// @version        0.1.1
// @include        http://youtube.com/my_subscribers*
// @include        http://*.youtube.com/my_subscribers*
// ==/UserScript==


var stat_channelcount=0;
var allDivs, thisDiv, link;
var unloaded = false;

beginhtml();


window.addEventListener("unload", function(e) {
	unloaded = true;
}, false);

// find all subscriber links
allDivs = document.evaluate("//Table[@id='mySubscribersTable']/tbody[1]/tr[1]/td[2]/div[1]/b[1]/A[@href]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var divlinks = new Array(allDivs.snapshotLength);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	if(unloaded) 
		return;
	
	thisDiv = allDivs.snapshotItem(i);
	thisDiv = thisDiv+""; 
	divlinks[i] = thisDiv;
	// skipping double entries
	if(thisDiv.indexOf(divlinks[i-1]) != -1) {
		stat_channelcount++;
		continue;
	}

	// get page of each subscriber
	GM_xmlhttpRequest({
		method: 'GET',
		url: thisDiv,
		    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
		onerror: function(responseDetails) {
			
			alert('Server Error! Please reload the page.');
		},
		onload: function(responseDetails) {
			
			var channel = responseDetails.responseText;
			stat_channelcount++;
			var spos = 0;
			if(responseDetails.finalUrl.indexOf('user') != -1){
						spos = channel.indexOf('<div class="profile-box profile-highlightbox"');
			}
			
			if(spos > 0) {
				
				// *** set "Username"
				var pos_a = channel.indexOf('id="user-profile-username">', spos);
				var pos_b = channel.indexOf('</', pos_a);
				var username = channel.substring(pos_a + 'id="user-profile-username">'.length, pos_b);
				
				// *** set "Member Since"
				pos_a = channel.indexOf('id="user-profile-member-since">', pos_b);
				pos_b = channel.indexOf('</', pos_a);
				var joined = channel.substring(pos_a + 'id="user-profile-member-since">'.length, pos_b);
								
				// *** set "Last Login"
				pos_a = channel.indexOf('id="user-profile-last-login">', pos_b);
				pos_b = channel.indexOf('</', pos_a);
				var login = channel.substring(pos_a + 'id="user-profile-last-login">'.length, pos_b);
				if((login.indexOf('second')!=-1) || (login.indexOf('minute')!=-1) || (login.indexOf('hour')!=-1)){
					status = 1;
				}
				else if(login.indexOf('day') != -1){
					status = 2;
				}
				else if(login.indexOf('week') != -1){
					status = 3;
				}
				else if(login.indexOf('month') != -1){
					switch(login){
						case "1 month ago":	
							status = 4;
							break;
						case "2 months ago":
							status = 4;
							break;
						default:		
							status = 5;
					}
				}
				else if(login.indexOf('year') != -1){
					status = 6;
				}
				
				// *** set "Videos Watched"				
				pos_a = channel.indexOf('id="user-profile-video-watch-count">', pos_b);
				pos_b = channel.indexOf('</', pos_a);
				var watched = channel.substring(pos_a + 'id="user-profile-video-watch-count">'.length, pos_b);
				
				// show data
				renderhtml(username, joined, login, watched, status);		
			}
			else {;}			
			if(stat_channelcount == allDivs.snapshotLength){
				callthedead();
			}
		}
	});
}
return;

function renderhtml(username, joined, login, watched, status)
{
	var i=0;
	
	for (i = 0; i < allDivs.snapshotLength; i++) {
		if (divlinks[i].indexOf(username) != -1) {
			divlinks[i] = '';
			var color;
			switch (status) {
				case 1:
					//color = '#87FE93'; // green
					color = '#AF12FE'; // purple
					break;
				case 2:
					//color = '#ACFEB4'; // green
					color = '#BF40FE'; // purple
					break;
				case 3:
					//color = '#BDFEC3'; // green
					color = '#CC66FE'; // purple
					break;
				case 4:
					//color = '#CCFED1'; // green
					color = '#DB94FE'; // purple
					break;
				case 5:
					//color = '#E7FEE9'; // green
					color = '#E9BEFE'; // purple
					break;
				case 6:
					//color = '#F8FEF9';	// green
					color = '#F4E0FE'; // purple
					break;
			}
			main = document.getElementById('stats'+i); 
			var newElement;
			if (main){
				newElement = document.createElement("td");
				newElement.setAttribute("id","stats");
				newElement.setAttribute("width","30%");
				newElement.setAttribute("height","100%");
				newElement.style.verticalAlign = 'middle';
				newElement.innerHTML = '<div style="background-color:'+color+'; border-color:gray; border-width:0px; border-style:solid;padding-left:0.5em;padding-top:0.1em;padding-bottom:0.1em;">' +
				'<b> ' + username + '</b><br>' + 'Joined: ' + joined + '<br>' + 'Last Sign In: ' + login + '<br>' + 'Videos Watched: ' + watched + '</div>';
				main.parentNode.replaceChild(newElement, main);
			}					
		}
	}
}

function callthedead()
{
	var i=0;
	
	for (i = 0; i < allDivs.snapshotLength; i++) {
		if (divlinks[i].length > 0) {
			divlinks[i] = '';			
			main = document.getElementById('stats'+i);
			var newElement;
			if (main){
				newElement = document.createElement("td");
				newElement.setAttribute("id","stats"+i);
				newElement.setAttribute("width","30%");
				newElement.setAttribute("height","100%");
				newElement.setAttribute("align","center");
				newElement.style.verticalAlign = 'middle';
				newElement.innerHTML = '<div style=" border-color:gray; border-width:0px; border-style:solid;padding-left:0.5em;padding-top:0.1em;padding-bottom:0.1em;">' +
				'<p style="vertical-align:middle;color:red;font-size:1em;"> Closed / Suspended </p>' +
				'</div>';
				main.parentNode.replaceChild(newElement, main);
			}
		}
	}	
}

function beginhtml()
{
	var i=0;
	
	allDivs = document.evaluate("//Table[@id='mySubscribersTable']/tbody[1]/tr[1]/td[2]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; i < allDivs.snapshotLength; i++) {
			var main = allDivs.snapshotItem(i);
			var newElement;
			if (main){
				newElement = document.createElement("td");
				newElement.setAttribute("id","stats"+i);
				newElement.setAttribute("width","30%");
				newElement.setAttribute("height","100%");
				newElement.setAttribute("align","center");
				newElement.style.verticalAlign = 'middle';
				newElement.innerHTML = '<img src="http://s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif"/>';
				main.parentNode.appendChild(newElement, main);
			}
		}
	
}
