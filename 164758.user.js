// ==UserScript==
// @name           headbangersozluk++
// @description    turlu seylerle headbangers sozluk'u guzellestirme aparati.
// @namespace      http://userscripts.org/users/nailgg
// @version        0.2.7
// @author         yanak kafasi a.k.a nailgg
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://headbanger.sozlukspot.com/*
// @include        http://www.headbangersozluk.com/*
// @include        http://www.headbangersozluk.us/*
// ==/UserScript==
var mevcutVersion = "0.2.7";
if(localStorage.getItem("headbangersReserved")==null) localStorage.setItem("headbangersReserved", "|yanak kafasi|");	//ilk kurulum ayari
if(localStorage.getItem("headbangersPoser")==null) localStorage.setItem("headbangersposer", "|smackdown1999|");		//ilk kurulum ayari
if(localStorage.getItem("headbangersSonBes")==null) localStorage.setItem("headbangersSonBes", "|-|-|-|-|-|");

if(localStorage.getItem("headbangersReserved").substr(0, 1)!="|" && localStorage.getItem("headbangersReserved").length>0)
localStorage.setItem("headbangersReserved", "|" + localStorage.getItem("headbangersReserved"));

if(localStorage.getItem("headbangersReserved").substr(localStorage.getItem("headbangersReserved").length-1, 1)!="|" && localStorage.getItem("headbangersReserved").length>0)
localStorage.setItem("headbangersReserved", localStorage.getItem("headbangersReserved") + "|");

var tarih = new Date();
var bugun = tarih.getTime();
var miniPopup = 0;
sayfaList = localStorage.getItem("headbangersReserved");

if(location.href.indexOf("ss_index.php?sa=yzr")!=-1)
{
	// eğer buraya girildiyse yazar bilgi sayfasi yüklenmiş demektir

	yazarID = document.body.innerHTML.split("uid=")[1].split("&")[0];
	
	var messagebtn = document.createElement('td');
	messagebtn.onmousedown="this.id='butDown'";
	messagebtn.onmouseout ="this.id=''";
	messagebtn.onmousemove="this.id='butOver'";
	messagebtn.setAttribute("class","linkler");
	messagebtn.setAttribute("title"," /msj ");
	messagebtn.innerHTML="<a target='sportakisim' href='ss_index.php?sa=msj&kime=" + yazarID + "' id='messagebtn'> /msj </a>";
	document.getElementsByTagName("tr")[1].appendChild(messagebtn);
}

if(document.getElementsByTagName("span")[0].getAttribute("class")=="baslik_text")
{
// eğer buraya girildiyse orta frame yüklenmiş demektir
	baslikAdi = "";
	baslikAdi = document.title.replace("headbangers sozluk - ", "");
	baslikAdi = baslikAdi.replace("headbangers sözlük - ", "");
	document.title = baslikAdi + " - headbangers sozluk";

	var acikSayfa = "";
	acikSayfa = location.href.split("/")[5];
	if(!acikSayfa) acikSayfa=1;

	ortaicerik = document.body.innerHTML;					// rendered kodları al
//	if(gelenAdres!="http://headbanger.sozlukspot.com/" && gelenAdres!="http://www.headbangersozluk.com")	funCerceveGetir();

	funAntiposer();			// poser listesindeki yazarların entrylerini gizle		
	funEtGetir();				// başlıklarda @'lere verilen cevaplarda @ tıklandığında mini popup içerisinde getir
	basliktakiEntryler();		// yazarın yanına baslıkta yazdığı entryler butonu ekle
	funReserveYap();			// başlığın tepesine reserve yap/sil butonu ekle
	funSwfGom();				// swfleri sayfa içerisinden yükle
//	funBaslikSabitle();			// baslik adini sayfayla kaymaz yap
	funResimGom();				// resimleri sayfa içerisinden yükle
	funSonBesGuncelle();		// ziyaret edilen son bes sayfa listesini guncelle
	funSikertilmisGizle();		// sikertilmis entryleri gizle
}

if(document.getElementsByTagName("span")[0].getAttribute("class")=="logo_all")
{
	updateKontrol();
	
	// ust frame'deyiz
	var reservedbtn = document.createElement('td');
	reservedbtn.onmousedown="this.id='butDown'";
	reservedbtn.onmouseout ="this.id=''";
	reservedbtn.onmousemove="this.id='butOver'";
	reservedbtn.setAttribute("class","linkler");
	reservedbtn.setAttribute("title","reserved");
    reservedbtn.innerHTML="<a onclick='reservedSayfalariEkle();' href='#' id='reservedbtn'>reserved</a>";
	document.getElementsByTagName("tr")[2].appendChild(reservedbtn);

	var poserbtn = document.createElement('td');
	poserbtn.onmousedown="this.id='butDown'";
	poserbtn.onmouseout ="this.id=''";
	poserbtn.onmousemove="this.id='butOver'";
	poserbtn.setAttribute("class","linkler");
	poserbtn.setAttribute("title","poser listesi");
    poserbtn.innerHTML="<a onclick='poserListesiGetir();' href='#' id='poserbtn'>poser listesi</a>";
	document.getElementsByTagName("tr")[1].appendChild(poserbtn);
}

