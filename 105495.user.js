// ==UserScript==
// @name           Twilight Heroes Adventure Script (version 3.5.1)
// @namespace      www.twilightheroes.com
// @description    Autoadventuring for TH
// @include        *twilightheroes.com/fight.php*
// @include        *twilightheroes.com/training.php
// ==/UserScript==


//   This is the improved version of Heathers AA script without all the snide
//   remarks and a little more cleaned up as well as some new features and deletion
//   of annoying old ones, there are 2 things you may want to change, the strategies
//   which are the first function below and it has intructions on how to use it, and
//   the noncombat choices which is the second function (ctrl-f "getNextButton")

//set to 'false' if you don't want to be able to use the script with the keyboard
var allow_key_control = true;
//'t' to edit turns, 'h' to edit hp, 'p' to edit pp, tab to change fight choice, enter to start, escape to stop

//set to 'false' if you don't want the Heroes' Guild to warn you about 77 Habits at level 5
var warn_about_77_habits = true;

//set to 'true' if you want to use the PP limits when adventuring
var use_pp_limits = false;

function generateStratList()
{
  var stratList = new Array();
  //List of attack types, any string Specification string. Each attack is
  // seperated by a semicolon and if there is a skill use the id follows the S.
  //A = normal attack
  //S:ID = use a skill with the appropriate ID following the colon. If none is specified
  //     it will default to the last skill used (if possible)
  //IS:ID = perform the attack a specific number of times and then just use
  //   attack. Right now IS must be the only option if its being used so you
  //   can't put something like 'IS:152;A;IS:133' since you wouldn't know which
  //   IS block. I probably could change this in the future, but don't see much
  //     need... if you want to use a skill a (hopefully small) number of times, it
  //     is easy enough to do so with hard-coding a strategy.
  //I:ID = use the item having the ID specified after the colon. If none is specified
  //     it will default to the last item used.
  //T:A = tame if the option exists, otherwise normal attack
  //T:S:ID = tame if the option exists, otherwise use the skill specified.
  //T:I:ID = tame if the option exists, otherwise use the item specified.
//There should be enough examples below that anyone can create their own
// strategies. If you're unable to come up with the right encoding for a strategy
// that you want to use (and it is consistent - no 'do this against this enemy, and
// something else against other enemies... that isn't available yet) ask someone
// in chat or post a request in the forums on the greasemonkey thread.
//If you don't want to use any of these specific example strategies, simply comment
// out the strategy that isn't desired to list. (This means simply inserting the
// characters '//' at the beginning of the line. Likewise, 'uncommenting' would be
// removing the '//' from the beginning of the line.) If you want to use one of the
// strategies which are currently not active, uncomment them.
//note: I've removed most of the strategies from this version, but left a handful as a template for creating
//  new strategies.
  stratList['3 Stars'] = 'I:881;I:883;I:882;T:A'; //3 black holes, then tame or attack
  stratList['5 Stars'] = 'I:881;I:883;I:882;I:879;I:880;A';//all 5 stars
  stratList['Tame, otherwise Bovine Charge To Death'] = 'T:S:52'; //nat only, self-explanatory
  stratList['3 Stars then $SKILL To Death'] = 'I:881;I;I;S'; //3 black holes, then use previous skill
  stratList['Mall of the cave bear for '] = 'IS:66';

  var htmlStrat = '\n<SELECT id="Strat" onchange="updateAttackControls();">';
  htmlStrat += '<OPTION VALUE="A">Attack Only</OPTION>';
  for(keys in stratList)
  {
    htmlStrat += '<OPTION VALUE="'+stratList[keys]+'">'+keys+'</OPTION>';
  }

  htmlStrat += '</SELECT>';
  htmlStrat += '\n<script>function updateAttackControls() {'+
    '\nvar strat = document.getElementById(\'Strat\');'+
    '\nvar actionstuff = strat[strat.selectedIndex].value.split(\';\');'+
    '\nvar possible = actionstuff[0].split(\':\');'+
    '\nif (possible[0] == \'IS\') {'+
    '\n document.getElementById(\'control\').innerHTML = \'<input type="text" maxlength="5" size="2" id="maxAttacks"> rounds then attack.\';'+
    '\n } else {              '+
    '\n document.getElementById(\'control\').innerHTML = \'\';'+
    '\n }'+
    '\n}'+
    '</script>'+
      '';
  return htmlStrat;
}

