// ==UserScript==
// @name ragbag html
// @version 1.5.0
// @require  http://code.jquery.com/jquery-latest.min.js
// @require  http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @resource jqueryuiCss http://code.jquery.com/ui/1.10.3/themes/vader/jquery-ui.css 
// @include *
// @run-at   document-start
// @description utilities:
// ###1. Log your input to a webpage automatically.
// ###2. User can cut & paste HTML elements by doing ctrl-shift-click to cut an element; ctrl-<right-click> pastes it.  Ctrl-number, jumps to nth link, 0th shows numbering.
// ###3. One can use shift-click to highlight/select an element.  Then hit the letter 'w' to widen and 'n' to narrow the selection (or click again);   
// ###4. Remove all links from a page , leaving just the text; is for copy/paste without accidentally selecting a link, invoke via GM icon->User Script Commands.  
// ###5. Expand size of an element or reduce it, <meta key>-click to expand it, <meta key>-shift-click to reduce its size (on windows it's ctrl-alt-click to expand & ctrl-alt-shift-click to reduce)
// ###6. Run js console.
// ###7. Zoom in/out on an element/frame eventually filling entire tab.  Zoom in one degree with alt-click; zoom out with alt-shift-click.  Zoom in fully with shift-right-click.
// ###8. View/Edit HTML under mouse.  Search and replace HTML.
// ###9. Compile a list of text for all elements of a class or of a tagname.
// ###10.Enable translation of double click on links into a single middle click.
// ###11.Permanently hide elements on a webpage.
// ###12.RGB2RYB.  Convert RGB to RYB, red yellow blue.
// ###13.Define your own shortcuts, see GM user command.
// ###14.Add numbering to lists on webpage, so control-<number> opens that one in a new page.
// @icon http://bit.ly/173I9ct
// ==/UserScript==

// not used:
// @require  http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @require  https://raw.githubusercontent.com/jquery/jquery-simulate/master/jquery.simulate.js
// @require  http://j-ulrich.github.com/jquery-simulate-ext/jquery.simulate.ext.js
// @require  http://j-ulrich.github.com/jquery-simulate-ext/jquery.simulate.key-sequence.js
// @require  http://j-ulrich.github.com/jquery-simulate-ext/bililiteRange.js
// @require  http://j-ulrich.github.com/jquery-simulate-ext/jquery.simulate.key-combo.js

function log(s) { GM_log(s); console.log(s);};// console needs both in FFv22
User_log=log; // like GM_log, our user may be looking in console or in firebug console which no longer prints GM_log messages.
log2=log;
log=function(){}
log2=function(){};

var iframe=window!=window.parent;
log("RB: New page load, at "+location.href+", frame: "+iframe);

GM_platform_wrapper("Ragbag", "1cCNRsS", false, 2); 

// //!!!
unsafeWindow.trblog=GM_getValue("bitly.com/:tilog", "");
//extensions.greasemonkey.scriptvals.userscripts.org/ragbag html.bitly.com/:tilog

// var jq=GM_getResourceText("jqueryui");//for jquery .dialog function.  Xml files cause js loading errors & prevents use of @require.
// if (! /\.xml$/.test(location.pathname) )  eval(jq);

var widener="\n______________________________________________________________\n";
var body = window.document.getElementsByTagName("body")[0];
var uwin=unsafeWindow;
var last_msg;
String.prototype.trim = function (charset) { if (!charset) return this.replace(/^\s*|\s*$/g,""); else return this.replace( RegExp("^["+charset+"]*|["+charset+"]*$", "g" ) , "");}
String.prototype.nthIndexOf= function (str, n) { var pos=0;while(n) {n--;var i=this.substr(pos+1).indexOf(str);if (i==-1) return -1;pos+=i+1;}; return pos; };
String.prototype.toNthIndexOf= function (str, n) { var i=this.nthIndexOf(str,n); if (i!=-1) return this.substring(0,i);else return this;}

var zoom_stack=[], paste_stack=[], widen_stack=[];
var last_target, last_target_clone, current_target, last_cut;
var nopopup_flag;
var the_first_cut;
var not_listening=true;
var zIndex=19;
var preserve_status=0;
var dont_reopen;
var host=window.document.location.host;
var pathname=window.document.location.pathname;
var webpage=host+pathname;
var auto_log=GM_getValue(webpage+":autolog", false), manual_log=GM_getValue(webpage+":manuallog", false); unsafeWindow.rbautolog=auto_log;
var selector="", keyspressed=null, lshortcuts={}, gshortcuts={}, shortcuts={}, shortcut_partials={};
setupShortcutsObj();
var hidElems=GM_getValue(webpage+":hidElems","");
var autotabopen=GM_getValue("tabopen", false);
var onclick_flag;
var click_translate_on=GM_getValue("click_translate", false), internal, callier, click_count=0, target;

addEventListener("load", mainline);

registerMenus(1);
function mainline(){
   //init vars not available at document-start
   log("mainline running");
   body = window.document.getElementsByTagName("body")[0];
   host=window.document.location.host;
   pathname=window.document.location.pathname;
   webpage=host+pathname;
   checkInitSession("create");
   if (autotabopen) tabopen(true);
   if (hidElems) inner_hideElements();
   if (countMembers(shortcuts)) makeShortcut();
   if (selector) addNumbering();
}

function addNumbering() {   makeShortcut(); }

function makeShortcut() {
   if (iframe) return;
   var from_main=/mainline/.test(new Error().stack), reply; //avoids over-reading stack when no arguments.
   var addNumbering=/addNumbering/.test(new Error().stack), reply; //avoids over-reading stack when no arguments.
   log2("makeShortcut, main: "+from_main+", addNumbering:"+addNumbering+", local shortcuts:"+uneval(lshortcuts)
	+"\nglobal shortcuts:"+uneval(gshortcuts)+", shortcut_partials:"+uneval(shortcut_partials));
   if(!from_main && !addNumbering) 
      prompt_for_shortcuts(); //prompt3() is asynchronous, <esc> by user could me this ends here!
   else
      restOfmakeShortcut(from_main, addNumbering); 
} 


function restOfmakeShortcut(from_main, addNumbering) {
   var qsel=$(selector);
   if (! $("#makeShortcut0").length) rbdecor(qsel);
   $(document).off("scroll.rbdecor1");
   $(document).on("scroll.rbdecor1", {init_len: qsel.length}, function(e) { //data not confused with selector becuae its type if object.
      if (! this.sgrain || this.sgrain==10) {
	 var qlen=e.data.init_len, sel=$(GM_getValue(webpage+":addlistnos:selector", "")), len=sel.length;
	 //log2(this.sgrain+" Scroll len now:"+len+", qlen: "+qlen+" rbdecor "+$(".rbdecor").length);
	 if (qlen!=len) rbdecor(sel, qlen);
	 this.sgrain=1;
      } else this.sgrain++;
   });//on()
   
   if (!from_main && addNumbering)
      prompt_for_selector();
   
   var msg="makeShortcut GM function active, selector: "+selector+".\n\nctrl Shortcuts:\n"+shortcutsList()+".";
   window.status=msg;
   GM_log(msg);
   //
   //Event handlers to process shortcuts, keydown and keyup.
   //
   $(document).off(".rbdecor2")
   $(document).on("keydown.rbdecor2", function(e, extra){
      if (e.which==17) {        //ctrl key
	 keyspressed="";
	 setTimeout(function(){keyspressed=null; log2("shortcut Timeout"); },30000)
      }
      else if (keyspressed!=null) { //&& window.getSelection().toString().length==0) { //accumulate keys while ctrl is down.
	 if (e.which<48 || e.which > 90) return;  //not a-Z,0-9.  Numbers are 0-9:48-57, Letters, 58-90
	 keyspressed+=String.fromCharCode(e.which).toLowerCase();
	 log2("keydown handler "+e.which+", keyspressed: "+keyspressed);
	 if (e.which>57 && (shortcuts[keyspressed] || shortcut_partials[keyspressed])) { log2("Suppressing:"+keyspressed+","+shortcuts[keyspressed]+"."); return false;} // A letter that's got a shortcut, else both prevents default and stops propagation.
      }
   });//keydown()
   $(document).on("keyup.rbdecor2", function(e){
      if (e.which!=17) return; //ctrl
      log2("processing ctrl keyup gathered: "+keyspressed);
      if (isNaN(keyspressed)) {
	 var action=shortcuts[keyspressed]||shortcuts[shortcut_partials[keyspressed]];
	 if (action) { //keyspressed is [a-z].
	    log2(keyspressed+" code "+keyspressed+", function to eval:  "+ action);
	    window.status="Executing self made shortcut "+keyspressed+", evaluating code: "+action;
	    eval(action);
	    setTimeout(function(){
	       log2("back after break"); 
	       rbdecor(); //adds numbers, if needed.
	    }, 500);
	 }//endif shortcuts[keyspressed]
	 else 
	    log2("Crtl-"+keyspressed + ", no shortcut.");
      }else { // it is a number
	 var targ=$("#makeShortcut"+keyspressed).parent(), col;
	 log2("keyspressed:"+keyspressed+".");
	 if (targ.length) { //alert("keyspressed were:"+keyspressed+" targ is "+targ[0].id);
	    log2("parent "+targ.attr("id"));
	    col=targ.css("backgroundColor");
	    targ.css({backgroundColor: "pink"});
	    var foundone, links=targ.find("a");
	    links.each(function(){
	       if ( ! this.href.match(location.host)) { 
		  log2("this href "+this.href);
		  foundone=true;
		  window.open(this.href, "_blank");
		  return false;
	       }
	    });// each()
	    if (!foundone) window.open(links[links.length-1].href, "_blank");
	    window.status="Opening new tab for chosen link";
	    targ.fadeOut(5000);
	    targ.fadeIn({duration: 5000, 
			 complete: function(){$(this).css({backgroundColor:col})},
			 queue: true
			});
	 }
      }
      keyspressed="";
   });//.on("keyup")
   if (!selector)    $(document).off(".rbdecor1");
   if (! shortcutsList()) $(document).off(".rbdecor2");
} //restOfmakeShortcut()

function prompt_for_shortcuts() {
   var eg="p alert($(\"input[type=password]\").val())"
   var following_text="\nCurrent shortcuts are:\n"+shortcutsList()
      +"\n\nOther examples:\ns makeShortcut(); //ctrl-s will invoke this dialog."
      +"\nn $('#pnnext')[0].click(); //goto next google results page."
      +"\nsource alert( $('body').html() ); show source."
      +"\ni $('img').remove(); //remove images from webpage."
      +"\n\nTo delete all shortcuts leave blank and hit OK.  To delete individual shortcuts leave <javascript-action> blank."

   prompt3("You can add a control-key action shortcut for this webpage.  After you set it up here, holding down the control "
	   +"key (ctrl) and pressing a letter or many (ie, a word) will invoke the javascript action.  When invoking ensure focus is on the webpage.  "
	   +"Actions must be given in javascript/jquery."
	   +"\nIts format is:\t <letter(s)><space><javascript-action>.  "
	   +"\n\nFor example,\np alert($(\"input[type=password]\").val())"
	   +"\nwill define ctrl-p to show a blanked out password.  See other examples below.  "
	   +"The default input below is only the example overwrite it,", eg, 
	   function(reply) {
	      //x=String.fromCharCode("44");
	      //"a".charCodeAt(0) ==97
	      log2("reply is "+reply);
	      if (reply) {
		 var si=reply.indexOf(" ");
		 var shortcut=reply.substring(0,si), action=reply.substring(si+1);
		 var lorglobal=confirm("Would you prefer this to be a global shortcut?  Otherwise, hit Cancel to make shortcut local to this page only.  Escape to quit.")
		 if(lorglobal==null) return;
		 var sc_list=gshortcuts, pref="addlistnos:gshortcuts"; 
		 if (!lorglobal) sc_list=lshortcuts, pref=webpage+":addlistnos:lshortcuts"; 
		 if (sc_list[shortcut] && !action) delete sc_list[shortcut]
		 else sc_list[shortcut]=action;
		 GM_setValue(pref,sc_list);
		 setupShortcutsObj();
		 log2("hotkey is ctrl-"+shortcut+", action:"+action+" shortcuts:"+uneval(shortcuts));
	      }
	      else if (reply=="") { 
		 var nlocalscs=countMembers(lshortcuts);
		 log2("deleting "+nlocalscs );
		 if (nlocalscs) 
		    GM_deleteValue(webpage+":addlistnos:lshortcuts"); 
		 else GM_deleteValue("addlistnos:gshortcuts");
		 alert("Shortcuts deleted.  "+(nlocalscs?"  Repeat to delete global shortcuts":""));
		 setupShortcutsObj() };
	      restOfmakeShortcut(false);
	   }, following_text); //call to prompt3()
} //prompt_for_shortcuts

function prompt_for_selector() {
   prompt3("Give element selector of which each element that matches it will then be numbered on the page, it is jquery/css style, eg, li:even."
	   +"\nLater on while holding the ctrl key down and typing an element's number, that element's link open in a new tab.  "
	   +"Enter nothing and hit OK to remove this function from page.  Next screen is for defining shortcuts.", GM_getValue(webpage+":addlistnos:selector",""),
	   function(reply) {   
	      log2("reply "+reply);
	      if (reply) {
		 GM_setValue(webpage+":addlistnos:selector", reply);
		 selector=reply;
		 rbdecor();
	      }
	      else if (reply!=null && selector) { //OK hit, but reply empty
		 GM_deleteValue(webpage+":addlistnos:selector");
		 $(".rbdecor").remove();
		 alert("Element numbering removed from this webpage.");
	      } //else if reply
	      //restOfmakeShortcut(true);
	   });//prompt3
} //prompt_for_selector
   
function setupShortcutsObj() {
   selector=GM_getValue(webpage+":addlistnos:selector","");
   lshortcuts=GM_getValue(webpage+":addlistnos:lshortcuts",{});
   gshortcuts=GM_getValue("addlistnos:gshortcuts", {}), 
   shortcuts=$.extend(true, {}, gshortcuts, lshortcuts); //locals have priority
   for (var i in shortcuts) { 
      var partial_string="";
      for(var j=0; j<i.length-1;j++) {
	 partial_string+=i[j];
	 shortcut_partials[partial_string]=i;
      }
   }
}

function rbdecor(sel, from_no) {
   var ndec=0;
   if (!sel) sel=$(selector);
   //log2("sel "+sel+",#:"+sel.length);
   sel.each(function(i){
      if ($(this).hasClass("rbdecor")) return;
      //if (from_no && i<from_no) return;
      ndec++;
      var label=$("<b id=makeShortcut"+i+" style='color:red; float:left; margin-right:5px;'>"+i+"</b>")
      label[0].title="This is from GM function to add numbering for each match of selector: "+selector;
      $(this).prepend(label);
      $(this).addClass("rbdecor");
   });
   //log2("Decorated each of "+ndec);ndec=0;
}//rbdecor() 

function shortcutsList(){
   var roll="";
   for(var i in shortcuts)
      roll+=i+" "+shortcuts[i]+"\n"
   return roll;
}

function fakeKey(el, key) { //fale ctrl-down  --> key down  --> keyup --> control up!!
   log2("fakeKeyDown on: "+el + ", key: " +key);
   var e, are = [ jQuery.Event("keydown"), jQuery.Event("keypress"), jQuery.Event("keyup")];
   for(var i=0; i<3; i++) {
      e=are[i];
      e.which = key; 
      e.ctrlKey=true;
      e.rbownone=true;
      $(el).trigger(e);
   }
}

