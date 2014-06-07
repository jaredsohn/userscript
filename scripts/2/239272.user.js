// ==UserScript==

// @name       Mine Things - Messages
// @description Adds automated message processing, different ways of viewing and fetching messages, auto-refresh, filtering, color coding to Minethings messages.
// @version    1.03
// @copyright  2014+, iMachine

// @grant GM_log
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyGeneralLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyArraysLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyStringsLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyTablesLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyNewPreferencesLibrary.js

// @match      http://*.minethings.com/messages/list_all

// ==/UserScript==

var MachinaModule = 'Messages';

function InitialiseModulePreferences ()
{
    InitialisePreferencesModule ();
    
    with (AddPreferencesSectionTemplate ('Message type template'))
    {
        AddPreference ('Color',PreferenceTypeOnOffPlusValue,true,{ValueType: 'color', ValueEditElementLeft:50});
        AddPreference ('On delete',PreferenceTypeValue,true,{DefaultValue: 'Get confirmation', SelectValueFrom: 'Just delete|Get confirmation|Do not allow'});
    }
   
/*
    with (AddPreferencesSection ('Message types'))
    {
        for (c = 0; c < MessageTypesArray.length; c ++)
            {
            var tmpMessageType = MessageTypesArray [c];
            var newSection = AddSection (tmpMessageType.Name,{AsCloneOf: 'Message type template', ShowTitleInPreferencesDiv: false, ShowPreferencesAsInline: true});
            var tmpPreference = newSection.GetPreference ('Color');
            tmpPreference.Name = tmpMessageType.Name;
            tmpPreference.CalculateFullName ();
            tmpPreference.Value = tmpMessageType.DefaultColor;
        }
    }
*/    
    
    with (AddPreferencesSection ('General'))
    {
        AddPreference ('Refresh messages every (this many) minutes',PreferenceTypeOnOffPlusValue,true,{DefaultValue: '5', ValueEditElementWidth: 'Small'});
    }

    with (AddPreferencesSection ('Message view'))
    {
        AddPreference ('View messages',PreferenceTypeValue,true,{DefaultValue: 'Above messages table', SelectValueFrom: 'Above messages table|In new tab|In popup window', ValueEditElementWidth: 'MediumLarge'});
    }
    
    with (AddPreferencesSectionTemplate ('Default message processing template'))
    {
        var tmpMessageTypeNames = [];
        for (c = 0; c < MessageTypesArray.length; c ++)
            tmpMessageTypeNames.push (MessageTypesArray [c].Name);
        
        AddPreference ('Type',PreferenceTypeOnOffPlusValue,true,{DefaultValue: 'Market', SelectValueFrom: tmpMessageTypeNames.join ('|'), ValueEditElementWidth: 'MediumSmall'});
        AddPreference ('Inc.',PreferenceTypeValue,true,{ValueEditElementWidth: 'MediumLarge', RequiresThesePreferencesToBeEnabled: 'Type'});
        AddPreference ('Exc.',PreferenceTypeValue,true,{ValueEditElementWidth: 'MediumLarge', RequiresThesePreferencesToBeEnabled: 'Type'});
    }

    with (AddPreferencesSectionTemplate ('Default delete message template',{AsCloneOf: 'Default message processing template'}))
    {
        GetPreference ('Type').SelectValueFrom = 'Market|Vehicle';
        GetPreference ('Type').SelectValueFromArray = GetPreference ('Type').SelectValueFrom.split ('|');
    }
    
    with (AddPreferencesSection ('Table style',{AsCloneOf: 'Default table style template'}))
    {
    }

    with (AddPreferencesSection ('Table layout'))
    {
        AddPreference ('Show this many rows at once',PreferenceTypeOnOffPlusValue,true,{DefaultValue: '25', ValueEditElementWidth: 'Small'});
        AddPreference ('Subject column width',PreferenceTypeOnOffPlusValue,true,{DefaultValue: 350, ValueEditElementWidth: 'Small'});
    }

    with (AddPreferencesSection ('Color coding',{DefaultPreferenceValueEditElementLeft: 120}))
    {
        with (AddSection ('Unread messages',{ShowPreferencesAsInline: true}))
        {
            AddPreference ('Status column',PreferenceTypeOnOffPlusValue,true,{ValueType: 'color', DefaultValue: '#F5F1A2', ValueEditElementLeft: 100});
            AddPreference ('Subject column',PreferenceTypeOnOffPlusValue,true,{ValueType: 'color', DefaultValue: 'White', ValueEditElementLeft: 100});
        }
        with (AddSection ('Selected messages',{ShowPreferencesAsInline: true}))
            {
            AddPreference ('Selected column',PreferenceTypeOnOffPlusValue,true,{ValueType: 'color', DefaultValue: '#9ADBDB', ValueEditElementLeft: 100});
            AddPreference ('Subject column',PreferenceTypeOnOffPlusValue,true,{ValueType: 'color', DefaultValue: '#9ADBDB', ValueEditElementLeft: 100});
        }

        with (AddSection ('Message types'))
        {
            with (AddSection ('Message type colors',{ShowTitleInPreferencesDiv: false, ShowPreferencesAsInline: true, DefaultPreferenceValueEditElementLeft: 50}))
                {
                for (c = 0; c < MessageTypesArray.length; c ++)
                    {
                    var tmpMessageType = MessageTypesArray [c];
                    AddPreference (tmpMessageType.Name,PreferenceTypeOnOffPlusValue,true,{ValueType: 'color', DefaultValue: tmpMessageType.DefaultColor});
                }
            }
            AddPreference ('Also apply to subject column',PreferenceTypeOnOff,false);
        }

        with (AddPreferencesSectionTemplate ('Default custom color coding template',{AsCloneOf: 'Default message processing template'}))
        {
            AddPreference ('Color',PreferenceTypeValue,true,{ValueType: 'color', DefaultValue: '', RequiresThesePreferencesToBeEnabled: 'Type'});
        }

/*
        with (AddSection ('Custom color coding'))
        {
            with (AddSection ('Action 1',{AsCloneOf: 'Default custom color coding template', ShowTitleInPreferencesDiv: false, ShowPreferencesAsInline: true}))
            {
                GetPreference ('Type').Value = 'Vehicle';
                GetPreference ('Inc.').Value = 'gained things';
                GetPreference ('Exc.').Value = '';
                GetPreference ('Color').Value = 'lime';
            }
            with (AddSection ('Action 2',{AsCloneOf: 'Default custom color coding template', ShowTitleInPreferencesDiv: false, ShowPreferencesAsInline: true}))
            {
                GetPreference ('Type').Value = 'Vehicle';
                GetPreference ('Inc.').Value = 'lost things';
                GetPreference ('Exc.').Value = '';
                GetPreference ('Color').Value = 'red';
            }
        }
*/
    }

    with (AddPreferencesSection ('Automated message processing'))
    {
        AddPreference ('Automatically delete these messages',PreferenceTypeOnOffPlusValue,true,{ValueEditElementType: 'textarea', DefaultValue: '', ValueEditElementWidth: 'Large', ShowValueEditElementAsInline: false});
        AddPreference ('Automatically mark these messages as read',PreferenceTypeOnOffPlusValue,true,{ValueEditElementType: 'textarea', DefaultValue: '', ValueEditElementWidth: 'Large', ShowValueEditElementAsInline: false});
    }

    LoadPreferences (psLocalStorage);
}

function GetColorCoding (TextToBeColorCoded)
{
    switch (TextToBeColorCoded)
    {
        case 'none': return 'transparent';
        case 'background': return 'transparent';
            
        default:
            // if we get to this stage, something's wrong
            return 'red';
    }
}

// the "var"s below should NOT be changed
var DoWeWantToUseLocalStorage = true; // needs to be true to allow figures like Km/h, ETA and extra vehicle details to be displayed.
var MyUserID = '';
var CurrentMinerID = '';
var MessagesArray = [];
var MessageTypesArray = [];
var MinimumLengthOfPartialMatchFilter = 2;
var MaxPagesToShowInPageSelectorDiv = 9;
var PageNumberAtPageLoad = 0;
var CurrentMessagesPageNumber = 0;
var CurrentMessageTypeFilter = 'All';
var IsScriptBusyProcessingPageLoad = false;
var LastRefreshTime = new Date ();
var SecondsSinceLastRefresh = 0;

var IsAMPEnabled = false;
var AMPMode = '';
var AMPMessage = null;
var AMPMessagesToProcess = [];
var AMPStatusStr = '';

function GetMyUserID ()
{
    IDDiv = $('.logged-in');
    MyUserID = IDDiv.find ('a').eq(0).text ();
    return MyUserID;
}

