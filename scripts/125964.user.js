// ==UserScript==
// @name       js do it (layout)
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  muda a aparencia parecida com a do site jsdo.it
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @include    http://www.centrorpgmaker.com/forum/index.php*
// @copyright  2011+, You
// ==/UserScript==

/* ---------------------------------- 
MISC
---------------------------------- */

/* COOKIES */
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
    
	var ca = document.cookie.split(/;(?!attach|type)/);
    //var ca = document.cookie.split(/;/);
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}

/* ---------------------------------- 
GLOBAL
---------------------------------- */

/* HORÁRIO */
/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 0.10.0
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 *
 *commit from https://github.com/rmm5t/jquery-timeago/pull/44/files
 *
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 1000,
      allowFuture: false,
      strings: {
        prefixAgo: "ha ",
        prefixFromNow: null,
        suffixAgo: "",
        suffixFromNow: "",
        secondaccurate : "1 segundo",	
        secondsaccurate : "%d segundos",
        second: "%d segundos",
        seconds: "nesse minuto",
        minute: "1 minuto",
        minutes: "%d minutos",
        hour: "1 hora",
        hours: "%d horas",
        day: "1 dia",
        days: "%d dias",
        month: "1 mes",
        months: "%d meses",
        year: "1 ano",
        years: "%d anos",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }
        
      suffix = seconds < 2 ? "" : suffix;
        
      var words = seconds < 2 && this.settings.refreshMillis <= 10000 && substitute($l.secondaccurate, 1) || 
        seconds < 60 && this.settings.refreshMillis <= 2000 && substitute($l.secondsaccurate, Math.round(seconds)) || 
        seconds < 60 && this.settings.refreshMillis <= 10000 && substitute($l.second, Math.round(seconds)) ||
        seconds < 45 && this.settings.refreshMillis > 10000 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 48 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.floor(days)) ||
        days < 60 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.floor(days / 30)) ||
        years < 2 && substitute($l.year, 1) ||
        substitute($l.years, Math.floor(years));

      return $.trim([prefix, words, suffix].join(" "));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d\d\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      var dat = new Date(s);
      dat.setHours(dat.getHours() - 2);
      return dat;
    },
    datetime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      var isTime = $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
      var iso8601 = isTime ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
      var dat = new Date();
      dat.setHours(dat.getHours() - 4);
    return (dat.getTime() - date.getTime());
  }

}(jQuery));

/* TRANSFORMAR DATAS */ //https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference:Global_Objects:Date
function ISODateString(d){
    function pad(n){
        return n<10 ? '0'+n : n
    }
 return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'
}

