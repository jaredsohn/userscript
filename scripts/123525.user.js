// ==UserScript==
// @name    Facebook Words With Friends Auto Player
// @namespace   wordswithfriends
// @description   Auto plays your Words With Friends games
// @include   *://wwf-fb.zyngawithfriends.com*
// @include   *://apps.facebook.com/wordswithfriends*
// @include   *://www.scrabulizer.com*
// @exclude   *xd_receiver_zynga.html*
// @version 0.1.11
// @contributor Fragger
// ==/UserScript==

if(document.location.toString().indexOf('www.scrabulizer.com') != -1) {
  if(top != self) {
    checkForCopy();
  }
  return;
} else if(document.location.toString().toLowerCase().indexOf('apps.facebook.com/wordswithfriends') != -1) {
  var iframe = document.createElement('iframe');
  var style = document.createElement('style');
  iframe.src = 'http://www.scrabulizer.com/#mainContainer';
  iframe.id = 'scrabulizer';
  if(GM_getValue('autoPlay', 1) == 0) {
    addIframeAutoOff(iframe);
  } else {
    addIframeAutoOn(iframe);
  }

  style.innerHTML = '#iframe_canvas[style] { height: 752px !important; }';
  document.getElementsByTagName('head')[0].appendChild(style);
  
  //Update Checker script from http://userscripts.org/scripts/show/20145
  var SUC_script_num = 123525;
  try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
  
  GM_registerMenuCommand('Facebook Words With Friends Auto Player - Set Game Delay', waitMin);
  GM_registerMenuCommand('Facebook Words With Friends Auto Player - Autoplay Toggle', autoPlayToggle);
  GM_registerMenuCommand('Facebook Words With Friends Auto Player - Post Achievement Points Toggle', postAchievementPointsToggle);
  GM_registerMenuCommand('Facebook Words With Friends Auto Player - Post Achievement Min Points', postAchievementMinPoints);
  GM_registerMenuCommand('Facebook Words With Friends Auto Player - Post Achievement Other Toggle', postAchievementOtherToggle);
  GM_registerMenuCommand('Facebook Words With Friends Auto Player - Default Word Sort Toggle', wordSortToggle);
  return;
}

var activeBoardXPath = "//div[contains(@id, 'game_') and contains(@class, 'shown') and contains(@class, ' active')]";
GM_setValue('loadCheck', 0);
loadCheck();

function loadCheck() {
  if(document.location.toString().indexOf('wwf-fb.zyngawithfriends.com') != -1 && xpath("//body[contains(@class, '-grade')]").snapshotLength > 0 && GM_getValue('loadCheck') == 0) {
    GM_setValue('loadCheck', 1);
    GM_setValue('checkActive', 0);
    checkPassThrough();
  } else if(GM_getValue('loadCheck') == 0) {
    window.setTimeout(loadCheck, 3*1000);
  }
}

function checkPassThrough() {
  GM_setValue('loadCheck', 1);
  cancelAchievement();
  closeFBDiag();
  closeAdDiag();
  beatDiag();
  if(xpath("//div[@id='game_summaries']/div[@class='my_move']//li[contains(@class, 'game ')]/a").snapshotLength > 0) {
    if(GM_getValue('boardCopyBack', '') != '') {
      doMoves();
    }
    if(xpath("//div[@id='game_summaries']/div[@class='my_move']//li[1][contains(@class, 'active') or contains(@class, 'loading')]").snapshotLength == 0) {
      pickGame();
    }
    acceptGame();
    if(GM_getValue('checkActive', 0) == 0) {
      checkActive();
    }
  } else {
    GM_setValue('checkActive', 0);
  }
  window.setTimeout(checkPassThrough, 1*1000);
}

function checkForCopy() {
  if(GM_getValue('boardCopy', '') != '') {
    pasteBoard();
  }
  window.setTimeout(checkForCopy, 1*1000);
}

