// ==UserScript==
// @name           ModelMayhem Rich Edit
// @namespace      http://www.modelmayhem.com/member.php?id=335290
// @description    Adds a simple rich edit interface to the forums on ModelMayhem.com
// @version        11/13/2007

// @include        http://modelmayhem.com/convo.php*
// @include        http://modelmayhem.com/convo_start.php*
// @include        http://modelmayhem.com/edit.php*
// @include        http://modelmayhem.com/edit_post.php*
// @include        http://modelmayhem.com/new_thread.php*
// @include        http://modelmayhem.com/post_reply.php*
// @include        http://www.modelmayhem.com/convo.php*
// @include        http://www.modelmayhem.com/convo_start.php*
// @include        http://www.modelmayhem.com/edit.php*
// @include        http://www.modelmayhem.com/edit_post.php*
// @include        http://www.modelmayhem.com/new_thread.php*
// @include        http://www.modelmayhem.com/post_reply.php*

// @exclude        http://modelmayhem.com/shoutbox.php*

// ==/UserScript==

var boldimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI'+
    'WXMAAArwAAAK8AFCrDSYAAABQUlEQVR42sXTsU4CQRAG4OEwIVTeA1BcR3s+AAkvcKhvcD6B0tEZ'+
    'OkpNqKiwpyCho9GWSgoegIqSbEi42X92YG2AnAVgxMTpdrL75c9spuC9p0squOj1XwBX+UOr1UqJ'+
    '6HGz2cSqapxzLyISO+fqAIYi0hwMBuZogk6n01fV4Xq9JhGZdrvddq/Xu7fWDp1zKTO/n0xARCQi'+
    'pKq03W4PPWaee++JmeMfAXuEiKjRaIQA0h3UPwsA2CNRkiTPAO6899FqtfqYTCYPZ3/BWksiQsw8'+
    'H41G7fF4fGOM6QdBUK9Wq59RFIUnAWbeA/lec7lcUqlUiq216VkAwDdgNpuZLMtIVQnA9ckZMDMV'+
    'i0Vi5kPUSqXyVC6XabFYGOfcW/5+Ib8LtVottdbeAggBEIDpbqCxiExV9TXLsvlR4Df1/8v0Bf7+'+
    '5A+7eIHJAAAALnpUWHRTb2Z0d2FyZQAAeNrzTUwuys9NTclMVHDLLEotzy/KLlbwjVAwMjAwAQCW'+
    'Lgl6ZrFa0gAAAABJRU5ErkJggg==';

var italicimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI'+
    'WXMAAArwAAAK8AFCrDSYAAAA1ElEQVR42sWTPQ6CQBBGF2OvN/AKNoSWnoYLELCn8AgexQMQwg0s'+
    'OIB2tFbUEhLmLzA2FsbIKmritDP7Ju+brKOq5puaffX6F4C5rZmm6Y6ZtyKyIKKGmU9Zlvn3M86r'+
    'DOI4PovIChE3eZ7vH/tWQBRFaxE5ImJTFMVysgIiJsMwGAAoPsoAEcO+762AUYUgCNYicgSApizL'+
    '5Rhg9IwAkKiq6bpudLtVAQDCm4YV8FTB8zxfVQ9t25qqqpxJANd1d0TkE5EhIsPMl7quw8khvlv/'+
    '/0xXuS6HScPiQ4wAAAAuelRYdFNvZnR3YXJlAAB42vNNTC7Kz01NyUxUcMssSi3PL8ouVvCNUDAy'+
    'MDABAJYuCXpmsVrSAAAAAElFTkSuQmCC';

var ulimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI'+
    'WXMAAArwAAAK8AFCrDSYAAABBklEQVR42q2TMW6DQBBFP1YO4CNQQEdFQ2txAktUdBE3sIQEnXs3'+
    'to+QhoYiR/ARwj1oKJB2ZnbFpkksB1CEQ0baYv/OvP2zmnWstVgTm1XVAF4eN2VZvgI4A9gOw3A5'+
    'nU6H77Msy95FZM/Mh7quL/cia+2PVRTFLc9zO9bTNN0mSfIx1ictGGMgIhOrVVV1Sqnu1xYAQESg'+
    'tZ7tVymFRYA5B4sBzAxm/juAiJ4CbGaSGhFBHMf7R933/R0RNUsA177vO6XUMQxDFwA8z9sR0ZmI'+
    'ruN8Z26UoyhymfnIzC4zQ0QaZn5r27ZZBHgmJo8YBIH9uhXMDK31fTaMMTDGOP/qYPVv/AQi9ccC'+
    'ZQhvRwAAAC56VFh0U29mdHdhcmUAAHja801MLsrPTU3JTFRwyyxKLc8vyi5W8I1QMDIwMAEAli4J'+
    'emaxWtIAAAAASUVORK5CYII=';

var csimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI'+
    'WXMAAAsRAAALEQF/ZF+RAAABQUlEQVR42q2TLY/CQBCGn7kcugIwoGoItgmqBkGCARz/AYfkB+Ax'+
    'GEITUCRoBP8B0wSBWEcFBkezSUmKmFN3Ob6T671udmefyTs7I6pKFn1kev0fgM9nF8YY3e12XC4X'+
    'rLWUSiWsteRyObrdrrwEBEGgx+ORRqOB7/uy3+91sVhwOByoVCqvLQRBoFEU4Xkevu8LgOu60u/3'+
    'AUiS5LmFMAw1iiLSNMXzvKtEx3Gk0+motfYlgDRNsdZSLpeFG7Xb7bszUVV6vd6fhmE6nYr8HqTR'+
    'aKTb7RaA4XCI67ryDnLVxFqtRpIknE4nNpvNXXIcx7pcLjWOY30IqNfrUigUOJ/PTCYTjDFX1sbj'+
    'MbPZ7L4Ht1UGgwFhGALQbDbJ5/OsViuKxSLz+RzHceQp4FvGGF2v1z9xq9WiWq0+/oUsyrxMXz4B'+
    'k8Vq4S2bAAAALnpUWHRTb2Z0d2FyZQAAeNrzTUwuys9NTclMVHDLLEotzy/KLlbwjVAwMjAwAQCW'+
    'Lgl6ZrFa0gAAAB96VFh0Q3JlYXRpb24gVGltZQAAeNozsNA3NNQ3MAMABwYBjwdCz1cAAAAASUVO'+
    'RK5CYII=';

var leftimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI'+
    'WXMAAArwAAAK8AFCrDSYAAAAkUlEQVQ4y7WTwQlDIRBE15C2rMAKLMC7N3sTrEOwCsGTo7g5RRJJ'+
    '/kW/MOhl982OrGBm2jmPreoTDZ7vh3OOxxjUe59qrU0BmDcACiEIIiKxm8F0YK3llfpJBEDee7E2'+
    'OOfAGMP/5v2llNLhDLTWfEUEQDHGGzNQSl06WH+nlHI4Aykl11q/iCs553w+g+1legEHS9gRX8xi'+
    'jgAAAC56VFh0U29mdHdhcmUAAHja801MLsrPTU3JTFRwyyxKLc8vyi5W8I1QMDIwMAEAli4Jemax'+
    'WtIAAAAASUVORK5CYII=';

var centerimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI'+
    'WXMAAArwAAAK8AFCrDSYAAAAnUlEQVR42rWTuw3EIAyGzSkzsQQlM1CFnkVy49AyBCUr0CAbwTUB'+
    'oeiShoD0y6bw6zOwWivMnM9U9BsJtuYYY2opBXLOXUTUhYjdIiJYaxkAAJtlsI0XrfVORMe18kXa'+
    'OfdtMe91oJSqd/P+k/d+AQMp5Y6Ix13VsysdQljAQAhRn2YeN0NEEGNcwIBz3hmM22g6X6hOKb3H'+
    'YPoz/QB51uQR5toapgAAAC56VFh0U29mdHdhcmUAAHja801MLsrPTU3JTFRwyyxKLc8vyi5W8I1Q'+
    'MDIwMAEAli4JemaxWtIAAAAASUVORK5CYII=';

var rightimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI'+
    'WXMAAArwAAAK8AFCrDSYAAAAjklEQVQ4y7WTwQkFIQxE47LV2IgHuxCswerswApswAK8JcH800oO'+
    '/r3oCg+DoJkZohER2FnX1u0TD9xPkVKSMQYw84SIJog4d0SEnLMBADC7GdyrwxCC6M4rSimHFcQY'+
    '5Z/fFbXWDzNwzsmqq1bXWjuswHsvb571TBAR9N4/zMBaK9rvg55SZj6jYPsz/QACJ9gRFetctwAA'+
    'AC56VFh0U29mdHdhcmUAAHja801MLsrPTU3JTFRwyyxKLc8vyi5W8I1QMDIwMAEAli4JemaxWtIA'+
    'AAAASUVORK5CYII=';

var linkimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAZiS0dE'+
    'AP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAA09JREFUeNpNk81PHHUAhp+Z2WV2YT/Y'+
    '8lVZF0xpClWkSqhtwmKCUoVQY5pUwagx4eTF8B948oIXjYlejErSxGq91INiIFgMxRQDpjRCEVAK'+
    'ZXe7bNldFmZ2Pn4z40FteM9PnryXR/I8j6MbnRvpAd4DzgJ1gA/YB+Y91/vsk56vfjrKS/8LRudG'+
    'fMA4cPmVRJ8aC9ZR0qvQLRCOgSDLdGZCOMKZEsJ5/YuBbw4fCUbnRvzAja7ap7pfSvRSMlRMLDZK'+
    'EhWeyp7u4gmLIDoZc5aF9MIdYYvnv37t+r7835PxzppT3cnGLvKOhS1LCCFTFhXoVJA3VXaNIDv7'+
    'fppCz9F1vLXDMu2rAErhwnYS+PDNUxeVPxyNDGXKruDQCJE3/ZQMWE8dsK9pqLE9pOg652vbmF75'+
    '7cSV+fEl5dzIsx+93HiuXVKCZGQBXj2POSEWswplQ2YldYgbKKA2/4kZWSfnFvAVHNprEvLivdVj'+
    'PuBsIhLntp4mF5B5UmnBRbC1a2EYZaLHPUrHJtlwi2B6VAuV9ZxJ3xOd2KZ42gfUVPqq2NLT7Jo6'+
    '4coTFK0whYJLtM6gPqaTc56hZC6hegccPNwjX6wkFAxjW6La53meJHlgmSU8Evj8DhO3bKRgiMyG'+
    'QPYiNNaVCR/0UErZGCxgW5vgeQghJJ8j3HzJKsVrlGrCgTNspVykrVVaeMjj9TWs3sxwhzZsWXDG'+
    'XaatqYV0NsD87F1c0yv5hC1+v5ffjp+sTDCVmkX79ZDOYJyhobfRNI2WnR18s/NoNrwzfJlAhZ9M'+
    'JsPi4iLRTMxUOoZO7y3vbr4xeDIp35iaJrYb4uKrl3j/48+5fvUKm5t/09IUx9zP8fP0NNe+u0ZB'+
    'z9Dbc4HCdtEvfzn47aRl2j9OrvxCeC9INBwFoPr8ALphMjw8TDKZZGBggP7+fgyzjNJq/MtEq2Uf'+
    'gG3ab82s375ZS6SDXBYA/db3SJ7L2NgYVVVVAGiahufC0sR9ffBdKlOplPEopv5PXwjrKeOHyF+x'+
    '5IvdfVI8nsAvK2SzWdbW1lBVlebmZhoaGrCFXdy5v8PMzMwD6WjOra2tSn1v7WjoQeSDxvrGgFqh'+
    'ShISd6XloqM4m+2i47SEhGmaTjqdzmmadukf+rikqtXp4HYAAAAielRYdFNvZnR3YXJlAAB42nNM'+
    'yU9KVfDMTUxPDUpNTKkEAC+cBdSuDKlNAAAAAElFTkSuQmCC';

var imgimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI'+
    'WXMAAArwAAAK8AFCrDSYAAAB8UlEQVR42qWTPWtUQRSGnzP33r33Zhd2IRvDRqIkAcEiiKmM/gEL'+
    'CxurpLCQ9AEbf4S/QUxnoZWFWBj/QUCwCISIoOaLfGw2m+zcnTljEbNmN0GEDNPNOc855533SAiB'+
    'q5wYYOn9yktVmTsuNLPukqiBGkkMWcKrZ49nFmMADTL/6MH4SJZlIhL9s2JHwbsu7z6tPQVOAcdW'+
    '0zTNZOnzPh12ackqE6Pb5EkTF5S9w5yva1WGwm1ihnn+ZAKvIr0RCgfGRBiBwmwyUd8mLX2naVs4'+
    '74jTlMnxBt/Wy9RKdVQHNABQwBjBhh1KyT4HJ02s71A4hwtt0jSlbXOGc0Mg9ITpB4gQnGJ9l46z'+
    'nHQthTq8AtIlqCc2wvmfMz2hwykgY4RWu0wgwarHOo9IiXarQqU0RhQZCHJxhBBOR6hE1/m5uUU1'+
    '22CobEjFcbQ3xNZmg0Z1ktj8Te4BwnlAco2x/C4/VpapVX4h3pN0RrgxNU8la+BV+2zR18Hq7gJe'+
    'Fa/KLbvD7PhNFFjf2OLD0Qv0UFFV4ONAByEgwMOZxd5DNH3AcXuXbOML9fsLzEVJnzPPdIwB5BK/'+
    '+ryGz2vY+tQlfhwQMUukiXard0bvgcgfVDi7F5KdK4gjCT1AKZY3b5fXZwsfpv9nOeMIEsNrALnq'+
    'Ov8GBm/ak/c4FDIAAAAuelRYdFNvZnR3YXJlAAB42vNNTC7Kz01NyUxUcMssSi3PL8ouVvCNUDAy'+
    'MDABAJYuCXpmsVrSAAAAAElFTkSuQmCC';

 var fontimg = 'data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEAZABkAAD%2F4QBmRXhpZgAASUkqAAgAAAAEABoBBQABAAAAPgAAABsBBQABAAAARgAAACgBAwABAAAAAgAPEjEBAgAQAAAATgAAAAAAAABkAAAAAQAAAGQAAAABAAAAUGFpbnQuTkVUIHYzLjEwAP%2FbAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf%2FbAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf%2FAABEIABAAEAMBIgACEQEDEQH%2FxAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv%2FxAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5%2Bjp6vHy8%2FT19vf4%2Bfr%2FxAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv%2FxAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4%2BTl5ufo6ery8%2FT19vf4%2Bfr%2F2gAMAwEAAhEDEQA%2FAP6p%2Fj74Y%2BJFl48%2BF2u6Z8d%2FE%2FhTw98Xf2lNR%2BFF54a0TwX8J9SbQtBt9K%2BN%2Bvajq0eveO%2FAnjPVrzWLnUPBOgWmniSaDRtJ0VLiwi0maWSC8t%2B8%2BF%2F7XnwN%2BFvxf8LfsX%2FEX4xWOt%2FtF6%2F4c0LxLp1udHj0WLxbYRaJ4Z8Iap4tg0jT5p9N8LweKfiDp%2BvzWug2uy1try6u%2FsgaxhmulX9tL4F67deA7f4geA4vEvxB8eeCvHkHif4eeCde8bw%2BCfh14Z8R%2BM9ffT9X8aa7feF9M0TxNd6T4RtPEOs67cQSa%2Fe6vcaOureG9Jdl164s7v5x%2BCPwu1v9oL4n2fjXxL8CIvBF%2FwDD3xfbaHc%2FGDxDpFkdZ8SeEvDGsWHiG4s%2FAmttNca3H4d8W%2BILaRYdJmu5fsFk51e%2FlN80EL%2Fn%2Fil4uY7JsdwrwVwlwhnnE%2FEWYYjAvG1MFgMmy%2FKcFl%2BMxuLw9LH43Mq9SGNrYTLIqlUziVDCSn9UpVHSxn1lOUe3hDgrD03iOJOI82wODyrMa%2Bc5flWCo5zicdncMdlGW5LjMZisXlKhXw%2BWZbiVmEllNbF18Kszx8cRgctpV5YTF0qX%2F9k%3D';

