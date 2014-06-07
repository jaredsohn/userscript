// ==UserScript==
// @name           Refrash Yourself
// @namespace      tag:uservid2011@yahoo.com, 2011-07-28, steev0
// @description    Refrash whatever the fuck you want.
// @include        http://*.ebaumsworld.*
// ==/UserScript==

/* Do not modify this unless you know what you're doing */
var btn=document.evaluate("//input[@value]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var toReplace = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\^|\$)/g;
var modifyButton = new Buttons();



/* ---Button Section--- */   	
modifyButton.byText ("REFRASH MIZUKA", "REFRASH GRUMMANGOOSE");




/* Complete list of valid function calls:


modifyButton.byText ("REFRASH WHITE_CHOCOLATE", "REFRASH GRUMMANGOOSE");
modifyButton.byText ("WHITE_CHOCOLATE", "REFRASH GRUMMANGOOSE", RegexEnabled);

*/


/* Do not modify the section below unless you know what you're doing */

/* Buttons */
function Buttons (){

addMethod (this, "byText", function(ExpectedName, DesiredName){
		ExpectedName = "^" + ExpectedName.replace(toReplace, "\\$1") + "$";
		re = new RegExp(ExpectedName)
		for(i = 0; i < btn.snapshotLength; i++) {
			tmp = btn.snapshotItem(i)
			if(re.test(tmp.value)){
				if (DesiredName != ""){
					tmp.value = DesiredName;
				}
			}
		}				
	});

addMethod (this, "byText", function(ExpectedName, DesiredName, RegexEnabled){
		if (RegexEnabled != 1){
			ExpectedName = "^" + ExpectedName.replace(toReplace, "\\$1") + "$";
		}
		re = new RegExp(ExpectedName)
		for(i = 0; i < btn.snapshotLength; i++) {
			tmp = btn.snapshotItem(i)
			if(re.test(tmp.value)){
				if (DesiredName != ""){
					tmp.value = DesiredName;
				}
			}
		}				
	});
}	


//Used for overloading methods, by steev0
function addMethod(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
        if ( fn.length == arguments.length )
            return fn.apply( this, arguments );
        else if ( typeof old == 'function' )
            return old.apply( this, arguments );
    };
}

// ==/UserScript==
