// ==UserScript==
// @name		nicodanmakudic
// @namespace	22century.cute.bz
// @description nicovideo danmaku dictionary.
// @include		http://*.nicovideo.jp/watch/*
// ==/UserScript==

var danmaku_json = GM_getValue("danmaku_json", "");
var danmaku = (!danmaku_json) ? defaultList() : eval(danmaku_json);
var flvp = new flvplayer();
var ctrl = new controler();
var __add = false;

ctrl.reload(danmaku);
ctrl.edit(false);

addEvent(ctrl.opSub ,"click",function(){
	ctrl.menu.style.display = "block";
	ctrl.opSub.style.display = "none";
});

addEvent(ctrl.endSub,"click",function(){
	ctrl.menu.style.display = "none";
	ctrl.opSub.style.display = "block";
});

addEvent(ctrl.addSub,"click",function(){
	__add = true;
	flvp.clear();
	ctrl.clear();
	ctrl.edit(true);
	ctrl.area.focus();
});

addEvent(ctrl.repSub,"click",function(){
	__add = false;
	var i = ctrl.select.selectedIndex;
	flvp.clear();
	ctrl.area.value = danmaku[i].text;
	ctrl.command.value = danmaku[i].command;
	ctrl.edit(true);
	ctrl.area.focus();
});

addEvent(ctrl.delSub,"click",function(){
	if (confirm("削除しますか？")) 
	{
		if (danmaku.length!=0) {
			danmaku.splice(ctrl.select.selectedIndex, 1);
		}
		if (danmaku.length==0) {
			if (confirm("辞書を初期化しますか？")) { danmaku = defaultList(); }
		}
		ctrl.reload(danmaku);
		GM_setValue("danmaku_json",danmaku.toSource());
	}
	ctrl.edit(false);
});

addEvent(ctrl.okSub,"click",function(){
	var text = trim(ctrl.area.value);
	var cmd  = trim(ctrl.command.value);
	var i = ctrl.select.selectedIndex;
	if (text!="") {
		if (__add) {
			text = text.replace(/(?:\r\n|\r|\n)/g, "\u000A");
			danmaku.push({"command":cmd,"text":text});
		} else {
			danmaku[i].command = cmd;
			danmaku[i].text = text;
		}
		ctrl.reload(danmaku);
		GM_setValue("danmaku_json",danmaku.toSource());
	}
	ctrl.clear();
	ctrl.edit(false);
});

addEvent(ctrl.ngSub,"click",function(){
	ctrl.clear();
	ctrl.edit(false);
});

addEvent(ctrl.select,"click", function(){
	var i = ctrl.select.selectedIndex;
	if (danmaku.length!=0) {
		flvp.addChat(danmaku[i].text);
		flvp.addCommand(danmaku[i].command);
	}
});


//--------------------


function flvplayer()
{
	this.body = id("flvplayer");
	this.addChat = function(e){
		this.body.wrappedJSObject.SetVariable("ChatInput.text",e)
	}
	this.addCommand = function(e){
		this.body.wrappedJSObject.SetVariable("inputArea.MailInput.text",e)
	}
	this.clear = function(){
		this.addChat("");
		this.addCommand("");
	}
	return this;
}

