// ==UserScript==
// @name           Chain Walker
// @namespace      http://daniel.hey.nu
// @include        http://www.kingsofchaos.com/stats.php?*
// ==/UserScript==

// Set this to your own stat id, otherwise the script will NOT work.
const MY_STAT_ID = 4366356;
// There needs to be a small delay between adding a person as your friend and
// having their link show up in your recruit links. In order for this script to
// (hopefully) function correctly, you must make sure you've clicked yourself
// 5 times for that day already, and then set your recruiting preferences to
// "Friends Only". This delay can probably be lowered, but not too much...
const CLICK_LOAD_DELAY = 150;

function cons(list, element) {
  if ('' == list) {
    return '' + element;
  } else {
    return list + ' ' + element;
  }
}

function extractText(haystack, needle1, needle2) {
  var x = haystack.indexOf(needle1);
  if (x < 0) return null;
  var y = haystack.indexOf(needle2, x + needle1.length);
  if (y < 0) return null;
  return haystack.substring(x + needle1.length, y);
}

function extractStatId(url) {
  return url.split('?id=')[1].split('&start=')[0];
}

function extractOffset(url) {
  try {
    return parseInt(url.split('?id=')[1]
                       .split('&start=')[1]
                       .split('#walking')[0]);
  } catch (e) {
    return 0;
  }
}

function addStatId(statId) {
  var statIdRe = new RegExp('\\b' + statId + '\\b');
  if (GM_getValue('unmappedStatIds', '').search(statIdRe) >= 0) return;
  var statIdsWorkingSet = GM_getValue('statIdsWorkingSet', '');
  if (statIdsWorkingSet.search(statIdRe) >= 0) return;

  GM_setValue('statIdsWorkingSet', cons(statIdsWorkingSet, statId));
}

function walkNextStatId() {
  var workingSet = GM_getValue('statIdsWorkingSet', '');
  if ('' == workingSet) {
    // Out of links? Time to convert them to UniqIds...
    GM_setValue('state', 'mapping');
    mapNextUniqId();
    return;
  }
  workingSet = workingSet.split(' ');
  var statId = workingSet.shift();
  GM_setValue('statIdsWorkingSet', workingSet.join(' ')); 
  GM_setValue('unmappedStatIds',
              cons(GM_getValue('unmappedStatIds', ''), statId));
  window.location.assign('http://www.kingsofchaos.com/stats.php?id=' +
                         statId + '&start=0#walking');
}

var state = GM_getValue('state', '');
if (window.location.href.indexOf(
        'http://www.kingsofchaos.com/stats.php') >= 0) {
  if ('walking' == state && window.location.href.indexOf('#walking') >= 0) {
    var statId = extractStatId(window.location.href);
    var offset = extractOffset(window.location.href);
    // Grab the officer list
    var officerLinks = document.evaluate(
        '//table[contains(@class, "officers")]' +
        '//tr[not(contains(@class, "nav"))]//a',
        document, null, XPathResult.ANY_TYPE, null);
    var count = 0;
    for (var el; el = officerLinks.iterateNext(); ) {
      ++count;
      addStatId(el.href.split('?id=')[1]);
    }
    if (10 == count) {
      window.location.assign('http://www.kingsofchaos.com/stats.php?id=' +
                             statId + '&start=' + (offset + 10) + '#walking');
    } else {
      walkNextStatId();
    }
    return;
  } else {
    var button = document.body.appendChild(document.createElement('button'));
    button.style.position = 'fixed';
    button.style.bottom = 5;
    button.style.right = 5;
    button.textContent = 'Walk Chain';
    button.addEventListener(
        'click',
        function () {
          GM_setValue('unmappedStatIds', '');
          GM_setValue('statIdsWorkingSet', '');
          GM_setValue('statIds', '');
          GM_setValue('uniqIds', '');
          GM_setValue('state', 'walking');
          GM_setValue('seenIndexCount', 0);
          addStatId(extractStatId(window.location.href));
          walkNextStatId();
        },
        false);
  }
  return;
}

function setPlayerStatus(statId, status, callback) {
  var details = {};
  details.method = 'POST';
  details.url = 'http://www.kingsofchaos.com/addbuddy.php';
  details.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  details.data = 'buddy_type=' + status + '&user_id=' + statId;
  if (callback) {
    details.onload = callback;
  }
  GM_xmlhttpRequest(details);
}

function replaceAll( str, from, to ) {
    var idx = str.indexOf( from );
    while ( idx > -1 ) {
        str = str.replace( from, to );
        idx = str.indexOf( from );
    }
    return str;
}

