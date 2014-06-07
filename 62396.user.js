// ==UserScript==
// @name          Unlock Protected Password Form Field
// @description   Removes the protection on form-fields so that the password can be saved by the Password Manager.
// @include       *
// ==/UserScript==

(function(){var ca,cea,cs,df,dfe,i,j,x,y;function n(i,what){return i+" "+what+((i==1)?"":"s")}ca=cea=cs=0;df=document.forms;for(i=0;i<df.length;++i){x=df[i];dfe=x.elements;if(x.onsubmit){x.onsubmit="";++cs;}if(x.attributes["autocomplete"]){x.attributes["autocomplete"].value="on";++ca;}for(j=0;j<dfe.length;++j){y=dfe[j];if(y.attributes["autocomplete"]){y.attributes["autocomplete"].value="on";++cea;}}}alert("Removed autocomplete=off from "+n(ca,"form")+" and from "+n(cea,"form element")+", and removed onsubmit from "+n(cs,"form")+". After you type your password and submit the form, the browser will offer to remember your password.")})();