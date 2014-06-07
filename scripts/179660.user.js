// ==UserScript==
// @name      NGA[艾泽拉斯国家地理论坛] 论坛增强插件   控制中心
// @namespace  http://ngaplugin.googlecode.com/svn/ngaplug/command.js
// @version    0.1
// @description  may do the job right
// @match     http*://bbs.ngacn.cc/*
// @include    http*://bbs.ngacn.cc/*
// @grant       none
// @copyright  Nga is watching You
// ==/UserScript==

// ================================================================================
// NGA[艾泽拉斯国家地理论坛] 论坛增强插件   控制中心
// 作者：LinTx 莉诺雅羽月 虚空之魂@ngacn
// integrated viewing fix by https://plus.google.com/102694498801052052085
// repacked by bladedai@ngacn
// ================================================================================
var nga_plug_control_table_s = [];
var nga_plug_control_version = "2.0";
loader.css("http://ngaplug.googlecode.com/svn/ngaplug/css.css");  //加载CSS
//全局函数：给一个有ID的元素绑定事件以使点击该元素外的区域隐藏该元素
//注意：需要在弹出菜单的触发链接或者按钮的onclick里面加  event.cancelBubble = true;   这是禁止冒泡的语句，如果该链接或者按钮需要点击后触父元素的某些事件请勿使用该方法
//不加上面的语句会使弹出窗口永远不能显示
function nga_plug_HideDomOfClick(id){
	var DomEl = document.getElementById(id);
	if (navigator.appVersion.indexOf("MSIE") != -1){   //绑定click事件 IE用attachEvent
		DomEl.attachEvent("onclick",function(event){event.cancelBubble = true;});
		document.attachEvent("onclick", function(){DomEl.style.display = "none";});
	}else{   // 非IE用addEventListener
		DomEl.addEventListener("click",function(event){event.cancelBubble = true;},false);
		document.addEventListener("click", function(){DomEl.style.display = "none";}, false);
	}
}
//  全局函数：获取元素相对于页面的绝对坐标
function nga_plug_elementLeft(e){
	try{
		var offset = e.offsetLeft;
		if(e.offsetParent != null) offset += nga_plug_elementLeft(e.offsetParent);
		return offset;
	}catch(e){};
}
function nga_plug_elementTop(e){
	try{
		var offset = e.offsetTop;
		if(e.offsetParent != null) offset += nga_plug_elementTop(e.offsetParent);
		return offset;
	}catch(e){};
}   //获取元素坐标函数结束

//  全局函数：添加一个TAB（例子：本插件生成的回帖输入框【包括上面的“编辑”和“预览”】）
//  使用方法：var x = new nga_plug_tab();    x是你的变量
//            x.add(TAB栏内容[标题],正文栏HTML代码);    如：  x.add("编辑","<div>aaaaaaaaaaaa</div>");
//            add可以多次调用，调用一次即给TAB添加一个选项
//            obj.innerHTML = x.gethtml();      obj是一个页面元素，此行代码表示将这个TAB设置为obj的内容
function nga_plug_tab(){
	this.data = [];
}
nga_plug_tab.prototype.add = function(title,html,isopen){
	if (isopen && this.data.length > 0){
		for (var i=0;i<this.data.length;i++){
			this.data[i][2] = false;
		}
	}
	if (this.data.length == 0) isopen = true;
	this.data.push([title,html,isopen]);
}
nga_plug_tab.prototype.gethtml = function(){
	var s = "";
	s += '<div class="nga_plug_tab" >\
	<div class="nga_plug_tab_menu_box" onload="nga_plug_tab_setTabList(this,\'load\')"> \
		<ul class="nga_plug_tab_menu"> \
			<li class="none" style="width:20px;" onclick="nga_plug_tab_setTabList(this.parentNode,\'l\')"><span><a href="javascript:void(0)"><-</a></span></li>';
	for (var i=0;i<this.data.length;i++){
		s += '<li class="';
		s += this.data[i][2]?'nga_plug_tab_menu_open':'nga_plug_tab_menu_close';
		s += '" onclick="nga_plug_tab_setTab(this,'+ i +')"><span><a href="javascript:void(0)">' + this.data[i][0] + '</a></span></li>';
	}
	s += '	<li class="none" style="width:20px;" onclick="nga_plug_tab_setTabList(this.parentNode,\'r\')"><span><a href="javascript:void(0)">-></a></span></li>\
		</ul>\
		<div class="nga_plug_tab_main">';
	for (var i=0;i<this.data.length;i++){
		s += '<div class="nga_plug_tab_pan"';
		if (this.data[i][2]) s += ' style="display:inline"'
		s += '>' + this.data[i][1] + '</div>';
	}
	s += '</div>\
		</div>\
		<img src="about:blank" style="display:none" onerror="nga_plug_tab_setTabList(this.parentNode,\'load\')">\
		</div>';
		//
	return s;
}    //添加TAB函数结束

//AJAX函数，调用方法：new nga_plug_XMLHttp(url,func,arg)   其中，url应为string类型的变量或者字符串，func应为一个函数名，arg为func的第二个参数，可以传递一些ID之类的东西。
//例子1：new nga_plug_XMLHttp("http://bbs.ngacn.cc/thread.php?fid=-7",bbb);  function bbb(a){}
//例子2：var aaa="http://bbs.ngacn.cc/thread.php?fid=-7"; new nga_plug_XMLHttp(aaa,bbb,{id:1,check:true});  function bbb(a,arg){}
//上述例子中的bbb函数的参数a会接收ajax的返回值
function nga_plug_XMLHttp(url,func,arg){
	if(window.ActiveXObject){
		this.ajax=new ActiveXObject("Microsoft.XMLHTTP");
	}else if(window.XMLHttpRequest){
		this.ajax=new XMLHttpRequest();
	}
	if(this.ajax!=null){
		this.ajax.open("get",url,true);
		this.ajax.onreadystatechange=httpStateChange;
		this.ajax.overrideMimeType("text/html;charset=gbk");
		this.ajax.send(null);
	}
	this.func = func;
	this.arg = arg;
	var this_ = this;
	function httpStateChange(){
		//当指定XMLHttpRequest为异步传输时(false),发生任何状态的变化，该对象都会调用onreadystatechange所指定的函数
		if(this_.ajax.readyState == 4){  //XMLHttpRequest处理状态，4表示处理完毕
			if(this_.ajax.status == 200){ //服务器响应的HTTP代码，200表示正常
				this_.func(this_.ajax.responseText,this_.arg);
			}
		}
	}
}


//  全局函数：保存、读取设置模块（使用此模块保存的数据存储于本地数据localStorage中）
//  使用方法：var x = nga_plug_local_data("key");    初始化   x是你的变量  key是保存在本地数据中的key（即使用localStorage.key可读取数据的key，不可与其他插件相同）
//            x.save(data)     保存数据data到本地存储中，data可以是任意数据类型（包括但不限于字符串、数值、数组、对象等）
//                             如不带入data参数则直接把x.data保存到本地数据中（可以使用x.data=先修改x.data的数据，然后直接使用x.save()保存）
//            x.load()         读取数据，把数据从本地存储中读取出来
//            x.data           在其他地方调用已经读取出来的数据
//     注意：save方法和load方法后面必须加括号，调用data数据不要加括号
function nga_plug_local_data(dataname){
	this.dataname = dataname;
}
nga_plug_local_data.prototype.save = function(data){
	if (data != null){
		this.data = data;
	}
	localStorage[this.dataname] = JSON.stringify(this.data);
}
nga_plug_local_data.prototype.load = function(){
	for (var key in localStorage){
		if (key==this.dataname){
			try{
				this.data = JSON.parse(localStorage[key]);
			}catch(e){
				this.data = null;
			}
			return true;
		}
	}
	return false;
}    //保存、读取设置模块结束

//  给控制台添加一个项目，调用方法：nga_plug_table_addTab(标题,项目HTML代码)
function nga_plug_table_addTab(title,divhtml){
	var ttable=document.getElementById("nga_plug_control_table");
	if (ttable){
		var ttd0=ttable.rows[1].cells[0];
		var ttd1=ttable.rows[1].cells[1];
		ttd0.getElementsByTagName("div")[0].innerHTML += '<span class="nga_plug_table_left_span" onclick="nga_plug_table_setTab(this)" onmouseover="this.style.background=\'#e5d5b0\'" onmouseout="this.style.background=\'\'">'+title+'</span>';
		ttd1.innerHTML += '<div style="display:none" class="nga_plug_table_right_div">'+divhtml+'</div>'
	}else{
		nga_plug_control_table_s.push({title:'<span class="nga_plug_table_left_span" onclick="nga_plug_table_setTab(this)" onmouseover="this.style.background=\'#e5d5b0\'" onmouseout="this.style.background=\'\'">'+title+'</span>',html:'<div style="display:none" class="nga_plug_table_right_div">'+divhtml+'</div>'})
	}
}//给控制台添加项目函数结束

//设置导入导出模块，如果你的插件里面保存的本地数据是使用nga_plug_local_data方法保存，则可使用该方法以在插件设置中心中统一导入导出你的插件的设置
//调用：nga_plug_local_data("add","这个设置项的说明","这个设置项的key")   "add"是常量，调用时请勿修改，说明可以随意填写，以后可能有用，key是你使用nga_plug_local_data保存数据时的那个key
function nga_plug_setting(act,title,name){
	var x;
	var s = [];
	var t = document.getElementById("nga_plug_setting_text");
	if (act == "ex"){
		for (var i=0;i<nga_plug_setting_list.length;i++){
			x = new nga_plug_local_data(nga_plug_setting_list[i].dataname);
			x.load();
			s.push({title:nga_plug_setting_list[i].title,dataname:nga_plug_setting_list[i].dataname,data:x.data});
		}
		t.value = JSON.stringify(s);
	}else if(act == "im"){
		t.value = t.value.replace(/\n/g,"");
		try{s = JSON.parse(t.value);}catch(e){alert("数据格式不对！\n错误代码：1");return;}
		if (!s){alert("没有数据！");return}
		if (typeof(s)!="object"){alert("数据格式不对！\n错误代码：2");return}
		for (var i=0;i<s.length;i++){
			if (!s[i].dataname){alert("数据格式不对！\n错误代码：3");return}
		}
		if(!confirm( "确定要覆盖现在的设置吗？")){
			return;
		}
		for (var i=0;i<s.length;i++){
			x = new nga_plug_local_data(s[i].dataname);
			x.save(s[i].data);
		}
		alert("设置导入成功，刷新后应用新设置。");
	}else if(act == "add"){
		if (!name) return;
		if (!title) return;
		nga_plug_setting_list.push({title:title,dataname:name})
	}else if(act == "read"){
		t.value = "";
		for (var i=0;i<nga_plug_setting_list.length;i++){
			t.value += (i+1) + "." + nga_plug_setting_list[i].title + "\n";
		}
		t.value += "\n点击“导出”后会将以上设置项全部导出，如果有插件的设置项没有导出，请联系插件作者添加（指没有导出设置项的插件的作者）"
	}else if(act == "load"){
		if(!/\.txt$/i.test(title.files[0].name)){
			alert("请确保文件为文本文档！");
			return false;
		}
		var reader = new FileReader();
		reader.readAsText(title.files[0]);
		reader.onload = function(e) {
			t.value = reader.result
		}
	}else if(act == "save"){
		nga_plug_setting('ex');
		var BlobBuilder = BlobBuilder || MSBlobBuilder || WebKitBlobBuilder || MozBlobBuilder;
		var URL = URL || webkitURL || window;

		var bb = new BlobBuilder;
		bb.append(t.value);
		var blob = bb.getBlob('text/plain;charset=utf-8');
		
		var objDate = new Date();
		var filename = 'NGA插件设置-' + objDate.getFullYear()+objDate.getMonth()+objDate.getDate()+(objDate.getHours()<10?'0'+objDate.getHours():objDate.getHours())+(objDate.getMinutes()<10?'0'+objDate.getMinutes():objDate.getMinutes())+(objDate.getSeconds()<10?'0'+objDate.getSeconds():objDate.getSeconds()) + '.txt';
		
		var type = blob.type;
		var force_saveable_type = 'application/octet-stream';
		if (type && type != force_saveable_type) { // 强制下载，而非在浏览器中打开
			var slice = blob.slice || blob.webkitSlice || blob.mozSlice;
			blob = slice.call(blob, 0, blob.size, force_saveable_type);
		}

		var url = URL.createObjectURL(blob);
		title.download = filename;
		title.href = url;
	}
}

//添加一个升级提示
//参数：id 是标记插件名的参数，最好加上作者id以防和其他插件冲突，title 是插件名称，用于显示消息的时候的标题，
//text 是消息内容 消息内容中可以使用\n来换行，type 是表示消息类型，可以省略，如果指定"install"则说明这是一个插件安装成功后的提示
//使用该函数时，升级提示应放在安装提示后，这样做可以在插件安装提示未读（即插件刚刚安装成功时）不显示插件升级消息
function nga_plug_addmsg(id,title,text,type){
	var ttitle = title.replace(/</g,"&lt;");
	var ttext = text.replace(/</g,"&lt;");
	ttext = ttext.replace(/\n/g,"<br>");
	var ishave = false;
	if (nga_plug_msg.data.length>0){
		for (var i=0;i<nga_plug_msg.data.length;i++){
			if (nga_plug_msg.data[i].id == id){
				ishave = true;
				var haveins = false;
				var havetext = false;
				for (var k=0;k<nga_plug_msg.data[i].msg.length;k++){
					if (nga_plug_msg.data[i].msg[k].type == "install" && nga_plug_msg.data[i].msg[k].read == false){
						haveins = true;
					}
					if (nga_plug_msg.data[i].msg[k].text == ttext) havetext = true;
				}
				if (!havetext) nga_plug_msg.data[i].msg.push({text:ttext,read:haveins,type:type});
			}
		}
	}
	if (!ishave){
		nga_plug_msg.data.push({id:id,title:ttitle,msg:[{text:ttext,read:false,type:type}]});
	}
	nga_plug_msg.save();
}
//---------------------------------------------------以下函数请其他插件开发者不要调用----------------------------------------------------//

//    TAB切换TAB项函数，无需调用
function nga_plug_tab_setTab(obj,n){
	var tdiv=obj.parentNode.parentNode.getElementsByTagName("div");
	var mli = new Array();
	for (var i=0;i<tdiv.length;i++){
		if (tdiv[i].className == "nga_plug_tab_pan") mli.push(tdiv[i]);
	}
	var tli=obj.parentNode.getElementsByTagName("li");
	for (var i=0;i<mli.length;i++){
		tli[i+1].className=i==n?"nga_plug_tab_menu_open":"nga_plug_tab_menu_close";
		mli[i].style.display=i==n?"inline":"none";
	}
}

//   TAB左右移动TAB项函数，无需调用
function nga_plug_tab_setTabList(obj,act){
	var tel = [];
	if (act == "load"){
		if (!obj) return;
		var tobj = obj.getElementsByTagName("ul");
		var tli,tdiv;
		for (var i=0;i<tobj.length;i++){
			if (tobj[i].className == "nga_plug_tab_menu") tli = tobj[i].getElementsByTagName("li");
		}
		tobj = obj.getElementsByTagName("div");
		for (var i=0;i<tobj.length;i++){
			if (tobj[i].className == "nga_plug_tab_main") tdiv = tobj[i];
		}
		c(tdiv,"x");
		if ((tli.length-2)*75+45 > tdiv.offsetWidth){
			for (var i=1;i<tli.length-1;i++){
				if (i*75+45 > tdiv.offsetWidth) tli[i].style.display = "none";
			}
			tli[0].style.visibility = "hidden";
		}else{
			tli[0].style.visibility = "hidden";
			tli[tli.length-1].style.visibility = "hidden";
		}
		for (var i=1;i<tli.length-1;i++){
			if (tli[i].className == "hover" && tli[i].style.display == "none"){
				while(tli[i].style.display == "none"){
					nga_plug_tab_setTabList(obj.parentNode,"r");
				}
			}
		}
		c(tdiv,"y");
	}else if(act == "l"){
		var tli = obj.getElementsByTagName("li");
		if (tli[1].style.display == "inline" || tli[1].style.display == "") return;
		for (var i=1;i<tli.length-1;i++){
			if (tli[i].style.display == "inline" || tli[i].style.display == ""){
				tli[i-1].style.display = "inline";
				for (var k=i;k<tli.length-1;k++){
					if (tli[k].style.display == "none"){
						tli[k-1].style.display = "none";
						if (tli[k-1].className == "hover") nga_plug_tab_setTab(tli[k-1],k-3);
						
						if (tli[1].style.display != "none") tli[0].style.visibility = "hidden";
						tli[tli.length-1].style.visibility = "visible";
						return;
					}
				}
				tli[tli.length-2].style.display = "none";
				if (tli[tli.length-2].className == "hover") nga_plug_tab_setTab(tli[tli.length-2],tli.length-4);
				
				if (tli[1].style.display != "none") tli[0].style.visibility = "hidden";
				tli[tli.length-1].style.visibility = "visible";
				return;
			}
		}
		
	}else if(act == "r"){
		var tli = obj.getElementsByTagName("li");
		if (tli[tli.length-2].style.display == "inline" || tli[tli.length-2].style.display == "") return;
		for (var i=tli.length-2;i>0;i--){
			if (tli[i].style.display == "inline" || tli[i].style.display == ""){
				tli[i+1].style.display = "inline";
				for (var k=i;k>0;k--){
					if (tli[k].style.display == "none"){
						tli[k+1].style.display = "none";
						if (tli[k+1].className == "hover") nga_plug_tab_setTab(tli[k+1],k+1);
						
						tli[0].style.visibility = "visible";
						if (tli[tli.length-2].style.display != "none") tli[tli.length-1].style.visibility = "hidden";
						return;
					}
				}
				tli[1].style.display = "none";
				if (tli[1].className == "hover") nga_plug_tab_setTab(tli[1],1);
				
				tli[0].style.visibility = "visible";
				if (tli[tli.length-2].style.display != "none") tli[tli.length-1].style.visibility = "hidden";
				return;
			}
		}
	}
	
	function c(obj,act){
		if (act == "x"){
			try{
				if (obj.style.display=="none"){
					tel.push(obj);
					obj.style.display="block";
				}
			}catch(e){}
			//try{c(obj.parentNode,"x");}catch(e){}
			//console.log(obj)
			if (obj.parentNode) c(obj.parentNode,"x");
		}else{
			for (var i=0;i<tel.length;i++){
				tel[i].style.display = "none";
			}
		}
	}
}

//控制台切换列表函数，无需调用
function nga_plug_table_setTab(obj){
	var tspan=obj.parentNode.getElementsByTagName("span");
	var ttable=document.getElementById("nga_plug_control_table");
	var ttd=ttable.rows[1].cells[1];
	var tdiv1=ttd.getElementsByTagName("div");
	var tdiv=new Array();
	for (var i=0;i<tdiv1.length;i++){
		if (tdiv1[i].className == "nga_plug_table_right_div"){
			tdiv.push(tdiv1[i]);
		}
	}
	for (var i=0;i<tspan.length;i++){
		if (tspan[i] == obj){
			tspan[i].className='nga_plug_table_left_div_span_hover';
			tdiv[i].style.display = "block";
		}else{
			tspan[i].className='nga_plug_table_left_span';
			tdiv[i].style.display = "none";
		}
	}
}

