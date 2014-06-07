// ==UserScript==
// @name           Creatures AutoLike
// @namespace      com.alexwh.ytautolike
// @description    Automatically likes any video from the Creatures as soon as you visit it.
// @include        http://youtube.com/watch?v=*
// @include        http://www.youtube.com/watch?v=*
// ==/UserScript==
if (/\b(?:^SSoHPKC|UberHaxorNova|kootra|TheCampingTree|GassyMexican|ZeMachinima|xXSlyFoxHoundXx|DanzNewzMachinima$)\b/i.test(document.body.innerHTML)) { //search for strings incased in ^$ without matching case
unsafeWindow.document.getElementById("watch-like").click(); //simulate a click on the like button
}
else {
// do nothing
}