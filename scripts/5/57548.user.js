// ==UserScript==
// @name            Транспортировка InterCity (Ikariam InterCity Trading)
// @namespace       userscripts.org
// @author          empty_soul (перевод на Русский язык by Vit'OS hakergtr@yandex.ru)
// @description     Добавляет кнопки в транспортирвки товаров, войск в левой панели.
// @homepage        http://userscripts.org/scripts/show/54649
// @homepage        http://ika-info.ucoz.ru
// @version         2.6
// @description     Добавляет кнопки в транспортирвки товаров, войск в левой панели.
// @history         2.6 Moved the resource icons to add more room for city names, added version number
// @history         2.5.1 Fixed minor bug of trading block appearing on options page: Thanks again "hockey guy"
// @history         2.5 Added to ability to manually check for updates to the script & resource icons to the cities
// @history         2.3 Added German Translations: Thank you "simon.thesorcerer"
// @history         2.2.2 Updated French Translations: Thank you "Phenix"
// @history         2.2.1 Im sorry for anyone who got the bad 2.3 update, I accidentally update uso with partially finished work
// @history         2.2 Fixed the window shading, now carries across page loads, fixing Bug found by "nyliferocks". Also started on translations.
// @history         2.1 Changed include line and added "militaryAdvisorDetailedReportView" exclude line to fix Bug found by "hockey guy"
// @history         2.0 Complete Code Rework with IkaTools, fixed city links: they link with correct resrouces, cleared some old version history
// @history         1.0 Added new autoupdate script, script exec timer [TODO: fix city links]
// @history         0.3 Expanding capabilities of intercity trading to include deploying troops and ships, added pictures instead of text for links
// @history         0.2 Added ability to shade the trading menu, to save sidebar space
// @history         0.1 Релиз скрипта
// @include         http://s*.ikariam.*/*
// @exclude         http://s*.ikariam.*/*view=militaryAdvisorDetailedReportView*
// @exclude         http://s*.ikariam.*/*view=options*
// @exclude         http://s*.ikariam.*/*view=highscore*
// @exclude         http://s*.ikariam.*/*view=version*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require         http://ika-info.ucoz.ru/scripts/Script_updater/script_updater.user.js
// @require         http://userscripts.org/scripts/source/57377.user.js
// ==/UserScript==

//NOTICE: I have not gotten this script approved yet, by installing this you are
//using it at your own risk, if you get banned, I'm sorry, but that is not my fault

GM_addStyle(
'.ictPics {height:17px; width:25px; padding: 0px 1px;} \
.ictIcon {background-position:top left; background-repeat:no-repeat; opacity:0.5; filter:alpha(opacity=50);top:-3px; left:-5px; height:12px; width:20px; z-index:0;} \
.clickable:hover {cursor:pointer; text-decoration:underline;} \
.ictCityName {font-weight:bold;} \
.ictCityName div {height:12px; width:135px;} \
.ictCityName div div {position:relative; } \
#ictHeader:hover {cursor:pointer;} \
#shade {display:inline;} \
#ictForceUpdate {font-size:8px;margin-left:5px;}'
);

function A(m) { alert(m); }

function L(m) {
    if(!unsafeWindow.console) {
        GM_log(m);
    } else {
        unsafeWindow.console.log(m);
    }
}

function CE(e) { return document.createElement(e); }

function SV(key, value) { GM_setValue(key, value); }

function GV(key) {
    try {
        return GM_getValue(key);
    } catch(err) {
        L(err.description);
        return null;
    }
}

