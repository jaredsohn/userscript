// ==UserScript==
// @name           MySpace Home - Redesign
// @namespace      RunningBlind
// @description    Transforms the MySpace Home into a Facebook-esque tab-based interface with automatically-updating bulletins, status messages, and comments.
// @include        http://home.myspace.com/*fuseaction=user*
// @exclude        *fuseaction=user.*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js
// @version        0.0.3a
// ==/UserScript==

var defaultTab = 'bulletins'; // bulletins | comments | friend-updates | tops
var refreshRate = 30; // the amount of time (in seconds) between page updates
var squareImages = true; // shapes images into squares for bulletins, statuses, and top friends
var statusLength = 20; // the number of your friends' status messages to appear in the sidebar

/* Don't edit below here unless you know what you're doing. */

var data = {bulletins: [], comments: [], status: [], updates: null, tops: [], post_bulletin_link: null};

function GM_log() {
	Array.forEach(arguments, function(value, key) {
		unsafeWindow.console.log(value);
	});
}

/* the request object holds methods that grab data from other pages, comparable to a "model" in an MVC framework */
request = {
	bulletins: function(fn) {

		GM_xmlhttpRequest({ 
			method: 'POST',
			url: 'http://bulletins.myspace.com/index.cfm?fuseaction=bulletin',
			headers: {'User-Agent': navigator.userAgent,
				'Content-type':'application/x-www-form-urlencoded'},
			data: '__EVENTTARGET=ctl00$ctl00$cpMain$cpMain$BulletinList$PagingBulletinsTop&'+
				'__EVENTARGUMENT=1&'+
				'___msPagerState=1000,50,1,-1,-1',
			onload: function(responseDetails) {

				html = responseDetails.responseText.replace(/[\t\r\n]/g, '');
				posts = [];

				bulletinExp = /<td class="userinfo"><a href="[^"]+&friendID=(\d+)"><img src="([^"]+)" \/><br \/>([^<]+)<\/a>.*?<\/td>.*?<td class="date">([^<]+)<\/td>.*?<td class="subject"><a href="[^"]+messageID=(\d+)[^"]+"><span [^>]+>([^<]+)<\/span>/g;
				arr = html.match(bulletinExp);

				arr.forEach(function (a,b,c) {
					a = bulletinExp.exec(a.match(bulletinExp));
					posts.push({
						user: {id: a[1], img: a[2].changeSize('s'), name: a[3].trim()},
						timestamp: a[4],
						id: a[5],
						subject: a[6]
					});
				});

				fn(posts);
			}
		});
	},
	comments: function(fn) {
		
		
		GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=' + userdata.id,
			headers: {'User-agent': navigator.userAgent},
			onload: function(responseDetails) {
				response = responseDetails.responseText.replace(/[\t\r\n]/g, '');
				comments = [];
				cmtExp = /profile_comments_(\d+).*?value="(\d+)".*?<a.*?href="[^"]+friendID=(\d+)".*?<img.*?src="(.*?)".*?title="([^"]+)"(.*?)<h4>([^<]+)<\/h4>.*?<span id="[^"]+">(.*?)<\/span>/g;
				match = response.match(cmtExp) || null;
				
				if (match) {
					match.forEach(function(comment, key) {
						comment = cmtExp.exec(comment.match(cmtExp));
						
						if (comment) {
						comments.push({
							id: comment[2],
							user: {
								id: comment[3], 
								img: comment[4], 
								name: comment[5] 
								//online: ((comment[5].match('onlinenow.gif')) ? true : false)
							},
							timestamp: comment[7],
							body: comment[8]
						});
					}

					});
					
					fn(comments);
					
				}
				
			}
		});
		
	},
	
	notifications: function(fn) {
		arr = [];
		
		$.get(window.location.href, null, function(data, textStatus) {
			data = data.replace(/[\t\r\n]/g, '');
			notifications = data.match(/<div id="updates" class="module">.*?<div class="middle"><div><div>(.*?<\/div>)<\/div>/)[1];

			if (notifications) {
				notifications = notifications.split('</div>');
				notifications.splice(notifications.length-1, 1);
				
				notifications.forEach(function (value, key) {
					value = value.match(/<a id="([^"]+)" href="([^"]+)">(.*?)<\/a>/);
					arr.push({
						id: value[1],
						href: value[2],
						text: value[3]
					});
				});
				fn(arr);
				
			}
		});
	},
	
	status: function(fn) {
		friendStatus = [];
		exp = /<tr>.*?src="([^"]+)".*?friendID=(\d+)[^>]+>(.*?)<\/a><\/span>(.*?)<small>(.*?)<\/small>(.*?)<\/tr>/g;
		
		GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://friends.myspace.com/index.cfm?fuseaction=profile.friendmoods',
			headers: {'User-agent': navigator.userAgent},
			onload: function(responseDetails) {
				response = responseDetails.responseText.replace(/[\t\r\n]/g, '');
				
				match = response.match(exp);
				if (match) {
					match.forEach(function(value, key) {

						status = exp.exec(value.match(exp)[0]);
						
						usermood = null;
						if (status[6].match(/<strong>/)) {
							usermood = status[6].match(/<\/strong>\s?(.*?)<\/span>/)[1];
						}
						
						usermoodimg = null;
						if (status[6].match(/<img/)) {
							usermoodimg = status[6].match(/src="([^"]+)"/)[1];
						}
						
						friendStatus.push({
							img: status[1],
							id: status[2],
							name: status[3],
							text: status[4].trim(),
							time: status[5],
							mood: usermood,
							moodimg: usermoodimg
						});
						
					});
					
					fn(friendStatus);
				}
			}
		});
	},
	
};

