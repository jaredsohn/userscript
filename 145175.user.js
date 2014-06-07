// ==UserScript==
// @name           CSS Replace
// @namespace      http://www.socialvitamin.com/apps
// @description    Replaces any given CSS in any website Example: <link rel="stylesheet" type="text/css" href="css/global.css"> to <link rel="stylesheet" type="text/css" href="css/global2.css"> you need to edit the script to your preferences.
// @include        http://filelist.ro/*
// ==/UserScript==


html, body {
font-family:'Tahoma','Trebuchet MS','Verdana','Arial','Sans-Serif';
font-size:8pt;
text-align:left;
color:#444;
	background: #3F689D; 
	margin: 0;
    padding: 0;
	height: 100%;
}

img { border: 0; vertical-align: middle; }

.forumtable {
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 8pt;
    border: 1px solid #ccc;
    border-collapse: collapse;
    background: #fff;
}

#wrapper {
	height: 100%;
	min-height: 100%;
	height: auto !important;
	position: relative;
}

.mainheader {
    width: 100%;
    height: 250px;
	background: #3F689D; 
}

.mainheader a:hover {
	color: #E0E0E0;
	text-decoration:none;
}

.subheader {
    width: 980px;
    height: 150px;
	margin: 0 auto;
	position: relative;	
}

.logo {
    width: 350px;
    height: 150px;
	margin-top: 20px;
    background: url('http://filelist.ro/styles/images/logo.png') no-repeat;
	float: left;
}

.sign_in {
    width:264px;
    height:30px;
    margin:5px 0 0 10px;
    background:#1d3652;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.rlink { float:right; padding:5px 20px 0 0; }

.rlink a { color:#fff; }

.clearfix:after {
	content:".";
	display:block;
	height:0;
	clear:both;
	visibility:hidden;
	overflow:hidden;
	float:none;
}

.clearfix {
	display:block;
}

/* - StatusBar Block - */

.statusbar {
    width: 400px;
	margin-top: 50px;
    padding: 5px 5px 5px 5px;
    color:#E0E0E0;
	float:right;
    font-size:10px;
	background: #2a2a2a;
	border: 1px solid #D4D9DE;
	-webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
}

.status_avatar {
    width:50px;
    height:50px;
    margin:6px 12px 6px 6px;
}

/* - Navigation - */

#navigation {
	top:170px;
    width:972px;
	height: 44px;
	margin:0 5px;
    font-family:Helvetica,Arial,Verdana,sans-serif;
	position: absolute;
	/* CSS Nav */
	background: #2a2a2a;
	border: 1px solid #3d3d3d;
	-webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
	-moz-box-shadow: 0 0 10px 1px #111;
	-webkit-box-shadow: 0 0 10px 1px #111;
	box-shadow: 0 0 10px 1px #111;	
}

#nav {
	height: 44px;
	padding: 6px 20px;
    font-size:13px;
    font-weight:bold;
}

#nav ul {
    margin:0;
    padding:0;
    width:auto;
}

#navhome {
	margin-top: 1px;
	width: 30px;
	height: 30px;
	background: url('http://filelist.ro/styles/images/home.png') 0 0 no-repeat;
}

#nav ul li lihome { display:inline; }
#nav lihome { display:block; padding:2px 15px 2px 10px; } 
#nav ul li a { display:block; padding:8px 15px 12px 18px; background: url('http://filelist.ro/styles/images/navigation-bar.png') left bottom no-repeat; }
#nav ul li, 
#nav ul li a { color:#E0E0E0; text-decoration:none; }

#nav ul li.active, #nav ul li a:hover, #nav ul li.active a { text-decoration:none; color:#959083; text-shadow: 1px 1px 1px #111; }

/* - Main Column - */

#container {
	width: 1050px;
	_height: 100%; /* - IE Only - */
	margin: 0 auto;
	padding-top: 10px;
	padding-bottom: 215px;
}

#maincolumn {
    width: 980px;
	min-height: 400px;
    margin: 0 auto;
}

/* - Footer - */

