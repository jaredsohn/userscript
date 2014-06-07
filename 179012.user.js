// ==UserScript==
// @name        productrnr 
// @namespace   Iamme
// @description Script to assist with ProductRnR MTurk Hits. F for Forward, R for Reverse, C for current
// @match      https://www.mturkcontent.com/dynamic/hit?*
// @version    1.5
// ==/UserScript==
var blocks = document.getElementsByClassName("singlebox");
var blockNum = 0;
var curBlock = blocks[blockNum];



document.getElementById("header").style.zIndex = 1;
for (var i = 0; i < blocks.length; i++){
    blocks[i].style.position = "relative";
    blocks[i].style.zIndex = 1000;
}
    
curBlock.scrollIntoView();    
document.addEventListener("keyup", function(e){
    if (e.keyCode==70){
      while (blockNum < blocks.length && blocks[blockNum].offsetTop == curBlock.offsetTop){
      	blockNum++;
      }
      if(curBlock)
      {
         curBlock = blocks[blockNum];
         curBlock.scrollIntoView();
          
      }else{ 
          blockNum = blocks.length - 1 ;
          curBlock = blocks[blocks.length - 1];
      }
    } 
    if(e.keyCode==67){
    	curBlock.scrollIntoView();
        
    }
    if(e.keyCode==82){
    	while (blockNum > 0 && blocks[blockNum].offsetTop == curBlock.offsetTop){
      	blockNum--;
      }
      if(curBlock)
      {
         curBlock = blocks[blockNum];
         curBlock.scrollIntoView();
      }else{ 
          blockNum++;
          curBlock = blocks[blockNum];
      }
    }
});

//set all non adult
var radioButtons = document.getElementsByClassName("radiobutton");
for (i = 0; i < radioButtons.length; ++i){
  var item = radioButtons[i];
  if (item.value == "notadult"){
    item.checked = true;
  }
}