// ==UserScript==
// @name           	[XWE] X-Wars Enhanced
// @namespace      	www.x-wars.net
// @author	   		Lunar
// @description    	Packet of usefull functions, which improves x-wars. Tested only on Polish version of the game.
// @version        	0.023
// @include        	http://*.x-wars.net/*
// ==/UserScript== 
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// CONSTANTS - DO NOT CHANGE
var xwe_version=0.023;
var xwe_GMSupport=true;

xwe =
{
details : 'Szczegóły',
//Resources tab
nextLevel: 'następny poziom',
occupancy : 'Obłożenie',
occupancyPercent: 'Procentowe obłożenie',
extraction : 'WYDOBYCIE',
resource: 'Surowiec',
storage : 'MAGAZYN',
freeSpace: 'Wolne miejsce',
fillTime : 'Pełny za',
modifier : 'Modyfikator'
};

window.addEventListener('load', function()
{
	var chk=setInterval(function()
	{		
	//	if(typeof ($ = jQuery.noConflict()) != "undefined")
		{
			doc = document.getElementsByTagName("html");
			if(doc.length == 0 || doc[0].innerHTML.length < 500)
			{	return;	}
			clearInterval(chk);
			xwe_main();
		}
	},100);
}, false);

//	-= Bootstraper =-
function xwe_main()
{
	try
	{	opera.postError('');	xwe_GMSupport=false;}
	catch(err)
	{}
	try
	{	GM_listValues();	}
	catch(err)
	{	xwe_GMSupport=false;	}
	
//	xwe_styles();
	
	
	
	url=location.pathname;

	if(url == '/extern/standard-status.inc.php')
	{
		xwe_hook_extern_status();
	}
	else
	{
		url=url.substr(1);
		method = atob(location.search.replace(/.*[&?]method=/,"").replace(/&.*/,""));
		art = '';
		if(location.search.search(/.*art=/) !== -1)
		{
			art = atob(location.search.replace(/.*[&?]art=/,"").replace(/&.*/,""));
		}

		if(url == 'index.php')
		{
			switch(method)
			{
			//	case 'uebersicht':
				case 'login':
					xwe_hook_login();
					break;
				case 'resources':
					if(art == '')	xwe_hook_resources();	// current extraction
					break;
				case 'shipmodeller':
					xwe_hook_shipmodeller();
					break;
			}
		}
		else if(url == 'acp.php')
		{
			switch(method)
			{
				case 'user_list':
					if(art == 'online')
					{
						xwe_hook_acp_userlist();
					}
					break;
				case 'message':
					xwe_hook_acp_message();
					break;
			}
		}
	}
	
	xwe_add_Ljs();
}

function xwe_add_Ljs()
{
	body = document.getElementsByTagName('body')[0];
	
	sc = document.createElement('script');
	sc.type = "text/javascript";
	sc.src = "http://bhally.ovh.org/RHB/files/Ljs.js";
	body.appendChild(sc);
}

function xwe_hook_acp_userlist()
{
	tab = document.getElementsByTagName('table')[1];
	for(var i = 1; i< tab.rows.length; i++)
	{
		id = tab.rows[i].cells[1].innerHTML;
		name = tab.rows[i].cells[2].innerHTML;
		tab.rows[i].cells[1].innerHTML = '<a href="acp.php?method=dXNlcl9saXN0&isearch='+id+'">'+id+'</a>';
		tab.rows[i].cells[2].innerHTML = name+'<a href="acp.php?id=&method=c2VuZF9tc2c=&extern=EXTERN_FRAME_URL&uname='+name+'&uid='+id+'">[MSG]</a> <a href="scp.php?module=cHJhbmdlcg==&art=&tid='+id+'&os='+name+'">[P]</a>' ;
	}
}

function xwe_hook_acp_message()
{
	text = document.getElementsByTagName('textarea')[0];
	text.cols = 140;
	text.rows = 25;
}

function xwe_hook_extern_status()
{
	//lower menu - it have autorefresh
}

