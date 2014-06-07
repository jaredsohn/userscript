// ==UserScript==
// @name           Pabst Example of about config delete error problem
// @namespace      ~pabst
// @description    Example of about config delete error problems
// @include        *
// ==/UserScript==

// This is just a test example to show that user:configue "resets" can cause a big problem.
//
//  1) First run this script. The GM_setValue will put something initial in "user:config".
//  2) Next run it again and the "user:config" value will be retreived.
//  3) Then go to "user:config", and "reset" (clear) the values you can find under searching 
//     for "pabst".
//  4) There after if you run the script again you may get some incomprehensible error message.
//  5) If you exit Firefox and restart it there will be no problem - the script will run fine.
//
// I came across this problem in a much more elaborate script. 
// When I used "user:config" to "reset" values, it seemed that the script ran ok (no error messages)
// However it turned out that a GM_getValue on something that had been "reset" would just terminate
// a script without any errors being reported.

alert('start of pabst script');
var beers = eval(GM_getValue('beers', []));
alert('after "GM_getValue", where "beers" =  ' + uneval(beers));

// set up a defautlt if nothing is there
if (beers.length == 0){
 alert('need to set up a default');
 var firstBeers = [{pabst: 'yeasty yet cheap'}];
 alert('oldBeers = ' + uneval(firstBeers));
 GM_setValue('beers', uneval(firstBeers));
}
alert('at end of pabst script');

