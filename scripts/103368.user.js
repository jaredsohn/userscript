// ==UserScript==
// @name           Zelene policka pro WIS vc. pomlcek
// @description    Zezelena splnene predmety ve WISu - varianta se zelenymi pomlckami
// @include        https://wis.fit.vutbr.cz/FIT/st/study-v.php*
// @include        https://wis.fit.vutbr.cz/FIT/st/study-a.php*
// ==/UserScript==



var color_done = '#90EE90'
var color_fail = '#ff7f7f'


var table;

function elementText(el) {
    if (el.textContent)
        return trim(el.textContent);
    else
        return trim(el.innerText);
}

function trim (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

// find results table
var fonts = document.getElementsByTagName('font');
for(var i = 0; i < fonts.length; i++) {
    if (elementText(fonts[i]).substring(0, 4) == '* - ') {
        table = fonts[i].parentNode.getElementsByTagName('table')[0];
        break;
    }
}

// walk through subjects
var rows = table.getElementsByTagName('tr');
for(var i = 0; i < rows.length; i++) {
    var r = rows[i];
    if (r.getAttribute('bgcolor') == '#ffdead' || r.getAttribute('bgcolor') == '#f7f7af') {

        var accr_done = false; // received accreditation
        var accr_unknown = true; // accreditation status unknown
        var exam_done = false;  // exam done
        var exam_unknown = true; // exam status unknown
        var subject_done = false;

        var id_cell = r.getElementsByTagName('th')[0];
        var cells = r.getElementsByTagName('td');
        var s_id = elementText(id_cell);
        var s_name = elementText(cells[0]);
        var s_type = elementText(cells[1]);
        var s_ending = elementText(cells[2]);
        var s_points = elementText(cells[3]);
        var s_accr = elementText(cells[4]);
        var s_mark = elementText(cells[5]);
        var s_credits = elementText(cells[6]);
        var s_date = elementText(cells[7]);

        // student must get accreditation?
        var need_only_accr = (s_ending == 'Zá' || s_ending == 'Ac')
        var need_accr = (need_only_accr || s_ending == 'ZáZk' || s_ending == 'Ac+Ex' || s_ending == 'KlZá' || s_ending == 'ClAc')
        if (need_accr) {
            if (s_accr == 'ano' || s_accr == 'ano*' || s_accr == 'yes*' || s_accr == 'yes') {
                accr_done = true;
                accr_unknown = false;
                if (need_only_accr) {
                    subject_done = true;
                }

            } else if (s_accr == 'ne' || s_accr == 'no') {
                accr_unknown = false;
            }
        }

        // student is given mark
        var need_exam = (s_ending == 'ZáZk' || s_ending == 'Zk' || s_ending == 'Ac+Ex' || s_ending == 'Ex' || s_ending == 'KlZá' || s_ending == 'ClAc')
        if (need_exam) {
            if (s_mark != '*') {
                exam_unknown = false;
            }

            if (parseInt(s_mark) < 4) {
                exam_done = true;
                subject_done = true;
            }
        }

        if (s_date == '0000-00-00' || !s_date) {
            if (need_exam)
                exam_unknown = true;
            else
                accr_unknown = true;
        }

        if (need_exam && !exam_unknown) {
            //r.style.backgroundColor = done ? 'green' : 'red';
            cells[5].style.backgroundColor = exam_done ? color_done : color_fail;

        } else if (!need_exam) {
            cells[5].style.backgroundColor = color_done;
        }

        if (need_accr && !accr_unknown) {
            cells[4].style.backgroundColor = accr_done ? color_done : color_fail;

        } else if (!need_accr) {
            cells[4].style.backgroundColor = color_done;
        }

        if (subject_done) {
            id_cell.style.backgroundColor = color_done;

        } else if (!exam_unknown) {
            id_cell.style.backgroundColor = color_fail;
        }
    }
}
