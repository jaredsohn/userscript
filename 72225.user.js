// ==UserScript==
// @name		eCompany Calc
// @version		0.37
// @description	Helps calculate company profit
// @author		Matevzs1
// @namespace	ToshkaSpace
// @include		http://ww*.erepublik.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// ===============================================================================
// License and Disclaimer (lets make it simple :))
// ===============================================================================
// This software is donationware. You are welcome to donate eRepublik in-game gold
// to author of this script.  Amount of gold is up to you and it reflects what you 
// think author deserves for the effort of contributing to the eRepublik community.
// Software is provided 'AS IS' and without any warranty. 
// Use on your own responsibility.
// ===============================================================================

// Add 'missing' trim to the String class
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

// URL Setup
var currURL = location.href;
var arrURL = currURL.split('/');
var BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';
var API_URL = 'http://api.erepublik.com/v1/feeds/';
var MY_URL = 'http://e.toshka.spb.ru/';

// Constants
var VERSION = '0.37';
var RELEASE_DAY = '06 Jan 2010';
var SCRIPT_URL = 'http://userscripts.org/scripts/show/59938';
var LOCALE = 'en/';
var tempList = null;
var company_productivity = 0;
var company_quality = 1;
var product_price = 0;
var raw_price = 0;
var raw_parts_in_one = 1;
var today = new Date(2007, 10, 20, 0, 0, 0);
//var today = new Date();
today.setDate(today.getDate() + parseInt($('span.eday strong').html()));
//today.setHours(today.getHours() - 11);
var day_of_week = (today.getDay() == 0) ? 7 : today.getDay();
var last_version = '';


