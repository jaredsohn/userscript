// ==UserScript==
// @name           Google Harry
// @namespace      http://loucypher.wordpress.com/
// @description    Do I feel lucky?
// Oprah doesn't recognize TLD
// @include        http://www.google.*/*
// @include        http://www.google.com.*/*
// ==/UserScript==


(function() { // function wrapper for Oprah userJS
  var form;
  if (typeof unsafeWindow == "object") {
    form = unsafeWindow.document.f;
  } else {
    form = document.f;
  }
  if (!form) return;

  var btnG = form.btnG;
  btnG.value = "Go ahead, \nmake my day";

  var btnI = form.btnI;
  btnI.value = "Do I feel lucky? \nWell, do ya punk?";

  var img = document.evaluate("//img[@id='logo'] | " +
                              "//img[@alt='Google'] | " +
                              "//div[@title='Google']",
                              document, null, 0, null).iterateNext();
  if (!img) return;

  var gHarry = "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAARQAAACACAMAAAD9LmaqAAADAFBMVEUSFQ4UFhEWGBMY\
GhYcHRoeIB0fISEgIR4jJCImJygmKCUmKCgoKSYqLCotLjAuMC4uMDAwMS8yNDM2Nzg2\
ODY2ODg4OTY6PDsIJGMKLXcWLWIZOX89PkAqPm0+QD4+QEApQWtrDABrLCFAQT9jUQBG\
R0dNTlBOUE5OUFFSVFNVVlhWWFdWWFhaW1xJVXNdXmBeYF5eYGFaaXxhVFZ7TUJgYl97\
ZVJmZ2htbnFtcG5ucHJyc3R1dnh1eHd2eHl6e3wQNIQQPJQIPKUXQJoYRa0WSLUpSZQ6\
WJMpUbU5YbUYTcYYUc4hWdYxZdY5cd5IXItKYZRSba12eohjeaNKfed+gH5+gIF7hq1Z\
gdZaiu9zjs5jlu9zou+MEACLIBCSOS+tFACsIhC4JxOxMSCUQTGEaQCUeQCEdTm1RTGc\
ZVqNbGWEfXO1WUrFGADHLxvWJAjWLBLeMBjOPCnnPCHbQy7nSTHWZVrGdWvHfXXvWUL3\
aVL/dWOphACtjhC1jgC9lgC9nhCqkjGchkKlhnu1omPGngDWrgDOrinvugDeukL3hnP/\
zwDvxyn31yn/7wj/7zH331qBg4SFhoiGiIqIhISKi4yHiZKOkI+NkZOQj5SUkoyXmJqC\
ka+EkrSdnqGUnrWeoKOtloy1poyjo6Skpqqlqayop6etpq2tqqWrq62rrrKtsbO1qqa1\
sq20s7S0tbm2uLe2uLu4tbC9tr28u7yEmtaUrt6EqveossWltta1usa8vcGlvu++wcS1\
w96tx/e9z+/GkozKmJTRmJHRo57OrqXFvr3WtrX3loT3ppz3uq3Fv8Dey4zOw6Xv45T/\
94T/87XFxMXExcrGyczNxsbIxMvNy83LzdLN0dTey8bZ18vU09XS1dnV2dze19be29bd\
3N3O0+fG1//W2+bb3uPd4eXa5f/n297/y8b3187n5N7359b/+97m5Obj5evm6u3v5+fv\
6+fu7O7q7fbv8+/v8fX/6+f38+/19Pb29/r2+fv/9/f///f+/v4AAAAAAABl0ACjAAAg\
AElEQVR42u2dC1hTV77oW3nFkE0kouHO8eIDNw+Fqr3SiFggHERE4KggSgGPw1hbr3W8\
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"

  if (img.nodeName == "DIV") {
    img.style.background = "transparent url(" + gHarry + ") " +
                           "no-repeat scroll 0%";
    img.style.width = "276px";
    img.style.height = "128px";
    img.firstChild.style.left = "";
    img.firstChild.style.right = "125px";
    img.firstChild.style.top = "78px";
    img.firstChild.style.textAlign = "right";
  } else {
    img.width = "276";
    img.height = "128";
    img.src = gHarry;
  }

  if (img.nextSibling.nodeName == "BR") {
    img.parentNode.removeChild(img.nextSibling);
  }

})();