String.prototype.changeSize = function(newSize) {
	return this.replace(/[s|m|l]_/, newSize+'_');
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g ,'');
}

Date.prototype.getTwelveHourFormat = function() {
	half = (this.getHours() >= 12) ? 'PM' : 'AM';
	
	return ((half=='AM') ? this.getHours() : this.getHours() + 12) + ':' + this.getMinutes() + ' ' + half;
}

String.prototype.relativeTime = function (now) {
	var time = new Date(this.toString());
	var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
	
	relMinutes = (time-now) / (1000*60);
	relDays = (time-midnight) / (1000*60*60*24);
	
	if (relMinutes > -60) return Math.floor(relMinutes*-1)+' minute'+((Math.floor(relMinutes*-1) > 1)?'s':'')+' ago';

	else if (relMinutes > -720) return Math.floor(relMinutes/-60)+' hour'+((Math.floor(relMinutes*-1/60) > 1)?'s':'')+' ago';
	
	else {
		if (relDays >= -1) {
			if (relMinutes > -1440) return 'today at '+time.getTwelveHourFormat();
			else return 'yesterday';
		}
		else if (relDays > -7) {
			return Math.floor(relDays*-1)+' day'+((Math.floor(relDays*-1) > 0)?'s':'')+' ago';
		}
		else if (relDays > -42) {
			return Math.floor(relDays/-7)+' week'+((Math.floor(relDays/-7) > 0)?'s':'')+' ago';
		}
		else if (relDays > -182) {
			return months[time.getMonth()]+' '+time.getDate();
		} else return months[time.getMonth()]+' '+time.getDate()+', '+time.getFullYear();
		
	}
	
	return time.toString();
}

function array_diff (array) {
	// http://kevin.vanzonneveld.net
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: Sanjoy Roy
	// *     example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
	// *     returns 1: ['Kevin']
 
	var arr_dif = [], i = 1, argc = arguments.length, argv = arguments, key, key_c, found=false, cntr=0;
 
	// loop through 1st array
	for ( key in array ){
		// loop over other arrays
		for (i = 1; i< argc; i++){
			// find in the compare array
			found = false;
			for (key_c in argv[i]) {
				//if (argv[i][key_c] == array[key]) {
				if (argv[i][key_c].id == array[key].id) { // this line changed from original
					found = true;
					break;
				}
				
			}
 
			if(!found){
				//arr_dif[key] = array[key];
				arr_dif[cntr] = array[key];
				cntr++;
			}
		}
	}
 
	return arr_dif;
}

