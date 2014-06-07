// ==UserScript==
// @Author	Junichi Ido
// @name	Learning Time on iKnow!
// @namespace	Learning Time on iKnow!
// @include	http://www.iknow.co.jp/mypage
// @include	http://www.iknow.co.jp/users/*
// @description	This script display your learning time on iKnow!
// @version	0.0.7
// ==/UserScript==

var _apiBaseURL = 'http://api.iknow.co.jp/';
var _unitText = {'ja':{'d':'日', 'h':'時間 ', 'm':'分 ', 's':'秒', 'ds':'日'},
		'en':{'d':'day', 'h':'hr ', 'm':'min ', 's':'sec', 'ds':' days'}};
var _statusText = {'ja':{'2.0':'最高！', '1.8':'凄い', '1.5':'かなりいいね', '1.2':'いいね', '0.8':'いつも通り',
			'0.7':'あとちょい', '0.5':'ちょいサボリ気味', '0.3':'かなりサボリ気味', '0.1':'ダメダメ', '0.0':'生きてる？'},
		  'en':{'2.0':'Perfect', '1.8':'Excellent', '1.5':'Very Good', '1.2':'Good', '0.8':'Average',
			'0.7':'Below Average', '0.5':'Poor', '0.3':'Bad', '0.1':'Very Bad', '0.0':'Painful'}};
var _titleText = {'ja':{'ltt':'学習期間', 'lt':'学習時間', 'p':'最近の傾向',
		   'today':'本日', 'yesterday':'昨日', 'total':'合計', 'ave7':'7日平均', 'st':'状態'},
	     'en':{'ltt':'Learning Term', 'lt':'Learning Time', 'p':'Recent Trend',
		   'today':'Today', 'yesterday':'Yesterday', 'total':'Total', 'ave7':'Ave.', 'st':'Status'}};

function GM_wrap(f) {
    return function() {
        setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
    };
}

function UpdateChecker() { this.initialize.apply(this, arguments); };
UpdateChecker.prototype = {
    initialize: function(options) {
        this.extend(this, options);
        this.remote_version = null;
        this.check_update();
    },

    extend: function(dist, source) {
        for (var property in source) {
            if(dist == source[property]) continue;
            if(source[property] !== undefined) dist[property] = source[property];
        }
        return dist;
    },

    // Render update information in HTML
    render_update_info: function() {
        var self = this;
        var newversion = document.createElement('div');
        newversion.setAttribute('id', 'gm_update_alert');
        var update_message = document.createElement('p');
        update_message.innerHTML = [
            'A New version (',
	    this.current_version, ' -> ',
	    this.remote_version,
	    ') of Greasemonkey Script \'',
	    this.script_name, '\' ',
	    'has been released. ',
            'Update now ?'
        ].join('');

        var update_link = document.createElement('a');
        update_link.setAttribute('id', 'gm_update_alert_link');
        update_link.setAttribute('href', this.script_url);
        update_link.addEventListener('click', function() {
            var update_alert = document.getElementById('gm_update_alert');
            update_alert.parentNode.removeChild(update_alert);
        }, false);
        update_link.innerHTML =
            '[Yes] Run online update now';

        if(this.more_info_url) {
            var more_link = document.createElement('a');
            more_link.setAttribute('href', this.more_info_url);
            more_link.innerHTML = '(More information)';
            update_message.appendChild(more_link);
        }

        var close_link = document.createElement('a');
	close_link.setAttribute('id', 'gm_close_alert_link');
        close_link.setAttribute('href', 'javascript:void(0);');
        close_link.addEventListener('click', function() {
	    GM_wrap(GM_setValue)('last_check_day', self.beginning_of_day().toString());
            var update_alert = document.getElementById('gm_update_alert');
            update_alert.parentNode.removeChild(update_alert);
        }, false);
        close_link.innerHTML = [
            '[No] Cancel online update'
        ].join('');

        newversion.appendChild(update_message);
        newversion.appendChild(update_link);
        newversion.appendChild(close_link);
        document.body.appendChild(newversion);
    },

    add_update_info_style: function() {
        GM_addStyle(<><![CDATA[
            a:hover#gm_update_alert_link, a:hover#gm_close_alert_link {
		background-color:#ffaa66;
		text-decoration:none;
	    }
	    a#gm_update_alert_link, #gm_close_alert_link {
		background-color:#ee4411;
                color: #ffffff;
		padding: 2px;
		border: 1px solid #ffffff;
		margin: 0.5em 1em 0pt 1em;
	    }
            #gm_update_alert {
                padding: 0px 0pt 8px 0pt;
                background-color: #ff6633;
                color: #ffffff;
		font-weight:bold;
                width: 100%;
                position: fixed;
                z-index: 99999;
                top: 0px;
                left: 0px;
                text-align: center;
                font-size: 11px;
                font-family: Tahoma;
		border-bottom: 5px solid #000000;
            }
            #gm_update_alert p {
                margin: 3pt;
            }
            #gm_update_alert p + a:link,
            #gm_update_alert p + a:visited,
            #gm_update_alert p + a:active,
            #gm_update_alert p + a:hover {
                font-weight: bold;
            }
        ]]></>);
    },

    // Check script update remote
    check_update: function() {
        if(!this.has_need_for_check()) return;
        var user_script = this;
        GM_xmlhttpRequest({
            method: 'GET',
            url: this.script_url,
            onload: function(res) {
                user_script.remote_version = user_script.check_version(res.responseText);
                if(user_script.remote_version && user_script.remote_version > user_script.current_version) {
                    user_script.add_update_info_style();
                    user_script.render_update_info();
                } else {
                    GM_setValue('last_check_day', user_script.beginning_of_day().toString());
                }
            },
            onerror: function(res) { GM_log(res.status + ':' + res.responseText); }
        });
    },

    // Check the necessity for update: [Boolean]
    // return [true] if necessary
    has_need_for_check: function() {
        var last_check_day = new Date(GM_getValue('last_check_day', "Thu Jan 01 1970 00:00:00 GMT+0900"));
        var current_day = this.beginning_of_day();
        if(current_day > last_check_day) {
            return true;
        } else {
            return false;
        }
    },

    // Check version in remote script file: [String]
    check_version: function(string) {
        if(/\/\/\s*@version\s+([\d\.]+)/.test(string)) {
            return RegExp.$1;
        } else {
            return null;
        }
    },

    beginning_of_day: function() {
        var now = new Date();
        return(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    }
};

