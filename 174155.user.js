// ==UserScript==
// @name           Ajax Reply
// @namespace      tyh1k@cc98.org
// @description    Ajax提交回复
// @include        http://www.cc98.org/dispbbs.asp*
// @include 	   http://www.cc98.org/dispbbs.asp*
// @exclude      	
// @author         Tyh1k
// @version		   1.2
// ==/UserScript==

// modified by soda

/* 一种包含jQuery的方法 或用// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.0/jquery-ui.min.js */
/* var jQlab = document.createElement('script');
jQlab.type = 'text/javascript';
jQlab.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.0/jquery-ui.min.js';
document.getElementsByTagName('head')[0].appendChild(jQlab); */

// ajax回复框全局属性
var simpleDialog = false;	// 简单对话框模式
var opacity = 0.8;		// 对话框透明度
/*
if (!GM_xmlhttpRequest) {
	GM_xmlhttpRequest = function function(opts) {
        opts = {
            method: opts.method || "GET",
            url: opts.url || "",
            data: opts.data || null,
            contentType: opts.contentType || "application/x-www-form-urlencoded; charset=UTF-8",
            onload: opts.onload || function() {},
            synchronous: opts.synchronous || false
        };
        var xhr = new XMLHttpRequest;
        xhr.open(opts.method, opts.url, !opts.synchronous);
        xhr.setRequestHeader("Content-type", opts.contentType);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                opts.onload(xhr);
            }
        };
        xhr.send(opts.data);
    }
}
*/
function xpath(query)
{
	return document.evaluate(
		query,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
}

//创建我说按钮
/*
var oSayButton = document.createElement("a");

oSayButton.id = "say_button";
oSayButton.href = "javascript:"
GM_addStyle('\
	#say_button {\
	    -moz-background-clip:border;\
	    -moz-background-inline-policy:continuous;\
	    -moz-background-origin:padding;\
	    -moz-border-radius-bottomright:5px;\
	    -moz-border-radius-topright:5px;\
	    background:#666666 url(http://keep-rolling.googlecode.com/files/say.gif) no-repeat scroll 5px center;\
	    border-color:#EEF9EB;\
	    border-style:solid;\
	    border-width:4px 4p 4px 0;\
	    display:block;\
	    height:66px;\
	    outline-color:-moz-use-text-color;\
	    outline-style:none;\
	    outline-width:medium;\
	    position:fixed !important;\
	    left:0;\
	    text-indent:-9999px;\
	    top:300px;\
	    width:24px;\
	}\
');
document.body.appendChild(oSayButton);
*/


// 获取引用的文字
function getQuote(rawhtml) {
	try
	{
		return rawhtml.match(/<textarea.*>([\s\S]*)<\/textarea>/i)[1];
	}
	catch(err)
	{
		return null;
	}
}

    	
// 添加引用内容
function addQuoteContent(content,url) {
	//var tmp = document.createElement('label');
	var insertIndex = content.indexOf("[/b]") + 4;
	var tmpUrl = url.toLowerCase();
	var boardid = tmpUrl.match(/boardid=([^&]*)/)[1];
	var id = tmpUrl.match(/&id=([^&]*)/)[1];
	var page = tmpUrl.match(/&star=([^&]*)/)[1];
	var floor = tmpUrl.match(/&bm=([^&]*)/)[1];
	var quoteUrl = "dispbbs.asp?boardid="+boardid+"&id="+id+"&star="+page+"#"+floor;

	/*
	var html = content.substring(0,insertIndex) + "[url=" + quoteUrl + 
		"][upload=gif]http://file.cc98.org/uploadfile/2010/4/30/22345776710.gif[/upload][/url]" +
		content.substring(insertIndex);
	*/

	var html = content.substring(0,insertIndex) + "  [url=" + quoteUrl + 
				",t=self][color=seagreen][b]|查看原帖|[/b][/color][/url]" + 
				content.substring(insertIndex).replace(/\n*(\[quotex\])\n*/, "\[quotex\]")
            	.replace(/\n*(\[\/quotex\])\n*/, "\n\[\/quotex\]\n")
            	//.replace(/(\[em\d{2}\])/g, "[noubb]$1[/noubb]").replace(/(\[upload=[^,]*?)(,0)?(\])/g, "$1,1$3");
    
    // var html = content.substring(0,insertIndex) + "&nbsp;&nbsp;[url=" + quoteUrl + 
	//	",t=self][color=blue][b]<查看原贴>[/b][/color][/url]" + content.substring(insertIndex).replace(/\s*\n*(\[quotex?\])\s*\n*/, "$1\n")
    //        .replace(/\s*\n*(\[\/quotex?\])\s*\n*/, "\n\n$1\n") .replace(/(\[em\d{2}\])/g, "[noubb]$1[/noubb]").replace(/(\[upload=[^,]*?)(,0)?(\])/g, "$1,1$3").replace( /@([^\s^@]+)/ig,"@$1~");
    //alert(html);	
	//tmp.innerHTML = html;
	document.getElementById("mb_text").value += html;
}

//关闭div
function fnClose() {

	if (document.getElementById("dialog") != undefined) 
	{
		var elementDiv = document.getElementById("dialog");
		
		elementDiv.parentNode.removeChild(elementDiv); 
	}
	if (document.getElementById("postEmotion_menu") != undefined)
	{
		var elementDiv = document.getElementById("postEmotion_menu");
		
		elementDiv.parentNode.removeChild(elementDiv); 
	}
	if (document.getElementById("cc98Emotion_menu") != undefined)
	{
		var elementDiv = document.getElementById("cc98Emotion_menu");
		elementDiv.parentNode.removeChild(elementDiv);
	}
	if (document.getElementById("cc98UploadPanel") != undefined)
	{
		var elementDiv = document.getElementById("cc98UploadPanel");
		elementDiv.parentNode.removeChild(elementDiv);
	}
}

//显示我说对话框
function fnShow() {

    if (document.getElementById("dialog") == undefined) {
		//var dialogTop = document.body.clientHeight / 2 + document.body.scrollTop - 75;
		var oDivDialog = document.createElement("div");

		oDivDialog.id = "dialog";
		oDivDialog.style.position = "fixed";
		oDivDialog.style.opacity = opacity;

		if (simpleDialog) 
		{
			oDivDialog.style.width = 400;
			oDivDialog.innerHTML = "<div align='center' style=\"margin:auto 0;width:100%;filter:alpha(Opacity=60);-moz-opacity:0.6;opacity: 0.6;\">"+
			"<textarea class='area_miniblog' rows='5' id='mb_text' name='mb_text' style='width:400px;height:150px'></textarea><br/>"+
			"<input type='button' value=' I Say ' class='button' name='mb_submit' id='mb_submit' />"+
			"</div>";
		}
		else
		{
			//oDivDialog.style.width = 600;

			oDivDialog.innerHTML =	
				"<table cellspacing='0' cellpadding='3'><tbody>"+
					"<tr><td style=\"height:8px;width:8px;padding:0;background-color:#3F7DBA;\"></td><td style=\"height:8px;width:584px;padding:0;background-color:#3F7DBA\"></td><td style=\"height:8px;width:8px;padding:0;background-color:#3F7DBA\"></td></tr>"+
					"<tr><td style=\"width:8px;padding:0;background-color:#3F7DBA;\"></td>"+
						"<td style=\"padding:0;background-color:\#F5FAFE\"><div style=\"margin:15px;\">" +
							"<h3 id='ajaxReplyTitle' style=\"cursor:move;\">参与/回复主题"+
								"<span style=\"float:right;\">"+
								"<a id='btnCloseDlg' href=\"javascript:;\">"+
								"<img src='http://file.cc98.org/uploadfile/2010/4/11/1982947828.png' border='0'/></a></span>" +
							"</h3>"+
							"<div>标题  <input id='mb_title' maxlength='50' size='70'></div>" +
							"<div>"+
							"<div id='editor_tab' style=\"background-color:#E8E8E8;border-width:1px 1px;height:25px;margin:5px 0 0;\">"+
								"<a id='postEmotion' href=\"javascript:;\" >"+	// 发贴心情
								"<img src='http://www.cc98.org/face/face7.gif' border='0' style=\"margin:5px 5px 5px;\" /></a>"+
								"<a id='cc98Emotion' href=\"javascript:;\" >"+	// cc98标准表情
								"<img src='http://www.cc98.org/emot/simpleemot/emot88.gif' border='0' style=\"margin:5px 5px 5px;width:15px;height:15px\" /></a>"+
								"<a id='btnUpload' href=\"javascript:;\" >" +   // 上传
								"<img src='http://file.cc98.org/uploadfile/2010/5/4/21521278526.png' border='0' style=\"margin:5px 5px 5px;width:15px;height:15px;\" /></a>"+
							"</div>"+
							"<textarea rows='5' id='mb_text' name='mb_text' style='width:570px;height:200px;'></textarea><br/>"+
							"<table cellpadding='2'><tbody>"+
							"<tr><td><input type='button' value=' Say! ' class='button' name='mb_submit' id='mb_submit' style='margin-top:3px;'/></td>"+
							"<td><div id='requestState' style=\"color:red;padding-left:10px;padding-top:3px;\"></div></td></tr>"+
							"</tbody></table>"+
						"</div></td>"+
					"<td style=\"width:8px;padding:0;padding:0;background-color:#3F7DBA;\"></td></tr>"+
					"<tr><td style=\"height:8px;width:8px;padding:0;background-color:#3F7DBA;\"></td><td style=\"height:8px;width:584px;padding:0;background-color:#3F7DBA\"></td><td style=\"height:8px;width:8px;padding:0;background-color:#3F7DBA\"></td></tr>"+
				"</tbody></table>";
		}

		//var oDivWrapper = document.getElementById("say_button");

		//document.body.insertBefore(oDivDialog, oDivWrapper);
		document.body.appendChild(oDivDialog);

		oDivDialog.style.left = document.body.clientWidth / 2 - oDivDialog.clientWidth / 2;
		oDivDialog.style.top = document.body.clientHeight / 2 - oDivDialog.clientHeight / 2;

		//为文本框设置焦点
		document.getElementById("mb_text").focus();

		//给提交按钮添加监听函数
		var oSubmit = document.getElementById("mb_submit");
		oSubmit.addEventListener("click", fnPostData, false);

		if (simpleDialog == false)
		{
			var tmp = document.getElementById("btnCloseDlg");
			tmp.addEventListener("click",fnClose,false);
			tmp = document.getElementById("postEmotion");
			tmp.addEventListener("click",showPostEmotion,false);
			tmp = document.getElementById("cc98Emotion");
			tmp.addEventListener("click",showCC98Emotion,false);
			tmp = document.getElementById("btnUpload");
			tmp.addEventListener("click",showUploadPanel,false);
			tmp = document.getElementById("ajaxReplyTitle");
			tmp.addEventListener("mousedown",beforeDrag,false);
			document.addEventListener("mousemove",onDrag,false);
			tmp.addEventListener("mouseup",endDrag,false);
			//tmp.addEventListener("mouseout",endDrag,false);
			DoWithUpload(); 
		}
    }
}

// 显示发贴心情列表
function showPostEmotion()
{
	var divDialog = document.getElementById("dialog");
	// 创建发贴心情列表
	var divPostEmotion = document.createElement("div");
	
	divPostEmotion.id = "postEmotion_menu";
	divPostEmotion.style.position = "fixed";
	divPostEmotion.style.opacity = 0.8;
	//divPostEmotion.style.left = document.body.clientWidth / 2 - 276;
	//divPostEmotion.style.top = document.body.clientHeight / 2 - 33;
	divPostEmotion.style.left = divDialog.offsetLeft + 24;
	divPostEmotion.style.top = divDialog.offsetTop + 107;
	divPostEmotion.style.width = 568;
	divPostEmotion.style.height = 30;
	divPostEmotion.style.backgroundColor = "#E8E8E8";
	divPostEmotion.innerHTML = "<table><tbody><tr id='postEmotionList'></tr></tbody></table>";

	document.body.appendChild(divPostEmotion);

	var parent = document.getElementById("postEmotionList");
	for (var i = 1; i <= 22; i++)
	{
		var src = "http://www.cc98.org/face/face"+i+".gif";
		var img = document.createElement("img");
		img.src = src;
		img.style.margin = "0 5px 5px";
		img.border = 0;
		img.addEventListener(
			"click",
			function (event)
			{
				if (event.button == 0)
				{
					document.getElementById("postEmotion").firstChild.src = event.target.src;
				}
			},
			false
		);
		parent.appendChild(img);
	}
}

// 显示cc98标准表情
function showCC98Emotion()
{
	if (document.getElementById("cc98Emotion_menu") != undefined)
	{
		var div = document.getElementById("cc98Emotion_menu");
		div.parentNode.removeChild(div);
		return ;
	}
	var divDialog = document.getElementById("dialog");
	// 创建cc98表情列表
	var divCC98Emotion = document.createElement("div");
	
	divCC98Emotion.id = "cc98Emotion_menu";
	divCC98Emotion.style.position = "fixed";
	divCC98Emotion.style.opacity = 0.8;
	//divCC98Emotion.style.left = document.body.clientWidth / 2 - 276;
	//divCC98Emotion.style.top = document.body.clientHeight / 2 - 33;
	divCC98Emotion.style.left = divDialog.offsetLeft + 24;
	divCC98Emotion.style.top = divDialog.offsetTop + 107;
	divCC98Emotion.style.width = 568;
	divCC98Emotion.style.height = 30;
	divCC98Emotion.style.backgroundColor = "#E8E8E8";
	divCC98Emotion.innerHTML = "<table width='570px'><tbody><tr>"+
		"<td width='5%'><img id='cc98Emotion_pageup' src='http://file.cc98.org/uploadfile/2010/4/11/2352893168.gif' "+
		"style=\"width:8px;height:18px;margin:3px 5px 5px;background-Color:white;cursor:pointer\" alt='上一页' /></td>"+
		"<td width='90%' id='cc98EmotionList'></td>"+
		"<td width='5%'><img id='cc98Emotion_pagedown' src='http://file.cc98.org/uploadfile/2010/4/11/2353645393.gif' "+
		"style=\"width:8px;height:18px;margin:3px 5px 5px;background-Color:white;cursor:pointer\" alt='下一页' /></td>"+
		"</tr></tbody></table>";

	document.body.appendChild(divCC98Emotion);

	var parent = document.getElementById("cc98EmotionList");

	for (var i = 0; i < 19; i++)
	{
		var img = document.createElement("img");
		if (i < 10)
		{
			var src = "http://www.cc98.org/emot/simpleemot/emot0"+i+".gif";
			img.alt = "em0" + i;
		}
		else
		{
			var src = "http://www.cc98.org/emot/simpleemot/emot"+i+".gif";
			img.alt = "em" + i;
		}
		img.src = src;
		img.style.margin = "0 3px 3px";
		img.style.width = "20px";
		img.style.height = "20px";
		img.border = 0;
		img.addEventListener(
			"click",
			function (event)
			{
				if (event.button == 0)
				{
					var txt = document.getElementById("mb_text");
					txt.value += ("[em"+event.target.src.substring(40,42)+"]");
				}
			},
			false
		);
		parent.appendChild(img);
	}

	var leftarrow = document.getElementById("cc98Emotion_pageup");
	leftarrow.addEventListener("click",cc98EmotionPageUp,false);

	var rightarrow = document.getElementById("cc98Emotion_pagedown");
	rightarrow.addEventListener("click",cc98EmotionPageDown,false);
}

function fillCC98EmotionList(page)
{
	var parent = document.getElementById("cc98EmotionList");
	for (var i = page*19-19; i < page*19; i++)
	{
		var img = parent.childNodes[i%19];
		if (i > 91)
		{
			img.style.display = "none";
		}
		else
		{
			img.style.display = "";
			if (i < 10)
			{
				img.src = "http://www.cc98.org/emot/simpleemot/emot0"+i+".gif";
				img.alt = "em0" + i;
			}
			else
			{
				img.src = "http://www.cc98.org/emot/simpleemot/emot"+i+".gif";
				img.alt = "em" + i;
			}
		}
	}
}

function cc98EmotionPageUp()
{
	var parent = document.getElementById("cc98EmotionList");
	var firstem = parent.childNodes[0];
	var page = firstem.src.substring(40,42) / 19 + 1;
	page -= 1;
	if (page == 0)
	{
		page = 5;
	}
	fillCC98EmotionList(page);
}

function cc98EmotionPageDown()
{
	var parent = document.getElementById("cc98EmotionList");
	var firstem = parent.childNodes[0];
	var page = firstem.src.substring(40,42) / 19 + 1;
	page += 1;
	if (page == 6)
	{
		page = 1;
	}
	fillCC98EmotionList(page);
}

// 显示上传文件面板
function showUploadPanel()
{
	if (document.getElementById("cc98UploadPanel") != undefined)
	{
		var div = document.getElementById("cc98UploadPanel");
		div.parentNode.removeChild(div);
		return ;
	}
	var divDialog = document.getElementById("dialog");
	var divUploadPanel = document.createElement("div");

	divUploadPanel.id = "cc98UploadPanel";
	divUploadPanel.style.position = "fixed";
	divUploadPanel.style.opacity = 0.8;
	divUploadPanel.style.left = divDialog.offsetLeft + 24;
	divUploadPanel.style.top = divDialog.offsetTop + 107;
	divUploadPanel.style.width = 568;
	divUploadPanel.style.height = 30;
	divUploadPanel.style.backgroundColor = "#E8E8E8";

	var boardid = document.location.toString().toLowerCase().match(/boardid=([^&]*)/)[1];
	divUploadPanel.innerHTML = '<iframe width="100%" scrolling="no" height="24" frameborder="0" src="saveannounce_upload.asp?boardid=' + boardid + '" id="uploadframe" name="uploadframe"></iframe>';

	document.body.appendChild(divUploadPanel);
}

// 拖曳回复窗口相关的变量与函数
var isdragging = false;
var offsetX = 0;
var offsetY = 0;

function beforeDrag(event)
{
	var divDialog = document.getElementById("dialog");
	isdragging = true;
	offsetX = document.body.scrollLeft + event.clientX - divDialog.offsetLeft;
	offsetY = document.body.scrollTop + event.clientY - divDialog.offsetTop;
}

function onDrag(event)
{
	var divDialog = document.getElementById("dialog");
	if (!isdragging)
	{
		return ;
	}
	divDialog.style.left = document.body.scrollLeft + event.clientX - offsetX;
	divDialog.style.top = document.body.scrollTop + event.clientY - offsetY;
	if (document.getElementById("postEmotion_menu") != undefined)
	{
		var divPostEmotion = document.getElementById("postEmotion_menu");
		divPostEmotion.style.left = divDialog.offsetLeft + 24;
		divPostEmotion.style.top = divDialog.offsetTop + 107;
	}
	if (document.getElementById("cc98Emotion_menu") != undefined)
	{
		var divCC98Emotion = document.getElementById("cc98Emotion_menu");
		divCC98Emotion.style.left = divDialog.offsetLeft + 24;
		divCC98Emotion.style.top = divDialog.offsetTop + 107;
	}
	if (document.getElementById("cc98UploadPanel") != undefined)
	{
		var divUploadPanel = document.getElementById("cc98UploadPanel");
		divUploadPanel.style.left = divDialog.offsetLeft + 24;
		divUploadPanel.style.top = divDialog.offsetTop + 107;
	}
}

function endDrag()
{
	isdragging = false;
}


//居中显示
/*
function lieMiddle() {	

	var dialogTop = document.body.clientHeight / 2 + document.body.scrollTop - 75;

	if (document.getElementById("dialog") != undefined) {
		document.getElementById("dialog").style.top = dialogTop;
	}

}
*/

//POST数据
function fnPostData(){

    //fnChangeTip()
	if (document.getElementById("dialog") == undefined) {
		return ;
	}
	
	document.getElementById("requestState").innerHTML = "发表帖子中...";
	locate = location.href;
	var cookie = unsafeWindow.document.cookie;
	var username = cookie.match(/username=([^&;]*)/)[1];
	var password = cookie.match(/password=([^&;]*)/)[1];
	var url = document.location.toString().toLowerCase();
	var boardid = url.match(/boardid=([^&]*)/)[1];
	var id = url.match(/&id=([^&]*)/)[1];

	var content = document.getElementById("mb_text").value;
	var dataSend = encodeURIComponent(content);
	dataSend = dataSend.replace(/\+/g, "%2B");
	
	formData = 'followup='+id+'&RootID='+id+'&star=1&TotalUseTable=bbs4&UserName='+username+'&passwd='+password;
	if (document.getElementById('mb_title') != undefined)	// 如果存在标题
	{
		var titleData = document.getElementById('mb_title').value;
		formData += '&subject='+titleData;
	}
	formData +='&Expression=';
	if (document.getElementById("postEmotion") != null)
	{
		var postEmotionSrc = document.getElementById("postEmotion").firstChild.src;	// 发贴心情
		formData += postEmotionSrc.substring(postEmotionSrc.lastIndexOf('/')+1);
	}
	else
	{
		formData += "face7.gif";
	}
	formData +='&Content='+dataSend+'&signflag=yes';

	var request = new XMLHttpRequest();
	request.open('POST', 'http://www.cc98.org/SaveReAnnounce.asp?method=fastreply&BoardID=' + boardid,true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.onreadystatechange = function()
	{
		if (request.readyState==4)
		{
			var response = request.responseText;
			var statelbl = document.getElementById("requestState");
			if (response.indexOf("本页面将在3秒后自动返回您所发表的帖子") != -1)
			{
				statelbl.innerHTML = "发帖成功，正在跳转...";
				location.reload();
			}
			if (response.indexOf("本论坛限制发贴距离时间为10秒") != -1)
			{
				statelbl.innerHTML = "论坛限制发贴距离时间为10秒，请稍后再发。";
			}
		}
	};	
	request.send(formData);
	
	    /* GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.cc98.org/SaveReAnnounce.asp?method=fastreply&BoardID=198",
		data: "followup=331883011&RootID=3193515&star=1&TotalUseTable=bbs4&UserName=tyh1k&passwd=a6fd7c1e86c18c60&Expression=face7.gif&Content=" + dataSend + "&signflag=yes",
		headers: {
		    "Content-Type": "application/x-www-form-urlencoded",
			"Referer": "http://www.cc98.org/dispbbs.asp?boardID=198&ID=3193515&page=",
		},
		onload: function(){
		    //关闭对话框
			alert("ok3");
			alert(responseDetails.readyState);
			document.getElementById("content").value = responseDetails.responseText;
		    unsafeWindow.close_dialog();
		} 
	    }); */
}


//提交后显示
/* function fnChangeTip(){
    oTip = document.getElementById("tip");
    oTip.style.color = "#F92D09";
    oTip.innerHTML = "内容提交中...";
} */

//快捷键
function fnHotKey(oEvent) {
    //呼出alt+r
    if (oEvent.altKey === true && oEvent.keyCode === 82) {
		fnShow();
    }

    //提交ctrl+enter
    if (oEvent.ctrlKey === true && oEvent.keyCode === 13) {
		fnPostData();
    }

    //关闭alt+c
    if (oEvent.altKey === true && oEvent.keyCode === 67) {
		fnClose();
		
	if (document.getElementById("postEmotion_menu") != undefined) {
		var div = document.getElementById("postEmotion_menu");
		div.parentNode.removeChild(div);
		}	

	if (document.getElementById("cc98Emotion_menu") != undefined) {
		var div = document.getElementById("cc98Emotion_menu");
		div.parentNode.removeChild(div);
		}		
		
    }
	
	//向右翻页按钮
	if (oEvent.keyCode === 39 && document.getElementById("cc98EmotionList") != undefined) {
		cc98EmotionPageUp();
	}
	
	
	//向左翻页按钮
	if (oEvent.keyCode === 37 && document.getElementById("cc98EmotionList") != undefined) {
		cc98EmotionPageDown();
	}
	
	//ESC按钮
	if (oEvent.keyCode === 27 && (document.getElementById("dialog") != undefined)) {
		fnClose();
		
	if (document.getElementById("postEmotion_menu") != undefined) {
		var div = document.getElementById("postEmotion_menu");
		div.parentNode.removeChild(div);
		}
	
	if (document.getElementById("cc98Emotion_menu") != undefined) {
		var div = document.getElementById("cc98Emotion_menu");
		div.parentNode.removeChild(div);
		}
	}
	
	
	
}

//给我说按钮添加监听函数
//var oButton = document.getElementById("say_button");
//oButton.addEventListener("click", oButton_Click, false);

// 创建快速引用
function createFastQuote(ele)
{
	// 创建快速引用
	var oFastQuote = document.createElement("a");
	oFastQuote.id = "fastQuote";
	oFastQuote.href = ele.href;
	var picFastQuote = document.createElement("img");
	picFastQuote.id = "picFastQuote";
	picFastQuote.border = "0";
	picFastQuote.align = "absmiddle";
	picFastQuote.alt = "快速引用";
	picFastQuote.src = "http://file.cc98.org/uploadfile/2010/4/11/2201680240.png";
	oFastQuote.addEventListener(
		"click",
		function (event)
		{
			event.preventDefault();
			if(event.button == 0)
			{
				if (document.getElementById("dialog") == undefined)
				{
					fnShow();
				}

				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: oFastQuote.href,
					onload: function(responseDetails)
					{
						addQuoteContent(getQuote(responseDetails.responseText),oFastQuote.href);
					}
				});
			}
		},
		false);
	oFastQuote.appendChild(picFastQuote);

	//ele.parentNode.insertBefore(oFastQuote,ele.nextSibling);
	ele.parentNode.appendChild(oFastQuote);
}

