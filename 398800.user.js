// ==UserScript==
// @name           CL_autoReply
// @description    草榴新手自动回复
// @include        http://*t66y.com/*
// @include        http://cl.man.lv/*
// @include        http://184.154.178.130/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @author         congxz6688
// @version        2014.3.4.0
// @grant          GM_addStyle
// @grant          GM_log
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==


GM_addStyle("#autoReply{margin-left:800px}");

function runAutoreply() {
	GM_xmlhttpRequest({
		method : 'GET',
		synchronous : false,
		url : "http://" + window.location.hostname + "/thread0806.php?fid=7",
		onload : function (reText) {
			GM_log("已经进入技术讨论区，开始获取第一个普通主题信息...");
			var reTextTxt = reText.responseText;
			var tr2n = reTextTxt.split('class="tr2"')[3];
			var tdthis = tr2n.match(/<h3>.*?<\/h3>/g)[Math.ceil(90*Math.random())];
			var tid = tdthis.match(/tid=\d{6,}|\d{6,}\.html/)[0].match(/\d+/)[0];
			var tdtitle = tdthis.match(/">(.*)?<\//)[1];
			var dataa = "atc_usesign=1&atc_convert=1&atc_autourl=1&atc_title=Re:" + tdtitle + "&atc_content=1024&step=2&action=reply&fid=7&tid=" + tid + "&atc_attachment=none&pid=&article=&verify=verify";
			GM_log("主题信息获取成功，开始回复主题" + tid + "...");
			GM_xmlhttpRequest({
				method : 'POST',
				synchronous : false,
				headers : {"Content-Type" : "application/x-www-form-urlencoded"},
				url : "http://" + window.location.hostname + "/post.php?",
				data : encodeURI(dataa),
				onload : function (response) {
					var res = response.responseText;
					if(res.indexOf("�l�N�ꮅ�c���M�����}�б�")!=-1){
						GM_log("回复成功...1080秒后再试");
						var jyy = new Date();
						var recardTime = jyy.getTime();
						GM_setValue("recardTime", recardTime);
						setTimeout(runAutoreply,1080000);
					}else if(res.indexOf("��ˮ�A���C���ѽ����_����1024��Ȳ��ܰl�N")!=-1){
						GM_log("发贴时间未到...6分钟后再试");
						setTimeout(runAutoreply,360000);
					}else if(res.indexOf("�Ñ��M���ޣ������ٵ��Ñ��Mÿ������ܰl 10 ƪ����.")!=-1){
						GM_log("新人每天回复不能超过10贴，今天发完了");
						document.getElementById("autoReply").checked = false;
						GM_setValue('autoReplybox', false);
					}else{
						GM_setValue("自动回复出现未知情况，请检查...\r\n"+res);
					}
				}
			})
		}
	})
}

//添加按钮
var replySpan = document.createElement("span");
replySpan.innerHTML = "自动回复";
var autoReplybox = document.createElement("input");
autoReplybox.type = "checkbox";
autoReplybox.id = "autoReply";
autoReplybox.title = "选中此项，启动自动回复，否则，关闭自动回复";
autoReplybox.checked = GM_getValue("autoReplybox",false);
autoReplybox.addEventListener('click', function () {
	GM_setValue('autoReplybox', document.getElementById("autoReply").checked);
}, true);
document.querySelector(".banner").appendChild(autoReplybox);
document.querySelector(".banner").appendChild(replySpan);


if(document.getElementById("autoReply").checked){
	var nrt = new Date();
	var nowTime = nrt.getTime();
	var lastTime = GM_getValue("recardTime", 0);
	var tbt = nowTime-lastTime;
	if(tbt>1060000){
		runAutoreply();
	}else{
		setTimeout(runAutoreply,1080000-tbt);
	}
}