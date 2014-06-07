// ==UserScript==
// @name          Geschwindigkeit Optimieren im Firefox 3.5
// @include       *
// @version       1.0
// ==/UserScript==

user_pref("network.http.pipelining", true);
user_pref("network.http.proxy.pipelining", true);
user_pref("network.http.pipelining.maxrequests", 500);
user_pref("content.notify.backoffcount", 0);
user_pref("plugin.expose_full_path", true);
user_pref("ui.submenuDelay", 0); 
user_pref("content.interrupt.parsing", false);
user_pref("content.max.tokenizing.time", 250000);
user_pref("content.notify.interval", 500000);
user_pref("content.notify.ontimer", true);
user_pref("content.switch.threshold", 250000);
user_pref("nglayout.initialpaint.delay", 0);
user_pref("network.http.max-connections", 500);
user_pref("network.http.max-connections-per-server", 48);
user_pref("network.http.max-persistent-connections-per-proxy", 48);
user_pref("network.http.max-persistent-connections-per-server", 48);
user_pref("browser.cache.memory.capacity", 32768); 
user_pref("network.dns.disableIPv6", true); 
user_pref("browser.download.manager.resumeOnWakeDelay", 0);  
user_pref("accessibility.typeaheadfind.flashBar", 0); 
user_pref("browser.blink_allowed", false); 
user_pref("browser.cache.disk.capacity", 625000); 
user_pref("layout.spellcheckDefault", 2); 
user_pref("browser.urlbar.maxRichResults", 0); 
user_pref("browser.urlbar.matchOnlyTyped", false); 
user_pref("browser.chrome.favicons", false);
user_pref("browser.chrome.site_icons", false);
user_pref("browser.display.show_image_placeholders", true);
user_pref("accessibility.accesskeycausesactivation", false);
user_pref("accessibility.typeaheadfind.enablesound", false);
user_pref("accessibility.typeaheadfind.autostart", false);
user_pref("accessibility.typeaheadfind", false);
user_pref("browser.cache.disk_cache_ssl", false);
user_pref("browser.microsummary.enabled", false);
user_pref("browser.microsummary.updateGenerators", false);
user_pref("config.trim_on_minimize", true);
user_pref("network.http.keep-alive", true);
user_pref("network.http.keep-alive.timeout", 600);
user_pref("network.http.request.max-start-delay", 10);
user_pref("network.dnsCacheExpiration", 3600);
user_pref("network.dnsCacheEntries", 1000);
user_pref("browser.sessionhistory.max_total_viewers", 3);
user_pref("content.maxtextrun", 8191);
user_pref("browser.history_expire_days_min", 1);
user_pref("browser.tabs.showSingleWindowModePrefs", true );