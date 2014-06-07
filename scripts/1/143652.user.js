// ==UserScript==
// @name        PrimeGrid racers by team
// @namespace   https://sites.google.com/site/kenscode/
// @include     http://www.primegrid.com/challenge/*/top_users.html*
// @version     1
// @description Enhances PrimeGrid race top_users pages.  Search by team, see nearby teams, click to see their stats, copyable URLs.
// @grant none
// ==/UserScript==

// From http://stackoverflow.com/questions/646611/programmatically-selecting-partial-text-in-an-input-field
function createSelection(field, start, end) {
  if( field.createTextRange ) {
    var selRange = field.createTextRange();
    selRange.collapse(true);
    selRange.moveStart('character', start);
    selRange.moveEnd('character', end-start);
    selRange.select();
  } else if( field.setSelectionRange ) {
    field.setSelectionRange(start, end);
  } else if( field.selectionStart ) {
    field.selectionStart = start;
    field.selectionEnd = end;
  }
  field.focus();
}

function setTeam(teamname) {
  document.getElementById('teamin').value = teamname.toLowerCase();
  grepteams(null);
  return false;
}

function setThisTeam() { setTeam(this.innerHTML); return false; }

function listTeams() {
  var table = document.getElementsByTagName('table')[1];
  var teamIndex = 0;
  var grep = document.getElementById('teamin').value.toLowerCase();
  table.rows[0].cells[1].innerHTML = 'Team (click to view)';
  for(var i=1; i < table.rows.length; i++) {
    var thisLink = table.rows[i].cells[1].childNodes[0];
    if(thisLink.innerHTML.substr(0,grep.length).toLowerCase() == grep) {
      if(teamIndex != 0) return; // Fail if multiple teams are found.  Shouldn't happen.
      teamIndex = i;
    }
    table.rows[i].style.display = 'none';
  }
  //alert("Listing teams around "+teamIndex);
  if(teamIndex == 0) return;
  var lastTeam = teamIndex + parseInt(document.getElementById('teamcountaft').value);
  if(lastTeam >= table.rows.length) lastTeam = table.rows.length-1;
  var firstTeam = teamIndex - parseInt(document.getElementById('teamcountbef').value);
  if(firstTeam < 1) firstTeam = 1;
  //alert("Listing teams "+firstTeam+' to '+lastTeam);
  for(var i=firstTeam; i <= lastTeam; i++) {
    table.rows[i].style.display = '';
    var thisLink = table.rows[i].cells[1].childNodes[0];
    if(thisLink.href.substr(0,1) != '#') {
      // Set up each link to display that team's members, and ranking.
      thisLink.href = '#'+escape(thisLink.innerHTML.toLowerCase());
      thisLink.addEventListener('click', setThisTeam, false);
    }
  }
  document.getElementById('teamlist').style.display = '';
}


function grepteams(e) {
  var table = document.getElementsByTagName('table')[0];
  var grep = document.getElementById('teamin').value.toLowerCase();
  var matchstr = '';
  var teamsCount = 0;
  document.getElementById('teamlist').style.display = 'none';
  for(var i=1; i < table.rows.length; i++) {
    var isMatch = (table.rows[i].cells[2].childNodes[0].innerHTML.substr(0,grep.length).toLowerCase() == grep);
    // Exclude backspace, delete, and escape keys.
    if(isMatch && (e == null || (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 27))) {
      var newstr = table.rows[i].cells[2].childNodes[0].innerHTML.toLowerCase();
      if(matchstr == '') {
        matchstr = newstr;
        teamsCount = 1;
      } else {
        if(matchstr != newstr && matchstr != grep) {
          teamsCount++;
          // Find the first character where the strings differ, and cut matchstr to that.
          // e.g. 'neffer' and 'neffing' get cut to 'neff'.
          var matcharr = matchstr.split('');
          var newarr = newstr.split('');
          var j=grep.length;
          for(;j < newarr.length && j < matcharr.length; j++) {
            if(newarr[j] != matcharr[j]) break;
          }
          matchstr = matchstr.substr(0,j);
        }
      }
    }
    table.rows[i].style.display = (isMatch)?'':'none';
    //teamTotal += parseFloat(table.rows[i].cells[3].innerHTML);
  }
  if(matchstr.length > grep.length) {
    var teamin = document.getElementById('teamin');
    teamin.value = matchstr;
    createSelection(teamin, grep.length, matchstr.length);
  }
  if(teamsCount == 1) {
    if(document.getElementById('teamlist').innerHTML == '') {
      // Load the teams list.
      var req = new XMLHttpRequest();
      req.open('GET', document.URL.replace('users','teams'), true);
      req.onreadystatechange = function (oEvent) {
        if (req.readyState === 4 && req.status === 200) {
          var resp = req.responseText;
          resp = resp.substring(resp.indexOf('>',resp.indexOf('<body'))+1, resp.lastIndexOf('</body>'));
          document.getElementById('teamlist').innerHTML = resp;
          listTeams();
        }
      };
      req.send(null);
    } else {
      listTeams();
    }
  }
}

function validate_numeric(e) {
  this.value = this.value.replace(/[^\d]/,'');
}

function validate_numeric_onchange(e) {
  var val = this.value.replace(/[^\d]/,'');
  if(val == '') val = '0';
  this.value = val;
  if(document.getElementById('teamlist').style.display == '') listTeams();
}

// Create a div on the page for user inputs:
var teamdiv = document.createElement('div');
// Team grep section
var teamgrepdiv = document.createElement('div');
var teamin = document.createElement('input');
teamin.type = 'text';
teamin.id = 'teamin';
teamin.addEventListener('keyup', grepteams, false);
teamgrepdiv.appendChild(document.createTextNode('Find team '));
teamgrepdiv.appendChild(teamin);

// Team count section
var teamcountdiv = document.createElement('div');
var teamcountbef = document.createElement('input');
teamcountbef.id = 'teamcountbef';
teamcountbef.type = 'text';
teamcountbef.size = '2';
teamcountbef.value = '3';
teamcountbef.maxLength = '3';
teamcountbef.addEventListener('keyup', validate_numeric, false);
teamcountbef.addEventListener('blur', validate_numeric_onchange, false);
var teamcountaft = document.createElement('input');
teamcountaft.id = 'teamcountaft';
teamcountaft.type = 'text';
teamcountaft.size = '2';
teamcountaft.maxLength = '3';
teamcountaft.value = '3';
teamcountaft.addEventListener('keyup', validate_numeric, false);
teamcountaft.addEventListener('blur', validate_numeric_onchange, false);
// Place text around the fields.
teamcountdiv.appendChild(document.createTextNode('Show '));
teamcountdiv.appendChild(teamcountbef);
teamcountdiv.appendChild(document.createTextNode(' above and '));
teamcountdiv.appendChild(teamcountaft);
teamcountdiv.appendChild(document.createTextNode(' below'));

// Overall div
teamdiv.style.position = 'absolute';
teamdiv.style.left = '500px';
teamdiv.style.top = '16px';
teamdiv.appendChild(teamgrepdiv);
teamdiv.appendChild(teamcountdiv);


var teamlist = document.createElement('div');
teamlist.id = 'teamlist';
teamlist.style.display = 'none';

document.body.appendChild(teamdiv);
document.body.appendChild(teamlist);

// Look for a team name in the URL.
var hashPos = document.URL.indexOf('#');
if(hashPos > 0) {
  setTeam(unescape(document.URL.substr(hashPos+1)));
}
