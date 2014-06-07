// ==UserScript==
// @name           Centsports Match Preview
// @namespace      www.centsports.com
// @description    Adds a match preview link - that will go to bodogs match preview
// @include        http://*.centsports.com/new_bet.php*
// ==/UserScript==



/*****************************************************************************
 *
 *  initialize constants.  This includes an abbreviation of every city/team name
 *  as well as a month name->month number tie in
 *
 ****************************************************************************/

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}


var aMatchups = new Array()
var aGameDates = new Array()
var aGames = new Array()
var bodogBaseNHL = 'http://www.bodoglife.com/betting-previews/nhl-hockey/'
var bodogBaseNBA = 'http://www.bodoglife.com/betting-previews/nba-basketball/'
var bodogBaseMLB = 'http://www.bodoglife.com/betting-previews/mlb-baseball/'

var bodogBase    = bodogBaseNBA

  /************************  Set up our js objects *********************/
function matchup(team1, team2){
    this.team1 = team1
    this.team2 = team2
}

function game(when, team1, team2){
  this.when = when
  this.team1 = team1
  this.team2 = team2 
}

game.prototype.buildBodogString = function () { 
  return bodogBase + this.when + '/' + this.team1 + '-' + this.team2;
}

function month(month, index){
  this.month = month
  this.index = index
}


// My Own object used for holding a city and its abbreviation
function city(city, abbrev){
  this.city = city
  this.abbrev = abbrev
  return this;
}

function addToArray(arrayName, value){
  arrayName[arrayName.length] = value;

}


var nhlCities = new Array()
addToArray(nhlCities, new city('Anaheim Ducks'        , 'ANA'))
addToArray(nhlCities, new city('Atlanta Thrashers'    , 'ATL'))
addToArray(nhlCities, new city('Boston Bruins'        , 'BOS'))
addToArray(nhlCities, new city('Buffalo Sabres'       , 'BUF'))
addToArray(nhlCities, new city('Calgary Flames'       , 'CAL'))
addToArray(nhlCities, new city('Carolina Hurricanes'  , 'CAR'))
addToArray(nhlCities, new city('Chicago Blackhawks'   , 'CHI'))
addToArray(nhlCities, new city('Colorado Avalanche'   , 'COL'))
addToArray(nhlCities, new city('Columbus Blue Jackets', 'CLB'))
addToArray(nhlCities, new city('Dallas Stars'         , 'DAL'))
addToArray(nhlCities, new city('Detroit Red Wings'    , 'DET'))
addToArray(nhlCities, new city('Edmonton Oilers'      , 'EDM'))
addToArray(nhlCities, new city('Florida Panthers'     , 'FLO'))
addToArray(nhlCities, new city('Los Angeles Kings'    , 'LA'))
addToArray(nhlCities, new city('Minnesota Wild'       , 'MIN'))
addToArray(nhlCities, new city('Montreal Canadiens'   , 'MON'))
addToArray(nhlCities, new city('Nashville Predators'  , 'NAS'))
addToArray(nhlCities, new city('New Jersey Devils'    , 'NJ'))
addToArray(nhlCities, new city('New York Islanders'   , 'NYI'))
addToArray(nhlCities, new city('New York Rangers'     , 'NYR'))
addToArray(nhlCities, new city('Ottawa Senators'      , 'OTT'))
addToArray(nhlCities, new city('Philadelphia Flyers'  , 'PHI'))
addToArray(nhlCities, new city('Phoenix Coyotes'      , 'PHO'))
addToArray(nhlCities, new city('Pittsburgh Penguins'  , 'PIT'))
addToArray(nhlCities, new city('San Jose Sharks'      , 'SJ'))
addToArray(nhlCities, new city('St. Louis Blues'      , 'STL'))
addToArray(nhlCities, new city('Tampa Bay Lightning'  , 'TB'))
addToArray(nhlCities, new city('Toronto Maple Leafs'  , 'TOR'))
addToArray(nhlCities, new city('Vancouver Canucks'    , 'VAN'))
addToArray(nhlCities, city('Washington Capitals'      , 'WAS'))

