// ==UserScript==
// @name          autofill
// @namespace     http://zzo38computer.cjb.net/userjs/
// ==/UserScript==

// Allows you to customize autofill of forms and assign keyboard shortcuts.

// Latest version is available at:
//  http://zzo38computer.cjb.net/userjs/autofill.user.js

function page_is(url,rx) {
  url=url.replace(/(?=[{}!(),?*$&;:.^\\])/g,"\\");
  if(rx) url=url.replace(/[\\][*][\\][*]/g,rx);
  return (new RegExp("^"+url).test(window.location));
}

function set_form_text(form,field,value) {
  for(i=0;i<document.forms.length;i++) {
    o=document.forms[i];
    if(o.name==form || "*"==form || "*"+i==form || o.action==form) {
      for(j=0;j<o.length;j++) {
        e=o.elements[j];
        if(e.name+"="+e.value==field || e.name==field) e.value=value;
      }
    }
  }
}

function set_form_check(form,field,value) {
  for(i=0;i<document.forms.length;i++) {
    o=document.forms[i];
    if(o.name==form || "*"==form || "*"+i==form || o.action==form) {
      for(j=0;j<o.length;j++) {
        e=o.elements[j];
        if(e.name+"="+e.value==field || e.name==field) e.checked=value;
      }
    }
  }
}

function set_form_accesskey(form,field,value) {
  for(i=0;i<document.forms.length;i++) {
    o=document.forms[i];
    if(o.name==form || "*"==form || "*"+i==form || o.action==form) {
      for(j=0;j<o.length;j++) {
        e=o.elements[j];
        if(e.name+"="+e.value==field || e.name==field) {
          Id = e.getAttribute("id");
          if(!Id) e.setAttribute("id","accesskey_"+value);
          if(!Id) Id="accesskey_"+value;
          newLabel = document.createElement("label");
          newLabel.setAttribute("for", Id);
          newLabel.setAttribute("accessKey", value);
          o.appendChild(newLabel);
          e.setAttribute("accesskey",value);
        }
      }
    }
  }
}

function set_link_accesskey(url,value) {
  e = document.createElement("a");
  e.setAttribute("href", url);
  e.setAttribute("accessKey", value);
  document.body.appendChild(e);
}

function set_link_autofocus(text) {
  for(i=0;i<document.links.length;i++) {
    o=document.links[i];
    if(o.text==text) o.focus();
  }
}

// This is where you put your codes underneath this comment