function getNextButton(nonCombatName)
{
  var nonComChoice = new Array();
  //again, for those who don't know programming: if the choice you prefer is on a
  // line beginning with "//" simply remove those characters from the start of thei
  // line, and add them to the beginning of the line containing the choice you don't
  // want. I've tried to simplify your choices by specifying the result of each choice
  // and also specifying which choice is currently selected - ie: not commented out.

  //nonComChoice["Crime Never Sleeps ... or Does It?"+"choice"] = "1"; //chips
  //nonComChoice["Crime Never Sleeps ... or Does It?"+"choice"] = "2"; //XP
  nonComChoice["Crime Never Sleeps ... or Does It?"+"choice"] = "3"; //HP
  nonComChoice["Crime Never Sleeps ... or Does It?"+"submitvalue"] = "Make your choice";

  //nonComChoice["All's Quiet on the Nearby Front"+"choice"] = "1"; //pipe
  nonComChoice["All's Quiet on the Nearby Front"+"choice"] = "2"; //XP
  //nonComChoice["All's Quiet on the Nearby Front"+"choice"] = "3"; //chips
  nonComChoice["All's Quiet on the Nearby Front"+"submitvalue"] = "Make your choice";

  //nonComChoice["Shall We Play A Game?"+"choice"] = "1"; //+str
  //nonComChoice["Shall We Play A Game?"+"choice"] = "2"; //+int
  //nonComChoice["Shall We Play A Game?"+"choice"] = "3"; //+ref
  nonComChoice["Shall We Play A Game?"+"choice"] = "4"; //fight
  nonComChoice["Shall We Play A Game?"+"common 4-choice"]=true;
  nonComChoice["Shall We Play A Game?"+"submitvalue"] = "Choose your form of action";

  //these default to the correct choice, so I didn't bother coding choices
  nonComChoice["Radioactive Death from Above!"+"submitvalue"] = "Fight or flight?";
  nonComChoice["Cat Food or Men?"+"submitvalue"] = "Pick one";
  nonComChoice["Doggone It"+"submitvalue"] = "Should you stay or should you go?";

  //nonComChoice["Pick Yer Poison"+"choice"] = "1"; //Gingerette Black
  nonComChoice["Pick Yer Poison"+"choice"] = "2"; //Krakatoa Punch
  //nonComChoice["Pick Yer Poison"+"choice"] = "3"; //No time
  //nonComChoice["Pick Yer Poison"+"dwts"] = true;
  nonComChoice["Pick Yer Poison"+"submitvalue"] = "What do you do?";

  //nonComChoice["Trapped!"+"choice"] = "1"; //bricks
  //nonComChoice["Trapped!"+"choice"] = "2"; //fight
  nonComChoice["Trapped!"+"choice"] = "3"; //no time
  nonComChoice["Trapped!"+"dwts"] = true;
  nonComChoice["Trapped!"+"clfc"] = true;
  nonComChoice["Trapped!"+"submitvalue"] = "Which way to run?";

  nonComChoice["Gotta Move Quick"+"choice"] = "3"; //XP
  //nonComChoice["Gotta Move Quick"+"choice"] = "4"; //loot
  //nonComChoice["Gotta Move Quick"+"choice"] = "5"; //unlock rooftops
  nonComChoice["Gotta Move Quick"+"submitvalue"] = "Think Fast!"

  //nonComChoice["That Man's Father Is My Father's Son"+"choice"] = "1"; //XP
  //nonComChoice["That Man's Father Is My Father's Son"+"choice"] = "2"; //chips
  nonComChoice["That Man's Father Is My Father's Son"+"choice"] = "3"; //skip
  nonComChoice["That Man's Father Is My Father's Son"+"dwts"] = true;
  nonComChoice["That Man's Father Is My Father's Son"+"submitvalue"] = "What do you do?";

  nonComChoice["Glove Slap, Baby"+"choice"] = "1"; //fight knight
  //nonComChoice["Glove Slap, Baby"+"choice"] = "2"; //cheat
  //nonComChoice["Glove Slap, Baby"+"choice"] = "3"; //run, coward, run
  nonComChoice["Glove Slap, Baby"+"submitvalue"] = "What do you do?";

  nonComChoice["Just Deserts"+"choice"] = "1"; //shotgun
  //nonComChoice["Just Deserts"+"choice"] = "2"; //XP
  //nonComChoice["Just Deserts"+"choice"] = "3"; //unlock space station
  nonComChoice["Just Deserts"+"submitvalue"] = "Take Action";

  //nonComChoice["Aio, Quantitas Magna Frumentorum Est"+"choice"] = "1"; // less xp/chips
  nonComChoice["Aio, Quantitas Magna Frumentorum Est"+"choice"] = "2"; // XP/rep
  nonComChoice["Aio, Quantitas Magna Frumentorum Est"+"submitvalue"] = "What do you do?";

  //current choice: defaults to getting the villains, so no point in setting explicitly
  nonComChoice["Anonymity: Blessing or A Curse?"+"choice"] = "10"; //don't do the interview
  nonComChoice["Anonymity: Blessing or A Curse?"+"submitvalue"] = "Make your choice";
  nonComChoice["Anonymity: Blessing or A Curse?"+"dwts"] = true;

  nonComChoice["A Dilemma of the Horns"+"choice"] = "6"; // chips/rep
  //nonComChoice["A Dilemma of the Horns"+"choice"] = "7"; //dented hubcap
  //nonComChoice["A Dilemma of the Horns"+"choice"] = "8"; //turn spent no resulta
  nonComChoice["A Dilemma of the Horns"+"submitvalue"] = "What do you do?";

  ///nonComChoice["Shipping Clerk"+"choice"] = "1"; //caffeine
  //nonComChoice["Shipping Clerk"+"choice"] = "2"; //money/rep
  nonComChoice["Shipping Clerk"+"choice"] = "3"; //xp
  nonComChoice["Shipping Clerk"+"submitvalue"] = "What do you do?";

  nonComChoice["Forgot to Mention the Crystal Skulls"+"choice"] = "5"; //fight
  //nonComChoice["Forgot to Mention the Crystal Skulls"+"choice"] = "6"; //lustrous liquid
  //nonComChoice["Forgot to Mention the Crystal Skulls"+"choice"] = "7"; //aqua melior
  nonComChoice["Forgot to Mention the Crystal Skulls"+"submitvalue"] = "Make your choice";

  //nonComChoice["Behind Door Number Three ..."+"choice"] = "1"; //black flakes
  //nonComChoice["Behind Door Number Three ..."+"choice"] = "2"; //green residue
  //nonComChoice["Behind Door Number Three ..."+"choice"] = "3"; //greyish scobs
  nonComChoice["Behind Door Number Three ..."+"choice"] = "4"; //skip
  nonComChoice["Behind Door Number Three ..."+"dwts"] = true;
  nonComChoice["Behind Door Number Three ..."+"clfc"] = true;
  nonComChoice["Behind Door Number Three ..."+"common 4-choice"]=true;
  nonComChoice["Behind Door Number Three ..."+"submitvalue"] = "Go with the plan";


  if(nonCombatName && nonCombatName.match(/and the Chocolate Factory/gi))
  {
    nonComChoice[nonCombatName+"choice"] = "1511"; //sour coating
    //nonComChoice[nonCombatName+"choice"] = "1512"; //candy shell
    //nonComChoice[nonCombatName+"choice"] = "1513"; //chocolate "chip"
    //nonComChoice[nonCombatName+"choice"] = "870"; //razzberry sticker
    nonComChoice[nonCombatName+"submitvalue"] = "Pick your prize";
  }


  //Buy item in Teeter
  //nonComChoice["An All-Night Toy Stand"+"choice"] = "1029"; //dumbbell
  //nonComChoice["An All-Night Toy Stand"+"choice"] = "1030"; //electronic crossword
  //nonComChoice["An All-Night Toy Stand"+"choice"] = "1031"; //juggling pins
  nonComChoice["An All-Night Toy Stand"+"choice"] = "1514"; //RNG swing
  //nonComChoice["An All-Night Toy Stand"+"choice"] = "0"; //Don't buy anything
  nonComChoice["An All-Night Toy Stand"+"submitvalue"] = "It's Your Move";


  nonComChoice["San Amigos"+"choice"] = "329"; //Fight Thunder
  //nonComChoice["San Amigos"+"choice"] = "330"; //Fight Lightning
  //nonComChoice["San Amigos"+"choice"] = "331"; //Fight Rain
  //nonComChoice["San Amigos"+"choice"] = "0"; //Big Trouble effect
  nonComChoice["San Amigos"+"submitvalue"] = "Find Big Trouble in Little Chinatown";


  nonComChoice["To Catch a Thief"+"choice"] = "1531"; //peacock vase
  //nonComChoice["To Catch a Thief"+"choice"] = "1532"; //serpent amulet
  //nonComChoice["To Catch a Thief"+"choice"] = "1533"; //panther amulet
  //nonComChoice["To Catch a Thief"+"choice"] = "1534"; //turtle amulet
  //nonComChoice["To Catch a Thief"+"choice"] = "1535"; //herbal remedy
  nonComChoice["To Catch a Thief"+"submitvalue"] = "Reward Thyself";


  //nonComChoice["Rain on Your Parade"+"choice"] = "314"; //firecracker
  nonComChoice["Rain on Your Parade"+"choice"] = "414"; //rainwater
  //nonComChoice["Rain on Your Parade"+"choice"] = "0"; //xp
  nonComChoice["Rain on Your Parade"+"submitvalue"] = "Find your path";


  //Part of bayside quest
  nonComChoice["A Joyous (but Properly Restrained) Reunion"+"choice"] = "1"; //Bass-O-Matic 77
  //nonComChoice["A Joyous (but Properly Restrained) Reunion"+"choice"] = "2"; //2500 chips
  nonComChoice["A Joyous (but Properly Restrained) Reunion"+"submitvalue"] = "Make Your Choice";


  //Part of Zion quest, I reccomend not using this because your next adventure will still be in Downtown
  //nonComChoice["Two Paths Diverged in a Darkened Street"+"choice"] = "1"; //Longer path to Zion building
  nonComChoice["Two Paths Diverged in a Darkened Street"+"choice"] = "2"; //Open Zion's Tears building
  //nonComChoice["Two Paths Diverged in a Darkened Street"+"submitvalue"] = "Make Your Choice";


  nonComChoice["Holdin' Everything but the Caulfield"+"choice"] = "1"; //protester
  //nonComChoice["Holdin' Everything but the Caulfield"+"choice"] = "2"; //officer
  //nonComChoice["Holdin' Everything but the Caulfield"+"choice"] = "3"; //XP and PP
  nonComChoice["Holdin' Everything but the Caulfield"+"submitvalue"] = "What do you do?";

  nonComChoice["Two Rioters Diverged in an Angry Protest"+"choice"] = "3"; //rioter
  //nonComChoice["Two Rioters Diverged in an Angry Protest"+"choice"] = "5"; //dissident
  //nonComChoice["Two Rioters Diverged in an Angry Protest"+"choice"] = "6"; //2 strength
  nonComChoice["Two Rioters Diverged in an Angry Protest"+"submitvalue"] = "What's your take?";

  nonComChoice["An All-Encampassing Rage"+"choice"] = "1"; //student
  //nonComChoice["An All-Encampassing Rage"+"choice"] = "2"; //raver
  nonComChoice["An All-Encampassing Rage"+"submitvalue"] = "Go go hero defenses";


  //nonComChoice["Intermission"+"choice"] = "1"; // caffeine
  //nonComChoice["Intermission"+"choice"] = "2"; //chips
  nonComChoice["Intermission"+"choice"] = "3"; //XP
  nonComChoice["Intermission"+"submitvalue"] = "Pick Your Exit";


  nonComChoice["Two Paths Diverged in a Prehistoric Wood"+"choice"] = "1"; // fight if the pegasus option doesn't exist
  //nonComChoice["Two Paths Diverged in a Prehistoric Wood"+"choice"] = "2"; //verse of the dodo
  //nonComChoice["Two Paths Diverged in a Prehistoric Wood"+"choice"] = "3"; //seal o' canth
  nonComChoice["Two Paths Diverged in a Prehistoric Wood"+"submitvalue"] = "What do you do?";

  var nextButton;
  if (nonCombatName != null)
  {
    var datum = document.getElementsByName('choice');
    if(nonComChoice[nonCombatName+"dwts"])
    {
      GM_setValue('turnsLeft',parseInt(GM_getValue('turnsLeft',0))+1);
    }
    var radiochoice;
    if(datum.length == 1)
    {
      radiochoice = find('.//input[@type="radio" and @name="itemid" and @value="'+nonComChoice[nonCombatName+"choice"]+'"]');
      if(radiochoice == null)
      {
        radiochoice = find('.//input[@type="radio" and @name="foe" and @value="'+nonComChoice[nonCombatName+"choice"]+'"]');
      }
    } else {
      radiochoice = find('.//input[@type="radio" and @name="choice" and @value="'+nonComChoice[nonCombatName+"choice"]+'"]');
    }
    if(nonComChoice[nonCombatName+"clfc"])
    {
      //slight change... just flagging which encounters to use the 'final option' with
      datum[datum.length-1].checked=true;
      if((datum.length<3)&&(nonComChoice[nonCombatName+"dwts"]))
      {
        GM_setValue('turnsLeft',parseInt(GM_getValue('turnsLeft',0))-1);
      }
    }
    //this should automatically choose a fourth choice. I hope. It works in the castle, so I'm guessing it'll work on the specials...
    if((datum.length>3)&&(!nonComChoice[nonCombatName+"common 4-choice"]))
    {
      GM_log(" found 4-choice adventure, choosing "+datum[3].value);
      datum[3].checked=true;
    } else if(radiochoice != null)
    {
      radiochoice.checked=true;
    }
    //this following line should allow choice-non-combats that result in combat to
    //   use the same combat strategies, as it should refresh the round count
    GM_setValue('roundNumber',-1);
    nextButton=find('.//input[@type="submit" and @value="'+nonComChoice[nonCombatName+"submitvalue"]+'"]');
  } else {
    var qqq=document.getElementsByName("pickwhich").length;
    var strategy = GM_getValue('selectedStrat','A').split(';');
    var round =(GM_getValue('roundNumber', 0)>=strategy.length?strategy.length-1:GM_getValue('roundNumber', 0));
    //--round;
    round=((round<0)?0:round);
    GM_log(round);
    var selectedAction = strategy[round].split(':');
    if(selectedAction[0]=='T')
    {
      nextButton=find('.//input[@type="submit" and contains(@value,"Tame the Animal")]');
      if(!nextButton)
      {
        if(selectedAction[1])
        {
          selectedAction[0]=selectedAction[1];
        } else {
          selectedAction[0]='A';
        }
        if(selectedAction.length>2)
        {
          selectedAction[1]=selectedAction[2];
        }
      }
    }
    if(!selectedAction[1])
    {
      selectedAction[1] = -666;
    }
    if(selectedAction[0]=='A')
    {
      nextButton=find('.//input[@type="submit" and contains(@value,"Attack")]');
    } else if(selectedAction[0]=='S')
    {
      nextButton=find('.//input[@type="submit" and contains(@value,"Skill")]');
      if(!Select_Value_Set_Name('pickwhich',qqq-2,selectedAction[1]))
      {
        nextButton=find('.//input[@type="submit" and contains(@value,"Attack")]');
      }
    } else if(selectedAction[0]=='IS')
    {
      var currentRound = (GM_getValue('roundNumber',0) < 0? 0:GM_getValue('roundNumber',0));
      var attacksLeft = GM_getValue('maxAttacks',0) - (currentRound);
      if(attacksLeft > 0)
      {
        nextButton=find('.//input[@type="submit" and contains(@value,"Skill")]');
        if(!Select_Value_Set_Name('pickwhich',qqq-2,selectedAction[1]))
        {
          nextButton=find('.//input[@type="submit" and contains(@value,"Attack")]');
        }
      } else {
        nextButton=find('.//input[@type="submit" and contains(@value,"Attack")]');
      }
    } else if(selectedAction[0]=='I')
    {
      nextButton=find('.//input[@type="submit" and contains(@value,"Item")]');
      if(!Select_Value_Set_Name('pickwhich',qqq-1,selectedAction[1]))
      {
        nextButton=find('.//input[@type="submit" and contains(@value,"Attack")]');
      }
    }
  }
  return nextButton;
}

