// ==UserScript==
// @version 2
// @name Scrapbook 10-30 Menu
// @author Updated by Prateek, Kunal<http://www.orkut.com/Profile.aspx?uid=13210112717493623570>
// @namespace
// @description It Gives Menu for scrapbook views 10-20-30 per page
// @include http://www.orkut.com/Scrapbook.aspx?uid=*
// @exclude http://www.orkut.com/Scrapbook.aspx
// ==/UserScript==


var td=document.getElementsByTagName("div")[39];
	td.innerHTML+=
<div><span class="rf">
  <select id="actionMenu" onchange="changePageSize(this.options[this.selectedIndex].value);">
  <option value="10" >View 10 scraps</option>
  <option value="20" >View 20 scraps</option>
  <option value="30" >View 30 scraps</option>

  </select>
  </span>
</div>