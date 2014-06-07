// ==UserScript==
// @id		faz-stock-market-game-calculator
// @name        FAZ: Stock market game calculator
// @namespace   http://userscripts.org/scripts/show/320093
// @description Calculate the real price you need to make profit with a paper [Benjamin Biersky 2014]
// @include    	http://boersenspiel.faz.net/a/depot.cgi
// @match      	http://boersenspiel.faz.net/a/depot.cgi
// @updateURL	http://userscripts.org/scripts/source/320093.user.js
// @downloadURL	http://userscripts.org/scripts/source/320093.user.js
// @version     0.7.0.0 Alpha
// ==/UserScript==
var benchmark = new Object();
benchmark.start =  new Date().getTime();

//#### here will you find all texts ##################################################
// you can change the entrys self
function language () {
    var that = this;
    this.english = new function () {
        this.title1 = 'This is the Price you need to make profit!';
        this.title2 = 'This is the differenz from the price you need to the current price in percent';
        this.settingTitle = 'Click for open/close settings';
        this.expandTitle = 'Show more information';
        this.collapseTitle = 'Show less information';
        this.settingBenchmark = 'Show benchmark';
        this.settingWinPercent = 'Default winpercent';
        this.settingExpand = 'On load expand all paperinformation';
        this.settingLanguage = 'Language';
        this.labelWin = 'Winpercent';
        this.labelLimits = 'Limits';
    }
    this.deutsch = new function () {
        this.title1 = 'Aktienwert der erreicht werden muss um Gewinn zu machen!';
        this.title2 = 'Die Differenz vom Aktuellen Aktienwert zu dem Gewinnwert';
        this.settingTitle = '&Ouml;ffnet / Schliest die Einstellungen';
        this.expandTitle = 'Mehr Informationen';
        this.collapseTitle = 'Weniger Informationen';
        this.settingBenchmark = 'Zeige Benchmark';
        this.settingWinPercent = 'Standart Gewinn (in Prozent)';
        this.settingExpand = 'Beim start alle Aktieninformationen anzeigen';
        this.settingLanguage = 'Sprache';
        this.labelWin = 'Gewinnprozent';
        this.labelLimits = 'Limits';
    }
    this.get = function (lang) {
        switch(lang) {
            case'deutsch':
                return that.deutsch;
                break;
            case'english':
                return that.english;
                break;
            default:
                return that.deutsch;
        }
    }
}
var lang = 'deutsch';
if(GM_getValue('language') != undefined) {
    lang = GM_getValue('language');
}
var lang2 = new language;
window.language = lang2.get(lang);

//#### the object constant contains the constants from the game like charges ################
// you can update the entrys self
function constant () {
    this.CHARGES = 10.23;
    this.PERCENT = 0.004;
    this.LIMITS = 2.56;
    this.EURO = '&#x00A0;&#x20AC;'; 
    this.SIGN = '&#x00A0;%';
    this.WINPERCENT = 5;
    
    //the target table css class on faz
    //when faz change the value you can fix it self
    this.TABLE = '.DatenTabelle';
    
    //the new targetid for the table (required for jquery)
    //when the id create collisions with real exist id´s change the value
    this.TARGETID = 'jqTC';
}
window.constant = new constant;

//#### CSS Styles ###############################################################################
function styles () {
    this.notification = {
        'position':'fixed',
        'top':'0px',
        'left':'0px',
        'z-index':'15',
        'width':'100%',
        'background-color':'#fff8c4',
        'text-align':'left',
        'padding':'5px',
        'font-size':'1em',
        'line-height':'1em',
        'font-family':'Verdana',
        'border-bottom':'1px solid #f2c779',
        'cursor':'pointer'
    };
    this.settingIcon = {
        'position':'fixed',
        'top':'30px',
        'left':'0px',
        'height':'30px',
        'width':'30px',
        'cursor':'pointer',
        'z-index':'14'
    };
}
window.styles = new styles;

