// ==UserScript==
// @name           Energiapolar Oy:n PolarSpot-sähkön hinta
// @namespace      http://www.energiapolar.fi/spottihinnat
// @include        http://www.npspot.com/Custom/Templates/areaPrice*
// @include        http://www.npspot.com/reports/areaprice/*
// ==/UserScript==

var $;
var lastConsumption = GM_getValue('lastConsumption', 20000);
var isMember = GM_getValue('isMember', false);

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		startScript();
	}
}

function startScript() {
    var interval = $('select[name*="interval"]').val();
    if (interval == 'Monthly' && $('table th:first').next().text() == 'FI') // sanity checks
    {
        var data = parseData();
        showData(data);
    }
}

function reloadData()
{
    $('#prices').hide();
    startScript();
}

function parseData()
{
    var data = "";
    var rows = $('div.table tr').not(':has(th)').not(':has(td:contains("-"))');
    var currentYear;
    
    rows.each( function(index)
    {
        var price = $('td:first', this).next().text();
        var time = $('td:first', this).text().split(/\s/);
        var year = time[0];
        var month = time[1];
        
        if (!currentYear)
        {
            currentYear = year
            data += '20' + year + ':' + month + ' ' + price;
        }
        else if (currentYear != year)
        {
            currentYear = year;
            data += '--20' + year + ':' + month + ' ' + price;
        }
        else
        {
            data += '|' + month + ' ' + price;
        }
    });
    
    return data;
}

function showData(data)
{
    var p = "\
        <p style='margin-top: 0;font-weight: bold; font-size: 2em;color: #aaa'>Energiapolarin PolarSpot-hinnat (snt/kWh)</p>\n";
    var years = data.split('--');
    var tables = "";
    for (var i in years)
        tables += getYearlyTable(years[i]);
    
    // Main container for calculated consumer prices
	var divi = "\
    <div   id='prices'\n\
           style='\n\
                position: absolute;\n\
                top: 25px; left: 25px;\n\
                background-color: black;\n\
                color: white;\n\
                padding: 10px;\n\
                font-size: 0.8em;\n\
                border: 2px dotted #aaa;\n\
                min-width: 500px;\n\
                display:none'>\n\
        \n\
        <button style='\n\
                    position: absolute;\n\
                    top: 0px; right: 0px;\n\
                    padding: 3px;\n\
                    border: none;\n\
                    background-color: black;\n\
                    color: white;'\n\
                onclick='$(\"#prices\").hide(); return false;'>\n\
                [x]\n\
        </button>\n"
        + p + tables + " \n\
        <br/> \n\
        <div    style='\n\
                    clear: both;\n\
                    border: 1px solid white;\n\
                    color: white;\n\
                    padding: 20px;\n\
                    width: 250px;'>\n\
            Vuosikulutukseni,\n\
            <input  type='text'\n\
                    id='vuosikulutus'\n\
                    style='width: 70px;'\n\
                    value='" + lastConsumption + "'/> kWh (vuosihinnat lasketaan keskiarvon mukaan)\n\
            <br/><br/>\n\
            <input  type='checkbox'\n\
                    name='jasen'\n\
                    value='check'/>\n\
            Olen sähköosuuskunnan jäsen:<br/>\n\
        </div>\n\
    </div>\n";
	$('table:first').after(divi);
    
    // Add event listeners
    $('#vuosikulutus').bind('keyup', calculateYearlyPrices);
    $('#vuosikulutus').bind('focusout', function() {
        if ($('#vuosikulutus').val().trim().length == 0)
        {
            $('#vuosikulutus').val(lastConsumption);
            calculateYearlyPrices();
        }
    });
    $('input[name="jasen"]').change( function()
    {
        isMember = !isMember;
        setTimeout(function() {GM_setValue('isMember', isMember);}, 0);
        setTimeout(function() {
            reloadData();
            $('input[name="jasen"]').attr('checked', isMember ? 'checked' : '');
        }, 0);
    });
    
    // Do some UI tricks
    $('.pricetable').css({'color': 'white', 'border-collapse': 'collapse', 'border-spacing': '0'});
    $('#prices td').css(
        {'color': 'white', 'padding': '3px', 'padding-left': '10px', 'padding-right': '10px', 'background-color': 'olive', 'border-right': '1px solid white'}
    );
    $('#prices td.header').css({'border': 'none', 'border-bottom': '1px solid white'});
    $('#prices td:first').css({'border-left': '1px solid white'});
    $('#prices td.left').css({'border-left': '1px solid white'});
    $('.yearlyprice').css({'background-color': 'orange', 'color': 'black', 'border': '1px solid white'});
    $('input[name="jasen"]').attr('checked', isMember ? 'checked' : '');
    
    // Finally show stuff
    calculateYearlyPrices();
    $('#prices').show();
}

