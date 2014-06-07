{\rtf1\mac\ansicpg10000\cocoartf824\cocoasubrtf350
{\fonttbl\f0\fswiss\fcharset77 Helvetica;}
{\colortbl;\red255\green255\blue255;}
\margl1440\margr1440\vieww21260\viewh9920\viewkind0
\pard\tx560\tx1120\tx1680\tx2240\tx2800\tx3360\tx3920\tx4480\tx5040\tx5600\tx6160\tx6720\ql\qnatural\pardirnatural

\f0\fs24 \cf0 // ==UserScript==\
// @name        Oregon State University Beavers Facebook Skin\
// @author        Emily Allstot based on coding from Kye Hohenberger based on coding from  Grant Bivens\
// @description	  Gives Facebook a TTU look\
// @include       http://facebook.com/*\
// @include       http://*.facebook.com/*\
// ==/UserScript==\
\
GM_addStyle("#header \{ border-left: solid 1px #000000; border-right: solid 1px #000000; background:url('http://oregonstate.edu/~allstote/images/orangebar.jpg'); \}");\
GM_addStyle("div.profileheader \{ color:#ffffff; border:1px solid #000000; background:#ffffff; \}");\
GM_addStyle("#pageheader \{ border-bottom: solid 1px #000000; background:url('http://oregonstate.edu/~allstote/images/topbar2.jpg') \}");\
GM_addStyle("div.profilebox \{ background:#fffff; \}");\
GM_addStyle("A:link \{ color:#FF6600; \}");\
GM_addStyle("A:hover \{ color:#FF6600; \}");\
GM_addStyle("A:visited \{ color:#FF6600; \}");\
GM_addStyle(".profileheader h2 \{color:#FF6600;\}");\
GM_addStyle("input.inputtext \{border:1px solid #000000; background:#ffffff; color:#FF6600; \}");\
GM_addStyle("input.inputpassword \{border:1px double #FF6600; background:#ffffff; color:#FF6600; \}");\
GM_addStyle("#footer \{color:#FF6600; \}");\
GM_addStyle("h4 \{border-bottom: none; \}");\
GM_addStyle("h4 \{color: #FF6600; \}");\
GM_addStyle("h4 .edit a:hover \{ color: #FF6600; \}");\
GM_addStyle("h5 \{ border-bottom: none; \}");\
GM_addStyle("#gnav a:hover \{ color: #FF6600; background-color: #000000; border:1px solid #ffffff; \}");\
GM_addStyle("#header \{border-bottom: none; \}");\
GM_addStyle("#content \{padding: 12px 0px; border-bottom: solid 1px #000000; border-left: solid 1px #000000; border-right: solid 1px #000000; \}");\
GM_addStyle("#nav li#myprofile a:hover \{ background: #000000; color: #FF6600; \}");\
GM_addStyle("#nav li#myfriends a:hover \{ background: #000000; color: #FF6600; \}");\
GM_addStyle("#nav li a:hover \{ background: #000000; color: #FF6600; \}");\
GM_addStyle("#tabs .activetab a \{ color: white; background: #FF6600; \}");\
GM_addStyle("#tabs .inactivetab a:hover \{ color:#FF6600; background: #ffffff; \}");\
GM_addStyle("#actions a:hover \{ background: #FF6600; color: white; \}");\
GM_addStyle("#snav  a:hover \{ background: #000000; color: #FF6600; \}");\
GM_addStyle(".pager a:hover \{ color: white; margin: 0px; padding: 3px 3px; background: #FF6600; \}");\
GM_addStyle(".pager b \{ color: #FF6600; \}");\
GM_addStyle("#bottompager b \{ border-bottom: none; border-top: none; \}");\
GM_addStyle("#bottompager.flip b \{ border-top: none; border-bottom: solid 2px #FF6600; \}");\
GM_addStyle(".status \{ border: dotted 2px #FF6600; background: #ffffff; \}");\
GM_addStyle("#footer \{ color: #FF6600; background: #ffffff;  border-bottom: dashed 1px #FF6600; \}");\
GM_addStyle("#fnav li a:hover \{ color: white; background: #FF6600; border:1px solid #FF6600;\}");\
GM_addStyle("#subheader \{ color: #FF6600; border: solid 1px #FF6600; background: #ffffff \}");\
GM_addStyle("#profileActions a:hover \{ background: #000000; color: #FF6600; \}");\
GM_addStyle("#groupslist .actions a:hover \{ color: white; background: #000000; \}");\
GM_addStyle("#photos .album img \{ border:1px solid #FF6600; \}");\
GM_addStyle("#dialog \{ margin: 0px auto; border: solid 5px #FF6600; \}");\
GM_addStyle("#dialog td.dialog \{ padding-top: 10px; border: solid 1px #FF6600; \}");\
GM_addStyle("#searchnav \{ border-bottom: solid 1px #FF6600; \}");\
GM_addStyle("#error  \{ border: dotted 2px #FF6600; background: #ffffff; \}");\
GM_addStyle("ul.bulletpoints \{ list-style: circle; color: #FF6600; \}");\
GM_addStyle(".wallpost .info .header \{ color: #ffffff; background: #000000; border-top: dashed 1px #FF6600; border-bottom: dashed 1px #FF6600; \}");\
GM_addStyle(".profilecourses \{ color: #FF6600; \}");\
GM_addStyle("#quail \{ color: #FF6600; \}");\
GM_addStyle(".friendtable .actions a:hover \{ color: white; background: #FF6600; \}")\
\
\
\
\
}