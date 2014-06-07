// ==UserScript==
// @name        zive.cz - oznaceni clanku s kapitolami
// @author      moen
// @namespace   monnef.tk
// @description oznaceni clanku s kapitolami
// @include     http://www.zive.cz/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

// mam minimalni zkusenosti s JavaScriptem a jQuery,
// takze pokud odhalite chyby nebo vykonostni nedostatky,
// prosim napiste mi :)

var debug=false;
if(debug)console.log("boo");

$(".box-data > .arlist").each(function(){
    if(debug)$(this).css("border", "solid 2px green");
    var link = $(".smaller > a, h2 > a", this);
    if(debug)console.log("sending request: "+link.html()+" >>> "+link.prop('href'));
    if(debug)link.css("border", "solid 1px red");
    $.ajax({url: link.prop('href')}).done(function(data){
      if(debug)console.log("got response for: "+link.html());
      if(data.indexOf("data-tracker=\"Navigace,NextChapter\"")>=0){
        if(debug)console.log("marking: "+link.html());
        link.html("[kapitoly] "+link.html());
      }    
    });
  }
);

