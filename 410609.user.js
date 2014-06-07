// ==UserScript==
// @name        Sinister.ly Blue Edition
// @namespace   By Uzinero with help from BlueScreen
// @description A theme which changes every single piece of red in the SL theme to a sexy blue.
// @include     https://sinister.ly/*
// @include     https://www.sinister.ly/*
// @version     1
// @grant       none
// ==/UserScript==

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.menu ul a:hover, .menu ul a:active {' +
    'background: transparent url(http://i.imgur.com/pXUgmEt.png) 0px -2px repeat;' +
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
    'background: url(http://i.imgur.com/KcT5o2g.png) 0px -2px repeat-x;'
'text-align: left;' +
    'padding: 0;' +
    'font-size: 12px;' +
    'font-weight: bold;' +
    'height: 43px;' +
    'line-height: 43px;' +
    'border-left: 1px solid #160101;' +
    'border-right: 1px solid #160101; }';
document.getElementsByTagName("HEAD")[0].appendChild(link);


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '#logo-img {' +
	'background:url(http://i.imgur.com/G9fs2nw.png) no-repeat;' +
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
	'background:url(http://i.imgur.com/H5zNEcW.png) no-repeat;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    'a:hover, a:active {' +
	'color: #377DEE;' +
	'text-decoration: none;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.bigbutton {' +
    'background: rgb(11, 45, 138) url(https://www.sinister.ly/images/e-red/highlight_faint.png) repeat-x top;' +
    'padding: 8px 12px;' +
    'border-radius: 3px;' +
    'border: 1px solid rgb(35, 35, 82);' +
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
    'background-color: #0E1F9C;' +
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
	'background: url(http://i.imgur.com/KcT5o2g.png) 0px -2px repeat-x;' +
	'color: #fff;' +
	'text-align: left;' +
	'padding: 11px 6px;' +
	'border: 1px solid #05123D;' +
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
	'background: #05123D;' +
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
	'background: #05123D;' +
	'color: #fff;' +
	'box-shadow: inset 0px -1px 5px rgba(0, 0, 0, 0.7);' +
	'border-radius: 2px;' +
	
	'text-decoration: none;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);


    var tags = document.getElementsByTagName('img');
for (var i = 0; i < tags.length; i++) {
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/announcements.png', 'http://i.imgur.com/ngPrF41.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/introductions.png', 'http://imgur.com/hPrSCuI.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/world_news.png', 'http://imgur.com/30rkjDA.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/the_lounge.png', 'http://imgur.com/2s3LY18.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/anime_manga.png', 'http://imgur.com/TJH1quy.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/elite_lounge.png', 'http://imgur.com/qxvqirJ.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/giveaways_freebies.png', 'http://imgur.com/kHPrzZ0.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/nsfw.png', 'http://i.imgur.com/VXXYeWD.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/advanced.png', 'http://i.imgur.com/ijb8cJV.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/tutorials.png', 'http://i.imgur.com/TQHaDKV.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/tools.png', 'http://i.imgur.com/YPLJii5.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/network.png', 'http://i.imgur.com/VHPoVld.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/website.png', 'http://i.imgur.com/DfXC2vs.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/remote_admin_stress_testing.png', 'http://i.imgur.com/VU8js2K.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/social_engineering.png', 'http://i.imgur.com/ytnBpHH.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/operating_systems.png', 'http://i.imgur.com/boGi1Qo.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/software_programs.png', 'http://i.imgur.com/rQKCplq.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/virtual_machines.png', 'http://i.imgur.com/ZYQix4G.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/hardware_customization.png', 'http://i.imgur.com/av6FWGF.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/mobile_tablets.png', 'http://i.imgur.com/yzVKziO.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/networking.png', 'http://i.imgur.com/GguoMPl.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/antivirus_protection.png', 'http://i.imgur.com/b4BczZA.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/coding.png', 'http://i.imgur.com/xcdjWnW.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/visual_basic_net_framework.png', 'http://i.imgur.com/8lFilxw.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/c_cpp_obj_c.png', 'http://i.imgur.com/lQjRjyk.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/java_jvm_jre.png', 'http://i.imgur.com/dtit0F3.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/php.png', 'http://i.imgur.com/VckDTxS.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/python.png', 'http://i.imgur.com/skvs6Jl.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/tutorials_.png', 'http://i.imgur.com/qPI2wuK.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/resources.png', 'http://i.imgur.com/lsvSssL.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/graphic_design.png', 'http://i.imgur.com/9ZmJFk6.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/video_design.png', 'http://i.imgur.com/rjCA21X.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/battles.png', 'http://i.imgur.com/TBxDcN6.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/feedback.png', 'http://i.imgur.com/MtHV89q.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/web_design.png', 'http://i.imgur.com/dAwXA9p.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/cross_platform.png', 'http://i.imgur.com/2FnCNYE.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/microsoft_consoles.png', 'http://i.imgur.com/tnGECHD.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/nintendo_consoles.png', 'http://i.imgur.com/DmdQVN4.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/sony_consoles.png', 'http://i.imgur.com/xN3UIbi.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/pc_gaming.png', 'http://i.imgur.com/Ue6rE9i.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/emulation.png', 'http://i.imgur.com/hcBtUcl.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/ebooks.png', 'http://i.imgur.com/XLdnYbY.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/music.png', 'http://i.imgur.com/J7Qkwrd.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/movies_tv.png', 'http://i.imgur.com/O8a8ED7.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/programs.png', 'http://i.imgur.com/qrroJvP.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/games.png', 'http://i.imgur.com/Fu2pPvE.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/accounts.png', 'http://i.imgur.com/LBIrGf3.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/requests.png', 'http://i.imgur.com/9ufSmPj.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/market_discussion.png', 'http://i.imgur.com/4NHPg9E.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/monetizing.png', 'http://i.imgur.com/Vm1e4uZ.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/regular_sales.png', 'http://i.imgur.com/Y5zWgZT.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/premium_sales.png', 'http://i.imgur.com/Bq7XgI0.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/traders_area.png', 'http://i.imgur.com/nNr48Zp.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/buyers_area.png', 'http://i.imgur.com/kWsQaMJ.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/deals_bargains.png', 'http://i.imgur.com/pHk6HWO.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/scam_reports.png', 'http://i.imgur.com/Pk3jCJs.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/group_discussion.png', 'http://i.imgur.com/W05246n.png'); 
    
        tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/announcements.png', 'http://i.imgur.com/ngPrF41.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/introductions.png', 'http://imgur.com/hPrSCuI.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/world_news.png', 'http://imgur.com/30rkjDA.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/the_lounge.png', 'http://imgur.com/2s3LY18.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/anime_manga.png', 'http://imgur.com/TJH1quy.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/elite_lounge.png', 'http://imgur.com/qxvqirJ.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/giveaways_freebies.png', 'http://imgur.com/kHPrzZ0.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/nsfw.png', 'http://i.imgur.com/VXXYeWD.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/advanced.png', 'http://i.imgur.com/ijb8cJV.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/tutorials.png', 'http://i.imgur.com/TQHaDKV.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/tools.png', 'http://i.imgur.com/YPLJii5.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/network.png', 'http://i.imgur.com/VHPoVld.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/website.png', 'http://i.imgur.com/DfXC2vs.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/remote_admin_stress_testing.png', 'http://i.imgur.com/VU8js2K.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/social_engineering.png', 'http://i.imgur.com/ytnBpHH.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/operating_systems.png', 'http://i.imgur.com/boGi1Qo.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/software_programs.png', 'http://i.imgur.com/rQKCplq.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/virtual_machines.png', 'http://i.imgur.com/ZYQix4G.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/hardware_customization.png', 'http://i.imgur.com/av6FWGF.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/mobile_tablets.png', 'http://i.imgur.com/yzVKziO.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/networking.png', 'http://i.imgur.com/GguoMPl.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/antivirus_protection.png', 'http://i.imgur.com/b4BczZA.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/coding.png', 'http://i.imgur.com/xcdjWnW.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/visual_basic_net_framework.png', 'http://i.imgur.com/8lFilxw.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/c_cpp_obj_c.png', 'http://i.imgur.com/lQjRjyk.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/java_jvm_jre.png', 'http://i.imgur.com/dtit0F3.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/php.png', 'http://i.imgur.com/VckDTxS.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/python.png', 'http://i.imgur.com/skvs6Jl.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/tutorials_.png', 'http://i.imgur.com/qPI2wuK.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/resources.png', 'http://i.imgur.com/lsvSssL.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/graphic_design.png', 'http://i.imgur.com/9ZmJFk6.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/video_design.png', 'http://i.imgur.com/rjCA21X.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/battles.png', 'http://i.imgur.com/TBxDcN6.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/feedback.png', 'http://i.imgur.com/MtHV89q.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/web_design.png', 'http://i.imgur.com/dAwXA9p.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/cross_platform.png', 'http://i.imgur.com/2FnCNYE.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/microsoft_consoles.png', 'http://i.imgur.com/tnGECHD.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/nintendo_consoles.png', 'http://i.imgur.com/DmdQVN4.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/sony_consoles.png', 'http://i.imgur.com/xN3UIbi.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/pc_gaming.png', 'http://i.imgur.com/Ue6rE9i.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/emulation.png', 'http://i.imgur.com/hcBtUcl.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/ebooks.png', 'http://i.imgur.com/XLdnYbY.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/music.png', 'http://i.imgur.com/J7Qkwrd.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/movies_tv.png', 'http://i.imgur.com/O8a8ED7.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/programs.png', 'http://i.imgur.com/qrroJvP.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/games.png', 'http://i.imgur.com/Fu2pPvE.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/accounts.png', 'http://i.imgur.com/LBIrGf3.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/requests.png', 'http://i.imgur.com/9ufSmPj.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/market_discussion.png', 'http://i.imgur.com/4NHPg9E.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/monetizing.png', 'http://i.imgur.com/Vm1e4uZ.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/regular_sales.png', 'http://i.imgur.com/Y5zWgZT.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/premium_sales.png', 'http://i.imgur.com/Bq7XgI0.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/traders_area.png', 'http://i.imgur.com/nNr48Zp.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/buyers_area.png', 'http://i.imgur.com/kWsQaMJ.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/deals_bargains.png', 'http://i.imgur.com/pHk6HWO.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/scam_reports.png', 'http://i.imgur.com/Pk3jCJs.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/group_discussion.png', 'http://i.imgur.com/W05246n.png');  
}