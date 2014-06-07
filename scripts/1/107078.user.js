// ==UserScript==
// @name           ptp-latesttorrents
// @description    Updates the 'Latest Torrents' to scroll through the latest torrents
// 
// @include        http*://passthepopcorn.me/
// @include        http*://passthepopcorn.me/index.php
// ==/UserScript==

var left_arrow_image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAABQCAYAAAAgJ+QsAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAdJJREFUSMedls9KG1EUxn+52lBFCk0hVCgBF26sXQmliTYL38N1360P4AMYMWr/QEuh7aoBCxUibQUVjTXj5pswpDPnHL2bGWZ+zPedb+6594I/3gDbAY63QBYBjyNgS9Dv5IAdXfc8sK1rP/xFC6oDI+AamLPArgr5AJACsn0PbEf8AQwlvWRBy4J+5Q9SNJbkBe35+yzpjgU9Am6AS+ChJf1Kzz8KrgRL/aX7Bl0DTlXIogWuCvox/SJZE8ECw0F/l/SaBT0RdA7MWtK5v0PgnwWa/tJdg54FzoAx0LDANRXyrQpIXtDTYLjjBpJetaBFQaeaPZXS6wV/mQWGJkKKLm0AV+q6eQ/MgE8elOd4EAWbkX0kA04i4E/Bzz3pHd1veGBP96896ReSPopU/kdwy4LGEfk8x92oz7akv3jgA+BCNh5b0tfAvmZ411sAdq3gi2A4+AV5HHn7M8A7Vb/prbiV8mFwejTl80zZmuOrfL70dq5S+TIwPEGWJD20Fq18HAle8Y4K/8lXgb1IZxYbbuCBNeCv4GeWdFaQ73pns/B/70Qbrl5ouIYlPdICWwM2vDPuJPiZQL9vOUVPGu6m7ERQNt4DWQqAPYCZAFgHnt4C4Tt6BkW6/I4AAAAASUVORK5CYII=';

var torrent_box = document.getElementById('last5t');
torrent_box.setAttribute('count', '0');
torrent_box.style.position = 'relative';
var torrent_box_trs = torrent_box.getElementsByTagName('tr');
var poster_tr = torrent_box_trs[0];
poster_tr.style.width = poster_tr.offsetWidth + 'px';
var text_tr = torrent_box_trs[1];
text_tr.style.width = text_tr.offsetWidth + 'px';
var poster_tds = poster_tr.getElementsByTagName('td');
var text_tds = text_tr.getElementsByTagName('td');
var left_arrow = document.createElement('img');
left_arrow.style.position = 'absolute';
left_arrow.setAttribute('direction', 'backward');
left_arrow.style.left = '5px';
left_arrow.style.top = (torrent_box.offsetHeight-80)/2 + 'px';
left_arrow.style.width = '10px';
left_arrow.style.height = '80px';
left_arrow.style.cursor = 'pointer';
left_arrow.src = left_arrow_image;
left_arrow.addEventListener('click', move_torrents, false);
torrent_box.appendChild(left_arrow);
var right_arrow = document.createElement('img');
right_arrow.style.position = 'absolute';
right_arrow.setAttribute('direction', 'forward');
right_arrow.style.right = '5px';
right_arrow.style.top = (torrent_box.offsetHeight-80)/2 + 'px';
right_arrow.style.width = '10px';
right_arrow.style.height = '80px';
right_arrow.style.cursor = 'pointer';
right_arrow.src = left_arrow_image;
right_arrow.style.MozTransform = 'rotate(-180deg)';
right_arrow.addEventListener('click', move_torrents, false);
torrent_box.appendChild(right_arrow);

add_tds();

function move_torrents()
{
	var torrent_box_trs = torrent_box.getElementsByTagName('tr');
	var poster_tr = torrent_box_trs[0];
	var text_tr = torrent_box_trs[1];
	var poster_tds = poster_tr.getElementsByTagName('td');
	var text_tds = text_tr.getElementsByTagName('td');
	var count = torrent_box.getAttribute('count') | 0;

	if(this.getAttribute('direction') == 'forward')
	{
		if(count+5 > poster_tds.length-1)
		{
			return;
		}
		poster_tds[count].style.display = 'none';
		text_tds[count].style.display = 'none';
		poster_tds[count+5].style.display = '';
		text_tds[count+5].style.display = '';
		torrent_box.setAttribute('count', count+1);
	}
	else
	{
		if(count<1)
		{
			return;
		}
		poster_tds[count-1].style.display = '';
		text_tds[count-1].style.display = '';
		poster_tds[count+4].style.display = 'none';
		text_tds[count+4].style.display = 'none';
		torrent_box.setAttribute('count', count-1);
	}
}

