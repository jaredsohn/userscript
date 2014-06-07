// ==UserScript==
// @name            Flickr - Photo Rating
// @namespace       Joms
// @description     Rate a photo from 1 to 5 stars
// @include         http://www.flickr.com/photos/*
// @include         http://flickr.com/photos/*
// @author          -=[ Joms ]=-
// @version         1.40
// ==/UserScript==

/*
 Installation
 ------------
 This is a Greasemonkey user script. Also compatible with Chrome.

 To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey:  http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Flickr - Photo Rating" and click Uninstall.


 For Chrome, just click the Install button.
 To uninstal, type chrome://extensions in the URL then click uninstall under Flickr - Photo Rating.  
 --------------------------------------------------------------------

 Usage Instructions
 ------------------

 Changelog:
 ----------
 v1.00   2011-02-10  Initial Release
 v1.10   2011-02-14  Support for Chrome browser
 v1.20   2011-02-21  Ability to show your rating for the photo. Fixed logic in computing Photo Rating
 v1.21   2011-03-12  Fixed script due to Flickr code changes
 v1.30   2011-02-14  Support for Firefox 4.0 browser
 v1.40   2013-11-06  Support for new Flickr layout
*/

var currentPhotoId;
var currentUserID;
var responsesProcessed = 0;
var photoRating = 0;
var existingRating = 0;

function getFirefoxVersion() {
 if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
    var ffversion=new Number(RegExp.$1) // capture x.x portion and store as a number
    return ffversion;
 }
 else {
    return -1; //Browser is Chrome!
 }
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
    var photoIdElementParent = document.getElementById("main-photo-container");
    var photoId = photoIdElementParent.textContent.match(/.*flickr.com\/\d+\/(\d+)_.*/)[1];
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

