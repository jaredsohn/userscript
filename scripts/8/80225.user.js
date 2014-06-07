// ==UserScript==
// @name           AllReinforcingBalance
// @namespace      Travian
// @include        http://*.travian.*/dorf3.*
// ==/UserScript==
window.addEventListener('load', main, false);
function main()
{	//create a link on dorf3 page
	var node = document.getElementById('textmenu');
	if(node)
	{	var place_holder = document.createTextNode(' | ');
		var run_link = document.createElement('a');
			run_link.innerHTML = 'Balance';
			run_link.href = '#';
			run_link.addEventListener('click',run, false);
		node.appendChild(place_holder);
		node.appendChild(run_link);
	}
}
function run()
{	//capture all newdid's for jumping
	var vil_table = document.getElementById('vlist').getElementsByClassName('link');
	var vil_ids = new Array();
	for(var i = 0;i<vil_table.length;i++)
	{
		vil_ids[i] = parseInt(vil_table[i].innerHTML.split('newdid=')[1]);
	}
	if(vil_ids.length>0)
	{
		start_jumping(vil_ids);
	}
}
function start_jumping(vil_array,id_array)
{	if(vil_array.length>0)
	{
		var id = vil_array.shift();
		//http://speed.travian.de/build.php?id=39&k
		var url = 'http://'+location.host+'/build.php?id=39&k&newdid='+id;
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(responseDetails){
			source = responseDetails.responseText;
			source = source.split('<div id="textmenu">')[1].split('<div id="side_info">')[0];
			var player_ids = source.split('<a href="spieler.php?uid=');
			var ids = new Array();
			var found = false;
			for(var i = 1;i<player_ids.length;i++)
			{	player_ids[i] = parseInt(player_ids[i]);
				
				ids.push(parseInt(player_ids[i]));
			}
			ids.sort();
			ids = ids.concat(id_array);
			start_jumping(vil_array,ids)
			}});
	}
	else
	{	sort_them(id_array);
	}
}
function sort_them(player_ids)
{	var ids = new Array();
	var found = false;
	for(var i=0;i<player_ids.length;i++)
	{	found = false;
		for(var j=0;j<ids.length;j++)
		{	if(player_ids[i]==ids[j])
			{	found = true;
			}
		}
		if(found == false)
		{	ids.push(player_ids[i]);	
		}
	}
	create_table(ids);
}
function create_table(ids)
{	var table = document.getElementById('content').getElementsByTagName('table')[0];
	table.innerHTML = '';
	table.id = 'balance';
	fill_table(ids);
}
function fill_table(ids)
{	if(ids.length>0)
	{	var id = ids.shift();
		var url = 'http://'+location.host+'/manual.php?s='+id+'&typ=7';
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(responseDetails){
				source = responseDetails.responseText;
				var name = source.split('->')[1].split('</th>')[0];
				name = '<a href="http://'+location.host+'/spieler.php?uid='+id+'">'+name+'</a>';
				var sum = parseInt(source.split('<tr><td colspan="2"></td></tr>')[1].split('<td>')[2]);
				document.getElementById('balance').innerHTML += '<tr><td>'+name+'</td><td>'+sum+'</td></tr>';
				fill_table(ids);	
			}});
	}
}
