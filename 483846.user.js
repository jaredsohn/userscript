// ==UserScript==
// @name        watchseries-online.eu - GetLinks
// @namespace   hr.frenky.GetLinks
// @include     http://www.watchseries-online.eu/*
// @version     2
// @grant       GM_log
// @grant       GM_registerMenuCommand
// @grant       GM_setClipboard
// ==/UserScript==

var allLinks;
var LST_ALLOWED_HOSTS = [];
LST_ALLOWED_HOSTS[0]="www.firedrive.com";
LST_ALLOWED_HOSTS[1]="www.sockshare.com";
LST_ALLOWED_HOSTS[2]="faststream.in";
LST_ALLOWED_HOSTS[3]="180upload.com";

window.getLinksProcessClass=function(MyClass,filterHosts){
  if (MyClass.length > 0 ) {
    for (var i=0;i<MyClass.length;i++){
      //GM_log(MyClass[i]);
      var link = MyClass[i].getElementsByTagName('a')[0]+"";
      var host_ok = false;
      //GM_log(link);
      if (filterHosts){
        for (j=0;j<LST_ALLOWED_HOSTS.length;j++){
           if (link.indexOf(LST_ALLOWED_HOSTS[j])>-1){
             host_ok = true;
             break;
           }
        }
      }else {
        host_ok = true;
      }
      if (!host_ok){
        continue;
      }else if ( allLinks == "") {
        allLinks = link;
      }else{
        allLinks = allLinks + "\n" + link;
      }
    }
  }

}

window.getLinksDoTheGet=function(filterHosts){
  allLinks="";
  GM_log("And we'r here :-)");
  var MyClassEven = document.getElementsByClassName('tdhost even');
  var MyClassOdd = document.getElementsByClassName('tdhost odd');
  if (MyClassEven.length > 0 || MyClassOdd.length > 0) {
    getLinksProcessClass(MyClassEven,filterHosts);
    getLinksProcessClass(MyClassOdd,filterHosts);
  } else {
    GM_log("MyClass is empty -- no matching class names");
  }
  GM_setClipboard(allLinks);
}

window.getLinksMain=function(){
  GM_registerMenuCommand("Get the links", getLinksDoTheGet);
  
  //GM_log("This is an example of GM_log");
  document.addEventListener('keydown', function(e) {
    // pressed Alt+Shitf+C
    if (e.keyCode == 67 && e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
      getLinksDoTheGet(true);
      //alert("Subset of links copied to clipboard!");
      window.status = "Subset of links copied to clipboard!!";
    } else if (e.keyCode == 88 && e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
      getLinksDoTheGet(false);
      //alert("All links copied to clipboard!");
      window.status = "All links copied to clipboard!!";
    }
  }, false);
  //works only if dom.disable_window_status_change=false. Default is "true"
  setTimeout('window.status = "Press Alt+Shitf+C to copy all links...";', 3000); 
}


getLinksMain();
