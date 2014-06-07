scr_meta=<><![CDATA[
// ==UserScript==
// @name Inconspicuous Nonsense
// @namespace http://www.bruhaha1234.com
// @description For DC Employees :)
// @include https://*.woot.com/Member/Order.aspx
// @include https://*.woot.com/Member/OrderConfirmation.aspx
// @include https://sslwww.woot.com/Errors/*
// @include http://www.woot.com/*
// @include http://woot.com/*
// @include https://account.woot.com/*
// @version 2.7
// ==/UserScript==
]]></>.toString();  
if (GM_getValue("cardSecurity") == undefined) {
    GM_setValue("maxPrice", 10.00);
}
if(GM_getValue("wootershappyhourwindow") == undefined){
    GM_setValue("wootershappyhourwindow", "no");
}
if(GM_getValue("happyhourwindow") == undefined){
    GM_setValue("happyhourwindow", "no");
}
if(GM_getValue("wooterswindow") == undefined){
    GM_setValue("wooterswindow", "no");
}
GM_registerMenuCommand("Reset CC Security Code & Max Price", resetCC);
if (GM_getValue("cardSecurity") == undefined) {
    resetCC();
} 

var ccSec = GM_getValue("cardSecurity");
var maxPrice = GM_getValue("maxPrice");
var wootName = new Array('Bag of Crap', 'Random Crap', 'Santa’s Sack O’ Crap');
var wootSite = 'http://www.woot.com';
var itemName;
var itemPrice;
var itemPrePrice;
var slowRefresh = 35000;
var quickRefresh = 1000;
var d = new Date();
var curr_hour = d.getHours();
var curr_min = d.getMinutes();
if (ccSec == '') alert('You did not enter the Credit Card Security Value within the Greasemonkey Script!  Also, you agree to buy anything with the name Random Crap, regardless of the price.');

if (document.location.href.match("https://account.woot.com/login"))
{
    //got to the referral page from wootalyzer, reload
    //document.location = wootSite;
    var loginForm = document.getElementsByTagName('form');
    var username = document.getElementById('username');
    var password = document.getElementById('password');

    doSignIn();
  
}


