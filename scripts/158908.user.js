// ==UserScript==
// @name           LoginWiz test script 2
// @description    test
// @author         Garrie Richmond
// @include        http://*pokecrpg.com/*
// @version        5.1
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js 
// ==/UserScript==

  if(document.body.innerHTML.search(/Congratulations, you have just won 45 coins!
/) != -1) {
    window.location = "http://pokecrpg.com/slots.php"
  }
  if(window.location.pathname == "/slots.php") {
    if(document.body.innerHTML.search(/\./) != -1) {
      window.location = "http://pokecrpg.com/slots.php?pull=lever&id=958737"
    
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
window.location = "http://pokecrpg.com/slots.php?pull=lever&id=958737"
}