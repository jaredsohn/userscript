// ==UserScript==
// @name           	Flickr - Online Buddy
// @namespace      	Joms
// @description    	Check if your contacts were active in the last hour
// @include        	http://www.flickr.com/photos/*
// @include             http://flickr.com/photos/*
// @author              -=[ Joms ]=-
// @version       	1.0 2011-03-10
// ==/UserScript==

/*
 Installation
 ------------
 This is a Greasemonkey user script.

 To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Flickr - Online Buddy" and click Uninstall.

 --------------------------------------------------------------------

 Usage Instructions
 ------------------

 Changelog:
 ----------
 v1.0   2011-03-10  Initial Release
*/

var currentPhotoId;
var currentUserID;
var responsesProcessed = 0;
var photoRating = 0;
var existingRating = 0;
var isOnline = false; 
var setsColumnElement = null;
var mainColumnElement = null;

function getElementsByClassName( strClassName, obj ) {
    var ar = arguments[2] || new Array();
    var re = new RegExp("\\b" + strClassName + "\\b", "g");

    if ( re.test(obj.className) ) {
        ar.push( obj );
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i], ar );
    
    return ar;
}



function getCurrentNSID() {
 
    var userID_start = document.body.innerHTML.indexOf('"nsid":"'); 
    var rawNSIDText = document.body.innerHTML.substr(userID_start + 8, 20); 
    var NSID_Text = rawNSIDText.split('"')[0];
    return NSID_Text;
}


function getAPIKey() {
 
    var apiKey_start = document.body.innerHTML.indexOf('"api_key":"');
    var apiKey_end   = document.body.innerHTML.indexOf('","auth_hash"');
    var apiKey = document.body.innerHTML.substr(apiKey_start + 11, apiKey_end - apiKey_start - 11);

    return apiKey;
}