function setStyle() {
    var style =
	<><![CDATA[
	    a.lt_menu {
		padding:3px 6px;
		color:#fff;
		background:#0b65ac;
		text-decoration:none;
		font-weight:bold;
		border-bottom:1px solid #2b85cc;
		display:block;
		font-size:9pt;
	    }
	    a:hover.lt_menu {
		background:#1b75bc;
	    }
	    div.lt_body {
		margin: 0px;
		padding:3px;
		color:#fff;
		background:#0490D3;
	    }
	    hr {
		margin:1px;
	    }
	    img.refresh_btn {
		float:right;
		margin-top:0px;
		    -moz-border-radius:2px;
		border:solid 1px #ccc;
	    }
	]]></>;
    GM_addStyle(style);
}

function getElementsByXPath(xpath, node) {
    var node = node || document;
    var doc = node.ownerDocument ? node.ownerDocument : node;
    var nodesSnapshot = doc.evaluate(xpath, node, null,
				     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var data = [];
    for (var i=0; i<nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i));
    }
    return data;
};

function formatSec(sec) {
    var h = parseInt(sec/3600);
    var m = parseInt((sec%3600)/60);
    var s = parseInt(sec%60);
    return [h,m,s];
}

function formatNum(num, digits) {
    var src = new String(num);
    var cnt = digits - src.length;
    if (cnt <= 0) return src;
    while(cnt-- > 0) src = '0'+src;
    return src;
}