function doMove(letter, x, y) {
  var selectLetter;
  var selectSpace;
  var selectMovedLetter;
  var selectSpaceCenterX;
  var selectSpaceCenterY;
  var blankSelect;
  if(letter == letter.toLowerCase()) {
    selectLetter = xpath(activeBoardXPath + "//div[contains(@class, 'letter_space')]/div/span[contains(@class, 'points-0')]/..");
  } else {
    selectLetter = xpath(activeBoardXPath + "//div[contains(@class, 'letter_space')]/div/span[contains(text(), '" + letter.toLowerCase() + "')]/..");
  }
  selectSpace = xpath(activeBoardXPath + "//div[contains(@class, 'space_" + x + "_" + y + "')]");
  if( selectLetter.snapshotLength > 0 && selectSpace.snapshotLength > 0 ) {
    selectSpace.snapshotItem(0).appendChild(selectLetter.snapshotItem(0));
    selectMovedLetter = selectLetter.snapshotItem(0);
    selectSpaceOffset = documentOffset(selectMovedLetter);
    mouse(selectMovedLetter, 'mousedown',  selectSpaceOffset[0] + 35/2, selectSpaceOffset[1] + 35/2);
    mouse(selectMovedLetter, 'mouseup',  selectSpaceOffset[0] + 35/2, selectSpaceOffset[1] + 35/2);
  }
  if(letter == letter.toLowerCase()) {
    blankSelect = xpath("//div[@id='dialog_select_blank']/a[contains(text(), '" + letter.toUpperCase() + "')]");
    if( blankSelect.snapshotLength > 0 ) {
      mouse(blankSelect.snapshotItem(0), 'mouseup');
    }
  }
}

function doCopyBoard() {
  var x = 0;
  var y = 0;
  var i = 0;
  var selectLetters;
  var selectPoints;
  var selectRack;
  var cords;
  var letters = [];
  var rack = [];
  var xCords = [];
  var yCords = [];

  cleanBadGames();

  selectLetters = xpath(activeBoardXPath + "//div/span[contains(@class, 'tile')]");
  for(i = 0; i<selectLetters.snapshotLength; i++) {
    cords = selectLetters.snapshotItem(i).parentNode.getAttribute('class').split(' ')[0].split('_');
    xCords[xCords.length] = cords[1];
    yCords[yCords.length] = cords[2];
    selectPoints = xpath(activeBoardXPath + "//div[contains(@class, 'space_" + cords[1] + "_" + cords[2] + " ')]/span[contains(@class, 'points-0')]");
    if(selectPoints.snapshotLength > 0) {
      letters[letters.length] = selectLetters.snapshotItem(i).innerHTML;
    } else {
      letters[letters.length] = selectLetters.snapshotItem(i).innerHTML.toUpperCase();
    }
  }
  selectRack = xpath(activeBoardXPath + "//div[@class='rack']/div/div/div/span[contains(@class, 'points')]");
  for(i = 0; i<selectRack.snapshotLength; i++) {
    if(selectRack.snapshotItem(i).innerHTML != '0') {
      rack[rack.length] = xpath("./../span[contains(@class, 'letter')]",selectRack.snapshotItem(i)).snapshotItem(0).innerHTML.toUpperCase();
    } else {
      rack[rack.length] = ' ';
    }
  }
  if(letters.length > 0 || rack.length > 0) {
    GM_setValue('boardCopy', letters.join(',') + ';' + xCords.join(',') + ';' + yCords.join(',') + ';' +  rack.join(','));
  }
}