/* procura horários pra transformá-los */
function mudarHorarios(){
/*
Tue Feb 07 2012 15:45:08 GMT-0200 (E. South America Daylight Time)
2012-02-07T17:45:08Z
*/
    // muda os de HOJE
    var date = new Date();
    var date2 = ISODateString(date);
    var j0 = date2.substr(0, 8);
    var j1 = date2.substr(8, 2); //data, T
    date.setHours(date.getHours() - 4);
    date2 = ISODateString(date);
    var j2 = date2.substr(11, 2); //hora, :
    var j3 = date2.substr(14, 2); //minuto, :
    var j4 = date2.substr(17, 2); //segundo, Z
    var str; // = document.body.innerHTML; // nao posso mudar todo o inner do body senao todos os eventos, cliques, sao perdidos, por exemplo os dos spoilers.
    var re = /<strong>Hoje<\/strong> .s (\d\d):(\d\d:\d\d)/g;
    var els;
    var i, l;
    els = [];
    els.push.apply(els, document.getElementsByTagName("dd"));
    els.push.apply(els, document.getElementsByTagName("em"));
    els.push.apply(els, document.getElementsByClassName("lastpost"));
    str = "";
    i = -1;
    l = els.length;
    
    while(++i < l) 
    {
        str = els[i].innerHTML;
        els[i].innerHTML = str.replace(re, 
                                          function($1, $2, $3){
                                              /*alert(j0 + 
                                                    (parseInt($2) >= 22 ? (j1 < 9 ? "0" + (1+parseInt(j1, 10)) : 1+parseInt(j1, 10)) : (j1) ) + 
                                                  "T" + 
                                                  (parseInt($2) >= 22 ? ("0" + (22 - parseInt($2, 10))) : 2 + parseInt($2, 10)) + 
                                                      ":" + $3  + "Z"); */
                                              return ("<abbr class=\"timeago\" title=\"" + (j0 + j1 + "T" + $2 + ":"+ $3  + "Z") + "\" >" + $2 + ":"+ $3 + "</abbr>"); } );
    }
    
    // muda os de ONTEM (<strong>Ontem</strong> as 20:22:27)
    date.setHours(date.getHours() - 20);
    date2 = ISODateString(date);
    j0 = date2.substr(0, 8);
    j1 = date2.substr(8, 2); //data, T
    date.setHours(date.getHours() - 4);
    date2 = ISODateString(date);
    j2 = date2.substr(11, 2); //hora, :
    j3 = date2.substr(14, 2); //minuto, :
    j4 = date2.substr(17, 2); //segundo, Z
    str = document.body.innerHTML;
    re = /<strong>Ontem<\/strong> .s (\d\d):(\d\d:\d\d)/g;
    str = "";
    i = -1;
    l = els.length;
    
    while(++i < l) 
    {
        str = els[i].innerHTML;
        els[i].innerHTML = str.replace(re, 
                                          function($1, $2, $3){
                                              /*alert(j0 + 
                                                    (parseInt($2) >= 22 ? (j1 < 9 ? "0" + (1+parseInt(j1, 10)) : 1+parseInt(j1, 10)) : (j1) ) + 
                                                  "T" + 
                                                  (parseInt($2) >= 22 ? ("0" + (22 - parseInt($2, 10))) : 2 + parseInt($2, 10)) + 
                                                      ":" + $3  + "Z"); */
                                              return ("<abbr class=\"timeago\" title=\"" + (j0 + j1 + "T" + $2 + ":"+ $3  + "Z") + "\" >" + $2 + ":"+ $3 + "</abbr>"); } );
    }
    
    
    
    // muda os de mto tempo atras (25 Nov, 2011, 22:21:50 pm) (23 Jan, 2012, 14:12:51 pm) (04 Fev, 2012, 16:50:34 pm)
    str = document.body.innerHTML;
    re = /(\d{1,2}) (...), (\d\d\d\d), (\d\d:\d\d:\d\d) .m/g; // (dia) (mes) (ano) (horario) 
    /*
    date.setHours(date.getHours() - 20);
    date2 = ISODateString(date);
    j0 = date2.substr(0, 8);
    j1 = date2.substr(8, 2); //data, T
    date.setHours(date.getHours() - 4);
    date2 = ISODateString(date);
    j2 = date2.substr(11, 2); //hora, :
    j3 = date2.substr(14, 2); //minuto, :
    j4 = date2.substr(17, 2); //segundo, Z
    */
    str = "";
    i = -1;
    l = els.length;
    
    while(++i < l) 
    {
        str = els[i].innerHTML;
        els[i].innerHTML = str.replace(re, 
                                          function($1, $2, $3, $4, $5){
                                              //alert("dia: " + $2 + ", mes: " + $3 + ", ano: " + $4 + ", horario " + $5);
                                              date.setFullYear($4);
                                              date.setMonth($3 == "Jan" ? 0 : $3 == "Fev" ? 1 : $3 == "Mar" ? 2 : $3 == "Abr" ? 3 : $3 == "Mai" ? 4 : $3 == "Jun" ? 5 : $3 == "Jul" ? 6 : $3 == "Ago" ? 7 : $3 == "Set" ? 8 : $3 == "Out" ? 9 : $3 == "Nov" ? 10 : $3 == "Dez" ? 11 : null);
                                              date.setDate($2);
                                              date2 = ISODateString(date);
                                              j0 = date2.substr(0, 8);
                                              j1 = date2.substr(8, 2); //data, T
                                              //alert("<abbr class=\"timeago\" title=\"" + (j0 + j1 + "T" + $5  + "Z") + "\" >" + $5 + "</abbr>");
                                              return ("<abbr class=\"timeago\" title=\"" + (j0 + j1 + "T" + $5  + "Z") + "\" >" + $5 + "</abbr>"); } );
    }
    
    
}


