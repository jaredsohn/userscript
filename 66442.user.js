// ==UserScript==
// @name Simple Form Saver
// @namespace SFS92
// @description Provides a button at the top left, click it to save or to fill in HTML forms.  If the form is more than just a search input field, eg, google is ignored.  Also possible to selectively fill-in forms automatically only on selected pages.
// @icon http://bit.ly/19cxEJN
// @require  http://code.jquery.com/jquery-latest.js
// @require http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @resource jqueryuiCss http://code.jquery.com/ui/1.10.3/themes/vader/jquery-ui.css 
// @include *
// @version  1.6.9
// @run-at   document-start
// ==/UserScript==


//addEventListener("load", function() {GM_platform_wrapper("Simple Form Saver", "1aFdtRM", false);});

var old_GM_log=GM_log;
log=function(t) { console.log(t); if (!Chrome) old_GM_log(t);}; 
GM_log=log;
log2=log;
log2=function(){}
log=function(){};
GM_platform_wrapper("Simple Form Saver", "1aFdtRM", false, 2); // for Google Chrome.

log("SFS startup, window.name "+window.name+" "+unsafeWindow.name);

if (/SFS:KeepFrame/.test(window.name)) {
   window.name=window.name.replace(/SFS:KeepFrame/,"");
   window.onbeforeunload = function(){
      return 'Are you sure you want to leave?  You may want to set Simple Form Saver values from GM menu for frame.';
   };
}
//
// History
//
// updated Sept 2013.  v1.6.3 Can add further clicks to page
// updated Sept 2013.  v1.5.1 Address/Notebook (alt-a), unhide password & Export/Import added.
// updated Sept 2013.  v1.5.0 Updated to coax dynamic forms to work.
// updated for firefox 22.0
// updated March 2013.  Fixed Chrome issue with recording a click.  v.1.3.2
// updated March 2013.  Restricted regexp page matching. v.1.3.1
// updated March 2013.  Dialog window in new version of browser was tiny so text was unviewable, using own versions of dialog boxes, alert, confirm and prompt.  v.1.3.0
// updated February 2011.  See userscripts.org description page for this script regarding change in tick box sizing.  Changes only by request.
// updated January 2011.  Updated for Greasemonkey 0.9, javascript's basic function, eval(),  no longer works fully in GM.
// updated January 2011.  Updated for Firefox 4.
// updated December 2010.  Allows editing of auto-click target element.
// updated 17 October 2010.  Google Chrome platform adaptation.
// updated 7 October 2010.  Added feature allowing data to be pasted directly into a form.  See last part of description below.
// updated 1st of March 2010.  Auto delete an element on a page, select record mouse click and do control-shift-click on the element.  Remove iframes.
// updated 5th of February 2010.  Can fill in pop-ups and other elements that appear during use of a page.
// updated 29th of Janaury 2010.  Facility for editing form storage manually.
// updated 27th of Janaury 2010.  Problem with duplicate input names solved.
// updated 25th of Janaury 2010.  Handling of input name changes and multiline textareas added.
// updated 18th of Janaury 2010.  Added ability to record a mouse click on a page with autoplay.
// updated 16th of Janaury 2010.  Enable selective fill-in of forms on user selected pages.
// updated 16th of Janaury 2010.  Enable iframes with forms to work, and forms that auto update on change.

//
// Globals
//

var inputs_on_page=0, text_inputs=0, no_of_inputs=0, special_ta;
with (window.document)
   var selects=getElementsByTagName("select"), tareas=getElementsByTagName("textarea"), rinputs=getElementsByTagName("input");
var inputs=[], input_names={}, old_elems=[];
var automatic=false;
var reddot=true, suspend_replay=true, full_icon=false, element_to_highlight, logos=[];
var hash_host_list = new Object();
var page_key, site, page_object, regexp_page_match, href, form_data, click, recording;
var img, img2, link;
var iframe;
var uwin=unsafeWindow;
var auto_fill=false, no_element_for_click=true, prev_msg, msg, unhide, init_fin, await_click;
var ws=window.setTimeout, write_once=true; //noscript can block timeout.
var widener="\n___________________________________________________\n"
var bullet="\u26ab", bullet_tab="\u26ab\t", tab_bullet="\t\u26ab",separator=":\u200e:", mdash_char = "\u2014", 
bullet_regexp=/\s*\u26ab\s*/g, 
//  bullet_regexp=RegExp("\s*\u26ab\s*", "g"); 
tick = "\u2714"; ex="\u2717"
var data_version=1.2;
var awaiting_an_option;
String.prototype.trim = function () {    return this.replace(/^\s*|\s*$/g,"") };
String.prototype.splitOnce = function (r) {   r=RegExp(r.source||r, "g"); var a=r.exec(this); return [ this.substring(0, a?a.index:""), this.substr(r.lastIndex) ] ; };
String.prototype.tail = function (n) {  var last_pos = this.length - n; if (last_pos < 0) last_pos=0;  return ( n < this.length ? "..." : "" )+this.substr(this.length-n); }
Date.prototype.slashFormat=function(){var dd=this.getDate();if(dd<10)dd='0'+dd;var mm=this.getMonth()+1;if(mm<10)mm='0'+mm;var yyyy=this.getFullYear();return String(mm+"\/"+dd+"\/"+yyyy)}
Date.prototype.ampmFormat=function() { var ap = "am", hour=this.getHours(); if (hour>11) ap = "pm";  if (hour   > 12)  hour = hour - 12; if (hour   == 0)  hour = 12; return hour+":"+this.getMinutes()+" "+ap;}

log("Form saver, at "+location)

try {
   //   addEventListener("abort", function(){log("ERROR");});
   //   addEventListener("load", function() {
   addEventListener("DOMContentLoaded", function() {
      main();
      if (GM_getValue("paste_shortcut", false)) {
	 if (uwin.focusControl)
	    uwin.focusControl.blur();
	 else document.activeElement.blur();
      }
   },0);
} catch(e) { GM_log(e); throw(e) }

//
//Mainline
//
function main() {
   with (window.document) { // init data not there at document-start
      selects=getElementsByTagName("select"), tareas=getElementsByTagName("textarea"), 
      rinputs=getElementsByTagName("input");
   }

   if (window.parent != window) {
      iframe=true;
      //    return;
   }
   readPersistentData();
   log("suspend_replay: "+suspend_replay);
   log("page_object.automatic "+(page_object&&page_object.automatic));
   log("startup, form_data: "+uneval(form_data)+", page key:"+page_key+", regexp match: "+regexp_page_match
       + ", inputs "+inputs.length+", jq ips "+$("input").length);
   registerMenus();
   if (hash_host_list.msg || hash_host_list.prev_msg) {
      msg=hash_host_list.msg;
      prev_msg=hash_host_list.prev_msg;
      if ( ! checkIfIntervalLongEnough() && msg) 
	 window.status="Form saver msg:   "+(msg);
      hash_host_list.prev_msg=msg;
      prev_msg=msg;
      if ( ! msg) delete hash_host_list.prev_msg;
      delete hash_host_list.msg;
      persistData();
   }
   if (inputs.length==0 && ! (form_data||click)) {
      log("No inputs");
      return;
   }
   if (getXPathElem())
      no_element_for_click=false;
   if ( page_object.automatic || (click && ! suspend_replay)) {
      addIcon(true); //will register menus
      if (checkIfIntervalLongEnough()) {
	 auto_fill=true;
	 if (page_object.automatic !== false && (page_object.automatic || ! no_element_for_click)) {
	    fillForm(false, true);
	 }
	 log("interval passed, Filled form now replay click."+click);
	 replayClick();
	 inOutSet();
	 auto_fill=false;
      }
   }
   if (page_object.click_evidence) 
      delete page_object.click_evidence.sealed;
   
   if ( ! link )
      addIcon(true); //will register menus
   if (/Simple Form Saver replayed/.test(msg)) {
      inOutSet(true);
   }   
   //keepEyeOnIcon();
   if (click && suspend_replay && ! page_object.automatic===true    ) { GM_log("Suppressed replay on newly loaded page, auto-replay is suspended, to replay click icon.") }
   window.onbeforeunload=function(e) { 
      if (recording) { 
	 var dialog=$("#sfsconfirm3"), openeddialogs;
	 if (dialog.length && dialog.parent().css("display")!="none") 
	    openeddialogs=true;

	 log("onbeforeunload "+openeddialogs+" "+e.target.tagName+" cc "+await_click+" "+uneval(e)+" act:"+document.activeElement.tagName);
	 var roll=""; for (i in e) roll+=i+" "+e[i]+"\n";
	 var pn=e.explicitOriginalTarget.parentNode;
	 log(" "+e.eventPhase+" "
	     +e.originalTarget+" "
	     +(pn?pn.tagName+" ":"")
	     +e.timeStamp);
	 var pev={}
	 pev.target=e.explicitOriginalTarget.parentNode;
	 if (await_click) setTimeout(function() { log("call cl"); recordClick(pev);}, 100);
	 if(await_click || openeddialogs) {
	    var p=prompt_interruption, note="No dialogs open"; //!!! for jdialog???
	    if (prompt_interruption) { prompt3(p.a,p.b,p.c); }
	    log("block exit, call confirm");
	    confirm(dialog.parent().css("display")+".  The page on which you are recording has in fact detected the click and wishes to unload.  "
		    +"However, you must complete interaction with the recording dialogs beforehand."
		    +"\n\nPlease finish with recording dialogue in other window and ONLY then click OK or Cancel here in this window.  A window may flash up momentarily, just ignore it.  "
		   );
	    interrupted=true;
	 }
      }//end if recording
   } //end beforeunload
   window.addEventListener("unload", function(){
      //readPersistentData();
      log("unload");
      //alert("unload");
      var click_evidence=local_getValue("click_evidence", "");
      page_object.click_evidence=click_evidence;
      if (page_object.click_evidence) {
	 if ( page_object.click_evidence.prejudice) 
	    delete page_object.click_evidence;
	 else
	    page_object.click_evidence.sealed=true;
	 local_setValue("click_evidence", page_object.click_evidence);
	 log("unload "+page_object.click_evidence+ " "+page_object.click_evidence.prejudice);
	 //persistData();
      }
   }, false) //end unload
   if (click || page_object.automatic) {
      uwin.addEventListener("DOMNodeInserted", handlePopups, false);
   }
   if (GM_getValue("paste_shortcut", false)) {
      addEventListener("keypress", function(e) {
	 if (e.charCode==118 && e.ctrlKey) //112 is p
	    if ( ! /INPUT|TEXTAREA/.test(e.target.tagName)) {
	       //log("ctrl v");
	       special_ta=document.createElement("textarea");
	       special_ta.id="speciality";
	       document.body.appendChild(special_ta);
	       special_ta.focus();
	       setTimeout(function() { log("tout"); 
				       pasteIntoForm();
				       document.body.removeChild(special_ta);
				       special_ta=null;
				     }, 2)
	    }
	 return true;
	 
      },0)
   }
   init_fin=true;
}
//
// End Mainline
//
// function keepEyeOnIcon(){
//    alert("keepEyeOnIcon"+$("#hostFormsListButton"));
//    if (!document.getElementById("hostFormsListButton")) {
//       setTimeout(keepEyeOnIcon, 5000);
//       toggleIcon();toggleIcon();
//    }
// }
function saveFormData() {  try {
   var output_string = "";
   var  i, plicate={}, saved_data={}, nothing=true;
   if (regexp_page_match && page_object.form_data) saved_data=page_object.form_data;
   log("save data, beg "+inputs.length);
   for(i=0; i < inputs.length; i++) {
      var input=inputs[i];
      var value=input.value;
      var type=input.type;
      if ( value == ""  && /text|textarea/.test(type))
	 continue;
      nothing=false;
      var name=input.name;
      if ( ! name) name="yyNoName"+i;
      var checked=input.checked;
      value = value.replace(/\r\n/g,"\u200d");
      value = value.replace(/\n/g,"\u200d");
      if (type=="checkbox") {
	 name+=mdash_char+value;
	 if (checked) 
	    value=tick;
	 else
	    value=ex;
      }
      if ( ! plicate[name]) 
	 plicate[name]=[];
      plicate[name].push(value)
      
      if ( type == "radio")
	 if ( ! checked ) {
	    plicate[name].pop()
	    continue;
	 }
      if (  type  ==   "select-multiple"  ) { 
	 options_list = []
	 for ( var index=0; index < input.options.length; index++ )
	    if ( input.options.item(index).selected )
	       options_list.push(index);
	 value = options_list;
      }
      if (  type  ==   "select-one"  ) {
	 if (input.selectedIndex==-1) continue;
	 for ( var index=0; index < input.options.length; index++ )
	    if ( input.options.item(index).selected )
	       value=index;
	 if (value.substr)
	    value=input.selectedIndex;
      }	    
      log("Save On  i:"+i+".  Elem_name: "+name+".   type: "+type+".  elem_val:"+value+"."+", typeof value: "+typeof value+", ply: "+plicate[name].length);
      saved_data[name]={};
      saved_data[name].v=value;
      saved_data[name].i=i;
      if (type=="password")
	 saved_data[name].pw=1;
      if (plicate[name].length > 1)
	 saved_data[name].p=plicate[name];//.slice();
      else
	 delete saved_data[name].p;
      log("Saved Data, val: "+saved_data[name].v+".   i: "+saved_data[name].i);
   } // end for
   var request=true;
   if ( ! nothing ) {
      if (iframe && ! regexp_page_match) 
	 prompt2("***Simple Form Saver***\n\nPage stored: "+page_key+widener+"This form is part of a subpage (an iframe) within the current window.  "
		 +"It is controlled via the icon whereas any forms not in the subpage but in the main window are controlled from the GM menu."
		 +"\n\nYou can get status information via the icon or GM menu and check to which page it is refers (first line of the status information window) "
		 +"\n\nCancel and change the page name below or enter a pattern for which the form data shall be stored.  Any page matching this pattern can then be used for form filling.  Use just the site name for it to be in effect for entire site."
		 +"\n\nHit OK to save as usual for the page: "+page_key
		 , page_key
		 ,function(reply) {
		    
		    if (reply && reply != page_key) {
		       delete hash_host_list[page_key];
		       page_key=reply
		       page_object.form_data=saved_data;
		       log("po "+page_object+"cnt "+ countMembers(page_object));
		       persistData();
		       window.status="Forms saved for this page"
			  +", # input fields stored: "+i+".  At: "+page_key;
		    }
		 }) //end function(reply) 
      page_object.form_data=saved_data;
      log("po "+page_object+"cnt "+ countMembers(page_object));
      persistData();
      window.status="Forms saved for this page"
	 +", # input fields stored: "+i+".  At: "+page_key;
   } //endif ! nothing
   else 	    
      window.status="Nothing on forms to save";
}  catch(e) { alert("Cannot save form, reload and try again.\n\nError was:"+e+" "+e.lineNumber);throw(e);}
			   log("win.status "+window.status+", fd: "+form_data+", po.fd: "+ page_object.form_data+", sd: "+saved_data);
			} //end function

