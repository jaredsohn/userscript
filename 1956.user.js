// ==UserScript==// @name           BMJ Rapid responses killfile// @namespace      tag:christopherlam@doctors.net.uk,2005-10-14:BMJCensorship// @description    Censor certain individuals from BMJ rapid responses
// @author         Christopher Lam
// @include        http://bmj.bmjjournals.com/cgi/eletters*// ==/UserScript==
// technology architect - Adrian Midgley
// version 1.0
// version 1.1
//    accepts regexes to match authors
// version 1.1.1
//    should work on firefox v < 1.5, by including zArray library

//JavaScript zArray Library v1.01 by Nicholas C. Zakas, http://www.nczonline.net
//This library governed by the GNU Lesser General Public License
var aCheckMethods=new Array("concat","push","pop","every","some","forEach","filter","map","indexOf","lastIndexOf","slice","splice","shift","unshift");Array.prototype.append=function(){for(var i=0;i<arguments.length;i++){this[this.length]=arguments[i];}};Array.prototype.clone=function(){return this.concat();};Array.prototype.contains=function(vItem){return this.indexOf(vItem)>-1;};Array.prototype._every=function(fnTest,oThis){if(this.length>0){var bResult=true;oThis=oThis||window;oThis.__everyFunc__=fnTest;for(var i=0,l=this.length;i<l&&bResult;i++){bResult=bResult&&oThis.__everyFunc__(this[i],i,this);};oThis.__everyFunc__=null;return bResult;}else{return true;}};Array.prototype._filter=function(fnTest,oThis){var aResult=new Array();oThis=oThis||window;oThis.__filterFunc__=fnTest;for(var i=0,l=this.length;i<l;i++){if(oThis.__filterFunc__(this[i],i,this)){aResult.push(this[i]);}};oThis.__filterFunc__=null;return aResult;};Array.prototype._forEach=function(fnExec,oThis){oThis=oThis||window;oThis.__forEachFunc__=fnExec;for(var i=0,l=this.length;i<l;i++){oThis.__forEachFunc__(this[i],i,this);};oThis.__forEachFunc__=null;};Array.prototype._indexOf=function(vItem,iStart){if(iStart==null){iStart=0;};for(var i=iStart,l=this.length;i<l;i++){if(this[i]==vItem){return i;}};return -1;};Array.prototype.insertAt=function(vItem,iIndex){this.splice(iIndex,0,vItem);};Array.prototype.insertBefore=function(vItem,vBeforeItem){this.insertAt(vItem,this.indexOf(vBeforeItem));};Array.prototype._lastIndexOf=function(vItem,iStart){if(iStart==null||iStart>=this.length){iStart=this.length-1;};for(var i=iStart;i>=0;i--){if(this[i]==vItem){return i;}};return -1;};Array.prototype._map=function(fnExec,oThis){var aResult=new Array();oThis=oThis||window;oThis.__mapFunc__=fnExec;for(var i=0,l=this.length;i<l;i++){aResult.push(oThis.__mapFunc__(this[i],i,this));};oThis.__mapFunc__=null;return aResult;};Array.prototype._pop=function(){var oItem=null;if(this.length>0){oItem=this[this.length-1];this.length--;};return oItem;};Array.prototype._push=Array.prototype.append;Array.prototype.remove=function(vItem){this.removeAt(this.indexOf(vItem));return vItem;};Array.prototype.removeAt=function(iIndex){var vItem=this[iIndex];if(vItem){this.splice(iIndex,1);};return vItem;};Array.prototype._slice=function(iStart,iStop){var aResult=new Array();iStop=iStop||this.length;for(var i=iStart;i<iStop;i++){aResult.push(this[i]);};return aResult;};Array.prototype._shift=function(){var vItem=this[0];if(vItem){this.splice(0,1);};return vItem;};Array.prototype._some=function(fnTest,oThis){oThis=oThis||window;oThis.__someFunc__=fnTest;for(var i=0,l=this.length;i<l;i++){if(oThis.__someFunc__(this[i],i,this)){return true;}};oThis.__someFunc__=null;return false;};Array.prototype._splice=function(iIndex,iLength){var aResult=new Array();var aRemoved=new Array();for(var i=0;i<iIndex;i++){aResult.push(this[i]);};for(var i=iIndex;i<iIndex+iLength;i++){aRemoved.push(this[i]);};if(arguments.length>2){for(var i=2;i<arguments.length;i++){aResult.push(arguments[i]);}};for(var i=iIndex+iLength;i<this.length;i++){aResult.push(this[i]);};for(var i=0;i<aResult.length;i++){this[i]=aResult[i];};this.length=aResult.length;return aRemoved;};Array.prototype.sum=function(fnConvert,oThis){if(this.length>0){var vResult=null;oThis=oThis||window;oThis.__sumFunc__=fnConvert||function(vVal){return vVal;};vResult=oThis.__sumFunc__(this[0],0,this);for(var i=1,l=this.length;i<l;i++){vResult+=oThis.__sumFunc__(this[i],i,this);};oThis.__sumFunc__=null;return vResult;}else{return null;}};Array.prototype._unshift=function(){var sExec="this.splice(";var aArgs=new Array();for(var i=0,l=arguments.length;i<l;i++){aArgs.push("arguments["+i+"]");}eval("this.splice(0,0,"+aArgs.join(",")+")");};for(var i=0;i<aCheckMethods.length;i++){if(!Array.prototype[aCheckMethods[i]]){Array.prototype[aCheckMethods[i]]=Array.prototype["_"+aCheckMethods[i]];}}

var bannedAuthors = ['Hilary Butler', 'John Stone', 'Clifford G Miller', 'John P.* Heptonstall'] // must be a valid regex
var all = document.getElementsByTagName('tr');

function isBanned(vValue, iIndex, aArray) {
    return (authorName.search(vValue) > -1);
}

for (var i = all.length - 1; i >= 0; i--) {
  row = all[i];
  if (row.childNodes.length == 7) {
    if (row.childNodes[1].nodeName == '#comment') {
      if (row.childNodes[1].nodeValue == ' begin author sidebar ') {
        authorName = row.childNodes[3].childNodes[1].childNodes[0].nodeValue.slice(1,-2);
	if (bannedAuthors.some(isBanned)) {
	  placeholder = document.createTextNode(authorName+" didn't expect the Spanish inquisition");
	  row.parentNode.replaceChild(placeholder, row);
	}
      }
    }
  }
}