function Select_Value_Set(SelectName, Value)
{
//just sets the selected strategy to the last strategy used
  var SelectObject = document.getElementById(SelectName);
  for(index = 0; index < SelectObject.length; index++)
  {
    if(SelectObject[index].value == Value)
    {
      SelectObject.selectedIndex = index;
    }
  }
}

function Select_Value_Set_Name(SelectName,which, Value)
{
//changes drop-down selection box values for item/skill use if Value is
//non-negative. (negative Value is a flag to do nothing)
  if(Value<0)
  {
    return true;
  }
  var SelectObject = document.getElementsByName(SelectName)[which];
  var found = false;
  for(index = 0; index < SelectObject.length; index++)
  {
    if(SelectObject[index].value == Value)
    {
      SelectObject.selectedIndex = index;
      found = true;
    }
  }
  return found;
}

function updateAttackControls()
{
  var strat = document.getElementById('Strat');
  var actionstuff = strat[strat.selectedIndex].value.split(';');
  var possible = actionstuff[0].split(':');
  if(possible[0] == 'IS')
  {
    var currentRound = (GM_getValue('roundNumber',0) < 0? 0:GM_getValue('roundNumber',0));
    var attacksLeft = GM_getValue('maxAttacks',0) - (currentRound);
    attacksLeft = (attacksLeft < 0?0:attacksLeft);
    document.getElementById('control').innerHTML =
                '<input type="text" maxlength="5" size="2"'+
                ' id="maxAttacks" '+
                (GM_getValue('maxAttacks',0)!=0?'value="'+
                GM_getValue('maxAttacks',0)+'"':'value="0"')+
                '> rounds then attack.'+
                ' <br> rounds for skill use left : '+attacksLeft;
  } else {
    document.getElementById('control').innerHTML = '';
  }
}