function fillForm(once_off, auto, tmp_data) {  try { //also Click replay if necessary
   log("fillForm(once_off: "+once_off+", auto: "+ auto+", tmp: "+uneval(tmp_data));
   var saved_data= tmp_data ? tmp_data : form_data;
   var name, saved_obj, elem_name = "";
   var changed=null, kick, result=true, fill_msg;
   var type, value,  indeterminate, plicate={};
   var input, option;
   //function setMember(obj, member, value) {
   function setMember(member, value) {
      if ( member != value) changed=input.name||true;
      return;
      /* if (eval(obj+"."+member) != value) { */
      /*   changed=true; */
      /*   var js=obj+"."+member+"='"+value+"'"; */
      /*   if (typeof value=="boolean") */
      /*     js=obj+"."+member+"="+value; */
      /*   eval(js); */
      //}
   }
   var plicate={};
   var finputs=inputs;
   if (once_off) finputs=once_off;

   for(var i=0; i<finputs.length; i++) {
      input=finputs[i]; this.input=input;
      name = elem_name = input.name;
      type=input.type;
      elem_value=input.value;
      value=undefined;
      //fakeClick(input);
      log("Fill, On  i:"+i+".  Elem_name: "+elem_name+".   type: "+type+".  current elem_val: "+elem_value)
      if ( ! elem_name) name="yyNoName"+i;
      if (type=="checkbox")
	 name=elem_name+mdash_char+elem_value;
      saved_obj=saved_data && saved_data[name];
      log("saved_data["+name+"]="+(saved_obj ? ".v="+saved_obj.v+". (datatype:"+(typeof saved_obj.v)+"), .i= "+saved_obj.i + ".  .p= "+saved_obj.p : " null"))

      if (saved_obj && (saved_obj.i != undefined) && saved_obj.i  != i  && ! once_off) { 
	 if (finputs[saved_obj.i] && finputs[saved_obj.i].name == elem_name) {
	    indeterminate=true;
	 }
	 else {
	    saved_obj.i=i; 
	 }
      }
      if (saved_obj && saved_obj.p ) {
	 log("plicate "+saved_obj.p);
	 if ( ! plicate[name] && saved_data[name].p) {
	    if (!saved_data[name].p.slice)
	       saved_data[name].p = convert_obj_to_array(saved_data[name].p)
	    plicate[name]=saved_data[name].p.slice(); // copy 
	    plicate[name].pop();  // top of stack is also the one in form_data.
	 }
	 value=plicate[name].shift();
	 if (value && indeterminate)
	    indeterminate=false;
      }
      if ( ! value && saved_obj && saved_obj.v) value=saved_obj.v;
      log("value: "+value+", indeterminate "+indeterminate);
      if (indeterminate) { indeterminate=false; value=undefined;} // i and saved_obj.i don't match
      if ( value === undefined && ! once_off && type !="radio") {
	 var res=findRenamedInput(name, i);  //checks for value in saved .i index
	 value=res[0];
	 if ( value) { 
	    fill_msg="The "+ordinal(i+1)+' input field, "'+name+'", may have been renamed, try re-saving form information if it is not an automatic renaming by the server.  '
	    console.log(fill_msg+"It was filled in with the previously saved value, " 
			+value+", for the "+ordinal(i+1)+" field,"+ordinal(res[2])+","+res[1]+".  Page: "+page_key);
	 }
      }
      if (value===undefined) {
	 if (type == "radio" ) {
	    // 	input.value="";
	    value=saved_obj?saved_obj.v:"";
	 }
	 else { 
	    if (type=="checkbox" ) {
	       if (input.checked)
		  changed=true;
	       input.checked=false;
	    }
	    log("Skip "+i);
	    continue;
	 }
      } //end if undefined
      //log("Check type, value: "+value+", type: "+type);
      if (value && typeof value == "string") value = value.replace(/\u200d/g, "\r\n");
      if (type=="checkbox") {
	 if (value== tick) 
	 { setMember(input.checked, true); input.checked=true;}
	 else
	 {setMember(input.checked, false); input.checked=false;}
      } 
      else if ((type == "radio") && elem_value == value)
      {setMember(input.checked, true); input.checked=true}
      else if (type  !=  "radio") {
	 if (finputs.tagName=="TEXTAREA") {
	    if (value != elem_value)
	       changed=true;
	 }
	 else 
	    if (type  ==  "select-multiple" )   { 
	       options_list=value;
	       for (var index=0; index < input.options.length; index++) {
		  if (input.options.length <= index ) { result=false; continue }
		  if ( RegExp ("\\b"+index+"\\b").test(options_list)   )  
		  { setMember(input.options.item(index).selected, true); input.options.item(index).selected=true;}
		  else
		  { setMember(input.options.item(index).selected, false); input.options.item(index).selected=false;}
	       }
	    }
	 else if (  type  ==   "select-one"  ) { 
	    log(" Select, saved index "+value+".  Current selected Index: "+input.selectedIndex+" of "+input.options.length+".  .value "+input.value);
	    if (input.options.length <= value) {  result=false; continue }
	    var index, set_select;
	    try { if (input.selectedIndex!=value) {changed=true;input.selectedIndex=value; } } catch(e){}
	    for ( index=0; index < input.options.length; index++ )
	       if ( index == value) {
		  setMember(input.options.item(index).selected, true); 
		  input.options.item(index).selected=true;
		  option=input.options.item(index);
		  //fakeClick(input.options.item(index));
	       }
	 }
	 else { 
	    setMember(input.value, value); 
	    if (value.slice) input.value=value.slice(0,value.length/2);
	    else input.value=value;
	    //getAnonymousNodes The getAnonymousNodes method retrieves the anonymous children of the specified element.
	    //only visible in dom inspector (red in color, beneath INPUTs at first as DIV with a BR then when filled as DIV with direct text.
	    //Live dynamic inputs need coaxing, test in 1.5.0:
	    input.focus();         try{
	       moveCaretToEnd(input);    }catch(e){}
	    var evt = document.createEvent("KeyboardEvent"), evt2=document.createEvent("KeyboardEvent"), evt3=document.createEvent("KeyboardEvent");
	    //evt.initKeyEvent("keypress", true, true, null, "U+0008", 0, "");
	    if (FireFox) {
	       evt.initKeyEvent ("keydown", true, true, window,   0, true,    false,  false,  8,            0); //8 backspace
	       evt2.initKeyEvent ("keyup", true, true,  window,   0, true,    false,  false,  8,            0); //8 backspace
	       evt3.initKeyEvent ("keypress", true, true, window,   0, true,    false,  false,  8,            0); //8 backspace
	    }
	    else {
	       evt.initKeyboardEvent ("keydown", true, true, window,   0, true,    false,  false,  8,            0); //8 backspace
	       evt2.initKeyboardEvent ("keyup", true, true,  window,   0, true,    false,  false,  8,            0); //8 backspace
	       evt3.initKeyboardEvent ("keypress", true, true, window,   0, true,    false,  false,  8,            0); //8 backspace
	    }
	    input.dispatchEvent(evt);
	    input.dispatchEvent(evt2);
	    input.dispatchEvent(evt3);
	    
	    setTimeout(function(sinput, svalue) { 
	       //log("setTimeout Filler set:"+sinput.name+"="+svalue+"."); 
	       sinput.value=svalue;}, 50, input, value); // 50, input, value parameters passed to setTimeout function stack, 50 is timer.  To add to eventlistener extra param needed.
	    //input.value=value;
	    //log("last setMember "+value);
	 }
      } //end if type != radio
      log("Set value of input["+i+"].type: "+type+", saved value is:"+value + ".  Current value: "+input.value+ ". seloption: "+input.selectedIndex +".  Changed: "+changed);
      if (changed) {  // trick to simulate event if (changed && false) !!
	 kick=changed;
	 changed=false;
	 var pseudo_event = window.document.createEvent("MouseEvents");// create event
	 pseudo_event.initMouseEvent("change", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	 pseudo_event = window.document.createEvent("MouseEvents");// create event
	 //fakeClick(input);
	 //if (option) { fakeClick(option);option=null;}
      }
   } // end for inputs
   var write_msg=(msg?msg+" ":"")+"Filled in forms"
      +(once_off ? " for dynamic element on "+page_key : " at "+page_key )+".  "
      +( ! result? "Bounds error.  " : "") +( kick ? "changed ( "+kick+"...)" : "No changes were necessary.  ")
      +(fill_msg ? fill_msg : "");
   window.status=write_msg;
   GM_log(write_msg);
   old_elems=inputs.slice(0);
   if ( result && ! once_off && ! auto ) {
      log("Filled form, replay from filler as manual ");
      replayClick(true);
   }
   return result;
} catch(e) { alert("Cannot fill-out form, reload and try again.\n\nError was: "+e+" "+e.lineNumber); throw(e);}
					    }

function moveCaretToEnd(el) {
   el.focus();
   if (typeof el.selectionStart == "number") {
      el.selectionStart = el.selectionEnd = el.value.length;
   } else if (typeof el.createTextRange != "undefined") {
      var range = el.createTextRange();
      range.collapse(false);
      range.select();
   }
}


function registerMenus(full_menus) {
   //
   // GM menus
   //
   switch(this.phaseMenus) {
   case undefined:
      if (this.done==2) return; 

      GM_registerMenuCommand( "========Simple Form Saver======", function(){});
      
      GM_registerMenuCommand( "Save/Re-save Form",
			      function() {
				 readPersistentData();
				 if ( inputs.length==0)
				    return;
				 useCorrect_page_object();
				 saveFormData();
				 if ( ! link )
				    addIcon(true);
				 setLive();
				 inOutSet();
			      }, "","","F" );
      
      GM_registerMenuCommand( "Record next mouse click on document",
			      function() { 
				 log("ask confirm "+FireFox);
				 readPersistentData();
				 if (click) { 
				    confirm3("A click has been previously recorded, hit OK to delete it and re-record, or Cancel to make addition clicks or abort", function(reply) { 
				       if (!reply) {
					  log("Reply:"+reply+"."+typeof reply+" "+(!reply));
					  prompt3("Please enter the path (XPath) for the additional item to be clicked, eg, /html/body/div[1]/div, for XPath see console while element highlighting is selected by you when recording a first click.","",
						  function(reply){ 
						     if (reply==null) { GM_log("No extra click recorded");return; }
						     if (!click.further_clicks) click.further_clicks=[];
						     click.further_clicks.push(reply.trim());
						     var xpath=click.further_clicks[click.further_clicks.length-1];
						     var celem=uwin.document.evaluate(xpath,uwin.document,null,6,null).snapshotItem(0);
						     GM_log("Extra click is on:"+celem.tagName+", "+celem.textContent);

						     persistData();
						  });
					  return;
				       }// !reply
				       confirmClickRecording()
				      }); // end confirm3 CB

				 }//end if click
				 else 
				    confirmClickRecording();
			      }, "", "", "M");    //end GM_registerMenu
      
      GM_registerMenuCommand( "Get Form Status & Settings",
			      function() { 
				 readPersistentData();
				 alert3(getStatusInfo());
				 if (element_to_highlight) element_to_highlight.style.borderStyle="none"; 
			      }, "","","G");  

      GM_registerMenuCommand( "Toggle Auto-Click-Replay function on all pages "
			      +(suspend_replay ? "[disabled]": "[enabled]"),
			      function() { 
				 readPersistentData();
				 if (suspend_replay) suspend_replay=false;
				 else suspend_replay=true;
				 persistData();
				 window.status="Auto click replay is now "+(suspend_replay ? "suspended.  ": "on.  ");
				 alert3(window.status);
			      }, "","","u");  


      GM_registerMenuCommand( "Icon for Form Saver pages on/off, toggle "+(reddot?"[on]":"[off]"),
			      function() { 
				 readPersistentData();
				 toggleIcon();
				 persistData();
				 window.status="Form Saver Icon "+(reddot ? "on": "off");
			      });    
      /* if( ! FireFox)  PROBlem on Chrome, only localstorage is available so imported data cannot be seen when visiting other websites*/
      // export also.  Storing it as uneval or member in window.name fails when "back" is selected.
      /*   GM_registerMenuCommand("Import Form Data", function(){ */
      /* 	 var users_input=prompt(widener+"\nTo import raw forms' data paste here and click OK.\n\nTo get raw data on Firefox, look in about:config for the name 'hostFormsList', copy its value here." , ""); */
      /* 	 if (users_input != null) GM_setValue('hostFormsList', users_input); */
      /* 	 alert(GM_getValue('hostFormsList')); */
      /* 	 readPersistentData(); */
      /* 	 persistData(); */
      /*     }) */
      GM_registerMenuCommand("Paste Data Into Form", pasteIntoForm, "", "", "P");


      GM_registerMenuCommand("Clear the Forms on the Page", function() {
	 readPersistentData();
	 for(var i=0; i < inputs.length; i++) {
	    var input=inputs[i];
	    if (input.selectedIndex != undefined) { input.selectedIndex=-1; input.value=-1; }
	    if (input.checked !== undefined ) 
	       input.checked=false
	    input.value="";
	 }
      }, "", "", "C");
      
      GM_registerMenuCommand( "List of pages with saved form information ",
			      function() { 
				 readPersistentData();
				 var roll="", len=0;
				 for (var i in hash_host_list) {
				    var fd=true;
				    if (hash_host_list[i].form_data) {
				       for (var j in hash_host_list[i].form_data)
					  len++;
				       var sizeof=uneval(hash_host_list[i].form_data).length;
				       roll+="\n"+i+ "; "+len+" fields, "+sizeof+" bytes";
				    } else fd=false;
				    if (hash_host_list[i].click)
				       roll+=( fd ?  " (" : "\n" + i  + ", " )  + " click path: "+hash_host_list[i].click.xpath.tail(30)+( fd ? ")" : "." ) ;
				 }
				 var sizeof=uneval(hash_host_list).length;
				 //bigAlert(widener+(roll? roll: "none")+"\n \n"+"Size of store: "+Math.round(sizeof/1000)+"k.");
				 alert3(widener+(roll? roll: "none")+"\n \n"+"Size of store: "+Math.round(sizeof/1000)+"k.");
			      });    
      GM_registerMenuCommand( "Export/Import all form data", exportImport);
      GM_registerMenuCommand("Open Forms' Address/Notebook, alt-a", formsAddressBook, "", "", "A");
      GM_registerMenuCommand("Unhide passwords [once-off]", unhidePasswords, "", "", "A");
      addEventListener("keyup", function(e) {
	  //GM_log("Keyup: charcode "+e.charCode +", keycode"+e.keyCode+", alt "+e.altKey+", ctrl "+e.ctrlKey);
	  if (e.keyCode!=65 || ! e.altKey) return true;// alt-a
	  formsAddressBook();
	}, 0);
      
      this.phaseMenus=1;
      break;
   case 1:
      if (full_menus) {
	 registerPageMenus();// ------------>
	 this.phaseMenus=2;
      }
      break;
   }
   function registerPageMenus() {

      GM_registerMenuCommand( "                       --------------------------------------------------", function(){});
      
      GM_registerMenuCommand( "Fill-in Form",
			      function() { 
				 readPersistentData();
				 if (form_data) {
				    fillForm();
				    inOutSet();
				 }
				 else
				    window.status="No form data to fill";
				 //    persistData(); !!
			      }, "","","O");
      
      GM_registerMenuCommand( "Delete stored Form info for this page",
			      function() { 
				 readPersistentData();
				 var request, page_str="\nPage: "+ page_key + (regexp_page_match ? " (regexp match)." : ".") ;
				 if (click && form_data)
				    confirm3(page_str+"\n\nTo delete click-replay & form data for this page, choose 'OK'.  "
					     +"\n\nTo delete only the click-replay or to abort, choose 'Cancel'",
					     function(request){
						if (request)  { page_object={}; wrapup(); }
						else 
						   confirm3(page_str+"\n\nOk to delete click recording? ", 
							    function(request) {
							       if (request) { delete page_object.click; wrapup();}
							       else return;
							    });
					     });
				 else 
				    if (click || form_data)
				       confirm3(page_str+"\n\nOk to delete form date for this page?",
						function(request) { 
						   if (request) {
						      page_object={}
						      wrapup();
						   }
						   else
						      return;
						}); // end if clk||frm
				 function wrapup(){
				    inOutSet();
				    window.status="Deleted "+(request?"all stored ":"only click-replay")+" info for: "+page_key;
				    persistData();
				    setLive();
				 }
			      });//end GM_registerMenuCommand()    

      GM_registerMenuCommand( "Toggle Automatic form fill & Click-replay on this page ["+(page_object.automatic?"on "+(page_object.automatic=="on" ? "[implicit]":""):"off")+"]", function () { 
	 readPersistentData();
	 if (page_object.automatic) { //toggle
	    page_object.automatic=false;
	    persistData();
	    window.status="Ending automatic fill-in of forms at page: "+page_key;
	    alert3("Ending automatic fill-in of forms at page: "+page_key);
	 }
	 else {
	    page_object.automatic=true;
	    confirm3("Page: "+page_key+widener+"\n\nForm data saved by the user shall "
		     +"be filled in for this page automatically from now explicitly on.  Auto replay of Clicks on this page will override general setting."
		     +"\n\nCancel to explicitly disable auto-fill/click-replay on this page"
		     , function(request) {
			if ( ! request)
			   page_object.automatic=false;
			else page_object.automatic=true;
			window.status="Automatic filling of forms on page "+page_key;
			alert3("Automatic filling of forms is explicitly on at page "+page_key);
			inOutSet();
			persistData();
		     } );
	 }
      }//end cb function
			      , "","","" );
      
      GM_registerMenuCommand("Edit stored Form data", function() {
	 editFormData();
      }, "", "", "E");

      GM_registerMenuCommand("Edit Click Element data", function() {
	 readPersistentData();
	 editClickData();
	 persistData();
      }, "", "", "E");


      GM_registerMenuCommand( "_____________________________________", function(){});
   }
}

function convert_obj_to_array(obj) {
   var ar=[];
   for (var  i in obj) if ( ! isNaN(i) ) ar[i]=obj[i];
   return ar;
}

function bigAlert(str) {
   lines=str.split("\n");
   var entries=lines.length-5;
   var roll=entries+" entries.  "+(entries>30?"Pages: "+( (entries/30^0) + 1 ) : "" ) + "\n", i=0;
   while (lines.length) {
      while ( i < 30) { roll+=(lines[0]?lines[0]+"\n":""); lines.shift(); i++ }
      alert2(roll, 0.7);
      roll=widener, i=0;
   }
}

function fixMargins() { // see trickle function
   var results = document.evaluate("//*[contains(@style,'margin-left')]", document, null, 6, null);
   var item, len=results.snapshotLength;
   var margin, parent, pos;
   if (len > 0) 
      for(var i=0; item=results.snapshotItem(i), i < len;  i++ ) {
	 margin=parseInt(item.style.marginLeft);
	 //log("item margin "+margin);
	 parent=item.offsetParent;
	 pos=item.offsetLeft;
	 //log(" item pos "+pos);
	 if (pos < 200 && margin > 5) {
	    item.style.setProperty("margin-left",(Math.max(0, margin - 35) )+"px","important");
	    //log("Fixed margin for "+item+" "+item.id+", "+item.className +", from "+margin+".  At: "+page_key);
	 }
      }
   return;
}

function toggleIcon() {
   if (reddot) {
      reddot=false
      removeIcon();
   }
   else {
      reddot=true
      addIcon(true);
   }
}

function removeIcon() {
   if (link.parentNode == window.document.body)
      window.document.body.removeChild(link);
}

function addIcon(make, override) {
   if (link && (reddot || override)) {
      if (window.document.body) window.document.body.insertBefore(link, window.document.body.firstElementChild)
      img.style.display="";
      setTimeout(fixMargins, 1000); !!!!fixMargins
      //   link.style.cssFloat="left";
      //   img.style.cssFloat="left";
   }
   else if ( ! link && make)
      makeReddot();
}

function makeReddot(parent) { // makes a "link" object as: <B><IMG></IMG></B> and registers mouse events on it.
   var lk;
   if (! parent)
      parent=window.document;
   if ( ! link)
      link=parent.createElement("b");
   var lk=link;
   img = parent.createElement("img");
   //img2 = parent.createElement("img");
   //  img2.setAttribute("style", "float: left; z-index:999 ! important; position: relative; margin-right: 20px;margin-left: 20px; ");
   //  img2.setAttribute("style", "left: -2px; top: 5px; z-index:999 ! important; position: fixed; margin-right: 20px;margin-left: 20px; ");
   //img2.setAttribute("style", "left: 3px; top: 5px; z-index:999 ! important; float: left; position: relative; visibility: hidden; margin-right: 12px;");
   img.id="SFSimg"; //img2.id="SFSimg2";
   //img2.height=10; img2.width=19;
   lk.appendChild(img);
   //lk.appendChild(img2);
   addIcon();
   checkPageLayout();!!!checkPageLayout
   setLive();
   // var pos=getXY(img); 
   //  try {
   //   var el = document.elementFromPoint(pos.x, pos.y);
   //   trickleUp(el);
   //   trickleUp ( document.elementFromPoint(pos.x, pos.y + 50)) } catch(e){};
   lk.id="hostFormsListButton";
   lk.className="SFSButton";
   var dragged=0;
   $(img).draggable({ stop: function( event, ui ) { event.dragEv=true;
						    event.ui=ui;
						    mouseDownCB(event);},
		      drag: function( event, ui ) { dragged++;}
		    });
   // $(lk).draggable();
   //$(reddot).draggable();

   lk.addEventListener("contextmenu", function(e) {  // right click
      readPersistentData();
      inOutSet();
      e.preventDefault();   
      e.stopPropagation();
      window.document.body.setAttribute("onClick", "return false;"); //!!!
      useCorrect_page_object();
      //if (form_data) {
      saveFormData();
      setLive();
      alert3("Simple Form Saver, save data complete.");
      return false;
   }, true);
   // lk.addEventListener("mouseup", function(e) { 	    
   //    e.preventDefault();   	    
   //    e.stopPropagation(); 
   //    return false;
   // }, true); //mousedown->context->mouseup;
   lk.addEventListener("mouseup", function(e) { // click 
      mouseDownCB(e)}, true);
   function mouseDownCB(e) {
      log("md on lk "+e.button+", dragged?:"+dragged+", from drag:"+e.dragEv+" new pos: "+(e.ui?uneval(e.ui.position):""));
      if(e.dragEv) {
	 readPersistentData();
	 page_object.position=e.ui.position;
	 persistData(); 
	 return;
      }
	 // e.preventDefault();   
	 // e.stopPropagation();
	 if (e.button==0 ) {        
	    readPersistentData();
	    inOutSet();
	    // e.preventDefault();   
	    // e.stopPropagation();
	    if (form_data)
	    fillForm();
	 else {
	    useCorrect_page_object();
	    if (click) replayClick(true);
	    saveFormData();
	    setLive();
	    persistData(); 
	 }
	 //persistData(); //!!
	 log("done but 0");
      }
      if (e.button==1) { // middle click
	 readPersistentData();
	 if ( ! iframe) 
	    alert3(getStatusInfo());
	 else {
	    //window.open(location.href);
	    top.location.href = document.location.href ;
	    top.window.name+="SFS:KeepFrame";

	    // confirm2(getStatusInfo()+"\n\n"+"Click 'Cancel' to edit this subpage's stored data", function(reply) {
	    // if ( ! reply ) {
	    //   editFormData();
	    //   persistData();
	    //} } );
	 } //end else
	 if (element_to_highlight) element_to_highlight.style.borderStyle="none"; 
	 return false;
      }
      return false;
   } //end mouseDownCB()
}

function setLive() {
   if ( ! link)
      return;
   var redSquareRing="data:image/gif;base64,R0lGODlhCQAMAIABAP8zM////yH5BAEKAAEALAAAAAAJAAwAAAIPhI+pwdvJgpPwoTiz2rsAADs=";
   redSquareRing="data:image/gif;base64,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"
   var redDot_img="data:image/gif;base64,R0lGODlhBwAHAIABAP8AAP///yH5BAEAAAEALAAAAAAHAAcAQAILTICGy6351mlgygIAOw==";
   redDot_img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH2QcREzYMParL2gAAAIhJREFUGJV10DEOglAQBNAXCg6lVsZTaaOlYq8H8AAqvfFIIDWuhd+ABCaZZJOdndldOixQ4pVYYmWADVrECHd9p3dOFMQr8UTkX2GLOdwRRyIGPHSuN2gQzYiw7oR1Nlx2ChkecBlpnrvyCUtp8SLFVcT+/5jZb2I78Z4W62HSIl1Xo8K17/QByVJNP9L1aWcAAAAASUVORK5CYII=";
   redDot_img="data:image/gif;base64,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";
   redDot_img="data:image/gif;base64,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";
   redDot_off="data:image/gif;base64,R0lGODdhCAAIAMIEAO9mZvBmZu9nZu9oZ////////////////ywAAAAACAAIAAADD0g00UotBiirvXjaB5pQCQA7";
   redDot_off="data:image/gif;base64,R0lGODlhCAAIAMIEAO9mZvBmZu9nZu9oZwAAAAAAAAAAAAAAACH5BAEKAAQALAAAAAAIAAgAAAMPSDTRSi0GKKu9eNoHmlAJADs=";
   link.addEventListener("mouseover",function(){ 
      //log("mo "+form_data); this.style.opacity=0.7;
      if ( ! (form_data||click)) img.src=redDot_img;  
      //else img.style.height=img.style.width=20;
   }, false);
   link.addEventListener("mouseout",function() {
      this.style.opacity=1; 
      if ( ! (form_data||click) ) img.src=redDot_off;
      //else img.style.height=img.style.width=12;
   }, false);
   //    link.style.opacity=".6";
   link.style.opacity="1";
   link.style.rightMargin="10px";
   with (img.style) {
      cursor="pointer";
      position="fixed";
      top="5px";
      left="18px";
      if (page_object && page_object.position) {
	 top=page_object.position.top+"px";
	 left=page_object.position.left+"px";
      }
      //	cssFloat="left";
      setProperty("display", "inline", "important");
      setProperty("z-index", "2147483644", "important");
      //zIndex=9999;
   }
   /* img2.src="data:image/gif;base64,R0lGODlhBwAHAIABAP8AAP" */
   /* img2.width=12; */
   /* img2.height=12; */
   log("setlive");
   if (form_data || click) {
      registerMenus(true);
      img.src=redSquareRing;
      log("setLive has Form data");
      with (img.style) {
	 setProperty("border","", "important");
  	 setProperty("border-style","outset", "important");
	 borderWidth=".23em";
	 opacity=1.0;
	 borderColor="rgba(200, 200, 200, .9)";
	 // img.height=12;
	 // img.width=12;
	 height="14.4px"; //".6em"
	 width="12px"; //".5em"
	 height = ! form_data ? 10 : 12; //"1.0em" : "1.5em";
	 width=height;  //!form_data ? "1.0em" : "1.5em";
	 link.title="Click to Fill in Form (&/or replay a recorded click).  Right click to Save form.  Drag n Drop to move icon."
	    +"  Middle click "+(iframe?"to open iframe in own window/tab in order to allow access to GM settings for this part of the page."
				:"to get forms' status info.")
	    + (iframe ? "  (Within iframe: "+location.href+")." : "" ) + "  Simple Form Saver, GM script.";
	 link.setAttribute("noautohide","true");
      }
      //img2.style.display="inline";
      //img2.style.setProperty("border-style", "none", "important");
      full_icon=true;
   } 
   else { // no form data, nor click
      log("setLive, no form data");
      if (click)       registerMenus(true);
      img.src= redDot_off; 
      img.height=img.width=10;
      with (img.style) {
	 height="";
	 width="";
	 // height=".5em"
	 // width=".5em"
	 if (!click) {
	    borderStyle="none";
	    borderWidth="";
	    //if(!click) 
	    setProperty("border","none", "important");
	    link.title="Click once to save form data "+(click?"or to replay a click":"")+"; middle-click to get forms status info."
	       + (iframe ? "  (Within iframe)." : "" ) +"  Can drag and drop to move icon.  See options to remove.  Added by GM script, Simple Form Saver.";
	 }
      }
      //img2.style.display="none";
      full_icon=false;
   }
   if (reddot==false)
      img.style.display="none"
   else
      img.style.display=""
   // $(img).draggable();
   // $(reddot).draggable();
}

function inOutSet(set) {
   if ( full_icon 
	|| ( ! form_data && click ) 
	|| set
      ) {
      if ( ! img.style.borderWidth)
	 img.style.borderWidth=".1px";
      if (!this.prev) {
	 img.style.setProperty("border-style", "inset", "important");
	 this.prev=true;
      }
      else {
	 img.style.setProperty("border-style", "outset", "important");
	 this.prev=false;
      }
   }
}

function checkPageLayout(){
   var logo, p, gp; logos=getByIdOrClass("logo-img-2", "logo", "gh-log", "p-logo", "mw-panel", "logocont");
   for( var i =0; logo=logos[i],  i < logos.length; i++ ) {
      logo.style.setProperty("margin-left", "0px", "important");
      // if (p && p.parentNode && p.parentNode.style) p.parentNode.style.setProperty("margin-left", "0px", "important");
      // if (p && p.style) p.style.setProperty("margin-left", "0px", "important");
      logo.style.setProperty("z-index", "0", "important");
      if ( ! checkPageLayout.count) { checkPageLayout.count=10;}
      logo.addEventListener("DOMAttrModified", checkMargins, 0);
   }
   return;
}

function checkMargins(e){
   log("checkMargins");
   if (e.target != this) return;
   if ( this.style.marginLeft[0] != 0) this.style.setProperty("margin-left", "0px", "important");
   if ( ! -- checkPageLayout.count ) 
      for( var j =0; logoj=logos[j], j < logos.length; j++ ) 
	 logoj.removeEventListener("DOMAttrModified", checkMargins, 0);
}

function findRenamedInput(name, i, saved_value) 
{
   var n, result, saved_data=page_object.form_data;
   for (n in saved_data) {
      if ( i == saved_data[n].i ) {
	 result=saved_data[n].v
	 break;
      }
   }
   return [result, n, i ];
}

function getElementsByTagNames(list,obj, full) {
   if (!obj || ! obj.getElementsByTagName) var obj = window.document;
   var tagNames = list.split(',');
   var resultArray = new Array();
   if (obj.tagName && list.match(obj.tagName.toLowerCase())){
      resultArray.push(obj);
   }
   for (var i=0;i<tagNames.length;i++) {
      var tags = obj.getElementsByTagName(tagNames[i]);
      for (var j=0;j<tags.length;j++) {
	 if (  tags[j].type   
	       &&   !   /^(submit|hidden|image|reset|button)$/.test( tags[j].type.toLowerCase() ) 
	       && ! (tags[j].disabled == true) || full  ) {
	    resultArray.push(tags[j]);
	 }
      }
   }
   var testNode = resultArray[0];
   if (!testNode) return [];
   if (testNode.sourceIndex) {
      resultArray.sort(function (a,b) {
	 return a.sourceIndex - b.sourceIndex;
      });
   }
   else if (testNode.compareDocumentPosition) {
      resultArray.sort(function (a,b) {
	 return 3 - (a.compareDocumentPosition(b) & 6);
      });
   }
   return resultArray;
}

function chopLongString(form_string) {
   if (form_string.length > 1700)   form_string=form_string.replace(/[\t\n]/g," ").replace(/\u26ab/g,tab_bullet).replace(/\t/g,"")
   return form_string;
}

function getStatusInfo() {
   var data= form_data, n, list="";
   for (n in data)
      if (data[n].p)
	 list+=n+",\t";
   if (list) list=list.substring(0, list.length-2)
   var page_list=null;
   if ( ! form_data) { //////////////////////////////////////
      page_list=bullet_tab;
      //	var tinputs = getElementsByTagNames('input,textarea,select', null, true);
      var tinputs = getElementsByTagNames('input,textarea,select');//was showing submit buttons with no text.
      for(var i=0; i<tinputs.length; i++) {
	 var inp=tinputs[i];
	 var type=0, option=0;
	 if (inp.tagName =="INPUT")
	    type=inp.type
	 else {
	    type=inp.tagName
	    option="";
	    if (inp.tagName=="SELECT" && Number(inp.value)) {
	       var options=inp.options;
	       option="\t\t(~"+options.item(inp.selectedIndex).textContent.replace(/[\n\t(  )]/g,"")+")\t";
	    }
	 }
	 var val=inp.value;
	 var style=window.document.defaultView.getComputedStyle(inp, null)||{};
	 var visibility=( (style.display=="none" || style.visibility=="hidden") ? " (invisible)" : "");

	 page_list+=(inp.name?inp.name:"null")+"::"
	    +(val? ( inp.type=="password" && ! unhide ? val[0] + "..." + val[val.length-1]+"["+val.length+"]" : val        )
	      :"null")
	    +(option?option:"\t\t\t\t")+"\t"+type+visibility+"\n"+bullet_tab;
      } // end for inputs[].
      page_list=page_list.substring(0,page_list.length-2);
   } // end if ! form_data ///////////////////////////////////////
   var ip_names="";
   for (var i in input_names) ip_names+=i+", "; ip_names=ip_names.substr(0, ip_names.length-2);
   var form_string=page_list || formDataToFromString(true);
   form_string=chopLongString(form_string);
   log("get xpath ");
   click_elem=getXPathElem();
   var forms_info =
      ( form_data ? "Previously saved values and names are listed below" 
	: "Page Values and form names have not been saved for this page")
      +" (format: name ["+mdash_char+"default]::value"+( form_data ? "":"\t\tType of (name::value)")+")."
      + (form_data  ? "\n\n"+bullet_tab+form_string : "\n\n"+form_string+"" )
      +  (list ? "\n\nThere are duplicates whose values may differ from the above for the input(s) named:\t "+list+"."  : "")
   var settings_info=""
      +"Names of all inputs: "+ip_names
      +"\n\nAutomatic form filling on this page "
      + (page_object.automatic ? "is on.  " :  (page_object.automatic !== false ? "has not been turned on, and is off.  " : "and click-replay, have been explicitly disabled.  "))
      +(click ? "\nClick auto-"+(click.ctrlShift?"delete":"replay")+", is set for"
	+(click.own_href == "any" ? " any page with this path.  " :  " only this specific page.  ")
	+"Page's element (XPath) to be auto-"+(click.ctrlShift ? "deleted":"clicked")+" is:\n\n\t\t"+ ( ! (click_elem && click_elem.xx) ? page_object.click.xpath  : page_object.click.xxpath + " as xpath" ) +""
	: "Nothing to replay on this page.  " )
      + ( click && ! click_elem
	  ? " (the element is not currently on this page" + (click.href ? " but has href, " + click.href : ""  )  +  ")." 
	  : ( click && (href == click.own_href || click.own_href == "any" )
	      ? (click?"\n\nThe element is present on the page.\nIts value and text is: "+click_elem.value+" "+click_elem.textContent+", it's href is:"+click.own_href : "none")
	      : (click?", the element is on page but it is for another webpage: \n\t\t"+click.own_href : "none" )))
      +(click && click.onclick_js? "\n\t\tJava to replay: "+ click.onclick_js    : "")
      +(click && click.further_clicks? "\n\nFurther clicks are on elem(s) (XPath(s)): "+click.further_clicks.join(", "):"")
      + "\n\n"+ (suspend_replay ? "Click auto-replay is suspended in general." : "Click auto-replay on all pages is not suspended.")
      + (inputs.length ? "\n\nNumber of useable input areas on page (some may currently be hidden): "+(inputs_on_page) : "")
      +"\nIcon status is: "+(reddot ? "show.": "don't show.")
      +(iframe ? "\nHTML Frame." :"");
   var status="Page "
      + ( (form_data || click) ?  "stored: " : " not stored: ")
      + page_key + (regexp_page_match ? "  (matches as regexp within, "+regexp_page_match+", specifically)." : ".") + widener;
   if (form_data)
      status +="\n\n"+forms_info+"\n\n"+settings_info;
   else { 
      if (page_list)
	 status+="\n"+settings_info+"\n\n"+forms_info;
      else
	 status+="\n"+settings_info;
   }
   if (click && click_elem) {
      element_to_highlight=click_elem;
      with (element_to_highlight.style) { borderColor= "red"; borderWidth= "10px" ; borderStyle= "solid" ; }
   }
   
   var flen=window.frames.length;
   if (flen) status+="\n\n"+"Window contains "+flen+" iframe(s), please use icon to fill or save forms within iframes and not the GM menu.";

   return status;
}

//function getXPath(elt, counting) { 
//     function getElementIdx(elt) {
// 	var count = 1;                     fails to provide eg, div[1] when it is first div with other, evaluate otoh will fiond all nextSiblings of a div without a number.
// 	for (var sib = elt.previousSibling; sib ; sib = sib.previousSibling)	{
//             if(sib.nodeType == 1 && sib.tagName == elt.tagName)	
// 		count++
// 	}
// 	return count;
//     }
//     var path = "";
//     for (; elt && elt.nodeType == 1; elt = elt.parentNode)    {
//    	idx = getElementIdx(elt);
// 	xname = elt.tagName.toLowerCase();
// 	if (idx > 1 || ! elt.parentNode) {
// 	  if (elt.id && ! counting && ! /[0-9]{3,}/.test(elt.id) )
// 		xname+="[@id='"+elt.id+"']"
// 	    else 
// 		 xname += "[" + idx + "]";
// 	}
// 	path = "/" + xname + path;
//     }//end for
//     return path;	
// }

function getXPath(elt, counting) {
   function getElementIdx(elt) {
      var count = 0; // zero meaning only tag of that type here.
      for (var sib = elt.previousSibling; sib ; sib = sib.previousSibling)	{
	 if(sib.nodeType == 1 && sib.tagName == elt.tagName)	{
	    if (count==0) count=1;
	    count++;
	 }
      }
      if (count==0)
	 for (var sib = elt.nextSibling; sib ; sib = sib.nextSibling)	{
	    if(sib.nodeType == 1 && sib.tagName == elt.tagName)	{
	       count=1;break; //1 signalling 1 of many
	    }
	 }
      return count;
   }
   var path = "";
   for (; elt && elt.nodeType == 1; elt = elt.parentNode)    {
      idx = getElementIdx(elt);
      xname = elt.tagName.toLowerCase();
      if (idx > 0) {
	 if (elt.id && ! counting && ! /[0-9]{3,}/.test(elt.id) )
	    xname+="[@id='"+elt.id+"']";
	 else 
	    xname += "[" + idx + "]";
      }
      path = "/" + xname + path;
   }
   return path;	
}

function getXPathElem() {
   if ( ! click) return;
   var snap=uwin.document.evaluate(click.xpath,uwin.document,null,6,null), xx, xpresult;
   log("Called evaluate on "+click.xpath+", results: "+snap.snapshotLength+" pagekey: "+page_key);
   var elem=snap.snapshotItem(0);
   if (snap.snapshotLength > 1 || snap.snapshotLength == 0) {
      snap=uwin.document.evaluate(click.xxpath,uwin.document,null,6,null);
      xx=true;
   }
   if (snap.snapshotLength > 0) 
      xpresult=snap.snapshotItem(0);
   if (!xpresult) log("No xpath result, try id and class if singular, id: "+click.id+", class: "+click.className+".");
   if (!xpresult && click.id) { xpresult=document.getElementById(click.id); if (xpresult) xpresult.classed=click.id;}
   if (!xpresult && click.className) {
      xpresult=document.getElementsByClassName(click.className);
      if (xpresult.length==1) { xpresult=xpresult[0]; xpresult.classed=click.className;} else xpresult=undefined;
   }
   if (xpresult && xx) xpresult.xx=true;
   log(" got xp: "+xpresult);
   return xpresult;
}

function useCorrect_page_object() {
   if ( ! regexp_page_match ) return;
   log("cfm");
   var reply=confirm( "This page's form data is already stored under "
		      + page_key + " (as regexp).  It matches the current page, "+regexp_page_match+"." + widener
		      +"\n\nActual page matched a more general page on which form data was previously stored."
    		      +"\n\nClick 'OK' to save under general page that is already stored."
    		      +"\n\nClick 'Cancel' to save only for this specific page."  )
   if ( reply ) return;
   reply=site+window.document.location.pathname;
   var po=hash_host_list[reply]
   if ( ! po) po=new Object(); 
   hash_host_list[reply]=po;
   //po.click=click; // copy old data?
   persistData();
}

function persistData() {
   hash_host_list["data_version"]=data_version;
   hash_host_list["suspend_replay"]=suspend_replay;
   hash_host_list["reddot"]=reddot;

   if (page_object && countMembers(page_object))
      hash_host_list[page_key]=page_object;
   else 
      delete hash_host_list[page_key]
   updateVars();
   var stringed=uneval(hash_host_list);
   GM_setValue('hostFormsList', stringed);
   log("PerSIST end ");
   if (page_object) log("poauto "+page_object.automatic);
   write_once=true;    
}

function readPersistentData(origin) {
   //    if ( write_once == false) return;
   var data;
   data=GM_getValue('hostFormsList'); 
   //log("readPersistentData "+(!data)+" "+origin);
   if (data) {
      try { hash_host_list = eval(data) } catch(e) { 
	 var etext=e+"";
	 if (etext.indexOf("CSP") == -1) {
	    alert("Simple Form Saver ERROR, "
		  +"dumping bad data, all form data cleared,  data corrupted: "+e
		  +".  Simple Form Saver DUMP "+data); 
	    hash_host_list={};
	 }
	 else GM_log("CSP error");//security at some sites?
      }
      if (hash_host_list["data_version"] >= 1) { // have new data default to false or empty then no rev change needed.
	 suspend_replay=hash_host_list["suspend_replay"];
      }
      if (hash_host_list["data_version"] < data_version) {
	 window.status="Simple Form Saver database format increment "+data_version+".  Consider saving some forms again or of reverting versions if problems are encountered";
	 GM_log("Simple Form Saver database changed.  Consider saving forms again if problems encountered");
      }
   }
   if (countMembers(hash_host_list) == 0)   {
      hash_host_list["suspend_replay"]=suspend_replay;
      hash_host_list["reddot"]=reddot;
   }
   updateVars();
   write_once=false;
   //log("Read Persist  key: "+  page_key + "\n\nPage data:\n "+uneval(page_object.form_data))
}

function updateVars() { //called after reading and before writing underlying data.
   site=getSite();
   page_key=site;
   if (page_key) {
      try { // pathname gives file after site name but before any additional stuff eg, after a '?' in long href.
	 page_key+=window.document.location.pathname; } catch(e) { page_key+=window.document.title.substring(0,10);}
   }
   else
      page_key=window.document.title.substring(0,40);
   
   checkForInputs();
   getMatchingPageObject();
   form_data=page_object.form_data
   click=page_object.click;
   suspend_replay=hash_host_list["suspend_replay"];
   reddot=hash_host_list["reddot"];
   //log("updated vars, form_data is: "+form_data+", click:"+click+", key: "+page_key);
}

function getMatchingPageObject(key_in) { //dual function updates global vars or returns value;
   var key=key_in||page_key;
   var po=hash_host_list[key];
   var regexp_match=false;
   if ( ! po) {
      for(var i in hash_host_list) { // i as regexp in longer strings site,page_key
	 if (i.match("/")) continue;// only bare site name matches all.
	 if (site.match(i) || key.match(i) ) {
	    //log("Match found in hash for:"+i+", in "+site+", &/or in page key: "+key)
	    po=hash_host_list[i];
	    regexp_match=key;
	    key = i;
	    break;
	 }
      }
      if ( ! po)
	 po=new Object();
   } // end if ! po
   if (!key_in) { //update globals
      page_key=key;
      page_object=po;
      regexp_page_match=regexp_match;
   }
   else return po;
}//end matchPageObject()

function getSite() {
   var  host;
   var domain_regexp=/((\.\w+\.|^)\w+.\w*$)/;
   try{ 
      host=window.document.location.host;
      href=window.document.location.href;
      if ( ! host)
	 host="localfile";
   }
   catch(e){ 
      host="";
      if (window.document.title)
	 GM_log("can't get site for doc: "+uwin.document.title)
   }
   try { if ( ! href ) href = window.document.title } catch(e)  { GM_log("Cant get doc href or title")}
   return host;
}

function exec(code) {
   if (code.length > 1) {
      var script = window.document.createElement("script");
      script.type = "application/javascript";
      script.textContent = "(function() {" + code + "})();"; // for to exec anonymously, ie "(funcX)()" a function.
      window.document.body.appendChild(script);
      return true;
   }
}
function replayClick(manual) {
   setTimeout(function() { replayClickSwapped(manual); }, 100);
}
function replayFurtherClicks() {
   if (!click.further_clicks) return;
   for(var i=0, delay=0; i< click.further_clicks.length; i++, delay+=200) {
      setTimeout(function(j) { 
	 var elem, snap=uwin.document.evaluate(click.further_clicks[j],uwin.document,null,6,null);
	 GM_log("Replaying further clicks after 2 sec pause, on xpath, "+click.further_clicks[j]+", # matching elements: "+snap.snapshotLength);
	 elem=snap.snapshotItem(0);
	 if (!elem) return;
	 elem.relatedTarget=elem;
	 fakeClick(elem);
	 var tstamp=(new Date().getTime());
	 log(" tstamp "+tstamp);
      }, 2000+delay, i);
   }
}

//function replayClick(manual) {
function replayClickSwapped(manual) {
   log("replayClickSwapped "+click+", "+suspend_replay);
   if ( ! click || (  ( suspend_replay  || page_object.automatic === false ) &&  ! ( manual || page_object.automatic === true)   )  ) {
      if (suspend_replay && click)
	 GM_log(window.status="Click auto-replay suspended from playing.  ");
      return;
   }
   log("ReplayClick(), click's href: "+click.own_href+".  href: "+href+", manual "+manual);
   try{
      var prejudice={};
      function execInPageContext(nohref) {
	 var code="";
	 if ( ! nohref && click.href) 
	    code+=click.href.substring(11);
	 code+=";"+(click.onclick_js ? click.onclick_js : "");
	 return exec(code);
      }
      if ( checkIfIntervalLongEnough(prejudice) || manual) {
	 if (click.xpath && ( href == click.own_href || click.own_href == "any"  ) ) {
	    elem=getXPathElem();
	    log("replay-- matches href or href=any, elem.innerHTML: "+(elem?elem.innerHTML:""));
	    var java_run;
	    if ( ! elem ) { 
	       if ( regexp_page_match) return;
	       no_element_for_click=true;
	       log("replay-- doc, "+page_key+" changed.  Recorded Xpath stale: "+click.xpath    +(click.href ? ".  Try href: " + click.href  : "" )  +  (click.onclick_js ? ".  Try javascript: "+click.onclick_js : "" ) ) 
	       if (click.href && click.href.substring(0,11) != "javascript:" ) {
		  java_run=execInPageContext(true);
		  window.document.location = click.href; 
	       }
	       else
		  java_run=execInPageContext();
	       if (java_run || click.href)
		  persistClickEvidence();
	    }
	    else { // else ! !elem
	       if ( click.ctrlShift) try { 
		  elem.parentNode.removeChild(elem); var msg="Auto-Deleted element "+click.xpath; window.status=msg;  } 
	       catch(e) { var msg="Can't delete "+click.xpath; window.status=msg; GM_log(msg); }
	       else {
		  no_element_for_click=false;
		  log("replay-- Have element,  path: "+click.xpath +  (click.href ? ".  Try href: " + click.href  : "" )   +(elem.href ? ".  Try href: " + elem.href  : "" )  +(click.onclick_js ? ".  Try javascript: "+click.onclick_js : "" ) 
		      + ", elem.click:"+ (elem.click?" true.":" none.")); 
		  if (elem.tagName=="A" && elem.href != "" && elem.href.substring(0,11) != "javascript:" ) {
		     if (elem.target == "_blank")  	window.open(elem.href, elem.target); 
		     else window.document.location = elem.href; 
		  }
		  else {
		     if (click.href && click.href.substring(0,11) == "javascript:") 
			java_run=execInPageContext()
		     else if (click.onclick_js) 
			java_run=execInPageContext()
		  }
		  if (elem.click ) {
		     // var scripts=window.document.getElementsByTagName("script");
		     // for (var i in scripts)    if ( scripts[i] && ! /(^\s*$)/.test(scripts[i].textContent || " ") )  try { 
		     //     eval.call(uwin, scripts[i].textContent);  } catch(e){ GM_log("\nParse Error: "+e); } 
		     ///above needs remove scripts too.
		     //eval ("elem.click()"); // an input
		     //dblcheck triggering of event: 
		     //elem.addEventListener("click", function() {alert("clicked"); }, 0);
		     elem.click();
		  } else {
		     var pseudo_event = window.document.createEvent("MouseEvents");
		     // type, canBubble, cancelable, view, detail,           screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget)
		     pseudo_event.initMouseEvent("click", true, true, window, 1, 0,   0,              0,          0,      false,   false, false, false, 0, null);
		     elem.dispatchEvent(pseudo_event);
		  }
	       } // else ! click.ctrlShift
	       persistClickEvidence();
	    } // end if/else have Xpath elem.
	    var msg="Info: Finished replaying click/delete, at: "+site
	       + ( elem ?  ".  Xpath ok "
		   + (!elem.xx ? click.xpath : click.xxpath+" as xpath")+".  " 
		   + (elem.classed ? elem.classed+" class used, Xpath ignored. ":"")
		   + ( click.ctrlShift ?  "Success, removed element.  " 
		     :  ( elem.tagName=="A" ? "Visited link "  +  (elem.target == "_blank" ? " in new window.  ": ".  " ) : "")
		     + (elem.click ? "Invoked input tagged: "+elem.tagName+"; text: "+elem.textContent+"; class, "+elem.className+"; value: "+elem.value+", with click() function.  " :  "Created a pseudo click event.  ")   )
		   :     ".  Failed, Xpath not on page.  " 
		   + (click.href ? "Visiting link "+click.href + ".  " :  "") )
	       + (java_run ? "Ran javascript code: "+click.onclick_js : "" );
	    hash_host_list.msg=msg;
	    GM_log(msg);
	    //persistData();
	 } // end if click.xpath
      } // end if checkIfIntervalLongEnough
      else { // last click replay was < 10 secs ago.
	 if ( ! prejudice.obj) { // prevent reload and auto replay on reload looping here.
	    persistClickEvidence(10000);// to prevent looping here, from reload(false) below.
	    GM_log("Simple Form Saver--reload page "+page_key);
	    uwin.document.location.reload(false); 
	 }
	 return true;
      }//end else
      replayFurtherClicks();
   } catch(e) {GM_log("Replay error, "+e.lineNumber+" "+e); throw(e); }
}

function persistClickEvidence(prejudice) { //if click causes reload ensures no looping.
   click_evidence={};
   click_evidence.tstamp=(new Date().getTime() + ( prejudice ? prejudice : 0));
   if (prejudice)
      click_evidence.prejudice=true;
   page_object.click_evidence=click_evidence;
   local_setValue("click_evidence", click_evidence);
   //persistData();
   //log("persistClickEvidence "+click_evidence.tstamp+", prej: "+prejudice);
}

function checkIfIntervalLongEnough(prejudice) {
   var result=true, stamp=new Date().getTime();
   var dc=local_getValue("click_evidence","");
   page_object.click_evidence=dc;
   //log("Check click_evidence: "+dc.tstamp+", prej: "+dc.prejudice);
   //var dc=page_object.click_evidence;
   if (dc && dc.sealed) {
      var diff=stamp - dc.tstamp;
      log2("Interval since last auto-click: "+diff/1000+".  If < 5 no auto re-click.");
      if ( diff < 5000) 
	 result=false;
      if (diff < 0 && prejudice)
	 prejudice.obj=true;
      if (prejudice) delete page_object.click_evidence;
      //persistData();
      local_setValue("click_evidence", page_object.click_evidence);
   }
   //log("checkIfIntervalLongEnough: "+result+" "+(dc? "s: "+dc.sealed+" t: "+dc.tstamp+" p:"+dc.prejudice:""));
   return result;
}

function fakeClick(target) {
   var e = window.document.createEvent("MouseEvents");// create event
   var pseudo_event_md = window.document.createEvent("MouseEvents");// create event
   var pseudo_event_mu = window.document.createEvent("MouseEvents");// create event
   var pseudo_event_click = window.document.createEvent("MouseEvents");// create event
   //type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget
   pseudo_event_md.initMouseEvent("mousedown", true, e.cancelable, e.view, e.detail, 
				  e.screenX, e.screenY, e.clientX, e.clientY, 
				  e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 
				  0, target.relatedTarget);
   pseudo_event_mu.initMouseEvent("mouseup", true, e.cancelable, e.view, e.detail, 
				  e.screenX, e.screenY, e.clientX, e.clientY, 
				  e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 
				  0, target.relatedTarget);
   
   pseudo_event_click.initMouseEvent("click", true, e.cancelable, e.view, 318153143, 
				     e.screenX, e.screenY, e.clientX, e.clientY, 
				     e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 
				     0, target.relatedTarget);
   
   pseudo_event_click.fakeClick=true;
   target.dispatchEvent(pseudo_event_md); 
   target.dispatchEvent(pseudo_event_mu); 
   target.dispatchEvent(pseudo_event_click);
   log2("Dispatched fake click on: "+target.tagName+", "+target.id+", "+target.className+", "+target.textContent)
}

function ordinal(n) {
   var sfx = ["th","st","nd","rd"];
   var val = n%100;
   return n + (sfx[(val-20)%10] || sfx[val] || sfx[0]);
}

function checkForInputs() {
   if (no_of_inputs != selects.length + rinputs.length + tareas.length) {
      no_of_inputs = selects.length + rinputs.length + tareas.length;
      var new_inputs = getElementsByTagNames('input,textarea,select');
      log("checkForInputs "+new_inputs.length);
      var new_names={}, new_ones=[];
      text_inputs = inputs_on_page = 0;
      for(var i=0; i<new_inputs.length; i++) {
	 var input=new_inputs[i];
	 var name=input.name;
	 var type=input.type;
	 if (type=="checkbox") 
	    name+=mdash_char+input.value;
	 if ( ! name) {	name="yyNoName"+i; } //new_inputs[i].name=name; } ///RENAMEs
	 new_names[name]=input;
	 if ( input_names[input.name] )
	    continue;
	 new_ones.push(input);
	 var style=window.document.defaultView.getComputedStyle(input, null)||{};
	 if (style.display=="none" || style.visibility=="hidden")	continue;
	 if (reddot) {
	    if (input.title.match(/Name:.*Value:.*Type/)) continue;
	    if ( !  ( /q|Gw/.test(name) && type=="text")  && ! /textarea/i.test(input.nodeName)) {
	       if (type=="checkbox")  		  input.title+= "Name"+mdash_char+"value: "+name;
	       else if (name)	    input.title+= "Name: "+name;
	       else if (input.id)      	input.title+="Id: "+input.id;
	       var val=input.value;
	       input.title+= ( /checkbox/.test(type) ? ""
			       : ".  Value: " + ( val ?  
						  ( input.type=="password" ? val[0] + "..." + val[val.length-1] : val)
						  : null)
			     );
	       input.title+=".  Type: "+type+".";
	       if (/checkbox|radio/.test(type)) {
		  // var w=parseInt(style.width), h = parseInt(style.height), min_size=18, hi_size=20;
		  // //log("Size of tick "+h+"x"+w);
		  // var fixed_sizes=GM_getValue("fixed_sizes", false);
		  // if ( (w < min_size || h < min_size) && ! fixed_sizes) {
		  //   //log("Too small, set to "+min_size);
		  //   input.style.setProperty("height", min_size+"px", "important"); 
		  //   input.style.setProperty("width", min_size+"px", "important");
		  //   input.style.setProperty("-moz-appearance", "none", "important");
		  //   // input.addEventListener("mouseover", function(){ this.style.setProperty("height", hi_size+"px", "important");		  this.style.setProperty("width", hi_size+"px", "important");		}, false);
		  //   // input.addEventListener("mouseout", function(){ this.style.setProperty("height", min_size+"px", "important");		  this.style.setProperty("width", min_size+"px", "important");		}, false);
		  // }
		  //var roll="";	    for(var j in style) roll+=j+":"+style[j]+"::"+style[style[j]]+", "
		  //log("Computed style "+roll);
		  input.style.MozAppearance="none";
		  input.style.height="1em";
		  input.style.width="1em";
	       }
	    } // if ! q|Gw
	    if (iframe) input.title+=" (Within iframe).";
	    if (/text/.test(type))           	text_inputs++;
	    if ( ! /hidden|submit|image|reset/.test(type) )           		inputs_on_page++;
	 }
      }
      inputs=new_inputs;
      input_names=new_names;
      return new_ones;
   } //end if change in number of inputs
   else {
      var new_inputs = getElementsByTagNames('input,textarea,select');
      for(var i=0; i<new_inputs.length; i++) {
	 var input=new_inputs[i];
	 var name=input.name;
	 var type=input.type;
	 var style=window.document.defaultView.getComputedStyle(input, null)||{};
	 if (style.display=="none" || style.visibility=="hidden")	continue;
	 if (reddot) {
	    // if (input.title.match(/Name:.*Value:.*Type/)) //update title value if necessary
	    input.title="";
	    if (type=="checkbox")  		  input.title+= "Name: "+mdash_char+"value: "+name;
	    else if (name)	    input.title+= "Name: "+name;
	    else if (input.id)      	input.title+="Id: "+input.id;
	    var val=input.value;
	    input.title+= ( /checkbox/.test(type) ? ""
			    : ".  Value: " + ( val ? ( input.type=="password" ? val[0] + "..." + val[val.length-1] : val ) : null));
	    input.title+=".  Type: "+type+".";
	    if (iframe) input.title+=" (Within iframe).";
	 }
      }
   }
} //end checkForInputs()

function editFormData() {
   readPersistentData();
   if ( ! form_data && ! click) return;
   var pwin=prompt2(widener+'\nThe following is the form filling information previously saved, '
		    + 'edit the values in the box at the bottom '
		    +'and click OK (you may need to scroll down to see OK button).  Click Cancel/Next to edit page name or to simply cancel.\n\nKeep to the punctuation format.  '
		    +'Leave alone the special characters, '+bullet_tab+', in-place, unless '
		    +'you want to remove or add an entire name/value pair.'
		    +'\n\nNote.  Each input box or tick box on a webpage has an internal name, its value is what gets filled-in by the user.  '
		    +'Pass the mouse over a form to see the internal names of the fields.'
		    +'They are given in the form name:: value & must have a special character between pairs.  Checkbox names also have their default value appearing with their name after a dash ('+mdash_char+').\n\n' 
		    +'To just fill just the values without names, clear the input and type in the values leaving a space between them.  Values with spaces must be surrounded by double quotes.\n\n'
		    +chopLongString(bullet_tab+formDataToFromString(true)), formDataToFromString(false)
		    , function(users_input) {    
		       log("Got users_input "+users_input);
		       if (users_input != null) {
			  log("ip  "+users_input +" match: "+users_input.match(separator) );
			  if (  users_input && ! users_input.match(separator)  )
			     res=formDataToFromString(false, users_input, "name_value_paste");
			  else
			     res=formDataToFromString(false, users_input);
			  if (res) {
			     log("Store "+uneval(res)+"\n\nAt page_key: "+page_key);
			     page_object.form_data=res;
			  } else  {
			     delete page_object.form_data;
			  }
			  persistData();
		       }
		       else {
			  pwin.dontclose=true;
			  log("Next, prompt3 for window2");
			  prompt3(widener+"\nThe following is the page(s) for which the form data and click information is valid."
				       +"\nEdit the page name to indicate page name(s) where stored form data may be applied and click OK.\nClick CANCEL to leave as is."
				       +"\n\nFor example, remove all but the site name to make it valid for the entire site or for a number of sites (can use regexp or a part of the name)"
				       , page_key, function(users_input) {
					  log("From prompt3 got:  "+users_input);
					  if (users_input != null && page_key != users_input) {
					     log(1);
					     hash_host_list[users_input]=page_object;
					     log(1);
					     page_object=null;
					  }
					  persistData();
				       } ); //result_handler end of function
			  log("pwin "+pwin);
		       }//else
		       
		    } ) //result_handler end function
}

function editClickData(){
   prompt2(widener+"\nThe following is the XPath address of the auto-click element on this page."
	   +"\nEdit it and click OK.\nClick CANCEL to leave as is.", (click?click.xpath:""),
	   function(users_input) { 
	      log("Got "+users_input+", click: "+click);
	      if ( users_input != null ) {
		 if ( ! click) click={};
		 click.xpath=users_input;
		 click.xxpath=users_input;
		 persistData();
		 GM_log("Set click xpath to:"+click.xxpath+".");
	      }
	      else GM_log("No input");
	   });
}

function formDataToFromString(breaks, str_in, value_paste) {
   var data= form_data||{};
   var j=0, v, n, form_str="", extra_break="";;
   tab=" "+bullet+" ";
   if (breaks) tab ="\n"+bullet_tab
   if ( str_in == undefined ) { 
      for (n in data) {
	 j++;
	 v=data[n].v;
	 if ( ! breaks ) {
	    if ( ! v && v != 0)
	       v="null";
	    if (v==tick || v==ex) {
	       data[n].checkbox=true;
	       (v==tick ? v = "on":  v= "off")
	    }
	 }
	 else { // breaks.
 	    if (typeof v == "object") {
	       v = v + "\t\t[ "+getOptionsNames(n, v)+" ]"
	       data[n].select_multi=true;
	    }
	    if (input_names[n] && input_names[n].type=="select-one")
	       v = v  + "\t\t[ " + getOptionsNames(n , v) + " ]"
	    if ( j % 3 == 0 ) extra_break="\n"
	    else extra_break="";
	 } // end ! breaks
	 if ( ! data[n].pw || unhide) {
	    form_str+=n+separator
	    form_str+=(breaks ? "\t" : " ") +v+extra_break+tab;
	 }
	 else    {
	    form_str+=n+separator
	    this.pw=v;
	    var i=0
	    form_str += (breaks ? "\t" : " ") + (v[0]?v[0]:"");
	    while (i++ < v.length-2)
	       form_str+="*";
	    form_str+=(v[i]?v[i]:"");
	    form_str+=tab;
	 }
      } //end for n in data
      return form_str.substring(0,form_str.length-tab.length);
   }
   if (value_paste) return doValuePaste(str_in, data);
   name_value=str_in.split(bullet);
   var val;
   for(var i=0; i < name_value.length; i++) {
      log("str_in, "+name_value[i]);
      if ( ! name_value[i])
	 continue;
      words=name_value[i].split(separator);
      if (words.length != 2)
	 continue;
      var name=words[0].replace(/^\s+|\s+$/g,"");
      val = words[1].replace(bullet_regexp, "").replace(/^\s+|\s+$/g,"");
      if (val =="null")
	 val=null;
      if ( ! data[name] ) data[name]=new Object();
      if (data[name].pw)   continue;
      data[name].v=val;                       ////
      log("data[name] val "+data[name].v);
      data[name].user_set=true;
      if (data[name].checkbox) {
	 val=val.replace(/\s*/g,"");
	 if (/^on$/i.test(val))
	    data[name].v=tick;
	 else
	    data[name].v=ex;
      }
      
      if (input_names[name] && input_names[name].type=="select-one")
	 if (isNaN(val) ) 
	    data[name].v = getOptionsIndex(input_names[name], val, data[name]);
      else
	 data[name].v = val;
      log("Set val: "+data[name].v+", type "+(typeof data[name].v));

      if (data[name].select_multi) {
	 data[name].v=val.split(/\s*,\s*/);
      }
   }
   for(var n in data) {
      if ( ! data[n].user_set) {
	 delete data[n]
      }
      else {
	 delete data[n].user_set
	 delete data[n].checkbox;
	 delete data[n].select_multi;
      }
   }
   if (countMembers(data) == 0)
      return 0;
   return data;
}

function doValuePaste(str_in, data) {
   str_in=stuffQuotedSpaces(str_in);
   log("Do paste str_in: "+str_in);
   var values=str_in.split(/\s+/);
   var val, name;
   for(var i=0; i < values.length; i++) {
      log("str in: "+values[i]);
      if ( ! values[i] )
	 continue;
      val = values[i].replace(bullet_regexp, " ").replace(/^\s+|\s+$/g,"").replace(/[""]/g,"");//2 doubles for indent
      if (val =="null")
	 val=null;
      name=nameAtI(data, i);
      log(i+"th, val "+val+" name:" +name+ " "+(input_names[name]?input_names[name].type:"no ip")) 
      if (name==false) continue;
      if ( ! data[name] ) data[name]=new Object();
      if (data[name].pw)   continue;
      data[name].v=val;                       ////
      data[name].user_set=true;
      if (input_names[name] && input_names[name].type=="select-one") 
	 if (isNaN(val) ) 
	    data[name].v = getOptionsIndex(input_names[name], val, data[name]);
      else
	 data[name].v = val;
      log( "paste val: "+data[name].v+", typeof val "+(typeof data[name].v) );
      
      if (data[name].checkbox) {
	 val=val.replace(/\s*/g,"");
	 if (/^on$/i.test(val))
	    data[name].v=tick;
	 else
	    data[name].v=ex;
      }
      if (data[name].select_multi)
	 data[name].v=val.split(/\s*,\s*/);
   }	//matches end of for loop over values
   for(var n in data) {
      if ( ! data[n].user_set) {
	 delete data[n]
      }
      else {
	 delete data[n].user_set
	 delete data[n].checkbox;
	 delete data[n].select_multi;
      }
   }
   if (countMembers(data) == 0)
      return 0;
   return data;
} //actually matches end of doValuePaste()

function doNameValuePaste(str_in, data){
   name_value=str_in.split("\n");
   var val;
   for(var i=0; i < name_value.length; i++) {
      if ( ! name_value[i])
	 continue;
      var words=name_value[i].split(":");
      if (words.length != 2)
	 continue;
      var name=words[0].trim();
      val = words[1];
      if (val =="null")
	 val=null;
      name=matchInputName(name, inputs);
      //log("Got name match of "+name+" data[name] :" +data[name]);
      if ( ! name ) continue;
      if ( ! data[name] ) data[name]=new Object();
      if (data[name].pw)   continue;
      data[name].v=val;                       ////
      data[name].user_set=true;
      if (data[name].checkbox) {
	 val=val.replace(/\s*/g,"");
	 if (/^on$/i.test(val))
	    data[name].v=tick;
	 else
	    data[name].v=ex;
      }

      if (input_names[name].input_names[name].type=="select-one")
	 if (isNaN(val) ) 
	    data[name].v = getOptionsIndex(input_names[name], val, data[name]);
      else
	 data[name].v = val;
      log("Paste set val: "+data[name].v+", type "+(typeof data[name].v));


      if (data[name].select_multi) {
	 data[name].v=val.split(/\s*,\s*/);
      }
   }
   for(var n in data) {
      if ( ! data[n].user_set) {
	 delete data[n]
      }
      else {
	 delete data[n].user_set
	 delete data[n].checkbox;
	 delete data[n].select_multi;
      }
   }
   if (countMembers(data) == 0)
      return 0;
   return data;
}

function matchInputName(name, data) {
   var res, ratio=0, high_ratio=0;
   for(var i in data) {
      ratio=ratioOfMatchedWords(name, data[i].name);
      //log("got ratio of "+ratio+" for "+name+" in data[i].name: "+data[i].name);
      if ( ratio > .5) {
	 if (ratio > high_ratio) {
	    high_ratio=ratio;
	    res=data[i].name;
	 }
      }
      if (ratio == 1)
	 return data[i].name;
   }
   return res;
}

function nameAtI(obj, i) {
   var index=i;
   for(var j in obj) {
      if ( i == 0 ) return j || "yyNoName"+index;
      i--;
   }
   return false;
}

function  stuffQuotedSpaces(str) {
   var phrase_pos=0;
   var i=str.indexOf('"', phrase_pos);
   while (i !== -1) {
      var j=str.indexOf('"', i+1);
      var phrase=str.substring(i, j);
      str=stringCutAndPaste(str, phrase, phrase.replace(/\s/g, bullet), i);
      i=str.indexOf('"', j+1);
   }
   return str;
}

function stringCutAndPaste(str, tocutout, topaste, start) {
   var n=str.indexOf(tocutout, start||0);
   if (n != -1) 
      return str.substring(0,n) + ( topaste || "") + str.substring(n+tocutout.length); 
   return str;
}

function getOptionsNames(name, value_s) {
   var result="";
   var option_names=[], options;
   var ip=input_names[name];
   if (ip) options=ip.options;
   if (typeof value_s == "object") {
      if (ip && ip.type == "select-multiple" )
	 for(var i in value_s)
	    option_names[i]=getOptionsNames(name, value_s[i]);
      result =String(option_names).replace(/,\b/g,", ");
   }
   else {
      for (var i =0; i < options.length; i++) {
	 //log("opt.inx: "+options.item(i).index +", look for: "+value_s +".  Opt.value: "+options.item(i).value );
	 var option=options.item(i);
	 if (option.index== value_s ) {
	    if (option.textContent)
	       result = option.textContent;
	    else
	       result = option.value;
	 }
      }// end for.
   }
   return result.replace(/[\r\n]/g, "").replace(/^\s+|\s+$/g,"");
}

function getOptionsIndex(ip , in_val, name) {
   var index = 0, best_match = 0;
   for (var i =0; i < ip.options.length; i++) {
      var option=ip.options.item(i);
      var opts_val=option.value;
      if ( option.textContent && option.textContent.trim() )
	 opts_val=option.textContent;
      opts_val=opts_val.toLowerCase().trim();
      in_val=in_val.toLowerCase().trim();
      var match_ratio=ratioOfMatchedWords(in_val, opts_val);
      if (match_ratio > best_match ) {
	 best_match=match_ratio;
	 name.str=opts_val;
	 index=String(option.index);
	 if (match_ratio > 0.9) 
	    return String(option.index);
      }
   }
   return index;
}

function ratioOfMatchedWords(source_words, target_words) {
   source_words=source_words.replace(/[^a-zA-Z0-9_ \t]+/g," ").split(/\s+/);
   var matches=0, ratio=0, targ_ratio=0;
   for(var i in source_words)
      if (target_words.match( RegExp(source_words[i],"i") ))
	 matches++;
   ratio = matches/source_words.length;
   targ_ratio = matches/target_words.replace(/[^a-zA-Z0-9_ \t]+/g," ").split(/\s+/).length;
   ratio = (ratio + targ_ratio) / 2;
   //log("opt match "+source_words+", in targ "+target_words+".  # Matches "+matches+", in "+source_words.length+" , targ ratio:, "+targ_ratio+" ratio "+ratio)
   return ratio;
} 

function parseTextarea(ta) {
   var result="";
   var lines=ta.value.trim();
   //lines=lines.replace(/[\r\n]\s*[\n\r]/g, "\n"); //removes empty lines
   log("lines:\n "+uneval(lines));
   lines=lines.split(/\n/); // check MSDOz!!
   lines=reorderLines(lines);
   for(var i=0; i < lines.length; i++) {
      var val, res;
      var line=lines[i].trim();
      if (line && ! /:/.test(line))
line=": "+line;
if (/::/.test(line) || multiMarked(i) ) {
val=line.splitOnce(/\s*:+\s*/)[1];
      if (val) result += " " + parseOptionalValues(val, i);
   }
   else {
      val=line.splitOnce(/:\s*/)[1];
      if (res=parseDateTime(val, i)) result += " " + res;
      //	  else if (val) result += ' "'+val.replace(/[\x27\x22]/g,"")+'"';
      else if (val) result += ' "'+val.replace(/[\x22]/g,"").replace(/[\x27]/g,"\\\x27")+'"';
      else result += " null ";
   }
}
return result.trim();
}

// GM_setValue("line_order", "3*, 1, 2DsT, 4");
// GM_setValue("optionals", "line1word2of3");

function parseDateTime(val, i) {
   var datetime=GM_getValue('line_order', ""), date="", time=""; //eg, "3*, 1, 2DsT, 4"
   if ( ! /[DT]/i.test(datetime))
      return null;
   datetime=datetime.split(/,/)[i];
   if ( ! /[DT]/i.test(datetime))
      return null;
   if (/Ds/i.test(datetime)) 
      date=new Date(val).slashFormat();
   if (/T/i.test(datetime)) {
      time=new Date(val).ampmFormat();
      time += " " + getTimeZone();
   }
   result = date+" "+time;
   if (/TD/.test(datetime))  result = time+" "+date;
   //log("ret date/time "+result);
   return result;
}

function parseOptionalValues(val, i) {
   var opts=GM_getValue("optionals", ""), opt_word, max_words;
   var pos=opts.indexOf( "line" + (i+1) );
   if (pos != -1) {
      pos= pos + ("line"+i).length + 4;//eg, "line1word2of3"
      opt_word=parseInt ( opts.substr (pos) )
      pos += (opt_word+"").length + 2;
      max_words=parseInt ( opts.substr(pos) )
      //log(pos+ "<pos.  opt_word "+opt_word+", max "+max_words);
      var words=val.split(/\s+/);
      if (words.length < max_words) {
	 words.splice(opt_word-1, 0, "null")
      }
      val=words.join(" ");
   }
   return val;
}

function multiMarked(i) {
   var marked=GM_getValue('line_order', "1, 2, 3, 4, 5");
   marked=marked.split(/,/);
   return /\*/.test(marked[i]);
}

//greasemonkey.scriptvals.userscripts.org/Simple Form Saver.line_order
function reorderLines(lines){
   order=GM_getValue('line_order', "1, 2, 3, 4, 5").replace(/[^\d,]/g,"");
   order=eval("["+order+"]");
   var newlines=[];
   for( var i in lines)
      if (i  <  order.length && order[i] != 0) {
	 var old_pos=order[i]-1;
	 if (old_pos < lines.length)
	    newlines[i]=lines[old_pos];
	 else
	    newlines[i]="null";
      }
   else
      newlines[i]=lines[i];
   return newlines;
}

function pasteIntoForm() {
   //readPersistentData();
   if (special_ta) log("special_ta tc "+special_ta.value+" id "+special_ta.id);
   if (getById("SimpleFormSave")) return;

   //    var new_win=uwin.open("ex_form.html#bizarreoKeyer","_blank", "foreground");
   if (Chrome) var new_win=window;
   else var new_win=window.open("","myWin","menubar=no,scrollbars,location=no,toolbar=no, status=no,left="+screen.width+"px,top="+(screen.height/2-300)+"px,width=600em");
   log("new_win "+new_win);
   new_win.document.addEventListener("keydown", function(e) {	  if (e.keyCode == 27)    new_win.close();}, 0);
   var div=new_win.document.createElement("div"); div.id="SimpleFormSave";
   var body=new_win.document.body;
   function listFields() { var skip, roll="field(s) named, "; 
			   for (var i=0; i < inputs.length; i++) {
			      var ip=inputs[i];
			      if(skip==ip.name) continue;
			      if (ip.type=="radio") skip=ip.name;
			      var style=window.document.defaultView.getComputedStyle(ip, null)||{};
			      var visibility=( (style.display=="none" || style.visibility=="hidden") ? " (invisible)" : "");
			      ip.visibility=visibility;
			      roll+= ip.name+visibility+", ";
			   }
			   return roll; }
   var tatitle="For an example form with three fields: name, last-name, sex.  Paste-in as follows in three lines, with the first line, John, second line, Webster, third line, male.  "
      +"To do it in just one line use two colons, type or paste, ::John Webster male.  If there was also a field for the middle name to set it as null put: ::John null Webster male."
      +"If one of the values after the double colon (::) had spaces in it, it would need to be surrounded by double quotes, eg, ::John "+'"Boyle OConnor Fitzmaurice Tisdall OFarell"'+" male.  "
      +"If you know the names of the inputs or can guess or check them by looking at the pages HTML then you could use, "+"  name: Peter   "+", on any line and it would fill it in the right field"
   div.innerHTML="<p>Enter or Paste form field values into the box directly below this text; do it for each field of the form.  Click OK when complete.  You can put a colon "
      +"before the value if desired.  You may need to maintain the same order as the page's form so fields are now numbered with '#' on the webpage, watch out for invisible (red) fields.  "
      +"<br><br>Use a new line for each field, or use double colons (::) to put more than one field's values on a single line.  "
      +"Put the mouse over this and below for instructions and examples.  You can put the mouse over the fields of the form to see details of form.<br><br>This page has "+listFields()+"</p>"
      +"<textarea style='width:100%;height:20em;  border: double;background-color:#fffff4;color:midnightblue;' title='"+tatitle+"';>"
      +(special_ta?special_ta.value:"")+"</textarea>";
   var ta=div.getElementsByTagName("textarea")[0]; 
   div.innerHTML+="<form><input type=button value='Cancel/Next' style='width:100; height:50;font-size: 12'>"
      +"<input type=button value='OK' style='width:100; height:50;font-size: 24;' onClick='OKbutton()'></form>";
   div.firstElementChild.title='Give one value on each line eg, "Pepsi" or put them in the form name \u2039colon\u203a value, eg, "Company: Pepsi" or indeed just \u2039colon\u203a value, eg, ":Pepsi". For fields not to be filled-in at all just put a single colon on that line.  '
      +"If names are given the name need not match the real name; each value is copied into the approriate field based not on the name but on the field ordering"
      +" unless the config value for pasting names is set in "
      +"about:config.  The first line is copied to the first form field, etc..  One field value per line or,"
      +" to allow more values on one line, use double colons for contiguous fields, eg, 'time:: 12:23 Eastern' will fill-in two fields, the time and the"
      +" time zone.  To skip a field use the value 'null' or leave the part after the colon empty.";
   ta.value="\n  ";
   var title=div.firstElementChild;
   body.appendChild(div);
   if (Chrome) {
      div.style.cssText=" z-index: 99; top: 40px; height: 50%; opacity: 0.85; background-color: white; font-family: Helvetica; font-weight: bold; font-size: small; padding: 10px"
      ta.style.cssText="width: 50%; margin: 0;  border: none;"
	 +" -moz-appearance: none; border-left: double; min-height: 300px; "
      title.style.cssText=	"background-color: -moz-field; margin:0; border: double;"
      log("set cssTExt "+ta.style.cssText);
   }
   else {
      div.style.cssText=" top: 40px; height: 50%; font-family: Helvetica; font-weight: bold; font-size: small; padding: 10px"
      // ta.style.cssText="width: 50%; height: 150px; margin: 0;  border: none;"
      // 	+" -moz-appearance: none; border-left: double;"
      title.style.cssText=	"background-color: -moz-field; color: -moz-FieldText; margin:0; border: double;"
   }
   title.scrollIntoView();
   //new_win.resizeTo(body.offsetWidth+50,body.offsetHeight+100);
   var labels=[], radio_names={}, detract=0; 
   for(i=0; i < inputs.length; i++) {
      var input=inputs[i]
      var l=document.createElement("label");
      var prev=input.previousSibling;
      if ( prev && prev.tagName=="LABEL" && /#\d$/.test (prev.textContent) ) continue;
      input.parentNode.insertBefore(l, input);
      if (input.visibility) { l.title="Invisible input, provide a value or leave line blank, name="+input.name; l.style.color="red";l.style.backgroundColor="black";}
      if (input.type=="radio") {
	 if (radio_names[input.name]==undefined)
	    radio_names[input.name]=(i+1-detract);
	 else detract++;
	 l.textContent=" #"+(radio_names[input.name]);
      }
      else l.textContent=" #"+(i+1-detract);
      labels.push(l);
   }
   var processTextarea=function() {
      var ta = div.getElementsByTagName("textarea")[0];
      log("ta css "+ta.style.cssText+" tag "+ta.tagName);
      log("processing val:"+ta.value);
      log("processing ");
      var str_in, parse_method=GM_getValue("parse_method", "values");	if (parse_method[0] != "n") 	  parse_method=true; else parse_method=false;
      if (parse_method)
	 str_in=parseTextarea(ta);
      else str_in=ta.value.trim();
      log("parse_method "+parse_method+", after parse, str_in: "+str_in);
      var data={};
      for(i=0; i < inputs.length; i++) {
	 var input=inputs[i], name=input.name;
	 data[name]={};
	 data[name].i=i;
	 if (input.type=="checkbox") {
	    data[name].checkbox=true;
	    var cbname=name+mdash_char+input.value;
	    data[cbname]=data[name];
	    delete data[name];
	 }
      }
      var res;
      if (parse_method)
	 res=doValuePaste(str_in, data), list=widener, j=0; 
      else
	 res=doNameValuePaste(str_in, data), list=widener, j=0; 
      log(" res "+res+" data.len: "+data.length);
      for (var i in data) {
	 if (typeof data[i] === 'function') continue;
	 log ("for i in data.  i:"+i+" "+typeof data[i])
	 if (parse_method)
	    list +=  "" //"field #"  + ( ( j++ ) + 1) 
	    +"To be filled-in: "+data[i].v+" \t\t ("+i+")\n";
	 //		+"To be filled-in: "+(data[i].str ? data[i].str : (data[i].v||"") )+" \t\t ("+(inputs[j-1].name||"")+")\n";
	 else 
	    list +=   "input name: "+i
	    +", to be filled-in with: "+(data[i].str ? data[i].str : (data[i].v||"") )+"\n";
      }
      list=list.replace(/\\\x27/g,"\x27");
      //      var go_ahead=
      var w=new_win.outerWidth, h=new_win.outerHeight;
      log2(" w h "+w+" "+h);
      new_win.resizeTo(1,1); 
      window.focus();
      log2("wi w h "+w+" "+h);
      log2("w h "+new_win.outerWidth+" "+new_win.outerHeight);
      confirm3(list+"\n\nConfirm or Cancel", function(go_ahead) {
	 if (go_ahead) {
	    if (res) fillForm(false, false, res);
	    inOutSet();
	 }
	 if (Chrome) {
	    div.style.display="none";
	    div.parentNode.removeChild(div);
	    delete div;
	 }
	 for (var i in labels) {
	    var parent=labels[i].parentNode;
	    if (parent) parent.removeChild(labels[i]);
	 }
	 new_win.resizeTo(w, h);
	 new_win.focus();
      }); //confirm3()
   }; // end function processTextarea
   var form_inputs=div.getElementsByTagName("input");
   form_inputs[0].onclick=function() { 
      new_win.close(); log("cancel");	    
      for (var i in labels)
	 if (labels[i].parentNode) labels[i].parentNode.removeChild(labels[i]);
      if (Chrome) {
	 div.style.display="none";
	 div.parentNode.removeChild(div);
	 delete div;
      }
   }
   form_inputs[0].style.cssFloat="left";
   form_inputs[1].onclick=function (){ 
      processTextarea();
      log2("processTextarea "+ta.value+".");
   }
   ta.focus();
   new_win.setTimeout(function() { ta.focus(); }, 3000);
} // end pasteIntoForm()

function confirmClickRecording() {
   confirm3("The next part of the webpage on which you click shall be recorded and\ncan be clicked again on subsequent visits to this page, automatically or manually."
	    +"\n\nTo ensure you click on the correct element all elements can be\nhighlighted with a red outline & show XPath (it also appears in the console,\nsee status bar (if allowed by about:config, see userscript webpage) for element tag."
	    +"\n\nClick OK to proceed\n\nHit Cancel/Next to hightlight elements.\nNote, highlighted elements may move position, hit 'Esc' key to clear highlighting."
	    +"\n\nThen click on chosen element to have a click replayed on this page when visited in future.\nShift-click searches for nearest input, form, link, or onclick element.  "
	    //+"\n\nInstead, to have an element permanently deleted from the page, do, control-shift-click, on the element.\nRecording a click will not involve a real click on the page."
	    , function(reply) { //result handler function
	       recording=reply;
	       if ( recording == false) {
		  GM_addStyle("* { border-color: red ! important ; border-width: 1px ! important ; border-style: solid ! important ; } ");
		  window.document.body.addEventListener("mouseover", mouseOver, false);
		  addEventListener("keyup", function(e) {
		     if (e.keyCode!=27) return; //esc
		     var headNode=window.document.getElementsByTagName("head")[0];
		     headNode.removeChild(headNode.lastElementChild);
		     window.document.body.removeEventListener("mouseover", mouseOver, false);
		     window.document.body.removeEventListener("keyup", arguments.callee, false);
		  }, 0);
	       }
	       //window.document.body.addEventListener("click", recordClick, false);
	       window.document.body.addEventListener("click", recordClick, true); //capture mode
	       window.status="Shall save next click on this page: "+page_key;
	       await_click=true;
	    })
}

function recordClick(e) {
   log("recordClick "+e.target.className+" "+e.target.tagName+" "+recording);
   if ( $(e.target).hasClass("sfsdiax") ) return true;
   if ( recording === undefined) return true;
   // if ( ! FireFox && ! window.counted_confirm_click) { 
   //   window.counted_confirm_click=true;
   //   return true;
   // }
   await_click=false;
   if (e.preventDefault) {
      e.preventDefault();   
      e.stopPropagation();
      e.stopImmediatePropagation();
   }
   if ( recording == false) {
      var headNode=window.document.getElementsByTagName("head")[0];
      headNode.removeChild(headNode.lastElementChild);
      window.document.body.removeEventListener("mouseover", mouseOver, false);
   }
   this.removeEventListener("click", arguments.callee, true);
   //img.inOutSet(); might be on different page, so cant access this img.style w/o security  error
   //readPersistentData();
   var click={};
   var elem=e.target;
   var cond=false, onclick;
   var orig_onclick=elem.getAttribute("onclick") // or onmousedown, up
   if (e.ctrlKey && e.shiftKey)
      click.ctrlShift=true;
   else {
      if (e.shiftKey) {
	 while ( elem && elem.tagName ) {
	    onclick=elem.getAttribute("onclick");
	    cond= /^(input|form|a)$/.test ( elem.tagName.toLowerCase() );
	    cond = cond || onclick;
	    if (cond) break;
	    elem=elem.parentNode;
	 }
	 if ( ! elem || ! elem.tagName)
	    elem=e.target;
      }
      click.onclick_js=elem.getAttribute("onclick") 
      click.href=elem.href;
   }
   log("rem click listnr");
   log("store click info");
   click.own_href=href;
   click.xpath=getXPath(elem, true);
   click.id=elem.id;
   click.className=elem.className;
   click.xxpath=getXPath(elem);
   log("Click was on element, innerHTML: "+elem.innerHTML);
   log(" onc "+orig_onclick+" "+elem.onclick);
   elem.id=null;
   //elem.parentNode.removeChild(elem);
   page_object.click=click;
   var click_msg="Mouse click to save was on element: "+elem.tagName+", text, "+elem.textContent+", class, "+elem.className+" path: "+click.xpath;
   GM_log(click_msg+" for page "+page_key);
   var subpage=href.substring ( href.lastIndexOf ( page_key ) + page_key.length)
   log("confirm again on subpage: "+subpage);
   if (click.ctrlShift) // asych calls, events can intervene (eg, unload and clobber data)
      confirm3( "Page name: "+page_key+"\n" +"Element xpath: " + click.xpath+(click.xpath!=click.xxpath ? " ("+click.xxpath+")":"")+widener
		+"\n\nThe element on which the mouse click was just made shall be automatically deleted from this page from now on, "
		+"unless automatic form-fill & replay are explicitly disabled for the page." 
		+"\n\n"
		+ "Click 'OK' to auto-delete this element in future on this specific page name, even when the page name is  suffixed."
		+"\n\nClick 'Cancel ' to abort or to specify on which pages the element is to be deleted"
		+(subpage  ?  ", ie, on entire site or only on pages ending with the suffix:\n\t\t" + subpage : "" )  + "."
		+"\n\n"
		+(suspend_replay ? "\n\nNOTE: auto/replay-delete is currently suspended, to enable it go to the toggle in the GM menu." : ""),
		reply_handler
	      )
   else
      confirm3( "Page name: "+page_key+"\n" + "Element xpaths: " + click.xpath+(click.xpath!=click.xxpath ? "\n\n("+click.xxpath+")":"")+"\n"+elem.textContent.replace(/\n/g,"")+widener
		+"\n\nThe mouse click just made shall be replayed automatically on this page from now on " 
		+"unless automatic form-fill & replay are explicitly disabled for the page or in general.  " 
		+"\nAny form data for the page will also be filled in prior to replaying the click unless auto-fill has been explicitly disabled for this page."
		+"\n\nTo access this page in future it may be necessary to first select GM icon 'User Script Commands' menu option 'Suspend the Auto-Replay' or explicitly disable auto-replay for the page so click will only replay when the form is manually filled in via the red icon at top left or the GM icon"
		+"\n\n"
		+ "Click 'OK' to auto-replay this click in future on this specific page name, even when the page name is suffixed."
		+"\n\nClick 'Cancel/Next ' to specify on which page(s) to replay it, "
		+(subpage  ?  ", ie, on entire site or only on this page ending with the suffix:\n\t\t" + subpage : "" )  + ", or to abort."
		+""
		+(suspend_replay ? "\n\nNOTE: auto-replay is currently suspended, to enable it go to the toggle in the GM menu." : ""),
		reply_handler
	      );
   function reply_handler(reply) {
      log("reply_handler for record "+reply);
      if (reply) {
	 page_object.click=click;
	 if(page_object.automatic!=false) page_object.automatic="on";
	 click.own_href="any";
	 recording=undefined;
	 hash_host_list.msg=click_msg
	 persistData();
	 window.status=": "+hash_host_list.msg;
      }
      else { //cancel
	 prompt3("Will replay click (or element deletion) on the following pages.  The site is, "+site
		 +", edit the details as required or delete all but the site name for it to operate on entire site.  Forward slashes[/] after the site name specifies that it only applies to that page not whole site. "
		 +"\n\nClick 'Cancel' to abort entire recording.", decodeURIComponent(page_key+subpage), 
		 function(subpage_reply)	{ 
		    if (subpage_reply) {
		       log("page_key "+page_key+", == reply?: "+subpage_reply);
		       if (page_key != subpage_reply) { //move all to new page object, ie, & del this one. 
			  click.own_href="any"; 
			  var po=hash_host_list[subpage_reply];
			  GM_log("New page object for, "+subpage_reply+", previous, "+page_key);
			  if ( ! po) { 
			     po=new Object(); 
			     function copy(destination, source) {
				for (var property in source) {
				   if (typeof source[property] === "object" &&
				       source[property] !== null ) {
				      destination[property] = destination[property] || {};
				      arguments.callee(destination[property], source[property]);
				   } else {
				      destination[property] = source[property];
				   }
				}
				return destination;
			     };
			     copy(po, page_object);
			     log("no page for it, copied page_object "+page_object+" to po");
			  }// end if !po
			  
			  hash_host_list[subpage_reply]=po;
			  po.click=click; 
			  if(po.automatic!=false) po.automatic=true;
			  //page_object={};
			  log("cleared page obj and set hash_host_list of given to "+hash_host_list[subpage_reply]);
			  GM_log("Operates on different pages: "+subpage_reply);
		       } //end if != subpage_reply
		       else { 
			  page_object.click=click;
			  if(page_object.automatic!=false) page_object.automatic=true;
			  click.own_href="any";
			  log(" == to page_key, own_href: "+click.own_href)
		       }
		    }
		    else { window.status="Click recording aborted"; GM_log("Recoding aborted"); return;}
		    persistData();
		    recording=undefined;
		 });
      }// end else //cancel
      
   } // end reply handler
} // end recordClick()

function mouseOver(e) {
   var msg="Mouse is over: "+e.target.nodeName+".   Xpath: "+getXPath(e.target);
   window.status=msg;
   GM_log( msg+"\n"+e.target.textContent.substr(0,40).replace(/\n+/g," ") );
}

function handlePopups(e) { try {     //node was inserted
   if (!e.target.tagName) return;
   if (recording !== undefined) return;
   setTimeout(function() {   
      //log("handlePopups elem: "+e.target.tagName+", tc: "+e.target.textContent.substr(0,10).replace(/\s+/g,"")+", class: "+e.target.className);
      readPersistentData("popups");   },  0);
   var target=e.target;
   if (page_object.automatic) {
      var opt_flag;
      var new_elems=getElementsByTagNames("input,textarea,select"
					  +(awaiting_an_option ? ",option" : "") , target);
      var news=new_elems.slice(0);
      while ( target=new_elems.pop() ) {
	 if ( old_elems.some(function(e) {return target==e; }) ) continue;
	 if (target.tagName.toLowerCase()=="option") { opt_flag=target; target=target.parentNode;}
	 if (/^(input|textarea|select)$/.test(target.tagName.toLowerCase()))
	    if (form_data && form_data[target.name] ) {
	       var once_off=[];
	       once_off[0]=target;
	       if (target.options) {
		  var index=form_data[target.name].v;
		  if (target.options.length <= index) { awaiting_an_option = target; continue }
		  if (opt_flag && opt_flag.index!=index) continue;
		  if (awaiting_an_option == target) awaiting_an_option=false;
	       }
	       setTimeout(function() {      fillForm(once_off) }, 0);
	       target.title  +=  (   target.name  ?   "Name: "   +   target.name    :      (target.id ?   "Id: "   +  target.id    :  ""   )    )  +     ".  Value: "  +  target.value  +   ".  Type: "   +    target.type
	    }
      } // end while
      old_elems=news.length? news : old_elems;
   }
   if (click && ! awaiting_an_option && no_element_for_click && ! suspend_replay) {
      if (getXPathElem()) { 
	 ws(function() {  	if (no_element_for_click) {    if (fillForm(false, true)) no_element_for_click=false;    }  	    }, 0);
      }
   }
}catch(e){GM_log(e); throw(e);}
			 }

function log(str) {
   //GM_log(str); return;
   if ( typeof dcount == "undefined" ) { dcount=2; }
   var d=new Date();  d=d.getMinutes()+"m:"+d.getSeconds()+"s:"+d.getMilliseconds()+"ms ";
   if ( ! log.win) {
      log.win=window.open(""); // need to allow site in noscript & be online for this.
      log.doc=log.win.document; 
      str=d+" i-0: Doc: "+window.document.location.href+".<br>"+d+" i-1: "+str;
   }
   var style="style='margin-left : 100px; border-bottom: solid 1px; font-size: 14pt;line-height: 2em ' ondblclick='document.body.innerHTML=null'";
   try{  log.doc.writeln("<div "+style+">"+d+"i-"+dcount+":   "+str+" "+(iframe?"(iframe msg)":"")+"</div>"); log.doc.title=dcount; dcount++; }
   catch(e){ window.setTimeout(function() {log(str)}, 0);	}
}

function getXY(obj) {
   var curleft = 0;  var curtop = obj.offsetHeight + 5;  var border;
   function getStyle(obj, prop) {	    return document.defaultView.getComputedStyle(obj,null).getPropertyValue(prop);    }
   if (obj.offsetParent)    {
      do	{
	 //  If the element is position: relative we have to add borderWidth
	 if (  /^rel/.test ( getStyle (obj, 'position') )  ) {
	    if (border = getStyle(obj, 'border-top-width')) curtop += parseInt(border);
	    if (border = getStyle(obj, 'border-left-width')) curleft += parseInt(border);
	 }
	 curleft += obj.offsetLeft;
	 curtop += obj.offsetTop;
      }
      while (obj = obj.offsetParent)
   }
   else if (obj.x)    {
      curleft += obj.x;
      curtop += obj.y;
   }
   return {'x': curleft, 'y': curtop};
}

function trickleUp(el) { try {
   var style=window.document.defaultView.getComputedStyle(el, null);
   //if (/^rel/.test(style.position))     el.style.setProperty("position","static", "important");
   if (/^abs/.test(style.position))  {   el.style.setProperty("margin-left","0px", "important"); 
					 el.style.setProperty("margin-right","0px", "important"); 
					 log("trickleUp unset abs, margins, on "+el.tagName+" "+el.id);
				     }
   if (el.parentNode) trickleUp(el.parentNode); } catch(e){}
		       }

function getTimeZone() {
   var right_now = new Date();
   var jan_here = new Date(right_now.getFullYear(), 0, 1, 0, 0, 0, 0);  
   var temp = jan_here.toGMTString();
   var jan_GMT = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
   var offset =  (jan_GMT - jan_here) / (1000 * 60 * 60);
   offset|=0;
   //log("off set "+offset);
   switch(offset) {
   case 0: return "GMT";
   case 5: return "eastern";
   case 6: return "central";
   case 7: return "mountain";
   case 8: return "pacific";
   default: return "GMT+"+-offset;
   }
}

function getById(id) {
   var el=window.document.getElementById(id);
   return el;
}

function getByIdOrClass() {
   var res=[];
   for(var i=0; i<arguments.length; i++) {
      var els=[];
      els[0]=window.document.getElementById( arguments[i] );
      if ( ! els[0] )  els=window.document.getElementsByClassName( arguments[i] ); 
      for (var j=0; j < els.length; j++) {
	 log(arguments[i]+"<len: "+els.length+" push "+els[j].tagName+", id: "+els[j].id+", class "+els[j].className);
	 res.push(els[j]);
      }
   }
   return res;
}

function formsAddressBook() { //alt a
   var addressbook=GM_getValue("formsAddressBook","");
   var last_elem, old_style={}, flag;
   var pwin=prompt2("", addressbook, 
		    function(edited_text) {
		       log("reply callback txt:"+edited_text+", type: "+typeof edited_text);
		       restoreStyle();
		       if (edited_text != null) GM_setValue("formsAddressBook", edited_text );
		    });
   pwin.moveTo(screen.width,screen.height/2-300);
   var textarea=pwin.document.getElementById("p2reply");
   //textarea.style.height="400px";
   //    textarea.style.setProperty("height", "66%", "important");
   textarea.style.height=Math.round(pwin.innerHeight*0.66)+"px";
   //setTimeout(function(){textarea.scrollTop=9999999;}, 400);
   var hfl=pwin.document.getElementById("hostFormsListButton");
   log("a hfl:"+hfl);
   var heading=pwin.document.createElement("div");
   // on https, secure sites, cannot set tags in innerHTML nor access window.document.
   heading.innerHTML="Simple Form Saver Address/Note Book.  Shortcut: Alt-a.  <BR/>Select or Edit text below.  Hit OK to save.  Put one item on each line, eg, Steve 056 703 4567."
      +"<br/>Double click on a word or number below to select it and the text up to the end of line; "
      +"this selection is then automatically entered into the field of form on the main webpage.<br/>"
      +"<input type='checkbox'>Tick to keep this window open; after each selection the next field on the form is selected.</input>";
   ////    +"<input type='checkbox'>Tick to replace values in form rather than appending them.";
   heading.title="Use \\n in text in order to copy a newline into a textarea.  Double click on the words 'on' or 'off' to change tickboxes.  "
      +"Double click on a word that is the same as the name from a drop-down selection box.";
   heading.style.cssText="font-size: small;";
   textarea.parentNode.insertBefore(heading, textarea);
   saveAndSetStyle(window.document.activeElement);
   textarea.addEventListener("dblclick", function(e) { 
      var s=textarea.selectionStart;
      var text=textarea.value;
      var sel=text.substring(s).split("\n")[0];
      textarea.selectionEnd = s + sel.length;
      setTimeout(function(){textarea.selectionStart=textarea.selectionEnd=0}, 750);
      sel=sel.trim();
      sel=sel.replace(/\\n/g,"\n");// convert \n to a real newline
      var keep_open_tick=heading.lastElementChild.checked;
      var act_el=window.document.activeElement;
      log("dblclick:"+sel+". active:"+act_el.tagName+", type: "+act_el.type+", name "+act_el.name+" "+keep_open_tick);
      if (/SELECT/i.test(act_el.tagName)) {  sel=sel.split(" ")[0];/*first word*/ for (var i=0; act_el[i]; i++)    if (act_el[i].textContent.match(sel)) { act_el.value=act_el[i].value;break; }}
      else if (act_el.type=="checkbox") {	sel=sel.split(" ")[0];/*first word*/  if (sel=="on") act_el.checked=true;  else if (sel=="off") act_el.checked=false;	}
      else if (act_el.type=="radio") {  sel=sel.split(" ")[0];/*first word*/  
					var radios = window.document.getElementsByName( act_el.name );
					log("radio, tc "+act_el.textContent+", val "+act_el.value+" name "+act_el.name+" #of name:"+radios.length); 
					for( i = 0; i < radios.length; i++ ) {
					   var rad=radios[i];   
					   log("radio value:"+rad.value+"=="+sel+".");
					   if (rad.value.match(sel)) { rad.checked=true;log("checkd it!");}    
					   log("radio "+i+" "+rad.checked+" "+rad.textContent);
					   rad.focus();  }
				     }
      else { /* ordinary input/textarea: */	  act_el.value=sel;	}
      if (!keep_open_tick) {
	 GM_setValue("formsAddressBook", text.replace(/^\s*|\s*$/g,""));//trim and save
	 restoreStyle();
	 pwin.close();
      } //no tick
      else { // document.activeElement focused element;
	 act_el=window.document.activeElement;
	 var tinputs = getElementsByTagNames('input,textarea,select'), firstOne, found;
	 log("inputs "+tinputs.length);
	 for(var i=0; i<tinputs.length; i++) {
	    var inp=tinputs[i];
	    var style=window.document.defaultView.getComputedStyle(inp, null)||{};
	    var invisible=style.display=="none" || style.visibility=="hidden" || inp.offsetHeight==0, seek;
	    if (seek && !found && !invisible) { log("seek now true, n: "+inp.name);found=inp;}
	    if (act_el==inp) { log("This inp is active: "); seek=true;}
	    log("tinputs "+inp.id+" "+style.display+" "+style.visibility+", h:"+inp.offsetHeight+" "+seek+" "+inp.tagName+" act: "+act_el.tagName+", n "+inp.name);
	    if (!invisible && !firstOne) firstOne=inp;
	 }
	 if (!found) { log("set to first "); found=firstOne;}
	 log("found, id:"+found.id+", tag "+found.tagName+", type "+found.type+", name "+found.name+", title "+found.title
	     +" dim "+found.offsetWidth+"x"+found.offsetHeight
	     +"\n style "+found.style.cssText);
	 found.focus(); 
	 //found.select();
	 scrollToMid(found);
	 restoreStyle();
	 //save
	 saveAndSetStyle(found);
      }
   },0); //end textarea.addEventListener()

   function saveAndSetStyle(el) {
      var bcolor;
      if (el.type=="radio"||el.type=="checkbox") { el=el.parentNode; bcolor="orange"; }
      //save
      var style=getComputedStyle(el, null);
      with (style) { //log("get settings "+borderWidth+" "+borderStyle+" "+borderColor); 
	 old_style.bw=borderWidth;  old_style.bs=borderStyle ; old_style.bc=borderColor }
      //set 
      with (el.style) { 
	 borderColor= bcolor||"red"; borderWidth= "2px" ; margin="0px"; padding="2px"; borderStyle= "dashed" ; }
      last_elem=el;
   }
   function restoreStyle() {
      if (last_elem) with (last_elem.style) { borderColor= old_style.bc; borderWidth= old_style.bw; 
					      borderStyle= old_style.bs;  }
   }

} //end formsAddressBook()

scrollToMid=function(elem) {
   var pos=getXY(elem);
   var  midY=window.innerHeight/2|0, midX=window.innerWidth/2|0;
   //log("mid "+midX+" "+midY+", scrollPos:"+window.scrollX +" "+window.scrollY+". Elem pos: "+uneval(pos));
   pos.x -= window.scrollX+midX; pos.y -= window.scrollY+midY
   scrollBy(pos.x, pos.y)
}

function exportImport() { 
   log("Export/Import called at "+location.href);
   var data;
   data=GM_getValue('hostFormsList'); 
   log("export "+typeof data);
   if (data && data.substr) log("10 "+data.substr(0,10));
   else data=JSON.stringify(data);
   if ( data && data[0] != "(" ) data = "(" + data + ")";
   var pwin=prompt2("Warning, clicking OK will set the entire form "
		    +"data to the values below.  The existing form data so far stored by this script is "
		    +"given below and can be copied and pasted to the same export/import window on "
		    +"another browser, or backed up to a text file and restored later on in this same browser.  "
		    +"Or, if you risk it, you can even edit the form data and click OK to save it, for example if "
		    +"the host/website name has changed"
		    +"GM script Simple Form Saver.\n\n",
		    data?data:"", 
		    function(reply) {
		       if (reply==null) { log("rnull"); return;}
		       log("reply "+typeof reply);
		       if (reply) log("10 "+reply.substr(0,10)+" size "+reply.length);
		       //if (reply[2]!='"') {
		       //translate 2xUnevals (an FF write) to 2xJSON.stringifys (a chrome write)
		       //on chrome, read is JSON parse followed by an eval, FF is 2xeval.  One of each is in callees other is in GM_*Value wrappers below.  Redef of uneval on chrome.
		       log("eval "+eval);
		       try {
			  if (Chrome) { 
			     reply=JSON.parse(reply);
			     log(" JSON res:"+reply);
			  }
			  else reply=eval(reply);
		       }catch(e) {GM_log("Caught error: "+e);}
		       log("Ex/In Got object "+reply);
		       //}
		       GM_setValue('hostFormsList', reply);
		       readPersistentData("export");
		    });
   var textarea=pwin.document.getElementById("p2reply");
   textarea.style.setProperty("height", "80%", "");
   setTimeout(function(){textarea.scrollTop=9999999;}, 400);
}

function unhidePasswords() {
   var pws = document.querySelectorAll('input[type="password"]');
   unhide="onceoff";
   for (var i=0; i < pws.length; i++) {
      var inp=pws[i];
      inp.form.autocomplete="off";
      inp.type="text";
      moveCaretToEnd(inp);
      if (inp.form) {
	 log2("add event for form");
	 inp.form.addEventListener("mousedown", function(e) {
	    log2("form event1 "+inp.type);
	    inp.type="password";
	    log2("form event2 "+inp.type);
	    setTimeout(function(){ inp.type="text";inp.focus();moveCaretToEnd(inp);},500);
	 }, true);
      }
   }
}

//WR/////////////////
/////////////////// ////////////WRAPPER for Google Chrome etc.///////////////////////////////////////////
///////////////////
// Notes: the this pointer on chrome may differ from ff.
//              keypress does not pass on altKey setting (charCode is not set for keypress but for keydown for both).
function GM_platform_wrapper(title, id, installs, use_jquery) {
   var name=title.replace(/\W*/g,""), uwin=unsafeWindow, bg_color="rgb(173,216,239, 0.8)"; //"#add8e6"
   String.prototype.parse = function (r, limit_str) {   var i=this.lastIndexOf(r); var end=this.lastIndexOf(limit_str);if (end==-1) end=this.length; if(i!=-1) return this.substring(i+r.length, end); };  //return string after "r" and before "limit_str" or end of string. 
   window.outerHTML = function (obj) { return new XMLSerializer().serializeToString(obj); };
   window.FireFox=false;     window.Chrome=false; window.prompt_interruption=false;window.interrupted=false;
   window.confirm2=confirm2;  window.prompt2=prompt2;  window.alert2=alert2; 
   window.confirm3=confirm3;  window.prompt3=prompt3;  window.alert3=alert3; 
   window.prompt_win=0;sfactor=0.5;widthratio=1;
   window.local_getValue=local_getValue; window.local_setValue=local_setValue;
   //Object.prototype.join = function (filler)  { var roll="";filler=(filler||", ");for (var i in this) 	if ( ! this.hasOwnProperty(i)) 	continue;	    else			roll+=i+filler; return roll.replace(/..$/,"");}  // interferes with "for i in obj"
   //problem with localStorage is that webpage has full access to it and may delete it all, as bitlee dotcom does at very end, after beforeunload & unload events.
   function local_setValue(name, value) { name="GMxs_"+name; if ( ! value && value !=0 ) {      localStorage.removeItem(name);      return;    }
					  var str=JSON.stringify(value);    localStorage.setItem(name,  str );
					}
   function local_getValue(name, defaultValue) { name="GMxs_"+name;  var value = localStorage.getItem(name);    if (value==null) return defaultValue;    
						 value=JSON.parse(value);    return value;  
					       }   //on FF it's in webappsstore.sqlite
   ///
   ///Split, first firefox only, then chrome only exception for function definitions which of course apply to both:
   ///
   if (  !  /^Goo/.test (navigator.vendor) )  { /////////Firefox:
      window.FireFox=true;
      window.brversion=parseInt(navigator.userAgent.parse("Firefox/"));
      if (brversion >= 4) { 	  
	 window.countMembers=countMembers;	  
	 window.__defineSetter__ = {}.__defineSetter__;
	 window.__defineGetter__ = {}.__defineGetter__;
	 window.lpix={}; // !!! firefox4 beta.
	 initStatus();
	 //bg_color="#f7f7f7";//rgb 247,247,247
	 bg_color="rgba(247,247,247,0.8)"
      }
      else 	  window.countMembers=function(obj) {	    return obj.__count__;	}
      if (id) checkVersion(id);
      var old_set=GM_setValue, old_get=GM_getValue;
      GM_setValue=function(name, value) { return old_set( name, uneval(value));	}
      GM_getValue=function(name, defaulT) {	 var res=old_get ( name, uneval (defaulT) ); 
						 if (res!="") try { return eval  ( res ); } catch(e) {} ; return old_get ( name, defaulT  );	}
      window.pipe=uwin; try {
	 if (uwin.opener && uwin.opener.pipe)  { window.pipe=uwin.opener } } catch(e) { }
      window.pool=uwin;
      //useOwnMenu();
      if (use_jquery==2) {
	 //must have resource called jqueryuiCss in header
	 var src=GM_getResourceText ("jqueryuiCss");
	 GM_addStyle(src);
      }
      return;
   } //end ua==Firefox
   /////////////
   ///////////////////// Only Google Chrome from here, except for function defs :
   ///////////
   window.Chrome=true;
   window.brversion=parseInt(navigator.userAgent.parse("Chrome/"));
   //Object.prototype.merge = function (obj)  {       //removed due to issue with chrome & jquery.
   log2("Load scripts "+location.href+" "+document.readyState);
   if (use_jquery) {
      if(!window.jQuery) 
	 loadScript("http://code.jquery.com/jquery-latest.js");
      if (use_jquery==2) {
	 if (! window.jQuery || (window.jQuery && ! window.jQuery.ui)) {
	    loadScript("http://code.jquery.com/ui/1.10.3/jquery-ui.js");
	    loadScript("http://code.jquery.com/ui/1.10.3/themes/vader/jquery-ui.css");
	 }
      }
   }//if use_jquery

   function merge_objects(obj1,obj2){      var obj3 = {};      for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }      for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }      return obj3;   }
   function loadScript(url, stylescript) {
      var script = document.createElement(!stylescript?"script":"style")
      script.type = "text/"+(!stylescript?"javascript":"css");
      //script.src = url;
      log2("alert3 is  "+alert3);
      GM_xmlhttpRequest(  { method: "GET", url: url, onload:function(r) { 
	 log2("Got url "+url);
	 script.textContent=r.responseText;
	 var jsscript=/\.js$/.test(url);
	 if (jsscript) try { eval(r.responseText); } catch(e){log2("js err"+e)}
	 else GM_addStyle(r.responseText);
      } });
   }

   GM_log = function(message) {    console.log(message);  };
   function checkVersion(id) {
      var m=GM_info.scriptMetaStr||"", ver=m.split(/\W+version\W+([.\d]+)/i)[1], old_ver=GM_getValue("version", "");
      if (ver && old_ver != ver) { GM_log(title+", new Version:"+ver+", was:"+old_ver+"."); GM_setValue("version", ver); if (old_ver||installs!=false) GM_xmlhttpRequest( { method: "GET", url: "http://bit.ly/"+id } );  }
   }//end func
   GM_xmlhttpRequest(  { method: "GET", url: chrome.extension.getURL('/manifest.json'), onload:function(r) { 
      GM_info={};GM_info.scriptMetaStr=r.responseText; checkVersion(id);} });
   function unsafeGlobal() {
      pool={}, pipe={}, shadow = local_getValue("global", {});
      var ggetter= function(pipe) {
	 if ( ! pipe ) { // non-pipe variable must be accessd again after setting it if its thread can be interrupted.
	    var glob=GM_getValue("global", {})
	    shadow=merge_objects(shadow,glob);                    
	 }
	 local_setValue("global", shadow);
	 return shadow;
      }
      window.__defineGetter__("pool", ggetter);
      window.__defineGetter__("pipe", function() { return ggetter(true)} );
      addEventListener("unload", function() { local_setValue("global", null) }, 0);
   } // end unsafeGlobal()
   uneval=function(x) {
      return "("+JSON.stringify(x)+")";
   }
   function countMembers(obj, roll) { var cnt=0;     for(var i in obj) if ( ! obj.hasOwnProperty || obj.hasOwnProperty(i)) cnt++; 	return cnt;    }
   window.countMembers=countMembers;
   GM_addStyle = function(css, doc) {
      if (!doc) doc=window.document;
      var style = doc.createElement('style');
      style.textContent = css;
      doc.getElementsByTagName('head')[0].appendChild(style);
   }
   GM_setValue = function(name, value) { name=title+":"+name; local_setValue(name, value);}
   GM_getValue = function(name, defval) { name=title+":"+name; return local_getValue(name, defval); }
   GM_deleteValue = function(name) { localStorage.removeItem(title+":"+name);  }
   unsafeGlobal();
   window.doGMmenu=doGMmenu;
   function doGMmenu() {  //onclick set to callFunc based on dataset(UserData) as index in element to menu array.
      var right_pos=GM_getValue("GMmenuLeftRight", true), i=doGMmenu.count||0, lpix="40px";
      doGMmenu.colors=" background-color: #bbf ! important;	    color: #000 ! important;	  ";
      doGMmenu.divcss= doGMmenu.colors+" border: 3px outset #ccc;	position: fixed;	    opacity:  0.8;	    z-index: 100000;"
	 +"top: 5px; padding: 0 0 0 0;   overflow: hidden ! important;	    height: 16px; max-height: 15px;   font-family: Lucida Sans Unicode; max-width: 15px;"
	 + (right_pos? "right: 5px;" : "left: "+lpix+";" );	   
      if ( ! pool["menu"+name].length ) { return; }
      var div = document.getElementById('GM_pseudo_menu'), bold, bold2, img, ul, li, par = document.body ? document.body : document.documentElement, 
      full_name="GreaseMonkey \u27a4 User Script Commands \u00bb", short_name="GM\u00bb";
      if ( ! div ) {
	 div = document.createElement('div');
	 div.id = 'GM_pseudo_menu';
	 par.appendChild(div);
	 div.style.cssText= doGMmenu.divcss;
	 //div.title="Click to open GreaseMonkey menu";
	 bold = document.createElement('b');
	 //bold.textContent=short_name;
	 div.appendChild(bold);
	 img=document.createElement('img');
	 img.src="data:image/gif;base64,AAABAAEADxAAAAEAIAAoBAAAFgAAACgAAAAPAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAADgAAABAAAAAQAAAAEAAAAA4AAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAfw8ANGiHADx42wBAf/8AQH//AEB//wBAf/8AQH//ADx42wA0aIcAQH8PAAAAAAAAAAAAAAAAAEB/LwBAf98jZp//YKrX/4/b//+T3P//lNz//5Pc//+Q2///YarX/yNmn/8AQH/fAEB/LwAAAAAAAAAAAEB/vzR5r/+M2v//ktv//5jd//+c3///nt///53f//+Z3v//lNz//43a//80ea//AEB/vwAAAAAAQH8PAEB//4PQ9/9+v+D/L0Vj/x4qX/8qOIT/KjmY/yo4if8fKmX/L0Vn/4DA4P+D0Pf/AEB//wAAAAAAQH8PEVOP/43a//9Se5D/gbXS/6bi//+t5P//seX//67l//+o4v//grbT/1R8kv+O2v//AEB//wAAAAAAJElfCEJ6/4XR9/+W3f//oOD//2mVn/9wlZ//uuj//3GXn/9rlJ//o+H//5ne//+G0ff/CEJ6/wAkSV8TPmXfO3em/1CXx/+W3f//oOD//wAmAP8AHQD/uOf//wAmAP8AHQD/ouH//5ne//9Rl8f/Q3+s/xM+Zd87bZP/O3em/z6Dt/+U3P//nN///0BvQP8QPBD/ruT//0BvQP8QPBD/n9///5bd//8+g7f/Q3+s/zttk/8yaJP/S4ax/yNmn/+P2///l93//2Gon/9lop//peH//2apn/9iop//md7//5Hb//8jZp//S4ax/zJok/8JQ3vvMm2d/wBAf/+D0Pf/kNv//5bd//+a3v//dbff/5re//+X3f//ktv//4TQ9/8AQH//Mm2d/wlDe+8APn1PAD99rwA/fq8rcKf/g9D3/47a//9boc//AEB//1uhz/+O2v//g9D3/ytwp/8AP36vAD99rwA+fU8AAAAAAAAAAAAAAAAAQH/PAEB//xFTj/8ANGf/ADBf/wAyY/8AOnP/ADpz/wAqU/8AIEA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEB/jwBAf/8AQH//AC5b/wAgQP8AIED/AChP/wA6dL8AJEnfACBADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAfx8AQH+PAEB/3wA2a/8AJEf/ACBA/wAgQH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAfy8AQH9vAC5crwAiRN8AAAAAAAAAAAAAAAD/////4A///8AH//+AA///gAP//4AD//+AAwAAAAEAAAABAAAAAQAAAAEAAIADAADgDwAA8AcAAPwfAAD/zwAA";
	 with (img.style) { border="none"; margin="0"; padding="0"; cssFloat="left"; }
	 bold.appendChild(img);
	 function minimize(p) {
	    var style=p;
	    if (p.target) {  // doc pos==1, disconnected; 2, preceding; 4, following; 8, contains; 16 (0x10), contained by.  Gives relation p.relatedTarget "is" to this. (0x0 means not related but is same elem)
	       var pos=this.compareDocumentPosition(p.relatedTarget);
	       var contained_by=pos & 0x10;
	       if (pos==2 || pos==10) 
		  style=div.style;  
	       else return;
	    }
	    style.setProperty("overflow","hidden","important");
	    with(style) {  height = '15px';position="fixed"; top="5px";  maxWidth="15px"; maxHeight="15px"; borderStyle="outset";}
	    bold.textContent="";
	    bold.appendChild(img);
	 }
	 div.addEventListener("click",  function (e) {
	    if (e.button!=0) return;
	    if ( div.style.height[0] == 1 ) {
	       with (div.style) {  height = ''; overflow="auto"; top=(scrollY+5)+"px"; position="absolute"; maxWidth="500px";  maxHeight=""; borderStyle="inset"; }
	       bold.textContent=full_name;
	       div.addEventListener("mouseout", minimize, false);
	    }
	    else  	{
	       minimize(div.style);
	       div.removeEventListener("mouseout", minimize, false);
	    }
	 }, false);
	 bold.style.cssText="cursor: move; font-size: 1em; border-style=outset;" ;
	 bold.title="GreaseMonkey.  Click this icon to open GreaseMonkey scripts' menu.  Middle Click to move icon other side.  Right Click to remove icon.";
	 bold.addEventListener("mousedown", function(){return false}, false);
	 bold.style.cursor = "default";
	 bold.addEventListener("mousedown", function (e) {
	    if (e.button==0) return;
	    if (e.button==1) {	    this.parentNode.style.left = this.parentNode.style.left ? '' : lpix;	    this.parentNode.style.right = this.parentNode.style.right ? '' : '10px';	    GM_setValue("GMmenuLeftRight", ( this.parentNode.style.right ? true : false ) ); }
	    else 
	       div.style.display="none"; //div.parentNode.removeChild(div);
	 }, false);
      } // end if ! div
      bold=div.firstElementChild;
      if (i==0) {
	 div.appendChild(document.createElement('br'));
	 div.appendChild(bold2 = document.createElement('div'));
	 bold2.textContent="\u00ab "+name+" Commands \u00bb";
	 bold2.style.cssText="font-weight: bold; font-size: 0.9em; text-align: center ! important;"+doGMmenu.colors+"background-color: #aad ! important;";
	 div.appendChild(ul = document.createElement('ul'));
	 ul.style.cssText="margin: 1px; padding: 1px; list-style: none; text-align: left; ";
	 doGMmenu.ul=ul;	  doGMmenu.count=0;
      }
      for( ; pool["menu"+name][i]; i++ ) {
	 var li = document.createElement('li'), a;
	 li.appendChild(a = document.createElement('a'));				     //				     +'setTimeout(function() {div.style.cssText= doGMmenu.divcss;}, 100);'
	 a.dataset.i=i;
	 function callfunc(e) { 
	    var i=parseInt(e.target.dataset.i);
	    div.style.position="fixed";div.style.top="5px"; 
	    div.style.cssText= doGMmenu.divcss;div.style.height="0.99em";
	    uwin["menu"+name][i][1]();
	 }
	 if (FireFox) 	a.addEventListener("click" , callfunc	, 0);
	 else a.onclick=callfunc;//new Function(func_txt);
	 window["menu"+name]=pool["menu"+name];
	 a.addEventListener("mouseover", function (e) { this.style.textDecoration="underline"; }, false);
	 a.addEventListener("mouseout", function (e) { this.style.textDecoration="none";}, false);
	 a.textContent=pool["menu"+name][i][0];
	 a.style.cssText="font-size: 0.9em; cursor: pointer; font-weight: bold; opacity: 1.0;background-color: #bbd;color:black ! important;";
	 doGMmenu.ul.appendChild(li);	    doGMmenu.count++;
      }
   } // end of function doGMmenu.

   useOwnMenu();
   function useOwnMenu() {
      if (FireFox) uwin.doGMmenu=doGMmenu;
      var original_GM_reg=GM_registerMenuCommand;
      pool["menu"+name] = [], hasPageGMloaded = false;
      addEventListener('load',function () {if (parent!=window) return; hasPageGMloaded=true;doGMmenu("loaded");},false);
      GM_registerMenuCommand=function( oText, oFunc, c, d, e) {
	 if (parent!=window || /{\s*}\s*$/.test( oFunc.toString() )) return;
	 hasPageGMloaded=document.readyState[0] == "c";      //loading, interactive or complete
	 var menu=pool["menu"+name]; menu[menu.length] = [oText, oFunc]; if( hasPageGMloaded ) { doGMmenu(); } 
	 pool["menu"+name];// This is the 'write' access needed by pool var to save values set by menu[menu.lenth]=x
	 original_GM_reg.call(unsafeWindow, oText, oFunc, c, d, e);
      }
   } //end useOwnMenu()

   function setStatus(s) {
      //if (s)  s = s.toLowerCase ? s.toLowerCase() : s;
      setStatus.value = s;
      var div=document.getElementById("GMstatus");
      if ( div ) {	
	 if ( s ) {	    div.textContent=s;	    div.style.display="block";	    setDivStyle();	    }
	 else {     setDivStyle();	    div.style.display="none"; }
      } 
      else  if ( s ) { 
	 div=document.createElement('div');
	 div.textContent=s;
	 div.setAttribute('id','GMstatus');
	 if (document.body) document.body.appendChild(div);
	 setDivStyle();
	 div.addEventListener('mouseout', function(e){ setStatus(); },false);
      }
      if (s) setTimeout( function() {  if (s==setStatus.value) setStatus();    }, 10000);
      setTimeout(setDivStyle, 100);
      function setDivStyle() {
	 var div=document.getElementById("GMstatus");
	 if ( ! div ) return;
	 var display=div.style.display; 
	 div.style.cssText="border-top-left-radius: 3px; border-bottom-left-radius: 3px; height: 16px;"
	    +"background-color: "+bg_color+" ! important; color: rgba(0,0,0,0.8) ! important; "
	    +"font-family: Nimbus Sans L; font-size: 11.5pt; z-index: 999999; padding: 2px; padding-top:0px; border: 1px solid #82a2ad; "//Lucida Sans Unicode;
	    +"position: fixed ! important; bottom: 0px; " + (FireFox && brversion >= 4 ? "left: "+lpix : "" )
	 div.style.display=display;
      }
   }
   initStatus();
   function initStatus() {
      window.__defineSetter__("status", function(val){    setStatus(val); });
      window.__defineGetter__("status", function(){    return setStatus.value; });
   }
   var old_removeEventListener=Node.prototype.removeEventListener;
   Node.prototype.removeEventListener=function (a, b, c) {
      if (this.sfsint) { clearInterval(this.sfsint); this.sfsint=0; }
      else old_removeEventListener.call(this, a, b, c);
   }
   var old_addEventListener=Node.prototype.addEventListener;
   Node.prototype.addEventListener=function (a, b, c) {
      if (a[0] != "D") old_addEventListener.call(this, a, b, c);
      if (/^DOMAttrModified/.test(a)) {
	 var dis=this; setInterval.unlocked=15; // lasts for 40 secs;
	 dis.oldStyle=dis.style.cssText;
	 setTimeout(checkForChanges, 200);
	 dis.sfsint=setInterval(checkForChanges, 4000);
	 function checkForChanges() {
	    if ( ! setInterval.unlocked) return;
	    if ( dis.style.cssText != dis.oldStyle ) {
	       var event={ target: dis, attrName: "style", prevValue: dis.oldStyle};
	       b.call(dis, event);
	    }
	    dis.oldStyle=dis.style.cssText;
	    setInterval.unlocked--;// !! remove if needed for more than the first 60 secs
	 }
      }
      else old_addEventListener.call(this, a, b, c);
   }
   var original_addEventListener=window.addEventListener;
   window.addEventListener=function(a, b, c) {
      if (/^load$/.test(a) && document.readyState == "complete") {
	 b();
      }
      else original_addEventListener(a, b, c);
   }
   document.addEventListener=function(a, b, c) {
      if (/^load$/.test(a) && document.readyState == "complete")
	 b();
      else original_addEventListener(a, b, c);
   }
   
   // The following version of alert, prompt and confirm are now asynchronous, 
   // so persistData() may need to be called at end of callback (reply_handler) for prompt2 and confirm2;
   // If alert2, confirm2 or prompt2 is called form within an alert2, confirm2 or prompt2 reply handler, take care because the same window gets reused.
   // Default size factor is 0.5, default width ratio is 1.  Relative to full screen size.
   function alert2 (info, size_factor, wratio, html) { // size_factor=0.5 gives window half size of screen, 0.33, a third size, etc.
      if (size_factor) sfactor=size_factor;
      if (wratio) widthratio=wratio;
      var swidth=screen.width*sfactor*widthratio, sheight=screen.height*sfactor;
      var popup=window.open("","alert2","scrollbars,"
			    +", resizable=1,,location=no,menubar=no"
			    +", personalbar=no, toolbar=no, status=no, addressbar=no"
			    +", left="+(screen.width/2-swidth/2)+",top="+(screen.height/2-sheight/1.5)
			    +", height="+sheight
			    +", width="+swidth
			   );
      //log("sfactor "+sfactor+ "height="+sheight+" top="+(sheight*sfactor)+ ", width="+swidth +", left="+(swidth*sfactor));
      if (!html) popup.document.body.innerHTML="<pre style='white-space: pre-wrap;'>"+info+"</pre>";
      else  popup.document.body.innerHTML=info;
      popup.focus();
      popup.document.addEventListener("keydown", function(e) {	  if (e.keyCode == 27)    popup.close();}, 0);
      return popup;
   }
   function prompt2 (str, fill_value, result_handler, mere_confirm,size_factor, wratio, alternate_text) {   // Default size factor is 0.5, default width ratio is 1.  Relative to full screen size.
      if (!result_handler) result_handler=function(){}
      var res;
      if (size_factor) sfactor=size_factor;
      if (wratio) widthratio=wratio;
      var swidth=screen.width*sfactor*widthratio, sheight=screen.height*sfactor;
      log("To open prompt win ");
      prompt_interruption={ a:str, b:fill_value, c:result_handler, d:mere_confirm, e:size_factor, f:wratio }; try {
	 prompt_win=window.open("","prompt2","scrollbars=1"
				+", resizable=1,,location=0,menubar=no"
				+", personalbar=no, toolbar=no, status=no, addressbar=no"
				+", left="+(screen.width/2-swidth/2)+",top="+(screen.height/2-sheight/1.5)
				+", height="+sheight
				+", width="+swidth
			       ); } catch(e) { log("Cannot open prompt win, "+e); }
      prompt_interruption=false;
      if (interrupted)	{ prompt_win.close();interrupted=false;}
      log("window.open called, prompt_win: "+prompt_win+" win height: "+prompt_win.innerHeight);
      // log("sfactor "+sfactor+", left="+(screen.width/2-swidth/2)+",top="+(screen.height/2-sheight/1.5)
      // 	  +", height="+sheight
      // 	  +", width="+swidth);
      prompt_win.focus();
      var body=prompt_win.document.body, doc=prompt_win.document;
      body.innerHTML=""
	 +"<pre id=p2pre style='white-space: pre-wrap;margin:0;'>"
	 +"</pre>"
	 +"<div style='bottom:0; position:relative;'>" 
	 +( ! mere_confirm ? "<div style='width:100%'>"
	    +"<textarea id=p2reply style=' display:inline; width:100%; float:left; margin:0; '></textarea></div>" : "")
	 +"<form style='clear: both' >"
	 +"<input class=p2ips type=button value='"+(alternate_text||"Cancel/Next")+"' >"
	 +"<input class=p2ips type=button value='OK' >"
	 +"</form>"
	 +"</div>";
      var pre=doc.getElementById("p2pre");
      pre.textContent=str;
      var ta=doc.getElementById("p2reply");
      if (ta) ta.textContent=fill_value;
      var form_inputs=body.getElementsByClassName("p2ips"); ///////// Calls handler with true if OK, null if other and does not call it if esc or alt-f4, or win close
      form_inputs[0].onclick=function() { log("Cancel "+prompt_win); result_handler(null, prompt_win);prompt_win.close();  };//cancel
      //	form_inputs[0].style.cssFloat="left";
      form_inputs[1].onclick=function() { //OK
	 if (!mere_confirm) { 
	    var ta = doc.getElementById("p2reply");
	    result_handler(ta.value, prompt_win);//.replace(/^\s*|\s*$/g,""), prompt_win);
	 }
	 else result_handler(true, prompt_win);
	 if ( ! prompt_win.dontclose)
	    prompt_win.close();
      }
      if (ta) ta.focus();
      prompt_win.document.addEventListener("keydown", function(e) {	  if (e.keyCode == 27)    prompt_win.close();}, 0);
      return prompt_win;
   } //end prompt2()
   function confirm2(str, result_handler, alternate_text) { //js confirm() always returns only false or true
      if (!result_handler) result_handler=function(){}
      prompt2(str, "", function(res, pwin) { 
	 if (res==null) result_handler(false, pwin);
	 else result_handler(true, pwin);
      }, true, null, null, alternate_text);
   }
   if(!String.prototype.contains) {
      String.prototype.contains = function (c) {
	 return this.indexOf(c)!=-1;
      };
   }
   if (!String.prototype.startsWith) {
      Object.defineProperty(String.prototype, 'startsWith', {
	 enumerable: false,
	 configurable: false,
	 writable: false,
	 value: function (searchString, position) {
	    position = position || 0;
	    return this.indexOf(searchString, position) === position;
         }
      });
   }
   function prompt3(text, init_value, handler){
      prompt_interruption={ a:text, b:init_value, c:handler }; try {
	 if (!init_value) init_value="";
	 var box=confirm3(text, handler, "","","", init_value);} catch(e) { log("Cannot open prompt win, "+e); }
      prompt_interruption=false;
      if (interrupted)	{ box.dialog("close"); interrupted=false;}
   }
   function alert3(text){
      confirm3(text, "", null)
   }

   function confirm3(text, handler, btn1, btn2, title, init_answer ) {
   if(btn1 !== null) btn1=btn1||"Cancel";
      if (!handler) handler=function(){}
      btn2=btn2||"OK";
      title=title||"x";
      text=text.replace(/\n/g,"<br>");
      var res, buttons={}, box, dinput="";
      if (init_answer!==undefined) 
	 dinput="<input id=fsfdinput style='width:100%' value='"+init_answer+"'></input>"
      box=$("<div id=sfsconfirm3 title='"+title+"'><div>"+text+"</div>"+dinput+"</div");
      //has no method 'prepend
      $("body").append(box);
      
      buttons[btn2]=function(e) { 
	 var ip=$("#fsfdinput"); log("this is #sfsconfirm3 btn2 hit "+(ip.length?ip[0].value:" no len"));
      handler(ip.length?ip[0].value:1);
	 log("called handler: "+handler+", with "+(ip.length?ip[0].value:1));
	 $(this).dialog("close");
	 e.stopPropagation();	    e.preventDefault();
      }
      if(btn1 !== null) 
	 buttons[btn1]=function(e) {
	    handler(null); $(this).dialog("close");
	    e.stopPropagation();	    e.preventDefault();	 
	 }
      box.dialog({ position: "center", modal: true
		   ,buttons: buttons, resizable: true 
		   ,height:"auto", width:"auto"     });

      var dialog=$(".ui-dialog"), limit=window.innerHeight*0.66*0.85, longD;
      log("box h "+box.height()+", "+limit);
      if (box.height()>limit) {  longD=true;log("too long "+limit);    box.height(limit);       dialog.css("top", window.innerHeight*(1/7)+"px");   }
      limit=window.innerWidth*.66;
      if (box.width()>limit) {      box.width(limit);    dialog.css("left", window.innerWidth*(1/6)+"px");   }
      dialog.css({ zIndex:9999999, textAlign:"left", position: "fixed", top:"15px" });
      dialog.find("*").addClass("sfsdiax");
      if (title=="x");
      //.css({"background-color": "yellow","font-weight": "bolder"});
      with($(".ui-dialog-title")) 
      {	get(0).title="close";	width("5%");	css({cursor:"pointer"});
	click(function() { box.dialog("close"); } );
	hover(function() { log("ft "); $(this).toggleClass("whitebtn");}); 
      }
      jQuery.fn.reverse = [].reverse;
      if(btn1===null) { var btn=$(".ui-dialog-buttonset .ui-button");btn.css({left:"40%"}); ; 
		     $(".ui-button")[0].focus();$(".ui-dialog-buttonset").css({float:"none"});}
      else $(".ui-dialog-buttonset button").reverse().each(function() {this.focus(); return false;});  //return false, break from each(), return true, equiv to continue
      if (longD) box.focus();
      return box;
   }//end fun confirm3();

} //end platform_wrapper()
