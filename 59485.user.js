// ==UserScript==
// @name           DicingDangers V3 Shortcuts For Ex
// @namespace      http://diveintogreasemonkey.org/download/
// @description    DicingDangers V3 Shortcuts For Explorer
// @include        http://ec2-50-17-79-49.compute-1.amazonaws.com/*
// ==/UserScript==
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 0
//A
// B
// C = CHAR
// D
// E = EXPLORE
// F = FISHING
// G = EQUIPMENT
// H = HOME
// I = INVENTORY
// J
// K = BANK
// L =  LOCATION
// M = MINING
// N
// O = OTHERS
// P = PRAY
// Q
// R = REST
// S
// T
// U
// V
// W
// X
// Y
// Z
document.addEventListener('keydown', keyHandler, false);
function keyHandler(event) {

  if (event.altKey || event.ctrlKey || event.metaKey) return;
  
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         (event.target.type.toLowerCase() == "text" ||
          event.target.type.toLowerCase() == "file"))) {
      return;
    }
  }

  var k = event.keyCode;
  //1
  if(k==49)      {
    document.location.href = '';
  }//2	
  else if(k==50) {
    document.location.href = '';
  }//3
  else if(k==51) {
    document.location.href = '';
  } //4
  else if(k==52) {
    document.location.href = '';
  } //5
  else if(k==53) {
    document.location.href = '';
  }//6
  else if(k==54) {
    document.location.href = '';
  }//7
  else if(k==55) {
    document.location.href = '';
  }//8
  else if(k==56) {
    document.location.href = '';
  }//9
  else if(k==57) {
    document.location.href = '';
  }//0
  else if(k==48) {
    document.location.href = '';
  }//A
  else if(k==65) {
    document.location.href = '';
  }//B
  else if(k==66) {
    document.location.href = '';
  }//C
  else if(k==67) {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=character';
  }//D
  else if(k==68) {
    document.location.href = '';
  }//E
  else if(k==69) {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=hunting&a=hunt';
  }//F
  else if(k==70) {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=fishing';
  }//G
  else if(k==71) {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=equipment';
  }//H
  else if(k==72) {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=home';
  }//I
  else if(k==73) {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=inventory';
  }//J
  else if(k==74) {
    document.location.href = '';
  }//K 
  else if(k==75) {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=bank';
  }//L
  else if(k==76) {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=location';
  }//M
  else if(k==77) {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=mining';
  }//N
  else if(k==78) {
    document.location.href = '';
  }//O
 else if(k==79)  {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=others';
  }//P
 else if(k==80) {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=location&command=pray';
  }//Q
 else if(k==81) {
    document.location.href = '';
  }//R
 else if(k==82) {
    document.location.href = 'http://ec2-50-17-79-49.compute-1.amazonaws.com//game.php?s=location&command=rest';
  }//S
 else if(k==83) {
    document.location.href = '';
  }//T
 else if(k==84) {
    document.location.href = '';
  }//U
 else if(k==85) {
    document.location.href = '';
  }//V
 else if(k==86) {
    document.location.href = '';
  }//W
 else if(k==87) {
    document.location.href = '';
  }//X
 else if(k==88) {
    document.location.href = '';
  }//Y
 else if(k==89) {
    document.location.href = '';
 }//Z
 else if(k==90) {
    document.location.href = '';
  }
}