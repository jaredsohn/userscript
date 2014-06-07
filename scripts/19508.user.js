// ==UserScript==
// @name           NHL
// @namespace      bbta
// @include        http://www.nhl.com/nhl/app
// ==/UserScript==

//Made by Sikosmurf
//Feel free to modify, repost, or really whatever.


//Divisions
var ATLANTIC = [ 'Devils', 'Flyers', 'Islanders', 'Penguins', 'Rangers' ];
var NORTHEAST = [ 'Bruins', 'Canadiens', 'MapleLeafs', 'Sabres', 'Senators' ];
var SOUTHEAST = [ 'Capitals', 'Hurricanes', 'Lightning', 'Panthers', 'Thrashers' ];
var CENTRAL = [ 'Blackhawks', 'BlueJackets', 'Blues', 'Predators', 'RedWings' ];
var NORTHWEST = [ 'Avalanche', 'Canucks', 'Flames', 'Oilers', 'Wild' ];
var PACIFIC = [ 'Coyotes', 'Ducks', 'Kings', 'Sharks', 'Stars' ];
var EASTERN = ATLANTIC.concat(NORTHEAST, SOUTHEAST);
var WESTERN = CENTRAL.concat(NORTHWEST, PACIFIC);

//Edit this line to be the line of your favorite team to change it's colors, 
//  or leave it 'NoFavorite' to have it not highlight any specific team.
//  Make sure it is spelled the same way as above: 'Capitals' or 'BlueJackets'

var FAVORITETEAM = 'NoFavorite';


//Colors
var CROSSCONFERENCE1 = '#ff9980';
var CROSSCONFERENCE2 = '#ef8970';
var INCONFERENCE1 = '#c6df9f';
var INCONFERENCE2 = '#d6efaf';

//Favorite Team Colors
var FAVORITECROSS = '#1076c3';
var FAVORITEINDIV = '#009999';
var FAVORITEOTHER = '#a1a1ff';

var allDivs, thisDiv, count;

allDivs = document.evaluate("//html/body/div/div/div/div/table/tbody/tr/td/table/tbody/tr", document, null, 
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

//old code
//allDivs = document.evaluate("//html/body/div/div/div/div/table/tbody/tr/td/table/tbody/tr | //tr[@bgcolor='#ffffff']", document, null,


//alert (allDivs.snapshotLength);
//alert (allDivs.snapshotItem(0).bgColor);
for (var i = 0; i < allDivs.snapshotLength; i++) { 
    thisDiv = allDivs.snapshotItem(i);
    if(thisDiv.childNodes[3]){
      var team1 = Trim(thisDiv.childNodes[1].textContent);
      var team2 = Trim(thisDiv.childNodes[3].textContent);
      //alert ("|" + team1 + " vs. " + team2 + "|");

      if ( team1 == FAVORITETEAM || team2 == FAVORITETEAM ) { thisDiv.bgColor = FAVORITEOTHER; }

      if ( EASTERN.indexOf(team1) > -1 && WESTERN.indexOf(team2) > -1 || WESTERN.indexOf(team1) > -1 && EASTERN.indexOf(team2) > -1 )
      {
        //Picks 1 of 2 colors, based on index.
        if ( team1 == FAVORITETEAM || team2 == FAVORITETEAM ) { thisDiv.bgColor = FAVORITECROSS; }
        else if(i%2){ thisDiv.bgColor = CROSSCONFERENCE1; } else { thisDiv.bgColor = CROSSCONFERENCE2; }
      }
      if ( ATLANTIC.indexOf(team1) > -1 && ATLANTIC.indexOf(team2) > -1 ||
           NORTHEAST.indexOf(team1) > -1 && NORTHEAST.indexOf(team2) > -1 ||
           SOUTHEAST.indexOf(team1) > -1 && SOUTHEAST.indexOf(team2) > -1 ||
           CENTRAL.indexOf(team1) > -1 && CENTRAL.indexOf(team2) > -1 ||
           NORTHWEST.indexOf(team1) > -1 && NORTHWEST.indexOf(team2) > -1 ||
           PACIFIC.indexOf(team1) > -1 && PACIFIC.indexOf(team2) > -1 ) 
      {
          if ( team1 == FAVORITETEAM || team2 == FAVORITETEAM ) { thisDiv.bgColor = FAVORITEINDIV; }
          else if(i%2){ thisDiv.bgColor = INCONFERENCE1; } else { thisDiv.bgColor = INCONFERENCE2; }
      }
    }
}

function Trim(str)
{
  return str.replace(/\s*/g, '');
}