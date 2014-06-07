// ==UserScript==
// @name           YTProfit 2.0
// @namespace      bananenpelle.de
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// @require        http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.2.min.js
// @require        http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.js
// ==/UserScript==

(function($) {
    var cpmMin = 0.60;	// cost per mille min
    var cpmMax = 7.00;	// cost per mille max
    var estMonetizedViews = 0.7; // estimated percentage of monetized views

    $.template(
        'tmplInfo', 
        'CPM on YouTube are not public and are estimated to range vastly so use this value for entertainment only. Not valid if channel is not a partner.');
    $.template(
        'tmplWatch', 
        '<h4>Profit:</h4><p>$${valueMin} - ${valueMax}<br /><span style="font-size:6pt;">{{tmpl "tmplInfo"}}</span></p>');
    $.template(
        'tmplChannel', 
        '<div class="stat-entry"><span class="stat-value">$${valueMin} - $${valueMax}</span><span class="stat-name" title="{{tmpl "tmplInfo"}}">total profit*</span></div>');
	
    // http://www.youtube.com/watch?*
    var elemDescription = $('#watch-description-extras');
    var elemViewCount1 = $('.watch-view-count strong');
    if (elemDescription.size() == 1 && elemViewCount1.size() == 1) {
        var numberString1 = elemViewCount1.html();
        $.tmpl('tmplWatch', [{ 
            valueMin: calcProfitMin(numberString1), 
            valueMax: calcProfitMax(numberString1)
        }]).appendTo(elemDescription);
    }

    // http://www.youtube.com/user/*
    // http://www.youtube.com/*
    var elemProfileInfo = $('.header-stats');
    var elemViewCount2 = $('.stat-value');
    if (elemProfileInfo.size() == 1 && elemViewCount2.size() == 2) {
        var numberString2 = $(elemViewCount2[1]).html();
        $.tmpl('tmplChannel', [{ 
            valueMin: calcProfitMin(numberString2), 
            valueMax: calcProfitMax(numberString2)
        }]).appendTo(elemProfileInfo);
    }
	
    function calcProfitMin(string) {
        return calcProfit(string, cpmMin);
    }   
    
    function calcProfitMax(string) {
        return calcProfit(string, cpmMax);
    }
        
    function calcProfit(string, cpm) {
        if (string != null && string != '') {
            var totalViews = parseNumber(string);
            var estMonetizedThousands = totalViews * estMonetizedViews / 1000;
            return formatNumber(estMonetizedThousands * cpm);
        }
        return '-/-';
    }
	
    function parseNumber(string) {
        return new Number(parseInt(string.replace(/[,. ]/g, '')));
    }
	
    function formatNumber(number) {
        // round & add commas
        var numberString = Math.round(number).toString();
        var regex = /(\d+)(\d{3})/;
        while (regex.test(numberString)) {
            numberString = numberString.replace(regex, '$1' + ',' + '$2');
        }
        return numberString;
    }
})(jQuery);