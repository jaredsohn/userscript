// ==UserScript==
// @name           DepAll v0.1
// @namespace      Dune
// @include        http://www.thecoldwars.net/*
// ==/UserScript==


GM_xmlhttpRequest({
  method: "POST",
  url: "http://www.thecoldwars.net/bank.php",
  data: "depositall=1",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(response) {
	  GM_log(response.responseHeaders);
    }
  }
});

//If the browser supports AJAX Requests
if(window.XMLHttpRequest)
{
  var globaltable = document.createElement('table');
  content = document.getElementById('content_container').innerHTML;
//  for(i=2; i<=2; i++)

//  ajaxLoad(url);

  table = document.getElementById('content_container').getElementsByTagName('table')[0].getElementsByTagName('tr')[9].getElementsByTagName('table')[0];
  table.innerHTML='';
  
  //Create the headers
  headerRow=document.createElement('tr');
  header = new Array()
  header[0] = document.createElement('td');
  header[0].innerHTML='Rank';
  header[1] = document.createElement('td');
  header[1].innerHTML='Name';
  header[2] = document.createElement('td');
  header[2].innerHTML='WPN';
  header[3] = document.createElement('td');
  header[3].innerHTML='Alliance';
  header[4] = document.createElement('td');
  header[4].innerHTML='Race';
  header[5] = document.createElement('td');
  header[5].innerHTML='Monies';
  header[6] = document.createElement('td');
  header[6].innerHTML='Actions';
  for(i=0;i<=6;i++)
  {
    headerRow.appendChild(header[i]);
  }
  table.appendChild(headerRow);
  
  var bg = 'black';
  var dataRows = new Array();
  for(var row in globalrows)
  {
    bg = bg == 'black' ? 'grey' : 'black';
    exploded = extract.exec(globalrows[row]);
    rank = document.createElement('td');
    rank.innerHTML = exploded[1];
    id = exploded[2];
    username = document.createElement('td');
    username.innerHTML='<a href="stats.php?id=' + id +'">' + exploded[3] + '</a>';
    wpn = document.createElement('td');
    war_peace = /(war|peace)/i.exec(exploded[4]);
    peace = /peace/i.exec(exploded[4]);
    nospy = /nospy/i.exec(exploded[5]);
    wpn.innerHTML = (war_peace==null?'':(peace?'<img src="images/icon-peace.png" title="Peace" style="background:transparent;" alt="P" width="17" height="17" />':'<img src="images/icon-war.png" title="War" style="background:transparent;" alt="W" width="17" height="17" />'));
    if(war_peace==null && !nospy)
    {
        action = document.createElement('form');
        action.target = '_blank';
        action.action = 'stats2.php';
        action.method = 'POST';
        input = document.createElement('input');
        input.type='hidden';
        input.name='commchangeto';
        input.value=id;
        action.appendChild(input);
        input0 = document.createElement('input');
        input0.type='hidden';
        input0.name='commtochange';
        input0.value=310;
        action.appendChild(input0);
        input1 = document.createElement('input');
        input1.type='submit';
        input1.name='relation';
        input1.value='Declare War!';
        input1.class='button';
        action.appendChild(input1);
        wpn.appendChild(action);
    }
    alliance = document.createElement('td');
    alliance.innerHTML = exploded[6];
    race = document.createElement('td');
    race.innerHTML = exploded[7];
    monies = document.createElement('td');
    monies.innerHTML = exploded[8];   
    actions = document.createElement('td');
    actions.innerHTML = nospy?'None':'<a onClick=\'recon('+ id +')\'>';
    if(!nospy && war_peace==null)
    {
    //Action 0: Spy - things to do, make this run via AJAX, returning the defence power as an alert
        actionArray = new Array();
        action = document.createElement('form');
        action.target = '_blank';
        action.action = 'intelops.php';
        action.method = 'POST';
        input = document.createElement('input');
        input.type='hidden';
        input.name='id';
        input.value=id;
        action.appendChild(input);
        input1 = document.createElement('input');
        input1.type='submit';
        input1.name='intel_recon';
        input1.value='Recon';
        input1.class='button';
        action.appendChild(input1);
        actions.appendChild(action);
    }
    if(!nospy && war_peace && !peace)
    {
    //action 1: Credits raid - things to do, add to queue, auto-raid?
        action = document.createElement('form');
        action.target = '_blank';
        action.action = 'milops.php';
        action.method = 'POST';
        input = document.createElement('input');
        input.type='hidden';
        input.name='id';
        input.value=id;
        action.appendChild(input);
        input = document.createElement('input');
        input.type='hidden';
        input.name='credits_raid';
        input.value='1';
        action.appendChild(input);
        input1 = document.createElement('input');
        input1.type='submit';
        input1.name='intel_recon';
        input1.value='Credits Raid';
        input1.class='button';
        action.appendChild(input1);
        action.setAttribute('onClick',"this.value='Raiding'; this.disabled=true; this.form.submit();");
        monies.appendChild(action);
    }
    dataRow = document.createElement('tr');
    dataRow.setAttribute('class',bg);
    dataRow.appendChild(rank);
    dataRow.appendChild(username);
    dataRow.appendChild(wpn);
    dataRow.appendChild(alliance);
    dataRow.appendChild(race);
    dataRow.appendChild(monies);
    dataRow.appendChild(actions);
    
    table.appendChild(dataRow);
    dataRows.push(dataRow);
  }
}
