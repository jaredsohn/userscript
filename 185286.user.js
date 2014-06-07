// ==UserScript==
// @name           HKG LM finder F
// @namespace      http://userscripts.org/users/peach
// @version        3.8.2
// @description    HKG LM finder F
// @homepageURL    http://userscripts.org/scripts/show/185286
// @downloadURL    https://userscripts.org/scripts/source/185286.user.js
// @include        http://forum*.hkgolden.com/*
// @include        http://search.hkgolden.com/*
// @include        http://archive.hkgolden.com/*
// @include        http://profile.hkgolden.com/*
// @exclude        http://*.hkgolden.com/*rofile*age.aspx*
// @require        http://code.jquery.com/jquery-1.10.2.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @copyright      2013, Xelio & Peach (The core part of the program is based on HKG LM finder)
// ==/UserScript==

/*
HKG LM finder F (HKGolden LM finder F)
Copyright (C) 2013 Xelio Cheong & Peach (The core part of the program is based on HKG LM finder)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var $j = jQuery.noConflict();

var userID;
var lmStyle;

var userViewState;
var userEventValidation;

var viewStateOutdate = 15 * 60 * 1000;
var ajaxTimeout = 15000;
var ajaxRequest;
var ajaxRequestTimer;
var viewState;
var eventValidation;

var changePage;
var changeFilterType;

var useFullRequest = false;
var needLogin = false;

// Monitor window.LM_CHANGE_PAGE and window.LM_CHANGE_FILTER_TYPE and fire
// ajax request to change page or filter. 
// Use this monitoring method because page cannot directly call function in 
// Greasemonkey script context. 
pageChangeByAjax = function() {
  if((window.LM_CHANGE_PAGE && window.LM_CHANGE_PAGE !== window.LM_CURRENT_PAGE)
      ||(window.LM_CHANGE_FILTER_TYPE && window.LM_CHANGE_FILTER_TYPE !== window.LM_FILTER_TYPE)) {
    initPagePartial();

    if(window.LM_CHANGE_PAGE) changePage = window.LM_CHANGE_PAGE;
    window.LM_CHANGE_PAGE = null;

    if(window.LM_CHANGE_FILTER_TYPE) changeFilterType = window.LM_CHANGE_FILTER_TYPE;
    window.LM_CHANGE_FILTER_TYPE = null;

    var history = $j('div#lm_history');
    history.find('#lm_btn_Next').attr("disabled", true);
    history.find('#lm_btn_Previous').attr("disabled", true);
    history.find('#lm_btn_GoPageNo').attr("disabled", true);
    history.find('#lm_filter_type').attr("disabled", true);

    requestProfilePage(changePage, changeFilterType);
  } else {
    setTimeout(pageChangeByAjax, 200);
  }
}

// Init options for full page loading
initPageFull = function() {
  viewState = null;
  eventValidation = null;
}

// Init options for partial page loading
initPagePartial = function() {
  viewState = GM_getValue('viewstate2');
  eventValidation = GM_getValue('eventvalidation2');
  changePage = parseInt(loadLocal('lm_change_page')) || 1;
  changeFilterType = loadLocal('lm_filter_type') || 'all';

  if(!viewState || !eventValidation || !changePage) return false;
  return true;
}

requestProfilePage = function(page, filter_type) {
  var requestType = (page ? 'partial' : 'full');
  var requestParm;

  var message = 'Load 緊';
  changeAndFlashMessage(message);

  var requestParmShared = {
    timeout: ajaxTimeout,
    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'},
    onload: function(response) {
        ajaxRequest = null;
        clearTimeout(ajaxRequestTimer);
        if(replaceContent(response)) {
          storeStatus();
          popupLoginWindow();
        } else {
          handleError();
        }
      },
    onerror: function(response) {
        ajaxRequest = null;
        clearTimeout(ajaxRequestTimer);
        handleError();
      },
    ontimeout: handleTimeout
  };

  if(requestType === 'partial') {
    var data = $j.param({
          'ctl00$ScriptManager1': 'ctl00$ScriptManager1|ctl00$ContentPlaceHolder1$mainTab$mainTab1$btn_GoPageNo',
          'ctl00_ContentPlaceHolder1_tc_Profile_ClientState': '{"ActiveTabIndex":0,"TabState":[true,true,true]}',
          'ctl00_ContentPlaceHolder1_mainTab_ClientState': '{"ActiveTabIndex":0,"TabState":[true,true]}',
          '__VIEWSTATE': viewState,
          'ctl00$ContentPlaceHolder1$mainTab$mainTab1$ddl_filter_year': 1,
          'ctl00$ContentPlaceHolder1$mainTab$mainTab1$filter_type': (filter_type || 'all'),
          'ctl00$ContentPlaceHolder1$mainTab$mainTab1$PageNoTextBox': page,
          '__EVENTVALIDATION': eventValidation,
          '__ASYNCPOST': true,
          'ctl00$ContentPlaceHolder1$mainTab$mainTab1$btn_GoPageNo': 'Go'
         });
    var requestParmPartial = {url: 'http://' + window.location.hostname + '/profilepage.aspx?userid=' + userID, method: 'POST', data: data};
    requestParm = $j.extend({}, requestParmShared, requestParmPartial);
  } else {
    var requestParmFull = {url: 'http://forum2.hkgolden.com/profilepage.aspx?userid=' + userID, method: 'GET'};
    requestParm = $j.extend({}, requestParmShared, requestParmFull);
  }

  ajaxRequest = GM_xmlhttpRequest(requestParm);

  // Specical handling for TamperMonkey
  if(typeof(TM_xmlhttpRequest) !== 'undefined') {
    timeoutRequest(function() {handleTamperMonkeyTimeout(handleTimeout);});
  }
}

// Handle data response
replaceContent = function(response) {
  var message = 'Load 完';
  changeAndFlashMessage(message);
  clearMessage();
  var data = response.responseText;
  var history;

  if(!data || (data.length === 0)
      || (data.indexOf('ctl00_ContentPlaceHolder1_mainTab_mainTab1_UpdatePanelHistory') === -1)) {
    // No history in data response
    console.log('no data');
    return false;
  }

  var partialResponse = (data.indexOf('<!DOCTYPE html') === -1);

  if(partialResponse) {
    // Find history and viewState in partial response
    var startPos = data.indexOf('<div');
    var endPos = data.lastIndexOf('/table>');
    if(startPos >= 0 && endPos >= 0) {
      endPos = endPos + '/table>'.length;
      history = $j('<div></div>').html(data.slice(startPos, endPos));
      viewState = data.match(/\|__VIEWSTATE\|.*?\|/gm)[0].replace(/\|__VIEWSTATE\|/gm, '').replace(/\|/gm, '') || viewState;
      eventValidation = data.match(/\|__EVENTVALIDATION\|.*?\|/gm)[0].replace(/\|__EVENTVALIDATION\|/gm, '').replace(/\|/gm, '') || eventValidation;
    }
  } else {
    // Find history and viewState in full response
    $j.each($j.parseHTML(data), function(i, el) {
      if(el.id === 'aspnetForm') {
        var doms = $j(el);
        viewState = doms.find('#__VIEWSTATE').val();
        eventValidation = doms.find('#__EVENTVALIDATION').val();
        history = doms.find('div#ctl00_ContentPlaceHolder1_mainTab_mainTab1_UpdatePanelHistory');
        return false;
      }
    });
  }

  if(history.length === 0) return false;

  $j('div#lm_history').html(history.html());

  replaceButton();

  // Display modal box when history was successfully loaded
  $j('div#lm').fadeIn(800);
  $j('div#mask').fadeTo(500, 0.7);

  // Update modal box height to fit the viewport
  var wHeight = $j(window).height() - 72;
  $j('div#lm_history').css('height', 'auto');
  if($j('div#lm_history').height() > wHeight) $j('div#lm_history').css('height', wHeight+'px');

  console.log(partialResponse ? 'partial request finished' : 'full request finished');
  useFullRequest = false;

  // Change filter to show all post
  if(!partialResponse) {
    window.LM_CHANGE_FILTER_TYPE = 'all';
  }

  return true;
}

// Store values needed for changing page
storeStatus = function() {
  var history = $j('div#lm_history');
  window.LM_CURRENT_PAGE = parseInt(history.find('#lm_PageNoTextBox').val());
  window.LM_FILTER_TYPE = history.find('#lm_filter_type').val();

  GM_setValue('viewstate2', viewState);
  GM_setValue('eventvalidation2', eventValidation);
  GM_setValue('lm_last_timestamp2', (new Date().getTime()).toString());

  storeLocal('lm_change_page', window.LM_CURRENT_PAGE);
  storeLocal('lm_filter_type', window.LM_FILTER_TYPE);

  console.log('lm page: ' + window.LM_CURRENT_PAGE);
}

// Logout if the can't load partial page
logout = function() {

  var message = '登出緊';
  changeAndFlashMessage(message);

  console.log('Try to logout');
  var requestUrl = 'http://' + window.location.hostname + '/logout.aspx';

  ajaxRequest = GM_xmlhttpRequest({
    method: 'HEAD',
    url: requestUrl,
    timeout: ajaxTimeout,
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    onload: function(response) {
        ajaxRequest = null;
        clearTimeout(ajaxRequestTimer);
        console.log('logged out.');

        needLogin = true;
        initPageFull();
        requestProfilePage();
      },
    onerror: function(response) {
        ajaxRequest = null;
        clearTimeout(ajaxRequestTimer);
        console.log('logout failed.');

        setTimeout(logout, 15000);
      },
    ontimeout: handleLogoutTimeout
  });

  // Specical handling for TamperMonkey
  if(typeof(TM_xmlhttpRequest) !== 'undefined') {
    timeoutRequest(function() {handleTamperMonkeyTimeout(handleLogoutTimeout);});
  }
}

// Popup login page in new window if it was logout
popupLoginWindow = function() {
  if(!needLogin){
    setTimeout(pageChangeByAjax, 200);
    return;
  }
  needLogin = false;

  var message = '登出左, 開左登入晝面比你登入返';
  changeAndFlashMessage(message);

  // Show Logout message
  $j('#lm-logout').show().animate({"bottom": "0px"},500);

  var Url =  'http://' + window.location.hostname + '/login.aspx';
  var loginWindow = window.open(Url, 'hkg_login');
  setTimeout(function() {checkPopupLogined(loginWindow)}, 200);
}

// Check login popup window status and close it if logined 
checkPopupLogined = function(targetWindow) {
  try {
    var logoutLink = $j(targetWindow.document).find('a[href="javascript:islogout();"]');
    if(logoutLink.length !== 0) {
      console.log('popup logined');
      targetWindow.close();

      // Hide Logout Message
      $j('#lm-logout').delay(500).animate({"bottom": "-30px"},1000, function(){$j('#lm-logout').hide();});

      clearMessage();
    } else {
      setTimeout(function() {checkPopupLogined(targetWindow)}, 200);
    }
  } catch(err) {
    // Chrome only
    if(err.name == 'SecurityError')
    {
      console.log(err);
      setTimeout(function() {checkPopupLogined(targetWindow)}, 1000);
      console.log('Wait 1 second to determine user has login or not');
    }
  }
}

// Can't simply set 'timeout' value in GM_xmlhttpRequest as TamperMonkey do not support it
timeoutRequest = function(callback) {
  clearTimeout(ajaxRequestTimer);
  ajaxRequestTimer = setTimeout(callback, ajaxTimeout);
}

handleTamperMonkeyTimeout = function(callback) {
  if(ajaxRequest && ajaxRequest.abort) {
    ajaxRequest.abort();
    callback();
  }
}

handleTimeout = function() {
  var message = '太慢喇再Load過';

  changeAndFlashMessage(message);
  RetryFullRequest();
}

handleLogoutTimeout = function() {
  console.log('server logout timeout');
  setTimeout(logout, 15000);
}

handleError = function() {
  console.log('server error');
  var message = 'Server 有問題再Load過';

  changeAndFlashMessage(message);
  RetryFullRequest();
}

tooManyRetryError = function() {
  var message = '唔知咩事試過幾次都唔得, 你Reload下啦';

  changeAndFlashMessage(message);
}

RetryFullRequest = function() {
  // Tried partial request a few times, change to full request
  if(!useFullRequest) {
    useFullRequest = true;
    logout();
  } else {
    tooManyRetryError();
  }
}

changeAndFlashMessage = function(message) {
  var messageDiv = $j('div#lm_message');
  messageDiv.html(message);
  // Show LM message
  messageDiv.stop();
  messageDiv.show().animate({"top": "0"},500);
  //flashMessage(messageDiv);
}

clearMessage = function() {
  var messageDiv = $j('div#lm_message');
  // Hide LM message
  messageDiv.stop();
  messageDiv.delay(1000).animate({"top": "-30px"},1000, function(){messageDiv.hide(); messageDiv.html('');});
  //messageDiv.stop();
}

/*flashMessage = function(item) {
  item.stop();
  item.animate({"opacity": "0"},50).animate({"opacity": "1"},50, function(){flashMessage(item);});
}*/

