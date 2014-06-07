// ==UserScript==
// @name           Sape calc
// @namespace      com.blogspot.dumbseo
// @include        http://www.sape.ru/site_pages_prices.php*
// ==/UserScript==


//Подключаем jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

//Проверка, загружен ли jQuery
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; sapeCalc(); }
}
GM_wait();


function sapeCalc()
{
  $(document).ready(function()
  {
    for(var j=0;j<2;j++)
    {
      var inputs = $('#tc'+(j+1)+' > table > tbody > tr > td > input');
      for(var i=0;i<inputs.length;i++)
      {
        var nn = document.createElement('input');
        nn.type = 'text';
        nn.style.width = '55px';
        nn.className = 'fs11';
        nn.style.background = '#aaffaa';
        $(inputs[i]).parent().append(nn);
        $(nn).change(function(){
          var inp = $(this).prev('input');
          var old_value = this.value;
          inp[0].value = ((old_value * 100) / 110);
        });
      }
    }
  });
}

