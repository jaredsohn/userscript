// ==UserScript==
// @name        Amulyam Study
// @namespace   Amulyam Auto Play Trivia and Vocabulary
// @description Amulyam Auto Play Trivia and Vocabulary
// @grant       none
// @include     *amulyam.in*
// @version     2.6.2014
// @author      Yogam Yogesh
// @icon        
// ==/UserScript==

var p=window.location.href;
if((p==("http://www.amulyam.in/dlc.do"))||(p==("http://www.amulyam.in/home.do")))
{window.open("http://www.amulyam.in/vocabulary.do");
window.location.href="http://www.amulyam.in/playTrivia.do"};
