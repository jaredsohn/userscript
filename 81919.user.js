// ==UserScript==
// @name           Eksi++
// @description    Turlu cinliklerle Eksi Sozluk'u guzellestirme aparati. Donuz dusmani!
// @namespace      http://userscripts.org/users/ntpl
// @version        0.5
// @author         ntpl
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://sozluk.sourtimes.org/*
// @include        http://www.eksisozluk.com/*
// @include        http://eksisozluk.com/*
// ==/UserScript==

/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

function EksiPlusPlus() {
//--// META DATA //--//
    var meta = {
        id : "75945", //Eksi++ USO:ID
        //id : "77516",   //EppDev USO:ID
        version : "0.5",
        branch : "eksi++",
    };

//--// AYARLAR //--//

    // Kullanici Ayarlari
    var Ayarlar = {
        // Ayar Surumu
        version : meta.version,

        // Eksi++ Mesaj Kutusu
        eppMesajKutusu: 0,
        
        // Donuz Sistemi Ayarlari
        donuzGirdileriniGizle : 1,
        donuzBasliklariniGizle : 1,
        donuzListesi : ["-liste bos kalmasin donuzu-"],
        
        // Senkronizasyon
        eppDonuzSyncID: 0,
        
        // Baslik Filtresi Ayarlari
        yasakliBasliklariGizle : 1,
        yasakliRegexListesi : ["-liste bos kalmasin yasaklisi-"],
        
        // Spoiler Ayarlari
        spoilerGizle : 1,
        dilBilgisi : {
            spoilerAcma : 'göster',
            spoilerKapama : 'kapat',
        },
        
        // Ozel Tema Ayarlari
        ozelTema : '',
        ozelTemaListesi : {},
        
        // Diger Ayarlar
        hepFrameliSozluk : 0,
        sekmeDostuBaslik : 1,
        youtubeGomme : 1,
        resimGomme : 1,
        bkzGomme : 1,
        yariOtomatikDonBebegim : 1,
        baslikSabitleme : 1,
        kimdirNedirPopup : 1,
        benPopup : 1,
        ucNoktayiGeriGetir : 1,
    };
    
    var System = {
        storage : {
            ayarKaydi : "EPP_Ayarlar",

            //Icisleri Demirbaslari
            donBebegimGunu : "EPP_DonBebegimGunu",
            okunmusMesajListesi : "epp_okunmusMesajlar",
            solFrameReload : "epp_solFrameReload",
            runOnce : "epp_runOnce",
            
            //Guncelleme/Surum verisi
            sonKontrolGunu: "epp_lastUpdateCheckDay",
            isUpToDate : "epp_versionUpToDate",
            latestVersion : "epp_latestVersion",
        },
        
        hazirTemaListesi : {
            'her zamanki (ssg & clairvoyant)' : '',
            'beslenir ki bu (nihavent uvertur)' : 'http://static.sourtimes.org/css/bkb.css',
            'cok pis (carmilla)' : 'http://static.sourtimes.org/css/cokpis.css',
            'her zamanki enhanced (rotten)' : 'http://static.sourtimes.org/css/he.css',
            'absolut (soulforge)' : 'http://static.sourtimes.org/css/absolut.css',
            'obsessed with blue (clairvoyant)' : 'http://static.sourtimes.org/css/cressidablue.css',
            'diet coke (clairvoyant)' : 'http://static.sourtimes.org/css/dietcoke.css',
            'yesil limon eksiliginde sozluk (carmilla)' : 'http://static.sourtimes.org/css/yles.css',
            'ssg\'nin rengi (clairvoyant)' : 'http://static.sourtimes.org/css/ssg.css',
            'yigit ozgur de mi (pipican ve kukucan)' : 'http://static.sourtimes.org/css/yigitozgurdemi.css',
        },
    }

    // Program Degiskenleri
    var debug = 0;
    var kacKisiyiz = 0;
    var neredeKaldik = 0;
    var ayarMessageBoxes;

    var embedTemplates = {
        youtube : {
            width : 480,
            height : 360,
            html : '<object width="__EMBED-W__" height="__EMBED-H__">'+
                        '<param name="movie" value="http://www.youtube.com/v/__EMBED-ID__"></param>'+
                        '<param name="allowFullScreen" value="true"></param>'+
                        '<param name="allowscriptaccess" value="always"></param>'+
                        '<embed src="http://www.youtube.com/v/__EMBED-ID__" '+
                               'type="application/x-shockwave-flash" allowscriptaccess="always" '+
                               'allowfullscreen="true" width="__EMBED-W__" height="__EMBED-H__">'+
                        '</embed>'+
                    '</object>' 
        },
    };
    
//--// CROSS-BROWSER API //--//
// Supported: Firefox, Chrome
    var browser = detectBrowser();
    var logPrefix = "Eksi++ >> ";
    var localStoragePrefix = "__eksiplusplus_";
    var unsafeWindow = (browser == "firefox")?unsafeWindow:window;
    var topDocument = (browser == "firefox")?window.top.document:document;
    
    function detectBrowser() {
        if (navigator.userAgent.match(/firefox/i))
            return "firefox";
        else if (navigator.userAgent.match(/(chrome|opera)/i))
            return "chrome/opera";
        else
            return "unknown";
    }
    
    function EppAPI_log(str) {
        if (browser == "firefox")
            GM_log(str);
        else if (browser == "chrome/opera")
            console.log(logPrefix + str);
    }
    
    function EppAPI_addStyle(cssStr) {
        if (browser == "firefox") {
            GM_addStyle(cssStr);
        } else if (browser == "chrome/opera") {
            var newStyleElem = newElem("style");
            var head = document.getElementsByTagName('head')[0];
            if (!head) return;
            newStyleElem.type = 'text/css';
            try {
                newStyleElem.innerHTML = cssStr;
            } catch(x) {
                style.innerText = cssStr;
            }
            head.appendChild(newStyleElem);
        }
    }
    
    function EppAPI_setValue(name, value) {
        if (browser == "firefox") {
            GM_setValue(name, value);
        } else if (browser == "chrome/opera") {
            localStorage.setItem(localStoragePrefix + name, value);
        }
    }

    function EppAPI_getValue(name, defval) {
        if (browser == "firefox") {
            return GM_getValue(name, defval);
        } else if (browser == "chrome/opera") {
            var ret = localStorage.getItem(localStoragePrefix + name);
            return ((ret != null)?ret:defval);
        }
    }
    
    function EppAPI_runOnce(func, name) {
        //EppAPI_setValue(System.storage.runOnce, '{}');
        var runOnceList = JSON.parse(EppAPI_getValue(System.storage.runOnce, '{}'));
        //alert(JSON.stringify(runOnceList));
        if (!runOnceList[name]) {
            //Daha once cagrilmamis
            func();
            runOnceList[name] = 1;
            EppAPI_setValue(System.storage.runOnce, JSON.stringify(runOnceList));
        }
    }
    
    function EppAPI_JSONRequest(params) {
        var timedOut = 0;
        
        // This function is specifically for cross-domain JSON requests
        if (browser == "firefox") {
            // Firefox
            GM_xmlhttpRequest({
                url: params.url,
                method: params.method,
                data: "json="+params.data,
                headers: params.headers,
                onload: function(resp) {
                    params.onload(JSON.parse(resp.responseText));
                }
            });
        } else if (browser == "chrome/opera") {
            // Chrome (and possibly others)
            // Be Warned: Ugly Hack Ahead!
            // (Thanks to Chrome since it:
            //   - Prevents cross-domain XHR for user scripts
            //   - Prevents user scripts from accessing to *page's* window object)
            
            /*/
            setTimeout(function(){
                // Cevap zaten gelmisse (-1) timeout'a ne gerek var?
                if (timedOut != -1) {
                    if (confirm("Eksi++ bir sebeple proxy'den baslik verilerine ulasamadi!\n\n"+
                                "Basliklari donuzlar icin teker teker kontrol etmek ister misiniz?\n"+
                                "(NOT: Bu sekilde bir kontrol sozluk serverlarina ~50 fazladan sayfa talebi demektir)")) {
                        timedOut = 1;
                        params.onload(false);
                    }
                }
            }, 10*1000);
            //*/
            
			var url = params.url + "&json=" + params.data + "&callback=epp_jsonCallback";
			//EppAPI_log("JSON Data >> Data: " + params.data);
			//EppAPI_log("JSON Requesti >> URL: " + url);
            var reqScript = document.createElement('script');
            reqScript.setAttribute('src', url);
            var callbackScript = document.createElement('script');
            callbackScript.innerHTML = "function epp_jsonCallback(jsonStr) {"+
                //"console.log('RAW RESPONSE: ' + jsonStr);"+
                "document.getElementById('epp_jsonRespDiv').innerHTML = jsonStr;"+
            "}";
            var jsonRespDiv = document.createElement("div");
            jsonRespDiv.id = "epp_jsonRespDiv";
            jsonRespDiv.style.display = "none";
            jsonRespDiv.addEventListener ("DOMSubtreeModified", function(){
                //EppAPI_log("JSON Response >> JSON: " + this.innerHTML);
                if (timedOut) { 
                    EppAPI_log("Cevap pek gecikmis. Time-out olmus bile!");
                    return;
                }
                timedOut = -1; // Cevap geldigine gore artik timeout olmamali
                params.onload(JSON.parse(this.innerHTML));
                document.getElementsByTagName('body')[0].removeChild(jsonRespDiv);
                document.getElementsByTagName('head')[0].removeChild(reqScript);
                document.getElementsByTagName('head')[0].removeChild(callbackScript);
            }, true);
            document.getElementsByTagName('head')[0].appendChild(reqScript);
            document.getElementsByTagName('head')[0].appendChild(callbackScript);
            document.getElementsByTagName('body')[0].appendChild(jsonRespDiv);
        }
    }
    
//--// FONKSIYONLAR, ISLEMLER, EMEKCILER //-//
   
    // XPath wrapper
    function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    
    function isInList(what, list){
        for (var elem in list)
            if (list[elem] == what) return parseInt(elem);
        return -1;
    }
    
    function validate(input, type) {
        if (!type) type = "yazar";
        
        if (type == "yazar") {
            if (input.match(/^\s*$/)) 
                return false;
            else 
                return input.match(/^[a-z0-9 ]{0,40}$/);
        } else if (type == "css") {
            return input.match(/^\S+\.css$/i);
        }
    }
    
    function idGet(id) {
        return document.getElementById(id);
    }
    
    //Finds y value of given object
    function findYPos(elem) {
        var top = 0;
        if (elem.offsetParent) {
            do {
                top += elem.offsetTop;
            } while (elem = elem.offsetParent);
        }
        return top;
    }

    function isCurrentVersionOlderThan(targetVersion) {
        var currentAyarlar = EppAPI_getValue(System.storage.ayarKaydi, 0);
        if (!currentAyarlar) {
            return false;
        } else {
            currentAyarlar = JSON.parse(currentAyarlar);
            var cur_parts = currentAyarlar["version"].split('.');
            var tar_parts = targetVersion.split('.');
            var cur_len = cur_parts.length;
            var tar_len = tar_parts.length;
            var tar = cur = 0;
            for(var i = 0, len = (cur_len > tar_len ? cur_len : tar_len); i < len && tar == cur; ++i) {
                cur = +(cur_parts[i] || '0');
                tar = +(tar_parts[i] || '0');
            }
            return (tar !== cur) ? tar > cur : false;
        }
    }
    
    function newElem(type) {
        return document.createElement(type);
    }
    
    function newText(text) {
        return document.createTextNode(text);
    }
    
    function donuzDropDownListesi() {
        var list = "";
        for (var donuz in Ayarlar.donuzListesi) {
            list += "<option value='"+Ayarlar.donuzListesi[donuz]+"'>"+Ayarlar.donuzListesi[donuz]+"</option>";
        }
        return list;
    }

    function yasakliBaslikDropDownListesi() {
        var list = "";
        for (var i in Ayarlar.yasakliRegexListesi) {
            list += "<option value='"+Ayarlar.yasakliRegexListesi[i]+"'>"+Ayarlar.yasakliRegexListesi[i]+"</option>";
        }
        return list;
    }
    
    function hazirTemaDropDownListesi() {
        var list = "";
        for (tema in Ayarlar.ozelTemaListesi) {
            list += "<option value='"+Ayarlar.ozelTemaListesi[tema]+"' "+((Ayarlar.ozelTemaListesi[tema] == Ayarlar.ozelTema)?"selected='selected'":"")+">"+tema+"</option>";
        }
        for (tema in System.hazirTemaListesi) {
            list += "<option value='"+System.hazirTemaListesi[tema]+"' "+((System.hazirTemaListesi[tema] == Ayarlar.ozelTema)?"selected='selected'":"")+">"+tema+"</option>";
        }
        return list;
    }
    
    function seciliTemaIsmi() {
        for (tema in Ayarlar.ozelTemaListesi) {
            if (Ayarlar.ozelTemaListesi[tema] == Ayarlar.ozelTema)
                return tema;
        }
        for (tema in System.hazirTemaListesi) {
            if (System.hazirTemaListesi[tema] == Ayarlar.ozelTema)
                return tema;
        }
    }
    
    function ayarKaynastir(asil, yeni) {
        var kaynasik = asil || {};
        for (var elem in yeni) {
            if (typeof asil[elem] != "undefined") {
                if (typeof asil[elem] == "object" && asil[elem] != null)
                    kaynasik[elem] = ayarKaynastir(asil[elem],yeni[elem]);
                else
                    kaynasik[elem] = asil[elem];
            } else {
                kaynasik[elem] = yeni[elem];
            }
        }
        return kaynasik;
    }
    
    function tumAyarlariKaydet() {
        var ayarlarJson = JSON.stringify(Ayarlar);
        EppAPI_setValue(System.storage.ayarKaydi, ayarlarJson);
        if (debug) EppAPI_log("Tum ayarlar kaydedildi. JSON > " + ayarlarJson);
    }
    
    function tumAyarlariSifirla() {
        EppAPI_setValue(System.storage.ayarKaydi, 0);
        if (debug) EppAPI_log("Tum ayarlar Sifirlandi");
    }
    
    function tumAyarlariYukle() {
        var ayarlarJson = EppAPI_getValue(System.storage.ayarKaydi, 0);
        if (ayarlarJson) { 
            var kayitliAyarlar = JSON.parse(ayarlarJson);
            if (!kayitliAyarlar.version || (Ayarlar.version != kayitliAyarlar.version)) {
                Ayarlar = ayarKaynastir(kayitliAyarlar, Ayarlar);
                Ayarlar.version = meta.version;
                tumAyarlariKaydet();
                EppAPI_log("Eski Ayarlar Yenileriyle Birlestirildi! Son JSON > " + JSON.stringify(Ayarlar));
            } else {
                Ayarlar = kayitliAyarlar;
                if (debug) EppAPI_log("Tum ayarlar yuklendi. JSON > " + ayarlarJson);
            }
        } else {
            if (debug) EppAPI_log("Ayar kaydi bulunamadi. Ayarlar aynen kaldi.");
        }
    }
    
    // Donuz mu dedim
    function isDonuz(suser) {
        for (var i = 0; i < Ayarlar.donuzListesi.length; i++) {
            if (Ayarlar.donuzListesi[i].toLowerCase() == suser.toLowerCase())
                return true; // donuz dedi...
        }
        return false; // manda cikti!
    }

    function donuzCikar(eskiDonuz) {
        tumAyarlariYukle();
        var yeniDonuzlar = new Array();
        var j = 0;
        for (var i = 0; i < Ayarlar.donuzListesi.length; i++) {
            if (Ayarlar.donuzListesi[i] != eskiDonuz) {
                yeniDonuzlar[j++] = Ayarlar.donuzListesi[i];
            }
        }
        Ayarlar.donuzListesi = yeniDonuzlar;
        donuzlariKaydet();
        
        if (debug) EppAPI_log("Yazar '" + eskiDonuz + "' Artik Donuz Degil!");

        return yeniDonuzlar;
    }

    function donuzlariKaydet() {
        tumAyarlariKaydet();
        if (debug) EppAPI_log("Kaydedilecek Donuz Listesi: " + Ayarlar.donuzListesi);
    }

    function donuzEkle(yeniDonuz) {
        tumAyarlariYukle();
        for (var i=0; i<Ayarlar.donuzListesi.length; i++) {
            if (Ayarlar.donuzListesi[i] == yeniDonuz) {
                return false; // Donuz oldugu biliniyormus zaten...
            }
        }
        Ayarlar.donuzListesi.push(yeniDonuz);
        donuzlariKaydet();
        if (debug) EppAPI_log("Yazar '" + yeniDonuz + "' Donuzlara Eklendi!");
        return true;
    }
    
    function importDonuzList(jsonTxt) {
        var list = JSON.parse(jsonTxt);
        var added = new Array();
        for (var i in list) {
            if (donuzEkle(list[i])) {
                added.push(list[i]);
            }
        }
        return added;
    }
    
    function exportDonuzList() {
        return JSON.stringify(Ayarlar.donuzListesi);
    }
    
    function printEppDonuzSyncID() {
        if (Ayarlar.eppDonuzSyncID) {
            return "(Donuz SyncID: <b>"+Ayarlar.eppDonuzSyncID+"</b>)";
        } else {
            return "";
        }
    }
    
    function senkronEyle() {
        alert("senkron olmus say!");
    }
    
    function yasakliRegexCikar(eskiRegex) {
        tumAyarlariYukle();
        var yeniListe = new Array();
        var j = 0;
        for (var i = 0; i < Ayarlar.yasakliRegexListesi.length; i++) {
            if (Ayarlar.yasakliRegexListesi[i] != eskiRegex) {
                yeniListe[j++] = Ayarlar.yasakliRegexListesi[i];
            }
        }
        Ayarlar.yasakliRegexListesi = yeniListe;
        yasakliRegexleriKaydet();
        
        if (debug) EppAPI_log("Regex '" + eskiRegex + "' artik yasakli degil!");

        return yeniListe;
    }

    function yasakliRegexleriKaydet() {
        tumAyarlariKaydet();
        if (debug) EppAPI_log("Kaydedilecek Yasakli Regex Listesi: " + Ayarlar.yasakliRegexListesi);
    }

    function yasakliRegexEkle(yeniRegex) {
        tumAyarlariYukle();
        for (var i=0; i<Ayarlar.yasakliRegexListesi.length; i++) {
            if (Ayarlar.yasakliRegexListesi[i] == yeniRegex) {
                return false; // varmis onceden
            }
        }
        Ayarlar.yasakliRegexListesi.push(yeniRegex);
        yasakliRegexleriKaydet();
        if (debug) EppAPI_log("Regex '" + yeniRegex + "' artik yasakli!");
        return true;
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
        }
        ayarMessageBoxes[(typeof box != "undefined")?box:1].innerHTML = msg;
    }
    
    // EKSI++ AYAR MENUSU
    function ayarMenusunuGoster() {
        tumAyarlariYukle();
        var panelKutusu = idGet("epp_ayarPaneli");
            
        if (panelKutusu) {
            if (idGet("epp_sabitBaslik"))
                idGet("epp_sabitBaslik").style.position = "relative";
            panelKutusu.style.display = "";
            return;
        }
        
        panelKutusu = document.createElement("div");
        panelKutusu.id = "epp_ayarPaneli";
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
        "<h1 class='title' style='text-align:center;'><a><b>Eksi++ Ayar Paneli</b></a></h1>"+
        "<div style='padding: 2em;'>"+
        "<div id='epp_messageBox0' style='text-align:center;' tabindex='-1'>"+
            "Yapilan degisiklikler <b>aninda</b> kaydedildiginden <i>hepsini kaydet</i> tusu aranmasi luzumsuzdur!"+
        "</div><br/>"+
        "<fieldset style='padding-left:1em;'>"+
            "<legend><b>| Guncelleme Islemleri |</b></legend>"+
            "<br/>"+
            "Elinizdeki surum: <b>Eksi++ v"+meta.version+"</b><br/><br/>"+
            "(Not: Guncelleme kontrolleri <b>otomatik</b> olarak yapilmaktadir. Bir guncelleme oldugu zaman ust framede kucuk bir ibareyle haberlendirileceksiniz.)<br/><br/>"+
            "<button class='but' id='epp_guncellemeKontrolBut'>Yeni Eksi++ cikmis mi?</button>&nbsp; (<b>Simdi</b> kontrol etmek isteyenlere)<br/><br/>"+
        "</fieldset><br/><div id='epp_messageBox1' style='text-align:center;' tabindex='-1'>&nbsp;</div>"+
        "<fieldset style='padding-left:1em;'>"+
            "<legend><b>| Donuz Cobani |</b></legend>"+
            "<br/>"+
            "<input id='epp_donuzEntryGizleCB' type='checkbox'> Donuz <b>entry</b>lerini gizle (Sag Frame)<br/><br/>"+
            "<input id='epp_donuzBaslikGizleCB' type='checkbox'> Donuz <b>baslik</b>larini gizle (Sol Frame)<br/><br/>"+
            "Donuzlara <b>ekle</b> <input id='epp_donuzEkleVal' type='text' style='min-width: 20em;'> <button class='but' id='epp_donuzEkleBut'>Ekle</button><br/><br/>"+
            "Donuzlardan <b>sil</b> <select id='epp_donuzSilDD' style='min-width: 20em;'>"+donuzDropDownListesi()+"</select> <button class='but' id='epp_donuzSilBut'>Sil</button><br/><br/>"+
            "Donuz listesi <b>aktarim</b> islemleri: <button class='but' id='epp_donuzExportBut'>ihrac et</button>&nbsp;<button class='but' id='epp_donuzImportBut'>ithal et</button><br/><br/>"+
            "Otomatik <b>senkronizasyon</b>: <button class='but' id='epp_donuzSyncBut' disabled='disabled'>senkron eyle</button>"+" <b>(yakinda!)</b> "+" "+printEppDonuzSyncID()+"<br/><br/>"+
        "</fieldset><br/><div id='epp_messageBox5' style='text-align:center;' tabindex='-1'>&nbsp;</div>"+
        "<fieldset style='padding-left:1em;'>"+
            "<legend><b>| Istenmeyen Baslik Filtresi | "+"<b style='color:red'>Yeni!</b>"+"</b></legend>"+
            "<br/>"+
            "<input id='epp_yasakBaslikGizleCB' type='checkbox'> <b>Yasakli kelimeleri</b> iceren basliklari gizle<br/><br/>"+
            "Yasakli kelimelere <b>ekle</b> <input id='epp_yasakBaslikEkleVal' type='text' style='min-width: 20em;'> <button class='but' id='epp_yasakBaslikEkleBut'>Ekle</button> (<a href='show.asp?t=regular+expression'>regular expression</a>'dir aslen, kullaniniz)<br/><br/>"+
            "Yasakli kelimelerden <b>sil</b> <select id='epp_yasakBaslikSilDD' style='min-width: 20em;'>"+yasakliBaslikDropDownListesi()+"</select> <button class='but' id='epp_yasakBaslikSilBut'>Sil</button><br/><br/>"+
        "</fieldset><br/><div id='epp_messageBox2' style='text-align:center;' tabindex='-1'>&nbsp;</div>"+
        "<fieldset style='padding-left:1em;'>"+
            "<legend><b>| Spoiler Terbiyecisi |</b></legend>"+
            "<br/>"+
            "<input id='epp_spoilerGizleCB' type='checkbox'>Spoilerlari otomatik gizle (Butun spoilerlar once gizlenir ki kullanici istedigi zaman istedigini acabilsin, di mi?)<br/><br/>"+
            "Spoiler <b>acma</b> ibaresini belirle <input id='epp_spoilerAcText' type='text' style='min-width: 20em;' value='"+Ayarlar.dilBilgisi.spoilerAcma+"'> <button class='but' id='epp_spoilerAcBut'>Oldu Bu</button><br/><br/>"+
            "Spoiler <b>kapatma</b> ibaresini belirle <input id='epp_spoilerKapaText' type='text' style='min-width: 20em;' value='"+Ayarlar.dilBilgisi.spoilerKapama+"'> <button class='but' id='epp_spoilerKapaBut'>Evet Boyle</button><br/><br/>"+
        "</fieldset><br/><div id='epp_messageBox3' style='text-align:center;' tabindex='-1'>&nbsp;</div>"+
        "<fieldset style='padding-left:1em;'>"+
            "<legend><b>| Tema++ |</b></legend>"+
            "<br/>"+
            "<b>Hazir tema</b>lar: <select id='epp_hazirTemaDD' style='min-width: 20em;'>"+hazirTemaDropDownListesi()+"</select> <button class='but' id='epp_hazirTemaBut'>Kullan</button><br/><br/>"+
            "Bambaska bir tema kullanmak icin:<br/>"+
            "Yeni tema icin <b>isim</b> <input id='epp_yeniTemaText' type='text' style='min-width: 20em;'/>&nbsp;&nbsp; Tema <b>CSS</b>'i (url) <input id='epp_yeniTemaCSS' type='text' style='min-width: 30em;'/> <button class='but' id='epp_yeniTemaBut'>Kaydet ve Kullan</button><br/><br/>"+
        "</fieldset><br/><div id='epp_messageBox4' style='text-align:center;' tabindex='-1'>&nbsp;</div>"+
        "<fieldset style='padding-left:1em;'>"+
            "<legend><b>| Diger Cinlikler |</b></legend>"+
            "<br/>"+
            "<input id='epp_hepFrameliSozlukCB' type='checkbox'> <b>Ust ve sol frameleri</b> her sayfada goster (baslik sayfalarinda dahi sol ve ust frameleri her zaman gosterir, ortami bozmaz) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_tabDostuBaslikCB' type='checkbox'> <b>Sekme(tab) dostu</b> basliklari kullan (Ayni anda bir cok sekme acinca gorulen 'eksi sozluk -...' isimli sekme karmasasina son verir, basligi one alarak sekmeleri daha ayird edilebilir kilar) "+"<br/><br/>"+
            "<input id='epp_bakinizGommeCB' type='checkbox'> <b>Entry bakiniz</b>larini oldugu yerde acilabilir yap (bkz verilen entry tiklaninca oldugu yerde gosterilir, ayri pencere/sekme israfi yapmaz, zaman kazandirir) "+"<br/><br/>"+
            "<input id='epp_youtubeGommeCB' type='checkbox'> <b>Youtube</b> linklerini oldugu yerde (gomulu) oynatilabilir yap (linke tiklaninca oracikta oynatir videoyu) "+"<br/><br/>"+
            "<input id='epp_resimGommeCB' type='checkbox'> <b>Resim</b> linklerini oldugu yerde (gomulu) gosterilebilir yap (linke tiklaninca oracikta gosterir resmi) "+"<br/><br/>"+
            "<input id='epp_donBebegimCB' type='checkbox'> Yari-otomatik <b>don bebegim</b> (Ayni gun icinde ilk alin teri don bebegimden sonrasini otomatik yapar, 5 dakikada bir 'don bebegim' yaptirmaz) "+"<br/><br/>"+
            "<input id='epp_sabitBaslikCB' type='checkbox'> Basliklari <b>sabitle</b> (Basliklari sayfayla beraber kayabilir yapar, uzun basliklarda kolaylik saglar) "+"<br/><br/>"+
            "<input id='epp_ucnoktaCB' type='checkbox'> <b>Uc nokta</b>li basliklar (Sol framedeki baslik listesini eski 'uc nokta' sistemine cevirir, nostalji yaratir) "+"<br/><br/>"+
            "<input id='epp_kimdirnedirPopupCB' type='checkbox'> <b>'Kimdir Nedir'</b> pop-up olsun (Entry altlarindaki 'kimdir nedir'leri eskisi gibi pop-up olarak gosterir, sac bas yoldurmaz) "+"<br/><br/>"+
            "<input id='epp_benPopupCB' type='checkbox'> <b>'Ben'</b> pop-up olsun ('Ben' bilgilerinin pop-up olarak acilmasini saglar) "+"<br/><br/>"+
            "<input id='epp_eppMesajKutusuCB' type='checkbox'> <b>Eksi++ Mesaj Kutusu</b>nu kullan (mesajlari alici bazli gruplar, bunyede gmail havasi yaratir) "+" (<b>ONEMLI:</b> zeytinyagi modu kapali olmali!) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
        "</fieldset><br/><br/>"+
        "<div style='text-align:center;'><button class='but' id='epp_ayarlariKapatBut'>çok iyi de oldu, çok güzel iyi oldu tamam mi</button></div>"+
        "</div>"+
        "<br/>"+
        "<hr/>";
        
        document.body.insertBefore(panelKutusu, document.body.firstChild);
        
        var ayarlariKapatBut = idGet("epp_ayarlariKapatBut");
        
        ayarlariKapatBut.addEventListener("click", function(){ 
            window.location.reload();
        }, true);
        
        var guncellemeBut = idGet("epp_guncellemeKontrolBut");
        var donuzEntryGizleCB = idGet("epp_donuzEntryGizleCB");
        var donuzBaslikGizleCB = idGet("epp_donuzBaslikGizleCB");
        var donuzEkleVal = idGet("epp_donuzEkleVal");
        var donuzEkleBut = idGet("epp_donuzEkleBut");
        var donuzSilDD = idGet("epp_donuzSilDD");
        var donuzSilBut = idGet("epp_donuzSilBut");
        var donuzImportBut = idGet("epp_donuzImportBut");
        var donuzExportBut = idGet("epp_donuzExportBut");
        var donuzSyncBut = idGet("epp_donuzSyncBut");
        var spoilerGizleCB = idGet("epp_spoilerGizleCB");
        var spoilerAcText = idGet("epp_spoilerAcText");
        var spoilerAcBut = idGet("epp_spoilerAcBut");
        var spoilerKapaText = idGet("epp_spoilerKapaText");
        var spoilerKapaBut = idGet("epp_spoilerKapaBut");
        var hazirTemaDD = idGet("epp_hazirTemaDD");
        var hazirTemaBut = idGet("epp_hazirTemaBut");
        var yeniTemaText = idGet("epp_yeniTemaText");
        var yeniTemaCSS = idGet("epp_yeniTemaCSS");
        var yeniTemaBut = idGet("epp_yeniTemaBut");
        var tabDostuBaslikCB = idGet("epp_tabDostuBaslikCB");
        var youtubeGommeCB = idGet("epp_youtubeGommeCB");
        var resimGommeCB = idGet("epp_resimGommeCB");
        var bakinizGommeCB = idGet("epp_bakinizGommeCB");
        var donBebegimCB = idGet("epp_donBebegimCB");
        var sabitBaslikCB = idGet("epp_sabitBaslikCB");
        var ucnoktaCB = idGet("epp_ucnoktaCB");
        var kimdirnedirPopupCB = idGet("epp_kimdirnedirPopupCB");
        var benPopupCB = idGet("epp_benPopupCB");
        var yasakliBaslikGizleCB = idGet("epp_yasakBaslikGizleCB");
        var yasakBaslikEkleVal = idGet("epp_yasakBaslikEkleVal");
        var yasakBaslikEkleBut = idGet("epp_yasakBaslikEkleBut");
        var yasakBaslikSilDD = idGet("epp_yasakBaslikSilDD");
        var yasakBaslikSilBut = idGet("epp_yasakBaslikSilBut");
        var eppMesajKutusuCB = idGet("epp_eppMesajKutusuCB");
        var hepFrameliSozlukCB = idGet("epp_hepFrameliSozlukCB");
        
        donuzEntryGizleCB.checked = Ayarlar.donuzGirdileriniGizle;
        donuzBaslikGizleCB.checked = Ayarlar.donuzBasliklariniGizle;
        spoilerGizleCB.checked = Ayarlar.spoilerGizle;
        tabDostuBaslikCB.checked = Ayarlar.sekmeDostuBaslik;
        youtubeGommeCB.checked = Ayarlar.youtubeGomme;
        bakinizGommeCB.checked = Ayarlar.bkzGomme;
        donBebegimCB.checked = Ayarlar.yariOtomatikDonBebegim;
        sabitBaslikCB.checked = Ayarlar.baslikSabitleme;
        ucnoktaCB.checked = Ayarlar.ucNoktayiGeriGetir;
        kimdirnedirPopupCB.checked = Ayarlar.kimdirNedirPopup;
        benPopupCB.checked = Ayarlar.benPopup;
        resimGommeCB.checked = Ayarlar.resimGomme;
        yasakliBaslikGizleCB.checked = Ayarlar.yasakliBasliklariGizle;
        eppMesajKutusuCB.checked = Ayarlar.eppMesajKutusu;
        hepFrameliSozlukCB.checked = Ayarlar.hepFrameliSozluk;
        

        guncellemeBut.title = "Ustunde bekleyerek degil de tusa basarak kontrol edersek daha makbule gecer";
        guncellemeBut.addEventListener("click",function(){
            EppAPI_JSONRequest({
                url: "http://mekan.dreamhosters.com/eksi++/version.php?id="+meta.id+"&v="+meta.version+"&r="+((new Date()).getTime()),
                method: "GET",
                data: "",
                onload: function(json){
                    try { 
                        if (json.uptodate == "no") {
                            if (confirm("Yeni surum cikmis: Eksi++ v"+json.latest+"\n\nGuncellemek ister misin?")) {
                                window.open("https://userscripts.org/scripts/source/"+meta.id+".user.js");
                            }
                        } else {
                            alert("Eldeki surum gayet guncel");
                        }
                    } catch (e) {
                        alert("Eksi++ Hata: Guncelleme sorgusunda bir gariplik oldu, bilemedim.");
                    }
                },
            });
        },true);

        
        donuzEntryGizleCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.donuzGirdileriniGizle = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Donuz <b>entry</b>leri <b>"+(this.checked?"gorunmez":"gorunur")+"</b> kilindi!", 1);
        }, true);
        
        donuzBaslikGizleCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.donuzBasliklariniGizle = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Donuz <b>baslik</b>lari <b>"+(this.checked?"gorunmez":"gorunur")+"</b> kilindi!", 1);
        }, true);
        
        donuzEkleBut.addEventListener("click", function(){ 
            tumAyarlariYukle();
            if (!validate(donuzEkleVal.value, 'yazar')) {
                alert('"' + donuzEkleVal.value + '"\n\nIsimde bi gariplik var sanki?');
                return;
            }
            donuzEkle(donuzEkleVal.value);
            ayarMenusuDerki("<b>"+donuzEkleVal.value+"</b> donuzlara <b>eklendi</b>!", 1);
            donuzEkleVal.value = '';
            donuzSilDD.innerHTML = donuzDropDownListesi();
        }, true);
        
        donuzSilBut.addEventListener("click", function(){ 
            tumAyarlariYukle();
            if (donuzSilDD.value) {
                donuzCikar(donuzSilDD.value);
                ayarMenusuDerki("<b>"+donuzSilDD.value+"</b> donuzlardan <b>cikarildi</b>!", 1);
                donuzSilDD.innerHTML = donuzDropDownListesi();
            } else {
                alert("Hangi donuz?");
            }
            
        }, true);
        
        donuzImportBut.addEventListener("click", function(){
            try { 
                var list = importDonuzList(prompt("Daha onceden kaydettiginiz donuz listesini girin:",'["-yazar1-","-yazar2-"] gibi'));
                if (!list) return;
                ayarMenusuDerki("<b>"+list.join(", ")+"</b> donuzlara <b>eklendi</b>!", 1);
                donuzSilDD.innerHTML = donuzDropDownListesi();
            } catch (err) {
                alert("Listede bir gariplik var gibi");
            }
        }, true);
        
        donuzExportBut.addEventListener("click", function(){
            prompt("Donuz ihraci icin assagidaki veriyi aynen kopyalayin:",exportDonuzList());
        }, true);
        
        donuzSyncBut.addEventListener("click", function(){
            if (Ayarlar.eppDonuzSyncID) {
                senkronEyle();
            } else {
                if (confirm("Ilk defa senkronizasyon kullaniyorsunuz; verilerinizin, yalnizca senkronizasyon amaciyla, eksi++ serverlarinda saklanmasina izin veriyor musunuz?")) {
                    alert("pek comertsiniz ancak senkronizasyon altyapisi henuz hazir degil");
                } else {
                    alert("caniniz sagolsun, zaten senkronizasyon altyapisi henuz hazir degildi");
                }
            }
        }, true);
        
        spoilerGizleCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.spoilerGizle = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Spoiler korumasi <b>"+(this.checked?"acildi":"kapandi")+"</b>!", 2);
        }, true);
        
        spoilerAcBut.addEventListener("click", function(){ 
            tumAyarlariYukle();
            Ayarlar.dilBilgisi.spoilerAcma = spoilerAcText.value;
            tumAyarlariKaydet();
            ayarMenusuDerki("Spoiler <b>acma</b> ibaresi <i>"+spoilerAcText.value+"</i> olarak kaydedildi!", 2);
        }, true);
        
        spoilerKapaBut.addEventListener("click", function(){ 
            tumAyarlariYukle();
            Ayarlar.dilBilgisi.spoilerKapama = spoilerKapaText.value;
            tumAyarlariKaydet();
            ayarMenusuDerki("Spoiler <b>kapatma</b> ibaresi <i>"+spoilerKapaText.value+"</i> olarak kaydedildi!", 2);
        }, true);
        
        
        hazirTemaBut.addEventListener("click", function(){ 
            tumAyarlariYukle();
            Ayarlar.ozelTema = hazirTemaDD.value;
            tumAyarlariKaydet();
            ayarMenusuDerki("Tema <b>"+seciliTemaIsmi()+"</b> olarak ayarlandi! Degisikligi gorebilmek icin lutfen sayfayi yenileyin.", 3);
        }, true);
        
        yeniTemaBut.addEventListener("click", function(){ 
            tumAyarlariYukle();
            if (!validate(yeniTemaCSS.value, 'css')) {
                if(!confirm('"' + yeniTemaCSS.value + '"\n\nBunun gecerli bir CSS dosyasi olduguna emin misin?'))
                    return;
            }
            Ayarlar.ozelTemaListesi[yeniTemaText.value] = yeniTemaCSS.value;
            Ayarlar.ozelTema = yeniTemaCSS.value;
            tumAyarlariKaydet();
            ayarMenusuDerki("Hakikaten <b>"+yeniTemaText.value+"</b> bambaskaymis! Degisikligi gorebilmek icin lutfen sayfayi yenileyin.", 3);
            yeniTemaText.value = '';
            yeniTemaCSS.value = '';
            hazirTemaDD.innerHTML = hazirTemaDropDownListesi();
        }, true);
        
        
        eppMesajKutusuCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.eppMesajKutusu = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki((this.checked?"<b>Eksi++ Mesaj Kutusu</b>":"<b>Klasik</b> mesaj kutusu")+" aktif", 4);
        }, true);
        
        hepFrameliSozlukCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.hepFrameliSozluk = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki((this.checked?"Basliklar <b>hep frameli</b> olacak!":"Basliklar <b>oldugu gibi</b> kalacak!"), 4);
        }, true);
        
        tabDostuBaslikCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.sekmeDostuBaslik = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki((this.checked?"Yasasin <b>sekme dostu</b> basliklar!":"Sekme dostu basl..."), 4);
        }, true);

        youtubeGommeCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.youtubeGomme = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Youtube linkleri <b>"+(this.checked?"gomulebilir olacak":"ellenmeyecek")+"</b>!", 4);
        }, true);
        
        resimGommeCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.resimGomme = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Resim linkleri <b>"+(this.checked?"gomulebilir olacak":"ellenmeyecek")+"</b>!", 4);
        }, true);
        
        bakinizGommeCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.bkzGomme = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Entry bakinizlari <b>"+(this.checked?"oldugu yerde":"ayri sayfada")+"</b> acilacak!", 4);
        }, true);
        
        donBebegimCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.yariOtomatikDonBebegim = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Yari-otomatik 'don bebegim' <b>"+(this.checked?"emrinize amade":"devre disi")+"</b>!", 4);
        }, true);
        
        sabitBaslikCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.baslikSabitleme = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Basligin yeri <b>"+(this.checked?"pencerenin":"sayfanin")+"</b> tepesi olarak belirlendi!", 4);
        }, true);
        
        ucnoktaCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.ucNoktayiGeriGetir = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Basliklar <b>"+(this.checked?"uc noktali":"her zamanki gibi")+"</b> olacak!", 4);
        }, true);
        
        kimdirnedirPopupCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.kimdirNedirPopup = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Kimdir nedirler <b>"+(this.checked?"pop-up olarak":"ana sayfada")+"</b> gosterilecek!", 4);
        }, true);
        
        benPopupCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.benPopup = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("'Ben' bilgileri <b>"+(this.checked?"pop-up olarak":"ana sayfada")+"</b> gosterilecek!", 4);
        }, true);
        
        
        yasakliBaslikGizleCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.yasakliBasliklariGizle = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Yasakli baslik korumasi <b>"+(this.checked?"aktif":"devre disi")+"</b>!", 5);
        }, true);
        
        yasakBaslikEkleBut.addEventListener("click", function(){ 
            tumAyarlariYukle();
            yasakliRegexEkle(yasakBaslikEkleVal.value);
            ayarMenusuDerki("<b>"+yasakBaslikEkleVal.value+"</b> yasakli kelimelere <b>eklendi</b>!", 5);
            yasakBaslikEkleVal.value = '';
            yasakBaslikSilDD.innerHTML = yasakliBaslikDropDownListesi();
        }, true);
        
        yasakBaslikSilBut.addEventListener("click", function(){ 
            tumAyarlariYukle();
            if (yasakBaslikSilDD.value) {
                yasakliRegexCikar(yasakBaslikSilDD.value);
                ayarMenusuDerki("<b>"+yasakBaslikSilDD.value+"</b> yasakli kelimelerden <b>cikarildi</b>!", 5);
                yasakBaslikSilDD.innerHTML = yasakliBaslikDropDownListesi();
            } else {
                alert("Evet ama hangisi?");
            }
        }, true);
                
        
        //Panel tuslarini eksi tuslarina benzetelim, yabancilik olmasin
        var panelTuslari = xpath(".//button", panelKutusu);
        for (var i = 0; i < panelTuslari.snapshotLength; i++) {
            var panelTusu = panelTuslari.snapshotItem(i);
            panelTusu.className = "but";        
            panelTusu.setAttribute("onmouseover","ov(this)");        
            panelTusu.setAttribute("onmouseout","bn(this)");        
            panelTusu.setAttribute("onmousedown","md(this)");        
            panelTusu.setAttribute("onmouseup","bn(this)");
        }
        
        if (idGet("epp_sabitBaslik")) {
            idGet("epp_sabitBaslik").style.position = "relative";
            document.body.style.paddingTop = "0";
        }

        // Ayar menusunu gosterelim artik
        panelKutusu.style.display = "";
    }
        
    function donBebegimTiklandi() {
        var bugun = (new Date()).getDay();
        EppAPI_setValue(System.storage.donBebegimGunu, bugun);
    }
    
    function kimdirNedirFix() {
        if (!Ayarlar.kimdirNedirPopup && !Ayarlar.benPopup) return;
        
        if (Ayarlar.kimdirNedirPopup) {
            var knTuslari = xpath("//a[starts-with(@title,'yazar hak')]");
            for(var i=0; i<knTuslari.snapshotLength; i++) {
                var tus = knTuslari.snapshotItem(i);
                var knUrl = tus.href.replace(/info\.asp/,'info2.asp');
                tus.href = "javascript:od('"+knUrl+"',"
                                           +800+","
                                           +400+")";
            }
        }
        if (Ayarlar.benPopup) {
            var benTusu = xpath("//a[@title='evet sen']").snapshotItem(0);
            if (!benTusu) 
                return;
            benTusu.target = "";
            var bennUrl = benTusu.href.replace(/info\.asp/,'info2.asp');
            benTusu.href = "javascript:od('"+bennUrl+"',"
                                       +800+","
                                       +400+")";
        }
    }
    
    function gunlukDonBebegim() {
        var cssler = xpath("//link[@rel='stylesheet']");
        var reklamCss;
        
        for(var i=0; i<cssler.snapshotLength; i++) {
            if (cssler.snapshotItem(i).href.match(/org\/adcss\//)) {
                EppAPI_log("Reklam CSS'i aktif");
                reklamCss = cssler.snapshotItem(i);
                break;
            }
        }
        
        if (!reklamCss) {
            if (cssler.snapshotLength < 2) {
                // Reklam yok ama halihazirda ozel tema da yok
                // Secilmis ozel tema varsa, onu ekleyelim...
                
                EppAPI_log("Normal CSS aktif");
                
                if (Ayarlar.ozelTema) {
                    // Ozel tema secilmis, uygulayalim
                    var yeniCss = document.createElement("link");
                    yeniCss.id = "epp_ozelCss";
                    yeniCss.rel = "stylesheet";
                    yeniCss.type = "text/css";
                    yeniCss.href = Ayarlar.ozelTema;
                    
                    document.getElementsByTagName("head")[0].appendChild(yeniCss)
                }
            } else {
                // Reklam yok ve ozel bir tema aktif
                // Burada isimiz yok
                
                EppAPI_log("Ozel CSS aktif");
                return;
            }
        } else {
            var bugun = (new Date()).getDay();
            var enSon = EppAPI_getValue(System.storage.donBebegimGunu, -1);
            var donBebegimTusu = xpath("/html/body/div/table/tbody/tr/td/button").snapshotItem(0);
            
            if (bugun != enSon) {
                EppAPI_log("Bugun (" + bugun + ") henuz donulmemis bebegim");
                if (donBebegimTusu) {
                    donBebegimTusu.addEventListener("click", donBebegimTiklandi, false);
                }
            } else if (Ayarlar.yariOtomatikDonBebegim) {
                if (Ayarlar.ozelTema) {
                    // Ozel tema secilmis, uygulayalim
                    reklamCss.id = "epp_ozelCss";
                    reklamCss.href = Ayarlar.ozelTema;
                } else {
                    reklamCss.parentNode.removeChild(reklamCss);
                }
                if (donBebegimTusu) { 
                    var donBebegimAdresi = (donBebegimTusu.parentNode.innerHTML.match(/onclick=["']location\.href=["']([^"']+)["']["']/))[1];
                    donBebegimAdresi = donBebegimAdresi.replace("&amp;","&")
                    donBebegimAdresi = window.location.protocol + "//" + window.location.hostname + "/" + donBebegimAdresi;    
                    
                    var req =  new XMLHttpRequest();
                    req.open("HEAD", donBebegimAdresi, true);
                    req.send(null);
                    
                    /*/
                    GM_xmlhttpRequest({
                        url: donBebegimAdresi,
                        method: "HEAD",
                        onload: function(response) {
                            return;
                        }
                    });
                    //*/
                    
                    donBebegimTusu.parentNode.innerHTML = "<b>Eksi++:</b><br/> Bugun daha once 'don bebegim' yapanlara ikinci 'don bebegim' bizden!<br/> Iyi seyirler!<br/><br/>";
                }

                EppAPI_log("Bugun (" + bugun + ") donmusuz bebegim daha once, otomatik donuse gecilsin!");
            }
        }
    }

    function yeniEksiTusu(element) {
        if (!element)
            element = "span";
        
        var yeniTus = document.createElement(element);
        
        if (element == "input")
            yeniTus.type = "button";
        
        yeniTus.className = "but";        
        yeniTus.setAttribute("onmouseover","ov(this)");        
        yeniTus.setAttribute("onmouseout","bn(this)");        
        yeniTus.setAttribute("onmousedown","md(this)");        
        yeniTus.setAttribute("onmouseup","bn(this)");

        return yeniTus;
    }
    
    function yeniEksiLinki(tip, nereye, yazi, title, acma, kapama, wrapper) {
        
        tip = (tip) ? tip : "but";
        nereye = (nereye) ? nereye : "javascript:void(null)";
        yazi = (typeof(yazi) != "undefined") ? yazi : "Eksi++";
        title = (typeof(title) != "undefined") ? title : 0;
        acma = (acma) ? acma : "";
        kapama = (kapama) ? kapama : "";
        wrapper = (wrapper) ? wrapper : "span";
        
        var yeniWrap = document.createElement(wrapper);
        //yeniWrap.style.backgroundImage = "url(" + transbg10UrlData + ")";
        yeniWrap.innerHTML = acma + "<a></a>" + kapama;
        var yeniLink = yeniWrap.childNodes[1];
               
        yeniLink.className = (tip == "click")? "gp" : "url";
        yeniLink.href = nereye;
        yeniLink.innerHTML = yazi;
        yeniLink.style.textDecoration = "underline";
        if (title) yeniLink.title = title;
               
        return { wrap : yeniWrap, link : yeniLink };
    }

    function alalimArkadasi(arkadas) {
        if (debug) {
            arkadas.style.textDecoration = "line-through";
            arkadas.style.display = "";
        } else {
            arkadas.style.display = "none";
        }
    }

    function alinmismiArkadas(arkadas) {
        if (debug) {
            return (arkadas.style.textDecoration == "line-through");
        } else {
            return (arkadas.style.display == "none");
        }
    }

    function cikaralimArkadasi(arkadas) {
        if (debug) {
            arkadas.style.textDecoration = "none";
        } else {
            arkadas.style.display = "";
        }
    }

    function youtubeGomucu(link) {
        if (link.getAttribute("epp_status") == "youtube_open") {
            link.parentNode.removeChild(link.nextSibling);
            link.setAttribute("epp_status","youtube_closed");
        } else {
            var bw = 8;
            
            var videoId = (link.href.match(/watch\?v=([^#&]+)/))[1];
            videoId += "?fs=1";
            
            if (link.href.match(/#t=.+$/)) {
                var time = (link.href.match(/#t=(.+)$/))[1];
                var timeInSec = parseInt(time.match(/\d+m/))*60;
                timeInSec += parseInt(time.match(/\d+s/));
                videoId += "&start="+timeInSec;
            }
                        
            var embedHtml = embedTemplates.youtube.html.replace(/__EMBED-ID__/g, videoId);
            embedHtml = embedHtml.replace(/__EMBED-W__/g, embedTemplates.youtube.width);
            embedHtml = embedHtml.replace(/__EMBED-H__/g, embedTemplates.youtube.height);
                    
            var videoKutusu = document.createElement("div");
            videoKutusu.style.marginTop = "0.5em";
            videoKutusu.style.marginBottom = "1em";
            videoKutusu.style.width = embedTemplates.youtube.width +"px";
            videoKutusu.style.height = embedTemplates.youtube.height +"px";
            videoKutusu.style.padding = bw+"px";
            //videoKutusu.style.backgroundImage = "url(" + transbg50UrlData + ")";
            videoKutusu.style.backgroundColor = "rgba(0,0,0,.5)";
            videoKutusu.innerHTML = embedHtml;
            link.parentNode.insertBefore(videoKutusu, link.nextSibling);
            link.setAttribute("epp_status","youtube_open");
        }
    }
    
    function resimGomucu(link) {
        if (link.getAttribute("epp_status") == "image_open") {
            link.parentNode.removeChild(link.nextSibling);
            link.setAttribute("epp_status","image_closed");
        } else {
            var bw = 8;
            
            var image = document.createElement("img");
            image.src = link.href;
            image.title = link.innerHTML;
            image.style.cursor = "pointer";
            image.style.maxWidth = "600px";
            image.style.maxHeight = "600px";
            image.style.padding = bw+"px";
            //image.style.backgroundImage = "url(" + transbg50UrlData + ")";
            image.style.backgroundColor = "rgba(0,0,0,.5)";
            var imgLink = document.createElement("a");
            imgLink.href = link.href;
            imgLink.target = "_blank";
            /*/
            image.addEventListener("click", function() {
                if (browser == "firefox") {
                    window.open(this.src);
                } else if (browser == "chrome/opera") {
                    var newWin = window.open();
                    newWin.opener = null;
                    newWin.document.location = this.src;
                }
            }, true);
            //*/
            
            var resimKutusu = document.createElement("div");
            resimKutusu.style.marginTop = "0.5em";
            resimKutusu.style.marginBottom = "1em";
            imgLink.appendChild(image);
            resimKutusu.appendChild(imgLink);
            link.parentNode.insertBefore(resimKutusu, link.nextSibling);
            link.setAttribute("epp_status","image_open");
        }
    }

    function gomulebilirLinkDuzenle() {
        var linkler = xpath("//a[@class='url']");
        
        for (var i=0; i<linkler.snapshotLength; i++) {
            var link = linkler.snapshotItem(i);
            
            if(Ayarlar.youtubeGomme && link.href.match(/youtube\.com\/watch\?v=/)) {
                link.setAttribute("epp_status","youtube_closed");
                link.style.textDecoration = "underline";
                link.addEventListener("click", (function(pLink) { return function(e){ 
                    if (!e.ctrlKey) {
                        youtubeGomucu(pLink); 
                        e.stopPropagation();
                        e.preventDefault();
                        return false; 
                    }
                }; })(link), true);
            } else if (Ayarlar.resimGomme && link.href.match(/\.(jpe?g|gif|png)$/i)) {
                link.setAttribute("epp_status","image_closed");
                link.style.textDecoration = "underline";
                link.addEventListener("click", (function(pLink) { return function(e){ 
                    if (!e.ctrlKey) {
                        resimGomucu(pLink); 
                        e.stopPropagation();
                        e.preventDefault();
                        return false; 
                    }
                }; })(link), true);
            }
            
            //else if (xxx)
            //    xxxGomme()
            // yani digerleri... mesela bobiler?
        }
    }
       
    function entryGetir(entryUrl) {
        var req =  new XMLHttpRequest();
        var result = "";
        req.open("GET", entryUrl, false);
        req.send(null);
        var tempDom = document.createElement("div");
        tempDom.innerHTML = req.responseText;
        if (!tempDom.getElementsByTagName("ol").length)
            return 0;
        
        var baslik = (tempDom.getElementsByTagName("h1"))[0];
        var entryler = tempDom.getElementsByTagName("li");
        
        if (entryler.length) {
            var entryID = entryler[0].id.replace(/\D/g,'');
            var entrySira = entryler[0].value;
            if (entryler[0].firstChild.nodeName == "input")
                entryler[0].removeChild(entryler[0].firstChild);
            //entryler[0].lastChild.removeChild(entryler[0].lastChild.lastChild);
            var scriptler = xpath(".//script", entryler[0])
            for (var i=0; i< scriptler.snapshotLength; i++) {
                var script = scriptler.snapshotItem(i);
                script.parentNode.removeChild(script);
            }
            var yazarID = xpath("./a",entryler[0].lastChild).snapshotItem(0).innerHTML;
            entryler[0].insertBefore(document.createElement("br"), entryler[0].lastChild);
            var eksiTuslari =  '<table style="float: right; margin-top: 0.5em;"><tbody><tr><td style="white-space: nowrap;" id="vst__ENTRY-ID__" class="ei">&nbsp;</td>\
                                    <td><span class="but" onclick="mpr(__ENTRY-ID__,1)" title="şükela!" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:)&nbsp;</span></td>\
                                    <td><span class="but" onclick="mpr(__ENTRY-ID__,0)" title="öeehh" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:O&nbsp;</span></td>\
                                    <td><span class="but" onclick="mpr(__ENTRY-ID__,-1)" title="çok kötü" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:(&nbsp;</span></td>\
                                    <td>&nbsp;</td>\
                                    <td><span class="but" onclick="od(\'msg.asp?to=__YAZAR-ID__&amp;re=__ENTRY-ID__\')" title="mesaj at" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;/msg&nbsp;</span></td>\
                                    <td><a class="but" href="javascript:od(\'http://www.eksisozluk.com/info2.asp?n=__YAZAR-ID__\',800,400)" title="yazar hakkında" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)">&nbsp;?&nbsp;</a></td>\
                                </tr></tbody></table>';
            eksiTuslari = eksiTuslari.replace(/__ENTRY-ID__/g, entryID);
            eksiTuslari = eksiTuslari.replace(/__YAZAR-ID__/g, yazarID);
            result = "<h2 class='title'>" + baslik.innerHTML + 
                         "<sup><a href='show.asp?t="+encodeURIComponent(baslik.textContent).replace(/[']/g,"%27")+"' title='basliga git' target='_blank' style='text-decoration:underline;'>git</a></sup>"+
                         "<sup><a href='show.asp?t="+encodeURIComponent(baslik.textContent).replace(/[']/g,"%27")+"&i="+entryID+"' title='konulu git' target='_blank' style='text-decoration:underline; margin-left:.5em;'>kit</a></sup>"+
                     "</h2>";
            result += "<ol style='white-space: normal;'><li value='"+entrySira+"' style='margin-left:0;'>";
            result += entryler[0].innerHTML;
            result += eksiTuslari;
            result += "<br/>";
            result += "</li></ol>";
        } else {
            result = "<b>Eksi++</b> Sozluk cok acayip bir seyler dondu, bilemedim!";
        }
        return result;
    }
        
    function entryGomucu(entryLinki) {
        if (!entryLinki.getAttribute("entryGomulu")) {
            //var entryUrl = entryLinki.innerHTML.replace(/\D/g,'');
            var entryUrl = entryLinki.href;
            entryUrl = entryUrl.replace("sozluk.sourtimes.org","www.eksisozluk.com"); //Domain degisikligi onlemi
            
            var entryBox = document.createElement("div");
            var entryBoxWrap = document.createElement("div");
            var kapatTusu = yeniEksiTusu("input");
            var kapatTusu2 = yeniEksiTusu("input");
            
            entryBoxWrap.style.zIndex = "99";
            entryBoxWrap.style.maxWidth = (window.innerWidth-130)+"px";
            entryBoxWrap.style.padding = "6px";
            entryBoxWrap.style.marginRight = "130px";
            //entryBoxWrap.style.backgroundImage = "url(" + transbg50UrlData + ")";
            entryBoxWrap.style.backgroundColor = "rgb(0,0,0)"; //fallback
            entryBoxWrap.style.backgroundColor = "rgba(0,0,0,.5)";
            entryBoxWrap.style.position = "absolute";
            
            entryBox.position = "relative";
            entryBox.style.padding = "1em";
            entryBox.style.minWidth = "35em";
            entryBox.style.backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");
            entryBox.style.backgroundImage = window.getComputedStyle(document.body, null).getPropertyValue("background-image");
            entryBox.style.border = "1px solid rgb(255,255,255)"; //fallback
            entryBox.style.border = "1px solid rgba(255,255,255,0.5)";
            entryBox.innerHTML = "<b>Eksi++</b> Bir seyler geliyor... ";
            
            kapatTusu.value = "X";
            kapatTusu.style.position = "absolute";
            kapatTusu.style.top = "7px";
            kapatTusu.style.right = "7px";
            kapatTusu.addEventListener("click", function(){  
                this.parentNode.parentNode.style.display = "none";
                this.parentNode.parentNode.previousSibling.setAttribute("entryGomulu", 2);
            }, true);
            
            kapatTusu2.value = "X";
            kapatTusu2.style.position = "absolute";
            kapatTusu2.style.bottom = "7px";
            kapatTusu2.style.left = "7px";
            kapatTusu2.addEventListener("click", function(){  
                this.parentNode.parentNode.style.display = "none";
                this.parentNode.parentNode.previousSibling.setAttribute("entryGomulu", 2);
            }, true);
            
            entryBoxWrap.appendChild(entryBox);
            entryLinki.parentNode.insertBefore(entryBoxWrap, entryLinki.nextSibling);
            
            var entryHTML = entryGetir(entryUrl);
            if (entryHTML) {
                entryBox.innerHTML = entryHTML;
            } else {
                entryBox.innerHTML = "<b>Eksi++</b> Yokmus ki boyle bir entry!";
                kapatTusu2.style.display = "none";
            }
            
            entryBox.appendChild(kapatTusu);
            entryBox.appendChild(kapatTusu2);
            
            entryLinki.setAttribute("entryGomulu", 1);          
        } else if (entryLinki.getAttribute("entryGomulu") == 2) {
            entryLinki.nextSibling.style.display = "";
            entryLinki.setAttribute("entryGomulu", 1);
        } else {
            entryLinki.nextSibling.style.display = "none";
            entryLinki.setAttribute("entryGomulu", 2);
        }
    }

    function gomulebilirEntryleriDuzenle() {
        if (!Ayarlar.bkzGomme) 
            return;
    
        var linkList = document.getElementsByTagName("a");
        var length = linkList.length;
        
        for (var i=0; i<length; i++) {
            var link = linkList[i];
            if (link.className.match(/(gb|id|b)/) && link.innerHTML.match(/(#|\/)\d+$/)) {
                link.style.textDecoration = "underline";
                link.addEventListener("click", (function(pLink) { return function(e){ 
                    if (!e.ctrlKey) { 
                        entryGomucu(pLink); 
                        //e.stopPropagation();
                        e.preventDefault();  
                        return false;
                    }
                }; })(link), true);
            } else if (link.href.match(/^http:\/\/(sozluk\.sourtimes\.org|www\.eksisozluk\.com)\/show\.asp\?id=\d+/)) {
                link.style.textDecoration = "underline";
                link.addEventListener("click", (function(pLink) { return function(e){ 
                    if (!e.ctrlKey) { 
                        entryGomucu(pLink); 
                        //e.stopPropagation();
                        e.preventDefault();  
                        return false;
                    }
                }; })(link), true);
            }
        }
    }

    //Migration Functions
    function migrateToV05() {
        if (isCurrentVersionOlderThan("0.5")) {
            //if (!confirm("Migrate to v0.5?")) return;
            if (debug) EppAPI_log("Migrating Settings to v0.5");
            var curAyarlar = JSON.parse(EppAPI_getValue(System.storage.ayarKaydi, '{}'));
            if (!curAyarlar.temaListesi) return; //yokmus ki eski kayitlar...
            for (var tema in curAyarlar.temaListesi) {
                EppAPI_log("Eldeki tema: "+ tema);
                if (typeof System.hazirTemaListesi[tema] == "undefined") {
                    if (debug) EppAPI_log("Listede yokmus!: "+ tema);
                    if (!curAyarlar.ozelTemaListesi) 
                        curAyarlar.ozelTemaListesi = {};
                    curAyarlar.ozelTemaListesi[tema] = curAyarlar.temaListesi[tema];
                }
            }
            if (debug) EppAPI_log("Migrated Tema List: "+ JSON.stringify(curAyarlar.ozelTemaListesi));
            delete curAyarlar.temaListesi; //Eski listeyi silelim
            EppAPI_setValue(System.storage.ayarKaydi, JSON.stringify(curAyarlar)); //Yeni hali kaydedelim
        }
    }
    

    //// "SOZLUK AYAR MERKEZI" ENGINE ////
    function AyarMerkeziEngine() {
    
        var mallar = xpath("/html/body/table/tbody/tr/td/form/table/tbody/tr/td/label");
        var ozAyarMenusuMesaj;
        
        function mesajlariDuzenle() {
            if (!Ayarlar.eppMesajKutusu) return;
        
            //Paneli kaldiralim
            idGet("panel").style.display = "none";
        
            var anaListe = xpath("/html/body/table/tbody/tr/td/form/ul").snapshotItem(0);
            var mesajlar = xpath("/html/body/table/tbody/tr/td/form/ul/li");
            var mesajSirasi = new Array();
            var sira = 0;
            var toplamOkunmamis = 0;
            var mesajListesi = {};
            var eskiOkunmusMesajlar = EppAPI_getValue(System.storage.okunmusMesajListesi, 0);
            //var eskiOkunmusMesajlar = 0;
            var yeniOkunmusMesajlar = {};
            var okunmusListesiBos = (eskiOkunmusMesajlar == 0);
            if (okunmusListesiBos) {
                eskiOkunmusMesajlar = {};
            } else {
                //eskiOkunmusMesajlar = {};
                eskiOkunmusMesajlar = JSON.parse(eskiOkunmusMesajlar);
            }
            //EppAPI_log("Okunmus Mesaj Listesi - Loaded >> Bos: "+okunmusListesiBos+" | Liste: " + JSON.stringify(eskiOkunmusMesajlar));
                        
            // Su anki mesaj listesini gruplayalim
            for (var i=0; i<mesajlar.snapshotLength; i++) {
                var mesaj = mesajlar.snapshotItem(i);
                var matches = mesaj.innerHTML.match(/(\<b\>([^<]+)\<\/b\>|-&gt;\s([^:]+):)/);
                var eleman = (matches[2] != null)?matches[2]:matches[3];
                mesaj.setAttribute("epp_msgthread","thr-"+eleman.replace(/\s/g,'_'));
                //EppAPI_log("Incelenen mesaj: " + mesaj.id);
                if (typeof mesajListesi[eleman] == "undefined") {
                    mesajListesi[eleman] = new Array();
                    if (!eskiOkunmusMesajlar[mesaj.id] && !okunmusListesiBos) {
                        //EppAPI_log("OKUNMAMIS mesaj: " + mesaj.id);
                        mesaj.setAttribute("epp_unread","yes");
                        mesaj.addEventListener("click", function(){
                            var okunmusMesajlar = JSON.parse(EppAPI_getValue(System.storage.okunmusMesajListesi, '{}'));
                            okunmusMesajlar[this.id] = 1;
                            this.style.borderColor = "";
                            EppAPI_setValue(System.storage.okunmusMesajListesi, JSON.stringify(okunmusMesajlar));
                        }, false);
                    } else {
                        mesaj.setAttribute("epp_unread","no");
                        yeniOkunmusMesajlar[mesaj.id] = 1;
                    }
                    //yeniOkunmusMesajlar[mesaj.id] = 1;
                    mesajSirasi.unshift(eleman);
                } else {
                    if (!eskiOkunmusMesajlar[mesaj.id] && !okunmusListesiBos) {
                        //EppAPI_log("OKUNMAMIS mesaj: " + mesaj.id);
                        mesaj.setAttribute("epp_unread","yes");
                        mesaj.addEventListener("click", function(){
                            var okunmusMesajlar = JSON.parse(EppAPI_getValue(System.storage.okunmusMesajListesi, '{}'));
                            okunmusMesajlar[this.id] = 1;
                            this.style.borderColor = "";
                            EppAPI_setValue(System.storage.okunmusMesajListesi, JSON.stringify(okunmusMesajlar));
                        }, false);
                    } else {
                        mesaj.setAttribute("epp_unread","no");
                        yeniOkunmusMesajlar[mesaj.id] = 1;
                    }
                    //yeniOkunmusMesajlar[mesaj.id] = 1;
                    mesajSirasi.splice(isInList(eleman, mesajSirasi), 1);
                    mesajSirasi.unshift(eleman);
                }
                mesajListesi[eleman].push(mesaj);
            }
            
            // Okunmus mesajlari kaydedelim
            //EppAPI_log("Okunmus Mesaj Listesi - To SAVE: " + JSON.stringify(yeniOkunmusMesajlar));
            EppAPI_setValue(System.storage.okunmusMesajListesi, JSON.stringify(yeniOkunmusMesajlar));
            
            // Gelismis mesaj listesini olusturalim
            for (var kimle in mesajSirasi) {
                var padded = 0;
                var highlight = 0;
                var yeniMesajSayisi = 0;
                var toplamMesajSayisi = 0;
                var kimleNoSpace = mesajSirasi[kimle].replace(/\s/g,'_');
                
                for (var ileti in mesajListesi[mesajSirasi[kimle]]) {
                    var yeniKutu = mesajListesi[mesajSirasi[kimle]][ileti];//.cloneNode(true);
                    anaListe.removeChild(mesajListesi[mesajSirasi[kimle]][ileti]);
                    
                    var cevapTusu = xpath(".//span/table/tbody/tr/td[2]/span",yeniKutu).snapshotItem(0);
                    cevapTusu.setAttribute("onclick", "document.getElementById('composeBox_"+kimleNoSpace+"').style.display = ''; setmsg(G('to_"+kimleNoSpace+"'),G('d_"+kimleNoSpace+"'),'"+mesajSirasi[kimle]+"')");
                    
                    yeniKutu.style.padding = "0.5em";
                    yeniKutu.style.margin = "2px";
                    yeniKutu.style.display = "none";
                    //if ((kimle + ileti) == 0) yeniKutu.style.marginRight = "145px";
                    if (padded == 0) {
                        var threadTitle = newElem("li");
                        threadTitle.style.textAlign = "left";
                        threadTitle.style.borderWidth = "1px";
                        threadTitle.style.borderStyle = "solid";
                        threadTitle.style.margin = "2px";
                        threadTitle.style.padding = "4px";
                        threadTitle.style.marginTop = "0.2em"; //Thread aralarina biraz bosluk
                        //if ((kimle + ileti) == 0) threadTitle.style.marginRight = "145px";
                        threadTitle.setAttribute("epp_headOfThread","thr-"+mesajSirasi[kimle].replace(/\s/g,'_'));
                        threadTitle.setAttribute("epp_collapseStatus", 0);
                        threadTitle.addEventListener("click",function(){
                            this.style.borderColor = "";
                            var thr = this.getAttribute("epp_headOfThread");
                            var colStatus = this.getAttribute("epp_collapseStatus");
                            var unrStatus = (this.getAttribute("epp_unreadStatus") != 0)?1:0;
                            var thrMsgList = xpath("//li[@epp_msgthread='"+thr+"']");
                            for (var i=0; i<thrMsgList.snapshotLength; i++) {
                                var msg = thrMsgList.snapshotItem(i);
                                if (colStatus == 0 && unrStatus) {
                                    this.setAttribute("epp_collapseStatus", 1);
                                    if (msg.getAttribute("epp_unread") == "yes") //Sadece okunmamis mesajlar
                                        msg.style.display = "";
                                } else if (colStatus == 1 || (colStatus == 0 && !unrStatus)) {
                                    this.setAttribute("epp_collapseStatus", 2);
                                    if (msg.getAttribute("epp_unread")) //Sadece mesajlar, 'yeni mesaj' kutusu degil
                                        msg.style.display = "";
                                } else {
                                    this.setAttribute("epp_collapseStatus", 0);
                                    msg.style.display = "none";
                                }
                            }
                        },false);
                        anaListe.appendChild(threadTitle);
                        //yeniKutu.insertBefore(threadTitle, yeniKutu.firstChild)
                        //if (kimle > 0) yeniKutu.style.marginTop = "2em"; //Thread aralarina biraz bosluk
                    } else if (padded > 0) {
                        yeniKutu.style.marginLeft = "5em";
                    }
                    if ((highlight++)%2) {
                        yeniKutu.className = "";
                        yeniKutu.style.borderWidth = "1px";
                        yeniKutu.style.borderStyle = "solid";
                    } else {
                        yeniKutu.className = "highlight";
                        yeniKutu.style.borderWidth = "1px";
                        yeniKutu.style.borderStyle = "solid";
                    }
                    
                    if (yeniKutu.getAttribute("epp_unread") == "yes") {
                        //EppAPI_log("Threadde yeni mesaj var >> Thread: " + mesajSirasi[kimle] +" | Mesaj: " + mesajListesi[mesajSirasi[kimle]][ileti].id);
                        yeniMesajSayisi++;
                        yeniKutu.style.borderColor = "#DB0028";
                        yeniKutu.style.borderWidth = "1px";
                    }
                    
                    anaListe.appendChild(yeniKutu);
                    padded++;
                    toplamMesajSayisi++;
                }
                toplamOkunmamis += yeniMesajSayisi;
                threadTitle.style.position = "relative";
                threadTitle.innerHTML = "<b>(<a class='gb'>"+yeniMesajSayisi+"</a> yeni | <a class='gb'>"+toplamMesajSayisi+"</a> toplam) <a href='show.asp?t="+encodeURIComponent(mesajSirasi[kimle])+"'>"+mesajSirasi[kimle]+"</a></b>";
                var okunduBut = newElem("a");
                okunduBut.innerHTML = "✔ ✔ ...";
                okunduBut.title = "tum grubu okundu olarak isaretle";
                okunduBut.style.position = "absolute";
                okunduBut.style.right = "10px";
                okunduBut.style.cursor = "pointer";
                okunduBut.addEventListener("click",function(e){
                    parent = this.parentNode;
                    var thr = parent.getAttribute("epp_headOfThread");
                    var thrMsgList = xpath("//li[@epp_msgthread='"+thr+"']");
                    var okunmusMesajlar = JSON.parse(EppAPI_getValue(System.storage.okunmusMesajListesi, '{}'));
                    for (var i=0; i<thrMsgList.snapshotLength; i++) {
                        var msg = thrMsgList.snapshotItem(i);
                        okunmusMesajlar[msg.id] = 1;
                        msg.style.borderColor = "";
                    }
                    EppAPI_setValue(System.storage.okunmusMesajListesi, JSON.stringify(okunmusMesajlar));
                    parent.setAttribute("epp_unreadStatus", 1);
					parent.style.borderColor = "";
                    e.stopPropagation();
                },false);
                threadTitle.appendChild(okunduBut);
                threadTitle.setAttribute("epp_unreadStatus", (yeniMesajSayisi?1:0));
                if (yeniMesajSayisi) threadTitle.style.borderColor = "#DB0028";
                var yeniMesajPaneli = idGet("ssg").cloneNode(true);
                var toField = xpath(".//*[@id='to']",yeniMesajPaneli).snapshotItem(0);
                var mesajField = xpath(".//*[@id='d']",yeniMesajPaneli).snapshotItem(0);
                yeniMesajPaneli.id = "ssg_"+kimleNoSpace;
                toField.id = "to_"+kimleNoSpace;
                toField.value = mesajSirasi[kimle];
                mesajField.id = "d_"+kimleNoSpace;
                xpath(".//input[@type='submit']",yeniMesajPaneli).snapshotItem(0).setAttribute("onclick", "nof(window);if (nada(G('"+"to_"+kimleNoSpace+"').value)) {alert('kime?');return false;}");
                var tuslar = xpath(".//div/input",yeniMesajPaneli);
                for (var i=0; i<tuslar.snapshotLength; i++) {
                    var tus = tuslar.snapshotItem(i);
                    var onclickStr = tus.getAttribute("onclick");
                    onclickStr = onclickStr.replace(/hen\('d'/,"hen('"+"d_"+kimleNoSpace+"'");
                    tus.setAttribute("onclick", onclickStr);
                }
                var yeniMesajKutusu = yeniKutu.cloneNode(false);
                yeniMesajKutusu.setAttribute("epp_unread", '')
                if ((highlight++)%2) {
                    yeniMesajKutusu.className = "";
                } else {
                    yeniMesajKutusu.className = "highlight";
                }
                yeniMesajKutusu.style.borderColor = "";
                yeniMesajKutusu.style.marginLeft = "5em";
                yeniMesajKutusu.innerHTML = "";
                yeniMesajKutusu.id = "composeBox_"+kimleNoSpace;
                yeniMesajKutusu.style.display = "none";
                yeniMesajKutusu.appendChild(yeniMesajPaneli);
                anaListe.appendChild(yeniMesajKutusu);
            }
            
            topDocument.title = "("+toplamOkunmamis+") Mesaj Kutusu";
        }
    
        function tumMallariAktar() {
            var ctr = 0;
            for (var i=0; i < mallar.snapshotLength; i++) {
                if (donuzEkle(mallar.snapshotItem(i).innerHTML)) {
                    ctr++;
                }
            }
            ozAyarMenusuMesaj.innerHTML = "<i>" + ctr + " yeni donuz eklendi!</i><br/><br/><b>Guncel Donuz Listesi:</b><br/>" + Ayarlar.donuzListesi.join("<br/>") + "<br/>";
        }
    
        function seciliMallariAktar() {
            var ctr = 0;
            for (var i=0; i < mallar.snapshotLength; i++) {
                if (mallar.snapshotItem(i).previousSibling.previousSibling.checked) {
                    if (donuzEkle(mallar.snapshotItem(i).innerHTML)) {
                        ctr++;
                    }
                }
            }
            ozAyarMenusuMesaj.innerHTML = "<i>" + ctr + " yeni donuz eklendi!</i><br/><br/><b>Guncel Donuz Listesi:</b><br/>" + Ayarlar.donuzListesi.join("<br/>");
        }
        
        function seciliMallariSil() {
            for (var i=0; i < mallar.snapshotLength; i++) {
                if (mallar.snapshotItem(i).previousSibling.previousSibling.checked)
                    donuzCikar(mallar.snapshotItem(i).innerHTML);
            }
            ozAyarMenusuMesaj.innerHTML = "<i>Secili kisiler donuzlardan silindi!</i><br/><br/><b>Guncel Donuz Listesi:</b><br/>" + Ayarlar.donuzListesi.join("<br/>");
        }
        
        function malSevkiyatiSistemiKur() {
            var sayfa = xpath("/html/body/table/tbody/tr/td/form").snapshotItem(0).parentNode;
            
            var ozAyarMenusu = document.createElement("fieldset");
            var ozAyarMenusuBaslik = document.createElement("legend");
            
            ozAyarMenusuMesaj = document.createElement("div");
            ozAyarMenusuMesaj.style.marginTop = "2em";
            ozAyarMenusuMesaj.innerHTML = "<br/><br/><b>Guncel Donuz Listesi:</b><br/>" + Ayarlar.donuzListesi.join("<br/>");
            
            ozAyarMenusuBaslik.innerHTML = "<b>Eksi++ Donuz Listesi Islemleri</b>";
            ozAyarMenusu.appendChild(ozAyarMenusuBaslik);
            
            ozAyarMenusu.style.width = "45em";
            ozAyarMenusu.style.marginTop = "2em";
            ozAyarMenusu.style.padding = "5px";
            ozAyarMenusu.style.paddingRight = "0";
            
            var tusHepsiniEkle = yeniEksiTusu("input");
            var tusSecilenleriEkle = yeniEksiTusu("input");
            var tusSecilenleriSil = yeniEksiTusu("input");
            
            tusHepsiniEkle.value = "Hepsini Donuzlara Ekle";
            tusHepsiniEkle.title = "Butun mallar listesini donuz listesine aktarir, zamandan kazandirir";
            tusHepsiniEkle.style.marginRight = "2em";
            tusHepsiniEkle.addEventListener("click", function() { tumMallariAktar(); }, false);
            
            tusSecilenleriEkle.value = "Secilenleri Donuzlara Ekle";
            tusSecilenleriEkle.title = "Secilen mallari donuz listesine aktarir (seckin donuz modu)";
            tusSecilenleriEkle.style.marginRight = "2em";
            tusSecilenleriEkle.addEventListener("click", seciliMallariAktar, false);
            
            tusSecilenleriSil.value = "Secilenleri Donuzlardan Sil";
            tusSecilenleriSil.title = "Secilen mallari donuz listesinden cikarir (Pollyanna modu)";
            tusSecilenleriSil.addEventListener("click", seciliMallariSil, false);
            
            ozAyarMenusu.appendChild(tusHepsiniEkle);
            ozAyarMenusu.appendChild(tusSecilenleriEkle);
            ozAyarMenusu.appendChild(tusSecilenleriSil);
            
            sayfa.appendChild(ozAyarMenusu);
            sayfa.appendChild(ozAyarMenusuMesaj);
        }
        
        this.basla = function() {
            if (debug) EppAPI_log("AYAR MERKEZI BASLADI");
            
            //pencere basligini duzenleyelim
            topDocument.title = "kontrol merkezi - ekşi sözlük - kutsal bilgi kaynağı";
            
            if (window.location.href.match(/cc.asp\?sec=ml/)) {
                malSevkiyatiSistemiKur();
            } else if (window.location.href.match(/cc.asp\?sec=ma[^&]*$/)) {
                mesajlariDuzenle();
            } else {
                if (debug) EppAPI_log("Bu ayar menusu bizi ilgilendirmiyor: " + window.location.href);
            }
        }
    }

    
    //// UST FRAME ENGINE ////
    function UstFrameEngine() {
        
        function guncellemePaneli(yeniSurum) {                           
            var anaPanel = newElem("div");
            anaPanel.style.cssFloat = "right";            
            anaPanel.style.width = "500px";
            anaPanel.style.height = "40px";
            anaPanel.style.textAlign = "right";
            anaPanel.style.verticalAllign = "middle";
            anaPanel.style.padding = "1em 0";
            anaPanel.innerHTML = ""+
            "<b>Yeni <a href='show.asp?t=eksi%2B%2B' target='sozmain'>Eksi++</a> cikmis: <a class='url' href='http://userscripts.org/scripts/show/"+meta.id+"'>v"+yeniSurum+"</a></b>"+
            '<a style="padding:2px 1em; margin:0 2em 0 1em;" class="but" href="https://userscripts.org/scripts/source/'+meta.id+'.user.js" target="_blank" title="Hanim kos guncelleme olmus!" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">Ersin Ozbukey ile Guncelli-yorum!</a>'+
            "";
            document.body.insertBefore(anaPanel, document.body.firstChild);
        }
    
        function guncellemeKontrolu() {
            var bugun = (new Date()).getDay();
            if ((meta.branch != "eppdev") && EppAPI_getValue(System.storage.sonKontrolGunu, -1) == bugun) {
                EppAPI_log("Guncelleme kontrolu bugun daha once yapilmis!");
                return; //Bugun kontrol etmisiz zaten...
            }
            EppAPI_setValue(System.storage.sonKontrolGunu, bugun);
            EppAPI_log("Guncelleme kontrolu basladi!");
            // Elimizdeki surum guncel mi bir bilene soralim
            EppAPI_JSONRequest({
                url: "http://mekan.dreamhosters.com/eksi++/version.php?id="+meta.id+"&v="+meta.version+"&r="+((new Date()).getTime()),
                method: "GET",
                data: "",
                onload: function(json){
                    try { 
                        if (json.uptodate == "no") {
                            EppAPI_log("Guncelleme VAR >> Yeni Surum: " + json.latest);
                            EppAPI_setValue(System.storage.isUpToDate, 0);
                            EppAPI_setValue(System.storage.latestVersion, json.latest);
                            //guncellemePaneli(json.latest);
                            setTimeout(function(){ guncellemePaneli(json.latest); }, 1000);
                        } else {
                            EppAPI_log("Guncelleme yok >> Eldeki Surum: " + meta.version);
                            EppAPI_setValue(System.storage.isUpToDate, 1);
                            EppAPI_setValue(System.storage.latestVersion, meta.version);
                            //Guncelleme yok, 15dk sonra bir daha bakalim
                            setTimeout(guncellemeKontrolu, 1000*60*60);
                        }
                    } catch (e) {
                        // Himm, madem bir sorun cikti, en yakin zamanda yine deneyelim (15 dk.)
                        setTimeout(guncellemeKontrolu, 1000*60*15);
                    }
                },
            });
        }
    
        this.basla = function() {
            EppAPI_log("UST FRAME BASLADI");
            //Guncelleme kontrolu baslasin
            guncellemeKontrolu();
        }
    }
    
    
    //// SOL FRAME ENGINE ////
    function SolFrameEngine() {        
        // Basliklarin XPath listesi
        var basliklar;
        
        var solFrameReloadTO;
        
        function baslikFiltrelemeBitti() {
            if (debug) EppAPI_log("Baslik Filtreleme Tamamlandi");
        }

        // Proxy'de olmayan basliklari bizzat request edip
        // yazarini bulmak
        function baslikFiltresi(baslik) {

            var baslikRef = baslik;

            this.basla = function () {
                var adres = baslikRef.href;
                var oldInnerHtml = baslikRef.innerHTML;
                //baslikRef.innerHTML += " <b>++</b>"; // Easter Egg :)
                adres = adres.replace(/&.*/i, "");
                adres += "&nr=y"; // Baslik yonlendirmeye hayir! 
                var req =  new XMLHttpRequest();
                req.open("GET", adres, true);
                req.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        var baslikDoc = document.createElement("div");
                        baslikDoc.innerHTML = req.responseText;
                        var girdiler = xpath("./ol/li/div/a", baslikDoc);
                        if (girdiler.snapshotLength > 0) {
                            var ilkSuser = girdiler.snapshotItem(0).innerHTML;
                            if (isDonuz(ilkSuser)) {
                                EppAPI_log("Islenen Baslik Adresi: " + adres + " @ Sonuc: Donuz, Acan: " + ilkSuser);
                                alalimArkadasi(baslikRef.parentNode);
                                baslikRef.parentNode.setAttribute("epp_donuz", ilkSuser);
                            } else {
                                EppAPI_log("Islenen Baslik Adresi: " + adres + " @ Sonuc: Temiz, Acan: " + ilkSuser);
                            }
                        } else {
                            //Boyle bir baslik hic olmamis ki!
                            EppAPI_log("Baslik Bos Cikti: " + adres);
                        }
                        kacKisiyiz--;
                        baslikRef.innerHTML = oldInnerHtml;
                        EppAPI_log("Baslik Talepleri, Kac Kisiyiz: " + kacKisiyiz);
                        if (kacKisiyiz <= 0)
                            baslikFiltrelemeBitti();
                    }
                };
                req.send(null);
            };
        }
        
        // Proxy'den gelen cevaba gore basliklari filtreleme        
        function proxyBasliklariFiltrele(proxyResp) {
            for (var i = 0; i < basliklar.snapshotLength; i++) {
                var baslik = basliklar.snapshotItem(i);
                
                if (proxyResp) {
                    for (var proxyBaslik in proxyResp) {
                        if (baslik.innerHTML == proxyBaslik) {
                            kacKisiyiz++;
                            neredeKaldik++;
                            
                            if (proxyResp[proxyBaslik]) {       
                                var acan = proxyResp[proxyBaslik];
                                if (isDonuz(acan)) {
                                    alalimArkadasi(baslik.parentNode);
                                    baslik.parentNode.setAttribute("epp_donuz", acan);
                                    EppAPI_log("Baslik Proxy'den Bulundu: Sonuc: DONUZ! | Acan: " + proxyResp[proxyBaslik] + " | Baslik: '" + baslik.innerHTML + "'");
                                } else {
                                    baslik.setAttribute("donuz", 0);
                                    EppAPI_log("Baslik Proxy'den Bulundu: Sonuc: Normal | Acan: " + proxyResp[proxyBaslik] + " | Baslik: '" + baslik.innerHTML + "'");
                                }
                                
                                kacKisiyiz--;
                            } else {
                                EppAPI_log("Baslik Proxy'de Yok: " + baslik.innerHTML);
                                // Proxy'de olmayan basliklari bizzat request edip
                                // yazarini bulmak
                                var filtre =  new baslikFiltresi(baslik);
                                filtre.basla();
                            }
                        }
                    }
                } else {
                    EppAPI_log("Baslik Proxy'de Yok: " + baslik.innerHTML);
                    // Proxy'de olmayan basliklari bizzat request edip
                    // yazarini bulmak
                    kacKisiyiz++;
                    var filtre =  new baslikFiltresi(baslik);
                    filtre.basla();
                }
            }
            
            if (kacKisiyiz == 0) {
                // Hersey proxy'de varmis! Hayat ne guzel...
                baslikFiltrelemeBitti();
            }
        }

        // Bir sonraki baslik grubunu filtreleme
        function donuzFiltrele() {
            if (!Ayarlar.donuzBasliklariniGizle) return;
            
            var surdan = neredeKaldik;
            var suraya = basliklar.snapshotLength;

            EppAPI_log("Basliklar: " + surdan + " -> " + suraya + "" );
            
            var baslikList = new Array();
            
            for (var i = surdan; i < suraya; i++) {
                var baslik = basliklar.snapshotItem(i);
                baslikList.push(baslik.innerHTML);
            }
            
            var proxyUrl = "http://mekan.dreamhosters.com/eksi++/proxy.php?r=" + ((new Date()).getTime());
            
            var proxyJsonData = JSON.stringify(baslikList);
            
            var proxyResp;
            
            EppAPI_log("Proxy Requesti | URL: " + proxyUrl + " | Data: " + proxyJsonData);
            
            EppAPI_JSONRequest({
                url: proxyUrl,
                method: "POST",
                data: encodeURIComponent(proxyJsonData),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                onload: proxyBasliklariFiltrele,
            });
        }
        
        function regexFiltrele() {
            if (!Ayarlar.yasakliBasliklariGizle) return;
            
            for (var i=0; i<basliklar.snapshotLength; i++) {
                var baslik = basliklar.snapshotItem(i);
                var baslikStr = baslik.textContent;
                //EppAPI_log("Baslik inceleniyor: "+baslikStr);
                for (var j in Ayarlar.yasakliRegexListesi) {
                    var re = new RegExp(Ayarlar.yasakliRegexListesi[j],"i");
                    if (re.test(baslikStr)) {
                        alalimArkadasi(baslik.parentNode);
                        baslik.parentNode.setAttribute("epp_yasakli", "true");
                        EppAPI_log("Baslik YASAKLI cikti: " + baslikStr + " | RE='"+Ayarlar.yasakliRegexListesi[j]+"'");
                    }
                }
            }
        }
        
        function ucNoktaEkle() {
            if (!Ayarlar.ucNoktayiGeriGetir) return;
            
            for (var i = 0; i < basliklar.snapshotLength; i++) {
                var baslik = basliklar.snapshotItem(i);
                if (baslik.href.match(/&(a=(td|yd|fv|sr)|d=\d\d\.\d\d\.\d\d\d\d)/)) {   
                    var ucnokta = document.createElement("a");
                    ucnokta.href = baslik.href;
                    ucnokta.title = baslik.title;
                    ucnokta.target = baslik.target;
                    ucnokta.innerHTML = "...";
                    ucnokta.style.visibility = "hidden";
                    ucnokta.style.marginLeft = "0.2em";
                    baslik.parentNode.addEventListener("mouseover", (function(pUcnokta){
                        return function(){
                            pUcnokta.style.visibility = "visible";
                        };
                    })(ucnokta), true);
                    baslik.parentNode.addEventListener("mouseout", (function(pUcnokta){
                        return function(){
                            pUcnokta.style.visibility = "hidden";
                        };
                    })(ucnokta), true);
                    baslik.href = baslik.href.replace(/&(a=(td|yd|fv|sr)|d=\d\d\.\d\d\.\d\d\d\d)/,'');
                    baslik.title = baslik.title.replace(/\((\d+)\/(\d+)\)/, "($2)"); //Tesekkurler vape@eksisozluk
                    //baslik.title = baslik.innerHTML;
                    baslik.parentNode.appendChild(ucnokta);
                }
            }
        }
        
        // Baslik filtreleme baslangic noktasi
        function basliklariDuzenle() {
            baslikListesi = xpath("/html/body/ul", document).snapshotItem(0);
            
            if (!baslikListesi) return;
        
            basliklar = xpath("//ul/li/a");
            
            if (debug) EppAPI_log("SOL FRAME BASLADI");

            regexFiltrele();
            donuzFiltrele();
            ucNoktaEkle();
        }

        function otomatikYenilemeyiDuzenle() {
            if (EppAPI_getValue(System.storage.solFrameReload,0)) {
                var seconds = parseInt(EppAPI_getValue(System.storage.solFrameReload,0));
                if (seconds) {
                    solFrameReloadTO = setTimeout(function(){
                        window.location.reload();
                    }, (seconds*1000));
                }
            }
        }
        
        function otomatikYenilemeyiBaslatBitir(tus,oySaniyesi) {
            if (tus.value == "yenile") {
                var seconds = parseInt(oySaniyesi.value);
                if (seconds) {
                    solFrameReloadTO = setTimeout(function(){
                        window.location.reload();
                    }, (seconds*1000));
                    EppAPI_setValue(System.storage.solFrameReload, seconds);
                    oySaniyesi.setAttribute("disabled","true");
                    tus.value = "iptal";
                    tus.title = "Yenilemeyi bitir!";
                } else {
                    alert("oyle zaman araligi mi olur?");
                }
            } else {
                clearTimeout(solFrameReloadTO);
                EppAPI_setValue(System.storage.solFrameReload, 0);
                oySaniyesi.removeAttribute("disabled");
                tus.value = "yenile";
                tus.title = "verilen aralikta sol frame'i surekli yenile";
            }
        }
        
        function arayuzElemanlariniEkle() {
            var acKapaBut = yeniEksiTusu("input");
            var solFrameKonsol = newElem("div");
            
            //En alta bir bosluk...
            document.body.appendChild(newElem("br"));
            
            acKapaBut.value = "o_0";
            acKapaBut.style.position = "fixed";
            acKapaBut.style.bottom = "0";
            acKapaBut.style.left = "0";
            acKapaBut.style.width = "100%";
            acKapaBut.style.height = "20px";
            acKapaBut.style.borderWidth = "1px";
            acKapaBut.addEventListener("click",function(){
                if (solFrameKonsol.style.display == "none") {
                    solFrameKonsol.style.display = "";
                    this.value = "x";
                } else {
                    solFrameKonsol.style.display = "none";
                    this.value = "o_0";
                }
            },false);
            document.body.appendChild(acKapaBut);
            
            solFrameKonsol.style.width = "100%";
            solFrameKonsol.style.display = "none";
            solFrameKonsol.style.position = "fixed";
            solFrameKonsol.style.bottom = "20px";
            solFrameKonsol.style.left = "0";
            solFrameKonsol.style.border = "2px solid";
            solFrameKonsol.style.borderWidth = "2px 0 0 0";
            solFrameKonsol.style.borderColor = "rgba(0,0,0,.5)";
            solFrameKonsol.style.padding = "6px";
            solFrameKonsol.style.backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");
            //solFrameKonsol.style.lineHeight = "120%";
            setTimeout(function(){
                solFrameKonsol.style.backgroundImage = window.getComputedStyle(document.body, null).getPropertyValue("background-image");
                solFrameKonsol.style.backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");
            }, 2000);
            solFrameKonsol.style.display = "none";
            document.body.insertBefore(solFrameKonsol, document.body.firstChild);
            
            var oyDiv = newElem("div");
            oyDiv.style.marginBottom = "5px";
            var oySaniyesi = newElem("input");
            var reloadInt = EppAPI_getValue(System.storage.solFrameReload, 0);
            oySaniyesi.type = "text";
            oySaniyesi.style.width = "3em";
            oySaniyesi.style.marginRight = "0.5em";
            oySaniyesi.value = parseInt(reloadInt) || "60";
            if (reloadInt)
                oySaniyesi.setAttribute("disabled","true");
            else
                oySaniyesi.removeAttribute("disabled");
            var oyAcKapaBut = yeniEksiTusu("input");
            oyAcKapaBut.value = reloadInt?"iptal":"yenile";
            oyAcKapaBut.title = "verilen aralikta sol frame'i surekli yenile";
            oyAcKapaBut.style.width = "120px";
            oyAcKapaBut.addEventListener("click",function(){
                otomatikYenilemeyiBaslatBitir(this, oySaniyesi);
            },false);
            
            //Gunun Onemi ve Serhat hesaplamalari
            //// Contributor: armish ////
            var currentURL = window.location.href;
            var currentTime = new Date();

            if (currentURL.match(/&fd=(\d+)/)) {
                currentTime.setDate((currentURL.match(/&fd=(\d+)/))[1]);
                currentTime.setMonth((currentURL.match(/&fm=(\d+)/))[1]-1);
                currentTime.setFullYear((currentURL.match(/&fy=(\d+)/))[1]);
            } else if (currentURL.indexOf("a=yd") > 0 ) {
                currentTime.setTime( currentTime.getTime() - 1000*60*60*24 );
            } else if (currentURL.indexOf("a=ly") > 0 ) {
                currentTime.setFullYear( currentTime.getFullYear() - 1 );
            }
            else if (currentURL.indexOf("a=rd") > 0 ) {
                var divElements = document.getElementsByTagName("div");
                var pagiDiv;
                for(var i=0; i < divElements.length; i++)
                    if( divElements[i].className == "pagi" )
                        pagiDiv = divElements[i];
                
                var pagiWords = pagiDiv.innerHTML.split(" ");
                var months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
                              "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
                var randMonth = 0;
                for(var i=0; i < months.length; i++) {
                    if( months[i].toLowerCase() == pagiWords[1].toLowerCase() ) {
                        randMonth = i;
                        break;
                    }
                }
                        
                currentTime.setDate( pagiWords[0] );
                currentTime.setMonth( randMonth );
                currentTime.setFullYear( pagiWords[2] );
            }
            
            //Serhat
            var serhatDiv = newElem("div");
            serhatDiv.style.marginBottom = "5px";
            var gundemTusu = yeniEksiTusu("input");
            gundemTusu.value = "neler donmus serhat?";
            gundemTusu.title = "bugun en cok entry girilen, en populer basliklari getir";
            gundemTusu.style.width = "220px";
            gundemTusu.addEventListener("click",function(){
                var month = currentTime.getMonth() + 1;
                var day = currentTime.getDate();
                var year = currentTime.getFullYear();
                window.location.href = 'index.asp?a=sr&kw=&au=&so=g&fd='+day+'&fm='+month+'&fy='+year;
            },false);
                
            //Gunun Onemi
            var gununOnemiDiv = newElem("div");
            gununOnemiDiv.style.marginBottom = "5px";
            var gununOnemiTusu = yeniEksiTusu("input");
            gununOnemiTusu.value = "gunun anlam ve onemi";
            gununOnemiTusu.title = "bugun ile alakali basliklari getir";
            gununOnemiTusu.style.width = "220px";
            gununOnemiTusu.addEventListener("click",function(){
                var months = ["ocak","subat","mart","nisan","mayis","haziran",
                              "temmuz","agustos","eylul","ekim","kasim","aralik"];
                var month = months[currentTime.getMonth()];
                var day = currentTime.getDate();
                var year = currentTime.getFullYear();
                window.location.href = "index.asp?a=sr&kw="+day+"+"+month+"+"+year+"&au=&so=g&fd=&fm=&fy=";
            },false);
            
            oyDiv.appendChild(oySaniyesi);
            oyDiv.appendChild(newText("sn'de bir "));
            oyDiv.appendChild(oyAcKapaBut);
            solFrameKonsol.appendChild(oyDiv);
            
            serhatDiv.appendChild(gundemTusu);
            solFrameKonsol.appendChild(serhatDiv);
            
            gununOnemiDiv.appendChild(gununOnemiTusu);
            solFrameKonsol.appendChild(gununOnemiDiv);
        }
        
        
    //--// Sol Frame Engine - GIRIS //--//
        this.basla = function () {
            arayuzElemanlariniEkle();
            otomatikYenilemeyiDuzenle();
            basliklariDuzenle();
        }
    }


    //// SAG FRAME ENGINE
    function SagFrameEngine() {
    
        var spoilerVar = 0;
        
        var baslikKontrol = 10;
        
        var aramaKutusu;
        var hangiArama = 0;
        var aktifAramalar = 0;
        var oncekiArama;
        var oncekiDeger = '';
        var baslikListesi = {karisik:0, liste:{}};
        var intervalRef;
        
        var sabitBaslik;
        
        function henti(s, a, b) {
            var ts = s.replace(/(^\s+|\s+$)/,'');
            var ps = s.indexOf(ts);
            return s.substring(0, ps) + a + ts + b + s.substring(ps + ts.length, s.length);
        } 
        
        function bkzHazirla(konu, bas, son) {
            var box = idGet("d");
            box.focus();
            var selText = box.value.substring(box.selectionStart, box.selectionEnd);
            //alert(selText);
            if (selText && (selText.length <= 50 || (selText.length > 50 && confirm("Emma Watson: 50 karakteri asiyorsunuz!\n\nYine de "+konu+" yapilsin mi?")))) {
                var f = true;
                var s = box.value;
                var start = box.selectionStart;
                var end = box.selectionEnd;
                if (end && s.length > 0) {
                    box.value = s.substring(0, start) + henti(s.substring(start, end), bas, son) + s.substring(end);
                    end += bas.length + son.length;
                    box.setSelectionRange(end, end);
                    f = false;
                }
            } else if (!selText) {
                var s = prompt("hangi basliga "+konu+" verilesi?", "") || "";
                if ((s.length > 0 && s.length <= 50) || (s.length > 50 && confirm("Emma Watson: 50 karakteri asiyorsunuz!\n\nYine de "+konu+" yapilsin mi?"))) { 
                    box.value += ' ' + bas + s.replace(/(^\s+|\s+$)/,'') + son;
                }
            }
        }
        
        function entryKutusunuGelistir() {
            var bkzTusu = xpath("//input[@value='(bkz: )']").snapshotItem(0);
            var gizliBkzTusu = xpath("//input[@value='``']").snapshotItem(0);
            
            if (bkzTusu) {
                bkzTusu.setAttribute("onclick","");
                bkzTusu.addEventListener("click",function(e){
                    bkzHazirla("bkz","(bkz: ",")");
                },true);
            }
            if (gizliBkzTusu) {
                gizliBkzTusu.setAttribute("onclick","");
                gizliBkzTusu.addEventListener("click",function(e){
                    bkzHazirla("gizli bkz","`","`");
                },true);
            }
        }
        
        function spoilerAcKapa(tus, spoiler) {
            if (alinmismiArkadas(spoiler)) {
                if (tus.nodeName == "A") tus.innerHTML = Ayarlar.dilBilgisi.spoilerKapama;
                if (tus.nodeName == "INPUT") tus.value = Ayarlar.dilBilgisi.spoilerKapama;
                tus.title = "Spoiler'i Gizle";
                tus.setAttribute("epp_status", "spoiler_open");
                cikaralimArkadasi(spoiler); 
            } else {
                if (tus.nodeName == "A") tus.innerHTML = Ayarlar.dilBilgisi.spoilerAcma;
                if (tus.nodeName == "INPUT") tus.value = Ayarlar.dilBilgisi.spoilerAcma;
                tus.title = "Spoiler'i Goster";
                tus.setAttribute("epp_status", "spoiler_closed");
                alalimArkadasi(spoiler);
            }
        }
        
        function tumSpoilerlariAc() {
            var spoilerTuslari = xpath("//a[@epp_status='spoiler_closed']");
            var clickEvt = document.createEvent("MouseEvents");
            clickEvt.initMouseEvent("click", true, true, window,
                                0, 0, 0, 0, 0, false, false, false, false, 0, null);

            for (var k=0; k<spoilerTuslari.snapshotLength; k++) {
                var cur = spoilerTuslari.snapshotItem(k);
                cur.dispatchEvent(clickEvt);
            }
            
            this.removeEventListener("click",tumSpoilerlariAc,true);
            this.addEventListener("click",tumSpoilerlariKapa,true);
            this.value = "tum spoilerlari kapa!";
        }
        
        function tumSpoilerlariKapa() {
            var spoilerTuslari = xpath("//a[@epp_status='spoiler_open']");
            var clickEvt = document.createEvent("MouseEvents");
            clickEvt.initMouseEvent("click", true, true, window,
                                0, 0, 0, 0, 0, false, false, false, false, 0, null);

            for (var k=0; k<spoilerTuslari.snapshotLength; k++) {
                var cur = spoilerTuslari.snapshotItem(k);
                cur.dispatchEvent(clickEvt);
            }
            
            this.removeEventListener("click",tumSpoilerlariKapa,true);
            this.addEventListener("click",tumSpoilerlariAc,true);
            this.value = "tum spoilerlari ac!";
        }

        function spoilerHazirla(nodes, spBas, spSon) {
            var spoilerIcerigi = new Array();
            var parent = nodes[spBas].parentNode;
            
            // Asil spoiler ifadesini bulalim
            var asilSpoiler;
            if (nodes[spBas].textContent.match(/spoiler/)) {
                asilSpoiler = nodes[spBas].textContent.replace(/-/g,'');
            } else if (nodes[spBas].nextSibling.textContent.match(/spoiler/)) {
                asilSpoiler = nodes[spBas].nextSibling.textContent.replace(/-/g,'');
            }
            
            var spoilerSpan = document.createElement("span");
            var spoilerWrapper = document.createElement("span");
            var acKapaWrapper = document.createElement("span");
            var acKapaTusu = document.createElement("a");
            spoilerSpan.innerHTML = "<br/>";
            spoilerSpan.setAttribute("epp_type", "spoiler_kutu");
            
            for (var i=spBas; i<=spSon; i++)
                spoilerSpan.appendChild(nodes[i].cloneNode(true));
                
            alalimArkadasi(spoilerSpan);
                      
            acKapaTusu.innerHTML = Ayarlar.dilBilgisi.spoilerAcma;
            acKapaTusu.setAttribute("epp_type", "spoiler_tus");
            acKapaTusu.setAttribute("epp_status", "spoiler_closed");
            acKapaTusu.className = "gb";
            acKapaTusu.title = "Spoiler'i Goster";
            acKapaTusu.href = "javascript:void(0)";
            acKapaTusu.style.textDecoration = "underline";
            acKapaWrapper.appendChild(acKapaTusu);
            //acKapaWrapper.style.backgroundImage = "url(" + transbg10UrlData + ")";
            
            // Eger asil spoiler ibaresinde ekstra bilgi varsa ekleyelim
            if (!(asilSpoiler.match(/^\s*spoiler\s*$/))) {
                var asilSpoilerSpan = document.createElement("span");
                asilSpoilerSpan.innerHTML = "(Spoiler aslen diyor ki: <b>"+asilSpoiler+"</b>)";
                asilSpoilerSpan.style.display = "none";
                asilSpoilerSpan.style.marginLeft = "1em";
                asilSpoilerSpan.style.textDecoration = "none";
                asilSpoilerSpan.setAttribute("epp_type","spoiler_asilspoiler");
                acKapaWrapper.insertBefore(asilSpoilerSpan, acKapaTusu.nextSibling);
            }
            
            spoilerWrapper.innerHTML = "(( <a class='gb' href='show.asp?t=spoiler'>spoiler</a>! )) &nbsp;";
            spoilerWrapper.appendChild(acKapaWrapper);
            spoilerWrapper.appendChild(spoilerSpan);
            
            return spoilerWrapper;    
        }

        function isNodeSpoilerAlert(pNode) {
            if (pNode.nodeName == "A") {
                if (pNode.textContent.match(/(-|- )+.*spoiler.*(-|- )+/)) {
                    return true;                    
                } else if (pNode.previousSibling) {
                    //if (debug) EppAPI_log("Anchor Node Bulundu: " + pNode.innerHTML + " " + pNode.previousSibling.nodeName + " " + pNode.previousSibling.nodeValue );
                    if (pNode.innerHTML.match(/spoiler/)
                        && pNode.previousSibling.nodeName == "#text"
                        && pNode.previousSibling.nodeValue.match(/[-]+/)){
                        //if (debug) EppAPI_log("Link Spoiler Ibaresi Bulundu: " + pNode.textContent);
                        return true;
                    }
                } else {
                    return false;
                }
            } else if (pNode.nodeName == "#text") {
                if (pNode.textContent.match(/(-|- )+.*spoiler.*(-|- )+/)){
                    //if (debug) EppAPI_log("Text Spoiler Ibaresi Bulundu: " + pNode.textContent);
                    return true;
                }
            }
            //if (debug) EppAPI_log("Spoiler Degil | Tip: "+pNode.nodeName+" | " + pNode);
            return false;
        }

        function spoilerFiltrele(pGirdi) {
            if (!Ayarlar.spoilerGizle) return;
            
            var newGirdi = pGirdi.cloneNode(true);
            
            newGirdi.innerHTML = "";
            
            var nodes = pGirdi.childNodes;

            for (var i=0; i<nodes.length; i++) {
                if (isNodeSpoilerAlert(nodes[i])) {
                    var yaziVar = 0;
                    for (var j=i+1; j<nodes.length; j++) {
                        if (isNodeSpoilerAlert(nodes[j])) {
                            if (yaziVar) {
                                spoilerVar = 1;
                                var kapanis = 0;
                                if (!(nodes[j].textContent.match(/[-]+\s*/))) {
                                    while (nodes[j + kapanis] && !(nodes[j + kapanis].textContent.match(/[-]+\s*/)))
                                        kapanis++;
                                }
                                if (newGirdi.lastChild && newGirdi.lastChild.nodeName == "#text") {
                                    newGirdi.removeChild(newGirdi.lastChild);
                                    newGirdi.appendChild(spoilerHazirla(nodes, i-1, j + kapanis));
                                } else {
                                    newGirdi.appendChild(spoilerHazirla(nodes, i, j + kapanis));
                                }
                                i = j+kapanis;
                                break;
                            } else {
                                if (newGirdi.lastChild && newGirdi.lastChild.nodeName == "#text") newGirdi.removeChild(newGirdi.lastChild);
                                i = j-2;
                                break;
                            }
                        } else if ((nodes[j].nodeName == "#text" || nodes[j].nodeName == "A") && nodes[j].textContent.match(/\w+/)) {
                            yaziVar = 1;
                        }                            
                    }
                    if (j == nodes.length) {
                        if (newGirdi.lastChild) newGirdi.removeChild(newGirdi.lastChild);
                        if (nodes[i+1].textContent.match(/[-]+\s*$/)) i++;
                    }
                } else {
                    newGirdi.appendChild(nodes[i].cloneNode(true));
                }        
            }
            
            pGirdi.innerHTML = newGirdi.innerHTML;
            
            var spoilerKutulari = xpath(".//span[@epp_type='spoiler_kutu']",pGirdi);
            var spoilerTuslari = xpath(".//a[@epp_type='spoiler_tus']",pGirdi);

            for (var k=0; k<spoilerTuslari.snapshotLength; k++) {
                var spoilerKutusu = spoilerKutulari.snapshotItem(k);
                var spoilerTusu = spoilerTuslari.snapshotItem(k);
                
                if (spoilerTusu.getAttribute("epp_handled") != "true") {
                    spoilerTusu.setAttribute("epp_handled", "true");
                    spoilerTusu.addEventListener("click", (function(pTus, pSpoiler) {
                        return (function() { spoilerAcKapa(pTus, pSpoiler); return false; } );
                    })(spoilerTusu, spoilerKutusu), true);
                    spoilerTusu.addEventListener("mouseover", (function(pTus) {
                        return (function() { 
                            if (pTus.nextSibling && pTus.nextSibling.getAttribute("epp_type") == "spoiler_asilspoiler")
                                pTus.nextSibling.style.display = "";
                        } );
                    })(spoilerTusu), true);
                    spoilerTusu.addEventListener("mouseout", (function(pTus) {
                        return (function() { 
                            if (pTus.nextSibling && pTus.nextSibling.getAttribute("epp_type") == "spoiler_asilspoiler")
                                pTus.nextSibling.style.display = "none";
                        } );
                    })(spoilerTusu), true);
                }
                
            }
        }

        function donuzGirdisiFiltrele(pGirdi, pYazar) {
            if (isDonuz(pYazar) && Ayarlar.donuzGirdileriniGizle) {
                alalimArkadasi(pGirdi);
                return true;
            } else {
                return false;
            }
        }

        function donuzTusuEkle(pGirdi, pYazar) {
            var gizliKutu = xpath("./div/div", pGirdi).snapshotItem(0);
            
            if (xpath(".//span[@title='sil']",pGirdi).snapshotLength) 
                return; //Adamin kendi entrysinde 'donuz' tusunun ne isi var, di mi?

            var donuzTusu = yeniEksiTusu("span");

            donuzTusu.title = "Donuzlara ekle";
            donuzTusu.innerHTML = "donuz?";
            donuzTusu.style.cssFloat = "right";
            donuzTusu.style.marginLeft = "1em";
            donuzTusu.style.marginTop = "1px";
            donuzTusu.style.paddingLeft = "0.5em";
            donuzTusu.style.paddingRight = "0.3em";

            donuzTusu.addEventListener("click", (function(pYazar) {
                return function() {
                    if (confirm("Belki '" + pYazar + "' iyidir de, cevresi kotudur.\n\nYine de Donuzlara eklensin mi?")) 
                        donuzEkle(pYazar);
                }
            })(pYazar),true);

            gizliKutu.insertBefore(donuzTusu, gizliKutu.firstChild.nextSibling);
        }
        
        function girdileriDuzenle() {
            var girdiler = xpath("//ol/li", document);
            //if (debug) EppAPI_log(girdiler.snapshotLength + " Tane Girdi Bulundu");

            for (var i = 0; i < girdiler.snapshotLength; i++) {
                var girdi = girdiler.snapshotItem(i); 
                var girdiSirasi = girdi.value;
                var yazar = xpath("./div/a", girdi).snapshotItem(0).innerHTML; 

                //if (debug) EppAPI_log("Girdi #" + girdiSirasi + " yazari: " + yazar);

                if (!donuzGirdisiFiltrele(girdi, yazar)) {
                    if(girdi.innerHTML.match(/spoiler.*spoiler/)) 
                        spoilerFiltrele(girdi);
                    donuzTusuEkle(girdi, yazar);
                }
            }

        }
       
        function onerileriSirala() {
            var yeniListe = {};
            var tempArray = [];
            for (var baslik in baslikListesi.liste) {
                tempArray.push({key: baslik, obj: baslikListesi.liste[baslik]});
            }
            tempArray.sort(function(a,b){ return (b.obj.girdiSayisi - a.obj.girdiSayisi); });
            for (var i in tempArray) {
                yeniListe[tempArray[i].key] = tempArray[i].obj;
            }
            baslikListesi.liste = yeniListe;
        }
        
        function onerileriSun(kelimeler) {
            if (baslikListesi.karisik) onerileriSirala();
            
            var kacTane = 0;
            var aramaKutusu = idGet("epp_aramaKutusu");
            var sonucKutusu = idGet("epp_aramaOneriKutusu");
            var sonucKutusuListe = idGet("epp_aramaOneriKutusuListe");
            var sonucKutusuBaslik = idGet("epp_aramaOneriKutusuBaslik");
            sonucKutusuListe.innerHTML = "";

            sonucKutusuBaslik.innerHTML = "<b style='color: #ffffff'>Arama: "+kelimeler.join(" ")+"</b>";
                        
            for (var baslik in baslikListesi.liste) {
                kacTane++;
                var oneri = newElem("div");
                var gosterilen = baslik;
                for (var i in kelimeler) {
                    if (!kelimeler[i]) break; //Chrome Fix
                    
                    var safKelime = kelimeler[i].replace(/[*]/g,'');
                    var regexp = "("+safKelime+")";
                    regexp = regexp.replace(/[çc]/g,'[çc]');
                    regexp = regexp.replace(/[öo]/g,'[öo]');
                    regexp = regexp.replace(/[ğg]/g,'[ğg]');
                    regexp = regexp.replace(/[üu]/g,'[üu]');
                    regexp = regexp.replace(/[şs]/g,'[şs]');
                    regexp = regexp.replace(/[ıi]/g,'[ıi]');
                    //EppAPI_log("RE: "+regexp);
                    regexp = new RegExp(regexp,"g");
                    gosterilen = gosterilen.replace(regexp,"<strong style=''>$1</strong>");
                }
                //var link = newElem("a");
                oneri.style.margin = "5px 0";
                oneri.innerHTML = "<a href='"+baslikListesi.liste[baslik].url+"' target='_blank' style='color: #ffffff'>"+gosterilen+"</a> ("+baslikListesi.liste[baslik].girdiSayisi+")";
                sonucKutusuListe.appendChild(oneri);
            }
            
            if (!kacTane) {
                var oneri = newElem("div");
                oneri.innerHTML = "<b>"+kelimeler.join(" ")+"</b> ne yahu?"; // veya "Bu sefer guldurmedi 8("
                sonucKutusuListe.appendChild(oneri);
            }
        }
        
        function onerileriBul() {
            var aramaKutusu = idGet("epp_aramaKutusu");
            var sonucKutusu = idGet("epp_aramaOneriKutusu");
            var sonucKutusuBaslik = idGet("epp_aramaOneriKutusuBaslik");
            
            sonucKutusuBaslik.innerHTML = "<b>Bir saniye...</b>";
            sonucKutusu.style.display = "";
            
            if (oncekiArama && oncekiArama == aramaKutusu.value) return;
            
            oncekiArama = aramaKutusu.value.replace(/(^\s+|\s+$)/, '');
            
            var kelimeler = aramaKutusu.value.replace(/(^\s+|\s+$)/, '').split(/\s+/);
            
            if (!kelimeler[0] || kelimeler[0].match(/^\s*$/)) { 
                //sonucKutusu.innerHTML = "";
                //sonucKutusu.style.display = "none";
                return;
            }
            
            baslikListesi = {sayi:0, liste:{}};
            EppAPI_log("Aranan Kelimeler: '"+ kelimeler[0] + "' @ " + kelimeler.length);
            
            var adresSablon = "index.asp?a=sr&kw=__KW__&au=&so=g&fd=&fm=&fy=";
            if (kelimeler.length == 1 && kelimeler[0].match(/^[*].+[*]$/))
                var adres = adresSablon.replace("__KW__", encodeURIComponent(kelimeler[0].replace(/^[*]/,'')));
            else
                var adres = adresSablon.replace("__KW__", encodeURIComponent(kelimeler.join(" ")));
            EppAPI_log("Adres: " + adres);
            var req =  new XMLHttpRequest();
            req.open("GET", adres, true);
            req.onreadystatechange = (function (pArama) { return function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        if (oncekiArama != pArama) {
                            aktifAramalar--;
                            //EppAPI_log("'"+oncekiArama + "' != '" + pArama + "'");
                            return; //Biz sonuc alana kadar baska arama olmus arada!
                        }

                        //EppAPI_log("Arama Sonucu: " + this.responseText);
                        var tempDiv = newElem("div");
                        tempDiv.innerHTML = this.responseText;
                        var basliklar = xpath(".//li", tempDiv);
                        for (var i = 0; i < basliklar.snapshotLength; i++) {
                            var baslik = basliklar.snapshotItem(i);
                            var baslikAdi = baslik.childNodes[0].innerHTML;
                            var baslikAdresi = baslik.childNodes[0].href;
                            var girdiSayisi = (baslik.childNodes[1])?parseInt(baslik.childNodes[1].textContent.replace(/\D/g,'')):0;
                            baslikListesi.liste[baslikAdi] = {"girdiSayisi":(girdiSayisi|1), url:baslikAdresi};
                            //EppAPI_log("Baslik: " + JSON.stringify(baslikListesi.liste[baslikAdi]));
                        }
                        aktifAramalar--;
                        if (aktifAramalar == 0) onerileriSun(kelimeler);
                    } else { 
                        // Hatalar hatalar hatalar
                    }
                }
            }})(oncekiArama);
            aktifAramalar++;
            if (kelimeler.length == 1 && kelimeler[0].match(/^[*].+[*]$/)) {
                adres = adresSablon.replace("__KW__", encodeURIComponent(kelimeler[0].replace(/[*]$/,'')));
                EppAPI_log("Adres2: " + adres);
                var req2 =  new XMLHttpRequest();
                req2.open("GET", adres, true);
                req2.onreadystatechange = (function (pArama) { return function() {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            if (oncekiArama != pArama) {
                                aktifAramalar--;
                                //EppAPI_log("'"+oncekiArama + "' != '" + pArama + "'");
                                return; //Biz sonuc alana kadar baska arama olmus arada!
                            }
                                
                            baslikListesi.karisik = 1;
                            //EppAPI_log("Arama Sonucu: " + this.responseText);
                            var tempDiv = newElem("div");
                            tempDiv.innerHTML = this.responseText;
                            var basliklar = xpath(".//li", tempDiv);
                            for (var i = 0; i < basliklar.snapshotLength; i++) {
                                var baslik = basliklar.snapshotItem(i);
                                var baslikAdi = baslik.childNodes[0].innerHTML;
                                var baslikAdresi = baslik.childNodes[0].href;
                                var girdiSayisi = (baslik.childNodes[1])?parseInt(baslik.childNodes[1].textContent.replace(/\D/g,'')):0;
                                baslikListesi.liste[baslikAdi] = {"girdiSayisi":(girdiSayisi|1), url:baslikAdresi};
                                //EppAPI_log("Baslik2: " + JSON.stringify(baslikListesi.liste[baslikAdi]));
                            }
                            aktifAramalar--;
                            if (aktifAramalar == 0) onerileriSun(kelimeler);
                        } else { 
                            // Hatalar hatalar hatalar
                        }
                    }
                }})(oncekiArama);
                aktifAramalar++;
                req.send(null);
                req2.send(null);
            } else {
                req.send(null);
            }
        }
        
        function initArama(event) {
            if (event.keyCode == 13) {
                EppAPI_log("Kutudaki deger: " + aramaKutusu.value);
                if (aramaKutusu.value && aramaKutusu.value.match(/\w/) && oncekiDeger != aramaKutusu.value.replace(/(^\s+|\s+$)/g,'')) {
                    EppAPI_log("Deger yeni. Ara!");
                    oncekiDeger = aramaKutusu.value.replace(/(^\s+|\s+$)/g,'');
                    onerileriBul();
                } else if (!aramaKutusu.value || aramaKutusu.value.match(/^\s*$/)) {
                    var aramaOneriKutusu = idGet("epp_aramaOneriKutusu");
                    aramaOneriKutusu.style.display = "none";
                }
            }
        }
        
        function sonEntrylereYenile() {
            var nextPageBut = xpath("/html/body/span[2]/span/a[starts-with(@title,'sonraki')]").snapshotItem(0);
            if (nextPageBut && nextPageBut.title.match(/sonraki/)) { //Sonraki sayfa varsa...
                window.location.href = nextPageBut.href;
            } else { //Sonraki sayfa yok, en son entry'yi baz alalim
                var entryler = document.getElementsByTagName('li');            
                var sonEntry = entryler[entryler.length-1];
                
                var baslik = xpath("/html/body/h1").snapshotItem(0).textContent.replace(/(^\s*|\s*[*]?$)/g,'');
                
                //window.location.href = window.location.href.replace(/show\.asp.+$/,"show.asp?t="+encodeURIComponent(baslik)+"&i="+sonEntry.id.replace(/\D/g,''));
                window.location.href = window.location.href.replace(/(&i=\d+|$)/,"&i="+sonEntry.id.replace(/\D/g,''));
            }
        }

        function frameSirinle() {
            var topFrame = newElem("iframe");
            var leftFrame = newElem("iframe");
            var rightFrame = newElem("iframe");
            
            topFrame.src = "top.asp";
            topFrame.id = "sozbar";
            topFrame.name = "sozbar";
            topFrame.style.position = "absolute";
            topFrame.style.left = "0";
            topFrame.style.top = "0";
            topFrame.style.height = "50px";
            topFrame.style.width = "100%";
            
            leftFrame.src = "index.asp";
            leftFrame.id = "sozindex";
            leftFrame.name = "sozindex";
            leftFrame.style.position = "absolute";
            leftFrame.style.left = "0";
            leftFrame.style.top = "50px";
            leftFrame.style.height = (window.innerHeight-50)+"px";
            leftFrame.style.width = "250px";
                        
            rightFrame.src = window.location.href.replace(/http:\/\/[^\/]+\//,"") + "&epp=epp";
            rightFrame.id = "sozmain";
            rightFrame.name = "sozmain";
            rightFrame.style.position = "absolute";
            rightFrame.style.left = "250px";
            rightFrame.style.top = "50px";
            rightFrame.style.height = (window.innerHeight-50)+"px";
            rightFrame.style.width = (window.innerWidth-250)+"px";
            
            setInterval(function(){
                leftFrame.style.height = (window.innerHeight-50)+"px";
                rightFrame.style.height = (window.innerHeight-50)+"px";
                rightFrame.style.width = (window.innerWidth-250)+"px";
            }, 1000);
            
            /*
            document.body.style.padding = "50px 0 0 250px";
            sabitBaslik.style.width = (window.innerWidth-260)+"px";
            sabitBaslik.style.margin = "50px 0 0 250px";
            sabitBaslik.style.position = "absolute";
            //*/
           
            //*
            var allBody = xpath("/html/body/*");
            for (var i=0; i<allBody.snapshotLength; i++) {
                if (allBody.snapshotItem(i).style)  
                    allBody.snapshotItem(i).style.display = "none";
            }
            //*/
            
            document.body.appendChild(topFrame);
            document.body.appendChild(leftFrame);
            document.body.appendChild(rightFrame);
        }
        
        function arayuzElemanlariniEkle() {
            var ayarTusu = yeniEksiTusu("input");
            ayarTusu.type = "button";
            ayarTusu.className = "but";
            ayarTusu.value = "Eksi++ Ayarlari";
            ayarTusu.addEventListener("click", ayarMenusunuGoster, true);
            ayarTusu.style.width = "95%";
            ayarTusu.style.marginBottom = "20px";
            var ayarCell = document.createElement("td");
            ayarCell.appendChild(document.createElement("br"));
            ayarCell.appendChild(ayarTusu);
            ayarCell.appendChild(document.createElement("br"))
            var ayarRow = document.createElement("tr");
            ayarRow.appendChild(ayarCell);
            var donBebegimBox = xpath("//*[@id='panel']/tbody").snapshotItem(0);
            donBebegimBox.insertBefore(ayarRow, donBebegimBox.firstChild);
            
            var baslikAltiBar = newElem("div");
            baslikAltiBar.id = "epp_baslikAltiBar";
            baslikAltiBar.style.marginRight = "120px"; //Sagdaki eksi tuslarina girmeyelim
            baslikAltiBar.style.width = "100%";
            //baslikAltiBar.style.cssFloat = "left";
            var baslik = xpath("//h1[@class='title']").snapshotItem(0);
            baslik.parentNode.insertBefore(baslikAltiBar, baslik.nextSibling);
            
            if (true) {
                //var yazi = "Eksi++ ile ari-yorum";
                var yazi = "aramayi baslatmak icin enter'a basila!";
                var aramaTusu = yeniEksiTusu("input");
                aramaKutusu = newElem("input");
                var aramaOneriKutusu = newElem("div");
                var aramaOneriKutusuBaslik = newElem("div");
                var aramaOneriKutusuListe = newElem("div");
                
                aramaTusu.value = "tez getir!";
                aramaTusu.style.marginRight = "1em";
                aramaTusu.addEventListener("click", function() { 
                    if (aramaKutusu.style.display == "none") { 
                        //this.style.display = "none"; 
                        this.value = "X";
                        this.style.width = "30px";
                        this.style.borderWidth = "1px"
                        this.style.borderStyle = "solid";
                        this.style.borderColor = "black";
                        this.style.borderLeft = "0";
                        this.style.marginTop = "-2px";
                        this.style.padding = "0 5px 1px";
                        this.style.verticalAllign = "top";
                        aramaKutusu.style.display = "";
                        if (aramaOneriKutusu.textContent) aramaOneriKutusu.style.display = "";
                        //aramaKutusu.focus();
                    } else {
                        this.style.width = "";
                        this.style.marginTop = "";
                        this.style.borderLeft = "";
                        this.style.borderWidth = ""
                        this.style.borderStyle = "";
                        this.style.borderColor = "";
                        this.style.padding = "";
                        this.style.verticalAllign = "";
                        this.value = "tez getir!";
                        aramaKutusu.style.display = "none";
                        aramaOneriKutusu.style.display = "none";
                    }
                }, true);
                
                aramaKutusu.id = "epp_aramaKutusu";
                aramaKutusu.type = "text";
                aramaKutusu.value = yazi;
                aramaKutusu.style.padding = "2px 5px";
                //aramaKutusu.style.marginRight = "1em";
                aramaKutusu.style.color = "grey";
                aramaKutusu.style.width = "450px";
                aramaKutusu.style.display = "none";
                aramaKutusu.style.border = "1px solid #000000";
                
                aramaKutusu.addEventListener("focus", function(){
                    if (this.value == yazi) this.value = "";
                    this.style.color = "#000000";
                    if (aramaOneriKutusu.textContent) aramaOneriKutusu.style.display = "";
                    this.addEventListener("keyup", initArama, true);
                }, true);
                aramaKutusu.addEventListener("blur", function(){
                    if (this.value.match(/^\s*$/)) this.value = yazi;
                    this.style.color = "grey";
                    this.removeEventListener("keyup", initArama, true);
                }, true);
                
                aramaOneriKutusu.id = "epp_aramaOneriKutusu";
                aramaOneriKutusu.style.position = "absolute";
                //aramaOneriKutusu.style.display = "none";
                //aramaOneriKutusu.style.marginRight = "1em";
                aramaOneriKutusu.style.padding = "0";
                aramaOneriKutusu.style.paddingTop = "0.5em";
                aramaOneriKutusu.style.width = "490px";
                aramaOneriKutusu.style.border = "1px solid #000000";
                aramaOneriKutusu.style.borderTop = "0px solid #000000";
                aramaOneriKutusu.style.left = window.getComputedStyle(aramaKutusu, null).getPropertyValue("background-color");
                aramaOneriKutusu.style.color = "white";
                //aramaOneriKutusu.style.backgroundImage = "url(" + transbg50UrlData + ")";
                aramaOneriKutusu.style.backgroundColor = "rgba(0,0,0,.7)";
                aramaOneriKutusu.style.display = "none";
                //aramaOneriKutusu.style.overflow = "auto";
                //aramaOneriKutusu.innerHTML = "<b><div>aaa (10)</div><div>bbb (20)</div></b>";
                
                aramaOneriKutusuBaslik.id = "epp_aramaOneriKutusuBaslik";
                aramaOneriKutusuBaslik.style.paddingBottom = "5px";
                aramaOneriKutusuBaslik.style.borderBottom = "1px solid #ffffff";
                aramaOneriKutusuBaslik.style.textAlign = "center";
                
                aramaOneriKutusuListe.id = "epp_aramaOneriKutusuListe";
                aramaOneriKutusuListe.style.overflow = "auto";
                aramaOneriKutusuListe.style.padding = "0.5em";
                //aramaOneriKutusuListe.style.minWidth = "35em";
                //aramaOneriKutusuListe.style.maxWidth = "60em";
                aramaOneriKutusuListe.style.minHeight = "2em";
                aramaOneriKutusuListe.style.maxHeight = "20em";
                
                aramaOneriKutusu.appendChild(aramaOneriKutusuBaslik);
                aramaOneriKutusu.appendChild(aramaOneriKutusuListe);
                
                baslikAltiBar.appendChild(aramaKutusu);
                baslikAltiBar.appendChild(aramaTusu);
                baslikAltiBar.appendChild(aramaOneriKutusu);
            }
            
            if (spoilerVar) {
                //var spoilerlariAcKutusu = yeniEksiLinki("click", "", "tum spoilerlari ac!", "Gecici olarak sadece bu sayfadakilerin tumunu goster.", "| ", " |", "span");
                var spoilerlariAcTusu = yeniEksiTusu("input");
                spoilerlariAcTusu.value = "tum spoilerlari ac!";
                spoilerlariAcTusu.style.marginRight = "1em";
                spoilerlariAcTusu.addEventListener("click", tumSpoilerlariAc, true);
                //spoilerlariAcKutusu.link.addEventListener("click", function() { tumSpoilerlariAc(spoilerlariAcKutusu.link) }, true);
                //baslikAltiBar.appendChild(spoilerlariAcKutusu.wrap);
                baslikAltiBar.appendChild(spoilerlariAcTusu);
            }
            
            //En bastan goster tusu
            var tumunuGoster = xpath("/html/body/div[3]/button").snapshotItem(0);
            if (tumunuGoster && tumunuGoster.innerHTML.match(/t.m.n. g.ster/)) {
                var bastanGoster = yeniEksiTusu("input");
                bastanGoster.value = "en bastan goster";
                bastanGoster.setAttribute("onclick", tumunuGoster.getAttribute("onclick").replace(/&.+(['"])$/,'$1'));
                bastanGoster.style.marginLeft = "1em";
                tumunuGoster.parentNode.insertBefore(bastanGoster, tumunuGoster.nextSibling);
            }
            
            //Canli goster tusu
            var cgTusu = yeniEksiTusu("input");
            cgTusu.value = "cok heyecanli!";
            cgTusu.style.marginLeft = "1em";
            cgTusu.addEventListener("click", sonEntrylereYenile, true);
            if (tumunuGoster && tumunuGoster.innerHTML.match(/t.m.n. g.ster/)) {
                tumunuGoster.parentNode.insertBefore(cgTusu, tumunuGoster.parentNode.lastChild);
            } else {
                var newDiv = newElem("div");
                newDiv.style.textAlign = "center";
                newDiv.insertBefore(cgTusu,newDiv.firstChild);
                var entryOL = idGet("el");
                entryOL.parentNode.insertBefore(newDiv, entryOL.nextSibling);
            }
            
            //Frame ekleme tusu
            if (window.top == window.self) {
                var sirinleTusu = yeniEksiTusu("input");
                sirinleTusu.value = "iFrame";
                sirinleTusu.style.marginLeft = "0.5em";
                sirinleTusu.addEventListener("click", frameSirinle, true);
                baslikAltiBar.appendChild(sirinleTusu);
            }
        }
        
        function pencereBasligiDuzenle() {
            if (!Ayarlar.sekmeDostuBaslik) return;
            
            //EppAPI_log("Pencere basligi: " + topDocument.title);
            if (topDocument.title.match(/^ek.i s.zl.k - kutsal [^-]+- [^-]/)) { 
                //EppAPI_log("Baslik yamuk!");
                var baslikPrefix = ((window.top == window.self || Ayarlar.hepFrameliSozluk)?"":"@");
                topDocument.title = topDocument.title.replace(/(^ek.i s.zl.k - [^-]+)-\s+(.+)\s*/, baslikPrefix +"$2 - $1");
                setTimeout(pencereBasligiDuzenle, 2000);
            } else if ((--baslikKontrol) > 0) {
                //EppAPI_log("Baslik henuz yamulmamis!");
                setTimeout(pencereBasligiDuzenle, 2000);
            }
        }
        
        function basligiSabitle() {
            if (!Ayarlar.baslikSabitleme) return;
        
            var baslik = xpath("/html/body/h1").snapshotItem(0);
            sabitBaslik = baslik;
            var usttenBosluk = parseInt(baslik.offsetTop) + parseInt(baslik.offsetHeight);
            sabitBaslik.id = "epp_sabitBaslik";
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
            setTimeout(function() {
                var asilPadLeft = window.getComputedStyle(baslik, null).getPropertyValue("padding-left");
                if (asilPadLeft.match(/^0(px|em|pt)$/))
                    sabitBaslik.style.paddingLeft = "8px";
                else 
                    sabitBaslik.style.paddingLeft = asilPadLeft;
            }, 2000);
        }
        
        function konuluEntry() {
            if (window.location.href.match(/show\.asp\?t=[^&]+.*&i=(\d+)/)) {
                //Tumunu gosterle gelmis
                var entryId = window.location.href.match(/show\.asp\?t=[^&]+.*&i=(\d+)/)[1];
                var entry = idGet("d"+entryId);
                if (entry) {
                    //entry.style.borderLeft = "2px solid rgb(0,200,0)";
                    //entry.style.borderLeft = "2px solid rgba(0,255,0,.3)";
                    //entry.style.paddingLeft = "1em";
                    //entry.style.fontWeight = "bold";
                    //entry.insertBefore(newElem("hr"),entry.firstChild);
                    //entry.appendChild(newElem("hr"));
                    entry.style.borderLeft = "2px solid";
                    entry.style.paddingLeft = "5px";
                    setTimeout(function(){ 
                        window.scroll(0, findYPos(entry)-50);
                    }, 1000);
                }
            }
        }
        
    //--// Sag Frame Engine - GIRIS //--//
        this.basla = function() {
            //if (debug) EppAPI_log("SAG FRAME BASLADI");
            if (Ayarlar.hepFrameliSozluk && window.top == window.self) {
                //Madem hep frameli olsun denmis, frameleri ekleyip kacalim
                //(frameler zaten kendi scriptlerini calistiracaklar...)
                setTimeout(frameSirinle, 1000);
                return;
            }
            
            konuluEntry();
            pencereBasligiDuzenle();
            girdileriDuzenle();
            arayuzElemanlariniEkle();
            basligiSabitle();
            entryKutusunuGelistir();
        }
    }

    
    //// KIMDIR NEDIR ENGINE
    function KimdirNedirEngine() {
        
        function paneliKaldir() {
            var panel = xpath("//td[@class='panel']").snapshotItem(0);
            panel.parentNode.removeChild(panel);
        }
    
    //--// Kimdir Nedir Engine - GIRIS //--//
        this.basla = function() {
            //if (debug) EppAPI_log("KIMDIR NEDIR BASLADI");
            paneliKaldir();
        }    
    }
    
    // Hersey burada basliyor
    this.basla = function () {
        
        var aktifEngine = 0;
        
        /*/
        EppAPI_setValue(System.storage.okunmusMesajListesi, 0);
        tumAyarlariSifirla();
        return;
        //*/
        
        //Migration islemleri
        EppAPI_runOnce(migrateToV05, "migrateToV05");
        
        // Tum framelere ortak islemler
        tumAyarlariYukle();
        gunlukDonBebegim(); // Gereksiz 'don bebegim' olmasin
        kimdirNedirFix();
        
        // Hangi sayfa/frame icindeyiz
        if (window.location.href.match(/\/top\.asp/)) {
            aktifEngine = new UstFrameEngine();
        } else if (window.location.href.match(/\/index\.asp/)) {
            aktifEngine = new SolFrameEngine();
        } else if (window.location.href.match(/\/show\.asp/)) {
            aktifEngine = new SagFrameEngine();
        } else if (window.location.href.match(/\/cc\.asp/)) {
            aktifEngine = new AyarMerkeziEngine();
        } else if (window.location.href.match(/\/info2\.asp/)) {
            aktifEngine = new KimdirNedirEngine();
        }

        // Secilen Frame Engine baslasin
        if (aktifEngine)
            aktifEngine.basla();
        
        // Hersey duzenlendikten sonra gomulebilir icerikleri duzenle
        gomulebilirLinkDuzenle();
        gomulebilirEntryleriDuzenle();
    }
}

(new EksiPlusPlus).basla();
