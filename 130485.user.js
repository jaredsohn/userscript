// ==UserScript==
// @name           boxpay
// @namespace      weibo
// @include        http://qmfu.iboxpay.com:8000/iboxpay/registerByWeb.htm
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
var testParam = 2;
// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    }
    else {
        jQuery = unsafeWindow.jQuery;
        unsafeWindow.jQuery.noConflict();
        letsJQuery();
//        alert(unsafeWindow.jQuery);
    }
}
GM_wait();


// *** put your code inside letsJQuery: ***
function letsJQuery() {
      //6. LXJT1769；7. KXPO2707；8. DXZL8600；9. BPSV2108；10. EZCD0499
    //1. NGTB7168; 2. YCLW9116; 3. CHPM9603; 4. ONRF6870; 5. EMEJ5830
    //11. UMHC4683; 12. YNIQ0794; 13. JBWV3849; 14. ERSM8305; 15. NXZR9039
    var requestCode;
    jQuery('#requestCode').after('input stringlist: <input type="text" id="codestr"/>');
    jQuery('#submit').after('<input type="button" id="submit2" value="SUBMIT!!"/>');
    jQuery('#submit2').click(function(){
        register_step1();
    });
}

function register_step1() {
    var checkCodeUrl = unsafeWindow.basePath + '/checkVerifyCode.htm';
    var codestr = jQuery('#codestr').val();
    codestr = codestr.replace(/\s/g, "");
    codestr = codestr.replace(/；/g, ";");
    var codestrArray = codestr.split(';');
    var codeArray = [];
    for (var codestr2 in codestrArray) {
        codeArray[codeArray.length] = codestrArray[codestr2].split('. ')[1];
    }
    var index = 0;
    requestCode = codeArray[index++];
    jQuery.post(checkCodeUrl, { code:requestCode }, function (checkCodedata) {
        if (checkCodedata != "false") {
            register_step2();
        } else {
            requestCode = codeArray[index++];
            jQuery.post(checkCodeUrl, { code:requestCode }, function (checkCodedata) {
                if (checkCodedata != "false") {
                    register_step2();
                } else {
                    requestCode = codeArray[index++];
                    jQuery.post(checkCodeUrl, { code:requestCode }, function (checkCodedata) {
                        if (checkCodedata != "false") {
                            register_step2();
                        } else {
                            requestCode = codeArray[index++];
                            jQuery.post(checkCodeUrl, { code:requestCode }, function (checkCodedata) {
                                if (checkCodedata != "false") {
                                    register_step2();
                                } else {
                                    requestCode = codeArray[index++];
                                    jQuery.post(checkCodeUrl, { code:requestCode }, function (checkCodedata) {
                                        if (checkCodedata != "false") {
                                            register_step2();
                                        } else {
                                            alert('all failed');
                                        }
                                    }, "text");
                                }
                            }, "text");
                        }
                    }, "text");
                }
            }, "text");
        }
    }, "text");
}

function register_step2() {
    document.getElementById("requestCode").value = requestCode;
    //alert(requestCode);
    register();
}