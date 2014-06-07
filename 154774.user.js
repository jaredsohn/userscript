// ==UserScript==
// @name	Tieba Advanced
// @namespace	http://gera2ld.blog.163.com/
// @author	Gerald <gera2ld@163.com>
// @version	2.4.6
// @description	贴吧增强 - Gerald倾情打造
// @downloadURL	https://userscripts.org/scripts/source/152918.user.js
// @updateURL	https://userscripts.org/scripts/source/152918.meta.js
// @include	http://tieba.baidu.com/*
// @exclude	http://tieba.baidu.com/tb/*
// @require	https://userscripts.org/scripts/source/153247.user.js
// ==/UserScript==

// 公共函数
var $=unsafeWindow.$,PageData=unsafeWindow.PageData,utils={
	cjk:'\u4e00-\u9fff',
	purl:'http://imgsrc.baidu.com/forum/pic/item/438dd519ebc4b745241c6ae8cffc1e1788821598.jpg',
	entity:function(e,t){
		function encode(e,t) {
			return e.replace(t,function(v) {
				var d;
				//plane 1-14 (\u10000-\ueffff), 0x2400=-0xDC00+0x10000, UserScript#150073
				if(v[1]) d=((v.charCodeAt(0)-0xd800)<<10)+v.charCodeAt(1)+0x2400;
				else d=v.charCodeAt();
				v='x'+d.toString(16);
				if(/8964/.test(v)) v=d.toString();	// WTF!
				return ('&#'+v+';').replace(/&/g,'&#x26;');	//.replace(/./g,function(v){return '&#x'+v.charCodeAt().toString(16)+';';});
			});
		}
		var d=[];
		if(typeof t!='string') t=t?utils.cjk:typeof tiebablockedwords!='undefined'?tiebablockedwords:'';
		if(t) t='['+t+']|';
		t+='[\ud800-\udb7f][\udc00-\udfff]';
		t=new RegExp(t,'g');
		for(var i=0;i<e.length;i++)
			if(e[i]=='&') {
				while(i<e.length&&e[i]!=';') d.push(e[i++]);
				if(i<e.length) d.push(e[i]);	// g1[i]==';'
			} else d.push(encode(e[i],t));
		d=d.join('');
		return d;
	},
	hook:
	function(o,n,b,a) {
		if(typeof o[n]!='function') return false;
		if(!o[n].hooked) {
			var f=o[n];
			o[n]=function() {
				var f=arguments.callee;
				for(var i in f.hook_before) f.hook_before[i].apply(this,arguments);
				var r=f.hook_func.apply(this,arguments);
				for(var i in f.hook_after) r=f.hook_after[i].apply(this,[r,arguments])||r;
				return r;
			}
			o[n].hooked=true;
			o[n].hook_after=[];
			o[n].hook_before=[];
			o[n].hook_func=f;
		}
		if(a) {
			if(typeof a=='function') a=[a];
			a.forEach(function(i){o[n].hook_after.push(i);});
		}
		if(b) {
			if(typeof b=='function') b=[b];
			b.forEach(function(i){o[n].hook_before.push(i);});
		}
	},
	addStyle:
	function(css) {return $('<style type="text/css">').html(css).appendTo('head');},
	getObj:
	function(k,v) {
		var d=localStorage.getItem('ge_'+k);
		if(d==undefined) return v; else return JSON.parse(d);
	},
	setObj:
	function(k,v) {localStorage.setItem('ge_'+k,JSON.stringify(v));},
	addButton:	// Base Function
	function(t,o,m,a,b) {
		if(m) (o.mousedown||o.mouseup).call(o,m);	// Compatible with Dragging fix
		if(a) o.insertAfter($(t).children(a));
		else if(b) o.insertBefore($(t).children(b));
		else o.appendTo($(t));
		return o;
	},
	innerText:
	function(o) {
		return $('<div>').append(o.childNodes).html(function(i,h){return h.replace(/<br>/gi,'\n');}).text();
	},
	movable:
	function(o,name) {
		if(!$(o).mousedown) return;
		function locate(css) {
			var c={};
			o.args.forEach(function(i){c[i]=/^-?\d+px/.test(css[i])?css[i]:'20px';});
			$(o).css(c);
		}
		o.moving=false;
		o.args=[$(o).css('left')=='auto'?'right':'left',$(o).css('top')=='auto'?'bottom':'top'];
		$(o).mousedown(function(e) {
			if(['DIV','TD'].indexOf(e.target.tagName)<0||e.target.contentEditable=='true') return;
			e.preventDefault();e.stopPropagation();
			this.x=e.pageX;
			if(this.args.indexOf('left')>=0) this.x-=parseInt($(this).css('left'));
			else this.x+=parseInt($(this).css('right'));
			this.y=e.pageY
			if(this.args.indexOf('top')>=0) this.y-=parseInt($(this).css('top'));
			else this.y+=parseInt($(this).css('bottom'));
			// 开始绑定mousemove和mouseup
			if(!this.moving) $(document).mousemove(function(e) {
				if(o.moving) {
					var css={};
					for(var i in o.args) {
						var arg=o.args[i];
						if(arg=='left') css[arg]=e.pageX-o.x;
						else if(arg=='right') css[arg]=o.x-e.pageX;
						else if(arg=='top') css[arg]=e.pageY-o.y;
						else if(arg=='bottom') css[arg]=o.y-e.pageY;
						else continue;
						css[arg]+='px';
					}
					locate(css);
				}
				e.preventDefault();
			}).mouseup(function(e) {
				if(o.moving) {
					o.moving=false;
					var css={};
					for(var i in o.args) {
						var arg=o.args[i];
						css[arg]=$(o).css(arg);
					}
					utils.setObj('mcss_'+name,css);
					$(document).unbind('mousemove').unbind('mouseup');
				}
			});
			this.moving=true;
		});
		locate(utils.getObj('mcss_'+name,{}));
	},
	unmovable:
	function(o) {$(o).unbind('mousedown');},
	bindProp:
	function(obj,prop,key,def,func,evt) {
		obj.prop(prop,utils.getObj(key,def));
		if(!evt) evt=['change'];
		evt.forEach(function(i){obj.bind(i,function(e){utils.setObj(key,this[prop]);if(func) obj.each(function(i,o){func.call(o,e);});});});
		return obj;
	}
};

// 出错提示按钮
function fixer(func){
	var f=$('<div>').appendTo('body').css({width:'120px',position:'fixed',left:0,top:0,display:'none','text-align':'center'});
	$('<a href=http://tieba.baidu.com/p/1948202514>出错了！复制以下信息到贴吧反馈</a>').appendTo(f).css('background','purple').css({margin:'1px',padding:'10px','border-radius':'5px',display:'block',color:'white'});
	try{func();}catch(e){f.append($('<textarea style="height:200px;">').val(e.name+': '+e.message+'\n'+(e.stacktrace||e.stack)).mouseover(function(e){this.select();})).show();}
}