function acb(x)
{
  var a,b,c,d,e;
  a=parseInt(localStorage.getItem("chp"));
  b=parseInt(localStorage.getItem("thp"));
  c=parseInt(localStorage.getItem("lpp"));
  d=parseInt(localStorage.getItem("cpp"));
  e=parseInt(localStorage.getItem("hpp"));
  GM_log(a+':'+b+';'+c+':'+d+':'+e);
  if((a>=b)&& (use_pp_limits ? ((c<=d)&&(d<=e)) : 1))
  {
    x.click();
  } else {
    shutDown();
  }
}

function sfb()
{
  var linkk = document.location.href;
  var url1;
  if(linkk.match(/www/gi))
  {
    url1 = "http://www.twilightheroes.com/nav.php";
  } else {
    url1 = "http://twilightheroes.com/nav.php";
  }
  GM_xmlhttpRequest({
    method: "GET",
    url:  url1,
    headers: {"User-Agent": navigator.userAgent },
    onload: function(r) {
    var rsp = r.responseText;
    var pat = /(\d+)\/\d.*?(\d+)\/\d/;
    if (!r.responseXML)
        r.responseXML = new DOMParser().parseFromString(rsp,"text/xml");
    var cfv = rsp.match(pat);
    localStorage.setItem("chp",cfv[1]);
    localStorage.setItem("cpp",cfv[2]);}});
}

