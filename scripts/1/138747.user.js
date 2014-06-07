// ==UserScript==
// @name           OKC Auto Empty Quiver
// @author         nomonkeynodeal
// @description    Automatically checks quiver and rejects all users in it.
// @include        *okcupid.com*
// @run-at         document-end
// ==/UserScript==

var emptyrate=15; //in minutes, how often to check for new quiver matches

try{  //empty on page load too
  var numquivers=0;
  numquivers=parseInt(document.body.innerHTML.match(/id="nav_matches">.*?Matches <span class="badge">(\d+?)<\/span>/)[1]);
  if(numquivers>0){ 
    emptyquiver();
    var totalnotifications=parseInt(document.getElementById("total_notifications").innerHTML);
    document.getElementById("total_notifications").innerHTML=totalnotifications-numquivers;
    if(totalnotifications-numquivers==0) document.getElementById("nav_notifications").setAttribute("class",""); //unbold zero notifications
  }
}
catch(err){
}


if(document.title.length>5) setInterval(check,20000);

function check(){
  var lastcheck=parseFloat(GM_getValue("emptylast", 0));
  var d=new Date();
  var datestr=d.getTime();
 
  if(datestr-lastcheck>=emptyrate*60000){
    GM_setValue("emptylast", datestr.toString());
      emptyquiver();
  }
}

function emptyquiver(){
  ///GM_log("Checking quiver...");
  GM_xmlhttpRequest({method:"GET",url:"http://www.okcupid.com/quiver",
    onload: function(responseDetails) {
      var quiverentries=responseDetails.responseText.match(/\/quiver\?reject=(\d+?&amp;user=.+?)"/gi); 
      //GM_log("quiverentries: "+quiverentries);
      
      for each (var entry in quiverentries){
        entry="http://okcupid.com"+entry.replace("&amp;","&");
        GM_log(entry);
        GM_xmlhttpRequest({method:"GET",url:entry});
      }
   }
  });
}