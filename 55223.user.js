// ==UserScript==
// @name           GLB Add Bonus Tokens to Quick Training
// @namespace      GLB
// @include        http://goallineblitz.com/game/quick_training.pl
// ==/UserScript==
// 
// 
// 



function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

function getElementsByClassNameMulti(classname,classname1, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    var re1 = new RegExp('\\b' + classname1 + '\\b');	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className) || re1.test(els[i].className) )
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};


function getBonusTokens(playerid, count){
    GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerid,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(agntname) {
      var response1=agntname.responseText;
      //alert(playerid + ': ' + response1);
      var playeroverall=response1.split('<tr class="player_points_value">');
      var tokensplit = playeroverall[1].split('<td>');
      var bonustokencount = tokensplit[4].substring(0,tokensplit[4].indexOf('<'));
      var shoppingtokencount = tokensplit[5].substring(0,tokensplit[5].indexOf('<'));
      var objplayerslistin = getElementsByClassName('player_name', document);
      var teamnames = response1.split('team_id=');
      
      var teamname = teamnames[2].substring(teamnames[2].indexOf('>') + 1, teamnames[2].indexOf('<'));
      playersortinfo[count-1][4] = teamname;
      playersortinfo[count-1][5] = bonustokencount;
      playersortinfo[count-1][6] = shoppingtokencount;
      objplayerslistin[count].innerHTML = objplayerslistin[count].innerHTML + '<br>Bonus Tokens:' + bonustokencount + '<br>Shopping Tokens:' + shoppingtokencount + '<br>Team:' + teamname;
      var playerboxesfull = getElementsByClassNameMulti('alternating_color1', 'alternating_color2', document);
      playersortinfo[count-1][7] = playerboxesfull[count-1].innerHTML;
      totalcount = totalcount -1;
      if (totalcount ==0) {
          sortList();
      }
      
    }
});
}

function sortList(){
    var oSelect = document.getElementById("sortPlayers");
    var type = oSelect.options[oSelect.selectedIndex].value;

    var newOrder = new Array();


    switch (type){
        case 'Alphabetical':
            sortKey(1, 0);
            break;
        case 'Team':
            sortKey(4, 0);
            break;
        case 'Position':
            sortKey(3, 0);
            break;
        case 'Level':
            sortKey(2, 1);
            break;
        case 'Date Created':
            sortKey(0, 1);
            break;
        case 'Shopping Tokens':
            sortKey(6, 1);
            break;
		case 'Bonus Tokens':
            sortKey(5, 1);
            break;
        default:
            sortKey(0, 0);
            break;
    }
    GM_setValue("quicktype",type);


}

function sortKey(k, num){
	var sortedArray	= new Array();
    var x, y
    // The Bubble Sort method.
    var holder = new Array(10);
    var sortSelect = document.getElementById("adSelect");
	var sortOrder = sortSelect.options[sortSelect.selectedIndex].value;
    if(sortOrder=="Ascending")	{
        if (num==0) {
            for(x = 0; x < playersortinfo.length; x++) {
                for(y = 0; y < (playersortinfo.length-1); y++) {
                    if(playersortinfo[y][k].toUpperCase() < playersortinfo[y+1][k].toUpperCase()) {
                        holder = playersortinfo[y+1];
                        playersortinfo[y+1] = playersortinfo[y];
                        playersortinfo[y] = holder;
                    }
                }
            }
        }else{
            for(x = 0; x < playersortinfo.length; x++) {
                for(y = 0; y < (playersortinfo.length-1); y++) {
                    if(parseInt(playersortinfo[y][k]) < parseInt(playersortinfo[y+1][k])) {
                        holder = playersortinfo[y+1];
                        playersortinfo[y+1] = playersortinfo[y];
                        playersortinfo[y] = holder;
                    }
                }
            }
        }
    }else{
        if (num==0) {
            for(x = 0; x < playersortinfo.length; x++) {
                for(y = 0; y < (playersortinfo.length-1); y++) {
                    if(playersortinfo[y][k].toUpperCase() > playersortinfo[y+1][k].toUpperCase()) {
                        holder = playersortinfo[y+1];
                        playersortinfo[y+1] = playersortinfo[y];
                        playersortinfo[y] = holder;
                    }
                }
            }
        }else{
            for(x = 0; x < playersortinfo.length; x++) {
                for(y = 0; y < (playersortinfo.length-1); y++) {
                    if(parseInt(playersortinfo[y][k]) > parseInt(playersortinfo[y+1][k])) {
                        holder = playersortinfo[y+1];
                        playersortinfo[y+1] = playersortinfo[y];
                        playersortinfo[y] = holder;
                    }
                }
            }
        }
    }
    var playerboxesfull = getElementsByClassNameMulti('alternating_color1', 'alternating_color2', document);
    for(var counting = 0; counting<playerboxesfull.length;counting++) {
        playerboxesfull[counting].innerHTML = playersortinfo[counting][7];
    }
    GM_setValue("quicksortOrder",sortOrder);
}