function updateMemberSince(user, today, lang) {
    var uLang = _unitText[lang];
    GM_xmlhttpRequest({
        method: 'GET',
	url: ['http://www.iknow.co.jp/users/', user].join(''),
        onload: function(res) {
	    var data = res.responseText.match(/<span[ ]+class=\"member_since\">[^\d]+(\d+)[^\d]+(\d+)[^\d]+(\d+)[^\d]+<\/span>/);
	    data.shift();
	    if(lang!='ja') {
		var tmp0 = data[0], tmp1 = data[1];
		data[0] = '20'+data[2];
		data[1] = tmp0;
		data[2] = tmp1;
	    }
	    data.map(parseInt);
	    var since_sec = new Date(data[0], data[1]-1, data[2]);
	    var span = (today-(since_sec/1000))/3600/24;
	    document.getElementById('term').innerHTML =
		[tLang['ltt'], " : <b>", span, "</b>", uLang['ds']].join('');
	},
	onerror: function(res) { GM_log(res.status + ':' + res.responseText); }
    });
}

function updateTrendData(user, app, perpage, page, lang) {
    var uLang = _unitText[lang];
    var prefix = app=='iknow' ? 'i' : 'd';
    var appName = app=='iknow' ? 'iKnow!' : 'Dictation';
    document.getElementById(prefix+'_subtitle1').innerHTML = 'Loading ...';
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: [_apiBaseURL, 'users/', user, '/study_results/', app ,'.json?per_page=', perpage, '&page=', page].join(''),
        onload: function(res) {
	    var st = res.status;
	    var ave_msg = tLang['ave7']+" : ";
	    var st_msg = tLang['st']+" : ";
	    // server or client error 
	    if(st>=400) {
		var error_msg = '';
		if(st>=500) error_msg = ' ServerError';
		else error_msg = ' ClientError';
		document.getElementById(prefix+'_7days_ave').innerHTML =
		    [ave_msg, '<b>', st, error_msg, '</b>'].join('');
		document.getElementById(prefix+'_status').innerHTML =
		    [st_msg, '<b>', st, error_msg, '</b>'].join('');
		return;
	    }
	    
	    var data = eval('('+res.responseText+')');
	    var today = data['today'];
	    var target = today - (perpage*3600*24);
	    var near = today;
	    var index = 0;
	    var len = data['study_results'].length;
	    
	    for(var i=0; i<len; i++) {
		if(target <= data['study_results'][i]['timestamp'] &&
		   near > data['study_results'][i]['timestamp']) {
		    near = data['study_results'][i]['timestamp'];
		    index = i;
		}
	    }
	    
	    var app_total_sec = data['study_results'][0]['totals']['seconds'];
	    var app_28_sec = app_total_sec - data['study_results'][index]['totals']['seconds'];
	    var i28 = formatSec(app_28_sec);
	    var app_28_sec_ave = app_28_sec/28;
	    var i28_ave = formatSec(app_28_sec_ave);

	    target = today - (7*3600*24);
	    near = today;
	    index = 0;
	    for(var i=0; i<len; i++) {
		if(target <= data['study_results'][i]['timestamp'] &&
		   near > data['study_results'][i]['timestamp']) {
		    near = data['study_results'][i]['timestamp'];
		    index = i;
		}
	    }
	    var app_7_sec = app_total_sec - data['study_results'][index]['totals']['seconds'];
	    var i7 = formatSec(app_7_sec);
	    var app_7_sec_ave = app_7_sec/7;
	    var i7_ave = formatSec(app_7_sec_ave);
	    document.getElementById(prefix+'_7days_ave').innerHTML =
		[ave_msg,
		 "<b>", formatNum(i7_ave[0],2), "</b>",
		 uLang['h'], "<b>", formatNum(i7_ave[1],2), "</b>",
		 uLang['m'], "<b>", formatNum(i7_ave[2],2), "</b>",
		 uLang['s'], " / ", uLang['d']].join('');

	    var r = (app_7_sec_ave==0)?0:app_7_sec_ave/app_28_sec_ave;
	    var s;
	    var stLang = _statusText[lang];
	    for(var th in stLang) {
		if(r>=parseFloat(th)) {s = stLang[th]; break;}
	    }
	    document.getElementById(prefix+'_status').innerHTML =
		[st_msg, "<b>", s, "</b>"].join('');

	    document.getElementById(prefix+'_subtitle1').innerHTML = appName;
	},
	onerror: function(res) { GM_log(res.status + ':' + res.responseText); }
    });
}

