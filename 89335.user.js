// ==UserScript==
// @name            Ikariam Dropdown Menus
// @namespace       ikariam
// @author          empty_soul
// @version         1.6.2
// @history         1.6.2BR Tradução para o portugues
// @history         1.6.2 Fixed bug with helloween
// @history         1.6.1 Fixed bug with researches over 1 million points
// @history         1.6 Made all menus dynamic width, cleaned up CSS
// @history         1.5.2 Moved my GM object and the hoverIntent plugin to external scripts
// @history         1.5.1 Corrected German Translation
// @history         1.5 Added open menu checking to prevent multiple open menus
// @history         1.4.1 Fixed Research bug, dynamic width dropdown (thanks randalph)
// @history         1.4 Added Troop Movements and Combat Reports count fetching on hover
// @history         1.3 Added jQuery hoverIntent and fadeout, fixed menu not hiding on mouseOut of the top, corrected French Translation
// @history         1.2.5 Added Greek translation
// @history         1.2.4 Cleaned up inbox/outbox count call checking
// @history         1.2.3 French Lang fix
// @history         1.2.2 Widened research box, fixed multiple research calls on dropdown
// @history         1.2.1 Added version branding with link to check for updates
// @history         1.2 Added Reasearch dropdown with percent complete of each research
// @history         1.1 Added Cities dropdown for trade routes.
// @history         1.0 Cleaned CSS, Cleaned Code, added Millitary dropdown menu, Changed Script Title
// @description     Создает выпадающее меню для подпунктов у Советников.
// @homepage        http://kkhweb.com/
// @include         http://s*.ikariam.tld/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require         http://kkhweb.com/web_share/greasemonkey/hoverIntent.min.js
// @require         http://userscripts.org/scripts/source/57756.user.js
// @require         http://userscripts.org/scripts/source/57377.user.js
// @require         http://kkhweb.com/web_share/greasemonkey/gm.js
// @resource        ajaxLoadGif http://kkhweb.com/web_share/greasemonkey/ajaxLoadGif.gif
// ==/UserScript==

var usoNumber = 81682;
var currentVersion = '1.6.2';

GM.css(' \
    a:hover {cursor:pointer;} \
    .ajaxLoadGif {margin-left:25px; padding-top:15px; padding-bottom:20px;} \
    #menuC, #menuM, #menuR, #menuD {display:none; background-color:#FDE5AC; border:1px solid #9D836A; text-align:left; \
         width:auto; height:auto; margin-left:5px; margin-top:-2px; position:relative; z-index:10500;} \
    #menuC table, #menuM table, #menuR table, #menuD table {width:100%;} \
    #menuD td:hover, #menuM td:hover, #menuC td:hover, #menuR td:hover {background-color:#FEF6BD;} \
    #menuD tr, #menuM tr, #menuC tr, #menuR tr  {border-bottom:1px solid #9D836A;} \
    #menuC a, #menuM a, #menuR a, #menuD a {height:12px; width:100%; margin-left:5px; margin-right:10px; padding-bottom:3px; padding-top:2px; margin-top: 0px;} \
');

