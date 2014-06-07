// ==UserScript==
// @name attack test
// @author soldatovsh@mail.ru
// @version 1.60
// @description  Enables some Travian v3.5 features
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude  	http://*.gettertools.*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==



//------------------------------------------------------------
var lng = ["(\u043d\u043e\u0432\u043e\u0435)","\u0430\u0442\u0430\u043a\u0443\u0435\u0442"]

var host = window.location.hostname;
hosts = host.split(".");
Xlang = hosts[hosts.length-1];
switch(Xlang){
	case "org":
		lng  =["(neu)","greift"]
	break;
}

if (location.hash == "#RallyPointFilter" || location.hash == "#RallyPointFilterCrop") {
    unsafeWindow.ab = {};
    unsafeWindow.bb = {};
    unsafeWindow.eb = 1 
}
// JQ
a = /build.php\?id=39\&tt=100/;
if (a.test(location.href)){ 
	var JQ, GM_JQ = document.createElement("script");
	GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
	GM_JQ.type = "text/javascript";
	document.body.appendChild(GM_JQ);
	var checker = setInterval(function () {
		if (typeof(JQ = unsafeWindow.jQuery) != "undefined") {
			clearInterval(checker);
			JQ.noConflict();
				newJQuery()
		}
	},100)
}
a = /berichte.php/;
if (a.test(location.href)){ 
	var JQ, GM_JQ = document.createElement("script");
	GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
	GM_JQ.type = "text/javascript";
	document.body.appendChild(GM_JQ);
	var checker = setInterval(function () {
		if (typeof(JQ = unsafeWindow.jQuery) != "undefined") {
			clearInterval(checker);
			JQ.noConflict();
				letsJQuery()
		}
	},100)
}


var data_arr = [],
    naw = null,
    col = 0,
    sityNow = "",
    attackType = 2,
    acc_name = "",
    no_more_unit = false,
    iteration = 1,
	market = [],
    market_gl = [];
	