// Change button event, let this script handle page changing
replaceButton = function() {
  var history = $j('div#lm_history');
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab1_btn_Next')
      .attr('id', 'lm_btn_Next')
      .attr('name', 'lm_btn_Next')
      .click(nextPage);
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab1_btn_Previous')
      .attr('id', 'lm_btn_Previous')
      .attr('name', 'lm_btn_Previous')
      .click(previousPage);
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab1_btn_GoPageNo')
      .attr('id', 'lm_btn_GoPageNo')
      .attr('name', 'lm_btn_GoPageNo')
      .click(gotoPage);
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab1_filter_type')
      .attr('id', 'lm_filter_type')
      .attr('name', 'lm_filter_type')
      .attr('onchange', '')
      .change(changeFilter);
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab1_ddl_filter_year')
      .attr('id', 'lm_filter_year')
      .attr('name', 'lm_filter_year')
      .attr('onchange', '');
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab1_PageNoTextBox')
      .attr('id', 'lm_PageNoTextBox')
      .attr('name', 'lm_PageNoTextBox');
}

// Store the target page number in cookie
nextPage = function() {
  var page = window.LM_CURRENT_PAGE + 1;
  storeLocal('lm_change_page', page);
  window.LM_CHANGE_PAGE = page;
  return false;
}

