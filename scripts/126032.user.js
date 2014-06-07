// ==UserScript==
// @name           Pivotal Highlighter
// @namespace      http://williamstamper.com
// @description    Highlights your username in Pivotal
// @include        *pivotaltracker.com/projects*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

var zNode = document.createElement ('div');
var on = false;
var header = true;
var a = true;
zNode.innerHTML = '<button id="refresh" type="button" style="display:none">Refresh</button><button id="toggle" type="button">Turn On</button><button id="changename" type="button" style="display:none">Change Name</button><button id="toggleHeader" type="button">Hide Header</button><button id="toggleAccepted" type="button">Hide Accepted</button>';
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

document.getElementById ("toggle").addEventListener ("click", ToggleClickAction, false);
document.getElementById ("changename").addEventListener ("click", ChangeNameClickAction, false);
document.getElementById ("refresh").addEventListener ("click", RefreshClickAction, false);
document.getElementById ("toggleHeader").addEventListener ("click", ToggleHeaderClickAction, false);
document.getElementById ("toggleAccepted").addEventListener ("click", ToggleAcceptedClickAction, false);


function RefreshClickAction (zEvent)
{
	if(typeof(GM_getValue("name"))=="undefined")
	{
		var n = prompt("What is your name?", "WS");
		GM_setValue("name",n);
	}
	highlight();
}
function ToggleHeaderClickAction (zEvent)
{
	toggleHeader();
}
function toggleHeader()
{
	if(header)
		hideHeader();
	else
		showHeader();
}
function hideHeader()
{
	$(".controlPanel, #header").slideUp("slow",function(){});
	header = false;
	$("#toggleHeader").html("Show Header");
}
function showHeader()
{
	$(".controlPanel, #header").slideDown("slow",function(){});
	header = true;
	$("#toggleHeader").html("Hide Header");
}
function ToggleAcceptedClickAction()
{
	toggleAccepted();
}
function toggleAccepted()
{
	if(a)
		hideAccepted();
	else
		showAccepted();	
}
function hideAccepted()
{
	$(".accepted").css("display","none");
	a = false;
	$("#toggleAccepted").html("Show Accepted");		
}
function showAccepted()
{
	$(".accepted").css("display","block");
	if(on)
	{
		var name = ">"+GM_getValue("name")+"<";
		var s = $(".story_name");
		var good = s.filter(function(index){console.log(this.innerHTML); return this.innerHTML.indexOf(name)!=-1}).parents(".accepted").css({"font-weight":"bolder","opacity":"1"});
		var bad = s.filter(function(index){return this.innerHTML.indexOf(name)==-1}).parents(".accepted").css({"font-weight":"normal","opacity":"0.6"});
	}
	a = true;
	$("#toggleAccepted").html("Hide Accepted");		
}
function ToggleClickAction (zEvent)
{	
	if(typeof(GM_getValue("name"))=="undefined")
	{
		var n = prompt("What is your name?", "WS");
		GM_setValue("name",n);
	}
    if(on)
    {
    	document.getElementById("refresh").style.display="none";
    	document.getElementById("changename").style.display="none";
    	showHeader();
    	showAccepted();
	    $("#current_itemList_items .accepted, .storyPreviewButtons").css("display","block");
	    $("#current_itemList_items .accepted, .started, .unstarted, .unscheduled, .delivered").css({"font-weight":"normal","opacity":"1"});
	    document.getElementById("toggle").innerHTML="Turn On";
    }
    else
    {
    	document.getElementById("refresh").style.display="inline";
    	document.getElementById("changename").style.display="inline";
    	var name = ">"+GM_getValue("name")+"<";
    	hideHeader();
    	hideAccepted();
	    highlight();
	   	document.getElementById("toggle").innerHTML="Turn Off";
    }
    on = !on;
}
function ChangeNameClickAction (zEvent)
{	
	var n = "";
	if(typeof(GM_getValue("name"))=="undefined")
	{
		n = prompt("What is your two letter initial?","JD");	
	}
	else
	{
		n = prompt("What is your two letter initial?",GM_getValue("name"));
	}
	if(n=="")
		return;
	GM_setValue("name",n);
	if(on)
	{
		highlight();	
	}
}

function highlight()
{
	if(!a)
		$(".accepted").css("display","none");
	var name = ">"+GM_getValue("name")+"<";
	var s = $(".story_name");
	var good = s.filter(function(index){return this.innerHTML.indexOf(name)!=-1}).parents(".storyPreviewHeader");
	var bad = s.filter(function(index){return this.innerHTML.indexOf(name)==-1}).parents(".storyPreviewHeader");
	good.parent(".started").css({"font-weight":"bolder","opacity":"1"}).find(".storyPreviewButtons").css("display","block");
	bad.parent(".started").css({"font-weight":"normal","opacity":"0.6"}).find(".storyPreviewButtons").css("display","none");
	good.parent(".unstarted, .delivered, .accepted").css({"font-weight":"bolder","opacity":"1"});
	bad.parent(".unstarted, .delivered, .accepted").css({"font-weight":"normal","opacity":"0.8"});
	good.parent(".unscheduled").css({"font-weight":"bolder","opacity":"1"});
	bad.parent(".unscheduled").css({"font-weight":"normal","opacity":"0.7"});
}
GM_addStyle ( (<><![CDATA[
	#myContainer 
	{
        position:               absolute;
        top:                    -5px;
        left:                   10px;
        font-size:              20px;
        margin:                 0px;
        opacity:                0.9;
        z-index:                222;
        padding:                0px 0px;
    }
    #toggle 
    {
        cursor:                 pointer;
    }
    #myContainer p 
    {
        color:                  red;
        background:             white;
    }
    .story_content .item .unscheduled
    {
		background:#b0e7f8 !important;
	}
	.story_content #current_itemList_items .item .unestimatedText, .story_content #icebox_itemList_items .item .unestimatedText, .story_content #backlog_itemList_items .item .unestimatedText
	{
		background:#FEBF96 !important;
	}
	.story_content .item .started
	{
		background:#f6f6a1 !important;
	}
	.story_content .item .delivered
	{
		background:#f8d881 !important;
	}
	.story_content .item:hover > div
	{
		background:white !important;
	}
	.story_content .item .accepted
	{
		color:#333;
	}
	.story_content .item .releaseMarkerNotAccepted,
	.story_content .item .releaseMarkerNotAccepted:hover 
	{
		background: #407AA6 !important;
	}

]]></>).toString () );
