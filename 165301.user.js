// ==UserScript==
// @name        Amulyam Hack Latest by J@cKeY!!!
// @namespace   Amulyam auto Play Trivia and Vocabulary
// @description Fixed vocabulary page issues. No need to update daily. Removed all the ad.fly craps... EnjoY!!! 
// @grant       none
// @include     *amulyam.in*
// @version     1.1.0
// @author      J@cKeY!!!
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @icon        https://dl.dropboxusercontent.com/s/vonasqghppf9xjf/150x150.jpg
// ==/UserScript==


var p=window.location.href;
if((p==("http://www.amulyam.in/dlc.do"))||(p==("http://www.amulyam.in/home.do")))
window.location.href="http://www.amulyam.in/playTrivia.do";
else if(p==("http://www.amulyam.in/playTrivia.do"))
document.getElementsByTagName("input")[1].click();
else if(p==("http://www.amulyam.in/triviaClaim50Paise.do"))
window.location.href="http://www.amulyam.in/vocabulary.do";
else if(p==("http://www.amulyam.in/showTriviaAnswer.do"))
window.location.href="http://www.amulyam.in/playTrivia.do";
else if(p==("http://www.amulyam.in/vocabulary.do")){
option = $(".word_first h3").html()
if(option!=undefined)
   localStorage.setItem('word',option);
document.getElementsByClassName("playgame")[0].click();
}
else if(p==("http://www.amulyam.in/enterLWord.do"))
{
option = localStorage.getItem('word');
$("#submit-word").val(option);
document.getElementsByTagName('input')[2].click();}
else if(p==("http://www.amulyam.in/showLWord.do"))
window.location.href="http://www.amulyam.in/vocabulary.do";
else if(p==("http://www.amulyam.in/vocabularyClaim50Paise.do"))
window.location.href="http://www.amulyam.in/logout.do";