if(typeof(unsafeWindow)=='undefined')
{
	function topluposerEkle(liste)
	{
		var poserListesi = localStorage.getItem("headbangersposer");
		var kacTaneposerEklenecek = liste.split("\r\n").length-1;
		var eklenecekposerListesi = liste.split("\r\n");
		var siradakiposer = "";
		
		for(var i=0; i <= kacTaneposerEklenecek; i++)
		{
			if(eklenecekposerListesi[i].length > 3)
			{
				siradakiposer = eklenecekposerListesi[i].replace(/^\s+|\s+$/g,""); // replace kısmı trim yapıyor
				if(poserListesi.indexOf("|" + siradakiposer + "|")==-1)
				{
					poserListesi += siradakiposer + "|";
					localStorage.setItem("headbangersposer", poserListesi);
					poserListesiGetir();
				}
			}
		}
	}

	function reserveBosalt()
	{
		if(confirm("tüm reserved başlıkları silmek istediğinizden emin misiniz?"))
		{
			localStorage.setItem("headbangersReserved", "");
			document.body.innerHTML = "bu liste bomboş.";
		}
	}
	
	function poserBosalt()
	{
		if(confirm("tüm poserleri silmek istediğinizden emin misiniz?"))
		{
			localStorage.setItem("headbangersposer", "")
			document.body.innerHTML = "bu liste bomboş.";
		}
	}	
	
	function etGoster(gosterilecekEt, hangiBaslik)
	{
		var kapanacak;
		gosterilecekEt = gosterilecekEt.replace(/@/g, "");
		kacheadbangersSayfa = ((gosterilecekEt - (gosterilecekEt % 25)) / 25) + 1;
                if(gosterilecekEt % 25==0) kacheadbangersSayfa--;
		adres = "http://" + location.hostname + "/w/" + hangiBaslik.replace(/ /g, "-") + "/";
		adres += kacheadbangersSayfa + "/";
	
		var kapat = document.createElement("button");
			kapat.innerHTML = "X";
			kapat.style.position = "absolute";
			kapat.style.top = "7px";
			kapat.style.right = "7px";
			kapat.addEventListener("click", function() {
				kapanacak = document.getElementById("minipopup");
				document.body.removeChild(kapanacak);
				miniPopup = 0;
			}, true);

		var basligiAc = document.createElement("button");
			basligiAc.innerHTML = "entry sayfasina git";
			basligiAc.style.position = "absolute";
			basligiAc.style.top = "7px";
			basligiAc.style.right = "37px";
			basligiAc.addEventListener("click", function() {
				document.location.href = adres;
			}, true);
			
		var oncekiEt = document.createElement("button");
			oncekiEt.innerHTML = "bir onceki entry";
			oncekiEt.style.position = "absolute";
			oncekiEt.style.top = "7px";
			oncekiEt.style.right = "282px";
			oncekiEt.addEventListener("click", function() {
				yeniGosterilecekEt = parseInt(gosterilecekEt) - 1;
				etGoster(yeniGosterilecekEt + '', hangiBaslik);
			}, true);

		var sonrakiEt = document.createElement("button");
			sonrakiEt.innerHTML = "bir sonraki entry";
			sonrakiEt.style.position = "absolute";
			sonrakiEt.style.top = "7px";
			sonrakiEt.style.right = "166px";
			sonrakiEt.addEventListener("click", function() {
				yeniGosterilecekEt = parseInt(gosterilecekEt) + 1;
				etGoster(yeniGosterilecekEt + '', hangiBaslik);
			}, true);
		
		if(!miniPopup)
		{
			var icten = document.createElement("div");
			icten.id = "minipopup";
			icten.style.overflow = "auto";
			icten.style.position = "fixed";
			icten.style.zIndex = "100";
			icten.style.top = "50px";
			icten.style.left = "50px";
			icten.style.minWidth = "50em";
			icten.style.minHeight = "15em";
			icten.style.maxHeight = "45em";
			icten.style.backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");
			icten.style.border = "1px solid rgb(255,255,255)";
			icten.style.border = "1px solid rgba(255,255,255,0.5)";
			icten.innerHTML = "yüklüyor...";
			
			document.body.appendChild(icten);
			
			acikPopup = document.getElementById("minipopup");
			acikPopup.appendChild(kapat);
			acikPopup.appendChild(basligiAc);
			acikPopup.appendChild(oncekiEt);
			acikPopup.appendChild(sonrakiEt);
			miniPopup = 1;
		}else{
			acikPopup = document.getElementById("minipopup");
			acikPopup.innerHTML = "yükleniyor...";
			acikPopup.appendChild(kapat);
			acikPopup.appendChild(basligiAc);
			acikPopup.appendChild(oncekiEt);
			acikPopup.appendChild(sonrakiEt);
		}
	
	
		var sorgu = new XMLHttpRequest();
		sorgu.open("GET", adres, true);
		sorgu.onreadystatechange = function(){
			if(sorgu.readyState == 4)
			{
				if(sorgu.status == 200)
				{
					var gelenCevap = sorgu.responseText;
					if(gelenCevap.indexOf(' et="' + gosterilecekEt + '" style="margin-left:8px;"  >')>-1)
					{
						yazarTarih = gelenCevap.split(' et="' + gosterilecekEt + '" style="margin-left:8px;"  >')[1].split('class="yazar_tarih">')[1].split('<script language')[0];
						gelenCevap = gelenCevap.split(' et="' + gosterilecekEt + '" style="margin-left:8px;"  >')[1].split('<div')[0];
						gelenCevap = "<table><tr width='80%'><td>bu başlıkta @" + gosterilecekEt + " demiş ki; <br /> <br />" + gelenCevap + "</td></tr>";
						gelenCevap += "<tr><td>" + yazarTarih + "</td></tr></table>";
						
					}else gelenCevap = "başlıkta böyle bir entry yok.";
	
					document.getElementById("minipopup").innerHTML = gelenCevap;
					document.getElementById("minipopup").appendChild(basligiAc);
					document.getElementById("minipopup").appendChild(kapat);
					document.getElementById("minipopup").appendChild(oncekiEt);
					document.getElementById("minipopup").appendChild(sonrakiEt);
				}
			}
		}
		sorgu.send(null);
	}
	
	function swfGizleGoster(nereye, neyi)
	{
		if(document.getElementById(nereye).getElementsByTagName("object").length<=0)
		{
			var cont = "";
			
			cont  += '<object type="application/x-shockwave-flash" data="' + neyi + '" width="640" height="480">';
			cont  += '      <param name="quality" value="high" />';
			cont  += '      <param name="wmode" value="opaque" />';
			cont  += '      <param name="swfversion" value="6.0.65.0" />';
			cont  += '</object>';
	
			var eklenecekSwf = document.createElement("p");
			eklenecekSwf.innerHTML = cont;
	
			document.getElementById(nereye).appendChild(eklenecekSwf);
		}
		else
		{
			var kurban = document.getElementById(nereye).getElementsByTagName("p")[0];
			document.getElementById(nereye).removeChild(kurban);
		}
	}

	function poserListesiGetir()
	{
		var poserListesi = localStorage.getItem("headbangersposer");
		var poserSayisi  = poserListesi.split("|").length - 1;
		var poserSayfasi = "";
	
		var temaKonumu = parent.frames[0].document.head.innerHTML.indexOf("<link rel=\"stylesheet\"");
		var iconKonumu = parent.frames[0].document.head.innerHTML.indexOf('<script type=\"text/javascript\"');
		
		var temaAdresi = "<html><head>";
		temaAdresi += parent.frames[0].document.head.innerHTML.substr(temaKonumu, iconKonumu-temaKonumu);
		temaAdresi += "</head>";
	
		poserSayfasi = temaAdresi + "<body>";
		
		for(var i=0; i<=poserSayisi; i++)
		{
			if(poserListesi.split("|")[i]!="")
			{
				poserSayfasi += poserListesi.split("|")[i] + ' - <a href="#" onclick="javacript:funposerSil(\'' + poserListesi.split("|")[i] + '\');">[kaldır]</a><br>';
			}
		}
			
			poserSayfasi += "<br><a href=\"javascript:poserBosalt();\">poser listesini boşalt</a><br /><br />"
			poserSayfasi += "<b>listeden poser ekle (her poser bir satır)</b>";
			poserSayfasi += "<div id='poserEklemeListesi'><textarea rows='20' id='yeniposerListesi'></textarea>";
			poserSayfasi += "<br><input type=\"button\" onclick=\"topluposerEkle(document.getElementById('yeniposerListesi').value)\" id=\"poserListesiniEkle\" value=\"ekle\" /></div>";
			poserSayfasi += "</body></html>";
			parent.frames['sportakisim'].document.documentElement.innerHTML = poserSayfasi;
	}

	function funposerSil(kim)
	{
		if(confirm(kim + " adli yazari poser listesinden kaldırmak istiyor musunuz?"))
		{
			var eskiposerList = localStorage.getItem("headbangersposer");
			var yeniposerList = eskiposerList.replace(kim + "|", "");
			if(yeniposerList.substr(-1)!= "|") yeniposerList += "|";
	
			localStorage.setItem("headbangersposer", yeniposerList);
		
			poserListesiGetir();
			return true;
		}
	}
	
	function funposerYap(kim)
	{
		if(confirm(kim + " adli yazari poser listesine eklemek istiyor musunuz?"))
		{
			if(localStorage.getItem("headbangersposer").length > 0)
			{
				var eskiposerList = localStorage.getItem("headbangersposer");
				localStorage.setItem("headbangersposer", eskiposerList + kim + "|");
				parent.frames[2].location.reload();
			}else{
				localStorage.setItem("headbangersposer", "|" + kim + "|");
				parent.frames[2].location.reload();
			}
		}
	}
	
	function reservedSayfalariEkle(sayfaList)
	{
		/////////////////////////// BU FONKSIYON OPERA ICIN YAZILMISTIR ///////////////////////////
		var sayfaBolunmus = localStorage.getItem("headbangersReserved").split("|");
		var temaKonumu = parent.frames[0].document.head.innerHTML.indexOf("<link rel=\"stylesheet\"");
		var iconKonumu = parent.frames[0].document.head.innerHTML.indexOf('<script type=\"text/javascript\"');

		var temaAdresi = "<html><head>";
		temaAdresi += parent.frames[0].document.head.innerHTML.substr(temaKonumu, iconKonumu-temaKonumu);
		temaAdresi += "</head>";
		reservedSayfalar = temaAdresi + "<body><table>";
				
		for(var i=0; i<=localStorage.getItem("headbangersReserved").split("|").length-1; i++)
		{
			if(sayfaBolunmus[i].length > 0)
			{
				if(sayfaBolunmus[i].indexOf("(")>-1)
				{
					var gidilecekSayfa = sayfaBolunmus[i].split("(")[1].split(")")[0];
					sayfaBolunmus[i] = sayfaBolunmus[i].split("(")[0].replace(/\s+$/,"");
					reservedSayfalar += "<tr><td><a href=\"http://" + location.hostname + "/w/" + sayfaBolunmus[i].replace(/ /g, "-") + "/" + gidilecekSayfa + "/\" target=\"sportakisim\">" + sayfaBolunmus[i] + " (" + gidilecekSayfa + ")" + "</a> - <a href=\"#\" onclick=\"toggleReserve('" + sayfaBolunmus[i] + " (" + gidilecekSayfa + ")" + "', '1')\">[kaldır]</a></td></tr>";
				} else {
				reservedSayfalar += "<tr><td><a href=\"http://" + location.hostname + "/w/" + sayfaBolunmus[i].replace(/ /g, "-") + "\" target=\"sportakisim\">" + sayfaBolunmus[i] + "</a> - <a href=\"#\" onclick=\"toggleReserve('" + sayfaBolunmus[i] + "', '1');\">[kaldır]</a></td></tr>";
				}
			}
		}
		
		reservedSayfalar += "<tr><td><br></td></tr>";
		reservedSayfalar += "<tr><td><a href=\"javascript:reserveBosalt();\">tüm reserved sayfaları sil</a></td></tr></table>";
		reservedSayfalar += "<hr><table><tr><td>son girilen 5 baslik</td></tr>";
		
		sonSayfalar = localStorage.getItem("headbangersSonBes").split("|");
		
		for(var i=0; i<=localStorage.getItem("headbangersSonBes").split("|").length-1; i++)
		{
//			reservedSayfalar += "<tr><td>" + sonSayfalar[i] + "</td></tr>";
			if(sonSayfalar[i]=="-")
				reservedSayfalar += "<tr><td>-</td></tr>";
			else
				reservedSayfalar += "<tr><td><a href=\"http://" + location.hostname + "/w/" + sonSayfalar[i].replace(/ /g, "-") + "\" target=\"sportakisim\">" + sonSayfalar[i] + "</a></td></tr>";
		}
		
		reservedSayfalar += "</table></body></html>";
		parent.frames['sportakisim'].document.documentElement.innerHTML = reservedSayfalar;
		return reservedSayfalar;
	}

	function toggleReserve(baslik, x)
	{
		if(baslik.indexOf("(")>-1) baslikTemp = baslik.split("(")[0].replace(/\s+$/,""); // parantez içini ve sondaki boşluğu sil
		
		if(localStorage.getItem("headbangersReserved").length != 0)
		{
			if(sayfaList.indexOf(baslik + "|")==-1)
			{
				sayfaList += baslik + "|";
				localStorage.setItem("headbangersReserved", sayfaList);
				if(!x) document.getElementById("reservetxt").innerHTML = "reserve sil";
			}else{
				sayfaList = sayfaList.replace("|" + baslik, "");
				localStorage.setItem("headbangersReserved", sayfaList);
				if(!x) document.getElementById("reservetxt").innerHTML = "reserve yap";
			}
		}else{
				sayfaList = "|" + baslik + "|";
				localStorage.setItem("headbangersReserved", sayfaList);
				if(!x) document.getElementById("reservetxt").innerHTML = "reserve sil";
		}

		if(x=="1") reservedSayfalariEkle();
	}
}
else
{	
	var sayfaList = localStorage.getItem("headbangersReserved");

	unsafeWindow.topluposerEkle = function(liste)
	{
		var poserListesi = localStorage.getItem("headbangersposer");
		var kacTaneposerEklenecek = liste.split("\n").length-1;
		var eklenecekposerListesi = liste.split("\n");
		var siradakiposer = "";
		
		for(var i=0; i <= kacTaneposerEklenecek; i++)
		{
			if(eklenecekposerListesi[i].length > 3)
			{
				siradakiposer = eklenecekposerListesi[i].replace(/^\s+|\s+$/g,""); // replace kısmı trim yapıyor
				if(poserListesi.indexOf("|" + siradakiposer + "|")==-1)
				{
					poserListesi += siradakiposer + "|";
					localStorage.setItem("headbangersposer", poserListesi);
					if(detectBrowser()=="opera") poserListesiGetir();
				}
			}
		}
		if(detectBrowser()=="chrome")  poserListesiGetir();
		if(detectBrowser()=="firefox") alert("poserler eklendi. sayfayı yenileyiniz.");
	}

	unsafeWindow.reserveBosalt = function()
	{
		if(confirm("tüm reserved başlıkları silmek istediğinizden emin misiniz?"))
		{
			localStorage.setItem("headbangersReserved", "");
			document.body.innerHTML = "bu liste bomboş.";
		}
	};
	
	unsafeWindow.poserBosalt = function()
	{
		if(confirm("tüm poserleri silmek istediğinizden emin misiniz?"))
		{
			localStorage.setItem("headbangersposer", "")
			document.body.innerHTML = "bu liste bomboş.";
		}
	};

	unsafeWindow.etGoster = function(gosterilecekEt, hangiBaslik)
	{
		var kapanacak;
		gosterilecekEt = gosterilecekEt.replace(/@/g, "");
		kacheadbangersSayfa = ((gosterilecekEt - (gosterilecekEt % 25)) / 25) + 1;
                if(gosterilecekEt % 25 ==0) kacheadbangersSayfa--;
		adres = "http://" + location.hostname + "/w/" + hangiBaslik.replace(/ /g, "-") + "/";
		adres += kacheadbangersSayfa + "/";
	
		var kapat = document.createElement("button");
			kapat.innerHTML = "X";
			kapat.style.position = "absolute";
			kapat.style.top = "7px";
			kapat.style.right = "7px";
			kapat.addEventListener("click", function() {
				kapanacak = document.getElementById("minipopup");
				document.body.removeChild(kapanacak);
				miniPopup = 0;
			}, true);

		var basligiAc = document.createElement("button");
			basligiAc.innerHTML = "entry sayfasina git";
			basligiAc.style.position = "absolute";
			basligiAc.style.top = "7px";
			basligiAc.style.right = "37px";
			basligiAc.addEventListener("click", function() {
				document.location.href = adres;
			}, true);

		var oncekiEt = document.createElement("button");
			oncekiEt.innerHTML = "bir onceki entry";
			oncekiEt.style.position = "absolute";
			oncekiEt.style.top = "7px";
			oncekiEt.style.right = "282px";
			oncekiEt.addEventListener("click", function() {
				yeniGosterilecekEt = parseInt(gosterilecekEt) - 1;
				unsafeWindow.etGoster(yeniGosterilecekEt + '', hangiBaslik);
			}, true);

		var sonrakiEt = document.createElement("button");
			sonrakiEt.innerHTML = "bir sonraki entry";
			sonrakiEt.style.position = "absolute";
			sonrakiEt.style.top = "7px";
			sonrakiEt.style.right = "166px";
			sonrakiEt.addEventListener("click", function() {
				yeniGosterilecekEt = parseInt(gosterilecekEt) + 1;
				unsafeWindow.etGoster(yeniGosterilecekEt + '', hangiBaslik);
			}, true);
		
		if(!miniPopup)
		{
			var icten = document.createElement("div");
			icten.id = "minipopup";
			icten.style.overflow = "auto";
			icten.style.position = "fixed";
			icten.style.zIndex = "100";
			icten.style.top = "50px";
			icten.style.left = "50px";
			icten.style.minWidth = "50em";
			icten.style.minHeight = "15em";
			icten.style.maxHeight = "45em";
			icten.style.backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");
			icten.style.border = "1px solid rgb(255,255,255)";
			icten.style.border = "1px solid rgba(255,255,255,0.5)";
			icten.innerHTML = "yüklüyor...";
			
			document.body.appendChild(icten);
			
			acikPopup = document.getElementById("minipopup");
			acikPopup.appendChild(kapat);
			acikPopup.appendChild(basligiAc);
			acikPopup.appendChild(oncekiEt);
			acikPopup.appendChild(sonrakiEt);
			miniPopup = 1;
		}else{
			acikPopup = document.getElementById("minipopup");
			acikPopup.innerHTML = "yükleniyor...";
			acikPopup.appendChild(kapat);
			acikPopup.appendChild(basligiAc);
			acikPopup.appendChild(oncekiEt);
			acikPopup.appendChild(sonrakiEt);
		}
	
	
		var sorgu = new XMLHttpRequest();
		sorgu.open("GET", adres, true);
		sorgu.onreadystatechange = function(){
			if(sorgu.readyState == 4)
			{
				if(sorgu.status == 200)
				{
					var gelenCevap = sorgu.responseText;
					if(gelenCevap.indexOf(' et="' + gosterilecekEt + '" style="margin-left:8px;"  >')>-1)
					{
						yazarTarih = gelenCevap.split(' et="' + gosterilecekEt + '" style="margin-left:8px;"  >')[1].split('class="yazar_tarih">')[1].split('<script language')[0];
						gelenCevap = gelenCevap.split(' et="' + gosterilecekEt + '" style="margin-left:8px;"  >')[1].split('<div')[0];
						gelenCevap = "<table><tr width='80%'><td>bu başlıkta @" + gosterilecekEt + " demiş ki; <br /> <br />" + gelenCevap + "</td></tr>";
						gelenCevap += "<tr><td>" + yazarTarih + "</td></tr></table>";
						
					}else gelenCevap = "başlıkta böyle bir entry yok.";
	
					document.getElementById("minipopup").innerHTML = gelenCevap;
					document.getElementById("minipopup").appendChild(basligiAc);
					document.getElementById("minipopup").appendChild(kapat);
					document.getElementById("minipopup").appendChild(oncekiEt);
					document.getElementById("minipopup").appendChild(sonrakiEt);
				}
			}
		}
		sorgu.send(null);
	};

	unsafeWindow.swfGizleGoster = function(nereye, neyi)
	{
		if(document.getElementById(nereye).getElementsByTagName("object").length<=0)
		{
			var cont = "";
			
			cont  += '<object type="application/x-shockwave-flash" data="' + neyi + '" width="640" height="480">';
			cont  += '      <param name="quality" value="high" />';
			cont  += '      <param name="wmode" value="opaque" />';
			cont  += '      <param name="swfversion" value="6.0.65.0" />';
			cont  += '</object>';
	
			var eklenecekSwf = document.createElement("p");
			eklenecekSwf.innerHTML = cont;
	
			document.getElementById(nereye).appendChild(eklenecekSwf);
		}
		else
		{
			var kurban = document.getElementById(nereye).getElementsByTagName("p")[0];
			document.getElementById(nereye).removeChild(kurban);
		}
	}


	unsafeWindow.poserListesiGetir = function()
	{
		var poserListesi = localStorage.getItem("headbangersposer");
		var poserSayisi  = poserListesi.split("|").length - 1;
		var poserSayfasi = "";
	
		var temaKonumu = parent.frames[0].document.head.innerHTML.indexOf("<link rel=\"stylesheet\"");
		var iconKonumu = parent.frames[0].document.head.innerHTML.indexOf('<script type=\"text/javascript\"');
		
		var temaAdresi = "<html><head>";
		temaAdresi += parent.frames[0].document.head.innerHTML.substr(temaKonumu, iconKonumu-temaKonumu);
		temaAdresi += "</head>";
	
		poserSayfasi = temaAdresi + "<body>";
		
		for(var i=0; i<=poserSayisi; i++)
		{
			if(poserListesi.split("|")[i]!="")
			{
				poserSayfasi += poserListesi.split("|")[i] + ' - <a href="#" onclick="javacript:funposerSil(\'' + poserListesi.split("|")[i] + '\');">[kaldır]</a><br>';
			}
		}
			poserSayfasi += "<br><a href=\"javascript:poserBosalt();\">poser listesini boşalt</a><br /><br />"
			poserSayfasi += "<b>listeden poser ekle (her poser bir satır)</b>";
			poserSayfasi += "<div id='poserEklemeListesi'><textarea rows='20' id='yeniposerListesi'></textarea>";
			poserSayfasi += "<br><input type=\"button\" onclick=\"topluposerEkle(document.getElementById('yeniposerListesi').value)\" id=\"poserListesiniEkle\" value=\"ekle\" /></div>";
			poserSayfasi += "</body></html>";

			parent.frames[2].document.documentElement.innerHTML = poserSayfasi;
	};

	unsafeWindow.funposerSil = function(kim)
	{
		if(confirm(kim + " adli yazari poser listesinden kaldırmak istiyor musunuz?"))
		{
			var eskiposerList = localStorage.getItem("headbangersposer");
			var yeniposerList = eskiposerList.replace(kim + "|", "");
			if(yeniposerList.substr(-1)!= "|") yeniposerList += "|";
	
			localStorage.setItem("headbangersposer", yeniposerList);
		
			poserListesiGetir();
			return true;
		}
	};
	
	unsafeWindow.funposerYap = function(kim) {
		if(confirm(kim + " adli yazari poser listesine eklemek istiyor musunuz?"))
		{
			if(localStorage.getItem("headbangersposer").length > 0)
			{
				var eskiposerList = localStorage.getItem("headbangersposer");
				localStorage.setItem("headbangersposer", eskiposerList + kim + "|");
				parent.frames[2].location.reload();
			}else{
				localStorage.setItem("headbangersposer", "|" + kim + "|");
				parent.frames[2].location.reload();
			}
		}
	};
	
	/////////////////////////// BU FONKSIYON FIREFOX/CHROME ICIN YAZILMISTIR /////////////////////////////
	unsafeWindow.reservedSayfalariEkle = function() {
		var sayfaBolunmus = localStorage.getItem("headbangersReserved").split("|");
		var temaKonumu = parent.frames[0].document.head.innerHTML.indexOf("<link rel=\"stylesheet\"");
		var iconKonumu = parent.frames[0].document.head.innerHTML.indexOf('<script type=\"text/javascript\"');

		var temaAdresi = "<html><head>";
		temaAdresi += parent.frames[0].document.head.innerHTML.substr(temaKonumu, iconKonumu-temaKonumu);
		temaAdresi += "</head>";
		reservedSayfalar = temaAdresi + "<body><table>";
				
		for(var i=0; i<=localStorage.getItem("headbangersReserved").split("|").length-1; i++)
		{
			if(sayfaBolunmus[i].length > 0)
			{
				if(sayfaBolunmus[i].indexOf("(")>-1)
				{
					var gidilecekSayfa = sayfaBolunmus[i].split("(")[1].split(")")[0];
					sayfaBolunmus[i] = sayfaBolunmus[i].split("(")[0].replace(/\s+$/,"");
					reservedSayfalar += "<tr><td><a href=\"http://" + location.hostname + "/w/" + sayfaBolunmus[i].replace(/ /g, "-") + "/" + gidilecekSayfa + "/\" target=\"sportakisim\">" + sayfaBolunmus[i] + " (" + gidilecekSayfa + ")" + "</a> - <a href=\"#\" onclick=\"toggleReserve('" + sayfaBolunmus[i] + " (" + gidilecekSayfa + ")" + "', '1')\">[kaldır]</a></td></tr>";
				} else {
				reservedSayfalar += "<tr><td><a href=\"http://" + location.hostname + "/w/" + sayfaBolunmus[i].replace(/ /g, "-") + "\" target=\"sportakisim\">" + sayfaBolunmus[i] + "</a> - <a href=\"#\" onclick=\"toggleReserve('" + sayfaBolunmus[i] + "', '1');\">[kaldır]</a></td></tr>";
				}
			}
		}

		reservedSayfalar += "<tr><td><br></td></tr>";
		reservedSayfalar += "<tr><td><a href=\"javascript:reserveBosalt();\">tüm reserved sayfaları sil</a></td></tr></table>";
		reservedSayfalar += "<hr><table><tr><td>son girilen 5 baslik</td></tr>";
		
		sonSayfalar = localStorage.getItem("headbangersSonBes").split("|");
		for(var i=0; i<=localStorage.getItem("headbangersSonBes").split("|").length-1; i++)
		{
			if(sonSayfalar[i]=="-")
				reservedSayfalar += "<tr><td>-</td></tr>";
			else
				reservedSayfalar += "<tr><td><a href=\"http://" + location.hostname + "/w/" + sonSayfalar[i].replace(/ /g, "-") + "\" target=\"sportakisim\">" + sonSayfalar[i] + "</a></td></tr>";
		}
		reservedSayfalar += "</table></body></html>";
		
		parent.frames[2].document.documentElement.innerHTML = reservedSayfalar;
		return reservedSayfalar;
	};
	
	unsafeWindow.toggleReserve = function(baslik, x)
	{
		if(baslik.indexOf("(")>-1) baslikTemp = baslik.split("(")[0].replace(/\s+$/,""); // parantez içini ve sondaki boşluğu sil
		
		if(localStorage.getItem("headbangersReserved").length != 0)
		{
			if(sayfaList.indexOf(baslik + "|")==-1)
			{
				sayfaList += baslik + "|";
				localStorage.setItem("headbangersReserved", sayfaList);
				if(!x) document.getElementById("reservetxt").innerHTML = "reserve sil";
			}else{
				sayfaList = sayfaList.replace("|" + baslik, "");
				localStorage.setItem("headbangersReserved", sayfaList);
				if(!x) document.getElementById("reservetxt").innerHTML = "reserve yap";
			}
		}else{
				sayfaList = "|" + baslik + "|";
				localStorage.setItem("headbangersReserved", sayfaList);
				if(!x) document.getElementById("reservetxt").innerHTML = "reserve sil";
		}

		if(x=="1") reservedSayfalariEkle();
	};
}