//update check
aaus_49811={i:'49811',d:1,n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_49811.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_49811.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_49811.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_49811.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_49811.ch();
 
if (document.location.href.match(/\/Errors\//))
{
    //got to the error page somehow, reload
    document.location = wootSite;
}

if (document.location.href.match("ref=wootalyzer.com"))
{
    //got to the referral page from wootalyzer, reload
    document.location = wootSite;
}

if (document.location.href.match("utm_campaign"))
{
    //got to the referral page from wootalyzer or wooters, reload
    document.location = wootSite;
}
if (document.location == "http://woot.com/")
{
    //go to the www version of the homepage
    document.location = wootSite;
}
if (document.location == "http://woot.com/happyhour")
{
    //go to the www version of the homepage
    document.location = "http://www.woot.com/happyhour";
}
if (document.location == "http://www.woot.com/default.aspx")
{
    //go to the www version of the homepage
    document.location = wootSite;
}
if (document.location == "http://www.woot.com/?ref=wootalyzer.com")
{
    //go to the www version of the homepage
    document.location = wootSite;
}

if (document.location == "http://www.woot.com/null")
{
    //go to the www version of the homepage
    document.location = wootSite;
}

if (document.location == "http://www.woot.com/")
{
    itemName = checkData();
 
}else{
  if (document.location == "http://www.woot.com/happyhour")
  {
    itemName = checkData();
  }else{
    var itemName = document.getElementsByTagName('h4')[2].innerHTML;
  }
}
             
var elements = document.getElementsByClassName('amount');
if (elements[0] == undefined)
{
    elements = document.getElementsByClassName('total');
    itemPrice = parseFloat(elements[0].innerHTML.replace(/\$/g,''));
}else{
    itemPrice = parseFloat(elements[0].innerHTML);
}
//var theForm = document.getElementById('aspnetForm');
  var theForm = document.getElementById('Form');
var doMyPostBack = function()
{
        
    if(theForm) // && wantthreebutton)
    {
    
        eventTarget.value = 'ctl00$ctl00$ContentPlaceHolderMainContent$ContentPlaceHolderSecondaryContent$BuyButton';
        eventArgument.value = '';
        theForm.submit();
        
    } else {
        alert('Could not continue for unknown reasons');
    }
}

var wantOne = document.getElementById('ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_HyperLinkWantOne');
var eventTarget = document.getElementById('__EVENTTARGET');
var eventArgument = document.getElementById('__EVENTARGUMENT');
var wantthreebutton = document.getElementById('ContentPlaceHolderMainContent_ContentPlaceHolderPrimaryContent_ShoppingCartControl_WantedThreeButton');
var cardSecurity = document.getElementById('ContentPlaceHolderMainContent_ContentPlaceHolderSecondaryContent_SecurityCodeTextBox');
                
if (checkItemName()  && itemPrice <= maxPrice)
{    

    //It's a Bag of Crap!
    try{
    
        if (wantOne == null){
            // it is a woot happy hour
            var hrefLink = document.getElementsByTagName('a');
            var hrefCtr = 0;
                            
            // find the WantOne link
            while (hrefLink[hrefCtr].getAttribute('href').substring(1,13) != "WantOne.aspx")
            {
                   hrefCtr++;
            }
            
            document.location = "http://www.woot.com/" + hrefLink[hrefCtr].getAttribute('href'); 
            
        }else{          
            //document.location = "http://www.woot.com/" + wantOne.getAttribute("href");
            if (wantOne.getAttribute("href") != null){    
                    
              var tempLoc = wantOne.getAttribute("href"); 
              var wooturlStart = tempLoc.indexOf(".woot.com"); 
              //alert(tempLoc);
              //alert('https://wine' + tempLoc.substring(wooturlStart,tempLoc.length));
              //window.open('https://wine' + tempLoc.substring(wooturlStart,tempLoc.length),'wine');
              //window.open('https://kids' + tempLoc.substring(wooturlStart,tempLoc.length),'kids');
              //window.open('https://shirt' + tempLoc.substring(wooturlStart,tempLoc.length),'shirt');  

              document.location = tempLoc;
            }else{
              setTimeout( refresh, quickRefresh );
            }
        }            
    }catch(a){
 
    }
}else{

    //Not a Bag of Crap, refresh the page depending on amount left of current item.
         
    if (document.location == "http://www.woot.com/" && document.getElementById("ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_PanelWootOff"))
    {
        
        $ = unsafeWindow.jQuery;
        
        var percent = Math.round( $('div.wootOffProgressBarValue:first').width() / $('div.wootOffProgressBar:first').width() * 100 );           
        if ( isNaN( percent ) ) setTimeout( refresh, quickRefresh );
        else setTimeout( refresh, slowRefresh );   
         
    }
    
    if (document.location == "http://www.woot.com/happyhour")
    {   
        setTimeout( refresh, slowRefresh );
        $ = unsafeWindow.jQuery;
        var percent = Math.round( $('div.wootOffProgressBarValue:first').width() / $('div.wootOffProgressBar:first').width() * 100 );
        if ( percent == 0 )
        {
            //Spam right at the beginning of a possible happy hour, just in case the isHappyHour isn't set yet
            if ( ((curr_hour == 15) && (curr_min > 57)) || ((curr_hour == 16) && (curr_min < 3)) || (unsafeWindow.isHappyHour == true) )
            {
                setTimeout( refresh, quickRefresh);
            }
            
        }
        
        if(unsafeWindow.isHappyHour == true)
        {
            //unsafeWindow.isHappyHour is a variable from woot
            //Open wooters.us tracker to increase odds of winning :-)
            if(GM_getValue("wootershappyhourwindow") == 'no')
            {
                window.open('http://www.wooters.us/tracker/single/happyhour','wootershappyhour'); 
                GM_setValue("wootershappyhourwindow", 'yes');
            }
        } 
        
    } // end happyhour refresh check 
    
    //open happy hour link if it hasn't been already
    
    /* DISABLED HAPPY HOUR, SINCE IT HASNT BEEN USED IN ONE YEAR */
    /*
    if ( ((curr_hour == 15) && (curr_min > 57)) || ((curr_hour == 17) && (curr_min < 6)) || (curr_hour == 16) )//only refresh quickly during 4pm
    {
        if(GM_getValue("happyhourwindow") == 'no')
        {
            window.open('http://www.woot.com/happyhour','happyhour'); 
            GM_setValue("happyhourwindow", 'yes');
        }
        
    }else{
        GM_setValue("happyhourwindow", 'no');
        GM_setValue("wootershappyhourwindow", 'no');
        
    }
    */
    
}


if (checkItemName() && (String(document.location).indexOf("Member/Order.aspx") > 0) && itemPrice <= maxPrice)
{      
              
    if(GM_getValue("pick3" && itemName) != 'yes')
    {
                            
        eventTarget.value = "ctl00$ctl00$ContentPlaceHolderMainContent$ContentPlaceHolderPrimaryContent$ShoppingCartControl$WantedThreeButton";
        eventArgument.value = "";
        GM_setValue("pick3" && itemName, 'yes');
        theForm.submit();
    }          
    
    cardSecurity.value = ccSec;
    doMyPostBack();
}
 
if (checkItemName() && (String(document.location).indexOf("Member/OrderConfirmation.aspx") > 0) && itemPrice <= maxPrice)
{     
    GM_setValue("pick3" && itemName, 'no');
    doMyPostBack();
    

}
 
function refresh() {
   
  document.location = document.location; 
}

function checkData(){
 //If the page failed to load properly, set refresh here
  setTimeout( refresh, slowRefresh );
 
  if (document.getElementById('ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_PanelWootOff') == null)
  {
    //not a woot off
    var itemName = document.getElementsByTagName('h2')[0].innerHTML;
    GM_setValue("wooterswindow", 'no');
    if ( ((curr_hour == 23) && (curr_min > 54)) || ((curr_hour == 0) && (curr_min < 6)) )
    {
        //start refreshing like crazy for the midnight woot!
        setTimeout( refresh, quickRefresh );
    }
 
  }else{
    //woot off
    var pageItem = document.getElementById('ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_PanelWootOff').parentNode;
    var itemName = pageItem.getElementsByTagName('h2')[0].innerHTML;
    //Open wooters.us tracker to increase odds of winning :-)
    if(GM_getValue("wooterswindow") == 'no')
    {
        window.open('http://www.wooters.us/tracker/single/woot','wooters'); 
        GM_setValue("wooterswindow", 'yes');
    }

  }
  return itemName;
}

function resetCC(){
    var ccSecNew = prompt('By using this script, you agree to buy anything with the name Random Crap, if the price is less than the value on the next form. \n\n Enter CC Security #:', GM_getValue("cardSecurity"));
    GM_setValue("cardSecurity", ccSecNew);
    
    var maxPriceNew = prompt('Maximum Price in Dollars (including shipping) you are willing to pay for a bag of crap:', GM_getValue("maxPrice"))
    GM_setValue("maxPrice", maxPriceNew);
    
    alert('Data updated.  If you ever need to change the data, right click on the greasemonkey icon (bottom right corner of the browser) and choose "User Script Commands/Reset CC Security & Max price".\n\nIf you want to auto login, HAVE FIREFOX REMEMBER YOUR USERNAME/PASSWORD!  The script will then log you in when attempting to buy the Crap!\n\nWill now attempt to open Woot Happyhour link(you will need to allow popups).');
    window.open('http://www.woot.com/happyhour','happyhour'); 
}

function doSignIn() {
	if(username.value.length && password.value.length) {
		loginForm[0].submit();
	} else { 
		window.setTimeout(doSignIn, 100);	
		
	}
} //doSignIn

function checkItemName(){

  var itemResult = false;
  for ( var i=wootName.length-1; i>=0; --i ){
    if (wootName[i] == itemName){
      itemResult = true;
    }
  }
  
  return itemResult;

}
        