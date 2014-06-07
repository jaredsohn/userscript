// ==UserScript==
// @name           LT Ratings Details
// @namespace      http://userscripts.org/users/brightcopy
// @include        http://*.librarything.tld/work/*
// ==/UserScript==

var div = document.evaluate(
    '//div[@class="greenbox" and nobr/img[starts-with(@src, "http://static.librarything.com/pics/ss")]]',
    document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

if (div) {
  var table;
  for (var i = 0; i < div.childNodes.length; i++) {
    if (div.childNodes[i].nodeName = 'TABLE') {
      table = div.childNodes[i];
      break;
    }
  }

  if (table) {
    var lastDiv = div.lastChild;
    while (lastDiv && lastDiv.nodeName === '#text') {
      lastDiv = lastDiv.previousSibling;
    }

    if (lastDiv && lastDiv.nodeName === 'DIV') {
      div.removeChild(lastDiv);
    }
    else {
      lastDiv = undefined;
    }

    var modeScores = [0, 0, 0, 0, 0];
    var medianScores = [];
    var total = 0;
    var users = 0;
    var tds = document.evaluate('//td[@class="gbr"]/text()',div, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; i < tds.snapshotLength; i++) {
      var node = tds.snapshotItem(i);
      var scoreUsers = Number(node.textContent);
      var score = Number(node.parentNode.previousSibling.textContent);

      users += scoreUsers;
      total += score * scoreUsers;

      for (var s = 0; s < scoreUsers; s++) {
        medianScores.push(score);
      }

      // Half-stars are kind of funky since most people don't use them (either because they don't like them or
      // they don't realize they even exist).  So I'm making an adjustment that gets rid of them for the mode by
      // giving half of them to the score below and half to the score above.  For a single half-star, it only gives
      // half the users to the score above and dumps the other half since there is no such thing as a zero star rating.
      // Yes, this is quite unscientific.
      if (Math.floor(score) === score) {
        modeScores[score - 1] += scoreUsers;
      }
      else {
        if (score !== 0.5) {
          modeScores[score - 0.5 - 1] += scoreUsers / 2;
        }
        modeScores[score + 0.5 - 1] += scoreUsers / 2;
      }
    }

    var maxMode = [];
    var maxModeScore = 0;
    for (i = 0; i < modeScores.length; i++) {
      if (modeScores[i] > maxModeScore) {
        maxMode = [i + 1];
        maxModeScore = modeScores[i];
      }
      else if (modeScores[i] === maxModeScore) {
        maxMode.push(i + 1);
      }
    }

    var median = (medianScores.length % 2 === 0)
        // even - take mean of middle two
        ? (medianScores[Math.floor(medianScores.length / 2)] + medianScores[Math.ceil(medianScores.length / 2)]) / 2
        // odd - choose middle
        : medianScores[Math.floor(medianScores.length / 2)];

    addLine(div, 'Median', median);

    //console.log(modeScores, maxMode);
    if (maxMode.length !== 0) {
      addLine(div, 'Mode(adj)', maxMode);
    }

    addLine(div, 'Members', users, true);

    if (lastDiv) {
      div.appendChild(document.createElement('p'));
      div.appendChild(lastDiv);
    }
  }
}

function addLine(div, text, rating, skipStars) {
  var nobr, img, span;

  div.appendChild(document.createElement('br'));

  div.appendChild(document.createTextNode(text + ': '));

  if (!skipStars) {
    nobr = document.createElement('nobr');
    img = nobr.appendChild(document.createElement('img'));
    img.setAttribute('style', 'margin-bottom: -2px;');
    console.log(rating);
    img.setAttribute('src', 'http://static.librarything.com/pics/ss' + (rating.length ? rating[0] : rating) * 2 + '.gif');
    div.appendChild(nobr);
  }

  span = div.appendChild(document.createElement('span'));

  span.setAttribute('class', 'work_hint');
  if (!skipStars) {
    span.appendChild(document.createTextNode(' (' + (rating.length ? '' + rating.toString().replace(/([,.])/g, '$1 ') + '' : rating) + ')'));
  }
  else {
    span.appendChild(document.createTextNode(' ' + rating.toString()));
  }

  div.appendChild(document.createElement('br'));
}