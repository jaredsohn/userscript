// ==UserScript==
// @name       CoinMine.pw Enhancements
// @namespace  http://www.dasbiersec.com
// @version    1.7
// @description  Add some enhancements to CoinMine.pw
// @include      http*://*coinmine.pw/*
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2014+, Anyone really
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

// Global defines
var cryptsyPrice = 0;

// Cookie helper functions, stolen from W3C page
function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname,cvalue,minutes)
{
    var d = new Date();
    d.setTime(d.getTime()+(minutes*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

/************************************************************************************************************************************
     * ************************************************************************************************************************************************/

function buildAccountPage()
{
    // Summary totals
    var btcTotal = 0;
    var ltcTotal = 0;
    var usdTotal = 0;
    
    // Add our editing dialog
    $("body").append('<div id="balances-edit-dialog" style="display: none; position: absolute; top: 45%; left: 35%; width: 350px; height: 150px; background-color: white; border: 1px solid black">'
                      + '<form id="balances-edit-form" action="javascript:void(0)"><table width="99%">'
                      + '<tr><td>Exchange:</td><td><input type="text" name="balances-edit-form-exchange" /></td></tr>'
                      + '<tr><td>Payout Address:</td><td><input type="text" name="balances-edit-form-address" /></td></tr>'
                      + '<tr><td colspan="2"><button name="balances-edit-form-save">Save</button> <button name="balances-edit-form-cancel">Cancel</button"></td></tr>'
                      + '</table><input type="hidden" name="payoutid" value="0" /></form>'
                      
                      + '</div>');
    
    var wrapper = $('body div:nth-child(3) div').first();
    
    wrapper.attr('id', 'old-balances');
    wrapper.parent().prepend('<div style="padding:10px;margin: 10px; color:#334;box-shadow:5px 5px 5px #444;border-radius: 7px;background:#EEE;width:1200px;" id="new-balances"></div>');
    
    wrapper.find('form input[value=payaccounts]').parent().attr('id', 'old-form');
    
    // Setup our new body element
    $("#new-balances").prepend('<div id="balances"><form method="post" action="account.php" id="balances-form"><table width="100%" id="balances-table"></table></form></div>');
    
    
    
    // TODO: Tweak this a bit
    $("#balances-form").prepend('Payout Password: <input type="password" size="15" name="PIN"><input style="width:200px;" type="submit" value="Save payment setting" name="payaccount" />');
    
    // setup header row
    $("#balances-table").append("<tr id='balances-table-header' style='font-weight: bold'><td>Coin</td><td>Payout Address</td>"
                                 + '<td style="text-align: right">Confirmed</td>'
                                 + '<td style="text-align: right">Unconfirmed</td>'
                                 + '<td style="text-align: right">BTC Amount</td>'
                                 + '<td style="text-align: right">LTC Amount</td>'
                                 + '<td style="text-align: right">USD Amount</td>'
                                 + '<td>Payout Status</td></tr>');
    
    // Move LTC/USD estimates out from tooltip
    $('#old-form > div > table').each(function (index, element) {
                
        // Begin collecting important information from existing table (lots to collect!)
        var details = $(this).find('td:nth-child(2)').find("table tr").eq(1).find('td').eq(1).find('a').attr('title').split("\n");
        var confirmedBalance = parseFloat( $(this).find('td:nth-child(2)').find("a").first().text() );
        var unconfirmedBalance = parseFloat( $(this).find('td:nth-child(2)').find("a").eq(2).text() );
        var coinName = $(this).find('td:first-child').find('b').first().text();
        var payoutAmount = $(this).find('.coinpayout').val();
        var payoutName = $(this).find('.coinpayout').attr('name');
        var minPayoutAmount = parseFloat($(this).find('small').text().match(/([\d.]+)/)[0]);
        var payoutAddress = $(this).find('.coinaddr').val();
        var payoutAddressFieldName = $(this).find('.coinaddr').attr('name');
        var payoutNote = $(this).find('input[name*=note]').val();
        var payoutNoteFieldName = $(this).find('input[name*=note]').attr('name');
        var payoutFormId = $(this).find('input[name*=note]').attr('name').match(/([\d.]+)/)[0];
        var coinId = payoutAddressFieldName.match(/[a-z]+\[([0-9]+)\]/)[1].trim();
        
        // get btc/ltc/usd amounts
        var btcAmount = 0.00000000;
        var ltcAmount = 0;
        var usdAmount = 0;
        
        for (var i = 0; i < details.length; i++)
        {    
            var data = details[i].split(" ");
            
            // BTC price
            if (i == details.length - 1)
            {
                if (parseFloat(data[1]) > 0)
                {
                    btcAmount = (parseFloat(data[1]) * cryptsyPrice).toFixed(8);
                }
                else
                {
                    btcAmount = (0).toFixed(8);
                }
                
                btcTotal += parseFloat(btcAmount);
            }
            
            // LTC price
            if (i == 2)
            {
                ltcAmount = parseFloat(data[1]).toFixed(8);
                ltcTotal += parseFloat(data[1]);
            }
            
            // USD price
            if (i == 1)
            {
                usdAmount = parseFloat(data[1]);
                usdTotal += parseFloat(data[1]);
            }
        }
        
        // Begin entering data rows into balances table
        $("#balances-table").append("<tr id=\"coin-" + coinId + "\">"
                                     + "<td>" + coinName + "<input type='hidden' value='" + payoutAmount + "' name='" + payoutName + "' /></td>"
                                     + "<td>"
                                     + "<input type='hidden' value='" + payoutAddress + "' name='" + payoutAddressFieldName + "' />"
                                     + "<input type='hidden' value='" + payoutNote + "' name='" + payoutNoteFieldName + "' />"
                                     + "(<a href='javascript:void(0)' class='balances-set-payout' payoutid='" + payoutFormId + "'>Set</a>) <a title='" + payoutAddress + "' class='payout-exchange-note'>" + payoutNote + "</a>"
                                     + "</td>"
                                     + '<td style="text-align: right">' + parseFloat(confirmedBalance).toFixed(8) + "</td>"
                                     + '<td style="text-align: right">' + parseFloat(unconfirmedBalance).toFixed(8) + "</td>"
                                     + '<td style="text-align: right">' + btcAmount + "</td>"
                                     + '<td style="text-align: right">' + ltcAmount + "</td>"
                                     + '<td style="text-align: right">' + parseFloat(usdAmount).toFixed(4) + "</td>"
                                     + "</tr>");
        
        //var payoutEnabled = (parseFloat(payoutAmount) > 0) ? true : false;
        var manualPayoutAddr = $(this).find('td:nth-child(2)').find("a").eq(1).attr('href');
        var payoutEnabled = (manualPayoutAddr.match(/set=([0-1])/) == null || manualPayoutAddr.match(/set=([0-1])/)[1] == "0") ? false : true;

        
        // Setup our Enable/Disable payout buttons
        if (payoutEnabled == true)
        {
            $("#coin-" + coinId).append('<button class="payout-disable" style="background-color: green; color: white;" pofield="' + payoutName + '" coinid="' + coinId + '">Disable Payout</button>');
        }
        else
        {
            $("#coin-" + coinId).append('<button class="payout-enable" pofield="' + payoutName + '" poamount="' + minPayoutAmount + '" coinid="' + coinId + '">Enable Payout</button>');
        }
        
        
        
        // Highlight any balances over the min amount
        if (confirmedBalance >= minPayoutAmount)
        {
            console.log('Coin: ' + coinName + ' Confirmed: ' + confirmedBalance + ' Min Payout: ' + minPayoutAmount);    
            
            $("#coin-" + coinId).css('background-color', '#ADEBAD');
        }
        
    });
    
    /*****************************************************************************************************************************************************/
    // Add our totals to the bottom of the table
    $("#balances-table").append('<tr><td colspan="3"></td><td style="text-align: right;"><strong>Totals:</strong></td>'
                                + '<td style="text-align: right;">' + btcTotal.toFixed(8) + '</td><td style="text-align: right;">' + ltcTotal.toFixed(8) + '</td><td style="text-align: right;">' + usdTotal.toFixed(4) + '</td>'
                                + '<td><button class="payout-enable-all">Enable All</button><br /><button class="payout-disable-all">Disable All</button></td>');
    
    
    /*****************************************************************************************************************************************************/
    // Setup Enable/Disable payout toggle buttons
    
    $('.payout-disable').on('click', function (event) {
        // addr account.php?service=manualpay&coin=34&set=1
        var poField = $(this).attr("pofield");
        var coinId = $(this).attr("coinid");
        var temp = $(this);
        
        //$("input[name='" + poField + "']").val("0");
        
        $.get("account.php?service=manualpay&coin=" + coinId + "&set=1", function () {
        	temp.css('background-color', '').css('color', '').text('Disabled!!').attr('disabled', 'disabled');
        });       
        
        
        event.preventDefault();
    });
    
    $('.payout-enable').on('click', function (event) {
        // addr account.php?service=manualpay&coin=34&set=0
        var poField = $(this).attr("pofield");
        var coinId = $(this).attr("coinid");
        var temp = $(this);
        
        //$("input[name='" + poField + "']").val( $(this).attr('poamount') );
        
        $.get("account.php?service=manualpay&coin=" + coinId + "&set=0", function () {
        	temp.css('background-color', 'green').css('color', 'white').text('Enabled!!').attr('disabled', 'disabled');    
        });        
        
        event.preventDefault();
    });
    
    $('.payout-disable-all').on('click', function (event) {
        $('.payout-disable').click();
        
        event.preventDefault();
    });

    $('.payout-enable-all').on('click', function (event) {
        $('.payout-enable').click();
        
        event.preventDefault();
    });    

    /*****************************************************************************************************************************************************/
    // Setup Payout exchange and address form actions
    
    // copy over hidden elements
    $("#balances-form").prepend( $("#old-form input[type=hidden]") );
    
    // Remove old form and misc other stuff
    $("#old-balances").remove();
    
    // New FAQ messages
    $("#new-balances").append("<ul id='faq'></ul>");
    
    $("#faq").append("<li>Rows highlighed in green are eligible for payout, and will automatically payout if enabled.</li>");
    $("#faq").append("<li>Click Set to set a coins specific payout exchange and address - the row will highlight as orange until you save it at the top.</li>");
    $("#faq").append("<li>Click on Enable Payout or Disable Payout to flag that specific coin to payout when minimum eligible amount is reached (row will be highlighted in green if eligible). <strong>You must save after you enable these</strong></li>");
    $("#faq").append("<li>Payout polling service runs automatically every 5 minutes, so it may take up to that long from the time you enable payout to see the payout happen.</li>"); 
    $("#faq").append("<li>Currently there are no additional fees to withdraw funds.</li>");
    
    
    
    
    $(".balances-set-payout").on('click', function () {           
        var payoutId = $(this).attr('payoutid');
        
        $("#balances-edit-form input[name=payoutid]").val(payoutId);
        $("#balances-edit-form input[name=balances-edit-form-address]").val( $("input[name='address\\\[" + payoutId + "\\\]']").val() );
        $("#balances-edit-form input[name=balances-edit-form-exchange]").val( $("input[name='note\\\[" + payoutId + "\\\]']").val() );
        
        $("#balances-edit-dialog").css('display', 'block');
    });
    
    
    $("#balances-edit-form button[name='balances-edit-form-save']").on('click', function (event) {
        event.preventDefault();
        
        var payoutId = $("#balances-edit-form input[name='payoutid']").val();
        
        $("input[name='address\\\[" + payoutId + "\\\]']").val( $("#balances-edit-form input[name=balances-edit-form-address]").val() );
        $("input[name='note\\\[" + payoutId + "\\\]']").val( $("#balances-edit-form input[name=balances-edit-form-exchange]").val() );
        
        $("input[name='note\\\[" + payoutId + "\\\]']").parent().parent().css('background-color', 'orange');
        $("input[name='note\\\[" + payoutId + "\\\]']").parent().parent().find('a.payout-exchange-note').text( $("#balances-edit-form input[name=balances-edit-form-exchange]").val() );
        
        
        $("#balances-edit-dialog").css('display', 'none');
    });
    
    $("#balances-edit-form button[name='balances-edit-form-cancel']").on('click', function (event) {
        event.preventDefault();
        
        $("#balances-edit-dialog").css('display', 'none');
        
    });
}

function buildProfitsPage()
{
    var wrapper = $('body > div:nth-child(2)');
    wrapper.css('width', '1200px');
    
    wrapper.find('.thr thead th').eq(3).after('<th>Amount BTC</th>');
    //wrapper.find('.thr thead th').eq(6).after('<th>Amount BTC Now</th>');
    
    wrapper.find('table.thr').css('width', '99%');
    
    // TODO: BTC Mined now?? 
    wrapper.find('.thr tbody tr').each(function (element) {
        var ltcAmount = $(this).find('td').eq(3).text();
        var btcAmount = (parseFloat(ltcAmount) * cryptsyPrice).toFixed(8);
        //var usdAmountMined = parseFloat($(this).find('td').eq(5).text());
        //var usdAmountNow = parseFloat($(this).find('td').eq(6).text());
        
        
        //var btcAmountNow = ((usdAmountNow / ltcNow)  * cryptsyPrice;
        
        $(this).find("td").eq(3).after('<td style="text-align: right;">' + btcAmount + "</td>");
        //$(this).find("td").eq(6).after('<td style="text-align: right;">' + btcAmountNow.toFixed(8) + "</td>");
    });
}
    


$(document).ready(function () {
    /*****************************************************************************************************************************************************/
    // Get BTC price details, cache BTC price in cookie for 15 minutes so that we don't have to reach out to cryptsy every time.
    // We're going to read this every page so that
    
    if (getCookie("cryptsyPrice") != "")
    {
        console.log("Setting BTC price from cookie");
        cryptsyPrice = getCookie("cryptsyPrice");
    }
    else
    {  
        console.log("Fetching BTC price from Cryptsy");
        
        $.get('http://jsonp.jit.su/?url=http%3A%2F%2Fpubapi.cryptsy.com%2Fapi.php%3Fmethod%3Dsinglemarketdata%26marketid%3D3', function (data) {
            console.log(data.return.markets.LTC.lasttradeprice);
            cryptsyPrice = data.return.markets.LTC.lasttradeprice;
            setCookie("cryptsyPrice", cryptsyPrice, 15);            
        })
        .fail(function () {
            alert("Problem loading cryptsy data... (shocker) - Try refreshing the page in a couple seconds");
            return false;
        });
    }

   
    if (window.location.href.indexOf("account.php") > -1) 
    {

    	buildAccountPage();
    }
    else if (window.location.href.indexOf("yourprofit.php") > -1)
    {
		buildProfitsPage();
    }
                 
             
         
});