previousPage = function() {
  var page = Math.max(window.LM_CURRENT_PAGE - 1, 1);
  storeLocal('lm_change_page', page);
  window.LM_CHANGE_PAGE = page;
  return false;
}

gotoPage = function() {
  var history = $j('div#lm_history');
  var page = parseInt(history.find('#lm_PageNoTextBox').val());
  storeLocal('lm_change_page', page)
  window.LM_CHANGE_PAGE = page;
  return false;
}

changeFilter = function() {
  var history = $j('div#lm_history');
  var filter = history.find('#lm_filter_type').val();
  storeLocal('lm_filter_type', filter)
  window.LM_CHANGE_FILTER_TYPE = filter;
  return false;
}

storeLocal = function(key, value) {
  if(typeof(value) !== 'undefined' && value !== null) {
    localStorage[key] = JSON.stringify(value);
  } else {
    localStorage.removeItem(key);
  }
}

loadLocal = function(key) {
  var objectJSON = localStorage[key];
  if(!objectJSON) return;
  return JSON.parse(objectJSON);
}

deleteLocal = function(key) {
  localStorage.remoteItem(key);
}

clearOldCookie = function() {
  if(!loadLocal('cookie_cleared')) {
    document.cookie = 'lm_change_page=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    storeLocal('cookie_cleared', true);
  }
}

