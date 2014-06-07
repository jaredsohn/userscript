// ==UserScript==
// @name          Gmail Select Conversations and Replies
// @author        Raffles
// @namespace     http://ratherodd.com/
// @description   Adds two items to the end of the "Select:" collection (after Starred and Unstarred): Conversations (selects conversations) and Replies (select messages with Re: in the subject line)
// @include       http*://mail.google.tld/*
// ==/UserScript==
window.addEventListener('load', function() {  
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
      var tl, win = window.top.document.getElementById('canvas_frame').contentWindow;
      function addLinks() {
        if (gmail.getActiveViewType() !== 'tl') return;
        tl = gmail.getActiveViewElement();
        var selectors = win.document.evaluate('//div[starts-with(text(), "Select:")]', tl, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (selectors.snapshotLength > 0) {
          for (var j = 0; j < selectors.snapshotLength; j++) {
            var selector = selectors.snapshotItem(j);
            if (selector.lastChild.childNodes.length > 11) continue;
            var items = {'Conversations': document.createElement('span'), 'Replies': document.createElement('span')};
            for (var i in items) {
              items[i].appendChild(document.createTextNode(i));
              items[i].setAttribute('selector', i.toLowerCase());
              selector.lastChild.appendChild(document.createTextNode(', '));
              selector.lastChild.appendChild(items[i]);
              items[i].addEventListener('click', selectItems, false);
            }
          }
        }
      }
      function selectItems() {
        var xp = this.getAttribute('selector') === 'conversations' ?
          '//tr/td[child::div/text()[last()][starts-with(., " (")]]/preceding-sibling::td//input[@type="checkbox"]' :
          '//tr/td[child::div/div/div/span/text()[starts-with(., "re:") or starts-with(., "Re:") or starts-with(., "RE:")]]/preceding-sibling::td//input[@type="checkbox"]'
        var checkboxes = win.document.evaluate(xp, tl.getElementsByTagName('table')[0], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var chlen = checkboxes.snapshotLength;
        if (!chlen) return;
        var scrol = win.pageYOffset;
        win.document.body.style.position = 'fixed';
        for (var i = 0; i < chlen; i++) {
          checkboxes.snapshotItem(i).click();
        }
        win.document.body.style.position = '';
        win.scroll(0,scrol);
      }
      gmail.registerViewChangeCallback(addLinks);
      addLinks();
    });
  }
  else selectConversations();
}, false);

var sCtimer;
function selectConversations() {
  if (unsafeWindow.gmonkey) {
    window.clearTimeout(sCtimer);
    return;
  }
  sCtimer = window.setTimeout(selectConversations,4000);
  if (document.getElementById('ConversationsTop')) return;
  var tbcsdivs = xpath('//div[@class="tbcs"]');
  var s = document.createElement('span');
  s.setAttribute('class','l');
  var items = ['Conversations','Replies'];
  for (var i = 0; i < tbcsdivs.snapshotLength; i++) {
    var where = i == 0 ? 'Top' : 'Bottom';
    var tbcs = tbcsdivs.snapshotItem(i);
    items.forEach(function(item) {
      tbcs.appendChild(document.createTextNode(', '));
      var el = s.cloneNode(true);
      el.appendChild(document.createTextNode(item));
      el.id = item + where;
      tbcs.appendChild(el);
      el.addEventListener('click', findMatches, true);
    });
  }
}

function findMatches() {
  var fL = this.id.charAt(0), cellindex, regex, matches = false, cells;
  if (fL === 'C') {
    cellindex = '3';
    regex = /\(\d+\)/;
  }
  else if (fL === 'R') {
    cellindex = '5';
    regex = /re:/i
  }
  else return;
  cells = xpath('//table[@id="tb"]//tr/td['+cellindex+']');
  for (var i = 0; i < cells.snapshotLength; i++) {
    var cell = cells.snapshotItem(i);
    if (cell.innerHTML.match(regex)) {
      var checkbox = cell.parentNode.firstChild.firstChild;
      if (!checkbox.checked) checkbox.checked = true;
      cell.parentNode.className += ' sr';
      matches = true;
    }
  }
  if (matches) updateSelectBox();
}

function updateSelectBox() {
  var sels = xpath('//select[@id="tam"]|//select[@id="bam"]');
  for (var i = 0; i < sels.snapshotLength; i++) {
    var sel = sels.snapshotItem(i);
    for (var j = 0; j < sel.options.length; j++) {
      sel.options[j].disabled = false;
    }
  }
}

function xpath(expr) {
  return document.evaluate(expr,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}