/* adiciona novos users */ // TODO: ordenar os users por nome.
function usersCookie(userList)
{
    var users = readCookie("users");
    var i, l, str, re;
    if (!users)
    {
        // a lista era: [[nome, id, img] [nome, id, img] [no, id, img]] 
        i = -1; 
        l = userList.length; 
        str = "";
        while(++i < l) str += userList[i].join(",") + ",,";
        // o str e: nome,id,img,,nome,id,img,,nome,id,img,,
        
        re = /http:\/\/www.centrorpgmaker.com\/forum\/index.php.action=profile;u=(\d*),/g;
        str = str.replace(re, "$1,");
        re = /;/g;
        str = str.replace(re, "%3B");
        createCookie("users",str,30);
        return;
    } 
    
    {
        var lista2 = [], listaFinal = [], l2 = 0, i2, unico = false;
        // users era: nome,id,img,,nome,id,img,,nome,id,img,, 
        lista2 = users.split(",,");
        i = -1;
        l = lista2.length -1;
        while(++i < l) lista2[i] = lista2[i].split(",");
        // users agora e: [[nome, id, img] [nome, id, img] [no, id, img]] 
        
        // junta a lista2 e a serlist na lista final. primeiro a lista2;
        i = -1;
        while(++i < l)
        {
            i2 = -1;
            unico = true
            while(++i2 < l2)
            {
                if (listaFinal[i2][1] == lista2[i][1])
                {
                    unico = false;
                    break;
                }
                
            }
            if (!unico) 
            {
                continue;
            }
            listaFinal.push(lista2[i]);
            ++l2;
        }
        
        // agora a userList
        l = userList.length;
        i = -1;
        re = /http:\/\/www.centrorpgmaker.com\/forum\/index.php.action=profile;u=(\d*)$/g;
        while(++i < l)
        {
            i2 = -1;
            unico = true
            while(++i2 < l2)
            {
                userList[i][1] = userList[i][1].replace(re, "$1");
                if (listaFinal[i2][1] == userList[i][1])
                {
                    unico = false;
                    break;
                }
                
            }
            if (!unico) 
            {
                continue;
            }
            listaFinal.push(userList[i]);
            ++l2;
        }
        //
        
        // agora eu transformo a lista final, de array para string, faco uns ajustes e salvo nos cookies.
        // a lista era: [[nome, id, img] [nome, id, img] [no, id, img]] 
        i = -1; 
        l = listaFinal.length; 
        str = "";
        while(++i < l) str += listaFinal[i].join(",") + ",,";
        // o str e: nome,id,img,,nome,id,img,,nome,id,img,,
        re = /http:\/\/www.centrorpgmaker.com\/forum\/index.php.action=profile;u=(\d*),/g;
        str = str.replace(re, "$1,");
        re = /;/g;
        str = str.replace(re, "%3B");
        createCookie("users",str,30);
    }
    
}
/* adiciona você mesmo */ // TODO: mesclar com a função que add todos os cookies.
function userCookie(name, id, img)
{
    var user = readCookie("user");
    if (!user && !id && !img)
    {
        // get user info
        var ajax = null;
        getUser();
        function getUser() {
            ajax = new XMLHttpRequest();
            ajax.open("GET", "http://www.centrorpgmaker.com/forum/index.php?action=profile", true);
            ajax.onreadystatechange = loading;
            ajax.send(null);
        }
        function loading(){
            if(ajax.readyState == 4 && ajax.status == 200) loaded(ajax.responseText);
        }
        function loaded(txt){
            var div = document.createElement("div");
            div.innerHTML = txt;
            img = div.getElementsByClassName("avatar")[0].src;
            var re = /u=(.*)/g;
            id = div.getElementsByClassName("chosen")[0].href;
            id.replace(re, function($1, $2){id = $2})
            userCookie(name, id, img);
        }
        return;
    } else if (!user)
    {
        var value = "";
        value += name + "," + id + "," + img;
        value = value.replace(/;/g, "%3B");
        createCookie("user",value,30);
        userCookie();
        return;
    } 
    
    // arruma a imagem do user na barra do menu
    if (user != null) document.getElementsByClassName("avatarMenu")[0].getElementsByTagName("img")[0].src = user.split(",")[2].replace(/%3B/g, ";");
}
/* Returna lista de users nos cookies */
function getUsers()
{
    var users = readCookie("users");
    if(!users) return null;
    users = users.replace(/%3B/g, ";");
    // users era: nome,id,img,,nome,id,img,,nome,id,img,, 
    var lista = users.split(",,");
    var i = -1;
    var l = lista.length -1;
    while(++i < l) lista[i] = lista[i].split(",");
    // users agora e: [[nome, id, img] [nome, id, img] [no, id, img]] 
    return lista;
}