function stepToNextRound()
{
  var nonComName = getNonCombatName();
  var nextButton = getNextButton(nonComName);
  if(getNonCombatName())
  {
    acb(nextButton);
  } else {
    var strat = document.getElementById('Strat');
    var h=document.getElementsByName('hpstring')[0].value;
    var p=document.getElementsByName('ppstring')[0].value;
    localStorage.setItem("chp",h);
    localStorage.setItem("cpp",p);
    acb(nextButton);
  }
}

function stepToNextCombat()
{
  var searchy = find('.//td[contains(.,"Patrol again")]');
  if(searchy != null)
  {
    var linkk = find('.//a',searchy);
    localStorage.setItem("gbt",linkk);
    var strat = document.getElementById('Strat');
    if(strat[strat.SelectedIndex])
    {
      GM_setValue('selectedStrat',strat[strat.SelectedIndex].value);
    }
  } else {
    GM_setValue('roundNumber',-1);
    //window.location = linkk;
  }
  window.location = linkk;
}

function endOfTurn()
{
  var searchy = find('.//td[contains(.,"Patrol again")]');
  if(searchy != null)
  {
    var linkk = find('.//a',searchy);
    if(linkk != null)
    {
      return true;
    }
  }
  return false;
}

function idEncounter()
{
  var combatIndicator = find('.//h1[1]');
  var nonCombatIndicator = find('.//h2[1]');
  var type = null;
  if(combatIndicator != null)
  {
    if('Combat!' == combatIndicator.innerHTML)
    {
      type = 'combat'
    }
  }
  if(nonCombatIndicator != null)
  {
    if(endOfTurn())
    {
      GM_log(" found type non-combat "+nonCombatIndicator.innerHTML);
      type='non-combat';
    } else {
      GM_log(" found type choice-non-combat "+nonCombatIndicator.innerHTML);
      type='choice-non-combat';
    }
  }
  return type;
}

