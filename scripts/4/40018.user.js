// ==UserScript==
// @name           GCBBCode
// @namespace      madd.in
// @include          http://*.geocaching.com/seek/log.aspx*
// @include          https://*.geocaching.com/seek/log.aspx*
// @include          http://*.geocaching.com/track/log.aspx*
// @include          https://*.geocaching.com/track/log.aspx*
// ==/UserScript==
//
// (C) Copyright Martin Georgi 2010.
// Chrome patch by ReuDa
// Version 1.31

var version = '1.31';
var scriptId = 'gcbbcode';

var ENVIRONMENT = (function() {
	if (typeof chrome != "undefined") {
		return 'chrome';
	}
	else if (typeof safari != "undefined") {
		return 'safari';
	}
	else if (typeof GM_log != "undefined") {
		return 'greasemonkey';
	}
	else {
		return 'document';
	}
})();

if (typeof window.uneval === "undefined") {
        window.uneval = function(a){
                return (JSON.stringify(a))||'';
        };
}

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

var textForm = document.getElementById('ctl00_ContentBody_LogBookPanel1_uxLogInfo');
if(!textForm){
	textForm = document.getElementById('tbLongDesc');
}

document.getElementById('aspnetForm').addEventListener("submit",function(){
    var logType = document.getElementById('ctl00_ContentBody_LogBookPanel1_ddLogType');
    if(getSelectedValue(logType)==2 || getSelectedValue(logType)==10){ // increment count on "found it" or "attended"
        setFounds(getFounds()+1); 
    } 
    
    textForm.value = textForm.value.replace(/\{FINDS\}/g, getFounds());
}, false);



// add auto resize
textForm.addEventListener('keypress', grow, true);	
function grow() {
	if (this.scrollHeight > this.clientHeight)
		this.rows += 1;
}




var templates = eval(GM_getValue('templates',new Array()));
var templateMode = false;
var templateTable = document.createElement('table');

// --- IMAGES ---
var qmark_image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAttJREFUeNp8k91LU2Ecx7%2FnZXObujlftlxuGanbKAlMChGkS1GxBKGriAq7iLwLguom6KI%2FoLwIgsib0osgTNRMMXwhUXOapE5JNJ0693p0521np%2BcxGF71uzk%2FnufzfX6vh0F5K7KWyQBCCvbTjqoqt9PHcaxJ0zLS6tbecmx7fxX5FoBlszif9UQFtkKb796d1rttzfWN3grPOZ5nuXQ6o62sba5%2F%2FDwx8PrD1zeJaGIZZuM%2FDUsjOxvhqb3VMDoemNf%2FY%2FSecpQ%2F1sHTApv%2FhndsciFwEpwObOi9fXP6%2B08z%2BuLydvaccpSnOg6cm%2Bm83fKo42ZTG81EUVS86PqCZ68G0T3wA8NTQUxNryPXZMAFrwtn3E5nZD8qTY4HhtkSl8N7vamuRdc1yLKInVAE26EwmusrcP9aDc57rNja3Udv%2FzRi8SR5XgflqY4tK7V7ncX5nmQiCUE4gt1mxPOHzbjoL0GeWYemimQKEirLbOSbhpBIgPJUx3McY1EV2ZgUBJCxwGDgsLMbw8DIHIkYRa45Bx3ttWhvvozDI4FEZkB5quMlUUmFI1FF1618Oq2RMbJgdBVXr5wlWVSj2u%2BGroNkICMWE8HzHA6iSYXq%2BJ1wfHXt9%2FamxcT5JEmBgVwOjS3g5bshuJx2POlsQ1lpIejD1EwmIyhPdXw0IqwMjM73l5fm%2B2Q1A44BdvfCpDwJFrILsphCIs5Cy%2BhgGAaKxILyVMeh2K9vhKJb7pL8Bofd7BQlGUX2XLgcVtRdqkAx8emZqqqkHA3fAxuLb%2FtmHqtAmIPdB1VSDxaCoZ%2FOAnON3Wo8lWNg4XYVwZLDQxQl0mWNpK1ibulPoKtn6kEyKc2CY8mSFHhBHTGlbM6uhr4l4imZYzIFsqLkHaVk%2FSglKVs7sbXBiWB3z8jSU0EgQjIRHPf95F9F26pojNVm8hfmmSpJjTlkI%2BXooRRMJqRfMHK08Cz%2BV4ABAGmclqueREoBAAAAAElFTkSuQmCC';
var colorPickerImageString = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00'+
'%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSoftware'+
'%00Adobe%20ImageReadyq%C9e%3C%00%00%00%18tEXtCopyright%00Stella%20Schulze%D4b%7D%BE%00%00'+
'%02%ADIDATx%DAbd%40%02%D6%9E%E1%19%40j%3A%8C%2F%23%23s~%E5%EC%5E%23%06%2C%A0%A1%A1%01L%03'+
'%04%10%13L%C0%CC%25(%E3%F7%EF%DF%D3%81%B8%F4%E8%F6%95%8CRRR%0C%0A%D2b%86%A1%C9%85%FF%19%F'+
'0%00%80%00b%811~%FE%F81%FD%E2%91m%8C%20vpb%FE%7FE%19q%86%F0%40o%86%DB%0F%1E3%7Cf%17%FE%FF'+
'ZP%3B%0C(%F5%1E%88%1F%9Fm%0D%BC%09%D3%07%10%40p%03~%7C%FF%96%A9n%EC%F0%3F%3D)%96%C1%40W%9'+
'3ATD%98!%AB%A8%8A%E1%D5%EB%B7%60%F9%97%1A%7C%AB%3E%FC%E7%3C%0Bd%BEf%88%9A%7D%8E%81%E1i5H%'+
'1C%20%80%18Q%C2%C0%3D%E4%FF%93\'%8FQ%9Cxl%DFf%06%2B\'_%06%D3%80D%86%3D%F7%7F2%7C%60%E0%3A%0'+
'B%95%BA%D9%A0%F64%1A%20%80%E0%06x%85%A7%FC%D7P%96c%08%F0qg%D0%D4Rg%10%E1%E7gx%F3%F1%23%83'+
'%AE%B1%3DCSU!%C3%85kw%18%5Eq%C80%EC%BE%F7%83%E1%23%237%D8%10cE%91N%80%00b%061%DC%83%13%C0'+
'%9A%BD%DC%9C%18t%F5%B4%C0%9A%9F%BDz%CDp%EF%EE%7D%06mu%15%86%9B7o1hk%AA2%84%B8%DB0%08%F0r3'+
'%9C%BB%FDD%E0%17%23%EB%9B7%9F%7F%88%02%04%10%93%B3%7F%CCSu%A0fo%A0f%03C%5D%B8%E6%87%0F%1F'+
'2%5C%B9r%15%A8%F9%26%83%9A%BA%1A%83%99%99)%C3%99%D3%E7%18%8E%AF%99%CB%F0%E5%2F%F3C%98%CB%'+
'01%02%88i%EF%C6%25!%17%AF%DDb%B8%F5%E0%11%C3%C7O%9F%C1%CE~%F0%F0%11%C3%E5%CB%D7%E0%9AM%CD'+
'L%18%8E%9E%3C%C7%B0r%DD%26%06%A0zG%06%16%F6o0%03%00%02%08%14%0B%C7%0FnY%E1%F8%F7%CF%DF%FD'+
'%BF%7F%FDf%D0RSf%B8%7F%EF%3E%C3%AD%5B0%CD%C6%0CGO%005%AF%DD%CCpd%C7jG%A0%FA%03%C8%81%0C%1'+
'0%40%B0h%3C%00%92%FC%F3%E7%F7~C%1D%0D%06V%A6%7F%0C%DA%DAZ%40g%1B3%1C%3Av%86a%F9%EA%8D%0C\''+
'%F6l%80kff%06%07%1D%90fb%00%08%20%26%24%C3%0E%80%14%9D%B9x%95%E1%E7_%60%CA45%06%9Az%9Aa%C'+
'9%8Au(%9AA%80%9B%9B%1B%8E%01%02%88%05-e%1E8%BD%7F%B3%E3%BF%BF%7F%F7%EF%3F%7C%92a%E9%CAu%0'+
'Cg%0Fm%C3p%B6%80%80%00%9C%0D%10%40%2CX%92%F7%01%90%A6%DF%BF%7F%CE%BAt%7Co%1A%BAft%03%00%0'+
'2%88%05G%1E9%00%D4%1C%05%A4%CF%60%93%14%17%17%87%B3%01%02%88%05%96-%B1%803%B8%24%EEIJ%C2%'+
'D9%00%01%06%00%3B%BA%00%03%9Ah%00Z%00%00%00%00IEND%AEB%60%82';
 

 var strikeImageString = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAA" +
"AABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZT" +
"wAAACfSURBVCjPY%2FjPgB8yUFNBiWDBzOy01PKEmZG7sSrIe5dVDqIjygP%2FY1GQm5b2" +
"P7kDwvbAZkK6S8L%2F6P8hM32N%2FzPYu2C1InJ36P%2FA%2Fx7%2Fbc%2BYoSooLy3%2F" +
"D4Px%2F23%2BSyC5G8kEf0EIbZSmfdfov9wZDCvc0uzLYWyZ%2F2J3MRTYppn%2F14eaIv" +
"KOvxxDgUma7ju1M%2FLlkmnC5bwdNIoL7BAAWzr8P9A5d4gAAAAASUVORK5CYII%3D";
 
 var boldImageString = 	'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%'+
 '00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSoftw'+
 'are%00Adobe%20ImageReadyq%C9e%3C%00%00%00%DAIDATx%DAb%FC%FF%FF%3F%03%25%00%20%80%98%18(%'+
 '04%00%01%C4%82%CCQ%D7%B1V%00R%A1X%D4%3D%00%E2%D50%CE%CD%2BG%E1%12%00%01%C4%82%A6P%05%88%'+
 'BBpXv%1F%88%9D%A0%86%C1%01%40%00%E1%F3%02HC%19%10%9F%87%F2%15%81%B8%12%5D%11%40%00%E13%E'+
 '0%0E%10wC%0Da%402%04%05%00%04%101%81%E8%8A%C4%DE%8D.%09%10%40%2C%044%FEG%F3%D2ltE%00%01D'+
 'J4%82%9C%DF%89.%08%10%40%F8%0C%009%97%11%EA%92%F7P%B14%206%40V%04%10%40%C4%B8%60%0F%10%9'+
 'FA%E2%8B%20K%02%04%101%06%80l4A%8B%1D8%00%08%20R%02%91%01%9A%C8P%12%12%40%00%B1%10%E1%82'+
 '%F7Po%ACFN%CE0%00%10%40%8C%94%E6F%80%00%A287%02%04%18%00%D8%7D%22%07E%A3EN%00%00%00%00IE'+
 'ND%AEB%60%82';
 
var italicImageString = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00'+
'%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSoftw'+
'are%00Adobe%20ImageReadyq%C9e%3C%00%00%00%C2IDATx%DAb%FC%FF%FF%3F%03%25%00%20%80%18)5%00%'+
'20%80P%0CP%D7%B1%C6%A6%E6%01%10%CB%23%F1%2F%DE%BCr%D4%00%C6%01%08%20%26%22%2C%09%40b%3B%0'+
'2%B1%01%B2%24%40%00%11c%00L%C3F%20%3E%80.%09%10%40%A4%B8%60%036I%80%00%22d%80%02%10%FB%03'+
'%F1G%20%5E%80M%01%40%001Qb%3B%08%00%04%10!%03%0A%A0%F4%04%5C%0A%00%02%88%89%40%E0%81%A2%E'+
'F!%10_%C0%A5%08%20%80%98%88%B0%7D%01%3E\'%02%04%10%13%11%FE%C7k%00%40%001%E1%D1%CC%0F%C4%0'+
'7%A1)%11\'%00%08%20t%03%04%A0%01%B6%00)%1C%1C%F0%19%00%10%40%2CX%0C%F8%80%2F%D4%D1%01%40%0'+
'0Q%9C%1B%01%02%0C%00%CA%3A!%B5%FDF%2F%1D%00%00%00%00IEND%AEB%60%82';
 
 var underLineImageString = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10'+
'%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSo'+
'ftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%E7IDATx%DAb%FC%FF%FF%3F%03%25%00%20%80X%60%0'+
'Cu%1Dk%10%E5%02%C4%86%40%7C%1E%88%F7%A0%A9%85%C9%AD%06%E2%077%AF%1C%05%0B%02%04%10%13%9A%'+
'22%90%82.(%CD%80CN%05Y%10%20%80%98%18(%04%00%01%04%F7%02%C8IPo%C0%F9%C8%00%97%1C%40%00%B1'+
'%60S%80%8D%8F.%073%04%20%80(%F6%02%40%00Ql%00%40%00Ql%00%40%00%A1%1B%F0%00J%BBbQ%1B%09%A5'+
'%CF%20%0B%02%04%10%BA%01%BB%81%F8%3D%D4%80R%20%16%80%E2%99%D0t0%0B%18x%1F%905%00%04%10%8A'+
'%01PI\'%20%BE%0FM4%EF%A18%0D%A4%19%88%CB%D1c%07%20%80X%B0D%CF%05%20S%09%C8V%40Jug%606%A3%1'+
'B%00%10%40%C8%06%1C%02b%5B%5C%F1%8F%24~%18%9AW%F2A%1C%80%00b%A447%02%04%10%C5%D1%08%10%60'+
'%00%3D%D6%3B%9C%3A%B2%D8%83%00%00%00%00IEND%AEB%60%82';
 
 var linkImageString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F'+
'9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAYdEVYdENvcHl'+
'yaWdodABTdGVsbGEgU2NodWx6ZdRifb4AAAQOSURBVHjaYvz%2F%2Fz8DMhANbnVjYWN3Z2FhsWJiYtIEif379%2B'+
'%2F6nz9%2Fjv359XPn67XVu5DVAwQQI8wAIc8SBQ5ByRwDFeksDxM1Th1FEQYudjaw3K%2FffxiuPHzDsOvMnW9nb'+
'z2e8fXt08nvtvc8AMkBBBDYAEG3AgUFVaFuR%2F2vIYrSSgzcHKwMQlz3GLiBBjz5qM3w%2Fis%2Fw%2BfvbAw%2F'+
'f3xgePL6GsPJa%2F9Wvnr0quL9rgkPAAKIBWSKhgZbpZfF5RBP0xcMP%2F49Yrh435Th9rOfDKwsPxm%2B%2FP3LY'+
'CB7jOHHz3cMv%2F8xMjjrXWbgYhMI3%2FdX%2BxVQax5AAABBAL7%2FBBFGcEY5OAddIhbiAAcG%2BwAQC9wA8fLz'+
'APAG8QDY6UYA5%2FMLAC0Z4gAhFuwAEw%2FmAP3%2B5AA9K%2FAA7PAJZh9RaLkCiIWNW8D9x18%2Bzu%2F%2FpBj'+
'YmI8DnfmJ4d7zJww3n3szPP1qwsAOdMWN5yIMQnxvGR7f%2B8xw9IYFAw%2FLMwZF8VvsTySNggACAEEAvv8EBQoN'+
'Og8M%2FgAZEOgA4uoCANnlEgDD1DYA8QBNAAABAwD2%2BQoA2OgoABEK7gDl7PEA9vcPAAUK%2BwD8%2FwUADg4FN'+
'wKIBRRVzEz%2FGS5c%2FMFw8Jgow%2B17UkBn%2FmfgFNzHICivycAvpcTw%2FdVVhjOPzjC8fP4WaOhZhuecvxl%'+
'2Bc7sxvPshIAcQQCz%2Ffn1juHOLieEvixlDV0kKg7aaPjjqzl%2B7wVA3YSnDh2cMDDx%2FPjHk5U9nUFcxAMtdv'+
'n6Coa6ng%2BHtu2fMAAEAQQC%2B%2FwAXS3XHG0Fj%2F8bO1f%2Fo6Oj%2FdH5V%2F3eETv%2F4%2BPf%2FusG%2B'+
'%2FyZNav%2FHz9T%2F5%2Bjo%2F1ttWP9vfUj%2F9%2Fj3%2F7m%2FuP8UMT%2FnAgBBAL7%2FAvrz7sb27ucAMys'+
'lAHOGiAARF%2FoA7PDJAD5LMgCanqgA5861AJidoQA%2BSlgAzdr4AP0H3AB6iVgAIx0kAPzz9fUCiOX3l3c7Gb5%'+
'2BzAO6jIWJVYTh8LnHDLoyXgyblrcxiItKgJ0MSmyPHj9lqGyfyPDk4W0GKWFmBiFhIWA6YXwJEABBAL7%2FAvPNr'+
'roDAv3Oy9LWAKCKegAkHjUA5%2BvvAImUngBEUFMAFSg4AE5cZwCRnaMA7vL3ABsXQgCThasAwsXI%2BAkJCMICCJ'+
'yUJfQcQtXkJadkJkaJGWqpMnBzczMcO7OfYfHWgwzcmqEMP%2B%2BeZoj2tGDQUJRk4OLiYjh%2B%2BsyvBSs3Xrz'+
'94HExQADBMxPIkB%2Ffv5X8%2BfPbSFLyKwsn%2F38GNqlgBiZBPYb3D68xvLt3ieHHu2d%2FWBn%2BPuDi4drNys'+
'q8%2FOG5Q4cBAogRPTvzGge5MTEzuTMzMVsxMjJqQsPg%2Bt9%2Ff4%2F9%2B%2FtvJ8jLyOoBAgwA0%2FOkT2jAx'+
'5cAAAAASUVORK5CYII%3D';

