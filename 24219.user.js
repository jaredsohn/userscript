// ==UserScript==
// @name                TCExpressBust
// @version             20070718.2
// @author              hexkid
// @description         Add Express Bust in jail, faction members, and profiles
// @namespace           http://hexkid.info/GM/
// @include             http://torncity.com/*
// @include             http://www.torncity.com/*
// @include             http://torn.com/*
// @include             http://www.torn.com/*
// ==/UserScript==

// TCbasic

// add express bust in jail or member list for faction
if (document.location.href.match(/\/(jailview\.php|factions\.php\?step=your&action=members)$/)) {
  var LINKs = document.getElementsByTagName('a');
  for (var i=0; i<LINKs.length; ++i) {
    if (LINKs[i].hasAttribute('href')) {
      // add bust link
      if (LINKs[i].getAttribute('href').match(/^jail1\.php\?XID=\d+&action=breakout$/)) {
        var xid = LINKs[i].getAttribute('href').match(/^jail1\.php\?XID=(\d+)&action=breakout$/)[1];
        var expressBust = document.createElement('a');
        expressBust.setAttribute('href', 'jail1.php?XID=' + xid + '&action=breakout1');
        expressBust.innerHTML = 'Express';
        LINKs[i].parentNode.insertBefore(expressBust, LINKs[i].nextSibling);
        var separator1 = document.createElement('span');
        separator1.innerHTML = '&nbsp;|&nbsp;';
        LINKs[i].parentNode.insertBefore(separator1, LINKs[i].nextSibling);
        if (document.location.href.match(/\/factions/)) {
      // add buy link
          var expressBuy = document.createElement('a');
          expressBuy.setAttribute('href', 'jail1.php?XID=' + xid + '&action=buy');
          expressBuy.innerHTML = 'Buy';
          LINKs[i].parentNode.insertBefore(expressBuy, LINKs[i]);
          // KLUDGE: just added another link to the document.
          // i is now wrong
          ++i;
          // i corrected :)
          var separator2 = document.createElement('span');
          separator2.innerHTML = '&nbsp;|&nbsp;';
          LINKs[i].parentNode.insertBefore(separator2, LINKs[i]);
        }
      }
    }
  }
}

// add buy, bust and express bust in profiles
if (document.location.href.match(/\/profiles\.php\?(action=send&)?XID=\d+&?$/)) {
  var xid = document.location.href.match(/\/profiles\.php\?(?:action=send&)?XID=(\d+)&?$/)[1];
  if (xid) {
    var FONTs = document.getElementsByTagName('font');
    for (var i=0; i<FONTs.length; ++i) {
      if (FONTs[i].innerHTML.match(/^In jail for (\d+ hrs )?\d+ mins <br>/)) {
        var newBustLink = document.createElement('p');
        newBustLink.style.marginLeft = '48px';
        newBustLink.innerHTML = '[<a href="jail1.php?XID=' + xid + '&action=buy" style="color: brown">Buy</a>] '
              + '[<a href="jail1.php?XID=' + xid + '&action=breakout" style="color: brown">Bust</a> | '
              + '<a href="jail1.php?XID=' + xid + '&action=breakout1" style="color: brown">Express</a>]';
        FONTs[i].parentNode.insertBefore(newBustLink, FONTs[i]);