function pasteBoard() {
  document.getElementById('sort_by_' + GM_getValue('sort', 'value') + '_rad').checked = true;
  xpath("//select[@id='staticDesignSelect']/option[@value='wordsWithFriends']").snapshotItem(0).selected = true;
  xpath("//select[@id='selected_dictionary_dd']//option[text()='ENABLE']").snapshotItem(0).selected = true;
  xpath("//select[@id='opponent_count_dd']/option[@value='1']").snapshotItem(0).selected = true;
  if(GM_getValue('autoPlay', 1) == 0) {
    if(!document.getElementById('copy-word-btn')) {
      var copyWordDiv = document.createElement('div');
      var copyWordButton = document.createElement('button');
      var copyWordButtonSpan = document.createElement('span');
      var copyWordButtonSpanSpan  = document.createElement('span');
      document.getElementById('save-btns').setAttribute('style', 'display: none;');
      copyWordDiv.id = 'copy-word-btn';
      document.getElementById('get-sols-btn').parentNode.appendChild(copyWordDiv);
      copyWordButton.setAttribute('class', 'button get-solutions constructive');
      copyWordButton.title = 'Copy Word Back and Hit Play';
      copyWordButton.type = 'button';
      copyWordButton.id = 'copyWordButton';
      copyWordDiv.appendChild(copyWordButton);
      copyWordButton.appendChild(copyWordButtonSpan);
      copyWordButtonSpanSpan.innerHTML = 'Copy Word Back and Hit Play';
      copyWordButtonSpan.appendChild(copyWordButtonSpanSpan);
    }
    document.location = '#mainContainer';
  } else {
    document.getElementById('save-btns').removeAttribute('style');
    if(document.getElementById('copy-word-btn')) {
      document.getElementById('copy-word-btn').parentNode.removeChild(document.getElementById('copy-word-btn'));
    }
  }
  
  document.location = 'javascript:doResetBoard();resetRack();staticDesignSelectChange();onChangeDictionary();onChangeOpponents();void(0)';

  GM_setValue('boardCopyBack', '');

  window.setTimeout(doPasteBoard, 1*1000);
}

function doPasteBoard() {
  var i = 0;
  var selectSpace;
  var selectCase;
  var selectRack;
  var selectRackPoint;
  var letters = [];
  var xCords = [];
  var yCords = [];
  var rack = [];
  var board = GM_getValue('boardCopy', '').split(';');
  GM_setValue('boardCopy', '');
  if(board[0] != '') {
    letters = board[0].split(',');
  }
  xCords = board[1].split(',');
  yCords = board[2].split(',');
  if(board[3] != '') {
    rack = board[3].split(',');
  }
  
  for(i = 0; i<letters.length; i++) {
    selectSpace = document.getElementById('s_' + xCords[i] + '_' + yCords[i]);
    selectSpace.value = letters[i];
    selectCase = xpath("//input[@id='s_" + xCords[i] + "_" + yCords[i] + "']/..");
    if(letters[i] == letters[i].toLowerCase()) {
      selectCase.snapshotItem(0).className='blank tile';
    } else {
      selectCase.snapshotItem(0).className='tile';
    }
  }
  for(i = 0; i<rack.length; i++) {
    selectRack = document.getElementById('rack_' + i);
    selectRack.value = rack[i];
    selectRack.className = 'racktile';
    if(rack[i] != ' ') {
      selectRackPoint = document.getElementById('tileNumber' + i); 
      selectRackPoint.innerHTML = document.getElementById('ts' + rack[i]).value;
    }
  }
  document.getElementById('rack').value = rack.join('');
  mouse(xpath("//div[@id='get-sols-btn']/button").snapshotItem(0), 'click');
  if(GM_getValue('autoPlay', 1) == 1) {
    window.setTimeout(doCopyBack, 1*1000);
  } else {
    document.getElementById('copyWordButton').addEventListener('click', doCopyBack, true);
  }
}

