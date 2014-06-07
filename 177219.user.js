// ==UserScript==
// @id             9adb84aba536@scriptish
// @name           BaiDuYun_Add_Offline
// @version        1.2.9
// @namespace      9adb84aba536@scriptish
// @author         zklhp
// @description
// @include        http://pan.baidu.com/disk/*
// @updateURL      http://userscripts.org/scripts/source/177219.user.js
// @downloadURL    http://userscripts.org/scripts/source/177219.user.js
// @run-at         document-end
// ==/UserScript==

var urls = [];
var success = [];	// true: success, false: fail.
var div_content = "";
var i = 0;
var fontred = '<font color="red">';
var fontgreen = '<font color="green">';
var fontclose = '</font>';

function send_urls()
{
	setTimeout(function () {
		var data_to_send = "method=add_task&app_id=250528&source_url=";
		data_to_send += encodeURIComponent(urls[i]);
		data_to_send += "&save_path=";
		data_to_send += encodeURIComponent(document.querySelector('input#Path').value);
		GM_xmlhttpRequest({
			method: 'POST',
			url: "http://pan.baidu.com/rest/2.0/services/cloud_dl?bdstoken=" + unsafeWindow.FileUtils.bdstoken,
			synchronous: false,
			data: data_to_send,
			headers:
			{
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			onload: function (response) {
				GM_log([
					response.status,
					response.statusText,
					response.readyState,
					response.responseHeaders,
					response.responseText,
					response.finalUrl
				].join("\n"));
				if (response.status == '200')
				{
					success[i] = true;
				}
				else
				{
					success[i] = false;
				}
				var tmp = "";
				var k = 0
				for (k = 0; k <= i; k++)
				{
					if (success[k])
					{
						tmp += fontgreen;
					}
					else
					{
						tmp += fontred;
					}
					tmp += urls[k];
					tmp += fontclose;
					tmp += '<br>';
				}
				for (k = i + 1; k < urls.length; k++)
				{
					tmp += urls[k];
					tmp += '<br>';
				}
				document.querySelector('div#Float_edit').innerHTML = "";
				document.querySelector('div#Float_edit').innerHTML = tmp;
				i++;
				if (i < urls.length)
				{
					send_urls();
				}
				else
				{
					alert("\u5B8C\u6210");
					// document.body.removeChild(document.querySelector('div#Main_frame'));
				}
			}
		});

	}, 50);
}

function add()
{
	urls = [];
	success = [];
	i = 0;
	div_content = document.querySelector('div#Float_edit').innerHTML;
	//remove <strong></strong><font color="red"><font color="green"></font>
	div_content.replace(/\<.*strong.*\>/g, "");
	div_content.replace(/\<.*font.*\>/g, "");
	document.querySelector('div#Float_edit').innerHTML = div_content;
	urls = div_content.split('<br>');
	send_urls();
}

(function ()
{
	var ul_to_select = document.querySelector('ul.b-list-2.bar-cmd-list');
	var li_to_add = document.createElement('li');
	li_to_add.className = "b-list-item";
	var a_to_add = document.createElement('a');
	a_to_add.className = "icon-btn-download";
	a_to_add.text = "\u6279\u91CF\u4E0B\u8F7D";
	a_to_add.onmousedown = function() {show_add_div()};
	ul_to_select.appendChild(li_to_add);
	li_to_add.appendChild(a_to_add);
}) ();

function show_add_div()
{
	var div = document.createElement('div');
	div.id = 'Main_frame';
	div.innerHTML = '<div id="Main_float">'
		+'<div id="Float_edit" contentEditable="true">'
		+'</div></div>'
		+'<div id="Setting"><span>\u8DEF\u5F84\u5E94\u8BE5\u662F\u5FC5\u987B\u5B58\u5728<input id="Path" type="text" onkeydown="if(event.keyCode==13) return false;"></input></span></div>'
		+'<div id="Button"><span id="YesBtn" class="fff">\u5F00\u59CB</span><span id="NoBtn" class="fff">\u53D6\u6D88</span></div></div>';
	document.querySelector('body.flag-1').appendChild(div);
	var div_css = '\
	#Main_float\
	{\
		margin:auto;\
		width:90%;\
		height:90%;\
		background:#F9EED0;\
		border:solid #DFDFDF 10px;\
	}\
	#Float_edit\
	{\
		margin:auto;\
		border:none !important;\
		overflow:auto;\
  		width: 100%;\
  		height: 100%;\
  		font-size:25px;\
		text-align:left;\
  		color:black;\
 	}\
	#Main_frame\
	{\
		text-align:center;\
  		position: fixed;\
  		bottom: 25%;\
  		left: 25%;\
  		width: 50%;\
  		height: 50%;\
  		z-index: 10086;\
  		background: lavender !important;\
  		opacity:.9;\
 	}\
	#Button\
	{\
		margin:auto;\
		height:50px;\
		display:block;\
		cursor:pointer;\
  		background: lavender !important;\
	}\
	#Button span\
	{\
		position:relative;\
		top:10%;\
		margin-right:10px;\
		font-size:30px;\
		border:1px solid grey;\
		width:50px;\
		height:50px;\
	}\
	#Setting\
	{\
		margin:auto;\
		height:40px;\
		display:block;\
		cursor:pointer;\
  		background: lavender !important;\
	}\
	#Setting span\
	{\
		position:relative;\
		top:10px;\
		font-size:20px;\
		width:40px;\
		height:40px;\
	}\
	#Setting input\
	{\
		color:green;\
		font-size:20px;\
		left:20px;\
	}';
	GM_addStyle(div_css);
	document.querySelector('span#NoBtn.fff').onmousedown = function () {document.body.removeChild(document.querySelector('div#Main_frame'));};
	document.querySelector('span#YesBtn.fff').onmousedown = function () {add();};
	document.querySelector('input#Path').value = "/";
}
