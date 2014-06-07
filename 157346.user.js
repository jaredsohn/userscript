// ==UserScript==
// @id             exhentai.org-c5e3fcf9-ef12-4079-a201-d1b750e87520@sanitysama
// @name           G.E-Hentai Archive Download Links on Exhentai Galleries
// @version        1.2
// @description    Adds an g.e-hentai gallery link on exhentai.
// @include        http://exhentai.org/g/*/*/
// @include        http://g.e-hentai.org/g/*/*/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at         document-end
// ==/UserScript==

function relink(place){
    var a = $(place);
    var c = a.attr("onclick").split("\'");
        a.removeAttr("onclick");
        a.attr("href", c[1]);
    }

if(document.URL.indexOf("exhentai.org/g/") >= 0){
    var go = document.getElementsByClassName("g2")[0];
    var pa = document.createElement('p');
        pa.setAttribute('style','padding: 0 0 9px');
        pa.setAttribute('id','goto');
    $(go).after(pa);
    var im = document.createElement('img');
        im.setAttribute('src','http://st.exhentai.net/img/mr.gif');
        $("#goto").append(im);
        $(im).after(" ");
    var ah = document.URL.substring(9);
    var glink = document.createElement('a');
        glink.setAttribute('href', "http://g.e-" + ah);
        glink.setAttribute('id', "glink");
        glink.setAttribute('style', "font-weight: bold;text-decoration: none;");
        tn = document.createTextNode('Go to g.e-hentai.org');
        glink.appendChild(tn);
      $("#goto").append(glink);
    relink('#gd5 > .g1 + .g2 > a');
    relink('#gd5 > .g1 + .g2 + #goto + .g2 > a');
    }

if(document.URL.indexOf("g.e-hentai.org/g/") >= 0){
    relink('#gd5 > .g1 + .g2 > a');
    relink('#gd5 > .g1 + .g2 + .g2 > a');
    }