shuffle = function(arr) {
  for(
    var j, x, i = arr.length; i;
    j = Math.random() * i|0,
    x = arr[--i], arr[i] = arr[j], arr[j] = x
  );
  return arr;
}

setup = function() {
  var message = 'Load緊呀等陣啦';
  changeAndFlashMessage(message);
}

start = function() {
  clearOldCookie();
  var history = $j('div#ctl00_ContentPlaceHolder1_mainTab_mainTab1_UpdatePanelHistory');
  if(history.length === 1) return;

  setup();

  if(initPagePartial()) {
    requestProfilePage(changePage);
  } else {
    logout();
  }
}

// Common functions called in MEL & PM
requestEventValidation = function(requestUrl, type) {
  GM_xmlhttpRequest({
    method: "GET",
    url: requestUrl,
    timeout: ajaxTimeout,
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    onload: function(response) {
      ajaxRequest = null;
      clearTimeout(ajaxRequestTimer);
      if(getEventValidation(response)) {
        // success
        //GM_setValue('userviewstate', userViewState);
        //GM_setValue('usereventvalidation', userEventValidation);
        console.log('userEventValidation set');
        if(type!='pm') {
          requestMEL();
        } else {
          requestPM();
        }
      } else {
        handleError2();
      }
    }
  });
}

getEventValidation = function(response) {
  var data2 = response.responseText;

  if(!data2 || (data2.length === 0)) {
    // No data2 response
    console.log('no data2');
    return false;
  }
  // Find EventValidation in data2 response
  $j.each($j.parseHTML(data2), function(i, el) {
    if(el.id === 'aspnetForm') {
      var doms = $j(el);
      userViewState = doms.find('#__VIEWSTATE').val();
      userEventValidation = doms.find('#__EVENTVALIDATION').val();
      return false;
    }
  });
  

  if(!userViewState || !userEventValidation) {
  console.log('no userEventValidation found');
  return false;
  }

  console.log('userEventValidation request finished');

  return true;
}

handleError2 = function() {
  console.log('server error');
  var message = 'Server 有問題，你遲的再試下啦';

  changeAndFlashMessage(message);
}

// Ming E Lau Start
requestMEL = function(type, btn) {

  var message = 'Load 緊';
  changeAndFlashMessage(message);

  var requestUrl = 'http://' + window.location.hostname + '/profilepage.aspx?userid=' + userID;

  //userViewState = GM_getValue('userviewstate');
  //userEventValidation = GM_getValue('usereventvalidation');

  if(!userViewState || !userEventValidation){
    requestEventValidation(requestUrl, 'mel');
    return false;
  }

  var varBookmarkOrder = loadLocal('lm_btn_bookmarkOrder') || 'lastPost';

  var data = $j.param({
          'ctl00$ScriptManager1': (type || 'ctl00$ScriptManager1|ctl00$ContentPlaceHolder1$mainTab'),
          'ctl00_ContentPlaceHolder1_tc_Profile_ClientState': '{"ActiveTabIndex":0,"TabState":[true,true,true,true]}',
          'ctl00_ContentPlaceHolder1_mainTab_ClientState': '{"ActiveTabIndex":3,"TabState":[true,true,true,true,true,true]}',
          'ctl00$ContentPlaceHolder1$mainTab$mainTab4$bookmarkOrder': varBookmarkOrder,
          '__EVENTARGUMENT': 'activeTabChanged:3',
          '__VIEWSTATE': userViewState,
          '__EVENTVALIDATION': userEventValidation,
          '__ASYNCPOST': true
         });

  if(btn=='bookmark'){
    data += '&' + $j.param({'__EVENTTARGET': 'ctl00$ContentPlaceHolder1$mainTab$mainTab4$bookmarkOrder'});
  } else {
    data += '&' + $j.param({'__EVENTTARGET': 'ctl00$ContentPlaceHolder1$mainTab'});
  }

  if(btn=='bmPagePrevious'){
    data += '&' + $j.param({'ctl00$ContentPlaceHolder1$mainTab$mainTab4$bmPagePrevious': '上一頁'});
  }

  if(btn=='bmPageNext'){
    data += '&' + $j.param({'ctl00$ContentPlaceHolder1$mainTab$mainTab4$bmPageNext': '下一頁'});
  }

  GM_xmlhttpRequest({
    method: "POST",
    url: requestUrl,
    data: data,
    timeout: ajaxTimeout,
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    onload: function(response) {
      ajaxRequest = null;
      clearTimeout(ajaxRequestTimer);
      if(replaceContent2(response)) {
      // success
      } else {
        handleError2();
      }
    }
  });
}

