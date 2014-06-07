//如果你是chrome用户，直接把这个文件拖到chrome窗口即可
//如果你是firefox用户，你需要安装greasemonkey扩展，在菜单附加组件里就可以安装。参见http://www.greasespot.net/
//如果你是opera用户，把这个文件放到你的用户脚本目录
//如果你是IE用户，...................
//

//感谢http://weibo.com/salviati的原版脚本，从中我学到很多

// ==UserScript==
// @name			YY微博优化(方便临时隐藏某人动态)
// @namespace		http://weibo.com/collger
// @description		在新浪微博（weibo.com）个人主页隐藏指定关注对象的微博（不取消关注）。
// @see also        本脚本在http://weibo.com/salviati用户的工作基础上改进，使之可以在火狐中运行，并且
// @version			0.2
// @created			2011.08.15
// @modified		2011.10.04
// @author			collger
// @include			http://weibo.com/*
// @exclude			http://weibo.com/settings/*
// @exclude			http://weibo.com/pub/*
// ==/UserScript==
// 说明： 本脚本在http://weibo.com/salviati用户的工作基础上改进，使之可以在火狐中运行，并且
// 加其它方便的管理功能，如：
// * 在“我关注的人”页面，页首处会有一个“还原全部隐藏n个对象”按钮(毕竟我们平时隐藏某人都是暂时的)
// * 在“我关注的人”页面，被隐藏的人会有红色文字提示
// * 修正在新版微博中气泡中显示隐藏链接的功能，并且以后会不断跟进
// * 同步 salviati 同学的改进，在移动到隐藏目标微博时，会临时显示

(function(){

    var isClass =  function (s, c) {return ((' '+s+' ').indexOf(' '+c+' ')>-1);};
    var isFF = function() {
        return (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent));
    };

    String.prototype.count=function(s1) { 
        return (this.length - this.replace(new RegExp(s1,"g"), '').length) / s1.length;
    };


    // Chrome提供的GM_getValue()等有问题（早期版本则不支持），需要使用localStorage重新定义
    if (window.localStorage) {
        var keyroot = 'feedhider.';
	
        GM_deleteValue = function(name) {
            localStorage.removeItem(keyroot+name);
        }

        GM_getValue = function(name, defval) {
            var value = localStorage.getItem(keyroot+name);
            if (value == null)
                return defval;
            return value;
        }

        GM_setValue = function(name, value) {
            localStorage.setItem(keyroot+name, value);
        }
    }

    //FF的click设定与chrome不同
    var delegate_event = function(el, eventType, handler) {
        el = el || document;
        el.addEventListener(eventType, function(e){
				var node = el;
				node && handler.call(el, e, node);
			}, false); 
    };

//FF的GM_setValue安全检查很严，用fakeTimeout绕过
var fakeTimeout = function(callback) {
  // Register event listener
  window.document.body.addEventListener("timeoutEvent", callback, false);
  // Generate and dispatch synthetic event
  var ev = document.createEvent("HTMLEvents");
  ev.initEvent("timeoutEvent", true, false);
  window.document.body.dispatchEvent(ev);
}

var ffGM_setValue = function(n, v) {
    if (!isFF()) {
        GM_setValue(n, v);
    } else {
        fakeTimeout(function() {
                GM_setValue(n, v);
                unsafeWindow["GM_VALUE_"+n] = v;
            });
    }
}

var ffGM_getValue = function(n, v) {
    if (!isFF()) {
        return GM_getValue(n, v);
    } else {
        var ret = unsafeWindow["GM_VALUE_"+n];
        if (ret == undefined || ret == null)
            return v;
        else
            return ret;
    }
}

var getGlobalVar;
//获取globalValue的方法两者又不同
if (!isFF()) {
// Chrome原生不支持unsafeWindow，脚本运行在沙箱中，因此不能访问全局变量。
// 但用户脚本与页面共享DOM，所以可以设法将脚本注入host页
// 详见http://voodooattack.blogspot.com/2010/01/writing-google-chrome-extension-how-to.html
getGlobalVar = function(varname)
{
	var elem = document.createElement("script");
	var script, ret, id = "";

	// 生成脚本元素的随机索引
	while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ?
		0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9 )));
	// 生成脚本
	script = "(function(){document.getElementById('"+id+"').innerText="+varname+";})();";
	
	elem.id = id;
	elem.type = "text/javascript";
	elem.innerHTML = script;

	// 将元素插入DOM（马上执行脚本）
	document.head.appendChild(elem);

	// 获取返回值
	ret = elem.innerText;
 
	// 移除元素
	document.head.removeChild(elem);
	delete (elem);
	
	//console.log(varname+' = '+ret);
	return ret;
}
} else {
    getGlobalVar = function(varname) {
        var ret =  unsafeWindow[varname];
        return ret;
    }
}

