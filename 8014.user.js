// ==UserScript==
// @name          Loudsur13's Edit Profile Page
// @namespace     http://myspace.com/loudsur13
// @description	  Customized Edit Page To Match Profile
// @include       http://profileedit.myspace.com/*
// ==/UserScript==

s = '#topnav{background:#A3A3A3!important; color:#FFFFFF!important; padding-top:55px!important; font-size:13px; font-family:arial;}\n';
s+= 'a:hover {color:black; text-decoration:none;}\n';
s+= '#header, #footer {display:none;}\n';
s+= '#details_interests div.alignL {display:none;}\n';
s+= '.row {display:inline;}\n';
s+= '#ctl00_ctl00_Main_ProfileEditContent_editInterests_EditInterests div {visibility:hidden;}\n';
s+= '#ctl00_ctl00_Main_ProfileEditContent_editInterests_EditInterests div * {visibility:visible;}\n';
s+= 'input {border:1px #a3a3a3 solid; padding:2px; position:relative; left:-120px; background-color:#FFFFFF; color:#a3a3a3; font-size:13px; font-family:arial;}\n';
s+= 'body {background:url(http://img482.imageshack.us/img482/5498/bgyayiewoocopynm6.png) center repeat-y #FFFFFF}\n';
s+= 'div, table, tr, td {background-color:transparent !important;}\n';
s+= '.separator {display:none;}\n';
s+= 'label {color:#a3a3a3; display:block; font-size:13px; font-family:arial; position:relative; top:-30px; left:-120px;}\n';
s+= '.txtNavBlue img {display:none;}\n';
s+= 'li {visibility:hidden;}\n';
s+= 'li a {color:white !important; visibility:visible;}\n';
s+= 'a.weightN {font-size:13px; font-family:arial; color:#a3a3a3; text-align:center; display:block; width:150px;}\n';
s+= 'a.weightN:hover {font-size:13px; font-family:arial; color:#000000; text-align:center; letter-spacing:1px; background-color:#a3a3a3;}\n';

s+= 'textarea {margin-left:-200px; border:1px #a3a3a3 solid; padding:3px; width:750px !important; height:600px; display:block; position:relative; left:200px; margin-bottom:50px; font-size:13px; font-family:arial;}\n';
s+= 'ul {text-align:center !important; display:block; width:800px;}\n';
s+= 'li a {color:#a3a3a3 !important; visibility:visible; font-family:arial; font-size:13px; display:block; margin-left:5px; margin-right:5px; letter-spacing:1px; background-color:#FFFFFF; border:1px solid #a3a3a3; padding:4px;}\n';
s+= 'li a {visibility:visible;}\n';
s+= 'li a:hover {background-color:#EEEEEE; position:relative; top:-3px; text-decoration:none; color:#FFFFFF;}\n';
s+= '.saveButtons {display:none;}\n';
s+= '#ctl00_ctl00_Main_ProfileEditContent_editInterests_SaveTop,\n';
s+= '#ctl00_ctl00_Main_ProfileEditContent_editInterests_PreviewTop {position:relative; top:-145px; left:-150px;}\n';
s+= '#ctl00_ctl00_Main_ProfileEditContent_editInterests_HeadlineText {position:relative; top:-35px;}\n';
s+= 'h3 {font-size:13; font-family:arial; color:#a3a3a3; display:block; text-align:center; letter-spacing:1px;}\n';
s+= 'a.weightN {font-size:13; font-family:arial; color:#a3a3a3; text-align:center;}\n';
s+= 'a.weightN:hover {font-size:13; font-family:arial; color:#000000; text-align:center; letter-spacing:1px;}\n';
s+= '.alignR br {display:none;}\n';

if(location.href.match(/profileedit\.myspace\.com.*ProfileEdit*/)) 
{
s+= '.txtRed {font-size:13px; font-family:arial; background-color:FFFFFF; border:0px #a3a3a3 solid; color:#a3a3a3; display:block; margin-top:-42px;} \n';

}

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">Signout');
document.body.innerHTML = html;




GM_addStyle(s);


