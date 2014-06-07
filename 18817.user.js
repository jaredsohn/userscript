// ==UserScript==
// @name           JIRA Comment Censorship
// @description   Some people just aren't worth listening to.
// @namespace      http://home.comcast.net/~mailerdaemon
// @include        http://jira.secondlife.com/*
// ==/UserScript==

const user_remove = [];
const user_collapse = ["Prokofy Neva"];
const user_purge = true; //remove mode: causes the elements to be deleted instead of simply hidden.
const before = "text()='";
const after = "'";
const scroll = true;//scroll to the target indicated after collapsing/deleting comments

GM_addStyle("div#issue_actions_container br{ line-height:0px;} div#issue_actions_container * br{ line-height:normal;}")
var count = 0;
var old_id;

if(user_purge)
{
	count += run(user_remove, remove);
	count += run(user_collapse, uh);
}
else
{
	count += run(user_collapse, uh);
	count += run(user_remove, hide);
}

if(scroll /*&& count > 0*/ && (path = /^#(.+)/.exec(decodeURIComponent( location.hash||'' ))))
{
	var node = $Y( "//a[@name='"+path[1]+"'] or //*[@id='"+path[1]+"']" );
	var x = unsafeWindow.scrollX;
	var y = unsafeWindow.scrollY;
	for(var i = 0;(link = node.snapshotItem(i)) && (x == unsafeWindow.scrollX) && (y == unsafeWindow.scrollY); i++)
		link.scrollIntoView();
}

//function GetNextSiblingNode(child, bad) {while((child = child.nextSibling) && child.nodeType == 3);return child?child:bad;}
function hide(target){	target.style.display="none"; }
function unhide(target){	target.style.display=""; }
function remove(target){	target.parentNode.removeChild(target); }
function $Y(_xpath, node){return document.evaluate(_xpath, node?node:document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);}

function uh(p, link)
{
	var id = p.id.substring(0,p.id.lastIndexOf("-"));
	if(old_id != id)
	{
		old_id = id;
		if((p.style.display == "none") != (p.id.indexOf("open")>=0))//no point in toggling it if it's already toggled.
			unsafeWindow.toggleDivsWithCookie(id+'-closed', id+'-open');
	}
}

function run(group, action)
{
	if(group.length > 0)
	{
		var res = $Y("//div[@class='action-details']/a["+before+group.join(after+" or "+before)+after+"]");
		var old_id;
		var i;
		for (i = 0; link = res.snapshotItem(i); ++i)
			action(link.parentNode.parentNode.parentNode, link);
		return i;
	}
}