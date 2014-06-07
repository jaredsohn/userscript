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

productTable = $('table:eq(4)');
newDownloadsSum = 0;
newDownloadsTotal = 0;
updatesSum = 0;
updatesTotal = 0;
perDownload = 0;

if($('table:eq(0)').html().indexOf('<font color="gray"><b>Reporting &gt; Transaction Reports &gt; Preview</b></font><br>')!=-1){


    $('tr', productTable).each(function(){
        if($('td:eq(4)', $(this)).html()=='1'){
            newDownloadsSum++;
            newDownloadsTotal += parseInt($('td:eq(5)', $(this)).html());
            if(perDownload == 0) {
                perDownload = parseFloat($('td:eq(6)', $(this)).html());
            }
        } else if($('td:eq(4)', $(this)).html()=='7'){
            updatesSum++;
            updatesTotal += parseInt($('td:eq(5)', $(this)).html());
        }
    });

    sumRow = '<tr><td class="smalltext" align="right" nowrap="nowrap"></td><td class="smalltext">&nbsp;</td><td class="smalltext">&nbsp;</td><td class="smalltext">{DESC}</td><td class="smalltext" align="center">{SUM}</td><td class="smalltext" align="center">{TOTAL}</td><td class="smalltext" align="center">{REVENUE}</td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td><td class="smalltext" align="center"></td></tr>';

    newDownloadsRow = $(sumRow).html().replace('{SUM}', newDownloadsSum).replace('{DESC}', 'New Sales').replace('{TOTAL}', newDownloadsTotal).replace('{REVENUE}', formatCurrency(newDownloadsTotal * perDownload));
    updatesRow = $(sumRow).html().replace('{SUM}', updatesSum).replace('{DESC}', 'Update Downloads').replace('{TOTAL}', updatesTotal).replace('{REVENUE}', '');

    productTable.children('tbody').append('<tr>'+newDownloadsRow+'</tr>');
    productTable.children('tbody').append('<tr>'+updatesRow+'</tr>');

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
    return (((sign)?'':'-') + '$' + num + '.' + cents);
}