// ==UserScript==
// @name           tieba_float_editor
// @description    百度贴吧悬浮编辑窗
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/i/*
// @exclude        http://tieba.baidu.com/f/like*
// @exclude        http://tieba.baidu.com/club/*
// @exclude        http://tieba.baidu.com/shipin/*
// @exclude        http://tieba.baidu.com/bakan*
// @exclude        http://tieba.baidu.com/daquan*
// @exclude        http://tieba.baidu.com/f/tupian*
// @exclude        http://tieba.baidu.com/tb/*
// @exclude        http://tieba.baidu.com/*postBrowserBakan*
// @updateURL      https://userscripts.org/scripts/source/150946.meta.js
// @downloadURL    https://userscripts.org/scripts/source/150946.user.js
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2013.6.8.0
// ==/UserScript==

var replyCss = "";
replyCss += "#edit_parent .tb-editor-toolbar>span{width:30px !important;}";
replyCss += ".idisk{margin-right:16px !important;}";
replyCss += ".editor_banned_tip_info{position:relative; top:-80px !important;}";
replyCss += ".pt_submit{padding:0 !important; margin:0 !important;}";
replyCss += ".tb-editor-wrapper>.tb-editor-overlay{position:absolute;}";
replyCss += ".insertsmiley_holder>.tb-editor-overlay{ position:relative !important; top:-360px !important;}";
replyCss += "#signNameWrapper{margin:0px 0px -2px 0px !important;}";
replyCss += "#footer,.new_tiezi_tip,.subTip,.e_inter_wrapper,td[valign='top'],#edit_parent>table>tbody>tr>td:first-child,.wapapp_adv{display:none !important;}";
replyCss += ".editor_users{padding:0 !important; margin:0px !important;}";
replyCss += ".subbtn_bg_hover{margin-right:5px !important; height:26px !important; line-height:26px !important;}";
replyCss += ".sfloatEditor{padding-bottom:1px !important; border:3px double grey; width:360px; position:fixed !important; bottom:-30px !important; left:500px !important;z-index:998 !important;background-color:#E7EAEB}";
replyCss += ".floatEditor{padding-bottom:1px !important; border:3px double grey; width:635px; position:fixed !important; bottom:-30px !important; left:500px !important;z-index:998 !important;background-color:#E7EAEB}";
replyCss += "#OaCbutton{display:none;}#panel,#iColorPicker{position:fixed;bottom:0;left:500px}";
//replyCss += "#edit_parent .tb-editor-editarea{height:240px !important;}";//此句用于固定编辑窗高度，需要的话，取消最前面的//。
GM_addStyle(replyCss);

var smallEditorCss = "";
smallEditorCss += "body{margin-bottom:260px !important;}";
smallEditorCss += "#edit_parent .tb-editor-toolbar,#signNameWrapper,.pt_submit,#edit_parent tr:nth-child(3),.pt_submit,#edit_parent tr:nth-child(4),#edit_parent tr:nth-child(5),#edit_parent tr:nth-child(6),#edit_parent tr:nth-child(7),#edit_parent tr:nth-child(8){display:none !important;}";
smallEditorCss += "#edit_parent *{max-width:360px !important;}";
smallEditorCss += ".tb-editor-editarea{max-height:266px !important; min-height:24px !important;}";
smallEditorCss += ".edit_title_field{padding:0px !important; margin:0px 0px -5px 0px !important;}";

var normalEditorCss = "";
normalEditorCss += "body{margin-bottom:360px !important;}";
normalEditorCss += "#edit_parent *:not(.ffs_s_tab_content):not(.s_tab_content){max-width:635px !important}";
normalEditorCss += ".tb-editor-editarea{max-height:266px !important; min-height:50px !important;}";
normalEditorCss += ".edit_title_field{padding:0px 3px!important; margin:0px 0px -5px 0px !important;}";

function openOrclose(e) {
	if(window.getSelection()!=""){
		return;
	}else{
		if (document.getElementById("OaCbutton").getAttribute("status") == "close") {
			document.getElementById("floatEditorCSS").innerHTML = normalEditorCss;
			document.getElementById("edit_parent").setAttribute("class", "floatEditor");
			document.getElementById("OaCbutton").setAttribute("status", "open");
			document.querySelector("#edit_parent .tb-editor-editarea").removeAttribute("title");
			return;
		}
		if (document.getElementById("OaCbutton").getAttribute("status") == "open") {
			document.getElementById("floatEditorCSS").innerHTML = smallEditorCss;
			document.getElementById("edit_parent").setAttribute("class", "sfloatEditor");
			document.getElementById("OaCbutton").setAttribute("status", "close");
			return;
		}
	}
}

var OaCbutton = document.createElement("span");
OaCbutton.id = "OaCbutton";
OaCbutton.setAttribute("status", 'close');
OaCbutton.innerHTML = "";
document.getElementById("edit_parent").parentNode.insertBefore(OaCbutton, document.getElementById("edit_parent"));

document.getElementById("edit_parent").setAttribute("class", "sfloatEditor");//初始缩态

var floatEditorCSS = document.createElement("style");
floatEditorCSS.id = "floatEditorCSS";
floatEditorCSS.type = "text/css";
floatEditorCSS.innerHTML = smallEditorCss;
document.head.appendChild(floatEditorCSS);

var editorInputCSS = document.createElement("style");
editorInputCSS.id = "editorInputCSS";
editorInputCSS.type = "text/css";
editorInputCSS.innerHTML = "#title1{display:none !important;}";
document.head.appendChild(editorInputCSS);

function inputDon(){
	document.head.removeChild(document.getElementById("editorInputCSS"));
	document.querySelector("#edit_parent .tb-editor-editarea").removeEventListener("click", inputDon, false);
}

document.querySelector("#edit_parent .tb-editor-editarea").setAttribute("title", "单击可展开标题栏，双击可展开或缩小编辑窗口。");
document.querySelector("#edit_parent .tb-editor-editarea").removeAttribute("style");
document.querySelector("#edit_parent .tb-editor-editarea").addEventListener("dblclick", openOrclose, false);
document.querySelector("#edit_parent .tb-editor-editarea").addEventListener("click", inputDon, false);

//调整编辑工具弹出位置
var bottwidth=document.getElementById("title1")?-30:0;
var upSavewid=document.getElementById("title1")?63:33;
document.querySelector(".image:not(.open)").addEventListener("click", function(){GM_addStyle(".tb-editor-wrapper>.tb-editor-overlay:not(.idisk_holder){top:" + (bottwidth + Math.min(upSavewid,document.querySelector("#edit_parent").clientHeight-420)) + "px !important; left:10px !important;}")}, false);
document.querySelector(".flash:not(.open)").addEventListener("click", function(){GM_addStyle(".tb-editor-wrapper>.tb-editor-overlay:not(.idisk_holder){top:" + (bottwidth + Math.min(upSavewid,document.querySelector("#edit_parent").clientHeight-160)) + "px !important; left:20px !important;}")}, false);
document.querySelector(".music:not(.open)").addEventListener("click", function(){GM_addStyle(".tb-editor-wrapper>.tb-editor-overlay:not(.idisk_holder){top:" + (bottwidth + Math.min(upSavewid,document.querySelector("#edit_parent").clientHeight-405)) + "px !important; left:30px !important;}")}, false);
document.querySelector(".smiley:not(.open)").addEventListener("click", function(){GM_addStyle(".tb-editor-wrapper>.tb-editor-overlay:not(.idisk_holder){top:" + (bottwidth + Math.min(upSavewid,document.querySelector("#edit_parent").clientHeight-360)) + "px  !important; left:80px !important;}")}, false);
document.querySelector(".picasso:not(.open)").addEventListener("click", function(){GM_addStyle(".tb-editor-wrapper>.tb-editor-overlay:not(.idisk_holder){top:" + (bottwidth + Math.min(upSavewid,document.querySelector("#edit_parent").clientHeight-375)) + "px !important; left:50px !important;}")}, false);

//兼容复杂取色器之图片化脚本
if(document.querySelector("#colorPreview,#panel")){
	document.querySelector("#colorPreview,#panel").removeAttribute("style");
}
