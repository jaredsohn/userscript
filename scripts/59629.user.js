// ==UserScript==
// @name           userscripts.org add install td
// @namespace      org.positrium.gm
// @description    append install buttons on "http://userscripts.org/users/*/scripts"
// @include        http://userscripts.org/users/*/scripts
// @version        0.1.0
// ==/UserScript==
(function() {
		// logger define begin
		function Logger(){
			this.LV_DEBUG = 4;
			this.LV_INFO = 3;
			this.LV_WARN = 2;
			this.LV_ERROR = 1;
			this.LV_FATAL = 0;
			this.initialize.apply(this, arguments);
		}
		Logger.prototype = {
			initialize: function(level){
				if('debug'==level)this.level = this.LV_DEBUG;
				if('info'==level)this.level = this.LV_INFO;
				if('warn'==level)this.level = this.LV_WARN;
				if('error'==level)this.level = this.LV_ERROR;
				if('fatal'==level)this.level = this.LV_FATAL;
			},
			debug: function(str){
				if(this.level>=this.LV_DEBUG){
					GM_log('[debug]'+str);
				}
			},
			info: function(str){
				if(this.level>=this.LV_INFO){
					GM_log('[info   ]'+str);
				}	
			},
			warn: function(str){
				if(this.level>=this.LV_WARN){
					GM_log('[warn   ]'+str);
				}
			},
			error: function(str){
				if(this.level>=this.LV_ERROR){
					GM_log('[error ]'+str);
				}
			},
			fatal: function(str){
				if(this.level>=this.LV_FATAL){
					GM_log('[fatal]'+str);
				}
			}
		};
		var log = new Logger('info');
		// logger define end
		
	var container = x('/html/body/div/div[2]/div/div/table/tbody/tr');
	log.debug(container.snapshotLength);
	
	for(var i=0;i<container.snapshotLength;i++){
		var item_tr = container.snapshotItem(i);
		var item_td = cE('th',{class:'la', width:'1%'});
		
		if(i>0){
			var script_id = item_tr.id.replace("scripts-",'').trim();
			item_td = cE('td',{class:'inv lp'});
			//http://userscripts.org/scripts/source/45847.user.js
			log.debug(script_id);
			var script_path = 'http://userscripts.org/scripts/source/'+script_id+'.user.js';
			var btn_install = cE('button',{onclick:'javascript:location.href=\''+script_path+'\';'});
			var btn_caption = cT('install');
			btn_install.appendChild(btn_caption);
			item_td.appendChild(btn_install);
		}
		
		item_tr.appendChild(item_td);
	}

	// string append
	String.prototype.trim =
	function()
	{
		return this.replace(/^\s+|\s+$$/g, '');
	}
	// ========== add from snippet ================
	function cE(name, array) {
		var d = document.createElement(name);
		for (var i in array) {
			d.setAttribute(i, array[i]);
		}
		return d;
	}
	// ========== add from snippet ================
	function cT(value){
		var d = document.createTextNode(value);
		return d;
	}	
	
	// ========== add from snippet ================
	function x(path) {
		return document.evaluate(path, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
})();