function getNonCombatName()
{
  var nonCombatIndicator = find('.//h2[1]');
  var nonname;
  if(nonCombatIndicator != null)
  {
    nonname = nonCombatIndicator.innerHTML;
  }
  return nonname;
}



var imageTD = find('.//img[@border="3"]/..');
var searchy;
if(warn_about_77_habits)
{
  searchy = find('.//body[contains(.,"You are currently level 5.")]');
}
if(imageTD)
{
  var victory = /Victory!/;
  var loss = / /;
  var last = find('./*[last()]',imageTD);
  var weWon = victory.exec(document.body.innerHTML);
  var advTable = document.createElement("table");
  var advRow = document.createElement("tr");
  var advCell = document.createElement("td");
  var buttontype= null;
  var displayRound = null;
  if(endOfTurn())
  {
    GM_setValue('turnsLeft',GM_getValue('turnsLeft',0)-1);
    var round = GM_getValue('roundNumber',-1);
    displayRound= round + 1;
    GM_setValue('roundNumber', -1);
    if(GM_getValue('running',false)&&(GM_getValue('turnsLeft',false) > 0))
    {
      GM_setValue('delayID',setTimeout(stepToNextCombat,500));
    } else {
      GM_setValue('running',false);
      GM_setValue('turnsLeft',(GM_getValue('turnsLeft',0) < 2? 1:GM_getValue('turnsLeft',0)));
    }
  } else {
    var round = GM_getValue('roundNumber',-1);
    GM_setValue('roundNumber', round + 1);
    displayRound= GM_getValue('roundNumber', -1);
  }
  if(GM_getValue('turnsLeft',false) <= 0)
  {
    GM_setValue('running',false);
  }
  if(GM_getValue('running',false))
  {
    buttontype = '<br><input type="button" id="stop" value="Stop">';
  } else {
    buttontype = '<br><input type="button" id="start" value="Click to Start">';
  }
  var x,y,z;
  x= localStorage.getItem("thp");
  y= localStorage.getItem("lpp");
  z= localStorage.getItem("hpp");
  var pp = use_pp_limits ? ('and PP is between '
        +'<input type="text" style="width:34px" maxlength="4" id="bcol" value="'
        +(y?y:'1')+'">and '
        +'<input type="text" style="width:34px" maxlength="4" id="ccol" value="'
        +(z?z:'1')+'"><br>') : '<br>';
  advCell.innerHTML=  'Round:   '
          +displayRound
          +'<br> Adventure <input type="text" maxlength="3" size="2" id="turns" value="'
          +(GM_getValue('turnsLeft',false)?GM_getValue('turnsLeft',false):'0')+'">times.<br>'
          +'Adventure when HP exceeds '
          +'<input type="text" style="width:34px" maxlength="4" id="acol" value="'
          +(x?x:'100')+'"> ' + pp
          +generateStratList()+'<div id="control"></div>'
          +buttontype;
  advRow.insertBefore(advCell,null);
  advTable.insertBefore(advRow,null);
  imageTD.insertBefore(advTable,null);
  Select_Value_Set('Strat',GM_getValue('selectedStrat','I:881;I:881;I:881;T')); //Default to optimal if there is no selected strat.
  updateAttackControls();
  if(allow_key_control)
  {
    document.addEventListener("keydown", catchkey, true);
  }
  if(document.getElementById("start"))
  {
    document.getElementById("start").addEventListener("click",rockIt,true);
  }
  if(document.getElementById("stop"))
  {
    document.getElementById("stop").addEventListener("click",shutDown,true);
  }
  if((weWon == null)&&(GM_getValue('running',false)))
  {
    GM_setValue('delayID',setTimeout(stepToNextRound,400));
  }
} else if(warn_about_77_habits && searchy)
{
  var x = document.createElement("h2");
  var y = find('.//h1[1]');
  x.innerHTML = '<a href="novak.php" style="text-decoration:none"><font size="5">Click to get 77 Habits!</font></a>';
  y.insertBefore(x,null);
}

