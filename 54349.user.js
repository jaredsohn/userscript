// ==UserScript==
// @name           BLIPalacz
// @namespace      http://kubofonista.co.cc/blipalacz
// @description    Dopala blipa :)
// @include        http://blip.pl/dashboard*
// @include        http://blip.pl/users/*/dashboard*
// @include        http://www.blip.pl/dashboard*
// @include        http://www.blip.pl/users/*/dashboard*
// @include        http://blip.pl/s/*
// @include        http://blip.pl/dm/*
// @include        http://blip.pl/tags/*
// @include        http://www.blip.pl/s/*
// @include        http://www.blip.pl/dm/*
// @include        http://www.blip.pl/tags/*
// @include        http://www.blip.pl/
// @include        http://www.blip.pl/bliposphere
// @include        http://blip.pl/
// @include        http://blip.pl/bliposphere
// @include        http://rdir.pl/*/stats
// @include        http://help.gadu-gadu.pl/errors/blip/
// @include        http://czydziala.gadu-gadu.pl/blip/
// @include        http://blip.pl/updates/search?*
// @require	       http://userscripts.org/scripts/source/67066.user.js
// ==/UserScript==

// ZABRANIA SIE DOKONYWANIA JAKICHKOLWIEK MODYFIKACJI KODU BEZ ZGODY AUTORA //
// MODYFIKACJA KODU STANOWI NARUSZENIE LICENCJI ORAZ BEDZIE SCIGANA //

// CORE (nieszyfrowane) //
function jQueryIsReady($) {
if(typeof GM_getValue === "undefined") {
  GM_getValue = function(name){
    var nameEQ = escape("_greasekit" + name) + "=", ca = document.cookie.split(';');
    for (var i = 0, c; i < ca.length; i++) { 
      var c = ca[i]; 
      while (c.charAt(0) == ' ') c = c.substring(1, c.length); 
      if (c.indexOf(nameEQ) == 0) {
        var value = unescape(c.substring(nameEQ.length, c.length));
        //alert(name + ": " + value);
        return value;
      }
    } 
    return null; 
  }
}

if(typeof GM_setValue === "undefined") {
  GM_setValue = function( name, value, options ){ 
    options = (options || {}); 
    if ( options.expiresInOneYear ){ 
      var today = new Date(); 
      today.setFullYear(today.getFullYear()+1, today.getMonth, today.getDay()); 
      options.expires = today; 
    } 
    var curCookie = escape("_greasekit" + name) + "=" + escape(value) + 
    ((options.expires) ? "; expires=" + options.expires.toGMTString() : "") + 
    ((options.path)    ? "; path="    + options.path : "") + 
    ((options.domain)  ? "; domain="  + options.domain : "") + 
    ((options.secure)  ? "; secure" : ""); 
    document.cookie = curCookie; 
  }
}

if(typeof GM_xmlhttpRequest === "undefined") { 
  GM_xmlhttpRequest = function(/* object */ details) { 
    details.method = details.method.toUpperCase() || "GET"; 
    if(!details.url) { 
      throw("GM_xmlhttpRequest requires an URL."); 
      return; 
    } 
    // build XMLHttpRequest object 
    var oXhr, aAjaxes = []; 
    if(typeof ActiveXObject !== "undefined") { 
      var oCls = ActiveXObject; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Microsoft.XMLHTTP"}; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP"}; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP.3.0"}; 
    } 
    if(typeof XMLHttpRequest !== "undefined") 
      aAjaxes[aAjaxes.length] = {cls:XMLHttpRequest, arg:undefined}; 
    for(var i=aAjaxes.length; i--; ) 
      try{ 
	oXhr = new aAjaxes[i].cls(aAjaxes[i].arg); 
	if(oXhr) break; 
      } catch(e) {} 
    // run it 
    if(oXhr) { 
      if("onreadystatechange" in details) 
	oXhr.onreadystatechange = function() 
	  { details.onreadystatechange(oXhr) }; 
      if("onload" in details) 
	oXhr.onload = function() { details.onload(oXhr) }; 
      if("onerror" in details) 
	oXhr.onerror = function() { details.onerror(oXhr) }; 
      oXhr.open(details.method, details.url, true); 
      if("headers" in details) 
	for(var header in details.headers) 
	  oXhr.setRequestHeader(header, details.headers[header]); 
      if("data" in details) 
	oXhr.send(details.data); 
      else 
	oXhr.send(); 
    }
    else {
      throw ("This Browser is not supported, please upgrade.");
    }
  } 
} 

if(typeof GM_addStyle === "undefined") { 
  GM_addStyle = function(/* String */ styles) {
    var oStyle = document.createElement("style"); 
    oStyle.setAttribute("type", "text\/css"); 
    oStyle.appendChild(document.createTextNode(styles)); 
    document.getElementsByTagName("head")[0].appendChild(oStyle); 
  } 
} 

if(typeof GM_log === "undefined") { 
  GM_log = function(log) {
    if(console) 
      console.log(log); 
    else 
      alert(log); 
  }
}
}

ver = '3.1';
verb = 3001;

if(GM_getValue('lastverremind') == undefined) {
	GM_setValue('lastverremind',verb);
}

if(document.location.href == 'http://blip.pl/dashboard?dev') {
	dev = 1;
} else {
	dev = 0;
}

// MAGIA REBLIPI W STATSACH //
reblipi = GM_getValue('reblipi'); if(reblipi == undefined) { reblipi = 1; GM_setValue('reblipi',1); }

if(document.location.href.match('http://rdir.pl/') && reblipi == 1) {
 url = document.documentURI;
    rdir_id = url.substring(15, url.lastIndexOf("/"));
    reblipi_url = "http://re.blipi.pl/" + rdir_id;

    GM_addStyle("#loading { display: block; margin: 1em auto; }");
    GM_addStyle(".avatar {margin: 0 0.25em 0 0.5em; vertical-align:middle;} br {margin-bottom: 1em;} ");
    
    box = document.evaluate('//*[@class="module"]', 
                            document, null, 
                            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                            null).snapshotItem(0); 

    header = document.createElement('h3');
    header.innerHTML = 'Magia reblipi <a href="' + reblipi_url + '">' + 
                       reblipi_url + '</a>';

    loading = document.createElement('img');
    loading.setAttribute('id', 'loading');
    loading.setAttribute('src', 'http://blip.pl/images/ajax-loading.gif');

    box.appendChild(header);
    box.appendChild(loading);

    GM_xmlhttpRequest({
        method: "GET",
        url: "http://re.blipi.pl/" + rdir_id,
        onload: function(response) {
            var responseXML = document.createElement('html');
            responseXML.innerHTML = response.responseText;
            
            results = document.createElement('ul');
            addedBy = document.createElement('li');
            addedBy.innerHTML = 'Dodane przez: <br />';
            results.appendChild(addedBy);
            
            quotes = document.evaluate('//li[@class="content"]/p', 
                                 responseXML, null, 
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                                 null); 
            
            for (i=0; i < quotes.snapshotLength ; i++) {
                quote = quotes.snapshotItem(i);
                item = document.createElement('li');
                
                link = quote.parentNode.parentNode
                            .getElementsByTagName('a')[1];
                
                img = quote.parentNode.parentNode
                           .getElementsByTagName('img')[0];
                
                name = img.getAttribute('title');
                name = name.substring(1, name.length);
                
                image = document.createElement('a');
                image.setAttribute('href', 'http://blip.pl/users/'+ name +'/dashboard');
                image.appendChild(img);
                
                author = document.createElement('a');
                author.setAttribute('href', 'http://blip.pl/users/'+ name +'/dashboard');
                author.innerHTML = name;
                
                content = document.createElement('span');
                content.innerHTML = ': ' + quote.innerHTML
                
                item.appendChild(link);
                item.appendChild(image);
                item.appendChild(author);
                item.appendChild(content);
                item.appendChild(document.createElement('br'));
                
                results.appendChild(item);
            }
            box.replaceChild(results, loading);
        }
    });

}
// EOF MAGIA //

back = GM_getValue('back'); if(back == undefined) { back = 1; GM_setValue('back',1); }

if(back == 1 && (document.location.href == 'http://help.gadu-gadu.pl/errors/blip/' || document.location.href == 'http://czydziala.gadu-gadu.pl/blip/')) {
	document.location.href = 'http://blip.pl/dashboard';
	return false;
}

	counter = GM_getValue('counter');
	obswarn = GM_getValue('obswarn');
	adres = document.location.href;
	nick = $("#profile-info > h1").html();
	token = $('#authenticity_token').html().replace('"','').replace('"','').replace(/\n/,'').replace(/\n/,'').replace(/ /gi,'');
	zalogowany = $('.login-data').html();
	
	zalogowany = zalogowany.split(' ');
	zalogowany = zalogowany[10].replace(/\n/,'');
// EOF CORE //
	
