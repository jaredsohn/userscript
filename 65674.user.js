// ==UserScript==
// @name           StackOverflow 2.0
// @namespace      http://www.diovo.com/2009/11/fine-tuning-the-stackoverflow-theme/
// @description    Cleans up Stackoverflow web UI
// @include        http://stackoverflow.com/*
// ==/UserScript==

GM_addStyle(<><![CDATA[
	.narrow .votes {background-color:transparent;}
	.answered {background-color:transparent; color:#75AA5C;}
	.answered-accepted {background-color:transparent; color:#666;}
	.unanswered {background-color:transparent; color:#9A4444;}  
	.mini-counts {font-size:100%; height:auto;}
	.nav li{-moz-border-radius:4px; background-color:#999;}
	.post-tag{-moz-border-radius:3px; border: solid 1px #ccc; background-color:transparent;}
	.post-tag:hover {border: solid 1px #ccc; background-color:#f9f9f9;color:inherit;}
	#tabs a.youarehere {-moz-border-radius-topleft:4px; -moz-border-radius-topright:4px;}
	.relativetime {font-weight:none; font-size:80%;}
	.started .reputation-score {display:none;}
	.question-hyperlink {font-family:Helvetica;}
	#interestingTag, #ignoredTag {-moz-border-radius:4px;}
	#interestingAdd, #ignoredAdd {-moz-border-radius:4px;}
	.module h4{margin-top:15px;}
	#sidebar {
	border-left:1px solid #eee;margin-left:10px;padding-left:10px;}
	.badge{background-color:#777;border-color:#777;}
	.nav {font-size:120%;margin-left:50px;}
	.tagged-interesting {background-color:#FFFFD0;}
	.question-summary {border-bottom:1px dotted #ddd;}
	.container {width:980px;}
	.status strong {color:inherit;}
  !important
]]></>.toString());
