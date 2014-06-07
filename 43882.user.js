// ==UserScript==
// @name           Reddit Comment & Submission Highlighter (MMM style) + Recent Links Remover
// @namespace      gmonkeyfilter
// @description    Highlights comments and stories on reddit. Easily edit "include' part of header in script to just be on stories, or just on comments.
// @include        http://www.reddit.com/*/comments/*
// @include        http://*.www.reddit.com/*
// @include        http://www.reddit.com/*
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


    var gadgets = document.getElementsByClassName("gadget")

    for ( var i = 0; i < gadgets.length; i++ )
    {
        gadgets[i].className = "undefined"
    }


var ChangeFontSize=true;
var maxFontSize=16;


var $=window.jQuery;
window.jQuery.noConflict();
var thresholds={
.00:'#fcfcfc',
//.20:'#fcfcfc',
//.30:'#fafafa',
.40:'#fafafa',
.50:'#f7f7f7',
.60:'#f5f5f5',
.75:'#f2f2f2',
.9:'#f0f0f0',
.95:'#ededed',
.98:'#e8e8e8',
//.9937:'#00faff'
.9937:'#daeaf9'
}
$(document).ready(function(){
	var arRecs=new Array();
	$(".entry .score").each(function(){
		var recs=$(this).text().split(' ')[0];
		arRecs.push(parseInt(recs));
	});
	arRecs.sort(function (a, b) {return a - b;});
	$(".entry .score").each(function(){
		var recs=$(this).text().split(' ')[0];
		var numrecs=parseInt(recs);
		var newbgcolor='';
		for(t in thresholds)
			if(numrecs>=arRecs[Math.floor(arRecs.length*t)]){
				newbgcolor=thresholds[t];
			}else{
				break;
			}
		if(newbgcolor!=''){
$(this).parents("div.entry").css({backgroundColor: newbgcolor});
		var newfontsize=Math.min(10+(numrecs/4),maxFontSize);
		if(ChangeFontSize)$(this).parents("div.entry").find(".md").css({fontSize: newfontsize});
}
	});
});