// ############## BLIPALACZ ENGINE CODE ############## //
	if(typeof counter === "string") counter=parseInt(counter);
	if(counter == undefined) {
		alert('Witaj! \r\n To Twoje pierwsze uzycie BLIPalacza. Mam nadzieje ze Ci sie spodoba. \r\n Bardzo mile widziane sa wszelkie sugestie dlatego pisz na tracker: http://projects.kubofonista.net/proj2 lub do ^kubofonista, ewentualnie na tag #blipalacz \r\n\r\n Obserwujac ^blipalacz.a bedziesz mogl obserwowac zmiany w projekcie, do czego zachecam :) \r\n\r\n Milego dnia!');
		counter = 1;
		GM_setValue('counter',1);
		GM_setValue('lastverremind',verb);
	} else {
		counter = counter + 1;
		GM_setValue('counter',counter);
		
		if(GM_getValue('ver3') == undefined) {
		alert('====== WAZNE !!! ======= \r\n Witaj! Otrzymujesz ten komunikat poniewaz zaktualizowales BLIPalacza do wersji 3.0! \r\n\r\n Nie jest to zwykla aktualizacja dlatego przeczytaj prosze ten komunikat do konca. \r\n W wersji obecnie uzywanej przez Ciebie zastosowalem nowe mechanizmy dzialania.\r\n Od teraz BLIPalacz dziala tylko gdy otrzyma cos na kokpit. Spowodowalo to spadek generowanego obciazenia CPU do prawie zerowego w trybie spoczynku. \r\n Testerzy wykonali testy tej wersji jednak nie daje to 100% pewnosci, ze wszystko gra. \r\n W razie problemow prosze o kontakt: support@kubofonista.net');
		Message('Wiecej o zainstalowanej wersji dowiesz sie na <a title="http://kubofonista.net/blipalacz-3-0-jakie-powazne-zmiany-niesie" href="http://kubofonista.net/blipalacz-3-0-jakie-powazne-zmiany-niesie" target="_blank">http://kubofonista.net/blipalacz-3-0-jakie-powazne-zmiany-niesie</a>');
		GM_setValue('ver3','ok');
		}
		
	}
	
	if(obswarn == undefined) {
		alert("Otrzymujesz ten komunikat poniewaz zainstalowales / zaktualizowales BLIPalacza \r\n Komunikat ten zostanie wyswietlony tylko teraz. \r\n\r\n Zainstalowales BLIPalacza, to fajnie. Zapraszam do dodania uzytkownika ^blipalacz do obserwowanych. \r\n Dlaczego? Bo z tego konta sa podawane wazne informacje dot. skryptu :). \r\n Naprawde nie chcesz dodawac? Trudno, a tego komunikatu juz nie zobaczysz :) \r\n\r\n Zostaniesz przekierowany na kokpit ^blipalacz.a.");
		window.location = 'http://blip.pl/users/blipalacz/dashboard';
		GM_setValue('obswarn',1);
	}

	
	kolorowanietagow = GM_getValue('kolorowanietagow'); if(kolorowanietagow == undefined) { kolorowanietagow = 1; GM_setValue('kolorowanietagow',1); }
	bliposfera = GM_getValue('bliposfera'); if(bliposfera == undefined) { bliposfera = 1; GM_setValue('bliposfera',1); }
	bliposferacytat = GM_getValue('bliposferacytat'); if(bliposferacytat == undefined) { bliposferacytat = 1; GM_setValue('bliposferacytat',1); }
	cytatykokpit = GM_getValue('cytatykokpit'); if(cytatykokpit == undefined) { cytatykokpit = 1; GM_setValue('cytatykokpit',1); }
	linkinotice = GM_getValue('linkinotice'); if(linkinotice == undefined) { linkinotice = 1; GM_setValue('linkinotice',1); }
	cytujcytat = GM_getValue('cytujcytat'); if(cytujcytat == undefined) { cytujcytat = 1; GM_setValue('cytujcytat',1); }
	blipi = GM_getValue('blipi'); if(blipi == undefined) { blipi = 1; GM_setValue('blipi',1); }
	blipir = GM_getValue('blipir'); if(blipir == undefined) { blipir = 1; GM_setValue('blipir',1); }
	linkikokpit = GM_getValue('linkikokpit'); if(linkikokpit == undefined) { linkikokpit = 1; GM_setValue('linkikokpit',1); }
	usunpolecamy = GM_getValue('usunpolecamy'); if(usunpolecamy == undefined) { usunpolecamy = 0; GM_setValue('usunpolecamy',0); }
	komunikatory = GM_getValue('komunikatory'); if(komunikatory == undefined) { komunikatory = 1; GM_setValue('komunikatory',1); }
	menedzer = GM_getValue('menedzer'); if(menedzer == undefined) { menedzer = 1; GM_setValue('menedzer',1); }
	wylwaz = GM_getValue('wylwaz'); if(wylwaz == undefined) { wylwaz = 0; GM_setValue('wylwaz',0); }
	plonk = GM_getValue('plonk'); if(plonk == undefined) { plonk = 1; GM_setValue('plonk',1); }
	trzyszesc = GM_getValue('trzyszesc'); if(trzyszesc == undefined) { trzyszesc = 1; GM_setValue('trzyszesc',1); }
	kontynuuj = GM_getValue('kontynuuj'); if(kontynuuj == undefined) { kontynuuj = 1; GM_setValue('kontynuuj',1); }
	countero = GM_getValue('countero'); if(countero == undefined) { countero = 1; GM_setValue('countero',1); }
	
	/* // Prima Aprillis //
	if(document.location.href == 'http://blip.pl/dashboard?blipalacz=stopprima') {
		prima = 0;
		GM_setValue('prima',0);
	} else {
		prima = GM_getValue('prima'); if(prima == undefined) { prima = 1; GM_setValue('prima',1); }
	}
	// EoF Prima Aprillis
	*/
	
	hc = GM_getValue('hc'); if(hc == undefined) { hc = 1; GM_setValue('hc',1); }
	

	
	function AktywnoscDodatkow(dodatek,stan) {
		if(stan == 0) {
			return '(<font color="red">nieaktywny</font>) [<a href="" id="blipalacz-active-'+dodatek+'">V</a>]';
		} else {
			return '(<font color="green">aktywny</font>) [<a href="" id="blipalacz-deactive-'+dodatek+'">X</a>]';
		}
	}
	

	
	kts = AktywnoscDodatkow('kolorowanietagow',kolorowanietagow);
	bs = AktywnoscDodatkow('bliposfera',bliposfera);
	bsc = AktywnoscDodatkow('bliposferacytat',bliposferacytat);
	ctk = AktywnoscDodatkow('cytatykokpit',cytatykokpit);
	lnc = AktywnoscDodatkow('linkinotice',linkinotice);
	cc = AktywnoscDodatkow('cytujcytat',cytujcytat);
	bpi = AktywnoscDodatkow('blipi',blipi);
	bpir = AktywnoscDodatkow('blipir',blipir);
	lkp = AktywnoscDodatkow('linkikokpit',linkikokpit);
	upl = AktywnoscDodatkow('usunpolecamy',usunpolecamy);
	ko = AktywnoscDodatkow('komunikatory',komunikatory);
	me = AktywnoscDodatkow('menedzer',menedzer);
	bc = AktywnoscDodatkow('back',back);
	wylwazz = AktywnoscDodatkow('wylwaz',wylwaz);
	plonkk = AktywnoscDodatkow('plonk',plonk);
	trzyszescc = AktywnoscDodatkow('trzyszesc',trzyszesc);
	counteroo = AktywnoscDodatkow('countero',countero);
	reblipii = AktywnoscDodatkow('reblipi',reblipi);
	kontynuujj = AktywnoscDodatkow('kontynuuj',kontynuuj);
	
	hcc = AktywnoscDodatkow('hc',hc);
	
	if(menedzer == 1) {
		mdata = GM_getValue('menedzer-data');
		if(mdata == undefined) { GM_setValue('menedzer-data',''); mdata = ''; }
		passes=mdata.split('!@!');
		
		mdisp = '';
		
		for ( var i in passes )
		{
		    	passee = passes[i].split('@!@');
		    	if(passee[1] == undefined) {
		    		// nothing
		    	} else {
		    	mdisp = mdisp+'<form method="post" id="'+i+'" action="http://blip.pl/sessions"><input type="hidden" name="logging_in_user[login]" id="logging_in_user[login]['+i+']" value="'+passee[0]+'"/><input type="hidden" name="logging_in_user[password]" id="logging_in_user[password]['+i+']" value="'+passee[1]+'"/>'+passee[0]+'<input type="submit" value="Zaloguj &raquo;" style="font-size:9px; border: none; background:none; padding-left:1px;"/><br /></form>';
		    	}
		    	passee = '';
		 }
		
		menedzertresc = mdisp+'<br /><a id="menedzer-add" href="#">Dodaj kolejne konto &raquo;</a><br /><a id="menedzer-delall" href="#">Usun konta &raquo;</a><div id="menedzer-addacc" style="display:none;"><br /><form id="menedzer-form">Login: <input id="menedzer-login"><br />Haslo: <input id="menedzer-haslo" type="password"><br /><input type="submit" value="Zapisz" size="9"></form></div>';
		menedzerkont = '<div id="blipalacz-manager-box"><div class="transparent-box-rounding"></div><div class="transparent-box"><ul class="tab-bar"><li><h2 class="single">Menedzer kont BLIPowych (<a href="#" id="menedzer-info">?</a>)</h2></li></ul><center><font style="color:#222222; font-size:85%;">'+menedzertresc+'</font></center></div><div class="transparent-box-rounding-bottom"></div></div>';
	//	menedzerkont ='null';
	} else {
		menedzerkont = '';
	}
	
	if(wylwaz == 0 && (document.location.href == 'http://blip.pl/dashboard' || document.location.href == 'http://blip.pl/dashboard?dev')) {
	dash = '<div id="blipalacz-important-box"><div class="transparent-box-rounding"></div><div class="transparent-box"><ul class="tab-bar"><li><h2 class="single">BLIPalacz: Wazne informacje</h2></li></ul><center><font style="color:#222222; font-size:85%;"><div id="blidashek" /></font></center></div><div class="transparent-box-rounding-bottom"></div></div>';
	} else {
	dash = '';
	}
	
	if(dev == 1) { dopb = '<font color="red"><b>DEVELOPMENT MODE ON!</b></font>'; } else {dopb = ''; }
	copy = '<div id="blipalacz-box" style="display:none"><div class="transparent-box-rounding"></div><div class="transparent-box"><ul class="tab-bar"><li><h2 class="single">Blip dopalony przez <a href="http://kubofonista.net/blipalacz">BLIPALACZ</a></h2></li></ul><center><font style="color:#222222; font-size:85%; margin:5px;">Uzywasz wersji: '+ver+'<br />'+dopb+'<div id="blipalacz-ver"></div><div id="blipalacz-workplace"></div><font size=0>BLIPalacz uzyty juz '+counter+' razy :)<br />&copy; 2010 <a href="http://blip.pl/users/kubofonista/dashboard">^Kubofonista</a></font><br /><font size="1"><a id="blipalacz-showsets" href="#" title="Wyswietla konfiguracje BLIPalacza">Ustawienia wtyczki &raquo;</a></font><br /><div id="blipalacz-sets" style="display:none"></div></font></center></div><div class="transparent-box-rounding-bottom"></div></div>'+menedzerkont+dash+'<center><img id="onlinecounter" src="http://whos.amung.us/swidget/3n8pebav5b25.png" alt="Liczba uzytkownikow BLIPalacza Online" style=""/><br/><font style="font-size:9px;">(Liczba uzytkownikow BLIPalacza online)</font></center>';
	if($('#observed-and-observing-box') == undefined) {
		// stop!
	} else {
		$('#observed-and-observing-box').append(copy);
	}
	
	if(document.location.href == 'http://blip.pl/users/blipalacz/dashboard' || document.location.href == 'http://www.blip.pl/users/blipalacz/dashboard') {
	darowizna = '<br /><br /><br /><center><div style="font-family:Verdana,sans; background-color:#CD9B82; letter-spacing:2px; padding-bottom:0; text-transform:none; padding-left:6px; width:100%"><center>Witaj na oficjalnym profilu BLIPalacza - dodatku ktorego uzywasz.<br /><br />Jesli cenisz sobie ten dodatek zaobserwuj prosze ten profil - pomoze mi to lepiej zliczyc uzytkownikow. <br /><br />Jesli bardzo go lubisz i chcesz wspomoc:<br /><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="LS9TCTPXR7KEU"><input type="image" src="https://www.paypal.com/pl_PL/PL/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal — Płać wygodnie i bezpiecznie"><img alt="" border="0" src="https://www.paypal.com/pl_PL/i/scr/pixel.gif" width="1" height="1"></form></center></div></center>';
	$('#quick-jump-box').append(darowizna);
	}
	$('#blipalacz-box').fadeIn();
	setting = '<b>Aktywnosc dodatkow:</b> <br /> Kolorowanie tagow '+kts+'<br />Czytelniejsza bliposfera '+bs+'<br /> Cytaty w bliposferze '+bsc+'<br/> Cytaty na kokpicie '+ctk+'<br />Przybornik w powiadomieniach '+lnc+'<br />Przybornik w cytatach '+cc+'<br />Integracja z blipi.pl '+bpi+'<br />Ranking na kokpicie (obok nicka) '+bpir+'<br />Kokpit: Zamiana [link] na adres '+lkp+'<br />Linkowanie komunikatorow '+ko+'<br />Usuniecie boxa Polecamy '+upl+'<br />Powrot na kokpit z oponki '+bc+'<br />Menedzer kont blipowych '+me+'<br />Usuwanie tag clouda z kokpitow '+hcc+'<br /> Integracja z 3600.pl '+trzyszescc+'<br /> Ignor (plonk) pod blipnieciem '+plonkk+'<br /> Licznik obserwowanych online '+counteroo+' <br /> Magia REBLIPI w stats '+reblipii+'<br />Kontynuuj przy wlasnych dm/pm '+kontynuujj+'<br /> <p style="font-size:5px;">Ukryj boks wazne od BLIPalacza '+wylwazz+'</p><a href="#" id="blipalacz-polecamy">Wyswietl raz Polecamy &raquo;</a>';
	if($("#blipalacz-sets") == undefined) {
		// stop!
	} else {
		$("#blipalacz-sets").append(setting);
	}
	
	//$(".toolbar").append('<span class="divider"> |&nbsp;</span> <a class="permalink" href="http://stats.blipi.pl">tatystyki &nbsp;</a>');
	$("#blipalacz-showsets").click(function() { if($("#blipalacz-sets").attr('style') == '') { $("#blipalacz-sets").fadeOut(); } else { $("#blipalacz-sets").fadeIn(); } return false;  });
	
	if(wylwaz == 0 && (document.location.href == 'http://blip.pl/dashboard' || document.location.href == 'http://blip.pl/dashboard?dev')) {
	blipalaczdash = GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://api.blip.pl/users/blipalacz/statuses?limit=5',
	    headers: {
	        'User-agent': 'BLIPalacz',
	        //'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
	    	insideblidash = '';
	    	blidash = JSON.parse(responseDetails.responseText, function (key, value) {
	    	    var type;
	    	    if (value && typeof value === 'object') {
	    	        type = value.type;
	    	        if (typeof type === 'string' && typeof window[type] === 'function') {
	    	            return new (window[type])(value);
	    	        }
	    	    }
	    	    return value;
	    	});
	    	    	
	    	
	    	for (x in blidash) {
	    		data = blidash[x]['created_at'];
	    		tresc = blidash[x]['body'];
	    		insideblidash = insideblidash+'<font style="font-size:9px;">'+tresc+'</font><p align="right" style="font-size: 8px">'+data+'</p><hr style="border:none; padding-bottom:8px"/>';
	    	}
	    	document.getElementById('blidashek').innerHTML = insideblidash;
	    }
	});
	}
	
	
	$("#blipalacz-polecamy").click(function() { $('#recommended-box').fadeIn(); });
	
	$("#menedzer-info").click(function() { 	alert('Menedzer kont BLIPowych to dodatek dostarczony przez BLIPalacza. \r\n Umozliwia on zarzadzanie swoimi blipowymi kontami. \r\n Nie musisz pamietac hasel do kont swoich botów. Poprostu je dodaj i klikaj "Zaloguj sie" ;) \r\n\r\n Prywatnosc: Hasla sa zapisywane TYLKO w twojej przegladarce i NIGDY NIE SA NIGDZIE PRZESYLANE'); return false;	});
	$("#menedzer-add").click(function() {	$("#menedzer-addacc").toggle();	alert('Po dodaniu konta wejda na liste po odswiezeniu strony'); return false;	});
	$("#menedzer-delall").click(function() {	GM_setValue('menedzer-data',''); alert('Konta usuniete. Odswiez strone :)');	return false;	});
	$("#menedzer-form").submit(function() {	
		menedzersave = $('#menedzer-login').val()+'@!@'+$('#menedzer-haslo').val()+'!@!';
		menedzerdata = GM_getValue('menedzer-data');
		
		if(menedzerdata == undefined) { 
			GM_setValue('menedzer-data',menedzersave); 
		} else {
			GM_setValue('menedzer-data',menedzerdata+menedzersave);
		}
		
		$('#menedzer-login').val('');
		$('#menedzer-haslo').val('');
		
		return false;	});

	
	BindujZmiane('kolorowanietagow');
	BindujZmiane('bliposfera');
	BindujZmiane('bliposferacytat');
	BindujZmiane('cytatykokpit');
	BindujZmiane('linkinotice');
	BindujZmiane('cytujcytat');
	BindujZmiane('blipi');
	BindujZmiane('blipir');
	BindujZmiane('linkikokpit');
	BindujZmiane('usunpolecamy');
	BindujZmiane('komunikatory');
	BindujZmiane('menedzer');
	BindujZmiane('trzyszesc');
	BindujZmiane('plonk');
	BindujZmiane('countero');
	BindujZmiane('hc');
	BindujZmiane('reblipi');
	BindujZmiane('kontynuuj');
	
	BindujZmianeAlert('wylwaz','Zamierzasz zmienic status boksa wazne wiadomosci BLIPalacza. Zastanow sie czy naprawde Ci on przeszkadza? Zajmuje przeciez niewiele miejsca i to na koncu widgetow (wiec nie przeszkadza) a pozwala autorowi na kontakt z Toba. Jesli go wylaczysz - nie bedziesz wiedzial o dosyc waznych sprawach dotyczacych skryptu. Zachecam wtedy do obserwacji ^blipalacz. A jesli nie chcesz takze obserwowac, to Twoja sprawa jednak nie wspomagasz nas nie obserwujac :(','Dzieki za wlaczenie tego boksa. Mysle ze nie powinien Ci on przeszkadzac :)');
	
	unique = GM_getValue('unique');
	
	if(unique == undefined) {
		unique = '&unique';
		GM_setValue('unique',1);
	} else {
		unique = '';
	}
	
	vercheck = GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://dev.kubofonista.net/outsourcing/blipalacz/ver.php?ver='+verb+'&nick='+zalogowany+unique,
	    headers: {
	        'User-agent': 'BLIPalacz CheckVer',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
	    	if(responseDetails.responseText == 2) {
	        	verc = '<font color="brown"><b>Przedpremierowa wersja skryptu (k. '+verb+')</b></font>';
	    	} else if(responseDetails.responseText == -1) {
	    		verc = '<font color="brown"><b>DODATEK NIEAKTYWNY</b></font>';
	    		kolorowanietagow = 0;
	    		bliposfera = 0;
	    		bliposferacytat = 0;
	    		cytatykokpit = 0;
	    		linkinotice = 0;
	    		cytujcytat = 0;
	    		blipi = 0;
	    		blipir = 0;
	    		linkikokpit = 0;
	    		usunpolecamy = 0;
	    		komunikatory = 0;
	    		menedzer = 0;
	    		back = 0;
	    		wylwaz = 1;
	    		plonk = 0;
	    		trzyszesc = 0;
	    		conutero = 0;
	    		
	    		hc = 0;
	    	} else if(responseDetails.responseText == 1) {
	        	verc = '<font color="green"><b>DOSTEPNA JEST NOWSZA WERSJA!</b></font><br /><a href="http://kubofonista.net/download/BLIPalacz.user.js">AKTUALIZUJ &raquo;</a>  |   <a href="http://kubofonista.net/blipalacz" target="_blank">Changelog &raquo;</a>';
	        	Message('<font color="green"><b>Dostepna jest nowsza wersja dodatku!</b></font><br /><a href="http://kubofonista.net/download/BLIPalacz.user.js" title="Kliknij aby zaktualizowac &raquo;">Kliknij aby zaktualizowac &raquo;</a>  |   <a href="http://kubofonista.net/blipalacz" target="_blank" title="Kliknij i zobacz Changelog &raquo;">Kliknij i zobacz Changelog &raquo;</a>');
	        } else if(responseDetails.responseText == 0) {
	        	verc = 'Uzywasz najnowszej wersji skryptu';
		        workp = '<font size="0"><a id="blipalacz-work" href="#" title="Jak ida prace nad nowa wersja skryptu?">Jak ida prace nad nowa wersja? &raquo;</a></font>';
		        if($("#blipalacz-workplace") == undefined) {
		        	// stop !
		        } else {
		        	 $("#blipalacz-workplace").append(workp);
		        }
		       	$("#blipalacz-work").click(function() {  
		    		work = GM_xmlhttpRequest({
		    		    method: 'GET',
		    		    url: 'http://projects.kubofonista.net/roadmap/proj2?txt=true',
		    		    headers: {
		    		        'User-agent': 'BLIPalacz CheckVer',
		    		        'Accept': 'application/atom+xml,application/xml,text/xml',
		    		    },
		    		    onload: function(responseDetails) {
		    		        workk = responseDetails.responseText;
		    		        alert(workk+"Masz wlasny pomysl? Zglos go na http://projects.kubofonista.net/proj2");
		    		    }
		    		});
		    		return false;  });
	        } else {
	        	verc = '<font color="red"><b>BLAD SPRAWDZANIA WERSJI</b></font>';
	        }        
	    	
	    	if($("#blipalacz-ver") == undefined) {
	    		// stop!
	    	} else {
	    		 $("#blipalacz-ver").append(verc);
	    	}
	       
	        if(GM_getValue('lastverremind') == undefined || GM_getValue('lastverremind') < verb || isNaN(GM_getValue('lastverremind'))) {
	        	alert("Strzalka! BLIPalacz wlasnie wykryl ze dostepna jest jego nowsza wersja. Za chwile wyswietle Ci okienko aktualizacyjne. Jesli chcesz zobaczyc changelog zapraszam na http://kubofonista.net/blipalacz \r\n\r\nTo jest powiadomienie jednorazowe.");
	        	GM_setValue('lastverremind',verb);
	        	window.location='http://kubofonista.net/download/BLIPalacz.user.js';
	        }
	    }
	});
	
	//$(".permalink")[1].click(function() { alert('a'); });
	/*var arr = $('.permalink');
    $.each(arr,function(index, item)

    	    {
    		//alert(item.innerHTML);
    	        item.onclick = alert('a');

    	    });*/
	
	if(document.getElementById('recommended-0-tab') == undefined) {
		// do nothing
	} else {
		if (document.getElementById('tracked-user-77810') == undefined) {
			poprzre = $('#recommended-0-tab > ul').html();
			$('#recommended-0-tab > ul').html('<li id="recommended-user-77810"><a title="BLIPalacz" class="recommended-user-avatar" href="/users/blipalacz/dashboard"><img src="http://static1.blip.pl/user_generated/avatars/724691_nano.jpg" alt="BLIPalacz - avatar"/></a></li>'+poprzre);
		}
	}
	
	if(usunpolecamy == 1) {
		GM_addStyle('#recommended-box {display:none; } #beginners-recommended-box {display:none; }');

	}

	if(hc == 1) {
		if(!adres.match('http://blip.pl/tags/')) {
			GM_addStyle('#tagcloud-box {display:none;}');
		}
	}
	


	if(blipir == 1) {
	
	adres = document.location.href;
	
	if(adres.match('http:\/\/blip.pl\/dashboard') || adres.match('http:\/\/blip.pl\/users')) {


	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://api.blipi.pl/blipalacz/stats/'+nick,
	    headers: {
	        'User-agent': 'BLIPalacz',
	    },
	    onload: function(responseDetails) {
	    	json = JSON.parse(responseDetails.responseText, function (key, value) {
	    	    var type;
	    	    if (value && typeof value === 'object') {
	    	        type = value.type;
	    	        if (typeof type === 'string' && typeof window[type] === 'function') {
	    	            return new (window[type])(value);
	    	        }
	    	    }
	    	    return value;
	    	});

	    		zwrot = json['rank'];
    			zm = json['rankchange'];
    			zms = json['trackedbychange'];
    			zwrotny = json['trackedby'];
    			cytowan = json['citations'];
    			wzmianek = json['mentions'];
    			
    			if(zm == 0 || zm == undefined) {
    				zmiana = '';
    			} else {
    				if(zm > 0) {
    					zm = zm+'';
    					zm = zm.replace('-','');
    					zmiana = ' <img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMGQwkE21IS08AAAFASURBVCjPrZIxSwNBEIXf7ia5u72LMTkTEg5Ro4WVf0SraJM/IGITFMukshDEBCwECRibNIKVhYitv8JWsBETlCho7nbHRu8M5NTCgQdv9/ExAzNATHUuD+n4vElxeSIuuOvdYPD0FheDj/tsdKo0M5+Bt5jGdmuN/gTudTepNJ0EFwxcMEzNcdSP1ulXUMg+pJ0AKQ2lCIYjoOXDzx3rnQq5eQtKEZQi6E9lSyZqrRUaCzZOquR5NijQ30ShCrMWtpqrNAIenO3QpAuIBIPWFOqrs1IELhicvMZuu0YAwLrXbbq9v0IuZ4BzBiMVTd97jdYRDAnK13h+9LFUXgYbWcNphYpFKwIH76F/6Q+xv3HBxh5AWhZgpSLQMaOOXAbxl+NOlJGRyWg1zA+9DRUPFrILsKQI32ZSh943NP6lPgAyQ4PF9853mAAAAABJRU5ErkJggg=="><font color="green">['+zm+']</font>';
    				} else {
    					zmiana = ' <img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMGQwqOF93n4EAAAFZSURBVCjPnZA7SwNBFIXPzO7mYWI6IUYEEREL3yKKiJUQEaJREFJZWERU1EaiP0HstBH8BXapBav8ABsFDcFAMIIgSViSmMfsztjt7CYsiKe6c+58XM4B/ilifzyl70VIkRb1UGuuNE3MxRPWUrWDRuEVileRoE/O7RpzXHSA7DMH1S8tGtTkrtJyB83SF0hAWorhkWC56cz4eHctfjJpDAVV+AmBX5UZ1V4J1hiHKQSKVQbvwiboavKUmINjYBwOqFNBjcLggBkexfLeMaEAMLxzRPJMQ8MQrmCDcxQaCsJbhwQAKABMzU5gYHufvOjMFcyVW+iLJcnk9DgsEACWYnH0LK6RfN3ogj6qDL6ZKObXN2Tj9g/Rkwt8hyIoM255ettEKdCPlYOUVcBbUXeCADCye06yLQ2MCxhC4L2uIJI4c0BdF+15n3WGbEeuP+nh5lJkbq9ca/4FqcF15bkSkS4AAAAASUVORK5CYII="><font color="red">['+zm+']</font>';
    				}
    			}
  		
			if(zms == 0 | zms == undefined) {
				zmianas = '';
			} else {
				if(zms > 0) {
					zms = zms+'';
					zms = zms.replace('-','');
					zmianas = ' <img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMGQwkE21IS08AAAFASURBVCjPrZIxSwNBEIXf7ia5u72LMTkTEg5Ro4WVf0SraJM/IGITFMukshDEBCwECRibNIKVhYitv8JWsBETlCho7nbHRu8M5NTCgQdv9/ExAzNATHUuD+n4vElxeSIuuOvdYPD0FheDj/tsdKo0M5+Bt5jGdmuN/gTudTepNJ0EFwxcMEzNcdSP1ulXUMg+pJ0AKQ2lCIYjoOXDzx3rnQq5eQtKEZQi6E9lSyZqrRUaCzZOquR5NijQ30ShCrMWtpqrNAIenO3QpAuIBIPWFOqrs1IELhicvMZuu0YAwLrXbbq9v0IuZ4BzBiMVTd97jdYRDAnK13h+9LFUXgYbWcNphYpFKwIH76F/6Q+xv3HBxh5AWhZgpSLQMaOOXAbxl+NOlJGRyWg1zA+9DRUPFrILsKQI32ZSh943NP6lPgAyQ4PF9853mAAAAABJRU5ErkJggg=="><font color="green">('+zms+')</font>';
				} else {
					zmianas = ' <img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMGQwqOF93n4EAAAFZSURBVCjPnZA7SwNBFIXPzO7mYWI6IUYEEREL3yKKiJUQEaJREFJZWERU1EaiP0HstBH8BXapBav8ABsFDcFAMIIgSViSmMfsztjt7CYsiKe6c+58XM4B/ilifzyl70VIkRb1UGuuNE3MxRPWUrWDRuEVileRoE/O7RpzXHSA7DMH1S8tGtTkrtJyB83SF0hAWorhkWC56cz4eHctfjJpDAVV+AmBX5UZ1V4J1hiHKQSKVQbvwiboavKUmINjYBwOqFNBjcLggBkexfLeMaEAMLxzRPJMQ8MQrmCDcxQaCsJbhwQAKABMzU5gYHufvOjMFcyVW+iLJcnk9DgsEACWYnH0LK6RfN3ogj6qDL6ZKObXN2Tj9g/Rkwt8hyIoM255ettEKdCPlYOUVcBbUXeCADCye06yLQ2MCxhC4L2uIJI4c0BdF+15n3WGbEeuP+nh5lJkbq9ca/4FqcF15bkSkS4AAAAASUVORK5CYII="><font color="red">('+zms+')</font>';
				}
			}

			if(zwrotny == 0 || zwrotny == undefined) {
				$('#profile-info > .clearfix').append('<dl style="width:100%"><dt class="small">Obserwujacy: 0/brak danych</dt></dl>');
			} else {
				$('#profile-info > .clearfix').append('<dl style="width:100%"><dt class="small">Obserwujacy: '+zwrotny+zmianas+'</dt></dl>');
			}
			
			if(zwrot == 0 || zwrot == undefined) {
	    		$("#profile-info > h1").html(nick+' <span style="font-size:11px; text-align:right; position: relative; top: -2px;">(top n/a)</span>');
			} else {
	    		$("#profile-info > h1").html(nick+' <span style="font-size:11px; text-align:right; position: relative; top: -2px;">(top '+zwrot+zmiana+')</span><br /><font style="font-size: 8.5px;">Cytowan: '+cytowan+' | Wzmianek: '+wzmianek+'</font>');
			}
			

    		if(GM_getValue('top['+nick+']') == undefined) {} else { GM_deleteValue('top['+nick+']'); }
    		if(GM_getValue('obs['+nick+']') == undefined) {} else { GM_deleteValue('obs['+nick+']'); }
    		// kasowanie smietnika po poprzedniej wersji
	    }
	});
	
	}
	}
	
	if(blipi == 1) {
	
	blipis = '<div id="blipi-szukaj" style="display:none; padding-top:5px;float:left"> Wyszukaj: <br/><font style="font-family: Georgia,serif; font-style: italic; font-weight: bold; letter-spacing: -0.1em; text-indent: -1em; font-size: 10px; padding-left: 25px;">blipi.pl </font></div> <div style="float:right; padding-right:11px; padding-top:5px;"> <textarea id="blipi-search" style="display:none; width: 160px; height:30px;"/><br/></div>';
	$("#jump").append(blipis);
	
	$("#blipi-szukaj").fadeIn();
	$("#blipi-search").fadeIn();
	
	$("#blipi-search").keypress(function (e) {  
		         if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
		        	 if($("#blipi-search").val() == '') { alert('Wpisz ciag do wyszukania'); return false; }
		        	 $('#dashboard-updates').fadeTo("slow", 0.1);
		        	 szukane = $("#blipi-search").val();
		        	 beforebody = document.getElementById('dashboard-updates').innerHTML;
		        	 $('#dashboard-loading').attr('style','visibility:visible');
		        	 //document.getElementById('dashboard-updates').innerHTML = '<center><img src="http://blip.pl/images/ajax-loading.gif"></center><br />'+document.getElementById('dashboard-updates').innerHTML;
		        		blipidata = GM_xmlhttpRequest({
		        		    method: 'GET',
		        		    url: 'http://api.blipi.pl/blipalacz/szukaj/'+$("#blipi-search").val(),
		        		    headers: {
		        		        'User-agent': 'BLIPalacz',
		        		        'Accept': 'application/atom+xml,application/xml,text/xml',
		        		    },
		        		    onload: function(responseDetails) {
		        		    	
		        		    	blipijson = JSON.parse(responseDetails.responseText, function (key, value) {
		        		    	    var type;
		        		    	    if (value && typeof value === 'object') {
		        		    	        type = value.type;
		        		    	        if (typeof type === 'string' && typeof window[type] === 'function') {
		        		    	            return new (window[type])(value);
		        		    	        }
		        		    	    }
		        		    	    return value;
		        		    	});
		        		    	
		        		    	if(blipijson == '') {
		        		    	blipizc = 'Niestety brak wynikow dla tego zapytania. <br />Skad ta wyszukiwarka? To magia <a href="http://blipi.pl/?referer=blipalacz" done="1" target="_blank">BLIPI.PL</a> i <a href="http://kubofonista.net/blipalacz" done="1" target="_blank">BLIPalacza</a>';
		        		    	blipiz = '<li class="update status" id="update-blipi0"><div class="background-top"> </div><div class="container clearfix"><a class="author" href="http://blip.pl/users/blipi/dashboard"><img src="http://static3.blip.pl/user_generated/avatars/997106_pico.jpg"/></a><div class="content"><span class="nick"><a href="http://blip.pl/users/blipi/dashboard">blipi</a>:</span> '+blipizc+' </div> <div class="toolbar clearfix clearer"> <span class="clock"> <span style="" class="created-ago-calculated">Przed chwila</span> </span> <span class="transport">, przez <a target="_blank" href="http://kubofonista.net/blipalacz">BLIPalacz</a> & <a target="_blank" href="http://blipi.pl">BLIPI.PL</a></span> <span class="divider">  </span> <a onclick="window.BLIP.dashboardInput.respondTo(\'blipi\');; return false;" href="#" class="respond">odpowiedz</a> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">cytuj</span> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">link</span> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">usun</span></div></div><div class="background-bottom"></div> </li>'+beforebody;
		        		    	document.getElementById('dashboard-updates').innerHTML = blipiz;
		        		    	$('#dashboard-updates').fadeTo("slow", 1.0);
		        		    	$('#dashboard-loading').attr('style','visibility:hidden');
		        		    	return false;
		        		    	} else {
		        		    	blipizc = 'Ponizsze wyszukiwanie to magia <a href="http://blipi.pl/?referer=blipalacz" done="1" target="_blank">BLIPI.PL</a> w polaczeniu z <a href="http://kubofonista.net/blipalacz" done="1" target="_blank">BLIPalaczem</a><br />';
		        		    	blipiz = '<li class="update status" id="update-blipi0"><div class="background-top"> </div><div class="container clearfix"><a class="author" href="http://blip.pl/users/blipi/dashboard"><img src="http://static3.blip.pl/user_generated/avatars/997106_pico.jpg"/></a><div class="content"><span class="nick"><a href="http://blip.pl/users/blipi/dashboard">blipi</a>:</span> '+blipizc+' </div> <div class="toolbar clearfix clearer"> <span class="clock"> <span style="" class="created-ago-calculated">Przed chwila</span> </span> <span class="transport">, przez <a target="_blank" href="http://kubofonista.net/blipalacz">BLIPalacz</a> & <a target="_blank" href="http://blipi.pl">BLIPI.PL</a></span> <span class="divider">  </span> <a onclick="window.BLIP.dashboardInput.respondTo(\'blipi\');; return false;" href="#" class="respond">odpowiedz</a> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">cytuj</span> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">link</span> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">usun</span></div></div><div class="background-bottom"></div> </li>';
		        		    	}
		        		    	
		        		    	
		        		    	for (x in blipijson) {
		        		    		autor = blipijson[x]['user'].replace('/users/','');
		        		    		avatar = blipijson[x]['user_avatar'].replace('nano','pico');
		        		    		czas = blipijson[x]['create_date'].replace('-','/');
		        		    		czas = czas.replace('-','/');
		        		    		body = blipijson[x]['content'];
		        		    		body = body.replace(/http:\/\/([^\s]+)/g, '<a href="http://$1" title="http://$1" target="_blank">[$1]</a>');
		        		    		body = body.replace(/#([^\s]+)/g, '<a title="tag..." href="http://blip.pl/tags/$1">#$1</a>');
		        		    		body = body.replace(/\^([^\s]+)/g, '<a href="http://blip.pl/users/$1/dashboard">^$1</a>');
		        		    		blipiz = blipiz+'<li class="update status" id="update-blipi'+blipijson[x]['blipid']+'"><div class="background-top"> </div><div class="container clearfix"><a class="author" href="http://blip.pl/users/'+autor+'/dashboard"><img src="'+avatar+'"/></a><div class="content"><span class="nick"><a href="http://blip.pl/users/'+autor+'/dashboard">'+autor+'</a>:</span> '+body+' </div> <div class="toolbar clearfix clearer"> <span class="clock"> <span class="created-ago" style="display:none">'+czas+'</span><span style="" class="created-ago-calculated">'+czas+'</span> </span> <span class="transport">, przez <a target="_blank" href="http://kubofonista.net/blipalacz">BLIPalacz</a> & <a target="_blank" href="http://blipi.pl">BLIPI.PL</a></span> <span class="divider">  </span> <a onclick="window.BLIP.dashboardInput.respondTo(\''+autor+'\');; return false;" href="#" class="respond">odpowiedz</a> <span class="divider">&nbsp; | &nbsp;</span> <a onclick="window.BLIP.dashboardInput.quote(\'http://blip.pl/s/'+blipijson[x]['blipid']+'\');; return false;" href="#" class="quote">cytuj</a> <span class="divider">&nbsp; | &nbsp;</span> <a href="http://blip.pl/s/'+blipijson[x]['blipid']+'" class="permalink">link</a> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">usun</span></div></div><div class="background-bottom"></div> </li>';
		        		    	}
		        		    	
		        		    	blipizc = 'Chcesz zobaczyc wiecej statusow? <a done="1" href="http://blipi.pl/?q='+szukane+'&referer=blipalacz" title="http://blipi.pl/?q='+szukane+'&referer=blipalacz" target="_blank">Kliknij i przejdz na strone BLIPI &raquo;</a><br /><font size="1">Zobacz takze: <a href="http://stats.blipi.pl/?referer=blipalacz" target="_blank" done="1">Statystyki &raquo;</a> oraz <a href="http://top.blipi.pl/?referer=blipalacz" target="_blank" done="1">TOP100 BLIPowiczow &raquo;</a></font>';
		        		    	blipiz = blipiz+'<li class="update status" id="update-blipi00"><div class="background-top"> </div><div class="container clearfix"><a class="author" href="http://blip.pl/users/blipi/dashboard"><img src="http://static3.blip.pl/user_generated/avatars/997106_pico.jpg"/></a><div class="content"><span class="nick"><a href="http://blip.pl/users/blipi/dashboard">blipi</a>:</span> '+blipizc+' </div> <div class="toolbar clearfix clearer"> <span class="clock"> <span style="" class="created-ago-calculated">Przed chwila</span> </span> <span class="transport">, przez <a target="_blank" href="http://kubofonista.net/blipalacz">BLIPalacz</a> & <a target="_blank" href="http://blipi.pl">BLIPI.PL</a></span> <span class="divider">  </span> <a onclick="window.BLIP.dashboardInput.respondTo(\'blipi\');; return false;" href="#" class="respond">odpowiedz</a> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">cytuj</span> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">link</span> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">usun</span></div></div><div class="background-bottom"></div> </li>';
		        		    	
		        		    	$('#dashboard-loading').attr('style','visibility:hidden');
		        		    	$('#dashboard-updates').html(blipiz);
		        		    	$('#dashboard-updates').fadeTo("slow", 1.0);
		        		    	//document.getElementById('dashboard-updates').innerHTML = blipiz;
		        		    	Dopal(0);
								if(kolorowanietagow == 1) {colorTags(); }
		        		    	
		        		    }
		        		});

		        	 //window.open('http://blipi.pl/?q='+$("#blipi-search").val()+'&referer=blipalacz');
		        	 $("#blipi-search").val('');
		        	 $('#dashboard-updates').attr('style','display:block');
		        	 return false;
		         }
		     });	

	$('#menu').html($('#menu').html()+'<li><a href="#" id="top100">Top 100</a></li>');
	$("#top100").click(function (e) {
		$('#dashboard-loading').attr('style','visibility:visible');
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: 'http://api.blipi.pl/blipalacz/top100',
		    headers: {
		        'User-agent': 'BLIPalacz',
		    },
		    onload: function(responseDetails) {
		    	json = JSON.parse(responseDetails.responseText, function (key, value) {
		    	    var type;
		    	    if (value && typeof value === 'object') {
		    	        type = value.type;
		    	        if (typeof type === 'string' && typeof window[type] === 'function') {
		    	            return new (window[type])(value);
		    	        }
		    	    }
		    	    return value;
		    	});

				top = '';

				for (x in json) {
					osoba = json[x]['user'].replace('/users/','');
					rank = json[x]['rank'];
					trackedby = json[x]['trackedby'];
					
					top = top+rank+'. <a href="http://blip.pl/users/'+osoba+'/dashboard">^'+osoba+'</a> - '+trackedby+' obserwujacych <br />';
				}
					$('#dashboard-loading').attr('style','visibility:hidden');
		    		Message('TOP 100 osob na BLIPie: <br />'+top+'<br />Chcesz zobaczyc wiecej danych o rankingu? <a done="1" href="http://top.blipi.pl?referer=blipalacz" title="http://top.blipi.pl?referer=blipalacz" target="_blank">Kliknij i przejdz na strone BLIPI &raquo;</a>');
		    }
		});
		
	});
	}
	
	