function html2ubb(rawhtml)
{
	var ubb = rawhtml;//.replace(/(<i>)+/g,"<i>").replace(/(<\/i>)+/g,"</i>").replace(/(<b>)+/g,"<b>").replace(/(<\/b>)+/g,"</b>");
	ubb = ubb.replace(/<i>(.*?)<\/i>/g,"[i]$1[/i]").replace(/<b>(.*?)<\/b>/g,"[b]$1[/b]").replace(/<br>/g,"\n");
	return ubb;
}

function getUbb(ref,userName,postTime)
{
	var tmpUrl = ref.toLowerCase();
	var boardid = tmpUrl.match(/boardid=([^&]*)/)[1];
	var id = tmpUrl.match(/&id=([^&]*)/)[1];
	var page = tmpUrl.match(/&star=([^&]*)/)[1];
	var postUrl = "http://www.cc98.org/dispbbs.asp?boardid="+boardid+"&id="+id+"&star="+page;
	var floor = tmpUrl.match(/&bm=([^&]*)/)[1];
	var ubb = null;

	console.log("testingetUbb");

	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: postUrl,
		onload: function(responseDetails)
		{
			var rawhtml = responseDetails.responseText;
			var pattern = /	<span id="ubbcode[^>]*>(.*)<\/span>/ig;
			if (floor == 0)
			{
				floor = 10;
			}
			floor--;
			var ubb = rawhtml.match(pattern)[floor];
			ubb = ubb.match(/	<span id=[^>]*>(.*)<\/span>/)[1];
			ubb = ubb.replace(/<br>/ig,"\n");
			var finalUbb = "[quote][b]以下是引用[i]"+userName+"在"+postTime+"[/i]的发言：[/b]\n"+ubb+"[/quote]\n";
			addQuoteContent(finalUbb,ref);
		}
	});
}

