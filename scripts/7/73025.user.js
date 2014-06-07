// ==UserScript==
// @name          DS Ranking Links
// @namespace     c1b1.de
// @include       http://*.die-staemme.de/*screen=info_player*
// @include       http://*.die-staemme.de/*screen=info_ally*
// @include       http://*.die-staemme.de/*screen=ranking*mode=player*
// @exclude       http://forum.die-staemme.de/*
// ==/UserScript==


/*
ds.rankingLink.user.js

DS Ranking Links

Version 1.4

(c) by C1B1SE
         info@c1b1.de
         http://c1b1.de

Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.
You may change string values if it's necessary for your language area.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.

Thread url:
http://forum.die-staemme.de/showthread.php?t=96591

*/

var url = document.location.href;
if(url.indexOf('screen=info_player') != -1)
  {

  // h:

  var h = findByInner(document,'In Stamm einladen')[0];
  if(h)
    {
    var leer = h.href.split('=');
    var egal = leer.pop();
    //GM_setValue('h',h.href.split('=').pop());
    GM_setValue('h',leer.pop());
    }


  var player_name = document.getElementsByTagName('h2')[0].firstChild.data.substring(8);

  var td = findByInner(document,'Rang:')[0];

  var tribe_name = findByInner(document,'Stamm:')[0].nextSibling.getElementsByTagName('a')[0];
  if(!tribe_name)
    tribe_name = false;
  else
    {
    var tribe_id = tribe_name.href.split('=').pop();
    tribe_name = tribe_name.firstChild.data;
    }

  var a = document.createElement('a');
  a.setAttribute('href','#');
  a.setAttribute('title','Links zu den Ranglisten');
  a.addEventListener('click',function(e) {
    if(document.getElementById('ranking_links_div'))
      return false;
    var div = document.createElement('div');
    div.setAttribute('id','ranking_links_div');
    div.setAttribute('style','border:2px black solid; padding:2px 5px 5px; position:absolute; left:'+(e.pageX-12)+'px; top:'+(e.pageY-12)+'px; background:url(/graphic/background/bg-tile.jpg); ');
    document.addEventListener('click',function(e) {
      if(document.getElementById('ranking_links_div'))
        {
        var found = false;
        var e = e.target;
        while(e)
          {
          if((e.id && e.id == 'ranking_links_div') || (e.tagName && e.tagName == 'A'))
            {
            found = true;
            break;
            }
          else
            e = e.parentNode;
          }
        if(!found)
          document.getElementById('ranking_links_div').parentNode.removeChild(document.getElementById('ranking_links_div'));
        }
      },false);

    var table = document.createElement('table');
    table.setAttribute('class','vis');

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode('Ranglisten:'));
    tr.appendChild(th);
    table.appendChild(tr);

    var tr0 = document.createElement('tr');
    var td0 = document.createElement('td');
    var a0 = document.createElement('a');
    a0.setAttribute('href','#');
    a0.addEventListener('click',function() { go2Ranking(player_name,'player'); },false);
    a0.appendChild(document.createTextNode('Spieler'));
    td0.appendChild(a0);
    tr0.appendChild(td0);
    table.appendChild(tr0);

    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var a1 = document.createElement('a');
    a1.setAttribute('href','#');
    a1.addEventListener('click',function() { go2Ranking(player_name,'con_player'); },false);
    a1.appendChild(document.createTextNode('Kontinent Spieler'));
    td1.appendChild(a1);
    tr1.appendChild(td1);
    table.appendChild(tr1);

    var tr2 = document.createElement('tr');
    var td2 = document.createElement('td');
    var a2 = document.createElement('a');
    a2.setAttribute('href','#');
    a2.addEventListener('click',function() { go2Ranking(player_name,'kill_player&type=att'); },false);
    a2.appendChild(document.createTextNode('Besiegte Gegner als Angreifer'));
    td2.appendChild(a2);
    tr2.appendChild(td2);
    table.appendChild(tr2);

    var tr3 = document.createElement('tr');
    var td3 = document.createElement('td');
    var a3 = document.createElement('a');
    a3.setAttribute('href','#');
    a3.addEventListener('click',function() { go2Ranking(player_name,'kill_player&type=def'); },false);
    a3.appendChild(document.createTextNode('Besiegte Gegner als Verteidiger'));
    td3.appendChild(a3);
    tr3.appendChild(td3);
    table.appendChild(tr3);

    var tr4 = document.createElement('tr');
    var td4 = document.createElement('td');
    var a4 = document.createElement('a');
    a4.setAttribute('href','#');
    a4.addEventListener('click',function() { go2Ranking(player_name,'kill_player&type=all'); },false);
    a4.appendChild(document.createTextNode('Besiegte Gegner insgesamt'));
    td4.appendChild(a4);
    tr4.appendChild(td4);
    table.appendChild(tr4);

    if(tribe_name !== false)
      {
      var tr5 = document.createElement('tr');
      var td5 = document.createElement('td');
      var a5 = document.createElement('a');
      a5.setAttribute('href','#');
      a5.addEventListener('click',function() { go2Ranking(tribe_name,'ally'); },false);
      a5.appendChild(document.createTextNode('Stämme'));
      td5.appendChild(a5);
      tr5.appendChild(td5);
      table.appendChild(tr5);

      var tr6 = document.createElement('tr');
      var td6 = document.createElement('td');
      var a6 = document.createElement('a');
      a6.setAttribute('href','#');
      a6.addEventListener('click',function() { go2Ranking(tribe_name,'con_ally'); },false);
      a6.appendChild(document.createTextNode('Kontinent Stämme'));
      td6.appendChild(a6);
      tr6.appendChild(td6);
      table.appendChild(tr6);

      var tr7 = document.createElement('tr');
      var td7 = document.createElement('td');
      var a7 = document.createElement('a');
      a7.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=att&lit_ally_id='+tribe_id);
      a7.appendChild(document.createTextNode('Besiegte Gegner Stämme als Angreifer'));
      td7.appendChild(a7);
      tr7.appendChild(td7);
      table.appendChild(tr7);

      var tr8 = document.createElement('tr');
      var td8 = document.createElement('td');
      var a8 = document.createElement('a');
      a8.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=def&lit_ally_id='+tribe_id);
      a8.appendChild(document.createTextNode('Besiegte Gegner Stämme als Verteidiger'));
      td8.appendChild(a8);
      tr8.appendChild(td8);
      table.appendChild(tr8);

      var tr9 = document.createElement('tr');
      var td9 = document.createElement('td');
      var a9 = document.createElement('a');
      a9.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=all&lit_ally_id='+tribe_id);
      a9.appendChild(document.createTextNode('Besiegte Gegner Stämme insgesamt'));
      td9.appendChild(a9);
      tr9.appendChild(td9);
      table.appendChild(tr9);

      }

    div.appendChild(table);

    var c = String.fromCharCode('0169')+' c1b1.de';

    var span = document.createElement('span');
    span.setAttribute('style','font-size:smaller; float:right; ');
    span.setAttribute('title','DS Ranking Links - Version 1.2 - http://c1b1.de');
    span.appendChild(document.createTextNode(c));
    div.appendChild(span);

    document.getElementsByTagName('body')[0].appendChild(div);
    return false;
    },false);
  a.appendChild(td.firstChild);

  td.appendChild(a);
  }
