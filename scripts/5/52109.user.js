// ==UserScript==·
// @name			DRL Helper
// @namespace		ashuai
// @include        https://dream4ever.org/*
// @include        https://*.dream4ever.org/*
// @include        https://d4e.org/*
// @include        https://*.d4e.org/*
// @version		0.6.20100502
// ==/UserScript==


/*******************************
 *  common
 *******************************/
 var w=window,d=window.document;
var body = window.document.body;
var byid = function(s) { return document.getElementById(s); };
var byname = function(s) { return document.getElementsByName(s); };
var bytag = function(s, n) { var d = n||document; return d.getElementsByTagName(s); };
var bypath = function(s, n) {
	var d = n || document; //doc = doc.ownerDocument || doc;
	var r = d.evaluate(s, d, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	return r.singleNodeValue || null;
};
var pos = {
	x: function (e){
		var offset=e.offsetLeft;
		if(e.offsetParent!=null) offset+=pos.x(e.offsetParent);
		return offset;
	},
	y: function (e){
		var offset=e.offsetTop;
		if(e.offsetParent!=null) offset+=pos.y(e.offsetParent);
		return offset;
	}
};

/*******************************
 *  config
 *******************************/
 
if(!GM_getValue('host')) { GM_setValue('host', ''); };
if(!GM_getValue('xmovie')) { GM_setValue('xmovie', 'BiEN,WZW,LAJ,CoWRY,MaydAY', 'XTM'); };
if(!GM_getValue('xjump')) { GM_setValue('xjump', '〖软件使用〗,7,〖软件会员区〗,8,〖影视会员区〗,19,〖音乐会员区〗,23,〖经管版〗,93,〖水上乐园〗,21;'); };
//if(!GM_getValue('ignoredThreadMode')) { GM_setValue('ignoredThreadMode', '1'); };
if(!GM_getValue('members')) { GM_setValue('members', 'name1,1'); };
if(!GM_getValue('menu_help_show')) { GM_setValue('menu_help_show', true); };
if(!GM_getValue('cfg_onlylord')) { GM_setValue('cfg_onlylord', false); };


var cfg_onlylord = GM_getValue('cfg_onlylord');


/*******************************
 *  Host
 *******************************/
var host = GM_getValue('host');
if ( host != '' && location.host != host ) {
	//location.href = location.href.replace(/^https:\/\/(sh\.|cnc\.|www\.|c\.)?(d4e|dream4ever)\./, 'https:\/\/dream4ever\.');
	if( location.host.substring(0, 4) == 'blog' ) return;
	location.href = location.href.replace(/^https:\/\/(\w+\.)?(d4e|dream4ever)\.org/, 'https:\/\/' + host);
};

var DRLHelper = {
	addGolbalStyle : function(css) {
	    var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	},
	removeNavigation : function(index) {
		var h = bypath('//div[1]/table/tbody/tr');
		//alert(bypath('td[2]', h).innerHTML);
		h.removeChild(bytag('td', h)[index]);
	},
	createNavigation : function(name, href, index, ispop) {
		var t = bytag('table')[5];
		var td = document.createElement('td');
		var a = document.createElement('a');
		a.innerHTML = name;
		a.href = href;
		if(ispop) a.target = '_blank';
		td.appendChild(a);
		td.className = 'vbmenu_header';
		t.getElementsByTagName('tr')[0].insertBefore(td, t.getElementsByTagName('td')[index]);
	},
	ignoreThreadByMembers : function() {
		var members = GM_getValue('members').replace(/(\s+)?,(\s+)?/g,',').split(',');
		var html = bytag('span');
		var thread;
		if( location.pathname != '/forumdisplay.php') { return; };
		if( members[0] == '' ) { return; };
		for( var i=0; i<html.length; i++) {
			for(var j = 0; j < members.length; j+=2) {
				if ( html[i].innerHTML == members[j] ) {
					thread = html[i].parentNode.parentNode.parentNode;
					//thread.style.display = 'none';
					thread.className = 'drl_helper_igThreadMode' + members[j+1];
				}
			}
		}
	},
	nextPage : function() { // 翻页
		d.addEventListener('keyup', function(e) {
			e = e ? e : window.event;
			if( e.target.tagName == 'INPUT' ) { return; };
			if( e.target.tagName == 'TEXTAREA' ) { return; };
			if( e.target.tagName == 'SELECT' ) { return; };
			//alert(e.target.tagName);
			var key = e.keyCode ? e.keyCode : e.charCode;
			switch(key) {
				case 39: //next
					if(w.location.search.match(/page=\d+/)) {
						w.location = (''+w.location).replace(/page=(\d+)/, function(a, b) {
							var p=parseInt(b);
							return 'page=' + ++p;
						});
					} else {
						//alert('N/A');
						w.location = w.location + '&page=2';
					}
					break;
				case 37: //back
					if(w.location.search.match(/page=\d+/)) {
						w.location = (''+w.location).replace(/page=(\d+)/, function(a, b) {
							var p=parseInt(b);
							if( p<=1 ) p=2;
							return 'page=' + --p;
						});
					} else {
						alert('N/A');
					}
					break;
			}
		}, true);
	},
	onlyLord : function() {
		var tid = location.toString().replace(/.+showthread\.php\?t=(\d+).*/, '$1');
		var pi = location.search.replace(/.*page=(\d+).*/, '$1');
		if( pi.substring(0,1) == '?' ) { pi = 1; }
		var lord = 0;
		var posts = bypath('//div[@id="posts"]');
		if( pi == 1 ) {
			var post1 = bypath('//div[@id="posts"]/div[1]//table//tr[2]//a');
			lord = post1.href.replace(/.+?(\d+)$/, '$1');
			GM_setValue('lord', tid+'-'+lord);
		} else {
			var t = GM_getValue('lord').split('-');
			if( t[0] == tid ) {
				lord = t[1]; 
			} else {
				GM_setValue('lord', '');
				return;
			}
		}

		var td = document.createElement('td');
		td.innerHTML = '只看樓主已開啟';
		td.className = 'vbmenu_header';
		byid('threadtools').parentNode.insertBefore(td, byid('threadtools'));

		var post, author;
		if ( lord > 0 )
		for( var i=1; i <= 100; i++ ) {
			post = bypath('//div[@id="posts"]/div['+i+']//table//tr[2]//a');
			if( post == null ) break;
			author = post.href.replace(/.+?(\d+)$/, '$1');
			post = bypath('//div[@id="posts"]/div['+i+']');
			if( lord != author ) {
				posts.removeChild(post);
				i--;
			}
		}
		
	}
};


(function() {
	// add nav
	DRLHelper.createNavigation('Blogs', 'https://blog.dream4ever.org', 6);
	DRLHelper.createNavigation('DRL-X', 'x.php', 6);
	DRLHelper.createNavigation('FTP搜索', 'http://ftp.uezone.com/search', 6, 1);
	// remove help
	GM_getValue('menu_help_show') ? DRLHelper.removeNavigation(2) : null;
	// ignoreThreadByMembers
	DRLHelper.addGolbalStyle([
		'.drl_helper_igThreadMode1 * { color:#8FA0B0; font-weight:normal; text-decoration:none; }',
		'.drl_helper_igThreadMode1 a { color:#8FA0B0; } ',
		'.drl_helper_igThreadMode1 a:link, ',
		'.drl_helper_igThreadMode1 a:hover, ',
		'.drl_helper_igThreadMode1 a:visited, ',
		'.drl_helper_igThreadMode1 a:active { text-decoration:none; }',
		'.drl_helper_igThreadMode1 img { display: none; }',
		'.drl_helper_igThreadMode2 { display: none; }'
	].join('\n'));
	DRLHelper.ignoreThreadByMembers();
	switch( w.location.pathname ) {
		case '/forumdisplay.php':
			DRLHelper.nextPage();
			break;
		case '/showthread.php':
			DRLHelper.nextPage();
			if ( cfg_onlylord ) DRLHelper.onlyLord();
			break;
	}
})();

/*******************************
 *
 *******************************/
var form = document.forms[1];
var xmovie = GM_getValue('xmovie');
var xjump = GM_getValue('xjump');
//var icon_top = 13.8;

switch( location.pathname ) {
case '/showthread.php': // 修复flash过小的问题
	var flash = bytag('embed');
	for( i = 0; i < flash.length; i ++) {
		flash[i].style.width = '640px';
		flash[i].style.height = '480px';
	}
break;
case '/x.php':
	var t = bytag('table')[10];
	var x = document.createElement('div');
	x.id = 'ashuai_s';
	var s = t.parentNode.insertBefore(x, t.nextSibling);
	s.style.paddingLeft = '188px';
	var arr = [];
	switch(location.search.replace(/.*?section=(\w+).*?/, '$1')) {
		case 'movie':
			s.innerHTML = xmovie.replace(/(\w+)[,]?/g, '<a href="#" id="search_$1">$1</a>&nbsp;&nbsp;');
			arr = xmovie.split(',');
			break;
	};
	for(var i=0;i<arr.length; i++ ) {
		byid('search_'+arr[i]).addEventListener('click', function() {
			byname('keyword')[0].value = this.innerHTML;
			form.submit();
			return false;
		}, true);
	};
	break;
default:
	//alert(location.pathname);
	break;
};

var drlicon = d.body.appendChild(document.createElement('img'));
var divjump = d.body.appendChild(document.createElement('div'));
drlicon.src = 'images/drl2/misc/navbits_start.gif';
drlicon.style.position = 'fixed';
drlicon.style.top = '10px'; //icon_top+'em';
drlicon.style.left = '5px';
drlicon.style.display = 'none';
divjump.className='vbmenu_popup';
divjump.id='navbar_jump_menu';
divjump.style.display = 'none';
divjump.style.position = 'fixed'; //'absolute';
//divjump.style.top = (icon_top+1)+'em';
divjump.style.left = '40px';
divjump.style.backgroundColor = '#94A2B7';
divjump.style.color = '#1E375A';
divjump.style.border = '1px solid #637CA0';
//alert(drlicon.innerHTML);
var mnujump = ['<table cellpadding="4" cellspacing="1" border="0"><tr><td class="thead">论坛跳转<a name="goto_jump"></a></td></tr>', '', '</table>'];
mnujump[1] = xjump.replace(/(.+?),(\d+)[,|;]/g, '<tr><td class="vbmenu_option"><a href="forumdisplay.php?f=$2">$1</a></td></tr>');
divjump.innerHTML = mnujump.join('\n');
var btn_drl = bypath('//div[@class="page"]/div/table//table//a');

btn_drl.addEventListener('mouseover', function() {
	divjump.style.display = 'block';
	divjump.style.position = 'absolute';
	divjump.style.top = (pos.y(btn_drl) + 10) + 'px';
	divjump.style.left = pos.x(btn_drl) + 'px';
	divjump.style.display = 'block';
}, true);
drlicon.addEventListener('mouseover', function() {
	divjump.style.position = 'fixed';
	divjump.style.top = '23px';
	divjump.style.left = '5px';
	divjump.style.display = 'block';
	//alert(drlicon.style.top);
}, true);
body.addEventListener('click', function() {
	divjump.style.display = 'none';
}, true);
w.addEventListener('scroll', function() {
	if( document.documentElement.scrollTop > 222 ) {
		drlicon.style.display = 'block';
	} else { drlicon.style.display = 'none'; }
}, true);


GM_registerMenuCommand('设置首选域名', function() {
	GM_setValue('host', window.prompt('請輸入你要使用的域名：\n\ne.g.\n    dream4ever.org\n    sh.dream4ever.org', GM_getValue('host')).replace(/\s/g, ''));
});
GM_registerMenuCommand('编辑快速跳转菜单', function() {
	GM_setValue('xjump', window.prompt('编辑快速跳转菜单：\n\n 格式：name1,fid1,name2,fid2', GM_getValue('xjump')).replace(/\s/g, ''));
});

GM_registerMenuCommand('只看楼主', function() {
	var c = ! GM_getValue('cfg_onlylord');
	GM_setValue('cfg_onlylord', c)
	if( c ) alert('功能開啟。'); else alert('功能關閉。');
});

GM_registerMenuCommand('查看忽略名单', function() {
	var u = GM_getValue('members')+',';
	alert( u.replace(/(\s+)?,(\s+)?/g,',').replace(/,(\d),/g, function(a,b){ return b==1?' (忽略)\n':' (靜音)\n';}) );
});
GM_registerMenuCommand('增加忽略名单', function() {
	var u = window.prompt('請輸入你要忽略的會員名：\n\n模式1表示忽略，模式2表示靜音。默認是忽略模式\n\ne.g.\n    user,1').replace(/\s/g, '');
	if ( ! u.match(/^[^,]+,\d$/) ) u+=',1';
	u = GM_getValue('members')+','+u;
	GM_setValue('members', u.replace(/(\s+)?,(\s+)?/g,','));
	alert('OK.');
});
GM_registerMenuCommand('移除忽略名单', function() {
	var r = window.prompt('請輸入你要移除的會員名：\n\ne.g.\n    user').replace(/\s/g, '');
	GM_setValue('members', GM_getValue('members').replace(new RegExp(r+',\\d,?','gi'),'').replace(/,$/,''));
	alert('OK.');
});
GM_registerMenuCommand('移除帮助菜单', function() {
	GM_setValue('menu_help_show', !GM_getValue('menu_help_show'));
	if(GM_getValue('menu_help_show')) { alert('已移除');} else { alert('已恢复'); };
});
