// ==UserScript==
// @name           GLB Add all agents as GMs
// @namespace      Goal Line Blitz
// @include        http://goallineblitz.com/game/team_gm.pl?team_id=*
// ==/UserScript==
// 


//function to allow for searching and retrieving elements by class name; modified to allow searching for 2 classes and returning as one array
function getElementsByClassName(classname, par, additionalclass){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var re2 = new RegExp('\\b' + additionalclass + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className) || re2.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};


function getElementsByType(typename,par){
    var a=[];   
	var re = new RegExp('\\b' + typename + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].type)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;

}
function loadAgents(){
    var tempDiv2 = document.getElementById('tempDiv');
    var playernames=getElementsByClassName('player_name_short',tempDiv2);
    agenttotal = playernames.length - 1;
    // do retrieve of agents per roster page to array
    for (var i = 0; i < playernames.length; i++) {
        var playerInfo = playernames[i].innerHTML;
        var idlong = playerInfo.split('player_id=');
        var id = idlong[1].split('">');
        getAgentName(id, i);
    };



};


function getAgentName(playerId, i)
{
   GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
   headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(agntname) {
      var response1=agntname.responseText
      var playeroverall=response1.split('<div class="rating_bar">');
      var playeroverallbar = playeroverall[1].substring(playeroverall[1].indexOf('<div class="rating_bar_fill'), playeroverall[1].indexOf('</div>', playeroverall[1].indexOf('<div class="rating_bar_fill') + 6));
      if (playeroverallbar.indexOf('px')>0) {
          var playerstat = playeroverallbar.substring(playeroverallbar.indexOf('width:') + 6, playeroverallbar.indexOf('px'));
      }else{
          var playerstat = playeroverallbar.substring(playeroverallbar.indexOf('width:') + 6, playeroverallbar.indexOf('%'));
      }
      playeroverallbar = playeroverallbar.replace('&nbsp;',playerstat);
      var agntname=response1.split('user_id=');
      var name1=agntname[1].split('">');
      var agntID = name1[0];
      var name2=name1[1].split('</');
      var foundagent = false;
      
      if (agentlist.length>0) {
          for (var q=0;q<agentlist.length;q++) {
              if (agentlist[q]==name2[0]) {
                  foundagent=true;
                  
              }
          };
      };
      if (existinggms.length > 0) {
          for (var list1 =0;list1<existinggms.length;list1++) {
              if (existinggms[list1]==name2[0]) {
                  foundagent=true;
              }
          }
      };
      if (!foundagent) {
          agentlist.push(name2[0]);
      }
      agenttotal = agenttotal -1;
      
      if (agenttotal ==0) {
          var agentcookie = ''
          
          for (var t=1;t<agentlist.length;t++) {
              agentcookie+=agentlist[t] + ',';
          }
          
          if (agentcookie.length >1) {
              agentcookie = agentcookie.substring(0, agentcookie.length -1);
              document.cookie="gmadds=" + escape(agentcookie) + "; expires=15/02/2012 00:00:00"
          }else{
              var c_start=document.cookie.indexOf("gmadds=");
              var c_name='gmadds';
              if (c_start!=-1){ 
                c_start=c_start + c_name.length+1; 
                var c_end=document.cookie.indexOf(";",c_start);
                if (c_end==-1) c_end=document.cookie.length;
                javcookie = unescape(document.cookie.substring(c_start,c_end));
                //delete cookie
                document.cookie='gmadds=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
              }
          }
          if (agentlist.length>0) {
              var formobjs = getElementsByType('image', document);
              var txtbox = document.getElementsByName("user_name");
              txtbox[0].value = agentlist[0];
              formobjs[1].click();

          }
          
      }
   }
   });
};



var javcookie ='';

//look for javascript cookie
if (document.cookie.length>0){
    var c_start=document.cookie.indexOf("gmadds=");
    var c_name='gmadds';
    if (c_start!=-1){ 
        c_start=c_start + c_name.length+1; 
        var c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
        javcookie = unescape(document.cookie.substring(c_start,c_end));
        //delete cookie
        document.cookie='gmadds=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    } 
    if (javcookie.length > 0) {
        var agentscookie = javcookie.split(',');
        var newcookie = '';
        for (var w=1;w<agentscookie.length;w++) {
            newcookie+=agentscookie[w] +',';
        }
        if (newcookie.length>1) {
            newcookie = newcookie.substring(0, newcookie.length -1);
            document.cookie="gmadds=" + escape(newcookie) + "; expires=15/02/2012 00:00:00";
        }
        if (agentscookie.length>0) {
              var formobjs = getElementsByType('image', document);
              var txtbox = document.getElementsByName("user_name");
              txtbox[0].value = agentscookie[0];
              formobjs[1].click();

        }
    }
}


// compare array to existing GMs and add as GMs
var agentlist = new Array;
var existinggms = new Array;


var gmlisting = getElementsByClassName('alternating_color1',document, 'alternating_color2');

for (var list2 =0;list2<gmlisting.length;list2++) {
    existinggms.push(gmlisting[list2].innerHTML.substring(gmlisting[list2].innerHTML.indexOf('">') + 2,gmlisting[list2].innerHTML.indexOf('</a>')));
}

var agenttotal = 0;

// build tab for adding all agents
//create loadAgent link
var loadLink = document.createElement('a');
loadLink.setAttribute('href', '#');
loadLink.innerHTML = "Add All Agents";
loadLink.addEventListener('click',loadAgents, false);

// subhead_link_bar
var subhead_link_bar = getElementsByClassName("subhead_link_bar", document);
subhead_link_bar[0].innerHTML = subhead_link_bar[0].innerHTML + " ";
subhead_link_bar[0].appendChild(loadLink);

// build holder div for roster page
var newDiv = document.getElementById('content');
var tempDiv = document.createElement('div');
tempDiv.id = 'tempDiv';
tempDiv.innerHTML = "";
tempDiv.setAttribute("style","visibility: hidden; display:none;");
newDiv.appendChild(tempDiv);

var teamid = document.location.href.substr(document.location.href.indexOf('=')+1,document.location.href.length);
if (teamid.indexOf('&')>0) {
    teamid = teamid.substring(0,teamid.indexOf('&'));
}
teamid = teamid.replace('#','');


GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/roster.pl?team_id=' + teamid,
   headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(agntname) {
      var response1=agntname.responseText
      // add roster innerhtml to holder div
      tempDiv.innerHTML = response1;
   }});
// get roster innerhtml