(function() {

IkaTools.init();

if (!InterTrade) var InterTrade = {};

InterTrade =
{
	init:			{},
	loadLang:               {},
	renderDiv:          	{},
        //insertIcons:            {},
	transportGoods:		{},
	deployTroops:		{},
	stationFleets:		{},
        checkVisible:           {},
	setWindowVisibility:  	{},
	linkCities:		{},
	attachShadeEvent:	{},
	attachCityChangeEvent:	{},
        attachForceUpdate:      {},
        update:             	{},
        jsonParse:              {},

        server:			'',
	locale:                 '',
	tmpID:			'',
	language:               '',
	currentCity:            '',
	cityList:		'',
	config:                 '',
	isVisible:		'',


	StartTime:              0,
	EndTime:	        0,

	usoNum: 		57548,
	curVer:			'2.6',
	downArr:		'\u25bc',
	upArr:			'\u25b2'
}

InterTrade.init = function() {
    this.startTime = new Date().getTime();

    this.server = IkaTools.getDomain();
    var tmp = this.server.split('.');
    this.locale = tmp[2];
    this.language = this.loadLang(this.locale);
    this.currentCity = IkaTools.getCurrentCityId();
    this.cityList = IkaTools.getCities();
    this.renderDiv();
    this.isVisible = this.checkVisible();
    this.setWindowVisibility(this.isVisible);
    this.attachShadeEvent();
    this.attachCityChangeEvent();
    this.attachForceUpdate();
    this.update();

    this.endTime = new Date().getTime();
    L('Exec Time: ' +((InterTrade.endTime - InterTrade.startTime) / 1000) +'s');
}

InterTrade.loadLang = function(loc) {
    switch(loc) {
        case 'com':
        case 'org':
            var en = new Array();
                en['title'] = 'InterCity Trading'
                en['stationFleets'] = 'Station Fleets';
                en['deployTroops'] = 'Deploy Troops';
                en['transportGoods'] = 'Transport Goods';
                en['minePalaceMsg'] = 'Please Visit Your Palace or any Governor\'s Mansion';
				ru['Update'] = 'Update';
            return en;
            break;

        case 'ru':
            var ru = new Array();
                ru['title'] = 'Транспортировка InterCity';
                ru['stationFleets'] = 'Разместить флоты';
                ru['deployTroops'] = 'Разместить войска';
                ru['transportGoods'] = 'Транспортировать товары';
                ru['minePalaceMsg'] = 'Посетите Ваш Дворец или любую Резиденцию Губернатора';
				ru['Update'] = 'Обновить';
            return ru;
		case 'fr':
            var fr = new Array();
                fr['title'] = 'Transport de Marchandises';
                fr['stationFleets'] = 'Stationner des Navires';
                fr['deployTroops'] = 'Deployer l\'Armee';
                fr['transportGoods'] = 'Transporter des Ressources';
                fr['minePalaceMsg'] = 'Merci de visiter votre Palais ou vos Residences des Gouverneurs';
				fr['Update'] = 'Update';
            return fr;

        case 'de':
            var de = new Array();
                de['title'] = 'InterCity Transport';
                de['stationFleets'] = 'Flotten Stationieren';
                de['deployTroops'] = 'Truppen Stationieren';
                de['transportGoods'] = 'Ressourcen Transportieren';
                de['minePalaceMsg'] = 'Bitte Besuchen Sie Ihren Palast oder Einen Statthalter';
				ru['Update'] = 'Update';
            return de;
            break;
    }
}

InterTrade.checkVisible = function() {
    var tmp = GV('isVisible');

    if(tmp == null) {
        tmp = true;
        SV('isVisible', tmp);
        return tmp;
    } else {
        return tmp;
    }
}

InterTrade.setWindowVisibility = function(state) {
    this.checkVisible();

    if(state == false) {
        $('#ictContent').hide();
        $('#shade').text(this.downArr);
        this.isVisible = false;
        SV('isVisible', this.isVisible);
    } else {
        $('#ictContent').show();
        $('#shade').text(this.upArr);
        this.isVisible = true;
        SV('isVisible', this.isVisible);
    }
}

InterTrade.renderDiv = function() {
    var html = '<table id="ictTable"><tbody>';
    var cities = this.cityList.sort();
    var j;

    for(j in cities) {
        var cityInProc = this.cityList[j].id;

        if(this.currentCity != this.cityList[j].id) {
            html += '<tr>';
            //html += '<td>' +this.insertIcons(this.cityList[j].tradegoodType) +'</td>';
            //this.insertIcons(this.cityList[j].tradegoodType);
            html += '<td class="ictCityName clickable"><div>';
            //html += '<div class="ictIcon" style="background-image:url(skin/resources/icon_';
            //html += this.cityList[j].tradegoodType +'.gif);"></div>';
            html += this.linkCities(cityInProc, this.cityList[j].name) +'</div></td>';
            
            html += '<td>' +this.transportGoods(cityInProc) +'</td>';
            html += '<td>' +this.deployTroops(cityInProc) +'</td>';
            html += '<td>' +this.stationFleets(cityInProc) +'</td>';
            html += '</tr>';
        }
    }

    html += '</tbody></table>';
    html += '<div id="ictForceUpdate"><span class="clickable">' +this.language['Update'] +'</span><span style="margin-left:150px;">v' +this.curVer +'</span></div>';

    var content = CE('div');
        content.setAttribute('id', 'ictContent');
        content.innerHTML = html;
    var title = '<span title="' +this.language['title'] +' v' +this.curVer +'" id="ictHeader" class="header"><p id="shade">';

    if(this.isVisible == true) {
        title += this.downArr;
    } else {
        title += this.upArr;
    }

    title += '</p> ' + this.language['title'] + '</span>';

    //Render The Box
    IkaTools.addInfoBox(title, content);
}

InterTrade.transportGoods = function(cityID) {
    var link = '<a href="http://' +this.server;
        link += '/index.php?view=transport&destinationCityId=';
        link += cityID + '" title="' +this.language['transportGoods'] +'">';
        link += '<img src="http://' +this.server +'/skin/actions/transport.gif" class="ictPics" /></a>';

return link;
}

InterTrade.deployTroops = function(cityID) {
    var link = '<a href="http://' +this.server;
        link += '/index.php?view=deployment&deploymentType=army&destinationCityId=';
        link += cityID + '" title="' +this.language['deployTroops'] +'">';
        link += '<img src="http://' +this.server +'/skin/actions/move_army.gif" class="ictPics" /></a>';

return link;
}

InterTrade.stationFleets = function(cityID) {
    var link = '<a href="http://' +this.server;
        link += '/index.php?view=deployment&deploymentType=fleet&destinationCityId=';
        link += cityID +'" title="' +this.language['stationFleets'] +'">';
        link += '<img src="http://' +this.server +'/skin/actions/move_fleet.gif" class="ictPics" /></a>';

return link;
}

/* InterTrade.insertIcons = function(resType) {
    var src = 'http://' +this.server +'/skin/resources/icon_' +resType +'.gif';

    var imgLink = '<img src="' +src +'" class="ictIcons" />';

    return imgLink;
} */

InterTrade.linkCities = function(cityID, linkText) {
    var link = '<div id="' +cityID +'" style="top:-3px; left:5px; z-index:1;">' +linkText +'</div>';

return link;
}

InterTrade.attachShadeEvent = function() {
    $('#ictHeader').click(function() {
        if(InterTrade.isVisible == true) {
            InterTrade.setWindowVisibility(false);
        } else {
            InterTrade.setWindowVisibility(true);
        }
    });
}

InterTrade.attachCityChangeEvent = function() {
    var url = 'http://' +this.server +'/index.php?view=city&id=';

    $('.ictCityName').find('div div:last').each(function(){
        $(this).click(function() {

        var id = $(this).attr('id');
            IkaTools.goTo(url, id);
        });
    });
}

InterTrade.attachForceUpdate = function() {
    $('#ictForceUpdate').css({
        'font-size':'10px',
        'margin-left':'3px',
        'margin-bottom':'-5px'
    });

    $('#ictForceUpdate').click(function() {
        ScriptUpdater.forceNotice(InterTrade.usoNum, InterTrade.curVer);
    });
}

InterTrade.update = function() {
    ScriptUpdater.check(this.usoNum, this.curVer);
}

InterTrade.init();

})();//KEEP