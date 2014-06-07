// ==UserScript==
// @name        omegle.com enhancer
// @namespace   tukkek
// @description Automatically reconnect, skip mobile strangers and kik questions, checkbox for disabling
// @include        http://*omegle.com/*
// @version     1
// ==/UserScript==
if (window.top != window.self) {
  return;
}

var ABORTS=[
  'Your conversational partner has disconnected.',
  'Stranger is using Omegle\'s mobile Web site',
  'You have disconnected.',
  'Stranger 2 has disconnected',
  'Stranger 1 has disconnected',
  'Stranger has disconnected',
  'Sorry, that question is too short!',
];
var QUESTION_ABORTS=[
  'kik',
  'detuv',
  '5Tube',
  'freelivetechnicalsupport',
  'spreadshirt',
  '.net',
  'skype',
  '.com',
  '.fm',
  '.tk',
  'tumblr',
  'snapchat',
  ];
var QUESTIONS=[
  "What was the best question you've seen on Omegle?",
  "Paste whatever you had copied last here",
  "Why is the world so fucked up?",
  "How do you use omegle?",
  "What was your proudest moment?",
  "Name your fav band, movie and book, and then try to guess the other person's age.",
  "what's the meaning of life?",
  ];
var ENABLED_CHECKBOX_ID='omegleenhancerenabled';
function enabledBox(){
  return document.querySelector('#'+ENABLED_CHECKBOX_ID);
}
var first=true;
var random;
var backlog=document.createElement('div');
function logbox(){
  return document.querySelector('.logbox');
}
function disconnect(){
  var questionBox=document.querySelectorAll('.questionInput')
  questionBox=questionBox[questionBox.length-1];
  if (questionBox){
    if (first){
      first=false;
      random=questionBox.value.length==0;
      for (i=0;i<35;i++){
	backlog.innerHTML+='<br/>';
      }
      document.body.appendChild(backlog);
    }
    if (bodycontains('Stranger 1:')||bodycontains('Stranger 2:')){
      backlog.innerHTML+=logbox().innerHTML+'<hr/>';
    }
    if (random){
      var i=Math.floor(Math.random()*QUESTIONS.length);
      questionBox.value=QUESTIONS[i];
    }
  }
  document.querySelector('.disconnectbtn').click();
}
function contains(text,pattern){
  return text.toLowerCase().contains(pattern.toLowerCase());
}
function htmlcontains(element,text){
  return element&&contains(element.innerHTML,text);
}
function bodycontains(text){
  return htmlcontains(/*document.body*/logbox(),text);
}

setInterval(function(){
  if (!enabledBox().checked||bodycontains('Looking for someone you can chat with')){
    return;
  }
  for (i=0;i<ABORTS.length;i++){
    if (bodycontains(ABORTS[i])){
      disconnect();
      return;
    }
  }
  var question=document.querySelector('.questionText');
  for (i=0;i<QUESTION_ABORTS.length;i++){
    var abort=QUESTION_ABORTS[i];
    if (htmlcontains(question,abort)||contains(question.textContent.split(' ').join(''),abort)){
      disconnect();
      return;
    }
  }
},100);
document.body.innerHTML+='<input id="'+ENABLED_CHECKBOX_ID+'" type="checkbox" checked style="position:fixed;top:0px;" />';
var abort;
var listenerInterval=setInterval(function(){
  var l=logbox();
  if (l){
    l.addEventListener("DOMSubtreeModified", function(e) {
      clearTimeout(abort);
    });
    clearInterval(listenerInterval);
  }
},1000);