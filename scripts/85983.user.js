// ==UserScript==
// @name           binsearch.info download button
// @include        http://*binsearch.info/*
// @include        https://*binsearch.info/*
// @exclude        http://*binsearch.info/iframe.php
// @exclude        https://*binsearch.info/iframe.php
// ==/UserScript==

(function () {
    
    var table = document.getElementById('r2');
    var rows = table.getElementsByTagName('tr');
    
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var checkboxCell = cells[1];
        var subjectCell = cells[2];
        
        var inputs = checkboxCell.getElementsByTagName('input');
        if (inputs.length <= 0)
            continue;

        var id = inputs[0].name;
        var filename = subjectCell.getElementsByTagName('span')[0].innerHTML;
        
        var re = /"(.*)"/;
        var matches = re.exec(filename);
        if (matches)
            filename = matches[1];
        filename = escape(filename);
        
        var form = document.createElement('FORM');
        form.method = 'POST';
        form.action = '/fcgi/nzb.fcgi?q=' + filename;
        
        var id_el = document.createElement('input');
        id_el.name = id;
        id_el.value = 'on';
        id_el.type = 'hidden';
        form.appendChild(id_el);

        var action_el = document.createElement('input');
        action_el.name = 'action';
        action_el.value = 'nzb';
        action_el.type = 'hidden';
        form.appendChild(action_el);
        
        var submit_el = document.createElement('input');
        submit_el.type = 'submit';
        submit_el.setAttribute('class', 'b');
        submit_el.style.setProperty('cursor', 'pointer', 'important');
        submit_el.value = 'NZB';
        form.appendChild(submit_el);
        
        checkboxCell.appendChild(form);
    }
        

})();