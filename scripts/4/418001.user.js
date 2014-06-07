// ==UserScript==
// @name        Sinisterly Green Edition
// @namespace   Created by Duubz, Uzinero, and BlueScreen
// @description Sinisterly in Green..Edited from Sinisterly on Rails...Which was edited from Sinisterly in Blue.
// @include     https://sinister.ly/*
// @include     https://www.sinister.ly/*
// @version     1
// @grant       none
// ==/UserScript==

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.msgs_unread {' +
    'background: rgb(34, 182, 124);' +
    'position: absolute;' +
    'height: 13px;' +
    'padding 0 3px;' +
    'border-radius: 2px;' +
    'line-height: 13px;' +
    'font-size: 10px;' +
    'top: 8px;' +
    'right: 7px;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.alerts_unread {' +
    'background: rgb(29, 182, 24);' +
    'position: absolute;' +
    'height: 13px;' +
    'padding: 0 3px;' +
    'border-radius: 2px;' +
    'line-height: 13px;' +
    'font-size: 10px;' +
    'top: 8px;' +
    'right: 7px;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.menu ul a:hover, .menu ul a:active {' +
    'background: transparent url(http://i.imgur.com/JGaKm7L.png) 0px -2px repeat;' +
    'color: white;' +
    'text-decoration: none;' +
    'box-shadow: 0 0 3px #000 inset;}' +
    '.glow {' +
    'background:url(http://i.imgur.com/2Htj0xq.png) repeat-x top;' +
    'position:absolute;' +
    'width: 1000px;' +
    'height: 73px;' +
    'top: -37px;' +
    'left: 50%;' +
    'margin-left: -500px;' +
    'z-index: 2;}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.menu ul {' +
    'background: url(http://i.imgur.com/hDbmm3I.png) 0px -2px repeat-x;'
    'text-align: left;' +
    'padding: 0;' +
    'font-size: 12px;' +
    'font-weight: bold;' +
    'height: 43px;' +
    'line-height: 43px;' +
    'border-left: 1px solid #000000;' +
    'border-right: 1px solid #000000; }';
document.getElementsByTagName("HEAD")[0].appendChild(link);


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '#logo-img {' +
	'background:url(http://i.imgur.com/lRjgdMv.png) no-repeat;' +
	'width:384px;' +
	'height:84px;' +
	'display: block;' +
	'position: relative;' +
	'top: 35px;' +
	'left: 25px;' +
	'transition: 0.3s;' +
          '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '#logo-img:hover {' +
	'background:url(http://i.imgur.com/jePkPdD.png) no-repeat;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    'a:hover, a:active {' +
	'color: #43EE37;' +
	'text-decoration: none;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.bigbutton {' +
    'background: rgb(30, 138, 11) url(https://www.sinister.ly/images/e-red/highlight_faint.png) repeat-x top;' +
    'padding: 8px 12px;' +
    'border-radius: 3px;' +
    'border: 1px solid rgb(35, 82, 38);' +
    'margin-top: 4px;' +
    'position: relative;' +
    'top: 4px;' +
    'color: white !important;' +
    'text-transform: uppercase;' +
    'font-size: 11px;' +
    'text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.71);' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.bigbutton:hover {' +
    'background-color: rgb(33, 156, 14);' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.usertabs {' +
	'background: url(http://i.imgur.com/hDbmm3I.png) 0px -2px repeat-x;' +
	'color: #fff;' +
	'text-align: left;' +
	'padding: 11px 6px;' +
	'border: 1px solid #000000;' +
	'list-style-type: none;' +
	'margin: 0;' +
	'border-top: 0;' +
	'border-radius: 7px 7px 0 0;' +
	
	'font-size: 12px;' +
	'font-weight: bold;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.usertabs li a.selected {' +
	'background: #0B3006;' +
	'color: #fff;' +
	'padding: 5px 10px;' +
	'border-radius: 2px;' +
	'box-shadow: inset 0px -1px 5px rgba(0, 0, 0, 0.7);' +
	
	'text-decoration: none;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.usertabs li a:hover {' +
	'background: #0B3006;' +
	'color: #fff;' +
	'box-shadow: inset 0px -1px 5px rgba(0, 0, 0, 0.7);' +
	'border-radius: 2px;' +
	
	'text-decoration: none;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);


    var tags = document.getElementsByTagName('img');
for (var i = 0; i < tags.length; i++) {
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/announcements.png', 'http://i.imgur.com/xzBfUIt.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/introductions.png', 'http://i.imgur.com/gooudZ1.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/world_news.png', 'http://i.imgur.com/YS5Q8ye.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/the_lounge.png', 'http://i.imgur.com/ZEylxLP.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/anime_manga.png', 'http://i.imgur.com/vYCb350.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/elite_lounge.png', 'http://i.imgur.com/sV9dOk7.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/giveaways_freebies.png', 'http://i.imgur.com/z45In6v.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/nsfw.png', 'http://i.imgur.com/YHNKcC8.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/advanced.png', 'http://i.imgur.com/a8DMOFD.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/tutorials.png', 'http://i.imgur.com/DVuZP3P.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/tools.png', 'http://i.imgur.com/o8T84W4.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/network.png', 'http://i.imgur.com/DvmglKx.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/website.png', 'http://i.imgur.com/r5M3lSo.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/remote_admin_stress_testing.png', 'http://i.imgur.com/hviuoR9.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/social_engineering.png', 'http://i.imgur.com/CetHgwM.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/operating_systems.png', 'http://i.imgur.com/t52SR8S.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/software_programs.png', 'http://i.imgur.com/hffw8nI.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/virtual_machines.png', 'http://i.imgur.com/7WxEJne.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/hardware_customization.png', 'http://i.imgur.com/SGWIMfb.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/mobile_tablets.png', 'http://i.imgur.com/Z8WfgEQ.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/networking.png', 'http://i.imgur.com/dzdspw3.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/antivirus_protection.png', 'http://i.imgur.com/xbLmaPu.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/coding.png', 'http://i.imgur.com/eC68Zav.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/visual_basic_net_framework.png', 'http://i.imgur.com/9t4gXf1.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/c_cpp_obj_c.png', 'http://i.imgur.com/gWOcn0T.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/java_jvm_jre.png', 'http://i.imgur.com/E42CvZy.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/php.png', 'http://i.imgur.com/FmqT9py.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/python.png', 'http://i.imgur.com/np771LA.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/tutorials_.png', 'http://i.imgur.com/SQ3kENt.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/resources.png', 'http://i.imgur.com/M92MYQg.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/graphic_design.png', 'http://i.imgur.com/loUj3g8.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/video_design.png', 'http://i.imgur.com/eMZdtwG.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/battles.png', 'http://i.imgur.com/RkztK0V.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/feedback.png', 'http://i.imgur.com/2XsHOPo.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/web_design.png', 'http://i.imgur.com/N3VKeqQ.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/cross_platform.png', 'http://i.imgur.com/u5dJxgb.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/microsoft_consoles.png', 'http://i.imgur.com/XRP2zb0.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/nintendo_consoles.png', 'http://i.imgur.com/Pgoso1O.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/sony_consoles.png', 'http://i.imgur.com/wbogSDT.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/pc_gaming.png', 'http://i.imgur.com/WmH8p6R.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/emulation.png', 'http://i.imgur.com/4K0gsmH.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/ebooks.png', 'http://i.imgur.com/yIb5l7T.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/music.png', 'http://i.imgur.com/pycu4Qd.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/movies_tv.png', 'http://i.imgur.com/hzrnNfI.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/programs.png', 'http://i.imgur.com/fmvRc2i.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/games.png', 'http://i.imgur.com/8j60N8y.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/accounts.png', 'http://i.imgur.com/MM55ceZ.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/requests.png', 'http://i.imgur.com/JyILhsm.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/market_discussion.png', 'http://i.imgur.com/zr8iYtc.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/monetizing.png', 'http://i.imgur.com/EzNmOZB.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/regular_sales.png', 'http://i.imgur.com/Aq0Lqcw.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/premium_sales.png', 'http://i.imgur.com/bYDuLxV.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/traders_area.png', 'http://i.imgur.com/QkAAYMy.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/buyers_area.png', 'http://i.imgur.com/emqxWDx.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/deals_bargains.png', 'http://i.imgur.com/v2ey1nr.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/scam_reports.png', 'http://i.imgur.com/9IjE4pV.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/group_discussion.png', 'http://i.imgur.com/H2TqtY2.png');     
        
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/announcements.png', 'http://i.imgur.com/xzBfUIt.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/introductions.png', 'http://i.imgur.com/gooudZ1.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/world_news.png', 'http://i.imgur.com/YS5Q8ye.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/the_lounge.png', 'http://i.imgur.com/ZEylxLP.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/anime_manga.png', 'http://i.imgur.com/vYCb350.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/elite_lounge.png', 'http://i.imgur.com/sV9dOk7.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/giveaways_freebies.png', 'http://i.imgur.com/z45In6v.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/nsfw.png', 'http://i.imgur.com/YHNKcC8.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/advanced.png', 'http://i.imgur.com/a8DMOFD.png');    
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/tutorials.png', 'http://i.imgur.com/DVuZP3P.png');    
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/tools.png', 'http://i.imgur.com/o8T84W4.png');    
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/network.png', 'http://i.imgur.com/DvmglKx.png');    
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/website.png', 'http://i.imgur.com/r5M3lSo.png');    
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/remote_admin_stress_testing.png', 'http://i.imgur.com/hviuoR9.png');    
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/social_engineering.png', 'http://i.imgur.com/CetHgwM.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/operating_systems.png', 'http://i.imgur.com/t52SR8S.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/software_programs.png', 'http://i.imgur.com/hffw8nI.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/virtual_machines.png', 'http://i.imgur.com/7WxEJne.png');    
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/hardware_customization.png', 'http://i.imgur.com/SGWIMfb.png');    
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/mobile_tablets.png', 'http://i.imgur.com/Z8WfgEQ.png');    
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/networking.png', 'http://i.imgur.com/dzdspw3.png');    
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/antivirus_protection.png', 'http://i.imgur.com/xbLmaPu.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/coding.png', 'http://i.imgur.com/eC68Zav.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/visual_basic_net_framework.png', 'http://i.imgur.com/9t4gXf1.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/c_cpp_obj_c.png', 'http://i.imgur.com/gWOcn0T.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/java_jvm_jre.png', 'http://i.imgur.com/E42CvZy.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/php.png', 'http://i.imgur.com/FmqT9py.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/python.png', 'http://i.imgur.com/np771LA.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/tutorials_.png', 'http://i.imgur.com/SQ3kENt.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/resources.png', 'http://i.imgur.com/M92MYQg.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/graphic_design.png', 'http://i.imgur.com/loUj3g8.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/video_design.png', 'http://i.imgur.com/eMZdtwG.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/battles.png', 'http://i.imgur.com/RkztK0V.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/feedback.png', 'http://i.imgur.com/2XsHOPo.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/web_design.png', 'http://i.imgur.com/N3VKeqQ.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/cross_platform.png', 'http://i.imgur.com/u5dJxgb.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/microsoft_consoles.png', 'http://i.imgur.com/XRP2zb0.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/nintendo_consoles.png', 'http://i.imgur.com/Pgoso1O.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/sony_consoles.png', 'http://i.imgur.com/wbogSDT.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/pc_gaming.png', 'http://i.imgur.com/WmH8p6R.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/emulation.png', 'http://i.imgur.com/4K0gsmH.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/ebooks.png', 'http://i.imgur.com/yIb5l7T.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/music.png', 'http://i.imgur.com/pycu4Qd.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/movies_tv.png', 'http://i.imgur.com/hzrnNfI.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/programs.png', 'http://i.imgur.com/fmvRc2i.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/games.png', 'http://i.imgur.com/8j60N8y.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/accounts.png', 'http://i.imgur.com/MM55ceZ.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/requests.png', 'http://i.imgur.com/JyILhsm.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/market_discussion.png', 'http://i.imgur.com/zr8iYtc.png');
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/monetizing.png', 'http://i.imgur.com/EzNmOZB.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/regular_sales.png', 'http://i.imgur.com/Aq0Lqcw.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/premium_sales.png', 'http://i.imgur.com/bYDuLxV.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/traders_area.png', 'http://i.imgur.com/QkAAYMy.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/buyers_area.png', 'http://i.imgur.com/emqxWDx.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/deals_bargains.png', 'http://i.imgur.com/v2ey1nr.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/scam_reports.png', 'http://i.imgur.com/9IjE4pV.png'); 
    tags[i].src = tags[i].src.replace('https://.sinister.ly/uploads/ficons/group_discussion.png', 'http://i.imgur.com/H2TqtY2.png');     
}