function InitialisedMessageTypeObject (Name,Index,DefaultColor)
{
    this.Name = Name;
    this.Index = Index;
    this.DefaultColor = DefaultColor;
    this.ShowMessagesOfThisType = true;
    this.ShowMessagesOfThisTypeDiv = null;
}

function InitialiseMessageTypes ()
{
    MessageTypesArray.push (new InitialisedMessageTypeObject ('PM',2,'#FFBBBB'));
    MessageTypesArray.push (new InitialisedMessageTypeObject ('Market',1,'#FCFADE'));
    MessageTypesArray.push (new InitialisedMessageTypeObject ('Vehicle',3,'#E0FAD9'));
    MessageTypesArray.push (new InitialisedMessageTypeObject ('Stone',11,'#A6F59F'));
    MessageTypesArray.push (new InitialisedMessageTypeObject ('City',5,'#C7AFED'));
    MessageTypesArray.push (new InitialisedMessageTypeObject ('Thing',6,'#F5E2AB'));
    MessageTypesArray.push (new InitialisedMessageTypeObject ('Factory',7,'#EACFFA'));
    MessageTypesArray.push (new InitialisedMessageTypeObject ('Bum',8,'#DED285'));
    MessageTypesArray.push (new InitialisedMessageTypeObject ('Transfer',9,'#D2FAFA'));
    MessageTypesArray.push (new InitialisedMessageTypeObject ('Banking',10,'#BCCEF7'));
    MessageTypesArray.push (new InitialisedMessageTypeObject ('Admin',4,'#FCF99A'));
}

function InitialisedMessageObject ()
{
    this.ID = '';
    this.MessageType = '';
    this.Subject = '';
    this.Content = '';
    this.Selected = false;
    this.DateTime = new Date ();
    this.Read = false;
    this.Deleted = false;
    this.HasContentBeenLoaded = false;
    this.ChangedSinceLastRedraw = true;
    this.MessagesTableRow = null;
    this.MatchesFilter = function (Filter){
        if (AreStringsBasicallyEqual (Filter,''))
            return false;
        if (AreStringsBasicallyEqual (this.MessageType,Filter) || AreStringsBasicallyEqual (this.Subject,Filter) || AreStringsBasicallyEqual (this.Content,Filter))
            return true;
        
        // allow partial matches on Subject and Content (not Type) as long as the filter is long enough
        if (Filter.length >= MinimumLengthOfPartialMatchFilter)
        {
            if (GetTokenizedVersionOf (this.Subject).indexOf (GetTokenizedVersionOf (Filter)) != -1 || GetTokenizedVersionOf (this.Content).indexOf (GetTokenizedVersionOf (Filter)) != -1)
                return true;
        }
        return false;
    };
    this.MatchesAnyOfTheseFilters = function (Filters){
        for (var c = 0; c < Filters.length; c++)
        {
            if (this.MatchesFilter (Filters [c]))
                return true;
        }
        return false;
    };
    this.MessageTypeObject = function ()
    {
        return FindObjectInArray (MessageTypesArray,'Name',this.MessageType);
    }
}

function cell (rowObject,column)
{
    if (isNaN (column))
        {
        var Table = rowObject.parent ('table');
        return ($(rowObject).children().eq(GetColumnIndex (Table,column)));
    }
    else
        return ($(rowObject).children().eq(column));
}

function setCellFontColor (rowObject,column,color)
{
    cell (rowObject,column).css ('color',color);
    cell (rowObject,column).find ('a').css ('color',color);
}

function setCellBackgroundColor (rowObject,column,color)
{
    cell (rowObject,column).css ('background',color);
    cell (rowObject,column).find ('a').css ('background',color);
}

function GetMessageObject (MessageID)
{
    return (FindObjectInArray (MessagesArray,'ID',MessageID));
}

function GetMessageObjectForThisRow (ThisRow)
{
    return (FindObjectInArray (MessagesArray,'MessagesTableRow',ThisRow));
}

function AutoRefreshPage ()
{
    if (IsPreferencesDivOpen ())
        return;
    
    location.reload ();
}

function AddLinkElement (Text,URL,Options)
{
    if (!IsDefined (Options))
        Options = {};

    var newLink = document.createElement ('a');
    with (newLink)
        {
        innerHTML = Text;
        setAttribute ('href',URL);
        if (IsDefined (Options.FontColor))
            style.color = Options.FontColor;
        if (IsDefined (Options.FontSize))
            style.fontSize = Options.FontSize;
        style.textDecoration = 'none';
    }
    return newLink;
}

function HandleMessageTypeCheckBoxClick (CheckBox)
{
    var tmpDiv = CheckBox.parentElement;

    var MessageType = FindObjectInArray (MessageTypesArray,'ShowMessagesOfThisTypeDiv',tmpDiv);

    MessageType.ShowMessagesOfThisType = CheckBox.checked;
    RedrawMyMessagesTable ();
}

function HandleMessageTypeLinkClick (Link)
{
    var FilterIndex = 0;
    switch (Link.innerHTML)
    {
        case 'All':
            FilterIndex = 0;
            CurrentMessageTypeFilter = 'All';
            LastRefreshTime = new Date ();
            for (c = 0; c < MessageTypesArray.length; c ++)
                MessageTypesArray [c].ShowMessagesOfThisType = true;
            break;
        case 'Deleted':
            CurrentMessageTypeFilter = 'Deleted';
            FilterIndex = -1;
            break;
        default:
            var MessageType = FindObjectInArray (MessageTypesArray,'Name',Link.innerHTML);
            if (MessageType)
                {
                MessageType.ShowMessagesOfThisType = true;
                CurrentMessageTypeFilter = MessageType.Name;
                FilterIndex = MessageType.Index;
            }
            else
                CurrentMessageTypeFilter = 'All';
    }
    var JaphetsFilterLink = document.getElementById ('filter' + FilterIndex);
    JaphetsFilterLink.click ();
}

function UpdateMessageTypesDiv ()
{
    function AddMessageTypeDiv (MessageType,Text,Color)
    {
        var newDiv = document.createElement ('div');
        newDiv.style.paddingLeft = '2px';
        newDiv.style.paddingRight = '2px';
        newDiv.style.display = 'inline-block';
        
        if (MessageType)
            {
            MessageType.ShowMessagesOfThisTypeDiv = newDiv;
            Text = MessageType.Name;
            Color = GetPreferenceValue ('Color coding.Message types.Message type colors.' + MessageType.Name,MessageType.DefaultColor);
            switch (MessageType.Name)
            {
                case 'Market':
                case 'Vehicle':
                    var tmpCB = document.createElement ('input');
                    with (tmpCB)
                    {
                        type = 'checkbox';
                        style.verticalAlign = 'text-bottom';
                        style.marginBottom = 0;
                        checked = MessageType.ShowMessagesOfThisType;
                        onclick = function () {HandleMessageTypeCheckBoxClick (this); return true;};
                        style.marginLeft = 0;
                    }
                    newDiv.appendChild (tmpCB);
                    break;
            }
        }

        if (Text == CurrentMessageTypeFilter)
            {
            newDiv.style.backgroundColor = Color;
            newDiv.style.border = 'thin solid ' + Color;
            newDiv.style.borderBottom = 'medium solid ' + Color;
        }
        else
        {
            if (Color)
                newDiv.style.borderBottom = 'medium solid ' + Color;
        }
            
        var newLink = AddLinkElement (Text,'',{FontColor: GetPreferenceValue ('Table style.Colors.Standard Text','black')});
        newDiv.appendChild (newLink);
        newLink.onclick = function () {HandleMessageTypeLinkClick (this); return false;};
        MessageTypesDiv.appendChild (newDiv);
        return newDiv;
    }
    
    MessageTypesDiv = document.getElementById ('MessageTypesDiv');
    if (MessageTypesDiv)
        MessageTypesDiv.parentElement.removeChild (MessageTypesDiv);

    MessageTypesDiv = document.createElement ('div');
    with (MessageTypesDiv)
    {
        id = 'MessageTypesDiv';
        style.width = '650px';
        style.border = 'thin solid black';
        style.backgroundColor = GetPreferenceValue ('Table style.Colors.Background',style.backgroundColor);
        style.Color = GetPreferenceValue ('Table style.Colors.Standard Text','black');
        style.fontSize = '12px';
        style.paddingBottom = '2px';
        style.marginTop = '3px';
        style.marginBottom = '3px';
    }

    AddMessageTypeDiv (null,'All','White');

    for (cMessageType = 0; cMessageType < MessageTypesArray.length; cMessageType ++)
    {
        var MessageType = MessageTypesArray [cMessageType];
        
        var newDiv = AddMessageTypeDiv (MessageType);
        newDiv.style.marginLeft = '7px';
    }

    newDiv = AddMessageTypeDiv (null,'Deleted','LightGray');
    newDiv.style.marginLeft = '7px';

    ScriptControlPanel.appendChild (MessageTypesDiv);
}

