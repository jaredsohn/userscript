// ==UserScript==
// @name           FbHC
// @namespace      http://www.gautamarora.com
// @description    Facebook Homepage Cleaner v0.2 - Removes dirty updates from your facebook homepage (e.g. quizzes, stumbleupon, youtube)
// @include        http://www.facebook.com/*
// @include        http://www.new.facebook.com/*
// @version        0.2 - 24th March 2009
// @author         Gautam Arora
// ==/UserScript==


( function () {

  document.addEventListener("DOMNodeInserted", update_clean, false);

  var count_external = 0;
  var externalapp_xpath_query = "//div[@class='UIIntentionalStory_Info UIIntentionalStory_AttachmentInfo']";
  var stumble_xpath_query     = "//div[@class='UIStoryAttachment_Copy']";
  var youtube_xpath_query     = "//div[@class='UIStoryAttachment_Caption']";

  // User Preferences - start
  var clean_external, clean_stumble, clean_youtube;
  clean_external = Number(GM_getValue('clean_external', clean_external));
  clean_stumble = Number(GM_getValue('clean_stumble', clean_stumble));
  clean_youtube = Number(GM_getValue('clean_youtube', clean_youtube));

  GM_registerMenuCommand((clean_external ? 'Show' : 'Clean') + ' External Apps (e.g. Quizzes, Games)', toggle_external);
  GM_registerMenuCommand((clean_stumble ? 'Show' : 'Clean') + ' Stumbles', toggle_stumble);
  GM_registerMenuCommand((clean_youtube ? 'Show' : 'Clean') + ' Youtube videos', toggle_youtube);
  GM_registerMenuCommand('Reset Preferences (cleans all)', reset_preferences);

  function reset_preferences() {
    GM_setValue('clean_external', 1 );
    GM_setValue('clean_stumble', 1 );
    GM_setValue('clean_youtube', 1 );
  }

  function toggle_external() {
    GM_setValue('clean_external', clean_external ? 0 : 1 );
    window.location.href = window.location.href; //refresh page
  }

  function toggle_stumble() {
    GM_setValue('clean_stumble', clean_stumble ? 0 : 1 );
    window.location.href = window.location.href;
  }

  function toggle_youtube() {
    GM_setValue('clean_youtube', clean_youtube ? 0 : 1 );
    window.location.href = window.location.href;
  }

  // User Preferences - end

  // Clean routine - start
  function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

  function update_clean(event) {
    //console.log('FbHC - update_clean');
    start_clean(event.target);
  }

  var remove_external=function(thenode) {
    //console.log('FbHC - remove_external');
    var allDivs, thisDiv;
    allDivs = xpath(externalapp_xpath_query);
    for (var i = 0; i < allDivs.snapshotLength; i++) {
      thisDiv = allDivs.snapshotItem(i);
      if(thisDiv.innerHTML.match('facebook\.com\/apps\/')) {
        //console.log('FbHC - Cleaning out quiz update #' + ++count_external);
        thisDiv.parentNode.parentNode.parentNode.style.display='none';
      }
    }
  }

  var remove_stumble=function(thenode) {
    //console.log('FbHC - remove_stumble');
    var allDivs, thisDiv;
    allDivs = xpath(stumble_xpath_query);
    for (var i = 0; i < allDivs.snapshotLength; i++) {
      thisDiv = allDivs.snapshotItem(i);
      if(thisDiv.innerHTML.match('stumbleupon\.com\/')) {
        //console.log('FbHC - Cleaning out quiz update #' + ++count_external);
        thisDiv.parentNode.parentNode.parentNode.parentNode.parentNode.style.display='none';
      }
    }
  }

  var remove_youtube=function(thenode) {
    //console.log('FbHC - remove_youtube');
    var allDivs, thisDiv;
    allDivs = xpath(youtube_xpath_query);
    for (var i = 0; i < allDivs.snapshotLength; i++) {
      thisDiv = allDivs.snapshotItem(i);
      if(thisDiv.innerHTML.match('youtube\.com')) {
        //console.log('FbHC - Cleaning out quiz update #' + ++count_external);
        thisDiv.parentNode.parentNode.parentNode.parentNode.parentNode.style.display='none';
      }
    }
  }


  var start_clean=function(_node) {
    //console.log('FbHC - start_clean');
    if(clean_external)
      remove_external(_node);
    if(clean_stumble)
      remove_stumble(_node);
    if(clean_youtube)
      remove_youtube(_node);
  }

  if(location.href.match('\/home\.php')) {
    start_clean(document);
  }
  // Clean routine - end

}) ();