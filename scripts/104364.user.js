// ==UserScript==
// @name          notespourleboncoin
// @namespace     http://www.monperrus.net/martin/
// @author        Martin Monperrus
// @description   Permet de prendre des notes sur les articles en vente sur leboncoin.fr
// @date          25 Janvier 2013
// @version       0.2
// @include       http://www.leboncoin.fr/*
// @require       http://www.monperrus.net/martin/ListManager.v1.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

/** Redirecting the log to firebug */
if(unsafeWindow.console){
  console = unsafeWindow.console;
  console.log('log enabled');
} 

/** returns a DIV object containing the UI */
function createContainer(id) {
  var result = $('<div/>');      
  result.css('padding-top','0px').css('margin-top','0px').css('margin-bottom','20px');
  // creating a new list manager
  // and putting it into the container
  // we use a prefix for the key to simulate a namespace
  new ListManager(id).setLabel('Note: ').setAddLabel('[ajout]').setDelLabel('[supprimer]').display(result);  
  return result;
}

// for each result 
$("div.lbc").each(
  function (index, elem) {    
    var id;
    // old version with the label
    // id = 'notespourleboncoin/'+text
    // new version with the url
    id = $(elem).parents('a').attr('href');
    
    // we create a DIV object to contain the listmanager
    createContainer(id).insertAfter($(elem).parents('a'));
  }
    );
    
    // for the result page itself
    $("div.bottomLinks").each(
      function (index, elem) {    
        var id = document.location.toString();
        
        createContainer(id).insertBefore($(elem));    
      }
    );
    
    
    // a last touch of CSS
    $('<style>.ListManager-input{margin-right:10px;} .ListManager-item {margin:0px;} .ListManager-delLink{margin-left:10px;font-size:70%;}</style>').appendTo($('head'));

console.log('end notespourleboncoin');