function Dopal(iled) {
	if(document.location.href == 'http://blip.pl/bliposphere' || document.location.href == 'http://blip.pl' || document.location.href == 'http://www.blip.pl/bliposphere' || document.location.href == 'http://www.blip.pl') {
		if(bliposfera == 1 || bliposferacytat == 1) {
		licznik = $(".body").length;

		for(i=0;i<licznik;i++) {
		if($(".body")[i].innerHTML.indexOf('<br') == -1 && bliposfera == 1) {
		osoba = $(".status > a")[i].getAttribute("title");		
		$(".body")[i].innerHTML = '<b>'+osoba+':</b> '+$(".body")[i].innerHTML+'<br />';
		}
		title = $(".body > a")[i].getAttribute("title");
		href = $(".body > a")[i].innerHTML;
		if (bliposferacytat == 1 && href == '[blip]') {
		$(".body > a")[i].innerHTML = '{'+title+'} ';
		}
		}
		}
	} else {
	
		if(kontynuuj == 1) {	
			jQuery('span.respond').each(function(e, v){
				ob = $(v);
				nicks = ob.parent().parent().find('span.nick');
				pm = ob.parent().parent().find('span.private-mark');
				for(i=0; i<nicks.length; i++) {
					a = jQuery(nicks[i]).find('a');
						if (a.length == 2) {
						nick_dmpm = a.eq(1).text();
						if(pm.length == 1) {
							body = "<a onclick=\"window.BLIP.dashboardInput.respondTo('"+nick_dmpm+"',true);; return false;\" href=\"#\" class=\"respond\">kontynuuj</a>";
						} else {
							body = "<a onclick=\"window.BLIP.dashboardInput.respondTo('"+nick_dmpm+"',false);; return false;\" href=\"#\" class=\"respond\">kontynuuj</a>";
						}
						ob.replaceWith(body);
						}
				}
			});
		}
		

		if(linkinotice == 1) {
		
		if(iled == 0){ licznik3 = $(".content > .notice").length; } else { licznik3 = 2; }
		for(i=0;i<licznik3;i++) {
			if($(".content > .notice")[i].innerHTML.indexOf('Odpowiedz') == -1) {
			komu = $(".content > .notice")[i];
			komu = $(komu).find('a');
			
				cytat = komu[2];
				if(cytat == undefined) {
					cytat = komu[1];
				}
				
				if(cytat == undefined) {
					cytat = komu[0];
				}
			
						
			cytat = $(cytat).attr('href');

			if(cytat.indexOf('/s/') == -1 && cytat.indexOf('/dm/') == -1) {
				cytatwstaw = '';
			} else {
				cytatwstaw = ' | <a href="#" onclick="window.BLIP.dashboardInput.quote(\''+cytat+'\');; return false;">Cytuj</a>';
			}

			komu = komu[0].innerHTML.replace('^','');
			$(".content > .notice")[i].innerHTML =  $(".content > .notice")[i].innerHTML+'<div align="right" style="padding-right:20px; font-size:10px"><a href="#" onclick="window.BLIP.dashboardInput.respondTo(\''+komu+'\',false);; return false;">Odpowiedz</a>'+cytatwstaw+'</div>';
			}
		}
		}

	if(cytatykokpit == 1 || linkikokpit == 1) {
		
	if(iled==0){ licznik = $(".content > a").length; } else { licznik = 1; }
	for(i=0;i<licznik;i++) {
	
	if($(".content > a")[i].getAttribute("done") != 1) {
		
	title = $(".content > a")[i].getAttribute("title");
	href = $(".content > a")[i].innerHTML;
	if(cytujcytat == 1) {
	hreff = $(".content > a")[i].getAttribute("href");
	linkcytuj = '<div align="right" style="font-size:10px"><a href="#" onclick="window.BLIP.dashboardInput.quote(\''+hreff+'\');; return false;">Cytuj</a></div>';
	} else {
	linkcytuj = '';
	}
	
	if(href != '[blip]' && href != 's' && href.indexOf('^') == -1 && href.indexOf('#') == -1 && linkikokpit == 1) {
		if($(".content > a")[i].innerHTML == '[3600.pl]' && trzyszesc == 1) {
			var y = i;
    		GM_xmlhttpRequest({
    		    method: 'GET',
    		    url: title+'/json',
    		    headers: {
    		        'User-agent': 'BLIPalacz',
    		        'Accept': 'application/atom+xml,application/xml,text/xml',
    		    },
    		    onload: function(responseDetails) {
    		    	
    		    	trzyson = JSON.parse(responseDetails.responseText, function (key, value) {
    		    	    var type;
    		    	    if (value && typeof value === 'object') {
    		    	        type = value.type;
    		    	        if (typeof type === 'string' && typeof window[type] === 'function') {
    		    	            return new (window[type])(value);
    		    	        }
    		    	    }
    		    	    return value;
    		    	});
    		    	

    		    	if(trzyson == '') {
    		    		$(".content > a")[i].innerHTML = title+' (blad komunikacji z 3600.pl)';
    		    	}  else {
    		    		zwrotekc = trzyson['content'];
    	        		$(".content > a")[y].innerHTML = '<br /><br /><b>3600.pl &raquo;</b> '+trzyson['content'];
    	        		$(".content > a")[y].setAttribute('style','color:black !important; text-decoration: none !important');
    	        		$(".content > a")[y].setAttribute('done','1');
    		    	}
    		    	trzyson = '';
		}    
    		});
			    			
			//$(".content > a")[i].innerHTML = title;
		} else {
			$(".content > a")[i].innerHTML = title;
		}
	}
	
	if (href == '[blip]' && cytatykokpit == 1) {
	$(".content > a")[i].innerHTML = '<br /><div style="background-color:#EEEEEE; border:2px dashed #C0C0C0; font-size:10pt; line-height:10pt; padding:5px;"><a href="'+hreff+'" target="_blank">'+title+'</a>'+linkcytuj+'</div>';
	}

	$(".content > a")[i].setAttribute("done",1);
	
	}
	
	}
	
	if(iled==0){licznik2 = $(".notice > a").length; } else { iled = 1; }

	for(i=0;i<licznik2;i++) {
	title = $(".notice > a")[i].getAttribute("title");
	hrefn = $(".notice > a")[i].getAttribute("href");
	href = $(".notice > a")[i].innerHTML;
	if (href == '[blip]') {
	$(".notice > a")[i].innerHTML = '<br /><div style="background-color:#EEEEEE; border:2px dashed #C0C0C0; font-size:10pt; line-height:10pt; padding:5px; width:475px"><a href="'+hrefn+'" target="_blank">'+title+'</a></div>';
	}
	
	
	}
	
	
	}
	
	if(komunikatory == 1) {
	
	if(iled==0){licznik3 = $(".content").length;} else { licznik3 = 0;}

	for(i=0;i<licznik3;i++) {
	if($(".content")[i].getAttribute('done') == 1) {
		// nothing
	} else {
		$(".content")[i].innerHTML = $(".content")[i].innerHTML.replace(/gg:([0-9]+)/, '<a href="gg://$1" title="Gadu-Gadu" done="1"><img style="border: none; vertical-align: top;" src="http://www.gadu-gadu.pl/users/status.asp?id=$1&styl=1" border="0">$1</a>');
		$(".content")[i].setAttribute('done',1);
	}
	}
	}
	
	if(blipi == 1 || plonk == 1) {
		container = $(".container");
		if(iled==0){licznik = container.length; } else { licznik = 1; }
		
		for(i=0;i<licznik;i++) {
			cont = $(".container > .toolbar")[i].innerHTML;
			autor = $(".container > .author")[i];
			
			if(autor == undefined) { } else {
				autor = autor.getAttribute("href").replace('http://blip.pl/users/','').replace('/dashboard','');
			}
			
			/*if (dev == 1) {
			if (autor === 't') {
			//	i = i+1;
				$(".container > .content")[i].setAttribute('style','border: solid 2px #bcbcbc;');
				//$(".container > .private-recipient")[i][1].innerHTML = '';
				x = $(".container > .content")[i].innerHTML.split(':');
				nicktwitt = x[3].replace('</span>','');
				$(".container > .content")[i].innerHTML = '<span class="private-mark nick"><a href="http://twitter.com/'+nicktwitt+'">'+nicktwitt+'</a></span><span class="private-mark-end">:</span> '+x[4];	
			}
			}*/
			
			/*pm = $(".container > .content")[i];
			pm = $(pm).find(".private-mark");
			if(pm == undefined) {
				// do nothing
			} else {
			permalink = $(".container > .toolbar")[i];
			permalink = $(permalink).find(".permalink").getAttribute("href");
			quote = $(".container > .toolbar > .quote")[i].innerHTML = '</span> <a class="quote" href="'+permalink+'" title="">cytuj</a>';
			}*/
			if(cont.indexOf('stats') == -1 && blipi == 1) {
				if(autor == undefined) {} else {
				$(".container > .toolbar")[i].innerHTML = $(".container > .toolbar")[i].innerHTML + '<span class="divider">&nbsp; | &nbsp;</span> <a class="respond" href="http://stats.blipi.pl/'+autor+'" target="_blank">stats</a>';
				//$(".container > .toolbar")[i].append('<span class="divider">&nbsp; | &nbsp;</span> <a class="respond" href="http://stats.blipi.pl/'+autor+'" target="_blank">Stats</a>');
				}
				}
			
			if(cont.indexOf('plonk') == -1 && plonk == 1) {
				if(autor == undefined || autor == zalogowany) {} else {		
				$(".container > .toolbar")[i].innerHTML = $(".container > .toolbar")[i].innerHTML + '<span class="divider">&nbsp; | &nbsp;</span> <a class="respond" onclick="var x = confirm(\'Czy napewno chcesz dodac '+autor+' do ignorowanych? \'); if(x == true) { var f = document.createElement(\'form\'); f.style.display = \'none\'; this.parentNode.appendChild(f); f.method = \'POST\'; f.action = this.href;var m = document.createElement(\'input\'); m.setAttribute(\'type\', \'hidden\'); m.setAttribute(\'name\', \'_method\'); m.setAttribute(\'value\', \'put\'); f.appendChild(m);var s = document.createElement(\'input\'); s.setAttribute(\'type\', \'hidden\'); s.setAttribute(\'name\', \'authenticity_token\'); s.setAttribute(\'value\', \''+token+'\'); f.appendChild(s);f.submit(); } return false;" id="ignore" href="/users/'+autor+'/ignore"><font style="font-size:7px;">plonk</font></a>';	
				}
				}
			
			}
		}
	
	
	// ROZSZERZONY WIDOK ODWIEDZAJACYCH - WYLACZONY //
	
	/*odwiedzajacy = $(".active-user-avatar").length;
	$("#active-users > li").attr('style','padding-right: 38px; height:100px !important; float: right !important')
	for(i=0;i<odwiedzajacy;i++) {
		if($(".active-user-avatar")[i].innerHTML.indexOf('<center') == -1) {
		title = $(".active-user-avatar")[i].getAttribute("title");
		href = $(".active-user-avatar")[i].innerHTML;
		$(".active-user-avatar")[i].innerHTML = '<center>'+href+''+title+'</center>';
		}
		}*/
	
	// EOF ROZSZERZONY WIDOK ODWIEDZAJACYCH - WYLACZONY //
	}	
}
// ############## EOF BLIPALACZ ENGINE CODE ############## //