function RGBtoRYB() {
   var cursor=document.body.style.cursor; document.body.style.setProperty("cursor", "wait", "important"); setTimeout(function(){
   document.body.style.cursor = 'wait';
   var reply=prompt("Enter the three RGB values, each separated by a space.  Hit OK and wait..."); if (!reply) return;
   document.body.style.cursor = 'wait';
   reply=reply.trim();
   if (reply[0]=='#') 
      reply=parseInt(reply[1]+reply[2],16)+" "+parseInt(reply[3]+reply[4],16)+" "+parseInt(reply[5]+reply[6],16)
   var rgb=reply.replace(/,/g," ").split(/\s+/);
   var hex=arrayAsHex(rgb);
   hex="#"+asString(hex).replace(/ /g,"");
   var complement_rgb=complement(rgb);   
//alert("hex is "+asString(hex)+", complement is "+uneval(complement_rgb));
   var fres=RGB2RYB(rgb); ///////////////////////////////////////////////////
   var pres=fres.slice(), res255=fres.slice(); //deep copies.
   var max=max3(pres[0],pres[1],pres[2]);
   var factor=100/(max?max:1), factor255=255/(max?max:1)
   $(pres).each(function(i){ pres[i]=Math.round(this*factor); });
   $(res255).each(function(i){ res255[i]=Math.round(this*255); });
   var res255_compl=complement(res255);
   document.body.style.cursor=cursor;
   alert("RGB " + reply +" (hex:" 
	 + hex + "), converted to RYB (red, yellow, blue) value: "
	 + asString(fres) +", out of 255 it is, "+asString(res255)
	 + ".\n(R:Y:B, proportional with max of RYB as 100 it is, " + asString(pres) +")"         //+(pres+"").replace(/[,\s]/g,":") +");"
	 +"\nRGB value you gave has a complement of: "+asString(complement_rgb)+" RGB, " + "#"+asString(arrayAsHex(complement_rgb))
	 +"\nRYB complement is: "+asString(res255_compl)+" RYB "
	);
   function asString(ar) { 
      if (ar.push) {
	 ar+=" ";
	 ar=ar.replace(/,/g," ");
	 ar=ar.replace(/(\.\d\d)\d*\b/g,"$1 ").trim(); // to two decimal places.
	 return ar
      } //is object not array:
      var roll="";
      for (var i in ar) roll+=ar[i]+" ";
      return roll;
   }
   function arrayAsHex(ar) { 
      if (ar.push) {
	 var ar1=ar.slice();
	 $(ar1).each(function(i,v){ar1[i]=Number(this).toString(16);})
	    return ar1;
      }
      var res=$.extend(true, {}, ar); 
      for (var i in ar) res[i]=Number(ar[i]).toString(16);
      return res;
   }
   },0);// delay to let cursor change.
}

function complement(color) {
   ccomplement={r:color[0],g:color[1],b:color[2]};
   complement_hsv=RGB2HSV(ccomplement);
   complement_hsv.hue=HueShift(complement_hsv.hue,180.0);
   return HSV2RGB(complement_hsv); //is obj with 3 members.
}

function RGB2RYB(RGB) { //param array
   var r,y,b,step=0.01;
   var RGBres, nearest=1000, res;
   for(r=0;r<=1;r+=step) {
      for(y=0;y<=1;y+=step) {
	 for(b=0;b<=1;b+=step) {
            RGBres=RYB2RGB(r,y,b);
	    //alert("res "+RGBres.length+" "+RGBres[1]);
	    var diff=arraysDiff (RGBres, RGB);
	    //log(diff +" ---nearest: "+nearest+", ryb: "+r+" "+y+" "+b+", RGBres: "+RGBres+", RGB: "+RGB);
            if (diff < nearest) {
	       nearest = diff;
	       res=[r,y,b];
	       res2=RGBres;
	    }
	 }
      }
   }//end while
   return res;
   function arraysDiff(a, b) {
      var res=0, abs=Math.abs;
      for (var i=0; i<a.length;i++) {
	 res+=abs(a[i]-b[i]);
      }
      return res;
   }
}

function cubicInt(t, A, B){
   var weight = t*t*(3-2*t);
   return A + weight*(B-A);
}
function getR (iR, iY, iB) {
   var x0, x1, x2, x3, y0, y1;
   //red
   var x0 = cubicInt(iB, 1.0, 0.163);
   var x1 = cubicInt(iB, 1.0, 0.0);
   var x2 = cubicInt(iB, 1.0, 0.5);
   var x3 = cubicInt(iB, 1.0, 0.2);
   var y0 = cubicInt(iY, x0, x1);
   var y1 = cubicInt(iY, x2, x3);
   return Math.ceil (255 * cubicInt(iR, y0, y1));
}


function getG (iR, iY, iB) {
   var x0, x1, x2, x3, y0, y1;
   //green
   x0 = cubicInt(iB, 1.0, 0.373);
   x1 = cubicInt(iB, 1.0, 0.66);
   x2 = cubicInt(iB, 0.0, 0.0);
   x3 = cubicInt(iB, 0.5, 0.094);
   y0 = cubicInt(iY, x0, x1);
   y1 = cubicInt(iY, x2, x3);
   return Math.ceil (255 * cubicInt(iR, y0, y1)); 
}


function getB (iR, iY, iB) {
   var x0, x1, x2, x3, y0, y1;
   //blue
   x0 = cubicInt(iB, 1.0, 0.6);
   x1 = cubicInt(iB, 0.0, 0.2);
   x2 = cubicInt(iB, 0.0, 0.5);
   x3 = cubicInt(iB, 0.0, 0.0);
   y0 = cubicInt(iY, x0, x1);
   y1 = cubicInt(iY, x2, x3);
   return Math.ceil (255 * cubicInt(iR, y0, y1));
}

function RYB2RGB(R, Y, B){
   if ( 
      isNaN( R ) || isNaN( Y ) || isNaN( B ) ||
	 (R < 0 || R > 1) ||
	 (Y < 0 || Y > 1) ||
	 (B < 0 || B > 1) 
   )
   {
      alert('Invalid RYB values:'+R+","+Y+","+B);
      return;
   }
   
   //----------------------------
   var R1 = getR(R,Y,B) ;
   var G1 = getG(R,Y,B) ;
   var B1 = getB(R,Y,B) ;
   //----------------------------
   //alert(R1+ " "+G1+ " "+B1);
   return [ R1, G1, B1 ]
 }

function HueShift(h,s) {
	h+=s;
	while (h>=360.0) h-=360.0;
	while (h<0.0) h+=360.0;
	return h;
}

function RGB2HSV(rgb) {
    hsv = new Object();
    max=max3(rgb.r,rgb.g,rgb.b);
    dif=max-min3(rgb.r,rgb.g,rgb.b);
    hsv.saturation=(max==0.0)?0:(100*dif/max);
    if (hsv.saturation==0) hsv.hue=0;
    else if (rgb.r==max) hsv.hue=60.0*(rgb.g-rgb.b)/dif;
    else if (rgb.g==max) hsv.hue=120.0+60.0*(rgb.b-rgb.r)/dif;
    else if (rgb.b==max) hsv.hue=240.0+60.0*(rgb.r-rgb.g)/dif;
    if (hsv.hue<0.0) hsv.hue+=360.0;
    hsv.value=Math.round(max*100/255);
    hsv.hue=Math.round(hsv.hue);
    hsv.saturation=Math.round(hsv.saturation);
    return hsv;
}
function max3(a,b,c) { return (a>b)?((a>c)?a:c):((b>c)?b:c); }
function min3(a,b,c) { return (a<b)?((a<c)?a:c):((b<c)?b:c); }
 
// RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
// which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
function HSV2RGB(hsv) {
    var rgb=new Object();
    if (hsv.saturation==0) {
        rgb.r=rgb.g=rgb.b=Math.round(hsv.value*2.55);
    } else {
        hsv.hue/=60;
        hsv.saturation/=100;
        hsv.value/=100;
        i=Math.floor(hsv.hue);
        f=hsv.hue-i;
        p=hsv.value*(1-hsv.saturation);
        q=hsv.value*(1-hsv.saturation*f);
        t=hsv.value*(1-hsv.saturation*(1-f));
        switch(i) {
        case 0: rgb.r=hsv.value; rgb.g=t; rgb.b=p; break;
        case 1: rgb.r=q; rgb.g=hsv.value; rgb.b=p; break;
        case 2: rgb.r=p; rgb.g=hsv.value; rgb.b=t; break;
        case 3: rgb.r=p; rgb.g=q; rgb.b=hsv.value; break;
        case 4: rgb.r=t; rgb.g=p; rgb.b=hsv.value; break;
        default: rgb.r=hsv.value; rgb.g=p; rgb.b=q;
        }
        rgb.r=Math.round(rgb.r*255);
        rgb.g=Math.round(rgb.g*255);
        rgb.b=Math.round(rgb.b*255);
    }
    return rgb;
}

function tabopen(intern){           //clicks open clicked link in a new tab.
   log("tabopen "  + intern+" "+autotabopen);
   var links=$("a"), toggled_on;
   if (!intern && autotabopen) { //toggle off 
      GM_setValue("tabopen",false); 
      log("tabopen toggling off, "+GM_getValue("tabopen")+" "+links.length);
      links.each(function(){
	 if ( ! /^_blank/i.test(this.taget)) {
	    this.target=this.dataset.target;
	 }
      });
      autotabopen=false;
   }
   else {
      GM_setValue("tabopen",true); toggled_on=true;
      links.each(function(){
	 if ( ! /^\s*next\s*$/i.test(this.textContent)) {
	    this.dataset.target=this.target;
	    this.target="_blank";
	    $(this).addClass("rbalgtnt");
	    // var p=$(this).parent().parent();
	    // p.bind("mousedown mouseup click",function(e){
	    //    log("GPARENT click "+e.target.id);
	    //    e.preventDefault();   
	    //    e.stopPropagation();
	    // });
	    // var clickEvents = this.getStorage().get('prototype_event_registry').get('click');
	    // clickEvents.each(function(wrapper){
	    //    alert(wrapper.handler) // alerts "function() { alert('clicked!') }"
	    // })
//	    $(this).click(function(e){
	    this.onmousedown=null;
	    $(this).bind("mousedown mouseup click",function(e){
	       log("u "+e.type+" on "+this.href+", on "+this["on"+e.type]);
	       this["on"+e.type]=null
	       this.onclick=null
	       //e.preventDefault();   
	       e.stopPropagation();
	    });
	 }
      });
      log("tabopen toggling on, "+GM_getValue("tabopen")+" "+links.length+" .rbalgtnt:"+$(".rbalgtnt").length);
   }//else
   mapFunctionToPage(itabopen, "purple", "Click here to toggle having links open in new tab ["+(toggled_on?"on":"off")+"].")
}

function itabopen(){tabopen(false)}

function globLogtext() {
  var newtxt=""+window.getSelection();
  var heading="";
  var glob_log=GM_getValue("glob_log","");
  newtxt=newtxt.replace(/\n{2,}/g,"\n");
  log("newtxt:"+newtxt+". type:"+typeof newtxt);
  heading = location+" "+(new Date())+"\n\n";
  if (glob_log) heading = "\n\n\n"+heading;
  if (newtxt) newtxt = heading + newtxt;
  log("glob_log:"+glob_log+", newtxt:"+newtxt+".");
  // pwin=prompt2("", glob_log + newtxt, 
  var pwin=prompt3("", glob_log+newtxt,
	       function(edited_text) {
		 log("reply callback txt:"+edited_text+", type: "+typeof edited_text);
		 if (edited_text != null) GM_setValue("glob_log", edited_text );
	       });
  var textarea=pwin.getElementById("fsfdinput");
  textarea.style.setProperty("height", "80%", "");
  setTimeout(function(){textarea.scrollTop=9999999;}, 400);
}

//////////////////////


if  (click_translate_on) {
  callier=true;
  click_translate(true); 
  callier=false;
 }

var HOW_LONG_DELAY_SECOND_CLICK=900; //msec

function click_translate(){ //cannot access parameters when called from GM menu
   //log( "click_translate "+callier +" @" +(location+"").toNthIndexOf("/",3)       );
  if (!callier)
    if (click_translate_on) { GM_setValue("click_translate", false); return; }
    else { log("setv "); GM_setValue("click_translate", true); }
  anchors=document.getElementsByTagName("a");
  for (var i=0; i<anchors.length; i++) {
    var elswithinas=anchors[i].getElementsByTagName("*");
    //log("for "+ anchors[i].tagName+" have "+elswithinas.length);
    for (var j=0; j<elswithinas.length; j++) { //new nodes left out
      elswithinas[j].withinAnchor=true;
      //      elswithinas[j].id="withinA";
    }
  }//end for
  var tagRegexp=/^A$/;   //    /(A|INPUT)/;
  function getClickTarget(e) { // return element for click, if it is a link or has a onclick action.  If it's within an <A> just return true.
    //log("getClickTarget "+e.target.withinAnchor+", "+e.target.tagName+", parent: "+e.target.parentNode.tagName+", "+e.target.onclick+", "+e.target.parentNode.onclick+" Test: "+tagRegexp);

    if (e.button!=0 || e.ragbag) return false;
    if (e.target.withinAnchor) return true;
    
    if ( tagRegexp.test(e.target.tagName) 
	 || e.target.onclick  ) {
      e.target.withinAnchor=true;
      return e.target;
    }
    if (e.target.parentNode && (tagRegexp.test(e.target.parentNode.tagName)
				||  e.target.parentNode.onclick)  ) {
      e.target.withinAnchor=true;
      return e.target.parentNode;
    }
  }
  document.addEventListener("click",function(e) {
      //log("Click, capt "+e.target.tagName+" "+e.target.id+" "+e.target.withinAnchor+", bub: "+e.bubbles+" "+e.canBubble+" "+e.cancelable);
      var target=getClickTarget(e), href;
      if (!target) return true;
      click_count++;
      log(target+"=target, Delay click "+click_count+". "+tstamp());
      //log(", destination:"+(e.target.href||"").toNthIndexOf("/",3)+" p dest: "+(e.target.parentNode.href||"").toNthIndexOf("/",3) );
      e.preventDefault();   
      e.stopPropagation();
      e.stopImmediatePropagation();
      setTimeout(function() {
	  click_count--;
	  log(click_count+" == -2, means dblclick meantime, 0 transmit. "+tstamp());
	  if (click_count==-2 || click_count==0)
	    if (target==true || !target.href) {
	      target=e.target;
	      while(!target.href && target.parentNode)
		target=target.parentNode;
	      if (!target.parentNode) target=e.target;
	      href=target.href;
	      log("Up to "+target.tagName+" "+target.id);
	      if (!href && e.target.form) href=e.target.form.action;
	    }
	  if (click_count==-2) {
	    //set in about:config browser.tabs.loadDivertedInBackground to true
	    if (!href) href=target.href;
	    log("open to "+href);
	    if (href) window.open(href, "_blank");
	  }
	  if (click_count==0) {
	    //regenerate click:
	    var pseudo_event_md = window.document.createEvent("MouseEvents");// create event
	    var pseudo_event_mu = window.document.createEvent("MouseEvents");// create event
	    var pseudo_event_click = window.document.createEvent("MouseEvents");// create event
	    //    type, canBubble, cancelable, view, detail, 
	    //    screenX, screenY, clientX, clientY, 
	    //    ctrlKey, altKey, shiftKey, metaKey, 
	    //    button, relatedTarget)
	    pseudo_event_md.initMouseEvent("mousedown", true, e.cancelable, e.view, e.detail, 
					   e.screenX, e.screenY, e.clientX, e.clientY, 
					   e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 
					   0, e.target.relatedTarget);
	    pseudo_event_mu.initMouseEvent("mouseup", true, e.cancelable, e.view, e.detail, 
					   e.screenX, e.screenY, e.clientX, e.clientY, 
					   e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 
					   0, e.target.relatedTarget);
	    
	    pseudo_event_click.initMouseEvent("click", true, e.cancelable, e.view, 318153143, 
					      e.screenX, e.screenY, e.clientX, e.clientY, 
					      e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 
					      0, e.target.relatedTarget);

	    pseudo_event_click.ragbag=true;
	    GM_log("Pseudo dispatch of click on, "+target.tagName+" "+target.id+", "+tstamp());
	    target.dispatchEvent(pseudo_event_md); // generate event
	    target.dispatchEvent(pseudo_event_mu); // generate event
	    target.dispatchEvent(pseudo_event_click);
	  };
	  if (click_count==-2) click_count=0;
	}, (click_count==1? HOW_LONG_DELAY_SECOND_CLICK:10) );
    }, true);
  //  document.addEventListener("click",function(e) {log("click, no capture "+e.target.tagName);}, false);
  document.addEventListener("dblclick",function(e) {
      log("1dblclick");
      var target=getClickTarget(e);//true if within an <a>
      if (!target) return true;
      click_count-=2;
      log("2dblclick "+tstamp());
      e.preventDefault();   
      e.stopPropagation();
      e.stopImmediatePropagation();
      //click_target=e.target;
    })
    //log("translate in effect.  "+tstamp());
}




