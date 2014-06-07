// ==UserScript==
// @name           Format highlighter for what.cd
// @namespace      http://what.cd
// @description    Highlights different formats with different colours
// @include        http*://*what.cd/torrents.php*
// @author         darkip
// @version        0.2
// ==/UserScript==

//Define the colours we will be highlighting with
flac = '#FF0000';
flac100 = '#FF00FF';
mp3v0 = '#FFCC33';
mp3v2 = '#00FF66';
mp3320 = '#00AAFF';
other = '#9933FF';

function highlightrows()
{
	table = document.getElementById('torrent_table');
	rows = table.rows;
	
	for(i=1; i < rows.length; i++)
	{
		if(rows[i].cells[1].innerHTML.indexOf('FLAC / Lossless') != -1)
		{
			if(rows[i].cells[1].innerHTML.indexOf('100%') != -1)
			{
				rows[i].style.backgroundColor = flac100;
			}
			else
			{
				rows[i].style.backgroundColor = flac;
			}
		}
		else if (rows[i].cells[1].innerHTML.indexOf('MP3 / V0 (VBR)') != -1)
		{
			rows[i].style.backgroundColor = mp3v0;
		}
		else if (rows[i].cells[1].innerHTML.indexOf('MP3 / V2 (VBR)') != -1)
		{
			rows[i].style.backgroundColor = mp3v2;
		}
		else if (rows[i].cells[1].innerHTML.indexOf('MP3 / 320') != -1)
		{
			rows[i].style.backgroundColor = mp3320;
		}
		else
		{
			rows[i].style.backgroundColor = other;
		}
	}
}

window.addEventListener("load", function(e) {
	//Only highlight if grouping is disabled
	if(document.body.innerHTML.indexOf('<tr class="group">') == -1)
	{
        	highlightrows();
	}
	
}, false);