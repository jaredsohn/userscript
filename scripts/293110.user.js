// ==UserScript==
// @name        CheckPlayers in GT v2
// @namespace   Gvd-gt
// ==UserScript==
// @name        CheckPlayers in GT v2
// @namespace   Gvd-gt
// @description CheckPlayers in GT v2
// @version     1
// @include     http://www.heroeswm.ru/home.php*
// /*@exclude     http://www.heroeswm.ru/pvp_guild.php*/
// ==/UserScript==

//TODO: exclude battles/cards and other non-used pages

var url_cur = location.href;
var guild_page = 'http://www.heroeswm.ru/pvp_guild.php';

var src_icon = 'http://dcdn.heroeswm.ru/i/s_attack.gif';
var player_icon = '<img align=left src="' + src_icon + '" width=20 height=20 border=0 title="Игрок в ГТ, догоняй Геофизика" alt="Игрок в ГТ, догоняй Геофизика">';
var player_icon_td = '<a href="pvp_guild.php">' + player_icon +'</a>';

var isPlayer = 'Игрок[18]';

var ok_status = 200;
	
if(url_cur.indexOf(guild_page) == -1)
{ 
  check_players();
}

function check_players()
{
  var response = get_page_content(guild_page);

  if(response.indexOf(isPlayer) != -1)
    show_icon();
}

function get_page_content(url) 
{
  var xmlhttp = get_xmlHttp();

  xmlhttp.open('GET', url, false);
  xmlhttp.overrideMimeType('text/plain; charset=windows-1251');

  xmlhttp.send(null);

  if(xmlhttp.status == ok_status)
    return xmlhttp.responseText;
    
  return '';
}


function get_xmlHttp()
{
  var xmlhttp;

  try 
  {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } 
  catch(e) 
  {
    try 
    {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } 
    catch(e) 
    {
     xmlhttp = false;
    }
  }

  if(!xmlhttp && typeof XMLHttpRequest != 'undefined') 
  {
    xmlhttp = new XMLHttpRequest();
  }
 
  return xmlhttp;
}

function show_icon()
{
  var b_elements = document.getElementsByTagName('b');

  for(var i = 0; i < b_elements.length; ++i)
  { 
    if(b_elements[i].textContent == 'Битвы')
    {
      var td = document.createElement('td');
      td.innerHTML = player_icon_td;
      b_elements[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(td);
    }
  }
}