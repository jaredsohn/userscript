// ==UserScript==
// @name           Jazzercise Routine Creator Sortable
// @author         http://www.dorffweb.com/
// @version        0.0.3
// @namespace      http://userscripts.org/scripts/show/128158
// @description    When creating routines on Jazzercise.com, make the search table sortable.
// @include        https://*.jazzercise.com/RTNDB.dll?RTN:Inst_Routine*
// @include        https://*.jazzercise.com/RTNDB.dll?RTN:Inst_Search*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://cachedcommons.org/cache/jquery-table-sorter/2.0.3/javascripts/jquery-table-sorter-min.js
// ==/UserScript==

    // jQuery Plugin to change tag names
    (function($){
      $.fn.replaceTagName = function(a){
        var t = [];
        for(var i = this.length - 1; 0 <= i ; i--) {
          var n = document.createElement(a);
          n.innerHTML = this[i].innerHTML;
          $.each(this[i].attributes, function(j, v) {
            $(n).attr(v.name, v.value);
          });
          $(this[i]).after(n).remove();
          t[i] = n;
        }
        return $(t);
      };
    })(jQuery);

    var songsTableHeaderRow = null;
    var songsTable = null;
    jQuery(document).ready(function() {
        // Find the cell with the text "Song Title", make sure what is found is not this script
        songsTableHeaderRow = jQuery('*:contains("Song Title"):last'); //.parent().parent().parent();
        if (!songsTableHeaderRow  || songsTableHeaderRow.prop("tagName") == "SCRIPT") {
            return;
        }
        // Find the parent TR for the "Song Title" text
        while (songsTableHeaderRow.prop("tagName") != "TR") {
            songsTableHeaderRow = songsTableHeaderRow.parent();
            if (!songsTableHeaderRow || songsTableHeaderRow.prop("tagName") == "HTML") {
                return;
            }
        }
        // Assign the id "songsTableHeaderRow" to this row
        songsTableHeaderRow.attr("id", "songsTableHeaderRow");
        // Find the parent TABLE for this header row
        songsTable = songsTableHeaderRow.parent();
        if (!songsTable) {
            return;
        }
        while (songsTable.prop("tagName") != "TABLE") {
            songsTable = songsTable.parent();
            if (!songsTable || songsTable.prop("tagName") == "HTML") {
                return;
            }
        }
        // Assign this row the id "songsTable"
        songsTable.attr("id", "songsTable");
        // Move the first (header) row of the songsTable from TBODY to THEAD
        songsTable.prepend(
            jQuery('<thead></thead>').append(songsTableHeaderRow).remove()
        );
        // For the first (header) row, change the tags from TD to TH
        jQuery("#songsTable thead td").replaceTagName("th");
        // Make the table sortable by clicking the column header
        jQuery("#songsTable").tablesorter();
    });
