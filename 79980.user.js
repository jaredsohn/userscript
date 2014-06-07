// ==UserScript==
// @name           Skandiabanken enhancer
// @namespace      example.com
// @include        https://secure.skandiabanken.no/SKBSECURE/Bank/Account/Statement/LatestTransactions.aspx?account=0
// ==/UserScript==
// Add jQuery
//using require in the metablock above will generate a Component is not available error
var el = document.createElement('script');
el.src = 'http://jquery.com/src/jquery-latest.js';
el.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(el);

var $, jQuery;


el.addEventListener("load", function() {
  var win = typeof(unsafeWindow) !== "undefined" ? unsafeWindow : window;
  $ = jQuery =  win.jQuery.noConflict();
  
  onready($); 
  
  
    
}, false);

var total = 0;

function log(s){
    if(typeof console != "undefined" && console.log) {
        console.log(s);
    }


}


function onready(){
    $("#ctl00_MainContentPlaceHolder_ucTransList_boxListTransactions_gridSimpleTransactionList").delegate("td", "click", function (e) {
        
       var $this = $(this);
       var idx = $this.prevAll().length;
       //log(this.tagName+" test" + idx)
       if(idx == 4) {
          if(e.ctrlKey) {
            total = 0;
          } else {
            var nok = +this.innerHTML.replace(/,/g, ".");
            total +=nok;
          }
          log("Totalen er nå kr " + (total.toFixed(2)) );
       }
    })
    

}