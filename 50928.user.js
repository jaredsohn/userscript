// ==UserScript==
// @name           Castle Age Battlefield Sorter
// @namespace      taocode
// @description    Sorts Battle page based on size and colorizes relative to your current size.
// @include        http://apps.facebook.com/castle_age/*
// ==/UserScript==
/*

History
-------
   08/23/09 - Updated to work with Castle Age code updates.
   06/06/09 - Created
*/

if(unsafeWindow.console){
   GM_log = unsafeWindow.console.log;
}

var my_army_size = 0;

function sortRowBySize(a,b) {
    ia = parseInt(a.cells[2].innerHTML);
    ib = parseInt(b.cells[2].innerHTML);
    if (ia < my_army_size && ib < my_army_size) return ia - ib;
    return ib - ia;
}

function sortBattlefield(ev) {
   /*
   if (ev) {
      GM_log('event: '+ ev);
      GM_log('event.target: '+ ev.target);
      GM_log('event.target.id: ' + ev.target.id);
   }
   */
    if (ev && ev.target && ev.target.id
            && (ev.target.id != 'app46755028429_app_body'
                || ev.target.id != 'app46755028429_fight')) return;
    try {
        // suspend from listening while making alterations.
        mainDiv.removeEventListener('DOMNodeInserted', sortBattlefield, false);
        
        // find the fight table
        var ftable;
        var tables = document.getElementsByTagName('table');
        for (var i = 0; i < tables.length; i++) {
         tbl = tables[i];
         if (tbl.rows.length < 10) continue;
         itd = tbl.rows[1].cells[0];
         if (itd.colSpan == 5) {
//            GM_log(tbl.rows[0].innerHTML)
            ftable = tbl;
            break;
         }
        }
        if (! ftable) return;
         
        // get army size:
        var btr = document.getElementById('app46755028429_banner_top_row');
        var mo = btr.innerHTML.match(/My\W+Army\W+(\d+)/i);
        my_army_size = parseInt(mo[1]);
         
        
        sorted_rows = new Array();
        orig_rows = ftable.rows;
        buff_row = ftable.rows[1];
        orig_num_rows = orig_rows.length;
        for (var i = 1; i < orig_num_rows; i++) {
            // only add to the sorting rows if it's good
            if (orig_rows[i].cells[2] && !isNaN(parseInt(orig_rows[i].cells[2].innerHTML)))
                sorted_rows.push(orig_rows[i]);
        }
        
        for (var i = 1; i < orig_num_rows; i++) {
            ftable.deleteRow(1);
        }
        
        sorted_rows.sort(sortRowBySize);
        
        for (var i = 0; i < sorted_rows.length; i++) {
            cr = sorted_rows[i];
            // because I couldn't figure out how to sort it exactly as I wanted
            // we'll insert size zero nemesi at the end
            var ins_loc = (parseInt(cr.cells[2].innerHTML)) ? 1 : ftable.rows.length;
            nr = ftable.insertRow(ins_loc);
            nr.innerHTML = cr.innerHTML;
            br = ftable.insertRow(ins_loc);
            br.innerHTML = buff_row.innerHTML;
        }
        
        // colorize based on the theory of relativity...
        for (var i = 1; i < ftable.rows.length; i++) {
            row = ftable.rows[i];
            el_size = row.cells[2];
            if (!el_size) continue;
            el_invade = row.cells[3];
            f_size = parseFloat(el_size.innerHTML);
            
            size_delta = parseFloat(f_size - my_army_size);
            rel_size = 1 - ( Math.abs(size_delta) / parseFloat(my_army_size) );
            c_size = parseInt(rel_size * 255);
            var r = 0, g = 0, b = 0;
            if (size_delta > 0) r = c_size;
            else g = c_size;
            el_size.style.backgroundColor = 'rgb('+r+','+g+',0)';
            el_invade.style.backgroundColor = 'rgb('+r+','+g+','+b+')';
        }
    } catch (err) {
        GM_log('Error: '+err);
    } finally {
        // resume listening now that we've made our changes.
        mainDiv.addEventListener('DOMNodeInserted', sortBattlefield, false);
    }
}

var mainDiv = document.getElementById('app46755028429_mainDiv');
mainDiv.addEventListener('DOMNodeInserted', sortBattlefield, false);
sortBattlefield();