/* ---------------------------------- 
HEADER
---------------------------------- */
function changeHeader()
{   
    // pega alguns dados do usuario no header
    var user_name = document.getElementsByClassName("greeting")[0].getElementsByTagName("span")[0].innerHTML;
    var user_logout = document.getElementById("button_logout").getElementsByClassName("firstlevel")[0].href;
    var user_msgs = document.getElementById("button_pm").getElementsByClassName("firstlevel")[0].getElementsByTagName("strong")[0];
    if (user_msgs) user_msgs = user_msgs.innerHTML;
    else user_msgs = 0;
    
    // coloca o marquee la em cima
    var bEl = true, el = document.getElementById("sp_block_28");
    if (!el)
    {
        bEl = false;
        el = document.createElement("div");
        el.id = "sp_block_28";
        el.appendChild(document.createElement("div"));
        el.firstChild.style.height = "19px";
    }
    var replace = document.getElementById("top_section");
    replace.parentNode.replaceChild(el, replace);
    // faz o marquee ficar parado
    var inner;
    if (bEl)
    {
        inner = el.getElementsByTagName("marquee")[0];
        inner.parentNode.parentNode.innerHTML = inner.innerHTML;
        // muda a cor do marquee
        var inner = el.getElementsByTagName("span"), i = -1, j = inner.length, nt, np;
        while(++i < j)
        {
            nt = document.createTextNode(inner[i].innerHTML);
            np = document.createElement("span");
            np.appendChild(nt);
            inner[i].parentNode.replaceChild(np, inner[i]);
            np.style.color = 'white';
            np.style.borderRadius = '2px';
        }
        np.parentNode.align = 'center';
    }
	
    // adiciona a navegacao
    var nu = document.createElement("ul");
    var nl = document.createElement("li");
    var na = document.createElement("a");
    el.appendChild(nu);
    nu.appendChild(nl);
    nl.appendChild(na);
    na.href = "http://www.centrorpgmaker.com/forum/index.php";
    na.innerHTML = "Inicio";
    nl = document.createElement("li");
    na = document.createElement("a");
    nu.appendChild(nl);
    nl.appendChild(na);
    na.href = "http://www.centrorpgmaker.com/forum/index.php?action=forum";
    na.innerHTML = "Forum";
    nl = document.createElement("li");
    na = document.createElement("a");
    nu.appendChild(nl);
    nl.appendChild(na);
    na.href = "http://www.centrorpgmaker.com/forum/index.php?page=Chat";
    na.innerHTML = "Chat";
    
    // cria o novo 'novas respostas'
    var rightbox = document.getElementsByClassName("rightbox")[0];
    var leftbox = rightbox.getElementsByClassName("leftbox")[0];
    na = document.createElement("a");
    var nd = document.createElement("div");
    var ndHit = document.createElement("div");
    leftbox.appendChild(nd);
    nd.appendChild(ndHit);
    nd.id = "btnHeaderAnswerNew";
    nt = document.createTextNode("Respostas");
    na.id = "respostasText";
    ndHit.appendChild(na);
    na.appendChild(nt);
    ndHit.addEventListener('mousedown', function(e) {if (e.which == 1 || e.which == 2) window.open('http://www.centrorpgmaker.com/forum/index.php?action=unreadreplies','_newtab');})
    
    // cria o novo search (caixa de texto)
    nd = document.createElement("div");
    replace = document.getElementById("upper_section");
    replace.parentNode.replaceChild(nd, replace);
    nd.id = "search_div";
    var nf = document.createElement("form");
    nd.appendChild(nf);
    nf.id = "search_form";
    nf.action="http://www.centrorpgmaker.com/forum/index.php?action=search2";
    nf.method="post";
    nf.acceptCharset="UTF-8";
    var ni = document.createElement("input");
    nf.appendChild(ni);
    ni.id = "campo_input";
    ni.type="text";
    ni.name="search";
    ni.value="";
    ni.class="input_text";
    ni.autocomplete="off"; 
    ni.placeholder="Busca";
    // icone
    ni = document.createElement("input");
    nf.appendChild(ni);
    ni.type="submit";
    ni.name="submit"; 
    ni.id = "button_submit";
    
    // pega o endereco do logout dai remove o painel de cima
    var temp = document.getElementById("main_menu")
    temp.parentNode.removeChild(temp);
    
    // cria o painelzinho do usuario
    nu = document.createElement("ul");
    ni = document.createElement("li");
    na = document.createElement("a");
    var nim = document.createElement("img");
    nt = document.createTextNode(user_name);
    leftbox.appendChild(nu);
    nu.appendChild(ni);
    ni.appendChild(na);
    na.appendChild(nim);
    na.appendChild(nt);
    na.href = "http://www.centrorpgmaker.com/forum/index.php?action=profile";
    na.className = "avatarMenu";
    userCookie(user_name);
    
    // cria o menu que tem o logout
    var nu2 = document.createElement("ul");
	nu2.className = "shadowLayor1 animationFadeIn";
	nu.appendChild(nu2);
	// cria as 'opções'
	nl = document.createElement("li");
    na = document.createElement("a");
	nu2.appendChild(nl);
    nl.appendChild(na);
	na.addEventListener("click", function(e){
		var el = document.getElementById("opts"); 
		el.style.display = el.style.display == "none" ? "block" : "none";
		});
    na.innerHTML = "Opções";
	// cria o 'Sair'
	nl = document.createElement("li");
    na = document.createElement("a");
    nu2.appendChild(nl);
    nl.appendChild(na);
    na.href = user_logout;
    na.innerHTML = "Sair";
    
    // cria o numero de mensagens
    nl = document.createElement("li");
    na = document.createElement("a");
    nu.appendChild(nl);
    nl.appendChild(na);
    na.innerHTML = user_msgs;
    na.href = "http://www.centrorpgmaker.com/forum/index.php?action=pm";
    
    // remove um painel padrao
    temp = document.getElementById("drop_menu")
    temp.parentNode.removeChild(temp);
	
}

