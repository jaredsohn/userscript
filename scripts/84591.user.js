// ==UserScript==
// @name    		Gaia - Quick Reply Extra Features
// @author  		Mindset (http://www.gaiaonline.com/p/mindset)
// @description 	Adds features to Gaia's forum Quick Reply box, such as a preview button and a formatting bar.
// @include 		http://www.gaiaonline.com/forum/*/t.*
// @require 		http://code.jquery.com/jquery-1.3.2.min.js
// @require 		http://sizzlemctwizzle.com/updater.php?id=84591
// ==/UserScript==

/* Last update - much better preview code */

/* Begin deprecated script update checker code - will remove next version */
var version_timestamp = 1296117134470;
/* End Script Update Checker code */

var loc = document.URL;
var textbox = document.getElementById("qr_text");

var newcss = "#qr_container { width: 530px; } \n\
#qr_container #qr_text { width: 500px; } \n\
#editor{width:480px;} \n\
 \n\
/* FORMAT TOOLS */ \n\
#editor #format_controls {padding:13px 8px 0 0;} \n\
#editor #format_controls ul{margin:0 20px 0 0;} \n\
#editor #format_controls .format-text, \n\
#editor #format_controls .format-elements, \n\
#editor #format_controls .format-links {float:left;} \n\
 \n\
/* The buttons have an on/off state and use a sprite to save on http requests */ \n\
#editor #format_controls li {float:left;margin-right:2px;list-style-type:none;} \n\
#editor #format_controls li a { height:19px; width:23px; display:block; \n\
background:url(/src/js/gaia/widgets/editor/btn_editor_toolbar_new.gif) no-repeat; \n\
text-indent:-9999em; overflow:hidden; line-height:100%; padding: 0; } \n\
#editor #format_controls #format-bold{background-position:left 0;width:23px;} \n\
#editor #format_controls #format-bold:hover{background-position:left bottom;} \n\
#editor #format_controls #format-italics{background-position:-23px 0;} \n\
#editor #format_controls #format-italics:hover{background-position:-23px bottom;} \n\
#editor #format_controls #format-underline{background-position:-46px 0;} \n\
#editor #format_controls #format-underline:hover{background-position:-46px bottom;} \n\
#editor #format_controls #format-strike{background-position:-69px 0;} \n\
#editor #format_controls #format-strike:hover{background-position:-69px bottom;} \n\
#editor #format_controls #format-textcolor{background-position:-92px 0;} \n\
#editor #format_controls #format-textcolor:hover{background-position:-92px bottom;} \n\
#editor #format_controls #format-textsize{background-position:-115px 0;width:36px;} \n\
#editor #format_controls #format-textsize:hover{background-position:-115px bottom;} \n\
#editor #format_controls #format-align-left{background-position:-151px 0;} \n\
#editor #format_controls #format-align-left:hover{background-position:-151px bottom;} \n\
#editor #format_controls #format-align-center{background-position:-174px 0;} \n\
#editor #format_controls #format-align-center:hover{background-position:-174px bottom;} \n\
#editor #format_controls #format-align-right{background-position:-197px 0;} \n\
#editor #format_controls #format-align-right:hover{background-position:-197px bottom;} \n\
#editor #format_controls #format-quote{background-position:-220px 0;width:43px;} \n\
#editor #format_controls #format-quote:hover{background-position:-220px bottom;} \n\
#editor #format_controls #format-code{background-position:-263px 0;width:36px;} \n\
#editor #format_controls #format-code:hover{background-position:-263px bottom;} \n\
#editor #format_controls #format-url{background-position:-299px 0;width:36px;} \n\
#editor #format_controls #format-url:hover{background-position:-299px bottom;} \n\
#editor #format_controls #format-image{background-position:-335px 0;width:36px;} \n\
#editor #format_controls #format-image:hover{background-position:-335px bottom;} \n\
#editor #format_controls #format-imageleft{background-position:-371px 0;width:58px;} \n\
#editor #format_controls #format-imageleft:hover{background-position:-371px bottom;} \n\
#editor #format_controls #format-imageright{background-position:-429px 0;width:58px;} \n\
#editor #format_controls #format-imageright:hover{background-position:-429px bottom;} \n\
#editor #format_controls #format-imagemap{background-position:-487px 0;width:58px;} \n\
#editor #format_controls #format-imagemap:hover{background-position:-487px bottom;} \n\
#editor #format_controls #format-media{background-position:-568px 0;width:69px;} \n\
#editor #format_controls #format-media:hover{background-position:-568px bottom;} \n\
#editor #format_controls #format-video{background-position:-637px 0;width:69px;} \n\
#editor #format_controls #format-video:hover{background-position:-637px bottom;} \n\
";

