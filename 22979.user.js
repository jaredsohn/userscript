// ==UserScript==
// @name           vB New Topics
// @namespace      http://userscripts.org/forums/2/topics/1801
// @description    Open all forum new topics in tabs
// @include        */forumdisplay.php*
// ==/UserScript==

/*
  Created by Gollum from an idea/suggestion/request at us.o by @Seph_VIII
  Expanded upon by @Mithrandir(us.o)
      - with help from @Dr. Evil(de ff-user-group)
          ... max links to open, conditional button display, timeout delay, extra button styling, windowOpen fallback for GM_openInTabs
   Gollum: added quick element check for vB board, plus x-browser support - tested in Opera(9.25) and IE7(IEPro), plus option to ignore timeout delay.
   
   UPDATE - 2 MARCH 2008
   Added - as suggested by Mithrandir - option to choose beginning post in thread instead of last unread post
   Added a form for changing & saving settings - save for persistence, and/or change for one-off usage
      Had to do some code gymnastics for the form to play nice in IE - creating checkboxes was troublesome
      
    BUGFIX - 4 MARCH 2008
    @fuxxi highlighted maxthreads open error - am i dumb #$%? (only excuse is I was working on 3 versions and got them crossed up)  - fixed
    @Mithrandir reported security error - probably fails because of 'globalStorage' option in "variable save" routines - removed that option, now uses only GM_set/get routines for FF.
*/