var hideFeed = function(node)
{
	var content = node.childNodes[3];
	if (content.tagName!='DD' || !isClass(content.className, 'content'))
		return false;
	var author = content.childNodes[1].childNodes[1];
	if (author.tagName!='A' || !inHideList(author.getAttribute('usercard').slice(3)))
		return false;
	// 找到了待隐藏的微博
	//node.style.display = 'none';
	// 找到了待隐藏的微博
	node.childNodes[1].style.display = 'none';
	node.childNodes[3].style.display = 'none';
	// 添加隐藏提示链接
	authorClone = author.cloneNode(false);
	// 默认的用户链接中多了一个换行符和两个tab
	authorClone.innerHTML = '@'+author.innerHTML.slice(3);
	var show1 = document.createTextNode('本条来自');
	var show2 = document.createTextNode('的微博已被隐藏，点击查看');
	var showfeed = document.createElement('a');
	showfeed.href = 'javascript:void(0)';
	showfeed.className = 'notes';
	showfeed.style.cssText = 'background-color: #FFD0D0; border-color: #FF8080; color: #FF8080; margin-bottom: 0px';
	showfeed.appendChild(show1);
	showfeed.appendChild(authorClone);
	showfeed.appendChild(show2);
	delegate_event(showfeed, 'click', function () 
	{
        this.parentNode.style.opacity = "1";
		this.parentNode.childNodes[2].style.display = '';
		this.parentNode.childNodes[4].style.display = '';
		this.parentNode.removeChild(this);
	}, false);
	delegate_event(showfeed, 'mouseover', function () 
	{
		this.parentNode.childNodes[2].style.display = '';
		this.parentNode.childNodes[4].style.display = '';
		this.parentNode.style.cssText = 'background-color: #FFFFC0;';
		this.style.cssText = 'background-color: #D0FFD0; border-color: #40D040; color: #40D040;';
	}, false);
	delegate_event(showfeed, 'mouseout', function () 
	{
		this.parentNode.childNodes[2].style.display = 'none';
		this.parentNode.childNodes[4].style.display = 'none';
		this.parentNode.style.cssText = '';
		this.style.cssText = 'background-color: #FFD0D0; border-color: #FF8080; color: #FF8080; margin-bottom: 0px;';
	}, false);
    node.style.opacity = "0.8";
	node.insertBefore(showfeed, node.childNodes[0]);
	return true;
}

var addToHideList = function(link)
{
    var $uid = getGlobalVar('$CONFIG.$uid');
	var id = link.getAttribute('usercard');
	var listname = $uid+'.list';
	var list = ffGM_getValue(listname, ',');
	if (list.indexOf(id+',') == -1)
	{
		ffGM_setValue(listname, list+id+',');
		console.log('List after adding: '+ffGM_getValue(listname));
	}
	link.innerHTML = '显示动态';
	delegate_event(link, "click", function () { removeFromHideList(this); });

}

var removeFromHideList = function(link)
{
    var $uid = getGlobalVar('$CONFIG.$uid');
	var id = link.getAttribute('usercard');
	var listname = $uid+'.list';
	var list = ffGM_getValue(listname, ',');
	ffGM_setValue(listname, list.replace(','+id+',',','));
	link.innerHTML = '隐藏动态';
	delegate_event(link, "click",  function () { addToHideList(this); });
	console.log('List after removal: '+ffGM_getValue(listname));

}

var inHideList = function(id)
{
    var $uid = getGlobalVar('$CONFIG.$uid');
	var list = ffGM_getValue($uid+'.list', ',');
	return (list.indexOf(','+id+',') > -1);
}