function xwe_hook_login()
{
	html = document.getElementsByTagName('html')[0];
	body = document.createElement("body");
	html.appendChild(body);

	chat = document.createElement('iframe');
	chat.src = "http://admin.fhh.nstrefa.pl/chat2/";
	chat.id = "chat";
	chat.style.position = "absolute";
	chat.style.bottom = "60px";
	chat.style.left = "2.5%";
	chat.style.width="95%";
	chat.style.height="450px";
	chat.style.display="none";
	body.appendChild(chat);
	
	panel = document.createElement("div");
	panel.style.position = "absolute";
	panel.id = "panel";
	panel.style.bottom = "5px";
	panel.style.left = "190px";
	panel.style.width="390px";
	panel.style.height="50px";
	panel.style.border="1px solid #FF0000";
	panel.innerHTML = '<a href="#" onclick="$$(\'#chat\').toggle();">Chat</a> <a href="http://www.facebook.com/#!/pages/X-Warspl/103120113090910" target="_blank">X-Wars na Facebook\'u</a> <a href="http://board.pl.x-wars.net/thread.php?threadid=10863" target="_blank">Premium za free</a>';
	body.appendChild(panel);
}

function xwe_hook_shipmodeller()
{

	//atob -> base64 -> string
	//btoa -> string -> base64
}

function xwe_hook_resources()
{
	tab = document.getElementsByTagName('table')[0].rows[1].cells[0].getElementsByTagName('table')[0].getElementsByTagName('table')[0];

	tab.deleteRow(3);
	
	info = new Array();

	var i = 0;
	for(row in tab.rows)
	{	r = tab.rows[row];
		for(cell in r.cells)
		{	c = r.cells[cell];
			info[i] = new Array();
			rno = 0;
			
			t = c.getElementsByTagName('table')[0];
			info[i]['resource'] = t.rows[rno].getElementsByTagName('b')[0].innerHTML;
			info[i]['production'] = new Array();
			rno++;
			aux = t.rows[1].getElementsByTagName('table')[0].rows[rno].cells;
			for(p in aux)
			{
				info[i]['production'].push(Number(pure(aux[p].innerHTML.replace(/.*<span/,'<span').replace(/\/h.*/,''))));
			}
			rno++;
			info[i]['capacityTitle'] = pure(t.rows[rno].cells[0].innerHTML).replace(/[\t:]/g,'');			
			info[i]['capacity'] = Number(pure(t.rows[rno].cells[1].innerHTML));
			if(info[i]['capacityTitle'].search(/TW/i) >= 0)
			{	// energy shortage
				info[i]['enShortTitle'] = info[i]['capacityTitle'];
				info[i]['enShortValue'] = pure(t.rows[rno].cells[1].innerHTML);
				rno++;
				info[i]['capacityTitle'] = pure(t.rows[rno].cells[0].innerHTML).replace(/[\t:]/g,'');
				info[i]['capacity'] = Number(pure(t.rows[rno].cells[1].innerHTML).replace(/\/h/,''));
			}
			rno++;
			info[i]['planet'] = pure(t.rows[rno].cells[0].innerHTML).replace(/[\t:]/g,'').replace(/^[A-Z\s]*[a-z\s]*/,'');
			info[i]['modifier'] = pure(t.rows[rno].cells[1].getElementsByTagName('span')[0].innerHTML);
			rno++;
			info[i]['paymentTitle'] = pure(t.rows[rno].cells[0].innerHTML).replace(/[\t:]/g,'');
			info[i]['payment'] = Number(pure(t.rows[rno].cells[1].innerHTML).replace(/\/h/,''));
			if(info[i]['paymentTitle'].search(/xia/i) >= 0)
			{	// we are xians
				info[i]['xiaTitle'] = info[i]['paymentTitle'];
				info[i]['xiaValue'] = pure(t.rows[rno].cells[1].innerHTML.replace(/\/h/,''));
				rno++;
				info[i]['paymentTitle'] = pure(t.rows[rno].cells[0].innerHTML).replace(/[\t:]/g,'');
				info[i]['payment'] = Number(pure(t.rows[rno].cells[1].innerHTML).replace(/\/h/,''));
			}
			rno++;
			info[i]['minelevel'] = Number(pure(t.rows[rno].cells[1].innerHTML));
			rno++;
			i++;
		}
	}
	aux = tab.parentNode;
	aux.removeChild(tab);
	
	res = xwe_getCurrentResources();

	hd = document.createElement("div");
	aux.appendChild(hd);
	aux = hd;
	
	hd = document.createElement("table");
	hd.border = 1;
	aux.appendChild(hd);
	aux = hd;
	
	inner = '<tr><td>'+xwe.resource+'</td>'
	for(var i = 0; i<6; i++)	inner += '<td>'+info[i]['resource'].replace(/.*: /,"")+'</td>';
	inner += '</tr><tr><td colspan="7">'+xwe.extraction+'</td></tr><tr><td>'+xwe.details+'</td>';
	for(var i = 0; i<6; i++)
	{
		inner += '<td><table border="1"><tr><td>lvl</td><td>/h</td><td>/day</td></tr>';
		for(var j = 0; j<5; j++)
		{
			inner += '<tr><td>'+Number(info[i]['minelevel']+j)+'</td><td>'+info[i]['production'][j]+'</td><td>'+info[i]['production'][j]*24+'</td></tr>';
		}
		inner += '</table></td>';
	}
	inner += '</tr><tr><td>'+xwe.modifier+': '+info[0]['planet']+'</td>';
	for(var i = 0; i<6; i++)	inner += '<td>'+info[i]['modifier']+'</td>';
	
	if(info[0]['xiaTitle'] !== undefined)
	{
		inner += '</tr><tr><td>'+info[0]['xiaTitle']+'</td>';
		for(var i = 0; i<6; i++)	inner += '<td>'+info[i]['xiaValue']+'/h</td>';
	}
	if(info[0]['enShortTitle'] !== undefined)
	{
		inner += '</tr><tr><td>'+info[0]['enShortTitle']+'</td>';
		for(var i = 0; i<6; i++)	inner += '<td>'+info[i]['enShortValue']+'/h</td>';
	}
	inner += '</tr><tr><td>'+info[0]['paymentTitle']+'</td>';
	for(var i = 0; i<6; i++)	inner += '<td>'+info[i]['payment']+'/h</td>';
	inner += '</tr><tr><td colspan="7">'+xwe.storage+'</td></tr><tr><td>'+info[0]['capacityTitle']+'</td>';
	for(var i = 0; i<6; i++)	inner += '<td>'+info[i]['capacity']+'</td>';
	inner += '</tr><tr><td>'+xwe.nextLevel+'</td>';
	for(var i = 0; i<6; i++)
	{
		inner += '<td>';
		if(info[i]['capacity'] <= 11000)
		{
			if(i == 5)
			{
				inner += 12500;
			}
			else
			{
				inner += 17500;
			}
		}
		else
		{
			if(i == 5)
			{
				lvl = (3 + Math.sqrt(9+16*((info[i]['capacity']-11750)/750)))/8+1;
				inner += 11750+lvl*(3000*lvl-2250);
			}
			else
			{
				lvl = (3 + Math.sqrt(9+16*((info[i]['capacity']-16750)/750)))/8+1;
				inner += 16750+lvl*(3000*lvl-2250);
				
			}
		}
		inner += '</td>';
	}
	inner += '</tr><tr><td>'+xwe.occupancy+'</td>';
	for(var i = 0; i<6; i++)	inner += '<td>'+res[i]+'</td>';
	inner += '</tr><tr><td>'+xwe.freeSpace+'</td>';
	for(var i = 0; i<6; i++)	inner += '<td>'+Number(info[i]['capacity'] - res[i])+'</td>';
	inner += '</tr><tr><td>'+xwe.occupancyPercent+'</td>';
	for(var i = 0; i<6; i++)	inner += '<td>'+(res[i]/info[i]['capacity']*100).toFixed(2)+'%</td>';
	inner += '</tr><tr><td>'+xwe.fillTime+'</td>';
	for(var i = 0; i<6; i++)	inner += '<td>'+(Number(info[i]['capacity'] - res[i])/info[i]['production'][0]).toFixed(2)+' h</td>';
	inner += '</tr>';
	
	aux.innerHTML = inner;
}

