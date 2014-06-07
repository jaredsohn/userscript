// ==UserScript==
// @name        Sinisterly On Rails
// @namespace   Created by Duubz, Uzinero, and BlueScreen
// @description Sinisterly On Rails - A black variant of Sinisterly, edited from Sinisterly in Blue.
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
    'background: rgb(124, 124, 124);' +
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
    'background: rgb(124, 124, 124);' +
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
    'background: transparent url(http://i.imgur.com/gdoKBHI.png) 0px -2px repeat;' +
    'color: white;' +
    'text-decoration: none;' +
    'box-shadow: 0 0 3px #000 inset;}' +
    '.glow {' +
    'background:url(http://i.imgur.com/TtczGXv.png) repeat-x top;' +
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
    'background: url(http://i.imgur.com/JuYH0Sg.png) 0px -2px repeat-x;'
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
    'background:url(http://i.imgur.com/65yPiGZ.png) no-repeat;' +
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
    'background:url(http://i.imgur.com/6gP1myU.png) no-repeat;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    'a:hover, a:active {' +
    'color: #7C7C7C;' +
    'text-decoration: none;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.bigbutton {' +
    'background: rgb(124, 124, 124) url(https://www.sinister.ly/images/e-red/highlight_faint.png) repeat-x top;' +
    'padding: 8px 12px;' +
    'border-radius: 3px;' +
    'border: 1px solid rgb(71, 71, 71);' +
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
    'background-color: rgb(66, 66, 66);' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);


var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
    '.usertabs {' +
    'background: url(http://i.imgur.com/JuYH0Sg.png) 0px -2px repeat-x;' +
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
    'background: #6d6d6d;' +
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
    'background: #6d6d6d;' +
    'color: #fff;' +
    'box-shadow: inset 0px -1px 5px rgba(0, 0, 0, 0.7);' +
    'border-radius: 2px;' +
    
    'text-decoration: none;' +
    '}';
document.getElementsByTagName("HEAD")[0].appendChild(link);


    var tags = document.getElementsByTagName('img');