// Handle data response
replaceContent2 = function(response) {
  var message = 'Load 完';
  changeAndFlashMessage(message);
  clearMessage();
  var data = response.responseText;
  var history;

  if(!data || (data.length === 0)) {
    // No history in data response
    console.log('No data response');
    return false;
  }

  history = $j($j.parseHTML(data)).filter("table#bookmarkTable");

  if(history.length === 0) {
  console.log('No history found');
  //console.log(data);
  return false;
  }

  $j('div#lm_history').html('<table id="bookmarkTable" cellspacing="0" cellpadding="0" border="0" width="100%">' + history.html() + '</table>');

  replaceButton2();

  // Display modal box when history was successfully loaded
  $j('div#lm').fadeIn(800);
  $j('div#mask').fadeTo(500, 0.7);

  // Update modal box height to fit the viewport
  var wHeight = $j(window).height() - 72;
  $j('div#lm_history').css('height', 'auto');
  if($j('div#lm_history').height() > wHeight) $j('div#lm_history').css('height', wHeight+'px');

  console.log('MEL request finished');

  return true;
}

// Change button event, let this script handle page changing
replaceButton2 = function() {
  var history = $j('div#lm_history');
  var varBookmarkOrder = loadLocal('lm_btn_bookmarkOrder') || 'lastPost';
  history.find('.main_table1 #BmInnerTable tbody tr').find('td:eq(6)').remove();
  history.find('.main_table1 #BmInnerTable tbody tr:eq(0) td:eq(5)').remove();
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab4_bookmarkOrder').attr('onchange', '');
  if(varBookmarkOrder=='bookmark') history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab4_bookmarkOrder>option:eq(1)').prop('selected', true);
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab4_bookmarkOrder')
      .attr('id', 'lm_btn_bookmarkOrder')
      .attr('name', 'lm_btn_bookmarkOrder')
      .change(bookmarkOrder);
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab4_bmPagePrevious')
      .attr('id', 'lm_btn_bmPagePrevious')
      .attr('name', 'lm_btn_bmPagePrevious')
      .click(bmPagePrevious);
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab4_bmPageNext')
      .attr('id', 'lm_btn_bmPageNext')
      .attr('name', 'lm_btn_bmPageNext')
      .click(bmPageNext);
}

// Change button action
bookmarkOrder = function(e) {
  var history = $j('div#lm_history');
  var varBookmarkOrder = history.find('#lm_btn_bookmarkOrder').val();
  e.preventDefault;
  storeLocal('lm_btn_bookmarkOrder', varBookmarkOrder)
  if(varBookmarkOrder=='bookmark') {
    requestMEL('ctl00$ScriptManager1|ctl00$ContentPlaceHolder1$mainTab$mainTab4$bookmarkOrder', varBookmarkOrder);
  } else {
    requestMEL();
  }
  return false;
}
bmPagePrevious = function(e) {
  e.preventDefault;
  requestMEL('ctl00$ScriptManager1|ctl00$ContentPlaceHolder1$mainTab$mainTab4$bmPagePrevious', 'bmPagePrevious');
  return false;
}
bmPageNext = function(e) {
  e.preventDefault;
  requestMEL('ctl00$ScriptManager1|ctl00$ContentPlaceHolder1$mainTab$mainTab4$bmPageNext', 'bmPageNext');
  return false;
}
// Ming E Lau End

