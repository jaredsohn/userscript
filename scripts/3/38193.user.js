{\rtf1\ansi\ansicpg1252\cocoartf949\cocoasubrtf350
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;\red24\green127\blue10;\red176\green104\blue26;\red0\green19\blue254;
\red250\green19\blue5;\red198\green22\blue203;}
\margl1440\margr1440\vieww18200\viewh14900\viewkind0
\deftab720
\pard\pardeftab720\sl340\ql\qnatural

\f0\fs28 \cf2 // ==UserScript==\cf0 \
\cf2 // @name           Create Special Forces invites.\cf0 \
\cf2 // @namespace      Special Forces friends.\cf0 \
\cf2 // @description    Automatically invites people to your Squad that you find on the fight page. Frisno altered the  the original code  from Andy Calderbanks  "Create dragon wars invites" http://userscripts.org/scripts/show/31912\cf0 \
\cf2 // @include        http://apps.facebook.com/specialforces/fight.php\cf0 \
\cf2 // @include        http://apps.facebook.com/specialforces/recruit.php\cf0 \
\cf2 // @include        http://apps.new.facebook.com/specialforces/fight.php\cf0 \
\cf2 // @include        http://apps.new.facebook.com/specialforces/recruit.php\cf0 \
\cf2 // ==/UserScript==\cf0 \
\
document.getElementByXPath = \cf3 function\cf0 (sValue) \{ \cf3 var\cf0  a = \cf3 this\cf0 .\cf4 evaluate\cf0 (sValue, \cf3 this\cf0 , \cf3 null\cf0 , XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, \cf3 null\cf0 ); \cf3 if\cf0  (a.snapshotLength > \cf5 0\cf0 ) \{ \cf3 return\cf0  a.\cf4 snapshotItem\cf0 (\cf5 0\cf0 ); \} \};\
document.getElementsByXPath = \cf3 function\cf0 (sValue)\{ \cf3 var\cf0  aResult = \cf3 new\cf0  \cf4 Array\cf0 ();\cf3 var\cf0  a = \cf3 this\cf0 .\cf4 evaluate\cf0 (sValue, ((arguments.lenth > \cf5 1\cf0 ) ? arguments[\cf5 1\cf0 ] : \cf3 this\cf0 ), \cf3 null\cf0 , XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, \cf3 null\cf0 );\cf3 for\cf0  ( \cf3 var\cf0  i = \cf5 0\cf0  ; i < a.snapshotLength ; i++ )\{aResult.\cf4 push\cf0 (a.\cf4 snapshotItem\cf0 (i));\}\cf3 return\cf0  aResult;\};\
\
\cf2 //Check if we're using the new or old layout\cf0 \
\cf3 var\cf0  newlayout = \cf3 false\cf0 \
\cf3 if\cf0  (document.location.href.\cf4 indexOf\cf0 (\cf5 'apps.new.facebook.com'\cf0 ) != -\cf5 1\cf0 ) \
	newlayout = \cf3 true\cf0 ;\
\
\cf2 //Grab the last known request form ID\cf0 \
\cf3 var\cf0  reqID = \cf4 GM_getValue\cf0 (\cf5 'reqformID'\cf0 ,\cf3 false\cf0 );\
\
\cf2 //Get unix epoch time\cf0 \
\cf3 var\cf0  now = Math.\cf4 floor\cf0 (\cf3 new\cf0  \cf4 Date\cf0 ().\cf4 getTime\cf0 () / \cf5 1000\cf0 );\
\
\cf2 //Set how long its been since we've grabbed an ID last time.\cf0 \
\cf3 var\cf0  since = now - \cf4 GM_getValue\cf0 (\cf5 'getID'\cf0 ,\cf5 0\cf0 );\
\
\cf2 //If we don't have a reqID or its older than a day, grab a fresh one.\cf0 \
\cf3 if\cf0  ((!reqID || since > \cf5 86400\cf0 ) && document.location.href.\cf4 indexOf\cf0 (\cf5 'fight'\cf0 ) != -\cf5 1\cf0 ) \{\
	document.location.href = \cf5 'http://apps.'\cf0 +((newlayout)?\cf5 'new.'\cf0 :\cf5 ''\cf0 )+\cf5 'facebook.com/specialforces/recruit.php'\cf0 ;\
	\cf3 return\cf0 ;\
\}\
\
\cf3 if\cf0  (document.location.href.\cf4 indexOf\cf0 (\cf5 'fight'\cf0 ) == -\cf5 1\cf0 ) \{\
	Array.\cf4 forEach\cf0 (document.\cf4 getElementsByTagName\cf0 (\cf5 "input"\cf0 ),\
		\cf3 function\cf0 (obj)\{\
			\cf3 if\cf0  (obj.id.\cf4 indexOf\cf0 (\cf5 'mfs_typeahead_req_form_'\cf0 ) != -\cf5 1\cf0 ) \{\
				\cf4 GM_setValue\cf0 (\cf5 'reqformID'\cf0 ,obj.id.\cf4 replace\cf0 (\cf5 'mfs_typeahead_req_form_'\cf0 ,\cf5 ''\cf0 ));\
				\cf4 GM_setValue\cf0 (\cf5 'getID'\cf0 ,now);\
			\}\
		\}\
	);\
\}\
\cf3 else\cf0  \{\
	\cf3 var\cf0  vars = \cf3 false\cf0 ;\
	\cf3 var\cf0  members = document.\cf4 getElementsByXPath\cf0 (\cf5 "//a[contains(@href,'/specialforces/stats.php?user=')]"\cf0 );\
	\cf2 //First link is always yourself from the 'my stats' link at the top\cf0 \
	members.\cf4 shift\cf0 ();\
	Array.\cf4 forEach\cf0 (members,\
		\cf3 function\cf0 (member)\{\
			\cf3 var\cf0  mobid = member.href.\cf4 match\cf0 (\cf6 /\\d+$/\cf0 );\
			vars = vars + \cf5 '&ids%5B%5D='\cf0  + mobid;\
		\}\
	);\
	\cf3 if\cf0  (vars) \{\
		vars = reqID + \cf5 '=Start+Typing+a+Friend%27s+Name'\cf0  + vars;\
		\cf4 GM_xmlhttpRequest\cf0 (\{\
			method: \cf5 "POST"\cf0 ,\
			url: \cf5 'http://apps.'\cf0 +((newlayout)?\cf5 'new.'\cf0 :\cf5 ''\cf0 )+\cf5 'facebook.com/specialforces/recruit.php?action=create'\cf0 ,\
			headers:\{\cf5 'Content-type'\cf0 :\cf5 'application/x-www-form-urlencoded'\cf0 \},\
			data:vars,\
			onload: \cf3 function\cf0 (xhr) \{ \}\
	  \});\
	\}\
\}}