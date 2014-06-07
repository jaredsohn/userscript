// ==UserScript==
// @name           Pardus Friend Finder
// @namespace      pardus.at
// @description    Helps sort and message online pilots, also provides building hovertext.
// @include        http://*.pardus.at/alliance.php*
// @include        http://*.pardus.at/alliances.php*
// @include        http://*.pardus.at/statistics.php*
// @include        http://*.pardus.at/main.php*
// @include        http://*.pardus.at/diplomacy.php*
// @include        http://*.pardus.at/diplomacy_adv.php*
// @include        http://orion.pardus.at/logout.php*
// @author         Pants
// @version        0.9.6
// ==/UserScript==

unsafeWindow.myScript = this;

/* todo:
 kill deleted alliances (done, but needs testing)
 hide uninteresting alliances
 pull f/f info out of messages screen
 Don't build menu until clicked on (performance!)
 On/Off switch for building info
 Apparently a pilot leaving an alliance isn't picked up (c.f. Lord Dad from FTS)
 */

// ////////////////////////////////////////////////////////////////////////
// Constants:
// ////////////////////////////////////////////////////////////////////////

const SECOND= 1000;
const MINUTE= SECOND * 60;
const HOUR= MINUTE * 60;
const DAY= HOUR * 24;

const FRESH= 0;
const STALE= 1;
const BAD= 2;

// ////////////////////////////////////////////////////////////////////////
// User defined values:
// ////////////////////////////////////////////////////////////////////////

const mapwidth= 4; //num of tiles you can see away from your ship; change to 3 for non-premiums
const foeColor= 'red';
const friendColor= 'green';
const neutralColor= 'gray';
const myImgPack= 'file:///Library/Pardus/images';
const imgpack= myImgPack; //'http://static.pardus.at/images'; //edit this to your local one
const foeIndicator= '<img src="'+imgpack+'/chat/yarr.png" border=0>';
const friendIndicator= '<img src="'+imgpack+'/chat/smile.png" border=0>';

const highlightOtherShips=  true;
const showOnlineUsers=      true;
const showBuildingInfo=     false;
const displayStaleMsg=      true;
const badOnlineUsersTime=   12 * HOUR;
const staleOnlineUsersTime= 15 * MINUTE; //15 * MINUTE; //(2 * HOUR);  // Examples: (1.5 * HOUR), (DAY),
                                        // ((HOUR) + (27 * MINUTE))

if (window.frames[1])
{
    var idtag= top.frames[1].document.getElementById("universe").title;
    var myName= idtag.substr(idtag.indexOf(' '));
    var myUniverse= idtag.substr(0,idtag.indexOf(':')).toLowerCase();
}
else
{
    var myUniverse= document.location.hostname.substring(0, document.location.hostname.indexOf("."));
}

// ////////////////////////////////////////////////////////////////////////
// Imported -- Rhindon's Standard Cookie Code
//          -- Stores GreaseMonkey Values instead of actual Cookies
//  hacked up by Pants, since I didn't like the way the original did it
// ////////////////////////////////////////////////////////////////////////

function storeValue(name,value)
{
    GM_setValue(myUniverse + '-' + name,value);
}

function fetchValue(name)
{
    try
    {
        var temp= GM_getValue(myUniverse + '-' + name);
        if(temp != '~~~DELETED~~~') //compatability with olde stuff
        {
            return temp;
        }
    }
    catch(err)
    {
        GM_log('err reading value: '+err);
    }

    return null;
}

function deleteValue(name)
{
    GM_deleteValue(myUniverse + '-' + name);
}


//Actual operational code starts here

function getPilotAlliance(n)
{
    var cookieval= fetchValue('pilot_'+n);
    if (cookieval)
    {
        //alert('Pilot '+n+' is '+cookieval);
        return cookieval;//.substring(0,cookieval.indexOf(':'));
    }
    return null;
}


function getAlliancePilots(a)
{
    var cookieval= fetchValue('alliance_'+a);

    if (cookieval)
    {
        return cookieval.split(':');
    }
    else
    {
        return null;
    }
}

