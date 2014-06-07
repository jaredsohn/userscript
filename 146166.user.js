// ==UserScript==
// @name		Tumblr Trimmer
// @namespace	the.vindicar.scripts
// @description	Allows you to trim excessive nested quotes from reblogged texts.
// @updateURL	http://userscripts.org/scripts/source/146166.meta.js
// @downloadURL	http://userscripts.org/scripts/source/146166.user.js
// @version	2.1.3
// @include	http://www.tumblr.com/*
// @include	https://www.tumblr.com/*
// @exclude	http://www.tumblr.com/inbox
// @exclude	http://www.tumblr.com/help
// @exclude	https://www.tumblr.com/inbox
// @exclude	https://www.tumblr.com/help
// @grant		unsafeWindow
// ==/UserScript==

(function(){

var TRIMLEVEL = 2;
var TRIMBTNURL = 'data:image/x-png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAYAAABxVAqfAAAAAXNSR0IArs4c6QAAAAZiS0dEAIwAlwCfFbnGTAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90BGgsHA7qtE4YAAAPmSURBVFjD7ZhNiBxFFMd/VTOzi5svgyGImuSgIYJCAgYMCRrwIIFclEDQg2hjEPqQHKQvOSYHD6FzEaQPBlo9CFnwIAEPEQ8eTCBEMRDIkkQ8eDG6+dgNru7OTFcur0Pto7qnZz8M4jx4dFd1Vf3fq3pf1TCiEY3of0dplk+kWW4bjDNplpuq76YhmJPXFrAVmAWOAS6JoxPeuP3yehF4AugB00kcOb2mHUbbJI4K4A/gELC5QvAx4C3gFWAmBDo0sIDPAV8DB4EJ9bkDPAe8DHybxNFC1Tp2iUc9A1wDXkizfL1scwt4HjgAnEzi6G7dAksCTuJoHvhJmlGa5RPAU8D7wBdJHN0atEZ7GQY+D1wFXgJ+Az4EPgKmm0xuL9O75oDTwHkgBu42nWiXCTwBJMBJ4E1g7b8BPA68CFwGzgKXgNeANasGLJa8U5p5EkfTwOdAAbyeZvn4igOnWb4WeEeaV5I4mhVLnwW+B/YAj68ocJrlY+Knd4CfxbJ9ug98Bhwv/XulNN4AXAC+AkJRqQBuAueAnWmWd5aVJJTG1IVCGdcBNtUlidVMn7VpcUQjGtF/n4Zy8MNnLpgBc9zkkb1uxYAVoAnMdfo5SAAzBKD15pgAsPOAi0ECmBpQqwCtjLeBzFZ4z0IJEgQ3DUBLMJ8HAfsCFCFwMwDU51aFACHAvnAleLumQPC5LdySSnLBO0+8xUvAUqmybZTxLdZYadv2njPS/wywDfgbeE/6PvYAdsviP0gh8Jdc8npaa9tQW3+H7gPviuYtuaiNCXek7N0l15l/PA+wvqJWuY4GL7fXv4I64Edgn9TQ4x7oGLAdeBv4VIpBG1LQKkOzyl/1pI4I8otUmtullC1BNwGHgU/kOmOV35vyOG2NcYWASyPrATfk2xvAOuBJ4APgDHDbmxsKOLWXNh0wdF8X+FXuxHuAV6WsnVGgVoXZSuMalAh8DeaBL4HjwHdyBI2SRF1B72r6nbdju4ErwBY5axfw8UbAToVAf2Lfi05t+d/RBU5JUNkn4KGwuUgIW6NNoZ54gWIceFa+nQN+B74BnpbfUVUZKwjsDyyl7XkhENGuJX98HDAF3JP+P4FJuaBvVPH6ofCTR/YWi4BV9nAq4PvJYLO4z5REpgUxsq78/zgLHJXIVqgdY9BWa61Legy4JQFiToSaF/BSiOuy/TvEDh6ed6ltXVo0gbDZFmCjMg6BlGjlrLsiSF8SRFEXQJzSvue1+yKEqcnH5blOqVxc1LqTnLVTi/U87govKO55xtj32kXIl02DQs+omKtLHxfgYkk1VwW4qagyXU0MGL7KfKR19WreJB4ZPQCFtJRkv7zehQAAAABJRU5ErkJggg==';

if (typeof unsafeWindow.Tumblr == 'undefined')
	return; //hack in order to prevent script from running inside editor frame.
var $ = unsafeWindow.jQuery;

(function(){
	var rules = [
		'span.mce_trimquotes {background:url("'+TRIMBTNURL+'") no-repeat scroll 0px 0px transparent !important}',
		'span.mce_trimquotes:hover {background-position: 0px -30px}',
		]
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (styleElement.styleSheet)
		styleElement.styleSheet.cssText = cssCode;
	else
		styleElement.appendChild(document.createTextNode(rules.join("\n")));
	document.getElementsByTagName("head")[0].appendChild(styleElement);
	})();


function trimPostText()
	{
	var filter = 'blockquote';
	// making the search pattern
	for (var i=0;i<TRIMLEVEL;i++) filter += ' > blockquote';
	//we need to do the contents() trick in order to manipulate the content of iframe.
	var post = $('.mceIframeContainer iframe').contents().find('#tinymce');
	var markup = $('<body>').append(post.html()); // temporary container
	markup.find(filter).each(function(i,e)
		{
		$(e).prev('p:has(a.tumblr_blog)').remove(); //removing the blog referal before the blockquote
		$(e).remove(); //removing the blockquote itself
		});
	//setting new post text. Yay!
	post.html(markup.html());
	}

function waitForSelector(selector, mustexist, callback) {
	//dirty, DIRTY hack -_- But I have no idea how to do it right, as editor seems to load dynamically.
	if (($(selector).size()>0) == mustexist)
		callback();
	else
		setTimeout(function(){waitForSelector(selector, mustexist, callback)}, 100);
}
	
function appendButtonReblog()
	{
	if ($('#post_trim_quotes').size()!=0) {
		return;
		}
	//forming the button, adding the handler...
	var button = $('<td style="position:relative;"><a class="mceButton mceButtonEnabled" role="button" id="post_trim_quotes" href="javascript:;" onclick="return false;" onmousedown="return false;" title="Trim quotes beyond level '+TRIMLEVEL.toString()+'"><span class="mceIcon mce_trimquotes"></span></a></td>');
	button.find('#post_trim_quotes').click(trimPostText);
	//...and placing it!
	$('a.mce_blockquote').parent().after(button);
	}

var baseview = unsafeWindow.Tumblr.PostForms.BaseView.prototype;
var _show_post_form = baseview.show_post_form;
baseview.show_post_form = function(type){
	_show_post_form.call(this,type);
	waitForSelector('table.mceLayout a.mce_blockquote', true, appendButtonReblog);
	};
})();