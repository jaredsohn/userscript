// ==UserScript==
// @name           Lulz psp is a Joke v3
// @description    Og masdasd.
// @author         Ginisa
// @include        http://*http://psmrpg.net/*
// @version        5.1
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js 
// ==/UserScript==
if(document.body.innerHTML.search(/(E|e)rror/) == -1)
{


    window.location = "/battle.php?id=2126"
  }
  if(window.location.pathname == "/battle.php") {
    if(document.body.innerHTML.search(/\./) != -1) {
      window.location = "/battle.php?id=2126"
    }
    inputs = document.getElementsByTagName("input")
    for(i = 0; i < inputs.length; i++) {
      if(inputs[i].value == "Focus Punch") { inputs[i].click() }
    }
    inputs = document.getElementsByTagName("input")
    for(i = 0; i < inputs.length; i++) {
      if(inputs[i].value == "restart") { inputs[i].click() }
    }
  }
}
else {
var captcha = $("div:contains(':  ')").text();
var textbox = document.getElementsByName("submit")[0];
delimiter = ':';
var captch = captcha.split(delimiter); 
captcha=captch[1];
captcha = captcha.replace(/ /gm, "");
captcha = captcha.replace(/\./gm, "");
captcha = captcha.replace(/(\r\n|\n|\r)/gm,"");
textbox.value = captcha;
$('input[value="Submit"]').click(); 

}
}
else
{
window.location = "/battle.php?id=2126"
}

