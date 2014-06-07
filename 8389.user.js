// ==UserScript==
// @name           capslock alert
// @namespace      http://twitter.com/joshyu
// @description    alert whether the capslock key is on
// @include        *
// ==/UserScript==

ALERT_STYLES={APPENDING_WORDS:0,BORDER_RED:1};
var alert_style=ALERT_STYLES.BORDER_RED;
var old_border_style=null;


function capsDetect( e ) {
  //if the browser did not pass event information to the handler,
  //check in window.event
  if( !e ) { e = window.event; } if( !e ) { return; }
  //what (case sensitive in good browsers) key was pressed
  //this uses all three techniques for checking, just in case
  var theKey = 0;
  if( e.which ) { theKey = e.which; } //Netscape 4+, etc.
  else if( e.keyCode ) { theKey = e.keyCode; } //Internet Explorer, etc.
  else if( e.charCode ) { theKey = e.charCode } //Gecko - probably not needed
  //was the shift key was pressed
  var theShift = false;
  if( e.shiftKey ) { theShift = e.shiftKey; } //Internet Explorer, etc.
  else if( e.modifiers ) { //Netscape 4
    //check the third bit of the modifiers value (says if SHIFT is pressed)
    if( e.modifiers & 4 ) { //bitwise AND
      theShift = true;
    }
  }
  //if upper case, check if shift is not pressed
  if( theKey > 64 && theKey < 91 && !theShift ) {
    _alert(e,true);
  }
  //if lower case, check if shift is pressed
  else if( theKey > 96 && theKey < 123 && theShift ) {
    _alert(e,true);
  }
  else{
    _alert(e,false);
  }
}


function _alert(e,capsOn){
	if( !e ) { e = window.event; } if( !e ) { return; }
	var alerter=document.getElementById("universal_capslock_alerter");	
	if(capsOn){
		if(alert_style==ALERT_STYLES.BORDER_RED){
			old_border_style=e.target.style.MozOutline;
			e.target.style.MozOutline="2px solid red !important";
		}
		else if(alert_style==ALERT_STYLES.APPENDING_WORDS){
			if(alerter!=null){return;}
			var span=document.createElement("span");
			span.id="universal_capslock_alerter";		
			span.innerHTML="<br/><font color=red>caps on</font>"
			if(e.target.nextSibling!=null){
				e.target.parentNode.insertBefore(span,e.target.nextSibling);
			}else{
				e.target.parentNode.appendChild(span);
			}			
		}
		
	}else{
		if(alerter!= null){e.target.parentNode.removeChild(alerter);}
		if(old_border_style!=null){
			old_border_style=null;
			e.target.style.MozOutline=old_border_style;
		}
	}	
}


var passes= document.evaluate("//input[@type=\"password\"]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for(var i=0;i<passes.snapshotLength;i++){
	passes.snapshotItem(i).addEventListener("keypress",function(e){
		capsDetect(e);
	},true);
}