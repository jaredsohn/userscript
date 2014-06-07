// ==UserScript==
// @name           FetLife Markup Toolbar
// @namespace      http://userscripts.org/users/58147 (original author)
// @version        2010/2/10
// @description    Posting markup (bold, italic, link, etc) toolbar for FetLife.com
// @include        http://fetlife.com/*
// ==/UserScript==

// based on http://userscripts.org/scripts/review/11509
// updated from http://userscripts.org/scripts/show/31527 by http://userscripts.org/users/58147


//base64 encoding thanks to http://www.abluestar.com/utilities/encode_base64/index.php
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

var font1img = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAAZQTFRFAKDZ'+
    'AAAAjhzQSgAAAAF0Uk5TAEDm2GYAAAAYSURBVAjXY2BgYJD%2FAUIyDAiEKQJBDAwApTYFdWTWcj'+
    'wAAAAASUVORK5CYII%3D';

var font2img = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAAZQTFRFAEiI'+
    '%2FwAAW5EAfgAAAAF0Uk5TAEDm2GYAAAAXSURBVAjXY2AAA%2F4PIMTDAEVoXAgCAwCDuARd1MfJ'+
    'sAAAAABJRU5ErkJggg%3D%3D';

var font3img = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAAZQTFRFALAL'+
    '%2FwAA3DkCNwAAAAF0Uk5TAEDm2GYAAAAXSURBVAjXY2CAAf4HDDwMUITMhiAYAABCrAI%2Fp6R0'+
    'DgAAAABJRU5ErkJggg%3D%3D';

var font4img = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAAZQTFRFAGj2'+
    'QEBAWRdPbQAAAAF0Uk5TAEDm2GYAAAAXSURBVAjXY2BAAuwPGNgYQAjOgCAkAAA4pQHzXYRYSwAA'+
    'AABJRU5ErkJggg%3D%3D';

var font5img = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAAZQTFRFAOhj'+
    'AAAAlFBtPAAAAAF0Uk5TAEDm2GYAAAAUSURBVAjXY2BABcwHGJhgJAShAgArkAGP58IOdgAAAABJ'+
    'RU5ErkJggg%3D%3D';
  
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
  
var quoteimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAADBQTFRFbWlH'+
    'MU2qLFKORV%2BYPmesUni0ZYCzWIfLd4%2BscpbOhpbCgqXakKfFo7fSn7vftMbdPkbvhwAAAAF0'+
    'Uk5TAEDm2GYAAABISURBVAjXY2DABzgLGLjrQIzpQPQBKhAPErh6gYF1AoixZAHDlXwQI8Wl4YiL'+
    'A5CRpGhwycgeyGBSMmBSUgDJZTAwLGMgCgAAgHYO0cBycn4AAAAASUVORK5CYII%3D';
  
var listimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAABVQTFRFAAAZ'+
    'AAAAHUKEX2%2BPWITfeY6up7PGkEI01wAAAAF0Uk5TAEDm2GYAAAAiSURBVAjXY2CAAbYwKIPViU'+
    'EQCIAiqgy4AGmKzaAMZsKKAfsoAxUBHAszAAAAAElFTkSuQmCC';
  
var brimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAABVQTFRFAABh'+
    'AAAAGRURPDw%2Fg4OGk4iImZmHx%2BoA6wAAAAF0Uk5TAEDm2GYAAAAySURBVAjXY2DAApIFBQUF'+
    'gDSboKCDCEiAWVCQASTAwARjwEVYYQyGYEUog4GRFAYqAAABdwLRauVs%2FQAAAABJRU5ErkJggg'+
    '%3D%3D';

var symimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAAAXNSR0IArs4c6QAAAMxJREFUKM%'+
    '2BN0TFKA1EUheEPVCzzAja2QowrcAPaCBZuZDIW7kCw1h24gMAUVqZJJy5AN6DFYGEzDyzCwLPIZJ'+
    'yZInhec7j%2FD5fLY52pcdsODDL2IvlxZc9CspL1hXtJkny7aVrtqCs8N%2BMktu1U%2BhMe2vHmL'+
    'buYE6ttGK63Y3js4FuVSuG4K%2Bx7bXAhFwS5L9OucmguuZM786b2KVf01yREQenSLoJqiIlGShd2'+
    'MBKHmCeZc%2B9qH7LhivVXlWaCYKbs37HJRCGKChP%2FyS%2Fp9V%2FWa86rmgAAAABJRU5ErkJgg'+
    'g%3D%3D';

var hrimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/'+
    'wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMGQMxGbF0A3gAAAAZdEVYdENvbW'+
    '1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAASklEQVQ4y+3RoQ2AMABE0VeC6gAswAQ4XCdlrw6'+
    'AxhJUMRXVYAjpN9/cJZccnR8QqsvT/vB2wVg940LEjgVHk8tIWLFhwtkP/Ao3Ze8HKtIZ8eMAAAAA'+
    'SUVORK5CYII=';

var preimg = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/'+
    'wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMGBcBGlSoCPgAAAAZdEVYdENvbW'+
    '1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAARklEQVQ4y2NgGAUUA0Yo/Z8MMWRxFIn/RIoxMDA'+
    'wMDBR6gUWAvL/0Z2Kw2sM/5EwNmcT5QVGNJsYsNhOshfweYug4SMFAAC6/BIF/nayhQAAAABJRU5E'+
    'rkJggg==';

var numlistimg ='data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/'+
    'wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kMGBcoDOQ6IkIAAAAZdEVYdENvbW'+
    '1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAwElEQVRYw+2XMQ7CMAxFX1BZ6EBvAIgbMHM0Js7'+
    'GEbpyCAZYQA1LkFLUFlttCBJ+UqYotSv/PLVgtPHResdNWMd9eqjv2SuBNVANNNrFLKwLcAaur41C'+
    '2fkKOAB74AE0wnNzYAGcwvk67iwr2UcwFMYsIUxd2Pg9NBlwitRL6nppwOIrWQJbYBkk1Iy9hloTb'+
    'oBjMOENuI81YSHwgMuRgb6ik4+g6813Sm0nN6HZ0ExoJvwvE359BNKfFfsmNJLxBPMIRDAn1yK4AA'+
    'AAAElFTkSuQmCC';

var delimg ='data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U'+
    '29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFUSURBVHjaYvz//z8DJQAggJgYKAQAAUSxAQ'+
    'ABxIJNsLS0VPDPnz8dv3//Pvvr1y9BIK308+dPpWXLlrmiqwUIIKwuAGq6C8T3pkyZMgsIOn/8+HE'+
    'PiF2wqQUIIAwD8vLy0oCKBYE2CsLEli9f3vn9+/c92AwACCAmLLbfA2IGoCHloaGhM/38/IxB4kAD'+
    'OrEZABBAjNiiMSoqajcwDFyAGKSR4evXr2eBLqo4efIkhisAAghsQEVFRSmQ3YUu+eLFC4a7d+8y3'+
    'LlzB8xGD2ug3h6AAGIAGYCM/f39BZH5RkZGadra2neB9H85Obkz6OoBAgjDADc3tzR7e/tydHEZGZ'+
    'n/YmJid9HFAQIIIxBBfgYGYIeBgYEgsjhQ7D0wHGahqwcIIBZsBgAVghTvVlBQWA2MkfegxATEsz5'+
    '9+oQREwABxEhpZgIIIIrzAkAAUWwAQIABAHTM7nglzqljAAAAAElFTkSuQmCC';

var ulimg ='data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/'+
    'wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oCCgY3KMszUpEAAAFTSURBVDjLxZ'+
    'NNSwJhFIWfd0ZHQRjTFpoLXeRSsPoBfbgJjGpR0TKC/kHtlX5K0SKCFoEgFK5EqHZtazmBUSmZtJg'+
    'Rb4vAZtQ+wKCzermc+/ByDleJiDCCNEaUBzAejRIKhTBNE6UUlUqFQqGAUgrTNNE0jVxuwUsQl0oX'+
    'VQmHxwSQ3b2iNBqvcntnycrqpgCSyUxLrXbjXhEPQEQkkUgIIOXyeW9WLO4LIPn8Ur9dvswgGPT33'+
    'oahA6Dr2u9DdJfzXU9/2wKA4zgA+HT906R92Dqdzs+AdHoSgPpTozd7br4AEI9PDAB8/YOt7R3q9Q'+
    'eOT05xbJtW+43Lq2uyUzMs5peHhuXR/WNLDg6PZH5uVlKplCSTSdlYX5OzUlmabXugRuW+BcuyAMH'+
    'vNzAMA6UUAN1uF9u2cWwbIxAgFov1PuABRCKRoUG5lc1mqVarwwH/co3vg1venBkwDmkAAAAASUVO'+
    'RK5CYII=';

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
    var cursorPos = secondPos+tagClose.length;

    ta.focus();
    ta.setSelectionRange(cursorPos,cursorPos); 

    ta.scrollTop=st;
  } 
}  

