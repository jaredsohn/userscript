// ==UserScript==
// @name           11Strong AutoTrainer
// @namespace      monsterkill
// @include        http://11strong.com/account/home
// ==/UserScript==

/*
    make your changes here

    playerId : 'attribute name'

    list of valid attribute names:
      'strength'
      'pace'
      'acceleration'
      'stamina'
      'reflex'
      'composure'
      'ball_control'
      'finishing'
      'passing'
      'marking'
      'tackling'
      'heading'
      'handling'
      'blocking'

    edit the player id on the left and the attribute name on the right
    add as many lines to the list as you want
*/
playerAttributeMap = {
  1234 : 'strength',
  6718 : 'ball_control',
};

/****************************************************************************/
/*   DONT CHANGE ANYTHING AFTER THIS LINE
/****************************************************************************/

var allAttributes = {
  'strength': 1,
  'pace': 1,
  'acceleration': 1,
  'stamina': 1,
  'reflex': 1,
  'composure': 1,
  'ball_control': 1,
  'finishing': 1,
  'passing': 1,
  'marking': 1,
  'tackling': 1,
  'heading': 1,
  'handling': 1,
  'blocking': 1
};

function getCostToRaise(currentValue) {
  if (currentValue > 14) {
    return (currentValue-12)*7;
  } else {
    alert('cant have an attribute at '+currentValue+', something is wrong');
    return null;
  }
}

function serializeFormData(attrMap) {
  var text = '';
  for (a in attrMap) {
    text += '&'+a+'='+attrMap[a];
  }
  return text;
}
function submitAttributeForm(playerId, attributes) {
  GM_xmlhttpRequest({
    method: "POST",
    url: 'http://11strong.com/player/submitap?',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: 'player_id='+playerId+serializeFormData(attributes),
    onload: function(responseDetails) {
    }
  });
}

function spendAP(playerId, attributeName) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://11strong.com/player/spendap?player_id='+playerId,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html'
    },
    onload: function(responseDetails) {
       var tmpAttr = {};
       for (attr in allAttributes) {
         var currAttValue = getAttrCurrValue(attr, responseDetails.responseText);
         if (currAttValue > 14) {
             tmpAttr[attr] = currAttValue;
         } else {
             alert('couldnt find player id '+playerId);
             return;
         }
       }
       if (allAttributes[attributeName] != 1) {
           alert('invalid attribute name: '+attributeName);
           return;
       }
       var cost = getCostToRaise(tmpAttr[attributeName]);
       var currentAP = getCurrentAP(responseDetails.responseText);
       if (currentAP > cost) {
         tmpAttr[attributeName] = tmpAttr[attributeName]+1;
         console.log('playerId:'+playerId+' raised '+attributeName+' to '+tmpAttr[attributeName]);
         submitAttributeForm(playerId, tmpAttr);
       } else {
         console.log('playerId',playerId, ' cant raise '+attributeName+': too expensive');
       }
    }
  });
}
function getCurrentAP(pageText) {
  var text = pageText;
  var pattern1 = 'div id="totalap">';
  var pattern2 = '</div';
  var idx = text.indexOf(pattern1);
  if (idx) {
    text = text.slice(idx+pattern1.length, text.length);
    var currValue = text.slice(0, text.indexOf(pattern2));
    return Number(currValue);
  } else {
    console.log('failed to find pattern:\n'+pattern1);
    return -1;
  }
}
/*
  finds the attribute value on the given text
*/
function getAttrCurrValue(attr, pageText) {
  var text = pageText;
  var pattern1 = 'id="'+attr+'" name="'+attr+'" value="';
  var pattern2 = '"';
  var idx = text.indexOf(pattern1);
  if (idx) {
    text = text.slice(idx+pattern1.length, text.length);
    var currValue = text.slice(0, text.indexOf(pattern2));
    return Number(currValue);
  } else {
    return -1;
  }
}

function start() {
  clearInterval(main);

  for (playerId in playerAttributeMap) {
    spendAP(playerId, playerAttributeMap[playerId]);
  }
}

var main = setInterval(start,500);
