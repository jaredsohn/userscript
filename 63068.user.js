// ==UserScript==
// @name           Castle Age News Summary
// @namespace      krohn.ky
// @description    Summarizes your battle news
// @version        1.01
// @include        http://apps.facebook.com/castle_age/*
// ==/UserScript==

// Courtesy of "StevenD" Facebook Mafia Wars Autoplayer script (userscripts.org)
function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Courtesy of "erik a" Castle Age Autoplayer script (userscripts.org)
function findByAttrContains(obj,tag,attr,className) {
  if(attr == "className") { attr = "class"; }
  var q = document.evaluate(".//" + tag + "[contains(@" + attr + ",'" + className + "')]", obj, null,
                            XPathResult.FIRST_ORDERED_NODE_TYPE,null);
  if(q && q.singleNodeValue) { return q.singleNodeValue; }
  return null;
};

// Courtesy of sizzlemctwizzle from userscripts.org
function $(element) { return document.getElementById(element); }

// Courtesy of mredkj.com
function addCommas(nStr)
{
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


var BattleNewsSummarizer = {

  ParseDamage:function(src,type) {
    var re = new RegExp(type + ' <strong>(\\d+) damage', 'i');
    if (src.match(re)) {
      return parseInt(RegExp.$1);
    } else {
      return 0;
    }
  },

  ParseXP:function(src) {
    let died = src.match(/You were killed/i);
    if (src.match(/(\d+) experience/i)) {
      if (died) {
        return parseInt(RegExp.$1) * -1;
      } else {
        return parseInt(RegExp.$1);
      }
    } else {
      return 0;
    };
  },
  
  ParseDeaths:function(src) {
    if (src.match(/You were killed/i)) {
      return 1;
    } else {
      return 0;
    }
  },
  
  ParseAmount:function(src,isWin) {
    if (src.match(/(\$[0-9,]+)/)) {
      var amt = RegExp.$1;
      amt = amt.replace(/[^0-9]/g, '');
      return isWin ? parseInt(amt) : parseInt(amt) * -1;
    } else {
      return 0;
    }
  },

  ParseBattlePoints:function(src,isWin) {
    if (src.match(/(\d+)<a.+battlerank\.php/)) {
      var bp = parseInt(RegExp.$1);
      return isWin ? bp : bp * -1;
    } else {
      return 0;
    }
  },

  ProcessPage:function(e) {

    // Check if we've already calc'd the results and exit if so
    if ($('ca_news_summary')) {return;}
    
    // Find the Battle News update div
    var bn=$('app46755028429_battleUpdateBox');
    if (bn) {
      GM_log('Calculating summary...');

      var battles = 0;
      var won = 0;
      var lost = 0;
      var deaths = 0;
      var xp = 0;
      var dmgRcv = 0;
      var dmgGive = 0;
      var netAmt = 0;
      var netBp = 0;

      // Get all of the individual battle results
      var updates = xpath('//div[@class="alert_content"]', bn);
      for (var i = 0; i < updates.snapshotLength; i++) {
        u = updates.snapshotItem(i).innerHTML;

        battles++;

        var isWin = u.indexOf('Victory!') != -1;
        if (isWin) { won++ } else { lost++ };

        xp += BattleNewsSummarizer.ParseXP(u);
        deaths += BattleNewsSummarizer.ParseDeaths(u);
        dmgRcv += BattleNewsSummarizer.ParseDamage(u, 'taking');
        dmgGive += BattleNewsSummarizer.ParseDamage(u, 'dealing');
        netAmt += BattleNewsSummarizer.ParseAmount(u, isWin);
        netBp += BattleNewsSummarizer.ParseBattlePoints(u, isWin);
      }

      // Add a new div with the results right above the list of battles
      var div=document.createElement('div');
      div.id='ca_news_summary';
      div.style.padding='9px';
      div.innerHTML='<p><strong>News Summary</strong><br/>' + 
                    'Battles: ' + battles + ' (' + won + ' won / ' + lost + ' lost) gaining ' + xp + ' net XP.  Died ' + deaths + ' times!<br/>' +
                    'Damage: ' + dmgGive + ' inflicted / ' + dmgRcv + ' received<br/>' +
                    'Results: $' + addCommas(netAmt) + ' net coins / ' + netBp + ' net battle points</p>';
      var ac = findByAttrContains(bn, 'div', 'class','alertsContainer');
      bn.insertBefore(div, ac);
      
      // Resize the alerts container
      ac.style.height = '360px';
    }
  }
};


// Watch for page changes (courtesy of sizzlemctwizzle from userscripts.org)
function process() {
  $('content').removeEventListener('DOMNodeInserted', process, false);
  setTimeout(BattleNewsSummarizer.ProcessPage, 0);
  $('content').addEventListener("DOMNodeInserted", process, false);
}
     
// Wait for the page to load before we start listening (courtesy of sizzlemctwizzle from userscripts.org)
var checker=setInterval(function() {
  if($('content')) {
    clearInterval(checker);
    process();
  }
}, 100);
