// ==UserScript==
// @name          Hide Stack Exchange answers
// @description   add a checkbox to every answer collapsing that answer, and to the entre block, hiding the block.
// @match         http://stackoverflow.com/*
// @match         http://serverfault.com/*
// @match         http://meta.stackoverflow.com/*
// @match         http://askubuntu.com/*
// @match         http://stackapps.com/*
// @match         http://answers.onstartups.com/*
// @match         http://mathoverflow.com/*
// @match         http://superuser.com/*
// @version       1.0
// ==/UserScript==

(function(){
  var ANSWER_CB_TEXT = "collapse"
  var ANSWERS_CB_TEXT = "hide all answers"
  
  var w = (typeof unsafeWindow !== "undefined") ? unsafeWindow : window;
  var $ = w.$
  
  $(".answer").each(repaintAnswer);
  
  $(document).ajaxSuccess(function(_,_,options){
    var match = options.url.match(/ajax-load-realtime\/([\d;]+)/);
    if(!match) return;
    var ids = match[1].split(";");
    for(var i = 0; i < ids.length; i++){
      var answer = document.getElementById("answer-" + ids[i]);
      if(answer) repaintAnswer.call(answer);
    }
  })
  
  w.styleCode = (function(styleCode){
    return function(){
      styleCode.apply(this, arguments);
      $(".answer").each(repaintAnswer);
    }
  })(w.styleCode);
  
  addGlobalHide();
  
  addCss();
  
  ///
  
  function repaintAnswer(){
    var $answer = $(this)
    if($answer.has(".answer-collapse").length) return;
    $answer.addClass("answer-expanded").removeClass("answer-collapsed")
    .find(".post-menu").append($("<span>", {"class": "lsep", text: "|"}))
    .append(
      $("<input>", {type:'checkbox', "class": "answer-collapse", change: function(){
        var whStart = this.offsetTop - window.scrollY;
        if(this.checked){
          $answer.addClass("answer-collapsed").removeClass("answer-expanded");
        }else{
          $answer.addClass("answer-expanded").removeClass("answer-collapsed");
        }
        var whEnd = this.offsetTop - window.scrollY;
        window.scrollBy(0, whEnd - whStart);
      }})
    ).append($("<span>", {text: ANSWER_CB_TEXT}))
  }
  
  function addGlobalHide(){
    $answers = $("#answers");
    $("#post-form").before(
      $("<input>", {type: "checkbox", id: "answers-collapse", change: function(){
        var whStart = this.offsetTop - window.scrollY;
        if(this.checked){
          $answers.addClass("answers-collapsed").removeClass("answers-expanded");
        }else{
          $answers.addClass("answers-expanded").removeClass("answers-collapsed");
        }
        var whEnd = this.offsetTop - window.scrollY;
        window.scrollBy(0, whEnd - whStart);
      }})
    ).before($("<span>", {text: ANSWERS_CB_TEXT}));
  }
  
  function addCss(){
    $(document.head).append($("<style>", {text:
      ".answer-collapsed .vote, "+
      ".answer-collapsed .post-text "+
      "{height:0; padding:0; overflow:hidden} "+ //so that the width still applies
      ".post-menu .answer-collapse {margin: 5px; position:relative; top:3px} "+
      ".answer-collapsed {padding: 0} "+
      ".answer-collapsed .post-menu > a, "+
      ".answer-collapsed .post-menu > a + .lsep {display:none} "+
      ".answer-collapsed > table > tbody > tr:nth-child(2) {display:none} "+
  
      "#answers-collapse {margin-right: 5px; margin-top: 20px} "+
      ".answers-collapsed .answer, "+
      ".answers-collapsed #tabs {display: none} "
    }));
    $("#post-form .space").removeClass("space");
  }
})();