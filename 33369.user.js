// ==UserScript==
// @name           Pretty Newz
// @namespace      www.sippo.dk/gMonkey/pretty_newz.js
// @description    Make Newz.dk pretty
// @include        http://*.newz.dk/*
// @include        http://newz.dk/*
// @exclude       http://openx.newz.dk/*
// ==/UserScript==

//instillinger

{
var brug_settings_menu = true ; //Viser et lille link i toppen af venstre side, klik på det for at få en mune med instillinger i. Cookies skal være slået til.

var skjul_bannere = false; //skjul de tre bannere og de tomme pladser de efterlader. vær opmærksom på at newz.dk tjener deres penge ved at vise disse bannere.
    var top_margin = 10; // hvor meget plads der skal være mellem toppen af browseren og selve siden (i pixels)

// Henter nyheder fra RSS Feeds og sætter dem ind i deres egen tab menu
   var rss_newz = true ;
   var rss_macnation = true ;
   var rss_railgun = true ;
   var rss_filmz = true ; //jeg kan godt lide filmz :D
   
// Ting der skal skjules:
var skjul_nyhedsoversigt = false ;
var skjul_tilmeld_nyhedsbrev = false;
var skjul_soeg = false; 				//skjul søge feltet
var skjul_log_på = false; 			// skjul loginfelt
var skjul_egen_brugerinfo = false ; 	// skjuler din egen brugerinfo når du er logget på.
var skjul_konkurence = false;   	//Skjul konkurence feltet
var skjul_afstemning = false;   	//Skjul Afstemning feltet
var skjul_indsend_nyhed = false;		//skjul Indsend nyhed feltet
}

