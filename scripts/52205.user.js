// ==UserScript==
// @name           League schedule
// @namespace      GLB
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @include        http://www.goallineblitz.com/game/league.pl?league_id=*
// ==/UserScript==

var showed=0, games, myptr, upcoming_games;
var teamname=[], teamurl=[], teamid=[], showedid=[];

function getElementsByClassName(classname, par)
{
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
}

function ifshowed(id)
{
  for (var x=0; x<showedid.length; x++)
    if (showedid[x] == id) return 1;
  return 0;
}

function findteamid(id)
{
  for (var x=0; x<teamid.length; x++)
    if (teamid[x] == id) return x;
  return -1;
}

function parseteampage(text)
{
  var opphome=0;
  var ptr0 = text.indexOf("Scrimmage Games");
  var ptr1 = text.indexOf("href=\"/game/compare_teams.pl");

  if (ptr1>=0 && ptr1<ptr0) {
    var ptr2 = text.lastIndexOf("a href=\"/game/team.pl?team_id=", ptr1);
    var ptr3 = text.indexOf("\">", ptr2+30);
    var oppid = parseInt(text.substring(ptr2+30, ptr3));
    var ptr4 = text.lastIndexOf("schedule_date_value", ptr1);
    var ptr5 = text.indexOf("<span class=\"at\">at </span>", ptr4);
    if (ptr5>ptr4 && ptr5<ptr2) opphome=1;
    if (myptr==0) {
      var tr0 = document.createElement("tr");
      var td0 = document.createElement("td");
      td0.innerHTML = "<b>Next Matchups</b>";
      tr0.appendChild(td0);
      games[0].appendChild(tr0);
    }
    var tr = document.createElement("tr");
    var oppptr = findteamid(oppid);
    var td1 = document.createElement("td");
    if (opphome)
      td1.innerHTML = teamname[oppptr];
    else td1.innerHTML = teamname[myptr];
    var td2 = document.createElement("td");
    td2.innerHTML = "vs.";
    td2.setAttribute('align', 'center');
    var td3 = document.createElement("td");
    if (opphome)
      td3.innerHTML = teamname[myptr];
    else td3.innerHTML = teamname[oppptr];
    showedid[showedid.length] = teamid[myptr];
    showedid[showedid.length] = oppid;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    games[0].appendChild(tr);
  }
}

function parseteaminfo(teamlist) 
{
  for (var x=0; x<teamlist.length; x++) {
    var elem = teamlist[x].getElementsByTagName("*");
    var ptr1 = elem[1].innerHTML.indexOf("href=\"");
    var ptr2 = elem[1].innerHTML.indexOf("\"", ptr1+6);
    var url = elem[1].innerHTML.substring(ptr1+6, ptr2);
    var ptr3 = elem[1].innerHTML.indexOf("</a", ptr2+2);
    var name = elem[1].innerHTML.substring(ptr2+2, ptr3);
    var ptr4 = url.indexOf("team_id=");
    var id = url.substring(ptr4+8, url.length);
    teamname[teamname.length] = name;
    teamurl[teamurl.length] = url;
    teamid[teamid.length] = id;
  }
}

function readnext()
{
  if (myptr < teamname.length) {
   if (ifshowed(teamid[myptr])==1) {
      myptr++;
      window.setTimeout(readnext, 200);
   }
   else
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://goallineblitz.com/' + teamurl[myptr],
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(detail) {
          parseteampage(detail.responseText);
          myptr++;
          window.setTimeout(readnext, 200);
        },
        onerror: function(detail) {
        }
      });

  }
}

function showschedule()
{
  var lists = getElementsByClassName('alternating_color1', games[0]);
  if (showed==0) {
    showed=1;
    var conference = getElementsByClassName("conference", document);
    for (var x=0; x<conference.length; x++) {
      var teamlist = getElementsByClassName("alternating_color1", conference[x]);
      parseteaminfo(teamlist);
      teamlist = getElementsByClassName("alternating_color2", conference[x]);
      parseteaminfo(teamlist);
    }
 
    myptr=0;
    readnext();
  }
}


window.setTimeout( function() {

  upcoming_games = document.getElementById('upcoming_games');
  games = getElementsByClassName('games_table', upcoming_games);

  var newDiv = document.createElement('div');
  newDiv.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; height: 25px" value="Show Next Matchups">'; 
  newDiv.addEventListener('click', showschedule, true);
  games[0].parentNode.insertBefore(newDiv, games[0]);
}, 100);
