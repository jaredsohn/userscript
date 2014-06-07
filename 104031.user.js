// ==UserScript==
// @name           sguw_battlefield_v_0.1
// @namespace      RARGH!
// @description    Battlefield merger
// @include        http://test.sguwars.com/battlefield.php*
// @include        http://www.sguwars.com/battlefield.php*
// @include        http://sguwars.com/battlefield.php*
// ==/UserScript==
/*##########################################
Stargate Universe Wars Battlefield Manager
Version     0.1     14 March 2011
Author      Bernard Tao
Additional Functions   Rodney Cheney
############################################
Explanation of how this script works (i.e. script design)

1.  On a battlefield page, collect the information required.
    The base URL (so that the script should work on multiple servers without breaking).
    The Ranks Table (so we have somewhere to put the output).
    - From the Ranks Table (var rt) we get the last row, which tells us how many pages there are.

2.  Create a new set of headers. Our new ranks table will have more columns.

3.  Cycle through all the pages calling an asynchronous call to load the page into the table.

4.  With the asynchronous call, grab the user data available and push it onto a stack to be loaded into the table.

5.  Load the stack into the table using insertion sort (acclerated by binary search) - O(n log n) sorting.
*/
/*
baseURL gets the URL of the battlefield that you are running the script on. This is done so that the same script should work on test server as on the main server.
rt is the ranks table of the current page. We will need to edit this to display the battlefield.
*/
  var baseURL = window.location.protocol + "//" + window.location.host;
  var rt = document.getElementById('ranksTable');
  var stack = new Array();
  var tableinserter = 0;        //ensure only 1 copy of insert runs
  var url;
/*
This section takes the current ranks table, and extracts the number of pages.
We will then discard the information in the table and build a new one using AJAX.
*/
  var rows = rt.getElementsByTagName('tr');                 //Get the rows as objects
  var bottomRow = rows[rows.length - 1].innerHTML;          //Get the last row
  var pattern = new RegExp('page [0-9]* of ([0-9]*)');      //Regular expression
  var result = pattern.exec(bottomRow);                     //Execute the regexp to grab # pages
  var numPages = result[1];                                 //number of pages we need to grab :) [+1]
/*
Now we need to clear some space to input our table data later
*/
  var headerRow = document.createElement('tr');
  th=new Array();
  for(var k=0; k<8; k++)
  {
    th.push(document.createElement('th'));
    headerRow.appendChild(th[k]);
  }
  th[0].innerHTML='&nbsp;';
  th[1].innerHTML='Name';
  th[2].innerHTML='Alliance';
  th[3].innerHTML='Rank';
  th[4].innerHTML='Army';
  th[5].innerHTML='Race';
  th[6].innerHTML='Gold';
  th[7].innerHTML='Functions';
//Clear the Ranks Table
  rt.innerHTML='';
  rt.appendChild(headerRow);
  
//Put some data somewhere
  var welcomeDiv = document.getElementById('welcome');
  reportarea = document.createElement("textarea");
  reportarea.setAttribute("id","reportarea");
  reportarea.setAttribute("rows","10");
  reportarea.setAttribute("readonly","readonly");
  reportarea.style.width="100%";
  welcomeDiv.appendChild(reportarea);

//Asynchronous javascript HTTP request
var ajaxRequest = new Array();
var filter1 = new RegExp('id="ranksTable".*>([^\b]*?)</table>','im');
var filter2 = new RegExp('<tr>([^\b]*?)</tr>','igm');
function loadBattlefield(URL, count) {
  ajaxRequest[count] = new XMLHttpRequest();
  ajaxRequest[count].onreadystatechange=function()
    {
      if (ajaxRequest[count].readyState==4 && ajaxRequest[count].status==200)
      {
        table=filter1.exec(ajaxRequest[count].responseText);       //Grab the info we're interested in
        rows=table[1].match(filter2);                       //Split into rows
        for(j=1; j<rows.length; j++) {
          temp = new User();
          temp.populate(rows[j]);
          stack.push(temp);
        }
        if(tableinserter==0)
        {
          run_table_insert();
        }
      }
    }
  ajaxRequest[count].open("GET",url,true);
  ajaxRequest[count].send();
}

function run_table_insert() {
  tableinserter=1;
  while(stack.length>0) {
    u = stack.pop();
    tableRow = u.buildTableRow();
    ins_before = rt_search(u.gold,u.rank);
    if(ins_before == null) {
      rt.appendChild(tableRow);
    } else {
      rt.insertBefore(tableRow, ins_before);
    }
  }
  tableinserter=0;
}

