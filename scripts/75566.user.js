// ==UserScript==
// @name          Share on facebook
// @namespace     anui4p@gmail.com
// @description   show Share on Facebook link on every page
// @include       *
// ==/UserScript==

function showdiv()
{
	// Insert DIV style
	var styleCode = new Array();
	styleCode.push('#autofill  *, #autofill {color:#000;background:#fff;padding:0;margin:0;font-size:11px;text-align:left;font-family:Arial,sans-serif}');
	styleCode.push('#autofill {z-index:9999;padding:0px;min-width:30px;border:2px solid #999;position:fixed;bottom:100px;left:0px}');
	styleCode.push('#autofill img {width:24px; height=24px;}');
    
    var style = document.createElement('style');
	style.innerHTML = styleCode.join('\n');
    styleCode.length = 0;

	try { document.getElementsByTagName('head')[0].appendChild(style); }
	catch(e) { console.debug(e)}
    
	// Draw DIV 
	var guiCode = new Array();
	guiCode.push('<a id="sharelink" href="javascript:var d=document,f='http://www.facebook.com/share',l=d.location,e=encodeURIComponent,p='.php?src=bm&v=4&i=1271964988&u='+e(l.href)+'&t='+e(d.title);1;try{if (!/^(.*\.)?facebook\.[^.]*$/.test(l.host))throw(0);share_internal_bookmarklet(p)}catch(z) {a=function() {if (!window.open(f+'r'+p,'sharer','toolbar=0,status=0,resizable=1,width=626,height=436'))l.href=f+p};if (/Firefox/.test(navigator.userAgent))setTimeout(a,0);else{a()}}void(0)">');
    guiCode.push('<img src="http://static.ak.fbcdn.net/rsrc.php/z9Q0Q/hash/8yhim1ep.ico"></img>');
    guiCode.push('</a>');

	// Insert DIV
	var gui = document.createElement('div');
	gui.id = 'sharediv';
	gui.innerHTML = guiCode.join('\n');
	guiCode.length = 0;
	document.body.insertBefore(gui, document.body.lastChild);
}
window.onload = showdiv;