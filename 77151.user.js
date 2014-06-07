// ==UserScript==
// @name           swbsurvey
// @namespace      swblife.com
// @include        https://swblife.com/profile/survey/id/*
// @exclude        https://swblife.com/*
// ==/UserScript==
var $;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
        GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    window.addEventListener(
        'load',
        function() {
            GM_log('The beginning');
            var survey = document.getElementsByName("survey[answer]");
            var captcha ="";
            if (document.getElementById('survey_captcha'))
                captcha = document.getElementById('survey_captcha');
            var form = document.getElementsByName("survey");
            captcha.value = '';
            if (survey.length){
                GM_log('Survey found');
                var max = survey.length;
                var num = Math.floor((Math.random() * max));
                survey[num].checked = true;
                if (captcha) {
                    GM_log('Captcha found =)');
                    captcha.addEventListener('keyup',function (e) {
                        if (captcha.value.length == 3){
                            this.form.submit();
                        }
                    },true);

                }
                if(!captcha){
                    GM_log("Captcha NOT found and I don't know what to do next O_o");
                }
            }
        },
        true);
}