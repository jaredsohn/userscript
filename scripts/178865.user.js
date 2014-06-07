// ==UserScript==
//
// Displayable Name of your script 
// @name           gffunds_transferpre
// 
// brief description
// @description    Provider better user experience for fund transfer on gffunds。   
//
// URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://userscripts.org/users/515318/gffunds/
//
// Your name, userscript userid link (optional)   
// @author         brian (http://userscripts.org/users/515318) 
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//(optional) may be used by browsers to display an about link
// @homepage       http://userscripts.org/scripts/show/178865/ 
//
// Version Number
// @version        1.2
//
// Urls process this user script on
// @include        https://trade.gffunds.com.cn/trade/transferpre.jsp
// @include        https://trade.gffunds.com.cn/trade/TransferAction.do
//
// @history        1.1 updated version
// @history        1.0 first version!
//
// ==/UserScript==


function delayBindInputPage(){
    var timerId = setInterval(function () {
        if ($('#ejiaA1 :radio').length) {
            clearInterval(timerId);
            inputPage();
        }
    }, 100);
}

function inputPage(){
    $('#targetFundCode').parent().append('<div style="float:right"><p id="showTransferFund" style="color:#FC6901;font-weight:bold;text-align:left;font-size:25px;"></p></div>');

    $('#targetFundCode').change(function(){
        var text = $('#targetFundCode option:selected').text();
        $('#showTransferFund').text(text);
    });

    $('#ejiaA1 :radio').click(function(){
        var curRow = $(this).parent().parent();
        curRow.find('td:first').css({'color': '#FC6901', 'font-weight': 'bold'});
        curRow.siblings().find('td:first').removeAttr('style');
        $('#showTransferFund').text('');
    });
}

function confirmPage(){
    $('.success201102 tr:eq(0) td:last').css({'color': '#FC6901', 'font-weight': 'bold'});
    $('.success201102 tr:eq(4) td:last').css({'color': '#FC6901', 'font-weight': 'bold'});
}

$(function(){

    var url = document.location.href.toLowerCase();
    if(url.indexOf('trade/transferpre.jsp')>0){
        delayBindInputPage();
    }else if(url.indexOf('trade/transferaction.do')>0){
        confirmPage();
    }

});