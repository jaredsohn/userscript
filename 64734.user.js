// ==UserScript==
// @author          Erick Smith
// @name            iTunes Connect Daily Sums
// @namespace       com.smith288.iTunesDailySums
// @include         https://itts.apple.com/*
// @description     Sums the different product types
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
// ==UserScript==
// @author          Erick Smith
// @name            iTunes Connect Daily Sums
// @namespace       com.smith288.iTunesDailySums
// @include         https://itts.apple.com/*
// @description     Sums the different product types
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

productTable = $('table:eq(8)');
newDownloadsSum = 0;
newDownloadsTotal = 0;
updatesSum = 0;
updatesTotal = 0;
perDownload = 0;
royaltySum = 0;

var currencyConv= new Array();
currencyConv['EUR']=1;
currencyConv['AUD']=0.623;
currencyConv['CAD']=0.645;
currencyConv['GBP']=1.111;
currencyConv['USD']=0.683;

var debugInfo = "";

if($('table:eq(0)').html().indexOf('<font color="gray"><b>Reporting &gt; Transaction Reports &gt; Preview</b><br><br></font>')!=-1){


    $('tr', productTable).each( function(){
        if($('td:eq(3)', $(this)).html()=='1'){
            newDownloadsSum++;
			
			downloadsOnRow = parseInt($('td:eq(4)', $(this)).html());
			royaltyUnitOnRow = parseFloat($('td:eq(5)', $(this)).html());
			currencyOnRow = currencyConv [$('td:eq(6)', $(this)).html()];
						
			debugInfo += $('td:eq(6)', $(this)).html() + "|" + currencyOnRow + "|";
			
            newDownloadsTotal += downloadsOnRow;
            if(perDownload == 0) {
                perDownload = royaltyUnitOnRow;
            }
			
			royaltySum += downloadsOnRow * royaltyUnitOnRow * currencyOnRow;
			
        } else if($('td:eq(3)', $(this)).html()=='7'){
            updatesSum++;
            updatesTotal += parseInt($('td:eq(4)', $(this)).html());
			$(this).hide();
        }
    });

    sumRow = '<tr><td class="smalltext" align="right" nowrap="nowrap"></td><td class="smalltext">&nbsp;</td><td class="smalltext"><b>{DESC}</b></td><td class="smalltext" align="center"><b>{SUM}</b></td><td class="smalltext" align="center"><b>{TOTAL}</b></td><td class="smalltext" align="center"><b>{REVENUE}</b></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td></tr>';

    newDownloadsRow = $(sumRow).html().replace('{SUM}', '').replace('{DESC}', 'New Sales').replace('{TOTAL}', newDownloadsTotal).replace('{REVENUE}', formatCurrency(royaltySum));
    updatesRow = $(sumRow).html().replace('{SUM}', '').replace('{DESC}', 'Update Downloads').replace('{TOTAL}', updatesTotal).replace('{REVENUE}', '');
//    debugRow = $(sumRow).html().replace('{DESC}', debugInfo).replace('{SUM}', '').replace('{TOTAL}', '').replace('{REVENUE}', '');

    productTable.children('tbody').append('<tr>'+newDownloadsRow+'</tr>');
    productTable.children('tbody').append('<tr>'+updatesRow+'</tr>');
//    productTable.children('tbody').append('<tr>'+debugRow+'</tr>');

}

function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + '&euro;' + num + '.' + cents);
}