function updateLatestData(user, app, perpage, page, lang) {
    var prefix = app=='iknow' ? 'i' : 'd';
    var appName = app=='iknow' ? 'iKnow!' : 'Dictation';
    var tLang = _titleText[lang];
    var uLang = _unitText[lang];
    document.getElementById(prefix+'_subtitle0').innerHTML = 'Loading ...';
    
    GM_xmlhttpRequest({
	method: 'GET',
	url: [_apiBaseURL, 'users/', user, '/study_results/',app, '.json?per_page=', perpage, '&page=', page].join(''),
        onload: function(res) {
	    var st = res.status;
	    var today_msg = tLang['today']+" : ";
	    var yesterday_msg = tLang['yesterday']+" : ";
	    var total_msg = tLang['total']+" : ";
	    // server or client error
	    if(st>=400) {
		var error_msg = '';
		if(st>=500) error_msg = ' ServerError';
		else error_msg = ' ClientError';
		document.getElementById(prefix+'_today').innerHTML =
		    [today_msg, '<b>', st, error_msg, '</b>'].join('');
		document.getElementById(prefix+'_yesterday').innerHTML =
		    [yesterday_msg, '<b>', st, error_msg, '</b>'].join('');
		document.getElementById(prefix+'_total').innerHTML =
		    [total_msg, '<b>', st, error_msg, '</b>'].join('');
		return;
	    }
	    
	    var data = eval('('+res.responseText+')');
	    var app_total_sec = data['study_results'][0]['totals']['seconds'];
	    var total_h = parseInt(app_total_sec/3600);
	    var total_m = parseInt((app_total_sec%3600)/60);
	    var total_s = parseInt(app_total_sec%60);
	    var today = data['today'];
	    var today_sec = 0;
	    var today_h = 0;
	    var today_m = 0;
	    var today_s = 0;
	    var yesterday_sec = 0;
	    var yesterday_h = 0;
	    var yesterday_m = 0;
	    var yesterday_s = 0;
	    var stamp0 = data['study_results'][0]['timestamp'];
	    var stamp1 = data['study_results'][1]['timestamp'];
	    
	    if(data['today']==stamp0) {
		today_sec = data['study_results'][0]['seconds'];
		today_h = parseInt(today_sec/3600);
		today_m = parseInt((today_sec%3600)/60);
		today_s = parseInt(today_sec%60);
		if(parseInt(data['today'])-3600*24==parseInt(stamp1)) {
		    yesterday_sec = data['study_results'][1]['seconds'];
		    yesterday_h = parseInt(yesterday_sec/3600);
		    yesterday_m = parseInt((yesterday_sec%3600)/60);
		    yesterday_s = parseInt(yesterday_sec%60);
		} 
	    } else {
		if(parseInt(data['today'])-3600*24==parseInt(stamp0)) {
		    yesterday_sec = data['study_results'][0]['seconds'];
		    yesterday_h = parseInt(yesterday_sec/3600);
		    yesterday_m = parseInt((yesterday_sec%3600)/60);
		    yesterday_s = parseInt(yesterday_sec%60);
		} else if(parseInt(data['today'])-3600*24==parseInt(stamp1)) {
		    yesterday_sec = data['study_results'][1]['seconds'];
		    yesterday_h = parseInt(yesterday_sec/3600);
		    yesterday_m = parseInt((yesterday_sec%3600)/60);
		    yesterday_s = parseInt(yesterday_sec%60);
		}
	    }
	    
	    document.getElementById(prefix+'_today').innerHTML =
		[today_msg,
		 "<b>", formatNum(today_h,2), "</b>",
		 uLang['h'], "<b>", formatNum(today_m,2), "</b>",
		 uLang['m'], "<b>", formatNum(today_s,2), "</b>",
		 uLang['s']].join('');
	    document.getElementById(prefix+'_yesterday').innerHTML =
		[yesterday_msg,
		 "<b>", formatNum(yesterday_h,2), "</b>",
		 uLang['h'], "<b>", formatNum(yesterday_m,2), "</b>",
		 uLang['m'], "<b>", formatNum(yesterday_s,2), "</b>",
		 uLang['s']].join('');
	    document.getElementById(prefix+'_total').innerHTML =
		[total_msg,
		 "<b>", total_h, "</b>",
		 uLang['h'], "<b>", formatNum(total_m,2), "</b>",
		 uLang['m'], "<b>", formatNum(total_s,2), "</b>",
		 uLang['s']].join('');
	    document.getElementById(prefix+'_subtitle0').innerHTML = appName;
	    
        },
        onerror: function(res) { GM_log(res.status + ':' + res.responseText); }
    });
}

function getLatestResults() {
    this.removeEventListener('click', getLatestResults, true);
    updateLatestData(_userName, 'iknow', 2, 1, lang);
    updateLatestData(_userName, 'dictation', 2, 1, lang);
};

