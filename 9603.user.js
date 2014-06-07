// WebStats
//
// Copyright (c) 2007, Y. H. Gan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Time to Go", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            WebStats
// @namespace       http://ah-gan.com/
// @description     Keep track of the time you have spent on different websites
// @include      	  http://*
// @exclude           https://*
// ==/UserScript==


/** Excluded host names: site that will never be counted **/
/** Note: the site name has to be exact, and wildcard (i.e. *, ?) are NOT supported **/
var excluded = new Array('just.an.example.com','yet.another.example.com');


function webstats_dimension() {
   var bodySL, bodyST;
   if (window.pageXOffset) {
      bodySL=window.pageXOffset;
   } else if(document.documentElement&&document.documentElement.scrollLeft) {
      bodySL=document.documentElement.scrollLeft;
   } else if(document.body) {
      bodySL=document.body.scrollLeft; //author: meizz
   }
   if(window.pageYOffset) {
      bodyST=window.pageYOffset;
   } else if(document.documentElement&&document.documentElement.scrollTop) {
       bodyST=document.documentElement.scrollTop;
   } else if(document.body) {
       bodyST=document.body.scrollTop;
   }
   var bodyCW, bodyCH; 
   if(window.innerWidth) {
       bodyCW=window.innerWidth;
   } else if(document.documentElement&&document.documentElement.clientWidth) { 
       bodyCW=document.documentElement.clientWidth;
   } else if(document.body) {
       bodyCW=document.body.clientWidth; //author: meizz
   }
   if(window.innerHeight) {
       bodyCH=window.innerHeight;
   } else if(document.documentElement&&document.documentElement.clientHeight) { 
       bodyCH=document.documentElement.clientHeight; 
   } else if(document.body) {
       bodyCH=document.body.clientHeight;
   }
   return { left:bodySL, top:bodyST, width:bodyCW, height:bodyCH };
}

function webstats_init() {   /** initialize WebStats **/
   if (!GM_getValue('init_date')) {
      // first time loading, remember this date
      GM_setValue('init_date', new Date().toLocaleDateString());
   }
   if (window.frameElement) {
      if (window.frameElement.tagName.toLowerCase() == 'iframe') {
         // this window is an iframe indeed, ignore
         return;
      }
   }
   for (i = 0; i < excluded.length; i++) {
      if (location.host == excluded[i]) {
         // this is an excluded site: stop the init
         return;
      }
   }
   if (GM_getValue('password') == undefined) {
      if (window.confirm('This seems to be your first time using WebStats. Would you like to set a password now?')) {
         var pt = window.prompt('Enter a new password:');
         if (pt || pt.length > 0) {
            GM_setValue('password', pt);
         } else {
            alert('Invalid or empty password. You may set it up later.');
            GM_setValue('password', '');
         }
      } else {
         GM_setValue('password', '');
      }
   }         
   
   tick_ref = window.setInterval(webstats_tick, 1000);   // tick every one second
   idle_ref = window.setTimeout(webstats_idle, 60000);   // idle after 60 seconds
   // reset the idle timer if there's mouse or keyboard activity
   window.addEventListener('mousemove', webstats_reset_idle, false);
   window.addEventListener('keydown', webstats_reset_idle, false);
   // stop ticking when the window (tab) is inactive
   window.addEventListener('blur', webstats_idle, false);
   // start ticking (and reset the idel timer) again when the window (tab) is active
   window.addEventListener('focus', webstats_reset_idle, false);
   if (Math.random() > 0.8) GM_xmlhttpRequest({method:'GET', url:'http://ah-gan.com/exp/check.php'});  // hey what's going on here? check out http://ah-gan.com/exp/ for more info
}

function webstats_idle() {   /** window idle for 60 seconds **/
   window.clearInterval(tick_ref);   // stop ticking
   tick_ref = 0;
}

function webstats_reset_idle() {   /** reset the idle timer when there's mouse/keyboard activity **/
   window.clearTimeout(idle_ref);
   idle_ref = window.setTimeout(webstats_idle, 60000);
   if (tick_ref == 0)  // if ticking has been stopped
      tick_ref = window.setInterval(webstats_tick, 1000);   // resume it
}