unsafeWindow.linkIt = function (i) {

  var ta = unsafeWindow.textArray[i];

  if (ta.selectionStart | ta.selectionStart == 0) {
    // work around Mozilla Bug #190382
    if (ta.selectionEnd > ta.value.length) { ta.selectionEnd = ta.value.length; }
    var firstPos = ta.selectionStart;
    var endPos = ta.selectionEnd;
    var selection = ta.value.slice(firstPos,endPos);
  }
  var linkText = prompt("Enter Link Text:",selection);
  if (selection.slice(0,4)=="http") {var myLink = prompt("Enter URL:",selection);}
  else if (selection.slice(0,4)=="www.") {var url = "http://" + selection; var myLink = prompt("Enter URL:",url);}
  else {var myLink = prompt("Enter URL:","http://");}
  var linkTitle = prompt("Enter Link Title:","");

  if (selection == "" &&  linkText != "" && myLink !=null && linkTitle != "") {
    unsafeWindow.tagIt('['+linkText,']('+myLink+' "'+linkTitle+'")', i);
  }
  else if (selection == "" && linkText != "" && myLink !=null) {
    unsafeWindow.tagIt('['+linkText,']('+myLink+')', i);
  }
  else if (myLink != null && linkTitle != "") {
    unsafeWindow.tagIt('[',']('+myLink+' "'+linkTitle+'")', i);
  }
  else if (myLink != null) {
    unsafeWindow.tagIt('[',']('+myLink+')', i);
  }
}

unsafeWindow.del = function (i){
  var ta = unsafeWindow.textArray[i];

  if (ta.selectionStart | ta.selectionStart == 0) {
    // work around Mozilla Bug #190382
    if (ta.selectionEnd > ta.value.length) { ta.selectionEnd = ta.value.length; }

    var firstPos = ta.selectionStart;
    var endPos = ta.selectionEnd;
    var selection = ta.value.slice(firstPos,endPos);
  }
  if (selection == "") {alert("Please select something before using the Strikethrough button.");}
  else {
    //creates a variable with the strikethrough code and selection
    //note: does not work with backslashes, nullifies formatting using _'s
    var endLoop = selection.length;
    var beginSlice = 0;
    var endSlice = 1;
    var strikethrough = selection.slice(beginSlice,endSlice) + "&#822;";
    while (endSlice<=endLoop) {
      beginSlice++;
      endSlice++;
      var strikethrough = strikethrough + selection.slice(beginSlice,endSlice) + "&#822;";
    }

    //insert strikethrough formatting
    ta.value=ta.value.slice(0,firstPos)+strikethrough+ta.value.slice(endPos);

    //Reset focus
    var cursorPos = firstPos + strikethrough.length;
    ta.focus();
    ta.setSelectionRange(cursorPos,cursorPos);
  }
}

unsafeWindow.underline = function (i){
  var ta = unsafeWindow.textArray[i];

  if (ta.selectionStart | ta.selectionStart == 0) {
    // work around Mozilla Bug #190382
    if (ta.selectionEnd > ta.value.length) { ta.selectionEnd = ta.value.length; }

    var firstPos = ta.selectionStart;
    var endPos = ta.selectionEnd;
    var selection = ta.value.slice(firstPos,endPos);
  }
  if (selection == "") {alert("Please select something before using the Underline button.");}
  else {
    //creates a variable with the underline code and selection
    //note: does not work with backslashes, nullifies formatting using _'s
    var endSel = selection.length;
    var endLoop = endSel - 2;
    var lastChar = endSel - 1;
    var beginSlice = 0;
    var endSlice = 1;
    var ulText = " &#863;" + selection.slice(beginSlice,endSlice) + "&#863;";
    while (endSlice<=endLoop) {
      beginSlice++;
      endSlice++;
      var ulText = ulText + selection.slice(beginSlice,endSlice) + "&#863;";
    }
    var ulText = ulText + selection.slice(lastChar,endSel);

    //insert Underlined formatting
    ta.value=ta.value.slice(0,firstPos)+ulText+ta.value.slice(endPos);

    //Reset focus
    var cursorPos = firstPos + ulText.length;
    ta.focus();
    ta.setSelectionRange(cursorPos,cursorPos);
  }
}