function add_tds()
{
	var url = document.URL.match(/https/) ? 'https' : 'http';
	url += '://passthepopcorn.me/torrents.php';

	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(responseDetails)
		{
			var torrent_box_trs = torrent_box.getElementsByTagName('tr');
			var torrent_table = responseDetails.responseText.split('id="torrent_table">')[1].split('</table>')[0];
			var table = document.createElement('table');
			table.innerHTML = torrent_table;
			var torrent_row = table.getElementsByClassName('group');
			for(var x=5; x<torrent_row.length; x++)
			{
				var poster_tr = torrent_box_trs[0];
				var text_tr = torrent_box_trs[1];

				var torrent_link = torrent_row[x].getElementsByTagName('a')[1].href;
				var torrent_title = torrent_row[x].getElementsByTagName('a')[1].innerHTML;
				var torrent_img = torrent_row[x].getElementsByTagName('img')[0].src;
				var torrent_fulltitle = torrent_row[x].getElementsByTagName('td')[1].innerHTML.split(/<span/)[0].replace(/(<([^>]+)>)/ig,"");
				var exact_time = torrent_row[x].getElementsByTagName('td')[2].getElementsByTagName('span')[0].title;
				var relative_ago = torrent_row[x].getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerHTML;

				var new_poster = document.createElement('td');
				new_poster.width = '20%';
				new_poster.style.display = 'none';
				var new_poster_center = document.createElement('center');
				var new_poster_link = document.createElement('a');
				new_poster_link.href = torrent_link;
				new_poster_link.alt = torrent_title;
				var new_poster_img = document.createElement('img');
				new_poster_img.style.padding = '0';
				new_poster_img.style.marging = '0';
				new_poster_img.src = torrent_img;
				new_poster_img.title = torrent_fulltitle;
				new_poster_center.appendChild(new_poster_link);
				new_poster_link.appendChild(new_poster_img);
				new_poster.appendChild(new_poster_center);
				poster_tr.appendChild(new_poster);
				
				var new_text = document.createElement('td');
				new_text.style.display = 'none';
				var new_text_center = document.createElement('center');
				var new_text_link = document.createElement('a');
				new_text_link.href = torrent_link
				var new_text_strong = document.createElement('strong');
				new_text_strong.innerHTML = torrent_title;
				var new_text_br = document.createElement('br');
				var new_text_span = document.createElement('span');
				new_text_span.title = exact_time;
				new_text_span.innerHTML = relative_ago;
				new_text_center.appendChild(new_text_link);
				new_text_link.appendChild(new_text_strong);
				new_text_center.appendChild(new_text_br);
				new_text_center.appendChild(new_text_span);
				new_text.appendChild(new_text_center);
				text_tr.appendChild(new_text);
			}
		}
	});

}
/*
var new_poster = document.createElement('td');
new_poster.width = '20%';
new_poster.innerHTML = '<center><a alt="Guan yun chang AKA The Lost Bladesman" href="torrents.php?id=45002&torrentid=93546"><img style="padding: 0; margin: 0;" src="http://ptpimg.me/9z6g55.jpg" title="Guan yun chang AKA The Lost Bladesman [2011] by Felix Chong and Alan Mak"></a></center>';
new_poster.style.display = 'none';
poster_tr.appendChild(new_poster);

var new_text = document.createElement('td');
new_text.innerHTML = '<center><a href="torrents.php?id=45002&torrentid=93546"><strong>Guan yun chang AKA The Lost Bladesman</strong></a><br /><span title="Jul 18 2011, 08:20">1 min ago</span><br /><a href="user.php?id=516">ScreaminJay</a></center>';
new_text.style.display = 'none';
text_tr.appendChild(new_text);
*/
