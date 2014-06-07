// ==UserScript==
// @name Jakkers Reddit

// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); table#topbar {margin-bottom: 35px!important;} tr.oddRow, tr.evenRow {height: 20px!important;} p.menu {line-height:30px!important; color:#000!important; padding-bottom:10px!important;} a:link.title {color: #1462C1!important;!important; font-size:16px!important; letter-spacing: -1px!important;} a:visited.title {color: #999!important;!important; font-weight: normal!important; font-size:16px!important; letter-spacing: -1px!important;} a:hover.title {color: #900!important;!important;font-size:16px!important; letter-spacing: -1px!important;} a:active.title {color: #000!important; font-size:16px!important; letter-spacing: -1px!important;} .link {margin:0pt !important;border-bottom:1px solid #dddddd !important;padding:8px 0px !important;} .link:hover {background:#ffffff !important;} .link .rank {font-family:Tahoma !important;font-size:12px !important;} .midcol {background:transparent !important;} #ad-frame {display:none !important;} .login-form-side {border:1px dotted gray !important;margin-top:10px !important;} .sidebox {border:1px dotted gray !important;} .tagline {color:#666 !important;} .comment .child {margin-top:0px !important;} .comment .author {color:#1462C1 !important;} .comment .entry {padding:10px 5px 10px !important; border-bottom:1px solid #ddd!important;border-left: 2px solid #ddd!important;} .comment .entry:hover {background:#ffffff !important;} .even, .odd {border-left: 0px dotted #ddd !important;}  #sr-header-area {background:#222 !important;border:0px !important;color:#777 !important;} #sr-header-area a {color:#777 !important;} #sr-more-link {background:#222 !important;color:#777 !important;} .dropdown.srdrop .selected {color:#777 !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();





// ==UserScript==
// @name           Reddit parent comment 
// @namespace      Reddit parent comment
// @description    Mouse over "parent" link to show parent comment.
// @include        http://www.reddit.com/r/*/comments/*
// ==/UserScript==


xp('//div[starts-with(@class,"entry")]//ul[@class="flat-list buttons"]/li[2]/a').forEach(function(a){
	a.addEventListener('mouseover', show, false);
	a.addEventListener('mouseout', hide, false);
});


function show(evt)
{
	var id = evt.target.getAttribute('href').replace(/\#/,"");
	var top = parseInt(evt.pageY,10)+10, 
		left = parseInt(evt.pageX,10)+10;
	try{
		var div = createElement('div', {id:"parentComment"+id, style:"padding:5px; border: 1px solid #666666; overflow:auto; background:#F8F8F8; position:absolute; top:"+top+"px; left:"+left+"px;"}, null );
		var query = "//div[contains(@class, 'id-t1_"+id+"')]/div[starts-with(@class,'entry')]";
		div.innerHTML = xp(query)[0].innerHTML.replace(/\<ul\s+class[\s\S]+\<\/ul\>/,"").replace(/\<a[^\>]+>\[-\]\<\/a\>/,'');
		getTag('body')[0].appendChild(div);
	}catch(e){
	}
}


function hide(evt)
{
	var id = evt.target.getAttribute('href').replace(/\#/,"");
	try{
		var div = getId("parentComment"+id);
		div.parentNode.removeChild(div);
	}catch(e){
	}
}


function xp(p, context) {
  if (!context) 
	context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) 
	arr.push(item);
  return arr;
}


function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) 
		node.innerHTML = html;
	
	return node;
}

function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function getTag(name, parent){
	if(!parent)
		return document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}


//TODO:  print debugObj with added variables
function debug(str)
{
	var d = document.getElementById('debuggg');
	if(!d) {
		d = document.createElement('textarea');
		d.setAttribute('id','debuggg');
		d.setAttribute('style',"height:200px; width:50%; position:fixed; bottom:0px; right:0px;");
		document.body.appendChild(d);
	}
	d.innerHTML += '\n' + str;
	d.scrollTop = d.scrollHeight;
}




// ==UserScript==
// @name           Reddit Show Images Inline
// @description    Toggles showing linked images in comments inline, also shows submitted link inline if it is an image.
// @include        http://www.reddit.com/*/comments/*
// @include        http://www.reddit.com/comments/*
// @include        http://www.reddit.com/*/search*
// ==/UserScript==

var linkColor = "blue";	// other options: blue, red, "" for default color, #000000, etc...

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
	$('div.content > div.sitetable > div.thing > div.entry').each(
	function() {
		var t=$(this);
		t.find('ul.buttons').append($('<li></li>').append($('<a href="#"><font color="' + linkColor + '">show images inline</font></a>').click(
			function(e) {
			
				// Add/toggle images for all links to images.
				$('.md').find('a').each(addToggleImage);
				
				// Add/toggle image entry url -- in a different location.
				$('p.title').find('a').each(addToggleImage);
				e.preventDefault();
			})))
	});
}

function addToggleImage() {
	var a = $(this);
	var href = a.attr('href');
	if (a.hasClass('inlineImage')) {
		a.children('div.inlineImage').toggle();
	}
	else if(isImage(href)) {
		a.append($("<div class='inlineImage' style='display:block;max-width:780px'></div>").append($("<img style='display:block;max-width:780px;' src='" + href + "'/>")));
		a.addClass('inlineImage');
	}
}

function isImage(href) {
	return href && (href.indexOf('png') != -1 || href.indexOf('jpg') != -1 || href.indexOf('jpeg') != -1 || href.indexOf('gif') != -1);
}
