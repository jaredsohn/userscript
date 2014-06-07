// ==UserScript==
// @name           Post Toast for Lithium comunities
// @namespace      http://sites.google.com/site/cerisesorbet/
// @description    preview forum posts, etc. on Lithium based communities
// @include        http://lithosphere.lithium.com/*
// @include        http://boards.adultswim.com/*
// @include        http://forums.verizon.com/*
// @include        http://bookclubs.barnesandnoble.com/*
// @include        http://community.secondlife.com/*
// @exclude        http://forums.comcast.com/*
// @version        2012.01.14
// ==/UserScript==

/*
   Notes:
    - Not usable on Comcast forums, they do not allow XML message reading
    - Verizon already has previews on some links, these will display in addition
*/

/*
  Changes:
  2012-01-14 - Previews for contest entries

  2011-05-07 - Answers now expands automatically, so remove old tweak

  2011-04-08 - Try to automatically expand comments on Answers thread pages

  2011-04-04 - cosmetics

  2011-03-31 - More flexible URL parsing, more error reporting,
               appearance tweaks, keep previews off some menus and
               kudos, regen KB popups after filter changes; 2nd:
               extend to search results
*/

function sendClick(element) {
  var ev = document.createEvent('MouseEvents');
  ev.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  element.dispatchEvent(ev);
}

String.prototype.escapeHTML = function () {
  return this.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/\"/g,'&quot;');
};

function SetupPop(node) {
  var links = node.getElementsByTagName('a');
  var x = 0;
  for (var i = 0; i < links.length; i++) {
    if (!~links[i].id.indexOf("dropDownLink") && !~links[i].id.indexOf("showAddTag")) {
      var postCommand = String(links[i].pathname).match(/\/(?:qaq-p|td-p|m-p|ba-p|bc-p|ta-p|idi-p|idc-p|cnc-p|cns-p)\/(?:\d+)/);
      if(postCommand) {
        x++;
        links[i].addEventListener('mouseover', PopTimer, true);
        links[i].addEventListener('mouseout', KillPop, true);
        links[i].addEventListener('click', KillPop, true);
      }
    }
  }
}

function PopTimer(e) {
  var tag = document.createElement('a');
  var postCommand = String(this.pathname).match(/\/(?:qaq-p|td-p|m-p|ba-p|bc-p|ta-p|idi-p|idc-p|cnc-p|cns-p)\/(?:\d+)/);
  if (postCommand) {
    var postNumber = postCommand[0].split('/').pop();
    tag.href = this.href;
    tag.search = tag.hash = "";
    tag.pathname ="/restapi/vc/messages/id/" + postNumber + '?xslt=json.xsl';

    gPopTimeout = window.setTimeout(function(){MakePop(e, tag);}, 850);
  }
}

function KillPop() {
  window.clearTimeout(gPopTimeout);
  if (gPopXML) gPopXML.abort();
  gHoverTip.style.display = 'none';
}

