// ==UserScript==
// @name           Wesabe total search results
// @namespace      http://sacah.blogspot.com/2008/09/2nd-greasemonkey-script-for-wesabe.html
// @description    Adds values from search results into Earnings/Spendings
// @include        https://www.wesabe.com/accounts/search*
// ==/UserScript==

(function() {
  // from http://diveintogreasemonkey.org/patterns/match-attribute.html
  function xpath(query) {
      return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  }
  function removeTextNodes(obj) {
    while(obj.nodeType==3) {
      obj=obj.nextSibling; 
    }
    return obj;
  }
  // from http://www.netlobo.com/url_query_string_javascript.html
  function gup(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return results[1].toLowerCase();
  }
  function calc() {
    var spent=earn=addAmount=0;
    var date=xpath("/html//div[@class='txaction_display']/div/div[@class='date']");
    var tags=xpath("/html//div[@class='txaction_display']/div/div/div");
    var amount=xpath("/html//div[@class='txaction_display']/div[@class='amount']/span");
    for(var a=0; a<date.snapshotLength; a++) {
      nS=removeTextNodes(date.snapshotItem(a));
      if(nS.firstChild.nodeType==1) {
        nS=nS.lastChild;
      }
      nS=removeTextNodes(tags.snapshotItem(a));
      if(nS.firstChild.nodeType==1) {
        nS=nS.lastChild;
      }
      var tmpTag=nS.innerHTML;
      tmpTag=tmpTag.replace('Tags:', '');
      tmpTag=tmpTag.replace(/<\/?[^>]+(>|$)/g, "");
      if(tmpTag.indexOf(':')==-1) {
        addAmount=1;
      } else {
        addAmount=0;
        var re=gup('q')+':([0-9]+)';
        var regex = new RegExp( re );
        var newAmount=regex.exec(tmpTag.toLowerCase());
        //var newAmount=tmpTag.match('/'+ gup('q') +':([0-9]+)/g');
        if(newAmount==null) {
          newAmount=0;
        } else {
          newAmount=newAmount[1];
        }
      }
      nS=removeTextNodes(amount.snapshotItem(a));
      if(nS.firstChild.nodeType==1) {
        nS=nS.lastChild;
      }
      if(addAmount==1) {
        if(nS.innerHTML.charAt(0)=='-') {
          spent=spent+(nS.innerHTML.replace('$', '')*1);
        } else {
          earn=earn+(nS.innerHTML.replace('$', '')*1);
        }
      } else {
        if(nS.innerHTML.charAt(0)=='-') {
          spent=spent+(newAmount*1);
        } else {
          earn=earn+(newAmount*1);
        }    
      }
    }
    spent=(Math.round(spent*100)/100)+'';
    earn=Math.round(earn*100)/100;
    spent=spent.replace('-', '');
    var eq=earn-spent;
    eq=eq+'';
    if(eq<0) {
      var col='#F00;">-$';
    } else {
      var col='#18B822;">$';
    }
    var div=document.createElement('DIV');
    div.innerHTML='<div style="border: solid #CFCFCF 1px; padding: 4px; text-align: right;">-$'+ spent +' + <span style="color: #18B822;">$'+ earn +'</span> = <span style="color: '+ col + eq.replace('-', '') +'</span></div>';
    var o=document.getElementById('txaction_list');
    o.insertBefore(div, o.firstChild);
  }
  
  calc();
})();