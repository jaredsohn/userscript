// ==UserScript==

// @name           other players to Youtube Player

// @description    يحول مشغل الصوتيات من مشغل jw player أو viral player إلى مشغل يوتيوب للفيديويات المستضافة على يوتيوب

// @license        GPL <http://www.gnu.org/licenses/gpl.html>

// @include        http://forum.shabir.tv/*

// ==/UserScript==



function replace(element, id) {

	// replace an <object> or <embed> by a thumbnail in a link

	div = document.createElement('div');

	div.innerHTML = '<object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/'+id+'?fs=1&amp;hl=en_US&amp;rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'+id+'?fs=1&amp;hl=en_US&amp;rel=0" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>';



element.parentNode.replaceChild(div, element);

}



function test(element, str) {

	// search for a known URL in str and replace element with an image link

	// shabir

      if(m = str.match(/http:\/\/.*youtube\..*\/watch\?v=([^\/&"]+)/)) {

		var id = m[1];

		replace(element, id);

	}

}



// iterate through <object> and <embed> elements

// we need arrays for safe iteration, i.e. make sure we don't miss some

// which can happen because some are replaced asynchronously and HTMLCollection is dynamic



var objects = Array.prototype.slice.call(document.getElementsByTagName('object'));

for(var i = 0; i < objects.length; i++) {

	var obj = objects[i];

	test(obj, obj.innerHTML);

}