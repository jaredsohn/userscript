// ==UserScript==
// @name           Allow tab character in all textareas
// @description    Tired of not being able to type "tab" characters in those text boxes? Fear no longer my friends!
// @version        0.2
// @namespace      #avg
// @include        *
// ==/UserScript==
txts=document.evaluate("//textarea",document,null,4,null);
while(tx=txts.iterateNext()) {
tx.addEventListener("keydown",function(e) {
if (e.keyCode==9 && !e.ctrlKey && !e.altKey) {
 var begin=this.selectionStart, end=this.selectionEnd, top=this.scrollTop;

if(begin==end) {
 parts=[this.value.slice(0,begin),this.value.slice(end)];

 this.value=parts[0]+"\t"+parts[1];
g=parts[0].length+1;
 this.setSelectionRange(g,g);
}
else if(e.shiftKey) {
 parts=[this.value.slice(0,begin),this.value.slice(begin,end),this.value.slice(end)];
 this.value=parts[0]+parts[1].replace(/^\t/gm,"")+parts[2];
 this.setSelectionRange(begin,end+parts[1].split(/\n/).length);
}
else {
 parts=[this.value.slice(0,begin),this.value.slice(begin,end),this.value.slice(end)];
 this.value=parts[0]+parts[1].replace(/^/gm,"\t")+parts[2];
 this.setSelectionRange(begin,end+parts[1].split(/\n/).length);
}


 this.focus();
 this.scrollTop=top;
 e.preventDefault();
}
},false)
}