/*
function updateAllianceList(a)
{
    var cookieval= fetchValue('alliancelist');

    var alliances;
    if (cookieval)
    {
        alliances= cookieval.split(':');
    }
    else
    {
        alliances= new Array();
    }

    for (var alliance in alliances)
    {
        if (alliance == a)
        {
            return false;
        }
    }

    alliances.push(a);
    storeValue('alliancelist',alliances.sort.join(':'));

}
*/

//Returns the online list, except that the tstamp in the first field is replaced
//with a staleness flag: 0 is good, 1 is stale, 2 is unusable
function getOnlineList()
{
    var onlineList= new Array();

    var onlineString= fetchValue('onlineList');
    if (onlineString == null)
    {
        GM_log('No valid onlinelist (first time running?)');
        onlineList.push(0);  //if no cookie, just return a staleness of 0
        return onlineList;
    }

    var onlineList= onlineString.split(':');

    return onlineList;
}


function checkStaleness(setdate)
{
    var t= 0+setdate;
    var onlineDate= new Date(Math.round(t));
    var currentDate= new Date();
    var compDateStale= new Date(currentDate.valueOf() - staleOnlineUsersTime);

    if(onlineDate.valueOf() < compDateStale.valueOf())
    {
        var compDateBad= new Date(currentDate.valueOf() - badOnlineUsersTime);
        if(onlineDate.valueOf() < compDateBad.valueOf())
        {
            return BAD;
        }

        return STALE;
    }
    else
    {
        return FRESH;
    }
}

function processInfoCell(c)
{
    if (c.textContent == "no automatic info")
    {
        return "N/A";
    }
    else
    {
        var sellingString= "N/A";
        var buyingString= "N/A";
        var stockedString= "N/A";

        var sellingStuff= new Array();
        var buyingStuff= new Array();

        if (c.childNodes.length > 2)
        {
            //Commodities being sold
            var selling= c.childNodes[0].rows[0].cells;
            for (var si= 1; si < selling.length; si++)
            {
                var commodity= selling[si].firstChild.title;
                var quantity= selling[si].textContent;

                sellingStuff.push(commodity+quantity);
            }

            //Commodities being bought
            var buying= c.childNodes[1].rows[0].cells;
            for (var bi= 1; bi < buying.length; bi++)
            {
                var commodity= buying[bi].firstChild.title;
                var quantity= buying[bi].textContent.replace(/([0-9]+)$/,'$1'+'cr');

                buyingStuff.push(commodity+quantity);
            }

            //Stocked for
            var stockedString= "";

            var stocked= c.childNodes[2].rows[0].cells[1];
            var stockedFor= stocked.textContent.substring(0,stocked.textContent.indexOf(" "));
            stockedString= "Stocked: "+stockedFor+" ticks";
        }
        else
        {
            //MOs only have 2 blocks.  Possibly others, must find and fix... !!!

            var buying= c.childNodes[0].rows[0].cells;
            for (var bi= 1; bi < buying.length; bi++)
            {
                var commodity= buying[bi].firstChild.title;
                var quantity= buying[bi].textContent.replace(/([0-9]+)$/,'$1'+'cr');

                buyingStuff.push(commodity+quantity);
            }

            //Stocked for
            var stockedString= "";

            var stocked= c.childNodes[1].rows[0].cells[1];
            var stockedFor= stocked.textContent.substring(0,stocked.textContent.indexOf(" "));
            stockedString= "Stocked: "+stockedFor+" ticks";
        }

        //Assembly
        if (sellingStuff.length)
        {
            sellingString= sellingStuff.join(", ",sellingStuff);
        }

        if (buyingStuff.length)
        {
            buyingString= buyingStuff.join(", ",buyingStuff);
        }

        return "Sell: "+sellingString+";\n Buy: "+buyingString+";\n "+stockedString;
    }
}