var nbaCities = new Array()
addToArray(nbaCities, new city('Atlanta Hawks'        , 'ATL'))
addToArray(nbaCities, new city('Boston Celtics'       , 'BOS'))
addToArray(nbaCities, new city('Charlotte Bobcats'    , 'CHR'))
addToArray(nbaCities, new city('Chicago Bulls'        , 'CHI'))
addToArray(nbaCities, new city('Cleveland Cavaliers'  , 'CLE'))
addToArray(nbaCities, new city('Detroit Pistons'      , 'DET'))
addToArray(nbaCities, new city('Indiana Pacers'       , 'IND'))
addToArray(nbaCities, new city('Miami Heat'           , 'MIA'))
addToArray(nbaCities, new city('Milwaukee Bucks'      , 'MIL'))
addToArray(nbaCities, new city('New Jersey Nets'      , 'NYJ'))
addToArray(nbaCities, new city('New York Knicks'      , 'NY'))
addToArray(nbaCities, new city('Orlando Magic'        , 'ORL'))
addToArray(nbaCities, new city('Philadelphia 76ers'   , 'PHI'))
addToArray(nbaCities, new city('Toronto Raptors'      , 'TOR'))
addToArray(nbaCities, new city('Washington Wizards'   , 'WAS'))
addToArray(nbaCities, new city('Dallas Mavericks'     , 'DAL'))
addToArray(nbaCities, new city('Denver Nuggets'       , 'DEN'))
addToArray(nbaCities, new city('Golden State Warriors', 'GS'))
addToArray(nbaCities, new city('Houston Rockets'      , 'HOU'))
addToArray(nbaCities, new city('Los Angeles Clippers' , 'LAC'))
addToArray(nbaCities, new city('Los Angeles Lakers'   , 'LAL'))
addToArray(nbaCities, new city('Memphis Grizzlies'    , 'MEM'))
addToArray(nbaCities, new city('Minnesota Timberwolves'   , 'MIN'))
addToArray(nbaCities, new city('New Orleans Hornets'  , 'NOH'))
addToArray(nbaCities, new city('Phoenix Suns'         , 'PHO'))
addToArray(nbaCities, new city('Portland Trail Blazers', 'POR'))
addToArray(nbaCities, new city('Sacramento Kings'     , 'SAC'))
addToArray(nbaCities, new city('San Antonio Spurs'    , 'SAN'))
addToArray(nbaCities, new city('Seattle SuperSonics'  , 'SEA'))
addToArray(nbaCities, new city('Utah Jazz'            , 'UTA'))

var mlbCities = new Array()
addToArray(mlbCities, new city('Toronto Blue Jays'        , 'TOR'))
addToArray(mlbCities, new city('Tampa Bay Rays'           , 'TB'))
addToArray(mlbCities, new city('Baltimore Orioles'        , 'BAL'))
addToArray(mlbCities, new city('Boston Red Sox'           , 'BOS'))
addToArray(mlbCities, new city('New York Yankees'         , 'NYY'))
addToArray(mlbCities, new city('Cleveland Indians'        , 'CLE'))
addToArray(mlbCities, new city('Kansas City Royals'       , 'KC'))
addToArray(mlbCities, new city('Minnesota Twins'          , 'MIN'))
addToArray(mlbCities, new city('Detroit Tigers'           , 'DET'))
addToArray(mlbCities, new city('Chicago White Sox'        , 'CHW'))
addToArray(mlbCities, new city('Oakland Athletics'        , 'OAK'))
addToArray(mlbCities, new city('Los Angeles Angels'       , 'ANA'))
addToArray(mlbCities, new city('Seattle Mariners'         , 'SEA'))
addToArray(mlbCities, new city('Texas Rangers'            , 'TEX'))
addToArray(mlbCities, new city('Atlanta Braves'           , 'ATL'))
addToArray(mlbCities, new city('Washington Nationals'     , 'WSH'))
addToArray(mlbCities, new city('Florida Marlins'          , 'FLA'))
addToArray(mlbCities, new city('New York Mets'            , 'NYM'))
addToArray(mlbCities, new city('Philadelphia Phillies'    , 'PHI'))
addToArray(mlbCities, new city('Houston Astros'           , 'HOU'))
addToArray(mlbCities, new city('Milwaukee Brewers'        , 'MIL'))
addToArray(mlbCities, new city('St. Louis Cardinals'      , 'STL'))
addToArray(mlbCities, new city('Chicago Cubs'             , 'CHC'))
addToArray(mlbCities, new city('Pittsburgh Pirates'       , 'PIT'))
addToArray(mlbCities, new city('Cincinnati Reds'          , 'CIN'))
addToArray(mlbCities, new city('Los Angeles Dodgers'      , 'LA'))
addToArray(mlbCities, new city('Arizona Diamondbacks'     , 'ARI'))
addToArray(mlbCities, new city('San Francisco Giants'     , 'SF'))
addToArray(mlbCities, new city('San Diego Padres'         , 'SD'))
addToArray(mlbCities, new city('Colorado Rockies'         , 'COL'))

