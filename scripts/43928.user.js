// ==UserScript==
// @name             long-select-helper
// @namespace        http://sam.intelunix.fr
// @description      add an input box, to help <select>ing item from a long list (in a <form>), start typing the name you want, and it will hide the non-matching options
// @include          *
// ==/UserScript==

( function () {
   // minimum item number so we do something (select-helper)
   var MIN_LENGTH = 32;
   var defaultTxt = 'added By GM';


   /* ************* */
   // Ids of repeated action
   var intervalIds = new Array();

   // we'll use it later
   var inputNode = false;

   var selects = document.getElementsByTagName('select');
   for (var i=0, select; select = selects.item(i) ; i++) {
      if (MIN_LENGTH > select.length)
         continue;

      // if not defined already
      if (!inputNode) {
         inputNode = document.createElement('input');
         inputNode.type = 'text';
         inputNode.value = defaultTxt;
         inputNode.name = 'samlt-';
         inputNode.setAttribute('autocomplete', 'off');
      }

      // clone the input node, and add it before the <select> element
      var input = inputNode.cloneNode(false);
      input.name += i;
      select.parentNode.insertBefore(input, select);

      // highlight text in the input box, so it's easy to replace
      input.addEventListener('click', function () { this.select() ; }, false);

      // we don't waste ressources, and only do something if we have the focus
      input.addEventListener('focus', startAutoSelect, false);
   }

   function startAutoSelect () { // {{{
      // we'll add it back, once this would no longer have the focus
      this.removeEventListener('focus', startAutoSelect, false);
      this.addEventListener('blur', stopAutoSelect, false);

      var intervalIdx = this.name.slice(this.name.indexOf('-')+1);

      // update the selection as we type in the input box
      intervalIds[intervalIdx] = window.setInterval(select_helper, 300, this, this.nextSibling);

   } // }}}

   function stopAutoSelect () { // {{{
      // the opposite from startAutoSelect
      this.addEventListener('focus', startAutoSelect, false);
      this.removeEventListener('blur', stopAutoSelect, false);

      var intervalIdx = this.name.slice(this.name.indexOf('-')+1);
      clearInterval(intervalIds[intervalIdx]);

   } // }}}

   function select_helper (input, select) { // {{{
      if (!input || !select)
         return false;

      if (defaultTxt == input.value)
         return;
      var val = input.value.toLowerCase();

      var txt_arr = new Array();
      for (var i=0, len = select.length ; i<len ; i++)
         txt_arr[i] = select.options[i].textContent.toLowerCase();

      // Hide the non-matching items, unhide the others
      // if no text is typed in, display every item, and fill the input
      // box with the default text. And eventually, select either the 
      // default selected item(input box empty, or defaultTxt), or the best match.
      var idx=0;
      if (0 == val.length) {
         // no text typed in:
         input.value = defaultTxt;
         input.select();

         // display every item, and find the default selected item
         for (var j=0, option ; option = select.options[j]; j++) {
            option.style.display = 'block';
            if ('true' == option.defaultSelected)
               idx = j;
         }
      } else {
         // should be large enough...
         var min_pos = 999;

         for (var option, pos, i = select.length ; i > 0 && (option = select.options[--i]) ;) {
            pos = txt_arr[i].indexOf(val);
            if (-1 != pos ) {
               // item matches
               if (min_pos >= pos) {
                  min_pos = pos;
                  idx = i;
               }
               option.style.display = 'block';
            } else {
               // item doesn't match
               option.style.display = 'none';
            }
         }
      }

      // select the most appropriate option
      select.selectedIndex = idx;

   } // }}}

} ) ();

/* vim: set et sts=3 sw=3 foldmethod=marker : */
