// ==UserScript==
// @name Stuttgarter-Zeitung.de pure content
// @match http://www.stuttgarter-zeitung.de/*/*
// ==/UserScript==

wrapper.style.width = "100%";
container.style.width = "100%";
content.style.width = "100%";
containerBild.style.float = "left";

var arr_all_divs = document.getElementsByTagName('div');

for (var int_counter = 0; int_counter < arr_all_divs.length; int_counter++) {
  if (arr_all_divs[int_counter].className == 'contentright') {
    arr_all_divs[int_counter].style.display = "none";
  }

  if (arr_all_divs[int_counter].className == 'contentleft') {
    arr_all_divs[int_counter].style.width = "100%";
  }
}

article_column_left.style.display = "none";