function setMultiQuote(ele)
{
	var aMultiQuote = document.createElement('a');
	aMultiQuote.id = 'MultiQuote';
	aMultiQuote.href = ele.href;
	var picMultiQuote = document.createElement('img');
	picMultiQuote.border = '0';
	picMultiQuote.align = 'absmiddle';
	picMultiQuote.src = 'http://file.cc98.org/uploadfile/2010/5/12/9395977181.png';
	picMultiQuote.style.marginLeft = '8px';
	aMultiQuote.addEventListener
	(
		'click',
		function (event)
		{
			event.preventDefault();
			if (event.button == 0)
			{
				if (!document.getElementById("dialog"))
				{
					fnShow();
				}

				
				//var finalQuote = "[quote][b]以下是引用[i]";

				var postTable = ele.parentNode.parentNode.parentNode.parentNode.parentNode;
				var userTable = postTable.parentNode;

				var userName = userTable.innerHTML.match(/<span style="color:\s*\#\w{6}\s*;"><b>([^<]+)<\/b>/)[1];
                console.log(userName);
				userName = userName.replace("匿名\d+", "匿名")
				//var postTime = postTable.parentNode.parentNode.childNodes[3].innerHTML.match(/(\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}\:\d{2}\:\d{2})/)[1];
				var postTime = postTable.parentNode.parentNode.childNodes[3].innerHTML.match(/(\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}\:\d{2}\:\d{2})/)[1];				
				/*
				finalQuote += userName;
				finalQuote += "在";
				finalQuote += postTime;
				finalQuote += "[/i]的发言：[/b]\n"

				var postContentTable = postTable.lastChild.childNodes[1].lastChild.firstChild.childNodes[1].childNodes[5];
				var userContent = postContentTable.innerHTML.replace(/<div .*<\/div>/,"");
				userContent = html2ubb(userContent);
				if (userContent == "")
				{
					userContent = "&nbsp;";
				}

				if (postContentTable.firstChild.localName == 'div')	// quote
				{
					var quoteContenttd = postContentTable.firstChild;
					//alert(quoteContenttd.innerHTML);
					// get its quotes
					var quoteTitle = quoteContenttd.innerHTML.match(/<div style\=[^>]*>(<b>)+(.*?)(<\/b>)/)[2];
					//alert(quoteTitle);
					quoteTitle = quoteTitle.replace(/<i>(.*?)<\/i>/,"[i]$1[/i]");
					var quoteContent = quoteContenttd.innerHTML.match(/<div style=\"[^>]*>(.*)<\/div>/)[1];
					//alert(quoteContent);
					quoteContent = quoteContent.replace(/(<\/div>)+/,"</div>").replace(/<\/div><div/g,"</div");
					
					var pattern = /<\/div.*?>(.+)/;
					if (pattern.exec(quoteContent))
					{
						quoteContent = quoteContent.match(pattern)[1];
					}
					else
					{
						quoteContent = quoteContent.match(/<b>.*?<\/b>(.*)/)[1];
					}
					
					// 替换为ubb
					//quoteContent = quoteContent.replace(/<i>(.*?)<\/i>/g,"[i]$1[/i]").replace(/<b>(.*?)<\/b>/g,"[b]$1[/b]").replace(/<br>/g,"\n");
					quoteContent = html2ubb(quoteContent);
					//alert(quoteContent);
					quoteContent = quoteTitle + "[/b]\n" + quoteContent;
					finalQuote += ("[quote][b]"+quoteContent+"[/quote]");
					//alert(quoteContent);
				}
				
				// 替换为ubb
				finalQuote += userContent;
				finalQuote += "[/quote]";
				*/
				getUbb(aMultiQuote.href,userName,postTime);
				
				//addQuoteContent(finalQuote,aMultiQuote.href);
				//addReplyText(finalQuote);
				//scrollToPageEnd();
			}
		},
		true
	);
	aMultiQuote.appendChild(picMultiQuote);
	ele.parentNode.appendChild(aMultiQuote);
}