/* PEGA NOVAS RESPOSTAS */
function newReplies()
{
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "http://www.centrorpgmaker.com/forum/index.php?action=unreadreplies", true);
    ajax.onreadystatechange = loading;
    ajax.send(null);

	function loading(){
		if(ajax.readyState == 4 && ajax.status == 200) loaded(ajax.responseText);
	}
	function loaded(txt){
		var div = document.createElement("div");
		div.innerHTML = txt;
		div = div.getElementsByClassName("tborder")[0];
		var numResp = 0, numResp2 = " Respostas";
		if (div)
		{
			div = div.getElementsByTagName("tbody")[0];
			var trs = div.getElementsByTagName("tr")
			numResp = trs.length;
			if(numResp == 1) numResp2 = " Resposta";
			
			// cria o menu das respostas rapidas
			var nu = document.createElement("ul");
			nu.className = "shadowLayor1 animationFadeIn";
			document.getElementById("btnHeaderAnswerNew").appendChild(nu);
			var nl, na, na2, nt, i = -1, temp;
			while(++i < numResp)
			{
				nl = document.createElement("li");
				na = document.createElement("a");
				//na2 = document.createElement("a");
				nu.appendChild(nl);
				temp = trs[i].getElementsByTagName("span")[0].getElementsByTagName("a")[0];
				na.innerHTML = temp.innerHTML;
				temp = temp.parentNode.parentNode
				na.href = temp.getElementsByTagName("a")[1].href;
				temp = temp.getElementsByTagName("em")[0].getElementsByTagName("a")[0];
				//na2.href = temp.href;
				//na2.innerHTML = temp.innerHTML;
				temp = "";
				//temp += "<a href=\"" + na.href + "\">" + na.innerHTML + "</a> (" + "<a href=\"" + na2.href + "\">" + na2.innerHTML + "</a>)";
				temp += "<a href=\"" + na.href + "\">" + na.innerHTML + "</a>";
				nl.innerHTML = temp;
			}
		}
		document.getElementById("respostasText").innerHTML = numResp + numResp2;
	}

}

/* MENU DE OPÇÕES */
function menuOpt(header){
	var div = document.createElement("div");
	var ul = document.createElement("ul");
	div.appendChild(ul);
	if (header == "true")
	{
		document.getElementById("content_section").appendChild(div);
		div.style.display = "none";
		div.id = "opts";
	} else
	{
		if (!document.URL.match(/area=theme;/g)) return;
		document.getElementById("theme_settings").appendChild(div);
	}
	
	
	var input, t, li;
	// opção header
	li = document.createElement("li");
	input = document.createElement("input");
	t = document.createTextNode(" header");
	ul.appendChild(li);
	li.appendChild(input);
	li.appendChild(t)
	input.type = "checkbox";
	input.checked = readCookie("header") == "true";
	input.addEventListener("click", function(e){createCookie("header",e.target.checked,30)})
	
	var ul2, li2;
	ul2 = document.createElement("ul");
	li2 = document.createElement("li");
	li.appendChild(ul2);
	ul2.appendChild(li2);
	input = document.createElement("input");
	t = document.createTextNode(" procurar por novas respostas");
	li2.appendChild(input);
	li2.appendChild(t)
	input.type = "checkbox";
	input.checked = readCookie("nreplies") == "true";
	input.addEventListener("click", function(e){createCookie("nreplies",e.target.checked,30)})
}


/* ---------------------------------- 
BODY
---------------------------------- */

