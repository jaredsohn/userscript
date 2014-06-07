//  Team Spoils script for Conquer Club
//  version 1.5
//  2010-08-03
//  Copyright (c) 2010, Daniel Pavlyuchkov (dako.lrd@gmail.com)
//  Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Conquer Club - Team Spoils
// @description    Share what spoils you have to teammates!
// @namespace      userscripts.org
// @version        1.5
// @include        http://*conquerclub.com/game.php?game=*
// ==/UserScript==


//---------   Constants   ---------//

const VersionString = '1.5';
const Images = {
  r : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oGEhE7OXRyUSoAAABPSURBVCjPY/z//z8DPsDEQAg8kZT8z8DAgBU/kZT8z8jAwPD/1+XLWDWz6eoStoKgAhYGBgaGTQ4OFJpgq66OXfbYMSo4knIFhIOa4tgEAOrDIaj91qOnAAAAAElFTkSuQmCC',
  g : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAFcjQ7rAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oGEhIAJV6HXAQAAACaSURBVCjPhZGxDcMwDARPAeEFXGkCV1pAQAAPnCpDeAF5BDdawSk+jSUolgM/wOb55PMlJAEgJEHMUQ5Q2hMOUMwRV1S2flYBuJijAB4U+M0LqOUAja+xCgxgek6VqGv/E8eyYoClPdVuGAI2v+efEWsdFpbmwgMdcX9HN1Ge6AphCL3HGQZwvr0TtFlaXObqcP6RtvzmdRvzC93ISKelHS1GAAAAAElFTkSuQmCC',
  b : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAFcjQ7rAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oGEhIAOtOPUfEAAACaSURBVCjPhZGxDcMwDARPAeEFXGkCV1pAQAAPnCpDeAF5BDdawSk+jSUolgM/wOb55PMlJAEgJEGMWQ5QSjsOUIwZV1S2rh8BuBizAB4UeL8JqOUAjeOrCgxgmp6VqGv/E8eyYoCltNduCAM2z++fEWsdlqW98EBH3N/RTZQnukIIQ+9xhgGcb+8EbZYWl7k6nH+kLe833cb8AtgOSKdN56FeAAAAAElFTkSuQmCC',
  R : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oIBAgQNzwPr5kAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAATElEQVQoz2NgoBg8kZT8z8DAgBU/kZT8z8jAwPD/3TvsmoWEGBiYCNlAUAELAwMDwz5VYRzSb4k0wVZdHbvssWNUcCTlCggGNeWRCQApihtZeb1wBgAAAABJRU5ErkJggg==',
  G : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oIBAgMOT3A38MAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAATUlEQVQoz2NgoBhIPpH8z8DAgBVLPpH8z8jAwPD/3TvsmoWEGBiYCNlAUAELAwMDg+o+YRzSb4k0Qd1WHavkMYZjVHAk5QoIBjXlkQkAJnUbWQfUE2sAAAAASUVORK5CYII=',
  B : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oIBAgNDpxmS40AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAATElEQVQoz2NgoBhISj75z8DAgBVLSj75z8jAwPD/3TvsmoWEGBiYCNlAUAELAwMDg6rqGhzSIUSaoK5ui1Xy2DFqOJJyBQSDmvLIBABwnhrAL9YoJwAAAABJRU5ErkJggg=='
};


//---------   Global variables   ---------//

var Chat_Size;


//---------   Prototyping   ---------//  

String.prototype.hasSpoils = function() {
  return /(Spoils::)/.test(this);
}

Array.prototype.has = function(obj) {
  return this.indexOf(obj) !== -1;
};

Array.prototype.removeByIndex = function(index) {
  return this.splice(index,1); 
};


//---------   Script functions   ---------//  

/**
 * Adds [share spoils] button and it's click behaviour
 * 
 */
function addShareButton() {
  var a, span, cards, i, text, string, evt;
  
  span = document.getElementById('cards');
  a = span.parentNode.appendChild(document.createTextNode('[')).parentNode.appendChild(document.createElement('a'));
  span.parentNode.appendChild(document.createTextNode(']'));
  a.appendChild(document.createTextNode('share spoils'));
  span.style.paddingRight = '20px';
  a.style.color = 'purple';
  
  a.addEventListener('click', function () {
    cards = span.getElementsByTagName('span');
    text = 'Spoils:: ';
    for (i = 0; i < cards.length; i++) {
      switch (cards[i].className) {
        case 'card0': string = 'r:'; break;
        case 'card1': string = 'g:'; break;
        case 'card2': string = 'b:'; break;
      }
      if (cards[i].parentNode.tagName == 'B')
        string = string.toUpperCase();
      
      string += cards[i].textContent.replace(/[rgb]:/, '');
      text += string + '; ';
    }
    
    text = text.substr(0, text.length - 2);

    // Set message to a form
    document.getElementById('message').value = text;
    document.getElementById('team').checked = true;

    // Simulate a click value
    evt = document.createEvent('HTMLEvents');
    evt.initEvent('submit', true, true);
    if (document.forms[0].id == 'action-form')
      document.forms[1].dispatchEvent(evt);
    else 
      document.forms[0].dispatchEvent(evt);
    
    return false;
  }, false);
}

/**
 * Parses "players" ul and finds correct team
 * 
 * @return array of players objects {name, id}
 */
