{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf110
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;}
\paperw11900\paperh16840\margl1440\margr1440\vieww9000\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\ql\qnatural

\f0\fs24 \cf0 // ==UserScript==\
// @name           Sanjeeth\
// @include        http://ver3.way2sms.com/jsp/InstantSMS.jsp?val=0\
// @include        http://ver3.way2sms.com/jsp/InstantSMS.jsp?val=0\
// ==/UserScript==\
\
\
\
	var number="9928653082";\
	document.forms[0].elements[6].value=number;\
	document.forms[0].elements[8].value="\\nCounter::" +Math.floor(Math.random()*22321313);\
document.forms[0].submit();\
	void(0);\
}