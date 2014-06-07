// ==UserScript==
// @name           Lulz Creed is a Joke v3
// @description    You Cant Be Serious
// @author         DeZiire
// @include        http://*http://tpmrpg.net/*
// @version        5.1
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js 
// ==/UserScript==
i
    window.location = "/battle.php#form"
  }
  if(window.location.pathname == "/battle.php") {
    if(document.body.innerHTML.search(/\./) != -1) {
      window.location = "/battle.php#form"
    }
    inputs = document.getElementsByTagName("input")
    for(i = 0; i < inputs.length; i++) {
      if(inputs[i].value == "Struggle") { inputs[i].click() }
    }
    inputs = document.getElementsByTagName("input")
    for(i = 0; i < inputs.length; i++) {
      if(inputs[i].value == "Resend Action") { inputs[i].click() }
    }
  }
}

else
{
window.location = "/battle.php#form"
}
