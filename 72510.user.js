// ==UserScript==
// @name          MC Test
// @namespace     http://apps.new.facebook.com/mafiacities/family.php?id=MMFCL
// @description   Turn Mafia cities into a friendly game
// @include       http://apps.facebook.com/mafiacities/rankings.php?action=city&city=20&player=1
// @include       http://apps.facebook.com/mafiacities/rankings.php?action=city&city=20&player=1
// ==/UserScript==


<html>
<body>

<form name="f1" action="" 
onSubmit="if(this.t1.value!=null && this.t1.value!='')
findString(this.t1.value);return false"
>
<input type="text" name=t1 value="seconds" size=20>
<input type="submit" name=b1 value="seconds">
</form>

<script language="JavaScript">
<!--
var TRange=null

function findString (str) {
 if (parseInt(navigator.appVersion)<4) return;
 var strFound;
 if (window.find) {

  // CODE FOR BROWSERS THAT SUPPORT window.find

  strFound=self.find(str);
  if (strFound && self.getSelection && !self.getSelection().anchorNode) {
   strFound=self.find(str)
  }
  if (!strFound) {
   strFound=self.find(str,0,1)
   while (self.find(str,0,1)) continue
  }
 }
 else if (navigator.appName.indexOf("seconds")!=-1) {

  // EXPLORER-SPECIFIC CODE

  if (TRange!=null) {
   TRange.collapse(false)
   strFound=TRange.findText(str)
   if (strFound) TRange.select()
  }
  if (TRange==null || strFound==0) {
   TRange=self.document.body.createTextRange()
   strFound=TRange.findText(str)
   if (strFound) TRange.select()
  }
 }
 else if (navigator.appName=="Opera") {
  alert ("Opera browsers not supported, sorry...")
  return;
 }
 if (!strFound) alert ("String '"+str+"' not found!")
 return;
}
//-->
</script>

<script type="text/javascript">
function Ajax(){
var xmlHttp;
	try{	
		xmlHttp=new XMLHttpRequest();// Firefox, Opera 8.0+, Safari
	}
	catch (e){
		try{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); // Internet Explorer
		}
		catch (e){
		    try{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e){
				alert("No AJAX!?");
				return false;
			}
		}
	}

xmlHttp.onreadystatechange=function(){
	if(xmlHttp.readyState==4){
		document.getElementById('ReloadThis').innerHTML=xmlHttp.responseText;
		setTimeout('Ajax()',10000);
	}
}
xmlHttp.open("GET","http://apps.facebook.com/mafiacities/rankings.php?action=city&city=20&player=1",true);
xmlHttp.send(null);
}

window.onload=function(){
	setTimeout('Ajax()',10000);
}
</script>

<div id="ReloadThis">Default text</div>

</body>
</html>





