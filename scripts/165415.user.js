// ==UserScript==
// @name          Optymalizator layoutu wykładów na stronach MIMUW
// @description	  Dodaje przycisk na górze strony w celu wycięcia menu bocznego co zwiększa ilość miejsca na tekst po prawej stronie i ułatwia czytanie
// @author		  Daniel Skowroński <d.skowronski@ds.lublin.pl>
// @version       1.4.2
// @include       http://wazniak.mimuw.edu.pl/*
//
// ==/UserScript==

/*ładuj jQ*/
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
  $("#titleBar").html("<button id='guziolek'>Optymalizuj!</button>");//dodaj przycisk
  $("#guziolek").click(function(event){
      $('#column-one').remove();//lewa kolumna
	  $('#column-content').css('padding-left','0');//dosuń do lewej
          $('#globalWrapper').css('margin-left','-30px');//jeszcze do lewej
	  $('#column-content').css('width','111%');//refresh, bo tekst się nie przelewa
	});
});