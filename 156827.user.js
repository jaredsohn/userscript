// ==UserScript==

// @name   Auto Like NOVRIEL_TKJ

// @namespace          auto_like_facebook

// @description          Auto Like Facebook By NOVRIEL_TKJ

// @homepage  www.facebook.com/

// @include   htt*://www.facebook.com/*

// @exclude   htt*://*static*.facebook.com*

// @exclude   htt*://*channel*.facebook.com*

// @exclude   htt*://developers.facebook.com/*

// @exclude   htt*://upload.facebook.com/*

// @exclude   htt*://www.facebook.com/common/blank.html

// @exclude   htt*://*connect.facebook.com/*

// @exclude   htt*://*facebook.com/connect*

// @exclude   htt*://www.facebook.com/plugins/*

// @exclude   htt*://www.facebook.com/l.php*

// @exclude   htt*://www.facebook.com/ai.php*

// @exclude   htt*://www.facebook.com/extern/*

// @exclude   htt*://www.facebook.com/pagelet/*

// @exclude   htt*://api.facebook.com/static/*

// @exclude   htt*://www.facebook.com/contact_importer/*

// @exclude   htt*://www.facebook.com/ajax/*

// @exclude   htt*://apps.facebook.com/ajax/*

// @exclude   htt*://www.facebook.com/advertising/*

// @exclude   htt*://www.facebook.com/ads/*

// @exclude   htt*://www.facebook.com/sharer/*

// @exclude   htt*://www.facebook.com/send/*

// @exclude   htt*://www.facebook.com/mobile/*

// @exclude   htt*://www.facebook.com/settings/*

// @exclude   htt*://www.facebook.com/dialog/*

// @exclude   htt*://www.facebook.com/plugins/*

// @exclude   htt*://www.facebook.com/bookmarks/*

// @grant       none

// ==/UserScript==

// ==============

body = document.body;