function HandlePageSelectorDivClick (Link)
{
    var PageNumberToLoad = 0;

    switch (Link.innerHTML)
    {
        case 'Previous':
            if (PageNumberAtPageLoad > 1)
                PageNumberToLoad = PageNumberAtPageLoad - 1;
            break;
        case 'Next':
            PageNumberToLoad = CurrentMessagesPageNumber + 1;
            break;
        default:
            PageNumberToLoad = parseInt (Link.innerHTML);
    }
    if (PageNumberToLoad == 0)
        return false;
    
    UpdateAMPDiv ('report',null,'Loading page ' + PageNumberToLoad + ' ..'); setTimeout (function (){RefreshMessages (PageNumberToLoad);},100);
}

function UpdatePageSelectorsDiv ()
{
    function AddPageSelectorDiv (Text)
    {
        var newLink = AddLinkElement (Text,'',{FontColor: GetPreferenceValue ('Table style.Colors.Standard Text','black')});
        newLink.onclick = function () {HandlePageSelectorDivClick (this); return false;};
        PageSelectorDiv.appendChild (newLink);
        return newLink;
    }
    
    PageSelectorDiv = document.getElementById ('PageSelectorDiv');
    if (PageSelectorDiv)
        PageSelectorDiv.parentElement.removeChild (PageSelectorDiv);

    PageSelectorDiv = document.createElement ('div');
    PageSelectorDiv.id = 'PageSelectorDiv';
    PageSelectorDiv.style.Color = GetPreferenceValue ('Table style.Colors.Standard Text','black');
    PageSelectorDiv.style.fontSize = '13px';
    PageSelectorDiv.style.marginTop = '5px';
    PageSelectorDiv.style.marginBottom = '5px';

    var PageToStartAt = 1;
    var HalfMaxPages = Math.floor (MaxPagesToShowInPageSelectorDiv / 2);
    if (CurrentMessagesPageNumber > HalfMaxPages)
        PageToStartAt = CurrentMessagesPageNumber - (HalfMaxPages);

    AddPageSelectorDiv ('Previous');

    for (cPage = PageToStartAt; cPage < PageToStartAt + MaxPagesToShowInPageSelectorDiv; cPage ++)
        {
        var tmpLink = AddPageSelectorDiv (cPage);
        tmpLink.style.marginLeft = '4px';
        tmpLink.style.paddingLeft = '2px';
        tmpLink.style.paddingRight = '2px';
        if (cPage >= PageNumberAtPageLoad && cPage <= CurrentMessagesPageNumber)
            {
            tmpLink.style.backgroundColor = 'white';
            tmpLink.style.border = 'thin solid black';
        }
    }
    
    var tmpLink = AddPageSelectorDiv ('Next');
    tmpLink.style.marginLeft = '4px';
    
    document.getElementById ('content').appendChild (PageSelectorDiv);
}

function UpdateAMPDiv (ThisAMPMode,Message,ThisStatusStr)
{
    AMPMode = ThisAMPMode;
    AMPStatusStr = GetOptionalValue (ThisStatusStr,'');
    AMPMessage = GetOptionalValue (Message,null);
    AMPMessagesToProcess = [];

    DoWeWantToShowStatusDiv = false;
    DoWeWantToShowNowDiv = false;
    DoWeWantToShowFutureDiv = false;
    DoWeWantToShowDeleteSelectedDiv = false;
    DoWeWantToShowMarkSelectedAsReadDiv = false;
    DoWeWantToShowViewMessageDiv = false;

    if (IsAMPEnabled)
        AMPTitleDiv.style.backgroundColor = '#E0FAD9';
    else
        AMPTitleDiv.style.backgroundColor = '#FFBBBB';
    
    if (Message)
    {
        AMPMessageSubjectDiv.style.display = 'inline-block';
        AMPMessageSubjectDiv.style.backgroundColor = GetPreferenceValue ('Color coding.Message types.Message type colors.' + Message.MessageTypeObject ().Name,Message.MessageTypeObject ().DefaultColor);
        AMPMessageSubjectTextNode.nodeValue = Message.Subject;
        
        var SimilarMessagesArray = FindObjectsInArray (MessagesArray,'Subject',Message.Subject);
        SimilarMessagesArray = FindObjectsInArray (SimilarMessagesArray,'Deleted',false);

        switch (GetTokenizedVersionOf (AMPMode,true))
        {
            case 'viewmessage':
                DoWeWantToShowViewMessageDiv = true;
                DoWeWantToShowStatusDiv = true;
                AMPStatusTextNode.nodeValue = AMPStatusStr;
                DoWeWantToShowNowDiv = true;
                AMPPerformNowLink.innerHTML = 'View in new tab';
                break;
            case 'selected':
                if (IsAMPEnabled)
                {
                    AMPMessagesToProcess = FindObjectsInArray (SimilarMessagesArray,'Selected',false);
                    if (AMPMessagesToProcess.length)
                    {
                        DoWeWantToShowNowDiv = true;
                        AMPPerformNowLink.innerHTML = 'Select ' + AMPMessagesToProcess.length + ' similar';
                    }
                }
                break;
            case 'deletesimilar':
                if (IsAMPEnabled)
                {
                    AMPMessagesToProcess = FindObjectsInArray (SimilarMessagesArray,'Deleted',false);
                    if (AMPMessagesToProcess.length)
                    {
                        DoWeWantToShowNowDiv = true;
                        AMPPerformNowLink.innerHTML = 'Delete ' + AMPMessagesToProcess.length + ' similar';
                    }
                    if (IsPreferenceEnabled ('Automated message processing.Automatically delete these messages'))
                        {
                        if (Message.MessageType == 'Market' || Message.MessageType == 'Vehicle')
                            {
                            DoWeWantToShowFutureDiv = true;
                            AMPPerformInFutureLink.innerHTML = 'Delete from now on';
                        }
                    }
                }
                break;
            case 'marksimilarasread':
                if (IsAMPEnabled)
                {
                    AMPMessagesToProcess = FindObjectsInArray (SimilarMessagesArray,'Read',false);
                    if (AMPMessagesToProcess.length)
                    {
                        DoWeWantToShowNowDiv = true;
                        AMPPerformNowLink.innerHTML = 'Mark ' + AMPMessagesToProcess.length + ' similar as read';
                    }
                    if (IsPreferenceEnabled ('Automated message processing.Automatically mark these messages as read'))
                        {
                        DoWeWantToShowFutureDiv = true;
                        AMPPerformInFutureLink.innerHTML = 'Mark as read from now on';
                    }
                }
                break;
        }
    }
    else
        AMPMessageSubjectDiv.style.display = 'none';
    
    switch (GetTokenizedVersionOf (AMPMode,true))
    {
        case 'report':
        case 'status':
            DoWeWantToShowStatusDiv = true;
            AMPStatusTextNode.nodeValue = AMPStatusStr;
            break;
        case 'selected':
            DoWeWantToShowDeleteSelectedDiv = true;
            DoWeWantToShowMarkSelectedAsReadDiv = true;
            break;
    }

    if (DoWeWantToShowStatusDiv)
        AMPStatusDiv.style.display = 'inline-block';
    else
        AMPStatusDiv.style.display = 'none';

    if (DoWeWantToShowDeleteSelectedDiv)
        AMPDeleteSelectedDiv.style.display = 'inline-block';
    else
        AMPDeleteSelectedDiv.style.display = 'none';

    if (DoWeWantToShowMarkSelectedAsReadDiv)
        AMPMarkSelectedAsReadDiv.style.display = 'inline-block';
    else
        AMPMarkSelectedAsReadDiv.style.display = 'none';

    if (DoWeWantToShowNowDiv)
        AMPPerformNowDiv.style.display = 'inline-block';
    else
        AMPPerformNowDiv.style.display = 'none';
    
    if (DoWeWantToShowFutureDiv)
        AMPPerformInFutureDiv.style.display = 'inline-block';
    else
        AMPPerformInFutureDiv.style.display = 'none';
        
    if (DoWeWantToShowViewMessageDiv)
    {
        ViewMessageDiv.style.border = 'thin solid black';
    }
    else
    {
        if (GetPreferenceValue ('Message view.View messages') == 'Above messages table')
            ViewMessageDiv.style.backgroundColor = 'transparent';
        else
            ViewMessageDiv.style.display = 'none';
    }
}

