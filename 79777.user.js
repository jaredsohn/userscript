// ==UserScript==
// @name           OKC Favorites' Notification
// @namespace      nomonkeynodeal
// @description    Notifies you of new favorites comments and posts
// @include        http://www.okcupid.com/relevant*
// @include        http://www.okcupid.com/journal*
// @include        https://www.okcupid.com/relevant*
// @include        https://www.okcupid.com/journal*
// ==/UserScript==

  //rate at which to check for comments in seconds
  var checkcommentrate=15;

  //rate at which to check for posts in seconds
  var checkpostrate=120;

  var newpoststr="POST";
  var newcommentstr="COMMENT";
  var newactivitystr="ACTIVITY";
  var debug=false;
  
//----------------------------------------------
var lastcommentid, startpost;

lastcommentid=GM_getValue("lastcommentid");

var journalsbyfilter=GM_getValue("OKCfilteredjournals","").split(",");

function runscript(){

  var bettertitles="document.title=document.title.replace('OkCupid | ','');";

  GM_registerMenuCommand("-------okcfavnotif-------", function(){});

  GM_registerMenuCommand("Setup journal filter", function() {
    var newjournals=prompt("Don't alert me when a favorite comments on a journal by these users:",GM_getValue("OKCfilteredjournals","tidesofblue,gretagarbo9,sethwantsagirl"))
    GM_setValue("OKCfilteredjournals", newjournals);
    location.reload(true);
  });
 

  document.body.appendChild(document.createElement("script")).innerHTML=bettertitles+"var originaltitle=document.title; document.body.setAttribute('onFocus','document.title= originaltitle;nu=0;');document.body.setAttribute('onmouseover','document.title=originaltitle;nu=0;');";

  //restore saved title
  var tabtitle=GM_getValue("OKCautocheckfavstitle");
  if(tabtitle!=""){ //show updated title
    document.title=tabtitle;
    GM_setValue("OKCautocheckfavstitle", "");
    unsafeWindow.nu=GM_getValue("numupdates",0);
  }else{ //if no updates
    unsafeWindow.nu=0;
    GM_setValue("numupdates",0);
  }
}

//checks comments
unsafeWindow.checkcpage = function ccp(){        

if(debug) GM_log("checkcpage");
if(debug) GM_log("unsafeWindow.nu="+unsafeWindow.nu);

  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){ 
    if(xhr.readyState == 4 && xhr.status == 200){
      
      var t=xhr.responseText;
      var currentcomment=t.match(/<a class="readmore" href="profile\/(.+)\/journal\/\d+#(\d+)">Read more/);
      var tolastknowncomment=t.substring(t.indexOf(lastcommentid),t.indexOf(currentcomment[2])+20);
      var numcomments=tolastknowncomment.split("<p class=\"commented\">Commented on").length-1;
     
      if(numcomments>0){

        if(journalsbyfilter.indexOf(currentcomment[1])==-1){ //if new comment
          
          if(debug) GM_log(numcomments+" new comments found");
          
          unsafeWindow.nu+=numcomments;
          GM_setValue("numupdates", unsafeWindow.nu);
                          
          if(document.title.indexOf(newpoststr)==-1 && document.title.indexOf(newactivitystr)==-1){
            document.title=newcommentstr+" ("+unsafeWindow.nu+")";
          }else if(document.title.indexOf(newpoststr)!=-1){
            document.title=newactivitystr+" ("+unsafeWindow.nu+")";
          }
          
          //save title and reload to get new comments
          if(location.href=="http://www.okcupid.com/relevant?comments=1"){
            GM_setValue("OKCautocheckfavstitle", document.title);
            location.reload(true);
          }
        }
        
        lastcommentid=currentcomment[2];
        GM_setValue("lastcommentid", currentcomment[2]);

      }
    }
  }; 

  xhr.open("GET", "http://www.okcupid.com/relevant?comments=1", "true"); 
  xhr.send(null); 
}

//checks posts
unsafeWindow.checkppage = function cpp(){        
  if(debug) GM_log("checkppage");
  xhrp = new XMLHttpRequest();
  xhrp.onreadystatechange = function(){ 
    if(xhrp.readyState == 4 && xhrp.status == 200){

      var currentpost=xhrp.responseText.match(/<a class="readmore" href="\/profile\/.+\/journal\/(\d+)\/.*">Read more/)[1];

      if(startpost==null){startpost=currentpost;}
      //GM_log(currentpost);
      if(currentpost!=startpost){ //if new post
        
        if(debug) GM_log("new post");
        unsafeWindow.nu++//=startpost-currentpost;
        GM_setValue("numupdates", unsafeWindow.nu);
        
        if(document.title.indexOf(newcommentstr)==-1 && document.title.indexOf(newactivitystr)==-1){
          document.title=newpoststr+" ("+unsafeWindow.nu+")";
        }else if(document.title.indexOf(newcommentstr)!=-1){
          document.title=newactivitystr+" ("+unsafeWindow.nu+")";
        }
        
        if(location.href=="http://www.okcupid.com/relevant?posts=1"){
          GM_setValue("OKCautocheckfavstitle", document.title);
          location.reload(true);
        }
        
        startpost=currentpost;
      }
      
    }
  }; 

  xhrp.open("GET", "http://www.okcupid.com/relevant?posts=1", "true"); 
  xhrp.send(null); 
}

function check(){
  var lastcheck=parseFloat(GM_getValue("checklast", 0));
  var lastcheckpost=parseFloat(GM_getValue("checklastpost", 0));
 
  var d=new Date();
  var datestr=d.getTime();
 

  if(datestr-lastcheck>=checkcommentrate*1000){
    GM_setValue("checklast", datestr.toString());
    unsafeWindow.checkcpage();
  }
  
  if(datestr-lastcheckpost>=checkpostrate*1000){
    //GM_log("checking");
    GM_setValue("checklastpost", datestr.toString());
    unsafeWindow.checkppage();
  }
}

//prevent script from running twice on load
var lastrunscript=parseFloat(GM_getValue("lastrunscript", 0));
var d=new Date();
var datestr=d.getTime();
var launchok=true;
if((datestr-lastrunscript>=1000) && launchok){
  GM_setValue("lastrunscript", datestr.toString());
  launchok=false;
  runscript();
}


setInterval(check,1000);

//setInterval("checkcpage();",checkcommentrate*1000);
//setInterval("checkppage();",checkpostrate*1000);
