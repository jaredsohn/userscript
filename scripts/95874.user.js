// ==UserScript==
// @name           Konduktor
// @description    Konduktor 
// @namespace      http://userscripts.org/users/228522
// @version        1.1
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://antik.eksisozluk.com/cc.asp?sec=ad*
// ==/UserScript==

	
var browser;
var debug =0;
var secenek = "gecsimdilik";
var gerekceStatus = false;

var Veriler = {
        gecsimdilik : 0,
        albunu : 0,
		ucur : 0,
		yasakliListesi : ["dedigim", "dediğim", "dedirten", "düsündüren", "düşündüren", 
                      "düsündürten", "düşündürten", "dedirt", "demek istedigim", 
                      "demek istediğim", "diye sormak istedigim", "diye sormak istediğim", 
                      "diye düsünmekten kendimi alamadigim", "diye düşünmekten kendimi alamadığım", 
                      "demek istedigim", "demek istediğim", "diye söylemek istedigim", 
                      "diye söylemek istediğim", "diye söylettiren", "diye sorduran", 
                      "diye düsündüren", "diye düşündüren", "diye düsündürten", 
                      "diye düşündürten", "dedirten başlık", "dedirten baslik", "baslik","başlık"],
    sebepListesi : ["anket başlığa/başlıklara girdiği entry'yi/entry'leri temizlemesi geriyor.",
                    "içeriği başlıkla uyumlu olmayan entry'yi/entry'leri düzeltmesi gerekiyor.",
                    "sadece bkz'dan ibaret olan entry'yi/entry'leri düzeltmesi gerekiyor.",
                    "zayıf entry profili"],                        
    yazarListesi : [],
    tempLinkListesi : []                  
}

