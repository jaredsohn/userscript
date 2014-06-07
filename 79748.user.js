// ==UserScript==
// @name           Ikariam Research Points Helper
// @namespace      kkhweb.com
// @author         kevinhill
// @version        2.0
// @history        2.0 Code Re-Writen in OOP, fixed Futures bug
// @description    shows how long until new researches can be bought with research points and how many research points remain
// @include        http://*.ikariam.tld/index.php?view=researchAdvisor*
// @exclude        http://www.ika-world.com/*
// @exclude        http://ikariamap.com/*
// @exclude        http://board.ikariam.org/*
// @exclude        http://*.ikariam.*/index.php?view=options
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// ==/UserScript==

//NOTICE: I have not gotten this script approved, by installing this you are using it at your own risk

if(!RPH) {var RPH;}

RPH = {
//Member Data
    curVer:         '2.0',
    usoNum:         60569,
    domain:         '',
    locale:         '',
    language:       '',
    RPph:           0,
    currentRP:      0,

//Member Functions
    getNum : function(str){return parseInt(str.replace(/,/g,''));},
    strips : function(str){return str.replace(/^\s\s*/, '').replace(/\s\s*$/,'');},
    addCommas : function(number){number=''+number;if(number.length>3){var mod=number.length%3;var output=(mod>0?(number.substring(0,mod)):'');for(i=0;i<Math.floor(number.length/3);i++){if((mod==0)&&(i==0))output+=number.substring(mod+3*i,mod+3*i+3);else output+=','+number.substring(mod+3*i,mod+3*i+3)}return(output)}else return number},
    updateCheck : function(){
        ScriptUpdater.check(this.usoNum, this.curVer);
    },
    attachUpdateButton : function(){
        var updateLine = '<div style="float:left;margin-left:10px;">' + this.language.update + ' ' + this.language.title + '</div>';
            updateLine += '<div style="float:right;margin-right:10px;">v' + this.curVer + '</div>';
        var updateCheckButton = $('<a id="updateCheck">'+updateLine+'</a>');
            updateCheckButton.click(function() {
                ScriptUpdater.forceNotice(RPH.usoNum, RPH.curVer);
            });
        $('div#currentResearch div.content').after(updateCheckButton);
    },
    init : function(){
        this.domain = document.location.host;
        this.locale = this.domain.split('.')[3];
        this.language = this.loadLang(this.locale);
        this.RPph = RPH.getNum($('ul.researchLeftMenu li.time').text().split(':')[1]);
        this.currentRP = RPH.getNum($('ul.researchLeftMenu li.points').text().split(':')[1]);

        this.loadCSS();
        this.attachUpdateButton();

    // Finds and calculates per research
        $('#currentResearch div:first ul').children('li').each(function(){
            var title = RPH.strips($(this).find('div h4 a').text());
            var cost = RPH.getNum($(this).find('div.costs ul.resources li.researchPoints').text());

            GM_setValue(title, cost);

    //Can't Afford
            if(cost > RPH.currentRP) {
                var remain = $('<li class="researchPoints remain">-' +RPH.addCommas(cost - RPH.currentRP) +'</li>');
                $(this).find('div.costs ul.resources li.researchPoints').after(remain);

                var timeString = RPH.makeTime((cost - RPH.currentRP) / RPH.RPph);
                var percentComplete = parseInt(100 * (RPH.currentRP / cost));
                var percentBar = parseInt (150 * (percentComplete / 100));

                var bar = '<div class="barContainer" style="margin-top:-22px;width:150px;height:8px;border:1px solid #542c0f;">';
                    bar += '<div id="bar' + title.substr(0,3) + '" style="height:8px;background-color:#542c0f;">&nbsp;</div></div>';

                $(this).find('h4 a').html(title +' - %' +percentComplete +'<br/>' +RPH.language.availIn +timeString);
                $(this).find('div.leftBranch').append(bar);
                $('#bar'+ title.substr(0,3)).css('width', percentBar+'px');

                var costTitle = $('<span class="price">' +RPH.language.priceFor +'</span>');
                $(this).find('div.researchButton2').html(costTitle);

    //Prev Research Req
            } else if(cost == '') {
                $(this).find('div.researchButton2').css({
                    'font-size':'12px',
                    'font-weight':'bold',
                    'margin-top':'-20px'
                });
                $(this).find('h4 a').html(title + '<br/>' + RPH.language.prev);

    //Purchase
            } else if(cost <= RPH.currentRP) {
                var surplus = $('<li class="researchPoints surplus">+' +RPH.addCommas(RPH.currentRP - cost)+'</li>');

                $(this).find('div.costs ul.resources li.researchPoints').after(surplus);
                $(this).find('h4 a').html(title + '<br/>' + RPH.language.availNow);
            }
        });
    },
    loadLang : function (loc) {
        var lang = new Array();
        switch(loc) {
            default:
            case 'com':
            case 'org':
                lang.name = 'English';
                lang.update = 'Update';
                lang.title = 'Research Points Helper';
                lang.priceFor = 'נקודות עבור<br/>שדרוג:';
                lang.availIn = 'יתאפשר עוד:  ';
                lang.availNow = 'אפשרי';
                lang.prev = 'Previous Research is Required.';
                lang.time = new Array();
                    lang.time.days = unsafeWindow.LocalizationStrings.timeunits.short.day+' ';
                    lang.time.hrs = unsafeWindow.LocalizationStrings.timeunits.short.hour+' ';
                    lang.time.mins = unsafeWindow.LocalizationStrings.timeunits.short.minute+' ';;
            break;
        }
    return lang;
    },
    makeTime : function(time) {
        var daysT = '<span style="font-size:smaller">' + this.language.time.days + '</span>';
        var hrsT = '<span style="font-size:smaller">' + this.language.time.hrs + '</span>';
        var minT = '<span style="font-size:smaller">' + this.language.time.mins + '</span>';

        time = time / 24;
        var days = parseInt(time);
        time -= parseInt(time);time *= 24;
        var hours = parseInt(time);
        time -= parseInt(time);time *= 60;
        var min = parseInt(time);

    //alert(days + ' ' + hours + ' ' + min);

        if(days > 0 && hours > 0 && min > 0) {
            return days+daysT +hours+hrsT +min+minT;
        } else if(days == 0 && hours > 0 && min > 0) {
            return hours+hrsT +min+minT;
        } else if(days > 0 && hours == 0 && min > 0) {
            return days+daysT +min+minT;
        } else if(days > 0 && hours > 0 && min == 0) {
            return days+daysT +hours+hrsT;
        } else if(days == 0 && hours == 0 && min > 0) {
            return min+minT;
        } else {
            return min+minT;
        }
    },
    loadCSS : function(){
        GM_addStyle(
            '#updateCheck {margin:10px; cursor:pointer; font-size:smaller}' +
            '.remain {color:red; display:block !important;}' +
            '.surplus {color:green; display:block !important;}' +
            '.researchButton2 .price {font-size:12px; font-weight:bold; margin:2px 2px !importnat;}' +
            ''
        );
    }
};

//var $$ = function(m){unsafeWindow.console.log(m);};

//Run
IkaTools.init();
RPH.init();
RPH.updateCheck();
