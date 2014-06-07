// ==UserScript==
// @name        Endomondo tweaker
// @namespace   http://www.endomondo.com/home
// @include     http://www.endomondo.com/home
// @include     http://www.endomondo.com/profile/*
// @version     1
// @grant		none
// ==/UserScript==

var styleText = "\n\
#menuSearch {width: 284px; }\n\
#menuSearch .searchField {width: 284px !important; }\n\
#menuSearch .inputField { width: 243px !important; }\n\
.column.news {width: 679px}\n\
.newsItems {width: 679px} \n\
.newsMessage { width:600px !important}\n\
.newsDetails { min-height: 0}\n\
.comments-list .commentItem { padding-bottom: 3px }\n\
.commentItem .date { display: inline}\n\
.commentInput .comment-input textarea { width:590px }\n\
a.thumbnailLink .thumbnailImage {width: auto; height: 40px}\n\
.newsItem { padding: 0}\n\
a.thumbnailLink {width: auto; height: auto}\n\
a.thumbnailLink .thumbnailBadge { opacity: 0.3}\n\
#lowerSidebar, .importContacts {display: none; }\n\
.profileMain {width: 996px;}\n\
.comments {padding: 3px 0 0 53px !important;} \n\
.commentInput .comment-input textarea {width: 611px}\n\
.profile-badge {left: 20px !important; top: 5px !important; padding-bottom: 0 !important;}\n\
";     
	
var style = document.createElement('style');
style.type="text/css";
style.textContent = styleText;
document.body.appendChild(style);

if(document.location.href.indexOf('endomondo.com/profile') != -1)
{
    document.getElementsByClassName('profileMain')[0].appendChild(document.getElementsByClassName('profile-badge')[0]);
    document.getElementsByClassName('profileMain')[0].appendChild(document.getElementsByClassName('profileMain')[0].children[0])
}


if(typeof document.getElementsByClassName('widget')[0].children[0] !== "undefined" && document.getElementById('menuSearch') != null)
{
	document.getElementsByClassName('widget')[0].children[0].appendChild(document.getElementById('menuSearch'));
}
function calculateSpeedAndPace(){
	var timeRegex = /(\d+.\d+) ([k|m][m|i])\D*((\d+)[d]:)?((\d+)[h|t|g]:)?((\d+)m:)?((\d+)s)?/;
	var elements = document.getElementsByClassName('pathLink');
	for(var i = 0, e = elements.length; i < e; i++)
	{   
		var span = elements[i].getElementsByTagName('span');
		if(span.length == 1){
			var result = span[0].innerHTML.match(timeRegex);
			if(result && result[8] && result[1]){
				var timeSeconds = ((result[4])?parseInt(result[4])*86400:0)+((result[6])?parseInt(result[6])*3600:0)+parseInt(result[8])*60+parseInt(result[10]);
				var distance = parseFloat(result[1]);
				var speed = (distance/timeSeconds*3600).toFixed(2)+result[2]+'/h';
				var pace = (timeSeconds/60/distance).toFixed(2)+'min/'+result[2];
				elements[i].getElementsByTagName('span')[0].innerHTML = elements[i].getElementsByTagName('span')[0].innerHTML+"<span> | "+speed+" | "+pace+"</span>";	
			}
		}
	}
}


function moreListener()
{
	setTimeout(setListener,4000);
}
function setListener(){
	var more = document.getElementsByClassName('moreBlock')[0];
	more.addEventListener('click', moreListener, false);
	calculateSpeedAndPace();
}

setListener();
calculateSpeedAndPace();