function get_navgrid(mapwidth)
{
    var imgs= document.getElementsByTagName('img');

    var max_x= 2 * mapwidth; // array index (so 1 less than magnitude)
    var max_y= 2 * mapwidth;

    var x= 0;
    var y= 0;
    var navfields= new Array();
    for(var i= 0; i < imgs.length; i++)
    {
        if(imgs[i].getAttribute('class') == 'nf')
        {
           if (y == 0)
           {
               navfields[x]= new Array();
           }

           navfields[x][y]= imgs[i];

           if (x == max_x)
           {
               x= 0;
               y++;
           }
           else
           {
               x++;
           }
        }
    }

    return navfields;
}


function removeAllianceByEvent(e)
{
    //removeAlliance_foo => split on 14
    removeAlliance(e.target.id.substring(15));
    e.target.innerHTML= "&nbsp;";
}


function removeAlliance(a)
{
    GM_log('removing alliance ['+a+']');
    if (a == "None/Unknown")
    {
        GM_log("Cannot delete bogus alliance");
        return;
    }
    var pilots= getAlliancePilots(a);
    if (pilots)
    {
        for (var i= 0; i < pilots.length; i ++)
        {
            GM_log("Deleting pilot "+pilots[i]);
            deleteValue('pilot_'+pilots[i]);
        }
    }
    deleteValue('alliance_'+a);

    /*
    var cookieval= fetchValue('alliancelist');

    var alliances;
    if (cookieval)
    {
        alliances= cookieval.split(':');
    }
    else
    {
        //nothing to do
        return;
    }

    for (var alliance in alliances)
    {
        if (alliance != a)
        {
            alliances.push(a);
        }
    }

    storeValue('alliancelist',alliances.sort.join(':'));
    */
}


//Stash members in the appropriate cookie
if (document.URL.indexOf('alliance.php') >= 0)
{
    var alliancename;
    var strongs= document.getElementsByTagName('strong');

    for(var i = 0; i < strongs.length; i++)
    {
        if(strongs[i].innerHTML.indexOf("<font size=\"5\">") != -1)
        {
            alliancename= decodeURIComponent(strongs[i].firstChild.innerHTML);
            //alert('got aname '+ alliancename);
            break;
        }
    }

    headers= document.getElementsByTagName('th');
    var table;
    //alert(headers.length+ ' headers');
    for(var i= 0; i < headers.length; i++)
    {
        if(headers[i].innerHTML == "Members")
        {
            table= headers[i].parentNode.parentNode;
            //alert('got table');
            break;
        }
    }

    //Loops through pilots on the page and create an alliance list as well as a
    //reverse lookup for the pilot's name
    if (table != null)
    {
        var alliancemembers= '';
        var anchors= table.getElementsByTagName('A');
        var delim= '';
        for (var i= 0; i < anchors.length; i++)
        {
           //alert('href is '+anchors[i].href);
           var name= decodeURIComponent(anchors[i].href.substring(anchors[i].href.indexOf("(")+2,anchors[i].href.indexOf(")")-1));

           //TODO-- read the cookie, and only replace the appropriate field instead of the whole thing
           storeValue('pilot_'+name, alliancename);

           //alert('name '+name);
           alliancemembers += delim + name;
           delim= ':';
        }

        //alert('alliance= [' + 'alliance_'+alliancename+']');
        //alert('members= ['+alliancemembers+']');
        storeValue('alliance_'+alliancename, alliancemembers);
        //updateAllianceList(alliancename);
    }
}

//Make sure the master alliance list still contains everyone we care about
else if (document.URL.indexOf('alliances.php') >= 0)
{
     var allvals= GM_listValues();
     var alliances= new Array();

     //var anchors= document.getElementsByTagName('a');

     for (var i= 0; i < allvals.length; i++)
     {
         if (allvals[i].indexOf(myUniverse + '-alliance_') != -1)
         {
             var alliancename= allvals[i].substring(allvals[i].indexOf('_')+1);
             //alliances.push(allvals[i].substring('_') + 1);
             //Delete that cookie unless it's found in the page
             //var pattern= new RegExp('href=\"alliance\.php\?id\=[0-9]*\"\>'+alliancename+'\<\/a\>');
             var pattern= new RegExp('href=\"alliance\.php\\\?id\=[0-9]+\"\>'+alliancename+'\<\/a\>');

             if (pattern.test(document.body.innerHTML))
             {
                 GM_log ('alliance '+alliancename+' found');
             }
             else
             {
                 GM_log ('alliance '+alliancename+' NOT found');
                 //Remove that cookie
                 deleteValue('alliance_'+alliancename);
             }
         }
     }
}