function changeBody(){
    // poe a timeline no comeco e muda os index
    if (window.location == "http://www.centrorpgmaker.com/forum/index.php?action=forum")
    {
        // muda a timeline
        var main = document.getElementById("content_section").firstChild;
        var ns = document.createElement("section");
        var timeline = document.getElementById("ic_recentposts");
        main.insertBefore(ns, main.firstChild);
        var nh1 = document.createElement("h1");
        nh1.innerHTML = "Timeline";
        ns.appendChild(nh1);
        ns.appendChild(timeline);
        
        // muda as secoes
        var config = ["Centro RPG Maker", "RPG Maker", "Recursos e Suporte", "Avaliacao e Desenvolvimento", "Outras Engines", "Links", "Geral"];
        var tables, table, trs, tr, ndl, ndt, ndd, m, n, iConfig = -1; // tables
        var k, l, childNext, lastPosts, info, newmsg, as, str, re, data, a, p; // grupo
        var nul, nli, i, j, na; // subgrupo
        var datas = ["20 Jan, 2012, 14:48:12 pm", "10 Jan, 2012, 02:12:48 am", "30 Dez, 2011, 18:13:50 pm"], iDatas = -1;
        
        tables = document.getElementById("boardindex_table").getElementsByTagName("table");
        m = -1;
        n = tables.length;
        while(++m < n)
        {
            table = tables[m];
            if(table.className == "table_list") continue;
            ns = document.createElement("section");
            nh1 = document.createElement("h1");
            ndl = document.createElement("dl");
            main.appendChild(ns);
            ns.appendChild(nh1);
            ns.appendChild(ndl);
            ndl.className = "middletext";
            nh1.innerHTML = config[++iConfig];
            trs = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
            k = -1;
            l = trs.length;
            
            while(++k < l)
            {
                tr = trs[k];
                if (tr.className == "sub_cat") continue;
                
                if (childNext)
                {
                    // e um sub
                    childNext = false;
                    as = tr.getElementsByTagName("a");
                    nul = document.createElement("ul");
                    //ndl.appendChild(nul);
                    ndd.appendChild(nul);
                    i = -1; 
                    j = as.length; 
                    na;
                    while(++i < j)
                    {
                        nli = document.createElement("li");
                        na = document.createElement("a");
                        nul.appendChild(nli);
                        nli.appendChild(na);
                        a = as[i];
                        na.innerHTML = a.innerHTML;
                        na.href = a.href;
                        if(a.className == "new_posts")
                        {
                            ++i;
                            na.className = "borda_dot_on";
                        }
                    }
                    
                    continue;
                }
                
                ndt = document.createElement("dt");
                ndd = document.createElement("dd");
                ndl.appendChild(ndt);
                ndl.appendChild(ndd);
                
                lastPosts = tr.getElementsByClassName("lastpost")[0];
                info = tr.getElementsByClassName("info")[0];
                newmsg = tr.getElementsByClassName("icon")[0].getElementsByTagName("img")[0].src;
                as = lastPosts.getElementsByTagName("a");
                str = tr.innerHTML;
                re = /Online(.*)/g;
                str.replace(re, function ($0, $1) {data = $1; return "";});
                a = info.getElementsByTagName("a")[0];
                p = info.getElementsByTagName("p")[0];
                
                if (as[1] && as[0])
                {
                    ndt.innerHTML = "<strong><a href=\"" + as[1].href + "\"> " + as[1].title + "</a></strong> " + 
                    " por <a href=\"" + as[0].href + "\">" + as[0].innerHTML + "</a>" + 
                    " (" + "<a href=\"" + a.href + "\"" + ( 
                        newmsg == "http://www.centrorpgmaker.com/forum/Themes/ClearSky_SMF2-Final/images/on.png" ? 
                        "class=\"borda_dot_on\"" : 
                        newmsg == "http://www.centrorpgmaker.com/forum/Themes/ClearSky_SMF2-Final/images/on2.png" ? 
                        "class=\"borda_dot_on2\"" : 
                        newmsg == "http://www.centrorpgmaker.com/forum/Themes/ClearSky_SMF2-Final/images/on.png" ? 
                        "class=\"borda_dot_redirect\"" : 
                        "" )  + " title=\"" + p.innerHTML + "\">" + a.innerHTML + "</a>)";
                } 
                
                else
                {
                    ndt.innerHTML = 
                    "<a href=\"" + a.href + "\"" + ( 
                        newmsg == "http://www.centrorpgmaker.com/forum/Themes/ClearSky_SMF2-Final/images/on.png" ? 
                        "class=\"borda_dot_on\"" : 
                        newmsg == "http://www.centrorpgmaker.com/forum/Themes/ClearSky_SMF2-Final/images/on2.png" ? 
                        "class=\"borda_dot_on2\"" : 
                        newmsg == "http://www.centrorpgmaker.com/forum/Themes/ClearSky_SMF2-Final/images/on.png" ? 
                        "class=\"borda_dot_redirect\"" : 
                        "" )  + " title=\"" + p.innerHTML + "\">" + a.innerHTML + "</a>";
                    data = datas[++iDatas];
                }
                
                ndd.innerHTML = data;
                if (tr.className == "windowbg borderchild" || tr.className == "windowbg2 borderchild") childNext = true; // area com sub
            }
            
        }
        
        var remove = document.getElementById("boardindex_table");
        remove.parentNode.removeChild(remove);
        remove = document.getElementById("main_content_section");
        remove.parentNode.removeChild(remove);
		
		
		
	// TODO: muda a timeline, adicionando tambem avatares no index, etc.
        
    }
    
    
    var re, str;
    var el = document.getElementById("forumposts");
    if (el)
    {
        // arruma o nome do topico
        el = el.getElementsByTagName("span")[1];
        re = /Tópico: (.*)\(Lida \d* vezes\)/;
        str = el.innerHTML;
        el.innerHTML = str.replace(re, "$1");
		
        // TODO: pega informacoes de usuarios pela pagina
        el = document.getElementsByClassName("poster");
        var userList = [];
        var i = -1, l = el.length, a;
        while(++i < l)
        {
            a = el[i].getElementsByTagName("a");
            userList.push([a[0].getElementsByTagName("span")[0].innerHTML, a[0].href, a[1].getElementsByTagName("img")[0].src]);
        }
        usersCookie(userList);
        
        // custom topics
        var sps = document.getElementsByClassName("sp-wrap");
        var bg, bg2, sp, inner, imgs, alt;
        i = -1; l = sps.length;
        while(++i < l)
        {
            
            sp = sps[i].getElementsByTagName("div");
            if (sp[0].innerHTML != "config") continue;
            bg = null; bg2 = null;
            inner = sp[1].innerHTML;
            // procura por backgrounds
            imgs = sp[1].getElementsByTagName("img");
            j = -1;
            k = imgs.length;
            while(++j < k)
            {
                alt = imgs[j].alt;
                if (alt == "bg") bg = imgs[j].src;
                if (alt == "bg2") bg2 = imgs[j].src;
            }
            
            // aplica bgs
            if (bg) document.getElementById("forumposts").style.background = "rgb(236, 242, 244) url(" + bg + ") repeat top left !important";
            if (bg2) document.body.style.background = "rgb(236, 242, 244) url(" + bg2 + ") repeat top left !important";
            
            
        }
    }
	
    
    
    // muda os horarios
    mudarHorarios();
}