function controler()
{
	var footer = id("WATCHFOOTER");
	var body  = document.createElement("div");
	var menu  = createChild( body, "div" );
	var table = createChild( menu, "table" );
	var tbody = createChild( table, "tbody" );
	var tr  = createChild( tbody, "tr" );
	var td1 = createChild( tr, "td" );
	var td2 = createChild( tr, "td" );
	var td3 = createChild( tr, "td" );
	var td4 = createChild( tr, "td" );
	
	footer.insertBefore( body, footer.firstChild );
	td3.style.display = "none";
	td4.style.display = "none";
	td4.style.textAlign = "right";
	body.id = "d3oqPsX0";
	menu.style.display = "none";
	
	this.menu = menu;
	this.select = createChild( td1, "select" );
	this.select.size = 3;
	this.select.multiple = false;
	this.addSub = createChild( td2, "input" );
	this.addSub.type  = "submit";
	this.addSub.className = "submit";
	this.addSub.value = "追加";
	this.endSub = cloneChild( td2, this.addSub );
	this.endSub.value = "閉じる";
	createChild( td2, "br" );
	this.repSub = cloneChild( td2, this.addSub );
	this.repSub.value = "編集";
	this.delSub = cloneChild( td2, this.addSub );
	this.delSub.value = "削除";
	this.opSub = cloneChild( body, this.addSub );
	this.opSub.value = "辞書を開く";
	this.area = createChild( td3, "textarea" );
	this.area.rows = 2;
	this.area.cols = 40;
	this.label = createChild( td4, "input" );
	this.label.type = "text";
	this.label.value = "コマンド：";
	this.label.readlonly = true;
	this.label.style.cssText = "width:50px;border:none;background:none;";
	this.command = createChild( td4, "input" );
	this.command.type = "text";
	this.command.className = "text";
	createChild( td4, "br" );
	this.okSub = cloneChild( td4, this.addSub );
	this.okSub.value = "決定";
	this.ngSub = cloneChild( td4, this.okSub );
	this.ngSub.value = "中止";

	this.edit = function(e) {
		var has = (this.select.selectedIndex!=-1) ? true : false;
		this.select.disabled = e;
		this.addSub.disabled = e;
		this.repSub.disabled = (has) ? e : true;
		this.delSub.disabled = (has) ? e : true;
		this.endSub.disabled = e;
		td3.style.display = e ? "" : "none";
		td4.style.display = e ? "" : "none";
	};

	this.reload = function(e) {
		var len = e.length;
		var option, cmdhead;
		this.select.innerHTML = "";
		for (var i=0; i < len; i++) {
			option = createChild( this.select, "option" );
			cmdhead = (e[i].command!="") ? "("+e[i].command+") " : "";
			option.value = e[i].command;
			option.text  = cmdhead +""+ e[i].text;
		}
		if (len) {
			this.select.firstChild.selected = true;
		}
	};
	this.clear = function() {
		this.area.value = "";
		this.command.value = "";
	}
	return this;
}

function defaultList() {
	return new Array(
		{ "command" : ""      , "text" : "┗(^o^ )┓三┗(^o^ )┓三┗(^o^ )┓三" },
		{ "command" : ""      , "text" : "┗(^o^)┛☆パーン" },
		{ "command" : ""      , "text" : "イﾞエエエエエエエ！(ﾟ∀。)┛" },
		{ "command" : ""      , "text" : "もうほんっとにビックリした！" },
		{ "command" : ""      , "text" : "わ ずかな 時間 を 見つけて" },
		{ "command" : "red"   , "text" : "こんばんわー―！！こんばんわー―！！" },
		{ "command" : "yellow", "text" : "ダブル☆オドロキ" },
		{ "command" : "blue"  , "text" : "面白かったね！" },
		{ "command" : "big red"   , "text" : "ありえね～" },
		{ "command" : "big yellow", "text" : "マハーロー" },
		{ "command" : "big blue"  , "text" : "シャバダバッダバッダ FOO！" },
		{ "command" : ""      , "text" : "┗(∵　)┳(^o^)┳(∵　)┓\u000A　　┏┗　　┗┗　 ┏┗　　三" }
	);
}

GM_addStyle(<><![CDATA[
	#d3oqPsX0 {margin:5px;}
	#d3oqPsX0 select {width:350px;margin-right:5px;}
	#d3oqPsX0 textarea {height:100%;font:normal 10pt 'sans-serif';}
	#d3oqPsX0 table {border:1px solid #ccc;padding:3px;}
	#d3oqPsX0 label {cursor:text;font-size:10pt;}
	#d3oqPsX0 input {border:solid 1px #ccc;vertical-align:top;width:60px;margin:2px;}
	#d3oqPsX0 input.text {width:80px;}
	#d3oqPsX0 input.submit {cursor:pointer;background:url('/img/btn/bg_submit_01.gif') repeat-x scroll;}
]]></>);

function id(n){return document.getElementById(n)}
function createChild(p,e){var c=document.createElement(e);p.appendChild(c);return c}
function cloneChild(p,e){var c=e.cloneNode(e);p.appendChild(c);return c}
function trim(v){return v.replace(/^\n+|\n+$/g, "")};
function addEvent(e,k,f){e.addEventListener(k,f,false)};