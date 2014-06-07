// ==UserScript==
// @name           Thread reply button for Lithium communities
// @namespace      http://sites.google.com/site/cerisesorbet/
// @include        http://lithosphere.lithium.com/*
// @include        http://bookclubs.barnesandnoble.com/*
// @include        http://forums.verizon.com/*
// @include        http://boards.adultswim.com/*
// @include        http://community.secondlife.com/*
// ==/UserScript==

// return global thread ID, or 0 if missing
function GetReplyThreadNumber() {
  var links = document.getElementsByTagName('link');
  if (links.length) {
    var x; for (x = 0; x < links.length; x++) {
      if (links[x].rel == 'canonical') {
        var pathChop = links[x].href.split('/');
        var tdpIndex = pathChop.indexOf('td-p');
        if (~tdpIndex)
          return Number(pathChop[tdpIndex + 1]);
      }
    }
  }
  return 0;
}

function MakeThreadReplyButton() {
  // Is there an active reply button? If not, give up.
  var replySpan = document.getElementsByClassName('primary-action message-reply');
  if (replySpan.length) {
    var replyLink = replySpan[0].getElementsByTagName('a');
    if (replyLink.length == 0)
      return;
  }
  else
      return;

  var replyThreadNumber = GetReplyThreadNumber();
  if (replyThreadNumber) {
    // create the new button
    var threadReplyButton = document.createElement('span');
    threadReplyButton.className = 'primary-action';
    threadReplyButton.innerHTML = '<a class="lia-button lia-button-primary" style="margin-right: 10px" id="cerise-thread-reply-'
      + replyThreadNumber + '" rel="nofollow:"><span>Thread Reply</span></button>';

    // squeeze in the new one
    var bottomBar = document.getElementsByClassName("lia-menu-bar lia-menu-bar-bottom");
    if (bottomBar.length) {
      var buttonDiv = bottomBar[0].getElementsByClassName('lia-menu-bar-buttons');
      if (buttonDiv.length) {
        buttonDiv[0].style.display = ''; // div is there but typically hidden
        buttonDiv[0].appendChild(threadReplyButton);

        // The button is installed, so add an event handler.
        threadReplyButton.firstChild.addEventListener('click', DoThreadReply, true);
      }
    }
  }
}

function DoThreadReply() {
  var threadNumber = this.id.replace(/^cerise-thread-reply-/, '');

  // Get the board_id to build a reply URL
  var XMLReq = new XMLHttpRequest();
  var XMLhref =  window.location.protocol + '//' + window.location.hostname
    + '/restapi/vc/messages/id/' + threadNumber + '?xslt=json.xsl&amp;restapi.response_style=view';
  XMLReq.open('GET', XMLhref, true);
  XMLReq.onreadystatechange = function(e) {
    if (XMLReq.readyState == 4) {
      if(XMLReq.status != 200) { // HTTP error
        alert('Unable to get reply link, HTTP error ' + XMLReq.status);
      }
      else {
        try {
          var article = JSON.parse(XMLReq.responseText);
        }
        catch(err) {
          alert("Unable to get reply link, can't parse server response.");
          return;
        }

        if (!article.response.status) { // all responses should have this
          alert('Unable to get reply link, missing REST response status');
        }
        else if (article.response.status != "success") { // internal Lithium error, like no permission or deleted message
          errorText = article.response.error.code ? '[' + article.response.error.code  + '] ' : '[unknown] ';
          if (article.response.error.message)
            errorText += article.response.error.message;
          alert("Can't get reply link, Lithium error:\n" + errorText);
        }
        else { // must be a success...
          var message = article.response.message;
          if (!message.board_id.$)
            alert("Can't get message ID for thread reply");
          else if (!message.board.href)
            alert("Can't get board ID for thread reply");
          else {
            window.location.href = window.location.protocol + '//' + window.location.hostname
              + '/t5/forums/replypage/board-id/'
              + message.board.href.split('/').pop() + '/message-id/' +  message.board_id.$;
          }
        }
      }
    }
  };

  XMLReq.send(null);
}

MakeThreadReplyButton();
