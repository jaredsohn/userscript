
// ==UserScript==
// @id             prodota.ru-99d8e5f7-9eae-489d-bb4a-641e7a29ca8b@scriptish
// @name           pd user script
// @version        2.0
// @namespace      
// @author         
// @description    
// @include        http://prodota.ru/*
// @run-at         document-end
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/**********************************ДЛЯ КУКИСОВ********************************/


    $.cookie = function(key, value, options) {
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', 
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); 
        }
        return null;
    };
/**************************А ЧО БЛЯ, ДЕЛАЮ КАК МОГУ*********************************/


if(checkBox(1))hideThis(".signature");
hideThis(".userblock");



/********************Игнор мудаков*************************/
$(".postitem").each(function() {
var id = $(this).find(".poster>h4>a").attr("href");
var id = id.slice(52);
$(this).find(".postinfo .postingbuttons").append('<li class="ignore"><a class="'+id+'" href="javascript:()"><strong>Игнорировать</strong></a></li>');
});

$(".ignore a").click(function() {
    var isTrue = confirm("Заигнорить мудака?");
    if(!isTrue) return;
    var userId = $(this).attr("class");
    if(userId == 49039) {alert("МАМАШУ СВОЮ ЗАИГНОРЬ, ПИДРИЛА ЕБАНЫЙ");
    return; }    
    writeIgnore(userId);
    $(this).closest(".postitem").html("");
    
})
/********************Скрытие тредов*************************/
$(document).ready(function() {
$(".windowbg2 img").each(function() {
var asdd = $(this).closest("tr").find("td span").attr("id");
var clasS = asdd.slice(4);
$(this).closest("tr").find(".windowbg2>img").attr("src", "http://mspu.by/feedback/close.png").addClass(clasS).css("cursor","pointer").attr("title","Скрыть тему");
});
});

$(".windowbg2 img").click(function() {
    var isTrue = confirm("Скрыть тред?");
    if(!isTrue) return;
    var treadId = $(this).attr("class");
    writeThread(treadId);
    $(this).closest("tr").html("");

})
/**********хон и прочее говно**********/
if(checkBox('2')&&checkBox('3')) {
$('[href$="board=99.0"]').closest(".bordercats").html("");
} else if(!checkBox('2')&&!checkBox('3')) {
    //Уебак детекдед
} else if(checkBox('3')) {
$('[href$="board=167.0"]').closest("tr").html("");
$('[href$="board=223.0"]').closest("tr").html("");
} else if (checkBox('2')) {
$('[href$="board=99.0"]').closest("tr").html("");
$('[href$="board=102.0"]').closest("tr").html("");
}

var hidtr = $.cookie("hidenThread");
var idThread = hidtr.split(',');

$.each(idThread, function() {
$('#msg_'+this).closest("tr").html("");
});


var cookieIgnore = $.cookie('ignoreList');
var idUebka = cookieIgnore.split(',');
$.each(idUebka, function() {
$('a[href$="u='+this+'"]').closest(".postitem").html("");
});


if(checkBox(4))$('a[href$="board=43.0"]').closest(".trborder").html("");







function hideThis(wat) {
    $(wat).html("").empty().remove();
}

function writeIgnore(who) {
    var cukie = $.cookie('ignoreList');
    if(cukie == null) {
        $.cookie('ignoreList', who, { expires: 365 });
    } else {
        var whoIs = cukie+','+who;
        $.cookie('ignoreList', whoIs, { expires: 365 });
    }
}

function writeThread(who) {
    var cukie = $.cookie('hidenThread');
    if(cukie == null) {
        $.cookie('hidenThread', who, { expires: 365 });
    } else {
        var whoIs = cukie+','+who;
        $.cookie('hidenThread', whoIs, { expires: 365 });
    }
}
function checkBox(num) {
    var cookieVal = $.cookie("val"+num);
    if(cookieVal == null) return 1;
    else return 0;
}


var cookVal1 = checkBox(1) ? 'checked' : '';
var cookVal2 = checkBox(2) ? 'checked' : '';
var cookVal3 = checkBox(3) ? 'checked' : '';
var cookVal4 = checkBox(4) ? 'checked' : '';
var cookVal5 = checkBox(5) ? 'checked' : '';
var cookVal6 = checkBox(6) ? 'checked' : '';
var cookVal7 = checkBox(7) ? 'checked' : '';