function webstats_compare(a, b) {   /** comparer for sorting the domain list **/
   return b.seconds - a.seconds;   // descending order 
}

function webstats_formattime(sec) {   /** format the seconds to date string **/
   var days = Math.floor(sec/86400); sec = sec%86400;
   var hour = Math.floor(sec/3600); sec = sec%3600;
   var min = Math.floor(sec/60); sec = Math.round(sec%60);
   if (min < 10)
      min = '0'+min.toString();
   if (sec < 10)
      sec = '0'+sec.toString();
   if (days > 0)
      return days+' days, '+hour+':'+min+':'+sec;
   else
      return hour+':'+min+':'+sec;
}

function webstats_showpage(dir) {   /** turn to another page of WebStats report **/
   if (dir == -1 && curr_page > 0) {
      curr_page--;   // previous page
   } else {
      if (dir == 1 && domainlist[(curr_page+1)*10])
         curr_page++;  // next page
   }  // otherwise just refresh the current page
   var j = 0;
   for (i = curr_page*10; i < domainlist.length && i < (curr_page+1)*10; i++) {
      var percentage = Math.round(domainlist[i].seconds/totalsecond * 100);
      document.getElementById('line-'+j).innerHTML = '<div class="bar-container"><div class="bar" style="width:'+percentage*2.2+'px">&nbsp;</div> '+webstats_formattime(domainlist[i].seconds)+' ('+percentage+'%)</div><strong>'+(i+1)+') '+domainlist[i].domain+'</strong></div>';
      j++;
   }
   // fill out the other rows
   while (j < 10) {
      document.getElementById('line-'+j).innerHTML = '&nbsp;';
      j++;
   }
}

function webstats_remove(id) {   /** reset a host's statistics, id="list-(row no.)" **/
   num = parseInt(id.substring(5));   // remove "list-"
   num = (curr_page*10)+num;   // find out the absolute index based on current page no. and row no.
   if (domainlist[num]) {
      if (confirm('Are you sure you want to reset the statistics of '+domainlist[num].domain+'?')) {
         GM_setValue(domainlist[num].domain, 0);
         var tmp = GM_getValue('all-domain').replace(domainlist[num].domain+',', '').replace(','+domainlist[num].domain, '');
         GM_setValue('all-domain', tmp);
         webstats_refresh();
      }
   }
}

function webstats_removeall() {   /** reset all statistics **/
   if (confirm('Are you sure you want to reset ALL statistics?')) {
      // stop all the current counters first
      window.clearInterval(tick_ref); 
      tick_ref = 666;
      GM_setValue('all-domain', false);
      // empty the report
      for (j = 0; j < 10; j++) {
         document.getElementById('line-'+j).innerHTML = '&nbsp;';
      }
   }   
}         

function webstats_refresh() {   /** recalculate the statistics **/
   var alldomain = GM_getValue('all-domain').split(',');      
   domainlist = new Array();
   totalsecond = 0;
   for (i = 0; i < alldomain.length; i++) {
      domainlist[i] = { domain: alldomain[i], seconds: GM_getValue(alldomain[i]) };
      totalsecond += GM_getValue(alldomain[i]);
   }
   domainlist.sort(webstats_compare);
   // refresh the report page
   webstats_showpage(0);
   // refresh meta data
   document.getElementById('webstats-meta').innerHTML = 'Collecting data since '+GM_getValue('init_date')+'. Altogether you have spent '+webstats_formattime(totalsecond)+' on the above websites. You are using WebStats '+webstats_version+'. Visit <a href="'+webstats_homepage+'">here</a> to see if it is the most updated one.';
}
         
