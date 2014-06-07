// ==UserScript==
// @name           D2JSP_ShowGPs
// @namespace      http://dknightstudios.org
// @description    Shows a user's guild points next to their name.
// @include        http://*.d2jsp.org/topic.php*
// @include        http://*.d2jsp.org/guild.php?t=*

// @version        1.0.1
// @require        http://userscripts.org/scripts/source/74144.user.js
// ==/UserScript==

try {
	ScriptUpdater.check(101035, "1.0.1");
} catch(e) { };

GM_xmlhttpRequest({
  method:"GET",
  url:"http://dknightstudios.org/LS/gplist/Grease_Members.html",
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/html,text/xml"
    },
  onload:function(details){
    
    var membs = details.responseText;
    eval(membs);
    unsafeWindow.memberGPs = memberGPs;
    doneLoading();
  },
  onerror:function(e){
    alert("error: " + e.responseText);
    
  }
});


//alert(GM_getResourceText("users"));

function doneLoading(){
    //alert("hello");
    //var iterator = document.evaluate('//fieldset//legend//a', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    var cID;
    var x=0, y=0;
    var links = [], toGPs = [];
    var allDLs;
    var cDT, cLinks;
    
    var userDescriptions = getElementsByClassName('bc1', document);
    var allDLs = document.getElementsByTagName("dl");
    for(x = 0; x < allDLs.length; x++){
        
        cDT = allDLs[x].getElementsByTagName("dt");
        if(cDT.length == 1){
            
            cLinks = cDT[0].getElementsByTagName("a");
            if(cLinks.length == 1){
                links[y] = cLinks[0].getAttribute("href").substr(11);
                toGPs[y] = unsafeWindow.memberGPs[links[y]];
                //alert("user post found, updated links var: links[" + y + "] = " + links[y]);
                y++
            }
            
            
            if(cLinks[0] != undefined && cLinks[0].parentNode.parentNode.getElementsByTagName("table")[0] != undefined){
                if(cLinks.length == 1 && toGPs[y-1] != undefined){
                    cLinks[0]
                        .parentNode
                        .parentNode
                        .getElementsByTagName("table")[0]
                        .getElementsByTagName("tr")[0]
                        .getElementsByTagName("td")[0]
                        .innerHTML += "GPs: " + toGPs[y-1];
                }
                else if(cLinks.length == 1 && toGPs[y-1] == undefined){
                    cLinks[0]
                        .parentNode
                        .parentNode
                        .getElementsByTagName("table")[0]
                        .getElementsByTagName("tr")[0]
                        .getElementsByTagName("td")[0]
                        .innerHTML += "GPs: N/A";
                }
            }
            
            
            
        }
    }
    
}

function getElementsByClassName(classname, par){
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};
