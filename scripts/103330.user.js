// ==UserScript==
// @name           Cervene policka pro WIS
// @description    Zacervena obsazene terminy u prihlasovani ve WISu
// @include        https://wis.fit.vutbr.cz/FIT/st/course-sl.php*item*
// ==/UserScript==



var color_full = '#ff7f7f'


function elementText(el) {
    if (el) {
        if (el.textContent)
            return el.textContent;
        else
            return el.innerText;
    }
}

function paintItRed() {
    // find variants table
    var form;

    for(var i = 0; i < document.forms.length; i++) {
        if (document.forms[i].name == 'csl')
            form = document.forms[i];
    }
    if (!form) return;

    var table = form.getElementsByTagName('table')[0];
    if (!table) return;

    var date_re = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

    // walk through subjects
    var rows = table.getElementsByTagName('tr');
    for(var i = 0; i < rows.length; i++) {
        var r = rows[i];
        if (r.getAttribute('bgcolor') != '#D0DCE0') {
            // clear old color
            r.style.backgroundColor = null;

            var id_cell = r.getElementsByTagName('th')[0];
            var name_cell = r.getElementsByTagName('th')[1];
            var cells = r.getElementsByTagName('td');
            var s_id = elementText(id_cell);
            var s_name = elementText(name_cell);
            var s_info = elementText(cells[0]);
            var s_reg = elementText(cells[1]);
            var s_max = elementText(cells[2]);

            if (s_info && (s_info.match(date_re) || s_info == 'pøihlášen' || s_info == 'registered')) {
                continue;
            }

            if (parseInt(s_reg) >= parseInt(s_max)) {
                r.style.backgroundColor = color_full;
            }
        }
    }
}





paintItRed();
// ajax
document.addEventListener("DOMNodeInserted", paintItRed, false);