(function (){
  if (!document.getElementById('threadslist')) // early return for non-vB boards
    return; // plus it's an Opera fix - ensure we're on the REAL document (wtf! something to do with cookie? setter??)

  /*----------------- USER CONFIGURATION ---------------------------------*/
// configuration
var maxlnks     = 10;     // 0=open all new threads, 10=open first 10 new threads
var showBtnIf   = 2;      // 0=button will always be shown, 5=show only, if there are more than 4 new threads
var oMode       = true;   // =true: show first unread post, =false: show first post/beginning of thread
var useTimeout  = false;  // don't attempt delay on thread-read cookie setting - YMMV - the timeout delay didn't work for me, so =false
var tOut        = 3000;   // set timeout in milliseconds for opening (cookies won't be stored if too low!)
// end configuration

  /*----------------- WHERE TO INSERT OUR CONTROLS -----------------------*/
// where the button and form will be injected
  var VB_INJECT = document.getElementById('inlinemodform').getElementsByTagName('td')[0];

  /*----------------- PERSISTENT DATA  ROUTINES ---------------------------------*/
  // FF/IE set/get/remValue || Opera set/get/rem cookie
  // modified by Gollum to handle IE7PRO, plus add cookieExists? test to 'getValue' cookie code (for Opera, failed [quietly] on non-existant cookie).
//  var namespace="gollum.greg.";var setValue,getValue,remValue;if(window.globalStorage){var D=globalStorage.namedItem(namespace+document.domain);setValue=function(A,B){D.setItem(A,B);};getValue=function(A,C){var B=D.getItem(A);return(B)?B.value:C;};remValue=function(A){D.removeItem(A);};}else if((typeof GM_setValue!="undefined")&&(typeof GM_getValue!="undefined")){setValue=function(A,B){GM_setValue(namespace+A,B);};getValue=function(A,C){var B=GM_getValue(namespace+A,C);return(B)?B:C;};remValue=function(A){GM_setValue(namespace+A,"");};}else if((typeof PRO_setValue!="undefined")&&(typeof PRO_getValue!="undefined")){setValue=function(A,B){PRO_setValue(namespace+A,B);};getValue=function(A,C){var B=PRO_getValue(namespace+A);return(B)?B:C;};remValue=function(A){PRO_setValue(namespace+A,"");};}else{setCookie=function(A,C,B){if(!A){return;}document.cookie=escape(namespace+A)+"="+escape(C)+";expires="+(new Date((new Date()).getTime()+(1000*B))).toGMTString()+";path=/";};setValue=function(A,B){setCookie(A,B,31536000);};getValue=function(A,B){A=(new RegExp(namespace+A+"=([^;]*)")).exec(document.cookie+";");if(!A){return B;};if(A[1]!="undefined"){return A[1];}else{return B;}};remValue=function(A){setCookie(A,"",-10);};}
  // version with 'globalStorage' removed - should negate security issues FOR SOME FF users
  var namespace="gollum.greg.";var setValue,getValue,remValue;if((typeof GM_setValue!="undefined")&&(typeof GM_getValue!="undefined")){setValue=function(A,B){GM_setValue(namespace+A,B);};getValue=function(A,C){var B=GM_getValue(namespace+A,C);return(B)?B:C;};remValue=function(A){GM_setValue(namespace+A,"");};}else if((typeof PRO_setValue!="undefined")&&(typeof PRO_getValue!="undefined")){setValue=function(A,B){PRO_setValue(namespace+A,B);};getValue=function(A,C){var B=PRO_getValue(namespace+A);return(B)?B:C;};remValue=function(A){PRO_setValue(namespace+A,"");};}else{setCookie=function(A,C,B){if(!A){return;}document.cookie=escape(namespace+A)+"="+escape(C)+";expires="+(new Date((new Date()).getTime()+(1000*B))).toGMTString()+";path=/";};setValue=function(A,B){setCookie(A,B,31536000);};getValue=function(A,B){A=(new RegExp(namespace+A+"=([^;]*)")).exec(document.cookie+";");if(!A){return B;};if(A[1]!="undefined"){return A[1];}else{return B;}};remValue=function(A){setCookie(A,"",-10);};}

  /*----------------- CSS for FORM  & THREADS TAB OPEN BUTTON ---------------------------------*/
  var css = [
'/* button and form-display toggle */',
'#btn_wrap {float: left; position: relative; top: -5px; margin-left: 10px; padding: 0 2px 4px; border: 1px solid #eee;}',
'#threads_btn {width: 160px; color: #02176D; background: #DFE0E4; font-weight: bold; font-size: 1em;}',
'#btn_wrap .lbl {margin: 0 2px 0px 10px; font-weight: bold;}',
'#settings_check {position: relative; top: 2px;}',
'/* settings form */',
'#settings_form {float: left; width: 330px; background: #DFE0E4; padding: 2px; font-size: 9px; border: 1px solid #ccc;}',
'#settings_form .grp {float: left; margin: 1px 2px; padding: 2px; border: 1px solid #eee;}',
'#timer_grp {min-width: 50%; margin: 2px 0; padding 1px; border-color: #c8c8c8}',
'#settings_form .lbl {float: left; margin-right: 2px; padding-top: 3px; font-weight: bold;}',
'#maxlnks_inp, #showBtnIf_inp, #tOut_inp {width: 20px; font-size: 9px;}', 
'#tOut_inp {width: 35px;}',
'#save_settings {float: left; margin: 10px 0 0 20px; font-size: 1em;}'
].join('');

if ( typeof GM_addStyle != 'undefined' ) {
  GM_addStyle(css);
} else if ( typeof PRO_addStyle != 'undefined' ) {
  PRO_addStyle(css);
  PRO_addStyle('#btn_wrap {float: none; position: absolute; top: -2px;} #settings_form {margin-top: 10px;}');
} else { // assume?? Opera
  var heads = document.getElementsByTagName('head');
  if ( heads.length > 0 ) {
    var node = document.createElement('style');
    node.type = 'text/css';
    node.innerHTML = css + '#settings_form input {float: right;}';
    heads[0].appendChild(node);
  }
}
  
  /*----------------- SETTINGS FORM ---------------------------------*/
  // form to view/edit/save configuration settings
  function buildForm() {
    var grp, lbl, inp, btn;
    
    var d = document.createElement('div'); // outer form wrapper
    d.id = 'settings_form';
    
    grp = createGroup(d); // wrapper for choosing max tabs to open
    lbl = createLabel(grp, "Open threads:", 'maxlnks_inp', "Maximum threads to open. 0=open all");
    inp = grp.appendChild(document.createElement('input')); // maxLinksInput
    inp.id = 'maxlnks_inp';
    inp.maxLength = 2;
    inp.defaultValue = inp.value = getValue('maxlnks', maxlnks);
    inp.title = "Maximum threads to open. 0=open all";
    addEvent(inp, 'change',
      function(e) {
        maxlnks = eventTarget(e).value;
        document.getElementById('threads_btn').innerHTML = "Open " + ((maxlnks>0 && maxlnks<newposts.length) ? "first "+maxlnks : newposts.length) + " new Posts";
        notSaved();
      }
    , false);
   
    grp = createGroup(d); // wrapper for choosing min threads before displaying button
    lbl = createLabel(grp, "Button display:", 'showBtnIf_inp', "If newposts >= ? show button. 0=always show button");
    inp = grp.appendChild(document.createElement('input')); // showButtonInput
    inp.id = 'showBtnIf_inp';
    inp.maxLength = 2;
    inp.defaultValue = inp.value = getValue('showBtnIf', showBtnIf);
    inp.title = "If newposts >= ? show button. 0=always show button";
    addEvent(inp, 'change',
      function(e) {
        showBtnIf = eventTarget(e).value;
        notSaved();
      }
    , false);
    
    grp = createGroup(d); // wrapper for choosing last or first post
    lbl = createLabel(grp, "Unread only:", 'oMode_check', "Toggle off to open FIRST(beginning) post in a newpost thread");
    if (isIE)
      inp = grp.appendChild(document.createElement('<input type="checkbox">')); // firstPostInput
    else {
      inp = grp.appendChild(document.createElement('input')); // firstPostInput
      inp.type = 'checkbox';
    }
    inp.id = 'oMode_check';
    var x = getValue('oMode', oMode);
    inp.checked = (typeof x != 'boolean') ? eval(x): x;
    inp.title = "Toggle off to open FIRST(beginning) post in a newpost thread";
    addEvent(inp, 'change',
      function(e) {
        oMode = eventTarget(e).checked;
        notSaved();
      }
    , false);
    
    var timergrp = createGroup(d); // wrapper for checkbox and timout input
    timergrp.id = 'timer_grp';
    
    grp = createGroup(timergrp); // wrapper for choosing to use a timeout delay on opening tabs
    lbl = createLabel(grp, "Timer delay:", 'useTimeout_check', "Tabs: off=(normal). on=add a time delay before opening [not convinced this is useful!]");
    if (isIE)
      inp = grp.appendChild(document.createElement('<input type="checkbox">')); // timeoutInput
    else {
      inp = grp.appendChild(document.createElement('input')); // firstPostInput
      inp.type = 'checkbox';
    }
    inp.id = 'useTimeout_check';
    inp.checked = eval(getValue('useTimeout', useTimeout));
    inp.title = "Tabs: off=(normal). on=add a time delay before opening [not convinced this is useful!]";
    addEvent(inp, 'click', 
      function(e) {
        var targ = eventTarget(e);
        useTimeout = targ.checked;
        notSaved();
        if (!useTimeout) {
          targ.parentNode.nextSibling.firstChild.style.color = '#aaa';
          targ.parentNode.nextSibling.firstChild.nextSibling.setAttribute('disabled', true);
        } else {
          targ.parentNode.nextSibling.firstChild.style.color = (isIE) ? '#000' : 'inherit';
          targ.parentNode.nextSibling.firstChild.nextSibling.removeAttribute('disabled');
        }
      }
    ,false);
    
    grp = createGroup(timergrp); // wrapper for choosing length of time delay
    lbl = createLabel(grp, "Timeout delay:", 'tOut_inp', "set timeout in milliseconds for opening (cookies won't be stored if too low!)");
    inp = grp.appendChild(document.createElement('input')); // timerDelayInput
    inp.id = 'tOut_inp';
    inp.maxLength = 6;
    inp.defaultValue = inp.value = getValue('tOut', tOut);
    if (!useTimeout) {
      inp.setAttribute('disabled', true);
      lbl.style.color = '#aaa';
    }
    inp.title = "set timeout in milliseconds for opening (cookies won't be stored if too low!)";
    addEvent(inp, 'change',
      function(e) {
        tOut = eventTarget(e).value;
        notSaved();
      }
    , false);
    
    btn = d.appendChild(document.createElement('button')); // button to save form data for persistence
    btn.innerHTML = "Save settings";
    btn.id = 'save_settings';
    addEvent(btn, 'click',
      function(e) {
        if (e && e.target) e.preventDefault();
        else window.event.returnValue = false;
        
        setValue('maxlnks', maxlnks);
        setValue('showBtnIf', showBtnIf);
        setValue('oMode', oMode);
        setValue('useTimeout', useTimeout);
        setValue('tOut', tOut);
        
        saved()
      }
    , false);
    
    settingsForm = VB_INJECT.appendChild(d);
  }
  
  /*----------------- FORM DATA SAVED? HELPERS ---------------------------------*/
  
  function notSaved() { // highlights the fact that the data has not been permanently saved yet
    if (!settingsForm) return;
    settingsForm.style.border = '1px solid red';
    settingsForm.lastChild.style.color = 'red';
  }
  
  function saved() { // reverse the above highlight
    if (!settingsForm) return;
    settingsForm.style.border = '0px solid green';
    settingsForm.lastChild.style.color = '#02176D';
  }
  
  /*----------------- FORM  BUILD HELPERS ---------------------------------*/

  function createGroup(pe) {
    var g;
    g = pe.appendChild(document.createElement('div')); // maxLinksGroup
    g.className = 'grp';
    return g;
  }
  
  function createLabel(pe, label_text, for_attr, title_text) {
    var l;
    l = pe.appendChild(document.createElement('label')); // maxLinksLabel
    l.appendChild(document.createTextNode(label_text));
    l.setAttribute('for', for_attr);
    l.title = title_text;
    l.className = 'lbl';
    return l;
  }
    
  /*----------------- X - BROWSER HELPERS ---------------------------------*/
  
  /* x-browser event register */
  function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) { elm.addEventListener(evType, fn, useCapture); return true; }
    else if (elm.attachEvent) { var r = elm.attachEvent('on' + evType, fn); return r; }
    else { elm['on' + evType] = fn; }
  }

  /* x-browser detection of event target */
  function eventTarget(e) {
    var targ;
    if (!e) var e = window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
    if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug (from ppk) 
    return targ;
  }

  /* x-browser open tab */
  function openTab(url) {
    if (typeof GM_openInTab != 'undefined') GM_openInTab(url);
    else if (typeof PRO_openInTab != 'undefined') PRO_openInTab(url,2);
    else window.open(url);
  }
  
  /* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */
  /*----------------- BEGIN ---------------------------------*/
  /* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */
  
