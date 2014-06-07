// ==UserScript==
// @name			phpMyAdmin with Empty button
// @namespace		http://www.pinicio.com.ar
// @description		Add the Empty table option
// @include			http://localhost/phpmyadmin/sql.php?*
// @include			http://phpmyadmin/sql.php?*
// @require			http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function($)
{
    $(function()
    {
		// Get Database
		var db = getData('db');
		
		// Get Table
		var table = getData('table');
		
		// Get Token (falta capturarlo din√°micamente!!)
		var token = getUrlVars()["token"];
			
		// Create Button
		var new_li = $('<li/>').appendTo('#topmenu');
		
		// Create Link
		$('<a/>', {		    
		    href: 'http://localhost/phpmyadmin/sql.php?db=' + db + '&table=' + table + '&goto=tbl_structure.php&back=tbl_operations.php&sql_query=TRUNCATE+TABLE+%60' + table + '%60&reload=1&message_to_show=Table+' + table + '+has+been+emptied&token=' + token,
		    text: 'Empty'
		}).addClass('tab').appendTo( new_li );
    });

	function getData( type ) 
	{
		var type = type == 'db' ? 1 : 2;
		var d = $('#serverinfo a').eq( type ).html();
		d = d.split('> ');
		d = $.trim(d[1]);
		return d;
	}

	function getUrlVars()
	{
    		var vars = [], hash;
    		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    		for(var i = 0; i < hashes.length; i++)
    		{
        		hash = hashes[i].split('=');
        		vars.push(hash[0]);
        		vars[hash[0]] = hash[1];
    		}
    		return vars;
	}

})(jQuery);