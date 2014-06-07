// ==UserScript==
// @name           poczta o2 autologowanie
// @description    umożliwia zapamiętywanie haseł przez przeglądarkę
// @include        http://poczta*.o2.pl/*
// @include        https://poczta*.o2.pl/*
// ==/UserScript==

var ac = document.evaluate("//*[@autocomplete='off']", document, null, 7, null);
for (var i = 0; i < ac.snapshotLength; i++) {
    ac.snapshotItem(i).setAttribute('autocomplete', 'on');
}
