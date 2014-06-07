// ==UserScript==
// @name            Face Book Mafia Gift Acceptor
// @description     Will Accept all Mafia Wars and FaceBook Gift Request, friend invites, and can ignore EVERYTHING else.
// @namespace       MafiaWars
// @include         http://www.facebook.com/?sk=app_10979261223
// @include			https://www.facebook.com/?sk=app_10979261223
// @include			http://www.facebook.com/?sk=nf
// @include			https://www.facebook.com/?sk=nf
// @exclude         http://apps.facebook.com/*
// @exclude         http://www.facebook.com/extern*
// @exclude         http://www.facebook.com/pages*
// @exclude         http://www.facebook.com/connect/*
// @exclude         http://www.facebook.com/login.php*
// @exclude         http://www.facebook.com/profile.php*
// @exclude         http://www.facebook.com/reqs.php*
// @exclude         http://www.facebook.com/?sk=messages*
// @exclude         http://www.facebook.com/messages*
// @exclude         http://www.facebook.com/search.php*
// @exclude         http://www.facebook.com/note.php*
// @exclude         http://www.facebook.com/Mafia*
// @exclude         http://www.facebook.com/groups*
// @exclude         http://www.facebook.com/home.php?sk=group*
// @exclude         http://facebook.mafiawars.com/mwfb/xd_receiver.htm*
// @version         0.10.313
// @contributor     Shrubber, Bubba123, Weckl, s1lv3rw0lf
// ==/UserScript==

//  Process Variables
var script_version  = "0.10.313";
//var SUC_script_num  = 97169;

var FreeSpinURL =  'http://spockon.me/MWLL3SpinsLuckyStash';
var EmailBonusURL =  'http://tinyurl.com/emailBonusss';
var FeeSPURL = '';
var AttackURL  =  document.location.protocol+'//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=fight&xw_action=social&xw_city=1&target_id=p%7C56130647&clkdiv=btn_attack_p561306471';
var AttackURL2 =  document.location.protocol+'//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=fight&xw_action=attack_pop&xw_city=1&opponent_id=p%7C56130647&clkdiv=btn_attack_p56130647';

var months = new Array(12);
months[0] = "Jan";
months[1] = "Feb";
months[2] = "Mar";
months[3] = "Apr";
months[4] = "May";
months[5] = "Jun";
months[6] = "Jul";
months[7] = "Aug";
months[8] = "Sep";
months[9] = "Oct";
months[10] = "Nov";
months[11] = "Dec";

var gvar = {};

//  Variables for Event trigger
var pass            = 0,
    change_count    = 0,
    notify_count    = 0,
    scheduled       = false;

var strFBAutoAccept = 'FBAA-Header',
    strFBAALog      = 'FBAA-Log',
    strFBAALog2     = 'FBAA-Log2',
    strFBAASettings = 'FBAA-Settings',
    strFBAASetTabs  = 'FBAA-SettingTab',
    strFBAASetDivs  = 'FBAA-SettingDiv',
    strAutoOn       = 'FBAA-AutoOn',
    strAutoOff      = 'FBAA-AutoOff',
    strLogShow      = 'FBAA-LogShow',
    strLogHide      = 'FBAA-LogHide',
    strLogShow2     = 'FBAA-LogShow2',
    strLogHide2     = 'FBAA-LogHide2',
    strDetailShow   = 'FBAA-DetailShow',
    strDetailHide   = 'FBAA-DetailHide';

var strFrameId;

var bAutoRun        = false;
var bAutoRunHold    = false;
var bShowLog        = false;
var bShowLog2       = false;
var bShowDetail     = true;

var strSaveSet;

var oLogDiv;
var oLogDiv2;
var juststart = 0;
var family = '';

var aParams         = new Array();

var strGroups;

var local_xw_time, xw_sig_valid;
var local_xw_user_id = '';
var local_xw_sig = 0;
var user_health = 0;
var user_energy = 0;
var user_stamina = 0;
var exp_to_next_level = 0;
var boss_fights = 0;
var my_operations = 0;
var user_socialmissions = 0;
var MW_Param = 0;
var FB_user_id = 0;
var Post_form_id;
var FB_dtsg;
var EnableScript = true;

var iRequestCurrent     = 0,
    iWallCurrent        = 0,
    iMW_XW_Timer        = 0,
    iFB_XW_Timer        = 0;
var iRequestNum;

var FV_accept_ignore    = 0;
var MW_FreeGiftsDelay   = 0;
var MW_SecretDropDelay  = 0;
var MW_IcedBonusDelay   = 0;
var MW_LootLadderDelay	= 0;

var strTiny  = '',
    strTiny2 = '',
	strTiny3 = '',
	strTiny4 = '';

var bInitialized = false;

var EventSpan, ActionWall, ActionRequest;
var oWallList, oRequestList;

var aWallNotificationId    = new Array();

/****  Icons   ****/

var imgCatagory = {
        0:  'data:image/gif;base64,' + 
            'R0lGODlhEAAQAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBV' + 
            'ZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDV' + 
            'mQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMr' + 
            'zDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq' + 
            '/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2Yr' + 
            'AGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaq' + 
            'M2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kA' + 
            'ZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmA' + 
            'mZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/' + 
            'zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV' + 
            '/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/' + 
            'AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9V' + 
            'M/9VZv9Vmf9VzP9V//+ aAP+ aM/+ aZv+ amf+ azP+ a//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//V' + 
            'Zv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAAQABAA' + 
            'AAiQAPcJHEiwoEFl9AqiMThQmZiBDxkOyxQmhkBlDCHGuLEPGrGM+5ShESNG2EeQAyPp0ody4DBd' + 
            '61ruy6FmFzB2IDUBSZNmn6J18xgqy5FDBsZktICxLPggDQ4HAxXBLJgjTQ4EBaUGG6gJR1FN++hF' + 
            'q7dPmLB5CUMSHZMp0yRJmdJkUqRoWLSBy1hijJb2rsCAADs=',
        1:  'data:image/gif;base64,' + 
            'R0lGODlhEAAQAKIAAAAAAOvu9DtZmEVinm2EtGF5rP///wAAACH5BAEHAAAALAAAAAAQABAAAAM+' + 
            'CLrcWiLKGYuiWN5cgjHRhnlfCGRCqZ2ZamJfDAqiFJD32846zNMs30QxIBiPhM9xQEQelUYmAIKS' + 
            'WBzYRQIAOw==',
        2:  'data:image/gif;base64,' + 
            'R0lGODlhEAAQAPUAAAAAAAYGBgkJCRERERcXFxsbGx4eHiQkJCoqKi4uLjIyMjQ0NDk5OT4+PkBA' + 
            'QEdHR0pKSlBQUFdXV15eXmJiYmZmZmpqanNzc3R0dH9/f4CAgIWFhYuLi42NjZGRkZeXl5ubm56e' + 
            'nqampqqqqqysrLa2trq6ur+/v8HBwcXFxcjIyM/Pz9PT09fX19ra2t/f3+Pj4+Xl5evr6/Hx8fT0' + 
            '9Pn5+f39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAbQQIOj' + 
            'sVg4DAAAwcFYMByHgCM0In2QSs5oBIIIAAfSaoVaJBUklWqUSIZbLNclWRmvSoekoQR7xUwFAyIv' + 
            'Li4nCHonMjGLEhAtMTAxKmYABik0MzU1IBuaMzMtDW4tNjUnNS4qNCo1NjIPSQguphYsNjYuGDKv' + 
            'DkkLMKYZJbgmFzOvowAOMcIduB4XNDYxygzNNhcSMzQVFdOwSQm0NhYHKy4KFK4yELKl5QIiJQIT' + 
            '0zG+ aAzBNhgAFv4sTKMRAUADDB88fODQgEHDDSEianAQBAA7',
        3:  'data:image/gif;base64,' + 
            'R0lGODlhEAAQAPMKAAAAABlLGShjKH5+fo5DAMheAESMRHq0eviwFfrybwAAAAAAAAAAAAAAAAAA' + 
            'AAAAACH5BAEAAAoALAAAAAAQABAAAARZUMmpCko0z3GRzpyVeJ80WGIpAYRIlgB6KUYm3KxrBDUF' + 
            'BAFZIvDhBVqXgsFwoPCWBISFsGNKeADAEoXlXQWKgbb1VPyuE62BagADwBl12fwRV4mq8A9PiQAA' + 
            'Ow==',
        4:  'data:image/gif;base64,' + 
            'R0lGODlhEAAQAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBV' + 
            'ZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDV' + 
            'mQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMr' + 
            'zDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq' + 
            '/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2Yr' + 
            'AGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaq' + 
            'M2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kA' + 
            'ZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmA' + 
            'mZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/' + 
            'zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV' + 
            '/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/' + 
            'AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9V' + 
            'M/9VZv9Vmf9VzP9V//+ aAP+ aM/+ aZv+ amf+ azP+ a//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//V' + 
            'Zv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAAQABAA' + 
            'AAi6APcJHLhsU6hlAxMOhBMkTqg4cdRsUrhvGRyHm+Bo2nQnYrSB0STGAZUw1EU1A+Nw1LQv2qaJ' + 
            ' + 14eYblPzcNN0TTFOaJsHyiVOipihBgnCMtoEEPpgKZzU5yLRoWugRhk2KYjcJzGCboPyNQgOoAQ' + 
            'U7YmSMOiToMAWQsWWteiatRm9Go2SA6Bmo6s0QtHoFmvOtIMVBNn75qCQOriSBgtB8QjiQvrWDxQ' + 
            'H94cOtYA0eFgEsWE0IaNpRgQADs=',
        5:  'data:image/gif;base64,' + 
            'R0lGODlhEAAQAPUAAAAAAAYGBgkJCRERERcXFxsbGx4eHiQkJCoqKi4uLjIyMjQ0NDk5OT4+PkBA' + 
            'QEdHR0pKSlBQUFdXV15eXmJiYmZmZmpqanNzc3R0dH9/f4CAgIWFhYuLi42NjZGRkZeXl5ubm56e' + 
            'nqampqqqqqysrLa2trq6ur+/v8HBwcXFxcjIyM/Pz9PT09fX19ra2t/f3+Pj4+Xl5evr6/Hx8fT0' + 
            '9Pn5+f39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAbQQIOj' + 
            'sVg4DAAAwcFYMByHgCM0In2QSs5oBIIIAAfSaoVaJBUklWqUSIZbLNclWRmvSoekoQR7xUwFAyIv' + 
            'Li4nCHonMjGLEhAtMTAxKmYABik0MzU1IBuaMzMtDW4tNjUnNS4qNCo1NjIPSQguphYsNjYuGDKv' + 
            'DkkLMKYZJbgmFzOvowAOMcIduB4XNDYxygzNNhcSMzQVFdOwSQm0NhYHKy4KFK4yELKl5QIiJQIT' + 
            '0zG+ aAzBNhgAFv4sTKMRAUADDB88fODQgEHDDSEianAQBAA7',
        6:  'data:image/gif;base64,' + 
            'R0lGODlhEAAQAPUAAAAAAAYGBgkJCRERERcXFxsbGx4eHiQkJCoqKi4uLjIyMjQ0NDk5OT4+PkBA' + 
            'QEdHR0pKSlBQUFdXV15eXmJiYmZmZmpqanNzc3R0dH9/f4CAgIWFhYuLi42NjZGRkZeXl5ubm56e' + 
            'nqampqqqqqysrLa2trq6ur+/v8HBwcXFxcjIyM/Pz9PT09fX19ra2t/f3+Pj4+Xl5evr6/Hx8fT0' + 
            '9Pn5+f39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAbQQIOj' + 
            'sVg4DAAAwcFYMByHgCM0In2QSs5oBIIIAAfSaoVaJBUklWqUSIZbLNclWRmvSoekoQR7xUwFAyIv' + 
            'Li4nCHonMjGLEhAtMTAxKmYABik0MzU1IBuaMzMtDW4tNjUnNS4qNCo1NjIPSQguphYsNjYuGDKv' + 
            'DkkLMKYZJbgmFzOvowAOMcIduB4XNDYxygzNNhcSMzQVFdOwSQm0NhYHKy4KFK4yELKl5QIiJQIT' + 
            '0zG+ aAzBNhgAFv4sTKMRAUADDB88fODQgEHDDSEianAQBAA7',
        7:  'data:image/gif;base64,' + 
            'R0lGODlhEAAQAPUAAAAAAAYGBgkJCRERERcXFxsbGx4eHiQkJCoqKi4uLjIyMjQ0NDk5OT4+PkBA' + 
            'QEdHR0pKSlBQUFdXV15eXmJiYmZmZmpqanNzc3R0dH9/f4CAgIWFhYuLi42NjZGRkZeXl5ubm56e' + 
            'nqampqqqqqysrLa2trq6ur+/v8HBwcXFxcjIyM/Pz9PT09fX19ra2t/f3+Pj4+Xl5evr6/Hx8fT0' + 
            '9Pn5+f39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAbQQIOj' + 
            'sVg4DAAAwcFYMByHgCM0In2QSs5oBIIIAAfSaoVaJBUklWqUSIZbLNclWRmvSoekoQR7xUwFAyIv' + 
            'Li4nCHonMjGLEhAtMTAxKmYABik0MzU1IBuaMzMtDW4tNjUnNS4qNCo1NjIPSQguphYsNjYuGDKv' + 
            'DkkLMKYZJbgmFzOvowAOMcIduB4XNDYxygzNNhcSMzQVFdOwSQm0NhYHKy4KFK4yELKl5QIiJQIT' + 
            '0zG+ aAzBNhgAFv4sTKMRAUADDB88fODQgEHDDSEianAQBAA7'
        };


/****   Link List Header    ****/
List = function(_cycle) {

    var Self = this;

    this.First  = null;
    this.Last   = null;

    // empty list
    this.Erase  = function() {
        var pointer = this.First;
        var hold;
        while (pointer != null) {
            hold = pointer.Next;
            pointer = null;
            pointer = hold;
        }
        this.First  = null;
        this.Last   = null;
    };

    //start to action the data elements in the list
    this.Run    = function() {
        var oHold;
        if (this.First == null) {
            // load List
            _cycle();
        } else {
            // remove the top element from the list and action it
            oHold = this.First;
            this.First = oHold.Next;
            oHold.Process();
        }
    }

    // add to the bottom of the list
    this.Append = function(_data) {
        if (this.First == null) {
            this.First  = _data;
            this.Last   = _data;
        } else {
            this.Last.Next  = _data;
            this.Last   = _data;
        }
    }

    // add to the top of the list
    this.Insert = function(_data) {
        if (this.First == null) {
            this.First  = _data;
            this.Last   = _data;
        } else {
            _data.Next  = this.First;
            this.First  = _data;
        }
    }
};
/****   End of Link List Header ****/

/****  Engine for Processing Wall posting, Requests ****/

// regex search items
//var strConfirmBoxes1    =   './/div[@class="fbRequestList mbl"]//form',
var strConfirmBoxes1   = './/div[@class="requestStatus UIImageBlock_Content UIImageBlock_SMALL_Content"]//form'
    //strConfirmBoxes1    =   './/ul[@class="uiList mbl pbm"]//form',
//    strConfirmBoxes2    =   './/div[@class="confirm_boxes"]//form',
    strConfirmBoxes2   = './/li[contains(@class,"uiListItem  uiListHorizontalItemBorder uiListHorizontalItem")]//form',
//    strConfirmBoxes3    =   './/div[@class="mbl"]//form',
    strConfirmBoxes3   = './/li[contains(@class,"uiListItem  uiListVerticalItemBorder")]//form',

    strFormInputs       =   './/input',
    strFormId           =   './div',
	strFormBody         =   './/div[@class="pts prs appRequestBodyNewA"]',

    strReqTypes         =   './/span[contains(@id,"_label")]',
    strReqTypes1        =   './span[contains(@id,"confirm_")]',
    strWarBetray        =   './/span[contains(text(),"Betray")]/parent::*',
    strWarAttackBetray  =   './/div[contains(@style,"position: absolute")]/a',
    //strWarAttack        =   './/div[contains(@style,"float: left")]/div[contains(@style,"position: absolute")]/a';
    //strWarAttack        =   './/a';
	strWarAttack        =   '//dd/div/a';

var strBase             =   document.location.protocol+'//www.facebook.com/ajax/reqs.php?__a=1',
    strBase2            =   document.location.protocol+'//www.facebook.com/ajax/games/apprequest/apprequest.php?__a=1',
    strAccept           =   '&actions[accept]=Confirm',
    strReject           =   '&actions[reject]=Ignore';

// regex for Wall data
var Wall_Data = {
    // Mafia Wars
    10979261223: {    
	    MW_WarHelp:         {testURL:   /next_controller=war&next_action=view/i,           testIMG:   /\B|./i},
        MW_Missions:        {testURL:   /next_controller=socialmission&next_action=joinMission/i,           testIMG:   /\B|./i},
        MW_OperationReward: {testURL:   /next_controller=socialmission&next_action=rewardBrag/i,                                                                                                                                                                    testIMG:   /\B|./i},
        MW_MissionReward:   {testURL:   /next_controller=quest&next_action=questFeedReward/i,                 testIMG:   /\B|./i},
        MW_ChopShop:        {testURL:   /next_controller=propertyV2&next_action=cs_help_final|next_controller=propertyV2&next_action=getBoost/i,                                               testIMG:   /\B|./i},	
        MW_Burner:          {testURL:   /next_controller=robbing&next_action=call_for_help_get_phone/i,                                                                                                                                                                     testIMG:   /\B|./i},
        MW_RobSquad:       {testURL:   /next_controller=robbing&next_action=one_click_get/i,                                                                                                                                                                     testIMG:   /\B|./i},
        MW_NeedHelp_NY:     {testURL:   /next_controller=job&next_action=give_help(.)*cityId=1|next_controller=job&xw_action=give_help(.)*cityId=1/i,                                                                                                                       testIMG:   /\B|./i},
        MW_NeedHelp_Bangkok:{testURL:   /next_controller=story&next_action=give_help_social(.)*cityId=4/i,                                                                                                                                                                  testIMG:   /\B|./i},
        MW_NeedHelp_Vegas:  {testURL:   /next_controller=story&next_action=give_help_social(.)*cityId=5/i,                                                                                                                                                                  testIMG:   /\B|./i},
        MW_NeedHelp_Italy:  {testURL:   /next_controller=story&next_action=give_help_social(.)*cityId=6/i,                                                                                                                                                                  testIMG:   /\B|./i},
        MW_NeedHelp_Brazil: {testURL:   /next_controller=job&next_action=give_help(.)*cityId=7/i,                                                                                                                       testIMG:   /\B|./i},
        MW_NeedHelp_Chicago: {testURL:   /next_controller=job&next_action=give_help(.)*cityId=8/i,                                                                                                                       testIMG:   /\B|./i},
        MW_NeedHelp_London: {testURL:   /next_controller=job&next_action=give_help(.)*cityId=9/i,                                                                                                                       testIMG:   /\B|./i},
        MW_Achievement:     {testURL:   /track.php\?sendkey=.{0,}&next_action=ach_celeb/i,                                                                                                                                                                                  testIMG:   /\B|./i},
        MW_BossBonus:       {testURL:   /next_controller=story&next_action=claim_boss_bonus/i,																														    testIMG:   /\B|./i},
        MW_IcedBonus:       {testURL:   /next_controller=index&next_action=iced_boost_claim|next_controller=fight&next_action=iced_boost_claim/i,                                                                                                                                                                              testIMG:   /\B|./i},
        MW_Loyalty:         {testURL:   /next_controller=index&next_action=crm_levelup_claim/i,                                                                                                                                                                             testIMG:   /\B|./i},
        MW_LevelUp:         {testURL:   /next_controller=index&next_action=levelup_boost_claim|next_controller=map&next_action=mapboss_reward_claim/i,                                                                                                                      testIMG:   /\B|./i},
        MW_Levelupbonus:    {testURL:   /next_controller=index&next_action=levelUpBonusClaim/i,                                                                                                                      testIMG:   /\B|./i},
        MW_HolidayBonus:    {testURL:   /next_controller=index&next_action=holiday_feed_reward/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_PChopShop:   {testURL:   /next_controller=propertyV2&next_action=cs_help_item.{0,}%22building_type%22%3A%2211%22 | next_controller=propertyV2&next_action=cs_help_initial/i,         testIMG:   /\B|./i},
        MW_PWeapons:   {testURL:   /next_controller=propertyV2&next_action=cs_help_item.{0,}%22building_type%22%3A%2212%22/i,         testIMG:   /\B|./i},
        MW_PArmory:   {testURL:   /next_controller=propertyV2&next_action=cs_help_item.{0,}%22building_type%22%3A%2213%22/i,         testIMG:   /\B|./i},
        MW_PZoo:   {testURL:   /next_controller=propertyV2&next_action=cs_help_item.{0,}%22building_type%22%3A%2214%22/i,         testIMG:   /\B|./i},
        MW_PSpecial:   {testURL:   /next_controller=propertyV2&next_action=cs_redeem_special_item_feed/i,         testIMG:   /\B|./i},
//        MW_S_Gun:   {testURL:   /next_controller=PropertyV2&next_action=PropertyV2EventAskFeed/i,         testIMG:   /\B|./i},
        MW_PVegas:     {testURL:   /next_controller=propertyV2&next_action=itemFeedHelp.{0,}%22city_id%22%3A%225%22/i,         testIMG:   /\B|./i},
        MW_PItaly:     {testURL:   /next_controller=propertyV2&next_action=itemFeedHelp.{0,}%22city_id%22%3A%226%22/i,         testIMG:   /\B|./i},
        MW_PBrazil:    {testURL:   /next_controller=propertyV2&next_action=itemFeedHelp.{0,}%22city_id%22%3A%227%22/i,         testIMG:   /\B|./i},
        MW_PChicago:   {testURL:   /next_controller=propertyV2&next_action=itemFeedHelp.{0,}%22city_id%22%3A%228%22/i,         testIMG:   /\B|./i},
        MW_PLondon:    {testURL:   /next_controller=propertyV2&next_action=itemFeedHelp.{0,}%22city_id%22%3A%229%22/i,         testIMG:   /\B|./i},
        MW_SSportsBar: {testURL:   /next_controller=limitedTimeProperty&next_action=addAnyPropertyPart|next_controller=limitedTimeProperty&next_action=addPropertyPart/i,            testIMG:   /\B|./i},
        MW_Sportsbar:   {testURL:   /next_controller=limitedTimeProperty&next_action=upgradeBragFeed/i,            testIMG:   /\B|./i},
        MW_S_Energy:    {testURL:   /next_controller=index&next_action=send_energy_mbox|next_controller=index&next_action=power_pack_get/i,                                                                                                                                                                              testIMG:   /\B|./i},
        MW_NextTarget:      {testURL:   /next_controller=fight&next_action=social_attack/i,                                                                                                                                                                                 testIMG:   /\B|./i},
        //MW_Secret_Reward:   {testURL:   /next_controller=fight&next_action=collect_fight_loot|next_controller=index&next_action=socialmission_respond|next_controller=socialmission&next_action=giftAccept|next_controller=fight&next_action=view|next_controller=propertyV2Tree&next_action=upgradeW2W|next_action=levelUpMilestoneClaim/i,                        testIMG:   /\B|./i},
        MW_FightEvent:     {testURL:   /next_controller=index&next_action=fight_event_feed_reward/i,                                                                                                                                                                       testIMG:   /\B|./i},
//        MW_Bounty:          {testURL:   /next_controller=hitlist&next_action=feed_hit/i,                                                                                                                                                                                    testIMG:   /\B|./i},
        MW_Robbing:         {testURL:   /next_controller=robbing&next_action=mastery_bonus/i,                                                                                                                                                                               testIMG:   /\B|./i},
        MW_LootDropEvent:   {testURL:   /next_controller=index&next_action=loot_drop_event_feed_reward|next_controller=index&next_action=loot_drop_mastery_feed_accept/i,                                                                                                                                                                   testIMG:   /\B|./i},
        MW_ShareRewardEvent:{testURL:   /next_controller=war&next_action=share_reward_feed_click/i,                                                                                                                                                                    testIMG:   /\B|./i},
        MW_VegasSlots:      {testURL:   /next_controller=stats&next_action=view(.)*vegasslots|next_controller=stats&next_action=view(.)*playslots/i,                                                                                                                        testIMG:   /\B|./i},
        MW_FreeGift:        {testURL:   /next_controller=freegifts&next_action=acceptGiftEvent|next_controller=secretStash&next_action=raid/i,                                                                                                                                                                           testIMG:   /\B|./i},
//        MW_Protect:        {testURL:   /next_controller=propertyV2Tree&next_action=holidayTreeProtectionWtw/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_Challenge:      {testURL:   /next_controller=index&next_action=challenge_mission_claim/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_Event:         {testURL:   /next_controller=propertyV2&next_action=collect_all_share|next_controller=lootladderevent&next_action=share_feed_click/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_Getpart:         {testURL:   /next_controller=propertyV2&next_action=collect_all_share/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_AS: {testURL:   /next_controller=ClanProperty&next_action=getPartsFromFeed/i,                                                                                                                                                                           testIMG:   /\B|./i},
//        MW_Golden_Mask:    {testURL:   /next_controller=lootladderevent&next_action=brag_feed_click/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_BossFightV2:    {testURL:   /next_controller=Epicclanboss&next_action=ask_feed_click|next_controller=bossfightv2&next_action=ask_feed_click|next_controller=bossfightv2&next_action=combo_brag_click/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_Event_Send:    {testURL:   /next_controller=lootladderevent&next_action=ask_feed_click/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_FootBall:        {testURL:   /next_controller=propertyV2&next_action=getCustomer/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_CollectGift:        {testURL:   /next_controller=freegifts&next_action=accept_gift/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_CollectEnergy:        {testURL:   /next_controller=index&next_action=accept_energy_req/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_Crew:        {testURL:   /next_controller=job&next_action=accept_city_crew | next_controller=job&next_action=accept_city_crew_feed/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_Mastery:        {testURL:   /next_controller=job&next_action=mastery_feed_claim/i,                                                                                                                                                                           testIMG:   /\B|./i},
//        MW_Turkey:        {testURL:   /next_controller=SaveAndStealEvent&next_action=feed_collect/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_FightBoost:        {testURL:   /next_controller=fight&next_action=send_boost_from_feed/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_2XLoot:        {testURL:   /next_controller=job&next_action=sd_boost_get/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_HelpGift:        {testURL:   /next_controller=FeedOfTheDay&next_action=feed_accept/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_LimitedTime: {testURL: /next_controller=index&next_action=city_shutdown_italy_feed/i,  testIMG:   /\B|./i},
        MW_Poker:        {testURL:   /next_controller=MafiaPoker&next_action=askCardFeed/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_London:        {testURL:   /next_controller=Travel&next_action=getLondonItemFromFeed/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_DTV3: {testURL: /next_controller=DailyTakeV3&next_action=collect_stake/i,                                                    testIMG:   /\B|./i} 
        },
    // FarmVille
    102452128776: {
        // rewards
         FV_FriendRewad:                  {testURL:   /next=reward.php/i,                              testIMG:    /\B|./i},
        // FV_Send:                         {testURL:   /next=gifts.php|cat=feed_ask_for_|%3Fmission%3Dfertilize/i,                              testIMG:    /\B|./i},
         //FV_Found:                        {testURL:   /watering_cans_found|mystery_seeds_found/i,                              testIMG:    /\B|./i},
//         FV_WallToWall:                   {testURL:   /Type%3DWallToWall/i,                              testIMG:    /\B|./i},
//         FV_GetPart:                      {testURL:   /Type%3Dduckpond_finished/i,                              testIMG:    /\B|./i},
//         FV_Gold:                         {testURL:   /Type%3Dstpattysbasket2011Pass/i,                              testIMG:    /\B|./i},
         //FV_Help:                      {testURL:   /cat=fertilizer&subcat=crowdsource_self/i,                              testIMG:    /\B|./i}
//         FV_Lost:                      {testURL:   /cat=lonely_cow&subcat=calf/i,                              testIMG:    /\B|./i}
      },

    // FarmVille Chinese
    156383461049284: {
        // rewards
         FV_FriendRewad:                  {testURL:   /next=reward.php/i,                              testIMG:    /\B|./i},
        // FV_Send:                         {testURL:   /next=gifts.php|cat=feed_ask_for_|%3Fmission%3Dfertilize/i,                              testIMG:    /\B|./i},
//         FV_Found:                        {testURL:   /watering_cans_found|mystery_seeds_found/i,                              testIMG:    /\B|./i},
//         FV_WallToWall:                   {testURL:   /Type%3DWallToWall/i,                              testIMG:    /\B|./i},
//         FV_GetPart:                      {testURL:   /Type%3Dduckpond_finished/i,                              testIMG:    /\B|./i},
//         FV_Gold:                         {testURL:   /Type%3Dstpattysbasket2011Pass/i,                              testIMG:    /\B|./i},
//         FV_Lost:                      {testURL:   /cat=lonely_cow&subcat=calf/i,                              testIMG:    /\B|./i},
//         FV_Help:                      {testURL:   /cat=fertilizer&subcat=crowdsource_self/i,                              testIMG:    /\B|./i}
      }

  };

var MW_general = {
    2004:   {text:"Help on Jobs"},
    2008:   {text:"Bonus, Loot, or Reward"},
    7897:   {text:"Achievement"},
    7901:   {text:"Level Up Bonus"},
    2900:   {text:"ChopShop, WeaponsDepot"},
    2015:   {text:"Vegas Slots"},
    2016:   {text:"Operation Reward"},
    //2017:   {text:"X-Men Crest"},
    2011:   {text:"War - Help"},
    2010:   {text:"Supply Engery"},
    7890:   {text:"Supply NY Parts"},
    7894:   {text:"Supply Special Parts(OFF=Friend)"},
    7895:   {text:"Supply Vegas Parts(OFF=Friend)"},
    7896:   {text:"Supply Italy Parts(OFF=Friend)"},
    7899:   {text:"Supply Brazil Parts(OFF=Friend)"},
    7902:   {text:"Supply Chicago Parts(OFF=Friend)"},
    7906:   {text:"Supply London Parts(OFF=Friend)"},
    7900:   {text:"Supply Sports Bar(OFF=Friend)"},
    7904:   {text:"Get Sports Bar Part"},
    7905:   {text:"Supply Artillery Shell(OFF=Friend)"},
    //7898:   {text:"Supply Gun OFF=Friend)"},
    2012:   {text:"FREE Point - Daily"},
    2006:   {text:"Next Target"},
    2007:   {text:"HitList Bounty"}
};

var MW_WarList = {
  //2200: {text:"ALL (Overrides others)",               test:"ARANDOMPLACEHOLDERMEANSNOTHING"},
    2200: {text:"ALL (Overrides others)",               test:""},
    2201: {text:"Canonazo.               A:42,   D:22", test:"Canonazo"},
    2202: {text:"Big Bad Wolf.           A:42,   D:25", test:"Big Bad Wolf"},
    2203: {text:"Tanto.                  A:43,   D:28", test:"Tanto"},
    2204: {text:"String of Firecrackers. A:33,   D:46", test:"String of Firecrackers"},
    2205: {text:"Raed Armored Sedan.     A:30,   D:47", test:"Raed Armored Sedan"},
    2206: {text:"Deadly Impression.      A:28,   D:47", test:"Deadly Impression"},
    2207: {text:"Cataclysmic.            A:53,   D:26", test:"Cataclysmic"},
    2208: {text:"Savanna Baboon.         A:25,   D:54", test:"Savanna Baboon"},
    2209: {text:"Snapping Turtle.        A:56,   D:25", test:"Snapping Turtle"},
    2210: {text:"Duster.                 A:27,   D:56", test:"Duster"},
    2211: {text:"Spiked Baton.           A:58,   D:28", test:"Spiked Baton"},
    2212: {text:"Armored Biker Boots.    A:27,   D:59", test:"Armored Biker Boots"},
    2213: {text:"Contender.              A:33,   D:63", test:"Contender"},
    2214: {text:"Galapagos Hawk.         A:64,   D:32", test:"Galapagos Hawk"},
    2215: {text:"Growler.                A:33,   D:65", test:"Growler"},
    2216: {text:"Hack N Slash.           A:65,   D:35", test:"Hack N Slash"},
    2217: {text:"Growler Firearm.        A:58,   D:45", test:"Growler Firearm"},
    2218: {text:"Simian Safeguard.       A:43,   D:58", test:"Simian Safeguard"},
    2219: {text:"Heat Seeker.            A:46,   D:60", test:"Heat Seeker"},
    2220: {text:"Bayou Trike.            A:61,   D:48", test:"Bayou Trike"},
    2221: {text:"California Condor.      A:42,   D:62", test:"California Condor"},
    2222: {text:"Hook Sword.             A:72,   D:51", test:"Hook Sword"},
    2223: {text:"Amur River Boat.        A:69,   D:50", test:"Amur River Boat"},
    2224: {text:"Rhino Helmet.           A:71,   D:49", test:"Rhino Helmet"},
    2225: {text:"Rhinoceros Beetle.      A:52,   D:72", test:"Rhinoceros Beetle"},
    2226: {text:"Juvenile Tiger.         A:70,   D:51", test:"Juvenile Tiger"},
    2227: {text:"Curled Horn Helm.       A:71,   D:51", test:"Curled Horn Helm"},
    2228: {text:"Force Fire.             A:52,   D:70", test:"Force Fire"},
    2229: {text:"Roadster Rage.          A:53,   D:72", test:"Roadster Rage"},
    2230: {text:"Scottish Wild Cat.      A:71,   D:50", test:"Scottish Wild Cat"},
    2231: {text:"Snow Crawler.           A:54,   D:72", test:"Snow Crawler"},
    2232: {text:"Juggernaut.             A:65,   D:79", test:"Juggernaut"},
    2233: {text:"King Cobra.             A:80,   D:62", test:"King Cobra"},
    2234: {text:"Pisces Harpoon Gun.     A:64,   D:78", test:"Pisces Harpoon Gun"},
    2235: {text:"Sheet Metal Blade.      A:79,   D:63", test:"Sheet Metal Blade"},
    2236: {text:"Tlingit Parka.          A:64,   D:81", test:"Tlingit Parka"},
    2237: {text:"Deimos Dagger.          A:78,   D:65", test:"Deimos Dagger"},
    2238: {text:"Leg Up.                 A:80,   D:61", test:"Leg Up"},
    2239: {text:"Mud Crawler.            A:60,   D:81", test:"Mud Crawler"},
    2240: {text:"Zorse.                  A:81,   D:66", test:"Zorse"},
    2241: {text:"Orangutan.              A:82,   D:68", test:"Orangutan"},
    2242: {text:"Night on the Town.      A:72,   D:88", test:"Night on the Town"},
    2243: {text:"Huntsman.               A:75,   D:89", test:"Huntsman"},
    2244: {text:"Beluga Jumbo Jet.       A:90,   D:70", test:"Beluga Jumbo Jet"},
    2245: {text:"Longhorn Limo.          A:91,   D:75", test:"Longhorn Limo"},
    2246: {text:"Kaka.                   A:79,   D:92", test:"Kaka"},
    2247: {text:"Speak Quietly.          A:75,   D:90", test:"Speak Quietly"},
    2248: {text:"Personal Shield.        A:92,   D:72", test:"Personal Shield"},
    2249: {text:"Offwhite Rabbit.        A:90,   D:73", test:"Offwhite Rabbit"},
    2250: {text:"Rhino Lifter.           A:76,   D:91", test:"Rhino Lifter"},
    2251: {text:"Emu.                    A:75,   D:92", test:"Emu"},
    2252: {text:"Hybrid Flight.          A:98,   D:81", test:"Hybrid Flight"},
    2253: {text:"Sloth Bear.             A:82,   D:97", test:"Sloth Bear"},
    2254: {text:"Shark Saw.              A:99,   D:81", test:"Shark Saw"},
    2255: {text:"Penguin Tux.            A:98,   D:80", test:"Penguin Tux"},
    2256: {text:"Paraglider.             A:100,  D:79", test:"Paraglider"},
    2257: {text:"Zebra.                  A:95,   D:75", test:"Zebra"}, 
    2258: {text:"Gas Line.               A:74,   D:96", test:"Gas Line"}, 
    2259: {text:"Minding Mines.          A:75,   D:96", test:"Minding Mines"}, 
    2260: {text:"Phobos Phaser.          A:96,   D:78", test:"Phobos Phaser"}, 
    2261: {text:"Wrist Watcher.          A:97,   D:77", test:"Wrist Watcher"}, 
    2262: {text:"Subporpoise.            A:83,   D:102", test:"Subporpoise"}, 
    2263: {text:"Flex Help.              A:101,  D:83", test:"Flex Help"}, 
    2264: {text:"Mantis Flyby.           A:83,   D:103", test:"Mantis Flyby"}, 
    2265: {text:"Chuck Pistol.           A:82,   D:102", test:"Chuck Pistol"}, 
    2266: {text:"Beisa Oryx.             A:81,   D:104", test:"Beisa Oryx"},
    2267: {text:"Outrunner. A:78, D:97", test:"Outrunner"}, 
    2268: {text:"Lungfish. A:98, D:85", test:"Lungfish"}, 
    2269: {text:"Collar Guard. A:98, D:76", test:"Collar Guard"}, 
    2270: {text:"Stealth Shooter. A:79, D:98", test:"Stealth Shooter"}, 
    2271: {text:"Neon Cruiser. A:77, D:99", test:"Neon Cruiser"}, 
    2272: {text:"Moon Boots. A:104, D:84", test:"Moon Boots"}, 
    2273: {text:"Hyacinth Macaw. A:83, D:103", test:"Hyacinth Macaw"}, 
    2274: {text:"Detective Special. A:105, D:83", test:"Detective Special"}, 
    2275: {text:"Ojibwa Snowshoes. A:104, D:83", test:"Ojibwa Snowshoes"}, 
    2276: {text:"Bullet Truck. A:106, D:82", test:"Bullet Truck"}, 
    2277: {text:"Blue Jay. A:99, D:79", test:"Blue Jay"}, 
    2278: {text:"Wasp Wing Mask. A:85, D:100", test:"Wasp Wing Mask"}, 
    2279: {text:"Green Rider. A:77, D:100", test:"Green Rider"}, 
    2280: {text:"M41 Official Issue. A:100, D:80", test:"M41 Official Issue"}, 
    2281: {text:"Armadillo. A:101, D:77", test:"Armadillo"}, 
    2282: {text:"Blazer. A:86, D:106", test:"Blazer"}, 
    2283: {text:"Penalty Stick. A:105, D:85", test:"Penalty Stick"}, 
    2284: {text:"Mortis. A:82, D:107", test:"Mortis"}, 
    2285: {text:"Ringtail Cat. A:83, D:106", test:"Ringtail Cat"}, 
    2286: {text:"FE Lime Guard. A:82, D:108", test:"FE Lime Guard"},    
    2287: {text:"4-Wheel Bike. A:105 D:82", test:"4-Wheel Bike"},
    2288: {text:"Shock Dart. A:81 D:106", test:"Shock Dart"},
    2289: {text:"Binturong. A:107 D:83", test:"Binturong"},
    2290: {text:"Stream Splitter Helm. A:82 D:108", test:"Stream Splitter Helm"},
    2291: {text:"3-Wheel Scooter. A:109 D:83", test:"3-Wheel Scooter"},
    2292: {text:"Electric Automatic. A:89 B:116", test:"Electric Automatic"},
    2293: {text:"Sand Python. A:117 B:90", test:"Sand Python"},
    2294: {text:"Molle pack. A:91 B:115", test:"Molle pack"},
    2295: {text:"Double Fin. A:116 B:91", test:"Double Fin"},
    2296: {text:"Corroded Blade. A:90 D:117", test:"Corroded Blade"},
    2297: {text:"Chacma Baboon. A:83 D:111", test:"Chacma Baboon"},
    2298: {text:"Aviator Helm. A:109 D:84", test:"Aviator Helm"},
    2299: {text:"Raft Boat. A:86 D:110", test:"Raft Boat"},
    22000: {text:"Grip Kicker. A:111 D:84", test:"Grip Kicker"},
    22001: {text:"Fangtooth Fish. A:85 D:112", test:"Fangtooth Fish"},
    22002: {text:"Flash Gloves. A:120 D:90", test:"Flash Gloves"},
    22003: {text:"Hyper Jet Ski. A:91 D:121", test:"Hyper Jet Ski"},
    22004: {text:"Clipper Pistol. A:119 D:90", test:"Clipper Pistol"},
    22005: {text:"Giant Arapaima. A:92 D:120", test:"Giant Arapaima"},
    22006: {text:"Cut Boots. A:121 D:91", test:"Cut Boots"},
    22007: {text:"Formula Car. A:112 D:87", test:"Formula Car"},
    22008: {text:"Smooth Killer. 2908 A:86 D:113", test:"Smooth Killer"},
    22009: {text:"False Killer Whale. A:115 D:88", test:"False Killer Whale"},
    22010: {text:"Radio Scanner. A:87 D:114", test:"Radio Scanner"},
    22011: {text:"Prism Proto Boat. A:115 D:88", test:"Prism Proto Boat"},
    22012: {text:"Night Watch X6. A:95 D:124", test:"Night Watch X6"},
    22013: {text:"Mallomys Giant Rat. A:123 D:94", test:"Mallomys Giant Rat"},
    22014: {text:"Electromagnetic Shield. A:95 D:124", test:"Electromagnetic Shield"},
    22015: {text:"Clockwork Trike. A:125 D:96", test:"Clockwork Trike"},
    22016: {text:"Gemini Scythe. A:95 D:126", test:"Gemini Scythe"}   
};

var MW_SecretMissions = {
    2301:   {text:"Truck Hijacking (Easy)",                     test:"Truck Hijacking"},
    2302:   {text:"Bribe A Contact (Easy)",                     test:"Bribe A Contact"},
    2311:   {text:"Narco Trafficking (Easy)",                   test:"Narco Trafficking"},
    2315:   {text:"Assassinate The Witness (Easy)",             test:"Assassinate The Witness"}, 
    2317:   {text:"Kidnap The Governor's Daughter (Easy)",      test:"Kidnap The Governor's Daughter"}, 
    2303:   {text:"Bank Robbery (Medium)",                      test:"Bank Robbery"},
    2304:   {text:"Fight Off a Rival Mafia (Medium)",           test:"Fight Off A Rival Mafia"},
    2305:   {text:"Bribe A Government Official (Medium)",       test:"Bribe A Government Official"},
    2310:   {text:"Hijack An Ocean Liner (Medium)",             test:"Hijack An Ocean Liner"},
    2312:   {text:"Frame a Rival Don (Medium)",					test:"Frame a Rival Don Crown"},
    2316:   {text:"Take Over Airport Control (Medium)",         test:"Take Over Airport Control"},
    2306:   {text:"Steal A Dockyard Shipment (Hard)",           test:"Steal A Dockyard Shipment"},
    2307:   {text:"Take Out A Rival Operation (Hard)",          test:"Take Out A Rival Operation"},
    2308:   {text:"Transport Stolen Uranium (Hard)",            test:"Transport Stolen Uranium"},
    2309:   {text:"Evade The Coast Guard (Hard)",               test:"Evade The Coast Guard"},
	2313:	{text:"Steal Government Research (Hard)",			test:"Steal Government Research"},
	2314:	{text:"Fix the Triple Crown (Hard)",				test:"Fix the Triple Crown"},
    2399:   {text:"Unknown(new or limited) Missions"}
  };

var MW_DailyTake = {
    
    2401: {text:"Attack Point", test:"Attack Point"},
    2402: {text:"Defense Point", test:"Defense Point"},
    2403: {text:"Stamina Point", test:"Stamina Point"},
    2404: {text:"Energy Point", test:"Energy Point"},
    2405: {text:"Health Points", test:"Health Points"},
    2406: {text:"Cash (Ny)", test:"cash"},
    2407: {text:"Chips (Vegas)", test:"Chips"},
    2408: {text:"Real (Brazil)", test:"Real"},
    2409: {text:"Lira (Italy)", test:"Lira"},
    2410: {text:"Acetylene Torch", test:"Acetylene Torch"},
    2411: {text:"Gunpowder", test:"Gunpowder"},
    2412: {text:"Car Lift", test:"Car Lift"},
    2413: {text:"Cinder Block", test:"Cinder Block"},
    2414: {text:"Steel Girder", test:"Steel Girder"},
    2415: {text:"Vice", test:"Vice"},
    2416: {text:"Stone Column", test:"Stone Column"},
    2417: {text:"Cement Block", test:"Cement Block"},
    2418: {text:"Rivet", test:"Rivet"},
    2419: {text:"Set of Hidden Charges", test:"Set of Hidden Charges"},
    2420: {text:"Mint on the Pillow", test:"Mint on the Pillow"},
    2421: {text:"Boxer", test:"Boxer"},
    2422: {text:"Rail Ticket", test:"Rail Ticket"},
    2423: {text:"Impossible Odds (42/83)", test:"Impossible Odds"},
    2424: {text:"Serenity Pistol (85/43)", test:"Serenity Pistol"},
    2425: {text:"Sea Scale Armor (44/89)", test:"Sea Scale Armor"},
    2426: {text:"Waspguard (86/42)", test:"Waspguard"},
    2427: {text:"Concealable Camera", test:"Concealable Camera"},
    2428: {text:"Energy Refill",  test:"Energy Refill"}
};


var FV_general = {
    3050:   {text:"Accept",          img_test:/Do you want to collect (.*) Coins|Would you like (.*) coins instead/i}
};



//collection of all the icon tests.
FV_IconTest = {};
FV_IconTest[0] = FV_general;


/****  Start Wall Notification code ****/

// Process Wall Item

function WallItem() {
    this.Next       =   null;
    this.Action     =   '';
    this.BName      =   '';
    this.ActorName	=	'';
    this.AttachmentTitle = 	'';
    this.AppId      =   '';
    this.Type       =   '';
    this.Picture     =   '';
	this.message     =   '';
	this.text     =   '';
    this.Process    =   function() {


        function NextRequest(_delay1, _delay2) {
            if (bAutoRun) {
                if (Self.Next != null) {
                    //setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, getRandRange(_delay1*750,_delay1*1250));
					setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, 0);
                } else {
                    //setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, getRandRange(_delay2*750,_delay2*1250));
					setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, getRandRange(aParams[3]*750,aParams[3]*1250));
                }
            }
        }

    // Mafia Wars Wall Code
    function doMWStep1(_myUrl, _myParms) {
      //GM_log('WallItem doMWStep 1 - _myUrl=' + _myUrl + ', _myParms=' + _myParms);
      GM_xmlhttpRequest({
        method: 'GET', url:  _myUrl,
        headers: {
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
         try {
            var i1, i2, myUrl, myParms;
            var strTemp;
            var strDetails;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}
            strTemp = _responseDetails.responseText;

           if (EnableScript) {
	         var param = doFBParse(strTemp);
	         strTemp = param[2];
           }

           i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb');
 	       if (i1==-1) i1 = strTemp.indexOf('<form action="https://facebook.mafiawars.zynga.com/mwfb');
           if (i1!=-1) {
              //extract MW protected form
              i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
              //find URL
              i1 = strTemp.indexOf('"')+1; i2 = strTemp.indexOf('"',i1);
              myUrl = strTemp.slice(i1,i2);
              myUrl = myUrl.replace(/&amp;/g,'&');
              myParms = '';

              i1 = strTemp.indexOf('<input');
              while (i1!=-1) {
                if (myParms!='') myParms += '&'
                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                myParms += strTemp.slice(i1,i2)+'='
                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                myParms += escape(strTemp.slice(i1,i2));
                i1 = strTemp.indexOf('<input',i1);
              }
			  //LogPush(myUrl);
			  if ((Self.BName=='3Spin') || (Self.BName=='TinyURL-SecretStash') || (myUrl.indexOf('next_controller=') == -1)) doMWStep2b(myUrl,myParms); else
              //if ((Self.BName=='3Spin') || (Self.BName=='TinyURL-SecretStash')) doMWStep2b(myUrl,myParms); else
			  // next_controller=
              doMWStep2(myUrl,myParms);
           } else {		
              i1 = strTemp.indexOf("goURI(");
              if (i1==-1) throw {message:"Cannot find goURI(."}
              //extract goURI
              i1 += 7;
			  i2 = strTemp.indexOf("')",i1);
			  myUrl = strTemp.slice(i1,i2);
              myUrl = myUrl.replace(/\\x26/g,'&');
	          myUrl = myUrl.replace(/&amp;/g,'&');

              //myUrl = myUrl.replace(/http:\/\/apps.facebook.com\/inthemafia\/index.php/g,'http://facebook.mafiawars.zynga.com/mwfb/index2.php')
              //doMWStep2(myUrl,MW_Param);
			  doMWStep1a(myUrl,'');
			}

           } catch(err) {
			  LogPush('<b>' + Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>Error: WallItem doMWStep 1 - '+err.message + ': URL='+_myUrl);
              GM_log('Error: WallItem doMWStep 1 - '+err.message + ': URL='+_myUrl);
              NextRequest(0,aParams[3]);
          }
        }
      });
    }
    
    function doMWStep1a(_myUrl, _myParms) {
	  //GM_log('WallItem doMWStep 1a - _myUrl=' + _myUrl + ', _myParms=' + _myParms);
      GM_xmlhttpRequest({
        method: 'GET', url:  _myUrl,
        headers: {
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
          try {
           var i1, i2, myUrl, myParms, qname;
           var strTemp;
           var strDetails;

           if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}
           strTemp = _responseDetails.responseText;
           if (EnableScript) {
	         var param = doFBParse(strTemp);
	         strTemp = param[2];
           }

           i1 = strTemp.indexOf('<form id="auto_form" action="http://facebook.mafiawars.zynga.com/mwfb');
 	       if (i1 == -1) i1 = strTemp.indexOf('<form id="auto_form" action="https://facebook.mafiawars.zynga.com/mwfb');
		   if (i1 == -1) throw { message: 'Cannot find form id="auto_form"'}

           //extract MW protected form
           i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
           //find URL
			  i1 = strTemp.indexOf('http://',i1);
              if (i1 == -1) i1 = strTemp.indexOf('https://',i1);
              i2 = strTemp.indexOf('"',i1);
              myUrl = strTemp.slice(i1,i2);
              myUrl = myUrl.replace(/&amp;/g,'&');
/*
              myParms = '';
              i1 = strTemp.indexOf('<input');
              while (i1!=-1) {
                if (myParms!='') myParms += '&'
                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                myParms += strTemp.slice(i1,i2)+'='
                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                myParms += escape(strTemp.slice(i1,i2));
                i1 = strTemp.indexOf('<input',i1);
              }
*/
              doMWStep2(myUrl,MW_Param);

          } catch(err) {
			  LogPush('Error: WallItem doMWStep 1a - '+err.message + ': URL='+_myUrl);
              NextRequest(0,aParams[3]);
          }
        }
      });
    }

    function doMWStep2(_myUrl, _myParms) {
	  //GM_log('WallItem doMWStep 2 - _myUrl=' + _myUrl + ', _myParms=' + _myParms);
            GM_xmlhttpRequest({
                method: 'POST',
                url:  _myUrl,
                data: _myParms,
                headers: {
                'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-us,en;q=0.5',
                'Content-Type':    'application/x-www-form-urlencoded'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1, i2, strTemp, myUrl, myParms;

                        if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                        strTemp = _responseDetails.responseText;
						i1 = strTemp.indexOf('top.location.href = "');
                        if (i1 == -1) throw { message: "Cannot find top.location.href in page"}

                        // extract URL
						i1 = strTemp.indexOf('http://',i1);
						if (i1==-1) i1 = strTemp.indexOf('https://',i1);
                        i2 = strTemp.indexOf('"',i1);
                        myUrl = strTemp.slice(i1,i2);

                        myParms   =  'skip_req_frame=1&first_load=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;
                       //doMWStep2a(myUrl, myParms);

                        myUrl = myUrl.replace('apps.facebook.com/inthemafia/index.php', 'facebook.mafiawars.zynga.com/mwfb/index.php');
			            doMWStep2b(myUrl, _myParms);

                    } catch(err) {
						//LogPush('Error: WallItem doMWStep2 - '+err.message + ': URL='+_myUrl);					
						LogPush(strTemp.replace(/</g,'&lt;'));
						LogPush('<b>' + Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>Error: WallItem doMWStep 2 - '+err.message + ': URL='+_myUrl);
                        NextRequest(0,aParams[3]);
                    }
                }
            });
        }


    function doMWStep2a(_myUrl, _myParms) {
      //GM_log('WallItem doMWStep2a - _myUrl=' + _myUrl + ', _myParms=' + _myParms);
      GM_xmlhttpRequest({
        method: 'GET', url:  _myUrl,
        headers: {
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
         try {
          var i1,i2, i1b, i1c, i1d, myUrl, myParms;
          var strTemp, strTemp_all;
          var strDetails;

          if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

		  strTemp = _responseDetails.responseText;
           if (EnableScript) {
	         var param = doFBParse(strTemp);
	         strTemp = param[2];
           }

          i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb');
          if (i1==-1) i1 = strTemp.indexOf('<form action="https://facebook.mafiawars.zynga.com/mwfb');
          if (i1 == -1) throw { message: 'Cannot find form action= in page'}
    
              //extract MW protected form
              i1 = strTemp.indexOf('<form',i1); 
			  i2 = strTemp.indexOf('</form>',i1); 
			  strTemp = strTemp.slice(i1,i2);
              //find URL
              i1 = strTemp.indexOf('"')+1; 
			  i2 = strTemp.indexOf('"',i1);
              myUrl = strTemp.slice(i1,i2);
              myUrl = myUrl.replace(/&amp;/g,'&');

              myParms = '';
              i1 = strTemp.indexOf('<input');
              while (i1!=-1) {
                if (myParms!='') myParms += '&'
                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                myParms += strTemp.slice(i1,i2)+'='
                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                myParms += escape(strTemp.slice(i1,i2));
                i1 = strTemp.indexOf('<input',i1);
              }
              doMWStep2b(myUrl,myParms);

           } catch(err) {
			  LogPush('Error: WallItem doMWStep2a - '+err.message + ': URL='+_myUrl);
              NextRequest(0,aParams[3]);
          }
        }
      });
    }

    function doMWStep2b(_myUrl, _myParms) {
      //GM_log('WallItem doMWStep2b - _myUrl=' + _myUrl + ', _myParms=' + _myParms);
      GM_xmlhttpRequest({
      method: 'POST',
      url:  _myUrl, data: _myParms,
      headers: {
        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language':  'en-us,en;q=0.5',
        'Content-Type':   'application/x-www-form-urlencoded'
      },
      onload: function(_responseDetails) {
        try {    
          var i1, i2, strTemp;          
          if (_responseDetails.status != 200) throw {message:'Status 200 error'}

          strTemp = _responseDetails.responseText;
          i1 = strTemp.indexOf('action="');
          if (i1 == -1) throw { message: 'Cannot find action=" in page'}
          // extract URL
          i1 += 8;
          i2 = strTemp.indexOf('"',i1);
          myUrl = strTemp.slice(i1,i2);

          myParms = '';
          i1 = strTemp.indexOf('<input',i1);
          while (i1!=-1) {
            i1 = strTemp.indexOf('name="',i1)+6;
            i2 = strTemp.indexOf('"',i1);
            if (myParms=='')
               myParms = strTemp.slice(i1,i2)+'='
            else
               myParms += '&'+strTemp.slice(i1,i2)+'=';
            i1 = strTemp.indexOf('value="',i1)+7;
            i2 = strTemp.indexOf('"',i1);
            myParms += escape(strTemp.slice(i1,i2));
            i1 = strTemp.indexOf('<input',i1); 
          } 

          switch (Self.Type) {
             case 'MW_WarHelp':
                strNotice = '<b>' + Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')';
                doWarStep1(myUrl, myParms, strNotice,0);
                break;
             case 'MW_Missions':
                strNotice = '<b>' + Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')';
                doMissionStep1(myUrl, myParms, strNotice);
                break;
             case 'MW_DTV3':
                strNotice = '<b>' + Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')';
                doDailyTakeStep1(myUrl, myParms, strNotice);
                break;
             case 'MW_VegasSlots':
                doSlotsStep1(myUrl, myParms);
                break;
             case 'MW_CollectGift':                               
				if (Self.Action.indexOf('zyn.ga') != -1 || Self.Action.indexOf('fun.zynga.com') != -1 || Self.Action.indexOf('zynga.tm') != -1 || Self.Action.indexOf('next_action=fan_blast') != -1) {
				 	//if (family.indexOf('[NONE') != -1 || family.indexOf('FUN') != -1) {
					for (var i=0;i<15;i++) doCollectGift9(myUrl, myParms); //}
				} 
				doCollectGift3(myUrl, myParms);
                break;
             case 'Multi-Click':                               
				for (var i=0;i<15;i++) doCollectGift9(myUrl, myParms); //}
				doCollectGift3(myUrl, myParms);
                break;
             case 'MW_Levelupbonus':                               
				//if (family.indexOf('[NONE') != -1 || family.indexOf('FUN') != -1) {
				  for (var i=0;i<15;i++) doCollectGift9(myUrl, myParms); 
				//}
				doMWStep3(myUrl, myParms);
                break;
             case 'MW_Mission-Crew':
                doCollectGift3(myUrl, myParms);
                break;
             case 'MW_CollectEnergy':
                doCollectEnergy3(myUrl, myParms);
                break;
             case 'MW_3Spin':
                dospin(myUrl, myParms);
                break;
             case 'MW_AS':                               
				 if (getHoursTime('MW_astimer') == 0) {
				//if (family.indexOf('[NONE') != -1 || family.indexOf('FUN') != -1) {
				  for (var i=0;i<6;i++) doCollectGift9(myUrl, myParms); 
				//}
			    }
				doMWStep3(myUrl, myParms);
                break;
             case 'MW_SSportsBar':    
				 if (!timeLeftGM('MW_SSportsBarTimer')) {
				//if (family.indexOf('[NONE') != -1 || family.indexOf('FUN') != -1) {
				  for (var i=0;i<6;i++) doCollectGift9(myUrl, myParms); 
				//}
			    }
				doMWStep3(myUrl, myParms);
                break;				 
             case 'MW_Sportsbar':      
				//if (family.indexOf('[NONE') != -1 || family.indexOf('FUN') != -1) {
				  for (var i=0;i<6;i++) doCollectGift9(myUrl, myParms); 
				//}
				doMWStep3(myUrl, myParms);
                break;				 
             default:
                doMWStep3(myUrl,myParms);
				break;
          }                     
        
        } catch(err) {
			  LogPush('Error: WallItem doMWStep2b - '+err.message + ': URL='+_myUrl);
			 // LogPush(strTemp.replace(/</g,'&lt;'));
              NextRequest(0,aParams[3]);
        }
      }
    });
  }



    function doMWStep3(_myUrl, _myParms) {
       //GM_log('WallItem doMWStep3 - _myUrl=' + _myUrl + ', _myParms=' + _myParms);
            GM_xmlhttpRequest({
                method: 'POST',
                url:  _myUrl,
                data: _myParms,
                headers: {
                    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-us,en;q=0.5',
                    'Content-Type':    'application/x-www-form-urlencoded'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1, i21, i3, i41, i5, i6;
						var myUrl, myParms;
                        var strTemp;
                        var strWarMessage, strWarName, strWarNotice;
                        var strWarReward, strMissionLevel;
                        var strNotice;

                        var oDiv, oSnapShot;
                        var bSkipItem;

                        var flashvars;

					    strNotice   = '<b>' + Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')';

                        if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                        strTemp =   _responseDetails.responseText;

                            i1  =   strTemp.indexOf('<span id="user_health">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_health = strTemp.slice(i1+23,i2);
                            } 

					        if ((parseInt(aParams[2570]) == 1) && parseInt(user_health) < parseInt(aParams[2571]) && parseInt(user_health) > 19)
							   ReHeal(); 
							else if ((parseInt(aParams[2572]) == 1) && parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();
							
                        // simple request (ie not a war)
                        i1 = strTemp.indexOf('<td class="message_body">');
                        i2 = strTemp.indexOf('<div style=\\"color: white; font-size: 18px; margin-bottom: 10px; font-weight: bold\\">');
                        i3 = strTemp.indexOf('<div class="ach_celeb_message">');
                        i4 = strTemp.indexOf('<div style="color: rgb(255, 255, 255); font-size: 12px; margin-right: 5px;">');
                        i5 = strTemp.indexOf('<div style="color: #fff; font-size: 12px; margin-right: 5px;">');				
						i6 = strTemp.indexOf("<div style ='text-align:left;width:700px; border:1px solid #666; padding:10px 20px; margin: 5px 0px;'>");
                                             
                        if (i2 != -1) {
                            i1 = strTemp.indexOf('>',i2)+1;
                            i2 = strTemp.indexOf('<div style=\\"height:',i2);
                            strTemp = strTemp.slice(i1,i2);
                            strTemp = strTemp.replace(/<div(.*?)>/g,'<div>');                           
                            strNotice += '<br>' + strTemp;
						    if (strNotice.indexOf('Cannot Receive Reward') == -1)
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);

                        } else if (i3 != -1) {
                            i1 = i3;
                            i2 = strTemp.indexOf('<div style="clear: both;">');
                            i2 = strTemp.indexOf('</div>',i2);
                            i2 = strTemp.indexOf('</div>',i2+1);
                            strTemp = strTemp.slice(i1,i2);
                            strNotice += '<br><table><tr><td>' + strTemp + '</td></tr></table>';
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);

                        } else if (i4 != -1) {
                            i1 = i4;
                            i2 = strTemp.indexOf('</div>',i1);
                            strTemp = strTemp.slice(i1,i2);
                            strNotice += '<br><table><tr><td>' + strTemp + '</td></tr></table>';
                            strNotice = strNotice.replace(/color: rgb\(255, 255, 255\)/g, '');
							LogPush(strNotice);
                            NextRequest(0,aParams[3]);

                        } else if (i5 != -1) {
                            i1 = i5;
                            i2 = strTemp.indexOf('</div>',i1);
                            strTemp = strTemp.slice(i1,i2);
                            strNotice += '<br><table><tr><td>' + strTemp + '</td></tr></table>';
							strNotice = strNotice.replace(/color: #fff/g, '');
							LogPush(strNotice);
                            NextRequest(0,aParams[3]);

                        } else if (i6 != -1) {
                            i1 = i6+102;
                            i2 = strTemp.indexOf('</div>',i1);
                            strTemp = strTemp.slice(i1,i2);
                            strNotice += '<br><table><tr><td>' + strTemp + '</td></tr></table>';
							//strNotice = strNotice.replace(/color: rgb\(102, 102, 102\)/g, '');
                            //if (Self.Type == 'MW_FreeGift') {
	                          if (strTemp.indexOf('You have already claimed the maximum number of') !=-1) {
							  	  if (getHoursTime('MW_freegifttimer') == 0) {
									setGMTime('MW_freegifttimer', '3 hour');
									strNotice += '<br><font color="red">Set MW_freegifttimer:</font> ' + getHoursTime('MW_freegifttimer');
								   }
		                       } 
							//}
							LogPush(strNotice);
                            NextRequest(0,aParams[3]);

                        } else if (i1 != -1) {
                            i2 = strTemp.indexOf('</td>',i1+25);
                            strTemp = strTemp.slice(i1+25,i2); 

                            if (Self.Type == 'MW_FreeGift') {
	                          if (strTemp.indexOf('You have already claimed the maximum number of') !=-1 || strTemp.indexOf('Sorry, you can only get one secret stash per day') !=-1) {
		                          strNotice += '<br>You have already claimed the maximum number of Free Gifts for today.';
							  	  if (getHoursTime('MW_freegifttimer') == 0) {
									setGMTime('MW_freegifttimer', '3 hour');
									strNotice += '<br><font color="red">Set MW_freegifttimer:</font> ' + getHoursTime('MW_freegifttimer');
								   }
		                       } 
							  LogPush(strNotice);
							  NextRequest(0,aParams[3]);	  

						    } else if (strTemp.indexOf('you can only help 25 friends per day per city') !=-1 )  {
							    strNotice += DoJobHelpMsg(Self.Type);

                            } else if (strTemp.indexOf('You can only receive 10 free iced fight boosts per day') !=-1) {
									 if (getHoursTime('MW_icedbonustimer') == 0) {
									    setGMTime('MW_icedbonustimer', '1 hour');
										strNotice += '<BR><B>Set MW_icedbonustimer: ' + getHoursTime('MW_icedbonustimer') + '</B>';
								     }
/*                            } else if (strTemp.indexOf('You can only collect 10 Gun Barrels a day') !=-1) {
								    if (getHoursTime('MW_S_GunTimer') == 0) {
									    setGMTime('MW_S_GunTimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_S_GunTimer:</font> ' + getHoursTime('MW_S_GunTimer');
								     } */
                            } else if (strTemp.indexOf('You can only receive 10 free fight boosts per day') !=-1) {
								    if (getHoursTime('MW_fightboosttimer') == 0) {
									    setGMTime('MW_fightboosttimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_fightboosttimer:</font> ' + getHoursTime('MW_fightboosttimer');
								     }
                            } else if (strTemp.indexOf('You helped out, but you can only collect 30 boosts from feeds per day') !=-1) {
								    if (getHoursTime('MW_2XLootTimer') == 0) {
									    setGMTime('MW_2XLootTimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_2XLootTimer:</font> ' + getHoursTime('MW_2XLootTimer');
								     }
                            } else if (strTemp.indexOf('You have reached your limit for collecting a') !=-1) {
								    if (getHoursTime('MW_HelpGiftTimer') == 0) {
									    setGMTime('MW_HelpGiftTimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_HelpGiftTimer:</font> ' + getHoursTime('MW_HelpGiftTimer');
								     }
                            } else if (strTemp.indexOf('Sorry, you can only collect 20 rewards a day') !=-1 || strTemp.indexOf('Sorry, you may only accept 10 rewards a day') !=-1) {
								    if (getHoursTime('MW_missionrewardtimer') == 0) {
									    setGMTime('MW_missionrewardtimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_missionrewardtimer:</font> ' + getHoursTime('MW_missionrewardtimer');
								     }
                            } else if (strTemp.indexOf('Sorry, you have too many Rob Squads') != -1 || strTemp.indexOf('you can only collect 5 Rob Squads') != -1) {
								    if (getHoursTime('MW_robsquadtimer') == 0) {
									    setGMTime('MW_robsquadtimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_robsquadtimer:</font> ' + getHoursTime('MW_robsquadtimer');
								     }
                            } else if (strTemp.indexOf('Sorry, you have already collected your bonus from 10 friends') !=-1) {
								    if (getHoursTime('MW_fighteventtimer') == 0) {
									    setGMTime('MW_fighteventtimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_fighteventtimer:</font> ' + getHoursTime('MW_fighteventtimer');
								     }
                            } else if (strTemp.indexOf('Loot event Bonus from 10 friends') !=-1) {
								    if (getHoursTime('MW_lootdropeventtimer') == 0) {
									    setGMTime('MW_lootdropeventtimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_lootdropeventtimer:</font> ' + getHoursTime('MW_lootdropeventtimer');
								     }
                            } else if (strTemp.indexOf('from 20 friends.') !=-1) {
								    if (getHoursTime('MW_holidaybonustimer') == 0) {
									    setGMTime('MW_holidaybonustimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_holidaybonustimer:</font> ' + getHoursTime('MW_holidaybonustimer');
								     }
/*                            } else if (strTemp.indexOf('You collected the max number of Harmless Spiders') !=-1) {
								    if (getHoursTime('MW_eventwalltimer') == 0) {
									    setGMTime('MW_eventwalltimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_eventwalltimer:</font> ' + getHoursTime('MW_eventwalltimer');
								     } */
                            } else if (strTemp.indexOf('you have already collected the maximum amount of times allowed from these stashes today') !=-1) {
								    if (getHoursTime('MW_getparttimer') == 0) {
									    setGMTime('MW_getparttimer', '3 hour');
										strNotice += '<br><font color="red">Set MW_getparttimer:</font> ' + getHoursTime('MW_getparttimer');
								     }
                            } else if (strTemp.indexOf('You have claimed the maximum number of feeds of this type for today') !=-1) {
								    if (getHoursTime('MW_masterytimer') == 0) {
									    setGMTime('MW_masterytimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_masterytimer:</font> ' + getHoursTime('MW_masterytimer');
								     }
                            } else if ((strTemp.indexOf('You are at max capacity') !=-1) || strTemp.indexOf('You have already collected 20') !=-1) {
								    if (getHoursTime('MW_bossfightv2timer') == 0) {
									    setGMTime('MW_bossfightv2timer', '1 hour');
										strNotice += '<br><font color="red">Set MW_bossfightv2timer:</font> ' + getHoursTime('MW_bossfightv2timer');
								     }
                            } else if (strTemp.indexOf('You have sent the maximum amount of') !=-1) {
								    if (getHoursTime('MW_PSpecialTimer') == 0) {
									    setGMTime('MW_PSpecialTimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_PSpecialTimer:</font> ' + getHoursTime('MW_PSpecialTimer');
								     }
                            } else if (strTemp.indexOf('You have already sent 10 parts today') !=-1) {
								    if (getHoursTime('MW_SSportsBarTimer') == 0) {
									    setGMTime('MW_SSportsBarTimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_SSportsBarTimer:</font> ' + getHoursTime('MW_SSportsBarTimer');
								     }
                            } else if (strTemp.indexOf('You have already collected 3 parts today') !=-1) {
								// You have already collected 3 parts today
								    if (getHoursTime('MW_SportsbarTimer') == 0) {
									    setGMTime('MW_SportsbarTimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_SportsbarTimer:</font> ' + getHoursTime('MW_SportsbarTimer');
								     }
                            } else if (strTemp.indexOf('You have already collected the maximum of 3 bonus rewards today') !=-1) {
								    if (getHoursTime('MW_levelupbonustimer') == 0) {
									    setGMTime('MW_levelupbonustimer', '3 hour');
										strNotice += '<br><font color="red">Set MW_levelupbonustimer:</font> ' + getHoursTime('MW_levelupbonustimer');
								     }
/*                            } else if (strTemp.indexOf('You have received the maximum number of turkeys') !=-1) {
								    if (getHoursTime('MW_TurkeyTimer') == 0) {
									    setGMTime('MW_TurkeyTimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_TurkeyTimer:</font> ' + getHoursTime('MW_TurkeyTimer');
								     } */
                            } else if (strTemp.indexOf('already collected the maximum number of gifts from these requests today') !=-1) {
								    if (getHoursTime('MW_astimer') == 0) {
									    setGMTime('MW_astimer', '1 hour');
										strNotice += '<br><font color="red">Set MW_astimer:</font> ' + getHoursTime('MW_astimer');
								     }
                            } else if (strTemp.indexOf('You have already helped 5 people today') !=-1) {
								   strNotice += DoSupplyHelpMsg(Self.Type);
							
                            }


				   if (strTemp.indexOf('Congratulations') != -1 || strTemp.indexOf('To celebrate his recent promotion') != -1) {
				      LogPush2(strNotice + strTemp);
				      juststart = 0;
                   } else if (strTemp.indexOf('You have already collected the maximum of 3 bonus rewards today') !=-1) {
					  if (getHoursTime('MW_levelupbonustimer') == 0) {
					    setGMTime('MW_levelupbonustimer', '3 hour');
						strNotice += '<br><font color="red">Set MW_levelupbonustimer:</font> ' + getHoursTime('MW_levelupbonustimer');
					  }
				   }


                            // look for button used to accept wall notification
                            //i1 = strNotice.indexOf('><a href="');

							//if (strNotice.indexOf('><a href="') !=-1 && (strNotice.indexOf('<span>Accept') !=-1 || strNotice.indexOf('<span>Collect') !=-1)) {
                            if (strTemp.indexOf('><a href="') !=-1 && strTemp.indexOf('gift back')==-1 && strTemp.indexOf('Send More Materials')==-1) {

							//} else if (strNotice.indexOf('><a href="') !=-1 && strNotice.indexOf('xw_action=view') ==-1) {
                                i1 = strTemp.indexOf('><a href="');
                                i2 = strTemp.indexOf('"',i1+10);
                                // look for button to accept the job, gift, etc

                                myUrl =  strTemp.slice(i1+10,i2);
                                myUrl =  myUrl.replace(/\s/g, '%20');

                                myParms  = 'ajax=1&liteload=1';
                                myParms += '&sf_xw_user_id=' + escape(local_xw_user_id);
                                myParms += '&sf_xw_sig=' + local_xw_sig;

                                doMWStep4(myUrl, myParms);

                            } else if (strTemp.indexOf('has received all the help allowed for today') !=-1 || strTemp.indexOf('has passed out all') !=-1) {
                                i1 = strTemp.indexOf('<div style="fl');
                                i1 = strTemp.indexOf('>',i1)+1;
                                i2 = strTemp.indexOf('</div>');
								strNotice += '<br>' + strTemp.slice(i1,i2);
                                if (bShowDetail) LogPush(strNotice); 
                                NextRequest(0,aParams[3]);

                            } else if (strTemp.indexOf('<div class="ach_celeb_message">') !=-1 ) {
                                i1 = strTemp.indexOf('<div class="ach_celeb_message">');
                                i2 = strTemp.indexOf('<div style="clear: both;">',i1);
                                i2 = strTemp.indexOf('</div>',i2);
                                i2 = strTemp.indexOf('</div>',i2);
								strNotice += '<br>' + strTemp.slice(i1,i2);
								LogPush(strNotice);
                                NextRequest(0,aParams[3]);

                            } else if (strTemp.indexOf('<div style="float: left; width: 90px;">') !=-1 ) {
                                i1 = strTemp.indexOf('<div style="float: left; width: 90px;">');
                                i1 = strTemp.indexOf('<img src=',i1);
                                i2 = strTemp.indexOf('</div>',i1);
                                i2 = strTemp.indexOf('</div>',i2+6);
								strNotice += '<br>' + strTemp.slice(i1,i2);
								strNotice = strNotice.replace(/<div(.*?)>/g,'<div>');
								LogPush(strNotice); 
                                NextRequest(0,aParams[3]);
								
                            } else {
                                //Remove and scripts and white text colour
                                strTemp = strTemp.replace(/<script(.|\s)*?\/script>/g, '');
                                strTemp = strTemp.replace(/color: rgb\(255, 255, 255\)/g, '');
                                strTemp = strTemp.replace(/color: #fff/g, '');
                                strTemp = strTemp.replace(/<a(.|\s)*?\/a>/g, '');
                                strTemp = strTemp.replace(/float:(.|\s)*?\;/g, '');
                                strTemp = strTemp.replace('<img src="https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/bonus.png">', '');
								strTemp = strTemp.replace('<img src="https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/congrats.png">', '');

                                strNotice += '<br>' + strTemp;
                                //if (!bShowDetail) strTemp = strTemp.replace(/<img(.|\s)*?>/g, '');

                                if (bShowDetail) LogPush(strNotice);
                                else {
                                    if (strNotice.indexOf('You are too late') == -1 && strNotice.indexOf('too many friends help today') == -1 
	                                && strNotice.indexOf('You cannot') == -1 && strNotice.indexOf('you may only') == -1
	                                && strNotice.indexOf('You are at max') == -1
	                                && strNotice.indexOf('collect from a feed once') == -1)	 	 
                                    LogPush(strNotice);                                
                                }
								NextRequest(0,aParams[3]);
                            }

                        } else {
							//LogPush(strTemp.replace(/</g,'&lt;'));
                            strNotice += '<BR>Error processing wall notification.  Cannot find results on page';
							LogPush(strNotice);
                            NextRequest(0,aParams[3]);
                        }

                    } catch(err) {
                        LogPush(strNotice + '<br>Error: WallItem DoMWStep 3 - ' + err.message);
                        NextRequest(0,aParams[3]);
                    }
                }
            } ) 
        }
       

        function doMWStep4(_myUrl, _myParms) {
            //GM_log('WallItem doMWStep3 - _myUrl=' + _myUrl + ', _myParms=' + _myParms);
            GM_xmlhttpRequest({
                method: 'POST',
                url:  _myUrl,
                data: _myParms,
                headers: {
                    'Accept':           '*/*',
                    'Accept-Language':  'en-us,en;q=0.5',
                    'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1,i2,i3,i4;
                        var strTemp;
                        var strNotice;

                        if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}
                        strTemp =   _responseDetails.responseText;

                        if (strTemp.indexOf('<div class="ach_celeb_image"') !=-1) {
                            i1 = strTemp.indexOf('<div class="ach_celeb_image"');
                            i2 = strTemp.indexOf('<div class="ach_celeb_block">',i1);
                            i2 = strTemp.indexOf('<div class="ach_celeb_block">',i2+1)
                            strNotice = strTemp.slice(i1,i2);

                        } else if (strTemp.indexOf('<td class="message_body">') !=-1) {
                            i1 = strTemp.indexOf('<td class="message_body">');
                            i2 = strTemp.indexOf('</td>',i1+25);
							strNotice = strTemp.slice(i1+25,i2);                             
                        } else {
                            strNotice = 'Accept button was pushed, but could not find responce.  Most likely these items are NOT WORKING (ZYNGA ISSUE).';
                        }

                        strNotice = strNotice.replace(/<script(.|\s)*?\/script>/g, '');
                        strNotice = strNotice.replace(/color: rgb\(255, 255, 255\)/g, '');
                        strNotice = strNotice.replace(/color: #fff/g, '');
                        strNotice = strNotice.replace('<img src="http://zyngapv.hs.llnwd.net/e6/mwfb/graphics/bonus.png">', '');
						//if (!bShowDetail) strNotice = strNotice.replace(/<img(.|\s)*?>/g, '');

                        //GM_log('strNotice = ' + strNotice);
                        //if (strNotice!='') 
                        if (bShowDetail) {
                            LogPush('<b>' + Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br><table><tr><td>' + strNotice+'</td><tr></table>');								  
						} else {
                            if (strNotice.indexOf('You are too late') == -1 && strNotice.indexOf('too many friends help today') == -1 
	                           && strNotice.indexOf('for today') == -1 && strNotice.indexOf('You cannot') == -1
	                           && strNotice.indexOf('have already') == -1 && strNotice.indexOf('You have already') == -1 && strNotice.indexOf('collect from a feed once') == -1) 
                            LogPush('<b>' + Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br><table><tr><td>' + strNotice+'</td><tr></table>');
                        }

                        NextRequest(0,aParams[3]);
                    } catch(err) {
                        LogPush('<b>' + Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>Error: WallItem DoMWStep 4 - ' + err.message);
                        NextRequest(0,aParams[3]);
                    }

                }
            });
		}


    function doSlotsStep1(_myUrl, _myParms) {
       //GM_log('WallItem doSlotsStep1 - _myUrl=' + _myUrl + ', _myParms=' + _myParms);
       GM_xmlhttpRequest({
           method: 'POST',
           url:  _myUrl,
           data: _myParms,
           headers: {
               'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
               'Accept-Language': 'en-us,en;q=0.5',
               'Content-Type':    'application/x-www-form-urlencoded'
           },
           onload: function(_responseDetails) {
           try {
              var i1, i2, myUrl, myParms;
              var strTemp;
              var strNotice;
              var oDiv, oSnapShot;
              var bSkipItem;
              var flashvars;

              if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

              strTemp =   _responseDetails.responseText;
 	          strNotice   = '<b>' + Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')';

             i1  =   strTemp.indexOf('<span id="user_health">');
             if (i1!=-1) {
                i2      =   strTemp.indexOf('</span>',i1);
                user_health = strTemp.slice(i1+23,i2);
             } 

					        if ((parseInt(aParams[2570]) == 1) && parseInt(user_health) < parseInt(aParams[2571]) && parseInt(user_health) > 19)
							   ReHeal(); 
							else if ((parseInt(aParams[2572]) == 1) && parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();

            GM_log('Doing Slots');
            flashvars = null;
            // Find slot values;
            if (strTemp.indexOf('var flashvars = {mw_app:"slotmachine_vegas"') !=-1 ) {
               i1 = strTemp.indexOf('var flashvars = {mw_app:"slotmachine_vegas"');
               i2 = strTemp.indexOf(';swfobject',i1);
               strTemp = strTemp.slice(i1,i2);
               eval(strTemp);
            } else if (strTemp.indexOf('var flashvars = {mw_app:\\"slotmachine_vegas\\"') !=-1 ) {
               i1 = strTemp.indexOf('var flashvars = {mw_app:\\"slotmachine_vegas\\"');
               i2 = strTemp.indexOf(';swfobject',i1);
               strTemp = strTemp.slice(i1,i2);
               strTemp = eval("'"+ strTemp+"'");
               eval(strTemp);
            }

            if (flashvars!= null) {
               myUrl    = flashvars.mw_supersecret_url+'/';
               myUrl   += unescape(flashvars.spinCallback);
               myUrl   += "&uid="+ flashvars.mw_user_id;
               myUrl   += "&betAmt=1";
               if (flashvars.friend_id==undefined)
                   myUrl   += "&friend_id=none";
               else
                    myUrl   += "&friend_id="+ flashvars.friend_id;
               myParms = 'ajax=1&liteload=1';
               myParms += '&sf_xw_sig=' + local_xw_sig;
               myParms += '&sf_xw_user_id=' + escape(local_xw_user_id);

               GM_log('initial free spins: ' + flashvars.freeSpins);
               if (flashvars.freeSpins>0) {
                   strNotice += '<br>Playing ' + flashvars.friend_name+"'s slot machine";
                   doSlotsStep2(myUrl, myParms, strNotice);
               } else {
                   strNotice += '<br>Mafia Wars Slots:</b><br>Skipping Slot machine: No Free Spins';
				   if (getHoursTime('MW_SlotsTimer') == 0) {
					  setGMTime('MW_SlotsTimer', '1 hour');
						strNotice += '<br>Set MW_SlotsTimer: ' + getHoursTime('MW_SlotsTimer');
				   }
                   LogPush(strNotice);
                   NextRequest(0,aParams[3]);
               }

            } else {
                LogPush('Error finding slot machine');
                strNotice += '<br>Mafia Wars Slots:</b><br>Error finding slot machine';
                LogPush(strNotice);
                NextRequest(0,aParams[3]);
            }


           } catch(err) {
              LogPush(strNotice + '<br>Error: WallItem doSlotsStep1 - ' + err.message);
              NextRequest(0,aParams[3]);
           }
        }
      });
	}

    function doSlotsStep2(_myUrl, _myParms, _strNotice) {
      //GM_log('WallItem doSlotsStep2 - _myUrl=' + _myUrl + ', _myParms=' + _myParms);
            GM_xmlhttpRequest({
                method: 'POST',
                url:  _myUrl,
                data: _myParms,
                headers: {
                    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-us,en;q=0.5',
                    'Content-Type':    'application/x-www-form-urlencoded'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1,i2, i3, i4, myUrl, myParms;
                        var strTemp;
                        var strWarMessage, strWarName, strWarNotice;
                        var strWarReward, strMissionLevel;
                        var strNotice;

                        var oDiv, oSnapShot;
                        var bSkipItem;

                        var flashvars, slot_data;

                        if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                        strTemp =   _responseDetails.responseText;
                            i1  =   strTemp.indexOf('<span id="user_health">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_health = strTemp.slice(i1+23,i2);
                            } 

					        if ((parseInt(aParams[2570]) == 1) && parseInt(user_health) < parseInt(aParams[2571]) && parseInt(user_health) > 19)
							   ReHeal(); 
							else if ((parseInt(aParams[2572]) == 1) && parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();

                        //find slot data
                        i1 = strTemp.indexOf('{');
                        strTemp = 'var flashvars = ' + strTemp.slice(i1);
                        eval(strTemp);
                        slot_data = JSON.parse(flashvars.data)

                        //update message
                        strNotice = _strNotice + "<br>Pulling the arm";
                        if (slot_data.json_data.payout>0) strNotice +="<br>You won " + slot_data.json_data.payout+" coins";
                        if (slot_data.json_data.itemName != null ) strNotice +="<br>You Won " + slot_data.json_data.itemName;
                        if ((slot_data.json_data.msg != undefined) && (slot_data.json_data.msg != "") ) strNotice +="<br>" + slot_data.json_data.msg;

                        GM_log('free spins remaining ' + slot_data.json_data.freeSpins);

                        //check for free spins
                        if (slot_data.json_data.freeSpins > 0) {
                            //spin the slot machine again.
                            doSlotsStep2(_myUrl, _myParms, strNotice)
                        } else {
                            GM_log('Slot machine out of free spins');
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);
                        }

                    } catch(err) {
                        LogPush('Error: WallItem doSlotsStep2 - ' + err.message);
                        NextRequest(0,aParams[3]);
                    }
                }
            } )
        }


        function doMissionStep1(_myUrl, _myParms, _strNotice) {
            GM_log('WallItem doMissionStep1');

            GM_xmlhttpRequest({
                method: 'POST',
                url:  _myUrl,
                data: _myParms,
                headers: {
                    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-us,en;q=0.5',
                    'Content-Type':    'application/x-www-form-urlencoded'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1,i2, i3, i4, myUrl, myParms;
                        var strTemp;
                        var strMissionName, bSkipMission;
                        var strNotice;

                        var oDiv, oSnapShot;
                        var bSkipItem;

                        var strMissionLevel;
                        var strMissionJob;

                        if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                        strTemp =   _responseDetails.responseText;
                            i1  =   strTemp.indexOf('<span id="user_health">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_health = strTemp.slice(i1+23,i2);
                            } 

					        if ((parseInt(aParams[2570]) == 1) && parseInt(user_health) < parseInt(aParams[2571]) && parseInt(user_health) > 19)
							   ReHeal(); 
							else if ((parseInt(aParams[2572]) == 1) && parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();

                        if (strTemp.indexOf('Operation has expired.')!=-1) {
                            strNotice = _strNotice+'<br>Mission has expired - Wall.';
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);
                        } else if (strTemp.indexOf('Sorry, this operation is already full.')!=-1) {
                            strNotice = _strNotice+'<br>Sorry, this mission is already full - Wall.';
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);
                        } else if (strTemp.indexOf('Successfully joined the operation')!=-1) {
                            strNotice = _strNotice+'<br>Successfully joined the mission - Wall.';
							user_socialmissions = user_socialmissions + 1;
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);
                        } else if (strTemp.indexOf('You are already a member of this operation')!=-1) {
                            strNotice = _strNotice+'<br>You are already a member of this mission - Wall.';
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);
                        } else if (strTemp.indexOf('Can only help in 10 operations at a time.')!=-1) {
                             strNotice = _strNotice+'<br>Can only help in 10 missions at a time - Wall.';
                             LogPush(strNotice);
                            NextRequest(0,aParams[3]);
                        } else if (strTemp.indexOf('<div class="doTaskButton">')!=-1) {
	                        // doTaskButton will only show up if you have successfully joined a mission
                            strNotice = _strNotice+'<br>Successfully joined the mission - Wall.';
							user_socialmissions = user_socialmissions + 1;
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);
                        } else if (strTemp.indexOf('<div class="missionSelectorButton">')!=-1) {
	                    	// found some select buttons
	                    	
	                    	//Try again notice
	                        if (strTemp.indexOf('Sorry, that position has already been taken. Try another one.')!=-1) {
	                            strNotice += _strNotice+'<br>Sorry, that position has already been taken. Try another one - Wall.';
	                        }
	                       
							// find the mission's name
							if ( strTemp.indexOf('<div class="missionSelectHeaderTitle">') != -1) {
								i1 = strTemp.indexOf('<div class="missionSelectHeaderTitle">');
								i2 = strTemp.indexOf('</div>',i1);
							    strMissionName = strTemp.slice(i1+38,i2);
							    bSkipMission = true;
							    
							    for (iMission in MW_SecretMissions) {
								if (iMission==2399) {
								    GM_log('Processing Unknown Mission');			                      
								    if (aParams[2399]==true) bSkipMission = false;
								    break;
								} else if (strMissionName.toUpperCase().indexOf(MW_SecretMissions[iMission].test.toUpperCase()) != -1) {
								    if (aParams[iMission] == true) bSkipMission = false;
								    GM_log('Processing '+strMissionName);
								    break;
								} else {
								    //GM_log('Skipping '+strMissionName);
								}
							    }
							} else {
							    // this is for repeat searches.
							    bSkipMission = true;
							    LogPush('Error Reading Mission');
							    GM_log(strTemp);
							}

							if (!bSkipMission) {
								i1 = strTemp.indexOf('<div class="missionSelectorButton">');
                            // process a mission request
                            i3 = strTemp.indexOf('<div id="positionSelector"');
                            i4 = strTemp.indexOf('</table>')+8;
                            oDiv = document.createElement('div');
	                            oDiv.innerHTML = strTemp.slice(i3,i4)+'</div>';
                            myUrl    = document.location.protocol+'//facebook.mafiawars.zynga.com/mwfb/';
                            // find all the possible jobs
                            i2 = 0;
	                            if (aParams[2023]=='both') {
                                //oSnapShot = getSnapshot('.//div[@class="missionSelectorButton"]',oDiv);
								oSnapShot = getSnapshot('.//div[@class="missionSelectorBox"]',oDiv);
								bSkipItem = true;
                                //oSnap = oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).innerHTML;
								//if ((oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).innerHTML.indexOf('<dd style="margin-left: 60px;" class="stamina')!=-1)) 
								if (oSnapShot.snapshotItem(0).innerHTML.indexOf(' class="stamina')!=-1)
									{
									   if (user_stamina > parseInt(aParams[9052])) { 
									      user_stamina = user_stamina - 250;
								          document.getElementById('user_stamina').innerHTML= '<Font Color="blue"><B>Stamina</B></font><BR>' + user_stamina;
									      bSkipItem = false;
										  //LogPush(_strNotice+'<br>Accept Mission Wall(Both)-stamina: ' + user_stamina + ' (' + aParams[9052] + ')');
										  _strNotice  += '<br>Accept Mission Wall(Both)-stamina: ' + user_stamina + ' (' + aParams[9052] + ')';
								      } else {
										  if (aParams[2561]==1) {
										    aParams[2023]='energy';
										    LogPush(_strNotice+'<br>Skip Mission Wall(Both)-stamina: ' + user_stamina + ' (' + aParams[9052]+') -> chang to energy');
										  }
									  } 
									}									
								//if ((oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).innerHTML.indexOf('<dd style="margin-left: 60px;" class="energy')!=-1)) 
								if (oSnapShot.snapshotItem(0).innerHTML.indexOf(' class="energy')!=-1)
									{ 
									    if (user_energy > parseInt(aParams[9051])) {
									      user_energy = user_energy - 250;
								          document.getElementById('user_energy').innerHTML= '<Font Color="blue"><B>Energy</B></font><BR>' + user_energy;
									      bSkipItem = false;
										  //LogPush(_strNotice+'<br>Accept Mission Wall(Both)-energy: ' + user_energy + ' (' + aParams[9051] + ')');
										  _strNotice  += '<br>Accept Mission Wall(Both)-energy: ' + user_energy + ' (' + aParams[9051] + ')';
								      } else {
										  LogPush(_strNotice+'<br>Skip Mission Wall(Both)-energy:' + user_energy + ' (' + aParams[9051]+')');
									  }
									}

                                if (!bSkipItem)
								{
								oSnap = oSnapShot.snapshotItem(0).innerHTML;
                                i1 = oSnap.indexOf('inner_page')+13;
                                i2 = oSnap.indexOf("'",i1);
                                i3 = oSnap.indexOf('<div class="positionName"');
                                i3 = oSnap.indexOf('http',i3);
                                i4 = oSnap.indexOf(')',i3);
                                }

	                            } else {
                                oSnapShot = getSnapshot('.//div[@class="missionSelectorBox"]',oDiv);
	                                //var oSnapShot2 = getSnapshot('.//div[@class="missionSelectorButton"]',oDiv);
                                for (var i=0;i<oSnapShot.snapshotLength;i++) {
	                                    //avoid those job with two items
	                                    if ((oSnapShot.snapshotItem(i).innerHTML.indexOf(' class="stamina')!=-1) && (oSnapShot.snapshotItem(i).innerHTML.indexOf(' class="energy')!=-1)) {
		                                	// skip item uses both energy and stamina
	                                	} else if (oSnapShot.snapshotItem(i).innerHTML.indexOf('<dd style="margin-left: 60px;" class="'+aParams[2023])!=-1) {
											bSkipItem = true;
											   if (user_energy > parseInt(aParams[9051]) && aParams[2023].toUpperCase() =='ENERGY') { 
												   user_energy = user_energy - 250; 
												   bSkipItem = false; 
												   document.getElementById('user_energy').innerHTML= '<Font Color="blue"><B>Energy</B></font><BR>' + user_energy;
												   //LogPush(_strNotice+'<br>Accept Mission Wall(energy)- ' + user_energy + ' (' + aParams[9051] + ')');
												   _strNotice  += '<br>Accept Mission Wall(energy)- ' + user_energy + ' (' + aParams[9051] + ')';
												}
											   if (user_stamina > parseInt(aParams[9052]) && aParams[2023].toUpperCase() =='STAMINA') { 
												   user_stamina = user_stamina - 250; 
												   bSkipItem = false; 
												   document.getElementById('user_stamina').innerHTML= '<Font Color="blue"><B>Stamina </B></font><BR>' + user_stamina; 
												   //LogPush(_strNotice+'<br>Accept Mission Wall(stamina)- ' + user_stamina + ' (' + aParams[9052] + ')');
												   _strNotice  += '<br>Accept Mission Wall(stamina)- ' + user_stamina + ' (' + aParams[9052] + ')';
											    }
                                           if (!bSkipItem) {
                                               oSnap = oSnapShot.snapshotItem(i).innerHTML;
                                               i1 = oSnap.indexOf('inner_page')+13;
                                               i2 = oSnap.indexOf("'",i1);
                                               i3 = oSnap.indexOf('<div class="positionName"');
                                               i3 = oSnap.indexOf('http',i3);
                                               i4 = oSnap.indexOf(')',i3);
                                                break;
                                            } else {
                                               strNotice = _strNotice+'<br>Skipping Mission:<a href="'+Self.Action+'">'+strMissionName+'</a>, ';
                                               LogPush(strNotice);
											   LogPush('Skip - ' + user_energy + ' - ' + aParams[9051]);
											   LogPush('Skip - ' + user_stamina + ' - ' + aParams[9052]);
                                               NextRequest(0,aParams[3]);
                                            }
                                        }
                                }
                            }
	                            
	                            if (i2>0) {
                                myUrl   += oSnap.slice(i1,i2);

                                myParms = 'ajax=1&liteload=1';
                                myParms += '&sf_xw_sig=' + local_xw_sig;
                                myParms += '&sf_xw_user_id=' + local_xw_user_id;
                                myUrl = myUrl.replace(/&amp;/g,'&');

                                GM_log(oSnap.slice(i3,i4-6));

	                                strNotice = _strNotice+'<br>Selecting Mission - <img src="'+oSnap.slice(i3,i4-6)+'">';

                                doMissionStep1(myUrl, myParms, strNotice);
	                            } else if (i2==0) {
	                                strNotice = _strNotice+'<br>Skipping Mission, Job type not found - Wall';
	                                //LogPush(strNotice);
	                                NextRequest(0,aParams[3]);
	                            }
								
                            } else {
		                        strNotice = _strNotice+'<br>Secret Mission Skipped (<a href="'+Self.Action+'">'+strMissionName+'</a>)';
                                LogPush(strNotice);
                                NextRequest(0,aParams[3]);
                            }
	                       
                        } else {
	                        LogPush('Error processing Mission');
	                        strNotice = _strNotice+'<br>Error Processing Mission.';
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);
                        }

                    } catch(err) {
                        LogPush('Error: WallItem doMissionStep1 - '+err.message);
                        NextRequest(0,aParams[3]);
                    }
                }
            });
        }


            function doCollectEnergy3(_myUrl, _myParms) {
                //GM_log('MW_AcceptEnergy doCollectEnergy 4');

               GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                         'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                         'Accept-Language': 'en-us,en;q=0.5',
                         'Content-Type':    'application/x-www-form-urlencoded'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1, i2, i3, i4, myUrl, myParms;
                            var strTemp;
                            var strNotice = '';
                            var GiftItem;

                            if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}
                            strTemp = _responseDetails.responseText;

                            strNotice   = '<b><font color="red">' + Self.Type+': </font>' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')'

                            i1  =   strTemp.indexOf('<span id="user_health">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_health = strTemp.slice(i1+23,i2);
                            } 

					        if ((parseInt(aParams[2570]) == 1) && parseInt(user_health) < parseInt(aParams[2571]) && parseInt(user_health) > 19)
							   ReHeal(); 
							else if ((parseInt(aParams[2572]) == 1) && parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();

                            i1 = strTemp.indexOf('you have already reached your daily accept limit');
							if (i1!=-1) {
								if (getHoursTime('MW_EnergyTimer') == 0) {
									setGMTime('MW_EnergyTimer', '1 hour');
									LogPush('<font color="red">Set MW_EnergyTimer:</font> ' + getHoursTime('MW_EnergyTimer'));
								}
							}


                            //Check for energy popup.
                            i1 = strTemp.indexOf('<div style="border-bottom: 1px dotted #999; margin: 10px auto; text-align: center; font-size: 20px; padding-bottom: 10px;">');
                            i2 = strTemp.indexOf('<div style="text-align: center; border: 1px solid #666666; padding:10px; background-color:black;">');
                            //i4 = strTemp.indexOf('<div style="border: 1px solid #666666; padding:10px; background-color:black;">');
							i4 = strTemp.indexOf('<div style="border: 1px solid rgb(102, 102, 102); padding: 10px; background-color: black;">');
                            if (i1 !=-1 ) {
                                if (strTemp.indexOf('<div style="margin-bottom:10px;">',i1) != -1) {
                                    i1 = strTemp.indexOf('<div style="margin-bottom:10px;">',i1);
                                    i2 = strTemp.indexOf('</div>',i1);
                                    strNotice += '<font color="blue">' + strTemp.slice(i1,i2) + '</font>';
                                }
                                i1 = strTemp.indexOf('<div style="float: left;">',i1);
								if (i1 == -1) throw { message: "Cannot find div style"}
                                i2 = strTemp.indexOf('</div>',i1);
                                strNotice += '<table><tbody><tr><td colspan="3">';

                                strNotice += strTemp.slice(i1,i2);
                                strNotice += '</td></tr><tr><td style="width: 130px; text-align: center;">';

                                i1 = strTemp.indexOf('<img src=',i2);
								if (i1 == -1) throw { message: "Cannot find img src="}
                                i2 = strTemp.indexOf('</div>',i1);
                                strNotice += strTemp.slice(i1,i2+6);
                                strNotice += '</td><td width="50"><img src="'+document.location.protocol+'//zyngapv.hs.llnwd.net/e6/mwfb/graphics/gift_loop_arrow_green_39x50_01.png"></td><td>';

                                i1 = strTemp.indexOf('<div style="float: left; text-align: center; width: 200px;',i2);
                                i1 = strTemp.indexOf('<a',i1)
                                i2 = strTemp.indexOf('<fb:profile-pic',i1);

                                strNotice += '<div style="float: left; text-align: center; width: 200px;">';
                                strNotice += strTemp.slice(i1,i2);

                                i1 = strTemp.indexOf('</a>',i2);
                                i2 = strTemp.indexOf('</div>',i1);
                                strNotice += strTemp.slice(i1,i2);
                                strNotice += '</div></td></tr>';

                                GiftItem    =  strNotice;

                                // look for button to send energy back

                                i1 = strTemp.indexOf('<fb:request-form');
                                if (i1 == -1) {
								   LogPush(GiftItem+'<br><font color=blue>Send button not found.</font>');
                                   NextRequest(0,aParams[3]);
                                } else {
                                   var param = GetServerfbml(strTemp);
							       doCollectEnergy4(param[0],param[1],GiftItem);
								}

                            } else if (i2 != -1 || i4 != -1) {
								   if (i2 != -1)
                                       i1 = strTemp.indexOf('>',i2)+1;
								   else
                                       i1 = strTemp.indexOf('>',i4)+1;
                                   i2 = strTemp.indexOf('<div style=', i1);
                                   strNotice += '<br>' + strTemp.slice(i1,i2);
                                   GiftItem  = strNotice;
                                   LogPush(GiftItem);
                                   NextRequest(0,aParams[3]);

                            } else {
                                i1 = strTemp.indexOf('<td class="message_body">');
                                //if (i1 == -1) throw { message: "Cannot find Message_Body in page"}
								if (i1 != -1) {
                                   i1 += 25;
                                   i2 = strTemp.indexOf('</td>',i1);
                                   strNotice += strTemp.slice(i1,i2);
                                   GiftItem    = strNotice+'</table>';
                                   LogPush(GiftItem);
								}
                                NextRequest(0,aParams[3]);
                            }

                        } catch(err) {
                            LogPush('Error: MW_AcceptEnergy doCollectEnergy 4 - ' + err.message);
                            NextRequest(0,aParams[3]);
                        }
                    }
                } )

            }


            function doCollectEnergy4(_myUrl, _myParms, _GiftItem) {
		      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
		      // start the WatchDog Timer to catch hung requests. 15 seconds.
		      GM_xmlhttpRequest({
		        method: 'POST',
		        url: _myUrl,
		        data: _myParms,
		        headers: {
		          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		          'Accept-Language': 'en-us,en;q=0.5',
		          'Content-Type': 'application/x-www-form-urlencoded',
		          'X-SVN-Rev': gvar.svn_rev
		        },
		        onload: function(_responseDetails) {
		          try {
                            var i1,i2, myUrl, myParms;
                            var strTemp, strTemp2;

                            var aTemp;

                            if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                            // get form data array
                            i1       =  strTemp.indexOf('PlatformInvite.sendInvitation');
                            if (i1 == -1) throw { message: "Cannot find PlatformInvite.sendInvitation in page"}

                            var param = GetPromptSend(strTemp);
							doCollectEnergy5a(param[0],param[1],param[2],_GiftItem);
                                                   
		          } catch(err) {
		            //LogPush(_GiftItem);
 		            //LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+'Error: doCollectGift4 - '+err.message);
		            LogPush(_GiftItem + 'Error: doCollectEnergy4 - '+err.message);
		            NextRequest(0,aParams[3]);
		          }
		        }
		      });
		    }

    function doCollectEnergy5a(_myUrl, _myParms, _myUrl2, _GiftItem) {
      GM_log('doCollectEnergy5a3: ' + _myUrl);
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      GM_xmlhttpRequest({
          method: 'POST',
          url: _myUrl,
          data: _myParms,
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-SVN-Rev': gvar.svn_rev
          },
          onload: function(_responseDetails) {
            try {
              var i1, i2, myUrl, myParms;
              var strTemp;

              if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
              doCollectEnergy5(_myUrl2,_myParms,_GiftItem);
            } catch(err) {
              LogPush('doCollectEnergy5 Error: - '+err.message);
              NextRequest(0,aParams[3]);
            }
          }
      });
    }


            function doCollectEnergy5(_myUrl, _myParms, _GiftItem) {
                //GM_log('doCollectEnergy5');
				//LogPush('doCollectEnergy5, _myUrl='+_myUrl+', _myParms='+_myParms);

               GM_xmlhttpRequest({
                    method: 'POST',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':  'en-us,en;q=0.5',
                        'Content-Type':     'application/x-www-form-urlencoded',
                        'X-SVN-Rev':         unsafeWindow.Env.svn_rev

                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1, i2, myUrl, myParms;
                            var strTemp, GiftItem, resstr;

                            if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;


                            i1 =   strTemp.indexOf('<p style="margin-top: 140px; font-size: 24px');
                            if (i1 ==-1) throw {message:"Cannot find message"}
							i1 =   strTemp.indexOf('">',i1);
                            i1         += 2;
                            i2          =   strTemp.indexOf('<script',i1);
                            resstr =  strTemp.slice(i1,i2).replace(/color: #fff/g, '');
							GiftItem = _GiftItem + '<br>'+resstr;

                            LogPush(GiftItem);

                            NextRequest(0,aParams[3]);

                        } catch(err) {
                            LogPush(_GiftItem);
                            LogPush('Error: doCollectEnergy5 - ' + err.message);
                            NextRequest(0,aParams[3]);
                        }
                    }
                } )

            }


            function doCollectGift3(_myUrl, _myParms) {
            //GM_log('WallItem doCollectGift3');
            //LogPush('doCollectGift3 - _myUrl=' + myUrl2 + ', _myParms=' + _myParms);
            GM_xmlhttpRequest({
                     method: 'POST',
                     url:  myUrl,
                     data: _myParms,
                     headers: {
                         'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                         'Accept-Language': 'en-us,en;q=0.5',
                         'Content-Type':    'application/x-www-form-urlencoded'

                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2,i3,i4,i5,i6,i7,i8, myUrl;
                            var strTemp;
                            var strNotice;
                            var stopit;

                            var oDiv, oSnapShot;
                            var GiftItem;
                            var strAppKey;

                            if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}
                            strTemp = _responseDetails.responseText;
                            strNotice   = '<b><font color="red">' + Self.Type+': </font>' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')'

							/*
                            i1  =   strTemp.indexOf('<span id="user_health">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_health = strTemp.slice(i1+23,i2);
                            } 
							*/

					        if ((parseInt(aParams[2570]) == 1) && parseInt(user_health) < parseInt(aParams[2571]) && parseInt(user_health) > 19)
							   ReHeal(); 
							else if ((parseInt(aParams[2572]) == 1) && parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();
	

								//} else if (strTemp.indexOf('<div class="top_row">Your email bonus is') != -1) {
                                   // i1 = strTemp.indexOf('<div class="email_reward">');
                                   if (strTemp.indexOf('<div class="email_reward">') != -1) {
                                      i1 = strTemp.indexOf('<div class="reward_text">',i1);
									//if (i1 != -1) {
                                      i2 = strTemp.indexOf('</div>',i1+25);
                                      //LogPush(strNotice + '<table><tr><td>' + strTemp.slice(i1+25,i2)+ '</td></tr></table>');

                                      i3 = strTemp.indexOf('<div class="reward_icon">',i2);
                                      i4 = strTemp.indexOf('</div>',i3+25);
                                      strNotice += '<table><tr><td>' + strTemp.slice(i1+25,i2)+strTemp.slice(i3+25,i4) + '</td></tr></table>';
                                      GiftItem    = strNotice;
                                      //LogPush(GiftItem);
									  LogPush2(GiftItem);
									  setGMTime('MW_EbonusTimer', '24 hour');
									//}

                                    NextRequest(0,aParams[3]);

                                } else {
                                    i1 = strTemp.indexOf('<td class="message_body">');
                                    if (i1 == -1) throw { message: "Cannot find Message_Body in page"}
                                    i2 = strTemp.indexOf('</td>',i1+25);
                                      strNotice += '<br>' + strTemp.slice(i1+25,i2);					  
                                    if (strNotice.indexOf('you have already participated') != -1) {
								      //if (getHoursTime('MW_FeeSPTimer') == 0) {
								      //    setGMTime('MW_FeeSPTimer', '3 hour');
								      //    strNotice += '<br><font Color=red>Set MW_FeeSPTimer: ' + getHoursTime('MW_FeeSPTimer')+'</font>';
                                      //}
									}

				   if (strNotice.indexOf('Congratulations') != -1 || strNotice.indexOf('To celebrate his recent promotion') != -1) {
				      LogPush2(strNotice);
				      juststart = 0;
                   } else if (strTemp.indexOf('You have already collected the maximum of 3 bonus rewards today') !=-1) {
					  if (getHoursTime('MW_levelupbonustimer') == 0) {
					    setGMTime('MW_levelupbonustimer', '3 hour');
						strNotice += '<br><font color="red">Set MW_levelupbonustimer:</font> ' + getHoursTime('MW_levelupbonustimer');
					  }
				   }

                                    GiftItem    = strNotice;
                                    LogPush(GiftItem);
                                    NextRequest(0,aParams[3]);
                                }
                           
                        } catch(err) {
                            //LogPush('Error: doCollectGift3 - ' + err.message);
							LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+'Error: doCollectGift3 - '+err.message);
							//GM_log('doCollectGift3 - ' + strTemp);
                            NextRequest(0,aParams[3]);
                        }
                    }
                });
            }

 
    function doCollectGift9(_myUrl, _myParms) {
          GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                         'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                         'Accept-Language': 'en-us,en;q=0.5',
                         'Content-Type':    'application/x-www-form-urlencoded'
                    },
          onload: function(_responseDetails) {

            try {
                 var i1, i2;
                 var strTemp, strNotice;

                 if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}
                 strTemp = _responseDetails.responseText;

                 strNotice   = '<b><font color="red">' + Self.Type+': </font>' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br><table><tr><td>';
                 i1 = strTemp.indexOf('<td class="message_body">');
                 //if (i1 == -1) throw { message: "Cannot find Message_Body in page"}
				 if (i1 != -1) {
                   i2 = strTemp.indexOf('</td>',i1+25);
                   strNotice += strTemp.slice(i1+25,i2) + '</td></tr></table>';

                   //if (strNotice.indexOf('you have already participated') == -1 && strNotice.indexOf('You have already collected the maximum of 3 bonus') == -1  && strNotice.indexOf('too late') == -1) 				  
				   if (strNotice.indexOf('Congratulations') != -1 || strNotice.indexOf('To celebrate his recent promotion') != -1) {
				     LogPush2(strNotice);
				     juststart = 0;
				     if (strNotice.indexOf('Congratulations') != -1) setGMTime('MW_FeeSPTimer', '12 hour'); 
				   }
				   if (strNotice.indexOf('You collected') != -1 || strNotice.indexOf('You gave') != -1 | strNotice.indexOf('Your Friend just received') != -1) 
                     LogPush(strNotice);
				 }

            } catch(err) {
              //LogPush('doCollectGift9 Error: - '+err.message);
              // NextRequest(0,aParams[3]);
            }
		
          }
      });
    }

            function dospin(_myUrl, _myParms) {
                //GM_log('dospin');
                GM_xmlhttpRequest({
                    method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                         'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                         'Accept-Language': 'en-us,en;q=0.5',
                         'Content-Type':    'application/x-www-form-urlencoded'

                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2,i3,i4, myUrl, myUrl2, myParms;
                            var strTemp;
                            var iGift;
                            var strName, strDetails;

                            if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;
                            strNotice  = '<b><font color="red">' + Self.Type+': </font>' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')'
                            i1 = strTemp.indexOf("$('#popup_fodder').html");
                            //i1 = strTemp.indexOf('("<div',i1)+1;
                            //i2 = strTemp.indexOf('</div>");',i1)+7;
if (i1 != -1) {
                            i1 = strTemp.indexOf("<td style='color: white; font-size: 13px; padding-bottom: 20px;' valign='top'>",i1);
                            if (i1 != -1) {
                               i2 = strTemp.indexOf('</td>',i1)
                               strNotice += '<br>' + strTemp.slice(i1+78,i2);
                                    if (strNotice.indexOf('already reached the maximum number of free spins') != -1) {
								      if (getHoursTime('MW_3SpinTimer') == 0) {
								          setGMTime('MW_3SpinTimer', '1 hour');
								          strNotice += '<br><font Color=red>Set MW_3SpinTimer: ' + getHoursTime('MW_3SpinTimer')+'</font>';
                                      }
									} else {
										setGMTime('MW_3SpinTimer', '24 hour');
										strNotice += '<br><font Color=red>Set MW_3SpinTimer: ' + getHoursTime('MW_3SpinTimer')+'</font>';
									}
							   LogPush(strNotice);							   
                            }		
}							
							NextRequest(0,aParams[3]);

                        } catch(err) {
                            GM_log('Error: dospin - ' + err.message);
							LogPush(strNotice+'<br>Error: dospin - ' + err.message);
                            NextRequest(0,aParams[3]);
                        }

                    }
                } )

            }

        function doWarStep1(_myUrl, _myParms, _strNotice, _i) {
            //GM_log('WallItem doWarStep1 - ' + _i);
            //if (_myUrl == null || _myUrl == '' || _myUrl == 'javascript://') throw {message:"Url Not Passed in"};
           GM_xmlhttpRequest({
                 method: 'POST',
                 url:  _myUrl,
                 data: _myParms,
                 headers: {
                     'Accept':              '*/*',
                     'Accept-Language':     'en-us,en;q=0.5',
                     'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                     'X-Requested-With':    ' XMLHttpRequest'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1,i2,i3,i4, myUrl;
                        var strTemp;
                        var strWarMessage, strWarName, strWarNotice;
                        var strWarReward;
                        var strNotice;
                        var strDetails;
                        var oSnapShot, oDiv;

                        var bSkipItem;

                        if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                        // all of the responce
                        strTemp =   _responseDetails.responseText;
                            i1  =   strTemp.indexOf('<span id="user_health">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_health = strTemp.slice(i1+23,i2);
                            } 

					        if ((parseInt(aParams[2570]) == 1) && parseInt(user_health) < parseInt(aParams[2571]) && parseInt(user_health) > 19)
							   ReHeal(); 
							else if ((parseInt(aParams[2572]) == 1) && parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();


                        if (strTemp.indexOf('You maxed out on rewards for helping your mafia in their wars today') !=-1)
						    _strNotice = _strNotice+'<br><font color="#3300CC">You maxed out on rewards for helping your mafia in their wars today. You can assist in as many wars as needed, but can only receive up to 5 bonuses per day.</font>';
                        //Done notice
                        if (strTemp.indexOf('You Have Already Participated') !=-1) {
                            strNotice = _strNotice+'<br>You Have Already Participated.';
                            i1 = strTemp.indexOf('<div class="helpers_rewards">',i1);
                            i1 = strTemp.indexOf('<li>',i1);
                            i2 = strTemp.indexOf('</li>',i1);
                            if (i1!=-1) strNotice += ' reward: ' + strTemp.slice(i1+4,i2-1).replace(/(\s+$)/g, "");
                            //if (bShowDetail) 
							LogPush(strNotice);
                            NextRequest(0,aParams[3]); 
                        } else if (strTemp.indexOf('This war is already over') !=-1) {
                            strNotice = _strNotice+'<br>This war is already over';
                            if (bShowDetail) LogPush(strNotice);
                            NextRequest(0,aParams[3]);
/*                        } else if (strTemp.indexOf('<p style=\"margin: 0') !=-1) {
                            i1 = strTemp.indexOf('<p style=\"margin: 0');
                            i2 = strTemp.indexOf('</p>',i1+24);
                            strNotice = _strNotice+'<br>' + strTemp.slice(i1,i2);
                            i1 = strTemp.indexOf('helpers_rewards');
                            i1 = strTemp.indexOf('<img',i1);
							i1 = strTemp.indexOf('<img',i1+4);
                            i2 = strTemp.indexOf('>',i1)
                            if (i1!=-1) strNotice += ' reward : ' + strTemp.slice(i1,i2);
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);  */
                        } else if (strTemp.indexOf('You <span class=') !=-1) {
							//GM_log(strTemp);
                            i1 = strTemp.indexOf('You <span class=');
							i2 = strTemp.indexOf('war.',i1);
                            //i2 = strTemp.indexOf('<a href',i1);
                            strNotice = _strNotice+'<br>' + strTemp.slice(i1,i2+4);
                            i1 = strTemp.indexOf('<div class="helpers_rewards">',i1);
/*							if (i1!=-1) {
 							  i1 = strTemp.indexOf('<ul>',i1);
                              i2 = strTemp.indexOf('</ul>',i1);
							  LogPush(strTemp.slice(i1+4,i2-1));
							}  */
                            i1 = strTemp.indexOf('<li>',i1);
                            i2 = strTemp.indexOf('</li>',i1);
                            if (i1!=-1) strNotice += ' reward: ' + strTemp.slice(i1+4,i2-1).replace(/(\s+$)/g, "");
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);
                        } else {
                            //look for reward type
                            i1 = strTemp.indexOf('<div class="helpers_rewards">');
                            i1 = strTemp.indexOf('title="',i1)+7;
                            i2 = strTemp.indexOf('"',i1);
                            strWarReward = strTemp.slice(i1,i2);

                            bSkipItem = true;

                            if (aParams[2200] ==true) {
                                // All items option
                                bSkipItem = false;
                            } else {
                                // Check reward against those desired
                                for (var warID in MW_WarList) {
                                   if ((strWarReward.indexOf(MW_WarList[warID].test)!=-1) && (aParams[warID]==true)) {
                                      bSkipItem = false;
                                      break;
								   }
                                }
                            }
                            if (bSkipItem==true) {
                                strNotice = _strNotice+'<br>War skipped wrong reward offered: ' +strWarReward;
                                LogPush(strNotice);
                                NextRequest(0,aParams[3]);
                            } else {

                                //Look for Message
                                strWarMessage   = '';
                                strWarNotice    = '';

                                i1 = strTemp.indexOf('<td class="message_body">');
                                if (i1 !=-1) {
                                    i2 = strTemp.indexOf('</td>',i1);
									strWarMessage = strTemp.slice(i1+25,i2);
				
                                    // remove any javascript to be safe
                                    strWarMessage = strWarMessage.replace(/<script(.|\s)*?\/script>/g, '');
                                    strWarMessage = strWarMessage.replace(/color: rgb\(255, 255, 255\)/g, '');
                                    strWarMessage = strWarMessage.replace(/color: #fff/g, '');

                                    i1 = strWarMessage.indexOf('<div style="margin');
                                    if (i1 == -1) {
                                        //strWarNotice = strWarMessage.slice(0,i2);
										strWarNotice = strWarMessage;
                                    } else {										
                                        i1 = strWarMessage.indexOf('">',i1)+2;
                                        i2 = strWarMessage.indexOf('</div>',i1);
                                        strWarNotice = strWarMessage.slice(i1,i2);
                                        i2 = strWarNotice.indexOf('<a href');
                                        if (i2!=-1) strWarNotice = strWarNotice.slice(0,i2);
                                    }
                                    // remove any javascript to be safe
                                    strWarNotice = strWarNotice.replace(/<script(.|\s)*?\/script>/g, '');
                                    strWarNotice = strWarNotice.replace(/color: rgb\(255, 255, 255\)/g, '');
                                    strWarNotice = strWarNotice.replace(/color: #fff/g, '');
                                }

                                //Isolate the part of the web page that has all the attack buttons on it
                                if (aParams[212] ==false)
                                    i1 = strTemp.indexOf('<div class="side right')
                                else
                                    i1 = strTemp.indexOf('<div class="side left');
                                i2 = strTemp.indexOf('<div class="war_rewards">',i1);

                                // This should contain all the attack buttons
                                oDiv = document.createElement('div');
                                oDiv.innerHTML = strTemp.slice(i1,i2);

                                // Select who to fight, right side or Both
                                oSnapShot = getSnapshot(strWarAttack,oDiv);

                                if (oSnapShot.snapshotLength == 0) {
                                    //no one to attack
                                    //GM_log('no one to Attack');

                                    if (strWarNotice != '') strNotice   += '<br>' + strWarNotice;
                                    strNotice   = _strNotice+'<br>War is over.  No one to attack';
                                    LogPush(strNotice);
                                    NextRequest(0,aParams[3]);
                                } else {
                                    // attemp to attack
                                    //GM_log('Attemp to attack');
                                    if (strWarNotice != '') strNotice   += '<br>' + strWarNotice;
                                    strNotice = _strNotice+'<br>Found ' + oSnapShot.snapshotLength+' Person/People to attack';

                                    // look for local_xw_sig
//                                    myUrl    =  oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).href;
                                    myParms  = 'ajax=1&liteload=1&sf_xw_user_id=' + escape(local_xw_user_id) + '&sf_xw_sig=' + local_xw_sig;


 for(var i = 0; i < oSnapShot.snapshotLength; i++) {
                 //myUrl    =  oSnapShot.snapshotItem(i).href;
                                    doWarStep2(oSnapShot.snapshotItem(i).href, myParms, strNotice, i);
 }
 NextRequest(0,aParams[3]);
                                }
                            }
                        }
                    } catch(err) {
                        LogPush(_strNotice + '<br>Error: WallItem DoWarStep 1 - ' + err.message);
						//LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+'Error: WallItem DoWarStep 1 - ' + err.message);
                        NextRequest(0,aParams[3]);
                    }
                }
            });
        }

        function doWarStep2(_myUrl, _myParms, _strNotice, _i) {
            //GM_log('WallItem doWarStep2 - ' + _i);

           GM_xmlhttpRequest({
                 method: 'POST',
                 url:  _myUrl,
                 data: _myParms,
                 headers: {
                     'Accept':              '*/*',
                     'Accept-Language':     'en-us,en;q=0.5',
                     'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                     'X-Requested-With':    ' XMLHttpRequest'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1,i2,i3,i4, myUrl;
                        var strTemp;
                        var strWarMessage, strWarName, strWarNotice;
                        var strWarReward;
                        var strNotice;
                        var strDetails;
                        var oSnapShot, oDiv;

                        var bSkipItem;

                        if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                        // all of the responce
                        strTemp =   _responseDetails.responseText;
                            i1  =   strTemp.indexOf('<span id="user_health">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_health = strTemp.slice(i1+23,i2);
                            } 

					        if ((parseInt(aParams[2570]) == 1) && parseInt(user_health) < parseInt(aParams[2571]) && parseInt(user_health) > 19)
							   ReHeal(); 
							else if ((parseInt(aParams[2572]) == 1) && parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();


                        if (strTemp.indexOf('You maxed out on rewards for helping your mafia in their wars today') !=-1)
						    _strNotice = _strNotice+'<br><font color="#3300CC">You maxed out on rewards for helping your mafia in their wars today. You can assist in as many wars as needed, but can only receive up to 5 bonuses per day.</font>';
                        //Done notice
                        if (strTemp.indexOf('You <span class=') !=-1) {
							//GM_log(strTemp);
                            i1 = strTemp.indexOf('You <span class=');
							i2 = strTemp.indexOf('war.',i1);
                            //i2 = strTemp.indexOf('<a href',i1);
                            strNotice = _strNotice+'<br>' + strTemp.slice(i1,i2+4);
                            i1 = strTemp.indexOf('<div class="helpers_rewards">',i1);
/*							if (i1!=-1) {
 							  i1 = strTemp.indexOf('<ul>',i1);
                              i2 = strTemp.indexOf('</ul>',i1);
							  LogPush(strTemp.slice(i1+4,i2-1));
							}  */
                            i1 = strTemp.indexOf('<li>',i1);
                            i2 = strTemp.indexOf('</li>',i1);
                            if (i1!=-1) strNotice += ' reward: ' + strTemp.slice(i1+4,i2-1).replace(/(\s+$)/g, "");
                            LogPush(strNotice);
                            //NextRequest(0,aParams[3]);
                        } else {
                            //look for reward type
                            i1 = strTemp.indexOf('<div class="helpers_rewards">');
                            i1 = strTemp.indexOf('title="',i1)+7;
                            i2 = strTemp.indexOf('"',i1);
                            strWarReward = strTemp.slice(i1,i2);

                            bSkipItem = true;

                            if (aParams[2200] ==true) {
                                // All items option
                                bSkipItem = false;
                            } else {
                                // Check reward against those desired
                                for (var warID in MW_WarList) {
                                   if ((strWarReward.indexOf(MW_WarList[warID].test)!=-1) && (aParams[warID]==true)) {
                                      bSkipItem = false;
                                      break;
								   }
                                }
                            }
                            if (bSkipItem==true) {
                                strNotice = _strNotice+'<br>War skipped wrong reward offered: ' +strWarReward;
                                LogPush(strNotice);
                                //NextRequest(0,aParams[3]);
                            } else {

                                //Look for Message
                                strWarMessage   = '';
                                strWarNotice    = '';

                                i1 = strTemp.indexOf('<td class="message_body">');
                                if (i1 !=-1) {
                                    i2 = strTemp.indexOf('</td>',i1);
									strWarMessage = strTemp.slice(i1+25,i2);
				
                                    // remove any javascript to be safe
                                    strWarMessage = strWarMessage.replace(/<script(.|\s)*?\/script>/g, '');
                                    strWarMessage = strWarMessage.replace(/color: rgb\(255, 255, 255\)/g, '');
                                    strWarMessage = strWarMessage.replace(/color: #fff/g, '');

                                    i1 = strWarMessage.indexOf('<div style="margin');
                                    if (i1 == -1) {
                                        //strWarNotice = strWarMessage.slice(0,i2);
										strWarNotice = strWarMessage;
                                    } else {										
                                        i1 = strWarMessage.indexOf('">',i1)+2;
                                        i2 = strWarMessage.indexOf('</div>',i1);
                                        strWarNotice = strWarMessage.slice(i1,i2);
                                        i2 = strWarNotice.indexOf('<a href');
                                        if (i2!=-1) strWarNotice = strWarNotice.slice(0,i2);
                                    }
                                    // remove any javascript to be safe
                                    strWarNotice = strWarNotice.replace(/<script(.|\s)*?\/script>/g, '');
                                    strWarNotice = strWarNotice.replace(/color: rgb\(255, 255, 255\)/g, '');
                                    strWarNotice = strWarNotice.replace(/color: #fff/g, '');
                                }

                                //Isolate the part of the web page that has all the attack buttons on it
                                if (aParams[212] ==false)
                                    i1 = strTemp.indexOf('<div class="side right')
                                else
                                    i1 = strTemp.indexOf('<div class="side left');
                                i2 = strTemp.indexOf('<div class="war_rewards">',i1);

                                // This should contain all the attack buttons
                                oDiv = document.createElement('div');
                                oDiv.innerHTML = strTemp.slice(i1,i2);

                                // Select who to fight, right side or Both
                                oSnapShot = getSnapshot(strWarAttack,oDiv);

                                if (oSnapShot.snapshotLength != 0) {
                                    // attemp to attack
                                    //GM_log('Attemp to attack');
                                    if (strWarNotice != '') strNotice   += '<br>' + strWarNotice;
                                    strNotice = _strNotice+'<br>Found ' + oSnapShot.snapshotLength+' Person/People to attack';

                                    // look for local_xw_sig
//                                    myUrl    =  oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).href;
                                    myParms  = 'ajax=1&liteload=1&sf_xw_user_id=' + escape(local_xw_user_id) + '&sf_xw_sig=' + local_xw_sig;


 for(var i = 0; i < oSnapShot.snapshotLength; i++) {
                 //myUrl    =  oSnapShot.snapshotItem(i).href;
                                    doWarStep2(oSnapShot.snapshotItem(i).href, myParms, strNotice, i);
 }

                                }
                            }
                        }
                    } catch(err) {
                        GM_log(_strNotice + '<br>Error: WallItem DoWarStep 2 - ' + err.message);
						//LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+'Error: WallItem DoWarStep 1 - ' + err.message);
                        //NextRequest(0,aParams[3]);
                    }
                }
            });
        }


    function doDailyTakeStep1( _myUrl, _myParms, _strNotice){
      GM_log('WallItem ' + Self.Type + ' doDailyTakeStep1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
           'Accept': '*/*',
           'Accept-Language': 'en-us,en;q=0.5',
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
           'X-Requested-With': ' XMLHttpRequest'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, i3, i4;
            var myUrl, strTemp;
            var strWarMessage, strWarName;
            var strWarReward, strWarNotice;
            var strNotice, strDetails;
            var oSnapShot, oDiv;
            var bSkipItem = true;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            // All of the responce
            strTemp = _responseDetails.responseText;
                            i1  =   strTemp.indexOf('<span id="user_health">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_health = strTemp.slice(i1+23,i2);
                            } 

					        if ((parseInt(aParams[2570]) == 1) && parseInt(user_health) < parseInt(aParams[2571]) && parseInt(user_health) > 19)
							   ReHeal(); 
							else if ((parseInt(aParams[2572]) == 1) && parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();


            if (strTemp.indexOf('You are too late, all the rewards have been claimed')!=-1) {
              strNotice = _strNotice+'<br>You are too late, all the rewards have been claimed.';
              LogPush(strNotice);
              NextRequest(0,aParams[3]);
            } else if (strTemp.indexOf('You can not claim same reward twice!!')!=-1){
              strNotice = _strNotice+'<br>You can not claim same reward twice!!';
              LogPush(strNotice);
              NextRequest(0,aParams[3]);
            } else if (strTemp.indexOf('You have already collected from 5/5 friend takes today')!=-1){
              strNotice = _strNotice+'<br>You have already collected from 5/5 friend takes today';
			  if (getHoursTime('MW_dtv3timer') == 0) {
			      setGMTime('MW_dtv3timer', '1 hour');
			 	  strNotice += '<br><font color="red">Set MW_dtv3timer:</font> ' + getHoursTime('MW_dtv3timer');
			  }
              LogPush(strNotice);
              NextRequest(0,aParams[3]);
                
            } else {
              // Extract the popup


              i1 = strTemp.indexOf("<div id=\\\"daily_take_v3_pop\\\"><div class");
              if (i1==-1){
                // No daily take pop found..
                i1 = strTemp.indexOf('<div id="collectText">You have collected:');
                if (i1==-1){
                    strNotice = _strNotice+'<br>No Daily Take Popup found.';
					//LogPush(strTemp.replace(/</g,'&lt;'));
                    //GM_log(strTemp);
                } else {
                    i2 = strTemp.indexOf("</div>", i1);
                    strNotice = _strNotice+'<br>' + strTemp.slice(i1+22,i2-6);
                }
                LogPush2(strNotice);
                NextRequest(0,aParams[3]);

                
              } else {
                i2 = strTemp.indexOf('MW.Popup.show', i1);
                if (i2==-1){
                    // Didn't find the end of this section.
                    strNotice = _strNotice+'<br>Parsing error';
                    LogPush(strNotice);
                    NextRequest(0,aParams[3]);
                    
                } else {
                    oDiv = document.createElement('div');
                    oDiv.innerHTML = strTemp.slice(i1,i2-5).replace(/\\"/g, '"');
                    // Select who to fight, right side or Both
                    oSnapShot = getSnapshot('.//div[@class="dt_pop_item"]',oDiv);
                    if (oSnapShot.snapshotLength == 0) {
                        strNotice = _strNotice+'<br>Did not find any Daily Take items';
                        LogPush(strNotice);
                        NextRequest(0,aParams[3]);
                    } else {
                        // found items.. loop through them..
                        strNotice = _strNotice+'<br>Daily take found ' + oSnapShot.snapshotLength + ' items';
                        for(var i = 0; i < oSnapShot.snapshotLength; i++) {
                            bSkipItem = true;
                            var item, item_url;
                            strTemp = oSnapShot.snapshotItem(i).innerHTML;
                            i1 = strTemp.indexOf('title="');
                            if (i1!=-1){
                                // We have a title..
                                i2 = strTemp.indexOf('"', i1+7);
                                item = strTemp.slice(i1+7,i2);
                                strNotice += '|' + item;
                                GM_log(item);								
                                for (var takeID in MW_DailyTake) {
                                  if ((item == MW_DailyTake[takeID].test)&&(aParams[takeID]==true)) {
                                    bSkipItem = false;
                                    break;
                                  } 
                                }
                                if (bSkipItem){
                                    continue;
                                }
                                // Get the button..
								i1 = strTemp.indexOf('remote/html_server.php?xw_controller=DailyTakeV3&amp;xw_action=collectReward');
                                if (i1!=-1){
                                    // We can collect this item..
                                    strNotice = strNotice + '<br/>Trying to click: ' + item;
                                    i2 = strTemp.indexOf("\\'",i1);
									if (i2==-1) i2 = strTemp.indexOf("'",i1);
                                    item_url = strTemp.slice(i1,i2).replace(/&amp;/g,'&').replace(/\\/g,'');
                                    //strNotice = strNotice + ' ' + item_url;
                                    myUrl = document.location.protocol+'//facebook.mafiawars.zynga.com/mwfb/' + item_url;
                                    myUrl    += '&xw_client_id=8';
                                    myParms   = 'ajax=1&liteload=1';
                                    myParms  += '&sf_xw_user_id='+escape(local_xw_user_id);
                                    myParms  += '&sf_xw_sig='+local_xw_sig;
                                    GM_log("Going to click to get: " + item);
									//LogPush(myUrl);
                                    break; // Don't try to click multiples..

                                    
                                    
                                    
                                } else {
                                    bSkipItem = true;
                                    continue; // This item is not clickable
                                }
                            } else {
                                continue; 
                            }
                        }
						//LogPush(strNotice);
                        if (bSkipItem){
                            // We didn't find anything to click..
                            strNotice = strNotice+'<br>Did not find a Daily Take item we want and can click from your selections';
                            LogPush(strNotice);
                            NextRequest(0,aParams[3]);
                            
                        } else {
							//for (var j=0;j<10;j++) {
                            doDailyTakeStep1(myUrl, myParms, strNotice);
							// }
                        }
                        
                        
                    }
                    
                }
              }
            }
          } catch(err) {
            LogPush('Error: WallItem ' + Self.Type + ' doDailyTakeStep 1 - '+err.message);
            NextRequest(0,aParams[3]);
          }
        }
      });
        
        
    }



        // FarmVille Code Sections
        function doFVStep1(_myUrl, _myParms) {
        //GM_log('WallItem doFVStep1');
		if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};

       GM_xmlhttpRequest({
        method: 'GET', url:  _myUrl,
        headers: {
          'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
          try {
            var i1,i2, myUrl, myUrl2;
            var strTemp;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

            strTemp =   _responseDetails.responseText;

   //if (strTemp.indexOf("goURI(") == -1) {
   if (EnableScript) {
          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0) {
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0) {
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
   }

           i1 = strTemp.indexOf("goURI(");
            if (i1 != -1) {
            //extract goURI
            i1 += 7; i2 = strTemp.indexOf("')",i1); 
			myUrl = strTemp.slice(i1,i2);
            myUrl = myUrl.replace(/\\x26/g,"&");
            doFVStep2(myUrl,'');
			} else {
             i1 = strTemp.indexOf('<form action="http://facebook.farmville.com');
             if (i1==-1) i1 = strTemp.indexOf('<form action="https://facebook.farmville.com');
              if (i1==-1) throw {message:'Cannot find form action="'}             
                            //extract MW protected form
                            i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);              
                            //find URL
                            i1 = strTemp.indexOf('"')+1; i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);
                            myUrl = myUrl.replace(/&amp;/g,'&');
							myUrl = myUrl.replace(/\\/g,'');
                            myParms = '';
              
                            i1 = strTemp.indexOf('<input');
                            while (i1!=-1) {
                              if (myParms!='') myParms += '&'
                                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                                myParms += strTemp.slice(i1,i2)+'='
                                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                                myParms += escape(strTemp.slice(i1,i2));
                                i1 = strTemp.indexOf('<input',i1);
                            }
			   doFVStep1a(myUrl,myParms);
			}

          } catch(err) {
			LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+'Error: WallItem DoFVStep 1 - '+err.message);
			//GM_log('Error: WallItem DoFVStep 1 - '+strTemp_all);
            NextRequest(0,aParams[3]);
          }

        }
      });
    }

            function doFVStep1a(_myUrl, _myParms) {
              if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
                GM_xmlhttpRequest({
                    method: 'POST', url:  _myUrl,  data: _myParms,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1, i2, strTemp, myUrl, myParms;
                            var strNotice;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;
//LogPush(strTemp.replace(/</g,'&lt;'));
						i1 = strTemp.indexOf('location.href = "');

                        if (i1 == -1) throw { message: "Cannot find location.href in page"}

                        // extract URL
						i1 = strTemp.indexOf('http:',i1);
					    if (i1==-1) i1 = strTemp.indexOf('https:',i1);
                        i2 = strTemp.indexOf('"',i1);
                        myUrl = strTemp.slice(i1,i2);

                       doFVStep1b(myUrl,'');


                        } catch(err) {
                            LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+'Error: WallItem DoFVStep 1a - '+err.message);
                            NextRequest(0,aParams[3]);
                        }
                    }
                });
            }


  function doFVStep1b(_myUrl, _myParms) {
	  if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      GM_xmlhttpRequest({
        method: 'GET', url:  _myUrl,
        headers: {
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
         try {
            var i1,i2, i1b, i1c, i1d, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;

			if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

          strTemp = _responseDetails.responseText;
   //if (strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb') == -1) {
   if (EnableScript) {
          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0){
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0){
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
   }

//LogPush(strTemp.replace(/</g,'&lt;'));

          i1 = strTemp.indexOf('<form action="http://facebook.farmville.com/reward.php');
          if (i1==-1) i1 = strTemp.indexOf('<form action="https://facebook.farmville.com/reward.php');
		  if (i1 == -1) throw { message: "Cannot find form action= in page"}

              //extract MW protected form
              i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
              //find URL
              i1 = strTemp.indexOf('"')+1; i2 = strTemp.indexOf('"',i1);
              myUrl = strTemp.slice(i1,i2);
              myUrl = myUrl.replace(/&amp;/g,'&');
              myParms = '';

              i1 = strTemp.indexOf('<input');
              while (i1!=-1) {
                if (myParms!='') myParms += '&'
                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                myParms += strTemp.slice(i1,i2)+'='
                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                myParms += escape(strTemp.slice(i1,i2));
                i1 = strTemp.indexOf('<input',i1);
              }
              //doFVStep1c(myUrl,myParms);
			  doFVStep2(myUrl,myParms);
 

           } catch(err) {
              LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+'Error: WallItem DoFVStep 1b - '+err.message);
              NextRequest(0,aParams[3]);
          }
        }
      });
    }

  function doFVStep1c(_myUrl, _myParms) {
      //GM_log('MW_AcceptEnergy doStep 5');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      GM_xmlhttpRequest({
      method: 'POST',
      url:  _myUrl, data: _myParms,
      headers: {
        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language':  'en-us,en;q=0.5',
        'Content-Type':   'application/x-www-form-urlencoded'
      },
      onload: function(_responseDetails) {
        try {       
          var i1, i2, strTemp;  

          if (_responseDetails.status != 200) throw {message:'Status 200 error'}
         strTemp = _responseDetails.responseText;
   //if (strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb') == -1) {
   if (EnableScript) {
          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0){
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0){
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
   }

//LogPush(strTemp.replace(/</g,'&lt;'));
                        i1 = strTemp.indexOf('action="');
						if (i1 == -1) throw { message: "Cannot find action= in page"}
                            // extract URL
                            i1 += 8;
                            i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);

                            myParms = '';
                            i1 = strTemp.indexOf('<input',i1);
                            while (i1!=-1) {
                                i1 = strTemp.indexOf('name="',i1)+6;
                                i2 = strTemp.indexOf('"',i1);
                                if (myParms=='')
                                    myParms = strTemp.slice(i1,i2)+'='
                                else
                                    myParms += '&'+strTemp.slice(i1,i2)+'=';
                                i1 = strTemp.indexOf('value="',i1)+7;
                                i2 = strTemp.indexOf('"',i1);
                                myParms += escape(strTemp.slice(i1,i2));

                                i1 = strTemp.indexOf('<input',i1); 
                            } 
							doFVStep2(myUrl,myParms);
        
        } catch(err) {
              LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+'Error: WallItem DoFVStep 1c - '+err.message);
              NextRequest(0,aParams[3]);
        }
      }
    });
  }


   function doFVStep2(_myUrl, _myParms) {
      //LogPush('doFVStep2 _myUrl= ' + _myUrl);
      //GM_log('WallItem doFVStep2');
	  if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};

      GM_xmlhttpRequest({
      method: 'POST',
      url:  _myUrl, data: _myParms,
      headers: {
        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language':  'en-us,en;q=0.5',
        'Content-Type':   'application/x-www-form-urlencoded'
      },
        onload: function(_responseDetails) {
          try {
            var i1,i2,i3, myUrl, myParms;
            var strTemp, strTemp_all, strName, strValue;
            var strNotice;
            var bProcess;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

            strTemp = _responseDetails.responseText;
          // get URL
            i1 = strTemp.indexOf('href="');
           // if (i1 == -1) throw {message:'Cannot find href=" in page'}
		    if (i1 != -1) {
			i1 += 6;
            i2 = strTemp.indexOf('"',i1);
            myUrl = strTemp.slice(i1,i2);
            myUrl = myUrl.replace(/&amp;/g,'&');
			myUrl = myUrl.replace(/\\x26/g,"&");
			}

    if (EnableScript) {
            i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');
			if (i1 != -1) {
              i1 = strTemp.indexOf('{',i1);
              i2 = strTemp.indexOf(');</script>',i1);
              eval('strTemp = '+strTemp.slice(i1,i2));
              strTemp = strTemp.content.pagelet_fbml_canvas_content;
			}
   } 

            // look for gift message

            i1 = strTemp.indexOf('<div class="main_giftConfirm_cont">');
            //if (i1 == -1) throw {message:'Cannot find div class="main_giftConfirm_cont" in page'}
    if (i1 != -1)  {
            // Extract Message
            i2 = strTemp.indexOf('<div class="gift_box_holder">',i1);

            if (i2 ==-1)
              //Text only message
              i1 = i1 + 35;
            else
              //Text with an Icon
              i1  = i2;

           // i2 = strTemp.indexOf('<div class="text">',i1);
			//if (i2 ==-1)
              i2 = strTemp.indexOf('<div class="inner_giftConfirm_cont">',i1);

            strNotice = strTemp.slice(i1,i2);
			strNotice = strNotice.replace(/<div style="background:(.|\s)*?\/div>/g, '');
			strNotice = strNotice.replace(/<div style="padding: 20px 0pt; background:(.|\s)*?\/div>/g, '');
            strNotice = strNotice.replace(/<\/h3>|<h3>/g,'');

			i1 = strTemp.indexOf('<div class="thank_you_gift">',i1);
            if (i1 == -1) {
              i1 = strTemp.indexOf('<div class="inner_giftConfirm_cont">');
              // Extract forms
              i3 = strTemp.indexOf('<form action=""',i1);
              i2 = strTemp.indexOf('value="Yes" type="submit"',i3);
              if (i2 != -1) {
                // two buttons
                myParms = '';
                i1 = strTemp.indexOf('<input type="hidden"',i3);
                i2 = strTemp.indexOf('</form>',i1);

                strTemp = strTemp.slice(i1,i2);
                i1=0;
                do {
                  i1 = strTemp.indexOf('name="',i1);
                  if(i1==-1) {
                    break;
                  } else {
                    i1 += 6;
                    i2 = strTemp.indexOf('"',i1);
                    strName = strTemp.slice(i1,i2);
                    i1 = strTemp.indexOf('value="',i1)+7;
                    i2 = strTemp.indexOf('"',i1);
                    strValue = strTemp.slice(i1,i2);
                    if (myParms != '' ) myParms += '&';
                    myParms += strName +'='+strValue;
                  }
                } while (true)
                myParms = myParms.replace(/,/g,'%2C');
                doFVStep4(myUrl,myParms,strNotice);
             } else {
		 	    LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+strNotice);
                NextRequest(0,aParams[3]); }
            } else {
                // Extract forms
                //i1 = strTemp.indexOf('<form',i1);
                i2 = strTemp.indexOf('<form',i1+5);
                if (i2 != -1) {
                   i1 = strTemp.indexOf('<form action="http')+14; 
			       i2 = strTemp.indexOf('"',i1+1);
                   myUrl = strTemp.slice(i1,i2);
                   myUrl = myUrl.replace(/&amp;/g,'&');
			       //myUrl = myUrl.replace(/\\x26/g,"&");

                   // two buttons
                   myParms = '';
                   i1 = strTemp.indexOf('<input type="hidden"',i1);
                   i2 = strTemp.indexOf('</form>',i1);

                   strTemp = strTemp.slice(i1,i2);
                   i1=0;
                   do {
                      i1 = strTemp.indexOf('name="',i1);
                      if(i1==-1) {
						  break;
                      } else {
                         i1 += 6;
                         i2 = strTemp.indexOf('"',i1);
                         strName = strTemp.slice(i1,i2);
                         i1 = strTemp.indexOf('value="',i1)+7;
                         i2 = strTemp.indexOf('"',i1);
                         strValue = strTemp.slice(i1,i2);
                         if (myParms != '' ) myParms += '&';
                         myParms += strName +'='+strValue;
                      }
                   } while (true)
                   myParms = myParms.replace(/,/g,'%2C');
                   doFVStep4(myUrl,myParms,strNotice);
                } else {
                   // too late
                   //strNotice += '<br>Already Accepted or Expired';
			       if (strNotice.indexOf('Try again')==-1)
				   LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+strNotice);
                   NextRequest(0,aParams[3]);
                }
            }

	} else { 
//LogPush(strTemp.replace(/</g,'&lt;'));
//LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+ strTemp.replace(/</g,'&lt;'));

/*			


				i1 = strTemp.indexOf('<div class="submitdiv"');
				if (i1 == -1) throw {message:'Cannot find div class="submitdiv" in page'}
				i1 = strTemp.indexOf('<img',i1);
                i2 = strTemp.indexOf('">',i1);
                strNotice = strTemp.slice(i1,i2);
                LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+strNotice);
                var param = GetPromptSend(strTemp);
				doFVStep21(param[0],param[1],param[2],strNotice);
*/
 NextRequest(0,aParams[3]);
	}

          } catch(err) {
		    LogPush('doFVStep2 err<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+'Error: WallItem DoFVStep 2 - '+err.message);
            //LogPush('Error: WallItem DoFVStep 2 - '+err.message);
            NextRequest(0,aParams[3]);
          }
        }
      });
    }

    function doFVStep3(_myUrl, _myParms,_strNotice) {
      //GM_log('WallItem doFVStep3');
      //LogPush('doFVStep3 _myUrl= ' + _myUrl + ', _myParms=' + _myParms);
	  if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      GM_xmlhttpRequest({
         method: 'GET', url:   _myUrl, data:  _myParms,
         headers: {
           'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
           'Accept-Language': 'en-us,en;q=0.5',
           'Content-Type':    'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1,i2, myUrl;
            var strTemp;
            var strNotice

            strNotice = '';

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}
/*
          strTemp = _responseDetails.responseText;
 if (EnableScript) {
          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0){
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0){
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
 }
*/

	    var param = doFBParse(_responseDetails.responseText);
	    if (param[0].length == 0){
                //LogPush('<b>'+Self.Type+'</b><br>'+strNotice);
				LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+_strNotice);
                NextRequest(0,aParams[3]);
            } else {
                doFVStep4(param[0],'',_strNotice);
            }

          } catch(err) {
            if (_strNotice != '')  strNotice = _strNotice +'<br>';
            strNotice += 'Failed';

			//if (strNotice.indexOf('Try again')==-1)
			LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+strNotice);
            //GM_log('Error: WallItem DoFVStep 3 - '+err.message);
            NextRequest(0,aParams[3]);
          }
        }
      });
    }

    function doFVStep4(_myUrl, _myParms, _strNotice) {
//LogPush('doFVStep4 _myUrl= ' + _myUrl + ', _myParms=' + _myParms);
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      //GM_log('WallItem doFVStep4');

      GM_xmlhttpRequest({
        method: 'POST', url:  _myUrl,
        headers: {
          'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
          try {
            var i1,i2, myUrl;
            var strTemp;
            var strNotice;

            strNotice = '';
            
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

        //if (EnableScript) {
	    //     var param = doFBParse(_responseDetails.responseText);
	    //     strTemp = param[2];
		//}

            if (_strNotice != '')  strNotice = _strNotice +'<br>';

            strNotice += '<b><font color=green>Actioned</font></b> ('+Self.BName+')';            
            LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+strNotice);
            NextRequest(0,aParams[3]);
          } catch(err) {
            if (_strNotice != '')  strNotice = _strNotice +'<br>';
            strNotice += '<br><b><font color=red>Failed</font></b>';
			if (strNotice.indexOf('Try again')==-1)
			LogPush('<b>'+Self.Type+': ' +  Self.AttachmentTitle+'</b> (' +  Self.ActorName +')<br>'+strNotice);			           
            GM_log('Error: WallItem DoFVStep 4 - '+err.message);
            NextRequest(0,aParams[3]);
          }
        }
      });
    }


    function doFVStep21(_myUrl, _myParms, _myUrl2, _GiftItem) {
      GM_log('WallItem DoFVStep 21 : ' + _myUrl);
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      GM_xmlhttpRequest({
          method: 'POST',
          url: _myUrl,
          data: _myParms,
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-SVN-Rev': gvar.svn_rev
          },
          onload: function(_responseDetails) {
            try {
              var i1, i2, myUrl, myParms;
              var strTemp;

              if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
              doFVStep22(_myUrl2,_myParms,_GiftItem);
            } catch(err) {
              LogPush('WallItem DoFVStep 21 - '+err.message);
              NextRequest(0,aParams[3]);
            }
          }
      });
    }

    function doFVStep22(_myUrl, _myParms, _GiftItem) {
      //GM_log('MW_AcceptGift doStep 7');
	  //LogPush('doStep7 _myUrl='+_myUrl + ', _myParms=' + _myParms);
	  if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-SVN-Rev': gvar.svn_rev
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl, myParms;
            var strTemp, strTemp2, resstr;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp = _responseDetails.responseText;

			LogPush(_GiftItem +'<br>trying to send back gift ...');
            NextRequest(0,aParams[3]);
          } catch(err) {
            LogPush(_GiftItem);
            //LogPush('Error: WallItem DoFVStep 22 - '+err.message);
            NextRequest(0,aParams[3]);
          }
        }
      });
    }


        // main code
        var myUrl, myParms, strNotice;
        var nextParms;

        var xmlhttp;
        var bSkipItem;
		var link1;
        var Self;
		var tmp_array = {'action':{'query':{'zy_track':''},'store':''},'sendkey':'','done':0};
        var query_link;

        try {
            //GM_log('Wall Notifications Start - ' + iWallCurrent);
            Self = this;
            bSkipItem = false;

            // stop processing if autorun turned off
            if (bAutoRun) {

					        if ((parseInt(aParams[2570]) == 1) && parseInt(user_health) < parseInt(aParams[2571]) && parseInt(user_health) > 19)
							   ReHeal(); 
							else if ((parseInt(aParams[2572]) == 1) && parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();

                //iHoldEvent = iWallCurrent;
                // ignore things if MW is not valid
                myParms   =  'skip_req_frame=1&first_load=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;

                switch (this.AppId) {
                    case 10979261223:
					    query_link = '';
                        //GM_log('proccess Wall Notification');

                        // fixing href
                        // remove //apps.facebook.com/inthemafia/http&?ref=nf#58;
                        //this.Action = this.Action.replace(/\/\/apps.facebook.com\/inthemafia\/http&\?ref=nf#58;/g,'');                       

                        if (this.Action.indexOf('apps.facebook.com/inthemafia/track.php') != -1)
						{
						    tmp_array['action'] = {	'query':getArgs(this.Action.replace(/&amp;/g,'&')) };
                            query_link = '?xw_controller=' + tmp_array.action.query.next_controller + 
							             '&xw_action=' + tmp_array.action.query.next_action;
						    if (tmp_array.action.query.next_params != undefined) {
						       eval('var param_array = ' + tmp_array.action.query.next_params.replace(/\+/g,'') + ';');
	                           for ( var i in param_array){
		                         query_link += '&' + i +'=' + escape(param_array[i]);
	                           }
							//}
	                        query_link += tmp_array.action.query.sendtime != undefined ? '&sendtime=' + tmp_array.action.query.sendtime : '' ;
	                        query_link += tmp_array.action.query.friend != undefined ? '&friend=' + tmp_array.action.query.friend : '' ;
	                        query_link += tmp_array.action.query.sendkey != undefined ? '&sendkey=' + decodeURIComponent(tmp_array.action.query.sendkey) : '' ;

                            myUrl = document.location.protocol+'//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php' + query_link;

                            switch (this.Type) {
                               case 'MW_WarHelp':
                                  strNotice   = '<b>' + this.Type+': ' +  this.AttachmentTitle+'</b> (' +  this.ActorName +')';
                                  doWarStep1(myUrl, myParms, strNotice, 0);
                                  break;
                               case 'MW_Missions':
                                  strNotice   = '<b>' + this.Type+': ' +  this.AttachmentTitle+'</b> (' +  this.ActorName +')';
                                  doMissionStep1(myUrl, myParms, strNotice);
                                  break;
                               case 'MW_DTV3':
                                  strNotice   = '<b>' + this.Type+': ' +  this.AttachmentTitle+'</b> (' +  this.ActorName +')';
                                  doDailyTakeStep1(myUrl, myParms, strNotice);
                                  break;
                               case 'MW_VegasSlots':
                                  doSlotsStep1(myUrl, myParms);
                                  break;
                               case 'MW_CollectGift':
				                  if (this.Action.indexOf('next_action=fan_blast') != -1) {
								   for (var i=0;i<15;i++) doCollectGift9(myUrl, myParms); 
							      }
                                  doCollectGift3(myUrl, myParms);
                                  break;
                               case 'Multi-Click':
								  for (var i=0;i<15;i++) doCollectGift9(myUrl, myParms); 
                                  doCollectGift3(myUrl, myParms);
                                  break;
                               case 'MW_Mission-Crew':
                                  doCollectGift3(myUrl, myParms);
                                  break;
                               case 'MW_CollectEnergy':
                                  doCollectEnergy3(myUrl, myParms);
                                  break;
                               case 'MW_3Spin':
                                  dospin(myUrl, myParms);
                                  break;
                               case 'MW_Levelupbonus':
								  //if (family.indexOf('[NONE') != -1 || family.indexOf('FUN') != -1) {
							      for (var i=0;i<15;i++) doCollectGift9(myUrl, myParms); //}
								  doMWStep3(myUrl,myParms);
                                  break;
                               case 'MW_AS':
								  if (getHoursTime('MW_astimer') == 0) {
								  //if (family.indexOf('[NONE') != -1 || family.indexOf('FUN') != -1) {
							      for (var i=0;i<6;i++) doCollectGift9(myUrl, myParms); //}
							      }
								  doMWStep3(myUrl,myParms);
                                  break;
                               case 'MW_SSportsBar':
								  if (!timeLeftGM('MW_SSportsBarTimer')) {
								  //if (family.indexOf('[NONE') != -1 || family.indexOf('FUN') != -1) {
							      for (var i=0;i<6;i++) doCollectGift9(myUrl, myParms); //}
							      }
								  doMWStep3(myUrl,myParms);
                                  break;
                               case 'MW_Sportsbar':
								  //if (family.indexOf('[NONE') != -1 || family.indexOf('FUN') != -1) {
							      for (var i=0;i<6;i++) doCollectGift9(myUrl, myParms); //}
								  doMWStep3(myUrl,myParms);
                                  break;
                               case 'MW_MissionReward':
								  doMWStep1(this.Action,'');
							      break;								  
                               default:
                                  doMWStep3(myUrl,myParms);
						          break;
                            }

					  	    } else { 
						      //   this.Action = this.Action.replace(/\/\/apps.facebook.com\/inthemafia\/http&\?ref=nf#58;/g,'')
								 //LogPush('Error: WallItem Main - next_params == undefined, this.Action=' + this.Action);
                                  //if (this.Type == 'MW_WarHelp')
								  if (this.Action.indexOf('_controller=war') != -1)
                                     doWarStep1(myUrl, myParms, strNotice, 0); 
								  else if (this.Action.indexOf('facebook.mafiawars.zynga.com/mwfb/remote/html_server.php') != -1)
									  doMWStep3(myUrl,myParms);
								  else
							          doMWStep1(this.Action,'');
								}

						} else {
						  //if (this.Action.indexOf('www.facebook.com') == -1)
						      //this.Action = this.Action.replace(/\/\/apps.facebook.com\/inthemafia\/http&\?ref=nf#58;/g,'')
                              //LogPush('WallItem Main - tiny, this.Action=' + this.Action);
							  //doMWStep1(this.Action,'');
								  if (this.Action.indexOf('_controller=war') != -1)
                                     doWarStep1(myUrl, myParms, strNotice, 0); 
								  else if (this.Action.indexOf('facebook.mafiawars.zynga.com/mwfb/remote/html_server.php') != -1)
									  doMWStep3(myUrl,myParms);
								  else
							          doMWStep1(this.Action,'');
						}
						 //} else { NextRequest(0,aParams[3]); }
                        break;
						
                    case 102452128776:
                        // FarmVille
                        // Ignore some types of jobs based on settings
                        //GM_log('proccess Wall Notification');
						//if (link2 != this.Action)
                          doFVStep1(this.Action,'');
						//link2 = this.Action;
                        break;			
						
                    case 156383461049284:
                        // FarmVille
                        // Ignore some types of jobs based on settings
                        //GM_log('proccess Wall Notification');
						//if (link2 != this.Action)
                          doFVStep1(this.Action,'');
						//link2 = this.Action;
                        break;	
                }

            } else {
                //GM_log('WallItem: Some one turned the swith off');
				LogPush('WallItem: Some one turned the swith off');
            }
        } catch(err) {
            LogPush('Error: WallItem Main - ' + err.message + ', this.Action=' + this.Action);
            //setTimeout("location.reload()",10000);
			location.reload(true);
            //NextRequest(0,aParams[3]);
        }
    }
}

function GetServerfbml(strTemp) {
 var  myUrl, myParms, i1, i2;
 myUrl =  document.location.protocol+'//www.facebook.com/plugins/serverfbml.php';
 //i1 =  strTemp.indexOf('FB.init({');
 //if (i1 == -1) {
    myParms = 'app_key=10979261223';
    //myParms += 'api_key=10979261223';
 //} else {
	//  i1 =  strTemp.indexOf("appId : '", i1);
    //  i1 += 9;
    //  i2 =  strTemp.indexOf("'",i1);
	//  myParms  =  'app_key=' + strTemp.slice(i1,i2);
 //}
 myParms  += '&sf_xw_user_id=' + escape(local_xw_user_id) + '&sf_xw_sig=' + local_xw_sig;
/*
 i1 =  i2 +1;
 i1 =  strTemp.indexOf('"http',i1)+1;
 i2       =  strTemp.indexOf('"',i1);
 myParms +=  '&channel_url=' +  encodeURIComponent(strTemp.slice(i1,i2));
*/
 myParms +=  '&channel_url=' + 'http%3A%2F%2Fstatic.ak.fbcdn.net%2Fconnect%2Fxd_proxy.php%23cb%3Df124b0305a5f82&origin%3Dhttp%253A%252F%252Ffacebook.mafiawars.zynga.com%252Ff3cfd3743a61022%26relation%3Dparent.parent%26transport%3Dpostmessage';
 i1       =  strTemp.indexOf('<fb:fbml>');
 i2       =  strTemp.indexOf('</script>',i1);
 myParms +=  '&fbml=' + encodeURIComponent(strTemp.slice(i1,i2));



 i1 = strTemp.indexOf('name="ids[]" value="',i1);
 if (i1 !=-1) {
    i1+=20;
    i2 = strTemp.indexOf('"', i1);
	myParms += '&to_ids[]=' + strTemp.slice(i1,i2);
 }

 return [myUrl, myParms];

}

function GetPromptSend(strTemp) {
 var myUrl, myUrl2, myParms, i1, i2;
 var strTemp2, aTemp;
 myUrl = document.location.protocol+'//www.facebook.com/fbml/ajax/prompt_send.php?__a=1';
 i1 = strTemp.indexOf('&quot;request_form',i1);
 i2 = strTemp.indexOf('&#125;);');
 strTemp2 = '{' + strTemp.slice(i1,i2) + '}'
 strTemp2 = strTemp2.replace(/&quot;/g,'"')
 aTemp = JSON.parse(strTemp2);

 myParms  = 'app_id='     + aTemp["app_id"];
 if (aTemp["app_id"] = '10979261223')
    myParms += '&sf_xw_user_id=' + escape(local_xw_user_id) + '&sf_xw_sig=' + local_xw_sig;
 myParms += '&to_ids[0]='   + aTemp["prefill"];
 myParms += '&request_type='  +escape(aTemp["request_type"]);
 myParms += '&invite='      + aTemp["invite"];

 //i1           =  strTemp.indexOf('content=\\"');
 //if (i1 == -1) throw { message: "Cannot find  content=\\ in page"}
 //i1          +=  10;
 //i2           =  strTemp.indexOf('"',i1)-1;

 i1 =  strTemp.indexOf('<div fb_protected="true" class="fb_protected_wrapper">');
 i1	=  strTemp.indexOf(' action="', i1);
 i1 += 9
 i2 =  strTemp.indexOf('"',i1);
 myUrl2  =  strTemp.slice(i1,i2).replace(/&amp;/g,'&');

 i1           =  strTemp.indexOf('content="',i1);
 //if (i1 == -1) throw {message:"Cannot find  content= in page"}
 if (i1 != -1) {
	i1 +=  9;
	i2  =  strTemp.indexOf('"',i1)-1;
    //strTemp2    =   eval('"' + strTemp.slice(i1,i2) + '"');
    //myParms     +=  '&content='     +encodeURIComponent(strTemp2);

    strTemp2    =   strTemp.slice(i1,i2)
    strTemp2    =   strTemp2.replace(/&quot;/g,'"');
    strTemp2    =   strTemp2.replace(/%/g,"%25");
    strTemp2    =   strTemp2.replace(/\$/g,"%24");
    strTemp2    =   strTemp2.replace(/</g,"%3C");
    strTemp2    =   strTemp2.replace(/>/g,"%3E");
    strTemp2    =   strTemp2.replace(/"/g,"%22");
    myParms     +=  '&content=' + codeStrings(strTemp2);
 }

 i1 = strTemp.indexOf('name="ids[]" value="');
 if (i1 != -1) {
    i1 += 20;
    i2  = strTemp.indexOf('"',i1);
    myParms += '&ids[]=' + strTemp.slice(i1,i2);
  }

  myParms     +=  '&preview=false';
  myParms     +=  '&is_multi='    + aTemp["is_multi"];
  myParms     +=  '&is_in_canvas='  + aTemp["is_in_canvas"];
  myParms     +=  '&form_id='     + aTemp["request_form"];
  myParms     +=  '&include_ci='    + aTemp["include_ci"];
  myParms     +=  '&prefill=true&message=&donot_send=false&__d=1';

  i1          =   strTemp.indexOf('name="post_form_id" value="');
  //if (i1 == -1) throw { message: 'Cannot find name="post_form_id" value=" in page'}
  if (i1 != -1) {
    i1 += 27;
    i2  = strTemp.indexOf('"',i1);
    myParms += '&post_form_id=' + strTemp.slice(i1,i2);
  }

  i1 =  strTemp.indexOf('fb_dtsg:"',i1);
  //if (i1 == -1) throw { message: 'Cannot find fb_dtsg:" in page'}
  if (i1 != -1) {
    i1 += 9;
    i2  = strTemp.indexOf('"',i1);
    myParms += '&fb_dtsg=' + strTemp.slice(i1,i2);
  }

  myParms  += '&post_form_id_source=AsyncRequest';
  return [myUrl, myParms, myUrl2];
}

function DoJobHelpMsg(aType) {
  switch (aType) {
    case 'MW_NeedHelp_NY':
	  if (getHoursTime('MW_NeedHelp_NYTimer') == 0) {
		  setGMTime('MW_NeedHelp_NYTimer', '1 hour');
		  return '<br><font color="red">Set MW_NeedHelp_NYTimer:</font> ' + getHoursTime('MW_NeedHelp_NYTimer');
	  }
      break;
    case 'MW_NeedHelp_Bangkok':
	  if (getHoursTime('MW_NeedHelp_BangkokTimer') == 0) {
		  setGMTime('MW_NeedHelp_BangkokTimer', '1 hour');
		  return '<br><font color="red">Set MW_NeedHelp_BangkokTimer:</font> ' + getHoursTime('MW_NeedHelp_BangkokTimer');
	  }
	  break;
    case 'MW_NeedHelp_Vegas':
	  if (getHoursTime('MW_NeedHelp_VegasTimer') == 0) {
 		  setGMTime('MW_NeedHelp_VegasTimer', '1 hour');
		  return '<br><font color="red">Set MW_NeedHelp_VegasTimer:</font> ' + getHoursTime('MW_NeedHelp_VegasTimer');
	  }
	  break; 
    case 'MW_NeedHelp_Italy':
	  if (getHoursTime('MW_NeedHelp_ItalyTimer') == 0) {
		  setGMTime('MW_NeedHelp_ItalyTimer', '1 hour');
		  return '<br><font color="red">Set MW_NeedHelp_ItalyTimer:</font> ' + getHoursTime('MW_NeedHelp_ItalyTimer');
	  }
	  break; 
    case 'MW_NeedHelp_Brazil':
	  if (getHoursTime('MW_NeedHelp_BrazilTimer') == 0) {
		  setGMTime('MW_NeedHelp_BrazilTimer', '1 hour');
		  return '<br><font color="red">Set MW_NeedHelp_BrazilTimer:</font> ' + getHoursTime('MW_NeedHelp_BrazilTimer');
	  }
	  break; 
    case 'MW_NeedHelp_Chicago':
	  if (getHoursTime('MW_NeedHelp_ChicagoTimer') == 0) {
		  setGMTime('MW_NeedHelp_ChicagoTimer', '1 hour');
		  return '<br><font color="red">Set MW_NeedHelp_ChicagoTimer:</font> ' + getHoursTime('MW_NeedHelp_ChicagoTimer');
	  }
	  break; 
    case 'MW_NeedHelp_London':
	  if (getHoursTime('MW_NeedHelp_LondonTimer') == 0) {
		  setGMTime('MW_NeedHelp_LondonTimer', '1 hour');
		  return '<br><font color="red">Set MW_NeedHelp_LondonTimer:</font> ' + getHoursTime('MW_NeedHelp_LondonTimer');
	  }
	  break; 
    case 'MW_BossBonus':
	  if (getHoursTime('MW_bossbonustimer') == 0) {
		  setGMTime('MW_bossbonustimer', '1 hour');
		  return '<br><font color="red">Set MW_bossbonustimer:</font> ' + getHoursTime('MW_bossbonustimer');
	  }
	  break; 
    default:
	  return '<br>';
	  break;
  }	
}

function DoSupplyHelpMsg(aType) {
  var str = '<br>';
  switch (aType) {
     case 'MW_PLondono':
		if (getHoursTime('MW_MW_PLondonTimer') == 0) {
			setGMTime('MW_MW_PLondonTimer', '1 hour');
			str += '<font color="red">Set MW_PLondonTimer:</font> ' + getHoursTime('MW_PLondonTimer');
		}
        break;
     case 'MW_PChicago':
		if (getHoursTime('MW_PChicagoTimer') == 0) {
			setGMTime('MW_PChicagoTimer', '1 hour');
			str += '<font color="red">Set MW_PChicagoTimer:</font> ' + getHoursTime('MW_PChicagoTimer');
		}
        break;
     case 'MW_PBrazil':
		if (getHoursTime('MW_PBrazilTimer') == 0) {
			setGMTime('MW_PBrazilTimer', '1 hour');
			str += '<font color="red">Set MW_PBrazilTimer:</font> ' + getHoursTime('MW_PBrazilTimer');
		}
		break;
     case 'MW_PItaly':
		if (getHoursTime('MW_PItalyTimer') == 0) {
			setGMTime('MW_PItalyTimer', '1 hour');
			str += '<font color="red">Set MW_PItalyTimer:</font> ' + getHoursTime('MW_PItalyTimer');
		}
		break;
     case 'MW_PVegas':
		if (getHoursTime('MW_PVegasTimer') == 0) {
			setGMTime('MW_PVegasTimer', '1 hour');
			str += '<font color="red">Set MW_PVegasTimer:</font> ' + getHoursTime('MW_PVegasTimer');
		}
		break;
     default:
		break;
  }			
  return str;
}


function getArgs(url) {
   //var url = urlDecode(url).replace('&%next_param%&','&').replace('=%','=').replace('&%','&').replace('%&','&').replace(/"/g,'\'');
   var url = urlDecode(url).replace('&%next_param%&','&').replace('%7B','{').replace('%22','"').replace('%7D','}').replace(/"/g,'\'');
   //var url = urlDecode(url);
	var args = new Object();
	if (url == undefined){
		var query = location.search.substring(1);
	}else{
		var url_array = url.split('?');
		var query = url_array[1];
	}
	var pairs = query.split('&');
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	}
	return args;
}

function urlDecode(str){
	str=unescape(str);
	str=str.replace(new RegExp('\\+','g'),' ');
	return str;
}

// Request Item

function RequestItem () {
    this.Action     =   '';
    this.Reject     =   '';
    this.Parms      =   '';
    this.From       =   '';
    this.Giftname   =   '';
    this.Gifttype   =   '';
    this.RelAction  =   '';
    this.Next       =   null;
    this.Process    =   function() {

        function NextRequest(_delay1, _delay2) {
            if (bAutoRun) {
                if (Self.Next != null) {
                    setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(_delay1*750,_delay1*1250));
                } else {
                    LogPush('<strong>Finished processing Requests.  Checking again in ' +  _delay2 +' minutes.</strong>');
                    setTimeout(function (e)  { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(_delay2*50000,_delay2*70000));
					//setTimeout(check, 500);
                }
            }
        }

        // Mafia Wars Code

 function MW_AcceptMission() {

            function doStep1(_myUrl, _myParms) {
             //   GM_log('MW_AcceptMission doStep 1');
               GM_xmlhttpRequest({
                    method: 'POST', url:  _myUrl, data: _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            gvar.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

							if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}
							strTemp = _responseDetails.responseText;                           

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));
	
                            myUrl = "";
                            for (var i=0;i<oDetails.onload.length;i++) {
                                if (oDetails.onload[i].indexOf('goURI')!=-1) eval("myUrl = " + oDetails.onload[i].slice(6,-2));            	
                            }

				            if (myUrl != "") {
				                 doStep2(myUrl,'');
				            } else {
				                // and error has occured while trying to process the request.
					            //GM_log('Msg = '+oDetails.payload.msg);
				                 strDetails  = '<b>Mafia Wars Accept Mission:</b><br>';
								 i1      = oDetails.onload[0].indexOf('HTML(')+6;
								 i2      = oDetails.onload[0].indexOf('));',i1);
								 strDetails = oDetails.onload[0].slice(i1,i2-1);
								 strDetails = strDetails.replace(/\\u003c/g,'<');
								 strDetails = strDetails.replace(/\\/g,"");

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }
                        } catch(err) {
                            LogPush('Error: MW_AcceptMission DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }

            function doStep3(_myUrl, _myParms) {
                //GM_log('MW_AcceptMission doStep 3');

                GM_xmlhttpRequest({
                    method: 'GET', url:  _myUrl,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, i1b, i1c, i1d, myUrl, myParms;
                            var strTemp;
                            var strDetails;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}


          strTemp = _responseDetails.responseText;
 if (EnableScript) {
          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0){
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0){
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
 }

          i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb');
          if (i1==-1) i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb');
                            if (i1==-1) throw {message:'Cannot find form action="'}
              
                            //extract MW protected form
                            i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
              
                            //find URL
                            i1 = strTemp.indexOf('"')+1; i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);
                            myUrl = myUrl.replace(/&amp;/g,'&');
							myUrl = myUrl.replace(/\\/g,'');
                            myParms = '';
              
                            i1 = strTemp.indexOf('<input');
                            while (i1!=-1) {
                              if (myParms!='') myParms += '&'
                                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                                myParms += strTemp.slice(i1,i2)+'='
                                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                                myParms += escape(strTemp.slice(i1,i2));
                                i1 = strTemp.indexOf('<input',i1);
                            }

                            doStep3a(myUrl,myParms);
                        } catch(err) {
                            LogPush('Error: MW_AcceptMission DoStep 3 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }


            function doStep3a(_myUrl, _myParms) {
                //GM_log('MW_AcceptMission doStep 3a');

                GM_xmlhttpRequest({
                    method: 'POST', url:  _myUrl,  data: _myParms,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1, i2, strTemp, myUrl, myParms;
                            var strNotice;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                            i1 = strTemp.indexOf('action="');
                            if (i1 == -1) throw {message:"Cannot find action= in page"}

                            // extract URL
                            i1 += 8;
                            i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);

                            myParms = '';
                            i1 = strTemp.indexOf('<input',i1);
                            while (i1!=-1) {
	                            if (myParms!='') myParms += '&'
                                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                                myParms += strTemp.slice(i1,i2)+'='
                                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                                myParms += escape(strTemp.slice(i1,i2));
								i1 = strTemp.indexOf('<input',i1);
                            }

                            strNotice   = '<b>Mafia Wars Social Mission:</b>'
                            doMissionStep1(myUrl,myParms,strNotice);
                        } catch(err) {
                            LogPush('Error: MW_AcceptMission DoStep 3a - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }


            function doMissionStep1(_myUrl, _myParms, _strNotice) {
                //GM_log('MW_AcceptMission doMissionStep1');

                GM_xmlhttpRequest({
                    method: 'POST',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5',
                        'Content-Type':    'application/x-www-form-urlencoded'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, i3, i4, myUrl, myParms;
                            var strTemp;
                            var strMissionName, bSkipMission;
                            var strNotice;

                            var oDiv, oSnapShot;
                            var bSkipItem;

                            var strMissionLevel;
                            var strMissionJob;

                            if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                            strTemp =   _responseDetails.responseText;

	                        if (strTemp.indexOf('Operation has expired.')!=-1) {
                                strNotice = _strNotice+'<br>Mission has expired.';
                                LogPush(strNotice);
                                NextRequest(aParams[0],aParams[1]);
	                        } else if (strTemp.indexOf('Sorry, this operation is already full.')!=-1) {
	                            strNotice = _strNotice+'<br>Sorry, this mission is already full.';
	                            LogPush(strNotice);
	                            NextRequest(aParams[0],aParams[1]);
	                        } else if (strTemp.indexOf('Successfully joined the operation')!=-1) {
                                strNotice = _strNotice+'<br>Successfully joined the mission.';
								user_socialmissions = user_socialmissions + 1;
                                LogPush(strNotice);
                                NextRequest(aParams[0],aParams[1]);
	                        } else if (strTemp.indexOf('You are already a member of this operation')!=-1) {
                                strNotice = _strNotice+'<br>You are already a member of this mission.';
                                LogPush(strNotice);
                                NextRequest(aParams[0],aParams[1]);
                            } else if (strTemp.indexOf('Can only help in 10 missions at a time.') !=-1) {
							  if (getHoursTime('MW_MissionTimer') == 0) {
						        setGMTime('MW_MissionTimer', '1 hour');
							    LogPush('<font color="red">Set MW_MissionTimer:</font> ' + getHoursTime('MW_MissionTimer'));
							  }
                                strNotice = _strNotice+'<br>Can only help in 10 missions at a time.';
                                LogPush(strNotice);
                                NextRequest(aParams[0],aParams[1]);
	                        } else if (strTemp.indexOf('<div class="doTaskButton">')!=-1) {
		                        // doTaskButton will only show up if you have successfully joined a mission
	                            strNotice = _strNotice+'<br>Successfully joined the mission.';
								user_socialmissions = user_socialmissions + 1;
                                LogPush(strNotice);
                                NextRequest(aParams[0],aParams[1]);
	                        } else if (strTemp.indexOf('<div class="missionSelectorButton">')!=-1) {
		                    	// found some select buttons
		                    	
		                    	//Try again notice
		                        if (strTemp.indexOf('Sorry, that position has already been taken. Try another one.')!=-1) {
		                            strNotice += _strNotice+'<br>Sorry, that position has already been taken. Try another one.';
		                        }
		                       
								// find the mission's name
								if ( strTemp.indexOf('<div class="missionSelectHeaderTitle">') != -1) {
									i1 = strTemp.indexOf('<div class="missionSelectHeaderTitle">');
									i2 = strTemp.indexOf('</div>',i1);
								    strMissionName = strTemp.slice(i1+38,i2);
								    
								    bSkipMission = true;
								    
								    for (iMission in MW_SecretMissions) {
								        if (iMission==2399) {
								            GM_log('Processing Unknown Mission');			                      
								            if (aParams[2399]==true) bSkipMission = false;
								            GM_log(strTemp);
								            break;
								        } else if (strMissionName.toUpperCase().indexOf(MW_SecretMissions[iMission].test.toUpperCase()) != -1) {
								            if (aParams[iMission] == true) bSkipMission = false;
								            GM_log('Processing '+strMissionName);
								            break;
								        } else {
								            //GM_log('Skipping '+strMissionName);
								        }
								    }
								} else {
								    // this is for repeat searches.
								    bSkipMission = true;
								    LogPush('Error Reading Mission');
								    GM_log(strTemp);
								}
								
								if (!bSkipMission) {
								    i1 = strTemp.indexOf('<div class="missionSelectorButton">');
                                // process a mission request
                                i3 = strTemp.indexOf('<div id="positionSelector"');
                                i4 = strTemp.indexOf('</table>')+8;
                                oDiv = document.createElement('div');
                                oDiv.innerHTML = strTemp.slice(i3,i4) + '</div>';
                                myUrl    = document.location.protocol+'//facebook.mafiawars.zynga.com/mwfb/';
                                // find all the possible jobs
                                i2 = 0;
	                            if (aParams[2023]=='both') {
                                //oSnapShot = getSnapshot('.//div[@class="missionSelectorButton"]',oDiv);
								oSnapShot = getSnapshot('.//div[@class="missionSelectorBox"]',oDiv);
								bSkipItem = true;
                                //oSnap = oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).innerHTML;
								//if ((oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).innerHTML.indexOf('<dd style="margin-left: 60px;" class="stamina')!=-1)) 
								if (oSnapShot.snapshotItem(0).innerHTML.indexOf('<dd style="margin-left: 60px;" class="stamina')!=-1)
									{
									   if (user_stamina > parseInt(aParams[9052])) { 
									      user_stamina = user_stamina - 250;
								          document.getElementById('user_stamina').innerHTML= '<Font Color="blue"><B>Stamina</B></font><BR>' + user_stamina;
									      bSkipItem = false;
										  LogPush(_strNotice+'<br>Accept Mission Request(Both)-stamina: ' + user_stamina + ' (' + aParams[9052] + ')');
								      } else {
										  if (aParams[2561]==1) {
										    aParams[2023]='energy';
										    LogPush(_strNotice+'<br>Skip Mission Request(Both)-stamina: ' + user_stamina + ' (' + aParams[9052]+') -> chang to energy');
										  }
									  } 
									}									
								//if ((oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).innerHTML.indexOf('<dd style="margin-left: 60px;" class="energy')!=-1)) 
								if (oSnapShot.snapshotItem(0).innerHTML.indexOf('<dd style="margin-left: 60px;" class="energy')!=-1)
									{ 
									    if (user_energy > parseInt(aParams[9051])) {
									      user_energy = user_energy - 250;
								          document.getElementById('user_energy').innerHTML= '<Font Color="blue"><B>Energy</B></font><BR>' + user_energy;
									      bSkipItem = false;
										  LogPush(_strNotice+'<br>Accept Mission Request(Both)-energy: ' + user_energy + ' (' + aParams[9051] + ')');
								      } else {
										  LogPush(_strNotice+'<br>Skip Mission Request(Both)-energy:' + user_energy + ' (' + aParams[9051]+')');
									  }
									}

                                if (!bSkipItem)
								{
								oSnap = oSnapShot.snapshotItem(0).innerHTML
                                i1 = oSnap.indexOf('inner_page')+13;
                                i2 = oSnap.indexOf("'",i1);
                                i3 = oSnap.indexOf('<div class="positionName"');
                                i3 = oSnap.indexOf('http',i3);
                                i4 = oSnap.indexOf(')',i3);
                                }

	                            } else {
                                oSnapShot = getSnapshot('.//div[@class="missionSelectorBox"]',oDiv);
	                                //var oSnapShot2 = getSnapshot('.//div[@class="missionSelectorButton"]',oDiv);
                                for (var i=0;i<oSnapShot.snapshotLength;i++) {
	                                    //avoid those job with two items
	                                    if ((oSnapShot.snapshotItem(i).innerHTML.indexOf('<dd style="margin-left: 60px;" class="stamina')!=-1) && (oSnapShot.snapshotItem(i).innerHTML.indexOf('<dd style="margin-left: 60px;" class="energy')!=-1)) {
		                                	// skip item uses both energy and stamina
	                                	} else if (oSnapShot.snapshotItem(i).innerHTML.indexOf('<dd style="margin-left: 60px;" class="'+aParams[2023])!=-1) {
											bSkipItem = true;
											   if (user_energy > parseInt(aParams[9051]) && aParams[2023].toUpperCase() =='ENERGY') { 
												   user_energy = user_energy - 250; 
												   bSkipItem = false; 
												   document.getElementById('user_energy').innerHTML= '<Font Color="blue"><B>Energy</B></font><BR>' + user_energy;
												   LogPush(_strNotice+'<br>Accept Mission Request(energy)- ' + user_energy + ' (' + aParams[9051] + ')');
												}
											   if (user_stamina > parseInt(aParams[9052]) && aParams[2023].toUpperCase() =='STAMINA') { 
												   user_stamina = user_stamina - 250; 
												   bSkipItem = false; 
												   document.getElementById('user_stamina').innerHTML= '<Font Color="blue"><B>Stamina </B></font><BR>' + user_stamina; 
												   LogPush(_strNotice+'<br>Accept Mission Request(stamina)- ' + user_stamina + ' (' + aParams[9052] + ')');
											    }
                                           if (!bSkipItem) {
                                               oSnap = oSnapShot.snapshotItem(i).innerHTML
                                               i1 = oSnap.indexOf('inner_page')+13;
                                               i2 = oSnap.indexOf("'",i1);
                                               i3 = oSnap.indexOf('<div class="positionName"');
                                               i3 = oSnap.indexOf('http',i3);
                                               i4 = oSnap.indexOf(')',i3);
                                                break;
                                            } else {
                                               strNotice = _strNotice+'<br>Skipping Mission:<a href="'+Self.Action+'">'+strMissionName+'</a>, ';
                                               LogPush(strNotice);
											   LogPush('Skip - ' + user_energy + ' - ' + aParams[9051]);
											   LogPush('Skip - ' + user_stamina + ' - ' + aParams[9052]);
                                               NextRequest(aParams[0],aParams[1]);
                                            }
                                        }
                                }
                            }
	                            
	                            if (i2>0) {
                                myUrl   += oSnap.slice(i1,i2)

                                myParms = 'ajax=1&liteload=1'
                                myParms += '&sf_xw_sig=' + local_xw_sig;
                                myParms += '&sf_xw_user_id=' + local_xw_user_id;
                                myUrl = myUrl.replace(/&amp;/g,'&');

                                GM_log(oSnap.slice(i3,i4-6));

	                                strNotice = _strNotice+'<br>Selecting Mission - <img src="'+oSnap.slice(i3,i4-6)+'">';

                                doMissionStep1(myUrl, myParms, strNotice);
	                               } else if (i2==0) {
	                                   strNotice = _strNotice+'<br>Skipping Mission, Job type not found';
	                                   LogPush(strNotice);
	                                   NextRequest(aParams[0],aParams[1]);
	                               }
									
                                } else {
			                        strNotice = _strNotice+'<br>Secret Mission Skipped ('+strMissionName+')';
                                    LogPush(strNotice);
                                    NextRequest(aParams[0],aParams[1]);
                                }
                            } else {
		                        LogPush('Error processing Mission');
		                        strNotice = _strNotice+'<br>Error Processing Mission.';
                                LogPush(strNotice);
                                NextRequest(aParams[0],aParams[1]);
                            }

                        } catch(err) {
                            LogPush('Error: MW_AcceptMission doMissionStep1 - ' + err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }





            try {
                GM_log('MW_AcceptMission Gift Main');

	            if (Self.Parms.indexOf('actions[reject]') == -1)
                  doStep1(strBase,Self.Parms);
	            else
                  doStep1(strBase2,Self.Parms);

            } catch(err) {
                LogPush('Error: MW_AcceptMission main - ' + err.message);
                NextRequest(aParams[0],aParams[1]);
            }

        }


        function MW_AcceptGift() {
            function doStep1(_myUrl, _myParms) {
                //GM_log('MW_AcceptGift doStep 1');
                GM_xmlhttpRequest({
                    method: 'POST', url:  _myUrl, data: _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            gvar.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp, strTemp2;
                            var strDetails;
                            var oDetails;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));
	
                            myUrl = "";
                            for (var i=0;i<oDetails.onload.length;i++) {
                                if (oDetails.onload[i].indexOf('goURI')!=-1) eval("myUrl = " + oDetails.onload[i].slice(6,-2));            	
                            }

				            if (myUrl != "") {
				                 doStep2(myUrl,'');
				            } else {
				                // and error has occured while trying to process the request.
					            //GM_log('Msg = '+oDetails.payload.msg);
				                 strDetails  = '<b>Mafia Wars Accept Gift:</b><br>';
								 i1      = oDetails.onload[0].indexOf('HTML(')+6;
								 i2      = oDetails.onload[0].indexOf('));',i1);
								 strDetails = oDetails.onload[0].slice(i1,i2-1);
								 strDetails = strDetails.replace(/\\u003c/g,'<');
								 strDetails = strDetails.replace(/\\/g,"");

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }
                        } catch(err) {
                            LogPush('Error: MW_AcceptGift DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }


  function doStep2(_myUrl, _myParms) {
      GM_xmlhttpRequest({
        method: 'GET', url:  _myUrl,
        headers: {
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
         try {
            var i1,i2, i1b, i1c, i1d, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

          strTemp = _responseDetails.responseText;

   //if (strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb') == -1) {
   if (EnableScript) {

          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0){
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0){
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
  }
          i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb');
          if (i1==-1) i1 = strTemp.indexOf('<form action="https://facebook.mafiawars.zynga.com/mwfb');
            if (i1!=-1) {
              //extract MW protected form
              i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
              //find URL
              i1 = strTemp.indexOf('"')+1; i2 = strTemp.indexOf('"',i1);
              myUrl = strTemp.slice(i1,i2);
              myUrl = myUrl.replace(/&amp;/g,'&');
              myParms = '';

              i1 = strTemp.indexOf('<input');
              while (i1!=-1) {
                if (myParms!='') myParms += '&'
                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                myParms += strTemp.slice(i1,i2)+'='
                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                myParms += escape(strTemp.slice(i1,i2));
                i1 = strTemp.indexOf('<input',i1);
              }
              doStep2a(myUrl,myParms);
            } else {
				LogPush('Error: MW_AcceptGift DoStep 2 - '+strTemp);
			}


           } catch(err) {
              LogPush('Error: MW_AcceptGift DoStep 2 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }


        function doStep2a(_myUrl, _myParms) {
            GM_xmlhttpRequest({
                method: 'POST',
                url:  _myUrl,
                data: _myParms,
                headers: {
                'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-us,en;q=0.5',
                'Content-Type':    'application/x-www-form-urlencoded'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1, i2, strTemp, myUrl, myParms;
                        var strNotice;

                        if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                        strTemp = _responseDetails.responseText;

                        //i1 = strTemp.indexOf('action="');
						i1 = strTemp.indexOf('top.location.href = "');

                        if (i1 == -1) throw { message: "Cannot find action= in page"}

                        // extract URL
						i1 = strTemp.indexOf('http://',i1);
					    if (i1==-1) i1 = strTemp.indexOf('https://',i1);
                        i2 = strTemp.indexOf('"',i1);
                        myUrl = strTemp.slice(i1,i2);

                       myParms   =  'skip_req_frame=1&first_load=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;
                       doStep2b(myUrl, myParms);

                    } catch(err) {
                        LogPush('Error: MW_AcceptGift DoStep 2a - ' + err.message);
                        NextRequest(aParams[0],aParams[1]);
                    }
                }
            });
        }



  function doStep2b(_myUrl, _myParms) {
      GM_xmlhttpRequest({
        method: 'GET', url:  _myUrl,
        headers: {
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
         try {
            var i1,i2, i1b, i1c, i1d, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;

			if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

          strTemp = _responseDetails.responseText;
   //if (strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb') == -1) {
   if (EnableScript) {
          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0){
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0){
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
   }
          i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb');
          if (i1==-1) i1 = strTemp.indexOf('<form action="https://facebook.mafiawars.zynga.com/mwfb');
		  if (i1 == -1) throw { message: "Cannot find form action= in page"}

              //extract MW protected form
              i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
              //find URL
              i1 = strTemp.indexOf('"')+1; i2 = strTemp.indexOf('"',i1);
              myUrl = strTemp.slice(i1,i2);
              myUrl = myUrl.replace(/&amp;/g,'&');
              myParms = '';

              i1 = strTemp.indexOf('<input');
              while (i1!=-1) {
                if (myParms!='') myParms += '&'
                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                myParms += strTemp.slice(i1,i2)+'='
                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                myParms += escape(strTemp.slice(i1,i2));
                i1 = strTemp.indexOf('<input',i1);
              }
              doStep3(myUrl,myParms);
 

           } catch(err) {
              LogPush('Error: MW_AcceptGift DoStep 2b - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

  function doStep3(_myUrl, _myParms) {
      //GM_log('MW_AcceptEnergy doStep 5');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      GM_xmlhttpRequest({
      method: 'POST',
      url:  _myUrl, data: _myParms,
      headers: {
        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language':  'en-us,en;q=0.5',
        'Content-Type':   'application/x-www-form-urlencoded'
      },
      onload: function(_responseDetails) {
        try {       
          var i1, i2, strTemp;  

          if (_responseDetails.status != 200) throw {message:'Status 200 error'}
          strTemp = _responseDetails.responseText;
                        i1 = strTemp.indexOf('action="');
						if (i1 == -1) throw { message: "Cannot find action= in page"}
                            // extract URL
                            i1 += 8;
                            i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);

                            myParms = '';
                            i1 = strTemp.indexOf('<input',i1);
                            while (i1!=-1) {
                                i1 = strTemp.indexOf('name="',i1)+6;
                                i2 = strTemp.indexOf('"',i1);
                                if (myParms=='')
                                    myParms = strTemp.slice(i1,i2)+'='
                                else
                                    myParms += '&'+strTemp.slice(i1,i2)+'=';
                                i1 = strTemp.indexOf('value="',i1)+7;
                                i2 = strTemp.indexOf('"',i1);
                                myParms += escape(strTemp.slice(i1,i2));

                                i1 = strTemp.indexOf('<input',i1); 
                            } 
							doStep4(myUrl,myParms);
        
        } catch(err) {
              LogPush('Error: MW_AcceptGift DoStep 3 - ' + err.message);
              NextRequest(aParams[0],aParams[1]);
        }
      }
    });
  }

            function doStep4(_myUrl, _myParms) {
                //GM_log('MW_AcceptGift doStep 4');
                GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                         'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                         'Accept-Language': 'en-us,en;q=0.5',
                         'Content-Type':    'application/x-www-form-urlencoded'

                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2,i3,i4,i5,i6,i7,i8, myUrl;
                            var strTemp;
                            var strNotice = '';
                            var stopit;

                            var oDiv, oSnapShot;
                            var GiftItem;
                            var strAppKey;

                            if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                                //Check for Larger Black Gift Screen.

                                // normal gift
                                i1 = strTemp.indexOf('<div style="border-bottom: 1px dotted #999; margin: 10px auto; text-align: center; font-size: 20px; padding-bottom: 10px;">');
                                i2 = strTemp.indexOf('<div style="border-bottom: 1px dotted #333; margin: 10px auto; text-align: left; font-size: 18px; padding: 10px 0;">');
                                //i4 = strTemp.indexOf('<div style="border: 1px solid #666666; padding:10px; background-color:black;">');
								i4 = strTemp.indexOf('<div style="border: 1px solid rgb(102, 102, 102); padding: 10px; background-color: black;">');
								i5 = strTemp.indexOf('<div style="border: 1px solid #666666; padding:10px; background-color:black;">');
								i6 = strTemp.indexOf('<div class="gift_accept_message">');
								i8 = strTemp.indexOf('<div style="border-right: 1px solid');
							    // <div style="border-right: 1px solid #00ff00; border-left: 1px solid #00ff00; position: relative; padding-top: 20px;">

                                //normal gift
                                if (i1 !=- 1 || i2 != -1) {
									if (i1 != -1 ) i7 = 0; else i7 = i2;
									if (i2 !=- 1) i1 = i2;
                                    i1 = strTemp.indexOf('<div style="margin-bottom:10px;">',i1);
                                    if (i1 !=- 1) {
                                        i2 = strTemp.indexOf('</div>',i1);
                                        strNotice += '<font color="blue">' + strTemp.slice(i1,i2) + '</font>';
                                    }
 
                                    i1 = strTemp.indexOf('<div style="float: left;">',i1);
									if (i1 !=- 1) {
                                        i2 = strTemp.indexOf('</div>',i1);
                                        strNotice += '<table><tbody><tr><td colspan="3">';
                                        strNotice += strTemp.slice(i1,i2);
                                        strNotice += '</td></tr><tr><td style="width: 130px; text-align: center;">';

                                        if (i7 == 0) {
                                        i1 = strTemp.indexOf('<img src=',i2);
                                        i2 = strTemp.indexOf('</div>',i1);
                                        strNotice += strTemp.slice(i1,i2+6);
										} else {
										 i1 = strTemp.indexOf('<img src=',i2);
										 i2 = strTemp.indexOf('>',i1);
										 strNotice += strTemp.slice(i1,i2+1);
										 i1 = strTemp.indexOf('<div',i2);
										 i1 = strTemp.indexOf('<div',i1+1);
										 i2 = strTemp.indexOf('</div>',i1);
										 strNotice += strTemp.slice(i1,i2+6);
										}

                                        strNotice += '</td><td width="50"><img src="'+document.location.protocol+'//zyngapv.hs.llnwd.net/e6/mwfb/graphics/gift_loop_arrow_green_39x50_01.png"></td><td>';

                                        i1 = strTemp.indexOf('<div style="float: left; text-align: center; width: 200px;',i2);
                                        i1 = strTemp.indexOf('<a',i1)
                                        i2 = strTemp.indexOf('<fb:profile-pic',i1);

                                        strNotice += '<div style="float: left; text-align: center; width: 200px;">';
                                        strNotice += strTemp.slice(i1,i2);
										strNotice += '<img width="50" src="'+document.location.protocol+'//static.ak.connect.facebook.com/pics/t_silhouette.jpg">';

                                        i1 = strTemp.indexOf('</a>',i2);
                                        i2 = strTemp.indexOf('</div>',i1);
                                        strNotice += strTemp.slice(i1,i2);
                                        strNotice += '</div></td></tr></table>';
                                        strNotice = strNotice.replace(/<a class="sexy_button_new(.|\s)*?\/a>/g, '');
									}
                                    GiftItem    = '<b>Mafia Wars Accept Gift: i2</b><table>' + strNotice + '</table>';
					
                                    // look for regift button
                                   // i1 = strTemp.indexOf('<iframe style="border:0;" id="giftback_iframe"');

									    LogPush(GiftItem+'<br><font color=blue>Send button not found.</font>');
                                        NextRequest(aParams[0],aParams[1]);

                                } else if (i6!=-1) {
                                    i1 = i6+33;
                                    i2 = strTemp.indexOf('<br/>',i1);
                                   // strNotice = strTemp.slice(i1,i2);

                                    strNotice  = '<table><tbody><tr><td colspan="3">';
                                    strNotice += strTemp.slice(i1,i2);
                                    strNotice += '</td></tr><tr><td style="width: 130px; text-align: center;">';

                                    i1 = strTemp.indexOf('<img src=',i2);
                                    i2 = strTemp.indexOf('<div class="sent_gift">',i1);
                                    strNotice += strTemp.slice(i1,i2);
                                    strNotice += '</td><td width="50"><img src="'+document.location.protocol+'//zyngapv.hs.llnwd.net/e6/mwfb/graphics/gift_loop_arrow_green_39x50_01.png"></td><td>';

                                    i1 = strTemp.indexOf('<img style=',i2);
                                    i2 = strTemp.indexOf('</div>',i1);
									strNotice += strTemp.slice(i1,i2);
                                    strNotice += '</td></tr></table>';
                                  
                                    i1 = strTemp.indexOf('<div class="gift_accept_gift_box">',i2);
                                    if (i1!=-1) {
                                      i2 = strTemp.indexOf('<br/>',i1);
                                      strNotice += '<table>' + strTemp.slice(i1,i2) + '</table>';
									}
									
									GiftItem    = '<b>Mafia Wars Accept Gift: i6</b><table>' + strNotice+'</table>';
                                    LogPush(GiftItem);
                                    NextRequest(aParams[0],aParams[1]);

                                 } else if (i4 != -1 || i5 != -1) {
                                   //i1 = strTemp.indexOf('>',i4)+1;
                                   //i2 = strTemp.indexOf('<div style=', i1);
								   if (i4!=-1) 
									   i1 = strTemp.indexOf('>',i4)+1
								   else 
									   i1 = strTemp.indexOf('>',i5)+1;
								       if (strTemp.indexOf('<span style="font-size:24px; color: pink;">', i1) != -1) 
                                        i1 = strTemp.indexOf('<span style="font-size:24px; color: pink;">',i1)+43;
							       i2 = strTemp.indexOf('<div style=', i1);

                                   GiftItem    = '<b>Mafia Wars Accept Gift:</b>'+ GiftItem;
                                   // ( error code: kn-39 ) Something went wrong when you tried to accept ...
                                   LogPush(GiftItem);
                                   NextRequest(aParams[0],aParams[1]);

                                } else if (i8 != -1) {
									//i7 = strTemp.indexOf('<div style="border-right: 1px solid');
                                    i1 = i8;
                                    i2 = strTemp.indexOf('<div style="float: left;',i1);
                                    strNotice += '<table><tbody><tr><td colspan="3">';
                                    strNotice += strTemp.slice(i1,i2);
                                    strNotice += '</td></tr><tr><td style="width: 130px; text-align: center;">';
                                    strNotice += '</td><td width="50"><img src="'+document.location.protocol+'//zyngapv.hs.llnwd.net/e6/mwfb/graphics/gift_loop_arrow_green_39x50_01.png"></td><td>';

                                    i1 = strTemp.indexOf('<div style="float: left; text-align: center; width: 200px;',i2);
                                    i1 = strTemp.indexOf('<a',i1)
                                    i2 = strTemp.indexOf('<fb:profile-pic',i1);

                                    strNotice += '<div style="float: left; text-align: center; width: 200px;">';
                                    strNotice += strTemp.slice(i1,i2);
									strNotice += '<img width="50" src="'+document.location.protocol+'//static.ak.connect.facebook.com/pics/t_silhouette.jpg">';

                                    i1 = strTemp.indexOf('</a>',i2);
                                    i2 = strTemp.indexOf('</div>',i1);
                                    strNotice += strTemp.slice(i1,i2);
                                    strNotice += '</div></td></tr></table>';
                                    strNotice = strNotice.replace(/<a class="sexy_button_new(.|\s)*?\/a>/g, '');
									
                                    GiftItem    = '<b>Mafia Wars Accept Gift: i8</b><table>' + strNotice+'</table>';

                                    //test for limit on boost.  Span will be missing if limit reached
                                    if (strNotice.indexOf('<div style="padding-top:20px; text-align:left;">') == -1) {
                                       i1 = strNotice.indexOf('<div style="padding-top:20px; text-align:left;">');
                                       i2 = strTemp.indexOf('</div',i1);
                                       GiftItem += '<br>' + strTemp.slice(i1,i2);
                                    }

                                    LogPush(GiftItem);

                                    NextRequest(aParams[0],aParams[1]);

                                } else {
                                       i1 = strTemp.indexOf('<td class="message_body">');
                                       if (i1 == -1) throw { message: "Cannot find Message_Body in page"}
                                       //i1 += 25;
                                       i2 = strTemp.indexOf('</td>',i1+25);
								       if (strTemp.indexOf('spent or lost some money.',i1+25) == -1)
                                         strNotice = strTemp.slice(i1+25,i2);
								       else { 
									      i1 = strTemp.indexOf('<td class="message_body">',i2); 
                                          i2 = strTemp.indexOf('</td>',i1+25);
                                          if (strTemp.indexOf('spent or lost some money.',i1+25) == -1)
                                             strNotice = strTemp.slice(i1+25,i2);					     
								       }
                                       GiftItem    = '<b>Mafia Wars Accept Gift:</b><table>' + strNotice+'</table>';
                                       LogPush(GiftItem);
                                       NextRequest(aParams[0],aParams[1]);

                                }
                            
                        } catch(err) {
                            LogPush('Error: MW_AcceptGift DoStep 4 - ' + err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }


            try {
                GM_log('MW_AcceptGift Gift Main');
	            if (Self.Action.indexOf('http') != -1)
                  doStep1(strBase,Self.Parms);
	            else
                  doStep1(strBase2,Self.Parms);

            } catch(err) {
                LogPush('Error: MW_AcceptGift main - ' + err.message);
                NextRequest(aParams[0],aParams[1]);
            }
        }


        function MW_Join() {
            function doStep1(_myUrl, _myParms) {
                //GM_log('MW_Join doStep 1');
                GM_xmlhttpRequest({
                    method: 'POST', url:  _myUrl, data: _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            gvar.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));
	
                            myUrl = "";
                            for (var i=0;i<oDetails.onload.length;i++) {
                                if (oDetails.onload[i].indexOf('goURI')!=-1) eval("myUrl = " + oDetails.onload[i].slice(6,-2));            	
                            }

				            if (myUrl != "") {
				                 doStep2(myUrl,'');
				            } else {
				                // and error has occured while trying to process the request.
					            //GM_log('Msg = '+oDetails.payload.msg);
				                 strDetails  = '<b>Mafia Wars MW_Join:</b><br>';
								 i1      = oDetails.onload[0].indexOf('HTML(')+6;
								 i2      = oDetails.onload[0].indexOf('));',i1);
								 strDetails = oDetails.onload[0].slice(i1,i2-1);
								 strDetails = strDetails.replace(/\\u003c/g,'<');
								 strDetails = strDetails.replace(/\\/g,"");

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }
                        } catch(err) {
                            LogPush('Error: MW_Join DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                })
            }

  function doStep2(_myUrl, _myParms) {
      GM_xmlhttpRequest({
        method: 'GET', url:  _myUrl,
        headers: {
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
         try {
            var i1,i2, i1b, i1c, i1d, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

          strTemp = _responseDetails.responseText;
   //if (strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb') == -1) {
   if (EnableScript) {
          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0){
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0){
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
   }
          i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb');
          if (i1==-1) i1 = strTemp.indexOf('<form action="https://facebook.mafiawars.zynga.com/mwfb');
		  if (i1 == -1) throw { message: "Cannot find form action= in page"}
              //extract MW protected form
              i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
              //find URL
              i1 = strTemp.indexOf('"')+1; i2 = strTemp.indexOf('"',i1);
              myUrl = strTemp.slice(i1,i2);
              myUrl = myUrl.replace(/&amp;/g,'&');
              myParms = '';

              i1 = strTemp.indexOf('<input');
              while (i1!=-1) {
                if (myParms!='') myParms += '&'
                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                myParms += strTemp.slice(i1,i2)+'='
                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                myParms += escape(strTemp.slice(i1,i2));
                i1 = strTemp.indexOf('<input',i1);
              }
              doStep2a(myUrl,myParms);

           } catch(err) {
              LogPush('Error: MW_JoinDoStep 2 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }


        function doStep2a(_myUrl, _myParms) {
            GM_xmlhttpRequest({
                method: 'POST',
                url:  _myUrl,
                data: _myParms,
                headers: {
                'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-us,en;q=0.5',
                'Content-Type':    'application/x-www-form-urlencoded'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1, i2, strTemp, myUrl, myParms;
                        var strNotice;

                        if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                        strTemp = _responseDetails.responseText;

                        //i1 = strTemp.indexOf('action="');
						i1 = strTemp.indexOf('top.location.href = "');

                        if (i1 == -1) throw { message: "Cannot find action= in page"}

                        // extract URL
						i1 = strTemp.indexOf('http://',i1);
						if (i1 == -1) i1 = strTemp.indexOf('https://',i1);
                        i2 = strTemp.indexOf('"',i1);
                        myUrl = strTemp.slice(i1,i2);

                       myParms   =  'skip_req_frame=1&first_load=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;
                       doStep2b(myUrl, myParms);

                    } catch(err) {
                        LogPush('Error: MW_JoinDoStep 2a - ' + err.message);
                        NextRequest(aParams[0],aParams[1]);
                    }
                }
            });
        }



  function doStep2b(_myUrl, _myParms) {
      GM_xmlhttpRequest({
        method: 'GET', url:  _myUrl,
        headers: {
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
         try {
            var i1,i2, i1b, i1c, i1d, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

          strTemp = _responseDetails.responseText;
   //if (strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb') == -1) {
    if (EnableScript) {
          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0){
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0){
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
   }
          i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb');
          if (i1==-1) i1 = strTemp.indexOf('<form action="https://facebook.mafiawars.zynga.com/mwfb');
            if (i1 == -1) throw { message: "Cannot find form action= in page"}
              //extract MW protected form
              i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
              //find URL
              i1 = strTemp.indexOf('"')+1; i2 = strTemp.indexOf('"',i1);
              myUrl = strTemp.slice(i1,i2);
              myUrl = myUrl.replace(/&amp;/g,'&');
              myParms = '';

              i1 = strTemp.indexOf('<input');
              while (i1!=-1) {
                if (myParms!='') myParms += '&'
                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                myParms += strTemp.slice(i1,i2)+'='
                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                myParms += escape(strTemp.slice(i1,i2));
                i1 = strTemp.indexOf('<input',i1);
              }
              doStep3(myUrl,myParms);


           } catch(err) {
              LogPush('Error: MW_JoinDoStep 2b - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

  function doStep3(_myUrl, _myParms) {
      //GM_log('MW_AcceptEnergy doStep 5');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      GM_xmlhttpRequest({
      method: 'POST',
      url:  _myUrl, data: _myParms,
      headers: {
        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language':  'en-us,en;q=0.5',
        'Content-Type':   'application/x-www-form-urlencoded'
      },
      onload: function(_responseDetails) {
        try { 
          var i1, i2, strTemp;
          
          if (_responseDetails.status != 200) throw {message:'Status 200 error'}
          strTemp = _responseDetails.responseText;
                        i1 = strTemp.indexOf('action="');
                        if (i1 == -1) throw { message: "Cannot find form action= in page"}
                            // extract URL
                            i1 += 8;
                            i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);

                            myParms = '';
                            i1 = strTemp.indexOf('<input',i1);
                            while (i1!=-1) {
                                i1 = strTemp.indexOf('name="',i1)+6;
                                i2 = strTemp.indexOf('"',i1);
                                if (myParms=='')
                                    myParms = strTemp.slice(i1,i2)+'='
                                else
                                    myParms += '&'+strTemp.slice(i1,i2)+'=';
                                i1 = strTemp.indexOf('value="',i1)+7;
                                i2 = strTemp.indexOf('"',i1);
                                myParms += escape(strTemp.slice(i1,i2));

                                i1 = strTemp.indexOf('<input',i1); 
                            } 
							doStep4(myUrl,myParms);
        
        } catch(err) {
              LogPush('Error: MW_JoinDoStep 3 - ' + err.message);
              NextRequest(aParams[0],aParams[1]);
        }
      }
    });
  }


        function doStep4(_myUrl, _myParms) {
            //GM_log('MW_Join doStep 4');
            GM_xmlhttpRequest({
                method: 'POST',
                url:  _myUrl,
                data: _myParms,
                headers: {
                    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-us,en;q=0.5',
                    'Content-Type':    'application/x-www-form-urlencoded'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1, i2, i3, i4, myUrl, myParms;
                        var strTemp;
                        var strNotice;

                        if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                        strTemp = _responseDetails.responseText;

                        i1          = strTemp.indexOf('<td class="message_body">');

                     if (i1 != -1) {
                         i2          = strTemp.indexOf('</td>',i1);
                         strDetails  = _strDetails + strTemp.slice(i1+25,i2);
                         LogPush(strDetails);
                         GM_log('MW Crew sucessfull');
                         NextRequest(aParams[0],aParams[1]);
					 }
					 else {
					
                                            i1 = strTemp.indexOf('<ul class="incoming_requests clearfix">');
                        if (i1 == -1) {
                            LogPush('<Strong>MW Join</strong><br>Could not find user.  Possibly already joined');
                            throw { message: 'Cannot find &lt;ul class="incoming_requests clearfix"&gt; in page'}
                            //throw { message: 'Cannot find <ul class="incoming_requests clearfix"> in page'}
                        }
                        i2 = strTemp.indexOf('</ul>',i1);

                        strTemp = strTemp.slice(i1,i2);

                        i1 = 0

                        do {
                            i1 = strTemp.indexOf('<li>',i1);
                            if (i1!=-1) {

                                strNotice = '<strong>Mafia Wars Join:</strong><br><table>';
                                i1 = i1+1
                                // get user's picture
                                i3 = strTemp.indexOf('<span ',i1);
                                i4 = strTemp.indexOf('<a href',i3);
                                strNotice += strTemp.slice(i3,i4-1);

                                i3 = strTemp.indexOf('<a href="',i1);
                                i4 = strTemp.indexOf('" onclick=',i3);

                                myUrl       = strTemp.slice(i3+9,i4);
                                myParms     = 'ajax=1&liteload=1&sf_xw_user_id=' + escape(local_xw_user_id) + '&sf_xw_sig=' + local_xw_sig;

                                if (myUrl.indexOf(Join_id) != -1) {

                                    GM_log('Found Member to add to mafia');
                                    doStep5(myUrl,myParms,strNotice);
                                    // stop the loop
                                    break;
                                }
                            } else {
                                GM_log('MW_Join Could not find user to Join');
                                LogPush('<Strong>MW Join</strong><br>Could not find user.  Possibly already joined');
                                NextRequest(aParams[0],aParams[1]);
                            }
                        } while (i1 != -1)
					 }
                    } catch(err) {
                        LogPush('Error: MW_Join DoStep 4 - ' + err.message);
                        //LogPush('Error: MW_Join DoStep 4 - ' + strTemp);
                        NextRequest(aParams[0],aParams[1]);
                    }
                }
            } )

        }

        function doStep5(_myUrl, _myParms, _strDetails) {
                //GM_log('MW_Join doStep 5');
                GM_xmlhttpRequest({
                    method: 'POST',
                    url:    _myUrl,
                    data:   _myParms,
                    headers: {
                        'Accept':           '*/*',
                        'Accept-Language':  'en-us,en;q=0.5',
                        'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;
                            var strDetails;

                            if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                            strTemp     = _responseDetails.responseText;
                            i1          = strTemp.indexOf('<td class="message_body">');

                            if (i1 == -1) throw { message: "Cannot find Message_Body in page"}

                            i2          = strTemp.indexOf('</td>',i1);
                            strDetails  = _strDetails + strTemp.slice(i1+25,i2)+'</table>';
                            LogPush(strDetails);

                            GM_log('MW Join sucessfull');
                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            LogPush('Error: MW_Join DoStep 5 - ' + err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }


            try {
                GM_log('Send MW Join');

                var Join_id;
                var i1,i2;

                i1  =   Self.Parms.indexOf('[from_id]=')+10;
                i2  =   Self.Parms.indexOf('&',i1);

                Join_id = Self.Parms.slice(i1,i2);

                GM_log('Action FB request');
	            if (Self.Parms.indexOf('actions[reject]') == -1)
                  doStep1(strBase,Self.Parms);
	            else
                  doStep1(strBase,Self.Parms);

            } catch(err) {
                LogPush('Error: Request Join MW Main');
                NextRequest(aParams[0],aParams[1]);
            }

        }

        function MW_AcceptEnergy() {

            function doStep1(_myUrl, _myParms) {
                GM_log('MW_AcceptEnergy doStep 1');
                GM_xmlhttpRequest({
                    method: 'POST', url:  _myUrl, data: _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            gvar.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));
	
                            myUrl = "";
                            for (var i=0;i<oDetails.onload.length;i++) {
                                if (oDetails.onload[i].indexOf('goURI')!=-1) eval("myUrl = " + oDetails.onload[i].slice(6,-2));            	
                            }

				            if (myUrl != "") {
				                 doStep2(myUrl,'');
				            } else {
				                // and error has occured while trying to process the request.
					            //GM_log('Msg = '+oDetails.payload.msg);
				                 strDetails  = '<b>Mafia Wars Accept Energy:</b><br>';
								 i1      = oDetails.onload[0].indexOf('HTML(')+6;
								 i2      = oDetails.onload[0].indexOf('));',i1);
								 strDetails = oDetails.onload[0].slice(i1,i2-1);
								 strDetails = strDetails.replace(/\\u003c/g,'<');
								 strDetails = strDetails.replace(/\\/g,"");
                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }
                        } catch(err) {
                            LogPush('Error: MW_AcceptEnergy doStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }

  function doStep2(_myUrl, _myParms) {
      GM_xmlhttpRequest({
        method: 'GET', url:  _myUrl,
        headers: {
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
         try {
            var i1,i2, i1b, i1c, i1d, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

          strTemp = _responseDetails.responseText;
   //if (strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb') == -1) {
   if (EnableScript) {
          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0){
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0){
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
   }
          i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb');
          if (i1 == -1) i1 = strTemp.indexOf('<form action="https://facebook.mafiawars.zynga.com/mwfb');

			if (i1 == -1) throw { message: "Cannot find form action= in page"}
              //extract MW protected form
              i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
              //find URL
              i1 = strTemp.indexOf('"')+1; i2 = strTemp.indexOf('"',i1);
              myUrl = strTemp.slice(i1,i2);
              myUrl = myUrl.replace(/&amp;/g,'&');
              myParms = '';

              i1 = strTemp.indexOf('<input');
              while (i1!=-1) {
                if (myParms!='') myParms += '&'
                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                myParms += strTemp.slice(i1,i2)+'='
                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                myParms += escape(strTemp.slice(i1,i2));
                i1 = strTemp.indexOf('<input',i1);
              }
              doStep2a(myUrl,myParms);


           } catch(err) {
              LogPush('Error: MW_AcceptEnergyDoStep 2 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }


        function doStep2a(_myUrl, _myParms) {
            GM_xmlhttpRequest({
                method: 'POST',
                url:  _myUrl,
                data: _myParms,
                headers: {
                'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-us,en;q=0.5',
                'Content-Type':    'application/x-www-form-urlencoded'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1, i2, strTemp, myUrl, myParms;
                        var strNotice;

                        if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                        strTemp = _responseDetails.responseText;

                        //i1 = strTemp.indexOf('action="');
						i1 = strTemp.indexOf('top.location.href = "');

                        if (i1 == -1) throw { message: "Cannot find action= in page"}

                        // extract URL
						i1 = strTemp.indexOf('http://',i1);
						if (i1 == -1) i1 = strTemp.indexOf('https://',i1);
                        i2 = strTemp.indexOf('"',i1);
                        myUrl = strTemp.slice(i1,i2);

                       myParms   =  'skip_req_frame=1&first_load=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;
                       doStep2b(myUrl, myParms);

                    } catch(err) {
                        LogPush('Error: MW_AcceptEnergyDoStep 2a - ' + err.message);
                        NextRequest(aParams[0],aParams[1]);
                    }
                }
            });
        }


  function doStep2b(_myUrl, _myParms) {
      GM_xmlhttpRequest({
        method: 'GET', url:  _myUrl,
        headers: {
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
         try {
            var i1,i2, i1b, i1c, i1d, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

          strTemp = _responseDetails.responseText;
   //if (strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb') == -1) {
   if (EnableScript) {
          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0){
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0){
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
   }
          i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb');
		  if (i1 == -1) i1 = strTemp.indexOf('<form action="https://facebook.mafiawars.zynga.com/mwfb');
          if (i1 == -1) throw { message: "Cannot find form action= in page"}
              //extract MW protected form
              i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
              //find URL
              i1 = strTemp.indexOf('"')+1; i2 = strTemp.indexOf('"',i1);
              myUrl = strTemp.slice(i1,i2);
              myUrl = myUrl.replace(/&amp;/g,'&');
              myParms = '';

              i1 = strTemp.indexOf('<input');
              while (i1!=-1) {
                if (myParms!='') myParms += '&'
                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                myParms += strTemp.slice(i1,i2)+'='
                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                myParms += escape(strTemp.slice(i1,i2));
                i1 = strTemp.indexOf('<input',i1);
              }
              doStep3(myUrl,myParms);

           } catch(err) {
              LogPush('Error: MW_AcceptEnergyDoStep 2b - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

  function doStep3(_myUrl, _myParms) {
    GM_xmlhttpRequest({
      method: 'POST',
      url:  _myUrl, data: _myParms,
      headers: {
        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language':  'en-us,en;q=0.5',
        'Content-Type':   'application/x-www-form-urlencoded'
      },
      onload: function(_responseDetails) {
        try {
        
          var i1, i2, strTemp;
          
          if (_responseDetails.status != 200) throw {message:'Status 200 error'}
          strTemp = _responseDetails.responseText;
                        i1 = strTemp.indexOf('action="');
                        if (i1!= -1) {
                            // extract URL
                            i1 += 8;
                            i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);

                            myParms = '';
                            i1 = strTemp.indexOf('<input',i1);
                            while (i1!=-1) {
                                i1 = strTemp.indexOf('name="',i1)+6;
                                i2 = strTemp.indexOf('"',i1);
                                if (myParms=='')
                                    myParms = strTemp.slice(i1,i2)+'='
                                else
                                    myParms += '&'+strTemp.slice(i1,i2)+'=';
                                i1 = strTemp.indexOf('value="',i1)+7;
                                i2 = strTemp.indexOf('"',i1);
                                myParms += escape(strTemp.slice(i1,i2));

                                i1 = strTemp.indexOf('<input',i1); 
                            } 
							doStep4(myUrl,myParms);
                        } 
        
        } catch(err) {
              LogPush('Error: MW_AcceptEnergyDoStep 3 - ' + err.message);
              NextRequest(aParams[0],aParams[1]);
        }
      }
    });
  }


            function doStep4(_myUrl, _myParms) {
                GM_log('MW_AcceptEnergy doStep 4');
                GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                         'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                         'Accept-Language': 'en-us,en;q=0.5',
                         'Content-Type':    'application/x-www-form-urlencoded'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1, i2, i3, i4, myUrl, myParms;
                            var strTemp;
                            var strNotice;
                            var GiftItem;

                            if (_responseDetails.status != 200) throw { message: "HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                                i1 = strTemp.indexOf('you have already reached your daily accept limit');
								if (i1!=-1) 
								{    if (getHoursTime('MW_EnergyTimer') == 0) {
									    setGMTime('MW_EnergyTimer', '1 hour');
										LogPush('<font color="red">Set MW_EnergyTimer:</font> ' + getHoursTime('MW_EnergyTimer'));
								     }
								}

                            //Check for energy popup.

                            i1 = strTemp.indexOf('<div style="border-bottom: 1px dotted #999; margin: 10px auto; text-align: center; font-size: 20px; padding-bottom: 10px;">');
                            i2 = strTemp.indexOf('<div style="text-align: center; border: 1px solid #666666; padding:10px; background-color:black;">');
                            //i4 = strTemp.indexOf('<div style="border: 1px solid #666666; padding:10px; background-color:black;">');
							i4 = strTemp.indexOf('<div style="border: 1px solid rgb(102, 102, 102); padding: 10px; background-color: black;">');

                            if (i1!=-1) {

                                    if (strTemp.indexOf('<div style="margin-bottom:10px;">',i1) != -1)
                                    {
                                    i1 = strTemp.indexOf('<div style="margin-bottom:10px;">',i1);
                                    i2 = strTemp.indexOf('</div>',i1);
                                    strNotice = '<font color="blue">' + strTemp.slice(i1,i2) + '</font>';
                                    }

                                i1 = strTemp.indexOf('<div style="float: left;">',i1);
                                i2 = strTemp.indexOf('</div>',i1);

                                    if (strNotice != undefined) 
                                       strNotice += '<table><tbody><tr><td colspan="3">';
									else
									   strNotice = '<table><tbody><tr><td colspan="3">';
                                strNotice += strTemp.slice(i1,i2);
                                strNotice += '</td></tr><tr><td style="width: 130px; text-align: center;">';

                                i1 = strTemp.indexOf('<img src=',i2);
                                i2 = strTemp.indexOf('</div>',i1);
                                strNotice += strTemp.slice(i1,i2+6);
                                strNotice += '</td><td width="50"><img src="'+document.location.protocol+'//mwfb.static.zynga.com/mwfb/graphics/gift_loop_arrow_green_39x50_01.png"></td><td>';

                                i1 = strTemp.indexOf('<div style="float: left; text-align: center; width: 200px;',i2);
                                i1 = strTemp.indexOf('<a',i1)
                                i2 = strTemp.indexOf('<fb:profile-pic',i1);

                                strNotice += '<div style="float: left; text-align: center; width: 200px;">';
                                strNotice += strTemp.slice(i1,i2);
                                strNotice += '<img src="'+document.location.protocol+'//static.ak.connect.facebook.com/pics/t_silhouette.jpg">';

                                i1 = strTemp.indexOf('</a>',i2);
                                i2 = strTemp.indexOf('</div>',i1);
                                strNotice += strTemp.slice(i1,i2);
                                strNotice += '</div></td></tr>';

                                GiftItem    = '<b>Mafia Wars Accept Energy:</b><table>' + strNotice+'</table>';

                                // look for button to send energy back

                                i1 = strTemp.indexOf('<fb:request-form');
                                if (i1==-1 || _myUrl.indexOf('3000_Mission') !=-1) {
									if (i1==-1)
										LogPush(GiftItem+'<br><font color=blue>Send button not found.</font>')
										else
                                        LogPush(GiftItem+'<br><font color=red>Sorry, you have run out of requests to send with this application.  Please try again tomorrow.</font>');
                                    NextRequest(aParams[0],aParams[1]);
                                } else {
                                    var param = GetServerfbml(strTemp);
							        doStep5(param[0],param[1],GiftItem);
                                }

                            } else if (i2!=-1) {
                                   i1 = strTemp.indexOf('>',i2)+1;
                                   i2 = strTemp.indexOf('<div style=', i1);

                                   strNotice = strTemp.slice(i1,i2);

                                   GiftItem    = '<b>Mafia Wars Accept Energy:</b><table><div>' + strNotice+'</table>';
                                   LogPush(GiftItem);

                                   NextRequest(aParams[0],aParams[1]);

                            } else if (i4!=-1) {
                                   i1 = strTemp.indexOf('>',i4)+1;
                                   i2 = strTemp.indexOf('<div style=', i1);

                                   strNotice = strTemp.slice(i1,i2);

                                   GiftItem    = '<b>Mafia Wars Accept Energy:</b><table><div>' + strNotice+'</table>';
                                   LogPush(GiftItem);

                                   NextRequest(aParams[0],aParams[1]);

                            } else {
                                i1 = strTemp.indexOf('<td class="message_body">');
                                if (i1 == -1) throw { message: "Cannot find Message_Body in page"}
                                i1 += 25;

                                i2 = strTemp.indexOf('</td>',i1);

                                strNotice = strTemp.slice(i1,i2);
                                GiftItem    = '<b>Mafia Wars Accept Energy:</b><table>' + strNotice+'</table>';
                                LogPush(GiftItem);
                                NextRequest(aParams[0],aParams[1]);
                            }

                        } catch(err) {
                            LogPush('Error: MW_AcceptEnergy DoStep 4 - ' + err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }

            function doStep5(_myUrl, _myParms, _GiftItem) {
		      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
		      GM_xmlhttpRequest({
		        method: 'POST',
		        url: _myUrl,
		        data: _myParms,
		        headers: {
		          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		          'Accept-Language': 'en-us,en;q=0.5',
		          'Content-Type': 'application/x-www-form-urlencoded',
		          'X-SVN-Rev': gvar.svn_rev
		        },
		        onload: function(_responseDetails) {
		          try {
		            var i1, i2, myUrl, myParms;
		            var strTemp, strTemp2;

		            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
					strTemp = _responseDetails.responseText;

                    var param = GetPromptSend(strTemp);
					doStep6a(param[0],param[1],param[2],_GiftItem);

		          } catch(err) {
		            LogPush(_GiftItem);
		            LogPush('Error: MW_AcceptEnergy DoStep 5 - '+err.message);
		            NextRequest(aParams[0],aParams[1]);
		          }
		        }
		      });
		    }

    function doStep6a(_myUrl, _myParms, _myUrl2, _GiftItem) {
      GM_log('MW_AcceptEnergy DoStep 6a: ' + _myUrl);
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      GM_xmlhttpRequest({
          method: 'POST',
          url: _myUrl,
          data: _myParms,
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-SVN-Rev': gvar.svn_rev
          },
          onload: function(_responseDetails) {
            try {
              var i1, i2, myUrl, myParms;
              var strTemp;

              if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
              doStep6(_myUrl2,_myParms,_GiftItem);
            } catch(err) {
              LogPush('MW_AcceptEnergy DoStep 6a - '+err.message);
              NextRequest(aParams[0],aParams[1]);
            }
          }
      });
    }

            function doStep6(_myUrl, _myParms, _GiftItem) {
		      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
		      GM_xmlhttpRequest({
		        method: 'POST',
		        url: _myUrl,
		        data: _myParms,
		        headers: {
		          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		          'Accept-Language': 'en-us,en;q=0.5',
		          'Content-Type': 'application/x-www-form-urlencoded',
		          'X-SVN-Rev': gvar.svn_rev
		        },
		        onload: function(_responseDetails) {
		          try {
		            var i1, i2, myUrl, myParms;
		            var strTemp, resstr;

					if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
		            strTemp = _responseDetails.responseText;

                    i1 =   strTemp.indexOf('<p style="margin-top: 140px; font-size: 24px');
                    if (i1 ==-1) throw {message:"Cannot find message"}
			        i1  =   strTemp.indexOf('">',i1);
                    i1 += 2;
                    i2  =  strTemp.indexOf('<script',i1);
                    resstr =  strTemp.slice(i1,i2).replace(/color: #fff/g, '');

                    LogPush(_GiftItem +'<br>'+resstr);
/*
		            if (strTemp.indexOf('Sorry, you have run out of requests to send with this application. Please try again tomorrow')!=-1) {
		              LogPush('MW_AcceptGift aborting Adding Thank you - Limit reached');
		              LogPush(_GiftItem );
		            } else {
		              LogPush('MW_AcceptGift Adding Thank you');
		              LogPush(_GiftItem +'<br>Thank you gift Sent');
		            } */
		            NextRequest(aParams[0],aParams[1]);
		          } catch(err) {
		            LogPush(_GiftItem);
		            LogPush('Error: MW_AcceptEnergy DoStep 6 - '+err.message);
		            NextRequest(aParams[0],aParams[1]);
		          }
		        }
		      });
		    }

            try {
                GM_log('Action FB request - MW Energy');
	            if (Self.Parms.indexOf('actions[reject]') == -1)
                  doStep1(strBase,Self.Parms);
	            else
                  doStep1(strBase2,Self.Parms);
            } catch(err) {
                LogPush('Error: Request Accept MW Energy main - ' + err.message);
                NextRequest(aParams[0],aParams[1]);
            }

        }



        // FaceBook Code
        function FB_accept_friend() {
            function doStep1(_myUrl, _myParms) {
                //GM_log('FB Friend Add Step 1');
                GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            gvar.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            strDetails  = '<b>FaceBook Friend Invitation:</b><br>';
    	                    if (typeof(oDetails.payload.msg)=='object') {
	                            strTemp = oDetails.payload.msg['__html'];
	                        } else {
		                        strTemp = oDetails.payload.msg;
	                        }
	                        strDetails += strTemp;

                            LogPush(strDetails);

                            myUrl = document.location.protocol+'//www.facebook.com/friends/ajax/lists.php?__a=1';

                            // Code to move friend into selected group
                            if (Self.Gifttype == 'friend_connect') {
                                if (aParams[1001]!=0) {
	                                GM_log('aParams[1001] = '+aParams[1001]);
                                    i1		= strTemp.indexOf('id=')+3;
                                    i2		= strTemp.indexOf('"',i1);
                                    myParms 	 =	"flid="+aParams[1001];
		                            myParms 	+=	"&id="+ strTemp.slice(i1,i2);
				                    myParms		+=	"&quick=true&add=1&post_form_id="+Post_form_id;
        				            myParms		+=	"&fb_dtsg="+FB_dtsg;
                				    myParms		+=	"&lsd&post_form_id_source=AsyncRequest";

                                    doStep2(myUrl,myParms);

                                } else {
                                     NextRequest(aParams[0],aParams[1]);
                                }

                            } else {
	                            if (aParams[1003]!=0) {
		                            GM_log('aParams[1003] = '+aParams[1003]);
                                    i1		= strTemp.indexOf('id=')+3;
                                    i2		= strTemp.indexOf('"',i1);
                                    myParms 	 =	"flid="+aParams[1001];
		                            myParms 	+=	"&id="+ strTemp.slice(i1,i2);
				                    myParms		+=	"&quick=true&add=1&post_form_id="+Post_form_id;
        				            myParms		+=	"&fb_dtsg="+FB_dtsg;
                				    myParms		+=	"&lsd&post_form_id_source=AsyncRequest"
                                    doStep2(myUrl,myParms);

                                } else {
                                     NextRequest(aParams[0],aParams[1]);
                                }
                            }

                            //NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            LogPush('Error: Request FB Ignore DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }

            function doStep2(_myUrl, _myParms) {
                //GM_log('FB Friend Add Step 2');
                GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                        'Accept':             	'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':    	'en-us,en;q=0.5',
                        'Content-Type':		  	'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':             gvar.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            LogPush('Error: Request FB Ignroe DoStep 2 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }

            try {
                GM_log('FB Accept Friend');
	            if (Self.Parms.indexOf('actions[reject]') == -1)
                  doStep1(strBase,Self.Parms+'&post_form_id_source=AsyncRequest');
	            else
                  doStep1(strBase,Self.Parms);
            } catch(err) {
                LogPush('Error: FB Accept Friend Main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }
        }

        function FB_ignore(){

            function doStep1(_myUrl, _myParms) {
                //GM_log('FB Ignore Step 1');
                GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            gvar.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}
                            strTemp = _responseDetails.responseText;

		                    i1 = strTemp.indexOf('{');
			                oDetails = JSON.parse(strTemp.slice(i1));

						    //if (oDetails.payload == null) {
								 i1      = strTemp.indexOf('HTML(')+6;
								 i2      = strTemp.indexOf('));',i1);
								 strDetails = strTemp.slice(i1,i2-1);
								 strDetails = strDetails.replace(/\\u003c/g,'<');
								 strDetails = strDetails.replace(/\\/g,"");
							//}
 
                            LogPush(strDetails);

                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            LogPush('Error: Request FB Ignroe DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }

            try {
                GM_log('FB Ignore Request');
                doStep1(strBase2,strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
            } catch(err) {
                LogPush('Error: FB Ignore Request Main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }
        }

        function FB_removeEvent() {
            function doStep1(_myUrl, _myParms) {
                //GM_log('FB Ignore Step 1');
                GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            gvar.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            GM_log('Msg = '+oDetails.payload.msg);

                            strDetails  = '<b>FaceBook Request Ignore:</b><br>';
                             if (typeof(oDetails.payload.msg)=='object') {
		                            strDetails += oDetails.payload.msg['__html'];
		                        } else {
			                        strDetails += oDetails.payload.msg;
		                        }
                            LogPush(strDetails);

                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            LogPush('Error: Request FB Remove Event DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }

            try {
                GM_log('FB Remove Event');
	            if (Self.Parms.indexOf('actions[reject]') == -1)
                  doStep1(strBase,Self.Parms+'&post_form_id_source=AsyncRequest');
	            else
                  doStep1(strBase,Self.Parms);
            } catch(err) {
                LogPush('Error: FB Remove Event Main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }
        }


        // Main Code

        var Self;
        var i1,i2,i3,i4;
        var strTemp;

        var aCat;
        var xmlhttp;
        var myURL;


  var v_fb_dtsg;
  var v_post_form_id;
  var v_post_req_form;
  var v_app_id;


        Self = this;

        // stop processing if autorun turned off
        if (bAutoRun) {

   // Grab to original form vars here for use later on in gift backs,,
    i1 = Self.Parms.indexOf('fb_dtsg=');
    if (i1!=-1) {
        i2 = Self.Parms.indexOf('&',i1);
        v_fb_dtsg = Self.Parms.slice(i1+8,i2);
    }
    i1 = Self.Parms.indexOf('post_form_id=');
    if (i1!=-1) {
        i2 = Self.Parms.indexOf('&',i1);
        v_post_form_id = Self.Parms.slice(i1+13,i2);
    }
    i1 = Self.Parms.indexOf('params[app_id]=');
    if (i1!=-1) {
        i2 = Self.Parms.indexOf('&',i1);
        v_app_id = Self.Parms.slice(i1+15,i2);
    }


            //alert(Self.Gifttype);
            aCat    = Self.Gifttype.split('_');

            switch (aCat[0]) {
                case 'friend':
                    switch (aCat[1]) {
                        case 'suggestion':
                            GM_log('Found Friend Suggestion');
                            FB_accept_friend()
                            break;
                        case 'connect':
                            GM_log('Found Friend Connect');
                            FB_accept_friend()
                            break;
                    }
                    break;

                case 'event':
                    FB_removeEvent()
                    break;

                case 'fbpage':
                    FB_ignore()
                    break;

                case 'group':
                    FB_ignore()
                    break;

                case 'app':
                    switch (aCat[1]) {
                        case '10979261223':
                            // Mafiawars
                            if (xw_sig_valid == false) {
                                LogPush('Skipping Mafia Wars item.  Mafia wars does not appear to be working.');
								//setTimeout(FB_xw_sig_update,30000);
                                NextRequest(aParams[0],aParams[1]);
                            } else if (Self.Action.indexOf('accept_energy_req') != -1) {
                                //Energy
                                //GM_log('MW Energy');
								if ((!timeLeftGM('MW_EnergyTimer')) && aParams[2020] ==2) {
                                    MW_AcceptEnergy();
                                } else {
                                    NextRequest(aParams[0],aParams[1]);
                                }

                            } else if (Self.Action.indexOf('accept_') != -1) {
									if (aParams[2000] >0)
                                      MW_AcceptGift();
									else
									  NextRequest(aParams[0],aParams[1]);
                      
                            } else if (Self.Action.indexOf('next_controller%3Drecruit') != -1 || (Self.Action.indexOf('next_action=accept_city_crew') != -1)) {
                                GM_log('MW Join');
                                MW_Join();
                            }
                            break;

                        default:
                            //GM_log('Ignoring Other Request');

                            if (aParams[4000]==1) {
                                FB_ignore();
                            } else {
                                //LogPush('Skipping Other Request');
                                NextRequest(1,aParams[1]);
                            }
                            break;
                    }

                    break;
                case 'MWMessage':
                    switch (aCat[1]) {
                        case '3012':
                            MW_AcceptGift();
                            break;
                        case '3018':
                            MW_SendGift();
                            break;
                        case '3013':
                            MW_Join();
                            break;
                        default:
                            NextRequest(1,aParams[1]);
                    }
                    break;

            }
        } else {
            GM_log('Some one turn the switch off');
        }

    }
}


/****  End Wall Notification code ****/

function StartProcessing() {
    LogPush('<span style="color:green"><b>Starting Automatic Request processing</b></span>' +
		'<div style="background-color: white; color:darkblue; text-align:left; border:1px solid red;">' +
		'<div>&nbsp;&nbsp;<B>PC Security : Scan Your Security: </B><a href="http://www.formasaauditor.com/" target="_s1">http://www.formasaauditor.com/</a></div>' +
		'<div>&nbsp;&nbsp;<B>DNS Security: Anti Phishing: </B><a href="http://www.opendns.com/" target="_s2">http://www.opendns.com/</a></div>' +
		'<div>&nbsp;&nbsp;<B>Web Browser: Pale Moon 9.2: </B><a href="http://www.palemoon.org/" target="_two">http://www.palemoon.org/</a></div>' +
		'<div>&nbsp;&nbsp;<B>AddOn: Greasemonkey: </B><a href="https://addons.mozilla.org/en-US/firefox/addon/fasterfox-9148/" target="_three">https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/</a></div>' +
		'<div>&nbsp;&nbsp;<B>FarmVille Gift: </B><a href="https://faceapps.com.pl/fgs/fgs-ff-1.1.0.65.xpi" target="_four">https://faceapps.com.pl/fgs/fgs-ff-1.1.0.65.xpi</a></div>');
    bAutoRun = true;
    iRequestNum = 0;

    oWallList.Erase();
    oRequestList.Erase();

    if (aParams[1] == null) aParams[1] = 0;
    if (aParams[3] == null) aParams[3] = 0;
    if (aParams[6] == null) 
	aParams[6] = 0;
	aParams[0] = 3;

var current_date = new Date();
month_value = current_date.getMonth();
day_value = current_date.getDate();
year_value = current_date.getFullYear();
EmailBonusURL = 'http://spockon.me/MWLLEmailBonus' + months[month_value] + day_value;
if ((aParams[2012]) && !timeLeftGM('MW_FeeSPTimer')) 
  GM_setValue('FeeSPURL','http://spockon.me/MWLLZyngaSP' + months[month_value] + day_value);
 // FeeSPURL = 'http://spockon.me/MWLLZyngaSP' + months[month_value] + day_value;

    if( aParams[1] > 0) {
        EventSpan.dispatchEvent(ActionRequest);
    } else {
        LogPush('Request Processing is Disabled');
    }
    if( aParams[3] > 0) {
        EventSpan.dispatchEvent(ActionWall);
    } else {
        LogPush('Wall Processing is Disabled');
    }
}

function StopProcessing() {

    bAutoRun = false;
    //clearTimeout(iRequestCurrent);
    //clearTimeout(iWallCurrent);

    LogPush('<span style="color:red"><b>Stopping Automatic Request Processing</b></span>');
}

function RestartProcessing() {
//    bAutoRun = false;
	//clearTimeout(iWallCurrent);

//    bAutoRun = true;
    oWallList.Erase();

    GM_log('Restart Processing');
}

/*** Start section to read in items from MW and FV  ****/

//Read Wall Posting
function ReadWall() {

    var myUrl;
	var iCurrentJob, iWatchDog;
    var iNewNow;

    //iHoldEvent = iWallCurrent;

    iNewNow = Math.floor(new Date().valueOf()/1000);

if (aParams[9701]==1)
//    myUrl = 'http://www.facebook.com/ajax/intent.php?newest=' + iNow + '&hidden_count=1&ignore_self=true&load_newer=true&request_type=4&__a=1';
    myUrl = document.location.protocol+'//www.facebook.com/ajax/intent.php?filter=lf&request_type=1&__a=0&newest=' + iNow + '&ignore_self=true';
else
    myUrl = document.location.protocol+'//www.facebook.com/ajax/intent.php?filter=app_10979261223&newest=' + iNow+'&hidden_count=1&ignore_self=true&load_newer=true&request_type=4&__a=0';

    // stop processing if autorun turned off
    if (bAutoRun) {
//LogPush('Readwall');
        oWallList.Erase();

//        myUrl           =   'http://www.facebook.com/ajax/apps/app_stories.php?__a=1&newest=' + iNow+'&app_ids=10979261223_102452128776&max_stories=50&show_hidden=true&ignore_self=true&use_primer=1&request_type=1';
//        myUrl           =   'http://www.facebook.com/ajax/apps/app_stories.php?__a=1&newest=' + iNow+'&app_ids=10979261223&max_stories=100&show_hidden=true&ignore_self=true&use_primer=1&request_type=1';
//        myUrl           =   'http://www.facebook.com/ajax/apps/app_stories.php?__a=1&newest=' + iNow+'&max_stories=100&show_hidden=true&filter=lf&request_type=1';
       // myUrl           =   'http://www.facebook.com/ajax/intent.php?filter=app_10979261223&newest=' + iNow+'&hidden_count=1&ignore_self=true&load_newer=true&request_type=4&__a=1';
		

 //myUrl = 'http://www.facebook.com/ajax/intent.php?hidden_count=1&ignore_self=true&load_newer=true&request_type=4&__a=1';

        // Note:  It will work for the following Apps (apps_ids=   )
        // 10979261223      Mafia Wars
        // 102452128776     FarmVill

        iWatchDog = setTimeout(function (e) {
            iCurrentJob.abort();
            //GM_log('WatchDog timer killing Read Wall job.');
            //LogPush('<strong>WatchDog timer killing Read Wall job.  Checking again in ' + aParams[3]+' seconds.....</strong>');
			//setTimeout("location.reload(true);",10000);
            setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);},getRandRange(aParams[3]*750,aParams[3]*1250));
                //if (iWallCurrent < iHoldEvent) {
                // The browser has reset.  Cancel runaway jobs;
                //clearTimeout(iWallCurrent);
            //}
        }, 30000);


        // check for wall notifications
         iCurrentJob = GM_xmlhttpRequest({
            method: 'GET',
            url:  myUrl,
            headers: {
                'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-us,en;q=0.5',
                'X-SVN-Rev':        gvar.svn_rev
            },
            onload: function(_responseDetails) {

               try {
                    var i1, i2, i3, i4, j, iNumStories, iWallNum;
                    var strTemp, strTemp2, strTemp3, strHTML, mytmp, lnk1, lnk2, lnk3, lnk4 ,frid;
                    var oDom, oDiv, oButton, oButton1, oButton2, oButton3, bool, oSnap;
					var oButton, oActorName, oAttachmentTitle, omessageBody;
                    var strTiny5, strTiny6, strTiny7, strTiny8, strTiny9, strTiny10, strTiny11, strTiny12, strTiny13, strTiny14;
                    var oUl, oLi;
                    var oDetail;
                    var link_data, app_id;
                    var myImg, oPicture;
                    var bSkipItem;

                    // clear watch dog timer
                    clearTimeout(iWatchDog);

                    if (_responseDetails.status != 200) //{setTimeout("location.reload()",10000);}
						throw {message:"Error Read Wall"};

                    strTemp = _responseDetails.responseText;

if (aParams[9999] != '')
{
	oWall           =   new WallItem();   
											oWall  =   new WallItem();
                                            oWall.Action = aParams[9999];
									  	    oWall.Type    =   'Multi-Click'; 
										    oWall.BName     =  'Multi-Click';
										    oWall.AppId     =   10979261223;
										    oWall.ActorName =	'Multi-Click';
											oWall.AttachmentTitle = '<a href="'+aParams[9999]+'">Multi-Click</a>';
                                            oWallList.Insert(oWall);
											iWallNum        =   iWallNum + 1;
											aParams[9999] = '';
}

                    iWallNum        = 0;

					i1              = strTemp.indexOf('"num_stories":');
                    //if (i1==-1) throw {message:'Not find "num_stories":'}
                    i2              = strTemp.indexOf('}',i1);
                    iNumStories     = strTemp.slice(i1+14,i2);
  				    //if (i1==-1) throw {message:"No request have been found"}
					//LogPush('iNumStories= ' + iNumStories + ', iNow= ' + iNow);
					//GM_log('iNumStories= ' + iNumStories + ', iNow= ' + iNow);
GM_log('iNumStories= ' + iNumStories + ', iNow= ' + iNow);
//LogPush(strTemp.replace(/</g,'&lt;'));
                    if (iNumStories > 0) {
                        //i1      = strTemp.indexOf('LiveTimer.restart(');
						//if (i1 != -1) {
                        //   i2      = strTemp.indexOf(')',i1);
                        //   iNow    = strTemp.slice(i1+18,i2);
						//}
strTemp = strTemp.replace(/\\u003c/g,'<');
strTemp = strTemp.replace(/\u003c/g,'<');

                        i1      = strTemp.indexOf('"newestStoryTime":');
                        //i2      = strTemp.indexOf(',"oldestSt',i1);
						i2      = strTemp.indexOf(',',i1);
                        if (i1 != -1) 
                          iNow = strTemp.slice(i1+18,i2);
						//else
						//  iNow = iNewNow;
                        //GM_log('iNumStories= ' + iNumStories + ', iNow= ' + iNow);
                        //GM_log('Number of Stories Found = '+iNumStories + ', iNow= ' + iNow);
                        
/*
          		strTemp = strTemp.replace(/\\u00253A/g,":");
		        strTemp = strTemp.replace(/\\u00252F/g,'/');
		        strTemp = strTemp.replace(/\\u00253F/g,"?");
		        strTemp = strTemp.replace(/\\u00253D/g,"=");
		        strTemp = strTemp.replace(/\\u002526/g,"&");

		        strTemp = strTemp.replace(/\\u003c/g,"<");
				
				strTemp = strTemp.replace(/\\/g,"");
*/

                        i1      = strTemp.indexOf('"html":"')
                        i2      = strTemp.indexOf('","',i1);
						//i2      = strTemp.indexOf('","newestStoryTime',i1);
						i2      = strTemp.indexOf('","num_stories',i1);
						

                        oUl = document.createElement('div');
                        oUl.innerHTML = eval('"'+strTemp.slice(i1+8,i2) +'"');

                        lnk1=''; lnk2=''; lnk3=''; lnk4='';

//LogPush(oUl.innerHTML.replace(/</g,'&lt;'));
                        for (var i=0;i<oUl.childNodes.length;i++) {
                            
                            // get one wall notification
                            oLi = oUl.childNodes[i];

                            link_data = oLi.getAttribute('data-ft');
                            if (link_data != null) {
                              //  eval('link_data = ' + link_data);
								//LogPush(link_data.app_id);
                             //   oLi.id = "Ignore";

/*
                                //Get image from LI if it exists
                                oSnap = getSnapshot('.//div[contains(@class,"UIImageBlock clearfix")]/a/img',oLi);
                                if (oSnap.snapshotLength == 0) {
                                    myImg = ""
                                } else {
                                    myImg = oSnap.snapshotItem(0).src;
                                }
*/
                                oButton     = getSnapshot('.//span[@class="UIActionLinks UIActionLinks_bottom"]/a',oLi).snapshotItem(0);
                                oActorName       = getSnapshot('.//div[contains(@class,"actorDescription actorName")]',oLi).snapshotItem(0);
								if (oActorName == null) oActorName	= getSnapshot('.//span[@class="actorName"]',oLi).snapshotItem(0);
                                oAttachmentTitle = getSnapshot('.//div[contains(@class,"uiAttachmentTitle")]',oLi).snapshotItem(0);
                                oPicture     = getSnapshot('.//img[@class="uiProfilePhoto actorPic UIImageBlock_Image UIImageBlock_ICON_Image uiProfilePhotoMedium img"]',oLi).snapshotItem(0);
app_id = 0;
								if (oButton.href.indexOf('apps.facebook.com/inthemafia') != -1)
								    app_id = 10979261223;
								else if (oButton.href.indexOf('apps.facebook.com/onthefarm') != -1)
								    app_id = 102452128776;
								else if (oButton.href.indexOf('apps.facebook.com/farmvillechinese') != -1)
								    app_id = 156383461049284;
								//LogPush(oButton.href);

//if (app_id == 0) {

                                oWall           =   new WallItem();   

								//Cycle through each LI and look for Application specific keys
                                for (var name in Wall_Data[app_id]) {
                                    if (Wall_Data[app_id][name]['testURL'].test(oButton.href)) {
                                        oWall.Type      =   name;
                                        oWall.Action    =   oButton.href;
                                        oWall.BName     =   oButton.text;
                                        //oWall.ActorName	=	oActorName.innerHTML;
										oWall.ActorName =	(oActorName===null?'':oActorName.innerHTML);
                                        oWall.AttachmentTitle = (oAttachmentTitle===null?'':oAttachmentTitle.innerHTML);

										oWall.Picture =	(oPicture===null?'':oPicture.src);
                                        oWall.AppId     =  app_id;

                                        // test to see if we should process them
                                        bSkipItem = true;

                                        switch (oWall.AppId) {
                                            case 10979261223:
                                                // Mafia Wars
                                                if (xw_sig_valid == false) {
                                                    LogPush('Ignoring MW Wall notice.  Mafia Wars does not appear to be working.');
													//setTimeout("location.reload(true);",30000);
													//setTimeout("location.reload()", 30000);													
													//setTimeout(FB_xw_sig_update,15000);
													FB_xw_sig_update;
                                                } else {
                                                    //Ignore some types of jobs based on settings
                                                    switch (oWall.Type) {
                                                        case 'Ignore':
                                                            bSkipItem = true;
                                                            break;
                                                        case 'MW_WarHelp':
                                                            if (aParams[2011]) bSkipItem = false; //else LogPush('MW: Skipping War Help Notice');
                                                            break;
                                                        case 'MW_ChopShop':
															if (aParams[2900]) bSkipItem = false; //else LogPush('MW: Skipping initial Armory/CS/WD Parts send');
                                                            break;
                                                        case 'MW_Achievement':
															if (aParams[7897]) bSkipItem = false ;
                                                            break;
                                                        case 'MW_OperationReward':
														    if (aParams[2016]) bSkipItem = false;
                                                            break;
                                                        case 'MW_Levelupbonus':
														    if (aParams[7901] && !timeLeftGM('MW_levelupbonustimer')) {
															i3 = oLi.innerHTML.indexOf('<span class="messageBody"');
                                                            i4 = oLi.innerHTML.indexOf('</span></h6>',i3);
                                                                strTemp3 = oLi.innerHTML.slice(i3+26,i4);
																if (strTemp3.toUpperCase().indexOf('ATT') != -1 || strTemp3.toUpperCase().indexOf('DEF') != -1
																	|| strTemp3.indexOf('+3') != -1 || strTemp3.indexOf('+ 3') != -1)
																	bSkipItem = false;
														    }
                                                            break;														
                                                        case 'MW_Missions':
                                                            if ((aParams[2021] ==2 || aParams[2021] ==3) && (user_socialmissions<10 && !timeLeftGM('MW_MissionTimer'))) {
															    if (aParams[2023] =='both') {
																   if (aParams[2561]==1) {
																     if (user_energy < parseInt(aParams[9051])) aParams[2023] ='stamina';
																     if (user_stamina < parseInt(aParams[9052])) aParams[2023] ='energy';
															         if (user_stamina < parseInt(aParams[9052]) && user_energy < parseInt(aParams[9051])) aParams[2021] =0;
																   }
														   	    }
                                                                if ((user_energy < parseInt(aParams[9051]) && aParams[2023].toUpperCase() =='ENERGY') || 
																	(user_stamina < parseInt(aParams[9052]) && aParams[2023].toUpperCase() =='STAMINA') ||
																	((user_energy < parseInt(aParams[9051]) && user_stamina < parseInt(parseInt(aParams[9052]))) && aParams[2023] =='both'))
																	LogPush('<b>' + oWall.Type+': ' +  oWall.AttachmentTitle+'</b> (' +  oWall.ActorName +')' + '<BR><font color="red">Can not accept mission, Eenergy: '+ user_energy +'('+aParams[9051]+'), Stamina:'+ user_stamina +'('+aParams[9052] + ') Type: ' + aParams[2023] + '</font>');
                                                                else 
																	bSkipItem = false;

														    } else if (aParams[2021] ==5 && user_socialmissions<10) {
															      if (aParams[2023] =='both') {
																     if (aParams[2561]==1) {
																       if (user_energy < parseInt(aParams[9051])) aParams[2023] ='stamina';
																       if (user_stamina < parseInt(aParams[9052])) aParams[2023] ='energy';
															           if (user_stamina < parseInt(aParams[9052]) && user_energy < parseInt(aParams[9051])) aParams[2021] =0;
																     }
														   	       }

																  i3 = oWall.ActorName.indexOf('user.php?id=');
																  if (i3 != -1) {																		 
													              i4 = oWall.ActorName.indexOf('">',i3);
																  strFriend = oWall.ActorName.slice(i3+12,i4);
																  i2 = oLi.innerHTML.indexOf('</a>',i4);
																  frid = oWall.ActorName.slice(i4+2,i2);																		 
                                                                  for (var s=9001;s<9031;s++) {
                                                                     if ((strFriend==aParams[s]) || (frid==aParams[s])) {
                                                                         bSkipItem = false;
                                                                         break;
                                                                     }
																  }
																		  
																  if ((bSkipItem) && (bShowDetail)) LogPush('<b>' + oWall.Type+': ' +  oWall.AttachmentTitle+'</b> (' +  oWall.ActorName +')<br>Skipping Mission Request(Wall)- ' + frid + ' ('+strFriend+')');
																  if (bSkipItem == false) {
                                                                     if ((user_energy < parseInt(aParams[9051]) && aParams[2023].toUpperCase() =='ENERGY') || 
																	     (user_stamina < parseInt(aParams[9052]) && aParams[2023].toUpperCase() =='STAMINA') ||
																	     ((user_energy < parseInt(aParams[9051]) && user_stamina < parseInt(aParams[9052])) && aParams[2023] =='both' && aParams[2021] ==5)) {
																	         LogPush('<b>' + oWall.Type+': ' +  oWall.AttachmentTitle+'</b> (' +  oWall.ActorName +')' + '<BR><font color="blue">Can not accept mission, Eenergy: '+ user_energy +'('+aParams[9051]+'), Stamina:'+ user_stamina +'('+aParams[9052] + ') Type: ' + aParams[2023] + '</font>');
																		 	 bSkipItem == true;
																	  }
																  }

														    }															  

															}
                                                             break; 

                                                        //case 'MW_Secret_Reward':
                                                        //   if (oWall.ActorName.indexOf('user.php?id='+FB_user_id+'">') != -1) bSkipItem = false;
                                                        //     break;
                                                        case 'MW_SSportsBar':
															if (!timeLeftGM('MW_SSportsBarTimer')) {
															//if (getHoursTime('MW_SSportsBarTimer') == 0) {
												            if (aParams[7900]) {
													              bSkipItem = false; 
													           } else {
																  i3 = oWall.ActorName.indexOf('user.php?id=');
																  if (i3 != -1) {
													            	  i4 = oWall.ActorName.indexOf('">',i3);
																	  strFriend = oWall.ActorName.slice(i3+12,i4);
																	  i2 = oWall.ActorName.indexOf('</a>',i4);
																	  frid = oWall.ActorName.slice(i4+2,i2);
																	  //LogPush('strFriend='+strFriend+', frid='+frid);
                                                                      for (var s=9001;s<9031;s++) {
                                                                          if ((strFriend == aParams[s]) || (frid == aParams[s])) {
																		   //LogPush2('strFriend='+strFriend+', frid='+frid);
                                                                           bSkipItem = false;
                                                                           break;
                                                                          }
																	  }
																  }
													           }
														    }
                                                            break;
														case 'MW_Sportsbar':
														    if (aParams[7904] && !timeLeftGM('MW_SportsbarTimer')) bSkipItem = false;
													          break; 
                                                        case 'MW_PChopShop':
                                                        case 'MW_PWeapons':
                                                        case 'MW_PArmory':
                                                        case 'MW_PZoo':
												            if (aParams[7890]) bSkipItem = false;
													          break;
                                                        case 'MW_PSpecial':
															if (!timeLeftGM('MW_PSpecialTimer')) {
															//if (getHoursTime('MW_PSpecialTimer') == 0) {
												            if (aParams[7894]) {
													              bSkipItem = false; 
													           } else {
																  i3 = oWall.ActorName.indexOf('user.php?id=');
																  if (i3 != -1) {
													            	  i4 = oWall.ActorName.indexOf('">',i3);
																	  strFriend = oWall.ActorName.slice(i3+12,i4);
																	  i2 = oWall.ActorName.indexOf('</a>',i4);
																	  frid = oWall.ActorName.slice(i4+2,i2);	
                                                                      for (var s=9001;s<9031;s++) {
                                                                          if ((strFriend==aParams[s]) || (frid==aParams[s])) {
                                                                           bSkipItem = false;
                                                                           break;
                                                                          }
																	  }
																  }
													           }
														    }
                                                            break;
                                                        case 'MW_PVegas':
															if (!timeLeftGM('MW_PVegasTimer')) {
															//if (getHoursTime('MW_PVegasTimer') == 0) {
												            if (aParams[7895]) {
													              bSkipItem = false; 
													           } else {
																  i3 = oWall.ActorName.indexOf('user.php?id=');
																  if (i3 != -1) {
													            	  i4 = oWall.ActorName.indexOf('">',i3);
																	  strFriend = oWall.ActorName.slice(i3+12,i4);
																	  i2 = oWall.ActorName.indexOf('</a>',i4);
																	  frid = oWall.ActorName.slice(i4+2,i2);	
                                                                      for (var s=9001;s<9031;s++) {
                                                                          if ((strFriend==aParams[s]) || (frid==aParams[s])) {
                                                                           bSkipItem = false;
                                                                           break;
                                                                          }
																	  }
																  }
													           }
														    }
                                                            break;
                                                        case 'MW_PItaly':
															i//f (!timeLeftGM('MW_PItalyTimer')) {
															if (getHoursTime('MW_PItalyTimer') == 0) {
												            if (aParams[7896]) {
													              bSkipItem = false; 
													           } else {
																  i3 = oWall.ActorName.indexOf('user.php?id=');
																  if (i3 != -1) {
													            	  i4 = oWall.ActorName.indexOf('">',i3);
																	  strFriend = oWall.ActorName.slice(i3+12,i4);
																	  i2 = oWall.ActorName.indexOf('</a>',i4);
																	  frid = oWall.ActorName.slice(i4+2,i2);	
                                                                      for (var s=9001;s<9031;s++) {
                                                                          if ((strFriend==aParams[s]) || (frid==aParams[s])) {
                                                                           bSkipItem = false;
                                                                           break;
                                                                          }
																	  }
																  }
													           }
														    }
                                                            break;
                                                        case 'MW_PBrazil':
															if (!timeLeftGM('MW_PBrazilTimer')) {
															//if (getHoursTime('MW_PBrazilTimer') == 0) {
												            if (aParams[7899]) {
													              bSkipItem = false; 
													           } else {
																  i3 = oWall.ActorName.indexOf('user.php?id=');
																  if (i3 != -1) {
													            	  i4 = oWall.ActorName.indexOf('">',i3);
																	  strFriend = oWall.ActorName.slice(i3+12,i4);
																	  i2 = oWall.ActorName.indexOf('</a>',i4);
																	  frid = oWall.ActorName.slice(i4+2,i2);	
                                                                      for (var s=9001;s<9031;s++) {
                                                                          if ((strFriend==aParams[s]) || (frid==aParams[s])) {
                                                                           bSkipItem = false;
                                                                           break;
                                                                          }
																	  }
																  }
													           }
														    }
                                                            break;
                                                        case 'MW_PChicago':
															if (!timeLeftGM('MW_PChicagoTimer')) {
															//if (getHoursTime('MW_PChicagoTimer') == 0) {
												               if (aParams[7902]) {
													              bSkipItem = false; 
													           } else {
																  i3 = oWall.ActorName.indexOf('user.php?id=');
																  if (i3 != -1) {
													            	  i4 = oWall.ActorName.indexOf('">',i3);
																	  strFriend = oWall.ActorName.slice(i3+12,i4);
																	  i2 = oWall.ActorName.indexOf('</a>',i4);
																	  frid = oWall.ActorName.slice(i4+2,i2);	
                                                                      for (var s=9001;s<9031;s++) {
                                                                          if ((strFriend==aParams[s]) || (frid==aParams[s])) {
                                                                           bSkipItem = false;
                                                                           break;
                                                                          }
																	  }
																  }
													           }
														    }
                                                            break;
                                                        case 'MW_PLondon':
															if (!timeLeftGM('MW_PLondonTimer')) {
															//if (getHoursTime('MW_PChicagoTimer') == 0) {
												               if (aParams[7906]) {
													              bSkipItem = false; 
													           } else {
																  i3 = oWall.ActorName.indexOf('user.php?id=');
																  if (i3 != -1) {
													            	  i4 = oWall.ActorName.indexOf('">',i3);
																	  strFriend = oWall.ActorName.slice(i3+12,i4);
																	  i2 = oWall.ActorName.indexOf('</a>',i4);
																	  frid = oWall.ActorName.slice(i4+2,i2);	
                                                                      for (var s=9001;s<9031;s++) {
                                                                          if ((strFriend==aParams[s]) || (frid==aParams[s])) {
                                                                           bSkipItem = false;
                                                                           break;
                                                                          }
																	  }
																  }
													           }
														    }
                                                            break;
                                                        case 'MW_AS':
															//if (!timeLeftGM('MW_astimer')) {
															if (getHoursTime('MW_astimer') == 0) {
												               if (aParams[7905]) {
													              bSkipItem = false; 
													           } else {
																  i3 = oWall.ActorName.indexOf('user.php?id=');
																  if (i3 != -1) {
													            	  i4 = oWall.ActorName.indexOf('">',i3);
																	  strFriend = oWall.ActorName.slice(i3+12,i4);
																	  i2 = oWall.ActorName.indexOf('</a>',i4);
																	  frid = oWall.ActorName.slice(i4+2,i2);	
                                                                      for (var s=9001;s<9031;s++) {
                                                                          if ((strFriend==aParams[s]) || (frid==aParams[s])) {
                                                                           bSkipItem = false;
                                                                           break;
                                                                          }
																	  }
																  }
													           }
														    }
                                                            break;
														case 'MW_DTV3':
															if (!timeLeftGM('MW_dtv3timer')) bSkipItem = false;
                                                            break;			
                                                        case 'MW_MissionReward':
														    if (aParams[2008] && !timeLeftGM('MW_missionrewardtimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_FightEvent':
														    if (aParams[2008] && !timeLeftGM('MW_fighteventtimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_Event':
														    if (aParams[2008] && !timeLeftGM('MW_eventwalltimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_Getpart':
														    if (aParams[2008] && !timeLeftGM('MW_getparttimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_Mastery':
														    if (aParams[2008] && !timeLeftGM('MW_masterytimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_BossFightV2':
														    if (aParams[2008] && !timeLeftGM('MW_bossfightv2timer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_Challenge':
														    if (aParams[2008] && !timeLeftGM('MW_challengetimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_RobSquad':
														    if (aParams[2008] && !timeLeftGM('MW_robsquadtimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_FightBoost':
														    if (aParams[2008] && !timeLeftGM('MW_fightboosttimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_FreeGift':
														  if (aParams[2008] && !timeLeftGM('MW_freegifttimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_LootDropEvent':
														  if (aParams[2017] && !timeLeftGM('MW_lootdropeventtimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_BossBonus':
														  if (aParams[2008] && !timeLeftGM('MW_bossbonustimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_IcedBonus':
														  if (aParams[2008] && !timeLeftGM('MW_icedbonustimer')) bSkipItem = false;
													        break;
                                                        case 'MW_HolidayBonus':
														  if (aParams[2008] && !timeLeftGM('MW_holidaybonustimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_NeedHelp_NY':
														          if (aParams[2004] && !timeLeftGM('MW_NeedHelp_NYTimer')) bSkipItem = false;
													                break;
                                                        case 'MW_NeedHelp_Bangkok':
														          if (aParams[2004] && !timeLeftGM('MW_NeedHelp_BangkokTimer')) bSkipItem = false;
													                break;
                                                        case 'MW_NeedHelp_Vegas':
                                                                  if (aParams[2004] && !timeLeftGM('MW_NeedHelp_VegasTimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_NeedHelp_Italy':
                                                                  if (aParams[2004] && !timeLeftGM('MW_NeedHelp_ItalyTimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_NeedHelp_Brazil':
                                                                  if (aParams[2004] && !timeLeftGM('MW_NeedHelp_BrazilTimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_NeedHelp_Chicago':
                                                                  if (aParams[2004] && !timeLeftGM('MW_NeedHelp_ChicagoTimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_NeedHelp_London':
                                                                  if (aParams[2004] && !timeLeftGM('MW_NeedHelp_LondonTimer')) bSkipItem = false;
                                                            break;
                                                        case 'MW_VegasSlots':
														    if (aParams[2015] && !timeLeftGM('MW_SlotsTimer')) bSkipItem = false;
                                                            break;
													    case 'MW_S_Energy':
													        if (aParams[2010]) bSkipItem = false; //else LogPush('MW: Skipping Supply Parts notice');
                                                            break;															
                                                        case 'MW_2XLoot':
															if (aParams[2008] && !timeLeftGM('MW_2XLootTimer')) bSkipItem = false;
														    break;	
                                                        case 'MW_HelpGift':
															if (aParams[2008] && !timeLeftGM('MW_HelpGiftTimer')) bSkipItem = false;
														    break;		
														case 'MW_London':
														case 'MW_Poker':
														case 'MW_Event_Send':
														case 'MW_CollectEnergy':
														case 'MW_FootBall':
                                                        case 'MW_LevelUp':
                                                        case 'MW_Robbing':
                                                        case 'MW_Burner':
                                                        case 'MW_ShareRewardEvent':
                                                        case 'MW_Protect':
                                                        ///case 'MW_Golden_Mask':
                                                        case 'MW_Crew':
                                                        case 'MW_Loyalty':
                                                        case 'MW_LimitedTime':
														  if (aParams[2008]) bSkipItem = false;
                                                            break;
                                                        case 'MW_NextTarget':
                                                            if (aParams[2006]) bSkipItem = false;
                                                            break;
														case 'MW_CollectGift':
														    bSkipItem = false;
                                                            break;
                                                        case 'MW_Bounty':
                                                            if (aParams[2007]) bSkipItem = false;
                                                            break;

                                                    }
                                                    //GM_log('bSkipItem = ' + oWall.Type);
                                                }
												if (lnk1 == oWall.Action) bSkipItem = true;
											    lnk1 = oWall.Action;
                                                break;

                                         case 102452128776:
                                                // FarmVille
                                                switch (oWall.Type) {
                                                    case 'Ignore':
                                                        bSkipItem = true;
                                                        break;
                                                    case 'FV_Ignore':
                                                        bSkipItem = true;
                                                        break;
                                                    case 'FV_FriendRewad':
                                                    case 'FV_Found':
													//case 'FV_Send':														
                                                    case 'FV_WallToWall':
                                                    case 'FV_Gold':
                                                    case 'FV_GetPart':
                                                    case 'FV_Lost':
													//case 'FV_Help':
														if (aParams[3050])
                                                         bSkipItem = false; 
                                                        break;
                                                }
												if (lnk2 == oWall.Action) bSkipItem = true;
											    lnk2 = oWall.Action;
                                                break;

                                         case 156383461049284:
                                                // FarmVille
                                                switch (oWall.Type) {
                                                    case 'Ignore':
                                                        bSkipItem = true;
                                                        break;
                                                    case 'FV_Ignore':
                                                        bSkipItem = true;
                                                        break;
                                                    case 'FV_FriendRewad':
                                                    case 'FV_Found':
													//case 'FV_Send':														
                                                    case 'FV_WallToWall':
                                                    case 'FV_Gold':
                                                    case 'FV_GetPart':
                                                    case 'FV_Lost':
													//case 'FV_Help':
														if (aParams[3050])
                                                         bSkipItem = false; 
                                                        break;
                                                }
												if (lnk3 == oWall.Action) bSkipItem = true;
											    lnk3 = oWall.Action;
                                                break;

                                         default:
				                           break;

                                        }

                                        // end test section

                                        if (!bSkipItem) {
											//if (lnk4 != oWall.Action) {
											//lnk4 = oWall.Action;
                                            //if (name == "MW_WarHelp" || name == "MW_Missions" || name == "MW_OperationReward") {
											if (name == "MW_WarHelp") {
                                                //add to top
                                                oWallList.Insert(oWall);
                                            } else {
                                                //add to bottom
                                                oWallList.Append(oWall);
                                            }
                                            //GM_log('iWallNum = ' + iWallNum);
                                            iWallNum        =   iWallNum + 1;
											//}  ///

                                        } 

									}

                                   } 

//} else {								
// tinyurl
									i3 = oLi.innerHTML.indexOf('class="messageBody"');
									if (i3 != -1) {	
                                      i4 = oLi.innerHTML.indexOf('</span></h6>',i3);
                                      strTemp2 = oLi.innerHTML.slice(i3+26,i4);
									} else strTemp2 = '';
	if (strTemp2.length > 31) {	

                             if ((aParams[9701]==1 && strTemp2.indexOf('href=') != -1) && (strTemp2.indexOf('fun.zynga.com') != -1 || strTemp2.indexOf('zynga.tm') != -1 || strTemp2.indexOf('next_action=fan_blast') != -1 || strTemp2.indexOf('tinyurl') != -1 || strTemp2.indexOf('bit.ly') != -1 || strTemp2.indexOf('spockon.me') != -1)) {
								if (strTemp2.indexOf('fun.zynga.com') != -1 || strTemp2.indexOf('zynga.tm') != -1 || strTemp2.indexOf('next_action=fan_blast') != -1) {
                                   if (strTemp2.toUpperCase().indexOf('POINT') != -1 || strTemp2.toUpperCase().indexOf('REWARD') != -1) {
                                      i1 = strTemp2.toUpperCase().indexOf('POINT'); 
                                      if (i1 == -1) i1=strTemp2.toUpperCase().indexOf('REWARD');									 
									  if (strTemp2.indexOf('href=',i1) != -1) {
										i1 = strTemp2.indexOf('href=',i1);
										i1 = strTemp2.indexOf('"',i1+5);
										i2 = strTemp2.indexOf('"',i1+1);
										if (strTemp2.slice(i1+1,i2) != GM_getValue('FeeSPURL','') && (strTemp2.slice(i1+1,i2).indexOf('fun.zynga.com') != -1 || strTemp2.slice(i1+1,i2).indexOf('zynga.tm') != -1)) {
										   GM_setValue('FeeSPURL',strTemp2.slice(i1+1,i2));
										   setGMTime('MW_FeeSPTimer', '00:00:00');
									    }
									  }
                                   }
								}

 					              if (aParams[7901] && strTemp2.indexOf('href=') != -1 && !timeLeftGM('MW_levelupbonustimer')) {
									if (strTemp2.toUpperCase().indexOf('ATT') != -1 || strTemp2.toUpperCase().indexOf('DEF') != -1
										|| strTemp2.indexOf('+3') != -1 || strTemp2.indexOf('+ 3') != -1) {
                                   if (strTemp2.indexOf('tinyurl') != -1 || strTemp2.toUpperCase().indexOf('NEXT_ACTION=LEVELUPBONUSCLAIM') != -1) {
										i1 = strTemp2.indexOf('href=',i1);
										i1 = strTemp2.indexOf('"',i1+5);
										i2 = strTemp2.indexOf('"',i1+1);
                                        strTiny9 = strTemp2.slice(i1+1,i2);
										strTiny9 = strTiny9.replace(/&amp;/g,'&');
											//LogPush(oActorName.innerHTML + ' - ' + strTiny);
											oWall  =   new WallItem();
                                            oWall.Action = strTiny9;
									  	    oWall.Type    =   'MW_Levelupbonus'; 
										    oWall.BName     =  'LevelupBonus';
										    oWall.AppId     =   10979261223;
										    oWall.ActorName =	oActorName.innerHTML;
											oWall.AttachmentTitle = '<a href="'+strTiny9+'">Levelup bonus</a>';
                                            oWallList.Append(oWall);
											iWallNum        =   iWallNum + 1;							                
										 //strTiny10 = strTiny9;									
								   }

									}																
								  }


                                   if (strTemp2.indexOf('href=') != -1 && strTemp2.toUpperCase().indexOf('EMAIL BONUS') != -1) {
                                      i1 = strTemp2.toUpperCase().indexOf('EMAIL BONUS'); 
									  i2 = strTemp2.indexOf('tinyurl'); 
									  if (i2 == -1) i2 = strTemp2.indexOf('bit.ly'); 
									  if (i2 == -1) i2 = strTemp2.indexOf('spockon.me'); 
									if (i1 != -1 && i2 != -1) {	
										i1 = strTemp2.indexOf('href=',i1);
										i1 = strTemp2.indexOf('"',i1+5);
										i2 = strTemp2.indexOf('"',i1+1);
                                        strTiny9 = strTemp2.slice(i1+1,i2);
										if (strTiny10 != strTiny9) {	
											oWall  =   new WallItem();
                                            oWall.Action = strTiny9;
									  	    oWall.Type    =   'MW_CollectGift'; 
										    oWall.BName     =  'EMAIL';
										    oWall.AppId     =   10979261223;
										    oWall.ActorName =	oActorName.innerHTML;
											oWall.AttachmentTitle = '<a href="'+strTiny9+'">email bonus</a>';
                                            oWallList.Append(oWall);
											iWallNum        =   iWallNum + 1;							                
										 }
										 strTiny10 = strTiny9;
									}
									}


                             } // end collect tiny



                                    if ((strTemp2.indexOf('href=') != -1 && (strTemp2.toUpperCase().indexOf('WAR HELP') != -1) || strTemp2.indexOf('_controller=war') != -1)) {
									i1 = strTemp2.indexOf('href='); 
									//if (i2 == -1) i2 = strTemp2.indexOf('next_controller=war'); 
									if (i1 != -1) {	
										i1 = strTemp2.indexOf('"',i1);
										i2 = strTemp2.indexOf('"',i1+1);
                                        strTiny3 = strTemp2.slice(i1+1,i2);
										if (strTiny3 != '#') {	
										strTiny3 = strTiny3.replace(/&amp;/g,'&');
										strTiny3 = strTiny3.replace(/https:/g,'http:');
										if (strTiny4 != strTiny3) {	
											oWall  =   new WallItem();
                                            oWall.Action = strTiny3;
									  	    oWall.Type    =   'MW_WarHelp'; 
										    oWall.BName     =  'TinyURL-WarHelp';
										    oWall.AppId     =   10979261223;
										    oWall.ActorName =	oActorName.innerHTML;
											//oWall.Picture   =  	oPicture.src;
											oWall.AttachmentTitle = '<a href="'+strTiny3+'">WarHelp</a>';
											oWallList.Insert(oWall);
											iWallNum        =   iWallNum + 1;							                
										 }
										}
										 strTiny4 = strTiny3;
									}
									}

/*
                                   if (oLi.innerHTML.toUpperCase().indexOf('MINI ENERGY') != -1 && strTemp2.indexOf('href=') != -1) {
                                      i1 = oLi.innerHTML.toUpperCase().indexOf('MINI ENERGY'); 
									  i2 = oLi.innerHTML.indexOf('tinyurl'); 
									  if (i2 == -1) i2 = oLi.innerHTML.indexOf('bit.ly'); 
									  if (i2 == -1) i2 = oLi.innerHTML.indexOf('spockon.me'); 
									if (i1 != -1 && i2 != -1) {	
										i1 = oLi.innerHTML.indexOf('href=',i1);
										i1 = oLi.innerHTML.indexOf('"',i1+5);
										i2 = oLi.innerHTML.indexOf('"',i1+1);
                                        strTiny11 = oLi.innerHTML.slice(i1+1,i2);
										if (strTiny12 != strTiny11) {	
											//LogPush(oActorName.innerHTML + ' - ' + strTiny);
											oWall  =   new WallItem();
                                            oWall.Action = strTiny11;
									  	    oWall.Type    =   'MW_CollectEnergy'; 
										    oWall.BName     =  'Energy';
										    oWall.AppId     =   10979261223;
										    oWall.ActorName =	oActorName.innerHTML;
											//oWall.Picture   =  	oPicture.src;
											oWall.AttachmentTitle = '<a href="'+strTiny11+'">Energy</a>';
                                            oWallList.Append(oWall);
											iWallNum        =   iWallNum + 1;							                
										 }
										 strTiny12 = strTiny11;
									}
									}
*/
/*
                                   if (oLi.innerHTML.toUpperCase().indexOf('BRAZIL CREW') != -1 && strTemp2.indexOf('href=') != -1) {
                                      i1 = oLi.innerHTML.toUpperCase().indexOf('BRAZIL CREW'); 
									  i2 = oLi.innerHTML.indexOf('tinyurl'); 
									  if (i2 == -1) i2 = oLi.innerHTML.indexOf('bit.ly'); 
									  if (i2 == -1) i2 = oLi.innerHTML.indexOf('spockon.me'); 
									if (i1 != -1 && i2 != -1) {	
										i1 = oLi.innerHTML.indexOf('href=',i1);
										i1 = oLi.innerHTML.indexOf('"',i1+5);
										i2 = oLi.innerHTML.indexOf('"',i1+1);
                                        strTiny13 = oLi.innerHTML.slice(i1+1,i2);
										if (strTiny14 != strTiny13) {	
											//LogPush(oActorName.innerHTML + ' - ' + strTiny);
											oWall  =   new WallItem();
                                            oWall.Action = strTiny13;
									  	    oWall.Type    =   'MW_Crew'; 
										    oWall.BName     =  'BrazilCrew-Tiny';
										    oWall.AppId     =   10979261223;
										    oWall.ActorName =	oActorName.innerHTML;
											//oWall.Picture   =  	oPicture.src;
											oWall.AttachmentTitle = '<a href="'+strTiny13+'">Brazil Crew</a>';
                                            oWallList.Append(oWall);
											iWallNum        =   iWallNum + 1;							                
										 }
										 strTiny14 = strTiny13;
									}
									}
*/
								if ((aParams[2012]) && (GM_getValue('FeeSPURL','') != '') && !timeLeftGM('MW_FeeSPTimer')) {
											oWall  =   new WallItem();
                                            oWall.Action = GM_getValue('FeeSPURL','');
									  	    oWall.Type    =   'MW_CollectGift'; 
										    oWall.BName     =  'Free-SP';
										    oWall.AppId     =   10979261223;
										    oWall.ActorName =	'FREE Point - Daily';
											oWall.AttachmentTitle = '<a href="'+GM_getValue('FeeSPURL','')+'">Free SP</a>';
                                            oWallList.Append(oWall);
											iWallNum        =   iWallNum + 1;
											//if (!timeLeftGM('MW_FeeSPTimer'))
											  setGMTime('MW_FeeSPTimer', '1 hour');
                                 }





	}

                                if (!timeLeftGM('MW_3SpinTimer')) {
											oWall  =   new WallItem();
                                            oWall.Action = FreeSpinURL;
									  	    oWall.Type    =   'MW_3Spin'; 
										    oWall.BName     =  '3Spin';
										    oWall.AppId     =   10979261223;
										    oWall.ActorName =	'NONE- 3 Free Spins';
											oWall.AttachmentTitle = '<a href="'+FreeSpinURL+'">Free Spin</a>';
                                            oWallList.Append(oWall);
											iWallNum        =   iWallNum + 1;		
											setGMTime('MW_3SpinTimer', '1 hour');
                                }

                                if (!timeLeftGM('MW_EbonusTimer')) {
											oWall  =   new WallItem();
                                            oWall.Action = EmailBonusURL;
									  	    oWall.Type    =   'MW_CollectGift'; 
										    oWall.BName     =  'EMAIL';
										    oWall.AppId     =   10979261223;
										    oWall.ActorName =	'NONE- Email Bonus';
											oWall.AttachmentTitle = '<a href="'+EmailBonusURL+'">email bonus</a>';
                                            oWallList.Append(oWall);
											iWallNum        =   iWallNum + 1;	
											setGMTime('MW_EbonusTimer', '3 hour');
                                }
//}
// tinyurl			             

                            } else {
                                    GM_log('link data is null');
									//throw {message:"link data is null"}
									//if (strTemp!=undefined) LogPush('link data is null - '+strTemp.slice(0,200));
                            }
                        }

                    } else {
						//throw {message:"Error - ReadWall - Story=0"}
                        //LogPush('Error - ReadWall - Story=0');
                    }




					        if ((parseInt(aParams[2570]) == 1) && parseInt(user_health) < parseInt(aParams[2571]) && parseInt(user_health) > 19)
							   ReHeal(); 
							else if ((parseInt(aParams[2572]) == 1) && parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();


                    if (bAutoRun) {
                      if (oWallList.First != null) {
						  //GM_log('iWallNum = '+iWallNum);
						  if (bShowDetail) LogPush('<strong>' + iWallNum +' wall notification(s) have been found and will be processed</strong>');
                          setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, 0);
                      } else {
                          setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, getRandRange(aParams[3]*750,aParams[3]*1250));
                      }
                      //if (iWallCurrent < iHoldEvent) {
                          // The browser has reset.  Cancel runaway jobs;
                      //    clearTimeout(iWallCurrent);
                      //}
                    }
                } catch(err) {
                  if (bAutoRun) {
                      //GM_log('Error: Read Wall - ' + err.message);
                      if (err.message == 'Error Read Wall') throw {message:"Error - ReadWall 0"}
						  //setTimeout("location.reload();",5000);
					  else 
						  if (strTemp!=undefined && err.message != 'oButton is null' ) {
						  GM_log('Error: Read Wall 2 - '+strTemp.slice(0,200));
						  LogPush('<strong>Error: Read Wall - ' + err.message + '.  Checking again in ' + aParams[3]+' seconds.</strong>');
					  }
                      //LogPush('<strong>Error Reading Wall Notices.  Checking again in ' + aParams[3]+' seconds.</strong>');
					  //setTimeout(check, 500);
					  //if (err.message != 'oButton is null') setTimeout("location.reload(true);",20000);
					  setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, getRandRange(aParams[3]*750,aParams[3]*1250));                      
                    }
                }
            }
        } )
    } else {
        GM_log('Abort read request.  Switch is off');
    }
}


// Read Request from FB

function Read_FB_Requests(){

    var iHoldEvent;

    var myUrl;

    iRequestNum = 0;
    var iNumPigs = 0;
    var iNumDrops = 0;
    var iNum = new Array();

    GM_log('Read_FB_Requests');

    if (bAutoRun) {

        oRequestList.Erase();

        myUrl    =   document.location.protocol+'//www.facebook.com/reqs.php';

        GM_xmlhttpRequest({
        method: 'GET',
        url:  myUrl,
        headers: {
            //'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            //'Accept-Language': 'en-us,en;q=0.5',
            //'Content-Type':    'application/x-www-form-urlencoded; charset=UTF-8'
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        onload: function(_responseDetails) {
        try {
            var i1,i2, myUrl, myUrl2;
            var oDOM, oForms, oForm, oFormInputs, oFormInput, oInputs, oInput, oRequest, oRequest2;
            var oSpan;
            var strTemp, strTempGift;
            var iButtons;
            var aCat;
            var oFormId;
			var Giftname, reqid;

            if (_responseDetails.status != 200) {
                LogPush('Error Read message from Requests page');
            } else {

                strTemp = _responseDetails.responseText

                if (strTemp.indexOf('<div id="contentArea')==-1) throw {message:"No request have been found"}

                i1 = strTemp.indexOf('<div id="contentArea');
                i2 = strTemp.indexOf('<div id="bottomContent',i1);

                oDOM = document.createElement('div');
                oDOM.innerHTML = strTemp.slice(i1,i2);

                // Step 1 - find all the Friend Add Requests

                oForms = getSnapshot(strConfirmBoxes1, oDOM);
                GM_log('Friend Requests Found = '+oForms.snapshotLength );

                    for(i=0; i < oForms.snapshotLength; i++) {
                        oForm       =   oForms.snapshotItem(i);
                        oFormInputs =   getSnapshot(strFormInputs, oForm);
                        oRequest    =   new RequestItem();

                        for ( j=0; j<oFormInputs.snapshotLength; j++) {
                            oFormInput      =   oFormInputs.snapshotItem(j);

                            switch (oFormInput.type) {
                                case 'hidden':
                                    // grab the parameters need to action the item
                                    oRequest.Parms += "&"+oFormInput.name+"="+escape(oFormInput.value)
                                    break;
                                case 'submit':
                                    // grab the name of what we are actioning, and the http action request
                                    if (oFormInput.name == 'actions[hide]') 	oRequest.Gifttype   =   'friend_connect';
                                    if (oFormInput.name == 'actions[reject]')	oRequest.Gifttype   =   'friend_suggestion';
									break;
                            }
                        }

                        if (oRequest.Gifttype =='friend_suggestion') {
	                        if (aParams[1000] > 0 ) {
			                    switch (aParams[1000]) {
		                            case '2': oRequest.Parms += '&actions[accept]=Confirm'; break;
		                            case '1': oRequest.Parms += '&actions[reject]=Delete%20Request'; break;
		                            case '3': oRequest.Parms += '&actions[hide]=Not%20Now'; break;
		                        }
	                        	oRequestList.Append(oRequest);
	                        	iRequestNum = iRequestNum + 1;
                        	}
                    	} else if (oRequest.Gifttype =='friend_connect') {
	                        if (aParams[1002] > 0 ) {
			                    switch (aParams[1002]) {
		                            case '2': oRequest.Parms += '&actions[accept]=Confirm'; break;
		                            case '1': oRequest.Parms += '&actions[reject]=Delete%20Request'; break;
		                            case '3': oRequest.Parms += '&actions[hide]=Not%20Now'; break;
		                        }
	                        	oRequestList.Append(oRequest);
	                        	iRequestNum = iRequestNum + 1;
                        	}
                    	}

                    }

                    // Find all the traditional Requests (ie Non Game Requests)
                    oForms = getSnapshot(strConfirmBoxes2, oDOM);
                    if (oForms.snapshotLength == 0) {
 	                     strConfirmBoxes2 = './/label[@class="uiButton uiButtonConfirm"]//form';
                         oForms = getSnapshot(strConfirmBoxes2, oDOM);
					}
                    GM_log('oForms.snapshotLength = '+oForms.snapshotLength );

                    for(i=0; i < oForms.snapshotLength; i++) {

                        oForm               =   oForms.snapshotItem(i);
                        oFormId             =   getSnapshot(strFormId,oForm).snapshotItem(0).id;
                        aCat                =   oFormId.split('_');

                        oFormInputs         =   getSnapshot(strFormInputs, oForm);
                        oRequest            =   new RequestItem();
                        oRequest.Gifttype   =   oFormId;

                        switch (aCat[0]) {
                            case 'event':
                                if (aParams[1004]>0) {
                                    oRequest.Parms  =   '&ok=Okay&__d=1&action=remove';

                                    for ( k=0; k < oFormInputs.snapshotLength; k++) {
                                        oFormInput      =   oFormInputs.snapshotItem(k);
                                        if (oFormInput.type == 'hidden') {
                                            switch (oFormInput.name) {
                                                case 'id':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                case 'type':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                //case 'status_div_id':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                case 'div_id':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                case 'params[from_id]':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                case 'params[app_id]':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                case 'post_form_id':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                case 'params[from_id]':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                case 'params[app_id]':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                case 'fb_dtsg':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                            }
                                        }
                                    }

                                    oRequest.Parms += "&lsd&post_form_id_source=AsyncRequest";

                                    //GM_log('oRequest.Parms = '+oRequest.Parms);

                                    oRequestList.Append(oRequest);
                                    iRequestNum   =   iRequestNum + 1;

                                } else {
                                    GM_log('Skipping Event');
                                }
                                break;

                            case 'group':
                            case 'fbpage':

                                iButtons = 0;

                                for ( j=0; j<oFormInputs.snapshotLength; j++) {
                                    oFormInput      =   oFormInputs.snapshotItem(j);

                                    switch (oFormInput.type) {
                                        case 'hidden':
                                            // grab the parameters need to action the item
                                            oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
                                            break;
                                        case 'submit':
                                            if (oFormInput.name == 'actions[reject]')
                                            oRequest.Reject     = "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
                                            iButtons += 1;
                                    }
                                }

                                oRequest.Parms += '';

                                if (iButtons<2) {
                                    GM_log('Ignoring malformed gift request. (no Accept button)');
                                    oRequest = undefined;
                                } else if (aCat[0]=='fbpage' ) {
                                    if (aParams[1005]==0 ) {
                                        GM_log('Skipping fbpage Invitation');
                                    } else {
                                        oRequest.Parms += "&actions[accept]=Ignore";
                                        oRequest.Parms += "&nctr[_mod]=fbpage_fan_confirm&lsd&post_form_id_source=AsyncRequest";
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    }
                                } else if (aCat[0]=='group' ) {
                                    if (aParams[1006]==0 ) {
                                        GM_log('Skipping Group Invitation');
                                    } else {
                                        oRequest.Parms += "&actions[accept]=Ignore";
                                        oRequest.Parms += "&lsd&post_form_id_source=AsyncRequest";
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    }
                                }
                                break;
                                // End read in general postings
                        }
                        // End Switch
                    }
                    // end loop

                    //GM_log('Step 4');

                    // find all GAME requests

                    oForms = getSnapshot(strConfirmBoxes3, oDOM);
                    if (oForms.snapshotLength == 0) {
 	                     //strConfirmBoxes3  = './/div[@class="UIImageBlock clearfix mbl pbs appRequestGroup"]//form';
						 strConfirmBoxes3    =   './/li[contains(@class,"uiListItem  uiListVerticalItemBorder")]//form',
                         oForms = getSnapshot(strConfirmBoxes3, oDOM);
					}

                    GM_log('oForms.snapshotLength = '+oForms.snapshotLength );

                    for(i=0; i < oForms.snapshotLength; i++) {

                        oForm                 =   oForms.snapshotItem(i);
                        oFormId               =   getSnapshot(strFormId,oForm).snapshotItem(0).id
                        aCat                  =   oFormId.split('_');

                        oFormInputs           =   getSnapshot(strFormInputs, oForm);
                        oRequest              =   new RequestItem();
                        oRequest.Gifttype     =   oFormId;
                        Giftname     =   getSnapshot(strFormBody, oForm);
	                    if (Giftname.snapshotLength != 0) {
						  oRequest.Giftname     =   Giftname.snapshotItem(0).innerHTML;
						}

						oRequest.RelAction = document.location.protocol+'//www.facebook.com' + oForm.action + '?__a=1';

                        iButtons = 0;
if (aCat[1] == '10979261223') {
                        for ( j=0; j<oFormInputs.snapshotLength; j++) {
                            oFormInput      =   oFormInputs.snapshotItem(j);

                            switch (oFormInput.type) {
                                case 'hidden':
                                    // grab the parameters need to action the item
                                    oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
                                    break;

                                case 'submit':
                                    // grab the name of what we are actioning, and the http action request
                                    iButtons += 1;
                                    if (oFormInput.name == 'actions[reject]') {
                                        oRequest.Reject     = "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
                                    } else {
                                        oRequest.Action     = "&"+oFormInput.name.slice(0,8)+encodeURIComponent(oFormInput.name.slice(8,-1))+oFormInput.name.slice(-1)+"="+encodeURI(oFormInput.value);
										//LogPush("&"+oFormInput.name.slice(0,8)+encodeURIComponent(oFormInput.name.slice(8,-1))+oFormInput.name.slice(-1)+"="+encodeURI(oFormInput.value));
										
                                    }
									break;
                            }
                        }
} else if ((aCat[1] == '102452128776') || (aCat[1] == '156383461049284')) {
   for ( j=0; j<oFormInputs.snapshotLength; j++) {
                            oFormInput      =   oFormInputs.snapshotItem(j);

                            switch (oFormInput.type) {
                                case 'hidden':
                                    // grab the parameters need to action the item
                                    //oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
                                    //break;

                                    switch (oFormInput.name) {
                                         case 'id':
											 oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value;
										     reqid = oFormInput.value;
										     break;
                                         case 'type':oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value); break;
                                          //case 'status_div_id':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                         case 'div_id':oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value); break;
                                         case 'params[from_id]':oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value); break;
                                         case 'params[app_id]':oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value); break;
                                        // case 'params[from_id]':oRequest.Parms += "&from_id="+oFormInput.value; break;
                                        // case 'params[app_id]':oRequest.Parms += "&app_id="+oFormInput.value; break;
                                         //case 'charset_test':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                         case 'post_form_id':oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value); break;
                                         case 'fb_dtsg':oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value); break;
                                     }
									 break;

                                case 'submit':
                                    // grab the name of what we are actioning, and the http action request
                                    iButtons += 1;
                                   // oRequest.Reject     = '&actions[reject]=';

                                    if (oFormInput.name == 'actions[reject]') {
                                        //oRequest.Reject     = "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
										oRequest.Reject     = '&actions[reject]=';
                                    } else if (oFormInput.name == 'actions[accept]') {
									     if (aCat[1] == '10979261223') oRequest.Action = '&actions[accept]=http://apps.facebook.com/inthemafia/?request_ids=' + reqid;
										 if (aCat[1] == '102452128776') oRequest.Action = '&actions[accept]=http://apps.facebook.com/onthefarm/?request_ids=' + reqid;
										 //if (aCat[1] == '102452128776') oRequest.Action = 'http://apps.facebook.com/onthefarm/?request_ids=' + reqid;
									     if (aCat[1] == '156383461049284') oRequest.Action = '&actions[accept]=http://apps.facebook.com/farmvillechinese/?request_ids=' + reqid;								
                                    } else {
                                         oRequest.Action = "&"+oFormInput.name.slice(0,8)+encodeURIComponent(oFormInput.name.slice(8,-1))+oFormInput.name.slice(-1)+"="+encodeURI(oFormInput.value);
										 oRequest.RelAction = oFormInput.name.slice(8,-1);
										//LogPush("&"+oFormInput.name.slice(0,8)+encodeURIComponent(oFormInput.name.slice(8,-1))+oFormInput.name.slice(-1)+"="+encodeURI(oFormInput.value));
									}


									/*
                                    if (oFormInput.name == 'actions[reject]') {
                                        oRequest.Reject     = '&actions[reject]=';
                                    } else {
                                        oRequest.Action     = '&actions[accept]=Accept';
                                    } */
                            }
                        }

} else {

                        for ( j=0; j<oFormInputs.snapshotLength; j++) {
                            oFormInput      =   oFormInputs.snapshotItem(j);

                            switch (oFormInput.type) {
                                case 'hidden':
                                    // grab the parameters need to action the item
                                    oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
                                    break;

                                case 'submit':
                                    // grab the name of what we are actioning, and the http action request
                                    iButtons += 1;
                                    if (oFormInput.name == 'actions[reject]') {
                                        oRequest.Reject     = "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
                                    } else {
                                        oRequest.Action     = "&"+oFormInput.name.slice(0,8)+encodeURIComponent(oFormInput.name.slice(8,-1))+oFormInput.name.slice(-1)+"="+encodeURI(oFormInput.value);
										//LogPush("&"+oFormInput.name.slice(0,8)+encodeURIComponent(oFormInput.name.slice(8,-1))+oFormInput.name.slice(-1)+"="+encodeURI(oFormInput.value));
										
                                    }
									break;
                            }
                        }

}

                        oRequest.Parms += '';
                        
                        if (aCat[1] == '10979261223') {
                        //GM_log('Mafia Wars Request - '+ aCat[1]);
							//LogPush(oRequest.Action);
                                //GM_log('Action = ' + oRequest.Action);
                                if ((oRequest.Action.indexOf('accept_energy_req') !=-1)) {

                                    if (aParams[2020] ==0) {
                                        //GM_log('Skipping Mafia Wars Accept Energy Request');
                                    } else if (aParams[2020] ==1) {
                                        GM_log('Ignoring Mafia Wars Accept Energy Request');
                                        oRequest.Parms += oRequest.Reject;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else {
										if (!timeLeftGM('MW_EnergyTimer')) {
                                        GM_log('Adding Mafia Wars Accept Energy Request');
                                        oRequest.Parms += oRequest.Action;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
										}
                                    }


                                } else if (oRequest.Action.indexOf('accept_') !=-1) {
                                        	oRequest.Parms += oRequest.Action;
                                        	oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        	oRequestList.Append(oRequest);
                                        	iRequestNum =   iRequestNum + 1;
                                
                                }

                            } else if ((aCat[1] == '102452128776') || (aCat[1] == '156383461049284')) {

								    if (oRequest.Action.indexOf('giftaccept') != -1 || oRequest.Giftname.indexOf('sending a gift back') != -1) {									
                                    if (aParams[3000]==0) {
                                        //GM_log('Skipping FarmVille Accept Gift Request');
                                    } else if (aParams[3000]==1) {
                                        GM_log('Ignoring FarmVille Accept Gift Request');
                                        oRequest.Parms += oRequest.Reject;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else {
                                        GM_log('Adding FarmVille Accept Gift Request x1');
                                        oRequest.Parms += oRequest.Action;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    }
                               //} else if ((oRequest.Action.indexOf('sendcredits')!=-1) || (oRequest.Action.indexOf('sendmats')!=-1) || (oRequest.Action.indexOf('inviteAnswered')!=-1)  || (oRequest.Action.indexOf('expand_accept')!=-1) || (oRequest.Action.indexOf('sendreqs')!=-1) || (oRequest.Action.indexOf('breeding')!=-1) || (oRequest.Action.indexOf('sendcollectible')!=-1)) {

								 } else if (oRequest.Giftname.indexOf('m playing in') != -1
									     || oRequest.Giftname.indexOf('m working on') != -1
									     || oRequest.Giftname.indexOf('m trying to') != -1
									     || oRequest.Giftname.indexOf('I need your help') != -1
									     || oRequest.Action.indexOf('sendcredits') != -1
									     || oRequest.Action.indexOf('sendmats') != -1
									     || oRequest.Action.indexOf('inviteAnswered') != -1
									     || oRequest.Action.indexOf('expand_accept') != -1
									     || oRequest.Action.indexOf('sendreqs') != -1
									     || oRequest.Action.indexOf('breeding') != -1
									     || oRequest.Action.indexOf('sendcollectible') != -1) {	
                                    if (aParams[3001]==0) {
                                        GM_log('Skipping FarmVille Send Gift Request');
                                    } else if (aParams[3001]==1) {
                                        GM_log('Ignoring FarmVille Send Gift Request');
                                        oRequest.Parms += oRequest.Reject;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else {
                                        GM_log('Adding FarmVille Send Gift Request');
                                        oRequest.Parms += oRequest.Action;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    }

                              }

                            } else {
                                if (aParams[4000]==0) {
                                    //GM_log('Skipping Other Request');
                                } else {
                                    GM_log('Ignoring Other Request');
                                    oRequest.Parms += oRequest.Reject;
                                    oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                    oRequestList.Append(oRequest);
                                    iRequestNum =   iRequestNum + 1;
                                }
                            }

                          }
                          // end loop

					GM_log('done: ' +iRequestNum);

					if (bAutoRun) {

						if (oRequestList.First != null) {
						    LogPush('<b>'+iRequestNum +' request(s) have been found and will be processed</b>');
						    setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[0]*750,aParams[0]*1250));
						} else {
							//LogPush('<b>No requests have been found.  Checking again in '+ aParams[1] +' minutes. </b>');
						    setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[1]*50000,aParams[1]*70000));
						}
					}

                  }
              } catch(err) {
                if (bAutoRun) {
                    LogPush('Error done: ' +iRequestNum);
                    LogPush('Error: Read FB Requests - '+err.message);
                    if (oRequestList.First != null) {
                        LogPush('<b>'+iRequestNum +' request(s) have been found and will be processed</b>');
                        setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[0]*750,aParams[0]*1250));
                    } else {
	                    LogPush('<b>No requests have been found.  Checking again in '+ aParams[1] +' minutes. </b>');
                        setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[1]*50000,aParams[1]*70000));
                    }
                  }
              }

          }
      });
    } else {
      GM_log('Read Request stopped');
    }
}

/****  Initialization Routine  ****/

function Initialize() {

    var oDom, oDiv, oButton, oText;

    var strGMList,strPara;
    var aTempPara = new Array();

    //Case Specific Initialization
    switch (strFrameId) {
        case 'MafiaWars':

        	// nothing in here right now.
            break;

        case 'FaceBook':

            // create lists
            oWallList       = new List(ReadWall);
            oRequestList    = new List(Read_FB_Requests);


            // Set up Event handling
            EventSpan = document.createElement('span');

            EventSpan.addEventListener("FBAA-ActionWall",       function(evt) {oWallList.Run()}, false);
            EventSpan.addEventListener("FBAA-ActionRequest",    function(evt) {oRequestList.Run()}, false);

            ActionWall      = document.createEvent("Events"); ActionWall.initEvent("FBAA-ActionWall", false, false);
            ActionRequest   = document.createEvent("Events"); ActionRequest.initEvent("FBAA-ActionRequest", false, false);

            //set Up Log File

            oLogDiv = document.createElement('div');
            oLogDiv.setAttribute('style',"width: 770px; height: 300px; overflow: auto; border: 1px solid rgb(204, 204, 204);padding-bottom: 2px;");

            oLogDiv.innerHTML = GM_getValue('LogDiv','');
            GM_setValue('LogDiv',oLogDiv.innerHTML);

            oLogDiv2 = document.createElement('div');
            oLogDiv2.setAttribute('style',"width: 770px; height: 300px; overflow: auto; border: 1px solid rgb(204, 204, 204);padding-bottom: 2px;");

            oLogDiv2.innerHTML = GM_getValue('LogDiv2','');
            GM_setValue('LogDiv2',oLogDiv2.innerHTML);

            //set the time for wall processing (go back 3 hours);
            //iNow = Math.floor(new Date().valueOf()/1000)-60*60*3;
            if (aParams[9703]==1)
	            iNow = Math.floor(new Date().valueOf()/1000)-60*60*3;
		    else
			    iNow = Math.floor(new Date().valueOf()/1000);

            //set up the FV Delay timer
            FV_accept_ignore = 0;

            // fb user id
            FB_user_id = getFBID();
            //juststart = 0;

			//if (FB_user_id.indexOf("{") == -1) {
            if (FB_user_id != 0) {
            GM_setValue('FB_user_id',FB_user_id);
			GM_log('FB_user_id = ' + FB_user_id); }

            //get Save Set
            strSaveSet = GM_getValue('FBAA-SaveSet','A');
            GM_setValue('FBAA-SaveSet',strSaveSet);

            //set up the group Names
            strGroups       =   '<option value="0">-</option>';
            getGroupNames();

            // start a routine to keep the xw_sig current
            xw_sig_valid = false;
            local_xw_user_id = '';

			if (FB_user_id==0) FB_user_id = getFBID();

            //get updated NW credentials
            FB_xw_sig_update();
            // refresh every 10 minutes
            iFB_XW_Timer = setInterval(FB_xw_sig_update, 600000 );
			// refresh every 60 minutes
            //iMW_XW_Timer = setInterval(RestartProcessing, 1800000 ); 
			//iMW_XW_Timer = setInterval(RestartProcessing, 600000 ); 
			//iMW_XW_Timer = setInterval(check, 7200000 ); 

            bAutoRun    = GM_getValue('bAutoRun',false);
            bShowLog    = GM_getValue('bShowLog',false);
            bShowLog2   = GM_getValue('bShowLog2',false);
            bShowDetail = GM_getValue('bShowDetail',false);

			FeeSPURL   = GM_getValue('FeeSPURL','');

            //check for old settings
            var keys = GM_listValues();
            for (var ID in keys) {
                if (keys[ID] == 'FBAA-Settings') {
                    GM_setValue('FBAA-Settings-'+strSaveSet,GM_getValue(keys[ID]));
                    GM_deleteValue(keys[ID]);
                }
            }

            //read running parameters
            strPara = GM_getValue('FBAA-Settings-'+strSaveSet,'{)');
            try {
                aParams.length = 0;
                //GM_log(strPara);
                eval('aParams = '+strPara);
               // GM_log(aParams[2005]);
            } catch (ierr) {
                aParams.length = 0;
                aParams = {};
                GM_setValue('FBAA-Settings-'+strSaveSet,'{}');
            }


			if (FB_user_id==0) 
			{ FB_user_id = getFBID();
			  //if (FB_user_id.indexOf("{") == -1) {
              //GM_setValue('FB_user_id',FB_user_id);
			  //GM_log('FB_user_id = ' + FB_user_id);
			  //}
			//} else {
			//	GM_setValue('FB_user_id',FB_user_id);.
			//	GM_log('FB_user_id = ' + FB_user_id);
			}


           if (aParams[2004] == undefined) aParams[2004] = true;
           if (aParams[2008] == undefined) aParams[2008] = true;
           if (aParams[2900] == undefined) aParams[2900] = true;
           if (aParams[2014] == undefined) aParams[2014] = true;
           if (aParams[2015] == undefined) aParams[2015] = true;
           if (aParams[2011] == undefined) aParams[2011] = true;
           if (aParams[2012] == undefined) aParams[2012] = true;
           if (aParams[2010] == undefined) aParams[2010] = true;
           if (aParams[7890] == undefined) aParams[7890] = true;
           if (aParams[7894] == undefined) aParams[7894] = true;
           if (aParams[7895] == undefined) aParams[7895] = true;
           if (aParams[7896] == undefined) aParams[7896] = true;
           if (aParams[7899] == undefined) aParams[7899] = true;
           if (aParams[7900] == undefined) aParams[7900] = false;
           if (aParams[7901] == undefined) aParams[7901] = false;
           if (aParams[7902] == undefined) aParams[7902] = true;
           if (aParams[7903] == undefined) aParams[7903] = true;
           if (aParams[7904] == undefined) aParams[7904] = true;
           if (aParams[7905] == undefined) aParams[7905] = true;
           if (aParams[7906] == undefined) aParams[7906] = true;
           if (aParams[2006] == undefined) aParams[2006] = false;
           if (aParams[2007] == undefined) aParams[2007] = false;

           if (aParams[2000] == undefined) aParams[2000] =2;
		   if (aParams[2024] == undefined) aParams[2024] =2;
		   if (aParams[2025] == undefined) aParams[2025] =2;
//		   if (aParams[2026] == undefined) aParams[2026] =2;
		   if (aParams[2028] == undefined) aParams[2028] =2;
		   if (aParams[2002] == undefined) aParams[2002] =3;
		   if (aParams[2003] == undefined) aParams[2003] =2;
		   if (aParams[2020] == undefined) aParams[2020] =2;
		   if (aParams[2029] == undefined) aParams[2029] =2;

            if (aParams[9001] == undefined) aParams[9001] ='';
            if (aParams[9002] == undefined) aParams[9002] ='';
            if (aParams[9003] == undefined) aParams[9003] ='';
            if (aParams[9004] == undefined) aParams[9004] ='';
            if (aParams[9005] == undefined) aParams[9005] ='';
			if (aParams[9006] == undefined) aParams[9006] ='';
			if (aParams[9007] == undefined) aParams[9007] ='';
			if (aParams[9008] == undefined) aParams[9008] ='';
			if (aParams[9009] == undefined) aParams[9009] ='';
			if (aParams[9010] == undefined) aParams[9010] ='';
			if (aParams[9011] == undefined) aParams[9011] ='';
			if (aParams[9012] == undefined) aParams[9012] ='';
			if (aParams[9013] == undefined) aParams[9013] ='';
			if (aParams[9014] == undefined) aParams[9014] ='';
			if (aParams[9015] == undefined) aParams[9015] ='';
			if (aParams[9016] == undefined) aParams[9016] ='';
			if (aParams[9017] == undefined) aParams[9017] ='';
			if (aParams[9018] == undefined) aParams[9018] ='';
			if (aParams[9019] == undefined) aParams[9019] ='';
			if (aParams[9020] == undefined) aParams[9020] ='';
			if (aParams[9021] == undefined) aParams[9021] ='';
			if (aParams[9022] == undefined) aParams[9022] ='';
			if (aParams[9023] == undefined) aParams[9023] ='';
			if (aParams[9024] == undefined) aParams[9024] ='';
			if (aParams[9025] == undefined) aParams[9025] ='';
			if (aParams[9026] == undefined) aParams[9026] ='';
			if (aParams[9027] == undefined) aParams[9027] ='';
			if (aParams[9028] == undefined) aParams[9028] ='';
			if (aParams[9029] == undefined) aParams[9029] ='';
			if (aParams[9030] == undefined) aParams[9030] ='';

			if (aParams[2562] == undefined) aParams[2562] =2;
			if (aParams[9051] == undefined) aParams[9051] ='1000';
			if (aParams[9052] == undefined) aParams[9052] ='1000';

           if (aParams[9999] == undefined) aParams[9999] = '';

            if (getHoursTime('MW_EnergyTimer') ==  undefined) setGMTime('MW_EnergyTimer', 0);

            if (getHoursTime('MW_MissionTimer') ==  undefined) setGMTime('MW_MissionTimer', 0);

            if (getHoursTime('MW_SlotsTimer') ==  undefined) setGMTime('MW_SlotsTimer', 0);
            if (getHoursTime('MW_icedbonustimer') ==  undefined) setGMTime('MW_icedbonustimer', 0);
            if (getHoursTime('MW_holidaybonustimer') ==  undefined) setGMTime('MW_holidaybonustimer', 0);
            if (getHoursTime('MW_challengetimer') ==  undefined) setGMTime('MW_challengetimer', 0);
            if (getHoursTime('MW_robsquadtimer') ==  undefined) setGMTime('MW_robsquadtimer', 0);
            if (getHoursTime('MW_fightboosttimer') ==  undefined) setGMTime('MW_fightboosttimer', 0);
            if (getHoursTime('MW_2XLootTimer') ==  undefined) setGMTime('MW_2XLootTimer', 0);
            if (getHoursTime('MW_HelpGiftTimer') ==  undefined) setGMTime('MW_HelpGiftTimer', 0);
            if (getHoursTime('MW_levelupbonustimer') ==  undefined) setGMTime('MW_levelupbonustimer', 0);
            if (getHoursTime('MW_dtv3timer') ==  undefined) setGMTime('MW_dtv3timer', 0);
            if (getHoursTime('MW_EventTimer') ==  undefined) setGMTime('MW_EventTimer', 0);
            if (getHoursTime('MW_getparttimer') ==  undefined) setGMTime('MW_getparttimer', 0);
            if (getHoursTime('MW_masterytimer') ==  undefined) setGMTime('MW_masterytimer', 0);
			if (getHoursTime('MW_bossfightv2timer') ==  undefined) setGMTime('MW_bossfightv2timer', 0);
            if (getHoursTime('MW_eventwalltimer') ==  undefined) setGMTime('MW_eventwalltimer', 0);
            if (getHoursTime('MW_FeeSPTimer') ==  undefined) setGMTime('MW_FeeSPTimer', 0);

            if (getHoursTime('MW_lootdropeventtimer') ==  undefined) setGMTime('MW_lootdropeventtimer', 0);
			if (getHoursTime('MW_NeedHelp_NYTimer') ==  undefined) setGMTime('MW_NeedHelp_NYTimer', 0);
			if (getHoursTime('MW_NeedHelp_BangkokTimer') ==  undefined) setGMTime('MW_NeedHelp_BangkokTimer', 0);
			if (getHoursTime('MW_NeedHelp_VegasTimer') ==  undefined) setGMTime('MW_NeedHelp_VegasTimer', 0);
			if (getHoursTime('MW_NeedHelp_ItalyTimer') ==  undefined) setGMTime('MW_NeedHelp_ItalyTimer', 0);
			if (getHoursTime('MW_NeedHelp_BrazilTimer') ==  undefined) setGMTime('MW_NeedHelp_BrazilTimer', 0);
			if (getHoursTime('MW_NeedHelp_ChicagoTimer') ==  undefined) setGMTime('MW_NeedHelp_ChicagoTimer', 0);
			if (getHoursTime('MMW_NeedHelp_LondonTimer') ==  undefined) setGMTime('MW_NeedHelp_LondonTimer', 0);
			if (getHoursTime('MW_bossbonustimer') ==  undefined) setGMTime('MW_bossbonustimer', 0);
			if (getHoursTime('MW_freegifttimer') ==  undefined) setGMTime('MW_freegifttimer', 0);
			if (getHoursTime('MW_missionrewardtimer') ==  undefined) setGMTime('MW_missionrewardtimer', 0);
			if (getHoursTime('MW_fighteventtimer') ==  undefined) setGMTime('MW_fighteventtimer', 0);

			if (getHoursTime('MW_PSpecialTimer') ==  undefined) setGMTime('MW_PSpecialTimer', 0);
			if (getHoursTime('MW_S_GunTimer') ==  undefined) setGMTime('MW_S_GunTimer', 0);
			if (getHoursTime('MW_SSportsBarTimer') ==  undefined) setGMTime('MW_SSportsBarTimer', 0);
			if (getHoursTime('MW_SportsbarTimer') ==  undefined) setGMTime('MW_SportsbarTimer', 0);
			if (getHoursTime('MW_3SpinTimer') ==  undefined) setGMTime('MW_3SpinTimer', 0);
			if (getHoursTime('MW_EbonusTimer') ==  undefined) setGMTime('MW_EbonusTimer', 0);
			if (getHoursTime('MW_PVegasTimer') ==  undefined) setGMTime('MW_PVegasTimer', 0);
			if (getHoursTime('MW_PItalyTimer') ==  undefined) setGMTime('MW_PItalyTimer', 0);
			if (getHoursTime('MW_PBrazilTimer') ==  undefined) setGMTime('MW_PBrazilTimer', 0);
			if (getHoursTime('MW_PChicagoTimer') ==  undefined) setGMTime('MW_PChicagoTimer', 0);
			if (getHoursTime('MW_PLondonimer') ==  undefined) setGMTime('MW_PLondonTimer', 0);
			if (getHoursTime('MW_astimer') ==  undefined) setGMTime('MW_astimer', 0);

            // Auto Health selection
			if (aParams[2570] == undefined || aParams[2570] ==false) aParams[2570] = 0;
            if (aParams[2571] == undefined) aParams[2571] = 0;
			if (aParams[2572] == undefined || aParams[2572] ==false) aParams[2572] = 0;

            // fix Mission selection
            if (aParams[2021] == undefined) aParams[2021] =5;
			if (aParams[2561] == undefined || aParams[2561] ==false) aParams[2561] =0;

            // add the FV special parameters is needed.
            if (aParams["FV_MasteryFriendRewad"] == undefined) {
                aParams = {0:5,1:30,2:5,3:10,4:100,5:5,6:30,1000:0,1001:0,1002:0,1003:0,1004:0,1005:0,1006:0,2000:0,2001:0,2002:1,2003:0,3000:0,3001:0,3002:1,3003:0,3004:0,3005:1,4000:0};
                aParams["FV_MasteryFriendRewad"] = false;
                aParams["FV_HorseStableFriendReward"] = false;
                aParams["FV_FuelDiscoveryFriendReward"] = false;
                aParams["FV_FertilizeThankFriendReward"] = false;
                aParams["FV_SocialMissionShareBonusFriendReward"] = false;
                aParams["FV_StorageExpansionFriendReward"] = false;
                aParams["FV_WanderingStallionFriendReward"] = false;
                aParams["FV_AchievementFriendReward"] = false;
                aParams["FV_TuscanWeddingRedeemFriendReward"] = false;
                aParams["FV_TuscanWeddingFriendReward"] = false;
                aParams["FV_FlowerFriendReward"] = false;
                aParams["FV_BushelFriendReward"] = false;
                aParams["FV_StallThankYouFriendReward"] = false;
                aParams["FV_lonely_cow"] = false;
                aParams["FV_FoalFriendReward"] = false;
                aParams["FV_NurseryBuildingFriendReward"] = false;
                aParams["FV_EggFriendReward"] = false;
                aParams["FV_CollectionsFriendReward"] = false;
                aParams["FV_ConstructionBuildingFriendReward"] = false;
            }

            GM_setValue('bAutoRun',bAutoRun);
            GM_getValue('bShowLog',bShowLog);
            GM_getValue('bShowLog2',bShowLog2);
            GM_getValue('bShowDetail',bShowDetail);

            GM_getValue('FeeSPURL','');

            if (bAutoRun) setTimeout(function (e) { StartProcessing();}, 30000);

//click_ClearLog();

            //setup display
            createDisplay();
            break;
    }
}

/**** Create Auto Accept Display  ****/
function createDisplay() {

    var oDom, oDom1, oDom2;
    var oDiv, oDiv1, oDiv2, oTable, oTr, oTh, oTd, oForm, oInput, oImg, oH, oP, oUl;
    var oHeader;

    oDom  = document.getElementById('contentCol');

    if (document.getElementById(strFBAutoAccept)) {
	    // skip UI is already in place
	    return
	} else if (document.getElementById('editProfileForm')) {
	    // don't show the UI on the edit profile form
	    return
    } else if (document.getElementById('pagelet_search_header')) {
	    // don't show the UI on the search page.
	    return
    } else if (document.getElementById('pagelet_header_personal')) {
	    // don't show the UI on the personal page.
	    return
    } else if (document.getElementById('pagelet_groups')) {
	    // don't show the UI on the Groups page.
	    return
    } else if ((document.getElementById('pagelet_friends'))&&(!document.getElementById('pagelet_requests'))) {
	    // don't show the UI on the friends page.
	    return
    } else if (document.getElementById('editFriendsHeader')) {
	    // don't show the UI on the friends header page.
	    return
    } else if (oDom) {
	    // adjust the group display header hight
	    if (document.getElementById('pagelet_group_header')!= null) {
	    	document.getElementById('pagelet_group_header').setAttribute('style','margin-top:25px; padding-bottom:5px')
    	}
	    // put the display on any page that uses the column format
        GM_log('create Display');
        oHeader = document.createElement('div');
        oHeader.setAttribute('style','padding-left: 15px; padding-right: 15px;');
        oHeader.id = strFBAutoAccept;
        oDom.insertBefore(oHeader,oDom.firstChild);

        // create Title
        oDiv = document.createElement('div');
        oDiv.setAttribute('class',"uiHeader uiHeader uiHeaderPage ptm pbl");
            oDiv1 = document.createElement('div');
            oDiv1.setAttribute('class',"clearfix uiHeaderTop");
            oDiv1.setAttribute('style','height: 10px;');
                oDiv2 = document.createElement('div');
                oDiv2.setAttribute('class',"lfloat");
                    oH = document.createElement('h2');
                    oH.setAttribute('class',"uiHeaderTitle");
                    oH.appendChild(document.createTextNode(" [NONE &2&3] Mafia Wars and FarmVille Wall Processor"));
                oDiv2.appendChild(oH);
            oDiv1.appendChild(oDiv2);
        oDiv.appendChild(oDiv1);
        oHeader.appendChild(oDiv);

        //Create Buttons for Header
        oDiv = document.createElement('div');
        oDiv.setAttribute('style',"border-bottom: 1px solid rgb(204, 204, 204); padding-bottom:2px");
            oTable = document.createElement('table');
                oTbody = document.createElement('tbody');
                    oTr = document.createElement('tr');
                        oTd = document.createElement('td');
                        oTd.setAttribute('width',"160px");
                            oFont = document.createElement('font');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 12px; font-weight: normal;");
                            oFont.appendChild(document.createTextNode("Process: "));
                                oSpan = document.createElement('span');
                                oSpan.id = strAutoOn;
                                oSpan.addEventListener("click", click_AutoRun(1), false);
                                if (bAutoRun)
                                    oSpan.innerHTML= '<b>On</b>'
                                else
                                    oSpan.innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>On</a> </font>';
                            oFont.appendChild(oSpan);
                            oFont.appendChild(document.createTextNode(" / "));
                                oSpan = document.createElement('span');
                                oSpan.id = strAutoOff;
                                oSpan.addEventListener("click", click_AutoRun(0), false);
                                if (!bAutoRun)
                                    oSpan.innerHTML= '<b>Off</b>'
                                else
                                    oSpan.innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Off</a> </font>';

                            oFont.appendChild(oSpan);
                        oTd.appendChild(oFont);
                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute('width',"160px");
                            oFont = document.createElement('font');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 12px; font-weight: normal;");
                            oFont.appendChild(document.createTextNode("Log: "));
                                oSpan = document.createElement('span');
                                oSpan.id = strLogShow;
                                oSpan.addEventListener("click", click_ShowLog(1), false);
                                if (bShowLog)
                                    oSpan.innerHTML= '<b>Show</b>'
                                else
                                    oSpan.innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Show</a> </font>';
                            oFont.appendChild(oSpan);
                            oFont.appendChild(document.createTextNode("/"));
                                oSpan = document.createElement('span');
                                oSpan.id = strLogHide;
                                oSpan.addEventListener("click", click_ShowLog(0), false);
                                if (!bShowLog)
                                    oSpan.innerHTML= '<b>Hide</b>'
                                else
                                    oSpan.innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Hide</a> </font>';
                            oFont.appendChild(oSpan);
                        oTd.appendChild(oFont);

                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute('width',"160px");
                            oFont = document.createElement('font');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 12px; font-weight: normal;");
                            oFont.appendChild(document.createTextNode("Log2: "));
                                oSpan = document.createElement('span');
                                oSpan.id = strLogShow2;
                                oSpan.addEventListener("click", click_ShowLog2(1), false);
                                if (bShowLog2)
                                    oSpan.innerHTML= '<b>Show</b>'
                                else
                                    oSpan.innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Show</a> </font>';
                            oFont.appendChild(oSpan);
                            oFont.appendChild(document.createTextNode("/"));
                                oSpan = document.createElement('span');
                                oSpan.id = strLogHide2;
                                oSpan.addEventListener("click", click_ShowLog2(0), false);
                                if (!bShowLog2)
                                    oSpan.innerHTML= '<b>Hide</b>'
                                else
                                    oSpan.innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Hide</a> </font>';
                            oFont.appendChild(oSpan);
                        oTd.appendChild(oFont);


                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute('width',"160px");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="color: rgb(59, 89, 152); font-size: 12px; font-weight: normal; cursor: pointer;"><a>Settings</a></font>';
                            oSpan.addEventListener("click",  click_ShowSetting(), false);
                        oTd.appendChild(oSpan);

                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
						oTd.setAttribute("style","width:60px;text-align:center;") ;
                            oFont = document.createElement('font');
							oFont.setAttribute('id','user_health');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 11px; font-weight: normal;");
                            oFont.innerHTML = '<font style="color: rgb(0, 0, 255); font-size: 11px; font-weight: normal; cursor: pointer;"><B>Health</B> </font>';
                        oTd.appendChild(oFont);

                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute("style","width:60px;text-align:center;") ;
                            oFont = document.createElement('font');
							oFont.setAttribute('id','user_energy');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 11px; font-weight: normal;");
                            oFont.innerHTML = '<font style="color: rgb(0, 0, 255); font-size: 11px; font-weight: normal; cursor: pointer;"><B>Energy</B> </font>';
                        oTd.appendChild(oFont);

                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute("style","width:60px;text-align:center;") ;
                            oFont = document.createElement('font');
							oFont.setAttribute('id','user_stamina');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 11px; font-weight: normal;");
                            oFont.innerHTML = '<font style="color: rgb(0, 0, 255); font-size: 11px; font-weight: normal; cursor: pointer;"><B>Stamina</B> </font>';
                        oTd.appendChild(oFont);
                    oTr.appendChild(oTd);

                        oTd = document.createElement('td');
                        oTd.setAttribute("style","width:60px;text-align:center;") ;
                            oFont = document.createElement('font');
							oFont.setAttribute('id','user_oper');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 11px; font-weight: normal;");
                            oFont.innerHTML = '<font style="color: rgb(0, 0, 255); font-size: 11px; font-weight: normal; cursor: pointer;"><B>Bosses</B> </font>';
                        oTd.appendChild(oFont);
                    oTr.appendChild(oTd);

/*
                        oTd = document.createElement('td');
                        oTd.setAttribute('width',"120px");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="color: rgb(59, 89, 152); font-size: 11px; font-weight: normal; cursor: pointer;"><a>Check Updates</a></font>';
                            oSpan.addEventListener("click",  function() { updateCheck(true);}, false);
                        oTd.appendChild(oSpan);
                    oTr.appendChild(oTd);
*/
                        oTd = document.createElement('td');
                            oFont = document.createElement('font');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 11px; font-weight: normal;");
                            oFont.appendChild(document.createTextNode("Version: "+script_version));
                        oTd.appendChild(oFont);
                    oTr.appendChild(oTd);
                oTbody.appendChild(oTr);
            oTable.appendChild(oTbody);
        oDiv.appendChild(oTable);
        oHeader.appendChild(oDiv);


        // Add Settings Floating Window
        oDom = document.createElement('div');
        oDom.id = strFBAASettings;
        oDom.setAttribute('style',"display:none; -moz-border-radius: 10px; border: 5px solid rgb(104, 104, 104); padding: 5px; overflow: auto; margin-top: -30px; margin-left: 20px; background-color: white; width: 600px; height: 420px; position: absolute; z-index: 100;");
            oDiv = document.createElement('div');
                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                //oTable.setAttribute('style','border-bottom:1px solid black');
                    oTbody = document.createElement('tbody');
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.innerHTML = '<div><h1 class="uiHeaderTitle">FBAA - Settings</h1></div>';
                            oTh.setAttribute('style',"padding-bottom: 10px;");
                            oTh.setAttribute('colspan',"2");
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.innerHTML = 'Catagory';
                            oTh.setAttribute('width',"110");
                            oTh.setAttribute('Style',"border-bottom: 1px solid rgb(204, 204, 204)");
                        oTr.appendChild(oTh);
                            oTh = document.createElement('th');
                            oTh.innerHTML = 'Settings';
                            oTh.setAttribute('Style',"border-bottom: 1px solid rgb(204, 204, 204)");
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTd = document.createElement('td');
                                oDiv1 = document.createElement('div');
                                oDiv1.setAttribute('style','border: 0px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 110px; height: 320px;');
                                    oUl = document.createElement('ul');
                                    oUl.setAttribute('class',"uiSideNav");
                                    oUl.appendChild(addMenu("General",0));
                                    oUl.appendChild(addMenu("FaceBook", 1));
                                    oUl.appendChild(addMenu("Mafia Wars", 2));
									oUl.appendChild(addMenu("Mafia Wall", 5));
									oUl.appendChild(addMenu("Operation", 6));
                                    oUl.appendChild(addMenu("FarmVille", 3));
                                    oUl.appendChild(addMenu("Others", 4));
                                oDiv1.appendChild(oUl);
                            oTd.appendChild(oDiv1);
                        oTr.appendChild(oTd);
                            oTd = document.createElement('td');
                                oTd.appendChild(CreateGeneralTab(0));
                                oTd.appendChild(CreateFaceBookTab(1));
                                oTd.appendChild(CreateMafiaWarsTab(2));
                                oTd.appendChild(CreateMafiaWallTab(5));
								oTd.appendChild(CreateMafiaOperTab(6));
                                oTd.appendChild(CreateFarmVilleTab(3));
                                oTd.appendChild(CreateOtherTab(4));

                                //GM_log('oTd.innerHTML = '+oTd.innerHTML );
                        oTr.appendChild(oTd);
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);
           oDiv.appendChild(oTable);
        oDom.appendChild(oDiv);
           oDiv = document.createElement('div');
                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                    oTbody = document.createElement('tbody');
                        oTr = document.createElement('tr');
                            oTd = document.createElement('td');
                            oTd.setAttribute('width',"150");
                        oTr.appendChild(oTd);
                            oTd = document.createElement('td');
                            oTd.setAttribute('width',"220");
                            oTd.setAttribute('style','text-align:center');
                                oSpan = document.createElement('span');
                                oSpan.addEventListener("click", click_CloseSettings(0), false);

                                    oFont = document.createElement('font');
                                    oFont.setAttribute('style',' font-size: 13px; color: rgb(59, 89, 152); cursor: pointer;');
                                    oFont.innerHTML = '<a>Accept Changes</a>';
                                oSpan.appendChild(oFont);
                            oTd.appendChild(oSpan);
                        oTr.appendChild(oTd);
                            oTd = document.createElement('td');
                            oTd.setAttribute('style','text-align:center');
                                oSpan = document.createElement('span');
                                oSpan.addEventListener("click", click_CloseSettings(1), false);
                                    oFont = document.createElement('font');
                                    oFont.setAttribute('style',' font-size: 13px; color: rgb(59, 89, 152); cursor: pointer;');
                                    oFont.innerHTML = '<a>Cancel</a>';
                                oSpan.appendChild(oFont);
                            oTd.appendChild(oSpan);
                        oTr.appendChild(oTd);
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);
            oDiv.appendChild(oTable);
        oDom.appendChild(oDiv);
        oHeader.appendChild(oDom);



        //Create Log Window
        oDom = document.createElement('div');
        //oDom.setAttribute('style','display: ;');
		oDom.setAttribute('style',"BACKGROUND-COLOR:#e8e8e8; border-bottom: 1px solid rgb(96, 96, 96); padding-bottom:2px");
        oDom.id = strFBAALog;

                oTable = document.createElement('table');
                oTbody = document.createElement('tbody');
                    oTr = document.createElement('tr');
                    oTr.setAttribute('style','BACKGROUND-COLOR:#000000;');
                        oTd = document.createElement('td');
                        oTd.setAttribute('style',"width: 150px; text-align: center;");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="font-size: 12px; font-weight: normal; cursor: pointer;"><a><font color="#FFFF00"><B>Show</B> AllTimer</font></a></font>';
                            oSpan.addEventListener("click",  function() { ShowTimer(true);}, false);
                        oTd.appendChild(oSpan);

                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
						oTd.setAttribute('style',"width: 150px; text-align: center;");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="font-size: 12px; font-weight: normal; cursor: pointer;"><a><font color="#FFFF00"><B><font color="red">Reset</font></B> JobTimer</a></font>';
                            oSpan.addEventListener("click",  function() { ResetJobTimer(true);}, false);
                        oTd.appendChild(oSpan);

                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute('style',"width: 150px; text-align: center;");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="font-size: 12px; font-weight: normal; cursor: pointer;"><a><font color="#FFFF00"><B><font color="red">Reset</font></B> AcceptTimer</font></a></font>';
                            oSpan.addEventListener("click",  function() { ResetAcceptTimer(true);}, false);
                        oTd.appendChild(oSpan);

                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute('style',"width: 150px; text-align: center;");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="font-size: 12px; font-weight: normal; cursor: pointer;"><a><font color="#FFFF00"><B><font color="red">Reset</font></B> SendTimer</font></a></font>';
                            oSpan.addEventListener("click",  function() { ResetSendTimer(true);}, false);
                        oTd.appendChild(oSpan);

                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute('style',"width: 150px; text-align: center;");
                            oFont = document.createElement('font');
                            oFont.setAttribute('style',"color: rgb(255, 255, 255); font-size: 12px; font-weight: normal;");
                            oFont.appendChild(document.createTextNode("Debug: "));
                                oSpan = document.createElement('span');
                                oSpan.id = strDetailShow;
                                oSpan.addEventListener("click", click_ShowDetail(1), false);
                                if (bShowDetail)
                                    oSpan.innerHTML= '<b>Show</b>'
                                else
                                    oSpan.innerHTML= '<a><font style="color: rgb(255, 255, 0); cursor: pointer;"> Show </font></a>';
                            oFont.appendChild(oSpan);
                            oFont.appendChild(document.createTextNode(" / "));
                                oSpan = document.createElement('span');
                                oSpan.id = strDetailHide;
                                oSpan.addEventListener("click", click_ShowDetail(0), false);
                                if (!bShowDetail)
                                    oSpan.innerHTML= '<b>Hide</b>'
                                else
                                    oSpan.innerHTML= '<a><font style="color: rgb(255, 255, 0); cursor: pointer;"> Hide </font></a>';
                            oFont.appendChild(oSpan);
                        oTd.appendChild(oFont);



                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
						    oTd.setAttribute('style',"width: 100px; text-align: right;");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="font-size: 13px; font-weight: normal; cursor: pointer;"><a><font color="#FFFFFF"><B>Clear Log</B></font></a></font>';
                            oSpan.addEventListener("click",  function() { click_ClearLog();}, false);
                        oTd.appendChild(oSpan);

                    oTr.appendChild(oTd);

                oTbody.appendChild(oTr);
            oTable.appendChild(oTbody);
          oDom.appendChild(oTable);
            oDiv = document.createElement('div');
            oDiv.setAttribute('style',"width: 770px; height: 300px; overflow: auto; border: 1px solid rgb(96, 96, 96);padding-bottom: 2px;");
        oDom.appendChild(oDiv);


        oHeader.appendChild(oDom);

        oDom.replaceChild(oLogDiv,oDiv);
        if (bShowLog)
            oLogDiv.parentNode.style.display = "";
        else
            oLogDiv.parentNode.style.display = "none";



    }

//---
       //Create Log Window2
        oDom = document.createElement('div');
        //oDom.setAttribute('style','display: ;');
		oDom.setAttribute('style',"BACKGROUND-COLOR:#e8e8e8; border-bottom: 1px solid rgb(96, 96, 96); padding-bottom:2px");
        oDom.id = strFBAALog2;

                oTable = document.createElement('table');
                oTbody = document.createElement('tbody');
                    oTr = document.createElement('tr');
                    oTr.setAttribute('style','BACKGROUND-COLOR:#FFFFFF;');
                        oTd = document.createElement('td');
						    oTd.setAttribute('style',"width: 770px; text-align: right;");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="font-size: 13px; font-weight: normal; cursor: pointer;"><a><B>Clear Log2</B></a></font>';
                            oSpan.addEventListener("click",  function() { click_ClearLog2();}, false);
                        oTd.appendChild(oSpan);

                    oTr.appendChild(oTd);

                oTbody.appendChild(oTr);
            oTable.appendChild(oTbody);
          oDom.appendChild(oTable);
            oDiv = document.createElement('div');
            oDiv.setAttribute('style',"width: 770px; height: 300px; overflow: auto; border: 1px solid rgb(96, 96, 96);padding-bottom: 2px;");
        oDom.appendChild(oDiv);
        oHeader.appendChild(oDom);

        oDom.replaceChild(oLogDiv2,oDiv);
        if (bShowLog2)
            oLogDiv2.parentNode.style.display = "";
        else
            oLogDiv2.parentNode.style.display = "none"; 

//--


    function addMenu( _text, _index) {
        var oLi, oSpan, oImg, oButton, oTxt;

        oLi = document.createElement('li')
        oLi.setAttribute('id',strFBAASetTabs+_index);
        if (_index==0)
            oLi.setAttribute('class','selected')
        else
            oLi.setAttribute('class','');

            oButton = document.createElement('a');
            oButton.setAttribute('class','item');
                oSpan = document.createElement('span');
                oSpan.setAttribute('class','imgWrap');
                    oImg = document.createElement('img');
                    oImg.setAttribute('class','img');
                    oImg.setAttribute('src',imgCatagory[_index]);
                oSpan.appendChild(oImg);
            oButton.appendChild(oSpan);
                oTxt = document.createTextNode(_text)
            oButton.appendChild(oTxt);
            oButton.addEventListener("click", click_ShowSettingsTab(_index), false);
        oLi.appendChild(oButton);

        return oLi;
    }

    function createtextarea(_oTr, _iPar, _strName) {
        var oTd;

        oTd = document.createElement('td');
        oTd.setAttribute('style',"width: 100px; text-align: right;");
        oTd.textContent = _strName+":";

        _oTr.appendChild(oTd);

        oTd = document.createElement('td');
        oTd.setAttribute('style',"width: 100px;");
            oSelect = document.createElement('input');
            oSelect.name = "FBAA-Para-"+ _iPar;

        oTd.appendChild(oSelect);
        _oTr.appendChild(oTd);

    }

    function createCheckBox(_oTr, _iPar,_strName) {
        var oTd, oInput, oText;

        oTd = document.createElement('td');
            oInput = document.createElement('input');
            oInput.name = "FBAA-Para-"+_iPar;
            oInput.type = "checkbox";
            oInput.checked = false;
        oTd.appendChild(oInput);
            oText = document.createTextNode(_strName);
        oTd.appendChild(oText);
        _oTr.appendChild(oTd);
    }

    function createCheckBoxList(_oTr,_oList) {
        var oUl, oLi, oTd, oInput, oText, oFont, oButton, oSpan, oBr;
        var aNames;

        oTd = document.createElement('td');
          oTd.setAttribute('colspan','2');
              oUl = document.createElement('ul');
              oUl.setAttribute('style','border: 1px solid rgb(204, 204, 204); height: 88px; list-style: none outside none; overflow: auto;');

              for (var ID in _oList ) {
                      oLi = document.createElement('li');
                          oInput = document.createElement('input');
                          oInput.name   = "FBAA-Para-"+ID;
                          oInput.id   = "FBAA-Para-"+ID;
                          oInput.type   = "checkbox";
                          oInput.checked  = false;
                      oLi.appendChild(oInput);
                          oText = document.createTextNode(_oList[ID].text);
                      oLi.appendChild(oText);
                  oUl.appendChild(oLi);
              }

          oTd.appendChild(oUl);
        _oTr.appendChild(oTd);
          oTd = document.createElement('td');
          oTd.setAttribute('style','padding-left: 10px;');
            oFont = document.createElement('font');
            oFont.setAttribute('style','font-size: 13px; font-weight: normal; cursor: pointer;');
              oSpan = document.createElement('span');
              oSpan.innerHTML = 'Accept All';
              oSpan.addEventListener("click", click_List_Accept_all(_oList), false);
            oFont.appendChild(oSpan);
          oTd.appendChild(oFont);
            oBr = document.createElement('br');
          oTd.appendChild(oBr);
            oBr = document.createElement('br');
          oTd.appendChild(oBr);
            oFont = document.createElement('font');
            oFont.setAttribute('style','font-size: 13px; font-weight: normal; cursor: pointer;');
              oSpan = document.createElement('span');
              oSpan.innerHTML = 'Cancel All';
              oSpan.addEventListener("click", click_List_Cancel_all(_oList), false);
            oFont.appendChild(oSpan);
          oTd.appendChild(oFont);
       _oTr.appendChild(oTd);

    }

function createCheckBoxList2(_oTr,_oList) {
        var oUl, oLi, oTd, oInput, oText, oFont, oButton, oSpan, oBr;
        var aNames;

        oTd = document.createElement('td');
          oTd.setAttribute('colspan','2');
              oUl = document.createElement('ul');
              oUl.setAttribute('style','border: 1px solid rgb(204, 204, 204); height: 220px; list-style: none outside none; overflow: auto;');

              for (var ID in _oList ) {
                      oLi = document.createElement('li');
                          oInput = document.createElement('input');
                          oInput.name   = "FBAA-Para-"+ ID;
                          oInput.id   = "FBAA-Para-"+ ID;
                          oInput.type   = "checkbox";
                          oInput.checked  = false;
                      oLi.appendChild(oInput);
                          oText = document.createTextNode(_oList[ID].text);
                      oLi.appendChild(oText);
                  oUl.appendChild(oLi);
              }

          oTd.appendChild(oUl);
        _oTr.appendChild(oTd);
          oTd = document.createElement('td');
          oTd.setAttribute('style','padding-left: 10px;');
            oFont = document.createElement('font');
            oFont.setAttribute('style','font-size: 13px; font-weight: normal; cursor: pointer;');
              oSpan = document.createElement('span');
              oSpan.innerHTML = 'Accept All';
              oSpan.addEventListener("click", click_List_Accept_all(_oList), false);
            oFont.appendChild(oSpan);
          oTd.appendChild(oFont);
            oBr = document.createElement('br');
          oTd.appendChild(oBr);
            oBr = document.createElement('br');
          oTd.appendChild(oBr);
            oFont = document.createElement('font');
            oFont.setAttribute('style','font-size: 13px; font-weight: normal; cursor: pointer;');
              oSpan = document.createElement('span');
              oSpan.innerHTML = 'Cancel All';
              oSpan.addEventListener("click", click_List_Cancel_all(_oList), false);
            oFont.appendChild(oSpan);
          oTd.appendChild(oFont);
       _oTr.appendChild(oTd);

    }

    function createDropDownList(_oTr, _iPar,_strName, _strOptions, _strValues) {
        var oTd, oSelect, oOption;
        var aOptions = new Array();
        var aValues = new Array();

        aOptions = _strOptions.split(';');
        aValues = _strValues.split(';');

        oTd = document.createElement('td');
        oTd.setAttribute('style',"width: 100px; text-align: right;");
        oTd.textContent = _strName+":";

        _oTr.appendChild(oTd);

        oTd = document.createElement('td');
        oTd.setAttribute('style',"width: 100px;");
            oSelect = document.createElement('select');
            oSelect.name = "FBAA-Para-"+_iPar;
            oSelect.setAttribute('style',"width: 100px;");
                for (var i=0;i<aOptions.length;i++) {
                    oOption = document.createElement('option');
                    oOption.value = aValues[i];
                    oOption.textContent = aOptions[i];
                    oSelect.appendChild(oOption);
                }
        oTd.appendChild(oSelect);
        _oTr.appendChild(oTd);
    }

    function CreateGeneralTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd, oHr ;
        oDom = document.createElement('div');
        if (_id==0)
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;');

        oDom.id = strFBAASetDivs+_id;
            oForm = document.createElement('form');
                oForm.name = 'FBAA-Form'+_id;

                // create layout;
                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                    oTbody = document.createElement('tbody');
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Request Timer";
	                           	oHr = document.createElement('hr');
	                        oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    //oTbody.appendChild(oTr);
                    //    oTr = document.createElement('tr');
                    //    createDropDownList(oTr, 0,'Processing Interval','1 seconds;2 seconds;3 seconds;4 seconds;5 seconds;6 seconds;7 seconds;8 seconds;9 seconds;10 seconds;20 seconds','1;2;3;4;5;6;7;8;9;10;20');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 1,'Cycle Period','DISABLE; 1 minute;5 minutes;15 mintues;30 minutes;1 hour;3 hours;6 hours;12 hours;1 day','0;1;5;15;30;60;180;360;720;1440');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Wall Notification Timer";
	                           	oHr = document.createElement('hr');
	                        oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    //oTbody.appendChild(oTr);
                    //    oTr = document.createElement('tr');
                    //    createDropDownList(oTr, 2,'Processing Interval','No Delay; 1 second;2 seconds;3 seconds;4 seconds;5 seconds;6 seconds;7 seconds;8 seconds;9 seconds;10 seconds','0;1;2;3;4;5;6;7;8;9;10');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 3,'Cycle Period','DISABLE;5 seconds;10 seconds;15 seconds;20 seconds;25 seconds;30 seconds','0;5;10;15;20;25;30');
/*                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Mafia Wars Crime Spree Timer";
	                           	oHr = document.createElement('hr');
	                        oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 5,'Processing Interval','1 seconds;2 seconds;3 seconds;4 seconds;5 seconds;6 seconds;7 seconds;8 seconds;9 seconds;10 seconds','1;2;3;4;5;6;7;8;9;10');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 6,'Cycle Period','DISABLE; 1 minute;5 minutes;15 mintues;30 minutes;1 hour;3 hours;6 hours;12 hours;1 day','0;1;5;15;30;60;180;360;720;1440'); */
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Log Length";
	                           	oHr = document.createElement('hr');
	                        oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 4,'Log Length','25 items; 50 items; 100 items; 150 items; 200 items; 400 items; 800 items; 1600 items; 3200 items','25;50;100;150;200;400;800;1600;3200');
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody)
             oForm.appendChild(oTable)
         oDom.appendChild(oForm);

        return oDom;
    }

    function CreateFaceBookTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd, oHr ;
        oDom = document.createElement('div');
        if (_id==0)
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;');

        oDom.id = strFBAASetDivs+_id;
            oForm = document.createElement('form');
                oForm.name = 'FBAA-Form'+_id;

                // create layout;
                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                    oTbody = document.createElement('tbody');
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Friends";
	                           	oHr = document.createElement('hr');
	                        oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 1000,'Suggestions','Confirm;Ignore;Do Nothing','2;1;0');
                            oTd = document.createElement('td');
                            oTd.setAttribute('style',"width: 120px; text-align: right;");
                            oTd.textContent = "Add to List:";
                        oTr.appendChild(oTd);
                            oTd = document.createElement('td');
                            oTd.setAttribute('style',"width: 120px;");
                                oSelect = document.createElement('select');
                                oSelect.name = "FBAA-Para-1001";
                                oSelect.setAttribute('style',"width: 120px;");
                                oSelect.innnerHTML = strGroups;
                            oTd.appendChild(oSelect);
                        oTr.appendChild(oTd);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 1002,'Invitation','Confirm;Ignore;Do Nothing','2;1;0');
                            oTd = document.createElement('td');
                            oTd.setAttribute('style',"width: 120px; text-align: right;");
                            oTd.textContent = "Add to List:";
                        oTr.appendChild(oTd);
                            oTd = document.createElement('td');
                            oTd.setAttribute('style',"width: 120px;");
                                oSelect = document.createElement('select');
                                oSelect.name = "FBAA-Para-1003";
                                oSelect.setAttribute('style',"width: 120px;");
                                oSelect.innnerHTML = strGroups;
                            oTd.appendChild(oSelect);
                        oTr.appendChild(oTd);
                    oTbody.appendChild(oTr);
                            oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Other";
	                           	oHr = document.createElement('hr');
	                        oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 1004,'Event Invitations','Remove;Do Nothing','1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 1005,'Page Suggestions','Ignore;Do Nothing','1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 1006,'Group Invitations','Ignore;Do Nothing','1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Other Request Settings";
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 4000,'Everyting','Ignore;Do Nothing','1;0');
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody)
             oForm.appendChild(oTable)
         oDom.appendChild(oForm);

        return oDom;
    }

    function CreateMafiaWarsTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd, oHr ;
        oDom = document.createElement('div');
        if (_id==0)
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;');

        oDom.id = strFBAASetDivs+_id;
            oForm = document.createElement('form');
                oForm.name = 'FBAA-Form'+_id;

                // create layout;

                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                    oTbody = document.createElement('tbody');
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Request Settings";
	                           	oHr = document.createElement('hr');
	                        oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                   oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2003,'Join','Confirm;Ignore;Do Nothing','2;1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2020,'Accept Energy','Confirm;Ignore;Do Nothing','2;1;0');

                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Auto Health Settings";
                        oTr.appendChild(oTh);

                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2570,'Auto Health','Yes;No','1;0');
                        createtextarea(oTr, 2571, 'Bellow');

                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2572,'Hide in Hospital','Yes;No','1;0');


                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Manual URL Click (Click 10 Times)";
                        oTr.appendChild(oTh);

                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                         createtextarea(oTr, 9999, 'URL');
                       
                    oTbody.appendChild(oTr);

//                    oTbody.appendChild(oTr);
//                        oTr = document.createElement('tr');
//                        createDropDownList(oTr, 2001,'Send Gifts','Confirm;Ignore;Do Nothing','2;1;0');
/*
                    oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                        oTh = document.createElement('th');
                        oTh.setAttribute('style',"");
                        oTh.setAttribute('colspan',"4");
                        oTh.textContent = "Accept Gifts Settings";
                    oHr = document.createElement('hr');
                        oTh.appendChild(oHr);
                       oTr.appendChild(oTh);
                   	oTbody.appendChild(oTr);

                    oTr = document.createElement('tr');
                        createDropDownList(oTr, 2000,'Accept Gifts(Include the following)','Confirm;Ignore;Do Nothing','2;1;0');
                    oTbody.appendChild(oTr);

                    oTr = document.createElement('tr');
                        createDropDownList(oTr, 2025,'SecretDrop','Confirm-NoLimit;Confirm-Limit;Ignore;Do Nothing','3;2;1;0');
                        createDropDownList(oTr, 2024,'Hollow Warriors','Confirm-NoLimit;Confirm-Limit;Ignore;Do Nothing','3;2;1;0');
                    oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                        createDropDownList(oTr, 2562,'2X Boost','Confirm-NoLimit;Confirm-Limit;Ignore;Do Nothing','3;2;1;0');
                        createDropDownList(oTr, 2028,'MysteryShipment','Confirm-NoLimit;Confirm-Limit;Ignore;Do Nothing','3;2;1;0');
                    oTbody.appendChild(oTr);

                    oTr = document.createElement('tr');
                        createDropDownList(oTr, 2032,'Special Part','Confirm-NoLimit;Confirm-Limit;Ignore;Do Nothing','3;2;1;0');
                        createDropDownList(oTr, 2033,'Exotic Animal Feed','Confirm-NoLimit;Confirm-Limit;Ignore;Do Nothing','3;2;1;0');
                    oTbody.appendChild(oTr);

                    oTr = document.createElement('tr');
                        createDropDownList(oTr, 2034,'Italian Hardwood (Italy)','Confirm-NoLimit;Confirm-Limit;Ignore;Do Nothing','3;2;1;0');
                        createDropDownList(oTr, 2035,'Marble Slab (Italy)','Confirm-NoLimit;Confirm-Limit;Ignore;Do Nothing','3;2;1;0');
                    oTbody.appendChild(oTr);

                    oTr = document.createElement('tr');
                        createDropDownList(oTr, 2029,'Mystery Boost Pack','Confirm-NoLimit;Confirm-Limit;Ignore;Do Nothing','3;2;1;0');
                        createDropDownList(oTr, 2030,'Stamina Pack','Confirm-NoLimit;Confirm-Limit;Ignore;Do Nothing','3;2;1;0');
                    oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                        createDropDownList(oTr, 2031,'Construction Worker (Brazil)','Confirm-NoLimit;Confirm-Limit;Ignore;Do Nothing','3;2;1;0');
                    oTbody.appendChild(oTr);
*/
                oTable.appendChild(oTbody);
            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    }

    function CreateMafiaWallTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd ;
        oDom = document.createElement('div');
        if (_id==0)
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;');

        oDom.id = strFBAASetDivs+_id;
            oForm = document.createElement('form');
                oForm.name = 'FBAA-Form' + _id;

                // create layout;

                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                    oTbody = document.createElement('tbody');

                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Wall Settings";
                        oTr.appendChild(oTh);

                   	oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                        createDropDownList(oTr, 9701,'Wall Reading','All (Include TinyURL);Mafia Wars','1;0');
						createDropDownList(oTr, 9702,'Send Back','Yes;No','1;0');

                   	oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                        createDropDownList(oTr, 9703,'Read Old Feed','Yes;No','1;0');

                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "General Settings";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,MW_general);
                    oTbody.appendChild(oTr);
                    oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "War Rewards to Collect";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,MW_WarList);

                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "Daily Take Rewards to Collect";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,MW_DailyTake);

                    oTbody.appendChild(oTr);

                oTable.appendChild(oTbody);
            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    }



function CreateMafiaOperTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd ;
        oDom = document.createElement('div');
        if (_id==0)
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;');

        oDom.id = strFBAASetDivs+_id;
            oForm = document.createElement('form');
                oForm.name = 'FBAA-Form' + _id;

                // create layout;

                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');

                    oTbody = document.createElement('tbody');

                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Mission Settings (Request and Wall)";
                        oTr.appendChild(oTh);

                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2021,'Accept Mission','Confirm-Friend;Confirm-R;Confirm-W;Confirm-RW;Ignore;Do Nothing','5;4;3;2;1;0');
                        createDropDownList(oTr, 2023,'Type','Energy;Stamina;Both','energy;stamina;both');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        //createDropDownList(oTr, 2026,'Max Open Slots','1;2;3;4;5;6;7','2;3;4;5;6;7;8');
                        createDropDownList(oTr, 2561,'Auto Switch','Yes;No','1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createtextarea(oTr, 9051, 'Min Energy');
                        createtextarea(oTr, 9052, 'Min Stamina');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "Secret Missions";
                        oTr.appendChild(oTh);
                        createCheckBoxList2(oTr,MW_SecretMissions);
                        oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);
            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    }

    function CreateFarmVilleTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd ;
        oDom = document.createElement('div');
        if (_id==0)
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;');

        oDom.id = strFBAASetDivs+_id;
            oForm = document.createElement('form');
                oForm.name = 'FBAA-Form'+_id;

                // create layout;
                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                    oTbody = document.createElement('tbody');
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Wall Settings";
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);
                       oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "General Settings";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,FV_general);
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);

            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    }

    function CreateOtherTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd ;
        oDom = document.createElement('div');
        if (_id==0)
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 480px; height: 320px;');

        oDom.id = strFBAASetDivs+_id;
            oForm = document.createElement('form');
                oForm.name = 'FBAA-Form' + _id;

                // create layout;
                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                    oTbody = document.createElement('tbody');
/*                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Request Settings";
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 4000,'Everyting','Ignore;Do Nothing','1;0');
                    oTbody.appendChild(oTr);
*/
					oTr = document.createElement('tr');
							oTh = document.createElement('th');
							oTh.setAttribute('style',"");
							oTh.setAttribute('colspan',"4");
							oTh.textContent = "Friend's Name or ID (For Supply Part and Join Operation)";
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createtextarea(oTr, 9001, 'Friend 1');
                        createtextarea(oTr, 9002, 'Friend 2');
                    oTbody.appendChild(oTr);
                       oTr = document.createElement('tr');
                        createtextarea(oTr, 9003, 'Friend 3');
                        createtextarea(oTr, 9004, 'Friend 4');
                    oTbody.appendChild(oTr);
                       oTr = document.createElement('tr');
                        createtextarea(oTr, 9005, 'Friend 5');
                        createtextarea(oTr, 9006, 'Friend 6');
                    oTbody.appendChild(oTr);
                       oTr = document.createElement('tr');
                        createtextarea(oTr, 9007, 'Friend 7');
                        createtextarea(oTr, 9008, 'Friend 8');
                    oTbody.appendChild(oTr);
                       oTr = document.createElement('tr');
                        createtextarea(oTr, 9009, 'Friend 9');
                        createtextarea(oTr, 9010, 'Friend 10');
                    oTbody.appendChild(oTr);
                oTr = document.createElement('tr');
                        createtextarea(oTr, 9011, 'Friend 11');
                        createtextarea(oTr, 9012, 'Friend 12');
                    oTbody.appendChild(oTr);
                oTr = document.createElement('tr');
                        createtextarea(oTr, 9013, 'Friend 13');
                        createtextarea(oTr, 9014, 'Friend 14');
                    oTbody.appendChild(oTr);
                oTr = document.createElement('tr');
                        createtextarea(oTr, 9015, 'Friend 15');
                        createtextarea(oTr, 9016, 'Friend 16');
                    oTbody.appendChild(oTr);
                oTr = document.createElement('tr');
                        createtextarea(oTr, 9017, 'Friend 17');
                        createtextarea(oTr, 9018, 'Friend 18');
                    oTbody.appendChild(oTr);
                oTr = document.createElement('tr');
                        createtextarea(oTr, 9019, 'Friend 19');
                        createtextarea(oTr, 9020, 'Friend 20');
                    oTbody.appendChild(oTr);
                oTr = document.createElement('tr');
                        createtextarea(oTr, 9021, 'Friend 21');
                        createtextarea(oTr, 9022, 'Friend 22');
                    oTbody.appendChild(oTr);
                oTr = document.createElement('tr');
                        createtextarea(oTr, 9023, 'Friend 23');
                        createtextarea(oTr, 9024, 'Friend 24');
                    oTbody.appendChild(oTr);
                oTr = document.createElement('tr');
                        createtextarea(oTr, 9025, 'Friend 25');
                        createtextarea(oTr, 9026, 'Friend 26');
                    oTbody.appendChild(oTr);
                oTr = document.createElement('tr');
                        createtextarea(oTr, 9027, 'Friend 27');
                        createtextarea(oTr, 9028, 'Friend 28');
                    oTbody.appendChild(oTr);
                oTr = document.createElement('tr');
                        createtextarea(oTr, 9029, 'Friend 29');
                        createtextarea(oTr, 9030, 'Friend 30');
                    oTbody.appendChild(oTr);

                oTable.appendChild(oTbody);

            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    }

}

function LogPush(_strTemp) {
    var oDiv;

    oDiv = document.createElement('div');
    oDiv.setAttribute('style','padding-bottom: 4px');
    oDiv.innerHTML = getCalendarDate()+', '+getClockTime()+': '+_strTemp;

    oLogDiv.insertBefore(oDiv,oLogDiv.firstChild);

    while (oLogDiv.childNodes.length>aParams[4]) {
        //GM_log('removing node');
        oLogDiv.removeChild(oLogDiv.lastChild);
    }

    GM_setValue('LogDiv',oLogDiv.innerHTML);
}

function LogPush2(_strTemp) {
    var oDiv;

    oDiv = document.createElement('div');
    oDiv.setAttribute('style','padding-bottom: 4px');
    oDiv.innerHTML = getCalendarDate()+', '+getClockTime()+': '+_strTemp;

    oLogDiv2.insertBefore(oDiv,oLogDiv2.firstChild);

    while (oLogDiv2.childNodes.length>aParams[4]) {
        //GM_log('removing node');
        oLogDiv2.removeChild(oLogDiv2.lastChild);
    }

    GM_setValue('LogDiv2',oLogDiv2.innerHTML);
}

/**** Main Loop ****/

function MainLoop(){

    if (!bInitialized) {
        if (document.getElementById('login_form')==null) {

            // start things up once they are logged into facebook;
            bInitialized = true;
            Initialize();
        }
    } else {

	    // get the facebook SVN_rev number
	    gvar.svn_rev = getSVNRev();

        if (document.getElementById('login_form')!=null) {
            // they've logged out of facebook
            StopProcessing();
            bInitialized = false;
        } else if (document.getElementById('contentCol') != null ) {
            createDisplay();
        } else {
            GM_log('Ignore this Window');
        }
    }
}

/**** DOM Notify and Change Code ****/

function notifyChange() {
    if (notify_count == change_count) MainLoop();
    if (notify_count != change_count) {
        schedNotify();
        return;
    }
    scheduled = false;
}

function schedNotify() {
    scheduled = true;
    notify_count = change_count;
    iOnloadEvent = setTimeout(function (e) {
        notifyChange();
    },
    250);
}


/**** Start Main Code ****/

// FB and MW Detection
// We are only worried about the URL detection because of the excludes
if (self.location.href.indexOf('www.facebook.com')!=-1) {
    strFrameId  = 'FaceBook';
    RemoveRight();
} else {
    strFrameId  = 'MafiaWars';
}

bInitialized = false;

// add event listners for load and unload

if ( strFrameId == "FaceBook") {

    document.addEventListener("DOMNodeInserted", function (e) {
        change_count++;
        if (!scheduled && change_count > 2 ) schedNotify();
    },
    false);

    window.addEventListener("unload", function (e) {
        try {
            bAutoRun = false;
            //clearTimeout(iRequestCurrent);
            //clearTimeout(iWallCurrent);
            clearTimeout(iMW_XW_Timer);
            clearTimeout(iFB_XW_Timer);
			GM_log('Scripts are unloading.  Frame = '+strFrameId);
        } catch(_errObj) {
            LogPush('Something bad has happend - '+_errObj.message);
        }
    },
    false);
} else {

    // for MW window when it opens

    Initialize();
}

/****  xw_sig Update Routines  ****/

function FB_xw_sig_update(_val) {
  function doStep1(_myUrl, _myParms) {
    GM_log('FB_xw_sig_update: do Step 1');

   GM_xmlhttpRequest({
      method: 'GET',
      url: _myUrl,
      headers: {
        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5',
        'Content-Type':    'application/x-www-form-urlencoded; charset=UTF-8',
        'X-SVN-Rev':        gvar.svn_rev
      },
      onload: function(_responseDetails) {
        try {
		  if (_responseDetails.status != 200) throw {message:'Status 200 error'}

          var i1, i2, i3, i4, i1b, i1c, i1d, strTemp;
          var myUrl, myParms;

/*
          strTemp = _responseDetails.responseText;

          		strTemp = strTemp.replace(/\\u00253A/g,":");
		        strTemp = strTemp.replace(/\\u00252F/g,'/');
		        strTemp = strTemp.replace(/\\u00253F/g,"?");
		        strTemp = strTemp.replace(/\\u00253D/g,"=");
		        strTemp = strTemp.replace(/\\u002526/g,"&");

		        strTemp = strTemp.replace(/\\u003c/g,"<");
				strTemp = strTemp.replace(/\\/g,"");
*/

          strTemp = _responseDetails.responseText;

   if (strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb/?zy_link=appage"') != -1)
	   EnableScript = false;

   if (EnableScript) {

          i1 = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
          i1b = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');

          i1c = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
          i1d = strTemp.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'); 

       if (i1>=0){
          i1 = strTemp.indexOf('{',i1);
          i2 = strTemp.indexOf(');</script>',i1); 
          eval('strTemp = '+strTemp.slice(i1,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content;
       } else if (i1c>=0){
          i1c = strTemp.indexOf('{',i1c);
          i2 = strTemp.indexOf(');</script>',i1c);
          eval('strTemp = '+strTemp.slice(i1c,i2));
          strTemp = strTemp.content.pagelet_iframe_canvas_content; 
       } else if (i1b>=0) {
 	      i1b = strTemp.indexOf('{',i1b);
 	      i2 = strTemp.indexOf(');</script>',i1b);
 	      eval('strTemp = '+strTemp.slice(i1b,i2));
 	      strTemp = strTemp.content.pagelet_fbml_canvas_content;
       } else if (i1d>=0){
          i1d = strTemp.indexOf('{',i1d);
          i2 = strTemp.indexOf(');</script>',i1d);
          eval('strTemp = '+strTemp.slice(i1d,i2));
          strTemp = strTemp.content.pagelet_fbml_canvas_content; 
       } 
   }
          i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb/?zy_link=appage"');
	      if (i1 == -1) i1 = strTemp.indexOf('<form action="https://facebook.mafiawars.zynga.com/mwfb/?zy_link=appage"');
          if (i1 == -1) throw {message:'Cannot find form action='}

          //extract MW protected form
          i1 = strTemp.indexOf('<form action=',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
    
          //find URL
          i1 = strTemp.indexOf('"')+1;
          i2 = strTemp.indexOf('"',i1);
          myUrl = strTemp.slice(i1,i2);
		  myUrl = myUrl.replace(/\\/g,'');
    
          myParms = '';
          i1 = strTemp.indexOf('<input');
          while (i1!=-1) {
            if (myParms!='') myParms += '&'
            i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
            myParms += strTemp.slice(i1,i2)+'='
            i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
            myParms += escape(strTemp.slice(i1,i2));
            i1 = strTemp.indexOf('<input',i1);
          }

          //GM_log('myUrl = '+myUrl);
          //GM_log('myParms = '+myParms);

          doStep2(myUrl,myParms);
        } catch(err) {
          LogPush('Error FB_xw_sig_update: do Step 1 - '+err.message);
          LogPush('Cannot Update Mafia Wars credentials 1<br>Attempting again in 5 minutes');
		  //setTimeout("document.location.reload()",10000);
          //xw_sig_valid        = false;
          local_xw_time       = 0;
        }
      }
    });
  }

  function doStep2(_myUrl, _myParms) {
    //GM_Log('FB_xw_sig_update - _myUrl=' + _myUrl + ', _myParms=' + _myParms);
    GM_xmlhttpRequest({
      method: 'POST',
      url:  _myUrl, data: _myParms,
      headers: {
        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5',
        'Content-Type':    'application/x-www-form-urlencoded; charset=UTF-8',
        'X-SVN-Rev':        gvar.svn_rev
      },
      onload: function(_responseDetails) {
        try {       
          if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};

          var i1, i2, strTemp;          

          strTemp = _responseDetails.responseText;
		  //if (MW_Param=0) 
		  MW_Param = _myParms;

                        i1 = strTemp.indexOf('action="');
                        if (i1 == -1) throw { message: "Cannot find form action= in page"}
                            // extract URL
                            i1 += 8;
                            i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);

                            myParms = '';
                            i1 = strTemp.indexOf('<input',i1);
                            while (i1!=-1) {
                                i1 = strTemp.indexOf('name="',i1)+6;
                                i2 = strTemp.indexOf('"',i1);
                                if (myParms=='')
                                    myParms = strTemp.slice(i1,i2)+'='
                                else
                                    myParms += '&'+strTemp.slice(i1,i2)+'=';
                                i1 = strTemp.indexOf('value="',i1)+7;
                                i2 = strTemp.indexOf('"',i1);
                                myParms += escape(strTemp.slice(i1,i2));

                                i1 = strTemp.indexOf('<input',i1); 
                            } 
							doStep3(myUrl,myParms);
        
        } catch(err) {
                    LogPush('Error FB_xw_sig_update: doStep2 - '+err.message);
                    LogPush('doStep2-Cannot Update Mafia Wars credentials 3<br>Attempting again in 5 minutes');
                    //xw_sig_valid        = false;
                    local_xw_time       = 0;
					//setTimeout(FB_xw_sig_update,30000);
        }
      }
    });
  }

    function doStep3(_myUrl, _myParms) {
        GM_log('FB_xw_sig_update: do Step 3');
        //GM_log('FB_xw_sig_update - _myUrl=' + _myUrl + ', _myParms=' + _myParms);
        GM_xmlhttpRequest({
            method: 'POST',
            url:  _myUrl,
            data: _myParms,
            headers: {
        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5',
        'Content-Type':    'application/x-www-form-urlencoded; charset=UTF-8',
        'X-SVN-Rev':        gvar.svn_rev
            },
            onload: function(_responseDetails) {
                try {

                    var i1, i2, strTemp, myUrl, fam;

                    //if (_responseDetails.status != 200) throw	{message:'FB_xw_sig_update: doStep3 - Error loading FB/Mafia Wars Page'}

                        strTemp = _responseDetails.responseText;

                        local_xw_time  = getCurrentTime();

                        i1 = strTemp.indexOf("var local_xw_sig = '");					
						if (i1 == -1) throw { message: "Not Find var local_xw_sig = "}

                        if (i1 != -1) {
                            i2 = strTemp.indexOf("';",i1);
                            local_xw_sig        = strTemp.slice(i1+20,i2);
                            //local_xw_time       = getCurrentTime();
                            xw_sig_valid        = true;

                            // Extract 'sf_xw_user_id' at the same time

                            i1 = strTemp.indexOf('sf_xw_user_id=');
                            if (i1 != -1) {
                                i2 = strTemp.indexOf('&',i1);
                                local_xw_user_id = strTemp.slice(i1+14,i2)
                            }

                       if (family=='') {
                            i1  =   strTemp.indexOf('<div class="family_progress">');
                            if (i1 != -1) {
                                i2      =   strTemp.indexOf('<a',i1);
								family = strTemp.slice(i1+29,i2);
								if (family.indexOf('[NONE') == -1 && family.indexOf('FUN') == -1)  LogPush2('Yor Are NOT [NONE &2&3] Family ....'); 
                            }
					   }

                            //i1 = strTemp.indexOf("ztrack_count', '");
                            //if (i1!=-1) {
                            //    i2 = strTemp.indexOf("',",i1);
                            //    FB_user_id = strTemp.slice(i1+16,i2)							
                            //}

                            if (FB_user_id==0)
                            { FB_user_id = getFBID();
							  LogPush('FB_user_id = ' + FB_user_id);
                            }                           

                            i1  =   strTemp.indexOf('<span id="user_health">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_health = strTemp.slice(i1+23,i2);
                            } 
							else user_health = '';

                            i1  =   strTemp.indexOf('<span id="user_energy">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_energy = strTemp.slice(i1+23,i2);
                            }
							else user_energy = '';

                            i1  =   strTemp.indexOf('<span id="user_stamina">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_stamina = strTemp.slice(i1+24,i2);
                            }
							else user_stamina = '';

                            i1  =   strTemp.indexOf('<span id="exp_to_next_level');
                            if (i1!=-1) {
								i1      =   strTemp.indexOf('">',i1);								
                                i2      =   strTemp.indexOf('</span>',i1);
                                exp_to_next_level = strTemp.slice(i1+2,i2);
                            }
							else exp_to_next_level = '';

                            i1  =   strTemp.indexOf("user_fields['user_socialmissions'] =");
                            if (i1!=-1) {
								i1      =   strTemp.indexOf('parseInt("',i1);								
                                i2      =   strTemp.indexOf('")',i1);
                                boss_fights = strTemp.slice(i1+10,i2);
                            }
							else boss_fights = 0;

                            GM_log('local_xw_sig = ' + local_xw_sig+', local_xw_user_id = ' + local_xw_user_id+', local_xw_time = ' + local_xw_time);

                            //LogPush('Mafia Wars credentials have been successfully renewed');

if (bShowDetail) {
LogPush('<B><Font Color="blue"><B>Health:</B> ' + user_health + ',&nbsp;&nbsp;<B>Energy:</B> '
+ user_energy + ',&nbsp;<B>Stamina:</B> ' + user_stamina + ',&nbsp;<B>Exp Next Level:</B> ' + exp_to_next_level 
+ '</Font>');
}

if (document.getElementById("user_health") != null)
	document.getElementById('user_health').innerHTML= '<Font Color="blue"><B>Health</B></font><BR>' + user_health;
if (document.getElementById("user_energy") != null)
	document.getElementById('user_energy').innerHTML= '<Font Color="blue"><B>Energy</B></font><BR>' + user_energy;
if (document.getElementById("user_stamina") != null)
	document.getElementById('user_stamina').innerHTML= '<Font Color="blue"><B>Stamina</B></font><BR>' + user_stamina;

	
// 	         myUrl = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=Epicclanboss&xw_action=list_view';
 	         myUrl = document.location.protocol+'//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=Epicclanboss&xw_action=list_view';
             doStep4(myUrl,_myParms);

                    }
                } catch(err) {
                    LogPush('Error FB_xw_sig_update: do Step 3 - ' + err.message);
                    LogPush('Cannot Update Mafia Wars credentials 4<br>Attempting again in 5 minutes');
                    //xw_sig_valid        = false;
                    local_xw_time       = 0;
                }
            }
        });
    }


  function doStep4(_myUrl, _myParms) {
    GM_log('FB_xw_sig_update: do Step 4');
    GM_xmlhttpRequest({
      method: 'GET',
      url: _myUrl,
      headers: {
        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5',
        'Content-Type':    'application/x-www-form-urlencoded; charset=UTF-8',
        'X-SVN-Rev':        gvar.svn_rev
      },
      onload: function(_responseDetails) {
        try {
		  if (_responseDetails.status != 200) throw {message:'Status 200 error'}

          var i1, i2, i3, i4, i1b, i1c, i1d, strTemp;
          var myUrl, myParms;

          strTemp = _responseDetails.responseText;

			i1      =   strTemp.indexOf('BOSS FIGHTS (');								
			if (i1 != -1) {
            i2      =   strTemp.indexOf('")',i1);
            user_socialmissions = parseInt(strTemp.slice(i1+21,i2));
            }
			else user_socialmissions = 0;


			i1      =   strTemp.indexOf('MY OPERATIONS (',i1);								
			if (i1 != -1) {
            i2      =   strTemp.indexOf('")',i1);
            my_operations = parseInt(strTemp.slice(i1+15,i2));
            }
			else my_operations = 0;


         // i1  =   strTemp.indexOf("user_fields['user_socialmissions'] =");
         // if (i1!=-1) {
			i1      =   strTemp.indexOf('MY MAFIA OPERATIONS (',i1);								
			if (i1 != -1) {
            i2      =   strTemp.indexOf('")',i1);
            user_socialmissions = parseInt(strTemp.slice(i1+21,i2));
            }
			else user_socialmissions = 0;


if (document.getElementById("user_oper") != null)
	document.getElementById('user_oper').innerHTML= '<Font Color="blue"><B>Bosses</B></font><BR>' + boss_fights + ' / ' + my_operations + ' / ' + user_socialmissions;


if (aParams[2561]==1) {
  if (user_stamina > parseInt(aParams[9052]) && aParams[2561]==1) { 
	  aParams[2023] ='stamina';
	  if (aParams[2021] ==0) aParams[2021] =5;
	  }
  if (user_energy  > parseInt(aParams[9051]) && aParams[2561]==1) {
	  aParams[2023] ='energy'; 
	  if (aParams[2021] ==0 || aParams[2021] ==5) aParams[2021] =2;
	  }
  if (user_socialmissions < 3 && aParams[2561]==1) aParams[2021] =2;
  if (user_socialmissions > 8 && aParams[2561]==1) aParams[2021] =5;
  if (user_energy < parseInt(aParams[9051]) && user_stamina < parseInt(aParams[9052]) && aParams[2561]==1) 
     { aParams[2021] =0; }
  if (user_energy > parseInt(aParams[9051]) && user_stamina > parseInt(aParams[9052]) && aParams[2561]==1) 
  { aParams[2021] =2; aParams[2023] ='both'; }
}
             if (juststart == 0) {
 	         myUrl = document.location.protocol+'//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view';
             doStep5(myUrl,_myParms);
             }

        } catch(err) {
          LogPush('Error FB_xw_sig_update: do Step 5 - '+err.message);
          LogPush('Cannot Update Mafia Wars credentials 1<br>Attempting again in 5 minutes');
          //xw_sig_valid        = false;
          local_xw_time       = 0;
        }
      }
    });
  }

  function doStep5(_myUrl, _myParms) {
    GM_log('FB_xw_sig_update: do Step 5');
    GM_xmlhttpRequest({
      method: 'GET',
      url: _myUrl,
      headers: {
        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5',
        'Content-Type':    'application/x-www-form-urlencoded; charset=UTF-8',
        'X-SVN-Rev':        gvar.svn_rev
      },
      onload: function(_responseDetails) {
        try {
		  if (_responseDetails.status != 200) throw {message:'Status 200 error'}

          var i1, i2, i3, i4, ia, id, ih, ie, is, strTemp;
          var myUrl, myParms;

          strTemp = _responseDetails.responseText;
			i1      =   strTemp.indexOf('Share your profile');

			if (i1 != -1) {
			i3      =   strTemp.indexOf('Attack:',i1);
            i3      =   strTemp.indexOf('<td>',i3);
            i2      =   strTemp.indexOf('&nbsp;',i3);
			if (i2 == -1) i2 = strTemp.indexOf('</td>',i3);
			ia = strTemp.slice(i3+7,i2);

			i3      =   strTemp.indexOf('Defense:',i1);
            i3      =   strTemp.indexOf('<td>',i3);
            i2      =   strTemp.indexOf('&nbsp;',i3);
			if (i2 == -1) i2 = strTemp.indexOf('</td>',i3);
			id = strTemp.slice(i3+8,i2);

			i3      =   strTemp.indexOf('Health:',i1);
            i3      =   strTemp.indexOf('<td>',i3);
            i2      =   strTemp.indexOf('&nbsp;',i3);
			if (i2 == -1) i2 = strTemp.indexOf('</td>',i3);
			ih = strTemp.slice(i3+7,i2);

			i3      =   strTemp.indexOf('Energy:',i1);
            i3      =   strTemp.indexOf('<td>',i3);
            i2      =   strTemp.indexOf('&nbsp;',i3);
			if (i2 == -1) i2 = strTemp.indexOf('</td>',i3);
			ie = strTemp.slice(i3+7,i2);

			i3      =   strTemp.indexOf('Stamina:',i1);
            i3      =   strTemp.indexOf('<td>',i3);
            i2      =   strTemp.indexOf('&nbsp;',i3);
			if (i2 == -1) i2 = strTemp.indexOf('</td>',i3);
			is = strTemp.slice(i3+8,i2);


			if (juststart == 0) {
			  LogPush2('Family:' + family + ', Attack:' + ia + ', Defense:' + id + ', Health:' + ih + ', Energy:' + ie + ', Stamina: ' + is); 
			  juststart = 1;
			}
			
            }


        } catch(err) {
          LogPush('Error FB_xw_sig_update: do Step 6 - '+err.message);
          LogPush('Cannot Update Mafia Wars credentials 1<br>Attempting again in 5 minutes');
          //xw_sig_valid        = false;
          local_xw_time       = 0;
        }
      }
    });
  }


    // doStep1 and doStep2 will get a brand new set ofcredentials

    function doDone() {
        // in FF this is empty.

    }

    GM_log('FF UPDATE - xw_sig_update');
    var myUrl, myParms;

    // check the age of the xw_sig

        myUrl       = document.location.protocol+'//apps.facebook.com/inthemafia/?zy_link=appage';
        myParms     = '';
        //LogPush('<strong>Mafia Wars credentials are out of date.  Attempting to refresh</strong>');
        GM_log('FB_xw_sig_update: Attempting to get a new set of MW Credentials');
        doStep1(myUrl, myParms);

}


/**** Utility functions ****/
/******************************** DATE/TIME ********************************/
// reads a date string from a stored GM value and converts it to seconds since 1970
function getGMTime(GMvalue) {
  var tempVal = GM_getValue(GMvalue, 0);
  var d = Date.parse(tempVal);
  if(!d) {
    setGMTime(GMvalue,"00:00:30"); // problem with timer, set to 30 seconds
    var tempVal = GM_getValue(GMvalue, 0);
    var d = Date.parse(tempVal);
  }
  return d/1000;
}

/******************************** DATE/TIME ********************************/
// reads a date string from a stored GM value and converts it to seconds since 1970
function getGMTime(GMvalue) {
  var tempVal = GM_getValue(GMvalue, 0);
  var d = Date.parse(tempVal);
  if(!d) {
    setGMTime(GMvalue,"00:00:30"); // problem with timer, set to 30 seconds
    var tempVal = GM_getValue(GMvalue, 0);
    var d = Date.parse(tempVal);
  }
  return d/1000;
}

// takes a string input in the form of a countdown 'MM:SS', 'HH:MM:SS', 'MM minutes and SS seconds' and stores the
// time when the countdown is zero in a GM value.  Also takes an input of 'now' and stores the current time.
function setGMTime(GMvalue, countdownStr) {
  var d = new Date();
  d.setMilliseconds(0);
  if (countdownStr != 'now') d.setTime(d.getTime()+(timeLeft(countdownStr)*1000));
  GM_setValue(GMvalue, d.toString());
}

// returns the number of seconds left until a date stored in a GM value
function timeLeftGM(GMvalue) {
  var timeToCompare = getGMTime(GMvalue);
  var d = new Date();
  d.setMilliseconds(0);
  return Math.max(timeToCompare-(d.getTime()/1000), 0);
}

// takes a string input in the form of 'MM:SS', 'HH:MM:SS', or 'MM minutes and SS seconds' and returns the number of seconds it represents
function timeLeft(timeToConvert) {
  if (!timeToConvert)
    return 0;

  var returnVal = 0;

  var temp = new Array();
  temp = timeToConvert.split(':');

  if (temp.length == 2)  // MM:SS
    returnVal = ((parseInt(temp[0]) * 60) + parseInt(temp[1]));
  else if (temp.length == 3) // HH:MM:SS
    returnVal = ((parseInt(temp[0]) * 60 * 60) + (parseInt(temp[1]) * 60) + parseInt(temp[2]));
  else if (temp.length == 1) {  // 'HH hours and MM minutes and SS seconds'
    temp = timeToConvert.split(' and ');
    for (i = 0; i < temp.length; i++) {
      spaceIndex = temp[i].indexOf(' ');
      if (spaceIndex != -1) {
        firstPart = temp[i].substring(0, spaceIndex);
        secondPart = temp[i].substring(spaceIndex+1, temp[i].length);
        if ((secondPart == 'minutes') || (secondPart == 'minute'))
          returnVal = returnVal + (parseInt(firstPart) * 60);
        else if ((secondPart == 'seconds') || (secondPart == 'second'))
          returnVal = returnVal + (parseInt(firstPart));
        else if ((secondPart == 'hours') || (secondPart == 'hour'))
          returnVal = returnVal + (parseInt(firstPart * 60 * 60));
        else if ((secondPart == 'days') || (secondPart == 'day'))
          returnVal = returnVal + (parseInt(firstPart * 24 * 60 * 60));
      }
    }
  }
  return(returnVal);
}

// Convert decimal time to ?h ?m ?s format
function getDecimalTime(decimalTime) {
  var num = parseFloat(decimalTime);
  var strTime = '';
  if (num) {
    if (num >= 60) {
      strTime = parseInt(num/60) + 'h ';
      num -= parseInt(num); num *= 60;
    }
    strTime += parseInt(num) + 'm ';
    num -= parseInt(num); num *= 60;
    strTime += parseInt(num) + 's';
  }
  return strTime.replace('00','0');
}

function secondsToHMS(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
}

// Convert seconds to ?h ?m ?s format
function getHoursTime(timer) {
  var seconds = timeLeftGM(timer);
  if (seconds == 0)
    return 0;
  if (isNaN(seconds))
    return undefined;
  var num = parseInt(seconds);
  var strTime = '';
  if (num) {
    num /= 60;
    if (num >= 60) {
      num /= 60;
      strTime = parseInt(num) + 'h ';
      num -= parseInt(num); num *= 60;
    }
    strTime += parseInt(num) + 'm ';
    num -= parseInt(num); num *= 60;
    strTime += parseInt(num) + 's';
  }
  return strTime;
}


// gets the current timestamp in minutes
function getCurrentTime() {
    //returns time in minutes
    return Math.round(new Date().getTime() / 1000 / 60);
}

// gets a random num within a range
function getRandRange(_iLow, _iHigh) {
    return Math.floor((_iHigh - _iLow) * Math.random()) + _iLow;
}

// get a Snapshot based on an XPath
function getSnapshot(_strPattern,_doc) {
    // default is document if _doc is not provided
    return document.evaluate(_strPattern, (_doc===undefined?document:_doc), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// remove special characters from strings
function codeStrings(_str) {

    var strTemp = _str;
    strTemp= strTemp.replace(/\s/g, '%20');
    strTemp= strTemp.replace(/:/g,  '%3A');
    strTemp= strTemp.replace(/\//g, '%2F');
    strTemp= strTemp.replace(/\?/g,  '%3F');
    strTemp= strTemp.replace(/=/g,  '%3D');
    strTemp= strTemp.replace(/&/g,  '%26');
    strTemp= strTemp.replace(/,/g,  '%2C');

    return strTemp;
}

function decodeStrings(_str) {

    var strTemp = _str;
    strTemp= strTemp.replace(/%20/g,  ' ');
    strTemp= strTemp.replace(/%22/g,  '"');
    strTemp= strTemp.replace(/%25/g,  '%');
    strTemp= strTemp.replace(/%26/g,  '&');
    strTemp= strTemp.replace(/%2C/g,  ',');
    strTemp= strTemp.replace(/%2F/g,  '/');
    strTemp= strTemp.replace(/%3A/g,  ':');
    strTemp= strTemp.replace(/%3D/g,  '=');
    strTemp= strTemp.replace(/%3F/g,  '?');
    strTemp= strTemp.replace(/%5B/g,  '[');
    strTemp= strTemp.replace(/%5D/g,  ']');
    strTemp= strTemp.replace(/%7B/g,  '{');
    strTemp= strTemp.replace(/%7D/g,  '}');

    return strTemp;
}

function getCalendarDate() {
    var months = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
    var now         = new Date();
    var monthnumber = now.getMonth();
    var monthname   = months[monthnumber];
    var monthday    = now.getDate();
    var year        = now.getYear();
    if(year < 2000) { year = year + 1900; }
    var dateString = monthname + ' ' +  monthday;
    return dateString;
}

function getClockTime() {
   var now    = new Date();
   var hour   = now.getHours();
   var minute = now.getMinutes();
   var second = now.getSeconds();
   var ap = "AM";
   if (hour   > 11) { ap = "PM";             }
   if (hour   > 12) { hour = hour - 12;      }
   if (hour   == 0) { hour = 12;             }
   if (hour   < 10) { hour   = "0" + hour;   }
   if (minute < 10) { minute = "0" + minute; }
   if (second < 10) { second = "0" + second; }
   var timeString = hour + ':' + minute + ':' + second + " " + ap;
   return timeString;
}

function requestName(_strTemp) {

    var i,j;

    j = 0;
    for (i=0;i<3;i++) j=_strTemp.indexOf(' ',j)+1;

    return _strTemp.slice(j,j+1).toUpperCase() +  _strTemp.slice(j+1);
}

// Retreive the Facebook ID
function getFBID() {
	var oSnapShot, strText;
	var i1, i2;

	oSnapShot = getSnapshot('//script[contains(text(),"window.Env")]')
	if (oSnapShot.snapshotLength != 0) {
		strText = oSnapShot.snapshotItem(0).innerHTML;
		i1 = strText.indexOf('{"user":"');
		if (i1 == -1) {
		  i1 = strText.indexOf('{"user":"'); }
		if (i1!=-1) {
			i2 = strText.indexOf('"',i1+9);
			LogPush('FB_user_id = ' + strText.slice(i1+9,i2));
			return strText.slice(i1+9,i2);
		} else {
			return 0;
		}
	} else {
		return 0;
	}
}

function getSVNRev() {

	var oSnapShot, strText;
	var i1, i2;

	oSnapShot = getSnapshot('//script[contains(text(),"Env")]');
	if (oSnapShot.snapshotLength != 0) {
		strTemp = oSnapShot.snapshotItem(0).text;
		i1 = strTemp.indexOf('svn_rev:');
		if (i1!=-1) {
			i2 = strTemp.indexOf(",",i1);
			return strTemp.slice(i1+8,i2);
		} else {
			return strText;
		}
	} else {
		return strText;
	}
}

function getGroupNames(){
  // we are looging to build this
  // &params[lists]=[%22100423413310424%3AMafia%20Wars%22]
  // "100423413310424=Mafia Wars"
  strGroups = '<option value="0">-</option>';
  GM_xmlhttpRequest({
    url:"http://www.facebook.com/friends/edit/",
    method:'get',
    onload: function(resp){
      var i1, i2, i3, i4;
      var strTemp, strDiv, strId, strName, strParms;
      strTemp = resp.responseText;
      // get formID
      i1 = strTemp.indexOf('post_form_id:"');
      if (i1!=-1) {
        i1  += 14;
        i2   = strTemp.indexOf('"',i1);
        Post_form_id = strTemp.slice(i1,i2);
        i1   = strTemp.indexOf('fb_dtsg:"',i2);
        i1  += 9;
        i2   = strTemp.indexOf('"',i1);
        FB_dtsg = strTemp.slice(i1,i2);
      }
      i1 = 0;
      do {
        i1 = strTemp.indexOf('id="navItem_fl_', i1);
        if (i1!= -1) {
          i1     += 15;
          i2      = strTemp.indexOf('"',i1);
          strId   = strTemp.slice(i1,i2);
          i1      = strTemp.indexOf('<div class="linkWrap noCount">',i2);
          i2      = strTemp.indexOf('<span',i1+30);
          strName = strTemp.slice(i1+30,i2);
          GM_log("strId: " + strId + " strName: " + strName);
          strGroups += '<option value="'+ strId + '">'+strName+'</option>';
          i1=i2;
        }
      } while (i1 != -1);
      // reset the selected group in saved parameter if it does not exsist.
      if (strGroups.indexOf(aParams[1001]) == -1) aParams[1001] = 0;
      if (strGroups.indexOf(aParams[1003]) == -1) aParams[1003] = 0;
      // try to update display
      oForm = document.forms.namedItem('FBAA-Form1');
      if (oForm != null) {
        oForm.elements.namedItem('FBAA-Para-1001').innerHTML = strGroups;
        oForm.elements.namedItem('FBAA-Para-1001').value = aParams[1001];
        oForm.elements.namedItem('FBAA-Para-1003').innerHTML = strGroups;
        oForm.elements.namedItem('FBAA-Para-1003').value = aParams[1003];
      }
    }
  });
}



/****  Listner ****/

function click_AutoRun(iButton) {
    return function () {
        var oSpan;

        GM_log('the following button was pushed ' + iButton);

        if (iButton == 1) {
            document.getElementById(strAutoOn).innerHTML= '<b>On</b>';
            document.getElementById(strAutoOff).innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Off</a> </font>';

            if (!bAutoRun){
                bAutoRun = true;
                GM_setValue('bAutoRun',bAutoRun);
                StartProcessing();
            }

        } else {
            document.getElementById(strAutoOff).innerHTML= '<b>Off</b>';
            document.getElementById(strAutoOn).innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>On</a> </font>';
            bAutoRun = false;
            GM_setValue('bAutoRun',bAutoRun);
            StopProcessing();

        }

        // do something to start or stop the processing of requests.

    }
}

function click_ShowSettingsTab(iButton) {
    return function () {

        var oLi, oDiv;

        for (var i=0;i<7;i++) {
            oLi = document.getElementById(strFBAASetTabs+i);
            oDiv = document.getElementById(strFBAASetDivs+i);
            if (i==iButton) {
                oLi.setAttribute('class','selected');
                oDiv.style.display = "";
            } else {
                oLi.setAttribute('class','');
                oDiv.style.display = "none";
            }
        }
    }
}

function click_CloseSettings(iButton) {
    return function () {
        var oForm, oItem;
		var oDiv;

		if (iButton == 0) {

			for (var i=0;i<7;i++) {
			    oForm = document.forms.namedItem('FBAA-Form'+i);
			    for (var j=0; j<oForm.length; j++) {
			        oItem = oForm.elements[j]
			        if (oItem != undefined ) {
			          if (oItem.type == 'checkbox') {
			                aParams[oItem.name.split('-')[2]]    = oItem.checked;
			            } else {
			                aParams[oItem.name.split('-')[2]]    = oItem.value;
			            }
			        }
			    }
			}

			if (strSaveSet == 'A')
				strSaveSet = 'B'
			else
				strSaveSet = 'A';

			GM_setValue('FBAA-Settings-'+strSaveSet, ArraytoString(aParams));
			GM_setValue('FBAA-SaveSet',strSaveSet);

            oDiv = document.getElementById(strFBAASettings);
            oDiv.style.display="none";

        } else {
            oDiv = document.getElementById(strFBAASettings);
            oDiv.style.display="none";
        }
        if (bAutoRunHold){
            StartProcessing();
        }
    }
}

function click_ShowDetail(iButton) {
    return function () {
        var iBC, oButtons, oButton, iButtons, ODOM;
        var oSpan;

        if (iButton == 1) {
            document.getElementById(strDetailShow).innerHTML= '<b>Show</b>';
            document.getElementById(strDetailHide).innerHTML= '<a><font style="color: rgb(255, 255, 0); cursor: pointer;"> Hide </font></a>';
            bShowDetail = true;
            GM_setValue('bShowDetail',bShowDetail);
			LogPush('Set ShowDetail = On');
            //oLogDiv.parentNode.style.display = ""
        } else {
            document.getElementById(strDetailHide).innerHTML= '<b>Hide</b>';
            document.getElementById(strDetailShow).innerHTML= '<a><font style="color: rgb(2559, 255, 0); cursor: pointer;"> Show </font></a>';
            bShowDetail = false;
            GM_setValue('bShowDetail',bShowDetail);
			LogPush('Set ShowDetail = Off');
            //oLogDiv.parentNode.style.display = "none"
        }
    }
}

function click_ShowLog(iButton) {
    return function () {
        var iBC, oButtons, oButton, iButtons, ODOM;
        var oSpan;

        if (iButton == 1) {
            document.getElementById(strLogShow).innerHTML= '<b>Show</b>';
            document.getElementById(strLogHide).innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Hide</a> </font>';
            bShowLog = true;
            GM_setValue('bShowLog',bShowLog);
            oLogDiv.parentNode.style.display = "";
        } else {
            document.getElementById(strLogHide).innerHTML= '<b>Hide</b>';
            document.getElementById(strLogShow).innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Show</a> </font>';
            bShowLog = false;
            GM_setValue('bShowLog',bShowLog);
            oLogDiv.parentNode.style.display = "none";
        }
    }
}

function click_ShowLog2(iButton) {
    return function () {
        var iBC, oButtons, oButton, iButtons, ODOM;
        var oSpan;

        if (iButton == 1) {
            document.getElementById(strLogShow2).innerHTML= '<b>Show</b>';
            document.getElementById(strLogHide2).innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Hide</a> </font>';
            bShowLog2 = true;
            GM_setValue('bShowLog2',bShowLog2);
			oLogDiv2.parentNode.style.display = ""
        } else {
            document.getElementById(strLogHide2).innerHTML= '<b>Hide</b>';
            document.getElementById(strLogShow2).innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Show</a> </font>';
            bShowLog2 = false;
            GM_setValue('bShowLog2',bShowLog2);
            oLogDiv2.parentNode.style.display = "none";
        }
    }
}

function click_ClearLog() {
    oLogDiv.innerHTML = "";
    GM_setValue('LogDiv',oLogDiv.innerHTML);
}

function click_ClearLog2() {
    oLogDiv2.innerHTML = "";
    GM_setValue('LogDiv2',oLogDiv2.innerHTML);
}

function click_List_Accept_all(_oList) {
  return function () {

      for (var id in _oList) {
      //aParams[id] = true;
      document.getElementById('FBAA-Para-'+id).checked = true;
    }
  }
}

function click_List_Cancel_all(_oList) {
  return function () {

    for (var id in _oList) {
      //aParams[id] = false;
      document.getElementById('FBAA-Para-'+id).checked = false;
    }
  }
}

function click_ShowSetting() {
	return function () {
	    var oDiv;
	    var oForm, oItem;

	    bAutoRunHold = bAutoRun;

	    //stop processing
	    if (bAutoRun) StopProcessing();

	    // get Names
	    getGroupNames()

	    // put in group Names
	    oForm = document.forms.namedItem('FBAA-Form1');
	    oForm.elements.namedItem('FBAA-Para-1001').innerHTML = strGroups;
	    oForm.elements.namedItem('FBAA-Para-1003').innerHTML = strGroups;
	    GM_log(oForm.elements.namedItem('FBAA-Para-1001').innerHTML);

	    //try{
		    // plug in saved values;
		    for (var i=0;i<7;i++) {
			    GM_log('i = '+i);
		        oForm = document.forms.namedItem('FBAA-Form'+i);
		        GM_log('oForm.length = '+oForm.length);
		        for (var j=0; j<oForm.length; j++) {
			        //GM_log('j = '+j);
			        //GM_log('oForm = '+oForm);
			        //GM_log('oForm[j] = '+oForm.elements[j]);
		            oItem = oForm.elements[j]
		            if (oItem != undefined) {

		                if (oItem.type == 'checkbox') {
		                    oItem.checked   = aParams[oItem.name.split('-')[2]];
		                } else {
		                    oItem.value     = aParams[oItem.name.split('-')[2]];
		                }
		            } else {
		                if (oItem.type == 'checkbox')
		                    oItem.checked   = false
		                else
		                    oItem.value     = 0;
		            }
		        }
		     }
	     //} catch(err) {
		 //    GM_log('Settings ERROR :'+err.message)
	     //}

	    oDiv = document.getElementById(strFBAASettings);
	    oDiv.style.display="";
    }
}

// Script Update Update Code

function updateCheck(forced) {
    // Checks once a day (24 h * 60 m * 60 s * 1000 ms) unless forced
    if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) {
        try {
            //read the script page on the USERSCRIPT.ORG web page
            GM_xmlhttpRequest( {
                method: 'GET',
                url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
                headers: {'Cache-Control': 'no-cache'},
                onload: function(resp) {

                    var local_version, remote_version, rt, script_name;

                    rt = resp.responseText;

                    //set the time of the last successful update
                    GM_setValue('SUC_last_update', new Date().getTime()+'');

                    //get the remote version number and save the scripts name
                    remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
                    script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];

                    //get the local version number
                    local_version=parseInt(GM_getValue('SUC_current_version', '-1'));

                    if(local_version!=-1) {
                        // test to see if a new version is available

                        if (remote_version > local_version) {
                            if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
                                try {
									if (window.chrome == null)
										window.location.href = 'http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js'
									else
										window.open('http://userscripts.org/scripts/show/'+SUC_script_num,'_newtab');
                                } catch (err) {
                                }
                                GM_setValue('SUC_current_version', remote_version);
                            }
                        } else if(forced) {
                            alert('No update is available for "'+script_name+'."');
                        }
                    } else {
                        // if the script has never run save the version numnber
                        GM_setValue('SUC_target_script_name', script_name+'');
                        GM_setValue('SUC_current_version', remote_version+'');
                    }
                }
            });
        } catch (err) {
            if (forced)
                alert('An error occurred while checking for updates:\n'+err);
        }
    }
}

function SendEncode(_strTemp) {

    var strTemp1;

    strTemp1='';

    for (i=0; i<_strTemp.length; i++) {
        iTest = _strTemp.charCodeAt(i)
        if (iTest == 45 ) {
            strTemp1 += '-';
        } else if (iTest == 32 ) {
            strTemp1 += '+';
        } else if (iTest < 48) {
            strTemp1 += '%' +('000'+iTest.toString(16)).slice(-2);
        } else if (iTest>57 && iTest<65) {
            strTemp1 += '%' +('000'+iTest.toString(16)).slice(-2);
        } else if (iTest>90 && iTest<97) {
            strTemp1 += '%' +('000'+iTest.toString(16)).slice(-2);
        } else if (iTest>122 && iTest<127) {
            strTemp1 += '%' +('000'+iTest.toString(16)).slice(-2);
        } else {
            strTemp1 += _strTemp[i];
        }
    }

    return strTemp1;
}

/****   Extend Array functions  *****/
ArraytoString = function(_aTemp) {
    var tmp, bstart;

    tmp = '{';
    bstart  = false;

    for (var name in _aTemp) {
        if (bstart) tmp += ',';
        bstart = true;
        tmp += "'"+name+"'";
        tmp += ":"
        if (typeof(_aTemp[name])=='string')
            tmp += "'"+_aTemp[name] +"'"
        else
            tmp += _aTemp[name];
    }
    tmp += '}';
    return tmp;
}


function check() {
//for(var i=0; i<errors.length; i++) {
//if(errors[i].test(document.body.textContent)) {
	window.location.reload();
//	}
//}
}


function ResetAcceptTimer(forced) {
setGMTime('MW_AcceptGiftTimer', 0);
setGMTime('MW_MissionTimer', 0);
setGMTime('MW_EventTimer', 0);
setGMTime('MW_getparttimer', 0);
setGMTime('MW_masterytimer', 0);
setGMTime('MW_bossfightv2timer', 0);
setGMTime('MW_eventwalltimer', 0);
setGMTime('MW_FeeSPTimer', 0);
setGMTime('MW_fightboosttimer', 0);
setGMTime('MW_3SpinTimer', 0);
setGMTime('MW_EbonusTimer', 0);
}

function ResetSendTimer(forced) {
setGMTime('MW_PSpecialTimer', 0);
setGMTime('MW_S_GunTimer', 0);
setGMTime('MW_SSportsBarTimer', 0);
setGMTime('MW_SportsbarTimer', 0);
setGMTime('MW_PVegasTimer', 0);
setGMTime('MW_PItalyTimer', 0);
setGMTime('MW_PBrazilTimer', 0);
setGMTime('MW_PChicagoTimer', 0);
setGMTime('MW_PLondonTimer', 0);
setGMTime('MW_astimer', 0);
setGMTime('MW_2XLootTimer', 0);
setGMTime('MW_HelpGiftTimer', 0);
}


function ResetJobTimer(forced) {
setGMTime('MW_SlotsTimer', 0);
setGMTime('MW_icedbonustimer', 0);
setGMTime('MW_holidaybonustimer', 0);
setGMTime('MW_challengetimer', 0);
setGMTime('MW_robsquadtimer', 0);
setGMTime('MW_levelupbonustimer', 0);
setGMTime('MW_dtv3timer', 0);
setGMTime('MW_lootdropeventtimer', 0);
setGMTime('MW_NeedHelp_NYTimer', 0);
setGMTime('MW_NeedHelp_BangkokTimer', 0);
setGMTime('MW_NeedHelp_VegasTimer', 0);
setGMTime('MW_NeedHelp_ItalyTimer', 0);
setGMTime('MW_NeedHelp_BrazilTimer', 0);
setGMTime('MW_NeedHelp_ChicagoTimer', 0);
setGMTime('MW_NeedHelp_LondonTimer', 0);
setGMTime('MW_bossbonustimer', 0);
setGMTime('MW_freegifttimer', 0);
setGMTime('MW_missionrewardtimer', 0);
setGMTime('MW_fighteventtimer', 0);
}

function ShowTimer(forced) {
LogPush('<font color=darkgreen><B>[ End ]----------------------------------------</B></font>');
//LogPush('Mafia: ' + user_group_size);
LogPush('Event: ' + getHoursTime('MW_EventTimer')+
	', EventWall: ' + getHoursTime('MW_eventwalltimer')+ ', MW_DailyTakeV3: ' + getHoursTime('MW_dtv3timer')+
	', GetPart: ' + getHoursTime('MW_getparttimer'));
LogPush('<B>FREE Point - Daily</B>: ' + getHoursTime('MW_FeeSPTimer') + ', URL: ' + GM_getValue('FeeSPURL','') +
		', <B>3 Free Spins</B>: ' + getHoursTime('MW_3SpinTimer'));
LogPush('<font color=darkgreen><B>[ AcceptTimer ]--------------------------------</B></font>');
LogPush('Iced Bonus: ' + getHoursTime('MW_icedbonustimer') + ', Boss Bonus: ' + getHoursTime('MW_bossbonustimer'));
LogPush('Fight Event: ' + getHoursTime('MW_fighteventtimer') + ', Mission Reward: ' + getHoursTime('MW_missionrewardtimer') + 
	', Vegas Slots: ' + getHoursTime('MW_SlotsTimer'));
LogPush('Holiday Bonus: ' + getHoursTime('MW_holidaybonustimer') + ', Loot Drop: ' + getHoursTime('MW_lootdropeventtimer') + 
	', Free Gift: ' + getHoursTime('MW_freegifttimer'));
LogPush('Help <B>NY</B>: ' + getHoursTime('MW_NeedHelp_NYTimer') + 
	', Help <B>Bangkok</B>: ' + getHoursTime('MW_NeedHelp_BangkokTimer') + 
	', Help <B>Vegas</B>: ' + getHoursTime('MW_NeedHelp_VegasTimer')+ ', Help <B>Italy</B>: ' + getHoursTime('MW_NeedHelp_ItalyTimer')+ ', Help <B>Brazil</B>: ' + getHoursTime('MW_NeedHelp_BrazilTimer') + ', Help <B>Chicago</B>: ' + getHoursTime('MW_NeedHelp_ChicagoTimer'));
LogPush('<font color=darkgreen><B>[ JobTimer ]------------------------------------</B></font>');
LogPush('Vegas Parts: ' + getHoursTime('MW_PVegasTimer') + ', Italy Parts: ' + getHoursTime('MW_PItalyTimer') +  ', Brazil Parts: ' + getHoursTime('MW_PBrazilTimer') + 
	', Special Parts: ' + getHoursTime('MW_PSpecialTimer') + ', Gun: ' + getHoursTime('MW_S_GunTimer')  + ', Chicago Parts: ' + getHoursTime('MW_PChicagoTimer') +
	', SportsBar Parts: ' + getHoursTime('MW_SSportsBarTimer'));
LogPush('<font color=darkgreen><B>[ SendTimer ]-----------------------------------</B></font>');
}

function SendEncode(_strTemp) {

    var strTemp1;

    strTemp1='';

    for (i=0; i<_strTemp.length; i++) {
        iTest = _strTemp.charCodeAt(i)
        if (iTest == 45 ) {
            strTemp1 += '-';
        } else if (iTest == 32 ) {
            strTemp1 += ' + ';
        } else if (iTest < 48) {
            strTemp1 += '%' +('000' + iTest.toString(16)).slice(-2);
        } else if (iTest>57 && iTest<65) {
            strTemp1 += '%' +('000' + iTest.toString(16)).slice(-2);
        } else if (iTest>90 && iTest<97) {
            strTemp1 += '%' +('000' + iTest.toString(16)).slice(-2);
        } else if (iTest>122 && iTest<127) {
            strTemp1 += '%' +('000' + iTest.toString(16)).slice(-2);
        } else {
            strTemp1 += _strTemp[i];
        }
    }

    return strTemp1;
}

/****   Extend Array functions  *****/
ArraytoString = function(_aTemp) {
    var tmp, bstart;

    tmp = '{';
    bstart  = false;

    for (var name in _aTemp) {
        if (bstart) tmp += ',';
        bstart = true;
        tmp += "'"+ name+"'";
        tmp += ":"
        if (typeof(_aTemp[name]) =='string')
            tmp += "'"+ _aTemp[name] +"'"
        else
            tmp += _aTemp[name];
    }
    tmp += '}';
    return tmp;
}

// Generic Facebook Functions
function doFBParse(_myResponse){
    /* Generic FB Parse Function, to grab the remote url, and parameters */
    /* No sense doing the same thing in multiple places */
    var i1, i2, i1b, i1c, i1d, myUrl, myParms;
    var strTemp;
    i1 = _myResponse.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"');
    i1b = _myResponse.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"');
    i1c = _myResponse.indexOf('<script>big_pipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"');
    i1d = _myResponse.indexOf('<script>big_pipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"');
    if (i1>=0){
	i1 = _myResponse.indexOf('{',i1);
	i2 = _myResponse.indexOf(');</script>',i1);
	eval('strTemp = '+_myResponse.slice(i1,i2));
	strTemp = strTemp.content.pagelet_iframe_canvas_content;
    } else if (i1c>=0){
	i1c = _myResponse.indexOf('{',i1c);
	i2 = _myResponse.indexOf(');</script>',i1c);
	eval('strTemp = '+_myResponse.slice(i1c,i2));
	strTemp = strTemp.content.pagelet_iframe_canvas_content;

    } else if (i1b>=0) {
	i1b = _myResponse.indexOf('{',i1b);
	i2 = _myResponse.indexOf(');</script>',i1b);
	eval('strTemp = '+_myResponse.slice(i1b,i2));
	strTemp = strTemp.content.pagelet_fbml_canvas_content;
    } else if (i1d>=0){
	i1d = _myResponse.indexOf('{',i1d);
	i2 = _myResponse.indexOf(');</script>',i1d);
	eval('strTemp = '+_myResponse.slice(i1d,i2));
	strTemp = strTemp.content.pagelet_fbml_canvas_content;
        

    } else {
	// Fall back
	strTemp = _myResponse;
    }
/*    
    i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb/');
    if (i1==-1) i1 = strTemp.indexOf('<form action="https://facebook.mafiawars.zynga.com/mwfb/');
    if (i1!=-1) {
	// Extract MW protected form
	i1 = strTemp.indexOf('<form',i1); i2 = strTemp.indexOf('</form>',i1); strTemp = strTemp.slice(i1,i2);
	// Find URL
	i1 = strTemp.indexOf('"')+1; i2 = strTemp.indexOf('"',i1);
	myUrl = strTemp.slice(i1,i2);
	myUrl = myUrl.replace(/&amp;/g,'&');
	myParms = '';
	i1 = strTemp.indexOf('<input');
	while (i1!=-1) {
	  if (myParms!='') myParms += '&';
	  i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
	  myParms += strTemp.slice(i1,i2)+'=';
	  i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
	  myParms += escape(strTemp.slice(i1,i2));
	  i1 = strTemp.indexOf('<input',i1);
	}
        //myUrl.replace(/^https/, "http");
	// Return the extracted url, params, and the text body (In case we need to process it further)
	return [ myUrl, myParms, strTemp ];
    }
    i1 = strTemp.indexOf('goURI(');
    if (i1!=-1){
	i1 += 7; i2 = strTemp.indexOf("')",i1);
	myUrl = strTemp.slice(i1,i2);
	myUrl = myUrl.replace(/\\x26/g,'&');
	myUrl = myUrl.replace(/&amp;/g,'&');
	return [ myUrl, '', strTemp ];

    }
*/    
    
    return [ '', '', strTemp ];
}
function doMWRedirParse(_myResponse){
    /* Used to have goURI, this changed */
    var myUrl, i1, i2, strTemp;
    i1 = _myResponse.indexOf('href = "')+8;
    i2 = _myResponse.indexOf('"',i1);
    strTemp = _myResponse.slice(i1,i2);
    myUrl = strTemp;
    myUrl = myUrl.replace(/&amp;/g,'&');
    return myUrl;
}

function RemoveRight() {
var css = "#rightCol{display: none;};";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
}

    function ReHeal() {
		GM_xmlhttpRequest({
			url: document.location.protocol+'//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=1&skip_req_frame=1&destination=1&from=hospital&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig,
			method:'get',
			onload: function(response){
				GM_xmlhttpRequest({
					url: document.location.protocol+'//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&xw_city=1&skip_req_frame=1&first_load=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig,
					method:'get',
					onload: function(_responseDetails){
	                var strTemp;
                    if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
                    //strTemp = _responseDetails.responseText;
			        LogPush('Trying to health ..............');					
					}
				});
			}
		}); 
    }

    function Attack() {
	if (parseInt(user_health) > 19 && parseInt(user_health) < 25) {
		var person = local_xw_user_id.slice(2);
		var oldh = user_health;
		GM_xmlhttpRequest({
			url: AttackURL2 +'&xw_person='+person+'&skip_req_frame=1&first_load=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig,
			method:'get',
			onload: function(response){
	                var strTemp2, i3, i4;
                    if (response.status != 200) throw {message:"HTML Page was not read correctly."};				
                    strTemp2 = response.responseText;
                    i3  =   strTemp2.indexOf('<span id="user_health">');
                    if (i3!=-1) {
                        i4      =   strTemp2.indexOf('</span>',i3);
                        user_health = strTemp2.slice(i3+23,i4);
                    } 
					LogPush('1-Health = ' + oldh + ', After Attack ..., Health = ' + user_health);
 if (parseInt(user_health) > 19 && parseInt(user_health) < 25) {

				GM_xmlhttpRequest({
					url: AttackURL +'&xw_person='+person+'&skip_req_frame=1&first_load=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig,
					method:'get',
					onload: function(_responseDetails){
	                var strTemp, i1, i2;
                    if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};

			        //LogPush('Trying to Attack ..............');	
					
                    strTemp = _responseDetails.responseText;

                            i1  =   strTemp.indexOf('<span id="user_health">');
                            if (i1!=-1) {
                                i2      =   strTemp.indexOf('</span>',i1);
                                user_health = strTemp.slice(i1+23,i2);
                            } 
					LogPush('2-Health = ' + oldh + ', After Attack ..., Health = ' + user_health);	
                    if (parseInt(user_health) > 19 && parseInt(user_health) < 25) Attack();

					}
				}); 
 }
			}
		}); 
 }
    }