function calcUserProfit(){
    var emloyees_list = $('input[id^="salary_"]');
    var sReq = MY_URL + "company/";
    //var number_of_empl = emloyees_list.length;
    var temp_url = BASE_URL + 'company-employees/';
    var company = currURL.substr(temp_url.length).split('/')[0];
    var ecur = getCurr();
    GM_xmlhttpRequest({
        method: 'GET',
        url: sReq + '?company=' + company,
        onload: function (data) {
            
            $('table.employees_details thead tr').append('<th class="e_employee">Profit</th>');
            
            eval('result =' + data.responseText);
            // set global vars
            company_productivity = result.productivity;
            company_quality = result.quality;
            product_price = result.price;
            raw_price = result.raw_price;
            raw_parts_in_one = result.parts_in_one;
            // set temp vars
            var total_profit = 0;
            var total_fakt_profit = 0;
            var total_productivity = 0;
            var total_fakt_productivity = 0;
            var total_salary = 0;
            var worked_salary = 0;
            // calculate profit for each employee
            $.each($('table.employees_details tbody tr'), function(i, item){
                var profit_obj = CalcProfit(item, product_price, raw_price);
                // get user_id
                var user_id = $(item).find('td:eq(4) input').attr('id').split('_')[1];
                
                // sum to total profit
                total_profit += profit_obj.profit;
                total_fakt_profit += isNaN(profit_obj.fakt_profit)?0:profit_obj.fakt_profit;
                
                // construct table td
                var profit_td = '<td>t:<strong style="color:'+ColorChoose(profit_obj.profit)+'" id="t_profit_'+user_id+'" title="profit in theory">'+profitReplacer(profit_obj.profit)+'</strong>';
                // get productivity by fact
                profit_td += '<br/>f:<strong style="color:'+ColorChoose(profit_obj.fakt_profit)+'" id="f_profit_'+user_id+'" title="profit by the fact">'+profitReplacer(profit_obj.fakt_profit)+'</strong>';
                // get wellness by fact
                profit_td += '<br/>w:<strong id="f_wellness_'+user_id+'" title="wellness by the fact">'+wellnessReplacer(profit_obj.fakt_wellness)+'</strong></td>';
                
                $(item).append(profit_td);
                total_productivity += profit_obj.productivity;
                total_fakt_productivity += isNaN(profit_obj.fakt_productivity)?0:profit_obj.fakt_productivity;
                total_salary += profit_obj.salary;
                worked_salary += isNaN(profit_obj.fakt_productivity)?0:profit_obj.salary;
            });
            // append table row with total profit values
            $('.employees_details tbody').append('<tr><td colspan="3" class="e_salary" style="text-align:left;">Real price: <input type="text" id="real_price" class="sallary_field" style="float:none;"></input><span class="ecur" style="float:none;">'+ecur+'</span></td><td class="e_salary" style="text-align:left;">Raw price: <input type="text" id="real_raw_price" class="sallary_field" style="float:none;"></input><span class="ecur" style="float:none;">'+ecur+'</span></td><td><span class="vround-btn-start"><span class="vround-btn-end"><a id="recalc" class="vround-btn-core" style="background:#E9F5FA url(/images/parts/icon-arrow.gif) no-repeat scroll 86px 50%; width:86px">reCalc</a></span></span></td><td>t:<strong style="color:'+ColorChoose(total_profit)+'" id="t_total_profit" title="total profit in theory">'+profitReplacer(total_profit)+'</strong><br/>f:<strong style="color:'+ColorChoose(total_fakt_profit)+'" id="f_total_profit" title="total profit by the fact">'+profitReplacer(total_fakt_profit)+'</strong></td></tr>');
            $('#real_price').val(product_price.toFixed(2));
            $('#real_raw_price').val(raw_price.toFixed(2));
            var raw_td = raw_price == 0?'<td>&nbsp;</td>':'<td><span class="regular" style="font-size:12px;">Raw mat needed:<br/> used: '+(total_fakt_productivity*company_quality).toFixed(2)+' ('+(total_fakt_productivity*company_quality*raw_price).toFixed(2)+' '+ecur+')<br/>need: '+((total_productivity-total_fakt_productivity)*company_quality).toFixed(2)+' ('+((total_productivity-total_fakt_productivity)*company_quality*raw_price).toFixed(2)+' '+ecur+')<br/>total: '+ (total_productivity*company_quality).toFixed(2) + ' ('+(total_productivity*company_quality*raw_price).toFixed(2)+' '+ecur+')</span></td>';
            $('.employees_details tbody').append('<tr><td colspan="3"><span class="regular" style="font-size:12px;">Units produced:<br/> produced: '+ (total_fakt_productivity/raw_parts_in_one).toFixed(2) + '<br/> total: '+(total_productivity/raw_parts_in_one).toFixed(2)+'</span></td>'+raw_td+'<td colspan="2"><span class="regular" style="font-size:12px;">Sallary:<br/> worked: '+worked_salary.toFixed(2) + ' ' + ecur +'<br/>not worked: '+(total_salary - worked_salary).toFixed(2) + ' ' + ecur +'<br/> total: '+total_salary.toFixed(2) + ' ' + ecur +'</span></td></tr>');
        }
    });

    
    $('input[id^="salary_"]').live('change', function(){
        // sallary change action
        var user_id = $(this).attr('id').split('_')[1];
        var profit_obj = CalcProfit($(this).parent().parent(), parseFloat($('#real_price').val()), parseFloat($('#real_raw_price').val()));
        
        // racalc theoretical profit
        var t_old_profit = parseFloat($('strong[id="t_profit_'+user_id+'"]').html());
        $('strong[id="t_profit_'+user_id+'"]').html(profitReplacer(profit_obj.profit)).css('color', ColorChoose(profit_obj.profit));
        var t_total = parseFloat($('#t_total_profit').text());
        var t_new_total = t_total + profit_obj.profit - t_old_profit;
        $('#t_total_profit').html(profitReplacer(t_new_total)).css('color', ColorChoose(t_new_total));
        // recalc profit by the fakt
        var f_old_profit = parseFloat($('strong[id="f_profit_'+user_id+'"]').html());
        $('strong[id="f_profit_'+user_id+'"]').html(profitReplacer(profit_obj.fakt_profit)).css('color', ColorChoose(profit_obj.fakt_profit));
        var f_total = parseFloat($('#f_total_profit').text());
        var f_new_total = f_total + profit_obj.fakt_profit - f_old_profit;
        $('#f_total_profit').html(profitReplacer(f_new_total)).css('color', ColorChoose(f_new_total));
        
        return false;
    });
    
    $('#recalc').live('click', function(){
        // recalc profit for all emploees by the clicking recalc button
        $(this).hide();
        window.setTimeout(function(){
            var t_profits = ProfitReRequest(parseFloat($('#real_price').val()), parseFloat($('#real_raw_price').val()));
            $('#t_total_profit').html(t_profits[0].toFixed(2)).css('color', ColorChoose(t_profits[0]));
            $('#f_total_profit').html(t_profits[1].toFixed(2)).css('color', ColorChoose(t_profits[1]));
            $('#recalc').show();
        }, 1); 
        return false;
    });
    
   
}

