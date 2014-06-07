// ==UserScript==
// @name           Reddit Bookmarklets for Comments
// @description    Add bookmarklets next to "sorted by:" on the comment pages.
// @version	   1.1
// @date           2010.10.04
// @include        http://*.reddit.com/r/*/comments/*
// @include        http://reddit.com/r/*/comments/*
// @include        http://*.reddit.com/comments/*
// @include        http://reddit.com/comments/*
// ==/UserScript==

(function() {

var bookmarklets = new Array()
	bookmarklets[0] ="javascript:document.ondragstart=function(){return false};dst=function(e){return (p=Math.pow)(p(e.clientX-(rc=e.target.getBoundingClientRect()).left,2)+p(e.clientY-rc.top,2),.5)};$(\"[href\x2a=imgur]\").not($(t=\"[href$=jpeg],[href$=gif],[href$=png],[href$=jpg]\")).each(function(){this.href+='.jpg'});void($(t).not(\".EGraw,.click-gadget a,.domain a,.thumbnail\").attr({'class':'%45%47%72%61%77',target:'blank'}).each(function(){$(this).append($('<span />').toggle(function(e){$(this).html(' [-]').nextAll().show();return false},function(e){$(this).html(' [+]').nextAll().hide();return false}).click()).append($('<img>').attr({src:this.href,style:'display:block;max-width:780px;height:auto',title:'Drag to resize'}).mousedown(function(e){(t=this).iw=t.width;t.d=dst(e);t.dr=false;e.preventDefault();}).mousemove(function(e){if((t=this).d){t.style.maxWidth=t.style.width=((dst(e))%2At.iw/t.d)+\"px\";this.dr=true}}).mouseout(f=function(e){this.d=false;if(this.dr)return false}).click(f)).append($('<span />').html('%26#8635;').click(function(e){(i=$(t=this).prev()).css({MozTransform:r='rotate('+(t.rot=(t.rot?(++t.rot):1)%4)%2A90+'deg)',WebkitTransform:r,filter:'progid:DXImageTransform.Microsoft.BasicImage(rotation='+t.rot+')',marginBottom:(m=t.rot%2?(i.attr('width')-i.attr('height'))/(1+(nie=!$.browser.msie)):0)+'px',marginTop:(m=nie%2Am)+'px',marginLeft:-m+'px',marginRight:-m+'px'});return false}))}))";
	/*bookmarklets[0old] = "javascript:%20function%20show_images(find_string,%20gonewild){var%20gonewild%20=%20gonewild%20||%20'';var%20x=%20$(\".content\").find(find_string).each(function(){var%20re%20=%20new%20RegExp(\"[^a-zA-Z]\"+gonewild+\"[^a-zA-Z]\",\"i\");var%20href=$(this).attr(\"href\");var%20title_text=$(this).text();if((!$(this).hasClass(\"drowsapMorphed\"))%20&&%20($(this).next(\".drowsapMorphed\").length==0)%20&&%20href%20&&%20(gonewild%20==''%20||%20title_text.match(re))%20&&(href.indexOf('imgur.')>=0%20||%20href.indexOf('.jpeg')>=0%20||%20href.indexOf('.jpg')>=0%20||%20href.indexOf('.gif')>=0)){var%20ext%20=(href.indexOf('imgur.')>=0%20&&%20href.indexOf('.jpg')<0%20&&%20href.indexOf('.png')<0%20&&%20href.indexOf('.gif')<0)%20?%20'.jpg'%20:'';%20var%20img%20=%20$(\"<a%20class='drowsapMorphed'%20href='\"+href+\"'%20onclick='window.open(this.href);return%20false;'%20style='display:block'><img%20style='display:block;max-width:720px;'%20src='\"+href+%20ext+\"'%20/></a>\");$(this).after(img);}});};%20show_images(\"#siteTable%20div.entry%20p.title%20a.title\");show_images(\".usertext-body%20a\");";*/
	bookmarklets[1] = "javascript:$('div.commentarea%20>%20div.sitetable%20>%20div.thing%20>%20div.child').each(function(){var%20t=$(this);if(t.children().length%20>%200)t.prev().find('ul.buttons').append($('<li></li>').append($('<a%20href=\"#\"><font%20color=\"orangered\">toggle%20children</font></a>').click(function(e){t.children('div').toggle();e.preventDefault();})))}).children('div').toggle()()";
	
	bookmarklets[2] = "javascript:$.getScript(\"http://gist.github.com/raw/278014/a4888afe8faac888e20847817136f0d6689bccbf/reddit%20reveal\")";
		
var titles = new Array()
	titles[0] = "View Images";
	titles[1] = "Collapse Children";
	titles[2] = "Reveal";
	
var menu = document.getElementsByClassName('menuarea')[0];

for (var i = 0; i < bookmarklets.length; i++) {
	var div = document.createElement('div');
	var a = document.createElement('a');
	var text = document.createTextNode("[ "+titles[i]+" ]");
	
	a.setAttribute('href',bookmarklets[i]);
	a.appendChild(text);
	div.appendChild(a);
	div.className = "spacer";
	menu.appendChild(div);
}

})();
