// ==UserScript==
// @id             userscripts.org-a8312ec7-7213-43e6-9863-ce97db4cb469@scriptish
// @name           HDWingMonitor
// @version        1.0
// @namespace      HDWingMonitor
// @author         Moses
// @description    
// @run-at         document-end
// @include			*
// @require			https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// ==/UserScript==

if(!checkConfigExist()){
	configure();
}else{
	mainFunction();
}

GM_registerMenuCommand("配置 - HDWingMonitor", configure);
GM_registerMenuCommand("立刻取得当前数据！- HDWingMonitor", alertDisplay);

function checkConfigExist(){
	var params = ['userID', 'fields', 'prompt', 'interval'];
	for(var i in params){
		try{
			if(GM_getValue(params[i])== null){
				return false;
			}
		}catch(e){
			return false;
		}
	}
	return true;
}

function configure(){
	var configStyle = ".indent40 { margin-left: auto !important;}";
	var userID = GM_getValue("userID")==null?'185722':GM_getValue("userID");
	var fields = GM_getValue("fields")==null?'上传量,下载量,分享率,做种积分':GM_getValue("fields");
	var interval = GM_getValue("interval")==null?'30':GM_getValue("interval");
	GM_config.init('参数设置',
		{
			'userID':{'label': 'userID:','title': '登录网站后点击自己用户名，链接中最后的数字', 'type': 'text','default': userID},
			'fields':{'label': '监视项目:','title': '你想要不断监视的字段名', 'type': 'text', 'default': fields},
			'prompt':{'label': '页面刷新时右下角显示状态:', 'title': '每次页面打开或刷新时右下角均提示监视字段的最新值', 'type': 'checkbox', default: true},
			'interval':{'label': '循环间隔(s):', 'title': '间隔多久提示一次最新值', 'type': 'text', 'default': interval}
			
		},
		configStyle,
		{
			open:function(){
				GM_config.addBorder();
				GM_config.resizeFrame('480px','360px'); 
			},		
			save: function() {
				GM_setValue("userID", GM_config.get('userID'));
				GM_setValue("fields", GM_config.get('fields'));
				GM_setValue("prompt", GM_config.get('prompt'));
				GM_setValue("interval", GM_config.get('interval'));
				mainFunction();
			}
		}
	);
	GM_config.open();
}

function mainFunction(){
	if(GM_getValue('prompt') == false || GM_getValue('prompt') == 'false'){
		return;
	}
	if(GM_getValue("lastShow") == null){
		GM_log(GM_setValue("lastShow", String(new Date().getTime())));
		showMonitorValues();
		
	}else{
		if(new Date().getTime() - Number(GM_getValue("lastShow")) >= GM_getValue("interval")*1000){
			GM_setValue("lastShow", String(new Date().getTime()));
			showMonitorValues();
		}
	}
}

function alertDisplay(){
	showMonitorValues('alert');
}

function showMonitorValues(displayType){
	var userId = GM_getValue('userID');
	var fieldsStr = GM_getValue('fields');
	var interval = GM_getValue('interval');
	fieldsStr = fieldsStr.replace(/,，、/g, ",");
	var fields = fieldsStr.split(",");
	if(fields.length<=0){
		GM_log("未设置监测字段或设置有误！");
		return;
	}
	getDOC('http://hdwing.com/userdetails.php?id=' + userId, function(doc) {
		var result = "";
		for(var i in fields){
			var keyword = fields[i];
			var htmlEle = GM_xpath({
				path: "//td[text()='" + keyword + "']/following-sibling::td",
				node: doc,
				resolver: "http://www.w3.org/1999/xhtml"
			});
			if(htmlEle){
				var content = htmlEle.innerHTML.replace(/<[^>]+>/g, "");
				content = content.replace(/&nbsp;/g, "");
				result += keyword+" : " + content + "\r\n";
			}
		}
		display(result, displayType);
	});
}

function display(result, displayType){
	if(typeof displayType == 'undefined' || displayType == null || displayType == 'default'){
		GM_notification(result, "当前状态", null, function() {
			configure();
		});
	}else{
		alert(result);
	}
}


function getDOC(url, callback) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function (response) {
		  var doc = GM_safeHTMLParser(response.responseText);
		  callback(doc);
		}
	});
}