if(body != null) {

 div = document.createElement("div");

 div.setAttribute('id','like2');

 div.style.position = "fixed";

 div.style.display = "block";

 div.style.width = "50px";

 div.style.opacity= 0.90;

 div.style.bottom = "+200px";

 div.style.left = "+8px";

 div.style.backgroundColor = "#C4F7A2";

 div.style.border = "1px solid #6B84B4";

 div.style.padding = "10px";

 div.innerHTML = "<a><center>Like</center></a>"

 body.appendChild(div);

 unsafeWindow.AutoLike = function() {

  var BounceCounterLike=0;

  var Counter = 0;

  var prepare = document.getElementsByTagName("span");

  var buttons = new Array();

  for (var i = 0; i 

   if(prepare[i].getAttribute("id")!=null&&prepare[i].getAttribute("id").indexOf(".reactRoot")>=0&&(prepare[i].innerHTML=="Me gusta"||prepare[i].innerHTML=="Like"||prepare[i].innerHTML=="Suka"||prepare[i].innerHTML=="BeÃ„Å¸en"||prepare[i].innerHTML=="Ã˜Â£Ã˜Â¹Ã˜Â¬Ã˜Â¨Ã™â€ Ã™Å "||prepare[i].innerHTML=="Seneng"||prepare[i].innerHTML=="JÃ¢â‚¬â„¢aime")) {

    buttons[Counter] = prepare[i];

    Counter++;

   }

  function check_link(linknumber) {

   buttons[linknumber].click();

   var message = "<a><center>Like Status: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";

   document.getElementById('like2').innerHTML = message;

   };

  function like_timer(timex) {

   window.setTimeout(bouncer_like,timex);

  };

  function check_warning() {

   var warning = document.getElementsByTagName("label");

   var checkwarning = false;

   for(var i = 0; i 

    var myClass = warning[i].getAttribute("class");

    if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {

     alert("Warning from Facebook");

     checkwarning = true;

    }

   }

   if(!checkwarning) like_timer(0);

  };

  function warning_timer(timex) {

   window.setTimeout(check_warning,timex);

  };

  function bouncer_like() {

   if ( BounceCounterLike 

    check_link(BounceCounterLike);

    warning_timer(0);

    BounceCounterLike++;

   }

  };

  bouncer_like();

  };

 }

body = document.body;

if(body != null) {

 div = document.createElement("div");

 div.setAttribute('id','like3');

 div.style.position = "fixed";

 div.style.display = "block";

 div.style.width = "50px";

 div.style.opacity= 0.90;

 div.style.bottom = "+165px";

 div.style.left = "+8px";

 div.style.backgroundColor = "#FAF49E";

 div.style.border = "1px solid #6B84B4";

 div.style.padding = "10px";

 div.innerHTML = "<a><center>Comment</center></a>"

 body.appendChild(div);

 unsafeWindow.LikeComments = function() {

  var BounceCounterLike=0;

  var Counter = 0;

  var prepare = document.getElementsByTagName("a");

  var buttons = new Array();

  for (var i = 0; i 

   if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Me gusta este comentario"||prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini"||prepare[i].getAttribute("title")=="Nyenengi tanggapan iki"||prepare[i].getAttribute("title")=="Ã˜Â§Ã™â€žÃ˜Â¥Ã˜Â¹Ã˜Â¬Ã˜Â§Ã˜Â¨ Ã˜Â¨Ã˜Â§Ã™â€žÃ˜ÂªÃ˜Â¹Ã™â€žÃ™Å Ã™â€š"||prepare[i].getAttribute("title")=="JÃ¢â‚¬â„¢aime ce commentaire"||prepare[i].getAttribute("title")=="Bu yorumu beÃ„Å¸en")) {

    buttons[Counter] = prepare[i];

    Counter++;

   }

  function check_link(linknumber) {

   buttons[linknumber].click();

   var message = "<a><center>Like all comment: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";

   document.getElementById('like3').innerHTML = message;

   };

  function like_timer(timex) {

   window.setTimeout(bouncer_like,timex);

  };

  function check_warning() {

   var warning = document.getElementsByTagName("label");

   var checkwarning = false;

   for(var i = 0; i 

    var myClass = warning[i].getAttribute("class");

    if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {

     alert("Warning from Facebook");

     checkwarning = true;

     }

    }

   if(!checkwarning) like_timer(0);

  };

  function warning_timer(timex) {

   window.setTimeout(check_warning,timex);

  };

  function bouncer_like() {

   if ( BounceCounterLike 

    check_link(BounceCounterLike);

    warning_timer(0);

    BounceCounterLike++;

   }

  };

  bouncer_like();

  void(0);

 };

}

body = document.body;

if(body != null) {

 div = document.createElement("div");

 div.style.position = "fixed";

 div.style.display = "block";

 div.style.width = "50px";

 div.style.opacity= 0.90;

 div.style.bottom = "+235px";

 div.style.left = "+8px";

 div.style.backgroundColor = "#E1BEFA";

 div.style.border = "1px solid #6B84B4";

 div.style.padding = "10px";

 div.innerHTML = "<a><center><blink>NOVRIEL_TKJ</blink></center></a>"

body.appendChild(div);}

body = document.body;

if(body != null) {div = document.createElement("div");

  div.style.position = "fixed";

  div.style.display = "block";

  div.style.width = "50px";

  div.style.opacity= 0.90;

  div.style.bottom = "+130px";

  div.style.left = "+8px";

  div.style.backgroundColor = "#E7EBF2";

  div.style.border = "1px solid #6B84B4";

  div.style.padding = "10px";

  div.innerHTML = "<a><center>Refresh</center></a>"

body.appendChild(div);}

body = document.body;

if(body != null) {

 div = document.createElement("div");

 div.style.position = "fixed";

 div.style.display = "block";

 div.style.width = "130px";

 div.style.opacity= 0.90;

 div.style.bottom = "+500px";

 div.style.left = "+8px";

 div.style.border = "0px solid #6B84B4";

 div.style.padding = "3px";

body.appendChild(div);}

LikeCommentNovri_TkjRefresh