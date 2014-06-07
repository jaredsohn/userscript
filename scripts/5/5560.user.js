// ==UserScript==
  // @name				RvB Alerts
  // @creator			Jon Peterson
  // @contributor		http://www.redvsblue.com/joequincy
  // @contributor		http://www.redvsblue.com/ijay
  // @contributor		http://www.redvsblue.com/kwierso
  // @description		Displays a box when you have one or more new alert on RvB, which provides links to check those alerts.
  // @version			3.0.0
  // @ff_max_version	3.0.*
  // @include			*
  // @exclude			http://*.roosterteeth.com/*
// ==/UserScript==

// Site Preference:  Change to your favorite color scheme (rvb, ah, sh, magic, panics, delta) */
var page="rvb";

// Distance to offset Alert Box from the top of the page (keep in mind that some sites like Google
// have controls at the top of the page, so you want to leave room so you don't block them.) 
// Can be a percentage or a pixel value | 'default'=='20%' |
topDist = 'default';

// ALERT ICONS:  These should be "default" or the URL of an image no more than 12px high. 
message = 'default';
friend = 'default';
comment = 'default';
blog = 'default';
news = 'default';
comic = 'default';
video = 'default';


/*
 Please do not edit beyond this point.
 
 If you are a developer and you are trying to improve functionality,
 I (joequincy) will upload a version of this script with copious documentation
 in comments. Please refer to that script for development.
*/

