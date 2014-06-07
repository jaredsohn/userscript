// ==UserScript==
// @name            Ikariam InterCity Trading
// @namespace       userscripts.org
// @author          empty_soul
// @homepage        http://userscripts.org/scripts/show/54649
// @version         4.2.2
// @history         4.2.2 fixed window shade across page bug
// @history         4.2.1 bugfix attempt for hiding foreign towns
// @history         4.2 Added Previous Shipment Block (beta)
// @history         4.1.2 Extended Trading Port Loading Times (thank you Cherry)
// @history         4.1.1 Updated GM Object references for API change.
// @history         4.1 Added option to hide occupied/garrisoned islands in the trading block
// @history         4.0b8 bugfix for fresh install not maximized
// @history         4.0b7 NaN shipping time fix, added options page back to excludes
// @history         4.0b6 Attempt at fixing no default values on saved options errors
// @history         4.0b5 Converted options into Phasma's Script Options, accessed via Scripts link
// @history         4.0b4 Fixed bug with minimizing the block across page loads
// @history         4.0b3 Re-Enabled loading time calculators
// @history         4.0b2 Fixed line in saving options, fixed problem resetting on new installs
// @history         4.0b1 Core code rewrites, fixed city change bug and no show bug
// @description     Adds shipping destinations in sidebar for ease in transporting goods between islands.
// @homepage        http://kkhweb.com/
// @include         http://*.ikariam.tld/*
// @exclude         http://*.ikariam.tld/*view=militaryAdvisorDetailedReportView*
// @exclude         http://*.ikariam.tld/*view=highscore*
// @exclude         http://*.ikariam.tld/*view=version*
// @exclude         http://*.ikariam.tld/*view=options*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require http://files.kkhweb.com/greasemonkey/57377.safe.js
// @require http://files.kkhweb.com/greasemonkey/57756.safe.js
// @require http://files.kkhweb.com/greasemonkey/62718.safe.js
// @require http://files.kkhweb.com/greasemonkey/gmTools.js
// @resource arrow  http://i27.tinypic.com/nn6ruc.png
// ==/UserScript==

//NOTICE: I have not gotten this script approved, by installing this you are using it at your own risk
if(!InterTrade) {var InterTrade;}

