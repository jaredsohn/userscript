// ==UserScript==
// @name		    OGame: Art Galaxy
// @namespace		localhost
// @description		Рисование солнечной системы для галактики
// @include		    http://*.ogame.gameforge.com/game/index.php?page=*
// @copyright	    2014, LogServer.Net
// @license		    GNU
// @version 	    0.1
// @author 		    Asiman
// ==/UserScript==

function oGameVersionCheck(e,t,n){function g(e){var t=/(\d+)\D*(\d*)\D*(\d*)\D*(\d*)/.exec(e?e.toString():"");return t?parseInt(("00"+t[1]).slice(-2)+("00"+t[2]).slice(-2)+("00"+t[3]).slice(-2)+("00"+t[4]).slice(-2),10):0}function y(){var e=document.getElementById("contentWrapper");if(e){var t="",n=document.getElementById("inhalt"),r=document.getElementById("oGameVersionCheck");if(n){n.style.display=r?"block":"none"}if(r){e.removeChild(r)}else{r=document.createElement("div");r.id="oGameVersionCheck";if(e.childNodes.length){e.insertBefore(r,e.childNodes[0])}else{e.appendChild(r)}for(var i=0;i<f.childNodes.length;i++){t+='<p style="padding: 3px 0px; color: '+(f.childNodes[i].childNodes[3].innerHTML=="true"?"green":"#FF4B00")+';">'+f.childNodes[i].childNodes[0].innerHTML+' ( <a href="'+f.childNodes[i].childNodes[2].innerHTML+'" style="text-decoration: none;" target="_blank">link</a> )</p>'}t='<div style="background: url(&quot;http://gf1.geo.gfsrv.net/cdn63/10e31cd5234445e4084558ea3506ea.gif&quot;) no-repeat scroll 0px 0px transparent; height: 28px; margin-top: 8px; position: relative; text-align: center;">'+'<div style="font: 700 12px/23px Verdana,Arial,Helvetica,sans-serif; color: rgb(111, 159, 200); padding-top: 3px;">'+o+"</div>"+"</div>"+'<div style="background: url(&quot;http://gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif&quot;) repeat-y scroll 5px 0px transparent; color: rgb(132, 132, 132); margin: 0px; padding: 17px 0px 10px; width: 100%; text-align: center;">'+t+"</div>"+'<div style="background: url(&quot;http://gf1.geo.gfsrv.net/cdn30/aa3e8edec0a2681915b3c9c6795e6f.gif&quot;) no-repeat scroll 2px 0px transparent; height: 17px;"></div>';document.getElementById("oGameVersionCheck").innerHTML=t}}}var r={ae:{domain:"AE.OGAME",text:"Scripts"},ar:{domain:"AR.OGAME",text:"Scripts"},ba:{domain:"BA.OGAME",text:"Skripte"},br:{domain:"BR.OGAME",text:"Scripts"},cz:{domain:"CZ.OGAME",text:"Skripty"},de:{domain:"DE.OGAME",text:"Scripts"},dk:{domain:"DK.OGAME",text:"Scripts"},es:{domain:"ES.OGAME",text:"Scripts"},fi:{domain:"FI.OGAME",text:"Scripts"},fr:{domain:"FR.OGAME",text:"Scripts"},gr:{domain:"GR.OGAME",text:"Σενάρια"},hr:{domain:"HR.OGAME",text:"Skripte"},hu:{domain:"HU.OGAME",text:"Szkriptek"},it:{domain:"IT.OGAME",text:"Script"},jp:{domain:"JP.OGAME",text:"スクリプト"},mx:{domain:"MX.OGAME",text:"Scripts"},nl:{domain:"NL.OGAME",text:"Scripts"},no:{domain:"NO.OGAME",text:"Skript"},pl:{domain:"PL.OGAME",text:"Skrypty"},pt:{domain:"PT.OGAME",text:"Scripts"},ro:{domain:"RO.OGAME",text:"Scripturi"},ru:{domain:"RU.OGAME",text:"Скрипты"},se:{domain:"SE.OGAME",text:"Skript"},si:{domain:"SI.OGAME",text:"Skripti"},sk:{domain:"SK.OGAME",text:"Skripty"},tr:{domain:"TR.OGAME",text:"Scriptler"},tw:{domain:"TW.OGAME",text:"脚本"},us:{domain:"US.OGAME",text:"Scripts"},org:{domain:"EN.OGAME",text:"Scripts"}};var i=document.location.hostname.toUpperCase(),s="",o="";for(var u in r){if(r[u].domain!==""&&i.search(new RegExp(r[u].domain))>-1){s=u;o=r[u].text;break}}if(!s){return false}var a=document.getElementById("menuTableTools");if(a){var f=document.getElementById("oGameVersionCheckData");if(!f){var l=document.createElement("li");l.innerHTML='<div id="oGameVersionCheckData" style="display: none;"></div>'+'<a id="oGameVersionCheckMenuButton" href="javascript:void(0)" class="menubutton"><span class="textlabel">'+o+"</span></a>";if(a.childNodes.length){a.insertBefore(l,a.childNodes[0])}else{a.appendChild(l)}f=document.getElementById("oGameVersionCheckData");f.parentNode.addEventListener("click",y,false)}if(f){var c=document.getElementsByName("ogame-version");c=c&&c.length?c[0].content:"9.9.9";var h=g(t)>=g(c);var p=document.createElement("span");p.style.display="none";p.innerHTML="<span>"+e+"</span><span>"+t+"</span><span>"+n+"</span><span>"+h+"</span>";f.appendChild(p);var d=document.getElementById("oGameVersionCheckMenuButton");if(d&&!h){var v=6;if(localStorage){var m=localStorage.getItem("OGameVersionCheck")||"";v=parseInt(m.split("|")[1],10)||0;if(m.split("|")[0]!=c){v=0}}if(v<6&&d.style.color!="#FF4B00"){if(localStorage){localStorage.setItem("OGameVersionCheck",c+"|"+ ++v)}d.style.color="#FF4B00"}}}}}
oGameVersionCheck('Art Galaxy', '5.7.0', 'http://userscripts.org/scripts/show/187281');