function basliktakiEntryler() // yazarın baslikta yazdigi entryleri gosteren buton fonksiyonu
{
	var tableSayisi = document.body.innerHTML.split(/<table/g).length-1;		// sayfada kaç tane entry olduğunu öğren
	var tableListesi = document.getElementsByTagName('table');	// table tag'leri al
	var mevcutTable = tableListesi[0];							// ilk table
	var k=0;
	for(k=0;k<tableSayisi;k++)
	{
		mevcutTable = tableListesi[k];
		myId = tableListesi[k].id;

		if(myId.substr(0,1)=="t" && location.href.indexOf("@")==-1)
		{
			var yazaradi = (document.getElementById("li_" + myId.replace("t","")).getElementsByClassName('yazar_tarih')[0].getElementsByTagName('a')[1].getAttribute("href")).replace("/","@");			// yazaradi = "@yanak kafasi"; seklinde
			var basliktakiYazarLink = location.href;
			if(basliktakiYazarLink.split("/")[5]!="")	// eğer basligin 1. sayfasinda ise split yapma
			{	basliktakiYazarLink = basliktakiYazarLink.replace(basliktakiYazarLink.split("/")[5] + "/", "");		}

			if(basliktakiYazarLink.substr(-1)!="/") basliktakiYazarLink += "/";
			if(basliktakiYazarLink.indexOf(".com/e/")>-1)
			{
				basliktakiYazarLink = basliktakiYazarLink.replace(basliktakiYazarLink.split("/")[3] + "/" + basliktakiYazarLink.split("/")[4] + "/", "w/" + baslikAdi.replace(" ","-") + "/");
			}
			if(basliktakiYazarLink.indexOf("&p=")>-1) basliktakiYazarLink=basliktakiYazarLink.replace(basliktakiYazarLink.split("/")[5], "");
			basliktakiYazarLink = basliktakiYazarLink + yazaradi;	// yazar link'ini olustur

			var yazarbtn = document.createElement("td");			// yazar entryleri icin td'yi olustur
			yazarbtn.onmousedown = "this.id='butDown'";
			yazarbtn.onmouseout  = "this.id=''";
			yazarbtn.onmousemove = "this.id='butOver'";
			yazarbtn.setAttribute("class","linkler");
			yazarbtn.innerHTML = "<a href=\"javascript:location='" + basliktakiYazarLink + "'\">baslikta yazdiklari</a>";
			
			document.getElementById(myId).getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].appendChild(yazarbtn);
		}
	}
}