function doCopyBack() {
  var playLetters;
  var id;
  var letters = [];
  var xCords = [];
  var yCords = [];
  var i;

  if(document.getElementById('copyWordButton')) {
    document.getElementById('copyWordButton').removeEventListener('click', doCopyBack, true);
  }

  if(xpath("//div[@id='resultsContent']/p").snapshotItem(0).innerHTML == 'Sorry, there were no solutions found.') {
    GM_setValue('boardCopyBack', '*');
  } else {
    playLetters = xpath("//div[contains(@class, 'movetile')]/input");
    for(i = 0; i<playLetters.snapshotLength; i++) {
      letters[letters.length] = playLetters.snapshotItem(i).value;
      id = playLetters.snapshotItem(i).id.split('_');
      xCords[xCords.length] = id[1];
      yCords[yCords.length] = id[2];
    }
    if(letters.length > 0) {
      GM_setValue('boardCopyBack', letters.join(',') + ';' + xCords.join(',') + ';' + yCords.join(','));
    } else if(GM_getValue('boardCopyBack', '') == '') {
      window.setTimeout(doCopyBack, 1*1000);
    }
  }
}

function doMoves() {
  var letters = [];
  var xCords = [];
  var yCords = [];
  var board = GM_getValue('boardCopyBack', '');
  GM_setValue('boardCopyBack', '');
  if(board == '*') {
    doHitPass();
  } else {
    board = board.split(';');
    letters = board[0].split(',');
    xCords = board[1].split(',');
    yCords = board[2].split(',');

    for(i = 0; i<letters.length; i++) {
      doMove(letters[i], xCords[i], yCords[i]);
    }

    doHitPlay();
  }
}

function pickGame() {
  var timeString;
  var then;
  var now;
  var yourMoveGames = xpath("//div[@id='game_summaries']/div[@class='my_move']//li[contains(@class, 'game ')]/a");
  if(yourMoveGames.snapshotLength > 0) {
    if(GM_getValue('waitMin', 0) > 0) {
      timeString = xpath("./small/abbr", yourMoveGames.snapshotItem(0));
      if(timeString.snapshotLength > 0) {
        then = new Date(timeString.snapshotItem(0).getAttribute('title'));
        now = new Date();
        if(((now.getTime()-then.getTime())/1000/60) < GM_getValue('waitMin', 0)) {
          return;
        }
      }
    }
    mouse(yourMoveGames.snapshotItem(0), 'click');
    GM_setValue('checkActive', 0);
  }
}

function checkActive() {
  var timeString;
  var then;
  var now;
  var active = xpath("//div[@id='game_summaries']/div[@class='my_move']//li[contains(@class, 'active')]");
  if(active.snapshotLength > 0) {
    if(GM_getValue('waitMin', 0) > 0) {
      timeString = xpath("./a/small/abbr", active.snapshotItem(0));
      if(timeString.snapshotLength > 0) {
        then = new Date(timeString.snapshotItem(0).getAttribute('title'));
        now = new Date();
        if(((now.getTime()-then.getTime())/1000/60) < GM_getValue('waitMin', 0)) {
          return;
        }
      }
    }
    if(xpath(activeBoardXPath + "//div[@class='rack']/div/div/div/span[contains(@class, 'points')]").snapshotLength > 0) {
      GM_setValue('checkActive', 1);
      window.setTimeout(doCopyBoard, 1*1000);
    }
  }
}

function cleanBadGames() {
  var i;
  var badGames = xpath("//div[contains(@id, 'game_') and contains(@class, 'game') and not(contains(@class, 'shown')) and not(contains(@class, 'hidden'))]");
  if(badGames.snapshotLength > 0) {
    for(i = 0; i<badGames.snapshotLength; i++) {
      badGames.snapshotItem(i).parentNode.removeChild(badGames.snapshotItem(i));
    }
  }
}

function inArray(array, itemName) {
  var i;
  for(i = 0; i<array.length; i++) {
    if(array[i] == itemName) {
      return i;
    }
  }
  return -1;
}