function makeRequest(msgIcon, friendIcon, commentIcon, blogIcon, newsIcon, comicIcon, vidIcon, roosterIcon, minimizeIcon, maximizeIcon, offsetT) {
GM_xmlhttpRequest({
  method:"GET",
  url:"http://www.roosterteeth.com/members/index.php",
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/monkey,text/xml",
    }, 
  onload: function(details) {
			var response=details.responseText;
			var site=page+'.roosterteeth.com';
			var html = "";
			var spanStart = '&nbsp;&nbsp;<span>';
			var spanEnd = '</span>';
			var alertsGrabber=/<td id=\'myAlerts\'>([\w\W]*?)<\/td>/i;
			var linkFixer=/a href=\'/ig;
			var noNew=/You have no new alerts\./gmi;
			var alertsLength=alertsGrabber.test(response);
			if(alertsLength == true) {
				alertsText=alertsGrabber.exec(response)[1];
				alertContent=alertsText.replace(/href=\'/g,"href='http://"+site);
				html+= alertContent;
				show = true;
				if(alertContent.search(noNew)!=-1) {
					show = false;
				}
			}else{
				html+= '';
				show = false;
			}
			html+= '<br><span style="bottom: 2px; position: absolute; right: 2px; display: block; margin-top: 34px;"><a href="javascript:document.getElementById('+"'GM_RvBNotify'"+').setAttribute('+"'style'"+','+"'display:none !important'"+');document.getElementById('+"'GM_RvBMini'"+').setAttribute('+"'style'"+','+"'display:block !important'"+');void(0);"><img src="'+minimizeIcon+'"></a></span>';
			minDiv = '<a href="javascript:document.getElementById('+"'GM_RvBNotify'"+').setAttribute('+"'style'"+','+"'display:block !important'"+');document.getElementById('+"'GM_RvBMini'"+').setAttribute('+"'style'"+','+"'display:none !important'"+');void(0);"><img src="'+maximizeIcon+'"></a>';
			if(show) {
				var notifier = document.createElement('div');
				notifier.setAttribute('id', 'GM_RvBNotify');
				notifier.innerHTML = html;
				document.body.appendChild(notifier);
				var minimized = document.createElement('div');
				minimized.setAttribute('id', 'GM_RvBMini');
				minimized.innerHTML = minDiv;
				document.body.appendChild(minimized);
				GM_addStyle('#GM_RvBNotify {' +
					'display:block!important;' +
					'position:fixed!important;' +
					'top:'+offsetT+'!important;' +
					'min-height:24px!important;' +
					'left:2px;!important;' +
					'z-index:9999!important;' +
					'width:250px!important;' +
					'background:#F4F4F4 url('+ roosterIcon +') no-repeat!important;' +
					'background-position:top right!important;' +
					'border:2px solid #BBCCE1!important;' +
					'text-align:left!important;' +
					'padding:4px!important;}' +
					'#GM_RvBNotify a {' +
					'display:inline!important;' +
					'color:#B22222!important;' +
					'text-decoration:none!important;' +
					'line-height:8px;' +
					'font:normal 12px Arial, serif!important;}' +
					'#GM_RvBNotify a:hover {' +
					'text-decoration:none!important;}' +
					'#GM_RvBNotify a:hover span {' +
					'text-decoration:underline!important;}' +
					'#GM_RvBNotify br {display:inline!important}' +
					'#GM_RvBNotify img {width:12px!important;border:none!important}' +
					'#GM_RvBMini {' +
					'display:none!important;' +
					'background-color:#F4F4F4!important;' +
					'position:fixed!important;' +
					'top:'+offsetT+'!important;' +
					'left:2px;!important;' +
					'z-index:9999!important;' +
					'width:12px!important;' +
					'border:2px solid #BBCCE1!important;' +
					'text-align:left!important;' +
					'padding:3px 2px 2px 3px!important;}' +
					'#GM_RvBMini img {width:12px!important;border:none!important}'
				);
				function linkIcons() {
					var chosenOne = document.getElementById("GM_RvBNotify");
					var links = document.getElementsByTagName("a", chosenOne);
					for (i=0; i < links.length; i++) {
						var currentLink = links[i];
						var storeText = currentLink.innerHTML;
						var images = currentLink.getElementsByTagName("img");
						if (images.length == 0 && currentLink.innerHTML.indexOf('news') != -1) {
							currentLink.innerHTML = '';
							var newImg=document.createElement('img');
							newImg.setAttribute('src', newsIcon);
							currentLink.appendChild(newImg);
							currentLink.innerHTML = currentLink.innerHTML + spanStart + storeText +spanEnd;
						}
						if (images.length == 0 && currentLink.innerHTML.indexOf('blog') != -1) {
							currentLink.innerHTML = '';
							var newImg=document.createElement('img');
							newImg.setAttribute('src', blogIcon);
							currentLink.appendChild(newImg);
							currentLink.innerHTML = currentLink.innerHTML + spanStart + storeText +spanEnd;
						}
						if (images.length == 0 && currentLink.innerHTML.indexOf('video') != -1) {
							currentLink.innerHTML = '';
							var newImg=document.createElement('img');
							newImg.setAttribute('src', vidIcon);
							currentLink.appendChild(newImg);
							currentLink.innerHTML = currentLink.innerHTML + spanStart + storeText +spanEnd;
						}
						if (images.length == 0 && currentLink.innerHTML.indexOf('comic') != -1) {
							currentLink.innerHTML = '';
							var newImg=document.createElement('img');
							newImg.setAttribute('src', comicIcon);
							currentLink.appendChild(newImg);
							currentLink.innerHTML = currentLink.innerHTML + spanStart + storeText +spanEnd;
						}
						if (images.length == 0 && currentLink.innerHTML.indexOf('friend') != -1) {
							currentLink.innerHTML = '';
							var newImg=document.createElement('img');
							newImg.setAttribute('src', friendIcon);
							currentLink.appendChild(newImg);
							currentLink.innerHTML = currentLink.innerHTML + spanStart + storeText +spanEnd;
						}
						if (images.length == 0 && currentLink.innerHTML.indexOf('message') != -1) {
							currentLink.innerHTML = '';
							var newImg=document.createElement('img');
							newImg.setAttribute('src', msgIcon);
							currentLink.appendChild(newImg);
							currentLink.innerHTML = currentLink.innerHTML + spanStart + storeText +spanEnd;
						}
						if (images.length == 0 && currentLink.innerHTML.indexOf('comment') != -1) {
							currentLink.innerHTML = '';
							var newImg=document.createElement('img');
							newImg.setAttribute('src', commentIcon);
							currentLink.appendChild(newImg);
							currentLink.innerHTML = currentLink.innerHTML + spanStart + storeText +spanEnd;
						}
					}
				}
				linkIcons();
			} else{
			GM_addStyle('#GM_RvBNotify {' +
					'display:none!important;}'
					);
			}
  }
});
}
rooster = 'http://pnwebs.com/misc/rvbicons/rt.gif';
if(message=='default'){
	message = 'http://pnwebs.com/misc/rvbicons/message.png';
}
if(friend=='default'){
	friend = 'http://pnwebs.com/misc/rvbicons/friend.png';
}
if(comment=='default'){
	comment = 'http://pnwebs.com/misc/rvbicons/comment.png';
}
if(blog=='default'){
	blog = 'http://pnwebs.com/misc/rvbicons/blog.png';
}
if(comic=='default'){
	comic = 'http://pnwebs.com/misc/rvbicons/comic.png';
}
if(news=='default'){
	news = 'http://pnwebs.com/misc/rvbicons/news.png';
}
if(video=='default'){
	video = 'http://pnwebs.com/misc/rvbicons/video.png';
}
minimize = 'http://pnwebs.com/misc/rvbicons/minimize.png';
maximize = 'http://pnwebs.com/misc/rvbicons/maximize.png';
if(topDist = 'default'){
	topDist = '20%';
}
if(top.location == location) {
	makeRequest(message, friend, comment, blog, news, comic, video, rooster, minimize, maximize, topDist);
}