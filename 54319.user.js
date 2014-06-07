// ==UserScript==
// @name           Applegeeks Navigation
// @namespace      aleksandr.pasechnik.com
// @description    Enables arrow key navigation
// @include        http://www.applegeeks.com/comics/*
// ==/UserScript==

function keyDown(e)
{
  var KeyID = e.keyCode;
  page = window.location.href.split('=');
  current_page = parseInt(page[1]);
  switch(KeyID)
  {
    case 39:
        page[1] = (current_page+1)+'';
        next_page = page.join('=');
        console.log(next_page);
        window.location.href = next_page;
      break;
    case 37:
      page[1] = (current_page-1)+'';
      next_page = page.join('=');
      console.log(next_page);
      window.location.href = next_page;
      break;
  }
}

window.addEventListener('keydown', keyDown, true);