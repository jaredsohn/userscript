// ==UserScript==
// @name       wls.com.tw fix
// @namespace  http://scottt.tw/userscripts/wls-com-tw-fix
// @version    0.2
// @description  Partially fixes etrade.wls.com.tw being IE only
// @match      https://etrade.wls.com.tw/*
// @copyright  2012+, Scott Tsai
// @license        BSD without advertaising clause (http://fedoraproject.org/wiki/Licensing:BSD#FreeBSD_BSD_Variant_.282_clause_BSD.29)
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==

(function($) {
    var loginPage = function() {
        /* The original submit() function calls capix.ClearImported()
         * This removes the call.
         * where "caipx" is defined by content from an object tag.
         */
        var f;
        var submitFixed = function (cf) {
            document.getElementById('urlParam').value = location.search;
            cf.action = 'db.jsp';
            cf.submit();
            return true;
        };
        if (0) {
            console.log('wls.com.tw fix');
        }
        f = $('[name="loginform"]');
        f.attr('onsubmit', null);
        f.submit(function() { submitFixed(loginform); });
    };
    
    var statementPage = function() {
        /* 	帳戶查詢 - 應收付款項
         * Date.getYear() vs. Date.getFullYear() bug
         */
        var currentYear, monthSelect, yearStart, yearEnd;
        
        currentYear = new Date().getFullYear();
        monthSelect = $('[name="month"]');
        yearStart = $('[name="tyy"]');
        yearEnd = $('[name="tyye"]');
        
        var fixMonthlyStatementSelect = function(monthSelect) {
            /* 11208 -> 201208 */
            var options = $('option', monthSelect);
            var y = currentYear;
            var m = new Date().getMonth() + 1;
            var i;
            for (i = 0; i < 12; i++) {
                var o = $(options[i]);
                var x = y * 100 + m;
                o.html(x);
                o.val(x);
                m--;
                if (m == 0) {
                    y--;
                    m = 12;
                }
            }
        };
        fixMonthlyStatementSelect();
        
        var fixYearSelect = function(yearSelect) {
            var i;
            var options = $('option', yearSelect);
            for (i = 0; i < options.length; i++) {
                var o = $(options[i]);
                var y = currentYear - i;
                o.html(y);
                o.val(y);
            }
        }
        fixYearSelect(yearStart);
        fixYearSelect(yearEnd);
    };
    
    var documentReady = function() {
        var p = document.location.pathname;
        if (p == '/login.html') {
            loginPage();
        } else if (p == '/page02_2.jsp') {
            statementPage();
        }
    };
    $(documentReady);
})(jQuery);