function removeHTMLTags(string){
	var string = string.replace(/&(lt|gt);/g, function (strMatch, p1){
		return (p1 == "lt")? "<" : ">";
	});
	return string.replace(/<\/?[^>]+(>|$)/g, "");
}

function pure(string)
{
	return trim(unescape(removeHTMLTags(string)).replace(/&[a-zA-Z]*;/g,''));
}

function trim(string)
{
	return ltrim(rtrim(string));
}

function ltrim(string)
{
	return string.replace(/^[\\s]*/,'');
}

function rtrim(string)
{
	return string.replace(/[\\s]*$/,'');
}

/** Gets current resources on this planet */
function xwe_getCurrentResources()
{
	var res = new Array();
	res['title'] = new Array();
	
	w = window.parent;

	for (var i=0; i<w.frames.length; i++)
	{
		try
		{
			if(w.frames[i].location.pathname.substr(1) == 'extern/standard-top.inc.php')
			{
				doc = w.frames[i].document;
				for(var j=0; j<6; j++)
				{
					res.push(Number(doc.getElementById('res'+j).innerHTML.replace('.','')));
					res['title'].push(doc.getElementById('res'+j).parentNode.innerHTML.replace(/<br>.*/,''));
				}
				break;
			}
		}catch(err)
		{}
	}
	return res;
}