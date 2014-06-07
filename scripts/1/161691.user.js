// ==UserScript==
// @name           Eksi++
// @description    Turlu cinliklerle Eksi Sozluk'u guzellestirme aparati. Donuz dusmani!
// @namespace      http://userscripts.org/users/ntpl
// @version        0.6.1
// @author         ntpl
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://sozluk.sourtimes.org/*
// @include        http://antik.eksisozluk.com/*
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
        version : "0.6.1",
        branch : "eksi++",
    };

//--// AYARLAR //--//

    // Kullanici Ayarlari
    var Ayarlar = {
        // Ayar Surumu
        version : meta.version,

        // Eksi++ Mesaj Kutusu
        eppMesajKutusu: 1,
        
        // Donuz Sistemi Ayarlari
        donuzGirdileriniGizle : 1,
        donuzBasliklariniGizle : 1,
        donuzListesi : ["-liste bos kalmasin donuzu-"],
        
        // EksiFavori Ayarlari
        eksiFavori : 1,
        favoriEntryListesi : [{title: "eksi++", entryid: "18956600"}],
        
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
        tweetGomme : 1,
        swfGomme : 1,
        bkzGomme : 1,
        kimdirNedirBkzGomme : 1,
        bitmeyenEntryler : 1,
        bitmeyenEntrylerAuto : 1,
        bitmeyenEntryAyiraci: 1,
        yariOtomatikDonBebegim : 1,
        baslikSabitleme : 1,
        baslikParcalama : 0,
        sagPanelSabitleme : 1,
        entryOnizleme : 1,
        nickBasligiKontrolu : 1,
        kisaUrlKontrolu : 1,
        kimdirNedirPopup : 1,
        benPopup : 1,
        modTarihiPopup: 1,
        ucNoktayiGeriGetir : 0,
        ucNoktayiTersineCevir : 0,
        solFrameMenusu: 1,
        canliBasliklar: 0,
        iframeGoster: 1,
        tezgetirGoster: 1,
        konuluEntryIsaretle: 1,
        konuluEntryHizala: 1,
        turkiyeSaatiniKullan: 1,
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
            'beslenir ki bu (nihavent uvertur)' : 'http://static.eksisozluk.com/css/bkb.css',
            'cok pis (carmilla)' : 'http://static.eksisozluk.com/css/cokpis.css',
            'her zamanki enhanced (rotten)' : 'http://static.eksisozluk.com/css/he.css',
            'absolut (soulforge)' : 'http://static.eksisozluk.com/css/absolut.css',
            'obsessed with blue (clairvoyant)' : 'http://static.eksisozluk.com/css/cressidablue.css',
            'diet coke (clairvoyant)' : 'http://static.eksisozluk.com/css/dietcoke.css',
            'yesil limon eksiliginde sozluk (carmilla)' : 'http://static.eksisozluk.com/css/yles.css',
            'ssg\'nin rengi (clairvoyant)' : 'http://static.eksisozluk.com/css/ssg.css',
            'yigit ozgur de mi (pipican ve kukucan)' : 'http://static.eksisozluk.com/css/yigitozgurdemi.css',
            'gece goru$u (carsamba)' : 'http://static.eksisozluk.com/css/geceGorusu.css',
            'askimizin meyvesi (misuf)' : 'http://static.eksisozluk.com/css/aytek.css',
            'kamuflaj for plazas (malezya plantasyon tiki)' : 'http://static.eksisozluk.com/css/kfpcss.css',
            'enee (ssl)' : 'http://static.eksisozluk.com/css/enee.css',
            'her zamanki enhanced purple (rotten)' : 'http://static.eksisozluk.com/css/he_p.css',
            'requiem 4 a dream (muzbaligi)' : 'http://static.eksisozluk.com/css/muz.css',
            'not enough coffee in (rotten)' : 'http://static.eksisozluk.com/css/nth.css',
            'ek$i simpsons (clairvoyant)' : 'http://static.eksisozluk.com/css/simpsons.css',
            'her zamanki enhanced blue (rotten)' : 'http://static.eksisozluk.com/css/he_blue.css',
            'eksilicious (rotten)' : 'http://static.eksisozluk.com/css/eksilicious.css',
            'minima black (hopi)' : 'http://static.eksisozluk.com/css/minimablack.css',
            'yaz gune$i (muzbaligi)' : 'http://static.eksisozluk.com/css/turunc.css',
            'mac osman x (can sebahattin dere & eleanor rigby)' : 'http://static.eksisozluk.com/css/osman.css',
            'jack daniels (soulforge)' : 'http://static.eksisozluk.com/css/jack_daniels.css',
            'ek$i tefter (saparatus)' : 'http://static.eksisozluk.com/css/tefter.css',
            'firat (efsane yazar)' : 'http://static.eksisozluk.com/css/firat.css',
            'her zamanki enhanced black (rotten)' : 'http://static.eksisozluk.com/css/he_k.css',
            'cok pis bloody edition (carmilla)' : 'http://static.eksisozluk.com/css/cokpisbloody.css',
            'sozluk-u ali osmani (bloodorbloom)' : 'http://static.eksisozluk.com/css/sao.css',
            'lite ek$imel (melyche)' : 'http://static.eksisozluk.com/css/liteeksimel.css',
            'fenerbahce (sivil)' : 'http://static.eksisozluk.com/css/fenerbahce.css',
            'powered by intel (rotten)' : 'http://static.eksisozluk.com/css/intel.css',
            'her zamanki enhanced pink (rotten)' : 'http://static.eksisozluk.com/css/he_pink.css',
            'darkhead (byron)' : 'http://static.eksisozluk.com/css/t_darkhead_b.css',
            'kamuflaj for plazas v2 (ocanal)' : 'http://static.eksisozluk.com/css/kfpv2.css',
            '1601 snoopy lovers (poison)' : 'http://static.eksisozluk.com/css/1601.css',
            'bize eksi de trabzon (oziloz)' : 'http://static.eksisozluk.com/css/bedt.css',
            'southpark v3 (assert h)' : 'http://static.eksisozluk.com/css/spv3.css',
        },
    }

    // Program Degiskenleri
    var debug = 0;
    var kacKisiyiz = 0;
    var neredeKaldik = 0;
    var ayarMessageBoxes;

    var embedTemplates = {
        youtube : {
            width : 640,
            height : 360,
            html : '<object style="width:__EMBED-W__; height:__EMBED-H__">'+
                        '<param name="movie" value="http://www.youtube.com/v/__EMBED-ID__"></param>'+
                        '<param name="allowFullScreen" value="true"></param>'+
                        '<param name="allowscriptaccess" value="always"></param>'+
                        '<embed src="http://www.youtube.com/v/__EMBED-ID__" '+
                               'type="application/x-shockwave-flash" allowscriptaccess="always" '+
                               'allowfullscreen="true" width="__EMBED-W__" height="__EMBED-H__">'+
                        '</embed>'+
                    '</object>' 
        },
        swf : {
            width : 480,
            height : 360,
            html : '<iframe width="__EMBED-W__" height="__EMBED-H__" src="__EMBED-SRC__" scrolling="no" frameborder="0"></iframe>'
        },
    };
    
    var shortUrlPattern = new RegExp(
            "https?://(0rz\\.tw|1url\\.com|2\\.gp|2tu\\.us|3\\.ly|4ms\\.me|4sq\\.com|"+
            "7\\.ly|a\\.gg|aa\\.cx|adf\\.ly|afx\\.cc|all\\.fuseurl\\.com|"+
            "alturl\\.com|amzn\\.to|arst\\.ch|atu\\.ca|azc\\.cc|b23\\.ru|b2l\\.me|bacn\\.me|bcool\\.bz|binged\\.it|bit\\.ly|"+
            "bizj\\.us|bloat\\.me|bravo\\.ly|bsa\\.ly|budurl\\.com|canurl\\.com|chilp\\.it|chzb\\.gr|cl\\.lk|cl\\.ly|clck\\.ru|cli\\.gs|"+
            "cliccami\\.info|clickthru\\.ca|clop\\.in|conta\\.cc|cort\\.as|cot\\.ag|crks\\.me|ctvr\\.us|cutt\\.us|dai\\.ly|decenturl\\.com|"+
            "dfl8\\.me|digbig\\.com|digg\\.com|disq\\.us|dld\\.bz|dlvr\\.it|do\\.my|doiop\\.com|dopen\\.us|easyuri\\.com|easyurl\\.net|"+
            "eepurl\\.com|eweri\\.com|fa\\.by|fav\\.me|fb\\.me|fbshare\\.me|ff\\.im|fff\\.to|fire\\.to|firsturl\\.de|firsturl\\.net|"+
            "flic\\.kr|flq\\.us|fly2\\.ws|fon\\.gs|freak\\.to|fuseurl\\.com|fuzzy\\.to|fwd4\\.me|fwib\\.net|g\\.ro\\.lt|getir\\.co|getir\\.net|gizmo\\.do|gl\\.am|"+
            "go\\.9nl\\.com|go\\.ign\\.com|go\\.usa\\.gov|goo\\.gl|goshrink\\.com|gurl\\.es|hex\\.io|hiderefer\\.com|hmm\\.ph|href\\.in|"+
            "hsblinks\\.com|htxt\\.it|huff\\.to|hulu\\.com|hurl\\.me|hurl\\.ws|icanhaz\\.com|idek\\.net|ilix\\.in|is\\.gd|its\\.my|ix\\.lt|"+
            "j\\.mp|jijr\\.com|kl\\.am|kclt\\.me|klck\\.me|korta\\.nu|krunchd\\.com|l9k\\.net|lat\\.ms|liip\\.to|liltext\\.com|linkbee\\.com|linkbun\\.ch|"+
            "liurl\\.cn|ln-s\\.net|ln-s\\.ru|lnk\\.gd|lnk\\.ms|lnkd\\.in|lnkurl\\.com|lru\\.jp|lt\\.tl|lurl\\.no|macte\\.ch|mash\\.to|"+
            "merky\\.de|migre\\.me|miniurl\\.com|minurl\\.fr|mke\\.me|moby\\.to|moourl\\.com|mrte\\.ch|myloc\\.me|myurl\\.in|n\\.pr|"+
            "nn\\.nf|not\\.my|notlong\\.com|nsfw\\.in|nutshellurl\\.com|nxy\\.in|nyti\\.ms|o-x\\.fr|oc1\\.us|om\\.ly|omf\\.gd|"+
            "omoikane\\.net|on\\.cnn\\.com|on\\.mktw\\.net|onforb\\.es|orz\\.se|ow\\.ly|ping\\.fm|pli\\.gs|pnt\\.me|politi\\.co|post\\.ly|pp\\.gg|"+
            "profile\\.to|ptiturl\\.com|pub\\.vitrue\\.com|qlnk\\.net|qte\\.me|qu\\.tc|qy\\.fi|r\\.im|rb6\\.me|read\\.bi|readthis\\.ca|"+
            "reallytinyurl\\.com|redir\\.ec|redirects\\.ca|redirx\\.com|retwt\\.me|ri\\.ms|rickroll\\.it|riz\\.gd|rt\\.nu|ru\\.ly|"+
            "rubyurl\\.com|rurl\\.org|rww\\.tw|s4c\\.in|s7y\\.us|safe\\.mn|sameurl\\.com|sdut\\.us|shar\\.es|shink\\.de|shorl\\.com|"+
            "short\\.ie|short\\.to|shortlinks\\.co\\.uk|shorturl\\.com|shout\\.to|shrinkify\\.com|shrinkr\\.com|shrt\\.fr|"+
            "shrt\\.st|shrten\\.com|shrunkin\\.com|simurl\\.com|smallr\\.com|smsh\\.me|smurl\\.name|sn\\.im|snipr\\.com|"+
            "snipurl\\.com|snurl\\.com|sp2\\.ro|spedr\\.com|srnk\\.net|srs\\.li|starturl\\.com|su\\.pr|surl\\.co\\.uk|surl\\.hu|t\\.cn|"+
            "t\\.co|t\\.lh\\.com|ta\\.gd|tbd\\.ly|tcrn\\.ch|tgr\\.me|tgr\\.ph|tighturl\\.com|tiniuri\\.com|tiny\\.cc|tiny\\.ly|tiny\\.pl|"+
            "tinylink\\.in|tinyuri\\.ca|tinyurl\\.com|tk\\.|tl\\.gd|tmi\\.me|tnij\\.org|tnw\\.to|tny\\.com|to\\.ly|togoto\\.us|"+
            "totc\\.us|toysr\\.us|tpm\\.ly|tr\\.im|tra\\.kz|trunc\\.it|twhub\\.com|twirl\\.at|twitclicks\\.com|twitterurl\\.net|"+
            "twitterurl\\.org|twiturl\\.de|twurl\\.cc|twurl\\.nl|u\\.mavrev\\.com|u\\.nu|u76\\.org|ufalt\\.net|ub0\\.cc|ulu\\.lu|updating\\.me|"+
            "url\\.ac|ur1\\.ca|url\\.az|url\\.co\\.uk|url\\.ie|url360\\.me|url4\\.eu|urlborg\\.com|urlbrief\\.com|urlcover\\.com|urlcut\\.com|"+
            "urlenco\\.de|urli\\.nl|urls\\.im|urlshorteningservicefortwitter\\.com|urlx\\.ie|urlzen\\.com|usat\\.ly|use\\.my|"+
            "vgn\\.am|vl\\.am|vm\\.lc|w55\\.de|wapo\\.st|wapurl\\.co\\.uk|wipi\\.es|wp\\.me|x\\.vu|xr\\.com|xrl\\.in|xrl\\.us|xurl\\.es|"+
            "xurl\\.jp|y\\.ahoo\\.it|yatuc\\.com|ye\\.pe|yep\\.it|yhoo\\.it|yiyd\\.com|youtu\\.be|yuarel\\.com|z0p\\.de|zi\\.ma|"+
            "zi\\.mu|zipmyurl\\.com|zud\\.me|zurl\\.ws|zz\\.gd|zzang\\.kr|\u203a\\.ws|\u2729\\.ws|\u273f\\.ws|\u2765\\.ws|\u2794\\.ws|"+
            "\u279e\\.ws|\u27a1\\.ws|\u27a8\\.ws|\u27af\\.ws|\u27b9\\.ws|\u27bd\\.ws)/"
    );
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
        // This function is specifically for cross-domain JSON requests
        if (browser == "firefox") {
            // Firefox
            if (debug) EppAPI_log("Request: URL: " + params.url + " || DATA: " + "json="+params.data);
            GM_xmlhttpRequest({
                url: params.url,
                method: params.method,
                data: "json="+params.data,
                headers: params.headers,
                onload: function(resp) {
                    if (debug) EppAPI_log("JSON Resp: " + resp.responseText);
                    params.onload(JSON.parse(resp.responseText));
                }
            });
        } else if (browser == "chrome/opera") {
            // Chrome (and possibly others)
            // Be Warned: Ugly Hack Ahead!
            // (Thanks to Chrome since it:
            //   - Prevents cross-domain XHR for user scripts
            //   - Prevents user scripts from accessing to *page's* window object)
            
            var reqId = Math.floor(Math.random()*99);
            var callbackFuncName = "epp_jsonCallback" + reqId;
            var respDivId = "epp_jsonRespDiv" + reqId;
            var url = params.url;
            if (params.data) url += "&json=" + params.data;
            url += "&callback=" + callbackFuncName;
            //EppAPI_log("JSON Data >> Data: " + params.data);
            //EppAPI_log("JSON Requesti >> URL: " + url);
            var reqScript = document.createElement('script');
            reqScript.setAttribute('src', url);
            var callbackScript = document.createElement('script');
            callbackScript.innerHTML = "function "+callbackFuncName+"(jsonStr) {"+
                //"console.log('RAW RESPONSE: ' + jsonStr);"+
                "if(typeof jsonStr == 'object') jsonStr = JSON.stringify(jsonStr);"+
                "document.getElementById('"+respDivId+"').innerHTML = encodeURIComponent(jsonStr);"+
            "}";
            var jsonRespDiv = document.createElement("div");
            jsonRespDiv.id = respDivId;
            jsonRespDiv.style.display = "none";
            jsonRespDiv.addEventListener ("DOMNodeInserted", (function(respDiv,reqScr,cbackScr){ return function() {
                if(this.innerHTML == "") return;
                //EppAPI_log("JSON Response >> JSON: " + this.innerHTML);
                params.onload(JSON.parse(decodeURIComponent(this.innerHTML)));
                document.getElementsByTagName('body')[0].removeChild(respDiv);
                document.getElementsByTagName('head')[0].removeChild(reqScr);
                document.getElementsByTagName('head')[0].removeChild(cbackScr);
            }})(jsonRespDiv, reqScript, callbackScript), true);

            document.getElementsByTagName('head')[0].appendChild(callbackScript);
            document.getElementsByTagName('head')[0].appendChild(reqScript);
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
            list += "<option value='"+escape(Ayarlar.yasakliRegexListesi[i])+"'>"+Ayarlar.yasakliRegexListesi[i]+"</option>";
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
    
    function importYasakBaslikList(jsonTxt) {
        var list = JSON.parse(jsonTxt);
        var added = new Array();
        for (var i in list) {
            if (yasakliRegexEkle(list[i])) {
                added.push(list[i]);
            }
        }
        return added;
    }
    
    function exportYasakBaslikList() {
        return JSON.stringify(Ayarlar.yasakliRegexListesi);
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
            //Sayfayi basa cekelim en azindan
            window.scrollTo(0,0);
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
            "<textarea id='epp_donuzImportExportTA' rows='5' cols='50' style='display:none;'></textarea>"+
            "Donuz listesi <b>aktarim</b> islemleri: <button class='but' id='epp_donuzExportBut'>ihrac et</button>&nbsp;<button class='but' id='epp_donuzImportBut'>ithal et</button><br/><br/>"+
        "</fieldset><br/><div id='epp_messageBox5' style='text-align:center;' tabindex='-1'>&nbsp;</div>"+
        "<fieldset style='padding-left:1em;'>"+
            "<legend><b>| Istenmeyen Baslik Filtresi | "+"</b></legend>"+
            "<br/>"+
            "<input id='epp_yasakBaslikGizleCB' type='checkbox'> <b>Yasakli kelimeleri</b> iceren basliklari gizle<br/><br/>"+
            "Yasakli kelimelere <b>ekle</b> <input id='epp_yasakBaslikEkleVal' type='text' style='min-width: 20em;'> <button class='but' id='epp_yasakBaslikEkleBut'>Ekle</button> (<a href='show.asp?t=regular+expression'>regular expression</a>'dir aslen, kullaniniz)<br/><br/>"+
            "Yasakli kelimelerden <b>sil</b> <select id='epp_yasakBaslikSilDD' style='min-width: 20em;'>"+yasakliBaslikDropDownListesi()+"</select> <button class='but' id='epp_yasakBaslikSilBut'>Sil</button><br/><br/>"+
            "<textarea id='epp_yasakBaslikImportExportTA' rows='5' cols='50' style='display:none;'></textarea>"+
            "Yasakli kelimeler <b>aktarim</b> islemleri: <button class='but' id='epp_yasakBaslikExportBut'>ihrac et</button>&nbsp;<button class='but' id='epp_yasakBaslikImportBut'>ithal et</button><br/><br/>"+
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
            "<input id='epp_solFrameMenusuCB' type='checkbox'> <b>Sol frame menusunu (o_0)</b> goster (neler donmus serhat, gunun onemi ve otomatik yenileme menusu) "+"<br/><br/>"+
            //"<input id='epp_canliBasliklarCB' type='checkbox'> <b>Canli basliklar</b> sistemini kullan (sol frame'de basliklari oldugu yerde gunceller, gundemi yakalatir) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_hepFrameliSozlukCB' type='checkbox'> <b>Ust ve sol frameleri</b> her sayfada goster (baslik sayfalarinda dahi sol ve ust frameleri her zaman gosterir, ortami bozmaz) "+"<br/><br/>"+
            "<input id='epp_tabDostuBaslikCB' type='checkbox'> <b>Sekme(tab) dostu</b> basliklari kullan (Ayni anda bir cok sekme acinca gorulen 'eksi sozluk -...' isimli sekme karmasasina son verir, basligi one alarak sekmeleri daha ayird edilebilir kilar) "+"<br/><br/>"+
            "<input id='epp_bakinizGommeCB' type='checkbox'> <b>Entry bakiniz</b>larini oldugu yerde acilabilir yap (bkz verilen entry tiklaninca oldugu yerde gosterilir, ayri pencere/sekme israfi yapmaz, zaman kazandirir) "+"<br/><br/>"+
            "<input id='epp_kimdirNedirBakinizGommeCB' type='checkbox' style='margin-left:25px;'> <b>Kimdir nedir sayfasinda da entry bakiniz</b>larini oldugu yerde acilabilir yap "+"<br/><br/>"+
            "<input id='epp_youtubeGommeCB' type='checkbox'> <b>Youtube</b> linklerini oldugu yerde (gomulu) oynatilabilir yap (linke tiklaninca oracikta oynatir videoyu) "+"<br/><br/>"+
            "<input id='epp_resimGommeCB' type='checkbox'> <b>Resim</b> linklerini oldugu yerde (gomulu) gosterilebilir yap (linke tiklaninca oracikta gosterir resmi) "+"<br/><br/>"+
            "<input id='epp_tweetGommeCB' type='checkbox'> <b>Twitter</b> status linklerini oldugu yerde (gomulu) gosterilebilir yap (linke tiklaninca oracikta gosterir tweet'i) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_swfGommeCB' type='checkbox'> <b>Swf</b> linklerini oldugu yerde (gomulu) gosterilebilir yap (linke tiklaninca oracikta gosterir swf'i) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_donBebegimCB' type='checkbox'> Yari-otomatik <b>don bebegim</b> (Ayni gun icinde ilk alin teri don bebegimden sonrasini otomatik yapar, 5 dakikada bir 'don bebegim' yaptirmaz) "+"<br/><br/>"+
            "<input id='epp_bitmeyenEntrylerCB' type='checkbox'> <b>Bitmeyen entry'ler</b> sistemini kullan (sayfa sayfa gezdirmeden sonraki sayfanin entyr'lerini okutur, kafayi rahatlatir) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_bitmeyenEntrylerAutoCB' type='checkbox' style='margin-left:25px;'> <b>Otomatik</b> olsun (sayfa sonuna gelindiginde otomatik olarak sonraki entry'leri yukler) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_bitmeyenEntryAyiraciCB' type='checkbox' style='margin-left:25px;'> Sayfalar arasinda <b>ayirac</b> olsun (entry sayfalari arasina ayirac koyar ki yerimiz belli olsun)"+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_sabitBaslikCB' type='checkbox'> Basliklari <b>sabitle</b> (Basliklari sayfayla beraber kayabilir yapar, uzun basliklarda kolaylik saglar) "+"<br/><br/>"+
            "<input id='epp_parcaliBaslikCB' type='checkbox'> Basliklari <b>parcala</b> (Basliklari eskisi gibi kelime kelime link haline getirir) "+"<br/><br/>"+
            "<input id='epp_sabitSagPanelCB' type='checkbox'> Sag paneli <b>sabitle</b> (Sag paneli sayfayla beraber kayabilir yapar, uzun basliklarda erisim kolayligi saglar) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_entryOnizlemeCB' type='checkbox'> <b>Entry onizleme</b> sistemini kullan (Entry girerken, ayni anda entry'nin sayfadaki halini gosterir) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_nickBasligiKontroluCB' type='checkbox'> <b>Nick basliklari</b>na kimdir nedir linki ekle (Basligin hemen yanina nick sahibinin kimdir nedir linkini ekler) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_kisaUrlKontroluCB' type='checkbox'> <b>Kisaltilmis linkleri</b> acmadan kontrol et (Kisaltilmis bir linke tiklaninca, linkin yonlenecegi sayfayi onceden gosterir) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_ucnoktaCB' type='checkbox'> <b>Uc nokta</b>li basliklar (Sol framedeki baslik listesini eski 'uc nokta' sistemine cevirir, nostalji yaratir) "+"<br/><br/>"+
            "<input id='epp_ucnoktaTersCB' type='checkbox' style='margin-left:25px;'> <b>Ters olsun</b> (Uc nokta ve baslik link'leri birbirleriyle yer degistirir) "+"<br/><br/>"+
            "<input id='epp_kimdirnedirPopupCB' type='checkbox'> <b>'Kimdir Nedir'</b> pop-up olsun (Entry altlarindaki 'kimdir nedir'leri eskisi gibi pop-up olarak gosterir, sac bas yoldurmaz) "+"<br/><br/>"+
            "<input id='epp_benPopupCB' type='checkbox'> <b>'Ben'</b> pop-up olsun ('Ben' bilgilerinin pop-up olarak acilmasini saglar) "+"<br/><br/>"+
            "<input id='epp_modTarihiPopupCB' type='checkbox'> <b>'Moderasyon tarihcesi'</b> pop-up olsun (Moderasyon tarihcesinin pop-up olarak acilmasini saglar) "+"<br/><br/>"+
            "<input id='epp_eppMesajKutusuCB' type='checkbox'> <b>Eksi++ Mesaj Kutusu</b>nu kullan (mesajlari alici bazli gruplar, bunyede gmail havasi yaratir) "+" (<b>ONEMLI:</b> zeytinyagi modu kapali olmali!) "+"<br/><br/>"+
            "<input id='epp_eksiFavoriCB' type='checkbox'> <b>EksiFavori</b>'yi kullan (entry'leri favorilere ekleme ozelligini getirir) "+"<b style='color:red'>Yeni!</b>"+"<br/><br/>"+
            "<input id='epp_iframeGosterCB' type='checkbox'> <b>iFrame tusu</b>nu goster (duz basliklara sol ve ust frame'leri ekler) "+"<br/><br/>"+
            "<input id='epp_tezgetirGosterCB' type='checkbox'> <b>Tez getir</b> sistemini kullan (baslik sayfasindan baslik aramaya izin verir) "+"<br/><br/>"+
            "<input id='epp_konuluEntryIsaretleCB' type='checkbox'> Konulu entry'leri <b>isaretle</b> (kit veya tumunu goster ile gelinen sayfalarda, asil entry'yi isaretler) "+"<br/><br/>"+
            "<input id='epp_konuluEntryHizalaCB' type='checkbox'> Konulu entry'leri <b>basa hizala</b> (kit veya tumunu goster ile gelinen sayfalarda, ekrani asil entry'ye kadar kaydirir) "+"<br/><br/>"+
            "<input id='epp_turkiyeSaatiniKullanCB' type='checkbox'> Tarih/saat islemleri icin <b>Turkiye saatini kullan</b> (Serhat ve gunun onemi fonksiyonlari icin anlamli) "+"<br/><br/>"+
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
        var tweetGommeCB = idGet("epp_tweetGommeCB");
        var swfGommeCB = idGet("epp_swfGommeCB");
        var bakinizGommeCB = idGet("epp_bakinizGommeCB");
        var kimdirNedirBakinizGommeCB = idGet("epp_kimdirNedirBakinizGommeCB");
        var donBebegimCB = idGet("epp_donBebegimCB");
        var sabitBaslikCB = idGet("epp_sabitBaslikCB");
        var parcaliBaslikCB = idGet("epp_parcaliBaslikCB");
        var sabitSagPanelCB = idGet("epp_sabitSagPanelCB");
        var entryOnizlemeCB = idGet("epp_entryOnizlemeCB");
        var nickBasligiKontroluCB = idGet("epp_nickBasligiKontroluCB");
        var kisaUrlKontroluCB = idGet("epp_kisaUrlKontroluCB");
        var ucnoktaCB = idGet("epp_ucnoktaCB");
        var ucnoktaTersCB = idGet("epp_ucnoktaTersCB");
        var kimdirnedirPopupCB = idGet("epp_kimdirnedirPopupCB");
        var benPopupCB = idGet("epp_benPopupCB");
        var modTarihiPopupCB = idGet("epp_modTarihiPopupCB");
        var yasakliBaslikGizleCB = idGet("epp_yasakBaslikGizleCB");
        var yasakBaslikEkleVal = idGet("epp_yasakBaslikEkleVal");
        var yasakBaslikEkleBut = idGet("epp_yasakBaslikEkleBut");
        var yasakBaslikSilDD = idGet("epp_yasakBaslikSilDD");
        var yasakBaslikSilBut = idGet("epp_yasakBaslikSilBut");
        var yasakBaslikImportBut = idGet("epp_yasakBaslikImportBut");
        var yasakBaslikExportBut = idGet("epp_yasakBaslikExportBut");
        var eppMesajKutusuCB = idGet("epp_eppMesajKutusuCB");
        var eksiFavoriCB = idGet("epp_eksiFavoriCB");
        var hepFrameliSozlukCB = idGet("epp_hepFrameliSozlukCB");
        var solFrameMenusuCB = idGet("epp_solFrameMenusuCB");
        var iframeGosterCB = idGet("epp_iframeGosterCB");
        var tezgetirGosterCB = idGet("epp_tezgetirGosterCB");
        var konuluEntryIsaretleCB = idGet("epp_konuluEntryIsaretleCB");
        var konuluEntryHizalaCB = idGet("epp_konuluEntryHizalaCB");
        var turkiyeSaatiniKullanCB = idGet("epp_turkiyeSaatiniKullanCB");
        var bitmeyenEntrylerCB = idGet("epp_bitmeyenEntrylerCB");
        var bitmeyenEntrylerAutoCB = idGet("epp_bitmeyenEntrylerAutoCB");
        var bitmeyenEntryAyiraciCB = idGet("epp_bitmeyenEntryAyiraciCB");
        //var canliBasliklarCB = idGet("epp_canliBasliklarCB");
        
        donuzEntryGizleCB.checked = Ayarlar.donuzGirdileriniGizle;
        donuzBaslikGizleCB.checked = Ayarlar.donuzBasliklariniGizle;
        spoilerGizleCB.checked = Ayarlar.spoilerGizle;
        tabDostuBaslikCB.checked = Ayarlar.sekmeDostuBaslik;
        youtubeGommeCB.checked = Ayarlar.youtubeGomme;
        bakinizGommeCB.checked = Ayarlar.bkzGomme;
        kimdirNedirBakinizGommeCB.checked = Ayarlar.kimdirNedirBkzGomme;
        donBebegimCB.checked = Ayarlar.yariOtomatikDonBebegim;
        sabitBaslikCB.checked = Ayarlar.baslikSabitleme;
        parcaliBaslikCB.checked = Ayarlar.baslikParcalama;
        sabitSagPanelCB.checked = Ayarlar.sagPanelSabitleme;
        entryOnizlemeCB.checked = Ayarlar.entryOnizleme;
        nickBasligiKontroluCB.checked = Ayarlar.nickBasligiKontrolu;
        kisaUrlKontroluCB.checked = Ayarlar.kisaUrlKontrolu;
        ucnoktaCB.checked = Ayarlar.ucNoktayiGeriGetir;
        ucnoktaTersCB.checked = Ayarlar.ucNoktayiTersineCevir;
        kimdirnedirPopupCB.checked = Ayarlar.kimdirNedirPopup;
        benPopupCB.checked = Ayarlar.benPopup;
        modTarihiPopupCB.checked = Ayarlar.modTarihiPopup;
        resimGommeCB.checked = Ayarlar.resimGomme;
        tweetGommeCB.checked = Ayarlar.tweetGomme;
        swfGommeCB.checked = Ayarlar.swfGomme;
        yasakliBaslikGizleCB.checked = Ayarlar.yasakliBasliklariGizle;
        eppMesajKutusuCB.checked = Ayarlar.eppMesajKutusu;
        eksiFavoriCB.checked = Ayarlar.eksiFavori;
        hepFrameliSozlukCB.checked = Ayarlar.hepFrameliSozluk;
        solFrameMenusuCB.checked = Ayarlar.solFrameMenusu;
        iframeGosterCB.checked = Ayarlar.iframeGoster;
        tezgetirGosterCB.checked = Ayarlar.tezgetirGoster;
        konuluEntryIsaretleCB.checked = Ayarlar.konuluEntryIsaretle;
        konuluEntryHizalaCB.checked = Ayarlar.konuluEntryHizala;
        turkiyeSaatiniKullanCB.checked = Ayarlar.turkiyeSaatiniKullan;
        bitmeyenEntrylerCB.checked = Ayarlar.bitmeyenEntryler;
        bitmeyenEntrylerAutoCB.checked = Ayarlar.bitmeyenEntrylerAuto;
        bitmeyenEntryAyiraciCB.checked = Ayarlar.bitmeyenEntryAyiraci;
        //canliBasliklarCB.checked = Ayarlar.canliBasliklar;

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
                                window.open("http://userscripts.org/scripts/source/"+meta.id+".user.js");
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
            var dataTA = idGet("epp_donuzImportExportTA");
            if (dataTA.style.display == "none") {
                //Once kutuyu acalim...
                dataTA.style.display = "";
                alert("Lutfen daha onceden ihrac ederek kaydetmis oldugunuz listeyi acilan alana yapistirip, bir kere daha 'ithal' tusuna basin");
            } else {
                try { 
                    EppAPI_log("Ithal edilecek veri: " + dataTA.value);
                    var list = importDonuzList(dataTA.value);
                    if (!list) return alert("Eklenecek bir sey bulunamadi gibi sanki belki...");
                    ayarMenusuDerki("<b>"+list.join(", ")+"</b> donuzlara <b>eklendi</b>!", 1);
                    donuzSilDD.innerHTML = donuzDropDownListesi();
                } catch (err) {
                    alert("Ithalat basarisiz oldu. Listede bir gariplik olmasin?");
                }
            }
        }, true);
        
        donuzExportBut.addEventListener("click", function(){
            var dataTA = idGet("epp_donuzImportExportTA");
            dataTA.style.display = "";
            dataTA.value = exportDonuzList();
            alert("Donuz listenizi ihrac etmek icin acilan kutudaki verinin tamamini aynen kopyalayin ve kaydedin");
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
        
        eksiFavoriCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.eksiFavori = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki((this.checked?"<b>EksiFavori ozelligi aktif</b>":"<b>EksiFavori ozelligi kapatildi</b>"), 4);
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
        
        tweetGommeCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.tweetGomme = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Twitter status linkleri <b>"+(this.checked?"gomulebilir olacak":"ellenmeyecek")+"</b>!", 4);
        }, true);
        
        swfGommeCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.swfGomme = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Swf linkleri <b>"+(this.checked?"gomulebilir olacak":"ellenmeyecek")+"</b>!", 4);
        }, true);
        
        bakinizGommeCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.bkzGomme = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Entry bakinizlari <b>"+(this.checked?"oldugu yerde":"ayri sayfada")+"</b> acilacak!", 4);
        }, true);
        
        kimdirNedirBakinizGommeCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.kimdirNedirBkzGomme = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Kimdir Nedir sayfasinda entry bakinizlari <b>"+(this.checked?"oldugu yerde":"ayri sayfada")+"</b> acilacak!", 4);
        }, true);
        
        bitmeyenEntrylerCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.bitmeyenEntryler = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Entry'ler <b>"+(this.checked?"hic bitmeyecek":"yer yer bitecek")+"</b>", 4);
        }, true);
        
        bitmeyenEntrylerAutoCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.bitmeyenEntrylerAuto = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Sonraki sayfa entry'leri <b>"+(this.checked?"otomatik olarak":"istenildiginde")+"</b> yuklenecek", 4);
        }, true);
        
        bitmeyenEntryAyiraciCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.bitmeyenEntryAyiraci = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Bitmeyen entry'lerin arasinda sayfalar <b>"+(this.checked?"belirtilecek":"belirtilmeyecek")+"</b>", 4);
        }, true);
        
        /*
        canliBasliklarCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.canliBasliklar = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Basliklar <b>"+(this.checked?"oldugu yerde":"yeniden yuklenerek")+"</b> guncellenecek", 4);
        }, true);
        */
        
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
        
        parcaliBaslikCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.baslikParcalama = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Baslik <b>"+(this.checked?"parcali":"tek link")+"</b> olacak!", 4);
        }, true);
		
        sabitSagPanelCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.sagPanelSabitleme = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Sag panelin yeri <b>"+(this.checked?"pencerenin":"sayfanin")+"</b> sagi olarak belirlendi!", 4);
        }, true);
        
        entryOnizlemeCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.entryOnizleme = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("'Entry onizleme' sistemi <b>"+(this.checked?"aktif":"devre disi")+"</b>!", 4);
        }, true);
        
        nickBasligiKontroluCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.nickBasligiKontrolu = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("'Nick basliklarina' kimdir nedir baglantisi <b>"+(this.checked?"eklenecek":"eklenmeyecek")+"</b>!", 4);
        }, true);
        
        kisaUrlKontroluCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.kisaUrlKontrolu = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("'Kisaltilmis linklere' tiklanildiginda yonlenilecek link<b>"+(this.checked?"gosterilecek":"gosterilmeyecek")+"</b>!", 4);
        }, true);
        
        ucnoktaCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.ucNoktayiGeriGetir = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Basliklar <b>"+(this.checked?"uc noktali":"her zamanki gibi")+"</b> olacak!", 4);
        }, true);

        ucnoktaTersCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.ucNoktayiTersineCevir = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Uc nokta ozelligi <b>"+(this.checked?"ters":"her zamanki gibi")+"</b> olacak!", 4);
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
        
        modTarihiPopupCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.modTarihiPopup = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("'Mod tarihcesi' bilgileri <b>"+(this.checked?"pop-up olarak":"ana sayfada")+"</b> gosterilecek!", 4);
        }, true);
                
        solFrameMenusuCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.solFrameMenusu = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("'Sol frame menusu' <b>"+(this.checked?"aktif":"devre disi")+"</b>!", 4);
        }, true);
        
        iframeGosterCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.iframeGoster = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("'iFrame tusu' <b>"+(this.checked?"gorunur":"gorunmez")+"</b> kilindi!", 4);
        }, true);
        
        tezgetirGosterCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.tezgetirGoster = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("'Tez getir' fonksiyonu <b>"+(this.checked?"aktif":"devre disi")+"</b>!", 4);
        }, true);
        
        konuluEntryIsaretleCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.konuluEntryIsaretle = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Konulu entry'ler <b>"+(this.checked?"isaretlenecek":"isaretlenmeyecek")+"</b>!", 4);
        }, true);
        
        konuluEntryHizalaCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.konuluEntryHizala = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Konulu entry'ler <b>"+(this.checked?"hizalanacak":"hizalanmayacak")+"</b>!", 4);
        }, true);
        
        turkiyeSaatiniKullanCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.turkiyeSaatiniKullan = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Tarih islemlerinde <b>"+(this.checked?"Turkiye saati":"lokal saat")+"</b> kullanilacak!", 4);
        }, true);
        
        yasakliBaslikGizleCB.addEventListener("change", function(){ 
            tumAyarlariYukle();
            Ayarlar.yasakliBasliklariGizle = this.checked;
            tumAyarlariKaydet();
            ayarMenusuDerki("Yasakli baslik korumasi <b>"+(this.checked?"aktif":"devre disi")+"</b>!", 5);
        }, true);
        
        yasakBaslikEkleBut.addEventListener("click", function(){ 
            if (yasakBaslikEkleVal.value.match(/^\s*$/)) {
                alert("Neyi?");
                return;
            }
            tumAyarlariYukle();
            yasakliRegexEkle(yasakBaslikEkleVal.value);
            ayarMenusuDerki("'<b>"+yasakBaslikEkleVal.value+"</b>' yasakli kelimelere <b>eklendi</b>!", 5);
            yasakBaslikEkleVal.value = '';
            yasakBaslikSilDD.innerHTML = yasakliBaslikDropDownListesi();
        }, true);
        
        yasakBaslikSilBut.addEventListener("click", function(){ 
            tumAyarlariYukle();
            yasakliRegexCikar(unescape(yasakBaslikSilDD.value));
            ayarMenusuDerki("'<b>"+unescape(yasakBaslikSilDD.value)+"</b>' yasakli kelimelerden <b>cikarildi</b>!", 5);
            yasakBaslikSilDD.innerHTML = yasakliBaslikDropDownListesi();
        }, true);
                
        yasakBaslikImportBut.addEventListener("click", function(){
            var dataTA = idGet("epp_yasakBaslikImportExportTA");
            if (dataTA.style.display == "none") {
                //Once kutuyu acalim...
                dataTA.style.display = "";
                alert("Daha onceden ihrac ederek kaydetmis oldugunuz listeyi acilan alana yapistirip, bir kere daha 'ithal' tusuna basin");
            } else {
                try { 
                    EppAPI_log("Ithal edilecek veri: " + dataTA.value);
                    var list = importYasakBaslikList(dataTA.value);
                    if (!list) return alert("Eklenecek bir sey bulunamadi gibi sanki belki...");
                    ayarMenusuDerki("<b>"+list.length+" yeni baslik</b> yasakli basliklara <b>eklendi</b>!", 5);
                    yasakBaslikSilDD.innerHTML = yasakliBaslikDropDownListesi();
                } catch (err) {
                    alert("Ithalat basarisiz oldu. Listede bir gariplik olmasin?");
                }
            }
        }, true);
        
        yasakBaslikExportBut.addEventListener("click", function(){
            var dataTA = idGet("epp_yasakBaslikImportExportTA");
            dataTA.style.display = "";
            dataTA.value = exportYasakBaslikList();
            alert("Yasakli baslik listenizi ihrac etmek icin acilan kutudaki verinin tamamini aynen kopyalayin ve kaydedin");
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
        // Sag paneli de asagiya cekelim ki ayar menusunu kapatmasin
        var rightcol = xpath("//div[@class='rightcol']").snapshotItem(0); //sag panel
        rightcol.style.position = "absolute";
        rightcol.style.top = (parseInt(rightcol.offsetTop) + idGet("topic").offsetTop)+"px"; 
        // Sayfayi da basa cekelim
        window.scrollTo(0,0);
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
            benTusu.href = "javascript:var benWindow = window.open('"+bennUrl+"','benWindow','resizable=yes,scrollbars=yes,width=800,height=400');";
            
        }
    }
    
    function gunlukDonBebegim() {
        var cssler = xpath("//head/link[@rel='stylesheet']");
        var reklamCss;
        
        for(var i=0; i<cssler.snapshotLength; i++) {
            if (cssler.snapshotItem(i).href.match(/com\/adcss\//)) {
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
            var donBebegimTusu = xpath(".//button[contains(@onclick,'dogenerictheme')]").snapshotItem(0);
            
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

    function yeniEksiTusu(element,id) {
        if (!element)
            element = "span";
        
        var yeniTus = document.createElement(element);
        
        if (element == "input")
            yeniTus.type = "button";
        
        if (id)
            yeniTus.id = id;
            
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
            
            if (link.href.match(/[#&]t=.+$/)) {
                var time = (link.href.match(/[#&]t=(.+)$/))[1];
                var timeInSec = parseInt(time.match(/\d+m/))*60;
                timeInSec += parseInt(time.match(/\d+s/));
                videoId += "&start="+timeInSec;
            }
            
            videoId += "&version=3";
            
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
            var bw = 5;
            var size = 400;
            var zoomStep = 1.2;
            
            var embImg = document.createElement("img");
            embImg.src = link.href;
            embImg.title = link.innerHTML;
            embImg.style.cursor = "pointer";
            embImg.style.maxWidth = size+"px";
            embImg.style.maxHeight = size+"px";
            embImg.style.padding = bw+"px";
            embImg.style.marginLeft = "1.9em";
            //embImg.style.backgroundImage = "url(" + transbg50UrlData + ")";
            embImg.style.backgroundColor = "rgba(0,0,0,.5)";
            var imgLink = document.createElement("a");
            imgLink.href = link.href;
            imgLink.target = "_blank";
            /*/
            embImg.addEventListener("click", function() {
                if (browser == "firefox") {
                    window.open(this.src);
                } else if (browser == "chrome/opera") {
                    var newWin = window.open();
                    newWin.opener = null;
                    newWin.document.location = this.src;
                }
            }, true);
            //*/
            
            imgZoomIn = document.createElement("div");
            imgZoomIn.innerHTML = "+";
            imgZoomIn.style.cursor = "pointer";
            imgZoomIn.style.position = "absolute";
            imgZoomIn.style.fontWeight = "bold";
            imgZoomIn.style.color = "white";
            imgZoomIn.style.width = "1.7em";
            imgZoomIn.style.height = "1.5em";
            imgZoomIn.style.textAlign = "center";
            //imgZoomIn.style.padding = "0.1em 0.5em";
            imgZoomIn.style.backgroundColor = "rgba(0,0,0,.5)";
            imgZoomIn.style.left = "0";
            imgZoomIn.style.top = "0";
            imgZoomIn.addEventListener("click", function() {
                size *= zoomStep;
                embImg.style.maxWidth = size+"px";
                embImg.style.maxHeight = size+"px";
                embImg.width *= zoomStep;
            }, true);
            
            imgZoomOut = document.createElement("div");
            imgZoomOut.innerHTML = "-";
            imgZoomOut.style.cursor = "pointer";
            imgZoomOut.style.position = "absolute";
            imgZoomOut.style.fontWeight = "bold";
            imgZoomOut.style.color = "white";
            imgZoomOut.style.width = "1.7em";
            imgZoomOut.style.height = "1.5em";
            imgZoomOut.style.textAlign = "center";
            //imgZoomOut.style.padding = "0.1em 0.5em";
            imgZoomOut.style.backgroundColor = "rgba(0,0,0,.5)";
            imgZoomOut.style.left = "0";
            imgZoomOut.style.top = "1.6em";
            imgZoomOut.addEventListener("click", function() {
                size /= zoomStep;
                embImg.style.maxWidth = size+"px";
                embImg.style.maxHeight = size+"px";
                embImg.width /= zoomStep;
            }, true);
            
            var resimKutusu = document.createElement("div");
            resimKutusu.style.marginTop = "0.5em";
            resimKutusu.style.marginBottom = "1em";
            resimKutusu.style.position = "relative";
            
            imgLink.appendChild(embImg);
            resimKutusu.appendChild(imgLink);
            resimKutusu.appendChild(imgZoomIn);
            resimKutusu.appendChild(imgZoomOut);
            link.parentNode.insertBefore(resimKutusu, link.nextSibling);
            link.setAttribute("epp_status","image_open");
        }
    }
    
    function tweetGomucu(link) {
        if (link.getAttribute("epp_status") == "tweet_open") {
            link.parentNode.removeChild(link.nextSibling);
            link.setAttribute("epp_status","tweet_closed");
        } else if (link.getAttribute("epp_status") == "tweet_closed") {
            link.setAttribute("epp_status","tweet_loading");
            var tweetId = (link.href.match(/status\/([^.]+)/))[1];
            var tweetUrl = "https://api.twitter.com/1/statuses/oembed.json?suppress_response_codes=true&id="+tweetId;
            
            EppAPI_JSONRequest({
                url: tweetUrl,
                method: "GET",
                data: "",
                onload: function(json) {
                    try {
                        var tweetKutusu = newElem("div");
                        tweetKutusu.style.marginTop = "0.5em";
                        tweetKutusu.style.marginBottom = "1em";
                        tweetKutusu.style.position = "relative";
                        link.setAttribute("epp_status","tweet_open");
                        
                        if (!json.error) {
                            tweetKutusu.innerHTML = json.html;
                            var tweetScript = idGet("tweetScript");
                            if(tweetScript) {
                              tweetScript.parentNode.removeChild(tweetScript);
                            }
                            tweetScript = newElem("script");
                            tweetScript.id = "tweetScript";
                            tweetScript.src = "http://platform.twitter.com/widgets.js";
                            document.getElementsByTagName("head")[0].appendChild(tweetScript);
                            
                            tweetKutusu.addEventListener ("DOMSubtreeModified", function(){
                                var tweetUrls = xpath(".//a[@class='url' or @class='screen-name' or @class='view-details']",this);
                                if(tweetUrls.snapshotLength > 0) {
                                  for(var i=0; i < tweetUrls.snapshotLength; i++) {
                                    tweetUrls.snapshotItem(i).target = "_blank";
                                  }
                                }
                            },true);
                        } else if (json.error.match(/no status found/i)) {
                            tweetKutusu.innerHTML = "-- Boyle bir tweet yok artik, silinmis olabilir! --";
                        } else if (json.error.match(/you are not authorized/i)) {
                            tweetKutusu.innerHTML = "-- Tweet sahibi twitter hesabini gizlemis! --";
                        } else {
                            tweetKutusu.innerHTML = "-- " + json.error + " --";
                        }
                        link.parentNode.insertBefore(tweetKutusu, link.nextSibling);   

                    } catch(e) {
                    
                    }
                },
            });
        }
    }
    
    function swfGomucu(link) {
        if (link.getAttribute("epp_status") == "swf_open") {
            link.parentNode.removeChild(link.nextSibling);
            link.setAttribute("epp_status","swf_closed");
        } else {
            var bw = 8;
            
            var embedHtml = embedTemplates.swf.html.replace(/__EMBED-SRC__/g, link.href);
            embedHtml = embedHtml.replace(/__EMBED-W__/g, embedTemplates.swf.width);
            embedHtml = embedHtml.replace(/__EMBED-H__/g, embedTemplates.swf.height);
                    
            var swfKutusu = document.createElement("div");
            swfKutusu.style.marginTop = "0.5em";
            swfKutusu.style.marginBottom = "1em";
            swfKutusu.style.width = embedTemplates.swf.width +"px";
            swfKutusu.style.height = embedTemplates.swf.height +"px";
            swfKutusu.style.padding = bw+"px";
            swfKutusu.style.backgroundColor = "rgba(0,0,0,.5)";
            swfKutusu.innerHTML = embedHtml;
            link.parentNode.insertBefore(swfKutusu, link.nextSibling);
            link.setAttribute("epp_status","swf_open");
        }
    }
    
    function kisaUrlKontrolu(link) {
        var shortUrlWindow;
        if (link.getAttribute("epp_status") == "url_expanded") {
            shortUrlWindow = window.open(link.href,'_blank');
        } else if(link.getAttribute("epp_status") == "url_shortened") {
            var loadingImg = newElem("img");
            loadingImg.style.paddingLeft = "5px";
            loadingImg.src = "http://i.imgur.com/oInr7.gif";//"http://i.imgur.com/MD7jO.gif";
            link.parentNode.insertBefore(loadingImg, link.nextSibling);
            link.setAttribute("epp_status","url_expanding");
            EppAPI_JSONRequest({
                url: "http://api.longurl.org/v2/expand?format=json&user-agent="+ encodeURIComponent("Eksi++ - User Script") +"&title=1&url="+encodeURIComponent(link.href),
                method: "GET",
                data: "",
                onload: function(json){
                    try { 
                        if (json["long-url"] && (json["long-url"] != link.href)) {
                            var yeniLink = newElem("a");
                            yeniLink.href = json["long-url"];
                            yeniLink.innerHTML = json["long-url"];
                            yeniLink.title = json["title"];
                            yeniLink.className = "url";
                            yeniLink.target = "_blank";
                            link.parentNode.insertBefore(yeniLink, link);
                            link.parentNode.removeChild(link.nextSibling);
                            link.parentNode.removeChild(link);
                            gomulebilirLinkDuzenle();
                        } else {
                            shortUrlWindow = window.open(link.href,'_blank');
                            link.parentNode.removeChild(link.nextSibling);
                            link.setAttribute("epp_status","url_expanded");
                        }
                    } catch (e) {
                        shortUrlWindow = window.open(link.href,'_blank');
                        link.parentNode.removeChild(link.nextSibling);
                        link.setAttribute("epp_status","url_expanded");
                    }
                },
            });
        }
    }
    
    function gomulebilirLinkDuzenle() {
        var linkler = xpath("//a[@class='url']");
        
        for (var i=0; i<linkler.snapshotLength; i++) {
            var link = linkler.snapshotItem(i);
                        
            if (link.getAttribute("epp_processed") == "true")
                continue;
            
            if(Ayarlar.youtubeGomme && link.href.match(/youtube\.com\/watch\?v=/)) {
                link.setAttribute("epp_status","youtube_closed");
                link.style.textDecoration = "underline";
                link.addEventListener("click", (function(pLink) { return function(e){ 
                    if (!e.ctrlKey && e.which != 2) {
                        youtubeGomucu(pLink); 
                        e.stopPropagation();
                        e.preventDefault();
                        return false; 
                    }
                }; })(link), true);
                link.setAttribute("epp_processed", "true");
            } else if (Ayarlar.resimGomme && link.href.match(/\.(jpe?g|gif|png)$/i)) {
                link.setAttribute("epp_status","image_closed");
                link.style.textDecoration = "underline";
                link.addEventListener("click", (function(pLink) { return function(e){ 
                    if (!e.ctrlKey && e.which != 2) {
                        resimGomucu(pLink); 
                        e.stopPropagation();
                        e.preventDefault();
                        return false; 
                    }
                }; })(link), true);
                link.setAttribute("epp_processed", "true");
            } else if (Ayarlar.tweetGomme && link.href.match(/twitter\.com\/.*\/status\//)) {
                link.setAttribute("epp_status","tweet_closed");
                link.style.textDecoration = "underline";
                link.addEventListener("click", (function(pLink) { return function(e){ 
                    if (!e.ctrlKey && e.which != 2) {
                        tweetGomucu(pLink); 
                        e.stopPropagation();
                        e.preventDefault();
                        return false; 
                    }
                }; })(link), true);
                link.setAttribute("epp_processed", "true");
            } else if (Ayarlar.swfGomme && link.href.match(/\.(swf)$/i)) {
                link.setAttribute("epp_status","swf_closed");
                link.style.textDecoration = "underline";
                link.addEventListener("click", (function(pLink) { return function(e){ 
                    if (!e.ctrlKey && e.which != 2) {
                        swfGomucu(pLink); 
                        e.stopPropagation();
                        e.preventDefault();
                        return false; 
                    }
                }; })(link), true);
                link.setAttribute("epp_processed", "true");
            } else if (Ayarlar.kisaUrlKontrolu && shortUrlPattern.test(link.href)) {
                link.setAttribute("epp_status","url_shortened");
                link.style.textDecoration = "underline";
                link.addEventListener("click", (function(pLink) { return function(e){ 
                    if (!e.ctrlKey && e.which != 2) {
                        kisaUrlKontrolu(pLink); 
                        e.stopPropagation();
                        e.preventDefault();
                        return false; 
                    }
                }; })(link), true);
                link.setAttribute("epp_processed", "true");
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
        var gomEntryLi = 0;
        
        for (var i=0; i<entryler.length; i++) {
            liItem = entryler[i];
            if (liItem.value) {
                gomEntryLi = liItem;
                break;
            }
        }
        
        if (gomEntryLi) {
            var entryID = gomEntryLi.id.replace(/\D/g,'');
            var entrySira = gomEntryLi.value;
            if (gomEntryLi.firstChild.nodeName == "input")
                gomEntryLi.removeChild(gomEntryLi.firstChild);
            //gomEntryLi.lastChild.removeChild(gomEntryLi.lastChild.lastChild);
            var scriptler = xpath(".//script", gomEntryLi)
            for (var i=0; i< scriptler.snapshotLength; i++) {
                var script = scriptler.snapshotItem(i);
                script.parentNode.removeChild(script);
            }
            var yazarID = xpath("./a",gomEntryLi.lastChild).snapshotItem(0).innerHTML;
            var shareSpan = xpath(".//div[@class='entrymenu']/span[1]",gomEntryLi).snapshotItem(0).innerHTML; //facebook, twitter, ff paylas link'leri
            gomEntryLi.insertBefore(document.createElement("br"), gomEntryLi.lastChild);
            var eksiTuslari =  '<table style="float: right; margin-top: 0.5em;"><tbody><tr><td style="white-space: nowrap;" id="vst__ENTRY-ID__" class="ei">&nbsp;</td>\
                                    <td><span style="margin-right:10px;">__SHARE-LINKS__</span></td>\
                                    <td><span class="but" onclick="mpr(__ENTRY-ID__,1)" title="şükela!" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:)&nbsp;</span></td>\
                                    <td><span class="but" onclick="mpr(__ENTRY-ID__,0)" title="öeehh" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:O&nbsp;</span></td>\
                                    <td><span class="but" onclick="mpr(__ENTRY-ID__,-1)" title="çok kötü" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:(&nbsp;</span></td>\
                                    <td>&nbsp;</td>\
                                    <td><span class="but" onclick="od(\'msg.asp?to=__YAZAR-ID__&amp;re=__ENTRY-ID__\')" title="mesaj at" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;/msg&nbsp;</span></td>\
                                    <td><a class="but" href="javascript:od(\'http://antik.eksisozluk.com/info2.asp?n=__YAZAR-ID__\',800,400)" title="yazar hakkında" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)">&nbsp;?&nbsp;</a></td>\
                                </tr></tbody></table>';
            eksiTuslari = eksiTuslari.replace(/__ENTRY-ID__/g, entryID);
            eksiTuslari = eksiTuslari.replace(/__YAZAR-ID__/g, yazarID);
            eksiTuslari = eksiTuslari.replace(/__SHARE-LINKS__/g, shareSpan);
            result = "<h2 class='title'>" + baslik.innerHTML + 
                         "&nbsp;"+
                         "<sup><a href='show.asp?t="+encodeURIComponent(baslik.textContent).replace(/[']/g,"%27")+"' target='sozmain' title='basliga git' target='_blank' style='text-decoration:underline;'>git</a></sup>"+
                         "<sup><a href='show.asp?t="+encodeURIComponent(baslik.textContent).replace(/[']/g,"%27")+"&i="+entryID+"' target='sozmain' title='konulu git' target='_blank' style='text-decoration:underline; margin-left:.5em;'>kit</a></sup>"+
                     "</h2>";
            result += "<ol style='white-space: normal;'><li value='"+entrySira+"' style='margin-left:0;'>";
            result += gomEntryLi.innerHTML;
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
            entryUrl = entryUrl.replace("sozluk.sourtimes.org","antik.eksisozluk.com"); //Domain degisikligi onlemi
            
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
            
            // Gomulu uzun entry'lerin gorunmesi engellenemez!
            var divTopic = idGet("topic");
            if (divTopic) {
                divTopic.style.overflow = "visible";
            }
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
            
        if (window.location.href.match(/(info|info2)\.asp/) && !Ayarlar.kimdirNedirBkzGomme)
            return;
            
        if (window.location.href.match(/(info2left|index)\.asp/))
            return;
    
        var linkList = document.getElementsByTagName("a");
        var length = linkList.length;
        
        for (var i=0; i<length; i++) {
            var link = linkList[i];
            
            if (link.getAttribute("epp_processed") == "true")
                continue;
            
            if (link.className.match(/(gb|id|b)/) && link.innerHTML.match(/(#|\/)\d+$/)) {
                link.style.textDecoration = "underline";
                link.addEventListener("click", (function(pLink) { return function(e){ 
                    if (!e.ctrlKey && e.which != 2) { 
                        entryGomucu(pLink); 
                        //e.stopPropagation();
                        e.preventDefault();  
                        return false;
                    }
                }; })(link), true);
                link.setAttribute("epp_processed", "true");
            } else if (link.href.match(/(^http:\/\/(sozluk\.sourtimes\.org|antik\.eksisozluk\.com)\/)?show\.asp\?(id=|t=.+%23)\d+/)) {
                link.style.textDecoration = "underline";
                link.addEventListener("click", (function(pLink) { return function(e){ 
                    if (!e.ctrlKey && e.which != 2) { 
                        entryGomucu(pLink); 
                        //e.stopPropagation();
                        e.preventDefault();  
                        return false;
                    }
                }; })(link), true);
                link.setAttribute("epp_processed", "true");
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
                var eleman = (matches)?((matches[2] != null)?matches[2]:matches[3]):"prof. dr. ahmet sourtimes";
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
                    if (cevapTusu.title.match(/mesaj yazma/))
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
                        threadTitle.addEventListener("click",function(e){
                            if (e.target != this)
                                return;
                                
                            this.style.borderColor = "";
                            var thr = this.getAttribute("epp_headOfThread");
                            var colStatus = this.getAttribute("epp_collapseStatus");
                            var unrStatus = (this.getAttribute("epp_unreadStatus") != 0)?1:0;
                            var unrCount = parseInt(this.getAttribute("epp_unreadcount"));
                            var thrMsgList = xpath("//li[@epp_msgthread='"+thr+"']");
                            for (var i=0; i<thrMsgList.snapshotLength; i++) {
                                var msg = thrMsgList.snapshotItem(i);
                                if (colStatus == 0) {
                                    this.setAttribute("epp_collapseStatus", 1);
                                    if (msg.getAttribute("epp_unread")) //Sadece mesajlar, 'yeni mesaj' kutusu degil
                                        msg.style.display = "";
                                } else {
                                    this.setAttribute("epp_collapseStatus", 0);
                                    msg.style.display = "none";
                                }
                            }
                        }, false);
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
                threadTitle.setAttribute("epp_unreadcount", yeniMesajSayisi);
                if (yeniMesajSayisi)
                    threadTitle.innerHTML = "<b>(<a class='gb' style='color:#DB0028; font-weight:bold;'>"+yeniMesajSayisi+"</a> yeni | <a class='gb'>"+toplamMesajSayisi+"</a> toplam) <a href='show.asp?t="+encodeURIComponent(mesajSirasi[kimle])+"'>"+mesajSirasi[kimle]+"</a></b>";
                else 
                    threadTitle.innerHTML = "<b>(<a class='gb'>"+yeniMesajSayisi+"</a> yeni | <a class='gb'>"+toplamMesajSayisi+"</a> toplam) <a href='show.asp?t="+encodeURIComponent(mesajSirasi[kimle])+"'>"+mesajSirasi[kimle]+"</a></b>";
                var okunduBut = newElem("a");
                okunduBut.innerHTML = "✔ ✔ ...";
                okunduBut.title = "tum grubu okundu olarak isaretle";
                okunduBut.style.position = "absolute";
                okunduBut.style.right = "10px";
                okunduBut.style.cursor = "pointer";
                okunduBut.addEventListener("click",function(e){
                    var parent = this.parentNode;
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
                }, false);
                threadTitle.appendChild(okunduBut);
                
                var selectGroupCB = newElem("input");
                selectGroupCB.type = "checkbox";
                selectGroupCB.title = "tum grubu sec/temizle";
                selectGroupCB.addEventListener("change", function(e){ 
                    //Tum grubun isaretle veya isaretleri kaldir
                    var parent = this.parentNode;
                    var thr = parent.getAttribute("epp_headofthread");
                    var thrMsgList = xpath("//li[@epp_msgthread='"+thr+"']");
                    for (var i=0; i<thrMsgList.snapshotLength; i++) {
                        var msg = thrMsgList.snapshotItem(i);
                        var msgCB = xpath(".//input[@name='dmsg']", msg).snapshotItem(0);
                        if (msgCB)
                            msgCB.checked = this.checked; //check or uncheck
                    }
                }, false);
                threadTitle.insertBefore(selectGroupCB, threadTitle.firstChild);
                
                threadTitle.setAttribute("epp_unreadStatus", (yeniMesajSayisi?1:0));
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
            
            var topluIslemKutusu = newElem("li");
            topluIslemKutusu.style.textAlign = "left";
            topluIslemKutusu.style.borderWidth = "1px";
            topluIslemKutusu.style.borderStyle = "solid";
            topluIslemKutusu.style.margin = "2px";
            topluIslemKutusu.style.padding = "4px";
            topluIslemKutusu.style.marginTop = "0.2em";
            topluIslemKutusu.style.position = "relative";
            
            var selectallCB = newElem("input");
            selectallCB.type = "checkbox";
            selectallCB.title = "tum mesaj gruplarini sec/temizle";
            selectallCB.addEventListener("change", function(e){ 
                //Her seyi ya isaretleyelim ya da temizleyelim
                var groupHeads = xpath("//li[@epp_headofthread]");
                for (var i = 0; i < groupHeads.snapshotLength; i++) {
                    var head = groupHeads.snapshotItem(i);
                    xpath(".//input[@type='checkbox']", head).snapshotItem(0).checked = this.checked;
                }
                var allMsgList = xpath("//li[@epp_msgthread]");
                for (var i = 0; i < allMsgList.snapshotLength; i++) {
                    var msg = allMsgList.snapshotItem(i);
                    var cb = xpath(".//input[@type='checkbox']", msg).snapshotItem(0);
                    if (cb)
                        cb.checked = this.checked;
                }
            }, false);
            topluIslemKutusu.appendChild(selectallCB);
            
            var cokluOkunduBtn = newElem("a");
            cokluOkunduBtn.innerHTML = "✔ ✔ ...";
            cokluOkunduBtn.title = "tum secili mesajlari okundu olarak isaretle";
            cokluOkunduBtn.style.cursor = "pointer";
            cokluOkunduBtn.style.fontWeight = "bold";
            cokluOkunduBtn.style.marginLeft = "5px";
            cokluOkunduBtn.addEventListener("click",function(e){
                var allMsgList = xpath("//li[@epp_msgthread]");
                var okunmusMesajlar = JSON.parse(EppAPI_getValue(System.storage.okunmusMesajListesi, '{}'));
                for (var i=0; i<allMsgList.snapshotLength; i++) {
                    var msg = allMsgList.snapshotItem(i);
                    var msgCB = xpath(".//input[@name='dmsg']", msg).snapshotItem(0);
                    if (msgCB && msgCB.checked) {
                        okunmusMesajlar[msg.id] = 1;
                        msg.style.borderColor = "";
                    }
                }
                EppAPI_setValue(System.storage.okunmusMesajListesi, JSON.stringify(okunmusMesajlar));
                e.stopPropagation();
            }, false);
            topluIslemKutusu.appendChild(cokluOkunduBtn);
            
            // DIKKAT: Opera arsivleme/silme sorunu icin absurd HACK!!
            //         "submit()" fonksiyonu sansimiza sadece Opera'da replace edilebiliyor
            //         Chrome ve Firefox bu girisimi gozardi ediyor sadece...
            var mainForm = idGet("dmsgfrm");
            var origSubmit = mainForm.submit;
            mainForm.submit = function() { 
                // Form'un icine kacmis olan mesaj kutulari ile ilgili field'lari "disable" yapalim
                var inputList = xpath(".//li//input[@name='to'] | .//li//input[@name='x_equals_5'] | .//li//textarea[@name='d']", this);
                //alert("# of input's to disable: " + inputList.snapshotLength);
                for (var i=0; i<inputList.snapshotLength; i++) {
                    inputList.snapshotItem(i).setAttribute("disabled","disabled");
                }
                origSubmit.call(this);
            }
            if (navigator.userAgent.match(/opera/i)) {
                var inputList = xpath(".//form[@id='dmsgfrm']/input[@type='submit']");
                for (var i=0; i<inputList.snapshotLength; i++) {
                    var input = inputList.snapshotItem(i);
                    input.setAttribute("onclick", input.getAttribute("onclick") + ";G('dmsgfrm').action='domsg.asp?a="+encodeURIComponent(input.getAttribute("value"))+"&ref=y';G('dmsgfrm').submit();return false;");
                }
            }
            // HACK bitti
            
            anaListe.insertBefore(topluIslemKutusu, anaListe.firstChild);
            
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
                try { malSevkiyatiSistemiKur(); } catch (err) { EppAPI_log("HATA: 'malSevkiyatiSistemiKur()' patladi! >> " + err); }
            } else if (window.location.href.match(/cc.asp(\?sec=ma[^&]*)?$/)) {
                try { mesajlariDuzenle(); } catch (err) { EppAPI_log("HATA: 'mesajlariDuzenle()' patladi! >> " + err); }
            } else {
                if (debug) EppAPI_log("Bu ayar menusu bizi ilgilendirmiyor: " + window.location.href);
            }
        }
    }

    
    //// UST FRAME ENGINE ////
    function UstFrameEngine() {
        
        function guncellemePaneli(yeniSurum) {
            var bugun = (new Date()).getDay();
            
            if ((meta.branch != "eppdev") && EppAPI_getValue(System.storage.sonKontrolGunu, -1) == bugun) {
                //Bugun uyari vermisiz zaten
                EppAPI_log("Guncelleme uyarisi bugun daha once yapilmis. Rahatsiz etmeyelim fazla.");
                return;
            }
            
            // Bugun uyari verdigimizi not edelim
            EppAPI_setValue(System.storage.sonKontrolGunu, bugun);
            EppAPI_log("Guncelleme uyarisi bugun daha once yapilmamis. Uyaralim.");
            
            var anaPanel = newElem("div");
            anaPanel.style.cssFloat = "right";            
            anaPanel.style.width = "500px";
            anaPanel.style.height = "40px";
            anaPanel.style.textAlign = "right";
            anaPanel.style.verticalAllign = "middle";
            anaPanel.style.padding = "1em 0";
            anaPanel.innerHTML = ""+
            "<b>yeni <a href='show.asp?t=eksi%2B%2B' target='sozmain'>eksi++</a> cikmis: <a class='url' href='http://userscripts.org/scripts/show/"+meta.id+"'>v"+yeniSurum+"</a></b>"+
            '<a style="padding:2px 1em; margin:0 2em 0 1em;" class="but" href="http://userscripts.org/scripts/source/'+meta.id+'.user.js" target="_blank" title="Hanim kos guncelleme olmus!" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">guncelli-yorum!</a>'+
            "";
            document.body.insertBefore(anaPanel, document.body.firstChild);
        }
    
        function guncellemeKontrolu() {
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
                            setTimeout(function(){ guncellemePaneli(json.latest) }, 1000);
                        } else {
                            EppAPI_log("Guncelleme yok >> Eldeki Surum: " + meta.version);
                            EppAPI_setValue(System.storage.isUpToDate, 1);
                            EppAPI_setValue(System.storage.latestVersion, meta.version);
                            //Guncelleme yok, 30dk sonra bir daha bakalim
                            setTimeout(guncellemeKontrolu, 1000*60*30);
                        }
                    } catch (e) {
                        // Himm, bir sorun var... En yakin zamanda yine deneyelim (15 dk.)
                        setTimeout(guncellemeKontrolu, 1000*60*15);
                    }
                },
            });
        }
    
        this.basla = function() {
            EppAPI_log("UST FRAME BASLADI");
            //Guncelleme kontrolu baslasin
            try { guncellemeKontrolu(); } catch (err) { EppAPI_log("HATA: 'guncellemeKontrolu()' patladi! >> " + err); }
        }
    }
    
    
    //// SOL FRAME ENGINE ////
    function SolFrameEngine() {        
        // Basliklarin XPath listesi
        var basliklar;
        
        var solFrameReloadTO;
        
        var minReloadSuresi = 10;
        var sonGuncellenenBaslik = 0;
        
        var baslikListConversionDone = 0;
        
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
                        var girdiler = xpath(".//ol/li/div/a", baslikDoc);
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
                            if (debug) EppAPI_log("Baslik Bos Cikti: " + adres);
                        }
                        kacKisiyiz--;
                        baslikRef.innerHTML = oldInnerHtml;
                        if (debug) EppAPI_log("Baslik Talepleri, Kac Kisiyiz: " + kacKisiyiz);
                        if (kacKisiyiz <= 0)
                            baslikFiltrelemeBitti();
                    }
                };
                req.send(null);
            };
        }
        
        // Proxy'den gelen cevaba gore basliklari filtreleme        
        function proxyBasliklariFiltrele(proxyResp) {
            EppAPI_log("Proxy cevabi : " + JSON.stringify(proxyResp));
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
                                    if (debug) EppAPI_log("Baslik Proxy'den Bulundu: Sonuc: DONUZ! | Acan: " + proxyResp[proxyBaslik] + " | Baslik: '" + baslik.innerHTML + "'");
                                } else {
                                    baslik.setAttribute("donuz", 0);
                                    if (debug) EppAPI_log("Baslik Proxy'den Bulundu: Sonuc: Normal | Acan: " + proxyResp[proxyBaslik] + " | Baslik: '" + baslik.innerHTML + "'");
                                }
                                
                                kacKisiyiz--;
                            } else {
                                if (debug) EppAPI_log("Baslik Proxy'de Yok: " + baslik.innerHTML);
                                // Proxy'de olmayan basliklari bizzat request edip
                                // yazarini bulmak
                                var filtre =  new baslikFiltresi(baslik);
                                filtre.basla();
                            }
                        }
                    }
                } else {
                    if (debug) EppAPI_log("Baslik Proxy'de Yok: " + baslik.innerHTML);
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

            if (debug) EppAPI_log("Basliklar: " + surdan + " -> " + suraya + "" );
            
            var baslikList = new Array();
            
            for (var i = surdan; i < suraya; i++) {
                var baslik = basliklar.snapshotItem(i);
                baslikList.push(baslik.innerHTML);
            }
            
            var proxyUrl = "http://mekan.dreamhosters.com/eksi++/proxy.php?r=" + ((new Date()).getTime());
            
            var proxyJsonData = JSON.stringify(baslikList);
            
            var proxyResp;
            
            EppAPI_log("Proxy requesti | URL: " + proxyUrl + " | Data: " + proxyJsonData);
            
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
                //if (debug) EppAPI_log("Baslik inceleniyor: "+baslikStr);
                for (var j in Ayarlar.yasakliRegexListesi) {
                    var re = new RegExp(Ayarlar.yasakliRegexListesi[j],"i");
                    if (re.test(baslikStr)) {
                        alalimArkadasi(baslik.parentNode);
                        baslik.parentNode.setAttribute("epp_yasakli", "true");
                        if (debug) EppAPI_log("Baslik YASAKLI cikti: " + baslikStr + " | RE='"+Ayarlar.yasakliRegexListesi[j]+"'");
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
                    var eskiHref = baslik.href;
                    var eskiTitle = baslik.title;
                    var yeniHref = baslik.href.replace(/&(a=(td|yd|fv|sr)|d=\d\d\.\d\d\.\d\d\d\d)/,'');
                    var yeniTitle = baslik.title.replace(/\((\d+)\/(\d+)\)/, "($2)"); //Tesekkurler vape@eksisozluk
                    
                    if (!Ayarlar.ucNoktayiTersineCevir) { //Tesekkurler soba@eksisozluk
                      ucnokta.href = eskiHref;
                      ucnokta.title = eskiTitle;
                      baslik.href = yeniHref;
                      baslik.title = yeniTitle;
                    } else {
                      ucnokta.href = yeniHref;
                      ucnokta.title = yeniTitle;
                    }                    
                   
                    //baslik.title = baslik.innerHTML;
                    baslik.parentNode.appendChild(ucnokta);
                }
            }
        }
		
        function dogrudanBaslikYasakla() {
            if (!Ayarlar.yasakliBasliklariGizle) return;
 
            for (var i = 0; i < basliklar.snapshotLength; i++) {
                var baslik = basliklar.snapshotItem(i);
                baslik.addEventListener("click", function(e){
                    if(e.altKey) { /* alt + leftClick  ile basligi dogrudan yasakliRegex'e ekliyoruz */
                       alalimArkadasi(this.parentNode);
                       yasakliRegexEkle(this.innerHTML);
                       e.preventDefault();
                    }	
                }, true);
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
			dogrudanBaslikYasakla();
            ucNoktaEkle();
        }
        
        function basligiGuncelle(currBasliklar, yeniBaslik) {
            var baslikYeni = 1;
            for (var i = 0; i < currBasliklar.snapshotLength; i++) {
                var currBaslik = currBasliklar.snapshotItem(i);
                var baslikListesi = xpath(".//ul").snapshotItem(0);
                
                if (currBaslik.childNodes[0].innerHTML == yeniBaslik.childNodes[0].innerHTML) {
                    var currBaslikText = currBaslik.childNodes[0].innerHTML+(currBaslik.childNodes[1]?currBaslik.childNodes[1].textContent:'');
                    var yeniBaslikText = yeniBaslik.childNodes[0].innerHTML+(yeniBaslik.childNodes[1]?yeniBaslik.childNodes[1].textContent:'');
                    
                    var currBaslikCount = 1;
                    if (currBaslik.getAttribute("epp_currEntryCount"))
                        currBaslikCount = parseInt(currBaslik.getAttribute("epp_currEntryCount"));
                    else if (currBaslik.childNodes[1])
                        currBaslikCount = parseInt(currBaslik.childNodes[1].textContent.replace(/[\s()]/g,''));
                    
                    var yeniBaslikCount = (yeniBaslik.childNodes[1]?parseInt(yeniBaslik.childNodes[1].textContent.replace(/[\s()]/g,'')):1);
                    
                    if (yeniBaslikCount > currBaslikCount) {
                        EppAPI_log("Baslik '"+currBaslikText+"' yerine '"+yeniBaslikText+"' bulundu...");
                        EppAPI_log("    "+(yeniBaslikCount - currBaslikCount)+" yeni entry");
                        
                        if (currBaslik.getAttribute("epp_baseEntryCount")) {
                            // daha once de guncellemisiz bunu
                            EppAPI_log("    Bir daha guncelliyoruz, bir daha, bir daha...");
                            var baseCount = parseInt(currBaslik.getAttribute("epp_baseEntryCount"));
                            currBaslik.childNodes[1].innerHTML = " ("+yeniBaslikCount+"/"+(yeniBaslikCount - baseCount)+")";
                            currBaslik.setAttribute("epp_currEntryCount", yeniBaslikCount);
                        } else {
                            // ilk guncellememiz
                            EppAPI_log("    Ilk defa guncelliyoruz bunu. Hadi bakalim...");
                            var baseCount = (currBaslik.childNodes[1]?parseInt(currBaslik.childNodes[1].textContent.replace(/[\s()]/g,'')):1);
                            currBaslik.childNodes[1].innerHTML = " ("+yeniBaslikCount+"/"+(yeniBaslikCount - baseCount)+")";
                            currBaslik.setAttribute("epp_baseEntryCount", baseCount);
                            currBaslik.setAttribute("epp_currEntryCount", yeniBaslikCount);
                        }
                        
                        baslikListesi.removeChild(currBaslik);
                        if (sonGuncellenenBaslik) {
                            baslikListesi.insertBefore(currBaslik, sonGuncellenenBaslik.nextSibling);
                        } else {
                            baslikListesi.insertBefore(currBaslik, baslikListesi.firstChild);
                        }
                        sonGuncellenenBaslik = currBaslik;
                        
                    }
                    baslikYeni = 0;
                    break;
                }
            }
            
            if (baslikYeni) {
                // yeni bir baslikmis
                var yeniBaslikText = yeniBaslik.childNodes[0].innerHTML+(yeniBaslik.childNodes[1]?yeniBaslik.childNodes[1].textContent:'');
                var yeniBaslikCount = (yeniBaslik.childNodes[1]?parseInt(yeniBaslik.childNodes[1].textContent.replace(/[\s()]/g,'')):1);                
                
                EppAPI_log("Yepisyeni bir baslik bulundu: '"+yeniBaslikText+"'");
                
                if (yeniBaslik.childNodes[1])
                    yeniBaslik.childNodes[1].textContent = " ("+yeniBaslikCount+"/"+yeniBaslikCount+")";
                else
                    yeniBaslik.innerHTML += " ("+yeniBaslikCount+"/"+yeniBaslikCount+")";
                
                yeniBaslik.setAttribute("epp_baseEntryCount", 0);
                yeniBaslik.setAttribute("epp_currEntryCount", yeniBaslikCount);

                if (sonGuncellenenBaslik) {
                    baslikListesi.insertBefore(yeniBaslik, sonGuncellenenBaslik.nextSibling);
                } else {
                    baslikListesi.insertBefore(yeniBaslik, baslikListesi.firstChild);
                }
                sonGuncellenenBaslik = yeniBaslik;
            }
        }

        function basliklariCanlandir() {
            EppAPI_log(">> Baslik canlandirma basladi!");
            
            // Some loading indicator is needed. "loading" gif maybe??
            
            if (!baslikListConversionDone) {
                EppAPI_log("Basliklari duzenliyoruz... (text -> span)");
                var currBasliklar = xpath(".//ul/li");
                for (var i = 0; i < currBasliklar.snapshotLength; i++) {
                    var baslik = currBasliklar.snapshotItem(i);
                    if (baslik.textContent.match(/\(\d+\)/)) {
                        //Eger basligin entry sayisi hali hazirda varsa
                        //bu textNode element'i span'e cevirelim
                        var text = baslik.childNodes[1].textContent;
                        baslik.removeChild(baslik.childNodes[1]);
                        var span = newElem("span");
                        span.innerHTML = text;
                        baslik.insertBefore(span, baslik.firstChild.nextSibling);
                    }
                }
                baslikListConversionDone = 1;
            }
            
            var sonrakiSayfaUrl = document.URL;
            var req =  new XMLHttpRequest();
            var result = "";
            req.open("GET", sonrakiSayfaUrl, false);
            req.send(null);
            var tempDom = document.createElement("div");
            tempDom.innerHTML = req.responseText;
            if (!tempDom.getElementsByTagName("ul").length)
                return 0;
            
            var yeniBasliklar = xpath(".//ul/li", tempDom);
            var currBasliklar = xpath(".//ul/li");
            
            if (currBasliklar.snapshotLength > 500) {
                clearInterval(solFrameReloadTO);
                // 500 basligi gectigimiz icin uyari ve reload iptali
            }
            
            sonGuncellenenBaslik = 0;
            for (var i = 0; i < yeniBasliklar.snapshotLength; i++) {
                var yeniBaslik = yeniBasliklar.snapshotItem(i);
                basligiGuncelle(currBasliklar, yeniBaslik);
            }
            EppAPI_log(">> Baslik canlandirma bitti...");
        }
        
        function yenilemeSuresiniBul() {
            //Dokuman adresinden yenileme suresini bulup cikartir, yoksa 0 doner
            var match = document.location.href.match(/#epp_reload=(\d+)$/i);
            if (match && match[1]) {
                EppAPI_log("Yenileme suresi bulundu: "+match[1]+" saniye");
                return parseInt(match[1]);
            } else {
                return 0;
            }
        }
        
        function yenilemeSuresiniKaydet(saniye) {
            //Dokuman adresine yenileme suresini yerlestirir
            var urlOrig = document.location.href.replace(/#epp_reload=(\d+)$/i,"");
            if (saniye)
                document.location.href = urlOrig + "#epp_reload=" + saniye;
            else
                document.location.href = urlOrig;
        }
        
        function otomatikYenilemeyiDuzenle() {
            if (EppAPI_getValue(System.storage.solFrameReload,0)) {
                var seconds = parseInt(EppAPI_getValue(System.storage.solFrameReload,0));
                if (seconds) {
                    solFrameReloadTO = setInterval(function(){
                        if (Ayarlar.canliBasliklar)
                            basliklariCanlandir();
                        else
                            window.location.reload();
                    }, (seconds*1000));
                }
            }
        }
        
        function otomatikYenilemeyiBaslatBitir(tus,oySaniyesi) {
            if (tus.value == "yenile") {
                var seconds = parseInt(oySaniyesi.value);
                if (seconds >= minReloadSuresi) {
                    solFrameReloadTO = setInterval(function(){
                        if (Ayarlar.canliBasliklar)
                            basliklariCanlandir();
                        else
                            window.location.reload();
                    }, (seconds*1000));
                    EppAPI_setValue(System.storage.solFrameReload, seconds);
                    oySaniyesi.setAttribute("disabled","true");
                    tus.value = "iptal";
                    tus.title = "Yenilemeyi bitir!";
                } else {
                    alert("oyle zaman araligi mi olur... en az "+minReloadSuresi+" saniye olsa neyse");
                }
            } else {
                clearInterval(solFrameReloadTO);
                EppAPI_setValue(System.storage.solFrameReload, 0);
                //yenilemeSuresiniKaydet(0);
                oySaniyesi.removeAttribute("disabled");
                tus.value = "yenile";
                tus.title = "verilen aralikta sol frame'i surekli yenile";
            }
        }
        
        function arayuzElemanlariniEkle() {
            if (Ayarlar.solFrameMenusu) {
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
                
                // Otomatik yenileme
                var oyDiv = newElem("div");
                oyDiv.style.marginBottom = "5px";
                var oySaniyesi = newElem("input");
                var reloadInt = EppAPI_getValue(System.storage.solFrameReload, 0);
                oySaniyesi.type = "text";
                oySaniyesi.style.width = "3em";
                oySaniyesi.style.marginRight = "0.5em";
                oySaniyesi.value = (parseInt(reloadInt) > 0)? reloadInt : "60";
                if (parseInt(reloadInt) > 0)
                    oySaniyesi.setAttribute("disabled","true");
                else
                    oySaniyesi.removeAttribute("disabled");
                var oyAcKapaBut = yeniEksiTusu("input");
                oyAcKapaBut.value = (parseInt(reloadInt) > 0)?"iptal":"yenile";
                oyAcKapaBut.title = "verilen aralikta sol frame'i surekli yenile";
                oyAcKapaBut.style.width = "120px";
                oyAcKapaBut.addEventListener("click",function(){
                    otomatikYenilemeyiBaslatBitir(this, oySaniyesi);
                },false);
                
                //Gunun Onemi ve Serhat hesaplamalari
                //// Contributor: armish ////
                var currentURL = window.location.href;
                var turkeyTime = new Date();
                if (Ayarlar.turkiyeSaatiniKullan) {
                    var localTime = new Date();
                    var UTC = localTime.getTime() + (localTime.getTimezoneOffset()*60000);
                    //turkeyTime = new Date(UTC + (3*60*60000)); // Yaz saati
                    turkeyTime = new Date(UTC + (2*60*60000)); // Kis saati
                }
                //alert("Baz zaman: " + turkeyTime.toLocaleString());

                if (currentURL.match(/&fd=(\d+)/)) {
                    turkeyTime.setDate((currentURL.match(/&fd=(\d+)/))[1]);
                    turkeyTime.setMonth((currentURL.match(/&fm=(\d+)/))[1]-1);
                    turkeyTime.setFullYear((currentURL.match(/&fy=(\d+)/))[1]);
                } else if (currentURL.indexOf("a=yd") > 0 ) {
                    turkeyTime.setTime( turkeyTime.getTime() - 1000*60*60*24 );
                } else if (currentURL.indexOf("a=ly") > 0 ) {
                    turkeyTime.setFullYear( turkeyTime.getFullYear() - 1 );
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
                            
                    turkeyTime.setDate( pagiWords[0] );
                    turkeyTime.setMonth( randMonth );
                    turkeyTime.setFullYear( pagiWords[2] );
                }
                
                //Serhat
                var serhatDiv = newElem("div");
                serhatDiv.style.marginBottom = "5px";
                var gundemTusu = yeniEksiTusu("input");
                gundemTusu.value = "neler donmus serhat?";
                gundemTusu.title = "bugun en cok entry girilen, en populer basliklari getir";
                gundemTusu.style.width = "220px";
                gundemTusu.addEventListener("click",function(){
                    
                    var month = turkeyTime.getMonth() + 1;
                    var day = turkeyTime.getDate();
                    var year = turkeyTime.getFullYear();
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
                    var month = months[turkeyTime.getMonth()];
                    var day = turkeyTime.getDate();
                    var year = turkeyTime.getFullYear();
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
        }
        
        function solFrameEksiStatsDoldur(jsonData) {
            if (!jsonData)
                return;
                
            if (jsonData.status == 1) { //eksistats hizmet veriyor
                var tagUl = xpath("//ul[@class='index']").snapshotItem(0);
                var tempUl = tagUl.cloneNode(true);
                var tempFieldset = tagUl.previousSibling.cloneNode(true);
                tempFieldset.innerHTML = '<legend style="font-weight:bold">eksistats</legend>';
                
                tempUl.innerHTML = "";
                for (var i = 0; i < jsonData.statlist.length; i++) {
                    if (jsonData.statlist[i].statu == 1) //aktif istatistik
                        tempUl.innerHTML += '<li><a target="sozmain" href="stats.asp?id=eksistats-'+jsonData.statlist[i].statsid+'">'+jsonData.statlist[i].statsname+'</a></li>';
                }
                tagUl.parentNode.insertBefore(tempFieldset, tagUl.nextSibling);
                tempFieldset.parentNode.insertBefore(tempUl, tempFieldset.nextSibling);
            }
        }
          
        function solFrameEksiStatsBasla() {
            if (!window.location.href.match(/\/stats\.asp$/))
                return;
            
            EppAPI_JSONRequest({
                url: "http://www.eksistats.com/api.php?id=info",
                method: "GET",
                data: "",
                onload: function(json) {
                    try {
                        solFrameEksiStatsDoldur(json);
                    } catch(e) {
                        
                    }
                },
            });
        }
        
        
    //--// Sol Frame Engine - GIRIS //--//
        this.basla = function () {
            if (Ayarlar.canliBasliklar) {
                tumAyarlariYukle();
                Ayarlar.canliBasliklar = 0; //Canli basliklari simdilik devre disi birakalim...
                tumAyarlariKaydet();
            }
            try { arayuzElemanlariniEkle(); } catch (err) { EppAPI_log("HATA: 'arayuzElemanlariniEkle()' patladi! >> " + err); }
            try { otomatikYenilemeyiDuzenle(); } catch (err) { EppAPI_log("HATA: 'otomatikYenilemeyiDuzenle()' patladi! >> " + err); }
            try { basliklariDuzenle(); } catch (err) { EppAPI_log("HATA: 'basliklariDuzenle()' patladi! >> " + err); }
            try { solFrameEksiStatsBasla(); } catch (err) { EppAPI_log("HATA: 'solFrameEksiStatsBasla()' patladi! >> " + err); }
        }
    }


    //// SAG FRAME ENGINE
    function SagFrameEngine() {
    
        var baslikFull = "";
    
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
        
        var sonrakiSayfaUrl = 0;
        var sonrakiSonrakiSayfa = 0;
        var sonEntryId = "d0";
        
        var scrollChecker = 0;
        
        var bitmeyenEntrylerLock = 0;
        
        var dahada = 0; //"daha da..." linki referansi
        
        var ucanKontrolPaneliDiv = 0;
        var ucanKontrolPaneliVisible = 0;
        
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

        function isThisSearchResults() {
            return window.location.href.match(/&*kw=[^&]+&*/);
        }
        
        function donuzGirdisiFiltrele(pGirdi, pYazar) {
            if (!isThisSearchResults() && isDonuz(pYazar) && Ayarlar.donuzGirdileriniGizle) {
                alalimArkadasi(pGirdi);
                return true;
            } else {
                return false;
            }
        }

        function donuzTusuEkle(pGirdi, pYazar) {
            var tusRow = xpath(".//ul", pGirdi).snapshotItem(0);
            
            if (!tusRow)
                return; //Entry menusu olmayan yerde tusun ne isi var?
            
            var tusCell = newElem("li");
            
            if (xpath(".//a[@title='sil']",pGirdi).snapshotLength) 
                return; //Adamin kendi entrysinde 'donuz' tusunun ne isi var, di mi?

            var donuzTusu = yeniEksiTusu("a");

            donuzTusu.title = "Donuzlara ekle";
            donuzTusu.innerHTML = "donuz?";
            //donuzTusu.style.cssFloat = "right";
            donuzTusu.style.marginLeft = "0.7em";
            //donuzTusu.style.marginTop = "1px";
            donuzTusu.style.paddingLeft = "0.5em";
            donuzTusu.style.paddingRight = "0.3em";

            donuzTusu.addEventListener("click", (function(pYazar) {
                return function() {
                    if (confirm("Belki '" + pYazar + "' iyidir de, cevresi kotudur.\n\nYine de donuzlara eklensin mi?")) 
                        donuzEkle(pYazar);
                }
            })(pYazar),true);

            tusCell.appendChild(donuzTusu);
            tusRow.appendChild(tusCell);
        }
        
        function modTarihcesiFix() {
            if (!Ayarlar.modTarihiPopup) return;
            
            var mtTuslari = xpath(".//a[contains(@title,'moderasyon')]");
            for(var i=0; i<mtTuslari.snapshotLength; i++) {
                var tus = mtTuslari.snapshotItem(i);
                var mtUrl = tus.href;
                tus.href = "javascript:od('"+mtUrl+"',"
                                           +700+","
                                           +400+")";
            }
        }
        
        function girdileriDuzenle() {
            var girdiler = xpath("//ol/li", document);
            //if (debug) EppAPI_log(girdiler.snapshotLength + " Tane Girdi Bulundu");

            for (var i = 0; i < girdiler.snapshotLength; i++) {
                var girdi = girdiler.snapshotItem(i);
                
                if (girdi.id == "nextEntriesBox")
                    continue;
                
                if (girdi.getAttribute("epp_processed") == "true")
                    continue;
                
                var girdiSirasi = girdi.value;
                var yazar = xpath(".//div[@class='aul']/a", girdi).snapshotItem(0).innerHTML; 

                //if (debug) EppAPI_log("Girdi #" + girdiSirasi + " yazari: " + yazar);

                if (!donuzGirdisiFiltrele(girdi, yazar)) {
                    if(girdi.innerHTML.match(/spoiler.*spoiler/)) 
                        spoilerFiltrele(girdi);
                    donuzTusuEkle(girdi, yazar);
                    girdi.setAttribute("epp_processed", "true");
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
                            //if (debug) EppAPI_log("Baslik: " + JSON.stringify(baslikListesi.liste[baslikAdi]));
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
                                //if (debug) EppAPI_log("Baslik2: " + JSON.stringify(baslikListesi.liste[baslikAdi]));
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
                
        function pencereBasligiDuzenle() {
            if (!Ayarlar.sekmeDostuBaslik) return;
                       
            if (debug) EppAPI_log("Sekme basligi: " + topDocument.title);
            if (topDocument.title.indexOf(baslikFull)) { 
                EppAPI_log("Sekme basligi yamuk!");
                topDocument.title = topDocument.title.replace(/^.*(ek.i s.zl.k).*$/, baslikFull + " - $1");
                EppAPI_log("Sekme basligi duzeltildi: " + topDocument.title);
                setTimeout(pencereBasligiDuzenle, 2000);
            } else if ((--baslikKontrol) > 0) {
                if (debug) EppAPI_log("Sekme basligi henuz yamulmamis...");
                setTimeout(pencereBasligiDuzenle, 2000);
            }
        }
        
        function basligiSabitle() {
            if (!Ayarlar.baslikSabitleme) return;
    
            var baslik = xpath("//h1[@class='title']").snapshotItem(0);
            sabitBaslik = baslik;
            var usttenBosluk = parseInt(baslik.offsetTop) + parseInt(baslik.offsetHeight);
            sabitBaslik.id = "epp_sabitBaslik";
            sabitBaslik.style.position = "fixed";
            sabitBaslik.style.zIndex = "98";
            sabitBaslik.style.top = "0";
            sabitBaslik.style.left = "0";
            sabitBaslik.style.margin = "0";
            sabitBaslik.style.paddingTop = "0.5em";
            sabitBaslik.style.paddingRight = "0.5em";
            sabitBaslik.style.paddingBottom = "0.5em";
            //sabitBaslik.style.paddingLeft = "10px";
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
            
            //sayfalandirmayi da sabit basliga ekliyoruz
            var pagis = xpath("//div[@class='pagi']");
            if(pagis.snapshotLength > 0) {
                var rightcol = xpath("//div[@class='rightcol']").snapshotItem(0); //sag panel
                var pagi = pagis.snapshotItem(0);
                var sabitPagi = pagi.cloneNode(true);
                sabitPagi.style.position = "absolute";
                sabitPagi.style.fontWeight = "normal";
                sabitPagi.style.top = "5px";
                sabitPagi.style.right = "0";
                sabitPagi.style.marginBottom = "0";
                sabitPagi.style.marginRight = (parseInt(rightcol.offsetWidth) +45)+"px"; //sag panelden kurtariyoruz
                sabitBaslik.appendChild(sabitPagi);
                pagi.parentNode.parentNode.removeChild(pagi.parentNode); //var olan sayfalandirmayi kaldiriyoruz
            }
        }
        
        function basligiParcala() {
            if (!Ayarlar.baslikParcalama) return;
    
            var baslik = xpath("//h1[@class='title']/a").snapshotItem(0);
            var kelimeler = baslik.innerHTML.split(" ");
            for (var i = 0; i < kelimeler.length; i++) {
                var link = newElem("a");
                link.innerHTML = kelimeler[i] + " ";
                link.href = "show.asp?t="+encodeURIComponent(kelimeler[i]);
                baslik.parentNode.insertBefore(link,baslik);
            }
            baslik.parentNode.removeChild(baslik);
        }
		
        function sagPaneliSabitle() {
          if (!Ayarlar.sagPanelSabitleme) return;
			
          var rightcol = xpath("//div[@class='rightcol']").snapshotItem(0); //sag panel
          rightcol.style.position = "fixed";
        }
        
        function entryOnizleme() {
          if(!Ayarlar.entryOnizleme) return;
          
          var box = idGet("d");
          if(box) {
            box.addEventListener("keyup", function() {
              
              function bkzconvert(str, p1, offset, s)  {
                return "(bkz: <a class=\"b\" href=\"show.asp?t="+encodeURIComponent(p1)+"\">"+p1+"</a>)";
              }
              function gbkzconvert(str, p1, offset, s)  {
                var splitted = p1.split(":");
                if(splitted.length == 1)
                  return "<a class=\"gb\" href=\"show.asp?t="+encodeURIComponent(p1)+"\">"+p1+"</a>";
                if(splitted.length == 2 && splitted[1] != "") 
                  return splitted[0]+"<sup class=\"ab\"><a href=\"show.asp?t="+encodeURIComponent(splitted[1])+"\" title=\"(bkz: "+p1+"\")>*</a></sup>";
                return "`"+p1+"`";
              }
              function araconvert(str, p1, offset, s)  {  
                return "(ara: <a target=\"sozindex\" href=\"index.asp?a=sr&kw="+encodeURIComponent(p1)+"\">"+p1+"</a>)";
              }
              
              var entryText = this.value;
              entryText = entryText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); //tag'lardan kurtarma
              entryText = entryText.replace(/\(bkz: (.{1,50}?)\)/g, bkzconvert); // (bkz: )
              entryText = entryText.replace(/\`(.{1,50}?)\`/g, gbkzconvert); // `gizlibkz`
              entryText = entryText.replace(/\(ara: (.{1,50}?)\)/g, araconvert ); // (ara: )
              entryText = entryText.replace(/\[(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]) (.{1,50}?)\]/ig, "<a class=\"url\" target=\"_blank\" href=\"$1\">$3</a>"); //[url word]
              entryText = entryText.replace(/[^(href="](\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, " <a target=\"_blank\" href=\"$1\">$1</a>"); // url
              entryText = entryText.replace(/^\s+|\s+$/g, ""); //trim
              entryText = entryText.replace(/\n/g,"<br />"); //satir atlama
              entryText = entryText.toLowerCase(); //kucuk harf
               
              var entryler = xpath("//ol[@class='eol']");
              if(entryler.snapshotLength > 0) {
                var entryOl = entryler.snapshotItem(0);
              }
              else {
                var ampul = xpath("//ul/li[@class='ampul']").snapshotItem(0).parentNode;
                var entryOl = document.createElement("ol");
                entryOl.id = "el";
                entryOl.className = "eol";
                ampul.parentNode.insertBefore(entryOl,ampul);
              }
              
              var epp_entryPreview = idGet("epp_entryPreview");
              if(!epp_entryPreview){
                epp_entryPreview = document.createElement("li");
                epp_entryPreview.id = "epp_entryPreview";
                epp_entryPreview.style.marginBottom = "2em";
                var lastEntry = xpath("(.//ol/li[starts-with(@id,'d')])[last()]").snapshotItem(0);
                entryOl.insertBefore(epp_entryPreview, lastEntry.nextSibling);
              } 
              var ampuls = xpath("//ul/li[@class='ampul']");
              var mesela = xpath("//blockquote");
              if(entryText) {
                epp_entryPreview.innerHTML = entryText;
                epp_entryPreview.style.display = "";
                for(var i=0;i<ampuls.snapshotLength;i++) {
                  ampuls.snapshotItem(i).style.display = "none";
                }
                
                if(mesela.snapshotLength > 0) 
                  mesela.snapshotItem(0).style.display = "none";
              }
              else {
                epp_entryPreview.style.display = "none";
                for(var i=0;i<ampuls.snapshotLength;i++) {
                  ampuls.snapshotItem(i).style.display = "";
                }
                
                if(mesela.snapshotLength > 0) 
                  mesela.snapshotItem(0).style.display = "";
              }
            },true);
          }
        }
        
        function konuluEntry() {
            if (window.location.href.match(/show\.asp\?.*&?i=(\d+)&?/)) {
                // Cok heyecanli ile mu gelinmis?
                var cokHeyecanli = window.location.href.match(/show\.asp\?.*&?epp_ch=1&?/);
                // Konulu entry nedir?
                var entryId = window.location.href.match(/show\.asp\?.*&?i=(\d+)&?/)[1];
                var entry = idGet("d"+entryId);
                if (entry) {
                    if (cokHeyecanli || Ayarlar.konuluEntryIsaretle) {
                        var marker = document.createElement("img");
                        marker.src = "http://i.imgur.com/aSbzo.png";
                        marker.style.position = "absolute";
                        marker.style.top = "1.2em";
                        marker.style.left = "-35px";
                        entry.style.position = "relative";
                        entry.insertBefore(marker, entry.firstChild);
                    }
                    if (cokHeyecanli || Ayarlar.konuluEntryHizala) {
                        setTimeout(function(){ 
                            window.scroll(0, findYPos(entry)-50);
                        }, 1000);
                    }
                }
            }
        }
        
        function compareEntryIds(ent1, ent2) {
            // Return values:
            //  1: ent2 is newer
            //  0: equal
            // -1: ent1 is newer
            
            ent1 = parseInt(ent1.replace(/^d/,''));
            ent2 = parseInt(ent2.replace(/^d/,''));
            
            if (ent1 < ent2) {
                return 1;
            } else if (ent1 > ent2) {
                return -1;
            } else {
                return 0;
            }
        }
        
        function sonrakiEntryleriParseEt(responseText) {
            var tempDom = document.createElement("div");
            tempDom.innerHTML = responseText;
            if (!tempDom.getElementsByTagName("ol").length)
                return 0;
            
            var entryler = xpath(".//ol/li", tempDom);
            var gomEntryLi = 0;
            
            sonrakiSonrakiSayfa = sonrakiSayfaUrl;
            try {
                sonrakiSonrakiSayfa = xpath(".//a[@rel='next']", tempDom).snapshotItem(0).href;
                EppAPI_log("Sonraki sonraki sayfa bulundu: " + sonrakiSonrakiSayfa);
            } catch (err) {
                // sonraki sayfa sonmus zaten (gibi)
                EppAPI_log("Sonraki sayfa son sayfaymis!");
            }
            
            entryList = [];
            
            EppAPI_log("Sonraki sayfadaki entry sayisi: " + entryler.snapshotLength);
            EppAPI_log("Son gomulmus Entry IDsi: " + sonEntryId);
            
            tempSonEntryId = sonEntryId;
            for (var i=0; i<entryler.snapshotLength; i++) {
                liItem = entryler.snapshotItem(i);
                //EppAPI_log("compareEntryIds("+sonEntryId+","+liItem.id+") -> " + compareEntryIds(sonEntryId, liItem.id));
                if (liItem.id && (compareEntryIds(sonEntryId, liItem.id) > 0)) {
                    entryList.push(liItem);
                    tempSonEntryId = liItem.id;
                }
            }
            sonEntryId = tempSonEntryId;
            
            EppAPI_log("Gomulecek sonraki entryler sayisi: " + entryList.length);
            EppAPI_log("Yeni gomulecek en son Entry IDsi: " + sonEntryId);

            return entryList;
        }
        
        function sonrakiEntryleriGetir(callback, auto) {
            if (sonrakiSayfaUrl == 0) {
                try {
                    sonrakiSayfaUrl = xpath(".//a[@rel='next']").snapshotItem(0).href;
                } catch (err) {
                    // son sayfada olabiliriz
                    sonrakiSayfaUrl = document.URL; // document.location.href ?
                    sonEntryId = xpath(".//ol/li[last()]").snapshotItem(0).previousSibling.id;
                }
            }
            
            EppAPI_log("Sonraki sayfa su gibi: " + sonrakiSayfaUrl);
            
            var req =  new XMLHttpRequest();
            var result = "";
            req.open("GET", sonrakiSayfaUrl, true);
            req.onreadystatechange = function (e) {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        var nextEntries = sonrakiEntryleriParseEt(req.responseText);
                        callback(nextEntries, auto, false);
                    } else {
                        EppAPI_log("Sonraki entry'ler gelirken bir sey oldu... : " + req.statusText);
                        callback(0, auto, true);
                    }
                }
            };
            
            req.send(null);
        }
        
        function yeniEntryDuzenle(gomEntryLi) {
            var newLi = newElem("li");
            newLi.id = gomEntryLi.id;
            newLi.value = gomEntryLi.value;
            newLiHTML = "";
        
            var entryID = gomEntryLi.id.replace(/\D/g,'');
            var entrySira = gomEntryLi.value;
            if (gomEntryLi.firstChild.nodeName == "input")
                gomEntryLi.removeChild(gomEntryLi.firstChild);
            //gomEntryLi.lastChild.removeChild(gomEntryLi.lastChild.lastChild);
            var scriptler = xpath(".//script", gomEntryLi)
            for (var i=0; i< scriptler.snapshotLength; i++) {
                var script = scriptler.snapshotItem(i);
                script.parentNode.removeChild(script);
            }
            
            var yazarID = xpath("./a",gomEntryLi.lastChild).snapshotItem(0).innerHTML;
            var shareSpan = xpath(".//div[@class='entrymenu']/span[1]",gomEntryLi).snapshotItem(0).innerHTML; //facebook, twitter, ff paylas link'leri
            var entryMenu = xpath(".//div[@class='entrymenu']", gomEntryLi).snapshotItem(0);
            var aulDiv = entryMenu.parentNode;
            aulDiv.style.marginBottom = "2px";
                        
            var eksiTuslari = '<div name="epp_gizliTuslar" class="entrymenu" style="position: relative; visibility: hidden; height: 2em;">' + 
                                '<ul style="float:right;">'+
                                    '<li style="vertical-align:top;"><span id="vst__ENTRY-ID__" class="ei"></span></li>'+
                                    '<li class="ei" style="vertical-align:top;"><a href="javascript:void(0)" onclick="copyid(__ENTRY-ID__,1107);">#__ENTRY-ID__</a></li>'+
                                    '<li><a onmousedown="md(this)" onmouseup="bn(this)" onmouseover="ov(this)" onmouseout="bn(this)" class="but" title="şükela!" onclick="mpr(__ENTRY-ID__,1)" id="">:)</a></li>'+
                                    '<li><a onmousedown="md(this)" onmouseup="bn(this)" onmouseover="ov(this)" onmouseout="bn(this)" class="but" title="öeehh" onclick="mpr(__ENTRY-ID__,0)" id="">:O</a></li>'+
                                    '<li style="margin-right:7px;"><a onmousedown="md(this)" onmouseup="bn(this)" onmouseover="ov(this)" onmouseout="bn(this)" class="but" title="çok kötü" onclick="mpr(__ENTRY-ID__,-1)">:(</a></li>'+
                                    '<li><a onmousedown="md(this)" onmouseup="bn(this)" onmouseover="ov(this)" onmouseout="bn(this)" class="but" title="mesaj at" onclick="od(\'msg.asp?to=__YAZAR-ID__&amp;re=__ENTRY-ID__\')">/msg</a></li>'+
                                    '<li><a onmousedown="md(this)" onmouseup="bn(this)" onmouseover="ov(this)" onmouseout="bn(this)" class="but" href="javascript:od(\'http://antik.eksisozluk.com/info2.asp?n=__YAZAR-ID__\',800,400)" title="yazar hakkında">?</a></li>'+
                                    '<li><a onmousedown="md(this)" onmouseup="bn(this)" onmouseover="ov(this)" onmouseout="bn(this)" class="but" title="ispiyonla" onclick="od(\'gammaz.asp?id=__ENTRY-ID__\',430,160)">:P</a></li>'+
                                    '<li><a onmousedown="md(this)" onmouseup="bn(this)" onmouseover="ov(this)" onmouseout="bn(this)" class="but" title="taşı" onclick="ci(__ENTRY-ID__)">&gt;</a></li>'+
                                    '<li><a onmousedown="md(this)" onmouseup="bn(this)" onmouseover="ov(this)" onmouseout="bn(this)" class="but" href="javascript:od(\'http://antik.eksisozluk.com/showmodhistory.asp?id=__ENTRY-ID__\',700,400)" title="moderasyon tarihçesi">!</a></li>'+
                                '</ul>'+
                                '<span style="margin-right:10px;">__SHARE-LINKS__</span></td>'+
                              '</div>';
            eksiTuslari = eksiTuslari.replace(/__ENTRY-ID__/g, entryID);
            eksiTuslari = eksiTuslari.replace(/__YAZAR-ID__/g, yazarID);
            eksiTuslari = eksiTuslari.replace(/__SHARE-LINKS__/g, shareSpan);
            //result += "<ol style='white-space: normal;'><li value='"+entrySira+"' style='margin-left:0;'>";
            
            aulDiv.removeChild(entryMenu);
            aulDiv.innerHTML += eksiTuslari;
            
            newLiHTML += gomEntryLi.innerHTML;
            
            newLi.innerHTML = newLiHTML;
            newLi.style.marginBottom = "10px";
            newLi.addEventListener("mouseover", function(){
                this.getElementsByTagName('ul')[0].style.visibility = 'visible';
                var shareLinks = xpath(".//span/a",this);
                for (var i=0; i< shareLinks.snapshotLength; i++) {
                    shareLinks.snapshotItem(i).style.visibility = 'visible';                
                }
            });
            newLi.addEventListener("mouseout", function(){
                this.getElementsByTagName('ul')[0].style.visibility = 'hidden';
                var shareLinks = xpath(".//span/a",this);
                for (var i=0; i< shareLinks.snapshotLength; i++) {
                    shareLinks.snapshotItem(i).style.visibility = 'hidden';                
                }
            });
            
            //donuzTusuEkle(newLi, yazarID);
            
            return newLi;
        }
        
        function yeniEntryleriGom(yeniEntryler) {
            var entryOrdList = idGet("el");
            var nextEntriesBox = idGet("nextEntriesBox");
            var entryPreview = idGet("epp_entryPreview");
            
            if (Ayarlar.bitmeyenEntryAyiraci) {
                var seperator = newElem("div");
                var nextPageNum = sonrakiSayfaUrl.match(/&p=(\d+)/)[1];
                seperator.style.height = "1em";
                seperator.style.width = "60%";
                seperator.style.margin = "30px auto";
                seperator.innerHTML = "<div style='display:inline-block;vertical-align:middle; width:43%; border:1px solid #444; border-bottom-color:#EEE; border-right-color:#EEE;'></div>"+
                                      "<div style='display:inline-block; width:5%; text-align:center; text-shadow:0 1px 0 #EEE'>"+nextPageNum+"</div>"+
                                      "<div style='display:inline-block;vertical-align:middle; width:43%; border:1px solid #444; border-bottom-color:#EEE; border-right-color:#EEE;'></div>";
                entryOrdList.appendChild(seperator);
            }
            
            var pagis = xpath(".//select[@class='pagis']");
            for (var i=0; i<pagis.snapshotLength; i++) {
                var pagi = pagis.snapshotItem(i);
                pagi.selectedIndex = (pagi.selectedIndex < pagi.options.length) ? pagi.selectedIndex+1 : pagi.selectedIndex;
            }
            
            
            // Sonraki sonraki sayfayi sonraki sayfa olarak kaydedelim artik...
            sonrakiSayfaUrl = sonrakiSonrakiSayfa;
            
            if (entryPreview) // entry onizleme bolumu varsa onu da alta alalim
                entryOrdList.removeChild(entryPreview); 
            entryOrdList.removeChild(nextEntriesBox);
            for (var i=0; i<yeniEntryler.length; i++) {
                liItem = yeniEntryler[i];
                entryOrdList.appendChild(yeniEntryDuzenle(liItem));
            }
            
            if (entryPreview) // entry onizleme bolumu varsa tekrar ekleyelim
                entryOrdList.appendChild(entryPreview);
            entryOrdList.appendChild(nextEntriesBox); 
        }
        
        function bitmeyenEntrylerIsle(nextEntries, auto, error) {
            if (!nextEntries || !nextEntries.length) {
                if (error) {
                    dahada.innerHTML = "bir sorun oldu... tekrar?";
                } else {                
                    if (scrollChecker) 
                        clearInterval(scrollChecker); //Yeni entry yoksa surekli uyari anlamsiz
                    dahada.innerHTML = "daha yok gibi... tekrar?";
                }
            } else { 
                yeniEntryleriGom(nextEntries);
                girdileriDuzenle(); //donuz ve spoiler filtresi
                gomulebilirEntryleriDuzenle(); //entry gomucu
                gomulebilirLinkDuzenle(); //link gomucu
                dahada.innerHTML = "daha da...";
            }
            bitmeyenEntrylerLock = 0;
        }
        
        function bitmeyenEntrylerBasla(dahada, auto) {
            if (bitmeyenEntrylerLock) { 
                if (debug) EppAPI_log("Simdi mesgul sonra deneyelim...");
                return; //halihazirda islenen bir request var
            }
            bitmeyenEntrylerLock = 1;
            dahada.innerHTML = "geliyor <img src='http://i.imgur.com/oInr7.gif' style='margin-left:5px;' />";
            sonrakiEntryleriGetir(bitmeyenEntrylerIsle, auto);
        }
        
        function bitmeyenEntryler() {
            if (!Ayarlar.bitmeyenEntryler)
                return;
            
            if (window.location.href.match(/show\.asp\?id=\d+/))
                return; //direkt entry sayfasi bu, neyin dahasi?
            
            var moreBox = newElem("li");
            moreBox.id = "nextEntriesBox";
            var bold = newElem("b");
            dahada = newElem("a");
            bold.style.textAlign = "center";
            bold.style.display = "inline-block";
            bold.style.width = "100%";
            dahada.className = "gb";
            dahada.href = "javascript:void(0)";
            dahada.innerHTML = "daha da...";
            dahada.title = "sonraki entry'leri getir (varsa tabi)";
            dahada.addEventListener("click", function(){
                bitmeyenEntrylerBasla(dahada, false);
            });
            if (Ayarlar.bitmeyenEntrylerAuto) {
                scrollChecker = setInterval(function(){
                    var scrollH = window.scrollY;
                    var viewH = window.innerHeight;
                    var scrolledTo = scrollH + viewH;
                    var dahadaBoxY = findYPos(dahada);
                    if (scrolledTo > dahadaBoxY) {
                        if (debug) EppAPI_log("Sayfa sonuna gelinmis > ScrollH:"+scrollH+" ViewH:"+viewH+" BoxY:"+dahadaBoxY);
                        bitmeyenEntrylerBasla(dahada, true);
                    }
                }, (250));
            }
            
            
            bold.appendChild(dahada)
            moreBox.appendChild(bold);
            moreBox.style.border = "1px solid";
            moreBox.style.borderRadius = "3px";
            
            idGet("el").appendChild(moreBox);
        }
        
        function nickBasligiKontrolu() {
            if (!Ayarlar.nickBasligiKontrolu) 
                return;
            
            var baslik = xpath("//h1[@class='title']").snapshotItem(0);
            var baslikText = xpath(".//a",baslik).snapshotItem(0).innerHTML;
            if (baslikText.match(/[^A-Za-z0-9 ]/g))
                return; //nick'te olmamasi gereken karakter(ler) var, aramak gereksiz.
            var kimdirNedirUrl = "http://antik.eksisozluk.com/info2.asp?n="+encodeURIComponent(baslikText);
           
            var req =  new XMLHttpRequest();
            var result = "";
            req.open("GET", kimdirNedirUrl, false);
            req.send(null);
            var tempDom = document.createElement("div");
            tempDom.innerHTML = req.responseText;
            var yazarYok = xpath(".//li[@class='ampul']",tempDom).snapshotItem(0); //boyle bir yazar yok
            var entryYok = (xpath(".//div[@id='inf_le']/table/tbody/tr/td[2]/a",tempDom).snapshotLength == 0);
            if (entryYok) EppAPI_log("Yazar var ama entry yok, neyleyem ben boyle yazari?!");
            var girisYapmamis = xpath(".//form[@class='loginbox']",tempDom).snapshotItem(0); //giris yapmadigi icin sonuc alamadik
            if (girisYapmamis || entryYok || (yazarYok && yazarYok.innerHTML.match(/yazar kayd. mevcut de.il/)))
                return;
            var kimdirNedirPopupHref = kimdirNedirUrl;
            if (Ayarlar.kimdirNedirPopup) 
                kimdirNedirPopupHref = "javascript:od('"+kimdirNedirUrl+"',800,400)";
            baslik.innerHTML += '<a style="padding-left:4px;" href="'+kimdirNedirPopupHref+'"><img src="http://i.imgur.com/qQZcW.png"></a>';
        }
        
        function ucanKontrolPaneli() {
            ucanKontrolPaneliDiv = 0;
            
            ucanKontrolPaneliDiv = newElem("div");
            var innerDiv = document.createElement("div");

            ucanKontrolPaneliDiv.style.zIndex = "99";
            ucanKontrolPaneliDiv.style.width = "50%";
            ucanKontrolPaneliDiv.style.padding = "6px";
            ucanKontrolPaneliDiv.style.margin = "auto";
            ucanKontrolPaneliDiv.style.backgroundColor = "rgb(0,0,0)"; //fallback
            ucanKontrolPaneliDiv.style.backgroundColor = "rgba(0,0,0,.5)";
            ucanKontrolPaneliDiv.style.position = "fixed";
            ucanKontrolPaneliDiv.style.top = "40%";
            ucanKontrolPaneliDiv.style.left = "25%";
            ucanKontrolPaneliDiv.style.display = "none";
            ucanKontrolPaneliDiv.style.boxShadow = "0px 15px 30px 10px rgba(0, 0, 0, 0.15)";
            ucanKontrolPaneliDiv.style.borderRadius = "4px";
            
            innerDiv.id = "epp_ucanKontrolPaneliContent";
            innerDiv.position = "relative";
            innerDiv.style.padding = "1em";
            innerDiv.style.minWidth = "35em";
            innerDiv.style.backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color");
            innerDiv.style.backgroundImage = window.getComputedStyle(document.body, null).getPropertyValue("background-image");
            innerDiv.style.border = "1px solid rgb(255,255,255)"; //fallback
            innerDiv.style.border = "1px solid rgba(255,255,255,0.5)";
            innerDiv.style.borderRadius = "2px";
            innerDiv.style.textAlign = "center";
                        
            ucanKontrolPaneliDiv.appendChild(innerDiv);
            
            document.body.appendChild(ucanKontrolPaneliDiv);

            document.addEventListener("keydown", function(e){
                if (e.ctrlKey && e.shiftKey) {
                    if (ucanKontrolPaneliVisible) {
                        ucanKontrolPaneliVisible = 0;
                        ucanKontrolPaneliDiv.style.display = "none";
                    } else {
                        ucanKontrolPaneliVisible = 1;
                        ucanKontrolPaneliDiv.style.display = "block";
                    }
                }
            }, true);
            document.addEventListener("click", function(e){
                ucanKontrolPaneliVisible = 0;
                ucanKontrolPaneliDiv.style.display = "none";
            });
        }
        
        function arayuzElemanlariniEkle() {
            var ucanKontrolPaneliContent = idGet("epp_ucanKontrolPaneliContent");
        
            var ayarTusu = yeniEksiTusu("input");
            ayarTusu.type = "button";
            ayarTusu.className = "but";
            ayarTusu.value = "eksi++ ayarlari";
            ayarTusu.addEventListener("click", ayarMenusunuGoster, true);
            ayarTusu.style.width = "95%";
            ayarTusu.style.marginBottom = "20px";
            
            var donBebegimBox = xpath(".//*[@id='panel']/tbody").snapshotItem(0);
            if (!donBebegimBox) {
                // Giris yapmamis olabilir, halktan biri galiba bu
                donBebegimBox = xpath(".//div[@class='rightcol']").snapshotItem(0);
                var ayarCell = document.createElement("div");
                ayarCell.appendChild(document.createElement("br"));
                ayarCell.appendChild(ayarTusu);
                ayarCell.appendChild(document.createElement("br"))
                ayarCell.style.width = "100%";
                donBebegimBox.insertBefore(ayarCell,donBebegimBox.firstChild);
            } else {
                // Giris yapmis, bildigin kullanici
                var ayarCell = document.createElement("td");
                ayarCell.appendChild(document.createElement("br"));
                ayarCell.appendChild(ayarTusu);
                ayarCell.appendChild(document.createElement("br"))
                var ayarRow = document.createElement("tr");
                ayarRow.appendChild(ayarCell);
                donBebegimBox.insertBefore(ayarRow, donBebegimBox.firstChild);
            }
                                    
            var baslikAltiBar = newElem("div");
            baslikAltiBar.id = "epp_baslikAltiBar";
            baslikAltiBar.style.marginRight = "120px"; //Sagdaki eksi tuslarina girmeyelim
            baslikAltiBar.style.width = "100%";
            //baslikAltiBar.style.cssFloat = "left";
            var baslik = xpath("//h1[@class='title']").snapshotItem(0);
            baslik.parentNode.insertBefore(baslikAltiBar, baslik.nextSibling);
                       
            // Tez Getir
            if (Ayarlar.tezgetirGoster) {
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
                ucanKontrolPaneliContent.appendChild(spoilerlariAcTusu);
            }
            
            //En bastan goster tusu
            var tumunuGoster = 0; 
            var buttons = xpath("/html/body/div[@id='topic']/div/button");
            for (var i=0; i < buttons.snapshotLength; i++) {
                var cur = buttons.snapshotItem(i);
                if (cur.innerHTML.match(/t.m.n. g.ster/)) {
                    tumunuGoster = cur;
                    break;
                }                
            }
            if (tumunuGoster) {
                ucanKontrolPaneliContent.appendChild(tumunuGoster.cloneNode(true));
                var bastanGoster = yeniEksiTusu("input");
                bastanGoster.value = "en bastan goster";
                bastanGoster.setAttribute("onclick", tumunuGoster.getAttribute("onclick").replace(/&.+(['"])$/,'$1'));
                bastanGoster.style.marginLeft = "1em";
                tumunuGoster.parentNode.insertBefore(bastanGoster, tumunuGoster.nextSibling);
                ucanKontrolPaneliContent.appendChild(bastanGoster.cloneNode(true));
            }
            
            //Entry girme kisayol tusu
            var entryBox = xpath(".//form[@id='ssg']/textarea").snapshotItem(0);
            if (entryBox) {
                var entryGir = yeniEksiTusu("input");
                entryGir.value = "entry gir";
                entryGir.addEventListener("click", function() {
                    clearInterval(scrollChecker);
                    entryBox.focus();
                });
                entryGir.style.marginLeft = "1em";
                ucanKontrolPaneliContent.appendChild(entryGir);
            }
                       
            //Frame ekleme tusu
            if (window.top == window.self && Ayarlar.iframeGoster) {
                var sirinleTusu = yeniEksiTusu("input");
                sirinleTusu.value = "iFrame";
                sirinleTusu.style.marginLeft = "0.5em";
                sirinleTusu.addEventListener("click", frameSirinle, true);
                baslikAltiBar.appendChild(sirinleTusu);
            }
            
            //Guzelinden olsun tusu
            var guzelinden = yeniEksiTusu("input");
            guzelinden.value = "guzelinden olsun";
            guzelinden.addEventListener("click", function() {
                window.location = "http://antik.eksisozluk.com/show.asp?t="+encodeURIComponent(baslikFull)+"&a=sr&g=1";
            });
            guzelinden.style.marginLeft = "1em";
            ucanKontrolPaneliContent.appendChild(guzelinden);
            
            //Fokurdayanlar tusu
            var fokurdayanlar = yeniEksiTusu("input");
            fokurdayanlar.value = "fokurdayanlar";
            fokurdayanlar.addEventListener("click", function() {
                window.location = "http://antik.eksisozluk.com/show.asp?t="+encodeURIComponent(baslikFull)+"&a=he";
            });
            fokurdayanlar.style.marginLeft = "1em";
            ucanKontrolPaneliContent.appendChild(fokurdayanlar);
        }
        
        function sagFrameEksiStatsDoldur(jsonData) {
            if (!jsonData)
                return;
            console.log(jsonData);    
            var tempHTML = ''+
            '<h1 class="title" ><a href="/show.asp?t='+encodeURIComponent(jsonData.title)+'" >'+jsonData.title+'</a></h1>'+
            '<br />'+
            '<blockquote style="margin-top:0" >'+jsonData.info+
            '<table style="margin-top:20px;width:100%" >'+
            '<tbody>';
            if (jsonData.statstype == 0) { // http://antik.eksisozluk.com/stats.asp?id=2-1 tarzi gosterim
                for (var i = 0; i < jsonData.entrylist.length; i++) {
                    tempHTML += ''+
                    '<tr>'+
                        '<td>'+(i+1)+'.</td>'+
                        '<td style="white-space:nowrap" >'+
                            '<a href="show.asp?id='+jsonData.entrylist[i].entryid+'" >'+jsonData.entrylist[i].baslik+'/#'+jsonData.entrylist[i].entryid+'</a>'+
                        '</td>'+
                        '<td style="white-space:nowrap" >'+
                            '<a href="show.asp?t='+encodeURIComponent(jsonData.entrylist[i].nick)+'" >'+jsonData.entrylist[i].nick+'</a>'+
                        '</td>'+
                    '</tr>';
                }
            } else if (jsonData.statstype == 1) {  // http://antik.eksisozluk.com/stats.asp?id=2-6 tarzi gosterim
                for (var i = 0; i < jsonData.basliklist.length; i++) {
                    tempHTML += ''+
                    '<tr>'+
                        '<td>'+(i+1)+'.</td>'+
                        '<td style="white-space:nowrap" >'+
                            '<a href="show.asp?t='+encodeURIComponent(jsonData.basliklist[i].baslik)+'" >'+jsonData.basliklist[i].baslik+'</a>'+
                        '</td>'+
                        '<td style="width:100%" >'+
                            '<div class="highlight statbar" style="width:'+jsonData.basliklist[i].oran+'%">%'+jsonData.basliklist[i].oran+'</div>'+
                        '</td>'+
                    '</tr>';
                }
            }
            tempHTML += ''+
            '</tbody></table>'+
            '<p style="text-align:center">'+jsonData.footer+'</p>'+
            '</blockquote>';
            
            document.body.innerHTML = tempHTML;
            gomulebilirEntryleriDuzenle();
        }
        
        function sagFrameEksiStatsBasla() {
            if (!window.location.href.match(/\/stats\.asp\?id=eksistats-(\d+)$/))
                return;
            
            var pageID = window.location.href.match(/\/stats\.asp\?id=eksistats-(\d+)$/)[1];
            //document.body.innerHTML = "<div align='center'>Eksistats verileri yukleniyor<p> <img src='http://i.imgur.com/oInr7.gif' /></p></div>";
            EppAPI_JSONRequest({
                url: "http://www.eksistats.com/api.php?id="+pageID,
                method: "GET",
                data: "",
                onload: function(json) {
                    try {
                        sagFrameEksiStatsDoldur(json);
                    } catch(e) {
                        
                    }
                },
            });
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
            
            //Sayfa basligi cok lazim oluyor, bir kere bulup kaydedelim...
            var baslik_as = xpath(".//div[@id='topic']/h1[@class='title']/a");
            baslikFull = "";
            for (var i=0; i<baslik_as.snapshotLength; i++) {
                var baslik_a = baslik_as.snapshotItem(i);
                if (baslik_a.textContent && baslik_a.textContent != "*") {
                    baslikFull += baslik_a.textContent;
                }
            }
            EppAPI_log("Baslik su gibi: '" + baslikFull + "'");
            
            try { ucanKontrolPaneli(); } catch (err) { EppAPI_log("HATA: 'ucanKontrolPaneli()' patladi! >> " + err); }
            try { konuluEntry(); } catch (err) { EppAPI_log("HATA: 'konuluEntry()' patladi! >> " + err); }
            try { pencereBasligiDuzenle(); } catch (err) { EppAPI_log("HATA: 'pencereBasligiDuzenle()' patladi! >> " + err); }
            try { girdileriDuzenle(); } catch (err) { EppAPI_log("HATA: 'girdileriDuzenle()' patladi! >> " + err); }
            try { arayuzElemanlariniEkle(); } catch (err) { EppAPI_log("HATA: 'arayuzElemanlariniEkle()' patladi!: " + err); }
            try { nickBasligiKontrolu(); } catch (err) { EppAPI_log("HATA: 'nickBasligiKontrolu()' patladi! >> " + err); }
            try { basligiSabitle(); } catch (err) { EppAPI_log("HATA: 'basligiSabitle()' patladi! >> " + err); }
            try { basligiParcala(); } catch (err) { EppAPI_log("HATA: 'basligiParcala()' patladi! >> " + err); }
            try { sagPaneliSabitle(); } catch (err) { EppAPI_log("HATA: 'sagPaneliSabitle()' patladi! >> " + err); }
            try { entryOnizleme(); } catch (err) { EppAPI_log("HATA: 'entryOnizle()' patladi! >> " + err); }
            try { entryKutusunuGelistir(); } catch (err) { EppAPI_log("HATA: 'entryKutusunuGelistir()' patladi! >> " + err); }
            try { modTarihcesiFix(); } catch (err) { EppAPI_log("HATA: 'modTarihcesiFix()' patladi! >> " + err); }
            try { bitmeyenEntryler(); } catch (err) { EppAPI_log("HATA: 'bitmeyenEntryler()' patladi! >> " + err); }
            try { sagFrameEksiStatsBasla(); } catch (err) { EppAPI_log("HATA: 'sagFrameEksiStatsBasla()' patladi! >> " + err); }
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
            try { paneliKaldir(); } catch (err) { EppAPI_log("HATA: 'paneliKaldir()' patladi! >> " + err); }
        }    
    }
    
    
    //// EKSIFAVORI EGINE
    function EksiFavoriEngine() {

        var elementPrefix = "eksifavori_";
        var patt_Favori_Page = /\/index\.asp\?a=sr&so=y&kw=\*$/;
        var link_Favori_Page = "index.asp?a=sr&so=y&kw=*";
        
        /* eksi sozluk top.js functions */
        function EksiFavori_ods(n, s, f) {
            var tempods = ' <select name="' + n + '"><option></option>';
            for (var n = 1; n <= 31; n++) tempods += "<option " + (n == f ? "selected='selected'" : "") + ">" + n + "</option>";
            if (s) for (n = 2; n <= 12; n++) tempods += "<option value=" + (n * 30) + ">" + n + " ay</option>";
            tempods += '</select>';
            return tempods;
        }

        function EksiFavori_oms(n, f) {
            var mo = new Array("ocak", "subat", "mart", "nisan", "mayıs", "haziran", "temmuz", "agustos", "eylul", "ekim", "kasim", "aralik");
            var tempoms =' <select name="' + n + '"><option></option>';
            for (var n = 1; n <= 12; n++) tempoms +="<option " + (n == f ? "selected='selected'" : "") + " value='" + n + "'>" + mo[n - 1] + "</option>";
            tempoms +='</select>';
            return tempoms;
        }

        function EksiFavori_oys(n, f) { 
            var tempoys = ' <select name="' + n + '"><option></option>';
            with (new Date()) for (var n = getFullYear(); n >= 1999; n--) tempoys += "<option " + (n == f ? "selected='selected'" : "") + ">" + n + "</option>";
            tempoys += '</select>';
            return tempoys;
        }	
         
        /* Specical Functions For EksiFavori */
        
        function isInFavouriteList(eid) {
            //control by entry if entry exist in database 
            tumAyarlariYukle();
            for (var i = 0; i < Ayarlar.favoriEntryListesi.length; i++) {
                if (Ayarlar.favoriEntryListesi[i].entryid == eid) {
                    //EksiFavori_log("Evet var, entryid: "+eid);
                    return true;
                }
            }
            //EksiFavori_log("Hayir yok, entryid: "+eid);
            return false;
        }
        
        function showMessage(elem,message) {
            if (!elem) 
                return;
            elem.innerHTML = message;
            var t = setTimeout(function() { elem.innerHTML =""},4000,elem);
        }
        
        function addToFavourites(etitle,eid) {
            //insert entry into database
            var resultel = idGet('vst'+eid);
            tumAyarlariYukle();
            for (var i = 0; i < Ayarlar.favoriEntryListesi.length; i++) {
                if (Ayarlar.favoriEntryListesi[i].entryid == eid) {
                    //EksiFavori_log("Zaten var, {baslik: "+etitle+", entryid: "+eid+"}");
                    return false;
                }
            }
            Ayarlar.favoriEntryListesi.push({title: etitle, entryid: eid});
            showMessage(resultel,"favorilere eklendi!");
            //EksiFavori_log("Ekleme islemi basarili, {baslik: "+etitle+", entryid: "+eid+"}");
            tumAyarlariKaydet();
            return true;
        }
          
        function removeFromFavourites(eid) {
            //remove entry from database
            var resultel = idGet('vst'+eid);
            tumAyarlariYukle();
            var tempentryList = new Array();
            var j = 0;
            for (var i = 0; i < Ayarlar.favoriEntryListesi.length; i++) {
                if (Ayarlar.favoriEntryListesi[i].entryid != eid) {
                    tempentryList[j++] = Ayarlar.favoriEntryListesi[i];
                }
            }
            Ayarlar.favoriEntryListesi = tempentryList;
            tumAyarlariKaydet();
            showMessage(resultel,"favorilerden cikarildi!");
            //EksiFavori_log("Silme islemi basarili, entryid: "+eid);
        }
        
        function removeAllFromFavourites() {
            tumAyarlariYukle();
            var tempentryList = new Array();
            Ayarlar.favoriEntryListesi = tempentryList;
            tumAyarlariKaydet();
        }
        
        /* Editing Entries for EksiFavori Buttons */
        function FavoriEditor() {
            var pageTitle = getPageTitle();
            
            function getPageTitle() {
                return xpath("//h1[@class='title']/a").snapshotItem(0).innerHTML;
            }
            
            function getEntryId(entry) {
                var entry_id = xpath(".//div[@class='entrymenu']",entry).snapshotItem(0).id;
                return entry_id.replace(/m/g,"");
            }
            
            function addFavouriteButton(entry, isFavour) {
                var entry_id = getEntryId(entry);
                var hidden_ul = xpath(".//div[@class='entrymenu']/ul",entry).snapshotItem(0);
                var containerLi = newElem("li");
                var favoributton = yeniEksiTusu("a",elementPrefix+entry_id);
                if (isFavour) {
                    favoributton.title = "Favorilere Ekle";
                    favoributton.innerHTML = "+";                  
                } else {
                    favoributton.title = "Favorilerden Cikar";
                    favoributton.innerHTML = "-";
                }

                favoributton.addEventListener("click", (function(etitle,eid) { return function() {
                    if (this.innerHTML == "-") {
                        removeFromFavourites(eid);
                        this.innerHTML = "+";
                        this.title = "Favorilere Ekle";
                    } else { 
                        addToFavourites(etitle,eid);
                        this.innerHTML = "-";
                        this.title = "Favorilerden Cikar";
                    }
                }})(pageTitle,entry_id),true);
                
                containerLi.appendChild(favoributton);
                hidden_ul.appendChild(containerLi);
            }
            
            function editEntryMenus() {
                var entryList = xpath("//ol[@class='eol']/li");
                for (var i = 0; i < entryList.snapshotLength; i++) {
                    var entry = entryList.snapshotItem(i);
                    if (isInFavouriteList(getEntryId(entry))) {
                        addFavouriteButton(entry,false);
                    } else {
                        addFavouriteButton(entry,true);
                    }
                } 
            }
            
            this.basla = function() {
                editEntryMenus();
            }
        }
        
        
        /* List Favourite Entries */
        function FavoriList() {
            var maxEntry = 50;
            var bodyel = xpath("//body").snapshotItem(0);
            var EksiFavoriListDiv = newElem('div');
            var EksiFavoriFooter = newElem('div');
            EksiFavoriFooter.setAttribute("align","center");
            var statusDiv = newElem("div");
            EksiFavoriFooter.appendChild(statusDiv);
            
            function clearPage() {
                /* clearing innerHTML and setting class for body */
                var hayvanarahtml = ''+
                '<div id="a" class="adiv" style="top:44px"><form action="index.asp" id="sr" method="get">'+
                '<table border="0" cellpadding="0" cellspacing="0" style="width:200px">'+
                '<tr><td class="aup">&nbsp;</td>'+
                '<td id="amain" rowspan="3" class="amain">'+
                '<input type="hidden" name="a" value="sr" />'+
                '<table class="msg" border="0" cellpadding="0" cellspacing="0">'+
                '<tr><td>şey</td><td><input type="text" id="kw" name="kw" size="19" maxlength="100" value=""/></td></tr>'+
                '<tr><td>yazarı</td><td><input type="text" name="au" size="19" maxlength="50" value="" /></td></tr>'+
                '</table>'+
                '<fieldset><legend>sıra şekli</legend>'+
                '<table class="msg"><tr>'+
                '<td style="white-space:nowrap"><input id="ra" type="radio" class="radio" name="so" value="a"  onclick="sch(\'a\')" />'+
                '<label accesskey="a" for="ra"><span style="text-decoration:underline">a</span>lfa-beta</label></td>'+
                '<td style="white-space:nowrap"><input id="rr" type="radio" class="radio" name="so" value="r"  onclick="sch(\'r\')" />'+
                '<label accesskey="r" for="rr"><span style="text-decoration:underline">r</span>';
                for (var n = 1;n < 7;n++) 
                    hayvanarahtml += String.fromCharCode(Math.round(Math.random()*25)+97);
                hayvanarahtml += ''+
                '</label></td></tr>'+
                '<tr>'+
                '<td style="white-space:nowrap"><input id="ry" type="radio" class="radio" name="so" value="y" checked=\'checked\' onclick="sch(\'y\')" />'+
                '<label accesskey="y" for="ry"><span style="text-decoration:underline">y</span>eni-eski</label></td>'+
                '<td style="white-space:nowrap"><input id="rg" type="radio" class="radio" name="so" value="g"  onclick="sch(\'g\')" />'+
                '<label accesskey="u" for="rg">g<span style="text-decoration:underline">u</span>dik</label></td>'+
                '</tr></table>'+
                '</fieldset>'+
                '<fieldset style="white-space:nowrap;text-align:center"><legend>şu gün</legend>'+
                EksiFavori_ods('fd',0,0) + EksiFavori_oms('fm',0) + EksiFavori_oys('fy',0)+
                '</fieldset>'+
                '<fieldset><legend>tercihler</legend>'+
                '<input id="cr" accesskey="g" type="checkbox" class="checkbox" name="cr" value="y" /> '+
                '<label for="cr"><span style="text-decoration:underline">g</span>üzelinden olsun</label>'+
                '</fieldset><br />'+
                '<div style="text-align:center">'+
                '<input type="submit" class="but" value="hayvanlar gibi ara" /></div>'+
                '</td></tr>'+
                '<tr><td class="amid" onmouseup="pp()">h<br />a<br />y<br />v<br />a<br />n<br /><br />a<br />r<br />a</td></tr>'+
                '<tr><td class="abot">&nbsp;</td></tr>'+
                '</table></form></div>';
                
                bodyel.innerHTML = hayvanarahtml;
                var osrscript = newElem("script");
                osrscript.innerHTML += "osr();";
                document.getElementsByTagName('head')[0].appendChild(osrscript);
                bodyel.className = "bgleft";
                
                bodyel.appendChild(EksiFavoriListDiv);
                bodyel.appendChild(EksiFavoriFooter);
            }
            
            function createPager(p,maxp) {
                var divPagi = newElem("div");
                divPagi.className= "pagi";
                if (Ayarlar.favoriEntryListesi.length > 0) {
                    var hepsiniokubut = newElem("a");
                    hepsiniokubut.style.padding = "3px";
                    hepsiniokubut.style.margin = "5px";
                    hepsiniokubut.style.cursor = "pointer";
                    hepsiniokubut.innerHTML = "hepsini okumak istiyorum >>";
                    hepsiniokubut.setAttribute("onclick","top.sozmain.location.href='show.asp?t=__eksifavori_listesi__'");
                    divPagi.appendChild(hepsiniokubut);
                    divPagi.appendChild(newElem("br"));
                    divPagi.appendChild(newElem("br"));
                }
                divPagi.innerHTML += 'favori entry\'lerim.. ('+Ayarlar.favoriEntryListesi.length+' entry)<br />';
                  
                if (maxp > 1) {
                    var spanPagi = newElem("span");
                    
                    if (p > 1) {
                        var preva = newElem("a");
                        preva.id = elementPrefix + "prev";
                        preva.className = "link";
                        preva.innerHTML = "&lt;&lt; ";
                        preva.title = "onceki sayfa";
                        spanPagi.appendChild(preva);
                    }
                      
                    spanPagi.innerHTML +="sayfa";
                    var tempsel = newElem("select");
                    tempsel.id = elementPrefix+"pager";
                    tempsel.className = "pagis";
                    for (var i = 0; i < maxp; i++) {
                        if ((i+1) == p) 
                            tempsel.options[i] = new Option((i+1),(i+1),true,true);
                        else 
                            tempsel.options[i] = new Option((i+1),(i+1));
                    } 			
                    spanPagi.appendChild(tempsel);				
                    spanPagi.innerHTML +=" / ";
                    
                    var thispage = newElem("a");
                    thispage.id = elementPrefix + "thispage";
                    thispage.className = "link";
                    thispage.style.fontSize = "x-small";
                    thispage.innerHTML = maxp;
                    thispage.title = maxp;
                    spanPagi.appendChild(thispage);
                    
                    if (p < maxp) {
                        var nexta = newElem("a");
                        nexta.id = elementPrefix + "next";
                        nexta.className = "link";
                        nexta.innerHTML = " &gt;&gt;";
                        nexta.title = "sonraki sayfa";
                        spanPagi.appendChild(nexta);					
                    }
                    
                    divPagi.appendChild(spanPagi);
                    EksiFavoriListDiv.appendChild(divPagi);
                    
                    var EksiFavoriPager = idGet(elementPrefix+"pager");
                    if (EksiFavoriPager) {
                        EksiFavoriPager.addEventListener("change", function(){ 
                            fillPageByEntrylist((this.selectedIndex+1));
                            //EksiFavori_log("Sayfa degisim istegi: p="+(this.selectedIndex+1));
                        }, true); 
                    }
                    
                    var EksiFavoriPager_prev = idGet(elementPrefix+"prev");
                    if (EksiFavoriPager_prev) {
                        EksiFavoriPager_prev.addEventListener("click", function(){ 
                            fillPageByEntrylist((EksiFavoriPager.selectedIndex));
                            //EksiFavori_log("Sayfa degisim istegi: p="+(EksiFavoriPager.selectedIndex));
                        }, true); 
                    }

                    var EksiFavoriPager_next = idGet(elementPrefix+"next");
                    if (EksiFavoriPager_next) {
                        EksiFavoriPager_next.addEventListener("click", function(){ 
                            fillPageByEntrylist((EksiFavoriPager.selectedIndex+2));
                            //EksiFavori_log("Sayfa degisim istegi: p="+(EksiFavoriPager.selectedIndex+2));
                        }, true); 
                    }
                    
                    var EksiFavoriPager_thispage = idGet(elementPrefix+"thispage");
                    if (EksiFavoriPager_thispage) {
                        EksiFavoriPager_thispage.addEventListener("click", function(){ 
                            fillPageByEntrylist(this.title);
                            //EksiFavori_log("Sayfa degisim istegi: p="+this.title);
                        }, true); 
                    }
                            
                } else {
                    EksiFavoriListDiv.appendChild(divPagi);
                }
            }

            function createEntryList(p) {
                EksiFavoriListDiv.appendChild(newElem("br"));
                var ultemp = newElem("ul");
                ultemp.className = "index";
                
                var maxp = Math.ceil(Ayarlar.favoriEntryListesi.length/maxEntry);
                if (p <= 0) {
                    p = 1;
                } else if(p > maxp) 
                    p = maxp;
                    
                var maxlimit = (Ayarlar.favoriEntryListesi.length-1)-((p-1)*maxEntry);
                var limiter = maxEntry;
                for (var i = maxlimit; i >= 0; i--) {
                    if (limiter > 0) {
                        if (Ayarlar.favoriEntryListesi[i]) {
                            var tempLi = newElem("li");
                            var tempLink = newElem("a");
                            tempLink.target = "sozmain";
                            tempLink.href = "show.asp?t=%23"+Ayarlar.favoriEntryListesi[i].entryid;
                            tempLink.innerHTML = Ayarlar.favoriEntryListesi[i].title+"/#"+Ayarlar.favoriEntryListesi[i].entryid;
                            tempLink.addEventListener("click", function(entryID) { return function(e){
                                if (e.altKey) { 
                                    removeFromFavourites(entryID);
                                    this.parentNode.style.display = "none";
                                    e.preventDefault();
                                }	
                            }}(Ayarlar.favoriEntryListesi[i].entryid), true);
                            tempLi.appendChild(tempLink);
                            ultemp.appendChild(tempLi);
                        }
                    }
                    limiter--;
                }
                EksiFavoriListDiv.appendChild(ultemp);
            }
            
            function fillPageByEntrylist(p) {
                tumAyarlariYukle();
                EksiFavoriListDiv.innerHTML = "";
                var maxp = Math.ceil(Ayarlar.favoriEntryListesi.length/maxEntry);
                if (p <= 0) {
                    p = 1;
                } else if (p > maxp) {
                    p = maxp;
                }
                createPager(p,maxp);
                createEntryList(p);
            }
            
            function createRemoveAllButton() {
                if (Ayarlar.favoriEntryListesi.length > 0) {
                    var removebutton = yeniEksiTusu();
                    removebutton.innerHTML = "Bosalt";
                    removebutton.style.padding = "3px";
                    removebutton.style.margin = "3px";
                    removebutton.addEventListener("click",function(){
                        if (confirm("Liste tamamen bosaltilacak, emin misin?")) {
                            removeAllFromFavourites();
                            this.style.display = "none";
                            fillPageByEntrylist(0);
                        }
                    },true);
                    EksiFavoriFooter.innerHTML = "<br />";
                    EksiFavoriFooter.appendChild(removebutton);
                }
            }
            
            function createExportImportButtons() {
                var exportBut = yeniEksiTusu();
                exportBut.innerHTML = "Disari aktar";
                exportBut.style.padding = "3px";
                exportBut.style.margin = "3px";
                
                var importBut = yeniEksiTusu();
                importBut.innerHTML = "Iceri aktar";
                importBut.style.padding = "3px";
                importBut.style.margin = "3px";
                
                exportBut.addEventListener("click", function() {
                    prompt("Favori entry listesini almak icin kopyalayip bir yerlere kaydedin:",JSON.stringify(Ayarlar.favoriEntryListesi));
                },true);
                
                importBut.addEventListener("click", function() {
                    try {
                        var importList = JSON.parse(prompt("Daha once kaydettiginiz favori entryler listenizi yapistirin:",'[{"title": "-baslik-", "entryid": "-2323-"}]'));
                        for (var i = 0;i < importList.length;i++) {
                            addToFavourites(importList[i].title,importList[i].entryid);
                        }
                        statusDiv.innerHTML = "<br />(Favori listeniz guncellendi!)";
                        fillPageByEntrylist(0);
                    } catch(e) {
                        //EksiFavori_log("import listesinde bir sorun var gibi:"+e);
                        statusDiv.innerHTML = "<br />(Listede bir sorun var gibi!)";
                    }
                },true);
                EksiFavoriFooter.appendChild(exportBut);
                EksiFavoriFooter.appendChild(importBut);
            }
            
            this.basla = function() {
                clearPage();
                fillPageByEntrylist(0);
                createRemoveAllButton();
                createExportImportButtons();
            }
        }
        
        function TopFrame() {
            this.basla = function() {
                var fbutton = yeniEksiTusu("td");
                fbutton.setAttribute("onclick","top.sozindex.location.href='"+link_Favori_Page+"'");
                fbutton.innerHTML = "<a title='favori listem' target='sozindex'>f</a>";
                fbutton.style.paddingLeft = "1em";
                fbutton.style.paddingRight = "1em";
                var sukelabutton_a = xpath("//table[@class='nav']/tbody/tr/td/a[contains(@title,'ela') or contains(@title,'ortamlara')]").snapshotItem(0);
                var sukelabutton_td = sukelabutton_a.parentNode;
                var statbutton_a = xpath("//table[@class='nav']/tbody/tr/td/a[@title='rakamlar ve getirdikleri']").snapshotItem(0);
                var statbutton_td = statbutton_a.parentNode;
                var newcolspan = "2";
                if (statbutton_td.getAttribute("colSpan") == "1") 
                    newcolspan = "2";
                else if(statbutton_td.getAttribute("colSpan") == "2") 
                    newcolspan = "3";
                else if(statbutton_td.getAttribute("colSpan") == "3") 
                    newcolspan = "4"; 
                statbutton_td.setAttribute("colSpan",newcolspan);
                
                sukelabutton_td.parentNode.insertBefore(fbutton,sukelabutton_td);
            }
        }
        
        function FavoriShow() {
            var lastIndex = Ayarlar.favoriEntryListesi.length-1;
            
            function favoriEntryGetir(entryUrl,pStatus) {
                var olTags = idGet("oltags");
                var loaderImg = idGet("loaderImg");
                var showmorebut = idGet("showmore");
                var req =  new XMLHttpRequest();
                var result = "";
                req.open("GET", entryUrl, true);
                req.onreadystatechange = (function (PStatus) { return function() {
                    if (this.readyState == 4) {
                        var tempDom = newElem("div");
                        tempDom.innerHTML = req.responseText;
                        if (!tempDom.getElementsByTagName("ol").length) {
                            olTags.innerHTML += "Bu entry'de bir sorun var gibi!"
                            return 0;
                        }
                        var baslik = (tempDom.getElementsByTagName("h1"))[0];
                        var entryler = tempDom.getElementsByTagName("li");
                        var gomEntryLi = 0;
                        
                        for (var i = 0; i < entryler.length; i++) {
                            liItem = entryler[i];
                            if (liItem.value) {
                                gomEntryLi = liItem;
                                break;
                            }
                        }
                        
                        if (gomEntryLi) {
                            var entryID = gomEntryLi.id.replace(/\D/g,'');
                            var entrySira = gomEntryLi.value;
                            if (gomEntryLi.firstChild.nodeName == "input")
                                gomEntryLi.removeChild(gomEntryLi.firstChild);
                            //gomEntryLi.lastChild.removeChild(gomEntryLi.lastChild.lastChild);
                            var scriptler = xpath(".//script", gomEntryLi)
                            for (var i = 0; i < scriptler.snapshotLength; i++) {
                                var script = scriptler.snapshotItem(i);
                                script.parentNode.removeChild(script);
                            }
                            var yazarID = xpath("./a",gomEntryLi.lastChild).snapshotItem(0).innerHTML;
                            gomEntryLi.insertBefore(newElem("br"), gomEntryLi.lastChild);
                            var eksiTuslari =  '<table style="float: right; margin-top: 0.5em;"><tbody><tr><td style="white-space: nowrap;" id="vst__ENTRY-ID__" class="ei">&nbsp;</td>\
                                                    <td><span class="but" onclick="mpr(__ENTRY-ID__,1)" title="şükela!" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:)&nbsp;</span></td>\
                                                    <td><span class="but" onclick="mpr(__ENTRY-ID__,0)" title="öeehh" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:O&nbsp;</span></td>\
                                                    <td><span class="but" onclick="mpr(__ENTRY-ID__,-1)" title="çok kötü" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;:(&nbsp;</span></td>\
                                                    <td>&nbsp;</td>\
                                                    <td><span class="but" onclick="od(\'msg.asp?to=__YAZAR-ID__&amp;re=__ENTRY-ID__\')" title="mesaj at" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)" id="">&nbsp;/msg&nbsp;</span></td>\
                                                    <td><a class="but" href="javascript:od(\'http://antik.eksisozluk.com/info2.asp?n=__YAZAR-ID__\',800,400)" title="yazar hakkında" onmouseout="bn(this)" onmouseover="ov(this)" onmouseup="bn(this)" onmousedown="md(this)">&nbsp;?&nbsp;</a></td>\
                                                </tr></tbody></table>';
                            eksiTuslari = eksiTuslari.replace(/__ENTRY-ID__/g, entryID);
                            eksiTuslari = eksiTuslari.replace(/__YAZAR-ID__/g, yazarID);
                            result = "<h2 class='title'>" + baslik.innerHTML +
                                         "&nbsp;"+
                                         "<sup><a href='show.asp?t="+encodeURIComponent(baslik.textContent).replace(/[']/g,"%27")+"' title='basliga git' target='_blank' style='text-decoration:underline;'>git</a></sup>"+
                                         "<sup><a href='show.asp?t="+encodeURIComponent(baslik.textContent).replace(/[']/g,"%27")+"&i="+entryID+"' title='konulu git' target='_blank' style='text-decoration:underline; margin-left:.5em;'>kit</a></sup>"+
                                     "</h2>";
                            result += "<ol style='white-space: normal;'><li value='"+entrySira+"' style='margin-left:0;'>";
                            result += gomEntryLi.innerHTML;
                            result += eksiTuslari;
                            result += "<br/>";
                            result += "</li></ol>";
                        } else {
                            result = "Bu entry'de bir sorun var gibi!";
                        }
                        olTags.innerHTML += result;
                         
                        if (pStatus)
                            loaderImg.style.display = "none";
                      }
                };})(pStatus);
                req.send(null);   
            }
            
            function showList() {
              var olTags = idGet("oltags");
              if (!olTags) {
                  olTags = newElem("div");
                  olTags.id = "oltags";
                  document.body.innerHTML = "<div align='center'><h1 class='title'><a href='show.asp?t=favori entry%27'lerim>Favori Entry'lerim</a></h1></div>";
                  document.body.style.padding = "50px";
                  document.body.appendChild(olTags);
              }
              
              var wrappershowbut = idGet("showmore");
              if (!wrappershowbut) {
                  var showmorebutton = yeniEksiTusu("div");
                  showmorebutton.style.width = "100%";
                  showmorebutton.style.paddingTop = "10px";
                  showmorebutton.style.paddingBottom = "10px";
                  showmorebutton.style.fontSize = "15px";
                  showmorebutton.style.textAlign = "center";
                  showmorebutton.innerHTML = "daha fazla getir, oh yeah";
                  showmorebutton.addEventListener("click", function(){ 
                      showList();
                  },true);
                  var wrappershowbut = newElem("div");
                  wrappershowbut.id = "showmore"; 
                  wrappershowbut.style.display = "none";
                  wrappershowbut.appendChild(showmorebutton);
                  showmorebutton.setAttribute("align","center");
                  //olTags.parentNode.innerHTML += "<br /><br />";
                  olTags.parentNode.appendChild(wrappershowbut);
              }
              
              var loaderImg = idGet("loaderImg");
              if (!loaderImg) {
                  loaderImg = newElem("div");
                  loaderImg.setAttribute("align","center");
                  loaderImg.id = "loaderImg";
                  loaderImg.innerHTML = "<img src='http://i.imgur.com/VkzIw.gif' />";
                  olTags.parentNode.appendChild(loaderImg);
              }
              loaderImg.style.display = "";
              if (lastIndex > 10)
                  var entrylimiter = lastIndex - 10;
              else 
                  var entrylimiter = 0;  
              for (var i = lastIndex; i >= entrylimiter ;i--) {
                  var senderStatus = false;
                  try { 
                      if (i-1 <= entrylimiter) 
                          senderStatus = true;
                          favoriEntryGetir("show.asp?t=%23"+Ayarlar.favoriEntryListesi[i].entryid,senderStatus);
                  } catch(e) {
                      alert(e);
                  }
                  lastIndex--;
              }
              if (lastIndex > 0) {
                  wrappershowbut.style.display = "";
              } else {
                  wrappershowbut.style.display = "none";
              }     
            }
            
            this.basla = function() {
                showList();
            }
        }

        this.basla = function() {
            if (!Ayarlar.eksiFavori)
               return;
            var aktifEksiFavoriEngine = 0;
            
            if (window.location.href.match(/show.asp\?t=__eksifavori_listesi__$/)) {
                aktifEksiFavoriEngine = new FavoriShow();
            } else if (window.location.href.match(/\/show\.asp/)) {
                aktifEksiFavoriEngine = new FavoriEditor();
            } else if(window.location.href.match(patt_Favori_Page)) {
                aktifEksiFavoriEngine = new FavoriList();
            } else if(window.location.href.match(/\/top\.asp/)) {
                aktifEksiFavoriEngine = new TopFrame();
            }
            
            if (aktifEksiFavoriEngine) 
                aktifEksiFavoriEngine.basla();
        }
    }

    
    // Hersey burada basliyor
    this.basla = function () {
    
        //@include'dan anlamayanlar icin host kontrolu
        // bosuna baska sitelerde calismayalim
        if (!window.location.host.match(/(antik\.)?eksisozluk\.com/) &&
            !window.location.host.match(/sozluk\.sourtimes\.org/)) {
            return; //eksisozluk'te degiliz sanirim...
        }
        
        var aktifEngine = 0;
                
        //Migration islemleri
        EppAPI_runOnce(migrateToV05, "migrateToV05");
        
        // Tum framelere ortak islemler
        try { tumAyarlariYukle(); } catch (err) { EppAPI_log("HATA: 'tumAyarlariYukle()' patladi! >> " + err); }
        try { gunlukDonBebegim(); } catch (err) { EppAPI_log("HATA: 'gunlukDonBebegim()' patladi! >> " + err); } // Gereksiz 'don bebegim' olmasin
        try { kimdirNedirFix(); } catch (err) { EppAPI_log("HATA: 'kimdirNedirFix()' patladi! >> " + err); }
        
        // Hangi sayfa/frame icindeyiz
        if (window.location.pathname.match(/\/top\.asp/)) {
            aktifEngine = new UstFrameEngine();
        } else if (window.location.pathname.match(/\/index\.asp/) || window.location.href.match(/\/stats\.asp$/)) {
            aktifEngine = new SolFrameEngine();
        } else if (window.location.pathname.match(/\/(show|stats)\.asp/)) {
            aktifEngine = new SagFrameEngine();
        } else if (window.location.pathname.match(/\/cc\.asp/)) {
            aktifEngine = new AyarMerkeziEngine();
        } else if (window.location.pathname.match(/\/info2\.asp/)) {
            aktifEngine = new KimdirNedirEngine();
        }

        // Secilen Frame Engine baslasin
        if (aktifEngine)
            aktifEngine.basla();
        
        // Hersey duzenlendikten sonra gomulebilir icerikleri duzenle
        try { gomulebilirLinkDuzenle(); } catch (err) { EppAPI_log("HATA: 'gomulebilirLinkDuzenle()' patladi! >> " + err); }
        try { gomulebilirEntryleriDuzenle(); } catch (err) { EppAPI_log("HATA: 'gomulebilirEntryleriDuzenle()' patladi! >> " + err); }
        try { (new EksiFavoriEngine).basla(); } catch (err) { EppAPI_log("HATA: '(new EksiFavoriEngine).basla();' patladi! >> " + err); }
    }
}

(new EksiPlusPlus).basla();