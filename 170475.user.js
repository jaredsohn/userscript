// ==UserScript==
// @name Ask.fm Auto Like by Yassine Chadine
// @namespace http://userscripts.org/scripts/show/999999
// @version 2.0
// @copyright http://ask.fm/YassineChadine
// @description Auto Like Ask.fm
// @author (http://userscripts.org/users/520740)
// @include http://ask.fm/*
// @icon http://s3.amazonaws.com/uso_ss/icon/138450/larg...
// Like Automatico Para Ask.FM
// Version numero 2
// DON'T COPY THIS SOURCE CODE!!! THIS CODE HAVE A COPYRIGHT.
// NO COPIAR este código fuente! El presente Código tienen derechos de autor.
// cicerotimao71@hotmail.com
// ==/UserScript==
// ==Profile==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like1');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 1.00;
div.style.bottom = "+105px";
div.style.left = "+6px";
div.style.backgroundColor = "#ff00ae";
div.style.border = "1px solid #555";
div.style.padding = "2px";
div.innerHTML = "
Mi Facebook
"
div2 = document.createElement("div");
div2.setAttribute('id','spoiler');
div2.style.position = "fixed";
div2.style.width = "125px";
div2.style.opacity= 0.90;
div2.style.bottom = "+65px";
div2.style.left = "+6px";
div2.style.backgroundColor = "#ff00ae";
div2.style.border = "1px solid #555";
div2.style.padding = "2px";
div2.innerHTML = "
« •

body.appendChild(div);
body.appendChild(div2);

unsafeWindow.spoiler = function() {
var i;
for(i=1;i<=20;i++)>
var x=document.getElementById('like'+i);
if (x.style.display=="none") {
x.style.display="block";
div2.innerHTML = "« • Preguntame!"
}
else {
x.style.display="none";
div2.innerHTML = " Mostrar Auto Like »"
}
}
};
}

// ==============
// ==Like All==
body = document.body;
if(body != null) {
div = document.createElement("div");
div.setAttribute('id','like2');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "125px";
div.style.opacity= 0.90;
div.style.bottom = "+42px";
div.style.left = "+6px";
div.style.backgroundColor = "#eceff5";
div.style.border = "1px solid #94a3c4";
div.style.padding = "2px";
div.innerHTML = "??Me Gusta Todo!"

body.appendChild(div);

unsafeWindow.OtomatisLike = function() {
document.getElementsByClassName("submit-button-more")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();
document.getElementsByClassName("like hintable")[0].click();

buttons = document.getElementsByTagName("button");
for(i = 0; i < buttons.length; i++) {
myClass = buttons[i].getAttribute("class");
if(myClass != null && myClass.indexOf("like") >= 0)
if(buttons[i].getAttribute("name") == "likern false;")
buttons[i].click();
}

};
}