//#### images object cointain the base64 code from the icons and pictures ##########################
//Source: The images came from the android 'Action Bar Icon Pack'
//Url: http://developer.android.com/design/style/iconography.html
function images () {
    this.expand = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE'+
        '1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6'+
        'bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodH'+
        'RwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29t'+
        'L3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS'+
        '9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMTQ4RkNBOTVCMEQx'+
        'MUUxOTQxOUU0QkNBRjUxNzRCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMTQ4RkNBQTVCMEQxMUUxOTQxOUU0QkNBRjUxNzRCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdF'+
        'JlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIwQjc5QTI0NUIwRDExRTE5NDE5RTRCQ0FGNTE3NEIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIxNDhGQ0E4NUIwRDExRTE5NDE5'+
        'RTRCQ0FGNTE3NEIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+PWL1wgAAAxhJREFUeNrsmMtrU0EUh+fGmC'+
        'Y+NlEKXVS6sAhFu6gX3FgKgqCCtVQQFR9UCm7c+I90Y4UuqvgAUfFBN7oQKu6sBLcF60oXlooPfMcmuf5GfgPDcFGTmzu32HPgg/QmuXPON3PPTBNEUaRWcwQiQASIABEgAkSACBAB'+
        'IkAEiAARIAJEgAgQASJABIgAEfCnCMPQvCyAQ2AOvMoo/y1gF5gBP/WFSqXS1A1yCQbfA4bBCdCZQfGdHHuYubQUrQrYCUbBD9ALzoMej8X3cMxe5jDKnLwI2AHGwBrQ4NLrYkKhh+'+
        'JDjtXFsRvMZYy5pS5gAJRB3bpWBRvAeJLl+I+P3TjHqlrX68xpoNkb5ltI4h4b4G4mYbpoDawFJ8FmcNeRlCT0DB8G+znjNbuRgw7wmLmlLuAzuAI+gX1OQjUmdABsBDfA94TFl8Bx'+
        'MMglHzn561X8gMUv+xCgONAt8BYc4X3MbEdMdAhsAtPgfYvjlLnkt7PZRc6q0HncBrO+dwETsyzwK5ehsiTome9LsEOYTt/He9nFd3DM6STFt0PA77MHuAAW2RuU0xy7wTnQ38Q9+/'+
        'mdbqfZmQPYIsesJE0+16Ym9RJMgBd8ZgNHgl7KZ/kc/y0G+dlyTPEljjHBMdVKEaBjibPylLMUOD2jyL16xHnPzmWEnyk6DS3gtTmOsdSupPOqvfEFXAIfwV42xrq1Q+R4dNXN8bo5'+
        'v1PYMTbOOncWu9lpHoE7bIZqpQowS15vfx94RM1b22SDzWyIh5nLvH6Gh5hqzDbXYKd/mMbJKg0BJnTC78ApsM5a0maH0AWv57VtMTOrD1XfwDXwLK0k0xSgmLg+OJ3m2d0uUr/ear'+
        '22Qz/vb8BVMJ9mgjmVfugCLoIFFuYeqJZjil/gd+bTTs6HAB2vwSR4HrNN2p2+xM9M8jvqfxGguDNMsZsX2NntTl/ge1P8rJfIK79R5fan/5E66EzAff605TV8CzAxw1k+yr9vgidZ'+
        'JJKVAMWCi9brTEJ+FhcBIkAEiAARIAJEgAgQASJABIgAESACRIAIEAEiQASsqvglwAD3pyIbjjqAzwAAAABJRU5ErkJggg==';
    this.collapse = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0'+
        'WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bn'+
        'M6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo'+
        'dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY2'+
        '9tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlw'+
        'ZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMEI3OUExQTVCME'+
        'QxMUUxOTQxOUU0QkNBRjUxNzRCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMEI3OUExQjVCMEQxMUUxOTQxOUU0QkNBRjUxNzRCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBz'+
        'dFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIwMjcxQTA3NUIwRDExRTE5NDE5RTRCQ0FGNTE3NEIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIwMjcxQTA4NUIwRDExRTE5ND'+
        'E5RTRCQ0FGNTE3NEIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+OI2sywAAAuxJREFUeNrsms1rE0EYxrP5'+
        'sBWtikLRg+BBBa8aqgdBqqhU8PPQiqCC1lPxYP8RDwpFUOvXoRQs6kHxEig9CWsOFXqph0IPBcEgWDBtYtdn4AkMw7aQdDcm2eeFHw3Zna/fzrwz29YLgiCV5EinEh4SIAESIAESIA'+
        'ESIAESIAESIAESIAESIAESIAEJi2y9BfL5fJTtn+fPz1FV6Pt+vAIijFPgCj+XwXRbzICI4jK4CGq/k78JdoH3nS6gCwyCM6AK1vh9BlwFO8AkWOlEAeYJ3wbHOOXtv8j8pYyzYDd4'+
        'CX51koD9HPwh8GedewJeOwp6KGGxE7bBI2CEgy8713LEjjLvHWHZthbQx4H0hgy+G3wn3SESelm2r12XwAC4RskV63uPybAInvO7OyG5wZTZCu6BPeBTu8wAM7gbzPYes73dnpFeAG'+
        'PgNxnjOSDr9KnKOgZZZ1erz4Dt4Ban7aqT6bMczAeyZl1b5Wz4CS5RQtXZIc5xJ3kFlltRgFmzd5m43G0uxww/AWY22AXeUcJ1Tv+Kdc1IOgF2gmfgRystgYNgFBzmQANnSZTAkw0G'+
        'b8cM7y05U762TZo2HoADrSLAvB3dB3v5lNx8YPbyx2C2jjpnWWYxZN2bNvZRQv5/CzgNhsE25/jqcQrPgYdgoYG6F1h2jnV51rUV5pth9qHpAsyaHuJLTI6Jyh78Fmb1R5zKjUaJdU'+
        'yzTs/ZIXLsw1DIgSq2JNjDJHWST8LN9EbqR/DWEdNomHX/gtvlAHeEqrNNXuCL1ATvi3UGmMNN/zqDN1n7Nd/oohi8/bI0yborzoML2Jd+9i32JVDk1Mw4yc7szU95yIkrCmxj2UmO'+
        'Gfap2AwB38A4n0qaa3OJCctPxR8+21pi22n2ZZx9a0oS/Aqm+BIzv4lM32jUdoh59mGKfWrqSbDAhPglqlNZnWHafAOOb2bZefpX2YSHBEiABEiABEiABEiABEiABEiABEiABEiABE'+
        'hAwuKfAAMA60iqdtHtkNkAAAAASUVORK5CYII=';
    this.settings = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0'+
        'WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bn'+
        'M6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo'+
        'dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY2'+
        '9tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlw'+
        'ZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0MTA4NzIxQTVCME'+
        'QxMUUxOTQxOUU0QkNBRjUxNzRCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0MTA4NzIxQjVCMEQxMUUxOTQxOUU0QkNBRjUxNzRCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBz'+
        'dFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQxMDg3MjE4NUIwRDExRTE5NDE5RTRCQ0FGNTE3NEIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQxMDg3MjE5NUIwRDExRTE5ND'+
        'E5RTRCQ0FGNTE3NEIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+afRGqwAAAvlJREFUeNrsW81qFEEQ7p5d'+
        '8Y+VGKLiQfAgxlOCsCfvngURnyAQBMFH8BkiihefQETw6l1BWNAIEiM5BCIEQ9gkBKNidsYqrIFBt2d6pn+2M10F32G3h57pr7ur+qupkVmWiZgtEZEbE8AEMAFxW7essd/vT/r5Oo'+
        'BzgAv0+xtgC5DW6WQwGDQjIAC7ArgBmKHf24C3gFUvK2DCNgdYAEwDRoUti8vyGeB9m30ALv3bgB7gO+An4QBwCnCLrmktAV1a9odj2vC/84CptkcBlaPLz+692MNgFjsBXqLARcC8'+
        'R6Jw2b8hh6ezAiTgZsk4sL9lwGZTAi4B7tJ1rnWzJAe3AviqSQBOzB2KDCNFf0MTAiTdpOOJgLThNk5K+pMmW+ALYKmqE8uObUszxucDfFwyQfjfugkBOwTfdlyTABzgB44CkRIg20'+
        '5AUjHw/ZAJSAz7PiTp21X4LXSUuyHK4VlL+h1j+suCHM4Ksz+ktlFoBIzT7xierpN+/1izP7z+CRGaR4VfoSZE/tXvRetR26cGs7Zqc7AufcAUaXSVfp8RgWafbBHQq5CoqQjUbBFw'+
        'ZF8wcj6gov0s4LLi1CXJqS1rrgC85iTgmmdxtV6mZ6oIuAq4Bzg2ZpC4ejBLu6hJwIgSLA8U/bk4Kv8GPAW84y3gIB+Qb4FUc0l36Ai7NIEt4DwfIDWv+SEsvdHhKBAYATJ2AvYriE'+
        'jaTsAuOTiVft9W6ITgo0Ad/f6K5PCZwtm/Y6jfZ4+KHBbk3R8JewUNc4qESNP8gnMCivo9MVSBrvIL3pxTaiiBuT5AcH2AnxwEiyGDfICrWf2s6dzy+oB5Uf1y1Ek+wJV+fyjq1Qfc'+
        'F3/rA9Im+YCuxk1SmpFQ6wPSwjOO6y8z2QIbgOfCb4nMUPN++QBfiPISmQ0TAjZFSXmJQ6tTH/Cao0CkBHB9QJsJ8FYfECoBeX0AzvJpwAkCxvsDyj0EVx9g24r1AVF+MIG2BtgT/3'+
        '8yY8+T8pejfA5gApgAJiBi+yPAANUHz0cK54IqAAAAAElFTkSuQmCC';
}
window.images = new images;
//##### calculate the values ###########################################################
function calculater () {
    var that = this;    
    this.roundValue = function (value, digits) {
        var x = 1; 
        if(digits > 0) { 
            for(var i = 0;i<digits;i++) { 
                x = x + '0'; 
            } 
        } 
        return Math.round(value*x)/x;
    }
    
    this.calcPercent = function(percent) {
        var value = (percent+100)/100;
        return that.roundValue(value,4);
    }
    
    this.calcCharges = function (amount, price, limits) {
        var value = ((2*window.constant.CHARGES) + (window.constant.LIMITS*limits) + ((price*amount) * window.constant.PERCENT))/amount; 
        return that.roundValue(value,4); 
    }
    
    this.calcNeedPrice = function (amount, oldprice, limits, winpercent) { 
        var value = (oldprice + that.calcCharges(amount, oldprice, limits))*that.calcPercent(winpercent);
        value = value + (((value * amount) * window.constant.PERCENT)/amount);
        return that.roundValue(value,2); 
    }
    
    this.calcDifferenz = function (oldValue, newValue) { 
        var value = ((100*newValue) / oldValue) - 100; 
        return that.roundValue(value,2); 
    } 
    
}
window.calculator = new calculater;

