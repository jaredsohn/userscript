/*!
// ==UserScript==
// @name           Yet Another Recruiter
// @namespace      http://www.srforums.net/baigo/script/clicker/
// @include        http://www.kingsofchaos.com/recruit.php*
// ==/UserScript==
*/

// Enable whole script optimization if we end up using YUI
(function () {
const VERSION = 0;

// Various debug bar things
var misloadedImages = 0;
var invalidResponse = 0;

var myUniqid;
var myStatsid;
const REPORT_THRESHOLD = 100;
var successfulClicks = [];
var alreadyClicked = [];

// Recaptcha class alias. It's annoying to say unsafeWindow.Recaptcha
// every time...
var Recaptcha;
var recaptchaReloaded = true;

// Various globals
var links = [];
// var linkIndex = 0;

// This is where we show the pretty pictures.
var imageBox;

var clickCount = 0;
var cpmData = [];

var linkListLength;
var numberAlreadyClicked = 0;

// Various DOM elements for status information
var cpmStatusBox;
var imageStatusBox;
var moraleStatusBox;
var alreadyClickedStatusBox;
var serverStatusBox;

var recruiterResponseField;

// This used to be an "enum" but changed for obfuscation reasons
var RecaptchaType_MISCLICK = 2;
var RecaptchaType_SECURITY = 5;
var RecaptchaType_PROCESSING = 50;

// DOM elements for modal UI
var modalBackground;
var modalBox;
var recaptchaBox;

var recaptchaType = 0;
var misclickedUniqid;

const MAX_CAPTCHAS_TO_LOAD = 100;
var requestTimer = {};
var captchaQueue = [];
var MAX_REQUESTS_IN_FLIGHT = 10;
var captchaFetchesInProgress = 0;
var repliesInProgress = 0;
var isExiting = false;

var mainURL = "http://srforums.net/baigo/script/clicker";

var consecutiveDatabaseErrors = 0;

// BEGIN OBFUSCATION ROUTINES
function unpackString(a) {
  var s = new String;
  for (var i = 0; i < a.length - 2; ++i) {
    s += String.fromCharCode(a[i] >>> 24,
                             (a[i] >> 16) & 0xff,
                             (a[i] >> 8) & 0xff,
                             a[i] & 0xff);
  }
  for (var i = 0; i < 2; ++i) {
    for (var j = 0; j < 4; ++j) {
      var c = (a[a.length - (2 - i)] >> (3 - j) * 8) & 0xff;
      if (0 == c) break;
      s += String.fromCharCode(c);
    }
  }
  return decodeURIComponent(escape(s));
}

function flipWord(x) {
  var y = x & 0xff00;
  var z = x & 0xff0000;
  return (x << 24) | (y << 8) | (z >> 8) | (x >>> 24);
}

function teaDecrypt(v, k) {
  var n = v.length;
  var z = v[n - 1];
  var y = v[0];
  var e, mx;
  const DELTA = 0x9e3779b9;
  var p;
  var q = 6 + Math.floor(52 / n);
  var sum = q * DELTA;
  while (sum != 0) {
    e = (sum >>> 2) & 3;
    for (p = n - 1; p > 0; p--) {
      z = v[p - 1];
      y = v[p] -= (z >>> 5 ^ y << 2)
                + (y >>> 3 ^ z << 4) ^ (sum ^ y)
                + (k[p & 3 ^ e] ^ z);
    }
    z = v[n - 1];
    y = v[0] -= (z >>> 5 ^ y << 2)
              + (y >>> 3 ^ z << 4) ^ (sum ^ y)
              + (k[p & 3 ^ e] ^ z);
    sum -= DELTA;
  }
}

(function(){
  // This should be commented out when making the release build.
  if (typeof(_) == 'undefined') return;
  for (var i = 0; i < _.length; ++i) {
    _[i] = _[i].map(flipWord);
    teaDecrypt(_[i], VERSION);
    _[i] = unpackString(_[i]);
  }
})();
// END OBFUSCATION ROUTINES

function updateServerStatus() {
  if ('dying' == serverStatusBox.textContent) return;

  if (0 == captchaFetchesInProgress) {
    serverStatusBox.textContent = 'normal';
    return;
  }

  var requestTime = 0;
  var currentTime = (new Date).getTime();
  for (var uniqid in requestTimer) {
    requestTime += (currentTime - requestTimer[uniqid]);
  }

  var averageRequestTime = requestTime / captchaFetchesInProgress;
  if (averageRequestTime < 300) {
    serverStatusBox.textContent = 'normal';
  } else if (averageRequestTime < 1000) {
    serverStatusBox.textContent = 'slow';
  } else if (averageRequestTime < 2000) {
    serverStatusBox.textContent = 'really slow';
  } else {
    serverStatusBox.textContent = 'really really slow';
  }
}

function updateStats(response) {
  try {
    imageStatusBox.textContent = captchaQueue.length;
    document.title = 'YAR [' + captchaQueue.length + ' / ' +
                     MAX_CAPTCHAS_TO_LOAD + ' loaded]';
    // TODO: temporary hack until I figure out a way around auto redirect in XHR
    var moraleText = extractText(response, 'Your Army\'s Morale:', '</font>');
    if (moraleText) {
      moraleStatusBox.textContent = moraleText.replace(/\s/g, '');
    }
    var debugBar = document.getElementById('debugBar');
    debugBar.textContent = 'Debug info: ' + misloadedImages + ':'
                         + invalidResponse;
  } catch (e) {
    GM_log('caught an exception while scraping stats: ' + e.toString());
  }
}

function showInfoBox(message) {
  var infoBox = document.getElementById('infoBox');
  infoBox.style.display = 'block';
  infoBox.textContent = message;
}

function hideInfoBox() {
  var infoBox = document.getElementById('infoBox');
  infoBox.style.display = 'none';
}

function showModalBox(message) {
  modalBox.innerHTML = message;
  recruiterResponseField.disabled = true;
  modalBackground.style.display = 'block';
  modalBox.parentNode.style.visibility = 'visible';
}

function hideModalBox() {
  modalBox.parentNode.style.visibility = 'hidden';
  if (0 == recaptchaType) {
    recruiterResponseField.disabled = false;
    modalBackground.style.display = 'none';
  }
}

// reCAPTCHA handling
// TODO: investigate why setting display property doesn't work for modalBox...
function handleSecurityRecaptcha(responseDetails) {
  if (responseDetails.responseText.indexOf(
        '<title>Kings of Chaos :: Security</title>') >= 0) {
    // This recaptcha trumps all the others.
    if (recaptchaType < RecaptchaType_SECURITY) {
      recaptchaType = RecaptchaType_SECURITY;
      showRecaptchaBox();
    }
    return true;
  }
  return false;
}

function handleMisclickRecaptcha(responseDetails) {
  if (responseDetails.responseText.indexOf('Invalid selection...') >= 0) {
    if (recaptchaType < RecaptchaType_MISCLICK) {
      recaptchaType = RecaptchaType_MISCLICK;
      misclickedUniqid = extractText(responseDetails.responseText,
                                     'name="uniqid" value="',
                                     '">');
      showRecaptchaBox();
    }
    return true;
  }
  return false;
}

function showRecaptchaBox() {
  recruiterResponseField.disabled = true;
  modalBackground.style.display = 'block';
  recaptchaBox.style.visibility = 'visible';
  try {
    document.getElementById('recaptcha_response_field').disabled = false;
    if (!recaptchaReloaded) {
      Recaptcha.reload();
      recaptchaReloaded = true;
    } else {
      document.getElementById('recaptcha_response_field').focus();
    }
  } catch (e) {
  }
}

function maybeSendRecaptchaResponse(e) {
  // In a captcha?
  if (0 == recaptchaType) return;

  // TODO: if someone decides to mash enter in the reCAPTCHA box, we're going to
  // have a problem... should we try to prevent that?
  // Right keycode? 0xd is a carriage return.
  if (0xd == e.keyCode) {
    recaptchaReloaded = false;

    var challenge = document.getElementById('recaptcha_challenge_field').value;
    var response = document.getElementById('recaptcha_response_field').value;
    var data = 'recaptcha_challenge_field='
             + encodeURIComponent(challenge)
             + '&recaptcha_response_field='
             + encodeURIComponent(response);

    var details = {};
    details.method = 'POST';
    if (RecaptchaType_MISCLICK == recaptchaType) {
      details.url =
          'http://www.kingsofchaos.com/recruit.php?clickerid=' + myStatsid;
      data += '&uniqid=' + misclickedUniqid;
    } else if (RecaptchaType_SECURITY == recaptchaType) {
      details.url = 'http://www.kingsofchaos.com/security.php';
    } else {
      GM_log('critical error!');
    }
    details.headers = {};
    details.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    details.data = data;
    details.onerror = function (responseDetails) {
      // Umm... let's just try showing another reCAPTCHA...
      showRecaptchaBox();
    }
    details.onload = function (responseDetails) {
      if (handleSecurityRecaptcha(responseDetails)) return;
      if (handleMisclickRecaptcha(responseDetails)) return;

      // Assume everything is hunky-dory otherwise...
      misclickedUniqid = null;
      hideRecaptchaBox();

      // Restart any fetches/responses that may have stalled due to a reCAPTCHA
      getNextCaptchaImage();
    };
    recaptchaType = RecaptchaType_PROCESSING;
    GM_xmlhttpRequest(details);
  }
}

function hideRecaptchaBox() {
  recaptchaBox.style.visibility = 'hidden';
  modalBackground.style.display = 'none';
  recruiterResponseField.disabled = false;
  recruiterResponseField.focus();
  // Start a background refresh of the reCAPTCHA
  try {
    document.getElementById('recaptcha_response_field').disabled = true;
    Recaptcha.reload();
    recaptchaReloaded = true;
  } catch (e) {
  }
  recaptchaType = 0;
}

// Recruiter captcha handling functions
function getNextCaptchaImage() {
  if (captchaFetchesInProgress >= MAX_REQUESTS_IN_FLIGHT ||
      captchaQueue.length + captchaFetchesInProgress >= MAX_CAPTCHAS_TO_LOAD ||
      0 != recaptchaType ||
      0 == links.length ||
      isExiting) {
    return;
  }
  ++captchaFetchesInProgress;

  var uniqid = links.shift();
  linkListLength.textContent = links.length;

  var details = {};
  details.method = 'GET';
  details.url = 'http://www.kingsofchaos.com/recruit.php?clickerid=' + myStatsid
              + '&uniqid=' + uniqid;
  details.onerror = function (responseDetails) {
    --captchaFetchesInProgress;
    delete requestTimer[uniqid];
    // Maybe it's a temporary error? Schedule a retry in 30 seconds...
    window.setTimeout(getNextCaptchaImage, 10 * 1000);
  }
  details.onload = function (responseDetails) {
    --captchaFetchesInProgress;
    delete requestTimer[uniqid];

    if (200 != responseDetails.status) {
      serverStatusBox.textContent = 'dying';
      window.setTimeout(getNextCaptchaImage, 10 * 1000);
      return;
    } else if ('dying' == serverStatusBox.textContent) {
      serverStatusBox.textContent = 'back again?';
    }

    if (handleSecurityRecaptcha(responseDetails)) return;
    if (handleMisclickRecaptcha(responseDetails)) return;

    var uniqid2 = extractText(responseDetails.responseText,
                              'name="uniqid" value="',
                              '">');
    var iuniqid = extractText(responseDetails.responseText,
                              'name="iuniqid" value="',
                              '">');
    var captchaId = extractText(responseDetails.responseText,
                                "/ads/recruit' + '.img' + '?",
                                '&uniqid=');

    if (responseDetails.responseText.indexOf('There is no one left') >= 0) {
      GM_log('Huh? Original URL was ' + details.url);
    } else if (responseDetails.responseText.indexOf('Invalid User ID') >= 0) {
      updateStats(responseDetails.responseText);
    } else if (uniqid2 && iuniqid && captchaId) {
      if (uniqid != uniqid2) {
        if (uniqid2) {
	  //alert('Requested ' + uniqid + ' but received data for ' + uniqid2);
          GM_log('Requested ' + uniqid + ' but received data for ' + uniqid2);
          misloadedImages++;
        } else {
          GM_log('Umm...');
          GM_log(responseDetails.responseText);
        }
      } else {
        var captchaObject = {};
        captchaObject.iuniqid = iuniqid;
        captchaObject.uniqid = uniqid;
        captchaObject.img = imageBox.appendChild(new Image);
        captchaObject.img.style.width = '360px';
        captchaObject.img.style.height = '220px';
        captchaObject.img.style.position = 'absolute';
        // Position it past the right of imageBox.
        captchaObject.img.style.top = '10px';
        captchaObject.img.style.left = '1130px';
        captchaObject.img.src = 'http://www.kingsofchaos.com/ads/recruit.img?'
                              + captchaId + '&uniqid=' + uniqid;

        // Edge case if the queue is low on images
        if (captchaQueue.length < 3) {
          captchaObject.img.style.top = '10px';
          captchaObject.img.style.left = 10 + 370 * captchaQueue.length;
        }
        captchaQueue.push(captchaObject);
      }

      updateStats(responseDetails.responseText);
    } else {
      GM_log('Received malformed response when requesting ' + uniqid);
      GM_log(responseDetails.responseText);
    }
    getNextCaptchaImage();
    // Weird stuff happened. What to do? Nobody knows...
  };
  requestTimer[uniqid] = (new Date).getTime();
  GM_xmlhttpRequest(details);
  getNextCaptchaImage();
}

function reportSuccessfulClick(uniqid) {
  successfulClicks.push(uniqid);
  maybeReportClicks();
}

function reportAlreadyClicked(uniqid) {
  alreadyClicked.push(uniqid);
  maybeReportClicks();
}

function maybeReportClicks() {
  if (successfulClicks.length + alreadyClicked.length >= REPORT_THRESHOLD) {
    reportClicks();
  }
}

function reportClicks(onload, onerror) {
  GM_log('Reporting clicks');
  var details = {};
  details.method = 'POST';
  details.url = mainURL+'/addclicks.php?';
  details.headers = {};
  details.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  details.data = 'id=' + myStatsid
               + '&ids=' + successfulClicks.join(',')
               + '&a=' + alreadyClicked.join(',')
               + '&p='+GM_getValue('clickpas');

  if (onerror) {
    details.onerror = onerror;
  }
  if (onload) {
     details.onload = onload;
    
  }  
  else {
      details.onload = function (responseDetails) {
   	requestQuery();
      };
  }
  //alert(details.data);
  GM_xmlhttpRequest(details);
  
  successfulClicks = [];
  alreadyClicked = [];
}

function sendRecruiterResponse(captchaObject, letter) {
  // Apparently, it's case-sensitive...
  captchaObject.response = letter.toLowerCase();
  var details = {};
  details.method = 'POST';
  details.url = 'http://www.kingsofchaos.com/recruit.php?clickerid=' + myStatsid;
  details.data = 'iuniqid=' + captchaObject.iuniqid
               + '&uniqid=' + captchaObject.uniqid
               + '&image_click_number=' + captchaObject.response
               + '&hash=';
  details.headers = {};
  details.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  details.onerror = function (responseDetails) {
    --repliesInProgress;
  };
  details.onload = function (responseDetails) {
    --repliesInProgress;

    if (200 != responseDetails.status) return;

    if (handleSecurityRecaptcha(responseDetails)) return;
    if (handleMisclickRecaptcha(responseDetails)) return;

    if (responseDetails.responseText.indexOf('Database Error.') >= 0) {
      if (++consecutiveDatabaseErrors >= 16) {
        showInfoBox('KoC has returned 16 database errors in a row. ' +
                    'You might want to stop clicking for now =)');
      }
      return;
    } else {
      hideInfoBox();
    }

    if (responseDetails.responseText.indexOf('5 times today') >= 0) {
      numberAlreadyClicked++;
      alreadyClickedStatusBox.textContent = numberAlreadyClicked;
      links = links.filter(function (element) {
        return element != captchaObject.uniqid;
      });
      reportAlreadyClicked(captchaObject.uniqid);
      GM_log('already clicked ' + captchaObject.uniqid);
    } else {
      // TODO: check that we have something that looks like a recruit page or a
      // "no one left to click" page.
      // TODO: in the future, detect invalid ID here.
      if (responseDetails.responseText.indexOf('There is no one left') >= 0 ||
          responseDetails.responseText.indexOf('Recruit Center of') >= 0) {
        reportSuccessfulClick(captchaObject.uniqid);
        // TODO: temporary hack until I fix the auto-redirect issue.
      } else {
        GM_log('got a funny-looking response');
        GM_log(responseDetails.responseText);
        invalidResponse++;
      }
    }
    updateStats(responseDetails.responseText);
  };
  ++repliesInProgress;
  GM_xmlhttpRequest(details);
}

function maybeSendRecruiterResponseHelper(letter) {
  return function () {
    var e = {
      keyCode: letter.charCodeAt(0),
    };
    maybeSendRecruiterResponse(e);
  };
}

function maybeSendRecruiterResponse(e) {
  var letter = String.fromCharCode(e.keyCode);
  switch (e.keyCode) {
    case 96:
      letter = ' ';
      break;
    case 97:
      letter = 'A';
      break;
    case 98:
      letter = 'O';
      break;
    case 99:
      letter = 'S';
      break;
    case 100:
      letter = 'G';
      break;
    case 101:
      letter = 'C';
      break;
    case 102:
      letter = 'H';
      break;
    case 103:
      letter = 'K';
      break;
    case 104:
      letter = 'I';
      break;
    case 105:
      letter = 'N';
      break;
    default:
      break;
  }
  var captchaObject;
  var processed = false;

  switch (letter) {
    case ' ':
      // Skip the current captcha. Maybe the damn thing is too hard to read.
      processed = true;
      if (captchaObject = captchaQueue.shift()) {
        imageBox.removeChild(captchaObject.img);
      }
      break;
    case 'K':
    case 'I':
    case 'N':
    case 'G':
    case 'C':
    case 'H':
    case 'A':
    case 'O':
    case 'S':
      processed = true;
      if (captchaObject = captchaQueue.shift()) {
        imageBox.removeChild(captchaObject.img);
        sendRecruiterResponse(captchaObject, letter);
        ++clickCount;
      }
      break;
    default:
      // Um... ignore the weird keypress
      break;
  }

  if (processed) {
    updateStats('');
    for (var i = 0; i < 3 && i < captchaQueue.length; ++i) {
      captchaQueue[i].img.style.left = 10 + 370 * i;
    }
    if (0 == captchaQueue.length && 0 == links.length) {
      fetchNextClickList();
    } else {
      getNextCaptchaImage();
    }
  }

  // TODO: is there a way to cancel the default action?
  recruiterResponseField.value = '';
}

// Initialization functions
function initializeRecruiter() {
  // First, hide the original recruiter page.
  for (var i = 0, el; el = document.body.childNodes[i]; ++i) {
    if (el.style) {
      el.style.display = 'none';
    }
  }

  // Inject the reCAPTCHA AJAX API. There's all sorts of complications if we
  // try to use @resource unfortunately...
  var recaptchaAjaxScript =
      document.getElementsByTagName('head')[0].appendChild(
          document.createElement('script'));
  recaptchaAjaxScript.type = 'text/javascript';
  recaptchaAjaxScript.src = 'http://www.google.com/recaptcha/api/js/recaptcha_ajax.js';

  document.title = 'YAR: Yet Another Recruiter';

  GM_addStyle('body {' +
              '  margin: 0;' +
              '  padding: 0;' +
              '}' +
              'a {' +
              '  color: #57c;' +
              '  font-size: medium;' +
              '  border-bottom: 1px dotted;' +
              '}' +
              // Use nicer-looking fonts
              '* {' +
              '  font-family: calibri, helvetica, sans-serif;' +
              '}' +
              '#linkBar {' +
              '  position: relative;' +
              '  width: 100%;' +
              '  height: 1em;' +
              '  border-bottom: 1px solid #444;' +
              '  padding: 7px 0;' +
              '  color: #777;' +
              '  text-align: center;' +
              '  z-index: 2000;' +
              '}' +
              '#imageBox {' +
              '  position: relative;' +
              '  margin: 100px auto 0;' +
              '  width: 1120px;' +
              '  height: 240px;' +
              '  border: 1px solid #777;' +
              '  overflow: hidden;' +
              '}' +
              '#infoBox {' +
              '  display: none;' +
              '  margin: 12px auto 0;' +
              '  width: 1110px;' +
              '  padding: 5px;' +
              '  text-align: center;' +
              '  border: 1px solid #777;' +
              '  background-color: #222;' +
              '}' +
              '#mainBox {' +
              '  margin: 12px auto 0;' +
              '  width: 1110px;' +
              '  height: 7.5em;' +
              '  padding: 5px;' +
              '  border: 1px solid #777;' +
              '  background-color: #222;' +
              '}' +
              '#inputClickpadBox {' +
              '  display: inline-block;' +
              '  width: 120px;' +
              '}' +
              '#recruiterResponseField {' +
              '  background-color: #fff;' +
              '  color: #000;' +
              '  width: 30%;' +
              '}' +
              '#recruiterResponseField + button {' +
              '  padding-left: 5%;' +
              '  width: 65%;' +
              '}' +
              '#inputClickpadBox * button { ' +
              '  height: 2em;' +
              '  margin-top: 5%;' +
              '  width: 30%' +
              '}' +
              '#inputClickPadBox div button:first-child {' +
              '  margin-right: 5%;' +
              '}' +
              '#inputClickPadBox div button:last-child {' +
              '  margin-left: 5%;' +
              '}' +
              '#debugBar {' +
              '  margin: 12px auto 0;' +
              '  width: 1120px;' +
              '  height: 1.5em;' +
              '  bottom: 0;' +
              '  padding: 5px;' +
              '  text-align: center;' +
              '  border: 1px solid #777;' +
              '  background-color: #222;' +
              '}' +
              '#modalBackground {' +
              '  position: absolute;' +
              '  top: 0;' +
              '  left: 0;' +
              '  bottom: 0;' +
              '  right: 0;' +
              '  background-color: #000;' +
              '  opacity: 0.5;' +
              '  z-index: 1000' +
              '}' +
              '#modalBox, #recaptchaBox {' +
              '  position: absolute;' +
              '  top: 150px;' +
              '  left: 0;' +
              '  right: 0;' +
              '  margin: 0 auto;' +
              '  width: 500px;' +
              '  height: 140px;' +
              '  border: 2px solid #777;' +
              '  background-color: #000;' +
              '  color: #fff;' +
              '  font-size: large;' +
              '  text-align: center' +
              '}' +
              '#modalBox {' +
              '  display: table;' +
              '  z-index: 1002;' +
              '}' +
              '#recaptchaBox {' +
              '  z-index: 1001;' +
              '}' +
              '#modalBox > div {' +
              '  display: table-cell;' +
              '  padding: 10px;' +
              '  vertical-align: middle;' +
              '}' +
              // reCAPTCHA styling
              '#recaptcha_area {' +
              '  margin: 0px auto !important;' +
              '}' +
              '#recaptcha_response_field {' +
              '  background-color: white !important;' +
              '  color: black !important;' +
              '}');

  // Set up the recruiter UI
  // We do this by replacing body.innerHTML... yea, it's not "standards
  // compliant"... but it's a lot easier.
  document.body.innerHTML =
      '<div id="linkBar">' +
      '  <span style="color:#fff">Sweet Revenge\'s YAR v' + VERSION +
      '  </span> &#xbb; ' +
      '  <a href="'+mainURL+'" target="_blank">' +
      '    Recruiter Stats</a> ' +
      '  <a href="http://srforums.net/" target="_blank">' +
      '    Sweet Revenge Forums</a> ' +
      '</div>' +
      // Frame for displaying the recruiter images.
      '<div id="imageBox"></div>' +
      '<div id="infoBox"></div>' +
      // Status and input box are displayed in here.
      '<div id="mainBox">' +
      '  <div style="float: left; width: 300px; height: 100%;' +
      '              border-right: 1px solid #777">' +
      '    CPM: <span id="cpmStatusBox">0</span><br>' +
      '    Loaded: <span id="imageStatusBox">0</span><br>' +
      '    Queued links: <span id="linkListLength">0</span><br>' +
      '    Morale: <span id="moraleStatusBox">-</span><br>' +
      '    Already clicked: <span id="alreadyClickedStatusBox">0</span><br>' +
      '    KoC server status: <span id="serverStatus">normal</span>' +
      '  </div>' +
      ' <div style="float:left;position:relative;width:300px;height: 100%;' +
      '              border-right: 1px solid #777;text-align: center; vertical-align: top">' +
      '    Total Clicked: <span id="totalclickStatusBox">0</span><br>' +
      '    Clicked today: <span id="todayclickStatusBox">0</span><br>' +
      '    Clicks left: <span id="clickleftStatusBox">0</span><br>' +
      '    </div>' +
      '  <div style="position: relative; float: right; width: 500px;' +
      '              text-align: center; vertical-align: top">' +
      '    <span style="vertical-align: top">' +
      '      Type in here &#xbb;&#xbb;&#xbb;' +
      '    </span>' +
      '    <div id="inputClickpadBox">' +
      '      <input id="recruiterResponseField"' +
      '             autocomplete="off" ' +
      '             disabled="disabled" ' +
      '             text-align: center" />' +
      '      <button>Skip &#xbb;</button>' +
      '      <div>' +
      '        <button>K</button><button>I</button><button>N</button>' +
      '      </div>' +
      '      <div>' +
      '        <button>G</button><button>C</button><button>H</button>' +
      '      </div>' +
      '      <div>' +
      '        <button>A</button><button>O</button><button>S</button>' +
      '      </div>' +
      '    </div>' +
      '    <button style="position: absolute; bottom: 0; right: 0">' +
      '       Stop Clicking' +
      '    </button>' +
      '  </div>' +
      '</div>' +
      '<div id="debugBar"></div>' +
      '<div id="modalBackground"></div>' +
      '<div id="modalBox"><div>Loading reCAPTCHA&#x2026;</div></div>' +
      '<div id="recaptchaBox"></div><div id="pass"></div>';
     //'<div id="pass">Password: <input type="text" name="list" id="paslist" size="20" maxlength="35"><input type="button" id="Open" value="Save"/> Change Password: <input type="text" name="list" id="cpaslist" size="20" maxlength="35"><input type="button" id="Open1" value="Save"/></div>';

	 /*
document.getElementById('paslist').value = GM_getValue('clickpas');
document.getElementById('Open').addEventListener(
      'click',
      function () {
        GM_setValue('clickpas',document.getElementById('paslist').value);
        alert('Password Saved');
      },
      false);

document.getElementById('Open1').addEventListener(
      'click',
      function () {
        oldp = GM_getValue('clickpas');
        np = document.getElementById('cpaslist').value;
        
        var details = {};
  details.method = 'GET';
  details.url = mainURL+'/changepassword.php?id='+myStatsid+'&p='+oldp+'&np='+np;
  details.onerror = function (responseDetails) {
    
  };
  details.onload = function (responseDetails) {
        
	
    if(responseDetails.responseText.indexOf('Failed') >= 0) {
	alert("Wrong Password");
	return;
    }
    else{
	alert("Password Successfully Changed!");
        GM_setValue('clickpas',np);
        document.getElementById('paslist').value = GM_getValue('clickpas');
        document.getElementById('cpaslist').value = "";
	return;
    }
        
  };
  GM_xmlhttpRequest(details);
      },
      false);
*/

  imageBox = document.getElementById('imageBox');

  cpmStatusBox = document.getElementById('cpmStatusBox');
  imageStatusBox = document.getElementById('imageStatusBox');
  linkListLength = document.getElementById('linkListLength');
  moraleStatusBox = document.getElementById('moraleStatusBox');
  alreadyClickedStatusBox = document.getElementById('alreadyClickedStatusBox');
  serverStatusBox = document.getElementById('serverStatus');

  modalBackground = document.getElementById('modalBackground');
  modalBox = document.getElementById('modalBox').firstChild;
  recaptchaBox = document.getElementById('recaptchaBox');

  recruiterResponseField = document.getElementById('recruiterResponseField');
  recruiterResponseField.addEventListener('keyup',
                                          maybeSendRecruiterResponse,
                                          false);

  // Attach click listeners for the clickpad. At this point, no other buttons
  // are defined, so it's safe to do this.
  var buttons = document.getElementsByTagName('button');
  buttons[0].addEventListener('click', maybeSendRecruiterResponseHelper(' '),
                               false);
  buttons[1].addEventListener('click', maybeSendRecruiterResponseHelper('K'),
                              false);
  buttons[2].addEventListener('click', maybeSendRecruiterResponseHelper('I'),
                              false);
  buttons[3].addEventListener('click', maybeSendRecruiterResponseHelper('N'),
                              false);
  buttons[4].addEventListener('click', maybeSendRecruiterResponseHelper('G'),
                              false);
  buttons[5].addEventListener('click', maybeSendRecruiterResponseHelper('C'),
                              false);
  buttons[6].addEventListener('click', maybeSendRecruiterResponseHelper('H'),
                              false);
  buttons[7].addEventListener('click', maybeSendRecruiterResponseHelper('A'),
                              false);
  buttons[8].addEventListener('click', maybeSendRecruiterResponseHelper('O'),
                              false);
  buttons[9].addEventListener('click', maybeSendRecruiterResponseHelper('S'),
                              false);
  buttons[10].addEventListener(
      'click',
      function () {
        isExiting = true;
        if (successfulClicks.length + alreadyClicked.length == 0) {
          showModalBox('Redirecting back to KoC\u2026');
          window.location = 'http://www.kingsofchaos.com/base.php';
          return;
        }
        showModalBox('Waiting for final replies from KoC server\u2026');
        // Wait up to 60 seconds, then give up
        window.setTimeout(function () {
          GM_log('gave up waiting on final replies\u2026');
          repliesInProgress = 0;
        }, 60 * 1000);
        waitForRepliesInProgress();
      },
      false);

  window.addEventListener('beforeunload',
      function (e) {
        if (successfulClicks.length + alreadyClicked.length > 0) {
          e.returnValue = 'Please click \u201cI\u2019m Bored\u201d to log your '
                        + 'clicks and exit the recruiter!';
        }
      },
      false);

  // Attempt to check for Ad Muncher breakage
  try {
    window.setTimeout(function () { }, 0);
  } catch (e) {
    showModalBox('Ad Muncher-injected code detected in script file; please ' +
                 'read the <a href="http://koc.ithildin.com/yar/faq.html" ' +
                 'target="blank">FAQ</a> to fix the problem.');
    return;
  }

  waitForRecaptchaAjaxScriptLoad();
}

function waitForRepliesInProgress() {
  if (repliesInProgress > 0) {
    window.setTimeout(waitForRepliesInProgress, 1000);
    return;
  }
  showModalBox('Reporting final clicks\u2026');
  reportClicks(function (responseDetails) {
    showModalBox('Redirecting back to KoC\u2026');
    window.location = 'http://www.kingsofchaos.com/base.php';
  });
}

function waitForRecaptchaAjaxScriptLoad() {
  if (!unsafeWindow.Recaptcha) {
    window.setTimeout(waitForRecaptchaAjaxScriptLoad, 100);
    return;
  }

  Recaptcha = unsafeWindow.Recaptcha;

  whoAmI();
}

function whoAmI() {
  showModalBox('Who Am I\u2026?');
  var details = {};
  details.method = 'GET';
  details.url = 'http://www.kingsofchaos.com/base.php';
  details.onerror = function (responseDetails) {
    showModalBox('Something weird happened\u2026 try refreshing and ' +
                 'launching YAR again.');
  };
  details.onload = function (responseDetails) {
    myUniqid = extractText(responseDetails.responseText,
        '<a href="http://www.kingsofchaos.com/recruit.php?uniqid=', '">');
    if (!myUniqid) {
      showModalBox('Something weird happened\u2026 try refreshing and ' +
                   'launching YAR again.');
      return;
    }
    myStatsid = extractText(responseDetails.responseText,
        '<a href="stats.php?id=', '">');
    if (!myStatsid) {
      showModalBox('Something weird happened\u2026 try refreshing and ' +
                   'launching YAR again.');
      return;
    }
    loadClickList();
  };
  GM_xmlhttpRequest(details);
}

function fetchNextClickList() {
  misloadedImages = 0;
  invalidResponse = 0;
  showModalBox('Reporting clicks\u2026');
  reportClicks(fetchNextClickList2, fetchNextClickList2);
}

// TODO: find a better name for this function =)
function fetchNextClickList2() {
  showModalBox('Fetching next click list\u2026');
  var details = {};
  details.method = 'GET';
  details.url = mainURL+'/getlist.php?id='+myStatsid+'&v='+VERSION+'&p='+GM_getValue('clickpas');
  details.onerror = function (responseDetails) {
    showModalBox('Error fetching click list. Retrying in 5 seconds\u2026');
    window.setTimeout(fetchNextClickList2, 5 * 1000);
  };
  details.onload = function (responseDetails) {
    if (responseDetails.responseText.indexOf('UPDATE: ') >= 0 ){
      showModalBox(responseDetails.responseText);
      return;
    }

    if(responseDetails.responseText.indexOf('NO ACCESS') >= 0) {
	alert(responseDetails.responseText);
		hideModalBox();
	return;
}
    

    showModalBox('Processing click list\u2026');
    links = responseDetails.responseText.split(',');
    links.pop();

    if (0 == links.length) {
      showModalBox('It seems like you\u2019ve already clicked everyone.');
      return;
    }
    hideModalBox();
    getNextCaptchaImage();
  };
  GM_xmlhttpRequest(details);
  requestQuery();
}

function loadClickList() {
  showModalBox('Loading click list\u2026');
  var details = {};
  details.method = 'GET';
  details.url = mainURL+'/getlist.php?id='+myStatsid+'&v='+VERSION+'&p='+GM_getValue('clickpas');
  details.onerror = function (responseDetails) {
    showModalBox('Error fetching click list. Retrying in 5 seconds\u2026');
    window.setTimeout(loadClickList, 5 * 1000);
  };
  details.onload = function (responseDetails) {
    if (responseDetails.responseText.indexOf('UPDATE: ') >= 0){
      showModalBox(responseDetails.responseText);
      return;
    }

    if(responseDetails.responseText.indexOf('NO ACCESS') >= 0) {
	alert(responseDetails.responseText);
		hideModalBox();
	return;
}
    showModalBox('Processing click list\u2026');
    links = responseDetails.responseText.split(',');
    links.pop();

    if (0 == links.length) {
      showModalBox('It seems like you\u2019ve already clicked everyone.');
      return;
    }

    Recaptcha.create('6LcvaQQAAAAAACnjh5psIedbdyYzGDb0COW82ruo',
                     recaptchaBox, { theme: 'blackglass', });
    // TODO: It'd be nice to limit the scope of this listener... ah well.
    document.documentElement.addEventListener('keyup',
                                              maybeSendRecaptchaResponse,
                                              false);
    hideRecaptchaBox();
    hideModalBox();

    // Attempts to restore things to a sane state when clicked. Useful if Kings
    // of Chaos randomly decides to log you out or your Internet connection is
    // flaky.
    var panicButton =
        document.body.appendChild(document.createElement('button'));
    panicButton.type = 'button';
    panicButton.style.position = 'absolute';
    panicButton.style.bottom = '10px';
    panicButton.style.right = '10px';
    panicButton.style.zIndex = 2000;
    panicButton.textContent = 'Froze? Revive me!';
    panicButton.addEventListener(
        'click',
        function () {
          GM_log('panicking!');
          hideRecaptchaBox();
          hideModalBox();
          // This is the nuclear option. GM_xmlhttpRequest doesn't provide a way
          // to notify you if your request failed due to a network connectivity
          // issue; instead, we do a blanket reset of everything.
          requestTimer = {};
          captchaFetchesInProgress = 0;
          isExiting = false;
          getNextCaptchaImage();
        },
        false);

    window.setInterval(updateCPM, 2 * 1000);
    window.setInterval(updateServerStatus, 500);

    // Start loading links!
    getNextCaptchaImage();
  };
  GM_xmlhttpRequest(details);
  requestQuery();
}

// Originally at the top of functions. Functions are rotated by 1 every release.
function updateCPM() {
  if (cpmData.push(clickCount) > 30) {
    cpmData.shift();
  }
  clickCount = 0;

  var cpm = cpmData.reduce(function (left, right) {
    return left + right;
  }) / cpmData.length * 30;
  cpmStatusBox.textContent = cpm.toFixed();
}

// Utility functions
function extractText(haystack, needle1, needle2) {
  var x = haystack.indexOf(needle1);
  if (x < 0) return null;
  var y = haystack.indexOf(needle2, x);
  if (y < 0) return null;
  return haystack.substring(x + needle1.length, y);
}

function requestQuery(){

var details = {};
  details.method = 'GET';
  details.url = mainURL+'/yarstats.php?id='+myStatsid;
  details.onerror = function (responseDetails) {
    
  };
  details.onload = function (responseDetails) {
        
	var datas = responseDetails.responseText.split(",");
        document.getElementById('totalclickStatusBox').textContent = datas[0];
       document.getElementById('todayclickStatusBox').textContent = datas[1];
       document.getElementById('clickleftStatusBox').textContent = datas[2];
        
  };
  GM_xmlhttpRequest(details);
}

try {
  // The magic button that attaches the actual recruiter to the page.
  var clickPrefForm = document.getElementsByName('clickPref')[0];
  if ('BUTTON' == clickPrefForm.lastChild.tagName &&
      'Launch Recruiter' == clickPrefForm.lastChild.textContent) {
    clickPrefForm.lastChild.style.display = 'none';
    document.body.innerHTML +=
        '<div style="position: absolute; top: 0; left: 0; right: 0; '+
        '            background-color: #c0c0c0; color: #b33; ' +
        '            border-bottom: 1px solid #777; font-weight: bold; ' +
        '            padding: 5px; font-size: 2em">' +
        '  Error: you appear to have multiple versions of YAR installed. ' +
        '  Please uninstall all versions of YAR by going to ' +
        '  Tools&gt;Greasemonkey&gt;Manage User Scripts and uninstalling all ' +
        '  copies of &#x201c;Yet Another Recruiter&#x201d;. Once that&#x2019;s ' +
        '  done, please reinstall YAR from ' +
        '  <a href="'+mainURL+'/recruiter.user.js" ' +
        '     style="font-size: 1em; color: #00f" target="_blank">' +
        '    Sweet Revenge\'s YAR' +
        '  </a>. (Sorry for the trouble, I promise this won&#x2019;t happen ' +
        '  again&#x2014;really!)' +
        '</div>';
  } else {
    var launcher = clickPrefForm.appendChild(document.createElement('button'));
    launcher.type = 'button';
    launcher.textContent = 'Launch Recruiter';
    launcher.addEventListener('click', initializeRecruiter, false);
  }
} catch(e) {
}

})();