var isIE = (window.attachEvent && !window.opera) ? true : false;

// settings form reference
var settingsForm = '';

// gather all the newpost links
var newposts = new Array();
var lnks = document.getElementById('threadslist').getElementsByTagName('a');
for (var i=0; i < lnks.length; i++) {
  if (/showthread.php\?goto=newpost/.test(lnks[i].href)) {
    if (oMode) {
      newposts.push(lnks[i].href);
      } else {
      newposts.push(lnks[i].href.replace(/goto=newpost&/, ""));
    }
//    if (i+1 > maxlnks && maxlnks > 0) break;
  }
}

/* container for our button and settings-form toggle */
// firstly adjust the existing button  - room to float our button & checkbox container
VB_INJECT.firstChild.style.cssFloat = 'left';
if (isIE) {
  VB_INJECT.style.position = 'relative';
  VB_INJECT.style.width = '60%';
}

var grp = VB_INJECT.appendChild(document.createElement('div'));
grp.id = 'btn_wrap';

// check if ok to show button
if (newposts.length >= showBtnIf) {
  var btn = grp.appendChild(document.createElement('button'));
//  btn.innerHTML = "&Ouml;ffne " + f + " neue Beitr&auml;ge"; // de-locale
  maxlnks = getValue('maxlnks', maxlnks);
  btn.innerHTML = "Open " + ((maxlnks>0 && maxlnks<newposts.length) ? "first "+maxlnks : newposts.length) + " new Posts";
  btn.id = 'threads_btn';
  addEvent(btn, "click",
    function(e) {
      if (e && e.target) e.preventDefault();
      else window.event.returnValue = false;
      
      if (useTimeout) { // add a delay before/between opening tabs
        var i = 0;
        function inner() {
          if ( (maxlnks > 0 && i > maxlnks) || i > newposts.length-1 )
            clearInterval(timer);
          else
            openTab(newposts[i++]);
        }
        var timer = setInterval(inner, tOut);
      } else { // default - normal tab open
//        for (var i=0; i < (maxlnks == 0 ? newposts.length : maxlnks || newposts.length); i++) // << how the hell was that EVER going to work
        for (var i=0; i < (maxlnks == 0 ? newposts.length : maxlnks > newposts.length ? newposts.length : maxlnks); i++)
          openTab(newposts[i]);
      }
    }
  , false);
}

// toggle for settings display
var lbl = createLabel(grp, "Settings:", 'settings_check', "Show settings form", 'none');
lbl.className = 'lbl';
if (isIE)
  var inp = grp.appendChild(document.createElement('<input type="checkbox">'));
else {
  var inp = grp.appendChild(document.createElement('input'));
  inp.type = "checkbox";
}
inp.id = 'settings_check';
inp.checked = false;
inp.title = "Open/Close settings form";
addEvent(inp, "click", 
  function(e) {
    if (settingsForm) {
      VB_INJECT.removeChild(settingsForm);
      settingsForm = '';
    }
    else buildForm();
  }
, false);

})();