function CalcProfit(tr_object, prod_price, r_price){
    // calculate profit for given employee
    // get employee data
    var salary = parseFloat($(tr_object).find('input[id^="salary_"]').val());
    var wellness = parseFloat($(tr_object).find('td:eq(2) strong').html());
    var skill = getSkill(parseFloat($(tr_object).find('td:eq(1) strong').html()));
    
    // calculate productivity, profit and wellness
    var wellness_multiplier = 1 + 2 * wellness / 100;
    var productivity = company_productivity * wellness_multiplier * skill;
    var profit = productivity * ( prod_price / raw_parts_in_one - r_price * company_quality ) - salary;
    var fakt_profit = 0;
    var fakt_wellness = 0;
    var fakt_productivity = 0;
    
    // get today productivity and calculate wellness
    $.each($(tr_object).find('td:eq(3) p:eq('+(day_of_week -1)+')'), function (ii, item){
        fakt_productivity = parseFloat($(item).text());
        fakt_profit = fakt_productivity * ( prod_price / raw_parts_in_one - r_price * company_quality ) - salary;
        fakt_wellness = (fakt_productivity/company_productivity/skill - 1) * 50;
    });
    return {profit:profit, fakt_profit:fakt_profit, fakt_wellness:fakt_wellness, productivity: productivity, fakt_productivity: fakt_productivity, salary: salary};
}

function ProfitReRequest(prod_price, r_price){
    var total_profit = 0;
    var total_fakt_profit = 0;
    $.each($('input[id^="salary_"]'), function(i, user_salary_obj){
        var profit_obj = CalcProfit($(user_salary_obj).parent().parent(), prod_price, r_price);
        var user_id = $(user_salary_obj).attr('id').split('_')[1];
        total_profit += profit_obj.profit;
        total_fakt_profit += isNaN(profit_obj.fakt_profit)?0:profit_obj.fakt_profit;
        $('strong[id="t_profit_'+user_id+'"]').html(profitReplacer(profit_obj.profit)).css('color', ColorChoose(profit_obj.profit));
        $('strong[id="f_profit_'+user_id+'"]').html(profitReplacer(profit_obj.fakt_profit)).css('color', ColorChoose(profit_obj.fakt_profit));
    });
    return [total_profit, total_fakt_profit]
}

function ColorChoose(number){
    if (number < 0){return 'red'}
    else { return '#87AE09' }
}

function profitReplacer(profit){
    return isNaN(profit)?'&nbsp;&nbsp;&nbsp;&mdash;&nbsp;&nbsp;':profit.toFixed(2);
}

function wellnessReplacer(well){
    return isNaN(well)?'&nbsp;&mdash;&nbsp;':well.toFixed(0);
}

function getCurr(){
    return $('span.ecur:eq(0)').html();
}

