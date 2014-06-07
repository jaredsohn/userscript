// ==UserScript==
// @name           Cheat Cheat
// @namespace      http://userscripts.org/users/219959
// @description    Continues the game of Cheat on Neopets and decides whether or not to let your opponent slide.
// @include        http://www.neopets.com/games/cheat/cheat*
// ==/UserScript==
var allInput, thisInput, allImg, thisImg;

/* Working on a smarter script that uses your current hand as a reference to determine 
whether your opponent is cheating or not - i.e. you have 3 fours and Lil' Timmy the 
Tuskaninny attempts to play 2 fours, you are 100% sure he is cheating. (Attempted to get 
all the numbers [parseInt] from the img tags that included "/cards/" in its source... 
worked if I just alerted the numbers, but doesn't when I attempt to alert it after I put 
it in an array... weird. Feel free to enlighten me or make your own version.)

var hand=new Array();
allImg = document.evaluate('//img[@src]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allImg.snapshotLength; i++) {thisImg = allImg.snapshotItem(i);
if(document.body.innerHTML.indexOf("YOUR HAND:") != -1 && thisImg.src.indexOf('s/cards/') != -1 && String(parseInt(thisImg.src.substring(38,40))) != "NaN" && parseInt(thisImg.src.substring(38,40)) < 15 && parseInt(thisImg.src.substring(38,40)) > 1) {hand[i]=String(parseInt(thisImg.src.substring(38,40)));}}
for(var i=0; i<hand.length; i++) {if(String(parseInt(hand[i])) == "NaN" || String(parseInt(hand[i])) == "") {hand.splice(i,1)}}
alert(hand.length)

*/

allInput = document.evaluate('//input[@value]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allInput.snapshotLength; i++) {thisInput = allInput.snapshotItem(i);
    switch (thisInput.value) {
	case 'Click here to begin the game!':
		thisInput.click();
            break;
	case 'Click here to continue to difficulty 3':
		thisInput.click();
            break;
	case 'Click here to continue to difficulty 2':
		thisInput.click();
            break;
	case 'Click here to continue to difficulty 4':
		thisInput.click();
            break;
        case 'Click to Continue':
		thisInput.click();
            break;
        default:
}}

// Uses the ratio of the # of cards your opponent is playing over his total cards to determine whether he is cheating/not (not 100% accurate, but fairly close).

if(document.body.innerHTML.indexOf('played 1') != -1){
var pl=document.body.innerHTML.indexOf(' played 1')
var anm=document.body.innerHTML.indexOf(document.body.innerHTML.substring(pl-10,pl))
var cards=parseInt(document.body.innerHTML.substring(anm+15,anm+26).replace(/[^0-9]/g, ''))
if(1 / cards > .49) {document.getElementsByName('CheatYes')[0].click();}
if(1 / cards < .49) {document.getElementsByName('CheatNo')[0].click();}
}
if(document.body.innerHTML.indexOf('played 2') != -1){
var pl=document.body.innerHTML.indexOf(' played 2')
var anm=document.body.innerHTML.indexOf(document.body.innerHTML.substring(pl-10,pl))
var cards=parseInt(document.body.innerHTML.substring(anm+15,anm+26).replace(/[^0-9]/g, ''))
if(2 / cards > .25) {document.getElementsByName('CheatYes')[0].click();}
if(2 / cards < .25) {document.getElementsByName('CheatNo')[0].click();}
}
if(document.body.innerHTML.indexOf('played 4') != -1){
var pl=document.body.innerHTML.indexOf(' played 4')
var anm=document.body.innerHTML.indexOf(document.body.innerHTML.substring(pl-10,pl))
var cards=parseInt(document.body.innerHTML.substring(anm+15,anm+26).replace(/[^0-9]/g, ''))
if(4 / cards > .2) {document.getElementsByName('CheatYes')[0].click();}
if(4 / cards < .2) {document.getElementsByName('CheatNo')[0].click();}
}
if(document.body.innerHTML.indexOf('played 3') != -1){
var pl=document.body.innerHTML.indexOf(' played 3')
var anm=document.body.innerHTML.indexOf(document.body.innerHTML.substring(pl-10,pl))
var cards=parseInt(document.body.innerHTML.substring(anm+15,anm+26).replace(/[^0-9]/g, ''))
if(3 / cards > .24) {document.getElementsByName('CheatYes')[0].click();}
if(3 / cards < .24) {document.getElementsByName('CheatNo')[0].click();}
}