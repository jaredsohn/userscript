// ==UserScript==
// @name		FootballTeam
// @version		v1.0.9.0
// @author		NeissPL
// @description	Autoklikacz wersja na FF 4.0.
// @include		http://*.footballteam.pl/*
// ==/UserScript==
function SetCookie(cookieName,cookieValue,nDays){
	var today = new Date();
	var expire = new Date();
	if (nDays==null || nDays==0) nDays=1;
	expire.setTime(today.getTime() + 3600000*24*nDays);
	document.cookie = cookieName+"="+escape(cookieValue)+";expires="+expire.toGMTString();
 }
function ReadCookie(cookieName){
	var theCookie=""+document.cookie;
	var ind=theCookie.indexOf(cookieName);
	if (ind==-1 || cookieName=="") return ""; 
	var ind1=theCookie.indexOf(';',ind);
	if (ind1==-1) ind1=theCookie.length; 
	return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
 }
function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)){
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}
{	var euro = document.getElementById('top').getElementsByTagName('td')[3].innerHTML;
		euro = euro.substring(6,euro.length);
		for (var i in euro) euro = euro.replace('.','');
	var euro_bank = Math.floor(euro * 0.02);
		euro_bank = euro_bank.toString();
		document.getElementById('top').getElementsByTagName('td')[3].innerHTML = addCommas(euro) + "<br><font size='1px'>" + addCommas(euro_bank) +'</font>';
	var akcje = document.getElementById('top').getElementsByTagName('td')[5].innerHTML;
		akcje = akcje.substring(7,akcje.length-4);
	var um = document.getElementById('top').getElementsByTagName('td')[7].innerHTML;
		um = um.substring(4,um.length);
		for (var i in um) um = um.replace(".","");
	var forma = document.getElementById('top').getElementsByTagName('td')[9].innerHTML;
		forma = forma.substring(7,forma.length-1);
	var zm = document.getElementById('top').getElementsByTagName('td')[11].innerHTML;
		zm = parseInt(zm.substring(4,zm.length-1));
		if(akcje==0) SetCookie('FootballTeam','00',1);
}
function Trenuj(ile,co){
	if(window.location.pathname == "/training.php"){
		if(ReadCookie('Linki')){
			var link = ReadCookie('Linki').split("'")[co];
			var stop=0;
			if(document.getElementById("ile_1").value>0) stop +=1;
			if(document.getElementById("ile_2").value>0) stop +=1;
			if(ile>0 && stop<2){
				window.location.pathname = "/training.php"+link;
				
				SetCookie('FootballTeam',(ile-1)+co);
			}
		}
		if(zm>=40){
			var redukuj = document.createElement('iframe');
				redukuj.setAttribute('style','position:absolute;left:0;top:0;display:none;');
				redukuj.setAttribute('src','home.php?v=rest');
			document.getElementById('tresc').appendChild(redukuj);
			window.setTimeout('window.location.pathname="/training.php";',500);
			}
		if(zm>0 && akcje==0 && euro>0){
			var redukuj = document.createElement('iframe');
				redukuj.setAttribute('style','position:absolute;left:0;top:0;display:none;');
				redukuj.setAttribute('src','home.php?v=rest');
			document.getElementById('tresc').appendChild(redukuj);
			window.setTimeout('window.location.pathname="/training.php";',500);
		}
		if(akcje==0 && euro>0){
			SetCookie('wplac',true);
			var wplac = document.createElement('iframe');
				wplac.setAttribute('style','position:absolute;left:0;top:0;display:none;');
				wplac.setAttribute('src','bank.php');
			document.getElementById('tresc').appendChild(wplac);
			window.setTimeout('window.location.pathname="/training.php";',2000);
		}
		if(akcje>0 && euro==0){
			SetCookie('wyplac',true);
			var wyplac = document.createElement('iframe');
				wyplac.setAttribute('style','position:absolute;left:0;top:0;display:none;');
				wyplac.setAttribute('src','bank.php');				
			document.getElementById('tresc').appendChild(wyplac);
			window.setTimeout('window.location.pathname="/training.php";',2000);
		}
	}
}
function Dodaj_Opcje(ile, co){
	if (window.location.pathname == "/training.php"){
		var ukryj_trening = "";
		var tab_ukrywanie ="";
		document.getElementById('right').removeChild(document.getElementById('info'));
		document.getElementById('tresc').removeChild(document.getElementById('get_rule'));
		document.getElementById('tresc').removeChild(document.getElementById('box_info'));
		
		document.getElementById("tresc").getElementsByTagName("img")[0].parentNode.innerHTML="Trenujesz aktualnie:";
		
		var linki="";
		var td = document.getElementById("tra").getElementsByTagName("td");
		for(i in td){
			if(i<=9)
				if(td[i].getAttribute("onclick") != null){
					linki += "?"+td[i].getAttribute("onclick").split("?")[1];
					td[i].removeAttribute("onclick");
				}
				var wytrenuj=0;
				if(i == co) wytrenuj = ile;
				if(tab_ukrywanie[i*2]=='1') td[i].setAttribute('style','display:none;');
				td[i].innerHTML += "<br><input type='text' size='2' maxlength='4' id='tre"+i+"' value='"+wytrenuj+"'> <input type='button' value='Trenuj' onclick='document.cookie=\"FootballTeam=\"+document.getElementById(\"tre"+i+"\").value+"+i+";window.location.reload();'>";							
		}
		SetCookie('Linki',linki,0);
	}
	if (window.location.pathname == "/start.php"){
		var czas = document.getElementById('tresc').getElementsByTagName('td')[0].getElementsByTagName('td')[1];
		var sczas = czas.innerHTML.split(' ');
		var czass = document.getElementById('witaj').childNodes[1].childNodes[0].childNodes[1].innerHTML.split(':');
		var home = document.getElementById('tresc').getElementsByTagName('td')[0].getElementsByTagName('td')[0].innerHTML;
		var away = document.getElementById('tresc').getElementsByTagName('td')[0].getElementsByTagName('td')[2].innerHTML;
		sczas= sczas[0];
		var pokaz ="";
		var godz = Math.floor(sczas/60);
		var min = sczas - godz * 60;
		var teraz = new Date();
		var H = parseInt(czass[2],10)+godz;
		var M = parseInt(czass[3],10)+min+1;
		if(H>24) H-=24;
		if(M>=60){M-=60;H++;}
		if(M<=9) M='0'+M;
		if(H<=9) H='0'+H;
		if (godz<10) godz  = "0" + godz;
		if (min<10) min = "0" + min;
		pokaz = "Do meczu: <b>"+godz + ":" + min+"</b>";
		var kiedy= "<br>Mecz o<font color='black'>___</font>: "+H+":"+M+"";
		document.getElementById('tresc').getElementsByTagName('td')[0].setAttribute('align','center');
		document.getElementById('tresc').getElementsByTagName('td')[0].innerHTML = home+'<br>'+pokaz+kiedy+'<br>'+away;
	}
	if (window.location.pathname == "/pm.php"){
		if(window.location.search.split("&")[0].length>0){			
			document.getElementById("site").removeChild(document.getElementById("tlo"));
			document.getElementById("site").removeChild(document.getElementById("top"));
			document.getElementById("site").removeChild(document.getElementById("left"));
			document.getElementById("right").removeChild(document.getElementById("info"));
			document.getElementById("tresc").removeChild(document.getElementById("get_rule"));
			document.getElementById("tresc").removeChild(document.getElementById("box_info"));
			document.getElementById("right").setAttribute("style","position:absolute;width:99%;left:-5px;top:-10px;padding:0px;");			
			document.getElementById("tresc").removeChild(document.getElementById("tresc").childNodes[3]);
			document.getElementById("tresc").removeChild(document.getElementById("pogoda"));
			document.getElementById("skin").parentNode.removeChild(document.getElementById("skin"));
			//GM_log(document.getElementsByTagName('table')[0].getElementsByTagName("a")[1].parentNode.parentNode.getElementsByTagName("td")[3].innerHTML == "Raport z treningu");
			if(document.getElementById("tresc").getElementsByTagName('div')[0].getElementsByTagName('div')[0]){
				document.getElementById("tresc").getElementsByTagName('div')[0].getElementsByTagName('div')[0].setAttribute('style','position:relative;width:99%;left:-5px;padding:0px;');
				document.innerHTML=document.getElementById("tresc").getElementsByTagName('div')[0].innerHTML+"<br>"+
				document.getElementById("tresc").getElementsByTagName('div')[2].innerHTML;
			}
		} else {
			document.getElementById("tresc").innerHTML="<div class='title'>WIADOMOŚCI</div><div class='text'>"+
			"||<a href='?SelectModule=MyMessages' target='ramka'>Odbierz</a>||<a href='?SelectModule=CreateNewMessage' target='ramka'>Napisz</a>||<a href='?SelectModule=SendMessages' target='ramka'>Wysłane</a>||<a href='?SelectModule=SavedMessages' target='ramka'>Zapisane</a>||<a href='?SelectModule=ShowBanList' target='ramka'>Zablokowani</a>||</div>"+
			"<div class='text'><iframe id='ramka' name='ramka' src='?SelectModule=MyMessages' style='overflow-x:hidden;' width='100%' height='500px' frameborder='0'></iframe></div>"; //height='500px'
			//document.getElementById("tresc").innerHTML += "<div src='?SelectModule=CreateNewMessage'></div>";
		}
	}
	if (window.location.pathname == "/pojedynek.php"){
		var walcz = window.location.search.split("&");
		if (walcz[0] == "?step=wiffajt"){
			document.getElementById('tresc').removeChild(document.getElementById('get_rule'));
			document.getElementById('tresc').removeChild(document.getElementById('box_info'));
			document.getElementById('tresc').removeChild(document.getElementById('tresc').getElementsByTagName('div')[1]);
			if(document.getElementById('tresc').getElementsByTagName('div')[2].getElementsByTagName('table')[0]){
				document.getElementById('tresc').getElementsByTagName('div')[2].getElementsByTagName('table')[0].innerHTML='';
				document.getElementById('tresc').getElementsByTagName('div')[2].getElementsByTagName('table')[1].innerHTML='';
				document.getElementById('tresc').getElementsByTagName('div')[2].getElementsByTagName('p')[0].setAttribute('align','center');
				document.getElementById('tresc').getElementsByTagName('div')[2].getElementsByTagName('p')[1].setAttribute('align','center');
			}
			if(document.getElementById('pasus')){
				document.getElementById('tresc').removeChild(document.getElementById('tresc').getElementsByTagName('div')[2]);
				
				document.getElementById('tresc').getElementsByTagName('div')[2].innerHTML = 
					"<div class='mini'>"+document.getElementById('tresc').getElementsByTagName('div')[2].getElementsByTagName('div')[0].innerHTML+"</div>"+
					document.getElementById('tresc').getElementsByTagName('div')[2].getElementsByTagName('b')[0].innerHTML+"<br>"+
					document.getElementById('tresc').getElementsByTagName('div')[2].getElementsByTagName('p')[0].innerHTML+"<br><br>"+
					"<div class='mini'>"+document.getElementById('tresc').getElementsByTagName('div')[2].getElementsByTagName('div')[4].innerHTML+"</div>"+
					document.getElementById('tresc').getElementsByTagName('div')[2].getElementsByTagName('b')[1].innerHTML+"<br>"+
					document.getElementById('tresc').getElementsByTagName('div')[2].getElementsByTagName('p')[1].innerHTML;
			}
			
		}
	}
	if (window.location.pathname == "/match.php"){
		document.getElementById('tresc').removeChild(document.getElementById('get_rule'));
		document.getElementById('tresc').removeChild(document.getElementById('box_info'));
		document.getElementById('tresc').removeChild(document.getElementById('tresc').getElementsByTagName('div')[1]);
		setTimeout("window.location.reload()",30000);
	}
	if (window.location.pathname == "/bet.php"){
		if(window.location.search=='?SelectModule=ShowActiveBets'){
			document.getElementById('tresc').removeChild(document.getElementById('get_rule'));
			document.getElementById('tresc').removeChild(document.getElementById('box_info'));
			var tr = document.getElementById('tresc').getElementsByTagName('div')[1].getElementsByTagName('tr');
			for(i in tr){				
				if(i>0){
					var td = tr[i].getElementsByTagName('td')[3].getElementsByTagName('a')[0];
					tr[i].getElementsByTagName('td')[3].getElementsByTagName('a')[0].setAttribute('onmouseover','if(this.innerHTML.length<=7)this.innerHTML+="<br><iframe src=\''+td+'\' style=\'overflow-x:hidden;\' width=\'70px\' height=\'30px\' frameborder=\'0\'></iframe>"');
				}
			}
		}
		if(window.location.search.split('&')[0]=='?SelectModule=BetDetail'){
			document.getElementById('top_bg').parentNode.removeChild(document.getElementById('top_bg'));
			document.getElementById('foot_bg').parentNode.removeChild(document.getElementById('foot_bg'));
			document.getElementById('skin').parentNode.removeChild(document.getElementById('skin'));
			var tr = document.getElementById('tresc').getElementsByTagName('table')[0].getElementsByTagName('tr')[1];
			var newdiv = document.createElement('div');
				newdiv.setAttribute('class','text');
				newdiv.setAttribute('style','position:absolute;left:-10px;top:0;width:70px;');
				newdiv.innerHTML = tr.innerHTML;
			document.getElementById('tresc').appendChild(newdiv);
		}	
	}
	if (window.location.pathname == "/bank.php"){
		if(ReadCookie('wplac')){
			var wplac=ReadCookie('wplac');
			if(wplac=='true'){
				document.forms[0].submit();
				SetCookie('wplac',false,0);
			}
		}
		if(ReadCookie('wyplac')){
			var wplac=ReadCookie('wyplac');
			if(wyplac=='true'){
				document.forms[1].submit();
				SetCookie('wyplac',false,0);
			}
		}
	}
	if (window.location.pathname == "/town.php"){
			document.getElementById("tresc").removeChild(document.getElementById("get_rule"));
			document.getElementById("tresc").removeChild(document.getElementById("box_info"));
			document.getElementById("tresc").removeChild(document.getElementById("tresc").getElementsByTagName('script')[0]);
			document.getElementById("tresc").removeChild(document.getElementById("tresc").getElementsByTagName('div')[0]);									
			var aaa ="<table>"+document.getElementById("tresc").getElementsByTagName('table')[0].innerHTML+"</table>";
			aaa+="<table>"+document.getElementById("tresc").getElementsByTagName('table')[1].innerHTML+"</table>";	
	}
}
function elMenu(link,napis){
	var a = '<a href="'+link+'" style="padding:5px 5px 5px 5px">'+napis+'</a>';
	return a;
}
function nowe_menu(){
	var a = document.getElementById('left').childNodes[3].childNodes;
	{a[5].removeAttribute("href");
	a[5].setAttribute('onmouseover','document.getElementById(\'u3\').style.display=\'table\'');
	a[5].setAttribute('onmouseout','document.getElementById(\'u3\').style.display=\'none\'');
	a[5].innerHTML = 'Miasto&nbsp;&nbsp;&nbsp;<span style="position:absolute;top:'+a[5].offsetTop+';">'+
		'<table id="u3" style="display: none; width:100%;background-color:rgb(100,100,100);border:1px solid white;" cellpadding="0" cellspacing="0">'+
		'<tr><td>'+elMenu('/shopitems.php','Sklep')+'</td><td>'+elMenu('/work.php','Praca')+'</td></tr>'+
		'<tr><td>'+elMenu('/training.php','Trening')+'</td><td>'+elMenu('/chat_new.php','Czat')+'</td></tr>'+
		'<tr><td>'+elMenu('/hospital.php','Szpital')+'</td><td>'+elMenu('/casino.php','Kasyno')+'</td></tr>'+
		'<tr><td>'+elMenu('/gielda.php','Giełda')+'</td><td>'+elMenu('/bank.php','Bank')+'</td></tr>'+
		'<tr><td>'+elMenu('/factory.php','Fabryka')+'</td><td>'+elMenu('/pojedynek.php','Pojedynek')+'</td></tr>'+
		'<tr><td colspan="2"><hr style="border:-1px solid silver;width:98%;"></td></tr>'+
		'<tr><td>'+elMenu('/best.php','Ranking')+'</td><td>'+elMenu('/autodealer.php','Samochody')+'</td></tr>'+
		'<tr><td>'+elMenu('/individual_training.php','Szkolenie')+'</td><td>'+elMenu('/home.php','Dom')+'</td></tr>'+
		'<tr><td>'+elMenu('/mission_new.php','Zadania')+'</td><td>'+elMenu('/harbor.php','Port')+'</td></tr>'+
		'<tr><td>'+elMenu('/school.php','Szkółka')+'</td><td>'+elMenu('/airport.php','Lotnisko')+'</td></tr>'+
		'<tr><td colspan="2">'+elMenu('/tricks.php','Triki')+'</td></tr>'+
		'</table>'
		'</span>';
	}
}
function test(){
	if(window.location.search == "?SelectModule=SearchMaterials"){
		var ile = 0;
		var przeznacz = 0;
			if(ReadCookie('Fabryka')){
				var dane = ReadCookie('Fabryka');
				var liczby = dane.split(",");
				ile = liczby[0];
				przeznacz = liczby[1];
			}
			var nowyinput = document.createElement('input');
			var nowybutton = document.createElement('input');
			var nowybr = document.createElement('br');
				nowyinput.setAttribute('id','szukaj');
				nowyinput.setAttribute('type','text');
				//nowyinput.setAttribute('maxlength','9');
				nowyinput.setAttribute('size','7');
			if(ile>0) nowyinput.setAttribute('value',ile);
			else nowyinput.setAttribute('value','10');
			if(przeznacz>0)
				document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].getElementsByTagName('input')[0].value=przeznacz;
			else
				document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].getElementsByTagName('input')[0].value='1';
			nowyinput.setAttribute('onchange','function SetCookie(cookieName,cookieValue,nDays) {var today = new Date(); var expire = new Date(); if (nDays==null || nDays==0) nDays=1; expire.setTime(today.getTime() + 3600000*24*nDays); document.cookie = cookieName+\'=\'+escape(cookieValue)+ \';expires=\'+expire.toGMTString();};SetCookie(\'Fabryka\',document.fabryka.szukaj.value + \',\' + document.fabryka.ile.value,1);');
			nowybutton.setAttribute('id','przycisk');
			nowybutton.setAttribute('type','button');
			nowybutton.setAttribute('value','Zacznij szukac');
			//nowybutton.setAttribute('onclick','alert("Szukam, szukam co taki pospiech")');
			nowybutton.setAttribute('onclick','window.location.reload( true );');
			
			document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].setAttribute('name','fabryka');
			document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].appendChild(nowybr);
			document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].innerHTML += "Wyszukaj (liczba akcji): ";
			document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].appendChild(nowyinput);
			document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].appendChild(nowybutton);
			if(ile>0 && ile <= parseInt(akcje)){
				
				SetCookie('Fabryka',(document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].getElementsByTagName('input')[2].value - 1) + ',' + document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].getElementsByTagName('input')[0].value,1);
				GM_setValue('Fabryka',(document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].getElementsByTagName('input')[2].value - 1) + ',' + document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].getElementsByTagName('input')[0].value,1);
				document.getElementById('tresc').getElementsByTagName('div')[8].getElementsByTagName('form')[0].submit();
								
				setTimeout("window.location.search='?SelectModule=SearchMaterials'",110);
			}
		}
}
function aukcje(){
	if(window.location.pathname == "/collectcard.php"||window.location.pathname == "/stars_training.php"){
		var parametr = window.location.search.split("&");
		if(parametr[0]=="?SelectModule=MyCard"){
			var karty = document.getElementById("tresc").getElementsByTagName('table')[0].getElementsByTagName('td');			
			var ciastko = "";
			for(i in karty){ 
			if(i<=144){
				var karta_nr = karty[i].getElementsByTagName('a')[0].name;
				if (karta_nr!=''){
					karty[i].getElementsByTagName('img')[0].setAttribute('style','height:100px;');
					var xxx = karty[i].innerHTML.split("<br>");
					var ilosc_kart = parseInt(xxx[1].substr(1,xxx[1].length-7));
					ciastko = ciastko + karta_nr + "," + ilosc_kart + ";";
				}
			}
			}
			GM_setValue('PosiadaneKarty',ciastko);
		}
		if(GM_getValue('PosiadaneKarty')){
				var dane = GM_getValue('PosiadaneKarty');
				var dane_karty = dane.split(";");
				var total=0;
				var newdiv = document.createElement('div');
					newdiv.setAttribute('class','text');
					newdiv.setAttribute('id','twoje_karty');
					newdiv.innerHTML = 'Posiadasz karty: (Odwiedzaj zakladke moje karty jezeli jakas wylosujesz)<br>';
				for(i in dane_karty){
					var nr_karty = dane_karty[i].split(',')[0];
					var ilosc_kart = dane_karty[i].split(',')[1];
						if(i%10==0) newdiv.innerHTML += '<br>';
						if(nr_karty!=''){
							if(nr_karty<10) newdiv.innerHTML += '<b style="color:black;">_</b>';
							if(nr_karty<100) newdiv.innerHTML += '<b style="color:black;">_</b>';
							newdiv.innerHTML += "<b>" + nr_karty + ":</b> ";								
							if(ilosc_kart>1) newdiv.innerHTML += "<font color=yellowgreen>" + ilosc_kart +"</font>&emsp;";
							if(ilosc_kart==1) newdiv.innerHTML += ilosc_kart +"&emsp;";
							if(ilosc_kart==0) newdiv.innerHTML += "<font color=red>"+ilosc_kart +"</font>&emsp;";
							total+= parseInt(ilosc_kart);
						}
				}
				newdiv.innerHTML+="<br>Suma kart: <b>"+total+"</b>";
				document.getElementById('tresc').appendChild(newdiv);
			}
	}
}
function triki(){
	if(window.location.pathname == "/tricks.php")
	{
		document.getElementById("tresc").innerHTML+=
			"<div class='text'><iframe id='ramka' name='ramka' src='/pm.php?SelectModule=MyMessages' style='overflow-x:hidden;' width='100%' height='300px' frameborder='0'></iframe></div>"; //height='500px'
			
		if(window.location.search.length>0) {
			var poziom = window.location.search.split("&")[1].split("=")[1];
			var trik= window.location.search.split("&")[2].split("=")[1];			
			var html = document.getElementsByName("wsp_1");
			for(i=0;i<=11;i++){
				for(j=0;j<=9;j++){
					if(document.getElementsByName("wsp_"+i).item(0)){
						document.getElementsByName("wsp_"+i).item(j).setAttribute("onclick","document.cookie='"+ trik +","+ i +"="+ document.getElementsByName("wsp_"+i).item(j).value+"';expires=3600000*24*7");
						if(ReadCookie(trik+","+i)){
							var zaznaczony = parseInt(ReadCookie(trik+","+i));
							if (zaznaczony>0) document.getElementsByName("wsp_"+i).item(zaznaczony-1).parentNode.setAttribute("style","background:silver;");						
						}			
					}
				}
			}
		}
	}
}
function Main(){
	if(document.getElementById("reklama")!=null) document.getElementById("tresc").removeChild(document.getElementById("reklama"));
	if(document.getElementById("foot")!=null)document.getElementById("foot").parentNode.removeChild(document.getElementById("foot"));
	if(document.getElementById("box_info")!=null) document.getElementById("box_info").innerHTML='';
	if(document.getElementById("box_info_right")) document.getElementById("box_info_right").parentNode.removeChild(document.getElementById("box_info_right"));
	if(document.getElementById("alert")!=null){
		GM_setValue('news',document.getElementById("alert_text").innerHTML);
		window.location.pathname=document.getElementById("alert").getAttribute('onclick').split("replace")[1].split("'")[1];
	}
	if(ReadCookie('FootballTeam')){
		var dane = ReadCookie('FootballTeam');
		var co = dane.substr(dane.length-1);
		var ile = dane.substr(0,dane.length-1);
		nowe_menu();
		Dodaj_Opcje(ile,co);
		Trenuj(ile,co);
	} else {
		SetCookie('FootballTeam','00',1);
	}
	if(GM_getValue('news')){
		var szkolka='';
		if(window.location.pathname=="/training.php")
		for(z=0;z<3;z++){
			var ostatni = parseInt(document.getElementById("right").children.length);
			document.getElementById("right").removeChild(document.getElementById("right").childNodes[ostatni]);
		}
		
		if(GM_getValue('szkolka') && window.location.pathname == "/training.php")
			szkolka = 'Tryb intensywnego treningu: '+ GM_getValue('szkolka') +' PA zostało. <a href="school.php?SelectModule=Activ">Aktywuj intensywny trening</a><br><br>';
		if(window.location.pathname!="/pm.php")
			document.getElementById("right").innerHTML += '<div class="title">Informacje</div><div class="text">'+ szkolka +'<b>'+GM_getValue('news')+'</b></div>';//+document.getElementById("right").innerHTML;
		
		if(document.getElementById("marq")) document.getElementById("right").innerHTML += '<div class="title">Wiadomosci</div><div class="text">'+document.getElementById("marq").innerHTML +'</div>' ;//+ document.getElementById("right").innerHTML;
		if(document.getElementById("info")) document.getElementById("info").parentNode.removeChild(document.getElementById("info"));
		
	}
	aukcje();
	test();
	triki();
}
if(window.top.location.pathname != "/training.php")
	if(window.top.location.pathname != "/tricks.php"){
		if(window.top.location.pathname!=window.location.pathname  || window.location.search.split("&")[0].split("=")[1]=="DestroyThisMessage") {window.top.location.pathname=window.location.pathname};
	}
if(window.location.pathname=="/home.php"){
	
	if(window.location.search=="?v=rest") {
		//alert(window.location.search);
		location.pathname = "/training.php";
	}
}
Main();