textareas = document.evaluate("//textarea",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
unsafeWindow.textArray = new Array();unsafeWindow.textArray = new Array();
for (i=0; i<textareas.snapshotLength; i++) {
  if (!textareas.snapshotItem(i).getAttribute('style') || textareas.snapshotItem(i).getAttribute('class').indexOf("growfieldDummy") == -1){
    unsafeWindow.textArray[i] = textareas.snapshotItem(i);
    var symbols = new Array(   
      '&agrave;', '&Aacute;', '&aacute;', '&Acirc;', '&acirc;', '&Atilde;', '&atilde;', '&Auml;', '&auml;', '&Aring;', '&aring;', '&AElig;', '&aelig;', '&Ccedil;', '&ccedil;', '&ETH;', '&eth;', '&Egrave;', '&egrave;', '&Eacute;', '&eacute;', '&Ecirc;', '&ecirc;', '&Euml;', '&euml;', '&Igrave;', '&igrave;', '&Iacute;', '&iacute;', '&Icirc;', '&icirc;', '&Iuml;', '&iuml;', '&micro;', '&Ntilde;', '&ntilde;', '&Ograve;', '&ograve;', '&Oacute;', '&oacute;', '&Ocirc;', '&ocirc;', '&Otilde;', '&otilde;', '&Ouml;', '&ouml;', '&Oslash;', '&oslash;', '&OElig;', '&oelig;', '&Scaron;', '&scaron;', '&Ugrave;', '&ugrave;', '&Uacute;', '&uacute;', '&Ucirc;', '&ucirc;', '&Uuml;', '&uuml;', '&Yacute;', '&yacute;', '&yuml;', 
      
      '&Alpha;', '&alpha;', '&Beta;', '&beta;', '&Gamma;', '&gamma;', '&Delta;', '&delta;', '&Epsilon;', '&epsilon;', '&Zeta;', '&zeta;', '&Eta;', '&eta;', '&Theta;', '&theta;', '&Iota;', '&iota;', '&Kappa;', '&kappa;', '&Lambda;', '&lambda;', '&Mu;', '&mu;', '&Nu;', '&nu;', '&Xi;', '&xi;', '&Omicron;', '&omicron;', '&Pi;', '&pi;', '&Rho;', '&rho;', '&Sigma;', '&sigma;', '&sigmaf;', '&Tau;', '&tau;', '&Upsilon;', '&upsilon;', '&Phi;', '&phi;', '&Chi;', '&chi;', '&Psi;', '&psi;', '&Omega;', '&omega;',
      
      '&spades;', '&clubs;', '&hearts;', '&diams;', '&uml;', '&macr;', '&acute;', '&cedil;', '&iexcl;', '&iquest;', '&circ;', '&tilde;', '&ndash;', '&mdash;', '&lsquo;', '&rsquo;', '&ldquo;', '&rdquo;', '&lsaquo;', '&rsaquo;', '&middot;', '&brvbar;', '&laquo;', '&raquo;', '&para;', '&sect;', '&dagger;', '&Dagger;', '&bull;', '&hellip;', '&lang;', '&rang;', '&loz;', '&szlig;', '&THORN;', '&thorn;',
      
      '&sup1;', '&sup2;', '&sup3;', '&times;', '&divide;', '&frac14;', '&frac12;', '&frac34;', '&ordf;', '&ordm;', '&not;', '&deg;', '&plusmn;', '&radic;', '&infin;', '&int;', '&part;', '&ne;', '&le;', '&ge;', '&sum;', '&permil;', '&#8260;', '&prod;', '&Prime;', '&prime;', '&minus;', '&fnof;', '&forall;', '&part;', '&exist;', '&empty;', '&nabla;', '&isin;', '&notin;', '&ni;', '&lowast;', '&radic;', '&prop;', '&infin;', '&ang;', '&and;', '&or;', '&cap;', '&cup;', '&there4;', '&sim;', '&cong;', '&asymp;', '&ne;', '&equiv;', '&le;', '&ge;', '&sub;', '&sup;', '&nsub;', '&sube;', '&supe;', '&oplus;', '&otimes;', '&perp;', '&sdot;', '&lceil;', '&rceil;', '&lfloor;', '&rfloor;', 
      
      '&larr;', '&uarr;', '&rarr;', '&darr;', '&harr;', '&crarr;', '&lArr;', '&uArr;', '&rArr;', '&dArr;', '&hArr;', '&curren;', '&cent;', '&pound;', '&yen;', '&loz;', '&thetasym;', '&piv;', '&upsih;', '&bull;', '&oline;', '&frasl;', '&weierp;', '&image;', '&real;', '&alefsym;', '&copy;', '&reg;', '&trade;', '&#8480;', '&#8471;'
    );
    var accessBar = document.createElement("div");
    var barHTML =
      "<img onclick='tagIt(\"\\n#\",\"\","+ i +")' title='Font 1 {#}' style='background-color:white;' src='"+font1img+"' />\n " +
      "<img onclick='tagIt(\"\\n##\",\"\","+ i +")' title='Font 2 {##}' style='background-color:white;' src='"+font2img+"' />\n " +
      "<img onclick='tagIt(\"\\n###\",\"\","+ i +")' title='Font 3 {###}' style='background-color:white;' src='"+font3img+"' />\n " +
      "<img onclick='tagIt(\"\\n####\",\"\","+ i +")' title='Font 4 {####}' style='background-color:white;' src='"+font4img+"' />\n " +
      "<img onclick='tagIt(\"\\n#####\",\"\","+ i +")' title='Font 5 {#####}' style='background-color:white;' src='"+font5img+"' />\n " +
      "<img onclick=\"tagIt('__','__',"+ i +")\" title='Bold {__B__}' style='background-color:white;' src='"+boldimg+"' />\n " + 
      "<img onclick=\"tagIt('_','_',"+ i +")\" title='Italic {_I_}' style='background-color:white;' src='"+italicimg+"' />\n " +
      "<img onclick='underline("+ i +")' title='Underline {S&amp;#863;}' style='background-color:white;' src='"+ulimg+"' />\n " +
      "<img onclick='del("+ i +")' title='Strikethrough {S&amp;#822;}' style='background-color:white;' src='"+delimg+"' />\n " +
      "<img onclick='tagIt(\"\\n&nbsp;&nbsp;&nbsp;&nbsp;\",\"\","+ i +")' title='Preformatted Text {&nbsp;&nbsp;&nbsp;&nbsp;4spaces}' style='background-color:white;' src='"+preimg+"' />\n " +
      "<img onclick='tagIt(\"\\n\\n---\\n\",\"\","+ i +")' width='16' height='16' title='Horizontal Rule {---}' style='background-color:white;' src='"+hrimg+"' />\n "+
      "<img onclick=\"linkIt("+i+")\" title='Link  [text](http:// \"Title\")' style='background-color:white;' src='"+linkimg+"' />\n " +
      "<img onclick=\"tagIt('\\n> ','',"+ i +")\" title='Quote {> }' style='background-color:white;' src='"+quoteimg+"' />\n " + 
      "<img onclick=\"tagIt('* ','',"+ i +")\" title='Bulleted List {* }' style='background-color:white;' src='"+listimg+"' />\n " +
      "<img onclick=\"tagIt('0. ','',"+ i +")\" width='16' height='16' title='Numbered List {0. }' style='background-color:white;' src='"+numlistimg+"' />\n " +
      "<img onclick=\"tagIt('','&nbsp;&nbsp;\\n',"+ i +")\" title='Line Break {twospaces&nbsp;&nbsp;}' style='background-color:white;' src='"+brimg+"' />\n " +
      "<img onclick=\"document.getElementById('symbols_box').style.display='block';\" title='Symbol Map' style='background-color:white;' src='"+symimg+"'/>\n " +
      "<div id='symbols_box' style='position:absolute;display:none;background-color:black;'><table style='border:thick solid grey;margin:0;'>\n ";
    var col=0;
    for(var s=0;s<symbols.length;s++) {
        if(!(col%32)||symbols[s]==-1) {
          if(s) {
            barHTML += "</tr>\n";
          }
          barHTML += "<tr>";
          col=0;
        }
        if(symbols[s]!=-1) {
          col++;
          barHTML += "<td onclick=\"tagIt('','"+symbols[s]+"',"+i+");document.getElementById('symbols_box').style.display='none'\" style='border:thin solid grey;text-align:center;padding:0.25em;'>"+symbols[s]+"</td>";
        }
    }
    barHTML += "</tr>\n</table></div>\n";
    accessBar.innerHTML = barHTML;
    unsafeWindow.textArray[i].parentNode.insertBefore(accessBar, unsafeWindow.textArray[i]);
  }
}