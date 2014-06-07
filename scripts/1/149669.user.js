// ==UserScript==
// @name           Calakrm
// @namespace      http://userscripts.org/users/487621
// @description    Helps you bet
// @include        http://www.betbrain.*/next-matches/*
// @version        2.6.4 beta
// @grant          none
// ==/UserScript==


// DO NOT EDIT BELOW HERE

/////////////
// KRMITKO //
/////////////
var krmitko = {};
jQuery(document).ready(function(){

  krmitko.classes = {};
  krmitko.classes.profitable = 'profitable';
  krmitko.classes.hideIfNotProfitable = 'calakrmHINP';
  
  
  krmitko.css = {};
  krmitko.css.added = false;
  krmitko.css.rules = '';
  // hide left
  krmitko.css.rules += 'div#content div.SideBar {display: none;}';    
  // hide right
  krmitko.css.rules += 'div#content div.AuxBar {display: none;}';    
  // hide footer
  krmitko.css.rules += 'div#footer {display: none;}';    
  // expand middle
  krmitko.css.rules += 'div#content div.Main {width: 100%;}';    
  // shorten left
  krmitko.css.rules += '.MatchNextInfo .SLItem .SLTitle, .MatchDetails {width: 40%}';
  // extend right
  krmitko.css.rules += '.TheMatch .OddsList, .TheDayTitle .OddsList {width: 55%;}';
  // divide by four (instead of three)
  krmitko.css.rules += '.TheMatch .ThreeWay .Outcome {width: 25%;}';
  krmitko.css.rules += '.Outcome.Outcome4 {text-align: center; background: url("http://gfxnew.betbrain.com/big-topbg.png") repeat-x scroll left -1078px transparent; color: #666666; }';
  krmitko.css.rules += '.Outcome.Outcome4 div { border-left: 0.0833em solid #EEEEEE;}';
  krmitko.css.rules += '.Outcome.Outcome4 a { display: block; padding-top: 1.5em;;}';
  krmitko.css.rules += '.Outcome.Outcome4.profitable {font-weight: bold; color: black; }';
  krmitko.css.rules += '.Outcome.Outcome4.profitable.good1 {color: rgb(51,204,0);}';
  krmitko.css.rules += '.Outcome.Outcome4.profitable.good2 {color: rgb(255,128,0);}';
  krmitko.css.rules += '.Outcome.Outcome4.profitable.good3 {color: #FF3366;}';
  krmitko.css.rules += ' ';
  krmitko.css.rules += ' ';
  krmitko.css.append = function(){
    if (krmitko.css.added === false) {
      jQuery('<style type="text/css">').text(krmitko.css.rules).appendTo(jQuery('body'));
    }
  }
  
  krmitko.inError = false;
  krmitko.fatalError = function(message) {
    message = "Calakrm encountered a fatal error.\n\n" + message + '\n\nCalakrm will now go into the corner and sob silently.';
    if (krmitko.inError == false)
      alert(message);
    krmitko.inError = true;
    throw new Error(message);
  }
  
  krmitko.jQueRequire = function(selectorString, parentElement) {
    parentElement = parentElement || jQuery('body');
    var result = jQuery(selectorString, parentElement);
    if (result.length < 1)
      krmitko.fatalError('Required element "' + selectorString + '" not found.');
    else
      return result;
    krmitko.fatalError('This should not happen.');
  }
  
  krmitko.jQueRequireUnique = function(selectorString, parentElement) {
    parentElement = parentElement || jQuery('body');
    var result = krmitko.jQueRequire(selectorString, parentElement);
    if (result.length > 1)
      krmitko.fatalError('Required element "' + selectorString + '" not unique.');
    else
      return result;
    krmitko.fatalError('This should not happen.');
  }

  krmitko.matches = {};
  krmitko.matches.areExpanded = false;
  krmitko.matches.expandButton = null;
  krmitko.matches.expand = function(){ 
    if (krmitko.matches.areExpanded === false) {
        krmitko.matches.expandButton = krmitko.jQueRequireUnique("div.MatchListStatus div#expandAllMatchesContainer a#expandAllMatches");
        krmitko.matches.expandButton.click(function(){
          krmitko.matches.areExpanded = true;
          krmitko.setState('expandAllSubmitted');
          //krmitko.matches.expandWait();
        });
      krmitko.matches.expandButton.click();
      return false;
    } else
      return true;
  }
  krmitko.matches.checkExpanded = function(){
    return (jQuery('div.Main div.MatchNextInfo').length == jQuery('div.Main ol.SummaryList').length);
  }
  krmitko.matches.expandCallback = function() {
    krmitko.ajaxStopCallback();
  }
  krmitko.matches.expandWait = function wait() {
    console.log('waiting for expand...');
    if (krmitko.matches.checkExpanded() == true) {
      krmitko.setState('allMatchesExpanded');
      //krmitko.matches.expandCallback();
    } else
      window.setTimeout(wait, 500);
  }
  
  krmitko.unprofitable = {};
  krmitko.unprofitable.hide = function(element){ 
    element = element || krmitko.jQueRequireUnique("div.Main");
    jQuery(".hideIfNotProfitable:not(.profitable)", element).filter(":visible").hide();
  }
  krmitko.unprofitable.show = function(element){ 
    element = element || krmitko.jQueRequireUnique("div.Main");
    jQuery(":not(.profitable)", element).filter(":hidden").show();
  }
  
  krmitko.nakrm = {};
  
  krmitko.nakrm.theBet = function(theBet){
    theBet.addClass('hideIfNotProfitable');
    var result = 0, odds = krmitko.jQueRequireUnique( 'ol.OddsList', theBet );
    krmitko.jQueRequire('li.Outcome:not(.EmptyCell) a.Bet span.Odds', odds).each(function(){
      result += 1 / parseFloat(jQuery(this).text().replace(",", "."));
    });
    if (jQuery('li.Outcome.EmptyCell', odds).length == 0) {
      result = Math.round( (1 - 1 / result)*100*100)/100;
    } else {
      result = 666;
    }
    var outcome4 = jQuery('<li>').addClass('Outcome Outcome4').append(jQuery('<div>').text(result)).appendTo(odds);
    if ((result < 1.5) && (result > 1)) {
      outcome4.addClass('profitable good3');
    } else if ((result < 1) && (result > 0)) {
      outcome4.addClass('profitable good2');
    } else if (result < 0) {
      outcome4.addClass('profitable good1');
    } else {
      outcome4.addClass('unprofitable noGood');
      theBet.hide();
    }
    if (outcome4.hasClass('profitable') === true)
      theBet.addClass('profitable');
  }
  
  // TheMatch
  krmitko.nakrm.theMatch = function(theMatch) {
    //theMatch.hide(); // comment this line for cool funky efects
      
    theMatch.addClass('nakrmeno');
    theMatch.addClass('hideIfNotProfitable');
    // lock theMatch variable
    (function feed(theMatch, watchDog){
      watchDog = watchDog || 1;
      if (watchDog > 35) {
        if (theMatch.hasClass('expandedByHand') == true) {
          theMatch.show();
          var oddsList = krmitko.jQueRequireUnique( ' > ol.OddsList', theMatch).addClass('hideIfNotProfitable profitable');
          var outcome4 = jQuery('<li>').addClass('Outcome Outcome4').append(jQuery('<a>').text('FAIL').attr('href', 'javascript:void(0)')).appendTo(oddsList);
          //krmitko.fatalError('failed to wait for expansion results.');
          return;
        } else {
          krmitko.jQueRequireUnique(' > div.MatchDetails a.DetailsToggle', theMatch ).click();
          theMatch.addClass('expandedByHand')
          watchDog = 0;
        }
      }
      // find expanded match info
      var matchInfo = jQuery('div.MatchNextInfo ol.SummaryList', theMatch);
      if (matchInfo.length == 0) {
        // if not available yet - wait
        window.setTimeout(function(){feed(theMatch, watchDog + 1);}, watchDog * 100);
      } else if (matchInfo.length == 1){
        krmitko.jQueRequire( 'li.SLItem div.SLCore', matchInfo).each(function(){
          krmitko.nakrm.theBet(jQuery(this));
        });
        if (jQuery('.profitable', theMatch).length == 0) {
          theMatch.hide();
        } else {
          theMatch.show();
          theMatch.addClass('nakrmeno');
          krmitko.jQueRequireUnique(' > div.MatchDetails', theMatch ).addClass('hideIfNotProfitable profitable');
          var oddsList = krmitko.jQueRequireUnique( ' > ol.OddsList', theMatch).addClass('hideIfNotProfitable profitable');
          var outcome4 = jQuery('<li>').addClass('Outcome Outcome4').append(jQuery('<a>').text('SHOW').attr('href', 'javascript:void(0)')).appendTo(oddsList);
          outcome4.click(function tsh(){
            var outcome4 = jQuery(this);
            var link = krmitko.jQueRequireUnique('a', outcome4);
            if (link.text() == 'SHOW') {
              krmitko.unprofitable.show(theMatch);
              link.text('HIDE');
            } else {
              console.log(theMatch);
              krmitko.unprofitable.hide(theMatch);
              link.text('SHOW');
            }
          });
        }
      } else
        krmitko.fatalError('matchInfo.length > 1');
    })(theMatch);
  }
  
  // TheList
  krmitko.nakrm.theList = function() {
    var theList = krmitko.jQueRequireUnique('div.Main ol.TheList');
    jQuery('li.TheMatch:not(.nakrmeno)', theList).each(function(){krmitko.nakrm.theMatch(jQuery(this));});
    krmitko.scrollToResults();
  }
  
  krmitko.scrollPositionOK = false;
  krmitko.scrollToResults = function(){
    if( krmitko.scrollPositionOK == false ) {
      var controls = jQuery('div#nextControls');
      if (controls.length == 1) {
        window.scrollTo(0,controls.offset().top + controls.height());
        krmitko.scrollPositionOK = true;
      }
    }    
  }
  
  /*
   * start, 
   * advancedFiltersShown, 
   * advancedFiltersSet, 
   * advancedFiltersSubmitted, 
   * expandAllSubmitted, 
   * allMatchesExpanded
   */
  krmitko.state = 'start';
  krmitko.previousState = null;
  krmitko.setState = function(state) {
    if (krmitko.state == state)
      return true;
    krmitko.previousState = krmitko.state;
    krmitko.state = state;
    krmitko.watchDog.reset();    

    return true;
  }
  krmitko.watchDog = {};
  krmitko.watchDog.counter = 0;
  krmitko.watchDog.reset = function() {
    krmitko.watchDog.counter = 0;
  }
  krmitko.watchDog.inc = function() {
    ++krmitko.watchDog.counter;
    if (krmitko.watchDog.counter > 10)
      krmitko.fatalError('Watch dog barked.');
  }
  
  krmitko.ajaxStopCallback = function(){
    krmitko.watchDog.inc();
    console.log(krmitko.state);
    switch (krmitko.state) {
      case 'start':
        krmitko.advancedFilters.show();
        break;
      case 'advancedFiltersShown':
        krmitko.advancedFilters.set();
        break;
      case 'advancedFiltersSet':
        krmitko.advancedFilters.submit();
        break;
      case 'advancedFiltersSubmitted':
        krmitko.matches.expand();
        break;
      case 'expandAllSubmitted':
        //break;
      case 'allMatchesExpanded':
        krmitko.nakrm.theList();
        break;
    }
  }
  
  krmitko.advancedFilters = {};
  krmitko.advancedFilters.show = function() {
    var showButton = krmitko.jQueRequireUnique("div#oddsMenu ul#MainZoneMenu li.MMItem a[data-nmtab='nmAdvancedFiltersTab']");
    showButton.click(function(){
      krmitko.setState('advancedFiltersShown');
    });
    showButton.click();
    return true;
  } 
  krmitko.advancedFilters.set = function() {
    var afForm = krmitko.jQueRequireUnique('form#controlFilters');
    krmitko.jQueRequireUnique('input#fMinBm', afForm).val(2);
    krmitko.jQueRequireUnique('button#fSubmit', afForm).click(function(){
      krmitko.scrollPositionOK = false;
      krmitko.matches.areExpanded = false;
    });
    krmitko.setState('advancedFiltersSet');
    krmitko.advancedFilters.submit();
  }
  krmitko.advancedFilters.submit = function() {
    var submitButton = krmitko.jQueRequireUnique('button#fSubmit', krmitko.jQueRequireUnique('form#controlFilters'));
    submitButton.click(function(){
      krmitko.setState('advancedFiltersSubmitted');
    });
    submitButton.click();
  }
    
  krmitko.scrollTimeoutRunning = false;
  krmitko.scrollCallback = function(){
    //console.log('TROOOOOOOOOOOL');
    if (krmitko.scrollTimeoutRunning === false) {
      if( ( jQuery(window).scrollTop() + jQuery(window).height() ) >= ( jQuery(document).height() - 100 ) ){
        //console.log('GOGOGOG');
        krmitko.scrollTimeoutRunning = true;
        jQuery('a.BoxEpilogue.EpilogueNM[href="#advancedView"]:visible').click();
        setTimeout( function(){krmitko.scrollTimeoutRunning = false}, 1000 );
      }
    }
  }
  
 // RUN
  krmitko.run = function(){
    // init CSS
    krmitko.css.append();
    // setup callbacks
    jQuery("body").ajaxStop(krmitko.ajaxStopCallback);
    jQuery(window).scroll(krmitko.scrollCallback);
    window.setInterval(krmitko.scrollCallback, 1100);
    // click advanced
    krmitko.advancedFilters.show();
  }
  
});

// ACTUAL AUTO TRIGGER
jQuery(document).ready(function(){krmitko.run();});
