// ==UserScript==
// @name           	Twitter Enhancements: Retweet This *Update*
// @namespace      	http://twitter.com
// @description   	Append a retweet button to the end of each twitter entry
// @include        	http://twitter.com/*
// @include        	https://twitter.com/*
// @author    		Ziru
// @author    		Carl Furrow
// @require			http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js
// @require			http://simplemodal.googlecode.com/files/jquery.simplemodal-1.2.2.min.js
// ==/UserScript==
//Carl: Added jquery functionality to replace status box without a postback.
//Carl[1.13.2009]: Added a modal dialog (thanks to Eric Martin's SimpleModal plugin) for retweets, instead of using the Twitter status bar.
	//This allows for retweeting from any page on twitter, not just ones with a textbox at the top (ie. Favorites, etc)

const locale = '';
// const locale = 'zh-CN';
$(document).ready(function(){
	$('head').append("<link href='http://oneof.us/iworkwithcomputers/dev/jquery/twitter_enhancement_retweet_this/retweetthis.css' type='text/css' rel='stylesheet'>");
});
// All your GM code must be inside this function
    function letsRetweet(retweetStr) {
			//TODO: Restrict textbox to 140 characters. Can we reuse twitter's code here?
			
			$("<div class='rtContainer'><textarea id='rtTextArea' cols='45' size='400' /><div class='rtLinkRow'><a href='#' class='rtRetweet'>Retweet</a></div></div").modal();
			$("a.modalCloseImg").append(CreateModalCloseButton());
			$("textarea#rtTextArea").val(retweetStr);
			$("a.rtRetweet").click(function(){
				$.ajax({
					type:"POST",
					url: "http://twitter.com/statuses/update.json",
					data: "status="+retweetStr,
					success: function(msg){
							$("div.rtContainer").html("<h2>Retweet Success!</h2>")
						
						}
					});				
			});
    }

var gblRetweetTemplate, gblRetweetButtonTitle;

if (locale == 'zh-CN') {
  	gblRetweetTemplate = '[ËΩ¨] @%a: %c';
	  gblRetweetButtonTitle = 'ËΩ¨Âèë';
} 
else {
  gblRetweetTemplate = 'RT @%a: %c';
  gblRetweetButtonTitle = 'Retweet this';
}

function createButton(target, func, title, width, height, src) {
  var img, button;
  img = document.createElement('img');
  img.width = width;
  img.height = height;
  img.src = src;
  button = document.createElement('a');
  button._target = target;
  button.title = title;
  button.href = '#';
  button.addEventListener('click', func, true);
  button.appendChild(img);
  return button;
}

