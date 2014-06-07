// ==UserScript==
// @name           Walla Mail +
// @namespace      wallamailfix
// @description    Walla Mail Enhancer
// @include        http://newmail.walla.co.il/*
// @author         Original oria
// ==/UserScript==

// fix document.all because walla is calling it with () instead of []
document.all = function(something){
    if (typeof(document.getElementById(something))=='undefined'){
      try{
        return document.getElementsByName(something)[0];
      }catch(e){
        return null;
      }
    }else{
      return document.getElementById(something);
    }
}

var s=new String(document.body.innerHTML);

// fix empty href links
s=s.replace(/href=""/ig,'');//'href="#"');
// fix bcc width
s=s.replace('width=60','');
// fix send
s=s.replace('wm_handleSend(1)','address_checked=1;wm_handleSend(1)');
document.body.innerHTML = s;

// dont execute on the iframes 'address' and 'attach file'
if (document.location.toString().indexOf('@compose.')<0) {
  // by default save emails to outbox
  setTimeout("document.msgform.saveoutbox.click();document.msgform.saveoutbox.value=1;",100);
  // by default display bcc + fix it's width
  setTimeout("document.all('gBcc').style.display='';document.all('gBcc').style.width='400px';document.all('gBccOpt').style.display='none';",100);
  // fix addresses height
  setTimeout("document.getElementsByTagName('IFRAME')[1].style.position='absolute';document.getElementsByTagName('IFRAME')[1].style.height='300px';document.getElementsByTagName('IFRAME')[1].style.overflow='scroll';",3000);
}

