// ==UserScript==
// @name                豆瓣助手 douban helper
// @namespace           http://userscripts.org/scripts/show/49911
// @description         为豆瓣(www.douban.com)添加各种人性化的功能。
// @require             http://js-addon.googlecode.com/files/autoupdatehelper.js
// @include             *
// @version             4.10
/* @reason
增加：音乐人试听音乐下载链接
修正：自动电梯数字名称BUG
@end*/
// ==/UserScript==

/* ************************ 备注 ************************ */
/**
 * 看到这的同学，如果希望帮助完善豆瓣助手，请在豆瓣插件小组回复: http://www.douban.com/group/topic/6604219/
 * 如果是看到某些代码还合眼，直接使用就可以了，无需申请，也欢迎感谢我:-)
 *
 * ====== 未来计划: ======
 * 自动电梯，在论坛题目以及楼主下方自动添加楼层电梯------输入框输入页码跳转
 * 私密相册，无法显示全部大图
 * 豆瓣服务 & API http://www.douban.com/service/
 * 推荐到豆瓣
 * 可关闭更新提醒
 * 改良的楼层判断，不用图片
 * 任何页面发表我说
 * 划词引用回复 window.getSelection()
 * 友邻工具 应用到小组讨论等版面
 * 自定义翻页页码，一键跳转
 * 翻页附加到浮动工具 开放DIY，可定义快捷键对应页面
 * 右上角的提醒和邀请
 * 条目论坛、评论的楼主工具
 * 楼主引用回复
 * 搜索引擎改为全部自定义
 * ctrl + enter 改进用于发邮件和发主题
 * 在电影评论页面，如果回复中有lz的回复，那下一个回复没办法正常使用引用等功能
 * 重新整理一下混乱的内部逻辑
 * 建立自定义快捷键哈希表，如有一致就执行
 * 检测是否已加入该小组
 * 预读下一页、无刷新看直播
 * 刷新、翻页后仍保留 高亮/忽略
 * 默认高亮楼主
 * 高亮引用文字
 * 在小组标题栏添加直达最后一页的链接
 * 当话题有新回复时弹出提醒
 * 关注某人（自动高亮名字或提醒有新发言）
 */

/* ************************ 判断执行 ************************ */

//自动更新
if(self.location == top.location){

	Updater && new Updater({name: '豆瓣助手 douban helper',id: '49911',version: '4.10'}).check();

	var t1 = new Date();//时间1
	Douban = /[^9]+\.douban\.com$/i.test(location.hostname);
	hl_input(); //输入框高亮
	if (Douban){
		addSearchBar(); //添加搜索条
		hideMSG();//隐藏小组介绍
		autoElevator();//自动电梯
		exGroup();//添加交流增强菜单
		albBig(); //相册显示大图
		settingBar();//添加导航栏按钮
		friendsTool();//友邻工具条
		settle();//浮动定位工具
		addHotKey(GM_getValue('hk_db', 'alt+Q'),function(){sw_set(false)});//添加快捷键
		musicLink();//破解音乐人下载链接
		ctrlEnter();//快速回复
		slideBar();//顶部滑动导航条
		multiSearch();//全站搜索
		$('#db_hp').title = '用时：' + (new Date() - t1)/1000 + ' 秒';//记录豆瓣助手耗时
	};
	!Douban && openDouban();//秘籍 '↑↑↓↓←→←→' 打开豆瓣
};
showPic(); //显示链接图片
// alert("耗时：" + (new Date() - t1) + " 毫秒");//时间总计


/* ************************ 基本函数准备 ************************ */

// 获取URL参数
function QueryString(item){
	 var sValue=location.search.match(new RegExp('[\?\&]'+item+'=([^\&]*)','i'));
	 return (sValue && sValue[1]!= '')?sValue[1]:0;
};

