// ==UserScript==
// @name        lastfm2soundcloud linker
// @namespace   http://d.hatena.ne.jp/bannyan/
// @description Search Soundcloud from Last.fm
// @include     http://*.last*fm*/music/*
// @include     http://*.last*fm*/user/*
// @include     http://*.last*fm*/home/*
// ==/UserScript==

// TODO FIX
// 1, refactor those codes.
// 2, should speed up. avoid using img.src.
// 3, it's much dependent on HTML implementation, isn't it possible to get element more elegant by XPath?

const SOUNDCLOUD_IMAGE      = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAKCAYAAABWiWWfAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAACV0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVggMjAwNId2rM8AAAHHSURBVHicjZC/a1NRGIafc+6tsZaa+rOLGnHS0AqKpSAoZLAF6eKawUWqs5tOFXHTVSR/g4IgShcHBSkuGmurIhYLFW1iIr3Jvbm/cs/5HCK0tiJ95o/3e95XiQjbwAUmgRFgFnj/ryO1jbCC1OYq2edHkxI10ftOePp4+YEeLNwG4s0ft2AxZVmdn9LDJ2P59mq8OztdtKtL4ILRDDnfF272le4cUPlj0/81k9bKjFl8eMsuv0QpB9P8Aj8/ws48KA1ZCmmGe+FGzS3NXAJebzbLEa6ds2lQsu8eX7XzT8B2sX4DQg/sEKQGEMCBKMC8eXpQ7T9dUUdOLer8ofvAnBIRx/rNu1J9dt2uVKFVh44H3RhpN5DOL0hjEAuojR0QEdSeo7iX79X16MSEGybRWK76/Jq8fYEyBkkNJE5vWh9oA90/UuvrgFiUZPBpATtQGbaHR8fdJIl25Wp1Q6xhRz9EMUQGYgOBhUAgEfhrW+kF9vUjSYT8aGBaa8Zl915RxbPC8lfEa/eMQoFIoG3BM5BkW2sqBWmISsC5eAVbKIorQQc1MoYaGESWPiBpCkkEWQaBj3hN6Pjr9TYSeOgz59FTZVKL+g1K5eysS2oHxgAAAABJRU5ErkJggg==";
const SOUNDCLOUD_SEARCH_URL = "http://soundcloud.com/search?q[fulltext]=";

var ignoreLinks = [
  "+tag",
  "+wiki",
  "+events"
];

var links = document.evaluate(
  '//div[not(@id)]//a[not(@class)][not(@title)][starts-with(string(@href), "/music/")]',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);

for (var i = 0; i < links.snapshotLength; i++) {
  var element, paths, tail, previousTail;
  element = (links.snapshotItem(i));
  if (element.href === window.location.href) continue;
  if (element.firstChild.tagName === "IMG")  continue;
  paths        = element.href.split('/');
  tail         = paths[paths.length - 1];
  previousTail = paths[paths.length - 2];
  if (/^\+/.test(tail)) continue;
  if (contains(ignoreLinks, previousTail)) continue;

  var img  = document.createElement('img');
  img.src  = SOUNDCLOUD_IMAGE;
  var a    = document.createElement('a');
  a.href   = SOUNDCLOUD_SEARCH_URL + tail;
  a.target = '_blank';
  a.style.margin = "0 1px";
  a.appendChild(img);
  insertAfter(a, element);
}

// ----[Utility]-------------------------------------------------

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

function contains(array, obj) {
  var i = array.length;
  while (i--) {
    if (array[i] === obj) {
      return true;
    }
  }
  return false;
}