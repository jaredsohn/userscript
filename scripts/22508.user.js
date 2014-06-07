// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "funkwurm Youtube Enhancer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          funkwurm Youtube Nifties
// @namespace     http://www.youtube.com/funkwurm
// @description   Adds a few nifty Youtube enhancements
// @include       http://youtube.com/*
// @include       http://*.youtube.com/*
// ==/UserScript==

function _funkYTE() {
  var self=this;
  
  function getElementsByClassName(e, needle) { /* modified version of crisp's getElementsByClassName, this version expects an parent-element as a first argument */
    var s = [], r = [], undefined;
 /*    var e = document.documentElement || document.body; */
    var re = new RegExp('(^|\\s)' + needle + '(\\s|$)');

    while (e !== undefined) {
      while (e) {
        if (e.nodeType == 1) {
          if (e.className && re.test(e.className)) r.push(e);
          s.push(e.firstChild);
        }
        e = e.nextSibling;
      }
      e = s.pop();
    }
    return r;
  }
  
  function getParentTagFromElement(sTag, rElement) { /* does what the name of the function says, get the nearest parent of rElement that is of tag sTag */
    var rParent=rElement.parentNode;
    while (rParent.nodeName.toLowerCase()!=sTag.toLowerCase() && rParent.nodeName.toLowerCase()!='body') {
      rParent=rParent.parentNode;
    }
    return rParent;
  }

  function checkIfPageIs(sPageToCheck) {
    switch (true) {
      case (sPageToCheck=='view_video'  &&  location.href.search(/^http:\/\/([a-z]{2,3}\.)?youtube\.[a-z]{2,3}(\.[a-z]{2,3})?\/watch\?/i)!=-1):
      case (sPageToCheck=='all_comments' && location.href.search(/^http:\/\/([a-z]{2,3}\.)?youtube\.[a-z]{2,3}(\.[a-z]{2,3})?\/comment_servlet\?/i)!=-1):
      case (sPageToCheck=='subs_center'  && location.href.search(/^http:\/\/([a-z]{2,3}\.)?youtube\.[a-z]{2,3}(\.[a-z]{2,3})?\/my_subscriptions/i)!=-1):
        return true;
    }
    return false;
  }
  
  if (checkIfPageIs('view_video') || checkIfPageIs('all_comments')) {
    var sVideoId=location.href.split("?")[1].match(/v=(([^&#]|$)*)/)[1];
  }
  
  var aLanguages={
    "english":{
      "descriptionSaveButt":"Right-click save video to PC button",
      "descriptionConfirmD":"Ask to confirm before deleting comment",
      "descriptionSubsTabs":"Make middleclick open videos in tabs",
      "confirmDeleteDialog":"Are you sure you want to delete this comment?",
      "saveButtonTitle":"Right click, save as: ",
      "saveNormal":"normal/HQ",
      "saveHD":"HD"
    }
  }
  
  function getLanguage() {
    return 'english';
  }
  
  function setOption(sOption, bEnabled) {
    GM_setValue('en'+sOption, bEnabled);
  }
  
  function getOption(sOption) {
    return GM_getValue('en'+sOption, 'not set');
  }
  
  function initOption(sOption) {
    var sOptionState='';
    if (unsafeWindow['YTDid'+sOption]) {
      setOption(sOption, false);
      sOptionState=' disabled="disabled"';
    } else if (getOption(sOption)=='not set') {
      setOption(sOption, true);
    }
    if (getOption(sOption)) {
      sOptionState=' checked="checked"';
    }
    return '<li><label><input type="checkbox" id="_funkEn'+sOption+'"'+sOptionState+' /> '+aLanguages[getLanguage()]['description'+sOption]+'</label></li>';
  }

  var bSettingsWinDone=false;
  function makeSettingsWin() {
    bSettingsWinDone=true;
    
    var eStyle=document.createElement('style');
    eStyle.appendChild(document.createTextNode(
      '#_funkContainer {'+
        'background-color:#fff;'+
        'position:fixed;'+
        'bottom:0px;'+
        'right:10px;'+
      '}'+
      '#_funkField {'+
        'border:0;'+
        'margin:0;'+
        'padding:0;'+
      '}'+
      '#_funkButton {'+
        'cursor:pointer;'+
      '}'+
      '#_funkSettings {'+
        'display:none;'+
      '}'+
      '#_funkSettings, #_funkSettings li {'+
        'list-style-type:none;'+
        'padding:0;'+
        'margin:0;'+
      '}'+
      '#watch-views {'+
        'white-space:nowrap;'+
      '}'+
      '#watch-rating-div, #ratingWrapper, #watch-views-div {'+
        'width:auto !important;'+
      '}'
    ));
    document.getElementsByTagName('head')[0].appendChild(eStyle);
    
    var sSettingsHtml=
      '<fieldset id="_funkField"><legend id="_funkButton">Youtube Nifties</legend>'+
        '<ul id="_funkSettings">Enable:'+
          initOption('SaveButt')+
          initOption('ConfirmD')+
          initOption('SubsTabs')+
        '</ul>'+
      '</fieldset>';
    var eSettingsDiv=document.createElement('div');
    eSettingsDiv.setAttribute('id', '_funkContainer');
    eSettingsDiv.innerHTML=sSettingsHtml;
    document.body.appendChild(eSettingsDiv);
    var aCheckBoxes=eSettingsDiv.getElementsByTagName('input');
    var iCheckBoxIndex=aCheckBoxes.length;
    while (iCheckBoxIndex--) {
      aCheckBoxes[iCheckBoxIndex].addEventListener('click', function() {
        _funkYTEnhance.setOptionEnabled(this.id.substr(7, 8), this.checked);
      }, false);
    }
    document.getElementById('_funkButton').addEventListener('click', function() {
      var rOptionsUl=document.getElementById('_funkSettings');
      if (rOptionsUl.style.display=='block') {
        rOptionsUl.style.display='none';
      } else {
        rOptionsUl.style.display='block';
      }
    }, false);
  }
  
  var bSaveButtonAdded=false;
  function addSaveButton() {
    bSaveButtonAdded=true;
    var sDownloadUrl='http://youtube.com/get_video?video_id=';
      
    var rPlayerDiv=document.getElementById('movie_player');
    var sTId=rPlayerDiv.getAttribute('flashvars').match(/(\?|&)t=(([^&]|$)*)/)[2];
    var sVideoUrl=sDownloadUrl+sVideoId+'&t='+sTId;
    
    var eSpanToAdd=document.createElement('span');
    eSpanToAdd.innerHTML=aLanguages[getLanguage()]['saveButtonTitle']+
                         '<a href="'+sVideoUrl+'&fmt=18" rel="nofollow">'+aLanguages[getLanguage()]['saveNormal']+'</a> or '+
                         '<a href="'+sVideoUrl+'&fmt=22" rel="nofollow">'+aLanguages[getLanguage()]['saveHD']+'</a>. ';

    eInsertBefore=document.getElementById('watch-view-count');
    eInsertBefore.parentNode.insertBefore(eSpanToAdd, eInsertBefore);
  }
  
  var bConfirmDeleteDone=false;
  function addConfirmDelete() {
    bConfirmDeleteDone=true;
    var aDeleteAs=document.getElementsByTagName('a');
    var iA=aDeleteAs.length;
    while (iA--) {
      var sOnclick=aDeleteAs[iA].getAttribute('onclick');
      if (sOnclick && sOnclick.search(/removeComment/)!=-1) {
        aDeleteAs[iA].removeAttribute('onclick');
        aDeleteAs[iA].addEventListener('click', new Function ("if (confirm('"+aLanguages[getLanguage()]['confirmDeleteDialog']+"')) { unsafeWindow."+sOnclick+" } "), false);
      }
    }
  }

  var bSubsMadeMidClickable=false;
  function makeSubsMidClickable() {
    bSubsMadeMidClickable=true;
    var aVideoLinks=document.getElementById('videos').getElementsByTagName('a');
    iVideos=aVideoLinks.length;
    while (iVideos--) {
      if (aVideoLinks[iVideos].getAttribute('href').indexOf('#')!=-1) {
        var sVideoURL=aVideoLinks[iVideos].getAttribute('onclick').match(/'([^']+)'/)[1]; // '
        aVideoLinks[iVideos].setAttribute('href', 'watch?v='+sVideoURL);
        aVideoLinks[iVideos].removeAttribute('onclick');
      }
    }
  }
  
  this.checkIfPage=function(sPageToCheck) {
    return checkIfPageIs(sPageToCheck);
  }
  
  this.setOptionEnabled=function(sOption, bEnabled) {
    setOption(sOption, bEnabled);
  }
  
  this.getOptionEnabled=function(sOption) {
    return getOption(sOption);
  }
  
  this.addCounter=function() {
    addCounterToTextareas();
  }
  
  this.addConfirm=function() {
    addConfirmDelete();
  }
  
  this.addNifties=function() {
    if (checkIfPageIs('view_video')) {
      if (!bSaveButtonAdded && getOption('SaveButt'))
        addSaveButton();
      if (!bConfirmDeleteDone && getOption('ConfirmD'))
        addConfirmDelete();
    }
    if (checkIfPageIs('all_comments')) {
      if (!bPaginationNavigationExpandingDone && getOption('PageNavE'))
        expandPaginationNavigation();
      if (!bConfirmDeleteDone && getOption('ConfirmD'))
        addConfirmDelete();
    }
    if (checkIfPageIs('subs_center')) {
      if (!bSubsMadeMidClickable && getOption('SubsTabs'))
        makeSubsMidClickable();
    }
    if (!bSettingsWinDone)
      makeSettingsWin();
  }
}

_funkYTEnhance=new _funkYTE();
_funkYTEnhance.addNifties();

document.addEventListener("DOMNodeInsterted", _funkYTEnhance.addConfirm, false);