function mapNextUniqId() {
  // TODO: overwrite the HTML with some of our own.
  var unmappedStatIds = GM_getValue('unmappedStatIds', '');
  if ('' == unmappedStatIds) {
    // Looks likes we're done...
    GM_setValue('state', '');
    document.title = 'Chain Walker :: Report';
    document.body.innerHTML = '<h3>StatIDs:</h3>' +
                              '<div>' + GM_getValue('statIds', '') + '</div>' +
							  '<div>' + replaceAll(GM_getValue('statIds', '')," ","<br>") + '</div>' +
							//  replaceAll(mymorale,"\t","");
                              '<h3>UniqIDs:</h3>' +
                              '<div>' + GM_getValue('uniqIds', '') + '</div>'+
							  '<div>' + replaceAll(GM_getValue('uniqIds', ''),",","<br>") + '</div>';
							  
    return;
  }
  unmappedStatIds = unmappedStatIds.split(' ');
  var currentCount = document.getElementById('currentCount');
  if (!currentCount) {
  
    GM_addStyle('body { background: #fff; color: #000; padding: 5px }');
    document.title = 'Chain Walker :: Mapping\u2026';
    document.body.innerHTML =
        '<div>Processing ' +
        '  <span id="currentCount">0</span> / ' + unmappedStatIds.length +
        '&#x2026;' +
        '</div>'+
		                              '<h3>UniqIDs:</h3>' +
                              '<div>' + unmappedStatIds + 'x</div>'+
							  '<div>' + replaceAll(String(unmappedStatIds),",","<br>") + '</div>';
							  
		//ssssssssssssaaaaaaaaaawwwwww
    currentCount = document.getElementById('currentCount');
  }
  currentCount.textContent = parseInt(currentCount.textContent) + 1;
  var statId = unmappedStatIds[0];
  setPlayerStatus(statId, 'friend', mapNextUniqId2);
}

// TODO: add a generic bind() function
function mapNextUniqId2() {
  window.setTimeout(mapNextUniqId3, CLICK_LOAD_DELAY);
}

function mapNextUniqId3() {
  var details = {};
  details.method = 'GET';
  details.url = 'http://www.kingsofchaos.com/click.php?clickerid=' + MY_STAT_ID;
  details.onload = function(responseDetails) {
    var uniqId = extractText(responseDetails.responseText,
                             'name="uniqid" value="', '"');
    var unmappedStatIds = GM_getValue('unmappedStatIds', '');
    if ('' == unmappedStatIds) {
      // Looks likes we're done... this really shouldn't happen normally unless
      // someone mucks about with the state while a walk/map is occuring.
      alert('Unexpected early termination!');
      GM_setValue('state', '');
      return;
    }
    unmappedStatIds = unmappedStatIds.split(' ');
    var statId = unmappedStatIds.shift();
    if (!uniqId) {
      if (responseDetails.responseText.indexOf(
            'There is no one left to click.') >= 0) {
        // Probably the person has already been clicked 5 times today...
        GM_log('statId: ' + statId + ' probably already clicked');
        uniqId = '????????';
      } else if (responseDetails.responseText.indexOf('Current Users') >= 0) {
        var seenIndexCount = GM_getValue('seenIndexCount', 0);
        if (++seenIndexCount > 3) {
          // Something is probably wrong if we've seen the index page 3 times.
          // TODO: add a way to resume?
          alert('Make sure MY_STAT_ID is correctly set...');
          return;
        }
        GM_setValue('seenIndexCount', seenIndexCount);
        mapNextUniqId2();
        return;
      } else {
        alert('Something unexpected happened...');
      }
    } else {
      GM_setValue('seenIndexCount', 0);
      var extractedStatId = extractText(responseDetails.responseText,
                               'href="stats.php?id=', '"');
      if (extractedStatId == MY_STAT_ID) {
        alert('You must finish clicking yourself before you can use this script!');
        // TODO: add a way to resume =)
        GM_setValue('state', '');
        return;
      }
    }
    if (statId != extractedStatId) {
      GM_log('Expected statId: ' + statId +
             ', extractedStatId: ' + extractedStatId +
             ' (probably already clicked)');
      // Mask out the uniqid that was extracted, since it is wrong.
      uniqId = '********';
    }
    GM_setValue('unmappedStatIds', unmappedStatIds.join(' ')); 
    GM_setValue('statIds', cons(GM_getValue('statIds', ''), statId));
    GM_setValue('uniqIds', cons(GM_getValue('uniqIds', ''), uniqId));
    setPlayerStatus(statId, 'none', mapNextUniqId);
  }
  details.onerror = function () {
    // TODO: add code to allow the scan to restart...
    alert("Network problem");
  };
  GM_xmlhttpRequest(details);
}

// We can get redirected here.
if (window.location.href.indexOf(
        'http://www.kingsofchaos.com/index.php') >= 0) {
  if ('mapping' == state) {
  }
  return;
}