#footer {
	background: #141414;
	padding-top: 35px;
	padding-bottom: 15px;
	width: 100%;
	height: 110px;
	bottom: 55px;
	position: absolute;
}

#footer a:hover {
	color: #E0E0E0;
	text-decoration:none;
}

#footerInner {
	width: 980px;
	margin:0 auto;
	padding-bottom: 10px;
	position: relative; 
	overflow: hidden;
	color: #797979;
}

#footerInner .boxFooter {
	float: left;
	width: 200px;
	padding: 0 15px;
	position: relative;
	margin-right: 30px;
}

#footerInner h2 {
	padding-bottom: 4px;
	margin-bottom: 14px;
	color: #ccc;
	font-size: 15px;
	border-bottom: 1px solid #292929;
	font-family: Arial;
}

#footer ul {
	margin-left: 10px;
	padding-top: 3px;
	padding-left: 15px;
	font-weight: bold;
	background: url('http://filelist.ro/styles/images/list.png') 0 0 no-repeat;
}

#copyright {
	border-top:1px solid #1E1E1E;
	background: #000;
	width: 100%;
	height: 55px;
	bottom: 0;
	position: absolute;
}

#copyright a:hover {
	color: #E0E0E0;
	text-decoration:none;
}

#copyrightInner {
	width:980px;
	margin:0 auto;
	font-size:11px;
	color:#515151;
	padding:20px 0;
	position:relative;
}

#copyrightInnerRight {
	position:absolute;
	right:5px;
	top:20px;
}

/* - Message Alert - */