//ReverseBool
function revBool(b) {
   if (b) {
   
      a = false ;
   } else {
      a = true ;
   }
   return a ;
}

  
// Seperate nyheder med rss   
   if (rss_newz || rss_railgun || rss_macnation || rss_filmz) {
   // get rss cookies hvis bruger menu
   if (brug_settings_menu) { 
   
{


if (!getCookie('rssNewz') == '') {
   if (getCookie('rssNewz') == 'true') {
		rss_newz = true ;
	} else {
      rss_newz = false ;
	}
}

if (!getCookie('rssRailgun') == '') {
   if (getCookie('rssRailgun') == 'true') {
		rss_railgun = true ;
	} else {
      rss_railgun = false ;
	}
}
if (!getCookie('rssMacnation') == '') {
   if (getCookie('rssMacnation') == 'true') {
		rss_macnation = true ;
	} else {
      rss_macnation = false ;
	}
}
if (!getCookie('rssFilmz') == '') {
   if (getCookie('rssFilmz') == 'true') {
		rss_filmz = true ;
	} else {
      rss_filmz = false ;
	}
}

}

 
   }

 function getActiveRss() {
         rstr = ''
         if (rss_filmz) {rstr = 'filmz'}
         if (rss_macnation) {rstr = 'macnation'}
         if (rss_railgun) {rstr = 'railgun'}
         if (rss_newz) {rstr = 'newz'}
         return rstr ; 
      };

      lastRss = 'newz' ;
      pageUrl = window.location.href ;
      if (pageUrl.indexOf('macnation.newz.dk')>-1) {
         lastRss = 'macnation' ;
         pageUrl = 'macnation' ;
      } else if (pageUrl.indexOf('railgun.newz.dk')>-1) {
         lastRss = 'railgun' ;
         pageUrl = 'railgun' ;
      } else {
         lastRss = 'newz' ;
         pageUrl = 'newz' ;
      }

      //alert(lastRss);
      activeRssFeeds = 0 ;
      if (rss_newz) {activeRssFeeds++} ;
      if (rss_railgun) {activeRssFeeds++} ;
      if (rss_macnation) {activeRssFeeds++} ;
      if (rss_filmz) {activeRssFeeds++} ;
  
      if (lastRss =='newz' && !rss_newz) {
         lastRss = getActiveRss() ;
      }
      if (lastRss =='railgun' && !rss_railgun) {
         lastRss = getActiveRss() ;
      }
      if (lastRss =='macntaion' && !rss_macntaion) {
         lastRss = getActiveRss() ;
      }
      if (lastRss =='filmz' && !rss_filmz) {
         lastRss = getActiveRss() ;
      }   


   
      rssContainer = document.createElement('div') ;
      rssContainer.setAttribute('id','rssContainer') ;
      rssContainer.innerHTML = '<div id="rssTitle" style="padding-top:4px; padding-left:10px; font-size: 15px;color:#ffffff; height:35px;">Rss Nyheder</div>' ;
      rssContainer.style.width = "300px" ;
      rssContainer.style.marginBottom = "0px" ;
      if (pageUrl == 'newz') {
         rssContainer.style.backgroundImage= "url(gfx/default/bg_h3.png)" ;
      }
      if (pageUrl == 'railgun') {
         rssContainer.style.backgroundImage= "url(gfx/railgun/bg_h3.png)" ;
      }
      if (pageUrl == 'macnation') {
         rssContainer.style.backgroundImage= "url(gfx/macnation/bg_h3.png)" ;
      }
 
      rssContainer.stylebackgroundAttachment= "fixed" ;
      rssContainer.stylebackgroundPosition= "top" ;

      rssContainer.style.backgroundRepeat="repeat-x" ;
      if (activeRssFeeds > 1) {
         
         selecterWidth = 0 ;
         if (rss_newz) {selecterWidth++} ;
         if (rss_railgun) {selecterWidth++} ;
         if (rss_macnation) {selecterWidth++} ;
         if (rss_filmz) {selecterWidth++} ;
         selecterWidth = 300 / selecterWidth;


     
      //alert('1:'+ getCookie('lastRss'));

    
      rssSelecter = document.createElement('div') ;
      rssSelecter.setAttribute('id','rssSelecter') ;
      selecterImg = '' ;
     
         if (rss_newz) {selecterImg = selecterImg+'<img style="height:25px; width:'+(selecterWidth +'')+'px;" src="gfx/default/sections/newz.dk_bg.png" alt="" />'} ;
         if (rss_railgun) {selecterImg =selecterImg+ '<img style="height:25px; width:'+(selecterWidth +'')+'px;" src="http://newz.dk/gfx/default/sections/railgun_bg.png" alt="" />'} ;
         if (rss_macnation) {selecterImg =selecterImg+ '<img style="height:25px; width:'+(selecterWidth +'')+'px;" src="gfx/default/sections/macnation_bg.png" alt="" />'} ;
         if (rss_filmz) {selecterImg = selecterImg+'<img style="height:25px; width:'+(selecterWidth +'')+'px;" src="http://filmz.dk/gfx/menu-bg-selected.gif" alt="" />'} ;
      
         whitebarColor = '#3583d8' ;
      
         if (lastRss == 'newz') {whitebarColor ='#3583d8' };
         if (lastRss == 'railgun'){ whitebarColor ='#aec416' };
         if (lastRss == 'macnation'){ whitebarColor ='#7b7b7b' };
         if (lastRss == 'filmz') { whitebarColor ='#a90003' };
      
         selecterImg = selecterImg + '<div id="rssSelecterWhitebar" style="background-color:'+whitebarColor+';position:absolute;z-index:99; margin-top:-29px; height:5px; width:300px; ">' +
                                  '</div>\n' ;

      rssDivColor = '#ffffff' ;
      
      if (rss_newz) {
         if (!(lastRss == 'newz')) { rssDivColor ='dbe6c4;' } else { rssDivColor ='ffffff;' } ;
         selecterImg = selecterImg + '<div id="rssNewzDiv" style="float:left; text-align:center; cursor:pointer; top:-20px; font-size:13px; color:#'+rssDivColor+' width:'+(selecterWidth +'')+'px; position:relative;"'+
         'onclick="javascript:';
         if (rss_newz) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssNewz\').style.display = \'block\';'+
         'document.getElementById(\'rssNewzDiv\').style.color = \'#ffffff\';';
         }
         if (rss_railgun) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssRailgun\').style.display = \'none\';'+
         'document.getElementById(\'rssRailgunDiv\').style.color =\'#dbe6c4\';';
         }
         if (rss_macnation) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssMacnation\').style.display = \'none\';'+
         'document.getElementById(\'rssMacnationDiv\').style.color = \'#dbe6c4\';';
         }
         if (rss_filmz) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssFilmz\').style.display = \'none\';'+
         'document.getElementById(\'rssFilmzDiv\').style.color = \'#dbe6c4\';' ;
         }
         selecterImg = selecterImg +
         'document.getElementById(\'rssSelecterWhitebar\').style.backgroundColor = \'#3583d8\';'+
         'setCookie(\'lastRss\',\'newz\');'+
         '">newz.dk</div>\n' 
      };
      
      if (rss_railgun) {
         if (!(lastRss == 'railgun')) { rssDivColor ='dbe6c4;' } else { rssDivColor ='ffffff;' } ;
         selecterImg = selecterImg + '<div id="rssRailgunDiv" style="float:left;text-align:center;cursor:pointer; top:-20px; font-size:13px; color:#'+rssDivColor+' width:'+(selecterWidth +'')+'px; position:relative;"'+
         'onclick="javascript:';
         if (rss_newz) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssNewz\').style.display = \'none\';'+
         'document.getElementById(\'rssNewzDiv\').style.color = \'#dbe6c4\';';
         }
         if (rss_railgun) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssRailgun\').style.display = \'block\';'+
         'document.getElementById(\'rssRailgunDiv\').style.color =\'#ffffff\';';
         }
         if (rss_macnation) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssMacnation\').style.display = \'none\';'+
         'document.getElementById(\'rssMacnationDiv\').style.color = \'#dbe6c4\';';
         }
         if (rss_filmz) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssFilmz\').style.display = \'none\';'+
         'document.getElementById(\'rssFilmzDiv\').style.color = \'#dbe6c4\';';
         }
         selecterImg = selecterImg +
         'document.getElementById(\'rssSelecterWhitebar\').style.backgroundColor = \'#aec416\';'+
         'setCookie(\'lastRss\',\'railgun\');'+
         '">Railgun</div>\n' 
      };
      
      if (rss_macnation) {
         if (!(lastRss == 'macnation')) { rssDivColor ='dbe6c4;' } else { rssDivColor ='ffffff;' } ;
         selecterImg = selecterImg + '<div id="rssMacnationDiv" style="float:left;text-align:center;cursor:pointer; top:-20px; font-size:13px; color:#'+rssDivColor+' width:'+(selecterWidth +'')+'px; position:relative;"'+
         'onclick="javascript:';
         if (rss_newz) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssNewz\').style.display = \'none\';'+
         'document.getElementById(\'rssNewzDiv\').style.color = \'#dbe6c4\';';
         }
         if (rss_railgun) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssRailgun\').style.display = \'none\';'+
         'document.getElementById(\'rssRailgunDiv\').style.color =\'#dbe6c4\';';
         }
         if (rss_macnation) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssMacnation\').style.display = \'block\';'+
         'document.getElementById(\'rssMacnationDiv\').style.color = \'#ffffff\';';
         }
         if (rss_filmz) {
         selecterImg = selecterImg +
         'document.getElementById(\'rssFilmz\').style.display = \'none\';'+
         'document.getElementById(\'rssFilmzDiv\').style.color = \'#dbe6c4\';';
         }
         selecterImg = selecterImg +
         'document.getElementById(\'rssSelecterWhitebar\').style.backgroundColor = \'#7b7b7b\';'+
         'setCookie(\'lastRss\',\'macnation\');'+
         '">MacNation</div>\n' 
      };
      
      if (rss_filmz) {
         if (!(lastRss == 'filmz')) {rssDivColor ='dbe6c4;' } else { rssDivColor ='ffffff;' } ;
         selecterImg = selecterImg + '<div id="rssFilmzDiv" style="float:left;text-align:center; cursor:pointer; top:-20px; font-size:13px; color:#'+rssDivColor+' width:'+(selecterWidth +'')+'px; position:relative;"'+
         'onclick="javascript:' ;
         if (rss_newz) {
            selecterImg = selecterImg +
            'document.getElementById(\'rssNewz\').style.display = \'none\';'+
            'document.getElementById(\'rssNewzDiv\').style.color = \'#dbe6c4\';';
         }
         if (rss_railgun) {
            selecterImg = selecterImg +
            'document.getElementById(\'rssRailgun\').style.display = \'none\';'+
            'document.getElementById(\'rssRailgunDiv\').style.color =\'#dbe6c4\';';
         }
         if (rss_macnation) {
            selecterImg = selecterImg +
            'document.getElementById(\'rssMacnation\').style.display = \'none\';'+
            'document.getElementById(\'rssMacnationDiv\').style.color = \'#dbe6c4\';';
         }
         if (rss_filmz) {
            selecterImg = selecterImg +
            'document.getElementById(\'rssFilmz\').style.display = \'block\';'+
            'document.getElementById(\'rssFilmzDiv\').style.color = \'#ffffff\';';
         }
         selecterImg = selecterImg +
         'document.getElementById(\'rssSelecterWhitebar\').style.backgroundColor = \'#a90003\';'+
         'setCookie(\'lastRss\',\'filmz\');'+
         '">Film<span style="color: rgb(233, 0, 0);">z</span></div>\n' 
      };
      
         rssSelecter.innerHTML = selecterImg ;
         rssSelecter.style.height = "25px" ;
         rssSelecter.style.marginBottom = "10px" ;
         rssSelecter.style.marginTop = "-10px" ;      
         rssContainer.appendChild(rssSelecter) ;
      }
      //Inset -Newz- Rss Feeds
      //alert('2:' +getCookie('lastRss'));
      if (rss_newz) {
         rssNewzDiv = document.createElement('div') ;
         rssNewzDiv.setAttribute('id','rssNewz') ;
         rssNewzDiv.className= "indexsection ui-tabs-panel" ;
         rssNewzDiv.style.top = "-15px" ;
         if (!(lastRss == 'newz')) {rssNewzDiv.style.display = "none" }; 
         rssNewzDiv.innerHTML = '<ul>'+
                                 '<li><img src="/gfx/newz.dk.icon.png" alt="(N)" title="Newz Rss" height="12" width="12">Loading Rss Feed</li>'+
                                 '</ul><br />\n'
                                 ;     
         rssContainer.appendChild(rssNewzDiv) ;
      }
      //Inset -Railgun- Rss Feeds
      if (rss_railgun) {
         rssNewzDiv = document.createElement('div') ;
         rssNewzDiv.setAttribute('id','rssRailgun') ;
         rssNewzDiv.className= "indexsection ui-tabs-panel" ;
         rssNewzDiv.style.top = "-15px" ;
         if (!(lastRss == 'railgun')) {rssNewzDiv.style.display = "none" }; 
         rssNewzDiv.innerHTML = '<ul>'+
                                 '<li><img src="/gfx/railgun.icon.png" alt="(R)" title="Railgun Rss" height="12" width="12">Loading Rss Feed</li>'+
                                 '</ul><br />\n'
                                 ;
         rssContainer.appendChild(rssNewzDiv) ;
      }
      
     //Inset -Macnation- Rss Feeds
      if (rss_macnation) {
         rssNewzDiv = document.createElement('div') ;
         rssNewzDiv.setAttribute('id','rssMacnation') ;
         rssNewzDiv.className= "indexsection ui-tabs-panel" ;
         rssNewzDiv.style.top = "-15px" ;
         if (!(lastRss == 'macnation')) {rssNewzDiv.style.display = "none" }; 
         rssNewzDiv.innerHTML = '<ul>'+
                                 '<li><img src="/gfx/macnation.icon.png" alt="(M)" title="Macnation Rss" height="12" width="12">Loading Rss Feed</li>'+
                                 '</ul><br />\n'
                                 ;
         rssContainer.appendChild(rssNewzDiv) ;
      }
     
     //Inset -Filmz- Rss Feeds
      if (rss_filmz) {
         rssNewzDiv = document.createElement('div') ;
         rssNewzDiv.setAttribute('id','rssFilmz') ;
         rssNewzDiv.className= "indexsection ui-tabs-panel" ;
         rssNewzDiv.style.top = "-15px" ;
         if (!(lastRss == 'filmz')) {
            rssNewzDiv.style.display = "none" 
         }; 
         rssNewzDiv.innerHTML = '<ul>'+
                                 '<li><img src="http://filmz.dk/favicon.ico" alt="F" title="Filmz Rss" height="12" width="12">Loading Rss Feed</li>'+
                                 '</ul><br />\n'
                                 ;
         rssContainer.appendChild(rssNewzDiv) ;

      }
     
      
    insertDiv = document.getElementById('sweeplist') ;
      if (insertDiv != null) {
         insertDiv.parentNode.insertBefore(rssContainer, insertDiv);
      }
    //alert('3:'+getCookie('lastRss'));
    
   //fetch Rss
   if (rss_newz){
         GM_xmlhttpRequest({
         method:'GET', url: 'http://newz.dk/rss', 
         headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3','Accept': 'application/atom+xml,application/xml,text/xml', 
         },    
         onload: function(responseDetails) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
            var entries = dom.getElementsByTagName('item');
            var title;
            var link;
            
            document.getElementById('rssNewz').getElementsByTagName('ul')[0].innerHTML = '' ;
            for (var i = 0; i < entries.length; i++) {
               //alert(title);
               title = entries[i].getElementsByTagName('title')[0].textContent;
               link =  entries[i].getElementsByTagName('link')[0].textContent;
               document.getElementById('rssNewz').getElementsByTagName('ul')[0].innerHTML = document.getElementById('rssNewz').getElementsByTagName('ul')[0].innerHTML + '\n<li><img src="/gfx/newz.dk.icon.png" alt="(N)" title="'+title+'" height="12" width="12"><a onclick="javascript:setCookie(\'lasrRss\',\'newz\');" href="'+link+'">'+title+'</a></li>\n' ;
            }
         }
         })
    }
   if (rss_railgun) {
         GM_xmlhttpRequest({
         method:'GET', url: 'http://railgun.newz.dk/rss/', 
         headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3','Accept': 'application/atom+xml,application/xml,text/xml', 
         },    
         onload: function(responseDetails) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
            var entries = dom.getElementsByTagName('item');
            var title;
            var link;
            
            document.getElementById('rssRailgun').getElementsByTagName('ul')[0].innerHTML = '' ;
            for (var i = 0; i < entries.length; i++) {
               //alert(title);
               title = entries[i].getElementsByTagName('title')[0].textContent;
               link =  entries[i].getElementsByTagName('link')[0].textContent;
               document.getElementById('rssRailgun').getElementsByTagName('ul')[0].innerHTML = document.getElementById('rssRailgun').getElementsByTagName('ul')[0].innerHTML + '\n<li><img src="/gfx/railgun.icon.png" alt="(R)" title="'+title+'" height="12" width="12"><a onclick="javascript:setCookie(\'lasrRss\',\'railgun\');"  href="'+link+'">'+title+'</a></li>\n' ;
            }
         }
         })
    }
   if (rss_macnation){
         GM_xmlhttpRequest({
         method:'GET', url: 'http://macnation.newz.dk/rss/', 
         headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3','Accept': 'application/atom+xml,application/xml,text/xml', 
         },    
         onload: function(responseDetails) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
            var entries = dom.getElementsByTagName('item');
            var title;
            var link;
            
            document.getElementById('rssMacnation').getElementsByTagName('ul')[0].innerHTML = '' ;
            for (var i = 0; i < entries.length; i++) {
               //alert(title);
               title = entries[i].getElementsByTagName('title')[0].textContent;
               link =  entries[i].getElementsByTagName('link')[0].textContent;
               document.getElementById('rssMacnation').getElementsByTagName('ul')[0].innerHTML = document.getElementById('rssMacnation').getElementsByTagName('ul')[0].innerHTML + '\n<li><img src="/gfx/macnation.icon.png" alt="(M)" title="'+title+'" height="12" width="12"><a  onclick="javascript:setCookie(\'lasrRss\',\'macnation\');"href="'+link+'">'+title+'</a></li>\n' ;
            }
         }
         })
   }
   if (rss_filmz){
         GM_xmlhttpRequest({
         method:'GET', url: 'http://filmz.dk/rss/', 
         headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3','Accept': 'application/atom+xml,application/xml,text/xml', 
         },    
         onload: function(responseDetails) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
            var entries = dom.getElementsByTagName('item');
            var title;
            var link;
            
            document.getElementById('rssFilmz').getElementsByTagName('ul')[0].innerHTML = '' ;
            for (var i = 0; i < entries.length; i++) {
               title = entries[i].getElementsByTagName('title')[0].textContent;
               link =  entries[i].getElementsByTagName('link')[0].textContent;
               document.getElementById('rssFilmz').getElementsByTagName('ul')[0].innerHTML = document.getElementById('rssFilmz').getElementsByTagName('ul')[0].innerHTML + '\n<li><img src="http://filmz.dk/favicon.ico" alt="(F)" title="'+title+'" height="12" width="12"><a onclick="javascript:setCookie(\'lasrRss\',\'filmz\');" href="'+link+'">'+title+'</a></li>\n' ;
            }
         }
         })
   }
    
}


