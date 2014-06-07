// ==UserScript==
// @name        Iranfilm Timer Remover by Mohammad Lotfi
// @namespace   http://userscripts.org/scripts/show/179629
// @include     http://iranfilm*.*
// @version     1
// @grant       none
// ==/UserScript==

url = window.location.href;

if (-1 != url.indexOf('dl.php'))
{
  window.location.href = url.replace('dl.php', 'free.php');
} else
{
  $('.sec').remove();
  $('.timer').addClass('timer-2');
  $('.timer').append('<div class="dl-ready">آماده <br> دانلود</div>');
  $('#Result').hide();
  makeCaptcha();
  clearInterval(Timer);
}
