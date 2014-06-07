// ==UserScript==
// @name	  		I Have YME
// @author			Mark Husson <mhusson atte gmail dought com>
// @description		Auto-Initialization of YME when clicking links to lauch the app. Only install this script if you have YME. See notes for the auto-back feature.
// @namespace		http://michaelhusson.com/mark/greasemonkey/
// @include		 	http://yme.music.yahoo.com/ymeNav/ym*

// v0.2 - works again. tested with GM 0.5.3 on 9/13/05

// Note: If you want to bypass clicking the "back" link/button every time, change autoBackButton to true.

// ==/UserScript=

var autoBackButton = true;
var everything = document.getElementsByTagName('div')[0];

if(everything.innerHTML.indexOf("If you know you have the Yahoo") > 0){
	everything.innerHTML += "<iframe src='"+document.getElementsByTagName("a")[0].href+"' style='display:none;'></iframe>";
	if(autoBackButton == true){
		setTimeout("history.back();", 2000);
		everything.innerHTML = "<p>Launching Yahoo! Music Engine, please wait...</p>";
	}else{
		everything.innerHTML = "<img src='http://us.music1.yimg.com/yme.music.yahoo.com/common/resources/us/en/images/yme_logo.gif'><br><p>Loading item in Yahoo! Music Engine, Please wait...</p><p>If you came from a webpage, <a href='javascript:history.back();'>click here</a> to go back to whatever you were reading</p>";
	}
}