var months = new Array()
addToArray(months, new month('Jan', '01'))
addToArray(months, new month('Feb', '02'))
addToArray(months, new month('Mar', '03'))
addToArray(months, new month('Apr', '04'))
addToArray(months, new month('May', '05'))
addToArray(months, new month('Jun', '06'))
addToArray(months, new month('Jul', '07'))
addToArray(months, new month('Aug', '08'))
addToArray(months, new month('Sep', '09'))
addToArray(months, new month('Oct', '10'))
addToArray(months, new month('Nov', '11'))
addToArray(months, new month('Dec', '12'))

var arrayToUse = nbaCities
var sportCode = getParam('sport_code').trim()


if (sportCode != 'NHL' &&  sportCode != 'NBA' &&  sportCode != 'MLB' )
  return


if (sportCode == 'NHL' ||  sportCode == 'NBA' || sportCode == 'MLB')
{
  if (sportCode == 'NHL'){
    bodogBase = bodogBaseNHL
    arrayToUse = nhlCities
  }
  else if (sportCode == 'MLB'){
    bodogBase = bodogBaseMLB
    arrayToUse = mlbCities
  }  
  else  if (sportCode == 'NBA') { 
     arrayToUse = nbaCities
     bodogBase = bodogBaseNBA
  }
  else return;
}

/**************************************************************************
 *
 *  This is where we get "hacky"  Since the layout of the page is such a mess 
 *   (nested table, not well formed, etc) I had to hardcode a few string
 *   to make sure we knew where we were
 *   
 *If/when the page layout changes this script is screwed!!!   
 * 
 ***************************************************************************/  