/*
Binary search for the row to insert into.
*/
function rt_search(gold,rank) {
  var n = 1;
  var m = rt.children.length - 1;
  var currentRow;
  var cRgold;
  var cRrank;
  if(m == 0) { return null; }           //Prevent 1st row breakage
  /*
    BINARY SEARCH :)
  */
  while(n != m) {
    halfnm = Math.floor((n+m)/2);
    //Get Row
    currentRow = rt.childNodes[halfnm].getElementsByTagName('td');
    cRgold = Math.floor(currentRow[6].innerHTML.replace(/,/g,""));
    if(!cRgold) { cRgold = -1; }
    //End Get Row
    //Equality, we then sort by rank
    if(cRgold == gold) {
      cRrank = Math.floor(currentRow[3].innerHTML.replace(/,/g,""));
      if(cRrank > rank) { n = halfnm+1; }
      else { m = halfnm; }
    }
    //otherwise normal search
    else if(cRgold > gold) { n = halfnm+1; } //+1 to prevent script from hanging
    else { m = halfnm; }
    halfnm = Math.floor((n+m)/2);
  }
  if(n == rt.children.length - 1)
  {
    //Get Row
    currentRow = rt.childNodes[n].getElementsByTagName('td');
    cRgold = Math.floor(currentRow[6].innerHTML.replace(/,/g,""));
    if(!cRgold) { cRgold = -1; }
    //End Get Row
    if(cRgold == gold) {
      cRrank = Math.floor(currentRow[3].innerHTML.replace(/,/g,""));
      if(cRrank > rank) { return null; }
    }
  }
  return rt.childNodes[n];
}
/*
To grab the information from the text stream, we need to use some regular expressions.
*/
//patterns for populating from the rankings page
  var pattern_td        = new RegExp('<td[^>]*?>([^\b]*?)</td>','igm'); //Split into table cells
  var pattern_td2       = new RegExp('<TD[^>]*?>([^\b]*?)</TD>','i'); //Weird bug :|
  var pattern_uid_name  = new RegExp('stats\.php.id=([0-9]*)">([^<]*)');
  var pattern_alid_name = new RegExp('allianceMembers\.php.id=([0-9]*)">([^<]*)','im');
  var pattern_ppt       = new RegExp('>{This user is protected}</font>','im');
  var pattern_war       = new RegExp('>\*war</font>','im');
  var pattern_peace     = new RegExp('>\*peace</font>','im');
//patterns for populating from the stats page
  var stats_name        = new RegExp('Name:[^\b]*?<td[^>]*?>\s*(.*?)\s*<(a|img)','im');
  var stats_rank        = new RegExp('User Stats[^\b]*?Rank:[^\b]*?<TD[^>]*?>([^\b]*?)<','im');
  var stats_race        = new RegExp('User Stats[^\b]*?Race:[^\b]*?<TD[^>]*?>([^\b]*?)<','im');
  var stats_army        = new RegExp('User Stats[^\b]*?Army Size:[^\b]*?<TD[^>]*?>([^\b]*?)<','im');
  var stats_gold        = new RegExp('User Stats[^\b]*?Treasury:[^\b]*?<TD[^>]*?>([^\b]*?)<','im');