else if(url.indexOf('screen=info_ally') != -1)
  {
  var td = findByInner(document,'Rang:')[0];

  var tribe_name = findByInner(document,'Tag:')[0].nextSibling.firstChild.data;
  var tribe_id = url.split('=').pop();


  var a = document.createElement('a');
  a.setAttribute('href','#');
  a.setAttribute('title','Links zu den Ranglisten');
  a.addEventListener('click',function(e) {
    if(document.getElementById('ranking_links_div'))
      return false;
    var div = document.createElement('div');
    div.setAttribute('id','ranking_links_div');
    div.setAttribute('style','border:2px black solid; padding:2px 5px 5px; position:absolute; left:'+(e.pageX-12)+'px; top:'+(e.pageY-12)+'px; background:url(/graphic/background/bg-tile.jpg); ');
    document.addEventListener('click',function(e) {
      if(document.getElementById('ranking_links_div'))
        {
        var found = false;
        var e = e.target;
        while(e)
          {
          if((e.id && e.id == 'ranking_links_div') || (e.tagName && e.tagName == 'A'))
            {
            found = true;
            break;
            }
          else
            e = e.parentNode;
          }
        if(!found)
          document.getElementById('ranking_links_div').parentNode.removeChild(document.getElementById('ranking_links_div'));
        }
      },false);

    var table = document.createElement('table');
    table.setAttribute('class','vis');

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode('Ranglisten:'));
    tr.appendChild(th);
    table.appendChild(tr);

    var tr0 = document.createElement('tr');
    var td0 = document.createElement('td');
    var a0 = document.createElement('a');
    a0.setAttribute('href','#');
    a0.addEventListener('click',function() { go2Ranking(tribe_name,'ally'); },false);
    a0.appendChild(document.createTextNode('Stämme'));
    td0.appendChild(a0);
    tr0.appendChild(td0);
    table.appendChild(tr0);

    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var a1 = document.createElement('a');
    a1.setAttribute('href','#');
    a1.addEventListener('click',function() { go2Ranking(tribe_name,'con_ally'); },false);
    a1.appendChild(document.createTextNode('Kontinent Stämme'));
    td1.appendChild(a1);
    tr1.appendChild(td1);
    table.appendChild(tr1);

    var tr2 = document.createElement('tr');
    var td2 = document.createElement('td');
    var a2 = document.createElement('a');
    a2.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=att&lit_ally_id='+tribe_id);
    a2.appendChild(document.createTextNode('Besiegte Gegner Stämme als Angreifer'));
    td2.appendChild(a2);
    tr2.appendChild(td2);
    table.appendChild(tr2);

    var tr3 = document.createElement('tr');
    var td3 = document.createElement('td');
    var a3 = document.createElement('a');
    a3.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=def&lit_ally_id='+tribe_id);
    a3.appendChild(document.createTextNode('Besiegte Gegner Stämme als Verteidiger'));
    td3.appendChild(a3);
    tr3.appendChild(td3);
    table.appendChild(tr3);

    var tr4 = document.createElement('tr');
    var td4 = document.createElement('td');
    var a4 = document.createElement('a');
    a4.setAttribute('href','/game.php?screen=ranking&mode=kill_ally&type=all&lit_ally_id='+tribe_id);
    a4.appendChild(document.createTextNode('Besiegte Gegner Stämme insgesamt'));
    td4.appendChild(a4);
    tr4.appendChild(td4);
    table.appendChild(tr4);

    div.appendChild(table);

    var c = String.fromCharCode('0169')+' c1b1.de';

    var span = document.createElement('span');
    span.setAttribute('style','font-size:smaller; float:right; ');
    span.setAttribute('title','DS Ranking Links - Version 1.2 - http://c1b1.de');
    span.appendChild(document.createTextNode(c));
    div.appendChild(span);

    document.getElementsByTagName('body')[0].appendChild(div);
    return false;
    },false);
  a.appendChild(td.firstChild);

  td.appendChild(a);
  }
