// ==UserScript==
// @name           org.positrium.gm.GMConfigHandler
// @namespace      org.positrium.gm
// @description    about:config handler.
// @version	0.0.1
// ==/UserScript==

	/* ======== config data handler */
	/** @version 0.0.1 */
	function GMConfigHandler(){
	
		this.save = function(array){
			GM_setValue(array['id'], this.toJSON(array) );
		}
		
		this.load = function(id){
			return eval("("+GM_getValue(id)+")");
		}
		
		this.isExist = function(id){
			var retbool = true;
			if(GM_getValue(id, false)==false){
				retbool = false;
			}
			return retbool
		}
		
		this.toJSON = function(array){

			var json = '{';
			for(var e in array){
					json += this.jsonize(e, array[e] );
			}
			json += '"dummy":"0"';
			json += '}';
			
			return json;
		}
		
		this.jsonize = function(_name, _value, _end){
			var retVal = '"'+_name+'":';
					retVal += '"'+_value+'"';
					retVal += _end!="EOL"?',':'';
			return retVal;
		}
	}