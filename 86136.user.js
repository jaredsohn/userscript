/*
Copyright (c) 2010 by Andreas Valder

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files 
(the "Software"), to deal in the Software without restriction, including 
without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and 
to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice 
shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
OTHER DEALINGS IN THE SOFTWARE.
*/


// ==UserScript==
// @name Tibia-Website-Tools
// @namespace FTibiaAdd
// @description	Add usful functions to tibia
// @include	http://tibia.com/*
// @include	http://www.tibia.com/*
// @include	https://secure.tibia.com/*
// @include	https://www.secure.tibia.com/*
// @include	http://forum.tibia.com/forum/*
// @include	http://www.forum.tibia.com/forum/*
// @version 1.2.0
// @contributor Glotzer
// ==/UserScript==

//Settings
var settings = new Array( );
settings[0]  = new Array('AccPageCharLinks',             true,'link character name at account page?'); 
settings[1]  = new Array('AccPageReportLinks',           true,'link reported character names at account page (this only works at some accounts)?');
settings[2]  = new Array('CharInfoHousesClickable',      true,'link house at character page?');
settings[3]  = new Array('CharInfoOnlineAdding',         true,'add colored name to character page?');
settings[4]  = new Array('CharInfoAddExternal',          true,'add external section to character page?');
settings[5]  = new Array('CharInfoAddExternalOnlineTime',true,'add link to Online Time Counter by Pskonejott?');
settings[6]  = new Array('CharInfoAddExternalExp',       true,'add link to Exp history by Tibia-Stats?');
settings[7]  = new Array('GuildOnlineShow',              true,'show online/offline at guildpage?');
settings[8]  = new Array('ForumAddSearch',               true,'add forum search?');
settings[9]  = new Array('CharInfoFullDeathlist',        true,'add link to full deathlist by TibiaRing?');
settings[10] = new Array('SkipBegint',                   true,'skip the anoying begin screen?');
settings[11] = new Array('AddFansiteLinksToCreature',    true,'add links to fansites at creature page?');
settings[12] = new Array('ForumLinkLotterys',            true,'link lottery IDs at forum(this doesn\'t work always)?');
settings[13] = new Array('AddFansiteLinksToMaps',        true,'add links to fansite maps at map section?');

//Forum search
var MaxPages = 50;
var SearchTime = -1;

//Global
var Location = window.location.href;
var MainTable = document.getElementsByTagName('tbody');