function registerMenus(phaseMenus) {
  if (phaseMenus==2) { registerMenus2(); return; } 

  GM_registerMenuCommand("=============Ragbag============",function(){});
  if (!auto_log) GM_registerMenuCommand("Automatically log all input to this website ["+(auto_log?"on":"off")+"]", init_autolog);
  if (auto_log) registerMenus2();
 
  function registerMenus2() {
    if (phaseMenus==2)   GM_registerMenuCommand("=============Ragbag2============",function(){});
     GM_registerMenuCommand("Show/Edit log of input to this webpage ["+GM_getValue(webpage+":tilog","").length+"bytes]", editlog, "S");
     GM_registerMenuCommand("Log this webpage now, or after reload", logtextnow); 
     GM_registerMenuCommand("Delete input log for this webpage", dellog);
     GM_registerMenuCommand("Click on element text to log it along with input (toggle)", logelem);
     if (GM_getValue(webpage+":xpaths",[]).length)
	GM_registerMenuCommand("Edit xpaths of elements that are getting logged on this webpage", editXpaths);
  }//end menus2()
  GM_registerMenuCommand("Log/View global log of selected text(s), alt-l.", globLogtext ,"","","L");
  GM_registerMenuCommand("View/edit HTML, hover to view, click to edit it.", hoverhtml ,"","","U");
  GM_registerMenuCommand("Toggle double-click translation into middle click ["
			 +(click_translate_on?"on":"off")+"]", click_translate);
  GM_registerMenuCommand("eXecute Code, big js/html console, alt-x", doCode,"","","X");
   GM_registerMenuCommand("Search and replace in this webpage's HTML", searchAndReplace);
  GM_registerMenuCommand("View key & click mappings manipulate HTML...",function(){
      alert2(widener+"\
\n						\
\nControl shift click: cut item.\
\nAlt shift x:Blank the page, makes a clear page for  pasting into a blank canvas etc.\
\nControl right-click, paste the next element in cut stack after.  With shift, paste same element again after point.\
\n\
\nShift click: highlight/select item with double red border; then w for widen, n for narrow, p to crop to item.  Shift-click within highlighted area also widens.\
Clicks on red border: shift-right-click, full zoom; ctrl-right-click, paste; ctrl-shift-click, cut item; mid-click, columns; \
\nwith ctrl/alt, zoom in/out.  <Esc>: deselect.\
\n\nMeta click (Alt + control on windows): expand item, with shift, shrink.\
\nAlt click zoom-in.  --alt-click may already be used by window manager.\
\nAlt shift click zoom out.\
\n\
\nShift right-click, zoom fully in.\
\n\
\nAlt shift middle-click, convert link to text, in-situ, so that the text can then be selected & copied without visiting link, text will appear with a line through it for selection.\
\n\
\nDouble-click on blank area of webpage goes to next page, or press Enter.\
\n\
\nControl-<n> where n is a digit (with shift usually), moves the focus to the nth link on the page, or nth result of a search.  First hit of ctrl-zero numbers links. <Enter> goes to link selected, <tab> focuses on next/previous link\nHit the same number repeatedly (with control) to go to n+10th link, n+20th & n+30th links (cycle).\
\n\
\n\nAlt x: Open html-js console, esc quits console, as does 'exit', use command 'help' to see commands, grep with pipe. \
\n\nAlt l: Log seleced text to global log. \
")
	});

   GM_registerMenuCommand("Go to 2nd http address within Location bar http", function(){
      var ref=window.document.location.href,
      ref2=decodeURIComponent( ref.substr(ref.indexOf("http", 1 ) ) );
      GM_log("Href: "+ref+".\n\nGoing to href found within: "+ref2);
      try { window.document.location.href=ref2; } catch(e){GM_log("Goto err"+e)}
   },"","","G");

   GM_registerMenuCommand("Replace links with their plain text, alt-shift-middle click",replacelinks, "","","P" );
   GM_registerMenuCommand("List all text that matches an element class or tagname.", lister ,"","","L");
   GM_registerMenuCommand("Have all links go to new tab, toggle["+autotabopen+"].", itabopen);
   GM_registerMenuCommand("Hide elements permanently on this webpage ["+(hidElems?hidElems:"none")+"]", hideElements,"","", "H");
   GM_registerMenuCommand("Convert RGB to RYB - red yellow blue", RGBtoRYB, "", "", "R");
   GM_registerMenuCommand("Define shortcuts, ctrl-<key> run javascript", makeShortcut, "", "", "R");
   GM_registerMenuCommand("Add page element numbering", addNumbering, "", "", "R");
   GM_registerMenuCommand("__________________________________",function(){});

}//end function registerMenus.

function tstamp() {
  var d=new Date();
  return d.getSeconds() +":"+ d.getMilliseconds();
}
function lister(){
  prompt2("Give name of class or tag for getting a list of text that matches"
	  +"\n\nYou can help see class names etc. the hover and edit HTML command which appears "
	  +"above this command in the Greasemonkey user commands menu.","", function(reply) {
	    if (!reply) return;
	    var word, words=reply.split(/\s+/);
	    var roll="", matches;
	    for (var j=0; j < words.length; j++) {
	      word=words[j].replace(/^./,""); // css selector, in case.
	      matches=document.getElementsByClassName(word);
	      if (matches.length==0) matches=document.getElementsByTagName(word);
	      for(var i=0; i < matches.length; i++) 
		roll+=matches[i].textContent.replace(/[\n\r]/g," ").replace(/^\s*/,"").replace(/\s{2,}/g," ")+"\n";
	    }
	    GM_log("list:"+roll);
	    alert2(roll);
	  }); // end prompt2
	  
}


function hideElements() {
   //var hidElems=GM_getValue(webpage+":hidElems","");
   var hidElems=prompt("To hide elements, give class name, optionally, followed by tag name of parent element","");
   if (hidElems == null) return;
   GM_setValue(webpage+":hidElems",hidElems);
   inner_hideElements();
}

function inner_hideElements() {
   var hidElems=GM_getValue(webpage+":hidElems","");
   if (!hidElems) return;
   var ar=hidElems.split(" "), count=0, c2=0;
   for (var i=0; i<ar.length; i++)
      if (i%2==0) {
	 var classElems=$("."+ar[i]); c2=classElems.length;
	 var tag="";
	 if (ar.length>1) tag=ar[i+1];
	 classElems.each(function() { 
	    var elems_for_hiding=$(this);
	    if (tag) elems_for_hiding=$(this).parents(tag).first();
	    elems_for_hiding.css("display", "none");  
	    count++;
	 });
	 //alert(ar[i]+", classElems "+classElems.length )
	 i++;
      }
   var msg="GM script Ragbag is hiding "+count+" ("+c2+") elements on this webpage, hidden class: "+hidElems;
   window.status=msg;
   GM_log(msg);
}


//
//Logging function
//
function init_autolog() {
    GM_setValue(webpage+":autolog", true);
    auto_log=true;
    addEventListener("beforeunload", handleUnload);
    alert("Logging has been turned on for "+webpage+".  To turn off logging of text that is input to this site or parts of the page that can be selected for logging, choose menu option to delete the log for this site.\n\nAll text entered in text boxes or input areas, and in areas that can be selected by command, will be saved when either tab/window is closed or when you browse away from the page.  As usual you must reload page to see any updates to GM menu.");
    registerMenus(2);
}

if(auto_log) { 
   log("auto log on, waiting for beforeunload ");
   window.status="There is logging of text at this site, see GM menus to View/Edit";
   GM_log("There is logging of text at this site, see GM menus to View/Edit");
   if(!manual_log) addEventListener("beforeunload", handleUnload);
   if (GM_getValue("logflag")) { //for log at reload
      GM_setValue("logflag", false); 
      $(window).load(function() { logtext("reload"); });//after doc.ready, resources downloaded.
    }
   unsafeWindow.rblog=GM_getValue(webpage+":tilog", "");
   var links=document.getElementsByTagName("input"), a;
   for(var i=0; a=links[i], i < links.length; i++) //clean up preset text in inputs, ie, "search"
      if ( ! invisible(a) && a.value &&  a.type=="text") 
	 if (/[sS]earch/i.test(a.value)) // QUIRK, may remove text from inputs with just "search" in them!!
	    a.value="";
}

function logtextnow() {
  //    var reply=confirm("Press OK, to log text current on the webpage at present.\n\nClick Reload & Log, to log the webpage after reloading");
  confirm3("Press OK to log text current on the webpage at present.\n\nClick Reload&Log, to reload webpage before the logging goes ahead."
	     , function(reply){
		 if (reply) { logtext("command"); return }
		 GM_setValue("logflag", true);
		 removeEventListener("beforeunload", handleUnload);
		 uwin.document.location.reload(true); 
	     }, "Reload&Log", "OK","When to log?")
;
    //	     }, "Reload & Log");
}


unsafeWindow.logtext=logtext;

function editXpaths() {
   var xpaths=GM_getValue(webpage+":xpaths",[]);
   pwin=prompt2("", xpaths.join(" "), function(edited_text) { 
      if (edited_text==null) return;
      if (edited_text == "") xpaths=[];
      else xpaths=edited_text.split(" ");
      GM_setValue(webpage+":xpaths", xpaths ); //callback set textarea to edited_text
   }); 
   pwin.document.title="Xpaths for logging at "+webpage+"["+GM_getValue(webpage+":xpaths",[]).length+"]";
   var textarea=pwin.document.getElementById("p2reply");
   textarea.style.setProperty("height", "80%", "");
   setTimeout(function(){textarea.scrollTop=9999999;}, 400);
}

function logtext(when) {
   var msg="Logging text now at "+location+" "+Date()+" from "+when;
   User_log(msg);
   window.status=msg;
   var roll="";
   var links=document.getElementsByTagName("textarea"), a;
   for(var i=0; a=links[i], i < links.length; i++) {
      //log("textarea has:"+a.value+".");
      if (! invisible(a) && a.value)
	 roll+=a.value+"\n";
   }
   var links=document.getElementsByTagName("input"), a;
   for(var i=0; a=links[i], i < links.length; i++) {
      //log("input has:"+a.value+".");
      if ( ! invisible(a) && a.value &&  a.type=="text")
	 roll+=a.value+"\n";
   }
   log("Rollup of input ta's is: "+roll);
   // setTimeout(function() {  //beforeunload permissions changed, need this to allow it.
   log("setTimeout Rollup of inputs/ta's is: "+roll);
   var xpaths=GM_getValue(webpage+":xpaths",[]);
   log("getting elems for xpaths: "+xpaths.length+", value: "+xpaths.join());
   for (var i=0;i<xpaths.length; i++) {
      var elem=getXPathElem(xpaths[i]);
      log("got xpath elem:"+elem.tagName);
      if ((roll||xpaths.length>1) && elem) { 
	 roll+="["+(xpaths.length>1?ordinal(i+1)+":":"")+elem.tagName+(elem.id?" #"+elem.id:"")+(elem.className?" ."+elem.className:"")+", "+elem.textContent.replace(/\n/g," ")+"]\n";
      }
   }//end for
   roll=roll.replace(/\n$/,"");
   if (roll)  {
      var tilog=GM_getValue(webpage+":tilog","");
      var lastRoll=getLastRoll(tilog);
      if (lastRoll==roll) { GM_log("Log dup."); return roll; } //duplicate
      tilog+="\n"+getLogDate()+":\n";
      tilog+=roll;                   //ends with \n
      tilog+="\nEnd.\n\n";
      GM_setValue(webpage+":tilog",tilog );
      unsafeWindow.rblog=tilog;
      window.status="Ragbag logged:"+roll.replace(/\n/g,"");
      GM_log("Log added:"+webpage+": "+roll.replace(/\n/g,"\\n"));
      window.status="Logged text "+roll;
   } //endif roll
   else { GM_log("No text to log "+xpaths.length); setTimeout(function(){window.status="No text to log";}, 2000); }
   //    },0);
   return roll; //no elems.
   function getLastRoll(log) {
      var epos=log.lastIndexOf("\nEnd.\n\n");
      var spos=log.lastIndexOf("\nEnd.\n\n", epos-1);
      if (spos==-1) spos=0; else spos+=7;
      return log.substring(spos, epos).replace(/\n.*\n/,""); // 7, len of "\nEnd...", replace date line.
   }
}

function handleUnload() { //beforeunload
   //   log( (new Error).stack);// sec code searches stack for unsafe context.  Eg, if click calls page code and that causes unload as alternative to submit button.
   setTimeout(function() {
      var roll;
      roll= logtext("unload");
      if (!roll) 
	 window.status="No input text to log, will log element text if > 2 elements."; else window.status="Logged text: "+roll;
   }, 0);
   log("Page unloaded");
}

function editlog() {
    var tilog=GM_getValue(webpage+":tilog","");
    //log(" got tilog "+tilog);
    pwin=prompt2("", tilog, function(edited_text) { 
	if (edited_text != null) { 
	  GM_setValue(webpage+":tilog", edited_text ); //callback set textarea to edited_text
	  unsafeWindow.rblog=edited_text;
	}
      });
   pwin.document.title="Log of input to "+webpage+"("+GM_getValue(webpage+":xpaths",[]).length+")"+(manual_log?" manual logging only":"");
    var textarea=pwin.document.getElementById("p2reply");
    textarea.style.setProperty("height", "80%", "");
    setTimeout(function(){textarea.scrollTop=9999999;}, 400);
}

function dellog() {
    GM_deleteValue(webpage+":tilog");
    GM_deleteValue(webpage+":autolog");
    GM_deleteValue(webpage+":xpaths");
    auto_log=false;
    removeEventListener("beforeunload", handleUnload);
    //getXPathElem()
    alert("Turned off & deleted log for "+webpage);
}

function logelem() {
  GM_log("logging on element");
  var tilog=GM_getValue(webpage+":autolog","");
  if (!tilog) { 
    alert("Logging must first be enabled, see above GM command named: 'Automatically log all input to this website'"); 
    return;
  }
  if (Chrome)   onclick_flag=true; // if called from onclick event chrome special menu, this will occur twice:
  window.document.body.addEventListener("click", function(e) { 
      log("click event for logging");
      if (onclick_flag) { onclick_flag=false; return}
      this.removeEventListener("click", arguments.callee);
      e.preventDefault();   
      e.stopPropagation();
      e.stopImmediatePropagation();
      var elem=e.target;
      var xpath=getXPath(elem, true), was_del, reply;
      var xelem=getXPathElem(xpath);
      log("double check xpath elem is "+xelem.tagName);
      if (!xelem) return;
      GM_log("Logging on/off for xpath: "+xpath);
      var existing_xpaths=GM_getValue(webpage+":xpaths",[]);
      existing_xpaths.push(xpath);
      for (var i=0; i < existing_xpaths.length-1; i++)
	if (existing_xpaths[i]==xpath) { 
	  existing_xpaths.splice(i,1);
	  existing_xpaths.pop();
	  was_del=true;
	}
      if ( ! was_del)
	reply=confirm("Shall also log text content of element: "+elem.tagName+(elem.id?"#"+elem.id:"")+(elem.className?"."+elem.className:"")+" with logging of input to this site.  "
	      +"Current text in this element is: "+elem.textContent+"\n\nIts xpath is: "+xpath);
      else 
	reply=confirm("Will remove logging of text for content of element: "+elem.tagName+(elem.id?"-"+elem.id:"")+"\n\nIts xpath was: "+xpath);
      if (reply) GM_setValue(webpage+":xpaths",existing_xpaths);

    }, false);
}

var logdate=Date(); //date, time, page loaded.
function getLogDate() {
  var d=logdate.split(" "); //eg, Wed Oct 09 2013 11:57:07 GMT+0100 (IST)
  var day=d[0], month=d[1], date=ordinal(d[2]), year=d[3], time=d[4];
  return day+" "+date+" "+month+", "+year+", "+time;
}

function searchAndReplace() {
   var r=prompt("Please give search string followed by space and then replacement string.  No quotes needed, leave second string blank to just replace with nothing.");
   r=eval('"'+r+'"'); //to interpret \u hex strings
   var s_string=r.split(" "), r_string=s_string[1];
   if (!r_string) r_string="";
   s_string=s_string[0];
   var res=confirm(s_string.length+" char(s), to be replaced by "+r_string.length+" char(s)\n\nSearch="+s_string+"\nReplacement="+r_string);
   if (res) {
      var count=0,tnodes=getTextNodesIn($('body'));
      GM_log("text got "+tnodes.length+" len");
      tnodes.each(function(){
	 if (this.nodeValue.match(s_string)) count++;
	 this.nodeValue = this.nodeValue.replace(RegExp(s_string,"gi"), r_string);
      });
      alert("Found and replaced, "+count+", within "+tnodes.length+" bits of text");
   }//end if res
}

var getTextNodesIn = function(el) { // combines find() to give all descendents with contents() which only goes one down but gets textNodes.
   return $(el).find(":not(iframe)").addBack().contents().filter(function() {
      return this.nodeType == 3;
   });
};

function ordinal(n) {
  if (isNaN(n)) return n; 
  n=Number(n);
  var sfx = ["th","st","nd","rd"];
  var val = n%100;
  return n + (sfx[(val-20)%10] || sfx[val] || sfx[0]);
}