$(document).ready(function() {
	
	data.post_bulletin_link = $('#bulletins .link1').attr('href');
	data.updates = $('#friendUpdate .middle .result').html();

	friendExp = /friendID=(\d+).*?>(.*?)<\/a>.*?<img.*?src="([^"]+)"/;
	$('.friend').each(function() {
		info = $(this).html().replace(/[\t\r\n]/g, '').match(friendExp);
		data.tops.push({
			id: info[1],
			name: info[2].replace(/<wbr>/g, ''),
			img: info[3]
		});
	});

	userdata = {
		id: $('#displayimage').html().match(/friendid=(\d+)/i)[1],
		img: $('#displayimage').html().match(/src="([^"]+)"/)[1],
		token: $('#viewUL').html().match(/MyToken=([\w\d-]+)/)[1],
		status: {
			text: $('#hsmStatus').text(),
			time: $('#hsmTimestamp').text(),
			mood: $('#hsmMoodName').text(),
			img: $('#hsmMoodImage').attr('src')
		}
	};

	$('#mainContent').children().hide();
	
	$('head').append((<r><![CDATA[<style type="text/css">
		
		body {padding: 0 15px;}
		#header, #main {max-width: 1200px; min-width: 960px; width: auto !important; margin: 0 auto !important;}
		
		#mainContent {min-height: 600px;}
		
		#main-col {float: left; width: 63%; margin: 1%}
		
		#main-head {margin-bottom: 10px; }
		
		#main-head {margin: 10px;}
		#main-head > a {float: left; border: 1px solid #ccc; padding: 1px; background: #fff;}
		#status-wrap {margin-left: 105px;}
		#status-input-wrap {margin: 10px 0; border: 1px solid #ccc; padding: 3px; background: #fff; display: inline-block;}
		#status-input-wrap input {font-size: 110%;}
		#mood-picker input {border: 1px solid #ccc; background: #fff; padding: 2px; margin-right: 3px;}
		
		#content-container {}
		
		#tabs-nav {list-style: none; border-bottom: 1px solid #ccc;}
		#tabs-nav li {float: left;}
		#tabs-nav li a {display: block; margin: 0 0 -1px 5px; border: 1px solid #ccc; padding: 3px 8px;}
		#tabs-nav li a.active {border-bottom-color: #fff;}
		
		#tabs-container {}
		#tabs-container > li {display: none; padding: 10px;}
		#tabs-container > li.active {display: block;}
		
		#gm_bulletins li {overflow: auto; margin: 10px 0;}
		#gm_bulletins li > :first-child {float: left; border: 1px solid #ccc; padding: 1px;}
		#gm_bulletins li > :first-child a {}
		.square-images #gm_bulletins li > :first-child a {display: block; height: 60px; width: 60px; background: transparent none repeat scroll center top}
		#gm_bulletins li > :first-child a img {max-width: 60px; max-height: 60px;}
		#gm_bulletins li > :last-child {margin-left: 70px;}
		#gm_bulletins li > :last-child > :first-child {margin-bottom: 5px; overflow: auto;}
		#gm_bulletins li > :last-child > :first-child a {float: left; font-size: 110%;}
		#gm_bulletins li > :last-child > :first-child span {color: #999; float: right;}
		#gm_bulletins li > :last-child > :last-child {}
		
		#gm_comments li {overflow: auto; margin: 10px 0;}
		#gm_comments li > :first-child {float: left; border: 1px solid #ccc; padding: 1px;}
		#gm_comments li > :first-child a {}
		#gm_comments li > :first-child a img {}
		#gm_comments li > :last-child {margin-left: 100px;}
		#gm_comments li > :last-child > :first-child {margin-bottom: 5px; overflow: auto;}
		#gm_comments li > :last-child > :first-child a {float: left; font-size: 110%;}
		#gm_comments li > :last-child > :first-child span {color: #999; float: right;}
		#gm_comments li > :last-child > :last-child {}
		#gm_comments li .action {text-align: right; margin: 10px 0;}
		
		#gm_tops ul {margin-top: 10px;}
		#gm_tops li {overflow: hidden; float: left; width: 23%; height: 64px; margin: 1%;}
		#gm_tops li > :first-child {float: left; border: 1px solid #ccc; padding: 1px;}
		#gm_tops li > :first-child a {}
		.square-images #gm_tops li > :first-child a {display: block; width: 60px; height: 60px; background: transparent none repeat scroll center top}
		#gm_tops li > :first-child a img {max-width: 60px; max-height: 60px;}
		#gm_tops li > a {margin-left: 70px; display: block;}
		
		#gm_status li {overflow: hidden; margin: 10px 0; position: relative;}
		#gm_status li > :first-child {float: left; padding: 1px; border: 1px solid #ccc;}
		.square-images #gm_status li > :first-child a {width: 60px; height: 60px; display: block; background: transparent none repeat scroll center top}
		#gm_status li > :first-child img {max-height: 60px; max-width: 60px;}
		#gm_status li > div + div {margin-left: 75px; margin-right: 20px}
		#gm_status li > div + div span {color: #999;}
		#gm_status li > :last-child {position: absolute; top: 0; right: 0; margin: 0;}
		#gm_status li > :last-child a {background: transparent url(http://x.myspacecdn.com/Modules/HomeDisplay/Static/img/commonIcons007.gif) no-repeat scroll 0 -5953px; height: 13px; width: 18px; display: block; text-indent: -1000em; margin-bottom: 10px;}
		#gm_status li > :last-child a:last-child {background-position: 0 -6017px}
		
		
		#sidebar {float: right; width: 32%; margin: 1%; border: 1px solid #ccc; background: #eee; -moz-border-radius: 5px; padding: 5px 0;}
		#sidebar > div {margin: 0 5px}
		
	</style>]]></r>).toString());
	
	if (squareImages) {$('#mainContent').addClass('square-images')}
	$('#mainContent').append('<div id="main-col"></div>');
	
	$('#main-col').append('\
	<div id="main-head" class="clearfix">\
		<a href="http://www.myspace.com/'+userdata.id+'"><img src="'+userdata.img.changeSize('s')+'" /></a>\
		<div id="status-wrap">\
			<div id="status-input-wrap"><input id="status-input" type="text" size="50" value="'+userdata.status.text+'" /></div>\
			<p id="mood-picker"><input id="mood" type="text" size="10" value="'+userdata.status.mood+'" /><img src="'+userdata.status.img+'" /></p>\
		</div>\
	</div>');
	
	$('#status-input').bind('keyup', function(e) {
		if (e.keyCode == 13) {
			unsafeWindow.MySpace.Web.Profiles.Modules.HomeDisplay.Services.Home.SaveMoodStatus($('#mood').val(), $(this).val());
		}
	});
	
	$('#mood').bind('focus', function() {
		$('body').append('<div id=""><ul /></div>');
	});
	
	$('#main-col').append('<div id="content-container">\
		<ul id="tabs-nav" class="clearfix">\
			<li><a href="#gm_bulletins">Bulletins</a></li>\
			<li><a href="#gm_comments">Comments</a></li>\
			<li><a href="#gm_friend-updates">Updates</a></li>\
			<li><a href="#gm_tops">Tops</a></li>\
		</ul>\
		<ul id="tabs-container">\
			<li id="gm_bulletins"><ul /></li>\
			<li id="gm_comments"><ul /></li>\
			<li id="gm_friend-updates"><div id="friendUpdates"><div class="result"></div></div></li>\
			<li id="gm_tops"></li>\
		</ul>\
	</div>');
	
	$('#mainContent').append('<div id="sidebar"></div>');
	
	$('#sidebar').append('<div id="gm_updates"><ul /></div>');
	
	$('#sidebar').append('<div id="gm_status"><ul /></div>');
	
	$('#tabs-nav a[href=#gm_'+defaultTab+'], #gm_'+defaultTab).addClass('active');
	
	$('#tabs-nav a').click(function() {
		
		$('#tabs-nav .active, #tabs-container .active').removeClass('active');
		$(this).addClass('active');
		$(this.hash).addClass('active');
		
		return false;
	});
	
	$('#gm_bulletins').prepend('<a href="'+data.post_bulletin_link+'">Post Bulletin</a> | <a href="http://bulletins.myspace.com/index.cfm?fuseaction=bulletin">View All</a>');
	
	$('#gm_tops').append('Friends: <a href="http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID='+userdata.id+'">All</a> | <a href="http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID='+userdata.id+'&view=online">Online</a> | <a href="http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID='+userdata.id+'&view=new">New</a> | <a href="http://friends.myspace.com/index.cfm?fuseaction=user.birthdays">Birthdays</a>');
	
	$('#gm_friend-updates div div').html(data.updates);
	
	$('#gm_tops').append('<ul />');
	data.tops.forEach(function(value, key) {
		$('#gm_tops ul').append('<li>\
			<div><a href="http://www.myspace.com/'+value.id+'"'+((squareImages) ? ' style="background-image: url('+value.img+')">': '><img src="'+value.img+'" alt="'+value.name+'" />')+'</a></div>\
			<a href="http://www.myspace.com/'+value.id+'">'+value.name+'</a></li>\
		');
	});
	
	window.gm_update();
	window.setInterval(window.gm_update, refreshRate*1000);
	
});