//AccountPage
var ReportTableFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/div[11]/table/tbody/tr/td/div/table/tbody/tr/td/div[2]/div/table/tbody';
var ReportTable = document.evaluate(ReportTableFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
ReportTable = ReportTable.iterateNext();

//Character Infos
var CharacterMainFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/table/tbody/tr/td[2]/table/tbody';
var CharacterMain = document.evaluate(CharacterMainFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
CharacterMain  = CharacterMain.iterateNext();

//OnlineList
var PlayersOnline = new Array();
var PlayersVocation = new Array();
var PlayerLevel = new Array();

//vips
var VipsNames = new Array();
var VipsWorlds = new Array();
var AllOnline = new Array();

//------------Global Functions------------
function IsOnline(CharName)
{
    var Online = false;
    for (i in PlayersOnline) 
    {
        if (PlayersOnline[i]==CharName)
        {
            Online = true;
        }
    }
    return Online;
}

function LoadAndParseOnlineList(world)
{
    var request =new XMLHttpRequest();
    var time = new Date();
    time = time.getTime();
    request.open('Get','http://www.tibia.com/community/?subtopic=whoisonline&world='+world+'&rand=' + time,false);
    request.send();
    var OnlineListHTML = request.responseText;
    var regex = new RegExp('subtopic=characters&name=.+?>(.+?)</A></TD><TD.*?>(.+?)</TD><TD.*?>(.+?)</TD></TR>', 'g');
    while (FoundedLink=regex.exec(OnlineListHTML)) 
    {
        m = new RegExp('&name=.+?">','');
        var Name = new String(FoundedLink);
        Name = m.exec(Name);
        var Name = new String(Name);
        Name = Name.replace('&name=','');
        Name = Name.replace('+',' ');
        Name = Name.replace('+',' ');
        Name = Name.replace('+',' ');
        Name = Name.replace('">','');
        PlayersOnline.push(Name);
    } 
}
//------------/Global Functions------------

//------------Settings------------
function AddSettingsButton()
{
    try
    {
        GM_registerMenuCommand('Tibia Tools Settings', ShowSettings);
    }
    catch (e)
    {
    }
    //Add button to menu
    var ButtonHTML =   '<span onclick="window.location.replace(window.location.href+\'&ToolSettings=Show\');">'+
                             '<div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/button-background.gif&quot;);" class="MenuButton">'+
                                '<div onmouseout="MouseOutMenuItem(this);" onmouseover="MouseOverMenuItem(this);"><div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/button-background-over.gif&quot;); visibility: hidden;" class="Button"></div>'+
                                '<span class="Lights" id="shops_Lights" style="visibility: visible;">'+
                                    '<div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/green-light.gif&quot;);" class="light_lu"></div>'+
                                    '<div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/green-light.gif&quot;);" class="light_ld"></div>'+
                                    '<div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/green-light.gif&quot;);" class="light_ru"></div>'+
                                '</span>'+
                                '<div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/icon-shops.gif&quot;);" class="Icon" id="shops_Icon"></div>'+
                                '<div class="Label" id="library_Label" style="color:#FFFFFF" >Tool settings</div>'+
                                '<div style="background-image: url(&quot;https://static.tibia.com/images/global/general/plus.gif&quot;);" class="Extend" id="shops_Extend"></div>'+
                            '</div>'+
                            '</div>'+
                        '</span></a></div>';
    var ShopButtonFind = '//*[@id="MenuBottom"]';
    var ShopButton = document.evaluate(ShopButtonFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    ShopButton = ShopButton.iterateNext();  
    
    var ButtonSettings = document.createElement('div');  
    ShopButton.parentNode.insertBefore(ButtonSettings,ShopButton);     
    ButtonSettings.innerHTML = ButtonHTML;
    ButtonSettings.setAttribute('class', 'menuitem');
    ButtonSettings.setAttribute('id', 'Settings');
}

function GetSetting (Name)
{
    for (i in settings)
    {
        if (settings[i][0]==Name)
        {
            return settings[i][1];
        }
    }
}

function SafeSettings ()
{
    var regex = new RegExp('setting_([0-9]|[0-9][0-9])=(.+?)&', 'g'); 
    var tmp = Location+'&';
    var p;
    while (p = regex.exec(tmp))
    {
        localStorage.setItem(p[1],p[2]);
    }
}

function OnOfToBol(str)
{
    if (str == 'off')
    {
        return false;
    } else
    {
        return true;
    }
}

function LoadSettings ()
{
    for (i in settings)
    {
        try
        {
            settings[i][1] = OnOfToBol(localStorage.getItem(i,'on'));
        }
        catch(e)
        {
            settings[i][1] = true;
        }
    }
}

function GetChecked (Bol)
{
    if (Bol) 
    {
        return ' checked';
    } else
    {
        return ' ';
    }
}

function ShowSettings()
{
    //Show Settings to Edit them
    document.title = 'Settings for Tibia Tools';  
    var ContentFind = '/html/body'
    var Content = document.evaluate(ContentFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    Content = Content.iterateNext();  
    var tmp =
        '<form action="http://www.tibia.com/news/?subtopic=latestnews" method="get">'+
            '<table bgcolor="#FFFFFF">'+ 
                '<tr>'+
                    '<td><h1>Settings for Tibia Tools</h1></td>'+
                    '<td><input type="hidden" name="Settings" value="DoSettings">might not work on all systems. proved to work at firefox. <br> If it don\'t work for you, then you need to set settings in skript code.</td>'+
                '</tr>';
    for (i in settings)
    {
    tmp = tmp + 
                '<tr>'+
                    '<td><a>'+settings[i][2]+'</a></td>'+
                    '<td><a>Yes:<input type="radio" name="setting_'+i+'" value="on"'+GetChecked(settings[i][1])+'>  </a>'+
                        '<a>No:</a><input type="radio" name="setting_'+i+'" value="off"'+GetChecked(!settings[i][1])+'> </td>'+ 
                '</tr>'; 
    }       
    tmp = tmp +  
                '<tr>'+
                    '<td></td>'+
                    '<td><input type="submit" value=" Save settings" ></td>'+ 
                '</tr>';            
            '</table>'+
        '</form>';
    Content.innerHTML = tmp;
}
//------------/Settings------------

//------------Functions for AccountPage------------
function AddLinksToReports() 
{
    for (i=1; i<ReportTable.children.length; i++)
    {
        var CharName = ReportTable.children[i].children[2].innerHTML;
        ReportTable.children[i].children[2].innerHTML = 
        '<a href="http://www.tibia.com/community/?subtopic=characters&name='+CharName+'">'+CharName+'</a>';
        
    }
}

function AddLinksToCharListC() 
{
    var CharacterFind = '//*[@id="accountmanagement"]';
    var Character = document.evaluate(CharacterFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    Character = Character.iterateNext();
    Character = Character.innerHTML;
    var regex = new RegExp('<td><nobr>([0-9]|[0-9][0-9]).&nbsp;(.+?)</nobr></td>', 'g');
    var m = '';
    while (m=regex.exec(Character))
    {
        m = m[2];
        var LinkedName = m.replace('&nbsp;','+');    
        var LinkedName = m.replace('&nbsp;','+');   
        var LinkedName = m.replace('&nbsp;','+');   
        LinkedName = '<a href="http://www.tibia.com/community/?subtopic=characters&name='+LinkedName+'">'+m+'</a>' 
        Character = Character.replace(m, LinkedName);
    }
    var changedText = Character;
    Character = document.evaluate(CharacterFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    Character = Character.iterateNext();
    Character.innerHTML = changedText;

}
//------------/Functions for AccountPage------------

//------------Functions for Character Infos------------
function MakeHouseClickable ()
{
    var HouseMain;
    var HousePos = -1;
    var HouseWorld;
    //Getting dates
    for (i=0; i<CharacterMain.children.length; i++)
    {
        if (CharacterMain.children[i].children[0].innerHTML=='House:') 
        {
            var HouseMain   = CharacterMain.children[i].children[1].innerHTML;
            var HousePos    = i;
        }       
        if (CharacterMain.children[i].children[0].innerHTML=='World:')
        {
            var HouseWorld = CharacterMain.children[i].children[1].innerHTML;
        } 
    }
    if (HousePos != -1) 
    {
       var HouseEndPos = HouseMain.search(' is paid until');
       HouseMain = HouseMain.replace(HouseMain.substr(HouseEndPos), '');
       //HouseMain contains now "Housename (city)"
       var CityNotSet = true;
       var i=HouseMain.length;
       while (CityNotSet)
       {
           if (HouseMain.charAt(i) == '(') 
           {
                var CityBegin = i;
                CityNotSet = false;
           }
           i=i-1;
       }

       var HouseCity  = HouseMain.substr(CityBegin+1, HouseMain.length-CityBegin-2);
       var HouseName  = HouseMain.replace(' ('+HouseCity+')','') 
      
       //Manipulationg House for link
       var OldHouseInfo = CharacterMain.children[HousePos].children[1].innerHTML;
       var Adding = '<div style="float: right;"><a href="http://tibia.wikia.com/wiki/'+HouseName+'">More Infos</a> by Tibia Wikia</div>';
       CharacterMain.children[HousePos].children[1].innerHTML = OldHouseInfo+Adding;  
    }
}
function AddOnlineToHiddenChars ()
{
    var Name = new String();
    for (i=0; i<CharacterMain.children.length; i++)
    {
        if (CharacterMain.children[i].children[0].innerHTML=='Name:') 
        {
            var NamePos = i;
            var Name = CharacterMain.children[i].children[1].innerHTML;
            if (Name.search('<') > -1)
            {    
                Name = Name.substr(0,Name.search('<')-1);
            }
        } 
        if (CharacterMain.children[i].children[0].innerHTML=='World:')
        {
            var World = CharacterMain.children[i].children[1].innerHTML;
        }       
    }
    LoadAndParseOnlineList(World);

    if (IsOnline(Name))
    {
        CharacterMain.children[NamePos].children[1].innerHTML = 
        '<b class="green">'+CharacterMain.children[NamePos].children[1].innerHTML+'</b>';
    } else
    {
        CharacterMain.children[NamePos].children[1].innerHTML = 
        '<b class="red">'+CharacterMain.children[NamePos].children[1].innerHTML+'</b>';
    }
}
function AddFullDeathLsitToChar ()
{
    var DeathlistFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/table/tbody/tr/td[2]/table[3]';
    var Deathlist = document.evaluate(DeathlistFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    if (Deathlist = Deathlist.iterateNext()) 
    {
        if (Deathlist.children[0].children[0].children[0].innerHTML != '<b>Character Deaths</b>')
        {
            //Create Section
            var AccInfoFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/table/tbody/tr/td[2]/table[2]';
            var AccInfo = document.evaluate(AccInfoFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            AccInfo = AccInfo.iterateNext();      
            var Deathlist = document.createElement('table');
            Deathlist.setAttribute('width', '100%');
            Deathlist.setAttribute('cellspacing', '1');
            Deathlist.setAttribute('cellpadding', '4');
            Deathlist.setAttribute('border', '0');
            Deathlist.innerHTML = '<tbody><tr bgcolor="#505050"><td class="white" colspan="2"><b>Character Deaths</b></td></tr><tr bgcolor="#f1e0c6"><td width="25%" valign="top"> </td><td> </td></tr></tbody><br><br>';
            AccInfo.parentNode.insertBefore(Deathlist, AccInfo);
        }
    } 
    else
    {
        //Create Section
        var AccInfoFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/table/tbody/tr/td[2]/table[2]';
        var AccInfo = document.evaluate(AccInfoFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        AccInfo = AccInfo.iterateNext();      
        var Deathlist = document.createElement('table');
        Deathlist.setAttribute('width', '100%');
        Deathlist.setAttribute('cellspacing', '1');
        Deathlist.setAttribute('cellpadding', '4');
        Deathlist.setAttribute('border', '0');
        Deathlist.innerHTML = '<tbody><tr bgcolor="#505050"><td class="white" colspan="2"><b>Character Deaths</b></td></tr><tr bgcolor="#f1e0c6"><td width="25%" valign="top"> </td><td> </td></tr></tbody><br><br>';
        AccInfo.parentNode.insertBefore(Deathlist, AccInfo);    
    }
    var Name = new String();
    for (i=0; i<CharacterMain.children.length; i++)
    {
        if (CharacterMain.children[i].children[0].innerHTML=='Name:') 
        {
            var NamePos = i;
            var Name = CharacterMain.children[i].children[1].innerHTML;
            if (Name.search('<') > -1)
                {    
                    Name = Name.substr(0,Name.search('<')-1);
                }
        }       
    }
    Name = Name.replace(' ', '+');
    Name = Name.replace(' ', '+');
    Name = Name.replace(' ', '+');
    var AddingNode = document.createElement('td');
    AddingNode.setAttribute('colspan', '1');
    AddingNode.setAttribute('class', 'white');
    AddingNode.innerHTML = '<b><a href="http://tibiaring.com/Char.php?Lang=EN&C='+Name+'" style="color:yellow;" >All Deaths</a> by TibiaRing</b>';
    Deathlist.children[0].children[0].children[0].parentNode.insertBefore(AddingNode, Deathlist.children[0].children[0].children[0].iterateNext);
    Deathlist.children[0].children[0].children[0].setAttribute('colspan', '1');
}

function AddExternalInfoToChar()
{
    //Get Name and world
    var Name = new String();
    for (i=0; i<CharacterMain.children.length; i++)
    {
        if (CharacterMain.children[i].children[0].innerHTML=='Name:') 
        {
            var NamePos = i;
            var Name = CharacterMain.children[i].children[1].innerHTML;
            if (Name.search('<') > -1)
            {    
                Name = Name.substr(0,Name.search('<')-1);
            }
        } 
        if (CharacterMain.children[i].children[0].innerHTML=='World:')
        {
            var World = CharacterMain.children[i].children[1].innerHTML;
        }       
    }
    //add externa section
    var ExternalSection = document.createElement('tr');
    ExternalSection.setAttribute('bgcolor',CharacterMain.children[CharacterMain.children.length-2].getAttribute('bgcolor'));
    var Lable = document.createElement('td');
    Lable.innerHTML = 'External infos:';
    ExternalSection.insertBefore(Lable, ExternalSection.nextSibling);
    CharacterMain.insertBefore(ExternalSection, CharacterMain.nextSibling)
    EscapedName = Name.replace(' ','+');
    EscapedName = EscapedName.replace(' ','+');
    EscapedName = EscapedName.replace(' ','+');
    var Links = '';
    //Adding Links
    if (GetSetting('CharInfoAddExternalOnlineTime')) 
    {
        Links = Links + '<a href="http://www.pskonejott.com/otc_display.php?character='+EscapedName+'">Online Time Counter</a> by Pskonejott<br>';
    }   
    if (GetSetting('CharInfoAddExternalExp'))
    {
        Links = Links + '<a href="http://www.tibia-stats.com/index.php?akcja=777&player='+Name+'"> Exp history</a> by Tibia-Stats<br>'     
    }
    LinlList = document.createElement('td');
    LinlList.innerHTML = Links;
    ExternalSection.insertBefore(LinlList, ExternalSection.nextSibling);
}
//------------/Functions for Character Infos------------

//------------Guild Online------------
function GuildOnline()
{
    var GuildMainFind = '/html/body/div/div/div/div[2]/div/div/div/div[5]/div/div/table/tbody/tr/td[2]';
    var GuildMain = document.evaluate(GuildMainFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    GuildMain = GuildMain.iterateNext();
    var SearchStr = GuildMain.textContent;
    var regex = new RegExp('The guild was founded on (.+?) on', 'g');
    var world = regex.exec(SearchStr);
    world = world[1];
    LoadAndParseOnlineList(world);
    var GuildMemberFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/table/tbody/tr/td[2]/table[3]';
    var GuildMember = document.evaluate(GuildMemberFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    GuildMember = GuildMember.iterateNext();
    var OnlineCount = 0;
    var OfflineCount = 0;
    for (i=2; i<GuildMember.children[0].children.length; i++)
    {
        var CharName = GuildMember.children[0].children[i].children[1].innerHTML;
        regex = new RegExp('">(.+?)<', 'g');
        CharName = regex.exec(CharName);
        CharName = CharName[1];
        CharName = CharName.replace('&nbsp;',' ');
        CharName = CharName.replace('&nbsp;',' ');
        CharName = CharName.replace('&nbsp;',' ');
        var Online = false;
        //Add online or ofline text
        for (x in PlayersOnline) 
        {
            if (PlayersOnline[x]==CharName)
            {
                Online = true;
            }
        }
        if (Online)
        {
            GuildMember.children[0].children[i].children[1].innerHTML = GuildMember.children[0].children[i].children[1].innerHTML +
                                                                        '<b style="float: right;" class="green"> Online</b>';
            OnlineCount = OnlineCount + 1;
        } else
        {
            GuildMember.children[0].children[i].children[1].innerHTML = GuildMember.children[0].children[i].children[1].innerHTML +
                                                                        '<b style="float: right;" class="red"> Offline</b>';
            OfflineCount = OfflineCount +1
        }                                                                       
    }
    GuildMember.children[0].children[1].children[1].innerHTML = GuildMember.children[0].children[1].children[1].innerHTML +
         '<b style="float: right;" class="green" >online: '+OnlineCount+'</b><br>'
        +'<b style="float: right;" class="red"   >offline:'+OfflineCount+'</b><br>'
        +'<b style="float: right;"               >total:'+(OfflineCount+OnlineCount)+'</b>';
}
//------------/Guild Online------------

//-----------Forum---------------
function AddForumSearch()
{
    //insert button
    var LineFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/table[2]/tbody/tr[2]/td';
    var Line = document.evaluate(LineFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    Line = Line.iterateNext();   
    
    var Location = window.location.href;
    var regex = new RegExp('action=board&boardid=(.+?)(;|&)', 'g');
    var BoardId = regex.exec(Location+';');
    BoardId = BoardId[1];
    
    regex = new RegExp('search=(.+?);', 'g');
    var SearchTag = regex.exec(Location+';')
    if (SearchTag == null) { SearchTag = new Array('',''); }
    SearchTag = SearchTag[1];

    var SearchField = document.createElement('b');
    SearchField.setAttribute('style','font-size:8pt;');
    SearchField.innerHTML = '<form action="http://forum.tibia.com/forum/" method="get">'+
                            '<input type="hidden" name="action" value="board">'+
                            '<input type="hidden" name="boardid" value="'+BoardId+'">'+
                            '<br>Forum Search: <input value="'+SearchTag+'" name="search">'+
                            '<input type="submit" value="Search">'+
                            '</form>';
    Line.parentNode.insertBefore(SearchField, Line.nextSibling);    
}
function ForumSearch    ()
{
   var BoardMainFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/table[3]/tbody';
   var BoardMain = document.evaluate(BoardMainFind, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
   BoardMain = BoardMain.iterateNext();
   //Clean page
   var i=BoardMain.children.length-1;
   while (BoardMain.children.length>3) {
        BoardMain.children[i].parentNode.removeChild(BoardMain.children[i]);
        i = i-1;
   }
   //Request and parse pages
   var tmp = Location+';'
   var regex = new RegExp ('boardid=(.+?)&search=(.+?);');
   tmp = regex.exec(tmp);
   var BoardId = tmp[1];
   var SearchStr = tmp [2];
   var request =new XMLHttpRequest();
   for (Page = 1; Page < MaxPages; Page++)
   {
        request.open('Get','http://forum.tibia.com/forum/?action=board&boardid='+BoardId+'&threadage='+SearchTime+'&pagenumber='+Page,false);
        request.send();
        var ForumPage = request.responseText;        
        var regex = new RegExp ('<a href="(.+?)action=thread&amp;threadid=(.+?)">(.+?)</a>','g');
        var Found;
        while (Found = regex.exec(ForumPage))
        {
            if (Found[3].match(SearchStr))
            {
                var InsertResult = document.createElement('tr');  
                BoardMain.insertBefore(InsertResult,BoardMain.children[BoardMain.children.length])     
                InsertResult.innerHTML = '<a href="http://forum.tibia.com/forum/?action=thread&amp;threadid='+Found[2]+'">'+Found[3]+'</a>';
                
            }
        }    
                                                                                                     
   }                                                                                                 
}

function LinkLotterys()
{
    var TitleFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/table[2]/tbody/tr[2]/td/b';
    var Title     = document.evaluate(TitleFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    Title = Title.iterateNext(); 
    Title = Title.innerHTML;
    if (Title.match(new RegExp('(L|l)otter(y|ies)'))) 
    {
        var ID;
        var ThreadContentFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/table[3]/tbody/tr[2]/td[2]/div';
        var ThreadContent = document.evaluate(ThreadContentFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
        ThreadContent = ThreadContent.iterateNext(); 
        var ThreadContentText = ThreadContent.innerHTML;
        
        //TibieML
        var regex = new RegExp ('Tibia( |)(ML|ml|Ml)( |)(Lottery|lottery|)( |)(ID|Id|id)( ||):(| )(.+?)(\n| |<)');
        if (ID = regex.exec(ThreadContentText))
        {
            ID = ID[8];
            ID = ID.replace(' ', '');
            ID = ID.replace('<br>', '');
            ThreadContentText = ThreadContentText.replace(ID, '<a href="http://de.tibiaml.com/lottery/'+ID+'/">'+ID+'</a>');
            
        }   
        var regex = new RegExp ('tibiaml.com/lottery/(.+?)(/|\n| )');
        if (ID = regex.exec(ThreadContentText))
        {
            ID = ID[1];
            ThreadContentText = ThreadContentText.replace(ID, '<a href="http://de.tibiaml.com/lottery/'+ID+'/">'+ID+'</a>');
        }   
        
        //Tibia Lottery
        var regex = new RegExp ('Tibia( |)(Lottery|lottery|)( |)(ID|Id|id|)( ||):(| )(.+?)(\n| |<)');
        if (ID = regex.exec(ThreadContentText))
        {
            ID = ID[7];
            ID = ID.replace(' ', '');
            ID = ID.replace('<br>', '');
            ThreadContentText = ThreadContentText.replace(ID, '<a href="http://tibialottery.com/view/'+ID+'">'+ID+'</a>');
        }     
        
        //Override Content   
        ThreadContent.innerHTML = ThreadContentText;
    }
}
//-----------/Forum ---------

//-----------Maps--------------------
function AddLinksToMap()
{
    var MainFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/table/tbody/tr/td[2]';
    var Main = document.evaluate(MainFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    Main = Main.iterateNext();
    var MainContent = Main.innerHTML;
    var LinksToAdd = '<a href="http://tibia.wikia.com/wiki/Mapper">Tibia Wikia Map</a><br>'; 
    Main.innerHTML = LinksToAdd+MainContent;
}
//-----------/Maps--------------------

//-----Creature List-----
function MakeSingular(CreatureName)
{
    var special  = false;
    if (CreatureName == 'Cyclops Smiths') 
    {
        Singular = 'Cyclops Smith' 
        special  = true;   
    }
    if (CreatureName == 'Cyclops Drones') 
    {
        Singular = 'Cyclops Drone' 
        special  = true;   
    }
    if (CreatureName == 'Cyclopes') 
    {
        Singular = 'Cyclops' 
        special  = true;   
    }
    if (CreatureName == 'Frost Giantesses') 
    {
        Singular = 'Frost Giantess' 
        special  = true;   
    }   
    
    if  (!special) 
    {
        var Singular = ' '+CreatureName+' ;'; 
        Singular = Singular.replace('ies ', 'y ');
        Singular = Singular.replace('s ', ' ');
        var regex = new RegExp (' (.+?) ;');
        Singular = regex.exec(Singular);
        Singular = Singular[1];
    }
    return Singular;
}

function AddLinksToCreatures ()
{
    var MainBoxFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/div[2]/div[2]/p';
    var MainBox = document.evaluate(MainBoxFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    MainBox = MainBox.iterateNext();  
    
    var CreatureNameFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]/div/div/div[2]/div/h2';
    var CreatureName  = document.evaluate(CreatureNameFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    CreatureName = CreatureName.iterateNext();  
    CreatureName = CreatureName.innerHTML;
    CreatureName = MakeSingular(CreatureName);
    var Adding =    'Fansite links: <br>'+
                    '<a href="http://en.tibiaml.com/creature/'+CreatureName+'">TibiaMl</a>   '+
                    '<a href="http://tibia.wikia.com/wiki/'+CreatureName+'">TibiaWikia</a>   ';    
    MainBox.innerHTML = Adding;
}
//-----/Creature List-----

//-----Vip List---------
function AddVipListButton ()
{
    try
    {
        GM_registerMenuCommand('Vip List', ShowVipList);
    }
    catch(e)
    {
    }
    //Add button to menu
    var ButtonHTML =   '<span onclick="window.location.replace(\'http://www.tibia.com/community/?subtopic=whoisonline&Vips=Show\');">'+
                             '<div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/button-background.gif&quot;);" class="MenuButton">'+
                                '<div onmouseout="MouseOutMenuItem(this);" onmouseover="MouseOverMenuItem(this);"><div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/button-background-over.gif&quot;); visibility: hidden;" class="Button"></div>'+
                                '<span class="Lights" id="shops_Lights" style="visibility: visible;">'+
                                    '<div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/green-light.gif&quot;);" class="light_lu"></div>'+
                                    '<div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/green-light.gif&quot;);" class="light_ld"></div>'+
                                    '<div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/green-light.gif&quot;);" class="light_ru"></div>'+
                                '</span>'+
                                '<div style="background-image: url(&quot;https://static.tibia.com/images/global/menu/icon-shops.gif&quot;);" class="Icon" id="shops_Icon"></div>'+
                                '<div class="Label" id="library_Label" style="color:#FFFFFF" >Vip list</div>'+
                                '<div style="background-image: url(&quot;https://static.tibia.com/images/global/general/plus.gif&quot;);" class="Extend" id="shops_Extend"></div>'+
                            '</div>'+
                            '</div>'+
                        '</span></a></div>';
    var ShopButtonFind = '//*[@id="MenuBottom"]';
    var ShopButton = document.evaluate(ShopButtonFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    ShopButton = ShopButton.iterateNext();  
    
    var ButtonVips = document.createElement('div');  
    ShopButton.parentNode.insertBefore(ButtonVips,ShopButton);     
    ButtonVips.innerHTML = ButtonHTML;
    ButtonVips.setAttribute('class', 'menuitem');
    ButtonVips.setAttribute('id', 'Settings');
}

function ShowVipList ()
{
    //clean up
    var MainFind = '/html/body/div/div[2]/div/div[2]/div/div/div/div[5]';
    var Main = document.evaluate(MainFind , document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    Main = Main.iterateNext();  
    var tmp       = '<table width="100%" cellspacing="1" cellpadding="4" border="0">'+
                        '<tbody>'+
                            '<tr bgcolor="#505050">'+
                                '<td><a class="white">Name</a></td><td><a class="white">Status</a></td>'+
                            '</tr>';
    LoadVips();
    LoadFullOnlineList();
    for (i in VipsNames)
    {
        var EscapedName = VipsNames[i].replace(' ','+');
        var normalName = VipsNames[i];
        EscapedName = EscapedName.replace(' ','+');
        EscapedName = EscapedName.replace(' ','+');
        if (IsOnline(VipsNames[i])) 
        {
            tmp = tmp + '<tr bgcolor="#f1e0c6"><td width="70%"><a href="http://www.tibia.com/community/?subtopic=characters&amp;name='+EscapedName+'">'+normalName+'</a></td><td><b style="color: rgb(0, 255, 0);">Online</b></td></tr>';    
        } else
        {
           tmp = tmp + '<tr bgcolor="#f1e0c6"><td width="70%"><a href="http://www.tibia.com/community/?subtopic=characters&amp;name='+EscapedName+'">'+normalName+'</a></td><td><b style="color: rgb(255, 0, 0);">Offline</b></td></tr>';    
        }
    }                
    var worldStr = localStorage.getItem('VipsWorlds','');
    var nameStr = localStorage.getItem('VipsNames','');         
    tmp =   tmp +    '</tbody></table>'+
                        '<table width="100%" border="0">'+
                        '<tbody>'+
                            '<tr bgcolor="#505050">'+
                                '<td>'+
                                '<form action="" method="get">'+
                                '<input type="hidden" name="subtopic" value="whoisonline">'+
                                '<input type="hidden" name="Vips" value="Show">'+
                                '<table><tr><td>'+
                                '<br>Vips Worlds (formate: #worldname1##worldname2#...)</td><td> <textarea name="VipWorld" cols="50" rows="10">'+worldStr+'</textarea></tr></td><tr><td>'+
                                '<br>Vips Name (formate: #name1##name2#...)</td><td> <textarea name="VipName" cols="50" rows="10">'+nameStr+'</textarea></td></tr></table>'+
                                '<input type="submit" value="Save"></td>'+
                            '</tr>'+
                        '</tbody>'+
                    '</table>'; 
    Main.innerHTML = tmp;                         
}

function LoadVips ()
{
    var worldStr = localStorage.getItem('VipsWorlds','');
    var nameStr = localStorage.getItem('VipsNames','');
    var regex = new RegExp ('#(.+?)#', 'g');
    while (tmp = regex.exec(worldStr))
    {
        VipsWorlds.push(tmp[1]);
    }
    var regex = new RegExp ('#(.+?)#', 'g');
    while (tmp = regex.exec(nameStr))
    {
        VipsNames.push(tmp[1]);
    }   
}

function LoadFullOnlineList()
{
    for(i in VipsWorlds)
    {
        LoadAndParseOnlineList(VipsWorlds[i]);
        AllOnline = AllOnline.concat(AllOnline,PlayersOnline);
    }
    PlayersOnline = AllOnline;
}

function SaveVips ()
{
    var tmp = Location+'&';
    //worlds
    var WorldStr = '';
    var regex = new RegExp ('VipWorld=(.+?)&');
    WorldStr = regex.exec(tmp);
    WorldStr = WorldStr[1];
    while (!(WorldStr == WorldStr.replace('%23','#')))
    {
        WorldStr = WorldStr.replace('%23','#');
    }
    while (!(WorldStr == WorldStr.replace('%0D%0A','')))
    {
        WorldStr = WorldStr.replace('%0D%0A','');
    }
    localStorage.setItem('VipsWorlds',WorldStr);
    //names
    var NameStr = '';
    var regex = new RegExp ('VipName=(.+?)&');
    NameStr = regex.exec(tmp)
    NameStr = NameStr[1];
    while (!(NameStr == NameStr.replace('%23','#')))
    {
        NameStr = NameStr.replace('%23','#');
    }
    while (!(NameStr == NameStr.replace('%0D%0A','')))
    {
        NameStr = NameStr.replace('%0D%0A','');
    }
    while (!(NameStr == NameStr.replace('+',' ')))
    {
        NameStr = NameStr.replace('+',' ');
    }
    localStorage.setItem('VipsNames',NameStr);
}
//-----/Vip List---------


function InitTools()
{
    //Settings
    if (Location.match('ToolSettings=Show')) {
        ShowSettings(); 
    }
    
    //Vip Settings
    if (Location.match('subtopic=whoisonline&Vips=Show&VipWorld=')) {
        SaveVips(); 
    }
    
    //Vip list
    if (Location.match('subtopic=whoisonline&Vips=Show')) {
        ShowVipList(); 
    }
    
    
    //Account manager
    if ((Location.match('subtopic=accountmanagement')) && (!Location.match('https://secure.tibia.com/account/?subtopic=accountmanagement&page=changecharacterinformation'))) {
        if (GetSetting('AccPageCharLinks'))        { AddLinksToCharListC();    } 
        if (GetSetting('AccPageReportLinks'))      { AddLinksToReports();      }   
    }
    
    //Character Page
    if (Location.match('subtopic=character')) {
        if (GetSetting('CharInfoHousesClickable')) { MakeHouseClickable();     }
        if (GetSetting('CharInfoAddExternal'))     { AddExternalInfoToChar();  }
        if (GetSetting('CharInfoFullDeathlist'))   { AddFullDeathLsitToChar(); }
        if (GetSetting('CharInfoOnlineAdding'))    { AddOnlineToHiddenChars(); }        
    }
    
    //Guild page
    if (Location.match('subtopic=guilds')) {
        if (GetSetting('GuildOnlineShow'))    { GuildOnline(); }
    }
    
    //Forum
    if (Location.match('action=board&boardid=')) {
        if (GetSetting('ForumAddSearch'))    { AddForumSearch(); }
        if (Location.match('search='))       { ForumSearch();    }
    }
    
    //Skip homesite
    if (Location.match('mmorpg/free-multiplayer-online-role-playing-game.php'))
    {
        if (GetSetting('SkipBegin'))         { window.location.replace('http://www.tibia.com/news/?subtopic=latestnews'); } 
    }
  
    //Add Links to the creatures
    if (Location.match('topic=creatures&race='))
    {
        if (GetSetting('AddFansiteLinksToCreature')) { AddLinksToCreatures(); }
    }
    
    //Add Links to map
    if (Location.match('subtopic=maps'))
    {
        if (GetSetting('AddFansiteLinksToMaps')) { AddLinksToMap(); }
    }
   
    //Lotterys
    if (Location.match('threadid='))
    {
        if (GetSetting('ForumLinkLotterys')) { LinkLotterys(); }
    } 
}
//parsing settings IF sent
if (Location.match('Settings=DoSettings'))
{
    SafeSettings();
} 
    
//Load Settings
LoadSettings ();

//Manipulate Webpage
InitTools();

//Add Settings Menu
AddSettingsButton();

//Add Viplist-button to Menu
AddVipListButton();