function changeIndexTopics() {
    var users = getUsers();
    var m, n = users.length, nome;
    // muda a visualização dos tópicos no index
    var el = document.getElementsByClassName("middletext");
    var i = -1;
    var l = el.length;
    var img, tn, j, k, dt, dd, as, a, str, h1, redirect, ul, div, p;
    while(++i < l)
    {
        
        dt = el[i].getElementsByTagName("dt");
        dd = el[i].getElementsByTagName("dd");
        
        j = -1;
        k = dt.length;
        while(++j < k)
        {
            a = document.createElement("article");
            img = document.createElement("img");
            //img.src = "http://www.centrorpgmaker.com/forum/index.php?action=dlattach;attach=496;type=avatar";
            img.src = "http://www.centrorpgmaker.com/forum/Themes/default/images/default_avatar.png";
            a.appendChild(img);
            div = document.createElement("div");
            p = document.createElement("p");
            a.appendChild(div);
            div.appendChild(p);
            as = dt[j].getElementsByTagName("a");
            redirect = false;
            if(!as[1])
            {
                as[1] = document.createElement("a");
                as[1].href = "http://www.centrorpgmaker.com/forum/index.php?action=profile;u=1";
                as[1].innerHTML = "<span style='color:#8B8989;'>T-Rex</span>";
                as[2] = document.createElement("a");
                redirect = true;
            } 
            
            if(users)
            {
                m = -1;
                nome = as[1].getElementsByTagName("span")[0].innerHTML;
                while(++m < n)
                {
                    if (users[m][0] == nome) img.src = users[m][2];
                }
            }
            
            p.appendChild(as[1]);
            if(as[0].innerHTML.match(/^ *Re:/g))
            {
                str = " respondeu em ";
                as[0].innerHTML = as[0].innerHTML.replace(/^Re:/g, "")
            } else if (!redirect)
            {
                str = " criou em ";
                a.className = "criou";
            } else str = " redirecionou para:";
            tn = document.createTextNode(str);
            p.appendChild(tn);
            if(!redirect) p.appendChild(as[1])
            h1 = document.createElement("h1");
            h1.appendChild(as[0]);
            div.appendChild(h1);
            div.appendChild(dd[j].getElementsByTagName("abbr")[0]);
            ul = dd[j].getElementsByTagName("ul")[0];
            if(ul)
            {
                div.appendChild(ul);
                str = ul.innerHTML; 
                str = str.replace(/Tutoriais para RM/g, "Tutos ");
                ul.innerHTML = str;
            }
            el[i].parentNode.insertBefore(a, el[i]);
        }
        
        el[i].parentNode.removeChild(el[i]);
        --i;
        --l;
        
        
        
    }

}

