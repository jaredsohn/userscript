// ==UserScript==
// @name        CheckBox selector
// @version     0.3
// @date        21.07.2011
// @author      polosha <olegpolo@ukr.net>
// @include     http://vashmagazin.ua/cat/catalog/*
// ==/UserScript==

fucntion myFunction()
{
var list = document.getElementsByClassName("cbox");
for (var i = 0; i < list.length; ++i)
  {
  list[i].click();
  }
}

window.addEventListener('load', myFunction, false);