function getTeamMates() {
  var player, team1, team2, switcher;
  
  player = /logout.php\">logout\s<b>([^"\r\n]*)<\/b>/(document.getElementById('leftColumn').innerHTML)[1];
  team1 = [];
  team2 = [];
  switcher = false;
  
  players = document.getElementById('players').getElementsByTagName('a');

  teamSize = players.length / 2;
  for (i = 0; i < teamSize; i++) {
    team1.push({'name' : players[i].getElementsByTagName('span')[0].textContent.replace(/([rgbypcos]:)?/, ''), 'id' : i + 1});
    team2.push({'name' : players[i + teamSize].getElementsByTagName('span')[0].textContent.replace(/([rgbypcos]:)?/, ''), 'id' : i + 1 + teamSize});
    
    if (team1[i].name == player)
      switcher = true;
    else if (team2[i].name == player)
      switcher = false;
  }
  
  return switcher ? team1 : team2;
}

/**
 * Parses chat for given team members to find spoils
 * 
 * @param array team - array of objects {name, id}
 * @return array of spoils objects {player, spoils{} } 
 */
function parseChat(team) {
  var player, line, i, j, k, spoils, playerSpoils, teamSpoils, color, own, territory;

  teamSpoils = [];
  lines = document.getElementById('chat').innerHTML.split('<br>');
  
  for (i = lines.length - 1; i >= 0; i--) {
    if (lines[i].hasSpoils()) {
      player = />(.*)<\/span>/.exec(lines[i])[1];

      for (k = 0; k < team.length; k++) {        
        if (team[k].name == player) {
          playerSpoils = [];
          
          spoils = lines[i].split('&amp;').join('&').split(/; /);
          // Exit on incorrect format or 0 spoils
          if (spoils.length == 0)
            continue;
          
          spoils[0] = spoils[0].substr(spoils[0].indexOf('::') + 3);
          for (j = 0; j < spoils.length; j++) {
            color = spoils[j][0]; // get the color of the spoil
            own = /[RGB]/.test(spoils[j][0]); // check if player owns the spoil
            territory = spoils[j].substr(spoils[j].indexOf(':') + 1); // get terr name
            playerSpoils.push({'color' : color, 'own' : own, 'territory' : territory});
          }

          teamSpoils.push({'player' : team[k].id, 'spoils' : playerSpoils});
          team.removeByIndex(k);
        }
      }
      if (team.length == 0)
        break;
    }
  }
  
  return teamSpoils;
}

/**
 * Shows the spoil info near the player
 * 
 * @param array spoils - array of objects from parseChat() function
 */
function showSpoils(spoils) {
  var player, img, span, tableSpan, holder;

  for (player in spoils) {
    span = document.createElement('span');
    span.id = 'player_spoils_' + spoils[player].player;
    if (spoils[player].spoils == undefined)
      continue;
    for (i = 0; i < spoils[player].spoils.length; i++) {
      img = document.createElement('img');
      img.src = Images[spoils[player].spoils[i].color];
      
      switch (spoils[player].spoils[i].color.toLowerCase()) {
        case 'r': img.title = 'Red: '; break;
        case 'g': img.title = 'Green: '; break;
        case 'b': img.title = 'Blue: '; break;
      }
      img.title += spoils[player].spoils[i].territory;
      
      if (spoils[player].spoils[i].own)
        img.title += ' (Owned)';
      
      img.className = 'icon i3';
      img.style.padding = '0 2px';
      span.appendChild(img);
    }
    if (spoils[player].spoils.length != document.getElementById('player_cards_' + spoils[player].player).textContent)
      span.style.textDecoration = 'line-through';
    
    tableSpan = span.cloneNode(true);
    tableSpan.id = 'stat_spoils_' + spoils[player].player;
    
    holder = document.getElementById('player_spoils_' + spoils[player].player);
    if (holder)
      holder.parentNode.removeChild(holder);
    
    holder = document.getElementById('stat_spoils_' + spoils[player].player);
    if (holder)
      holder.parentNode.removeChild(holder);
    
    document.getElementById('stat_cards_' + spoils[player].player).appendChild(tableSpan).insertBefore(document.createTextNode(' : '), tableSpan.firstChild);
    document.getElementById('player_icon_' + spoils[player].player).appendChild(span).insertBefore(document.createTextNode('Spoils: '), span.firstChild);    
  }
}

/**
 * Refresh gamepage handler to react on chat changes
 * 
 */
function gameRefresh() {
  var chatSize, spoils;
  
  chatSize = document.getElementById('chat').innerHTML.split('<br>').length;

  if (chatSize > Chat_Size) {
    team = getTeamMates();
    spoils = parseChat(team);
    showSpoils(spoils);
    Chat_Size = chatSize;
  }
}

/**
 * Starting point
 * 
 */
function initScript() {
  var team, spoils;
  
  // Exit in no-card and no-team game
  if (!document.getElementById('cards') || document.getElementById('players').childNodes[1].textContent != 'Team 1:')
    return;
  
  // Add event listener
  document.getElementsByTagName('body')[0].addEventListener('CCGameRefresh', gameRefresh, false);
  
  // Set chat size
  Chat_Size = document.getElementById('chat').innerHTML.split('<br>').length;
  
  addShareButton();
  team = getTeamMates();
  spoils = parseChat(team);
  showSpoils(spoils);
}

// Start the script
initScript();