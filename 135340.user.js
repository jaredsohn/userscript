// ==UserScript==
// @name            Ikariam InterCity Trading
// @namespace       userscripts.org
// @author          empty_soul
// @homepage        http://userscripts.org/scripts/show/82805
// @version         5.0a
// @history         5.0a  Fixed for Mobile
// @history         5.0   исправлено отображение времени для сухопутных и морских войск, и отображения города в который плыть.
// @history         4.0b8 bugfix for fresh install not maximized
// @history         4.0b7 NaN shipping time fix, added options page back to excludes
// @history         4.0b6 Attempt at fixing no default values on saved options errors
// @history         4.0b5 Converted options into Phasma's Script Options, accessed via Scripts link
// @history         4.0b4 Fixed bug with minimizing the block across page loads
// @history         4.0b3 Re-Enabled loading time calculators
// @history         4.0b2 Fixed line in saving options, fixed problem resetting on new installs
// @history         4.0b1 Core code rewrites, fixed city change bug and no show bug
// @description     Добавляет кнопки передвижения между городами.
// @include         http://*.ikariam.*/*
// @exclude        http://board.*.ikariam.com*
// @exclude        http://*.ikariam.*/board
// @exclude		   http://support.*.ikariam.*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require         http://userscripts.org/scripts/source/135335.user.js
// @require         http://userscripts.org/scripts/source/135334.user.js
// @require         http://userscripts.org/scripts/source/135337.user.js
// @require         http://userscripts.org/scripts/source/135336.user.js
// ==/UserScript==

//NOTICE: I have not gotten this script approved, by installing this you are using it at your own risk

if(!InterTrade) {var InterTrade;}

