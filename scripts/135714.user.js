// ==UserScript==
// @name            Better Remember password
// @namespace       http://people.opera.com/rijk/opera/scripts/
// @description     Small fix to Rijk van Geijtenbeek's autocomplete fixer.
// @include         *
// ==/UserScript==
/*
Script source:
  Jesse's Bookmarklets collection
  http://www.squarefree.com/bookmarklets/forms.html#remember_password

Changes:
  Made the alert conditional, only shows when there is something to report,
  and when variable 'showalert' is 1.
  Removed the 'onsubmit' removal.
  Simplified alert message.
  This adaption made by Rijk van Geijtenbeek, 2005-03-25.
*/

window.onload = (function(){
  var showalert=0;
  var ca,cea,cs,df,dfe,i,j,x,y;
  function n(i,what){return i+" "+what+((i==1)?"":"s")}
  ca=cea=cs=0;
  df=document.forms;
  for(i=0;i<df.length;++i){
    x=df[i];
    dfe=x.elements;
//    if(x.onsubmit){
//      x.onsubmit="";
//      ++cs;
//    }
    if(x.attributes["autocomplete"]){
      x.attributes["autocomplete"].value="on";
      ++ca;
    }
    for(j=0;j<dfe.length;++j){
      y=dfe[j];
      if(y.attributes["autocomplete"]){
        y.attributes["autocomplete"].value="on";
        ++cea;
      }
    }
  }
})();