//#### Change the Strings #############################################################
function converter () {
    this.dotToZero = function (value) {
        var x = value.replace('.', '');
        return parseInt(x);
    }
    this.commaToDot = function (value) {
        var x = value.replace(',', '.');
        return parseFloat(x);
    }
    this.dotToComma = function (value) {
        var x = String(value);
        x = x.replace('.', ',');
        return x;
    }
}
window.converter = new converter;

//#### site manipulation objects and functions ###################################################
function table () {
    var that = this;
    this.setID = function (targetID) {
        $(window.constant.TABLE).eq(0).attr('id',targetID);
    }
    this.prepare = function(tID) {
        that.insert(tID);
    }
    
    this.getValue = function(row,index,convertToCount) {
        var rawvalue = row.find('td').eq(index).text();
        var value = 0;
        switch (convertToCount) {
            case true:
                value = window.converter.dotToZero(rawvalue);
                break;
            case false:
                value = window.converter.commaToDot(rawvalue);
                break;
            default:
                value = rawvalue;
                break;
        }
        return value;
    }
    
    this.build = new function() {
        var that = this;
        this.negativArrow = function() {
            return '<span class="negativArrow">&nbsp;</span>';
        }
        this.positivArrow = function() {
            return '<span class="positivArrow">&nbsp;</span>';
        }
        this.getArrow = function(positiv) {
            if(positiv) {
                return that.positivArrow();
            } else {
                return that.negativArrow();
            }
        }
        
        this.negativVal = function(value, sign, title) {
            return '<span class="negativVal" title="'+title+'">'+value+sign+'</span>';
        }
        this.positivVal = function(value, sign, title) {
            return '<span class="positivVal" title="'+title+'">'+value+sign+'</span>';
        }
        this.getVal = function (positiv, value, sign, title) {
            if(positiv) {
                return that.positivVal(value, sign, title);
            } else {
                return that.negativVal(value, sign, title);
            }
        }
        
        this.getExpander = function (id,image,title) {
            return '<a id="'+id+'" class="expander"><img title="'+title+'" width="30" height="25" src="'+image+'" /></a>'
        }
        this.setExpanderClickEvent = function(expand,id,collapseImage,collapseTitle,expandImage,expandTitle) {
            function expandex () {
                var x = $(this).attr('id').substr(3,1);
                $(this).find('img').attr({src: expandImage, title: expandTitle});
                $('#wpprow'+x).hide();
            }
            function collapse () {
                var x = $(this).attr('id').substr(3,1);
                $(this).find('img').attr({src: collapseImage, title: collapseTitle});
                $('#wpprow'+x).show();
            }
            if(!expand){
                $(id).toggle(collapse,expandex);
            } else {
                $(id).toggle(expandex,collapse);
            }
        }
    }
    
    this.insert = function (tID) {
        var c = $(tID).find('tr').length;
        var data = {};
        if(window.storage.get('data') != '0') {
            data = window.storage.data.load();
        }
        var rounds = ((c-4)/3);
        var rows = $(tID).find('tr');
        for(var i = 0; i < rounds;i++) {
            var x = (i*3)+1;
            
            var count = that.getValue(rows.eq(x+1),0,true);
            var date = that.getValue(rows.eq(x+1),1,null);
            var price = that.getValue(rows.eq(x+1),2,false);
            var currentprice = that.getValue(rows.eq(x+1),3,false);
            
            
            var pID = count+date+price;
            var pName = rows.eq(x).find('span').eq(0).text();
            pName = pName.replace('| ','');
            var xwin = window.storage.get('winpercent');
            var xlimit = 2;
            
            //alert(JSON.stringify(data[pID]));
            
            if(data[pID] != undefined) {
                xwin = data[pID]['w'];
                xlimit = data[pID]['l'];
            } else {
                window.storage.data.add(pID,{'n':pName,'l':2,'w':xwin});
            }
            
            var newprice = window.calculator.calcNeedPrice(parseFloat(count),parseFloat(price),parseFloat(xlimit),parseFloat(xwin));
            var diff = window.calculator.calcDifferenz(parseFloat(newprice),parseFloat(currentprice));
            
            var value = true;
            if(diff < 0) {
                value = false;
            }
            var text1 = that.build.getVal(value,window.converter.dotToComma(String(newprice)),window.constant.EURO,window.language.title1);
            var text2 = that.build.getArrow(value);
            text2 += that.build.getVal(value,window.converter.dotToComma(String(diff)),window.constant.SIGN,window.language.title2);
            var htmlWinpercent = '<input id="percent'+i+'" style="width:1.5em;" type="text" value="'+xwin+'" />' +window.constant.SIGN;
            var htmlLimits = '<input id="limit'+i+'" style="width:1.5em;" type="text" value="'+xlimit+'" />' +window.language.labelLimits; 
            var style = {'display':'none'};
            var image = window.images.expand;
            var expand = false;
            if(window.storage.get('expandall') == '1') {
                expand = true;
            }
            if(expand) {
                style= {'display':'table-row'};
                image = window.images.collapse;
            }
            rows.eq(x).find('td').eq(1).find('a:last').after(that.build.getExpander('exp'+i,image,window.language.expandTitle));
            rows.eq(x).after('<tr id="wpprow'+i+'"><td>'+htmlWinpercent+'</td><td>'+htmlLimits+'</td><td>&nbsp;</td><td id="wpp'+i+'">'+text1+'</td><td id="wpv'+i+'">'+text2+'</td></tr>'); 
            $('#wpprow'+i).css(style);
            
            that.build.setExpanderClickEvent(expand,'#exp'+i,window.images.collapse,window.language.collapseTitle,window.images.expand,window.language.expandTitle);
            
            $('#percent'+i).bind('change paste keyup[:enter]', {id:pID},function(event) {
                window.storage.data.update(event.data.id,'w',$(this).val());
                window.storage.data.save();
        	});
            $('#limit'+i).bind('change paste keyup[:enter]', {id:pID},function(event) {
                window.storage.data.update(event.data.id,'l',$(this).val());
                window.storage.data.save();
        	});
            
        }
        //var test = JSON.stringify(data);
        //alert(window.storage.data.toString());
        window.storage.data.save();
    }
}
var mani = new Object();
mani.table = new table;