function HandleAMPLinkClick (LinkStr)
{
    switch (GetTokenizedVersionOf (LinkStr))
    {
        case 'enableamp':
            IsAMPEnabled = !IsAMPEnabled;
            var tmpSection = GetPreferencesSection ('Automated message processing');
            tmpSection.OverrideEnabled = IsAMPEnabled;
            SavePreferences (tmpSection);
            if (IsAMPEnabled)
                {
                UpdateAMPDiv ('report',null,'AMP enabled');
                setTimeout (function () {PerformAutomatedMessageProcessing ();},1000);
            }
            else
                UpdateAMPDiv ('report',null,'AMP disabled');
           break;
        case 'deleteselected':
            AMPMessagesToProcess = FindObjectsInArray (MessagesArray,'Selected',true);
            DeleteTheseMessages (AMPMessagesToProcess);
            UpdateAMPDiv ('report',null,AMPMessagesToProcess.length + ' ' + ConvertStringToSingularIfNecessary ('selected messages',AMPMessagesToProcess.length) + ' deleted');
            break;
        case 'markselectedasread':
            AMPMessagesToProcess = FindObjectsInArray (MessagesArray,'Selected',true);
            MarkTheseMessagesAsRead (AMPMessagesToProcess);
            UpdateAMPDiv ('report',null,AMPMessagesToProcess.length + ' ' + ConvertStringToSingularIfNecessary ('selected messages',AMPMessagesToProcess.length) + ' marked as read');
            break;
        case 'now':
            var ReportStr = AMPMessagesToProcess.length + ' ' + ConvertStringToSingularIfNecessary ('similar messages',AMPMessagesToProcess.length);

            switch (GetTokenizedVersionOf (AMPMode,true))
            {
                case 'viewmessage':
                    ViewMessage (AMPMessage,'innewtab');
                    break;
                case 'selected':
                    SelectTheseMessages (AMPMessagesToProcess);
                    break;
                case 'deletesimilar':
                    DeleteTheseMessages (AMPMessagesToProcess);
                    ReportStr += ' deleted';
                    UpdateAMPDiv ('report',AMPMessage,ReportStr);
                    break;
                case 'marksimilarasread':
                    MarkTheseMessagesAsRead (AMPMessagesToProcess);
                    ReportStr += ' marked as read';
                    UpdateAMPDiv ('report',AMPMessage,ReportStr);
                    break;
            }
            break;
        case 'future':
            var ReportStr = '';
            var SubjectsToProcessPreference = null;
            switch (GetTokenizedVersionOf (AMPMode,true))
            {
                case 'deletesimilar':
                    ReportStr = 'Will be automatically deleted from now on';
                    SubjectsToProcessPreference = GetPreference ('Automated message processing.Automatically delete these messages');
                    break;
                case 'marksimilarasread':
                    ReportStr = 'Will be automatically marked as read from now on';
                    SubjectsToProcessPreference = GetPreference ('Automated message processing.Automatically mark these messages as read');
                    break;
            }
            if (SubjectsToProcessPreference && SubjectsToProcessPreference.Enabled ())
                {
                var SubjectsToProcess = SubjectsToProcessPreference.Value.split ('|n');
                if (SubjectsToProcess.indexOf (AMPMessage.Subject) == -1)
                    {
                    SubjectsToProcess.push (AMPMessage.Subject);
                    SubjectsToProcessPreference.Value = SubjectsToProcess.join ('|n');
                    SavePreferences (SubjectsToProcessPreference.ParentSection);
                }
            }
            HandleAMPLinkClick ('now');
            UpdateAMPDiv ('report',AMPMessage,ReportStr);
            break;
    }
}

function CreateAMPDiv ()
{
console.log ('create AMP');
    AMPDiv = document.createElement ('div');
    with (AMPDiv)
    {
        style.width = '650px';
        style.border = 'thin solid black';
        style.backgroundColor = GetPreferenceValue ('Table style.Colors.Background',style.backgroundColor);
        style.marginTop = '3px';
        style.marginBottom = '3px';
        style.verticalAlign = 'middle';

        appendChild (AMPTitleDiv = document.createElement ('div'));
        with (AMPTitleDiv)
        {
            style.display = 'inline-block';
            style.paddingLeft = '5px';
            style.paddingRight = '5px';
            appendChild (AMPTitleLink = AddLinkElement ('AMP',''));
            AMPTitleLink.onclick = function () {HandleAMPLinkClick ('enableAMP'); return false;};
        }
       
        appendChild (AMPMessageSubjectDiv = document.createElement ('div'));
        with (AMPMessageSubjectDiv)
        {
            style.display = 'inline-block';
            style.paddingLeft = '5px';
            style.paddingRight = '5px';
            style.marginLeft = '5px';
            appendChild (AMPMessageSubjectTextNode = document.createTextNode ('subject'));
        }

        appendChild (AMPStatusDiv = document.createElement ('div'));
        with (AMPStatusDiv)
        {
            style.display = 'inline-block';
            style.paddingLeft = '5px';
            style.paddingRight = '5px';
            style.marginLeft = '5px';
            appendChild (AMPStatusTextNode = document.createTextNode ('status'));
        }

        appendChild (AMPPerformNowDiv = document.createElement ('div'));
        with (AMPPerformNowDiv)
        {
            style.display = 'inline-block';
            style.paddingLeft = '5px';
            style.paddingRight = '5px';
            style.marginLeft = '10px';
            appendChild (AMPPerformNowLink = AddLinkElement ('do something now',''));
            AMPPerformNowLink.onclick = function () {HandleAMPLinkClick ('now'); return false;};
        }

        appendChild (AMPPerformInFutureDiv = document.createElement ('div'));
        with (AMPPerformInFutureDiv)
        {
            style.display = 'inline-block';
            style.paddingLeft = '5px';
            style.paddingRight = '5px';
            style.marginLeft = '10px';
            appendChild (AMPPerformInFutureLink = AddLinkElement ('do something from now on',''));
            AMPPerformInFutureLink.style.color = 'maroon';
            AMPPerformInFutureLink.onclick = function () {HandleAMPLinkClick ('future'); return false;};
        }

        appendChild (AMPMarkSelectedAsReadDiv = document.createElement ('div'));
        with (AMPMarkSelectedAsReadDiv)
        {
            style.display = 'inline-block';
            style.paddingLeft = '5px';
            style.paddingRight = '5px';
            style.marginLeft = '10px';
            appendChild (AMPMarkSelectedAsReadLink = AddLinkElement ('Mark selected as read'));
            AMPMarkSelectedAsReadLink.onclick = function () {HandleAMPLinkClick ('markselectedasread'); return false;};
        }
        
        appendChild (AMPDeleteSelectedDiv = document.createElement ('div'));
        with (AMPDeleteSelectedDiv)
        {
            style.display = 'inline-block';
            style.paddingLeft = '5px';
            style.paddingRight = '5px';
            style.marginLeft = '10px';
            appendChild (AMPDeleteSelectedLink = AddLinkElement ('Delete selected'));
            AMPDeleteSelectedLink.style.color = 'maroon';
            AMPDeleteSelectedLink.onclick = function () {HandleAMPLinkClick ('deleteselected'); return false;};
        }
    }
    ScriptControlPanel.appendChild (AMPDiv);
}

