{\rtf1\ansi\ansicpg1252\cocoartf1138\cocoasubrtf510
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;\red46\green105\blue22;\red150\green87\blue38;\red225\green39\blue42;
\red0\green35\blue242;\red224\green62\blue247;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720

\f0\fs22 \cf2 // ==UserScript==\cf0 \
\cf2 // @name          Custom Google Logo\cf0 \
\cf2 // @namespace     http://www.nathanmalkin.com/projects/userscripts/\cf0 \
\cf2 // @description	  Replaces the Google logo with your own custom logo - NOTE: manual configuration required\cf0 \
\cf2 // @include       http://google.tld/*\cf0 \
\cf2 // @include       http://www.google.tld/*\cf0 \
\cf2 // ==/UserScript==\cf0 \
\cf2 // Notes:\cf0 \
\cf2 //   *** You must define the URL of the custom logo below, or the script will display the default logo! ***\cf0 \
\pard\pardeftab720
\cf3 var\cf0  newLogoURL = \cf4 "http://images.neopets.com/pp/poogle_logo.gif"\cf0 ;\
\
\pard\pardeftab720
\cf2 /*\cf0 \
\cf2     getElementsByAttribute function is:\cf0 \
\cf2 	    Copyright Robert Nyman, {\field{\*\fldinst{HYPERLINK "http://www.robertnyman.com/"}}{\fldrslt \cf4 \ul \ulc4 http://www.robertnyman.com}}\cf0 \
\cf2 	    Free to use if this text is included\cf0 \
\cf2 	Slightly modified to work in this user script\cf0 \
\cf2 */\cf0 \
window.getElementsByAttribute = \cf3 function\cf0 (oElm, strTagName, strAttributeName, strAttributeValue)\{\
    \cf3 var\cf0  arrElements = (strTagName == \cf4 "*"\cf0  && oElm.all)? oElm.all : oElm.\cf5 getElementsByTagName\cf0 (strTagName);\
    \cf3 var\cf0  arrReturnElements = \cf3 new\cf0  \cf5 Array\cf0 ();\
    \cf3 var\cf0  oAttributeValue = (\cf3 typeof\cf0  strAttributeValue != \cf4 "undefined"\cf0 )? \cf3 new\cf0  \cf5 RegExp\cf0 (\cf4 "(^|\cf6 \\\\\cf4 s)"\cf0  + strAttributeValue + \cf4 "(\cf6 \\\\\cf4 s|$)"\cf0 ) : \cf3 null\cf0 ;\
    \cf3 var\cf0  oCurrent;\
    \cf3 var\cf0  oAttribute;\
    \cf3 for\cf0 (\cf3 var\cf0  i=\cf4 0\cf0 ; i<arrElements.length; i++)\{\
        oCurrent = arrElements[i];\
        oAttribute = oCurrent.getAttribute && oCurrent.\cf5 getAttribute\cf0 (strAttributeName);\
        \cf3 if\cf0 (\cf3 typeof\cf0  oAttribute == \cf4 "string"\cf0  && oAttribute.length > \cf4 0\cf0 )\{\
            \cf3 if\cf0 (\cf3 typeof\cf0  strAttributeValue == \cf4 "undefined"\cf0  || (oAttributeValue && oAttributeValue.\cf5 test\cf0 (oAttribute)))\{\
                arrReturnElements.\cf5 push\cf0 (oCurrent);\
            \}\
        \}\
    \}\
    \cf3 return\cf0  arrReturnElements;\
\}\
\
\pard\pardeftab720
\cf3 var\cf0  logos = \cf5 getElementsByAttribute\cf0 (document.body, \cf4 "img"\cf0 , \cf4 "src"\cf0 , \cf4 "/intl/en/images/logo.gif"\cf0 );\
\cf3 if\cf0 (logos != \cf4 ""\cf0 ) \{\
	logos[\cf4 0\cf0 ].src = newLogoURL;\
\} \cf3 else\cf0  \{\
	logos = \cf5 getElementsByAttribute\cf0 (document.body, \cf4 "img"\cf0 , \cf4 "src"\cf0 , \cf4 "/images/logo_sm.gif"\cf0 );\
	\cf3 if\cf0 (logos != \cf4 ""\cf0 ) \{	logos[\cf4 0\cf0 ].src = newLogoURL; \}\
\}}