function funReserveYap()
{
	tempList = sayfaList + "|";
	if(tempList.indexOf("|" + baslikAdi + "|")==-1 && tempList.indexOf("|" + baslikAdi + " (" + acikSayfa + ")")==-1)					// eğer reserved başlık listesinde adı yoksa
	{
		reservedText = "reserve yap";
	}
	else{													// veya varsa
		reservedText = "reserve sil";
	}

	var togglebtn = document.createElement("table");
	togglebtn.innerHTML = "<tr><td onclick=\"toggleReserve('" + baslikAdi + " (" + acikSayfa + ")');\" onmousedown=\"this.id='butDown'\" onmouseout=\"this.id=''\" onmousemove=\"this.id='butOver'\" class=\"linkler\"><a href=\"#\" id=\"reservetxt\">" + reservedText + "</a>&nbsp;</td></tr>";
	
	document.getElementsByTagName("h1")[0].appendChild(togglebtn);
}

function funResimGom()
{
	var linkSayisi  = document.body.innerHTML.split(/<a /).length-1;
	var linkListesi = document.getElementsByTagName("a");
	var mevcutLink  = linkListesi[0];
	var k=0;
	if(mevcutLink.href.indexOf(".jpg")>-1) k=1;
	var rastgele=Math.floor(Math.random()*9999);
	var gomuluResim = "";
	for(i=k;i<linkSayisi;i++)
	{
		mevcutLink = linkListesi[i];
		if((mevcutLink.href.indexOf(".png")>-1 || mevcutLink.href.indexOf(".jpg")>-1 || mevcutLink.href.indexOf(".jpeg")>-1 || mevcutLink.href.indexOf(".gif")>-1) && (linkListesi[i-1].id!=rastgele && mevcutLink.href.substr(-1)!="/") && mevcutLink.href.indexOf("headbangerscaps.com")==-1)
		{
			rastgele=Math.floor(Math.random()*9999);
			mevcutLink.id = rastgele;
			rastgele=Math.floor(Math.random()*9999);
			mevcutLink.target = "blank";
			mevcutLink.rel = "nofollow";
			gomuluResim = mevcutLink.href + '<a href=\'javascript:return void(0);\' onclick="gizlegoster(\'' + rastgele +'\')">' +
			"<img src=\"http://www.sozlukspot.com/res/img.png\" height=\"10\" width=\"10\" border=\"0\" /></a>" +
			"<div id='" + rastgele + "' style='display:none;overflow:hidden;'><img src='" + mevcutLink.href + "' style='max-width=790px' /></div>";
			mevcutLink.innerHTML = gomuluResim;
		}
	}
}

