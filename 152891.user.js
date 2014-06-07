// ==UserScript==
// @name        Troll ignore
// @include     http://*.dobreprogramy.pl*
// @exclude http://www.dobreprogramy.pl/Blog,Edycja*
// @exclude http://www.dobreprogramy.pl/Blog,Nowy*
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
//$("div.nick").append(" | <span class=\"ignore\" style=\"font-weight:normal\">(ignoruj)</span>");
var json = '{"banned":[]}';
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};


var lista=$.parseJSON(GM_getValue('lista', json));

for (x in lista.banned)
{

	//$('a').filter(function() { return $(this).text() === lista.banned[x]}).parent().parent().hide();
	var el = $('a').filter(function() { return $(this).text() === lista.banned[x]}).parent();
	try
	{
		if($(el).get(0).tagName === 'SPAN')
		{
			//To jest art
			$(el).parent().parent().parent().hide();
		}
		else
		{
			//blogasek
			$(el).parent().hide();
		}

	}
	catch (e)
	{
		//pewnie go tu nie ma... (tego usera na tej stronie)
		console.log(e);
	}
}

$("ul.serviceMenu").append("<li><a href=\"#\">Ignorowani</a></li>");
$("div.user_panel span:nth-child(3)").after("<span class=\"userPanelText\"> | <a href=\"\" class=\"ignored_kk\">Ignorowani</a></span>");
$("ul.serviceMenu li:last-child, .ignored_kk").click(function(event) { event.preventDefault(); show_banned();});
	$('div.nick, span.nick').append(" | <a href=\"\" class=\"ignore\" style=\"font-weight:normal\">(ignoruj)</a>");
	$("a.ignore").click(function(event) {  
		event.preventDefault();
		nick = $(this).parent().children("a:first-child").text();
		var el = $('a').filter(function() { return $(this).text() === nick}).parent();
		if($(el).get(0).tagName === 'SPAN')
		{
			//To jest art
			$(el).parent().parent().parent().hide();
		}
		else
		{
			//blogasek
			$(el).parent().hide();
		}
		lista.banned.push(nick);
		GM_setValue("lista", JSON.stringify(lista));
		lista=$.parseJSON(GM_getValue('lista', json));
	});
	
	
	function show_banned()
	{
		if(!($("div#fancybox-overlay").length > 0))
		{
			$("body").append('<div id="fancybox-overlay"></div><div id="fancybox-wrap"><div id="fancybox-outer" style="display: none;"><div id="fancybox-bg-n" class="fancybox-bg"></div><div id="fancybox-bg-ne" class="fancybox-bg"></div><div id="fancybox-bg-e" class="fancybox-bg"></div><div id="fancybox-bg-se" class="fancybox-bg"></div><div id="fancybox-bg-s" class="fancybox-bg"></div><div id="fancybox-bg-sw" class="fancybox-bg"></div><div id="fancybox-bg-w" class="fancybox-bg"></div><div id="fancybox-bg-nw" class="fancybox-bg"></div><div id="fancybox-content"><a id="fancybox-close" style="display: none;"></a><div id="fancybox-title"></div><a id="fancybox-left" href="javascript:;"><a id="fancybox-right" href="javascript:;"></div></div>');
		}
		fancy_width = $("body").width();
		$("div#fancybox-overlay").css('background-color', 'rgb(119, 119, 119)').css('opacity', '0.7').css('height', $("body").height()+"px").show().click(function(e) {hide_banned()});
		$("div#fancybox-wrap").css('width', fancy_width+"px").css('height','auto').css('top', '20px').css('left', (fancy_width/2-200)+"px").css("width", "400").show().click(function(e) {hide_banned()});
		$("div#fancybox-content").empty().css('border-width', '10px').css('width', "380px").css("height","auto").append("<ul id=\"banned_list\"></ul>");
		for (x in lista.banned)
		{
			$("ul#banned_list").append("<li><a href=\"\">"+lista.banned[x]+"</a></li>");
		}
		$("div#fancybox-content").css('display','block');
		$("a#fancybox-close").show();
		$("div#fancybox-outer").show();
		$("ul#banned_list li").click(function(event) {
			event.preventDefault();
			unban($(this).text());
			hide_banned();
		});
		
		
	}
	function hide_banned()
	{
		$("div#fancybox-overlay").hide();
		$("div#fancybox-wrap").hide();
		$("div#fancybox-content").hide();
		$("a#fancybox-close").hide();
		$("div#fancybox-outer").hide();
	}
	function unban(user)
	{
		lista=$.parseJSON(GM_getValue('lista', json));
		lista.banned.splice(lista.banned.indexOf(user),1);
		GM_setValue("lista", JSON.stringify(lista));
		$('a').filter(function() { return $(this).text() === user}).parent().parent().show();
	}