InterTrade = {
//Member Data
    curVer:                 '4.2.2',
    usoNum:                 54649,
    scriptName:             'InterCity Trading',
    downArr:                '\u25bc',
    upArr:                  '\u25b2',
    prefix:                 'ictConfig.',
    position:               '',
    isVisible:              '',
    simpleView:             '',
    hideOccupied:           '',
    lastShipment:           '',
    shipmentData:           '',
    domain:                 '',
    autoLang:               '',
    userLang:               '',
    language:               '',
    currentCity:            '',
    currentCityName:        '',
    currentView:            '',
    cityList:               [],
    lastCheck:              0,
    IT:                     IkaTools,
    SU:                     ScriptUpdater,
    CFG:                    Config,
    icons:                  {},
    loadingSpeeds:          [0,30,60,93,129,169,213,261,315,373,437,508,586, 672,766,869,983,1108,1246,1398,1565,1748,1950,2172,2416,2685,2980,3305, 3663,4056,4488,4964,5488,6697,7394,8161,9004,9932,10952,12074],
//Member Functions
    decTimeConvert: function(time){var hours=parseInt(time/60);time-=(hours*60);var minutes=parseInt(time);time-=minutes;time*=60;var seconds=parseInt(time);return{h:hours,m:minutes,s:seconds};},
    removeIndex: function(array, from, to){var rest=array.slice((to||from)+1||array.length);array.length=from<0?array.length+from:from;return array.push.apply(array,rest);},
    run: function(debug) {
        if(debug === true) {
            GM.uw.InterCity = this;
            GM.uw.InterCity.init();
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

        this.icons = {
            'wood' : 'http://' +this.domain +'/skin/resources/icon_wood.gif',
            'marble' : 'http://' +this.domain +'/skin/resources/icon_marble.gif',
            'wine' : 'http://' +this.domain +'/skin/resources/icon_wine.gif',
            'sulfur' : 'http://' +this.domain +'/skin/resources/icon_sulfur.gif',
            'glass' : 'http://' +this.domain +'/skin/resources/icon_glass.gif',
            'target' : 'http://' +this.domain +'/skin/img/icon_target2.gif',
            'journeyTime' : 'http://' +this.domain +'/skin/img/icon_journeytime.gif',
            'armyEnabled' : 'http://' +this.domain +'/skin/actions/move_army.gif',
            'armyDisabled' : 'http://' +this.domain +'/skin/actions/move_army_disabled.gif',
            'fleetEnabled' : 'http://' +this.domain +'/skin/actions/move_fleet.gif',
            'fleetDisabled' : 'http://' +this.domain +'/skin/actions/move_fleet_disabled.gif',
            'transportEnabled' : 'http://' +this.domain +'/skin/actions/transport.gif',
            'transportDisabled' : 'http://' +this.domain +'/skin/actions/transport_disabled.gif'
        };

        this.currentCity = this.IT.getCurrentCityId();
        this.currentCityName = $('#citySelect option:selected').val();
        this.currentView = this.IT.getView();

        this.cityList = this.IT.getCities();

        if(this.hideOccupied === true){
            var regex = /deployed/;
            for(var a in this.cityList) {
                if(regex.test(this.cityList[a].type) == true){
                    this.removeIndex(this.cityList, a);
                }
            }
        }

        this.renderMainBlock();
        this.insertContent();
        this.attachEvents();
        this.setWindowVisibility(this.isVisible);
        this.enableSimpleView(this.simpleView);
        this.enableLastShipment(this.lastShipment);
        this.SU.check(this.usoNum, this.curVer);
    },
    loadOptions: function(){
        this.domain = document.location.host;
        this.autoLang = this.domain.split('.')[1];

        if(this.CFG.get('userLang') == 'unfound') {
            GM.value.set(this.prefix+'userLang', 'en');
            this.userLang = this.CFG.get('userLang');
        } else {
            this.userLang = this.CFG.get('userLang');
        }

        if(this.autoLang == this.userLang) {
            this.language = this.loadLang(this.autoLang);
        } else {
            this.language = this.loadLang(this.userLang);
        }

        if(this.CFG.get('position') == 'unfound') {
            GM.value.set(this.prefix+'position', 'top');
            this.position = this.CFG.get('position');
        } else {
            this.position = this.CFG.get('position');
        }

        if(this.CFG.get('lastShipment') == 'unfound') {
            GM.value.set(this.prefix+'lastShipment', '1');
            this.lastShipment = this.CFG.get('lastShipment');
        } else {
            this.lastShipment = this.CFG.get('lastShipment');
        }

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

        if(GM.value.get('isVisible') === false) {
            GM.value.set('isVisible', 1);
            var tmp = GM.value.get('isVisible') == 1 ? true : false ;
            this.isVisible = tmp;
        } else {
            var tmp2 = GM.value.get('isVisible') == 1 ? true : false ;
            this.isVisible = tmp2;
        }
    },
    scriptOptionsConfig : function(){
        this.CFG.scriptName = this.scriptName + ' v' + this.curVer;
        this.CFG.prefix = this.prefix;
        this.CFG.init({
            'General':{
                html:'<p>Customize the '+this.scriptName+' script with these options.<br/>Press escape to close without saving.</p>',
                fields:{
                    'position' : {
                        type : 'select',
                        value : 'top',
                        label : 'Block Position',
                        options : {
                            'Top / First' : 'top',
                            'Bottom / Last' : 'bottom'
                        }
                    },
                    'userLang' : {
                        type : 'select',
                        value : 'en',
                        label : 'Available Languages',
                        options : {
                            'English' : 'en',
                            'Espa&ntilde;ol' : 'mx',
                            'Fran&ccedil;ais' : 'fr',
                            'Deutsch' : 'de',
                            'Polski' : 'pl',
                            'Nederlands' : 'nl',
                            'Vietnemese' : 'vn'
                        }
                    },
                    'simpleView' : {
                        type : 'checkbox',
                        value : true,
                        label : 'Simple Views',
                        text : 'Simple Shipping Views + Loading Times'
                    },
                    'hideOccupied' : {
                        type : 'checkbox',
                        value : true,
                        label : 'Local Trading (beta)',
                        text : 'Hide Occupied/Garrisoned Towns'
                    },
                    'lastShipment' : {
                        type : 'checkbox',
                        value : false,
                        label : 'Previous Shipment (beta)',
                        text : 'Shows the last shipment you made'
                    }
                }
            },
            "About" : {
                html : '<p><a href="http://userscripts.org/scripts/show/' +this.usoNum + '" target="_blank" style="font-weight:bold !important;">' +
                    this.CFG.scriptName +
                    '</a> by <a href="http://userscripts.org/users/emptysoul12" target="_blank">Empty_Soul</a></p>' +
                    '<p>This script makes it simple to transport!<br>Easily move Goods, Troops and Ships between your cities.</p>'
            }
        });

        this.CFG.preloadData();
    },
    transportGoods : function(cityID) {
        var link = '<a href="http://' +this.domain;
            link += '/index.php?view=transport&destinationCityId=';
            link += cityID + '" title="' +this.language.transportGoods +'">';
            link += '<img src="' + this.icons.transportEnabled + '" class="ictPics" /></a>';

    return link;
    },
    deployTroops : function(cityID) {
        var link = '<a href="http://' +this.domain;
            link += '/index.php?view=deployment&deploymentType=army&destinationCityId=';
            link += cityID + '" title="' +this.language.deployTroops +'">';
            link += '<img src="' + this.icons.armyEnabled + '" class="ictPics" /></a>';

    return link;
    },
    stationFleets : function(cityID) {
        var link = '<a href="http://' +this.domain;
            link += '/index.php?view=deployment&deploymentType=fleet&destinationCityId=';
            link += cityID +'" title="' +this.language.stationFleets +'">';
            link += '<img src="' + this.icons.fleetEnabled + '" class="ictPics" /></a>';

    return link;
    },
    linkCities : function(cityID, linkText) {
        return '<div id="' +cityID +'" style="top:-12px; left:5px; z-index:1;">' +linkText +'</div>';
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
            case 'top' :$('#breadcrumbs').after(ictBlock);break; //INSERT TOP
            case 'bottom' :$('#mainview').before(ictBlock);break; //INSERT BOTTOM
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
            html += '<div class="ictIcon" style="background-image:url(';
            html += this.icons[cityInProc.tradegoodType] +');"></div>';
            html += this.linkCities(cityInProc.id, cityInProc.name) +'</div></td>';

            if(this.currentCity == cityInProc.id) {
                html += '<td><img src="' + this.icons.transportDisabled + '" class="ictPics" /></td>';
                html += '<td><img src="' + this.icons.armyDisabled + '" class="ictPics" /></td>';
                html += '<td><img src="' + this.icons.fleetDisabled + '" class="ictPics" /></td>';
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
            $('#ictHeader').bind('click', function() {
                if(InterTrade.isVisible == 1) {
                    InterTrade.setWindowVisibility(false);
                } else {
                    InterTrade.setWindowVisibility(true);
                }
            });
        },
        attachCityChangeEvent : function() {
            var url = 'http://' +InterTrade.domain +'/index.php?';

            $('.ictCityName').find('div div:last').each(function(){
                $(this).bind('click', function() {
                    $('#changeCityForm fieldset input').each(function(){
                       url += $(this).attr('name')+'='+$(this).attr('value')+'&';
                    });
                    url += 'cityId='+$(this).attr('id');

                    unsafeWindow.location.href = url;
                });
            });
        },
        attachForceUpdate : function() {
            $('#ictForceUpdate').bind('click', function() {
                ScriptUpdater.forceNotice(InterTrade.usoNum, InterTrade.curVer);
            });
        },
        attachShippingIDs : function() {
            $('.ictSend').find('a img').each(function(){
                $(this).bind('click', function() {
                    var to = $(this).parents('tr').attr('id');
                    var from = InterTrade.currentCityName;
                    GM.value.set('fromTo', from+'|'+to);
                });
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
                this.isVisible = 0;
            break;

            case true:
                $('#ictContent').show();
                $('#ictContainer div.footer').show();
                $('#shade').text(this.upArr);
                this.isVisible = 1;
            break;
        }

        GM.value.set('isVisible', this.isVisible);
    },
    loadCSS : function(){
        GM.css(
            '.ictPics {height:17px; width:25px; padding: 0px 1px;}' +
            '.ictIcon {background-position:top left; background-repeat:no-repeat; opacity:0.5; filter:alpha(opacity=50);top:-3px; left:-5px; height:12px; width:20px; z-index:0;}' +
            '.clickable:hover {cursor:pointer; text-decoration:underline;}' +
            '.ictCityName {font-weight:bold;}' +
            '.ictCityName div {height:12px; width:135px;}' +
            '.ictCityName div div {position:relative; }' +
            '.ictShipH {font-weight:bold;font-size:1.75em;}' +
            '.ictShipT {font-weight:bold;font-size:1.5em;}' +
            '.ajaxLoadGif {display:inline;margin:0px;padding:0px}' +
            '#ictHeader:hover {cursor:pointer;}' +
            '#ictContent {margin-left:5px; margin-top:3px;}' +
            '#shade {display:inline;}' +
            '#ictForceUpdate {font-size:.7em;margin-left:5px;margin-bottom:-5px;}' +
            '#ictLastShipmentContent {margin-left:10px;}' +
            '#ictLastShipmentClear {font-size:.7em;margin-left:5px;margin-bottom:-5px;}' +
            '#lastShipmentList {list-style-type: none;padding: 0;margin: 5px 0;}' +
            '#lastShipmentList li {background-repeat: no-repeat;}' +
            '#lastShipmentList li span {margin-left:30px;font-weight:bold;}'
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
                lang.lastShipment = 'Previous Shipment';
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

            case 'nl':
                lang.name = 'Nederlands';
                lang.title = 'Intern transport';
                lang.stationFleets = 'Stationeer vloot';
                lang.deployTroops = 'Stationeer troepen';
                lang.transportGoods = 'Vervoer goederen';
                lang.update = 'Update';
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

            if(isNaN(time.h) === true || isNaN(time.m) === true || isNaN(time.s) === true) {
                ts = ' -';
            } else {
                if(time.h !== 0) {
                    ts += ' + ' + time.h +'h ' + time.m +'m ' +time.s +'s';
                } else if(time.m !== 0) {
                    ts += ' + ' + time.m +'m ' +time.s +'s';
                } else {
                    ts += ' + ' + time.s +'s';
                }
            }

            $('#ictShipTime').html(ts);

            this.lastCheck = cargo;
        }

    },
    fetchCargo : function() {
        var shipmentData = {};
        var cargo = Array();

        $('input.textfield').each(function () {
            var type = $(this).attr('id').split('_')[1];
            var amnt = parseInt($(this).val());
            cargo[type] = amnt;
        });

        for(var type in cargo) {
            if(cargo[type] === 0) {}
            else {
                shipmentData[type] = cargo[type];
            }
        }

        var fromTo = GM.value.get('fromTo');
        shipmentData.from = fromTo.split('|')[0];
        shipmentData.to = fromTo.split('|')[1];

        return shipmentData;
    },
    insertLastShipment : function(cargo) {
        var list = '<ul id="lastShipmentList">';
        for(var type in cargo) {
            if(type != 'to' && type != 'from' ){
                list += '<li style="background-image: url(' + InterTrade.icons[type] + '); ">';
                list += '<span>' + this.IT.addCommas(cargo[type]) + '</span></li>';
            }
        }
        list += '</ul>';
        var clear = '<div id="ictLastShipmentClear"><span class="clickable">Clear</span></div>';

        var route = '<p id="ictLastShipmentReceiver">';
            route += '<div style="margin-left:10px;"><span style="font-weight:bold;">' + cargo.from + '<br/></span>';
            route += '<img src="' + GM_getResourceURL('arrow') + '" style="display:inline;width:16px;height:16px;">';
            route += '<span style="font-weight:bold;">&nbsp;' + cargo.to + '</span></div></p>';

        $('#ictLastShipmentContent').html(route + list + clear);

        $('#ictLastShipmentClear').bind('click', function(){
            InterTrade.storeShipment(false);
            InterTrade.shipmentData = '';
            $('#ictLastShipmentContent').empty();
        });
    },
    enableLastShipment : function(enabled) {
        if(enabled === true) {
            var title = '<h3 class="header">' + this.language.lastShipment + '</h3>';
            var content = '<div id="ictLastShipmentContent"></div>';
            var footer = '<div class="footer" style="margin-top:6px;"></div>';

            var ictShipmentBlock = $('<div class="dynamic" id="ictLastShipmentContainer"></div>');
                ictShipmentBlock.html(title + content + footer);
            $('#ictContainer').after(ictShipmentBlock);

            var cargo = InterTrade.getShipment();
            if(cargo !== false) {
                InterTrade.insertLastShipment(cargo);
            }

            if(this.currentView == 'transport'){
                $('#submit').bind('click', function(){
                    InterTrade.shipmentData = InterTrade.fetchCargo();
                    InterTrade.storeShipment(InterTrade.shipmentData);
                });
            }
        }
    },
    enableSimpleView : function(enabled) {
        if(enabled === true) {
            var shipTroops = function() {
                $('.sliderthumb').mouseup(function(){
                    $('#ictTravel').text($('.journeyTime').text());
                });

                $('.textfield').change(function(){
                    $('#ictTravel').text($('.journeyTime').text());
                });

                var route = '<span class="ictShipH">' + from + '</span>';
                    route += '&nbsp;&nbsp;&nbsp;<img src="' + InterTrade.icons.target + '">&nbsp;&nbsp;&nbsp;';
                    route += '<span class="ictShipH">' + to + '</span>';
                    route += '<br><img src="' + InterTrade.icons.journeyTime + '">';
                    route += '<span class="ictShipT" id="ictTravel">' + $('.journeyTime').text().split(':')[1] + '</span>';

                $('#selectArmy div:first p:first').css('text-align','center').html(route);
                $('.costs').css('width','300px');
                $('#missionSummary .transporters').css({'margin-top':'-110px','margin-left':'120px','margin-bottom':'80px'});

                $('#missionSummary').prepend($('#missionSummary').next('div').contents());
            };

            var shipGoods = function(){
                InterTrade.attachLoadCalculator(50);

                    var route = '<span class="ictShipH" id="ictShipSource">' + from + '</span>';
                        route += '&nbsp;&nbsp;&nbsp;<img src="' + InterTrade.icons.target + '">&nbsp;&nbsp;&nbsp;';
                        route += '<span class="ictShipH" id="ictShipDestination">' + to + '</span>';
                        route += '<br><img src="' + InterTrade.icons.journeyTime + '">';
                        route += '<span class="ictShipT">' + $('.journeyTime').text().split(':')[1] + '</span>';
                        route += '<br><img src="' + InterTrade.icons.journeyTime + '">';
                        route += '<span class="ictShipT" id="ictShipTime>0m</span>';

                    $('#transportGoods div:first p:first').css('text-align','center').html(route);
                    $('#missionSummary .transporters').css({'margin-top':'-55px','margin-left':'120px','margin-bottom':'25px'});

                    $('#missionSummary').prepend($('#missionSummary').next('div').contents());
            };

            var moveShips = function(){
                var route = '<span class="ictShipH">' + from + '</span>';
                    route += '&nbsp;&nbsp;&nbsp;<img src="' + InterTrade.icons.target + '">&nbsp;&nbsp;&nbsp;';
                    route += '<span class="ictShipH">' + to + '</span>';

                $('#selectFleet div:first p:first').css('text-align','center').html(route);
                $('.costs').css('width','300px');
                $('#missionSummary .transporters').css({'margin-top':'-110px','margin-left':'120px','margin-bottom':'80px'});

                $('#missionSummary').prepend($('#missionSummary').next('div').contents());
            };

            var fromTo = GM.value.get('fromTo');
            var from, to;
            if(fromTo === false) {
                from = '';
                to = '';
            } else {
                from = fromTo.split('|')[0];
                to = fromTo.split('|')[1];
            }

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
            $('#missionSummary .common').hide();
            $('#mainview div:first p').hide();
            $('#mainview div:first').css({'min-height':'0px','height':'25px;'});
        }
    },
    storeShipment : function(object){
        switch(typeof(object)){
            case 'boolean':
                GM_setValue('lastShipment', false);
            break;
            case 'object':
                var string = '';

                for(var key in object){ string += '"' + key + '":"' + object[key] + '",'; }
                string = string.substring(0, string.length-1);
                string = '{' + string + '}';

                GM_setValue('lastShipment', string);
            break;
        }
    },
    getShipment : function(){
        var shipment = GM_getValue('lastShipment');
        if(shipment === false || shipment === undefined) {
            return false;
        } else {
            var lastShipment = eval('(' + shipment + ')');
            return lastShipment;
        }
    }
};

//var log = function(m) {GM.uw.console.log(m);};

InterTrade.run(true);