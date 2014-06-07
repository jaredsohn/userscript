// ==UserScript==
// @name       Mine Things - Chat
// @description  Customizes chat and adds a few extra features
// @version    1.523
// @copyright  2013+, iMachine
// @grant GM_log
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyGeneralLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyArraysLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyStringsLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyTablesLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyPreferencesLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyMinethingsLibrary.js

// @match      http://*.minethings.com/miners/list_miners
// ==/UserScript==

var MachinaModule = 'Chat';

function InitialisePreferences()
{
    InitialisePreference ('Chatbox','Maximize',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Chatbox','Background color',PreferenceTypeOnOffPlusValue,true,'#F4EFDF','');
    InitialisePreference ('Chatbox','Height',PreferenceTypeOnOffPlusValue,false,parseInt (document.getElementById ('ChatsDiv').style.height),'');
    InitialisePreference ('Chatbox','Split up posts by different users by this much of a row height',PreferenceTypeOnOffPlusValue,true,0.5,'');
    
    InitialisePreference ('General','My nicknames',PreferenceTypeOnOffPlusValue,false,'','');
    InitialisePreference ('General','Show time since last chat message in tab title',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('General','Show chat activity in tab title',PreferenceTypeOnOff,true,'','');

    InitialisePreference ('Timestamps','Show timestamps in chat',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Timestamps','Use 24hr format',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Timestamps','Show seconds',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Timestamps','Only show timestamps when time or person chatting changes',PreferenceTypeOnOff,true,'','');
    
    var PagerEnabled = InitialisePreference ('Pager','Enabled',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Pager','Switch on by default',PreferenceTypeOnOff,false,'','').RequiresThesePreferencesToBeEnabled.push (PagerEnabled);
    InitialisePreference ('Pager','Show pages in tab title',PreferenceTypeOnOff,true,'','').RequiresThesePreferencesToBeEnabled.push (PagerEnabled);
    InitialisePreference ('Pager','Show pages in alert window',PreferenceTypeOnOff,true,'','').RequiresThesePreferencesToBeEnabled.push (PagerEnabled);
    InitialisePreference ('Pager','Respond to these commands',PreferenceTypeValue,true,'Page,Paging,Calling,Summon,Summoning,Buzzing,Buzz','').RequiresThesePreferencesToBeEnabled.push (PagerEnabled);
    InitialisePreference ('Pager','Ignore pages from these users',PreferenceTypeOnOffPlusValue,false,'CManson,TheIRS,NFlanders','').RequiresThesePreferencesToBeEnabled.push (PagerEnabled);
    InitialisePreference ('Pager','Only respond to pages from these users',PreferenceTypeOnOffPlusValue,false,'','').RequiresThesePreferencesToBeEnabled.push (PagerEnabled);
    InitialisePreference ('Pager','Show pages with this font color',PreferenceTypeOnOffPlusValue,true,'Yellow','').RequiresThesePreferencesToBeEnabled.push (PagerEnabled);
    InitialisePreference ('Pager','Show pages with this background color',PreferenceTypeOnOffPlusValue,true,'Maroon','').RequiresThesePreferencesToBeEnabled.push (PagerEnabled);
    
    InitialisePreference ('Apply flair to','My chat text',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Apply flair to','Chat text mentioning my ID or nicknames',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Apply flair to','Announcements',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Apply flair to','Lottery updates',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Apply flair to','Humour',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Apply flair to','"/me does something" and "*does something*"',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Apply flair to','These keyphrases',PreferenceTypeOnOffPlusValue,true,'Legendary trumpet,Crafted twin airbags,that local sports team','');
    
    InitialisePreference ('Server','Font name',PreferenceTypeOnOffPlusValue,true,'Arial','');
    InitialisePreference ('Server','Font color',PreferenceTypeOnOffPlusValue,true,'Black','');
    InitialisePreference ('Server','Background color',PreferenceTypeOnOffPlusValue,false,'Transparent','');
    InitialisePreference ('Server','Font size',PreferenceTypeOnOffPlusValue,true,11,'');
    InitialisePreference ('Server','Bold font',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Server','Apply user color',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Server','Apply user color to background instead of text',PreferenceTypeOnOff,true,'','').RequiresThesePreferencesToBeEnabled.push (GetPreference ('Server','Apply user color'));
    
    InitialisePreference ('User IDs','Font name',PreferenceTypeOnOffPlusValue,true,'Arial','');
    InitialisePreference ('User IDs','Font color',PreferenceTypeOnOffPlusValue,false,'Black','');
    InitialisePreference ('User IDs','Background color',PreferenceTypeOnOffPlusValue,false,'Transparent','');
    InitialisePreference ('User IDs','Font size',PreferenceTypeOnOffPlusValue,true,14,'');
    InitialisePreference ('User IDs','Bold font',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('User IDs','Apply user color',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('User IDs','Apply user color to background instead of text',PreferenceTypeOnOff,false,'','').RequiresThesePreferencesToBeEnabled.push (GetPreference ('User IDs','Apply user color'));
    InitialisePreference ('User IDs','Remove underlines',PreferenceTypeOnOff,true,'','');
    
    InitialisePreference ('Chat text','Font name',PreferenceTypeOnOffPlusValue,true,'Arial','');
    InitialisePreference ('Chat text','Font color',PreferenceTypeOnOffPlusValue,true,'Black','');
    InitialisePreference ('Chat text','Background color',PreferenceTypeOnOffPlusValue,false,'Transparent','');
    InitialisePreference ('Chat text','Font size',PreferenceTypeOnOffPlusValue,true,14,'');
    InitialisePreference ('Chat text','Bold font',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Chat text','Apply user color',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Chat text','Apply user color to background instead of text',PreferenceTypeOnOff,false,'','').RequiresThesePreferencesToBeEnabled.push (GetPreference ('Chat text','Apply user color'));
    
    InitialisePreference ('Highlighted chat text','Font name',PreferenceTypeOnOffPlusValue,false,'Arial','');
    InitialisePreference ('Highlighted chat text','Font color',PreferenceTypeOnOffPlusValue,false,'Black','');
    InitialisePreference ('Highlighted chat text','Background color',PreferenceTypeOnOffPlusValue,true,'PaleGoldenRod','');
    InitialisePreference ('Highlighted chat text','Font size',PreferenceTypeOnOffPlusValue,false,15,'');
    InitialisePreference ('Highlighted chat text','Bold font',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Highlighted chat text','Apply user color',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Highlighted chat text','Apply user color to background instead of text',PreferenceTypeOnOff,false,'','').RequiresThesePreferencesToBeEnabled.push (GetPreference ('Highlighted chat text','Apply user color'));
    
    InitialisePreference ('Links','Prevent links from being split across lines',PreferenceTypeOnOff,true,'','');
    var MLCP = InitialisePreference ('Links','Make links clickable',PreferenceTypeOnOff,true,'','');
    MLCP.RequiresThesePreferencesToBeEnabled.push (GetPreference ('Links','Prevent links from being split across lines'));
    InitialisePreference ('Links','Font name',PreferenceTypeOnOffPlusValue,false,'Arial','').RequiresThesePreferencesToBeEnabled.push (MLCP);
    InitialisePreference ('Links','Font color',PreferenceTypeOnOffPlusValue,false,'Black','').RequiresThesePreferencesToBeEnabled.push (MLCP);
    InitialisePreference ('Links','Background color',PreferenceTypeOnOffPlusValue,false,'Transparent','').RequiresThesePreferencesToBeEnabled.push (MLCP);
    InitialisePreference ('Links','Font size',PreferenceTypeOnOffPlusValue,false,15,'').RequiresThesePreferencesToBeEnabled.push (MLCP);
    InitialisePreference ('Links','Bold font',PreferenceTypeOnOff,true,'','').RequiresThesePreferencesToBeEnabled.push (MLCP);
    InitialisePreference ('Links','Apply user color',PreferenceTypeOnOff,false,'','').RequiresThesePreferencesToBeEnabled.push (MLCP);
    InitialisePreference ('Links','Apply user color to background instead of text',PreferenceTypeOnOff,false,'','').RequiresThesePreferencesToBeEnabled.push (MLCP);
    GetPreference ('Links','Apply user color to background instead of text').RequiresThesePreferencesToBeEnabled.push (GetPreference ('Links','Apply user color'));
    InitialisePreference ('Links','Remove underlines',PreferenceTypeOnOff,false,'','').RequiresThesePreferencesToBeEnabled.push (MLCP);
    
    InitialisePreference ('Chat input','Font name',PreferenceTypeOnOffPlusValue,true,'Arial','');
    InitialisePreference ('Chat input','Font color',PreferenceTypeOnOffPlusValue,true,'Black','');
    InitialisePreference ('Chat input','Background color',PreferenceTypeOnOffPlusValue,true,'White','');
    InitialisePreference ('Chat input','Font size',PreferenceTypeOnOffPlusValue,true,17,'');
    InitialisePreference ('Chat input','Bold font',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Chat input','Height',PreferenceTypeOnOffPlusValue,false,100,'');

}

// the "var"s below should NOT be changed

var ChatObjectArray = [];
var OldChatDivCount = 0;
var NewChatDivCount = 0;
var Pager = new InitialisedPagerObject ();
var HaveWeProcessedTheFirstBatchOfChatYet = false;
var MyNicknamesArray = [];
var BaseDocumentTitle = document.title;
var ChatActivity = 0;
var LastChatEntryTimeStr = '';
var LastChatEntryUserID = '';
var ScriptCommands = [];
var FlairKeyPhrasesArray = [];
var MyUserID = '';

function InitialisedChatObject ()
{
    this ['UserID'] = '';
    this ['Server'] = '';
    this ['Text'] = '';
    this ['TimeStamp'] = new Date ();
    this ['UserColor'] = '';
    this ['HasSplitAdded'] = false;
    this ['IsSomeonePagingMeOnThisLine'] = false;
}

function InitialisedPagerObject ()
{
    this.SwitchedOn = false;
    this.TotalPagesReceived = 0;
    this.RespondToTheseCommandsArray = [];
    this.IgnorePagesFromTheseUsersArray = [];
    this.OnlyRespondToPagesFromTheseUsersArray = [];
}

function GetCorrespondingBackgroundColorForFontColor (FontColor)
{
    switch (FontColor)
    {
        case 'rgb(85, 102, 107)': return '#E8E8E8'; // grey
        case 'rgb(108, 108, 0)': return '#F6F4D4'; // yellow
        case 'rgb(57, 113, 38)': return '#DEFADE'; // green
        case 'rgb(72, 102, 144)': return '#E0EBFF'; // blue
        case 'rgb(115, 18, 18)': return '#FFE0E5'; // red
        case 'rgb(115, 55, 92)': return '#F6E7F6'; // purple
        case 'rgb(190, 106, 2)': return '#FAD2B0';  // orange
        default: return 'transparent';
    }
}

function GetMyUserID ()
{
    IDDiv = $('.logged-in');
    MyUserID = IDDiv.find ('a').eq(0).text ();
    return MyUserID;
}

function GetDivElement (ChatDiv,Element)
{
    switch (Element.toLowerCase())
    {
        case 'server': return ChatDiv.children ().eq (0); // ChatDiv.find ('font');
        case 'userid': return ChatDiv.children ().eq (1); // ChatDiv.find ('a').eq(0);
        case 'text': return ChatDiv.children ().eq (2); // ChatDiv.find ('span');
        case 'link': return ChatDiv.children ().eq (2).find ('a').eq(0);
    }
    // if we get to here something's up
    return null;
}

var ChatTagsArray = [];
const RandomChatTag = 1;
const CustomChatTag = 2;

function InitialisedChatTag (TagName,TagContent,TagType)
{
    this.Name = TagName;
    this.TokenizedName = GetTokenizedVersionOf (TagName,true,true);
    if (TagType)
        this.TagType = TagType;
    else
        this.TagType = CustomChatTag;
    switch (this.TagType)
    {
        case CustomChatTag:
            this.Content = TagContent || '';
            break;
        case RandomChatTag:
            this.Content = TagContent.split (',') || [];
            break;
    }
}

function AddChatTag (TagName,TagContent,TagType)
{
    var newChatTag = new InitialisedChatTag (TagName,TagContent,TagType);
    ChatTagsArray.push (newChatTag);
    return newChatTag;
}

function AddRandomChatTag (TagName,TagContent)
{
    return AddChatTag (TagName,TagContent,RandomChatTag);
}

function AddCustomChatTag (TagName,TagContent)
{
    return AddChatTag (TagName,TagContent,CustomChatTag);
}

function ResolveChatTags (SourceStr)
{
    var result = SourceStr;
    var tmpParsedArray = result.match (new RegExp ('\\[(.*?)\\]','g'));
    if (tmpParsedArray != null)
    {
        for (cTag = 0; cTag < tmpParsedArray.length; cTag ++)
            result = result.replace (tmpParsedArray [cTag],ResolveChatTags (ResolveChatTagInThisTagString (tmpParsedArray [cTag])));
    }
    return result;
}

function ResolveChatTagInThisTagString (ThisTagString)
{
    var result = ThisTagString;
    var MatchThisStr = GetTokenizedVersionOf (ThisTagString,true,true);
    var ChatTag = FindObjectInArray (ChatTagsArray,'TokenizedName',MatchThisStr);
    
    if (ChatTag != null)
    {
        result = ResolveChatTag (ChatTag);
        if (result == '')
            result = ThisTagString;
    }
    return result;
}

function ResolveChatTag (ChatTag)
{
    result = '';

    switch (ChatTag.TagType)
    {
        case CustomChatTag:
            try {result = ResolveCustomChatTag (ChatTag);} catch (err) {result = '';}
            if (result == '')
                try {result = ResolveMyCustomChatTag (ChatTag);} catch (err) {result = '';}
            break;
        case RandomChatTag:
            result = GetRandomElement (ChatTag.Content);
            break;
    }
    result = ResolveChatTags (result);
    return result;
}

function ResolveCustomChatTag (ChatTag)
{
    var result = '';
    switch (ChatTag.Name)
    {
        case 'Time':
            result = DateToTimeStr (new Date (),true,true);
            break;
        default:
            result = ChatTag.Content;
    }
    return result;
}

function MaximizeChatBoxSpace ()
{
    if (IsPreferenceEnabled ('Chatbox','Maximize'))
    {
        document.getElementById ('ChatsDiv').style.marginTop = '10px';
        document.getElementById ('ChatsDiv').style.width = '830px';
        document.getElementById ('ChatText').style.width = document.getElementById ('ChatsDiv').style.width;
    }
}

function UpdateDocumentTitle ()
{
    var ExistingTitle = document.title;
    var NewTitle = 'Miners/Chat';
    
    if (IsPreferenceEnabled ('Pager','Enabled') && Pager.SwitchedOn && HaveWeProcessedTheFirstBatchOfChatYet && Pager.TotalPagesReceived > 0)
        NewTitle = NewTitle + ' PAGES:' + Pager.TotalPagesReceived;
    
    if (IsPreferenceEnabled ('General','Show chat activity in tab title'))
    {
        ChatActivityStr = '';
        
        var ChatActivityIndicator = '|';
        if (ChatActivity > 0.5) ChatActivityStr += ChatActivityIndicator;
        if (ChatActivity > 2) ChatActivityStr += ChatActivityIndicator;
        if (ChatActivity > 4) ChatActivityStr += ChatActivityIndicator;
        if (ChatActivity > 6) ChatActivityStr += ChatActivityIndicator;
        if (ChatActivity > 8) ChatActivityStr += ChatActivityIndicator;
        if (ChatActivity > 10) ChatActivityStr += ChatActivityIndicator;
        if (ChatActivity > 15) ChatActivityStr += ChatActivityIndicator;
        if (ChatActivity > 20) ChatActivityStr += ChatActivityIndicator;
        if (ChatActivity > 25) ChatActivityStr += ChatActivityIndicator;
        if (ChatActivity > 30) ChatActivityStr += ChatActivityIndicator;
        // this one goes up to 11
        if (ChatActivity > 40) ChatActivityStr += ChatActivityIndicator;
        
        NewTitle += '  ' + ChatActivityStr;
    }
    
    if (IsPreferenceEnabled ('General','Show time since last chat message in tab title'))
    {
        var TimeStampElement = document.getElementById ('timestamp');
        var TimeStampStr = TimeStampElement.innerHTML;
        
        var NewTimeStampStr = TimeStampStr.substr (0,TimeStampStr.indexOf (' ')) + TimeStampStr.substr (TimeStampStr.indexOf (' ') + 1,1);
        
        NewTitle += '  ' + NewTimeStampStr;
    }
    
    if (NewTitle != ExistingTitle)
        document.title = NewTitle;
}

function ApplyPreferenceSectionToDiv (Section,Div,UserColor)
{
    if (IsPreferenceEnabled (Section,'Font name'))
        $(Div).css ('font-family',GetPreferenceValue (Section,'Font name'));
    if (IsPreferenceEnabled (Section,'Font size'))
        $(Div).css ('font-size',parseInt (GetPreferenceValue (Section,'Font size')) + 'px');
    if (IsPreferenceEnabled (Section,'Bold font'))
        $(Div).css ('font-weight','bold');
    
    if (IsPreferenceEnabled (Section,'Font color'))
        $(Div).css ('color',GetPreferenceValue (Section,'Font color'));
    if (IsPreferenceEnabled (Section,'Background color'))
        $(Div).css ('background',GetPreferenceValue (Section,'Background color'));
    else
        $(Div).css ('background','transparent');
    
    if (UserColor && IsPreferenceEnabled (Section,'Apply user color'))
    {
        if (IsPreferenceEnabled (Section,'Apply user color to background instead of text'))
            $(Div).css ('background',GetCorrespondingBackgroundColorForFontColor (UserColor));
        else
            $(Div).css ('color',UserColor);
    }
}

function ApplyOverridesToChatDiv (ChatObject,ChatDiv)
{
    ApplyPreferenceSectionToDiv ('Server',GetDivElement (ChatDiv,'Server'),ChatObject ['UserColor']);
    
    ApplyPreferenceSectionToDiv ('User IDs',GetDivElement (ChatDiv,'UserID'),ChatObject ['UserColor']);
    if (IsPreferenceEnabled ('User IDs','Remove underlines'))
        GetDivElement (ChatDiv,'UserID').css ('text-decoration','none');
    
    ApplyPreferenceSectionToDiv ('Chat text',GetDivElement (ChatDiv,'Text'),ChatObject ['UserColor']);

    if (IsPreferenceEnabled ('Apply flair to','My chat text') && ChatObject ['UserID'] == MyUserID)
        ApplyPreferenceSectionToDiv ('Highlighted chat text',GetDivElement (ChatDiv,'Text'),ChatObject ['UserColor']);
    
    if (GetDivElement (ChatDiv,'Link'))
    {
        ApplyPreferenceSectionToDiv ('Links',GetDivElement (ChatDiv,'Link'),ChatObject ['UserColor']);
        if (IsPreferenceEnabled ('Links','Remove underlines'))
            GetDivElement (ChatDiv,'Link').css ('text-decoration','none');
    }

    if (HaveWeProcessedTheFirstBatchOfChatYet)
    {
        if (IsPreferenceEnabled ('Pager','Enabled') && Pager.SwitchedOn && ChatObject ['IsSomeonePagingMeOnThisLine'])
        {
            if (IsPreferenceEnabled ('Pager','Show pages with this font color'))
                GetDivElement (ChatDiv,'Text').css ('color',GetPreferenceValue ('Pager','Show pages with this font color'));
            if (IsPreferenceEnabled ('Pager','Show pages with this background color'))
                GetDivElement (ChatDiv,'Text').css ('background',GetPreferenceValue ('Pager','Show pages with this background color'));
        }
    }
}

function ApplyOverridesToAllChatDivs ()
{
    for (var cChatDiv = 0; cChatDiv < NewChatDivCount; cChatDiv++)
    {
        var ChatObject = ChatObjectArray [cChatDiv];
        var ChatDiv = $('#ChatsDiv').find ('div').eq (cChatDiv);
        
        ApplyOverridesToChatDiv (ChatObject,ChatDiv);
    }
}

function ProcessAnyPagerCallsForThisChatDiv (ChatObject,ChatDiv)
{
    if (!HaveWeProcessedTheFirstBatchOfChatYet)
        return;
    if (!(IsPreferenceEnabled ('Pager','Enabled') && Pager.SwitchedOn))
        return;
    
    var tmpUserID = GetTokenizedVersionOf (ChatObject ['UserID']);
    var tmpChatText = GetTokenizedVersionOf (ChatObject ['Text'],false,true);
    
    ChatObject ['IsSomeonePagingMeOnThisLine'] = false;
    
    // check that we actually want to accept pages from this user. if not, don't even bother processing the text, just exit
    if (IsPreferenceEnabled ('Pager','Ignore pages from these users') && Pager.IgnorePagesFromTheseUsersArray.indexOf (tmpUserID) != -1)
        return;
    if (IsPreferenceEnabled ('Pager','Only respond to pages from these users') && Pager.OnlyRespondToPagesFromTheseUsersArray.indexOf (tmpUserID) == -1)
        return;

    // now see if the text is actually a properly formatted pager command  ie.  'paging machina'
    for (var cCommand = 0; cCommand < Pager.RespondToTheseCommandsArray.length; cCommand++)
    {
        var tmpCommand = GetTokenizedVersionOf (Pager.RespondToTheseCommandsArray [cCommand],false,true);
        if (tmpChatText.indexOf (tmpCommand) == 0)
        {
            // ok we've got a command match, now see if we can find a match with one of my nicknames
            // chop off the command part of the text (and the space character after it) and hopefully our nickname will be the first item of the new text
            tmpChatText = tmpChatText.replace (tmpCommand+' ','');
            if (DoesStringContainAnyOf (ChatObject ['Text'],MyNicknamesArray,true,true))
            {
                // ok we've got a properly formatted page command addressed to us
                ChatObject ['IsSomeonePagingMeOnThisLine'] = true;
                Pager.TotalPagesReceived++;
                if (IsPreferenceEnabled ('Pager','Show pages in alert window'))
                    alert ('Page from ' + ChatObject ['UserID'] + ': ' + ChatObject ['Text']);
                break;
            }
        }
    }
}

function ProcessNewChatObject (ChatObject,ChatDiv)
{
    // timestamps
    ChatObject ['TimeStamp'] = new Date ();
    if (IsPreferenceEnabled ('Timestamps','Show timestamps in chat'))
    {
        var TimeStr = DateToTimeStr (ChatObject ['TimeStamp'],IsPreferenceEnabled ('Timestamps','Use 24hr format'),IsPreferenceEnabled ('Timestamps','Show seconds'));
        var TimeHTML = 'color:'+GetPreferenceValue ('Server','Font color');
        if (IsPreferenceEnabled ('Timestamps','Only show timestamps when time or person chatting changes'))
        {
            if (TimeStr == LastChatEntryTimeStr && ChatObject ['UserID'] == LastChatEntryUserID)
                TimeHTML = 'color:transparent';

        }
        $(GetDivElement (ChatDiv,'Server')).html ('<span style="background-color:'+GetPreferenceValue ('Chatbox','Background color')+';'+TimeHTML+'">'+TimeStr+'</span> '+ ChatObject ['Server'] + '&nbsp');
        LastChatEntryTimeStr = TimeStr;
        LastChatEntryUserID = ChatObject ['UserID'];
    }
    else
        $(GetDivElement (ChatDiv,'Server')).html (ChatObject ['Server'] + '&nbsp');

    // handle "*doing something*" format chat and convert to "/me doing something"
    var tmpParsedArray = ChatObject ['Text'].match (/^\*(.*?)\*$/);
    if (tmpParsedArray != null && tmpParsedArray [1].length > 0)
        ChatObject ['Text'] = '/me ' + tmpParsedArray [1];
        
    var tmpArray = ScanStringForScriptCommand (ChatObject ['Text']);

    if (tmpArray [0] == true)
    {
        // script commands
        var CommandInstance = tmpArray [1];
        if (CommandInstance != null)
            PerformScriptCommand (CommandInstance,ChatObject,ChatDiv);
        else
            console.log ('command "'+ChatObject ['Text']+'" not recognized');
    }
    else
    {
        // special cases which are not script commands or page commands
        if (!ChatObject ['IsSomeonePagingMeOnThisLine'])
        {
            // mentions of user id or nickname
            if (ChatObject ['UserID'] != MyUserID && DoesStringContainAnyOf (ChatObject ['Text'],MyNicknamesArray,true,true))
            {
                if (IsPreferenceEnabled ('Apply flair to','Chat text mentioning my ID or nicknames'))
                    ApplyPreferenceSectionToDiv ('Highlighted chat text',GetDivElement (ChatDiv,'Text'),ChatObject ['UserColor']);
            }

            // mentions of flair keyphrases
            if (DoesStringContainAnyOf (ChatObject ['Text'],FlairKeyPhrasesArray,true,true))
            {
                if (IsPreferenceEnabled ('Apply flair to','These keyphrases'))
                    ApplyPreferenceSectionToDiv ('Highlighted chat text',GetDivElement (ChatDiv,'Text'),ChatObject ['UserColor']);
            }

            // dwar's lottery
            if (ChatObject ['UserID'] == 'Dwarstop' && Trim (ChatObject ['Text']).indexOf ('[Lottery') == 0)
            {
                if (IsPreferenceEnabled ('Apply flair to','Lottery updates'))
                {
                    ApplyPreferenceSectionToDiv ('Highlighted chat text',GetDivElement (ChatDiv,'Text'),ChatObject ['UserColor']);
                }
                LastKnownLotteryStatus = ChatObject ['Text'];
                return;
            }
        }
        if (HaveWeProcessedTheFirstBatchOfChatYet)
            try {ProcessMyNewChatObject (null,ChatObject,ChatDiv);} catch (err) {}
    }
}

function ScanAndProcessChat ()
{
    OldChatDivCount = NewChatDivCount;
    NewChatDivCount = $('#ChatsDiv').find ('div').length;
    
    // if there isn't any new chat to process, exit
    if (NewChatDivCount == OldChatDivCount)
        return;
    
    // add new chat to array and process it
    for (var cChatDiv = OldChatDivCount; cChatDiv < NewChatDivCount; cChatDiv++)
    {
        var ChatDiv = $('#ChatsDiv').find ('div').eq (cChatDiv);
        var ChatObject = new InitialisedChatObject ();
        
        // copy data from onscreen div to array
        ChatObject ['Server'] = GetDivElement (ChatDiv,'Server').text () [0];
        ChatObject ['UserID'] = GetDivElement (ChatDiv,'UserID').text ();
        ChatObject ['Text'] = GetDivElement (ChatDiv,'Text').text ();
        ChatObject ['UserColor'] = GetDivElement (ChatDiv,'Text').css ('color');
        ChatObjectArray.push (ChatObject);
        
        // pager
        ProcessAnyPagerCallsForThisChatDiv (ChatObject,ChatDiv);
        
        // process links in chat text
        if (IsPreferenceEnabled ('Links','Prevent links from being split across lines'))
        {
            ChatObject ['Text'] = ChatObject ['Text'].replace (/(\r\n|\n|\r)/gm,'#linebreak#');
            ChatObject ['Text'] = ChatObject ['Text'].replace (/#linebreak#/g,'');
            ChatObject ['Text'] = ChatObject ['Text'].replace (/#linebreak#/g,'');
            
            if (IsPreferenceEnabled ('Links','Make links clickable'))
                ChatObject ['Text'] = ChatObject ['Text'].linkify ();
            
            GetDivElement (ChatDiv,'Text').html (ChatObject ['Text']);
        }

        if (cChatDiv > 0)
        {
            if (IsPreferenceEnabled ('Chatbox','Split up posts by different users by this much of a row height'))
            {
                // compare this div's UserID with the previous div's UserID, and if they're different, apply spacing at end of previous div
                var ChatObjectIndex = ChatObjectArray.indexOf (ChatObject);
                var PreviousChatObject = ChatObjectArray [ChatObjectIndex - 1];
                var PreviousChatDiv = $('#ChatsDiv').find ('div').eq (ChatObjectIndex - 1);
                if (PreviousChatObject ['UserID'] != ChatObject ['UserID'] && !PreviousChatObject ['HasSplitAdded'])
                {
                    PreviousChatDiv.append ('<p style="font-size:' + Math.floor (parseInt(GetDivElement (PreviousChatDiv,'Text').css ('font-size')) * parseFloat (GetPreferenceValue ('Chatbox','Split up posts by different users by this much of a row height'))) + 'px"></p>');
                    PreviousChatObject ['HasSplitAdded'] = true;
                }
            }
        }

        // update the onscreen div with updated data from array object
        ApplyOverridesToChatDiv (ChatObject,ChatDiv);

        ProcessNewChatObject (ChatObject,ChatDiv);

        if (HaveWeProcessedTheFirstBatchOfChatYet)
            ChatActivity = ChatActivity + 1;
    }
    HaveWeProcessedTheFirstBatchOfChatYet = true;
    
    // keep the scrollbar updated to reflect the new contents of chatbox
    ChatsDiv.style.overflowY = 'auto';
}

function HasChatTextAppearedWithinTheLastXChatEntries (ChatText,ThisManyEntries)
{
    for (var cEntry = ChatObjectArray.length - 1; cEntry > ChatObjectArray.length - 1 - ThisManyEntries; cEntry --)
    {
        if (cEntry < 0)
            break;
        if (ChatText == ChatObjectArray [cEntry] ['Text'])
            return true;
    }
    return false;
}

function SendChatTextToChatBox (ChatText)
{
    var ChatTextElement = document.getElementById ('ChatText');
    ExistingChatText = ChatTextElement.value;
    ExistingSelStart = ChatTextElement.selectionStart;
    ExistingSelEnd = ChatTextElement.selectionEnd;
    ChatTextElement.value = ChatText;
    $('#SendButton').click ();
    ChatTextElement.value = ExistingChatText;
    ChatTextElement.selectionStart = ExistingSelStart;
    ChatTextElement.selectionEnd = ExistingSelEnd;
}

function BuildAndShowPreferenceDiv ()
{
    PreferencesButton.style.display = 'none';
    
    BuildPreferencesDiv ();
    document.getElementById ('AdListMinersForm').appendChild (PreferencesDiv);
}

function TogglePagerOnOff ()
{
    switch (Pager.SwitchedOn)
    {
        case true:
            Pager.SwitchedOn = false;
            PagerOnOffButton.style.background = 'none';
            PagerOnOffButton.value = 'Switch pager on';
            
            Pager.TotalPagesReceived = 0;
            for (var c = 0; c < ChatObjectArray.length; c++)
                ChatObjectArray [c] ['IsSomeonePagingMeOnThisLine'] = false;
            ApplyOverridesToAllChatDivs ();            
            break;
        case false:
            Pager.SwitchedOn = true;
            PagerOnOffButton.style.background = 'palegreen';
            PagerOnOffButton.value = 'Switch pager off';
            break;
    }
}

function CreateControlPanel ()
{
    PreferencesButton = document.createElement ('input');
    PreferencesButton.type = 'button';
    PreferencesButton.value = 'Preferences..';
    PreferencesButton.onclick = function () {BuildAndShowPreferenceDiv ()};
    document.getElementById ('AdListMinersForm').appendChild (PreferencesButton);
    
    PagerOnOffButton = document.createElement ('input');
    PagerOnOffButton.type = 'button';
    PagerOnOffButton.value = 'Switch pager on';
    PagerOnOffButton.onclick = function () {TogglePagerOnOff ()};
    document.getElementById ('AdListMinersForm').appendChild (PagerOnOffButton);
    
    if (!IsPreferenceEnabled ('Pager','Enabled'))
        PagerOnOffButton.style.display='none';
}

function InitialiseChatTextKeyPressEventHandler ()
{
    var ChatTextElement = document.getElementById ('ChatText');
    defaultKeypressEvent = ChatTextElement.onkeypress;

    ChatTextElement.onkeypress = function(e) {
        if (e.keyCode == 13)
            {
            try {ChatTextElement.value = ResolveChatTags (ChatTextElement.value);} catch (err) {}
        }
        return defaultKeypressEvent.call (this,e);
    }
}

function InitialiseChat ()
{
    InitialiseChatTextKeyPressEventHandler ();
    if (IsPreferenceEnabled ('General','My nicknames'))
        MyNicknamesArray.push.apply (MyNicknamesArray,GetPreferenceValue ('General','My nicknames').split (','));
    MyNicknamesArray.push (GetTokenizedVersionOf (MyUserID));

    FlairKeyPhrasesArray.push.apply (FlairKeyPhrasesArray,GetPreferenceValue ('Apply flair to','These keyphrases').split (','));

    if (IsPreferenceEnabled ('Chatbox','Background color'))
        $('#ChatsDiv').css ('background',GetPreferenceValue ('Chatbox','Background color'));
    
    if (IsPreferenceEnabled ('Chatbox','Maximize'))
        MaximizeChatBoxSpace ();
    
    if (IsPreferenceEnabled ('Chatbox','Height'))
        document.getElementById ('ChatsDiv').style.height = (parseInt (GetPreferenceValue ('Chatbox','Height')) + 'px').toString();
    
    if (IsPreferenceEnabled ('Chat input','Height'))
        document.getElementById ('ChatText').style.height = (parseInt (GetPreferenceValue ('Chat input','Height')) + 'px').toString();
    
    ApplyPreferenceSectionToDiv ('Chat input',$('#ChatText'));
    
    CreateControlPanel ();
    
    if (IsPreferenceEnabled ('Pager','Enabled'))
    {
        Pager.SwitchedOn = IsPreferenceEnabled ('Pager','Switch on by default');
        Pager.RespondToTheseCommandsArray = GetPreferenceValue ('Pager','Respond to these commands').splitAndTokenize (',');
        Pager.IgnorePagesFromTheseUsersArray = GetPreferenceValue ('Pager','Ignore pages from these users').splitAndTokenize (',');
        Pager.OnlyRespondToPagesFromTheseUsersArray = GetPreferenceValue ('Pager','Only respond to pages from these users').splitAndTokenize (',');
        // toggle onoff twice - this will redraw the button properly and have no net result
        TogglePagerOnOff ();
        TogglePagerOnOff ();
    }
}

function InitialisedScriptCommandObject (Name,Codes)
{
    this.Name = Name;
    var TokenizedCodes = Codes;
    TokenizedCodes = TokenizedCodes.replace (/ \*/g,'*');
    TokenizedCodes = TokenizedCodes.replace (/\* /g,'*');
    TokenizedCodes = TokenizedCodes.replace (/\*/g,'(.*?)');
    TokenizedCodes = TokenizedCodes.replace (/ /g,'\\s*');
    this.Codes = TokenizedCodes.split (',');

    ScriptCommandCodesSortedByLength.push.apply (ScriptCommandCodesSortedByLength,this.Codes);
}

function InitialisedScriptCommandInstanceObject ()
{
    this.UserID = '';
    this.Command = null;
    this.ScriptCommandCodesSortedByLengthIndex = -1;
    this.CommandCodeInvoked = '';
    this.Parameters = [];
}

function FindScriptCommandFromCode (ThisCode)
{
    for (var c = 0; c < ScriptCommands.length; c ++)
    {
        var tmpCommand = ScriptCommands [c];
        if (tmpCommand.Codes.indexOf (ThisCode) != -1)
            return tmpCommand;
    }
    return null;
}

function AddScriptCommand (Name,Codes)
{
    var result = new InitialisedScriptCommandObject (Name,Codes);
    ScriptCommands.push (result);
    return result;
}

function ScanStringForScriptCommand (ThisString)
{
    var IsStringFormattedAsAScriptCommand = false;
    var ScriptCommandInstance = null;

    var TokenizedString = Trim (ThisString);
    if (TokenizedString.length > 0)
    {
        if ('/#'.indexOf (TokenizedString [0]) != -1)
        {
            IsStringFormattedAsAScriptCommand = true;
            TokenizedString = Trim (TokenizedString.slice (1));
            if (TokenizedString.length > 0)
            {
                // need to add something to the end of the string AND to command Codes to ensure i can
                // obtain the last text parameter because i really suck at programming and can't work
                // out how regexps work
                TokenizedString += '\x00';

                for (var cCode = 0; cCode < ScriptCommandCodesSortedByLength.length; cCode ++)
                {
                    var thisCommandCode = ScriptCommandCodesSortedByLength [cCode];
                    var tmpParsedArray = TokenizedString.match (new RegExp ('^\\b' + thisCommandCode + '\\b(.*?)\\x00','i'));
                    if (tmpParsedArray != null)
                        {
                        for (var c = 0; c < tmpParsedArray.length; c ++)
                            tmpParsedArray [c] = Trim (tmpParsedArray [c]);
                        // get rid of any extraneous punctuation after command name
                        if (tmpParsedArray.length > 1 && '-=:,./'.indexOf (tmpParsedArray [1] [0]) != -1)
                            tmpParsedArray [1] = Trim (tmpParsedArray [1].slice (1));

                        ScriptCommandInstance = new InitialisedScriptCommandInstanceObject ();
                        ScriptCommandInstance.Command = FindScriptCommandFromCode (thisCommandCode);
                        ScriptCommandInstance.CommandCodeInvoked = thisCommandCode;
                        ScriptCommandInstance.ScriptCommandCodesSortedByLengthIndex = cCode;
                        ScriptCommandInstance.Parameters = tmpParsedArray.slice (1);
                        // now deal with (sometimes) empty 1st parameter caused by the hack above
                        if (ScriptCommandInstance.Parameters [0] == '')
                            ScriptCommandInstance.Parameters = ScriptCommandInstance.Parameters.slice (1);
                        break;
                    }
                }
            }
        }
    }
    return [IsStringFormattedAsAScriptCommand,ScriptCommandInstance];
}

function PerformScriptCommandAsUser (UserID,CommandInstance)
{
    CommandInstance.UserID = UserID;
    PerformScriptCommand (CommandInstance);
}

function PerformScriptCommand (CommandInstance)
{
//    console.log ('Performing command: ' + CommandInstance.Command.Name + '  parameter count: ' + CommandInstance.Parameters.length);

    switch (CommandInstance.Command.Name)
    {
    }
}

function TestScriptCommand (CommandStr)

{
console.log ('Processing input: ' + CommandStr);
    var tmpArray = ScanStringForScriptCommand (CommandStr);
    
    if (tmpArray [0] == false)
        console.log ('string not formatted as a command');
    else
    {
        var CommandInstance = tmpArray [1];
        if (CommandInstance == null)
            console.log ('command not recognized');
        else
        {
            var tmpstr = 'Command: "' + CommandInstance.Command.Name + '"';
            if (CommandInstance.Parameters.length > 0)
            {
                tmpstr += '  Parameters:';
                for (var c = 0; c < CommandInstance.Parameters.length; c ++)
                    tmpstr += '  "' + CommandInstance.Parameters [c] + '"';
            }
            console.log (tmpstr);
        }
    }
}

function TestScriptCommands ()
{
    TestScriptCommand ('this should not fire off any commands');
    TestScriptCommand ('/gone');
    TestScriptCommand ('/later people');
    TestScriptCommand ('/me goes afk');
    TestScriptCommand ("/newsflash: it's happening!");
}

function PerformScriptCommand (CommandInstance,ChatObject,ChatDiv)
{
    CommandInstance.UserID = ChatObject ['UserID'];
    switch (CommandInstance.Command.Name)
    {
        case 'AFK':
            console.log ("I'm outta here!");
            break;
        case 'Me':
            console.log ('(' + CommandInstance.CommandCodeInvoked + ') ' + CommandInstance.Parameters [0]);
            if (IsPreferenceEnabled ('Apply flair to','"/me does something" and "*does something*"'))
            {
                $(GetDivElement (ChatDiv,'Text')).css ('font-style','italic');
                $(GetDivElement (ChatDiv,'Text')).text (CommandInstance.Parameters [0]);
            }
            break;
        case 'Announcement':
            console.log ('(' + CommandInstance.CommandCodeInvoked + ') ' + CommandInstance.Parameters [0]);
            if (IsPreferenceEnabled ('Apply flair to','Announcements'))
            {
                $(GetDivElement (ChatDiv,'Text')).text (CommandInstance.CommandCodeInvoked + ': ' + CommandInstance.Parameters [0]);
                ApplyPreferenceSectionToDiv ('Highlighted chat text',GetDivElement (ChatDiv,'Text'),ChatObject ['UserColor']);
            }
            break;
        case 'Humour':
            console.log ('(' + CommandInstance.CommandCodeInvoked + ') ' + CommandInstance.Parameters [0]);
            if (IsPreferenceEnabled ('Apply flair to','Humour'))
            {
                $(GetDivElement (ChatDiv,'Text')).css ('font-style','italic');
                $(GetDivElement (ChatDiv,'Text')).text (CommandInstance.Parameters [0]);
            }
            break;
        case 'Page':
            console.log ('(' + CommandInstance.CommandCodeInvoked + ') ' + CommandInstance.Parameters [0]);
            // the page may have already been dealt with in scanandprocessnewchat
            if (!ChatObject ['IsSomeonePagingMeOnThisLine'])
            {
                ChatObject ['Text'] = 'Paging ' + CommandInstance.Parameters [0];
                ProcessAnyPagerCallsForThisChatDiv (ChatObject,ChatDiv);
            }
            break;
        default:
            if (HaveWeProcessedTheFirstBatchOfChatYet)
                try {ProcessMyNewChatObject (CommandInstance,ChatObject,ChatDiv);} catch (err) {}
    }
}

function InitialiseScriptCommands ()
{
    ScriptCommands = [];
    ScriptCommandCodesSortedByLength = [];

    AddScriptCommand ('AFK','AFK,Away,Out,Gone,BRB,BBL,BBIAB,Back Later,Later,Goodbye,Goodnight,Bye');
    AddScriptCommand ('Me','Me *');
    AddScriptCommand ('Announcement','Announcement,Announce,Announcing,Attention,News,Breaking news,Latest news,News flash,News alert,This just in');
    AddScriptCommand ('Humour','Humour,Humor,Joking,Joke,Sarcasm,Sarcastic,Irony,Ironic');
    AddScriptCommand ('Page','Page,Paging,Calling,Summon,Summoning,Buzzing,Buzz');

    try {InitialiseMyMachinaScriptCommands ();} catch (err) {}

    ScriptCommandCodesSortedByLength.sort(function(a, b){
        return b.length - a.length;
    });
}

function InitialiseChatTags ()
{
    AddCustomChatTag ('Time');

    try {InitialiseMyChatTags ();} catch (err) {}
}

// script starts here

GetMyUserID ();
InitialisePreferences ();

// replace standard crappy highlight color with better one
if (GetPreferenceValue ('Highlighted chat text','Background color') == 'Beige')
{
    SetPreferenceValue ('Highlighted chat text','Background color','PaleGoldenRod');
    SavePreferences ();
}

InitialiseChat ();
InitialiseScriptCommands ();
InitialiseChatTags ();
//TestScriptCommands ();
setInterval (function () {ScanAndProcessChat (); UpdateDocumentTitle ();},100);
setInterval (function () {ChatActivity = ChatActivity - (ChatActivity * 0.007);},1000);