// 插入快速引用图标和多重引用图标
var refLinks = xpath("//a[contains(@href, 'reannounce.asp')]");
for(var i = 1; i < refLinks.snapshotLength; i++)
{
	var ele = refLinks.snapshotItem(i)//.wrappedJSObject;
	if (ele.href.indexOf("setfilter") !== -1) continue;
	createFastQuote(ele);
	setMultiQuote(ele);
}


//给页面添加键盘监听函数
document.addEventListener('keydown', fnHotKey, true);

//给Scroll监听
//document.addEventListener('scroll', lieMiddle, true);

//监听Click事件 点击div外退出
document.addEventListener('click', 
					  function (evt) {
						  if (simpleDialog == null)
						  {
							  if (
								   (evt.target != document.getElementById("mb_text")) && 
								   (evt.target != document.getElementById("mb_submit")) && 
								   (evt.target != document.getElementById("mb_title")) &&
								   (document.getElementById("dialog") != undefined) 
							  )
								  fnClose();
						  }
						  else
 						  {
							  if (
								   (document.getElementById("postEmotion_menu") != undefined) &&
								   (evt.target != document.getElementById("postEmotion_menu")) &&
								   (evt.target != document.getElementById("ajaxReplyTitle"))
							  )
							  {
								  var div = document.getElementById("postEmotion_menu");
								  div.parentNode.removeChild(div);
							  }
						  }
					  }
			, true);

//给文本框添加键盘监听函数  不需要了
/* var oTextarea = document.getElementById("mb_text");
oTextarea.addEventListener('keydown', fnHotKey, true); */

 function DoWithUpload()
 {
  var txtcontent = document.getElementById("content");
  if (txtcontent == null)
   return;

  if (txtcontent.getAttribute("modified") == undefined)
  {
   txtcontent.setAttribute("modified","true");
  }
  else if (txtcontent.getAttribute("modified") == "true")
  {
   return;
  }
  
  txtcontent.addEventListener(
   "input",
   function (textEvent)
   {
    var textarea = document.getElementById("content")
    if (textarea.value.length != 0)
    {
     //alert("change");
     if (document.getElementById("mb_text") != undefined)
     {
      document.getElementById("mb_text").value += textarea.value;
      textarea.value = "";
     }
    }
   },
   false
  );

  txtcontent.addEventListener(
   "blur",
   function (event)
   {
    var textarea = document.getElementById("content");
    if (textarea.value.length != 0)
    {
     if (document.getElementById("mb_text") != undefined)
     {
      document.getElementById("mb_text").value += textarea.value;
      textarea.value = "";
     }
    }
   },
   false
  );
 }
 