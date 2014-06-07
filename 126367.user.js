// ==UserScript==
// @name          Quote Context Fix v2
// @namespace     http://cornhooves.org/ with update from thorgot
// @description   Fix quote button to use post context.
// @match         http://forums.penny-arcade.com/*
// @include       http://forums.penny-arcade.com/*
// ==/UserScript==
(function() {
   var inject = function() {
       jQuery(document).ready(function() {
           if(typeof(GdnQuotes) == 'undefined')
               return;

           Gdn_Quotes.prototype.QuoteResponse = function(Data, Status, XHR) {
		      gdn.inform(Data);

              if (Data && Data.Quote.selector) {
                 var ObjectID = Data.Quote.selector;
                 this.RemoveSpinner();
              } else { return; }
              
              switch (Data.Quote.format) {
                 case 'Html':   // HTML
                    var Append = '<blockquote rel="'+Data.Quote.authorname+'">'+Data.Quote.body+'</blockquote>'+"\n";
                    break;
                    
                 case 'BBCode':
                    var context = '';
                    var matched = /Comment_([0-9]+)/.exec(Data.Quote.selector);
                    if(matched) { context = ";"+matched[1]; }
                    var Append = '[quote="'+Data.Quote.authorname+context+'"]'+Data.Quote.body+'[/quote]'+"\n";
                    break;
                 
                 case 'Display':
                 case 'Text':   // Plain
                    var Append = ' > '+Data.Quote.authorname+" said:\n";
                    Append = Append+' > '+Data.Quote.body+"\n";
                    break;
                    
                 default:
                    var Append = '';
                    return;
              
              }
              
              this.ApplyQuoteText(Append);
           };
       });
   };

   /* inject replacement */
   var script = document.createElement('script');
   script.setAttribute("type", "text/javascript");
   script.appendChild(document.createTextNode("(" + inject + ")();"));
   (document.head || document.body).appendChild(script);
})();
   
