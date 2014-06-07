// ==UserScript==

// @name       Mine Things - Transport page
// @description Adds sorting, filtering, table-breaking, color coding, extra vehicle details, ETA, radar, gadgets, dynamic updates, trip stats, event history and various other features to Minethings ships/vehicles transport pages.
// @version    2.873
// @copyright  2013+, iMachine

// @grant GM_log
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyGeneralLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyArraysLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyStringsLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyTablesLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyPreferencesLibrary.js
// @require https://raw.github.com/i-machine/Minethings/master/Libraries/MyMinethingsLibrary.js

// @match      http://*.minethings.com/ships
// @match      http://*.minethings.com/vehicles
// @match      http://*.minethings.com/vehicles/check_status/*
// @match      http://*.minethings.com/vehicles/send/*
// @match      http://*.minethings.com/vehicles/confirm_send/*
// @match      http://*.minethings.com/vehicles/process_send
// @match      http://*.minethings.com/gadgets
// @match      http://*.minethings.com/miners/profession

// ==/UserScript==

var MachinaModule = 'Transport';

function InitialisePreferences()
{
    InitialisePreference ('Show vehicles with these statuses','Stopped',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Show vehicles with these statuses','Departing',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Show vehicles with these statuses','Arriving',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Show vehicles with these statuses','Moving',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Show vehicles with these statuses','Engaged',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Show vehicles with these statuses','Disabled',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Show vehicles with these statuses','Sunk',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Show vehicles with these statuses','Damaged',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Show vehicles with these statuses','Recent events only',PreferenceTypeOnOff,false,'','');
    
    var SVITO = InitialisePreference ('Sorting & table breaking','Sort vehicles in this order',PreferenceTypeOnOffPlusValue,true,'-Class,Dest,City,Km Left','');
    InitialisePreference ('Sorting & table breaking','Sort cities in this order',PreferenceTypeOnOffPlusValue,true,'Esmi,Qido,Fahtkee,317,Lyhase,Alaxia,','').RequiresThesePreferencesToBeEnabled.push (SVITO);
    InitialisePreference ('Sorting & table breaking','Put damaged vehicles at bottom of table',PreferenceTypeOnOff,true,'','').RequiresThesePreferencesToBeEnabled.push (SVITO);
    var BTUIDF = InitialisePreference ('Sorting & table breaking','Break table up into different fleets',PreferenceTypeOnOff,true,'','');
    BTUIDF.RequiresThesePreferencesToBeEnabled.push (SVITO);
    InitialisePreference ('Sorting & table breaking','Treat vehicles this many Km apart as different fleets',PreferenceTypeOnOffPlusValue,true,50,'').RequiresThesePreferencesToBeEnabled.push (BTUIDF);
    
    InitialisePreference ('General','Show stats in page title',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('General','Refresh page every (this many) minutes',PreferenceTypeOnOffPlusValue,true,5,'');
    InitialisePreference ('General','Open clicked links in new tabs',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('General','Class events from the last (this many) minutes as recent events',PreferenceTypeValue,true,10,'');
    InitialisePreference ('General','Class arrivals from the last (this many) minutes as recent events',PreferenceTypeValue,true,2,'');
    InitialisePreference ('General','Class departures as recent events',PreferenceTypeOnOff,false,'','');
    
    InitialisePreference ('Content','Show route details',PreferenceTypeOnOff,true,'','');
    var SEVD = InitialisePreference ('Content','Show extra vehicle details',PreferenceTypeOnOff,true,'','');
    var SVLE = InitialisePreference ('Content',"Show vehicles' last event",PreferenceTypeOnOff,false,'','');
    var SVTS = InitialisePreference ('Content',"Show vehicles' trip stats",PreferenceTypeOnOff,false,'','');
    var SVTH = InitialisePreference ('Content',"Show vehicles' trip history",PreferenceTypeOnOff,false,'','');
    
    InitialisePreference ('Content','Show ETA',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Content','Abbreviate city names',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Content','Hide numbers that equal zero',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Content','Display Km left to this decimal place',PreferenceTypeOnOffPlusValue,false,2,'');
    InitialisePreference ('Content','Event time format',PreferenceTypeValue,false,'1','');
    InitialisePreference ('Content','Condense vehicle history (WWWWWWeeee becomes 6W 4e)',PreferenceTypeOnOff,true,'','');
    
    var DU = InitialisePreference ('Dynamic updates','Enabled',PreferenceTypeOnOff,true,'','');
    DU.RequiresThesePreferencesToBeEnabled.push (SEVD);
    InitialisePreference ('Dynamic updates','Refresh distance and time figures every (this many) seconds',PreferenceTypeOnOffPlusValue,true,1,'').RequiresThesePreferencesToBeEnabled.push (DU);
    
    InitialisePreference ('Radar','Show radar data',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Radar','Refresh radar every (this many) minutes',PreferenceTypeOnOffPlusValue,true,60,'');
    InitialisePreference ('Radar','Only process & display radar for these classes',PreferenceTypeOnOffPlusValue,false,'1,2,3','');
    
    InitialisePreference ('Gadgets','Show gadgets',PreferenceTypeOnOff,false,'','');
 
    InitialisePreference ('Important gadgets','Whetting Stone',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Important gadgets','Shield',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Important gadgets','Turbo Engine',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Important gadgets','Radar',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Important gadgets','Binoculars',PreferenceTypeOnOff,true,'','');

    InitialisePreference ('Vehicle send','Automatically set destination',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Vehicle send','Automatically confirm on send',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Vehicle send','Close send page after confirm',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Vehicle send','Reload vehicle page after send',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Vehicle send','Display warning if any important gadgets are inactive',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Vehicle send','Display profession reminder for first send after a period of inactivity',PreferenceTypeOnOff,true,'','');
    
    InitialisePreference ('Layout','Align text like this',PreferenceTypeValue,true,'center','(left,center,right)');
    InitialisePreference ('Layout','Align numbers like this',PreferenceTypeValue,true,'center','(left,center,right)');
    InitialisePreference ('Layout','Swap status and send columns',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Layout','Limit name column to this width',PreferenceTypeOnOffPlusValue,true,100,'');
    
    InitialisePreference ('Table style','Background color',PreferenceTypeOnOffPlusValue,true,'#FBF2E1','');
    InitialisePreference ('Table style','Show borders between columns',PreferenceTypeOnOff,false,'','');
    InitialisePreference ('Table style','Font name',PreferenceTypeValue,true,'Arial','');
    InitialisePreference ('Table style','Important text font color',PreferenceTypeValue,true,'Black','');
    InitialisePreference ('Table style','Non-important text font color',PreferenceTypeValue,true,'#606060','');
    InitialisePreference ('Table style','Font size',PreferenceTypeValue,true,12,'');
    InitialisePreference ('Table style','Bold font',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Table style','Remove underlines',PreferenceTypeOnOff,true,'','');
    
    InitialisePreference ('Color coding','Cities',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Vehicle statuses',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Apply vehicle status color coding to vehicle names',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Minutes away from destination',PreferenceTypeOnOffPlusValue,true,30,'');
    InitialisePreference ('Color coding','Km away from destination',PreferenceTypeOnOffPlusValue,true,10,'');
    InitialisePreference ('Color coding','Cargo',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Cargo at risk',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Reduced speed',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Damaged hull',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Lost crew',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Crew strength',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Cannons',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Ammo',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Cannons out of ammo',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding',"Vehicles' trip stats",PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding',"Vehicles' last event",PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding',"Vehicles' trip history",PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Recent events',PreferenceTypeOnOff,true,'','');
    InitialisePreference ('Color coding','Gadget statuses',PreferenceTypeOnOff,true,'','');

    InitialisePreference ('Click counters','Refresh transport page',PreferenceTypeValue,true,'0','');
    InitialisePreference ('Click counters','Refresh radar',PreferenceTypeValue,true,'0','');
    InitialisePreference ('Click counters','Load vehicle status page in background',PreferenceTypeValue,true,'0','');
    InitialisePreference ('Click counters','Load gadgets page in background',PreferenceTypeValue,true,'0','');
}

function GetColorCoding (TextToBeColorCoded)
{
    switch (TextToBeColorCoded)
    {
            // First, handle vehicle status
        case 'stopped': return GetColorCoding ('none');
        case 'departing': return '#E0EBFF'; // 'paleturquoise';
        case 'moving': return '#DEFADE'; // 'PaleGreen';
        case 'arriving': return '#E0EBFF'; // 'paleturquoise';
        case 'engaged': return '#FFA0A0'; // '#FF9898'; // 'red';
        case 'damaged': return '#F9D2D2'; // '#FFE0E5'; // 'pink';
        case 'sunk': return '#C4B2C4';
        case 'disabled': return 'PaleGoldenRod';
            
            // Now assign colors for cities
        case 'Esmi': return '#F5F2CC'; // '#F6F4D4'; // 'PaleGoldenRod';
        case 'Qido': return '#DEFADE'; // 'PaleGreen';
        case 'Fahtkee': return '#F9D2D2'; // '#FFE0E5'; // 'pink';
        case '317': return '#E0EBFF'; // 'paleturquoise';
        case 'Alaxia': return '#F5E4F5'; // 'Plum';
        case 'Lyhase': return '#F6B680'; // 'sandybrown';
            
        case '?': return '#E8E8E8'; // 'silver';
        case '': return GetColorCoding ('none');
            
        case 'GotCargo': return 'white';
        case 'CargoAtRisk': return 'PaleGoldenRod';
        case 'ReducedSpeed': return '#F9D2D2'; // '#FFE0E5'; // 'pink';
        case 'DamagedHull': return '#F9D2D2'; // '#FFE0E5'; // 'pink';
        case 'LostCrew': return '#F9D2D2'; // '#FFE0E5'; // 'pink';
        case 'AreWeThereYet': return 'white';
        case 'GotWeapons': return 'white';
        case 'GotCannons': return 'white';
        case 'GotAmmo': return 'white';
        case 'OutOfAmmo': return 'PaleGoldenRod';
            
        case 'RecentEvent': return 'white';
        case 'StartedFight': return '#FFA0A0'; // '#FF9898'; // 'red';
        case 'WonFight': return '#DEFADE';
        case 'LostFight': return '#F9D2D2'; // '#FFE0E5'; // 'pink';
        case 'Fended': return '#E0EBFF';
        case 'Escaped': return '#F5F2CC'; // '#F6F4D4';
        case 'EludedByEnemy': return '#F5E4F5';
        case 'WasDisabled': return '#FFA0A0';
        case 'Fished': return '#FFD4AA';
        case 'WasSunk': return GetColorCoding ('sunk');'#F5E4F5';
        case 'SankEnemy': return '#B1F0B1';
 
        case 'ActiveGadget': return '#DEFADE';
        case 'ActiveShortLifeGadget': return 'palegoldenrod'; // '#F5F2CC';
        case 'InactiveNonImportantGadget': return 'none';
        case 'InactiveImportantGadget': return '#FFA0A0';
 
        case 'ImportantText': return GetPreferenceValue ('Table style','Important text font color');
        case 'NonImportantText': return GetPreferenceValue ('Table style','Non-important text font color');
            
        case 'none': return 'transparent';
        case 'background': return 'transparent';
            
        default:
            // if we get to here it means we haven't been able to find a match with a hardcoded item and this is new, unknown data, probably a city outside of dempo
            
            // if we've never seen this text before, add it to the array and save to localStorage so next time we load the page we know about it
            if (NewCitiesArray.indexOf (TextToBeColorCoded) == -1)
            {
                NewCitiesArray.push (TextToBeColorCoded);
                if (DoWeWantToUseLocalStorage)
                {
                    var tmpStr = NewCitiesArray.join (',');
                    localStorage.setItem ('NewCitiesArray',tmpStr);
                }
            }
            switch (NewCitiesArray.indexOf (TextToBeColorCoded))
            {
                case 0: return '#F5F2CC'; // 'PaleGoldenRod';
                case 1: return '#DEFADE'; // 'PaleGreen';
                case 2: return '#F9D2D2'; // 'pink';
                case 3: return '#E0EBFF'; // 'paleturquoise';
                case 4: return '#F5E4F5'; // 'Plum';
                case 5: return '#F6B680'; // 'sandybrown';
            }
            // if we get to this stage, something's wrong
            return 'red';
    }
}

// the "var"s below should NOT be changed
var DoWeWantToUseLocalStorage = true; // needs to be true to allow figures like Km/h, ETA and extra vehicle details to be displayed.
var VehicleDataArray = new Array ();
var VehicleTableSortOrderArray = new Array ();
var NewCitiesArray = new Array ();
var VehicleTableFilterArray = new Array ();

var RadarDataArray = new Array ();
var LastRadarRefresh = 0;
var RadarGadgetEnabled = false;
var GadgetsArray = new Array ();
var LastGadgetsRefresh = 0;
var RefreshGadgetsEveryXMinutes = 60;
var IsPreferencesDivVisible = false;
var LastKnownProfession = '';
var LastKnownProfessionLastUpdate = 0;
var SecondsSinceLastKnownProfessionLastUpdated = 0;

var DidTheOrderOfAnyVehiclesGetChangedDuringLastSort = false;
var HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw = true;
var TimeWarpFactor = 1; // increase this to make time go faster but remember to put it back to 1 when you're done playing

var ServerTimeAtPageLoad = ConvertMTDateTimeStrToDateTime ($('#left').find ('p').eq(0).text ());
var ServerTimeNow = new Date (ServerTimeAtPageLoad);
var RealTimeAtPageLoad = new Date ();
var SecondsSincePageLoad = 0;

var AverageEngagementTimeInMinutes = 40;
var CheckIfStillEngagedIfEngagementTimeInMinutesLongerThan = 50;

var SendPageGadgetsDiv = document.createElement ('div');
var SendPageLastKnownProfessionDiv = document.createElement ('div');

function GetFinalPartOfURL (URL)
{
    var n = URL.lastIndexOf('/');
    return (URL.substring(n + 1));
}

function cell (rowObject,column)
{
    if (isNaN (column))
        return ($(rowObject).children().eq(GetColumnIndex (VehicleTable,column)));
    else
        return ($(rowObject).children().eq(column));
}

function ApplyStandardFormattingToTable (ThisTable)
{
    if (IsPreferenceEnabled ('Table style','Background color'))
        ThisTable.css('background',GetPreferenceValue ('Table style','Background color'));
    
    ThisTable.css('fontFamily',GetPreferenceValue ('Table style','Font name'));
    ThisTable.css('fontSize',GetPreferenceValue ('Table style','Font size'));
    ThisTable.css ('font-size',parseInt (GetPreferenceValue ('Table style','Font size')) + 'px');
    ThisTable.css('color',GetPreferenceValue ('Table style','Non-important text font color'));
    if (IsPreferenceEnabled ('Table style','Bold font'))
        ThisTable.css('fontWeight','bold');
    
    ThisTable.css('border-collapse','collapse');    
    if (!IsPreferenceEnabled ('Table style','Show borders between columns'))
        ThisTable.attr('border', '0');
    ThisTable.css('border','medium solid black');    
    ThisTable.find ('tr:eq(0)').css('border','medium solid black');    

    ThisTable.find ('td,th').each (function(){
        $(this).css('padding', '1px 5px');
        $(this).css('border-bottom', 'thin solid silver');
        $(this).css ('white-space','nowrap');
    });
}

function SetVehicleLocalStorageDataFromDataTable(VehicleElementID,LookInThisElement)
{
    if (!DoWeWantToUseLocalStorage)
        return;
    
    var VehicleDataArray = new Array ();
    var VehicleDataStr = '';
    
    var VehicleDataTable = $(LookInThisElement).find('#fullcenter table').eq (0);
    
    $(VehicleDataTable).find ('tr').each (function(){
        var DataKeyForThisRow = $(this).children().eq(0).text();
        var DoWeWantToSaveDataForThisRow = false;
        
        if (location.pathname.indexOf ('/vehicles/confirm_send/') == 0)
            var DataValueForThisRow = $(this).children().eq(1).text();
        else
            var DataValueForThisRow = $(this).children().eq(1).find ('span').eq(0).text();
        
        switch (DataKeyForThisRow)
        {
            case 'Speed':
                DataValueForThisRow = DataValueForThisRow.substring (0,DataValueForThisRow.indexOf(' km/hr'));
                
            case 'Cargo':
                // ship specific values
            case 'Hull':
            case 'Crew':
            case 'Crew Strength':
            case 'Cannons':
            case 'Crit Chance':
            case 'Cannonballs':
            case 'Chain Shots':
            case 'Grape Shots':
                
                // land vehicle specific values
            case 'Attack':
            case 'Armor':
            case 'Offense':
            case 'Defense':
            case 'Dodge':
                
                DoWeWantToSaveDataForThisRow = true;
                break;
            case 'Engaged':
                if (DataValueForThisRow == 'Yes')
                    localStorage.setItem (('vps' + VehicleElementID),'engaged');
                break;
        }
        if (DoWeWantToSaveDataForThisRow)
            VehicleDataArray.push (DataKeyForThisRow+': '+DataValueForThisRow);
    });
    VehicleDataStr = VehicleDataArray.join();
    localStorage.setItem ('v'+VehicleElementID,VehicleDataStr);
}

function SetVehicleLocalStorageDataFromEventHistoryTable(VehicleElementID,LookInThisElement)
{
    if (!DoWeWantToUseLocalStorage)
        return;
    
    var VehicleEventHistory = new GetVehicleEventHistoryObject ();
    
    var EventHistoryTable = $(LookInThisElement).find("th:contains('event')").eq (0).closest ('table');
    $(EventHistoryTable).find ('tr:gt(0)').each (function(){
        
        VehicleEventHistory.LastEvent = $(this).children().eq(0).text();
        VehicleEventHistory.LastEventTime = $(this).children().eq(2).text();
        VehicleEventHistory.LastEventTime = VehicleEventHistory.LastEventTime.substring (0,VehicleEventHistory.LastEventTime.lastIndexOf (':'));
        VehicleEventHistory.LastEventEnemy = $(this).children().eq(4).html();
        VehicleEventHistory.LastEventURL = $(this).children().eq(0).find ('a').attr ('href') || '';
        
        var EventCell = $(this).children().eq(0);
        switch (GetTokenizedVersionOf (EventCell.text()))
        {
            case 'departed':
                VehicleEventHistory.DepartureTime = VehicleEventHistory.LastEventTime;
                EventCell.css ('background',GetColorCoding ('departing'));
                break;
            case 'arrived':
                VehicleEventHistory.ArrivalTime = VehicleEventHistory.LastEventTime;
                EventCell.css ('background',GetColorCoding ('arriving'));
                break;
            case 'started fight':
                VehicleEventHistory.TotalFights ++;
                EventCell.css ('background',GetColorCoding ('StartedFight'));
                break;
            case 'won':
                VehicleEventHistory.FightsWon ++;
                VehicleEventHistory.EventHistoryString += 'W';
                EventCell.css ('background',GetColorCoding ('WonFight'));
                break;
            case 'lost':
                VehicleEventHistory.FightsLost ++;
                VehicleEventHistory.EventHistoryString += 'L';
                EventCell.css ('background',GetColorCoding ('LostFight'));
                break;
            case 'fended':
                VehicleEventHistory.TimesFended ++;
                VehicleEventHistory.EventHistoryString += 'F';
                EventCell.css ('background',GetColorCoding ('Fended'));
                break;
            case 'escaped':
                VehicleEventHistory.TimesEscapedFromEnemy ++;
                VehicleEventHistory.EventHistoryString += 'e';
                EventCell.css ('background',GetColorCoding ('Escaped'));
                break;
            case 'was eluded':
                VehicleEventHistory.TimesEludedByEnemy ++;
                VehicleEventHistory.EventHistoryString += 'm';
                EventCell.css ('background',GetColorCoding ('EludedByEnemy'));
                break;
            case 'was disabled':
                VehicleEventHistory.TimesWasDisabled ++;
                VehicleEventHistory.EventHistoryString += 'd';
                EventCell.css ('background',GetColorCoding ('WasDisabled'));
                break;
            case 'was sunk':
                EventCell.css ('background',GetColorCoding ('WasSunk'));
                break;
            case 'sank em':
                VehicleEventHistory.TimesSankEnemy ++;
                VehicleEventHistory.EventHistoryString += 'S';
                EventCell.css ('background',GetColorCoding ('SankEnemy'));
                break;
            case 'fished':
                VehicleEventHistory.TimesFished ++;
                VehicleEventHistory.EventHistoryString += 'J';
                EventCell.css ('background',GetColorCoding ('Fished'));
                break;
        }
        
    });
    localStorage.setItem ('vs'+VehicleElementID,JSON.stringify (VehicleEventHistory));
}

function SetVehicleLocalStorageDataFromStatusPage (VehicleElementID,LookInThisElement,InThisURL)
{
    SetVehicleLocalStorageDataFromDataTable (VehicleElementID,LookInThisElement);
    if (InThisURL.indexOf ('/vehicles/check_status/') == 0)
        SetVehicleLocalStorageDataFromEventHistoryTable (VehicleElementID,LookInThisElement);
}

function GetVehicleDetailsFromStatusPage (Vehicle,StatusPageURL)
{
    if (!DoWeWantToUseLocalStorage)
        return;
    
    SetPreferenceValue ('Click counters','Load vehicle status page in background',parseInt (GetPreferenceValue ('Click counters','Load vehicle status page in background')) + 1);
    SavePreferences ();

    var tmpDiv = document.createElement ('div');
    LoadURLIntoDiv (StatusPageURL,tmpDiv);
    SetVehicleLocalStorageDataFromStatusPage (Vehicle.ID,$(tmpDiv),StatusPageURL);
    $(tmpDiv).remove();
}

function FilterObject ()
{
    this ['Property'] = '';
    this ['Value'] = '';
}

function CurrentAndMaximumObject ()
{
    this ['Current'] = 0;
    this ['Maximum'] = 0;
}

function VehicleObject (VehicleID)
{
    this ['ID'] = VehicleID;
    this ['Name'] = '';
    this ['Km Left'] = 0;
    this ['Km/h'] = 0;
    this ['Speed'] = new CurrentAndMaximumObject ();
    this ['Cargo'] = new CurrentAndMaximumObject ();
    this ['Damaged'] = false;
    this ['Docked'] = false;
    switch (location.pathname)
    {
        case '/ships':
            this ['Hull'] = new CurrentAndMaximumObject ();
            this ['Crew'] = new CurrentAndMaximumObject ();
            this ['Cannons'] = new CurrentAndMaximumObject ();
            break;
        case '/vehicles':
            break;
    }
    
    this ['LocalStorageString'] = '';
    this ['PreviousLocalStorageString'] = '';
    this ['HaveAnyDetailsBeenChangedSinceLastTableRedraw'] = true;
    this ['EventHistory'] = new GetVehicleEventHistoryObject ();
    this ['HasStillEngagedCheckBeenPerformed'] = false;
}

function GetVehicleObject (VehicleID)
{
    var x = FindObjectInArray (VehicleDataArray,'ID',VehicleID);    
    return x;
}

function GetVehicleEventHistoryObject ()
{
    this.DepartureTime = '';
    this.ArrivalTime = '';
    this.LastEvent = '';
    this.LastEventTime = '';
    this.LastEventEnemy = '';
    this.LastEventURL = '';
    this.TotalFights = 0;
    this.FightsWon = 0;
    this.FightsLost = 0;
    this.TimesFended = 0;
    this.TimesSankEnemy = 0;
    this.TimesEscapedFromEnemy = 0;
    this.TimesEludedByEnemy = 0;
    this.TimesWasDisabled = 0;
    this.TimesFished = 0;
    this.EventHistoryString = '';
}

function GetVehicleIDForThisRow (ThisRow)
{
    var x = GetFinalPartOfURL (cell(ThisRow,StatusCol).find ('a').attr ('href'));
    return x;
}

function GetVehicleObjectForThisRow (ThisRow)
{
    var x = GetVehicleObject (GetVehicleIDForThisRow (ThisRow));
    return x;
}

function SplitVehiclePropertyIntoCurrentAndMaximum (Vehicle,Property,Value)
{
    // first off, just seed with zeros in case Value is nonsensical
    Vehicle [Property].Current = 0;
    Vehicle [Property].Maximum = 0;
    
    // now attempt to extract numbers in the format 99/99
    var tmpArray = Value.split ('/');
    if (tmpArray.length == 2)
    {
        if (!isNaN (tmpArray [0]))
            Vehicle [Property].Current = parseFloat (tmpArray [0]);
        if (!isNaN (tmpArray [1]))
            Vehicle [Property].Maximum = parseFloat (tmpArray [1]);
    }
}

function InitialisedRadarDataObject ()
{
    this.Class = 0;
    this.City1 = '';
    this.MyVehiclesDockedAtCity1 = 0;
    this.MyVehiclesDockedAtCity2 = 0;
    this.City2 = '';
    this.MyVehiclesEnRoute = 0;
    this.MyVehiclesEngaged = 0;
}

function InitialisedGadgetObject ()
{
    this.Name = '';
    this.Status = '';
    this.SecondsUntilExpiryAsOfLastGadgetsPageLoad = 0;
    this.SecondsUntilExpiry = 0;
    this.DoWeHaveAnyInInventory = false;
}

function LoadRadarDataFromLocalStorage ()
{
    if (!DoWeWantToUseLocalStorage)
        return;
    
    var tmpstr = localStorage.getItem (CurrentTransportPageVehicleType + '.RadarData') || '';
    if (tmpstr != '')
    {
        if (tmpstr [0] != '"')
        {
            try{
                var tmpRDA = JSON.parse (tmpstr);
            }catch(e){
                var tmpRDA = new Array ();
            }
            RadarDataArray = tmpRDA.slice(0);
        }
    }
    LastRadarRefresh = localStorage.getItem (CurrentTransportPageVehicleType + '.LastRadarRefresh') || 0;
    RadarGadgetEnabled = (LastRadarRefresh != 0);
}

function SaveRadarDataToLocalStorage ()
{
    if (!DoWeWantToUseLocalStorage)
        return;
    if (RadarDataArray.length == 0)
        localStorage.removeItem (CurrentTransportPageVehicleType + '.RadarData');
    else
    {
        
        var tmpstr = JSON.stringify (RadarDataArray);
        localStorage.setItem (CurrentTransportPageVehicleType + '.RadarData',tmpstr);
    }
    localStorage.setItem (CurrentTransportPageVehicleType + '.LastRadarRefresh',LastRadarRefresh);
}

function DoesRadarDataObjectMatch (RadarDataObject,Class,City1,City2,IfNoCity2MatchCity1WithRadarCity1OrCity2)
{
    if (RadarDataObject.Class == Class)
    {
        if (City2)
        {
            if (AreStringsBasicallyEqual (RadarDataObject.City1,City1) && AreStringsBasicallyEqual (RadarDataObject.City2,City2))
                return true;
            if (AreStringsBasicallyEqual (RadarDataObject.City1,City2) && AreStringsBasicallyEqual (RadarDataObject.City2,City1))
                return true;
        }
        else
        {
            if (AreStringsBasicallyEqual (RadarDataObject.City1,City1) || (IfNoCity2MatchCity1WithRadarCity1OrCity2 && AreStringsBasicallyEqual (RadarDataObject.City2,City1)))
                return true;
        }
    }
    return false;
}

function FindRadarDataObject (Class,City1,City2,IfNoCity2MatchCity1WithRadarCity1OrCity2)
{
    for (var c = 0; c < RadarDataArray.length; c ++)
    {
        var tmpRD = RadarDataArray [c];
        
        if (DoesRadarDataObjectMatch (tmpRD,Class,City1,City2,IfNoCity2MatchCity1WithRadarCity1OrCity2))
            return tmpRD;
    }
    return null;
}

function SortRadarData ()
{
    if (RadarDataArray.length == 0)
        return;
    
    var CustomSortOrdersArray = new Array ();
    if (IsPreferenceEnabled ('Sorting & table breaking','Sort cities in this order'))
    {
        // Set up array of custom sort orders to send to Sort function
        CustomSortOrdersArray.push (new CustomSortOrderObject ('City1',GetPreferenceValue ('Sorting & table breaking','Sort cities in this order')));
        CustomSortOrdersArray.push (new CustomSortOrderObject ('City2',GetPreferenceValue ('Sorting & table breaking','Sort cities in this order')));
        
        // now sort City1 and City2 so our favourite cities become City1s
        for (var c = 0; c < RadarDataArray.length; c++)
        {
            tmpRD = RadarDataArray [c];
            if (GetPreferenceValue ('Sorting & table breaking','Sort cities in this order').indexOf (tmpRD.City1) > GetPreferenceValue ('Sorting & table breaking','Sort cities in this order').indexOf (tmpRD.City2))
            {
                var tmpstr = tmpRD.City1;
                tmpRD.City1 = tmpRD.City2;
                tmpRD.City2 = tmpstr;
            }
        }
    }
    RadarDataArray.sort (SortByThePropertiesInThisStr ('-Class,City1,City2',CustomSortOrdersArray));
}

function BreakRadarDataTable ()
{
    if (RadarDataArray.length == 0)
        return;
    
    RowsToProcess = RadarDataTable.find('tr').slice (1, RadarDataTable.find('tr').length - 1);
    RowsToProcess.each (function() {
        var ThisRow = $(this);
        var NextRow = ThisRow.next();
        var ThisRadarData = RadarDataArray [ThisRow [0].sectionRowIndex - 1];
        var NextRadarData = RadarDataArray [NextRow [0].sectionRowIndex - 1];
        
        var NewBorderStyle = 'thin solid silver';
        
        if (ThisRadarData ['Class'] != NextRadarData ['Class'])
            NewBorderStyle = '3px solid black';
        
        ThisRow.css ('border-bottom',NewBorderStyle);
    });
}

function DynamicallyUpdateRadarDetails ()
{
    if (RadarGadgetEnabled && LastRadarRefresh != 0)
    {
        var NewRadarStatus = 'Radar';
        
        var Now = new Date ();
        var SecondsSinceLastRefresh = Math.ceil ((Now.getTime () - LastRadarRefresh) / 1000);
        if (SecondsSinceLastRefresh > 59)
            NewRadarStatus += ' as of ' + ConvertSecondsToReadableStr (SecondsSinceLastRefresh) + ' ago';
        
        if (IsPreferenceEnabled ('Radar','Only process & display radar for these classes'))
            NewRadarStatus += ' (Class ' + GetPreferenceValue ('Radar','Only process & display radar for these classes') + ' only)';
        else
            NewRadarStatus += ' (all classes)';
        
        RadarStatusNode.nodeValue = NewRadarStatus;
        
        if (IsPreferenceEnabled ('Radar','Refresh radar every (this many) minutes'))
        {
            if (SecondsSinceLastRefresh / 60 >= parseFloat (GetPreferenceValue ('Radar','Refresh radar every (this many) minutes')))
                RefreshRadarData ();
        }
    }
}

function UpdateRadarDataWithMyVehicleData ()
{
    // propagate radar route data with totals of our docked and moving vehicles
    for (var cRoute = 0; cRoute < RadarDataArray.length; cRoute++)
    {
        var tmpRD = RadarDataArray [cRoute];
        tmpRD.MyVehiclesDockedAtCity1 = 0;
        tmpRD.MyVehiclesDockedAtCity2 = 0;
        tmpRD.MyVehiclesEnRoute = 0;
        tmpRD.MyVehiclesEngaged = 0;
    }
    for (var cRoute = 0; cRoute < RadarDataArray.length; cRoute++)
    {
        var tmpRD = RadarDataArray [cRoute];
        for (cVehicle = 0; cVehicle < VehicleDataArray.length; cVehicle++)
        {
            var Vehicle = VehicleDataArray [cVehicle];
            
            if (Vehicle.Dest == '')
            {
                if (DoesRadarDataObjectMatch (tmpRD,Vehicle.Class,Vehicle.City,null,true))
                {
                    if (Vehicle.City == tmpRD.City1)
                        tmpRD.MyVehiclesDockedAtCity1 ++;
                    if (Vehicle.City == tmpRD.City2)
                        tmpRD.MyVehiclesDockedAtCity2 ++;
                }
            }
            else
            {
                if (DoesRadarDataObjectMatch (tmpRD,Vehicle.Class,Vehicle.City,Vehicle.Dest))
                {
                    if (Vehicle.Status != 'sunk')
                        tmpRD.MyVehiclesEnRoute ++;
                    if (Vehicle.Status == 'engaged')
                        tmpRD.MyVehiclesEngaged ++;
                }
            }
        }
    }
}

function ScrapeRadarDataFromDiv (ThisDiv,ForThisClass,FromThisCity,ToThisCity)
{
    // see if there actually is a radar table present. the table itself has no id so we search for the 'Radar' title above it
    var RadarTitleElement = $(ThisDiv).find ( "h3:contains('Radar')" ).eq (0);
    
    // if no radar title is present, exit
    if (AreStringsBasicallyEqual (RadarTitleElement.text(),''))
        return false;
    
    // the radar table is the next table element after Radar title
    var RadarTable = $(RadarTitleElement).next ('table');
    
    RadarTable.find ('tr:gt(0)').each(function(){
        var ThisRow = this;
        if (ToThisCity)
            var Dest = ToThisCity;
        else
            var Dest = $(ThisRow).find ('td:eq(0)').text();
        var RadarData = FindRadarDataObject (ForThisClass,FromThisCity,Dest);
        if (!RadarData)
        {
            RadarData = new InitialisedRadarDataObject ();
            RadarDataArray.push (RadarData);
            RadarData.Class = ForThisClass;
            RadarData.City1 = FromThisCity;
            RadarData.City2 = Dest;
        }
        if (ToThisCity)
            tdSearchStr = 'td';
        else
            tdSearchStr = 'td:gt(0)';
        $(ThisRow).find (tdSearchStr).each (function(){
            var ThisCol = this;
            RadarData [$(RadarTable).find ('th:eq(' + $(ThisCol) [0].cellIndex + ')').text()] = $(ThisCol).text ();
        });
    });
    
    return true;
}

function RefreshRadarData ()
{
    RadarDataArray.length = 0;
    RefreshRadarDataButton.disabled = true;
    RadarStatusNode.nodeValue = 'Refreshing Radar ..';
    
    setTimeout (function (){
        var RadarDataFound = true; // assume we're gonna find something til proven otherwise
        
        // loop through all vehicles 2 times
        // pass 0 processes radar route data for stopped vehicles
        // pass 1 processes any extra radar route data not found in pass 1 for moving vehicles
        for (var cPass = 0; cPass < 2; cPass++)
        {
            for (var cVehicle = 0; cVehicle < VehicleDataArray.length; cVehicle ++)
            {
                var Vehicle = VehicleDataArray [cVehicle];
                
                if (IsPreferenceEnabled ('Radar','Only process & display radar for these classes'))
                {
                    if (GetPreferenceValue ('Radar','Only process & display radar for these classes').indexOf (Vehicle.Class) == -1)
                        continue;
                }
                
                var tmpDiv = document.createElement ('div');
                var tmpRD;
                
                switch (cPass)
                {
                    case 0:
                        // for stopped vehicles, radar data for all routes connected to vehicle's city appears on the send page, but no radar data appears on the status page
                        if (Vehicle.Dest == '')
                        {
                            tmpRD = FindRadarDataObject (Vehicle.Class,Vehicle.City,null,false);
                            if (tmpRD != null)
                                continue;
						    SetPreferenceValue ('Click counters','Refresh radar',parseInt (GetPreferenceValue ('Click counters','Refresh radar')) + 1);
				            SavePreferences ();
                            LoadURLIntoDiv ('/vehicles/send/' + Vehicle.ID,tmpDiv);
                            RadarDataFound = ScrapeRadarDataFromDiv (tmpDiv,Vehicle.Class,Vehicle.City);
                        }
                        break;
                    case 1:
                        // for moving vehicles, radar data for that vehicle's route only appears on the status page
                        if (Vehicle.Dest != '')
                        {
                            tmpRD = FindRadarDataObject (Vehicle.Class,Vehicle.City,Vehicle.Dest);
                            // if we've already got radar data for this class/city/dest, skip it
                            if (tmpRD != null)
                                continue;
						    SetPreferenceValue ('Click counters','Refresh radar',parseInt (GetPreferenceValue ('Click counters','Refresh radar')) + 1);
				            SavePreferences ();
                            LoadURLIntoDiv ('/vehicles/check_status/' + Vehicle.ID,tmpDiv);
                            RadarDataFound = ScrapeRadarDataFromDiv (tmpDiv,Vehicle.Class,Vehicle.City,Vehicle.Dest);
                        }
                        break;
                }
                // if RadarDataFound is false, there was no 'Radar' table on the page which means the Radar gadget is not activated, so we can abort trying to find radar data for other vehicle class/city/dests
                if (!RadarDataFound)
                    break;
            }
            // need to put a break here too
            if (!RadarDataFound)
                break;
        }
        
        $(tmpDiv).remove();
        if (RadarDataArray.length == 0)
        {
            RadarGadgetEnabled = false;
            LastRadarRefresh = 0;
            RadarStatusNode.nodeValue = 'Radar gadget not active';
        }
        else
        {
            UpdateRadarDataWithMyVehicleData ();
            RadarGadgetEnabled = true;
            LastRadarRefresh = (new Date ()).getTime ();
            RadarStatusNode.nodeValue = 'Radar';
        }
        SaveRadarDataToLocalStorage ();
        BuildRadarDataTable ();
        RefreshRadarDataButton.disabled = false;
    },50);
}

function CreateRadarDataDiv ()
{
    RadarDataDiv = document.createElement ('div');
    RadarDataDiv.style.display = 'none';
    RadarDataDiv.style.marginRight = '20px';
    RadarDataDiv.style.marginBottom = '10px';
    RadarAndGadgetsDiv.appendChild (RadarDataDiv);
    
    RadarStatusNode = document.createTextNode ('Radar');
    RadarDataDiv.appendChild (RadarStatusNode);
    
    RefreshRadarDataButton = document.createElement ('input');
    RefreshRadarDataButton.type = 'button';
    RefreshRadarDataButton.value = 'Refresh';
    RefreshRadarDataButton.onclick = function () {RefreshRadarData ()};
    RefreshRadarDataButton.style.marginLeft = '5px';
    RadarDataDiv.appendChild (RefreshRadarDataButton);
    
    var tmpTable = document.createElement ('table');
    RadarDataDiv.appendChild (tmpTable);
    RadarDataTable = $(RadarDataDiv).find ('table').eq(0);
}

function BuildRadarDataTable ()
{
    SortRadarData ();
    UpdateRadarDataWithMyVehicleData ();
    
    RadarDataTable.html (CreateTableHTML (RadarDataArray,true));
    
    RadarDataTable.find ('tr:eq(0)').children().eq(GetColumnIndex(RadarDataTable,'MyVehiclesDockedAtCity1')).html('D1');
    RadarDataTable.find ('tr:eq(0)').children().eq(GetColumnIndex(RadarDataTable,'MyVehiclesDockedAtCity2')).html('D2');
    RadarDataTable.find ('tr:eq(0)').children().eq(GetColumnIndex(RadarDataTable,'MyVehiclesEnRoute')).html('En route');
    RadarDataTable.find ('tr:eq(0)').children().eq(GetColumnIndex(RadarDataTable,'MyVehiclesEngaged')).html('E');
    InsertColumnAAfterColumnB (RadarDataTable,'Radar:','E');
    
    ApplyStandardFormattingToTable (RadarDataTable);
    
    RadarDataTable.find ('td,th').each (function(){
        switch ($(this) [0].cellIndex)
        {
            case 0: case GetColumnIndex (RadarDataTable,'City1'): case GetColumnIndex (RadarDataTable,'City2'):
                $(this).css ('text-align',GetPreferenceValue ('Layout','Align text like this'));
                break;
            default:
                $(this).css ('text-align',GetPreferenceValue ('Layout','Align numbers like this'));
                $(this).css ('width','20px');
        }
        if ($(this).parent () [0].sectionRowIndex > 0)
        {
            switch ($(this) [0].cellIndex)
            {
                case 0:
                    break;
                case 0: case GetColumnIndex (RadarDataTable,'City1'): case GetColumnIndex (RadarDataTable,'City2'):
                    if (IsPreferenceEnabled ('Color coding','Cities'))
                        $(this).css ('background',GetColorCoding ($(this).text()));
                    break;
                case 6:
                    if ($(this).text () == '0')
                    {
                        $(this).css ('color',GetColorCoding ('none'));
                        $(this).css ('background',GetColorCoding ('none'));
                    }
                    else
                        $(this).css ('background',GetColorCoding ('engaged'));
                    break;
                default:
                    if (IsPreferenceEnabled ('Content','Hide numbers that equal zero') && $(this).text () == '0')
                        $(this).css('color',GetColorCoding ('none'));
            }
        }
    });
    BreakRadarDataTable ();
}

function LoadGadgetsDataFromLocalStorage ()
{
    if (!DoWeWantToUseLocalStorage)
        return;
    
    GadgetsArray.length = 0;
    var tmpstr = localStorage.getItem (MachinaModule + '.GadgetsData') || '';
    if (tmpstr != '')
    {
        if (tmpstr [0] != '"')
        {
            try{
                var tmpA = JSON.parse (tmpstr);
            }catch(e){
                var tmpA = new Array ();
            }
            GadgetsArray = tmpA.slice(0);
        }
    }
    LastGadgetsRefresh = localStorage.getItem (MachinaModule + '.LastGadgetsRefresh') || 0;
    UpdateGadgetExpiryTimes ();
}

function SaveGadgetsDataToLocalStorage ()
{
    if (!DoWeWantToUseLocalStorage)
        return;
    if (GadgetsArray.length == 0)
        localStorage.removeItem (MachinaModule + '.GadgetsData');
    else
    {
        var tmpstr = JSON.stringify (GadgetsArray);
        localStorage.setItem (MachinaModule + '.GadgetsData',tmpstr);
    }
    localStorage.setItem (MachinaModule + '.LastGadgetsRefresh',LastGadgetsRefresh);
}

function UpdateGadgetExpiryTimes ()
{        
    var Now = new Date ();
    var SecondsSinceLastRefresh = Math.ceil ((Now.getTime () - LastGadgetsRefresh) / 1000);
    RefreshGadgetsEveryXMinutes = 55;
    for (var cGadget = 0; cGadget < GadgetsArray.length; cGadget ++)
    {
        var Gadget = GadgetsArray [cGadget];
        
        if (Gadget.DoWeHaveAnyInInventory)
            {
            if (Gadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad < 60 * 60)
                Gadget.SecondsUntilExpiry = Gadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad - SecondsSinceLastRefresh;
            else
                Gadget.SecondsUntilExpiry = Gadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad;
            if (Gadget.SecondsUntilExpiry > 0)
            {
                // if gadget time remaining is "1 hour" or less, we need to poll more frequently
                // because we don't know if it means 60 minutes or 119 minutes
                if (Gadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad <= 60 * 60)
                    RefreshGadgetsEveryXMinutes = 10;
                    
                Gadget.Status = ConvertSecondsToReadableStr (Gadget.SecondsUntilExpiry);
            }
            else
                {
                Gadget.Status = 'expired';
            }
        }
        else
        {
            Gadget.Status = 'have none';
        }
    }
}

function DynamicallyUpdateGadgets (PollForAutoRefresh)
{
    if (!DoWeWantToUseLocalStorage)
        return;

    if (LastGadgetsRefresh != 0)
    {
        var Now = new Date ();
        var SecondsSinceLastRefresh = Math.ceil ((Now.getTime () - LastGadgetsRefresh) / 1000);
        
        var DoWeNeedToRefreshGadgets = localStorage.getItem (MachinaModule + '.DoWeNeedToRefreshGadgets') || '';
        if (DoWeNeedToRefreshGadgets == 'true')
        {
          localStorage.removeItem (MachinaModule + '.DoWeNeedToRefreshGadgets');
          RefreshGadgets ();
        }
        else
        {
            if (PollForAutoRefresh && SecondsSinceLastRefresh / 60 >= RefreshGadgetsEveryXMinutes)
                RefreshGadgets ();
        }
        
        UpdateGadgetExpiryTimes ();
        BuildGadgetsTable ();
    }
}

function ScrapeAndSaveGadgetsDataFromDiv (GadgetsPageDiv)
{
    function AddGadget (Name,Index)
        {
        var newGadget = new InitialisedGadgetObject ();
        newGadget.Name = Name;
        GadgetsArray.push (newGadget);
        
        var GadgetDiv = $(GadgetsPageDiv).find ('#timeRemaining'+Index).eq(0);
        if (GadgetDiv.length)
            {
            newGadget.Status = GetTokenizedVersionOf (GadgetDiv.text ());
            newGadget.DoWeHaveAnyInInventory = true;
            var tmpParsedArray = newGadget.Status.match ('expires (.*?) from now');
            if (tmpParsedArray != null)
                {
                newGadget.Status = tmpParsedArray [1];
                console.log (newGadget.Name + ': ' + newGadget.Status);
                if (newGadget.Status.indexOf ('month') != -1)
                  newGadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad = parseInt (parseInt (newGadget.Status) * 60 * 60 * 24 * (365 / 12));
                else if (newGadget.Status.indexOf ('week') != -1)
                    newGadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad = parseInt (newGadget.Status) * 60 * 60 * 24 * 7;
                else if (newGadget.Status.indexOf ('day') != -1)
                    newGadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad = parseInt (newGadget.Status) * 60 * 60 * 24;
                else if (newGadget.Status.indexOf ('hour') != -1)
                    newGadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad = parseInt (newGadget.Status) * 60 * 60;
                else if (newGadget.Status.indexOf ('minute') != -1)
                    newGadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad = parseInt (newGadget.Status) * 60;
                else if (newGadget.Status.indexOf ('second') != -1)
                    newGadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad = parseInt (newGadget.Status);
                else
                    newGadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad = 0;
            }
            else
                {
                newGadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad = 0;
                newGadget.SecondsUntilExpiry = 0;
            }
        }
        else
        {
            newGadget.SecondsUntilExpiryAsOfLastGadgetsPageLoad = 0;
            newGadget.SecondsUntilExpiry = 0;
            newGadget.DoWeHaveAnyInInventory = false;
        }
    }

    GadgetsArray.length = 0;
    AddGadget ('Whetting Stone',7);
    AddGadget ('Shield',8);
    AddGadget ('Turbo Engine',9);
    AddGadget ('Radar',10);
    AddGadget ('Binoculars',13);
    SaveGadgetsDataToLocalStorage ();
}

function RefreshGadgets ()
{
    LastGadgetsRefresh = (new Date ()).getTime ();
    var tmpDiv = document.createElement ('div');

    RefreshGadgetsButton.disabled = true;
    GadgetsStatusNode.nodeValue = 'Refreshing gadgets ..';
    setTimeout (function (){
        SetPreferenceValue ('Click counters','Load gadgets page in background',parseInt (GetPreferenceValue ('Click counters','Load gadgets page in background')) + 1);
        SavePreferences ();
        LoadURLIntoDiv ('/gadgets/',tmpDiv);
        ScrapeAndSaveGadgetsDataFromDiv (tmpDiv);
        $(tmpDiv).remove();
    
        LoadGadgetsDataFromLocalStorage ();
        var tmpRadarGadget = FindObjectInArray (GadgetsArray,'Name','Radar');
        if (tmpRadarGadget.SecondsUntilExpiry > 0)
            {
            if (!RadarGadgetEnabled)
                {
                RadarGadgetEnabled = true;
                RefreshRadarData ();
            }
        }
        UpdateGadgetExpiryTimes ();
        BuildGadgetsTable ();
        GadgetsStatusNode.nodeValue = 'Gadgets';
        RefreshGadgetsButton.disabled = false;
    },50);
}

function CreateGadgetsDiv ()
{
    GadgetsDiv = document.createElement ('div');
    GadgetsDiv.style.display = 'none';
    GadgetsDiv.style.marginBottom = '10px';
    RadarAndGadgetsDiv.appendChild (GadgetsDiv);

    GadgetsStatusNode = document.createTextNode ('Gadgets');
    GadgetsDiv.appendChild (GadgetsStatusNode);
    
    RefreshGadgetsButton = document.createElement ('input');
    RefreshGadgetsButton.type = 'button';
    RefreshGadgetsButton.value = 'Refresh';
    RefreshGadgetsButton.onclick = function () {RefreshGadgets ()};
    RefreshGadgetsButton.style.marginLeft = '5px';
    GadgetsDiv.appendChild (RefreshGadgetsButton);
    
    var tmpTable = document.createElement ('table');
    GadgetsDiv.appendChild (tmpTable);
    GadgetsTable = $(GadgetsDiv).find ('table').eq(0);
}

function BuildGadgetsTable ()
{
    GadgetsTable.html (CreateTableHTML (GadgetsArray,true));
    SetColumnIndexVisible (GadgetsTable,GetColumnIndex (GadgetsTable,'SecondsUntilExpiryAsOfLastGadgetsPageLoad'),false);
    SetColumnIndexVisible (GadgetsTable,GetColumnIndex (GadgetsTable,'SecondsUntilExpiry'),false);
    SetColumnIndexVisible (GadgetsTable,GetColumnIndex (GadgetsTable,'DoWeHaveAnyInInventory'),false);
    ApplyStandardFormattingToTable (GadgetsTable);
    
    if (IsPreferenceEnabled ('Color coding','Gadget statuses'))
    {
        for (var cGadget = 0; cGadget < GadgetsArray.length; cGadget ++)
        {
            var Gadget = GadgetsArray [cGadget];
            var TableRow = $(GadgetsTable).find ('tr').eq (cGadget+1);
            var StatusCell = $(TableRow).children().eq(1);
            var StatusCellColor = 'none';

            if (Gadget.DoWeHaveAnyInInventory)
                {
                if (Gadget.SecondsUntilExpiry > 0)
                {
                    if (Gadget.SecondsUntilExpiry <= 60 * 60 * 2)
                        StatusCellColor = GetColorCoding ('ActiveShortLifeGadget');
                    else if (Gadget.SecondsUntilExpiry <= 60 * 60 * 24)
                        StatusCellColor = '#F5F2CC';
                    else if (Gadget.SecondsUntilExpiry <= 60 * 60 * 24 * 3.5)
                        StatusCellColor = '#DEFADE';
                    else if (Gadget.SecondsUntilExpiry <= 60 * 60 * 24 * 20)
                        StatusCellColor = '#E0EBFF';
                    else
                        StatusCellColor = '#F9D2D2';
                }
                else
                    {
                    if (IsPreferenceEnabled ('Important gadgets',Gadget.Name))
                        {
                        StatusCellColor = GetColorCoding ('InactiveImportantGadget');
                        StatusCell.css ('color',GetColorCoding ('ImportantText'));
                    }
                    else
                        StatusCellColor = GetColorCoding ('InactiveNonImportantGadget');
                }
            }
            else
                {
                if (IsPreferenceEnabled ('Important gadgets',Gadget.Name))
                    {
                    StatusCellColor = GetColorCoding ('InactiveImportantGadget');
                    StatusCell.css ('color',GetColorCoding ('ImportantText'));
                }
                else
                    StatusCellColor = GetColorCoding ('InactiveNonImportantGadget');
            }
            
            StatusCell.css ('background',StatusCellColor);
        }
    }
}

function SetLastKnownProfession (ThisProfession)
{
    if (!DoWeWantToUseLocalStorage)
        return;

    if (ThisProfession == LastKnownProfession)
        return;

    LastKnownProfession = ThisProfession;
    LastKnownProfessionLastUpdate = (new Date ()).getTime ();
    SecondsSinceLastKnownProfessionLastUpdated = 0;
        
    localStorage.setItem ('LastKnownProfession',LastKnownProfession);
    localStorage.setItem ('LastKnownProfessionLastUpdate',LastKnownProfessionLastUpdate);
}

function GetLastKnownProfession ()
{
    if (!DoWeWantToUseLocalStorage)
        return '';

    LastKnownProfession = localStorage.getItem ('LastKnownProfession') || '';
    LastKnownProfessionLastUpdate = localStorage.getItem ('LastKnownProfessionLastUpdate') || 0;
    var Now = new Date ();
    SecondsSinceLastKnownProfessionLastUpdated = Math.ceil ((Now.getTime () - LastKnownProfessionLastUpdate) / 1000);
    
    return LastKnownProfession;
}

function PropagateVehicleDataArrayFromVehicleTableContent()
{
    VehicleTable.find ('tr:gt(0)').each (function(){
        var VehicleID = GetVehicleIDForThisRow (this);
        var Vehicle = new VehicleObject (VehicleID);
        
        Vehicle ['Name'] = cell(this,NameCol).text ();
        Vehicle ['NameHTML'] = cell(this,NameCol).html();
        
        Vehicle ['Vehicle'] = cell(this,VehicleCol).text();
        Vehicle ['VehicleHTML'] = cell(this,VehicleCol).html();
        Vehicle ['VehicleLink'] = cell(this,VehicleCol).find('a').attr('href');
        Vehicle ['City'] = cell(this,CityCol).html();
        Vehicle ['Dest'] = cell(this,DestCol).html();
        Vehicle ['Km Left'] = parseFloat (cell(this,KmLeftCol).html());
        if (isNaN (Vehicle ['Km Left']))
            Vehicle ['Km Left'] = 0;
        Vehicle ['Cargo'] ['Current'] = cell(this,CargoCol).html();
        Vehicle ['Status'] = cell(this,StatusCol).find('a').text ();
        Vehicle ['StatusLink'] = cell(this,StatusCol).find('a').attr('href');
        Vehicle ['Send'] = cell(this,SendCol).text();
        Vehicle ['SendHTML'] = cell(this,SendCol).html();
        
        Vehicle ['Damaged'] = AreStringsBasicallyEqual (Vehicle ['Status'],'damaged');
        Vehicle ['Docked'] = (AreStringsBasicallyEqual (Vehicle ['Status'],'stopped') || AreStringsBasicallyEqual (Vehicle ['Status'],'damaged'));

        Vehicle ['EventHistory'] = new GetVehicleEventHistoryObject ();
        
        switch (cell(this,VehicleCol).find('a').attr('class'))
        {
            case 'yellow':
                Vehicle ['Class'] = 1;
                break;
            case 'green': case 'blue':
                Vehicle ['Class'] = 2;
                break;
            case 'red': case 'purple': case 'orange':
                Vehicle ['Class'] = 3;
                break;
            default:
                Vehicle ['Class'] = 0;
        }
        
        VehicleDataArray.push (Vehicle);
    });
}

function PropagateVehicleDataArrayFromLocalStorage()
{
    if (!DoWeWantToUseLocalStorage)
        return;

    var HaveWeLoadedAStatusPageInThisLoop = false;        
    
    for (var VehicleIndex = 0; VehicleIndex < VehicleDataArray.length; VehicleIndex++)
    {
        var Vehicle = VehicleDataArray [VehicleIndex];
        
        Vehicle ['PreviousStatus'] = localStorage.getItem ('vps'+Vehicle ['ID']) || '';
        if (Vehicle ['Status'] != Vehicle ['PreviousStatus'])
            {
            if (Vehicle ['Status'] == 'engaged' ||  Vehicle ['PreviousStatus'] == 'engaged')
                {
                console.log ('Vehicle entered/exited engaged mode - requesting status page reload');
                localStorage.removeItem ('v'+Vehicle ['ID']);
            }

            localStorage.setItem ('vps'+Vehicle ['ID'],Vehicle ['Status']);
            Vehicle ['HaveAnyDetailsBeenChangedSinceLastTableRedraw'] = true;
            HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw = true;
        }
        
        Vehicle ['PreviousLocalStorageString'] = Vehicle ['LocalStorageString'];
        Vehicle ['LocalStorageString'] = localStorage.getItem ('v'+Vehicle ['ID']) || '';
        
        // if we can't find vehicle details, load its status page in the background and set details from there
        if (Vehicle ['LocalStorageString'] == '' && !HaveWeLoadedAStatusPageInThisLoop)
        {
            HaveWeLoadedAStatusPageInThisLoop = true;
            GetVehicleDetailsFromStatusPage (Vehicle,Vehicle ['StatusLink']);
            Vehicle ['LocalStorageString'] = localStorage.getItem ('v'+Vehicle ['ID']) || '';
            Vehicle ['HaveAnyDetailsBeenChangedSinceLastTableRedraw'] = true;
            HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw = true;
        }
        
        if (Vehicle ['LocalStorageString'] != Vehicle ['PreviousLocalStorageString'])
        {
            Vehicle ['HaveAnyDetailsBeenChangedSinceLastTableRedraw'] = true;
            HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw = true;
        }
        
        if (Vehicle ['LocalStorageString'] == '')
            continue;
        
        var tmpArray = Vehicle ['LocalStorageString'].split(',');
        for (var index = 0; index < tmpArray.length; ++index)
        {
            var VehicleDataArrayKey = Trim (tmpArray [index].split(':') [0]);
            var VehicleDataArrayValue = Trim (tmpArray [index].split(':') [1]);
            switch (VehicleDataArrayKey)
            {
                case 'Speed':
                case 'Cargo':
                case 'Hull':
                case 'Crew':
                case 'Cannons':
                    SplitVehiclePropertyIntoCurrentAndMaximum (Vehicle,VehicleDataArrayKey,VehicleDataArrayValue);
                    break;
                default:
                    Vehicle [VehicleDataArrayKey] = VehicleDataArrayValue;
            }
        }
        
        Vehicle ['HTA'] = 0;
        Vehicle ['ETA'] = '';
        switch (Vehicle ['Status'])
        {
            case 'engaged':
                Vehicle ['Km/h'] = 0;
                break;
            case 'stopped':
                Vehicle ['Km/h'] = Vehicle ['Speed'] ['Maximum'];
                break;
            case 'damaged':
            case 'sunk':
                Vehicle ['Km/h'] = 0;
                break;
            case 'departing':
                Vehicle ['Km/h'] = Vehicle ['Speed'] ['Maximum'];
                if (Vehicle ['Km/h'] != 0)
                    Vehicle ['HTA'] = Vehicle ['Km Left'] / Vehicle ['Km/h'];
                break;
            case 'arriving':
                Vehicle ['Km/h'] = Vehicle ['Speed'] ['Current'];
                if (Vehicle ['Km/h'] != 0)
                    Vehicle ['HTA'] = Vehicle ['Km Left'] / Vehicle ['Km/h'];
                break;
            case 'moving':
                Vehicle ['Km/h'] = Vehicle ['Speed'] ['Current'];
                if (Vehicle ['Km/h'] != 0)
                    Vehicle ['HTA'] = Vehicle ['Km Left'] / Vehicle ['Km/h'];
                break;
            default:
                Vehicle ['Km/h'] = Vehicle ['Speed'] ['Current'];
                if (Vehicle ['Km/h'] != 0)
                    Vehicle ['HTA'] = Vehicle ['Km Left'] / Vehicle ['Km/h'];
        }
        if (Vehicle ['HTA'] != 0)
        {
            if (Vehicle ['HTA'] < 1/60)
                Vehicle ['ETA'] = '< 1m';
            else
                Vehicle ['ETA'] = ConvertSecondsToReadableStr (Vehicle ['HTA'] * 60 * 60);
        }
        
        switch (location.pathname)
        {
            case '/ships':
                var AmmoStr = parseInt (Vehicle ['Cannonballs']) + ',' + parseInt (Vehicle ['Chain Shots']) + ',' + parseInt (Vehicle ['Grape Shots']);
                if (AmmoStr == '0,0,0')
                    AmmoStr = '';
                Vehicle ['Ammo'] = AmmoStr;
                break;
                
            case '/vehicles':
                break;
        }
        
        ExistingEventHistoryString = JSON.stringify (Vehicle ['EventHistory']);
        var NewEventHistoryString = '';
        var NewEventHistoryString = localStorage.getItem ('vs'+Vehicle ['ID']) || ExistingEventHistoryString;
        
        if (ExistingEventHistoryString != NewEventHistoryString)
        {
            Vehicle ['EventHistory'] = JSON.parse (NewEventHistoryString);
            Vehicle ['HaveAnyDetailsBeenChangedSinceLastTableRedraw'] = true;
            HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw = true;
        }
    }
}

function DynamicallyUpdateDistanceAndTimeFigures ()

{
    var MSElapsedTime = parseFloat (GetPreferenceValue ('Dynamic updates','Refresh distance and time figures every (this many) seconds')) * 1000;
    for (c = 0; c < VehicleDataArray.length; c++)
    {
        var Vehicle = VehicleDataArray [c];

        if (IsPreferenceEnabled ('Content','Display Km left to this decimal place'))
            var PreviousKmLeftStr = Vehicle ['Km Left'].toFixed (GetPreferenceValue ('Content','Display Km left to this decimal place'));
        else
            var PreviousKmLeftStr = parseInt (Vehicle ['Km Left']);

        var PreviousETAStr =  ConvertSecondsToReadableStr (Vehicle ['HTA'] * 60 * 60);
            
        switch (Vehicle ['Status'])
        {
            case 'stopped':
            case 'damaged':
                if (Vehicle ['Km Left'] != 0 || Vehicle ['HTA'] != 0)
                {
                    Vehicle ['Km Left'] = 0;
                    Vehicle ['HTA'] = 0;
                }
                break;
            case 'departing':
                break;
            case 'engaged':
                break;
            default:
                if (Vehicle ['Km/h'] != 0 && Vehicle ['Km Left'] > 0)
                {
                    var HoursElapsedTime = MSElapsedTime / 3600000;
                    var KmTravelled = HoursElapsedTime * Vehicle ['Km/h'] * TimeWarpFactor;
                    Vehicle ['Km Left'] = Vehicle ['Km Left'] - KmTravelled;
                    if (Vehicle ['Km Left'] <= 0)
                    {
                        Vehicle ['Km Left'] = 0;
                        Vehicle ['Status'] = 'arriving';
                    }
                    
                    Vehicle ['HTA'] = Vehicle ['Km Left'] / Vehicle ['Km/h'];
                }
        }
        if (IsPreferenceEnabled ('Content','Display Km left to this decimal place'))
            var NewKmLeftStr = Vehicle ['Km Left'].toFixed (GetPreferenceValue ('Content','Display Km left to this decimal place'));
        else
            var NewKmLeftStr = parseInt (Vehicle ['Km Left']);

        var NewETAStr =  ConvertSecondsToReadableStr (Vehicle ['HTA'] * 60 * 60);
            
        if (NewKmLeftStr != PreviousKmLeftStr || NewETAStr != PreviousETAStr)
        {
            Vehicle ['HaveAnyDetailsBeenChangedSinceLastTableRedraw'] = true;
            HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw = true;
        }
    }
    if (HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw)
        UpdateEverything ();
}

function RedrawVehicleTable (ForceRedraw)
{
    var CurrentRow;
    var Vehicle;
    
    function SetCellText (ColumnIndex,Value,Color)
    {
        cell (CurrentRow,ColumnIndex).html (Value);
        if (IsPreferenceEnabled ('Content','Hide numbers that equal zero') && Value == 0)
            cell(CurrentRow,ColumnIndex).css('color',GetColorCoding ('none'));
        else
        {
            if (!Color)
                Color = 'NonImportantText';
            SetCellTextColor (ColumnIndex,Color);
        }
    }
    
    function SetCellTextColor (ColumnIndex,ColorCoding)
    {
        cell(CurrentRow,ColumnIndex).css('color',GetColorCoding (ColorCoding));
        cell(CurrentRow,ColumnIndex).find ('a').each (function (){
            $(this).css('color',GetColorCoding (ColorCoding));
        });
    }
    
    function SetCellBackgroundColor (ColumnIndex,ColorCoding)
    {
        cell(CurrentRow,ColumnIndex).css('background',GetColorCoding (ColorCoding));
    }
    
    if (!ForceRedraw && !HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw)
        return;
    
    // before we get started we need to check if any vehicles will pass through the filterarray
    var NumberOfVehiclesThatPassedThroughFilter = 0;
    for (var i = 0; i < VehicleDataArray.length; i++)
    {
        var Vehicle = VehicleDataArray [i];
        var DoesVehiclePassThroughFilters = true;
        if (IsPreferenceEnabled ('Show vehicles with these statuses','Recent events only'))
        {
            var SecondsSinceEvent = Math.ceil((ServerTimeNow.getTime()-ConvertMTDateTimeStrToDateTime (Vehicle ['EventHistory'].LastEventTime).getTime())/1000);
            switch (Vehicle ['EventHistory'].LastEvent)
            {
                case 'started fight':
                    DoesVehiclePassThroughFilters = true;
                    break;
                case 'departed':
                    if (!IsPreferenceEnabled ('General','Class departures as recent events'))
                        DoesVehiclePassThroughFilters = false;
                    else
                        DoesVehiclePassThroughFilters = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class arrivals from the last (this many) minutes as recent events')) * 60);
                    break;
                case 'arrived':
                    DoesVehiclePassThroughFilters = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class arrivals from the last (this many) minutes as recent events')) * 60);
                    break;
                default:
                    DoesVehiclePassThroughFilters = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class events from the last (this many) minutes as recent events')) * 60);
            }
            if (DoesVehiclePassThroughFilters)
                DoesVehiclePassThroughFilters = DoesObjectPassThroughFilterArray (Vehicle,VehicleTableFilterArray);
        }
        else
            DoesVehiclePassThroughFilters = (DoesObjectPassThroughFilterArray (Vehicle,VehicleTableFilterArray) && IsPreferenceEnabled ('Show vehicles with these statuses',Vehicle ['Status']));
        
        if (DoesVehiclePassThroughFilters)
            NumberOfVehiclesThatPassedThroughFilter++;
    }
    if (NumberOfVehiclesThatPassedThroughFilter == VehicleDataArray.length)
    {
        TableStatusTextNode.nodeValue = 'Viewing all ' + NumberOfVehiclesThatPassedThroughFilter + ' ' + CurrentTransportPageVehicleType;
        ResetFilterButton.style.display = 'none';
    }
    else
    {
        var tmpstr = 'Viewing ' + NumberOfVehiclesThatPassedThroughFilter + ' / ' + VehicleDataArray.length + ' ' + CurrentTransportPageVehicleType;
        if (VehicleTableFilterArray.length > 0)
        {
            tmpstr = tmpstr + ' (Filter=' + GetFilterArrayStr (VehicleTableFilterArray) + ')';
            ResetFilterButton.style.display = 'inline';
        }
        else
        {
            ResetFilterButton.style.display = 'none';
        }
        TableStatusTextNode.nodeValue = tmpstr;
    }
    
    for (var i = 0; i < VehicleDataArray.length; i++)
    {
        var Vehicle = VehicleDataArray [i];
        var CurrentRow = VehicleTable.find ('tr:eq(' + (i + 1) + ')');
        
        var DoesVehiclePassThroughFilters = true;
        if (IsPreferenceEnabled ('Show vehicles with these statuses','Recent events only'))
        {
            var SecondsSinceEvent = Math.ceil((ServerTimeNow.getTime()-ConvertMTDateTimeStrToDateTime (Vehicle ['EventHistory'].LastEventTime).getTime())/1000);
            switch (Vehicle ['EventHistory'].LastEvent)
            {
                case 'started fight':
                    DoesVehiclePassThroughFilters = true;
                    break;
                case 'departed':
                    if (!IsPreferenceEnabled ('General','Class departures as recent events'))
                        DoesVehiclePassThroughFilters = false;
                    else
                        DoesVehiclePassThroughFilters = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class arrivals from the last (this many) minutes as recent events')) * 60);
                    break;
                case 'arrived':
                    DoesVehiclePassThroughFilters = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class arrivals from the last (this many) minutes as recent events')) * 60);
                    break;
                default:
                    DoesVehiclePassThroughFilters = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class events from the last (this many) minutes as recent events')) * 60);
            }
            if (DoesVehiclePassThroughFilters)
                DoesVehiclePassThroughFilters = DoesObjectPassThroughFilterArray (Vehicle,VehicleTableFilterArray);
        }
        else
            DoesVehiclePassThroughFilters = (DoesObjectPassThroughFilterArray (Vehicle,VehicleTableFilterArray) && IsPreferenceEnabled ('Show vehicles with these statuses',Vehicle ['Status']));
        
        if (DoesVehiclePassThroughFilters)
            CurrentRow.css ('display','');
        else
            CurrentRow.css ('display','none');
        
        if (!ForceRedraw && !Vehicle ['HaveAnyDetailsBeenChangedSinceLastTableRedraw'])
            continue;

        // convert vehicle name HTML to make name a link to status page

/* taken out for now - need to fix bug involving unranked/unnamed vehicles
        if (Trim (Vehicle ['NameHTML']) != '')
        {
            var tempnode = document.createElement ('div');
            tempnode.innerHTML = Vehicle ['NameHTML'];
            tempnode.removeChild (tempnode.childNodes [1]);
            tempnode.innerHTML = tempnode.innerHTML + '<a href="'+Vehicle ['StatusLink']+'">'+Vehicle ['Name']+'</a>';
            SetCellText (NameCol,tempnode.innerHTML);
            if (IsPreferenceEnabled ('Table style','Remove underlines'))
                cell (CurrentRow,NameCol).find('a').css ('text-decoration','none');
        }
*/
        SetCellText (NameCol,Vehicle ['NameHTML']);
        
        SetCellText (VehicleCol,Vehicle ['VehicleHTML']);
        if (IsPreferenceEnabled ('Table style','Remove underlines'))
            cell (CurrentRow,VehicleCol).find('a').css ('text-decoration','none');
        
        if (IsPreferenceEnabled ('Content','Abbreviate city names'))
        {
            if (Vehicle ['City'].length > 0)
                SetCellText (CityCol,Vehicle ['City'] [0]);
            else
                SetCellText (CityCol,'');
            if (Vehicle ['Dest'].length > 0)
                SetCellText (DestCol,Vehicle ['Dest'] [0]);
            else
                SetCellText (DestCol,'');
        }
        else
        {
            SetCellText (CityCol,Vehicle ['City']);
            SetCellText (DestCol,Vehicle ['Dest']);
        }
        if (IsPreferenceEnabled ('Color coding','Cities'))
        {
            SetCellBackgroundColor (CityCol,Vehicle ['City']);
            SetCellBackgroundColor (DestCol,Vehicle ['Dest']);
        }
        else
        {
            SetCellBackgroundColor (CityCol,'none');
            SetCellBackgroundColor (DestCol,'none');
        }
        if (IsPreferenceEnabled ('Content','Display Km left to this decimal place'))
            SetCellText (KmLeftCol,Vehicle ['Km Left'].toFixed (GetPreferenceValue ('Content','Display Km left to this decimal place')));
        else
            SetCellText (KmLeftCol,parseInt (Vehicle ['Km Left']));
        
        if (IsPreferenceEnabled ('Color coding','Km away from destination') && Vehicle ['Docked'] == false && Vehicle ['Km Left'] <= parseFloat (GetPreferenceValue ('Color coding','Km away from destination')))
            SetCellBackgroundColor (KmLeftCol,'AreWeThereYet');
        else
            SetCellBackgroundColor (KmLeftCol,'none');
        
        SetCellText (CargoCol,Vehicle ['Cargo'] ['Current']);
        if (IsPreferenceEnabled ('Color coding','Cargo') && parseInt (Vehicle ['Cargo'] ['Current']) > 0)
        {
            SetCellTextColor (CargoCol,'ImportantText');
            if (IsPreferenceEnabled ('Color coding','Cargo at risk') && Vehicle ['Status'] == 'engaged')
                SetCellBackgroundColor (CargoCol,'CargoAtRisk');
            else
                SetCellBackgroundColor (CargoCol,'GotCargo');
        }
        else
            SetCellBackgroundColor (CargoCol,'none');
        
        // deals with Status and Send columns at the end, not here
        
        if (DoWeWantToUseLocalStorage)
        {
            var KmhValue = '', KmhBackground = 'none', ETAValue = '', ETABackground = 'none';
            
            switch (Vehicle ['Status'])
            {
                case 'engaged':
                case 'damaged':
                    KmhValue = '-';
                    ETAValue = '-';
                    break;
                case 'stopped':
                    KmhValue = Vehicle ['Km/h'];
                    break;
                case 'departing':
                    KmhValue = Vehicle ['Km/h'];
                    ETAValue = Vehicle ['ETA'];
                    break;
                case 'arriving':
                    KmhValue = Vehicle ['Km/h'];
                    ETAValue = 'now';
                    if (IsPreferenceEnabled ('Color coding','Km away from destination'))
                        ETABackground = 'AreWeThereYet';
                    break;
                default:
                    KmhValue = Vehicle ['Km/h'];
                    if (IsPreferenceEnabled ('Color coding','Reduced speed') && KmhValue < Vehicle ['Speed'] ['Maximum'] && Vehicle ['Status'] != 'sunk')
                        KmhBackground = 'ReducedSpeed';
                    ETAValue = Vehicle ['ETA'];
                    if (IsPreferenceEnabled ('Color coding','Minutes away from destination') && Vehicle ['HTA'] * 60 <= parseFloat (GetPreferenceValue ('Color coding','Minutes away from destination')) && Vehicle ['Status'] != 'sunk')
                        ETABackground = 'AreWeThereYet';
                    break;
            }
            SetCellText (KmhCol,KmhValue);
            SetCellBackgroundColor (KmhCol,KmhBackground);
            if (IsPreferenceEnabled ('Content','Show ETA'))
            {
                SetCellText (ETACol,ETAValue);
                SetCellBackgroundColor (ETACol,ETABackground);
            }
            switch (location.pathname)
            {
                case '/ships':
                    SetCellText (HullCol,Vehicle ['Hull'] ['Current']);
                    if (IsPreferenceEnabled ('Color coding','Damaged hull') && Vehicle ['Hull'] ['Current'] < Vehicle ['Hull'] ['Maximum'])
                    {
                        if (Vehicle ['Hull'] ['Current'] == 0)
                            SetCellBackgroundColor (HullCol,'sunk');
                        else
                            SetCellBackgroundColor (HullCol,'DamagedHull');
                        SetCellTextColor (HullCol,'ImportantText');
                    }
                    else
                        SetCellBackgroundColor (HullCol,'none');
                    
                    SetCellText (CrewCol,Vehicle ['Crew'] ['Current']);
                    if (IsPreferenceEnabled ('Color coding','Lost crew') && Vehicle ['Crew'] ['Current'] < Vehicle ['Crew'] ['Maximum'])
                    {
                        SetCellBackgroundColor (CrewCol,'LostCrew');
                        SetCellTextColor (CrewCol,'ImportantText');
                    }
                    else
                        SetCellBackgroundColor (CrewCol,'none');
                    
                    var tmpCS = parseFloat (Vehicle ['Crew Strength']) - parseInt (Vehicle ['Crew'] ['Current']);
                    SetCellText (CrewStrengthCol,tmpCS);
                    if (IsPreferenceEnabled ('Color coding','Crew strength') && Vehicle ['Docked'] == false && tmpCS > 0)
                        SetCellBackgroundColor (CrewStrengthCol,'GotWeapons');
                    else
                        SetCellBackgroundColor (CrewStrengthCol,'none');
                    
                    SetCellText (CannonsCol,Vehicle ['Cannons'] ['Current']);
                    if (IsPreferenceEnabled ('Color coding','Cannons') && Vehicle ['Docked'] == false && parseInt (Vehicle ['Cannons'] ['Current']) > 0)
                    {
                        SetCellBackgroundColor (CannonsCol,'GotCannons');
                        if (IsPreferenceEnabled ('Color coding','Cannons out of ammo') && Vehicle ['Ammo'] == '')
                            SetCellBackgroundColor (CannonsCol,'OutOfAmmo');
                    }
                    else
                        SetCellBackgroundColor (CannonsCol,'none');
                    
                    SetCellText (AmmoCol,Vehicle ['Ammo']);
                    if (IsPreferenceEnabled ('Color coding','Ammo') && Vehicle ['Docked'] == false && Vehicle ['Ammo'] != '' && parseInt (Vehicle ['Cannons'] ['Current']) > 0)
                        SetCellBackgroundColor (AmmoCol,'GotAmmo');
                    else
                        SetCellBackgroundColor (AmmoCol,'none');
                    
                    break;
                    
                case '/vehicles':
                    SetCellText (AttackCol,Vehicle ['Attack']);
                    SetCellText (ArmorCol,Vehicle ['Armor']);
                    SetCellText (OffenseCol,Vehicle ['Offense']);
                    SetCellText (DefenseCol,Vehicle ['Defense']);
                    SetCellText (DodgeCol,Vehicle ['Dodge']);
                    break;
            }
        }
        var tmpA = cell (CurrentRow,StatusCol).find ('a');
        cell (CurrentRow,StatusCol).find ('a').text (Vehicle ['Status']);
        cell (CurrentRow,StatusCol).find ('a').attr ('href',Vehicle ['StatusLink']);
        if (IsPreferenceEnabled ('Table style','Remove underlines'))
            cell (CurrentRow,StatusCol).find('a').css ('text-decoration','none');

            if (Vehicle ['Status'] == 'stopped')
        {
            SetCellText (SendCol,Vehicle ['SendHTML']);
            if (IsPreferenceEnabled ('Table style','Remove underlines'))
                cell (CurrentRow,SendCol).find('a').css ('text-decoration','none');
        }
        else
            SetCellText (SendCol,'');
        
        if (Vehicle ['EventHistory'].LastEventURL && Vehicle ['EventHistory'].LastEventURL != '')
        {
            cell (CurrentRow,LastEventCol).html ('<a href="'+Vehicle ['EventHistory'].LastEventURL+'">'+Vehicle ['EventHistory'].LastEvent+'</a>');
            if (IsPreferenceEnabled ('Table style','Remove underlines'))
                cell (CurrentRow,LastEventCol).find('a').css ('text-decoration','none');
        }
        else
            SetCellText (LastEventCol,Vehicle ['EventHistory'].LastEvent);
        
        switch (parseInt (GetPreferenceValue ('Content','Event time format')))
        {
            case 1: // time since event
                SetCellText (LastEventTimeCol,Vehicle ['EventHistory'].LastEventTime);
                break;
            case 2: // server time
                var SecondsSinceEvent = Math.ceil((ServerTimeNow.getTime()-ConvertMTDateTimeStrToDateTime (Vehicle ['EventHistory'].LastEventTime).getTime())/1000);
                if (SecondsSinceEvent < 60)
                    var tmpstr = '< 1m';
                else
                    var tmpstr = ConvertSecondsToReadableStr (SecondsSinceEvent);
                if (tmpstr != '')
                    SetCellText (LastEventTimeCol, tmpstr + ' ago');
                else
                    SetCellText (LastEventTimeCol,'');
                break;
            default:
                SetCellText (LastEventTimeCol,Vehicle ['EventHistory'].LastEventTime);
        }
        
        SetCellText (LastEventEnemyCol,Vehicle ['EventHistory'].LastEventEnemy);
        if (IsPreferenceEnabled ('Table style','Remove underlines'))
            cell (CurrentRow,LastEventEnemyCol).find('a').css ('text-decoration','none');
        
        if (IsPreferenceEnabled ('Color coding',"Vehicles' last event"))
        {
            switch (GetTokenizedVersionOf (Vehicle ['EventHistory'].LastEvent))
            {
                case 'departed': case 'arrived':
                    SetCellBackgroundColor (LastEventCol,'none');
                    break;
                case 'started fight':
                    SetCellBackgroundColor (LastEventCol,'StartedFight');
                    SetCellTextColor (LastEventCol,'ImportantText');
                    break;
                case 'won':
                    SetCellBackgroundColor (LastEventCol,'WonFight');
                    break;
                case 'lost':
                    SetCellBackgroundColor (LastEventCol,'LostFight');
                    break;
                case 'fended':
                    SetCellBackgroundColor (LastEventCol,'Fended');
                    break;
                case 'escaped':
                    SetCellBackgroundColor (LastEventCol,'Escaped');
                    break;
                case 'was eluded':
                    SetCellBackgroundColor (LastEventCol,'EludedByEnemy');
                    break;
                case 'was disabled':
                    SetCellBackgroundColor (LastEventCol,'WasDisabled');
                    break;
                case 'sank em':
                    SetCellBackgroundColor (LastEventCol,'SankEnemy');
                    break;
                case 'fished':
                    SetCellBackgroundColor (LastEventCol,'Fished');
                    break;
                case 'was sunk':
                    SetCellBackgroundColor (LastEventCol,'WasSunk');
                    break;
                default:
                    SetCellBackgroundColor (LastEventCol,'none');
            }
        }
        else
            SetCellBackgroundColor (LastEventCol,'none');
        
        var DoesVehiclePassThroughFilters = true;
        if (IsPreferenceEnabled ('Color coding','Recent events'))
        {
            var SecondsSinceEvent = Math.ceil((ServerTimeNow.getTime()-ConvertMTDateTimeStrToDateTime (Vehicle ['EventHistory'].LastEventTime).getTime())/1000);
            switch (Vehicle ['EventHistory'].LastEvent)
            {
                case 'started fight':
                    DoesVehiclePassThroughFilters = true;
                    break;
                case 'departed':
                    if (!IsPreferenceEnabled ('General','Class departures as recent events'))
                        DoesVehiclePassThroughFilters = false;
                    else
                        DoesVehiclePassThroughFilters = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class arrivals from the last (this many) minutes as recent events')) * 60);
                    break;
                case 'arrived':
                    DoesVehiclePassThroughFilters = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class arrivals from the last (this many) minutes as recent events')) * 60);
                    break;
                default:
                    DoesVehiclePassThroughFilters = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class events from the last (this many) minutes as recent events')) * 60);
            }
        }
        else
            DoesVehiclePassThroughFilters = false;
        
        if (DoesVehiclePassThroughFilters)
        {
            SetCellBackgroundColor (LastEventTimeCol,'RecentEvent');
            if (Vehicle ['EventHistory'].LastEvent != 'departed' && Vehicle ['EventHistory'].LastEvent != 'arrived')
            {
                SetCellTextColor (NameCol,'ImportantText');
                SetCellTextColor (VehicleCol,'ImportantText');
                SetCellTextColor (LastEventCol,'ImportantText');
                SetCellTextColor (LastEventTimeCol,'ImportantText');
                SetCellTextColor (LastEventEnemyCol,'ImportantText');
            }
        }
        else
            SetCellBackgroundColor (LastEventTimeCol,'none');
        
        SetCellText (TotalFightsCol,Vehicle ['EventHistory'].TotalFights);
        SetCellText (FightsWonCol,Vehicle ['EventHistory'].FightsWon);
        SetCellText (FightsLostCol,Vehicle ['EventHistory'].FightsLost);
        SetCellText (TimesFendedCol,Vehicle ['EventHistory'].TimesFended);
        SetCellText (TimesSankEnemyCol,Vehicle ['EventHistory'].TimesSankEnemy);
        SetCellText (TimesEscapedFromEnemyCol,Vehicle ['EventHistory'].TimesEscapedFromEnemy);
        SetCellText (TimesEludedByEnemyCol,Vehicle ['EventHistory'].TimesEludedByEnemy);
        SetCellText (TimesWasDisabledCol,Vehicle ['EventHistory'].TimesWasDisabled);
        SetCellText (TimesFishedCol,Vehicle ['EventHistory'].TimesFished);
        SetCellBackgroundColor (FightsWonCol,'none');
        SetCellBackgroundColor (FightsLostCol,'none');
        SetCellBackgroundColor (TimesFendedCol,'none');
        SetCellBackgroundColor (TimesSankEnemyCol,'none');
        SetCellBackgroundColor (TimesEscapedFromEnemyCol,'none');
        SetCellBackgroundColor (TimesEludedByEnemyCol,'none');
        SetCellBackgroundColor (TimesWasDisabledCol,'none');
        SetCellBackgroundColor (TimesFishedCol,'none');
        if (IsPreferenceEnabled ('Color coding',"Vehicles' trip stats"))
        {
            if (Vehicle ['EventHistory'].FightsWon > 0)
                SetCellBackgroundColor (FightsWonCol,'WonFight');
            if (Vehicle ['EventHistory'].FightsLost > 0)
                SetCellBackgroundColor (FightsLostCol,'LostFight');
            if (Vehicle ['EventHistory'].TimesFended > 0)
                SetCellBackgroundColor (TimesFendedCol,'Fended');
            if (Vehicle ['EventHistory'].TimesSankEnemy > 0)
                SetCellBackgroundColor (TimesSankEnemyCol,'SankEnemy');
            if (Vehicle ['EventHistory'].TimesEscapedFromEnemy > 0)
                SetCellBackgroundColor (TimesEscapedFromEnemyCol,'Escaped');
            if (Vehicle ['EventHistory'].TimesEludedByEnemy > 0)
                SetCellBackgroundColor (TimesEludedByEnemyCol,'EludedByEnemy');
            if (Vehicle ['EventHistory'].TimesWasDisabled > 0)
                SetCellBackgroundColor (TimesWasDisabledCol,'WasDisabled');
            if (Vehicle ['EventHistory'].TimesFished > 0)
                SetCellBackgroundColor (TimesFishedCol,'Fished');
        }
        
        var NewTripHistoryHTML = '';
        var CurrentChar = '#27';
        
        if (IsPreferenceEnabled ('Content','Condense vehicle history (WWWWWWeeee becomes 6W 4e)'))
        {
            var LastCharFound = '#27';
            var CharRepeatCount = 0;
            
            for (var c = 0; c < Vehicle ['EventHistory'].EventHistoryString.length + 1; c++)
            {
                var NewBackgroundColor = 'none';
                
                if (c < Vehicle ['EventHistory'].EventHistoryString.length)
                    CurrentChar = Vehicle ['EventHistory'].EventHistoryString.charAt (c);
                else
                    CurrentChar = '#27';
                if (CurrentChar != LastCharFound)
                {
                    if (CharRepeatCount > 0)
                    {
                        switch (LastCharFound)
                        {
                            case 'W':
                                NewBackgroundColor = 'WonFight';
                                break;
                            case 'L':
                                NewBackgroundColor = 'LostFight';
                                break;
                            case 'F':
                                NewBackgroundColor = 'Fended';
                                break;
                            case 'S':
                                NewBackgroundColor = 'SankEnemy';
                                break;
                            case 'e':
                                NewBackgroundColor = 'Escaped';
                                break;
                            case 'm':
                                NewBackgroundColor = 'EludedByEnemy';
                                break;
                            case 'd':
                                NewBackgroundColor = 'WasDisabled';
                                break;
                            case 'J':
                                NewBackgroundColor = 'Fished';
                                break;
                        }
                        var SectionStr = '';
                        if (CharRepeatCount >= 3)
                        {
                            SectionStr = CharRepeatCount.toString () + LastCharFound;
                        }
                        else
                        {
                            for (ssc = 1; ssc <= CharRepeatCount; ssc ++)
                            {
                                SectionStr += LastCharFound;
                            }
                        }
                        NewTripHistoryHTML += '<span style="background:'+GetColorCoding (NewBackgroundColor)+'">'+' '+SectionStr+' '+'</span>';
                    }
                    LastCharFound = CurrentChar;
                    CharRepeatCount = 1;
                }
                else
                    CharRepeatCount++;
            }
        }
        else
        {
            for (var c = 0; c < Vehicle ['EventHistory'].EventHistoryString.length; c++)
            {
                var NewBackgroundColor = 'none';
                
                CurrentChar = Vehicle ['EventHistory'].EventHistoryString.charAt (c);
                switch (CurrentChar)
                {
                    case 'W':
                        NewBackgroundColor = 'WonFight';
                        break;
                    case 'L':
                        NewBackgroundColor = 'LostFight';
                        break;
                    case 'F':
                        NewBackgroundColor = 'Fended';
                        break;
                    case 'S':
                        NewBackgroundColor = 'SankEnemy';
                        break;
                    case 'e':
                        NewBackgroundColor = 'Escaped';
                        break;
                    case 'm':
                        NewBackgroundColor = 'EludedByEnemy';
                        break;
                    case 'd':
                        NewBackgroundColor = 'WasDisabled';
                        break;
                    case 'J':
                        NewBackgroundColor = 'Fished';
                        break;
                }
                NewTripHistoryHTML += '<span style="background:'+GetColorCoding (NewBackgroundColor)+'">'+CurrentChar+'</span>';
            }
        }
        cell (CurrentRow,EventHistoryStringCol).html (NewTripHistoryHTML);
        
        if (IsPreferenceEnabled ('Color coding','Vehicle statuses'))
        {
            SetCellBackgroundColor (StatusCol,Vehicle ['Status']);
            if (IsPreferenceEnabled ('Color coding','Apply vehicle status color coding to vehicle names'))
            {
                SetCellBackgroundColor (NameCol,Vehicle ['Status']);
            }
            
            if (Vehicle ['Status'] == 'engaged')
            {
                SetCellTextColor (StatusCol,'ImportantText');
                SetCellTextColor (NameCol,'ImportantText');
                SetCellTextColor (VehicleCol,'ImportantText');
                switch (location.pathname)
                {
                    case '/ships':
                        SetCellTextColor (HullCol,'ImportantText');
                        SetCellTextColor (CrewCol,'ImportantText');
                        if (Vehicle ['Crew Strength'] > 0) SetCellTextColor (CrewStrengthCol,'ImportantText');
                        if (parseInt (Vehicle ['Cannons'] ['Current']) > 0) SetCellTextColor (CannonsCol,'ImportantText');
                        SetCellTextColor (AmmoCol,'ImportantText');
                        break;
                    case '/vehicles':
                        if (Vehicle ['Armor'] > 0) SetCellTextColor (ArmorCol,'ImportantText');
                        if (Vehicle ['Attack'] > 0) SetCellTextColor (AttackCol,'ImportantText');
                        if (Vehicle ['Offense'] > 0) SetCellTextColor (OffenseCol,'ImportantText');
                        if (Vehicle ['Defense'] > 0) SetCellTextColor (DefenseCol,'ImportantText');
                        if (Vehicle ['Dodge'] > 0) SetCellTextColor (DodgeCol,'ImportantText');
                        break;
                }
                SetCellTextColor (LastEventCol,'ImportantText');
                SetCellTextColor (LastEventTimeCol,'ImportantText');
                SetCellTextColor (LastEventEnemyCol,'ImportantText');
            }
        }
        else
        {
            SetCellBackgroundColor (StatusCol,'none');
            SetCellBackgroundColor (NameCol,'none');
        }
    }
    
    for (var i = 0; i < VehicleDataArray.length; i++)
    {
        Vehicle = VehicleDataArray [i];
        Vehicle ['HaveAnyDetailsBeenChangedSinceLastTableRedraw'] = false;
    }
    HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw = false;
}

function ConvertAllLinksToOpenInNewTabs (InThisDiv)
{
    if (IsPreferenceEnabled ('General','Open clicked links in new tabs'))
    {
        $(InThisDiv).find ('a').each (function () {
            $(this).click (function (e) {e.preventDefault(); var tmpURL = $(this).attr ('href'); window.open (tmpURL,'_blank'); return false;});
        });
    }
}

function AlterVehicleTableLayout()
{
    VehicleTable.find ('tr:eq(0)').children().eq(GetColumnIndex(VehicleTable,'En Route To')).html('Dest');
    
    if (IsPreferenceEnabled ('Layout','Swap status and send columns'))
        SwitchColumns (VehicleTable,6,7);
    
    switch (location.pathname)
    {
        case '/ships':
            VehicleTable.find ('tr:eq(0)').children().eq(GetColumnIndex(VehicleTable,'Ship')).html('Vehicle');
    }
    
    if (DoWeWantToUseLocalStorage)
    {
        InsertColumnAAfterColumnB (VehicleTable,'Km/h','Dest');
        if (IsPreferenceEnabled ('Content','Show ETA'))
            InsertColumnAAfterColumnB (VehicleTable,'ETA','Km Left');
        switch (location.pathname)
        {
            case '/ships':
                InsertColumnAAfterColumnB (VehicleTable,'Hull','Cargo');
                InsertColumnAAfterColumnB (VehicleTable,'Crew','Hull');
                InsertColumnAAfterColumnB (VehicleTable,'CS','Crew');
                InsertColumnAAfterColumnB (VehicleTable,'Can','CS');
                InsertColumnAAfterColumnB (VehicleTable,'Ammo','Can');
                break;
            case '/vehicles':
                InsertColumnAAfterColumnB (VehicleTable,'Att','Cargo');
                InsertColumnAAfterColumnB (VehicleTable,'Arm','Att');
                InsertColumnAAfterColumnB (VehicleTable,'Off','Arm');
                InsertColumnAAfterColumnB (VehicleTable,'Def','Off');
                InsertColumnAAfterColumnB (VehicleTable,'Ddg','Def');
                break;
        }
        
        InsertColumnABeforeColumnB (VehicleTable,'Last event','Send');
        InsertColumnABeforeColumnB (VehicleTable,'Event time','Send');
        InsertColumnABeforeColumnB (VehicleTable,'Enemy','Send');
        InsertColumnABeforeColumnB (VehicleTable,'TF','Send');
        InsertColumnABeforeColumnB (VehicleTable,'W','Send');
        InsertColumnABeforeColumnB (VehicleTable,'L','Send');
        InsertColumnABeforeColumnB (VehicleTable,'F','Send');
        InsertColumnABeforeColumnB (VehicleTable,'S','Send');
        InsertColumnABeforeColumnB (VehicleTable,'d','Send');
        InsertColumnABeforeColumnB (VehicleTable,'e','Send');
        InsertColumnABeforeColumnB (VehicleTable,'m','Send');
        InsertColumnABeforeColumnB (VehicleTable,'J','Send');
        InsertColumnABeforeColumnB (VehicleTable,'Trip history','Send');
        
        LastEventCol = GetColumnIndex (VehicleTable,'Last event');
        LastEventTimeCol = GetColumnIndex (VehicleTable,'Event time');
        LastEventEnemyCol = GetColumnIndex (VehicleTable,'Enemy');
        TotalFightsCol = GetColumnIndex (VehicleTable,'TF');
        FightsWonCol = GetColumnIndex (VehicleTable,'W');
        FightsLostCol = GetColumnIndex (VehicleTable,'L');
        TimesFendedCol = GetColumnIndex (VehicleTable,'F');
        TimesSankEnemyCol = GetColumnIndex (VehicleTable,'S');
        TimesWasDisabledCol = GetColumnIndex (VehicleTable,'d');
        TimesEscapedFromEnemyCol = GetColumnIndex (VehicleTable,'e');
        TimesEludedByEnemyCol = GetColumnIndex (VehicleTable,'m');
        TimesFishedCol = GetColumnIndex (VehicleTable,'J');
        EventHistoryStringCol = GetColumnIndex (VehicleTable,'Trip history');
    }
    
    NameCol = GetColumnIndex (VehicleTable,'Name');
    VehicleCol = GetColumnIndex (VehicleTable,'Vehicle');
    CityCol = GetColumnIndex (VehicleTable,'City');
    DestCol = GetColumnIndex (VehicleTable,'Dest');
    KmLeftCol = GetColumnIndex (VehicleTable,'Km Left');
    CargoCol = GetColumnIndex (VehicleTable,'Cargo');
    StatusCol = GetColumnIndex (VehicleTable,'Status');
    SendCol = GetColumnIndex (VehicleTable,'Send');
    
    if (DoWeWantToUseLocalStorage)
    {
        KmhCol = GetColumnIndex (VehicleTable,'Km/h');
        if (IsPreferenceEnabled ('Content','Show ETA'))
            ETACol = GetColumnIndex (VehicleTable,'ETA');
        
        switch (location.pathname)
        {
            case '/ships':
                HullCol = GetColumnIndex (VehicleTable,'Hull');
                CrewCol = GetColumnIndex (VehicleTable,'Crew');
                CrewStrengthCol = GetColumnIndex (VehicleTable,'CS');
                CannonsCol = GetColumnIndex (VehicleTable,'Can');
                AmmoCol = GetColumnIndex (VehicleTable,'Ammo');
                break;
            case '/vehicles':
                AttackCol = GetColumnIndex (VehicleTable,'Att');
                ArmorCol = GetColumnIndex (VehicleTable,'Arm');
                OffenseCol = GetColumnIndex (VehicleTable,'Off');
                DefenseCol = GetColumnIndex (VehicleTable,'Def');
                DodgeCol = GetColumnIndex (VehicleTable,'Ddg');
                break;
        }
    }
    
    ApplyStandardFormattingToTable (VehicleTable);
    
    VehicleTable.find ('td,th').each (function(){
        // for all columns AFTER Name & Vehicle, apply preferred alignment. Names & Vehicles are always left-aligned
        // also, force maximum width of name column if desired
        switch ($(this) [0].cellIndex)
        {
            case NameCol: 
                $(this).css ('text-align','left');
                if (IsPreferenceEnabled ('Layout','Limit name column to this width'))
                {
                    $(this).css ('max-width',GetPreferenceValue ('Layout','Limit name column to this width') + 'px');
                    $(this).css ('overflow','hidden');
                }
                break;
            case VehicleCol: case LastEventTimeCol: case LastEventEnemyCol: case EventHistoryStringCol:
                $(this).css ('text-align','left');
                break;
            case CityCol: case DestCol: case StatusCol: case SendCol:
                $(this).css ('text-align',GetPreferenceValue ('Layout','Align text like this'));
                break;
            default:
                $(this).css ('text-align',GetPreferenceValue ('Layout','Align numbers like this'));
                break;
        }
    });
}

function SortVehicleDataArray ()
{
    if (!IsPreferenceEnabled ('Sorting & table breaking','Sort vehicles in this order'))
        return;
    
    if (!HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw)
    {
        DidTheOrderOfAnyVehiclesGetChangedDuringLastSort = false;
        return;
    }
    
    // Set up array of custom sort orders to send to Sort function
    
    var CustomSortOrdersArray = new Array ();
    if (IsPreferenceEnabled ('Sorting & table breaking','Sort cities in this order'))
    {
        CustomSortOrdersArray.push (new CustomSortOrderObject ('City',GetPreferenceValue ('Sorting & table breaking','Sort cities in this order')));
        CustomSortOrdersArray.push (new CustomSortOrderObject ('Dest',GetPreferenceValue ('Sorting & table breaking','Sort cities in this order')));
    }
    if (IsPreferenceEnabled ('Sorting & table breaking','Put damaged vehicles at bottom of table'))
        VehicleTableSortOrderArray = ('-Damaged,' + GetPreferenceValue ('Sorting & table breaking','Sort vehicles in this order')).split (',');
    else
        VehicleTableSortOrderArray = GetPreferenceValue ('Sorting & table breaking','Sort vehicles in this order').split (',');
    // substitute Column Names specified by user with vehicle property names used by sort
    for (var c = 0; c < VehicleTableSortOrderArray.length; c ++)
    {
        var tmpSortField = VehicleTableSortOrderArray [c].toLowerCase ();
        var tmpSortDirection = '';
        
        if (tmpSortField [0] == '-')
        {
            tmpSortDirection = tmpSortField [0];
            tmpSortField = tmpSortField.substr (1);
        }
        var NewSortField = tmpSortField;
        switch (tmpSortField)
        {
            case 'speed':
                NewSortField = 'Km/h';
                break;
            case 'eta':
                NewSortField = 'HTA';
                break;
            case 'cs':
                NewSortField = 'Crew Strength';
                break;
            case 'can':
                NewSortField = 'Cannons';
                break;
            case 'arm':
                NewSortField = 'Armor';
                break;
            case 'att':
                NewSortField = 'Attack';
                break;
            case 'off':
                NewSortField = 'Offense';
                break;
            case 'def':
                NewSortField = 'Defense';
                break;
            case 'ddg':
                NewSortField = 'Dodge';
                break;
        }
        if (NewSortField != tmpSortField)
            VehicleTableSortOrderArray [c] = tmpSortDirection + NewSortField;
    }
    // make sure vehicle table is sorted by name after everything (if anything) else to preserve original order if rows are otherwise equal in terms of sortable properties
    if (VehicleTableSortOrderArray.indexOf ('Name') == -1)
        VehicleTableSortOrderArray.push ('Name');
    // ffs .. now tag on vehicle ID to ensure unique sort keys because the stupid sort function sorts equal keys randomly
    VehicleTableSortOrderArray.push ('ID');
    
    DidTheOrderOfAnyVehiclesGetChangedDuringLastSort = false;
    var PreSortVehicleDataArray = VehicleDataArray.slice (0);
    
    VehicleDataArray.sort (SortByThePropertiesInThisArray (VehicleTableSortOrderArray,CustomSortOrdersArray));
    
    DidTheOrderOfAnyVehiclesGetChangedDuringLastSort = !AreArraysEqual (PreSortVehicleDataArray,VehicleDataArray);
    if (DidTheOrderOfAnyVehiclesGetChangedDuringLastSort)
    {
        HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw = true;
        RedrawVehicleTable (true);
    }
}

function BreakSortedTableIntoFleets()
{
    if (!IsPreferenceEnabled ('Sorting & table breaking','Break table up into different fleets'))
        return;

    var VisibleRows = VehicleTable.find ('tr:visible:gt(0)');
    RowsToProcess = VisibleRows.slice (0,VisibleRows.length - 1);
    RowsToProcess.each (function() {
        var ThisRow = $(this);
        var NextRow = ThisRow.next();
        var ThisVehicle = GetVehicleObjectForThisRow (ThisRow);
        var NextVehicle = GetVehicleObjectForThisRow (NextRow);
        
        var NewBorderStyle = 'thin solid silver';
        
        if (VehicleTableSortOrderArray.indexOf ('City') != -1 || VehicleTableSortOrderArray.indexOf ('-City') != -1)
        {
            if (ThisVehicle ['City'] != NextVehicle ['City'])
                NewBorderStyle = '2px solid black';
        }
        if (VehicleTableSortOrderArray.indexOf ('Dest') != -1 || VehicleTableSortOrderArray.indexOf ('-Dest') != -1)
        {
            if (ThisVehicle ['Dest'] != NextVehicle ['Dest'])
                NewBorderStyle = '2px solid black';
        }
        
        if ((VehicleTableSortOrderArray.indexOf ('City') != -1 || VehicleTableSortOrderArray.indexOf ('-City') != -1) && (VehicleTableSortOrderArray.indexOf ('Dest') != -1 || VehicleTableSortOrderArray.indexOf ('-Dest') != -1))
        {
            if (ThisVehicle ['City'] == NextVehicle ['City'] && ThisVehicle ['Dest'] == NextVehicle ['Dest'])
            {
                if (IsPreferenceEnabled ('Sorting & table breaking','Treat vehicles this many Km apart as different fleets'))
                    if (Math.abs (parseFloat (ThisVehicle ['Km Left']) - parseFloat (NextVehicle ['Km Left'])) > parseFloat (GetPreferenceValue ('Sorting & table breaking','Treat vehicles this many Km apart as different fleets')))
                        NewBorderStyle = '2px solid black';
                    }
        }
        if (VehicleTableSortOrderArray.indexOf ('Class') != -1 || VehicleTableSortOrderArray.indexOf ('-Class') != -1)
        {
            if (ThisVehicle ['Class'] != NextVehicle ['Class'])
                NewBorderStyle = '3px solid black';
        }
        ThisRow.css ('border-bottom',NewBorderStyle);
    });
}

function CompileStats()
{
    var TotalVehiclesMoving = 0;
    var TotalVehiclesEngaged = 0;
    var TotalCargo = 0;
    var TotalRecentEvents = 0;
    
    for (var i = 0; i < VehicleDataArray.length; i++)
    {
        var Vehicle = VehicleDataArray [i];
        
        switch (Vehicle ['Status'])
        {
            case 'moving':
                TotalVehiclesMoving += 1;
                break;
            case 'engaged':
                TotalVehiclesMoving += 1;
                TotalVehiclesEngaged += 1;
                break;
        }
        TotalCargo += parseInt (Vehicle ['Cargo'] ['Current']);
        
        var SecondsSinceEvent = Math.ceil((ServerTimeNow.getTime()-ConvertMTDateTimeStrToDateTime (Vehicle ['EventHistory'].LastEventTime).getTime())/1000);
        var DoesVehicleHaveRecentEvent = false;
        switch (Vehicle ['EventHistory'].LastEvent)
        {
            case 'started fight':
                DoesVehicleHaveRecentEvent = true;
                break;
            case 'departed':
                if (!IsPreferenceEnabled ('General','Class departures as recent events'))
                    DoesVehicleHaveRecentEvent = false;
                else
                    DoesVehicleHaveRecentEvent = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class arrivals from the last (this many) minutes as recent events')) * 60);
                break;
            case 'arrived':
                DoesVehicleHaveRecentEvent = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class arrivals from the last (this many) minutes as recent events')) * 60);
                break;
            default:
                DoesVehicleHaveRecentEvent = (SecondsSinceEvent <= parseInt (GetPreferenceValue ('General','Class events from the last (this many) minutes as recent events')) * 60);
        }
        if (DoesVehicleHaveRecentEvent)
            TotalRecentEvents ++;
    }
    
    if (IsPreferenceEnabled ('General','Show stats in page title'))
    {
        var NewTitle = OriginalDocumentTitle;
        var StatsStr = '';
        
        if (TotalVehiclesMoving > 0)
            StatsStr += 'm:' + TotalVehiclesMoving;
        if (TotalVehiclesEngaged > 0)
            StatsStr += ' e:' + TotalVehiclesEngaged;
        if (TotalRecentEvents > 0)
            StatsStr += ' r:' + TotalRecentEvents;
        if (TotalCargo > 0)
            StatsStr += ' c:' + TotalCargo;
        
        if (StatsStr != '')
          NewTitle += ' [' + StatsStr + ']';
        document.title = NewTitle;
    }
}

function ResizeDocumentToAccomodateVehicleTable()
{
    var ExistingEffectiveDocumentWidth = $('#wrapper').width();
    
    // desired width would usually just be table.left + table.width, but we need to take marginLeft into consideration because the space saver script changes marginLeft to shove the whole document left-wards
    var DesiredEffectiveDocumentWidth = (VehicleTableOffset.left + VehicleTable.width()) - parseFloat ($('#wrapper').css ('marginLeft'));
    
    // now make sure the desired width can never be smaller than the page's original width
    if (DesiredEffectiveDocumentWidth < OriginalDocumentWidth)
        DesiredEffectiveDocumentWidth = OriginalDocumentWidth;
    
    if (DesiredEffectiveDocumentWidth != ExistingEffectiveDocumentWidth)
        $('#wrapper').width (DesiredEffectiveDocumentWidth);
    
    // refresh window's scrollbars to reflect new document width - it turns out the browser doesn't bother and we need to do it manually
    document.body.style.overflowX = 'auto';
    document.body.style.overflowY = 'auto';
}

function ProcessInitialLocalStorageInformation ()
{
    if (!DoWeWantToUseLocalStorage)
        return;
    
    localStorage.setItem ('LastTransportPageVehicleType',CurrentTransportPageVehicleType);
    
    var tmpStr = localStorage ['NewCitiesArray'] || '';
    if (tmpStr != '')
        NewCitiesArray = tmpStr.split (',');
    
    DisplayModeListBox.selectedIndex = localStorage.getItem (CurrentTransportPageVehicleType + '.DisplayMode') || 0;
}

function AutoRefreshTransportPage ()
{
    if (IsPreferencesDivVisible)
        return;
    
    SetPreferenceValue ('Click counters','Refresh transport page',parseInt (GetPreferenceValue ('Click counters','Refresh transport page')) + 1);
    SavePreferences ();

    location.reload ();
}

function LoadFilterArrayFromLocalStorage ()
{
    if (!DoWeWantToUseLocalStorage)
        return;
    
    VehicleTableFilterArray.length = 0;
    
    var LSKey = CurrentTransportPageVehicleType + '.Filter';
    var LSValue = localStorage.getItem (LSKey) || '';
    
    if (LSValue == '')
        return;
    
    var tmpArray = LSValue.split (';');
    for (var c = 0; c < tmpArray.length; c ++)
    {
        ToggleVehicleTableFilter (Trim (tmpArray [c].split (':') [0]),Trim (tmpArray [c].split (':') [1]));
    }
}

function GetFilterArrayStr (FilterArray)
{
    var result = '';
    
    for (var cFilter = 0; cFilter < FilterArray.length; cFilter++)
    {
        var Filter = FilterArray [cFilter];
        var tmpstr = Filter ['Property'] + ':' + Filter ['Value'];
        if (cFilter > 0)
            result = result + '; ';
        result = result + tmpstr;
    }
    return result;
}

function SaveFilterArrayToLocalStorage ()
{
    if (!DoWeWantToUseLocalStorage)
        return;
    
    var LSKey = CurrentTransportPageVehicleType + '.Filter';
    var LSValue = GetFilterArrayStr (VehicleTableFilterArray);
    
    localStorage.setItem (LSKey,LSValue);
}

function UpdateEverything ()
{
    SortVehicleDataArray ();
    RedrawVehicleTable ();
    BreakSortedTableIntoFleets ();
    CompileStats ();
    ResizeDocumentToAccomodateVehicleTable ();
    SaveFilterArrayToLocalStorage ();
}

function CheckForVehiclesStillEngaged ()
{
    for (var i = 0; i < VehicleDataArray.length; i++)
    {
        var Vehicle = VehicleDataArray [i];
        
        if (Vehicle ['Status'] == 'engaged' && !Vehicle ['HasStillEngagedCheckBeenPerformed'])
        {
            var SecondsSinceEvent = Math.ceil((ServerTimeNow.getTime()-ConvertMTDateTimeStrToDateTime (Vehicle ['EventHistory'].LastEventTime).getTime())/1000);
            
            if (SecondsSinceEvent >= CheckIfStillEngagedIfEngagementTimeInMinutesLongerThan * 60)
            {
                Vehicle ['HasStillEngagedCheckBeenPerformed'] = true;
                console.log ('Engagement time longer than ' + CheckIfStillEngagedIfEngagementTimeInMinutesLongerThan + ' minutes - checking status page for status update');
                localStorage.removeItem ('v'+Vehicle ['ID']);
            }
        }
    }
}

function DynamicallyUpdateExtraVehicleDetails ()
{
    CheckForVehiclesStillEngaged ();
    PropagateVehicleDataArrayFromLocalStorage ();
    if (HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw)
        UpdateEverything ();
}

function ToggleVehicleTableFilter (Property,FilterValue)
{
    var Filter = FindObjectInArray (VehicleTableFilterArray,'Property',Property);
    if (Filter)
    {
        // if we're already filtering this property with this FilterValue, assume we just want to stop filtering on this property
        if (Filter ['Value'] == FilterValue)
        {
            var i = VehicleTableFilterArray.indexOf (Filter);
            VehicleTableFilterArray.splice (i,1);
        }
        else
        {
            Filter ['Value'] = FilterValue;
        }
    }
    else
    {
        Filter = new FilterObject ();
        Filter ['Property'] = Property;
        Filter ['Value'] = FilterValue;
        
        VehicleTableFilterArray.push (Filter);
    }
    SaveFilterArrayToLocalStorage ();
}

function HandleVehicleTableClickEvent (e)

{
    var TD = $(e.target);
    var Vehicle = GetVehicleObjectForThisRow (TD.closest ('tr'));
    
    switch (TD.closest ('tr').children ().index (TD))
    {
        case GetColumnIndex (VehicleTable,'Vehicle'):
            ToggleVehicleTableFilter ('Class',Vehicle ['Class']);
            break;
        case GetColumnIndex (VehicleTable,'City'):
            ToggleVehicleTableFilter ('City',Vehicle ['City']);
            break;
        case GetColumnIndex (VehicleTable,'Dest'):
            ToggleVehicleTableFilter ('Dest',Vehicle ['Dest']);
            break;
        case LastEventTimeCol:
            var CurrentEventTimeFormat = parseInt (GetPreferenceValue ('Content','Event time format'));
            CurrentEventTimeFormat ++;
            if (CurrentEventTimeFormat > 2)
                CurrentEventTimeFormat = 1;
            SetPreferenceValue ('Content','Event time format',CurrentEventTimeFormat);
            SavePreferences ();
            RedrawVehicleTable (true);
            break;
    }
    HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw = true;    
}

function BuildAndShowPreferencesDiv ()
{
    // need to remember last radar filter so we can refresh radar on page refresh if user changed it in preferences
    localStorage.setItem (CurrentTransportPageVehicleType + '.LastRadarClassFilterEnabled',IsPreferenceEnabled ('Radar','Only process & display radar for these classes'));
    localStorage.setItem (CurrentTransportPageVehicleType + '.LastRadarClassFilter',GetPreferenceValue ('Radar','Only process & display radar for these classes'));
    
    PreferencesButton.style.display = 'none';
    
    BuildPreferencesDiv ();
    ControlPanelDiv.appendChild (PreferencesDiv);
    IsPreferencesDivVisible = true;
}

function ResetFilter ()
{
    ResetFilterButton.style.display = 'none';
    VehicleTableFilterArray.length = 0;
    SaveFilterArrayToLocalStorage ();
    HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw = true;
    UpdateEverything ();
}

function ToggleShowRadarData ()
{
    GetPreference ('Radar','Show radar data').OverrideEnabled = ShowRadarDataCB.checked;
    SavePreferences ();
    
    if (ShowRadarDataCB.checked)
        RadarDataDiv.style.display = 'inline-block';
    else
        RadarDataDiv.style.display = 'none';
}

function ToggleShowGadgets ()
{
    GetPreference ('Gadgets','Show gadgets').OverrideEnabled = ShowGadgetsCB.checked;
    SavePreferences ();
    
    if (ShowGadgetsCB.checked)
        GadgetsDiv.style.display = 'inline-block';
    else
        GadgetsDiv.style.display = 'none';
}

function ToggleShowRouteDetails ()
{
    GetPreference ('Content','Show route details').OverrideEnabled = ShowRouteDetailsCB.checked;
    SavePreferences ();
    UpdateVisibleTableColumns ();
    RedrawVehicleTable (true);
}

function ToggleShowVehicleDetails ()
{
    GetPreference ('Content','Show extra vehicle details').OverrideEnabled = ShowVehicleDetailsCB.checked;
    SavePreferences ();
    UpdateVisibleTableColumns ();
    RedrawVehicleTable (true);
}

function ToggleShowTripStats ()
{
    GetPreference ('Content',"Show vehicles' trip stats").OverrideEnabled = ShowTripStatsCB.checked;
    SavePreferences ();
    UpdateVisibleTableColumns ();
    RedrawVehicleTable (true);
}

function ToggleShowLastEvent ()
{
    GetPreference ('Content',"Show vehicles' last event").OverrideEnabled = ShowLastEventCB.checked;
    SavePreferences ();
    UpdateVisibleTableColumns ();
    RedrawVehicleTable (true);
}

function ToggleShowTripHistory ()
{
    GetPreference ('Content',"Show vehicles' trip history").OverrideEnabled = ShowTripHistoryCB.checked;
    SavePreferences ();
    UpdateVisibleTableColumns ();
    RedrawVehicleTable (true);
}

function UpdateVisibleTableColumns ()
{
    SetColumnIndexVisible (VehicleTable,CityCol,IsPreferenceEnabled ('Content','Show route details'));
    SetColumnIndexVisible (VehicleTable,DestCol,IsPreferenceEnabled ('Content','Show route details'));
    SetColumnIndexVisible (VehicleTable,KmhCol,IsPreferenceEnabled ('Content','Show route details'));
    SetColumnIndexVisible (VehicleTable,KmLeftCol,IsPreferenceEnabled ('Content','Show route details'));
    SetColumnIndexVisible (VehicleTable,ETACol,IsPreferenceEnabled ('Content','Show route details'));
    
    switch (location.pathname)
    {
        case '/ships':
            SetColumnIndexVisible (VehicleTable,CargoCol,IsPreferenceEnabled ('Content','Show extra vehicle details'));
            SetColumnIndexVisible (VehicleTable,HullCol,IsPreferenceEnabled ('Content','Show extra vehicle details'));
            SetColumnIndexVisible (VehicleTable,CrewCol,IsPreferenceEnabled ('Content','Show extra vehicle details'));
            SetColumnIndexVisible (VehicleTable,CrewStrengthCol,IsPreferenceEnabled ('Content','Show extra vehicle details'));
            SetColumnIndexVisible (VehicleTable,CannonsCol,IsPreferenceEnabled ('Content','Show extra vehicle details'));
            SetColumnIndexVisible (VehicleTable,AmmoCol,IsPreferenceEnabled ('Content','Show extra vehicle details'));
            break;
        case '/vehicles':
            SetColumnIndexVisible (VehicleTable,AttackCol,IsPreferenceEnabled ('Content','Show extra vehicle details'));
            SetColumnIndexVisible (VehicleTable,ArmorCol,IsPreferenceEnabled ('Content','Show extra vehicle details'));
            SetColumnIndexVisible (VehicleTable,OffenseCol,IsPreferenceEnabled ('Content','Show extra vehicle details'));
            SetColumnIndexVisible (VehicleTable,DefenseCol,IsPreferenceEnabled ('Content','Show extra vehicle details'));
            SetColumnIndexVisible (VehicleTable,DodgeCol,IsPreferenceEnabled ('Content','Show extra vehicle details'));
            break;
    }
    
    SetColumnIndexVisible (VehicleTable,LastEventCol,IsPreferenceEnabled ('Content',"Show vehicles' last event"));
    SetColumnIndexVisible (VehicleTable,LastEventTimeCol,IsPreferenceEnabled ('Content',"Show vehicles' last event"));
    SetColumnIndexVisible (VehicleTable,LastEventEnemyCol,IsPreferenceEnabled ('Content',"Show vehicles' last event"));
    
    SetColumnIndexVisible (VehicleTable,TotalFightsCol,IsPreferenceEnabled ('Content',"Show vehicles' trip stats"));
    SetColumnIndexVisible (VehicleTable,FightsWonCol,IsPreferenceEnabled ('Content',"Show vehicles' trip stats"));
    SetColumnIndexVisible (VehicleTable,FightsLostCol,IsPreferenceEnabled ('Content',"Show vehicles' trip stats"));
    SetColumnIndexVisible (VehicleTable,TimesFendedCol,IsPreferenceEnabled ('Content',"Show vehicles' trip stats"));
    SetColumnIndexVisible (VehicleTable,TimesSankEnemyCol,IsPreferenceEnabled ('Content',"Show vehicles' trip stats"));
    SetColumnIndexVisible (VehicleTable,TimesEscapedFromEnemyCol,IsPreferenceEnabled ('Content',"Show vehicles' trip stats"));
    SetColumnIndexVisible (VehicleTable,TimesEludedByEnemyCol,IsPreferenceEnabled ('Content',"Show vehicles' trip stats"));
    SetColumnIndexVisible (VehicleTable,TimesWasDisabledCol,IsPreferenceEnabled ('Content',"Show vehicles' trip stats"));
    SetColumnIndexVisible (VehicleTable,TimesFishedCol,IsPreferenceEnabled ('Content',"Show vehicles' trip stats"));
    
    SetColumnIndexVisible (VehicleTable,EventHistoryStringCol,IsPreferenceEnabled ('Content',"Show vehicles' trip history"));
    ResizeDocumentToAccomodateVehicleTable();
}

function SelectDisplayMode ()
{
    switch (DisplayModeListBox.selectedIndex)
    {
        case 0: // All vehicles
            SetPreferenceEnabled ('Show vehicles with these statuses','Stopped',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Moving',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Engaged',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Disabled',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Sunk',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Damaged',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Recent events only',false);
            SetColumnIndexVisible (VehicleTable,DestCol,true);
            SetColumnIndexVisible (VehicleTable,SendCol,true);
            SetColumnIndexVisible (VehicleTable,KmLeftCol,true);
            SetColumnIndexVisible (VehicleTable,ETACol,true);
            break;
        case 1: // All non-broken vehicles
            SetPreferenceEnabled ('Show vehicles with these statuses','Stopped',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Moving',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Engaged',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Disabled',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Sunk',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Damaged',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Recent events only',false);
            SetColumnIndexVisible (VehicleTable,DestCol,true);
            SetColumnIndexVisible (VehicleTable,SendCol,true);
            SetColumnIndexVisible (VehicleTable,KmLeftCol,true);
            SetColumnIndexVisible (VehicleTable,ETACol,true);
            break;
        case 2: // moving/engaged
            SetPreferenceEnabled ('Show vehicles with these statuses','Stopped',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Moving',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Engaged',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Disabled',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Sunk',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Damaged',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Recent events only',false);
            SetColumnIndexVisible (VehicleTable,DestCol,true);
            SetColumnIndexVisible (VehicleTable,SendCol,false);
            SetColumnIndexVisible (VehicleTable,KmLeftCol,true);
            SetColumnIndexVisible (VehicleTable,ETACol,true);
            break;
        case 3: // docked
            SetPreferenceEnabled ('Show vehicles with these statuses','Stopped',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Moving',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Engaged',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Disabled',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Sunk',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Damaged',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Recent events only',false);
            SetColumnIndexVisible (VehicleTable,DestCol,false);
            SetColumnIndexVisible (VehicleTable,SendCol,true);
            SetColumnIndexVisible (VehicleTable,KmLeftCol,false);
            SetColumnIndexVisible (VehicleTable,ETACol,false);
            break;
        case 4: // sunk & damaged
            SetPreferenceEnabled ('Show vehicles with these statuses','Stopped',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Moving',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Engaged',false);
            SetPreferenceEnabled ('Show vehicles with these statuses','Disabled',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Sunk',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Damaged',true);
            SetPreferenceEnabled ('Show vehicles with these statuses','Recent events only',false);
            SetColumnIndexVisible (VehicleTable,DestCol,true);
            SetColumnIndexVisible (VehicleTable,SendCol,false);
            SetColumnIndexVisible (VehicleTable,KmLeftCol,true);
            SetColumnIndexVisible (VehicleTable,ETACol,false);
            break;
        case 5: // Recent events
            SetPreferenceEnabled ('Show vehicles with these statuses','Recent events only',true);
            SetColumnIndexVisible (VehicleTable,DestCol,true);
            SetColumnIndexVisible (VehicleTable,SendCol,true);
            SetColumnIndexVisible (VehicleTable,KmLeftCol,true);
            SetColumnIndexVisible (VehicleTable,ETACol,true);
            if (!ShowLastEventCB.checked)
            {
                ShowLastEventCB.checked = true;
                ToggleShowLastEvent ();
            }
            break;
    }
    SavePreferences ();
    localStorage.setItem (CurrentTransportPageVehicleType + '.DisplayMode',DisplayModeListBox.selectedIndex);
    HaveAnyVehicleDetailsBeenChangedSinceLastTableRedraw = true;
    UpdateEverything ();
}

function CreateControlPanelDiv ()
{
    ControlPanelDiv = document.createElement ('div');
    ControlPanelDiv.style.color = GetColorCoding ('NonImportantText');
    ControlPanelDiv.style.fontFamily = GetPreferenceValue ('Table style','Font name');
    ControlPanelDiv.style.fontSize = '12px';
    ControlPanelDiv.style.fontWeight = 'bold';

    document.getElementById ('fullcenter').insertBefore (ControlPanelDiv,document.getElementById ('fullcenter').firstChild);

    RadarAndGadgetsDiv = document.createElement ('div');
    RadarAndGadgetsDiv.style.fontSize = '14px';
    ControlPanelDiv.appendChild (RadarAndGadgetsDiv);

    PageControlsDiv = document.createElement ('div');
    PageControlsDiv.style.marginTop = '5px';
    ControlPanelDiv.appendChild (PageControlsDiv);

    TableStatusDiv = document.createElement ('div');
    TableStatusDiv.style.fontSize = '16px';
    TableStatusDiv.style.fontWeight = 'bold';
    TableStatusDiv.style.display = 'inline-block';
    TableStatusTextNode = document.createTextNode ('Please wait ... preparing table ...');
    TableStatusDiv.appendChild (TableStatusTextNode);
    PageControlsDiv.appendChild (TableStatusDiv);
    
    ResetFilterButton = document.createElement ('input');
    ResetFilterButton.type = 'button';
    ResetFilterButton.value = 'Reset filter';
    ResetFilterButton.onclick = function () {ResetFilter ()};
    ResetFilterButton.style.marginLeft = '15px';
    ResetFilterButton.style.display = 'none';
    PageControlsDiv.appendChild (ResetFilterButton);
    
    ShowRadarDataCB = document.createElement ('input');
    ShowRadarDataCB.type = 'checkbox';
    ShowRadarDataCB.checked = IsPreferenceEnabled ('Radar','Show radar data');
    ShowRadarDataCB.onclick = function () {ToggleShowRadarData ()};
    ShowRadarDataCB.style.marginLeft = '15px';
    PageControlsDiv.appendChild (ShowRadarDataCB);
    PageControlsDiv.appendChild (document.createTextNode ('Radar'));

    ShowGadgetsCB = document.createElement ('input');
    ShowGadgetsCB.type = 'checkbox';
    ShowGadgetsCB.checked = IsPreferenceEnabled ('Gadgets','Show gadgets');
    ShowGadgetsCB.onclick = function () {ToggleShowGadgets ()};
    ShowGadgetsCB.style.marginLeft = '15px';
    PageControlsDiv.appendChild (ShowGadgetsCB);
    PageControlsDiv.appendChild (document.createTextNode ('Gadgets'));

    PreferencesButton = document.createElement ('input');
    PreferencesButton.type = 'button';
    PreferencesButton.value = 'Preferences..';
    PreferencesButton.onclick = function () {BuildAndShowPreferencesDiv ()};
    PreferencesButton.style.marginLeft = '15px';
    PageControlsDiv.appendChild (PreferencesButton);

    VehicleTableContentFiltersDiv = document.createElement ('div');
    ControlPanelDiv.appendChild (VehicleTableContentFiltersDiv);
    
    DisplayModeListBox = document.createElement ('select');
    DisplayModeListBox.innerHTML = '<option>All ' + CurrentTransportPageVehicleType + '</option><option>All non-broken ' + CurrentTransportPageVehicleType + '</option><option>Moving & engaged ' + CurrentTransportPageVehicleType + '</option ><option>Docked ' + CurrentTransportPageVehicleType + '</option><option>Broken ' + CurrentTransportPageVehicleType + '</option><option>Recent events</option><option>(Custom view)</option>';
    DisplayModeListBox.onclick = function () {SelectDisplayMode ()};
    VehicleTableContentFiltersDiv.appendChild (DisplayModeListBox);
    
    ShowRouteDetailsCB = document.createElement ('input');
    ShowRouteDetailsCB.type = 'checkbox';
    ShowRouteDetailsCB.checked = IsPreferenceEnabled ('Content','Show route details');
    ShowRouteDetailsCB.onclick = function () {ToggleShowRouteDetails ()};
    ShowRouteDetailsCB.style.marginLeft = '15px';
    VehicleTableContentFiltersDiv.appendChild (ShowRouteDetailsCB);
    VehicleTableContentFiltersDiv.appendChild (document.createTextNode ('Route details'));
    
    ShowVehicleDetailsCB = document.createElement ('input');
    ShowVehicleDetailsCB.type = 'checkbox';
    ShowVehicleDetailsCB.checked = IsPreferenceEnabled ('Content','Show extra vehicle details');
    ShowVehicleDetailsCB.onclick = function () {ToggleShowVehicleDetails ()};
    ShowVehicleDetailsCB.style.marginLeft = '15px';
    VehicleTableContentFiltersDiv.appendChild (ShowVehicleDetailsCB);
    VehicleTableContentFiltersDiv.appendChild (document.createTextNode ('Vehicle details'));
    
    ShowLastEventCB = document.createElement ('input');
    ShowLastEventCB.type = 'checkbox';
    ShowLastEventCB.checked = IsPreferenceEnabled ('Content',"Show vehicles' last event");
    ShowLastEventCB.onclick = function () {ToggleShowLastEvent ()};
    ShowLastEventCB.style.marginLeft = '10px';
    VehicleTableContentFiltersDiv.appendChild (ShowLastEventCB);
    VehicleTableContentFiltersDiv.appendChild (document.createTextNode ('Last event'));
    
    ShowTripStatsCB = document.createElement ('input');
    ShowTripStatsCB.type = 'checkbox';
    ShowTripStatsCB.checked = IsPreferenceEnabled ('Content',"Show vehicles' trip stats");
    ShowTripStatsCB.onclick = function () {ToggleShowTripStats ()};
    ShowTripStatsCB.style.marginLeft = '10px';
    VehicleTableContentFiltersDiv.appendChild (ShowTripStatsCB);
    VehicleTableContentFiltersDiv.appendChild (document.createTextNode ('Trip stats'));
    
    ShowTripHistoryCB = document.createElement ('input');
    ShowTripHistoryCB.type = 'checkbox';
    ShowTripHistoryCB.checked = IsPreferenceEnabled ('Content',"Show vehicles' trip history");
    ShowTripHistoryCB.onclick = function () {ToggleShowTripHistory ()};
    ShowTripHistoryCB.style.marginLeft = '10px';
    VehicleTableContentFiltersDiv.appendChild (ShowTripHistoryCB);
    VehicleTableContentFiltersDiv.appendChild (document.createTextNode ('Trip history'));
}

function InitialiseRadarDisplay ()
{
    CreateRadarDataDiv ();
    
    BuildRadarDataTable ();
    if (IsPreferenceEnabled ('Radar','Show radar data'))
    {
        ShowRadarDataCB.checked = true;
        ToggleShowRadarData ();
    }
    
    if (DoWeWantToUseLocalStorage)
    {
        var tmpClassFilterEnabled = AreStringsBasicallyEqual (localStorage.getItem (CurrentTransportPageVehicleType + '.LastRadarClassFilterEnabled') || 'false','true');
        var tmpClassFilter = localStorage.getItem (CurrentTransportPageVehicleType + '.LastRadarClassFilter') || '';
        
        // if user changed radar class filter in preferences we need to refresh radar
        if (tmpClassFilterEnabled != IsPreferenceEnabled ('Radar','Only process & display radar for these classes') || tmpClassFilter != GetPreferenceValue ('Radar','Only process & display radar for these classes'))
        {
            localStorage.setItem (CurrentTransportPageVehicleType + '.LastRadarClassFilterEnabled',IsPreferenceEnabled ('Radar','Only process & display radar for these classes'));
            localStorage.setItem (CurrentTransportPageVehicleType + '.LastRadarClassFilter',GetPreferenceValue ('Radar','Only process & display radar for these classes'));
            RefreshRadarData ();
        }
    }
}

function InitialiseGadgetsDisplay ()
{
    CreateGadgetsDiv ();
    
    BuildGadgetsTable ();
    DynamicallyUpdateGadgets (true);
    if (IsPreferenceEnabled ('Gadgets','Show gadgets'))
    {
        ShowGadgetsCB.checked = true;
        ToggleShowGadgets ();
    }
}

function SetupSendPageGadgetsDiv ()
{
    SendPageGadgetsDiv.style.fontFamily = GetPreferenceValue ('Table style','Font name');
    SendPageGadgetsDiv.style.fontSize = '18px';
    SendPageGadgetsDiv.style.fontWeight = 'bold';
    SendPageGadgetsDiv.style.color = 'maroon';
    SendPageGadgetsDiv.style.background = 'yellow';
    SendPageGadgetsDiv.style.marginTop = '5px';
    SendPageGadgetsDiv.style.border = 'medium solid maroon';
    
    SendPageGadgetsDiv.style.display = 'none';
    document.getElementById ('fullcenter').insertBefore (SendPageGadgetsDiv,document.getElementById ('fullcenter').firstChild);
}

function SetupSendPageLastKnownProfessionDiv ()
{
    SendPageLastKnownProfessionDiv.style.fontFamily = GetPreferenceValue ('Table style','Font name');
    SendPageLastKnownProfessionDiv.style.fontSize = '18px';
    SendPageLastKnownProfessionDiv.style.fontWeight = 'bold';
    SendPageLastKnownProfessionDiv.style.color = 'navy';
    SendPageLastKnownProfessionDiv.style.background = '#E0EBFF';
    SendPageLastKnownProfessionDiv.style.marginTop = '5px';
    SendPageLastKnownProfessionDiv.style.border = 'medium solid navy';
    
    SendPageLastKnownProfessionDiv.style.display = 'none';
    document.getElementById ('fullcenter').insertBefore (SendPageLastKnownProfessionDiv,document.getElementById ('fullcenter').firstChild);
}

function CheckImportantGadgetsBeforeVehicleSend ()
{
    if (!DoWeWantToUseLocalStorage || !IsPreferenceEnabled ('Vehicle send','Display warning if any important gadgets are inactive'))
        return;
    LoadGadgetsDataFromLocalStorage ();
    var InactiveImportantGadgetsCount = 0;
    var InactiveImportantGadgetsStr = '';

    for (var cGadget = 0; cGadget < GadgetsArray.length; cGadget ++)
    {
        var Gadget = GadgetsArray [cGadget];

        if (IsPreferenceEnabled ('Important gadgets',Gadget.Name))
        {
            if (!Gadget.DoWeHaveAnyInInventory || Gadget.SecondsUntilExpiry <= 0)
            {
                InactiveImportantGadgetsCount ++;
                if (InactiveImportantGadgetsCount > 1)
                    InactiveImportantGadgetsStr += '&nbsp&nbsp&nbsp&nbsp';
                InactiveImportantGadgetsStr += Gadget.Name;
            }
        }
        
    }
    if (InactiveImportantGadgetsCount == 0)
        SendPageGadgetsDiv.style.display = 'none';
    else
        {
        $(SendPageGadgetsDiv).html ('The following important gadgets are inactive:<br>'+InactiveImportantGadgetsStr);
        SendPageGadgetsDiv.style.display = 'block';
        }
}

function CheckLastKnownProfessionBeforeVehicleSend ()
{
    if (!DoWeWantToUseLocalStorage || !IsPreferenceEnabled ('Vehicle send','Display profession reminder for first send after a period of inactivity'))
        return;

    var LastVehicleSendTime = localStorage.getItem (MachinaModule + '.LastVehicleSendTime') || 0;
    var Now = new Date ();
    var SecondsSinceLastVehicleSend = Math.ceil ((Now.getTime () - LastVehicleSendTime) / 1000);

    GetLastKnownProfession ();

    if ((LastVehicleSendTime == 0 || SecondsSinceLastVehicleSend >= 60 * 60 * 3) && LastKnownProfessionLastUpdate != 0 && SecondsSinceLastKnownProfessionLastUpdated > 60 * 10)
    {
        $(SendPageLastKnownProfessionDiv).html ('You are about to send as the following profession: '+LastKnownProfession);
        SendPageLastKnownProfessionDiv.style.display = 'block';
    }
    else
        SendPageLastKnownProfessionDiv.style.display = 'none';
}

// script starts here

delete Array.prototype.toJSON; // Required to make JSON.stringify work. yeah, seriously

DoWeWantToUseLocalStorage = IsLocalStorageEnabled();
InitialisePreferences ();

if (location.pathname == '/ships' || location.pathname == '/vehicles')
{
    document.getElementById ('fullcenter').style.paddingLeft = '10px';
    var CurrentTransportPageVehicleType = location.pathname.substr (1);
    var VehicleTable = $('#fullcenter table:eq(0)');
    var OriginalDocumentWidth = $('#wrapper').width();
    var VehicleTableOffset = VehicleTable.offset(); // need to grab this now before we make table invisible and its coordinates become zero
    var OriginalDocumentTitle = document.title;
    
    CreateControlPanelDiv ();
    TableStatusDiv.nodeValue = 'Please wait .. preparing table ..';
    VehicleTable.hide ();

    setTimeout (function(){
        ProcessInitialLocalStorageInformation ();
        LoadFilterArrayFromLocalStorage ();
        LoadRadarDataFromLocalStorage ();
        LoadGadgetsDataFromLocalStorage ();
        AlterVehicleTableLayout ();
        PropagateVehicleDataArrayFromVehicleTableContent ();
        PropagateVehicleDataArrayFromLocalStorage ();
        SelectDisplayMode ();
        UpdateVisibleTableColumns ();
        InitialiseRadarDisplay ();
        InitialiseGadgetsDisplay ();
        
        VehicleTable.click (function (e) {HandleVehicleTableClickEvent (e);});
        
        VehicleTable.show ();
        UpdateEverything ();
        
        if (IsPreferenceEnabled ('General','Open clicked links in new tabs'))
            ConvertAllLinksToOpenInNewTabs (VehicleTable);

        setInterval (function(){
            RealTimeNow = new Date ();
            SecondsSincePageLoad = Math.ceil((RealTimeNow.getTime()-RealTimeAtPageLoad.getTime())/1000);
            ServerTimeNow.setTime (ServerTimeAtPageLoad.getTime () + SecondsSincePageLoad * 1000);
            DynamicallyUpdateRadarDetails ();
            DynamicallyUpdateGadgets (true);
        },1000);

        setInterval (function(){
            if (localStorage.getItem (MachinaModule + '.DoWeNeedToRefreshPage') == 'true')
                {            
                localStorage.removeItem (MachinaModule + '.DoWeNeedToRefreshPage');
                AutoRefreshTransportPage ();
            }
            DynamicallyUpdateExtraVehicleDetails ();
        },500);
        
        if (DoWeWantToUseLocalStorage && IsPreferenceEnabled ('Dynamic updates','Refresh distance and time figures every (this many) seconds'))
            setInterval (function () {DynamicallyUpdateDistanceAndTimeFigures ()}, parseFloat (GetPreferenceValue ('Dynamic updates','Refresh distance and time figures every (this many) seconds')) * 1000);
        
        if (IsPreferenceEnabled ('General','Refresh page every (this many) minutes'))
            setInterval (function(){AutoRefreshTransportPage ()}, parseFloat (GetPreferenceValue ('General','Refresh page every (this many) minutes')) * 60000);
    },50);
}

if (location.pathname.indexOf ('/vehicles/send/') == 0)
{
    if (DoWeWantToUseLocalStorage)
    {
        SetupSendPageGadgetsDiv ();
        CheckImportantGadgetsBeforeVehicleSend ();
        setInterval (function(){CheckImportantGadgetsBeforeVehicleSend ();}, 1000);

        SetupSendPageLastKnownProfessionDiv ();
        CheckLastKnownProfessionBeforeVehicleSend ();
        
        if (IsPreferenceEnabled ('Vehicle send','Automatically set destination'))
        {
            var ChangeEvent = document.createEvent ("HTMLEvents");
            ChangeEvent.initEvent ("change",true,false);
            
            var SendContext = $('#fullcenter').find ('table:eq(1)').find('td:eq(0)').find('h3').html();
            var SendContext = 'SendVehicleContext:' + SendContext.substr (SendContext.indexOf (' from ') + 1);
            
            var DestinationElement = document.getElementById ('MinersVehicleRouteId');
            var LastKnownDestinationElementIndex = parseInt (localStorage [SendContext] || -1);
            if (LastKnownDestinationElementIndex != -1)
            {
                DestinationElement.selectedIndex = LastKnownDestinationElementIndex;
                DestinationElement.dispatchEvent (ChangeEvent);
            }
            setInterval (function(){
                {
                    if (DestinationElement.selectedIndex != -1)
                        localStorage.setItem (SendContext,DestinationElement.selectedIndex);
                }
            }, 50);
        }
    }
}

if (location.pathname.indexOf ('/vehicles/check_status/') == 0 || location.pathname.indexOf ('/vehicles/send/') == 0)
{
    setTimeout (function(){
        if (DoWeWantToUseLocalStorage)
        {
            VehicleElementID = GetFinalPartOfURL (document.location.toString());
            if (VehicleElementID != null)
            {
                SetVehicleLocalStorageDataFromStatusPage (VehicleElementID,$(document),location.pathname);
                window.onbeforeunload = function(){
                    SetVehicleLocalStorageDataFromStatusPage (VehicleElementID,$(document),location.pathname);
                }
                setInterval (function(){
                    SetVehicleLocalStorageDataFromStatusPage (VehicleElementID,$(document),location.pathname);
                },500);
            }
        }
    },50);
}

if (location.pathname.indexOf ('/vehicles/confirm_send/') == 0)
{
    function ConfirmSend (VehicleID)
    {
        console.log ('Confirming send for vehicle ' + VehicleID);
        SetVehicleLocalStorageDataFromStatusPage (VehicleID,$(document),location.pathname);
        $('input[type=submit]').click ();
    }

    setTimeout (function(){
        if (DoWeWantToUseLocalStorage)
        {
            var VehicleID = document.getElementById ('MinersVehicleId').value;  
            if (VehicleID != null)
            {
                if (IsPreferenceEnabled ('Vehicle send','Automatically confirm on send'))
                {
                    ConfirmSend (VehicleID);
                }
                else
                {
                    $('input[type=submit]').hide ();

                    var AutoConfirmReminderDiv = document.createElement ('div');
                    with (AutoConfirmReminderDiv)
                    {
                        style.backgroundColor = 'palegoldenrod';
                        style.border = 'thin solid black';
                        style.marginTop = '5px';
                        style.marginBottom = '5px';
                        
                        var VehicleType = localStorage.getItem ('LastTransportPageVehicleType') || 'vehicles';
                        
                        appendChild (document.createTextNode ('The transport script can auto-confirm ' + ConvertAllWordsInStringToSingularForm (VehicleType) + ' sends for you. Would you like to switch on auto-confirm now?'));
                        
                        var tmpButton = document.createElement ('input');
                        with (tmpButton)
                        {
                            type = 'button';
                            value = 'Yes, please';
                            style.marginLeft = '10px';
                            onclick = function () {SetPreferenceEnabled ('Vehicle send','Automatically confirm on send',true); SavePreferences ();};
                        }
                        appendChild (tmpButton);
                    }

                    document.getElementById ('ContainerProcessSendForm').appendChild (AutoConfirmReminderDiv);

                    var tmpButton = document.createElement ('input');
                    with (tmpButton)
                    {
                        type = 'button';
                        value = 'Confirm';
                        style.display = 'block';
                        onclick = function () {ConfirmSend (VehicleID);};
                    }
                    document.getElementById ('ContainerProcessSendForm').appendChild (tmpButton);
                }
            }
        }
    },50);
}

if (location.pathname == '/vehicles/process_send')
{
    if (DoWeWantToUseLocalStorage)
    {
        var VehicleID = GetFinalPartOfURL ($('#fullcenter').find('a').eq(0).attr('href'));
        localStorage.removeItem ('v' + VehicleID);
        
        var LastVehicleSendTime = (new Date ()).getTime ();
        localStorage.setItem (MachinaModule + '.LastVehicleSendTime',LastVehicleSendTime);
        if (IsPreferenceEnabled ('Vehicle send','Close send page after confirm'))
            close ();
        if (IsPreferenceEnabled ('Vehicle send','Reload vehicle page after send'))
            localStorage.setItem (MachinaModule + '.DoWeNeedToRefreshPage','true');
    }
}

if (location.pathname == '/gadgets')
{
    if (DoWeWantToUseLocalStorage)
    {
        localStorage.setItem (MachinaModule + '.DoWeNeedToRefreshGadgets','true');

        window.onbeforeunload = function(){
            localStorage.setItem (MachinaModule + '.DoWeNeedToRefreshGadgets','true');
        }
    }
}

if (location.pathname == '/miners/profession')
{
    function UpdateLastKnownProfession ()
    {
        var ProfessionStr = $(document.getElementById ('fullcenter')).find ('p').eq(0).find ('b').eq(0).text ();
        SetLastKnownProfession (ProfessionStr);
    }
    
    if (DoWeWantToUseLocalStorage)
    {
        UpdateLastKnownProfession ();
        window.onbeforeunload = function(){UpdateLastKnownProfession ();}
    }
}
