// ==UserScript==
// @name           welcomeTweak
// @namespace      http://userscripts.org/users/0
// @include        http://www.thingbox.com/account/welcome
// @include        http://www.thingbox.com/account/welcome/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==


$(document).ready(function(){begin();});

function begin()
{
		removeCrap();
		insertHackFrames();
		insertCssHacks();
		loadContent();
}

function removeCrap()
{
	$("div#content h2").remove();
	$("div#content h4").remove();
	$("div#content > h3").remove();
	$("div#content > div").each(function(i){if (this.id=="twattle"){$(this).remove()};});
	$("div.success").remove();
}

function insertHackFrames()
{
		$("div#content").prepend("<br />");
		$("div#content").prepend("<div class='clearfix'/>");
		$("div#content").prepend("<ul id='mingeBuffer'/>");
		$("ul#mingeBuffer").hide();
		$("div#content").prepend("<ul id='mingeList'/>");
}

function insertCssHacks()
{
	
	var css = "";
	css = css + " #mingeList{position: relative; left: 8px;width: 100%; height: 200px; margin-bottom: 20px; padding-bottom: 20px;}";
	css = css + " .summary{position: relative; padding: 4px; margin-bottom: 14px;}";
	css = css + " .icon{position:absolute; left: 10px; margin: 4px; height:70px; width:70px;}";
	css = css + " .text{position: absolute; left: 80px; float:left; }";
	css = css + " .tickBox{position: relative; float:left; width: 220px; height: 50px; margin: 15px; border-top: 1px dotted blue;} ";
	css = css + " a.callout{color:red; float:left;} ";
	css = css + " .threadLink a{word-wrap: break-word; } ";
	css = css + " .forumLink { padding-bottom: 3px; } ";
	css = css + " .threadCount {padding-top: 3px; } ";
	css = css + " .count{font-size: 8pt; color: CornflowerBlue; } ";
	css = css + " .ignoreButton{float: left; padding-right: 2px; margin-right: 2px; cursor:pointer } ";
	css = css + " .ignoreButton a{color: lightgray;} ";
	css = css + " .ignoreButton a:hover{color: red; text-decoration:none;} ";
	
	var stylesheet = $("<style type='text/css'></style>").attr("innerHTML",css);
	var head = $('head');
	head.append(stylesheet);
	
}

function loadContent()
{
	$("#mingeBuffer").load("http://www.thingbox.com/forums/list .summary", loadAndChain);
}

function loadAndChain()
{
	processMingeBuffer();
	loadSecondaryContent();
}
function loadSecondaryContent()
{
	$("#mingeBuffer").load("http://www.thingbox.com/forums/list/all/2 .summary", processMingeBuffer);
}

function processMingeBuffer()
{
	$("#mingeBuffer div.text a.profile").remove();
	$("#mingeBuffer div.text ul.tags").remove();
	
	$("#mingeBuffer a.callout").each(function(i, eachLink){$(this).parent().parent().append(eachLink);});
	$("#mingeBuffer div.text h4 a").each(function(i, eachLink){$(this).parent().parent().append(eachLink);});
	$("#mingeBuffer div.text span.count").each(function(i, eachSpan)
	{
		eachSpan.innerHTML = "&nbsp;" + eachSpan.innerHTML.replace(" posts","");
		$(this).parent().parent().append(eachSpan);}
	);
	
	$("#mingeBuffer div.text h4").remove();
	$("#mingeBuffer div.text div").remove();
	$("#mingeBuffer strike").each(function(i, eachLink){$(this).parent().remove();});
	
	$("#mingeBuffer div.text a.callout").wrap("<div class='forumLink'></div>");
	$("#mingeBuffer div.text div.forumLink").append("<br></br>");
	$("#mingeBuffer div.text a[href*='thread']").wrap("<span class='threadLink'></span>");
	$("#mingeBuffer div.text span.count").wrap("<span class='threadCount'></span>");

	$("#mingeBuffer div.text span.threadLink a").each(function(i, eachLink)
		{
			var igLink = eachLink.href.replace("/thread/","/ignore/");
			$(this).parent().parent().parent().append("<div class='ignoreButton'><a href='" + igLink + "'>x</a></div>");
		}
	);
	
	$("#mingeList div.ignoreButton a").live("click", function(event)
	{
		event.preventDefault(); 
		$.ajax({url: $(this).attr("href"), cache: false, success: function(html){return true; }});
		$(this).parent().parent().parent().fadeOut();
		return false;
	});
	
	$("#mingeList div.ignoreButton a").live("mouseover", function(event){$(this).parent().parent().parent().css("opacity", 0.3);});
	$("#mingeList div.ignoreButton a").live("mouseout", function(event){$(this).parent().parent().parent().css("opacity", 1);});

	$("#mingeBuffer div.summary").clone().appendTo("#mingeList").wrap("<li class='tickBox'></li>");
	$("#mingeBuffer").empty();
	
}

