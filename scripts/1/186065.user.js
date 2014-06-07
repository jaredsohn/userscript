// ==UserScript==
// @name  Bugzilla quick assign buttons
// @description  Add reassign to submitter and self button to Bugzilla bug view
// @author     Mason Gup
// @version    1.21
// @match      http://*/show_bug.cgi*
// @match      http://*/process_bug.cgi
// @match      http://*/post_bug.cgi
// @copyright  2013, Mason Gup
// ==/UserScript==

function reassignToSubmitter() {
    var email;
    document.getElementById('bz_assignee_edit_action').click();
    email = document.getElementById('bz_show_bug_column_2').getElementsByTagName('a')[0].href.replace('mailto:', '');
    document.getElementById('assigned_to').value = email;
}

function reassignToSelf() {
    var a, email;
    document.getElementById('bz_assignee_edit_action').click();
    a = document.getElementById('header').getElementsByClassName('links')[0].children;
    email = a[a.length - 1].innerText.replace('| Log\u00a0out ', '');
    document.getElementById('assigned_to').value = email;
}

function takeBug() {
    reassignToSelf();
    document.getElementById('bug_status').value = 'IN_PROGRESS';
    document.getElementById('commit').click();
}

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}

function finishBug() {
    var resolution, comment_box;
    reassignToSubmitter();
    document.getElementById('bug_status').value = 'RESOLVED';
    resolution = document.getElementById('resolution');
    resolution.removeAttribute('class');
    resolution.value = 'FIXED';
    document.getElementById('resolution_settings').removeAttribute('class');
    comment_box = document.getElementById('comment');
    if (comment_box.textContent === '') {
        comment_box.textContent = 'Fixed in changeset ';
        comment_box.setSelectionRange(19, 19);
    }
    window.scroll(0, findPos(comment_box) - 50);
    comment_box.focus();
}

(function () {
    var reassign_submitter_butt, reassign_self_butt, take_button,
        saveButton, finish_button, bug_id_element, tr, td;

    reassign_submitter_butt = document.createElement('button');
    reassign_submitter_butt.type = 'button';
    reassign_submitter_butt.innerHTML = 'Reassign To Submitter';
    document.getElementById('bz_assignee_edit_container').childNodes[1].appendChild(reassign_submitter_butt);
    reassign_submitter_butt.addEventListener("click", reassignToSubmitter, true);

    reassign_self_butt = document.createElement('button');
    reassign_self_butt.type = 'button';
    reassign_self_butt.innerHTML = 'Reassign To Self';
    document.getElementById('bz_assignee_edit_container').childNodes[1].appendChild(reassign_self_butt);
    reassign_self_butt.addEventListener("click", reassignToSelf, true);

    if (document.getElementById('static_bug_status').innerText.startsWith('CONFIRMED')) {
        take_button = document.createElement('button');
        take_button.type = 'button';
        take_button.innerHTML = 'Take This Bug';
        saveButton = document.getElementById('commit');
        saveButton.parentElement.insertBefore(take_button, saveButton);
        take_button.addEventListener("click", takeBug, true);
    }

    if (document.getElementById('static_bug_status').innerText.startsWith('IN_PROGRESS')) {
        finish_button = document.createElement('button');
        finish_button.type = 'button';
        finish_button.innerHTML = 'Finish This Bug';
        saveButton = document.getElementById('commit');
        saveButton.parentElement.insertBefore(finish_button, saveButton);
        finish_button.addEventListener("click", finishBug, true);
    }

    bug_id_element = document.getElementsByClassName('bz_alias_short_desc_container edit_form')[0].getElementsByTagName('a')[0];
    tr = document.createElement('tr');
    td = document.createElement('td');
    tr.appendChild(td);
    td.appendChild(bug_id_element.cloneNode(true));
    document.getElementById('bz_big_form_parts').children[0].appendChild(tr);
}());
