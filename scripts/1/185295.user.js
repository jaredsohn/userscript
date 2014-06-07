// ==UserScript==
// @name        sc2tv.ru userscript
// @description Stream tabs preferences.
// @namespace   http://sc2tv.ru/users/Heart
// @author      Heart
// @include     http://sc2tv.ru/*
// @version     0.0.4
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @updateURL   http://userscripts.org/scripts/source/185295.meta.js
// @downloadURL http://userscripts.org/scripts/source/185295.user.js
// ==/UserScript==

(function() {
    GM_addStyle(".preferred { width: 114px !important; } .preferred a:before { content: '\\2605' !important; width: 114px !important; }");

    var tabPreferences = (function() {
        var tabPreferences = {};
        var commit = function() {
            var result = [];
            for (var key in tabPreferences)
                if (tabPreferences.hasOwnProperty(key))
                    result.push(key + '^' + tabPreferences[key]);
            var str = result.join('|');
            GM_setValue('tab_preferences', str);
        };
        (function fetch() {
            var str = GM_getValue('tab_preferences') || '';
            str.split('|').forEach(function(preference) {
                var preferenceParts = preference.split('^');
                if (preferenceParts.length === 2)
                    tabPreferences[preferenceParts[0]] = preferenceParts[1];
            });
        })();
        return {
            preferredTab: function() {
                return tabPreferences[document.URL];
            },
            savePreference: function(tab) {
                tabPreferences[document.URL] = tab;
                commit();
            },
            clearPreference: function() {
                delete tabPreferences[document.URL];
                commit();
            }
        };
    })();

    var updateStreamTabs = (function() {
        var grabStreamTabText = function(tab) {
            return /([^(]+)(?:\(\d+\))?/.exec(tab.firstChild.textContent)[1].trim();
        };
        var initialized = false;
        return function updateStreamTabs() {
            var tabs = document.querySelector('#quicktabs-2 ul');
            if (!tabs)
                return;
            var activeTab;
            var preferredTab;
            [].forEach.call(tabs.childNodes, function(tab) {
                if (tab.classList.contains('active'))
                    activeTab = tab;
                if (tab.classList.contains('preferred'))
                    tab.classList.remove('preferred'); // outdated
                if (grabStreamTabText(tab) === tabPreferences.preferredTab())
                    preferredTab = tab;

                if (!initialized)
                    tab.addEventListener('click', function(e) {
                        if (e.shiftKey) {
                            if (tab.classList.contains('preferred'))
                                tabPreferences.clearPreference();
                            else
                                tabPreferences.savePreference(grabStreamTabText(tab));
                            updateStreamTabs();
                        }
                    }, true);
            });
            if (preferredTab) {
                preferredTab.classList.add('preferred');
                if (activeTab)
                    if (activeTab != preferredTab) {
                        if (window.navigator.userAgent.lastIndexOf('Firefox') !== -1) { // works smoother in firefox
                            activeTab.classList.remove('active');
                            preferredTab.classList.add('active');
                        } else {
                            preferredTab.firstChild.click();
                        }
                    }
            }
            initialized = true;
        };
    })();

    updateStreamTabs();
})();
