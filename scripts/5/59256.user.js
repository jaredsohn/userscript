// ==UserScript==
// @name           CAcert - Custom Notes for Certs
// @namespace      http://khopis.com/scripts
// @description    Notes for specific certificiates
// @include        https://*.cacert.org/account.php?*
// @include        https://cacert.org/account.php?*
// @screenshot     http://img143.imageshack.us/img143/1034/cacertafter.png
// @scripthome     http://userscripts.org/scripts/show/59256
// @author         Adam Katz <scriptsATkhopiscom>
// @version        0.4
// @lastupdated    2009-10-07
// @copyright      2009-10 by Adam Katz
// @license        AGPL v3
// @licstart       The following is the entire license notice for this script.
/* 
 * Copyright (C) 2009  Adam Katz
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.  This program is distributed in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */ 
// @licend         The above is the entire license notice for this script.
// ==/UserScript==

var e = "Edit this note";
var w = "Write a note";

function cellFocus() { this.title=''; this.className=''; }
function cellUnfocus() { if(!this.value){this.title=w;} this.className="note"; }
function cellChange() {
  if (this.value) { this.title = e; GM_setValue(this.id, this.value); }
  else if (GM_getValue(this.id) != undefined) {
    GM_deleteValue ? GM_deleteValue(this.id) : GM_setValue(this.id,''); //0.8.1+
  }
}
var cellSubmit = "try { this.childNodes[0].blur(); } catch(err){} return false";

function newCell(id, content) {
  var form, input, newcell = document.createElement("td");
  input = document.createElement("input");
  if (content == undefined) {
    content = "";
    input.title = w;
  } else { input.title = e; }

  form = document.createElement("form");
  form.className = "note";
  form.setAttribute("onsubmit", cellSubmit);

  input.type = "text";
  input.id = id;
  input.value = content;
  input.className = "note";
  input.addEventListener('change', cellChange,  false);
  input.addEventListener('focus',  cellFocus,   false);
  input.addEventListener('blur',   cellUnfocus, false);

  form.appendChild(input);
  newcell.appendChild(form);
  newcell.className = "DataTD";
  return newcell;
}

GM_addStyle(""
  + "form.note input { width:25em; }"
  + "input.note { border:2px solid transparent; color:#06a; cursor:pointer; }"
  + "input.note:focus { border:inherit; color:inherit; cursor:inherit; }"
);

var rows = document.getElementsByTagName("tr");
for (var r=0, rl=rows.length; r < rl; r++) {
  cells = rows[r].getElementsByTagName("td");
  if (cells.length > 4 ) {
    var certId = cells[2].innerHTML.match(/\bcert=\d+/);
    if (!certId && rows[r].innerHTML.match(/CommonName|Email Address/) ) {
      var newcell = document.createElement("td");
      newcell.className = "DataTD";
      newcell.style.textAlign = "left";
      newcell.appendChild( document.createTextNode("Notes") );
      rows[r].appendChild(newcell);
      rows[r].innerHTML = rows[r].innerHTML.replace(/Renew.Revoke.Delete/,"");
    }
    else if (certId) {
      certId = certId.toString().replace(/.*=/,"");
      rows[r].appendChild(  newCell(certId, GM_getValue(certId) )  );
    }
  }
  else if (cells && cells[0] && cells[0].colSpan > 4) { cells[0].colSpan++; }
}