function MakePop(ev, tag) {
  var divWidth = 420;
  var divHeight = 250;
  var divTop = window.pageYOffset + ev.clientY;
  var divLeft = window.pageXOffset + ev.clientX;

  gHoverTip.class = '';
  gHoverTip.style.fontFamily = 'Helvetica,Arial,sans-serif';
  gHoverTip.style.fontSize = '10pt';
  gHoverTip.style.lineHeight = '1.15';
  gHoverTip.style.position = 'absolute';
  gHoverTip.style.zIndex = '9998';
  gHoverTip.style.backgroundColor = '#FFFFE8';
  gHoverTip.style.borderTop = gHoverTip.style.borderLeft = '1px solid #BFBFBF';
  gHoverTip.style.borderBottom = gHoverTip.style.borderRight = '2px solid #7F7F7F';
  gHoverTip.style.width = divWidth + 'px';
  gHoverTip.style.height = divHeight + 'px';
  gHoverTip.style.overflow = 'hidden';
  gHoverTip.style.textAlign = 'center';
  gHoverTip.style.padding = '5px';

  divLeft = (ev.clientX > window.innerWidth / 2) ? divLeft - divWidth - 10 : divLeft + 10;
  gHoverTip.style.left = divLeft + 'px';

  divTop = (ev.clientY > window.innerHeight / 2) ? divTop - divHeight - 20 : divTop + 20;
  gHoverTip.style.top = divTop + 'px';

  gHoverTip.innerHTML='<strong>Loading ' + tag.pathname + ' ...</strong>';
  gHoverTip.style.display = 'block';

  gPopXML = new XMLHttpRequest();
  gPopXML.open('GET', tag.href, true);
  gPopXML.onreadystatechange = function(e) {
    if (gPopXML.readyState == 4) {
      if(gPopXML.status != 200) { // HTTP error
        gHoverTip.innerHTML = '<b>HTTP Error ' + gPopXML.status + '</b><br/>';
        gHoverTip.innerHTML += '<p>I has a sad.</p>';
      }
      else { // yay!
        gHoverTip.innerHTML = "Success?";
        gHoverTip.style.textAlign = '';

        try {
          var article = JSON.parse(gPopXML.responseText);
        }
        catch(err) {
          gHoverTip.innerHTML = '<b>Eek! invalid JSON, something is broken.</b><br />' + String(err.message);
          return;
        }

        if (!article.response.status) { // all responses should have this
          gHoverTip.innerHTML = '<b>Eek! No response status, something is broken.</b>';
        }
        else if (article.response.status != "success") { // internal Lithium error, like no permission or deleted message
          gHoverTip.innerHTML = '<b>Arrgh, error when fetching the message :(</b>';

          if (article.response.error.code)
            gHoverTip.innerHTML += '<p><b>Error code:</b> ' + article.response.error.code + '</p>';

          if (article.response.error.message)
            gHoverTip.innerHTML += '<p><b>Error text: </b> ' + article.response.error.message + '</p>';
        }

        else { // must be a success...
          var message = article.response.message;
          gHoverTip.innerHTML = message.subject.$ ? '<strong>' + message.subject.$ + '</strong> ' : '<strong>(no subject)</strong> ';
          gHoverTip.innerHTML += message.author.login.$ ? '(' + message.author.login.$ + ')' : '(no author)';
          gHoverTip.innerHTML += '<div style="border-top:1px solid #000; padding:2px 0 2px 0"></div>';
          gHoverTip.innerHTML += message.body.$ ? message.body.$ : '<p><i>[ no body ]</i></p>';

          var i;

          tags = gHoverTip.getElementsByTagName('font');
          if (tags) {
              for (i = 0; i < tags.length; i++)
                tags[i].color = tags[i].face = tags[i].size = '';
          }

          tags = gHoverTip.getElementsByTagName('p');
          if (tags) {
            for (i = 0; i < tags.length; i++) {
              if (tags[i].innerHTML.match(/^(&nbsp;|\s)*$/))
                tags[i].style.lineHeight = '0.3';
              else
                gHoverTip.style.lineHeight = '1.15';
              tags[i].style.margin = tags[i].style.padding = '0';
            }
          }

          // squish blockquotes
          var tags = gHoverTip.getElementsByTagName('blockquote');
          if (tags) {
            for (i = 0; i < tags.length; i++) {
              tags[i].style.maxHeight = '4em';
              tags[i].style.overflow = 'hidden';
              tags[i].style.fontSize = '90%';
              tags[i].style.margin = tags[i].style.padding = '0 0 0 3px';
              tags[i].style.borderLeft = '1px dotted #555';
              tags[i].style.color='#000';
              tags[i].style.fontStyle='normal';
            }
          }

          tags =  gHoverTip.getElementsByTagName('hr');
          if (tags) { for (i = 0; i < tags.length; i++) tags[i].style.display = 'none'; }

          tags =  gHoverTip.getElementsByTagName('img');
          if (tags) { for (i = 0; i < tags.length; i++) tags[i].style.maxWidth ='100%'; }

          tags =  gHoverTip.getElementsByTagName('object');
          if (tags) { for (i = 0; i < tags.length; i++) tags[i].style.maxWidth ='100%'; }
        }
      }
    }
    gHoverTip.innerHTML = gHoverTip.innerHTML;
  };

  gPopXML.send(null);
}


//  On */t5/forums/recentpostspage/* displays for q&a/answers, the
//  links in both the subject and last post show only the question and
//  that one response. Change it so that the "Subject" link shows the
//  whole thread focused on the comment.  The "Last Post" link is left
//  untouched, in case somebody wants the original isolated view.
function FixRecentAnswersSubjects() {
  if (~gWindowPathParts.indexOf('recentpostspage')) {
    var subjects = document.getElementsByClassName('message-subject');
    for (var i = 0; i < subjects.length; i++) {
      var anchor = subjects[i].getElementsByTagName('a')[0];
      if (anchor)
        anchor.href = anchor.href.replace(/\/comment-id\/(\d*)?/, "");
    }
  }
}

function ResetPop() {
  SetupPop(document);
  if (gEvents['KBFilter'] == 0) {
    this.addEventListener('DOMSubtreeModified', KBFilter, false);
    gEvents['KBFilter'] = 1;
  }
}

function KBFilter() {
  this.removeEventListener('DOMSubtreeModified', KBFilter, false);
  gEvents['KBFilter'] = 0;
  window.setTimeout(ResetPop, 500);
}


if (document.body) {

  // article preview div
  gHoverTip = document.createElement('div');
  gHoverTip.style.className = 'lia-menu-navigation';
  gHoverTip.style.display = 'none';
  document.body.appendChild(gHoverTip);

  // event listener scoreboard
  gEvents = {};
  gPopTimeout = null;
  gPopXML = null;
  SetupPop(document);

  gWindowPathParts = window.location.pathname.replace(/^\//, "").split('/');

  FixRecentAnswersSubjects();

  // On dynamic AJAXy pages, event handlers need a refresh when results change.
  var searchListings = document.getElementsByClassName('lia-summary-view-message-list'); // KB filter page
  var searchList = null;
  if (searchListings.length)
      searchList = searchListings[0];
  if (!searchListings.length) {
      searchListings = document.getElementsByClassName('thread-search-results-list'); // search results
      if (searchListings.length)
          searchList = searchListings[0].parentNode;
  }
  if (searchList) {
    gEvents['KBFilter'] = 1;
    searchList.addEventListener('DOMSubtreeModified', KBFilter, false);
  }
}
