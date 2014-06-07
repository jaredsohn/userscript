// ==UserScript==
// @name              Mail Page
// @namespace         jono
// @description      Mail Page
// @include           http://messaging.myspace.com/*      
// ==/UserScript==

s = "body{background:url(http://img441.imageshack.us/img441/5168/untitledup2.jpg) #FFFFFF repeat-y 50%; font-size:10px;}\n";
s+= "#messagingNav {position:fixed; background-color:#FFFFFF;}\n";
s+= "#messagingNav li {background-color:#FFFFFF;}\n";
s+= "#messagingNav li  a {color:#000000; display:block; line-height:15px;font-weight:normal; }\n";
s+= "#messagingNav li  a:hover {color:#CDFF00; background-color:#333333; padding-left:15px; text-decoration:none;font-weight:normal;}\n";

s+= "#header_search, #headerlinks, #advert, #brightideacontainer, #footer, #header {display:none;}\n";
s+= "#topnav{background:url(http://img441.imageshack.us/img441/6048/76879805nm8.jpg)#211B18!important; color:#BDBAAF!important;font-size:10px!important; padding-top:65px!important; border-bottom:0px solid #333!important}\n";
s+= "table.cols a img {background-color:#FFFFFF; border:0px solid #333333;}\n";
s+= "a{color:#000000!important;font-size:10px!important;text-decoration:none!important;font-weight:normal;}\n";
s+= "a:hover{background-color:#333333!important;color:#CDFF00!important;font-size:10px!important;font-weight:normal;}\n";

s+= "#messageArea {border:0px solid #FFFFFF;}\n";
s+= "td.tocol, td.messageListCell {background-color:#FFFFFF;}\n";
s+= "table#messages td {background-color:#dadada; font-size:10px;}\n";
s+= ".pagingContainer div a {color:#000000; font-size:10px; text-decoration:none;}\n";
s+= ".pagingContainer div a:hover {color:#000000; font-size:10px; text-decoration:none;}\n";
s+= ".pagingLeft, .pagingCenter, .pagingRight {font-size:10px; color:#CDFF00;background-color:#333333;}\n";
s+= "table#messages td a img {background-color:#FFFFFF; border:1px solid #FFFFFF;}\n";
s+= "a img {background-color:#dadada; border:1px solid #a3a3a3;}\n";
s+= "table#messages th {background-color:#FFFFFF;color:#000000;}\n";

s+= "a.subjectHyperlink {color:#000000; font-size:10px; text-decoration:none;font-weight:normal;}\n";
s+= "a.subjectHyperlink:hover { color:#CDFF00;background-color:#333333; text-decoration:none; font-weight:normal;}\n";
s+= "a:link {color:#000000; font-size:9px;font-weight:normal; }\n";
s+= "a:hover {color:#0099FF; text-decoration:none;font-weight:normal; }\n";

s+= "table#pendingRequests th {background-color:#FFFFFF;}\n";
s+= "table#pendingRequests td {background-color:#FFFFFF;}\n";
s+= "table#friendRequests th {background-color:#FFFFFF;}\n";
s+= "table#friendRequests td {background-color:#FFFFFF;}\n";
s+= "table#pendingRequests input, table#pendingRequests button, table#friendRequests input, table#friendRequests button {border:1px solid #FFFFFF; background-color:#FFFFFF; color:#FFFFFF;}\n";
s+= "table#pendingRequests a img, table#pendingRequests a img {border:1px solid #ffffff;}\n";
s+= "table.messageTable th {background-color:#FFFFFF; border-color:#FFFFFF;}\n";
s+= "table.messageTable td {background-color:#FFFFFF; border-color:#FFFFFF;}\n";

s+= "#read-buttons input {border:1px solid #000000; background-color:#FFFFFF; color:#000000;}\n";
s+= "textarea {border:1px solid #000000; background-color:#FFFFFF; color:#000000; font-size:9px;}\n";
s+= "table.messageTable input {border:1px solid #000000; background-color:#FFFFFF; color:#000000; font-size:9px;}\n";
s+= "table.messageTable a img{border:1px solid #a3a3a3;}\n";
s+= "\n";
s+= "\n";
s+= "\n";

GM_addStyle(s);