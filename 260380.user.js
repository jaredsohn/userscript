// ==UserScript==
// @id             Youtube_tab_title_cleaner
// @name           Youtube tab title cleaner
// @description    Youtube tab title without the play prefix '> ' or the suffix ' - YouTube'.
// @version        2.0.2
// @author         REVerdi
// @namespace      http://userscripts.org/users/67570
// @copyright      2014+, REVerdi (http://userscripts.org/users/67570)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include        http*://www.youtube.com/*
// @run-at         document-end
// ==/UserScript==


/* TESTED ONLY ON FIREFOX */


/*
Sorry, but I'm not a programmer, at least for now :).
Please, let me know the fixes and improvements made to this script.
*/


(function(){



var cleanTitle = 'xxx';

function cleanTabTitle() {
//  alert('document.title = ' + document.title + '\n' +
//        'HEAD.TITLE.text = ' + document.getElementsByTagName('HTML')[0].getElementsByTagName('HEAD')[0].getElementsByTagName('TITLE')[0].text + '\n' +
//        'HEAD.META.content = ' + document.getElementsByTagName('HTML')[0].getElementsByTagName('HEAD')[0].getElementsByTagName('META')[0].content);
  //tabTitle = '[> ]cleanTitle - YouTube'
  var tabTitle = document.title;
  if ( tabTitle != cleanTitle ) {
    cleanTitle = tabTitle;
    if ( tabTitle.substr(tabTitle.length-10,10) == ' - YouTube' ) cleanTitle = cleanTitle.slice(0, cleanTitle.length - 10 );
    if ( tabTitle.charCodeAt(0) == 9654 ) cleanTitle = cleanTitle.slice(2, cleanTitle.length );
    document.title = cleanTitle;
  }
}



cleanTabTitle();



var observer1 = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    cleanTabTitle();
  });
});
var config1 = { attributes: true, characterData: true, childList: true};
var target1 = document.getElementsByTagName('HTML')[0].getElementsByTagName('HEAD')[0].getElementsByTagName('TITLE')[0];
if( target1 != null ) observer1.observe(target1, config1);



var observer2 = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    cleanTabTitle();
  });
});
var config2 = { attributes: true, characterData: true, childList: true};
var target2 = document.getElementById('content');
if( target2 != null ) observer2.observe(target2, config2);



})();