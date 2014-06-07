// ==UserScript==
// @name           vBulletin Thread Split
// @description    In the thread split interface it allows for toggling between summaries and posts. It makes splitting threads easier.
// @namespace      http://home.comcast.net/~mailerdaemon/
// @include        http://forums.secondlife.com/postings.php
// ==/UserScript==

//label[starts-with(@for,"checkpost")]
//td[text()="Split Thread" and @class="tcat"]

if(!String.prototype.trim) String.prototype.trim = function() { return this.replace(/^\s*/,'').replace(/\s*$/, ''); }//necessary evil

var base = $X('//td[text()="Split Thread" and @class="tcat"]/../../../..')
if(!base)
	return;

var all = $X('//label[@for="cb_allbox"]');
var p = insertAfter(document.createElement("label"), insertAfter(document.createTextNode(" "), all));
var extended = p.insertBefore(document.createElement("input"),null);
extended.type="checkbox"
p.htmlFor=extended.id="cb_full";
insertAfter(document.createTextNode("Extended Information"), extended);

var posts = $Y('//label[starts-with(@for,"checkpost")]', base);
var i, post;
var toggles = new Array(posts.length);
for (i = 0; post = posts.snapshotItem(i); ++i)
{
	var postnumber = post.htmlFor.replace("checkpost", "");
	var table = GetParentNodeByTag(post, "TABLE");
	var link = table.rows[2].cells[0];
	link.style.cursor="pointer";
	var a = table.getElementsByTagName("div")[0];
	var b = insertAfter(document.createElement("div"), a);
	b.style.cssText=a.style.cssText;
	var t = buildToggle(postnumber, i + 1, a, b);
	toggles[i] = t;
	addEvent( link, "click", t);
//	t();
}
addEvent( extended, "click", function(){
		for(i = 0; f = toggles[i];i++)
			f(extended.checked)
	});

function buildToggle(postnumber, j, a, b)
{
	return function Toggle(force){
		if(force != (a.style.display == "none"))
		{
			if(b.innerHTML == "")
			{
				GM_xmlhttpRequest({
					method: 'GET',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-type': 'application/x-www-form-urlencoded'
					},
					url: "http://forums.secondlife.com/showpost.php?p="+postnumber+"&postcount="+j,
					onload: function load(responseDetails){
						b.innerHTML=responseDetails.responseText.replace(/^[\w\W]*?(<!-- icon and title -->[\w\W]*?|)(<!-- message -->[\w\W]*?<!-- \/ message -->)[\w\W]*$/, "$1$2");
						a.style.display="none";
						b.style.display="block";
	//					GM_log("got " + postnumber);
					}
				});
			}
			else
			{
				if(a.style.display == "none")
				{
					a.style.display="block";
					b.style.display="none";
	//				GM_log("hide " + postnumber);
				}
				else
				{
					a.style.display="none";
					b.style.display="block";
	//				GM_log("show " + postnumber);
				}
			}
		}
	}
}

function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function $X(_xpath, node){return document.evaluate(_xpath, node?node:document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);}
function $Y(_xpath, node){return document.evaluate(_xpath, node?node:document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);}

function GetParentNodeByTag(child, tag, bad) {
	tag = tag.toUpperCase();
	while((child = child.parentNode) && child.tagName != tag);
	return child?child:bad;
}

function addEvent( obj, type, fn ) {
 	if ( obj.attachEvent ) {
 		obj["e"+type+fn] = fn;
 		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
 		obj.attachEvent( "on"+type, obj[type+fn] );
 	} else
 		obj.addEventListener( type, fn, false );
}
function removeEvent( obj, type, fn ) {
 	if ( obj.detachEvent ) {
 		obj.detachEvent( "on"+type, obj[type+fn] );
 		obj[type+fn] = obj["e"+type+fn] = null;
 	} else
 		obj.removeEventListener( type, fn, false );
}
