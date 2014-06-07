// ==UserScript==
// @name          Cheggit Re-Color
// @namespace     ExtraSpicyBurrito
// @description	  Changes the color of torrents based on number of seeders.
// @include        http://cheggit.net/browsetorrents.php
// @include        http://cheggit.net/browsetorrents.php?*
// @include        http://cheggit.net/torrents.php
// @include        http://cheggit.net/torrents.php?*
// ==/UserScript==

// Original script by SpicyBurrito!

// Thresholds and Colors
//  # Seeds < bad gets colored badColor
//  # Seeds >= good < great gets colored goodColor
//  # Seeds >= great gets colored grtColor
var bad = 1;
var good = 100;
var great = 200;

badColor = '#FFD2D2';
goodColor = '#D2FFD2';
grtColor = '#FFFF96';

img_bang = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAABuCAYAAABPw7GSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNDODc3NEU4QzEwMjExRTA5NTA4RkFCQ0E1OUIxNkNFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNDODc3NEU5QzEwMjExRTA5NTA4RkFCQ0E1OUIxNkNFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0M4Nzc0RTZDMTAyMTFFMDk1MDhGQUJDQTU5QjE2Q0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0M4Nzc0RTdDMTAyMTFFMDk1MDhGQUJDQTU5QjE2Q0UiLz4gPC9yZGY6RGVzY3JpcHRpb24%2BIDwvcmRmOlJERj4gPC94OnhtcG1ldGE%2BIDw%2FeHBhY2tldCBlbmQ9InIiPz4OKJPBAAADNElEQVR42uxa26rqMBCd1lFB8MEHf8Anv08%2FVvwE8YKIIN73mcKUtCY2bZNJ9j4NhCpesjJrMrMmSbJYLN4QUcP9fg%2B32w3SNIUkSbIu2d7vd9ZfrxcMBgPA9XoN5%2FMZhsMh9Pt96PV6GTiJRiCezyfc73e4Xq8wHo8Bj8cjnE4nGI1GGUICVRdQU6sSIAZzuVzg8XgA0uCImHUCw1aSaGQdoouezAzS7OgFd0nKGBSPnWGByFp0gFBdeuXXPhzZClDT%2BNGmmSYUjDITK%2FH5UBmlyYekUgqG9hlnTu1iEZQZoWe8cUiHWDL%2BNKbMty9hiPhjikWFONR25l4os%2FEh3%2FkNfS9tm%2FSh%2Fi7O1KHrIaRHY8p8Ln0MQYspoVNH0wchMr21hdpQVHcyKEVP1bLXKsa2gdErZVKCTIwymwnp2Ejr1GJdcg2ZXOOty0zhXJoqp5Q19Tnd76KgTAVmlVy77ZiQ2zFlVlBXJ5lmL6GLUIqmX7X7ob5PTSE8Kj0USgt5o8x2Qr8vuXaVa8yVa546YtLTTjW1K79C6aVeVQYhHzHSeSfNkt6rR5zqzG1et83%2BOSA6jGVAdDjbFFAZ3Lfv6ayKqtkIiOmLVb7TBDgfkxM7fCCMroR6098zOx%2BAXJTUdX1Jd4jXbQtbxaG2Au1vV66h89hHGeRqlf3ZXJY2re190dftwlZVHdrbMaEEvrHqkBL4WguxBKArV%2FSU2uVgQDQmdcKRCzQGpWoiCSdWx2ZQyJqEwfDlNCkL0ZiqQXKnZk0tfduTqVKdOnEl0Jo0uvZaWGXT6TQuPTSfz2E2m8UDKDYLdTc9O0AukmtQUb1cLouAttttHpyk7%2BOXFUR2J3%2B1WsHhcChcsg6ROug5mUwAd7sdbDabbE9I%2BrY5A%2BJsTx3VhKrbWvGpn7OzjX8G4BxK%2F4P8hyoYScoYCI%2F9VVNL6qLKMihUKYQSM7exjLYMCl0C1baQBIWiZx3lCVmdSkttuziz0H9zn7oQh2K4%2Bl7bQlIb6hhidX1bZfGfSkvlLK%2BUudw4R1MElQwDxuTK%2B0PSEvYjdTAYPk2UVowqKGSUkvKVx1DpYgyomi5EbVb21x8BBgClsQSUPA%2BA7gAAAABJRU5ErkJggg%3D%3D';

