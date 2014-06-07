// ==UserScript==
// @name           More TinyPic Codes
// @description    Adds linked HTML and BBcode thumb-nail codes.
// @include        http://tinypic.com/?t=postupload
// @include        http://tinypic.com/view.php?*
// ==/UserScript==
var url = document.location.href.indexOf('view.php');
var x = unescape(document.getElementById('flash-direct-url').getElementsByTagName('embed')[0].getAttribute('flashvars'));
var pic = x.slice(x.search('http:'),x.search('&trk'));
var thumb = pic.slice(0,pic.length-4)+'_th'+pic.slice(pic.length-4);
pic = escape(pic).replace(/\//,'%2F');
thumb = escape(thumb).replace(/\//,'%2F');
for (i=1;i<=2;i++) {
//	var codes = document.getElementsByName('email_form')[0].getElementsByTagName('div');
	var codes = document.getElementsByClassName('media-toolbox')[0].getElementsByTagName('form')[0].getElementsByTagName('div');
	var NewDiv = document.createElement('div');
	if (i==1) {
		if (url==-1){
			var loc = codes.length-7;
		}
		else {
			var loc = codes.length-6;
		}
		NewDiv.innerHTML = '<label for="direct-url">HTML Thumb for Websites</label>'+
		'<div id="html_thumb" class="flashcode">'+
		'<embed height="19" width="262"'+
		'flashvars="ipt=%3Ca+href%3D%22'+pic+'%22+target%3D%22_blank%22%3E%3Cimg+src%3D%22'+thumb+'%22+alt%3D%22'+pic+'%22%2F%3E%3C%2Fa%3E&trk=copy_details_thumb_html"'+
		'allowscriptaccess="always" swliveconnect="true" allowfullscreen="true" wmode="transparent" name="flash-html-code" quality="high" bgcolor="transparent" id="flash-html-code" style="" src="http://tinypic.com/i/input.swf" type="application/x-shockwave-flash"/>'+
		'</div>';
	}
	else {
		if (url==-1){
			var loc = codes.length-5;
		}
		else {
			var loc = codes.length-4;
		}
		NewDiv.innerHTML = '<label for="direct-url">IMG Thumb Code for Forums & Message Boards</label>'+
		'<div id="img_thumb" class="flashcode">'+
		'<embed height="19" width="262"'+
		'flashvars="ipt=%5BURL='+pic+'%5D%5BIMG%5D'+thumb+'%5B%2FIMG%5D%5B%2FURL%5D&trk=copy_details_thumb_img"'+
		'allowscriptaccess="always" swliveconnect="true" allowfullscreen="true" wmode="transparent" name="flash-html-code" quality="high" bgcolor="transparent" id="flash-html-code" style="" src="http://tinypic.com/i/input.swf" type="application/x-shockwave-flash"/>'+
		'</div>';
	}
	var LastDiv = codes[loc];
	LastDiv.parentNode.insertBefore(NewDiv,LastDiv);
}
GM_addStyle('.ad{display:none;}');//remove annoying ad block