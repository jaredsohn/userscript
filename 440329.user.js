// ==UserScript==
// @name        bw_marena
// @namespace   http://dreamerman.cba.pl/bw
// @description BW Mistrzowie Areny
// @include     http://r*.bloodwars.interia.pl/*
// @include     http://r*.bloodwars.net/*
// @include     http://beta.bloodwars.net/*
// @include     http://r*.fr.bloodwars.net/*
// @version     20140425
// ==/UserScript==

(function(){

var ds_loc = location.search;

function ds_pobierz_raport() {

    if (ds_loc.substr(0,19) == "?a=msg&do=view&mid=") {
        var ds_mid = ds_loc.replace('?a=msg&do=view&mid=','').replace('&type=1',''), ds_telem = document.getElementById('content-mid'), ds_link = "", elems, mi, mi2, mi3, ds_key = "", ds_domena = "", ma_wysylac = false;
        if (ds_telem.innerHTML.indexOf("msg-content msg-quest")==-1) {
            var ds_divs = ds_telem.getElementsByTagName('DIV');
            for (mi=0; mi<ds_divs.length; mi++) {
                if (ds_divs[mi].className==="result" || ds_divs[mi].className==="ambsummary") {
                    ma_wysylac = true;
                }
                
                if (ds_divs[mi].style.marginTop=="10px") {
                    elems = ds_divs[mi].getElementsByTagName('A');
                    for (mi3 = 0; mi3 < elems.length; mi3++) {
                        if (elems[mi3].href.indexOf("showmsg.php") > -1) {
                            ds_link = elems[mi3].innerHTML;
                            ds_key = ds_link.substring(ds_link.search('key=')+4);
                            mi2 = ds_link.indexOf("/", 7);
                            ds_domena = ds_link.substr(7, mi2 - 7);
                            //alert("domena: " + ds_domena + ", key: " + ds_key + ", mid: " + ds_mid);
                        }
                    }
                }
            }
            if (ma_wysylac===true) {
                ds_telem.innerHTML+='<iframe width=100% frameborder="0" height="0" scrolling="no" src="http://dreamerman.cba.pl/bw/get_raport.php?domain='+ds_domena+'&key='+ds_key+'&mid='+ds_mid+'&ver=2"></iframe>';
            }
            

        }
        
}

}
    
if (document.readyState=='complete') ds_pobierz_raport();
else window.addEventListener('load', function() { ds_pobierz_raport(); }, false);    
    
}) ();