//Our User object
function User() {
  var tmp;
  var uid;
  this.populate = function(inputRow) {
    var cells = inputRow.match(pattern_td);
    tmp = pattern_uid_name.exec(cells[0]);
    uid = tmp[1];
    this.uid = tmp[1];
    this.name = tmp[2];
    tmp = pattern_alid_name.exec(cells[0]);
    this.alliance_id = tmp[1] + 0;
    this.alliance_name = '&nbsp;';
    if(this.alliance_id > 0) {
      this.alliance_name = tmp[2];
    }
    this.ppt = pattern_ppt.test(cells[0]);
    this.war = pattern_war.test(cells[0]);
    this.peace = pattern_peace.test(cells[0]);
    tmp = pattern_td.exec(cells[1]);
    this.rank_text=tmp[1];
    this.rank = tmp[1].replace(/,/g,'');
    tmp = pattern_td2.exec(cells[2]);
    this.army_text = tmp[1];
    this.army = tmp[1].replace(/,/g,'');
    if(this.army == '???') { this.army = -1; }
    tmp = pattern_td2.exec(cells[3]);
    this.race = tmp[1];
    tmp = pattern_td2.exec(cells[4]);
    this.gold_text = tmp[1];
    this.gold = tmp[1].replace(/,/g,'');
    if(this.gold == '???') { this.gold = -1; }
  }
  this.createFromStats = function(statspage,userid) {
    uid = userid;
    this.uid = userid;
    tmp = stats_name.exec(statspage);
    this.name = tmp[1].replace(/\s/ig,"");
    tmp = pattern_alid_name.exec(statspage);
    this.alliance_id = tmp[1] + 0;
    this.alliance_name = '&nbsp;';
    if(this.alliance_id > 0) {
      this.alliance_name = tmp[2];
    }
//    this.ppt = pattern_ppt.test(statspage);
    this.war = pattern_war.test(statspage);
    this.peace = pattern_peace.test(statspage);
    tmp = stats_rank.exec(statspage);
    this.rank_text=tmp[1].replace(/\s/ig,"");
    this.rank = tmp[1].replace(/,/g,'');
    tmp = stats_army.exec(statspage);
    this.army_text = tmp[1].replace(/\s/ig,"");
    this.army = tmp[1].replace(/,/g,'');
    if(this.army == '???') { this.army = -1; }
    tmp = stats_race.exec(statspage);
    this.race = tmp[1].replace(/\s/ig,"");
    tmp = stats_gold.exec(statspage);
    this.gold_text = tmp[1].replace(/\s/ig,"");
    this.gold = tmp[1].replace(/[\s,]/ig,'');
    if(this.gold == '???') { this.gold = -1; }
  }
  this.buildTableRow = function() {
    if(this.tableRow) { return this.tableRow; } else {
    var tableRow = document.createElement('tr');
    tableRow.setAttribute('id','gmtr' + this.uid);
    var td0 = document.createElement('td');         //War peace neutral
    td0.setAttribute('id','wpn'+uid);
    tableRow.appendChild(td0);
    if(this.war) {td0.innerHTML = '<span style="color: #FF0000">W</span>';} 
    else if(this.peace) {td0.innerHTML = '<span style="color: #00FF00">P</span>';} 
    else {td0.innerHTML = '<span style="color: #FFFF00">N</span>';}
    var td1 = document.createElement('td');         //Name
    td1.setAttribute('id','name'+uid);
    tableRow.appendChild(td1);
    td1.innerHTML='<a href="stats.php?id='+ this.uid +'" target="_blank">'+ this.name +'</a>';
    if(this.ppt) td1.innerHTML = td1.innerHTML + ' <span style="color: #FF0000">{PPT}</span>';
    var td2 = document.createElement('td');         //Alliance
    td2.setAttribute('id','alliance'+uid);
    tableRow.appendChild(td2);
    td2.innerHTML=this.alliance_name;
    var td3 = document.createElement('td');         //Rank
    td3.setAttribute('id','rank'+uid);
    tableRow.appendChild(td3);
    td3.innerHTML=this.rank_text;
    var td4 = document.createElement('td');         //Army
    td4.setAttribute('id','army'+uid);
    tableRow.appendChild(td4);
    td4.innerHTML=this.army_text;
    var td5 = document.createElement('td');         //Race
    td5.setAttribute('id','race'+uid);
    tableRow.appendChild(td5);
    td5.innerHTML=this.race;
    var td6 = document.createElement('td');         //Treasury
    td6.setAttribute('id','treasury'+uid);
    tableRow.appendChild(td6);
    td6.innerHTML=this.gold_text;
    var td7 = document.createElement('td');         //Functions
    td7.setAttribute('id','functions'+uid);
    tableRow.appendChild(td7);
    if(this.peace) {td7.innerHTML = 'You are at peace with this user';
    decWar = document.createElement('input');
      decWar.setAttribute('type','button');
      decWar.setAttribute('value','Declare War');
      decWar.setAttribute('id','dw'+uid);
      decWar.setAttribute('name', uid);
      decWar.addEventListener("click", declareWar, false);
      td7.appendChild(decWar);
        spy = document.createElement('input');
      spy.setAttribute('type','button');
      spy.setAttribute('value','Spy Not Finished');
      spy.setAttribute('id','spy'+uid);
      spy.setAttribute('name', uid);
      if(this.army==-1 || this.gold==-1)
      {
        spy.addEventListener("click", spyAlert, false);
      } else {
        spy.addEventListener("click", spyUser, false);
      }
      td7.appendChild(spy);}
    else if(this.ppt) {td7.innerHTML = 'This user is on PPT';
     decWar = document.createElement('input');
      decWar.setAttribute('type','button');
      decWar.setAttribute('value','Declare War');
      decWar.setAttribute('id','dw'+uid);
      decWar.setAttribute('name', uid);
      decWar.addEventListener("click", declareWar, false);
      td7.appendChild(decWar);
      decPeace = document.createElement('input');
      decPeace.setAttribute('type','button');
      decPeace.setAttribute('value','Declare Peace');
      decPeace.setAttribute('id','dp'+uid);
      decPeace.setAttribute('name', uid);
      decPeace.addEventListener("click", declarePeace, false);
      td7.appendChild(decPeace);
    spy = document.createElement('input');
      spy.setAttribute('type','button');
      spy.setAttribute('value','Spy Not Finished');
      spy.setAttribute('id','spy'+uid);
      spy.setAttribute('name', uid);
      if(this.army==-1 || this.gold==-1)
      {
        spy.addEventListener("click", spyAlert, false);
      } else {
        spy.addEventListener("click", spyUser, false);
      }
      td7.appendChild(spy);
    }  
    else if(this.war) {td7.innerHTML = 'War Functions<br>';
     warattack = document.createElement('input');
      warattack.setAttribute('type','button');
      warattack.setAttribute('value','Declare War & Attack user');
      warattack.setAttribute('id','ab'+uid);
      warattack.setAttribute('name', uid);
      warattack.addEventListener("click", WarandAttackUser, false);
      td7.appendChild(warattack); 
       
      decPeace = document.createElement('input');
      decPeace.setAttribute('type','button');
      decPeace.setAttribute('value','Declare Peace');
      decPeace.setAttribute('id','dp'+uid);
      decPeace.setAttribute('name', uid);
      decPeace.addEventListener("click", declarePeace, false);
      td7.appendChild(decPeace);
          spy = document.createElement('input');
      spy.setAttribute('type','button');
      spy.setAttribute('value','Spy');
      spy.setAttribute('id','spy'+uid);
      spy.setAttribute('name', uid);
      if(this.army==-1 || this.gold==-1)
      {
        spy.addEventListener("click", spyAlert, false);
      } else {
        spy.addEventListener("click", spyUser, false);
      }
      td7.appendChild(spy);
    } 
    else { warattack = document.createElement('input');
      warattack.setAttribute('type','button');
      warattack.setAttribute('value','Declare War & Attack user');
      warattack.setAttribute('id','ab'+uid);
      warattack.setAttribute('name', uid);
      warattack.addEventListener("click", WarandAttackUser, false);
      td7.appendChild(warattack); 
      decWar = document.createElement('input');
      decWar.setAttribute('type','button');
      decWar.setAttribute('value','Declare War');
      decWar.setAttribute('id','dw'+uid);
      decWar.setAttribute('name', uid);
      decWar.addEventListener("click", declareWar, false);
      td7.appendChild(decWar);
    }
    
    this.tableRow=tableRow;
    return tableRow;
    }
  }
}