//// This next if block is pretty much a straight-up paste from Rhindon's F&FH
// Get Friends and Foes automatically
else if (document.URL.indexOf('diplomacy.php') >= 0)
{
    var friends = "";
    var foes = "";

    var selects= document.getElementsByTagName('select');

    for(i = 0; i < selects.length; i++)
    {
        if(selects[i].parentNode.name == 'dipl_foe')
        {
            for(j = 0; j < selects[i].options.length; j++)
            {
                foes += '~' + selects[i].options[j].textContent + '~';
            }
        }

        if(selects[i].parentNode.name == 'dipl_friend')
        {
            for(j = 0; j < selects[i].options.length; j++)
            {
                friends += '~' + selects[i].options[j].textContent + '~';
            }
        }
    }

    storeValue('friends', friends);
    storeValue('foes', foes);
}


//Get Friends and Foes Automatically from Advanced Page
else if (document.URL.indexOf('diplomacy_adv.php') >= 0)
{
    var friends= new Array();
    var foes= new Array();

    forms= document.getElementsByTagName('form');
    //form 0 and 3 are selectors, 1 is all-fr, 2 is ally-fo, 4 is fac-fr, 5 is fac-fo

    var alli_friends= forms[1].getElementsByTagName('option');
    var alli_foes= forms[2].getElementsByTagName('option');

    //Someday do factions to?  Seems pointless.
    //var fac_friends= forms[4].getElementsByTagName('option');
    //var fac_foes= forms[5].getElementsByTagName('option');

    for (var i= 0; i < alli_friends.length; i++)
    {
        friends.push(alli_friends[i].textContent);
    }
    for (var i= 0; i < alli_foes.length; i++)
    {
        foes.push(alli_foes[i].textContent);
    }

    storeValue('friends_a', friends.join(':'));
    storeValue('foes_a', foes.join(':'));
}


