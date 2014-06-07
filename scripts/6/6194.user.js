// ==UserScript==
// @name           DPChallenge Voting
// @namespace      
// @description    Allows user to hit a number to vote instead of clicking.  Enter 0 for 10.
// @include        http://dpchallenge.com/challenge_vote_image.php*
// @include        http://www.dpchallenge.com/challenge_vote_image.php*

// ==/UserScript==
(function () {
	window.addEventListener('keydown', keyPress, false);
})();

function keyPress(e)
{
  key = e.keyCode;
  if (key >= 96 && key <= 105){key-=48;}
  if (key >= 48 && key <= 57)
  {
    var vote = String.fromCharCode(key);
    if (vote=="0"){vote="10"}
    unsafeWindow.do_vote(vote);
  }
}