function cancelAchievement() {
  var pointsRE;
  var highPoint;
  var points;
  var caption;
  var cancel = xpath("//div[contains(@class, 'show')]/div[@id='dialog_achievement']/div/div/button[@name='cancel']");
  if(cancel.snapshotLength > 0) {
    if(GM_getValue('postAchievementPoints', 0) == 1  || GM_getValue('postAchievementOther', 0) == 1) {
      caption = xpath("//div[contains(@class, 'show')]/div[@id='dialog_achievement']/div/div[@class='caption']").snapshotItem(0).innerHTML;
      pointsRE = /(\d+) points/g;
      highPoint = -1;
      while(points = pointsRE.exec(caption)) {
        if(points[1] > highPoint) {
          highPoint = points[1];
        }
      }
      if((GM_getValue('postAchievementPoints', 0) == 1 && highPoint >= GM_getValue('postAchievementMinPoints', 0) && caption.indexOf('score') == -1) || 
         (GM_getValue('postAchievementOther', 0) == 1 && (highPoint == -1 || caption.indexOf('score') != -1))) {
        mouse(xpath("//div[contains(@class, 'show')]/div[@id='dialog_achievement']/div/div/button[@name='ok']").snapshotItem(0), 'click');
      } else {
        mouse(cancel.snapshotItem(0), 'click');
      }
    } else {
      mouse(cancel.snapshotItem(0), 'click');
    }
  }
}

function beatDiag() {
  var button = xpath("//div[contains(@class, 'show')]/div[contains(@class, 'dialog_game_over') and contains(@class, 'modal')]/div/button[@name='cancel']");
  if(button.snapshotLength > 0) {
    mouse(button.snapshotItem(0), 'click');
  }
}

function closeFBDiag() {
  var close = xpath("//div[@id='fb-root']/div[contains(@class, 'fb_dialog') and contains(@class, 'fb_dialog_advanced') and contains(@style, 'top:') and not(contains(@style, 'top: -10000px'))]/a[@class='fb_dialog_close_icon']");
  if(close.snapshotLength > 0) {

    mouse(close.snapshotItem(0), 'click');
  }
}

function closeAdDiag() {
  var close = xpath("//div[contains(@class, 'show')]/div[@id='dialog_interstitial']/div/button[@name='ok']");
  if(close.snapshotLength > 0) {
    mouse(close.snapshotItem(0), 'click');
  }
}

function acceptGame() {
  var ok = xpath("//div[contains(@class, 'show')]/div[@id='dialog_confirm_accept_game']/div/button[@name='ok']");
  if(ok.snapshotLength > 0) {
    mouse(ok.snapshotItem(0), 'click');
  }
}

function doHitPlay() {
  var play;
  play = xpath(activeBoardXPath + "//a[contains(@class, 'game-btn') and contains(@class, 'play')]");
  if(play.snapshotLength > 0) {
    mouse(play.snapshotItem(0), 'mouseup');
    GM_setValue('confirmPlay', 1);
    confirmPlay();
  }
}

function doHitPass() {
  var play;
  play = xpath(activeBoardXPath + "//a[contains(@class, 'game-btn') and contains(@class, 'pass')]");
  if(play.snapshotLength > 0) {
    mouse(play.snapshotItem(0), 'mouseup');
    GM_setValue('confirmPass', 1);
    confirmPass();
  }
}

function confirmPlay() {
  var submit = xpath("//div[contains(@class, 'show')]/div[@id='dialog_confirm_snapshot']/div/button[@name='submit']");
  if(submit.snapshotLength > 0) {
    GM_setValue('confirmPlay', 0);
    document.getElementById('snap_input').checked = false;
    mouse(submit.snapshotItem(0), 'click');
  } else if(GM_getValue('confirmPlay') == 1) {
    window.setTimeout(confirmPlay, 1*1000);
  }
}

function confirmPass() {
  var submit = xpath("//div[contains(@class, 'show')]/div[@id='dialog_confirm_pass']/div/button[@name='submit']");
  if(submit.snapshotLength > 0) {
    GM_setValue('confirmPass', 0);
    mouse(submit.snapshotItem(0), 'click');
  } else if(GM_getValue('confirmPass') == 1) {
    window.setTimeout(confirmPass, 1*1000);
  }
}

