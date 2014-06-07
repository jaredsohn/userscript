// ==UserScript==
// @name           Endless E-hentai Pages
// @namespace      http://userscripts.org/scripts/show/68601
// @description    View e-hentai searches and thumbnails on a single endless page.
// @author         Couchy
// @homepage       http://userscripts.org/users/112858
// @id             http://userscripts.org/users/112858
// @namespace      http://userscripts.org/users/112858
// @version        130814
// @include        http://g.e-hentai.org/*
// @include        http://exhentai.org/*
// @grant          none
// @noframes
// ==/UserScript==

if(document.getElementById("wcr_btnsettings"))
    return;

var g = {};

function safeArray(a, i){
    try{return a[i];}
    catch(e){return "";}
}

function pause(){
    g.ready = false;
    document.body.style.cursor = "wait";
}

function resume(){
    g.ready = true;
    document.body.style.cursor = "default";
}

function html2dom(html){
    var container = (g.type == 3) ? document.createElement("div") : document.createElement("tbody");
    container.innerHTML = html.replace(/<script(.|\s)*?\/script>/gi,"").replace(/<iframe(.|\s)*?\/iframe>/gi,"");
    if(g.type == 3)
        galleryStyle(container, true);
    return container;
}

function htmlDecode(input){
    if(typeof input === "undefined")
        return undefined;
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function get(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", g.currentPage.nextURL, true);
    xhr.ontimeout = function(){resume();};
    xhr.onerror = function(){resume();};
    xhr.onload = function(){
        g.currentPage = new page(xhr.responseText);
        var DOMContent = html2dom(g.currentPage.content);
        g.appendTo.appendChild(DOMContent);
        //if(g.type == 3){document.images[document.images.length-1].scrollIntoView();}           
        g.currentPage.content = "";
        if(g.auto && g.currentPage.nextURL)
            g.autoTimeout = setTimeout(function(){get();}, g.wait);
        else if(g.currentPage.nextURL)
            setTimeout(function(){resume();}, g.wait);
            else{
                resume();
                g.ready = false;
            }
    };
    xhr.send();
}

function page(html){
    this.content = 
        /*Search*/safeArray(html.match(/(<div class="itg[^]*?)<table/i),1) || safeArray(html.match(/(<tr class="gtr[^]*?)<\/table>/i),1) ||
        /*Thumbs*/safeArray(html.match(/<div id="gdt">([^]*?)<\/div><table/i),1) ||
        /*Images*/safeArray(html.match(/<a onclick="[^>]*?" href="[^>]*?">(<img id="img" src="[^>]{150,}?"[^>]*?>)/i), 0).replace(/>$/i, " onerror=\"imageError(this);\" onabort=\"imageError(this);\">") + "<br/><br/><br/><br/><br/>";
    this.nextURL = htmlDecode(
        /*Search*/safeArray(html.match(/<a href="(http[^"]*)"[^>]*>&gt;<\/a>/i),1) || 
        /*Thumbs*/function(){var thumbURL=document.location.href.match(/^http:\/\/e(x|-)hentai\.org\/g\/.*\//i);var str=safeArray(html.match(/<td onclick="sp\(([0-9]*)\)"><a href="#" onclick="return false">&gt;<\/a>/i),1);return str?thumbURL+"?p="+str:undefined;}() ||
        /*Images*/function(){var str=safeArray(html.match(/<a onclick="([^>]*?)" href="([^>]*?)"><img id="img" src="([^>]{150,}?)"/i),2);return(str&&str!=g.currentPage.nextURL)?str:"";}()
        );
    //   console.log(JSON.stringify(this));
}

function galleryStyle(target, initial){
    var imgs = target.getElementsByTagName("img");
    for(var i = 0; i < imgs.length; i++){
        if(initial){
            imgs[i].setAttribute("oldwidth", imgs[i].style.width);
            imgs[i].setAttribute("oldheight", imgs[i].style.height);
        }
        imgs[i].style.width = (parseInt(imgs[i].getAttribute("oldwidth"))*g.resize/100)+"px";
        imgs[i].style.height = (parseInt(imgs[i].getAttribute("oldheight"))*g.resize/100)+"px";
    }
}

g.appendTo =
    /*1-Search*/safeArray(document.getElementsByClassName("itg"),0) ||
    /*2-Thumbs*/document.getElementById("gdt") ||
    /*3-Images*/document.getElementById("i1");
g.type = (g.appendTo==safeArray(document.getElementsByClassName("itg"),0))?1:(g.appendTo==document.getElementById("gdt"))?2:(g.appendTo==safeArray(document.getElementsByClassName("sni"),0))?3:0; if(g.type==0){return}
g.currentPage = new page("");
g.currentPage = new page(document.body.innerHTML);
if(g.type == 3){
    g.appendTo = document.body;
    document.body.setAttribute("style", "text-align:center;");
    g.appendTo.innerHTML = g.currentPage.content;
    galleryStyle(document, true);

    function imageError(brokeImg){
        brokeImg.setAttribute("brokesrc", (brokeImg.getAttribute("brokesrc") || brokeImg.getAttribute("src")));
        brokeImg.setAttribute("title", "Click to reload!");
        brokeImg.setAttribute("onclick", "this.setAttribute('src', this.getAttribute('brokesrc')+'?v='+(new Date).getTime()); this.removeAttribute('onclick'); this.removeAttribute('title')");
        brokeImg.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAACXBAMAAABJtXDJAAAAJFBMVEUAAAAAAAD/zMxmZpkzMzNmZmYzM2bMmZmZZmaZmZnMzMz////Ur+RNAAAAAXRSTlMAQObYZgAAAmtJREFUWMPtmM9r2zAUx9ORMppdqs12u2NNS7bbhiFnG5QxdnJKBLuGDN8bFrxrSqE+79Y/YP/n9Cz5RbKk1KNN5EG/FyHy4cVP0vshDQaoP2yrwQ5lBBX0jBtSLoUjMP9mckfEorAvnO6C1H25pjR3LchWq/iSkLQjlz+FoygSUFpzU5ab3CqWuiTnYmg57YuDdQ6qKo7HJZebg30L8JdVD7nX8Pnox7jkrq/Z3ORexYZmtkPoi5Px8bbZt0a5PY48cAFj36t7sco/kUtNThjiw0YJpt5xRM81bk7XwTmZ11Mjox5rdqKE65OtMvSBi4paPyid0nwH9y6ZOIvDobj3HbmA5SYXKcA1bOTGqNkeuS/FMknkgaL0N3C/qrsWNyJkmUh9FqdR5gbDngeO56uiAGQCuM6paYtzwpRvTtQnriveLWzbBOSkv82+1STMTn1yc0rlKjfDQuE+gienot+I0BC6fa3UuqwnnPQjEWFy5uRQB+SaTzO5slS4iRIfOneF5cEnx/3Qua/VrZVrr8ttsygfMI68cMdYz2Rg6DrbF3fSkau7dllJF5AG6wF1Xq6lPa0Diqxmn5tL/8HeCDrIG5iBC0s4OAsSQgO/hgv4rOHewN5cwEyeK/A2xBC6aP63KzfqyJ105AYPD/VMCQydC/A14REOq9teOHFiCtHxhphabtp1Vbv4hpioSC+4obhvZ6Kg8utexXUHhSigU9tzgyzQ412PEj3ipizvxKX255+9cXFVZZ04Gfy5J879fYwhF1DqtLd9NtnYt+yFc3PDTDzU1Zq5uaNH3wlrzbNuXEZeuP+RYy1pQfkXeY0Mew9Lp6wAAAAASUVORK5CYII=");
    }
    var script = document.createElement("script");
    script.textContent = imageError.toString();
    document.head.appendChild(script);
}
g.currentPage.content = "";
g.ready = true;
g.wait = (g.type == 2) ? 0 : 3500;
g.resize = 100;
g.auto = false;
g.autoTimeout = setTimeout(function(){},0);
g.eventHandler = function(e){
    if(e.keyCode == 39){
        if(!e.shiftKey && !e.ctrlKey && g.currentPage.nextURL && g.ready && !g.auto){
            pause();
            get();
        }
        else if(e.ctrlKey && !e.shiftKey && g.type == 3){
            var input = parseInt(prompt("Image Scale","100"));
            if(input){
                g.resize = input;
                galleryStyle(document, false);
            }
        }
            else if(e.shiftKey && !e.ctrlKey && g.currentPage.nextURL && g.ready){
                var input = parseInt(prompt("Enter time delay in ms or click cancel to stop. (WARNING: short delays may cause errors/bans!)", "5000"));
                if(input){
                    g.auto = true;
                    g.wait = parseInt(input);
                    get();
                }
                else{
                    clearTimeout(g.autoTimeout);
                    g.auto = false;
                    g.wait = (g.type == 2) ? 0 : 3500;
                    resume();
                }
            }
            }
};
g.eventListener = document.addEventListener("keydown", g.eventHandler, false);
document.onkeydown = null;
if(g.wait > 0){
    pause();
    document.body.style.cursor = "default";
    setTimeout(function(){resume();}, g.wait);
}