// 提醒页面强制解码
function initNoticeDecode() {
	var s,r=location.pathname.match(/^\/i\/\d+(\/\w+)?/);
	if(!r) return;
	switch(r[1]) {
		case undefined:s='div.feat_right>p';break;
		case '/replyme':s='div.replyme_content>a';break;
		case '/atme':s='div.atme_content>a';break;
		default:return;
	}
	$(s).each(function(i,e){e=$(e);e.html(e.text().replace(/&(#\w*)?\.\.\.$/,'...').replace(/</g,'&lt;'));});
}

// 列表对象化
function list(lkey,ikey,dnew,def) {	// def===true: not null
	var t={};t.length=null;t.last=0;
	t.load=function(i,nosave){
		if(i==null||t.length==null) {
			t.list=lkey?utils.getObj(lkey,[]):[];
			t.length=t.list.length;
			i=ikey?utils.getObj(ikey,0):0;
		}
		if(i<0) i=0; else if(i>=t.length) i=t.length-1;
		if(ikey&&!nosave) utils.setObj(ikey,i);
		if(!t.length&&def) {
			if(typeof def=='object') {t.list=def;t.save();} else t.push();
		}
		t.cur=t.list[t.last=i];
		return t;
	};
	t.push=function(d){if(!d) d=dnew();t.list.push(d);t.save();return t.list.length-1;};
	t.pop=function(i){var o=t.list.splice(i,1)[0];t.save();t.load(i);return o;}
	t.save=function(){if(lkey) utils.setObj(lkey,t.list);if(ikey) utils.setObj(ikey,t.last);t.length=t.list.length;};
	return t;
}
// 召唤列表
function callList() {
	return list('calllist','calllast',function(){return {name:'新列表',data:[]};},true).load();
}

// DataPanel @列表
function initPanelCall() {
	if(!$('#concern_btn').css('float','right').length) return;
	function updateCSS(e) {$(e).css('background-position',j<0?'0 -20px':'0 -41px');}
	var o=callList(),u=PageData.itieba.creator.name,j=o.cur.data.indexOf(u);
	updateCSS($('<a href=# style="float:right;width:64px;height:21px;background:url('+utils.purl+') no-repeat scroll 0 -20px">').prependTo('#care_btn_wrap').click(function(){
		if(j<0) {j=o.cur.data.length;o.cur.data.push(u);}
		else {for(;j<o.cur.data.length-1;j++) o.cur.data[j]=o.cur.data[j+1];o.cur.data.pop();j=-1;}
		o.save();
		updateCSS(this);
	}));
}

// 贴子增强
var overlay,lzl_buttons=[],lzl_styles=[],lzl_update=[];		// Arrays for Lzl initiation
function initPostor() {
	$('span.font_color_disable').remove();	// 去掉被禁用的红字按钮
	// 大按钮与弹出式选项框
	utils.bindSPanel=function(b,p,init) {
		p.appendTo(hpan).addClass('ge_panel');
		b.click(function(e) {
			e.stopPropagation();
			var s=gpan.is(':visible');
			if(gpan.has(p).length) {
				if(s) return gpan.hide();
			} else {
				gpan.children().appendTo(hpan);
				gpan.css('left',(b[0].offsetLeft-10)+'px');
				p.appendTo(gpan);
			}
			if(init) init();
			gpan.show();
		});
	};
	// 新增楼中楼按钮
	utils.addPButton=function(o,c,m,a,b) {
		if(typeof c=='string') lzl_styles.push(c);
		else if(c) {lzl_styles=lzl_styles.concat(c);c=c[0];}
		if(!a&&!b) a='.lzl_panel_submit';
		lzl_buttons.push([o,c,m,a,b]);
		return o;
	};
	// 新增工具栏按钮
	utils.addTButton=function(o,m,a,b) {return utils.addButton('div.tb-editor-toolbar',o,m,a,b);};
	// 新增大按钮
	utils.addSButton=function(w) {return $('<input type=button>').appendTo('.pt_submit').addClass('subbtn_bg').val(w);};
	// 创建选项栏
	utils.addOptions=function(css) {
		if(!css) css={};
		return $('<div>').css(css).prependTo('.pt_submit').click(function(e){
			if(['A','BUTTON'].indexOf(e.target.tagName)>=0) e.preventDefault();
		});
	};
	utils.addStyle('.ge_rsep{margin-right:10px;}.pt_submit>span.subbtn_bg{margin-left:5px;}.font_strong,.font_color{background:url("http://tb2.bdstatic.com/tb/editor/v2/font_style.png") no-repeat transparent;height:20px;width:22px;}.font_color{background-position:0 -20px;}.ge_overlay{background:#000;opacity:0.6;position:fixed;top:0;bottom:0;left:0;right:0;z-index:999;display:none;}.ge_panel{position:absolute;bottom:5px;background:#eee;border:1px solid;padding:10px;border-radius:10px;}');
	var gpan=utils.addOptions({display:'none',position:'relative'}),hpan=utils.addOptions({display:'none'});	// Option Dialogs
	gpan.click(function(e){e.stopPropagation();});$('#edit_parent').click(function(e){gpan.hide();});	// Hide when losing focus
	overlay=$('<div class=ge_overlay>').appendTo('body');	// Mask layer
}

// 字体颜色初始化
function initForeColors() {
	utils.colors={blue:'#261cdc',gray:'#cccccc',red:'#e10602'};
	utils.switchColor=function(cr,cs) {
		document.execCommand('forecolor',false,document.queryCommandValue('forecolor').replace(/\s/g,'')==cr?'#333333':cs);
	}
	function fix() {
		var e=this.editArea;
		e.innerHTML=e.innerHTML.replace(/<font color="(.*?)">(.*?)<\/font>/gi,function(v,g1,g2){
			if(g1==utils.colors.red) return '<span class="edit_font_color">'+g2+'</span>';
			else if(g1==utils.colors.blue) return '<a>'+g2+'</a>';
			//else if(g1==utils.colors.gray) return '<span class="apc_src_wrapper">'+g2+'</span>';
			else return v;
		});
	}
	utils.hook(unsafeWindow.rich_postor._editor,'filteSubmitHTML',fix);
	utils.hook(unsafeWindow.TED.SimpleEditor.prototype,'filteSubmitHTML',fix);
	utils.hook(unsafeWindow.SimplePostor.prototype,'_getHtml',null,function(){return this._se.editArea.innerHTML;});
}
// 初始化贴子管理面板
function initPostManager() {
	if(utils.postManager) return;
	utils.addStyle('.tmedit{border:1px solid;overflow:auto;}.fleft{float:left;}.fright{float:right;}.x{clear:both}');
	var tm=$('<div id=tailManager style="position:fixed;display:none;left:100px;right:100px;background:lightgray;color:#333;padding:20px;border:2px solid #ccc;border-radius:20px;shadow:0 1px 5px #333;z-index:999;}">').appendTo('body');
	tm.listItems=function(t,e,x,s){
		var d=[];
		if(x) d.push('<option>'+x+'</option>');
		t.list.forEach(function(i){d.push('<option>'+i.name+'</option>');});
		e.html(d.join(''));
		if(s) {x=x?1:0;t.load(s-x);e.prop('selectedIndex',t.last+x);}
	};
	tm.newItem=function(e,d) {
		tm.list.load(tm.list.length-1);
		if(tm.list.cur.data) {
			tm.list.load(tm.list.push(d));
			$('<option>').appendTo(ti).text(tm.list.cur.name);
		} else {
			tm.list.cur.type=d.type;
			tm.list.cur.data=d.data;
		}
		$(ti).prop('selectedIndex',tm.list.last);
		editItem();
	};
	function editItem(e) {
		if(e) tm.list.load(ti.prop('selectedIndex'),1);
		var t=tm.list.cur;
		$('#tmType').val(t.type);
		if(t.type=='j'||t.type=='h') $('#tmContent').text(t.data);
		else $('#tmContent').html(t.data);
		liveShow();
	}
	function saveItem(e) {
		var t=tm.list.cur;
		t.type=$('#tmType').val();
		if(t.type=='j') try{eval(t.data=$('#tmContent').text());}catch(e){return;}
		else if(t.type=='h') t.data=$('#tmContent').text();
		else t.data=$('#tmContent').html();
	}
	function liveShow(e) {
		var t=$('#tmType').val(),s;
		if(t=='j') try{s=eval($('#tmContent').text());}catch(e){s='<font color=red>JS代码有误！</font>';}
		else if(t=='h') s=$('#tmContent').text();
		else s=$('#tmContent').html();
		$('#tmView').html(s);
	}
	tm.loadPanel=function(t,n,c) {
		tm.list=t;$('#tmName').text(n);tm.callback=c;
		last=$('#tailIndex').prop('selectedIndex');
		tm.listItems(t,ti);editItem(1);
		overlay.fadeIn('fast',function() {
			$('#tailManager').css({top:innerHeight+'px',display:'block'}).animate({top:'100px',bottom:'20px'},300,function(){
				$('.tmedit').height($(this).height()-60).width($(this).width()/2-20);
			});
		});
	};
	var tl=$('<div class=fleft>').appendTo(tm).html('<strong id=tmName class=ge_rsep></strong>');
	var ti=$('<select id=tmIndex>').appendTo(tl).change(editItem);
	$('<span class="ge_sbtn ge_rsep">改名</span>').appendTo(tl).click(function(e) {
		var t=prompt('修改名称：',tm.list.cur.name);
		if(t) {tm.list.cur.name=t;ti.children('option:eq('+tm.list.last+')').text(t);}
	});
	$('<label for=tmType>类型：</label>').appendTo(tl);
	$('<select id=tmType>').appendTo(tl).html('<option value="s" checked>普通字串</option><option value="h">HTML代码</option><option value="j">JS代码</option>').change(function(){liveShow();saveItem();});
	var tr=$('<div class=fright></div>').appendTo(tm);
	$('<span class=ge_sbtn>添加</span>').appendTo(tr).click(tm.newItem);
	$('<span class=ge_sbtn>删除</span>').appendTo(tr).click(function() {
		if(tm.list.length==1) return;
		var l=tm.list.last;
		tm.list.pop(l);editItem();ti.children().eq(l).remove();
	});
	$('<span class=ge_sbtn>关闭</span>').appendTo(tr).click(function() {
		tm.list.save();if(tm.callback) tm.callback();
		$('#tailManager').animate({top:innerHeight+'px'},300,function() {$(this).hide();overlay.fadeOut('fast');});
	});
	$('<div class=x></div><div><label class=fleft>编辑框</label><label class=fright>预览框</label></div><div class=x></div>').appendTo(tm);
	$('<div contentEditable=true id=tmContent class="tmedit fleft">').appendTo(tm).blur(saveItem).keyup(liveShow).mouseup(liveShow);
	$('<div id=tmView class="tmedit fright"></div><div class=x></div>').appendTo(tm);
	utils.postManager=tm;
}
// 灌水：原尾巴功能
function initAddWater() {
	initPostManager();
	var tails=list('tails',null,function(){return {type:'s',data:'',name:'新尾巴'};},[
		{type:'j',name:'伟大的浏览器',data:'"——来自伟大的浏览器<br>&gt;&gt;"+navigator.userAgent'},
	]).load(),water=list('water',null,function(){return {type:'s',data:'',name:'新水贴'};},[
		{type:'s',name:'打酱油',data:'我是打酱油的~'},
	]).load();
	function initTails(){utils.postManager.listItems(tails,$('#tailIndex'),'随机',utils.getObj('tailindex',1));}
	function initWater(){utils.postManager.listItems(water,$('#waterIndex'),'随机',utils.getObj('waterindex',0));}
	function getItem(t,s){
		var l=s.prop('selectedIndex'),L=t.length;if(!L) return;
		if(!l) l=Math.floor(Math.random()*L); else l--;
		var d=t.list[l].data;
		if(t.list[l].type=='j') d=eval(d);
		return d;
	}
	var op=utils.addOptions(),last;
	utils.bindSPanel(utils.addSButton('灌水'),op);
	$('<div class=ge_sbtn style="cursor:default">智能灌水</div><label for=tailIndex>尾巴：</label>').appendTo(op);
	$('<select id=tailIndex class=ge_rsep>').appendTo(op).change(function(e){utils.setObj('tailindex',this.selectedIndex);});
	$('<span class=ge_sbtn>管理</span>').appendTo(op).click(function(e){utils.postManager.loadPanel(tails,'尾巴管理',initTails);});
	$('<br>').appendTo(op);
	utils.bindProp($('<input type=checkbox id=useTail>').appendTo(op),'checked','usetail',true);
	$('<label for=useTail class=ge_rsep>自动附加尾巴</label>').appendTo(op);
	$('<br>').appendTo(op);
	$('<span class=ge_sbtn>').html('存为新尾巴').appendTo(op).click(function(e){
		utils.postManager.loadPanel(tails,'尾巴管理',initTails);
		utils.postManager.newItem(e,{type:'h',name:'新尾巴',data:unsafeWindow.rich_postor._editor.editArea.innerHTML});
	});
	$('<hr><label for=waterIndex>水贴：</label>').appendTo(op);
	$('<select id=waterIndex class=ge_rsep>').appendTo(op).change(function(e){utils.setObj('waterindex',this.selectedIndex);});
	$('<span class=ge_sbtn>管理</span>').appendTo(op).click(function(e){utils.postManager.loadPanel(water,'水贴管理',initWater);});
	$('<br>').appendTo(op);
	$('<span class=ge_sbtn>').html('存为新水贴').appendTo(op).click(function(e){
		utils.postManager.loadPanel(water,'水贴管理',initWater);
		utils.postManager.newItem(e,{type:'h',name:'新水贴',data:unsafeWindow.rich_postor._editor.editArea.innerHTML});
	});
	$('<span class=ge_sbtn>').html('载入').appendTo(op).click(function(e){
		unsafeWindow.rich_postor._editor.execCommand('inserthtml',getItem(water,$('#waterIndex')));
	});
	$('<span class=ge_sbtn>').html('发表').appendTo(op).click(function(e){
		unsafeWindow.rich_postor._editor.editArea.innerHTML=getItem(water,$('#waterIndex'));
		unsafeWindow.rich_postor._submit();
	});
	utils.hook(unsafeWindow.rich_postor._editor,'getHtml',function() {
		var e=this.editArea,t=getItem(tails,$('#tailIndex'));
		if(!$('#useTail').prop('checked')||!t||$(e).find('#tail').appendTo(e).length) return;
		var v=$('<p>').html(t),w=v.wrap('<div id=tail><span class="apc_src_wrapper">').parents('#tail');
		e.innerHTML+='<br><br>'+w[0].outerHTML;
	});
	initTails();initWater();
}
// 空格显示修复
function initSpaceFix() {
	function fixSpace(c) {return c.replace(/&nbsp;/g,'&ensp;');}
	// 主编辑框
	utils.hook(unsafeWindow.rich_postor._editor,'getHtml',null,fixSpace);
	// 楼中楼
	utils.hook(unsafeWindow.SimplePostor.prototype,'_getHtml',null,fixSpace);
	// 强制显示空格
	$('div.d_post_content,span.lzl_content_main').each(function(i,e) {
		$(e).contents().each(function(i,e){
			if(e.nodeName=='#text')
				e.data=e.data.replace(/  /g,String.fromCharCode(8194,32)).replace(/  /g,String.fromCharCode(8194,32)).replace(/^ /g,String.fromCharCode(8194));
		});
	});
}
// 召唤术增强
function initCall() {
	var c=callList(),pl,sl;
	utils.addStyle('#callList{border:1px solid;height:125px;overflow:auto;background:white;width:380px;margin:0 auto;}#callList a{padding:2px;border-radius:2px;margin:2px;display:inline-block;}#callList a.selected{background:limegreen;color:white}#callList.delete{background:darkgray;}#callList.delete a{background:transparent;color:white;}#callList.delete a.selected{color:yellow;background:gray;}.tb-editor-toolbar .call_list,.lzl_panel_call{background:url("'+utils.purl+'") no-repeat scroll transparent -66px -20px;height:20px;width:22px;}.tb-editor-toolbar .call_list{margin-left:3px;margin-top:12px;padding-left:0;}');
	function newList(e) {
		c.load(c.push());$('<option>').appendTo(sl).text(c.cur.name);
		sl.prop('selectedIndex',c.last);
		editList(e);
	}
	function editList(e) {
		if(e) c.load(sl.prop('selectedIndex')); else sl.prop('selectedIndex',c.last);
		pl.empty();
		c.cur.data.forEach(function(i){$('<a href=#>').html(i).appendTo(pl);});
	}
	function loadLists(se,o) {
		c.load();
		var op=$(o.content);
		op.empty();
		$('<div style="background:blue;color:white;padding-left:5px">超级召唤</div>').appendTo(op);
		$('<label style="margin-left:10px">选择名单：</label>').appendTo(op);
		sl=$('<select>').appendTo(op).change(editList);
		$('<span class="ge_sbtn ge_rsep">改名</span>').appendTo(op).click(function(e) {
			e.preventDefault();
			var t=prompt('列表名称：',c.cur.name);
			if(t) {sl.children(':eq('+c.last+')').text(t);c.cur.name=t;c.save();}
		});
		$('<span class=ge_sbtn>新建列表</span>').appendTo(op).click(newList);
		$('<span class=ge_sbtn>删除列表</span>').appendTo(op).click(function(e){
			e.preventDefault();
			var l=c.last;c.pop(l);editList();sl.children().eq(l).remove();
		});
		pl=$('<div id=callList>').appendTo(op).click(function(e){
			e.preventDefault();
			e=e.target;if(e.tagName=='A') $(e).toggleClass('selected');
		});
		$('<label style="margin-left:10px">名单管理：</label>').appendTo(op);
		$('<span class=ge_sbtn>添加</span>').appendTo(op).click(function(e){
			e.preventDefault();
			var t=prompt('输入名字，多个名字用“空格”分开：');
			if(t&&(t=t.replace(/^\s+|\s+$/,'').split(/\s+/))) {
				c.cur.data=c.cur.data.concat(t);editList(e);c.save();
			}
		});
		var bd=$('<span class=ge_sbtn>删除</span>').appendTo(op).click(function(e){
			e.preventDefault();bd.hide();bc.show();pl.addClass('delete');
		});
		var bc=$('<span class=ge_sbtn>确认删除</span>').appendTo(op).css('background','red').click(function(e){
			pl.children('a.selected').remove();
			c.cur.data=[];
			pl.children('a').each(function(i,e){c.cur.data.push(e.innerHTML);});
			c.save();
		}).add($('<span class=ge_sbtn>取消</span>').appendTo(op)).click(function(e){
			e.preventDefault();
			pl.removeClass('delete');
			bc.hide();bd.show();
		}).hide();
		$('<span class=ge_sbtn>全选/不选</span>').appendTo(op).click(function(e){
			e.preventDefault();
			var a=pl.children('a:not(.selected)');
			if(a.length) a.addClass('selected'); else pl.children('a').removeClass('selected');
		});
		$('<span class=ge_sbtn style="background:orange;float:right;margin-right:10px">召唤！</span>').appendTo(op).click(function(e){
			e.preventDefault();
			pl.children('a.selected').each(function(i,e){se.execCommand('inserthtml','@'+e.innerHTML+'&nbsp;');});
			o.close();
		});
		c.list.forEach(function(i){$('<option>').text(i.name).appendTo(sl);});
		editList();
	}
	var r=new RegExp('(@[\\w'+utils.cjk+']+)(&..sp;|\\s|<|$)','g');
	function fixCall(c) {
		c=c.replace(/<span class="at">(.*?)<\/span>/gim,'$1').replace(r,function(v,g1,g2) {
			var l=g1.length-1;
			for(var i=0;i<g1.length;i++) if(g1[i].charCodeAt()>255) l++;
			if(l>14) return v;
			if(g2!='<') g2='';
			return g1+' '+g2;
		});
		return c;
	}
	// 主编辑框
	utils.hook(unsafeWindow.rich_postor._editor,'getHtml',null,fixCall);
	utils.addTButton($('<span class="call_list" title="召唤" unselectable="on"></span>'),function(e){
		se=unsafeWindow.rich_postor._editor;var l=240,o=se.overlay;
		o.toggle(l+'px','43px','400px','200px',this.offsetLeft-l+'px','about:blank',o.holder);
		if(o.isOpen) loadLists(se,o);
	});
	// 楼中楼
	utils.hook(unsafeWindow.SimplePostor.prototype,'_getHtml',null,fixCall);
	utils.addPButton($('<span title="召唤" unselectable="on"></span>'),'lzl_panel_call',function(e){
		se=unsafeWindow.LzlEditor._s_p._se;var o=se.editorPlugins.insertsmiley.overlay;
		e=$(this).offset().left-$(this).nextAll('.j_lzl_p_sm').offset().left;
		o.toggle('-120px','30px !important','400px','200px',e+120+'px','about:blank',o.holder);
		if(o.isOpen) loadLists(se,o);
	});
}
// 蓝字支持
function initFontBlue() {
	function switchBlue(e) {utils.switchColor('rgb(38,28,220)',utils.colors.blue);}
	function fixBlue(e) {
		var r=new RegExp('(@[\\w'+utils.cjk+']+[\\s&]|<\/?(?!a)[^>]*>)','gim');
		e=e.replace(/(<a>)(.*?)(<\/a>)/gim,function(v,g1,g2,g3) {
			return g1+g2.replace(r,'</a>$1<a>')+g3;
		}).replace(/<a>(.*?)<\/a>/gim, function(v,g1) {
			if(typeof g1=='undefined'||!g1.length) return '';
			g1=utils.entity(g1,true);
			v=g1.replace(/^(http:\/\/)?/,'http://');
			return '<a href="'+v+'" target="_blank">'+g1+'</a>';
		});
		return e;
	}
	unsafeWindow.rich_postor._editor.submitValidHTML.push('a');
	unsafeWindow.rich_postor._editor.editorPlugins.filtehtml.editValidHTML.push('a');
	utils.addStyle('.tb-editor-toolbar .font_blue,.lzl_panel_blue{background:url("'+utils.purl+'") no-repeat scroll 0 0 transparent;height:20px;width:22px;}.tb-editor-toolbar .font_blue{margin-left:3px;margin-top:12px;padding-left:0;}.tb-editor-editarea a{color:'+utils.colors.blue+' !important; text-decoration:underline !important}');
	// 主编辑框
	utils.addTButton($('<span class="font_blue" title="链接蓝字" unselectable="on"></span>'),switchBlue);
	utils.hook(unsafeWindow.rich_postor._editor,'getHtml',null,fixBlue);
	// 楼中楼
	utils.addPButton($('<span title="链接蓝字" unselectable="on"></span>'),'lzl_panel_blue',switchBlue);
	utils.hook(unsafeWindow.SimplePostor.prototype,'_getHtml',null,fixBlue);
}
// 灰字支持
/*function initFontGray() {
	function switchGray(e) {utils.switchColor('rgb(204,204,204)',utils.colors.gray);}
	utils.addStyle('.tb-editor-toolbar .font_gray,.lzl_panel_gray{background:url("'+utils.purl+'") no-repeat scroll -22px 0 transparent;height:20px;width:22px;}.tb-editor-toolbar .font_gray{margin-left:3px;margin-top:12px;padding-left:0;}');
	// 主编辑框
	utils.addTButton($("<span class='font_gray' title='灰字' unselectable='on'></span>"),switchGray);
	// 楼中楼
	utils.addPButton($('<span title="灰字" unselectable="on"></span>'),'lzl_panel_gray',switchGray);
}*/
// 字符实体支持，繁体支持
function initEntity() {
	//characters in CJK Unified Ideographs original set (4E00-9FFF) that are forced to be converted to simplified Chinese characters; plus characters in all plane 0 CJK blocks that are improperly converted to other characters
	utils.addStyle('.tb-editor-toolbar .html_char,.lzl_html_char,.tb-editor-toolbar .html_entity,.lzl_html_entity{background:url("'+utils.purl+'") no-repeat scroll transparent;height:20px;width:22px;}.tb-editor-toolbar .html_char,.tb-editor-toolbar .html_entity{margin-left:3px;margin-top:12px;padding-left:0;}.tb-editor-toolbar .html_char,.lzl_html_char{background-position:-44px 0}.tb-editor-toolbar .html_entity,.lzl_html_entity{background-position:-66px 0}');
	var c=utils.getObj('code','c');
	function switchCoding(e) {
		if(e) {c=c=='e'?'c':'e';utils.setObj('code',c);}
		if(c=='e') u.attr({'class':'html_entity lzl_html_entity',title:'所有CJK字符实体编码'});
		else u.attr({'class':'html_char lzl_html_char',title:'仅对字库（繁体字等）中字符实体编码'});
	}
	var r=new RegExp('^([\\w'+utils.cjk+']+ )(.*)','gim');
	function fixEntities(e) {
		e=e.split('@');
		var t=c=='c'?null:true;
		var s=[utils.entity(e.shift(),t)];
		e.forEach(function(i){
			s.push(i.replace(r,function(v,g1,g2) {return g1+utils.entity(g2,t);}));
		});
		e=s.join('@');
		return e;
	}
	// 主编辑框
	utils.hook(unsafeWindow.rich_postor._editor,'getHtml',null,fixEntities);
	var u=utils.addTButton($('<span unselectable="on"></span>'),switchCoding);
	// 楼中楼
	utils.hook(unsafeWindow.SimplePostor.prototype,'_getData',null,function(){
		var i,d;
		for(i=0;i<this._data.length;i++) if((d=this._data[i]).name=='content') {
			d.value=fixEntities(d.value);break;
		}
	});
	u=u.add(utils.addPButton($('<span unselectable="on"></span>'),['lzl_html_char','lzl_html_entity'],switchCoding));
	switchCoding();
}
// 引用功能
function initQuotation() {
	// 增加引用按钮
	var splitter = "<br>————————————————————————————————<br>";
	function quote(e) {
		e.preventDefault();
		var m=$(this).parent().hasClass('p_mtail'),o=e.target,p=$(o).parents('.l_post'),l=m?p:$(o).parents('.lzl_single_post'),
			info=JSON.parse(p.attr('data-field')),u=m?info.author.name:JSON.parse(l.attr('data-field')).user_name;
		o=l.find(m?'div.d_post_content':'span.lzl_content_main').contents(':not(blockquote)').get();
		while(o[0]&&o[0].nodeName=='BR') o.shift();	// 去掉开头空行
		while(o[0]) {p=o[o.length-1];p=p.innerText||p.textContent||p.data;if(/^\s*($|——)/.test(p)) o.pop(); else break;}	// 屏蔽尾巴
		for(p in o) o[p]=o[p].outerHTML||o[p].data;o=o.join('');
		o=o.replace(/<a [^>]*class="at"[^>]*>@(.*?)<\/a>/gi,' $1 ');	// 屏蔽引用中的点名
		o=o.replace(/(<br>)+$/gi,'');					// 去掉末尾空行
		o='引用 @'+u+' ('+info.content.floor+'楼'+(m?'':'之楼中楼')+')<br>'+o+splitter+'<br>';
		unsafeWindow.rich_postor._editor.focus();
		unsafeWindow.rich_postor._editor.execCommand('inserthtml',o);
	}
	$('<a href=#>引用</a>').css({'float':'right','margin-left':'5px'}).appendTo('.p_mtail').click(quote);
	function quoteLzl(p){$('<a href=#>引用</a>').css('margin-right','10px').insertBefore(p.find('span.lzl_time')).click(quote);}
	// 增加直达链接
	var an=$('ul.p_tail').get();
	function getAnchor(i,h){
		return '<a href="/f?ct=335675392&sc='+i+'&z='+PageData.thread.id+'#'+i+'" title="精确定位链接">'+h+'</a>';
	}
	function anchor(){
		for(var i=0,j=0;i<an.length;i++) {
			var e=$(an[i]).children().children();
			if(!e.length) {an[j++]=an[i];continue;}
			var p=e.parents('.l_post').children('a').attr('name');
			if(e[0]) e[0].outerHTML='<a href=#'+p+' title="楼层定位链接">'+e[0].innerHTML+'</a>';
			if(e[1]) e[1].outerHTML=getAnchor(p,e[1].innerHTML);
		}
		an.splice(j);
		if(an.length) setTimeout(anchor,500);
	}
	anchor();
	function anchorLzl(p){
		p.find('span.lzl_time').html(function(i,h) {
			return getAnchor($(this).parents('.lzl_single_post').children('a').attr('name'),h);
		});
	}
	// 楼中楼引用和直达链接
	lzl_update.push(function(p){quoteLzl(p);anchorLzl(p);});
	// 修改引用文字格式
	utils.addStyle('fieldset .BDE_Image{height:auto !important; width:auto !important; max-height:200px; max-width:560px !important;}');
	$('div.d_post_content').each(function(i,e) {
		var c=-1,n=$(e).contents(),j,f;
		for(j=0;j<n.length;j++) {
			f=n[j];
			if(c>=0&&f.nodeName=='#text'&&/^\s*—{27,36}\s*$/.test(f.data)) {
				n.slice(c,c+3).wrapAll('<legend>').parent().add(n.slice(c+4,j).wrapAll('<p class=quote_content>').parent()).wrapAll('<blockquote class=d_quote>').wrapAll('<fieldset>');
				$(f).add(n[c+3]).remove();
				if((f=n[j+1])&&f.nodeName=='BR') {$(f).remove();j++;}
				c=-1;
			} else if(f.nodeName=='#text'&&/^引用(\s|&nbsp;?)$/.test(f.data)
				&&n[j+1]&&n[j+1].nodeName=='A'&&n[j+1].innerHTML[0]=='@'
				&&n[j+2]&&n[j+2].nodeName=='#text'&&/^ \(.*?楼\)$/.test(n[j+2].data)
				&&n[j+3].nodeName=='BR') {
				c=j;j+=3;
			}
		}
	});
}
// 修复楼中楼定位翻页
function initLzlFix() {
	$('li.lzl_li_pager').each(function(i,e){
		if((e=$(e)).children('.lzl_more:hidden').length) e.children('.j_pager:hidden').show();
	});
}
// 初始化图片上传功能
var loadingURL='http://imgsrc.baidu.com/forum/pic/item/93ac22d7912397dd818c85fc5982b2b7d2a287e1.jpg';
function initImageLoader(callback) {
	if(!unsafeWindow.FlashImageLoader) $.getScript('http://static.tieba.baidu.com/tb/static-frs/component/sign_shai/flash_image_loader.js',function(){
		$.get(loadingURL);
		utils.uploadImage=function(data,node) {
			function uploaded(a,d) {
				var c=JSON.parse(d);
				if(c.error_code) alert('图片上传错误！'); else {
					var e='http://imgsrc.baidu.com/forum/pic/item/'+c.info.pic_id_encode+'.png';
					//unsafeWindow.rich_postor._editor.execCommand("insertimage", e, 5);
					$(node).replaceWith('<image pic_type="5" class="BDE_Image" src="'+e+'">');
				}
				unsafeWindow.FlashImageLoader.unbind('uploadComplete', uploaded);
			}
			$.get('/dc/common/imgtbs',function(r) {
				unsafeWindow.FlashImageLoader.bind('uploadComplete', uploaded);
				unsafeWindow.FlashImageLoader.uploadBase64('http://upload.tieba.baidu.com/upload/pic',data.replace(/^data:.*?;base64,/,''),{tbs:r.data.tbs});
			},'json');
		};
		callback();
	}); else callback();
}
// 初始化颜色选择面板
function initColorPanel() {
	if(utils.colorInput) return;
	utils.addStyle('#colors .colors{width:261px;cursor:pointer;margin:2px;border-collapse:separate;border-spacing:1px;background:black;}#colors{display:none;position:absolute;background:white;border:2px ridge;padding:10px;cursor:default;}#colors .colors td{display:table-cell !important;width:12px;height:12px;border:none;emptycells:show;}.colorbox{width:12px;height:12px;border:1px solid;display:inline-block;position:relative;top:3px;}');
	var cp=$('<div id=colors>');
	var r,c,t;
	r=function(e){
		var d=$(e.target).attr('data');
		if(d) {
			if(e.type=='mouseover') {
				if(c) c.css('outline','none');
				c=$(e.target).css('outline','1px outset yellow');
				$('#ge_vcolor').val(d);
			} else cp.owner.set(d);
		}
	};
	t=$('<table class=colors>').appendTo(cp).mouseover(r).click(r);
	var k=['00','33','66','99','cc','ff'],p=['#ffffff','#ff0000','#00ff00','#0000ff','#ffff00','#00ffff','#ff00ff'];
	for(var i=0;i<12;i++) {
		r=$('<tr>').appendTo(t);
		if(i<6) c='#'+k[i]+k[i]+k[i]; else c=p[i-6];
		$('<td>').appendTo(r).css({background:c}).attr('data',c);
		if(!i) $('<td rowspan=12 style="background:white;">').appendTo(r);
		for(var j=0;j<18;j++) {
			c='#'+k[Math.floor(i/6)*3+Math.floor(j/6)]+k[j%6]+k[i%6];
			$('<td>').appendTo(r).css({background:c}).attr('data',c);
		}
	}
	t=$('<form>').appendTo(cp);
	$('<span id=ge_scolor class="ge_rsep colorbox">').appendTo(t);
	r=function(){$('#ge_scolor').css('background',this.value);};
	$('<input type=text id=ge_vcolor style="width:60px" class=ge_rsep>').appendTo(t).change(r).keyup(r);
	r=function(e){e.preventDefault();cp.owner.set($('#ge_scolor').css('background-color'));};
	$('<span class=ge_sbtn>OK</span>').appendTo(t).click(r);t.submit(r);
	c=null;
	utils.colorInput=function(id,key,def,func){
		var o=$('<span id='+id+' class=colorbox>'),b=o[0],c=utils.getObj(key,def);
		b.val=function(){return $(this).attr('data');};
		o.css({border:'1px outset white',cursor:'pointer',background:c}).attr('data',c).click(function(e){
			e.preventDefault();
			if(e.target==b) {
				if(cp.owner!=b) {
					cp.owner=b;cp.appendTo(o).css({top:'auto',bottom:'auto'}).show();
					if(cp.offset().top+cp.height()>pageYOffset+innerHeight) cp.css('bottom','19px');
					$('#ge_scolor').css('background',e=o.attr('data'));
					$('#ge_vcolor').val(e);
				} else {cp.owner=null;cp.hide();}
			}
		});
		b.set=function(v){
			v=v.replace(/rgb\((\d+),\s?(\d+),\s?(\d+)\)/i,function(v,g1,g2,g3){
				v=[g1,g2,g3];for(g1 in v) {v[g1]=parseInt(v[g1]).toString(16);if(v[g1].length<2) v[g1]='0'+v[g1];}
				return '#'+v.join('');
			});
			o.attr('data',v).css('background',v);
			utils.setObj(key,v);
			cp.owner=null;cp.hide();func();
		};
		return b;
	};
}
// 图化功能
function initWord2Image() {
	var op=utils.addOptions(),st=utils.addStyle(''),undo=null;
	utils.bindSPanel(utils.addSButton('图化'),op);
	function getStyle(suf) {
		var s={},t=[];suf=suf||'';
		if($('#w2iitalic').prop('checked')) t.push('italic');
		if($('#w2ibold').prop('checked')) t.push('bold');
		t.push($('#w2isize').val()+'px');
		if(f.val()) t.push(f.val());
		s.font=t.join(' ')+suf;
		s.color=cf.val()+suf;
		s.background=($('#w2iabgclr').prop('checked')?cb.val():'transparent')+suf;
		return s;
	}
	var u=$('<div class="ge_sbtn ge_disabled" style="margin:0 0 2px;">图化组件初始化失败，点击重试</div>').appendTo(op).click(init);
	function init(){
		initImageLoader(function(){u.removeClass('ge_disabled').text('开始图化').unbind('click').click(word2Image);});
	}
	init();
	function word2Image(){
		undo=unsafeWindow.rich_postor._editor.editArea.innerHTML;
		bUndo.removeClass('ge_disabled');
		var fz=parseInt($('#w2isize').val()),r=unsafeWindow.rich_postor._editor.savedRange,s,loading=$('<img title="双击撤销">').attr('src',loadingURL);
		if(r&&r.toString()) {
			s=utils.innerText(r.extractContents());
			if(!/\S/.test(s)) return;
			r.insertNode(loading[0]);
		} else {
			r=unsafeWindow.rich_postor._editor.editArea;
			s=utils.innerText(r);
			if(!/\S/.test(s)) return;
			$(r).html(loading);
		}
		var lines=s.split('\n'),i,w=0;
		var c=document.createElement('canvas');
		var d=c.getContext('2d');
		var lh=Math.round(1.5*fz);
		s=getStyle();
		d.font=s.font;
		var data=[];
		for(i in lines) {
			var line=lines[i];
			line=line.replace(/\s+$/,'');
			do {
				for(var l=0,j=0;j<line.length;j++) {
					l+=d.measureText(line[j]).width;
					if(l>560) break; else if(w<l) w=l;
				}
				data.push(line.substr(0,j));
				line=line.substr(j);
			} while(line);
		}
		c.height=lh*data.length;
		c.width=w;
		if($('#w2ishadow').prop('checked')) {
			d.shadowColor='gray';
			d.shadowBlur=d.shadowOffsetY=d.shadowOffsetX=Math.ceil(fz/25);
		}
		if($('#w2iabgclr').prop('checked')) {
			d.fillStyle=s.background;
			d.fillRect(0,0,w,c.height);
		}
		d.font=s.font;
		d.fillStyle=d.strokeStyle=s.color;
		e=$('#w2istroke').prop('checked')?d.strokeText:d.fillText;
		for(i in data) e.call(d,data[i],0,fz+lh*i);
		utils.uploadImage(c.toDataURL(),loading);
	}
	function checkFont(e) {
		e=getStyle(' !important');
		if($('#w2ipreview').prop('checked')) st.html('#edit_parent .tb-editor-editarea{font:'+e.font+';color:'+e.color+';background:'+e.background+'}');
		else st.html('');
		f.css(e);
	}
	var ff=list('w2ifaces','w2ifaceid',null,['微软雅黑']).load();
	$('<label for=w2iface>字体：</label>').appendTo(op);
	var f=$('<select id=w2iface style="font-size:200%">').appendTo(op).change(function(e){ff.load(f.prop('selectedIndex'));checkFont();});
	ff.list.forEach(function(i){$('<option>'+i+'</option>').appendTo(f);});f.prop('selectedIndex',ff.last);
	$('<span class=ge_sbtn>+</span>').appendTo(op).click(function(e){
		e=prompt('请输入字体名称：');
		if(!e) return;
		ff.load(ff.push(e));
		$('<option>').text(e).appendTo(f);
		f.val(e);checkFont();
	});
	$('<span class=ge_sbtn>-</span>').appendTo(op).click(function(e){
		e=f.prop('selectedIndex');
		f.children(':eq('+e+')').remove();
		ff.pop(e);ff.load(f.prop('selectedIndex'));checkFont();
	});
	initColorPanel();
	var cf,cb;
	utils.bindProp($('<input type=checkbox id=w2ipreview>').appendTo(op),'checked','w2ipreview',false,checkFont);
	$('<label for=w2ipreview>预览</label><br><label for=w2icolor>颜色：</label>').appendTo(op);
	$(cf=utils.colorInput('w2icolor','w2icolor','#808000',checkFont)).appendTo(op).addClass('ge_rsep');
	//utils.bindProp(cf=$('<input type=color id=w2icolor class=ge_rsep>').appendTo(op),'value','w2icolor','#808000',checkFont,['change','keyup']);
	$('<label for=w2isize>大小：</label>').appendTo(op);
	utils.bindProp($('<input type=number id=w2isize min=9 class=ge_rsep style="height:18px;width:40px;">').appendTo(op),'value','w2isize',22,checkFont);
	utils.bindProp($('<input type=checkbox id=w2iabgclr>').appendTo(op),'checked','w2iabgclr',false,checkFont);
	$('<label for=w2iabgclr>背景色：</label>').appendTo(op);
	$(cb=utils.colorInput('w2ibgclr','w2ibgclr','#efe4b0',checkFont)).appendTo(op);
	//utils.bindProp(cb=$('<input type=color id=w2ibgclr>').appendTo(op),'value','w2ibgclr','#efe4b0',checkFont,['change','keyup']);
	$('<br>').appendTo(op);
	utils.bindProp($('<input type=checkbox id=w2ibold>').appendTo(op),'checked','w2ibold',false,checkFont);
	$('<label for=w2ibold class=ge_rsep>加粗</label>').appendTo(op);
	utils.bindProp($('<input type=checkbox id=w2iitalic>').appendTo(op),'checked','w2iitalic',false,checkFont);
	$('<label for=w2iitalic class=ge_rsep>倾斜</label>').appendTo(op);
	utils.bindProp($('<input type=checkbox id=w2ishadow>').appendTo(op),'checked','w2ishadow',false,checkFont);
	$('<label for=w2ishadow class=ge_rsep>阴影</label>').appendTo(op);
	utils.bindProp($('<input type=checkbox id=w2istroke>').appendTo(op),'checked','w2istroke',false,checkFont);
	$('<label for=w2istroke class=ge_rsep>镂空</label>').appendTo(op);
	var bUndo=$('<span class="ge_sbtn ge_disabled" title="回到最后一次图化前的状态">撤销图化</span>').appendTo(op).click(function(e){
		if(!undo) return;
		unsafeWindow.rich_postor._editor.editArea.innerHTML=undo;undo=null;
		bUndo.addClass('ge_disabled');
	});
	f.prop('selectedIndex',ff.last);checkFont();
}
// 自动选择编辑框弹窗方向
function initOverlay() {
	var t=utils.addStyle();
	function fixLocation(o) {
		var H=$(o.holder),f=H.offset(),h=H.height();
		if(f.top+h>pageYOffset+innerHeight) {	// 向上弹出
			H.css({top:'auto',bottom:H.parent().height()});
			t.html('.tb-editor-overlay .arrow{top:auto !important;bottom:-8px !important;transform:scale(-1);}');
		} else t.html('');
	}
	// 普通弹窗
	utils.hook(unsafeWindow.TED.Overlay.prototype,'open',null,function(){fixLocation(this);});
	// 涂鸦窗口
	utils.hook(unsafeWindow.TED.Editor.prototype,'toolbarcmd_picasso',null,function(){
		fixLocation(this.overlay);this.overlay.picassoPanel.sketchpad.refreshPosition();
	});
}
// 悬浮窗
function initFloat() {
	var s='#signNameWrapper{margin:0 !important;}#edit_parent>table td:first-child,.new_tiezi_tip{display:none;}.editor_users{padding:0 !important;}#edit_parent{border:3px double grey;position:fixed;z-index:998;background-color:#E7EAEB;}.subTip{display:none;}.edit_title_field{margin:0 0 -5px !important;}.tb-editor-editarea{max-height:266px !important;}';
	var styleFloat=utils.addStyle(''),styleEditor=utils.addStyle(''),
	    ea=$(unsafeWindow.rich_postor._editor.editArea),ep=$('#edit_parent'),sea=ea.attr('style'),
	    buttonFloat=utils.addSButton().click(switchFloat),sta=utils.getObj('float','normal');
	function switchFloat(e) {
		if(e) {
			if(e.type=='dblclick') {
				if(window.getSelection().length) return;
				sta=sta=='open'?'close':'open';
			} else sta=sta=='normal'?'open':'normal';
			utils.setObj('float',sta);
		}
		ep.hide();	// 防止窗口闪烁
		if(!e||e.type=='click') {
			if(sta=='normal') {
				styleEditor.html('');styleFloat.html('');buttonFloat.val('悬浮');ea.unbind('dblclick');
				utils.unmovable(ep[0]);ea.removeProp('title');ea.attr('style',sea);
			} else {
				styleEditor.html(s);buttonFloat.val('停靠');ea.dblclick(switchFloat);
				utils.movable(ep[0],'float');ea.removeProp('style');
			}
		}
		if(sta=='open') {
			styleFloat.html('#edit_parent{width:635px;}#edit_parent *{max-width:635px;}.tb-editor-editarea{min-height:50px !important;}.editor_tip_show{top:50px !important}');
			ea.attr('title','双击缩小，Ctrl+Enter快捷发表');
		} else if(sta=='close') {
			styleFloat.html('#edit_parent{width:360px;}.tb-editor-toolbar,#signNameWrapper,.pt_submit,.editor_users{display:none;}#edit_parent *{max-width:360px;}.tb-editor-wrapper{margin:0 !important}.tb-editor-editarea{min-height:24px !important;}.editor_tip_show{top:0 !important;left:60px !important;}.edit_title_field{padding:0 !important;}');
			ea.attr('title','双击展开，Ctrl+Enter快捷发表');
		}
		ep.show();	// 防止窗口闪烁
	}
	switchFloat();
}
// 图片旋转
function initImage() {
	if(!unsafeWindow.favConfig) return;
	utils.addStyle('.fav-toolbar a,.done .marked{display:inline-block;}.fav-toolbar .turnleft,.fav-toolbar .turnright{background:url("http://tb2.bdstatic.com/tb/static-frs/img/v2/tb_icon.png") no-repeat white;width:20px;height:23px;border:1px solid #ccc;margin-right:6px;}.fav-toolbar .turnleft{background-position:4px -992px;}.fav-toolbar .turnright{background-position:4px -1026px;}');
	var o,f=$('div.fav-toolbar');
	function rotate(d) {
		var r=o.attr('rad');
		if(!r) {
			o.next('.replace_tip').click();
			o.parent('.replace_div').css('overflow','visible');
		}
		r=parseInt(r)||0;
		if(d>0) r+=90; else r-=90;
		o.attr('rad',r=r%360).css('transform','rotate('+r+'deg)');
	}
	$('<a href=# class=turnright>').prependTo(f).click(function(e){e.preventDefault();rotate(1);});
	$('<a href=# class=turnleft>').prependTo(f).click(function(e){e.preventDefault();rotate(-1);});
	utils.hook(unsafeWindow.favConfig,'showLikeState',null,function(r,k){
		o=$(k[0]);f.removeClass('smallPic');
		if(o.attr('rad')%180) (k=$('div.fav-toolbar')).css('right',parseInt(k.css('right'))+o.width()-o.height()+'px');
	});
}
// 楼中楼初始化
function initLzL() {
	// 倒序添加按钮
	var t=$('#edit_parent .tb-editor-toolbar');
	if(t.children('.font_color').length)
		utils.addPButton($('<span title="红字" unselectable="on"></span>'),'font_color',
				function(e){utils.switchColor('rgb(225,6,2)',utils.colors.red);},null,'.lzl_panel_smile');
	if(t.children('.font_strong').length)
		utils.addPButton($('<span title="加粗" unselectable="on"></span>'),'font_strong',
				function(e){document.execCommand('bold',false,'');},null,'.lzl_panel_smile');
	// 楼中楼初始化
	function fixLzl() {
		var p=$('div.lzl_panel_btn');
		p.parent().css('width','50%').prev().css('width','50%');
		lzl_buttons.forEach(function(i) {utils.addButton(p,i[0],i[2],i[3],i[4]).addClass(i[1]);});
	}
	var s='.lzl_content_main img{width:auto !important;height:auto !important}';	// 楼中楼图片还原
	if(lzl_styles.length) s+='.'+lzl_styles.join(',.')+'{margin:2px 1px;float:right;}';
	utils.addStyle(s);
	if(unsafeWindow.LzlEditor._s_p) fixLzl();
	utils.hook(unsafeWindow.SimplePostor.prototype,'_buildNormalEditor',null,fixLzl);
	// 楼中楼更新函数
	function updateLzl(p) {
		var t=this;
		t.update=function(){
			var j=p.find('p.j_pager');
			if(j.attr('clicked')=='true') return t.delay();
			lzl_update.forEach(function(i){i(p);});
			j.click(function(e){
				$(this).attr('clicked','true');
				e=new updateLzl($(this).parents('ul.j_lzl_m_w'));
				e.delay();
			});
		};
		t.delay=function(){setTimeout(t.update,200);};
	}
	var p=new updateLzl($('ul.j_lzl_m_w'));p.update();
}

// 以下为模块调用，可将不需要的模块注释，不要改变顺序
if($) fixer(function(){	// 出错反馈按钮
utils.addStyle('.ge_sbtn{background:#77f;color:white;border-radius:3px;border:1px solid;border:none;margin:2px;cursor:pointer;text-align:center;}span.ge_sbtn{padding:2px 3px;}.ge_disabled{background:gray;cursor:default;}');
if(!unsafeWindow.PageData) return;
// 以下模块无需登录
if(!PageData.user) return;
if(unsafeWindow.rich_postor) {	// 以下模块仅在有输入框时加载
	initPostor();			//初始化：主输入框增强
	initFloat();			// 悬浮窗
}
if(PageData.thread) {	// 以下模块仅在帖子浏览页面加载
	initQuotation();		// 引用功能
	initLzlFix()			// 修复楼中楼定位翻页
	initImage();			// 图片旋转
}
//以下模块仅在登录时加载
if(PageData.user.is_login) {
	initNoticeDecode();		// 提醒页面强制解码
	initPanelCall();		// 用户卡片上添加到当前@列表功能支持
	if(unsafeWindow.rich_postor) {	// 以下模块仅在有输入框时加载
		initForeColors();		//初始化：字体颜色
		initAddWater();			// 灌水+尾巴
		initSpaceFix();			// 空格显示修复
		initCall();			// 召唤增强，召唤列表
		initFontBlue();			// 蓝字支持
		//initFontGray();			// 灰字支持
		initEntity();			// 字符实体支持，繁体支持
		initWord2Image();		// 文字图化
		initOverlay();			// 自动选择编辑框弹窗方向
	}
	if(unsafeWindow.LzlEditor) {	// 最后初始化楼中楼，使楼中楼支持以上功能
		initLzL();		//初始化：支持已加载的功能
	}
}
});
