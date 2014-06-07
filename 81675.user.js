//
//
// ==UserScript==
// @name          Efekonload
// @namespace   http://tianalwani.wordpress.com/
// @description   jail-jail saja....
// @author	dapet nyulik dari orang laen
// @include       http://tianalwani.wordpress.com
// @include       http://tianalwani.wordpress.com
// @require http://stianalwani.wordpress.com
// @version        1
// ==/UserScript==
//

/-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------//

scrW=screen.availWidth
scrH=screen.availHeight
window.resizeTo(10,10)
window.focus()
for(a=0;a<80;a++){
window.moveTo(0,0)
window.resizeTo(0,scrH*a/80)
}
window.resizeTo(0,0)
for(b=0;b<80;b++){
window.moveTo(0,scrH/1)
window.resizeTo(scrW*b/80,0)
}
for(c=0;c<80;c++){
window.moveTo(scrW/1,scrH/1)
window.resizeTo(0,scrH*c/80)
}
for(d=0;d<80;d++){
window.moveTo(scrW/1,0)
window.resizeTo(scrW*d/80,0)
}
for(e=0;e<80;e++){
window.resizeTo(scrW*e/80,scrH*e/80)
}
window.moveTo(0,0)
window.resizeTo(scrW,scrH)
//]]>
