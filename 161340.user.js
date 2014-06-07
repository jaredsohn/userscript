// ==UserScript==
// @name          Reviewomizer
// @namespace     http://whistling-fish.org
// @description   Randomize review scores
// @include       http://*.polygon.com/*
// @include       http://*.metacritic.com/*
// ==/UserScript==

var polygonRE = /polygon\.com/ig,
    metacriticRE = /metacritic\.com/ig;
    
//Polygon review score randomizer:
if (polygonRE.test(document.location.href)) {
  var scoreRadials = $('div.review_meta > div.review_score, .review_score > em.score'),
      scoreLabels = $('div.score > strong'),
      scores = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  
  var makeScoreString = function makeScoreString(score) {
    var scoreString = score.toString();
    scoreString = scoreString.substr(0, scoreString.length-1) + '.' + scoreString.substr(-1);
    return scoreString;
  };
  
  var randomizePolygon = function randomizePolygon() {
    $(scoreRadials).each(function (i) {
      var lastClassIndex = this.classList.length-1,
          newScore = scores[Math.floor(Math.random() * scores.length)];
      $(this).removeClass(this.classList[lastClassIndex]);
      $(this).addClass("score_" + newScore);
      if (i < scoreLabels.length) {
        $(scoreLabels[i]).text(makeScoreString(newScore));
      }
    });
  };
  
  randomizePolygon();
  setInterval(randomizePolygon, 60000*5); //randomize scores every 5 minutes
}

else if (metacriticRE.test(document.location.href)) {
  var randomMetascore = function randomMetascore(scoreType, target) {
    var score = Math.floor(Math.random()*100),
        displayScore = score,
        classes;
        
    if (target) {
      classes = $(target).attr("class");
      classes = classes.substr(0, classes.lastIndexOf("_") + 1);
    }
        
    if (scoreType === "crit") {
      classes = classes || "review_grade critscore critscore_";
    }
    else if (scoreType === "avguser") {
      classes = classes || "data avguserscore avguserscore_";
      displayScore = score < 100 ? String.prototype.substr.call((score / 10) + ".0", 0, 3) : 10;
    }
    else if (scoreType === "user") {
      classes = classes || "review_grade userscore userscore_";
      displayScore = Math.round(score / 10);
    }
    else if (scoreType === "text") {
      classes = classes || "data textscore textscore_";
    }
    else {
      classes = classes || "data metascore score_";
    }
    
    if (score < 41) {
      classes += "terrible";
    }
    else if (score < 62) {
      classes += "mixed";
    }
    else if (score < 81) {
      classes += "favorable";
    }
    else {
      classes += "outstanding";
    }
    
    return {"score": displayScore, "classes": classes};
  };
  
  var getMetascore = function getMetascore(target) {
    var meta = {};
    target = $(target);
  
    meta.score = target.text().trim();
    meta.classes = target.attr("class");
    
    return meta;
  };
  
  var setDefaultMetascore = function setDefaultMetascore() {
    var target = $(this),
        meta = randomMetascore("default", target),
        wrap = target.closest("span.product_wrap"),
        wrapHeight = Math.floor(120 + ((meta.score / 100) * 120));
    
    if (wrapHeight < 160) { 
      wrapHeight = 160;
    }
    
    target.text(meta.score).attr("class", meta.classes);
    wrap.height(wrapHeight).data("height", wrapHeight); //only applies to scores with graph view
    
    return target;
  };
  
  var setScoreValue = function setScoreValue(target, type) {
    var meta = randomMetascore(type || "default", target);
        
    target.text(meta.score).attr("class", meta.classes);
    
    return target;
  };
  
  var setSummaryMetascore = function setSummaryMetascore() {
    var target = $(".data.metascore", $(this)),
        meta = randomMetascore("default", target);
        
    target.attr("class", meta.classes);
    $(".score_value", target).text(meta.score);
        
    return $(this);
  };
  
  var setHoverMetascore = function setHoverMetascore() {
    return setScoreValue($(this), "default");
  };
  
  var setHoverAvguserscore = function setHoverAvguserscore() {
    return setScoreValue($(this), "avguser");
  };
  
  var setDefaultUserscore = function setDefaultUserscore() {
    return setScoreValue($(this), "user");
  };
  
  var setDefaultCritscore = function setDefaultCritscore() {
    return setScoreValue($(this), "crit");
  };
  
  var setDefaultAvguserscore = function setDefaultAvguserscore() {
    return setScoreValue($(this), "avguser");
  };

  var setDefaultTextscore = function setDefaultTextscore() {
    return setScoreValue($(this), "text");
  };

  var randomizeMetacritic = function randomizeMetacritic() {
    var defaultMetascoreSelector = "span.data.metascore, div.data.metascore, li.product .data.metascore",
        summaryMetascoreSelector = ".score_summary.metascore_summary", //big number at top
        hoverMetascoreSelector = ".hover_metascore_wrap div.data.metascore",
        hoverAvguserscoreSelector = ".hover_userscore_wrap div.data.avguserscore",
        defaultUserscoreSelector = ".review_grade.userscore, .data.userscore",
        defaultCritscoreSelector = ".review_grade.critscore, .data.critscore",
        defaultAvguserscoreSelector = ".data.avguserscore",
        defaultTextscoreSelector = ".data.textscore",
        removalSelector = ".score_counts, .review_helpful, .summary";
    
    $(removalSelector).remove();
    
    $(defaultMetascoreSelector).not($(summaryMetascoreSelector).find(defaultMetascoreSelector)).each(setDefaultMetascore);
    $(summaryMetascoreSelector).each(setSummaryMetascore);
    $(hoverMetascoreSelector).each(setHoverMetascore);
    $(hoverAvguserscoreSelector).each(setHoverAvguserscore);
    $(defaultUserscoreSelector).each(setDefaultUserscore);
    $(defaultCritscoreSelector).each(setDefaultCritscore);
    $(defaultAvguserscoreSelector).each(setDefaultAvguserscore);
    $(defaultTextscoreSelector).each(setDefaultTextscore);
  };
  
  randomizeMetacritic();
  setInterval(randomizeMetacritic, 60000*5); //randomize scores every 5 minutes 
}