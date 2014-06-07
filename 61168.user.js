/**/
// ==UserScript==
// @name           SpringerMod
// @namespace      http://mit.edu/gregp/www/greasemonkey/springer
// @description    Script to allow for easier downloading of Springer books
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include        *.springerlink.*
// ==/UserScript==
/**/

/////////////////////////////////// DEBUG //////////////////////////////////////
if(unsafeWindow.console){
   GM_log = unsafeWindow.console.log;
}

/////////////////////////////////// XPATH //////////////////////////////////////
function xP(){
	function xPathInDoc(q,w,d){
		    return d.evaluate(q,w, null,
	        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	function xPathSnapshotToJQuery(s){
		var x = new Array();
		
		for(i=0;i<s.snapshotLength;i++){
			x.push($(s.snapshotItem(i)));
		}
		
		return $(x);
	}

	if(arguments.length < 3) var doc = document;
	else var doc = arguments[2];
	
	if(arguments.length < 2) var contain = document;
	else var contain = arguments[1];
	
	var query = arguments[0];
	
	return xPathSnapshotToJQuery(xPathInDoc(query,contain,doc));
}
function subXPath( q, doc ){ return xP(q,doc,doc); }
function containingClassXPath(className) {
  return "contains(concat(' ',normalize-space(@class),' '),' " + className + " ')";
}
function xPathLocationHasStringQ(xpath,str){
	var xpre = xP(xpath);	
	return !(xpre.length == 0 || !hasStringQ(xpre[0],str));
}

/////////////////////////////////// COLORS //////////////////////////////////////
function randInt(m){return Math.floor(Math.random() * m);}
function makeRed(w){color(w,"red");}
function color(w,c){w.css({"background-color":c});}
red = {"background-color":"red"};
green = {"background-color":"green"};
blue = {"background-color":"blue"};
