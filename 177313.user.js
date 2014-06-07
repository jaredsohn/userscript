// ==UserScript==
// @name        objectives
// @namespace   http://userscripts.org/users/cchussards
// @include     http://www.conquerclub.com/game.php
// @version     1
// ==/UserScript==

function checkBeginPerso()
{
  var randRefresh;
  var negatif = true;
  var result;
  $('input[type=submit]').each(function()
    {
        console.log($(this).val());
        if($(this).val() == "Begin Turn")
        {
            $(this).trigger('click');
            negatif = false;
            alert('Debut');
        }
        
    });
    
  if(negatif)
  {
    randRefresh = Math.random()*10000+1000;
    sendRequest();
    setTimeout(checkBeginPerso,randRefresh);
  }
}

checkBeginPerso()