$("#headrow2").append("<span class='fd' style='position:relative;'></span>");
$("#headrow2 span.fd").append("<a id='sett' href='#'>Настройки</a>");
$("#headrow2 span.fd").append("<div style='display:none;position:absolute;top:20px;right:-20px;text-align:left;width:180px;background:#222;color:#fff;border:1px solid #000;' class='hidmenu postitem'></div>");
$("#headrow2 div.hidmenu").append("<input type='checkbox' id='val1' "+cookVal1+">Скрыть подписи<br>");
$("#headrow2 div.hidmenu").append("<input type='checkbox' id='val2' "+cookVal2+">Скрыть раздел HON<br>");
$("#headrow2 div.hidmenu").append("<input type='checkbox' id='val3' "+cookVal3+">Скрыть раздел LOL<br>");
$("#headrow2 div.hidmenu").append("<input type='checkbox' id='val4' "+cookVal4+">Скрыть раздел анимэ<br>");
$("#headrow2 div.hidmenu").append("<input type='checkbox' id='val5' "+cookVal5+">Скрыть раздел DotA<br>");
$("#headrow2 div.hidmenu").append("<input type='checkbox' id='val6' "+cookVal6+">Скрыть раздел DotA2<br>");
$("#headrow2 div.hidmenu").append("<input type='checkbox' id='val7' "+cookVal7+">Скрыть дни рождения<br>");
$("#headrow2 div.hidmenu").append("<a style='margin:6px 10px' href='#' id='ignored'>Список игнорированных</a><br>");
$("#headrow2 div.hidmenu").append("<a style='margin:6px 10px' href='#' id='closed'>Список скрытых тем</a><br>");
var halpi = 0;
$("#sett").click(function(){
    if (halpi == 0) {
        $(".hidmenu").css("display","block");
        halpi = 1;
    } else {
        $(".hidmenu").css("display","none");
        halpi = 0;
    }
})

//dota1
if(checkBox(5))$(".maintd .bordercats").eq(1).remove();
//dota2
if(checkBox(6))$(".maintd .bordercats").eq(0).remove();
//дни рождения
if(checkBox(7))hideThis(".statblock");
//футер
hideThis("#footerarea");
$(".foba_msg").addClass("postitem");

$(".hidmenu input:checkbox").bind("change click", function () {
    var nameCookie = $(this).attr("id");
    var cookieSettings = $.cookie(nameCookie);
    var ch = $(this).prop("checked");
    //alert(ch);
    //alert(cookieSettings);
    if(ch) $.cookie(nameCookie, null);
    else $.cookie(nameCookie, 'маме привет', { expires: 365 });
});

$("#closed").click(function(){
    var cookie = $.cookie('hidenThread');
    var wat = prompt("/************************Cписок скрытых тем таков (через запятую):*********************/", cookie);
    if(wat!==null) {$.cookie('hidenThread', wat);
    alert('Данные сохранены!')}
})
$("#ignored").click(function(){
    var cookie = $.cookie('ignoreList');
    var wat = prompt("/********************Cписок игнорируемых пользователей (через запятую):*****************/", cookie);
    if(wat!==null) {$.cookie('ignoreList', wat);
    alert('Данные сохранены!')}
})
$('img[src*="crown.png"]').parent().html('<img border="0" alt="*" src="http://prodota.ru/forum2/Themes/black_theme/images/status_icons/frog-icon.png">');
$('a[href="http://prodota.ru/forum2/index.php?action=profile;u=4"]').html("JEWS");




var dateCurrent = new Date();
var secCurrent = {};
var numId = 2;
secCurrent['num1'] = dateCurrent.getSeconds();
var pageCurrent= 1;

function scrollLoad(page, pagn) {
     $(window).scroll(function(){
        if ($(document).height() - $(window).height() <= $(window).scrollTop() + 550) {  
            dateCurrent = new Date();
            secCurrent['num'+numId] = dateCurrent.getSeconds();
            var numLast = numId - 1;
            page = +page + 20;
            //if(secCurrent['num'+numId] - secCurrent['num'+numLast] > 5) {           
              loadPage(page, pagn);
              numId++;

          // } 
         	
        }
    });
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var topic = getUrlVars()["topic"];

page = topic.split(".");
page[1] = page[1];


function loadPage(page, pagn) {
	var url = "/forum2/index.php?topic="+pagn+"."+page; 
	var num = page/20 + 1; 

	$("#quickModForm").append("<h4 style='font-size:20pt;margin:15px'>Cтраница #"+num+"</h4><div style='min-height:1500px' id='next"+num+"'><h1 style='text-align:center;font-size:15pt'><br><br><br><br><br><br><br>Подождите, идет загрузка...<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>Не сколль, блять<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>Уебак</h1></div>")
	$.get(url, function(data){
		$("#next"+num).html("");
		$(data).find('.postitem').each(function() {
			var fch = $(this).find("ul.reset").attr("id");
			var fff = $(document).find("#"+fch);
			if(fff.length) {
				$("#next"+num).remove();
				return;}
			var post = $(this);

			$("#next"+num).append(post);

		})
	})

}

//alert(page[1]);
if (page[1] != 'new') {
scrollLoad(page[1], page[0]);
}
$("head").append("<style>.foba_msg{position:fixed;bottom:-400px;} .foba_msg:hover{bottom:0px;}</style>");
$(".foba_msg").addClass("postitem");