function getYearlyTable(yearly_data)
{
    var data_array = yearly_data.split(':');
    var year = data_array[0];
    var months = data_array[1].split('|');
    var total = 0;
    
    // Add table header
	var table = "\
        <div style='float:left'>\n\
            <table class='pricetable'>\n\
            <tr>\n\
                <td colspan='2' style='text-align: center; border: 1px solid white; border-left: none;'>\n\
                    <strong>" + year + "</strong>\n\
                </td>\n\
            </tr>\n\
            <tr>\n\
                <td class='header'>kk</td>\n\
                <td class='header'>hinta</td>\n\
            </tr>\n";
    
    // Add monthly prices
	for (var i = 0; i < months.length; ++i)
	{
		var values = months[i].split(' ');
        var month = values[0];
        var price = getPrice(values[1]);
        
        table += "\
            <tr>\n\
                <td class='left'>" + month + "</td>\n\
                <td>" + ("" + roundNumber(price, 2)).replace('.', ',') + "</td>\n\
            </tr>\n";
        
        total += price;
	}
    
    // Fill empty months
    for (var j = 13; j > months.length; --j)
    {
        table += "\
            <tr>\n\
                <td class='left'>&nbsp;</td>\n\
                <td>&nbsp;</td>\n\
            </tr>\n";
    }
    
    var average = total / months.length;
    
    // Add average price
    table += "\
            <tr>\n\
                <td class='left'>\n\
                    <strong>Avg</strong>\n\
                </td>\n\
                <td>\n\
                    <strong>\n\
                        <span class='avg'>" + ("" + roundNumber(average, 2)).replace('.', ',') + "</span>\n\
                        <span style='display: none;'>" + year + "</span>\n\
                    </strong>\n\
                </td>\n\
            </tr>\n";
    
    // Add container for calculating total average yearly price with user given kWh's
    table += "\
            <tr>\n\
                <td id='price_" + year + "' class='yearlyprice' colspan='2' class='left'>\n\
                    &nbsp;\n\
                </td>\n\
            </tr>\n\
            </table>\n\
        </div>\n";
    return table;
}

function calculateYearlyPrices()
{
    var vuosikulutus = parseInt($('#vuosikulutus').val());
    if (!isNaN(vuosikulutus))
    {
        var averages = $('.avg').slice(0,3);
        for (var i = 0; i < averages.length; ++i)
        {
            var avg = $(averages[i]).text().replace(',', '.');
            var year = $(averages[i]).next().text();
            var price = parseFloat(avg) * parseFloat($('#vuosikulutus').val()) / 100.0;
            $('#price_' + year).html('<strong>' + roundNumber(price, 0) + " &euro;/v" + '</strong>');
        }
        lastConsumption = vuosikulutus;
        setTimeout(function() {GM_setValue('lastConsumption', lastConsumption);}, 0);
    }
    else
    {
        for (var i = 0; i < averages.length; ++i)
        {
            $('#price_' + averages[i].year).html('&nbsp;');
        }
    }
}

function getPrice(value)
{
	var f = parseFloat(value.split(',').join('.'));
    var margin = 0.25;
    if (isMember)
        margin = margin - 1.0;
	f = f * 0.122 + margin; // convert MW to kW, add VAT + margin
	return f;
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}