var previewButton = '<a href="javascript:{}" id="qr_preview" class="cta-button-sm gray-button" tabindex="4" style="float: right; margin: 10px 15px 0px 0px;"><span class="button_text">Preview</span></a>';

var formatbar = '<div id="editor"><div id="format_controls"><ul class="format-text"><li><a href="javascript:{}" id="format-bold" class="bold" title="Bold text - [b][/b]">Bold text</a></li><li><a href="javascript:{}" id="format-italics" class="italics" title="Italicize text - [i][/i]">Italicize text</a></li><li><a href="javascript:{}" id="format-underline" class="underline" title="Underline text - [u][/u]">Underline text</a></li><li><a href="javascript:{}" id="format-strike" class="strike" title="Strike text - [strike][/strike]">Strike text</a></li></ul><ul class="format-elements"><li><a href="javascript:{}" id="format-quote" class="quote" title="Quote - [quote][/quote]">Quote</a></li><li><a href="javascript:{}" id="format-code" class="code" title="Code - [code][/code]">Code</a></li></ul><ul class="format-links"><li><a href="javascript:{}" id="format-url" class="url" title="Add URL - [url=http://restofurl]Webpage Title[/url]">Add URL</a></li><li><a href="javascript:{}" id="format-image" class="image" title="Add image - [img]http://restofurl[/img]">Add Image</a></li></ul></div></div>';

/* if there's a Quick Reply on this page, add the css, the
preview button and formatbar, and their event handlers */
if ( document.getElementById("qr_submit") != null )
{
	addGlobalStyle(newcss);
	$("#qr_submit").after(previewButton);
	$("#qr_text").before(formatbar);
	$("#qr_preview").click(preview);
	$("#format-bold").click(function() {
		format("b");
		});
	$("#format-italics").click(function() {
		format("i");
		});
	$("#format-underline").click(function() {
		format("u");
		});
	$("#format-strike").click(function() {
		format("strike");
		});
	$("#format-quote").click(function() {
		format("quote");
		});
	$("#format-code").click(function() {
		format("code");
		});
	$("#format-url").click(insert_link);
	$("#format-image").click(insert_img);
}

/* various functions */
function addGlobalStyle(css) //add the new CSS
{
	var head, style;
	head = document.getElementsByTagName("head")[0];
	if (!head) { return; }
	style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = css;
	head.appendChild(style);
}

function preview()  // grab the reply text and send it to the compose page via an invisible form
                    // slightly modded from Absol's code http://userscripts.org/scripts/review/68957
{
	var reply = $("#qr_text").val();
	var thread = loc.substring(loc.lastIndexOf(".")+1,loc.lastIndexOf("/"));
	if (thread.indexOf("_") != -1 )
	{
		thread = thread.substring(0,thread.lastIndexOf("_"));
	}
	var previewform = document.createElement("form");
	previewform.style.display = "none";
	previewform.setAttribute("action","/forum/compose/entry/new/"+thread+"/");
	previewform.setAttribute("method","post");
	previewform.innerHTML = "<textarea name='message'>"+reply+"</textarea><input type='text' value='preview' name='action_preview'/>";
	document.body.appendChild(previewform);
	$(previewform).submit();
}

function format(tag) // insert format tags
{
	if (typeof textbox.selectionStart != "undefined")
	{
		var before, after, selection;
		before = textbox.value.substring(0, textbox.selectionStart);
		str = textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
		after = textbox.value.substring(textbox.selectionEnd, textbox.value.length);
		textbox.value = String.concat(before, "[" + tag + "]", str, "[/" + tag + "]", after);
	}
	textbox.focus();
}

function insert_link() // insert a link
{
	var link = prompt("Enter your URL","http://");
	var title;
	if (link != null) 
	{
		if (typeof textbox.selectionStart != "undefined") 
		{
			var before, after, selection;
			before = textbox.value.substring(0, textbox.selectionStart);
			str = textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
			after = textbox.value.substring(textbox.selectionEnd, textbox.value.length);
			if (!str) // no text selected
			{
				title = prompt("Enter the webpage title","Webpage Title");
			}
			else
			{
				title = prompt("Enter the webpage title",str);
			}
			var newstr = "[url=" + link + "]" + title + "[/url]";
			textbox.value = String.concat(before, newstr, after);
		}
	}
	textbox.focus();
}

function insert_img() // insert an image
{
	var image = prompt("Enter your image URL","http://");
	if (image != null) 
	{
		if (typeof textbox.selectionStart != "undefined") //all other browsers
		{
			var before, after, selection;
			before = textbox.value.substring(0, textbox.selectionStart);
			str = textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
			after = textbox.value.substring(textbox.selectionEnd, textbox.value.length);
			var newstr = "[img]" + image + "[/img] " + str;
			textbox.value = String.concat(before, newstr, after);
		}
	}
	textbox.focus();
}
