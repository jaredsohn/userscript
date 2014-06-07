// ==UserScript==
// @name           r7zkp3m
// @namespace      p3
// @include        http://*.zarenkriege.de/*
// ==/UserScript==

//Refresh
var tmp=document.createElement('script');
tmp.type="text/javascript";
tmp.src="http://p3realm.ath.cx/u/zk/refresh.js";
document.getElementsByTagName('head')[0].appendChild(tmp);

//JS
if(document.getElementById("map")==undefined && document.getElementById("heroPoints")==undefined && document.getElementById("VerteidigerInfo")==undefined){
	var tmp=document.createElement('script');
	tmp.type="text/javascript";
	tmp.src="http://p3realm.ath.cx/u/zk/custom_boxover.js";
	document.getElementsByTagName('head')[0].appendChild(tmp);
}
else{
	var tmp=document.createElement('script');
	tmp.type="text/javascript";
	tmp.src="http://p3realm.ath.cx/u/zk/boxover.js";
	document.getElementsByTagName('head')[0].appendChild(tmp);
}

var tmp=document.getElementById("underAttackNotice");
if(tmp!=undefined){
	tmp.innerHTML="<a href='pohod.php'><big>You getting dafted!</big></a>";
}


//CSS
var css = new Array();

function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}


// Define your CSS here
addStyle("body {background: #0E1418;}")
addStyle("#pageBody {background: #1A242D}")
addStyle("#header {height: 145px;background:url(http://r7l4d.ath.cx/ri7za/zare/header.png); position: relative;margin-left:13px;width:903px;}");
addStyle("#header .logo {width: 226px;height: 0px;position: absolute;top: 0;left: 349px;text-indent: -9999px;}");
addStyle("#header #logo-de {}");
addStyle("#header ul#secondaryNav {position: absolute;height: 59px;list-style: none;left: 602px;top: 40px;}");
addStyle("#header #userBlock {position: absolute;top: 40px;left: 349px;width: 200px;height: 77px;padding: 0 13px;}");
addStyle("#header #underAttackNotice {position: absolute;top: 43px;left: 358px;}");
addStyle("#header .logo a.logoLink {height:0px;}");
addStyle("#changeCastle {position: absolute;width: 199px;left: 24px;top: 114px;z-index: 99;}");
addStyle("#changeCastle .currentCastle {width: 199px;height: 26px;padding: 0px 0 0 25px;background:none;cursor: pointer;}");
addStyle("#changeCastle dl#castlesList {left:0px;width:199px;top:28px;");
addStyle("#changeCastle dl#castlesList dd{border:1px solid #3B3E3F;left:0px;top:28px;");
addStyle("#changeCastle dl#castlesList dd a:hover big, #changeCastle dl#castlesList dd a:hover small {color:#C37D18;}");
addStyle("#changeCastle dl#castlesList dd.capital{width:182px;background:#0F1519 url(http://r7l4d.ath.cx/ri7za/zare/crown.gif);background-repeat:no-repeat;}");
addStyle("#header ul#mainNav {position: absolute;height: 59px;list-style: none;left: 18px;top: 40px;}");
addStyle("#scroll {height: 17px;border: 1px solid #BF8247;margin: 0 160px 5px 229px;display:none;}");
addStyle("#serverTime {position:relative;float: right;color: #ddae81;width: 140px;height: 19px;line-height: 19px;text-align: right;background: #996636;padding: 0 5px;z-index:100;}");
addStyle("#header #resources ul{z-index:500;position: absolute;height:30px;top:12px;left:50px;width:700px;}");
addStyle("#header #resources ul li {width:85px;float: left;height: 22px;padding-top: 3px;padding-left:15px;font-size: 11px;font-weight: bold;color: #fff;margin: 0 0px 0 0;}");
addStyle("#header #resources ul li span {padding-left:15px;}");
addStyle("a.registerCenter {top: 45px;}");
addStyle("#changeLanguage {left:10px;top: 45px;}");
addStyle("#header #mainMenu-1 {width:auto;margin-left:7px;top: 7px;}");
addStyle("#header #mainMenu-2 {position:absolute;width:auto;right:7px;top: 7px;}");
addStyle("#header a#adviserLink{height:20px;right:270px;width:60px;top:27px;}");
addStyle("#header a.adviserNormal {background:none;}");
addStyle("#header a#adviserLink span {height:auto;}");
addStyle("#header ul.mainMenu li a span {background:#2B3135;border:1px solid black;margin-left:-4px;}");
//p3mod
addStyle("#captchaTime{top:0px;left:250px;}");
addStyle("#voteGame {position: absolute;line-height: 14px;font-size: 9px;font-weight: bold;top: 0px;left:210px;z-index: 10;width:50px;}");
addStyle("#header #resources ul li.gold {font-size: 11px; background:none;background: url(http://p3realm.ath.cx/u/zk/res_gold.png);background-repeat: no-repeat;}");
addStyle("#header #resources ul li.iron {font-size: 11px; background:none;background: url(http://p3realm.ath.cx/u/zk/res_iron.png);background-repeat: no-repeat;}");
addStyle("#header #resources ul li.wood {font-size: 11px; background:none;background: url(http://p3realm.ath.cx/u/zk/res_wood.png);background-repeat: no-repeat;}");
addStyle("#header #resources ul li.food {font-size: 11px; background:none;background: url(http://p3realm.ath.cx/u/zk/res_food.png);background-repeat: no-repeat;}");
addStyle("#header #resources ul li.population {font-size: 11px; background:none;background: url(http://p3realm.ath.cx/u/zk/res_population.png);background-repeat: no-repeat;}");
addStyle("#header #resources ul li.coins {font-size: 11px; background:none;background: url(http://p3realm.ath.cx/u/zk/res_coins.png);background-repeat: no-repeat;}}");
addStyle("#buyResources {display:none;}");
addStyle("#overview .wall {background-image: url(http://p3realm.ath.cx/u/zk/bknd_2.jpg);}");
addStyle("a.showMenu {background-image: url(http://p3realm.ath.cx/u/zk/hotlinks_show.gif);}");
addStyle(".pageSubnav h2 {background-image: url(http://p3realm.ath.cx/u/zk/title_small_bknd.gif);}");
addStyle("#footer #partners,#footer a {display: none;}");
addStyle("#footer {color: #0e1418; background-image: url(http://p3realm.ath.cx/u/zk/footer_bknd.png);}");
addStyle("#content h2 {background-image: url(http://p3realm.ath.cx/u/zk/title_bknd.jpg);}");
addStyle("#content .box {border-color:#141d26; background-image: url(http://p3realm.ath.cx/u/zk/box_bknd.jpg); background-repeat:no-repeat;background-color: #30445c;}");
addStyle(".buttonrow {background-color: #1a242d;}");
addStyle("#buildingsQueue .queueBuilding {background-image: url(http://p3realm.ath.cx/u/zk/buildqueue_box_left.gif);}");
addStyle("#buildingsQueue .queueBuilding .wrapper {background-image: url(http://p3realm.ath.cx/u/zk/buildqueue_box_right.gif);}");
addStyle("#buildingsQueue .queueBuilding a.finishBuilding {color: white; background-image: url(http://p3realm.ath.cx/u/zk/buildingqueue_finish_left.gif);}");
addStyle("#buildingsQueue .queueBuilding a.finishBuilding span {background-image: url(http://p3realm.ath.cx/u/zk/buildingqueue_finish_right.gif);}");
addStyle("#content h2 {background-image: url(http://p3realm.ath.cx/u/zk/title_bknd.jpg);}");
addStyle("#hotlinksMenu .wrapper {background-image: url(http://p3realm.ath.cx/u/zk/hotlinks_bottom.gif);}");
addStyle("#hotlinksMenu {background: url('http://p3realm.ath.cx/u/zk/hotlinks_top.gif') no-repeat;}");
addStyle("#hotlinksMenu ul {background: #3c526a;}");
addStyle("#hotlinksMenu ul li {border-bottom: 0;}");
addStyle("#hotlinksMenu ul li a {color: white;}");
addStyle("#buildingsQueue .queueBuilding .info span.timeLeft {background: none; background-color: none;}");
addStyle("#buildingsQueue .queueBuilding .info strong {color: #d9b490;}");
addStyle("#buildingsQueue .queueBuilding .info {color: white;}"); //d9b490..... 7cb0ff
addStyle("#hotlinksMenu span.title, #hotlinksMenu a.hideMenu {color: #d9b490;}");
addStyle(".buttonrow input, .buttonrow button {border: 1px solid #7cb0ff; background-image: url(http://p3realm.ath.cx/u/zk/submit_bknd.jpg);}");
addStyle(".pageSubnav ul.menu li a {background-image: url(http://p3realm.ath.cx/u/zk/leftmenu_bullet.gif);}");
addStyle(".pageSubnav ul.menu li.vipItem a {border: 0;background-image: url(http://p3realm.ath.cx/u/zk/leftmenu_vipitem.jpg);}");
addStyle("#resourceBars .row .resourceBar {background-image: url(http://p3realm.ath.cx/u/zk/bar_base_left.gif);}");
addStyle("#resourceBars .row .resourceBar .wrapper {background-image: url(http://p3realm.ath.cx/u/zk/bar_base_right.gif);}");
addStyle("#resourceBars .row .resourceBar .barFull span small {background-color: #233343;}");
addStyle("#resourceBars .row .details small.training {background-color: #1a242d; color:#d9b490;}");
addStyle("#header #underAttackNotice a {background-image: none;margin-top: 50px; width: 250px; height: 20px;}");
addStyle("#header #underAttackNotice a big {font-size: 16px; color: #ce1b1b;height:20px;}");
addStyle("#voteGame a {background-image: url(http://p3realm.ath.cx/u/zk/header_vote.png);}");
addStyle("#serverTime {display:none;}");
addStyle(".pageSubnav ul.menu li a:hover {background-color: #273644;}");
addStyle("#buildingsQueue .queueBuilding .info span.timeLeft a.cancel {background-image: url(http://p3realm.ath.cx/u/zk/buildingqueue_cancel.gif);}");
addStyle("#resourceBars .row .resourceBar .barCache {opacity: 0.3;}");
addStyle("#resTimes #timeGold {background-image: url(http://p3realm.ath.cx/u/zk/time_gold.png);}");
addStyle("#resTimes #timeIron {background-image: url(http://p3realm.ath.cx/u/zk/time_iron.png);}");
addStyle("#resTimes #timeFood {background-image: url(http://p3realm.ath.cx/u/zk/time_food.png);}");
addStyle("#resTimes #timeWood {background-image: url(http://p3realm.ath.cx/u/zk/time_wood.png);}");
addStyle("#resTimes .timeItem big {font-size: 10px;}");
addStyle("#resTimes .timeItem small {font-size: 12px;margin-top: 8px;}");
addStyle(".box table thead tr td {background: #1a242d;}");
addStyle(".box table tbody tr td.special {background-color: transparent; border-bottom: 1px solid #c9a786;}");
addStyle(".box table tbody tr td input {background-color: #2b3c4b; border: 1px solid #1a242d;}");
addStyle(".formbox .row .right input, .formbox .row .right textarea, .formbox .row .right select {background-color: #2b3c4b; border: 1px solid #1a242d;}");
addStyle("h2 .marchesFilter select {background-color: #2b3c4b; border: 1px solid #1a242d;}");
addStyle(".formbox .highlight {background-color: transparent;}");
addStyle(".formbox .highlight .right a.motivationOptions {color: white;background-color: #2b3c4b; border: 1px solid #1a242d;}");
addStyle(".pageSubnav ul.buttons li.barracks a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_barracks.png);}");
addStyle(".pageSubnav ul.buttons li.armyorder a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_armyorder.png);}");
addStyle(".pageSubnav ul.buttons li.marches a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_marches.png);}");
addStyle(".pageSubnav ul.buttons li.stables a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_stables.png);}");
addStyle(".pageSubnav ul.buttons li.workshop a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_workshop.png);}");
addStyle(".pageSubnav ul.buttons li.order a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_order.png);}");
addStyle(".pageSubnav ul.buttons li.blacksmith a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_blacksmith.png);}");
addStyle(".pageSubnav ul.buttons li.simulator a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_simulator.png);}");
addStyle(".pageSubnav ul.buttons li.reports a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_reports.png);}");
addStyle(".pageSubnav ul.buttons li a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_default.png); color: white;}");
addStyle(".pageSubnav ul.buttons li a:hover {color: #d09b69;}");
addStyle(".messageWrapper .userDetails .avatar {border: 1px solid white;}");
addStyle("#smallMapWrapper #gotoCoords {color: white; background-image: url(http://p3realm.ath.cx/u/zk/block_bknd.gif);}");
addStyle("#smallMapWrapper #gotoCoords .field {background-color: #2b3c4b;}");
addStyle("#buildingsQueue span.totalTime {display:none;}");
addStyle("#overview .map .confirmMessage {background-color:#181c1d;background-image: url(http://p3realm.ath.cx/u/zk/buildingdialog_bknd.jpg);}");
addStyle("#overview .map .confirmMessage .buildingText {background-color: #181c1d;}");
addStyle(".confirmMessage .buildingDetails .buildingTitle span.buildingLevel {background-color: #181c1d;}");
addStyle("#overview .map .confirmMessage .buildingSlider .slider .handle{background-image: url(http://p3realm.ath.cx/u/zk/buildingdialog_handle.gif);}");
addStyle("#overview .map .confirmMessage .buildingSlider .sliderOptions a.sliderSave {color: #d9b490; background-image: url(http://p3realm.ath.cx/u/zk/buildingdialog_saveslider.gif);}");
addStyle("#overview .map .confirmMessage .buildingText a.buildLevel{color: #d9b490; background-image: url(http://p3realm.ath.cx/u/zk/buildingdialog_buildlevel.gif);}");
addStyle("#overview .map .confirmMessage .buildingSlider {background-image: url(http://p3realm.ath.cx/u/zk/buildingdialog_slider.gif);}");
addStyle("#overview .map .confirmMessage a.closeDialog{background-image: url(http://p3realm.ath.cx/u/zk/buildingdialog_close.gif);}");
addStyle("#overview .map .confirmMessage {border: 1px solid white;}");
addStyle("tr.highlight td {background-color: #23313d;}");
addStyle("#voteButtons input, #voteButtons button{border: 1px solid #7cb0ff; background-image: url(http://p3realm.ath.cx/u/zk/submit_bknd.jpg);}");
addStyle(".confirmMessage .buildingDetails .buildingTitle span.buildingLevel{color: #d9b490;}");
addStyle("#overview .map .confirmMessage .buildingSlider .sliderOptions ul li small {color: #d9b490;}");
addStyle(".confirmMessage .buildingDetails .buildingTitle{border-bottom: 1px solid #d9b490;}");
addStyle("#header ul.mainMenu li a span{color: #d9b490; }");
addStyle(".pageSubnav ul.menu li a {color: #d9b490;}");
addStyle(".pageSubnav ul.menu li.vipItem a {color: #d9b490;}");
addStyle("#header #userBlock .details .bar span.full {background-image: url(http://p3realm.ath.cx/u/zk/header_user_bar.gif);}");
addStyle("#overview .map .confirmMessage .buildingText{background-color: #eee8e2;}");
addStyle(".largeMapFrame {background-image: url(http://p3realm.ath.cx/u/zk/largemap_frame.jpg);}");
addStyle("#smallMapWrapper #gotoCoords a.gotoButton{background-image: url(http://p3realm.ath.cx/u/zk/gotocoords.gif);}");
addStyle(".navBar span{background-image:none;}");
addStyle("#smallMapWrapper .smallMapNav a.navLeft {background-image: url(http://p3realm.ath.cx/u/zk/smallmap_goleft.gif);}");
addStyle("#smallMapWrapper .smallMapNav a.navUp {background-image: url(http://p3realm.ath.cx/u/zk/smallmap_goup.gif);}");
addStyle("#smallMapWrapper .smallMapNav a.navDown {background-image: url(http://p3realm.ath.cx/u/zk/smallmap_godown.gif);}");
addStyle("#smallMapWrapper .smallMapNav a.navRight {background-image: url(http://p3realm.ath.cx/u/zk/smallmap_goright.gif);}");
addStyle(".formbox .row .left, .formbox .row label {color:#d9b490;}");
addStyle("#buildingsList .buildingItem .buildingPreview span.buildingTime, #unitsList .unitItem .unitPreview span.unitTime, #skillsList .skillItem .skillPreview span.skillLevel{background-color: #2b3c4b;}");
addStyle("#buildingsList .activeBuilding .title, #unitsList .activeUnit .title, #skillsList .activeSkill .title {background-image: url(http://p3realm.ath.cx/u/zk/building_active_title.gif);}");
addStyle("#buildingsList .activeBuilding ul.neededResources, #unitsList .activeUnit ul.neededResources {background-image: url(http://p3realm.ath.cx/u/zk/building_active_res.gif);}");
addStyle("h2 a.chatHistory {background-image:none;background-color: #23313d;}");
addStyle("#deleteMessages a {border: 1px solid #7cb0ff;background-image: url(http://p3realm.ath.cx/u/zk/submit_bknd.jpg);}");
addStyle("#buildingsList .activeBuilding .action, #unitsList .activeUnit .action, #skillsList .activeSkill .action {background-image: url(http://p3realm.ath.cx/u/zk/building_active_action.gif);}");
addStyle("#unitsList .activeUnit .action input, #unitsList .activeUnit .action select {background-color: #2b3c4b; border: 1px solid #1a242d;}");
addStyle("#buildingsList .inactiveBuilding .error, #unitsList .inactiveUnit .error, #skillsList .inactiveSkill .error {background-image: url(http://p3realm.ath.cx/u/zk/building_inactive_error.gif);}");
addStyle("#buildingsList .buildingItem .buildingPreview, #unitsList .unitItem .unitPreview, #skillsList .skillItem .skillPreview {border:0;}");
addStyle("#buildingsList .buildingItem .title span.buildingLevel, #unitsList .unitItem .title span.unitLevel, #skillsList .skillItem .title span.skillLevel {text-align: right; margin-right: 5px; font-size: 10px;}");
addStyle("#buildingsList .inactiveBuilding .title, #unitsList .inactiveUnit .title, #skillsList .inactiveSkill .title {background-image: url(http://p3realm.ath.cx/u/zk/building_inactive_title.gif);}");
addStyle("#skillsRevertInfo {background-image: none;}");
addStyle(".paging {background-color: #2b3c4b;border: 1px solid #1a242d;}");
addStyle(".box table tbody tr td select {background-color: #2b3c4b;border: 1px solid #1a242d;}");
addStyle("#playerDetails .playerItem .title{background-color: #2b3c4b;border: 1px solid #1a242d;background-image: url(http://p3realm.ath.cx/u/zk/plinfo_title.jpg);}");
addStyle("#playerDetails .playerItem .playerSkills table thead tr td {background-color: #2b3c4b;}");
addStyle("#playerDetails .playerItem .playerSkills table tbody tr td {background-image: url(http://p3realm.ath.cx/u/zk/plinfo_skill_row.jpg);}");
addStyle("#playerDetails .playerItem .playerSkills table tbody tr td.special {background-image: url(http://p3realm.ath.cx/u/zk/plinfo_skill_row2.jpg);}");
addStyle(".contentReport h2 a.saveReport {background-color: #2b3c4b;background-image:none;}");
addStyle(".contentReport h2 a.viewAnalysis {background-color: #2b3c4b;background-image:none;}");
addStyle(".pageSubnav ul.folders li.active {background-color: #2b3c4b;background-image:none;border: 1px solid #1a242d;}");
addStyle("#buildingsList .buildingItem ul.neededResources li.neededGold, #unitsList .unitItem ul.neededResources li.neededGold {}");
addStyle(".pageSubnav ul.buttons li.skills a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_skills.png);}");
addStyle(".pageSubnav ul.buttons li.dynasty a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_dynasty.png);}");
addStyle(".pageSubnav ul.buttons li.friends a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_friends.png);}");
addStyle(".pageSubnav ul.buttons li.notes a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_notes.png);}");
addStyle(".pageSubnav ul.buttons li.recruit a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_recruit.png);}");
addStyle(".pageSubnav ul.buttons li.signature a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_signature.png);}");
addStyle("#buyCoinsTeaser a{display:none;}");
addStyle(".pageSubnav ul.buttons li.coins a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_coins.png);}");
addStyle(".pageSubnav ul.buttons li.vip a {background-image: url(http://p3realm.ath.cx/u/zk/leftbutton_vip.png);}");
addStyle("table#servicesTable tbody tr td a.activateLink {background-color: #3c4751; color: white;border: 1px solid #1a242d; background-image: url(http://p3realm.ath.cx/u/zk/services_link.gif);}");
addStyle(".pageSubnav ul.folders li.personal a {background-image: url(http://p3realm.ath.cx/u/zk/folder_personal.gif);}");
addStyle(".pageSubnav ul.folders li.marches a {background-image: url(http://p3realm.ath.cx/u/zk/folder_marches.gif);}");
addStyle(".pageSubnav ul.folders li.market a {background-image: url(http://p3realm.ath.cx/u/zk/folder_market.gif);}");
addStyle(".pageSubnav ul.folders li.news a {background-image: url(http://p3realm.ath.cx/u/zk/folder_news.gif);}");
addStyle(".pageSubnav ul.folders li.reports a {background-image: url(http://p3realm.ath.cx/u/zk/folder_reports.gif);}");
addStyle(".pageSubnav ul.folders li.sent a {background-image: url(http://p3realm.ath.cx/u/zk/folder_sent.gif);}");
addStyle(".pageSubnav ul.folders li.spy a {background-image: url(http://p3realm.ath.cx/u/zk/folder_spy.gif);}");
addStyle(".pageSubnav ul.folders li.writeNew a {background-image: url(http://p3realm.ath.cx/u/zk/folder_writenew.png);}");
addStyle("h2 a.fromUser {background-image: none;padding-left: 0px;}");
addStyle("h2 span.status {background-color: #2b3c4b;}");
addStyle("#buildingsList .buildingItem ul.neededResources li.neededGold, #unitsList .unitItem ul.neededResources li.neededGold ,#upgradesList .upgradeDetails .upgradeType ul.upgradeResources li.resGold{background-image: url(http://p3realm.ath.cx/u/zk/res_ico_gold.gif);}");
addStyle("#buildingsList .buildingItem ul.neededResources li.neededGold, #unitsList .unitItem ul.neededResources li.neededWood ,#upgradesList .upgradeDetails .upgradeType ul.upgradeResources li.resWood{background-image: url(http://p3realm.ath.cx/u/zk/res_ico_wood.gif);}");
addStyle("#buildingsList .buildingItem ul.neededResources li.neededGold, #unitsList .unitItem ul.neededResources li.neededFood ,#upgradesList .upgradeDetails .upgradeType ul.upgradeResources li.resFood{background-image: url(http://p3realm.ath.cx/u/zk/res_ico_food.gif);}");
addStyle("#buildingsList .buildingItem ul.neededResources li.neededGold, #unitsList .unitItem ul.neededResources li.neededIron ,#upgradesList .upgradeDetails .upgradeType ul.upgradeResources li.resIron{background-image: url(http://p3realm.ath.cx/u/zk/res_ico_iron.gif);}");
addStyle("#unitPic-1 {background-image: url(http://p3realm.ath.cx/u/zk/1.jpg);}");
addStyle("#unitPic-2 {background-image: url(http://p3realm.ath.cx/u/zk/2.jpg);}");
addStyle("#unitPic-3 {background-image: url(http://p3realm.ath.cx/u/zk/3.jpg);}");
addStyle("#unitPic-4 {background-image: url(http://p3realm.ath.cx/u/zk/4.jpg);}");
addStyle("#unitPic-11 {background-image: url(http://p3realm.ath.cx/u/zk/11.jpg);}");
addStyle("#unitPic-12 {background-image: url(http://p3realm.ath.cx/u/zk/12.jpg);}");
addStyle("#unitPic-13 {background-image: url(http://p3realm.ath.cx/u/zk/13.jpg);}");
addStyle("#unitPic-14 {background-image: url(http://p3realm.ath.cx/u/zk/14.jpg);}");
addStyle("#unitPic-16 {background-image: url(http://p3realm.ath.cx/u/zk/16.jpg);}");
addStyle("#unitPic-17 {background-image: url(http://p3realm.ath.cx/u/zk/17.jpg);}");
addStyle("#unitPic-18 {background-image: url(http://p3realm.ath.cx/u/zk/18.jpg);}");
addStyle("#unitPic-19 {background-image: url(http://p3realm.ath.cx/u/zk/19.jpg);}");
addStyle("#unitPic-9 {background-image: url(http://p3realm.ath.cx/u/zk/9.jpg);}");
addStyle("#unitPic-10 {background-image: url(http://p3realm.ath.cx/u/zk/10.jpg);}");
addStyle("#upgradesList .upgradeItem {background-image: url(http://p3realm.ath.cx/u/zk/upgrade_box.jpg);}");
addStyle("#upgradesList .upgradeDetails .upgradeAttack {background-image: url(http://p3realm.ath.cx/u/zk/upgrade_attack.jpg);}");
addStyle("#upgradesList .upgradeDetails .upgradeDefence {background-image: url(http://p3realm.ath.cx/u/zk/upgrade_defence.jpg);}");
addStyle("#upgradesList .upgradeItem .unitPreview {background-color: #1a242d;}");
addStyle("#buildingsList .inactiveBuilding ul.neededResources, #unitsList .inactiveUnit ul.neededResources {background-image: url(http://p3realm.ath.cx/u/zk/building_inactive_res.gif);}");
addStyle("#buildingsList .activeBuilding .action, #unitsList .activeUnit .action, #skillsList .activeSkill .action {color: white;}");
addStyle("#buildingsList .buildingItem .buildingPreview, #unitsList .unitItem .unitPreview, #skillsList .skillItem .skillPreview {background-color:#2b3c4b;}");
addStyle("#unitsList .dynastyUnit ul.neededResources input {background-color: #2b3c4b;background-image:none;border: 1px solid #1a242d;}");
addStyle(".playersList .playerItem {background-color: #2b3c4b;}");
addStyle("#playerMessage {background-color: #172533;background-image: url(http://p3realm.ath.cx/u/zk/map_dialogbox.jpg);}");
addStyle("#playerMessage .buttons a span {color: #d9b490;background-color: #2b3c4b;border: 1px solid #1a242d;}");
addStyle("#playerMessage a.closeMessage {background-image: url(http://p3realm.ath.cx/u/zk/map_dialogbox_close.gif);}");
addStyle(".specialUnitsBox {background-color: #172533;}");
addStyle(".specialUnitsBox h4 {background-color: #2b3c4b;}");
addStyle(".round .wall a {background-image: url(http://p3realm.ath.cx/u/zk/kb/unit_wall.jpg);}");
addStyle("#unitPicSmall-1 {background-image: url(http://p3realm.ath.cx/u/zk/kb/1.jpg);}");
addStyle("#unitPicSmall-2 {background-image: url(http://p3realm.ath.cx/u/zk/kb/2.jpg);}");
addStyle("#unitPicSmall-3 {background-image: url(http://p3realm.ath.cx/u/zk/kb/3.jpg);}");
addStyle("#unitPicSmall-4 {background-image: url(http://p3realm.ath.cx/u/zk/kb/4.jpg);}");
addStyle("#unitPicSmall-8 {background-image: url(http://p3realm.ath.cx/u/zk/kb/8.jpg);}");
addStyle("#unitPicSmall-9 {background-image: url(http://p3realm.ath.cx/u/zk/kb/9.jpg);}");
addStyle("#unitPicSmall-10 {background-image: url(http://p3realm.ath.cx/u/zk/kb/10.jpg);}");
addStyle("#unitPicSmall-11 {background-image: url(http://p3realm.ath.cx/u/zk/kb/11.jpg);}");
addStyle("#unitPicSmall-16 {background-image: url(http://p3realm.ath.cx/u/zk/kb/16.jpg);}");
addStyle("#unitPicSmall-17 {background-image: url(http://p3realm.ath.cx/u/zk/kb/17.jpg);}");
addStyle("#unitPicSmall-18 {background-image: url(http://p3realm.ath.cx/u/zk/kb/18.jpg);}");
addStyle(".armySpacer {background-image: url(http://p3realm.ath.cx/u/zk/kb/army_spacer.jpg);}");



// Writes CSS to the document
writeStyle(css);