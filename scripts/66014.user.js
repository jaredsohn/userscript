// ==UserScript==
// @name           ripeToReply
// @namespace      http://userscripts.org/users/79443
// @include        http://www.thingbox.com/forums/thread/*
// @include        http://www.myofficebox.com/forums/thread/*
// @include        http://www.thingbox.com/photos/* 
// @include        http://www.myofficebox.com/photos/* 
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==


$(document).ready(function(){begin();});

function begin()
{
	insertCssHacks();
	addReplyButtons();
}

function insertCssHacks()
{
	
	var css = "";
	css = css + " .user-text a {color: red; text-decoration:none;} ";
	css = css + " .user-text a:hover {color: red; text-decoration:underline;} ";
	css = css + " .xreply {float:right; } ";
	css = css + " .xreplyspan {float:right; padding-right: 15px;} ";
	var stylesheet = $("<style type='text/css'></style>").attr("innerHTML",css);
	var head = $('head');
	head.append(stylesheet);
	
}


function addReplyButtons()
{

	$("div#content div#postings > ul > div > li").each(function(i, eachListItem)
		{
			var postSelector = "li#"+eachListItem.id + " > div.posting > div.user-text";
			var rateThisSelector = "li#"+eachListItem.id + " > div.posting ul.posting-rating";
			var buttonLocAnonSelector = "li#"+eachListItem.id + " > div.posting";
			var buttonLocSelector = "li#"+eachListItem.id + " > div.posting";
			var buttonSelector = "li#"+eachListItem.id + " a.xreply";
			var newPostSelector = "form#commentForm textarea#posting_body"
			
			if ($(rateThisSelector).length==0)
			{
				$(buttonLocAnonSelector).append("<span class='xreplyspan'><a href='#' class='xreply awesome small black'>&nbsp;reply&nbsp;</a></span>");
			}
			else
			{
				$(rateThisSelector).append("<li><a href='#' class='xreply awesome small black'>&nbsp;reply&nbsp;</a></li>");
			}

			$(buttonSelector).live("click", function(event)
				{
					event.preventDefault();
					var sourceTextArray = $.trim($(postSelector).text()).split(/[\r\n]/);
					
					var sourceText = ""; 
					for (eachParagraphIndex in sourceTextArray)
					{
						var t = $.trim(sourceTextArray[eachParagraphIndex]);
						if (t.length > 0 )
						{
							sourceText = sourceText + "_" + t + "_\r\n\r\n";
						}
					}
					
					var quoteText = whoLinkText(eachListItem.id) + sourceText + $(newPostSelector).val();
					$(newPostSelector).val(quoteText);
					$(newPostSelector).focus();
					return false;
				});
		}
	);
}

function whoLinkText(postId)
{
	var currentPage = window.location.pathname + "#" + postId;
	return '"' + trimmedToFirstColon(whoText(postId)) + '":' +currentPage + ' said: \r\n\r\n';
}

function whoText(postId)
{
		var whoSelector = "li#" + postId + " > div.posting a.profile";
		var deletedWhoSelector = "li#"+ postId + " > div.posting a strike";
		var anonSelector = "li#"+ postId + " > div.posting:first-child";

		if ($(whoSelector).length > 0) return $(whoSelector).text();
		if ($(deletedWhoSelector).length > 0) return $(deletedWhoSelector).text();
		return $(anonSelector).text();
}

function trimmedToFirstColon(incomingString)
{
	var idx = incomingString.indexOf(":");
	if (idx == -1) return $.trim(incomingString);
	return $.trim(incomingString.substr(0,idx));
}