function waitMin() {
  var waitMinInput = prompt('Enter the amount of time in minutes to wait after the other player\'s turn:', GM_getValue('waitMin', 0));
  var setWaitMin;
  if( (setWaitMin = numberCheck(waitMinInput)) !== false ) {
    GM_setValue('waitMin', setWaitMin);
  }
}

function autoPlayToggle() {
  var iframe = document.getElementById('scrabulizer');
  if(GM_getValue('autoPlay', 1) == 1) {
    if(confirm('Turn auto play off')) {
      GM_setValue('autoPlay', 0);
      addIframeAutoOff(iframe);
    }
  } else {
    if(confirm('Turn auto play on')) {
      GM_setValue('autoPlay', 1);
      addIframeAutoOn(iframe);
    }
  }
}

function wordSortToggle() {
  if(GM_getValue('sort', 'value') == 'value') {
    if(confirm('Change word sorting to highest points first')) {
      GM_setValue('sort', 'score');
    }
  } else {
    if(confirm('Change word sorting to highest value first')) {
      GM_setValue('sort', 'value');
    }
  }
}

function postAchievementPointsToggle() {
  if(GM_getValue('postAchievementPoints', 0) == 1) {
    if(confirm('Turn Post Achievement Points off')) {
      GM_setValue('postAchievementPoints', 0);
    }
  } else {
    if(confirm('Turn Post Achievement Points on')) {
      GM_setValue('postAchievementPoints', 1);
    }
  }
}

function postAchievementMinPoints() {
  var minPointsInput;
  var setMinPoints;
  if(GM_getValue('postAchievementPoints', 0) == 1) {
    minPointsInput = prompt('Enter the minimum amount of points required to post a Point Achievement', GM_getValue('postAchievementMinPoints', 0));
    if( (setMinPoints = numberCheck(minPointsInput)) !== false ) {
      GM_setValue('postAchievementMinPoints', setMinPoints);
    }
  } else {
    alert('You must first turn on Posting of Achievement Points to set this.');
  }
}

function postAchievementOtherToggle() {
  if(GM_getValue('postAchievementOther', 0) == 1) {
    if(confirm('Turn Post Achievement Other off')) {
      GM_setValue('postAchievementOther', 0);
    }
  } else {
    if(confirm('Turn Post Achievement Other on')) {
      GM_setValue('postAchievementOther', 1);
    }
  }
}

function addIframeAutoOff(iframe) {
  iframe.setAttribute('style', 'width: 920px; height: 700px');
  document.getElementById('pagelet_canvas_content').appendChild(iframe);
}

function addIframeAutoOn(iframe) {
  iframe.removeAttribute('style');
  document.getElementsByTagName('body')[0].appendChild(iframe);
}

function numberCheck(number, allowBlank) {
  if( isNaN(parseInt(number)) ) {
    if( allowBlank && number.replace(/^\s\s*/, '').replace(/\s\s*$/, '') == '' ) {
      return '';
    } else if( number!==null ) {
      if( allowBlank ) {
        alert('Please input a number or blank!');
      } else {
        alert('Please input a number!');
      }
    }
  return false;
  } else {
    return parseInt(number);
  }
}

function mouse(object, what, x, y) {
  var dmevt = document.createEvent("MouseEvents");
  var x = (x == null) ? 0 : x;
  var y = (y == null) ? 0 : y;
  dmevt.initMouseEvent(what, true, true, window,
    1, 0, 0, x, y, false, false, false, false, 0, null);
  object.dispatchEvent(dmevt);
}

function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function documentOffset(obj) {
  var curleft = 0;
  var curtop = 0;  
  if (obj.offsetParent) {
    curleft = obj.offsetLeft;
    curtop = obj.offsetTop;
    while (obj = obj.offsetParent) {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    }
  }
  return [curleft, curtop];
}