var DDM = {
    //Vars
    usNum:           usoNumber,
    curVer:          currentVersion,
    language:        new Array(),
    cChecked:        false,
    rChecked:        false,
    mChecked:        false,
    tChecked:        false,
    hiSensitivity:   3, // hoverIntent - number = sensitivity threshold (must be 1 or higher)
    hiInterval:      200, // hoverIntent - number = milliseconds for onMouseOver polling interval
    hiTimeout:       0,
    fadeOut:         200, // Menu fadeout speed - number = milliseconds
    menuOpen:        false,
    openMenu:        '',
    currentView:     '',

    //Functions
    loadLang:function(loc) {
        var lang = [];

        switch(loc) {
            default:
            case 'com':
            case 'org':
                lang.name = 'English';
                lang.inbox = 'Inbox';
                lang.outbox = 'Outbox';
                lang.treaty = 'Treaty';
                lang.alliance = 'Alliance';
                lang.troops = 'Troop Movements';
                lang.crs = 'Combat Reports';
                lang.archives = 'Archives';
                lang.news = 'News';
                lang.routes = 'Routes';
                lang.transports = 'Transports';
            break;

            case 'br':
            case 'pt':
                lang.name = 'Portugues';
                lang.inbox = 'Caixa de entrada';
                lang.outbox = 'Caixa de saida';
                lang.treaty = 'Tratados';
                lang.alliance = 'Alianca';
                lang.troops = 'Tropas em movimento';
                lang.crs = 'Relatorios de combate';
                lang.archives = 'Arquivos';
                lang.news = 'Noticias';
                lang.routes = 'Rotas comerciais';
                lang.transports = 'Transporte';
            break;

            case 'ru':
                lang.name = 'Русский';
                lang.inbox = 'Входящие';
                lang.outbox = 'Исходящие';
                lang.treaty = 'Договор';
                lang.alliance = 'Альянс';
                lang.troops = 'Перемещение войск';
                lang.crs = 'Боевые доклады';
                lang.archives = 'Архив';
                lang.news = 'Городские новости';
                lang.routes = 'Торговые маршруты';
                lang.transports = 'Transports';
            break;

            case 'de':
                lang.name = 'German';
                lang.inbox = 'Posteingang';
                lang.outbox = 'Postausgang';
                lang.treaty = 'Abkommen';
                lang.alliance = 'Allianz';
                lang.troops = 'Truppen';
                lang.crs = 'KBs';
                lang.archives = 'Archiv';
                lang.news = 'News';
                lang.routes = 'Routen';
                lang.transports = 'Transports';
            break;

            case 'net':
                lang.name = 'Turkish';
                lang.inbox = 'Gelen';
                lang.outbox = 'Giden';
                lang.treaty = 'Anlasma';
                lang.alliance = 'Ittifak';
                lang.troops = 'Asker';
                lang.crs = 'CRs';
                lang.archives = 'Ar&#x015F;ivler';
                lang.news = 'Haber';
                lang.routes = 'Rotalar';
                lang.transports = 'Transports';
            break;
            
            case 'fr':
                lang.name = 'French';
                lang.inbox = 'ReÃ§us';
                lang.outbox = 'EnvoyÃ©s;';
                lang.treaty = 'Accords';
                lang.alliance = 'Alliance';
                lang.troops = 'Troupes';
                lang.archives = 'Archives';
                lang.news = 'Nouvelles';
                lang.routes = 'ItinÃ©raires';
                lang.transports = 'Transports';
            break;

            case 'gr':
                lang.name = 'Greek';
                lang.inbox = 'Î•Î¹ÏƒÎµÏ�Ï‡ÏŒÎ¼ÎµÎ½Î±';
                lang.outbox = 'Î•Î¾ÎµÏ�Ï‡ÏŒÎ¼ÎµÎ½Î±';
                lang.treaty = 'Î£Ï…Î½Î¸Î®ÎºÎ·';
                lang.alliance = 'Î£Ï…Î¼Î¼Î±Ï‡Î¯Î±';
                lang.troops = 'Troops';
                lang.crs = 'CRs';
                lang.archives = 'Archives';
                lang.news = 'News';
                lang.routes = 'Routes';
                lang.transports = 'Transports';
            break;
        }
    return lang;
    },
    strips:function(str){ return str.replace(/^\s\s*/, '').replace(/\s\s*$/,''); },
    init:function(){
        this.server = IkaTools.getDomain();
        this.currentView = IkaTools.getView();
        this.language = this.loadLang(this.server.split('.')[1]);
        this.renderCities();
        this.renderMilitary();
        this.renderResearch();
        this.renderDiplomacy();
//        if(this.currentView == 'options'){
//            this.renderOptions();
//        }
    },
    renderOptions:function(){
            var content2 = '<h3 class="header">Dropdown Menus Settings</h3>';
                content2 += '<div class="content">';
                content2 += '<table cellspacing="0" cellpadding="0"><tr><th>Available Languages</th><td>';
                content2 += '<select id="ictLang" name="ictLang">';
                    content2 += '<option value="com">English</option>';
                    content2 += '<option value="pt">Portugues</option>';
                    content2 += '<option value="bt">Portugues</option>';
                    content2 += '<option value="mx">Espa&ntilde;ol</option>';
                    content2 += '<option value="fr">Fran&ccedil;ais</option>';
                    content2 += '<option value="de">Deutsch</option>';
                    content2 += '<option value="pl">Polski</option>';
		    content2 += '<option value="ru">Русский</option>';
                    content2 += '<option value="vn">Vietnemese</option>';
                content2 += '</select></td></tr>';
                content2 +='<tr><th>Auto-Detect?</th><td><input type="checkbox" name="ictAuto" id="ictAuto" /></td></tr></table>';
                content2 += '<div class="centerButton"><input type="button" class="button" value="Save Settings" id="ictSave" /></div>';
                content2 += '</div><div class="footer"> </div>';

            var div = $('<div class="contentBox01h">');
                div.html(content2);

            $('#vacationMode').before(div);
    },
    fetchTransports:function(){
        if(this.tChecked == false) {
            if(this.transportsEnRoute() == true){
                GM.ajax({
                    method: 'GET',
                    url: 'http://' + DDM.server + '/index.php?view=merchantNavy',
                    headers: GM.ajaxHeaders,
                    onload: function(data) {
                        DDM.tChecked = true;

                        var transports = $(data.responseText).find('#mainview div.contentBox div.content:eq(1) table').html();
                        var transCount = '(' + parseInt(1+ $(transports).find('tbody').children('tr:even').size()) + ')';

                        $('#DDtrans').text(DDM.language.transports + ' - ' + transCount);
                    }
                });
            }
        }
    },
    fetchMsgCount:function(){
        if(this.cChecked == false) {
            GM.ajax({
                method: 'GET',
                url: 'http://' + DDM.server + '/index.php?view=diplomacyAdvisor',
                headers: GM.ajaxHeaders,
                onload: function(data) {
                    DDM.cChecked = true;

                    var tabs = $(data.responseText).find('#tabz').html();
                    var inboxNum = '(' + $(tabs).find('a:eq(0) em').text().split('(')[1];
                    var outboxNum = '(' + $(tabs).find('a:eq(1) em').text().split('(')[1];

                    $('#DDinbox').text(DDM.language.inbox + ' - ' + inboxNum);
                    $('#DDoutbox').text(DDM.language.outbox + ' - ' + outboxNum);
                }
            });
        }
    },
    fetchCRsCount:function(){
        if(this.mChecked == false) {
            GM.ajax({
                method: 'GET',
                url: 'http://' + DDM.server + '/index.php?view=militaryAdvisorMilitaryMovements',
                headers: GM.ajaxHeaders,
                onload: function(data) {
                    DDM.mChecked = true;

                    var tabs = $(data.responseText).find('#mainview').html();
                    var movementsNum = '(' + $(tabs).find('a:eq(0) em').text().split('(')[1];
                    var crsNum = '(' + $(tabs).find('a:eq(1) em').text().split('(')[1];

                    $('#DDtroops').text(DDM.language.troops + ' - ' + movementsNum);
                    $('#DDcrs').text(DDM.language.crs + ' - ' + crsNum);
                }
            });
        }
    },
    fetchResearch:function(){
        if(this.rChecked == false) {
            GM.ajax({
                method: 'GET',
                url: 'http://' + DDM.server + '/index.php?view=researchAdvisor',
                headers: GM.ajaxHeaders,
                onreadystatechange:function(){
                    $('#menuR table').html(GM.ajaxLoadGif);
                },
                onload: function(data) {
                    DDM.rChecked = true;

                    var c = 0;
                    var research = '';
                    var RP = parseInt($(data.responseText).find('ul.researchLeftMenu li.points').text().split(':')[1].replace(/,|\./g, ''));

                    $(data.responseText).find('#currentResearch div:first ul li[class*="researchType"]').each(function(){
                        var title = DDM.strips($(this).find('div h4 a').text());
                        var cost = parseInt($(this).find('div.costs ul.resources li.researchPoints').text().replace(/,|\./g, ''));
                        var percentComplete;

                        if(((RP / cost) * 100) > 100) { percentComplete = '100%'; }
                        else { percentComplete = parseInt((RP / cost) * 100) + '%'; }

                        research += '<tr><td><a id="DDres' + c++ + '">' + title + ' - ' + percentComplete + '</a></td></tr>';
                    });

                    $('#menuR table').html(research);
                }
            });
        }
    },
    transportsEnRoute:function(){
        var shipNums = $('#globalResources ul li:first a span:eq(1)').text();
        var totalShips = parseInt(shipNums.split('(')[1].replace(')',''));
        var availShips = parseInt(shipNums.split('(')[0]);
        
        if(totalShips != availShips){
            return true;
        } else {
            return false;
        }
    },
    renderCities:function(){
        var newsRow = '<tr><td><a id="DDnews" href="?view=tradeAdvisor">' +
            this.language.news + '</a></td></tr>';
        var routesRow = '<tr><td><a id="DDroutes" href="?view=tradeAdvisorTradeRoute">' +
            this.language.routes + '</a></td></tr>';
//        var transRow = '<tr><td><a id="DDtrans" href="?view=merchantNavy">' +
//            this.language.transports + ' - (?)</a></td></tr>';
var transRow = '';
        var brandRow = '<tr><td><a id="DDbrand" href="#">Menu v' + this.curVer + '</a></td></tr>';

        var menuC = $('<div id="menuC"></div>');
            menuC.html('<table>' + newsRow + routesRow + transRow + brandRow + '</table>');
        $('#advCities').append(menuC);

        $('#DDbrand').bind('click', function(){
           ScriptUpdater.forceNotice(DDM.usNum, DDM.curVer);
        });

        $('#advCities a span').hoverIntent({
            sensitivity: DDM.hiSensitivity,
            interval: DDM.hiInterval,
            timeout: DDM.hiTimeout,
            over:function(){
                if(DDM.menuOpen == true) {
                    $(DDM.openMenu).hide();
                }
                DDM.openMenu = '#menuC';
                //DDM.fetchTransports();
                $(DDM.openMenu).show();
                DDM.menuOpen = true;
            },
            out:function(){
                $('#menuC').bind('mouseleave', function(){
                    $(this).fadeOut(DDM.fadeOut);
                    DDM.menuOpen = false;
                })
            }
        });
    },
    renderMilitary:function(){
         var troopsRow = '<tr><td><a id="DDtroops" href="?view=militaryAdvisorMilitaryMovements">' +
            this.language.troops + ' - (?)</a></td></tr>';
        var crRow = '<tr><td><a id="DDcrs" href="?view=militaryAdvisorCombatReports">' +
            this.language.crs + ' - (?)</a></td></tr>';
        var archiveRow = '<tr><td><a id="DDarchives" href="?view=militaryAdvisorCombatReportsArchive">' +
            this.language.archives + '</a></td></tr>';

        var menuM = $('<div id="menuM"></div>');
            menuM.html('<table>' + troopsRow + crRow + archiveRow + '</table>');
        $('#advMilitary').append(menuM);

        $('#advMilitary a span').hoverIntent({
            sensitivity: DDM.hiSensitivity,
            interval: DDM.hiInterval,
            timeout: DDM.hiTimeout,
            over:function(){
                if(DDM.menuOpen == true) {
                    $(DDM.openMenu).hide();
                }
                DDM.openMenu = '#menuM';
                DDM.fetchCRsCount();
                $(DDM.openMenu).show();
                DDM.menuOpen = true;
            },
            out:function(){
                $('#menuM').bind('mouseleave', function(){
                    $(this).fadeOut(DDM.fadeOut);
                })
            }
        });
    },
    renderResearch:function(){
        var menuR = $('<div id="menuR"><table></table></div>');
        $('#advResearch').append(menuR);

        $('#advResearch a span').hoverIntent({
            sensitivity: DDM.hiSensitivity,
            interval: DDM.hiInterval,
            timeout: DDM.hiTimeout,
            over:function(){
                if(DDM.menuOpen == true) {
                    $(DDM.openMenu).hide();
                }
                DDM.openMenu = '#menuR';
                DDM.fetchResearch();
                $(DDM.openMenu).show();
                DDM.menuOpen = true;
            },
            out:function(){
                $('#menuR').bind('mouseleave', function(){
                    $(this).fadeOut(DDM.fadeOut);
                })
            }
        });
    },
    renderDiplomacy:function(){
        var inboxRow = '<tr><td><a id="DDinbox" href="?view=diplomacyAdvisor">' +
            this.language.inbox + ' - (?)</a></td></tr>';
        var outboxRow = '<tr><td><a id="DDoutbox" href="?view=diplomacyAdvisorOutBox">' +
            this.language.outbox + ' - (?)</a></td></tr>';
        var treatyRow = '<tr><td><a href="?view=diplomacyAdvisorTreaty">' +
            this.language.treaty + '</a></td></tr>';
        var allianceRow = '<tr><td><a href="?view=diplomacyAdvisorAlly">' +
            this.language.alliance + '</a></td></tr>';

        var menu = $('<div id="menuD"></div>');
            menu.html('<table>' + inboxRow + outboxRow + treatyRow + allianceRow + '</table>');
        $('#advDiplomacy').append(menu);

        $('#advDiplomacy a span').hoverIntent({
            sensitivity: DDM.hiSensitivity,
            interval: DDM.hiInterval,
            timeout: DDM.hiTimeout,
            over:function(){
                if(DDM.menuOpen == true) {
                    $(DDM.openMenu).hide();
                }
                DDM.openMenu = '#menuD';
                DDM.fetchMsgCount();
                $(DDM.openMenu).show();
                DDM.menuOpen = true;
            },
            out:function(){
                $('#menuD').bind('mouseleave', function(){
                    $(this).fadeOut(DDM.fadeOut);
                })
            }
        });
    }
};

IkaTools.init();
DDM.init();
ScriptUpdater.check(DDM.usNum, DDM.curVer);