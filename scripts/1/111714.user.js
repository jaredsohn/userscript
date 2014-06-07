// ==UserScript==
// @name			GFW Warning 
// @namespace		Starrow
// @author			Starrow Pan
// @description		Show warnings on links which might be blocked by GFW on Google search results.
// @version			0.1
// @date			2011-08-25
// @require http://userscripts.org/scripts/source/111662.user.js
// @require        http://userscripts.org/scripts/source/78952.user.js
// @updates        
// @include        http://www.google.com/*
// @include        http://www.google.com.hk/*
// ==/UserScript==

(
function warn(){

Date.prototype.getTimeString = function(){
	var d = ":";
	var result = this.getHours() + d + this.getMinutes() + d + this.getSeconds() + d + this.getMilliseconds();
	return result;
};
//log
function log(msg){
	if (GM_log) {
		GM_log(new Date().getTimeString() + ' >> ' + msg);
	}
};
//In firefox 6, GM_log doesn't work
function debug(msg){
	unsafeWindow.console.log(new Date().getTimeString() + ' >> ' + msg);
}
//check updates
try{
updateMe(111714, 'GFW Warning', '0.1');
var $j = jQuery.noConflict();
var domains=[];
d=GM_getValue('domains', '');
if (d!=='')
	{
		domains=d.split(', ');
		for (var i=0; i<domains.length; i++)
		{
			$j("a[href*="+domains[i]+"]").parents("li").css('background-color','yellow');
			GM_registerMenuCommand('GFW Warning -> 删除域: '+domains[i], function(index){
				return function(){
				domains.splice(index, 1);
				//debug(index);
				GM_setValue('domains', domains.join(', '));
				location.reload();
				}
			}(i));
		}
	}

GM_registerMenuCommand('GFW Warning -> 增加域', function(){
	var nd=window.prompt('增加域');
	var value;
	if (nd!=='')
	{
		domains.push(nd);
		GM_setValue('domains', domains.join(', '));
		location.reload();
	}
});
}catch(e){
	debug(e.message + ' @ ' + e.lineNumber);
}
})();