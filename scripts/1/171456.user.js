// ==UserScript==
// @name          Midnight GMail
// @namespace     http://userstyles.org
// @description	  Based on Dazman's DarkNight userstyle, this is refined and cleaned up. Smooth gradiants and subtle dark colors..
// @author        cqrt
// @version       1.1
// @homepage      http://userstyles.org/styles/81304
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// @run-at        document-start
// ==/UserScript==

// Initiate custom CSS function
function GM_addStyle(css) {
	var parent, style, textNode;
	parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	style = document.createElement("style");
	style.type = "text/css";
	textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}
// Custom CSS interface styling
GM_addStyle("\
#loading, #stb { background-color: #222; }\
* { font-weight: normal !important; font-family: trebuchet ms !important; }\
.aAD { background: -webkit-gradient(linear, left top, left bottom, from(#1A1A1A), to(#000)) !important; background: linear-gradient(#1a1a1a, #000) repeat scroll 0 0 transparent !important; padding-top: 3px; }\
.aAU { background: #111 !important; }\
.ab0 { color: #B5B5B5 !important; }\
.abp .abo { color: #B5B5B5 !important; }\
.abX .abY { color: #B5B5B5 !important; }\
.aco .R5, .RU .R5, .RT .R5, .R1 { background-color: #1A1A1A !important; }\
.ad, .b8 .ca, .J-N-JT .J-N-Jz, .J-N-JW .J-N-Jz, .J-LC-JT .J-LC-Jz, .J-JK-JT .J-JK-Jz { color: rgb(73, 118, 141) !important; }\
.aeF { padding: 0px 0 0 !important; }\
.aeS { border-color: #000000 !important; }\
.agenda .event-title { font-family: verdana !important; font-size: 11px !important; }\
.agenda .event-title{ font-family: courier new !important; font-size: 11px !important; }\
.aig { right: 11px !important; }\
.ain { border-left: 4px solid rgb(143, 153, 162) !important; }\
.aio, .TO .n1, .n0, .CL .CK, .RM .CK, .zF { font-family: trebuchet ms !important; font-size: 13px !important; color: rgb(73, 118, 141) !important; padding-top: 0px !important; padding-bottom: 2px !important; }\
.air { border-bottom: 0px solid rgba(255,255,255,.2) !important; }\
.aj5 .J-KU.J-KU-KO { background: none repeat scroll 0 0 rgba(0, 0, 0, 0.1) !important; }\
.aj5.J-KU-Jg { border-top: 1px solid #000000 !important; }\
.akh { color: #B5B5B5 !important; }\
.aos { margin-right: 48px; }\
.aos:before {content:'Settings'; }\
.ar.as .at .au { text-shadow: 0em 0em 0em rgb(160, 158, 158) !important; font-size: 10px !important; color: #444 !important; }\
.ar6,.ar8,.asl,.ar9,.ase,.asb,.asf,.aos,.hB { text-indent: 22px !important; width: 20px !important; }\
.ar6:before {content:'Back'; }\
.ar8:before {content:'Archive'; }\
.ar9:before {content:'Delete'; }\
.asa { width: 65px !important; text-align: left !important; color: #FFF !important; }\
.asb:before {content:'Labels'; }\
.asc { color: #b5b5b5 !important; }\
.ase:before {content:'Move to'; }\
.asf:before {content:'Reload'; }\
.ash { width: 75px !important; text-align: left !important; color: #FFF !important; }\
.asl:before {content:'Spam'; }\
.at, .au{ border-radius: 3px; }\
.ata-asE { background: -webkit-gradient(linear, left top, left bottom, from(#111), to(#000)) !important; background: linear-gradient(#111, #000) repeat scroll 0 0 transparent !important; border: 1px solid #000 !important; color: #222 !important; font-family: trebuchet ms; font-size: 14px !important; }\
.ata-asJ { color: #0276EB !important; }\
.av { text-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.3) !important; font-family: verdana !important; }\
.b8 .vh, .cc .vh, .vX .vh { background-color: #262626 !important; border-color: #404040 !important; color: #F5B800 !important; }\
.bQ { padding-right: 0px !important; width: auto; }\
.Bu, .fN{ border-top-left-radius: 10px; }\
.cf.hX .hR .hN { text-shadow: 0em 0em 0em rgb(160, 158, 158) !important; font-size: 10px !important; }\
.CJ, .pw, .uh, .az1, .vm, .qh, .Wl, .Dj, .adl, .w-asK .e, .l2, .A2, .yj, .dt, .akh { font-family: verdana !important; font-size: 11px !important; color: #B5B5B5 ! important; }\
.d8 { font-family: verdana !important; font-size: 11px !important; }\
.dp-cell { color: #b5b5b5 !important; }\
.dp-prev, .dp-next, .dp-cur  { color: rgb(73, 118, 141) !important; }\
.gb_D { border-bottom-color: #1A1A1A !important; }\
.gb_d, #gb a.gb_r { color: #B5B5B5 !important; }\
.gb_k .gb_qb, .gb_l .gb_qb { background: url('https://lh5.googleusercontent.com/-02LQgucdgGk/UIbjqcrVU8I/AAAAAAAABmE/PuQ5PGX0SY4/s168/Skysa-BlackBar.png') repeat scroll 0 0 black !important; }\
.gb_o { background: #555 !important; border: none !important; box-shadow: 2px 4px 13px rgb(10, 10, 10) !important; border-bottom-right-radius: 5px !important; border-bottom-left-radius: 5px !important; -webkit-animation: gb__a .5s !important; right: 170px !important; top: 28px !important; }\
.gb_q, .gb_r { background: #1A1A1A !important; }\
.gb_qb { background: #000000 !important; }\
.gb_r { border-top: 1px solid #333333 !important; }\
.gbem#gbq1, .gbemi#gb #gbq1 { margin-top: -5px !important; }\
.gbqfb { background: url('https://lh5.googleusercontent.com/-02LQgucdgGk/UIbjqcrVU8I/AAAAAAAABmE/PuQ5PGX0SY4/s168/Skysa-BlackBar.png') repeat scroll 0 0 black !important; border: 1px solid #000 !important; }\
.gbqfif, .gbqfsf { color: #B5B5B5 !important; font: 16px arial,sans-serif !important; }\
.gbqfqw { background: none repeat scroll 0 0 #333 !important; border-color: #000 !important; border-radius: 4px !important; }\
.G-atb { background: linear-gradient(#333, #000) repeat scroll 0 0 transparent !important; border-bottom: 1px solid #000000 !important; padding-bottom: 0px !important; margin-bottom: 7px !important; margin-top: -6px !important;}\
.G-atb .T-I-ax7 { background: linear-gradient(#444, #111) repeat scroll 0 0 transparent !important; margin-top: 6px !important; border: 1px solid #000 !important; color: #b5b5b5 !important;}\
.G-atb .T-I-ax7:hover{ background: linear-gradient(#555, #222) repeat scroll 0 0 transparent !important; }\
.hB:before {content:'Reply'; }\
.hN, .hO { text-shadow: 0em 0em 0em black !important; font-family: verdana !important; }\
.J-awr { color: #B5B5B5 !important; }\
.J-awx, .Kj-JD { background: none repeat scroll 0 0 padding-box #1a1a1a !important; }\
.J-Kh { border-top: 1px solid #333333 !important; }\
.J-KU .aj2 { background: url('http://dazman.com/pix/google/mail/groupchat_white_dropshadow.png') no-repeat scroll 0 0 transparent !important; }\
.J-KU .aj4 { background: url('http://dazman.com/pix/google/mail/more_gadgets_white_dropshadow.png') no-repeat scroll 0 0 transparent; opacity: 0.5; }\
.J-KU-KO .aj4 { background: url('http://dazman.com/pix/google/mail/more_gadgets_white_dropshadow.png') no-repeat scroll 0 0 transparent !important; }\
.J-M { background: none repeat scroll 0 0 #1A1A1A !important; border-bottom-right-radius: 5px !important; border-bottom-left-radius: 5px !important; box-shadow: 2px 4px 13px rgb(10, 10, 10) !important; }\
.J-N, .J-LC, .J-JK { background: none repeat scroll 0 0 #1A1A1A !important; color: #B5B5B5 !important; font-family: trebuchet ms !important; }\
.J-N-JT, .J-LC-JT, .J-JK-JT { border-style: solid !important; border-color: #1A1A1A !important; }\
.Kj-JD-Jz { background-color: #1a1a1a !important; color: #b5b5b5 !important; line-height: 1.4em; }\
.Kj-JD-K7 { background-color: #1a1a1a !important; color: #b5b5b5 !important; }\
.l3 { color: #B5B5B5 !important; }\
.l6 { color: #B5B5B5 !important; font-size: 100% !important; }\
.l8 { color: #B5B5B5 !important; }\
.l9 { color: #B5B5B5 !important; }\
.lpb, .lpb #lpt { border-radius: 6px !important; }\
.ma { color: #B5B5B5 !important; font-size: 95% !important; }\
.mb { color: #B5B5B5 !important; }\
.md { font-size: 100% !important; }\
.mgadget .datepicker .dp-days, .mgadget .datepicker .dp-heading, .dp-weekend, .dp-weekendh, dp-weekday { background-color: rgb(19, 19, 19) !important; }\
.mgadget .gadget-footer { background: none repeat scroll 0 0 #FFF !important; }\
.mgadget, .agenda .event-title:hover { font-family: verdana !important;font-size: 11px !important; }\
.mj { color: #B5B5B5 !important; }\
.ML { color: #b5b5b5; height: 23px; border-bottom: 1px rgb(15, 15, 15) solid !important; background: -webkit-gradient(linear, left top, left bottom, from(#333), to(#222)) !important; background: linear-gradient(#333, #222) repeat scroll 0 0 transparent !important; }\
.MT, .abN { background: -webkit-gradient(linear, left top, left bottom, from(#1A1A1A), to(#000)) !important; background: linear-gradient(#1a1a1a, #000) repeat scroll 0 0 transparent !important; }\
.msg, .msgb { color: #b5b5b5 !important; }\
.msgb a { color: rgb(73, 118, 141) !important; }\
.nH.Nl .no, .nH.Cr .no { background: linear-gradient(#333, #000) repeat scroll 0 0 transparent !important; }\
.no { background: none repeat scroll 0 0 #000 !important; }\
.nZ .n0 { color: #1691FF !important; font-weight: bold; }\
.nZ .nU, .nZ .n0 { color: #1691FF !important; font-weight: bold !important; }\
.nZ.TO .n0 { color: rgb(143, 153, 162) !important; }\
.pM.aj0 .p6{ color: #ddd !important; background-color: #333 !important; }\
.qh { color: gold !important; }\
.R5 { color: #B5B5B5 !important; font-family: verdana !important; font-size: 11px !important; }\
.Rd { background: black !important; }\
.T-I-J3.J-J5-Ji, .T-I-ax7.T-I-JE .T-I-J3 { opacity: .65 !important; }\
.T-I-ax7.T-I-JW .T-I-J3, .T-I-ax7.T-I-Kq .T-I-J3 { opacity: .75 !important; }\
.T-I { font-weight: normal !important; }\
.T-I { line-height: 22px !important; padding-top: 3px !important; height: 23px !important; font-family: verdana !important; }\
.T-I-KE, .z0 .T-I-ax7 { background: linear-gradient(#444, #111) repeat scroll 0 0 transparent !important; border: 1px solid black !important; color: #b5b5b5 !important; border-radius: 3px 3px 3px 3px !important; }\
.T-I-KE:focus { border: 1px solid #000 !important; }\
.T-I-KE:hover { background: linear-gradient(#555, #222) repeat scroll 0 0 transparent !important; }\
.T-KT-Jp:before { content: url(data:image/png;base64,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); !important; }\
.TD { background: none repeat scroll 0 0 #111111; color: #1691ff !important; height: inherit; }\
.th.r7 { background: #f5f5f5 !important; color: #000 !important; }\
.TN { background: -webkit-gradient(linear, left top, left bottom, from(#111), to(#000)) !important; background: linear-gradient(#111, #000) repeat scroll 0 0 transparent !important; }\
.TO.NQ:hover { background: rgb(73, 118, 141) !important; }\
.Wg { background: -webkit-gradient(linear, left top, left bottom, from(#333), to(#111)) !important; background: linear-gradient(#333, #111) repeat scroll 0 0 transparent !important; padding: 0 0 5px !important; }\
.Wg { border-bottom: 1px solid #000000 !important; }\
.Wn, .z .Wg .Di .Dj{ color: gold !important; text-decoration: none !important; }\
.xY { border-bottom: 1px solid #111 !important; }\
.y3 { display: none !important; }\
.ya { color: #B5B5B5 !important; background-color: #1A1A1A !important; border-bottom: 1px #333 solid !important; padding: 6px 8px !important; }\
.yO { background: -webkit-gradient(linear, left top, left bottom, from(#333), to(#222)) !important; background: linear-gradient(#333, #222) repeat scroll 0 0 transparent !important; }\
.yW, .y6, .xS, .yf, .xW, zF{font-family: verdana !important; font-size: 12px !important; font-weight: normal !important; color: #b5b5b5 !important; }\
.z0 { text-align: center !important; }\
.zA.zE .xY { border-bottom: 1px solid #000 !important; }\
.zE { background: -webkit-gradient(linear, left top, left bottom, from(#111), to(#000)) !important; background: linear-gradient(#222, #111) repeat scroll 0 0 transparent !important; }\
.zF, .y6 b, .zA.zE .y6 span, .xW.xY b{ font-weight: bold !important; }\
::-webkit-scrollbar { width: 16px !important; height: 9px!important; }\
::-webkit-scrollbar-thumb { background-color: #333 !important; border-radius: 1px; }\
::-webkit-scrollbar-thumb:active { background-color: #333; }\
::-webkit-scrollbar-thumb:hover { background-color: #333; }\
::-webkit-scrollbar-track-piece { background-color: black; }\
::-webkit-scrollbar-track-piece:no-button {}\
.scrollbox::-webkit-scrollbar { width: 16px !important; height: 9px!important; }\
.scrollbox::-webkit-scrollbar-thumb { background-color: #333 !important; border-radius: 1px; }\
.scrollbox::-webkit-scrollbar-thumb:active { background-color: #333; }\
.scrollbox::-webkit-scrollbar-thumb:hover { background-color: #333; }\
.scrollbox::-webkit-scrollbar-track-piece { background-color: black; }\
.scrollbox::-webkit-scrollbar-track-piece:no-button {}\
body::-webkit-scrollbar-track-piece { background-color: black; }\
div.xT{ width:100% !important; }\
div.yi div.ar{ float:right !important; }\
div.yi{ float:right !important; margin-left:3px; }\
div[title='Back to Inbox'] div .ar6:before,div[data-tooltip='Back to Inbox'] div .ar6:before { content:'Inbox'; }"
);