function funSikertilmisGizle()
{
	var entrySayisi  = document.body.innerHTML.split(/<li /g).length-1;	// sayfada kaç entry var
	var entryListesi = document.getElementsByTagName("li");
	var i = 0;
	var entryID = 0;
	
	for(i=0;i<entrySayisi;i++)
	{
		entryID  = entryListesi[i].id;
		satirSayisi = document.getElementById(entryID).innerHTML.split("\n").length-1;
		if(satirSayisi>800)
		{
			document.getElementById(entryID).innerHTML = "baslik sikerten entry detected! (headbangers plus plus tarafindan)<div>&nbsp;</div>";
		}
	}	
}

function funAntiposer()	// poser entrylerini gizle
{
	poserButon();

	var entrySayisi  = document.body.innerHTML.split(/<li /g).length-1;	// sayfada kaç entry var
	var entryListesi = document.getElementsByTagName("li");
	var i = 0;
	var entryID = 0;
	var yazarAdi = "";
	
	for(i=0;i<entrySayisi;i++)
	{
		entryID  = entryListesi[i].id;
		
		yazarAdi = document.getElementById(entryID).getElementsByClassName('yazar_tarih')[0].getElementsByTagName('a')[1].getAttribute("href");
		yazarAdi = yazarAdi.replace("/","").replace(/-/g, " ");			// yazaradi = "yanak kafasi"; seklinde
		if(isposer(yazarAdi))
		{
			document.getElementById(entryID).style.listStyle = "none";
			document.getElementById(entryID).innerHTML = "";
		}
	}
}