var rot13ImageString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F'+
'9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA%2BUO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kBA'+
'wklADESinEAAAC5SURBVDjL1VGxEcMgDHz5UqTIHG5c2G69iAtP4ImYgIJFaA0FDXOkSCpSiVOIsRs3%2BTsOgfT%'+
'2FQgB%2FD%2BKg7aYk7u8x2Pceoe2mFIPNvKbIPwDAaPWqkXnfnE97As%2BSwAsA2NlohVoHX0lJYkfGOPT0I2C0w'+
'rysObkzGwDAvKxZMBduzqdx6IkTMi5dZQ3VBhWDJekuJ38KOeXN%2BSTPJZozoXlZD80OBWKwVP7K5R3cas4AUgyW'+
'am%2B%2FDB9MC2bPDPVfkgAAAABJRU5ErkJggg%3D%3D';

var deleteImageString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2'+
'F9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA%2BUO7fwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9kB'+
'BRMcEvj1D%2FkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB%2F0lEQVQ4y6WTvWtTYRTGf'+
'zf3hiaN9zYfQxJyEWmSK0gXJx3Empg6OKlFBW3xC9RKFbs4dRR0a1AnEULULIr%2BASVJae1gZhNbktJALZnD1cYk'+
'SF6H9iaUFNF6pnMOz%2FOc8xzeV2InPnx8LyprZf4mohGD8QsXJQDFalbWykzdmabdbneBQog%2BshCCVPpVt1aSm'+
'U8imVkGOjQaDer1eh%2FRqu12OzabDYBDZ5%2BIh1dPoCQzy8zOXGJ98SWmaVKr1fYkA8iyjCRJmKbJ7MxtHs%2B9'+
'61koVr9Tr9epVqt%2FtGBhh0d3LFjN9Z86N5%2Fm%2BsCStJeE3ruBlYwcT7Cf6Aokjvr%2BT%2BDrpvlPxCO6tm3'+
'x8qOMKBQ39jX92MhBuie6%2F%2BCeuHH9Ful0ipOjp1haWiQWi5PP5xgbO8PCQo54LEE2N09y7nmXZ7MSl8tFR3QI'+
'hIK0Wm0i4SiyrBCJGMiygqqqOAcHUVVt1xZdAb8%2FgMfjxel0Eh4O0%2FrVRNdD%2BHxevB4vAIcNA7%2Ff3y%2B'+
'Qzc4Lm00iGAjicrr4trmBotjxeLwMaRoHVBehkI7D4UTTNEqlotglUCx9YeruNG%2FepnG73Wxt%2FcAxMMCQptFs'+
'NykUPgOQfp1icuIa5fJq76FZG6ysrqDrOufPjUsAz14khaZqKHY7E1cmpe0fWxH5XJaoYRCPnZYAfgPl2qpy77DQw'+
'QAAAABJRU5ErkJggg%3D%3D';

var insertImageString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2'+
'F9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA%2BUO7fwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9kB'+
'BRMcIDAiXnkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB0klEQVQ4y5WTPWtTcRSHn%2F9'+
'NFA0mhki9JYNDwaCgWbTGxLgGBJ0UdCpYEG0FB5FmqEtBBAvi4qT9AA4uOugHKLaLLnFRYrNoNDahNzdpWlt6z3GI'+
'eW0D8bedt4ffOXCMqo7RJWNMYX7%2BieZyn7vTxOOnmZnJGvpkVHVs6f3CytsXWRrrDoqFO3qDZDKOZTX7RZTl5Ry'+
'HS68wCIFghKtTz0hkJozfGFN4cCXI5YTNj%2B1TfHRiWO42q6t1jGkBBMvy4TtxkzPhb4z6vvP6%2BT0A%2FAAqO%'+
'2Bz3%2B%2FhUjjH36CmO45DP53usTk4eJxKJ8HD2Ptejv9jcqHcALTW2IBQKoSqMj5%2FtX5dgMMjWDnjaOUUboKo'+
'9zYsflnridCrJXvIzQBcvpOjABRFvMED3KLQcqCoqQvL8uf9zkE4lERFEBFXBdV1GRuzhAN2DIs3hWr02vAMRrw0p'+
'%2FixSqZR3HbkX0FfzvCagVnOplMtkMpcGbYo1yIHrVin9LiEi7fyd6VtMHFscvEJgn7LmrGHbUWw7Six2Etetoip'+
'M3b3dHvYZ7QUYy0%2Fjj0ci%2FIXHc1k2vd2nSR%2F5SqFxFICwFjkQCALVf9%2F4bmHlzcssG%2BsOw%2BjgoQjX'+
'ppvf%2BBd3Adwco75UngAAAABJRU5ErkJggg%3D%3D';

var editImageString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9'+
'hAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA%2BUO7fwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9kBBR'+
'MbK%2BixETYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABm0lEQVQ4y6WTPWtUQRSGn2HXj'+
'3vdJW7U8jZRi9gJhhBYwY%2FCPxCyCSlUbEQljb2tVRorC4NVgsYfoEGr7GInBCJJF9IEkiwkEZK9l8mdeS3uknXx'+
'LhvxMM3hzHnOO%2B%2FMwH%2BGWfz0UfXG8l8Fay0Ak7Up7t65Z3oBivXGMo8fPsktJknM3Pt3NBp1Vau3cyHm2Yu'+
'nmhivsba%2BlhHPFCiXS32lDw1dZXRkzBSdcwRByMWBSkYseCYnpvsCPizOZwOttcRxi4Nf%2BwBUBgcAaLWOejaH'+
'4YWOB2madikAf1Jcbx%2FrzxgevtFtIpCrIG9z7i2cVkGpVCaKonxAHLf4%2BvOQ1WYIwOy3%2BR7zfnRl95%2FPq'+
'QgQBCGrzZA3Lx%2BQWHeqF3j%2BbIGZ2aWOBwDb%2Bwkbu0d9m53zRJfDjolBkCUCJGGMQRISeAnnRerEsfPY1JM6'+
'cal8rvsWrlVi9g4tW3sxyOAR7YUEQkhtMJAc%2Bw5gp7nLzbEqK5sH7aZsugQeIQxIJ6pGrw%2By9PkLtZErmJnXC'+
'%2Fq%2B4f%2F5G9%2BKUt6%2BemR%2BA0EnwNU8ICcwAAAAAElFTkSuQmCC';

var newImageString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9h'+
'AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA%2BUO7fwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9kBBRM'+
'cBXsmij4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABTklEQVQ4y62TMUtDQRCEv727GDBq'+
'NIKgjZUggtqnUBBjFe0s9aek8HcIFhb%2BjZdSC0WIKdVCQQjBQpTwcu%2FWIhqT%2BIxBnGaXY2Zu9paTarWqURQ'+
'xDLlcm9nZN6bzLXa2lhmfWEHctgC4KIqoVCpDDV6ej8mYS6x5IEnuab3W0PhUZexA3Cep2WwSQgBARLrijDkna6%2'+
'FIuGvErGGdIfgaPnaov9CuwaD4sxp5wpoHxKwibhewGBVCcgd6i%2BuNOiju9PrRWWAMxIFYEAVyXwbpYiHoHEHns'+
'aGOJllA0KROCItglvsTpKUJrOPDI%2BCxegMo3i%2Fg2SRrl8QMG0FEUKaItUxb94iTMnGyz8nZPJMzh501DhN%2F'+
'1Um8biAi5PN5Go2j7qWGEdH7Nr34toW0BD%2BJ%2BxKkkQbP0jhm1Li%2FjlAoFPgLZJTfOIhSqUSxWBT%2BA%2B9'+
'CW2rE0GjCswAAAABJRU5ErkJggg%3D%3D';

var quoteImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAA'+
'BGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEvSURBVDjLY%2Fj%2'+
'F%2Fz8DJZiBagZEtO8QAuKlQPwTiP%2FjwbuAWAWbARtXHrz1%2F%2Fefv%2F%2FxgS0n74MMuQ3EbHADgBweIP7z'+
'99%2B%2F%2Fx%2B%2B%2Ffv%2F8tO%2F%2F88%2B%2Fvv%2F5P2%2F%2Fw%2Ff%2Fft%2F782%2F%2F7df%2Ff1%2'+
'F5xXE8OoFx0GGmCEbIJcz9QBY8gVQ47MP%2F%2F4%2FBmp%2B8Pbf%2F7tQzddf%2FP1%2F9RnEgM5VZ0EGeGM14C'+
'lQ86N3UM2v%2F%2F2%2F9RKi%2BQpQ88UnuA2AewHk%2FPtAW%2B%2B8%2Fvv%2FJlDzted%2F%2F18Gar7wBGTAH'+
'7ABtYtOgAywxBqIIEOQAcg1Fx7%2FBRuMFoicuKLxDyzK5u64Cjfo%2FecfYD5Q%2FDLWaMSGgQrvPH%2F3FabxOx'+
'DXEp0SgYp7Z267AtL4BYgLSUrKQA1KQHwPiFPolxcGzAAA94sPIr7iagsAAAAASUVORK5CYII%3D';

var arrowLeftImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAA'+
'vZezQAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAA'+
'Ad0SU1FB9kBCgsBOnh6KYEAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAL0lEQVQ'+
'I12NgQAJFRXn%2F4ZzIiLD%2FAgICEAEnR4f%2FAgICEIGAAF84B7sKrGYg2wIAdZEYxjFTpkcAAAAASUV'+
'ORK5CYII%3D';

var arrowRightImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAA'+
'AvZezQAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAA'+
'AAd0SU1FB9kBCgsCEf%2FrgwIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAANUlE'+
'QVQI12MoKsr7z4AMBAQE%2FkdGhP1HERAQEPjv5Ojwn4GBgYFRQEAALuvgYIupAtMMdFsAIQEVOnJbKyEA'+
'AAAASUVORK5CYII%3D';


function addCodeFunction(code){
	return function(){
		
		/* Einfügen des Codes */
		var start = textForm.selectionStart;
		var end = textForm.selectionEnd;
		var selection = textForm.value.substring(start, end);
		
		var insertText = "[" + code + "]"+selection+"[/" + code + "]"
		
		var position = textForm.selectionStart;
		textForm.value = textForm.value.substr(0, start) + insertText + textForm.value.substr(end, textForm.value.length);
		
		/* Anpassen der Cursorposition */
		if (selection == ''){
			textForm.selectionStart = start + code.length + 2;
			textForm.selectionEnd = start + code.length + 2;
		} else {
			textForm.selectionStart = start + (code.length + 2);// + selection.length + 1;
			textForm.selectionEnd = start + (code.length + 2) + selection.length;
		}
    	textForm.focus();
	}
}

function addURL(url,caption){
	/* Einfügen des Smilies */
	var start = textForm.selectionStart;
	var end = textForm.selectionEnd;
	
	var insertText = "[url=" + url + "]"+caption+"[/url]"
	
	var position = textForm.selectionStart;
	textForm.value = textForm.value.substr(0, start) + insertText + textForm.value.substr(end, textForm.value.length);
	
	/* Anpassen der Cursorposition */
	textForm.selectionStart = start + code.length + caption + 12;
	textForm.selectionEnd = start + code.length + caption + 12;

	textForm.focus();
}

function addURLFunction(){
	return function(){
		var url = prompt("Please enter URL.","http://");
		if( url == "" || !url) return;
			
		var caption = prompt("Please enter caption.",url.substr(7,url.length));
		if( caption == "" || !url) return;
		
		addURL(url,caption);
		
	}
}

function addRot13Function(){
	return function(){
		/* Einfügen des Textes */
		var start = textForm.selectionStart;
		var end = textForm.selectionEnd;
		var selection = textForm.value.substring(start, end);
		
		if (selection == ''){
			alert('Please select some text.');
			return;
		}
		var insertText =  convertROTStringWithBrackets(selection);
		
		var position = textForm.selectionStart;
		textForm.value = textForm.value.substr(0, start) + insertText + textForm.value.substr(end, textForm.value.length);
		
		/* Anpassen der Cursorposition */
		textForm.selectionStart = start ;
		textForm.selectionEnd = start + selection.length;
	
    	textForm.focus();
		
	}
}

function addSmilieFunction(code){
	return function(){
		
		/* Einfügen des Smilies */
		var start = textForm.selectionStart;
		var end = textForm.selectionEnd;
		var selection = textForm.value.substring(start, end);
		
		
		var position = textForm.selectionStart;
		textForm.value = textForm.value.substr(0, start) + code + textForm.value.substr(end, textForm.value.length);
		
		/* Anpassen der Cursorposition */
		textForm.selectionStart = start + code.length;
		textForm.selectionEnd = start + code.length;

    	textForm.focus();
	}
}

function createButton(image,buttonFunction,caption){
	var button = document.createElement('img');
    button.src = image;
    if(caption) button.title = caption;
    button.style.cursor = 'pointer';
    button.style.padding = '3px';
    button.style.border = '1px solid lightgray';
    button.addEventListener('click', buttonFunction, false);
    addHoverEffects(button);
    return button;    
}

function createSmallButton(image,buttonFunction){
	var button = document.createElement('img');
    button.src = image;
    button.style.marginRight = '1px';
    button.style.cursor = 'pointer';
    button.addEventListener('click', buttonFunction, false);
    return button;    
}

function getDonateButton(){

	var donate_div = document.createElement('div');
	donate_div.style.cssFloat = "right";
	donate_div.innerHTML = "<form action='https://www.paypal.com/cgi-bin/webscr' method='post'> \
                            <input type='hidden' name='cmd' value='_s-xclick'> \
                            <input type='hidden' name='hosted_button_id' value='75G3QUQL8JLAJ'> \
                            <input type='image' src='https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online!'> \
                            <img alt='' border='0' src='https://www.paypal.com/de_DE/i/scr/pixel.gif' width='1' height='1'> \
                            </form>";
	//	<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="75G3QUQL8JLAJ"><input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypal.com/de_DE/i/scr/pixel.gif" width="1" height="1"></form>

	return donate_div;

}
	

