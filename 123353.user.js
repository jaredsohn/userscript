// ==UserScript==
// @name           EksiDuyuruOzel
// @version        0.1
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://eksiduyuru.com/*
// @include        http://www.eksiduyuru.com/*
// ==/UserScript==

    function detectBrowser() {
        if (navigator.userAgent.match(/firefox/i))
            return "firefox";
        else if (navigator.userAgent.match(/(chrome|opera)/i))
            return "chrome/opera";
        else
            return "unknown";
    }
    
    function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    
    function EppAPI_setValue(name, value) {
        if (browser == "firefox") {
            GM_setValue(name, value);
        } else if (browser == "chrome/opera") {
            localStorage.setItem(name, value);
        }
    }

    function EppAPI_getValue(name, defval) {
        if (browser == "firefox") {
            return GM_getValue(name, defval);
        } else if (browser == "chrome/opera") {
            var ret = localStorage.getItem(name);
            return ((ret != null)?ret:defval);
        }
    }
    
    function duyuruToggle() {
        var sadeceKullanici = xpath("//div[@class='entry0']");
        for (var i = 0; i < sadeceKullanici.snapshotLength; i++) {
            var eksiImage = xpath(".//img[contains(@title,'sadece')]",sadeceKullanici.snapshotItem(i));
            if (eksiImage.snapshotLength == 0) {
                if (sadeceEksi == "0") {
                    sadeceKullanici.snapshotItem(i).style.display = "";
                } else if (sadeceEksi == "1") {
                    sadeceKullanici.snapshotItem(i).style.display = "none";
                }
            }
        }
    }
    
    function ayarTusuEkle() {
        var menuUl = xpath("//div[contains(@class,'entry')]");
        if (menuUl.snapshotLength > 0) {
            var newLi = document.createElement("li");
            newLi.style.width = "300px"
            var newA = document.createElement("a");
            if (sadeceEksi == "0") {
                newA.innerHTML = "Yazar Duyurularını Göster";
            } else {
                newA.innerHTML = "Bütün Duyuruları Göster";
            }
            newA.href = "javascript:void(0)";
            newA.style.backgroundImage = "none";
            newA.style.color = "#000";
            newA.addEventListener("click",function() {
              if (sadeceEksi == "0") {
                  sadeceEksi = "1";
                  this.innerHTML = "Bütün Duyuruları Göster";
              } else if(sadeceEksi == "1") {
                  sadeceEksi = "0";
                  this.innerHTML = "Yazar Duyurularını Göster";
              }
              EppAPI_setValue("sadeceEksi",sadeceEksi);
              duyuruToggle();
            });
            newLi.appendChild(newA);
            menuUl.snapshotItem(0).parentNode.insertBefore(newLi, menuUl.snapshotItem(0));
        }
    }
    var browser = detectBrowser();
    var sadeceEksi = EppAPI_getValue("sadeceEksi", "0");
    EppAPI_setValue("sadeceEksi",sadeceEksi);
    ayarTusuEkle();
    if(sadeceEksi == "1") 
      duyuruToggle();