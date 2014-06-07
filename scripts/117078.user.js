// ==UserScript==
// @name       How much in KRW
// @namespace  http://blog.gwangyi.kr/
// @version    0.1
// @description  eRepublik golds in KRW
// @include    http://www.erepublik.com/en/get-gold/gold
// @copyright  2011+, gwangyi
// ==/UserScript==

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else { letsJQuery(unsafeWindow.jQuery); }
}
GM_wait();

function letsJQuery($) {
    var today = new Date();

    $('document').ready(function(){
    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://www.customs.go.kr/kcsweb/user.tdf?' + $.param({
            a: "user.exchangerate.ExchangeRateApp",
            c: 1001,
            mc: 'WWW_ENTRY_SYSTEM_040',
            isExport: 2,
            aYear: today.getYear() + 1900,
            aMonth: (today.getMonth() + 101 + "").substr(1),
            aDay: (today.getDate() + 100 + "").substr(1)
        }),
        onload: function(response) {
            var rt = $(response.responseText);
            $('table:last tr+tr', rt).each(function()
                                           {
                                               if($('td:first+td', this).text().match(/EUR/))
                                               {
                                                   var euro;
                                                   euro = $('td:first+td+td', this).text().replace(/[^0-9.]+/, '') - 0;
                                                   $('.goldHolder div').each(function()
                                                                             {
                                                                                 var won = Math.floor((euro * ($('strong', this).text().substr(1) - 0)));
                                                                                 var val = "";
                                                                                 while(won >= 1000)
                                                                                 {
                                                                                     val = "," + won % 1000 + val;
                                                                                     won = Math.floor(won / 1000);
                                                                                 }
                                                                                 val = won + val;
                                                                                 $('strong', this).text(val);
                                                                                 $(this).attr('title', '￦' + val);
                                                                             });
                                               }
                                           });
        }
    })});
}
