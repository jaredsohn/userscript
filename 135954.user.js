// License: Public domain.
// ==UserScript==
// @name LOR HideAll
// @description Показать удаленные темы и сообщения.
// @author Linux.org.ru
// @license Creative Commons Attribution 3.0 Unported
// @include http://www.linux.org.ru/forum/*
// ==/UserScript==

(function ()
{
   function calc_offset()
   {
      var idx = document.location.search.search(/[?&]offset=(\d+)/);
      if (idx == -1) return 0;
      return RegExp.$1;
   }
   function load_handler()
   {
      // Wrapper.
      var button_block = document.createElement("div");
      button_block.style = "position: absolute; top: .5em; left: 0;";
      // Form.
      var form = document.createElement("form");
      form.method = "POST";
      var e;
      // Show deleted.
      e = document.createElement("input");
      e.type = "hidden"; e.name = "deleted"; e.value = 1;
      form.appendChild(e);
      // Submit button.
      e = document.createElement("input");
      e.type = "submit"; e.value = "Показать всё, что скрыто";
      form.appendChild(e);
      // Append to document.
      button_block.appendChild(form);
      document.body.appendChild(button_block);
   }
   document.addEventListener("DOMContentLoaded", load_handler, false);
})();