// ==UserScript==
// @version       1.1.0
// @include       https://www.fanfiction.net/s/*
// @namespace     FFnet Background Music
// @name          FFnBGM
// @author        ToumaFF
// @description   Adds BGM to your stories.
// ==/UserScript==

// var css = 'input[type="range"] {\
//     -webkit-appearance: none;\
//     background-color: black;\
//     opacity: 0.3;\
//     outline: 2px solid grey;\
//     height: 30px;\
//     width: 100px;\
//     -webkit-transform:rotate(90deg);\
//     -moz-transform:rotate(90deg);\
//     -o-transform:rotate(90deg);\
//     -ms-transform:rotate(90deg);\
//     transform:rotate(90deg);\
//     z-index: 0;\
// }\
// \
// input[type="range"]::-webkit-slider-thumb {\
//     -webkit-appearance: none;\
//     background-color: #666;\
//     position: relative;\
//     opacity: 0.8;\
//     width: 10px;\
//     height: 30px;\
// }',
//     head = document.getElementsByTagName('head')[0],
//     style = document.createElement('style');

// style.type = 'text/css';
// if (style.styleSheet){
//   style.styleSheet.cssText = css;
// } else {
//   style.appendChild(document.createTextNode(css));
// }

// head.appendChild(style);


if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

$(document).ready(function() {
    $('#storytextp').attr('style', 'padding: 0px 0.5em; -webkit-user-select: all !important;');
});

function scrollValue() {
	var val = document.body.scrollTop * 100 / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
	val = Math.round(val);
	return val
}

//Get story text and split
var storyText = document.getElementById("storytext").outerHTML;
var t1 = storyText.indexOf("-=BGM=-"), t2 = storyText.lastIndexOf("-=BGM=-");
var bgText = storyText.substr(t1,t2);

storyText = storyText.replace(bgText,"<strong> ~ [BGM Loaded! Thank you for using FFnBGM.] ~ </strong>"); //clean up
document.getElementById("storytext").outerHTML = storyText;

bgText = bgText.split('</p><p>');
bgText = bgText.slice(1,-1);


var vDict = {}; // store youtube vids with corresponding %

bgText.map(function (item) {
	var s = item.split(" ");
	if (s[1][0] == "0") {
		s[1] = s[1].replace("0","");
	};

	vDict[s[1].replace("%", "")] = s[0];
})

var vidElem; 
var vidMask;
for (var key in vDict) { //creates the youtube player, if no playlist found, do not display.
	vidElem = document.createElement("div");
	// vidElem.innerHTML = '<embed height="0" width="0" src="http://youtube.googleapis.com/v/' + vDict[key] + '&autoplay=1&loop=1" />';
	vidElem.style.position = "fixed";
	vidElem.style.top = '3px';
    vidElem.style.right = '3px';
	vidElem.style.width = '40px';
    vidElem.style.height = '25px';
	var v_id = vDict[key]
	vidElem.name = 'has playlist';
	vidElem.innerHTML ='<object width="100" height="56.25">\
<param name="movie" value="https://www.youtube.com/v/{0}?autoplay=1&enablejsapi=1&loop=1&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&theme=light&version=3"></param>\
  <param name="allowFullScreen" value="false"></param>\
  <param name="allowScriptAccess" value="always"></param>\
<embed src="https://www.youtube.com/v/{0}?autoplay=1&enablejsapi=1&loop=1&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&theme=light&version=3" type="application/x-shockwave-flash" allowfullscreen="false" allowScriptAccess="always" width="100" height="56.25"></embed>\
</object>'.format(v_id);
    document.body.appendChild(vidElem);

    vidMask = document.createElement('div');
    vidMask.setAttribute("style", "top: 0px; right: 0px; width: 37px; height: 55px; border-style:solid; pointer-events:none;border-width: 4px;position:fixed;border-color: #F8F7E9;");
    document.body.appendChild(vidMask);

	break;
};


var scrollCounter = document.createElement("div");

scrollCounter.style.position = 'fixed';
scrollCounter.style.width = "20px";
scrollCounter.style.height = "20px";
scrollCounter.style.background = "#E4E3D5";
scrollCounter.style.color = "grey";
scrollCounter.innerHTML = "0";
scrollCounter.style.outline = '1px solid grey';
scrollCounter.style.bottom = '1px'; scrollCounter.style.right = '0px';
document.body.appendChild(scrollCounter);

// function updateVol(val) {
// 	console.log(val);
// }

// var volumeBar = document.createElement("div");

// volumeBar.style.position = 'fixed';
// volumeBar.style.width = "100px";
// volumeBar.style.height = '30px';
// volumeBar.style.top = '65px'; volumeBar.style.right = '-33px'
// volumeBar.innerHTML = '<input type="range" id="volume-bar" min="100" max="1" step="1" value="75" onchange="console.log(this.value)">';
// // volumeBar.onchange = function()
// document.body.appendChild(volumeBar);


function playBGM(vid_id) {
	vidElem.innerHTML ='<object width="100" height="56.25">\
<param name="movie" value="https://www.youtube.com/v/{0}?autoplay=1&enablejsapi=1&loop=1&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&theme=light&version=3"></param>\
  <param name="allowFullScreen" value="false"></param>\
  <param name="allowScriptAccess" value="always"></param>\
<embed src="https://www.youtube.com/v/{0}?autoplay=1&enablejsapi=1&loop=1&modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&theme=light&version=3" type="application/x-shockwave-flash" allowfullscreen="false" allowScriptAccess="always" width="100" height="56.25"></embed>\
</object>'.format(vid_id);
	vidElem.name = vid_id;
}


function main() {
	var scroll = scrollValue()
	scrollCounter.innerHTML = "<center>" + scroll + "</center>";
	if (scroll in vDict) {
		if (vDict[scroll] != vidElem.name) {
			playBGM(vDict[scroll]);
		}

	};
}


setInterval(main,10);