// PM Start
requestPM = function(type, btn) {

  var message = 'Load 緊';
  changeAndFlashMessage(message);

  var requestUrl = 'http://' + window.location.hostname + '/profilepage.aspx?userid=' + userID;

  //userViewState = GM_getValue('userviewstate');
  //userEventValidation = GM_getValue('usereventvalidation');

  if(!userViewState || !userEventValidation){
    requestEventValidation(requestUrl, 'pm');
    return false;
  }

  var pmPage = loadLocal('pmpage') || 1;

  var data = $j.param({
          'ctl00$ScriptManager1': (type || 'ctl00$ContentPlaceHolder1$mainTab$mainTab0$btn_GoPMPageN'),
          'ctl00_ContentPlaceHolder1_tc_Profile_ClientState': '{"ActiveTabIndex":0,"TabState":[true,true,true,true]}',
          'ctl00_ContentPlaceHolder1_mainTab_ClientState': '{"ActiveTabIndex":0,"TabState":[true,true,true,true,true,true]}',
          '__EVENTARGUMENT': 'activeTabChanged:0',
          '__VIEWSTATE': userViewState,
          '__EVENTVALIDATION': userEventValidation,
          'ctl00$ContentPlaceHolder1$mainTab$mainTab0$PMPageTextBox': pmPage,
          '__ASYNCPOST': true
         });

  if(!type){
    data += '&' + $j.param({'__EVENTTARGET': 'ctl00$ContentPlaceHolder1$mainTab', 'ctl00$ContentPlaceHolder1$mainTab$mainTab0$btn_GoPMPageNo': 'Go'});
  }

  if(btn=='pmPagePrevious'){
    data += '&' + $j.param({'ctl00$ContentPlaceHolder1$mainTab$mainTab0$btn_PreviousPM': '上一頁'});
  }

  if(btn=='pmPageNext'){
    data += '&' + $j.param({'ctl00$ContentPlaceHolder1$mainTab$mainTab0$btn_NextPM': '下一頁'});
  }

  GM_xmlhttpRequest({
    method: "POST",
    url: requestUrl,
    data: data,
    timeout: ajaxTimeout,
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    onload: function(response) {
      ajaxRequest = null;
      clearTimeout(ajaxRequestTimer);
      if(replaceContent3(response)) {
      // success
      storeLocal('pmpage', parseInt($j('div#lm_history').find('#lm_PMPageNoTextBox').val()));
      } else {
        handleError2();
      }
    }
  });
}

// Handle data response
replaceContent3 = function(response) {
  var message = 'Load 完';
  changeAndFlashMessage(message);
  clearMessage();
  var data = response.responseText;
  var history;

  if(!data || (data.length === 0)) {
    // No history in data response
    console.log('No data response');
    return false;
  }

  history = $j($j.parseHTML(data)).filter("table#ctl00_ContentPlaceHolder1_mainTab_mainTab0_PMPersonalTable");

  if(history.length === 0) {
  console.log('No history found');
  //console.log(data);
  return false;
  }

  $j('div#lm_history').html('<div id="DivShowPM" style="display:none;"> <div class="TransparentGrayBackground"></div> <div class="ListPMText"> <table width="100%" border="0" cellspacing="1" cellpadding="1" align="center"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td class="title" width="2%"><img src="images/left_menu/p.jpg" alt="" width="22" height="21" /></td> <td class="title" width="98%" align="left"><b>訊息內容 - <span id="spanPMMessageTitle"></span></b></td> </tr> </table> </td> </tr> <tr> <td valign="top"><img src="images/index_images/blank.gif" alt="" width="1" height="1" /></td> </tr> <tr> <td height="8" valign="top" bgcolor="#CCDDEA"><img src="images/index_images/blank.gif" alt="" width="5" height="8" /></td> </tr> <tr> <td valign="top" class="main_table1" align="left"> <div id="divPMMessageBody"></div> </td> </tr> </table> </td> </tr> </table> <input type="Button" value="關閉" onclick="Javascript: $get(\'DivShowPM\').style.display = \'none\';" /> </div> </div>' +
                            '<table id="ctl00_ContentPlaceHolder1_mainTab_mainTab0_PMPersonalTable" cellspacing="0" cellpadding="0" border="0" width="100%">' + history.html() + '</table>');

  replaceButton3();

  // Display modal box when history was successfully loaded
  $j('div#lm').fadeIn(800);
  $j('div#mask').fadeTo(500, 0.7);

  // Update modal box height to fit the viewport
  var wHeight = $j(window).height() - 72;
  $j('div#lm_history').css('height', 'auto');
  if($j('div#lm_history').height() > wHeight) $j('div#lm_history').css('height', wHeight+'px');

  console.log('PM request finished');

  return true;
}

// Change button event, let this script handle page changing
replaceButton3 = function() {
  var history = $j('div#lm_history');
  history.find('.main_table1 #PMInnerTable tbody tr').find('td:eq(3)').remove();
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab0_btn_NextPM')
      .attr('id', 'lm_btn_NextPM')
      .attr('name', 'lm_btn_NextPM')
      .click(nextPMPage);
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab0_btn_PreviousPM')
      .attr('id', 'lm_btn_PreviousPM')
      .attr('name', 'lm_btn_PreviousPM')
      .click(previousPMPage);
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab0_btn_GoPMPageNo')
      .attr('id', 'lm_btn_GoPMPageNo')
      .attr('name', 'lm_btn_GoPMPageNo')
      .click(gotoPMPage);
  history.find('#ctl00_ContentPlaceHolder1_mainTab_mainTab0_PMPageTextBox')
      .attr('id', 'lm_PMPageNoTextBox')
      .attr('name', 'lm_PMPageNoTextBox');
}

