// ==UserScript==
// @name              Loudsur13's Mail Page
// @namespace         myspace.com/Loudsur13
// @description       Customized Mail Page To Match Profile
// @include           http://messaging.myspace.com/*      
// ==/UserScript==

s = "body{background:url(http://img120.imageshack.us/img120/5689/graybgci8.png) #FFFFFF repeat-y 50%; font-size:9px;}\n";
s+= "#messagingNav {position:fixed; background-color:#a3a3a3;}\n";
s+= "#messagingNav li {background-color:#a3a3a3;}\n";
s+= "#messagingNav li  a {color:#FFFFFF; display:block; line-height:15px; }\n";
s+= "#messagingNav li  a:hover {color:#A3A3A3; background-color:#dadada; padding-left:15px; text-decoration:none;}\n";

s+= "#header_search, #headerlinks, #advert, #brightideacontainer, #footer, #header {display:none;}\n";
s+= "#topnav{background:#A3A3A3!important; color:#FFFFFF!important; padding-top:55px!important;}\n";
s+= "table.cols a img {background-color:#dadada; border:1px solid #a3a3a3;}\n";

s+= "#messageArea {border:1px solid #a3a3a3;}\n";
s+= "td.tocol, td.messageListCell {background-color:#dadada;}\n";
s+= "table#messages td {background-color:#dadada; font-size:9px;}\n";
s+= ".pagingContainer div a {color:#a3a3a3; font-size:10px; text-decoration:none;}\n";
s+= ".pagingContainer div a:hover {color:#000000; font-size:10px; text-decoration:none;}\n";
s+= ".pagingLeft, .pagingCenter, .pagingRight {font-size:10px; color:#000000;}\n";
s+= "table#messages td a img {background-color:#dadada; border:1px solid #a3a3a3;}\n";
s+= "a img {background-color:#dadada; border:1px solid #a3a3a3;}\n";
s+= "table#messages th {background-color:#a3a3a3;}\n";

s+= "a.subjectHyperlink {color:#a3a3a3; font-size:10px; text-decoration:none;}\n";
s+= "a.subjectHyperlink:hover {color:#000000; text-decoration:none; }\n";
s+= "a:link {color:#a3a3a3; font-size:9px; }\n";
s+= "a:hover {color:#000000; text-decoration:none; }\n";

s+= "table#pendingRequests th {background-color:#a3a3a3;}\n";
s+= "table#pendingRequests td {background-color:#dadada;}\n";
s+= "table#friendRequests th {background-color:#a3a3a3;}\n";
s+= "table#friendRequests td {background-color:#dadada;}\n";
s+= "table#pendingRequests input, table#pendingRequests button, table#friendRequests input, table#friendRequests button {border:1px solid #FFFFFF; background-color:#a3a3a3; color:#FFFFFF;}\n";
s+= "table#pendingRequests a img, table#pendingRequests a img {border:1px solid #ffffff;}\n";
s+= "table.messageTable th {background-color:#a3a3a3; border-color:#FFFFFF;}\n";
s+= "table.messageTable td {background-color:#dadada; border-color:#FFFFFF;}\n";

s+= "#read-buttons input {border:1px solid #a3a3a3; background-color:#dadada; color:#a3a3a3;}\n";
s+= "textarea {border:1px solid #a3a3a3; background-color:#EEEEEE; color:#000000; font-size:10px;}\n";
s+= "table.messageTable input {border:1px solid #a3a3a3; background-color:#EEEEEE; color:#000000; font-size:10px;}\n";
s+= "table.messageTable a img{border:1px solid #a3a3a3;}\n";
s+= "\n";
s+= "\n";
s+= "\n";

GM_addStyle(s);