InterTrade = {
//Member Data
    curVer:                 '5.0a',
    usoNum:                 82805,
    scriptName:             'InterCity Trading',
    downArr:                '\u25bc',
    upArr:                  '\u25b2',
    prefix:                 'ictConfig.',
    position:               '',
    isVisible:              '',
    simpleView:             '',
    domain:                 '',
    autoLang:               '',
    userLang:               '',
    language:               '',
    currentCity:            '',
    currentCityName:        '',
    currentView:            '',
    cityList:               [],
	events:                 {},
    lastCheck:              0,
    IT:                     IkaTools,
    SU:                     ScriptUpdater,
    CFG:                    Config,
    loadingSpeeds:          [0,30,60,93,129,169,213,261,315,373,437,508,586,672,766,869,983,1108,1246,1398,1565,1748,1950,2172,2416],
//Member Functions
    decTimeConvert: function(time){var hours=parseInt(time/60);time-=(hours*60);var minutes=parseInt(time);time-=minutes;time*=60;var seconds=parseInt(time);return{h:hours,m:minutes,s:seconds};},
    run: function(debug) {
        if(debug === true) {
            unsafeWindow.InterCity = this;
            unsafeWindow.InterCity.init();
        } else {
            this.init();
        }
    },
    init: function() {
        this.IT.init();
        this.IT.addOptionsLink(this.scriptName);
        this.scriptOptionsConfig();

        this.loadCSS();
        this.loadOptions();

        this.currentCity = this.IT.getCurrentCityId();
        this.currentCityName = $('#citySelect option:selected').val();
        this.currentView = this.IT.getView();
        this.cityList = this.IT.getCities();

        this.renderMainBlock();
        this.insertContent();
        this.attachEvents();
        this.enableSimpleView(this.simpleView);
        this.setWindowVisibility(this.isVisible);
        this.SU.check(this.usoNum, this.curVer);
    },
    loadOptions: function(){
        this.domain = document.location.host;
        this.autoLang = this.domain.split('.')[1];

        if(this.CFG.get('userLang') == 'unfound') {
            GM.value.set(this.prefix+'userLang', 'de');
            this.userLang = this.CFG.get('userLang');
        } else {
            this.userLang = this.CFG.get('userLang');
        }

        if(this.autoLang == this.userLang) {
            this.language = this.loadLang(this.autoLang);
        } else {
            this.language = this.loadLang(this.userLang);
        }

        if(GM.value.get('isVisible') === undefined) {
            GM.value.set('isVisible', true);
            this.isVisible = GM.value.get('isVisible');
        } else {
            this.isVisible = GM.value.get('isVisible');
        }

        if(this.CFG.get('position') == 'unfound') {
            GM.value.set(this.prefix+'position', 'top');
            this.position = this.CFG.get('position');
        } else {
            this.position = this.CFG.get('position');
        }

//        if(this.CFG.get('lastShipment') == 'unfound') {
//            GM.value.set(this.prefix+'lastShipment', '1');
//            this.lastShipment = this.CFG.get('lastShipment');
//        } else {
//            this.lastShipment = this.CFG.get('lastShipment');
//        }

        if(this.CFG.get('hideOccupied') == 'unfound') {
            GM.value.set(this.prefix+'hideOccupied', '1');
            this.hideOccupied = this.CFG.get('hideOccupied');
        } else {
            this.hideOccupied = this.CFG.get('hideOccupied');
        }

        if(this.CFG.get('simpleView') == 'unfound') {
            GM.value.set(InterTrade.prefix+'simpleView', '1');
            this.simpleView = this.CFG.get('simpleView');
        } else {
            this.simpleView = this.CFG.get('simpleView');
        }
    },

    scriptOptionsConfig : function(){
        this.CFG.scriptName = this.scriptName;
        this.CFG.prefix = this.prefix;
        this.CFG.init({
            'Общие':{
                html:'<p>Нажмите escape для выхода без сохранения<br></p>',
                fields:{
                    'position' : {
                        type : 'select',
                        value : 'top',
                        label : 'Расположение InterCity',
                        options : {
                            'Вверху/ Первый' : 'top',
                            'Внизу / Последний' : 'bottom'
                        }
                    },
                    'userLang' : {
                        type : 'select',
                        value : 'ru',
                        label : 'Выбор языка',
                        options : {
			    'Русский' : 'ru',
                            'English' : 'en',
                            'Espa&ntilde;ol' : 'mx',
                            'Fran&ccedil;ais' : 'fr',
                            'Deutsch' : 'de',
                            'Polski' : 'pl',
                            'Vietnemese' : 'vn'

                        }
                    },
                    'simpleView' : {
                        type : 'checkbox',
                        value : true,
                        label : '',
                        text : 'Удобный просмотр кораблей'
                    }
                }
            },
            "О скрипте":{
                html:'<p><a href="http://userscripts.org/scripts/show/' +this.usoNum + '" target="_blank" style="font-weight:bold !important;">' +
                    this.scriptName+'  v' + this.curVer +
                    '</a> автор <a href="http://userscripts.org/users/emptysoul12" target="_blank">Empty_Soul</a> Переведен и исправлен <a href="http://userscripts.org/users/177603" target="_blank">Любовь </a> </p>' +
                    '<p>Скрипт делает удобной перевозку товаров, сухопутных войск и морских кораблей между вашими городами</p>'
            }
        });
    },
    transportGoods : function(cityID) {
        var link = '<a href="http://' +this.domain;
            link += '/index.php?view=transport&destinationCityId=';
            link += cityID + '" title="' +this.language.transportGoods +'">';
            link += '<img src="http://' +this.domain +'/skin/actions/transport.png" class="ictPics" /></a>';

    return link;
    },
    deployTroops : function(cityID) {
        var link = '<a href="http://' +this.domain;
            link += '/index.php?view=deployment&deploymentType=army&destinationCityId=';
            link += cityID + '" title="' +this.language.deployTroops +'">';
            link += '<img src="http://' +this.domain +'/skin/actions/move_army.png" class="ictPics" /></a>';

    return link;
    },
    stationFleets : function(cityID) {
        var link = '<a href="http://' +this.domain;
            link += '/index.php?view=deployment&deploymentType=fleet&destinationCityId=';
            link += cityID +'" title="' +this.language.stationFleets +'">';
            link += '<img src="http://' +this.domain +'/skin/actions/move_fleet.png" class="ictPics" /></a>';

    return link;
    },
    linkCities : function(cityID, linkText) {
        return '<div id="' +cityID +'">' +linkText +'</div>';
    },
    renderMainBlock : function() {
        var title = '<span title="' +this.language.title +' v' +this.curVer +'" id="ictHeader" class="header"><p id="shade">';
            if(this.isVisible === true) {title += this.downArr;}
                    else {title += this.upArr;}
            title += '</p> ' + this.language.title + '</span>';
            title = '<h3 class="header">' + title + '</h3>';

        var footer = '<div class="footer" style="margin-top:6px;"></div>';

        var ictBlock = $('<div class="dynamic" id="ictContainer"></div>');
            ictBlock.html(title + footer);

        switch(this.position) {
            case 'top' : $('#breadcrumbs').after(ictBlock); break; //INSERT TOP
            case 'bottom' : $('#mainview').before(ictBlock); break; //INSERT BOTTOM
        }
    },
    insertContent : function(){
        var html = '<div id="ictContent">';
                html += '<table id="ictTable"><tbody>';
        var cities = this.cityList.sort();

        for(var j = 0; j < cities.length; j++) {
            var cityInProc = this.cityList[j];

            html += '<tr id="'+cityInProc.name+'">';
            html += '<td class="ictCityName clickable"><div>';
            html += this.linkCities(cityInProc.id, cityInProc.name) +'</div></td>';

            if(this.currentCity == cityInProc.id) {
                html += '<td><img src="http://' +this.domain +'/skin/actions/transport_disabled.png" class="ictPics" /></td>';
                html += '<td><img src="http://' +this.domain +'/skin/actions/move_army_disabled.png" class="ictPics" /></td>';
                html += '<td><img src="http://' +this.domain +'/skin/actions/move_fleet_disabled.png" class="ictPics" /></td>';
            } else {
                html += '<td class="ictSend">' +this.transportGoods(cityInProc.id) +'</td>';
                html += '<td class="ictSend">' +this.deployTroops(cityInProc.id) +'</td>';
                html += '<td class="ictSend">' +this.stationFleets(cityInProc.id) +'</td>';
            }

            html += '</tr>';
        }

        html += '</tbody></table>';
        html += '<div id="ictForceUpdate">v' +this.curVer;
        html += '&nbsp;&nbsp;<span class="clickable">' + this.language.update + '</span>';
        html += '</div>';

        $('#ictContainer h3').after(html);
    },
    events : {
        hoverHighlight : function(){
            $('#ictTable tr').hover(function(){
                $(this).css('background-color','#EDDF82');
            }, function(){
                $(this).css('background-color','');
            });
        },
        shadeEvent : function() {
            $('#ictHeader').click(function() {
                if(InterTrade.isVisible === true) {
                    InterTrade.setWindowVisibility(false);
                } else {
                    InterTrade.setWindowVisibility(true);
                }
            });
        },
        attachCityChangeEvent : function() {
            var url = 'http://' +InterTrade.domain +'/index.php?';

            $('.ictCityName').find('div div:last').each(function(){
                $(this).click(function() {
                    $('#changeCityForm fieldset input').each(function(){
                       url += $(this).attr('name')+'='+$(this).attr('value')+'&';
                    });
                    url += 'cityId='+$(this).attr('id');

                    unsafeWindow.location.href = url;
                });
            });
        },
        attachForceUpdate : function() {
            $('#ictForceUpdate').click(function() {
                ScriptUpdater.forceNotice(InterTrade.usoNum, InterTrade.curVer);
            });
        }
    },
    attachEvents : function(){
        for(var event in this.events) {
            this.events[event]();
        }
    },
    setWindowVisibility : function(state) {
        switch(state) {
            case false:
                $('#ictContent').hide();
                $('#ictContainer div.footer').hide();
                $('#shade').text(this.downArr);
                this.isVisible = false;
            break;

            case true:
                $('#ictContent').show();
                $('#ictContainer div.footer').show();
                $('#shade').text(this.upArr);
                this.isVisible = true;
            break;
        }

        GM.value.set('isVisible', this.isVisible);
    },
    loadCSS : function(){
        GM.css(
            '.ictPics {height:17px; width:25px; padding: 0px 1px;}' +
            '.ictIcon {background-position:top left; background-repeat:no-repeat; opacity:0.5; filter:alpha(opacity=50);top:-3px; left:-5px; height:12px; width:20px; z-index:0;}' +
            '.clickable:hover {cursor:pointer; text-decoration:underline;}' +
            '.ictCityName {font-weight:bold; font-size: 11px; overflow: hidden; padding-left: 5px}' +
            '.ictCityName div {height:auto; width:130px;}' +
            '.ictShipH {font-weight:bold;font-size:1.5em;}' +
            '.ictShipT {font-weight:bold;font-size:1.5em;}' +
            '.ajaxLoadGif {display:inline;margin:0px;padding:0px}' +
            '#ictHeader:hover {cursor:pointer;}' +
            '#ictContent {margin-left:5px; margin-top:3px;}' +
            '#shade {display:inline;}' +
            '#ictForceUpdate {font-size: 9px;margin-left:5px;margin-bottom:-5px;}'
        );
    },
    loadLang : function(loc) {
        var lang = {
            name : '',
            title : '',
            stationFleets : '',
            deployTroops : '',
            transportGoods : '',
            update : ''
        };

        switch(loc) {
            case 'en':
                lang.name = 'English';
                lang.title = 'InterCity Trading';
                lang.stationFleets = 'Station Fleets';
                lang.deployTroops = 'Deploy Troops';
                lang.transportGoods = 'Transport Goods';
                lang.update = 'Update';
            break;

            case 'fr':
                lang.name = 'Fran&ccedil;ais';
                lang.title = 'Transport de Marchandises';
                lang.stationFleets = 'Stationner des Navires';
                lang.deployTroops = 'Deployer l\'Armee';
                lang.transportGoods = 'Transporter des Ressources';
                lang.update = 'Mise &agrave; jour';
            break;

            case 'de':
                lang.name = 'Deutsch';
                lang.title = 'InterCity Transport';
                lang.stationFleets = 'Flotten Stationieren';
                lang.deployTroops = 'Truppen Stationieren';
                lang.transportGoods = 'Ressourcen Transportieren';
                lang.update = 'Update';
            break;

            case 'pe':
            case 'mx':
                lang.name = 'Espa&ntilde;ol';
                lang.title = 'Transporte entre ciudades';
                lang.stationFleets = 'Apostar flotas';
                lang.deployTroops = 'Apostar tropas';
                lang.transportGoods = 'Transportar bienes';
                lang.update = 'actualizaci&oacute;n';
            break;

            case 'pl':
                lang.name = 'Polski';
                lang.title = 'Transport mi&#x0119;dzy miastami';
                lang.stationFleets = 'Przemie&#x015B;&#x0107; okr&#x0119;ty';
                lang.deployTroops = 'Przemie&#x015B;&#x0107; jednostki';
                lang.transportGoods = 'Transportuj Surowce';
                lang.update = 'Aktualizacja';
            break;

            case 'vn':
                lang.name = 'Ti\u1ebfng Vi\u1ec7t';
                lang.title = 'Giao d\u1ecbch';
                lang.stationFleets = 'Tri\u1ec3n khai chi\u1ebfn h\u1ea1m';
                lang.deployTroops = 'Tri\u1ec3n khai qu&acirc;n l&iacute;nh';
                lang.transportGoods = 'V\u1eadn chuy\u1ec3n h&agrave;ng h&oacute;a';
                lang.update = 'C\u1eadp nh\u1eadt';
            break;
            case 'ru':
                lang.name = 'Русский';
                lang.title = 'InterCity Trading';
                lang.stationFleets = 'Стационарные флоты';
                lang.deployTroops = 'Развернуть войска';
                lang.transportGoods = 'Transport Goods';
                lang.update = 'Обновление';
            break;
        }

    return lang;
    },
    attachLoadCalculator : function(interval) {
        if(this.currentView == 'transport') {
            setInterval(function(){
                InterTrade.updateLoadTime();
            }, interval);
        }
    },
    updateLoadTime : function() {
        var cargo = 0;
        $('input.textfield').each(function () {
            cargo += parseInt($(this).val());
        });

        if(cargo != this.lastCheck){
            var srcPort = this.IT.cityGetBuildingByType('port', this.IT.getCityById(this.currentCity));
            var sourcePortLvl = srcPort.level;
            var loadSpeed = this.loadingSpeeds[sourcePortLvl];

            var decTime = (cargo/loadSpeed);
            var time = this.decTimeConvert(decTime);
            var ts = '';

            if(isNaN(time.h) == true || isNaN(time.m) == true | isNaN(time.s) == true) {
                ts = ' + Error';
            } else {
                if(time.h != 0) {
                    ts += ' + ' + time.h +'h ' + time.m +'m ' +time.s +'s';
                } else if(time.m != 0) {
                    ts += ' + ' + time.m +'m ' +time.s +'s';
                } else {
                    ts += ' + ' + time.s +'s';
                }
            }

            $('#ictShipTime').html(ts);

            this.lastCheck = cargo;
        }

    },
    enableSimpleView : function(enabled) {
        if(enabled === true) {
            var attachShippingIDs = function() {
                $('.ictSend').find('a img').each(function(){
                    $(this).click(function() {
                        var to = $(this).parents('tr').attr('id');
                        //var from = InterTrade.currentCityName;
                        //GM.setVal('fromTo', from+'|'+to);
                    });
                });
            };

           var shipTroops = function() {
               /* $('.sliderthumb').mouseup(function(){
                    $('#ictTravel').text($('.journeyTime').text());
                });

                $('.textfield').change(function(){
                    $('#ictTravel').text($('.journeyTime').text());
                });*/

                var route = '<span class="ictShipH">' + InterTrade.currentCityName + '</span>';
                    route += '&nbsp;&nbsp;&nbsp;<img src="http://'+InterTrade.domain +'/skin/img/icon_target2.gif">&nbsp;&nbsp;&nbsp;';
                    route += '<span class="ictShipH">' + $('.journeyTarget').text().split(':')[1] + '</span>';
                    route += '<br><img src="http://'+InterTrade.domain +'/skin/img/icon_journeytime.gif">';
                    route += '<span class="ictShipT" id="journeyTime">' + $('.journeyTime').text().split(':')[1] + '</span>';//ictTravel


                $('#selectArmy div:first p:first').css('text-align','center').html(route);
                $('.costs').css('width','300px');
                $('#missionSummary .transporters').css({'margin-top':'-110px','margin-left':'120px','margin-bottom':'80px'});

                $('#missionSummary').prepend($('#missionSummary').next('div').contents());
		$('#missionSummary .common').hide();
            };

 var shipGoods = function(){
                InterTrade.attachLoadCalculator(50);

                    var route = '<span class="ictShipH">' + InterTrade.currentCityName + '</span>';
                        route += '&nbsp;&nbsp;&nbsp;<img src="http://'+InterTrade.domain +'/skin/img/icon_target2.gif">&nbsp;&nbsp;&nbsp;';
                        route += '<span class="ictShipH">' + $('.journeyTarget')[0].lastChild.nodeValue + '</span>';
                        route += '<br><img src="http://'+InterTrade.domain +'/skin/img/icon_journeytime.gif">';
                        route += '<span class="ictShipT">' + $('.journeyTime').text().split(':')[1] + '</span>';
                        route += '<br><img src="http://'+this.domain +'/skin/img/icon_journeytime.gif">';
                        route += '<span class="ictShipT" id="ictShipTime>0m</span>';

                    $('#transportGoods div:first p:first').css('text-align','center').html(route);
                    $('#missionSummary .transporters').css({'margin-top':'0px','margin-left':'10px','margin-bottom':'25px'});

                    $('#missionSummary').prepend($('#missionSummary').next('div').contents());
		    $('#missionSummary .common').hide();
            };

           var moveShips = function(){
	
                var route = '<span class="ictShipH">' + InterTrade.currentCityName + '</span>';
                    route += '&nbsp;&nbsp;&nbsp;<img src="http://'+InterTrade.domain +'/skin/img/icon_target2.gif">&nbsp;&nbsp;&nbsp;';
                    route += '<span class="ictShipH">' + $('.journeyTarget').text().split(':')[1] + '</span>';



                $('#selectFleet div:first p:first').css('text-align','center').html(route);
                $('.costs').css('width','300px');
                $('#missionSummary .transporters').css({'margin-top':'-110px','margin-left':'120px','margin-bottom':'80px'});

                $('#missionSummary').prepend($('#missionSummary').next('div').contents());
		$('#missionSummary .common .journeyTarget').hide();
		$('#missionSummary .common ').css({'width': '100%', 'float': 'left', 'text-align': 'center'});
		$('#missionSummary .common .journeyTime').css({'font-size': '1.75em', 'font-weight': 'bold', 'width': '200px','margin':'0px auto'});
            };

            

            if(this.currentView == 'transport') {
                shipGoods();
            } else if(this.currentView == 'deployment') {
                if($('#deploymentForm input:eq(1)').attr('value') == 'deployFleet') {
                    moveShips();
                } else {
                    shipTroops();
                }
            }

            $('#missionSummary').css('text-align','center');
            
            $('#mainview div:first p').hide();
            $('#mainview div:first').css({'min-height':'0px','height':'25px;'});

            attachShippingIDs();
        }
    }
};

//var $$=function(h,m){unsafeWindow.console.log('=== '+h+' ===');unsafeWindow.console.log(m);}

InterTrade.run();