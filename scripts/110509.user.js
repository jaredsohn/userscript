// ==UserScript==
// @name          Nedermagic toolbox
// @namespace 	  http://www.nedermagic.nl/pp_item.asp?userid=24637
// @description	  Een add-on voor nedermagic om jou het leven makkelijker te maken. ALPHA versie! Werkt nog voor geen porem!:)
// @author        Marijn Hofstra
// @include       http://www.nedermagic.nl/*
// ==/UserScript==

var toolbox = new Object();

function toolbox_initvars() {
  toolbox.intUserID = '0';
  toolbox.arrCards = [];
  toolbox.arrHaves = [];
  toolbox.arrWants = [];
  toolbox.strURL_base = 'http://www.nedermagic.nl';
  toolbox.strURL_pp = toolbox.strURL_base + '/pp_item.asp';

  toolbox.regex_url_card = /meerinfo.asp\?cardid=([0-9]+)/;
  toolbox.regex_url_pp = /pp_item.asp\?userid=[0-9]+\&toolbox_tag=([a-zA-Z0-9_-]+)/;

  toolbox.regex_expansion = /[\s]*sd\(['"]([a-zA-Z0-9_]+)\/[a-zA-Z0-9_]+\.jpg['"]\)[\s]*/;
  toolbox.regex_cardname = /[\s]*sd\(['"][a-zA-Z0-9_]+\/([a-zA-Z0-9_]+)\.jpg['"]\)[\s]*/;
  toolbox.regex_cardcount = /([0-9]+)\s?[xX#*]?/;

  toolbox.strCurrType = 'onbekend';
  toolbox.strTmpcontainer = '<div id="toolbox_tmpcontainer" style="display: none;"></div><div id="toolbox_panel"></div>';
  toolbox.strButtons = '<input type="button" value="eigenpp" id="eigenpp"><input type="button" value="test2" id="otherpp"><input type="text" size="5" id="otheruserid" value="40149"><input type="button" value="trade" id="trade"><input type="button" value="trade_alles" id="trade_alles">';
  toolbox.textarea1 = '<textarea rows="50" cols="50" id="test1" style="display: none;"></textarea>'
  toolbox.textarea2 = '<textarea rows="50" cols="50" id="test2" style="display: none;"></textarea>'
  toolbox.textarea3 = '<textarea rows="50" cols="50" id="test3" style="display: none;"></textarea>'
}

function toolbox_init() {
  toolbox_initvars();
  
  var job = $.getUrlVar('toolbox_job');
  toolbox.intUserID = $.getUrlVar('userid');
  if (toolbox.intUserID) toolbox.intUserID = toolbox.intUserID.toString();
  switch(job) {
    case '':
    case undefined:
      $('body').append(toolbox.strButtons+toolbox.strTmpcontainer+toolbox.textarea1+toolbox.textarea2+toolbox.textarea3);
      document.getElementById('eigenpp').addEventListener("click", button_eigenpp, false);
      document.getElementById('otherpp').addEventListener("click", button_otherpp, false);
      document.getElementById('trade').addEventListener("click", trade, false);
      document.getElementById('trade_alles').addEventListener("click", trade_alles, false);
      break;
    case 'parsepp':
      parsePP(true);
      break;
    default:
      break;
  };
}

function button_eigenpp() {
  parsePP(false);
}

function button_otherpp() {
  parseOtherPP($('#otheruserid').val());
}

/*
function listMatches(arrA, arrB) {
  var output = [];
  for (var i = 0; i < arrA.length; i++) {
    
  for (var cardidA in arrA) {
    var currlistA = arrA[listA];
    for (var i = 0; i < currlistA.length; i++) {
      var cardA = currlistA[i];
      if (arrB[cardA[i]['cardid']
}
*/

function trade() {
  var output = [];
  for (var havecard in toolbox.arrHaves[toolbox.intUserID]) {
    for (var intUserID in toolbox.arrWants) {
      alert('trading with '  + intUserID);
      if (intUserID == toolbox.intUserID) continue;
      for (var wantcard in toolbox.arrWants[intUserID]) {
        if (havecard == wantcard) {
          output[output.length] = 'my have ' + havecard + ' wanted by ' + intUserID;
        }
      }
    }
  }
  
  for (var wantcard in toolbox.arrWants[toolbox.intUserID]) {
    for (var intUserID in toolbox.arrHaves) {
      if (intUserID == toolbox.intUserID) continue;
      for (var havecard in toolbox.arrHaves[intUserID]) {
        if (havecard == wantcard) {
          output[output.length] = 'my want ' + wantcard + ' for trade by ' + intUserID;
        }
      }
    }
  }
  $("#test3").show();
  $("#test3").val(output.join('\r\n'));
}

function trade_alles() {
  var output = [];
  for (var i = 0; i < toolbox.arrCards[toolbox.intUserID].length; i++) {
    for (var intUserID in toolbox.arrCards) {
      if (intUserID == toolbox.intUserID) continue;
      if (!output[intUserID]) output[intUserID] = [];
      for (var j = 0; j < toolbox.arrCards[intUserID].length; j++) {
        var have = toolbox.arrCards[toolbox.intUserID][i][0];
        var want = toolbox.arrCards[intUserID][j][0];
        if (have['cardname'] == want['cardname']) {
          output[intUserID][output[intUserID].length] = 'my card ' + have['cardname'] + ' present at ' + intUserID;
        }
      }
    }
  }
  /*for (var havecard in toolbox.arrCards[toolbox.intUserID]) {
    for (var intUserID in toolbox.arrCards) {
      if (intUserID == toolbox.intUserID) continue;
      for (var wantcard in toolbox.arrCards[intUserID]) {
        if (havecard == wantcard) {
          output[output.length] = 'my card ' + havecard + ' present at ' + intUserID;
        }
      }
    }
  }*/
  var tmp = [];
  tmp[tmp.length] = 'Trading for: ' + toolbox.intUserID;
  for (var p in output) {
    if (output[p].length > 0) {
      tmp[tmp.length] = output[p].join('\r\n');
    }
  }
  tmp = tmp.join('\r\n');
  $("#test3").show();
  $("#test3").val(tmp);
}


function parsePP(blnCallBack) {
  var objTmp;
  objTmp = getCardList("body");
  if (blnCallBack) {
    // let op, wordt alleen door pp in iframe aangeroepen
    //objTmp.intUserID = toolbox.intUserID;
    //setValHack(toolbox.intUserID, objTmp.arrCards, objTmp.arrHaves, objTmp.arrWants);
    //setValHack(objTmp);
    var strJSON = JSON.stringify(objTmp.arrCards);
    /*toolbox.unsafeWindow.parent.toolbox.arrCards[toolbox.intUserID] = objTmp.arrCards;
    toolbox.unsafeWindow.parent.toolbox.arrHaves[toolbox.intUserID] = objTmp.arrHaves;
    toolbox.unsafeWindow.parent.toolbox.arrWants[toolbox.intUserID] = objTmp.arrWants;*/
    GM_setValue('iframedata', strJSON);
    GM_setValue('userid', toolbox.intUserID);
    //winowsetTimeout('unsafeWindow.parent.printPP(\'' + toolbox.intUserID + '\')', 50);
  } else {
    toolbox.arrCards[toolbox.intUserID] = objTmp.arrCards;
    toolbox.arrHaves[toolbox.intUserID] = objTmp.arrHaves;
    toolbox.arrWants[toolbox.intUserID] = objTmp.arrWants;
    $("#test1").show();
    printPP(toolbox.intUserID);
  }
}

function parseOtherPP(intUserID) {
  if (parseInt(intUserID).toString() != intUserID) {
    alert('fout userid ' + intUserID);
    return;
  }
  var strUrl = toolbox.strURL_pp + '?userid=' + intUserID + '&toolbox_job=parsepp';
  $("#test2").show();
  $('#toolbox_tmpcontainer').append('<iframe name="tmp" id="tmp" src="' + strUrl + '" style="display: block;"></iframe>');
  setTimeout(readIFrameData, 5000);
}

function readIFrameData() {
  var tmp = GM_getValue('iframedata');
  $('#test3').val(tmp);
  tmp = JSON.parse(tmp);
  //alert(tmp.intUserID);
  var intUserID = GM_getValue('userid').toString();
  toolbox.arrCards[intUserID] = tmp;
  //toolbox.arrHaves[tmp.intUserID] = tmp.arrHaves;
  //toolbox.arrWants[tmp.intUserID] = tmp.arrWants;
  printPP(intUserID);
}

function printPP(intUserID) {
  if (intUserID == toolbox.intUserID) {
    $("#test1").val(makeCardListPrint(toolbox.arrCards[intUserID]));
  } else {
    $("#test2").val(makeCardListPrint(toolbox.arrCards[intUserID]));
  }
}

function makeCardListPrint(arrCardList) {
  var output = [];
  for (var cardid in arrCardList) {
    for (var j = 0; j < arrCardList[cardid].length; j++) {
      for (var prop in arrCardList[cardid][j]) {
        output[output.length] = prop + ': ' + arrCardList[cardid][j][prop];
      }
    }
  }
  return output.join('\r\n');
}

function getCardList(startingElement) {
  var arrCards = [];
  var arrHaves = [];
  var arrWants = [];
  $(startingElement + " a").each(
    function(index) {
      var href = $(this).attr('href');
      if (href == undefined) return;

      var type = toolbox.regex_url_pp.exec(href);
      if (!type || type[1] == '') {
        type = toolbox.strCurrType;
      } else {
        toolbox.strCurrType = type[1];
        type = type[1];
        //toolbox.arrTypes[type] = true;
      }
      if (type == 'negeer') return;
      var matches = toolbox.regex_url_card.exec(href);
      if (!matches) return;
      var cardid = matches[1].toString();
      var onmouseover = $(this).attr('onmouseover').toString();
      onmouseover = onmouseover.split('\n')[1];

      var cardname = toolbox.regex_cardname.exec(onmouseover);
      var expansion = toolbox.regex_expansion.exec(onmouseover);
      if (!cardname || !expansion) return;
      cardname = cardname[1];
      expansion = expansion[1];
      var count = '';
      var tmpcount = $(this).context.previousSibling.data;
      if (tmpcount && tmpcount.length < 5) {
        tmpcount = toolbox.regex_cardcount.exec(tmpcount);
        if (tmpcount && parseInt(tmpcount[1]).toString() == tmpcount[1]) {
          count = tmpcount[1]
        }
      }
      if (!arrCards[cardid]) {
        arrCards[cardid] = [];
      }
      arrCards[cardid][arrCards[cardid].length] = {'cardid': cardid, 'count': count, 'cardname': cardname, 'expansion': expansion, 'type': type};
      
      if (type == 'have') {
        if (!arrHaves[cardid]) {
          arrHaves[cardid] = [];
        }
        arrHaves[cardid][arrHaves[cardid].length] = arrCards[cardid][arrCards[cardid].length -1];
      } else if (type == 'want') {
        if (!arrWants[cardid]) {
          arrWants[cardid] = [];
        }
        arrWants[cardid][arrWants[cardid].length] = arrCards[cardid][arrCards[cardid].length -1];
      }
      // kaarten ook per type opslaan
      //arrHaves[arrTypes[type].length] = arrCards[cardid][arrCards[cardid].length -1];
    }
  );
  var tmp = new Object();
  /*tmp.arrCards = arrCards;
  tmp.arrHaves = arrHaves;
  tmp.arrWants = arrWants;*/
  var x = 0;
  var arrJSON = [];
  for (var p in arrCards) {
    arrJSON[arrJSON.length] = JSON.stringify(arrCards[p]);
  }
  arrJSON = '[' + arrJSON.join(',') + ']';
  tmp.arrCards = JSON.parse(arrJSON);
  arrJSON = [];
  for (var p in arrHaves) {
    arrJSON[arrJSON.length] = JSON.stringify(arrHaves[p]);
  }
  arrJSON = '[' + arrJSON.join(',') + ']';
  tmp.arrHaves = JSON.parse(arrJSON);
  arrJSON = [];
  for (var p in arrWants) {
    arrJSON[arrJSON.length] = JSON.stringify(arrWants[p]);
  }
  arrJSON = '[' + arrJSON.join(',') + ']';
  tmp.arrWants = JSON.parse(arrJSON);
  //alert(tmp.length);
  return tmp;
}

function toolbox_onload() {
  $.extend({
    getUrlVars: function(){
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    },
    getUrlVar: function(name){
      return $.getUrlVars()[name];
    }
  });
  
  toolbox_init();
}

//window.addEventListener('onload',  toolbox_onload, true); 

var $;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    //alert($); // check if the dollar (jquery) function works
    //alert($().jquery); // check jQuery version
    //alert('unsafewindow ' + unsafeWindow.parent);
    toolbox_onload();
}

/*setup:
- cookie met userid en prefs 
- elke page draait init
- voor elke pagetype een parser
- eigen pp pagina doet gm_setvalue(mycards)
*/

// sla results op die door mainwindow kunnen worden opgehaald
// check na 1-3 seconden of dit gelukt is
function storeResults(arrCards, idvandata) {
  setvalue('data'+idcounter, idvandata)
  setvalue(idcounter, idcounter+1)
  settimeout(checkStoreResults(arrCards, id, idcounter), 1000 + math.random() * 2000)
}

// checkt of results zijn opgeslagen en niet zijn overschreven doordat een andere pagina
// tegelijkertijd op de betreffende locatie probeerde te schrijven
// is alles in orde, dan doen we niets
// is de data overschreven, sla dan opnieuw op
function checkstoreResults(arrCards, idvandata, assignedid) {
  if ((getValue('data'+idcounter) == idvandata) || (getValue('data'+idcounter) == idvandata+'OK')) {
    return;
  } else {
    storeResults(arrCards, idvandata);
  }
}

function getResults() {
  var results = [];
  idcounter = getValue('idcounter')
  for (var i = 0; i < idcounter; i++) {
    idvandata = getValue('data' + i);
    results[results.length] = getValue(idvandata);
    setValue('data'+i, idvandata+'OK');
  }
}
