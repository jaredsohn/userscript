// ==UserScript==
// @name           org.positrium.gm.commonLib
// @namespace      org.positrium.gm
// @description    common lib
// @version	0.0.1
// ==/UserScript==
	/* ======= common Lib */
	/**
	 * get nodes array from xpath.
	 * 
	 * @argument _xpath String
	 * @return nodesArray Array
	 * @version 0.0.2
	 */
	function x(_xpath, msg) {
		var nodes = document.evaluate(_xpath, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodesArray = [];
		for (var i = 0; i < nodes.snapshotLength; i++) {
			nodesArray.push(nodes.snapshotItem(i));
		}
		if (nodesArray.length < 1) {
			log.warn(msg + ": node array is NULL."+nodesArray.length);
			return null;
		}else{
			return nodesArray;
		}
	}
	
	
	/* ======= url param separator */
	/** @version 0.0.1 */
	function getParam(location){
		var url = location;
		var tmp = (url.split('?')[1]).split('&');
		var params = [];
		for(var i in tmp){
			params[tmp[i].split('=')[0]] = tmp[i].split('=')[1];
		}
		return params;	
	}
	
	// ========== add from snippet ================
	/** @version 0.0.1 */
	function cT(value) {
		var d = document.createTextNode(value);
		return d;
	}
	// ========== add from snippet ================
	/** @version 0.0.1 */
	function cE(name, array) {
		var d = document.createElement(name);
		var len = 0;
		for(var i in array){
			len++;
		}
		if(len>0){
			for (var i in array) {
				d.setAttribute(i, array[i]);
			}
		}
		return d;
	}

		function TypeList(_array){
			var log = new Logger(true);
			this.array = _array;
			this.contains = function(_string){
				var ret = false;
				for(var i in this.array){
					log.bar(_string)
					log.info(i);
					if(_string==i){
						ret = true;
						break;
					}
				}
				return ret;
			}
		}