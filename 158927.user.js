// ==UserScript==
// @name        Green - Full bounty
// @namespace   Green - Full bounty
// @description Green - Full bounty
// @include     http://ts3.travian.gr/build.php?newdid=8856&id=39&tt=99&gid=16&sort=lastRaid
// @version     1
// ==/UserScript==


var days    = 0;
var hours   = 0;
var minutes = 2;
var seconds = 17;

function green(){
var trs = document.getElementById('list441').getElementsByTagName('form')[0].getElementsByTagName('div')[4].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;

for(var i = 0; i < trs; i++)
{
var td_village = document.getElementById('list441').getElementsByTagName('form')[0].getElementsByTagName('div')[4].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1];
var td_last = document.getElementById('list441').getElementsByTagName('form')[0].getElementsByTagName('div')[4].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[5]; 
var td_checkbox = document.getElementById('list441').getElementsByTagName('form')[0].getElementsByTagName('div')[4].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[0];
    if(td_last.childNodes.length > 1){ // πράσινες χωρίς επίθεσης
        var report = td_last.getElementsByTagName('img')[0].getAttribute('class');
        var bounty = td_last.getElementsByTagName('img')[1].getAttribute('class');
        if(//td_village.getElementsByTagName('img').length == 0 &&
         report == 'iReport iReport1' 
         && bounty != 'carry full')
            td_checkbox.getElementsByTagName('input')[0].checked = true;
    }
 //  else
      //  document.getElementById('list441').getElementsByTagName('form')[0].getElementsByTagName('div')[4].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[0].getElementsByTagName('input')[0].checked =true;
}

}
green();


//setTimeout ( function () {
  //      location.reload();
  //  },
  //  ( ( (days * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000
//);