function isposer(kim)
{
	poserList = localStorage.getItem("headbangersposer");
	if(poserList.indexOf("|" + kim + "|")>-1)
	{
		return true;
	}
}

function poserButon()
{
	var tableSayisi = document.body.innerHTML.split(/<table/g).length-1;		// sayfada kaç tane entry olduğunu öğren
	var tableListesi = document.getElementsByTagName('table');	// table tag'leri al
	var mevcutTable = tableListesi[0];							// ilk table
	var k=0;
	var yazarAdi = "";
	
	for(k=0;k<tableSayisi;k++)
	{
		mevcutTable = tableListesi[k];
		myId = tableListesi[k].id;

		if(myId.substr(0,1)=="t")
		{
			var yazarAdi = (document.getElementById("li_" + myId.replace("t","")).getElementsByClassName('yazar_tarih')[0].getElementsByTagName('a')[1].getAttribute("href")).replace("/","").replace(/-/g, " ");			// yazaradi = "yanak kafasi"; seklinde

		//alert("id="+myId+" / adi="+yazarAdi);
			var yazarposerbtn = document.createElement("td");			// yazar entryleri icin td'yi olustur
			yazarposerbtn.onmousedown = "this.id='butDown'";
			yazarposerbtn.onmouseout  = "this.id=''";
			yazarposerbtn.onmousemove = "this.id='butOver'";
			yazarposerbtn.setAttribute("class","linkler");
			yazarposerbtn.innerHTML = "<a href=\"javascript:funposerYap('" + yazarAdi + "');\">poser</a>";
			
			document.getElementById(myId).getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].appendChild(yazarposerbtn);
		}
	}
}

