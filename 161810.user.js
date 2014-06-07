// ==UserScript==
//
// @name            Better F/HA Progress Bars
// @author          Soawkalm
// @description     Fixes the 1 pixel progress bar issues, and adds a blue validation progress bar.
// @include         http://seiba.maidlab.jp/entrans/main.php
// @include         http://seiba.maidlab.jp/entrans/main.php?root=*
// @version         1.0.2
//
// @history         1.0.2 neatened up code and increased progress bar height by 2px
// @history         1.0.1 fixed syntax error introduced in 1.0
// @history         1.0 faster and now also runs on the main page
// @history         1.0a initial alpha version for testing
//
// ==/UserScript==

function fixProgressBars()
{
	var table = document.getElementsByTagName("table")[1].children[0] // the table body

	var r
	for(r=1;r<table.children.length;r++)
	{
		var row         = table.children[r];
		var total       = parseInt(row.children[3].innerHTML, 10);
		var translated  = parseInt(row.children[4].innerHTML, 10);
		var validated   = parseInt(row.children[5].innerHTML, 10);
		var remaining   = parseInt(row.children[6].innerHTML, 10);
		
		var progress_bar = row.children[7];
		
		var u_percentage = 100 * (translated - validated) / total;
		var t_percentage = 100 * translated / total;
		var v_percentage = 100 * validated / total;
		var r_percentage = 100 * remaining / total;
		
		var pb = '';
		
		pb += '<table width="100px">\n'
		pb += '  <tbody>\n'
		pb += '    <tr height="12px">\n'
		if(v_percentage > 0)
		{
			pb += '        <td bgcolor="#55ccee" width="'+v_percentage.toFixed(1)+'px" title="Validated: '+v_percentage.toFixed(1)+'%"><img src="images/spacer.png" alt=""></td>';
		}
		if(u_percentage > 0)
		{
			pb += '        <td bgcolor="#51ff51" width="'+u_percentage.toFixed(1)+'px" title="Translated: '+t_percentage.toFixed(1)+'%"><img src="images/spacer.png" alt=""></td>'
		}
		if(r_percentage > 0)
		{
			pb += '        <td bgcolor="#ff2a2a" width="'+r_percentage.toFixed(1)+'px" title="Untranslated: '+r_percentage.toFixed(1)+'%"><img src="images/spacer.png" alt=""></td>'
		}
		pb += '    </tr>\n'
		pb += '  </tbody>\n'
		pb += '</table>'
		
		progress_bar.innerHTML = pb;
	}
}

fixProgressBars();