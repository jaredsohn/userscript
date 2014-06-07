// ==UserScript==
// @name BWKS-JS
// @description BWKS AS server web-mording
// @author Denis N.
// @license MIT
// @version 1.8
// @include http://as1.voice.dsi.ru/ServiceProvider/Members/
// @include http://as1.voice.dsi.ru/ServiceProvider/DeviceInventory/
// @include http://as1.voice.dsi.ru/Group/Members/*
// @include http://as1.voice.dsi.ru/User/Profile14sp3/*
// @include http://as1.voice.dsi.ru/User/Addresses14sp3/
// @include http://as1.voice.dsi.ru/User/Authentication/*
// @include http://as1.voice.dsi.ru/User/CW/*
// @include http://as1.voice.dsi.ru/Common/folder_contents.jsp?folder=U0&menuId=0
// @include http://as1.voice.dsi.ru/Common/folder_contents.jsp?folder=U3&menuId=0
// @include http://as1.voice.dsi.ru/Common/folder_contents.jsp?menuId=0
// ==/UserScript==




//chrome GM_* wrappers

// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

     GM_registerMenuCommand = function(name, funk) {
    //todo
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}








var ru2en = {
  ru_str : "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя",
  en_str : ['A','B','V','G','D','E','JO','ZH','Z','I','J','K','L','M','N','O','P','R','S','T','U','F','H','C','CH','SH','SHH','','I','','JE','JU','JA',
            'a','b','v','g','d','e','jo','zh','z','i','j','k','l','m','n','o','p','r','s','t','u','f','h','c','ch','sh','shh','','i','','je','ju','ja'],
  translit : function(org_str) {
    var tmp_str = "";
    for(var i = 0, l = org_str.length; i < l; i++) {
      var s = org_str.charAt(i), n = this.ru_str.indexOf(s);
      if(n >= 0) { tmp_str += this.en_str[n]; }
      else { tmp_str += s; }
    }
    return tmp_str;
  }
}
//Workaround IE
//Object.prototype.attachEvent = function (sEvent, fnHandler, bUseCapture) {
//this.addEventListener(sEvent.indexOf('on') == 0 ? sEvent.replace('on', '') : sEvent, fnHandler, bUseCapture);




//Replace default search conditions (starts -> contains)
function FocusContains(event){
 var tag = event.target.tagName?event.target.tagName : event.target.parentNode.tagName;
 try{
  if(tag.toUpperCase()=='SELECT'){
    document.getElementById('findOp0').options[0].defaultSelected="false";
    document.getElementById('findOp0').options[1].defaultSelected="true";    
  }
 }
 catch(ex){}
}

document.addEventListener("DOMNodeInserted", FocusContains, false);
try{
 document.getElementById('findOp0').options[0].defaultSelected="false";
 document.getElementById('findOp0').options[1].defaultSelected="true";    
 e=document.getElementById('findValue0');
 e.setFocus();
}
catch(ex){}


//translit Caller Name from User Name
function setOnBlurLast(event, obj){
  ae =document.forms.namedItem("mainForm").elements.namedItem('lastName');
  ie=document.forms.namedItem("mainForm").elements.namedItem("unicodeLastName");
  ae.value=ru2en.translit(ie.value);
  GM_log('Make translit: '+ie.value+'->'+ae.value);
}
function setOnBlurFirst(event, obj){
  ae =document.forms.namedItem("mainForm").elements.namedItem('firstName');
  ie=document.forms.namedItem("mainForm").elements.namedItem("unicodeFirstName");
  ae.value=ru2en.translit(ie.value); 
  GM_log('Make translit: '+ie.value+'->'+ae.value);
}

function gotoCW(){
 GM_setValue('trip_to_CW',"1");
 var uid = document.forms.namedItem("mainForm").elements.namedItem("name");
//save uid for search
 GM_setValue('currentUID', uid.value);
 GM_log('will work with userId='+uid.value);
}



//Create/Modify User

if ((window.location.href=="http://as1.voice.dsi.ru/Group/Members/Add/index.jsp")&&(GM_getValue('trip_to_CW')!='1')){
 //set User ID
 _title = document.title;
 uid = _title.split(':')[0].trim();
 GM_log('header title contains groupId='+uid);
 olduid = document.forms.namedItem("mainForm").elements.namedItem("name");
 if (olduid.value=="") 
   olduid.value = uid+'-uid-';

 //change language
 try{
 if (document.forms.namedItem("mainForm").elements.namedItem("language")){
  var elang = document.forms.namedItem("mainForm").elements.namedItem("language");
  GM_log('found language selector, '+elang.value);
  elang.options[0].defaultSelected="false";
  elang.options[1].defaultSelected="true";    
 }
 }catch(ex){}
 

if(document.forms.namedItem("mainForm").elements.namedItem("unicodeLastName")){
 GM_log('found unicode*Name');
 e1 = document.forms.namedItem("mainForm").elements.namedItem("unicodeLastName");
 e1.addEventListener('blur',setOnBlurLast,true);
 e2 = document.forms.namedItem("mainForm").elements.namedItem("unicodeFirstName");
 e2.addEventListener('blur',setOnBlurFirst,true);
}
//Define initial password
 if(document.forms.namedItem("mainForm").elements.namedItem("echoPassword")){
  GM_log('Set initial password 121212');
  e = document.forms.namedItem("mainForm").elements.namedItem("password");
  e.value="121212";
  e = document.forms.namedItem("mainForm").elements.namedItem("echoPassword");
  e.value="121212";
 }
 //set submit handler to switch off CW 
 frmo =  document.forms.namedItem("mainForm");
 frmo.addEventListener('submit', gotoCW, true);

}



