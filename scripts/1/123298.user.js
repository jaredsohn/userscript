// ==UserScript==
// @name           BYU CAS NoSnoop
// @namespace      joeyhewitt
// @description    Tweaks BYU CAS to help prevent websites obtaining your CAS identity without your knowledge (auto-enable "Warn me before signing me into other sites.")
// @match          https://cas.byu.edu/cas/login
// @match          https://cas.byu.edu/cas/login?*
// @match          https://cas-stg.byu.edu/cas/login
// @match          https://cas-stg.byu.edu/cas/login?*
// @version        1.0
// ==/UserScript==

(function(onload) {
    var script = document.createElement('script');
    script.textContent = '('+onload+')(jQuery)';
    document.body.appendChild(script);
})(function($) {

    if ($('#warn').length) {
        $('#warn').attr('checked', 'checked');
    } else {
        var $continueLink = $('.info>p>a:first');
        if ($continueLink.text() == 'here') {
            // rewrite HTML to linkify the word go, making g the accesskey
            $continueLink.parent().html('Click <a href="'+$continueLink.attr('href')+'">here</a> to <a href="'+$continueLink.attr('href')+'" accesskey="g">go</a> to the application.');
        }
    }
    
});