function getButtonsTable(){
	var buttonsTable = document.createElement('table');
	var trElement = document.createElement('tr');
	
	// bold button
	var tdElement = document.createElement('td');
	tdElement.appendChild(createButton(boldImageString,addCodeFunction('b'),'bold'));
	trElement.appendChild(tdElement);
	
	// italic button
	var tdElement = document.createElement('td');
	tdElement.appendChild(createButton(italicImageString,addCodeFunction('i'),'italic'));
	trElement.appendChild(tdElement);
	
	// underline button - doesn't work :-(
	//~ var tdElement = document.createElement('td');
	//~ tdElement.appendChild(createButton(underLineImageString,addCodeFunction('u')));
	//~ trElement.appendChild(tdElement);
	
	// strike button
	var tdElement = document.createElement('td');
	tdElement.appendChild(createButton(strikeImageString,addCodeFunction('s'),'strike'));
	trElement.appendChild(tdElement);	
	
	// quote button
	var tdElement = document.createElement('td');
	tdElement.appendChild(createButton(quoteImage,addCodeFunction('quote'),'quote'));
	trElement.appendChild(tdElement);
	
	// link button
	var tdElement = document.createElement('td');
	tdElement.appendChild(createButton(linkImageString,addURLFunction(),'insert url'));
	trElement.appendChild(tdElement)
	
	// rot13 button 
	var tdElement = document.createElement('td');
	tdElement.appendChild(createButton(rot13ImageString,addRot13Function(),'encrypt marked text'));
	trElement.appendChild(tdElement);
		
	// color picker
	var tdElement = document.createElement('td');
	tdElement.appendChild(createButton(colorPickerImageString,function(){showColorPicker(tdElement)},'set font color'));
	trElement.appendChild(tdElement);
	
	var tdElement = document.createElement('td');
	var spanElement = document.createElement('span');
	spanElement.innerHTML = "Finds:";
	var foundLink = document.createElement('a');
	foundLink.id = "foundLink";
	foundLink.style.cursor = "pointer";
	foundLink.innerHTML = getFounds();
	foundLink.addEventListener('click',function(){
	    var returnFound = prompt('Enter current finds:', getFounds());

		if (returnFound == null) {return}
		returnFound = returnFound.replace(/\D/g, '');
	    returnFound = (returnFound == '')?1:returnFound;
	    returnFound = (returnFound == '0')?1:returnFound;
		returnFound = Math.abs(returnFound);
		
		document.getElementById('foundLink').innerHTML = returnFound;
		setFounds(returnFound);
	
    },false);
	    
	spanElement.appendChild(foundLink);
	
	var counter_help_image = document.createElement('img');
	counter_help_image.style.marginLeft = '5px';
	counter_help_image.src = qmark_image;
	
//counter_help_image.src = 'http://online.sagepub.com/site/img/iconHelp.gif';
//counter_help_image.src = 'http://www.geocaching.com/images/wpttypes/sm/8.gif';

	counter_help_image.addEventListener('click', function(){
	    var help_text = 
"To use the counter you have to set the value of your finds first. \n\
Then you must add the keyword:\n\
     {FINDS} \n \
in your log or template! It will replaced after your submit.";

	    
	    alert(help_text);
	
	},false);
	spanElement.appendChild(counter_help_image);	
	
	tdElement.appendChild(spanElement);	
    trElement.appendChild(tdElement);
	

	
	
	
	buttonsTable.appendChild(trElement);
	return buttonsTable;	
}

function getFounds(){
    return GM_getValue("founds",1);
}

function setFounds(founds){
    return GM_setValue("founds",founds);
}

function getSelectedValue(nodeList){
	for(var i = 0; nodeList.length ; i++){
		if(nodeList[i].selected)
			return nodeList[i].value;
	}
}

function setSelectedValue(nodeList, value){
	for(var i = 0;	i < nodeList.length; i++){
			if(nodeList[i].value == value){
				nodeList[i].selected = 'selected';
			} else {
				nodeList[i].selected = '';
			}
	}
}

function setGcDate(month, day, year){
	return function(){
		var gcMonth = document.getElementById('ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Month');
		var gcDay = document.getElementById('ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Day');
		var gcYear = document.getElementById('ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Year');
			
		setSelectedValue(gcMonth.getElementsByTagName('option'), month);
		setSelectedValue(gcDay.getElementsByTagName('option'), day);
		setSelectedValue(gcYear.getElementsByTagName('option'), year);
		
		changeCalendar(new Date(year,month-1,1), 0)();
	}
}
	