function getSkill(skill){
    if (skill > 0 && skill <= 1){
        return (skill - 0.5);
    }else if (skill > 1 && skill <= 2){
        return (skill - 0.25);
    }else if (skill > 2 && skill <= 3){
        return (skill - 0.1);
    }else if (skill > 3 && skill <= 4){
        return (skill - 0.05);
    }else if (skill > 4){
        return (skill - 0.02);
    }
}

function GetMarketPrices(){
    var temp_url = BASE_URL + 'company/';
    var company = currURL.substr(temp_url.length);
    // hide show_details button
    
    if(!$('#open_details').hasClass('down')){
        // если пустая, то подгружаем то что нужно
        GM_xmlhttpRequest({
            method: 'GET',
            url: BASE_URL+'company-details/'+company,
            onload: function(data1){
                //alert(data1);
                $('#details_container').html(data1.responseText).show();
                $('#open_details').hide();
                mPrice(company);
            }
        });
    }else{
        $('#open_details').hide();
        // vaiting for load
        $(window).setTimeout(mPrice(company), 500);
        
    }

}
function mPrice(company){ 
    // request prices
    var temp_url = BASE_URL + 'company/';
    GM_xmlhttpRequest({
        method: 'GET',
        url: MY_URL + 'company/company_prices?company='+company,
        onload: function (data) {
            
            eval('rprice = ' + data.responseText);
            $.each($('div.infoholder div.left span.special'), function(i, item){
                if (i == 0){
                    // it is a product, not needed look for all qualities
                    var price_vat = (rprice.product_vat != ''?'<br/><br/><span class="currency" style="padding-left:20px; font-size:12px;">'+ rprice.product_vat +'</span>': '');
                    $(item).parent().parent().append('<div style="margin-top:7px;"><span class="regular" style="padding-left:30px;">Price</span><br/><br/><span class="currency" style="padding-left:20px;">'+ rprice.product +'</span>'+'<br/><span class="currency" style="padding-left:20px; font-size:10px;">'+ (rprice.gold_curr*parseFloat(rprice.product.split(' ')[0])).toFixed(3) +' G</span>'+price_vat+'<br/><span class="currency" style="padding-left:20px; font-size:10px;">'+ (rprice.gold_curr*parseFloat(rprice.product_vat.split(' ')[0])).toFixed(3) +' G</span></div>');
                    var stock = $('#number_of_products');
                    var pr_cur = rprice.product.split(' ');
                    //alert(rprice.product)
                    //$(stock).parent().parent().find('img').css('margin-bottom', '80px');
                    $(stock).parent().parent()
                    .append('<br/><p class="goleft" style="line-height:0px; "><span class="currency" style="font-size:12px;">' + (parseFloat(pr_cur[0])*parseInt($(stock).html())).toFixed(2) + ' '+pr_cur[1]+'</span></p>')
                    .append('<p class="goleft"><span class="currency" style="font-size:12px;">' + (parseFloat(pr_cur[0])*parseInt($(stock).html()) * rprice.gold_curr).toFixed(2) + ' G</span></p>');
                    //$(stock).parent().parent().append('<p class="goleft"><span>'+((parseInt($(stock).html())*parseFloat(pr_cur[0]))).toFixed(2))+ ' ' + pr_cur[1]+'</span></p>');
                } else {
                    $(item).parent().parent().append('<div style="margin-top:7px;"><span class="regular" style="padding-left:30px;">Price</span><br/><br/><span class="currency"  style="padding-left:20px;">'+ rprice.raw +'</span>' +'<br/><span class="currency" style="padding-left:20px; font-size:10px;">'+ (rprice.gold_curr*parseFloat(rprice.raw.split(' ')[0])).toFixed(3) +' G</span></div>');
                }
            });
            // add market button
            $('div.holder:eq(3) div.action').append('<span class="vround-btn-start"><span class="vround-btn-end"><a class="vround-btn-core" href="/'+LOCALE+'market/country-'+rprice.country_id+'-industry-'+rprice.industry_id+'-quality-'+rprice.quality+'" title="">Go to marketplace</a></span></span>');
        }
    });
}


