// ==UserScript==
// @name       OGame debris checker V5
// @namespace  
// @version    6.3.2.1
// @description  Scanne la vue galaxie afin de detecter les changements des CDR
// @grant unsafeWindow
// @downloadURL https://userscripts.org/scripts/show/180858
// @include    http://*.ogame.*/game/index.php?page=galaxy*
// @include    http://127.0.0.1:*/game/index.php?page=galaxy*
// @include    http://127.0.0.1/game/index.php?page=galaxy*
// @copyright  Homer | ogamebot.fr
// @icon		http://updates.ogamebot.fr/scripts/debris.ico
// ==/UserScript==
(function(){
    var strScan = "Demarrer un scan";
    var isActive = false;
    var preStr = "";
    var int1 = -1;
    var int2 = -1;
    var canWork = false;
    
    function openPopup() {
        if (!canWork) {int1=-1; int2=-1; return;}
        var win = window.open('','Scan CDR','location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,height=480,width=640');
        return win;
    }
    function reloadPage() {
        isActive = true;
        if (int1 == -1) {
            int1 = prompt("Indiquez le délai minimum de rafraichissement en secondes:", 2);
            int2 = prompt("Indiquez le délai maximum de rafraichissement en secondes:", 5);
            int1 = parseInt(int1);
            int2 = parseInt(int2);
            if (isNaN(int1) || isNaN(int2)) {
                int1=-1; int2=-1;
                alert('Veuillez indiquer des nombres uniquement !');
                isActive = false;
                return;
            }
            int1 *= 1;
            int2 *= 1;
            if (int1<=0 || int2<=0 || int1>int2) {alert('Le delai minimum ne peut etre superieur au delai maximum et ils doivent etre superieur a zero !'); isActive = false; int1=-1; int2=-1; return;}
        }
        if (int1 != -1 && int2 != -1) {canWork = true; setTimeout("canLoadContent(galaxy, system, 100)",0);}
    }
    

    var $;
    try {$ = unsafeWindow.$;}
    catch(e) {$ = window.$;}
   try {
    $(document).ajaxSuccess(function(e,xhr,settings){
        if (settings.url.indexOf("page=galaxyContent") == -1) {
            return;
        }
        var table = document.getElementById("galaxyContent").getElementsByTagName("table")[0];
        if (isActive) {
            isActive = false;
            var cdrStr = "";

            for (rowNb = 0; rowNb < 16; rowNb ++) {
                if (document.getElementById('debris' + rowNb)) {
                    var contentPos = document.getElementById('debris' + rowNb).getElementsByTagName("ul")[0];
                    var coordinates = contentPos.getElementsByTagName("li")[0].innerHTML;
                    var contentQty = document.getElementById('debris' + rowNb).getElementsByTagName("ul")[1];
                    var metal = contentQty.getElementsByTagName("li")[0].innerHTML;
                    var cristal = contentQty.getElementsByTagName("li")[1].innerHTML;
                    cdrStr += "<span style='color:red;'>" + coordinates + "</span>: " + metal + ", " + cristal + "<br />";
                }
                
            }
            
            if (cdrStr != preStr) {
                var time = "undefined";
                var liBlock = document.getElementsByTagName("li");
                for (n = 0; n < liBlock.length; n++) {
                    if (liBlock[n].className == "OGameClock") {
                        var time = liBlock[n].innerHTML;
                        n = 99999;
                    }
                }
                if (canWork) {
                    var win = openPopup();
                    win.document.write("<u><b>" + time + ":</b></u><br />" + cdrStr + '<br />');
                    preStr = cdrStr;
                }
            }
            setTimeout(reloadPage, (int1+(int2-int1)*Math.random())*1000);
            
        } else {
            var cell = document.getElementById("galaxyheadbg2").getElementsByTagName("th")[3];
            cell.title = strScan;
            cell.style.color = "green";
            cell.style.cursor = "pointer";
            cell.addEventListener("click",reloadPage,false);
            cell.addEventListener("click",openPopup,false);
        }
    });
    
    
    }
    catch(e) {
        setTimeout("canLoadContent(galaxy, system, (2 + (3 * Math.random())) * 1000)",0);
        //alert("UserScript exception:\n" + e);
    }
})();

