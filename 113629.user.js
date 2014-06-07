// ==UserScript==
// @name           ES_navigator
// @namespace      escilon
// @include        http://escilon.ru/dungeon*
// @include        http://escilon.ru/inventory/*
// ==/UserScript==
var a = new Array()
a = document.URL.split('/')
var up = Number(a[4])-30
var down = Number(a[4])+30
var left = Number(a[4])-1
var right = Number(a[4])+1
setTimeout(function(){
endPart();
}, 3000);
function endPart()
 { 

if (document.URL == 'http://escilon.ru/inventory/'){location.href = document.referrer}

var tired = document.getElementById('cur_tired').innerHTML
//alert(tired)
var div = document.getElementById('party_list')
var br1 = document.createElement('br')
var br2 = document.createElement('br')
var br3 = document.createElement('br')
var br4 = document.createElement('br')
var br5 = document.createElement('br')
var img1 = document.createElement('img')
var img2 = document.createElement('img')
var img3 = document.createElement('img')
var img4 = document.createElement('img')
div.appendChild(br1)
div.appendChild(br2)
div.appendChild(br3)
div.appendChild(img1)
div.appendChild(br4)
div.appendChild(img2)
div.appendChild(img3)
div.appendChild(br5)
div.appendChild(img4)
img1.src = "http://s016.radikal.ru/i334/1109/7b/5c69b4f41599.jpg"
img1.addEventListener('click', function(){location.href = "http://escilon.ru/go/"+a[3]+"/"+up+"/"}) 
img2.src = "http://s48.radikal.ru/i122/1109/6a/60abb79eb504.jpg"
img2.addEventListener('click', function(){location.href = "http://escilon.ru/go/"+a[3]+"/"+left+"/"}) 
img3.src = "http://s015.radikal.ru/i333/1109/4a/511893ada9a5.gif"
img3.addEventListener('click', function(){location.href = "http://escilon.ru/go/"+a[3]+"/"+right+"/"}) 
img4.src = "http://s013.radikal.ru/i322/1109/9f/73971b927a25.jpg"
img4.addEventListener('click', function(){location.href = "http://escilon.ru/go/"+a[3]+"/"+down+"/"}) 
// Math.floor( Math.random( ) * (n - m + 1) ) + m // îò m äî n
var x = Math.floor( Math.random( ) * 10 ) + 1
if (Number(tired)>600) {
switch (x){
case 1: location.href = "http://escilon.ru/inventory/eat=1319858032.4971"; break
case 2: location.href = "http://escilon.ru/inventory/eat=1319858039.2358"; break
case 3: location.href = "http://escilon.ru/inventory/eat=1319858042.9593"; break
case 4: location.href = "http://escilon.ru/inventory/eat=1319858046.7431"; break
case 5: location.href = "http://escilon.ru/inventory/eat=1319869710.1044"; break
case 6: location.href = "http://escilon.ru/inventory/eat=1319869713.3636"; break
case 7: location.href = "http://escilon.ru/inventory/eat=1319869719.8793"; break
case 8: location.href = "http://escilon.ru/inventory/eat=1319869722.5862"; break
case 9: location.href = "http://escilon.ru/inventory/eat=1319869725.6504"; break
case 10: location.href = "http://escilon.ru/inventory/eat=1319869730.869"; break}
                        }
}