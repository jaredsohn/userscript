// ==UserScript==
// @name           Double Or Nothing AutoPlayer
// @namespace      mOBSCENE
// @description    Plays Double Or Nothing for you. There are settings to change in the script itself.
// @include        http://www.neopets.com/medieval/doubleornothing.phtml*
// ==/UserScript==

//Change the number below to the amount of seconds to wait.
var Wait = 1;
//Automatically Set To Avatar Score.
var Collect = 320;
//                                   ^ Change to any number below.
/*Scores go up like this.
        10
        20
        40
        80
        160
        320 *AVATAR SCORE*
        640
        1280
        2560
        5120
        10420
        20840
        41680
        83360
        and so on...


 -----------DONT EDIT ANYTHING BELOW THIS LINE UNLESS YOU KNOW WHAT YOURE DOING. */
 
if(document.body.innerHTML.indexOf('Continue') != -1){
  var button = document.evaluate('//form[contains(@action,"doubleornothing.phtml")]/input[@type = "submit" and @value = "Continue"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  button.click();
  button.form.submit();
}

if (document.body.innerHTML.indexOf('Click Me') != -1){
setTimeout("document.location = 'http://www.neopets.com/medieval/process_doubleornothing.phtml?type=cointoss'", Wait * 1000);
}

if (document.body.innerHTML.indexOf('Snargan takes') != -1){
setTimeout("document.location = 'http://www.neopets.com/medieval/doubleornothing.phtml'", Wait * 1000);
}

if (document.body.innerHTML.indexOf('Play Again!!!') != -1){
setTimeout("document.location = 'http://www.neopets.com/medieval/doubleornothing.phtml'", Wait * 1000);
}

var NP = document.body.innerHTML.match(/You have won <b>([0-9]*) NP<\/b> so far.../)[1];
if (NP >= Collect){
setTimeout("document.location = 'http://www.neopets.com/medieval/process_doubleornothing.phtml?type=collect&win=2'", Wait * 1000);
}