// Add new css styles based on good/bad/great colors
addGlobalStyle('tr.hiliteG td { background: ' + goodColor + '; }');
addGlobalStyle('tr.hiliteGS td { background: ' + goodColor + '; text-decoration: line-through; }');
addGlobalStyle('tr.hiliteB td { background: ' + badColor + '; }');
addGlobalStyle('tr.hiliteBS td { background: ' + badColor + '; text-decoration: line-through; }');
addGlobalStyle('tr.hiliteGr td { background: ' + grtColor + '; }');
addGlobalStyle('tr.hiliteGrS td { background: ' + grtColor + '; text-decoration: line-through; }');

//This block does the searching for torrents page
var tables = document.getElementsByTagName('table');
for (var t=0; t<tables.length; t++) {  // Mulitple tables per page
  if(tables[t].className == "torrentlist" ){ // Bail if table is not classed as torrentlist
    for (var i=1; i<tables[t].rows.length; i++) { //Go through all the rows
      var row=tables[t].rows[i];  //Get the current row
      if(row.cells[5]) { //cells[5] is the 6 column, which is the seed column 
		if(row.cells[5].innerHTML<bad){  //If it has less than 'bad' seeds
		  if(row.className.match(/.*hilite1.*/)){ // Tag uploader with ! if thug/peddler
			row.cells[7].innerHTML = row.cells[7].innerHTML + ' <img "padding-right: 6px;" height="20px" src="'+img_bang+ '">';
		  }
		  if(row.className.match(/^tablerow1.*/)){ // Check for tablerow1/2 and change row color
			if(row.className.match(/.*hilite3.*/)){ // Check for strikethrough style
			  row.className = "tablerow1 hiliteBS tabletext";
			} else {
			  row.className = "tablerow1 hiliteB tabletext";
			}
		  } else {
		    if(row.className.match(/.*hilite3.*/)){ // Check for strikethrough style
			  row.className = "tablerow2 hiliteBS tabletext";
			} else {
		      row.className = "tablerow2 hiliteB tabletext";
			}
		  }
        } else if(row.cells[5].innerHTML>=good && row.cells[5].innerHTML< great){  //If it has more than 'good' seeds
          if(row.className.match(/.*hilite1.*/)){ // Tag uploader with ! if thug/peddler
			row.cells[7].innerHTML = row.cells[7].innerHTML + ' <img "padding-right: 6px;" height="20px" src="'+img_bang+ '">';
		  }
		  if(row.className.match(/^tablerow1.*/)){ // Check for tablerow1/2 and change row color
			if(row.className.match(/.*hilite3.*/)){ // Check for strikethrough style
			  row.className = "tablerow1 hiliteGS tabletext";
			} else {
			  row.className = "tablerow1 hiliteG tabletext";
			}
		  } else {
		    if(row.className.match(/.*hilite3.*/)){ // Check for strikethrough style
			  row.className = "tablerow2 hiliteGS tabletext";
			} else {
		      row.className = "tablerow2 hiliteG tabletext";
			}
		  }
        } else if (row.cells[5].innerHTML>=great){  //If it has more than 'great' seeds
          if(row.className.match(/.*hilite1.*/)){ // Tag uploader with ! if thug/peddler
			row.cells[7].innerHTML = row.cells[7].innerHTML + ' <img "padding-right: 6px;" height="20px" src="'+img_bang+ '">';
		  }
		  if(row.className.match(/^tablerow1.*/)){ // Check for tablerow1/2 and change row color
			if(row.className.match(/.*hilite3.*/)){ // Check for strikethrough style
			  
			  row.className = "tablerow1 hiliteGrS tabletext";
			} else {
			 row.className = "tablerow1 hiliteGr tabletext";
		    }
		  } else {
		    if(row.className.match(/.*hilite3.*/)){ // Check for strikethrough style
			  row.className = "tablerow2 hiliteGrS tabletext";
			} else {
		      row.className = "tablerow2 hiliteGr tabletext";
			}
		  }
        }
	  }
    }
  }
}

// This block changes the color of the torrent info box on the actual torrent page
var InfoDiv = document.getElementById('info');
var list = InfoDiv.getElementsByTagName('li');
var rx = /^Seeders:\s*(\d+)/;

for (var l=0; l< list.length;l++){
	var seederCntArry = rx.exec(list[l].innerHTML);
	if( seederCntArry ){
		//alert(InfoDiv.style.backgroundColor);
		if(seederCntArry[1]<bad){  //If it has less than 'bad' seeds
			InfoDiv.style.backgroundColor = badColor;
        } else if(seederCntArry[1]>=good && seederCntArry[1]< great){  //If it has more than 'good' seeds
			InfoDiv.style.backgroundColor = goodColor;
        } else if (seederCntArry[1]>=great){  //If it has more than 'great' seeds
			InfoDiv.style.backgroundColor = grtColor;
        }
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
