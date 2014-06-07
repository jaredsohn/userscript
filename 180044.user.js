// ==UserScript==
// @description Faz a área de postagem acompanhar a barra de rolagem.
// @grant       none
// @include     /ch(an)?\.(info|com|net|org|tk)/
// @name        BananaTab
// @version     0.1.8
// ==/UserScript==

if (document.getElementById('postbox')) {
  document.querySelector('.postarea').setAttribute('style', 'display:none');
  document.getElementsByTagName('body')[0].innerHTML += '\
<div id="BananaTab" style="background:inherit;display:block;position:fixed;right:25px;top:50px">\
  [<a href="javascript:window.scrollTo(0, 0);">Top</a>]\
  [<a href="javascript:window.scrollTo(0, document.body.scrollHeight);">Down</a>]\
  [<a href="javascript:window.location.reload(false);">Refresh</a>]\
  [<a href="javascript:void(0);" id="BananaTabOpen">Open</a>]\
</div>\
';
  document.getElementById('BananaTabOpen').addEventListener('click', function () {
    "use strict";
    document.getElementById('BananaTab').setAttribute('style', 'display:none');
    document.querySelector('.postarea').setAttribute('style', 'background:inherit;display:block;position:fixed;right:25px;top:50px');
  }, false);
  document.querySelector('.postblock+td').innerHTML += "\
[<a href=\"javascript:document.querySelector('[name = em]').setAttribute('value', 'noko');\">Noko</a>]\
[<a href=\"javascript:document.querySelector('[name = em]').setAttribute('value', 'sage');\">Sage</a>]\
[<a href=\"javascript:void(0);\" id=\"BananaTabClose\">Close</a>]\
";
  document.getElementById('BananaTabClose').addEventListener('click', function () {
    "use strict";
    document.getElementById('BananaTab').setAttribute('style', 'background:inherit;display:block;position:fixed;right:25px;top:50px');
    document.querySelector('.postarea').setAttribute('style', 'display:none');
  }, false);
}
