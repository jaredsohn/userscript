// ==UserScript==
// @name           org.positrium.gm.logger
// @namespace      org.positrium.gm
// @description    logger with firebug.
// @version	0.0.2
// ==/UserScript==

	/* ======== Logger */
	/** @version 0.0.2 */
	function Logger(isDebug){
		this.header = '';
		this.isDebug = isDebug?isDebug:false;
		
		this.setHeader = function(title){
			this.header = "["+title+"] ";
		}
		
		this.debug = function(text){
			if(this.isDebug) console.log(this.header+text);
		}
		this.warn = function(text) {
			if (this.isDebug)console.warn(this.header+text);
		}
		this.error = function(text) {
			if (this.isDebug)console.error(this.header+text);
		}
		this.fatal = function(text) {
			if (this.isDebug)console.fatal(this.header+text);
		}
		this.ast = function(expr, msg) {
			console.group(this.header+'assert ' + parseInt(Math.random() * 10000));
			console.log(msg);
			console.assert(expr);
			console.groupEnd();
		}
		this.info = function(text) {
			if (this.isDebug) console.info(this.header+text);
		}
		this.group = function(text) {
			if (this.isDebug)console.group(this.header+text);
		}
		this.groupEnd = function(text) {console.groupEnd();}
		this.dir = function(text){
			if(this.isDebug) {
				console.log(this.header);
				console.dir(text);
			}
		}
		this.dirxml = function(text){
			if(this.isDebug) {
				console.log(this.header);
				console.dirxml(text);
				}
		}
		this.bar = function(text){
			if(this.isDebug){
				console.log("======== "+text+" =============");
			}
		}
		this.dummy = function() {}
	}	