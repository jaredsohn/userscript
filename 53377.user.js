// ==UserScript==
// @name          Acelerador de Firefox
// @description   Acelera Firefox hasta 200%
// @Credits       Antonio Tovar
// @include       *
// @version       0.1
// ==/UserScript==

user_pref("network.http.pipelining", true);
user_pref("network.http.proxy.pipelining", true);
user_pref("network.http.pipelining.maxrequests", 30);
user_pref("nglayout.initialpaint.delay", 0);
user_pref("network.http.max-connections", 64);
user_pref("network.http.max-connections-per-server", 32);
user_pref("network.http.max-persistent-connections-per-proxy", 16);
user_pref("network.http.max-persistent-connections-per-server", 8);
user_pref("browser.cache.memory.capacity", 32768); 
user_pref("network.dns.disableIPv6", true); 
user_pref("browser.download.manager.resumeOnWakeDelay", 0);  
user_pref("browser.sessionhistory.max_total_viewers", 0); 
user_pref("browser.tabs.showSingleWindowModePrefs", true); 
user_pref("browser.xul.error_pages.enabled", true);