function getVersion(){
    // check if user version is last
    GM_xmlhttpRequest({
        method: 'GET',
        url: MY_URL + 'company/check_version?version='+VERSION,
        onload: function (data) {
            eval('v = ' + data.responseText);
            if (!v.is_last){
                var new_version_desc = '<span class="regular" style="color:red;">New version ('+v.last+') available for installing.</span><br/>';
                var download_button = '<span class="vround-btn-start"><span class="vround-btn-end"><a href="http://userscripts.org/scripts/source/59938.user.js" title="Download" class="vround-btn-core" >Install new version</a></span></span>';
            }else{ var new_version_desc = ''; var download_button = '';}
            $('#content').append('<div class="holder"><h2 class="section">eCompany Calc</h2><div class="indent"><div class="infoholder"><div>'+new_version_desc+'<span class="regular">Your version '+VERSION+' from '+RELEASE_DAY+'.</span></div></div><div class="action">'+download_button+'<span class="vround-btn-start"><span class="vround-btn-end"><a href="http://www.erepublik.com/en/citizen/donate/items/1601051" title="" class="vround-btn-core">Support eCompanyCalc</a></span></span></div>');
        }
    });
}

function Main(e) {

    if (typeof unsafeWindow == 'undefined')
        unsafeWindow = window;

    var subURL = currURL.substr(BASE_URL.length);
    LOCALE = subURL.substring(0, 2) + '/';
    BASE_URL += LOCALE;
    subURL = currURL.substr(BASE_URL.length);

    var pagesFunctions = [
        {p: 'company-employees/',	s:1,	f: calcUserProfit},
        {p: 'company/',	s:2,	f: GetMarketPrices},
        {p: 'company/',	s:3,	f: getVersion},
        {p: 'company-employees/',	s:4,	f: getVersion}
    ];

    pagesFunctions.forEach(function(v) {
        if (subURL.substr(0, v.p.length) == v.p)
            v.f();
    });

};

window.addEventListener('load', function(){var checker=setInterval(function(){
    if(typeof ($ = jQuery.noConflict()) != "undefined") {
        clearInterval(checker);
        Main();
    }
},100);}, false);


// =============================================================================================================
//  Version     Date            Change Log
//  0.37        06 Jan 2010         - Disappear "show more detail" button
//  0.34        09 Dec 2009         - Fixed a bug when number of employees more then 10
//  0.33        03 Dec 2009         - Fixed a bug in company stock cost
//  0.32        03 Dec 2009         - Added company stock cost
//  0.31        02 Dec 2009         - Hide summary for raw in mining industries
//  0.3         16 Nov 2009         - Added statistics into "Employees details" page
//  0.27        14 Nov 2009         - Some script emprovements
//  0.26        06 Nov 2009         - Bug with wellness calculation was fixed
//  0.25        04 Nov 2009         - Script working faster 200%
//  0.24        03 Nov 2009         - Added new feature 
//                                      1.  At the company page added button to marketplace
//                                      2.  Custom prices at the page "Employees details"
//  0.23        21 Oct 2009         - Added new feature
//                                      1.  At the company page added price without vat
//                                      2.  At the page "Employees details" added wellness by the fakt
//  0.22        19 Oct 2009         - Version checker added and increased script speed
//  0.21        18 Oct 2009         - Fixed a bug with profits by the fact
//  0.20        17 Oct 2009         - Added new feature and fixed a bug
//                                      1.  Display a market prices at the company page
//                                      2.  Fixed a bug in calculation in a LAND industry.
//  0.10        17 Oct 2009         - Initial release with the following features:
//                                      1. 	At the page "Employees details" show profit for each employye and total company profit