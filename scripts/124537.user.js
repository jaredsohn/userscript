{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf350
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;}
\paperw11900\paperh16840\margl1440\margr1440\vieww9000\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\ql\qnatural

\f0\fs24 \cf0 // ==UserScript==\
// @name           Facebook AutoLike\
// @namespace      AutoLike\
// @description    Automaticly like facebook statuses and comments\
// @include        http://www.facebook.com/*\
// ==/UserScript==\
\
// ==Credits==\
body = document.body;\
if(body != null) \{\
	div = document.createElement("div");\
	div.style.position = "fixed";\
	div.style.bottom = "+122px";\
	div.style.left = "+6px";\
	div.style.backgroundColor = "#eceff5";\
	div.style.border = "2px solid #94a3c4";\
	div.style.padding = "2px";\
	div.innerHTML = "<a style=\\"font-weight:bold;color:#333333\\" href=\\"/indp.abhie\\">Created by \'abAbiiiiiiiiiiii\'bb</a>"\
	\
	body.appendChild(div);\
\}\
// ==============\
// ==Expand==\
body = document.body;\
if(body != null) \{\
	div = document.createElement("div");\
	div.style.position = "fixed";\
	div.style.bottom = "+102px";\
	div.style.left = "+6px";\
	div.style.backgroundColor = "#eceff5";\
	div.style.border = "2px solid #94a3c4";\
	div.style.padding = "2px";\
	div.innerHTML = "<a style=\\"font-weight:bold;color:#333333\\" href=\\"JavaScript:AutoExpand()\\">Tampilkan Semua Komentar</a>"\
	\
	body.appendChild(div);\
	\
	unsafeWindow.AutoExpand = function() \{\
	\
		buttons = document.getElementsByTagName("input");\
		for(i = 0; i < buttons.length; i++) \{\
			myClass = buttons[i].getAttribute("class");\
			if(myClass != null && myClass.indexOf("") >= 0)\
				if(buttons[i].getAttribute("name") == "view_all[1]")\
					buttons[i].click();\
		\}\
		\
	\};\
\}\
// ==============\
// ==Statuses==\
body = document.body;\
if(body != null) \{\
	div = document.createElement("div");\
	div.style.position = "fixed";\
	div.style.bottom = "+72px";\
	div.style.left = "+6px";\
	div.style.backgroundColor = "#eceff5";\
	div.style.border = "2px solid #94a3c4";\
	div.style.padding = "2px";\
	div.innerHTML = "<a style=\\"font-weight:bold;color:#333333\\" href=\\"JavaScript:AutoLike()\\">Like semi status</a>"\
	\
	body.appendChild(div);\
	\
	unsafeWindow.AutoLike = function() \{\
	\
		buttons = document.getElementsByTagName("button");\
		for(i = 0; i < buttons.length; i++) \{\
			myClass = buttons[i].getAttribute("class");\
			if(myClass != null && myClass.indexOf("like_link") >= 0)\
				if(buttons[i].getAttribute("name") == "like")\
					buttons[i].click();\
		\}\
		\
	\};\
\}\
// ==============\
// ==Unlike Statuses==\
body = document.body;\
if(body != null) \{\
	div = document.createElement("div");\
	div.style.position = "fixed";\
	div.style.bottom = "+52px";\
	div.style.left = "+6px";\
	div.style.backgroundColor = "#eceff5";\
	div.style.border = "2px solid #94a3c4";\
	div.style.padding = "2px";\
	div.innerHTML = "<a style=\\"font-weight:bold;color:#333333\\" href=\\"JavaScript:AutoUnLike()\\">Unlike semua status</a>"\
	\
	body.appendChild(div);\
	\
	unsafeWindow.AutoUnLike = function() \{\
	\
		buttons = document.getElementsByTagName("button");\
		for(i = 0; i < buttons.length; i++) \{\
			myClass = buttons[i].getAttribute("class");\
			if(myClass != null && myClass.indexOf("like_link") >= 0)\
				if(buttons[i].getAttribute("name") == "unlike")\
					buttons[i].click();\
		\}\
		\
	\};\
\}\
// ==============\
// ==Comments==\
body = document.body;\
if(body != null) \{\
	div = document.createElement("div");\
	div.style.position = "fixed";\
	div.style.bottom = "+22px";\
	div.style.left = "+6px";\
	div.style.backgroundColor = "#eceff5";\
	div.style.border = "2px solid #94a3c4";\
	div.style.padding = "2px";\
	div.innerHTML = "<a style=\\"font-weight:bold;color:#333333\\" href=\\"JavaScript:AutoLikeComments()\\">Like semua komentar</a>"\
	\
	body.appendChild(div);\
	\
	unsafeWindow.AutoLikeComments = function() \{\
	\
		buttons = document.getElementsByTagName("button");\
		for(i = 0; i < buttons.length; i++) \{\
			myClass = buttons[i].getAttribute("class");\
			if(myClass != null && myClass.indexOf("") >= 0)\
				if(buttons[i].getAttribute("title") == "Like this comment")\
					buttons[i].click();			\
															\
		\}\
		\
	\};\
\}\
// ==============\
// ==Unlike Comments==\
body = document.body;\
if(body != null) \{\
	div = document.createElement("div");\
	div.style.position = "fixed";\
	div.style.bottom = "+2px";\
	div.style.left = "+6px";\
	div.style.backgroundColor = "#eceff5";\
	div.style.border = "2px solid #94a3c4";\
	div.style.padding = "2px";\
	div.innerHTML = "<a style=\\"font-weight:bold;color:#333333\\" href=\\"JavaScript:AutoUnLikeComments()\\">Unlike all komentar</a>"\
	\
	body.appendChild(div);\
	\
	unsafeWindow.AutoUnLikeComments = function() \{\
	\
		buttons = document.getElementsByTagName("button");\
		for(i = 0; i < buttons.length; i++) \{\
			myClass = buttons[i].getAttribute("class");\
			if(myClass != null && myClass.indexOf("") >= 0)\
				if(buttons[i].getAttribute("title") == "Unlike this comment")\
					buttons[i].click();\
		\}\
		\
	\};\
\}\
// ==============\
}