// Change button action
nextPMPage = function(e) {
  e.preventDefault;
  requestPM('ctl00$ScriptManager1|ctl00$ContentPlaceHolder1$mainTab$mainTab0$btn_NextPM', 'pmPageNext');
  return false;
}

previousPMPage = function(e) {
  e.preventDefault;
  requestPM('ctl00$ScriptManager1|ctl00$ContentPlaceHolder1$mainTab$mainTab0$btn_PreviousPM', 'pmPagePrevious');
  return false;
}

gotoPMPage = function(e) {
  e.preventDefault;
  var history = $j('div#lm_history');
  var pmPage = parseInt(history.find('#lm_PMPageNoTextBox').val());
  storeLocal('pmpage', pmPage);
  requestPM();
  return false;
}
// PM End

// Get User ID
userID = $j('#ctl00_ContentPlaceHolder1_lb_UserName a:eq(0)').attr('href').replace(/[^0-9]/g, '');

// Define CSS Style (You can overide it by other script, if you want to)
lmStyle = '<style id="lm-style" type="text/css">';
lmStyle += '#lm-finder{z-index: 1; position: fixed; left: 0; top: 2px; padding:4px; cursor: pointer; text-decoration: none; color: #808080;}#lm-finder:hover{color: #9ACD32;}';
lmStyle += '#lm-mel{display:none; z-index: 1; position: fixed; left: 0; top: 28px; padding:4px; cursor: pointer; text-decoration: none; color: #808080; background: #FFF;}#lm-mel:hover{color: #9ACD32;}';
lmStyle += '#lm-pm{display:none; z-index: 1; position: fixed; left: 0; top: 54px; padding:4px; cursor: pointer; text-decoration: none; color: #808080; background: #FFF;}#lm-pm:hover{color: #9ACD32;}';
lmStyle += '#lm_message{display: none; z-index: 20; position: fixed; left: 50%; top: -30px; width: 600px; margin: 0 0 0 -300px; padding: 2px 0; background: #F7F3F7; border: 1px solid #000; border-width:0 1px 1px; text-align: center;}';
lmStyle += '#lm-logout{display: none; z-index: 20; position: fixed; left: 50%; bottom: -30px; width: 600px; margin: 0 0 0 -300px; padding: 2px 0; background: #F7F3F7; border: 1px solid #000; border-width:1px 1px 0 1px; text-align: center;}';
lmStyle += '#lm{display: none;}';
lmStyle += '#lm_history{z-index: 15; width: 898px; position: fixed; left: 50%; top:0; margin: 42px 0 0 -450px; padding:0; background: #000; border: 1px solid #000; overflow-y: auto;}';
lmStyle += '#lm-finder-2{z-index: 10; position: fixed; left: 50%; top:0; width: 300px; margin: 0 0 0 -450px; padding:12px 0; color:#FFF; text-align: center; cursor: pointer;background: #333;}#lm-finder-2:hover{color: #9ACD32; background: #000;}';
lmStyle += '#lm-mel-2{z-index: 10; position: fixed; left: 50%; top:0; width: 300px; margin: 0 0 0 -150px; padding:12px 0; color:#FFF; text-align: center; cursor: pointer;background: #333;}#lm-mel-2:hover{color: #9ACD32; background: #000;}';
lmStyle += '#lm-pm-2{z-index: 10; position: fixed; left: 50%; top:0; width: 300px; margin: 0 0 0 150px; padding:12px 0; color:#FFF; text-align: center; cursor: pointer;background: #333;}#lm-pm-2:hover{color: #9ACD32; background: #000;}';
lmStyle += '#mask{display: none; z-index: 5; position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: gray;}';
lmStyle += '#lm_history table[cellpadding="2"][cellspacing="1"] > tbody > tr:not(:first-child):not([style]) {display: none;}';
lmStyle += '</style>';

closeHistory = function() {
  $j('div#lm').fadeOut(500);
  $j('div#mask').fadeOut(800);
}

