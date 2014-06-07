// ==UserScript==
// @name           Smart Google Search Radio Buttons
// @namespace      http://userscripts.org/scripts/show/29961
// @include        http://www.google.*
// @include        http://video.google.*
// @include        http://blogsearch.google.*
// @include        http://scholar.google.*
// ==/UserScript==
// @version        1.0.1

(function() {
    var toggleModeWithComboKeys = false;
    var comboKeys = {
        metaKey: true
       ,altKey: false
       ,shiftKey: false
       ,ctrlKey: false
    };
    var formAction = ['search', 'custom', 'videosearch', 'blogsearch', 'scholar', 'mac', 'bsd', 'linux', 'microsoft'];
    var doc = window.document;

    var activate = function(eventParams) {
        if (toggleModeWithComboKeys != checkComboKeys(eventParams)) return;
        if (this.checked && this.form.q.value) {
            switch(true) {
            case Boolean(this.form['btnmeta=search=mac']) :
                this.form['btnmeta=search=mac'].click();
                break;
            default :
                this.form.submit();
            }
        }
    }
    var checkComboKeys = function(params) {
        for (var k in comboKeys) {
            if (params[k] != comboKeys[k]) return false;
        }
        return true;
    }

    window.addEventListener('load',
    function() {
        var inputTags = doc.getElementsByTagName('input');
        var formActionRegExp = new RegExp('^' + doc.location.protocol + '//' + doc.location.host + '/(' + formAction.join('|') + ')');
        for (var i = 0; i < inputTags.length; i++) {
            if (inputTags[i].type == 'radio' && inputTags[i].form.action.match(formActionRegExp))
                inputTags[i].addEventListener('click', activate, false);
        }
    },
    false);
})();