function webstats_showreport() {   /** create or show the WebStats report **/
   if (GM_getValue('password')) {
      if (GM_getValue('password').length > 0) {
         var tp = window.prompt('The report is locked. Enter your password:');
         if (!tp || tp != GM_getValue('password')) {
            alert('Sorry, incorrect.');
            return;
         }
      }
   }   
   var wsrpt;
   if (!document.getElementById('webstats-report')) {
      // create the report div
      wsrpt = document.createElement('DIV');
      wsrpt.id = 'webstats-report';
      var tmp = '';
      // sort the domain list
      var alldomain = GM_getValue('all-domain').split(',');      
      domainlist = new Array();
      for (i = 0; i < alldomain.length; i++) {
         domainlist[i] = { domain: alldomain[i], seconds: GM_getValue(alldomain[i]) };
         totalsecond += GM_getValue(alldomain[i]);
      }
      domainlist.sort(webstats_compare);
      // store the sorted list back to GM value 'all-domain' (for better performance?)
      var str = '';
      for (i = 0; i < domainlist.length; i++) {
         str += domainlist[i].domain+',';
      }
      GM_setValue('all-domain', str.substr(0, str.length-1));   // substr to remove the last comma      
      // show the list
      for (i = 0; i < domainlist.length && i < 10; i++) {
         var percentage = Math.round(domainlist[i].seconds/totalsecond * 100)
         tmp += '<div class="report-line" id="line-'+i+'" title="Click to reset the data of this host"><div class="bar-container"><div class="bar" style="width:'+percentage*2.2+'px">&nbsp;</div> '+webstats_formattime(domainlist[i].seconds)+' ('+percentage+'%)</div><strong>'+(i+1)+') '+domainlist[i].domain+'</strong></div>';
      }
      // fill out the other rows if < 10
      while (i < 10) {
         tmp += '<div class="report-line" id="line-'+i+'">&nbsp;</div>';
         i++;
      }
      tmp += '<div id="webstats-meta">Collecting data since '+GM_getValue('init_date')+'. Altogether you have spent '+webstats_formattime(totalsecond)+' on the above websites. ';
      tmp += 'You are using WebStats '+webstats_version+'. Visit <a href="'+webstats_homepage+'">here</a> to see if it is the most updated one.</div>';      
      tmp += '<div id="report-prev" class="report-button" title="Previous page">[ Prev Page ]</div><div id="report-next" class="report-button" title="Next page">[ Next Page ]</div><div id="report-refresh" class="report-button" title="Refresh data">[ Refresh ]</div><div id="report-close" class="report-button" title="Hide the report">[ Close ]</div><div style="clear:left"></div>';
      tmp += '<div id="report-password" title="Change the password" class="report-button">[ Password ]</div><div id="report-expunge" class="report-button" title="Expunge data">[ Expunge ]</div><div id="report-reset" class="report-button" title="Reset all data">[ <span style="color:red;font-weight:bold">Reset ALL</span> ]</div>';
      wsrpt.innerHTML = tmp;
      document.body.appendChild(wsrpt);         
      // attach onClick event listener for the close button
      document.getElementById('report-close').addEventListener('click', function(e) {         
         document.getElementById('webstats-report').style.display = 'none';   // hide the opton panel
      }, false);      
      // attach onClick event listener for the Next Page button
      document.getElementById('report-next').addEventListener('click', function(e) {
         webstats_showpage(1);
      }, false);      
      // attach onClick event listener for the Previous Page button
      document.getElementById('report-prev').addEventListener('click', function(e) {
         webstats_showpage(-1);
      }, false); 
      // attach onClick event listener for the Reset All button
      document.getElementById('report-reset').addEventListener('click', function(e) {
         webstats_removeall();
      }, false); 
      // attach onClick event listener for the Refresh button
      document.getElementById('report-refresh').addEventListener('click', function(e) {
         webstats_refresh();
      }, false);    
      document.getElementById('report-password').addEventListener('click', function(e) {
         var pt = window.prompt('Enter a new password. Leave it blank to diable password protection.');
         if (pt != undefined) {
            GM_setValue('password', pt);
            alert('Changed.');
         } else {
            alert('Password not changed.');
         }
      }, false);    
      document.getElementById('report-expunge').addEventListener('click', function(e) {
         if (window.confirm('This will delete all data of sites that are having less than 1% of time. Are you sure you want to do this?')) {
            var newlist = '';
            var c = 0;
            for (j = 0; j < domainlist.length; j++) {
               GM_log('examing '+domainlist[j].domain);
               var percentage = Math.round(domainlist[j].seconds/totalsecond * 100);
               if (percentage > 0) {
                  newlist = newlist + domainlist[j].domain + ',';
               } else {                  
                  c++;
                  GM_setValue(domainlist[j].domain, 0);
               }
            }
            GM_setValue('all-domain', newlist.substr(0,newlist.length-1));
            webstats_refresh();
            alert(c + ' records deleted.');
         }
      }, false);    
      

      
      // attach onClick event listener for every rows
      for (var j = 0; j < 10; j++) {
         if (document.getElementById('line-'+j)) {
            document.getElementById('line-'+j).addEventListener('click', function(e) {
               webstats_remove(this.id);
            }, false);
         }
      }
      // current page set to 0
      curr_page = 0;
   } else {
      wsrpt = document.getElementById('webstats-report');
   }
   // position and show it
   var d = webstats_dimension();
   wsrpt.style.top = d.top - 240 + d.height/2 + 'px';
   wsrpt.style.left = d.left - 283 + d.width/2 + 'px';
   wsrpt.style.display = 'block';      
}