function getRecentResults() {
    this.removeEventListener('click', getRecentResults, true);
    var uLang = _unitText[lang];
    var since;
    var y, m, d;
    var now = new Date();
    var begining = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var today = begining/1000;

    updateMemberSince(_userName, today, lang);
    updateTrendData(_userName, 'iknow', 28, 1, lang);
    updateTrendData(_userName, 'dictation', 28, 1, lang);

};

var accordion=function(){
    var tm=10; var sp=1.5; var oc;
    function slider(n){
	this.nm=n; this.arr=[]; this.sel=''; this.rb=[];}
    slider.prototype.init=function(t,r,c,k){
	var a,h,s,l,i; a=document.getElementById(t);
	h=a.getElementsByTagName('dt'); s=a.getElementsByTagName('dd');
	l=h.length;
	for(i=0;i<l;i++){
	    var d=h[i]; this.arr[i]=d;
	    oc = new Function(this.nm+".process(this)");
	    d.addEventListener('click', oc, false);
	    if(k!=null&&c==i){this.sel=d.className=k}
	    this.rb[i]=r[i].wrappedJSObject;
	}
	l=s.length;
	for(i=0;i<l;i++){
	    var d=s[i];
	    d.maxh=d.offsetHeight;
	    s[i].wrappedJSObject.maxh=d.maxh;
	    if(c!=i){d.style.height='0';d.style.display='none';d.style.overflow='hidden'}
	}
    }
    slider.prototype.process=function(d){
	var i,l; l=this.arr.length;
	for(i=0;i<l;i++){
	    var h=this.arr[i]; var s=h.nextSibling;
	    var r=this.rb[i];
	    if(s.nodeType!=1){s=s.nextSibling}
	    clearInterval(s.timer);
	    if(h==d&&r.sel==true) {s.style.display=''; setup(s,1); h.className=this.sel}
	    else if(h==d&&s.style.display=='none'){s.style.display=''; setup(s,1); h.className=this.sel}
	    else if(s.style.display==''&&s.offsetHeight==s.wrappedJSObject.maxh){setup(s,-1); h.className=''}
	}
    }
    function setup(c,f){c.timer=setInterval(function(){
	var h,m,d;
	h=c.offsetHeight;
	m=c.wrappedJSObject.maxh;
	d=(f>0)?Math.ceil((m-h)/sp):Math.ceil(h/sp);
	c.style.height=h+(d*f)+'px'; c.style.opacity=h/m;// c.style.filter='alpha(opacity='+h*100/m+')';
	if(f>0&&h>=m){clearInterval(c.timer);}
	else if(f!=1&&h<=1){c.style.display='none'; clearInterval(c.timer);}
    },tm)}
    return{slider:slider}
}();

function mouseOverRefresh(n) {
    m=n.style;
    m.backgroundColor="#ff9966";
    n.sel=true;
};

function mouseOutRefresh(n) {
    m=n.style;
    m.backgroundColor="#0b65ac";
    n.sel=false;
};

function mouseClickRefresh(n) {
    if(n.id=='refresh_main')
	getLatestResults();
    else if(n.id='refresh_sub')
	getRecentResults();
};

