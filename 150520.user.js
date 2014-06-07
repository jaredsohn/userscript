// ==UserScript==
// @name            MotherLess Optimaliser
// @namespace       MoLeOpt
// @include         http://*motherless.com/*
// @homepage        http://userscripts.org/scripts/show/150520
// @updateurl       http://userscripts.org/scripts/source/150520.user.js
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version         0.6
// ==/UserScript==

function contentEval(source) {
    if (typeof source == 'function') { source = '(' + source + ')();'; }
    
    var script = document.createElement('script');
    script.setAttribute('type', 'application/javascript');
    script.textContent = source;
    
    document.body.appendChild(script);
    document.body.removeChild(script);
}


// Homepage cleanup
$(function() {
    if(Cookies.get('anonymous_notice') == null) {
        Cookies.set('anonymous_notice', 2, 1);
        $("#anonymous-notice").fadeOut();
    }
});
$('#most_viewed_today').css('display','none'); 


// Remove some ads
/*
document.getElementById('taskbar').style.display = "none";
document.getElementById('media-ad-thumbs').style.display = "none";
document.getElementById('top-referers-row').style.display = "none";
document.getElementById('anonymous-notice').style.display = "none";
*/
var commentshtml = $('.right-side.comments').html();
$('.right-side.comments').remove();
$('.right-side.sidebar').html(commentshtml).attr("rowspan", 2);
$('#media-comments-wrapper').height('1300px');
$('#spot_view_sb_3').css('display','none');  
$('.footer-ads').css('display','none');  
$('#taskbar').css('display','none');  
$('#media-ad-thumbs').css('display','none');  
$('#top-referers-row').css('display','none');  
$('#anonymous-notice').css('display','none');  


var I_Have_A_Realy_Old_Browser = false; // Set this to true if you use IE7, FF3.5 or CHROME10 ( or older )

var re = /http:\/\/.+\d\.flv\/.+\.flv/;
var str = document.getElementById('media-media').innerHTML;
var link = str.match(re, "$1");

if (I_Have_A_Realy_Old_Browser) {
	if (link !== null) {
		document.getElementById('media-media').innerHTML += '<h2><br><a href="' + link + '?start=0">Direct Download</a></h2>';
	}
} else {
	GM_xmlhttpRequest({
		url: link + '?start=0',
		method: "HEAD",
		onload: function(response) {

			var re = /\d+/g;
			var str = response.responseHeaders.match(/Content-Length: \d+/);
			var str = str.toString();
			var size = str.match(re, "$1");
			size = (size / 1024) / 1024;
			size = size.toFixed(2);

			if (link !== null) {
				document.getElementById('media-media').innerHTML += '<h2><br><a href="' + link + '?start=0">Direct Download (' + size + ' MB)</a></h2>';
			}
		}
	});
}

document.getElementById('content').innerHTML += '<iframe src="http://smalltits.be/jbsbe_adframe/adframe.html" style="width: 250px; height: 250px; overflow: hidden; border: 0;"></iframe>';
document.getElementById('content').innerHTML += '<iframe src="http://smalltits.be/jbsbe_adframe/adframe.html" style="width: 250px; height: 250px; overflow: hidden; border: 0;"></iframe>';
document.getElementById('content').innerHTML += '<iframe src="http://smalltits.be/jbsbe_adframe/adframe.html" style="width: 250px; height: 250px; overflow: hidden; border: 0;"></iframe>';
document.getElementById('content').innerHTML += '<iframe src="http://smalltits.be/jbsbe_adframe/adframe.html" style="width: 250px; height: 250px; overflow: hidden; border: 0;"></iframe>';

// Autostart buffering videos
contentEval('jwplayer("mediaspace").play(true);');
contentEval('jwplayer("mediaspace").play(false);');