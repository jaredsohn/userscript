// ==UserScript==
// @name        OroTimesheet Improvements
// @namespace   http://brian.peiris.name/gm
// @include     *
// @version     5
// @require     http://code.jquery.com/jquery.js
// ==/UserScript==

var console = unsafeWindow.console;

var
  oroRegex = /orotimesheet/i,
  siteIsOroTimesheet = function () {
    return (
      oroRegex.test($('.ACSS').text()) ||
      oroRegex.test($('#IWLABEL1FRMHEADER1').text()) ||
      oroRegex.test($('#IWLABEL1').text()) ||
      $('font:contains(OroTimesheet 7)').length
    );
  },
  handleMainPage = function () {
    var connectButton = $('#BTNCONNECT');
    if (connectButton.length) {
      setInterval(function () {
        connectButton.click();
      }, 500);
    }
  },
  handleLoginPage = function () {
    // If we are on the login page
    if ($('#LBLUSERNAME').length) {
      setTimeout(function () {
        $('#BTNOK').click();
      }, 500);
    }
  },
  isSameDay = function (d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate());
  },
  improveCalendar = function () {
    var 
      weekLabel = $('#LBLWEEK'),
      weekParts,
      startDate, currDate, i,
      style = 'font-size: 8pt;',
      today = new Date();

    if (weekLabel.length) {
      weekParts = weekLabel.text().split(' ');
      startDate = new Date(weekParts[2]);
      for (i = 0; i < 7; i++) {
        currDate = new Date(startDate);
        currDate.setDate(startDate.getDate() + i);

        _style = style;

        if (isSameDay(currDate, today)) {
          _style += ' font-weight: bold';
        }

        $('#LBLDAY' + (i + 1) + 'FRMTIMESHEETSHEADER1')
          .append(
            '<br /><span style="' + _style + '">' +
            '(' + currDate.getDate() + ')</span>');
      }
    }
  },
  addLinkToHeader = function () {
    $('#A').wrapInner('<a href="" />');
  },
  handleAppPage = function () {
    improveCalendar();
    addLinkToHeader();
  },
  handleLicenseWarningPage = function () {
    setTimeout(function () {
      $('#IWBUTTON1').click();
    }, 500);
  },
  handleTimeoutPage = function () {
    var 
      timeoutLink = $('a:contains(session)');
    if (timeoutLink.length) {
      setTimeout(function () {
        unsafeWindow.location = '/';
      });
    }
  };

if (siteIsOroTimesheet()) {
  // Auto-login
  handleMainPage();
  handleLoginPage();
  handleTimeoutPage();
  handleLicenseWarningPage();

  // App improvements
  handleAppPage();
}
