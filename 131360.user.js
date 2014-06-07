// ==UserScript==
// @name           PocztaFM mailing killer
// @namespace      http://arkq.awardspace.us/
// @description    Delete advertising mailing from mailing@poczta.fm
// @include        https://poczta.interia.pl/classic/getmails*
// @version        0.1.0
// @author         (c) Arkadiusz Bokowy
// ==/UserScript==

var mailingKiller = {
auto_remove: true,
blocked_emails: ['mailing@poczta.fm'],

is_email_blocked: function(email) {
    for(var i = 0; i < mailingKiller.blocked_emails.length; i++)
        if(email == mailingKiller.blocked_emails[i]) return true;
    return false;
},

select_blocked_emails: function(mailsList) {
    tableBody = mailsList.getElementsByTagName('tbody');
    if(tableBody) tableBody = tableBody[0];

    var blocked_counter = 0;

    // iterate over all rows in the table
    tableRows = tableBody.getElementsByTagName('tr');
    for(var i = 0; i < tableRows.length; i++) {
        tableRow = tableRows[i];

        sender = tableRow.getElementsByClassName('mailSndr')[0].firstChild;
        checkbox = tableRow.getElementsByClassName('mailOper')[0].firstChild;

        if(mailingKiller.is_email_blocked(sender.title)) {
            checkbox.checked = true;
            blocked_counter++;
        }
    }
    return blocked_counter;
},

// Create a hidden input element, and append it to the form
addHiddenInput: function(theForm, key, value) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    theForm.appendChild(input);
},

init: function() {
    var mailsList = document.getElementById('mailsList');

    if(mailingKiller.select_blocked_emails(mailsList) && mailingKiller.auto_remove) {
        form = document.getElementById('mailsListForm');
        mailingKiller.addHiddenInput(form, 'deleteMsg', 'Usuń');
        form.submit();
    }
}
}

mailingKiller.init()
