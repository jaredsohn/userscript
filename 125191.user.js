// ==UserScript==
// @name clickFeedWOW
// @namespace clickFeedWOW101
// @author 1001musicvideo
// @include http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @match http://www.playdom.com/games/wildones/play#/home
// @run-at document-end
// @version 0.1
// ==/UserScript==

function clickFeed(){
	alert('test1');
	$.each($('#play_feed').find('a'), function(idx, val){
                alert('test2');
		if(val.text == 'Add Them!'||val.text == 'Help Them!'||val.text == 'Like Outfit' ||val.text == 'Welcome Them!'||val.text == 'Claim your Prize!'){
                        alert('test3');
			val.click();
                        alert(val.text);
                        alert('test4');
		}
	})
}
setInterval(clickFeed, 10000);