.alert {
    width:20em;
    padding:10px;
    margin:0 auto 10px auto;
    background:#444;
    text-align:center;
    border:1px solid #cecece;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}

.alert span { color:#fff; font-weight:bold; }

/* - Content Block Big - */

#divider {
	margin-top: 10px;
	margin-left: 15px;
	margin-right: 15px;
	border-top: 1px solid #E2E2E2;
}

.cblock {
    width:980px;
    _height:100%;
    margin:10px 0 10px 0;
	display: block;
}

.cblock-header {
    width:965px; 
    height:30px;
	float:left;
    background:transparent url('http://filelist.ro/styles/images/content-head.png') 0 0 repeat-x;
	position:relative;
}

.cblock-header h4 {
	padding-left: 4px;
	line-height: 30px;
	font-family: Trebuchet MS; 
	font-weight: bold;
	font-size: 11pt;
	color: #444;
	float: left;
	text-shadow: 1px 1px 0 #fff;
}

.cblock-headerleft {
	width:6px;
	height:30px;
	display: block;
	float:left;
	background:transparent url('http://filelist.ro/styles/images/content-headleft.png') no-repeat;
}

.cblock-headerright {
	width:6px;
	height:30px;
	display: block;
	float:left;
	background:transparent url('http://filelist.ro/styles/images/content-headright.png') no-repeat;
}

.cblock-content {
    width:978px;
    _height:100%;
	padding: 20px 0 10px 0;
	background: #A9BBC9;
	border: 1px solid #D4D9DE;
	position: relative;
}

.cblock-innercontent {
	margin: 0 auto;
	width: 960px;
}

.cblock-top {
	width: 977px;
	height: 6px;
	display: block;
	background: #3F689D;
}

.cblock-bottom {
	width: 977px;
	height: 6px;
	display: block;
	background: #3F689D;
	margin-bottom: 20px;
}

/* - Normal Content Block - */

.nblock {
    width:685px;
    _height:100%;
    margin:10px 0 10px 0;
	display: block;
}

.nblock-header {
    width:671px; 
    height:30px;
	float:left;
    background:transparent url('http://filelist.ro/styles/images/content-head.png') 0 0 repeat-x;
	position:relative;
}

.nblock-header h4 {
	padding-left: 4px;
	line-height: 30px;
	font-family: Trebuchet MS; 
	font-weight: bold;
	font-size: 11pt;
	color: #444;
	float: left;
	text-shadow: 1px 1px 0 #fff;
}

.nblock-headerleft {
	width:6px;
	height:30px;
	display: block;
	float:left;
	background:transparent url('http://filelist.ro/styles/images/content-headleft.png') no-repeat;
}

.nblock-headerright {
	width:6px;
	height:30px;
	display: block;
	float:left;
	background:transparent url('http://filelist.ro/styles/images/content-headright.png') no-repeat;
}

.nblock-content {
    width:684px;
    height:100%;
	padding: 20px 0 10px 0;
	background:transparent url('http://filelist.ro/styles/images/content-normal-bg.png') 0 0 repeat-y;
	position: relative;
}

.nblock-innercontent {
	margin: 0 auto;
	width: 660px;
}

.nblock-bottom {
	width: 683px;
	height: 6px;
	display: block;
	background:transparent url('http://filelist.ro/styles/images/content-normal-bottom.png') no-repeat;
	margin-bottom: 20px;
}

/* - Small Content Block - */

.sblock {
    width:280px;
    _height:100%;
    margin:10px 0 10px 0;
	display: block;
}

.sblock-header {
    width:267px; 
    height:30px;
	float:left;
    background:transparent url('http://filelist.ro/styles/images/content-head.png') 0 0 repeat-x;
	position:relative;
}

.sblock-header h4 {
	padding-left: 4px;
	line-height: 30px;
	font-family: Trebuchet MS; 
	font-weight: bold;
	font-size: 11pt;
	color: #444;
	float: left;
	text-shadow: 1px 1px 0 #fff;
}

.sblock-headerleft {
	width:6px;
	height:30px;
	display: block;
	float:left;
	background:transparent url('http://filelist.ro/styles/images/content-headleft.png') no-repeat;
}

.sblock-headerright {
	width:6px;
	height:30px;
	display: block;
	float:left;
	background:transparent url('http://filelist.ro/styles/images/content-headright.png') no-repeat;
}

.sblock-content {
    width:280px;
    height:100%;
	padding: 20px 0 10px 0;
	background:transparent url('http://filelist.ro/styles/images/content-small-bg.png') 0 0 repeat-y;
	position: relative;
}

.sblock-innercontent {
	margin: 0 auto;
	width: 270px;
}

.sblock-bottom {
	width: 279px;
	height: 6px;
	display: block;
	background:transparent url('http://filelist.ro/styles/images/content-small-bottom.png') no-repeat;
	margin-bottom: 20px;
}

/* - Message Boxes - */

.info {
    width: 50%;
    border: 1px solid #1f1f1f;
	color: #fff;
    margin: 10px auto;
    padding: 15px 10px 15px 50px;
	font-weight: bold;
    background: #444 url('http://filelist.ro/styles/images/info.png') no-repeat;
    background-position: 15px 50%; /* x-pos y-pos */
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.error {
    width: 50%;
    border: 1px solid #1f1f1f;
	color: #000;
    margin: 10px auto;
    padding: 15px 10px 15px 50px;
	font-weight: bold;
    background:#FFBABA url('http://filelist.ro/styles/images/error.png') no-repeat;
    background-position: 15px 50%; /* x-pos y-pos */
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.infosmall {
    width: 200px;
    border: 1px solid #1f1f1f;
	color: #fff;
    margin: 10px auto;
    padding: 15px 10px 15px 50px;
	font-weight: bold;
	font-size: 12px;
    background: #444 url('http://filelist.ro/styles/images/info.png') no-repeat;
    background-position: 15px 50%; /* x-pos y-pos */
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.errorsmall {
    width: 200px;
    border: 1px solid #1f1f1f;
	color: #000;
    margin: 10px auto;
    padding: 15px 10px 15px 50px;
	font-weight: bold;
	font-size: 12px;	
    background:#FFBABA url('http://filelist.ro/styles/images/error.png') no-repeat;
    background-position: 15px 50%; /* x-pos y-pos */
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

/* - The Cloud? - */

.thecloud {
    width:90%;
    margin:20px auto;
    border:1px solid #000;
    background:pink;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.tag_cloud { padding: 3px; text-decoration: none; font-family: verdana; }
.tag_cloud:link  { color: #0099FF; text-decoration:none; }
.tag_cloud:visited { color: #00CCFF; }
.tag_cloud:hover { color: #0000FF; background: #00CCFF; }
.tag_cloud:active { color: #0000FF; background: #FFF; }

/* - Special Staff page HoF - */

.staffbox { float:left; }

.staffbox {
	width: 100px;
    border: 1px solid #cacaca;
    padding: 5px;
    margin: 0px 4px 10px 6px;
	background: #ebebeb;
	text-align: center;
}

/* - Pagination links start - */

.pagelink, .pagelinklast, .pagecurrent, .minipagecurrent, .minipagelink, .minipagelinklast {
	background: #F0F5FA;
	border: 1px solid #072A66;
	padding: 1px 3px 1px 3px;
}

.pagelinklast, .minipagelinklast { background: #DFE6EF; }
.pagecurrent { background: #FFC9A5; }
.minipagecurrent { background: #F0F5FA; font-size: 10px; }

.minipagelink, .minipagelinklast {
    border: 1px solid #C2CFDF;
	font-size: 10px;
	margin: 0 1px 0 0;
}

.pagelink a:active,
.pagelink a:visited,
.pagelink a:link,
.pagelinklast a:active,
.pagelinklast a:visited,
.pagelinklast a:link,
.pagecurrent a:active,
.pagecurrent a:visited,
.pagecurrent a:link,
.minipagelink a:active,
.minipagelink a:visited,
.minipagelink a:link,
.minipagelinklast a:active,
.minipagelinklast a:visited,
.minipagelinklast a:link {
    text-decoration: none;
}

.pager { margin: 12px 5px 10px 0px; }
.pager a, .pager a:link { margin: 0 2px; padding: 4px 6px; background: #ebebeb; border: 1px solid #E2E2E2; text-decoration: none; font-weight: normal; font-size: 8pt; color: #666; -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; }
.pager a:hover { background: #555555; border: 1px solid #aaaaaa; color: #FFFFFF; font-weight: normal; text-decoration: none; }

.pager span.current { margin: 0 2px; padding: 4px 6px; background: #555555; border: 1px solid #aaaaaa; font-weight: bold; font-size: 8pt; color: #FFFFFF; -moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; }
.pager span.extend { margin: 0 2px; padding: 4px 6px; font-size: 8pt; color: #69655f; }

/* - Sexy Ass Div Table - */

.base-layer {
    color:#000;
    padding:0;
    text-align:center;
    width:auto;
}

.table-row {
    color:#000;
    margin:0 auto 0 auto;
    padding:0;
    text-align:center;
    width: 100%;
}

.left-layer {
    border:none;
    float:left;
    margin:0;
    padding:5px;
    width:180px;
}

.space-line {
    clear:both;
    margin:0;
    padding:0;
    width: auto;
    border-bottom:1px solid #d5dde5;
}

p.text {
    border:1px solid #d5dde5;
    margin:0;
    padding:3px;
    font-style:normal;
    font-size:1em;
    text-align:center;
    text-indent:0;
    width: auto;
}

hr.separator {
    border: 0;
    height: 1px;
	width: 600px;
    margin: 11px auto 0px auto;
    background-image: -webkit-linear-gradient(left, rgba(0,0,0,0), rgba(0,0,0,0.75), rgba(0,0,0,0)); 
    background-image: -moz-linear-gradient(left, rgba(0,0,0,0), rgba(0,0,0,0.75), rgba(0,0,0,0)); 
    background-image: -ms-linear-gradient(left, rgba(0,0,0,0), rgba(0,0,0,0.75), rgba(0,0,0,0)); 
    background-image: -o-linear-gradient(left, rgba(0,0,0,0), rgba(0,0,0,0.75), rgba(0,0,0,0));
}

/* Mass PM System */
.sent {
	border: 1px solid #49c24f;
	background:#bcffbf;
}
.notsent {
	border: 1px solid #c24949;
	background:#ffbcbc;
}