function CreateControlPanel1 ()
{
    ControlPanel1 = document.createElement ('div');
    with (ControlPanel1)
    {
        style.width = '650px';
        style.border = 'thin solid black';
        style.backgroundColor = GetPreferenceValue ('Table style.Colors.Background',style.backgroundColor);
        style.marginTop = '3px';
        style.marginBottom = '3px';
    }

    RefreshMessagesLink = AddLinkElement ('Refresh','');
    with (RefreshMessagesLink)
    {
        style.marginLeft = '5px';
        onclick = function () {console.log ('Refreshing messages'); UpdateAMPDiv ('report',null,'Refreshing messages ..'); setTimeout (function (){RefreshMessages ();},100); return false;};
    }
    ControlPanel1.appendChild (RefreshMessagesLink);

    AddNextPageLink = AddLinkElement ('Fetch more messages','');
    with (AddNextPageLink)
    {
        style.marginLeft = '15px';
        onclick = function () {
            console.log ('Adding next page of messages'); UpdateAMPDiv ('report',null,'Fetching next page of messages ..'); setTimeout (function (){var OldScrollHeight = MyMessagesTableDiv.scrollHeight; LoadAndProcessNextMessagesPage ({AddToMessagesTable: MyMessagesTable}); UpdatePageSelectorsDiv (); MyMessagesTableDiv.scrollTop = OldScrollHeight;},100);
        return false;};
    }
    ControlPanel1.appendChild (AddNextPageLink);

    SendPMLink = AddLinkElement ('Send PM','');
    with (SendPMLink)
    {
        style.marginLeft = '15px';
        onclick = function () {
            var IDToSendTo = prompt ('Send PM to','');
            if (IDToSendTo != null)
                {
                window.open ('/messages/chat/' + IDToSendTo,'_blank');
                window.focus ();
            }
            return false;
        };
    }
    ControlPanel1.appendChild (SendPMLink);

    NoteToSelfLink = AddLinkElement ('Note to self','');
    with (NoteToSelfLink)
    {
        style.marginLeft = '15px';
        onclick = function () {
            window.open ('/messages/chat/' + MyUserID,'_blank');
            window.focus ();
            return false;
        };
    }
    ControlPanel1.appendChild (NoteToSelfLink);

    ShowPreferencesLink = AddLinkElement ('Preferences','');
    with (ShowPreferencesLink)
    {
        style.marginLeft = '15px';
        onclick = function () {
            var tmpDiv = document.getElementById ('PreferencesDivPlaceHolder');
            if (!tmpDiv)
                {
                tmpDiv = document.createElement ('div');
                tmpDiv.id = 'PreferencesDivPlaceHolder';
                document.getElementById ('content').insertBefore (tmpDiv,document.getElementById ('content').firstChild);
            }
            OpenPreferencesDiv (tmpDiv);
            return false;
        };
    }
    ControlPanel1.appendChild (ShowPreferencesLink);

    ScriptControlPanel.appendChild (ControlPanel1);
}

function CreateViewMessageDiv ()
{
    ViewMessageDiv = document.createElement ('div');
    with (ViewMessageDiv)
    {
        style.marginTop = '3px';
        style.marginBottom = '3px';
        style.height = '60px';
        style.width = '500px';
    }
    ScriptControlPanel.appendChild (ViewMessageDiv);
}

function CreateMyMessagesTableDiv ()
{
    MyMessagesTableDiv = document.createElement ('div');
    with (MyMessagesTableDiv)
    {
        style.marginTop = '8px';
        style.marginBottom = '5px';
    }

    MyMessagesTableDiv.appendChild (MyMessagesTable.get(0));

    document.getElementById ('content').appendChild (MyMessagesTableDiv);
}

function CreateControlPanel ()
{
    ScriptControlPanel = document.createElement ('div');
    with (ScriptControlPanel)
    {
        display = 'none';
        style.fontWeight = 'bold';
    }
    
    CreateControlPanel1 ();
    CreateAMPDiv ();
    CreateViewMessageDiv ();
    UpdateMessageTypesDiv ();
    
    document.getElementById ('content').appendChild (ScriptControlPanel);
}

function CreatePageDivs ()
{
    with (document.getElementById ('content'))
    {
        style.paddingLeft = '10px';
    }
    CreateControlPanel ();
    CreateMyMessagesTableDiv ();
    UpdatePageSelectorsDiv ();
    UpdateAMPDiv ('empty');
}

function UpdatePageDivs ()
{
    UpdateMessageTypesDiv ();
    UpdatePageSelectorsDiv ();
}

function ResizePageDivs ()
{
    with (MyMessagesTableDiv)
    {
        if (IsPreferenceEnabled ('Table layout.Show this many rows at once'))
            var tmpRowsToShow = 1 + Math.max (5,parseInt (GetPreferenceValue ('Table layout.Show this many rows at once')));
        else
            var tmpRowsToShow = MyMessagesTable.find('tr').length;

        style.height = Math.floor ((10 + tmpRowsToShow * (4 + MyMessagesTable.find('tr').eq(0).height ()))) + 'px';
        style.width = (parseInt (MyMessagesTable.get(0).offsetWidth) + 20) + 'px';
        style.overflowX = 'visible';
        style.overflowY = 'auto';
    }
}

function JaphetsUnreadMessagesTotal ()
{
    var JUMElement = document.getElementById ('MessagesDiv');
    var tmpstr = $(JUMElement).find ('a').text ();
    var tmpParsedArray = tmpstr.match ('Messages \\((.*?)\\)');
    if (tmpParsedArray != null)
        return parseInt (tmpParsedArray [1]);
    else
        return 0;
}

function UpdateMessagesPageTitle ()
{
    var ExistingTitle = document.title;
    var NewTitle = 'Messages';
    var StatsStr = '';

    var TotalUnreadPMs = 3;
    var tmpMessages = FindObjectsInArray (MessagesArray,'MessageType','PM');
    tmpMessages = FindObjectsInArray (tmpMessages,'Read',false);
    TotalUnreadPMs = tmpMessages.length;
    if (TotalUnreadPMs > 0)
        StatsStr = StringAPlusStringB (StatsStr,'pm:' + TotalUnreadPMs,' ');

    if (StatsStr != '')
        NewTitle = StringAPlusStringB (NewTitle,'[' + StatsStr + ']',' ');

    if (NewTitle != ExistingTitle)
        document.title = NewTitle;
}

function AlterMessagesTableStructure (MessagesTable)
{
    if (!MessagesTable.find('tr').length)
        return;
        
    MessagesTable.find ('tr:eq(0)').children().eq(GetColumnIndex(MessagesTable,'From')).html('Type');
    MessagesTable.find ('tr:eq(0)').children().eq(GetColumnIndex(MessagesTable,'Sent')).html('Time');
    MessagesTable.find ('tr:eq(0)').children().eq(GetColumnIndex(MessagesTable,'Mark')).html('Status');
    MessageSelectedCol = 0;
    MessageTypeCol = GetColumnIndex (MessagesTable,'Type');
    MessageSubjectCol = GetColumnIndex (MessagesTable,'Subject');
    MessageDateTimeCol = GetColumnIndex (MessagesTable,'Time');
    DeleteMessageCol = GetColumnIndex (MessagesTable,'Delete');
    MessageStatusCol = GetColumnIndex (MessagesTable,'Status');
}

function AlterMessagesTableLayout (MessagesTable)
{
    if (!MessagesTable.find('tr').length)
        return;

    ApplyPreferencesToTableFormatting (MessagesTable);

    MessagesTable.find ('td,th').each (function(){
        switch ($(this) [0].cellIndex)
        {
            case MessageTypeCol:
                $(this).css ('width',50);
                break;
            case MessageSubjectCol:
                if (IsPreferenceEnabled ('Table style','Remove underlines from links'))
                    $(this).find('a').css ('text-decoration','none');
                if (IsPreferenceEnabled ('Table layout','Subject column width'))
                {
                    $(this).css ('min-width',parseInt (GetPreferenceValue ('Table layout','Subject column width'))+'px');
                    $(this).css ('overflow','hidden');
                }
                break;
            case DeleteMessageCol:
            case MessageStatusCol:
                if (IsPreferenceEnabled ('Table style','Remove underlines from links'))
                    $(this).find('a').css ('text-decoration','none');
                break;
        }
    });
}

