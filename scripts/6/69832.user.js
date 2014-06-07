// ==UserScript==
// @name           Utopia Upgrade
// @namespace      Utopia
// @description    Modifies some links, adds wpa/tpa to throne, orders kingdompage, adds province gains above news
// @include        http://utopia-game.com/wol/game/*
// @author         Roga
// @version        0.3
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined')
    {
      window.setTimeout(GM_wait,1000);
    }
    else
    {
      $ = unsafeWindow.jQuery; letsJQuery();
    }
}

GM_wait();

// All your GM code must be inside this function
function letsJQuery()
{
  function getActiveSpellsAndPlaceAfter( htmlElement )
  {
   $.ajax({
      url: 'http://utopia-game.com/wol/game/council_spells',
      success: function(data){
        var activeSpells = $('#tabbed_panel .content-section',data).html();
        htmlElement.after(activeSpells);
        },
      dataType: "html"
    });
  }

/***********************************************
 * Menu
 ***********************************************/

  // News link to kingdom news in stead of province news
  $('#navigation ul li:eq(2) > a').attr('href', '/wol/game/kingdom_news');
  // Mystics link split into 2 links, for self spells and combat spells
  var mystics = $('#navigation ul:eq(2) > li:eq(0) a');
  $('</li><li><a href="/wol/game/sorcery">Combat Sp.</a>').insertAfter(mystics);
  mystics.html('Self spells');

/***********************************************
 * Throne Room
 ***********************************************/

  // Wpa + Tpa on throne room
  if( $('#throne-statistics tr:eq(3) .col2').html() ) //check if throneroom is there
  {
    var throneRoom = new Object();
    $('.middle-box').css({'width':'730px'});
    // Get info from throne
    var pieces = $('#throne-statistics tr:eq(3) .col2').html().split(',');
    var thiefInput = $('#throne-statistics tr:eq(5) .col4').html();
    var wizInput = $('#throne-statistics tr:eq(6) .col4').html();
    // Get number of thieves/wizards, drop mana/stealth
    var reWizards = /(\d{0,3},?\d{1,3}) \(\d{1,3}%\)/i;
    var wizards = reWizards.exec(trim(wizInput));
    var reThieves = /(\d{0,3},?\d{1,3}) \(\d{1,3}%\)/i;
    var thieves = reThieves.exec(trim(thiefInput));
    // remove , from number > 1000
    var thiefPieces = thieves[1].split(',');
    var wizPieces = wizards[1].split(',');

    // Put retrieved info in throneRoom object
    throneRoom.acres = parseInt(pieces[0]+pieces[1]);
    throneRoom.thieves = parseInt(thiefPieces[0]+thiefPieces[1]);
    throneRoom.wizards = parseInt(wizPieces[0]+wizPieces[1]);
    // Calc wpa/tpa
    throneRoom.wpa = throneRoom.wizards / throneRoom.acres;
    throneRoom.tpa = throneRoom.thieves / throneRoom.acres;

    $('#throne-statistics').after('<table id="wtpa"><tbody><tr><td>tpa: '+throneRoom.tpa.toString().substring(0,4)+'</td><td>wpa: '+throneRoom.wpa.toString().substring(0,4)+'</td></tr></tbody></table>');

    getActiveSpellsAndPlaceAfter( $('#wtpa') );
  }

  function trim(value)
  {
    value = value.replace(/^\s+/,'');
    value = value.replace(/\s+$/,'');
    return value;
  }

/***********************************************
 * Mystics page
 ***********************************************/

  if ( $('#combat-spells-statistics').html() )
  {
     getActiveSpellsAndPlaceAfter($( '#combat-spells-statistics') );
  }

/***********************************************
 * Building page
 ***********************************************/
  // Add building percentages
  if ($('#build-statistics tr:eq(0) td').html())
  {
    var pieces = $('#build-statistics tr:eq(0) td').html().split(',');
    var acres = parseInt(pieces[0]+pieces[1]);
    $('#tabbed_panel').css({'width':'110%','position':'relative','left':'-40px'});
    $('#build-buildings tr td').each(function(){
      if (!($(this).html() > '<input'))
      {
        var buildcount = parseInt($(this).html());
        var buildperc = buildcount/acres*100;
        $(this).html(buildcount.toString() +'('+ buildperc.toString().substring(0,4)+'%)');
      }
    });
  }

/***********************************************
 * Kingdom page
 ***********************************************/
  // Broaden Kingdom-page table
  $("#kingdom-details-provinces").css({'width':'120%', 'position':'relative', 'left':'-60px'})

  // Make kingdom page sortable, default sort on networth
  var kingdomPageProvs = new Array();
  $('#kingdom-details-provinces tbody tr').each(function(){
    var provinceName = $(this).children('td:eq(0)').html();
    var race = $(this).children('td:eq(1)').html();
    var acreString = $(this).children('td:eq(2)').html().split(' ');
    var acres = acreString[0].split(',');
    var networth = $(this).children('td:eq(3)').html().split(',');
    var nwpa = $(this).children('td:eq(4)').html();
    var honor = $(this).children('td:eq(5)').html();
    var kingdomPageProv = new Object();
    kingdomPageProv.provinceName = provinceName.toLowerCase();
    kingdomPageProv.race = race.toLowerCase();
    kingdomPageProv.acres = parseInt(acres[0]+acres[1]);
    kingdomPageProv.networth = parseInt(networth[0]+networth[1]+networth[2]);
    kingdomPageProv.nwpa = parseInt(nwpa);
    kingdomPageProv.honor = honor.toLowerCase();
    kingdomPageProv.htmlline = ($(this).html());
    kingdomPageProv.classes = $(this).attr('class');
    // Add province to array
    kingdomPageProvs.push(kingdomPageProv);
  });
  sortAndDisplayPage('networth');

  function sortAndDisplayPage(typeSort)
  {
    switch (typeSort)
    {
      case 'nwpa':
        kingdomPageProvs.sort(objectNwpaSort);
        break;
      case 'name':
        kingdomPageProvs.sort(objectNameSort);
        break;
      case 'race':
        kingdomPageProvs.sort(objectRaceSort);
        break;
      case 'acres':
        kingdomPageProvs.sort(objectAcreSort);
        break;
      case 'networth':
        kingdomPageProvs.sort(objectNwSort);
        break;
      case 'honor':
        kingdomPageProvs.sort(objectHonorSort);
        break;
      default:
        kingdomPageProvs.sort(objectNwSort);
        break;
    }
    // Create html output
    var outputKingdomPage = '';
    for(var k=0;k<kingdomPageProvs.length;k++)
    {
      outputKingdomPage += '<tr class="'+kingdomPageProvs[k].classes+'">' + kingdomPageProvs[k].htmlline + '</tr>';
    }
    // Show the html output
    $('#kingdom-details-provinces tbody').html(outputKingdomPage);
  }

  // Sorting functions
  function objectNwSort(a, b) {
    return b.networth - a.networth ;
  }

  function objectAcreSort(a, b) {
    return b.acres - a.acres ;
  }

  function objectNwpaSort(a, b) {
    return b.nwpa - a.nwpa ;
  }

  function objectNameSort(a, b) {
    var A = a.provinceName;
    var B = b.provinceName;
    if (A < B) return -1;
    if (A > B) return 1;
    return 0;
  }

  function objectRaceSort(a, b) {
    var A = a.race;
    var B = b.race;
    if (A < B) return -1;
    if (A > B) return 1;
    return 0;
  }

  function objectHonorSort(a, b) {
    var honorA = HonorTitleToValue(a.honor);
    var honorB = HonorTitleToValue(b.honor);
    return honorB - honorA;
  }

  function HonorTitleToValue( honorTitle )
  {
    var honorValue = 0;
    switch (honorTitle)
    {
      case 'peasant':
        honorValue = 1;
        break;
      case 'knight':
      case 'lady':
        honorValue = 2;
        break;
      case 'lord':
      case 'noble lady':
        honorValue = 3;
        break;
      case 'baron':
      case 'baroness':
        honorValue = 4;
        break;
      case 'viscount':
      case 'viscountess':
        honorValue = 5;
        break;
      case 'count':
      case 'countess':
        honorValue = 6;
        break;
      case 'marquis':
      case 'marchioness':
        honorValue = 7;
        break;
      case 'duke':
      case 'duchess':
        honorValue = 8;
        break;
      case 'prince':
      case 'princess':
        honorValue = 9;
        break;
      case 'king':
      case 'queen':
        honorValue = 10;
        break;
    }
    return honorValue;
  }

  // Make column headers clickable to sort the page
  $('#kingdom-details-provinces thead tr th:eq(0)').click(function(){sortAndDisplayPage('name');});
  $('#kingdom-details-provinces thead tr th:eq(1)').click(function(){sortAndDisplayPage('race');});
  $('#kingdom-details-provinces thead tr th:eq(2)').click(function(){sortAndDisplayPage('acres');});
  $('#kingdom-details-provinces thead tr th:eq(3)').click(function(){sortAndDisplayPage('networth');});
  $('#kingdom-details-provinces thead tr th:eq(4)').click(function(){sortAndDisplayPage('nwpa');});
  $('#kingdom-details-provinces thead tr th:eq(5)').click(function(){sortAndDisplayPage('honor');});

/***********************************************
 * News Page
 ***********************************************/
  const actionsByUs = '.news-actions-by-our-kingdom';
  const actionsAgainstUs = '.news-actions-against-our-kingdom';
  
  var friendlyAttackNews;
  var analyzedFriendlyAttackNews;
  var enemyAttackNews;
  var analyzedEnemyAttackNews;
  var isEnemy;

  var orderedResults;

  isEnemy = false;
  friendlyAttackNews = getNews(actionsByUs);
  analyzedFriendlyAttackNews = analyzeNews(friendlyAttackNews, isEnemy);

  isEnemy = true;
  enemyAttackNews = getNews(actionsAgainstUs);
  analyzedEnemyAttackNews = analyzeNews(enemyAttackNews, isEnemy);

  orderedResults = orderResults(analyzedFriendlyAttackNews, analyzedEnemyAttackNews);
  showResults(orderedResults);

  function getNews(className)
  {
    var newsArray = new Array();
    var items = $('#news').find(className);

    items.each(function(i){
    var theHtml = $(this).siblings('.news-incident-report').html();   //store original content
    $(this).siblings('.news-incident-report').children('a').remove(); //remove links from content
    newsArray[i] = $(this).siblings('.news-incident-report').html();  //store content without links
    $(this).siblings('.news-incident-report').html( theHtml );        //put links back on page
    });
    return newsArray;
  }

  function analyzeNews(newsItems, enemy)
  {
    var analyzedNews = new Array();

    var reType = /[^\(]+\(\),?\s([^\s]+).+/i;
    var reProvName = /([^\(]+).+/i;
    var reGains = /.+\s([^\s]+)\sacres.+/i;

    for(var i = 0; i < newsItems.length; i++)
    {
      var newsItem = new Object();

      var isAnalyzed = false;

      var victimMatches;
      var gainsMatches;
      var attackTypeMatches = reType.exec(newsItems[i]);
      var attackingProvMatches = reProvName.exec(newsItems[i]);
      var attackType;
      var attackSuccess;

      // attacktype checks
      var isFriendlyTrad = (attackTypeMatches[1] == 'captured') ? true : false;
      var isFriendlyAmbush = (attackTypeMatches[1] == 'recaptured') ? true : false;
      var isFriendlyFail = (attackTypeMatches[1] == 'attempted' && enemy == false) ? true : false;
      var isEnemyTrad = (attackTypeMatches[1] == 'invaded' && enemy == true && newsItems[i].match("killed") == null ) ? true : false;
      var isEnemyAmbush = (attackTypeMatches[1] == 'ambushed') ? true : false;
      var isEnemyFail = (attackTypeMatches[1] == 'atttempted') ? true : false;

      if ( isFriendlyTrad || isFriendlyAmbush )
      {
        var reVictim = /.+from\s(.+)\(\)/i;
        victimMatches = reVictim.exec(newsItems[i]);
        attackType = ( isFriendlyTrad ) ? 'Traditional March' : 'Ambush';
        attackSuccess = true;
        isAnalyzed = true;
      }

      if ( isEnemyTrad )
      {
        var reVictim = /.+invaded\s(.+)\(\)\sand.+/i;
        victimMatches = reVictim.exec(newsItems[i]);
        attackType = 'Traditional March';
        attackSuccess = true;
        isAnalyzed = true;
      }

      if ( isEnemyAmbush )
      {
        var reVictim = /.+from\s(.+)\(\)\sand.+/i;
        victimMatches = reVictim.exec(newsItems[i]);
        attackType = 'Ambush';
        attackSuccess = true;
        isAnalyzed = true;
      }

      if ( isEnemyFail )
      {
        var reVictim = /.+invade\s(.+)\(\)/i;
        victimMatches = reVictim.exec(newsItems[i]);
        attackType = 'Traditional March';
        attackSuccess = false;
        isAnalyzed = true;
      }

      if ( isFriendlyFail )
      {
        var reVictim = /.+invasion\sof\s(.+)\(\)[^\)]+/i;
        victimMatches = reVictim.exec(newsItems[i]);
        attackType = 'Traditional March';
        attackSuccess = false;
        isAnalyzed = true;
      }

      if ( isAnalyzed )
      {
        gainsMatches = reGains.exec(newsItems[i]);

        newsItem.attackingProv = attackingProvMatches[1];
        newsItem.victim = victimMatches[1];
        newsItem.attackType = attackType;
        newsItem.gains = ( attackSuccess ) ? gainsMatches[1] : 0;
        analyzedNews[i] = newsItem;
      }
    }
    return analyzedNews;
  }

  function orderResults( friendlyResults, enemyResults )
  {
    var provArrayOwn = new Array();
    var gainsArrayOwn = new Array();
    var totalHitsOwn = friendlyResults.length;
    var totalGainsOwn = 0;

    var provArrayEnemy = new Array();
    var gainsArrayEnemy = new Array();
    var totalHitsEnemy = enemyResults.length;
    var totalGainsEnemy = 0;

    for ( var resultLine in friendlyResults )
    {
      var province = trim(friendlyResults[resultLine].attackingProv.toString());
      var victim = trim(friendlyResults[resultLine].victim.toString());
      var gains = parseInt(friendlyResults[resultLine].gains);
      if(provArrayOwn[province] == undefined ) {
        provArrayOwn[province] = 1;
      } else {
        provArrayOwn[province] = parseInt(provArrayOwn[province]) + 1;
      }

      if (gainsArrayOwn[province] == undefined) {
        gainsArrayOwn[province] = gains;
      } else {
        gainsArrayOwn[province] = parseInt(gainsArrayOwn[province]) + gains;
      }

      if (provArrayEnemy[victim] == undefined) {
        provArrayEnemy[victim] = 0;
      }

      if (gainsArrayEnemy[victim] == undefined) {
        gainsArrayEnemy[victim] = 0 - gains;
      } else {
        gainsArrayEnemy[victim] = parseInt(gainsArrayEnemy[victim]) - gains;
      }
      totalGainsOwn += gains;
    }

    for ( var resultLine in enemyResults )
    {
      var province = trim(enemyResults[resultLine].attackingProv.toString());
      var victim = trim(enemyResults[resultLine].victim.toString());
      var gains = parseInt(enemyResults[resultLine].gains);

      if(provArrayEnemy[province] == undefined ) {
        provArrayEnemy[province] = 1;
        gainsArrayEnemy[province] = gains;
      } else {
        provArrayEnemy[province] = parseInt(provArrayEnemy[province]) + 1;
        gainsArrayEnemy[province] = parseInt(gainsArrayEnemy[province]) + gains;
      }

      if (provArrayOwn[victim] == undefined) {
        provArrayOwn[victim] = 0;
      }

      if (gainsArrayOwn[victim] == undefined) {
        gainsArrayOwn[victim] = 0 - gains;
      } else {
        gainsArrayOwn[victim] = parseInt(gainsArrayOwn[victim]) - gains;
      }
      totalGainsEnemy += gains;
    }

    var i = 0;
    var sortedOwn = new Array();
    for (var province in provArrayOwn)
    {
      sortedOwn[i] = new provinceResult(province, gainsArrayOwn[province], provArrayOwn[province]);
      i++;
    }

    var j = 0;
    var sortedEnemies = new Array();
    for (var province in provArrayEnemy)
    {
      sortedEnemies[j] = new provinceResult(province, gainsArrayEnemy[province], provArrayEnemy[province]);
      j++;
    }
    sortedOwn.sort(function(a, b){return  b.gains - a.gains;});
    sortedEnemies.sort(function(a, b){return  b.gains - a.gains;});
    var sortedArrays = new Object();
    sortedArrays.own = sortedOwn;
    sortedArrays.enemy = sortedEnemies;
    var orderedResults = new Array(sortedArrays, totalGainsOwn, totalGainsEnemy, totalHitsOwn, totalHitsEnemy);
    return orderedResults;
  }

  function provinceResult( provName, gains, hits)
  {
    this.provName = provName;
    this.gains = gains;
    this.hits = hits;
  }
  
  function showResults( orderedResults )
  {
    var outputHtml;
    outputHtml = makeOutput(orderedResults[0].own, orderedResults[1], orderedResults[3], 'right');
    $('#kingdom-news-legend').after(outputHtml);

    outputHtml = makeOutput(orderedResults[0].enemy, orderedResults[2], orderedResults[4], 'left');
    $('#kingdom-news-legend').after(outputHtml);
  }

  function makeOutput( results, totalGains, totalHits, position )
  {
    var netGains = 0;
    var output = '';
    var summaryOutput = '';

    for ( var province in results )
    {
      var textcolor = (results[province].gains > 0) ? 'green' : 'red';
      output += '<li style="color:' + textcolor + '">';
      output += '<span style="float:left;width:200px;text-align:left;">';
      output += results[province].hits + ' - ' + results[province].provName;
      output += ':</span>';
      output += '<span style="float:right;width:75px;text-align:right;">';
      output += results[province].gains;
      output += '</span></li>';

      netGains += parseInt(results[province].gains);
    }
    output += '</ul>';
    summaryOutput += '<ul style="float:' + position + ';width:275px;">';
    summaryOutput += '<li>Trad&Ambush Attacks: '+ totalHits +'</li>';
    summaryOutput += '<li>Total Gains: '+ totalGains +'</li>';
    summaryOutput += '<li>Net Gains: ' + netGains + '</li>';

    return summaryOutput + output;
  }
}
