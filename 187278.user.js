// ==UserScript==
// @name       Baseinfo Dil
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http*://*.php-gfx.net/baseinfo/index.php*
// @copyright  2012+, Hakan
// ==/UserScript==

(function(){
    var ara = "\n";
    function id(i){
        return document.getElementById(i);
    }
    
    function degistir(){
        var els = document.getElementsByTagName("*");
        for(var i = 0, l = els.length; i < l; i++) {
            var el = els[i];
            el.innerHTML = el.innerHTML.replace("Befehlshaber Login", 'Giriş');
            el.innerHTML = el.innerHTML.replace("Klasse", 'Tür');
            el.innerHTML = el.innerHTML.replace("Spieler", 'Oyuncu');
            el.innerHTML = el.innerHTML.replace("Rang", 'Sıralama');
            el.innerHTML = el.innerHTML.replace("Eintragszeit", 'Son Giriş');
            el.innerHTML = el.innerHTML.replace("Basen", 'Üsler');
            el.innerHTML = el.innerHTML.replace("Logout", 'Çıkış');
            el.innerHTML = el.innerHTML.replace("OffBasen", 'Saldırı Üssü');
            el.innerHTML = el.innerHTML.replace("Max Rep", 'Max Tamir');
            el.innerHTML = el.innerHTML.replace("Flug", 'Hava');
            el.innerHTML = el.innerHTML.replace("Fahr", 'Motor');
            el.innerHTML = el.innerHTML.replace("Fuß", 'Piyade');
            el.innerHTML = el.innerHTML.replace("Base", 'Üs');
            el.innerHTML = el.innerHTML.replace("Credits", 'Kredi');
            el.innerHTML = el.innerHTML.replace("Ressourcen", 'Kaynak');
            el.innerHTML = el.innerHTML.replace("Offensive", 'Saldırı');
            el.innerHTML = el.innerHTML.replace("Support", 'Takviye');
            el.innerHTML = el.innerHTML.replace("Repzeiten", 'Tamir');
            el.innerHTML = el.innerHTML.replace("Def", 'Savunma');
            el.innerHTML = el.innerHTML.replace("Off", 'Saldırı');
            el.innerHTML = el.innerHTML.replace("Strom", 'Enerji');
        }
    }
    
    scin = degistir.toString() + ara ;
    scin += 'degistir();' + ara;
    var head = document.getElementsByTagName("head")[0];
    
    var script = document.createElement("script");
    script.id = "hkn_veri";
    script.innerHTML = scin;
    script.type = "text/javascript";
    
    if (id("hkn_veri")) { } else {
        head.appendChild(script);
    }
})()