function getCalendarTable(date){
	var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var daysInMonth =[31,0,31,30,31,30,31,31,30,31,30,31];
	var weekDays =['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

	var logDateMonth =  document.getElementById('ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Month');
	var logDateDay =  document.getElementById('ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Day');
	var logDateYear =  document.getElementById('ctl00_ContentBody_LogBookPanel1_DateTimeLogged_Year');
	
	if(!logDateMonth)
		return;
	
	var gcMonth = getSelectedValue(logDateMonth.childNodes);
	var gcDay = getSelectedValue(logDateDay.childNodes);
	var gcYear = getSelectedValue(logDateYear.childNodes);
	
	//~ alert(gcDay);
	
	var dateFromGc = new Date(gcYear,gcMonth-1,1); 
	if(date){
		var calendarDate = date;
	}else {
		var calendarDate = dateFromGc;
	}	
	
	var todaydate=new Date();
	
	// check for leap year
	daysInMonth[1]=(((calendarDate.getFullYear()%100!=0)&&(calendarDate.getFullYear()%4==0))||(calendarDate.getFullYear()%400==0))?29:28;
	
	
	var calendarTable = document.createElement('table');
	calendarTable.id = 'calendarTable';
	//~ calendarTable.border = '1';
	calendarTable.style.border = '1px solid black';
	calendarTable.style.borderSpacing = '1pt';
	calendarTable.style.borderCollapse = 'separate';
	
	 //~ border-spacing: 5pt; border-collapse: separate;
	
	// header ( month + year )
	var trElement = document.createElement('tr');calendarTable.appendChild(trElement);
	var tdElement = document.createElement('th');trElement.appendChild(tdElement);
	tdElement.colSpan = '4';
	
	var leftButton = document.createElement('img');
    leftButton.style.cursor = 'pointer';    
    leftButton.style.padding = '2px';
    leftButton.src = arrowLeftImage;
    leftButton.addEventListener('click', changeCalendar(calendarDate,-1), true);	
	
    
    var rightButton = document.createElement('img');
    rightButton.style.cursor = 'pointer';    
    rightButton.style.padding = '2px';
    rightButton.src = arrowRightImage;
	rightButton.addEventListener('click', changeCalendar(calendarDate,1), true);	
	
	tdElement.appendChild(leftButton);
	tdElement.appendChild(document.createTextNode(monthNames[calendarDate.getMonth()]));
	tdElement.appendChild(rightButton);
	
	var tdElement = document.createElement('th');trElement.appendChild(tdElement);
	tdElement.colSpan = '3';
	
	leftButton = document.createElement('img');
    leftButton.style.cursor = 'pointer';    
    leftButton.style.padding = '2px';
    leftButton.src = arrowLeftImage;
    leftButton.addEventListener('click', changeCalendar(calendarDate,-12), true);	
	
    
    rightButton = document.createElement('img');
    rightButton.style.cursor = 'pointer';    
    rightButton.style.padding = '2px';
    rightButton.src = arrowRightImage;
	rightButton.addEventListener('click', changeCalendar(calendarDate,12), true);
	
	tdElement.appendChild(leftButton);
	tdElement.appendChild(document.createTextNode(calendarDate.getFullYear()));
	tdElement.appendChild(rightButton);	
	
	// calendar day row
	var trElement = document.createElement('tr');calendarTable.appendChild(trElement);
	for(s=0;s<7;s++){
		var tdElement = document.createElement('td');trElement.appendChild(tdElement);
		tdElement.appendChild(document.createTextNode(weekDays[s]));
	}
	
	// create the calendar
	var trElement = document.createElement('tr');calendarTable.appendChild(trElement);
	for(i=1;i<=42;i++){		
		var link = document.createElement('a');
		link.style.cursor = 'pointer';  
		
		if(i-calendarDate.getDay() <= 0){// the last days previous month			
			var prevMonth = calendarDate.getMonth()-1;
			
			if(calendarDate.getMonth()-1 != -1){ 
				link.innerHTML =  daysInMonth[(calendarDate.getMonth()-1)]+i-calendarDate.getDay();
			} else {
				link.innerHTML =  daysInMonth[11]+i-calendarDate.getDay();
			}
			link.style.color =  '#aaaaaa';
			link.addEventListener('click', changeCalendar(calendarDate,-1), true);				
		}else if( (i-calendarDate.getDay()) > daysInMonth[calendarDate.getMonth()]){ // the first days next month
			link.innerHTML =  (i-calendarDate.getDay()) - daysInMonth[calendarDate.getMonth()];
			link.style.color =  '#aaaaaa';
			link.addEventListener('click', changeCalendar(calendarDate,1), true);
		}else {
			link.innerHTML = i-calendarDate.getDay();
			link.addEventListener('click', setGcDate(calendarDate.getMonth()+1, (i-calendarDate.getDay()), calendarDate.getFullYear()), true);
		}
		
	    
		var tdElement = document.createElement('td');trElement.appendChild(tdElement);
		tdElement.align = 'center';
		tdElement.appendChild(link);
		
		//~ GM_log((gcDay +'=='+ (i-calendarDate.getDay()) +'&&'+ (gcMonth-1) +'=='+ calendarDate.getMonth() +'&&'+ gcYear +'=='+ calendarDate.getFullYear()));
		// mark the gc date
		if (gcDay == (i-calendarDate.getDay()) && (gcMonth-1) == calendarDate.getMonth() && gcYear == calendarDate.getFullYear()){
			link.style.border = '1px dotted lightgray';
		}
		
		//mark today
		//~ GM_log((todaydate.getDate() +'=='+ (i-calendarDate.getDay()) +' && '+ todaydate.getMonth() +'=='+ calendarDate.getMonth() +' && '+ todaydate.getFullYear() +'=='+ calendarDate.getFullYear()));
		if (todaydate.getDate() == (i-calendarDate.getDay()) && (todaydate.getMonth()) == calendarDate.getMonth() && todaydate.getFullYear() == calendarDate.getFullYear()){
			link.style.borderBottom = '1px solid #7C1900';
			link.style.backgroundColor = '#EBEBEB';
			link.style.setProperty("-moz-border-radius", "5px", "");
		}

		if(((i)%7==0)&&(i<36)){			
			trElement = document.createElement('tr');calendarTable.appendChild(trElement);
		}
	}
	
	return calendarTable;	
}


function setDefaultTemplate(templateId){
	return function(){
		GM_setValue('defaultTemplates',templateId);
	}
}
function insertTemplate(templateId, atCursor, forceInsert){
	return function(){
		for (i = 0; i < templates.length; i++) {
			if(templates[i][0] == templateId){
										
				var templateTestString =  templates[i][2].replace(/\{FINDS\}/g,"").replace(/\s*/g,'');
				
				// insert only, if texform does not contain the template
				var trimmedTextform = textForm.value.replace(/\s*/g,'');
				if((trimmedTextform.indexOf(templateTestString) < 0) || forceInsert){								
					if (atCursor){
						var start = textForm.selectionStart;
					} else { var start = 0;	}
					
					textForm.value = 
						textForm.value.substr(0, start) + 
						templates[i][2] + 
						textForm.value.substr(start, textForm.value.length);
					
					if (atCursor){
						textForm.selectionStart = start +templates[i][2].length;
						textForm.selectionEnd = start +templates[i][2].length;
					} 		
					
					textForm.focus();
				}
				return;
			}
		}
	}
}

function removeTemplate(templateId, trElement){
	return function(){
		for (i = 0; i < templates.length; i++) {
			if(templates[i][0] == templateId){
				templates.splice(i,1);				
				GM_setValue('templates',uneval(templates));
				if(GM_getValue('defaultTemplates',0) == templateId){
					GM_setValue('defaultTemplates',0);	
				};
				
				if(trElement){
					trElement.parentNode.removeChild(trElement);
				}
				return;
			}
		}
	}
}

function editTemplate(templateId){
	return function(){	
		if(templateMode)
			return;
			
			
		var templateEditMode = false;	
		templateMode = true;		
		
		var templateDiv = document.createElement('div')
		
		var templateTextForm = document.createElement('textarea');
		templateTextForm.rows="10";templateTextForm.cols="60";
		templateTextForm.style.background = 'lightgray';
		
		var templateNameTextForm = document.createElement('input');
		templateNameTextForm.type="text";
		templateNameTextForm.size="30";
		templateNameTextForm.maxLength="8";
		
		
		
		textForm.style.display = 'none';

		var textFormOld = textForm;
		textForm = templateTextForm;
		
		
		
		if(templateId != 0){
			for (i = 0; i < templates.length; i++) {
				if(templates[i][0] == templateId){
					templateTextForm.value += templates[i][2];
					templateNameTextForm.value += templates[i][1];
					templateEditMode = true;
					break;
				}
			}
		}
		
		var saveFunction = function(){
			if(templateNameTextForm.value == ''){
				alert('Please enter template name.');
				return;
			}
			
			templateMode = false;
			templateDiv.parentNode.removeChild(templateDiv);
			
			if(templateId == 0){
				var templateNumber = 1;
				for (i = 0; i < templates.length; i++) {
					if(templates[i][0] >= templateNumber){
						templateNumber = templates[i][0] + 1;						
					}
				}
			} else {
				removeTemplate(templateId)();
				setDefaultTemplate(templateId)();
				templateNumber = templateId;
			}
			
			
			var template = new Array(templateNumber, templateNameTextForm.value, textForm.value);
			if(!templateEditMode){
				addTemplateToTable(template);
			}
			
			templates.push(template);
			GM_setValue('templates',uneval(templates));			
			
			
			textForm = textFormOld;
			textForm.style.display = 'block';
		};
		
		var closeFunction = function(){
			templateMode = false;
			templateDiv.parentNode.removeChild(templateDiv);
			textForm = textFormOld;
			textForm.style.display = 'block';
		};
		
		var saveButton = document.createElement('input');
		var cancelButton = document.createElement('input');
		saveButton.type="submit";
		cancelButton.type="submit";
		
		saveButton.value = 'save';
		cancelButton.value = 'cancel';
		
		saveButton.setAttribute('onclick','return false;');	
		cancelButton.setAttribute('onclick','return false;');	
		
		saveButton.addEventListener('click', saveFunction, false);
		cancelButton.addEventListener('click', closeFunction, false);		
		
		
		templateDiv.appendChild(document.createTextNode('Templatename (max. 8 chars):'));
		templateDiv.appendChild(templateNameTextForm);
		templateDiv.appendChild(document.createElement('br'));
		templateDiv.appendChild(templateTextForm);
		templateDiv.appendChild(document.createElement('br'));
		templateDiv.appendChild(saveButton);
		templateDiv.appendChild(cancelButton);
		textFormOld.parentNode.appendChild(templateDiv);
	}
}

function addTemplateToTable(template){
	var trElement = document.createElement('tr');		
	
	templateTable.insertBefore(trElement,templateTable.lastChild);
	var tdElement = document.createElement('td');
	trElement.appendChild(tdElement);
	
		
	var templateRadio = document.createElement('input');
	templateRadio.type = 'radio';
	templateRadio.name = 'template';
	if (GM_getValue('defaultTemplates',0) == template[0]){
		templateRadio.checked = 'checked';
		insertTemplate(template[0],false,false)();
	}
	
	templateRadio.addEventListener('click', setDefaultTemplate(template[0]), false);
	
	
	tdElement.appendChild(templateRadio);
	tdElement.appendChild(document.createTextNode(template[1]));

	var tdElement = document.createElement('td');
	trElement.appendChild(tdElement);
	
	var button = createSmallButton(insertImageString, insertTemplate(template[0],true,true));
	button.title = 'insert';
	tdElement.appendChild(button); 
	button = createSmallButton(editImageString, editTemplate(template[0]));
	button.title = 'edit';
	tdElement.appendChild(button); 
	button = createSmallButton(deleteImageString, removeTemplate(template[0],trElement));
	button.title = 'delete';
	tdElement.appendChild(button); 	
}

function getTemplateTable(){

	
	templateTable.style.border = '1px solid lightgray';	
	templateTable.style.width = '100%';	
	var templateTableCaption = document.createElement('caption');
	templateTableCaption.innerHTML = 'Templates';
	templateTable.appendChild(templateTableCaption);
	
	var trElement = document.createElement('tr');	
	templateTable.appendChild(trElement);		
	var tdElement = document.createElement('td');
	tdElement.colSpan = '2';
	trElement.appendChild(tdElement);
	
		
	var templateRadio = document.createElement('input');
	templateRadio.type = 'radio';
	templateRadio.name = 'template';
	templateRadio.checked = 'checked';
	
	templateRadio.addEventListener('click', setDefaultTemplate(0), false);
	
	tdElement.appendChild(templateRadio);
	tdElement.appendChild(document.createTextNode('none'));
	
	
	var trElement = document.createElement('tr');	
	templateTable.appendChild(trElement);		
	var tdElement = document.createElement('td');
	trElement.appendChild(tdElement);
	tdElement.colSpan = '2';
	tdElement.vAlign = 'top';
	var newTemplateButton = document.createElement('a');
	newTemplateButton.addEventListener('click', editTemplate(0),false);
	newTemplateButton.style.cursor = 'pointer';
	newTemplateButton.innerHTML = 'new template';
	tdElement.appendChild(newTemplateButton);
	
	for (i = 0; i < templates.length; i++) {
		addTemplateToTable(templates[i]);
	}
	
	return templateTable;
}

function getSmilieTable(){
	var smilieArray = new Array(
		new Array('http://www.geocaching.com/images/icons/icon_smile.gif', '[:)]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_big.gif', '[:D]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_cool.gif', '[8D]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_blush.gif', '[:I]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_tongue.gif', '[:P]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_evil.gif', '[}:)]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_wink.gif', '[;)]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_clown.gif', '[:o)]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_blackeye.gif', '[B)]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_8ball.gif', '[8]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_sad.gif', '[:(]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_shy.gif', '[8)]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_shock.gif', '[:O]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_angry.gif', '[:(!]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_dead.gif', '[xx(]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_sleepy.gif', '[|)]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_kisses.gif', '[:X]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_approve.gif', '[^]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_dissapprove.gif', '[V]'),
		new Array('http://www.geocaching.com/images/icons/icon_smile_question.gif', '[?]'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/mad.gif', ':angry:'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/big_smile.gif', ':grin:'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/sad.gif', ':sad:'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/shock.gif', ':shocked:'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/smile.gif', ':smile:'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/surprise.gif', ':surprise:'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/tired.gif', ':tired:'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/ohh.gif', ':yikes:'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/tongue.gif', ':tongue:'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/bad_boy_a.gif', ':bad:'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/back.gif', ':back:'),
		new Array('http://img.groundspeak.com/forums/emoticons/signal/cute.gif', ':cute:')
	);
	


	
	var smilieTable = document.createElement('table');
	var trElement = document.createElement('tr');
	smilieTable.style.border = '1px solid lightgray';
	smilieTable.style.borderCollapse = 'separate';
	smilieTable.style.borderSpacing = '3px';
	smilieTable.style.width = "100%";


		 var smilieNameRegex = /(http:\/\/www\.geocaching\.com\/images\/icons\/icon_smile_|http:\/\/img\.groundspeak\.com\/forums\/emoticons\/signal\/)(.*)\.gif/;
	
		 //~ alert(RegExp.$2);
		 
		 //~ smilieNameRegex.exec('http://img.groundspeak.com/forums/emoticons/signal/cute.gif');
		 //~ alert(RegExp.$2);


	for (i = 0; i < smilieArray.length; i++) {
		if(i % 4 == 0){
			trElement = document.createElement('tr');
			smilieTable.appendChild(trElement);
		}
		
		var tdElement = document.createElement('td');
		tdElement.align = "center";
		var smilie = document.createElement('img');
		
		smilieNameRegex.exec(smilieArray[i][0]);
		smilie.title = RegExp.$2;
		smilie.src = smilieArray[i][0];
		smilie.addEventListener('click',addSmilieFunction(smilieArray[i][1]),false);
		smilie.hspace = '2';
		smilie.style.cursor = 'pointer'; 
		
		tdElement.appendChild(smilie);
		trElement.appendChild(tdElement);
	}
	return smilieTable;
}
	

function addHoverEffects(element){
	element.addEventListener('mouseover', addHoverEffect(element),false);
    element.addEventListener('mouseout',  removeHoverEffect(element),false);
    element.addEventListener('mousedown', addClickEffect(element),false);
    element.addEventListener('mouseup',  removeClickEffect(element),false);
    element.style.margin = '1px';
}

function addClickEffect(element){return function(){	element.style.background = '#a9b2bf';}}
function removeClickEffect(element){return function(){element.style.background = '#cdd8e8';}}
function addHoverEffect(element){return function(){element.style.background = '#cdd8e8';}}
function removeHoverEffect(element){return function(){element.style.background = '';}}

function update(){
	//Update not supported in chrome
	if (ENVIRONMENT == 'chrome' || ENVIRONMENT == 'safari') {
		return;
	}

	var updateDate = eval(GM_getValue('updateDate'));
	if(!updateDate){
		updateDate = new Date();
		GM_setValue('updateDate',uneval(updateDate));
	 }
	var currentDate = new Date();
	
	// if the last updateDate is more than 86 400 000 msec (1 day) ago - check for updates
	if(currentDate.getTime() - updateDate.getTime() > 86400000){
		// set the new updateDate
		GM_setValue('updateDate',uneval(currentDate));
		// make the version request
		var details = new Object();
		details.method = 'GET';
		details.url = 'http://gc.madd.in/gm/updates.xml';
		details.onload = function(response) {parseUpdateXMLResponse(response.responseText)};
		details.onerror = function(response) { alert('An error occour - please send an EMail to geocaching@madd.in!');};
		GM_xmlhttpRequest(details);
	}

}

function parseUpdateXMLResponse(xmlString){
	var updateNode;
	
	var xmlDoc = (new DOMParser()).parseFromString(xmlString, "application/xml");
	
	var string = '';
	
	
	var scriptElements = xmlDoc.getElementsByTagName('script');
	
	for(var i = 0;i< scriptElements.length;i++){
		if ( scriptElements[i].getAttribute ('id') == scriptId){
			var versions = scriptElements[i].getElementsByTagName('version');
			var currentVersion = 0; 
			var currentVersionIndex; 
			for(var j = 0;j< versions.length;j++){
				if(versions[j].getAttribute('number') > currentVersion){
					currentVersion = versions[j].getAttribute('number');
					currentVersionIndex = j;
				}
			}
			
			if (currentVersion > version){
				updateNode = versions[currentVersionIndex];
			}			
		}		
	}
	
	
	
	
	if(updateNode){
		var confirmString = 'There is a new version of GCBBCode.\n\t'+version+' -> '+updateNode.getAttribute('number')+'\nChanges:\n';
		
		var changes = updateNode.getElementsByTagName('change');
		for(var j = 0;j< changes.length;j++){
				confirmString += '\t+ '+changes[j].textContent+'\n';
		}
		confirmString += '\nDo you want to update?';
		if (confirm(confirmString)) {
			GM_openInTab('http://gc.madd.in/gm/update.php?scriptId='+scriptId+'&fromVersion='+version+'&toVersion='+updateNode.getAttribute('number'));
		}
	}
}
function changeCalendar(date, delta){
	return function(){
		var calendarDate = new Date(date.getFullYear(),date.getMonth()+delta,1);
		
		var calendarTable = document.getElementById('calendarTable');
		var parent = calendarTable.parentNode;
		parent.insertBefore( getCalendarTable(calendarDate),calendarTable);
		parent.removeChild(calendarTable);
	}
}

function init(){

	
	//var nextNode = textForm.nextSibling;
	//if(!nextNode)
	
	var nextNode = textForm.parentNode;		
	var commentsDT = textForm.parentNode.previousSibling.previousSibling;
	var completeDL = commentsDT.parentNode;
		var dts = completeDL.getElementsByTagName('dt');
		var dds = completeDL.getElementsByTagName('dd');

	completeDL.removeChild(commentsDT);
	if(document.URL.search("\/track\/log\.aspx")>=0) {
        completeDL.removeChild(dds[4]);
	} else {
       /* completeDL.removeChild(dts[3]);
        completeDL.removeChild(dds[3]);
        completeDL.removeChild(dds[3]);*/
	}
	
	var logTable = document.createElement('table');
	logTable.style.border = '1px solid lightgray';
	logTable.style.width = '100%';
	logTable.style.borderSpacing = '10px';
	logTable.style.borderCollapse = 'separate';
	var trElement = document.createElement('tr');
	var tdElement = document.createElement('td');
	
	tdElement.colSpan = '2';
	
	tdElement.appendChild(getDonateButton());
	tdElement.appendChild(getButtonsTable());
	tdElement.style.borderBottom = '1px solid lightgray';
	trElement.appendChild(tdElement);
	
	
	
	logTable.appendChild(trElement);
	
	
	trElement = document.createElement('tr');
	tdElement = document.createElement('td');
	tdElement.vAlign = "top"
	tdElement.appendChild(textForm);
	trElement.appendChild(tdElement);
	
	
	tdElement = document.createElement('td');
	tdElement.appendChild(getSmilieTable());
	tdElement.appendChild(getTemplateTable());
	var logButton = document.getElementById('ctl00_ContentBody_LogBookPanel1_LogButton');
		logButton.style.marginTop = "40px";
		logButton.style.fontWeight = "bold";	
	tdElement.appendChild(logButton);	
	tdElement.vAlign = "top"
	tdElement.align = "center"
	trElement.appendChild(tdElement);
	logTable.appendChild(trElement);
	
	
	trElement = document.createElement('tr');
	tdElement = document.createElement('td');trElement.appendChild(tdElement);
	tdElement.colSpan = '2';
	
	if(document.getElementById('tblTravelBugs'))
		tdElement.appendChild(document.getElementById('tblTravelBugs'));
	
	logTable.appendChild(trElement);
	
	
	
	
	textForm.rows = "20";
	// dont display the list on the sendtogpx page
	if(document.URL.search("report\.aspx")>0) {
		textForm.rows = "20";
		nextNode.appendChild(logTable);
	} else {
		
		//add the logtable AFTER the DL block
		 completeDL.parentNode.insertBefore( logTable, completeDL.nextSibling );
		
		

		

		
		/*
		var logTypeArray = new Array();
		logTypeArray["2"] = "Found it";
		logTypeArray["3"] = "Didn't find it";
		logTypeArray["4"] = "Write note";
		logTypeArray["7"] = "Needs Archived";
		logTypeArray["45"] = "Needs Maintenance";
		logTypeArray["-1"] = "- Select One -";
		
		var logType = document.getElementById('ctl00_ContentBody_LogBookPanel1_ddLogType');
		logType.removeAttribute('onChange');
		logType.addEventListener('change',function(){document.getElementById('setDefaultButton').innerHTML = "set <b>"+logTypeArray[getSelectedValue(logType)]+"</b> as default";},false);
		*/
		var calenderElement = getCalendarTable();
		if(calenderElement){
		
		
			var calenderDiv = document.createElement('div');
			//~ calenderDiv.style.cssFloat = 'right';
			//~ calenderDiv.style.position = 'relative';
			//~ calenderDiv.style.right = '10px';
			
		
			calenderDiv.style.position = 'absolute';
			calenderDiv.style.right = '50px';
			calenderDiv.style.top = '90px';
			
			calenderDiv.appendChild(calenderElement)
	
	
			//~ var logPanel = document.getElementById('ctl00_ContentBody_LogBookPanel1_EditLogPanel');
			
			//~ logPanel.insertBefore(calenderDiv,logPanel.childNodes[5]);
			//~ logPanel.appendChild(calenderDiv);
	
			var logPanel = document.getElementById('ctl00_ContentBody_LogBookPanel1_ddLogType');
			
			//~ logPanel.insertBefore(calenderDiv,logPanel.childNodes[5]);
			logPanel.parentNode.appendChild(calenderDiv);
			//~ logType.parentNode.removeAttribute('width');
			//~ logType.parentNode.parentNode.appendChild(tdElement);
			//~ logType.parentNode.parentNode.parentNode.border = '1';
		}
		
		

		//~ alert(logTypeArray[getSelectedValue(logType)]);
		//~ <option selected="selected" value="-1">- Select One -</option>
		//~ <option value="2">Found it</option>

		//~ <option value="3">Didn't find it</option>
		//~ <option value="4">Write note</option>
		//~ <option value="7"></option>
		//~ <option value="45">Needs Maintenance</option>
		//~ <option value="-1">- Select One -</option>
/*
		var currentType = getSelectedValue(logType);
		var defaultType = GM_getValue("defaultLogType" , "-1");
		
		if(document.URL.indexOf("PLogGuid") < 0 && document.URL.indexOf("LUID") < 0 && currentType == "-1"){
			if(currentType != defaultType){
				
				// set default selection
				for(var i = 0;logType.childNodes.length;i++){
					if(logType.childNodes[i].value){
						if(defaultType == logType.childNodes[i].value){
							logType.childNodes[i].setAttribute('selected','selected');
							break;
						}
					}
				}
				
				// remove current selection
				for(var i = 0;logType.childNodes.length;i++){
					if(logType.childNodes[i].value){
						if(currentType == logType.childNodes[i].value){
							logType.childNodes[i].removeAttribute('selected');
							break;
						}
					}
				}
				
				currentType = defaultType;
			}
		}

		
	
		
		
		var setDefaultButton = document.createElement('a');
		setDefaultButton.id = "setDefaultButton";
		setDefaultButton.innerHTML = "set <b>"+logTypeArray[currentType]+"</b> as default";
		setDefaultButton.style.marginLeft = "3px";
		setDefaultButton.style.cursor = "pointer";
		setDefaultButton.addEventListener('click',
			function(){
				var currentType = getSelectedValue(logType)
				GM_setValue("defaultLogType" , currentType);
				alert(logTypeArray[currentType] +"\nwas successfully set on default type of log!");
			}
		,false);
		
		
		
		//~ setDefaultButton
		//~ alert(getSelectedValue(logType));
		
		logType.parentNode.insertBefore(setDefaultButton, logType.nextSibling );
		logType.parentNode.insertBefore(document.createElement("br"), setDefaultButton);
*/
	}
//	textForm.selectionStart = 0;
//	textForm.selectionEnd = 0;	

	textForm.focus();

}


// COLOR PICKER

var colorPickerDiv = document.createElement('div');
colorPickerDiv.style.position = 'absolute';
colorPickerDiv.style.display = 'none';
colorPickerDiv.style.border = '#000000 1px solid';
colorPickerDiv.style.MozBorderRadius = '2%';
colorPickerDiv.style.background = '#FFFFFF';
colorPickerDiv.appendChild( getColorTable() );
document.body.appendChild(colorPickerDiv);


function showColorPicker(underElement){
	if( colorPickerDiv.style.display == 'block'){
		colorPickerDiv.style.display = 'none';    
	}else if(underElement){
		colorPickerDiv.style.display = 'block';     
     	colorPickerDiv.style.top = (getAbsoluteOffsetTop(underElement) + 20)+'px';
     	colorPickerDiv.style.left = getAbsoluteOffsetLeft(underElement)+'px';     
	}
}

function colorClicked(color){
	return function(){
		showColorPicker();
		addCodeFunction(color)();
	}
}

 function getColorTable() {
 	var tableElement = document.createElement('table');
 	tableElement.style.margin = '1px';
 	var tableRow =  document.createElement('tr');
 	tableElement.appendChild(tableRow);
 	var colors = Array('black', 'blue', 'red', 'purple', 'pink', 'orange', 'yellow', 'green', 'white');
 	for (i = 0; i < colors.length; i++) {
		var tableCell = document.createElement('td');
		tableCell.height = '10px';
		tableCell.width = '10px';
		tableCell.style.border = '1px solid #000000';
		tableCell.style.background =  colors[i];
		tableCell.style.cursor = 'pointer'; 
		tableCell.addEventListener('click', colorClicked(colors[i]), true);	
 		tableRow.appendChild(tableCell);
 	} 
	return tableElement;
    }
    
    
 function getAbsoluteOffsetTop(theObj) {
 	
	var top = theObj.offsetTop;
	var parent = theObj.offsetParent;
	while (parent != document.body) {
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
 }
 
 function getAbsoluteOffsetLeft(theObj) {
	var left = theObj.offsetLeft;
	var parent = theObj.offsetParent;
	while (parent != document.body) {
		left += parent.offsetLeft;
		parent = parent.offsetParent;
	}
	return left;
 }
 
 // rot13.js from gc.com
var rot13array;
function createROT13array() {
	var A = 0, C = [], D = "abcdefghijklmnopqrstuvwxyz", B = D.length;
	for (A = 0; A < B; A++) {
		C[D.charAt(A)] = D.charAt((A + 13) % 26)
	}
	for (A = 0; A < B; A++) {
		C[D.charAt(A).toUpperCase()] = D.charAt((A + 13) % 26).toUpperCase()
	}
	return C
}
function convertROT13String(C) {
	var A = 0, B = C.length, D = "";
	if (!rot13array) {
		rot13array = createROT13array()
	}
	for (A = 0; A < B; A++) {
		D += convertROT13Char(C.charAt(A))
	}
	return D
}
function convertROT13Char(A) {
	return (A >= "A" && A <= "Z" || A >= "a" && A <= "z" ? rot13array[A] : A)
}


function convertROTStringWithBrackets(C) {
	var F = "", D = "", E = true, A = 0, B = C.length;
	if (!rot13array) {
		rot13array = createROT13array()
	}
	for (A = 0; A < B; A++) {
		F = C.charAt(A);
		if (A < (B - 4)) {
			if (C.toLowerCase().substr(A, 4) == "<br/>") {
				D += "<br>";
				A += 3;
				continue
			}
		}
		if (F == "[" || F == "<") {
			E = false
		} else {
			if (F == "]" || F == ">") {
				E = true
			} else {
				if ((F == " ") || (F == "&dhbg;")) {
				} else {
					if (E) {
						F = convertROT13Char(F)
					}
				}
			}
		}
		D += F
	}
	return D
};

// start the whole thing

update();
init();