function RedrawMessageInMessagesTable (Message,ForceRedraw)
{
    if (Message.MessagesTableRow == null)
        return;
    if (Message.Deleted || !Message.MessageTypeObject ().ShowMessagesOfThisType)
        Message.MessagesTableRow.hide ();
    else
        Message.MessagesTableRow.show ();

    if (! (ForceRedraw || Message.ChangedSinceLastRedraw))
        return;

    Message.ChangedSinceLastRedraw = false;

//    console.log ('redrawing row for message ' + Message.ID + ': ' + Message.Subject);

    var ColumnBackgroundColorsArray = [];
    var ColumnFontColorsArray = [];
    for (var cCol = 0; cCol <= MessageStatusCol; cCol ++)
        {
        ColumnBackgroundColorsArray.push (GetPreferenceValue ('Table style.Colors.Background',''));
        ColumnFontColorsArray.push (GetPreferenceValue ('Table style.Colors.Standard text',''));
    }

    cell (Message.MessagesTableRow,MessageSelectedCol).find ('input').get(0).checked = Message.Selected;
    cell (Message.MessagesTableRow,MessageTypeCol).text (Message.MessageType);
    if (Message.HasContentBeenLoaded)
        cell (Message.MessagesTableRow,MessageSubjectCol).find ('a').text (Message.Content);
    else
        cell (Message.MessagesTableRow,MessageSubjectCol).find ('a').text (Message.Subject);
    cell (Message.MessagesTableRow,MessageDateTimeCol).text (Message.DateTime);
    
    if (!Message.Read)
    {
        cell (Message.MessagesTableRow,MessageStatusCol).find ('a').text ('Unread');
        ColumnBackgroundColorsArray [MessageStatusCol] = GetPreferenceValue ('Color coding.Unread messages.Status Column',ColumnBackgroundColorsArray [MessageStatusCol]);
        ColumnFontColorsArray [MessageStatusCol] = GetPreferenceValue ('Table style.Colors.Important text',ColumnFontColorsArray [MessageStatusCol]);

        ColumnBackgroundColorsArray [MessageSubjectCol] = GetPreferenceValue ('Color coding.Unread messages.Subject Column',ColumnBackgroundColorsArray [MessageSubjectCol]);
        ColumnFontColorsArray [MessageSubjectCol] = GetPreferenceValue ('Table style.Colors.Important text',ColumnFontColorsArray [MessageStatusCol]);
    }
    else
        cell (Message.MessagesTableRow,MessageStatusCol).find ('a').text ('read');
 
    if (Message.Selected)
    {
        ColumnBackgroundColorsArray [MessageSelectedCol] = GetPreferenceValue ('Color coding.Selected messages.Selected column',ColumnBackgroundColorsArray [MessageSelectedCol]);

        ColumnBackgroundColorsArray [MessageSubjectCol] = GetPreferenceValue ('Color coding.Selected messages.Subject column',ColumnBackgroundColorsArray [MessageSubjectCol]);
    }
    
    if (IsPreferenceEnabled ('Color coding.Message types.Message type colors' + Message.MessageType))
    {
        var tmpColor = GetPreferenceValue ('Color coding.Message types.Message type colors' + Message.MessageType,'none');
        if (tmpColor != 'none')
        {
            ColumnBackgroundColorsArray [MessageTypeCol] = tmpColor;
            if (IsPreferenceEnabled ('Color coding.Message types.Also apply to subject column'))
                ColumnBackgroundColorsArray [MessageSubjectCol] = tmpColor;
        }
    }

    for (var cCol = 0; cCol <= MessageStatusCol; cCol ++)
    {
        cell (Message.MessagesTableRow,cCol).css ('background-color',ColumnBackgroundColorsArray [cCol]);
        if (ColumnFontColorsArray [cCol] != '')
            {
            cell (Message.MessagesTableRow,cCol).css ('color',ColumnFontColorsArray [cCol]);
            cell (Message.MessagesTableRow,cCol).find ('a').css ('color',ColumnFontColorsArray [cCol]);
        }
    }

    if (IsPreferenceEnabled ('Table style','Remove underlines from links'))
        cell (Message.MessagesTableRow,MessageSubjectCol).find('a').css ('text-decoration','none');
}

function RedrawMyMessagesTable (OnlyRedrawMessagesThatHaveChangedSinceLastRedraw)
{
    MyMessagesTable.find ('tr:gt(0)').each (function(){
        var Message = GetMessageObjectForThisRow ($(this).get(0));
        if (!Message)
            return true;
        if (OnlyRedrawMessagesThatHaveChangedSinceLastRedraw == true && Message.ChangedSinceLastRedraw == false)
            return true;
        RedrawMessageInMessagesTable (Message,!OnlyRedrawMessagesThatHaveChangedSinceLastRedraw);
    });
    ResizePageDivs ();
}

function MarkMessageAsRead (Message,NewReadStatus)
{
    if (!Message)
        return false;
    if (Message.Deleted)
        return false;
    if (Message.Read == NewReadStatus)
        return false;

    if (Message.MessagesTableRow != null)
    {
        var URLStr = '/messages/js_mark_read/' + Message.ID + '/';
        if (NewReadStatus)
            URLStr += '1';
        else
            URLStr += '0';
        
        if (CurrentMinerID != '')
            {
            new Ajax.Request(URLStr, {asynchronous:true, evalScripts:true, onComplete:function(request, json) {new Ajax.Updater(document.createElement('div'),'/php/updateUI.php?minerId=' + CurrentMinerID, {asynchronous:true, evalScripts:true, requestHeaders:['X-Update', 'FindingsDiv MessagesDiv']})}});
        }
        else
            LoadURLIntoString (URLStr,true);
    }

    Message.Read = NewReadStatus;
    Message.ChangedSinceLastRedraw = true;
    RedrawMessageInMessagesTable (Message,true);
    return true;
}

function DeleteMessage (Message)
{
    if (!Message)
        return false;
    if (Message.Deleted)
        return false;

    if (Message.MessageType != 'Market' && Message.MessageType != 'Vehicle')
    {
        if (confirm ('Delete ' + Message.MessageType + ': ' + Message.Subject + '?') != true)
            return false;
    }
    
    Message.Deleted = true;
    if (Message.MessagesTableRow)
    {
        Message.MessagesTableRow.hide ();
    }

    MessagesArray.splice (MessagesArray.indexOf (Message),1);
    
    if (CurrentMinerID != '')
        {
        new Ajax.Request('/messages/js_del/' + Message.ID, {asynchronous:true, evalScripts:true, onComplete:function(request, json) {new Ajax.Updater(document.createElement('div'),'/php/updateUI.php?minerId=' + CurrentMinerID, {asynchronous:true, evalScripts:true, requestHeaders:['X-Update', 'FindingsDiv MessagesDiv']})}});
    }
    
    RedrawMyMessagesTable ();
    return true;
}

function SelectTheseMessages (TheseMessages)
{
    for (var cMessage = 0; cMessage < TheseMessages.length; cMessage ++)
    {
        var tmpMessage = TheseMessages [cMessage];
        
        tmpMessage.Selected = true;
        tmpMessage.ChangedSinceLastRedraw = true;
    }
    RedrawMyMessagesTable ();
}

function DeleteTheseMessages (TheseMessages)
{
    for (var cMessage = 0; cMessage < TheseMessages.length; cMessage ++)
    {
        var tmpMessage = TheseMessages [cMessage];
        
        DeleteMessage (tmpMessage);
    }
    RedrawMyMessagesTable ();
}

function MarkTheseMessagesAsRead (TheseMessages)
{
    for (var cMessage = 0; cMessage < TheseMessages.length; cMessage ++)
    {
        var tmpMessage = TheseMessages [cMessage];
        
        MarkMessageAsRead (tmpMessage,true);
    }
    RedrawMyMessagesTable ();
}

function MarkMessagesAsReadWhereApplicable (SubjectsToProcessStr)
{
    var MessagesMarkedAsRead = 0;
    var SubjectsToProcess = SubjectsToProcessStr.splitAndTokenize ('|n');
    
    for (cMessage = 0; cMessage < MessagesArray.length; cMessage ++)
    {
        var Message = MessagesArray [cMessage];
        if (Message.Read || Message.Deleted)
            continue;

        var TokenizedMessageSubject = GetTokenizedVersionOf (Message.Subject);
        
        if (SubjectsToProcess.indexOf (TokenizedMessageSubject) == -1)
            continue;
            
        console.log ('Marking message ' + Message.ID + ': ' + Message.Subject + ' as read');
        if (MarkMessageAsRead (Message,true))
            MessagesMarkedAsRead ++;
    }
    return MessagesMarkedAsRead;
}

function DeleteMessagesWhereApplicable (SubjectsToProcessStr)
{
    var MessagesDeleted = 0;
    
    if (CurrentMessageTypeFilter == 'Deleted')
        return 0;

    var SubjectsToProcess = SubjectsToProcessStr.splitAndTokenize ('|n');
    
    for (cMessage = 0; cMessage < MessagesArray.length; cMessage ++)
    {
        var Message = MessagesArray [cMessage];
        if (Message.Deleted)
            continue;

        var TokenizedMessageSubject = GetTokenizedVersionOf (Message.Subject);
        
        if (SubjectsToProcess.indexOf (TokenizedMessageSubject) == -1)
            continue;
            
        console.log ('Deleting message ' + Message.ID + ': ' + Message.Subject);
        if (DeleteMessage (Message))
            MessagesDeleted ++;
    }
    return MessagesDeleted;
}

function PerformAutomatedMessageProcessing ()
{
    console.log ('Performing automated message processing');
    UpdateAMPDiv ('empty');

    var ReportStr = '';
    
    if (CurrentMessageTypeFilter != 'Deleted')
    {
        var DeleteMessagesPreference = GetPreference ('Automated message processing.Automatically delete these messages');
        if (DeleteMessagesPreference.Enabled ())
            {
            var MessagesDeleted = DeleteMessagesWhereApplicable (DeleteMessagesPreference.Value);
            if (MessagesDeleted > 0)
                ReportStr += MessagesDeleted + ' ' + ConvertStringToSingularIfNecessary ('messages',MessagesDeleted) + ' automatically deleted';
        }
    }

    var MarkMessagesAsReadPreference = GetPreference ('Automated message processing.Automatically mark these messages as read');
    if (MarkMessagesAsReadPreference.Enabled ())
        {
        var MessagesMarkedAsRead = MarkMessagesAsReadWhereApplicable (MarkMessagesAsReadPreference.Value);
        if (MessagesMarkedAsRead > 0)
            {
            if (ReportStr != '')
                ReportStr += ', ';
            ReportStr += MessagesMarkedAsRead + ' ' + ConvertStringToSingularIfNecessary ('messages',MessagesMarkedAsRead) + ' automatically marked as read';
        }
    }
    if (ReportStr)
        UpdateAMPDiv ('report',null,ReportStr);
}

