// ==UserScript==
// @name          UserScripts.org Nature Elements
// @namespace     http://userscripts.org/users/Hamza7
// @description   Adds an alternate themes to UserScripts.org
// @include       http://userscripts.org/*
// @require       http://code.jquery.com/jquery.min.js
// @resource      bgImg http://www.mediafire.com/imgbnc.php/432b35f2cc3340ea03d25128ada294476c92189353679dfb7e9cc9dfde6498f06g.jpg
// @resource      bgImgAlt http://www.mediafire.com/imgbnc.php/b3d6e515ce6662d2a3f93bc3ee0d0b6eb4a04048511ff4be66f2fba9efdf4b506g.jpg
// @icon          http://www.bazaardesigns.com/wp-content/uploads/basic-nature-elements1.jpg
// @version       1.0
// @author        Hamza Abbad
// @license       GNU General Public License
// ==/UserScript==
var USNE={};
USNE.style=document.createElement("style");USNE.style.type="text/css";$("head").append(USNE.style);
USNE.theme=GM_getValue("theme","Default");
function applyStyle(theme){
switch(theme){  //-------------------------------------------Water theme-----------------------------------------------------
                case "Water":
                USNE.style.innerHTML="#top{background-color:#81DDDE /*Original:#FF8800*/; }\
							         #header{background-color:#A8ACF8 /*Original:#000000*/; border-top:1px solid #0200DE/*Original:#555555*/;}\
									 #header h1{background:url("+GM_getResourceURL('bgImg')+") no-repeat scroll 0 0 transparent;}\
								     #header #mainmenu li{background:-moz-linear-gradient(top,white,#094CB7) repeat-x #094CB7 /*Original:#000000*/; border-color:#0BAAF4 /*Original:#333333*/;}\
								     #header #mainmenu li.active{background-color:#67ACFF /*Original:#EEEEEE*/;}\
									 #header #mainmenu li.active a{color:#306CFF /*Original:#333333*/;}\
									 #section{background-color:#67ACFF /*Original:#EEEEEE*/; border-bottom-color:#1D12FF /*Original:#CCCCCC*/;}\
									 #script-nav li{background-color:#81DDDE /*Original:#EEEEEE*/;border-top:1px solid #1D12FF;border-left:1px solid #1D12FF;border-right:1px solid #1D12FF;}\
									 td{border-color:#006BFF /*Original:#DDDDDD*/;}\
									 tr.spacer td{background-color:white;}\
									 .post .body p.topic{background-color:#81DDDE;}\
									 th{background-color:#306CFF /*Original:#333333*/; border-color:#1D12FF /*Original:#222222*/;}\
									 table tr td.inv{color:#0C0F87 /*transparent*/;background-color:#67ACFF /*Original:#EEEEEE*/;}\
									 table.forums tr td.c1, table.forums tr td.script-meat,td,table.forums tr td.c2,#review-list .overview{background-color: #BBDEFF /*Original:transparent*/;}\
									 table.posts{border-bottom:#67ACFF /*Original:#EEEEEE*/;}\
								     div#footer {border-top-color:#81DDDE /*Original:#FF8800*/;background-color:#67ACFF;}\
									 a:link,a:visited{color:#0051E6;}\
									 a:active,a:hover,th a:active,th a:hover,a.author{color:#3E00FF /*Original:#0088FF*/;}\
									 a.lastpost{background-color:#67ACFF;}\
									 ul.subnav li a{background-color:#67ACFF /*Original:#EEEEEE*/;}\
									 ul.subnav li a:hover{background-color:#81DDDE /*Original:#FC9822*/;}\
									 ul.subnav li.current{background-color:#85DCCC /*Original:#FF8800*/;}\
									 .post .author{background-color:#67ACFF /*Original:#EEEEEE*/;color:#0C0F87; border-top:1px solid #67ACFF;}\
									 .posts .post .body{border-top-color:#67ACFF /*Original:#EEEEEE*/; background-color:#BBDEFF /*Original:transparent*/;}\
									 .pagination .current{background-color:#1D12FF /*#CCCCCC*/; border-color:#1D12FF; color: white;}\
									 .pagination a{border-color:#1D12FF;}\
									 .pagination a:hover{border-color:#67ACFF /*Original:#888888*/;}\
									 body h3{background-color:#86CEEA /*Original:#333333*/; border-bottom-color:#A7D8FF /*Original:#999999*/;}\
									 div.editbox h5,div.editbox code{background-color:inherit;color:#A8ACF8;}\
									 div.editbox {background:none 0 0 scroll #BBDEFF;border-color:#1D12FF;}\
									 div.editbox .button_or a{color:red;}\
									 p.subtitle{color:#306CFF;}\
									 .awesome.orange, .awesome.orange:visited{background-color:#306CFF;}\
									 .awesome.orange:visited:hover,.awesome.orange:hover{background-color:#1D12FF;}";
			    
			    break;
				//---------------------------------------------Fire theme-----------------------------------------------
				case "Fire":
				USNE.style.innerHTML="#top{background-color:#FEC667;}\
				                     #header{background-color:#EE8E00;border-top:1px solid #D65500;}\
									 #header h1{background:url("+GM_getResourceURL('bgImg')+") no-repeat scroll 0 0 transparent;}\
									 #header #mainmenu li{background:-moz-linear-gradient(top center,#DFFF00,red) repeat-x #FFA900; border-color:#FF0000;}\
									 #header #mainmenu li.active{background-color:#FF9B69;}\
									 #header #mainmenu li.active a{color:#CF4500;}\
									 #section{background-color:#FF9B69; border-bottom-color:#FF6500;}\
									 #script-nav li{background-color:#FEC667;border-top:1px solid #FF6500;border-left:1px solid #FF6500;border-right:1px solid #FF6500;}\
									 td{border-color:#F0FF00;}\
									 tr.spacer td{background-color:white;}\
									 th{background-color:#F5B522; border-color:#FF6500;}\
									 table tr td.inv{color:#0C0F87;background-color:#FF9B69;}\
									 table.forums tr td.c1, table.forums tr td.script-meat,td,table.forums tr td.c2,#review-list .overview{background-color:#FFD167;}\
									 table.posts{border-bottom:#FF9B69;}\
									 div#footer {border-top-color:#FEC667;background-color:#FF6500;}\
									 a:link,a:visited{color:#E63D00;}\
									 a:active,a:hover,th a:active,th a:hover,a.author{color:#CDAA01;}\
									 a.lastpost{background-color:#FF9B69;}\
									 ul.subnav li a{background-color:#FF9B69;}\
									 ul.subnav li a:hover{background-color:#FF781F;}\
									 ul.subnav li.current{background-color:#FF6500;}\
									 .post .body p.topic{background-color:#FEC667;}\
									 .post .author{background-color:#FF9B69;color:#0C0F87; border-top:1px solid #FF9B69;}\
									 .posts .post .body{border-top-color:#FF9B69; background-color:#FFD167;}\
									 .pagination .current{background-color:#FF6500; border-color:#FF6500; color: white;}\
									 .pagination a{border-color:#FF6500;}\
									 .pagination a:hover{border-color:#FF9B69;}\
									 body h3{background-color:#E46200; border-bottom-color:#BB4A00;}\
									 div.editbox h5,div.editbox code{background-color:inherit;color:#EE8E00;}\
									 div.editbox {background:none 0 0 scroll #FFD167;border-color:#FF6500;}\
									 div.editbox .button_or a{color:red;}\
									 p.subtitle{color:#CF4500;}\
									 .awesome.orange, .awesome.orange:visited{background-color:#F5B522;}\
									 .awesome.orange:visited:hover,.awesome.orange:hover{background-color:#FF6500;}";
				break;
				//---------------------------------------------Soil theme-------------------------------------------------
				case "Soil":
				USNE.style.innerHTML="#top{background-color: #DA8900;}\
				                     #header{background-color:#7A3D00;border-top:1px solid #553B00;}\
									 #header h1{background:url("+GM_getResourceURL('bgImgAlt')+") no-repeat scroll 0 0 transparent;}\
									 #header #mainmenu li{background:-moz-linear-gradient(top center,#736B01,maroon) repeat-x #736B01; border-color:#554422;}\
									 #header #mainmenu li.active{background-color:#B0A300;}\
									 #header #mainmenu li.active a{color:#6A5C00;}\
									 #section{background-color:#B0A300; border-bottom-color:#7A3D00;}\
									 #script-nav li{background-color:#DA8900;border-top:1px solid #7A3D00;border-left:1px solid #7A3D00;border-right:1px solid #7A3D00;}\
									 td{border-color:#DEA200;}\
									 tr.spacer td{background-color:white;}\
									 th{background-color:#6A4D00; border-color:#5C3400;}\
									 table tr td.inv{color:#97B400;background-color:#703B00;}\
									 table.forums tr td.c1, table.forums tr td.script-meat,td,table.forums tr td.c2,#review-list .overview{background-color:#B1850E;}\
									 table.posts{border-bottom:#B0A300;}\
									 div#footer {border-top-color:#DA8900;background-color:#B0A300;}\
									 a:link,a:visited {color:#9F4400;}\
									 a:active,a:hover,th a:active,th a:hover,a.author{color:#CCC400;}\
									 a.lastpost{background-color:#B0A300;}\
									 ul.subnav li a{background-color:#B0A300;}\
									 ul.subnav li a:hover{background-color:#705500;}\
									 ul.subnav li.current{background-color:#563900;}\
									 .post .body p.topic{background-color:#DA8900;}\
									 .post .author{background-color:#B07A00;color:#97B400; border-top:1px solid #B0A300;}\
									 .posts .post .body{border-top-color:#B07A00; background-color:#826219;}\
									 body h3{background-color:#D6D500; border-bottom-color:#786000;}\
									 .pagination .current{background-color:#563900; border-color:#563900; color: white;}\
									 .pagination a{border-color:#563900;}\
									 .pagination a:hover{border-color:#B07A00;}\
									 div.editbox h5,div.editbox code{background-color:inherit;color:#7A3D00;}\
									 div.editbox {background:none 0 0 scroll #826219;border-color:#B0A300;}\
									 div.editbox .button_or a{color:SandyBrown;}\
									 p.subtitle{color:#6A4D00;}\
									 .awesome.orange, .awesome.orange:visited{background-color:#6A4D00;}\
									 .awesome.orange:visited:hover,.awesome.orange:hover{background-color:#B0A300;}";
				break;
				//----------------------------------------------------------Wind theme--------------------------------------------
				case "Wind":
				USNE.style.innerHTML="#top{background-color: #EFBAFF;}\
				                     #header{background-color:#DD6AFF;border-top:1px solid #ED3BFF;}\
									 #header h1{background:url("+GM_getResourceURL('bgImg')+") no-repeat scroll 0 0 transparent;}\
									 #header #mainmenu li{background:-moz-linear-gradient(center top , SkyBlue, #FF58AB) repeat-x #FF58AB; border-color:#6AD0FF;}\
									 #header #mainmenu li.active{background-color:#8ECCFF;}\
									 #section{background-color:#8ECCFF; border-bottom-color:#DD6AFF;}\
									 #script-nav li{background-color: #EFBAFF;border-left: 1px solid #DD6AFF;border-right: 1px solid #DD6AFF;border-top: 1px solid #DD6AFF;}\
									 td{border-color:#FF00DC;}\
									 tr.spacer td{background-color:white;}\
									 table tr td.inv{color:#5700FF;background-color:#FF63D5;}\
									 th{background-color:#B500C1; border-color:#93007F;}\
									 table.forums tr td.c1, table.forums tr td.script-meat,td,table.forums tr td.c2,#review-list .overview{background-color:#FFA9FF;}\
									 table.posts{border-bottom:#8ECCFF;}\
									 div#footer {border-top-color:#EFBAFF;background-color:#8ECCFF;}\
									 a:link,a:visited {color:#8031E3;}\
									 th a:link,th a:visited{color: white;}\
									 a:active,a:hover,th a:active,th a:hover,a.author{color:#007CFF;}\
									 a.lastpost{background-color:#8ECCFF;}\
									 ul.subnav li a{background-color:#8ECCFF;}\
									 ul.subnav li a:hover{background-color:#EA70FC;}\
									 ul.subnav li.current{background-color:#E700FF;}\
									 .post .body p.topic{background-color:#EFBAFF;}\
									 .post .author{background-color:#FF76BE;color:#5700FF; border-top:1px solid #8ECCFF;}\
									 .posts .post .body{border-top-color:#FF76BE;}\
									 body h3{background-color:#7B00BF; border-bottom-color:#84007A;}\
									 .pagination .current{background-color:#E700FF; border-color:#E700FF; color: white;}\
									 .pagination a{border-color:#E700FF;}\
									 .pagination a:hover{border-color:#FF76BE;}\
									 div.editbox h5,div.editbox code{background-color:inherit;color:#DD6AFF;}\
									 div.editbox {background:none 0 0 scroll #FFA9FF;border-color:#8ECCFF;}\
									 div.editbox .button_or a{color:BlueViolet;}\
									 p.subtitle{color:#B500C1;}\
									 .awesome.orange, .awesome.orange:visited{background-color:#B500C1;}\
									 .awesome.orange:visited:hover,.awesome.orange:hover{background-color:#8ECCFF;}";
				break;
				default: USNE.style.innerHTML="";
              }
			    GM_setValue("theme",theme);
				        }
$("#top .container ul").append("<li><span>Theme: </span><select></select></li>");
$("#top .container ul li select").append("<option>Default</option>\
                                          <option style='background-color:#FF9B69'>Fire</option>\
                                          <option style='background-color:#67ACFF;'>Water</option>\
										  <option style='background-color:#DA8900'>Soil</option>\
										  <option style='background-color:#EFBAFF'>Wind</option>").change(function (){var select=this;applyStyle(select.options[select.selectedIndex].text)});
$("#top .container ul li select,#top .container ul li span").css({position:"relative",bottom:"6px",height:"20px",fontSize:"15px"});
$("#top .container ul li select option").filter(':contains('+USNE.theme+')').prop("defaultSelected",true);
applyStyle(USNE.theme);