function funSwfGom()
{
	var linkSayisi  = document.body.innerHTML.split(/<a /).length-1;
	var linkListesi = document.getElementsByTagName("a");
	var mevcutLink  = linkListesi[0];
	var i=0;
	var rastgele=Math.floor(Math.random()*9999);
	var gomuluResim = "";
	for(i=0;i<linkSayisi;i++)
	{
		mevcutLink = linkListesi[i];
		if(mevcutLink.href.indexOf(".swf")>-1  && linkListesi[i-1].id!=rastgele && mevcutLink.href.substr(-1)!="/" && mevcutLink.href.indexOf(location.hostname)==-1)
		{
			rastgele=Math.floor(Math.random()*9999);
			mevcutLink.id = rastgele;
			mevcutLink.target = "blank";
			mevcutLink.rel = "nofollow";
			gomuluResim = mevcutLink.href + '<a href="javascript:swfGizleGoster(\'' + rastgele +'\', \'' + mevcutLink.href + '\')">' +
			"<img src=\"http://www.sozlukspot.com/res/img.png\" height=\"10\" width=\"10\" border=\"0\" /></a>";
			mevcutLink.innerHTML = gomuluResim;
		}
	}
}

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function detectBrowser() {
	if (navigator.userAgent.match(/firefox/i))
		return "firefox";
	else if (navigator.userAgent.match(/chrome/i))
		return "chrome";
	else if (navigator.userAgent.match(/opera/i))
		return "opera";
	else
		return "unknown";
}

