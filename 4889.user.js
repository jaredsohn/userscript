// Writely Re-engineered
// 2006-07-24
// Copyright (c) 2006, Praful Mathur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Writely Re-engineered Alpha 0.1
// @namespace     http://blog.dasickis.com
// @description   Writely Re-engineered for high usability and productivity
// @include       http://www.writely.com/Edit.aspx?tab=edit&docid=*
// @include       http://www.writely.com/Doc.aspx?id=*
// ==/UserScript==

//From Tutorial on DotVoid @ http://www.dotvoid.com/view.php?id=13
    var script = document.createElement('script');
    script.src = 'http://dasickis.com/writely/writely.js';
    script.type = 'text/javascript';
    script.defer = true;
    
    var head = document.getElementsByTagName('head').item(0);
    head.appendChild(script);

//-----------------------------------------------------------------------------------------\\

//From TypeTester @ typetester.maratz.com
    var fontCatcher = document.createElement('div');
    fontCatcher.innerHTML = "<object id=\"font_catcher\" name=\"font_catcher\" type=\"application/x-shockwave-flash\" data=\"http://dasickis.com/writely/get_fonts.swf\" width=\"1\" height=\"1\"><param name=\"movie\" value=\"http://dasickis.com/writely/get_fonts.swf\" /></object>";
    document.body.appendChild(fontCatcher);
//---------------------------------------------------------\\

//document.body.style.overflow = "auto";

var writelyPage = document.getElementsByTagName('div').item(0);
writelyPage.style.align="left";
writelyPage.style.width="743px";
writelyPage.setAttribute('layout','portrait');

var researchModule = document.createElement('iframe');
researchModule.style.visibility="visible";
researchModule.style.position="absolute";
//researchModule.style.left=(writelyPage.style.width.indexOf('%')>-1 ? (parseInt(writelyPage.style.width)/100.0*screen.width) : parseInt(writelyPage.style.width))+5;
researchModule.style.left="748px";
researchModule.style.bottom="15px";
researchModule.style.width=screen.width-(writelyPage.style.width.indexOf('%')>-1 ? (parseInt(writelyPage.style.width)/100*screen.width) : parseInt(writelyPage.style.width)) - 20;
//researchModule.style.width=screen.width-parseInt(writelyPage.style.width)-20;
researchModule.style.height="95%";
researchModule.src="http://www.google.com/";

writelyPage.appendChild(researchModule);


//for(var x=0;x<2000;x++)
//document.getElementsByTagName('*').item(x).style.background='#'+x+x+x;