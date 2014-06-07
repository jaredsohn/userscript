// ==UserScript==
// @name           Sql Speicher
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @include        http://www-db.in.tum.de/db2face/index.shtml*
// ==/UserScript==

var history = 15; // how many queries to keep saved

var form = document.getElementsByName('SQLAnfrage')[0];
if (form) {
	db_name = "foo";

    if (db_name) {
        var textarea = document.getElementsByName('SQLAnfrage')[1];
        form.addEventListener('submit', function(e) {
            // Add event to persistent array
            var sqls = eval(GM_getValue(db_name+'_queries', 'new Array()'));
            
            // check if we're over our history limit
            sqls.reverse();
            if(sqls.length>history) sqls.splice(history-1,999);
            sqls.reverse();
            
            // check if it's already in the list, and if it is, remove it, and re-add it at the top
            for (var i = 0; i < sqls.length; i++) {
                if (sqls[i] == textarea.value) {
                    sqls.splice(i,1);
                    break;
                }
            }
            
            // add it at the top of the list
            sqls.push(textarea.value);
            
            GM_setValue(db_name+'_queries', uneval(sqls));
            //e.preventDefault();
        }, false);

        var queries = eval(GM_getValue(db_name+'_queries', 'new Array()'));
        var label = document.createElement('label');
        label.innerHTML = '<br/>History: ';
        label.for = 'sqlhistory';

        var select = document.createElement('select');
        select.id = 'sqlhistory';
		select.style.fontFamily = "Consolas";
        select.style.width = '600px';
        //select.style.height = '30px';
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
                //option.style.width = '600px';
            }
        }
        populateSelect();

        select.addEventListener('change', function (e) {
            textarea.value = this.options[this.selectedIndex].innerHTML;
            //this.selectedIndex = 0;
        }, false);

		textarea.addEventListener("keydown", function (e) {
			if (e.keyCode == 9) {
				e.preventDefault();
				e.stopPropagation();
					var s = textarea.selectionStart, e = textarea.selectionEnd;
				if (e == s) {
					// nothing selected
					textarea.value = textarea.value.substring(0, s) + "\t" + textarea.value.substring(e);
					textarea.selectionStart = textarea.selectionEnd = s + 1;
				}
			}
		}, false);

        var inpdel = document.createElement('input');
        inpdel.type = 'button';
		inpdel.style.marginLeft = "10px";
        inpdel.value = 'Del';
        inpdel.addEventListener('click', function (e) {
          var queries = eval(GM_getValue(db_name+'_queries', 'new Array()'));
          var newqueries = queries;
          for (var i = 0; i < newqueries.length; i++) {
            var query = queries[i];
            if (i == select.options[select.selectedIndex].value) {
              newqueries.splice(i, 1);
              // clear textarea
              textarea.value = '';
              // Delete item from select
              select.removeChild(select.options[i]);
            }
          }
          GM_setValue(db_name+'_queries', uneval(newqueries));
          populateSelect();
        }, false);


		var input = textarea.parentNode.getElementsByTagName("input")[0];
		textarea.parentNode.insertBefore(label, input);
		textarea.parentNode.insertBefore(select, input);
		textarea.parentNode.insertBefore(inpdel, input);
		textarea.parentNode.insertBefore(document.createElement("br"), input);
        //textarea.parentNode.appendChild(label);
       // textarea.parentNode.appendChild(select);
        //textarea.parentNode.appendChild(inpdel);
    }
}