function HandleMessagesTableClick (ClickedRowObject,ClickedColumnIndex)
{
    var Message = GetMessageObjectForThisRow (ClickedRowObject.get(0));
    
    if (Message)
        {
        switch (ClickedColumnIndex)
        {
            case MessageSelectedCol:
                Message.Selected = !Message.Selected;
                var tmpSelectedMessages = FindObjectsInArray (MessagesArray,'Selected',true);
                if (tmpSelectedMessages.length)
                    UpdateAMPDiv ('Selected',Message);
                else
                    UpdateAMPDiv ('empty');
                break;
            case MessageSubjectCol:
                UpdateAMPDiv ('Empty');
                ViewMessage (Message);
                break;
            case DeleteMessageCol:
                if (CurrentMessageTypeFilter != 'Deleted')
                    {
                    DeleteMessage (Message);
                    UpdateAMPDiv ('Delete similar',Message);
                }
                break;
            case MessageStatusCol:
                MarkMessageAsRead (Message,!Message.Read);
                if (Message.Read)
                    UpdateAMPDiv ('Mark similar as read',Message);
                else
                    UpdateAMPDiv ('Empty');
                break;
        }
        if (ClickedColumnIndex != DeleteMessageCol)
            {
            Message.ChangedSinceLastRedraw = true;
            RedrawMessageInMessagesTable (Message,true);
        }
    }
    else
    {
        switch (ClickedColumnIndex)
        {
            case MessageSelectedCol:
                var tmpSelected = cell (ClickedRowObject,MessageSelectedCol).find ('input').get(0).checked;
                for (var c = 0; c < MessagesArray.length; c ++)
                    MessagesArray [c].Selected = tmpSelected;
                RedrawMyMessagesTable ();
                if (tmpSelected)
                    UpdateAMPDiv ('selected');
                else
                    UpdateAMPDiv ('empty');
                break;
        }
    }
}

function BuildMessagesTableFromMessagesArray (MessagesTable)
{
    function SimpleMessageObject ()
    {
        this ['Selected'] = '';
        this ['Type'] = '';
        this ['Subject'] = '';
        this ['Time'] = '';
        this ['Delete'] = '';
        this ['Status'] = '';
    }

    var SimpleMessagesArray = [];
    for (var cMessage = 0; cMessage < MessagesArray.length; cMessage ++)
        SimpleMessagesArray.push (new SimpleMessageObject ());
    
    MessagesTable.html (CreateTableHTML (SimpleMessagesArray,true));
    
    $(MessagesTable).find ('tr').each (function () {
    
        if (this.rowIndex == 0)
            cell (this,MessageSelectedCol).text ('');

        var tmpCheckBox = document.createElement ('input');
        tmpCheckBox.type = 'checkbox';
        tmpCheckBox.style.alignVertical = 'bottom';
        tmpCheckBox.style.marginBottom = '1px';
        tmpCheckBox.onclick = function () {HandleMessagesTableClick ($(this).closest ('tr'), MessageSelectedCol);}
        cell (this,MessageSelectedCol).append (tmpCheckBox);

        if (this.rowIndex > 0)
            {
            var Message = MessagesArray [this.rowIndex - 1];
            Message.MessagesTableRow = $(this).get(0);
            Message.ChangedSinceLastRedraw = true;
            
            var tmpLink = AddLinkElement ('delete','');
            tmpLink.onclick = function (e) {e.preventDefault (); HandleMessagesTableClick ($(this).closest ('tr'), DeleteMessageCol);};
            cell (this,DeleteMessageCol).append (tmpLink);
            
            var tmpLink = AddLinkElement ('subject','');
            tmpLink.onclick = function (e) {e.preventDefault (); HandleMessagesTableClick ($(this).closest ('tr'), MessageSubjectCol);};
            cell (this,MessageSubjectCol).append (tmpLink);

            var tmpLink = AddLinkElement ('status','');
            tmpLink.onclick = function (e) {e.preventDefault (); HandleMessagesTableClick ($(this).closest ('tr'), MessageStatusCol);};
            cell (this,MessageStatusCol).append (tmpLink);
        }
    });

    AlterMessagesTableLayout (MessagesTable);
}

function SetMessagePropertiesFromSourceTableRow (Message,TableRow,Options)
{
    Message.MessageType = cell (TableRow,MessageTypeCol).text();
    Message.Subject = cell (TableRow,MessageSubjectCol).find ('a').text();
    Message.DateTime = cell (TableRow,MessageDateTimeCol).text();

    var tmpCheckBox = cell (TableRow,MessageSelectedCol).find ('#Message' + Message.ID + 'Deleted').get(0);
    Message.Selected = tmpCheckBox.checked;

    var tmpE = cell (TableRow,MessageStatusCol).find ('#read' + Message.ID);
    Message.Read = (tmpE.css ('display') == 'none');

    // now extract miner id from script tags
    if (CurrentMinerID == '')
        {
        var tmpE = cell (TableRow,MessageStatusCol);
        tmpE.find('script').each(function () {
            var tmpstr = $(this).text ();
            var tmpParsedArray = tmpstr.match (new RegExp ('minerId=(.*?)\'',''));
            if (tmpParsedArray != null && tmpParsedArray.length > 1)
                {
                CurrentMinerID = tmpParsedArray [1];
                return true;
            }
        });
    }
}

function BuildMessagesArrayFromMessagesTable (MessagesTable,Options)
{
    Options.ClearMessagesArrayFirst = GetOptionalValue (Options.ClearMessagesArrayFirst,false);

    if (Options.ClearMessagesArrayFirst)
        MessagesArray.length = 0;

    MessagesTable.find ('tr:gt(0)').each (function(){
        var MessageID = GetFinalPartOfURL (cell(this,MessageSubjectCol).find ('a').attr ('href'));
        var Message = GetMessageObject (MessageID);
        if (!Message)
        {
            Message = new InitialisedMessageObject ();
            MessagesArray.push (Message);
            Message.ID = MessageID;
        }
        SetMessagePropertiesFromSourceTableRow (Message,this,Options);
    });
}

function HandleJaphetsTableUpdate ()
{
    // need to respond to user clicking "page 2,page 3,vehicle,stone" etc which does not force a full page load
    
    // if japhet's script has loaded a new page of messages, the 'status' column will have reverted to 'mark'
    // or just won't be there if no messages are shown
    JaphetsMessagesTable = $('#messagelist table:eq(0)');
    if (JaphetsMessagesTable.html () == '')
        return false;
    
    // if JaphetsMessagesTable has no messages, it will only contain 1 td "You have 0 messages"
    if (JaphetsMessagesTable.find('td').length == 1)
        {
        JaphetsMessagesTable.html ('');
        console.log ('JaphetsMessagesTable is empty');
    }
    var tmpColIndex = GetColumnIndex (JaphetsMessagesTable,'Status');
    if (tmpColIndex == MessageStatusCol)
        return false;

    HandleMessagesPageReload ();
}

function HandleDynamicEvents ()
{
    if (IsScriptBusyProcessingPageLoad)
        return false;

    HandleJaphetsTableUpdate ();
    
    if (IsPreferenceEnabled ('General','Refresh messages every (this many) minutes'))
    {
        var RefreshCancelledReason = '';
        var SecondsToRefreshPageAfter = parseFloat (GetPreferenceValue ('General','Refresh messages every (this many) minutes')) * 60;
        var Now = new Date ();
        SecondsSinceLastRefresh = Math.ceil ((Now - LastRefreshTime) / 1000);
        if (SecondsSinceLastRefresh >= SecondsToRefreshPageAfter)
            {
            if (SecondsSinceLastRefresh >= 5)
                {
                if (PageNumberAtPageLoad == 1)
                {
                    if (CurrentMessagesPageNumber == 1)
                    {
                        if (FindObjectInArray (MessagesArray,'Selected',true) == null)
                        {
                            console.log ('Refreshing messages'); 
                            UpdateAMPDiv ('report',null,'Refreshing messages ..');
                            setTimeout (function (){RefreshMessages ();},100);
                        }
                        else
                            RefreshCancelledReason = 'You have messages selected';
                    }
                    else
                        RefreshCancelledReason = 'You have several pages of messages open';
                }
                else
                    RefreshCancelledReason = 'Messages are only auto-refreshed when you are viewing page 1';
            }
            else
                RefreshCancelledReason = 'There is a 5 second minimum on auto-refreshes - don\'t be greedy!';
        }
        
        if (RefreshCancelledReason != '')
            {
            if (AreStringsBasicallyEqual (AMPMode,'empty') || AreStringsBasicallyEqual (AMPMode,''))
                UpdateAMPDiv ('report',null,'Auto-refresh cancelled - ' + RefreshCancelledReason);
        }
    }
}

