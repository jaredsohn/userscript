// ==UserScript==
// @name          Bloglines Sidebar Mini
// @namespace     sunyin
// @description	  Squeezes the feeds in the Bloglines side panel as much as possible.
// @include       http://*bloglines.com/myblogs_subs*

// ==/UserScript==
// Shorthand
function newNode(type) {return document.createElement(type);}
function getNode(id) {return document.getElementById(id);}

const RULES = ["a {text-decoration: none}",
               "a.cloud:link {text-decoration: none}",
               "a.cloud:active {text-decoration: none}",
               "a.cloud:hover {color:#CC3300;background-color:yellow; text-decoration: none}"
];

if (unsafeWindow.gLnk && typeof(unsafeWindow.gLnk) == "function") {
   GM_log('found gLnk ' + arguments.length);
    var oldP = unsafeWindow.gLnk;
    var thisWindow = unsafeWindow;
    
    unsafeWindow.gLnk = function(s, title, load, a1, a2, a3) {

      // Only override if it's a P(window, data) signature that we know about
      //if (arguments.length == 6) {
         GM_log('inside gLnk')
         hookData(title, load);
         //}
      oldP.apply(thisWindow, arguments);
    }
} 


 function hookData(title, load) {
    GM_log(title+' '+load)
 }


initializeStyles();

(function() {
   if (document.title != "Bloglines | My Feeds") return;
   //gTitleList = [];
   //TODO use function trap to get data



 //---------------------------------------------------
 

 //---------- squeezer part -------------------------------------------------
 // document.body.style["font"] = "x-small/1.2em Verdana, Arial, Helvetica, sans-serif;";
 var divs = document.getElementsByTagName("div");
 var menudiv = null; var tabsdiv = null


 for(i = 0; i < divs.length; i++) {
    var divclass = divs[i].getAttribute("class");
    if (divclass == "header-list")
       divs[i].style["display"] = "none";		  
    else if (divclass == "tabs") {
       tabsdiv = divs[i]; tabsdiv.id = 'tabsdiv';
    } else if (divclass == "hnav") {
       menudiv = divs[i]; menudiv.id = 'menudiv';
    } else if (divclass == "account" && menudiv != null) {
       //divs[i].parentNode.insertBefore(menudiv, divs[i]);
    }
 }
   
 var tables = document.getElementsByTagName("table");
 //tables[0].setAttribute("cellpadding", "0");
 
 var imgs = document.getElementsByTagName("img");
 for(i = 0; i < imgs.length; i++) {
    //imgs[i].setAttribute("height", "13");
 }


   //document.body.style["font"] = "x-small/1.2em Verdana, Arial, Helvetica, sans-serif;";
   var js = document.getElementsByTagName("script");
   for(i=0;i<js.length;i++){
      s = js[i].innerHTML;
      // some keywords to find the right javascript block
      idxStart = s.indexOf('cFolder = foldersTree;');
      if(idxStart<=-1)continue;                   
      s=s.substring(idxStart);
      startSymbol = 'gLnk(';
      idx = s.indexOf(startSymbol);
      if(idx<=-1)continue;
      lines=s.substring(idx+5).split(startSymbol);
      a = new Array(lines.length);
      for(j=0;j<lines.length;j++){
         line = lines[j]
            idxEnd = line.indexOf(')", "title=');
         a[j]=line.substring(0,idxEnd) ;
      }
      // end signature mark
      //idxEnd = s.indexOf('function notifier()');

      //GM_log(a.length);
      //s = '<div ';
      //"S", " airylea@凡庸人生 ", "javascript:doLoadf(3,16507398,1714505
      var Clouds = [];
      var div = newNode('span'); div.id = 'clouddiv';
      for(j=0;j<a.length;j++){
         //lines = a[j].split(',');
         idx = a[j].indexOf('javascript:doLoadf');
         label = a[j].substring(1,idx-22);
         idx2 = label.indexOf(',');
         label = label.substring(idx2+3);
         //         label = label.substring(1,label.length-1);
         //GM_log(label+':'+label.length);
         if(label.indexOf("<span class='ur'>") == -1)continue;
         lines = a[j].substring(idx).split(',');
         //GM_log(lines[0]);
         var subid = lines[1];
         var siteid = lines[2];
         var line_index = lines[0].split('(')[1];
         //s+='<a class="cloud" href=/myblogs_display?sub='+subid+'&site='+siteid;
         //s+=' target=_content>'+lines[1]+'</a>';
         var p = newNode('a');
         Clouds[line_index] = p;
         p.className ="cloud";
         //p.href= '/myblogs_display?sub='+subid+'&site='+siteid;
         p.href = 'javascript:doLoadf('+line_index+','+subid+','+siteid+')';
         label = label.replace(/\\/g,'');
	 //try to shorten the name ;
	 label = label.match(/>[^<]+</)[0];
	 label = label.slice(1,-1);
	 if (label.length >10)label = label.substr(0,10);

         //s+=' target=basefrm onclick=this.style.display="none">'+label+'</a>';
         //p.target= 'basefrm';
         p.innerHTML = ' '+label+' ';
         p.addEventListener("click", function(event){
                                    this.style.display = 'none';
                               }, true);
         div.appendChild(p);
      }
      
      //document.body.innerHTML=s+ document.body.innerHTML;
      document.body.insertBefore(div, document.body.firstChild);
      document.body.insertBefore(show_hide_span('cloud',div), document.body.firstChild);

      document.body.insertBefore(show_hide_span('menu',menudiv), document.body.firstChild);
      document.body.insertBefore(show_hide_span('tabs',tabsdiv), document.body.firstChild);

   }//end of for each js

if (unsafeWindow.doLoadf && typeof(unsafeWindow.doLoadf) == "function") {
   GM_log('found doLoadf' + arguments.length);
   var old = unsafeWindow.doLoadf;
   var thisWindow = unsafeWindow;
   unsafeWindow.doLoadf = function(index,subid,siteid){
      GM_log('wake up '+index);
      Clouds[index].style.display = 'none';
      old.apply(thisWindow, arguments);
   }
}

   
})();

