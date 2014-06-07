// ==UserScript==
  // @name				RT Alerts (Mini)
  // @creator			Jon Peterson
  // @contributor		http://www.roosterteeth.com/joequincy
  // @contributor		http://www.roosterteeth.com/ijay
  // @contributor		http://www.roosterteeth.com/kwierso
  // @description		A simple popup showing your RT alerts while browsing other sites!
  // @version			3.0.0
  // @ff_max_version	3.0.*
  // @include			*
  // @exclude			http://*.roosterteeth.com/*
  // @exclude			http://roosterteeth.com/*
// ==/UserScript==

// Site Preference:  Change to your favorite color scheme (rvb, ah, sh, magic, panics, delta) */
var page="rvb"; // Not an active feature.

// Distance to offset Alert Box from the top of the page (keep in mind that some sites like Google
// have controls at the top of the page, so you want to leave room so you don't block them.) 
// Can be a percentage or a pixel value | 'default'=='2px' |
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
			var alertsGrabber=/<a class=\'userInfo\' style=\'opacity:0.5;\' href=\'\/members\/\'>([\w\W]*?)<\/a>/i;
			var linkFixer=/a href=\'/ig;
			var noNew=/You have new alerts\./gmi;
			var alertsLength=alertsGrabber.test(response);
			if(alertsLength == true) {
				alertsText=alertsGrabber.exec(response)[1];
                
                html+="<a href=\'http://"+site+"/members/index.php\'>" + alertsText + "</a>";
				alertContent=alertsText.replace(/href=\'/g,"href='http://"+site+"/members/index.php");
				//html+= alertContent;
				show = true;
				if(alertContent.search(noNew)!=-1) {
					show = false;
				}
			}else{
				html+= '';
				show = false;
			}
           
			html+= '<br><span style="bottom: 2px; position: absolute; right: 2px; display: block; margin-top: 34px;"><a href="javascript:document.getElementById('+"'GM_RTNotify'"+').setAttribute('+"'style'"+','+"'display:none !important'"+');document.getElementById('+"'GM_RTMini'"+').setAttribute('+"'style'"+','+"'display:block !important'"+');void(0);"><img src="'+minimizeIcon+'"></a></span>';
			minDiv = '<a href="javascript:document.getElementById('+"'GM_RTNotify'"+').setAttribute('+"'style'"+','+"'display:block !important'"+');document.getElementById('+"'GM_RTMini'"+').setAttribute('+"'style'"+','+"'display:none !important'"+');void(0);"><img src="'+maximizeIcon+'"></a>';
			if(show) {
				var notifier = document.createElement('div');
				notifier.setAttribute('id', 'GM_RTNotify');
				notifier.innerHTML = html;
				document.body.appendChild(notifier);
				var minimized = document.createElement('div');
				minimized.setAttribute('id', 'GM_RTMini');
				minimized.innerHTML = minDiv;
				document.body.appendChild(minimized);
				GM_addStyle('#GM_RTNotify {' +
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
					'#GM_RTNotify a {' +
					'display:inline!important;' +
					'color:#B22222!important;' +
					'text-decoration:none!important;' +
					'line-height:8px;' +
					'font:normal 12px Arial, serif!important;}' +
					'#GM_RTNotify a:hover {' +
					'text-decoration:none!important;}' +
					'#GM_RTNotify a:hover span {' +
					'text-decoration:underline!important;}' +
					'#GM_RTNotify br {display:inline!important}' +
					'#GM_RTNotify img {width:12px!important;border:none!important}' +
					'#GM_RTMini {' +
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
					'#GM_RTMini img {width:12px!important;border:none!important}'
				);
			} else{
			GM_addStyle('#GM_RTNotify {' +
					'display:none!important;}'
					);
			}
  }
});
}
rooster = 'http://www.jlachance.com/addons/rtalerts/images/icons/rt.gif';
minimize = 'http://www.jlachance.com/addons/rtalerts/images/icons/minimize.png';
maximize = 'http://www.jlachance.com/addons/rtalerts/images/icons/maximize.png';
if(topDist = 'default'){
	topDist = '2px';
}
if(top.location == location) {
	makeRequest(message, friend, comment, blog, news, comic, video, rooster, minimize, maximize, topDist);
}