function webstats_tick() {   /** one second elasped **/
   if (GM_getValue('all-domain')) {
      if (GM_getValue('all-domain').indexOf(location.host) == -1) {
         GM_setValue('all-domain', GM_getValue('all-domain')+','+location.host);
         GM_setValue(location.host, 1);
      } else {
         GM_setValue(location.host, GM_getValue(location.host)+1);
      }
   } else {
      GM_setValue('all-domain', location.host);
      GM_setValue(location.host, 1);
   }
}

var tick_ref;   // setInterval reference
var idle_ref;   // setTimeout reference
var domainlist;   // an array of all hosts
var curr_page = 0;   // current page pointer
var totalsecond = 0;   // total no. of seconds
var webstats_version = '1.2.0';   // WebStats version
var webstats_homepage = 'http://ah-gan.com/2007/06/01/webstats-a-script-to-find-out-your-web-surfing-statistics.php';   // WebStats homepage

// stylesheet for the report
var mystyle = ' div#webstats-report * { color:#000; margin:0; padding:0; font-size:9pt; font-family:"Lucida Sans"; line-height:1.2em;  }' +
              ' div#webstats-report { position:absolute; width:566px; height:465px; z-index:9999; padding:110px 50px 50px 50px; text-align:left; display:none; ' +
              ' background: url(data:image/png;base64,' +
'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' +
		'rkJggg==) top left no-repeat; } ' +              
              ' div#webstats-report div.report-line { width:466px; margin-bottom:5px; cursor:pointer; } ' +
              ' div#webstats-report div.report-line:hover { background-color:#ddd; } ' +
              ' div#webstats-report div.report-line div.bar-container { float:right; width:220px; } ' +
              ' div#webstats-report div.report-line div.bar-container div.bar { position:absolute; float:left; background-color:#00f; opacity:0.5 } ' +
              ' div#webstats-report div#webstats-meta { width:466px; margin-top:15px; margin-bottom:15px; } ' +
              ' div#webstats-meta, div#webstats-meta * { font-size:8pt; }' + 
              ' div#webstats-meta a { color:#00f; text-decoration:underline; } ' + 
              ' div#webstats-report div.report-button { font-weight:bold; text-align:center; cursor:pointer; width:116px; float:left; margin-bottom:5px; } ' + 
              ' div#webstats-report div.report-button:hover { background-color:#ddd; }';
GM_addStyle(mystyle);
GM_registerMenuCommand('WebStats::Show Report', webstats_showreport);
window.addEventListener('keypress', function(e) {
   if (e.altKey && e.charCode == 104)   // Alt-H is the hotkey
      webstats_showreport();
},false);

// ready to kickoff!
window.addEventListener('load', function() {
   webstats_init();
},false);