aGameHeaders = document.evaluate( "/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td[1]/form/div[@id='gamesList']/div[@id='div2']/table/tbody/tr/td[1]",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                                                                        
var team1Handle = document.evaluate("html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td/form/div/table",
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                                                        ///html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td/form/div/table[7]
var team2Handle = document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td/form/div/table",
  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 
var linkLocation = document.evaluate("/html/body/table[2]/tbody/tr/td[2]/table/tbody/tr/td[1]/form/div[@id='gamesList']/div[@id='div2']/table/tbody/tr/td[1]", 
                    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
var dateSeperator = '@'


//  Gets all matchups.  Team1 vs Team
for (var x = 1; x < team1Handle.snapshotLength ; x ++){
  var node1   = team1Handle.snapshotItem(x).childNodes[1].childNodes[0].childNodes[1].childNodes[0].innerHTML
  var node2   = team2Handle.snapshotItem(x).childNodes[1].childNodes[0].nextSibling.nextSibling.childNodes[1].childNodes[0].innerHTML
  var team1 = findTeam(node1.trim())
  var team2 = findTeam(node2.trim()) 
  var m = new matchup(team1, team2)
  addToArray(aMatchups, m)
}

// get all game dates
for (i = 0 ; i < aGameHeaders.snapshotLength; i ++){
  var gameDescription =  aGameHeaders.snapshotItem(i).innerHTML
  var shortDescription =  gameDescription.substring(0, gameDescription.indexOf(dateSeperator))
  var iMonth = buildMonth(shortDescription)
  var iDay   = buildDay(shortDescription)
  var iYear  = buildYear()
  var sDate = iYear + '' + iMonth.trim() + '' + iDay.trim()
  addToArray(aGameDates, sDate)
}

// OK now we have all listed matchup - and all listed dates
// Lets combine them into one big object GAME
//  hopefully they are the same size.  If not we have problems
for (var y = 0 ; y < aGameDates.length ; y++){

  var g = new game(aGameDates[y], aMatchups[y].team1, aMatchups[y].team2)
  addToArray(aGames, g)
}

//alert('Games: ' + aGames.length + '-- linkHolders: ' + linkLocation.snapshotLength )

for (var linkholders = 0 ; linkholders < linkLocation.snapshotLength ; linkholders ++){
  var inner = linkLocation.snapshotItem(linkholders).innerHTML
  var linkLoc = aGames[linkholders].buildBodogString() 
  var newLink = document.createElement('a')
  newLink.href= linkLoc;
  newLink.setAttribute('target', '_bodog')
  newLink.appendChild(document.createTextNode('Preview'))
  linkLocation.snapshotItem(linkholders).appendChild(newLink)
}


function findTeam(team){
  for (var y = 0 ; y < arrayToUse.length ; y++){
      //alert('Comparing-' + nhlCities[x].city + '=='+team+'-')
      if (arrayToUse[y].city == team)
        return arrayToUse[y].abbrev
  }
  //alert('did not find ' + team)
}
 


function buildYear() {
  return new Date().getFullYear()
}

function buildMonth(shortDate){

  var sMonth = shortDate.substring(0, 3)
  var iMonth
  for (x = 0 ; x < months.length ; x++){
    if (sMonth == months[x].month){
      iMonth = months[x].index
      break;
    }
  }
  return iMonth
}

function buildDay(shortDate){
  var startOfDay = 3
  var sDay = shortDate.substring(3,6)
  if (sDay.trim() < 10){
    sDay = '0' + sDay.trim()
  }
  //alert(sDay)
  sDay.trim().substring(0, 2)
  return sDay
}

/******************************************************************************
 *  Just a few common helper functions.  I will probably use 
 *   these in every script I write 
 *****************************************************************************/ 


function ltrim(str) {
    for(var k = 0; k < str.length && isWhitespace(str.charAt(k)); k++);
    return str.substring(k, str.length);
}
function rtrim(str) {
    for(var j=str.length-1; j>=0 && isWhitespace(str.charAt(j)) ; j--) ;
    return str.substring(0,j+1);
}
function trim(str) {
    return ltrim(rtrim(str));
}
function isWhitespace(charToCheck) {
    var whitespaceChars = " \t\n\r\f";
    return (whitespaceChars.indexOf(charToCheck) != -1);
}

function getParam( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  
  var results = regex.exec( window.location.href );
  if( results == null ){
    return "NBA";
  }
  else
    return results[1];
}




/******************************************************************************
 *   Normal self plug header
******************************************************************************/ 
if( ! document.getElementById('poweredBy')) {
    var poweredBy = document.createElement('div')
    poweredBy.style.position = 'fixed'
    poweredBy.id = 'poweredBy'
    poweredBy.style.backgroundColor = 'transparent'
    poweredBy.innerHTML = 'Like my scripts?  Become my  <a href="http://www.centsports.com/crony_invite_action.php?master_id=19322"> cronie.</a> - Puttzy'
    document.body.insertBefore(poweredBy, document.body.firstChild);
}
