// ==UserScript==
// @name       Google+: Hide Trending
// @namespace  http://www.userscripts.org/
// @version    0.1.10
// @description  Hides the 'TRENDING ON GOOGLE+' box
// @match      https://plus.google.com/*
// @copyright  2012+, David R Six
// ==/UserScript==



function hideIt(){
  try{
    x = document.evaluate("//div[@componentid=13]",document,null,9).singleNodeValue
    if(x){
      x.style.display = 'none'
    }
  }finally{
    setTimeout(hideIt, 1000)
  }
}
hideIt()