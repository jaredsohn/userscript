// ==UserScript==
// @name           Travian: auto fake by Articoli-gratis.it
// @namespace      travian
// @description    auto fakes by articoli-gratis.it
// @include        http://s*.travian.*/spieler.php*
// ==/UserScript==

   var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

   function letsJQuery() {

	function getRandom(n,m){ return n+Math.floor(Math.random()*(m-n)); }
	$("div#content").append("<div id=khaoss>");
	var select="<select name=\"truppa\" id=\"truppa\"> <option 

value=\"t11=0&t10=0&t9=0&t8=0&t7=0&t6=0&t5=0&t4=0&t3=0&t2=1&t1=0&c=3&kid=\">spade <option 

value=\"t11=0&t10=0&t9=0&t8=0&t7=0&t6=0&t5=0&t4=0&t3=0&t2=0&t1=1&c=3&kid=\">lanc galli <option 

value=\"t11=0&t10=0&t9=0&t8=0&t7=0&t6=0&t5=0&t4=0&t3=1&t2=0&t1=0&c=3&kid=\">imperiani <option 

value=\"t11=0&t10=0&t9=0&t8=0&t7=0&t6=0&t5=0&t4=0&t3=0&t2=1&t1=0&c=3&kid=\">pretoriani <option 

value=\"t11=0&t10=0&t9=0&t8=0&t7=0&t6=0&t5=0&t4=0&t3=0&t2=0&t1=1&c=3&kid=\">mazze <option 

value=\"t11=0&t10=0&t9=0&t8=0&t7=0&t6=0&t5=0&t4=0&t3=1&t2=0&t1=0&c=3&kid=\">asce <option 

value=\"t11=0&t10=0&t9=0&t8=0&t7=0&t6=0&t5=0&t4=0&t3=0&t2=1&t1=0&c=3&kid=\">lance teutoni <option 

value=\"t11=0&t10=0&t9=0&t8=1&t7=0&t6=0&t5=0&t4=0&t3=0&t2=0&t1=0&c=3&kid=\">cata <option 

value=\"t11=0&t10=0&t9=0&t8=0&t7=1&t6=0&t5=0&t4=0&t3=0&t2=0&t1=0&c=3&kid=\">ariete</select>";
	$("div#content").append("<br><b><font size=2>Scegli Unita</font></b> " + select + " <input id=\"fake\" type=\"button\" 

value=\"fakka\" > <font size=1><a href=\"http://www.articoli-gratis.it/guadagnare-su-internet-lavora-per-noi\">Articolisti Cercasi: Lavora 

per noi.</a> </font>");
	$("#fake").click(function(){
		var truppa=$("#truppa option:selected").val(); 
		var id=$(".nam a");
		$.each(id,function(index,value){
			var prova=value.toString().split("=");
			var mezzo=$.trim(prova[1]);
			var petto=mezzo.toString().split("&");
			var idfinale=$.trim(petto[0]);
			var url= truppa + "" + idfinale +"&id=39&s1=ok&a=" + getRandom(00001, 99999);
			$.ajax({ 
				type: "POST", 
				url : "http://s2.travian.it/dorf1.php", 
				data: url , 
				success: function(data){ 
					$("#khaoss").append("<br>mandato fake a <a href=\"" + value +" \"> "+ value + " <br>"); 	
				} 
			});
		});
	$("#khaoss").append("<br> Per problemi e suggerimenti contattarmi a info@articoli-gratis.it . <br> CopyrightÂ© 2009 powered by 

Articoli-Gratis.it .<br>");
	});
	}
