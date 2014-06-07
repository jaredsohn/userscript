// ==UserScript==
// @name           Betanews Layout Cleanup
// @namespace      http://home.comcast.net/~mailerdaemon
// @include        http://www.betanews.com/*
// @include        http://fileforum.betanews.com/*
// ==/UserScript==

//if(!String.prototype.trim) String.prototype.trim = function() { return this.replace(/^\s*/,'').replace(/\s*$/, ''); }//necessary evil

GM_addStyle(".boxad, #topbanner, #ad, .skyscraperad, #bottomad, .ffleftcolumn #featuredfile, .article hr, .sponsorbutton { display:none;}")
GM_addStyle(".prefbarborder { margin-top:0px; }")

var t = $X("//div[@id='articlewrapper']/div[@class='contentright']");
if(t)
{
	if($Z("//div[@id='articlewrapper']/div[@class='contentmiddle']/*", function(link,i){t.appendChild(link.parentNode.removeChild(link)); return 1;})>0)
		$Z("//div[@id='articlewrapper']/div[@class='contentmiddle']", function(link,i){link.parentNode.removeChild(link)});

	GM_addStyle(".highlightstory h1, .highlightstory, .highlights, .cesessentials, .photoalbums, .photoalbum, p.noimage { width:309px; }")
	GM_addStyle(".highlightstory p {width:282px;}")
	GM_addStyle(".commentform textarea {width:659px;}")
	GM_addStyle(".story, .story h1, .story p {width:599px;}")
	GM_addStyle(".article_header, .article, .contentarticle, .comments_wrapper, .commentform, .talkback,"+
							".commentform p, .pagingstories, .noimage, .noimage p, .noimage h1, .storyouter {width:664px;}")
	GM_addStyle(".comment h3 {width:397px;}")
}
if($X("//div[@class='allcategories']") && !$X("//div[@id='categories']"))
	GM_addStyle(".allcategories { display:none;} .morereleases {margin-top: 0px;}");


function $X(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);}
function $Y(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);}
function $Z(_xpath, func, node, payload){
	var res = document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var i, j;
	for (i = j = 0; link = res.snapshotItem(i); ++i)
		j += func(link, i, payload);
	return j;
}
function GetParentNodeByTag(child, tag, bad) {
	tag = tag.toUpperCase();
	while((child = child.parentNode) && child.tagName != tag);
	return child?child:bad;
}
function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function insertBefore(insert, before){return before.parentNode.insertBefore(insert, before);}

function addEvent( obj, type, fn, capture ) {
 	if ( obj.attachEvent ) {
 		obj["e"+type+fn] = fn;
 		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
 		obj.attachEvent( "on"+type, obj[type+fn] );
 	} else
 		obj.addEventListener( type, fn, capture?capture:false );
}
function removeEvent( obj, type, fn, capture ) {
 	if ( obj.detachEvent ) {
 		obj.detachEvent( "on"+type, obj[type+fn] );
 		obj[type+fn] = obj["e"+type+fn] = null;
 	} else
 		obj.removeEventListener( type, fn, capture?capture:false );
}
