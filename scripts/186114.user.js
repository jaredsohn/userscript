// ==UserScript==
// @name       Njuskalo Ad Remover
// @namespace  tteskac
// @version    0.2.1
// @description  Skripta koja sprijecava inritantne reklame
// @include        http://www.njuskalo.hr/*    
// @include        http://njuskalo.hr/*  
// @copyright  2013+, Tomislav Teskac
// ==/UserScript==

function getElementsByClassName(classname_, node, tagName)  {
    var tagName=(typeof(tagName) === 'undefined')?"*":tagName;
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var classes = classname_.split(','); 
    
    for(cid in classes) {
    var classname = classes[cid];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName(tagName);
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    }
        
    return a;
}


function run() {
    
    //HTML KLASE U KOJIMA SE NALAZE REKLAME
    var klaseReklama = new Array();
    klaseReklama.push("banner is-loaded");
    klaseReklama.push("banner-alignment banner-alignment--center");
    klaseReklama.push("banner_full");
    klaseReklama.push("wrap-banner-billboard wrap-main-aux wrap-banner-wallpaper");
    klaseReklama.push("wrap-banner-wallpaper");
    klaseReklama.push("entity-list entity-list--featuredstore entity-items-count--2");
    klaseReklama.push("banner banner--sky-home");
    klaseReklama.push("is-loaded");
    klaseReklama.push("banner");
    klaseReklama.push("TT_Side");
    
    
    for(var i = 0; i < klaseReklama.length; i++) {    
        
        var listaReklama = getElementsByClassName(klaseReklama[i], null, "div");
        
        for(var x = 0; x < listaReklama.length; x++) {
           var reklama = listaReklama[x];       
           //reklama.innerHTML = ""; 
           reklama.parentNode.removeChild(reklama);
        }
        
    }
    
    //GOOGLE REKLAME
    var adsenseReklama = document.getElementById('adsense_adlist_top_camao');
    adsenseReklama.parentNode.removeChild(adsenseReklama);

}

setTimeout(run(), 1000);
//setInterval(run(), 1000);