var objplayerslist = getElementsByClassName('player_name', document);
var playersortinfo = new Array;
var container = getElementsByClassName("big_head",document)[0];
var options = "<option value=''> Sort Players </option>";
var sortTypes = new Array();
sortTypes[0]="Date Created";
sortTypes[1]="Alphabetical";
sortTypes[2]="Level";
sortTypes[3]="Position"
sortTypes[4]="Team";
sortTypes[5]="Bonus Tokens";
sortTypes[6]="Shopping Tokens";

var saved = GM_getValue("quicktype","0");

for(var i=0; i<sortTypes.length; i++)
{
   if(sortTypes[i]==saved)
       options+="<option value='"+sortTypes[i]+"' selected='selected'>"+sortTypes[i]+"</option>";	
   else
       options+="<option value='"+sortTypes[i]+"'>"+sortTypes[i]+"</option>";	
}

container.innerHTML = container.innerHTML +" | <select id='sortPlayers'>"+options+"</select> ";

var oSelect = document.getElementById("sortPlayers");
oSelect.addEventListener("change",sortList,true);

var adOptions = "<option value='Descending'>Descending</option><option value='Ascending'>Ascending</option>";
var adSE = document.createElement("select");
adSE.id="adSelect";
adSE.innerHTML=adOptions;
var savedOrder = GM_getValue("quicksortOrder","0");
if(savedOrder!="0")
{
   if(savedOrder=="Ascending")
   {
       adSE.options[1].selected = true;
   }
   else{
       adSE.options[0].selected = true;
   }
}
container.appendChild(adSE);

var adSelectElement = document.getElementById("adSelect");
adSelectElement.addEventListener("change",sortList,true);

var totalcount = objplayerslist.length -1 ;

for (var i=1;i<objplayerslist.length;i++) {
    // playersortinfo[i][0] = playerid
    // playersortinfo[i][1] = playername
    // playersortinfo[i][2] = level
    // playersortinfo[i][3] = position
    // playersortinfo[i][4] = team
    // playersortinfo[i][5] = bonus tokens
    // playersortinfo[i][6] = shopping tokens
    // playersortinfo[i][7] = html full 
    playersortinfo[i-1] = new Array(8);
    playersortinfo[i-1][0] = objplayerslist[i].innerHTML.substring(objplayerslist[i].innerHTML.indexOf('player_id=') + 10, objplayerslist[i].innerHTML.indexOf('">',objplayerslist[i].innerHTML.indexOf('player_id=')))
    playersortinfo[i-1][1] = objplayerslist[i].innerHTML.substring(objplayerslist[i].innerHTML.indexOf('">') + 2, objplayerslist[i].innerHTML.indexOf('</a>'));
    playersortinfo[i-1][2] = objplayerslist[i].innerHTML.substring(objplayerslist[i].innerHTML.indexOf('span class="cpu">L') + 18, objplayerslist[i].innerHTML.indexOf(' ',objplayerslist[i].innerHTML.indexOf('span class="cpu">L') + 18));
    playersortinfo[i-1][3] = objplayerslist[i].innerHTML.substring(objplayerslist[i].innerHTML.indexOf(' ',objplayerslist[i].innerHTML.indexOf('span class="cpu">L') + 18), objplayerslist[i].innerHTML.indexOf('</span>'));
        
    getBonusTokens(objplayerslist[i].innerHTML.substring(objplayerslist[i].innerHTML.indexOf('player_id=') + 10, objplayerslist[i].innerHTML.indexOf('">',objplayerslist[i].innerHTML.indexOf('player_id='))), i);

}
