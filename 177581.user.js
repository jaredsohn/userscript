// ==UserScript==
// @name        yingdayun
// @namespace   tom
// @include     http://ydylm.com/Default/AddUserBrowsing
// @version     1
// ==/UserScript==
function _debug(){console.info(arguments);}

if(typeof(jQuery) != 'undefined'){
	callback();
}else{
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js";
	document.head.appendChild(script);
	script.addEventListener('load', callback);
}

function callback(){
	addInjectKeys();

	

	function addInjectKeys(){
		var a = jQuery("div.line>h1");
		a.after(jQuery("<h2 id='cul'></h2>"));
		jQuery('#cul').append(jQuery("<a href='javascript:;'>全部浏览</a>").click(function(){
			funcInjectKeys();
			return false;
		}));
	};

	function funcInjectKeys(){
		var tdla = jQuery("td.la");
		jQuery.each(tdla, function(i, n){
			var td = jQuery(n);
			var a = td.find('a');
			var href = a.attr('href');
			if(!a.hasClass('not')){
				window.open(a[0].href);
			};
		});
		return false;
	};
};