window.gm_update = function() {
	now = new Date();
	
	request.comments(function(comments) {
		if (data.comments.length > 0) {
			comments = array_diff(comments, data.comments);
			data.comments = data.comments.concat(comments);
			//GM_log('comments', comments);
		} 
		else {
			data.comments = comments;
			comments.reverse();
		}
		
		comments.forEach(function(value, key) {
			$('#gm_comments ul').prepend('\
			<li>\
				<div><a href="http://www.myspace.com/'+value.user.id+'"><img src="'+value.user.img+'" alt="'+value.user.name+'" /></a></div>\
				<div>\
					<p><a href="http://www.myspace.com/'+value.user.id+'">'+value.user.name+'</a><span>'+value.timestamp+'</span></p>\
					<div>'+value.body+'</div>\
					<p class="action"><a href="http://comment.myspace.com/index.cfm?fuseaction=user.viewProfile_commentForm&friendID='+value.user.id+'">Reply</a> | <a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.message&friendID='+value.user.id+'">Send Message</a></p>\
				</div>\
			</li>\
			');
		})
	});
	
	request.bulletins(function(bulletins) {
		if (data.bulletins.length > 0) {
			bulletins = array_diff(bulletins, data.bulletins);
			data.bulletins = data.bulletins.concat(bulletins);
			GM_log('bulletins', bulletins);
		} 
		else {
			data.bulletins = bulletins;
			bulletins.reverse();
		}
		
		bulletins.forEach(function(value, key) {
			$('#gm_bulletins ul').prepend('\
			<li>\
				<div><a href="http://www.myspace.com/'+value.user.id+'"'+((squareImages) ? ' style="background-image:url('+value.user.img+')">' : '><img src="'+value.user.img+'" alt="'+value.user.name+'" />')+'</a></div>\
				<div>\
					<p><a href="http://www.myspace.com/'+value.user.id+'">'+value.user.name+'</a><span>'+value.timestamp.relativeTime(now)+'</span></p>\
					<p><a href="http://bulletins.myspace.com/index.cfm?fuseaction=bulletin.read&authorID='+value.user.id+'&messageID='+value.id+'&MyToken='+userdata.token+'">'+value.subject+'</a></p>\
				</div>\
			</li>\
			');
		});

	});
	
	request.notifications(function(updates) {
		$('#gm_updates ul').empty();
		updates.forEach(function(value, key) {
			$('#gm_updates ul').append('<li><a id="'+value.id+'" href="'+value.href+'">'+value.text+'</a></li>');
		});
	});
	
	request.status(function(status) {
		update = true;
		
		if (data.status.length > 0) {
			if (data.status.toSource() == status.toSource()) {
				update = false;
			}
		} else {
			data.status = status;
		}
		
		if (update) {
			$('#gm_status ul').empty();
	
			status.forEach(function(value, key) {
				if (key < statusLength) {
					$('#gm_status ul').append('\
					<li>\
						<div><a href="http://www.myspace.com/'+value.id+'"'+((squareImages) ? ' style="background-image:url('+value.img+')">' : '><img src="'+value.img+'" alt="'+value.name+'" />')+'</a></div>\
						<div>\
							<p><a href="http://www.myspace.com/'+value.id+'">'+value.name+'</a> '+value.text+' <span>'+value.time+'</span></p>\
							<p>Mood: '+((value.mood) ? value.mood : '(none)')+((value.moodimg) ? ' <img src="'+value.moodimg+'" />' : '')+'</p>\
						</div>\
						<div>\
							<a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.message&friendID='+value.id+'">Send Message</a>\
							<a href="http://comment.myspace.com/index.cfm?fuseaction=user.viewProfile_commentForm&friendID='+value.id+'">Add Comment</a>\
						</div>\
					</li>');
				}
			});
			//$('#gm_status ul li:gt('+statusLength+')').hide();
		}
	});
	
}