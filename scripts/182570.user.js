// ==UserScript==
// @name           Plater's AutoAdventure Again
// @namespace      http://kol.coldfront.net/thekolwiki/index.php/User:Plater
// @description    (Ver 2.3) Attempts to autocontinue after each combat adventure AND choice adventure (gives limited choice adventure descriptions)
// @include        http://*kingdomofloathing.com/fight.php*
// @include        http://*kingdomofloathing.com/charpane.php*
// @include        http://*kingdomofloathing.com/account.php*
// @include        http://*kingdomofloathing.com/topmenu.php*
// @include        http://*kingdomofloathing.com/choice.php*
// @require                                 http://images.kingdomofloathing.com/scripts/jquery-1.3.1.min.js
//
// @copyright 2009+, Plater (http://www.platertopia.com/) 
// ==/UserScript==
//
// Version 0.1        02/20/2009        Beta(date unsure)
// Version 1.0        12/20/2010        First public release!
// Version 1.1        12/23/2010        With combat macros being badass, I have removed the auto-attack portion
//                                                                                                                        This makes the script name kind of a mis-nomer.
//                                                                                                                        Switched the way turn count is saved, uses enter key and html not alert()
// Version 2.0        02/04/2011        Moved the location of charpane item up towards top and trimmed up
//                                                                                                                        Fixed account menu items to match new scheme(sort of) => generates an exception in the jQuery object used by kol
// Version 2.1        02/04/2011        Fixed the exception by giving LI an id, but then CDM returns the "you managed to click a nonexistant tab go you!"
//                                                                                                                        So set a interval to check for his fail result and load my data. In future, may drop JQuery
// Version 2.2        09/28/2011        No idea what all has happened in the last few months, but I've stubbed a bunch of stuff in.
//                                                                                                                        Changed the name of the script to better reflect what it currently does
// Version 2.3        02/02/2012        Trying to fix the save format to utf8(gChrome complains??) and also started adding in some descriptive text for choice adventures
//        TODO: Make the choice adventure thing be its own script (or scrap it for the one already in the GM list for kol)
//        TODO: Make the wait-timeouts settable
//http://wiki.greasespot.net/@grant
/*This code will save a jQuery reference (into this the script's global scope when running in the grant none mode), while removing it from window (the content global scope) and restoring anything originally stored there. */
this.$ = this.jQuery = jQuery.noConflict(true);
//YNRD
// /html/body/center[2]/table[1]
var prekeyname="autocombat_";
var BadCharName="(Unknown)";
var BadTurnsCount=-1;
var tname="plater_div_name";
var accountpagebaseid="plater_autocombat";
var DefaultScriptIcon="https://static.addons.mozilla.net/en-US/firefox/images/addon_icon/748.png?modified=1295994076";//"http://youngpup.net/z_dropbox/greasespot_favicon.ico";
//These things should become user settable?
var TimeToWaitToProccess=750;//Time to wait before doing fight.php stuff
var TimeToWaitAttack=1000;//time to wait before "pressing" attack button
var TimeToWaitAdventureAgain=1000;//time to wait before "clicking" adventure again
//When people go to steal the acount/options page thing they'll need this: (being egotistical about it happening)02/07/2011
var ScriptIcon="https://static.addons.mozilla.net/en-US/firefox/images/addon_icon/748.png?modified=1295994076";//"http://youngpup.net/z_dropbox/greasespot_favicon.ico";
//And this func: function InsertTableIntoAccountInterface(tabID,tabTitleString, tabInnerObj)
//And this func: function LoadOurOptionsTab(tabID,tabTitleString,tabInnerObj)
///Fluctuations
var charName=BadCharName;
var charTurns=BadTurnsCount;
var charFindTime=0;
//Notes from GM website
//To simulate a "click" on object el that used AddEventListener()
//                var evt = document.createEvent("HTMLEvents");
//                evt.initEvent("click", true, true);
//                el.dispatchEvent(evt);
//
// Assume "a" contains a reference to an <a> you want to "click"
//                location.assign( "javascript:" + a.getAttribute("onclick") + ";void(0)" );
// To use the href="javascript:" type links:
//                location.assign( a.getAttribute('href') );
/**
 * ReplaceAll by Fagner Brack (MIT Licensed)
 * Replaces all occurrences of a substring in a string
 */
