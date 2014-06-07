// ==UserScript==
// @name           CalakrmNEW
// @namespace      http://userscripts.org/users/494952
// @description    Helps you to find bets with smallest house edge on www.betbrain.com
// @include        http://www.betbrain.*/nextMatches/*
// @version        2.31
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
  krmitko.css.rules += 'li.NNRow {border-top: 2px solid black;} ';
  krmitko.css.rules += '.NNRow .nBO li{width: 25%;} ';
  krmitko.css.rules += '.NNRow .TwoWay .nBO .NN0{padding: 0 12.5% 0 0;} ';
  krmitko.css.rules += '.NNRow .TwoWay .nBO .NN1{padding: 0 0 0 12.5%;} ';
  krmitko.css.rules += '.nBO{border-right: 1px solid #DDDDDD;} ';
  krmitko.css.rules += 'div.NNBetType{width: 5%;} ';
  krmitko.css.rules += '.NNEvil{white-space: nowrap; text-align: center; height: 32px;} ';
  krmitko.css.rules += 'li.good1{font-weight: bold; color: black; background-color: rgb(51,204,0);} ';
  krmitko.css.rules += 'li.good2{font-weight: bold; color: black; background-color: rgb(255,128,0);} ';
  krmitko.css.rules += 'li.good3{font-weight: bold; color: black; background-color: #FF3366;} ';
  krmitko.css.rules += '.noGood{display: auto} ';
  krmitko.css.rules += ' ';
  krmitko.css.rules += ' ';
  krmitko.css.rules += ' ';
  krmitko.css.rules += ' ';
  krmitko.css.rules += ' ';
  krmitko.css.append = function(){
    if (krmitko.css.added === false) {
      jQuery('<style type="text/css">').text(krmitko.css.rules).appendTo(jQuery('body'));
    }
  }

  krmitko.matches = {};
  krmitko.matches.areExpanded = false;
  krmitko.matches.expandButton = null;
  krmitko.matches.expand = function(){ 
    if (krmitko.matches.areExpanded === false) {
      //if (krmitko.matches.expandButton === null) {
        krmitko.matches.expandButton = jQuery("ul#controlAllTop a.ExpandAll");
        krmitko.matches.expandButton.click(function(){krmitko.matches.areExpanded = true;});
      //}
      krmitko.matches.expandButton.click();
      return false;
    } else
      return true;
  }
  
  krmitko.unprofitable = {};
  krmitko.profitable = {};
  krmitko.unprofitable.hide = function(element){ jQuery("."+krmitko.classes.hideIfNotProfitable+":not(."+krmitko.classes.profitable+")", typeof element !== 'undefined' ? element : jQuery("ol.NNItems")).filter(":visible").hide()};
  krmitko.unprofitable.show = function(element){ jQuery("."+krmitko.classes.hideIfNotProfitable+":not(."+krmitko.classes.profitable+")", typeof element !== 'undefined' ? element : jQuery("ol.NNItems")).filter(":hidden").show()};
  krmitko.profitable.hide = function(element){ jQuery("."+krmitko.classes.hideIfNotProfitable+"."+krmitko.classes.profitable, typeof element !== 'undefined' ? element : jQuery("ol.NNItems")).filter(":visible").hide()};
  krmitko.profitable.show = function(element){ jQuery("."+krmitko.classes.hideIfNotProfitable+"."+krmitko.classes.profitable, typeof element !== 'undefined' ? element : jQuery("ol.NNItems")).filter(":hidden").show()};  
  
  krmitko.nakrm = {};
  
  // nBO
  krmitko.nakrm.nBO = function(nbo){
    var result = 0;
    var rate = 0;
    var li = null;
    var div = null;
    var valid = true;
    
    for( var i = 0; ((li = jQuery("li.NN" + i, nbo)).length > 0); i++ ){
      div = jQuery("div", li);
      if (div.length > 0) {
        rate = parseFloat(div.text().replace(",", "."));
        result += 1/rate;
      } else
        valid = false;
    }
    if (valid === true)    
      result = Math.round( (1 - 1 / result)*100*100)/100;
    else
      result = 666;
    
    var liNnEvil = jQuery('<li>').addClass('NNEvil').append(jQuery('<div>').text(result)).appendTo(nbo);

    if       ((result<1.50)&&(result>=1)) {
      liNnEvil.addClass("good3");
      liNnEvil.addClass('profitable');
    } else if((result<1)&&(result>=0)) {
      liNnEvil.addClass("good2");
      liNnEvil.addClass('profitable');
    } else if((result<0)             ) {
      liNnEvil.addClass("good1");
      liNnEvil.addClass('profitable');
    } else {
      jQuery(this).addClass("noGood");
      liNnEvil.addClass('unprofitable');
    }
    
    return liNnEvil.hasClass('profitable');
  }
  
  // mPA
  krmitko.nakrm.mPA = function(mPa) {
    mPa.addClass(krmitko.classes.hideIfNotProfitable);
    //mPa.hide();
    if (krmitko.nakrm.nBO(jQuery("ol.nBO", mPa)) === true) {
      mPa.addClass(krmitko.classes.profitable);
      //mPa.show();
      return true;
    } else
      return false;
  }
  
  // mPAR
  krmitko.nakrm.mPAR = function(mPar) {
    mPar.addClass(krmitko.classes.hideIfNotProfitable);
    //mPar.hide();
    jQuery("li.mPA", mPar).each(function(){
      if (krmitko.nakrm.mPA(jQuery(this)) === true)
        mPar.addClass(krmitko.classes.profitable);
        //mPar.show();
    });
    return mPar.hasClass(krmitko.classes.profitable);
  }
  
  // btITM
  krmitko.nakrm.btITM = function(btItm){
    btItm.addClass(krmitko.classes.hideIfNotProfitable);
    //btItm.hide();
    var profitable = false;
    if (btItm.hasClass('MinimizedN'))
      profitable = krmitko.nakrm.nBO(jQuery("ol.nBO", btItm)) ? true : profitable;
    if (btItm.hasClass('MaximizedN'))
      profitable = krmitko.nakrm.mPAR(jQuery("ol.mPAR", btItm)) ? true : profitable;
    if (profitable === true) {
      btItm.addClass(krmitko.classes.profitable);
      //btItm.show();
      return true;
    } else
      return false;
  }
  
  // NNRow
  krmitko.nakrm.NNRow = function(nnRow){
    nnRow.addClass(krmitko.classes.hideIfNotProfitable);
    //nnRow.hide();
    var nnInfo = jQuery("ul.NNInfo", nnRow);
    var nnBtcn = jQuery("ul.btCNT", nnRow);
    var hidden = true;
    nnInfo.click(function(){
      if (hidden === true) {
        krmitko.unprofitable.show(nnBtcn);
        hidden = false;
      } else {
        krmitko.unprofitable.hide(nnBtcn);
        hidden = true;
      }
    });
    jQuery("a.ExpandMBT", nnBtcn).click();
    
    jQuery("li.btITM", nnBtcn).each(function(){
      if (krmitko.nakrm.btITM(jQuery(this)) === true) {
        nnRow.addClass(krmitko.classes.profitable);
        //nnRow.show();
      }
    });
    
    nnRow.addClass('nakrmeno');
    
  }
  
  // NNItems
  krmitko.nakrm.NNItems = function(nnItems){
    if (krmitko.matches.expand() === true) {
      nnItems = typeof nnItems !== 'undefined' ? nnItems : jQuery("ol.NNItems");
      jQuery("li.NNRow.Expanded:not(.nakrmeno)", nnItems).each(function(){krmitko.nakrm.NNRow(jQuery(this));});
      krmitko.unprofitable.hide();
      return true;
    } else
      return false;
  }
  
  krmitko.hideLeftPanel = function(){
    var leftPanel = jQuery("div#left");
    if( leftPanel.is(":visible") ) {
      var gain = leftPanel.width();
      leftPanel.hide();
      var workArea = jQuery("div#workArea");
      var content = jQuery("div#content");
      workArea.css("float","left");
      workArea.width(workArea.width() + gain);
      content.width(content.width() + gain);
    }
  }
  
  krmitko.scrollPositionOK = false;
  krmitko.scrollToResults = function(){
    if( krmitko.scrollPositionOK == false ) {
      krmitko.hideLeftPanel();
      window.scrollTo(0,jQuery("ul#controlAllTop").offset().top);
      krmitko.scrollPositionOK = true;
    }    
  }
  
  krmitko.ajaxStopCallback = function(){
    if (krmitko.nakrm.NNItems() === true) {
      krmitko.css.append();
      krmitko.scrollToResults();
      return true;
    } else
      return false;
  }
  
  krmitko.setAdvancedFilters = function() {
    jQuery("ul#NNFilterchoice li a[href='Advanced']").click();
    jQuery("form#controlFilters li#l-fDate div#datePresets ul.ScopeDD li a#sel-all").click();
    jQuery("form#controlFilters li#l-fMinBm input#fMinBm").val(2);
    jQuery("form#controlFilters li#l-fSubmit button#fSubmit").click(function(){
      krmitko.scrollPositionOK = false;
      krmitko.matches.areExpanded = false;
    });
    jQuery("form#controlFilters li#l-fSubmit button#fSubmit").click();
  }
  
  krmitko.scrollTimeoutRunning = false;
  krmitko.scrollCallback = function(){
    if (krmitko.scrollTimeoutRunning === false) {
      if( ( jQuery(window).scrollTop() + jQuery(window).height() ) >= ( jQuery(document).height() - 100 ) ){
        krmitko.scrollTimeoutRunning = true;
        jQuery("a.buttonMoreMatches").click();
        setTimeout( function(){krmitko.scrollTimeoutRunning = false}, 1000 );
      }
    }
  }
    
  krmitko.run = function(){
    jQuery("body").ajaxStop(krmitko.ajaxStopCallback);
    jQuery(window).scroll(krmitko.scrollCallback);
    krmitko.setAdvancedFilters();
  }
  
});

// ACTUAL AUTO TRIGGER
jQuery(document).ready(function(){krmitko.run();});
