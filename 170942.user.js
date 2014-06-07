// ==UserScript==
// @name           Allure Bot
// @description    Legion licks monkeys
// @author         Apollo
// @include        http://*pokemonallure.net/*
// @version        1.0
// ==/UserScript==
if(document.body.innerHTML.search(/(E|e)rror/) == -1)
{
if(document.body.innerHTML.search(/Submit/) == -1){
  if(document.body.innerHTML.search(/You have entered the correct code/) != -1) {
    window.location = "/battle.php?opp=Swimmer%20Richard"
  }
  if(window.location.pathname == "/battle.php") {
    if(document.body.innerHTML.search(/\./) != -1) {
      window.location = "/battle.php?opp=Swimmer%20Richard"
    }
    inputs = document.getElementsByTagName("input")
    for(i = 0; i < inputs.length; i++) {
      if(inputs[i].value == "Bolt Strike") { inputs[i].click() }
    }
  }
}
else {
  alert("Captcha")
}
}
else
{
window.location = "/battle.php?opp=Swimmer%20Richard"
}