else
  {
  var h = GM_getValue('h');

  var igm_image = 'graphic/new_mail.png';
  var invite_image = 'graphic/ally_rights/invite.png';

  var table = document.getElementsByClassName('vis')[1];

  for(var i = 1, elist = table.getElementsByTagName('tr'), len = elist.length; len > i; i++)
    {
    var tds = elist[i].getElementsByTagName('td');
    var player_id = tds[1].getElementsByTagName('a')[0].href.split('=').pop();

    var a1 = document.createElement('a');
    a1.setAttribute('href','/game.php?screen=mail&mode=new&player='+player_id);
    a1.setAttribute('title','Nachricht schicken');
    var img1 = new Image();
    img1.src = igm_image;
    img1.alt = 'Nachricht schicken';
    a1.appendChild(img1);

    var td1 = document.createElement('td');
    td1.appendChild(a1);
    elist[i].appendChild(td1);


    if(h)
      {
       var ab1 = document.createElement('a');
       ab1.alt = player_id;
       ab1.setAttribute('href','/game.php?screen=ally&mode=invite&action=invite_id&h='+h+'&id='+player_id);
       //ab1.setAttribute('href','/game.php?screen=ally&mode=invite&action=invite_id&id='+this.alt+'&h='+h);
       ab1.setAttribute('title','In Stamm einladen');
	
       var img3 = new Image();
       img3.src = invite_image;
       img3.alt = player_id;
       ab1.appendChild(img3);
 

//      var img2 = new Image();
//      img2.src = invite_image;
//      img2.alt = player_id;
//      img2.addEventListener('click',function() {
//        var imgI = new Image();
//        imgI.src = '/game.php?screen=ally&mode=invite&action=invite_id&id='+this.alt+'&h='+h;
//        },false);



      var td2 = document.createElement('td');
      td2.appendChild(ab1);
      elist[i].appendChild(td2);
      }

    }
  }


function go2Ranking(player_name,mode)
  {
  var form = document.createElement('form');
  form.setAttribute('method','post');
  form.setAttribute('action','/game.php?screen=ranking&mode='+mode+'&search');
  form.setAttribute('id','rankingForm');

  var name_i = document.createElement('input');
  name_i.setAttribute('type','hidden');
  name_i.setAttribute('name','name');
  name_i.setAttribute('value',player_name);

  form.appendChild(name_i);

  document.getElementsByTagName('body')[0].appendChild(form);
  document.getElementById('rankingForm').submit();
  }



function findByInner(obj,value)
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i].firstChild)
        {
        if(obj.getElementsByTagName('*')[i].firstChild.data)
          {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1)
            {
            list[a] = obj.getElementsByTagName('*')[i];
            a++;
            }
          }
        }
      }
    list['length'] = a;
    return list;
    }