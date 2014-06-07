// ==UserScript==
// @name           Research Points Helper Arabic
// @namespace      kkhweb.com
// @author         yazmat
// @version        1.2
// @description    shows how long until new researches can be bought with research points and how many research points remain
// @include        http://*.ikariam.tld/index.php?view=researchAdvisor*
// @exclude        http://www.ika-world.com/*
// @exclude        http://ikariamap.com/*
// @exclude        http://board.ikariam.org/*
// @exclude        http://*.ikariam.*/index.php?view=options
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @history	   1.2 Update added
// @history	   1.1 fixed a bug that used to enlarge the page
// ==/UserScript==

// A translation of the Research Points Helper made by kevinhill in arabic 
// you can download the original script at http://userscripts.org/scripts/show/60569

var startTime = new Date().getTime();
var usNum = 69311;
var curVer = '1.2';

(function (){

ScriptUpdater.check(usNum, curVer);

var updateCheckButton = $('<a></a>');
    updateCheckButton.attr('id', 'updateCheck');
    updateCheckButton.css({
        'margin':'10px',
        'cursor':'pointer',
        'font-size':'smaller'
    });
	
    var updateLine = '<div style="float:left;margin-left:10px;">Check For Latest Version of Research Points Helper</div>';
        updateLine += '<div style="float:right;margin-right:10px;">v' + curVer + '</div>';
    updateCheckButton.html(updateLine);
    updateCheckButton.click(function() {
        ScriptUpdater.forceNotice(usNum, curVer);
    });

//$('div#currentResearch div.content').after(updateCheckButton);

function strips(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function addCommas(number) {
number = '' + number;
if (number.length > 3) {
var mod = number.length % 3;
var output = (mod > 0 ? (number.substring(0,mod)) : '');
for (i=0 ; i < Math.floor(number.length / 3); i++) {
if ((mod == 0) && (i == 0))
output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
else
output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
}
return (output);
}
else return number;
}

function makeTime(time) {
    var daysT = '<span style="font-size:smaller"> يوم </span>';
    var hrsT = '<span style="font-size:smaller"> ساعة </span>';
    var minT = '<span style="font-size:smaller"> دقيقة </span>';

    time = time / 24;
    var days = parseInt(time);
    time -= parseInt(time); time *= 24;
    var hours = parseInt(time);
    time -= parseInt(time); time *= 60;
    var min = parseInt(time);

//arabe Test
	if(days < 11 && days > 1) daysT = '<span style="font-size:smaller"> أيام </span>';
	if(hours < 11 && hours > 1) hrsT = '<span style="font-size:smaller"> ساعات </span>';
	if(min < 11 && min > 1) minT = '<span style="font-size:smaller"> دقائق </span>';

    if(days > 0 && hours > 0 && min > 0) {
        return days+daysT +hours+hrsT +min+minT;
    }
    
    if(days == 0 && hours > 0 && min > 0) {
        return hours+hrsT +min+minT;
    }
    
    if(days == 0 && hours == 0 && min > 0) {
        return min+minT;
    }
    
    if(days == 0 && hours == 0 && min == 0) {
        return 0;
    }
}

var tmp = $('ul.researchLeftMenu li.time').text();
var tmp2 = tmp.split(':');
var RPph = parseInt(tmp2[1]);

tmp = $('ul.researchLeftMenu li.points').text();
tmp2 = tmp.split(':');
var RP = parseInt(tmp2[1].replace(',', ''));

// Finds and calculates per research
$('div.content ul.researchTypes li.researchType div.researchInfo').each(function (){
    var title = strips($(this).find('h4 a').text());
    var cost = $(this).find('div.costs ul.resources li.researchPoints').text().replace(',', '');

    GM_setValue(title, cost);

//Can't Afford
    if(cost > RP) {
        var remain = $('<li></li>');
            remain.addClass('researchPoints');
            remain.attr('id', 'remain');
            remain.css({
                'color':'red',
                'display':'block'
            });
            remain.text('-' + addCommas(cost - RP));
            $(this).find('div.costs ul.resources li.researchPoints').after(remain);

        var decimalHrs = (cost - RP) / RPph;
        var timeString = makeTime(decimalHrs);

        $(this).find('h4 a').html(title + '<br/>متوفر بعد ~ ' + timeString);
        
        var costTitle = $('<p></p>');
            costTitle.css({
            	'width':'100px',
                'font-size':'12px',
                'font-weight':'bold',
                'margin':'2px 2px'
            });
            costTitle.html('ثمن البحث :<br>');
        $(this).find('div.researchButton2').html(costTitle);

//Prev Research Req
    } else if(cost == '') {
        var t = $(this).find('div.researchButton2');
        t.css({
                'font-size':'12px',
                'font-weight':'bold',
                'margin-top':'-20px'
            });
        $(this).find('h4 a').html(title + '<br/>يلزم بحث سابق !');

//Purchase
    } else if(cost <= RP) {
        var surplus = $('<li></li>');
            surplus.addClass('researchPoints');
            surplus.attr('id', 'remain');
            surplus.css({
                'color':'green',
                'display':'block'
            });
            surplus.text('+' + addCommas(RP - cost));
            $(this).find('div.costs ul.resources li.researchPoints').after(surplus);

        $(this).find('h4 a').html(title + '<br/>متوفر للشراء !');
    }

});

})(); //Script End

var endTime = new Date().getTime();

GM_log('Exec Time: ' +((endTime - startTime)/1000)+'s');
