// ==UserScript==
// @name           one klik add all friend By Yopil12
// @namespace      add
// @description    For new
// @include        http://www.facebook.com/*
// ==/UserScript==


// ==Statuses==
body = document.body;
if(body != null) {
  div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "+30px";
  div.style.left = "+112px";
  div.style.backgroundColor = "#00ffff";
  div.style.border = "5px ridge #800080";
  div.style.padding = "2px";
  div.innerHTML = "<a style=\"font-weight:bold;color:#ec008c\" href=\"JavaScript:AutoLike()\">add</a>"

  body.appendChild(div);

  //buat fungsi tunda
  function tunda(milliSeconds){
  var startTime = new Date("0").getTime("30");
  while (new Date("0").getTime("30") < startTime + milliSeconds);
}

  unsafeWindow.AutoLike = function() {

    buttons = document.getElementsByTagName("a");
    for(i = 0; i < buttons.length; i++) {
      myClass = buttons[i].getAttribute("class");
      if(myClass != null && myClass.indexOf("uiIconText") >= 0)
        if(buttons[i].getAttribute("rel") == "async-post")
          buttons[i].click();
    }

  };
}
// ==============