for (var i = 0; i < tags.length; i++) {
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/announcements.png', 'http://i.imgur.com/5m09Jdk.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/introductions.png', 'http://i.imgur.com/QkYcTS5.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/world_news.png', 'http://i.imgur.com/Cbz1HUu.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/the_lounge.png', 'http://i.imgur.com/Xl3Yqik.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/anime_manga.png', 'http://i.imgur.com/u0XWroy.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/elite_lounge.png', 'http://i.imgur.com/yZ3ziws.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/giveaways_freebies.png', 'http://i.imgur.com/cF9NtFN.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/nsfw.png', 'http://i.imgur.com/En12XUi.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/advanced.png', 'http://i.imgur.com/k8BEbQs.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/tutorials.png', 'http://i.imgur.com/uTMLTRK.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/tools.png', 'http://i.imgur.com/AlSB1g0.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/network.png', 'http://i.imgur.com/oT5MShz.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/website.png', 'http://i.imgur.com/ufWBrQ1.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/remote_admin_stress_testing.png', 'http://i.imgur.com/jHUD8rJ.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/social_engineering.png', 'http://i.imgur.com/4yavtKF.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/operating_systems.png', 'http://i.imgur.com/BY2NIGV.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/software_programs.png', 'http://i.imgur.com/pYETp2c.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/virtual_machines.png', 'http://i.imgur.com/cPNIh2f.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/hardware_customization.png', 'http://i.imgur.com/VD2tds9.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/mobile_tablets.png', 'http://i.imgur.com/DeCUwpr.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/networking.png', 'http://i.imgur.com/L5fro56.png');    
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/antivirus_protection.png', 'http://i.imgur.com/CkUWXs9.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/coding.png', 'http://i.imgur.com/7eqzosj.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/visual_basic_net_framework.png', 'http://i.imgur.com/rkDiQis.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/c_cpp_obj_c.png', 'http://i.imgur.com/v1ycWon.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/java_jvm_jre.png', 'http://i.imgur.com/Hz9mvcm.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/php.png', 'http://i.imgur.com/3F8fuFR.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/python.png', 'http://i.imgur.com/91iWAEP.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/tutorials_.png', 'http://i.imgur.com/sfBzDne.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/resources.png', 'http://i.imgur.com/J5lAyc2.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/graphic_design.png', 'http://i.imgur.com/hnTmQ03.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/video_design.png', 'http://i.imgur.com/YxaBseu.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/battles.png', 'http://i.imgur.com/EOYWeAv.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/feedback.png', 'http://i.imgur.com/xH7eDSf.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/web_design.png', 'http://i.imgur.com/BinnVBx.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/cross_platform.png', 'http://i.imgur.com/8hcdy9Q.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/microsoft_consoles.png', 'http://i.imgur.com/1Uv3w9K.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/nintendo_consoles.png', 'http://i.imgur.com/9uSJFRW.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/sony_consoles.png', 'http://i.imgur.com/uEGOBhM.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/pc_gaming.png', 'http://i.imgur.com/8wvrEHN.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/emulation.png', 'http://i.imgur.com/FXa3AfN.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/ebooks.png', 'http://i.imgur.com/Im9T0Ye.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/music.png', 'http://i.imgur.com/7Eujq9R.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/movies_tv.png', 'http://i.imgur.com/YhTZa2V.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/programs.png', 'http://i.imgur.com/MCASGm9.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/games.png', 'http://i.imgur.com/j6RTAjB.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/accounts.png', 'http://i.imgur.com/0L4giNu.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/requests.png', 'http://i.imgur.com/yszj7pm.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/market_discussion.png', 'http://i.imgur.com/ABBZ8Jk.png');
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/monetizing.png', 'http://i.imgur.com/2jpH80j.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/regular_sales.png', 'http://i.imgur.com/nxAGUlN.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/premium_sales.png', 'http://i.imgur.com/hNOJjPE.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/traders_area.png', 'http://i.imgur.com/Jy5VQcf.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/buyers_area.png', 'http://i.imgur.com/WwLyrXH.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/deals_bargains.png', 'http://i.imgur.com/14LVap7.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/scam_reports.png', 'http://i.imgur.com/VSRDqi1.png'); 
    tags[i].src = tags[i].src.replace('https://www.sinister.ly/uploads/ficons/group_discussion.png', 'http://i.imgur.com/l8a5mgL.png');     
    
        tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/announcements.png', 'http://i.imgur.com/5m09Jdk.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/introductions.png', 'http://i.imgur.com/QkYcTS5.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/world_news.png', 'http://i.imgur.com/Cbz1HUu.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/the_lounge.png', 'http://i.imgur.com/Xl3Yqik.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/anime_manga.png', 'http://i.imgur.com/u0XWroy.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/elite_lounge.png', 'http://i.imgur.com/yZ3ziws.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/giveaways_freebies.png', 'http://i.imgur.com/cF9NtFN.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/nsfw.png', 'http://i.imgur.com/En12XUi.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/advanced.png', 'http://i.imgur.com/k8BEbQs.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/tutorials.png', 'http://i.imgur.com/uTMLTRK.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/tools.png', 'http://i.imgur.com/AlSB1g0.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/network.png', 'http://i.imgur.com/oT5MShz.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/website.png', 'http://i.imgur.com/ufWBrQ1.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/remote_admin_stress_testing.png', 'http://i.imgur.com/jHUD8rJ.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/social_engineering.png', 'http://i.imgur.com/4yavtKF.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/operating_systems.png', 'http://i.imgur.com/BY2NIGV.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/software_programs.png', 'http://i.imgur.com/pYETp2c.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/virtual_machines.png', 'http://i.imgur.com/cPNIh2f.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/hardware_customization.png', 'http://i.imgur.com/VD2tds9.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/mobile_tablets.png', 'http://i.imgur.com/DeCUwpr.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/networking.png', 'http://i.imgur.com/L5fro56.png');    
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/antivirus_protection.png', 'http://i.imgur.com/CkUWXs9.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/coding.png', 'http://i.imgur.com/7eqzosj.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/visual_basic_net_framework.png', 'http://i.imgur.com/rkDiQis.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/c_cpp_obj_c.png', 'http://i.imgur.com/v1ycWon.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/java_jvm_jre.png', 'http://i.imgur.com/Hz9mvcm.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/php.png', 'http://i.imgur.com/3F8fuFR.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/python.png', 'http://i.imgur.com/91iWAEP.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/tutorials_.png', 'http://i.imgur.com/sfBzDne.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/resources.png', 'http://i.imgur.com/J5lAyc2.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/graphic_design.png', 'http://i.imgur.com/hnTmQ03.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/video_design.png', 'http://i.imgur.com/YxaBseu.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/battles.png', 'http://i.imgur.com/EOYWeAv.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/feedback.png', 'http://i.imgur.com/xH7eDSf.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/web_design.png', 'http://i.imgur.com/BinnVBx.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/cross_platform.png', 'http://i.imgur.com/8hcdy9Q.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/microsoft_consoles.png', 'http://i.imgur.com/1Uv3w9K.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/nintendo_consoles.png', 'http://i.imgur.com/9uSJFRW.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/sony_consoles.png', 'http://i.imgur.com/uEGOBhM.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/pc_gaming.png', 'http://i.imgur.com/8wvrEHN.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/emulation.png', 'http://i.imgur.com/FXa3AfN.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/ebooks.png', 'http://i.imgur.com/Im9T0Ye.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/music.png', 'http://i.imgur.com/7Eujq9R.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/movies_tv.png', 'http://i.imgur.com/YhTZa2V.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/programs.png', 'http://i.imgur.com/MCASGm9.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/games.png', 'http://i.imgur.com/j6RTAjB.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/accounts.png', 'http://i.imgur.com/0L4giNu.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/requests.png', 'http://i.imgur.com/yszj7pm.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/market_discussion.png', 'http://i.imgur.com/ABBZ8Jk.png');
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/monetizing.png', 'http://i.imgur.com/2jpH80j.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/regular_sales.png', 'http://i.imgur.com/nxAGUlN.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/premium_sales.png', 'http://i.imgur.com/hNOJjPE.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/traders_area.png', 'http://i.imgur.com/Jy5VQcf.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/buyers_area.png', 'http://i.imgur.com/WwLyrXH.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/deals_bargains.png', 'http://i.imgur.com/14LVap7.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/scam_reports.png', 'http://i.imgur.com/VSRDqi1.png'); 
    tags[i].src = tags[i].src.replace('https://sinister.ly/uploads/ficons/group_discussion.png', 'http://i.imgur.com/l8a5mgL.png');     
    
}