function getXPathElem(xpath_in) {
  log("xpath_in "+xpath_in);
  if (!xpath_in) return false;
  var snap=document.evaluate(xpath_in, document, null, 6, null);
  var len=snap.snapshotLength;
  log("snapshotLength "+len);
  var elem=snap.snapshotItem(0);
  if (snap.snapshotLength != 1) {
    return false;
  }
  return elem;
  var xpresult;
  if (snap.snapshotLength > 0) 
    xpresult=snap.snapshotItem(0);
  return xpresult;
}

function getXPath(elt, counting) {
    function getElementIdx(elt) {
      var count = 0; // zero being only tag of that type here.
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

// function getXPath(elt) {
//     function getElementIdx(elt) {
// 	var count = 1;
// 	for (var sib = elt.previousSibling; sib ; sib = sib.previousSibling)	{
//             if(sib.nodeType == 1 && sib.tagName == elt.tagName)	
// 		count++
// 	}
// 	return count;
//     }
//     var path = "";
//     for (; elt && elt.nodeType == 1; elt = elt.parentNode)    {
// 	xname = elt.tagName.toLowerCase();
// 	if (elt.id)
// 	  xname+="[@id='"+elt.id+"']"
// 	  else 	if (elt.className)
// 	    xname+="[@class='"+elt.className+"']"
// 	    else
// 	      xname += "[" + getElementIdx(elt) + "]";
// 	path = "/" + xname + path;
//     }
//     return path;	
// }


// function invisible(element) {
//   var cpted= getComputedStyle(element, null); 
//   return cpted.display=="none" || cpted.visibility == "hidden"; 
// }

//if (GM_getValue("p2open",false)) doCode()

var topwin=window;
var topwinhref=window.location.href;

if (GM_getValue("reloading",false)) { GM_setValue("reloading", false); GM_log("Restart js console:");doCode() }

function stopJS() { 
   var scrips=$("script"), rms=[0,0,0,0]; try{
      scrips.each(function(){
	 $(this).remove();rms[0]++;
      });
      log("Check iframes");
      $("iframe").each(function() { try{
	 var s=$(this).contents().find("script"); 
	 log("In iframe "+this.src+" has "+s.length+" script els");
	 if (s.length) try { 
	    s.addClass("rmstopJS"); 
	    s.remove();rms[1]++;}
	 catch(e){
	    GM_log("Iframe rm error "+e);
	    try{$(this).remove();log("rm'ed iframe");}catch(e){GM_log("cant rm iframe");}
	 }
	 cwin=this.contentWindow;
	 for (var i in cwin) {
	    try { 
	       if (/jQuery/.test(i)) continue;
	       if (eval("typeof cwin."+i+"==='function'")) {
		  if ( ! eval(   "/{\W*}/.test(cwin."+i+")"  ) )  { 
		     eval("cwin."+i+"=function(){}"); rms[2]++;
		  }
	       }
	    }catch(e){ GM_log(i+ " RB aError "+ e); }
	 }//end for 
      } catch(e){
	 GM_log("iframe Err "+e);
	 try{$(this).remove();log("rm'd iframe");}catch(e){GM_log("cant rm iframe");}
      }
      }); //end .each()
      log("Rm funcs");
      for (var i in unsafeWindow)  try { 
	 if (/jQuery/.test(i)) continue;
	 if (eval("typeof unsafeWindow['"+i+"']==='function'")) {
	    if ( ! eval(   "/{\W*}/.test(unsafeWindow."+i+")"  ) )  { 
	       eval("unsafeWindow."+i+"=function(){};"); rms[3]++;
	    }
	 }
      } catch(e){ GM_log("StopJS for error "+e+" with "+i);} //end for
   }  catch(e){GM_log("StopJS func error "+e+" "+e.lineNumber);}
   alert("Number of removed, script elements, iframe script elems, iframe functions, functions: "+rms+", respectively.")
}//end stopJS()

function doCode() { // alt-x, js console
   mapFunctionToPage(doCode, "blue", "Click here to open JS console.");
   var i=0, code_list=GM_getValue("hellocode", [""]), res="", page="";
   //log2("Got code_list as "+typeof code_list+"\n\n"+code_list);
   var cmdres_separator="\t\t\t\n", dim=screen.height/2;
   var cmdres_sep_reg=/\$\s*(.*)\t\t\t/, lastprompt="", bottom=99999999;
   ta=null;step=0;
   doCode.code_list=code_list; doCode.cmdres_sep_reg=cmdres_sep_reg;
   cdls=new cdlsObj();
   topwin.cdls=cdls;
   if (code_list==undefined) code_list=[""];
   var pwin={empty: true}, elem=uwin.highlighted_element;//set in ragbag with shift click.
   recurse();
   GM_setValue("p2open", true);
   log =function(s) { GM_log(s); console.log(s);};// console needs both in FFv22
   
   function recurse() {
      if (dont_reopen) { dont_reopen=false; return;}
      step=0;
      window.target=uwin.highlighted_element || window.highlighted_element || window.current_target;
      this.target=window.target;
      page=code_list.join(" ");    //replace(/\n\W*\n/g, "");
      gcode="";
      //log("Call prompt from recurse with code:"+gcode+", at cwd:"+cdls.pwd(9)+", cdls created on:"+cdls.tstamp);//+" page "+page);
      if (!pwin.prompt2) pwin.prompt2=window.prompt2; // save prompt2 function in case parent window closes.
      pwin=prompt2(page +(pwin.empty && elem ? "\n(var 'target' with tag: "+target.tagName+", is active) \n"
			  :(!ta?"\nType help to see available commands.":""))
		   , gcode 
		   , handle_input, false, 0.5, 0.75 );
      pwin.consoleWindowPrompt=true;
      var body=pwin.document.body, doc=pwin.document;
      body.style.minHeight=dim+"px"
      ta=doc.getElementById("p2reply");
      pwin.topwin=topwin;pwin.topwinhref=topwin.location.href;
      var ppre=pwin.document.createElement("pre");
      ppre.style.cssText="float:left;margin:0;";
      var obj=doc.getElementById("p2reply");
	ppre.textContent=lastprompt=cdls.prompt;
	ta.parentNode.insertBefore(ppre, ta);
	ta.parentNode.style.width=screen.width+"px";
	with (ta.style) { height=ppre.offsetHeight;maxHeight=ppre.offsetHeight; 
	  border="none"; 
	  width=(ta.parentNode.offsetWidth-ppre.offsetWidth-10)+"px";
	} 
	moveCaretToEnd(ta);
	body.scrollTop=99999999; //scrolls to end
	var form_inputs=body.getElementsByClassName("p2ips");
	var okbtn=form_inputs[1].onclick;
	//log("Register listeners");
	addEventListener("unload", function(e) {if (!GM_getValue("reloading",false)) pwin.close();}) // close parent window closes child
	if (pwin.dontclose==undefined)
	    pwin.document.addEventListener("keydown", function(e) {
		//log(" keycode "+e.keyCode);
	       if ( ! e.keyCode in {27:0, 13:0, 38:0, 40:0, 9:0, 33:0, 34:0}) return true;
	       var ta=doc.getElementById("p2reply");
	       var p2pre=doc.getElementById("p2pre")
	       switch(e.keyCode) {
	       default: return true;
	       case 27: //esc
		  //log("call close");
		  pwin.close();
		  break;
	       case 13: //enter
		  ta.value=ta.value.trim();  // replace(/^\s*|\s*$/g,"");
		  handle_input(ta.value);
		  break;
		  //		cases: 33 page up, 34, page down
	       case 33:
		  pwin.scrollBy(0,-pwin.innerHeight/7);
		  break;
	       case 34:
		  pwin.scrollBy(0,pwin.innerHeight/7);
		  break;
	       case 38: //up
		  step++
		  var len=code_list.length
		  if (step>len) step=len;
		  var cmd=cmdres_sep_reg.exec(code_list[len-step])
		  ta.value=cmd?cmd[1]:"";
		  break;
	       case 40: //down
		  step--
		  if (step < 1)step=1;
		  var len=code_list.length
		  var cmd=cmdres_sep_reg.exec(code_list[len-step])
		  ta.value=cmd?cmd[1]:"";
		  break;
	       case 9: //tab
		  var complete=topwin.cdls.tabber(ta.value);
		  p2pre.textContent+="\n"
		  if (complete.choices) {p2pre.textContent+=complete.choices;
					 code_list[code_list.length-1]+="\n"+complete.choices;
					}
		  if (complete.fin) ta.value=complete.fin;
		  body.scrollTop=bottom;
		  break;
	       } //end switch
	       e.preventDefault();
	       return false;
	    }, 0); //end keydown handler
      pwin.dontclose=true;
   } //end recurse()
   
   function handle_input(code) {
	if (code==null) return;
	gcode=code;
       //log("handle_input:"+gcode+".  "+"  cdls obj:"+cdls+", t "+cdls.tstamp);
    	if (code=="clear") { code_list=[""]; GM_setValue("hellocode", code_list); body.scrollTop=-1; gcode=res=page=""; clog("clear code list "+gcode+" len "+code_list.length);}
	else {
	    if (cdls) code=cdls.processInput(code);
	    //log2("Eval: "+code);
	   try { res="";res+=eval.call(window,code); } 
	    catch(e) {
    	       GM_log(res+ ".  Error eXecuting code, "+code);
	       GM_log(", line: "+e.lineNumber+" "+e);
    	       try { res=eval.call(uwin, code); GM_log("Ran well however, in unsafewin, result: "+res); } 
	       catch(e) { GM_log("Tried but again error, "+e+", line:"+e.lineNumber); res=e+""; }
    	    }
	    res+="";
	    //log("Result, from main eval:"+res+", push on "+gcode);
	    if (cdls) res=cdls.processOutput(res);
	    res=cmdres_separator+res;
	    if (!code ) res="";
	    code_list.push("\n"+lastprompt+gcode+res);
    	    if(code_list.length > 50) code_list.shift();
	   //log2("hellocode set "+typeof code_list+" "+uneval(code_list));
    	    GM_setValue("hellocode", code_list);
	}
	recurse(); ///////////
    } //end handle_input()
    
    
} //end doCode()

//array sumer, [2,3,4].reduce(function(p, c){ return p+c})	--> 9

function unroll(o, recur) { //recursively get members & their values of object.
   var msg=(recur?"":"\n");
   for (var i in o)  
      if (! o.hasOwnProperty || o.hasOwnProperty(i)) {
	 if (typeof o[i]=="object") {
	    if (!recur) recur={};
	    var found;
	    if (recur[i]) 
	       $(recur[i]).each(function(){if (o[i]==this) {found=true;return false;}});
	    else recur[i]=[]
	    if (found) msg=" {object backref "+i+" "+o[i]+"}, ";
	    else { 
	       recur[i].push(o[i]);
	       msg+=i+":"+unroll(o[i], recur);
	    }
	 } //endif typeof
	 else msg+=i+":"+o[i]+", ";
	 if (!recur) msg+="\n";
      }
   return msg;
}

function cdlsObj() {
    var top = window.document;
    var cwd = top;
    var path="/";
    this.prompt=path+"$ "
    var childAlist=uniquify(cwd); // not arrary, object, with unique tags as props, & value of prop the element.
    var that=this;
    var available_cmds="ls cd pwd strings mems cat set rm find grep exit reload echo test history help";
    var pipe, pipeForProcessing="";
    this.tstamp=Date();
    this.echo=function(input) {
	return ""+input;
    }
    this.ls =function(tagOrid, opts, internal) {
	if(!tagOrid) tagOrid=".";
	if(!opts) opts="";
	var roll=""; //loop on each ls requested
	var nparams=tagOrid.split(" ");
	if (nparams.length>1) nparams.forEach(function(v,i,a) {
	    if (v) { 
	      //log("ls foreach "+v+" "+this);
	      roll+=that.ls(v,opts,internal);
	      roll+="\n";
	    }
	  })
	if (roll) return roll;
	var objs_alist=childAlist;
	switch(tagOrid) {
	case ".": break;
	case "..": return this.ls("../", opts, internal);
	case "/": objs_alist=uniquify(top);
	          break;
	default:
	    var words=tagOrid.split("/");
	    if (words.length > 1) { // at least one slash
		var target=words.pop();
		var dir=words.join("/");
		if (!dir) dir="/";
		var saved_path=path;
		this.cd(dir);
		objs_alist=this.ls(target, opts, true);
		this.cd(saved_path);
	    }
	    else {
		var child=childAlist[tagOrid];
		if (!child) return "ls: cannot access "+tagOrid+": No such element or member";
		if (/d/.test(opts)) eval("objs_alist={ "+tagOrid+" : child }");
		else objs_alist=uniquify(child, true);
	    }
	}//end switch
	if (/R/.test(opts) && !internal) {
	    var saved_path=path;
	    var len=objLength(objs_alist)
	    if (len==0) return "";
	    var page=path+":\n"+this.ls(".", opts.replace("R",""))+"\n\n";
	    for (var tag in objs_alist) {
		if ( ! objs_alist.hasOwnProperty(tag)) continue; 
		//log("for tag, "+tag+" do cd then ls . ");
		this.cd(tag);
		objs_alist[tag].path=path;//tag obj with its path for find.
		page+=this.ls("", opts);
		this.cd("..");
	    }
	    return page;
	}
	if (/l/.test(opts)) {
	  string_objs=foreach(objs_alist, function(o,i) { return i + ":\t" + getAttributes(o); });
	  if (!internal) return ( /d/.test(opts) ?  "": "total "+string_objs.length+"\n")
			   +string_objs.join("\n");
	}
	//log("ls is returning "+objs_alist.join(" ")+", as objs_alist? "+internal);
	if (internal) return objs_alist;
//	return objs_alist.joinObj(" ");//was proto
       return this.mems(objs_alist);
    }
    
    this.cd=function(tagOrid) {
	//log("domcd, tag: "+tagOrid+" Current wd tag:"+cwd.tagName);
	var okORerror="";
	if (tagOrid=="/") { 
	    path="/";
	    cwd=top;
	}
	else {
	    var words=tagOrid.split("/");
	    if (words.length > 1) { // ie, At least one / in it
		if (tagOrid.substr(0,1)=="/")
		    this.cd("/");
		for(var i=0;i < words.length;i++)
		    if (words[i]) this.cd(words[i]);
		return "";
	    }
	    if (tagOrid==".." && path!="/") {
		path=path.replace(/\/[^/]*$/,"");
	        cwd=cwd.parentNode;
	    }
	    else {
		var dir=childAlist[tagOrid];
		if (dir) {
		    //log("cd found dir:"+dir+"among: "+this.mems(childAlist));
		    if (path=="/") path+=tagOrid
		    else path+="/"+tagOrid;
		    cwd=dir;
		} else okORerror="No such "+tagOrid
	    }
          }//end else
        childAlist=uniquify(cwd);
        if (!path)path="/";
        this.prompt=path+"$ ";
        //log("After domcd, path:"+path+", current wd tag: "+cwd.tagName);
        return okORerror
    }

    function getSetTarget(tag, rvalue, objonly) {
	log("getSetTarget, objname:"+tag);
	var saved_dir, error;
	if (!tag) tag="";
	var subdir=all_but_last_word(tag,"/");
	if (subdir) {
	    saved_dir=path;
	    log("call that.cd");
	    that.cd(subdir);
	    tag=last_word(tag,"/");
	}
	var target=cwd;
	objmem=tag.split(".");
	if (objmem[0]) {
	    target=childAlist[objmem[0]] || eval(objmem[0]);
	    if (! typeof target=="object") 
		error=(objonly ? null : tag+" not at "+path+" in "+cwd);
	}
	if (!error) {
	    objmem.shift();
	    var mem=objmem.join(".");
	    var eval_cmd="target"+(mem?"."+mem:"")+(rvalue ? "="+rvalue : "")
	    log("getSetTarget, eval: "+eval_cmd+", with rvalue:"+rvalue+", with target obj:"+target);
	    try{ 
	      var eval_res=eval(eval_cmd);
	      if(eval_res==undefined) throw("undefined result");
	      target=eval_res;
	    } catch(e) { 
	      if (target.wrappedJSObject) try { //try again with another possibility
		  log("have wrapped obj "+target.wrappedJSObject+"  try again: "+eval_cmd);
		  target=target.wrappedJSObject;
		  target=eval(eval_cmd);
		} catch(e){error=e;}
	      else error=e;
	    }
	    log("getSetTarget eval returned: "+target+", type: "+typeof target+", for tag:"+tag+", error:"+error);
	}
	if (saved_dir) that.cd(saved_dir);
	if (objonly) return (typeof target=="object" ? target : null)
	if (error) return error;
	return target;
    }

    this.cat=function(tagOrid) {
       var target=getSetTarget(tagOrid);
       if (typeof target=="object") return unroll(target);//this.mems(target);
       else return target;
    } //end cat
    this.set=function(objEq) {
	objEq=objEq.split("=");
	var lval=objEq[0], rval=objEq[1];
	if (rval) try{ rval=eval(rval); } catch(e){} //rids of quotes within string
	return getSetTarget(lval,rval);
    }
    this.pwd=function(obj) {
        if (obj) return cwd;
	return path+"\t["+(cwd.tagName||"document")+"-"+(cwd.id||"")+"]";
    }
    this.strings=function(obj) {
	var targ=getSetTarget(obj);
    	return JSON.stringify(targ)
    }
    this.mems=function(obj, all) {
	if (!obj) obj=cwd;
	if (typeof obj=="string") {
	    try { obj=eval(obj);} catch(e){ obj=getSetTarget(obj);}
	    if (typeof obj!="object") return obj; 
	}
       //log("mems obj "+obj);
	// var roll="";
	// for(var i in obj) if (all || (!obj.hasOwnProperty || obj.hasOwnProperty(i))) roll+=i+" "
	// return roll.trimRight();
       var assoc={}, roll="";
       for(var i in obj) if (all || (!obj.hasOwnProperty || obj.hasOwnProperty(i))) assoc[i]=true;
       var proplist=Object.getOwnPropertyNames(obj);
       for(var i=0;i<proplist.length;i++) assoc[proplist[i]]=true;
       for(var i in assoc) roll+=i+" ";
       return roll.trimRight();

    }
    this.test=function() { 
      return this.mems(cwd.wrappedJSObject, true);
    }
    this.rm=function(objname) {
	var target=getSetTarget(objname);
	//log("cdls.rm target: "+target+" "+typeof target+", tag:"+target.tagName+", parent: "+target.parentNode);
	if (typeof target=="object" && target.parentNode) {
	    log("remove from parent");
	    target.parentNode.removeChild(target);
	    childAlist=uniquify(cwd);
	} else getSetTarget(objname, "undefined");
	return getSetTarget(objname, false, true);
    }
    this.find=function(tagOrid) {
	var res="", found_objs=cwd.getElementsByTagName(tagOrid);
	if (found_objs.length==0) { 
	  found_objs=window.document.getElementById(tagOrid);
	  if (found_objs) found_objs=[ found_objs ];
	  else 	  found_objs=cwd.getElementsByClassName(tagOrid);
	}
	this.ls("","-R"); //for side-effect
	for (var i=0; i< found_objs.length; i++) 
	    res+=found_objs[i].path+"\n"
	return res.trimRight();
    }
    this.grep=function(params) {
	var word=first_word(params);
	var obj=all_but_first_word(params);
	log("this.grep:"+word+",len:"+pipeForProcessing.length+", obj "+obj)
	
	var res="";
	if (pipeForProcessing) {
	    res=find_with_context(word, pipeForProcessing, 1);
	    log("res "+res);
	}
	else {
	    res=getSetTarget(obj);
	    log("grep, res type:"+typeof res);
	    if (typeof res=="object") res=this.mems(res);
	    res=find_with_context(word, res, 1);
	}
	return res;
    }
    this.exit=function() {
	log("exit "+prompt_win);
	prompt_win.close();
	dont_reopen=true;
    }
    this.reload=function() {
	log("reload");
	GM_setValue("reloading", true);
	topwin.location.reload()
	//window.location.href=window.location.href
    }
    this.history=function() {
       var res="", code_list=doCode.code_list, cmdres_sep_reg=doCode.cmdres_sep_reg;
       for (var i=0; i < code_list.length;i++)
	  res+=cmdres_sep_reg.exec(code_list[i])[1]+"\n";
       return res;
    }
    this.help=function() {
      return "\nExtra linuxish commands available in JS console:\n\n\tlog "+available_cmds
      +"\n\nSome commands may have switches eg, ls accepts, -l and -R.  Some need objects as parameters.  "
      +"Use tab to complete names or members of objects.  "
      +"Backticks and pipes, eg, ls -R | grep div;\n\n"
    }
    this.tabber=function(incomplete) {
	log("tabber, complete:"+incomplete);
	var iword=last_word(incomplete);
	var matched_text="", part_text="",preable_text=all_but_last_word(incomplete);
	if(preable_text) preable_text+=" ";
	var saved_path, idir=last_word(iword, "/");
	var choices, subdir=all_before_last_sep(iword, "/");
	log("tabber, iword:"+iword+", "+incomplete+",idir: "+idir+",subdir: "+subdir);
	if (subdir) { //dir just above last name
	    saved_path=path;
	    idir=all_after_last_sep(iword, "/");
	    this.cd(subdir);
	    preable_text+=subdir+"/";
	}
	choices=this.mems(childAlist, true);
	if (idir) { //incomplete after last fullname
	    var matches=[];
	    if (idir.contains("."))  { //is member?
		choices="";
		var prefix=all_before_last_sep(idir,".");
		preable_text+=prefix+".";
		var target=getSetTarget(prefix, null, true); //.replace(/\.\w*$/,""));
		idir=all_after_last_sep(idir,".");
		if (target)  choices=this.mems(target, true);
		log("target:"+target+", prefix:"+prefix+", idir:"+idir);
	    }
	    //log("choices "+choices);
	    if (idir) {
		matches=choices.split(/\s+/).filter(function(val) { return val.startsWith(idir); })
		log("tabber "+matches+"\nmatches #:"+matches.length+", with partial: "+idir);
		if (matches.length) 
		    if (matches.length==1) matched_text=matches[0]; //exact match
     	        else { //partial match...
		    choices=matches.join(" ");
		    for (var s=matches[0],i=0; i < s.length; i++)
			if ( ! matches.every(function(val) { return val[i]==s[i];}) ) break;
		    part_text=s.substr(0,i);
		}
		else choices="";
	    }//end if idir (nested)
	}//end if idir
	else if (objLength(childAlist)==1)
	    matched_text=choices;
        if (saved_path) this.cd(saved_path);
       //log("Choices:"+choices+", preable_text:" + preable_text +", matched:"+matched_text+", saved:"+saved_path+". Partial text:"+part_text);
	if (matched_text)   return { fin: preable_text+matched_text }
	if (choices) return { choices: choices, fin: preable_text+part_text }
	return false;
    }
this.processInput=function(input) { //process pseudo shell commands
   // input=input.replace(/\$\$/, "document.getElementsByClassName"); 	// shortcut
   // input=input.replace(/\$/, "document.getElementById"); 	// shortcut
   //log("processInput "+input);
   var params=input.trim().split(" ");
   params=this.implicitCmds(params);     //input is converted from eg, "mems window true" --> eval(cdls.memes("window true")), to have extra param use -option, eg, mems -true window.
   var cmd=params[0];
   if (!cmd ) return "";
   if ( /\W/.test(cmd)) return input;
   params.shift();
   if (available_cmds.match("\\b"+cmd+"\\b")) {
	 var opts=params[0];
	 if (opts && opts.substr(0,1)=="-") 
	       params.shift();
	 else opts=null;
	 params=params.join(" ");   //('""');
	 if ( ! params.match('"')) params='"'+params+'"' //handle quotes
	 else if (! params.match("'")) params="'"+params+"'";
	 cmd="cdls."+cmd+"("+params + (opts? ',"'+opts.substr(1)+'"'  : "" )   + ")";
	 cmd=cmd.replace(/("[^"]+)\n/,'$1 ')
         //log2("domcmd: "+cmd);
         return cmd;
	}
	return input;
    }
    this.processOutput=function(res) {
      //log("processOutput,  "+res);
      if (pipe) {  // first cmd is done, now pass to cmd after pipe. if any.
	var cmd=pipe;
	pipe="";
	var cmd2=this.processInput(cmd);
	pipeForProcessing=res;
	res=eval(cmd2);
	log("pipe done, res:"+res);
	pipeForProcessing="";
      } 
      if (pipe) return this.processOutput(res);
      //log("processOutput fin, res: "+res);
      return res;
    }
    this.implicitCmds=function(params) { //array of params.
	var cmdline=params.join(" ");
	// strip all that's right of first | into pipe, if any.
	pipe=all_but_first_word(cmdline,"|");   
	if (pipe)
	    params=first_word(cmdline,"|").split(" ");
	(pipe?log(pipe):null);
	
	var backticks=cmdline.split("`");
	if (backticks.length > 1) { // at least one `
	  backticks.shift();
	  backticks.pop();
	  backticks.forEach(function(v,i,a) {
	      var cmd2=that.processInput(v);
	      log("btick cmd2: "+cmd2+".  this is :"+this);
	      var res=eval(cmd2);
	      cmdline=cmdline.replace(/`[^`]*`/,res);
	      log(res+":res, btick new cmdline "+cmdline);
	    });
	  params=cmdline.split(" ");
	}// end if > 1
	
	// var word=first_word(params[0], /[. ]/); //!!!first check if '=' there.
	// if (childAlist[word] || params[0][0]=="."  ) {
	//     log("implicitCmds . or "+word);
	//     params.unshift("set")
	// }
	return params;
    }
    function uniquify(dir) {
	//log("uniquifying "+dir);
	var tag,assoc_list={},count=[];
	if (!dir) return list;
	var children=dir.children||dir.childNodes
	for (var i=0; i < children.length; i++) {
	    tag=(children[i].tagName||"").toLowerCase();
	    if (count[tag]) count[tag]++; else count[tag]=1;
	    if (count[tag] > 1) 
		tag+=count[tag];
	    assoc_list[tag]=children[i];
	}
	return assoc_list;
    }
function all_but_last_word(str,sep){ // all_but_last_word, all_before_last_sep, first_word etc. ought be String.prototype
	str=str.split(sep||" ");
	if ( ! str.pop()) str.pop();
	return str.join(sep||" ");
    }
    function all_before_last_sep (str,sep) {
	return str.substring(0,str.lastIndexOf(sep||" "))
    }
    function all_after_last_sep (str,sep) {
	var index=str.lastIndexOf(sep||" ");
	if (index==-1) return "";
	return str.substring(index+1)
    }

    function all_but_first_word(str,sep){
	str=str.split(sep||" ");
	if ( ! str.shift()) str.shift();
	return str.join(sep||" ");
    }

    function first_word(str,sep){
	    return str.split(sep||" ")[0]
    }
    function last_word(str,sep){
	var ar=str.split(sep||" ");
	var lw=ar.pop();
	if ( ! lw) lw=ar.pop();
	return lw;
    }
function find_with_context(word, str, nctx) { // find word in str, include nctx either side, eg, grep -A word str
	var words,i,res="", nctx=nctx||5, last_i=-1-nctx;
	words=str.split(" ");
	var matches=words.map(function(v, i) { if(v.contains(word)) return i;}).reverse();
	while (matches.length) {
	    i=matches.pop();
	    if (i > last_i+nctx ) { //an undefined i fails.
		var context=words.slice(Math.max(i-nctx,0),i+nctx+1).join(" ")
		context=context.replace("\n","","g");
		res+="-> "+context+"\n"
		last_i=i;
	    }
	}
	return res;
    }
    this.cd("html/body"); // inititial pos.

}//end cdls

function getAttributes(elem) {
    var res=""
    if (!elem.attributes) return res;
    for (var i=0;i < elem.attributes.length; i++)
    {
	var attr=elem.attributes[i];
	res+=attr.nodeName+"='"+summarize(attr.nodeValue, 50)+"' "
    }
    return " "+res;
}

function summarize(longstr, max)  {
    if (longstr.length<=max) return longstr;
    max=(max-3)/2;
    var begin=longstr.substr(0,max);
    var end=longstr.substr(longstr.length-max,max);
    return begin+"..."+end;
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

function foreach(obj, tobedone) {
      var ar=[];
      for (var prop in obj) 
	if ( typeof obj.hasOwnProperty == "function" && ! obj.hasOwnProperty(prop)) continue; 
        else ar.push(tobedone(obj[prop],prop));
      return ar; 
 }

// Object.defineProperty(Object.prototype, "length", { 
//   value: function() {var i=0; for(var prop in this) if(this.hasOwnProperty(prop)) i++; return i;}});
function objLength(obj) {var i=0; for(var prop in obj) if(obj.hasOwnProperty(prop)) i++; return i;}

// function get(A, D) {    return eval(GM_getValue(A, D!=undefined ? D : {} ) ); }
// function set(A, B) {     GM_setValue(A, uneval(B)); }
function hoverhtml(){
   var reply=confirm("You will now be able to view and edit HTML on this page.  "
		     +"To see html hover mouse over HTML element.  To edit the HTML click on the element.\n\nTo in addition mark "
		     +"each element with a red border hit Cancel");
   if (!reply) document.head.innerHTML+="<style type='text/css'> "
      +"  *   { border:solid red;   }   </style>"
   //alert("body "+$("body").length+" "+(window.parent==window));
   var elem, elems=$("body *");
   spread_load(elems);
   var iframes=$("iframe");
   $("iframe").each(function(){ try { $(this).contents(); } catch(e) {
      iframes=iframes.not(this);log("border up iframe ");putBorderOnElem(this);} }) //checks if iframe is accessible (on same domain)
   var iframe_elems=iframes.contents().find("*");  //all elements in all iframes
   spread_load(iframe_elems);
   function spread_load(elems_list) {
      setTimeout(function() { doElems(0,elems_list.length/2); }, 200);
      setTimeout(function() { doElems(Math.round(elems_list.length/2), elems_list.length); }, 1200);
      function doElems(first,last) {
	 log("Doing "+first+" to "+last);
	 for (var i=first; i < last; i++) {
	    setTitle(elems_list[i]);
	 }
      } //end doElems()
   }
   elems.add(iframe_elems);
   setTitle(body);
   var iframe_docs=iframes.contents();// all documents elements in all iframes that are accessible.
   iframe_docs.each(function(){this.addEventListener("mousedown", editClick, 0);})
   document.addEventListener("mousedown", editClick, 0); // for mid & right button
   function editClick(e){ 
      log("hoverhtml click");
      for (var i=0; i < elems.length; i++)
	 elems[i].title=elems[i].old_title||"";
      this.removeEventListener("mousedown", arguments.callee, 0);
      if (e.button == 1 || e.button == 2) return true;
      e.preventDefault();   
      e.stopPropagation();
      e.stopImmediatePropagation();
      var el=e.target;
      // GM_log("Outward:" + el.outerHTML);
      // GM_log("Inward:" + el.innerHTML);
      GM_log($(el).text());
      el.removeAttribute("title");
      elems=el.getElementsByTagName("*");
      for (var i=0; i < elems.length; i++) 
	 elems[i].removeAttribute("title");
      var inner=true, html, attribs=getAttributes(el);
      if (!html) { html=el.outerHTML;inner=false}
      var pwin=prompt2("HTML within element clicked, <"
		       + el.tagName 
		       // + (e.target.id ? " id:"+el.id : " no id" )
		       // + (e.target.className ? ", class:"+e.target.className : ", no class" ) 
		       + attribs
		       + ">, editable:\n ", html, 
		       function(newtext) {
			  if (newtext) {
			     if (inner)
				e.target.innerHTML=newtext;
			     else
				e.target.outerHTML=newtext;
			  }
			  // setTitle(e.target);
			  // elems=e.target.getElementsByTagName("*");
			  // for (var i=0; i < elems.length; i++) 
			  //    setTitle(elems[i]);
		       }); 
      var ta=pwin.document.getElementById("p2reply");
      ta.style.height="80%";
   }
}

function setTitle(elem) {
  var tree = linearTree(elem);
  var title=elem.innerHTML||elem.outerHTML;
  //log("setTitle: "+elem.tagName+", id:"+elem.id+" is: "+tree+", len "+tree.length)
  if (tree.length > 200) tree=summarize(tree, 200);
  var maxtitle=1200, val="";
  if (title.length > maxtitle) {
    title=title.replace(/[\n\t\r\v\f\s]+/g," ");
    title=summarize(title, maxtitle);
  }
  if (elem.tagName=="INPUT")
    val=elem.value;

  elem.old_title=elem.title;
  elem.title="HTML for tag: " + elem.tagName + (elem.id ? ", id:"+elem.id : "") + (elem.className ? ", class:"+elem.className : "") 
    + (val ? ", value:" +val : "" ) + " :\n"+title;
  if (tree) 
    elem.title+="\n\nChild node tag(s): "+tree;
  //log("did "+elem.title);
  function linearTree(topelem) {
    if (!topelem) return "";
    var subaltern=topelem.firstElementChild;
    var child_list="", subtree="", atleastone=false;
    while (subaltern) {
      subtree=linearTree(subaltern);
      child_list+=(atleastone ? ", " : "") + subaltern.tagName + (subtree ? " ["+subtree+"]" : "");
      subaltern=subaltern.nextElementSibling;
      atleastone=true;
    }
    return child_list;
  }//end linearTree()
  function summarize(longstr, max)  {
    max=max/2;
    var begin=longstr.substr(0,max);
    var end=longstr.substr(longstr.length-max,max);
    return begin+".............."+end;
  }// end summarize()
}



try{ var host=location.host}catch(e){}
if (window==window.parent) {
    if ( /altfarm.mediaplex.com$/.test(host) ) {
	var ref=window.document.location.href;
	ref=ref.substr(ref.indexOf("http", 1 ) );
	if (ref != -1)
	    window.document.location.href=ref;
    } else if (/^www.amazon/.test(host)) {
	var s;
	// if (form=getById("searchSortForm") != false) {
	//     var sel=getById("sort");
	//     sel.addEventListener("click", function(){ window.name+="amzClk"; },0);
	//     if (sel.selectedIndex != 2 && ! /amzClk$/.test(window.name) ) {
	// 	sel.selectedIndex=2;
	// 	var pseudo_event = window.document.createEvent("MouseEvents");
	// 	pseudo_event.initMouseEvent("change", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	// 	sel.dispatchEvent(pseudo_event);
	//     }
	// }
    }
}


//window.addEventListener("dblclick", handleDblClick, false);

// window.addEventListener("keypress", function(e) { 
// //    if (e.keyCode==13) handleDblClick(e) 
//     if (   e.ctrlKey && (e.keyCode==38 || e.keyCode==40)  ) handleCtrlArrow();
// }, false); // <enter key> also charCode==0

//addEventListener("keypress", handleLinkFocus, false);
addEventListener("keydown", handleKeyDown, false);



//
// Functions:
//

function handleClick(e) { // for left-click, mousedown //firefox issue, alt click combo ignored in mousedown etc. on mint 14.  Alt is for window manager move?
   //log(e+", click(mousedown), alt:"+e.altKey+", ctrl:"+e.ctrlKey+" shift: "+e.shiftKey+", meta:"+e.metaKey);      
   if ( ! ( e.ctrlKey | e.shiftKey | e.altKey | e.metaKey) ) return true;
   if (e.button != 0) return true;
   if (window.getSelection().toString().length != 0) return true; 
   if (e.ctrlKey && e.target.tagName=="OPTION") return true;
   if (e.ctrlKey &&  !  (  e.altKey || e.shiftKey )  ) return true;
   if ( uwin.link_stack && uwin.link_stack.length) return true;
   if (/^flot/.test(e.target.className)) return true;
   //   GM_log("Ragbag, Cut/Paste HTML on element:"+e.target.tagName);
   window.status="Ragbag, Cut/Paste HTML on element:"+e.target.tagName;
   GM_log(window.status);
   e.returnValue=true;
   e.cancelBubble=true;
   e.cancel=true;
   if (e.target.blur) e.target.blur();
   e.preventDefault();
   e.stopPropagation();
  if (e.metaKey || (Windows && e.altKey && e.ctrlKey)) { //expand or shrink element
    var cs=window.getComputedStyle(e.target,null);
    var height=parseFloat(cs.height);
    var width=parseFloat(cs.width);
    if (height==0 || isNaN(height))
      height=parseFloat(cs.lineHeight);
    var font_size=parseInt(cs.fontSize);
    
    var factor=1.1;
    if (e.shiftKey)
      factor=0.9;
    
    font_size=(font_size*factor|0)+"px";
    height=(height*factor|0)+"px";
    width=(width*factor|0)+"px";
    
     e.target.style.height=height;
     e.target.style.width=width;
     e.target.style.lineHeight=height;
     e.target.setAttribute("height", height);
     e.target.setAttribute("width", width);
     e.target.style.fontSize=font_size;
     window.status="Ragbag, expand/shrink element";
     GM_log(window.status);
    return false;
  }
  if (e.ctrlKey && e.shiftKey ) { // cut item, delete element
    the_first_cut=true;
    var parent=e.target.parentNode;
    parent.removeChild(e.target);
    // 	if (window.parent != window) //iframe
    // 	    while (parent.parentNode) {
    // 		var child=parent;
    // 		parent=parent.parentNode;
    // 		parent.removeChild(child);
     // 	    }
     paste_stack.push(e.target);
     switchHighlight(null, true);
     var span=window.document.createElement("span");
     span.appendChild(e.target);
     GM_setValue("ragbaggs", span.innerHTML);
     window.status="cut <"+e.target.nodeName+">";
     GM_log(window.status);
    return false;
  }
   log("Highlight?");
   if (e.shiftKey && ! e.altKey) { // shift click highlight element, select it;
      //e.target.style.textDecoration="blink"; //{text-decoration: blink}
      //bury next 2 automatic events.
      document.addEventListener("mouseup", function(e) { e.preventDefault();e.stopPropagation();this.removeEventListener("mouseup", arguments.callee,true);}, true);
      document.addEventListener("click", function(e) { log("stop prop");e.preventDefault();e.stopPropagation();this.removeEventListener("click", arguments.callee, true);}, true);
      if (current_target 
	&& (e.target==current_target || current_target.compareDocumentPosition(e.target) ==  20))  { // e.target is within current area
      log("Click target is within current highlight area");
      if (current_target != body) {
	widen_stack.push(current_target);
	switchHighlight(current_target.parentNode);
      }
      else {
	var narrowed_element=widen_stack.pop();
	if (narrowed_element)
	  switchHighlight(narrowed_element);
      }
      return;
    }
    switchHighlight(e.target);
    window.status="w, widen; n, narrow; p, crop; Clicks on border: shift-right-click, full zoom; ctrl-right, paste; ctrl-shift-click, cut item; mid-click, columns; with ctrl/alt, zoom in/out";
    log("Info. Press 'w', for widening your selection; 'n' for narrow; r, to make resizable;  Clicks on border: shift-right-click, full zoom; ctrl-right, paste; "
	+"\nctrl-shift-click, cut item; mid-click, columns; with ctrl/alt, zoom in/out; meta (alt+ctrl on Dos) expand/shrink item");
    if (not_listening) {
      not_listening=false;
      function keyhandler(e) { 
	// if (e.charCode !=119 && e.charCode!=110 && e.keyCode!=27 && e.charCode!=99) //esc
	//     return true;
	 if (e.altKey || e.ctrlKey) return;
	 var key=e.charCode+e.keyCode;
	 if (Chrome && key>64) key+=32;
	 log("KeypressHt, char code: "+e.charCode+", key code:"+e.keyCode+", tot:"+key);
	 switch (key) {
	 case 27: //<esc>, stop listening.
	 case 99:  //c, copy, allow you to copy selected HTML from popup
	    this.removeEventListener((!Chrome?"keypress":"keydown"), keyhandler, false);
	    not_listening=true;
	    var ctarget=current_target;
	    switchHighlight(false, true);
	    select_el_text(ctarget);
	    if (key==27) break;
	    alert2(outerHTML(ctarget)), 		    GM_log(outerHTML(ctarget));
	    //$(ctarget).select();
	    break;
	case 100:  //d, describe
	  var descr, elem=current_target||e.target;
	  with (elem) {
	    descr="id: "+ (id?id:"none") + ", class(es): "+ (className?className:"none") + ", tagName: "+tagName;
	  }
	    var p=elem.parentNode;
	    if(p) {
	       descr+="\nparent id: "+p.id;	      
	       descr+=", parent class(es): "+p.className+ ", parent tag: "+p.tagName;	      
	    } else descr+=", no parent";
	    descr+="\n\nNo. of children: "+elem.children.length;
	    var child_classes=$(elem).find("* [class]").map(function() { return this.className });
	    if (child_classes.length)
	       descr+="\nChild class(es): "+child_classes.toArray().join(" ");
	    var child_ids=$(elem).find("* [id]").map(function() { return this.id });
	    if (child_ids.length)
	       descr+="\nChild id(s): "+child_ids.toArray().join(" ");

	    descr+="\n\nElement path, Xpath: "+getXPath(elem);
	    descr+="\n\nElement path, numeric Xpath: "+getXPath(elem, true);
	  descr+="\n\nNesting:";
	   p=p.parentNode;
	   while (p && p.tagName) {
	      descr+="->"+p.tagName+"("+p.id+")";
	      p=p.parentNode;
	   }
	   var cpted= getComputedStyle(elem, null); 
	   descr+="\n\nColor:"+cpted.color+", background color:"+cpted.backgroundColor;
	   if (elem.textContent) descr+="\n\n\nText Content:\n\n"+elem.textContent+"".replace(/\n\n+/g," ");
	   alert2(descr);
	   GM_log(descr);
	   break;//case 100
	 case 101: //e, edit
	    var el=current_target||e.target;
	    el.title="";
	    var inner=true, html=el.innerHTML, attribs=getAttributes(el);
	    if (!html) { html=el.outerHTML;inner=false}
	    var pwin=prompt2("HTML within element clicked, <"
			     + el.tagName 
			     // + (e.target.id ? " id:"+el.id : " no id" )
			     // + (e.target.className ? ", class:"+e.target.className : ", no class" ) 
			     + attribs
			     + ">, editable:\n ", html, 
			     function(newtext) {
				if (newtext) {
				   if (inner)
				      el.innerHTML=newtext;
				   else
				      el.outerHTML=newtext;
				}
			     }); 
	    var ta=pwin.document.getElementById("p2reply");
	    ta.style.height="80%";
	    break;
	 case 110:  //n, narrow
	    var narrowed_element=widen_stack.pop();
	    if (narrowed_element) {
	       switchHighlight(narrowed_element);
	       window.status="narrowed";
	    }
	    break;
	 case 112: // p, crop to highlighted element.
	    var elem=e.target;
	    if (current_target)
	     elem=current_target;
	   //while(elem.parentNode.tagName != "BODY")
	   deleteSurroundingElements(elem);
	   elem.style.setProperty("font-size", "150%", "important");
	   switchHighlight(null, true);
	   elem.style.setProperty("color", "-moz-FieldText", "important");
	   elem.style.setProperty("background-color", "-moz-Field", "important");
	   var msg="Zoomed in fully, shift-right-click on element, zoom out with repeated alt-clicks on the element.";
	   unsafeWindow.status = msg; User_log(msg);
	   break;
	case 114:  // key r, resizable, make it.
	   var elem=current_target||e.target;
	   addJqueryCss();
	   $(elem).resizable();
	   window.status="Made resizable: <"+elem.tagName;
	   break;
	case 116: // t, get innerhtml text
	   if (current_target) {
	      GM_log(current_target.innerhtml);
	      alert2(current_target.innerHTML);
	   }
	   break
	case 119:  // key w, widen
	  if (current_target != body) {
	    widen_stack.push(current_target);
	    switchHighlight(current_target.parentNode);
	    window.status="widened";
	  }
	  break;
	case 120: // key x, delete/cut  highlighted element.
	    the_first_cut=true;
	    var parent=current_target.parentNode, target=current_target;
	    log("remove "+target.tagName+", event target id: "+e.target.id);
	    parent.removeChild(target);
	    // 	if (window.parent != window) //iframe
	    // 	    while (parent.parentNode) {
	    // 		var child=parent;
	    // 		parent=parent.parentNode;
	    // 		parent.removeChild(child);
	    // 	    }
	   paste_stack.push(target);
	   switchHighlight(null, true);
	   var span=window.document.createElement("span");
	   log("to span: "+span+" append: "+target);
	   span.appendChild(target);
	   GM_setValue("ragbaggs", span.innerHTML);
	   window.status="cut <"+target.nodeName+">";
	   current_target=null;
	   break;
	default:
	   window.status="No action";
	   return true;
	}//end switch(key)
	preserve_status=2;
	e.preventDefault();
	e.stopPropagation();
      }//end keyhandler()
      window.document.addEventListener( (!Chrome?"keypress":"keydown"), keyhandler, false);
      ///	}, false);
      return false;
    }
  }
   log("Zoom-in? "+e.altKey+" "+e.shiftKey+" "+e.target+" "+(e.target!=body));
  if (e.altKey && ! e.shiftKey && e.target != body) { // Zoom-in
     log("del sur");
     deleteSurroundingElements(e.target);
     scrollToMid(e.target);
     unsafeWindow.status = "Zoomed in on element by one degree";
     GM_log("Zoomed in on element by one degree");
     return false;
  }
  if (e.altKey && e.shiftKey) { //zoom out
     log("zoom out");
     var old_body=zoom_stack.pop();
     if (old_body) {
	var children=body.childNodes;
	var old_children=old_body.childNodes;
	while(children.length) 
	   body.removeChild(children[0])
	while(old_children.length) {
		body.appendChild(old_body.removeChild(old_children[0]))
	    }
	    scrollToMid(e.target);
       unsafeWindow.status = "Zoomed out by one degree";
       GM_log(unsafeWindow.status);
	}
	else
	    unsafeWindow.status = " ";
	return false;
  }
   return true;
}

function nopopup(e) { log("nopopup"); e.preventDefault();   e.stopPropagation();	}
function removeit() { window.removeEventListener("contextmenu", nopopup, true); }

function handleMouseDown(e) { // Handles right click and middle click.  For zoom fully & paste element 
  //log("mousedown, for right/middle clicks, alt:"+e.altKey+", ctrl:"+e.ctrlKey+" shift: "+e.shiftKey+", meta:"+e.metaKey+", button "+e.button);    
  if (nopopup_flag) {
    removeit();
    nopopup_flag=false;
  }
  if (  !  (   (  (  e.button == 2 ) && ( e.ctrlKey || e.shiftKey ) )
		 ||  ( e.button == 1 && e.altKey && ! e.ctrlKey && e.shiftKey)	     )        )
    return true;
  e.preventDefault();
  e.stopPropagation();
  e.returnValue=false;
  e.cancelBubble=true;
  e.cancel=true;
  
    nopopup_flag=true;
    window.addEventListener("contextmenu", nopopup, true);
    if ( e . button == 1 ) return removeLink(e.target); // middle-click on link
    if ( ! e.ctrlKey && e.shiftKey) { // zoom in fully
	var elem=e.target;
	if (current_target)
	    elem=current_target;
	while(elem.parentNode.tagName != "BODY")
	    deleteSurroundingElements(elem);
	elem.style.setProperty("font-size", "150%", "important")
	switchHighlight(null, true);
	elem.style.setProperty("color", "-moz-FieldText", "important")
	elem.style.setProperty("background-color", "-moz-Field", "important")
	unsafeWindow.status = "Zoomed in fully, shift-right-click on element, zoom out with repeated alt-clicks on the element.";
       GM_log(unsafeWindow.status);
	return false;
    }
    if (e.ctrlKey) { //ctrl right click, paste item
       var last_cut=paste_stack[paste_stack.length-1];
       log("paste item "+last_cut+" "+the_first_cut);
       if ( ! last_cut && ! the_first_cut) {
	   var span=window.document.createElement("span");
	   span.innerHTML=GM_getValue("ragbaggs","")
	   span.id="ragbaggs";
	   log("last cut to be:"+span.innerHTML)
	   if (span.innerHTML != "")
	      last_cut=span;
	}
	if (last_cut) {
	    if( e.shiftKey) {
	       var clone=last_cut.cloneNode(true);
	       var target=e.target.nextElementSibling||e.target;
	       log("paste into "+target.parentNode+" before "+target);
	       if (! target.tagName || /^html/i.test(target.tagName))
		  $("body")[0].appendChild(clone);
	       else 
		  target.parentNode.insertBefore(clone, target);
	       addJqueryCss();
	       $(clone).resizable();
	       window.status="Pasted <"+last_cut.tagName+"> after <"+e.target.tagName+">";
	    }
	    else {
	       paste_stack.pop();
	       var children=e.target.children;
	       e.target.insertBefore(last_cut, children[children.length/2|0]);
		window.status="Pasted <"+last_cut.tagName+"> into middle of <"+e.target.tagName+">";
	    }
	   //scrollToMid(last_cut)
	    preserve_status=1;
	}
	else
	    window.status="Paste stack empty";
	return false;
    }
}

function deleteSurroundingElements(target) {
   log("deleteSurroundingElements");
   var children=body.childNodes;
   var top_children_count=children.length;
   var cloned_body=body.cloneNode(true);
   zoom_stack.push(cloned_body);
   cloned_body.addEventListener("mousedown", handleClick, true);

    while(children.length) 
	body.removeChild(children[0])
    var parent=target.parentNode;

    while (parent && parent.parentNode) {
	target=parent;
	parent=parent.parentNode
    }
    if (top_children_count > 1 && parent)
	target=parent;
   log("body empty append target "+target.tagName+", "+target.id+", "+target.className);
   body.appendChild(target)
   target.setAttribute("style", target.style.cssText+"width: "+(window.innerWidth-30)+"px ! important; height: "+(window.innerHeight)+"px ! important;");
   broaden(target, 0);
   function broaden(target, level) {
	var child=target.firstElementChild;
	level++;
	if (level > 3)
	    return;
	while(child){
	    //broaden(child, level);
	    var setting="100%";
	    if (level > 1)
		setting="auto";
	    if (level > 2)
		setting="auto";
	    child.setAttribute("style", child.style.cssText+"width: "+setting+" ! important; height: auto ! important;");
	    child=child.nextElementSibling;
	}
    }
}

function scrollToMid(elem) {
    var pos=getXY(elem);
    var  midY=window.innerHeight/2|0, midX=window.innerWidth/2|0;
    //log("mid "+midX+" "+midY+" scroll pos: "+window.scrollX +" "+window.scrollY);
    pos.x -= window.scrollX+midX; pos.y -= window.scrollY+midY
    scrollBy(pos.x, pos.y)
}

function getXY(obj) { //returns: {x,y}
    var curleft = 0, curtop = 0, border;
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

function mouseOverAndOut(e) {
    //log(e.type+ " target: "+e.target.tagName+ ", related: "+(e.relatedTarget ? e.relatedTarget.tagName : ""));
    if ( preserve_status ) {
	preserve_status--;
	return;
    }
    e.stopPropagation();
    e.preventDefault();
    if (e.type=="mouseout" ) {
	if ( e.target==last_target) 
	    window.status=" ";
	return;
    }
    if ( last_msg ) {
	window.status="Previous "+last_msg;
	last_msg=null;
	return false;
    }
    var link=getNearestElement(e.target, "A");
    if ( ! link ) link=e.target;
    var id=e.target.id, eclass=e.target.className,
    idstr=(id?", id: "+id:"")+(eclass?", class: "+eclass:"")+eclass
    var onc=link.getAttribute("onclick"), href=link.href,
    details=(href?" href: "+href:"")+(onc?" onclick: "+onc:""), msg
    if (last_target==e.target)
	msg="Mouse on target HTML element: <"+e.target.tagName+idstr+">"+details;
    else
	msg="HTML element: <"+e.target.tagName+idstr+">"+details;
    window.status=msg;
    if ( e.target.href || /a|link/i.test(e.target.tagName) ) { last_msg=msg;log("set lm "+last_msg)}
    //log(msg);
    return false;
}

function getNearestElement(obj, tag) {
    if  ( ! obj || ! obj.tagName) return false;
    if ( obj.tagName == (tag||"A")) return obj;
    return getNearestElement(obj.parentNode, tag);
}

/////////
//////////Mainline.
////////
document.addEventListener("mousedown", handleMouseDown, true); // for mid & right button
//document.addEventListener("click", handleClick, true);
document.addEventListener("mousedown", handleClick, true);
//body.addEventListener("dblclick", function (e) {}, true}


function replacelinks() { 
   if (!replacelinks.toggle) replacelinks.toggle=true;else replacelinks.toggle=false;
   log("replacelinks");
   links=$("a"); 
      //= unsafeWindow.document.getElementsByTagName("a");
   mapFunctionToPage(replacelinks, "green", "Click here to replace links with their url.")
   links.each(function(){ removeLink(this); });
   // for(var i =0; i < links.length; i++ ) {
   //    link=links[i];
   //    removeLink(link);
   // }
   
}
function removeLink(target, recursive_call, excursive_call, procursive_call, epocursive_call) {
    if ( ! recursive_call && ! excursive_call) {
	// var links = target.getElementsByTagName("a");
	// for(var i =0; i < links.length; i++ ) {
	//     removeLink(links[i], true);
	// }
       $(target).find("a").each(function() {	  removeLink(this, true);       });
    }
    var old_style=window.document.defaultView.getComputedStyle(target, null);
    var new_link = target;
    if ( target.tagName=="A" &&  ! new_link.dataset.rbrmlink ) { 
	new_link= window.document.createElement("a");
	new_link.textContent=target.textContent;
	new_link.dataset.href=target.href;
	target.parentNode.replaceChild(new_link, target); // replace target link
       delete target;
	new_link.dataset.rbrmlink=true;
	new_link.style.backgroundColor=old_style.backgroundColor;
	new_link.style.color=old_style.color;
	//if ( old_style.textDecoration == "underline")
	new_link.style.textDecoration="none";//"line-through";//"overline";
	new_link.style.cursor="text";
       //new_link.innerHTML+="<br><a href="+target.href+">"+target.href+"</a> "
       new_link.innerHTML+="<div style='display:inline;'> [ "+target.href+"] </div>"
	increaseFontSize(new_link);
	increaseFontSize(new_link.firstElementChild);
	// if (new_link.previousElementSibling && new_link.previousElementSibling.tagName=="A" && ! epocursive_call) 
	//     removeLink(new_link.previousElementSibling, recursive_call, excursive_call, true);
	// if (new_link.nextElementSibling && new_link.nextElementSibling.tagName=="A" && ! procursive_call)
	//     removeLink(new_link.nextElementSibling, recursive_call, excursive_call, false, true);
    }
    else if ( target.tagName=="A") { //toggle back link
	//target.href=target.getUserData("href");
       new_link = window.document.createElement("a");
       //target.appendChild(new_link);
       new_link.href=target.dataset.href;
       log(" toggle back "+ target.dataset.rbrmlink+" "+target.parentNode+", ptag: "+target.parentNode.tagName);
       log(" t tag "+target.tagName);
       if (target.parentNode) 
	  target.parentNode.replaceChild(new_link, target);
       //target.dataset.href=false;
       //new_link.setAttribute("onclick", target.getAttribute("onClick"));
       // target.setAttribute("onClick", "");
       // target.style.textDecoration = "underline";
       // window.document.addEventListener("mouseup", function(e){
       // 	    log("mouseup");
       // 	    this.removeEventListener("mouseup", arguments.callee, true);
       // 	    e.stopPropagation();	    e.preventDefault();
       // 	    return false;
       // 	}, true);
       // 	window.document.addEventListener("click", function(e){
       // 	    log("click 2");
       // 	    this.removeEventListener("click", arguments.callee, true);
       // 	    e.stopPropagation();	    e.preventDefault();
       // 	    return false;
       // 	}, true);
       // 	return false;
    }//end else
    if (new_link.parentNode && new_link.parentNode.tagName=="A" && ! recursive_call) removeLink(new_link.parentNode, false, true);
}

addEventListener('load',function() { // for removeChild to remove  all iframes, add  "@run-at document-start" to meta data at top
    if ( /google|youtube|clusty/.test(host) ) {	putAtEnd("tads");	putAtEnd("rhs");    }
    if ( /gumtree/.test(host) ) {	putAtEnd(null, "adsense");    }
    putAtEnd("", "googleads_style");
},0);

// var iframes=window.document.getElementsByTagName('iframe');
// for(var i=0;iframe=iframes[i], i < iframes.length; i++) {
//     //iframe.setAttribute("style", iframes[i].cssText+"color: lightgray;border-width: 5px;border-style: double; ")
//     iframe.style.borderColor="silver";
//     iframe.style.borderWidth="8px";
//     iframe.style.setProperty("border-style", "double", "important");
//     iframe.style.margin="2px 2px 2px 2px";
//     iframe.style.padding="2px";
//     //iframes[0].parentNode.removeChild(iframes[0])
// }
// },false);

var Windows;
if (navigator.platform.charAt(0) == 'W')
    Windows=true;

var imgs=document.getElementsByTagName("img"), img, omo;
addEventListener("load", function() {
    for(var i=0; img=imgs[i], i < imgs.length; i++ ) 
	setImage(img);
  }, false);
addEventListener("DOMNodeInserted", function(e) {
    var el=e.target;
    if (el.tagName=="IMG")
      setImage(el) ;
  }, false)

function setImage(imgi) {
    var img=imgi;
    omo=img.getAttribute("onmouseout");
    if ( ! omo)  { 
	img=img.parentNode; 
	omo=img.getAttribute("onmouseout"); 
    }
    if (omo)  img.setAttribute("onmouseout", "var isrc=this.src;"+omo+"; this.src=isrc;");
    else
	imgi.addEventListener("mouseout",  function()    {  
	    var isrc=this.getAttribute("src"), ithis=this;
//        window.status="src: "+isrc;
	    setTimeout(function() { ithis.setAttribute("src", isrc); }, 200);
	}, false);
//    omo ? window.status = "src: "+img.src : null;
}

//
// Functions
//

unsafeWindow.mapFunctionToPage=mapFunctionToPage;

function checkInitSession(create, formals) {                  try{
   var ar=eval(sessionStorage.getItem("mapFunctionToPage"));
   //alert("checkInitSession "+uneval(ar)+", init: "+create);
   if (ar) {
      if (create) 
	 while(i=ar.shift())
	    mapFunctionToPage(i[0], i[1], i[2], "initialize")
   }
   else ar=[]
   if (formals) ar.push(formals)
   sessionStorage.setItem("mapFunctionToPage",uneval(ar));      }catch(e){}
   return true;
}


function mapFunctionToPage(func, col, tip, initing) {
   log("mapFunctionToPage "+col+" "+tip);
   if (!initing) checkInitSession(false, [func, col, tip]);
   if (window.parent != window) return; //frame
   var stylos="position:fixed;font-size:23px;cursor:pointer;left:16px; z-index:99999; color:"+col+";";
   var existing_dot=$("#"+col+"-sfsmpf");
   tip=tip + "  Click right or middle to remove this icon.";
   if(existing_dot.length!=0) {
      log(col+", already there, just set tip");
      existing_dot[0].title=tip;
      return null;           //already there
   }
   log("mapFunctionToPage setup "+col);
   var dot="<span id="+col+"-sfsmpf style='"+stylos+"'+>\u25CF</span>"
   dot[0].title=tip;
   log("mapFunctionToPage dot html "+dot);
   dot=$(dot);
   var sfsdock=$("#sfsmapFunctionToPage");
   if (sfsdock.length==0) {
      sfsdock=$("<div id=sfsmapFunctionToPage></div>");
      $("body").prepend(sfsdock);
      dot.css({ top:"18px"})
   }
   else {
      var top=parseInt(sfsdock.find(":last").css("top"));
      dot.css({top:(top+20)+"px"})
   }
   sfsdock.append(dot);
   dot.mousedown(function(e){ if (e.button==0) { log2("Calling "+func+" ("+e); func(e); }
			      else  { $(this).remove();
				      var d=$("#sfsmapFunctionToPage");
				      if (d.children().length==0)
					 d.remove();
				    } });
   //dot.draggable();
   log("Return dot, title: "+ dot[0].title);
   return dot;
}

function switchHighlight(new_target, escape) {
    if (last_target) { // clear highlight from last element
	last_target.border=last_target_clone.border;
	last_target.style.borderColor=last_target_clone.style.borderColor;
	last_target.style.borderWidth=last_target_clone.style.borderWidth;
	last_target.style.borderStyle=last_target_clone.style.borderStyle;
	last_target.style.border=last_target_clone.style.border;
	last_target.title=last_target_clone.title;
	// last_target.removeEventListener("mouseover", mouseOverAndOut, false);
	// last_target.removeEventListener("mouseout", mouseOverAndOut, false);
	window.removeEventListener("mouseover", mouseOverAndOut, false);
	window.removeEventListener("mouseout", mouseOverAndOut, false);
	if (new_target_bc)
	    last_target.style.backgroundColor =new_target_bc;
	else
	    last_target.style.backgroundColor ="";
	current_target=null;
    }
    if ( ! escape) { // add highlight to element
	last_target_clone=new_target.cloneNode(true);
	last_target=new_target;
	putBorderOnElem(new_target);
	new_target_bc=new_target.style.backgroundColor;
	new_target.style.backgroundColor ="yellow"
	new_target.style.zIndex=zIndex++;
	new_target.style.overflow="visible";
	new_target.title="<"+new_target.tagName+"> Hit 'w' to widen, 'n' to narrow the selection, <esc> to exit, 'x' to delete/cut highlighted element --ctrl-right to paste later; 'r', to make resizable; 'p' to crop page to selected element (you may need to click within area to focus).  Hit c to allow you to copy selected HTML from popup or console.  Hit d to describe element & get text & element path.  Hit e to edit html.  "
	// new_target.addEventListener("mouseover", mouseOverAndOut, false);
	// new_target.addEventListener("mouseout", mouseOverAndOut, false);
	window.addEventListener("mouseover", mouseOverAndOut, false);
	window.addEventListener("mouseout", mouseOverAndOut, false);
	window.status="<"+new_target.tagName+">"
	    + (new_target.id ? ", id: "+new_target.id : "")
	    + (new_target.className ? ", class: "+new_target.className : "");
	uwin.current_target=current_target;
	current_target=new_target;
	uwin.highlighted_element=new_target;
	if (top && top !== self) top.highlighted_element=new_target;
	//scrollToMid(new_target);
    }// end if ! escape
    log("Switched Highlight, uwin.ct:	"+uwin.current_target+", ct "+current_target+", nt "+new_target+", lt "+last_target);

}    

function putBorderOnElem(elem) {
	    elem.style.borderColor="red";
	    elem.style.borderWidth="19px";
	    elem.style.borderStyle="double";
}

function handleDblClick(e) { // Go to next page if page has a "next" link, eg, on a search results page.
    log("handle DblClick "+e.target.tagName);
  if (/INPUT|TEXTAREA/.test(e.target.tagName)) return true;
  if (handleYoutubeTryAgainLater()) return true;
  var tc=e.target.textContent.length;
  var sel=window.getSelection(), sel_len=sel.toString().length;
  var anchor_node=sel.anchorNode||e.target;
  var focus_node=sel.focusNode||e.target; // containsNode returns bool.
  var ratio= tc / sel_len;//log2=GM_log;
  log("Tag: "+e.target.tagName+", id: "+e.target.id+", class: "+e.target.className+
       ". TC len: "+tc  +" sel len: "+sel_len + " ratio: " +ratio
       +".  Anchor "+anchor_node.tagName+", focus: "+focus_node.tagName +" FocusOffset "+sel.focusOffset
       +".  #DIVS: "+e.target.getElementsByTagName("div").length+", #elems "+e.target.getElementsByTagName("*").length
       +", 1stEl "+e.target.firstElementChild+ ", child.len "+e.target.children.length
       );
  if (e.target.children.length==0) return;
  if (ratio < 10 && sel_len && tc) return;
  if (checkSelectionInInput()) return;
  var link, links=document.getElementsByTagName("a"), limit=links.length*0.66, 
    nextExp=/^[> ]*[Nn]ext|^>>$|^\u00bb$/;
  for(var i=links.length; link=links[i], log("link's text is: "+(link?link.textContent:"")), i > limit; i--) {
    log("1Next link is: "+(link?link.href:"no link") );
    if ( link && ( nextExp.test( link.textContent.trim() )  || isImgNext ( link, nextExp )  )  ) {
      log(invisible(link)+"< invis?.  1Next link is: "+link.href+", vis: "+getComputedStyle(link, null).display);
      //location.href=link.href;
      issueClick(link);
      return false;
    }
    else if ( ! link || isEmpty(link)) limit =  limit - 1 > 0 ? limit : limit - 1;
  }
  limit=links.length*0.66;
  for(var i=0; link=links[i], log("2 link's text: "+(link?link.textContent:"")), i < limit; i++) {
    if (link && nextExp.test(link.textContent.trim())) {
      log("2Next link is: "+link.href);
      //location.href=link.href;
	    issueClick(link);
	    return false;
    }
    else if ( ! link || isEmpty(link)) limit =  limit + 1 > links.length ? limit : limit + 1;
  }
  log("No 'next' link found");
  return true;
}

function checkSelectionInInput() {
    //Check if text selected with ctrl-c, for textareas (firefox shortcoming)
    var fieldInFocus, input, inputs=window.document.getElementsByTagName("input");
    var tarea, tareas=window.document.getElementsByTagName("textarea");
    for(var j =0; input=inputs[j], j < inputs.length; j++) try {
	if ( input.selectionEnd && input.selectionEnd != input.selectionStart)
	{ fieldInFocus=input; break; }     }	catch(e){}
    for(var i=0; tarea=tareas[i], i < tareas.length; i++) try {
	if ( tarea.selectionEnd && tarea.selectionEnd != tarea.selectionStart)
	{ fieldInFocus=tarea; break; }    }	catch(e){}
    log("FiF "+fieldInFocus);
    return fieldInFocus;
}

function isEmpty(node) {
    var text=node.textContent;
    return  /(^\s*$)/.test(text) // just whitespace or empty
}

function issueClick(link) {
    //log("Clicking on href: "+link.href+"\nText in link: "+link.textContent+"\nImgs: "+link.getElementsByTagName("img").length );
    var pseudo_event = window.document.createEvent("MouseEvents");
    pseudo_event.initMouseEvent("click", true, true, window, 1, 0,   0,              0,          0,      false,   false, false, false, 0, null);
    if (link.dispatchEvent)
	link.dispatchEvent(pseudo_event);
}

function putAtEnd(id, class_name) {
    //log("Put at end of doc, id: "+id+", class: "+class_name);
    var putatend;
    if (id) {
	putatend=document.getElementById(id);
	if (putatend) 
	    appendElement(putatend);
    }
    if (class_name) {
	putatend=document.getElementsByClassName(class_name);
	for(var i=putatend.length-1; i >= 0; i--) 
	    appendElement(putatend[i]);
    }

    // if (putatend && putatend.length != undefined) log("Put "+putatend.length+ "elements to end.");
    // else if (putatend) log("Put it at end"); else log("None to append");

    function appendElement(el) {
	document.body.appendChild(el);
	el.style.setProperty("position","static", "important");
	el.className +=" junked";
    }
}

function handleYoutubeTryAgainLater() {
    if (/^\/watch$/.test(location.pathname) ) {
	var newplace=location.href.replace("?", "#!");
	location.href=newplace;
	return true;
    }
    if ( /amazon/.test(location.host) ) {
	var link=getById("pagnNextLink");
	if ( link == false ) return true;
	location.href=link.href;
	issueClick(link);
	return true;
    }
}

function increaseFontSize(elem) {
   setTimeout(function(){
    var computed_style=window.document.defaultView.getComputedStyle(elem, null),
    new_size=(parseInt(computed_style.fontSize)+3)+"px";
    elem.style.fontSize=new_size;
   },0);
}

function isImgNext(link, nextExp){
    var res, img=link.getElementsByTagName("img")[0];
    if ( ! link.textContent.trim() &&  img ) {
	if (nextExp.test ( img.alt ) )
	    res=true;
	if (nextExp.test (img.src ) )
	    res=true;
    }
    return res;
 }

function invisible(elem){ if ( ! elem) return false; var cpted= getComputedStyle(elem, null); if (cpted) return cpted.display=="none" || cpted.visibility == "hidden";  }

function getById(id) {
    var el=document.getElementById(id);
    if ( ! el) { 
	el=new Boolean(); 
	el.style={}; }
    return el;
}

function handleKeyDown(e){ 
  // for alt-x run console,
  // alt-l log to global log,
  // expr <control>-<digit 1 2 3 4 5..> go directly to link, eg, control-3, visit third link on page, or 3rd search result.
  var nKey=e.keyCode-48, factor=0.9; //48=code for zero(in ascii), so 1-9 are keys 1-9
  //use charCode if keypress event.
   log2("keydown, "+e.charCode+" :cc---- kc: "+e.keyCode+"   alt:"+e.altKey+", ctrl:"+e.ctrlKey+" shift: "+e.shiftKey+", nKey: "+nKey);    
  // if ( e.altKey && (nKey == 13 || nKey == -3)) { // '=' || '-'
  // 	if (nKey==13) factor=1.1;  
  // 	adjustVideoSize("object");
  // 	adjustVideoSize("embed");
    // }
    if ( e.altKey && e.shiftKey && e.keyCode == 88) // alt-shift-x, alt shift x, (in ascii 88 is uppercase X and 120 is x)
       { blankPage(); return true; }
    if ( e.altKey && e.keyCode == 88) // alt-x, alt x, (in ascii 88 is uppercase X and 120 is x)
       { doCode(); return true; }
    if ( e.altKey && e.keyCode == 76) // alt-l, alt l, (in ascii 76 is uppercase L)
       { globLogtext(); return true; }
    if ( e.altKey && e.keyCode == 78) // alt-n, alt n, (in ascii 78 is uppercase N)
       { stopJS(); return true; }

    if ( ! e.ctrlKey ) return true;
    if (e.metaKey) return true;
    if (nKey > 9) return true;
    if (nKey < 0) return true;
    log("do key action "+nKey);
    var c=uwin.hitkey_cycle||0; //hitting same number repeatedly moves by 10s, eg, 7, 17th, 27th etc.
    if ( uwin.hitkey == nKey) {  c++;  }//c%=4;}
    else  { uwin.hitkey=nKey; c=0; }
    uwin.hitkey_cycle=c; 
    // if ( ! uwin.hitkeys[nKey]) uwin.hitkeys[nKey]=1; else uwin.hitkeys[nKey]++;
    // for (i=uwin.hitkeys[nKey]; i > 1; i--)
    //   nKey+=10;
    nKey+=c*10;
    //if (e.altKey) nKey+=10;
    var list=[], h=host;
    log("Focus to "+nKey+"th link");
    if(/google/.test(h))
	list=document.getElementsByClassName("g");
    else if(/youtube/.test(h))
      list=document.body.getElementsByClassName("video-thumb"); 
    else if(/scroogle/.test(h)){
	//list=document.body.getElementsByTagName("blockquote"); 
	list=document.body.getElementsByClassName("result");
	//list=document.body.getElementsByTagName("font"); 
    }
    else if (/wikipedia/.test(h)) {
	var res=document.getElementsByClassName('mw-search-results');
	if (res[0])
     	    list=res[0].getElementsByTagName("a"); 
    }
    if ( list.length==0 && ! (list=findSearchResults()) ) { // default list
	list=document.body.getElementsByTagName("a");
	//log("get all doc's A's, "+list.length);
    }
    if (nKey==0) {
      for (var i=0; i < list.length; i++) {
	//	list[i].textContent=(i+1)+" "+list[i].textContent;
	list[i].innerHTML="<sup style='color:red;font-size: xx-small;'>"+(i+1)+"</sup>"+list[i].innerHTML;
      }
      return;
    }
    var target=getLink();
    log("Put focus on "+nKey+"th link as: "+target.tagName+", w href: "+target.href+", link text: "+target.textContent);
    scrollToMid(target);
    putBorderOnElem(target);
    target.focus();
    window.status="Focus to "+nKey+"th link";
    return;

    function getLink(){
	var elem;
	if (list.length < nKey) elem=list[list.length-1]
	else elem=list[nKey-1], i=1;
	log("got nth list link:  "+elem.tagName+", id "+elem.id+", childs "+elem.children.length+" href: "+elem.href+".  location "+location);
	if (elem.tagName=="A") {
	    while(  (  ! linkOk(elem) && i < list.length)  ) {
		i++;
		elem=list[nKey-1 + i];
	    }
	    return elem;
	}
	var link;
	link=elem.getElementsByTagName("a");
	log("got A's within nth of list: "+link.length);
	if (link.length) {
	    i=0;
	    while( i < link.length && ! linkOk ( link[i]) ) 
		i++;
	    link=link[i];
	}
	if ( ! link)  link=elem.getElementsByTagName("a")[nKey-1];
	return link;
    }
    function linkOk(elem) {
      var r=elem.href;
      if ( ! r) return; 
      if (location.href.match(r)) return;
      var style=getComputedStyle(elem, null);
      if (style.display == "none" || /hidden|collapse/.test(style.visibility) ) return;
      return true;
    }
    
    function findSearchResults() { // ret a div with id called "results"
	var divs=document.getElementsByTagName("div");
	for(var i=0; i < divs.length; i++) 
	    if (  /results|^res$/i.test(divs[i].id)   ) {
		//log("Found search results div id: "+divs[i].id+", class "+divs[i].className+", disp "+divs[i].style.display);
		if ( divs[i].style.display != "none"  ) {
		    var links=divs[i].getElementsByTagName("a");
		    if (links.length) return links; //[ divs[i] ];
		}
	    }
    }
    function putBorderOnElem(elem) {
      var local=uwin.pboe_local||(uwin.pboe_local={});
      var prev=local.prev;
      if (prev) {
	prev.style.borderColor=local.c;
	prev.style.borderWidth=local.w;
	prev.style.borderStyle=local.s;
      }
      local.c=elem.style.borderColor;
      local.w=elem.style.borderWidth;
      local.s=elem.style.borderStyle;
      elem.style.borderColor="red";
      elem.style.borderWidth="3px";
      elem.style.borderStyle="dotted";
      
      local.prev=elem;
    }// end func
};// end handleLinkFocus()

function blankPage() {
  while(body.children.length) 
    body.removeChild(body.firstElementChild);
}

function adjustVideoSize(vtag, factor) {
    var objs=document.getElementsByTagName(vtag), obj;
    for(var i =0; obj=objs[i], i < objs.length; i++) {
	var h=obj.getAttribute("height");
	var w=obj.getAttribute("width");
	obj.setAttribute("width", w*factor);
	obj.setAttribute("height", h*factor);
    }
}


String.prototype.grep = function (search) {     var r=RegExp(".*"+search+".*","g");     return this.match(r).join("\n");}


function addJqueryCss() {
   log2("Add Jquery style "+$("#jquery-ui-css").length);
   if ( ! $("#jquery-ui-css").length) {
      var resource=getMetaString("resource", "jqueryuiCss");
      resource=resource.substring(0,resource.lastIndexOf("/")+1);
      var rtext=GM_getResourceText("jqueryuiCss");
      rtext=rtext.replace(/url\(/g,"url("+resource);
      //log(" got text "+rtext.grep(  "url\\("  ));
      rtext=rtext.replace(/#EEEEEE/gi,"#fffbff").replace(/#ffffff/gi,"#002200")   //was fffbee, ffebee
	 .replace(/#333333|#888888|#000000|#121212/gi,"#002200")
	 .replace(/rgba(0,\s*0,\s*0,\s*0)/gi,"#002200").replace(/background:\s*none/gi,"background: #002200");
      log2("Add style for got text: "+rtext.grep( "rgb"));
      GM_addStyle(rtext);
      $("head :last-child")[0].id="jquery-ui-css";
   }// end if (#jqueryuiCss)
   
   function getMetaString(headerName, subname) {
      var m=GM_info.scriptMetaStr||"";
      var r=RegExp(headerName+"\\W+.*","gi");
      var ar=m.match(r);
      //log("match of "+r +" in "+m+"  res:"+ar);
      if (!ar) return ar;
      $(ar).each(function(i) {ar[i]=ar[i].replace(headerName,"").trim()});
      var resar=[]
      if (subname) 
	 ar=$(ar).each(function(i){ 
	    var r=RegExp("\\b"+subname+"\\b");
	    if (this.match(r))   resar.push(ar[i].split(r)[1].trim());
	 });
      else resar=ar;
      
      if (resar.length==1) return resar[0];
      return resar;
   }//end func    
   
}
//eg, GM_addStyle(getUrl("http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css"));
function getUrl(url) {
    return GM_xmlhttpRequest({ synchronous: true, url: url, method: "GET"}).responseText;
}


function select_el_text(target){
   var doc=document,sel;
   sel=window.getSelection();
   doc=doc.createRange();
   doc.selectNodeContents(target);
   sel.removeAllRanges();
   sel.addRange(doc)
}

//WR/////////////////
/////////////////// ////////////WRAPPER for Google Chrome etc.///////////////////////////////////////////
///////////////////
// Notes: the this pointer on chrome may differ from ff.
//              keypress does not pass on altKey setting (charCode is not set for keypress but for keydown for both).
function GM_platform_wrapper(title, id, installs, use_jquery) { //use_jquery=1 or 2 (for ui component)
   var name=title.replace(/\W*/g,""), uwin=unsafeWindow, bg_color="rgb(173,216,239, 0.8)"; //"#add8e6"
   String.prototype.parse = function (r, limit_str) {   var i=this.lastIndexOf(r); var end=this.lastIndexOf(limit_str);if (end==-1) end=this.length; if(i!=-1) return this.substring(i+r.length, end); };  //return string after "r" and before "limit_str" or end of string. 
   String.prototype.trim = function (charset) { if (!charset) return this.replace(/^\s*|\s*$/g,""); else return this.replace( RegExp("^["+charset+"]*|["+charset+"]*$", "g" ) , "");} //trim spaces or any set of characters.
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
      GM_getValue=function(name, defaulT) {	 
	 var res=old_get ( name, uneval (defaulT) ); 
	 if (res!="") try { return eval  ( res ); } catch(e) { log2("GM_getval"+name+" "+e); return JSON.parse(res.trim("()"));} 
	 return old_get ( name, defaulT  );	// For JSON string to obj just eval bracketed string, ie, eval("("+<string>+")")
      }
      window.pipe=uwin; try {
	 if (uwin.opener && uwin.opener.pipe)  { window.pipe=uwin.opener } } catch(e) { }
      window.pool=uwin;
      //useOwnMenu();
      if (use_jquery==2 && ! $("#jqueryuiCss").length ) {
	 //must have resource called jqueryuiCss in header
	 var src=GM_getResourceText ("jqueryuiCss");
	 //GM_addStyle(src);
	 $('head').append("<style id=jqueryuiCss>"+src+"</style>")
	 //log2($("#jqueryuiCss").length+" use_jquery "+src.substring(0,400));
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
   function countMembers(obj) { var cnt=0;     for(var i in obj) if ( ! obj.hasOwnProperty || obj.hasOwnProperty(i)) cnt++; 	return cnt;    }
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
   function prompt3(text, init_value, handler, following_text){
      prompt_interruption={ a:text, b:init_value, c:handler }; 
      if (!init_value) init_value="";
      var box=confirm3(text, handler, "","","", init_value, following_text);
      prompt_interruption=false;
      if (interrupted)	{ box.dialog("close"); interrupted=false;}
      return box;
   } //prompt3()
   function alert3(text){
      confirm3(text, "", null)
   }

   function confirm3(text, handler, btn1, btn2, title, init_answer, following_text ) {
      if(btn1 !== null) btn1=btn1||"Cancel";
      if (!confirm3.cnt) confirm3.cnt=1; else confirm3.cnt++;
      if (!handler) handler=function(){}
      btn2=btn2||"OK";
      title=title||"x";
      text=text.replace(/</g,"&lt;").replace(/\n/g,"<br>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
      following_text=following_text||"";
      log2("following_text "+following_text);
      following_text=following_text.replace(/</g,"&lt;").replace(/\n/g,"<br>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
      var res, buttons={}, box, dinput="";
      if (init_answer!==undefined) {
	 dinput="<input id=fsfdinput style='width:100%'></input>"
	 if (!text) dinput="<textarea id=fsfdinput style='width:100%; height:100%'></textarea>"
	 dinput.value=init_answer;
      }
      box=$("<div id=sfsconfirm3 title='"+title+"'><div class=msgtxt></div>"+dinput+"<div class=following></div></div>");
      var ip=box.find("input, textarea");ip.val(init_answer);
      ip.css({borderStyle:"indent", borderWidth:"4px"});
      box.find("div").eq(0).html(text);
      box.find("div").eq(1).html(following_text);
      //GM_addStyle("pre { font-family: Sans-Serif;}"); // if wrap text in <pre>
      $("body").append(box);

      buttons[btn2]=function(e) { //OK 
	 var ip=$(this).find("input, textarea");//can't use id since may be duplicated, queueing of dialoges?
	 handler(ip.length?ip[0].value:1);
	 log2("called handler, with text:"+(ip.length?ip[0].value:1)+".");
	 $(this).dialog("close");
	 e.stopPropagation();	    e.preventDefault();
      }
      if(btn1 !== null) //cancel
	 buttons[btn1]=function(e) {
	    log2("called handler, with null");
	    handler(null); $(this).dialog("close");
	    e.stopPropagation();	    e.preventDefault();	 
	 }
      box.dialog({ position: "center", modal: true
		   ,buttons: buttons, resizable: true 
		   ,height:"auto", width:"auto"     });
      // The dialog(.ui-dialog) has three components: .ui-dialog-titlebar, .ui-dialog-content (the div made above, "box") and .ui-dialog-buttonpane
      var dialog=$(".ui-dialog"), titlebar=$(".ui-dialog-titlebar"), limit=window.innerHeight*0.66*0.85, longD;
      log("box h "+box.height()+", "+limit);
      if (box.height()>limit) {  longD=true;log("too long "+limit);    box.height(limit);       dialog.css("top", window.innerHeight*(1/7)+"px");   }
      limit=window.innerWidth*.66;
      if (box.width()>limit) {      box.width(limit);    dialog.css("left", window.innerWidth*(1/6)+"px");   }
      dialog.css({ zIndex:9999999, textAlign:"left", position: "fixed", top:"15px" });
      $(dialog).add(titlebar).css({background:"#002400"});box.css("background","#002000"); $(".ui-dialog-buttonpane").css("background","#001800"); 
      dialog.find("*").addClass("sfsdiax");
      if (title=="x");
      with($(".ui-dialog-title"))
      {	children(":eq(0)").title="close";	width("5%");	css({cursor:"pointer"});
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