function xpath(xpath, element) {
      if (!element)
          element = document;
      return document.evaluate(xpath, element, null,
                               XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function idGet(id) {
        return document.getElementById(id);
}

function gecSimdilikKapat() {
    idGet("gecsimdiliknote").style.display = "none";
}
function yasakliDropDownListesi() {
        var list = "";
        for (var yasakli in Veriler.yasakliListesi) {
            list += "<option value='"+escape(Veriler.yasakliListesi[yasakli])+"'>"+Veriler.yasakliListesi[yasakli]+"</option>";
        }
        return list;
}

function yazarDropDownListesi() {
        var list = "<option></option>";
        for (var yazar in Veriler.yazarListesi) {
            list += "<option value='"+Veriler.yazarListesi[yazar]+"'>"+Veriler.yazarListesi[yazar]+"</option>";
        }
        return list;
}

function sebepDropDownListesi() {
        var list = "<option></option>";
        for (var sebep in Veriler.sebepListesi) {
            list += "<option value='"+escape(Veriler.sebepListesi[sebep])+"'>"+Veriler.sebepListesi[sebep]+"</option>";
        }
        return list;
}

function yasakliEkle(yeniYasakli) {
        tumVerileriYukle();
        for (var i=0; i<Veriler.yasakliListesi.length; i++) {
            if (Veriler.yasakliListesi[i] == yeniYasakli) {
                return false; // Yasakli kelime oldugu biliniyormus zaten...
            }
        }
        Veriler.yasakliListesi.push(yeniYasakli);
        tumVerileriKaydet();
        if (debug) EppAPI_log("Kelime '" + yeniYasakli + "' yasakli kelimelere Eklendi!");
        return true;
}

function sebepEkle(yeniSebep) {
        tumVerileriYukle();
        for (var i=0; i<Veriler.sebepListesi.length; i++) {
            if (Veriler.sebepListesi[i] == yeniSebep) {
                return false; // Yasakli kelime oldugu biliniyormus zaten...
            }
        }
        Veriler.sebepListesi.push(yeniSebep);
        tumVerileriKaydet();
        if (debug) EppAPI_log("Kelime '" + yeniSebep + "' sebeplere Eklendi!");
        return true;
}

function yazarBul() {
    tumVerileriYukle();
    for (var link in Veriler.tempLinkListesi) {
        var adres = Veriler.tempLinkListesi[link]; // Baslik yonlendirmeye hayir! 
        var req =  new XMLHttpRequest();
        req.open("GET", adres, true);
        req.onreadystatechange = function () {
            if (this.readyState == 4) {
                var baslikDoc = document.createElement("div");
                baslikDoc.innerHTML = req.responseText;
                var girdiler = xpath(".//ol/li/div/a", baslikDoc);
                if (girdiler.snapshotLength == 1) {
                    var ilkSuser = girdiler.snapshotItem(0).innerHTML;
                    Veriler.yazarListesi.push(ilkSuser);
                } else {
                    if (debug) EppAPI_log("Baslik Bos Cikti: " + adres);
                }
                Veriler.tempLinkListesi = new Array();
                tumVerileriKaydet();
            }
        };
        req.send(null);
    }
}

function yasakliCikar(eskiYasakli) {
    tumVerileriYukle();
    var yeniYasaklilar = new Array();
    var j = 0;
    for (var i = 0; i < Veriler.yasakliListesi.length; i++) {
        if (Veriler.yasakliListesi[i] != eskiYasakli) {
            yeniYasaklilar[j++] = Veriler.yasakliListesi[i];
        }
    }
    Veriler.yasakliListesi = yeniYasaklilar;
    tumVerileriKaydet()
    
    if (debug) EppAPI_log("Kelime '" + eskiYasakli + "' Artik Yasakli Degil!");

    return yeniYasaklilar;
}

function sebepCikar(eskiSebep) {
    tumVerileriYukle();
    var yeniSebepler = new Array();
    var j = 0;
    for (var i = 0; i < Veriler.sebepListesi.length; i++) {
        if (Veriler.sebepListesi[i] != eskiSebep) {
            yeniSebepler[j++] = Veriler.sebepListesi[i];
        }
    }
    Veriler.sebepListesi = yeniSebepler;
    tumVerileriKaydet()
    
    if (debug) EppAPI_log("Cümle '" + eskiSebep + "' Artik Sebep Degil!");

    return yeniSebepler;
}

function detectBrowser() {
        if (navigator.userAgent.match(/firefox/i))
            return "firefox";
        else if (navigator.userAgent.match(/(chrome|opera)/i))
            return "chrome/opera";
        else
            return "unknown";
    }

    function KppAPI_setValue(name, value) {
        if (browser == "firefox") {
            GM_setValue(name, value);
        } else if (browser == "chrome/opera") {
            localStorage.setItem("__konduktorplusplus_" + name, value);
        }
    }

    function KppAPI_getValue(name, defval) {
        if (browser == "firefox") {
            return GM_getValue(name, defval);
        } else if (browser == "chrome/opera") {
            var ret = localStorage.getItem("__konduktorplusplus_" + name);
            return ((ret != null)?ret:defval);
        }
    }
	
	 function tumVerileriKaydet() {
        var verilerJson = JSON.stringify(Veriler);
        KppAPI_setValue("KPP_Veriler", verilerJson);
        if (debug) KppAPI_log("Tum veriler kaydedildi. JSON > " + verilerJson);
    }

     function tumVerileriYukle() {
        var verilerJson = KppAPI_getValue("KPP_Veriler", 0);
        if (verilerJson) { 
            var kayitliVeriler = JSON.parse(verilerJson);
            if (!kayitliVeriler.version || (Veriler.version != kayitliVeriler.version)) {
                Veriler = veriKaynastir(kayitliVeriler, Veriler);
                tumVerileriKaydet();
                KppAPI_log("Eski Veriler Yenileriyle Birlestirildi! Son JSON > " + JSON.stringify(Veriler));
            } else {
                Veriler = kayitliVeriler;
                if (debug) KppAPI_log("Tum veriler yuklendi. JSON > " + verilerJson);
            }
        } else {
            if (debug) KppAPI_log("Veri kaydi bulunamadi. Veriler aynen kaldi.");
        }
    }
	

	 function veriKaynastir(asil, yeni) {
        var kaynasik = asil || {};
        for (var elem in yeni) {
            if (typeof asil[elem] != "undefined") {
                if (typeof asil[elem] == "object" && asil[elem] != null)
                    kaynasik[elem] = veriKaynastir(asil[elem],yeni[elem]);
                else
                    kaynasik[elem] = asil[elem];
            } else {
                kaynasik[elem] = yeni[elem];
            }
        }
        return kaynasik;
    }
    
	
	
     function KppAPI_log(str) {
        if (browser == "firefox")
            GM_log(str);
        else if (browser == "chrome/opera")
            console.log("Konduktor++ >> " + str);
    }

function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) 

{

  // the highlightStartTag and highlightEndTag parameters are optional

  if ((!highlightStartTag) || (!highlightEndTag)) {

    highlightStartTag = "<del style='text-decoration:underline;'>";

    highlightEndTag = "</del>";

  }

  

  // find all occurences of the search term in the given text,

  // and add some "highlight" tags to them (we're not using a

  // regular expression search, because we want to filter out

  // matches that occur within HTML tags and script blocks, so

  // we have to do a little extra validation)

  var newText = "";

  var i = -1;

  var lcSearchTerm = searchTerm.toLowerCase();

  var lcBodyText = bodyText.toLowerCase();

    

  while (bodyText.length > 0) {

    i = lcBodyText.indexOf(lcSearchTerm, i+1);

    if (i < 0) {

      newText += bodyText;

      bodyText = "";

    } else {

      // skip anything inside an HTML tag

      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {

        // skip anything inside a <script> block

        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {

          newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;

          bodyText = bodyText.substr(i + searchTerm.length);

          lcBodyText = bodyText.toLowerCase();

          i = -1;

        }

      }

    }

  }

  

  return newText;

}





/*

 * This is sort of a wrapper function to the doHighlight function.

 * It takes the searchText that you pass, optionally splits it into

 * separate words, and transforms the text on the current web page.

 * Only the "searchText" parameter is required; all other parameters

 * are optional and can be omitted.

 */

function highlightSearchTerms(searchArray, treatAsPhrase, warnOnFailure, highlightStartTag, highlightEndTag)

{

  // if the treatAsPhrase parameter is true, then we should search for 

  // the entire phrase that was entered; otherwise, we will split the

  // search string so that each word is searched for and highlighted

  // individually

  /*if (treatAsPhrase) {

    searchArray = [searchText];

  } else {

    searchArray = searchText.split("-");

  } */

  

  if (!document.body || typeof(document.body.innerHTML) == "undefined") {

    if (warnOnFailure) {

      alert("Sorry, for some reason the text of this page is unavailable. Searching will not work.");

    }

    return false;

  }


  var bodyText = document.body.innerHTML;

  for (var i = 0; i < searchArray.length; i++) {

    bodyText = doHighlight(bodyText, searchArray[i], highlightStartTag, highlightEndTag);

  }

  document.body.innerHTML = bodyText;

  return true;

}

//entry sayisi
function entrynumber() {
     var ampul = xpath("//li[@class='ampul']").snapshotLength;
     var o = document.getElementsByTagName('li').length - ampul;
     var u = document.getElementsByTagName('small')[0];
     u.innerHTML = u.innerHTML + "<br><br>Entry Sayisi:<span class=\"title\" style=\"font-size:small;\">" + o + "</span>"; 
}

function moderasyontar() 
{
     var o = document.getElementsByTagName('b')[0];
     if (o.innerHTML.match(/moderasyon tarih(.*)/))  {
     var str= " \"<span  class=\"title\" style=\"font-size:smaller;\">\ caylaklara en fazla bir defa gec simdilik sansi verilir</span>\"";
      o.innerHTML = o.innerHTML + str;
      }
}

function updater()
{
  var vtabsel = xpath("//td[@class='vtabsel']").snapshotItem(0);
  var guncelleTab = document.createElement("tr");
  guncelleTab.innerHTML = '<td class="vtab"><div><a href="http://userscripts.org/scripts/source/95874.user.js" target="_blank">K++ guncelle</a></div></td>';

  var ayarlarTab = document.createElement("tr");
  var ayarlarDiv = document.createElement("div");
  var ayarlarTd = document.createElement("td");
  ayarlarTd.className = "vtab";
  var ayarlarTusu = document.createElement("a");
  ayarlarTusu.innerHTML = "K++ ayarlari";
  ayarlarTusu.addEventListener("click", ayarMenusunuGoster, true);
  ayarlarDiv.appendChild(ayarlarTusu);
  ayarlarTd.appendChild(ayarlarDiv);
  ayarlarTab.appendChild(ayarlarTd);
  vtabsel.parentNode.parentNode.insertBefore(guncelleTab, vtabsel.parentNode.nextSibling);
  vtabsel.parentNode.parentNode.insertBefore(ayarlarTab, vtabsel.parentNode.nextSibling);
}

//adding search button
function addbutton() {
    var o = document.getElementsByTagName('li');
    u = o.length;
    u = u-1;
	
		/*
	while(u>=0) 
    {
		var keyword = o[u].innerHTML.replace(/\n|<.*?>/g,'');
     	 keyword_first = keyword.substring(0,55);
		 var myrand= getrandomnumber(55,keyword.length);
		 keyword_rand = keyword.substring(myrand,myrand+55);

		    var ara_but = document.createElement('button');
			ara_but.className = "but";
            ara_but.title = "ilk 100 karakteri ara";
            ara_but.innerHTML = "ara";
            ara_but.style.cssFloat = "left";
			ara_but.style.marginLeft = "5px";
            ara_but.style.marginTop = "5px";
			ara_but.style.marginBottom = "5px";
            ara_but.style.paddingLeft = "0.5em";
            ara_but.style.paddingRight = "0.3em";
			
			ara_but.addEventListener("click", (function(keyword_first) {
                return function() {
  						window.open("http://www.google.com.tr/search?q=" + keyword_first, "_blank");
     
                }
            })(keyword_first),true);
			o[u].innerHTML += "<br />";
			o[u].appendChild(ara_but);
			
	 if(keyword.length > 300) {
		    var rand_but = document.createElement('button');
			rand_but.className = "but";
            rand_but.title = "kismet";
            rand_but.innerHTML = "rastgele ara";
            rand_but.style.cssFloat = "left";
			rand_but.style.marginLeft = "5px";
            rand_but.style.marginTop = "5px";
			rand_but.style.marginBottom = "5px";
            rand_but.style.paddingLeft = "0.5em";
            rand_but.style.paddingRight = "0.3em";
			
			rand_but.addEventListener("click", (function(keyword_rand) {
                return function() {
  						window.open("http://www.google.com.tr/search?q=" + keyword_rand, "_blank");
     
						
						
                }
            })(keyword_rand),true);
			
			o[u].appendChild(rand_but);
	 }

     u=u-1;         
    }
	*/

    while(u>=0) 
    {
     var keyword = o[u].innerHTML.replace(/\n|<.*?>/g,'');
     keyword_first = keyword.substring(0,55);
	 /*keyword'e ayar veriyoruz, kelime ortasından kesmesini engelliyoruz*/
	 var kwlen=keyword_first.length-1;
	 while(kwlen>=0)
	 {
		if(keyword_first[kwlen] == ' ') break;
		kwlen--;
	}
    keyword_first= keyword_first.substring(0,kwlen);

	 
	 var myrand= getrandomnumber(55,keyword.length-70);
	 keyword_rand = keyword.substring(myrand,myrand+70);
	 /*keyword'e ayar veriyoruz, kelime ortasından kesmesini engelliyoruz*/
	 var rndlen2=keyword_rand.length-1;
	 while(rndlen2>=0)
	 {
		if(keyword_rand[rndlen2] == ' ') break;
		rndlen2--;
	}
	var rndlen = 0;
	while(rndlen<keyword_rand.length)
	 {
		if(keyword_rand[rndlen] == ' ') break;
		rndlen++;
	}
    keyword_rand= keyword_rand.substring(rndlen,rndlen2);
	 
     str = "<a class='but' target='blank' ";  
     str += "href=\"http://www.google.com.tr/search?q=";
     
	 str_first = str + encodeURIComponent(keyword_first);
     str_first += "\" title='ilk 55 karakteri ara'>&nbsp;ara&nbsp;</a>";
	 
	 str_rand = str + encodeURIComponent(keyword_rand);
     str_rand += "\"title='kismet'>&nbsp;rastgele ara&nbsp;</a>";
	 
	 if(keyword.length < 300) str_rand = "";
     o[u].innerHTML = o[u].innerHTML + "<br />&nbsp;" + str_first + "&nbsp;" + str_rand;
     u=u-1;         
	}

}

function getrandomnumber(_min,_max)
{
	var rand = Math.floor(Math.random()*_max); 
	if(rand<=_min) rand = _min + 1;
	
	return rand;
	
}

function getSelText_1()
{
	
	if(window.getSelection())
	{
		return window.getSelection();
	}
	if(top.sozmain.getSelection())
	{
		return top.sozmain.getSelection();
	}
	else if(top.sozmain.selection())
	{
		return top.sozmain.document.selection().createRange().text;	
	}
	else return -1;
}

function getSelText()
{
	var selected = document.getSelection();
	if(selected == '') return null;
	else return selected;
	
}

function gecmeNotuDuzenle() {
    var gecsimdilikNotu = idGet("genotetxt");
    var j = 1;
    gecsimdilikNotu.value = "";
    var gecsimdilikChecks = xpath("//input[@kpp='kpp_gecsimdilik']");
    for (var i = 0; i < gecsimdilikChecks.snapshotLength; i++) {
        var currElem = gecsimdilikChecks.snapshotItem(i);
        if (currElem.checked) {
            gecsimdilikNotu.value += j+"- "+unescape(currElem.value) + " ";
            j++;
        }
    }
}

function addSebepDD() {
  
  var gecsimdilikNotu = idGet("genotetxt");
  var gerekceDiv = document.createElement("div");
  gerekceDiv.style.paddingLeft = "20px";
  for (var i = 0; i < Veriler.sebepListesi.length; i++) {
      var sebepCB = document.createElement("input");
      sebepCB.id = "kppGerekce_"+i;
      sebepCB.setAttribute("kpp","kpp_gecsimdilik");
      sebepCB.type = "checkbox";
      sebepCB.className = "checkbox";
      sebepCB.value = escape(Veriler.sebepListesi[i]);
      sebepCB.addEventListener("click", function() {
          gecmeNotuDuzenle();
      }, true);
      gerekceDiv.appendChild(sebepCB);

      var labelCB = document.createElement("label");
      labelCB.innerHTML = Veriler.sebepListesi[i];
      labelCB.setAttribute("for","kppGerekce_"+i);
      gerekceDiv.appendChild(labelCB);
      gerekceDiv.appendChild(document.createElement("br"));
  }
  gecsimdilikNotu.parentNode.insertBefore(document.createElement("br"),gecsimdilikNotu);
  gecsimdilikNotu.parentNode.insertBefore(gerekceDiv,gecsimdilikNotu);
}

function add_baslik_button() 
{
	var o = document.getElementsByTagName('b');
	var myli = document.getElementsByTagName('li');
    var u = o.length;
    u = u-1;
	var myli_u= myli.length-1;
	
	
    while(u>=0) //moderasyon tarihcesi de bold olarak ayarlanmis, onu almiyoruz
    {
           if (!o[u].innerHTML.match(/moderasyon tarih(.*)/)) {
			var btitle = o[u].getElementsByTagName('a')[0].innerHTML;
		    var basliktaara_but = document.createElement('button');
			basliktaara_but.className = "but";
            basliktaara_but.title = "aramaya inanmayan caylak bizden degildir";
            basliktaara_but.innerHTML = "baslikta ara";
            basliktaara_but.style.cssFloat = "rsght";
            basliktaara_but.style.marginLeft = "5px";
            basliktaara_but.style.marginTop = "5px";
			basliktaara_but.style.marginBottom = "5px";
           /* basliktaara_but.style.paddingLeft = "0.5em";
            basliktaara_but.style.paddingRight = "0.3em"; */
			

            basliktaara_but.addEventListener("click", (function(btitle) {
                return function() {
					
					if(!getSelText()) alert('iyi, guzel, hos da ne arayacagiz?');
					else {
  						 window.open("show.asp?t="+encodeURIComponent(btitle)+"&kw="+getSelText(), "_blank");
       					 
						}
						
                }
            })(btitle),true);
			//moderasyon tarihçesi çıkınca sorun oluyordu, düzelttik
			 
			myli[myli_u].appendChild(basliktaara_but);
		   }
     u=u-1;   
	 myli_u -=1;
    }
}

function ayarMenusuDerki(msg,box) {
        if (!ayarMessageBoxes) {
            ayarMessageBoxes = new Array();
            ayarMessageBoxes[0] = idGet("epp_messageBox0");
            ayarMessageBoxes[1] = idGet("epp_messageBox1");
            ayarMessageBoxes[2] = idGet("epp_messageBox2");
            ayarMessageBoxes[3] = idGet("epp_messageBox3");
            ayarMessageBoxes[4] = idGet("epp_messageBox4");
            ayarMessageBoxes[5] = idGet("epp_messageBox5");
            ayarMessageBoxes[6] = idGet("epp_messageBox6");
            ayarMessageBoxes[7] = idGet("epp_messageBox7");
        }
        ayarMessageBoxes[(typeof box != "undefined")?box:1].innerHTML = msg;
}

// EKSI++ AYAR MENUSU
    function ayarMenusunuGoster() {
        tumVerileriYukle();
        var panelKutusu = idGet("kpp_ayarPaneli");
            
        if (panelKutusu) {
            panelKutusu.style.display = "";
            //Sayfayi basa cekelim en azindan
            window.scrollTo(0,0);
            return;
        }
        
        panelKutusu = document.createElement("div");
        panelKutusu.id = "kpp_ayarPaneli";
        panelKutusu.style.display = "none";
        panelKutusu.style.position = "relative";
        panelKutusu.style.top = "0";
        panelKutusu.style.left = "0";
        panelKutusu.style.width = "100%";
        panelKutusu.style.height = "100%";
        panelKutusu.style.backgroundAttachment = window.getComputedStyle(document.body, null).getPropertyValue("background-attachment");
        panelKutusu.style.backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");
        panelKutusu.style.backgroundImage = window.getComputedStyle(document.body, null).getPropertyValue("background-image");
        panelKutusu.innerHTML = ""+
        "<h1 class='title' style='text-align:center;'><a><b>Konduktor++ Ayar Paneli</b></a></h1>"+
        "<div style='padding: 2em;'>"+
        "<div id='epp_messageBox1' style='text-align:center;' tabindex='-1'>&nbsp;</div>"+
        "<fieldset style='padding-left:1em;'>"+
            "<legend><b>| Istenmeyen Kelimeler |</b></legend>"+
            "<br/>"+
            "Istenmeyen kelimelere <b>ekle</b> <input id='epp_yasakliEkleVal' type='text' style='min-width: 20em;'> <button class='but' id='epp_yasakliEkleBut'>Ekle</button><br/><br/>"+
            "Istenmeyen kelimelerden <b>sil</b> <select id='epp_yasakliSilDD' style='min-width: 20em;'>"+yasakliDropDownListesi()+"</select> <button class='but' id='epp_yasakliSilBut'>Sil</button><br/><br/>"+
        "</fieldset><br/>"+
        "<div id='epp_messageBox2' style='text-align:center;' tabindex='-1'>&nbsp;</div>"+
        "<fieldset style='padding-left:1em;'>"+
            "<legend><b>| Geç Şimdilik Gerekçeleri |</b></legend>"+
            "<br/>"+
            "Gerekçelere <b>ekle</b> <input id='epp_sebepEkleVal' type='text' style='min-width: 20em;'> <button class='but' id='epp_sebepEkleBut'>Ekle</button><br/><br/>"+
            "Gerekçelerden <b>sil</b> <select id='epp_sebepSilDD' style='min-width: 20em;'>"+sebepDropDownListesi()+"</select> <button class='but' id='epp_sebepSilBut'>Sil</button><br/><br/>"+
        "</fieldset><br/>"+
        
        "<div id='epp_messageBox3' style='text-align:center;' tabindex='-1'>&nbsp;</div>"+
        "<fieldset style='padding-left:1em;'>"+
            "<legend><b>| Onayladigim Yazarlar |</b></legend>"+
            "<br/>"+
            "<select id='epp_yazarDD' style='min-width: 20em;'>"+yazarDropDownListesi()+"</select> <br/><br/>"+
        "</fieldset><br/>"+
        "<div style='text-align:center;'><button class='but' id='epp_ayarlariKapatBut'>çok iyi de oldu, çok güzel iyi oldu tamam mi</button></div>"+
        "</div>"+
        "<br/>"+
        "<hr/>";
        
        document.body.insertBefore(panelKutusu, document.body.firstChild);
        var ayarlariKapatBut = idGet("epp_ayarlariKapatBut");
        var yasakliEkleVal = idGet("epp_yasakliEkleVal");
        var yasakliEkleBut = idGet("epp_yasakliEkleBut");
        var yasakliSilDD = idGet("epp_yasakliSilDD");
        var yasakliSilBut = idGet("epp_yasakliSilBut");
        
        var yazarDD = idGet("epp_yazarDD");
        
        var sebepEkleVal = idGet("epp_sebepEkleVal");
        var sebepEkleBut = idGet("epp_sebepEkleBut");
        var sebepSilDD = idGet("epp_sebepSilDD");
        var sebepSilBut = idGet("epp_sebepSilBut");

        ayarlariKapatBut.addEventListener("click", function(){ 
            window.location.reload();
        }, true);
        
        yasakliEkleBut.addEventListener("click", function(){ 
            tumVerileriYukle();
            yasakliEkle(yasakliEkleVal.value);
            ayarMenusuDerki("<b>"+yasakliEkleVal.value+"</b> yasaklilara <b>eklendi</b>!", 1);
            yasakliEkleVal.value = '';
            yasakliSilDD.innerHTML = yasakliDropDownListesi();
        }, true);
        
        yasakliSilBut.addEventListener("click", function(){ 
            tumVerileriYukle();
            if (yasakliSilDD.value) {
                yasakliCikar(unescape(yasakliSilDD.value));
                ayarMenusuDerki("<b>"+unescape(yasakliSilDD.value)+"</b> yasaklilardan <b>cikarildi</b>!", 1);
                yasakliSilDD.innerHTML = yasakliDropDownListesi();
            } else {
                alert("Hangi yasakli?");
            }
        }, true);
        
        yazarDD.addEventListener("change", function(){ 
            window.open("http://antik.eksisozluk.com/info2.asp?n="+encodeURIComponent(this.value),'_blank');
        }, true);
        
        sebepEkleBut.addEventListener("click", function(){ 
            tumVerileriYukle();
            sebepEkle(sebepEkleVal.value);
            ayarMenusuDerki("<b>"+sebepEkleVal.value+"</b> gerekçelere <b>eklendi</b>!", 2);
            sebepEkleVal.value = '';
            sebepSilDD.innerHTML = sebepDropDownListesi();
        }, true);
        
        sebepSilBut.addEventListener("click", function(){ 
            tumVerileriYukle();
            if (sebepSilDD.value) {
                sebepCikar(unescape(sebepSilDD.value));
                ayarMenusuDerki("<b>"+unescape(sebepSilDD.value)+"</b> gerekçelerden <b>cikarildi</b>!", 1);
                sebepSilDD.innerHTML = sebepDropDownListesi();
            } else {
                alert("Hangi gerekçe?");
            }
        }, true);
        
        
      
        panelKutusu.style.display = "";
        window.scrollTo(0,0);
    }

var ayarMessageBoxes;
browser= detectBrowser();
tumVerileriYukle();
//tumVerileriKaydet();
entrynumber();
addbutton();
highlightSearchTerms(Veriler.yasakliListesi);
moderasyontar();
updater();
add_baslik_button();
yazarBul();

var gecsimdiliklabel = document.getElementsByTagName("label")[0];
gecsimdiliklabel.innerHTML += " ( " + Veriler.gecsimdilik + " )";  

var albunulabel = document.getElementsByTagName("label")[1];
albunulabel.innerHTML += " ( " + Veriler.albunu + " )";  

var ucurlabel = document.getElementsByTagName("label")[2];
ucurlabel.innerHTML += " ( " + Veriler.ucur + " )";  

var gecsimdilikinput = document.getElementsByName("a")[0];
gecsimdilikinput.addEventListener("click", function(){ 
			secenek = "gecsimdilik";
        }, true);
addSebepDD();
var albunuinput = document.getElementsByName("a")[1];
albunuinput.addEventListener("click", function(){ 
			secenek = "albunu";
      gecSimdilikKapat();
        /*var entrynodes = document.getElementsByTagName("li");
        var entrynode = entrynodes[entrynodes.length-1].cloneNode(true);
        var butonlar = xpath(".//*[@class='but']", entrynode);
        for(var i = 0; i < butonlar.snapshotLength; i++) {
            entrynode.removeChild(butonlar.snapshotItem(i));
        }
        var titlenode = document.getElementsByTagName("b");
        var entrytext = entrynode.innerText || entrynode.textContent;
        var titletext = titlenode[titlenode.length-1].innerText || titlenode[titlenode.length-1].textContent;
        Veriler.tempLinkListesi.push("http://antik.eksisozluk.com/show.asp?t="+encodeURIComponent(titletext)+"&kw="+encodeURIComponent(entrytext));
        tumVerileriKaydet(); */
        }, true);

var ucurinput = document.getElementsByName("a")[2];
ucurinput.addEventListener("click", function(){ 
      gecSimdilikKapat();
			secenek = "ucur";
        }, true);


var inputs = document.getElementsByTagName("input");
var v = inputs.length-1;

while(v>=0) {
if(inputs[v].value == 'hallet')
break;
v--;
}

var halletinput = inputs[v];


halletinput.addEventListener("click", function(){ 
       if (secenek == "gecsimdilik") Veriler.gecsimdilik += 1;
		   else if(secenek == "albunu") {
        var entrynodes = document.getElementsByTagName("li");
        var entrynode = entrynodes[entrynodes.length-1].cloneNode(true);
        var butonlar = xpath(".//*[@class='but']", entrynode);
        for(var i = 0; i < butonlar.snapshotLength; i++) {
            entrynode.removeChild(butonlar.snapshotItem(i));
        }
        var titlenode = document.getElementsByTagName("b");
        var entrytext = entrynode.innerText || entrynode.textContent;
        var titletext = titlenode[titlenode.length-1].innerText || titlenode[titlenode.length-1].textContent;
        Veriler.tempLinkListesi.push("http://antik.eksisozluk.com/show.asp?t="+encodeURIComponent(titletext)+"&kw="+encodeURIComponent(entrytext));
         //Veriler.tempLinkListesi.push("http://antik.eksisozluk.com/show.asp?t=viski&kw=in+the+jar%27d%C4%B1r.+ho%C5%9Fgelmi%C5%9Ftir.");
         Veriler.albunu += 1;
       }
		   else if(secenek == "ucur") Veriler.ucur += 1;
			//mylbl.innerHTML += "("+ Veriler.gecsimdilik +")";
			//alert(Veriler.gecsimdilik);
		   tumVerileriKaydet();
		   
        }, true);