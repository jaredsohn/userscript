// ==UserScript==
// @id             JSConsole
// @name           JS-Console
// @version        1.0.0.3
// @namespace      
// @author         jaejunks
// @description    In-document, Firefox-like console for Opera.
// @include        http://*/*
// @include        https://*/*
// @run-at         document-start
// ==/UserScript==

/*
Bookmarklet:
javascript:console.jsConsole.toggle()

Opera Command (for keyboard shortcut):
Go to page,"javascript:console.jsConsole.toggle()"
*/

//Adds jsConsole into window.console.
(function(){//console.jsConsole: In-document, FF-like console
 var space,cons,consOut,consPnl,consInp,consInp2,hist=[],histIdx=-1,prevInp='';
 function updWidth(){
  if(show.t){clearTimeout(show.t);show.t=0}
  var a=document.body.offsetHeight<=innerHeight;
  cons.style.maxWidth=innerWidth-(a?16:28)+'px';
  cons.style.paddingRight=(a?18:10)+'px';
  consInp.style.width=(consOut.offsetWidth-consPnl.offsetWidth-12)+'px';
  consInp2.style.width=consInp.style.width;
 }
 function clear(){
  consOut.value='';
 }
 function toSingleLine(){
  consInp.value=consInp2.value;
  consOut.style.height='200px';consInp.style.display='';consInp2.style.display='none';
  consInp.focus();
 }
 function toMultiLine(newLine){
  var a;
  if(newLine){
   a=consInp.selectionStart;
   consInp2.value=consInp.value.substring(0,a)+'\n'+consInp.value.substring(a,consInp.length);
  }else consInp2.value=consInp.value;
  consInp2.style.display='';consInp.style.display='none';consOut.style.height='142px';
  consInp2.focus();
  if(newLine)consInp2.setSelectionRange(a+2,a+2);
 }
 function output(s){
  consOut.value+=s;consOut.scrollTop=consOut.scrollHeight;
 }
 function execute(){
  (function(){
   var xyzzy1=arguments[0].value.trim(),xyzzy2;arguments[0].value='';histIdx=-1;
   if(consInp.style.display){
    consInp.value='';toSingleLine();
   }
   if(!xyzzy1)return;
   if(xyzzy1==='///?'){
    output(
     '======================================='+
     '\n///?      Show this help'+
     '\n///clear  Clear console output'+
     '\n///close  Close console panel'+
     '\n///hist   Show all previous expressions'+
     '\n///keys   Show input keyboard shortcuts\n');
    return;
   }else if(xyzzy1==='///clear'){consOut.value='';return;
   }else if(xyzzy1==='///close'){hide();return;
   }else if(xyzzy1==='///hist'){output(hist.join('\n')+'\n');return;
   }else if(xyzzy1==='///keys'){
    output(
     '================================================================'+
     '\nAll modes:'+
     '\nCtrl-Enter   Toggle single/multi line mode'+
     '\nCtrl-Up      Select previous expression from history'+
     '\nCtrl-Down    Select next expression from history'+
     '\nEscape       Clear input'+
     '\n\nSingle-line input mode:'+
     '\nShift-Enter  Insert new line and switch to multi-line input mode'+
     '\nUp           Select previous expression from history'+
     '\nDown         Select next expression from history'+
     '\nEnter        Evaluate expression'+
     '\n\nMulti-line input mode:'+
     '\nShift-Enter  Evaluate expression\n');
    return;
   }
   if(!xyzzy1.replace(/\n/g,'').trim())return;
   hist.push(xyzzy1);
   if(hist.length>50)hist.shift();
   try{
    xyzzy1=eval(xyzzy1);
    if(typeof xyzzy1!='function')try{
     xyzzy1=JSON.stringify(xyzzy1)
    }catch(xyzzy2){}
    output(xyzzy1+'\n')
   }catch(xyzzy2){output(xyzzy2+'\n')}
  })(consInp.style.display?consInp2:consInp);
 }
 function input(ev){
  function eatKey(){
   ev.stopPropagation();ev.preventDefault();
  }
  switch(ev.keyCode){
   case 13://enter
    if(ev.ctrlKey){//ctrl-enter
     eatKey();
     if(consInp.style.display){//to single-line
      toSingleLine();
     }else toMultiLine();//to multi-line
    }else if(ev.shiftKey){//shift-enter
     if(consInp.style.display){//in multi-line
      eatKey();execute();
     }else{//in single-line
      eatKey();toMultiLine(1);
     }
    }else if(!consInp.style.display){//in single-line
     eatKey();execute();
    }
    return;
   case 0x26://up
    if(!ev.shiftKey&&((consInp.style.display&&ev.ctrlKey)||!consInp.style.display)){
     eatKey();histIdx--;
     if(histIdx<0)histIdx=hist.length-1;
     if(histIdx<0)return;
     if(hist[histIdx].indexOf('\n')>=0){//multi-line entry
      toMultiLine();consInp2.value=hist[histIdx];
     }else{//single-line entry
      toSingleLine();consInp.value=hist[histIdx];
     }
     prevInp=hist[histIdx];
    }
    return;
   case 0x28://down
    if(!ev.shiftKey&&((consInp.style.display&&ev.ctrlKey)||!consInp.style.display)){
     eatKey();histIdx++;
     if(histIdx>=hist.length)histIdx=0;
     if(histIdx>=hist.length)return;
     if(hist[histIdx].indexOf('\n')>=0){//multi-line entry
      toMultiLine();consInp2.value=hist[histIdx];
     }else{//single-line entry
      toSingleLine();consInp.value=hist[histIdx];
     }
     prevInp=hist[histIdx];
    }
    return;
   case 27://esc
    eatKey();histIdx=-1;
    if(consInp.style.display){//in multi-line
     consInp2.value='';
    }else consInp.value='';//in single-line
    return;
   default:
    if((consInp.style.display?consInp2.value:consInp.value)!==prevInp)histIdx=-1;
  }
 }
 function show(){
  if(!window.jsConsole){
   cons=document.createElement('div');cons.id='jsConsole';
   cons.innerHTML='<style>\
#jsConsole{display:block;position:fixed;left:0;right:0;bottom:0;border:none;border-top:2px solid#000;padding:4px;background:#fff;color:#000;font-size:10pt;font-weight:normal;line-height:1.15em;text-transform:none}\
#jsConsole *{border:none;padding:0;background:none;color:#000;font-size:10pt;font-weight:normal;line-height:1.15em;text-transform:none}\
#jsConsole textarea,#cons input{display:block;padding:0 2px;font-family:monospace}\
#jsConsole textarea{height:75px}\
#jsConsole input{padding:1px 2px}\
#jsConsole .pnl{position:absolute;right:4px}\
#jsConsole button{height:auto;padding:0 2px}\
</style>\
<textarea readonly style="width:100%"></textarea>\
<div class=pnl><button title="Clear output">Clear</button> <button title="Close console">X</button></div>\
<input /><textarea style="display:none"></textarea>';
   consOut=cons.children[1];consPnl=cons.children[2];consInp=cons.children[3];consInp2=cons.children[4];
   consPnl.children[1].onclick=clear;consPnl.children[1].onclick=hide;consInp.onkeypress=input;consInp2.onkeypress=input;
  }
  if(!space)space=document.createElement('div');
  if(!cons.parentNode){
   if(!consOut.value)consOut.value+='Type "///?" for help.\n';
   updWidth();toSingleLine();document.body.appendChild(cons);
   space.style.minHeight=cons.offsetHeight+'px';document.body.appendChild(space);addEventListener('resize',updWidth,false);
   show.t=setTimeout(function(){
    updWidth();consInp.focus();
   },20);
  }
 };
 show.t=0;
 function hide(){
  if(!window.jsConsole||!jsConsole.parentNode)return;
  removeEventListener('resize',updWidth,false);document.body.removeChild(cons);document.body.removeChild(space);
 };
 console.jsConsole={
  show:show,
  hide:hide,
  toggle:function(){
   if(window.jsConsole){
    console.jsConsole.hide()
   }else console.jsConsole.show()
  }
 };
})();