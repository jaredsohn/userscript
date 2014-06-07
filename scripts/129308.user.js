// ==UserScript==
// @name           Otomatis like status and comment plus icon chating By Yopil12
// @namespace      like
// @description    For Jempoler
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Statuses==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "+29px";
  div.style.left = "+6px";
  div.style.backgroundColor = "#00ffff";
  div.style.border = "5px ridge #800080";
  div.style.padding = "2px";
  div.innerHTML = "<a style=\"font-weight:bold;color:#ec008c\" href=\"http://yopil12bangkuang.blogspot.com\"><blink><center>L12 BANGKUANG</center></blink></a>"

  body.appendChild(div);

  //buat fungsi tunda
  function tunda(milliSeconds){
  var startTime = new Date("0").getTime("30");
  while (new Date("0").getTime("30") < startTime + milliSeconds);
}

  unsafeWindow.AutoLike = function() {

    buttons = document.getElementsByTagName("button");
    for(i = 0; i < buttons.length; i++) {
      myClass = buttons[i].getAttribute("class");
      if(myClass != null && myClass.indexOf("like_link") >= 0)
        if(buttons[i].getAttribute("title") == "Suka komentar ini")
          buttons[i].click();
    }

  };
}
// ==============
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.width = "84px";
  div.style.bottom = "+29px";
  div.style.left = "+112px";
  div.style.backgroundColor = "#00ffff";
  div.style.border = "5px ridge #800080";
  div.style.padding = "2px";
  div.innerHTML = "<a style='font-weight:bold;color:#ec008c' href='' title='Refresh'><blink><center>Reload</center></blink></a>"

  body.appendChild(div);

  //buat fungsi tunda
  function tunda(milliSeconds){
  var startTime = new Date("0").getTime("30");
  while (new Date("0").getTime("30") < startTime + milliSeconds);
}

  unsafeWindow.AutoLike = function() {

    buttons = document.getElementsByTagName("button");
    for(i = 0; i < buttons.length; i++) {
      myClass = buttons[i].getAttribute("class");
      if(myClass != null && myClass.indexOf("like_link") >= 0)
        if(buttons[i].getAttribute("title") == "Suka komentar ini")
          buttons[i].click();
    }

  };
}
// ==Confirm Semua==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.setAttribute('id','like8');
  div.style.position = "fixed";
  div.style.display = "block";
  div.style.bottom = "+2px";
  div.style.left = "+6px";
  div.style.backgroundColor = "#0A04EE";
  div.style.border = "5px ridge #00ff00";
  div.style.padding = "2px";
  div.innerHTML = "<a style=\"font-weight:bold;color:#FFFF00\"&#8226;&nbsp;<a onclick='OtomatisKonfirm();' >Konfirmasi Semua</a>&nbsp;<a style=\"font-weight:bold;color:#FF0000\" &#8226;&nbsp;<a onclick='OtomatisAbaikan();' >Abaikan Semua</a>"

  body.appendChild(div);

  //buat fungsi tunda
  function tunda(milliSeconds){
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
}

  unsafeWindow.OtomatisKonfirm = function() {
    var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
    };


  unsafeWindow.OtomatisAbaikan = function() {
      var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
      };
}


// ==Comments=
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "188px"; div.style.opacity= 1;div.style.bottom = "+85px";div.style.left = "+6px";div.style.backgroundColor = "#e70ddf";div.style.border = "5px ridge #21e70d";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#0de4e7' onclick='AutoLike()'><center>Like All Status</center></a></a>"
body.appendChild(div);unsafeWindow.AutoLike = function() {javascript:var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("a");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Menyukai ini"||prepare[i].getAttribute("title")=="Menyukai ini")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Like All Status: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('like2').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(4000);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(1000);BounceCounterLike++;}};bouncer_like();void(0);};}

if(body != null) {div = document.createElement("div");div.setAttribute('id','l13');div.style.position = "fixed";div.style.display = "block";div.style.width = "188px";div.style.opacity= 1;div.style.bottom = "+56px";div.style.left = "+6px";div.style.backgroundColor = "#e70ddf";div.style.border = "5px ridge #800080";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#0de4e7' onclick='LikeComments()'><center>Like All Comments</center></a>"
body.appendChild(div);unsafeWindow.LikeComments = function() {javascript:var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("a");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Like Comments: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('l13').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(4000);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(1000);BounceCounterLike++;}};bouncer_like();void(0);};}