if (document.location.href.indexOf("page=galaxy") > 1) {
    var canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = "650";
        canvas.height = "650";
        canvas.style.top = "-646px";
        canvas.style.left = "10px";
        canvas.style.position = "relative";
        canvas.style.zIndex = "-1";
    var inhalt = document.getElementById('inhalt');
    if (!inhalt) return 0;
    inhalt.appendChild (canvas);

    window.onload = function() {
        // Запуск рисования 10 раз в секунду
        setInterval( function() { object.func.call(1) } , 100);
    };
}
object = {
   func: function() {
        planets     = new Image();
        planets.src = 'http://s1.directupload.net/images/130411/98igzjpt.png';
        planets.className = 'tooltipRel tooltipClose tooltipRight js_hideTipOnMobile microplanet js_planet5 colonized normal_5';
        moons       = new Image();
        moons.src   = 'http://gf3.geo.gfsrv.net/cdnb4/74fae30de92480ee39ca31617c7cb0.gif';
        var ct = {
            0: {s: 3,   m: 3000,    n: 7},
            1: {s: 5,   m: 5000,    n: 5},
            2: {s: 5,   m: 5000,    n: 6},
            3: {s: 7,   m: 7000,    n: 7},
            4: {s: 4,   m: 4000,    n: 8},
            5: {s: 4,   m: 4000,    n: 5},
            6: {s: 3,   m: 3000,    n: 5},
            7: {s: 8,   m: 8000,    n: 4},
            8: {s: 6,   m: 6000,    n: 5},
            9: {s: 7,   m: 7000,    n: 6},
            10: {s: 9,  m: 9000,    n: 5},
            11: {s: 5,  m: 5000,    n: 4},
            12: {s: 3,  m: 3000,    n: 9},
            13: {s: 6,  m: 6000,    n: 7},
            14: {s: 2,  m: 2000,    n: 7},
            15: {s: 4,  m: 4000,    n: 6},
        };

        var time = new Date();
        var leng = 35;
        // Получение контекста элемента <canvas>
        var ctx = document.getElementById('canvas').getContext('2d');

        // Очистка холста
        ctx.clearRect(0, 0, 650, 650);
        for (i=0; i<15; i++) {
            var rand = Math.floor(Math.random() * (8 - 2 + 1)) + 2;

            // Рисование орбиты Земли
            ctx.beginPath();
            ctx.strokeStyle = "#3366CC";
            ctx.arc(325, 325, leng, 0,Math.PI*2, false);
            ctx.stroke();

            ctx.save();
            // Вращение холста к позиции Земли
            var planetname = $('tr[class*="row"]')[i].getElementsByClassName("planetname ")[0];
            if (planetname) {
                  ctx.translate(325, 325);
                  for (var c in ct) {
                      if(c == i)
                      ctx.rotate((((2 * Math.PI) / ct[c].s) * time.getSeconds() + ((2 * Math.PI) / ct[c].m ) * time.getMilliseconds()) / ct[c].n);
                  }
                  ctx.translate(leng, 0);

                  // Рисование планеты
                  ctx.drawImage(planets,-20, -16);

                  ctx.save();
                 // Вращение холста, относительно вращения Земли
                 ctx.rotate((((2 * Math.PI) / ct[c].s) * time.getSeconds() + ((2 * Math.PI) / ct[c].m ) * time.getMilliseconds()));
                 if(document.getElementById('moon'+(i+1))) {
                     // Вращение Луны 'по орбите'
                     ctx.translate(0, ct[c].n);
                     // Рисование изображения Луны
                     ctx.drawImage(moons, 3, 3, 16, 16);
                 }
            }
            ctx.restore();
        ctx.restore();
        leng = leng + 20;
        }

          // Рисование неподвижного Солнца
        ctx.drawImage(planets, 305, 309, 40, 32);
    }
}