// filtrar mensagens recentes (nao mostrar repetidos)
var i = -1, topics = [], ic_recentposts;
function clearRecent(){
    var root = document.getElementById("ic_recentposts");
    if(!root)
    {
        changeIndexTopics();
        jQuery("abbr.timeago").timeago();
        return;
    }
        
    ic_recentposts = root;
    var nodes = root.childNodes;
    var elems = root.getElementsByTagName("a");
    var name = "", j, del;
    i = -1;
    while(++i < elems.length/3)
    {
        name = String(elems[i*3]);
        name = name.split("=")[1];
        name = name.split(".")[0];
        del = false;
        j = -1;
        while(++j < i) if(topics[j] == name)
            {
                del = true;
                break;
            }
        if(del)
        {
            root.removeChild(nodes[i*4]);
            root.removeChild(nodes[i*4]);
            root.removeChild(nodes[i*4]);
            root.removeChild(nodes[i*4]);
            --i;
        } else topics.push(name);
    }
    look4NewMsg(0)
}
function look4NewMsg(topicNum){

	var baseSite = "http://www.centrorpgmaker.com/forum/index.php?action=recent;start=";
	var ajax = new XMLHttpRequest();
	ajax.open("GET", baseSite + topicNum, true);
	ajax.onreadystatechange = loading;
	ajax.send(null);
	
	function loading(){
		if(ajax.readyState == 4 && ajax.status == 200) loaded(ajax.responseText);
	}
	function loaded(txt){
		var posts = []; // (topic msg) por (user) (board) (data) // board, msg, user, -, -, -
		var a = [];
		var ajaxDiv = document.createElement("div");
		ajaxDiv.innerHTML = txt;
		var root = ajaxDiv.getElementsByClassName("topic_details");
		var elems = [];
		var datas = [];
		var m = -1;
		while(++m < 10)
		{
			elems.push(root[m].getElementsByTagName("a"));
			datas.push(root[m].getElementsByTagName("em"));
		}
		var j = -1, k = -1, msg = "", del = false;
		--i;
		while(++i < 10)
		{
			a = [];
			a[2] = elems[++k][0]; // board
			a[0] = elems[k][1]; // msg
			a[1] = elems[k][2]; // user
			a[3] = null; // data
			msg = String(a[0].href);
			msg = msg.split("=")[1];
			msg = msg.split(".")[0];
			del = false;
			j = -1;
			while(++j < i) if(topics[j] == msg)
				{
					del = true;
					break;
				}
			if(del) --i; // topico repetido
			else
			{
				topics.push(msg);
				var dt = document.createElement("dt");
				var strong = document.createElement("strong");
				var aDoc = document.createElement("a");
				aDoc.href = a[0].href;
				aDoc.rel = "nofollow";
				aDoc.innerHTML = a[0].innerHTML;
				strong.appendChild(aDoc);
				dt.appendChild(strong);
				var t = document.createTextNode(" por ");
				dt.appendChild(t);
				// .. por user .. 
				aDoc = document.createElement("a");
				aDoc.href = a[1].href;
				aDoc.title = a[1].title;
				var spam = document.createElement("spam");
				spam.style = "color:#000000;";
				spam.innerHTML = a[1].innerHTML;
				aDoc.appendChild(spam);
				dt.appendChild(aDoc);
				// .. ( board ) ..
				t = document.createTextNode(" (");
				dt.appendChild(t);
				aDoc = document.createElement("a");
				aDoc.href = a[2].href;
				aDoc.innerHTML = a[2].innerHTML;
				dt.appendChild(aDoc);
				t = document.createTextNode(")");
				dt.appendChild(t);
				ic_recentposts.appendChild(dt);
				// data
				var dd = document.createElement("dd");
				dd.innerHTML = datas[k][0].innerHTML;
				ic_recentposts.appendChild(dd);
				//
				dt.style.opacity = "0";
				dd.style.opacity = "0";
				(function(item) {setTimeout(function() {item.className="mostrar";}, 1);}) (dd);
				(function(item) {setTimeout(function() {item.className="mostrar";}, 200);}) (dt);
			}
			if(!(++topicNum % 10) && topicNum - 1) break; // acabou uma pagina
		}
		if(i++ < 10) look4NewMsg(topicNum); // prosseguir para a proxima pagina
		else {
			setTimeout(function(){mudarHorarios();
								  changeIndexTopics();
								  jQuery("abbr.timeago").timeago();}, 200);
			
		}
		
		
	}



}

/* ---------------------------------- 
EXECUSSÕES
---------------------------------- */
function execs(){
	var cook = readCookie("header");
	menuOpt(cook);
	
	if (cook && cook == "true")
	{
		changeHeader();
		// vou cancelar essa função, mas farie uma função pra verificar se a página é as opções, pra poder habilitar esse cookie..
		// por enquanto não farei nada, à menos que seja pedido no tópico.
		
		cook = readCookie("nreplies");
		if (cook && cook == "true") newReplies();
	}
	
	
	

}
execs();

//changeBody();
//clearRecent();

/* ---------------------------------- 
alguns cookies
---------------------------------- */
/*
header=0;
 links=índice,index.com,,outro,outro.com;
 atvc=0; //@vc
 nreplies=0; // novas respostas
  nrepliesAll=0; // marcar todas como lidas
  
index=0;
 indexstyle=0;
 msgprocurar=0; // procurar por novas respostas
 
global=0;
 globalstyle=0;
 globaltime=0; // time
 
posts=0;
 signshide=0;
  signsonly=0; // ^ não mostrar signs repetidas
 postsstyle=0;
 
bg=0;
 bgp=0; // post #1 escolher o bg da msg
  bgps=0; // qqr post/sign pode escolher bg da msg
 bg2p=0; // post #1 escolher o bg da página
*/