function catchkey(e)
{
  var keycode;
  if(window.event)
  {
    keycode = window.event.keyCode;
  } else if(e)
  {
    keycode = e.which;
  }
  switch(keycode)
  {
    case 9: //tab
      var strat = document.getElementById('Strat');
      strat.selectedIndex += 1;
      strat.focus();
      break;
    case 13: //enter
      rockIt();
      break;
    case 27: //escape
      shutDown();
      break;
    case 72: //h
      var hp = document.getElementById('acol');
      hp.focus();
      //hp.select();
      break;
    case 80: //p
      var pp = document.getElementById('ccol');
      pp.focus();
      break;
    case 84:
      var turns = document.getElementById('turns');
      turns.focus();
    default:
      break;
  }
}

function find(xp,location)
{
  if(!location)
  {
    location = document;
  }
  var temp = document.evaluate(xp, location, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
  return temp.singleNodeValue;
}

function rockIt()
{
  GM_setValue("running", true);
  var strat = document.getElementById('Strat');
  GM_setValue('selectedStrat',strat[strat.selectedIndex].value);
  GM_setValue('turnsLeft',document.getElementById("turns").value);
  sfb();
  GM_setValue('roundNumber',-1);
  if(document.getElementById("maxAttacks"))
  {
    GM_setValue('maxAttacks',document.getElementById("maxAttacks").value);
  }
  var attackButton = find('.//input[@type="submit" and contains(@value,"Attack")]');
  var a,b,c,d,e;
  localStorage.setItem("thp",document.getElementById("acol").value);
  if(use_pp_limits)
  {
    localStorage.setItem("lpp",document.getElementById("bcol").value);
    localStorage.setItem("hpp",document.getElementById("ccol").value);
  }
  a=parseInt(localStorage.getItem("chp"));
  b=parseInt(localStorage.getItem("thp"));
  c=parseInt(localStorage.getItem("cpp"));
  d=parseInt(localStorage.getItem("lpp"));
  e=parseInt(localStorage.getItem("hpp"));
  if((a>b) && (use_pp_limits ? ((c>d)&&(c<e)) : 1))
  {
    if(endOfTurn())
    {
      stepToNextCombat();
    } else {
      stepToNextRound();
    }
  }
}

function shutDown()
{
  GM_setValue("running", false);
  GM_setValue('roundNumber', -1);
  var strat = document.getElementById('Strat');
  if(strat)
  {
    GM_setValue('selectedStrat',strat[strat.selectedIndex].value);
  }
  if(GM_getValue('delayID'))
  {
    clearTimeout(GM_getValue('delayID'));
  }
}