unsafeWindow.tagIt = function (tagOpen,tagClose,i) {

  var ta = unsafeWindow.textArray[i];
  var st = ta.scrollTop;

  if (ta.selectionStart | ta.selectionStart == 0) {
    // work around Mozilla Bug #190382
    if (ta.selectionEnd > ta.value.length) { ta.selectionEnd = ta.value.length; }

    // decide where to add it and then add it
    var firstPos = ta.selectionStart;
    var secondPos = ta.selectionEnd+tagOpen.length;

    ta.value=ta.value.slice(0,firstPos)+tagOpen+ta.value.slice(firstPos);
    ta.value=ta.value.slice(0,secondPos)+tagClose+ta.value.slice(secondPos);

    // reset selection & focus... after the first tag and before the second
    ta.selectionStart = firstPos+tagOpen.length;
    ta.selectionEnd = secondPos;

    //ta.focus();

    ta.scrollTop=st;

  }

}

unsafeWindow.linkIt = function (i) {
  var myLink = prompt("Enter URL:","http://");
  var name = prompt("Enter the name of the website:");

  if (myLink != null) {
    unsafeWindow.tagIt('[url=' +myLink+ ']','' +name+ '[/url]', i);
  }

}

unsafeWindow.linkImg = function (i) {
  var myImg = prompt("Enter Image URL:","http://");
  if (myImg != null) {
    unsafeWindow.tagIt('[img]' +myImg+ '[/img]','', i);
  }

}

textareas = document.evaluate("//textarea",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
unsafeWindow.textArray = new Array();unsafeWindow.textArray = new Array();

for (i=0; i<textareas.snapshotLength; i++) {

  if (!textareas.snapshotItem(i).getAttribute('style') || textareas.snapshotItem(i).getAttribute('style').indexOf("display: none") == -1){
    unsafeWindow.textArray[i] = textareas.snapshotItem(i);
    var accessBar = document.createElement("div");

    accessBar.setAttribute('style','');
    accessBar.innerHTML =
      "<a href=\"javascript:tagIt('[b]','[/b]',"+ i +")\" title=Bold><img src="+boldimg+" border=0></a> " +
      "<a href=\"javascript:tagIt('[i]','[/i]',"+ i +")\" title=Italic><img src="+italicimg+" border=0></a> " +
      "<a href=\"javascript:tagIt('[s]','[/s]',"+ i +")\" title=Crossout><img src="+csimg+" border=0></a> " +
      "<a href=\"javascript:linkIt("+i+")\" title=Link><img src="+linkimg+" border=0></a> " +
      "<a href=\"javascript:linkImg("+i+")\" title=Image><img src="+imgimg+" border=0></a>"; +
    unsafeWindow.textArray[i].parentNode.insertBefore(accessBar, unsafeWindow.textArray[i]);
  }

}