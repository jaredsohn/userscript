// ==UserScript==
// @name           keycheck
// @namespace      facebook_groups
// @include        *www.facebook.com*
// @author         Daniel Fishman
// ==/UserScript==

var isCtrl = 0;

function KeyCheck(e)
{
  //alert(e.keyCode+" "+isCtrl)  
  if(e.which == 18) isCtrl=true;
  else if(e.keyCode==90 && isCtrl==1){
  	makeSafe();
    isCtrl=0;
  }
  else if(e.keyCode==81 && isCtrl==1){
  	makeLive();
    isCtrl=0; 
  }

}

function keyRelease(e){
    if(e.which == 18) {
        isCtrl=0;
        alert(e.keyCode+" "+isCtrl==1);
    }
}

function makeSafe(){
	for(var x=0;x<document.forms.length;x++){
        for (i=0; i<document.forms[x].length; i++){
            doc = document.forms[x].elements[i];
            var type = doc.type;
            if(type =='textarea'){
                var content=doc.value;
                //alert(content);
                doc.className=doc.className.replace(/\benter_submit\b/,'')
                doc.value=content;//prevent facebook for overwriting text already in there
            }            
        }       
	}
	alert('safe typing enabled');
}

function makeLive()
{
	for(var x=0;x<document.forms.length;x++){
        for (i=0; i<document.forms[x].length; i++){
            doc = document.forms[x].elements[i];
            var type = doc.type;                                           
            if(type =='textarea'){
                //alert("cn index="+doc.className.indexOf('enter_submit'));
                if(doc.className.indexOf("enter_submit")<=0){
                    doc.className+=' enter_submit';
                }
            }    
        }       
	}
	alert('Your text area is live -- press enter to save\r\nTo renable safe typing press the alt-z');
}



window.addEventListener('keydown', KeyCheck, true);
window.addEventListener('keyup', keyRelease, true);
//alert('Your comment boxes are now set to allow you to press the enter key without fear.  \r\nIf you want to save a comment, press the ALT key and THEN press enter\r\nTo reenable safe typing press the ctrl key')