//创建设置中心面板
function nga_plug_control_create(msg){
	if (document.getElementById('nga_plug_control')){
		document.getElementById('nga_plug_control').style.display = document.getElementById('nga_plug_control').style.display == "block" ? "none":"block";
	}else{
		var tmpdiv = document.createElement("div");
		tmpdiv.id = "nga_plug_control";
		tmpdiv.className = "nga_plug_table";
		var t_html = 	'<table style="width:800px;" cellspacing="0px" id="nga_plug_control_table">\
				<tr>\
					<td colspan="2" class="nga_plug_table_top">\
					NGA插件设置中心<div class="right"><a href="javascript:void(0)" onclick="nga_plug_control_create()">关闭</a>&nbsp;</div>\
					</td>\
				</tr>\
				<tr>\
					<td class="nga_plug_table_left">\
						<div class="nga_plug_table_left_div">\
							<span class="nga_plug_table_left_div_span_hover" onclick="nga_plug_table_setTab(this)" onmouseover="this.style.background=\'#e5d5b0\'" onmouseout="this.style.background=\'\'">基本设置</span>';
		for (var i=0;i<nga_plug_control_table_s.length;i++){
			t_html += nga_plug_control_table_s[i].title;
		}
		t_html += '		</div>\
					</td>\
					<td>\
						<div class="nga_plug_table_right_div">';
		var x = new nga_plug_tab();
		x.add("关于",'<div class=\'nga_plug_table_tab_div\'>插件名：NGA插件设置中心<br>作者：LinTx<br>修改：onlyforxuan<br>版本：'+nga_plug_control_version+'<br><a class="green" href="http://bbs.ngacn.cc/read.php?tid=5627431" target="_blank">参与讨论</a><br><br><span style="font-size:24px;">由于L大离开NGA，我来接手代码的维护工作，暂时只会进行一些现有功能的修复</span></div>');
		x.add("插件控制","<div class='nga_plug_table_tab_div'>"+nga_plug_control_getplugmanhtml()+"</div>");
		x.add("配置管理",'<div class="nga_plug_table_tab_div">\
			<textarea id="nga_plug_setting_text" style="width: 625px; height: 313px; margin: 0px; "></textarea>\
			<input onclick="nga_plug_setting(\'ex\')" type="button" value="导出">\
			<input onclick="nga_plug_setting(\'im\')" type="button" value="导入">\
			<input onclick="nga_plug_setting(\'read\')" type="button" value="显示会导出的设置项">\
			<span class="right"><a href="" onclick="nga_plug_setting(\'save\',this)">保存至本地</a>  从本地加载：<input type="file" style="width:120px;" onchange="nga_plug_setting(\'load\',this)"></span>\
			<br><span>导出说明：点击“导出”按钮，把文本框中的内容复制并保存到你的电脑里面即可（你可以将你导出的设置分享给其他人使用）。\
			<br>导入说明：把以前导出的内容或者其他人导出的内容输入进上面的文本框，然后点击“导入”按钮即可（导入会覆盖现在的设置，应用新的设置需要刷新页面）。</span>\
			</div>');
		var newmsg = false;
		if (msg == "newmsg") newmsg = true;
		var tt_html = '<div class="nga_plug_table_tab_div">';
		if (!newmsg){
			tt_html += '<span class="green">没有升级提示</span>';
		}else{
			tt_html += '<input type="button" onclick="nga_plug_readmsg()" value="全部标记为已读"><br>'
			for (var i=0;i<nga_plug_msg.data.length;i++){
				for (var k=0;k<nga_plug_msg.data[i].msg.length;k++){
					if (!nga_plug_msg.data[i].msg[k].read){
						tt_html += '<span class="green">'+nga_plug_msg.data[i].title+'</span><br><span>'+nga_plug_msg.data[i].msg[k].text+'</span><br><br>'
					}
				}
			}
		}
		tt_html += '</div>'
		x.add("升级提示",tt_html,newmsg);
		t_html += x.gethtml();
		t_html += '		</div>';
		for (var i=0;i<nga_plug_control_table_s.length;i++){
			t_html += nga_plug_control_table_s[i].html;
		}
		t_html += '	</td>\
				</tr>\
			</table>'
		tmpdiv.innerHTML = t_html;
		document.body.appendChild(tmpdiv);
		nga_plug_HideDomOfClick('nga_plug_control');
		document.getElementById('nga_plug_control').style.display = "block";
	}
	function c(p){
		if (p) return "checked"; else return "";
	}
}

//标记升级提示为已读
function nga_plug_readmsg(){
	for (var i=0;i<nga_plug_msg.data.length;i++){
		for (var k=0;k<nga_plug_msg.data[i].msg.length;k++){
			nga_plug_msg.data[i].msg[k].read = true;
			nga_plug_msg.save();
		}
	}
	alert("所有消息已经标记为已读。");
}

//本插件的加载JS函数，和NGA本身相同功能的函数的callback处理模式不同以可以在callback中传递参数
function nga_plug_loaderScript(src,callback,charset){
	var x = document.createElement('script');
	var h = document.getElementsByTagName('head')[0]
	if(charset)x.charset = charset
	x.src=src
	h.insertBefore(x,h.firstChild)
	if (callback) {
		if(x.readyState){
			x.onreadystatechange = function() {
				if (this.readyState && this.readyState != 'loaded' && this.readyState != 'complete')return;
				try{eval(callback)}catch(e){};
			}
		}else{
			x.onload = function() {try{eval(callback)}catch(e){}}
		}
	}
}

//插件控制台-添加插件
function nga_plug_control_addplug(plug_form){
	if (plug_form.plugsrc.value == ""){
		alert("插件地址必须填写！");
		return false;
	}
	for (var i=0;i<nga_plug_plugs.length;i++){
		if (plug_form.plugsrc.value == nga_plug_plugs[i].src){
			alert("该插件存在于固定插件列表中，无需再次添加！");
			return false;
		}
	}
	for (var i=0;i<nga_plug_user_plugs.data.length;i++){
		if (plug_form.plugsrc.value == nga_plug_user_plugs.data[i].src){
			alert("该插件存在于你的插件列表中，无需再次添加！");
			return false;
		}
	}
	nga_plug_user_plugs.data.push({title:plug_form.plugtitle.value,src:plug_form.plugsrc.value,charset:plug_form.plugchar.value,check:true});
	nga_plug_user_plugs.save();
	var tf = document.getElementById("nga_plug_control_pluglistman_form");
	tf.innerHTML += '<table class="nga_plug_plugcon"><tr><td>\
			<input name="plugcheck" type="checkbox" checked title="是否启用'+plug_form.plugtitle.value+'">是否启用插件：'+plug_form.plugtitle.value+'\
			<div style="float:right"><input type="button" onclick="nga_plug_control_delplug(this.parentNode.parentNode.parentNode.parentNode)" value="删除"></div></td></tr>\
			<tr><td style="border-top:1px dotted #777;">插件地址：<input type="text" name="plugsrc" size=83 value='+plug_form.plugsrc.value+'><br>\
			插件名称：<input type="text" name="plugtitle" value="'+plug_form.plugtitle.value+'">插件编码：<select name="plugchar">\
			<option value="GBK" '+s(plug_form.plugchar.value,"GBK")+'>GBK</option><option value="UTF-8" '+s(plug_form.plugchar.value,"UTF-8")+'>UTF-8</option></select></td></tr></table>';

	function s(p,s){
		if (p == s) return "selected='selected'"; else return "";
	}
	return false;
}

//插件控制台-删除插件
function nga_plug_control_delplug(table){
	if (table.tagName.toLowerCase() == "tbody") table = table.parentNode;
	var plug_form = table.parentNode;
	var tables = plug_form.getElementsByTagName("table");
	var tableid = -1;
	for (var i=0;i<tables.length;i++){
		if (tables[i] == table){
			tableid = i - nga_plug_plugs.length;
		}
	}
	if(!confirm( "你要删除“"+nga_plug_user_plugs.data[tableid].title+"”吗？")){
		return;
	}
	nga_plug_user_plugs.data.splice(tableid,1);
	nga_plug_user_plugs.save();
	plug_form.removeChild(table);
}

//插件控制台-保存插件设置
function nga_plug_control_pluglistman(plug_form){
	try{
		for (var i=0;i<plug_form.plugtitle.length;i++){
			for (var k=i+1;k<plug_form.plugtitle.length;k++){
				if (plug_form.plugsrc[i].value == plug_form.plugsrc[k].value){
					alert("保存失败！\n原因：插件列表有重复的插件地址。\n请检查后再保存。");
					return false;
				}
			}
		}
	}catch(e){}
	try{
		for (var i=0;i<nga_plug_plugs.length;i++){
			if(plug_form.plugtitle.length){
				for (var k=0;k<plug_form.plugtitle.length;k++){
					if (nga_plug_plugs[i].src == plug_form.plugsrc[k].value){
						alert("保存失败！\n原因：插件列表有插件和固定插件列表中的插件重复。\n重复插件名称："+nga_plug_plugs[i].title+"，\n重复插件地址："+nga_plug_plugs[i].src+"。\n请检查后再保存。");
						return false;
					}
				}
			}else{
				if (nga_plug_plugs[i].src == plug_form.plugsrc.value){
					alert("保存失败！\n原因：插件列表有插件和固定插件列表中的插件重复。\n重复插件名称："+nga_plug_plugs[i].title+"，\n重复插件地址："+nga_plug_plugs[i].src+"。\n请检查后再保存。");
					return false;
				}
			}
		}
	}catch(e){}
	nga_plug_plugs_check.data = [];   //保存固定插件列表的开启状态
	if (nga_plug_plugs.length == 1){
		nga_plug_plugs[0].check = plug_form.fixedcheck.checked;
		nga_plug_plugs_check.data.push({id:nga_plug_plugs[0].id,check:nga_plug_plugs[0].check});
	}else{
		for (var i=0;i<nga_plug_plugs.length;i++){
			nga_plug_plugs[i].check = plug_form.fixedcheck[i].checked;
			nga_plug_plugs_check.data.push({id:nga_plug_plugs[i].id,check:nga_plug_plugs[i].check});
		}
	}
	nga_plug_plugs_check.save();
	
	nga_plug_user_plugs.data = [];    //保存自定义插件的配置
	if(plug_form.plugtitle.length){
		for (var i=0;i<plug_form.plugtitle.length;i++){
			nga_plug_user_plugs.data.push({title:plug_form.plugtitle[i].value,src:plug_form.plugsrc[i].value,charset:plug_form.plugchar[i].value,check:plug_form.plugcheck[i].checked});
		}
	}else{
		nga_plug_user_plugs.data.push({title:plug_form.plugtitle.value,src:plug_form.plugsrc.value,charset:plug_form.plugchar.value,check:plug_form.plugcheck.checked});
	}
	nga_plug_user_plugs.save();
	alert("保存成功！");
	return false;
}

//插件控制台-生成设置页
function nga_plug_control_getplugmanhtml(){
	var th = "";
	th += '<div><span class="green">添加一个插件到你的插件列表</span></div><form style="border:1px solid #777;text-align:left;width:607px;" onsubmit="return nga_plug_control_addplug(this)">\
		插件地址：<input type="text" name="plugsrc" size=85><br>插件名称：<input type="text" name="plugtitle">插件编码：<select name="plugchar">\
		<option value="GBK" selected="selected">GBK</option><option value="UTF-8">UTF-8</option></select><div style="float:right"><input type="submit" value="确定添加"></div></form>\
		<br><form style="width:607px;" id="nga_plug_control_pluglistman_form" onsubmit="return nga_plug_control_pluglistman(this)">\
		<div style="float:right;margin-top:24px;"><input type="submit" value="保存设置"></div>\
		<div style="margin-top:20px;padding-top:28px;border-top:4px double #777;border-bottom:1px solid #777;text-align:left;width:607px;"><span class="green">修改已有插件设置</span></div>';
	for (var i=0;i<nga_plug_plugs.length;i++){
		th += '<table class="nga_plug_plugcon"><tr><td><input name="fixedcheck" type="checkbox" '+c(nga_plug_plugs[i])+' title=\
		"是否启用'+nga_plug_plugs[i].title+'">是否启用插件：'+nga_plug_plugs[i].title+'</td></tr></table>';
	}
	for (var i=0;i<nga_plug_user_plugs.data.length;i++){
		th += '<table class="nga_plug_plugcon"><tr><td>\
			<input name="plugcheck" type="checkbox" '+c(nga_plug_user_plugs.data[i])+' title="是否启用'+nga_plug_user_plugs.data[i].title+'">是否启用插件：'+nga_plug_user_plugs.data[i].title+'\
			<div style="float:right"><input type="button" onclick="nga_plug_control_delplug(this.parentNode.parentNode.parentNode.parentNode)" value="删除"></div></td></tr>\
			<tr><td style="border-top:1px dotted #777;">插件地址：<input type="text" name="plugsrc" size=83 value='+nga_plug_user_plugs.data[i].src+'><br>\
			插件名称：<input type="text" name="plugtitle" value="'+nga_plug_user_plugs.data[i].title+'">插件编码：<select name="plugchar">\
			<option value="GBK" '+s(nga_plug_user_plugs.data[i],"GBK")+'>GBK</option><option value="UTF-8" '+s(nga_plug_user_plugs.data[i],"UTF-8")+'>UTF-8</option></select></td></tr></table>';
	}
	th += '</form>';
	return th;
	
	function c(p){
		if (p.check) return "checked"; else return "";
	}
	function s(p,s){
		if (p.charset == s) return "selected='selected'"; else return "";
	}
}

//内置固定插件列表   ID必须唯一
var nga_plug_plugs = [
{
	id:"nga_edit",
	title:'UBB编辑器',
	src:"http://ngaplugin.googlecode.com/svn/ngaplug/editor/editor.js",
	testsrc:"http://ngaplugin.googlecode.com/svn/ngaplug/editor/editor.test.js",
	charset:"UTF-8",
	check:true
},{
	id:"Blacklist",
	title:"黑名单插件",
	src:"http://ngaplugin.googlecode.com/svn/ngaplug/Blacklist.js",
	testsrc:"http://ngaplugin.googlecode.com/svn/ngaplug/Blacklist.test.js",
	charset:"UTF-8",
	check:true
},{
	id:"ngacn_ui_mojo",
	title:"表情-虚空之魂",
	src:"http://ngaui.googlecode.com/files/ngacn_ui_mojo.js",
	charset:"UTF-8",
	check:true
},{
	id:"mojo_for_lintx",
	title:"表情-LinTx",
	src:"http://ngaplugin.googlecode.com/svn/ngaplug/mojo_for_lintx.js",
	charset:"UTF-8",
	check:true
},{
	id:"othertools",
	title:"小工具集合",
	src:"http://ngaplugin.googlecode.com/svn/ngaplug/othertools.js",
	testsrc:"http://ngaplugin.googlecode.com/svn/ngaplug/othertools.test.js",
	charset:"UTF-8",
	check:true
},{
	id:"varietynga",
	title:"百变NGA",
	src:"http://ngaplugin.googlecode.com/svn/ngaplug/varietynga.js",
	testsrc:"http://ngaplugin.googlecode.com/svn/ngaplug/varietynga.test.js",
	charset:"UTF-8",
	check:true
}
];
var nga_plug_mojo = [];
var nga_plug_setting_list = [];
var nga_plug_user_plugs = new nga_plug_local_data("nga_plug_user_plugs");  //自定义插件设置
var nga_plug_plugs_check = new nga_plug_local_data("nga_plug_plugs");      //固定插件开启状态
var nga_plug_settings = new nga_plug_local_data("nga_plug_setting");
var nga_plug_msg = new nga_plug_local_data("nga_plug_msg");

function nga_plug_control_Initialization(){
	var istest = false;
	nga_plug_settings.load();
	nga_plug_settings.data = nga_plug_settings.data || {set:{updata:true}};
	nga_plug_msg.load();
	nga_plug_msg.data = nga_plug_msg.data || [];
	
	//创建打开本插件设置的链接
	var nga_plug_control_t_link = document.getElementById("mainmenu").getElementsByTagName("td");
	var nga_plug_control_link_td = document.createElement("td");
	var nga_plug_control_link = document.createElement("a");
	nga_plug_control_link.href="javascript:void(0)";
	var newmsg = false;
	if (nga_plug_msg.data.length > 0){
		for (var i=0;i<nga_plug_msg.data.length;i++){
			for (var k=0;k<nga_plug_msg.data[i].msg.length;k++){
				if (!nga_plug_msg.data[i].msg[k].read){
					nga_plug_control_link.style.color= "sandyBrown";
					nga_plug_control_link.title="有插件升级了，点击查看升级内容。"
					newmsg = true;
				}
			}
		}
	}
	if (newmsg){
		nga_plug_control_link.onclick=function(event){event.cancelBubble = true;nga_plug_control_create("newmsg");};
	}else{
		nga_plug_control_link.onclick=function(event){event.cancelBubble = true;nga_plug_control_create();};
	}
	nga_plug_control_link.className="rep gray txtbtnx b";
	nga_plug_control_link.innerHTML="插件";
	nga_plug_control_link_td.appendChild(nga_plug_control_link);
	try{nga_plug_control_t_link[2].parentNode.insertBefore(nga_plug_control_link_td,nga_plug_control_t_link[2]);}catch(e){};
	
	
	//nga_plug_addmsg("nga_plug","NGA 插件设置中心","恭喜！\n插件安装成功，更多功能请点击上方的“关于”，然后点击下面的“参与讨论”链接。","install");
	//nga_plug_addmsg("nga_plug","NGA 插件设置中心","增加那年那兔表情包，一共234个表情。");
	//nga_plug_addmsg("nga_plug","NGA 插件设置中心","修复微博风格显示帖子中，附件图片无法显示的bug");
	nga_plug_addmsg("nga_plug","百变NGA","折叠按钮在内容展开之后不会消失，再次点击可以将内容重新折叠");
	
	//获取UBB编辑器插件是否测试
	var js = document.getElementsByTagName("script");
	for (var i = 0; i < js.length; i++) {
		if (js[i].src.indexOf("svn/ngaplug/command.test.js") >= 0){
			try{
				for (var i=0;i<nga_plug_plugs.length;i++){
					if (nga_plug_plugs[i].testsrc != null) nga_plug_plugs[i].src = nga_plug_plugs[i].testsrc;
				}
			}catch(e){}
		}
	}
	
	//获取插件是否启用
	nga_plug_user_plugs.load();    //从本地存储中加载自定义插件配置
	nga_plug_user_plugs.data = nga_plug_user_plugs.data || [];
	nga_plug_plugs_check.load();   //从本地存储中加载固定插件是否开启
	for (var i=0;i<nga_plug_plugs.length;i++){   //把获取到的固定插件开启状态应用到固定插件列表中
		if(nga_plug_plugs_check.data){
			for (var k=0;k<nga_plug_plugs_check.data.length;k++){
				if (nga_plug_plugs[i].id == nga_plug_plugs_check.data[k].id) nga_plug_plugs[i].check = nga_plug_plugs_check.data[i].check;
			}
		}
	}
	
	//将自定义插件列表和插件开启状况加入导出数据中
	nga_plug_setting("add","自定义插件列表","nga_plug_user_plugs");
	nga_plug_setting("add","内置插件开启状态","nga_plug_plugs");
	
	//加载固定插件
	for (var i = 0;i<nga_plug_plugs.length;i++){
		if (nga_plug_plugs[i].check){
			nga_plug_loaderScript(nga_plug_plugs[i].src,nga_plug_plugs[i].id+"_Initialization()",nga_plug_plugs[i].charset);
		}
	}
	//加载自定义插件
	for (var i = 0;i<nga_plug_user_plugs.data.length;i++){
		if (nga_plug_user_plugs.data[i].check){
			//nga_plug_loaderScript(nga_plug_user_plugs.data[i].src,"",nga_plug_user_plugs.data[i].charset);
			if (/.+\/(.+)\.js/.test(nga_plug_user_plugs.data[i].src)){
				nga_plug_loaderScript(nga_plug_user_plugs.data[i].src,/.+\/(.+)\.js/.exec(nga_plug_user_plugs.data[i].src)[1]+"_Initialization()",nga_plug_user_plugs.data[i].charset);
			}else{
				nga_plug_loaderScript(nga_plug_user_plugs.data[i].src,"",nga_plug_user_plugs.data[i].charset);
			}
		}
	}
}

var nga_plug_control_isload = nga_plug_control_isload || false;
if (!nga_plug_control_isload){
	nga_plug_control_isload = true;
	nga_plug_control_Initialization();
}

var varietynga_setting = new nga_plug_local_data("varietynga_setting");
var varietynga_lasthtml = "";
var varietynga_customcss = document.createElement('style');
var varietynga_maxpage ;

