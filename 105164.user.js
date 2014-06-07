// ==UserScript==
// @name           lenta.ru custom blocks renewer
// @namespace      http://userscripts.org/scripts/show/105164
// @version        1.1
// @history        1.1 Улучшен код, вывод результатов, добавлена возможность изменения надписи и стиля выводящуюся во время запроса. 
// @history        1.0 Релиз
// @updateURL      https://userscripts.org/scripts/source/105164.meta.js
// @include        http://lenta.ru/
// ==/UserScript==

var waiter={
style: 'background-color:lightgreen;color:black;font-size:18px;',
text: 'Идёт запрос, пожалуйста подождите...'
};

(function(){for(var e=document.getElementsByClassName("nav"),b=0;b<e.length;b++){var a=document.createElement("img");a.setAttribute("src","data:image/gif;base64,R0lGODlhCQAKAIABACatKP///yH5BAEAAAEALAAAAAAJAAoAAAIRjA2HwInnQlRMwXnt2/I2ixUAOw%3D%3D");a.setAttribute("style","border: none;cursor:pointer");a.setAttribute("id","images"+b);b==0&&(a.setAttribute("style","display:none"));e[b].appendChild(a);a.addEventListener("click",function(){var a=this.id.replace(/images(\d{1,})/ig,"$1")-1,b=document.getElementsByClassName("glavnoe2"),d=new XMLHttpRequest; d.open("GET","http://lenta.ru/",!0);d.onreadystatechange=function(){if(d.readyState==4){var e=d.responseText,c=document.createElement("iframe");c.style.visibility="hidden";c.style.width="0";c.style.height="0";document.documentElement.appendChild(c);var f=c.contentDocument;document.documentElement.removeChild(c);f.documentElement.innerHTML=e;b[a].innerHTML=f.getElementsByClassName("glavnoe2")[a].innerHTML}else b[a].innerHTML="<br /><div style="+waiter.style+">"+waiter.text+"</div>"}; d.send("")},!1)}})();