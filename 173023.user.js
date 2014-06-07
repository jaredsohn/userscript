// ==UserScript==
// @name       mops.twse.com.tw fixes
// @namespace  http://scottt.tw/userscripts/mops.twse.com.tw-fix
// @version    0.1
// @description  Fix mops.twse.com.tw bugs in Google Chrome
// @match      *://mops.twse.com.tw/mops/web/t05st10*
// @copyright  2012+, Scott Tsai
// @license BSD without advertaising clause (http://fedoraproject.org/wiki/Licensing:BSD#FreeBSD_BSD_Variant_.282_clause_BSD.29)
// ==/UserScript==

UserscriptFixes = {};

(function($) {
    var self = UserscriptFixes;
    
    /* checkAutoRunScript() from the orignal code.
     * Very convoluted control and data flow.
     * 'document.autoForm' only exists after DOM manipulation and
     * doesn't match the value in the UI */
    
    self.checkAutoRunScript = function() {
        /* called from timer, i.e. setInterval() */
        var year = self.inputYear.val();
        var month = self.selectMonth.val();
        
        if (document.autoForm !== null && document.autoForm !== undefined && document.autoForm.run.value === ''){
            var f = document.autoForm;
            
            document.autoForm.run.value = 'Y';
            
            /*
            UserscriptFixes.autoForm = autoForm;
			console.log(document.autoForm);
            debugger;
            */

			$(f.year).val(year);
			$(f.month).val(month);
			$(f.yearmonth).val(year + month); 
            ajax1(document.autoForm,'table01');
        }
        
        if (document.autoRunScript !== null && document.autoRunScript !== undefined && document.autoRunScript.run.value !== ''){
            var s = document.autoRunScript.run.value;
            document.autoRunScript.run.value = '';
            new function(){
                eval(s);
            };
        }  
    };
    
    var documentReady = function() {
        self.inputYear = $('input#year');
        self.selectMonth = $('select#month');
        self.inputYear.css('visibility', 'visible');
        self.selectMonth.css('visibility', 'visible');
        unsafeWindow.checkAutoRunScript = self.checkAutoRunScript;
        console.log('documentReady');
    };
    $(documentReady);
})(jQuery);