var ttt =2*60000+Math.round(1*60000*Math.random())
//ttt = 20*1000
// преобразование строки в время
function strToTime(str){
	var a = str.split(':')
	var time = a[0]*60*60+a[1]*60+a[2]*1
	return time*1000
}
// преобразование строки в число
function strToNum(str){
	var re='(\\d+)';	
	var p = new RegExp(re,["i"]);
	var m = p.exec(str);
	if (m != null){
		return m[1]*1
	}else{
		return 0;
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function newJQuery() {
	// # 1
	// идентификация
	acc_name = JQ('#side_navi a[href*="chat"]').attr("href").split("|")[1];
    sityNow = JQ('td[class="dot hl"]').next().text();
	// # 2
	// читаем настройки
	_preference.saveDot = GM_getValue(acc_name+'saveDot')
	_preference.missAttack = GM_getValue(acc_name+'missAttack',1)
	_preference.makeUnit = GM_getValue(acc_name+'makeUnit',0)
	trace(_preference)
	
	//unsafeWindow.timer = null
	//trace(unsafeWindow.bb)
	//
	if (location.hash == "#de"){
		//настройки
		setup_interface()
		makeunit()
		return;
	}
	// фиксируем таймер
	JQ('#ltimeWrap').css({
		position: 'fixed',
		background: 'white',	
		border: '2px solid #000'
	}).find('#tp1').css({
		background:'yellow'
	})
	var base = [77,101]
	var _min,_max
	JQ.each(JQ('#raidList tbody td.vil a'),function(i,n){
		var e = n.href
		e = id2xy(e.match(/z=(\d+)/)[1])
		e = (Math.sqrt((base[0]-e[0])*(base[0]-e[0])+(base[1]-e[1])*(base[1]-e[1])))
		if(i==0){_min = _max= e}
		_min = Math.min(_min,e)
		_max = Math.max(_max,e)
	})
	//trace(_min + ':' + _max)
	var _d = _max-_min
	JQ.each(JQ('#raidList tbody td.vil a'),function(i,n){
		var e = n.href
		e = id2xy(e.match(/z=(\d+)/)[1])
		e = (Math.sqrt((base[0]-e[0])*(base[0]-e[0])+(base[1]-e[1])*(base[1]-e[1])))
		var k = (e-_min)/_d*100
		//k = (100-k)/3
		var m = 100 - k;
		
		k = k*0.8 + "%, " + m*0.8 + "%, " + 10 + "%";
		//k = m * m / 100 + "%, " + (0.82 * k + k * m / 100) + "%, " + k + "%";
		//k = k + "%, " + k + "%, " + k + "%";
		JQ(n).parent().next().css({background:"rgb(" + k + ")"})
	})
	
	/*
	var k = parseInt(market_gl[1] / market_gl[2] * 100),
            l;
        if (k > 100) l = 100;
        else if (k < 0) {
            l = 0;
            d = '<b style="color:red"> ' + market_gl[1] + "</b>"
        } else l = k;
        var m = 100 - k;
        
		k = m * m / 100 + "%, " + (0.82 * k + k * m / 100) + "%, " + k + "%";
		*/
}


function _ob(a) {
    p = a.split(":");
    return qb = p[0] * 3600 + p[1] * 60 + p[2] * 1
}
function _ob2(a) {
    p = a.split("|");
    return qb = p[p.length - 1] * 1
}
function id2xy(a) {
    var d = [];
    d[0] = a % 801 ? a % 801 - 401 : 400;
    d[1] = 400 - (a - 401 - d[0]) / 801;
    return d
}
function trace(a) {
    //console.info(a)
}
function createCookie(a, d, b) {
    if (b) {
        var c = new Date;
        c.setTime(c.getTime() + b * 24 * 60 * 60 * 1000);
        b = "; expires=" + c.toGMTString()
    } else b = "";
    document.cookie = a + "=" + d + b + "; path=/"
}
function readCookie(a) {
    a = a + "=";
    for (var d = document.cookie.split(";"), b = 0; b < d.length; b++) {
        for (var c = d[b]; c.charAt(0) == " ";) c = c.substring(1, c.length);
        if (c.indexOf(a) == 0) return c.substring(a.length, c.length)
    }
    return null
}
function eraseCookie(a) {
    createCookie(a, "", -1)
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////


// точка сева
var z_save = 366419;
var z_save = 332690
// отправка юнитов
function s_unit(){
	trace('F: s_unit :: start')
	JQ.get('a2b.php',{z:z_save,o:''},function(data){
		trace('F: s_unit [ '+getPageTime(data)+' ]')									  
		// все данные с формы
		var c = JQ(data).find(":input").serializeArray();
		var e = {};
		JQ.each(c, function (f, g) {
			e[g.name] = g.value
		});	
		// поиск ненулевых значений отправки
		var send = false
		var c = JQ(data).find("#troops a");		
		JQ.each(c, function (f, g) {
			var el = JQ(g)				 
			e[el.prev().attr('name')] = strToNum(el.text())
			send = true
		});
		if(!send){
			trace('F: s_unit // нет юнитов для сейва')
			var t=setTimeout("location.reload()",ttt);
			return false
		}else{
			// перевести в набег
			e[c] = 4
			//оставить деф
			e[t1] = 0
			e[t11] = 0
			JQ.post('a2b.php',e,function(data){
				trace('F: s_unit // отправка сейва')
				trace('F: s_unit [ '+getPageTime(data)+' ]')									  
				var c = JQ(data).find(":input").serializeArray();
				var e = {};
				JQ.each(c, function (f, g) {
					e[g.name] = g.value
				});	
				JQ.post('a2b.php',e,function(data){
					trace('F: s_unit :: end')
				})
			})
		}
	})
}
// возвращение юнитов
function b_unit(){
	trace('F: b_unit :: start')
	JQ.get('build.php',{id:39},function(data){
		trace('F: b_unit // получение списка отмены')
		trace('F: b_unit [ '+getPageTime(data)+' ]')									  
		var c = JQ(data).find('.troop_details a img[class="del"]').parent().attr('href');
		c = c.split('=')
		c = c[c.length-1]
		var z = {}
		z.id = 39
		z.a = 4
		z.t = c
		JQ.get('build.php',z,function(data){
			trace('F: b_unit :: end')
			trace('F: b_unit [ '+getPageTime(data)+' ]')							  
		})		
	})
}
// время со страницы полученой
function getPageTime(e){
	//str = JQ(e).find('#ltimeWrap span').text()
	str = '-'
	return str
}
// постройка юнитов + увод как подкрепом
function makeunit(){
	var _def = true;
	trace('F: makeunit')
	//фильтр атак
	var attak = JQ('.att a img[class="att1"]')
	// если есть атаки
	if(attak.length>0){
	//if (false) {
		//есть атаки
		JQ.get('dorf1.php', {}, function(data){
			// придется брать из пс ((	
			trace('F: makeunit [ ' + getPageTime(data) + ' ]')
			var time = (JQ(data).find('img[class="att1"]').parent().parent().next().find('div:eq(1) span').text())
			time = strToTime(time)
			// вызов сейва
			if (!isNaN(time)) {
				if (time < ttt + 40 * 1000) {
					trace('F: makeunit // отправка сейва')
					// передвигаем таймер дальше
					ttt = time + 10 * 1000
					_def = false
					// ставим таймер возобновления дефа
					var t=setTimeout("location.reload()",ttt);
					// ставим таймерыотправки дефа
					var t0 = setTimeout(s_unit, time - 25 * 1000);
					// ставим таймер возвращений
					var t1 = setTimeout(b_unit, time - 10 * 1000);
					
				}
			}
		})
	}
	// заказ дефа
	//_def = false
	//if(!_def){var t=setTimeout("location.reload()",ttt);}
	if(_def){
		JQ.get('build.php',{gid:19},function(data){
			var num = JQ(data).find('.build_details tr:eq(2) td:eq(2)').text()
			if(num==null){
				var t=setTimeout("location.reload()",ttt);
				return false
			}
			num = parseInt(num.split('(')[1])*1;
			var c = JQ(data).find(":input").serializeArray();
			var e = {};
			JQ.each(c, function (f, g) {
				e[g.name] = g.value
			});
			e.t2 = num;
			JQ.post('build.php',e,function(data){
				var t=setTimeout("location.reload()",ttt);
				//
				// после заказа фаланг 
				// страница отправки дефа
				/*
				JQ.get('a2b.php',{z:329487},function(data){
					var num = JQ(data).find('#troops a').html()
					if(num==null){
						var t=setTimeout("location.reload()",ttt);
						return false
					}											  
					num = parseInt(num.split('(')[1])*1;
					var c = JQ(data).find(":input").serializeArray();
					var e = {};
					JQ.each(c, function (f, g) {
						e[g.name] = g.value
					});	
					e.t1 = num;
					JQ.post('a2b.php',e,function(data){
						var c = JQ(data).find(":input").serializeArray();
						var e = {};
						JQ.each(c, function (f, g) {
							e[g.name] = g.value
						});	
						JQ.post('a2b.php',e,function(data){
							var t=setTimeout("location.reload()",ttt);
						})
					})
				})
					*/
			})
		})
	}
}
function setup_interface(){
	var a = '<a href=# id="_setup" style="background:yellow; border:1px solid #333;padding: 0 5px">настройки</a>'
	JQ('#textmenu').append(' | ' + a)
	JQ('#_setup').one('click',function(){
		//
		var form = ''
		form +='<div style="border-top:2px solid #333; margin-top:20px;padding-top:10px;">'
		form +='<form id="setup_form">'
		form +='<label>точка сейва</label> : '
		form +='<input type="text" class="text" name="saveDot" value="'+z_save+'">'
		form +='<br/>'
		form +='<label>уводить деф</label> : '
		form +='<input type="checkbox" name="missAttack" class="check" checked value="1">'
		form +='<br/>'
		form +='<label>строить деф</label> : '
		form +='<input type="checkbox" name="makeUnit" class="check" checked value="1">'
		form +='<br/>'
		form +='<br/>'
		form +='<input type="image" alt="OK" src="img/x.gif" class="dynamic_img " id="btn_ok" name="s1" value="ok">'
		form +='</form>'
		form +='</div>'
		JQ('#overview').after(form);
		JQ(":checkbox").click(function(){
			JQ(this).val(JQ(this).val()*1==1?0:1)
		});
			f()
		JQ('#btn_ok').click(function(){
			var c = JQ("#setup_form :input[type!='image']")
			JQ.each(c, function (f, g) {
				var g = JQ(g)
				_preference[g.attr('name')] = g.val();
			});
			trace('---')
			aa=GM_setValue('name', 5)
			trace(aa)
			trace(GM_getValue('name', 3))
			return false;
		})
		//
		return false;
	})
}
// основные настройки
var _preference = {}
function letsJQuery() {
	// # 1
	// идентификация
	//acc_name = JQ('#side_navi a[href*="chat"]').attr("href").split("|")[1];
acc_name='xxx';
    sityNow = JQ('td[class="dot hl"]').next().text();
	// # 2
	// читаем настройки
	_preference.saveDot = GM_getValue(acc_name+'saveDot')
	_preference.missAttack = GM_getValue(acc_name+'missAttack',1)
	_preference.makeUnit = GM_getValue(acc_name+'makeUnit',0)
	trace(_preference)
	
	//unsafeWindow.timer = null
	//trace(unsafeWindow.bb)
	//
	if (location.hash == "#de"){
		//настройки
		setup_interface()
		makeunit()
		return;
	}
	//
	
	// фиксируем таймер
	JQ('#ltimeWrap').css({
		position: 'fixed',
		background: 'white',	
		border: '2px solid #000'
	}).find('#tp1').css({
		background:'yellow'
	})
		
   	// меню для левой колонки
    JQ("#side_navi").append('<p style="background:#ffffdb;padding:5px 0; border:1px solid silver"><a href="/build.php?id=39&k#RallyPointFilter" > [\u042d\u043a\u0441\u043f\u043e\u0440\u0442 \u043d\u0430\u043f\u043e\u0432] </a><a href="/build.php?id=39&k#RallyPointFilterCrop" >[\u0424\u0430\u0440\u043c > \u0441\u043a\u043b\u0430\u0434]</a>'+'<a href="/dorf3.php#de">* * *</a>'+																																																																		  '</p>');
	//	запускаем фильтр атак илианализ амбара на заполнение
    if (location.hash == "#RallyPointFilter"){
		RallyPointFilter();
		return;
	} else if(location.hash == "#RallyPointFilterCrop"){
		RallyPointFilterCrop();
		return;
	}
	// страница отчетов
	a = /berichte.php/;
    if (a.test(location.href)) {
        JQ("#overview").after('<div style="padding:5px; height:50px; border:1px solid silver; background:#ffffdb" id="out_i"></div>');
        a = readCookie(acc_name + "_hand_cookie");
        d = "";
        d += '<div style="float:left"><span style="font-size:13px; font-weight:normal"> [<a href="#" id="link1">\u0444\u0430\u0440\u043c\u043b\u0438\u0441\u0442</a>] <br>[<a href="#" id="link2">\u0444\u0430\u0440\u043c\u043b\u0438\u0441\u0442 '+lng[0]+'</a>]</span><br>[<a href="#" id="link4">\u0444\u0430\u0440\u043c\u043b\u0438\u0441\u0442 (\u0432\u0441\u0435)</a>]</span></div>';
        d += '<div style="float:left; padding-left:70px">\u0442\u0438\u043f \u0430\u0442\u0430\u043a\u0438<br>';
        if (a) {
            attackType = a;
            d += a == 1 ? '<input id="__r1" type="radio" name="fb_st" value="1" checked=""> \u043d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u0435 / <input id="__r2" type="radio" name="fb_st" value="2"> \u043d\u0430\u0431\u0435\u0433 <br>' : '<input id="__r1" type="radio" name="fb_st" value="1"> \u043d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u0435 / <input id="__r2" type="radio" name="fb_st" value="2" checked=""> \u043d\u0430\u0431\u0435\u0433 <br>';
            createCookie(acc_name + "_hand_cookie", a, 10)
        } else {
            d += '<input id="__r1" type="radio" name="fb_st" value="1" > \u043d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u0435 / <input id="__r2" type="radio" name="fb_st" value="2" checked=""> \u043d\u0430\u0431\u0435\u0433 <br>';
            createCookie(acc_name + "_hand_cookie", 2, 10)
        }
        d += "</div>";
        JQ("#out_i").append(d);
		// фармлист
        JQ("#link1").one("click", function () {
            farmBuilder();
            JQ(this).unbind("click")
            return false
        });
		// фармлист новое
        JQ("#link2").one("click", function () {
            farmBuilder("new");
            JQ(this).unbind("click")
            return false
        });
		// фармлист все
        JQ("#link4").one("click", function () {
            farmBuilder("all");
            JQ(this).unbind("click")
            return false
        });
        JQ("#__r1,#__r2").click(function () {
            var b = JQ(this).attr("value");
            createCookie(acc_name + "_hand_cookie", b, 10);
            attackType = b
        });
    }
}


function farmBuilder(a) {
    a = a == "new" ? JQ('#overview tbody tr td.sub:contains("'+lng[0]+'"):contains("'+lng[1]+'")').find('a:contains("' + sityNow + '")') : a == "all" ? JQ('#overview tbody tr td.sub:contains("'+lng[1]+'")').find("a") : JQ('#overview tbody tr td.sub:contains("'+lng[1]+'")').find('a:contains("' + sityNow + '")');
    var d = a.length,
        b = [];
    JQ.each(a, function (c, e) {
        var f = JQ(e).attr("href").split("=")[1];
        b[c] = f;
        	JQ(e).parent().parent().css({
            background: "#fffdc9"
        });
        JQ(e).parent().parent().parent().after('<tr><td colspan="3" id="m' + f.split('|')[0] + '">...\u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043e\u0442\u0447\u0435\u0442\u0430...</td></tr>')
    });
	//d
    for (i = 0; i < d; i++) farmBuilderElements(b[i])
}


function farmBuilderElements(a) {
    JQ.get("/berichte.php", {
        id: a
    },
    function (d) {
        d = JQ(d).find("#report_surround tbody");
        d.find(".carry").html();
		//trace(d.find(".carry").html())
        var b = new Array(d.find(".units:eq(0) tr:eq(1) td:eq(0)").text(), d.find(".units:eq(0) tr:eq(1) td:eq(2)").text(), d.find(".units:eq(0) tr:eq(1) td:eq(5)").text()),
            c = d.find("a:eq(3)").attr("href").split("=")[1].split("&")[0];
			//trace('c '+c)
       /*
	   var b = new Array(d.find(".units:eq(0) tr:eq(1) td:eq(1)").text(), d.find(".units:eq(0) tr:eq(1) td:eq(3)").text()),
            c = d.find("a:eq(3)").attr("href").split("=")[1].split("&")[0];*/
        b = atackForm(c, b, a);
		var ff = a.split('|')[0]
        JQ("#m" + ff).html('<table id="report_surround">' + d.html() + "</table>");
        JQ("#m" + ff).append('<br><span class="aller" id="s' + a + '">' + b + "</span>");
        JQ("#m" + ff).find("a").click(function () {
            JQ(this).parent().find(".add").toggle();
            return false
        });
        JQ("#btn_" + ff).attr("rel", c);
        JQ("#btn_" + ff).attr("num", ff);
		
        JQ("#btn_" + ff).one("click", function () {
			trace('!')									
            var e = JQ("#t1_" + ff).attr("value"),
                f = JQ("#t3_" + ff).attr("value"),
                g = JQ("#t6_" + ff).attr("value"),
                h = JQ("#t2_" + ff).attr("value"),
                j = JQ("#t4_" + ff).attr("value"),
                k = JQ("#t5_" + ff).attr("value"),
                l = JQ("#t7_" + ff).attr("value"),
                m = JQ("#t11_" + ff).attr("value");
            data_arr[a] = {};
            data_arr[a].t1 = e;
            data_arr[a].t3 = f;
            data_arr[a].t6 = g;
            data_arr[a].t2 = h;
            data_arr[a].t4 = j;
            data_arr[a].t5 = k;
            data_arr[a].t7 = l;
            data_arr[a].t11 = m;
			trace('>')
			trace(data_arr[a])
            col = 0;
            col = e * 1 + f * 1 + g * 1 + h * 1 + j * 1 + k * 1 + l * 1 + m * 1;
            JQ("#m" + ff).html("\u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0434\u0430\u043d\u043d\u044b\u0445...");
            naw = a;
            getFarmForm(1, JQ(this).attr("rel"), a)
        })
    })
}
function getFarmForm(a, d, b) {
	var ff = b.split('|')[0]
    switch (a) {
    case 1:
        JQ.get("/a2b.php", {
            z: d
        },
        function (c) {
            c = JQ(c).find("form");
            c = JQ(c).find(":input").serializeArray();
            var e = {};
            JQ.each(c, function (f, g) {
                e[g.name] = g.value
            });
            c = id2xy(d);
            e.c = attackType * 1 + 2;
            e.s1 = "ok";
            e.x = c[0];
            e.y = c[1];
            e.t1 = data_arr[b].t1;
            e.t3 = data_arr[b].t3;
            e.t6 = data_arr[b].t6;
            e.t2 = data_arr[b].t2;
            e.t4 = data_arr[b].t4;
            e.t5 = data_arr[b].t5;
            e.t7 = data_arr[b].t7;
            e.t11 = data_arr[b].t11;
            data_arr[b] = e;
            getFarmForm(2, d, b)
        });
        break;
    case 2:
        JQ.post("/a2b.php", data_arr[b], function (c) {
            var e = JQ(c).find("form");
            e = JQ(e).find(":input").serializeArray();
            var f = {};
            JQ.each(e, function (g, h) {
                f[h.name] = h.value
            });
			trace(f)
			trace(data_arr[b])
            _sityNow = JQ(c).find('td[class="dot hl"]').next().text();
            if (f.t1 * 1 + f.t3 * 1 + f.t6 * 1 + f.t2 * 1 + f.t4 * 1 + f.t5 * 1 + f.t7 * 1 + f.t11 * 1 != data_arr[b].t1 * 1 + data_arr[b].t3 * 1 + data_arr[b].t6 * 1 + data_arr[b].t2 * 1 + data_arr[b].t4 * 1 + data_arr[b].t5 * 1 + data_arr[b].t7 * 1 + data_arr[b].t11 * 1) {
                JQ("#m" + ff).parent().parent().prev().find("td:eq(1)").css({
                    background: "#ffc9c9"
                });
                JQ("#m" + ff).parent().parent().prev().css({
                    background: "#ffc9c9"
                });
                JQ("#m" + ff).html('<b style="color:red">\u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0432\u043e\u0439\u0441\u043a! \u0430\u0442\u0430\u043a\u0430 \u043d\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430</b>');
                data_arr[b] = null
            } else if (_sityNow != sityNow) {
                JQ("#m" + ff).parent().parent().prev().find("td:eq(1)").css({
                    background: "#ffc9c9"
                });
                JQ("#m" + ff).parent().parent().prev().css({
                    background: "#ffc9c9"
                });
                JQ("#m" + ff).html('<b style="color:red">\u043f\u0435\u0440\u0435\u043f\u0440\u044b\u0433\u043d\u0443\u043b\u0438 \u043d\u0430 \u0434\u0440\u0443\u0433\u043e\u0435 \u0441\u0435\u043b\u043e :(</b>');
                data_arr[b] = null
            } else {
                data_arr[b] = null;
                data_arr[b] = f;
                getFarmForm(3, d, b)
            }
        });
        break;
    case 3:
        JQ.post("/a2b.php", data_arr[b], function () {
            JQ("#m" + ff).toggle();
            var c = JQ("#m" + ff).parent().prev();
            c.find("td:eq(1)").css({
                background: "#c9fffe"
            });
            c.css({
                background: "#c9fffe"
            });
            c.find("input").attr({
                checked: "checked"
            })
        });
        break
    }
}


function atackForm(a, d, b) {
	//trace((a+' : '+ d+' : '+ b))
    var c = "";
	var f = b.split('|')[0]
	f=''+f+''
	//b = f
    a = id2xy(a);
	/*
    c += '<img class="unit u22" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="' + d[0] + '" name="t2" id="t2_' + b + '" />';
    c += '&nbsp;<img class="unit u24" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="' + d[1] + '" name="t4" id="t4_' + b + '" />';
    c += '&nbsp;<a href="#">[+]</a>&nbsp;';
*/

	c += '<img class="unit u11" alt="\u0414\u0443\u0431\u0438\u043d\u0449\u0438\u043a" title="\u0414\u0443\u0431\u0438\u043d\u0449\u0438\u043a" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="' + d[0] + '" name="t1" id="t1_' + f+ '" />';
    c += '&nbsp;<img class="unit u13" alt="\u0422\u043e\u043f\u043e\u0440\u0449\u0438\u043a" title="\u0422\u043e\u043f\u043e\u0440\u0449\u0438\u043a" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="' + d[1] + '" name="t3" id="t3_' + f + '" />';
    c += '&nbsp;<img class="unit u16" alt="\u0422\u0435\u0432\u0442\u043e\u043d\u0441\u043a\u0430\u044f \u043a\u043e\u043d\u043d\u0438\u0446\u0430" title="\u0422\u0435\u0432\u0442\u043e\u043d\u0441\u043a\u0430\u044f \u043a\u043e\u043d\u043d\u0438\u0446\u0430" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="' + d[2] + '" name="t6" id="t6_' + f + '" />';
	c += '&nbsp;<a href="#">[+]</a>&nbsp;';

    c += "&nbsp;" + a[0] + "|" + a[1] + ' <input id="btn_' + f + '" value="\u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c" rel="' + b + '" type="button" src="img/x.gif" /><br><br>';
/*
	c += '<div style="display:none" class="add">';
    c += '<img class="unit u21" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t1" id="t1_' + b + '" />';
    c += '&nbsp;<img class="unit u23" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t3" id="t3_' + b + '" />';
    c += '&nbsp;<img class="unit u25" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t5" id="t5_' + b + '" />';
    c += '&nbsp;<img class="unit u26" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t6" id="t6_' + b + '" />';
    c += '&nbsp;<img class="unit u27" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t7" id="t7_' + b + '" />';
    c += '&nbsp;<img class="unit uhero" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t11" id="t11_' + b + '" />';
    c += "</div>";*/
	
	c += '<div style="display:none" class="add">';
    c += '<img class="unit u12" alt="\u041a\u043e\u043f\u044c\u0435\u043d\u043e\u0441\u0435\u0446" title="\u041a\u043e\u043f\u044c\u0435\u043d\u043e\u0441\u0435\u0446" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t2" id="t2_' + f + '" />';
    c += '&nbsp;<img class="unit u14" alt="\u0421\u043a\u0430\u0443\u0442" title="\u0421\u043a\u0430\u0443\u0442" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t4" id="t4_' + f + '" />';
    c += '&nbsp;<img class="unit u15" alt="\u041f\u0430\u043b\u0430\u0434\u0438\u043d" title="\u041f\u0430\u043b\u0430\u0434\u0438\u043d" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t5" id="t5_' + f + '" />';
    c += '&nbsp;<img class="unit u17" alt="\u0421\u0442\u0435\u043d\u043e\u0431\u0438\u0442\u043d\u043e\u0435 \u043e\u0440\u0443\u0434\u0438\u0435" title="\u0421\u0442\u0435\u043d\u043e\u0431\u0438\u0442\u043d\u043e\u0435 \u043e\u0440\u0443\u0434\u0438\u0435" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t7" id="t7_' + f + '" />';
    c += '&nbsp;<img class="unit uhero" alt="\u0413\u0435\u0440\u043e\u0439" title="\u0413\u0435\u0440\u043e\u0439" src="img/x.gif"/>&nbsp;';
    c += '<input class="text" style="width:50px;" type="text" maxlength="6" value="0" name="t11" id="t11_' + f + '" />';
    c += "</div>";

    return c
}



function RallyPointFilterCrop() {
    market_gl[0] = Math.round(JQ("#l1").attr("title") * 1 / 3600);
    market = [];
    var a = JQ("#l1").text();
    a = a.match(/(\d+)\/(\d+)/);
    market_gl[1] = a[1] * 1;
    market_gl[2] = a[2] * 1;
    time_naw = JQ("#tp1").text().split(":");
    time_naw[0] *= 1;
    time_naw[1] *= 1;
    time_naw[2] *= 1;
    JQ.each(JQ("#content .troop_details .res"), function (d, b) {
        market.push([d + 1, "", _ob(JQ(b).parent().parent().parent().next().find(".in span").text()), _ob2(JQ(b).text())])
    });
    market_list()
}
function market_list() {
    var a, d = 0,
        b = "",
        c = "";
    for (i = 0; i < market.length; i++) {
        if (market_gl[1] < 0) market_gl[1] = 0;
        a = market_gl[1] + market[i][3] + market_gl[0] * (market[i][2] - d);
        d = "";
        if (a > market_gl[2]) {
            d = '<b style="color:red"> +' + (market_gl[2] - market_gl[1]) + "</b>";
            market_gl[1] = market_gl[2]
        } else market_gl[1] = a;
        a = time_naw[0] * 3600 + time_naw[1] * 60 + time_naw[2];
        var e = a + market[i][2];
        a = Math.ceil(e / 3600) - 1;
        var f = Math.ceil((e - a * 3600) / 60) - 1;
        e = e - a * 3600 - f * 60;
        a = a % 24 < 10 ? "0" + a % 24 : a % 24;
        f = f < 10 ? "0" + f : f;
        e = e < 10 ? "0" + e : e;
        var g = market[i][2],
            h = Math.ceil(g / 3600) - 1,
            j = Math.ceil((g - h * 3600) / 60) - 1;
        g = g - h * 3600 - j * 60;
        h = h % 24 < 10 ? "0" + h % 24 : h % 24;
        j = j < 10 ? "0" + j : j;
        g = g < 10 ? "0" + g : g;
        var k = parseInt(market_gl[1] / market_gl[2] * 100),
            l;
        if (k > 100) l = 100;
        else if (k < 0) {
            l = 0;
            d = '<b style="color:red"> ' + market_gl[1] + "</b>"
        } else l = k;
        var m = 100 - k;
        k = m * m / 100 + "%, " + (0.82 * k + k * m / 100) + "%, " + k + "%";
        c += "\n<div><span style='border-right: " + 3 * l + "px solid rgb(" + k + ");'>" + a + ":" + f + ":" + e + " | " + h + ":" + j + ":" + g + " </span> &nbsp; " + market[i][1] + " +" + market[i][3] + " [" + market_gl[1] + "] " + d + "</div>";
        d = market[i][2];
        if (i + 1 == market.length) {
            h = Math.abs(Math.round(market_gl[1] / market_gl[0]));
            e = a * 3600 + f * 60 + e * 1 + h;
            a = Math.ceil(e / 3600) - 1;
            f = Math.ceil((e - a * 3600) / 60) - 1;
            e = e - a * 3600 - f * 60;
            a = a % 24 < 10 ? "0" + a % 24 : a % 24;
            f = f < 10 ? "0" + f : f;
            e = e < 10 ? "0" + e : e;
            g = market[i][2] * 1 + h;
            h = Math.ceil(g / 3600) - 1;
            j = Math.ceil((g - h * 3600) / 60) - 1;
            g = g - h * 3600 - j * 60;
            h = h % 24 < 10 ? "0" + h % 24 : h % 24;
            j = j < 10 ? "0" + j : j;
            g = g < 10 ? "0" + g : g;
            c += "\n<div><span style='color:red'>" + a + ":" + f + ":" + e + " | " + h + ":" + j + ":" + g + "</span></div>"
        }
    }
    a = "http://www.nirn.ru/test_alexsol/trav.php";
    f = window.open("", "listWindow2", "resizable=yes,height=1000,width=900,top=100,left=180");
    f = f.document;
    f.write('<html style="margin: 10px;"><head><title>**</title>');
    f.write("<style>div{padding-bottom:4px;font-family:Verdana, Geneva, sans-serif;font-size:11px;}</style>");
    f.write('</head><body style="padding: 10px;" onload="document.forms[0].submit()"><p> ... </p>');
    f.write('<div style="overflow:auto;width:90%; height:90%;">' + c + "</div>");
    f.write('<form id="cropdata" method="POST" action="' + a + '" target="Exec" ><div style="display:none"><input type="hidden" name="wwid" value="' + wwid + '" /><input type="submit" value=" ...% " /><br><textarea readonly name="source" rows="10" cols="60" >' + b + '</textarea></div></form><iframe name="Exec" width="0" height="0" id="Exec" style="display:none"></iframe>');
    f.write("</body></html>");
    f.close()
}
function RallyPointFilter() {
    var a = "";
    JQ.each(JQ("#content .troop_details"), function (b, c) {
        b = JQ(c).find("tbody:eq(0) tr:eq(1) td:eq(0)").text();
        if (b == "?") {
            b = JQ(c).find("thead td:eq(1) a").text();
            if (b.indexOf("\u041d\u0430\u0431\u0435\u0433") != -1 || b.indexOf("\u041d\u0430\u043f\u0430\u0434\u0435\u043d\u0438\u0435") != -1) {
                b = JQ(c).find("thead td:eq(0) a");
                var e = id2xy(b.attr("href").split("=")[1].split("&")[0]);
                b.text(b.text() + " (" + e[0] + "|" + e[1] + ")");
                a += '<table class="troop_details">' + JQ(c).html() + "</table>"
            }
        }
    });
    if (a != "") {
        var d = window.open("", "listWindow2", "resizable=yes,height=500,width=800,top=900,left=180");
        d = d.document;
        d.write('<html style="margin: 10px;"><head><title></title>');
        d.write(' <link href="gpack/travian35/gp_compact.css?602df" rel="stylesheet" type="text/css" /><link href="gpack/travian35/lang/ru/lang.css?602df" rel="stylesheet" type="text/css" /> <link href="img/travian_basics.css" rel="stylesheet" type="text/css" />');
        d.write('</head><body style="padding: 10px;" ><div id="build" class="gid16">');
        d.write('<div style="overflow:auto;width:90%; height:90%;">' + a + "</div>");
        d.write("</div></body></html>");
        d.close()
    }
}