// 获取Cookie 函数
function getCookie(c_name){
	if (document.cookie.length > 0){
		c_start = document.cookie.indexOf(c_name + '=');
		if (c_start!=-1){ 
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(';',c_start);
			if (c_end == -1){ c_end = document.cookie.length;}
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return '';
};

// 自造 selecter ,节省一点打字时间
function $(select){
	var name = select.substring(1);
	switch(select.charAt(0)){
		case '#':
			return document.getElementById(name);
		case '.':
			return document.getElementsByClassName(name);
		case '/':
			return document.getElementsByTagName(name);
		default:
			return document.getElementsByName(select);
	}
};

// 赋予多个对象统一样式
function setStyles(obj, css){
	for (var o=obj,i=0,j=o.length; i<j; i++){
		o[i].style.cssText = css;
	}
};

// Xpath
function xpath(query){
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
};

// base64解码
function deBase64(str){
	var mapDe = {}, mapEn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split('');
	for(var i=0; i<64; i++){mapDe[mapEn[i]] = i;};
	var buf = [], arr = str.split(''), map = mapDe, n = arr.length, val, i=0, j=0;
	if(n % 4)return;
	while(i < n){
		val = (map[arr[ i ]] << 18) | (map[arr[i+1]] << 12) | (map[arr[i+2]] << 6) | (map[arr[i+3]]);
		buf.push(val>>16,val>>8 & 0xFF,val & 0xFF);
		i += 4;
	}
	while(arr[--n] == '='){buf.pop();}
	while(j<buf.length){buf[j] = String.fromCharCode(buf[j++]);}
	return buf.join('');
};

// 隐藏或显示
function toggle(obj){
	obj.style.display = (obj.style.display == 'none')?'':'none';
	return true;
};

// keycode 转换
function getKeys(e){
	var codetable={'96':'Numpad 0','97':'Numpad 1','98':'Numpad 2','99':'Numpad 3','100':'Numpad 4','101':'Numpad 5','102':'Numpad 6','103':'Numpad 7','104':'Numpad 8','105':'Numpad 9','106':'Numpad *','107':'Numpad +','108':'Numpad Enter','109':'Numpad -','110':'Numpad .','111':'Numpad /','112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12','8':'BackSpace','9':'Tab','12':'Clear','13':'Enter','16':'Shift','17':'Ctrl','18':'Alt','20':'Cape Lock','27':'Esc','32':'Spacebar','33':'Page Up','34':'Page Down','35':'End','36':'Home','37':'←','38':'↑','39':'→','40':'↓','45':'Insert','46':'Delete','144':'Num Lock','186':';:','187':'=+','188':',<','189':'-_','190':'.>','191':'/?','192':'`~','219':'[{','220':'\|','221':']}','222':'"'};
	var Keys = '';
	e.shiftKey && (e.keyCode != 16) && (Keys += 'shift+');
	e.ctrlKey && (e.keyCode != 17) && (Keys += 'ctrl+');
	e.altKey && (e.keyCode != 18) && (Keys += 'alt+');
	return Keys + (codetable[e.keyCode] || String.fromCharCode(e.keyCode) || '');
};

// 即时显示快捷键
function trans_code(ID, codes){
	var cobj = $('#'+ID);
	cobj.value = GM_getValue(ID, codes);
	cobj.addEventListener('keydown',function(e){
		this.value = getKeys(e);
		e.preventDefault();
		e.stopPropagation();
	},false);
};

// 监视并执行快捷键对应的函数
function addHotKey(codes,func){
	document.addEventListener('keydown', function(e){
		if ((e.target.tagName != 'INPUT') && (e.target.tagName != 'TEXTAREA') && getKeys(e) == codes){
			func();
			e.preventDefault();
			e.stopPropagation();
		}
	}, false);
};

/* ************************ 豆瓣助手设置界面 ************************ */

// 添加导航栏按钮
function settingBar(){
	var db_hp = document.createElement('a');
	db_hp.id = 'db_hp';
	db_hp.href = 'javascript:';
	db_hp.innerHTML = '豆瓣助手';
	var _status = $('#status') || $('.top-nav-info')[0];
	if (_status.lastChild.innerHTML){
		_status.appendChild(db_hp);
	}else{
		_status.insertBefore(db_hp, _status.lastChild.previousSibling);
	};
	$('#db_hp').addEventListener('click', function(){sw_set(false);}, false);
	
	// 加载HTML等
	GM_addStyle('\
		#db_div {\
			background:#fff;\
			position:fixed;\
			width:500px;\
			top:25%;\
			left:30%;\
			border:1px solid #bbb;\
			z-index:100;\
		}\
		#db_shadow {\
			position:absolute;\
			width:100%;\
			height:100%;\
			top:-12px;\
			left:-12px;\
			border:12px solid #000;\
			opacity:0.2;\
			z-index:-1;\
		}\
		#db_div_a {\
			position:absolute;\
			left:-69px;\
			border-top:12px solid #ccc;\
			border-bottom:12px solid #ccc;\
		}\
		#db_div_a a {\
			display:block;\
			font-weight:bold;\
			background:#ccc;\
			padding:8px;\
			border-right:1px solid #999;\
			color:#000;\
			opacity:0.7;\
		}\
		#db_div div {\
			padding:20px;\
		}\
		#db_div label {\
			cursor:pointer;\
			margin:0 40px 0 0;\
			padding:2px;\
		}\
		#db_div label:hover {\
			background:#83bf73;\
			color:#fff;\
			-moz-border-radius:3px;\
			-webkit-border-radius:3px;\
		}\
		#db_div textarea {\
			font-size:12px;\
		}\
		#db_div .gact a {\
			-moz-border-radius:10px;\
			-webkit-border-radius:10px;\
			padding:2px 20px;\
		}\
		#db_btm {\
			background:#fff;\
			display:block;\
			position:absolute;\
			top:-35px;\
			left:-12px;\
			border-right:12px solid #ccc;\
			border-top:12px solid #ccc;\
			border-left:12px solid #ccc;\
			text-align:center;\
		}\
	');
	var db_div = document.createElement('div');
	db_div.id = 'db_div';
	db_div.style.display = 'none';
	db_div.innerHTML = '\
			<span id="db_shadow">\
			</span>\
			<span id="db_div_a">\
				<a href="javascript:"  style="border-right:1px solid #fff;background:#fff;opacity:1;">功能介绍</a>\
				<a href="javascript:">交流增强</a>\
				<a href="javascript:">贴图识别</a>\
				<a href="javascript:">快速搜索</a>\
				<a href="javascript:">其他功能</a>\
			</span>\
			<div id="功能介绍">\
				【全部功能】（在豆瓣网右上角有设置按钮，或者按Alt+Q）：\
				<br>　　1、只看/高亮/忽略某人发言\
				<br>　　2、显示小组楼层数\
				<br>　　3、"直播模式"（刷新或翻页后自动只看楼主）\
				<br>　　4、按 Ctrl + Enter 即可提交回复\
				<br>　　5、按 Alt+Enter 在回复框中添加个性签名（在豆瓣助手配置中心可自定义内容）\
				<br>　　6、引用回复按钮+浮动回复框,适用于豆瓣全站讨论页面（快捷键Shift + Enter）\
				<br>　　7、可自动识别网页中文字链接中的图片，并将其显示出来。克服豆瓣小组不能贴图的缺陷，方便看图。（此功能对所有网站适用，默认只识别豆瓣中的图片；可用鼠标中键单击显示/隐藏图片）\
				<br>　　8、为豆瓣的书籍、电影增加电各种搜索引擎的接口，一键打开搜索页面。内置一些常用搜索引擎，并且可以自定义自己喜欢的搜索引擎。\
				<br>　　9、聚焦时高亮输入框，帮助集中注意力\
				<br>　　10、豆瓣相册直接显示大图（在缩略图上点击鼠标中键单击显示/隐藏大图）\
				<br>　　11、自动隐藏小组介绍\
				<br>　　12、浮动定位工具，快速置顶置地，DIY常用链接\
				<br>　　13、友邻工具条\
				<br>　　14、全站搜索，在任意页面搜索书影音等\
				<br>　　15、顶部滑动导航条，快速跳转节省时间\
				<br>　　16、自动电梯，小组标题提供最后几页链接\
			</div>\
			<div id="交流增强" style="display:none;">\
					<label><input type="checkbox" id="count" />开启显示楼层数</label>\
					<label><input type="checkbox" id="requote" />开启引用回复</label>\
					<label><input type="checkbox" id="just_view" />开启只看高亮忽略</label>\
					<br>\
					<label><input type="checkbox" id="tidybar" />使用紧凑工具条</label>\
					<label><input type="checkbox" id="auto_hide" />自动隐藏工具条</label>\
					<label><input id="hlcolor" size=4 onMouseover="this.style.background=\'#fff\';" onKeyup="this.style.background=this.value" onMouseout="this.style.background=this.value" />高亮背景色</label><br>\
					<label><input id="diylen" size=2 />当引用文字超过该长度，提示是否截断</label><br>\
					<textarea rows="10" cols="81" id="diyword"></textarea><br>\
					交流增强适用于豆瓣小组与论坛等，快捷键：<br>\
					打开浮动回复框为 Shift+Enter<br>\
					退出为 Esc（会清空内容）<br>\
					提交为 Ctrl+Enter（适用于豆瓣大部分输入框）<br>\
					个性签名使用快捷键为 Alt+Enter，可瞬间输入设定文字。（适用于豆瓣大部分输入框）\
			</div>\
			<div id="贴图识别" style="display:none;">\
					<label><input type="radio" name="showpic" />不开启图片识别</label><br>\
					<label><input type="radio" name="showpic" />只对豆瓣网开启</label><br>\
					<label><input type="radio" name="showpic" />对所有网页开启</label><br>\
					<label><input type="radio" name="showpic" />对所有网页开启，点击鼠标中键时才加载（速度最快，推荐选项）</label>\
					<br>\
					<p>本功能为自动识别网页中文字链接中的图片，并将其显示出来。\
					<br>  主要由于克服豆瓣小组不能贴图的缺陷，方便看图。\
					<br>  （此功能对所有网站适用，默认只识别豆瓣中的图片；可用鼠标中键单击显示/隐藏图片）</p>\
					<br>\
			</div>\
			<div id="快速搜索" style="display:none;">\
					<label><input type="checkbox" id="search_bar" />开启快速搜索条</label>\
					<label>添加自定义搜索引擎↓</label>\
					<textarea rows="10" cols="81" id="otherEngines"></textarea>\
					<br><strong>添加其他引擎的使用说明：</strong><br>\
					打开 “豆瓣助手” 界面后看到添加其他搜索引擎文本框里有默认的如下内容：<br>\
					----------------------------------------------------------<br>\
					豆瓣小组|http://www.douban.com/group/search?q={word}<br>\
					百度知道|http://zhidao.baidu.com/q?word={gb:word}&amp;ct=17&amp;tn=ikaslist&amp;rn=10<br>\
					----------------------------------------------------------<br>\
					1、以花括号括起来的部分 {word} 代表搜索的关键字，该关键字将会以 UTF-8 方式编码。如果想要以 GB2312 方式编码，请使用{gb:word}，编写地址时要注意这点。<br>\
					2、以竖线 | 为分隔符，前面的 “豆瓣小组” 是在页面上显示的链接名称，后面的 http://www.douban.com/group/search?q={word} 是发起搜索的链接地址。<br>\
					3、每行对应一个搜索引擎。特别注意每行中必须有个竖线 | 分隔前后两部分。<br>\
					你可以仿照例子添加其他搜索，比如雅虎、wiki等等的。\
			</div>\
			<div id="其他功能" style="display:none;">\
					<label>设置界面快捷键<input size=8 id="hk_db"/></label><br><br>\
					<label><input type="checkbox" id="hl_input" />高亮焦点输入框　</label>\
					<label><input type="checkbox" id="alb_big" />在相册缩略图上点击鼠标中键显示大图</label><br>\
					<label><input type="checkbox" id="hide_grpinfo" />自动隐藏小组介绍</label>\
					<label><input type="checkbox" id="autoElevator" />开启自动电梯</label><br>\
					<label><input type="checkbox" id="settler" />开启浮动定位条　</label>\
					<label><input type="checkbox" id="friendsTool" />开启友邻工具条</label><br>\
					<label><input type="checkbox" id="multiSearch" />开启全站搜索　　</label>\
					<label><input type="checkbox" id="slideBar" />开启顶部滑动导航条</label><br>\
					<label><input type="checkbox" id="musicLink" />破解音乐人下载链接</label><br>\
					<br>\
					<label>浮动定位条快捷键↓</label><br>\
					<label>置顶：<input size=8 id="hk_top"/></label>\
					<label>置底：<input size=8 id="hk_btm"/></label><br>\
					<label>上页：<input size=8 id="hk_pre"/></label>\
					<label>下页：<input size=8 id="hk_nxt"/></label>\
					<textarea rows="6" cols="81" id="otherLinks"></textarea>\
					<br>\
					<label><a href="http://userscripts.org/scripts/show/49911" target=_blank>详细介绍及使用说明</a></label>\
					<label><a href="http://www.douban.com/group/topic/6604219/" target=_blank>反馈意见</a></label>\
			</div>\
			<span id="db_btm">\
				<input type="button" title="部分选项需要刷新页面才能生效" id="s_ok" value="√ 确认">\
				<input type="button" title="取消本次设定，所有选项还原" id="s_cl" value="X 取消">\
			</span>\
	';
	$('/body')[0].appendChild(db_div);
	$('#s_ok').addEventListener('click', function(){sw_set(true);}, false);
	$('#s_cl').addEventListener('click', function(){sw_set(false);}, false);

	$('#db_div_a').addEventListener('mouseover', function(e){
		if(!e.target.id){
			setStyles($('#db_div').getElementsByTagName('DIV'), 'display:none;');
			$('#'+e.target.innerHTML).style.display = 'block';
			setStyles($('#db_div_a').getElementsByTagName('A'), '');
			e.target.style.cssText = 'border-right:1px solid #fff;background:#fff;opacity:1;';
		}
	}, false);
};

// 显示\隐藏设置栏
function sw_set(ch){
	toggle($('#db_div'));
	if (ch){
		//写入图片识别选项
		var pic_sw = $('showpic');
		for (var i=0,j=pic_sw.length; i<j; i++){if (pic_sw[i].checked){GM_setValue('choice', i);}};
		GM_setValue('hlcolor', $('#hlcolor').value);//写入高亮背景色
		GM_setValue('otherEngines', $('#otherEngines').value);//写入自定义搜索引擎
		GM_setValue('otherLinks', $('#otherLinks').value);//写入自定义链接
		GM_setValue('diyword', $('#diyword').value);//写入个性签名
		GM_setValue('diylen', parseInt($('#diylen').value) );//自定义引文截断长度
		db_write('just_view');//写入只看、高亮、忽略选项
		db_write('search_bar');//写入搜索条选项
		db_write('hl_input');//写入高亮输入框选项
		db_write('alb_big');//写入相册大图选项
		db_write('count');//写入数楼选项
		db_write('auto_hide');//写入自动隐藏选项
		db_write('tidybar');//写入工具条样式
		db_write('requote');//写入引用回复选项
		db_write('settler');//写入浮动定位工具选项
		db_write('hide_grpinfo'); //写入隐藏小组介绍选项
		db_write('friendsTool'); //写入友邻工具选项
		db_write('multiSearch'); //写入全站搜索选项
		db_write('slideBar'); //写入滑动导航条选项
		db_write('autoElevator'); //写入自动电梯选项
		db_write('musicLink'); //写入音乐下载链接选项
		GM_setValue('hk_db', $('#hk_db').value);//写入自定义搜索引擎
		GM_setValue('hk_top', $('#hk_top').value);//写入置顶快捷键
		GM_setValue('hk_btm', $('#hk_btm').value);//写入置底快捷键
		GM_setValue('hk_pre', $('#hk_pre').value);//写入上一页快捷键
		GM_setValue('hk_nxt', $('#hk_nxt').value);//写入下一页快捷键
	}else{                                           
		//读取高亮背景色
		$('#hlcolor').value = GM_getValue('hlcolor', '#eeffee');
		$('#hlcolor').style.background = GM_getValue('hlcolor');
		$('showpic')[GM_getValue('choice', 1)].checked = true;//读取图片识别选项
		$('#otherEngines').value = GM_getValue('otherEngines', '土豆豆单|http://so.tudou.com/psearch/{word}\n土豆视频|http://so.tudou.com/isearch/{word}\n优酷视频|http://so.youku.com/search_video/q_{word}\n优酷列表|http://so.youku.com/search_playlist/q_{word}\n豆瓣小组|http://www.douban.com/group/search?q={word}\n百度知道|http://zhidao.baidu.com/q?word={gb:word}&ct=17&tn=ikaslist&rn=10');//读取自定义搜索引擎
		$('#otherLinks').value = GM_getValue('otherLinks', '我的话题|http://www.douban.com/group/my_topics\n我的评论|http://www.douban.com/mine/discussions\n');//读取自定义链接
		$('#diyword').value = GM_getValue('diyword', '个性签名');//读取个性签名
		$('#diylen').value = GM_getValue('diylen', 500);//自定义引文截断长度
		db_read('just_view',true);//读取只看、高亮、忽略选项
		db_read('search_bar',true);//读取搜索条选项
		db_read('hl_input',true);//读取高亮输入框选项
		db_read('alb_big',true);//读取相册大图选项
		db_read('count',true);//读取数楼选项
		db_read('auto_hide',false);//读取自动隐藏选项
		db_read('tidybar', true);//读取工具条样式
		db_read('requote', true);//读取引用回复选项
		db_read('settler', true);//读取浮动定位工具选项
		db_read('hide_grpinfo',true);//读取隐藏小组介绍选项
		db_read('friendsTool',true);//读取友邻工具选项
		db_read('multiSearch',true);//读取全站搜索选项
		db_read('slideBar',true);//读取滑动导航条选项
		db_read('autoElevator',true);//读取自动电梯选项
		db_read('musicLink',true);//读取音乐下载链接选项
		trans_code('hk_db', 'alt+Q');//显示豆瓣助手设置界面快捷键
		trans_code('hk_top', '↑');//显示置顶快捷键
		trans_code('hk_btm', '↓');//显示置底快捷键
		trans_code('hk_pre', '←');//显示上一页快捷键
		trans_code('hk_nxt', '→');//显示下一页快捷键
	}              
};

//checkbox通用读取、写入函数
function db_read(id,value){$('#'+id).checked = GM_getValue(id, value);}
function db_write(id){GM_setValue(id, $('#'+id).checked);}


/* ************************ 豆瓣相册处理 ************************ */

// 识别相册大图函数
function albBig(){
	if (GM_getValue('alb_big', true) && /album/i.test(location.href)){
		alb_all(true);
		var photitle = $('.photitle')[0];
		photitle.innerHTML = '&nbsp;&gt;<a href="javascript:" id="photitle_id" title="点击显示全部大图，再次点击全部还原">显示全部大图</a>' + photitle.innerHTML;
		window.status='在缩略图上点击鼠标中键显示大图';
		$('#photitle_id').addEventListener('click', function(){alb_all(false);}, false);
		GM_addStyle('.album_photo {height:auto;overflow:auto;width:auto}');
	}
};

// 监视中键或全部显示
function alb_all(b){
	var imgs = $('.article')[0].getElementsByTagName('img');
	for (var i=0,j=imgs.length; i<j; i++){
		b && imgs[i].parentNode.addEventListener('mousedown', function(e){if (e.button == 1){chk_big(this)}}, false);
		!b && chk_big(imgs[i].parentNode);
	}
};

// 相册切换大小图
function chk_big(p){
	p.innerHTML = /thumb/i.test(p.innerHTML) ? p.innerHTML.replace(/thumb/, 'photo') : p.innerHTML.replace(/photo\/photo/, 'photo/thumb');
	p.parentNode.style.width = (p.parentNode.style.width == 'auto') ? '170px': 'auto';
};

/* ************************ 书影音页面处理 ************************ */

// 添加搜索条函数
function addSearchBar() {
	if ($('#mainpic') && GM_getValue('search_bar', true)) {
		GM_addStyle('\
			#mainpic {\
				overflow: visible;\
			}\
			.s_bar {\
				z-index: 97;\
				position: absolute;\
			}\
			.s_lin {\
				position: absolute;\
				top: -62px;\
				left: 0px;\
				visibility: hidden;\
			}\
			.s_lin2 {\
				position: absolute;\
				top: -62px;\
				left: 62px;\
				visibility: hidden;\
			}\
			.s_bar a {\
				-moz-border-radius: 7px;\
				-webkit-border-radius: 7px;\
				display: block;\
				background: #eef9eb;\
				padding: 5px;\
				width: 50px;\
				border: 1px solid #fff;\
				line-height: 160%;\
			}\
			.s_bar a:hover {\
				border: 1px solid #aaa;\
				background: #fff;\
				color: #000;\
			}\
			.s_bar:hover .s_tt {\
				visibility: hidden;\
			}\
			.s_bar:hover .s_lin, .s_bar:hover .s_lin2 {\
				visibility: visible;\
			}\
			.s_bar .s_tt {\
				border: 1px solid #aaa;\
				width: 90px;\
				line-height: 100%;\
			}\
		');
		
		var keyword = $('/h1')[0].firstChild.nodeValue;//取得h1标签内容
		var key_wd = encodeURIComponent(keyword);
		var s_div = document.createElement("div");
		s_div.className = "s_bar";
		s_div.innerHTML = '\
			<a href="javascript:" class="s_tt">Search it \
				<font color="red"><b>!</b>\
				</font></a>\
			<span class="s_lin">\
				<a href="http://www.baidu.com/s?ie=utf-8&wd=' + key_wd + ' "target="_blank">百度一下</a>\
				<a href="http://www.google.com/search?&q=' + key_wd + ' "target="_blank">Google</a>\
				<a href="http://www.gougou.com/search?id=92452&search=' + key_wd + '"target="_blank">迅雷下载</a>\
				<a href="http://book.gougou.com/search?restype=3&id=92452&search=' + key_wd + ' "target="_blank">迅雷书籍</a>\
				<a href="http://www.verycd.com/search/folders/' + key_wd + ' "target="_blank">VeryCD</a>\
				<a href="http://zh.wikipedia.org/w/index.php?search=' + key_wd + ' "target="_blank">维基百科</a>\
				<a href="http://books.google.com/books?q=' + key_wd + ' "target="_blank">谷歌书籍</a>\
				<a href="http://video.google.cn/videosearch?q=' + key_wd + '&www_google_domain=www.google.cn&emb=0#" target="_blank">谷歌视频</a>\
			</span>\
			<span class="s_lin2">\
			</span>\
		';
		$('#mainpic').appendChild(s_div);
		otherEngines(keyword);
	}
};

// 添加其他搜索引擎
function otherEngines(keyword){
	var engines = GM_getValue('otherEngines', '土豆豆单|http://so.tudou.com/psearch/{word}\n土豆视频|http://so.tudou.com/isearch/{word}\n优酷视频|http://so.youku.com/search_video/q_{word}\n优酷列表|http://so.youku.com/search_playlist/q_{word}\n豆瓣小组|http://www.douban.com/group/search?q={word}\n百度知道|http://zhidao.baidu.com/q?word={gb:word}&ct=17&tn=ikaslist&rn=10').split(/\n/);
	for (i=0,j=engines.length; i<j; i++) {
		var engine = engines[i].split('|');
		if (engine.length > 1) {
			if (engine[1].indexOf('{gb:word}') >= 0){
				replace2GB(keyword, engines[i], engine[0]);
			}else{
				var searchlinks = '<a href="'+ engines[i].replace(engine[0] + '|', '').replace(/{word}/ig, encodeURIComponent(keyword)) +'" target="_blank" >'+ engine[0].replace(/{word}|{gb:word}/ig, keyword.replace('<', '&lt;').replace('>', '&gt;')) +'</a>';
				$('.s_lin2')[0].innerHTML += searchlinks;
			}
		}
	}
};


// 将其他搜索引擎中的搜索关键字替换成 GB2312 编码格式。编码通过查询 baidu 获得
// 感谢 Googlekingkong 的作者，这是他想出的方法
function replace2GB(keyword, enginesi, engine0){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.baidu.com/s?ie=utf-8&wd=' + encodeURIComponent(keyword),
		overrideMimeType: 'text/xml; charset=gb2312',
		onload: function(resp){
			if (resp.status < 200 || resp.status > 300) {
				return;
			};
			var keywordGB = String(resp.responseText.match(/word=[^'"&]+['"&]/i)).replace(/word=|['"&]/ig,'');
			var searchlinks = '<a href="'+ enginesi.replace(engine0 + '|', '').replace(/{gb:word}/ig, keywordGB) +'" target="_blank" >'+ engine0.replace(/{word}|{gb:word}/ig, keyword.replace('<', '&lt;').replace('>', '&gt;')) +'</a>';
			$('.s_lin2')[0].innerHTML += searchlinks;
		},
		onerror: function(){
			return;
		}
	});
};

/* ************************ 图片识别处理 ************************ */

// 检测、显示图片函数
function showPic(){
	var a_links = document.links;
	_pic_ = /^http[^\?\s]*\.(?:jpg|jpeg|jpe|jfif|bmp|png|gif|tif|tiff|ico)/i;
	switch ( parseInt(GM_getValue('choice', 1)) ){
	case 0:
		break;
	case 1:
		if (Douban || location.href == 'http://userscripts.org/scripts/show/49911') {
		}else{
			break;
		};
	case 2:
		for (var i=0,n=a_links.length; i<n; i++){
			checkIMG(a_links[i]);
		};
		break;
	case 3:// 点击时才检测图片
		for (var i=0,n=a_links.length; i<n; i++){
			a_links[i].addEventListener('mousedown', function(e){
				(e.button == 1) && checkIMG(this)
			}, false);
		};
		break;
	}
};

//检测图片
function checkIMG(link){
	var href = link.href;
	var inner = link.innerHTML;
	if ( _pic_.test(href) && !/<img\s/i.test(inner) ){
		link.addEventListener('mousedown', function(e){
			(e.button == 1) && toggle(this.childNodes[0]) && toggle(this.childNodes[1])// 图片\链接切换
		}, false);
		link.innerHTML = '<img style="max-width:520px;" alt="图片载入ing..." title="点击鼠标中键可切换链接/图片 by豆瓣助手" src="' + href + '" /><span style="display:none;">' + inner + '</span>';
	}
};

/* ************************ 小组、评论、论坛增强处理 ************************ */

// 隐藏小组介绍
function hideMSG(){
	var h2 = $('/h2')[0] && $('/h2')[$('#pop_login')?1:0];
	if(GM_getValue('hide_grpinfo',true) &&  h2 && /最近小组话题/.test(h2.innerHTML)){
		toggle($('.tablecc')[0]);
		$('.tablelc')[0].innerHTML = '<a id="_toggle" style="position:absolute;top:163px;">&gt;显示/隐藏小组介绍&lt;</a>';
		$('#_toggle').addEventListener('click',function(){toggle($('.tablecc')[0])} ,false);

	}
};

// 自动电梯
function autoElevator(){
	if(GM_getValue('autoElevator',true) && /douban\.com\/group\//.test(location.href)){
		var reNums = xpath('//table[@class="olt"]/tbody/tr/td[last()-1]'), reply = xpath('//table[@class="olt"]/tbody/tr/td[1]');
		GM_addStyle('.pageNum{float:right;}');
		for(var i=0,j=reNums.snapshotLength; i<j; i++){
			var re = reNums.snapshotItem(i), title = reply.snapshotItem(i), nw = re.innerHTML, num = Number(nw), lastPage, linkCache = '<span class="pageNum">(';
			if(!isNaN(num) && num>100){
				lastPage = nw.slice(0, -2);
				num > 400 && (linkCache += ' <a href="'+ title.lastChild.href +'?start='+ (lastPage-3) +'00" title="倒数第四页">'+ (lastPage-2) +'</a> |');
				num > 300 && (linkCache += ' <a href="'+ title.lastChild.href +'?start='+ (lastPage-2) +'00" title="倒数第三页">'+ (lastPage-1) +'</a> |');
				num > 200 && (linkCache += ' <a href="'+ title.lastChild.href +'?start='+ (lastPage-1) +'00" title="倒数第二页">'+ lastPage +'</a> |');
				linkCache += ' <a href="'+ title.lastChild.href +'?start='+ lastPage +'00#last" title="自动电梯：最后一页">'+ (lastPage-1+2) +'</a> )　</span>';
				title.innerHTML = linkCache + title.innerHTML;
			}
		}
	}
};

// 添加增强工具条
function exGroup(){
	var ct = GM_getValue('count', true), jv = GM_getValue('just_view', true), re = GM_getValue('requote', true);
	var _topic = $('.topic-reply')[0];// 小组回复区
	var _comments = $('#comments');// 书影音评论回复区
	var _table = _comments && _comments.getElementsByTagName('table')[0];
	if ((ct || jv ||re) && (_topic || _comments)){
		var replys = (_topic && _topic.getElementsByTagName('li')) || (_table && _comments.getElementsByTagName('table'))|| _comments.getElementsByClassName('wrap');
		var start = parseInt(QueryString('start'))+ 1; //楼层起点

		//工具条CSS & HTML
		GM_addStyle(GM_getValue('auto_hide', false)?'.ctrl_tool{display:none;} li:hover .ctrl_tool{display:block;}':'');
		var re_s = re?'<a name="db_re" href="javascript:" title="回复该用户发言" >回</a>\
					<a name="db_qt" href="javascript:" title="引用该用户发言" >引</a>':'';
		var re_l = re?'&gt;<a name="db_re" href="javascript:" title="回复该用户发言" >回复</a>&nbsp;&nbsp;\
					&gt;<a name="db_qt" href="javascript:" title="引用该用户发言" >引用</a>&nbsp;&nbsp;':'';
		var jv_s = jv?'<a name="db_jv" href="javascript:" title="只看该用户所有发言" >只</a>\
					<a name="db_hl" href="javascript:" title="高亮该用户所有发言，再次点击取消高亮" >亮</a>\
					<a name="db_ig" href="javascript:" title="忽略该用户所有发言" >略</a>\
					<a name="db_bk" href="javascript:" title="复原所有发言" >原</a>':'';
		var jv_l = jv?'&gt;<a name="db_jv" href="javascript:" title="只看该用户所有发言" >只看</a>&nbsp;&nbsp;\
					&gt;<a name="db_hl" href="javascript:" title="高亮该用户所有发言，再次点击取消高亮" >高亮</a>&nbsp;&nbsp;\
					&gt;<a name="db_ig" href="javascript:" title="忽略该用户所有发言" >忽略</a>&nbsp;&nbsp;\
					&gt;<a name="db_bk" href="javascript:" title="复原所有发言" >复原</a>&nbsp;&nbsp;':'';
		var clibtn = GM_getValue('tidybar', true) ? '&gt;'+re_s+jv_s+'&nbsp;&nbsp;' : re_l+jv_l;

		// 对书影音评论进行页面重构
		if (_comments && !_table){
			_comments.innerHTML = _comments.innerHTML
			.replace(/<h2>/, '</li><div class="ctool"></div></div><h2>')
			.replace(/<div/, '</li><div class="ctool"></div></div><div')
			.replace(/^<span class="wrap">/, '<div class="dbhp"><span class="wrap">')
			.replace(/<\/h3><\/span>/g, '</h3> </span><li>')
			.replace(/<span class="wrap">/g, '</li><div class="ctool"></div></div><div class="dbhp"><span class="wrap">');
		};
		// 重构条目论坛
		if (_table){
			_comments.innerHTML = _comments.innerHTML
			.replace(/<\/h4><\/span>/g, '</h4></span><p>')
			.replace(/<\/td><\/tr>/g, '</p></td></tr>')
		}; 
		//逐楼添加工具条
		for (var i=0,l=replys.length; i<l; i++){
			var rehead = replys[i].getElementsByTagName('h4')[0] || replys[i].getElementsByTagName('span')[0];
			if (ct){//数楼
				rehead.firstChild.insertData(0,parseInt(i) + start + '楼 ');
			};
			var ban = replys[i].getElementsByClassName('group_banned')[0] || replys[i].getElementsByTagName('td')[1] ||  _comments.getElementsByClassName('ctool')[i];
			if (clibtn && ban){
				var _span = document.createElement('span');
				_span.className='gact fright ctrl_tool';
				_span.innerHTML = clibtn;
				ban.appendChild(_span)
			};	
			if (re){//快速回复
				$('db_re')[i].addEventListener('click', requote, false);
				$('db_qt')[i].addEventListener('click', requote, false);
			};
			if (jv){//只看高亮等
				$('db_jv')[i].addEventListener('click', just_view, false);
				$('db_hl')[i].addEventListener('click', just_view, false);
				$('db_ig')[i].addEventListener('click', just_view, false);
				$('db_bk')[i].addEventListener('click', just_view, false);
			};
		};

		
		//楼主工具条
		if (jv && $('.topic-opt')[0]){
			var toptool = '\
			<span class="fleft" id="louzhu">\
			&gt;<a href="javascript:" id="db_jv" title="只看楼主发言" >只看</a>&nbsp;&nbsp;\
			&gt;<a href="javascript:" id="db_hl" title="高亮楼主所有发言，再次点击取消高亮" >高亮</a>&nbsp;&nbsp;\
			&gt;<a href="javascript:" id="db_ig" title="忽略楼主所有发言" >忽略</a>&nbsp;&nbsp;\
			&gt;<a href="javascript:" id="db_bk" title="复原所有发言" >复原</a>&nbsp;&nbsp;\
			&gt;<a href="javascript:" id="livemod" title="开启直播模式，刷新及翻页后自动只看楼主" >直播模式</a>&nbsp;&nbsp;\
			</span> ';
			$('.topic-opt')[0].innerHTML += toptool;
			$('#db_jv').addEventListener('click', just_view, false);
			$('#db_hl').addEventListener('click', just_view, false);
			$('#db_ig').addEventListener('click', just_view, false);
			$('#db_bk').addEventListener('click', just_view, false);
			$('#livemod').addEventListener('click', function(){location.href = location.href.replace(location.search,'') + '?jv=' + this.parentNode.parentNode.parentNode.getElementsByTagName('a')[0].firstChild.nodeValue;}, false);
		};
		islivemod();// 检测是否直播模式
		
		//置顶小组导航条
		$('.paginator')[0] && ($('.aside')[0].getElementsByTagName('p')[0].innerHTML += ('<div class="paginator">' + $('.paginator')[0].innerHTML + '</div>'));
		
		if (re){// 添加快速回复框
			var ck_value = getCookie('ck');
			var re_f = document.createElement('div');
			re_f.id = 're_f';
			re_f.style.cssText = 'position:fixed;top:25%;border:1px solid #ccc;display:none;';
			var action = /group/.test(location.href)?'add_comment':'?post=ok#last';
			re_f.innerHTML = '\
				<form name="comment_form" method="post" action="'+ action +'" >\
					<div style="display: none;"><input name="ck" value='+ ck_value +' type="hidden"></div>\
					<textarea id="re_text" name="rv_comment" rows="20" style="font-size:12px;width:310px;border:0px;border-bottom:1px solid #ccc;"></textarea><br>\
					<input value="加上去" type="submit">\
					<input value="取消" type="button" onClick="document.getElementById(\'re_f\').style.display=\'none\'">\
					<input value="清空" type="button" onClick="document.getElementById(\'re_text\').value=\'\';document.getElementById(\'re_text\').focus();">\
					<a class="fright gact" href="javascript:;" title=" \n快捷键：\n打开为Shift+Enter\n退出为Esc（会清空内容）\n提交为Ctrl+Enter\n个性签名为Alt+Enter（在豆瓣助手中设置）。\n\n在输入框内除Ctrl+Enter以及Esc外，其他快捷键无效。\n发言失败时，请自行判断是否已经登录并有权发言。" onClick="document.getElementById(\'re_text\').value+=this.title;document.getElementById(\'re_text\').focus();">[使用说明]</a>\
					<a class="fright gact" href="javascript:;" title=" \n'+GM_getValue('diyword', '个性签名')+'" onClick="document.getElementById(\'re_text\').value+=this.title;document.getElementById(\'re_text\').focus();">[个性签名]</a>\
				</form>';
			$('.aside')[0].appendChild(re_f);
			
			//修复豆瓣相册在输入框内按方向键翻页的UBG
			unsafeWindow.input_ban && unsafeWindow.input_ban();
			
			//加载 Shift + Enter 开关回复框快捷键
			addHotKey('shift+Enter',function(){
				var re_text = $('#re_text');
				toggle($('#re_f'));
				re_text.focus();
			});
			//退出快捷键为 Esc
			$('#re_f').addEventListener('keydown', function(e){
				if (e.keyCode == '27'){
					toggle($('#re_f'));
					$('#re_text').value = '';
				}
			}, false); 
			//个性签名快捷键为 Alt + Enter
			for(var i=0,j=$('rv_comment').length;i<j;i++){
				$('rv_comment')[i].addEventListener('keydown', function(e){
					if (e.altKey && e.keyCode == '13'){
						this.value += '\n'+ GM_getValue('diyword', '个性签名');
					}
				}, false);
			}
		}
	}
};

// 只看\高亮\忽略\复原 操作
function just_view(urlmsg){
	var yn = (typeof(urlmsg) == 'string')?true:false;// 是否直播
	var todo = yn?'db_jv':this.name || this.id;// 执行行为
	var parent_3 = this.parentNode ? this.parentNode.parentNode.parentNode : '';// 加三元选择符是为了修正“直播模式”的BUG
	var hasImg = parent_3.className=='dbhp' ? false : true;// 区别小组与条目论坛等
	var _comments = $('#comments');
	var clickname = yn ? urlmsg : 
				(parent_3.getElementsByTagName('a')[0].firstChild.nodeValue || parent_3.getElementsByTagName('a')[1].firstChild.nodeValue);
	var replys = hasImg ? 
				(_comments ? _comments.getElementsByTagName('table') : $('#content').getElementsByTagName('ul')[0].getElementsByTagName('li'))
				: _comments.getElementsByClassName('dbhp');
	var aNum = hasImg?1:0;
	for (var i=0,j=replys.length; i<j; i++){
		var reply = replys[i];
		var isit = (reply.getElementsByTagName('a')[aNum].firstChild.nodeValue == clickname)?true:false;
		if (todo == 'db_jv'){
			reply.style.display = isit?'':'none';
		}else if(todo == 'db_hl' && isit){
			reply.style.background = (reply.style.background)?'':GM_getValue('hlcolor', '#eeffee');
		}else if(todo == 'db_ig' && isit){
			reply.style.display = 'none';
		}else if(todo == 'db_bk'){
			reply.style.display = '';
			reply.style.background = '';
		}
	}
};

// 直播模式
function islivemod(){
	var name = QueryString('jv');
	if (name !== 0){
		just_view(decodeURIComponent(name));
		var live = $('#livemod');
		if (live){
			live.firstChild.nodeValue = '关闭直播';
			live.title = '已开启直播模式，点击取消直播; 点击“复原”按钮可临时查看全部帖子';
			live.style.background = '#fffe15';
			live.href = location.href.replace(location.search,'');
		};
		if ($('.paginator')[0]){
			var next = $('.paginator')[0].getElementsByTagName('a');
			for (var i=0,j=next.length; i<j; i++){
				next[i].href += '&jv='+name;
			}
		}
	}
};

// 引用回复函数
// 感谢 NullPointer ，该功能参照了他的 Reply buttons for new Douban 中的格式
function requote(){
	var re_f = $('#re_f');
	var re_text = $('#re_text');
	var reply_doc = this.parentNode.parentNode.parentNode;
	var aNum = (reply_doc.tagName == 'TR')?1:0;
	var rn = (re_text.value == '')?'':'\n';
	if (this.name == 'db_re'){
		var alltext = rn + '@' + reply_doc.getElementsByTagName('a')[aNum].firstChild.nodeValue + '\n';
	}else if(this.name == 'db_qt'){
		var _h4 = reply_doc.getElementsByTagName('h4')[0];
		var rehead = _h4?reply_doc.getElementsByTagName('h4')[0].textContent.replace(/\s+/g,' ')
					:reply_doc.getElementsByTagName('h3')[0].textContent.replace(/\s+/g,' ');
		var redoc = _h4?reply_doc.getElementsByTagName('p')[0].textContent.replace(/\n\s*\n/g, '\n')
					:reply_doc.getElementsByTagName('li')[0].textContent.replace(/\n\s*\n/g, '\n').replace(/^\s{7}/g, '');
		if (redoc.search(/(-{50,})[\s\S]+\1/g)>-1){
			if (confirm('是否删去引文中的引文？')){redoc = redoc.replace(/(-{50,})[\s\S]+\1/g,'').replace(/\n\s*\n/g, '\n');}
		};
		var len = redoc.length;
		var diylen = GM_getValue('diylen', 500);
		if (len > diylen){
			if (confirm('引文太长，是否省略一部分？')){redoc = redoc.substr(0,diylen)+ '......\n(以上引文省略'+ (len-diylen) +'字)';}
		};
		var sepr = '----------------------------------------------------------';
		var alltext  =  rn+sepr+'\n'+rehead+'\n'+redoc+'\n'+sepr+'\n';
	};
	re_text.value += alltext;
	re_f.style.display='';
	re_text.focus();
};  

/* ************************ 豆瓣社区处理 ************************ */

// 友邻工具条
function friendsTool(){
	if(GM_getValue('friendsTool', true) && $('#miniblog')){
		GM_addStyle('.Friends_Tool_Bar{visibility:hidden;} .mbtr:hover .Friends_Tool_Bar{visibility:visible;}');
		var firends = xpath('//li[@class="mbtr"]//a[contains(@href,"/people/") and not(@onclick) and not(@class) and not(contains(@href,"recs?rid=")) and not(../self::*[@class="pl"]) and not(../self::*[@class="indentrec"]) and not(contains(preceding-sibling::text(),"、"))]');
		
		for(var i=0,j=firends.snapshotLength; i<j; i++){
			var toolBar = document.createElement('div'), firend = firends.snapshotItem(i), name = firend.href, nname = firend.innerHTML;
			toolBar.className = 'Friends_Tool_Bar';
			toolBar.innerHTML = '<div class="clear"></div><span>\
				<a href="'+name.replace('people','book/list')+'">书</a> |\
				<a href="'+name.replace('people','movie/list')+'">影</a> |\
				<a href="'+name.replace('people','music/list')+'">音</a> |\
				<a href="'+name+'miniblogs?type=saying">说</a> |\
				<a href="'+name+'miniblogs">广播</a>|\
				<a href="'+name+'reviews">评论</a>|\
				<a href="'+name+'notes">日记</a>|\
				<a href="'+name+'photos">相册</a>|\
				<a href="'+name+'recs">推荐</a>|\
				<a href="'+name+'groups">小组</a>|\
				<a href="'+name+'board">留言板</a>|\
				<a href="'+name+'contacts'+'">关注</a>|\
				<a href="/doumail/write?to='+name.slice(29,-1)+'">发豆邮</a>\
				<a href="javascript:" style="color:#83bf73;" title="点击展开更多"\
					onclick="this.target=\'\';\
					this.innerHTML=/gt/.test(this.innerHTML)?\'&lt;&lt;&lt;\':\'&gt;&gt;&gt;\';\
					var obj=this.parentNode.getElementsByTagName(\'span\')[0];\
					obj.style.display=obj.style.display?\'\':\'none\';">&gt;&gt;&gt;</a>\
				<span style="display:none;">\
				<a href="'+name+'event?g=w">活动</a>|\
				<a href="'+name+'online">线上</a>|\
				<a href="'+name+'offers">二手</a>|\
				<a href="'+name+'doulists">豆列</a>|\
				<a href="'+name+'minisite">迷你站</a>|\
				<a href="'+name+'artist">音乐人</a>|\
				<a href="'+name+'hosts">主办方</a>|\
				</span>\
				<a href="#" onclick="$(\'textarea\').attr(\'value\',\'@\'+\''+nname+'\'+\'　\'); $(\'textarea\').focus()">对<span style="color:#83bf73;">'+nname+'</span>说</a>\
				</span>';
			(firend.parentNode.tagName == 'LI' ? firend.parentNode : firend.parentNode.parentNode).appendChild(toolBar);
		}
	}
};

/* ************************ 其他杂项功能 ************************ */

// Ctrl + Enter 回复快捷键
function ctrlEnter(){
	var form = document.forms;
	for (var i=0,j=form.length; i<j; i++){
		form[i].addEventListener('keydown', function(e){
			if ( e.ctrlKey && e.keyCode == '13'){
				this.submit();
			}
		}, false);
	}
};

// 输入框高亮函数
function hl_input() {
	if (GM_getValue('hl_input', true)){
		GM_addStyle('input:focus, select:focus, textarea:focus {-moz-outline: 2px solid -moz-rgba(255,153,0,0.5);outline: 2px solid -moz-rgba(255,153,0,0.5);-moz-outline-radius: 3px;-webkit-outline-radius: 3px;}');
	}
};

// 浮动定位工具
function settle(){
	if (GM_getValue('settler', true)){
		var settler = document.createElement('div');
		settler.className = 'gact';
		settler.style.cssText = 'position:fixed;bottom:0;border:1px solid #ccc;z-index:10;';
		settler.innerHTML = '\
			<a href="javascript:;" title="置顶，快捷键为：'+GM_getValue('hk_top', '↑')+'" onclick="scrollTo(0,0);">&nbsp;Top↑&nbsp;</a>\
			<a href="javascript:;" title="置底，快捷键为：'+GM_getValue('hk_btm', '↓')+'" onclick="scrollTo(0,99999);">&nbsp;Btm↓&nbsp;</a>\
			<a href="javascript:;" title="上一页，快捷键为：'+GM_getValue('hk_pre', '←')+'" id="prev">&nbsp;Prev←&nbsp;</a>\
			<a href="javascript:;" title="下一页，快捷键为：'+GM_getValue('hk_nxt', '→')+'" id="next">&nbsp;Next→&nbsp;</a>';
		
		// 添加自定义链接
		var links = GM_getValue('otherLinks', '我的话题|http://www.douban.com/group/my_topics\n我的评论|http://www.douban.com/mine/discussions\n').split(/\n/);
		for (i=0,j=links.length; i<j; i++) {
			var l = links[i].split('|');
			if (l.length > 1){
				settler.innerHTML += '<a href="'+ links[i].replace(l[0] + '|', '') +'">'+ l[0] +'</a>';
			}
		}
		
		$('.aside')[0].appendChild(settler);
		addHotKey(GM_getValue('hk_top', '↑'),function(){scrollTo(0,0)});
		addHotKey(GM_getValue('hk_btm', '↓'),function(){scrollTo(0,99999)});
		addHotKey(GM_getValue('hk_pre', '←'),function(){gotopage($('#pre_photo'), $('.prev')[0])});
		addHotKey(GM_getValue('hk_nxt', '→'),function(){gotopage($('#next_photo'), $('.next')[0])});
		$('#prev').addEventListener('click', function(){gotopage($('.prev')[0])}, false); 
		$('#next').addEventListener('click', function(){gotopage($('.next')[0])}, false); 
	}
};

// 翻页函数
function gotopage(obj1, obj2, obj3){
	var going = obj1 || obj2 || obj3, h = going && (going.href || going.getElementsByTagName('a')[0].href) || false;
	h && (location.href = h)||alert('呃……翻不动了');
};

// 全站搜索
function multiSearch(){
	if(GM_getValue('multiSearch', true)){
		$('ssform')[0].getElementsByTagName('span')[1].innerHTML += '\
			<div id="db_scr_btm" title="双击：立即搜索；单击：选择搜索范围">\
			<div class="db_scr_btm">综合</div>\
			<div class="db_scr_btm">社区</div>\
			<div class="db_scr_btm">读书</div>\
			<div class="db_scr_btm">电影</div>\
			<div class="db_scr_btm">音乐</div>\
			<input type="hidden" value="" name="cat">\
			</div>';
		GM_addStyle('.db_scr_btm{background:#E9F4E9;color:#0C7823;cursor:pointer;display:none;float:left;text-align:center;position:relative;width:19%;border-left:1px solid #E9F4E9;border-right:1px solid #E9F4E9;} .db_scr_btm:hover{position:relative;top:-1px;border-bottom:1px solid #a6d098;border-left:1px solid #a6d098;border-right:1px solid #a6d098;background:#fff;} .nav-srh:hover .db_scr_btm{display:block;}');
		$('#db_scr_btm').addEventListener('click', function(e){
			if(!e.target.id){
				setStyles($('.db_scr_btm'), '');
				e.target.style.cssText = 'position:relative;top:-1px;border-bottom:1px solid #a6d098;border-left:1px solid #a6d098;border-right:1px solid #a6d098;background:#fff;';
				var n = e.target.innerHTML;
				n == '综合' && ($('ssform')[0].action = 'http://www.douban.com/subject_search') && ($('cat')[0].value = '');
				n == '社区' && ($('ssform')[0].action = 'http://www.douban.com/search') && ($('cat')[0].value = '');
				n == '读书' && ($('ssform')[0].action = 'http://book.douban.com/subject_search') && ($('cat')[0].value = '1001');
				n == '电影' && ($('ssform')[0].action = 'http://movie.douban.com/subject_search') && ($('cat')[0].value = '1002');
				n == '音乐' && ($('ssform')[0].action = 'http://music.douban.com/subject_search') && ($('cat')[0].value = '1003');
			}
		}, false);
		$('#db_scr_btm').addEventListener('dblclick', function(e){if(!e.target.id){$('ssform')[0].submit();}}, false);
	}
};

// 顶部滑动导航条
function slideBar(){
	if(GM_getValue('slideBar', true)){
		$('.top-nav-items')[0].innerHTML += '\
			<div id="top-nav-items">\
				<ul id="豆瓣社区" style="display:none;">\
				<li><a href="http://www.douban.com/mine/">我的豆瓣</a></li>\
				<li><a href="http://www.douban.com/group/">我的小组</a></li>\
				<li><a href="http://www.douban.com/event/">同城</a></li>\
				<li><a href="http://www.douban.com/explore/">浏览发现</a></li>\
				</ul>\
				<ul id="豆瓣读书" style="display:none;">\
				<li><a href="http://book.douban.com/mine">我读</a></li>\
				<li><a href="http://book.douban.com/recommended">豆瓣猜</a></li>\
				<li><a href="http://book.douban.com/chart">排行榜</a></li>\
				<li><a href="http://book.douban.com/tag/">分类浏览</a></li>\
				<li><a href="http://book.douban.com/review/best/">书评</a></li>\
				<li><a href="http://book.douban.com/cart">购书单</a></li>\
				</ul>\
				<ul id="豆瓣电影" style="display:none;">\
				<li></li><li></li>\
				<li><a href="http://movie.douban.com/tv">电视剧</a></li>\
				<li><a href="http://movie.douban.com/mine">我看</a></li>\
				<li><a href="http://movie.douban.com/chart">排行榜</a></li>\
				<li><a href="http://movie.douban.com/tag/">分类浏览</a></li>\
				<li><a href="http://movie.douban.com/review/best/">热评</a></li>\
				</ul>\
				<ul id="豆瓣音乐" style="display:none;">\
				<li></li><li></li><li></li><li></li><li></li>\
				<li><a href="http://music.douban.com/artists/">音乐人</a></li>\
				<li><a href="http://music.douban.com/chart">排行榜</a></li>\
				<li><a href="http://music.douban.com/tag/">分类浏览</a></li>\
				<li><a target="blank" href="http://douban.fm/">豆瓣电台</a></li>\
				</ul>\
				<ul id="九点" style="display:none;">\
				<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>\
				<li><a href="http://9.douban.com/channel/culture">文化</a></li>\
				<li><a href="http://9.douban.com/channel/life">生活</a></li>\
				<li><a href="http://9.douban.com/channel/fun">趣味</a></li>\
				<li><a href="http://9.douban.com/channel/technology">科技</a></li>\
				<li><a href="http://9.douban.com/reader/">我的订阅</a></li>\
				</ul>\
				<ul id="豆瓣电台" style="display:none;">\
				<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>\
				<li><a href="http://douban.fm/mine" target="_blank">我的电台</a></li>\
				<li><a href="http://douban.fm/app" target="_blank">应用下载</a></li>\
				</ul>\
			</div>\
		';
		$('.top-nav-items')[0].getElementsByTagName('ul')[0].addEventListener('mouseover', function(e){
			if(e.target.href){
				setStyles($('#top-nav-items').getElementsByTagName('ul'), 'display:none;');
				$('#'+e.target.innerHTML).style.display = 'block';
			}
		}, false);
		$('#content') && $('#content').addEventListener('mouseover', function(e){
			setStyles($('#top-nav-items').getElementsByTagName('ul'), 'display:none;');
		}, false);
	}
};

// 破解音乐人下载链接
function musicLink(){
	if(/douban\.com\/artist/i.test(location.href) && $('#songlist') && GM_getValue('musicLink', true)){
		$('.a_down_title')[0].className = '';
		// eval($('#song').getElementsByTagName('script')[0].innerHTML); // sdata
		var downLinks = xpath('//table[@id="songlist"]/tbody/tr[@id]/td[2]');
		for(var l,i=0,j=downLinks.snapshotLength; i<j; i++){
			l = downLinks.snapshotItem(i);
			l.getElementsByTagName('a').length || (l.innerHTML = '<a href="'+ deBase64(unsafeWindow.sdata[i]['url'])+'" title="下载：'+decodeURIComponent(unsafeWindow.sdata[i]['title'])+'   by豆瓣助手"><img src="http://t.douban.com/pics/download.gif"/></a>');
		}
	}
};

// 彩蛋（Konami Code）：在非豆瓣页面依次按下 ↑↑↓↓←→←→ 键，可在新标签中打开豆瓣
function openDouban(){
	var k=[];
	document.addEventListener('keydown', function(e){
		k.push(e.keyCode);
		if(k.toString().indexOf('38,38,40,40,37,39,37,39')>=0){
		   GM_openInTab('http://www.douban.com/');
		   k=[];
		}
	}, false); 
};
