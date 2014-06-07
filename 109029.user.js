// Jn Blocking script
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// ==UserScript==
// @name Jn Blocker MBTI
// @namespace nikinNS
// @description Block Jn from being displayed on MBTI forum
// @include http://mbti.tarhely.biz/*
// @exclude http://diveintogreasemonkey.org/*
// @exclude http://www.diveintogreasemonkey.org/*
// ==/UserScript==
//
//
//--CONFIG-------------------------------------

bUserName  = GM_getValue('bUserName', 'H:Jn 16.33|S:Héra');

//--CONFIG-------------------------------------
//
//

bUserSName = 'jn';
cCommentString = 'Comment';
cQuoteString   = 'Idézet';
cBlockedQuoteString  = 'Blokkolt Idézet';
cLockMessageString = "írd be ezt ha biztos látni akarod :";

function redisplay() {
  var blockingLock = 1;
  if (this.className == "btS") {
    blockingLock = 0;
  } else {
    var lockKey=Math.floor(Math.random()*900000)+100000;
    if (prompt(cLockMessageString+lockKey,"") == lockKey) {
      blockingLock = 0;
    }
  }
  // only proceed if blocking lock is open (even for hiding)
  //if (blockingLock == 0) {
    var chd = this.parentNode.getElementsByTagName('div');
    for (var i=2; i<chd.length-5; i++) {
      if (chd[i].style.display == "block" || blockingLock == 1 ) {
        chd[i].style.display="none";
      } else {
        chd[i].style.display="block";
      }
      if (chd[i].className == "bquote") {
        chd[i].style.display="none";
      }
    }
    this.style.display = "block";
  //}
}

function redisplayquote() {
  var chd = this.getElementsByTagName('div');
  for (var i=0; i<chd.length; i++) {
    if (chd[i].style.display == "block" ) {
      chd[i].style.display="none";
    } else {
      chd[i].style.display="block";
    }
  }
  this.style.display = "block";
}

function hideCommentsOf(UserName) {
  blockingType = UserName.slice(0,1);
  UserName     = UserName.slice(2);
  elements2 = document.getElementsByTagName('div');
  for (var i = 0; i < elements2.length; i++) {
     if (elements2[i].className.search('author-name') != -1) {
       if (elements2[i].innerHTML.search(UserName) != -1 ) {
          ppp  = elements2[i].parentNode.parentNode.parentNode.parentNode.parentNode;
          ppp.style.display="none";
          pppp = ppp.parentNode;
          pppp.innerHTML=pppp.innerHTML+'<div class="bt'+blockingType+'" id="'+bUserSName+i+'">Mutat '+UserName+' '+cCommentString+'</div>';
 	  paci = document.getElementById(bUserSName+i);
	  if (paci.className == "btS") {
	    paci.style.background="#ffff00";
	  } else {
	    paci.style.background="#ff0000";
	  }
	  paci.addEventListener("click", redisplay, false);
       }	
     }
  }
}



function hideQuotesFrom(UserName) {
  blockingType = UserName.slice(0,1);
  UserName     = UserName.slice(2);
  elements = document.getElementsByTagName('div');
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].className == 'content') {
       if (elements[i].innerHTML.search(UserName+' wrote:') != -1 ) {
          ppp  = elements[i].parentNode.parentNode;
          ppp.style.display="none";
          pppp = ppp.parentNode;
          pppp.innerHTML=pppp.innerHTML+'<div class="bt'+blockingType+'" id="'+bUserSName+i+'">Mutat '+UserName+' '+cQuoteString+'</div>';
 	  paci = document.getElementById(bUserSName+i);
	  paci.style.background="#ff00ff";
	  paci.addEventListener("click", redisplay, false);
	  // hide blockQuotes irreversibly
          bquotes = elements[i].getElementsByTagName('blockquote');
	  for (var j = 0; j < bquotes.length; j++) {
	    bquotes[j].innerHTML= cBlockedQuoteString + '<div class="bquote" style="display:none;">' + bquotes[j].innerHTML + '</div>';
	    bquotes[j].style.background = "#ff00ff";
            bquotes[j].addEventListener("click", redisplayquote, false);
	  }
       }
    }
  }
}

//Buttons code

function buttonAction () {
   actionId = this.className.slice(0,2);
   userName = this.className.slice(2);
   var userNamesForBlocking = bUserName.split('|');

   var actionTaken = 0;
   var newRule     = '';
   for (var i = 0; i < userNamesForBlocking.length; i++) {
      if (userNamesForBlocking[i].slice(2) == userName ) {
        if (actionId == 'HB') { userNamesForBlocking[i]='H:'+userName; }
        if (actionId == 'SB') { userNamesForBlocking[i]='S:'+userName; }
        if (actionId == 'UB') { userNamesForBlocking[i]='UNBLOCK'}
        actionTaken = 1;
      }    
   }
   if (actionTaken == 0 ) {
     if (actionId == 'HB') { newRule='H:'+userName; }
     if (actionId == 'SB') { newRule='S:'+userName; }
     if (actionId == 'UB') { newRule=''} 
   }
   //rebuild string
   var newRuleset ='';
   for (var i = 0; i < userNamesForBlocking.length; i++) {
      if (userNamesForBlocking[i] != 'UNBLOCK') {
        if (i>0) { newRuleset = newRuleset + '|'; }
        newRuleset = newRuleset + userNamesForBlocking[i];
      }  
   } 
   if (actionTaken == 0) {
     newRuleset = newRuleset + '|' + newRule;
   }  
   if (confirm("Biztos, hogy elfogadod az új szabályokat? \n"+newRuleset+'\n A módosítások életbelépéséhez frissítsd a lapot')) {
     GM_setValue('bUserName', newRuleset); 
   }
}

function generateButtons() {
  elements2 = document.getElementsByTagName('div');
  for (var i = 0; i < elements2.length; i++) {
     if (elements2[i].className.search('author-name') != -1) {
       nameParent = elements2[i].parentNode;
       isLoggedIn = elements2[i].getElementsByTagName('a');
       if (isLoggedIn.length !=1 ) {
          nameOfAuthor = elements2[i].innerHTML;
       } else {
          nameOfAuthor = isLoggedIn[0].innerHTML;
       }
       nameOfAuthor = nameOfAuthor.replace(/^\s+|\s+$/g, '') ;
       blockingButtonsPanel = '<div style="cursor:pointer;">'+
                                '<span class="HB'+nameOfAuthor+'" id="HB'+i+'" style="background:#ff0000;">HB</span> '+
                                '<span class="SB'+nameOfAuthor+'" id="SB'+i+'" style="background:#ffff00;">SB</span> '+
                                '<span class="UB'+nameOfAuthor+'" id="UB'+i+'" style="background:#00ff00;">UB</span> '+
                                ' '+nameOfAuthor+
                              '</div>'
       nameParent.innerHTML = nameParent.innerHTML+blockingButtonsPanel;
       HBbtn = document.getElementById('HB'+i);
       HBbtn.addEventListener("click", buttonAction, false);
       SBbtn = document.getElementById('SB'+i);
       SBbtn.addEventListener("click", buttonAction, false);
       UBbtn = document.getElementById('UB'+i);
       UBbtn.addEventListener("click", buttonAction, false);
     }
  }	
}

//////////////////////////////////////////

var userNamesForBlocking = bUserName.split('|');
for (var i = 0; i < userNamesForBlocking.length; i++) { 
  hideCommentsOf(userNamesForBlocking[i]);
  hideQuotesFrom(userNamesForBlocking[i]);
}
generateButtons();