/*
This ajaxPost function will submit a form to the server with the appropriate data.
The function will do this synchronously, and return the response text so that the user can do something with it.
*/
function ajaxPost(url, data) {
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open("POST", url, false);
  ajaxRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  ajaxRequest.send(data);
  return ajaxRequest.responseText;
}

function declareWar(e) {
  var parentRow = this.parentNode.parentNode.id;
  var userid = this.name;
  //Declare War by AJAX post
  url = baseURL + "/stats.php?id=" + userid;
  data = 'relation=1&id=5723&relation1=declare+war';
  var response = ajaxPost(url, data);
  if(response.match(new RegExp('>\*war</font>','i')))
  {
    username = document.getElementById('name'+userid).innerHTML.match(/>(.*?)</i);
    reportarea.innerHTML += 'War declared against user ' + userid + " " + username[1] + "\n";
  }
  //get info - if war has been declared
  //if declared, update the row
  rt.removeChild(this.parentNode.parentNode);
  var newUser;
  newUser = new User();
  newUser.createFromStats(response, userid);
  stack.push(newUser);
  if(tableinserter==0)
  {
    run_table_insert();
  }
}

function declarePeace(e) {
  var parentRow = this.parentNode.parentNode.id;
  var userid = this.name;
  //Declare Peace by AJAX post
  url = baseURL + "/stats.php?id=" + userid;
  data = 'relation=2&id=5723&relation1=declare+peace';
  var response = ajaxPost(url, data);
  if(response.match(new RegExp('>\*peace</font>','i')))
  {
    username = document.getElementById('name'+userid).innerHTML.match(/>(.*?)</i);
    reportarea.innerHTML += 'Peace declared against user ' + userid + " " + username[1] + "\n";
  }
  //get info - if war has been declared
  //if declared, update the row
  rt.removeChild(this.parentNode.parentNode);
  var newUser;
  newUser = new User();
  newUser.createFromStats(response, userid);
  stack.push(newUser);
  if(tableinserter==0)
  {
    run_table_insert();
  }
}