function GetEntryAuthor(entry) {
  var url = document.location.href.replace(/\?.*/g,'');
  var re = /^https?:\/\/twitter.com\/(.*)$/;
  return re.exec(entry.getElementsByClassName('url')[0].href)[1];
}
function GetEntryAuthorAlt(entry)
{
	var url = document.location.href.replace(/\?.*/g,'');
	url = url.replace(/#/g,'');
	var re = /^https?:\/\/twitter.com\/(.*)$/;
	return re.exec(url)[1];
}

function getText(elem) {
  var result = '';
  for (var i = 0; i < elem.childNodes.length; i++) {
    var childElem = elem.childNodes[i];
    if (childElem.nodeType == 3)
      result = result + childElem.nodeValue;
    else if ((childElem.nodeType == 1) && (childElem.tagName.toUpperCase() == 'A'))     // remove the html link tag
      result = result + childElem.firstChild.nodeValue;
  }
  return result.replace(/\n/g,'').replace(/^ *\t* */g, '').replace(/ *\t* *$/g, '');
}

function OnRetweetButtonClicked(event, entry) {
	var entryAuthor;
	try{
		  entryAuthor = GetEntryAuthor(entry);
	}
	catch(e)
	{
		entryAuthor =GetEntryAuthorAlt(entry);
	}

  var entryContent = getText(entry.getElementsByClassName('entry-content')[0]);
  var retweetStr = gblRetweetTemplate.replace(/%a/g, entryAuthor).replace(/%c/g, entryContent);
  var url = document.location.href.replace(/\?.*/g,'');
  var re = /^(https?:\/\/twitter.com\/).*$/;
  var m = re.exec(url);
  letsRetweet(retweetStr);
  event.preventDefault();
}

function CreateModalCloseButton()
{
	return createButton(
		null,
		function(event){},
		null,
		25,
		25,
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAdCAYAAABfeMd1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8xJREFUeNqclktIVFEYx+fO+GjUGqw0S/IRGtTKENtkqJTkooUwC0EQNNpEEiJYoISbKAhcCYogagvBlbRQW/kAIdAkbRGIi3RiNIfJR+qk4zxO/2/4zu3cOw+tA7+5c8/j+5/vfN8592hCCMspSy4o4acXLIHVU40kkQTkglfgm4hd3KAb3PxfESf4KU5XAuBRPA0tznINgCa1Yn193bK0tBR5ZmVlWUpKSiyFhYXmcfPgiaZpn0/yZEKd4vLysqioqKCZRAEhMTc3Z/bqy0nL9Uzt3dXVJex2e0wBic1mEx0dHcLv96tDX8cTyVN7tbW1JTRupr6+3uzR7Vgib2Tr5ORklJHa2lrDe0FBgVhcXDTUDw8PqyIfY4m4ZGt5ebnB4OrqaqS+srJSj8XOzk6kbnBwUO9XVFQkgsGgKmTTRQ4PD/NlrcvlivKis7Mz0kZiJBRLQDI7O/s3rwOBu7oI1B/KhrGxsaiBtDTSsCyxBIj+/n69D+w+Jg0r/YTD4Wy5fF6vNyoD19bWLENDQ4b3pqammBtPHQ+diF0rNo4GxT3Z4HA4ogbSxmtsbNTf4ZnhXS1Ief1/KBQ6og0f2fXIkuJ4MVGDLBOACtVRW6KYuN3ue7oISIc3btmoDp6enjYYbWlp0Y3Qf1UAx40hu0pLSx0yJPRz1uPxvJONo6OjhswiAZm+BBlX3yU9PT26gM/no/PrHLDpIr29vQ/U7GloaDBk10k7vrq62uDF+Pg4ZYbDIAKuzc/PD8hOdBbRUXGaI6Wmpkbs7+/rAltbW19RX2wWSQd54A6WzaV6REcFjvSYxikGtESqBwcHB7vt7e30bSngyVtl4M+AHHCrubn5+cbGxqb5tFtYWBB9fX2iu7s78pyZmYn6ciF2e62trS9hpwxcAWlqdqWA8+A6uA+ejoyMfBL/UFZWVjbr6ureYmwNuAEugtSIff4y0rpl8CWhFDjBC6fT+R4BdB8dHYXiGZ+amvJgY35A/3ZQB+iIv8pLlaR/frHpad2S2b1McJk75vPzUlVVVV5ZWdmF5ORkGw6+EL6YvyYmJlyIxyba3eA7swG2gQ8E6NSSIhoHKIWTgISyWSyH/2fyJMjrMPgNdvl6REI/gAfsgANwTCcLJYh+kWAhGwulcfplcqwyeWPZuQ8NpnNpn41uM3vsAQkEOQuNtxWTUCp7lcHPNK6zsifH7I2PZ+5j4QBPIhz3SqQsXRLHKZVFU/hd4xkGWcjPT7k8IelBwnsXC0kxK3tn4/9SJKwYDTPCLJDocmcWlPtJUy86isGERv4IMACaz3RmXeGcqwAAAABJRU5ErkJggg%3D%3D'
		);
}
function CreateRetweetButton(entry) {
  return createButton(
            null,
            function(event) { OnRetweetButtonClicked(event, entry); },
            gblRetweetButtonTitle,
            13,
            12,
            'data:image/png;base64,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');
}

function addRetweetButtonToEntry(entry) {
  var actions = entry.getElementsByClassName('actions');
  if (!actions)
    actions = entry.getElementsByClassName('status-actions');
  var action = actions[0];
  if (action) {
    var button = CreateRetweetButton(entry);
    action.appendChild(button);
    button.style.display = 'none';
    button.style.margin = '0';
    entry.addEventListener('mouseover', function(evt) {  button.style.display = 'inline'; }, true);
    entry.addEventListener('mouseout', function(evt) { button.style.display = 'none'; }, true);
  }
}

// =================  MAIN ================= 
var entryElems = document.getElementsByClassName('hentry');
if (!entryElems) return;
for (var i = 0; i < entryElems.length; i++)
  addRetweetButtonToEntry(entryElems[i]);