String.prototype.replaceAll = function( token, newToken, ignoreCase ) 
{
  var _token;
  var str = this + "";
  var i = -1;
  if ( typeof token === "string" ) 
  {
      if ( ignoreCase ) 
      {
          _token = token.toLowerCase();
          while( (i = str.toLowerCase().indexOf(token, i >= 0 ? i + newToken.length : 0) ) !== -1) 
          {        str = str.substring( 0, i ) + newToken + str.substring( i + token.length );        }
      } 
      else {        return this.split( token ).join( newToken );        }
  }
        return str;
};
if(!String.prototype.trim) {  String.prototype.trim = function () {    return this.replace(/^\s+|\s+$/g,'');  };}
if(!String.prototype.trim) {        String.prototype.endsWith = function(suffix) {            return this.indexOf(suffix, this.length - suffix.length) !== -1;        };}
//Switch on which page we're looking at
switch(document.location.pathname) 
{
        case "/account.php":
                //Set the images smaller
                var xp="/html/body/div[@id='options']/div[@id='tabs']/ul/li/a/img";
                var ulImages=findSet(xp);//UL listed but not CE listed?...i hate my sense of humor
                for (var i = 0; i < ulImages.snapshotLength; i++) 
                {
                        var actualImg = ulImages.snapshotItem(i);
                        actualImg.style.width="16px";
                        actualImg.style.height="16px";
    }
    //end smaller images
                charName=GetCharNameFromTop();//GetCharacterName();
                charTurns=GetCharTurnsFromTop();//GetCharacterTurns();
                if(charName==BadCharName)ReportError("account-found charName: '"+charName+"'");
                if(charTurns==BadTurnsCount)ReportError("account-found charTurns: "+charTurns+"");
                prekeyname=charName+"_"+prekeyname;
                InsertIntoAct();//currently, does things
        break;
        case "/topmenu.php":
        break;
        case "/charpane.php":
                //Its the charpane, it should be fine to get the name from here.
                setTimeout(function()
                {
                        if(document.body!=undefined)document.body.style.fontSize="8pt";
                        charName=RipName(document,0);
                        charTurns=RipTurns(document);
                        prekeyname=charName+"_"+prekeyname;
                        if(charName==BadCharName)ReportError("Self-found charName: '"+charName+"'");
                        if(charTurns==BadTurnsCount)ReportError("Self-found charTurns: "+charTurns+"");
                        
                        InsertIntoCharPane();
                        UpdateTopObject();//by doing this here, we should be ensuring that there's always a name and turn count?
                },
                10);
                //target=mainpane
                //get all images and shrink the one that is the horde?
                var img_find = document.getElementsByTagName("img");
                for(var i=0;i<img_find.length;i++)
                {
                        if(img_find[i].src.indexOf("horde")!=-1){img_find[i].style.width="56px";img_find[i].style.height="50px";}
                }
        break;
        case "/choice.php":
                //for choice also do a thing that ID's it
                var aryObj=document.getElementsByName('whichchoice');
                var ChoiceNumber=(aryObj.length>0)?aryObj[0].value:-1;
                var words="ChoiceAdventure="+((ChoiceNumber>-1)?ChoiceNumber:"???");//document.forms[0].elements['whichchoice'];
                //words=document.location
                var chNode=document.body.childNodes[0];
                var myNode=document.createTextNode(words);
                document.body.insertBefore(myNode,chNode);
                ProcessChoice(ChoiceNumber);
                //there is no "break;" brecause I want it to also do what the fight script stuff does
                
        case "/fight.php":
                charName=GetCharNameFromTop();//GetCharacterName();
                charTurns=GetCharTurnsFromTop();//GetCharacterTurns();
                if(charName==BadCharName)ReportError("fight-found charName: '"+charName+"'");
                if(charTurns==BadTurnsCount)ReportError("fight-found charTurns: "+charTurns+"");
                prekeyname=charName+"_"+prekeyname;
                //setTimeout(function(){DoFight(charName,charTurns);},TimeToWaitToProccess);//changed to DoFight2() on 05/17/2011
                //setTimeout(function(){DoFight2();},TimeToWaitToProccess);
                setTimeout(DoFight3,TimeToWaitToProccess);
        break;
        default:
}
function ProcessChoice(ChoiceNumber)
{
        if(ChoiceNumber==1)//(doesn't exist)
        { }
        else if(ChoiceNumber==15)//Yeti Nother Hippy
        { CreateChoiceExpl(["item: eXtreme mittens","item: eXtreme scarf","meat"]); }
        else if(ChoiceNumber==16)//Saint Beernard
        { CreateChoiceExpl(["item: snowboarder pants","item: eXtreme scarf","meat"]); }
        else if(ChoiceNumber==17)//Generic Teen Comedy Snowboarding Adventure
        { CreateChoiceExpl(["item: eXtreme mittens","item: snowboarder pants","meat"]); }
        else if(ChoiceNumber==18)//A Flat Miner
        { CreateChoiceExpl(["item: miner's pants","item: 7-Foot Dwarven mattock","meat"]); }
        else if(ChoiceNumber==19)//100% Legal
        { CreateChoiceExpl(["item: miner's helmet","item: miner's pants","meat"]); }
        else if(ChoiceNumber==20)//See You Next Fall
        { CreateChoiceExpl(["item: miner's helmet","item: 7-Foot Dwarven mattock","meat"]); }
        else if(ChoiceNumber==22)//The Arrrbitrator
        { CreateChoiceExpl(['item: eyepatch','item: pants','meat']); }
        else if(ChoiceNumber==23)//Barrie Me at Sea
        { CreateChoiceExpl(['item: parrot','item: pants','meat']); }
        else if(ChoiceNumber==24)//Amatearrr Night
        { CreateChoiceExpl(['item: parrot','meat','item: eyepatch']); }
        else if (ChoiceNumber==26)//26 is A Three-Tined Fork
        { CreateChoiceExpl(['seal-clubber/turtletamer','pastamancer/saucerer','discobandit/accordian thief']); }
        else if (ChoiceNumber==28)//A Pair of Craters
        { CreateChoiceExpl(['(pastamancer gear)','(saucerer gear)']); }
        else if(ChoiceNumber==29)//The Road Less Visible
        { CreateChoiceExpl(['(Disco Bandit)','(Accordion Thief)']); }
        else if(ChoiceNumber==73)//Don't Fence Me In
        { CreateChoiceExpl(['stats: Muscle','item: white picket fence','item: piece of wedding cake or white rice']); }
        else if(ChoiceNumber==74)//The Only Thing About Him is the Way That He Walks
        { CreateChoiceExpl(['stats: Moxie','item: boxes of wine','item: mullet wig']); }
        else if(ChoiceNumber==75)//Rapido!
        { CreateChoiceExpl(['stats: Mysticality','item: jars of white lightning','item: white collar']); }
        else if(ChoiceNumber==77)//Minnesota Incorporeals
        { CreateChoiceExpl(['stats: Moxie','<b>Broken</b>->[Go for a solid]-><b>A Hustle Here, a Hustle There</b>->[Go for the 8-ball]']); }
        else if(ChoiceNumber==78)//Broken
        { CreateChoiceExpl(['[A Hustle Here, a Hustle There]','stats: Muscle']); }
        else if(ChoiceNumber==79)//A Hustle Here, a Hustle There
        { CreateChoiceExpl(['item: Spookyraven library key','stats: Mysticality']); }
        else if(ChoiceNumber==82)//One Nightstand: white 
        { CreateChoiceExpl(['wallet','stats: Muscle','Fight White nightstand']); }
        else if(ChoiceNumber==83)//One Nightstand: mahogany 
        { CreateChoiceExpl(['item: old coin purse','fight: Mahogany nightstand','Spookyraven Manor Quest Item']); }
        else if(ChoiceNumber==84)//One Nightstand: Ornate 
        { CreateChoiceExpl(['meat', 'stats: Mysticality','Lord Spookyraven\'s spectacles']); }
        else if(ChoiceNumber==85)//One Nightstand: Wooden 
        { CreateChoiceExpl(['stats: Moxie', 'ballroom key after top drawer','fight: remains of a jilted mistress']); }
        else if(ChoiceNumber==105)//Having a Medicine Ball
        { CreateChoiceExpl(['stats: Mysticality','choice: [Bad Medicine is What You Need](item choice) ','nothing <i>or</i> fight: The Guy Made Of Bees']); }
        else if(ChoiceNumber==111)//Malice in Chains
        { CreateChoiceExpl(['stats: Muscle','Muscle points or hp loss','fight: sleeping Knob Goblin Guard']); }
        else if(ChoiceNumber==123)//At Least It's Not Full Of Trash
        { CreateChoiceExpl(['Lose all HP','[Dvorak\'s Revenge]','Lose all HP']); }
        else if(ChoiceNumber==125)//No Visible Means of Support
        { CreateChoiceExpl(['Lose all HP','Lose all HP','Find Hidden City']); }
        else if(ChoiceNumber==140)//The Thin Tie-Dyed Line
        { CreateChoiceExpl(['item: water pipe bombs','stats: Moxie','combat: War Hippy drill sergeant']); }
        else if(ChoiceNumber==147)//Cornered!
        { CreateChoiceExpl(['(Opens The Granary for adventuring.)','(Opens The Bog for adventuring.)','***(Opens The Pond for adventuring.)']); }
        else if(ChoiceNumber==148)//Cornered Again!
        { CreateChoiceExpl(['***(Opens The Back 40 for adventuring.)','(Opens The Family Plot for adventuring.)']); }
        else if(ChoiceNumber==149)//How Many Corners Does this Stupid Barn Have!?
        { CreateChoiceExpl(['(Opens The Shady Thicket for adventuring.)','***(Opens The Other Back 40 for adventuring.)']); }
        else if(ChoiceNumber==153)//Turn Your Head and Coffin
        { CreateChoiceExpl(['stats: Muscle','meat','item: half-rotten brain']); }
        else if(ChoiceNumber==155)//Skull, Skull, Skull
        { CreateChoiceExpl(['stats: Moxie','meat','item: rusty bonesaw']); }
        else if(ChoiceNumber==157)//Urning Your Keep
        { CreateChoiceExpl(['stats: Mysticality','item: plus-sized phylactery','meat']); }
        else if(ChoiceNumber==163)//Melvil Dewey Would Be Ashamed
        { CreateChoiceExpl(['item: Necrotelicomnicon','item: Cookbook of the Damned','item: Sinful Desires']); }
        else if(ChoiceNumber==182)//Random Lack of an Encounter
        { CreateChoiceExpl(['(fight)','Penultimate Fantasy chest','(HP loss + stats)']); }        
        else if(ChoiceNumber==184)//That Explains All The Eyepatches
        { CreateChoiceExpl(['myst: drunk/{fight}','moxie: drunk/{item: shot of rotgut}','muscle: drunk/{item: shot of rotgut}']); }
        else if(ChoiceNumber==185)//Yes, You're a Rock Starrr
        { CreateChoiceExpl(['(bottles of plain booze)','(basic mixed drinks)','(fight or stats)']); }
        else if(ChoiceNumber==186)//A Test of Testarrrsterone
        { CreateChoiceExpl(['stats','drunk+stats', 'stats: Moxie']); }
        else if(ChoiceNumber==188)//The Infiltrationist
        { CreateChoiceExpl(['--frat outfit--','--mullet wig + briefcase--', '--frilly skirt + 3 hot wings']); }
        else if(ChoiceNumber==191)//Chatterboxing
        { CreateChoiceExpl(['Moxie points','(lose health or lose trinket)','Muscle points', 'Mysticality points + cold damage']); }
        else if(ChoiceNumber==197)//Somewhat Higher and Mostly Dry
        { CreateChoiceExpl(['{Sewer Tunnel}', 'combat: gsewer gator ','turn valve(lower water) <i>or</i> don\'t']); }
        else if(ChoiceNumber==198)//Disgustin' Junction
        { CreateChoiceExpl(['{Sewer Tunnel}', 'combat: giant zombie goldfish','raise gate <i>or</i> don\'t']); }
        else if(ChoiceNumber==330)//A Shark's Chum
        { CreateChoiceExpl(['stats: Muscle/Mysticality/Moxie', 'fight: hustled spectre']); }
        else if(ChoiceNumber==402)//Don't Hold a Grudge
        { CreateChoiceExpl(['stats: Muscle', 'stats: Mysticality','stats: Moxie']); }
        else if(ChoiceNumber==451)//Typographical Clutter
        {        CreateChoiceExpl(['item: left parenthesis','(lose meat, then gain meat)','item: plus sign','stats: Mysticality','effect: Teleportitis']);        }
        else if(ChoiceNumber==502)//502 is the damn aborral respite
        {
                var t1='<b>Follow the ruts</b>: You gain some Meat.<br/><b>Knock on the cottage door</b>: wooden stakes<br/><b>Talk to the hunter</b>: Tree\'s Last Stand';
                var t2='<b>March to the marsh</b>: mosquito larva<br/><b>Squeeze into the cave</b>: 300 Meat, tree-holed coin<br/><b>Go further upstream</b>: An Interesting Choice';
                var t3='<b>Follow the even darker path</b>: A Three-Tined Fork<br/><b>Investigate the dense foliage</b>: Spooky-Gro fertilizer<br/><b>Follow the coin</b>: With tree-holed coin: O Lith, Mon';
                CreateChoiceExpl([t1,t2,t3]);
        }
        else if(ChoiceNumber==503)//The Road Less Traveled
        {        CreateChoiceExpl(['meat', 'item: wooden stakes OR [Have a Heart]','[Tree\'s Last Stand]']);        }
        else if (ChoiceNumber==505)//Consciousness of a Stream
        { CreateChoiceExpl(['item: mosquito larva/spooky mushrooms','300meat+tree-holed coin','[An Interesting Choice]']); }
        else if (ChoiceNumber==506)//Through Thicket and Thinnet
        { CreateChoiceExpl(['[A Three-Tined Fork]','item: Spooky-Gro fertilizer','[O Lith, Mon]']); }
        else if(ChoiceNumber==523)//Death Rattlin'
        { CreateChoiceExpl(['meat','moxie/muscle/mysticallity stats, hp/mp heal','item: can of Ghuol-B-Gone™','(fight whelps based on +ML)']); }
        else if (ChoiceNumber==556)//More Locker Than Morlock
        { CreateChoiceExpl(['item: safety vest or item: miner\'s pants or item: 7-Foot Dwarven mattock','']); }
        
        /*****************************************************/
        /*****************************************************/
        /*
        else if (ChoiceNumber==570)
        {                DoWalkthroughFromAdventureChoice(ChoiceNumber);        }
        else if (ChoiceNumber==659 || ChoiceNumber==660 || ChoiceNumber==661 || ChoiceNumber==662 || ChoiceNumber==663)//these are the 3-way choice
        {                DoWalkthroughFromAdventureChoice(ChoiceNumber);        }
        else if (ChoiceNumber==665)//the maze
        {                DoWalkthroughFromAdventureChoice(ChoiceNumber);        }
        */
        /*****************************************************/
        /*****************************************************/
        
        else if(ChoiceNumber==579)//Such Great Heights
        { CreateChoiceExpl(['stats: Mysticality', 'item: the Nostril of the Serpent','+3 turns and extend buffs(once)']); }
        else if(ChoiceNumber==580)//The Hidden Heart of the Hidden Temple --(Stone)--All of them
        { CreateChoiceExpl(['stats: Muscle or item: ancient calendar fragment or +MP or [At Least It\'s Not Full Of Trash] or nothing', '[Confusing Buttons] or [Unconfusing Buttons]','stats: Moxie + effct: Poisoned']); }
        else if(ChoiceNumber==581)//Such Great Depths
        { CreateChoiceExpl(['item: glowing fungus', 'effect: Hidden Power','fight: clan of cave bars']); }
        else if(ChoiceNumber==582)//Fitting In
        { CreateChoiceExpl(['[Such Great Heights] (Get Nostril)', '[The Hidden Heart of the Hidden Temple]','[Such Great Depths]']); }
        else if(ChoiceNumber==584)//Unconfusing Buttons
        { CreateChoiceExpl(['[The Hidden Heart of the Hidden Temple (Stone)]', '[The Hidden Heart of the Hidden Temple (Sun)]','[The Hidden Heart of the Hidden Temple (Gargoyle)]','[The Hidden Heart of the Hidden Temple (Pikachutlotal)]']); }
        else if(ChoiceNumber==594)//A Lost Room
        { CreateChoiceExpl(['(Do this)','(Then do this)','(Do this third)','item: The Lost Glasses','item: The Lost Comb','item: The Lost Pill Bottle', '(Keep doing this)']); }
        else if(ChoiceNumber==670)//You Don't Mess Around with Gym
        { CreateChoiceExpl(['item: massive dumbbell','stats: Muscle','items: ','Ground Floor Access(with amulet of extreme..)','Leave(back to Out in the Open Source or back to castle map)']); }
        else if(ChoiceNumber==671)//Out in the Open Source
        { CreateChoiceExpl(['Ground Floor Access(with dumbbell)','stats: Mysticality','item: O\'RLY manual, item: open sauce','Goto: You Don\'t Mess Around with Gym']); }
        else if(ChoiceNumber==669)//The Fast and the Furry-ous
        { CreateChoiceExpl( [ 'Ground Floor Access(with titanium assault umbrella)', 'stats: Moxie', '(What is this?)', '(Leave?)']); }
        
}
function GetChoiceNames()
{
        var aryChoiceNames=new Array();
        var i=1;
        var thechoice=document.getElementsByName("choiceform"+i)[0];
        while(thechoice!=undefined)
        {                //now i have the form, cycle through child elements
                for(var cidx=0;cidx<thechoice.elements.length;cidx++)
                {
                        if(thechoice.elements[cidx]["type"]=="submit")        {                                aryChoiceNames.push(thechoice.elements[cidx].value);                        }
                }
                i++;
                thechoice=document.getElementsByName("choiceform"+i)[0];
        }
        return aryChoiceNames;
}
function CreateChoiceExplanation(t1,t2,t3,t4)
{
        var choice1=document.getElementsByName("choiceform1");
        var choice2=document.getElementsByName("choiceform2");
        var choice3=document.getElementsByName("choiceform3");
        var choice4=document.getElementsByName("choiceform4");
        var text1=CreateTinyDivWithHTMLContents(t1);
        var text2=CreateTinyDivWithHTMLContents(t2);
        var text3=CreateTinyDivWithHTMLContents(t3);
        var text4=CreateTinyDivWithHTMLContents(t4);
        if(choice1.length>0&t1!=undefined)choice1[0].appendChild(text1);
        if(choice2.length>0&t2!=undefined)choice2[0].appendChild(text2);
        if(choice3.length>0&t3!=undefined)choice3[0].appendChild(text3);
        if(choice4.length>0&t4!=undefined)choice4[0].appendChild(text4);
}
function CreateChoiceExpl(textarray)
{
        for(var i=1;i<=textarray.length;i++)
        {
                var t=textarray[i-1];
                var thechoice=document.getElementsByName("choiceform"+i);
                var thetext=CreateTinyDivWithHTMLContents(t);
                if(thechoice.length>0&t!=undefined)thechoice[0].appendChild(thetext);
        }
}
function CreateTinyDivWithHTMLContents(htmlcontents)
{
        var text1=document.createElement("div");
        if(text1!=undefined)
        {                text1.style.fontSize="8pt";                text1.innerHTML=(htmlcontents);        }
        return text1;
}
function ReportError(errstr)//Sneaky little function to make an entry in the error console
{        //As of 05/11/2012 this no longer works!
                //setTimeout("] "+errstr,0);
                //alert(errstr);
                GM_log(errstr);
}
function find(xp,location) 
{//Code to search for elements using XPath, (technically returns a node set, but singleNodeValue returns the exact object)
        if(!location)location = document;
        var temp = document.evaluate(xp, location, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        return temp.singleNodeValue;
}
function findSet(xp,location) 
{//Code to search for elements using XPath, returns a node set
        if(!location)location = document;
        var temp = document.evaluate(xp, location, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        return temp;
}
function EvalOnContentPage(source) 
{
  if ('function' == typeof source) // Check for function input.
  {// Execute this function with no arguments, by adding parentheses. One set around the function, required for valid syntax, and a
    source = '(' + source + ')();';  // second empty set calls the surrounded function.
  }
  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);// Insert the script node into the page, so it will run,
  document.body.removeChild(script);// and immediately remove it to clean up.
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RipName(baseDocument,OptionalCount)
{
        //for other pages: top.frames[1].document
        //for character page: document
        var retval=BadCharName;
        var StartTime=new Date();
        var TryCount=0;
        var Found=0;
        var xp="//a/b";
        if(OptionalCount==undefined)OptionalCount=0;
        
        var res=find(xp,baseDocument);
        if(res!=undefined)//ReportError("XPath victory! : "+OptionalCount);
        {                retval=res.innerHTML;                        }
        else
        {
                OptionalCount++;
                ReportError("RipName: XPath failed: "+OptionalCount);
                if(OptionalCount<15)setTimeout(function(){charName=RipName(document,OptionalCount);},100);
        }
        var EndTime=new Date();
        charFindTime=EndTime-StartTime;
        return retval;
}
function RipTurns(baseDocument)
{
        //stolen from Anarch => http://ashvin.21.googlepages.com
        var retval=BadTurnsCount;
        var rB=false;
        var docu=baseDocument;//top.frames[1].document;
        
        var xp="//img[contains(@src,'hourglass.gif')]/following-sibling::*/following-sibling::*"
        var res=find(xp,baseDocument);
        if(res!=undefined)
        {                retval = parseInt(res.innerHTML);        }
        else
        {                ReportError("RipTurns: XPath failed ");        }
        return retval;
}
function UpdateTopObject()
{
        var obj=top.document.getElementById(tname);
        if(obj!=undefined)
        {//edit it
                //ReportError("UpdateTopObject: Setting top object["+obj.id+"]");
                if((charName!=BadCharName)&&(charName!=""))        
                {                        obj.setAttribute("title",charName);                }
                else
                {                        ReportError("UpdateTopObject: bad charName");                }
                if((charTurns!=BadTurnsCount))        
                {                        obj.setAttribute("value", charTurns);                }
                else
                {                        ReportError("UpdateTopObject: bad charTurns");                }
        }
        else
        {//build it
                ReportError("UpdateTopObject: building top object");
                var nobj=top.document.createElement("input");
                nobj.setAttribute("type", "hidden");
                nobj.setAttribute("title",charName);
                nobj.setAttribute("value", charTurns);
                nobj.id=tname;
                nobj.style.display="none";
                top.document.body.appendChild(nobj);
        }
}
function GetCharNameFromTop()
{
        var retval=BadCharName;
        var obj=top.document.getElementById(tname);
        if(obj!=undefined)//edit it
        {                retval=        obj.title;        }
        else//consider ripping from RipName(top.frames[1].document)
        {                ReportError("GetCharNameFromTop: obj not exist.");        }
        if(retval==BadCharName)ReportError("GetCharNameFromTop: returning "+retval);
        return retval;
}
function GetCharTurnsFromTop()
{
        var retval=BadTurnsCount;
        var obj=top.document.getElementById(tname);
        if(obj!=undefined)//edit it
        {                retval=        obj.value;        }
        else//consider ripping from RipTurns(top.frames[1].document)
        {                ReportError("GetCharTurnsFromTop: obj not exist.");        }
        if(retval==BadTurnsCount)ReportError("GetCharTurnsFromTop: returning -1");
        return retval;
}
function InsertIntoAct()
{//TODO list things here in the account page so you can remove them(like other GM scripts do)
        //Get the minimum turn count (and the list of snarfblats?)
        var MinTurns=GetMinCharTurns();
        var divobj=document.createElement("div");
        if(divobj!=undefined)
        {
                divobj.id=accountpagebaseid+"2";
                var tbobj=document.createElement("input");
                if(tbobj!=undefined)
                {
                        divobj.appendChild(tbobj);
                        tbobj.id=accountpagebaseid+"_MinTurns_Input";
                        tbobj.setAttribute("type", "text");
                        tbobj.style.width="75px";//Just because it annoyed me
                        tbobj.setAttribute("value", MinTurns);        
                        tbobj.setAttribute("title", "Press enter to save");
                        tbobj.addEventListener('keypress',function(evt)
                        {
                                var kp=evt.charCode || evt.keyCode;
                                if(kp==13)//enter press
                                {
                                ExecuteMinTurnsSave();
                                evt.preventDefault();
                                }
                        },false);
                }
                var btobj=document.createElement("input");
                if(btobj!=undefined)
                {
                        divobj.appendChild(btobj);
                        btobj.setAttribute("type", "button");
                        btobj.setAttribute("value", "Save");
                        btobj.addEventListener('click',function(evt) 
                        {
                                ExecuteMinTurnsSave();
                                evt.preventDefault();
                        },true);
                        //need add save handler
                }
                var lbobj=document.createElement("span");
                if(lbobj!=undefined)
                {
                        divobj.appendChild(lbobj);
                        lbobj.id=accountpagebaseid+"_MinTurns_Result";
                        lbobj.style.color="green";
                        lbobj.style.margin="11px 11px 11px 11px";
                        lbobj.innerHTML="";
                        //set size
                }
                divobj.appendChild(document.createElement("br"));
                var div_AutoContinue=document.createElement("span");
                var lb_AutoContinue=document.createElement("span");
                if((div_AutoContinue!=undefined)&&(lb_AutoContinue!=undefined))
                {
                        divobj.appendChild(div_AutoContinue);
                        
                        div_AutoContinue.setAttribute("type", "button");
                        div_AutoContinue.id=accountpagebaseid+"_AutoContinue";
                        div_AutoContinue.style.fontSize="8pt";
                        div_AutoContinue.innerHTML="AutoContinue: ";//+
                        div_AutoContinue.appendChild(lb_AutoContinue);
                        lb_AutoContinue.id=accountpagebaseid+"_lb_AutoContinue";
                        lb_AutoContinue.innerHTML="<b>"+((GetAutoContinueAllowed() == 1) ? "ON" : "OFF");
                        div_AutoContinue.addEventListener('click',function(evt) 
                        {
                                evt.preventDefault();                        //this.removeEventListener('click',arguments.callee,false);
                                var state=GetAutoContinueAllowed();
                                var rr=SetAutoContinueAllowed(!state);
                                //div_AutoContinue.div="AutoContinue: "+((GetAutoContinueAllowed() == 1) ? "ON" : "OFF");//charName+"["+charTurns+"]: <b>"+(((!state) == 1) ? "ON" : "OFF")+"</b><br/>";
                                lb_AutoContinue.innerHTML="<b>"+((GetAutoContinueAllowed() == 1) ? "ON" : "OFF");
                        },true);
                }
                
                InsertTableIntoAccountInterface(accountpagebaseid+"tab","Plater's AutoCombat",divobj);
        }
}
function ExecuteMinTurnsSave()
{
        var obj=document.getElementById(accountpagebaseid+"_MinTurns_Input");
        if(obj!=undefined)        
        {                
                var MinTurns=parseInt(obj.value);
                SetMinCharTurns(MinTurns);         
                var tobj=document.getElementById(accountpagebaseid+"_MinTurns_Result");        
                if(tobj!=undefined)
                {        tobj.innerHTML="Saved! "+MinTurns;}
                else{                alert("Saved! "+MinTurns);}
        }
        else{alert("Failure!");}
}
function InsertTableIntoAccountInterface(tabID,tabTitleString, tabInnerObj)
{//here is where it gets fun?
        var testobj=document.getElementById(tabID);
        if(testobj!=undefined) testobj.parentNode.removeChild(testobj);
        
        var xp="/html/body/div[@id='options']/div[@id='tabs']/ul";
        var ulListing=find(xp);//UL listed but not CE listed?...i hate my sense of humor
        var myLI=document.createElement("li");
        if((ulListing!=undefined)&&(myLI!=undefined))
        {
                ulListing.style.fontSize="8pt";
                ulListing.appendChild(myLI);
                myLI.id=tabID;
                myLI.style.fontSize="7pt";//Nice and tiny
                myLI.onclick="";
                myLI.innerHTML="<img border=\"0\" src=\""+ScriptIcon+"\" align=\"absmiddle\" height=\"16\" width=\"16\" style=\"padding-right: 10px; \" /><u>"+tabTitleString+"</u></div>";
                //The myLI object inherits an onClick event from the jQuery in actual page, cannot seem to get rid of it.
                jQuery(                function($)                 {                        $('#'+tabID).unbind();                }                );//try to remove the old click
                myLI.addEventListener('click',function(evt) 
                {
                        LoadOptionsTabContents(tabID,tabTitleString,tabInnerObj);
                        evt.preventDefault();
                },true);                
        }
}
function LoadOptionsTabContents(tabID,tabTitleString,tabInnerObj)
{
        var divGuts=document.getElementById("guts");
        var tab = document.getElementById(tabID);
        $('.helpbox').remove();
        $('.disabled').remove();
        $('#tabs li').removeClass('active');
        $('#'+tabID).addClass('active');
        $('#guts').css('opacity', 0.2);
        var oRunningInterval=setInterval(function()
        {
                var divGuts=document.getElementById("guts");
                if((divGuts.innerHTML.indexOf("You managed to click a non-existant tab")!=-1)||(divGuts.childNodes.length==0))//it might be the case that CDM gets rid of the error message
                {
                        $('#guts').empty();
                        $('#guts').append('<div class="scaffold"></div><b>'+tabTitleString+':<b/>');
                        $('#guts').append(tabInnerObj);
                        $('#guts').append('<div class="clear"></div>');
                        $('#guts').css('opacity', '');
                        clearInterval(oRunningInterval);
                }
        },10);
}
function InsertIntoCharPane()
{
        var betterxp="/html/body/center/table/tbody";//"/html/body/center[2]/table[1]/tbody";
        var o2=find(betterxp,document.body);
        if((o2!=undefined))
        {
                if(charName!=BadCharName)
                {//make a row and a td with colspan=2
                                var divAutoContinue=document.getElementById("div_"+prekeyname+"_autocontinue");
                                if(divAutoContinue!=undefined) divAutoContinue.parentNode.removeChild(divAutoContinue);
                                divAutoContinue=CreateAutoContinueSwitcherRow(GetAutoContinueAllowed());
                                if(divAutoContinue!=undefined)o2.appendChild(divAutoContinue);
                }
                else
                {//make a box offering to reload frame
                        ReportError("InsertIntoCharPane: Making reload link");
                        var dd=document.createElement('a');
                        if(dd!=undefined)
                        {
                                dd.appendChild(document.createTextNode("(Reload)"));
                                dd.style.fontSize="8pt";
                                dd.href ="javascript:window.location.reload()";
                                newTD.appendChild(dd);
                        }
                }
        }
        else{ /*//Fail Silently// alert('help');*/}
}
function CreateAutoContinueSwitcherRow(state)
{
        var newTR = document.createElement('tr');
        var newTD = document.createElement('td');
        if((newTR!=undefined)&&(newTD!=undefined))
        {
                newTR.appendChild (newTD);
                newTR.id="div_"+prekeyname+"_autocontinue";
                
                //newTD.style.backgroundColor="green";
                newTD.colSpan="2";                
                newTD.style.fontSize="8pt";
                newTD.style.cursor ='pointer';
                newTD.innerHTML=charName+"["+charTurns+"]: <b>"+((state == 1) ? "ON" : "OFF")+"</b><br/>";
                newTD.addEventListener('click',function(evt) 
                {
                        evt.preventDefault();                        //this.removeEventListener('click',arguments.callee,false);
                        var rr=SetAutoContinueAllowed(!state);
                        //newTD.innerHTML=charName+"["+charTurns+"]: <b>"+(((!state) == 1) ? "ON" : "OFF")+"</b><br/>";
                        InsertIntoCharPane();
                },true);
        }
        
        return newTR;
}
function SetAutoAttackAllowed(val)
{        GM_setValue(prekeyname+"Allowed", val);        }
function GetAutoAttackAllowed()
{        return GM_getValue(prekeyname+"Allowed",0);        }
function SetAutoContinueAllowed(val)
{        GM_setValue(prekeyname+"Continue_Allowed", val);                var ret=GM_getValue(prekeyname+"Continue_Allowed", null);        return (ret==val);                }
function GetAutoContinueAllowed()
{        return GM_getValue(prekeyname+"Continue_Allowed",0);        }
function GetMinCharTurns()
{
        var cturns=GM_getValue(prekeyname+"MinCharTurns",120);
        SetMinCharTurns(cturns);
        return cturns;        
}
function SetMinCharTurns(turns)
{        GM_setValue(prekeyname+"MinCharTurns", turns);        }
function DoFight2()
{//Since combat macros came out, the combat part is not required.
        try
        {
                if(charName!=BadCharName)
                {//ok to look for things
                        var atkButton=document.getElementById("tack"); 
                        var CanAutoContinue=GetAutoContinueAllowed();
                        //do an IF about the attack button
                        if(atkButton!=undefined)
                        {                InsertState("Waiting...");                }
                        else
                        {
                                var FightLost=0;
                                var strToJump="";
                                //var xp="/html/body/center/table/tbody"                 //xp="/html/body/center/table/tbody/tr[2]/td/center/table/tbody/tr/td/center";
                                var myobj=document.body;
                                if(myobj.innerHTML.indexOf("You lose.")!=-1)FightLost=1;//could occur for over 30rounds or when beaten up
                                if(FightLost==1)
                                {                        InsertState("Fight lost, stopping. (<a href=\"/campground.php?action=rest\">Rest?</a>)");                }
                                else
                                {//no beaten up! Or otherwise lose
                                        if(CanAutoContinue==1)
                                        {
                                                var minallowed=GetMinCharTurns();
                                                if(charTurns>(minallowed+1))//always seems to lag behind by one
                                                {
                                                        var els = document.getElementsByTagName('a');
                                                        for(var i=0;i<els.length;i++)
                                                        {
                                                                if(els[i].innerHTML.indexOf("Adventure Again")==0 || els[i].innerHTML.indexOf("Do it again")==0)
                                                                {                                                        strToJump=els[i].href;                                                        break;                                                }
                                                        }
                                                        if(strToJump!="")
                                                        {//TODO check for too low of HP??
                                                                InsertState("Continuing to adventure");
                                                                GM_log("Continuing to adventure");
                                                                var timer = setInterval(function() {clearInterval(timer);DoJump(strToJump);}, TimeToWaitAdventureAgain);
                                                                //window.setTimeout( new function(){        DoJump(strToJump);        },TimeToWaitAdventureAgain);//Changing to a onetime use setInterval seems to have fixed this?
                                                        }
                                                        else                                                {                InsertState("Auto adventure stopped?");                                        }
                                                }//end of still has turns to use
                                                else                                         {                InsertState("AutoContinue stopped, reached minimum turns");        }
                                        }//end of allowed to auto continue
                                        else                                {                InsertState("AutoContinue disabled");                        }
                                }//end of fight not lost
                        }//end of no attack button, fight is over
                }//end of good charName
                else        {                InsertState("charactername not found!");        }
        }
        catch(error)
        {                ReportError(error);        }
}
function DoFight3()//05/11/2012
{//Since combat macros came out, the combat part is not required.
        var StateString="Opening State or Error";
        try
        {
                StateString=("charactername not found!");        
                if(charName!=BadCharName)
                {//ok to look for things
                        var atkButton=document.getElementById("tack"); 
                        var CanAutoContinue=GetAutoContinueAllowed();
                        //do an IF about the attack button
                        StateString=("Waiting...");
                        if(!(atkButton!=undefined))
                        {
                                StateString=("Fight lost, stopping. (<a href=\"/campground.php?action=rest\">Rest?</a>)");
                                var FightLost=0;
                                var strToJump="";
                                //var xp="/html/body/center/table/tbody"                 //xp="/html/body/center/table/tbody/tr[2]/td/center/table/tbody/tr/td/center";
                                var myobj=document.body;
                                if(myobj.innerHTML.indexOf("You lose.")!=-1)FightLost=1;//could occur for over 30rounds or when beaten up
                                if(FightLost!=1)
                                {//no beaten up! Or otherwise lose
                                        StateString=("AutoContinue disabled");
                                        if(CanAutoContinue==1)
                                        {
                                                StateString=("AutoContinue stopped, reached minimum turns");
                                                var minallowed=GetMinCharTurns();
                                                if(charTurns>(minallowed+1))//always seems to lag behind by one
                                                {
                                                        StateString=("Auto adventure stopped?(No URL found?)");        
                                                        var els = document.getElementsByTagName('a');
                                                        for(var i=0;i<els.length;i++)
                                                        {
                                                                if(        els[i].innerHTML.indexOf("Adventure Again")==0 || 
                                                                                els[i].innerHTML.indexOf("Do it again")==0)
                                                                {                strToJump=els[i].href;                break;                }
                                                        }
                                                        if(strToJump!="")
                                                        {//TODO check for too low of HP??
                                                                StateString=("Continuing to adventure");
                                                                //GM_log("Continuing to adventure");
                                                                var timer = setInterval(function() {clearInterval(timer);DoJump(strToJump);}, TimeToWaitAdventureAgain);
                                                                //window.setTimeout( new function(){        DoJump(strToJump);        },TimeToWaitAdventureAgain);//Changing to a onetime use setInterval seems to have fixed the weird error?
                                                        }//end of non-blank string
                                                }//end of still has turns to use
                                        }//end of allowed to auto continue
                                }//end of fight not lost
                        }//end of no attack button, fight is over
                }//end of good charName
        }//end of try
        catch(error)
        {                ReportError(error);                }
        InsertState(StateString);
}
function DoJump(strToJump)
{
        InsertState("*****JUMP*****");
        //GM_log("*****JUMP*****");//GM_log("Jump: "+strToJump);
        document.location=strToJump;
        //document.location.reload(false);
        //document.location.assign(strToJump);
        //GM_log("Jump failed");
}
function InsertState(statetext)
{
        var spanobj;
        var WasSuccesfull=0;
        try
        {
                var xp="/html/body/center/table/tbody/tr[2]/td/center/table/tbody/tr/td/center/table/tbody/tr";//wrong
                xp="/html/body/center/table/tbody/tr[2]/td/center/table/tbody/tr/td/center[1]/table/tbody/tr/td[2]";//right
                var spanobj=find(xp,document.body);
                if(spanobj!=undefined)
                {
                        var myspan=document.createElement('span');
                        if (myspan!=undefined)
                        {
                                statetext=charName+"["+charTurns+"]("+charFindTime+") AutoCombat Action: "+statetext;
                                myspan.innerHTML=statetext;
                                myspan.style.color="red";
                                myspan.style.fontSize="8pt";
                                spanobj.appendChild(document.createElement('br'));
                                spanobj.appendChild(myspan);
                                WasSuccesfull=1;
                        }
                }
                if(WasSuccesfull==0) {ReportError("Failure to InsertState");}
        }
        catch(error)
        {
                ReportError(error);                //alert(error);
        }
}
