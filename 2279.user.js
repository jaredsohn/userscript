/*
 * Title: Google/ig
 * Description: Change Google/ig style, make font sizes smaller for more toolbars
 * Author: Beysim, www.beysim.net
 * Updated: 04/12/2005
 * 
 */

// ==UserScript==
// @name Google/ig
// @namespace http://www.beysim.net
// @description Change Google/ig style, make font sizes smaller for more toolbars
// @include http://google.com/ig*
// @include http://www.google.com/ig*
// ==/UserScript==

(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = 'a{font-family:verdana,sans-serif;} a:link{color:#0000CC;text-decoration:none;} a:visited{color:#000000;text-decoration:none;} a:active{color:#FF0000;} a.ab{color:#0000CC;} body{font-family:verdana,sans-serif;} form{display:inline;} h2.modtitle{font-size:100%;margin:0em;padding-bottom:0px;padding-top:0px;width:100%;} p{font-family:verdana,sans-serif;} td{font-family:verdana,sans-serif;} .addbtn{font-size:75%;margin:0px 2px 0px 0px;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;} .addbtn{float:right;} .apromo{background-color:#E5ECF9;border-bottom:#3366CC 1px solid;border-left:#3366CC 1px solid;border-right:#3366CC 1px solid;border-top:#3366CC 1px solid;color:#0000CC;cursor:pointer;font-size:10px;padding-bottom:2px;padding-left:5px;padding-right:5px;padding-top:2px;text-decoration:nonne;white-space:nowrap;} .apromo{float:left;} .c{clear:both;} .cpromo{background-color:#E5ECF9;border-bottom:#3366CC 1px solid;border-left:#3366CC 1px solid;border-right:#3366CC 1px solid;border-top:#3366CC 1px solid;color:#0000CC;cursor:pointer;font-size:10px;padding-bottom:2px;padding-left:5px;padding-right:5px;padding-top:2px;text-decoration:nonne;white-space:nowrap;} .cpromo{float:right;margin:-1px -2px 0px 0px;} .csl{color:#7777CC;} .dm{height:1px;style:position:relative;width:1px;} .el{font-size:11px;text-decoration:none;} .fnores{font-size:82%;} .fres{;width:expression(_gel("ffresults").offsetWidth+"px");overflow:hidden;} .fres{font-size:82%;padding-bottom:5px;padding-left:0px;padding-right:0px;padding-top:5px;} .fresurl{color:#008800;overflow:hidden;} .gobtn{font-size:75%;margin:0px 2px 0px 0px;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;} .h{font-family:verdana,sans-serif;} .mc{font-size:10px;padding-top:2px;width:100%;} .mdel{border-bottom:0px;border-left:0px;border-right:0px;border-top:0px;height:10px;margin-bottom:3px;margin-top:2px;vertical-align:top;width:15px;} .medit{background-color:#E5ECF9;padding-right:2px;text-align:right;white-space:nowrap;width:10%;} .medit{color:#7777CC;} .medit a:link{color:#7777CC;} .medit a:visited{color:#7777CC;} .medit a:active{color:#7777CC;} .mhdr{border-bottom:#3366CC 1px solid;border-top:0px;margin:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;width:100%;} .mitem{clear:both;} .mlist_closed{padding-bottom:5px;} .mlist_closed .mlisthead{background:url(/ig/images/arrow-r.gif) no-repeat left top;} .mlist_closed .psc{display:none;} .mlist_open{padding-bottom:5px;} .mlist_open .mlisthead{background:url(/ig/images/arrow-d.gif) no-repeat left top;} .mlist_open .psc{} .mlisthead{font-size:0.8em;padding-left:14px;text-decoration:none;white-space:nowrap;} .mlisthead{color:#000000;} .mname{float:left;font-size:0.8em;padding-right:4px;padding-top:3px;white-space:nowrap;} .mod{} .modbox{padding-bottom:8px;} .modbox .csl{display:none;} .modbox .el{} .modbox .es{display:none;} .modbox .es{} .modbox_e{padding-bottom:8px;} .modbox_e .csl{} .modbox_e .el{display:none;} .mpromo{background-color:#E5ECF9;border-bottom:#3366CC 1px solid;border-left:#3366CC 1px solid;border-right:#3366CC 1px solid;border-top:#3366CC 1px solid;margin-bottom:20px;padding-bottom:5px;padding-left:5px;padding-right:5px;padding-top:5px;text-align:center;} .mtable td{vertical-align:top;} .mttl{background-color:#E5ECF9;font-weight:bold;font-weight:bold;padding-left:4px;padding-right:2px;text-decoration:none;width:100%;} .mttli{font-size:11px;font-weight:bold;text-decoration:none;} .panelc{} .panelo{} .psc{padding-left:15px;padding-top:5px;} .q{color:#0000CC;} .tlc{cursor:hand;font-size:10px;table-layout:fixed;} .tlc col{font-size:10px;} .tlc td{empty-cells:show;font-size:10px;} .tld{color:#8B0000;font-size:10px;text-align:right;white-space:nowrap;width:11ex;} .tlq{font-size:10px;overflow:hidden;white-space:nowrap;} .tls{font-size:10px;overflow:hidden;white-space:nowrap;} .tls a{color:#000000;text-decoration:none;font-size:10px;} .unmod{} #c_1{vertical-align:top;width:32%;} #c_2{vertical-align:top;width:32%;} #c_3{vertical-align:top;width:32%;}';
	
	addGlobalStyle(cssStyle);
})()