var spyformRegExp1 = new RegExp('<FORM[^>]*?name=spyr[^>]*?>([^\b]*?)</FORM[^>]*?>','im');
var spyformNumSpies = new RegExp('<input[^>]*?numspies[^>]*?value="(.*?)"[^>]*?>','im');
var spyformHash = new RegExp('<input[^>]*?hidden[^>]*?value=(\S*?)[^>]*?name=hash[^>]*?>','im');
function spyAlert(e) {
  alert('This user has a high covert power.' +"\n"+ 'Your advisers suggest you don\'t spy on them.');
}
function spyUser(e) {
  var parentRow = this.parentNode.parentNode.id;
  var userid = this.name;
  url = baseURL + "/attack.php?id=" + userid;
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open("GET", url, false);
  ajaxRequest.send();
  var spyform = spyformRegExp1.exec(ajaxRequest.responseText);
  var numspies = spyformNumSpies.exec(spyform);
  var hash = spyformHash.exec(spyform);
  url = baseURL + "/attack.php";
  data = 'mission_type=recon&numspies=99999999999&spyrbut=Send+Spies&defender_id=' + userid + '&hash=93aa2b6a02603399396203313b45827e';// + hash[1];
  ajaxPost(url,data);
  alert("you have spied on user so far devlopment is needed to allow you to see log maybe make it show in a dilog. but for now best to have intelagence tab open");
  //reportarea.innerHTML += 'SAB LOG<br> ' + responsea + " \n";
  //Test server has an error where this does not actually spy.
}

function WarandAttackUser(e) {
  var parentRow = this.parentNode.parentNode.id;
  var userid = this.name;
  urla = baseURL + "/stats.php?id=" + userid;
  dataa = 'relation=1&id=5723&relation1=declare+war';
  var response = ajaxPost(urla, dataa);
  if(response.match(new RegExp('>\*war</font>','i')))
  {
    username = document.getElementById('name'+userid).innerHTML.match(/>(.*?)</i);
    reportarea.innerHTML += 'War declared against user ' + userid + " " + username[1] + "\n";
  }
  url = baseURL + "/attack.php?id=" + userid;
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open("GET", url, false);
  ajaxRequest.send();
  url = baseURL + "/attack.php";
  data = 'attacks=15&attackbut=Attack!&defender_id2=' + userid + '&hash=93aa2b6a02603399396203313b45827e';// + hash[1];
  var response = ajaxPost(url,data);
  username = document.getElementById('name'+userid).innerHTML.match(/>(.*?)</i);  
  reportarea.innerHTML += 'Attacked user ' + userid + " " + username[1] + " dont forget to repair or bank \n";
 
}

function fivehitcombo(e) {
  var parentRow = this.parentNode.parentNode.id;
  var userid = this.name;
  url = baseURL + "/attack.php?id=" + userid;
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open("GET", url, false);
  ajaxRequest.send();
  url = baseURL + "/attack.php";
  data = 'attacks=15&attackbut=Attack!&defender_id2=' + userid + '&hash=93aa2b6a02603399396203313b45827e';// + hash[1];
  ajaxPost(url,data);
  ajaxPost(url,data); 
  ajaxPost(url,data); 
  ajaxPost(url,data); 
  ajaxPost(url,data); 
  username = document.getElementById('name'+userid).innerHTML.match(/>(.*?)</i);  
  reportarea.innerHTML += 'Attacked user ' + userid + " " + username[1] + " 5 Times with 1 AT turn reffer to logs for details \n";
 
}
//  var start = numPages - 20;
  var start = 30;
  var end = numPages; 
//  var end = 6;
  
var counter = 0;
for(var i=start; i<end; i++) {
  url=baseURL + "/" + window.location.pathname + "?page=" + i;           //Get the page
  page = loadBattlefield(url, counter);        //Ajax request above (asynchronous)
  counter++;
}