//Define Device/Address

function generatePassword(){
var pass="";
var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890abcdefghijklmnopqrstuvwxyz";
for (i=0;i<10;i++)
 pass+=chars.charAt(Math.floor(Math.random()*chars.length));
return pass;
}

//remember lineport
function storeLinePort(event){
 el=document.forms.namedItem("mainForm").elements.namedItem("deviceLinePortDomain");
 if (el.value != ""){
  GM_log('got lineport at Address page, start trip to Auth page');
  GM_setValue('lineport',el.value);
  //try to navigate to Authentication page
  GM_setValue('trip_to_auth',"1");
 }else 
  GM_log('lineport is empty, nothing to do');
}


if(document.forms.namedItem("mainForm")&&document.forms.namedItem("mainForm").elements.namedItem("deviceLinePortDomain")){
   e = document.forms.namedItem("mainForm");
   e.addEventListener('submit',storeLinePort,true);
}


//trip to Authentication page, step 1
if (window.location.href=="http://as1.voice.dsi.ru/Common/folder_contents.jsp?folder=U0&menuId=0"){
 if ('1'==GM_getValue('trip_to_auth')){
  GM_log('auth trip started');
  GM_setValue('trip_to_auth',"2");
  window.location.href="http://as1.voice.dsi.ru/User/Authentication/";
 }else GM_deleteValue('trip_to_auth');
}


//trip to Authentication page, step 2
if (window.location.href=="http://as1.voice.dsi.ru/User/Authentication/"){
 if ('2'==GM_getValue('trip_to_auth')){
  GM_deleteValue('trip_to_auth');
  GM_log('auth trip finished');

  e = document.forms.namedItem("mainForm");
  var lineport=GM_getValue('lineport');
  GM_log('Restored lineport, value ='+lineport); 
  GM_deleteValue('lineport');
  el=document.forms.namedItem("mainForm").elements.namedItem("username");
  el.value=lineport;

  var password = generatePassword();
  el=document.forms.namedItem("mainForm").elements.namedItem("newPassword");
  el.value=password;
  el=document.forms.namedItem("mainForm").elements.namedItem("newPasswordConfirm");
  el.value=password;
  GM_log('Generated password='+password);
  var frmo = document.forms.namedItem("mainForm");
  hids = document.getElementsByName("buttonClicked");
  hids[0].value = 'ok';
  btnOK= document.getElementsByName("ok");
  btnOK[0].click();
  GM_log('I click [ OK ]');
//  frmo.submit();
 }
}


//trip to CW page, step 1
if (window.location.href=="http://as1.voice.dsi.ru/Group/Members/"){
 if('1'==GM_getValue('trip_to_CW')){
 //after saving new user, we got 'search user' empty page
 //so simply click search 
 GM_setValue('trip_to_CW','2');
 GM_log('Here we see empty search user page, submitting form...');
 frmo = document.forms.namedItem("mainForm");
 hids = document.getElementsByName("buttonClicked");
 hids[0].value = 'search'; 
 btnSearch = document.getElementById("search0");
 btnSearch.click();
 GM_log('Button Search clicked.');
 }else{ 
//trip to CW page, step 1
 //after clicking [search] user, we got top 20 users
 //1)try to fing here 
 if ('2'==GM_getValue('trip_to_CW')){
  //  GM_setValue('trip_to_CW',"3");//later
  userID = GM_getValue('currentUID');

  //use XPath to find url with userID
   GM_log('looking url to user with userId='+userID);
   var result = document.evaluate(
                "//a[contains(@href, '"+userID+"')]", 
                 document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   url = result.snapshotItem(0);

   
 if(url){
  GM_log('found url: '+url.href);
  GM_setValue('trip_to_CW','3');
  window.location.href=url.href;
 }
 else{
    GM_log('url with this userID not found, try next page /*TODO*/');
    alert('Sorry, Mario, but your princess is in another castle.');
	GM_deleteValue('trip_to_CW');//tempor
 }
 }}//else GM_deleteValue('trip_to_CW');
}

//trip to CW page, step 3
if (window.location.href=="http://as1.voice.dsi.ru/Common/folder_contents.jsp?menuId=0"){
 if ('3'==GM_getValue('trip_to_CW')){
  GM_setValue('trip_to_CW','4');
  window.location.href="http://as1.voice.dsi.ru/User/CW/";
 }else GM_deleteValue('trip_to_CW');
}

//trip to CW page, step 4
if (window.location.href=="http://as1.voice.dsi.ru/User/CW/"){
 if ('4'==GM_getValue('trip_to_CW')){
  GM_setValue('trip_to_CW','5');
  el = document.forms.namedItem("mainForm").elements.namedItem("active");
  GM_log('CW is '+el.value);
  el.value="false";
  GM_log('CW set to '+el.value);
  frmo = document.forms.namedItem("mainForm");
  hids = document.getElementsByName("buttonClicked");
  hids[0].value = 'ok';
  btnOK= document.getElementsByName("ok");
  btnOK[0].click();
  GM_log('I click [ OK ]');
 }//else GM_deleteValue('trip_to_CW');
} 


//from CW (Call control Settings) to Addresses
if (window.location.href=="http://as1.voice.dsi.ru/Common/folder_contents.jsp?folder=U3&menuId=0"){
GM_log('`');
 if('5'==GM_getValue('trip_to_CW')){
  GM_deleteValue('trip_to_CW');
  GM_log('...go to Address');
  window.location.href="http://as1.voice.dsi.ru/User/Addresses14sp3/";
 }
}




