// ==UserScript==
// @name          Megiteam database list with label support
// @namespace     http://nerdblog.pl
// @description   Simple script to keep database list more readable
// @include       https://admin.megiteam.pl/vps/*/konta/*/bazy-danych/*
// ==/UserScript==

var userscript_init = function($) {
	var body = $("body.vps.database_list"),
		table = $("body.vps.database_list table.table-c"),
		databases = table.find("tr.list-item"),
		label_tables = {};

	if(body.length > 0)
	{
		databases.each(function()
		{
			var row = $(this),
				td_desc = row.children("td:nth-child(4)"),
				desc = td_desc.html(),
				labels = desc.match(/label:([A-Za-z0-9]*)/g);

			for(i in labels)
			{
				desc = desc.replace(labels[i], '');
				var l = labels[i];
				label = $.trim(l.substring(l.indexOf(':') + 1));
				if(typeof label_tables[label] == "undefined")
				{
					label_tables[label] = [];
				}
				label_tables[label].push(row);
				row.detach();
			}
			td_desc.html(desc);
		});

		table.find("tbody").prepend('<tr class="label" id="unsorted" style="height: 30px;"><td style="background: #65A09E" colspan="5">Nieposortowane</td></tr>');

		// @see http://www.colourlovers.com/palette/867235/LoversInJapan
		// @see http://www.colourlovers.com/palette/49963/let_them_eat_cake
		var colors = [ 'E94E77', 'D68189', 'C6A49A', 'C6E5D9', 'F4EAD5', 'E08E79', 'F1D4AF', 'ECE5CE', 'C5E0DC' ];
		color = 0;

		for(i in label_tables)
		{
			var id = i;
			if(color > colors.length)
			{
				color = 0;
			}

			table.find("tbody").prepend('<tr class="label" id="'+id+'" style="height: 30px;"><td style="background: #' + colors[color] + '" colspan="5">Grupa <b>' + id + '</b></td></tr>');

			var tr_label = $("#" +id);
			for(j in label_tables[id])
			{
				tr_label.after(label_tables[id][j].clone());
			}

			color++;
		}

		// cleanup
		for(i in label_tables)
		{
			for(j in label_tables[i])
			{
				label_tables[i][j].remove();
			}
		}	
	}
}

var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + userscript_init.toString() + ")(jQuery)";
document.body.appendChild(script);