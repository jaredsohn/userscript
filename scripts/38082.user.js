// ==UserScript==
// @name			Password Saver - Auto Fill On
// @author			ROX
// @namespace		http://www.Rachini.com
// @description		Password Saver - Auto Fill On
// ==/UserScript==
var newURL ='javascript:(function(){var%20ca,cea,cs,df,dfe,i,j,x,y;%20function%20n(i,what){return%20i+'%20'+what+((i==1)?'':'s')}ca=cea=cs=0;%20df=document.forms;%20for(i=0;%20i<df.length;%20++i){x=df[i];%20dfe=x.elements;%20if(x.onsubmit){x.onsubmit='';%20++cs;%20}if(x.attributes['autocomplete']){x.attributes['autocomplete'].value='on';%20++ca;%20}for(j=0;%20j<dfe.length;%20++j){y=dfe[j];%20if(y.attributes['autocomplete']){y.attributes['autocomplete'].value='on';%20++cea;%20}}}alert('Removed%20autocomplete=off%20from%20'+n(ca,'form')+'%20and%20from%20'+n(cea,'form%20element')+',%20and%20removed%20onsubmit%20from%20'+n(cs,'form')+'.%20After%20you%20type%20your%20password%20and%20submit%20the%20form,%20the%20browser%20will%20offer%20to%20remember%20your%20password.')})();';
content.document.location.replace(newURL);