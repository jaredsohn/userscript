// ==UserScript==
// @id    111662
// @name			Starrow's Updater 
// @namespace		Starrow
// @author			Starrow Pan
// @description		An user script updater based on Another Auto Update Script(http://userscripts.org/scripts/show/38017) with features like: simple, supports @updates to show the updates of your script, English/Chinese prompts,  thorough analysis of headers for your possible customization, 
// @version			0.2
// @date			2011-08-25
// @updates        
// ==/UserScript==

/*
This script supports two languages and will choose Chinese if the browser is in that language and otherwise English.
Call updateMe with your script id on Userscripts.org and an initial version.
*/
function updateMe(id, name, version){
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
	var useZh = (window.navigator.language.substr(0, 2)==='zh');
    var days=7; // Days to wait between update checks
	var msg='';
	//var localMeta={};
	var serverMeta={};
        //name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(src_meta)[1],
        //version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(src_meta)[1].replace(/\./g, ''),
	var currentVer=GM_getValue('version_' + id, '');
	if (currentVer==='') currentVer=version;
	var time= new Date().getTime();

	function parseHeaders(metadataBlock) {
	var source = metadataBlock;
	var headers = {};
	var tmp = source.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/);
	if (tmp) {
		var result;
		var key, value;
		while((result=/\/\/\s*@(.*?)\s+(.*?)\s*\n/ig.exec(tmp[0]))){
			key=result[1];
			value=result[2];
			if (headers[key]){
				if (headers[key] instanceof Array){
					headers[key].push(value);
				}else{
					headers[key]=[headers[key], value];
				}
			}else{
				headers[key] = value;
			}
		}
	}
	return headers;
}

   function call(response){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://userscripts.org/scripts/source/' + id + '.meta.js',
			onload: function(xpr){
				compare(xpr, response);
			}
		});
	}

	function compare(xpr, response){
		if (xpr.responseText.match("the page you requested doesn't exist")) {
				GM_setValue('updated_' + id, 'off');
				return false;
			}
			serverMeta=parseHeaders(xpr.responseText);
		
		if (serverMeta.version && serverMeta.version!==currentVer ) {
			/*
			var changedReq='';
			var req=[serverMeta.require, localMeta.require];
			req=req.map(function(elem){
				var r=elem?elem:'';
				if (!(r instanceof Array)) return [r];
			});
			var sr=req[0],lr=req[1];
			for (var i=0; i<sr.length; i++){
				if (sr[i]!=='' && lr.indexOf(sr[i])===-1){
					changedReq=sr[i];
					break;
				}
			}
			if (changedReq!==''){
				//alert(name+'需要脚本'+changedReq+', 您需要卸载当前脚本再重新安装。');
				alert('The script "' + name + '" requires another one "' +changedReq+'" to work. Please uninstall the current copy and re-install it.');
				return;
			}
			*/
			if (useZh)
			{
				msg=name + '已经更新到' + serverMeta.version + '。' + 
				(serverMeta.updates?'\n'+serverMeta.updates+'\n':'') +
				'是否更新（建议）？';			
			}else{
				msg='The script "' + name + '" has a new update of version ' + serverMeta.version + ' on the server.' + 
				(serverMeta.updates?'\n'+serverMeta.updates+'\n':'') + 
				'Will you update it now(recommended)?';
			}
			if (confirm(msg)) {
				GM_setValue('updated_' + id, time + '');
				GM_getValue('version_' + id, serverMeta.version);
				top.location.href = 'https://userscripts.org/scripts/source/' + id + '.user.js';
			}else{
				//turn off updating NOT enabled
			/*
			 if(confirm('Do you want to turn off auto updating for this script?')) {
			 GM_setValue('updated_'+id, 'off');
			 GM_registerMenuCommand("Auto Update "+name, function(){GM_setValue('updated_'+id, new Date().getTime()+''); call(true);});
			 alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
			 } else {
			 GM_setValue('updated_'+id, time+'');
			 }
			 */
			}
		}else {
				if (response){
					if (useZh){
						msg=name + '没有更新。';
					}else{
						msg='There is no update for "' + name + '".';
					}
				}
				alert(msg);
				GM_setValue('updated_' + id, time + '');
			}
	}

   function check(){
		if (GM_getValue('updated_' + id, 0) === "off") {
			if (useZh){
				msg="启用" + name + "的自动更新";
			}else{
				msg='Auto update ' + name;
			}
			GM_registerMenuCommand(msg, function(){
				GM_setValue('updated_' + id, new Date().getTime() + '');
				call(true)
			});}else {
			if (+time > (+GM_getValue('updated_' + id, 0) + 1000 * 60 * 60 * 24 * days)) {
				GM_setValue('updated_' + id, time + '');
				call();
			}
			if (useZh){
				msg="检查" + name + "的自动更新";
			}else{
				msg='Check updates for ' + name;
			}
			GM_registerMenuCommand(msg, function(){
				GM_setValue('updated_' + id, new Date().getTime() + '');
				call(true)
			});
		}
	}

if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') 
	check();
}catch(e){
	debug(e.message + ' @ ' + e.lineNumber);
}
}
updateMe(111662, "Starrow's Updater", '0.1');
