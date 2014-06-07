// ==UserScript==
// @name           xMyx xflashVarsx
// @namespace      http://userscripts.org/users/180431
// @description    Gets me some info
// @copyright      MonkeyNround
// @version        1.12.05
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @include        http://apps.facebook.com/onthefarm/*
// @include        http://fb-tc-2.farmville.com/flash.php*
// ==/UserScript==

(function()
{
    if (typeof unsafeWindow != "undefined") {
        loghead="See list of all variables at end of this page.<br/>";
        log="<b>Log all variables: Global variables in unsafeWindow:</b><br/>";
        logfull="<b>Global variables and values:</b><br/>";
	// list all the variables in the content's global scope
	GM_log("index : variable (index)" + "\n");
	for (var p in unsafeWindow) {
	   var myvars = unsafeWindow[p];
		if (p == 'flashVars'){
		alert('{'+p+'} = '+objectToString(myvars));
	   }
	}
    }
    else {
        loghead="<b>Log all variables : unsafeWindow is not defined, "
         +" script needs Greasemonkey version 0.6.4 or after</b><br/>";
        log="";
        logfull="";
    }
function objectToString(o){
    
    var parse = function(_o){
    
        var a = [], t;
        
        for(var p in _o){
        
            if(_o.hasOwnProperty(p)){
            
                t = _o[p];
                
                if(t && typeof t == "object"){
                
                    a[a.length]= p + ":{ " + arguments.callee(t).join(", ") + "}";
                    
                }
                else {
                    
                    if(typeof t == "string"){
                    
                        a[a.length] = [ p+ ": \"" + t.toString() + "\"" ];
                    }
                    else{
                        a[a.length] = [ p+ ": " + t.toString()];
                    }
                    
                }
            }
        }
        
        return a;
        
    }
    
    return "{" + parse(o).join(", ") + "}";
    
}
})();