// Set ArrId on brugerInfoId, soegId, nyhedsBrevId
{

brugerInfoId, soegId, nyhedsBrevId


var brugerInfoId = -1 ;
var soegId = -1 ;
var nyhedsBrevId = -1 ;
var indsendId = -1 ; 
var topAdId = -1;

//document.getElementsByTagName('a')[20].style.display='none';  Indsend nyhed

var arrA = document.getElementsByTagName("a");
for (i = 0; i < arrA.length; i++) { 
   if (arrA[i].className == "news_submit") {
      indsendId = i ;
   }
}
var arrDiv = document.getElementsByTagName("div");
for (i = 0; i < arrDiv.length; i++) { 
   if (arrDiv[i].className == "user_navigation") {
      brugerInfoId = i ;
   }
   if (arrDiv[i].className == "newsletter robots-nocontent") {
      nyhedsBrevId = i ;
   }
   
   if (arrDiv[i].className == "search robots-nocontent") {
      soegId = i ;
   }
   if (arrDiv[i].className == "ad_930x180 robots-nocontent") {
      topAdId = i ;
   }
}


}


if (brug_settings_menu) {
//visSøg

// get skjul cookie
{
if (!getCookie('hideBanner') == '') {
   if (getCookie('hideBanner') == 'true') {
		skjul_bannere = true ;
	} else {
      skjul_bannere = false ;
	}
}

if (!getCookie('visSoeg') == '') {
   if (getCookie('visSoeg') == 'true') {
		skjul_soeg = false ;
	} else {
      skjul_soeg = true ;
	}
}
//visLog
if (!getCookie('visLog') == '') {
   if (getCookie('visLog') == 'true') {
		skjul_log_på = false ;
	} else {
      skjul_log_på = true ;
	}
}
//visBruger
if (!getCookie('visBruger') == '') {
   if (getCookie('visBruger') == 'true') {
		skjul_egen_brugerinfo = false ;
	} else {
      skjul_egen_brugerinfo = true ;
	}
}
//visInd
if (!getCookie('visInd') == '') {
   if (getCookie('visInd') == 'true') {
		skjul_indsend_nyhed = false ;
	} else {
      skjul_indsend_nyhed = true ;
	}
}
//visKon
if (!getCookie('visKon') == '') {
   if (getCookie('visKon') == 'true') {
		skjul_konkurence = false ;
	} else {
      skjul_konkurence = true ;
	}
}
//visNyhed
if (!getCookie('visNyhed') == '') {
   if (getCookie('visNyhed') == 'true') {
		skjul_nyhedsoversigt = false ;
	} else {
      skjul_nyhedsoversigt = true ;
	}
}
//visPoll
if (!getCookie('visPoll') == '') {
   if (getCookie('visPoll') == 'true') {
		skjul_afstemning = false ;
	} else {
      skjul_afstemning = true ;
	}
}
//visNL
if (!getCookie('visNL') == '') {
   if (getCookie('visNL') == 'true') {
		skjul_tilmeld_nyhedsbrev = false ;
	} else {
      skjul_tilmeld_nyhedsbrev = true ;
	}
   
   
}
}

  


//settings menu

	
   setDiv = document.createElement('div') ;
	setDiv.setAttribute('id','settingsDiv') ;
	setDiv.style.position = 'absolute' ;
	setDiv.style.top = '0px' ;
	setDiv.style.left = '0px' ;
   setDiv.style.textAlign = 'left' ;
 	setDiv.style.zIndex = '999' ;
	setDiv.style.marginTop = '0px' ;
	setDiv.style.marginLeft = '0px' ;
  
   
	
   
   
	setDiv.innerHTML = '<a href="#" onclick="if (document.getElementById(\'settingsContainer\').style.display == \'none\') {'+
                     'document.getElementById(\'settingsContainer\').style.display=\'block\' ;}else{'+
                     'document.getElementById(\'settingsContainer\').style.display=\'none\' ;};" '+
                  'style="color:#ffffff;">Settings>></a><br />\n'+
                  '<div id="settingsContainer" style="display:none; color:#00000; background-color:#ffffff; border:solid black 3px;">'+
						'<b>Skjul Ting:</b>'+
                  '<ul>'+
                  
                  
                  '<li>&middot;Skjul Bannere:<input id="bannerCheck" type="checkbox" value="banner" checked="true" onclick="javascipt:if (this.checked == true) {'+
						'if (confirm(\'Du har valgt at skjule bannerne. Newz.dk har bannere for at kunne tjæne penge til at køre deres fantastiske side\\ner du sikker på du vil skjule bannerne?\') == true){'+
                     'document.getElementsByTagName(\'div\')['+topAdId+'].style.zIndex=\'0\';'+
                     'document.getElementsByTagName(\'div\')['+topAdId+'].style.width=\'0px\';'+
                     'document.getElementById(\'wrapper\').style.marginTop=\'-'+((200-top_margin)+'')+'px\';'+
                     'document.getElementById(\'container\').getElementsByTagName(\'div\')[1].style.display=\'none\';'+
                     'for (i = 0; i < document.getElementsByTagName(\'iframe\').length; i++) {'+
                        'document.getElementsByTagName(\'iframe\')[i].src=\'\' ;'+
                        'document.getElementsByTagName(\'iframe\')[i].style.height=\'0px\';'+
                        'document.getElementsByTagName(\'iframe\')[i].style.display=\'none\'}'+
                  'setCookie(\'hideBanner\',true,365)}'+
                  'else{this.checked = false}'+
                  '}else{'+
                  'setCookie(\'hideBanner\',false,365);'+
                     'if (confirm(\'Bannerne kan først vises når siden genindlæses\\nGenindlæs nu?\') == true){'+
                     'window.location.reload()}}'+
                  ';" /></li>\n'+
                  
                  
                  '<li>&middot;Vis Søg:<input id="soegCheck" type="checkbox" value="soeg" checked="true" onclick="javascipt:if (this.checked == true) {'+
						'document.getElementsByTagName(\'div\')['+(soegId +'')+'].style.display=\'block\';'+
                  'setCookie(\'visSoeg\',true,365);} else{'+				
                  'document.getElementsByTagName(\'div\')['+(soegId +'')+'].style.display=\'none\';'+
                  'setCookie(\'visSoeg\',false,365);};" /></li>\n'+
                  ''+

                  '<li>&middot;Vis "Log På":<input id="logCheck" type="checkbox" value="log" checked="true" onclick="javascipt:if (this.checked == true){'+
						'document.getElementById(\'login-box\').style.display=\'block\'; setCookie(\'visLog\',true,365);} else{'+
						'document.getElementById(\'login-box\').style.display=\'none\';  setCookie(\'visLog\',false,365);};" /></li>\n'+
                  ''+
            
                  '<li>&middot;Vis Bruger boks:<input id="brugerCheck" type="checkbox" value="bruger" checked="true" onclick="javascipt:if (this.checked == true) {'+
						'document.getElementsByTagName(\'div\')['+(brugerInfoId +'')+'].style.display=\'block\';'+
                  'setCookie(\'visBruger\',true,365);} else{'+				
                  'document.getElementsByTagName(\'div\')['+(brugerInfoId +'')+'].style.display=\'none\';'+
                  'setCookie(\'visBruger\',false,365);};" /></li>\n'+
                  ''+
                  
                  '<li>&middot;Vis "Indsend nyhed":<input id="indCheck" type="checkbox" value="ind" checked="true" onclick="javascipt:if (this.checked == true) {'+
						'document.getElementsByTagName(\'a\')['+(indsendId +'')+'].style.display=\'block\';'+
                  'setCookie(\'visInd\',true,365);} else{'+				
                  'document.getElementsByTagName(\'a\')['+(indsendId +'')+'].style.display=\'none\';'+
                  'setCookie(\'visInd\',false,365);};" /></li>\n'+
                  ''+
                  
                  '<li>&middot;Vis Konkurence:<input id="konCheck" type="checkbox" value="kon" checked="true" onclick="javascipt:if (this.checked == true){'+
						'document.getElementById(\'sweeplist\').style.display=\'block\'; setCookie(\'visKon\',true,365);} else{'+
						'document.getElementById(\'sweeplist\').style.display=\'none\';  setCookie(\'visKon\',false,365);};" ></li>\n'+
                  ''+
                  
                  '<li>&middot;Vis "Nyheder":<input id="nyhedCheck" type="checkbox" value="ind" checked="true" onclick="javascipt:if (this.checked == true) {'+
                  'document.getElementById(\'container-index\').style.display=\'block\'; setCookie(\'visNyhed\',true,365);} else{'+
						'document.getElementById(\'container-index\').style.display=\'none\';  setCookie(\'visNyhed\',false,365);};" ></li>\n'+
                  ''+
                  
                  '<li>&middot;Vis "Afstemning":<input id="pollCheck" type="checkbox" value="poll" checked="true" onclick="javascipt:if (this.checked == true){'+
						'document.getElementById(\'pollcontainer\').style.display=\'block\'; setCookie(\'visPoll\',true,365);} else{'+
						'document.getElementById(\'pollcontainer\').style.display=\'none\';  setCookie(\'visPoll\',false,365);};" /></li>\n'+
                  ''+
                  
                  '<li>&middot;Vis "Tilmeld Nyhedsbrev":<input id="NLCheck" type="checkbox" value="NL" checked="true" onclick="javascipt:if (this.checked == true) {'+
						'document.getElementsByTagName(\'div\')['+(nyhedsBrevId +'')+'].style.display=\'block\';'+
                  'setCookie(\'visNL\',true,365);} else{'+				
                  'document.getElementsByTagName(\'div\')['+(nyhedsBrevId +'')+'].style.display=\'none\';'+
                  'setCookie(\'visNL\',false,365);};" /></li> \n'+
                  '\n</ul> <br />'+
                  
                  '<b>Seperate nyheder:</b><br /><i>(kræver reload)</i><ul>'+
                  '<li>&middot;Rss fra Newz<input id="RssNewzCheck" type="checkbox" value="RssNewz" checked="true" onclick="javascript:if (this.checked == true) {setCookie(\'rssNewz\',true,365);} else {setCookie(\'rssNewz\',false,365);};" />'+
                  '<li>&middot;Rss fra Railgun<input id="RssRailgunCheck" type="checkbox" value="RssRailgun" checked="true" onclick="javascript:if (this.checked == true) {setCookie(\'rssRailgun\',true,365);} else {setCookie(\'rssRailgun\',false,365);};" />'+
                  '<li>&middot;Rss fra Macnation<input id="RssMacnationCheck" type="checkbox" value="RssMacnation" checked="true" onclick="javascript:if (this.checked == true) {setCookie(\'rssMacnation\',true,365);} else {setCookie(\'rssMacnation\',false,365);};" />'+
                  '<li>&middot;Rss fra Filmz<input id="RssFilmzCheck" type="checkbox" value="RssFilmz" checked="true" onclick="javascript:if (this.checked == true) {setCookie(\'rssFilmz\',true,365);} else {setCookie(\'rssFilmz\',false,365);};" />'+
                  '<li>&middot;<a href="javascript:void(window.location.reload())" style="color:#000000;" onclick="window.location.reload()">>>Reload</a>'+
                  '</ul>'+
                  '</div>'
                  ;
						
	
	
	
	
	document.body.insertBefore(setDiv, document.body.lastChild);
   document.getElementById("soegCheck").checked = revBool(skjul_soeg) ;
   document.getElementById("logCheck").checked = revBool(skjul_log_på) ;
   document.getElementById("brugerCheck").checked = revBool(skjul_egen_brugerinfo) ;
   document.getElementById("indCheck").checked = revBool(skjul_indsend_nyhed) ;
   document.getElementById("konCheck").checked = revBool(skjul_konkurence) ;
   document.getElementById("nyhedCheck").checked = revBool(skjul_nyhedsoversigt) ;
   document.getElementById("pollCheck").checked = revBool(skjul_afstemning);
   document.getElementById("NLCheck").checked = revBool(skjul_tilmeld_nyhedsbrev) ;
   document.getElementById("bannerCheck").checked = skjul_bannere ;
   
   
   //alert('newz:' +rss_newz +'\n Railgun:' +rss_railgun+'\n Macnation:' +rss_macnation+'\n Filmz:' +rss_filmz) ;

   document.getElementById("RssNewzCheck").checked = rss_newz ;
   document.getElementById("RssRailgunCheck").checked = rss_railgun ;
   document.getElementById("RssMacnationCheck").checked = rss_macnation ;
   document.getElementById("RssFilmzCheck").checked = rss_filmz;
}


//Ting der skal skjules
{

if (skjul_log_på) {
   if (document.getElementById("login-box")){
      document.getElementById("login-box").style.display="none" ;
   }
}
if (skjul_bannere) {
	tp = 200 - top_margin ;
   document.getElementsByTagName('div')[topAdId].style.zIndex = '0' ;
   document.getElementsByTagName('div')[topAdId].style.width = '0px' ;
   
	document.getElementById("wrapper").style.marginTop="-" +tp.toString() +"px" ;
	document.getElementById("container").getElementsByTagName("div")[1].style.display="none" ;
	var iframearr = document.getElementsByTagName("iframe");
   for (i = 0; i < iframearr.length; i++) { 
		iframearr[i].src="" ;
		iframearr[i].style.height="0px";
		iframearr[i].style.display="none";				
	}
}

if (skjul_konkurence) {
	document.getElementById("sweeplist").style.display="none" ;
}
if (skjul_afstemning) {
	document.getElementById("pollcontainer").style.display="none" ;
}
if (skjul_indsend_nyhed) {
	document.getElementsByTagName('a')[indsendId].style.display='none';
}
if (skjul_nyhedsoversigt) {
   document.getElementById("container-index").style.display= "none" ;
}

//skjul div ved className

if (skjul_egen_brugerinfo) {
	document.getElementsByTagName("div")[brugerInfoId].style.display= "none" ;
}
if (skjul_soeg) {
		document.getElementsByTagName("div")[soegId].style.display= "none" ;
}
if (skjul_tilmeld_nyhedsbrev) {
		document.getElementsByTagName("div")[nyhedsBrevId].style.display= "none" ;
}
}

function getCookie(c_name){
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1; 
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return "";
}


function setCookie(c_name,value,expiredays){
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

