// AniDB-Site-Enhancements
// - Select all files of a group
// - Replace vote-dropdowns with textfields (enter integers from 100 to 1000)
//
// Version 20051204.01
// works with FF1.5 and greasemonkey 0.6.4
// Copyright (c) 2005, Lupin III.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name           AniDB-Site-Enhancer: Full
// @namespace   lupin_sanseis_scripts
// @description  selects all files of a release group, replaces vote dropdowns with textfields
// @include        http://anidb.info/perl-bin/animedb.pl?show=anime*
// ==/UserScript==

(function() {

   // 2D-array containing all the checkbox names corresponding to a group
   checkbox_names = new Object();

   function initialize() {
      // use '//' to disable unwanted functions
      group_selects();
      decimal_vote();
   }

   function group_selects () {
      // search for trs of the group-list-table
      var trs = document.evaluate("//tr[not(.//table) and ..//text()[contains(., 'Group')] and ..//text()[contains(., 'Info:')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

      var regexp = /gid=(\d+)"/;

      // walk through all rows of the table
      for (var i=0; i < trs.snapshotLength; i++) {
         var tr = trs.snapshotItem(i);
         // create an adittional column to add to the end of the row
         var td = document.createElement("td");
         if (match = regexp.exec(tr.innerHTML)) {
            // found a group-id, so create the subarray for the checkboxnames and the checkbox
            var gid = match[1];
            checkbox_names[gid] = new Array();

            var input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', 'toggle_gid_'+gid);
            input.setAttribute('value', gid);
            input.addEventListener('click', toggle, false);
            td.appendChild(input);
         } else
         if (tr.innerHTML.match(/Group&nbsp;Info:/i)) {
            td.setAttribute('bgcolor', '#b0b0b0');
            td.appendChild(document.createTextNode('toggle all'));
         }
         tr.appendChild(td);
      }

      // if checkbox_names still contains no elements, it's no animelisting --> exit function
      var found = false;
      for (var gid in checkbox_names) { found = true; break; }
      if (!found) { return; }

      // walk through all checkboxes in the page
      // if the checkboxname is like madd.f.xyz, try to find the gid in the same table-row
      // and add the checkboxname to the corresponding array
      var checkboxes = document.evaluate("//input[@type='checkbox' and starts-with(@name, 'madd.f.')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      var regexp = /gid=(\d+)/;
      for (var i=0; i < checkboxes.snapshotLength; i++) {
         var tr = checkboxes.snapshotItem(i).parentNode.parentNode;
         if (match = regexp.exec(tr.innerHTML)) {
            var gid = match[1];
            if (checkbox_names[gid]) {
               checkbox_names[gid].push(checkboxes.snapshotItem(i).name);
            }
         }
      }

      // add a title attribute to the created checkboxes
      for (var gid in checkbox_names) {
         document.getElementById('toggle_gid_'+gid).setAttribute('title', 'Toggle all files of this anime-group ('+checkbox_names[gid].length+' files)');
         document.getElementById('toggle_gid_'+gid).parentNode.appendChild(document.createTextNode('('+checkbox_names[gid].length+')'));
      }

      // expand the grouplist too when expanding all file-entries (change href of plus icon)
      var as = document.evaluate("//a[contains(@href, 'expandall') and .//*[contains(@title, 'all entries')]]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (var i=0; i < as.snapshotLength; i++) {
         as.snapshotItem(i).href += '&showallag=1';
      }

      // finally add the function for the checkbox onclick-handler to the document
      function toggle(_gid) {
         var _gid = this.getAttribute('value');

         for (var i=0; i < checkbox_names[_gid].length; i++) {
            document.getElementsByName(checkbox_names[_gid][i])[0].checked = document.getElementById('toggle_gid_'+_gid).checked;
         }
         if (document.getElementById('toggle_gid_'+_gid).checked) {
            alert('Selected ' + checkbox_names[_gid].length + ' files. Please check for correctness!');
         } else {
            alert('Removed all checkmarks for this group!');
         }
      }
   }

   function decimal_vote() {
      // replace vote-dropdowns with textfields
      var selects = document.evaluate("//select[../input[@name = 'votea.tmpratenow' or @name = 'votea.ratenow']]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (var i = 0; i < selects.snapshotLength; i++) {
         var textfield = document.createElement('input');
         textfield.setAttribute('type', 'text');
         textfield.setAttribute('size', '25');
         textfield.setAttribute('name', 'votea.rate');
         textfield.setAttribute('value', 'vote from 100 to 1000');
         selects.snapshotItem(i).parentNode.replaceChild(textfield, selects.snapshotItem(i));
      }
   }

   window.addEventListener("load", initialize(), false);

})(); 