var modifyNamecard = function(node)
{
    var $uid = getGlobalVar('$CONFIG.$uid');
	// 只有关注对象（包括单向和双向关注）的气球中有"W_addbtn_even"类
	if (node.getElementsByClassName('W_addbtn_even').length == 0)
		return false;
	var userdata = node.getElementsByClassName('userdata');
	if (userdata.length == 0)
		return false;
	// “关注”、“粉丝”和“微博”链接中一定使用数字id
	var userlinks = userdata[0].getElementsByTagName('a');
	if (userlinks.length == 0)
		return false;
	var id = userlinks[0].pathname.split('/')[1];
	if (id == $uid)
		return false;
	var links = node.getElementsByClassName('links');
	if (links.length == 0)
		return false;
	var p = links[0].childNodes[1];
	// 创建分隔符
	var vline = document.createElement('span');
	vline.className = 'W_vline';
	vline.innerHTML = '|';
	p.appendChild(vline);
	// 创建隐藏/显示动态链接
	var hidelink = document.createElement('a');
	hidelink.href = 'javascript:void(0)';
	hidelink.setAttribute('usercard', id);
	if (inHideList(id))
	{
		hidelink.innerHTML = '显示';
		delegate_event(hidelink, "click", function () { removeFromHideList(this); location.reload(); });
	}
	else
	{
		hidelink.innerHTML = '隐藏';
		delegate_event(hidelink, "click", function () { addToHideList(this); location.reload(); });
	}
	p.appendChild(hidelink);
	return true;
}

var onDOMNodeInsertion = function(node)
{
	// 新推送的微博？
	if (node.tagName=='DL' && isClass(node.className, 'feed_list'))
		return hideFeed(node);
	// 用户信息气泡？
	if (node.tagName=='DIV' && isClass(node.className, 'name_card'))
		return modifyNamecard(node);
	return false;
}

var $uid = getGlobalVar('$CONFIG.$uid');
if (isFF())
    unsafeWindow["GM_VALUE_"+$uid+'.list'] = GM_getValue($uid+'.list', ',');

// 处理动态载入内容
delegate_event(document, 'DOMNodeInserted', function (evt) { onDOMNodeInsertion(evt.target); }, false);

if (document.title.indexOf('我的首页')==0)
{
	// 处理非动态载入内容
	var feeds = document.getElementsByClassName('feed_list');
	for (var i=0, l=feeds.length; i<l; ++i)
	{
		hideFeed(feeds[i]);
	}
}
else if (document.title.indexOf('我关注的人')==0)
{
	// 在“关注”、“粉丝”等少数页面中，用户id被储存在$CONFIG.$uid中
	$uid = getGlobalVar('$CONFIG.$uid');
	var concerns = document.getElementsByClassName('conspace');
	for (var i=0, l=concerns.length; i<l; ++i)
	{
		var id = concerns[i].id;
		var p = document.createElement('p');
		// 借用新浪粉丝列表的“举报”实现自动隐藏（“举报”不会出现在“我关注的人”页面中）
		p.id = 'report_'+id;
		p.style.display = 'none'; // 默认隐藏
		var hidelink = document.createElement('a');
		hidelink.href = 'javascript:void(0)';
		hidelink.setAttribute('usercard', id);
		if (inHideList(id))
		{
			hidelink.innerHTML = '显示动态';
			delegate_event(hidelink, "click", function () { removeFromHideList(this); location.reload();});

            concerns[i].style.cssText = 'background-color: #FFFFC0;';
            var xp = document.createElement('p'); //小X标记
            xp.id = 'gmhided_'+id;
            xp.style.display = 'inline';
            xp.style.background = 'red'; 
            xp.innerHTML = "此君临时被隐藏咯~";

            concerns[i].childNodes[3].appendChild(xp);
		}
		else
		{
			hidelink.innerHTML = '隐藏动态';
			delegate_event(hidelink, "click", function () { addToHideList(this); location.reload();});
		}
		p.appendChild(hidelink);
		concerns[i].childNodes[5].appendChild(p);
	}
    var hideCount = GM_getValue($uid+'.list', ',').count(',') - 1;
    if (hideCount > 0)
    {
        var csTitle = document.getElementsByClassName('csTitle')[0].childNodes[1];
        var showAll = document.createElement('a');
        showAll.href = 'javascript:void(0)';
        showAll.innerHTML = "  还原全部隐藏" +hideCount+ "个对象";
        csTitle.appendChild(showAll);
        delegate_event(showAll, "click", function () {
                ffGM_setValue($uid+'.list', ',');
                location.reload();
            });
    }
}

})();