// ==UserScript==
// @name           4chan Compilation
// @namespace      Various Authors
// @include        *.4chan.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


var threadNum;
var previewNum;
var preview;
var x;
var y;
var w;
var h;
var hflip;
var timer;

$(document).ready(function() {
	$('.quotelink')
	.live('hover',imaGen)
	.live('mousemove',imaGen)
	.live('mouseout',function() {
		preview.css({"display":"none"});
	});
	var allSpans, thisSpan;
	allSpans = document.getElementsByTagName('span');
	for (var i = 0; i < allSpans.length; i++) {
		thisSpan = allSpans[i];
		if (thisSpan.id.length > 5) {
			if (thisSpan.id.substr(0,8)=="nothread") {
				thisSpan.childNodes[1].innerHTML = thisSpan.id.substr(8);
			}
			if (thisSpan.id.substr(0,5)=="norep") {
				thisSpan.childNodes[1].innerHTML = thisSpan.id.substr(5);
			}
		}
	}
	const TIP_X_OFFSET = 45, TIP_Y_OFFSET = 120;
	const MAX_HEIGHT = 600, MAX_WIDTH = 800;
	const tip = document.createElement('div');
	tip.id = 'zoompics_tooltip';
	tip.setAttribute('style', 'display: none; position:absolute; border:1px solid #AAA; background-color:#FFF');
	tip.innerHTML = '<table><tr><td id="zoompics_tipcell" style="padding: 3px"></td></tr></table>';
	document.body.appendChild(tip);
	var imgs = document.evaluate("//img[@md5]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var i = 0, img = null; img = imgs.snapshotItem(i++); ) {
		img.parentNode.setAttribute('onmouseover', 'zoompics_show(this, event)');
		img.parentNode.setAttribute('onmouseout', 'zoompics_hide()');
		img.parentNode.setAttribute('onmousedown', 'zoompics_hide()');
		img.parentNode.setAttribute('onmousemove', 'zoompics_track(event)');
		var preloadimg = document.createElement('div');
		preloadimg.setAttribute('style', 'display: none; position:absolute; border:1px solid #AAA; background-color:#FFF');
		preloadimg.innerHTML = "<img src='" + img.parentNode.getAttribute("href") + "'>";
	}
	unsafeWindow.zoompics_hide = function() {
		document.getElementById('zoompics_tooltip').style.display = 'none';
	}
	unsafeWindow.zoompics_show = function(me, e) {
		const td = document.getElementById('zoompics_tipcell');
		var theimage = document.createElement('img');
		theimage.setAttribute('src', me.getAttribute("href"));
		var fullwidth = parseInt(me.previousSibling.previousSibling.textContent.match(/ ([0-9]+)x[0-9]+/)[1]);
		var fullheight = parseInt(me.previousSibling.previousSibling.textContent.match(/ [0-9]+x([0-9]+)/)[1]);
		if ( (fullwidth > MAX_WIDTH) || (fullheight > MAX_HEIGHT) ) {
			var zoomfactor = Math.max(fullwidth / MAX_WIDTH, fullheight / MAX_HEIGHT);
			theimage.setAttribute('height', fullheight / zoomfactor);
			theimage.setAttribute('width', fullwidth / zoomfactor);
		}
		td.innerHTML = "";
		td.appendChild(theimage);
		//td.innerHTML = "<img src='" + me.getAttribute("href") + "'>";
		unsafeWindow.zoompics_track(e);
		document.getElementById('zoompics_tooltip').style.display = 'block';
	}
	unsafeWindow.zoompics_track = function(e) {
		const tip = document.getElementById('zoompics_tooltip');
		const tip_height = parseInt(document.defaultView.getComputedStyle(tip, '').getPropertyValue('height'));
		const cursor_rel_y = e.pageY - window.scrollY;
		const tip_abs_bottom = e.pageY - TIP_Y_OFFSET + tip_height;
		const vp_height = window.innerHeight;
		const vp_bottom = window.scrollY + vp_height;
		tip.style.top = cursor_rel_y < TIP_Y_OFFSET || tip_height > vp_height ? e.pageY -  cursor_rel_y :
			tip_abs_bottom > vp_bottom ? e.pageY - TIP_Y_OFFSET -(tip_abs_bottom - vp_bottom) :
			e.pageY - TIP_Y_OFFSET + 'px';
		tip.style.left = e.pageX + TIP_X_OFFSET + 'px';
	}
});

function imaGen(e) {
	threadNum = $(this).attr("href");
	previewNum = parseInt($(this).text().replace(/>>/g,''));
	preview = $("body > [id='" + previewNum + "awe']");
	if (  preview.size() == 0 ){
		$("body").append("<div id='"+previewNum+"awe'></div>");
		preview = $("body > [id='" + previewNum + "awe']");
		post = $("input[name='" + previewNum + "']");
		if ( post.size() != 0 ){
			if(post.parent()[0].tagName == "FORM" || post.attr('class')!="replay"){
				preview.append("<td class='reply'></td>");
				preview = preview.children();
				while( (post.prev().size() != 0) && !post.prev().is("hr")){
					post = post.prev();
				}
				do{
					preview.append(post.clone());
					post = post.next();
				}while( !post.is("blockquote"))
				preview.append(post.clone());
				preview = preview.parent();
			}else{
				preview.append($("#"+ previewNum).clone());
			}
		}else{
			var page1 = threadNum + ".html";
			preview.text("Loading...");
			preview.load(page1 + " [id='" + previewNum + "']");
		}
		preview.css({
			"position":"fixed",
			"z-index":"9001",
			"max-width":"800px"
		});
	}
	preview.css({"display":"block"});
	x = e.pageX + 20 - window.pageXOffset;
	y = e.pageY + 20 - window.pageYOffset;
	preview.css({
		"left":x,
		"top":y
	});
	flipit();
}

function flipit(){
	clearTimeout(timer);
	w = parseInt(preview.css("width"));
	h = parseInt(preview.css("height"));
	if(w == 0){
		timer = setTimeout(flipit,100);
	}else{
		hflip = false;
		if(x+w+20 > window.innerWidth){
			x-=w;
			hflip = true;
		}
		if(y+h+20 > window.innerHeight){
			y-=h;
			if(hflip)
				x-=40;
		}
		preview.css({
			"left":x,
			"top":y
		});
	}
}