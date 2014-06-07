// ==UserScript==
// @name HattrickPlayersAvatars
// @namespace HattrickPlayersAvatars
// @include http://www*.hattrick.org/Club/Players/*
// @include http://www*.hattrick.org/World/Series/TeamOfTheWeek.aspx?leagueLevelUnitId=*&teamId=*
// ==/UserScript==

allDivisions = document.getElementsByTagName("div");
allAs = document.getElementsByTagName('a');
Player = new Array;

//Function fills array with player data
function f_gatherPlayerData(PlayerName, counter) {
      Player[counter] = new Array;

      PlayerName = PlayerName.replace(' ', ' ');

      //Player's data is stored in array for further need
      Player[counter][0] = PlayerName;

      //clothing
      Player[counter][1] = (PlayerName.length % 9) + 1;

      //type of clothing
      Player[counter][2] = (PlayerName.length % 5) + 1;

      //clothing color
      ClothingColor = 'a';
      if (PlayerName.indexOf('h') == -1) {
        ClothingColor = 'b';
      }

      if (PlayerName.indexOf('h') < 5) {
ClothingColor = 'c';
      }

      Player[counter][3] = ClothingColor;

      //head shape
      Player[counter][4] = (PlayerName.length % 9) + 1;

      //head color
      HeadColor = 'a';

      if (PlayerName.toLowerCase().substring(0,1).charCodeAt(0) > 96 && PlayerName.toLowerCase().substring(0,1).charCodeAt(0) < 110) {
        HeadColor = PlayerName.toLowerCase().substring(0,1);
      }

      Player[counter][5] = HeadColor;

      //eyes
      Player[counter][6] = ((PlayerName.length * 10) % 36) + 1;

      //eyes mood
      EyeMood = 'a';
      if (PlayerName.indexOf('h') == -1) {
        EyeMood = 'b';
      }

      if (PlayerName.indexOf('h') < 5) {
EyeMood = 'c';
      }

      Player[counter][7] = EyeMood;

      //type of mouth
      Player[counter][8] = ((PlayerName.length * 10) % 40) + 1;

      //mouth mood
      MouthMood = 'a';
      if (PlayerName.indexOf('h') == -1) {
        MouthMood = 'b';
      }

      if (PlayerName.indexOf('h') < 5) {
        MouthMood = 'c';
      }

      Player[counter][9] = MouthMood;

      //type of nose
      Player[counter][10] = ((PlayerName.length * 10) % 40) + 1;

      //hair
      Player[counter][11] = (PlayerName.length % 9) + 1;

      //hairstyle
      Player[counter][12] = ((PlayerName.length * 10) % 15) + 1;

      //haircolor
      HairColor = 'a';

      if (PlayerName.toLowerCase().substring(0,1).charCodeAt(0) > 96 && PlayerName.toLowerCase().substring(0,1).charCodeAt(0) < 108) {
        HairColor = PlayerName.toLowerCase().substring(0,1);
      }

      Player[counter][13] = HairColor;
}

function f_draw_avatar(counter) {
  return '<img alt="" style="left:9px;top:10px;" src="/Img/Avatar/bodies/f'+Player[counter][1]+'man'+Player[counter][2]+Player[counter][3]+'.png">' +
         '<img alt="" style="left:9px;top:10px;" src="/Img/Avatar/faces/f'+Player[counter][4]+Player[counter][5]+'.png">' +
         '<img alt="" style="left:24px;top:8px;" src="/Img/Avatar/eyes/e'+Player[counter][6]+Player[counter][7]+'.png">' +
         '<img alt="" style="left:31px;top:32px;" src="/Img/Avatar/mouths/m'+Player[counter][8]+Player[counter][9]+'.png">' +
         '<img alt="" style="left:19px;top:8px;" src="/Img/Avatar/noses/n'+Player[counter][10]+'.png">' +
         '<img alt="" style="left:9px;top:10px;" src="/Img/Avatar/hair/f'+Player[counter][11]+'h'+Player[counter][12]+Player[counter][13]+'.png">';
}

//Function sets an avatar for each player
function f_set_new_avatar() {
  counter = 0;
  //We walk trough all divisions
  for (i=0; i < allDivisions.length; i++) {
    //and we modify the ones that are ment for displaying silhuets/avatars
    if (allDivisions[i].className.match("faceCard")) {
      allDivisions[i].style.backgroundImage = "url(/Img/Avatar/backgrounds/card1.png)";
      allDivisions[i].innerHTML = f_draw_avatar(counter) + allDivisions[i].innerHTML;
      counter++;
    }
  }
}

//initialization
function f_init() {
  //f_gatherPlayerData();
  counter = 0;

  //the method of getting players name on individual player page
  if ((document.location.href.toLowerCase().indexOf('playerid=') != -1)) {
    allH1 = document.getElementsByTagName('h1');
    for (i=0; i<allH1.length; i++) {
      PlayerName = allH1[i].innerHTML.replace(/^\s+|\s+$/g, '');
      PlayerName = PlayerName.substr(PlayerName.indexOf('</span>')+7, PlayerName.length);
      PlayerName = PlayerName.replace(/^\s+|\s+$/g, '');
      PlayerName = PlayerName.substr(0, PlayerName.indexOf(' <span>'));
    }
  }

  //we go trough all links
  for (i=0; i < allAs.length; i++) {
    //that refer to player and gather player data
    if (allAs[i].href.indexOf('/Club/Players/Player.aspx?playerId=') != -1) {
      f_gatherPlayerData(allAs[i].innerHTML, counter);
      counter++;
    }
  }

  counter = 0;
  //we walk trough all divisions
  for (i=0; i < allDivisions.length; i++) {
    //and get player data for each player (we'll needed it to uniqly define Players look)
    if (allDivisions[i].className.match("playerInfo")) {
      if ((document.location.href.toLowerCase().indexOf('teamid=') != -1)) {
        PlayerName = allDivisions[i].innerHTML.substring(allDivisions[i].innerHTML.indexOf('title=')+7, allDivisions[i].innerHTML.indexOf('title=')+40);
        PlayerName = PlayerName.substring(0, PlayerName.indexOf('">'));
      }
      f_gatherPlayerData(PlayerName, counter);
      counter++;
    }
  }

  f_set_new_avatar();
}

f_init();