// ==UserScript==
// @name          Phpmyadmin Sql History
// @namespace     http://www.phpmyadmin.net
// @description   Keep a history of queries executed in phpMyAdmin. Store per database. Display the query history in a select list so a query can be reselected.
// @include       http://localhost/phpMyAdmin/*
// ==/UserScript==

var form = document.getElementById('sqlqueryform');
if (form) {
    // Get db name
    var inputs = document.getElementsByTagName('input');
    var db_name = '';
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.name == 'db') {
            db_name = input.value;
            break;
        }
    }

    if (db_name) {
        var textarea = document.getElementById('sqlquery');
        form.addEventListener('submit', function(e) {
            // Add event to persistent array
            var sqls = eval(GM_getValue(db_name+'_queries', 'new Array()'));
            var exists = false;
            for (var i = 0; i < sqls.length; i++) {
                if (sqls[i] == textarea.value) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                sqls.push(textarea.value);
            }
            GM_setValue(db_name+'_queries', uneval(sqls));
            //e.preventDefault();
        }, false);

        var queries = eval(GM_getValue(db_name+'_queries', 'new Array()'));
        var label = document.createElement('label');
        label.innerHTML = 'History: ';
        label.for = 'sqlhistory';

        var select = document.createElement('select');
        select.id = 'sqlhistory';
        select.style.width = '600px';

        function populateSelect() {
            select.options.length = 0;
            var queries = eval(GM_getValue(db_name+'_queries', 'new Array()'));

            var option = document.createElement('option');
            option.value = '-1';
            option.innerHTML = '';
            select.appendChild(option);
            for (var i = queries.length-1; i >= 0; i--) {
                var option = document.createElement('option');
                option.value = i;
                option.innerHTML = queries[i];
                select.appendChild(option);
                option.style.width = '600px';
            }
        }
        populateSelect();

        select.addEventListener('change', function (e) {
            textarea.value = this.options[this.selectedIndex].innerHTML;
            this.selectedIndex = 0;
        }, false);

        var inpdel = document.createElement('input');
        inpdel.type = 'button';
        inpdel.value = 'Del';
        inpdel.addEventListener('click', function (e) {
            var queries = eval(GM_getValue(db_name+'_queries', 'new Array()'));
            for (var i = 0; i < queries.length; i++) {
                var query = queries[i];
                if (query == textarea.value) {
                    queries.splice(i, 1);
                    // Delete item from select
                    select.removeChild(select.options[i]);
                }
            }
            GM_setValue(db_name+'_queries', uneval(queries));
            populateSelect();
        }, false);

        textarea.parentNode.appendChild(label);
        textarea.parentNode.appendChild(select);
        textarea.parentNode.appendChild(inpdel);
    }
}
