{\rtf1\ansi\ansicpg1252\cocoartf1187\cocoasubrtf340
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720

\f0\fs24 \cf0 // ==UserScript==\
// @name            LeakForums Tahoma white\
// @namespace       DeathD\
// @description     Makes text Tahoma white.\
// @include         *leakforums.org/newreply.php*\
// @include         *leakforums.org/showthread.php*\
// @version         2.2.0\
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js\
// ==/UserScript==\
\
var GM_available, localStorage_available, post_setup, preset_config, table;\
GM_available = typeof GM_getValue !== "undefined" && GM_getValue !== null;\
localStorage_available = typeof localStorage !== "undefined" && localStorage !== null;\
\
\
var opening = "[font=Tahoma][color=white]";\
var closing = "[/color][/font]";\
\
var x = 1;//required\
\
\
\
if (localStorage_available) \{//Credit to PyroStorm\
				opening=localStorage.getItem("LF_post_opening");\
				closing=localStorage.getItem("LF_post_closing");\
                if (opening === null) \{\
				if (closing === null) \{\
                    opening="";\
					closing="";\
					\}\
                \}\
            \} else \{\
                opening = GM_getValue("LF_post_opening", "");\
				closing = GM_getValue("LF_post_closing", "");\
            \}\
\
\
\
	$('.bottommenu span.smalltext').append(' | <a name = "mylink" href="javascript:void(0)">Post Preset</a>');\
	$(".bottommenu a[name='mylink']").click (myfunction);\
function myfunction () \{//handle when the checkbox is changed\
    var a;\
	var b;\
            a = prompt("Enter your opening preset:", opening).replace(/\\\\n/g, "\\n");\
			b = prompt("Enter your closing preset:", closing).replace(/\\\\n/g, "\\n");\
            if (localStorage_available) \{\
                localStorage.setItem("LF_post_opening", a);\
				localStorage.setItem("LF_post_closing", b);\
				\
            \} else \{\
                GM_setValue("LF_post_opening", a);\
				GM_setValue("LF_post_closing", b);\
            \}\
\}\
\
\
\
\
\
\
var openingquote = " " + closing + "[quote";\
var closingquote = "[/quote]" + opening;\
if (window.location.href.indexOf("showthread.php*") === -1) \{//find out what page we are on\
var checkboxCell = $("#content input[name^='postoptions']").parents ("span.smalltext");\
\}\
else\
\{\
var checkboxCell    = $("#quickreply_e td:eq(0) span.smalltext");\
\}\
\
if (checkboxCell.length) \{//add checkbox\
    checkboxCell.append (\
        '<br><label><input type="checkbox" class="checkbox" name="myVeryOwnCheckbox" value="1" checked="checked" />'\
        + '&nbsp;<strong>Post preset</strong></label>'\
    );\
\
    $("#quickreply_e input[name='myVeryOwnCheckbox']").change (myCheckboxChangeHandler);\
	$("#content input[name='myVeryOwnCheckbox']").change (myCheckboxChangeHandler);\
\}\
\
\
\
\
\
function myCheckboxChangeHandler () \{//handle when the checkbox is changed\
    this.checked ? x=1 : x=0;\
	//return ((this.checked ? 1 : 0));\
\}\
\
\
\
\
function form_submit (event) \{//for catching the form submit and 'ingecting' the code\
\
    var form, bClickNotSubmit;\
\
    if (event  &&  event.type == 'click') \{\
        \
    event.preventDefault ();\
    event.stopPropagation ();\
        bClickNotSubmit = true;\
        form            = document.getElementById ('quick_reply_form');\
    \}\
    else \{\
        bClickNotSubmit = false;\
        form            = event ? event.target : this;\
    \}\
\
	\
	\
		var arTextareas = form.getElementsByTagName ('textarea');\
		\
	if(x === 1)\{\
		for (var i = arTextareas.length - 1; i >= 0; i--) \{\
			var elmTextarea     = arTextareas[i];\
			if (elmTextarea.value.indexOf(opening) == -1)\{\
			elmTextarea.value   = opening + elmTextarea.value + closing;\
                        elmTextarea.value = elmTextarea.value.replace(/\\[quote/img, openingquote);\
			elmTextarea.value = elmTextarea.value.replace(/\\[\\/quote\\]/img, closingquote);\
			\}\
		\}\
	\}\
	\
	\
	\
	\
    //if ( ! bClickNotSubmit ) \{\
    form._submit();\
//\}\
//else \{\
 //   event.preventDefault ();\
  //  event.stopPropagation ();\
 //   return false;\
//\}\
\
\}\
\
window.addEventListener ('submit', form_submit, true);\
document.getElementById ('quick_reply_submit').addEventListener ('click', form_submit, true);\
\
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;\
HTMLFormElement.prototype.submit = form_submit;\
}