function SetPageStyleFromPreferences ()
{
    var fc = document.getElementById ('content');
    ApplyPreferenceSectionToElement ('Table style.Font',fc);
    fc.style.color = GetPreferenceValue ('Table style.Colors.Standard text',fc.style.color);
}

function HandleMessagesPageReload ()
{
    JaphetsMessagesTable.hide ();
    IsScriptBusyProcessingPageLoad = true;
    LastRefreshTime = new Date ();
    setTimeout (function(){
        ProcessMessagesPage ({SourceMessagesTable: JaphetsMessagesTable, AddToMessagesTable: MyMessagesTable, ClearMessagesArrayFirst: true});
        PageNumberAtPageLoad = 1;
        CurrentMessagesPageNumber = 1;
        MyMessagesTableDiv.scrollTop = 0;
        UpdateAMPDiv ('Empty');
        UpdatePageDivs ();
        IsScriptBusyProcessingPageLoad = false;
    },100);
}

function ProcessMessagesPage (Options)
{
    Options.SourceMessagesTable = GetOptionalValue (Options.SourceMessagesTable,JaphetsMessagesTable);
    Options.AddToMessagesTable = GetOptionalValue (Options.AddToMessagesTable,MyMessagesTable);
    Options.PerformAutomatedMessageProcessing = GetOptionalValue (Options.PerformAutomatedMessageProcessing,true);
    
    IsScriptBusyProcessingPageLoad = true;
    AlterMessagesTableStructure (Options.SourceMessagesTable);
    console.log ('Processing page contents');
    BuildMessagesArrayFromMessagesTable (Options.SourceMessagesTable,Options);
    BuildMessagesTableFromMessagesArray (MyMessagesTable);

    var TableToRedraw = Options.AddToMessagesTable || MyMessagesTable;
    AlterMessagesTableLayout (TableToRedraw);
    RedrawMyMessagesTable ();
    if (Options.PerformAutomatedMessageProcessing)
        PerformAutomatedMessageProcessing ();
    IsScriptBusyProcessingPageLoad = false;
}

function LoadAndProcessNextMessagesPage (Options)
{
    CurrentMessagesPageNumber = CurrentMessagesPageNumber + 1;
    LoadAndProcessMessagesPage (CurrentMessagesPageNumber,Options);
}

function LoadAndProcessMessagesPage (PageIndex,Options)
{
    IsScriptBusyProcessingPageLoad = true;

    Options.ClearMessagesArrayFirst = GetOptionalValue (Options.ClearMessagesArrayFirst,false);
    Options.PerformAutomatedMessageProcessing = GetOptionalValue (Options.PerformAutomatedMessageProcessing,true);
    Options.AddToMessagesTable = GetOptionalValue (Options.AddToMessagesTable,null);

    var PageDiv = document.createElement ('div');
    var PageURL = '/messages/js_list_all/page:' + PageIndex;

    console.log ('Loading message page: ' + PageIndex);
    LoadURLIntoDiv (PageURL,PageDiv);
    Options.SourceMessagesTable = $(PageDiv).find ('table:eq(0)');
    if (Options.SourceMessagesTable.find ('tr').length)
        ProcessMessagesPage (Options);
    IsScriptBusyProcessingPageLoad = false;
}

function RefreshMessages (ToThisPageNumber)
{
    IsScriptBusyProcessingPageLoad = true;
    setTimeout (function (){
        PageNumber = parseInt (GetOptionalValue (ToThisPageNumber,1));
        LoadAndProcessMessagesPage (PageNumber,{AddToMessagesTable: MyMessagesTable, ClearMessagesArrayFirst: true});
        PageNumberAtPageLoad = PageNumber;
        CurrentMessagesPageNumber = PageNumber;
        MyMessagesTableDiv.scrollTop = 0;
        LastRefreshTime = new Date ();
        UpdatePageDivs ();
    },100);
}

function ViewMessage (Message,ViewMode)
{
    var ViewMode = GetOptionalValue (ViewMode,GetTokenizedVersionOf (GetPreferenceValue ('Message view.View messages'),true));
    var MessageURL = '/messages/view/' + Message.ID;

    if (ViewMode == 'innewtab' || Message.MessageType == 'PM')
        {
        window.open (MessageURL,'_blank');
        window.focus ();
    }
    else
    {
        var tmpDiv = document.createElement ('div');
        LoadURLIntoDiv (MessageURL,tmpDiv);
        var MessageContentDivJQ = $(tmpDiv).find ('#fullcenter').eq (0);
        
        var MessageContentDiv = MessageContentDivJQ.get(0);
        ApplyPreferenceSectionToElement ('Table style.Font',MessageContentDiv);
        with (MessageContentDiv.style)
        {
            color = GetPreferenceValue ('Table style.Colors.Standard text',color);
            backgroundColor = GetPreferenceValue ('Table style.Colors.Background',backgroundColor);
        }
        switch (ViewMode)
        {
            case 'abovemessagestable':
                MessageContentDivJQ.find ('span').remove ();
                MessageContentDivJQ.find ('h3').remove ();
                MessageContentDivJQ.find ('br').replaceWith (' ');
                
                ViewMessageDiv.innerHTML = '';
                ViewMessageDiv.innerHTML = MessageContentDiv.innerHTML;
                
                $(ViewMessageDiv).find ('a').each (function () {
                    $(this).click (function (e) {e.preventDefault(); var tmpURL = $(this).attr ('href'); console.log (tmpURL); window.open (tmpURL,'_blank');});
                    if (IsPreferenceEnabled ('Table style','Remove underlines from links'))
                        $(this).css ('text-decoration','none');
                });

                with (ViewMessageDiv)
                {
                    style.width = '640px';
                    style.height = '60px';
                    style.padding = '2px';
                    style.paddingLeft = '5px';
                    style.paddingRight = '5px';
                    style.backgroundColor = 'white';
                }
                
                UpdateAMPDiv ('viewmessage',Message,Message.DateTime);
                break;
            case 'inpopupwindow':
                MessageContentDivJQ.find ('a').each (function () {
                    $(this).click (function (e) {e.preventDefault(); var tmpURL = window.location.protocol + window.location.hostname + $(this).attr ('href'); console.log (tmpURL); window.open (tmpURL,'_blank');});
                    if (IsPreferenceEnabled ('Table style','Remove underlines from links'))
                        $(this).css ('text-decoration','none');
                });
                var tmpWindow = window.open ('','Machina_Messages_tmpWindow','width=400,height=300,toolbar=no,titlebar=no,location=no');
                tmpWindow.document.body.innerHTML = '';
                tmpWindow.document.body.appendChild (MessageContentDiv);
                break;
        }
    }

    MarkMessageAsRead (Message,true);
}

function TestMessagesActionCount (MaxPagesToLoad)
{
    var PageDiv = document.createElement ('div');
    
    for (var c = 1; c <= MaxPagesToLoad; c ++)
        {
        var PageIndex = Math.floor((Math.random() * 7) + 1);
        var PageURL = '/messages/js_list_all/page' + PageIndex;
        LoadURLIntoDiv (PageURL,PageDiv);
    }
}

function StartScript ()
{
    JaphetsMessagesTable = $('#messagelist table:eq(0)');
    MyMessagesTable = $(document.createElement ('table'));
    OriginalDocumentTitle = document.title;
    DoWeWantToUseLocalStorage = IsLocalStorageEnabled();
    GetMyUserID ();

    $('#fullcenter').hide ();

    setTimeout (function(){
        InitialiseMessageTypes ();
        InitialiseModulePreferences ();
        CreatePageDivs ();

        SetPageStyleFromPreferences ();
        var tmpSection = GetPreferencesSection ('Automated message processing');
        IsAMPEnabled = tmpSection.Enabled ();

        HandleMessagesPageReload ();
        
        ResizePageDivs ();
        $(window).resize(function() {ResizePageDivs ();});
        ScriptControlPanel.display = 'block';

        setInterval (function(){HandleDynamicEvents (); UpdateMessagesPageTitle ();},500);
    },100);
}

// script starts here
StartScript ();