function display () {
    this.notify = function (msg) {
        $('body').append('<div class="notificationBar">'+msg+'</div>');
        $('.notificationBar').css(window.styles.notification);
        $('.notificationBar').click(function() {
            $(this).slideUp().empty();
        });
    }
    this.addSettings = function () {
        $('body').append('<div id="settings"><img id="settingsicon" src="'+window.images.settings+'" width="30px" height="30px" title="'+window.language.settingTitle+'"/></div>');
        $('#settings').css(window.styles.settingIcon);
        $('#settings').toggle(function() {
            $('#activitySettings').show();
        },function() {
            $('#activitySettings').hide(); 
        });
        var activitySettingsStyle = {
            'display':'none',
            'position':'fixed',
            'top':'30px',
            'left':'35px',
            'padding':'0.5em',
            'background-color':'#fff8c4',
            'border':'1px solid #f2c779',
            'z-index':'14'
        };
        function getOption (lang) {
            var start = '<select id="lang" name="lang">';
            var end = '</select>';
            
            var option1 = '<option>deutsch</option>';
            if(lang == 'deutsch') {
                option1 = '<option selected>deutsch</option>';
            }
            var option2 = '<option>english</option>';
            if(lang == 'english') {
                option2 = '<option selected>english</option>';
            }
            return start+option1+option2+end;
        }
        function getCheckBoxString (id, name, label) {
            return '<p><input id="'+id+'" type="checkbox" name="'+name+'" value="'+name+'" /> '+label+'</p>';
        }
        function setCheckBoxChecked (checked, id) {
            if(checked == 1) {
                $('#'+id).attr('checked', 'checked');
            } else {
                $('#'+id).attr('checked','');
            }
        }
        function setCheckBoxEvent (id, storageName) {
            $('#'+id).change({storage:storageName},function (event) {
                if($(this).prop('checked') == true) {
                    location.reload();
                }
                window.storage.switch(event.data.storage);
            });
        }
        
        var activitySettings = '<div id="activitySettings">'+
            getCheckBoxString('setting_benchmark','ShowBenchmark',window.language.settingBenchmark)+
            getCheckBoxString('setting_expandall','ExpandAll',window.language.settingExpand)+
            '<p><input id="setting_winpercent" type="text" style="width:1.2em;" size="2" value="'+window.constant.WINPERCENT+'"/> '+ window.language.settingWinPercent+
            '</p>'+
            '<p>'+getOption(window.storage.get('language'))+' '+window.language.settingLanguage+'</p>'+
            '</div>';
        
        $('body').append(activitySettings);
        $('#activitySettings').css(activitySettingsStyle);
        
        setCheckBoxChecked(window.storage.get('benchmark'),'setting_benchmark');
        setCheckBoxChecked(window.storage.get('expandall'),'setting_expandall');
        
        $('#setting_winpercent').val(window.storage.get('winpercent'));
        
        setCheckBoxEvent('setting_benchmark','benchmark');
        setCheckBoxEvent('setting_expandall','expandall');
        
        
        $('#setting_winpercent').bind('change paste keyup[:enter]', function() {
            window.storage.set('winpercent',$(this).val());
        });
        $('#lang').change(function () {
            window.storage.set('language', $('#lang').val());
            location.reload();
        });
    }
}
mani.display = new display;
window.manipulation = mani;

