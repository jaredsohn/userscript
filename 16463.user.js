// ==UserScript==
// @name           Yahoo Football Weather Forecasts
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Display weather forecast for each game from http://www.weather.com/outlook/events/nfl/schedule
// @include        http://football.fantasysports.yahoo.com/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 548 $
// $LastChangedDate: 2009-09-24 18:01:41 -0500 (Thu, 24 Sep 2009) $
// ==/UserScript==
/*
    Updates:
    14-Dec-2007 - Modified to include description of conditions (Partly Cloudy, Rain/Wind, etc.) and shortened some text
    12-Sep-2009 - Fixed due to some changes in the Yahoo HTML and weather.com HTML
    24-Sep-2009 - Fixed some more bugs.
*/
(function() {

setTimeout( function() {

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

var playerTables = document.evaluate("//table[contains(@id,'statTable')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( playerTables.snapshotLength == 0 )
    return;

var tables = new Array();
for ( var i = 0; i < playerTables.snapshotLength; i++ )
{
    var table = playerTables.snapshotItem( i );
    tables.push( table );
}
playerTables = tables;

var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

/*
var INDOOR_IMG_URL = "data:image/gif,GIF89a%12%00%0D%00%B3%00%00%00%00%00%84%84%84%C6%FF%C6%CE%9C%00%CE%CE%CE" +
"%FF%00c%FF%CE%00%FF%FF%9C%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%C0%FF%C0!%F9" +
"%04%09%00%00%0F%00%2C%00%00%00%00%12%00%0D%00%00%08a%00%1F%08%1C(%10%00%C1%83%08%1F%008%60P!%80%86%09" +
"%17%020%60%10%40%01%88%07%25%06%98%F8%F0bD%86%01%10%20%E0%E81%23H%91%229bTx%12eJ%8A%045%BAt%C9q%E0%C3" +
"%90)%1F%A2%24%F00%26M%8A%3BW%02%F89T%24%CF%8C%04%92%F2%1C%00%40%E9%D1%98%0F%A3J%8D%3A0%20%00%3B";
*/

var INDOOR_IMG_URL = "data:image/gif,GIF89aK%00*%00%87%00%00%00%00%00%08%08%08%10%10%10%18%18%18!!!)))111999BBBJJJRRRZZZcccck%FFkkkks%FFk%7B%FFssss%7B%FF%7B%7B%7B%7B%" +
"84%FF%84%84%84%84%8C%FF%8C%8C%8C%8C%94%FF%94%94%94%94%9C%FF%9C%9C%9C%9C%A5%FF%A5%A5%A5%A5%A5%FF%A5%AD%FF%AD%AD%AD%AD%AD%FF%AD%B5%FF%B5%B5%B5%B5%BD%FF%BD%BD%BD%C6%C6%" +
"C6%CE%CE%CE%D6%D6%D6%D6%EF%F7%DE%DE%DE%E7%E7%E7%EF%EF%EF%F7%F7%F7%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%" +
"FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%" +
"FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%" +
"FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%" +
"FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%" +
"FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%" +
"FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%" +
"FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%" +
"FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%" +
"FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%" +
"00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%03%00%00%D2%00%2C" +
"%00%00%00%00K%00*%00%00%08%FF%00%A5%09%1CH%B0%A0%C1%83%03GLX%60%60%40%00%00%02%06%14H%10%A1%03%C2%8B%183jD%A8bB%81%87%00B%8A%04%09%00d%81%0A*6%AA%5C%89qD%82%90%20I%8" +
"A%2C9R%24%02%13%2Cs%AEDq%40%26%80%01%08%1C%5C%E8%00b%04%88%0D%15%18%20x%C84%A4%82%94%3A%A3%1Ad%A1%60%26%80%03%13F%9C%D8z%C2%04%D7%AF%26%3A8%10%40%B3%E4%04%A9h%A5%95%" +
"18%10%92%2C%82%12%2BX%C8%5D%B1B%05%0A%14_%B9%A2%F0%9A%A1%40Y%03'%D2%E6%CC%40%92%40%09%B9-Z%C8%5D%CCb%05%DE%BC%5B%BD%9E%A8%C0%16%A6E%C1%1B%2F%CC%8C%D0X1%0B%CF%9E%19%A" +
"B%80%0C%F6%A5%C8%0C%983n%109%60Dh%C6%B0%19%3B%96L%BA%02%C9%0A%A9%11v%A0Y%40%C5g%C4%B1a'n%3C%9A%F4%D6%0EdC%82%C8%5D%D0%84I%14%C3%7F%07%8F%ED%F91d%AF%20%020%85%CA%9C%0" +
"5%01%ED%04%7C%2B%FF%06%3D%BD%7C%F1%BC%7BOt0%C9%5C%20%03%98%87CG%2FO%9D%05%5E%BC%5E%F3o%B5%1D2%02%F3%11%22%5D0%5Eb-%AC%F0Zy%04%8E%B7%82q%5D%99%B0%00H%81%A5%E6%D7U%88%" +
"C5%05%DC%81%F4%01w%1EX%91%25%87%40A(D%A0%C0%02%1B%AC%B4%5BI'%2C6%1Ep%D3a%F8%9Bb%E9%19%A7YH%23%08%A4%02%03M9%B0%D2%84%0C%AC%98a%8B%C25vB%8C%90%19%10%12%02'Te%15%03*%9" +
"5PR%00(%FC%98at%E4qe%C2c%F8%9D0cY0%85%C4%E4F%EF%01%80%C0p.%D27_p%0B%5Eied%13t%09%13%03%0A%3C%A4%E3F%95u%20%9D%94%F5%7Dv%E0%82y%85%95%00I%0F%0D0%01%06%1AD%E0%E5F%26%B" +
"4e%20%9EA%EA%C9%18%81r%7D%D5%01%03%04%B8%09%00%01%17p%E0%01%07%1C8p%A8F%9A%05p%80%8Ae%02)%DD%7Cq%B5%10%D6%02%95%D6%14%40%02%1B%7C%FF%E0%81%07%1Ap%EA%80v_fd%DA%05%2F2" +
"%FA%E8%80%8C%A1%90A%02%C9Ye%C0%04%14%7C%C0i%AD%1F%90%F0%81%A7%00%E4%8AQ%AB%23%3C%EA%EBk-%A80B%05%09Tf%15%00%058%D0%80%B2%1Fh%A0%AC%07%CArj(%00sf%24R%8AwZ%AB%E2%A3%0B" +
"v0%81%02%AD~%5B%92%01%114%C0A%BA%9C~%40n%08%18%84%D0%E9%A7%045h%82%09%25%8C%C0T%07%25D%3CB%C4%147%3C%C2%08%1D%5C0%81%03p6%A4%9D%BE0%11%A0%C0%05%16%FC%BB)%A7%1E%84p%F" +
"2%BF%1C%88%60%2B%C2%03%19%F9mS%20%CF%5C%F3H%06%2Cp%81%04%2Coz%F2%AC%9C%06%9C%F2%BF%B5B%2B%AD%40%13%FA4%93%D27%CF%24%C0D%0El%80%C1%BF%02%CB%AA%E9%BF%22%A4%8Bn%D5%CCj%" +
"E0%B2%D1%06M%D8%25S%1F7%1D%11%01%06%20%B0%C0%04CQ%802%C0A%07-0%07%18%A4%0B7%07%06%A7%0BvA%1F%B1%FF%AB%01%05%1A%10j%01%06%84%12%AA%C1%E1%88%07n8%D5V%B3%1Cw%D5%B2ZM%AE" +
"%08%1A0%20%40%00%02d~9%E6%FE%1E%1Cm%D8%FD%9D%2C%C2%A6%E7%A2%1C%F7%E3%02%AF%EC%F8%07.%3B%1E%F0%DD%1E%2C%60%A9Hn%7B~%B44%13F%40u%ADW%CF%8D%B2%EA%A7%07%7F%3A%E9%A6kzr%0" +
"8%B2%83%FC%C0%A6%7B%13%94%7B%D0%0BD%3F%E2%02%232%60%2B%F5%D1g%BF%80%B2%0Eh%9F%BD%02%1Ax%E0%C0%F4%D3Go%C1%A6%C9%1BpA%06%5B6%C0%3C%CCH%F7%C72%C8%02h%EA%ED%D2%9B%E6%BBt" +
"%ADb%97%15%80%04%E8J%9E%02%E6%02%12%9Eu%EA!%B7%9B%D0%048P%2B%A6%D5%CF%03%C5%02%14%A7%EE7%13%FE%E9%2B%00%25%D3%C0%83%00%A0%00%C5%AC%00%24%10%D0%14%B4%DA%153%F9%C9%8Ac" +
"%0EH!%0A%23%A0%AC%08p%8C%01%2F%84!%A7%26%C0%80%1A%DA0%85%B5%A2!%0Co%E8%80%A9q%20L%03%94%8BH%A1x%26%BE%92%900~%01p%00%DEh%25%BC%AA%9D%2Cu%BE3Y%EAT'%ABZ%A9%8Ew%1F%10%A" +
"0%07E%D2%B9%E6%0D%24w%9B2%97%D6%9C(%C5e%C9-%60A%0B%1F%F1%AE%164%A0%8DN%60%1B%0C%22%0BD%F2%00%EE!%8C.%2B%E0%91%04(%C0G%09%F8%D1%8F%7D%94%80%05%1E%B0G%3E%F6%D1%90%804%" +
"24%05%20PH%0A%FC%F1%91%8F%DC%60%02P%60%17%91l%60%8Fab%80%0A%E8r%C1%A6%D5%84K%9D%A4%D9Hd%C2%B4O%CE%CE%93%A8L%A5*AV%CAU.%CD*%AD%14%E5)Mi3X%DE%2C%20%00%3B";


GM_addStyle( '\
TABLE.gncWeather { width: 70px; height: 100%; background: inherit; border-width: 0px; } \
TABLE.gncWeather TD.team, TABLE.gncWeather TD.weather { font-size: 100%; border-bottom: 0px; background: inherit; width: 35px; padding: 0px } \
TABLE.gncWeather TD.weather IMG { border-width: 0px } \
TABLE.gncWeather TD.weather { text-align: center } \
' );

var teamAbbrevs = new Array( 'Ari','Atl','Bal','Buf','Car','Chi','Cin','Cle','Dal','Den','Det','GB','Hou','Ind','Jac','KC','Mia','Min','NE','NO','NYG','NYJ','Oak','Phi','Pit','SD','Sea','SF','StL','TB','Ten','Was' );
var teamUrlAbbrevs = { Ari:'ari',Atl:'atl',Bal:'bal',Buf:'buf',Car:'car',Chi:'chi',Cin:'cin',Cle:'cle',Dal:'dal',Den:'den',Det:'det',GB:'gnb',Hou:'hou',Ind:'ind',Jac:'jac',KC:'kan',Mia:'mia',Min:'min',NE:'nor',NO:'nwe',NYG:'nyg',NYJ:'nyj',Oak:'oak',Phi:'phi',Pit:'pit',SD:'sdg',Sea:'sea',SF:'sfo',StL:'stl',TB:'tam',Ten:'ten',Was:'was' };
var teamFullNames = { 
    'Arizona Cardinals'   :'ari',
    'Atlanta Falcons'     :'atl',
    'Baltimore Ravens'    :'bal',
    'Buffalo Bills'       :'buf',
    'Carolina Panthers'   :'car',
    'Chicago Bears'       :'chi',
    'Cincinnati Bengals'  :'cin',
    'Cleveland Browns'    :'cle',
    'Dallas Cowboys'      :'dal',
    'Denver Broncos'      :'den',
    'Detroit Lions'       :'det',
    'Green Bay Packers'   :'gnb',
    'Houston Texans'      :'hou',
    'Indianapolis Colts'  :'ind',
    'Jacksonville Jaguars':'jac',
    'Kansas City Chiefs'  :'kan',
    'Miami Dolphins'      :'mia',
    'Minnesota Vikings'   :'min',
    'New England Patriots':'nor',
    'New Orleans Saints'  :'nwe',
    'New York Giants'     :'nyg',
    'New York Jets'       :'nyj',
    'Oakland Raiders'     :'oak',
    'Philadelphia Eagles' :'phi',
    'Pittsburgh Steelers' :'pit',
    'San Diego Chargers'  :'sdg',
    'Seattle Seahawks'    :'sea',
    'San Francisco 49ers' :'sfo',
    'St. Louis Rams'      :'stl',
    'Tampa Bay Buccaneers':'tam',
    'Tennessee Titans'    :'ten',
    'Washington Redskins' :'was'
};


var teamCells = getTeamCells();
for ( var i = 0; i < teamCells.length; i++ )
{
    teamCells[ i ].innerHTML = '<table class="gncWeather" border="0" cellpadding="0" cellspacing="0"><tr><td class="team" style="border-bottom: 0px">' + teamCells[ i ].innerHTML + '</td><td class="weather" style="border-bottom: 0px"><img src="' + WORKING_IMG_URL + '" /></td></tr></table>';
}


fetchWeatherData();

function fetchWeatherData()
{
    var url = 'http://www.weather.com/outlook/events/nfl/schedule';
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: getHandlerForAllForecasts( handleAllForecasts ),
        });
}

function getHandlerForAllForecasts( responseHandler )
{
    return function (responseDetails)
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText );
    }
}

var teamForecasts = {};
function handleAllForecasts( responseText )
{
    var html = responseText.replace( /(\r\n|\r|\n)+/g, '' ).replace( /^.*?(<div class="fbschebody)/im, '$1' );
    html = html.replace( /<script .*?<\/script>/i, '' );
    html = html.replace( /^(.+<div class="gdprecip">\d+%<\/div>\s*<\/div>).*/i, '$1' );
    
    var span = document.createElement( 'span' );
    span.style.display = 'none';
    span.innerHTML = html;
    var divs = span.getElementsByTagName( 'div' );
    for ( var iDiv = 0; iDiv < divs.length; iDiv++ )
    {
        var div = divs[ iDiv ];
        var divClass = divs[ iDiv ].getAttribute( "class" );
        if ( /^gameact/i.test( divClass ) )
        {
            var gameLink = div.getElementsByTagName( 'a' )[ 0 ];
            var gameDivs = div.parentNode.getElementsByTagName( 'div' );
            var gameHi = '';
            var gameLow = '';
            var gamePrecip = '';
            var gameTime = '';
            var gameLocation = '';
            for ( var i = 0; i < gameDivs.length; i++ )
            {
                var gameDiv = gameDivs[ i ];
                switch ( gameDiv.getAttribute( "class" ).toLowerCase() )
                {
                case "gameact":
                    gameLocation = gameDiv.innerHTML.replace( /<[^>]+>[^<]*<\/[^>]+>|<br>/ig, '' ).replace( /, /g, ',' ).replace( / - /, ',' ).replace( /Saint/g, 'St.' );
                    break;
                case "gdhigh":
                    gameHi = gameDiv.innerHTML.stripTags().replace( /\s+/gi, '' );
                    break;
                case "gdlow":
                    gameLow = gameDiv.innerHTML.stripTags().replace( /\s+/gi, '' );
                    break;
                case "gdprecip":
                    gamePrecip = gameDiv.innerHTML.stripTags();
                    break;
                case "gametime":
                    gameTime = gameDiv.innerHTML.stripTags();
                    break;
                }
            }
            var teamNames = gameLink.innerHTML.match( /\s*(\S[\S ]+\S)\s*@\s*(\S[\S ]+\S)\s*/i );
            for ( var i = 1; i < teamNames.length; i++ )
            {
                var teamAbbr = teamFullNames[ teamNames[ i ] ];
                if ( !teamForecasts.hasOwnProperty( teamAbbr ) )
                    teamForecasts[ teamAbbr ] = { hi:gameHi, low:gameLow, precip:gamePrecip, time:gameTime, loc:gameLocation, href:gameLink.href, details:null };
            }
        }
    }
    
    for ( var iCell = 0; iCell < teamCells.length; iCell++ )
    {
        var tds = teamCells[ iCell ].getElementsByTagName( 'td' );
        for ( var iTD = 0; iTD < tds.length; iTD++ )
        {
            if ( tds[ iTD ].getAttribute( "class" ).toLowerCase() == "weather" )
            {
                var td = tds[ iTD ];
                var teamAbbr = teamCells[ iCell ].getAttribute( "gncteam" );
                //if ( teamAbbr != 'mia' )
                //	continue;
                if ( teamForecasts.hasOwnProperty( teamAbbr ) )
                {
                    var teamForecast = teamForecasts[ teamAbbr ]; 
                    td.title = buildForecastString( teamAbbr );
                    var weatherLink = teamForecast.href.replace( /http:\/\/.*\.[a-z]+\//i, 'http://www.weather.com/' );
                    td.innerHTML = '<a target="sports" href="' + weatherLink  + '">' + td.innerHTML + '</a>';
                    if ( teamForecast.details == null )
                    {
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: weatherLink,
                            onload: getHandlerForTeamForecast( handleTeamForecast, td, teamAbbr, weatherLink ),
                            });
                    }
                    else
                    {
                        // TODO: Caching forecasts isn't working...  need to fix this to speed things up a bit
                        setTeamForecastDetails( td, teamForecast.details.img, teamForecast.details.tip );
                    }
                }
                else
                {
                    var img = td.getElementsByTagName( 'img' )[ 0 ];
                    img.style.display = 'none';
                }
                break;
            }
        }
    }
}

function getHandlerForTeamForecast( responseHandler, weatherCell, teamAbbr, weatherLink )
{
    return function (responseDetails)
    {
        responseHandler( responseDetails, weatherCell, teamAbbr, weatherLink );
    }
}

function handleTeamForecast( responseDetails, weatherCell, teamAbbr, weatherLink )
{
    var detailsImgUrl = null;
    var detailsTip = null;
    var detailsForecast = null;
    var windImpact = null;
    if ( responseDetails.status == 200 )
    {
        var html = responseDetails.responseText.replace( /(\r\n|\r|\n)+/g, '' ).replace( /^.*?(<div class="gdforcbody)/im, '$1' );
        html = html.replace( /^(.+<div class="gdwtxt">[^<]+<\/div>).*/i, '$1' );
        var span = document.createElement( 'span' );
        span.style.display = 'none';
        span.innerHTML = html;
        var divs = span.getElementsByTagName( 'div' );
        for ( var iDiv = 0; iDiv < divs.length; iDiv++ )
        {
            var div = divs[ iDiv ];
            var class = div.getAttribute( "class" );
            if ( class != null )
            {
            	class = class.toLowerCase();
            	if ( detailsImgUrl == null && class == 'gdforec1')
            	{
                   	detailsImgUrl = div.getElementsByTagName( 'img' )[ 0 ].src;
                   	GM_log( '1: ' + detailsImgUrl );
            	}

            	if ( detailsImgUrl == null && class == 'gdforcbody')
            	{
					if ( /indoor stadium/im.test( div.innerHTML ) )
						detailsImgUrl = INDOOR_IMG_URL;
                   	GM_log( '2: ' + detailsImgUrl );
            	}
            	
            	if ( windImpact == null && class == 'gdforcbody' )
				{
					if ( /indoor stadium/im.test( div.innerHTML ) )
						windImpact = 'INDOOR';
				}
				
				if ( windImpact == null && class == 'gdwspeed' )
				{
					if ( /wind impact/im.test( div.innerHTML ) )
						windImpact = div.innerHTML.stripTags().replace( /.*(wind impact:\s*\S+).*/i, '$1' );
				}
            	
            	if ( detailsForecast == null )
            	{
            		if ( class == 'gdforec1' )
                    	detailsForecast = div.getElementsByTagName( 'span' )[ 0 ].innerHTML.stripTags().replace( /\s+\/\s+/g, '/' );
            	}
            }
        }
        
        if ( windImpact == 'INDOOR' )
        	detailsTip = 'Indoor';
        else
			detailsTip = detailsForecast + ', ' + windImpact;

        teamForecasts[ teamAbbr ].details = { img:detailsImgUrl, tip:detailsTip };
        setTeamForecastDetails( weatherCell, detailsImgUrl, detailsTip );
    }
}

function setTeamForecastDetails( weatherCell, detailsImgUrl, detailsTip )
{
    var img = weatherCell.getElementsByTagName( 'img' )[ 0 ];
    img.style.display = 'none';

    var a = img.parentNode;
    img.parentNode.removeChild( img );
    var newImg = document.createElement( 'img' );
    newImg.src = detailsImgUrl;
    newImg.style.height = "23px";
    a.appendChild( newImg );

    if ( /indoor/i.test( detailsTip ) )
    {
    	weatherCell.title = weatherCell.title.replace( /^([^:]+:).*/i, '$1 Indoor' );
        var img = weatherCell.getElementsByTagName( 'img' );
        if ( img.length > 0 )
        {
            img = img[ 0 ];
            img.style.height = "13px";
        }
    }
    else
    {
    	weatherCell.title += ', ' + detailsTip;
    }
}

function buildForecastString( teamAbbr )
{
    if ( !teamForecasts.hasOwnProperty( teamAbbr ) )
        return '(unable to get forecast)';
    var tf = teamForecasts[ teamAbbr ];
    return tf.loc + ': ' + tf.hi + '/' + tf.low + ', P:' + tf.precip;
}

function getTeamCells()
{
    var teamCells = new Array();
    
    // Find all the team abbreviations
    var reTeamAbbr = new RegExp( '^@?(' + teamAbbrevs.join( '|' ) + ')$' );
    for ( var iTable = 0; iTable < playerTables.length; iTable++ )
    {
        var playerTable = playerTables[ iTable ];
        for ( var iRow = 0; iRow < playerTable.rows.length; iRow++ )
        {
            var row = playerTable.rows[ iRow ];
            if ( /^td$/i.test( row.cells[ 0 ].tagName ) )
            {
                for ( var iCell = 0; iCell < row.cells.length; iCell++ )
                {
                    var cell = row.cells[ iCell ];
                    var cellText = cell.innerHTML.stripTags();
                    var matches = cellText.match( reTeamAbbr );
                    if ( matches )
                    {
                        cell.setAttribute( "gncTeam", teamUrlAbbrevs[ matches[ 1 ] ] );
                        teamCells.push( cell );
                    }
                    if ( /^player/i.test( cell.getAttribute( "class" ) ) )
                    {
                        var span = cell.getElementsByTagName( 'span' );
                        if ( span.length > 0 )
                        {
                            span = span[ 0 ];
                            var playerPos = span.innerHTML.stripTags().replace( /\(\S{2,3}\s+-\s+(\S+)\)/i, '$1' );
                            cell.style.paddingRight = '2px';
                            cell.parentNode.setAttribute( "gncPlayerPos", playerPos );
                        }
                    }
                }
            }
        }
    }
    return teamCells;
}

}, 500 );

})();