function initializeStyles() {
  var styleNode = newNode("style");
  
  document.body.appendChild(styleNode);

  var styleSheet = document.styleSheets[document.styleSheets.length - 1];

  for (var i=0; i < RULES.length; i++) {
     styleSheet.insertRule(RULES[i], 0);
  }  

  GM_log(document.name);
}

function show_hide_span(id, to_show_hide){ 
   var buttonNode = newNode("span");
   buttonNode.id = id;
   buttonNode.className = 'cloud';
 
   buttonNode.addEventListener("click",
                               function(event){
				  var to_display = getNode(this.id+'div');

                                  if(to_display.style.display == 'block'){
                                     this.innerHTML = "[show "+this.id+"]";
                                     to_display.style.display = 'none';
                                     GM_setValue(id+'_show', 'false');
				  GM_log(this.id);
                                  } else {
                                     this.innerHTML = "[hide "+this.id+"]";
                                     to_display.style.display = 'block';
                                     GM_setValue(id+'_show', 'true');
				  GM_log('display'+this.id);
                                  }
                               },
                               true);
   var cloud_show =  GM_getValue(id+'_show');
   var b = to_show_hide;

   if (cloud_show == 'true') {
      buttonNode.innerHTML = "[hide "+id+"]";
      b.style.display = "block" ;
   } else {
      buttonNode.innerHTML = "[show "+id+"]";
      b.style.display = "none";
   }

   //div.appendChild(buttonNode);
   //div.appendChild(b);
   return buttonNode;
}


/*
  TODO, color-code, unread blogs first, font sizable, keep option to turn back original format
  0.8 add show/hide original tabs/menu.
  0.7 add persistent data to remember cloud status
  0.6.2 20060314 shorten the name
  0.6.1 notified when feed clicked, override doLoadf
  0.6 take out underline, show-hide cloud, highlight mouse on.
  0.5 hide mini label when clicked
  0.4 copy/paste squeezer
  0.3 update title catch up keywords, was /b, now class='ur'
  0.2 update title to match bloglines update
  0.1 prototype
  inspired by del.icio.us and bloglines sidebar squeezer
*/


