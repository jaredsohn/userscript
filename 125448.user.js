// ==UserScript==
// @name           JS gallery
// @namespace      echo.waw.pl
// @include        http://example.com
// @resource		jsjquery http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js
// @resource		jsbox http://fancybox.net/js/fancybox-1.3.4/jquery.fancybox-1.3.4.js
// @resource		cssbox http://fancybox.net/js/fancybox-1.3.4/jquery.fancybox-1.3.4.css
// @resource		imgfancybox	http://fancybox.net/js/fancybox-1.3.4/fancybox.png
// ==/UserScript==
log = unsafeWindow.console.log;
injectJsCode(GM_getResourceText('jsjquery'));
$ = unsafeWindow.$;
applybox = function() {}

///* fancybox
code = GM_getResourceText('jsbox');
// code = code.replace(/images\//g, "http://jquery.com/demo/thickbox/images/");
injectJsCode(code);
css = GM_getResourceText('cssbox');
css = css.replace(/fancybox.png/g, GM_getResourceURL('imgfancybox')); 
injectStyle(css);
applybox = function() {
	$("a.item").fancybox({
		'transitionIn'	:	'none',
		'transitionOut'	:	'none',
		'changeSpeed' : -1,
		'changeFade' : -1
	});
}
//*/

jsontxt = $('body').text();
var images = eval(jsontxt);
$('body').text('');

itemStyle = ""+<r><![CDATA[
body {
	text-align: center;
}
.item img {
	max-width: 300px;
	max-height: 300px;
	margin: 1px;
	vertical-align: middle;
}
]]></r>;
injectStyle(itemStyle);

template = '<a href="%SRC%" class="item" rel="gallery"><img src="%SRC%" /></a>';

for(index in images) {
	var src = images[index];
	var anhor = $(template.replace(/%SRC%/g, src));
	$('body').append(anhor);
}
applybox();

// ### <!-- HELPERS
function injectStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    return style;
}

function injectJsCode(text) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = text;
  head.appendChild(script);
}
//### HELPERS -->
