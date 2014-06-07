// ==UserScript==
// @name           hamabe
// @namespace      hamabe
//
// @description
//    
//    ========================================
//    Author : Hiroyasu OHYAMA
//    ========================================
//
//      "hamabe" is the abbreviation of "Hamabe make you Able to Master A Basic English."
//      This script helps you to give you basic English skills.
//
//      This script is Greasemonkey and provide you a function to generate fill in the blank questions on VOA (http://www.voanews.com/english/index.cfm).
//
//      [How to use]
//
//      1) You can make any manuscript fill in the blnak questions on VOA at random by double-clicking around the target text (*1).
//      2) If you click a hidden word, it will appear.
//
//      (*1) You can easily modify the rate of hidden words by changing value of "rate" in the hamabe's script source code.
//
//
// @include        http://www.voanews.com/english/*
// ==/UserScript==


document.addEventListener("dblclick", function(evt){
  maskContext(evt.target);
}, false);

document.addEventListener("click", function(evt){
  clearMask(evt.target);
}, false);

function maskContext(element)
{
  var rate = 20;

  while (element.parentNode && element.textContent.length < 1000){
    element = element.parentNode;
  }

  parseDom(element, rate);
}

function parseDom(currentNode, rate)
{
  var baseOffset = 0;
  var words = currentNode.textContent.split(" ");
  var context = currentNode.innerHTML;

  for(var j=0;j<words.length;j++){
    var value = Math.floor(Math.random() * 100);
  
    if(value <= rate && words[j].match(/^[a-zA-Z]*$/)){

      var replaceStr = new String();
      
      var wordInfo = replaceWord(baseOffset, context, words[j],
        "<span class=\"hamabe\" style=\"background-color: rgb(0, 0, 0); color: rgb(0, 0, 0);\">" + words[j] + "</span>");

      if(wordInfo != null){
        context = context.substring(0, baseOffset) + wordInfo.str;
        baseOffset = wordInfo.offset;
      }else{
        continue;
      }
    }
  }

  currentNode.innerHTML = context;
}

/*
 * This routine replace 
 */
function replaceWord(baseOffset, mainStr, targetStr, replaceStr)
{
  var startOffset = baseOffset;
  var targetHead;
  var ret = 0;
  var wordInfo = {};

  while(ret != -1){
    ret = mainStr.indexOf("<", startOffset);
    targetHead = mainStr.indexOf(targetStr, startOffset);

    if(targetHead == -1){
      return null;
    }

    if(ret < targetHead){

      var tagTail = mainStr.indexOf(">", startOffset);
      

      startOffset = tagTail + 1;
    }else{
      ret = -1;
    }
  }

  var firstHalf = mainStr.substring(baseOffset, targetHead);
  var endHalf = mainStr.substring(targetHead + targetStr.length, mainStr.length);
    
  if(firstHalf != null && endHalf != null){
    wordInfo.str = firstHalf + replaceStr + endHalf;
    wordInfo.offset = targetHead + replaceStr.length;
    return wordInfo;
  }

  return null;
}

function clearMask(element)
{
  var clsValue;

  clsValue = element.getAttribute("class");

  if(clsValue == "hamabe"){
    element.style.backgroundColor = "rgb(255, 255, 255);";
  }
}