function setCookie(c_name,value,exdays)
{
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
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



function getAverageRating() {
   var closestElementWithId = document.getElementById("photo");
    if (!closestElementWithId) {
        GM_log("no photo element found");
        return;
    }

    currentPhotoId = getPhotoId();
    if (!currentPhotoId) {
        GM_log("no photo id found");
        return;
    }

    var pRating = 0;
    
    try {
    
         var api_key = "01f246ecffe2b47d8c544a2e3e77e617";
         
         currentUserID = getCurrentNSID();
    
         GM_xmlhttpRequest({
                method: 'get',
       url: "http://www.flickr.com/services/rest?method=flickr.photos.comments.getList&api_key=" + api_key + "&photo_id=" + currentPhotoId + "&format=json&nojsoncallback=1",
                onload: function (responseDetails) {
                    if (responseDetails.status === 200) {
                    
                      //alert(responseDetails.responseText);
                      var response = null;
                      var comments = "";
                      var total_ratings = 0;
                      var num_ratings = 0;
                      
                      var existingRating = 0;
                      
                      
                      if (responseDetails.responseText != null)
                            response = JSON.parse(responseDetails.responseText);
                      
                      if (response != null)
                      {
                        
                        if (response.comments.comment != null)
                        {
                          
                        
                          for (i = 0; i < response.comments.comment.length; i++)
                            {
                              var comment = response.comments.comment[i]._content;
                          var start_index = comment.indexOf("Rating:");
                          var end_index = comment.lastIndexOf("\u2605");
                          
                              if ((start_index >= 0) && (end_index >= 0))
                          {
                             start_index = start_index + 7;
                           var rating = end_index - start_index;
                           if (rating > 5) rating = 5;
                           total_ratings = total_ratings + rating;
                           num_ratings = num_ratings + 1;
                  
                           if (response.comments.comment[i].author == currentUserID)
                                     {
                                        existingRating = rating;
                                     }
                          }
                            }
                          }
                        }
                        
                        var ffVersion = getFirefoxVersion();
                        
                                            
                        var styles =    ' #rateStatus{float:left; clear:both; width:100%; height:20px;} ' +
                                      ' #rateMe{float:left; clear:both; width:100%; height:auto; padding:0px; margin:0px;} ' +
                                      ' #rateMe li{float:left;list-style:none;} ' +
                                      ' #rateMe li a:hover, ' +
                                      ' #rateMe .on{background:url(http://findicons.com/files/icons/2258/addictive_flavour/48/star.png) no-repeat;} ' +
                                      ' #rateMe a{float:left;background:url(http://findicons.com/files/icons/2258/addictive_flavour/48/star_empty.png) no-repeat;width:50px; height:50px;} ' +
                                      ' #ratingSaved{display:none;} ' +
                                      ' .saved{color:red; } ';
  
                        var scripts =   'var sMax;    ' +
                                        'var holder;  ' +
                                        'var preSet;  ' +
                                        'var rated;   ' +
                                        'var msgBox = document.getElementById("message"); ' + 
  
                                      'function rating(num){ ' +
                                      ' sMax = 0; ' +
                                      ' for(n=0; n<num.parentNode.childNodes.length; n++){ ' +
                                      ' if(num.parentNode.childNodes[n].nodeName == "A"){ ' +
                                      ' sMax++; ' +
                                      ' } ' +
                                      ' } ' +
                                      
                                      ' if(!rated){ ' +
                                      ' s = num.id.replace("_", \'\'); ' +
                                      ' a = 0; ' +
                                      ' for(i=1; i<=sMax; i++){ ' +
                                      ' if(i<=s){ ' +
                                      ' document.getElementById("_"+i).className = "on"; ' +
                                      ' document.getElementById("rateStatus").innerHTML = num.title; ' +
                                      ' holder = a+1; ' +
                                      ' a++; ' +
                                      ' }else{ ' +
                                      ' document.getElementById("_"+i).className = ""; ' +
                                      ' } ' +
                                      ' } ' +
                                      ' } ' +
                                      '} ' +
                                      'function buildRating(num) { ' +
                                      ' var s = "<a href=\'http://userscripts.org/scripts/show/96917\'>Rating: "; ' +
                                      ' for (i=1; i <= num; i++) { s = s + "\\u2605"; } s = s + "</a>\\n\\n"; return s; ' +
                                      '} ' + 
                                      'function sendRate(sel) { ' +
                                      ' if (msgBox != null) ' +
                                        ' { ' +
                                      ' var num = parseInt(sel.id[1]); ' +
                                      ' if (num > 2) F.actionQueue["photo-button-bar"].toggle_fave(); ' +
                                      ' msgBox.value = buildRating(num) + sel.title; ' +
                                      ' msgBox.focus(); ' +
                                      ' rated = true; ' +
                                      ' } ' +
                                      '} ' +
                                      'function off(me){ ' +
                                      ' if(!rated){ ' +
                                      ' if(!preSet){ ' +
                                      ' for(i=1; i<=sMax; i++){ ' +
                                      ' document.getElementById("_"+i).className = ""; ' +
                                      ' document.getElementById("rateStatus").innerHTML = me.parentNode.title; ' +
                                      ' } ' +
                                      ' }else{ ' +
                                      ' rating(preSet); ' +
                                      ' document.getElementById("rateStatus").innerHTML = document.getElementById("ratingSaved").innerHTML; ' +
                                      ' } ' +
                                      ' } ' +
                                      '} ';
                           
                        if (ffVersion == -1)
                        {

                            //-------------------------------------------------------------------------------
                            //These codes were added for Chrome and Firefox 4.0 support
                            //-------------------------------------------------------------------------------
                            addGlobalStyle(styles);
                            addGlobalScript(scripts);    
                            //-------------------------------------------------------------------------------
                        }
                        
                        var favesElement = document.getElementById("photo-story-story"); 
                        var msgBox = document.getElementById("message"); 
                        var liElement = null;
                        
                        if (favesElement){
                            liElement = document.createElement("div");
                            favesElement = document.getElementById("photo-story-story");   //photo-story-stats or comments
                          liElement.className = "stat-item";
                        }
  
                        
                        if (existingRating > 0)
                        {
                          
                          liElement.innerHTML = '<hr \><div id="RatingPanel" ><p>' + 'Your Rating: ' + existingRating + '</p></div>';
                      
                        }
                        else {
                        
                          liElement.innerHTML = '<hr \><div id="RatingPanel" >' +
                            '   <span id="rateStatus">How do you rate this picture?</span> ' +
                            '   <span id="ratingSaved">Rating Saved!</span> ';
    
    
                          if (ffVersion > 0) // For Firefox browser
                          {
                              //-------------------------------------------------------------------------------
                              //These codes were added for Firefox support
                              //-------------------------------------------------------------------------------
                                liElement.innerHTML = liElement.innerHTML + 
                                '<style type="text/css"> ' + styles + '</style> ' +
                                '<script language="javascript"> ' + scripts + '</script> ';
                              //-------------------------------------------------------------------------------
                          }

                          if (ffVersion < 4) //Chrome and Firefox 3.X need these codes
                          {
                              liElement.innerHTML = liElement.innerHTML + 
                              '   <div id="rateMe" title="How do you rate this picture?"> '+
                              '     <a onclick="sendRate(this)" id="_1" title="Cool shot!"      onmouseover="rating(this)" onmouseout="off(this)" ></a> ' +
                              '     <a onclick="sendRate(this)" id="_2" title="Beautiful shot!" onmouseover="rating(this)" onmouseout="off(this)" ></a> ' +
                              '     <a onclick="sendRate(this)" id="_3" title="Good one!"       onmouseover="rating(this)" onmouseout="off(this)" ></a> ' +
                              '     <a onclick="sendRate(this)" id="_4" title="Awesome shot!"   onmouseover="rating(this)" onmouseout="off(this)" ></a> ' +
                              '     <a onclick="sendRate(this)" id="_5" title="Excellent shot!" onmouseover="rating(this)" onmouseout="off(this)" ></a> ' +
                              '   </div> ' +                        
                              '</div> ' +
                              '<hr \> '; 
                          }
                          else
                          {
                              liElement.innerHTML = liElement.innerHTML + 
                              '   <div id="rateMe" title="How do you rate this picture?"> ' + 
                              '     <script language="javascript"> ' +  //Firefox 4.X need these extra codes
                                      'function buildRating(num) { ' +
                                      ' var s = "<a href=\'http://userscripts.org/scripts/show/96917\'>Rating: "; ' +
                                      ' for (i=1; i <= num; i++) { s = s + "\\u2605"; } s = s + "</a>\\n\\n"; return s; ' +
                                      '} ' + 
                                      'function sendRate(sel) { ' +
                                      ' if (msgBox != null) ' +
                                        ' { ' +
                                      ' var num = parseInt(sel.id[1]); ' +
                                      ' if (num > 2) F.actionQueue["photo-button-bar"].toggle_fave(); ' +
                                      ' msgBox.value = buildRating(num) + sel.title; ' +
                                      ' msgBox.focus(); ' +
                                      ' rated = true; ' +
                                      ' } ' +
                                      '} ' +                              
                              '     </script> ' + 
                              '     <a onclick="sendRate(this)" id="_1" title="Cool shot!"      onmouseover="rating(this)" onmouseout="off(this)" ></a> ' +
                              '     <a onclick="sendRate(this)" id="_2" title="Beautiful shot!" onmouseover="rating(this)" onmouseout="off(this)" ></a> ' +
                              '     <a onclick="sendRate(this)" id="_3" title="Good one!"       onmouseover="rating(this)" onmouseout="off(this)" ></a> ' +
                              '     <a onclick="sendRate(this)" id="_4" title="Awesome shot!"   onmouseover="rating(this)" onmouseout="off(this)" ></a> ' +
                              '     <a onclick="sendRate(this)" id="_5" title="Excellent shot!" onmouseover="rating(this)" onmouseout="off(this)" ></a> ' +
                              '   </div> ' +                        
                              '</div> ' +
                              '<hr \> '; 
                          }
                          
                          
                        
                        }
                        
                        if (document.getElementById("RatingPanel") == null) favesElement.parentNode.insertBefore(liElement, favesElement);                          
                        
                        
                        
              
                      if (num_ratings > 0)
                      {
                            
                            
                          pRating = total_ratings / num_ratings;
              
        
                      var favesElement2 = document.getElementById("faves_p"); 
              
                      if (favesElement2) { // old layout
                     var liElement2 = document.createElement("li");
                     liElement2.className = "Stats";
                      } else {
                       liElement2 = document.createElement("div");
                       favesElement2 = document.getElementById("photo-story-story");   //photo-story-stats or comments
                      liElement2.className = "stat-item";
                      }
        
                          liElement2.innerHTML = '<div id="AveragePanel" >' + "Photo Rating: " + pRating.toPrecision(2) + '</div><hr \>';
                      if (document.getElementById("AveragePanel") == null) favesElement2.parentNode.insertBefore(liElement2, favesElement2);
        
                      }
        
                 }
                },
                onerror: function (responseDetails) {
                    alert('error');
                }
          });
      } 
      catch (e) {
            alert("exception: " + e);
      }
}




function displayRanking() {
  
  var favesElement = document.getElementById("photo-story-story");  
  
  if (favesElement != null)
  {   
    getAverageRating();  
  }
 
}


displayRanking();
                         