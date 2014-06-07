// ==UserScript==
// @name           imdb runtimes in hours and minutes
// @namespace      znerp
// @description    Converts the runtime for films on IMDB from minutes into hours and minutes.
// @include        http://*.imdb.tld/title/*/
// @include        http://*.imdb.tld/title/*/#*
// @include        http://*.imdb.tld/title/*/maindetails*
// @include        http://*.imdb.tld/title/*/combined*
// ==/UserScript==

infos = document.evaluate("//div[@id='tn15content']/div[@class='info']",
                          document,
                          null,
                          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                          null)

for (i = infos.snapshotLength - 1; i >= 0; i--) {
  if (/\d+ min/.test((time = infos.snapshotItem(i)).innerHTML)) {
    time.innerHTML = time.innerHTML.replace(/(\d+) min/g, hourize);
    break;
  }
}
     
function hourize(str, p1, offset, s) {
  minutes = parseInt(p1)
  hours = Math.floor(p1 / 60);
  minutes = p1 % 60;
  return (hours > 0 ? hours + pl(hours, " hour") + ", " : "") + minutes + pl(minutes, " minute");
}

function pl(num, str) {
  return (num == 1 ? str : str + "s")
}