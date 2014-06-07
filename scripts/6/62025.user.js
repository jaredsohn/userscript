// ==UserScript==
// @name          Accelerador del Firefox
// @description   Valors extrems per accelerar el navegador. Potser no li ven be a tos
// @Credits       Xavier Vidal
// @include       *
// @version       1.0
// ==/UserScript==

user_pref("network.http.pipelining", true);
user_pref("network.http.proxy.pipelining", true);
user_pref("network.http.pipelining.maxrequests", 64);
user_pref("nglayout.initialpaint.delay", 0);
user_pref("network.http.max-connections", 96);
user_pref("network.http.max-connections-per-server", 16);
user_pref("network.http.max-persistent-connections-per-proxy", 16);
user_pref("network.http.max-persistent-connections-per-server", 8);
user_pref("browser.cache.memory.capacity", 32768); 
user_pref("network.dns.disableIPv6", true); 
user_pref("browser.download.manager.resumeOnWakeDelay", 0);  
user_pref("browser.sessionhistory.max_total_viewers", 0); 
user_pref("browser.tabs.showSingleWindowModePrefs", true); 
user_pref("browser.xul.error_pages.enabled", true);
user_pref("content.notify.interval", 500000);
user_pref("content.notify.ontimer", true);
user_pref("layout.word_select.eat_space_to_next_word", false);
user_pref("browser.cache.disk.capacity", 512000);
user_pref("network.prefetch-next", false);
user_pref("browser.cache.check_doc_frequency", 2);
user_pref("browser.cache.memory.capacity", 128000;
user_pref("browser.sessionhistory.cache_subframes", true);
user_pref("browser.sessionhistory.max_total_viewers", 4);
user_pref("browser.cache.disk.capacity integer", false);
user_pref("print.always_cache_old_pres", true);
user_pref("network.dnsCacheEntries", 512);
user_pref("content.notify.backoffcount", 5);
user_pref("plugin.expose_full_path", true);
user_pref("ui.submenuDelay", 0);
user_pref("dom.disable_window_open_feature.menubar", true);
user_pref("dom.disable_window_open_feature.titlebar", true);
user_pref("dom.disable_window_move_resize", true);
user_pref("dom.disable_window_open_feature.toolbar", true);
user_pref("security.dialog_enable_delay", 0);
user_pref("content.interrupt.parsing", true);
user_pref("content.max.tokenizing.time", 2250000);
user_pref("content.notify.interval", 750000);
user_pref("content.notify.ontimer", true);