function getPhotoId() {
    photoIdElementParent = document.getElementById("photo");
    var imgElement = document.evaluate("./div[contains(@class,'photo-div')]/img", photoIdElementParent, null,
                            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var photoId = imgElement.src.match(/.*flickr.com\/\d+\/(\d+)_.*/)[1];
    return photoId;
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addGlobalScript(script) {
    var head, script_block;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script_block = document.createElement('script');
    //script_block.type = 'text';
    script_block.innerText = script;
    head.appendChild(script_block);
}

function setCookie(c_name,value,exMinutes)
{
  var exdate=new Date();
  //exdate.setDate(exdate.getDate() + exdays);
  exdate.setMinutes(exdate.getMinutes() + exMinutes);  
  var c_value=escape(value) + ((exMinutes==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++)
  {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name)
      {
      return unescape(y);
      }
    }
}

function getContactList() {
    
    try {
    
         currentUserID = getCurrentNSID();
         var api_key = "4f0e67386bf13b1bbae400eaff6b7a81"; //getAPIKey();
   
         GM_xmlhttpRequest({
                method: 'get',
		        url: "http://www.flickr.com/services/rest?method=flickr.contacts.getPublicList&api_key=" + api_key +"&user_id=" + currentUserID + "&format=json&nojsoncallback=1",
                onload: function (responseDetails) {
                    if (responseDetails.status == 200) {
                    
                        var contacts_nsid = "";
                        var contacts_name = "";
                        var response = null;
              	        
              	        if (responseDetails.responseText != null)
                            response = JSON.parse(responseDetails.responseText);
              	        
              	        
              	        if (response != null)
              	        {
                	        if (response.contacts.contact != null)
                	        {
                  	            for (i = 0; i < response.contacts.contact.length; i++)
                  	            {
                                  var contact_name = response.contacts.contact[i].username;
                                  var contact_nsid = response.contacts.contact[i].nsid;
                                  
                                  contacts_nsid = contacts_nsid + contact_nsid + "^~^";
                                  contacts_name = contacts_name + contact_name + "^~^";
                                }
                                
                                //alert(contacts_name);
                                
                                var contacts_nsid_list = contacts_nsid.split("^~^");
                                var contacts_name_list = contacts_name.split("^~^");
                                
                                var retValue = ""
                                if ((getCookie("onlineBuddy") != null) && (getCookie("onlineBuddy") != ""))
                                 setCookie("onlineBuddy","",null);
                                  
                                for (i = 0; i < response.contacts.contact.length; i++)
                                {
                                  getFavoritesList(api_key, contacts_nsid_list[i], contacts_name_list[i], i, response.contacts.contact.length-1);
                                }
                                
                            }
                        }
	                }
                },
                onerror: function (responseDetails) {
                    //alert('error');
                }
          });
      } 
      catch (e) {
            //alert("exception: " + e);
      }

}


function getFavoritesList(api_key, NSID, name, curNum, totNum) {

      try {
    
         var retValue = "";
         var min_fave_date = Math.round(new Date() / 1000) - 1800; //3600; // Current DateTime - 1 hour
         var max_fave_date = Math.round(new Date() / 1000); // Current DateTime;
         
         GM_xmlhttpRequest({
                method: 'get',
		        url: "http://www.flickr.com/services/rest?method=flickr.favorites.getPublicList&api_key=" + api_key +"&user_id=" + NSID + "&min_fave_date=" + min_fave_date + "&max_fave_date=" + max_fave_date + "&page=1&per_page=1&format=json&nojsoncallback=1",
                onload: function (responseDetails) {
                    if (responseDetails.status == 200) {
                    
                        
                    
                        var response = null;
              	        
              	        if (responseDetails.responseText != null)
                            response = JSON.parse(responseDetails.responseText);
              	        
              	        
              	        if (response != null)
              	        {
                           if (response.photos.photo.length > 0) 
                           {
                             if ((getCookie("onlineBuddy") != null) && (getCookie("onlineBuddy") != ""))
                             {
                                 //retValue = getCookie("online") + "<br><a href='http://www.flickr.com/photos/"+NSID+"'>" + name + "</a>";   
                                 retValue = getCookie("onlineBuddy") + "~^~" + name + "|||" + NSID;
                                 //retValue = getCookie("onlineBuddy") + "," + name;
                                 setCookie("onlineBuddy", retValue, 5);
                                 
                             }
                             else
                             {
                                 //retValue = "<br><a href='http://www.flickr.com/photos/"+NSID+"'>" + name + "</a>";   
                                 retValue = name + "|||" + NSID;   
                                 //retValue = name;   
                                 setCookie("onlineBuddy", retValue, 5);
                             }
                            
                             
                            
                           }
                           
                           
                        }
                        
                        if (curNum == totNum)
                        {
                          //alert("Online contact(s): \r" + getCookie("onlineBuddy"));
                          var _contacts = getCookie("onlineBuddy");
                          //alert(_contacts);
                          
                          var onlineContacts = _contacts.split("~^~");

                          //var favesElement = document.getElementById("faves_p"); 
                          //var msgBox = document.getElementById("message"); 
    
                          //if (favesElement) { // old layout
                          //  var liElement = document.createElement("li");
                          //  liElement.className = "Stats";
                          //} else {
                          //    liElement = document.createElement("div");
                          //    favesElement = document.getElementById("photo-story-stats");  
                          //  liElement.className = "stat-item";
                          //}
                          
                          var buddyElement = null;
                          var setSpaceElement = null;
                          
                          if (setsColumnElement != null)                      
                          {
                            buddyElement = document.createElement("div");
                            var aryClassElements = getElementsByClassName( 'SetSpace', document.body );  
                              
                            if (aryClassElements.length > 0)
                                setSpaceElement = aryClassElements[0];
                          }
                          else
                          if (mainColumnElement != null)  
                          {
                            buddyElement = document.createElement("td");
                          }
                          
                          
                          
                          var contacts_HTML = "";
                          
                          for (i=0; i < onlineContacts.length; i++)
                          {
                            var _buddy = onlineContacts[i].split("|||");
                            contacts_HTML = contacts_HTML + '<a href="/photos/' + _buddy[1] + '" target="_blank"><img src="http://www.flickr.com/buddyicons/' + 
                                            _buddy[1] + '.jpg" height="25px" width="25px" title="Browse photostream"/><font size="1">&nbsp;&nbsp;' + _buddy[0] + '</font></a>&nbsp;&nbsp;' +
                                            '<a href="http://www.flickr.com/mail/write/?to=' + _buddy[1] + '" target="_blank"><img src="http://cdn1.iconfinder.com/data/icons/diagona/icon/16/004.png" title="Send a message"/></a><br>'; 
                            
                          }      
                        
                          var boxHeight = onlineContacts.length * 30;
                          
                          if (boxHeight > 300) boxHeight = 300;
                     
                          
                          buddyElement.innerHTML = ' <hr/><div id="BuddyPanel" >' +
                          '   <span><font size="2" color="blue" >Your online contact(s):</font></span><br><hr/> ' +
                          '   <div style=\'overflow:auto; height:' + boxHeight + 'px; width:100%;\'>' + contacts_HTML + '</div> ' + 
                          '   <br><hr/> ' +
                          '</div>';
                          
                          if (document.getElementById("BuddyPanel") == null) //favesElement.parentNode.insertBefore(liElement, favesElement);
                          {
                            if (setsColumnElement != null)     
                            {                 
                                setsColumnElement.insertBefore(buddyElement, setSpaceElement);
                            }
                            else
                            if (mainColumnElement != null)  
                            {
                                mainColumnElement.parentNode.insertBefore( buddyElement, mainColumnElement.nextSibling );
                            }
                                                      
                          }
                      
                         
                          setCookie("onlineBuddy","",null);
                        }
                        
	                   }
                },
                onerror: function (responseDetails) {
                    //alert('error');
                }
          });
      } 
      catch (e) {
            //alert("exception: " + e);
      }
}

function displayOnlineBuddy() {
                     
  //var favesElement = document.getElementById("faves_p"); 
  //var favesElement2 = document.getElementById("photo-story-stats");  
  
  
  var aryClassElements = getElementsByClassName( 'SetsColumn', document.body );  
  
  if (aryClassElements.length > 0)
  {
    setsColumnElement = aryClassElements[0];
  }
  
  aryClassElements = getElementsByClassName( 'PhotosColumn', document.body );  

  if (aryClassElements.length > 0)
  {
    mainColumnElement = aryClassElements[0];
  }
  
  
  if ((mainColumnElement != null) || (setsColumnElement != null))
  {
        getContactList();
  }

}


displayOnlineBuddy();