//#### GreasyMonkey/TamperMonkey storage solution #####################################################################################
function storage () {
    var that = this;
    this.set = function(key, value) {
        GM_setValue(key,value);
    }
    this.get = function (key) {
        return GM_getValue(key);
    }
    this.reg = function (key, defaultvalue) {
        var test = that.get(key);
        if(test == undefined) {
            that.set(key, defaultvalue);
        }
    }
    this.switch = function (key) {
        if(that.get(key) == 1) {
            that.set(key, '0');
        } else {
            that.set(key,'1');
        }
    }
    this.data = new function () {
        var that = this;
        this.data = {};
        
        this.add = function (index,object) {
            that.data[index] = object;
        }
        this.toString = function () {
            return JSON.stringify(that.data);
        }
        this.save = function() {
            window.storage.set('data', that.toString());
        }
        this.load = function() {
            that.data = $.parseJSON(window.storage.get('data'));
            return that.data;
        }
        this.update = function(id, key, value) {
            that.data[id][key] = value;
        }
    }
}
window.storage = new storage;

//#####################################################################################################################################
//#####################################################################################################################################

//Snippet source: https://gist.github.com/eristoddle/4440713
//Autor: Stephan Miller
//Page: https://gist.github.com/eristoddle
//Range: function addJQuery();
function addJQuery(callback) {
    var script = document.createElement('script');
    script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js');
    script.addEventListener('load', function() {
        var script = document.createElement('script');
        script.textContent = 'window.jQ=jQuery.noConflict(true);(' + callback.toString() + ')();';
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

//#### the callback function #################################################################
function main(){
    $(document).ready(function() {
        window.storage.reg('benchmark','0');
        window.storage.reg('winpercent', window.constant.WINPERCENT);
        window.storage.reg('expandall','0');
        window.storage.reg('language','deutsch');
        window.storage.reg('data','0');
        var tID = window.constant.TARGETID;
        window.manipulation.display.addSettings();
        window.manipulation.table.setID(tID);
        tID = '#'+tID;
        window.manipulation.table.prepare(tID);
        //$('.MediaBox ').hide();
        //$('#EventBox').hide();
    });
}

//Snippet source: https://gist.github.com/eristoddle/4440713
//Autor: Stephan Miller
//Page: https://gist.github.com/eristoddle
//Range: function addJQuery();
//Load jQuery and execute the main function (callback function)
addJQuery(main());

//#### benchmark end #######################################################################
benchmark.end = new Date().getTime();
if(window.storage.get('benchmark') == 1) {
    var text = 'Benchmark run time:'+(benchmark.end - benchmark.start)+' (millisec)';
    window.manipulation.display.notify(text);
}