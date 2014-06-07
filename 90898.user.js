// ==UserScript==
// @name           Trolliminator
// @namespace      trolliminator
// @description    Gets rid of those annoying trolls.
// @include        http://www.facepunch.com/threads/*
// @include        http://facepunch.com/threads/*
// Built using code from Siemens' FurryFlagger V2
// @version 		1.0
// @require 		http://sizzlemctwizzle.com/updater.php?id=90898 id&days=1
/*
Copyright 2010 Charlie Somerville. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY CHARLIE SOMERVILLE ``AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHARLIE SOMERVILLE OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the
authors and should not be interpreted as representing official policies, either expressed
or implied, of Charlie Somerville.
*/
// ==/UserScript==

if (typeof(google) == 'undefined')
{
	fn(unsafeWindow.jQuery, unsafeWindow);
}
else
{
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('$(document).ready(function() { (' + fn + ')(jQuery,window); });'));
	document.head.appendChild(script);
}

function fn($,window) {
	
	function getValue(name, def)
	{
		var s = window.localStorage.getItem(name); return (s===undefined || s===null) ? def : s;
	}
	function setValue(name, value)
	{
		return window.localStorage.setItem(name, value)
	}
	
	var OFF = 42;
	function isSettingOn(setting)
	{
		return getValue(setting) != OFF;
	}
	function switchSettingOn(setting)
	{
		setValue(setting, 0);
	}
	function switchSettingOff(setting)
	{
		setValue(setting, OFF);
	}

	function processPost(post)
	{
		if(isSettingOn("showPost"))
		{
			var blocked = $("<div>").text("This post by " + post.find("a.username").text() + " has been blocked by Trolliminator.")
				.css("padding", "16px")
				.css("font-size", "16px")
				.css("font-weight", "bold")
				.css("background", "#dfc7a2")
				.css("clear", "both")
				.css("color", "#473519");
				
			var showLink = $("<a>").attr("href","#").text("(temporarily unblock)")
				.css("font-weight","bold")
				.css("margin-right","4px")
				.click(function() {
					showLink.fadeOut('fast',function() {
						$(this).text("Are you sure?").css("color","red").click(function() {
							$(this).fadeOut();
							blocked.fadeOut(function() { $(this).remove(); });
							post.children().slideDown();
							return false;
						}).fadeIn('fast');			
					});
					return false;
				});
			showLink.prependTo(post.find(".posthead .nodecontrols"));
				
			post.children().not(".posthead").hide();
			blocked.appendTo(post);
		}
		
		var userinfo = post.find(".userinfo");
		userinfo.find("a.username").removeClass("online").css("color", "#473519");
		var title = userinfo.find(".usertitle");
		title.text("Troll").css("font-weight","bold").css("font-size","24px").css("color","red");
		$("<img src='http://www.facepunch.com/fp/emoot/siren.gif'>").prependTo(title);
		$("<img src='http://www.facepunch.com/fp/emoot/siren.gif'>").appendTo(title);
		
		post.find(".postdetails, .postfoot").css("background","#f0e5d4");
		
		/*
		if(isSettingOn("ratePost"))
		{
			var ratings = post.find(".postrating a");
			if(ratings.size() < 2)
				return;
				
			var attrs = ratings.last()[0].attributes;
			for(var i = 0; i < attrs.length; i++)
			{
				if(attrs[i].name != "onclick")
					continue;
				
				new Function("RatePost", attrs[i].value)(window.RatePost);
			}
		}
		*/
	}	
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://fpcm.dlinkddns.com/Trolls.txt',
		onload: function(resp) {
		
			var trolls = $.parseJSON(resp.responseText);
			
			$("#posts li").each(function() {
				var $this = $(this);
				var username = $this.find("a.username").text();
				
				if($.inArray(username, trolls) > -1) {
					processPost($this);
				}
			});
		}
	});
	
	settings = [
		{ title: "Block troll posts", name: "showPost" },
		/*{ title: "Auto-rate dumb", name: "ratePost" },*/
		//{ title: "Notify when updates are available", name: "updateNotify" }
	];
	
	$opts = $("<div>")
		.css("padding","6px 10px")
		.css("background","url('/images/buttons/newbtn_middle.png') repeat-x scroll left top #2266FF")
		.css("border","1px solid #666666")
		.css("color","#ffffff")
		.css("float","left")
		.css("margin-right","8px")
		.css("line-height","13px")
		.css("margin-top","-5px")
		.css("font-size","11px")
		.css("-moz-border-radius","5px").css("-webkit-border-radius","5px").css("border-radius","5px")
		.css("cursor","pointer")
		.text("Trolliminator Options")
		.click(function() { $menu.slideDown('fast'); return false; });
	
	if($("#above_postlist").size() == 0)
	{
		var above_postlist = $("<div>").attr("id","above_postlist").addClass("above_postlist").insertBefore($("#postlist"));
		$("<div>").attr("id","pagination_top").addClass("pagination_top").appendTo(above_postlist).append($("<form>"));
	}
	
	$("#pagination_top form").prepend($opts);
		
	$menu = $("<div>").css("background","white").css("border","1px solid black").css("padding","8px").css("width", "240px").css("font-size","12px")
		.css("position","absolute").css("left", $opts.position().left + "px").css("top", ($opts.position().top + 24) + "px").css("z-index", "9").hide();
	
	
	$("#pagination_top form").prepend($menu);
		
	for(var i = 0; i < settings.length; i++)
	{
		(function(setting) {
		
			$menu.append($("<strong>").css("display","block").css("font-size","14px").text(setting.title));
			var div = $("<div>").css("margin-bottom","8px");
			$menu.append(div);
			
			div.append($( isSettingOn(setting.name) ? "<b>" : "<a>" ).attr("href","#").text("On").css("margin-right","16px").click(function() { switchSettingOn(setting.name); $menu.slideUp('fast'); location.reload(); return false; }));
			div.append($( isSettingOn(setting.name) ? "<a>" : "<b>" ).attr("href","#").text("Off").css("margin-right","16px").click(function() { switchSettingOff(setting.name); $menu.slideUp('fast'); location.reload(); return false; }));
		
		})(settings[i]);
	}
	$("<a>").attr("href","#").text("Close").css("display","block").css("float","right").click(function() { $menu.slideUp('fast'); return false; }).appendTo($menu);
	
}