setStyle();
var lang = document.getElementsByName('content-language')[0].getAttribute('content');
var userNamePos = getElementsByXPath("//div[@class='container_left']//span[1]");
var _userName = userNamePos[0].innerHTML;
var tLang = _titleText[lang];
var mainElem = document.createElement('div');
var refreshImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMiSURBVDiNbVJNbFRlFD33e++V+a0zbQdbqLYKhhKmoaIzjX/RmEY3xGBYqLxEjJCB8LNhBxsMTQwRdGGi4AOjMUwlmDQBN/wEIZLUwqtx0dCS1NLGAUY7tB3ozLTz3vu+66LzkllwkpvcxT0nJ+dcYmb4SGWyzzTo2hEQ3vSkatWEmCfCuOPKEwAu2Jbp1t0eBHCCfIF0JrtF08RAT9cqfV1ns9HWFAGYUShWMDJ2v3xn+qEnFe+2LfNselc2w4zvAMSImZHKZNcbuhjZ2tcdiseC0InQHA0gHNARDRkIGgIzxUUczw5XCsWKHQ019D4uVw1mNBEz49U9Z0/1rGv7NBgwxK3RHKquB0PX5JrVscW+9PPh3vWtpAmCEIRfrk2ot15sFwe+vuo4rmzRAYCZP7wzXRCup1gxLzLjM8eVZ8anZ5MT9+aPXu9o7tq3dVMoEQvh43e7RC0GAqAEAEipwlXH85IvPPuDlOoRgEHbMvO2ZV7549uPXhqdLOzdfewS7j8sYXqmDKkYAAMACyyvqumpSH9jJPBVZ/vKbgBTdWnruiZ2bnsn6XY+HUWicQU0Qb4D1mt38V8/37yAJ+O0J9VrF4cnq1ftqSXfvOOqAAD2W6gCMGoErpvfAOwE4D5BWLct854v4J0/+r4GEJgZF+1/1Knzf+WkVD22ZRbrWYezY6tK5aWO30fGbwCI6QBABBAR7v5XhiEYJwf/JABf1JNTmWyYiO72blx7Jj8zlwKgAagKABBEBAAdiRBWt4Tx5f63qa0lcuyVPT/fSmWy6ZrG9hWGrufyswfyheLrmkaubZmuWHZAeFxxcWFoij2P0b4yisM73gh90Jd8ubU5ci29a8A1dPGNVDI+92gBTY1B0oQYBAD/kaj/x6Glidzc5KXhyc7Mlk3hRCyI7rUJeq49HiqWXfw7W4LjeBQJGjh3ebTiSXUEAJYfSTFN5OZO3zy5LfmgsPBJ//c35o8P3CwN384jP1tG1ZUQRCjMl+S5y6OLUqmMbZljAOC38BOA7bZlci0wA8B7DYa2VzFvkFLFDV2bIcJQ1ZGHbMv82w/3fy5VdmoTZczGAAAAAElFTkSuQmCC';
mainElem.innerHTML = [
    "<div style='height:2px'></div><dl class='accordion' id='slider'><dt>",
    "<div><a class='lt_menu' id='main_menu'><img id='refresh_main' class='refresh_btn' src=",
    refreshImg,
    ">",
    tLang['lt'],
    "</a></div></dt><dd><div class='lt_body'><b id='i_subtitle0'>iKnow!</b><br><span id='i_today'>",
    tLang['today'],
    " : </span><br><span id='i_yesterday'>",
    tLang['yesterday'],
    " : </span><br><span id='i_total'>",
    tLang['total'],
    " : </span><hr><b id='d_subtitle0'>Dictation</b><br><span id='d_today'>",
    tLang['today'],
    " : </span><br><span id='d_yesterday'>",
    tLang['yesterday'],
    " : </span><br><span id='d_total'>",
    tLang['total'],
    " : </span></div></dd><dt><div><a class='lt_menu' id='sub_menu'><img id='refresh_sub' class='refresh_btn' src=",
    refreshImg,
    ">",
    tLang['p'],
    "</a></div></dt><dd><div class='lt_body'><span id='term'>",
    tLang['ltt'],
    " : </span><hr><b id='i_subtitle1'>iKnow!</b><br><span id='i_7days_ave'>",
    tLang['ave7'],
    " : </span><br><span id='i_status'>",
    tLang['st'],
    " : </span><hr><b id='d_subtitle1'>Dictation</b><br><span id='d_7days_ave'>",
    tLang['ave7'],
    " : </span><br><span id='d_status'>",
    tLang['st'], " : </span></div></dd></dl>"
].join('');
userNamePos = userNamePos[0].parentNode;
userNamePos.parentNode.insertBefore(mainElem, userNamePos.nextSibling);

var rb = getElementsByXPath("//img[@class='refresh_btn']");
for(i in rb) {
    rb[i].addEventListener('click', function(){mouseClickRefresh(this)}, true);
    rb[i].addEventListener('mouseover', function(){mouseOverRefresh(this)}, true);
    rb[i].addEventListener('mouseout', function(){mouseOutRefresh(this)}, true);
}
document.getElementById('main_menu').addEventListener('click', getLatestResults, true);
document.getElementById('sub_menu').addEventListener('click', getRecentResults, true);

obj_slider = new accordion.slider("obj_slider");
obj_slider.init("slider", rb);

if(typeof GM_getValue('last_check_day') == 'number')
    GM_setValue('last_check_day', "Thu Jan 01 1970 00:00:00 GMT+0900");

new UpdateChecker({
    script_name: 'Learning Time on iKnow!'
    ,script_url: 'http://userscripts.org/scripts/source/37822.user.js'
    ,current_version: '0.0.7'
    ,more_info_url: 'http://userscripts.org/scripts/show/37822'
});

