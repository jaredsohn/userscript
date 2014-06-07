// ==UserScript==
// @name           GLB Player Button
// @namespace      http://57thdeviance.hostoi.com/
// @description    add player home page button
// @include        http://goallineblitz.com/game/*
// @exclude        http://goallineblitz.com/game/login.pl
// @exclude        http://goallineblitz.com/game/signup.pl
// @exclude        http://goallineblitz.com/
// @exclude        http://www.goallineblitz.com/
// ==/UserScript==

var displayed=0;
var plNumbers;
function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b'); 	
	var els = par.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++){       
		if(re.test(els[i].className)) {	
			a.push(els[i]);
		}
	}
    
	return a;
};

function addPlayerButton () {
   //create "Player" button in the menu
    var menu = document.getElementById('toolbar');
    var newButton = document.createElement('a');
    newButton.innerHTML="Player";
    newButton.id="playerButton";
    newButton.className="toolbar_item";
    newButton.style.display="none";
    //newButton.id="playerButton"
    //newButton.href="/game/player.pl?player_id=1526042";
    newButton.href="#";
    menu.appendChild(newButton);
    createSubmenu(menu);
    newButton.style.display="block";
    newButton.addEventListener('click', togglePlayerSubmenu, false);
    
}

function createSubmenu (menu) {
     //create submenu for player button
    var subMenu = document.createElement('div');
    //subMenu.style.width="200px";
    //subMenu.style.height="200px";
    subMenu.style.background="red";
    subMenu.style.position="absolute";
    subMenu.style.left="735px";
    subMenu.style.marginTop="30px";
    subMenu.style.display="none";
    subMenu.id="playerButtonSubmenu";
    menu.appendChild(subMenu);
    
    var unorderedList = document.createElement('ul');
    unorderedList.id="playerLinks";
    subMenu.appendChild(unorderedList);
    
    //retrieve players from home page
    GM_xmlhttpRequest({    
        method: 'GET',    
        url: 'http://goallineblitz.com/game/home.pl',    
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',      
          'Accept': 'application/atom+xml,application/xml,text/xml',    
        },    
        onload: function(playerIds) {
        
          var temp=playerIds.responseText;
          var temp2=temp.split('<a href="/game/player.pl?player_id=');
                  
          //extract player ID's for link building and player names for display in submenu
          var playerId = new Array ();
          var playerName = new Array ();
          
          for (var i=1; i<temp2.length; i++) {
            var temp3=temp2[i].split('"',4);
            playerId.push(temp3[0]);
            var temp4 = temp3[3].split('>');
            var temp5 = temp4[1].split('<');
            playerName.push(temp5[0]);
          }
          
          //add players to submenu
          plNumbers=playerId.length;
          var list=document.getElementById('playerLinks');
          var newListItem;
          var newPlayer;
          for (var i=0; i<playerId.length; i++) {
            //create new list item
            newListItem = document.createElement('li');
            //newListItem.id= "player_"+i;
            newListItem.style.height="30px";
            newListItem.style.background="url(http://goallineblitz.com//images/game/design/toolbar.gif) repeat-x";
            newListItem.style.borderBottom="1px solid #65250D";
            if(i>0) {
              newListItem.style.borderTop="1px solid #B74E27";
            }
            list.appendChild(newListItem);
            
            //create new link
            newPlayer = document.createElement('a');
            newPlayer.innerHTML="&nbsp;&nbsp;"+playerName[i]+"&nbsp;&nbsp;";
            newPlayer.href="/game/player.pl?player_id="+playerId[i];
            newPlayer.id= "player_"+i;
            newPlayer.className="toolbar_item";
            newPlayer.style.textDecoration="none";
            newPlayer.style.border="0px";
            newPlayer.style.cssFloat="none";
            newPlayer.style.lineHeight="30px";
            newPlayer.style.display="block";
            newPlayer.style.textAlign="center";
            newListItem.appendChild(newPlayer);
          }
        }
    });
}

function togglePlayerSubmenu() {
  var submenu = document.getElementById("playerButtonSubmenu");
  var button = document.getElementById("playerButton");
  if(displayed===0){
    submenu.style.display="block";
    button.style.background="url(http://goallineblitz.com//images/game/design/toolbar_rollover.gif)";
    button.style.color="#000";
    displayed=1;
  }else if (displayed===1) {
    submenu.style.display="none";
    button.style.background="none";
    button.style.color="#fff";
    displayed=0;
  }
}

function highlightPlayer (playerNumber) {
  var button = document.getElementById("player_"+playerNumber);
  button.style.background="url(http://goallineblitz.com//images/game/design/toolbar_rollover.gif)";
  button.style.color="#000";
}

addPlayerButton ();
