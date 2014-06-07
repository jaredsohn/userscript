// ==UserScript==
// @name           GEO.de Plus
// @namespace      http://www.sebastian-lang.net/
// @description    Centered content and some beautifications
//
// @include        *.geo.de/*
//
// @author         Sebastian-Lang.net
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.1.0
// @lastupdated    2010-10-17
// 
// @history        0.1.0 Initial release
//
// ==/UserScript==

//Add CSS
GM_addStyle(<style><![CDATA[

body { 				background-color:#444; 
					margin-top: 0px; 	
					}	
*{ 					margin:0 auto;	
					}
#magNav {           margin-top: 0px;
					border-size: 0px;
					}
#rubrikenAd {       height: 0px;
					margin: 15px;
					}
#mainHeader{ 		margin:0 auto!important;
					border: none;
					}	
#mainNav{ 			margin:0 auto!important;
					}					
#mainContent { 		background-color:#FFF;
					margin:0 auto!important;			
					}
#footer { 			margin:0 auto; 
					border: none;
					}
#gujSites{ 			margin:0 auto!important;	
					}						

]]></style>);
