// ==UserScript==
// @name           Chipmark.com Favicon
// @namespace      https://www.chipmark.com/Main
// @description    Replace the ugly .ico with a nifty .png icon.
// @include        https://www.chipmark.com/*
// @include        http://www.chipmark.com:8082/*
// ==/UserScript==

(function() {
  var link, head;

  link = document.createElement('link');
  link.setAttribute('rel', 'shortcut icon');
  link.setAttribute('href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMFSURBVHjaYowwF2UAAgEgjv3///8zRkbGqwz//0cyMDF6MzIwKgLF/wLFHwHpo0C8AoiPMyABgABigdKGQDyJhYX1399/f16zsnGIMzEzMwANAJr1j+Hvn9+if//+NQYalARUlwXEi2EGAAQQE5R++Z+B4QlQExMLC5s4IyMDAzsHFwMrGxsDCysQs7EzMLOwMgBdxwNU2wbEEjADAAIIZIAUEC8FKpb5zwA0BohZ2TmAGljAmsA0MwQzMTGBXCQFdIkXzACAAAJ5IY2RickApICVlR1oIytYIwMjUDET0MA/v8A0E9NfoBgDA9CFQHMYe379+nUO6KILAAEEcoEfEyPItzAAYQENBTkZjEE2//v/n+H3r98M8gpKDCpqWoJA184EukQQIIBABmiCnA5xPIz8x/D/719wAILM+/37F8PP798YZOUUGYTFJBn4BQQZJKVkzf79+5sMEEAs4Gj6B9Ty7y/DP6Cmv0x/wEYwMgI1A239/u0Lw++fPxkUFJUZhEXEGP4CDfsPjCExCSmGN69fpgAEEMiAM0Cn2P/58wfugf///oEN/PnjOwMbMEwUlVQZePn4gS75DfYSCLACw4mVlU0ZIIBABkwBYnuQk/8AbQRr/vsP6G9GBgF+AQYhoK2gQP358wc4XJiZmMGGQNT9/QgQQKAwWAPE2UD8AuRkUDBwcXExiIqJM/Dw8jP8Adr669cPYGL6wwBMTBCvAjV/B4YJMGzOAgQQLCVOA+IbQLyRg5ODhw0YnX9+A8Pi/3dgtAGj9S9QGRAxAwMV5EpQnH3+/Alk6CmAAGJCStb7gGFR+O3r178g038CAw4Y12AMigUQRrB/M3z88O4X0C87AQKIhQEVzAE6j/3Hj+99QOeysf1jAzv3H8tfBpb/f4H+ZwH7/+uPTwzfvn09C0wfZwACiIkBE0wFusT916+fR4Eu+f/92zdwbIBdBEoPwMB8+/YNKI1MAqr9ARBALAzYwQEgdga6wgmIvYGBaMrIyMQLxKB4YgSG/l4gey1IIUCAAQA1CVRv5pIKlwAAAABJRU5ErkJggg==');

  head = document.getElementsByTagName('head')[0];
  if(!head) return;
  head.appendChild(link);
})();