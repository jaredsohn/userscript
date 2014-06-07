// ==UserScript==
// @name inci sözlük toplu şuku çükü
// @description başlık sayfasındaki herkese toplu şuku ve çükü butonu ekler
// @include http://inci.sozlukspot.com/*
// @include http://*ccc.incisozluk.cc/*
// ==/UserScript==
window.addEventListener("load", function(e) {
  ButonEkle();
}, false);
function ButonEkle(){
 var buttonElems = document.getElementsByTagName('h1');
 buttonElems[0].innerHTML = buttonElems[0].innerHTML + '<input id="eksile" type="button" value="Herkesi Eksile" class="linkler"/>'
 buttonElems[0].innerHTML = buttonElems[0].innerHTML + '<input id="sukula" type="button" value="Herkesi Şukula" class="linkler"/>'
 addButtonListener();
}

function addButtonListener(){
  var button = document.getElementById("eksile");
  button.addEventListener('click',Eksile,true);
  var button1 = document.getElementById("sukula");
  button1.addEventListener('click',Sukula,true);
}

function Eksile(){
	var small = document.getElementsByTagName("small");
    for(var i = 1; i < small.length; i++){
    unsafeWindow.oyp('-1',(small[i].innerHTML).replace("#", ""));
}
}
function Sukula(){
	var small = document.getElementsByTagName("small");
    for(var i = 1; i < small.length; i++){
    unsafeWindow.oyp('1',(small[i].innerHTML).replace("#", ""));
}
}



