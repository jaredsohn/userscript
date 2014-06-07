// ==UserScript==

// @name           FUPquote

// @namespace      http://forum.pravda.com.ua/

// @description    Скрывает цитаты

// @include        http://forum.pravda.com.ua/*

// ==/UserScript==

function a() {return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')}
document.body.appendChild(document.createElement('script')).innerHTML=a();
return;

function quq(l){
    mdiv = l.nextSibling.nextSibling
    if (mdiv.style.display=="none"){mdiv.style.display='block';l.innerHTML='- Сховати цитований текст -';}
    else {mdiv.style.display='none';l.innerHTML='- Показати цитований текст -';}
}
function ltrim(str, chars) {
chars = chars || "\\s";
return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

if (document.location.href.match('read')){
els = document.getElementsByClassName("msg")
for (i=0;i<els.length;i++){
    sp = false
    bq = ''
    lines = els[i].innerHTML.split('<br>')
    for (l=0;l<lines.length;l++){
        cl = ltrim(lines[l])
        if (cl.substr(0,4)=="&gt;"){
            if (sp==false) sp = l;
            else ep = l;
            bq+=lines[l]+'<br>'
        }
        else {
            if (sp!=false){
                sp = false
                t = '<br/><a onclick="quq(this)" style="cursor:pointer;color:#DD0000;">- Показати цитований текст -</a><br/>'
                a = document.getElementsByClassName("message")[i].innerHTML.replace(bq,t+'<div style="display:none;">'+bq+'</div>')
                document.getElementsByClassName("message")[i].innerHTML = a
                bq = ''
            }
        }
    }
}
}