function updateKontrol() {
//	if(bugun - localStorage.getItem("headbangersUpdate") > 86400000 || localStorage.getItem("headbangersUpdate")==null)	// 86400000 = 24 * 60 * 60 * 1000ms = 1 gun
//	{
	var tarayici = detectBrowser();
	if(tarayici!="opera")									// chrome veya firefox ise
	{
		localStorage.setItem("headbangersUpdate", bugun);
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/113168.meta.js',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				if(responseDetails.status == "200")
				{
					gelenCevap = responseDetails.responseText;
					var guncelVersion = gelenCevap.split("@version")[1].split("@author")[0].replace("//", "").replace("\r\n", "").replace(/ /g, "");
					if(guncelVersion != mevcutVersion)
					{
						baslikAdres = "http://userscripts.org/scripts/show/113168";
						//alert("Sizin surumunuz " + mevcutVersion + " ve son surum " + guncelVersion);
						var guncellebtn = document.createElement('td');
						guncellebtn.onmousedown="this.id='butDown'";
						guncellebtn.onmouseout ="this.id=''";
						guncellebtn.onmousemove="this.id='butOver'";
						guncellebtn.setAttribute("class","linkler");
						guncellebtn.setAttribute("title","güncelleme var");
						guncellebtn.innerHTML="<a href='" + baslikAdres + "' target='sportakisim' id='guncelleme'>güncelleme var</a>";
						document.getElementsByTagName("tr")[1].appendChild(guncellebtn);
					}
				}
			}
		});
	}
	//}
}

function funBaslikSabitle()
{
		var baslik = document.getElementsByTagName("h1")[0];
		sabitBaslik = baslik;
		var usttenBosluk = parseInt(baslik.offsetTop) + parseInt(baslik.offsetHeight);
		sabitBaslik.id = "baslik_text";
		sabitBaslik.style.position = "fixed";
		sabitBaslik.style.zIndex = "100";
		sabitBaslik.style.top = "0";
		sabitBaslik.style.left = "0";
		sabitBaslik.style.margin = "0";
		sabitBaslik.style.paddingTop = "0.3em";
		sabitBaslik.style.paddingRight = "0.3em";
		sabitBaslik.style.paddingBottom = "0.3em";
		document.body.style.paddingTop = (usttenBosluk+5)+"px";
		var bg = window.getComputedStyle(baslik, null).getPropertyValue("background-color");
		if (bg.match(/(transparent|rgba)/i)) {
			setTimeout(function() { 
				sabitBaslik.style.backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");
			}, 2000);
		}
		var asilPadLeft = window.getComputedStyle(baslik, null).getPropertyValue("padding-left");
		if (asilPadLeft.match(/^0(px|em|pt)$/))
			sabitBaslik.style.paddingLeft = "8px";
		else 
			sabitBaslik.style.paddingLeft = asilPadLeft; 
}

function sorguYap(adres)
{
	var sorgu = new XMLHttpRequest();
	sorgu.open("GET", adres, true);
	sorgu.onreadystatechange = function(){
		if(sorgu.readyState == 4)
		{
			var gelenCevap = sorgu.responseText;
			alert(gelenCevap);
		}
	}
	sorgu.send(null);
}

function funEtGetir()
{
	var entryListesi = document.body.getElementsByTagName("li");
	var entrySayisi  = document.body.innerHTML.split(/<li /g).length - 1;
	var sayfaBaslik  = document.title.replace("headbangers sozluk - ", "").replace(" - headbangers sozluk", "");
	sayfaBaslik      =    sayfaBaslik.replace("headbangers sözlük - ", "").replace(" - headbangers sözlük", "");
	for(var i=0; i<entrySayisi; i++)
	{
		if(entryListesi[i].innerHTML.indexOf("@")>-1)
		{
			var etSayisi = etSec(entryListesi[i].innerHTML).length - 1;
			etList = etSec(entryListesi[i].innerHTML);
			for(var k=0; k<=etSayisi; k++)
			{
				entryListesi[i].innerHTML = entryListesi[i].innerHTML.replace(etList[k], '<a href="javascript:etGoster(\'' + etList[k].replace("@","") + '\', \'' + sayfaBaslik + '\');">__AT__' + etList[k].replace("@","") +'</a>');
			}
			entryListesi[i].innerHTML = entryListesi[i].innerHTML.replace(/__AT__/g, "@");
		}
	}
}

function etSec(ne)
{
	ne = ne.split("<div")[0];

	var sonuc = []; 
	for(var i=0; i<ne.length; i++)
	{
		if(ne.substr(i, 1)=="@" && IsNumeric(ne.substr(i+1, 1)))
		{
			var k = 1;
			while(k)
			{
				if(!IsNumeric(ne.substr(i+k, 1)))
				{
					sonuc.push(ne.substr(i, k));
					k=0;
				} else k++;
			}
		}
	}
	return sonuc;
}

function IsNumeric(input){
  var RE = /^-?(0|INF|(0[1-7][0-7]*)|(0x[0-9a-fA-F]+)|((0|[1-9][0-9]*|(?=[\.,]))([\.,][0-9]+)?([eE]-?\d+)?))$/;
  return (RE.test(input));
}

function funSonBesGuncelle(){
	tempSonBes = localStorage.getItem("headbangersSonBes");
	tempBolunmus = tempSonBes.split("|");
		
	if(tempSonBes.split("|").length-1==6)
	{		
		if(tempSonBes.indexOf("|" + baslikAdi + "|")==-1)
		{
			tempSonBes = "|";
			for(i=1;i<5;i++)
			{
				tempSonBes += tempBolunmus[i] + "|";
			}
			tempSonBes = "|" + baslikAdi + tempSonBes;
		}
		else
		{
			tempSonBes = "|";
			for(i=1;i<6;i++)
			{
				if(tempBolunmus[i]==baslikAdi) mevcutSira=i;
			}
			
			for(i=1;i<6;i++)
			{
				if(i!=mevcutSira) tempSonBes += tempBolunmus[i] + "|";
			}
			tempSonBes = "|" + baslikAdi + tempSonBes;
		}
	}
	
	localStorage.setItem("headbangersSonBes", tempSonBes);
}
Because it's your web

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy