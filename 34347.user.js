// ==UserScript==
// @name           GLB Add Depth Chart Assignments to Roster Page
// @namespace      GLB
// @description    GLB Add Depth Chart Assignments to Roster Page
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @include        http://goallineblitz.com/game/depth_chart.pl?team_id=*
// ==/UserScript==
// 
// 
// 
 function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};

function CreateListedDC(){
    
    if (isshowing==0) {
        var responseinfo = document.getElementById('body_container');
        var depth=responseinfo.innerHTML.split('positionIds[');
        for(var dep=1;dep<depth.length;dep++) {
            posdepth[dep - 1] = new Array ();
            if (dep == (depth.length - 1)) {
                depth[dep] = depth[dep].substring(0,depth[dep].indexOf("changeTab"));
            }
            posdepth[dep - 1][0] = depth[dep].substring(1,depth[dep].indexOf("']"))
            depth[dep] = depth[dep].substring(depth[dep].indexOf("']") + 6)
            var assigned=depth[dep].split(',');
            for(var loophold=0;loophold<assigned.length;loophold++) {
                assigned[loophold] = assigned[loophold].replace(/'/g,'');
                posdepth[dep - 1][loophold + 1] = parseInt(assigned[loophold].replace(/]/g,''));
            }
        }
        var playerdepth=responseinfo.innerHTML.split('roster.push({id :');
        for(var playerdep=1;playerdep<playerdepth.length;playerdep++) {
            playername[playerdep - 1] = new Array ();
            playername[playerdep - 1][0] = playerdepth[playerdep].substring(playerdepth[playerdep].indexOf("'") + 1,(playerdepth[playerdep].indexOf("'",playerdepth[playerdep].indexOf("'") + 2)))
            playername[playerdep - 1][1] = playerdepth[playerdep].substring(playerdepth[playerdep].indexOf("name : ") + 8,(playerdepth[playerdep].indexOf('",',playerdepth[playerdep].indexOf("name : ") + 9)))
        };
        var tablestr='';
        //bubble sort array of positions
        var holder = new Array();
        for(x = 0; x < posdepth.length; x++) {
            for(y = 0; y < (posdepth.length-1); y++) {
                if(posdepth[y][0] > posdepth[y+1][0]) {
                    holder = posdepth[y+1];
                    posdepth[y+1] = posdepth[y];
                    posdepth[y] = holder;
                }
            }
        };
        tablestr='<table width=100% border=1>'
        for (var loop1=0;loop1<posdepth.length;loop1++) {
            //
            if ((loop1%2)==0){
                tablestr += '<tr>';
            };
            tablestr +='<td width=3%><b>' + posdepth[loop1][0] + '</b></td><td width=47%>';
            for(var loop2=1;loop2<posdepth[loop1].length;loop2++) {
                for (var loop3=0;loop3<playername.length; loop3++) {
                    if(parseInt(playername[loop3][0]) == posdepth[loop1][loop2]) {
                        if (loop2>1) {
                            tablestr += ', <a href="/game/player.pl?player_id='+ playername[loop3][0] + '" target="_blank">' + playername[loop3][1] + '</a>';
                        }else {
                            tablestr += '<a href="/game/player.pl?player_id='+ playername[loop3][0] + '" target="_blank">' + playername[loop3][1] + '</a>';
                        }
    
                    };
                };
            };
            tablestr +='</td>';
            if ((loop1%2)==1){
                tablestr += '</tr>';
            };
        };
        tablestr += '</table><br>';
        placehold1 = placeholder.innerHTML.substring(0,placeholder.innerHTML.indexOf('</span>')+7);
        placehold2 = placeholder.innerHTML.substring(placeholder.innerHTML.indexOf('</span>')+7);
        placeholder.innerHTML = placehold1 + tablestr + placehold2;
        
    }else{
        placehold1 = placeholder.innerHTML.substring(0,placeholder.innerHTML.indexOf('<table'))
        placeholder.innerHTML = placehold1 + placeholder.innerHTML.substring(placeholder.innerHTML.indexOf('</table>') + 12)

    };
    var button = document.getElementById('listdc');
    if (isshowing==0) {
        isshowing = 1;
        button.setAttribute("value","Hide Listed Depth Chart");
    }else{
        isshowing = 0; 
        button.setAttribute("value","Show Listed Depth Chart");
    };
    button.addEventListener("click",CreateListedDC,false);
};

function BuildDepthArray(teamid, page, playerid){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/depth_chart.pl?team_id=' + teamid,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(depth) {
         
         var response1=depth.responseText;
         //split for position information
         var depth=response1.split('positionIds[');
         
         for(var dep=1;dep<depth.length;dep++) {
             posdepth[dep - 1] = new Array ();
             if (dep == (depth.length - 1)) {
                 depth[dep] = depth[dep].substring(0,depth[dep].indexOf("changeTab"));
             }
             posdepth[dep - 1][0] = depth[dep].substring(1,depth[dep].indexOf("']"))
             depth[dep] = depth[dep].substring(depth[dep].indexOf("']") + 6)
             var assigned=depth[dep].split(',');
             for(var loophold=0;loophold<assigned.length;loophold++) {
                 assigned[loophold] = assigned[loophold].replace(/'/g,'');
                 posdepth[dep - 1][loophold + 1] = parseInt(assigned[loophold].replace(/]/g,''));
             }
         }

         //bubble sort based on position
         
         var holder = new Array();
         for(x = 0; x < posdepth.length; x++) {
             for(y = 0; y < (posdepth.length-1); y++) {
                 if(posdepth[y][0] > posdepth[y+1][0]) {
                     holder = posdepth[y+1];
                     posdepth[y+1] = posdepth[y];
                     posdepth[y] = holder;
                 }
             }
         }

         if(page=='roster') {
             //move down roster and add depth assignments
             var rosterplayers=getElementsByClassName('player_name_short',document);
             if (rosterplayers.length > 0){
                 
                 for(q=0;q<rosterplayers.length;q++)
                 {
                     
                     var currentplayerid = rosterplayers[q].innerHTML.substring(rosterplayers[q].innerHTML.indexOf('player_id=') + 10, rosterplayers[q].innerHTML.indexOf('">',rosterplayers[q].innerHTML.indexOf('player_id=') + 10));
                     
                     
                     for(var posdeploop = 0;posdeploop<posdepth.length;posdeploop++) {
                         for(var linedepth = 1;linedepth<posdepth[posdeploop].length; linedepth++) {
                             if (posdepth[posdeploop][linedepth]==parseInt(currentplayerid)){
                                 rosterplayers[q].innerHTML += '<b> ' + posdepth[posdeploop][0] + '(' + linedepth + ') </b> ';
                                 
                             }
                         }
                     }
                     
                     
                 }
             } else {
                 
                 var rosterplayers=getElementsByClassName('player_name',document);
                 for(q=0;q<rosterplayers.length;q++)
                 {
                     
                     var currentplayerid = rosterplayers[q].innerHTML.substring(rosterplayers[q].innerHTML.indexOf('player_id=') + 10, rosterplayers[q].innerHTML.indexOf('">',rosterplayers[q].innerHTML.indexOf('player_id=') + 10));
                     
                 
                     for(var posdeploop = 0;posdeploop<posdepth.length;posdeploop++) {
                         for(var linedepth = 1;linedepth<posdepth[posdeploop].length; linedepth++) {
                             if (posdepth[posdeploop][linedepth]==parseInt(currentplayerid)){
                                 rosterplayers[q].innerHTML += '<b> ' + posdepth[posdeploop][0] + '(' + linedepth + ') </b> ';
                 
                             }
                         }
                     }
                 
                     
                 }
             };
         }else {
             var playervitals=getElementsByClassName('content_container',document);
             var newStyle = "height: 150px;";
             var style = playervitals[0].getAttribute("style");
             if (style != null) {
                 newStyle += style;
             }
             playervitals[0].setAttribute("style",newStyle);
	

             
             portion1str = playervitals[0].innerHTML.substring(0, playervitals[0].innerHTML.indexOf('</tbody>'))
             portion2str = playervitals[0].innerHTML.substring(playervitals[0].innerHTML.indexOf('</tbody>'))
             var depthassignments = ''
             for(var posdeploop = 0;posdeploop<posdepth.length;posdeploop++) {
                 for(var linedepth = 1;linedepth<posdepth[posdeploop].length; linedepth++) {
                     if (posdepth[posdeploop][linedepth]==parseInt(playerid)){
                         depthassignments += ' ' + posdepth[posdeploop][0] + '(' + linedepth + ') ';
                 
                     }
                 }
             }

             playervitals[0].innerHTML = portion1str + '<tr><td class="vital_head">Depth Chart:</td><td class="vital_data" colspan="5">' + depthassignments +  portion2str;

             
         }
      }
   })
};

//variable to hold array based on each player
var posdepth = new Array()
var playername = new Array()
var isshowing = 0;
var placeholder = document.getElementById('position_tabs');

//variable to determine how long to wait before starting the script
var timeout = 0;


window.setTimeout( function() {
    //get current url
    var url = window.location.href;
    urlcut = url.substring(url.indexOf('=') + 1);
    //Call Function to build array and place into roster page
    if(url.indexOf('player.pl')> 0) {
        var playervitals=getElementsByClassName('vital_data',document);
        var teamid = playervitals[4].innerHTML.substring(playervitals[4].innerHTML.indexOf('team_id=') + 8, playervitals[4].innerHTML.indexOf('">',playervitals[4].innerHTML.indexOf('team_id=') + 8))
        BuildDepthArray(teamid, 'player', urlcut);
    }else if(url.indexOf('roster.pl')>0){
        BuildDepthArray(urlcut, 'roster', 0);
    }else {
        //alert('in');
        var placeholder = document.getElementById('position_tabs')
        //alert(placeholder.innerHTML);
        //placeholder.innerHTML = '<div id="listdc"><input type="button" name="listdc" value="Show Listed Depth Chart" onclick="CreateListedDC"></div><div id="listeddc"></div>' + placeholder.innerHTML;
        
        var button = document.createElement("input");
        button.setAttribute("value","Show Listed Depth Chart");
        button.setAttribute("type","button");
        button.setAttribute("id","listdc");
        button.addEventListener("click",CreateListedDC,false);


        var spn = document.createElement("span");
        spn.appendChild(button);
        placeholder.insertBefore(spn,placeholder.firstChild);
    }

},timeout);