// FUNKCJE GLOWNE //
function $$(xpath,root) { 
	  xpath = xpath
	    .replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
	    .replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
	    .replace(/#([\w-]+)/g, '[@id="$1"]')
	    .replace(/\/\[/g,'/*[');
	  str = '(@\\w+|"[^"]*"|\'[^\']*\')';
	  xpath = xpath
	    .replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
	    .replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
	    .replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
	  var got = document.evaluate(xpath, root||document, null, 5, null), result=[];
	  while (next = got.iterateNext())
	    result.push(next);
	  return result;
	 }

	function createElement(type, attributes){
	 var node = document.createElement(type);
	 for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
	  node.setAttribute(attr, attributes[attr]);
	 }
	 return node;
	}



	function count_online() {

	    active = $$('a.active')[0]
	    if (active && active.href.indexOf('#recommended') >= 0) {
	        active = $$('a.active')[1]
	    }
	    if (!active || active.href.indexOf('#observing-tab') >= 0) {
	        $$('#online_counter')[0].innerHTML = 'Online: ' + $$('.tracking-user-avatar-active').length + ' z ' + $$('.tracking-user-avatar').length
	    } else if (active.href.indexOf('#observed-tab') >= 0) {
	        $$('#online_counter')[0].innerHTML = 'Online: ' + $$('.tracked-user-avatar-active').length + ' z ' + $$('.tracked-user-avatar').length
	    }
	    else {
	        $$('#online_counter')[0].innerHTML = ''
	    }
	    
	    setTimeout(count_online, 3000)
	}

var fgColors = {};
var bgColors = {};
function computeBgColor(title) {
	function djb2hash(hashstring) {
		var i, hashvalue = 1742;
		for (i = 0; i < hashstring.length; i++) {
			var ascii_code = hashstring.charCodeAt(i);
			hashvalue = ((hashvalue << 2) + (hashvalue << 5)) + ascii_code%32;
		}
		return hashvalue;
	};

	// Compute a hash of the hostname, and clamp it to the 0-360 range allowed for the hue.
	var hash = djb2hash(title);
	var hue = hash % 360;

	fgColors[title] = {hue: hue, sat: 50 + (hash % 50)};
	return {hue: hue, sat: 50 + (hash % 50)};
}

function computeFgColor(title) {
	function djb2hash(hashstring) {
		var i, hashvalue = 59981;
		for (i = 0; i < hashstring.length; i++) {
			var ascii_code = hashstring.charCodeAt(i);
			hashvalue = ((hashvalue << 2) + (hashvalue < 5)) + ascii_code%32;
		}
		return hashvalue;
	};

	// Compute a hash of the hostname, and clamp it to the 0-360 range allowed for the hue.
	var hash = djb2hash(title);
	var hue = hash % 360;

	fgColors[title] = {hue: hue, sat: hash % 50};		
	return {hue: hue, sat: hash % 50};
}

function colorTags () {
	var tags = document.evaluate("//a[contains(@href, 'blip.pl/tags/') and not(contains(@class, 'tagged')) and not(contains(@class, 'g')) and not(contains(@id, 'tagcloud-content'))]", document, null, 6, null);
	var tag, _i=0;
	while (tag = tags.snapshotItem(_i++)) {
		var tagName = tag.href.substr(tag.href.indexOf("/tags/")+6);
		var bgColor = bgColors[tagName]?bgColors[tagName]:computeBgColor(tagName);
		var fgColor = fgColors[tagName]?fgColors[tagName]:computeFgColor(tagName);
		var bgColorStyle = "hsl(" + bgColor.hue + ", "+bgColor.sat+"%, 80%)"
		var fgColorStyle = "color: hsl(" + (fgColor.hue) + ", 66%, 33%) !important;"
		
		var newTag = tag.cloneNode(true);
		newTag.className = "tagged";
		newTag.setAttribute("style", fgColorStyle);

		var spanInnerTag = document.createElement("span");
		spanInnerTag.className = "innerTag";
		spanInnerTag.style.background = bgColorStyle;
		spanInnerTag.style.borderColor = bgColorStyle
		spanInnerTag.appendChild(newTag);
		
		var spanTag = document.createElement("span");
		spanTag.className = "tag";
		spanTag.style.background = bgColorStyle
		spanTag.style.borderColor = bgColorStyle
		spanTag.appendChild(spanInnerTag);

		tag.parentNode.replaceChild(spanTag, tag);
	}
}

function UruchomLCounter() {
	element = document.createElement('center')
	header = createElement('h4', {id: 'online_counter'})
	element.appendChild(header)

	tab = $$('#observed-tab')[0]
	if (!tab) {
	    tab = $$('#observing-tab')[0]    
	}
	tab.parentNode.insertBefore(element, tab)

	count_online()
	}

zrobione = 0;
zrobiones = 0;

function Message(content) {
	autor = 'blipalacz';
	avatar='http://static1.blip.pl/user_generated/avatars/724691_pico.jpg';
	beforebody = document.getElementById('dashboard-updates').innerHTML;
	blipiz = '<li class="update status" id="update-blipalacz"><div class="background-top"> </div><div class="container clearfix"><a class="author" id="ba" href="http://blip.pl/users/'+autor+'/dashboard"><img src="'+avatar+'"/></a><div class="content" id="bt"><span class="nick"><a href="http://blip.pl/users/'+autor+'/dashboard">'+autor+'</a>:</span> '+content+' </div> <div class="toolbar clearfix clearer"> <span class="clock"> <span style="" class="created-ago-calculated">Przed chwila</span> </span> <span class="transport">, przez <a target="_blank" href="http://kubofonista.net/blipalacz">BLIPalacz</a></span> <span class="divider">  </span> <a onclick="window.BLIP.dashboardInput.respondTo(\''+autor+'\');; return false;" href="#" class="respond">odpowiedz</a> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">cytuj</span> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">link</span> <span class="divider">&nbsp; | &nbsp;</span> <span class="close">usun</span></div></div><div class="background-bottom"></div> </li>'+beforebody;
	document.getElementById('dashboard-updates').innerHTML = blipiz;
}

function CounterRefresh() {
	cpw = $('#onlinecounter').attr('src');
	$('#onlinecounter').attr('src',cpw+'?');
}

function BindujZmiane(dodatek) {
	$("#blipalacz-active-"+dodatek).click(function() { GM_setValue(dodatek,1) });
	$("#blipalacz-deactive-"+dodatek).click(function() { GM_setValue(dodatek,0) });
}

function BindujZmianeAlert(dodatek,tresc,tresc2) {
	$("#blipalacz-active-"+dodatek).click(function() { GM_setValue(dodatek,1); alert(tresc); });
	$("#blipalacz-deactive-"+dodatek).click(function() { GM_setValue(dodatek,0); alert(tresc2); });
}

$(document).ready(function() {

	GM_addStyle(".tag { border-width:1px 0; margin:0 1px; padding:0; white-space:nowrap; }" +
			".innerTag { border-width:0 1px; margin:0 -1px; }"+
			".tag, .innerTag { border-style:solid; font-weight:normal; }"+
			".content .tag { white-space:nowrap; }"+
			"div#content ul#dashboard-updates li.update div.container div.toolbar span.transport{width: 140px !important;} ");
	
	var css = "div[style=\"background-color: rgb(238, 238, 238); border: 2px dashed rgb(192, 192, 192); font-size: 10pt; line-height: 10pt; padding: 5px;\"] {\n      border: 1px solid lightgray !important;\n      margin-right: 2px !important;\n      margin-bottom: 5px !important; \n  }\n  div[style=\"background-color: rgb(238, 238, 238); border: 2px dashed rgb(192, 192, 192); font-size: 10pt; line-height: 10pt; padding: 5px;\"] > div{\n      background: #EFEFEF url(http://static1.blip.pl/images/status-toolbar.png) top left repeat-x !important;\n      margin: -5px !important;\n      margin-top: 5px !important;\n      padding: 2px 5px 2px 2px !important;\n      opacity: 0.5 !important;\n  }\n  div[style=\"background-color: rgb(238, 238, 238); border: 2px dashed rgb(192, 192, 192); font-size: 10pt; line-height: 10pt; padding: 5px;\"] > div > a {\n      text-transform: lowercase !important;\n      color: black !important;\n  }\n  div.photo, div.audio, div.video {\n      border: none !important;\n  }\n  div.notice > div {\n      border: 1px solid lightgray !important;\n      border-bottom: none !important;\n  }\n  div.notice > div[style=\"padding-right: 20px; font-size: 10px;\"] {\n      background: white url(http://static1.blip.pl/images/status-toolbar.png) top left repeat-x !important;\n      border-top: none !important;\n      margin-right: 20px !important;\n      opacity: 0.5 !important;\n      color: black !important;\n      padding: 1px 5px 0 0 !important;\n      border-color: #A7A7A7 !important;\n      border-bottom: 1px solid #A7A7A7 !important;\n      margin-bottom: 2px !important; \n  }\n  div.notice > div[style=\"padding-right: 20px; font-size: 10px;\"] > a {\n      color: black !important;\n      text-transform: lowercase !important;\n  }";
	
	//GM_addStyle("div[style=\"border: 2px dashed rgb(192, 192, 192); padding: 5px; background-color: rgb(238, 238, 238); font-size: 10pt; line-height: 10pt;\"] {\n      border: 1px solid lightgray !important;\n      margin-right: 2px !important;\n      margin-bottom: 5px !important; \n  }\n  div[style=\"border: 2px dashed rgb(192, 192, 192); padding: 5px; background-color: rgb(238, 238, 238); font-size: 10pt; line-height: 10pt;\"] > div{\n      background: #EFEFEF url(http://static1.blip.pl/images/status-toolbar.png) top left repeat-x !important;\n      margin: -5px !important;\n      margin-top: 5px !important;\n      padding: 2px 5px 2px 2px !important;\n      opacity: 0.5 !important;\n  }\n  div[style=\"border: 2px dashed rgb(192, 192, 192); padding: 5px; background-color: rgb(238, 238, 238); font-size: 10pt; line-height: 10pt;\"] > div > a {\n      text-transform: lowercase !important;\n      color: black !important;\n  }\n  div.photo, div.audio, div.video {\n      border: none !important;\n  }\n  div.notice > div {\n      border: 1px solid lightgray !important;\n      border-bottom: none !important;\n  }\n  div.notice > div[style=\"padding-right: 20px; font-size: 10px;\"] {\n      background: white url(http://static1.blip.pl/images/status-toolbar.png) top left repeat-x !important;\n      border-top: none !important;\n      margin-right: 20px !important;\n      opacity: 0.5 !important;\n      color: black !important;\n      padding: 1px 5px 0 0 !important;\n      border-color: #A7A7A7 !important;\n      border-bottom: 1px solid #A7A7A7 !important;\n      margin-bottom: 2px !important; \n  }\n  div.notice > div[style=\"padding-right: 20px; font-size: 10px;\"] > a {\n      color: black !important;\n      text-transform: lowercase !important;\n  }");

	if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
	
	/* // PRIMA APRILLIS //
	var data = new Date();
	var m = data.getMonth();
	var d = data.getDate();
	var y = data.getFullYear();
	
	if (prima == 1 && (d == '1' && m == '3' && y == '2010')) {
		GM_addStyle(".content { -webkit-transform: rotate(-180deg); -moz-transform: rotate(-180deg); -o-transform: rotate(-180deg); } .tracked-user-avatar { -webkit-transform: rotate(-180deg); -moz-transform: rotate(-180deg); -o-transform: rotate(-180deg); position:absolute; display:block } .author { -webkit-transform: rotate(-180deg); -moz-transform: rotate(-180deg); -o-transform: rotate(-180deg); } #bt { -webkit-transform: rotate(-0deg); -moz-transform: rotate(-0deg); -o-transform: rotate(-0deg); } #ba { -webkit-transform: rotate(-0deg); -moz-transform: rotate(-0deg); -o-transform: rotate(-0deg); }");
		Message('Blip sie popsul? Wyswietla tresc do gory nogami? Nie... To nie awaria. To BLIPalaczowy zart Prima Aprillisowy :) Fajny nie?<br /> <br /> Przy okazji zycze Wam wesolego jajka :) / <a href="http://blip.pl/users/kubofonista/dashboard">^Kubofonista</a><br /><br /><i>No juz dobrze, wiadomo - kazdy zart sie kiedys znudzi. Kliknij <a href="http://blip.pl/dashboard?blipalacz=stopprima">tutaj</a> aby przywrocic wszystko do normy, zostanie tylko revers avatarow :)</i>');
	} else if (prima == 0 && (d == '1' && m == '3' && y == '2010')) {
		GM_addStyle(".author { -webkit-transform: rotate(-180deg); -moz-transform: rotate(-180deg); -o-transform: rotate(-180deg); }");
	}
	
	// EoF PRIMA APRILLIS
	*/
	
if(document.location.href.match('http://blip.pl/updates/search?q=')) {
Paginacja();
} else {
	
function Zapal() {
if(kolorowanietagow == 1) { colorTags(); }
Dopal(0);
}

function Paginacja() {
if(document.getElementById('page-number').innerHTML == '?') { setTimeout(Paginacja,1000); } else { Zapal(); }
}

var fp = unsafeWindow.BLIP.Pages.firstPage;
unsafeWindow.BLIP.Pages.firstPage = function(a,b){
fp(a,b);
document.getElementById('page-number').innerHTML = '?';
Paginacja();
} 

var p = unsafeWindow.BLIP.Pages.nextPage;
unsafeWindow.BLIP.Pages.nextPage = function(a,b){
p(a,b);
document.getElementById('page-number').innerHTML = '?';
Paginacja();
} 

var pp = unsafeWindow.BLIP.Pages.previousPage;
unsafeWindow.BLIP.Pages.previousPage = function(a,b){
pp(a,b);
document.getElementById('page-number').innerHTML = '?';
Paginacja();
} 
	
var o = unsafeWindow.Element.insert;
unsafeWindow.Element.insert = function(a,b){
o(a,b);
if(document.getElementById('page-number') == undefined) { Zapal(); } else {
if(document.getElementById('page-number').innerHTML == 1) { Zapal(); }
}
} 


if(countero == 1 && (adres.match('http://blip.pl/users/') || adres.match('http://blip.pl/tags/') || adres.match('http://blip.pl/dashboard') )) {
UruchomLCounter();
}

Zapal();


setInterval(CounterRefresh,60000);
}
});



/* KOMPLETNIE SIE Z TEGO WYCOFUJE NA WASZE ZYCZENIE !!! 
if(document.getElementById('tracked-user-77810') == undefined && (document.location.href == 'http://blip.pl/dashboard' || document.location.href == 'http://blip.pl/dashboard?dev')) {
	Message('Nie obserwujesz <a href="http://blip.pl/users/blipalacz/dashboard">^blipalacz</a>.a. Nie bedziesz otrzymywac waznych informacji na kokpit. Zapraszam do obserwownia :)');	
}
*/

// -----------------------------------------------------------------
// Greasemonkey/GreaseKit compatibility
// -----------------------------------------------------------------

if (typeof(unsafeWindow) === 'undefined') {
 unsafeWindow = window;
}

// -----------------------------------------------------------------
// jQuery
// -----------------------------------------------------------------

var script = document.createElement('script');
script.src = 'http://userscripts.org/scripts/source/67066.user.js';
script.type = 'text/javascript';
script.addEventListener("load", function() {
  unsafeWindow.jQuery.noConflict();
  jQueryIsReady(unsafeWindow.jQuery);
}, false);
document.getElementsByTagName('head')[0].appendChild(script);