String.prototype.colorHex = function(){
        var that = this;
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if(/^(rgb|RGB)/.test(that)){
            var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
            var strHex = "#";
            for(var i=0; i<aColor.length; i++){
                var hex = Number(aColor[i]).toString(16);
                if(hex === "0"){
                    hex += hex;
                }
				hex = (hex + hex).substr(0,2);
                strHex += hex;
            }
            if(strHex.length !== 7){
                strHex = that;
            }
            return strHex;
        }else if(reg.test(that)){
            var aNum = that.replace(/#/,"").split("");
            if(aNum.length === 6){
                return that;
            }else if(aNum.length === 3){
                var numHex = "#";
                for(var i=0; i<aNum.length; i+=1){
                    numHex += (aNum[i]+aNum[i]);
                }
                return numHex;
            }
        }else{
            return that;
        }
};

function varietynga_Initialization(){
	nga_plug_addmsg("varietynga","百变NGA","修复帖子列表页图片不能显示的BUG。");
	
	varietynga_setting.load();
	varietynga_setting.data = varietynga_setting.data || {set:{tieba:true,weibo:true,img:true}};
	
	//将小工具集的设置加入导出数据中
	nga_plug_setting("add","小工具设置","varietynga_setting");
	
	varietynga_setting.data.set.css = varietynga_setting.data.set.css || {colsenav:false,colsebg:false,colseinfo:false,custombg:{check:false,bg:"CCE8CC",custom:"FFFFFF"},avis:{check:false,color:"888"}}
	varietynga_css();
	
	var e = new nga_plug_tab();
	e.add("总体设置",'<input onclick="varietynga_setting.data.set.tieba=this.checked;varietynga_setting.save();" type="checkbox" '+c(varietynga_setting.data.set.tieba)+'>启用主题图片预览（贴吧风格）<br>\
		<input onclick="varietynga_setting.data.set.weibo=this.checked;varietynga_setting.save();" type="checkbox" '+c(varietynga_setting.data.set.weibo)+'>启用帖子即时加载（腾讯微博风格）<br>\
		<input onclick="varietynga_setting.data.set.img=this.checked;varietynga_setting.save();" type="checkbox" '+c(varietynga_setting.data.set.img)+'>启用图片旋转功能>');
	e.add("界面设置",varietynga_setthtml());
	var t = e.gethtml();
	nga_plug_table_addTab("百变NGA",t);
	
	varietynga_customcss.type="text/css";
	document.body.appendChild(varietynga_customcss);
	
	var x = document.createElement('style');
	var h = document.getElementsByTagName('head')[0];
	x.innerHTML = ".varietynga_cur_zin{cursor: url(http://ngaplugin.googlecode.com/svn/ngaplug/img/cur_zin.cur) 14 14,pointer;}.varietynga_cur_zout{cursor: url(http://ngaplugin.googlecode.com/svn/ngaplug/img/cur_zout.cur) 14 14,pointer;}";
	h.insertBefore(x,h.firstChild);
	
	if (location.pathname != "/thread.php" && location.pathname != "/read.php") return;
	if (location.search.indexOf("authorid") >= 0 && location.pathname == "/thread.php") return;
	if (varietynga_setting.data.set.img) try{varietynga_img()}catch(e){}; //加载图片旋转功能
	if (location.pathname == "/thread.php"){
		if (varietynga_setting.data.set.tieba){
			for (var i=0;i<35;i++){
				var ti = document.getElementById("t_tt"+i);
				new nga_plug_XMLHttp(ti.href,varietynga_tieba,"t_tt"+i);
				var x = document.createElement('span');
				x.innerHTML = "<img title='正在获取该主题的图片' src='http://lintxinclude.googlecode.com/files/progressIndicator16x16.gif'>";
				ti.parentNode.appendChild(x);
			}
		}
	}else if(location.pathname == "/read.php" && document.URL.indexOf("page=e#a") < 0){
		if (location.search.indexOf("pid=") >= 0) return;
		if (varietynga_setting.data.set.weibo){
			
			var maxpage = __PAGE[1];
			var nowpage = __PAGE[2];
			var pageurl = "http://" + location.host + location.pathname + location.search + "&page=";
			
			if (maxpage == nowpage) return;
			if (maxpage == null && location.search.indexOf("authorid") < 0) return;

			new nga_plug_XMLHttp(pageurl + (nowpage + 1),varietynga_weibo,{url:pageurl,p:nowpage + 1,n:2,max:maxpage});
		}
	}

	function c(p){
		if (p) return "checked"; else return "";
	}
}

//腾讯微博风格（即时加载下一页）
function varietynga_weibo(html,arg){
	if (arg.reload){
		if (Math.abs(varietynga_lasthtml.length - html.length) > 10){
			var tpd = document.getElementById("m_posts_c");
			var ttab = tpd.getElementsByTagName("table");
			var td = tpd.getElementsByTagName("div");
			var tb = [];
			for (var i=0;i<ttab.length;i++){
				if (ttab[i].className == "forumbox postbox") tb.push(ttab[i]);
			}
			var td = tpd.getElementsByTagName("div");
			tpd.removeChild(td[td.length-1]);
			tpd.removeChild(tb[tb.length-1].parentNode);
		}else{
			setTimeout('new nga_plug_XMLHttp(\''+arg.url + (arg.p)+'\',varietynga_weibo,{url:\''+arg.url+'\',p:'+(arg.p)+',n:1,reload:true})',10000);
			return;
		}
	}
	//if (/<span class='max_page'>&nbsp;\(共 (\d+) 页\)<\/span><span class='to_page'>/.test(html)){
		//var maxpage = /<span class='max_page'>&nbsp;\(共 (\d+) 页\)<\/span><span class='to_page'>/.exec(html)[1];
		var maxpage = __PAGE[1];
		if (maxpage == arg.p) {load(html,arg);over(html,arg);return;}
	//}
	if (/<title>提示信息<\/title>/.test(html)) {over(html,arg);return;}
	if (arg.n == 5) {load(html,arg);nload(html,arg);return;}
	if(arg.obj) {
		arg.obj.parentNode.removeChild(arg.obj);
	}
	load(html,arg);
	new nga_plug_XMLHttp(arg.url + (arg.p + 1),varietynga_weibo,{url:arg.url,p:arg.p+1,n:arg.n+1});
	function load(html,arg){
		if (/commonui.userInfo.setAll[\s\S]*?<\/script>/.test(html)){
			try{eval(/commonui.userInfo.setAll[\s\S]*?(?=__SELECTED)/.exec(html)[0])}catch(e){};
		}
		if (/<div class='w100' id='m_posts_c'[\s\S]*?<div class='module_wrap'>/.test(html)){
			var thtml = /<div class='w100' id='m_posts_c'[\s\S]*?<div class='module_wrap'>/.exec(html)[0];
	        if (/<table[\s\S]+?<\/table>[\s\S]+?(<table[\s\S]+<\/table>)/.test(thtml)){
	            thtml = /<table[\s\S]+?<\/table>[\s\S]+?(<table[\s\S]+<\/table>)/.exec(thtml)[1];
	            var x = document.createElement('div');
	            x.innerHTML = thtml;
	            document.getElementById("m_posts_c").appendChild(x);
	        }
	    }
		if (/<script>([\s\S]*?)<\/script>/gi.test(html)){    //附件处理
			var t_js = html.match(/<script>([\s\S]*?)<\/script>/gi);
			for (var i=0;i<t_js.length;i++){
				var tt_js = /<script>([\s\S]*?)<\/script>/gi.exec(t_js[i])[1];
				if(tt_js.indexOf("commonui.postArg.proc")>=0 || tt_js.indexOf("ubbcode.attach.load")>=0){
					try{eval(tt_js)}catch(e){}
				}
			}
		}
		setTimeout('try{Backlist_bl()}catch(e){};',3000); //调用添加屏蔽链接模块   暂行办法
		setTimeout('try{if (varietynga_setting.data.set.img) varietynga_img();}catch(e){}',3000) //加载图片旋转功能
	}
	function nload(html,arg){
		var x = document.createElement('div');
		x.style.borderLeft= "1px solid #A70";
		x.style.borderTop= "1px solid #A70";
		x.style.borderRight= "1px solid #A70";
		x.style.paddingBottom="10px";
		//x.style.backgroundColor= "#E9D9B5";
		x.innerHTML = '<br><h3>本帖内容已经显示到第'+arg.p+'页且还有未加载的页面，<a style="color:blue" href="javascript:void(0)" onclick="new nga_plug_XMLHttp(\''+arg.url + (arg.p + 1)+'\',varietynga_weibo,{url:\''+arg.url+'\',p:'+(arg.p+1)+',n:1,obj:this.parentNode.parentNode});">点击这里尝试继续加载后面5页</a> <a style="color:blue" href="'+arg.url + (arg.p + 1)+'">或者点击这里跳转到第'+(arg.p+1)+'页</a>。';
		document.getElementById("m_posts_c").appendChild(x);
	}
	function over(html,arg){
		var x = document.createElement('div');
		x.style.borderLeft= "1px solid #A70";
		x.style.borderTop= "1px solid #A70";
		x.style.borderRight= "1px solid #A70";
		x.style.paddingBottom="10px";
		//x.style.backgroundColor= "#E9D9B5";
		x.innerHTML = '<br><h3>本帖内容已经显示到第'+arg.p+'页且已经全部加载完毕,现在每隔10秒将检测一次是否有新回复。';
		document.getElementById("m_posts_c").appendChild(x);
		if (html != null){
			varietynga_lasthtml = html;
			setTimeout('new nga_plug_XMLHttp(\''+arg.url + (arg.p)+'\',varietynga_weibo,{url:\''+arg.url+'\',p:'+(arg.p)+',n:1,reload:true})',10000);
		}
	}
}

//贴吧风格-使用AJAX获取版面帖子中是否有图片并作相应操作
function varietynga_tieba(html,arg){
var elimg = document.getElementById(arg).parentNode.getElementsByTagName("img")[0];
	var poststr = /<span id='postcontent0'.*?>(.*?)(?=<\/span>)/.exec(html)[1];
	var imgreg = /\[img\](.*?)\[\/img\]/gi;
	if (imgreg.test(poststr)){
		var postimgs = poststr.match(imgreg);
		var postimg = [];
		var ngamojostr = JSON.stringify(nga_plug_mojo).toLowerCase();
		for (var i=0;i<postimgs.length;i++){
			if (ngamojostr.indexOf(/\[img\](.*?)\[\/img\]/i.exec(postimgs[i])[1].toLowerCase()) == -1 ){
				postimg.push(/\[img\](.*?)\[\/img\]/i.exec(postimgs[i])[1]);
			}
		}

	}else{
		elimg.parentNode.removeChild(elimg);
		return;
	}
	var postattach;
	if (/<span id='postattach0'>.*?(\[.*?\])(?=<\/script>)/.test(html)){
		eval("postattach = " + /<span id='postattach0'>.*?(\[.*?\])(?=<\/script>)/.exec(html)[1]);
	}
	if(postattach != null){
		var imgstr = JSON.stringify(postimg).toLowerCase();
		for (var k in postattach){
			if(postattach[k].type=="img"){
				postattach[k].url = "./" + postattach[k].url;
				if (postattach[k].thumb == 1) postattach[k].url += ".thumb.jpg";
				if(imgstr.indexOf(postattach[k].url.toLowerCase()) == -1 ){
					postimg.push(postattach[k].url)
				}
			}
		}
	}
	if (postimg.length == 0){
		elimg.parentNode.removeChild(elimg);
		return;
	}else{
		//elimg.parentNode.removeChild(elimg);
		elimg.src = "http://ngaplugin.googlecode.com/svn/ngaplug/img/yes.png";
		elimg.title = "该帖有图片。";
		for(var i=0;i<postimg.length;i++){
			if (postimg[i].substr(0,1) == "."){
				var m = postimg[i].match(/^\.\/mon_(\d+)\/(\d+)/)
				var b = (window.__BBSURL=='http://bbs.ngacn.cc') ? true : false
				var r = "";
				if(m){
					if(parseInt(m[1].toString()+m[2].toString(),10)>=20130104){
						if(b)
							r = 'http://img6.ngacn.cc/attachments/'
						else
							r = 'http://img6.nga.178.com/attachments/'
					}
				else{
					if(b)
						r = 'http://img.ngacn.cc/attachments/'
					else
						r = 'http://ngaimg.178.com/attachments/'
					}
				}
				postimg[i] = r + postimg[i].substr(1);
				tdiv += '<img src='+postimg[i]+'>'
			}
		}
		var x = document.createElement('div');
		var tdiv = '<div>';
		var postimgl = postimg.length>3?3:postimg.length;
		for(var i=0;i<postimgl;i++){
			tdiv += '<img src='+postimg[i]+' onload="varietynga_setimg(this)" style="left:-9999px;top:-9999px;position:absolute;z-index:-999">'
		}
		tdiv += '</div>';
		x.innerHTML = tdiv;
		document.getElementById(arg).parentNode.appendChild(x);
		return;
	}
}

//贴吧风格-缩略图的放大缩小操作
function varietynga_setimg(img){
	if (img.offsetHeight>75){
		img.style.width = img.offsetWidth/img.offsetHeight*75 + "px";
		img.style.height = "75px";
		img.title = "点击查看大图"
		img.style.position = "static";
		img.style.border = "3px solid rgb(139, 0, 0)"; 
		img.style.marginRight = "10px";
		img.className = "varietynga_cur_zin";
		img.onclick = function(event){
			if (img.title != "点击查看大图"){
				var e = event || window.event;
				var layerY = e.offsetY || getOffset(e).offsetY;
				if (layerY > 75) {
					document.body.scrollTop -= document.body.scrollTop == 0 ? 0 : layerY -78
					document.documentElement.scrollTop -= document.documentElement.scrollTop == 0 ? 0 : layerY -78
				}
				varietynga_setimg(img);
			}else{
				var tdw = img.parentNode.parentNode.offsetWidth-30;
				img.style.width = "";
				img.style.border = "";
				img.title = "点击查看缩略图";
				img.style.height = "";
				if (img.offsetWidth > tdw){
					img.style.height = img.offsetHeight/img.offsetWidth*tdw + "px";
					img.style.width = tdw + "px";
					img.title += "，该图片过大，请进入帖子查看完整图片。"
				}
				img.className = "varietynga_cur_zout";
			}
		}
	}

	function getOffset(evt){
		var target = evt.target;
		if (target.offsetLeft == undefined) {
			target = target.parentNode;
		}
		var pageCoord = getPageCoord(target);
		var eventCoord = {
			x: window.pageXOffset + evt.clientX,
			y: window.pageYOffset + evt.clientY
		};
		var offset = {
			offsetX: eventCoord.x - pageCoord.x,
			offsetY: eventCoord.y - pageCoord.y
		};
		return offset;
	}
	function getPageCoord(element){
		var coord = {x: 0, y: 0};
		while (element){
			coord.x += element.offsetLeft;
			coord.y += element.offsetTop;
			element = element.offsetParent;
		}
		return coord;
	}
}

function varietynga_setCollapseButton(){
	var colBtn = document.getElementsByName("collapseButton");
	
	for(var i=0 ; i< colBtn.length ; i++){
		colBtn[i].onclick = function(){
			if(this.parentNode.nextSibling.style.display == "block"){
				this.parentNode.nextSibling.style.display="none";
				this.innerHTML = "+";
				this.style.padding = "0 2px";
			}else if(this.parentNode.nextSibling.style.display == "none"){
				this.parentNode.nextSibling.style.display="block";
				this.innerHTML = "-";
				this.style.padding = "0 4px";
			}
		}
	}
}

//生成CSS
function varietynga_css(){
	var tcss = "";
	if (varietynga_setting.data.set.css.colsenav){
		tcss += '#_178NavAll_110906_765453{display:none}  /*去除导航条*/\n';
	}
	if (varietynga_setting.data.set.css.colsebg){
		tcss += '#custombg{display:none}  /*去除自定义背景*/\n';
		tcss += '#mainmenu{margin:0px;}   /*去除了自定义背景后需要使用这个以清除用户头像和版面链接之间的间距*/\n';
	}
	if (varietynga_setting.data.set.css.colseinfo){
		tcss += '.cpinfo{display:none;}    /*去除底部申明*/\n';
	}

	var color = "";
	if (varietynga_setting.data.set.css.custombg.check){
		if (varietynga_setting.data.set.css.custombg.bg.toLowerCase() == "custom"){
			color = varietynga_setting.data.set.css.custombg.custom;
		}else{
			color = varietynga_setting.data.set.css.custombg.bg;
		}
		color = color.substr(0,1) == "#"?color.substr(1):color;
		tcss += 'body {background:#'+color+';}   /*body背景色*/\n';
		tcss += '.catenew{background:#'+color+';}   /*子版块主背景色*/\n';
		tcss += '.urltip, .urltip2 {background: #'+color+';}  /*浮动用户信息背景色*/\n';
		tcss += '#indexBlock3 .catenew, #indexBlock3 .catenew .b2{background-color:#'+color+'}  /*暗黑区主背景色*/\n';
		tcss += '.single_ttip2 .div2 {background: #'+color+';}  /*提醒信息背景色*/\n';
		tcss += '#atc_content {background-color: #'+getbcolor(getbcolor(color))+';}  /*回帖编辑框背景色*/\n';

		tcss += '.catenew .b2 {background-color: #'+color+';}  /*子版块表格色1*/\n';
		tcss += '.catenew .b3 {background-color: #'+getbcolor(color)+';}  /*子版块表格色2 主界面板块表格色1*/\n';
		tcss += '.catenew .b4 {background-color: #'+color+';}  /*子版块表格色3 主界面板块表格色2*/\n';

		tcss += '#indexBlock3 .catenew .b3{background-color:#'+color+'}  /*暗黑区表格色1*/\n';
		tcss += '#indexBlock3 .catenew .b4{background-color:#'+getbcolor(color)+'}  /*暗黑区表格色2*/\n';

		tcss += '.quote {background-color: #'+getbcolor(getbcolor(color))+';}  /*引用区域背景色*/\n';

		tcss += '.forumbox .row1 .c1 {background-color: #'+color+';}  /*主题列表表格背景色1.1*/\n';
		tcss += '.forumbox .row1 .c2 {background-color: #'+getbcolor(color)+';}  /*主题列表表格背景色1.2*/\n';
		tcss += '.forumbox .row1 .c3_ {background-color: #'+color+';}  /*主题列表表格背景色1.3*/\n';
		tcss += '.forumbox .row1 .c4_ {background-color: #'+getbcolor(color)+';}  /*主题列表表格背景色1.4*/\n';
		tcss += '.forumbox .row2 .c1 {background-color: #'+getbcolor(color)+';}  /*主题列表表格背景色2.1*/\n';
		tcss += '.forumbox .row2 .c2 {background-color: #'+color+';}  /*主题列表表格背景色2.2*/\n';
		tcss += '.forumbox .row2 .c3_ {background-color: #'+getbcolor(color)+';}  /*主题列表表格背景色2.3*/\n';
		tcss += '.forumbox .row2 .c4_ {background-color: #'+color+';}  /*主题列表表格背景色2.4*/\n';

		tcss += '.nga_plug_table {background-color: #'+color+';}  /*插件设置中心背景色*/\n';
		tcss += '.nga_plug_tab_main {background-color: #'+color+';}  /*插件设置中心生成的TAB的背景色*/\n';
		tcss += '.nga_plug_tab_menu_open {background-color: #'+color+';}  /*TAB表示打开的TAB的背景色*/\n';
		tcss += '.nga_plug_tab_menu_close {background-color: #'+getbcolor(color)+';}  /*TAB表示关闭的TAB的背景色*/\n';
		tcss += '.nga_edit_table {background-color: #'+getbcolor(color)+';}  /*表情选择窗口的背景色*/\n';
	}
	
	if (varietynga_setting.data.set.css.avis.check){
		tcss += '.posticon a:visited {color: #'+varietynga_setting.data.set.css.avis.color+';}  /*主题列表中已点击过的链接的颜色*/\n';
		tcss += '.posticon a:hover {text-decoration: underline;color: #314396;}  /*主题列表中鼠标划过的链接的颜色*/\n';
	}
	if (varietynga_setting.data.set.css.noad){
		tcss += '*[class^="adsc"]{display:none !important;}  /*去广告css1（有class的块）*/\n';
		tcss += '#mc>a[href^="http://www.xunyou.com"]{display:none !important;}  /*去广告css2（迅游广告）*/\n';
	}
	varietynga_customcss.innerHTML = tcss;
	
	function getbcolor(color){
		var tcolor = color;
		for (var i=0;i<3;i++){
			if (tcolor.substr(i*2,1).toLowerCase() == "a"){
				tcolor = tcolor.substr(0,(i*2)) + "9" + tcolor.substr(i*2+1);
			}else if(tcolor.substr(i*2,1) == "0"){
				tcolor = tcolor.substr(0,(i*2)) + "00" + tcolor.substr((i+1)*2);
			}else if(isNaN(tcolor.substr(i*2,1))){
				tcolor = tcolor.substr(0,(i*2)) + String.fromCharCode(tcolor.substr(i*2,1).charCodeAt() - 1) + tcolor.substr(i*2+1);
			}else{
				tcolor = tcolor.substr(0,(i*2)) + (parseInt(tcolor.substr(i*2,1)) - 1) + tcolor.substr(i*2+1);
			}
		}
		return tcolor;
	}
}

//点击快速设置主题色时的动作
function varietynga_setcolor(obj){
	var divel = obj.parentNode.getElementsByTagName("div");
	if(obj==divel[0]){
		varietynga_setting.data.set.css.custombg.check = false;
	}else{
		varietynga_setting.data.set.css.custombg.check = true;
	}
	if(obj==divel[divel.length-1]){
		obj.parentNode.getElementsByTagName("input")[0].disabled = false;
		varietynga_setting.data.set.css.custombg.bg = "custom";
	}else{
		obj.parentNode.getElementsByTagName("input")[0].disabled = true;
		if(obj.style.backgroundColor.colorHex()!='') varietynga_setting.data.set.css.custombg.bg = obj.style.backgroundColor.colorHex();
	}
	for (var i=0;i<divel.length;i++){
		divel[i].style.border='1px solid #888';
	}
	obj.style.border='1px solid #f88';
	varietynga_setting.save();
	varietynga_css();
}

//检查并设置自定义颜色
function varietynga_checkcolor(obj){
	if (obj.value.substr(0,1)=="#") obj.value = obj.value.substr(1);
	var isbg = (obj.id=="varietynga_color");
	if (!/^[a-fA-F0-9]+$/.test(obj.value)){
		if (isbg){
			obj.value = varietynga_setting.data.set.css.custombg.custom;
		}else{
			obj.value = varietynga_setting.data.set.css.avis.color;
		}
		return;
	}
	if (obj.value.length>6) obj.value = obj.value.substr(0,6);
	if (obj.value.length==3) obj.value = obj.value.replace(/([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/gi,function ($0,$1,$2,$3){return $1 + $1 + $2 + $2 + $3 + $3});
	if (obj.value.length<6) obj.value = (obj.value + "000000").substr(0,6);
	if (isbg){
		varietynga_setting.data.set.css.custombg.custom = obj.value;
	}else{
		varietynga_setting.data.set.css.avis.color = obj.value;
	}
	varietynga_setting.save();
	varietynga_css();
}

function varietynga_setthtml(){
var s = "";
	s += '<div>\
	<div style="border-bottom:1px solid #777;text-align:left;width:607px;">\
	<span class="green">自定义主题色</span><br>\
	<div title="默认颜色" onclick="varietynga_setcolor(this)" style="height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
	<div title="浅绿" onclick="varietynga_setcolor(this)" style="background-color:#CCE8CC;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
	<div title="蓝色" onclick="varietynga_setcolor(this)" style="background-color:#1D7F99;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
	<div title="绿色" onclick="varietynga_setcolor(this)" style="background-color:#85A333;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
	<div title="红色" onclick="varietynga_setcolor(this)" style="background-color:#AB0303;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
	<div title="紫色" onclick="varietynga_setcolor(this)" style="background-color:#AB2C74;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
	<div title="青色" onclick="varietynga_setcolor(this)" style="background-color:#518791;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
	<div title="褐色" onclick="varietynga_setcolor(this)" style="background-color:#BA4C30;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
	<div title="白色" onclick="varietynga_setcolor(this)" style="background-color:#FFFFFF;height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
	<div title="自定义颜色" onclick="varietynga_setcolor(this)" style="height:10px;width:10px;display:inline-block!important;border: 1px solid #888;"></div>\
	<img src="about:blank" style="display:none" onerror="var ts=varietynga_setting.data.set.css.custombg;var divel=this.parentNode.getElementsByTagName(\'div\');if(!ts.check){divel[0].style.border=\'1px solid #f88\';return}for(var i=1;i<divel.length-1;i++){if(ts.bg.toLowerCase()==divel[i].style.backgroundColor.colorHex().toLowerCase()){divel[i].style.border=\'1px solid #f88\';return}};divel[divel.length-1].style.border=\'1px solid #f88\';return">\
	<input onkeyup="var e = event || window.event;var keyCode = e.which || e.keyCode;if(keyCode==13) varietynga_checkcolor(this);" id="varietynga_color" size="6" value='+varietynga_setting.data.set.css.custombg.custom+' '+d(varietynga_setting.data.set.css.custombg.bg.toLowerCase() == "custom" && varietynga_setting.data.set.css.custombg.check)+' type="text"></div><div style="border-bottom:1px solid #777;text-align:left;width:607px;">\
	<span class="green">已访问帖子颜色</span><br>\
	<input type="checkbox" onclick="document.getElementById(\'varietynga_color1\').disabled=!this.checked;varietynga_setting.data.set.css.avis.check=this.checked;varietynga_setting.save();varietynga_css();" '+c(varietynga_setting.data.set.css.avis.check)+' title="是否启用已访问帖子变色">启用已访问帖子变色    颜色：\
	<input onkeyup="var e = event || window.event;var keyCode = e.which || e.keyCode;if(keyCode==13) varietynga_checkcolor(this);" id="varietynga_color1" size="6" value='+varietynga_setting.data.set.css.avis.color+' '+d(varietynga_setting.data.set.css.avis.check)+' type="text"></div>\
	<div style="border-bottom:1px solid #777;text-align:left;width:607px;">\
	<span class="green">隐藏界面元素</span><br>\
	<input onclick="varietynga_setting.data.set.css.colsenav=this.checked;varietynga_setting.save();varietynga_css();" type="checkbox" '+c(varietynga_setting.data.set.css.colsenav)+' title="是否隐藏顶部导航条">隐藏顶部导航条<br>\
	<input onclick="varietynga_setting.data.set.css.colsebg=this.checked;varietynga_setting.save();varietynga_css();" type="checkbox" '+c(varietynga_setting.data.set.css.colsebg)+' title="是否隐藏顶部背景">隐藏顶部背景<br>\
	<input onclick="varietynga_setting.data.set.css.colseinfo=this.checked;varietynga_setting.save();varietynga_css();" type="checkbox" '+c(varietynga_setting.data.set.css.colseinfo)+' title="是否隐藏底部内容">隐藏底部内容<br>\
	<input onclick="varietynga_setting.data.set.css.noad=this.checked;varietynga_setting.save();varietynga_css();" type="checkbox" '+c(varietynga_setting.data.set.css.noad)+' title="去除大部分NGA广告">去广告<br>\
	</div>\
	<div style="text-align:left;width:607px;"><span class="green">本页使用说明</span><br>\
	选择主题色时直接点击相应的颜色块即可快速选择主题色，如需自定义主题色请点击“自定义”块后在后面的文本框输入3位颜色编码或者6位颜色编码，在文本框按下回车以保存并预览效果，如不使用自定义主题色请选择第一个颜色块（默认颜色）即可。<br><br>\
	自定义已访问帖子的颜色请启用已访问帖子变色，然后在后面的文本框输入3位颜色编码或者6位颜色编码，在文本框按下回车以保存并预览效果。<br><br>\
	隐藏界面元素时开启或者关闭对应选项立即保存并查看效果。\
	</div>\
	</div>';
	return s;
	function c(p){
		if (p) return "checked"; else return "";
	}
	function d(p){
		if (!p) return "disabled"; else return "";
	}
}

//图片旋转
function varietynga_img(){
	var timg = document.getElementById("m_posts_c").getElementsByTagName("img");
	for (var i=0;i<timg.length;i++){
		if (checkimg(timg[i])){
			var ts = document.createElement("span");
			ts.className = "varietyngas";
			ts.style.display = "inline-block";
			ts.top = nga_plug_elementTop(timg[i]) + "px";
			ts.left = nga_plug_elementLeft(timg[i]) + "px";
			ts.innerHTML = "<div style='position: absolute;z-index:999'>\r\
				<div onclick='event.cancelBubble = true;varietynga_imgclick(this.parentNode.parentNode,\"l\");return false;' title='左转' \
				style='display: inline-block; background-image: url(http://ngaplugin.googlecode.com/svn/ngaplug/img/left.gif); \
				height: 16px; width: 16px; border:1px solid #777777; background-position: initial initial; background-repeat: initial initial;'></div>\r\
				<div onclick='event.cancelBubble = true;varietynga_imgclick(this.parentNode.parentNode,\"r\");return false;' title='右转' \
				style='display: inline-block; background-image: url(http://ngaplugin.googlecode.com/svn/ngaplug/img/right.gif); \
				height: 16px; width: 16px; border:1px solid #777777;background-position: initial initial; background-repeat: initial initial;'></div>\
				</div>";
			timg[i].parentNode.insertBefore(ts,timg[i]);
			//timg[i].className = timg[i].className.replace("imgmaxwidth","");
			
			if(timg[i].className == "imgmaxwidth" && timg[i].style.border != ""){
				timg[i].onclick = function(event){
					if(this.className == "imgmaxwidth"){
						this.className = "";
						this.style.border = "";
						this.title = "点击缩小";
					}else{
						this.className = "imgmaxwidth";
						this.style.border = "5px solid rgb(139, 0, 0)";
						this.title = "点击放大";
						
						var e = event || window.event;
						var layerY = e.offsetY || getOffset(e).offsetY;
						if (layerY > 75) {
							document.body.scrollTop -= document.body.scrollTop == 0 ? 0 : layerY -78
							document.documentElement.scrollTop -= document.documentElement.scrollTop == 0 ? 0 : layerY -78
						}
					} 
				}
			}
			ts.appendChild(timg[i]);
		}
	}
	
	function checkimg(img){
		if (img.parentNode.className=="varietyngas") return false
		if(img.parentNode.getAttribute("name")=="portrait") return false
		if(img.parentNode.getAttribute("name")=="medal") return false
		if(img.parentNode.parentNode.getAttribute("name")=="money") return false
		if (img.src == "about:blank") return false
		if (JSON.stringify(nga_plug_mojo).toLowerCase().indexOf(img.src.toLowerCase()) >= 0) return false
		//var width = img.offsetWidth || img.width
		//var height = img.offsetHeight ||img.height
		//if (width < 200 && height < 200) return false
		return true
	}
	
	varietynga_setCollapseButton();
}

function varietynga_imgclick(o,p){
	var img = o.getElementsByTagName("img")[0]
	if(!img || !p) return false;
	var n = img.getAttribute('step');
	if(n== null) n=0;
	if(p=='r'){
		(n==3)? n=0:n++;
	}else if(p=='l'){
		(n==0)? n=3:n--;
	}
	img.setAttribute('step',n);
	if(window.attachEvent) {
		img.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ n +')';
		switch(n){
			case 0:
				img.parentNode.style.height = img.height + "px";
				break;
			case 1:
				img.parentNode.style.height = img.width + "px";
				break;
			case 2:
				img.parentNode.style.height = img.height + "px";
				break;
			case 3:
				img.parentNode.style.height = img.width + "px";
				break;
		}
	}else{
		var tw = img.offsetWidth;
		var th = img.offsetHeight;
		switch(n) {
		default :
		case 0 :
			img.className = img.className.replace(/\svarietynga./,"");
			img.style.marginLeft = "0px";
			img.style.marginTop = "0px";
			img.parentNode.style.width = "";
			img.parentNode.style.height = "";
			break;
		case 1 :
			img.className = img.className.replace(/\svarietynga./,"");
			img.className += " varietyngar";
			img.style.marginLeft = (img.offsetHeight - img.offsetWidth)/2 + "px";
			img.style.marginTop = (img.offsetWidth - img.offsetHeight)/2 + "px";
			
			img.parentNode.style.width = th + "px";
			img.parentNode.style.height = tw + "px";
			break;
		case 2 :
			img.className = img.className.replace(/\svarietynga./,"");
			img.className += " varietyngat";
			img.style.marginLeft = "0px";
			img.style.marginTop = "0px";
			img.parentNode.style.width = "";
			img.parentNode.style.height = "";
			break;
		case 3 :
			img.className = img.className.replace(/\svarietynga./,"");
			img.className += " varietyngal";
			img.style.marginLeft = (img.offsetHeight - img.offsetWidth)/2 + "px";
			img.style.marginTop = (img.offsetWidth - img.offsetHeight)/2 + "px";
			img.parentNode.style.width = th + "px";
			img.parentNode.style.height = tw + "px";
			break;
		}
	}
}

// ================================================================================
// NGA[艾泽拉斯国家地理论坛] 论坛增强插件   编辑框增强
// 作者：LinTx
// 版本：1.4
// ================================================================================

loader.css("http://ngaplug.googlecode.com/svn/ngaplug/editor/editor.css"); //加载CSS

var nga_edit_tmpshot = [];
var nga_edit_tmpshot_i = 0;
var nga_edit_mojo_check = new nga_plug_local_data("nga_edit_mojo_check");
var nga_edit_custom_mojo = new nga_plug_local_data("nga_edit_custom_mojo");
var nga_edit_quick_mojo = new nga_plug_local_data("nga_edit_quick_mojo");

function nga_edit_Initialization(){
	nga_plug_addmsg("nga_edit","NGA UBB编辑器插件","添加测试功能：所见即所得编辑，原“编辑”标签修改为“代码”标签，原“编辑”标签为所见即所得编辑模式。\n提示：1.部分代码暂不支持所见即所得模式（如code代码）这种类型的代码在所见即所得模式下依然显示源代码。\
	\n2.如在所见即所得编辑模式下编辑后造成代码错乱（部分换行消失不算）请在UBB（代码）模式下撤销至之前的内容即可，并请将之前的内容以code代码包含后发至交流贴以便修复BUG。");

	nga_edit_mojo_check.load();
	nga_edit_mojo_check.data = nga_edit_mojo_check.data || [];
	
	nga_edit_custom_mojo.load();
	nga_edit_custom_mojo.data = nga_edit_custom_mojo.data || [{title:"自定义",id:"custom",check:true,img:[]}];
	
	nga_edit_quick_mojo.load();
	nga_edit_quick_mojo.data = nga_edit_quick_mojo.data || [];
	
	nga_plug_mojo.unshift({autoor:"LinTx",data:nga_edit_custom_mojo.data})
	
	nga_plug_setting("add","表情开关设置","nga_edit_mojo_check");   //将表情开关设置加入统一导入导出设置
	nga_plug_setting("add","自定义表情","nga_edit_custom_mojo");   //将自定义表情加入统一导入导出设置
	nga_plug_setting("add","最后使用的表情","nga_edit_quick_mojo");   //将最后使用的表情加入统一导入导出设置
	var m = [{
		title:"系统",
		alt:["s:1","s:2","s:3","s:4","s:5","s:6","s:7","s:8","s:34","s:32","s:33","s:30","s:29","s:28","s:27","s:26","s:25","s:24","s:35","s:36","s:37","s:38","s:39","s:40","s:41","s:42","s:43"],
		img:["http://img4.ngacn.cc/ngabbs/post/smile/smile.gif","http://img4.ngacn.cc/ngabbs/post/smile/mrgreen.gif","http://img4.ngacn.cc/ngabbs/post/smile/question.gif","http://img4.ngacn.cc/ngabbs/post/smile/wink.gif","http://img4.ngacn.cc/ngabbs/post/smile/redface.gif","http://img4.ngacn.cc/ngabbs/post/smile/sad.gif","http://img4.ngacn.cc/ngabbs/post/smile/cool.gif","http://img4.ngacn.cc/ngabbs/post/smile/crazy.gif","http://img4.ngacn.cc/ngabbs/post/smile/14.gif","http://img4.ngacn.cc/ngabbs/post/smile/12.gif","http://img4.ngacn.cc/ngabbs/post/smile/13.gif","http://img4.ngacn.cc/ngabbs/post/smile/10.gif","http://img4.ngacn.cc/ngabbs/post/smile/09.gif","http://img4.ngacn.cc/ngabbs/post/smile/08.gif","http://img4.ngacn.cc/ngabbs/post/smile/07.gif","http://img4.ngacn.cc/ngabbs/post/smile/06.gif","http://img4.ngacn.cc/ngabbs/post/smile/05.gif","http://img4.ngacn.cc/ngabbs/post/smile/04.gif","http://img4.ngacn.cc/ngabbs/post/smile/15.gif","http://img4.ngacn.cc/ngabbs/post/smile/16.gif","http://img4.ngacn.cc/ngabbs/post/smile/17.gif","http://img4.ngacn.cc/ngabbs/post/smile/18.gif","http://img4.ngacn.cc/ngabbs/post/smile/19.gif","http://img4.ngacn.cc/ngabbs/post/smile/20.gif","http://img4.ngacn.cc/ngabbs/post/smile/21.gif","http://img4.ngacn.cc/ngabbs/post/smile/22.gif","http://img4.ngacn.cc/ngabbs/post/smile/23.gif"]
	}];
	nga_plug_mojo.unshift({autoor:"NGA",data:m})
	
	var txtisfocus = false;
	if (document.activeElement.id == "atc_content") txtisfocus = true;
	var nga_edit_pathname = location.pathname;
	if(nga_edit_pathname == '/post.php'){
		var t_td = document.getElementById('atc_content').parentNode;
		try{document.getElementById("postform").appendChild(document.getElementById("atc_content"));}catch(e){}
		t_td.innerHTML = nga_edit_gettabhtml();
		try{document.getElementById("nga_edit_content").appendChild(document.getElementById("atc_content"));}catch(e){}
		document.getElementById("atc_content").style.width="99%";
		document.getElementById("post_preview").style.display="inline";
		document.getElementById("post_preview").style.padding="0";
	}else if(nga_edit_pathname == '/read.php' || nga_edit_pathname == '/thread.php'){
		if (document.getElementById("atc_content")){
			var nga_edit_divEl = document.createElement("div");
			nga_edit_divEl.innerHTML = nga_edit_gettabhtml();
			try{
				document.getElementById("atc_content").parentNode.insertBefore(nga_edit_divEl,document.getElementById("atc_content"));
				document.getElementById("nga_edit_content").appendChild(document.getElementById("atc_content"));
				document.getElementById("atc_content").style.width="99%";
				document.getElementById("post_preview").style.display="inline";
				document.getElementById("post_preview").style.padding="0";
			}catch(e){};
		}
	}
	if(nga_edit_pathname != '/'){
		try{
			document.getElementById("nga_edit_content").parentNode.parentNode.parentNode.getElementsByTagName("li")[3].onclick=function(){
				nga_plug_tab_setTab(this,2);
				postfunc.preview = document.getElementById("post_preview");
				postfunc.preview.innerHTML = postfunc.content.value.replace(/\n/g,'<br>');
				ubbcode.bbsCode({c:postfunc.preview,tId:Math.floor(Math.random()*10000),pId:Math.floor(Math.random()*10000),authorId:__CURRENT_UID,rvrc:__GP['rvrc'],isLesser:__GP['lesser']});
			};
			document.getElementById("nga_edit_content").parentNode.parentNode.parentNode.getElementsByTagName("li")[2].onclick=function(){
				nga_plug_tab_setTab(this,1);
				postfunc.preview = document.getElementById("post_edit");
				postfunc.preview.innerHTML = postfunc.content.value.replace(/\n/g,'<br>');
				postfunc.preview.innerHTML = nga_edit_ubb2ubb(postfunc.preview.innerHTML,1);  //将不转换的UBB代码加感叹号
				ubbcode.bbsCode({c:postfunc.preview,tId:Math.floor(Math.random()*10000),pId:Math.floor(Math.random()*10000),authorId:__CURRENT_UID,rvrc:__GP['rvrc'],isLesser:__GP['lesser']});
				postfunc.preview.innerHTML = nga_edit_ubb2ubb(postfunc.preview.innerHTML,2);  //将没有转换的UBB代码的感叹号取消
			};
			document.getElementById("post_edit").onblur=function(){
				//alert(this.id);  //可编辑DIV失去焦点时触发，此处应执行html到ubb代码的转换
				nga_edit_settmpshot()
				document.getElementById("atc_content").value = nga_edit_html2ubb(this.innerHTML);
				nga_edit_settmpshot()
				return true;
			}
			document.getElementById("atc_content").onkeyup = function(event){nga_edit_setshot('up');postfunc.inputchar(event,this);}
			document.getElementById("atc_content").onkeydown = function(e){
				nga_edit_setshot('down');
				var e = e || window.event;
				var keyCode = e.which ? e.which : e.keyCode;
				if (e.altKey && keyCode == 83){
					postfunc.post_v2();
				}
				postfunc.quickpost(e);
			}
			try{if (txtisfocus) document.getElementById('atc_content').focus();}catch(e){};
		}catch(e){};
	}
	
	if (!document.getElementById("nga_edit_PreviewImgDiv")){
		var tmpdiv1 = document.createElement("div");
		tmpdiv1.id = "nga_edit_PreviewImgDiv";
		tmpdiv1.style.display = "none";
		tmpdiv1.style.background = "#FEF3D1";
		tmpdiv1.style.position = "absolute";
		tmpdiv1.style.zIndex = 11;
		tmpdiv1.style.border = "1px solid #A70";
		tmpdiv1.style.boxShadow = "5px 5px 5px #444";
		tmpdiv1.onmousemove = function(){document.getElementById("nga_edit_PreviewImgDiv").style.display = "none"}
		document.body.appendChild(tmpdiv1);
	}
	
	try{document.getElementById("m_nav").getElementsByTagName("div")[1].style.zIndex = "2";}catch(e){};
	try{document.getElementById("b_nav").getElementsByTagName("div")[1].style.zIndex = "2";}catch(e){};
	var x = new nga_plug_tab();
	x.add("表情开关",'<div class="nga_plug_table_tab_div"><input type="button" onclick="this.parentNode.innerHTML=nga_edit_getmojocheckhtml();" value="加载设置界面"></div>');
	//x.add("表情开关",'<div class="nga_plug_table_tab_div">'+nga_edit_getmojocheckhtml()+'</div>');
	var t = x.gethtml();
	nga_plug_table_addTab("表情设置",t);
	
}

//打开编辑框时给UBB代码做转换以防止不支持编辑的UBB代码转换为HTML代码
function nga_edit_ubb2ubb(html,act){
	var regs = [];
	var thtml = html;
	regs.push(act==1?/\[dice\][\s\S]*?\[\/dice\]/ig:/\[!dice\][\s\S]*?\[!\/dice\]/ig);  //投骰子
	regs.push(act==1?/\[@[\s\S]*?\]/ig:/\[!@[\s\S]*?\]/ig);  //发送提醒 @
	regs.push(act==1?/\[t\.178\.com[\s\S]*?\]/ig:/\[!t\.178\.com[\s\S]*?\]/ig);  //178尾巴
	regs.push(act==1?/\[collapse[\s\S]*?\[\/collapse\]/ig:/\[!collapse[\s\S]*?\[!\/collapse\]/ig);  //折叠的内容
	regs.push(act==1?/\[album[\s\S]*?\[\/album\]/ig:/\[!album[\s\S]*?\[!\/album\]/ig);   //相册
	regs.push(act==1?/\[flash\][\s\S]*?\[\/flash\]/ig:/\[!flash\][\s\S]*?\[!\/flash\]/ig);  //flash
	regs.push(act==1?/\[code[\s\S]*?\[\/code\]/ig:/\[!code[\s\S]*?\[!\/code\]/ig);   //插入代码
	regs.push(act==1?/\[tid[\s\S]*?\[\/tid\]/ig:/\[!tid[\s\S]*?\[!\/tid\]/ig);   //主题
	regs.push(act==1?/\[pid[\s\S]*?\[\/pid\]/ig:/\[!pid[\s\S]*?\[!\/pid\]/ig);  //回复
	regs.push(act==1?/\[customachieve\][\s\S]*?\[\/customachieve\]/ig:/\[!customachieve\][\s\S]*?\[!\/customachieve\]/ig);  //自定义成就
	regs.push(act==1?/\[url\][\s\S]*?#armory\[\/url\]/ig:/\[!url\][\s\S]*?#armory\[!\/url\]/ig);   //D3人物
	regs.push(act==1?/\[crypt\][\s\S]*?\[\/crypt\]/ig:/\[!crypt\][\s\S]*?\[!\/crypt\]/ig);  //加密内容
	regs.push(act==1?/\[randomblock\][\s\S]*?\[\/randomblock\]/ig:/\[!randomblock\][\s\S]*?\[!\/randomblock\]/ig);   //随机段落
	regs.push(act==1?/\[cnarmory[\s\S]*?\]/ig:/\[!cnarmory[\s\S]*?\]/ig);    //魔兽任务
	regs.push(act==1?/\[item[\s\S]*?\[[\s\S]*?\]\]/ig:/\[!item[\s\S]*?\[[\s\S]*?\]\]/ig);   //魔兽物品1
	regs.push(act==1?/\[item[\s\S]*?\[\/item\]/ig:/\[!item[\s\S]*?\[!\/item\]/ig);  //魔兽物品2
	regs.push(act==1?/\[achieve[\s\S]*?\[[\s\S]*?\]\]/ig:/\[!achieve[\s\S]*?\[[\s\S]*?\]\]/ig);   //魔兽成就1
	regs.push(act==1?/\[achieve[\s\S]*?\[\/achieve\]/ig:/\[!achieve[\s\S]*?\[!\/achieve\]/ig);  //魔兽成就2
	regs.push(act==1?/\[spell[\s\S]*?\[[\s\S]*?\]\]/ig:/\[!spell[\s\S]*?\[[\s\S]*?\]\]/ig);  //魔兽法术1
	regs.push(act==1?/\[spell[\s\S]*?\[\/spell\]/ig:/\[!spell[\s\S]*?\[!\/spell\]/ig);  //魔兽法术2
	regs.push(act==1?/\[headline[\s\S]*?\[\/headline\]/ig:/\[!headline[\s\S]*?\[!\/headline\]/ig);  //目录
	regs.push(act==1?/\[murtopic[\s\S]*?\]/ig:/\[!murtopic[\s\S]*?\]/ig);  //近期用户推荐主题
	regs.push(act==1?/\[lessernuke[\s\S]*?\[\/lessernuke\]/ig:/\[!lessernuke[\s\S]*?\[!\/lessernuke\]/ig);  //禁言
	for (var i=0;i<regs.length;i++){
		if (act ==1){
			thtml = thtml.replace(regs[i],function($0){return $0.replace(/\[/gi,"[!")});
		}else if(act ==2){
			thtml = thtml.replace(regs[i],function($0){return $0.replace(/\[!/gi,"[")});
		}
	}
	return thtml;
}

//html代码转换为ubb代码
function nga_edit_html2ubb(html){
	var c = html;
	//nga_plug_mojo[0].data[0].img
	c = c.replace(/\n/g,"<br>");
	//c = c.replace()
	//c = c.replace(/<span class="urltip.*?<\/span>/gi,"");
	//c = c.replace(/<span.*?style="display:none">.*?<\/span>/gi,"");
	//c = c.replace(/<span class="chocolate">.*?<\/span>/gi,"");
	if (/<span class="silver">\[<\/span>.*?(<a.*?>.*?<\/a>).*?<span class="silver">\]<\/span>/.test(c)){
		c = c.replace(/<span class="silver">\[<\/span>.*?(<a.*?>.*?<\/a>).*?<span class="silver">\]<\/span>/gi,function($0,$1){return $1});
	}
	while (/<span(.*?)>(.*?)<\/span>/i.test(c)){
		c = c.replace(/(.*)<span(.*?)>(.*?)<\/span>/i,function($0,$1,$2,$3){
			if (/class/i.test($2)){
				var tc = /class="(.*?)"/gi.exec($2)[1];
				if (eval('/"' + tc + '"/i').test('"skyblue""royalblue""blue""darkblue""orange""orangered""crimson""red""firebrick""darkred""green""limegreen""seagreen""teal""deeppink""tomato""coral""purple""indigo""burlywood""sandybrown""sienna""chocolate""silver"')){
					return $1 + "[color=" + tc + "]" + $3 + "[/color]";
				}else{
					if (/urltip/i.test($2)) return $1;
					if (/class="chocolate"/i.test($2)) return $1;
					return $1 + $3;
				}
			}
			if (/font-size/i.test($2)){
				return $1 + "[size=" + /font-size:(.*?)%/gi.exec($2)[1] + "%]" + $3 + "[/size]";
			}
			if (/font-family/i.test($2)){
				return $1 + "[font=" + /font-family:(.*?)"/gi.exec($2)[1] + "]" + $3 + "[/font]";
			}
			if (/display:none/i.test($2)) return $1;
			return $1 + $3;
		});
		//alert(c)
	}
	c = c.replace(/<img.*?src="(.*?)".*?>/gi,function($0,$1){
		for (var i=0;i<nga_plug_mojo[0].data[0].img.length;i++){
			if ($1.toLowerCase() == nga_plug_mojo[0].data[0].img[i].toLowerCase()){
				return "[" + nga_plug_mojo[0].data[0].alt[i] + "]";
			}
		}
		return "[img]" + $1 + "[/img]";
	});
	c = c.replace(/<b>(.*?)<\/b>/gi,function($0,$1){return "[b]"+$1+"[/b]"});
	c = c.replace(/<u>(.*?)<\/u>/gi,function($0,$1){return "[u]"+$1+"[/u]"});
	c = c.replace(/<i .*?>(.*?)<\/i>/gi,function($0,$1){return "[i]"+$1+"[/i]"});
	c = c.replace(/<del .*?>(.*?)<\/del>/gi,function($0,$1){return "[del]"+$1+"[/del]"});
	while (/<div(.*?)>(.*?)<\/div>/i.test(c)){
		c = c.replace(/(.*)<div(.*?)>(.*?)<\/div>/i,function($0,$1,$2,$3){
			if ($2.indexOf('style="text-align:left"') >=0) return $1 + "[align=left]" + $3 + "[/align]";
			if ($2.indexOf('style="text-align:center"') >=0) return $1 + "[align=center]" + $3 + "[/align]";
			if ($2.indexOf('style="text-align:right"') >=0) return $1 + "[align=right]" + $3 + "[/align]";
			if ($2.indexOf('class="left"') >=0) return $1 + "[l]" + $3 + "[/l]";
			if ($2.indexOf('class="right"') >=0) return $1 + "[r]" + $3 + "[/r]";
			if ($2.indexOf('class="quote"') >=0) return $1 + "[quote]" + $3 + "[/quote]";
			return $1 + $3;
			//if ($3)
			//return $0;
		});
	}
	c = c.replace(/<h4(.*?)>(.*?)<\/h4>/gi,function($0,$1,$2){
		if ($1) return "===" + $2 + "===";
		return "[h]" + $2 + "[/h]";
	});
	c = c.replace(/<a.*?href="(.*?)"(.*?)>(.*?)<\/a>/gi,function($0,$1,$2,$3){
		if ($2.indexOf("onmouseover")>=0) return "[url=" + $1 + "]" + $3 + "[/url]";
		return "[url]" + $1 + "[/url]"
	})
	while (/<(ul|ol.*?)>(.*?)<\/(u|o)l>/i.test(c)){
		c = c.replace(/(.*)<(ul|ol.*?)>(.*?)<\/(u|o)l>/i,function($0,$1,$2,$3){
			var li = $3.replace(/<li>(.*?)(<\/li>)/gi,function($0,$1){return "[*]" + $1});
			if ($2!="ul"){
				return $1 + "[list=" + $2.replace(/.*?type="(.*?)"/,function($0,$1){return $1}) + "]" + li + "[/list]";
			}else{
				return $1 + "[list]" + li + "[/list]"
			}
			//return $1 + "[list]" + $3.replace(/<li>(.*?)(<\/li>)/gi,function($0,$1){return "[*]" + $1}) + "[/list]"
		})
	}
	while(/<table.*?>.*?<tbody>(.*?)<\/tbody>.*?<\/table>/.test(c)){
		c = c.replace(/(.*)<table.*?>.*?<tbody>(.*?)<\/tbody>.*?<\/table>/i,function($0,$1,$2){
			$2 = $2.replace(/<tr>(.*?)<\/tr>/gi,function($0,$1){
				$1 = $1.replace(/<td(.*?)>(.*?)<\/td>/gi,function($0,$1,$2){
					var td = "[td";
					if ($1.indexOf("rowspan=")>=0){
						td += " rowspan" + /rowspan="(.*?)"/gi.exec($1)[1]
					}
					if ($1.indexOf("colspan=")>=0){
						td += " colspan" + /colspan="(.*?)"/gi.exec($1)[1]
					}
					if ($1.indexOf("width:")>=0){
						td += " width" + /width:(.*?)%/gi.exec($1)[1]
					}
					return td + "]" + $2 + "[/td]";
				})
				return "[tr]" + $1 + "[/tr]";
			})
			return $1 + "[table]" + $2 + "[/table]";
		})
	}
	c = c.replace(/<br\/?>/ig,"\n")
	return c;
}

//获取并设置默认表情开启状态
function nga_edit_setallmojocheck(){
	for (var m=0;m<nga_plug_mojo.length;m++){
		for (var n=0;n<nga_plug_mojo[m].data.length;n++){
			try{
				for (var i=0;i<nga_edit_mojo_check.data.length;i++){
					if (nga_edit_mojo_check.data[i].autoor == nga_plug_mojo[m].autoor){
						for (var k=0;k<nga_edit_mojo_check.data[i].data.length;k++){
							if (nga_edit_mojo_check.data[i].data[k].id == nga_plug_mojo[m].data[n].id) nga_plug_mojo[m].data[n].check = nga_edit_mojo_check.data[i].data[k].check;
						}
					}
				}
			}catch(e){}
		}
	}
}

//加载表情设置选项
function nga_edit_getmojocheckhtml(){
	nga_edit_setallmojocheck();
	var s = '<input type="button" onclick="this.parentNode.innerHTML=nga_edit_getmojocheckhtml();" value="重新加载设置界面">';
	for (var i=1;i<nga_plug_mojo.length;i++){
		s += '<div style="margin-top:10px;border-bottom:1px solid #777;text-align:left;width:607px;"><span class="green">表情作者：'+nga_plug_mojo[i].autoor+'</span></div>';
		for (var k=0;k<nga_plug_mojo[i].data.length;k++){
			s += '<table class="nga_plug_plugcon"><tbody><tr><td><input onclick="nga_edit_setmojocheck(\''+nga_plug_mojo[i].autoor+'\',\''+nga_plug_mojo[i].data[k].id+'\',this.checked)" name="check" type="checkbox" '+c(nga_plug_mojo[i].data[k].check)+' title="是否启用该表情">是否启用表情：'+nga_plug_mojo[i].data[k].title+'</td></tr></tbody></table>';
		}
	}
	return s;
	function c(p){
		if (p) return "checked"; else return "";
	}

}

//设置并保存表情开启状态
function nga_edit_setmojocheck(autoor,id,check){
	var hautoor = false;
	var hid = false;
	if (typeof(nga_edit_mojo_check.data) == "object"){
		for (var i=0;i<nga_edit_mojo_check.data.length;i++){
			if (nga_edit_mojo_check.data[i].autoor == autoor){
				hautoor = true;
				if (typeof(nga_edit_mojo_check.data[i].data) == "object"){
					for (var k=0;k<nga_edit_mojo_check.data[i].data.length;k++){
						if (nga_edit_mojo_check.data[i].data[k].id == id){
							hid = true;
							nga_edit_mojo_check.data[i].data[k].check = check;
							nga_edit_mojo_check.save();
						}
					}
				}else{
					nga_edit_mojo_check.data[i].data = [];
				}
				if (!hid){
					nga_edit_mojo_check.data[i].data.push({id:id,check:check});
					nga_edit_mojo_check.save();
				}
			}
		}
	}else{
		nga_edit_mojo_check.data = [];
	}
	if (!hautoor){
		nga_edit_mojo_check.data.push({autoor:autoor,data:[{id:id,check:check}]});
		nga_edit_mojo_check.save();
	}
	nga_edit_setallmojocheck();
	//function c(autoor,)
}
//postfunc.content.value.length  //帖子长度

//撤销重做之定时保存数据
function nga_edit_setshot(act){
	if (act == "up"){
		try{clearTimeout(nga_edit_timer);}catch(e){};
		nga_edit_timer = setTimeout(nga_edit_settmpshot,1500);
	}else if(act == "down"){
		try{clearTimeout(nga_edit_timer);}catch(e){};
	}
}
function nga_edit_settmpshot(){	//保存数据
	if (nga_edit_tmpshot.length - nga_edit_tmpshot_i < 2){
		if(nga_edit_tmpshot[nga_edit_tmpshot_i] != document.getElementById('atc_content').value && document.getElementById('atc_content').value != ''){
			nga_edit_tmpshot.push(document.getElementById('atc_content').value);
			nga_edit_tmpshot_i = nga_edit_tmpshot.length - 1;
			if (nga_edit_tmpshot.length > 1) nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"),true);
		}
	}else{
		if(nga_edit_tmpshot[nga_edit_tmpshot_i] != document.getElementById('atc_content').value && document.getElementById('atc_content').value != ''){
			nga_edit_tmpshot[nga_edit_tmpshot_i+1] = document.getElementById('atc_content').value;
			nga_edit_tmpshot.length = nga_edit_tmpshot_i + 2;
			nga_edit_tmpshot_i = nga_edit_tmpshot.length - 1;
			nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_huifu"),false);
			if (nga_edit_tmpshot.length > 1) nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"),true);
		}
	}
}

//构建TAB内容
function nga_edit_gettabhtml(){
	var t_html = "";
	t_html += '<div class="nga_edui_box">';
	t_html += ' <div class="nga_edui_box1">';
	t_html += '   <div id="nga_edit_icon_chexiao" onclick="nga_edit_icon_click(this,\'chexiao\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="撤销一次操作" class="nga_edui_icon nga_edui_chexiao nga_edui_disabled"></div>';
	t_html += '   <div id="nga_edit_icon_huifu" onclick="nga_edit_icon_click(this,\'huifu\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="重做一次操作" class="nga_edui_icon nga_edui_huifu nga_edui_disabled"></div>';
	t_html += '   <div class="nga_edui_icon nga_edui_fenge"></div>';
	t_html += '   <div id="nga_edit_icon_mojo" onclick="event.cancelBubble = true;nga_edit_icon_click(this,\'mojo\');" onmouseover="nga_edit_icon_hover(this,\'move\');var td = document.getElementById(\'nga_edit_quickmojo\');td.style.display = \'block\';td.style.left = nga_plug_elementLeft(this) + 1 + \'px\';td.style.top = nga_plug_elementTop(this) + 23 + \'px\';try{clearTimeout(nga_edit_timer_lists);}catch(e){};" onmouseout="nga_edit_icon_hover(this,\'out\',\'quickmojo\');" title="表情" class="nga_edui_icon nga_edui_mojo">\
					<div id="nga_edit_quickmojo" style="display:none;position : absolute;background-color:#FFF8E5;cursor :default;width:132px;border: 1px solid #777;z-index:3;">'
		for (var i=0;i<nga_edit_quick_mojo.data.length;i++){
		//for (var i=0;i<9;i++){
			t_html += '<img onclick="event.cancelBubble = true;nga_edit_mojo(\'click\',this,event,\'quick\');" style="border:1px solid #777;margin:1px;cursor:pointer;width:40px;height:40px;" onmouseover="nga_edit_mojo(\'over\',this,event);" onmouseout="nga_edit_mojo(\'out\',this);" alt="'+nga_edit_quick_mojo.data[i]+'" src="'+nga_edit_quick_mojo.data[i]+'">';
		}
	t_html += '		</div></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'B\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="粗体" class="nga_edui_icon nga_edui_fb"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'I\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="斜体" class="nga_edui_icon nga_edui_fi"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'U\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="下划线" class="nga_edui_icon nga_edui_fu"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'DEL\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="删除线" class="nga_edui_icon nga_edui_fd"></div>';
	t_html += '   <div class="nga_edui_icon nga_edui_fenge"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'left\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="左对齐" class="nga_edui_icon nga_edui_l"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'center\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="中对齐" class="nga_edui_icon nga_edui_b"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'right\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="右对齐" class="nga_edui_icon nga_edui_r"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'l\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="左浮动" class="nga_edui_icon nga_edui_fl"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'r\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="右浮动" class="nga_edui_icon nga_edui_fr"></div>';
	t_html += '   <div class="nga_edui_icon nga_edui_fenge"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'h\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="段落标题" class="nga_edui_icon nga_edui_h"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'roll\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="投骰子" class="nga_edui_icon nga_edui_roll"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'msg\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="发送提醒" class="nga_edui_icon nga_edui_msg"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'t\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="发送178尾巴" class="nga_edui_icon nga_edui_t"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'pse\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入折叠的内容" class="nga_edui_icon nga_edui_pse"></div>';
	t_html += '   <div class="nga_edui_icon nga_edui_fenge"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'link\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入链接" class="nga_edui_icon nga_edui_link"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'img\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入图片" class="nga_edui_icon nga_edui_img"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'album\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入相册" class="nga_edui_icon nga_edui_album"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'flash\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入视频（仅限于youtube.com/tudou.com/youku.com等站点）" class="nga_edui_icon nga_edui_flash"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'heng\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入分割线" class="nga_edui_icon nga_edui_heng"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'quote\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入引用" class="nga_edui_icon nga_edui_quote"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'code\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入代码" class="nga_edui_icon nga_edui_code"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'lists\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入无序列表" class="nga_edui_icon nga_edui_lists"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'listsa\');" onmouseover="nga_edit_icon_hover(this,\'move\',\'option\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入有序列表" class="nga_edui_icon nga_edui_listsa">\
					<div id="nga_edit_listselectdiv" style="display:none;position : absolute;background-color:#FFF8E5;cursor :default;width:120px;border: 1px solid #777;" onmouseover="nga_edit_icon_hover(this,\'move\',\'option\');" onmouseout="nga_edit_icon_hover(this.parentNode,\'out\',\'option\');">\
						<div style="border:1px solid #FFF8E5;padding-left: 20px; padding-top: 1px; padding-bottom: 1px;" onclick="nga_edit_icon_click(this,\'listsa\',\'1\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入序号为1,2,3的列表">1,2,3</div>\
						<div style="border:1px solid #FFF8E5;padding-left: 20px; padding-top: 1px; padding-bottom: 1px;" onclick="nga_edit_icon_click(this,\'listsa\',\'a\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入序号为a,b,c的列表">a,b,c</div>\
						<div style="border:1px solid #FFF8E5;padding-left: 20px; padding-top: 1px; padding-bottom: 1px;" onclick="nga_edit_icon_click(this,\'listsa\',\'A\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入序号为A,B,C的列表">A,B,C</div>\
						<div style="border:1px solid #FFF8E5;padding-left: 20px; padding-top: 1px; padding-bottom: 1px;" onclick="nga_edit_icon_click(this,\'listsa\',\'i\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入序号为i,ii,iii的列表">i,ii,iii</div>\
						<div style="border:1px solid #FFF8E5;padding-left: 20px; padding-top: 1px; padding-bottom: 1px;" onclick="nga_edit_icon_click(this,\'listsa\',\'I\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入序号为I,II,III的列表">I,II,III</div>\
					</div></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'table\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入表格" class="nga_edui_icon nga_edui_table"></div>';
	t_html += '   <div class="nga_edui_icon nga_edui_fenge"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'tid\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入主题" class="nga_edui_icon nga_edui_tid"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'pid\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入回复" class="nga_edui_icon nga_edui_pid"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'customachieve\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入自定义成就" class="nga_edui_icon nga_edui_customachieve"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'db3\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入Diablo3人物信息" class="nga_edui_icon nga_edui_db3"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'crypt\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入加密的内容" class="nga_edui_icon nga_edui_crypt"></div>';
	t_html += '   <div onclick="nga_edit_icon_click(this,\'randomblock\');" onmouseover="nga_edit_icon_hover(this,\'move\');" onmouseout="nga_edit_icon_hover(this,\'out\');" title="插入随机段落" class="nga_edui_icon nga_edui_randomblock"></div>';
	t_html += ' </div>';
	t_html += ' <div class="nga_edui_box1">';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'font\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">字体</option>';
	t_html += '		<option value="simsun">宋体</option>';
	t_html += '		<option value="simhei">黑体</option>';
	t_html += '		<option value="Arial">Arial</option>';
	t_html += '		<option value="Arial Black">Arial Black</option>';
	t_html += '		<option value="Book Antiqua">Book Antiqua</option>';
	t_html += '		<option value="Century Gothic">Century Gothic</option>';
	t_html += '		<option value="Comic Sans MS">Comic Sans MS</option>';
	t_html += '		<option value="Courier New">Courier New</option>';
	t_html += '		<option value="Georgia">Georgia</option>';
	t_html += '		<option value="Impact">Impact</option>';
	t_html += '		<option value="Tahoma">Tahoma</option>';
	t_html += '		<option value="Times New Roman">Times New Roman</option>';
	t_html += '		<option value="Trebuchet MS">Trebuchet MS</option>';
	t_html += '		<option value="Script MT Bold">Script MT Bold</option>';
	t_html += '		<option value="Stencil">Stencil</option>';
	t_html += '		<option value="Verdana">Verdana</option>';
	t_html += '		<option value="Lucida Console">Lucida Console</option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'size\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">字号</option>';
	t_html += '		<option value="100%">100%</option>';
	t_html += '		<option value="110%">110%</option>';
	t_html += '		<option value="120%">120%</option>';
	t_html += '		<option value="130%">130%</option>';
	t_html += '		<option value="150%">150%</option>';
	t_html += '		<option value="200%">200%</option>';
	t_html += '		<option value="300%">300%</option>';
	t_html += '		<option value="400%">400%</option>';
	t_html += '		<option value="500%">500%</option>';
	t_html += '		<option value="700%">700%</option>';
	t_html += '		<option value="900%">900%</option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'color\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">颜色</option>';
	t_html += '		<option value="skyblue" style="background-color:skyblue">&nbsp; &nbsp; &nbsp; &nbsp;</option>';
	t_html += '		<option value="royalblue" style="background-color:royalblue;"></option>';
	t_html += '		<option value="blue" style="background-color:blue"></option>';
	t_html += '		<option value="darkblue" style="background-color:darkblue"></option>';
	t_html += '		<option value="orange" style="background-color:orange"></option>';
	t_html += '		<option value="orangered" style="background-color:orangered"></option>';
	t_html += '		<option value="crimson" style="background-color:crimson"></option>';
	t_html += '		<option value="red" style="background-color:red"></option>';
	t_html += '		<option value="firebrick" style="background-color:firebrick"></option>';
	t_html += '		<option value="darkred" style="background-color:darkred"></option>';
	t_html += '		<option value="green" style="background-color:green"></option>';
	t_html += '		<option value="limegreen" style="background-color:limegreen"></option>';
	t_html += '		<option value="seagreen" style="background-color:seagreen"></option>';
	t_html += '		<option value="teal" style="background-color:teal"></option>';
	t_html += '		<option value="deeppink" style="background-color:deeppink"></option>';
	t_html += '		<option value="tomato" style="background-color:tomato"></option>';
	t_html += '		<option value="coral" style="background-color:coral"></option>';
	t_html += '		<option value="purple" style="background-color:purple"></option>';
	t_html += '		<option value="indigo" style="background-color:indigo"></option>';
	t_html += '		<option value="burlywood" style="background-color:burlywood"></option>';
	t_html += '		<option value="sandybrown" style="background-color:sandybrown"></option>';
	t_html += '		<option value="sienna" style="background-color:sienna"></option>';
	t_html += '		<option value="chocolate" style="background-color:chocolate"></option>';
	t_html += '		<option value="silver" style="background-color:silver"></option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'armory\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">插入魔兽人物</option>';
	t_html += '		<option value="cn">国服人物</option>';
	t_html += '		<option value="tw">台服人物</option>';
	t_html += '		<option value="en">美服人物</option>';
	t_html += '		<option value="eu">欧盟人物</option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'item\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">插入魔兽装备</option>';
	t_html += '		<option value="cn">国服装备</option>';
	t_html += '		<option value="tw">台服装备</option>';
	t_html += '		<option value="en">美服装备</option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'achieve\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">插入魔兽成就</option>';
	t_html += '		<option value="cn">国服成就</option>';
	t_html += '		<option value="tw">台服成就</option>';
	t_html += '		<option value="en">美服成就</option>';
	t_html += '	</select>';
	t_html += '	<select class="nga_edui_list" onchange="nga_edit_icon_show(this,\'spell\',this.options[this.selectedIndex].value)">';
	t_html += '		<option value="" selected="">插入魔兽法术</option>';
	t_html += '		<option value="cn">国服法术</option>';
	t_html += '		<option value="tw">台服法术</option>';
	t_html += '		<option value="en">美服法术</option>';
	t_html += '	</select>';
	t_html += ' </div>';
	t_html += '</div>';
	
	var x = new nga_plug_tab();
	x.add("源码",'<div id="nga_edit_content">'+t_html+'</div>');
	x.add("编辑",'<div class="forumbox"><div class="postrow"><div class="c2" style="padding:6px;">	<div id="post_edit" contenteditable="true" class="c1 postcontent ubbcode" style="outline:none;margin: 5px 0px; padding: 0px; display: inline; "></div></div></div></div>');
	x.add("预览",'<div class="forumbox"><div class="postrow"><div class="c2" style="padding:6px;">	<div id="post_preview" class="c1 postcontent ubbcode" style="margin: 5px 0px; padding: 0px; display: inline; "></div></div></div></div>');
	
	t_html = x.gethtml();
	
	t_html += '<input type="checkbox" name="hidden">隐藏内容 仅版主可见 <input type="checkbox" name="self_reply">只有作者和版主可以回复<br>';
	return t_html;
}


//在大部分浏览器中实现在选中文字前后插入UBB标签后依然选中原来的文字（如无选中则保证添加完毕后光标处于添加的标签中间）
//textarea可以用getElementById之类函数获取的textarea，tag是标签，如'b'将添加[b]，如有value则添加[b=value]
function nga_edit_addTad(textarea,tag,value){  
	var start = 0,end = 0;
	if(typeof textarea.selectionStart != 'undefined'){
		start = textarea.selectionStart;
		end = textarea.selectionEnd;
	}
	if (value && tag != "nga_edit"){
		start += tag.length + value.length + 3;
		end += tag.length + value.length + 3;
		//postfunc.addTag(tag,value);   //http://img4.ngacn.cc/common_res/js_postcode.js
		postfunc.addText("["+tag+"="+value+"]"+postfunc.getSelectText()+"[/"+tag+"]");
	}else{
		if (tag == "nga_edit"){
			if (value == "@"){
				start += 2;
				end += 2;
				postfunc.addText("[@"+postfunc.getSelectText()+"]");
			}
		}else{
			start += tag.length + 2;
			end += tag.length + 2;
			//postfunc.addTag(tag);
			postfunc.addText("["+tag+"]"+postfunc.getSelectText()+"[/"+tag+"]");
		}
	}
	if(typeof textarea.selectionStart != 'undefined'){
		textarea.setSelectionRange(start, end);
		textarea.focus();
	}
}

function nga_edit_icon_show(obj,act,value){
	var textarea = document.getElementById('atc_content');
	if (act == "size" || act == "font" || act == "color"){
		nga_edit_addTad(textarea,act,value);
	}else if (act =="armory"){
		var nga_edit_s = nga_edit_prompt("请输入服务器名：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		var nga_edit_s1 = nga_edit_prompt("请输入玩家名：");
		if (nga_edit_s1 == "") return(obj.selectedIndex = 0);
		postfunc.addText("["+value+act+" "+nga_edit_s+" "+nga_edit_s1+"]");
	}else if (act =="item" || act =="achieve" || act =="spell"){
		var nga_edit_s = nga_edit_prompt("请输入 物品/成就 名称或者 物品/成就/法术 ID：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		if (isNaN(nga_edit_s)){
			if (act =="spell") return(obj.selectedIndex = 0);
			value = value=="cn"?"["+act+"]":"["+act+"="+value+"]";
			postfunc.addText(value+nga_edit_s+"[/"+act+"]");
		}else{
			var nga_edit_s1 = nga_edit_prompt("请输入自定义 物品/成就/法术 名称（可不输）：");
			if (nga_edit_s1 == ""){
				value = value=="cn"?"["+act+"]":"["+act+"="+value+"]";
				postfunc.addText(value+nga_edit_s+"[/"+act+"]");
			}else{
				value = value=="cn"?"["+act+"="+nga_edit_s+"]":"["+act+"="+nga_edit_s+","+value+"]";
				postfunc.addText(value+nga_edit_s1+"[/"+act+"]");
			}
		}
	}
	obj.selectedIndex = 0;
	nga_edit_settmpshot()
	try{textarea.focus();}catch(e){};
}

function nga_edit_icon_click(obj,act,o){
	var textarea = document.getElementById('atc_content');
	if (act == 'chexiao'){ //撤销
		if (nga_edit_icon_getEnabled(document.getElementById("nga_edit_icon_chexiao"))){
			nga_edit_tmpshot_i--;
			document.getElementById('atc_content').value = nga_edit_tmpshot[nga_edit_tmpshot_i];
			nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_huifu"),true);
			if (nga_edit_tmpshot_i == 0){
				nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"),false);
			}
		}
	}else if(act == 'huifu'){  //重做
		if (nga_edit_icon_getEnabled(document.getElementById("nga_edit_icon_huifu"))){
			nga_edit_tmpshot_i++;
			document.getElementById('atc_content').value = nga_edit_tmpshot[nga_edit_tmpshot_i];
			nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_chexiao"),true);
			if (nga_edit_tmpshot_i == nga_edit_tmpshot.length - 1){
				nga_edit_icon_setEnabled(document.getElementById("nga_edit_icon_huifu"),false);
			}
		}
		
	//              粗体          斜体           下划线        删除线         左浮动        右浮动      标题
	}else if(act == 'B' || act == 'I' || act == 'U' || act == 'DEL' || act == 'l' || act == 'r' || act == 'h'){
		nga_edit_addTad(textarea,act);
	}else if(act == 'left' || act == 'center' || act == 'right'){ //居于左中右
		nga_edit_addTad(textarea,"align",act);
	}else if(act == 'roll'){   //ROLL点
		postfunc.addText("[dice]d100[/dice]");
	}else if(act == 'msg'){    //打黑枪
		if (postfunc.getSelectText() == ""){
			var nga_edit_s = nga_edit_prompt("你要给谁发送提醒？");
			if (nga_edit_s!=""){
				postfunc.addText("[@"+nga_edit_s+"]");
			}
		}else{
			nga_edit_addTad(textarea,"nga_edit","@");
		}
	}else if(act == 'pse'){       //插入折叠内容
		if (postfunc.getSelectText() != ""){
			var nga_edit_s = nga_edit_prompt("请输入摘要（可不填）：");
			if (nga_edit_s!=""){
				nga_edit_addTad(textarea,"collapse",nga_edit_s);
			}else{
				nga_edit_addTad(textarea,"collapse");
			}
		}else{
			var nga_edit_s = nga_edit_prompt("请输入需要折叠的内容：");
			if (nga_edit_s == "") return;
			var nga_edit_s1 = nga_edit_prompt("请输入摘要（可不填）：");
			if (nga_edit_s1!=""){
				postfunc.addText("[collapse="+nga_edit_s1+"]"+nga_edit_s+"[/collapse]");
			}else{
				postfunc.addText("[collapse]"+nga_edit_s+"[/collapse]");
			}
		}
	}else if(act == 'link'){   //插入链接
		if (postfunc.getSelectText() != ""){
			var nga_edit_s = nga_edit_prompt("请输入链接地址：");
			if (nga_edit_s!=""){
				nga_edit_addTad(textarea,"url",nga_edit_s);
			}
		}else{
			var nga_edit_s = nga_edit_prompt("请输入链接地址：");
			if (nga_edit_s == "") return;
			var nga_edit_s1 = nga_edit_prompt("请输入链接文字（可不填）：");
			if (nga_edit_s1!=""){
				postfunc.addText("[url="+nga_edit_s+"]"+nga_edit_s1+"[/url]");
			}else{
				postfunc.addText("[url]"+nga_edit_s+"[/url]");
			}
		}
	}else if(act == 'img'){  //插入图片
		var nga_edit_s = nga_edit_prompt("请输入图片地址：");
		if (nga_edit_s == "") return;
		postfunc.addText("[img]"+nga_edit_s+"[/img]");
	}else if(act == 'flash'){  //插入视频
		var nga_edit_s = nga_edit_prompt("请输入视频地址（仅限于youtube.com/tudou.com/youku.com等站点的FLASH地址）：");
		if (nga_edit_s == "") return;
		postfunc.addText("[flash]"+nga_edit_s+"[/flash]");
	}else if(act == 'heng'){   //插入分割线
		var nga_edit_s = nga_edit_prompt("请输入分割线标题（可不填）：");
		postfunc.addText("==="+nga_edit_s+"===");
	}else if(act == 'quote'){  //插入引用
		if (postfunc.getSelectText() != ""){
			nga_edit_addTad(textarea,"quote");
		}else{
			var nga_edit_s = nga_edit_prompt("请输入引用内容：");
			if (nga_edit_s == "") return;
			postfunc.addText("[quote]"+nga_edit_s+"[/quote]");
		}
	}else if(act == 'code'){    //插入代码
		if (postfunc.getSelectText() != ""){
			nga_edit_addTad(textarea,"code");
		}else{
			var nga_edit_s = nga_edit_prompt("请输入代码内容：");
			if (nga_edit_s == "") return;
			postfunc.addText("[code]"+nga_edit_s+"[/code]");
		}
	}else if(act == 'lists'){   //插入列表
		var nga_edit_s;
		var t = 0;
		while (nga_edit_s!=""){
			nga_edit_s = nga_edit_prompt("请输入一个列表项目。\n\n留空或者点击取消以完成此列表：");
			if (nga_edit_s!=""){
				if (t == 0){
					nga_edit_addTad(textarea,"list");
					t = 1;
				}
				postfunc.addText("[*]"+nga_edit_s+"\n");
			}else{return;}
		}
	}else if(act == 'listsa'){
		if (!o){
			document.getElementById("nga_edit_listselectdiv").style.display = document.getElementById("nga_edit_listselectdiv").style.display == "none"?"block":"none";
			document.getElementById("nga_edit_listselectdiv").style.left = nga_plug_elementLeft(obj) + 1 + 'px';
			document.getElementById("nga_edit_listselectdiv").style.top = nga_plug_elementTop(obj) + 23 + 'px';
		}else{
			var nga_edit_s;
			var t = 0;
			while (nga_edit_s!=""){
				nga_edit_s = nga_edit_prompt("请输入一个列表项目。\n\n留空或者点击取消以完成此列表：");
				if (nga_edit_s!=""){
					if (t == 0){
						nga_edit_addTad(textarea,"list",o);
						t = 1;
					}
					postfunc.addText("[*]"+nga_edit_s+"\n");
				}else{return;}
			}
		}
	}else if(act == 'album'){  //插入相册
		var nga_edit_s;
		var t = 0;
		nga_edit_s = nga_edit_prompt("请输入相册标题。");
		nga_edit_s = nga_edit_s==""?null:nga_edit_s;
		//nga_edit_addTad(textarea,"album",nga_edit_s);
		while (nga_edit_s!=""){
			nga_edit_s = nga_edit_prompt("请输入一个图片地址。\n第一张图片将作为封面显示。\n留空或者点击取消以完成此相册：");
			//if (nga_edit_s!="")postfunc.addText(nga_edit_s+"\n");
			if (nga_edit_s!=""){
				if (t == 0){
					nga_edit_addTad(textarea,"album",nga_edit_s);
					t = 1;
				}
				postfunc.addText(nga_edit_s+"\n");
			}else{return;}
		}
	}else if(act == 't'){  //插入178尾巴
		var nga_edit_s = nga_edit_prompt("请输入用户ID（数字）以引用这个用户的最新一条消息，或者输入话题（非数字）以引用这个话题的讨论：");
		if (nga_edit_s == "") return;
		if (isNaN(nga_edit_s)){
			postfunc.addText("[t.178.com/#"+nga_edit_s+"#]");
		}else{
			postfunc.addText("[t.178.com/"+nga_edit_s+"]");
		}
	}else if(act == "tid" || act == "pid"){
		var nga_edit_s = nga_edit_prompt("请输入主题或者或者回复的ID：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		if (isNaN(nga_edit_s)){
			return(obj.selectedIndex = 0);
		}else{
			var nga_edit_s1 = nga_edit_prompt("请输入主题名称（可不输）：");
			if (nga_edit_s1 == ""){
				postfunc.addText("["+act+"]"+nga_edit_s+"[/"+act+"]");
			}else{
				postfunc.addText("["+act+"="+nga_edit_s+"]"+nga_edit_s1+"[/"+act+"]");
			}
		}
	}else if(act == "customachieve"){
		var nga_edit_s = nga_edit_prompt("请输入自定义成就名字（有字数限制）：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		var nga_edit_s1 = nga_edit_prompt("请输入自定义成就文字（有字数限制）：");
		if (nga_edit_s1 == "") return(obj.selectedIndex = 0);
		var nga_edit_s2 = nga_edit_prompt("请输入自定义成就图标（一个图片的绝地地址）：")
		var tmps = "[customachieve]\n[title]" + nga_edit_s + "[/title]\n[txt]" + nga_edit_s1 + "[/txt]\n";
		if (nga_edit_s2 != "") tmps += "[img]" + nga_edit_s2 + "[/img]\n";
		tmps += "[/customachieve]";
		postfunc.addText(tmps);
	}else if(act == "db3"){
		var nga_edit_s = nga_edit_prompt("请输入battle net中人物信息页面的地址：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		postfunc.addText("[url]" + nga_edit_s + "#armory[/url]");
	}else if(act == "crypt"){
		var nga_edit_s = nga_edit_prompt("请输入需要加密的内容：");
		if (nga_edit_s == "") return(obj.selectedIndex = 0);
		var nga_edit_s1 = nga_edit_prompt("请输入密码：");
		if (nga_edit_s1 == "") return(obj.selectedIndex = 0);
		if (nga_edit_s1.length<5){
			alert('请使用更长的密码')
			return(obj.selectedIndex = 0);
		}
		if (nga_edit_s1.match(/[^0-9A-Za-z_]/)){
			alert('请使用大小写字母或数字做密码');
			return(obj.selectedIndex = 0);
		}
		postfunc.addText("[crypt]"+ubbcode.crypt.c(ubbcode.crypt.rc4(nga_edit_s1,nga_edit_s))+"[/crypt]");
	}else if(act == "table"){
		nga_edit_table("create","",obj);
	}else if(act == "mojo"){
		document.getElementById("nga_edit_quickmojo").style.display = "none";
		nga_edit_mojo("create",obj);
	}else if(act == "randomblock"){
		var nga_edit_s;
		var t = 0;
		while (nga_edit_s!=""){
			nga_edit_s = nga_edit_prompt("请输入随机项目内容，换行使用“\\n”或者添加完后手动换行。\n\n留空或者点击取消以完成此列表：");
			//nga_edit_addTad(textarea,"randomblock",nga_edit_s);
			if (nga_edit_s != "") postfunc.addText("["+act+"]"+nga_edit_s+"[/"+act+"]\n");
		}
	}
	if (act != 'huifu' && act != 'chexiao') nga_edit_settmpshot();
	try{document.getElementById('atc_content').focus();}catch(e){};
}

//表情模块  创建选择表情窗口、预览、点击
function nga_edit_mojo(act,obj,e,autoor,id){
	if (act == "create"){
		nga_edit_setallmojocheck();
		if (document.getElementById('nga_edit_mojo')){
			document.getElementById('nga_edit_mojo').style.display = document.getElementById('nga_edit_mojo').style.display == "block" ? "none":"block";
			document.getElementById('nga_edit_mojo').style.left = nga_plug_elementLeft(obj) + 1 + 'px';
			document.getElementById('nga_edit_mojo').style.top = nga_plug_elementTop(obj) + 23 + 'px';
		}else{
			var tmpdiv = document.createElement("div");
			tmpdiv.id = "nga_edit_mojo";
			tmpdiv.className = "nga_edit_table";
			tmpdiv.style.left = nga_plug_elementLeft(obj) + 1 + 'px';
			tmpdiv.style.top = nga_plug_elementTop(obj) + 23 + 'px';
			tmpdiv.innerHTML = '<div style="padding:4px;">\
				<div style="width:100%;border-bottom:1px solid #777;">请选择表情  提示：按住CTRL键的同时点击表情可一次插入多个表情\
				<span style="float:right"><a href="javascript:void(0)" onclick="document.body.removeChild(document.getElementById(\'nga_edit_mojo\'));nga_edit_mojo(\'create\',document.getElementById(\'nga_edit_icon_mojo\'));">重载</a> <a href="javascript:void(0)" onclick="nga_edit_mojo(\'create\');">关闭</a></span></div>\
				<div id="nga_edit_mojo_b"></div></div>'
			document.body.appendChild(tmpdiv);
			nga_plug_HideDomOfClick('nga_edit_mojo');
			document.getElementById('nga_edit_mojo').style.display = "block";
			var x = new nga_plug_tab();
			var s;
			for (var i=0;i<nga_plug_mojo.length;i++){
				for (var k=0;k<nga_plug_mojo[i].data.length;k++){
					if (nga_plug_mojo[i].data[k].check || i == 0){
						s = "";
						for (var l=0;l<nga_plug_mojo[i].data[k].img.length;l++){
							s += '<div style="cursor:pointer;width:40px;height:40px;border:1px solid #777;margin-right:1px;margin-bottom:1px;display:inline-block;" onclick="nga_edit_mojo(\'click\',this,event,\''+nga_plug_mojo[i].autoor+'\',\''+nga_plug_mojo[i].data[k].id+'\');" onmouseover="nga_edit_mojo(\'over\',this,event);" onmouseout="nga_edit_mojo(\'out\',this);">';
							if (i>1) s += '<div onclick="event.cancelBubble = true;nga_edit_mojo(\'click\',this,\'add\');" title="把这个表情添加到自定义表情" style="display:none;position: absolute;background: url(\'http://ngaplugin.googlecode.com/svn/ngaplug/img/add.png\');height:15px;width:15px;border-right:1px solid #777;border-bottom:1px solid #777;"></div>';
							if (i==1) s += '<div onclick="event.cancelBubble = true;nga_edit_mojo(\'click\',this,\'del\');" title="从自定义表情中删除这个表情" style="display:none;position: absolute;background: url(\'http://ngaplugin.googlecode.com/svn/ngaplug/img/del.png\');height:15px;width:15px;border-right:1px solid #777;border-bottom:1px solid #777;"></div>';
							s += '<img style="width:40px;height:40px;" alt="'+(i==0?nga_plug_mojo[i].data[k].alt[l]:nga_plug_mojo[i].data[k].img[l])+'" src="'+nga_plug_mojo[i].data[k].img[l]+'"></div>';
						}
						var t = false;
						if (i==1){
							s += '<div title="手动添加自定义表情" style="cursor:pointer;width:40px;height:40px;border:1px solid #777;margin-right:1px;margin-bottom:1px;display:inline-block;" onclick="nga_edit_mojo(\'click\',this,\'add1\');">';
							s += '<img style="width:40px;height:40px;" src="http://ngaplugin.googlecode.com/svn/ngaplug/img/add1.png"></div>';
						}
						try{if (nga_edit_mojo_check.data[0].lastautoor == nga_plug_mojo[i].autoor && nga_edit_mojo_check.data[0].id == nga_plug_mojo[i].data[k].id) t = true;}catch(e){}
						x.add(nga_plug_mojo[i].data[k].title,s,t);
					}
				}
			}
			document.getElementById("nga_edit_mojo_b").innerHTML = x.gethtml();
		}
	}else if(act=="click"){
		//点击表情
		if (e=="add"){   //添加自定义表情
			var tsrc = obj.parentNode.getElementsByTagName("img")[0].src;
			for (var i=0;i<nga_edit_custom_mojo.data[0].img.length;i++){
				if (nga_edit_custom_mojo.data[0].img[i].toLowerCase() == tsrc.toLowerCase()){
					alert("该表情已经在自定义表情中了，不需要重复添加！");
					return;
				}
			}
			nga_edit_custom_mojo.data[0].img.push(tsrc);
			nga_edit_custom_mojo.save();
			nga_plug_mojo[1].data = nga_edit_custom_mojo.data;
			return;
		}else if(e=="add1"){    //手动输入网址添加自定义表情
			var nga_edit_s = nga_edit_prompt("请输入想添加的自定义表情网址：");
			if (nga_edit_s=="") return;
			for (var i=0;i<nga_edit_custom_mojo.data[0].img.length;i++){
				if (nga_edit_custom_mojo.data[0].img[i].toLowerCase() == nga_edit_s.toLowerCase()){
					alert("该表情已经在自定义表情中了，不需要重复添加！");
					return;
				}
			}
			nga_edit_custom_mojo.data[0].img.push(nga_edit_s);
			nga_edit_custom_mojo.save();
			nga_plug_mojo[1].data = nga_edit_custom_mojo.data;
			return;
		}else if(e=="del"){       //删除自定义表情
			if(!confirm( "确定要删除这个表情吗？")){
				return;
			}
			var tsrc = obj.parentNode.getElementsByTagName("img")[0].alt;
			for (var i=0;i<nga_edit_custom_mojo.data[0].img.length;i++){
				if (nga_edit_custom_mojo.data[0].img[i] == tsrc){
					nga_edit_custom_mojo.data[0].img.splice(i,1);
					nga_edit_custom_mojo.save();
					obj.parentNode.parentNode.removeChild(obj.parentNode);
					document.getElementById('nga_edit_PreviewImgDiv').style.display = 'none';
					nga_plug_mojo[1].data = nga_edit_custom_mojo.data;
					return;
				}
			}
		}
		if (obj.tagName.toLowerCase() == "div") obj = obj.getElementsByTagName("img")[0]
		if (obj.src != obj.alt){
			postfunc.addsmile('['+obj.alt+']');
		}else{
			postfunc.addsmile('[img]'+obj.src+'[/img]');
		}
		if (!e.ctrlKey && autoor != "quick") nga_edit_mojo("create");
		var isquickmojo = false;
		
		//快速表情
		for (var i=0;i<nga_edit_quick_mojo.data.length;i++){
			if (nga_edit_quick_mojo.data[i] == obj.alt || nga_edit_quick_mojo.data[i] == obj.src) isquickmojo = true;

		}
		if (!isquickmojo){
			var tsrc;
			if (autoor == "NGA"){
				tsrc = obj.src;
			}else{
				tsrc = obj.alt;
			}
			if (nga_edit_quick_mojo.data.length < 9){
				nga_edit_quick_mojo.data.push(tsrc);
			}else{
				for (var i=0;i<nga_edit_quick_mojo.data.length-1;i++){
					nga_edit_quick_mojo.data[i] = nga_edit_quick_mojo.data[i+1];
				}
				nga_edit_quick_mojo.data[8] = tsrc;
			}
			nga_edit_quick_mojo.save();
		}//快速表情完毕
		
		nga_edit_settmpshot();
		if (autoor != "quick"){
			if (nga_edit_mojo_check.data.length == 0){
				nga_edit_mojo_check.data.push({lastautoor:autoor,id:id});
			}else{
				if (nga_edit_mojo_check.data[0].id){
					nga_edit_mojo_check.data[0] = {lastautoor:autoor,id:id};
				}else{
					nga_edit_mojo_check.data.unshift({lastautoor:autoor,id:id});
				}
			}
			nga_edit_mojo_check.save();
		}
	}else if(act=="over"){
		var previewdiv = document.getElementById('nga_edit_PreviewImgDiv');
		try{clearTimeout(timer);}catch(e){};
		try{obj.getElementsByTagName("div")[0].style.display = 'block';}catch(e){};
		var tsrc;
		if (obj.tagName.toLowerCase() == "div") tsrc = obj.getElementsByTagName("img")[0].src; else tsrc = obj.src;
		previewdiv.innerHTML = "<img style='margin: 5px' src='" + tsrc + "' \/>";
		previewdiv.style.display = 'block';
		previewdiv.style.left = nga_plug_elementLeft(obj) + 1 + 'px';
		previewdiv.style.top = nga_plug_elementTop(obj) + 44 + 'px';
	}else if(act=="out"){
		var previewdiv = document.getElementById('nga_edit_PreviewImgDiv');
		try{obj.getElementsByTagName("div")[0].style.display = 'none';}catch(e){};
		timer = setTimeout("document.getElementById('nga_edit_PreviewImgDiv').style.display = 'none';",500);
	}
}

var nga_edit_table_o = new Array();
function nga_edit_table(act,value,obj){
	if (act == "create"){
		if (document.getElementById('nga_edit_table')){
			document.body.removeChild(document.getElementById('nga_edit_table'));
		}else{
			var tmpdiv = document.createElement("div");
			tmpdiv.id = "nga_edit_table";
			tmpdiv.className = "nga_edit_table";
			tmpdiv.style.left = nga_plug_elementLeft(obj.parentNode.getElementsByTagName("div")[0]) + 1 + 'px';
			tmpdiv.style.top = nga_plug_elementTop(obj) + 23 + 'px';
			tmpdiv.innerHTML = "<div style='padding:5px;'>\
				<button onclick='nga_edit_table(\"add\");'>确定</button>  <button onclick='nga_edit_table(\"create\");'>取消</button><br>\
				行数：<input type='text' onchange='nga_edit_table(\"check\",this.value,this)' value=2> \
				列数：<input type='text' onchange='nga_edit_table(\"check\")' value=2>  \
				<button onclick='nga_edit_table(\"adv\");this.innerHTML = \"重制\"'>高级</button> 提示：高级中的合并单元格功能可能导致表格混乱。\
				<div id='nga_edit_table_b' class='forumbox' style='width:880;display:none;'></div></div>"
			document.body.appendChild(tmpdiv);
		}
	}else if(act == "check"){
		try{
			if (isNaN(value)) obj.value = 0;
			if (parseInt(value) < 0) obj.value = 0;
			if (parseInt(value) > 30) obj.value = 30;
		}catch(e){};
	}else if(act == "arr"){
		SetArrs(obj.parentNode.rowIndex,obj.cellIndex,value,obj.getElementsByTagName('input')[0].value);
		SetUBB();
	}else if(act == "adv"){
		var divs = document.getElementById('nga_edit_table_b');
		var r1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[0].value);
		var c1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[1].value);
		SetArr(r1,c1);
		divs.style.display = "block";
		SetUBB();
	}else if(act == "add"){
		var divs = document.getElementById('nga_edit_table_b');
		var r1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[0].value);
		var c1 = parseInt(document.getElementById('nga_edit_table').getElementsByTagName('input')[1].value);
		if (nga_edit_table_o.length == 0) SetArr(r1,c1);
		var tables = document.getElementById('nga_edit_table_b').getElementsByTagName("table")[0];
		postfunc.addText(GetUBB());
		nga_edit_table("create");
		nga_edit_table_o = new Array();
	}else if(act == "txt"){
		nga_edit_table_o[obj.parentNode.rowIndex][obj.cellIndex].t = value;
	}
	
	
	function SetArr(r,c){
		nga_edit_table_o = new Array(r);
		for (var i=0;i<r;i++){
			nga_edit_table_o[i] = new Array(c);
			for (var k=0;k<c;k++){
				nga_edit_table_o[i][k] = {};
			}
		}
	}
	function SetArrs(m,n,a,s){
		nga_edit_table_o[m] = nga_edit_table_o[m] || [];
		if (a == "r"){
			if (nga_edit_table_o[m][n].r){
				nga_edit_table_o[m][n].r += 1;
			}else{
				nga_edit_table_o[m][n].r = 2;
			}
			for (var j=m+nga_edit_table_o[m][n].r-1;j>m;j--){  //1
				for (var k=nga_edit_table_o[j].length-1;k>=0;k--){  //1-0
					if (nga_edit_table_o[j][k].no == null || nga_edit_table_o[j][k].no){  
						var tc = nga_edit_table_o[m][n].c == null?1:nga_edit_table_o[m][n].c; //1
						for (var l=k;l>k-tc;l--) nga_edit_table_o[j][l].no = true;
						return;
					}
				}
				
			}
		}else if (a == "c"){
			if (nga_edit_table_o[m][n].c){
				nga_edit_table_o[m][n].c += 1;
			}else{
				nga_edit_table_o[m][n].c = 2;
			}
			for (var k=nga_edit_table_o[m].length-1;k>=0;k--){
				if (nga_edit_table_o[m][k].no == null || nga_edit_table_o[m][k].no){
					for (var l=k;l>k-nga_edit_table_o[m][n].c+1;l--) nga_edit_table_o[m][l].no = true;
					return;
				}
			}
		}else if (a == "w"){
			var nga_edit_s = nga_edit_prompt("请输入这个列的宽度（0-99之内的数字，表示这个列的宽度为百分之多少，0表示自动款速）：");
			if (nga_edit_s == "") return;
			if (isNaN(nga_edit_s)) return(alert("请输入1-99之间的数字！"));
			var i = parseInt(nga_edit_s);
			if (i<0||i>99) return(alert("请输入1-99之间的数字！"));
			nga_edit_table_o[m][n].w = i;
		}
	}
	function SetUBB(){
		var pretable = document.getElementById('nga_edit_table_b');
		pretable.innerHTML = GetUBB().replace(/\n/g,'<br>');
		ubbcode.bbsCode({c:pretable,tId:Math.floor(Math.random()*10000),pId:Math.floor(Math.random()*10000),authorId:__CURRENT_UID,rvrc:__GP['rvrc'],isLesser:__GP['lesser']});
		var tables = pretable.getElementsByTagName("table")[0];
		for (var i=0;i<tables.rows.length;i++){
			for (var k=0;k<tables.rows[i].cells.length;k++){
				tables.rows[i].cells[k].innerHTML = "<input style='width:80%' onchange='nga_edit_table(\"txt\",this.value,this.parentNode)' value='" + tables.rows[i].cells[k].innerHTML + "' />\
					<a href='javascript:void(0)' title='向右合并' onclick='nga_edit_table(\"arr\",\"c\",this.parentNode)' class='right'>→</a> \
					<a href='javascript:void(0)' title='向下合并' onclick='nga_edit_table(\"arr\",\"r\",this.parentNode)' class='right'>↓</a> \
					<a href='javascript:void(0)' title='设置宽度' onclick='nga_edit_table(\"arr\",\"w\",this.parentNode)' class='right'>↔</a>";
			}
		}
	}
	function GetUBB(){
		var s = "[table]";
		for (var i=0;i<nga_edit_table_o.length;i++){
			s += "[tr]"
			for (var k=0;k<nga_edit_table_o[i].length;k++){
				if (!nga_edit_table_o[i][k].no){
					s += "[td";
					if (nga_edit_table_o[i][k].w<100 && nga_edit_table_o[i][k].w>0) s += " width" + nga_edit_table_o[i][k].w;
					if (nga_edit_table_o[i][k].c) s += " colspan" + nga_edit_table_o[i][k].c;
					if (nga_edit_table_o[i][k].r) s += " rowspan" + nga_edit_table_o[i][k].r;
					s += "]";
					if (nga_edit_table_o[i][k].t) s += nga_edit_table_o[i][k].t;
					s += "[/td]";
				}
			}
			s += "[/tr]"
		}
		s += "[/table]"
		return s;
	}
}

function nga_edit_prompt(title){
	var nga_edit_s = prompt(title);
	if (nga_edit_s == "" || nga_edit_s == null)
		return "";
	else
		return nga_edit_s;
}
//获取按钮是否被禁用
function nga_edit_icon_getEnabled(obj){
	return obj.className.indexOf("nga_edui_disabled") >= 0?false:true
}

//禁用\启用按钮
function nga_edit_icon_setEnabled(obj,Enabled){
	if (Enabled){
		obj.className = obj.className.replace(" nga_edui_disabled","");
	}else{
		obj.className = obj.className + " nga_edui_disabled";
		obj.style.border="1px solid #FFF8E5";
	}
}

//鼠标移动时给按钮加上\去除边框
function nga_edit_icon_hover(div,act,o){
	if (nga_edit_icon_getEnabled(div)){
		if (act=="move"){
			div.style.border="1px solid #777";
		}else if(act=="out"){
			div.style.border="1px solid #FFF8E5";
		}
	}
	if (o == "option"){
		if (act == "out"){
			nga_edit_timer_lists = setTimeout('document.getElementById("nga_edit_listselectdiv").style.display = "none"',500);
		}else if(act == "move"){
			try{clearTimeout(nga_edit_timer_lists);}catch(e){};
		}
	}else if (o == "quickmojo"){
		if (act == "out"){
			nga_edit_timer_lists = setTimeout('document.getElementById("nga_edit_quickmojo").style.display = "none"',500);
		}else if(act == "move"){
			try{clearTimeout(nga_edit_timer_lists);}catch(e){};
		}
	}
}

//黑名单功能
var Blacklist_list = new nga_plug_local_data("Blacklist");
var Blacklist_delth = new nga_plug_local_data("Blacklist_delth");
var Blacklist_hbz = new nga_plug_local_data("Blacklist_hbz");
//var Blacklist_other = new nga_plug_local_data("Blacklist_other")
function Blacklist_Initialization(){
	Blacklist_list.load();
	Blacklist_list.data = Blacklist_list.data || [];
	Blacklist_delth.load();
	Blacklist_delth.data = Blacklist_delth.data==false?false:true;
	Blacklist_hbz.load();
	Blacklist_hbz.data = Blacklist_hbz.data || [];
	//Blacklist_other.load();
	//Blacklist_other.data = Blacklist_other.data || {tooltip:{check:true}};
	nga_plug_addmsg("Blacklist","黑名单插件","1.修复由于二哥修改页面结构导致“记一笔”无效的问题。\n2.黑名单功能上线。");
	
	//将黑名单列表和是否开启主题屏蔽加入导出数据中
	nga_plug_setting("add","黑名单列表","Blacklist");
	nga_plug_setting("add","主题屏蔽开关","Blacklist_delth");
	nga_plug_setting("add","小本子","Blacklist_hbz");
	var x = new nga_plug_tab();
	//x.add("综合",'<div class=\'nga_plug_table_tab_div\'>插件名：NGA黑名单插件<br>作者：莉诺雅羽月、天蓝色的冥想、虚空之魂、LinTx<br>版本：1.0<br><br>\
	//	<input type="checkbox" '+c(Blacklist_delth.data)+' onclick="Blacklist_delth.save(this.checked);" title="是否屏蔽黑名单用户发表的主题？">屏蔽主题\
	//	<input type="checkbox" '+c(Blacklist_other.data.tooltip.check)+' onclick="Blacklist_other.data.tooltip.check = this.checked;Blacklist_other.save();" title="是否尝试修改用户名浮动框样式">修改用户名浮动框样式<br></div>');
	//x.add("黑名单",'<div id="Blacklist_listdiv" class="nga_plug_table_tab_div">'+Blacklist_listhtml()+'</div>');
	x.add("综合",'<div class=\'nga_plug_table_tab_div\'>插件名：NGA插件控制中心-黑名单、小本子模块<br>作者：LinTx<br>版本：2.0</div>');
	x.add("黑名单",'<div id="Blacklist_listdiv" class="nga_plug_table_tab_div">'+Blacklist_listhtml()+'</div>');
	var t = x.gethtml();
	nga_plug_table_addTab("黑名单",t);
	
	Backlist_bl() //添加屏蔽链接、移除已屏蔽用户发表的回复、主题
	
	function c(p){
		if (p) return "checked"; else return "";
	}
}

function Backlist_heibenzi(act,uid,id){
	var nga_Backlist_s;
	var uuid = -1;
	for (var i=0;i<Blacklist_hbz.data.length;i++){
		if (Blacklist_hbz.data[i].uid == uid) uuid = i;
	}
	if (act=="add"){
		if (uuid == -1){
			Blacklist_hbz.data.push({uid:uid,body:[]});
			uuid = Blacklist_hbz.data.length-1;
		}
		nga_Backlist_s = prompt("请输入黑历史内容（支持URL代码[url=xxx]证据地址[/url]）：");
		if (nga_Backlist_s == "" || nga_Backlist_s == null)	return "";
		var tid;
		if (Blacklist_hbz.data[uuid].body.length == 0){
			tid = 0;
		}else{
			tid = Blacklist_hbz.data[uuid].body[Blacklist_hbz.data[uuid].body.length-1].id + 1;
		}
		var objDate = new Date(); 
		objDate = objDate.getFullYear()+"-"+(objDate.getMonth()+1)+"-"+objDate.getDate(); 
		Blacklist_hbz.data[uuid].body.push({id:tid,text:nga_Backlist_s,date:objDate});
		alert("添加成功，刷新后显示这条黑历史。");
	}else if(act=="del"){
		for (var i=0;i<Blacklist_hbz.data[uuid].body.length;i++){
			if (Blacklist_hbz.data[uuid].body[i].id == id){
				Blacklist_hbz.data[uuid].body.splice(i,1);
			}
		}
		alert("删除成功，刷新后不显示这条黑历史。");
	}else if(act=="edit"){
		for (var i=0;i<Blacklist_hbz.data[uuid].body.length;i++){
			if (Blacklist_hbz.data[uuid].body[i].id == id){
				nga_Backlist_s = prompt("请编辑黑历史内容（支持URL代码[url=xxx]证据地址[/url]）：",Blacklist_hbz.data[uuid].body[i].text);
				if (nga_Backlist_s == "" || nga_Backlist_s == null)	return "";
				Blacklist_hbz.data[uuid].body[i].text = nga_Backlist_s;
			}
		}
		alert("编辑成功，刷新后显示这条黑历史的新内容。");
	}
	Blacklist_hbz.save();
}

function Backlist_bl(){
	if (location.pathname == "/read.php"){
		var maindiv = document.getElementById("m_posts_c");
		var tabs = [];
		for(var n= maindiv.firstChild; n!=null; n=n.nextSibling){
			if(n.nodeType==1 && n.tagName.toLowerCase()=="table") tabs.push(n);
		}
	
		for (var i = tabs.length-1;i>0;i--){   //本来循环条件应该是i>-1的，但tabs[0]是帖子标题，所以更改循环条件
			var uid = /uid=(\d+)\"/.exec(tabs[i].innerHTML)[1];  //获取UID
			if (tabs[i].innerHTML.indexOf("[记一笔]")<0){
				try{
					var td = tabs[i].getElementsByClassName("stat")[0];
					var ttd = document.createElement("div");
					var ttdhtml = '<div class="ngaplug_heibenzi"><span class="right"><a onclick="Backlist_heibenzi(\'add\','+uid+')" href="javascript:void(0)">[记一笔]</a>\
					<a onclick="Blacklist_Shield(this)" href="javascript:void(0)">[拉黑]</a></span></div>';
					if (Blacklist_hbz.data.length > 0){
						var uuid = -1;
						for (var j=0;j<Blacklist_hbz.data.length;j++){
							if (Blacklist_hbz.data[j].uid == uid) uuid = j;
						}
						if (uuid >= 0){
							if (Blacklist_hbz.data[uuid].body.length > 0){
								for (var j=0;j<Blacklist_hbz.data[uuid].body.length;j++){
									ttdhtml += '<div class="ngaplug_heibenzi"><span class="numericl silver">'+Blacklist_hbz.data[uuid].body[j].date+'</span> <span style="color:#000000">'
									ttdhtml += Blacklist_hbz.data[uuid].body[j].text.replace(/\[url=(.*?)\](.*?)\[\/url\]/gi,function($0,$1,$2){return "<a href="+$1+" target=_blank>"+$2+"</a>"});
									ttdhtml += '<div onclick="Backlist_heibenzi(\'edit\','+uid+','+Blacklist_hbz.data[uuid].body[j].id+')" title="编辑"></div><div onclick="Backlist_heibenzi(\'del\','+uid+','+Blacklist_hbz.data[uuid].body[j].id+')" title="删除"></div></span>\
									</div>';
								}
							}
						}
					}
					ttd.innerHTML = ttdhtml;
					td.appendChild(ttd);
				}catch(e){}
			}
			for (k = 0;k<Blacklist_list.data.length;k++){
				if (uid == Blacklist_list.data[k].uid){
					try{tabs[i].parentNode.removeChild(tabs[i]);}catch(e){};
				}
			}

		}
	}else if (location.pathname == "/thread.php"){   //移除已屏蔽用户发表的主题
		if (Blacklist_delth.data){
			var reada = document.getElementsByTagName("a");
			for (i = reada.length - 1; i> -1;i--){
				if (reada[i].title.indexOf("用户ID") != -1){
					for (k=0;k<Blacklist_list.data.length;k++){
						if (/\d+/.exec(reada[i].title) == Blacklist_list.data[k].uid) reada[i].parentNode.parentNode.parentNode.removeChild(reada[i].parentNode.parentNode);
					}
				}
			}
		}
	}
}

function Blacklist_listhtml(){
	var s = '<form style="width:607px;" onsubmit="return Blacklist_listman(this)">\
		<div style="float:right;"><input type="submit" value="删除所选"></div>\
		<div style="padding-top:8px;border-bottom:1px solid #777;text-align:left;width:607px;"><span class="green">黑名单管理</span></div>';
	for (i=0;i<Blacklist_list.data.length;i++){
		s += '<table class="nga_plug_plugcon"><tbody>\
			<tr><td>\
				<input name="users" type="checkbox" title="是否从黑名单列表中移除该用户">删除\
			</td></tr>\
			<tr><td style="border-top:1px dotted #777;">用户：<a href="nuke.php?func=ucp&uid='+Blacklist_list.data[i].uid+'" target="_blank"><b>'+Blacklist_list.data[i].username+'</b></a> <i class="numeric">('+Blacklist_list.data[i].uid+')</i>\
			<br><span>备注：'+Blacklist_list.data[i].rem+'</span></td></tr>\
		</tbody></table>';
	}
	s += '</form>';
	return s;
}

function Blacklist_listman(form){
	if(form.users){
		if(form.users.length){
			for (i=form.users.length-1;i>-1;i--){
				if (form.users[i].checked){
					Blacklist_list.data.splice(i,1);
					Blacklist_list.save();
				}
			}
		}else{
			if (form.users.checked){
				Blacklist_list.data = [];
				Blacklist_list.save();
			}
		}
	}else{
		alert("你没有屏蔽过任何用户！")
		return false;
	}
	alert("删除黑名单用户成功，刷新后可以看到被删除黑名单用户发表的帖子。")
	document.getElementById("Blacklist_listdiv").innerHTML = Blacklist_listhtml();
	return false;
}

//屏蔽链接动作
function Blacklist_Shield(obj){
	var obj=c(obj)
	var uid = /uid=(\d+)\".+?>(.+?)<\/a/.exec(obj.innerHTML)[1];
	var username = /uid=(\d+)\".+?>(.+?)<\/a/.exec(obj.innerHTML)[2];
	if (uid==null){alert("获取用户UID错误，无法屏蔽！");return ;}
	if (username == null){username=="无用户名"}
	for (i=0;i<Blacklist_list.data.length;i++){
		if (uid == Blacklist_list.data[i].uid){
			alert("该用户已经屏蔽过！");
			return;
		}
	}
	var Blacklist_s = prompt("你将屏蔽用户 "+uid+"("+username+")\n请输入你对这次屏蔽的原因或者备注以方便你以后查看，可不输，点击取消可取消屏蔽。");
	if (Blacklist_s == null) return;
	Blacklist_list.data.push({username:username,uid:uid,rem:Blacklist_s});
	Blacklist_list.save();
	obj.parentNode.removeChild(obj);
	document.getElementById("Blacklist_listdiv").innerHTML = Blacklist_listhtml();
	
	function c(obj){
		if (obj.tagName.toLowerCase()=="table"){
			return obj;
		}else{
			return c(obj.parentNode);
		}
	}
}

//其他小工具
var nga_othertools = new nga_plug_local_data("nga_othertools");
var nga_othertools_prevpageurl = "";
var nga_othertools_nextpageurl = "";
var nga_othertools_fistpageurl = "";
var nga_othertools_lastpageurl = "";
function othertools_Initialization(){
	nga_othertools.load();
	nga_othertools.data = nga_othertools.data || {lt:{check:false,title:"艾泽拉斯",bk:{check:true,title:"大漩涡|大游窝||艾泽拉斯议事厅 - Hall of Azeroth|议事厅"}},quickpage:{check:true,ctrl:true},hig0:{check:true}};
	if (nga_othertools.data.hig0 == null) nga_othertools.data.hig0 = {check:true};
	//将百变NGA的设置加入导出数据中
	nga_plug_setting("add","百变NGA设置","nga_othertools");
	
	var x = new nga_plug_tab();
	x.add("关于",'<div class=\'nga_plug_table_tab_div\'>插件名：NGA小工具<br>变更论坛标题作者：莉诺雅羽月、虚空之魂、LinTx<br>快速翻页作者：LinTx<br>版本：1.0</div>');
	x.add("设置",nga_othertools_setthtml());
	var t = x.gethtml();
	nga_plug_table_addTab("小工具设置",t);

	if (nga_othertools.data.lt.bk.check && nga_othertools.data.lt.check){
		if (/(.*?)\s-\s艾泽拉斯国家地理论坛/.test(document.title)){
			var tbk = document.title.match(/(.*?)\s-\s艾泽拉斯国家地理论坛/)[1]
			var tt = nga_othertools.data.lt.bk.title.split("||");
			for (var i=0;i<tt.length;i++){
				if (tt[i].indexOf("|") != -1){
					if (tt[i].split("|")[0]==tbk) document.title = tt[i].split("|")[1] + " - 艾泽拉斯国家地理论坛";
				}
			}
		}
	}
	
	if (nga_othertools.data.hig0.check){
		if (location.pathname == "/thread.php"){
			var ti = document.getElementsByTagName("a");
			for (var i=0;i<ti.length;i++){
				if (ti[i].title=="打开新窗口" && ti[i].className == "replies" && ti[i].innerHTML == "0") ti[i].parentNode.style.backgroundColor = "#998833";
			}
		}
	}
	 
	if (nga_othertools.data.lt.check) document.title = document.title.replace("艾泽拉斯国家地理论坛",nga_othertools.data.lt.title);
	if (nga_othertools.data.quickpage.check){
		document.onkeydown = pageEvent;
		var pagea = document.getElementsByTagName("a");
		for (i=0;i<pagea.length;i++){
			if (pagea[i].title=="上一页") nga_othertools_prevpageurl=pagea[i].href; 
			if (pagea[i].title=="下一页") nga_othertools_nextpageurl=pagea[i].href; 
			if (pagea[i].title=="第一页") nga_othertools_fistpageurl=pagea[i].href; 
			if (pagea[i].title=="最后页") nga_othertools_lastpageurl=pagea[i].href; 
			if (pagea[i].title=="可能有此页"){ nga_othertools_nextpageurl=pagea[i].href; nga_othertools_lastpageurl = pagea[i].href;}
		}
	}
	
	function pageEvent(evt){ 
		evt = evt ||window.event; 
		var key=evt.which||evt.keyCode;
		var evtobj =evt.target||evt.srcElement;
		if(evtobj.tagName.toLowerCase()=="input" || evtobj.tagName.toLowerCase()=="textarea") return;
		if (evt.ctrlKey && nga_othertools.data.quickpage.ctrl){
			if (key == 37 && nga_othertools_fistpageurl != "") location = nga_othertools_fistpageurl;
			if (key == 39 && nga_othertools_lastpageurl != "") location = nga_othertools_lastpageurl;
		}else{
			if (key == 37 && nga_othertools_prevpageurl != "") location = nga_othertools_prevpageurl;
			if (key == 39 && nga_othertools_nextpageurl != "") location = nga_othertools_nextpageurl;
		}
	}
}

function nga_othertools_save(form){
	//{lt:{check:false,title:"艾泽拉斯",bk:{check:true,title:"大漩涡|大游窝||艾泽拉斯议事厅 - Hall of Azeroth|议事厅"}},quickpage:{check:true,ctrl:true}}
	try{
		nga_othertools.data.lt.check = form.lt_check.checked;
		nga_othertools.data.lt.title = form.lt_title.value;
		nga_othertools.data.lt.bk.check = form.lt_bk_check.checked;
		nga_othertools.data.lt.bk.title = form.lt_bk_title.value;
		nga_othertools.data.quickpage.check = form.quick_check.checked;
		nga_othertools.data.quickpage.ctrl = form.quick_ctrl.checked;
		nga_othertools.data.hig0.check = form.hig0_check.checked;
		nga_othertools.save();
	}catch(e){return false;};
	alert("保存成功！");
	return false;
}

function nga_othertools_setthtml(){
var s = "";
	s += '<form style="width:607px;" onsubmit="return nga_othertools_save(this)">\
	<div style="float:right;"><input type="submit" value="保存设置"></div>\
	<div style="padding-top:8px;border-bottom:1px solid #777;text-align:left;width:607px;"><span class="green">小工具设置</span></div>\
	\
	<table class="nga_plug_plugcon"><tbody>\
	<tr><td>\
	<input name="lt_check" '+c(nga_othertools.data.lt.check)+' type="checkbox" onclick="document.getElementById(\'nga_othertools_lt_title\').disabled=!this.checked;document.getElementById(\'nga_othertools_lt_bk_check\').disabled=!this.checked;document.getElementById(\'nga_othertools_lt_bk_title\').disabled=!this.checked;" title="是否启用变更论坛标题功能">启用论坛变更标题功能\
	</td></tr>\
	<tr><td style="border-top:1px dotted #777;">替换标题中的“艾泽拉斯国家地理论坛”为：<input id="nga_othertools_lt_title" name="lt_title" '+d(nga_othertools.data.lt.check)+' value="'+nga_othertools.data.lt.title+'">\
	<br><input id="nga_othertools_lt_bk_check" name="lt_bk_check" type="checkbox" '+c(nga_othertools.data.lt.bk.check)+' '+d(nga_othertools.data.lt.check)+'>启用替换板块名，参数：<input id="nga_othertools_lt_bk_title" name="lt_bk_title" '+d(nga_othertools.data.lt.check)+' value="'+nga_othertools.data.lt.bk.title+'"><br><span>替换板块名参数为“原板块名|替换后板块名||原板块名|替换后板块名”，例：“大漩涡|大游窝||艾泽拉斯议事厅 - Hall of Azeroth|议事厅”</span>\
	</td></tr>\
	</tbody></table>\
	\
	<table class="nga_plug_plugcon"><tbody>\
	<tr><td>\
	<input name="quick_check" type="checkbox" '+c(nga_othertools.data.quickpage.check)+' onclick="document.getElementById(\'nga_othertools_quick_ctrl\').disabled=!this.checked;" title="是否启用快速翻页功能">启用快速翻页\
	</td></tr>\
	<tr><td style="border-top:1px dotted #777;"><input id="nga_othertools_quick_ctrl" name="quick_ctrl" type="checkbox" '+c(nga_othertools.data.quickpage.ctrl)+' '+d(nga_othertools.data.quickpage.check)+'>启用CTRL模式<br><span>说明：启用快速翻页后按键盘的左右键即可快速到达上一页/下一页，启用CTRL模式后按住CTRL键再按键盘的左右键可快速到达第一页/最后页</span>\
	</td></tr>\
	</tbody></table>\
	\	<table class="nga_plug_plugcon"><tbody>\
	<tr><td>\
	<input name="hig0_check" onclick="" type="checkbox" '+c(nga_othertools.data.hig0.check)+' title="是否启用高亮0回复主题功能">启用高亮0回复\
	</td></tr>\
	</tbody></table>\
	\
	</form>';
	
	return s;
	function c(p){
		if (p) return "checked"; else return "";
	}
	function d(p){
		if (!p) return "disabled"; else return "";
	}
}

