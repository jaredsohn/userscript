// ==UserScript==
// @name           Ikariam Ally's Memebers Info
// @namespace      MMXForge
// @description    Gives information about what and when of your allyance members
// @author       Luca Saba
// @version		   0.6
// @include		   http://s*.ikariam.*/*
// @exclude		   http://board.ikariam.*/*
// ==/UserScript==

/*
 * This script is a very interesting example on how to use associative arrays!
 * I've learned a lot writing it!
 * Ref: http://www.mojavelinux.com/articles/javascript_hashes.html
 */
if(document.getElementById('embassy') == null) return;

var domain = top.location.host.split(".")[2];
var membersTab = document.getElementById('memberList');
if(membersTab == null) return;
var update_record = false;
var points_cell_idx = membersTab.rows[0].cells.length - 3;

/*
 * Words dictionary
 */
var lang={
  en: {'newAlert': 'New Members', 'newTotal': 'Total new members', 'aband': 'Abandon', 'totAban': 'Total abandon', 'confirm': 'Are you sure you want to reset recorded points ?'},
  it: {'newAlert': 'Nuovi membri', 'newTotal': 'Totale nuovi membri', 'aband': 'Abbandoni', 'totAban': 'Totale abbandoni', 'confirm': 'Sei sicuro di cancellare i punteggi salvati ?'},
}

var local = 'en'; //For i18n
//If domain id in the dictionary, use domain's dictionary
if(domain in lang) local = domain;
//Last Recorded values... this method.. I've seen it in an ecmanaut script ;-)
var members = eval(GM_getValue('members', {}) || {});
var recorded_points = eval(GM_getValue('recorded_points', {}) || {});
membersTab.rows[0].cells[membersTab.rows[0].cells.length - 1].innerHTML += "<img src='http://isoleunite.mmxforge.net/images/stories/ikariam/icon-backx20.gif' alt='Reset' title='Reset' id='ainfoReset'>";
//Listener to reset member's points record
document.addEventListener('click',function(event) {
  //Send Message Button
  if (event.target.id=='ainfoReset') 
  {
    recorded_points = actualValues;
    if(confirm(lang[local]['confirm']))
      saveArray('recorded_points', recorded_points);
  }
}, true);
var actualValues = getActualData();
//Let's check for new entries
var msg = lang[local]['newAlert'] + "\n";
var sum = 0;
for(var readed_name in actualValues)
{
  //If an actual member name is not in the members list...
  if(typeof(members[readed_name]) == 'undefined')
  {
    sum++;
    msg += readed_name + "\n";
  }
}
if(sum > 0) alert(msg + lang[local]['newTotal'] + ": " + sum);
//And now, let's check for those who left the ally!
var msg = lang[local]['aband'] + "\n";
sum = 0;
for(var member_name in members)
{
  //If a member name is not in the actual member list...
  if(typeof(actualValues[member_name]) == 'undefined')
  {
    sum++;
    msg += member_name + "\n";
    var trOut = document.createElement("TR");
    trOut.style.backgroundColor = "#F00";
    var tdOut = document.createElement("TD");
    tdOut.setAttribute('colspan','7');
    tdOut.style.color = "#FFF";
    tdOut.innerHTML = "<b>" + member_name + "</b>";
    trOut.appendChild(tdOut);
    membersTab.appendChild(trOut);
  }
}
if(sum > 0) alert(msg + lang[local]['totAban'] + ": " + sum);
saveArray('members', actualValues);

//Returns an Associative Array of the members's points
function getActualData()
{
  var res = new Array();
  var pName = '';
  var pPoints = 0;
  for(i=1; i < membersTab.rows.length; i++)
  {
    pName = membersTab.rows[i].cells[2].innerHTML;
	  pPoints = membersTab.rows[i].cells[points_cell_idx].innerHTML.replace(",", "") * 1; //Force variable type
	  res[pName] = pPoints;
    //If this is the first insert for this member
    if(typeof(recorded_points[pName]) === 'undefined')
	  {
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>New Entry</font>)";
	    recorded_points[pName] = pPoints;
	    update_record = true;
    }
	  else
	  {
	    var prev = recorded_points[pName];
	    var act = res[pName];
	    membersTab.rows[i].cells[points_cell_idx].innerHTML += " (<font color='#F00'>" + (act - prev) + "</font>)";
    }
  }
  if(update_record) saveArray('recorded_points', recorded_points);
  return res;
}

//Saves an array to GM string
function saveArray(variable, values_array)
{
  var str = '({';
  for(var k in values_array) str += "'" + k + "':" + values_array[k] + ", ";
  str += '})';
  GM_setValue(variable, str);
}