if(userID) {
  $j('head').append(lmStyle);
  $j('body').append('<ul id="lm-menu"><li id="lm-finder">起底</li><li id="lm-mel">名已留</li><li id="lm-pm">PM</li></ul>' + 
                    '<div id="lm_message"></div>' +
                    '<div id="lm"><div id="lm_history"></div><div id="lm-finder-2">起底</div><div id="lm-mel-2">名已留</div><div id="lm-pm-2">PM</div></div>' +
                    '<div id="mask"></div>' +
                    '<div id="lm-logout">登出左，開左登入畫面比你登入返。Block左睇唔倒就按<a href="/login.aspx">呢度</a>登入</div>');

  $j('#lm-mel').css("opacity", "0");
  $j('#lm-pm').css("opacity", "0");
  $j('#lm-finder-2').css("opacity", "0.7");
  $j('#lm-mel-2').css("opacity", "0.7");
  $j('#lm-pm-2').css("opacity", "0.7");

  $j('#lm-menu').hover(function(){
      $j('#lm-mel').stop();
      $j('#lm-mel').css("display", "block");
      $j('#lm-mel').animate({"opacity": "1"},500);
      $j('#lm-pm').stop();
      $j('#lm-pm').css("display", "block");
      $j('#lm-pm').animate({"opacity": "1"},500);
  },function(){
    $j('#lm-mel').animate({"opacity": "0"},500, function(){$j('#lm-mel').hide()});
    $j('#lm-pm').animate({"opacity": "0"},500, function(){$j('#lm-pm').hide()});
  });

  $j('#lm-finder').click(function () {start()});
  $j('#lm-finder-2').click(function () {start()});
  
  $j('#lm-mel').click(function () {requestMEL()});
  $j('#lm-mel-2').click(function () {requestMEL()});
  
  $j('#lm-pm').click(function () {requestPM()});
  $j('#lm-pm-2').click(function () {requestPM()});

  $j('#lm-finder-close').click(function () {closeHistory()});
  $j('#mask').click(function () {closeHistory()});
}

var script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = "function GetMessageBody(id, title) { \n\
  if ($get('ctl00_ContentPlaceHolder1_siteUpdateProgressPM') != null) { \n\
      $get('ctl00_ContentPlaceHolder1_siteUpdateProgressPM').style.display = ''; \n\
      PutBoxToMiddle($get('ctl00_ContentPlaceHolder1_siteUpdateProgressPM'), 150, 30); \n\
  } \n\
  PageMethods.GetPMMessageBody(id, onGetPMBodySucceed, onGetPMBodyFailed); \n\
  $get('spanPMMessageTitle').innerHTML = title; \n\
} \n\
 \n\
function onGetPMBodySucceed(result, userContext, methodName) { \n\
  if ($get('ctl00_ContentPlaceHolder1_siteUpdateProgressPM') != null) { \n\
      $get('ctl00_ContentPlaceHolder1_siteUpdateProgressPM').style.display = 'none'; \n\
  } \n\
  $get('divPMMessageBody').innerHTML = result; \n\
  PutBoxToMiddle($get('DivShowPM'), document.documentElement.clientWidth-220, document.documentElement.clientHeight-60); \n\
  $get('DivShowPM').style.display = ''; \n\
} \n\
 \n\
function onGetPMBodyFailed(error, userContext, methodName) { \n\
  if ($get('ctl00_ContentPlaceHolder1_siteUpdateProgressPM') != null) { \n\
      $get('ctl00_ContentPlaceHolder1_siteUpdateProgressPM').style.display = 'none'; \n\
  } \n\
  alert('An error occurred') \n\
}var PageMethods = function() { \n\
PageMethods.initializeBase(this); \n\
this._timeout = 0; \n\
this._userContext = null; \n\
this._succeeded = null; \n\
this._failed = null; \n\
} \n\
PageMethods.prototype = { \n\
_get_path:function() { \n\
 var p = this.get_path(); \n\
 if (p) return p; \n\
 else return PageMethods._staticInstance.get_path();}, \n\
GetPMMessageBody:function(PM_ID,succeededCallback, failedCallback, userContext) { \n\
return this._invoke(this._get_path(), 'GetPMMessageBody',false,{PM_ID:PM_ID},succeededCallback,failedCallback,userContext); }} \n\
PageMethods.registerClass('PageMethods',Sys.Net.WebServiceProxy); \n\
PageMethods._staticInstance = new PageMethods(); \n\
PageMethods.set_path = function(value) { PageMethods._staticInstance.set_path(value); } \n\
PageMethods.get_path = function() { return PageMethods._staticInstance.get_path(); } \n\
PageMethods.set_timeout = function(value) { PageMethods._staticInstance.set_timeout(value); } \n\
PageMethods.get_timeout = function() { return PageMethods._staticInstance.get_timeout(); } \n\
PageMethods.set_defaultUserContext = function(value) { PageMethods._staticInstance.set_defaultUserContext(value); } \n\
PageMethods.get_defaultUserContext = function() { return PageMethods._staticInstance.get_defaultUserContext(); } \n\
PageMethods.set_defaultSucceededCallback = function(value) { PageMethods._staticInstance.set_defaultSucceededCallback(value); } \n\
PageMethods.get_defaultSucceededCallback = function() { return PageMethods._staticInstance.get_defaultSucceededCallback(); } \n\
PageMethods.set_defaultFailedCallback = function(value) { PageMethods._staticInstance.set_defaultFailedCallback(value); } \n\
PageMethods.get_defaultFailedCallback = function() { return PageMethods._staticInstance.get_defaultFailedCallback(); } \n\
PageMethods.set_path('/profilepage.aspx'); \n\
PageMethods.GetPMMessageBody= function(PM_ID,onSuccess,onFailed,userContext) {PageMethods._staticInstance.GetPMMessageBody(PM_ID,onSuccess,onFailed,userContext); }";
document.getElementsByTagName('head')[0].appendChild(script);