//TODO:  When visiting the Alliances page, delete any "cookies" for alliances that
//no longer exist.
//Update the look of the user names on the Nav screen
else if (document.URL.indexOf('main.php') >= 0 || document.URL.indexOf('logout.php') >= 0)
{
    //foes = fetchValue('foes');
    //friends = fetchValue('friends');

    var onlineList= getOnlineList();
    var setdate= onlineList.shift();

    var staleness= checkStaleness(setdate);

    var now= new Date();
    var lastRefreshed= Math.round(((now.valueOf() - setdate.valueOf()) / 60000) - 0.5);

    var foes = fetchValue('foes');
    var friends = fetchValue('friends');
    var foes_a = ':'+fetchValue('foes_a')+':';
    var friends_a = ':'+fetchValue('friends_a')+':';

    var menuHtml= '<div id="friendbutton" style="position: fixed; bottom: 0px; left: 8px; '+
          'background-color:#404040; border-right:1px dashed black; opacity: 0.7;">';

    var alliances= new Array();
    var alliancenames= new Array();
    var unknowns= new Array();

    if (staleness == BAD)
    {
        menuHtml += '<a href="statistics.php?display=onlinelist">Stats Refresh Required</a>';
    }
    else //if (do it)
    {
        var displayStyleOpen;
        var displayStyleClosed;
        /* if (GM_getValue(top.frames[1].document.getElementById('universe').title+'_ffmenu_open') == 1)
        {
            displayStyleOpen= 'display: inline';
            displayStyleClosed= 'display: none';
        }
        else
        { */
            displayStyleClosed= 'display: none';
            displayStyleOpen= 'display: inline';
        /* } */

        //TODO: need a good way to remember the open/close state
        menuHtml += '<a href="#"  onclick="document.getElementById(\'onlinetree\').style.display=\'block\';'+
          'document.getElementById(\'friendbutton_hide\').style.display=\'inline\';'+
          'document.getElementById(\'friendbutton_show\').style.display=\'none\';'+
          //'GM_setValue(top.frames[1].document.getElementById(\'universe\').title+\'_ffmenu_open\',1)'+
          '" id="friendbutton_show", style="'+displayStyleOpen+'">Show Online Pilot List</a>\n'+
          '<a href="#" onclick="document.getElementById(\'onlinetree\').style.display=\'none\';'+
          'document.getElementById(\'friendbutton_hide\').style.display=\'none\';'+
          'document.getElementById(\'friendbutton_show\').style.display=\'inline\';'+
          //'GM_setValue(top.frames[1].document.getElementById(\'universe\').title+\'_ffmenu_open\',0)'+
          '" id="friendbutton_hide" style="'+displayStyleClosed+'">Hide Online List</a>';

        if (staleness == STALE)
        {
            menuHtml += '<a style="background-color:#202020;font-weight: bold;" '+
              'href="statistics.php?display=onlinelist">&nbsp;(Refresh Recommended)</a>';
        }

        menuHtml += '</div><div id="onlinetree" style="display: none; font-size:small"><br>'+
          '<span style="background-color: #000000;font-weight: bold;color: #FFFFFF; text-decoration: underline;">'+
          'Online Pilots (as of '+lastRefreshed+'m ago)</span><br>';

        //Build a hierarchy of alliances

        //alert('onlinelist is '+onlineList.length+' pilots');
        for (var i= 0; i < onlineList.length; i++)
        {
            var p= onlineList[i];
            var pa= getPilotAlliance(onlineList[i]);

            if (pa == null)
            {
                pa= "None/Unknown";
                unknowns.push(p);
                continue;
            }
            else if (! alliances[pa])
            {
                alliancenames.push( pa ); //for sorting since it's annoying to sort hashkeys in js
                alliances[pa]= new Array();
            }
            alliances[pa].push( p );
        }
        alliances['None/Unknown']= unknowns;

        var sorted_alliances= alliancenames.sort();
        sorted_alliances.push('None/Unknown');

        for (var i= 0; i < sorted_alliances.length; i++)
        {
            var a= sorted_alliances[i];
            var a_style= 'font-weight: bold;';
            var a_color= 'color: ';
            if (friends_a.indexOf(':'+a+':') != -1)
            {
                a_color += friendColor;
            }
            else if (foes_a.indexOf(':'+a+':') != -1)
            {
                a_color += foeColor;
            }
            else
            {
                a_color += neutralColor;
            }

            a_style += a_color;

            var ahtml= '<div>';
            if (a != "None/Unknown")
            {
                ahtml += '<tt><a id="removeAlliance_'+a+'" title="Remove" style="'+a_color+';">X</a>&nbsp;</tt>';
            }
            else
            {
                ahtml += '<tt>&nbsp;&nbsp;</tt>';
            }
            ahtml += '&nbsp;*&nbsp;<a title="Expand" id=\'a_'+a+'\' style="'+a_style+'" onclick="javascript:var e= document.getElementById(\'side_'+a+
            '\');if(e){if(e.style.display==\'none\'){e.style.display=\'inline\'}else{e.style.display=\'none\'}}">'+a+' ('+
            alliances[a].length+')'+'</a><div class="side" id="side_'+a+'" style="display: none"><br>\n';

            for (var j= 0; j < alliances[a].length; j++)
            {
                var pilot= alliances[a][j];

                //commented out-- hoses up the ascii art
                //if (pilot == myName)
                //{
                //   continue; //Self shows up against alliance online count, but not in the sublist
                //}

                var dipl= "";
                if (foes && foes.indexOf('~'+pilot+'~') != -1)
                {
                    dipl= "color: "+foeColor;
                    //alert('"'+p+'" is a foe');
                }
                else if (friends && friends.indexOf('~'+pilot+'~') != -1)
                {
                    dipl= "color: "+friendColor;
                    //alert('"'+pilot+'" is a friend');
                }

                var tree;
                if (j+1 < alliances[a].length)
                {
                    tree= '<tt>|-</tt>';
                }
                else
                {
                    tree= '<tt>\`-</tt>';
                }
                ahtml += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+tree+'<a title="Send PM" style="'+dipl+'" href="javascript:sendmsg(\''+pilot+'\')">'+pilot+'</a><br>\n';
            }
            menuHtml += ahtml;
            menuHtml += "</div></div>\n";
        }


        //Now go add the removealliance buttons
        for (var i= 0; i < sorted_alliances.length; i++)
        {
            var a= sorted_alliances[i];
            var theRemoveLink= document.getElementById('removeAlliance_'+a);
            //theRemoveLink.setAttribute("onClick", "removeAlliance('"+a+"')");
            if (theRemoveLink) {
                //GM_log("Adding remove link for "+a);
                theRemoveLink.addEventListener("click", function(event){removeAllianceByEvent(event)}, false);
            }
            else if (a == 'None/Unknown')
            {
                //Do nothing
            }
            else
            {
                GM_log("No removeAlliance_ element for "+a);
            }
            //theRemoveLink.addEventListener("click",function() {
            //        window.setTimeout(removeAlliance(a), 0);
            //}, false);

        }
    }
    menuHtml += '</div>\n';

    //Take this menu hunk and insert it on the bottom of the status block
    var child = document.createElement("div");
    child.setAttribute("style", "position:relative; top:6px; margin-left: 12px; margin-top: 5px; margin-bottom: 18px;");
    child.innerHTML= menuHtml;

    //!!!LEAN THIS UP-- should be a function call to "createMenu" or something
    var bottombox;
    //if (document.URL.indexOf('logout.php') >= 0)
    //{
        var bodies= document.getElementsByTagName('body');
        //alert(bodies.length);
        bottombox= bodies[bodies.length -1];


    //}
    //else
    //{
    //    bottombox= document.getElementById('yourship');
    //}
        if (bottombox == null)
        {
            GM_log('Could not find status box');
        }
        else
        {
            //alert(statusbox.lastChild.lastChild.innerHTML);
            bottombox.parentNode.appendChild(child,bottombox);
        }



    //Also do flags on the otherships box.  This is more or less a dupe of Rhindon's FFH functionality, but by putting
    //it here it allows users to disable FFH so that Firefox to not need to track all the online stuff twice,
    //and prevents a minor bug in FFH from from appending online tags to my menu.
    var otherShips= document.getElementById('otherships');
    if (highlightOtherShips && otherShips)
    {

        //Get list of otherships
        var otherShipTables= otherShips.getElementsByTagName('table');

        for (var i= 0; i < otherShipTables.length; i++)
        {
            var anchors= otherShipTables[i].getElementsByTagName('a');
            var pilotName= anchors[0].textContent;
            var allianceName= anchors[1].textContent;
            if (pilotName.indexOf('line)') != -1)
            {
                //ffh is running! Abort!
                GM_log('Pardus Friend Finder aborting otherships highlighting: Friend&Foe Highlighter appears to be running');
                break;
            }

            if(foes && (foes.indexOf('~' + pilotName + '~') >= 0 || foes_a.indexOf(':'+allianceName+':') >= 0))
            {
                anchors[0].innerHTML = foeIndicator + anchors[0].innerHTML;
                anchors[0].style.fontStyle = 'italic';
            }
            else if(friends && (friends.indexOf('~' + pilotName + '~') >= 0 || friends_a.indexOf(':'+allianceName+':') >= 0))
            {
                anchors[0].innerHTML = friendIndicator + anchors[0].innerHTML;
                anchors[0].style.fontStyle = 'italic';
            }
        }
    }

    //Building info -- INCOMPLETE
    if (showBuildingInfo)
    {
        var sector= document.getElementById('sector').textContent;
        var ship_coords= document.getElementById('coords').textContent;
        var ship_x= ship_coords.substring(ship_coords.indexOf('[')+1,ship_coords.indexOf(','));
        var ship_y= ship_coords.substring(ship_coords.indexOf(',')+1,ship_coords.indexOf(']'));
        //GM_log('x= '+x+', y= '+y);

        //Load and parse sector info
        var sectorInfo= fetchValue('sector_'+sector);
        if (sectorInfo)
        {
            //GM_log(sectorInfo);
            var sections= sectorInfo.split('!!');
            var lastupdated= sections[0].valueOf();
            var records= sections[0].valueOf().split('||');

            var navgrid= get_navgrid(mapwidth); //returns a 2d array of navgrid images

            for (i= 0; i < records.length; i++)
            {
                var sections= records[i].split('%%');
                var coords= sections[0].split(',');
                var owner= sections[1];
                var blurb= sections[2];

                var bldg_x= coords[0];
                var bldg_y= coords[1];

                //Find buildings of interest and update their alt
                if ( (bldg_x >= (ship_x - mapwidth) && bldg_x <= (ship_x + mapwidth))
                     &&
                     (bldg_y >= (ship_y - mapwidth) && bldg_y <= (ship_y + mapwidth)) )
                {
                    //var nav_x= mapwidth - (ship_x - bldg_x);
                    //var nav_y= mapwidth - (ship_y - bldg_y);
                    //var imgid= 'nf'+y+'_'+x;



                    var img= document.getElementById(imgid);
                    if (img)
                    {

                    }
                    else
                    {
                        GM_log("could not find img "+imgid);
                    }

                }


            }
        }
        else
        {
            GM_log('No sector info for '+sector);
        }
    }
}
else if(document.URL.indexOf('statistics.php?display=onlinelist') >= 0)
{
    var ths= document.getElementsByTagName('th');
    var table;
    var onlineList= new Array();

    for(var i = 0; i < ths.length; i++)
    {
          if(ths[i].innerHTML == "Online Users Total")
          {
                table= ths[i].parentNode.parentNode;
                break;
          }
    }

    var anchors= document.getElementsByTagName('a');
    var now= new Date();
    onlineList.push(now.valueOf());
    for(var i = 0; i < anchors.length; i++)
    {
        if(anchors[i].parentNode.parentNode.parentNode == table)
        {
            onlineList.push(anchors[i].textContent );
        }
    }

    var onlineString= onlineList.join(':').replace(/<[^>]*>/g, ''); //strip any tags that snuck in there

    storeValue('onlineList', onlineString);
}
else if(document.URL.indexOf('messages_private.php') >= 0)
{
    //Find the friends, foes, alliance
    // TODO

}
else if(showBuildingInfo && document.URL.indexOf('index_buildings.php') >= 0)
{
    // !! delimits sector fields  (currently only one sector field: buildinginfo)
    // The buildinginfo sector field consists of multiple building records delimited by ||
    //   building record consists of  %% delimited fields (location%%owner%%blurb)
    //      location is X and Y delimited by a comma
    //      owner is the Pardus character name
    //      blurb is a straight lift from the automatic info section of the index

    var titles= document.getElementsByTagName('h1');
    var sector= titles[0].textContent.substring(0, titles[0].textContent.indexOf(" Building Index"));

    var headers= document.getElementsByTagName('th');
    for (var i= 0; i < headers.length; i++)
    {
        if (headers[i].textContent.indexOf('Building') != -1)
        {
            indexRows= headers[i].parentNode.parentNode.rows;
            //alert ('got indexrows i='+i);
            continue;
        }
    }

    //alert(indexRows[1].innerHTML);

    var sectorBuildings= new Array;
    for (i= 1; i < indexRows.length; i++) //note index starts at 1 (skip header)
    {
        var cells= indexRows[i].cells;
        //GM_log('Row '+i+' cells: '+cells.innerHTML);

        var locationString= cells[1].textContent.replace('[','').replace(']','');
        var ownerString= cells[2].textContent;
        var infoString= processInfoCell(cells[3]);

        //Process those strings into a useful data table
        GM_log('Row '+i+': location: '+locationString+', owner: '+ownerString+', info '+infoString);

        //cells[0].firstChild.alt= cells[0].firstChild.title= "Owner "+ownerString+"; "+infoString;
        sectorBuildings.push(locationString+"%%"+ownerString+"%%"+infoString);
    }

    var d= new Date().valueOf();
    storeValue('sector_'+sector, d+'!!' + sectorBuildings.join("||"));
}



