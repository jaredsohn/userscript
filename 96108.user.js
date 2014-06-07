/**
* This program is copyright PlayerScripts.com, a division of TinHat Software Ltd.
* We grant you a liscence for personal, private and non-commercial use only.
* Please refer to playerscripts.com for further information.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/


// ==UserScript==
// @name            Face Book Mafia Gift Acceptor
// @description     Will Accept all Mafia Wars and FaceBook Gift Request, friend invites, and can ignore EVERYTHING else.
// @namespace       MafiaWars
// @include         http://www.facebook.com/*
// @exclude         http://apps.facebook.com/*
// @exclude         http://www.facebook.com/extern/*
// @exclude         http://www.facebook.com/connect/*
// @exclude         http://www.facebook.com/login.php*
// @exclude         http://facebook.mafiawars.com/mwfb/xd_receiver.htm*
// @version         0.10.140
// @contributor     Shrubber, Bubba123, Weckl, s1lv3rw0lf, viper67857, Bryan Boyle
// ==/UserScript==

var aMissionRetry = new Array();
aMissionRetry[0] = new Array();
aMissionRetry[1] = new Array();

var spamItems = {
   item1: {text: 'Coffin',				giftID: '5318_Coffin'},
   item2: {text: 'Hollow Warrior',		giftID: '2675_Hollow'}
}

//  Variables for Event trigger
var pass            = 0,
    change_count    = 0,
    notify_count    = 0,
    scheduled       = false;

//  Process Variables
var script_version  = "0.10.140a";
var SUC_script_num  = 70459;

var strFBAutoAccept = 'FBAA-Header',
    strFBAALog      = 'FBAA-Log',
    strFBAASettings = 'FBAA-Settings',
    strFBAASetTabs  = 'FBAA-SettingTab',
    strFBAASetDivs  = 'FBAA-SettingDiv',
    strAutoOn       = 'FBAA-AutoOn',
    strAutoOff      = 'FBAA-AutoOff',
    strLogShow      = 'FBAA-LogShow',
    strLogHide      = 'FBAA-LogHide';

var strFrameId;

var bAutoRun        = false,
    bAutoRunHold    = false,
    bShowLog        = false;

var strSaveSet;

var oLogDiv;

var aParams         = new Array();

var strGroups;

var local_xw_user_id, local_xw_sig, local_xw_time, xw_sig_valid;
var FB_user_id;
var Post_form_id;
var FB_dtsg;

var iRequestCurrent     = 0,
    iWallCurrent        = 0,
    iRespectCurrent     = 0,
    iMW_XW_Timer        = 0,
    iFB_XW_Timer        = 0;
var iRequestNum;

var FV_accept_ignore    = 0;
var MW_FreeGiftsDelay   = 0;
var MW_SendThanksDelay  = 0;
var MW_RackOfChipDelay  = 0;
var MW_2XBoostDelay     = 0;
var MW_SuperPigDelay    = 0;
var MW_SecretDropDelay  = 0;
var MW_IcedBonusDelay   = 0;

var bInitialized = false;

var EventSpan, ActionWall, ActionRequest, ActionRespect;
var oRespectList, oWallList, oRequestList;

var astrWallLast    = new Array();


/****  Icons   ****/
var imgLogo = 'data:image/jpg;base64,'+
            '/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcG'+
            'BwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwM'+
            'DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAoACgDASIA'+
            'AhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQA'+
            'AAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3'+
            'ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWm'+
            'p6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA'+
            'AwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSEx'+
            'BhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElK'+
            'U1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3'+
            'uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0HxJY'+
            'X2qaPPHpt6LC+KsIZim9AxUgBh1xznI5BAODjaaGk+M7m58XvpWo6XcaRLNa/aLQyMksVyUYrMsc'+
            'isdwUNEw3BHKuxKDaca93aR6jYzW0jSrHcRtCxjco6qwwSrAgg4JwQQRXA+JPi9dfGzQ7nw5feBm'+
            '8EeKfDDi80nWdG06AMPskdxbPcGCFjJcRuUhc3E0FvEYnulO1JyT+KUoKSep+gczWttD0guu0k5B'+
            'PBrkbrxTqviW/wBYsdEspBFaSCzi1SbaLSG4Qt57HDb5hG2I9iKMyRSozxjDj1v4ufsJ6j8P/hB4'+
            'g1/TPifYpqGk6VNqKXNldXd6dRZA7bLaGUGB5JthSPZvxIwCJJt2N41p3xZgtrq0+F2gfDpLXQ9M'+
            'ZILnxDdQxtfwNGv2glpmdrq2ZmUQrBLChcJLJ5xaZxWrw0oJ8+gqVeNT4NfwOvt4DbWkcbzSTMig'+
            'NJIAGc9yQAACTzgAD0opTIQDnB9aK5TUxfiH+0d4E/ZX8A6J4t8W2h1u5m1a7s7rTLu4WO2ghWIy'+
            'Wr+TJaMk7yOjRmKOdyB5chkgDSrDsfAL9tHxb4x/Zo8a6rP4M0z4bp4nvtP0S2is4pF1DUrL7JdS'+
            'L5z/ACxiWYRKqR7Q7LJdOAwkLpV8R/GLxB8DtAvvEHhnwxqXjbU0tpLY6DZrI7alCQJZA6xncYo1'+
            'h81iVkUCIlo2A47D4e3Nj+19bWXgbxv4a8N/DfUvGdoz6LqGmXqam0WqxsksFvJcJBbr88H2kKI1'+
            'ZWcH5pW2B/Uw8/3a5Wk9vmcVWCV3JX87/oczN8DNb8A/HT4hfE+X9oT4c+JPDOrx+NL7w54S0jVp'+
            'H1yyvPENv5bKyeWsgMTRWm4y4WMW+7EOWBqfti/8FCtU+Hvijwj4l8S+AtD8YeE/Evhu3utc8RR2'+
            'ha/0stc3mnRttlV0e3ZtPM8bbdqvcyAbyVEnbaF+wX8U/iV8Vda+G2qeMPBsEPh+20+6125s5JHu'+
            'zYXst0kTCMAENKlnOwRggIMQLKHfZznxg/aMPwes9Uk+Ffwu0H4heGdEmt9L0VRfC2vNUjgSGJ7m'+
            'CEWsxujcXKz4VZEaeNwVEjSA1spVFpP3exCUJSXL71vlp6/iZ+mfEXwt8YfA3hzxh4Siks4fEsk8'+
            'txpcV6b+106FFCRNHN9kgQrKyNIdsjshkWMwptYoVan8VX3jzbreqWt3ZalqccdxcW10GFxaOUA8'+
            'mTc8jb0ACEtI7EoSXc5YleXVtKba0OqCskiXTdUudF1G3vLK6urG+tJVmhubeZopYHUghlZTkH9C'+
            'Mg5BIq+3iiPVpHXWdF8M6/FOyyXL3WntDdXDqVZWM1tJEysrKrKybWVgGBDAGiiiNSUfhYnBS1ZW'+
            'uvGmqazcXX9oaZ4SN1qcU1prXiC1s3g13xRaSEkW95KhVRyVE8keGuggVhEhkSSaPxpfabCI9Mt9'+
            'G0AqnkifR9PFpctFtC+WZCzkLgdI9mMnGKKKt4mo92JUYLoZMapbQIiIEVFCgDoABiiiisrmh//Z';

var imgCatagory = {
        0:  'data:image/gif;base64,'+
            'R0lGODlhEAAQAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBV'+
            'ZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDV'+
            'mQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMr'+
            'zDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq'+
            '/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2Yr'+
            'AGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaq'+
            'M2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kA'+
            'ZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmA'+
            'mZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/'+
            'zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV'+
            '/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/'+
            'AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9V'+
            'M/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//V'+
            'Zv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAAQABAA'+
            'AAiQAPcJHEiwoEFl9AqiMThQmZiBDxkOyxQmhkBlDCHGuLEPGrGM+5ShESNG2EeQAyPp0ody4DBd'+
            '61ruy6FmFzB2IDUBSZNmn6J18xgqy5FDBsZktICxLPggDQ4HAxXBLJgjTQ4EBaUGG6gJR1FN++hF'+
            'q7dPmLB5CUMSHZMp0yRJmdJkUqRoWLSBy1hijJb2rsCAADs=',
        1:  'data:image/gif;base64,'+
            'R0lGODlhEAAQAKIAAAAAAOvu9DtZmEVinm2EtGF5rP///wAAACH5BAEHAAAALAAAAAAQABAAAAM+'+
            'CLrcWiLKGYuiWN5cgjHRhnlfCGRCqZ2ZamJfDAqiFJD32846zNMs30QxIBiPhM9xQEQelUYmAIKS'+
            'WBzYRQIAOw==',
        2:  'data:image/gif;base64,'+
            'R0lGODlhEAAQAPUAAAAAAAYGBgkJCRERERcXFxsbGx4eHiQkJCoqKi4uLjIyMjQ0NDk5OT4+PkBA'+
            'QEdHR0pKSlBQUFdXV15eXmJiYmZmZmpqanNzc3R0dH9/f4CAgIWFhYuLi42NjZGRkZeXl5ubm56e'+
            'nqampqqqqqysrLa2trq6ur+/v8HBwcXFxcjIyM/Pz9PT09fX19ra2t/f3+Pj4+Xl5evr6/Hx8fT0'+
            '9Pn5+f39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAbQQIOj'+
            'sVg4DAAAwcFYMByHgCM0In2QSs5oBIIIAAfSaoVaJBUklWqUSIZbLNclWRmvSoekoQR7xUwFAyIv'+
            'Li4nCHonMjGLEhAtMTAxKmYABik0MzU1IBuaMzMtDW4tNjUnNS4qNCo1NjIPSQguphYsNjYuGDKv'+
            'DkkLMKYZJbgmFzOvowAOMcIduB4XNDYxygzNNhcSMzQVFdOwSQm0NhYHKy4KFK4yELKl5QIiJQIT'+
            '0zG+AAzBNhgAFv4sTKMRAUADDB88fODQgEHDDSEianAQBAA7',
        3:  'data:image/gif;base64,'+
            'R0lGODlhEAAQAPMKAAAAABlLGShjKH5+fo5DAMheAESMRHq0eviwFfrybwAAAAAAAAAAAAAAAAAA'+
            'AAAAACH5BAEAAAoALAAAAAAQABAAAARZUMmpCko0z3GRzpyVeJ80WGIpAYRIlgB6KUYm3KxrBDUF'+
            'BAFZIvDhBVqXgsFwoPCWBISFsGNKeADAEoXlXQWKgbb1VPyuE62BagADwBl12fwRV4mq8A9PiQAA'+
            'Ow==',
        4:  'data:image/gif;base64,'+
            'R0lGODlhEAAQAPcAAAAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBV'+
            'ZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDV'+
            'mQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMr'+
            'zDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq'+
            '/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2Yr'+
            'AGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaq'+
            'M2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kA'+
            'ZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmA'+
            'mZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/'+
            'zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV'+
            '/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/'+
            'AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9V'+
            'M/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//V'+
            'Zv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAACH5BAEAAPwALAAAAAAQABAA'+
            'AAi6APcJHLhsU6hlAxMOhBMkTqg4cdRsUrhvGRyHm+Bo2nQnYrSB0STGAZUw1EU1A+Nw1LQv2qaJ'+
            '+14eYblPzcNN0TTFOaJsHyiVOipihBgnCMtoEEPpgKZzU5yLRoWugRhk2KYjcJzGCboPyNQgOoAQ'+
            'U7YmSMOiToMAWQsWWteiatRm9Go2SA6Bmo6s0QtHoFmvOtIMVBNn75qCQOriSBgtB8QjiQvrWDxQ'+
            'H94cOtYA0eFgEsWE0IaNpRgQADs='
        }


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
        };
    };

    // add to the bottom of the list
    this.Append = function(_data) {
        if (this.First == null) {
            this.First  = _data;
            this.Last   = _data;
        } else {
            this.Last.Next  = _data;
            this.Last   = _data;
        };
    };

    // add to the top of the list
    this.Insert = function(_data) {
        if (this.First == null) {
            this.First  = _data;
            this.Last   = _data;
        } else {
            _data.Next  = this.First;
            this.First  = _data;
        };
    };
}
/****   End of Link List Header ****/

/****  Engine for Processing Wall posting, Requests, and Respect    ****/

// regex search items
var strConfirmBoxes1    =   './/div[@class="fbRequestList mbl"]//form',
    //strConfirmBoxes1    =   './/ul[@class="uiList mbl pbm"]//form',
    strConfirmBoxes2    =   './/div[@class="confirm_boxes"]//form',
    strConfirmBoxes3    =   './/div[@class="mbl"]//form',

    strFormInputs       =   './/input',
    strFormId           =   './div',

    strReqTypes         =   './/span[contains(@id,"_label")]',
    strReqTypes1        =   './span[contains(@id,"confirm_")]',
    strWarBetray        =   './/span[contains(text(),"Betray")]/parent::*',
    strWarAttackBetray  =   './/div[contains(@style,"position: absolute")]/a',
    //strWarAttack        =   './/div[contains(@style,"float: left")]/div[contains(@style,"position: absolute")]/a';
    strWarAttack        =   './/a';

var strBase             =   'http://www.facebook.com/ajax/reqs.php?__a=1',
    strAccept           =   '&actions[accept]=Confirm',
    strReject           =   '&actions[reject]=Ignore';


// regex for Wall data
var Wall_Data = {
    // Mafia Wars
    10979261223: {	    
	MW_WarHelp:         {text: 'MW War Help',				testURL:   /next_controller=war&next_action=view/i,                                                                                                                                                                                            testIMG:   /\B|./i},
        MW_Burner:          {text: 'MW Burner',					testURL:   /next_controller=robbing&next_action=call_for_help_get_phone/i,                                                                                                                                                                     testIMG:   /\B|./i},
        MW_FriendofFriend:  {text: 'MW Help Friend of Friend',	testURL:   /next_controller=job&next_action=give_help|next_controller=job&xw_action=give_help|next_controller=story&next_action=give_help_moscow_social|next_controller=story&next_action=give_help_social/i,                                  testIMG:   /socialagain/i},
        MW_NeedHelp_NY:     {text: 'MW Help NY',				testURL:   /next_controller=job&next_action=give_help(.)*cityId=1|next_controller=job&xw_action=give_help(.)*cityId=1|next_controller=index&next_action=socialmission_respond/i,                                                                                                                       testIMG:   /\B|./i},
        MW_NeedHelp_Cuba:   {text: 'MW Help Cuba',				testURL:   /next_controller=job&next_action=give_help(.)*cityId=2|next_controller=job&xw_action=give_help(.)*cityId=2/i,                                                                                                                       testIMG:   /\B|./i},
        MW_NeedHelp_Moscow: {text: 'MW Help Moscow',			testURL:   /next_controller=story&next_action=give_help_moscow_social|next_controller=episode&next_action=give_help_moscow_social/i,                                                                                                           testIMG:   /\B|./i},
        MW_NeedHelp_Bangkok:{text: 'MW Help Bangkok',			testURL:   /next_controller=story&next_action=give_help_social(.)*cityId=4/i,                                                                                                                                                                  testIMG:   /\B|./i},
        MW_NeedHelp_Vegas:  {text: 'MW Help Vegas',				testURL:   /next_controller=story&next_action=give_help_social(.)*cityId=5/i,                                                                                                                                                                  testIMG:   /\B|./i},
        MW_NeedHelp_Italy:  {text: 'MW Help Italy',				testURL:   /next_controller=story&next_action=give_help_social(.)*cityId=6/i,                                                                                                                                                                  testIMG:   /\B|./i},
        MW_Achievement:     {text: 'MW Achievement',			testURL:   /track.php\?sendkey=.{0,}&next_action=ach_celeb/i,                                                                                                                                                                                  testIMG:   /\B|./i},
        MW_BossBonus:       {text: 'MW Boss Bonus',				testURL:   /next_controller=story&next_action=claim_boss_bonus|next_controller=map&next_action=mapboss_reward_claim/i,                                                                                                                         testIMG:   /\B|./i},
        MW_IcedBonus:       {text: 'MW Iced Bonus',				testURL:   /next_controller=index&next_action=iced_boost_claim/i,                                                                                                                                                                              testIMG:   /\B|./i},
        MW_Loyalty:         {text: 'MW Loyalty Bonus',			testURL:   /next_controller=index&next_action=crm_levelup_claim/i,                                                                                                                                                                             testIMG:   /\B|./i},
        MW_LevelUp:         {text: 'MW Level Up Bonus',			testURL:   /next_controller=index&next_action=levelup_boost_claim/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_HolidayBonus:    {text: 'MW Holiday Bonus',			testURL:   /next_controller=index&next_action=holiday_feed_reward/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_SupplyParts:     {text: 'MW Supply Part',			testURL:   /next_controller=propertyV2&next_action=cs_help_item|next_controller=propertyV2&next_action=cs_redeem_special_item_feed|next_controller=propertyV2&next_action=itemFeedHelp|next_controller=propertyV2&next_action=visit|next_controller=propertyV2&next_action=getBoost/i,         testIMG:   /\B|./i},
        MW_SupplyEnergy:    {text: 'MW Supply Engery',			testURL:   /next_controller=index&next_action=send_energy_mbox/i,                                                                                                                                                                              testIMG:   /\B|./i},
        MW_NextTarget:      {text: 'MW Next Target',			testURL:   /next_controller=fight&next_action=social_attack/i,                                                                                                                                                                                 testIMG:   /\B|./i},
        MW_Secret_Reward:   {text: 'MW Secret Reward',			testURL:   /next_controller=fight&next_action=collect_fight_loot|next_controller=socialmission&next_action=giftAccept/i,                                                                                                                                                                            testIMG:   /\B|./i},
        MW_Fight_Event:     {text: 'MW Fight Event',			testURL:   /next_controller=index&next_action=fight_event_feed_reward/i,                                                                                                                                                                       testIMG:   /\B|./i},
        MW_Bounty:          {text: 'MW Bounty',					testURL:   /next_controller=hitlist&next_action=feed_hit/i,                                                                                                                                                                                    testIMG:   /\B|./i},
        MW_LaunderMoney:    {text: 'MW Launder Money',			testURL:   /next_controller=launder&next_action=give_help/i,                                                                                                                                                                                   testIMG:   /\B|./i},
        MW_ChopShop:        {text: 'MW Chop Shop',				testURL:   /next_controller=propertyV2&next_action=cs_help_final.{0,}building_type%22%3A%2211%22|next_controller=propertyV2&next_action=cs_help_initial.{0,}building_type%22%3A%2211%22/i,                                               testIMG:   /\B|./i},
        MW_WeaponsDepot:    {text: 'MW Weapons Depot',			testURL:   /next_controller=propertyV2&next_action=cs_help_final.{0,}building_type%22%3A%2212%22|next_controller=propertyV2&next_action=cs_help_initial.{0,}building_type%22%3A%2212%22|next_controller=PropertyV2&next_action=PropertyV2EventAskFeed/i,                                               testIMG:   /\B|./i},
        MW_Armory:          {text: 'MW Armory',					testURL:   /next_controller=propertyV2&next_action=cs_help_final.{0,}building_type%22%3A%2213%22|next_controller=propertyV2&next_action=cs_help_initial.{0,}building_type%22%3A%2213%22/i,                                               testIMG:   /\B|./i},
	MW_Zoo: 	    {text: 'MW Zoo', 				testURL: /next_controller=propertyV2&next_action=cs_help_final.{0,}building_type%22%3A%2214%22|next_controller=propertyV2&next_action=cs_help_initial.{0,}building_type%22%3A%2214%22/i, 							testIMG: /\B|./i}, 
        MW_Stash:           {text: 'MW Secret Stash',			testURL:   /next_controller=job&next_action=collect_loot/i,                                                                                                                                                                                    testIMG:   /\B|./i},
        MW_Robbing:         {text: 'MW Robbing',				testURL:   /next_controller=robbing&next_action=mastery_bonus/i,                                                                                                                                                                               testIMG:   /\B|./i},
        MW_LootDropEvent:   {text: 'MW Loot Drop Event',		testURL:   /next_controller=index&next_action=loot_drop_event_feed_reward/i,                                                                                                                                                                   testIMG:   /\B|./i},
        MW_ShareRewardEvent:{text: 'MW Share Reward Event',		testURL:   /next_controller=quest&next_action=questFeedReward|next_controller=war&next_action=share_reward_feed_click|next_controller=socialmission&next_action=rewardBrag/i,                                                                                                                    testIMG:   /\B|./i},
        MW_Missions:        {text: 'MW Social Missions',		testURL:   /next_controller=socialmission&next_action=joinMission|next_controller=socialmission&xw_action=joinMission(.)*cityId=1/i,                                                                                                           testIMG:   /\B|./i},
        MW_VegasSlots:      {text: 'MW Vegas Slots',			testURL:   /next_controller=stats&next_action=view(.)*vegasslots|next_controller=stats&next_action=view(.)*playslots/i,                                                                                                                        testIMG:   /\B|./i},
        MW_FreeGift:        {text: 'MW Free Gift',				testURL:   /next_controller=freegifts&next_action=acceptGiftEvent/i,                                                                                                                                                                           testIMG:   /\B|./i},
        MW_SoccerFan:       {text: 'MW Soccer Fan',				testURL:   /next_controller=propertyV2&next_action=getCustomer/i,         																																									   testIMG:   /\B|./i},
	MW_XMasJunk:        {text: 'MW Christmas Spam',				testURL:   /next_controller=propertyV2Tree&next_action=holidayTreeProtection|next_controller=propertyV2Tree&next_action=upgradeW2W/i,         																																									   testIMG:   /\B|./i}
        },

    // FarmVille
    102452128776: {
        // rewards
        FV_MasteryFriendRewad:                  {testURL:   /MasteryFriendRewad/i,                              testIMG:    /\B|./i},
        FV_HorseStableFriendReward:             {testURL:   /HorseStableFriendReward/i,                         testIMG:    /\B|./i},
        FV_FuelDiscoveryFriendReward:           {testURL:   /FuelDiscoveryFriendReward|OilBarronFriendReward/i, testIMG:    /\B|./i},
        FV_FertilizeThankFriendReward:          {testURL:   /FertilizeThankFriendReward/i,                      testIMG:    /\B|./i},
        FV_SocialMissionShareBonusFriendReward: {testURL:   /SocialMissionShareBonusFriendReward/i,             testIMG:    /\B|./i},
        FV_StorageExpansionFriendReward:        {testURL:   /StorageExpansionFriendReward/i,                    testIMG:    /\B|./i},
        FV_WanderingStallionFriendReward:       {testURL:   /WanderingStallionFriendReward/i,                   testIMG:    /\B|./i},
        FV_AchievementFriendReward:             {testURL:   /AchievementFriendReward/i,                         testIMG:    /\B|./i},
        FV_TuscanWeddingRedeemFriendReward:     {testURL:   /TuscanWeddingRedeemFriendReward/i,                 testIMG:    /\B|./i},
        FV_TuscanWeddingFriendReward:           {testURL:   /TuscanWeddingFriendReward/i,                       testIMG:    /\B|./i},
        FV_FlowerFriendReward:                  {testURL:   /FlowerFriendReward/i,                              testIMG:    /\B|./i},
        FV_BushelFriendReward:                  {testURL:   /BushelFriendReward/i,                              testIMG:    /\B|./i},
        FV_StallThankYouFriendReward:           {testURL:   /StallThankYouFriendReward/i,                       testIMG:    /\B|./i},
        FV_lonely_cow:                          {testURL:   /lonely_cow/i,                                      testIMG:    /\B|./i},
        FV_FoalFriendReward:                    {testURL:   /FoalFriendReward/i,                                testIMG:    /\B|./i},
        FV_NurseryBuildingFriendReward:         {testURL:   /NurseryBuildingFriendReward/i,                     testIMG:    /\B|./i},
        FV_EggFriendReward:                     {testURL:   /EggFriendReward/i,                                 testIMG:    /\B|./i},
        FV_CollectionsFriendReward:             {testURL:   /CollectionsFriendReward/i,                         testIMG:    /\B|./i},
        FV_ConstructionBuildingFriendReward:    {testURL:   /ConstructionBuildingFriendReward/i,                testIMG:    /\B|./i}
      }
  }

var MW_general = {
    2004:   {text:"Help on Jobs"},
    2005:   {text:"Friend of a Friend"},
    2006:   {text:"Next Target"},
    2007:   {text:"HitList Bounty"},
    2008:   {text:"Bonus, Loot, or Reward"},
    2013:   {text:"Boss Bonus"},
    2009:   {text:"Money Laundering"},
    2010:   {text:"Supply Parts or Engery"},
    2011:   {text:"War - Help"},
    2012:   {text:"War - Betray Friends"},
    2014:   {text:"Secret Stash"},
    2015:   {text:"Vegas Slots"},
    2016:   {text:"Soccer Fan"}
}

var MW_StashList = {
    2049:   {text:"ALL (Overrides others)"},
    2050:   {text:"Bark Scorpions.          A:50,   D:32",      test:"Bark Scorpions"},
    2051:   {text:"Chain Vipers.            A:46,   D:33",      test:"Chain Vipers"},
    2052:   {text:"Day Rider 2Ks.           A:44,   D:50",      test:"Day Rider 2Ks"},
    2053:   {text:"Lamang Motorcycles.      A:49,   D:34",      test:"Lamang Motorcycles"},
    2054:   {text:"Mugati Sports.           A:35,   D:51",      test:"Mugati Sports"},
    2055:   {text:"Railguns.                A:51,   D:24",      test:"Railguns"},
    2056:   {text:"Range Finder Rifles.     A:37,   D:54",      test:"Range Finder Rifles"},
    2057:   {text:"Bighorn Rams.            A:37,   D:42",      test:"Bighorn Rams"},
    2058:   {text:"Plasma Rifles.           A:40,   D:47",      test:"Plasma Rifles"},
    2059:   {text:"Nguhea Sniper Rifles.    A:21,   D:24",      test:"Nguhea Sniper Rifles"},
    2060:   {text:"Lloyds Spectres.         A:18,   D:45",      test:"Lloyds Spectres"},
    2061:   {text:"Acetylene Torches.       (Chop Shop)",       test:"Acetylene Torches"},
    2062:   {text:"Car Lift.                (Chop Shop)",       test:"Car Lifts"},
    2063:   {text:"Cement Blocks.           (Chop Shop)",       test:"Cement Blocks"},
    2064:   {text:"Shipping Containers.     (Chop Shop)",       test:"Shipping Containers"},
    2065:   {text:"Power Tools.             (Chop Shop)",       test:"Power Tools"},
    2066:   {text:"Arc Welder.              (Weapons Depot)",   test:"Arc Welders"},
    2067:   {text:"Buzzsaw.                 (Weapons Depot)",   test:"Buzzsaws"},
    2068:   {text:"Forge.                   (Weapons Depot)",   test:"Forges"},
    2069:   {text:"Gun Drill.               (Weapons Depot)",   test:"Gun Drills"},
    2070:   {text:"Gunpowder.               (Weapons Depot)",   test:"Crates of Gunpowder"},
    2071:   {text:"Casino Dealer.           (Vegas Property)",  test:"Casino Dealers"},
    2072:   {text:"Chef.                    (Vegas Property)",  test:"Chefs"},
    2073:   {text:"Cinder Block.            (Vegas Property)",  test:"Cinder Blocks"},
    2074:   {text:"Construction Tool.       (Vegas Property)",  test:"Construction Tools"},
    2075:   {text:"Slot Machine.            (Vegas Property)",  test:"Slot Machines"},
    2076:   {text:"Steel Girder.            (Vegas Property)",  test:"Steel Girders"},
    2077:   {text:"Car Parts.               (Car Parts)",       test:"Car Parts"},
    2078:   {text:"Weapon Parts.            (Weapon Parts)",    test:"Weapon Parts"},
    2079:   {text:"Health Kits.             (Boss Fights)",     test:"Health Kits"},
    2080:   {text:"Stun Guns.               (Boss Fights)",     test:"Stun Guns"}
}


var MW_WarList = {
    2200:   {text:"ALL (Overrides others)"},
    2201:   {text:"Canonazo.                A:42,   D:22",  test:"Canonazo"},
    2202:   {text:"Big Bad Wolf.            A:42,   D:25",  test:"Big Bad Wolf"},
    2203:   {text:"Tanto.                   A:43,   D:28",  test:"Tanto"},
    2204:   {text:"String of Firecrackers.  A:33,   D:46",  test:"String of Firecrackers"},
    2205:   {text:"Raed Armored Sedan.      A:30,   D:47",  test:"Raed Armored Sedan"},
    2206:   {text:"Deadly Impression.       A:28,   D:47",  test:"Deadly Impression"},
    2207:   {text:"Cataclysmic.             A:53,   D:26",  test:"Cataclysmic"},
    2208:   {text:"Savanna Baboon.          A:25,   D:54",  test:"Savanna Baboon"},
    2209:   {text:"Snapping Turtle.         A:56,   D:25",  test:"Snapping Turtle"},
    2210:   {text:"Duster.                  A:27,   D:56",  test:"Duster"},
    2211:   {text:"Spiked Baton.            A:58,   D:28",  test:"Spiked Baton"},
    2212:   {text:"Armored Biker Boots.     A:27,   D:59",  test:"Armored Biker Boots"},
    2213:   {text:"Contender.               A:33,   D:63",  test:"Contender"},
    2214:   {text:"Galapagos Hawk.          A:64,   D:32",  test:"Galapagos Hawk"},
    2215:   {text:"Growler.                 A:33,   D:65",  test:"Growler"},
    2216:   {text:"Hack N Slash.            A:65,   D:35",  test:"Hack N Slash"}
}

var MW_SecretMissions = {
    2301:   {text:"Truck Hijacking (Easy)",  						test:"Truck Hijacking"},
    2302:   {text:"Bribe A Contact (Easy)",  						test:"Bribe A Contact"},
    2303:   {text:"Bank Robbery (Medium)",  						test:"Bank Robbery"},
    2304:   {text:"Fight Off a Rival Mafia (Medium)",				test:"Fight Off A Rival Mafia"},
    2305:   {text:"Bribe A Government Official (Medium)",			test:"Bribe A Government Official"},
    2306:   {text:"Steal A Dockyard Shipment (Hard)",				test:"Steal A Dockyard Shipment"},
    2307:   {text:"Take Out A Rival Operation (Hard)",				test:"Take Out A Rival Operation"},
    2308:   {text:"Transport Stolen Uranium (Hard)",				test:"Transport Stolen Uranium"},
//    2350:   {text:"Crash the Mayor's Halloween Party (Halloween)",	test:"Crash The Mayor's Halloween Party"},
//    2351:   {text:"Holiday Traffic (Thanksgiving)",					test:"Holiday Traffic"},
    2399:   {text:"Unknown(new or limited) Missions"}
}



var FV_general = {
    3050:   {text:"Bonuses/Coins",          img_test:/Do you want to collect (.*) Coins|Would you like (.*) coins instead/i},
    3051:   {text:"Experience",             img_test:/consume_xp_icon.png/i},
    3052:   {text:"Free Fuel",              img_test:/equip_gas_can_icon.png|fuelgift1.png|givefuel_feed.png/i},
    3053:   {text:"Farmhand",               img_test:/deco_farmhands_icon.png/i},
    3054:   {text:"Arborist",               img_test:/deco_arborists_icon.png/i},
    3055:   {text:"Wandering Stallion",     img_test:/Do you want to give the Wandering Stallion shelter for the night/i},
    3056:   {text:"Barn Raising",           img_test:/Would you like to help (.*) with their barn raising/i}
}

var FV_eggs = {
    3100:    {text:"White Egg",             img_test:/deco_egg_icon.png/i},
    3101:    {text:"Brown Egg",             img_test:/deco_egg_brown_icon.png/i},
    3102:    {text:"Black Egg",             img_test:/deco_egg_black_icon.png/i},
    3103:    {text:"Gold Egg",              img_test:/deco_egg_gold_icon.png/i},
    3104:    {text:"Cornish Egg",           img_test:/deco_egg_cornish_icon.png/i},
    3105:    {text:"Scots Grey Egg",        img_test:/deco_egg_scots_icon.png/i},
    3106:    {text:"Rhode Island Red Egg",  img_test:/deco_egg_rhode_icon.png/i},
    3199:    {text:"Unknown",               img_test:/deco_egg_/i}
    }

var FV_flowers = {
    3201:    {text:"Lilac",                 img_test:/flower_iris_icon.png/i},
    3202:    {text:"Daffodils",             img_test:/flower_daffodil_icon.png/i},
    3203:    {text:"Morning Glory",         img_test:/flower_bluemorningglory_icon.png/i},
    3204:    {text:"Red Tulips",            img_test:/flower_tulipred_icon.png/i},
    3205:    {text:"Pink Roses",            img_test:/flower_rosepink_icon.png/i},
    3206:    {text:"Sunflowers",            img_test:/flower_sunflower_icon.png/i},
    3207:    {text:"Lavender",              img_test:/flower_lavender_icon.png/i},
    3208:    {text:"Lilies",                img_test:/flower_lilies_icon.png/i},
    3209:    {text:"Purple Poppies",        img_test:/flower_poppiepurple_icon.png/i},
    3210:    {text:"Iris",                  img_test:/flower_iris_icon.png/i},
    3211:    {text:"Fire & Ice Roses",      img_test:/flower_fire_ice_rose_icon.png/i},
    3212:    {text:"Forget-Me-Not",         img_test:/flower_forgetmenot_icon.png/i},
    3213:    {text:"Golden Poppies",        img_test:/flower_poppiegolden_icon.png/i},
    3214:    {text:"Lotus",                 img_test:/flower_lotus_icon.png/i},
    3215:    {text:"Poinsettia",            img_test:/flower_poinsettia_icon.png/i},
    3216:    {text:"White Roses",           img_test:/flower_rosewhite_icon.png/i},
    3217:    {text:"Yellow Roses",          img_test:/flower_roseyellow_icon.png/i},
    3218:    {text:"Green Hellebores",      img_test:/flower_rosehellebores_icon.png/i},
    3219:    {text:"Green Roses",           img_test:/flower_rosegreen_icon.png/i},
    3220:    {text:"Saffron",               img_test:/flower_saffron_icon.png/i},
    3221:    {text:"Shamrock",              img_test:/flower_shamrock_icon.png/i},
    3222:    {text:"Pink Hibiscus",         img_test:/flower_hibiscuspink_icon.png/i},
    3222:    {text:"Flamingo",              img_test:/flower_flamingo_icon.png/i},
    3299:    {text:"Unknown",               img_test:/flower_/i}
  }


var FV_animals = {
    3300:  {text:"Alpaca",                  img_test:/animal_alpaca_icon.png/i},
    3301:  {text:"Angora Rabbit",           img_test:/animal_rabbit_angora_icon.png/i},
    3302:  {text:"Appaloosa",               img_test:/animal_appaloosa_icon.png/i},
    3303:  {text:"Appaloosa Foal",          img_test:/animal_foal_appaloosa_icon.png/i},
    3304:  {text:"Arapawa Goat",            img_test:/animal_goat_arapawa_icon.png/i},
    3308:  {text:"Baby Turkey",             img_test:/animal_turkey_baby_icon.png/i},
    3309:  {text:"Baby White Tiger",        img_test:/animal_tiger_white_icon.png/i},
    3311:  {text:"Belted Calf",             img_test:/animal_calf_belted_icon.png|calf_belted_stork.png/i},
    3312:  {text:"Belted Cow",              img_test:/animal_cow_belted_icon.png/i},
    3313:  {text:"Big Horn Sheep",          img_test:/animal_sheep_bighorn_icon.png/i},
    3315:  {text:"Black Chicken",           img_test:/animal_chicken_black_icon.png/i},
    3316:  {text:"Black Foal",              img_test:/animal_foal_black_icon.png/i},
    3317:  {text:"Black Horse",             img_test:/animal_horse_black_icon.png/i},
    3318:  {text:"Black Sheep",             img_test:/sheep_black_sad.png/i},
    3319:  {text:"Black Pig",               img_test:/animal_pig_black_icon.png/i},
    3475:  {text:"Black Pony",              img_test:/animal_pony_swiss_icon.png/i},
    3320:  {text:"Black Yak",               img_test:/animal_yak_black_icon.png/i},
    3321:  {text:"Blue Pony Foal",          img_test:/animal_foal_pony_blue_icon.png/i},
    3322:  {text:"Bobcat",                  img_test:/animal_bobcat_icon/i},
    3323:  {text:"Boer Goat",               img_test:/animal_goat_boer_icon.png/i},
    3324:  {text:"Brown Calf",              img_test:/animal_calf_brown_icon.png|calf_brown_stork.png/i},
    3325:  {text:"Brown Chicken",           img_test:/animal_chicken_brown_icon.png/i},
    3326:  {text:"Brown Cow",               img_test:/animal_cow_brown_icon.png/i},
    3327:  {text:"Brown Foal",              img_test:/animal_foal_icon.png/i},
    3328:  {text:"Brown Goose",             img_test:/animal_goose_icon.png/i},
    3329:  {text:"Brown Pony",              img_test:/animal_pony_icon.png/i},
    3330:  {text:"Buck",                    img_test:/animal_deer_icon.png/i},
    3332:  {text:"Buffalo",                 img_test:/animal_buffalo_icon.png/i},
    3333:  {text:"Bull",                    img_test:/bull_sad.png/i},
    3334:  {text:"Caiman Lizard",           img_test:/animal_lizard_caiman_icon.png/i},
    3335:  {text:"Calf",                    img_test:/animal_calf_icon.png|calf_stork.png/i},
    3336:  {text:"Chicken",                 img_test:/animal_chicken_icon.png/i},
    3339:  {text:"Chinchilla",              img_test:/animal_chinchilla_icon.png/i},
    3340:  {text:"Chocolate Calf",          img_test:/animal_calf_brownchocolate_icon.png/i},
    3341:  {text:"Chocolate Cow",           img_test:/animal_cow_brownchocolate_icon.png/i},
    3342:  {text:"Circus Elephant",         img_test:/animal_elephant_circus_icon.png/i},
    3344:  {text:"Clydesdale Horse",        img_test:/animal_clydesdale_icon.png/i},
    3345:  {text:"Clydesdale Foal",         img_test:/animal_foal_clydesdale_icon.png/i},
    3346:  {text:"Cornish Chicken",         img_test:/animal_chicken_cornish_icon.png/i},
    3347:  {text:"Cow",                     img_test:/cow_sad.png/i},
    3348:  {text:"Cream Draft Foal",        img_test:/animal_foal_clydesdale_cream_icon.png/i},
    3349:  {text:"Cream Draft Horse",       img_test:/animal_clydesdale_cream_icon.png/i},
    3350:  {text:"Desert Tortoise",         img_test:/animal_deserttortoise_icon.png/i},
    3351:  {text:"Doe",                     img_test:/animal_doe_icon.png/i},
    3352:  {text:"Donkey",                  img_test:/animal_donkey_icon.png/i},
    3353:  {text:"Duck",                    img_test:/animal_duck_icon.png/i},
    3354:  {text:"Dutch Rabbit",            img_test:/animal_rabbit_dutch_icon.png/i},
    3355:  {text:"Elk",                     img_test:/animal_elk_icon.png/i},
    3356:  {text:"Emperor Penguin",         img_test:/animal_penguin_emperor_icon.png/i},
    3360:  {text:"Gazelle",                 img_test:/animal_gazelle_icon.png/i},
    3361:  {text:"Giant Panda",             img_test:/animal_panda_icon.png/i},
    3362:  {text:"Gila Monster",            img_test:/animal_gilamonster_icon.png/i},
    3363:  {text:"Goat",                    img_test:/animal_goat_icon.png/i},
    3364:  {text:"Golden Chicken",          img_test:/animal_chicken_golden_icon.png/i},
    3366:  {text:"Gray Horse",              img_test:/animal_horse_gray_icon.png/i},
    3367:  {text:"Gray Rabbit",             img_test:/animal_rabbit_gray_icon.png/i},
    3368:  {text:"Green Calf",              img_test:/animal_calf_green_icon.png/i},
    3369:  {text:"Green Mallard",           img_test:/animal_duck_green_icon.png/i},
    3370:  {text:"Grey Foal",               img_test:/animal_foal_gray_icon.png/i},
    3371:  {text:"Grey Goose",              img_test:/animal_goose_grey_icon.png/i},
    3372:  {text:"Grey Tabby",              img_test:/animal_cat_grey_icon.png/i},
    3373:  {text:"Groovy Calf",             img_test:/calf_groovy_sad.png|animal_calf_groovy_icon.png/i},
    3374:  {text:"Groovy Cow",              img_test:/cow_groovy_sad.png/i},
    3375:  {text:"Groovy Goat",             img_test:/animal_goat_groovy_icon.png/i},
    3376:  {text:"Haflinger Horse",         img_test:/animal_horse_haflinger_icon.png/i},
    3377:  {text:"Haflinger Foal",          img_test:/animal_foal_haflinger_icon.png/i},
    3380:  {text:"Holstein Calf",           img_test:/animal_calf_holstein_icon.png/i},
    3381:  {text:"Holstein Cow",            img_test:/animal_cow_holstein_icon.png/i},
    3382:  {text:"Horse",                   img_test:/animal_horse_icon.png/i},
    3384:  {text:"Hot Pink Pig",            img_test:/animal_pig_hotpink_icon.png/i},
    3386:  {text:"Indian Elephant",         img_test:/animal_elephant_indian_icon.png/i},
    3387:  {text:"Indian Yak",              img_test:/animal_yak_icon.png/i},
    3390:  {text:"Jackalope",               img_test:/animal_jackalope_icon.png/i},
    3391:  {text:"Jackrabbit",              img_test:/animal_jackrabbit_icon.png/i},
    3392:  {text:"Kangaroo",                img_test:/animal_kangaroo_icon.png/i},
    3397:  {text:"Light Blue Pony",         img_test:/animal_pony_blue_icon.png/i},
    3400:  {text:"Llama",                   img_test:/animal_lama_icon.png/i},
    3402:  {text:"Longhorn Calf",           img_test:/animal_calf_longhorn_icon.png/i},
    3403:  {text:"Longhorn Cow",            img_test:/animal_cow_longhorn_icon.png/i},
    3409:  {text:"Moose",                   img_test:/animal_moose_icon.png/i},
    3411:  {text:"Mustang",                 img_test:/animal_mustang_icon.png/i},
    3412:  {text:"Mustang Foal",            img_test:/animal_foal_mustang_icon.png/i},
    3413:  {text:"Neapolitan Calf",         img_test:/animal_calf_neapolitan_icon.png/i},
    3414:  {text:"Neapolitan Cow",          img_test:/animal_cow_neapolitan_icon.png/i},
    3416:  {text:"Ossabaw Pig",             img_test:/animal_pig_ossabaw_icon.png/i},
    3417:  {text:"Ox",                      img_test:/animal_oxen_icon.png/i},
    3418:  {text:"Peacock",                 img_test:/animal_peacock_icon.png/i},
    3419:  {text:"Peeper Frog",             img_test:/animal_frog_peeper_icon.png/i},
    3420:  {text:"Pelican",                 img_test:/animal_pelican_icon.png/i},
    3421:  {text:"Penguin",                 img_test:/animal_penguin_icon.png/i},
    3424:  {text:"Pig",                     img_test:/animal_pig_icon.png/i},
    3425:  {text:"Pink Calf",               img_test:/calf_pink_sad.png|calf_pink_stork.png/i},
    3426:  {text:"Pink Cow",                img_test:/cow_pink_sad.png/i},
    3427:  {text:"Pink-Hair Pony",          img_test:/animal_pony_pink_icon.png/i},
    3428:  {text:"Pink Patch Calf",         img_test:/animal_calf_pinkpatch_icon.png/i},
    3429:  {text:"Pink Patch Cow",          img_test:/animal_cow_pinkpatch_icon.png/i},
    3430:  {text:"Pink Pony Foal",          img_test:/animal_foal_pony_pink_icon.png/i},
    3431:  {text:"Pinto Foal",              img_test:/animal_foal_pinto_icon.png/i},
    3432:  {text:"Polar Bear Cub",          img_test:/animal_polarbear_icon.png/i},
    3433:  {text:"Pinto Horse",             img_test:/animal_horse_pinto_icon.png/i},
    3434:  {text:"Pony Foal",               img_test:/animal_foal_pony_icon.png/i},
    3435:  {text:"Porcupine",               img_test:/animal_porcupine_icon.png/i},
    3436:  {text:"Pot Belly Pig",           img_test:/animal_pig_potbelly_icon.png/i},
    3437:  {text:"Prairie Dog",             img_test:/animal_prairiedog_icon.png/i},
    3439:  {text:"Purple Frog",             img_test:/animal_frog_purple_icon.png/i},
    3440:  {text:"Purple Mane Pony",        img_test:/animal_pony_purple_icon.png/i},
    3441:  {text:"Purple Pony Foal",        img_test:/animal_foal_pony_purple_icon.png/i},
    3442:  {text:"Pygmy Goat",              img_test:/animal_goat_pygmy_icon.png/i},
    3443:  {text:"Rabbit",                  img_test:/animal_rabbit_icon.png/i},
    3444:  {text:"Reindeer",                img_test:/animal_reindeer_icon.png/i},
    3445:  {text:"Referee Cow",             img_test:/animal_cow_referee_icon.png/i},
    3446:  {text:"Referee Cow (Yellow)",    img_test:/animal_cow_referee_yellow_icon.png/i},
    3447:  {text:"Red Panda",               img_test:/animal_redpanda_icon.png/i},
    3449:  {text:"Road Runner",             img_test:/animal_roadrunner_icon.png/i},
    3450:  {text:"Saanens Goat",            img_test:/animal_goat_saanens_icon.png/i},
    3452:  {text:"Scots Grey Chicken",      img_test:/animal_chicken_scotsgrey_icon.png/i},
    3454:  {text:"Sheep",                   img_test:/animal_sheep_icon.png/i},
    3456:  {text:"Spaghetti Sheep",         img_test:/animal_sheep_spaghetti_icon.png/i},
    3459:  {text:"Swan",                    img_test:/animal_swan_icon.png/i},
    3460:  {text:"Toggenburg Goat",         img_test:/animal_goat_toggenburg_icon.png/i},
    3461:  {text:"Treasure Seagull",        img_test:/animal_seagull_icon.png/i},
    3462:  {text:"Turkey",                  img_test:/animal_turkey_icon.png/i},
    3463:  {text:"Turtle",                  img_test:/animal_turtle_icon.png/i},
    3464:  {text:"Tuscan Calf",             img_test:/animal_calf_tuscan_icon.png|calf_tuscan_stork.png/i},
    3465:  {text:"Tuscan Cow",              img_test:/animal_cow_tuscan_icon.png/i},
    3466:  {text:"Ugly Duckling",           img_test:/uglyduck_sad.png/i},
    3467:  {text:"Valley Quail",            img_test:/animal_quail_icon.png/i},
    3470:  {text:"White Peacock",           img_test:/animal_peacock_white_icon.png/i},
    3471:  {text:"White Stallion",          img_test:/animal_stallion_white_icon.png/i},
    3473:  {text:"Woodchuck",               img_test:/animal_woodchuck_icon.png/i},
    3474:  {text:"Party Duck",              img_test:/birthday_sad.png/i},

    // 3476

    /* these item where not found
    3305:  {text:"B0V1NE-09",             img_test:/UNKNOW/i},
    3306:  {text:"Baby Elephant",         img_test:/UNKNOW/i},
    3307:  {text:"Baby Tiger",            img_test:/UNKNOW/i},
    3310:  {text:"Bear Cub",              img_test:/UNKNOW/i},
    3314:  {text:"Black Cat",             img_test:/UNKNOW/i},
    3337:  {text:"Chicken Cheer",         img_test:/UNKNOW/i},
    3338:  {text:"Chicken Joy",           img_test:/UNKNOW/i},
    3343:  {text:"Clumsy Reindeer",       img_test:/UNKNOW/i},
    3357:  {text:"Fan Calf",              img_test:/UNKNOW/i},
    3358:  {text:"Fan Cow",               img_test:/UNKNOW/i},
    3359:  {text:"Female Mandarin",       img_test:/UNKNOW/i},
    3378:  {text:"Hampshire Lamb",        img_test:/UNKNOW/i},
    3379:  {text:"High Kick Horse",       img_test:/UNKNOW/i},
    3383:  {text:"Horse Spectator",       img_test:/UNKNOW/i},
    3388:  {text:"Invisible Cat",         img_test:/UNKNOW/i},
    3365:  {text:"Grape Sheep",           img_test:/UNKNOW/i},
    3385:  {text:"Hula Pig",              img_test:/UNKNOW/i},
    3389:  {text:"Island Pig",            img_test:/UNKNOW/i},
    3393:  {text:"Kelly Green Calf",      img_test:/UNKNOW/i},
    3394:  {text:"Kelly Green Cow",       img_test:/UNKNOW/i},
    3395:  {text:"Kick Ewe",              img_test:/UNKNOW/i},
    3396:  {text:"Lamb",                  img_test:/UNKNOW/i},
    3398:  {text:"Line Quacker I",        img_test:/UNKNOW/i},
    3399:  {text:"Line Quacker II",       img_test:/UNKNOW/i},
    3401:  {text:"Long Eared Rabbit",     img_test:/UNKNOW/i},
    3404:  {text:"Lop-Eared Bunny",       img_test:/UNKNOW/i},
    3405:  {text:"Luv Ewe",               img_test:/UNKNOW/i},
    3406:  {text:"Male Ostrich",          img_test:/UNKNOW/i},
    3407:  {text:"Male Mandarin",         img_test:/UNKNOW/i},
    3408:  {text:"Monal Bird",            img_test:/UNKNOW/i},
    3410:  {text:"Mouflon Sheep",         img_test:/UNKNOW/i},
    3415:  {text:"Orange Tabby",          img_test:/UNKNOW/i},
    3422:  {text:"Percheron Foal",        img_test:/UNKNOW/i},
    3423:  {text:"Percheron Horse",       img_test:/UNKNOW/i},
    3438:  {text:"Pseudocorn",            img_test:/UNKNOW/i},
    3448:  {text:"Rhode Island Red",      img_test:/UNKNOW/i},
    3453:  {text:"Shamrock Sheep",        img_test:/UNKNOW/i},
    3455:  {text:"Sheep Spectator",       img_test:/UNKNOW/i},
    3457:  {text:"Sphynx",                img_test:/UNKNOW/i},
    3458:  {text:"Sunny Ewe",             img_test:/UNKNOW/i},
    3468:  {text:"White Foal",            img_test:/UNKNOW/i},
    3469:  {text:"White Kitty",           img_test:/UNKNOW/i},
    3472:  {text:"Wild Turkey",           img_test:/UNKNOW/i},
    3451:  {text:"Saddleback Pig",        img_test:/UNKNOW/i},
    */

    3599:  {text:"Unknown",                 img_test:/animal_/i}
    }

var FV_bushels = {
    3600: {text:"Acorn Squash",             img_test:/bushel_acornsquash_icon.png/i},
    3601: {text:"Aloe Vera",                img_test:/bushel_aloevera_icon.png/i},
    3602: {text:"Artichokes",               img_test:/bushel_artichoke_icon.png/i},
    3603: {text:"Asparagus",                img_test:/bushel_asparagus_icon.png/i},
    3604: {text:"Basil",                    img_test:/bushel_basil_icon.png/i},
    3605: {text:"Bell Peppers",             img_test:/bushel_bellpepper_icon.png/i},
    3606: {text:"Black Berries",            img_test:/bushel_blackberries_icon.png/i},
    3607: {text:"Blueberries",              img_test:/bushel_blueberries_icon.png/i},
    3608: {text:"Broccoli",                 img_test:/bushel_broccoli_icon.png/i},
    3609: {text:"Cabbage",                  img_test:/bushel_cabbage_icon.png/i},
    3610: {text:"Carrots",                  img_test:/bushel_carrot_icon.png/i},
    3611: {text:"Coffee",                   img_test:/bushel_coffee_icon.png/i},
    3612: {text:"Corn",                     img_test:/bushel_corn_icon.png/i},
    3613: {text:"Cotton",                   img_test:/bushel_cotton_icon.png/i},
    3614: {text:"Cranberries",              img_test:/bushel_cranberry_icon.png/i},
    3615: {text:"Cucumber",                 img_test:/bushel_cucumber_icon.png/i},
    3616: {text:"Daffodils",                img_test:/bushel_daffodils_icon.png/i},
    3617: {text:"Eggplant",                 img_test:/bushel_eggplant_icon.png/i},
    3618: {text:"Ghost Chilli",             img_test:/bushel_ghostchili_icon.png/i},
    3619: {text:"Ginger",                   img_test:/bushel_ginger_icon.png/i},
    3620: {text:"Grapes",                   img_test:/bushel_grapes_icon.png/i},
    3621: {text:"Green Tea",                img_test:/bushel_greentea_icon.png/i},
    3622: {text:"Iris",                     img_test:/bushel_iris_icon.png/i},
    3623: {text:"Lavender",                 img_test:/bushel_lavender_icon.png/i},
    3624: {text:"Lemon Balm",               img_test:/bushel_lemonbalm_icon.png/i},
    3625: {text:"Lilac",                    img_test:/bushel_lilac_icon.png/i},
    3626: {text:"Lilies",                   img_test:/bushel_lilies_icon.png/i},
    3627: {text:"Morning Glory",            img_test:/bushel_bluemorningglory_icon.png/i},
    3628: {text:"Oats",                     img_test:/bushel_oats_icon.png/i},
    3629: {text:"Onion",                    img_test:/bushel_onion_icon.png/i},
    3630: {text:"Pattypan Squash",          img_test:/bushel_petitpansquash_icon.png/i},
    3631: {text:"Peanut",                   img_test:/bushel_peanuts_icon.png/i},
    3632: {text:"Peas",                     img_test:/bushel_peas_icon.png/i},
    3633: {text:"Peppers",                  img_test:/bushel_peppers_icon.png/i},
    3634: {text:"Pineapple",                img_test:/bushel_pineapple_icon.png/i},
    3635: {text:"Pink Roses",               img_test:/bushel_pinkrose_icon.png/i},
    3636: {text:"Potatoes",                 img_test:/bushel_potatoes_icon.png/i},
    3637: {text:"Pumpkin",                  img_test:/bushel_pumpkin_icon.png/i},
    3638: {text:"Purple Poppies",           img_test:/bushel_poppypurple_icon.png/i},
    3639: {text:"Raspberries",              img_test:/bushel_raspberries_icon.png/i},
    3640: {text:"Red Tulips",               img_test:/bushel_redtulip_icon.png/i},
    3641: {text:"Red Wheat",                img_test:/bushel_redwheat_icon.png/i},
    3642: {text:"Rice",                     img_test:/bushel_rice_icon.png/i},
    3643: {text:"Soybeans",                 img_test:/bushel_soybeans_icon.png/i},
    3644: {text:"Squash",                   img_test:/bushel_squash_icon.png/i},
    3645: {text:"Strawberries",             img_test:/bushel_strawberries_icon.png/i},
    3646: {text:"Sugar Cane",               img_test:/bushel_sugarcane_icon.png/i},
    3647: {text:"Sunflower",                img_test:/bushel_sunflower_icon.png/i},
    3648: {text:"Tomatoes",                 img_test:/bushel_tomatoes_icon.png/i},
    3649: {text:"Watermelon",               img_test:/bushel_watermelon_icon.png/i},
    3650: {text:"Wheat",                    img_test:/bushel_wheat_icon.png/i},
    3651: {text:"White Grapes",             img_test:/bushel_grapewhite_icon.png/i},
    3652: {text:"Yellow Melon",             img_test:/bushel_yellowwatermelon_icon.png/i},
    3699: {text:"Unknown",                  img_test:/bushel_/i}
    }

var FV_collectables = {
    3700: {text:"Gloves",                   img_test:/collect_gloves.png/i},
    3701: {text:"Trowels",                  img_test:/Unknown/i},
    3702: {text:"Cultivator",               img_test:/Unknown/i},
    3703: {text:"Twine",                    img_test:/collect_gardeningtwine.png/i},
    3704: {text:"Pruning Saw",              img_test:/collect_pruningsaw.png/i},
    3705: {text:"Shears",                   img_test:/collect_shears.png/i},
    3706: {text:"Needle Point",             img_test:/Unknown/i},
    3707: {text:"Spigot",                   img_test:/Unknown/i},
    3708: {text:"Pocket Watch",             img_test:/collect_pocketwatch.png/i},
    3709: {text:"Salt Shaker",              img_test:/collect_roostersaltshaker.png/i},
    3710: {text:"Thimble",                  img_test:/collect_ceramicthimble.png/i},
    3711: {text:"CowBell",                  img_test:/collect_cowbell.png/i},
    3712: {text:"Lady Bug",                 img_test:/collect_shears.png/i},
    3713: {text:"Dragonfly",                img_test:/collect_dragonfly.png/i},
    3714: {text:"Caterpillar",              img_test:/collect_caterpillar.png/i},
    3715: {text:"Stick Bug",                img_test:/collect_stickbug.png/i},
    3716: {text:"Beetle",                   img_test:/collect_beetle.png/i},
    3717: {text:"Centipede",                img_test:/collect_centipede.png/i},
    3718: {text:"Emperor Butterfly",        img_test:/Unknown/i},
    3719: {text:"Painted Lady Butterfly",   img_test:/collect_paintedlady.png/i},
    3720: {text:"Swallowtail Butterfly",    img_test:/Unknown/i},
    3721: {text:"Zebra Butterfly",          img_test:/collect_zebralongwing.png/i},
    3722: {text:"Copper Butterfly",         img_test:/collect_largecopperbutterfly.png/i},
    3723: {text:"Geene Plume",              img_test:/collect_greenfeather.png/i},
    3724: {text:"Hen Feather",              img_test:/collect_brownfeather.png/i},
    3725: {text:"Dapple Feather",           img_test:/Unknown/i},
    3726: {text:"Red Feather",              img_test:/collect_redfeather.png/i},
    3727: {text:"Banded Quill",             img_test:/collect_stripedfeather.png/i},
    3728: {text:"Blue Feather",             img_test:/collect_bluefeather.png/i},
    3729: {text:"Check Button",             img_test:/Unknown/i},
    3730: {text:"Brass Button",             img_test:/Unknown/i},
    3731: {text:"White Button",             img_test:/Unknown/i},
    3732: {text:"Jewel Button",             img_test:/collect_buttonbejeweled.png/i},
    3733: {text:"Formal Button",            img_test:/collect_buttonformalblack.png/i},
    3734: {text:"Pearl Button",             img_test:/collect_buttonabalone.png/i},
    3799: {text:"Unknown",                  img_test:/collect_/i}
    }

var FV_decorations = {
    3800: {text:"Bricks",                   img_test:/deco_brick_icon.png/i},
    3801: {text:"Nails",                    img_test:/deco_nail_icon.png/i},
    3802: {text:"Wooden Boards",            img_test:/deco_woodenboard_icon.png/i},
    3803: {text:"Horseshoes",               img_test:/deco_horseshoe_icon.png/i},
    3804: {text:"Harnesses",                img_test:/deco_harness_icon.png/i},
    3805: {text:"Bottles",                  img_test:/nursery_bottle.png/i},
    3806: {text:"Blankets",                 img_test:/nursery_blanket.png/i},
    3807: {text:"Glass Sheets",             img_test:/unknown/i},
    3808: {text:"Green Beams",              img_test:/unknown/i},
    3809: {text:"Floral Brackets",          img_test:/unknown/i},
    3810: {text:"White Trellises",          img_test:/unknown/i},
    3811: {text:"Irrigation Pipes",         img_test:/unknown/i},
    3812: {text:"Tuscany Truffles",         img_test:/tuscany_truffles_icon.png/i},
    3813: {text:"Tuscany Olives",           img_test:/tuscany_olives_icon.png/i},
    3814: {text:"Tuscany Goats Milk",       img_test:/tuscany_goatmilk_icon.png/i},
    3815: {text:"Tuscany Eggs",             img_test:/tuscany_eggs_icon.png/i},
    3816: {text:"Wedding Cake",             img_test:/tuscany_weddingcake_icon.png/i},
    3818: {text:"Pig High Art",             img_test:/tuscany_davidpig_icon.png/i},
    3819: {text:"Apollo Butterfly",         img_test:/unknown/i},
    3820: {text:"Bella Fountain",           img_test:/unknown/i},
    3821: {text:"Leaning Tower",            img_test:/building_tuscanypisa_icon.png/i},
    3822: {text:"Double Surfboard",         img_test:/tiki_surfboarddouble_icon.png/i},
    3823: {text:"Stipe Surfboard",          img_test:/tiki_surfboardstripe_icon.png/i},
    3824: {text:"Bamboo",                   img_test:/deco_japanesebarnbamboo.png/i},
    3825: {text:"Reed Thatch",              img_test:/deco_reedthatch.png/i},
    3826: {text:"Japanese Trellis",         img_test:/japanese_trellis_icon.png/i},
    3899: {text:"Unknown",                  img_test:/decorations%2F/i}

}

//collection of all the icon tests.
FV_IconTest = {};
FV_IconTest[0] = FV_general;
FV_IconTest[1] = FV_eggs;
FV_IconTest[2] = FV_flowers;
FV_IconTest[3] = FV_animals;
FV_IconTest[4] = FV_bushels;
FV_IconTest[5] = FV_collectables;
FV_IconTest[6] = FV_decorations;


/****  Start MW Respect/CrimeSpree code ****/

// Respect gift
function RespectItem(){
    this.Next       =   null;
    this.Action     =   '';
    this.Process    =   function() {

        function NextRequest(_delay1, _delay2) {
            if (bAutoRun) {
                if (Self.Next != null) {
                    iRespectCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRespect);}, getRandRange(_delay1*750,_delay1*1250));
                } else {
                    LogPush('<strong>Finished processing crime spree gifts.  Checking again in '+ _delay2 +' minutes.</strong>');
                    iRespectCurrent = setTimeout(function (e)  { EventSpan.dispatchEvent(ActionRespect);}, getRandRange(_delay2*50000,_delay2*70000));
                }
                if  (iRespectCurrent < iHoldEvent) {
                    // The browser has reset.  Cancel runaway jobs;
                    clearTimeout(iRespectCurrent);
                }
            }
        }

        function doStep1(_myUrl, _myParms) {
            var iCurrentJob, iWatchDog;

            GM_log('RespectItem doStep 1');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;
                if (iErrorCount <3) {
                    doStep1(_myUrl,_myParms);
                } else {
                    NextRequest(aParams[5],aParams[6])
                }
            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
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
                        var i1,i2, myUrl;
                        var strTemp;
                        var strDetails;

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                        strTemp     = _responseDetails.responseText;
                        i1          = strTemp.indexOf('<td class="message_body">');
                        if (i1 == -1) throw {message:"Cannot find Message_Body in page"}
                        i2          = strTemp.indexOf('<script',i1);

                        strDetails  = strTemp.slice(i1,i2);

                        LogPush('<strong>Accepting Crime Spree Gift</strong><br><table>'+strDetails+'</table>');
                        NextRequest(aParams[5],aParams[6]);

                    } catch(err) {
                        GM_log('Error: RespectItem DoStep 1 - '+err.message);
                        NextRequest(aParams[5],aParams[6]);
                    }

                }
            });

        }

        try {
            var myUrl, myParms;
            var iErrorCount;
            var iHoldEvent;
            var Self;
            var i1,i2;

            Self = this;

            // stop processing if autorun turned off
            if (bAutoRun) {

                iHoldEvent = iRespectCurrent;

                //stop the this cycle is mafia wars xw_sig is invalid
                if (xw_sig_valid == false) {
                    GM_log('aborting Respect cycle.  XW_SIG is invalid');
                    // requeue the timed jobs for and hope xw_sig get renewed
                    LogPush('<strong>XW_Sig is invalid.  Aborting Crime Spree processing.  Checking again in '+aParams[6]+' minutes.</strong>');
                    iRespectCurrent = setTimeout(function (e) { oRespectList.Erase(); EventSpan.dispatchEvent(ActionRespect);}, getRandRange(aParams[6]*50000,aParams[6]*70000));
                    if (iRespectCurrent < iHoldEvent) {
                        // The browser has reset.  Cancel runaway jobs;
                        clearTimeout(iRespectCurrent);
                    }

                } else {
                    iErrorCount = 0;

                    GM_log('accept Respect');

                    //&box_num=0&skip_req_frame=1

                    myUrl    = this.Action;
                    myParms  = 'skip_req_frame=1&first_load=1';
                    myParms += '&sf_xw_user_id='    + escape(local_xw_user_id) + '&sf_xw_sig=' + local_xw_sig;

                    doStep1(myUrl, myParms);
                }
            } else {
                GM_log('RespectItem Some one turned the swith off');
            }
        } catch(err) {
            GM_log('Error: RespectItem Main - '+err.message);
            NextRequest(aParams[5],aParams[6]);
        }
    };
};

/****  End MW Respect/CrimeSpree code ****/

/****  Start Wall Notification code ****/

// Process Wall Item

function WallItem(){
    this.Next       		=   null;
    this.Action     		=   '';
    this.BName      		=   '';
    this.ActorName			=	'';
    this.AttachmentTitle	= 	'';
    this.AppId      		=   '';
    this.Type       		=   '';
    this.Process    		=   function() {

        function NextRequest(_delay1, _delay2) {
            if (bAutoRun) {
                if (Self.Next != null) {
                    iWallCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, getRandRange(_delay1*750,_delay1*1250));
                } else {
                    iWallCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, getRandRange(_delay2*750,_delay2*1250));
                }
                if (iWallCurrent < iHoldEvent) {
                    // The browser has reset.  Cancel runaway jobs;
                    clearTimeout(iWallCurrent);
                }
            }
        }

        // Mafia Wars Wall Code

        function doMWStep1(_myUrl, _myParms) {
	    _myUrl = _myUrl.replace('facebook.mafiawars.com/mwfb','apps.facebook.com/inthemafia');
            var iCurrentJob, iWatchDog;
            GM_log('WallItem doMWStep1');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;
                if (iErrorCount <3) {
                    doMWStep1(_myUrl,_myParms);
                } else {
                    NextRequest(aParams[2],aParams[3]);
                }

            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
                method: 'GET',
                url:  _myUrl,
                headers: {
                    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-us,en;q=0.5'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1,i2, myUrl;
                        var strTemp;
                        var strDetails;

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                        strTemp =   _responseDetails.responseText;
                        i1 = strTemp.indexOf('<iframe frameborder="0" name="mafiawars"')

                        if (i1 == -1) { 
				            i1 = strTemp.indexOf('window.location.replace("');
				            if (i1 == -1) { GM_log(strTemp); throw {message:'Cannot find <iframe frameborder="0" name="mafiawars" in page:'}; }
				            i1 += 25;
				            i2 = strTemp.indexOf('"',i1);
				            myUrl = strTemp.slice(i1,i2);
				            myUrl = myUrl.replace(/\\/g,'');

                        	doMWStep1(myUrl,'');
                        } else {

                            i1 = strTemp.indexOf('src="',i1)+5;
                            i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);
                            myUrl = myUrl.replace(/&amp;/g,'&');
                            myUrl = decodeStrings(myUrl);
                            //see if we still need this later
                            myUrl = myUrl.replace(/%22/g,'"');
                            doMWStep2(myUrl,'');
                        }

                    } catch(err) {
                        GM_log('Error: WallItem doMWStep1 - '+err.message);
                        NextRequest(aParams[2],aParams[3]);
                    }
                }
            });

        }

        function doMWStep2(_myUrl, _myParms) {

            var iCurrentJob, iWatchDog;

            GM_log('WallItem doMWStep2');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;

                if (iErrorCount <3) {
                    doMWStep2(_myUrl, _myParms);
                } else {
                    NextRequest(aParams[2],aParams[3]);
                }

            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
                method: 'GET',
                url:  _myUrl,
                data: _myParms,
                headers: {
                    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-us,en;q=0.5'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1, i2, strTemp, myUrl, myParms;
                        var strNotice;

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

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

                        if (Self.Type == 'MW_Missions') {
                            GM_log('Doing Missions');
                            strNotice   = '<b>'+Wall_Data['10979261223'][Self.Type].text+': '+ Self.AttachmentTitle+'</b> ('+ Self.ActorName +')';
                            doMissionStep1(myUrl, myParms, strNotice);

                        } else if (Self.Type == 'MW_WarHelp') {
                            GM_log('Doing Wars');
                            strNotice   = '<b>'+Wall_Data['10979261223'][Self.Type].text+': '+ Self.AttachmentTitle+'</b> ('+ Self.ActorName +')';
                            doWarStep1(myUrl, myParms, strNotice);

                        } else {
                            GM_log('Doing Generic');
                            doMWStep3(myUrl,myParms);

                        }

                    } catch(err) {
                        GM_log('Error: WallItem doMWStep2 - '+err.message);
                        NextRequest(aParams[2],aParams[3]);
                    }
                }
            });
        };

        function doMWStep3(_myUrl, _myParms) {

            var iCurrentJob, iWatchDog;

            GM_log('WallItem doMWStep3');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;
                if (iErrorCount <3) {
                    doMWStep3(_myUrl, _myParms);
                } else {
                    NextRequest(aParams[2],aParams[3]);
                }
            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
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

                        var flashvars;

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                        strTemp =   _responseDetails.responseText;
                        
                        strNotice   = '<b>'+Wall_Data['10979261223'][Self.Type].text+': '+ Self.AttachmentTitle+'</b> ('+ Self.ActorName +')';

                        // simple request (ie not a war)
                        i1 = strTemp.indexOf('<td class="message_body">');
                        i2 = strTemp.indexOf('<div style=\\"color: white; font-size: 18px; margin-bottom: 10px; font-weight: bold\\">');
                        i3 = strTemp.indexOf('<div class="ach_celeb_message">');

                        if (Self.Type == 'MW_FreeGift') {
                            if (strTemp.indexOf('You have already claimed the maximum number of')!=-1)
		                        strNotice += '<br>You have already claimed the maximum number of Free Gifts for today.'
		                    else
								strNotice += '<br>Accepting Free Gifts';
							LogPush(strNotice);
							NextRequest(aParams[2],aParams[3]);
	                        
                    	} else if (Self.Type == 'MW_VegasSlots') {
                            GM_log('Doing Slots');

                            flashvars = null;

                            // Find slot values;
							if (strTemp.indexOf('var flashvars = {mw_app:"slotmachine"')!=-1) {
								i1 = strTemp.indexOf('var flashvars = {mw_app:"slotmachine"');
								i2 = strTemp.indexOf(';swfobject',i1);
								strTemp = strTemp.slice(i1,i2);
								eval(strTemp);
							} else if (strTemp.indexOf('var flashvars = {mw_app:\\"slotmachine\\"')!=-1) {
								i1 = strTemp.indexOf('var flashvars = {mw_app:\\"slotmachine\\"');
								i2 = strTemp.indexOf(';swfobject',i1);
								strTemp = strTemp.slice(i1,i2);
								strTemp = eval("'"+strTemp+"'")
								eval(strTemp);
							}
							
							if (flashvars!=null) {

                                myUrl    = flashvars.mw_supersecret_url+'/';
                                myUrl   += unescape(flashvars.spinCallback);
                                myUrl   += "&uid="+flashvars.mw_user_id;
                                myUrl   += "&betAmt=1"
                                if (flashvars.friend_id==undefined)
                                    myUrl   += "&friend_id=none"
                                else
                                    myUrl   += "&friend_id="+flashvars.friend_id
                                myUrl   += "&xw_client_id=8";
                                myParms = 'ajax=1&liteload=1'
                                myParms += '&sf_xw_sig=' + local_xw_sig;
                                myParms += '&sf_xw_user_id=' + escape(local_xw_user_id);

                                GM_log('initial free spins: '+flashvars.freeSpins);
                            
                                if (flashvars.freeSpins>0) {
                                    strNotice += '<br>Playing '+flashvars.friend_name+"'s slot machine";
                                    doSlotsStep1(myUrl, myParms, strNotice);
                                } else {
                                    strNotice += '<br>Skipping Slot machine: No Free Spins';
                                    LogPush(strNotice);
                                    NextRequest(aParams[2],aParams[3]);
                                }

                            } else {
                                GM_log('Error finding slot machine');
                                strNotice += '<br>Error finding slot machine';
                                LogPush(strNotice);
                                NextRequest(aParams[2],aParams[3]);
                            }

                        } else if (i1 != -1) {
	                        // message contains <td class="message_body">
	                        
                            i2 = strTemp.indexOf('</td>',i1);
                            strTemp = strTemp.slice(i1+25,i2);

                            if(strTemp.indexOf('<span><span>Accept')!=-1) {
	                            //This code is to look for the Accept button.  It does not exist anymore.
   	                            
	                            i1 = strTemp.indexOf('><a href="');
                                i2 = strTemp.indexOf('"',i1+10);
                                // look for button to accept the job, gift, etc

                                myUrl =  strTemp.slice(i1+10,i2) + '&xw_client_id=8';
                                myUrl =  myUrl.replace(/\s/g, '%20');

                                myParms  = 'ajax=1&liteload=1'
                                myParms += '&sf_xw_user_id=' + escape(local_xw_user_id);
                                myParms += '&sf_xw_sig=' + local_xw_sig;

                                doMWStep4(myUrl, myParms);
	                            
	                        } else if(strTemp.indexOf('You can only receive 10 free iced fight boosts per day')!=-1) {

                                i1 = strTemp.indexOf('<div style="fl');
                                i1 = strTemp.indexOf('>',i1)+1;
                                i2 = strTemp.indexOf('</div>');
                                strNotice += '<br>'+strTemp.slice(i1,i2);

                                MW_IcedBonusDelay = getCurrentTime() + 12*60;
                                strNotice += '<br>Maxium number of Iced Fight Boots have been accepted for today';

                                LogPush(strNotice);
                                NextRequest(aParams[2],aParams[3]);

                            } else if(strTemp.indexOf('has received all the help allowed for today')!=-1) {
                                i1 = strTemp.indexOf('<div style="fl');
                                i1 = strTemp.indexOf('>',i1)+1;
                                i2 = strTemp.indexOf('</div>');
                                strNotice += '<br>'+strTemp.slice(i1,i2);
                                LogPush(strNotice);
                                NextRequest(aParams[2],aParams[3]);

                            } else if (strTemp.indexOf('has passed out all')!=-1) {
                                i1 = strTemp.indexOf('<div style="fl');
                                i1 = strTemp.indexOf('>',i1)+1;
                                i2 = strTemp.indexOf('</div>');
                                strNotice += '<br>'+strTemp.slice(i1,i2);
                                LogPush(strNotice);
                                NextRequest(aParams[2],aParams[3]);
                                
                            } else if (strTemp.indexOf('<div class="ach_celeb_message">')!=-1 ) {
                                i1 = strTemp.indexOf('<div class="ach_celeb_message">');
                                i2 = strTemp.indexOf('<div style="clear: both;">',i1);
                                i2 = strTemp.indexOf('</div>',i2);
                                i2 = strTemp.indexOf('</div>',i2);
                                strNotice += '<br>'+strTemp.slice(i1,i2);
                                LogPush(strNotice);
                                NextRequest(aParams[2],aParams[3]);
                           
                            } else {
                                //Remove and scripts and white text colour
                                strTemp = strTemp.replace(/<script(.|\s)*?\/script>/g, '');
                                strTemp = strTemp.replace(/color: rgb\(255, 255, 255\)/g, '');
                                strTemp = strTemp.replace(/color: #fff/g, '');
                                strTemp = strTemp.replace(/<a(.|\s)*?\/a>/g, '');
                                strTemp = strTemp.replace(/float:(.|\s)*?\;/g, '');
                                strTemp = strTemp.replace(/<div style="position: absolute(.|\s)*?bonus.png"><\/div>/g, '');
                                
                                strNotice += '<br>'+strTemp;

                                LogPush(strNotice);
                                NextRequest(aParams[2],aParams[3]);
                            }

                        } else if (i2 != -1) {
                            i1 = strTemp.indexOf('>',i2)+1;
                            i2 = strTemp.indexOf('<div style=\\"height:',i2);
                            strTemp = strTemp.slice(i1,i2);
                            strTemp = strTemp.replace(/<div(.*?)>/g,'<div>')
                            
                            strNotice += '<br>'+strTemp;

                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                        } else if (i3 != -1) {
                            i1 = i3;
                            i2 = strTemp.indexOf('<div style="clear: both;">');
                            i2 = strTemp.indexOf('</div>',i2);
                            i2 = strTemp.indexOf('</div>',i2+1);
                            strTemp = strTemp.slice(i1,i2);

                            strNotice += '<br>'+strTemp;

                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                        } else {
                            strTemp = 'Error processing wall notification.  Cannot find results on page';
                            GM_log(strTemp);
							strNotice += '<br>'+strTemp;

                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);                        }
                    } catch(err) {
                        GM_log('Error: WallItem DoMWStep 3 - '+err.message);
                        NextRequest(aParams[2],aParams[3]);
                    }
                }
            });
        }

        function doMWStep4(_myUrl, _myParms) {

            var iCurrentJob, iWatchDog;

            GM_log('WallItem doMWStep4');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;

                if (iErrorCount <3) {
                    doMWStep4(_myUrl,_myParms);
                } else {
                    NextRequest(aParams[2],aParams[3]);
                }

            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
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
                        var i1,i2;
                        var strTemp;
                        var strNotice;

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}
                        strTemp =   _responseDetails.responseText;

                        if (strTemp.indexOf('<div class="ach_celeb_message">')!=-1) {
                            i1 = strTemp.indexOf('<div class="ach_celeb_message">');
                            i2 = strTemp.indexOf('<div class="ach_celeb_block"',i1);
                            i2 = strTemp.indexOf('<div class="ach_celeb_block"',i2+1);
                            i2 = strTemp.indexOf('<div class="ach_celeb_block"',i2+1);
                            strNotice = '<table>'+strTemp.slice(i1,i2)+'</table>';

                        } else if (strTemp.indexOf('<td class="message_body">')!=-1) {
                            i1 = strTemp.indexOf('<td class="message_body">');
                            i2 = strTemp.indexOf('</td>',i1);
                            strNotice = '<table>'+strTemp.slice(i1,i2)+'</table>';

                        } else {
                            strNotice = 'Accept button was pushed, but could not find responce.  Most likely these items are NOT WORKING (ZYNGA ISSUE).';
                        }
                        strNotice = strNotice.replace(/<script(.|\s)*?\/script>/g, '');
                        strNotice = strNotice.replace(/color: rgb\(255, 255, 255\)/g, '');
                        strNotice = strNotice.replace(/color: #fff/g, '');

                        //GM_log('strNotice = '+strNotice);

                        LogPush('<strong>'+Self.Type+'</strong><br><table>'+strNotice+'</table>');
                        NextRequest(aParams[2],aParams[3]);
                    } catch(err) {
                        GM_log('Error: WallItem DoMWStep 4 - '+err.message);
                        NextRequest(aParams[2],aParams[3]);
                    }

                }
            });

        }

         function doSlotsStep1(_myUrl, _myParms, _strNotice) {

            var iCurrentJob, iWatchDog;

            GM_log('WallItem doSlotsStep1');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;
                if (iErrorCount <3) {
                    doSlotsStep1(_myUrl, _myParms, _strNotice)
                } else {
                    NextRequest(aParams[2],aParams[3]);
                }
            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
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

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                        strTemp =   _responseDetails.responseText;

                        //find slot data
                        i1 = strTemp.indexOf('{')
                        strTemp = 'var flashvars = '+strTemp.slice(i1);
                        eval(strTemp);
                        slot_data = JSON.parse(flashvars.data)

                        //update message
                        strNotice = _strNotice + "<br>Pulling the arm";
                        if (slot_data.json_data.payout>0) strNotice +="<br>You won " + slot_data.json_data.payout+" coins";
                        if (slot_data.json_data.itemName != null ) strNotice +="<br>You Won " + slot_data.json_data.itemName;
                        if ((slot_data.json_data.msg != undefined) && (slot_data.json_data.msg != "") ) strNotice +="<br>" + slot_data.json_data.msg;

                        GM_log('free spins remaining '+slot_data.json_data.freeSpins);

                        //check for free spins
                        if (slot_data.json_data.freeSpins > 0) {
                            //spin the slot machine again.
                            doSlotsStep1(_myUrl, _myParms, strNotice)
                        } else {
                            GM_log('Slot machine out of free spins');
                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                        }

                    } catch(err) {
                        GM_log('Error: WallItem doSlotsStep1 - '+err.message);
                        NextRequest(aParams[2],aParams[3]);
                    }
                }
            });
        }



        function doMissionStep1(_myUrl, _myParms, _strNotice) {

            var iCurrentJob, iWatchDog;

            GM_log('WallItem doMissionStep1');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;
                if (iErrorCount <3) {
                    doMissionStep1(_myUrl, _myParms, _strNotice)
                } else {
                    NextRequest(aParams[2],aParams[3]);
                }
            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
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

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                        strTemp =   _responseDetails.responseText;
                        
                        if (strTemp.indexOf('Operation has expired.')!=-1) {
                            strNotice = _strNotice+'<br>Mission has expired.';
                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                        } else if (strTemp.indexOf('Sorry, this operation is already full.')!=-1) {
                            strNotice = _strNotice+'<br>Sorry, this mission is already full.';
                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                        } else if (strTemp.indexOf('Successfully joined the operation')!=-1) {
                            strNotice = _strNotice+'<br>Successfully joined the mission.';
                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                        } else if (strTemp.indexOf('You are already a member of this operation')!=-1) {
                            strNotice = _strNotice+'<br>You are already a member of this mission.';
                            LogPush(strNotice);
                        	NextRequest(aParams[2],aParams[3]);
                        } else if (strTemp.indexOf('Can only help in 10 operations at a time.')!=-1) {
                            strNotice = _strNotice+'<br>Can only help in 10 missions at a time.';
                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                        } else if (strTemp.indexOf('<div class="doTaskButton">')!=-1) {
	                        // doTaskButton will only show up if you have successfully joined a mission
                            strNotice = _strNotice+'<br>Successfully joined the mission.';
                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
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
							    GM_log('Error Reading Mission');
							    GM_log(strTemp);
							}

							if (!bSkipMission) {
								i1 = strTemp.indexOf('<div class="missionSelectorButton">');
								// process a mission request
	                            i3 = strTemp.indexOf('<div id="positionSelector"');
	                            i4 = strTemp.indexOf('</table>')+8;
	                            oDiv = document.createElement('div');
	                            oDiv.innerHTML = strTemp.slice(i3,i4)+'</div>';
	                            myUrl    = 'http://facebook.mafiawars.com/mwfb/'
	                            // find all the possible jobs
	                            i2 = 0;
	                            if (aParams[2023]=='both') {
	                                oSnapShot = getSnapshot('.//div[@class="missionSelectorButton"]',oDiv);
	                                if (oSnapShot.snapshotLength < aParams[2026]) {
	                                    oSnap = oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).innerHTML;
	                                    i1 = oSnap.indexOf('inner_page')+13;
	                                    i2 = oSnap.indexOf("'",i1);
	                                    i3 = oSnap.indexOf('<div class="positionName"');
	                                    i3 = oSnap.indexOf('http',i3);
	                                    i4 = oSnap.indexOf(')',i3);
                                        } else {
                                            i2 = -2
                                            if (aParams[2027] == 'true') {
                                                bSkipItem = false;
                                                for (var p=0;p<aMissionRetry[0].length;p++) {
                                                    if (aMissionRetry[0][p].Action.indexOf(Self.Action.slice(Self.Action.indexOf('next_params=')))!=-1) {bSkipItem = true; break;}
                                                }
                                                if (!bSkipItem) {
                                            	    var iMissionRetry = aMissionRetry[0].length;
                                            	    aMissionRetry[0][iMissionRetry] = Self;
                                            	    aMissionRetry[0][iMissionRetry].Next = null;
                                            	    aMissionRetry[1][iMissionRetry] = getCurrentTime() + 2*(oSnapShot.snapshotLength-1);
                                                    strNotice = _strNotice+'<br>Queuing Mission: <a href="'+Self.Action+'">' +strMissionName+'</a>, '+oSnapShot.snapshotLength+ ' slots open, retrying in ' +2*(oSnapShot.snapshotLength-1)+' mins.';
                                                    LogPush(strNotice);
                                                    NextRequest(aParams[2],aParams[3]);
                                                } else {
                                                    strNotice = _strNotice+'<br>Mission already in queue';
                                                    LogPush(strNotice);
                                                    NextRequest(aParams[2],aParams[3]);
                                                }
                                            } else {
                                                strNotice = _strNotice+'<br>Skipping Mission:' +strMissionName+', '+oSnapShot.snapshotLength+ ' slots open, queue not enabled,';
                                                LogPush(strNotice);
                                                NextRequest(aParams[2],aParams[3]);
                                            }
                                        }
	                            } else {
	                                oSnapShot = getSnapshot('.//div[@class="missionSelectorBox"]',oDiv);
	                                var oSnapShot2 = getSnapshot('.//div[@class="missionSelectorButton"]',oDiv);
	                                for (var i=0;i<oSnapShot.snapshotLength;i++) {
	                                    //avoid those job with two items
	                                    if ((oSnapShot.snapshotItem(i).innerHTML.indexOf('class="stamina')!=-1) && (oSnapShot.snapshotItem(i).innerHTML.indexOf('class="energy')!=-1)) {
		                                	// skip item uses both energy and stamina
	                                    } else if (oSnapShot.snapshotItem(i).innerHTML.indexOf('class="'+aParams[2023])!=-1) {
	                                        if (oSnapShot2.snapshotLength < aParams[2026]) {
	                                            oSnap = oSnapShot.snapshotItem(i).innerHTML
	                                            i1 = oSnap.indexOf('inner_page')+13;
	                                            i2 = oSnap.indexOf("'",i1);
	                                            i3 = oSnap.indexOf('<div class="positionName"');
	                                            i3 = oSnap.indexOf('http',i3);
	                                            i4 = oSnap.indexOf(')',i3);
	                                            break;
	                                        } else {
	                                            i2 = -2;
	                                            if (aParams[2027] == 'true') {
                                                    	bSkipItem = false;
                                                    	for (var p=0;p<aMissionRetry[0].length;p++) {
                                            		    if (aMissionRetry[0][p].Action.indexOf(Self.Action.slice(Self.Action.indexOf('next_params=')))!=-1) { bSkipItem = true; break;}
                                                    	}
                                                    	if (!bSkipItem) {
                                                    	    var iMissionRetry = aMissionRetry[0].length;
                                                    	    aMissionRetry[0][iMissionRetry] = Self;
                                                    	    aMissionRetry[0][iMissionRetry].Next = null;
                                                    	    aMissionRetry[1][iMissionRetry] = getCurrentTime() + 2*(oSnapShot.snapshotLength-1);
                                                            strNotice = _strNotice+'<br>Queuing Mission:' +strMissionName+', '+oSnapShot.snapshotLength+ ' slots open, retrying in ' +2*(oSnapShot.snapshotLength-1)+' mins.';
                                                            LogPush(strNotice);
                                                            NextRequest(aParams[2],aParams[3]);
                                                    	} else {
                                                            strNotice = _strNotice+'<br>Mission already in queue';
                                                            LogPush(strNotice);
                                                            NextRequest(aParams[2],aParams[3]);
                                                    	}
                                                    } else {
                                                    	strNotice = _strNotice+'<br>Skipping Mission:<a href="'+Self.Action+'">'+strMissionName+'</a>, '+oSnapShot.snapshotLength+ ' slots open, queue not enabled,';
                                                    	LogPush(strNotice);
                                                    	NextRequest(aParams[2],aParams[3]);
                                                    }
						    break;
                                            	}
	                                    }
	                                }
	                            }
	                            
	                            if (i2>0) {
	                                myUrl   += oSnap.slice(i1,i2)
	                                myUrl   +=  '&xw_client_id=8';
	
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
	                                NextRequest(aParams[2],aParams[3]);
	                            } else {}
								
				} else {
		                    strNotice = _strNotice+'<br>Secret Mission Skipped (<a href="'+Self.Action+'">'+strMissionName+'</a>)';
		                    LogPush(strNotice);
		                    NextRequest(aParams[2],aParams[3]);
		                }
	                       
                        } else {
	                        GM_log('Error processing Mission');
	                        strNotice = _strNotice+'<br>Error Processing Mission.';
	                        LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                        }
                        
                    } catch(err) {
                        GM_log('Error: WallItem doMissionStep1 - '+err.message);
                        NextRequest(aParams[2],aParams[3]);
                    }
                }
            });
        }

        function doWarStep1(_myUrl, _myParms, _strNotice) {

            var iCurrentJob, iWatchDog;

            GM_log('WallItem doWarStep1');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;

                if (iErrorCount <3) {
                    doWarStep1(_myUrl, _myParms, _strNotice);
                } else {
                    NextRequest(aParams[2],aParams[3]);
                }

            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
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

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                        // all of the responce
                        strTemp =   _responseDetails.responseText;

                        //Done notice
                        if (strTemp.indexOf('You Have Already Participated')!=-1) {
                            strNotice = _strNotice+'<br>You Have Already Participated.';
                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                        } else if (strTemp.indexOf('This war is already over')!=-1) {
                            strNotice = _strNotice+'<br>This war is already over';
                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                        } else if (strTemp.indexOf('You won the fight and eliminated')!=-1) {
                            i1 = strTemp.indexOf('You won the fight and eliminated ');
                            i2 = strTemp.indexOf('reward',i1)+7;
                            strNotice = _strNotice+'<br>'+strTemp.slice(i1,i2);
                            i1 = strTemp.indexOf('helpers_rewards');
                            i1 = strTemp.indexOf('<img',i1);
                            i2 = strTemp.indexOf('>',i1)
                            if (i1!=-1) strNotice += ' : ' + strTemp.slice(i1,i2);
                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                        } else {
                            //look for reward type
                            i1 = strTemp.indexOf('<div class="helpers_rewards">');
                            i1 = strTemp.indexOf('title="',i1)+7;
                            i2 = strTemp.indexOf('"',i1);
                            strWarReward = strTemp.slice(i1,i2);

                            bSkipItem = true;

                            if (aParams[2200]==true) {
                                // All items option
                                bSkipItem = false
                            } else {
                                // Check reward against those desired
                                for (var s=2201;s<2217;s++) {
                                    if ((strWarReward.indexOf(MW_WarList[s].test)!=-1) && ((aParams[s]==true))) bSkipItem = false;
                                }
                            }
                            if (bSkipItem==true) {
                                strNotice = _strNotice+'<br>War skipped wrong reward offered: ' +strWarReward;
                                LogPush(strNotice);
                                NextRequest(aParams[2],aParams[3]);
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
                                        strWarNotice = strWarMessage.slice(0,i2);
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
                                if (aParams[212]==false)
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
                                    GM_log('no one to Attack');

                                    if (strWarNotice != '') strNotice   += '<br>'+strWarNotice;
                                    strNotice   = _strNotice+'<br>War is over.  No one to attack';

                                    LogPush(strNotice);
                                    NextRequest(aParams[2],aParams[3]);
                                } else {
                                    // attemp to attack
                                    GM_log('Attemp to attack');

                                    if (strWarNotice != '') strNotice   += '<br>'+strWarNotice;
                                    strNotice = _strNotice+'<br>Found '+oSnapShot.snapshotLength+' Person/People to attack';

                                    // look for local_xw_sig

                                    myUrl    =  oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).href
                                    myUrl   +=  '&xw_client_id=8';

                                    myParms  = 'ajax=1&liteload=1'
                                    myParms += '&sf_xw_user_id=' + escape(local_xw_user_id);
                                    myParms += '&sf_xw_sig=' + local_xw_sig;

                                    doWarStep1(myUrl, myParms, strNotice);
                                }
                            }
                        }
                    } catch(err) {
                        GM_log('Error: WallItem DoWarStep 1 - '+err.message);
                        NextRequest(aParams[2],aParams[3]);
                    }
                }
            });
        }



        // FarmVille Code Sections
        function doFVStep1(_myUrl, _myParms) {

            var iCurrentJob, iWatchDog;

            GM_log('WallItem doFVStep1');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;
                if (iErrorCount <3) {
                    doFVStep1(_myUrl,_myParms);
                } else {
                    NextRequest(aParams[2],aParams[3]);
                }

            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
                method: 'GET',
                url:  _myUrl,
                headers: {
                    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-us,en;q=0.5'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1,i2, myUrl, myUrl2;
                        var strTemp;

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                        strTemp =   _responseDetails.responseText;
                        i1 = strTemp.indexOf('window.location.replace("')+25;
                        i2 = strTemp.indexOf('");<',i1);
                        myUrl = eval("'"+strTemp.slice(i1,i2)+"'");
                        doFVStep2(myUrl,'');

                    } catch(err) {
                        GM_log('Error: WallItem DoFVStep 1 - '+err.message);
                        NextRequest(aParams[2],aParams[3]);
                    }

                }
            });

        }

        function doFVStep2(_myUrl, _myParms) {

            var iCurrentJob, iWatchDog;

            GM_log('WallItem doFVStep2');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;
                if (iErrorCount <3) {
                    doFVStep2(_myUrl, _myParms);
                } else {
                    NextRequest(aParams[2],aParams[3]);
                }
            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
                 method: 'GET',
                 url:  _myUrl,
                 headers: {
                     'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                     'Accept-Language': 'en-us,en;q=0.5'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1,i2, myUrl, myParms;
                        var strTemp, strName, strValue;
                        var strNotice;
                        var bProcess;

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

                        strNotice = '';

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                        strTemp =   _responseDetails.responseText;

                        // get URL
                        i1 = strTemp.indexOf('href="')

                        if (i1 == -1) throw {message:'Cannot find href=" in page'}

                        i1 += 6;
                        i2 = strTemp.indexOf('"',i1);
                        myUrl = strTemp.slice(i1,i2);
                        myUrl = myUrl.replace(/&amp;/g,'&');

                        // look for gift message

                        i1 = strTemp.indexOf('<div class="main_giftConfirm_cont">');
                        if (i1 == -1) throw {message:'Cannot fin <div class="main_giftConfirm_cont"> in page'}

                        // Extract Message
                        i2 = strTemp.indexOf('<div class="gift_box_holder">',i1);

                        if (i2 ==-1)
                            //Text only message
                            i1 +=35
                        else
                            //Text with an Icon
                            i1  = i2;

                        i2 = strTemp.indexOf('<div class="inner_giftConfirm_cont">',i1);

                        strNotice = strTemp.slice(i1,i2);
                        strNotice = strNotice.replace(/<\/h3>|<h3>/g,'')

                        bProcess = null;

                        //test to see if we should continue
                        for (var GROUP in FV_IconTest) {
                            for (var ID in FV_IconTest[GROUP]) {
                                if (FV_IconTest[GROUP][ID].img_test(strNotice)) {
                                    bProcess = aParams[ID];
                                    if (bProcess == false) LogPush('FV: Skipping '+FV_IconTest[GROUP][ID].text)
                                    break;
                                }
                            }
                            if (bProcess !=null) break
                        }

                        if (bProcess == false) {
                            NextRequest(aParams[2],aParams[3]);
                        } else {
                            // process this item

                            // Extract forms
                            i1 = strTemp.indexOf('<form',i1);
                            i2 = strTemp.indexOf('<form',i1+5);
                            if (i2 != -1) {
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
                                doFVStep3(myUrl,myParms,strNotice);
                            } else {
                                // too late
                                strNotice += '<br>Already Accepted or Expired';
                                LogPush('<b>'+Self.Type+'</b><br>'+strNotice);
                                NextRequest(aParams[2],aParams[3]);
                            }
                        }
                    } catch(err) {
                        GM_log('Error: WallItem DoFVStep 2 - '+err.message);
                        NextRequest(aParams[2],aParams[3]);
                    }

                }
            });

        }

        function doFVStep3(_myUrl, _myParms,_strNotice) {

            var iCurrentJob, iWatchDog;

            GM_log('WallItem doFVStep3');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;
                if (iErrorCount <3) {
                    doFVStep3(_myUrl, _myParms, _strNotice);
                } else {
                    NextRequest(aParams[2],aParams[3]);
                }
            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
                 method: 'POST',
                 url:   _myUrl,
                 data:  _myParms,
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

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;
                        strNotice = '';

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}
                        strTemp =   _responseDetails.responseText;

                        i1 = strTemp.indexOf('window.location.replace(');

                        if (i1 == -1) throw {message:"Cannot find window.location.replace( in page"}
                        i1 += 25;
                        i2 = strTemp.indexOf(');<',i1);
                        myUrl = eval("'"+strTemp.slice(i1,i2)+"'");

                        doFVStep4(myUrl,'',_strNotice);

                    } catch(err) {
                        if (_strNotice != '')  strNotice = _strNotice +'<br>';
                        strNotice += 'Failed';

                        LogPush('<b>'+Self.Type+'</b><br>'+strNotice);

                        GM_log('Error: WallItem DoFVStep 3 - '+err.message);
                        NextRequest(aParams[2],aParams[3]);
                    }

                }
            });

        }

        function doFVStep4(_myUrl, _myParms, _strNotice) {

            var iCurrentJob, iWatchDog;

            GM_log('WallItem doFVStep4');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;
                if (iErrorCount <3) {
                    doFVStep4(_myUrl, _myParms, _strNotice);
                } else {
                    NextRequest(aParams[2],aParams[3]);
                }
            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
                 method: 'GET',
                 url:  _myUrl,
                 headers: {
                     'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                     'Accept-Language': 'en-us,en;q=0.5'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1,i2, myUrl;
                        var strTemp;
                        var strNotice;

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;
                        strNotice = '';

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                        if (_strNotice != '')  strNotice = _strNotice +'<br>';
                        strNotice += '<b><font color=green>Actioned</font></b> ('+Self.BName+')';

                        LogPush('<b>'+Self.Type+'</b><br>'+strNotice);
                        NextRequest(aParams[2],aParams[3]);
                    } catch(err) {
                        if (_strNotice != '')  strNotice = _strNotice +'<br>';
                        strNotice += '<b><font color=red>Failed</font></b>';

                        LogPush('<b>'+Self.Type+'</b><br>'+strNotice);

                        GM_log('Error: WallItem DoFVStep 2 - '+err.message);
                        NextRequest(aParams[2],aParams[3]);
                    }

                }
            });

        }

        // main code
        var iHoldEvent;
        var myUrl;
        var nextParms;

        var xmlhttp;
        var iErrorCount;
        var bSkipItem;

        var Self;

        try {
            GM_log('Wall Notifications Start - '+iWallCurrent);

            Self = this;

            bSkipItem = false;

            // stop processing if autorun turned off
            if (bAutoRun) {

                iHoldEvent = iWallCurrent;

                // ignore things if MW is not valid

                switch (this.AppId) {
                    case 10979261223:
                        iErrorCount = 0;
                        GM_log('proccess Wall Notification');

                        // fixing href
                        // remove //apps.facebook.com/inthemafia/http&?ref=nf#58;
                        this.Action = this.Action.replace(/\/\/apps.facebook.com\/inthemafia\/http&\?ref=nf#58;/g,'')

                        if (Self.Type == "MW_IcedBonus") {
                            if (getCurrentTime()>MW_IcedBonusDelay) {
                                doMWStep1(this.Action,'')
                            } else {
                                GM_log('MW skipping Iced Boost');
                                NextRequest(aParams[2],aParams[3]);
                            }

                        } else {
                            doMWStep1(this.Action,'');
                        }
                        break;

                    case 102452128776:
                        // FarmVille
                        // Ignore some types of jobs based on settings
                        iErrorCount = 0;
                        GM_log('proccess Wall Notification');
                        doFVStep1(this.Action,'');
                        break;
                }
            } else {
                GM_log('WallItem: Some one turned the swith off');
            }
        } catch(err) {
            GM_log('Error: WallItem Main - '+err.message);
            NextRequest(aParams[2],aParams[3]);
        }
    }
}

// Request Item

function RequestItem () {
    this.Action     =   '';
    this.Reject     =   '';
    this.Parms      =   '';
    this.From       =   '';
    this.Giftname   =   '';
    this.Gifttype   =   '';
    this.Next       =   null;
    this.Process    =   function() {

        function NextRequest(_delay1, _delay2) {
            if (bAutoRun) {
                if (Self.Next != null) {
                    iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(_delay1*750,_delay1*1250));
                } else {
                    LogPush('<strong>Finished processing Requests.  Checking again in '+ _delay2 +' minutes.</strong>');
                    iRequestCurrent = setTimeout(function (e)  { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(_delay2*50000,_delay2*70000));
                }
                if  (iRequestCurrent < iHoldEvent) {
                    // The browser has reset.  Cancel runaway jobs;
                    clearTimeout(iRequestCurrent);
                }
            }
        }

        // Mafia Wars Code

        function MW_AcceptMission() {

            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptMission doStep 1');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep1(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {



                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            if (oDetails.payload.msg == null) {
                                myUrl = "";
                                for (var i=0;i<oDetails.onload.length;i++) {
                                    if (oDetails.onload[i].indexOf('goURI')!=-1) {
                                        eval("myUrl = " + oDetails.onload[i].slice(6,-2))
                                    }
                                }
                                if (myUrl == "") throw {message:"Cannot find goURI in page"}

                                doStep2(myUrl,'');

                            } else {
                               // and error has occured while trying to process the request.
                                GM_log('Msg = '+oDetails.payload.msg);

                                strDetails  = '<b>Mafia Wars Accept Mission:</b><br>'
                                strDetails += oDetails.payload.msg;

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }

                        } catch(err) {
                            GM_log('Error: MW_AcceptMission DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep2(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptMission doStep 2');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep2(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:  _myUrl,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp =   _responseDetails.responseText;
                            i1 = strTemp.indexOf('<iframe frameborder="0" name="mafiawars" ')
                            if (i1 == -1) { 
				                i1 = strTemp.indexOf('window.location.replace("');
				                if (i1 == -1) { GM_log(strTemp); throw {message:'Cannot find <iframe frameborder="0" name="mafiawars" in page:'}; }
				                i1 += 25;
				                i2 = strTemp.indexOf('"',i1);
				                myUrl = strTemp.slice(i1,i2);
				                myUrl = myUrl.replace(/\\/g,'');

                                doStep2(myUrl,'');
                            } else {
	
                                i1 = strTemp.indexOf('src="',i1)+5;
                            	i2 = strTemp.indexOf('"',i1);
                            	myUrl = strTemp.slice(i1,i2);
                            	myUrl = myUrl.replace(/&amp;/g,'&');

                            	doStep3(myUrl,'');
                            }

                        } catch(err) {
                            GM_log('Error: MW_AcceptMission DoStep 2 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep3(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptMission doStep 3');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep3(_myUrl, _myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1, i2, strTemp, myUrl, myParms;
                            var strNotice;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                            i1 = strTemp.indexOf('action="');

                            if (i1 == -1) throw {message:"Cannot find action= in page"};

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
                            strNotice   = '<b>Mafia Wars Social Mission:</b>'
                            doMissionStep1(myUrl,myParms,strNotice);
                        } catch(err) {
                            GM_log('Error: MW_AcceptMission DoStep 3 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            };

            function doMissionStep1(_myUrl, _myParms, _strNotice) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptMission doMissionStep1');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;
                    if (iErrorCount <3) {
                        doMissionStep1(_myUrl, _myParms, _strNotice)
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }
                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
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

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

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
	                            LogPush(strNotice);
	                            NextRequest(aParams[0],aParams[1]);
	                        } else if (strTemp.indexOf('You are already a member of this operation')!=-1) {
	                            strNotice = _strNotice+'<br>You are already a member of this mission.';
	                            LogPush(strNotice);
	                            NextRequest(aParams[0],aParams[1]);
	                        } else if (strTemp.indexOf('Can only help in 10 operations at a time.')!=-1) {
	                            strNotice = _strNotice+'<br>Can only help in 10 missions at a time.';
	                            LogPush(strNotice);
	                            NextRequest(aParams[0],aParams[1]);
	                        } else if (strTemp.indexOf('<div class="doTaskButton">')!=-1) {
		                        // doTaskButton will only show up if you have successfully joined a mission
	                            strNotice = _strNotice+'<br>Successfully joined the mission.';
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
								    GM_log('Error Reading Mission');
								    GM_log(strTemp);
								}
								
								if (!bSkipMission) {
								    i1 = strTemp.indexOf('<div class="missionSelectorButton">');
								    // process a mission request
	                               i3 = strTemp.indexOf('<div id="positionSelector"');
	                               i4 = strTemp.indexOf('</table>')+8;
	                               oDiv = document.createElement('div');
	                               oDiv.innerHTML = strTemp.slice(i3,i4)+'</div>';
	                               myUrl    = 'http://facebook.mafiawars.com/mwfb/'
	                               // find all the possible jobs
	                               i2 = 0;
	                               if (aParams[2023]=='both') {
	                                   oSnapShot = getSnapshot('.//div[@class="missionSelectorButton"]',oDiv);
	                                   if (oSnapShot.snapshotLength < aParams[2026]) {
	                                       oSnap = oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).innerHTML;
	                                       i1 = oSnap.indexOf('inner_page')+13;
	                                       i2 = oSnap.indexOf("'",i1);
	                                       i3 = oSnap.indexOf('<div class="positionName"');
	                                       i3 = oSnap.indexOf('http',i3);
	                                       i4 = oSnap.indexOf(')',i3);
                                        } else {
                                            i2 = -2
                                            if (aParams[2027] == 'true') {
                                                bSkipItem = false;
                                                for (var p=0;p<aMissionRetry[0].length;p++) {
				                                    if (aMissionRetry[0][p].Action.indexOf(Self.Action.slice(Self.Action.indexOf('next_params=')))!=-1) {bSkipItem = true; break;}
				                                }
				                                if (!bSkipItem) {
				                                    var iMissionRetry = aMissionRetry[0].length;
				                                    var oWall = new WallItem();
				                                    oWall.Action = Self.Action
				                                    oWall.Type = 'MW_Missions'
				                                    oWall.AppId = 10979261223;
				                                    aMissionRetry[0][iMissionRetry] = oWall;
				                                    aMissionRetry[0][iMissionRetry].Next = null;
				                                    aMissionRetry[1][iMissionRetry] = getCurrentTime() + 2*(oSnapShot.snapshotLength-1);
                                                    strNotice = _strNotice+'<br>Queuing Mission: <a href="'+Self.Action+'">' +strMissionName+'</a>, '+oSnapShot.snapshotLength+ ' slots open, retrying in ' +2*(oSnapShot.snapshotLength-1)+' mins.';
                                                    LogPush(strNotice);
                                                    NextRequest(aParams[0],aParams[1]);
				                                } else {
                                                    strNotice = _strNotice+'<br>Mission already in queue';
                                                    LogPush(strNotice);
                                                    NextRequest(aParams[0],aParams[1]);
				                                }
                                            } else {
                                                strNotice = _strNotice+'<br>Skipping Mission:' +strMissionName+', '+oSnapShot.snapshotLength+ ' slots open, queue not enabled,';
                                                LogPush(strNotice);
                                                NextRequest(aParams[0],aParams[1]);
                                            }
                                        }
	                               } else {
                                        oSnapShot = getSnapshot('.//div[@class="missionSelectorBox"]',oDiv);
                                        var oSnapShot2 = getSnapshot('.//div[@class="missionSelectorButton"]',oDiv);
                                        for (var i=0;i<oSnapShot.snapshotLength;i++) {
	                                       //avoid those job with two items
	                                       if ((oSnapShot.snapshotItem(i).innerHTML.indexOf('class="stamina')!=-1) && (oSnapShot.snapshotItem(i).innerHTML.indexOf('class="energy')!=-1)) {
		                                	// skip item uses both energy and stamina
                                	       } else if (oSnapShot.snapshotItem(i).innerHTML.indexOf('class="'+aParams[2023])!=-1) {
                                                if (oSnapShot2.snapshotLength < aParams[2026]) {
	                                               oSnap = oSnapShot.snapshotItem(i).innerHTML
	                                               i1 = oSnap.indexOf('inner_page')+13;
	                                               i2 = oSnap.indexOf("'",i1);
	                                               i3 = oSnap.indexOf('<div class="positionName"');
	                                               i3 = oSnap.indexOf('http',i3);
	                                               i4 = oSnap.indexOf(')',i3);
	                                               break;
                                                } else {
                                                    i2 = -2;
                                                    if (aParams[2027] == 'true') {
                                                        bSkipItem = false;
                                                        for (var p=0;p<aMissionRetry[0].length;p++) {
				                                            if (aMissionRetry[0][p].Action.indexOf(Self.Action.slice(Self.Action.indexOf('next_params=')))!=-1) { bSkipItem = true; break;}
				                                        }
				                                        if (!bSkipItem) {
				                                            var iMissionRetry = aMissionRetry[0].length;
				                                            var oWall = new WallItem();
				                                            oWall.Action = Self.Action
				                                            oWall.Type = 'MW_Missions'
				                                            oWall.AppId = 10979261223;
				                                            aMissionRetry[0][iMissionRetry] = oWall;
				                                            aMissionRetry[0][iMissionRetry].Next = null;
				                                            aMissionRetry[1][iMissionRetry] = getCurrentTime() + 2*(oSnapShot.snapshotLength-1);
                                                            strNotice = _strNotice+'<br>Queuing Mission: <a href="'+Self.Action+'">' +strMissionName+'</a>, '+oSnapShot.snapshotLength+ ' slots open, retrying in ' +2*(oSnapShot.snapshotLength-1)+' mins.';
                                                            LogPush(strNotice);
                                                            NextRequest(aParams[0],aParams[1]);
				                                        } else {
                                                            strNotice = _strNotice+'<br>Mission already in queue';
                                                            LogPush(strNotice);
                                                            NextRequest(aParams[0],aParams[1]);
				                                        }
                                                    } else {
                                                        strNotice = _strNotice+'<br>Skipping Mission:' +strMissionName+', '+oSnapShot.snapshotLength+ ' slots open, queue not enabled,';
                                                        LogPush(strNotice);
                                                        NextRequest(aParams[0],aParams[1]);
                                                    }
						    break;
                                                }
	                                       }
	                                   }
	                               }
	                            
	                               if (i2>0) {
	                                   myUrl   += oSnap.slice(i1,i2)
	                                   myUrl   +=  '&xw_client_id=8';
	
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
		                        GM_log('Error processing Mission');
		                        strNotice = _strNotice+'<br>Error Processing Mission.';
		                        LogPush(strNotice);
   	                            NextRequest(aParams[0],aParams[1]);
		                    }
	                        
                        } catch(err) {
                            GM_log('Error: MW_AcceptMission doMissionStep1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }

            try {
                GM_log('MW_AcceptMission Gift Main');
                iErrorCount =0 ;

                doStep1(strBase,Self.Parms);

            } catch(err) {
                GM_log('Error: MW_AcceptMission main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }

        }

        function MW_AcceptGift() {

            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptGift doStep 1');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep1(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {



                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            if (oDetails.payload.msg == null) {
                                myUrl = "";
                                for (var i=0;i<oDetails.onload.length;i++) {
                                    if (oDetails.onload[i].indexOf('goURI')!=-1) {
                                        eval("myUrl = " + oDetails.onload[i].slice(6,-2))
                                    }
                                }
                                if (myUrl == "") throw {message:"Cannot find goURI in page"}

                                doStep2(myUrl,'');

                            } else {
                               // and error has occured while trying to process the request.
                                GM_log('Msg = '+oDetails.payload.msg);

                                strDetails  = '<b>Mafia Wars Accept Gift:</b><br>'
                                strDetails += oDetails.payload.msg;

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }

                        } catch(err) {
                            GM_log('Error: MW_AcceptGift DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep2(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptGift doStep 2');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep2(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:  _myUrl,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp =   _responseDetails.responseText;
                            i1 = strTemp.indexOf('<iframe frameborder="0" name="mafiawars" ')

                            if (i1 == -1) { 
				                i1 = strTemp.indexOf('window.location.replace("');
				                if (i1 == -1) { GM_log(strTemp); throw {message:'Cannot find <iframe frameborder="0" name="mafiawars" in page:'}; }
				                i1 += 25;
				                i2 = strTemp.indexOf('"',i1);
				                myUrl = strTemp.slice(i1,i2);
				                myUrl = myUrl.replace(/\\/g,'');

                                doStep2(myUrl,'');
                            } else {
	
                                i1 = strTemp.indexOf('src="',i1)+5;
                            	i2 = strTemp.indexOf('"',i1);
                            	myUrl = strTemp.slice(i1,i2);
                            	myUrl = myUrl.replace(/&amp;/g,'&');

                            	doStep3(myUrl,'');
                            }
                        } catch(err) {
                            GM_log('Error: MW_AcceptGift DoStep 2 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep3(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptGift doStep 3');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep3(_myUrl, _myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1, i2, strTemp, myUrl, myParms;

                            clearTimeout(iWatchDog);
                                iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                            i1 = strTemp.indexOf('action="');

                            if (i1 == -1) throw {message:"Cannot find action= in page"};

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
                            GM_log('Error: MW_AcceptGift DoStep 3 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            };

            function doStep4(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptGift doStep 4');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep4(_myUrl, _myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
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
                            var i1,i2,i3,i4,i5, myUrl;
                            var strTemp;
                            var strNotice;
                            var stopit;

                            var oDiv, oSnapShot;
                            var GiftItem;
                            var strAppKey;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}


                            strTemp = _responseDetails.responseText;

                            if (strTemp.indexOf("You cannot accept any more Free Gifts today")>-1) {

                                //You cannot accept any more Free Gifts today You can accept more in 14 hours.

                                i1 = strTemp.indexOf('You cannot accept any more Free Gifts today');
                                i2 = strTemp.indexOf(' hour',i1)+5;

                                strNotice = "<b>Mafia Wars Accept Gift:</b><br>" + strTemp.slice(i1,i2);

                                i1 = strTemp.indexOf('more in ',i1)+8;
                                i2 = strTemp.indexOf(' hour',i1)

                                MW_FreeGiftsDelay = getCurrentTime() + 60*strTemp.slice(i1,i2);

                                LogPush(strNotice);
                                NextRequest(aParams[0],aParams[1]);

                            } else if (strTemp.indexOf("You cannot accept any more free Racks of Chips today")>-1) {

                                //You cannot accept any more free Racks of Chips today. You can accept 10 more in 16 hours.

                                i1 = strTemp.indexOf('You cannot accept any more free Racks of Chips today');
                                i2 = strTemp.indexOf(' hour',i1)+5;
                                strNotice = "<b>Mafia Wars Accept Gift:</b><br>" + strTemp.slice(i1,i2);

                                i1 = strTemp.indexOf('more in ',i1)+8;
                                i2 = strTemp.indexOf(' hour',i1)

                                MW_RackOfChipDelay = getCurrentTime() + 60*strTemp.slice(i1,i2);

                                LogPush(strNotice);
                                NextRequest(aParams[0],aParams[1]);

                            } else if (strTemp.indexOf("This gift has expired! Make sure to accept your gifts right away")>-1) {
                                //GM_log(strTemp)

                                strNotice = "<b>Mafia Wars Accept Gift:</b><br>This gift has expired! Make sure to accept your gifts right away"

                                LogPush(strNotice);
                                NextRequest(aParams[0],aParams[1]);

                            } else if (strTemp.indexOf("Your friend has sent you more than 1 free gift in a day")>-1) {

                                strNotice = "<b>Mafia Wars Accept Gift:</b><br>Your friend has sent you more than 1 free gift in a day"

                                LogPush(strNotice);
                                NextRequest(aParams[0],aParams[1]);

                            } else {

                                //Check for Larger Black Gift Screen.

                                // normal gift
                                i1 = strTemp.indexOf('<div style="border-bottom: 1px dotted #999; margin: 10px auto; text-align: center; font-size: 20px; padding-bottom: 10px;">');
                                i2 = strTemp.indexOf('<div style="border-bottom: 1px dotted #333; margin: 10px auto; text-align: left; font-size: 18px; padding: 10px 0;">');
                                i3 = strTemp.indexOf('<div id="asn_social_job_classic_jobs">');
                                i4 = strTemp.indexOf('<div style="border: 1px solid #666666; padding:10px; background-color:black;">');

                                //normal gift
                                if (i1!=-1) {

                                    i1 = strTemp.indexOf('<div style="float: left;">',i1);
                                    i2 = strTemp.indexOf('</div>',i1);

                                    strNotice  = '<table><tbody><tr><td colspan="3">';
                                    strNotice += strTemp.slice(i1,i2);
                                    strNotice += '</td></tr><tr><td style="width: 130px; text-align: center;">';

                                    i1 = strTemp.indexOf('<img src=',i2);
                                    i2 = strTemp.indexOf('</div>',i1);
                                    strNotice += strTemp.slice(i1,i2+6);
                                    strNotice += '</td><td width="50"><img src="http://mwfb.static.zynga.com/mwfb/graphics/gift_loop_arrow_green_39x50_01.png"></td><td>';

                                    i1 = strTemp.indexOf('<div style="float: left; text-align: center; width: 200px; padding-top: 55px;">',i2);
                                    i1 = strTemp.indexOf('<a',i1)
                                    i2 = strTemp.indexOf('<fb:profile-pic',i1);

                                    strNotice += '<div style="float: left; text-align: center; width: 200px;">';
                                    strNotice += strTemp.slice(i1,i2);
                                    strNotice += '<img src="http://static.ak.connect.facebook.com/pics/t_silhouette.jpg">';

                                    i1 = strTemp.indexOf('</a>',i2);
                                    i2 = strTemp.indexOf('</div>',i1);
                                    strNotice += strTemp.slice(i1,i2);
                                    strNotice += '</div></td></tr>';

                                    GiftItem    = '<b>Mafia Wars Accept Gift:</b><table>'+strNotice+'</table>';

                                    // look for regift button

                                    i1 = strTemp.indexOf('<iframe style="border:0;" id="giftback_iframe"');

                                    if ( (i1==-1) || (MW_SendThanksDelay > getCurrentTime())) {
                                        LogPush(GiftItem);
                                        NextRequest(aParams[0],aParams[1]);
                                    } else {

                                        myUrl    =  'http://facebook.mafiawars.com/mwfb/';

                                        i1       =  strTemp.indexOf('remote/html_server.php',i1);
                                        i2       =  strTemp.indexOf("'",i1);

                                        myUrl   +=  strTemp.slice(i1,i2);
                                        myUrl   +=  '&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1';

                                        myParms = '&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;

                                        i1       =  strTemp.indexOf('FB.Facebook.init("');
                                        if (i1!=-1) {
                                            i1          += 18;
                                            i2           = strTemp.indexOf('"',i1);
                                            strAppKey    = strTemp.slice(i1,i2);
                                        }

                                        doStep5(myUrl,myParms,GiftItem,strAppKey);

                                    }

                                // mystery gift
                                } else  if (i2!=-1) {

                                    i1 = strTemp.indexOf('<div style="float: left;">',i2);
                                    i2 = strTemp.indexOf('</div>',i1);

                                    strNotice  = '<table><tbody><tr><td colspan="3">';
                                    strNotice += strTemp.slice(i1,i2);
                                    strNotice += '</td></tr><tr><td style="width: 130px; text-align: center;">';

                                    i1 = strTemp.indexOf('<img src=',i2);
                                    i2 = strTemp.indexOf('>',i1);
                                    strNotice += strTemp.slice(i1,i2+1);
                                    i1 = strTemp.indexOf('<div',i2);
                                    i1 = strTemp.indexOf('<div',i1+1);
                                    i2 = strTemp.indexOf('</div>',i1);
                                    strNotice += strTemp.slice(i1,i2+6);

                                    strNotice += '</td><td width="50"><img src="http://mwfb.static.zynga.com/mwfb/graphics/gift_loop_arrow_green_39x50_01.png"></td><td>';

                                    i1 = strTemp.indexOf('<div style="float: left; text-align: center; width: 200px; padding-top: 55px;">',i2);
                                    i1 = strTemp.indexOf('<a',i1)
                                    i2 = strTemp.indexOf('<fb:profile-pic',i1);

                                    strNotice += '<div style="float: left; text-align: center; width: 200px;">';
                                    strNotice += strTemp.slice(i1,i2);
                                    strNotice += '<img src="http://static.ak.connect.facebook.com/pics/t_silhouette.jpg">';

                                    i1 = strTemp.indexOf('</a>',i2);
                                    i2 = strTemp.indexOf('</div>',i1);
                                    strNotice += strTemp.slice(i1,i2);
                                    strNotice += '</div></td></tr>';

                                    GiftItem    = '<b>Mafia Wars Accept Gift:</b><table>'+strNotice+'</table>';

                                    // look for regift button
                                    i1 = strTemp.indexOf('html_server.php?xw_controller=freegifts&xw_action=giftback_iframe');
                                    if ( (i1==-1) || (MW_SendThanksDelay > getCurrentTime())) {
                                        LogPush(GiftItem);
                                        NextRequest(aParams[0],aParams[1]);
                                    } else {
                                        myUrl    =  'http://facebook.mafiawars.com/mwfb/remote/';

                                        i2       =  strTemp.indexOf("'",i1);

                                        myUrl   +=  strTemp.slice(i1,i2);

                                        myParms = 'ajax=1&liteload=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;

                                        i1       =  strTemp.indexOf('FB.Facebook.init("');
                                        if (i1!=-1) {
                                            i1          += 18;
                                            i2           = strTemp.indexOf('"',i1);
                                            strAppKey    = strTemp.slice(i1,i2);
                                        }

                                        doStep5(myUrl,myParms,GiftItem,strAppKey);

                                    }

                                } else if (i3!=-1) {
                                    i1 = i3;
                                    i2 = strTemp.indexOf('<div style="float:right;width:150px;padding',i1);
                                    strNotice = strTemp.slice(i1,i2);
                                    GiftItem    = '<b>Mafia Wars Accept Gift:</b><table>'+strNotice+'</table>';

                                    //test for limit on boost.  Span will be missing if limit reached
                                    if (strNotice.indexOf('<span style="font-size:12px; color:#A6A6A6">') == -1) {
                                        GM_log('Start Delay for accepting 2X boosts');
                                        //Look again in 24 hours
                                        MW_2XBoostDelay = getCurrentTime() + 24*60;
                                        GiftItem += '<br>Maxium number of 2X boosts have been accepted for today';
                                    }

                                    LogPush(GiftItem);

                                    NextRequest(aParams[0],aParams[1]);

                                } else if (i4!=-1) {
                                   i1 = strTemp.indexOf('>',i4)+1;
                                   i2 = strTemp.indexOf('<div style=', i1);

                                   strNotice = strTemp.slice(i1,i2);
                                   GiftItem    = '<b>Mafia Wars Accept Gift:</b><table><div>'+strNotice+'</table>';

                                   //test limit on super pignats
                                   if (strNotice.indexOf("reached your limit for Time Capsules today") !=-1) {
                                        GM_log('Start Delay for accepting Time Capsules');
                                        //Look again in 24 hours
                                        MW_SuperPigDelay = getCurrentTime() + 24*60;
                                        GM_log('MW_SuperPigDelay = '+MW_SuperPigDelay +' getCurrentTime() = '+getCurrentTime());

                                        GiftItem += '<br>Maxium number of Time Capsules have been accepted for today';
                                    }

                                    if (strNotice.indexOf("You've reached your limit for Secret Drops today") !=-1) {
                                        GM_log('Start Delay for accepting Secret Stashes');
                                        //Look again in 24 hours
                                        MW_SecretDropDelay = getCurrentTime() + 24*60;
                                        GiftItem += '<br>Maxium number of Secret Drops have been accepted for today';
                                    }


                                   LogPush(GiftItem);

                                   NextRequest(aParams[0],aParams[1]);

                                } else {

                                    i1 = strTemp.indexOf('<td class="message_body">');
                                    if (i1 == -1) throw {message:"Cannot find Message_Body in page"}
                                    i1 += 25;
                                    i2 = strTemp.indexOf('</td>',i1);

                                    strNotice = strTemp.slice(i1,i2);
                                    GiftItem    = '<b>Mafia Wars Accept Gift:</b><table>'+strNotice+'</table>';
                                    LogPush(GiftItem);
                                    NextRequest(aParams[0],aParams[1]);
                                }
                            }
                        } catch(err) {
                            GM_log('Error: MW_AcceptGift DoStep 4 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }

            function doStep5(_myUrl, _myParms, _GiftItem, _strAppKey) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptGift doStep 5');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep5(_myUrl,_myParms, _GiftItem, _strAppKey);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
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
                            var strAppKey;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                            //Check got Regift Button.

                            i1 = strTemp.indexOf('<fb:request-form style=');
                            if (i1==-1) {
                                LogPush(_GiftItem);
                                NextRequest(aParams[0],aParams[1]);
                            } else {
                              myUrl    =  'http://www.connect.facebook.com/widgets/serverfbml.php';

                              i1       =  strTemp.indexOf('FB.Facebook.init("')
                              if (i1 == -1) {
                                  strAppKey = _strAppKey
                              } else {
                                  i1 += 18;
                                  i2       =  strTemp.indexOf('"',i1);
                                  strAppKey = strTemp.slice(i1,i2)
                              }

                              myParms  =  'app_key='+strAppKey;

                              i1       =  i2 +1;
                              i1       =  strTemp.indexOf('"http',i1)+1;
                              i2       =  strTemp.indexOf('"',i1);
                              myParms +=  '&channel_url='+ encodeURIComponent(strTemp.slice(i1,i2));

                              i1       =  strTemp.indexOf('<fb:fbml>');
                              i2       =  strTemp.indexOf('</script>',i1);
                              myParms +=  '&fbml='+encodeURIComponent(strTemp.slice(i1,i2));

                              doStep6(myUrl,myParms,_GiftItem);

                            }

                        } catch(err) {
                            GM_log('Error: MW_AcceptGift DoStep 5 - '+err.message);
                            LogPush(_GiftItem);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }

            function doStep6(_myUrl, _myParms, _GiftItem) {

                var iCurrentJob, iWatchDog;
                var i1,i2,strHost;

                GM_log('MW_AcceptGift doStep 6');

                i1 = _myUrl.indexOf('http://')+7;
                i2 = _myUrl.indexOf('/',i1);
                strHost = _myUrl.slice(i1,i2);

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep6(_myUrl,_myParms, _GiftItem);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':  'en-us,en;q=0.5',
                        'Content-Type':     'application/x-www-form-urlencoded'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp, strTemp2;

                            var aTemp;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                            // get form data array
                            i1       =  strTemp.indexOf('PlatformInvite.sendInvitation');
                            if (i1 == -1) throw {message:"Cannot find PlatformInvite.sendInvitation in page"}

                            i1 = strTemp.indexOf('&quot;request_form',i1);
                            i2 = strTemp.indexOf('&#125;);');

                            strTemp2 = '{'+strTemp.slice(i1,i2)+'}'
                            strTemp2 = strTemp2.replace(/&quot;/g,'"')

                            aTemp = JSON.parse(strTemp2);

                            // start URL
                            myUrl        =  'http://www.connect.facebook.com/fbml/ajax/prompt_send.php?__a=1';

                            myParms      =  'app_id='     +aTemp["app_id"];
                            myParms     +=  '&to_ids[0]='   +aTemp["prefill"];
                            myParms     +=  '&request_type='  +escape(aTemp["request_type"]);
                            myParms     +=  '&invite='      +aTemp["invite"];

			    i1		 =  strTemp.indexOf(' action="');
                            i1           =  strTemp.indexOf('content="',i1);
                            if (i1 == -1) {GM_log(strTemp);throw {message:"Cannot find  content=\\ in page"};}
                            i1          +=  9;
                            i2           =  strTemp.indexOf('"',i1)-1;

                            strTemp2    =   eval('"'+strTemp.slice(i1,i2)+'"');
                            myParms     +=  '&content='     +encodeURIComponent(strTemp2);

                            myParms     +=  '&preview=false';
                            myParms     +=  '&is_multi='    +aTemp["is_multi"];
                            myParms     +=  '&is_in_canvas='  +aTemp["is_in_canvas"];
                            myParms     +=  '&form_id='     +aTemp["request_form"];
                            myParms     +=  '&include_ci='    +aTemp["include_ci"];

                            myParms     +=  '&prefill=true&message=&donot_send=false&__d=1';

                            i1          =   strTemp.indexOf('name="post_form_id" value="');
                            if (i1 == -1) throw {message:'Cannot find name="post_form_id" value=" in page'}
                            i1         += 27
                            i2          =   strTemp.indexOf('"',i1);
                            myParms    +=  '&post_form_id='+strTemp.slice(i1,i2)

                            i1          =   strTemp.indexOf('fb_dtsg:"',i1);
                            if (i1 == -1) throw {message:'Cannot find fb_dtsg:" in page'}
                            i1         += 9;
                            i2          =   strTemp.indexOf('"',i1);
                            myParms     +=  '&fb_dtsg='+strTemp.slice(i1,i2);

                            myParms     +=  '&post_form_id_source=AsyncRequest';

                            doStep7(myUrl,myParms,_GiftItem);

                        } catch(err) {
                            GM_log('Error: MW_AcceptGift DoStep 6 - '+err.message);
                            LogPush(_GiftItem);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }

            function doStep7(_myUrl, _myParms, _GiftItem) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptGift doStep 7');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep6(_myUrl,_myParms, _GiftItem);
                    } else {
                        LogPush(_GiftItem);
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
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
                            var strTemp, strTemp2;


                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                            if (strTemp.indexOf('Sorry, you have run out of requests to send with this application. Please try again tomorrow')!=-1) {

                                MW_SendThanksDelay = getCurrentTime() + 12*60;

                                GM_log('MW_AcceptGift aborting Adding Thank you - Limit reached');
                                LogPush(_GiftItem );
                            } else {
                                GM_log('MW_AcceptGift Adding Thank you');
                                LogPush(_GiftItem +'<br>Thank you gift Sent');
                            }

                            MW_SendThanksDelay


                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            LogPush(_GiftItem);
                            GM_log('Error: MW_AcceptGift DoStep 7 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }


            try {
                GM_log('MW_AcceptGift Gift Main');
                iErrorCount =0 ;

                doStep1(strBase,Self.Parms);
            } catch(err) {
                GM_log('Error: MW_AcceptGift main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }
        }


        function MW_SendGift() {

            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_SendGift doStep 1');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep1(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:    _myUrl,
                    data:   _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            if (oDetails.payload.msg == null) {
                                myUrl = "";
                                for (var i=0;i<oDetails.onload.length;i++) {
                                    if (oDetails.onload[i].indexOf('goURI')!=-1) {
                                        eval("myUrl = " + oDetails.onload[i].slice(6,-2))
                                    }
                                }
                                if (myUrl == "") throw {message:"Cannot find goURI in page"}

                                doStep2(myUrl,'');

                            } else {
                               // and error has occured while trying to process the request.
                                GM_log('Msg = '+oDetails.payload.msg);

                                strDetails  = '<b>Mafia Wars Send Gift:</b><br>'
                                strDetails += oDetails.payload.msg;

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }

                        } catch(err) {
                            GM_log('Error: MW_SendGift DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep2(_myUrl, _myParms ) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_SendGift doStep 2');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep2(_myUrl, _myParms);
                    } else {
                        LogPush(_GiftItem);
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':  'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp =   _responseDetails.responseText;

                            i1 = strTemp.indexOf('<iframe frameborder="0" name="mafiawars" ')

                            if (i1 == -1) { 
				                i1 = strTemp.indexOf('window.location.replace("');
				                if (i1 == -1) { GM_log(strTemp); throw {message:'Cannot find <iframe frameborder="0" name="mafiawars" in page:'}; }
				                i1 += 25;
				                i2 = strTemp.indexOf('"',i1);
				                myUrl = strTemp.slice(i1,i2);
				                myUrl = myUrl.replace(/\\/g,'');

                                doStep2(myUrl,'');
                            } else {
	
                                i1 = strTemp.indexOf('src="',i1)+5;
                            	i2 = strTemp.indexOf('"',i1);
                            	myUrl = strTemp.slice(i1,i2);
                            	myUrl = myUrl.replace(/&amp;/g,'&');

                            	doStep3(myUrl,'');
                            }

                        } catch(err) {
                            GM_log('Error: Request Send MW DoStep 2 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }


                    }
                });

            }

            function doStep3(_myUrl, _myParms) {

              var iCurrentJob, iWatchDog;

                    GM_log('MW_SendGift doStep 3');

                    // start the WatchDog Timer to catch hung requests. 15 seconds.
                    iWatchDog = setTimeout(function (e) {
                        // abort the current job;
                        iCurrentJob.abort();

                        // increase the error count
                        iErrorCount += 1;

                        if (iErrorCount <3) {
                            doStep3(_myUrl, _myParms);
                        } else {
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }, 30000);

                    iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1, i2, strTemp, myUrl, myUrl2, myParms;

                            clearTimeout(iWatchDog);
                                iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}
                            strTemp = _responseDetails.responseText;

                            i1 = strTemp.indexOf('action="');
                            if (i1 == -1) throw {message:"Cannot find action= in page"};

                            // extract URL
                            i1 += 8;
                            i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);

                            myParms = '';
                            i1 = strTemp.indexOf('<input',i1);
                            if (i1 == -1) throw {message:"Cannot find <input in page"}
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
                            GM_log('Error: MW_SendGift DoStep 3 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            };

            function doStep4(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_SendGift doStep 4');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep4(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
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

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;


                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                            i1 = strTemp.indexOf("$('#popup_fodder').html");
                            i1 = strTemp.indexOf('("<div',i1)+1;
                            i2 = strTemp.indexOf('</div>");',i1)+7;

                            eval('strTemp = '+strTemp.slice(i1,i2));

                            i1 = strTemp.indexOf('<div class="gift_popup">');
                            if (i1!=-1) {

                                for (var i=0; i<(aParams[2002]*1+2);i++) {
                                    i1 = strTemp.indexOf('<input type="hidden"',i1);
                                    i1 = strTemp.indexOf('id="',i1)+4;
                                    i2 = strTemp.indexOf('"',i1);
                                    i3 = strTemp.indexOf('value="',i2)+7;
                                    i4 = strTemp.indexOf('"',i3);
                                    if (strTemp.slice(i1,i2) == 'value_item_id') iGift = strTemp.slice(i3,i4);
                                }

                                GM_log('Crime Spree Gift = '+iGift );

                                //value="remote/html_server.php?xw_controller=safehouse&xw_action=answer_send&xw_city=1&tmp=1392f19a32e5a6e5d39c060bb5b82556&cb=1000001824540321271674372&target=1253652918     &time_id=1271672934&gkey=8adeaa0754bbfb55ad53c180f8adde85&gift_box=2
                                myUrl = 'http://facebook.mafiawars.com/mwfb/';
                                myUrl += strTemp.slice(i3,i4);
                                myUrl += '&gift_id=' + iGift +'&xw_client_id=8';

                                myParms = 'ajax=1&liteload=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;


                                if (strTemp.indexOf("You have already answered to 5 requests for gifts in 24 hours.")!=-1) {
                                    LogPush('<strong>MW Crime Spree:</strong> Respect Sent<br>You have already answered to 5 requests for gifts in 24 hours.');
                                } else {
                                    LogPush('<strong>MW Crime Spree:</strong> Respect Sent<br>Reward has been claimed.');
                                }

                                doStep5(myUrl,myParms);
                            } else {
                                i1          = strTemp.indexOf('<td class="message_body">');
                                if (i1 == -1) throw {message:"Cannot find Message_Body in page"}

                                i2          = strTemp.indexOf('</td>',i1);
                                strDetails  = strTemp.slice(i1+25,i2);
                                LogPush('<strong>MW Crime Spree.</strong><br>'+strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }
                        } catch(err) {
                            GM_log('Error: MW_SendGift DoStep 4 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep5(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_SendGift doStep 5');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;
                    if (iErrorCount <3) {
                        doStep5(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':  'en-us,en;q=0.5',
                        'Content-Type':     'application/x-www-form-urlencoded'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}
                            GM_log('Gift Send and rewarded claimed');
                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            GM_log('Error: Request Send MW DoStep 5 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }


            GM_log('Send MW Gift');

            iErrorCount =0 ;

            GM_log('Action FB request');
            doStep1(strBase,Self.Parms);

        }

        function MW_Join() {

            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_Join doStep 1');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep1(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:    _myUrl,
                    data:   _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            if (oDetails.payload.msg == null) {
                                myUrl = "";
                                for (var i=0;i<oDetails.onload.length;i++) {
                                    if (oDetails.onload[i].indexOf('goURI')!=-1) {
                                        eval("myUrl = " + oDetails.onload[i].slice(6,-2))
                                    }
                                }
                                if (myUrl == "") throw {message:"Cannot find goURI in page"}

                                doStep2(myUrl,'');

                            } else {
                               // and error has occured while trying to process the request.
                                GM_log('Msg = '+oDetails.payload.msg);

                                strDetails  = '<b>Mafia Wars Join:</b><br>'
                                strDetails += oDetails.payload.msg;

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }

                        } catch(err) {
                            GM_log('Error: MW_Join DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep2(_myUrl, _myParms ) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_JoindoStep 2');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep2(_myUrl, _myParms);
                    } else {
                        LogPush(_GiftItem);
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':  'en-us,en;q=0.5'
                    },
                onload: function(_responseDetails) {
                    try {
                        var i1,i2, myUrl;
                        var strTemp;
                        var strDetails;

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                        strTemp =   _responseDetails.responseText;

                        i1 = strTemp.indexOf('<iframe frameborder="0" name="mafiawars" ')

                        if (i1 == -1) { 
                            i1 = strTemp.indexOf('window.location.replace("');
                            if (i1 == -1) { GM_log(strTemp); throw {message:'Cannot find <iframe frameborder="0" name="mafiawars" in page:'}; }
                            i1 += 25;
                            i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);
                            myUrl = myUrl.replace(/\\/g,'');

                            doStep2(myUrl,'');
                        } else {
	
                            i1 = strTemp.indexOf('src="',i1)+5;
                            i2 = strTemp.indexOf('"',i1);
                            myUrl = strTemp.slice(i1,i2);
                            myUrl = myUrl.replace(/&amp;/g,'&');

                            doStep3(myUrl,'');
                        }

                    } catch(err) {
                        GM_log('Error: MW_Join DoStep 2 - '+err.message);
                        NextRequest(aParams[0],aParams[1]);
                    }

                }
            });

        }

        function doStep3(_myUrl, _myParms) {

            var iCurrentJob, iWatchDog;

            GM_log('MW_Join doStep 3');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;

                if (iErrorCount <3) {
                    doStep3(_myUrl, _myParms);
                } else {
                    NextRequest(aParams[0],aParams[1]);
                }

            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
                method: 'GET',
                url:  _myUrl,
                data: _myParms,
                headers: {
                    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-us,en;q=0.5'
                },
                onload: function(_responseDetails) {
                    try {
                        var i1, i2, strTemp, myUrl, myParms;

                        clearTimeout(iWatchDog);
                            iErrorCount = 0;

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
                        if (i1 == -1) throw {message:'Cannot find <input in page'}

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
                        GM_log('Error: MW_Join DoStep 3 - '+err.message);
                        NextRequest(aParams[0],aParams[1]);
                    }
                }
            });
        };


        function doStep4(_myUrl, _myParms) {

            var iCurrentJob, iWatchDog;

            GM_log('MW_Join doStep 4');

            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;

                if (iErrorCount <3) {
                    doStep4(_myUrl,_myParms);
                } else {
                    NextRequest(aParams[0],aParams[1]);
                }

            }, 30000);

            iCurrentJob = GM_xmlhttpRequest({
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

                        clearTimeout(iWatchDog);
                        iErrorCount = 0;

                        if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                        strTemp = _responseDetails.responseText;

                        i1 = strTemp.indexOf('<ul class="incoming_requests clearfix">');
                        if (i1 == -1) {
                            LogPush('<Strong>MW Join</strong><br>Could not find user.  Possibly already joined');
                            throw {message:'Cannot find <ul class="incoming_requests clearfix"> in page'}
                        }
                        i2 = strTemp.indexOf('</ul>',i1);

                        strTemp = strTemp.slice(i1,i2);

                        i1 = 0

                        do {
                            i1 = strTemp.indexOf('<li>',i1);
                            if (i1!=-1) {

                                strNotice = '<strong>Mafia Wars Join:</strong><table>';
                                i1 = i1+1
                                // get user's picture
                                i3 = strTemp.indexOf('<span ',i1);
                                i4 = strTemp.indexOf('[<a href',i3);
                                strNotice += strTemp.slice(i3,i4) + '</table>';

                                i3 = strTemp.indexOf('<a href="',i1);
                                i4 = strTemp.indexOf('" onclick=',i3);

                                myUrl       = strTemp.slice(i3+9,i4)+'&xw_client_id=8';
                                myParms     = 'ajax=1&liteload=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;

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

                    } catch(err) {
                        GM_log('Error: MW_Join DoStep 4 - '+err.message);
                        NextRequest(aParams[0],aParams[1]);
                    }
                }
            });

        }

        function doStep5(_myUrl, _myParms, _strDetails) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_Join doStep 5');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep5(_myUrl,_myParms, _strDetails);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
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

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp     = _responseDetails.responseText;
                            i1          = strTemp.indexOf('<td class="message_body">');

                            if (i1 == -1) throw {message:"Cannot find Message_Body in page"}

                            i2          = strTemp.indexOf('</td>',i1);
                            strDetails  = _strDetails + strTemp.slice(i1+25,i2);
                            LogPush(strDetails);

                            GM_log('MW Join sucessfull');
                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            GM_log('Error: MW_Join DoStep 5 - '+err.message);
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

                iErrorCount =0 ;

                GM_log('Action FB request');
                doStep1(strBase,Self.Parms);

            } catch(err) {
                GM_log('Error: Request Join MW Main');
                NextRequest(aParams[0],aParams[1]);
            }

        }

        function MW_AcceptEnergy() {

            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptEnergy doStep 1');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep1(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:    _myUrl,
                    data:   _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            if (oDetails.payload.msg == null) {
                                myUrl = "";
                                for (var i=0;i<oDetails.onload.length;i++) {
                                    if (oDetails.onload[i].indexOf('goURI')!=-1) {
                                        eval("myUrl = " + oDetails.onload[i].slice(6,-2))
                                    }
                                }
                                if (myUrl == "") throw {message:"Cannot find goURI in page"}

                                doStep2(myUrl,'');

                            } else {
                               // and error has occured while trying to process the request.
                                GM_log('Msg = '+oDetails.payload.msg);

                                strDetails  = '<b>Mafia Wars Energy:</b><br>'
                                strDetails += oDetails.payload.msg;

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }

                        } catch(err) {
                            GM_log('Error: MW_AcceptEnergy DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep2(_myUrl, _myParms ) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptEnergy doStep 2');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep2(_myUrl, _myParms);
                    } else {
                        LogPush(_GiftItem);
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':  'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}
                            strTemp =   _responseDetails.responseText;

                            i1 = strTemp.indexOf('<iframe frameborder="0" name="mafiawars" ')

                            if (i1 == -1) { 
				                i1 = strTemp.indexOf('window.location.replace("');
				                if (i1 == -1) { GM_log(strTemp); throw {message:'Cannot find <iframe frameborder="0" name="mafiawars" in page:'}; }
				                i1 += 25;
				                i2 = strTemp.indexOf('"',i1);
				                myUrl = strTemp.slice(i1,i2);
				                myUrl = myUrl.replace(/\\/g,'');

                                doStep2(myUrl,'');
                            } else {
	
                                i1 = strTemp.indexOf('src="',i1)+5;
                            	i2 = strTemp.indexOf('"',i1);
                            	myUrl = strTemp.slice(i1,i2);
                            	myUrl = myUrl.replace(/&amp;/g,'&');

                            	doStep3(myUrl,'');
                            }

                        } catch(err) {
                            GM_log('Error: MW_AcceptEnergy DoStep 2 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep3(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptEnergy doStep 3');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep3(_myUrl, _myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1, i2, strTemp, myUrl, myParms;

                            clearTimeout(iWatchDog);
                                iErrorCount = 0;

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
                            if (i1 == -1) throw {message:'Cannot find <input in page'}

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
                            GM_log('Error: MW_AcceptEnergy DoStep 3 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            };


            function doStep4(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptEnergy doStep 4');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep4(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
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

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                            //Check for energy popup.

                            i1 = strTemp.indexOf('<div style="border-bottom: 1px dotted #999; margin: 10px auto; text-align: center; font-size: 20px; padding-bottom: 10px;">');
                            i2 = strTemp.indexOf('<div style="text-align: center; border: 1px solid #666666; padding:10px; background-color:black;">');
                            i4 = strTemp.indexOf('<div style="border: 1px solid #666666; padding:10px; background-color:black;">');


                            if (i1!=-1) {

                                i1 = strTemp.indexOf('<div style="float: left;">',i1);
                                i2 = strTemp.indexOf('</div>',i1);

                                strNotice  = '<table><tbody><tr><td colspan="3">';
                                strNotice += strTemp.slice(i1,i2);
                                strNotice += '</td></tr><tr><td style="width: 130px; text-align: center;">';

                                i1 = strTemp.indexOf('<img src=',i2);
                                i2 = strTemp.indexOf('</div>',i1);
                                strNotice += strTemp.slice(i1,i2+6);
                                strNotice += '</td><td width="50"><img src="http://mwfb.static.zynga.com/mwfb/graphics/gift_loop_arrow_green_39x50_01.png"></td><td>';

                                i1 = strTemp.indexOf('<div style="float: left; text-align: center; width: 200px; padding-top: 55px;">',i2);
                                i1 = strTemp.indexOf('<a',i1)
                                i2 = strTemp.indexOf('<fb:profile-pic',i1);

                                strNotice += '<div style="float: left; text-align: center; width: 200px;">';
                                strNotice += strTemp.slice(i1,i2);
                                strNotice += '<img src="http://static.ak.connect.facebook.com/pics/t_silhouette.jpg">';

                                i1 = strTemp.indexOf('</a>',i2);
                                i2 = strTemp.indexOf('</div>',i1);
                                strNotice += strTemp.slice(i1,i2);
                                strNotice += '</div></td></tr>';

                                GiftItem    = '<b>Mafia Wars Accept Energy:</b><table>'+strNotice+'</table>';

                                // look for button to send energy back

                                i1 = strTemp.indexOf('<fb:request-form style=');
                                if ( (i1==-1) || (MW_SendThanksDelay > getCurrentTime())) {
                                    LogPush(GiftItem);
                                    NextRequest(aParams[0],aParams[1]);
                                } else {
                                  myUrl    =  'http://www.connect.facebook.com/widgets/serverfbml.php';

                                  i1       =  strTemp.indexOf('FB.Facebook.init("')+18;
                                  i2       =  strTemp.indexOf('"',i1);

                                  myParms  =  'app_key='+strTemp.slice(i1,i2);

                                  i1       =  i2 +1;
                                  i1       =  strTemp.indexOf('"',i1)+1;
                                  i2       =  strTemp.indexOf('"',i1);
                                  myParms +=  '&channel_url='+ encodeURIComponent(strTemp.slice(i1,i2));

                                  i1       =  strTemp.indexOf('<fb:fbml>');
                                  i2       =  strTemp.indexOf('</script>',i1);
                                  myParms +=  '&fbml='+encodeURIComponent(strTemp.slice(i1,i2));

                                  doStep5(myUrl,myParms,GiftItem);

                                }

                            } else if (i2!=-1) {
                                   i1 = strTemp.indexOf('>',i2)+1;
                                   i2 = strTemp.indexOf('<div style=', i1);

                                   strNotice = strTemp.slice(i1,i2);

                                   GiftItem    = '<b>Mafia Wars Accept Energy:</b><table><div>'+strNotice+'</table>';
                                   LogPush(GiftItem);

                                   NextRequest(aParams[0],aParams[1]);

                            } else if (i4!=-1) {
                                   i1 = strTemp.indexOf('>',i4)+1;
                                   i2 = strTemp.indexOf('<div style=', i1);

                                   strNotice = strTemp.slice(i1,i2);

                                   GiftItem    = '<b>Mafia Wars Accept Energy:</b><table><div>'+strNotice+'</table>';
                                   LogPush(GiftItem);

                                   NextRequest(aParams[0],aParams[1]);

                            } else {
                                i1 = strTemp.indexOf('<td class="message_body">');
                                if (i1 == -1) throw {message:"Cannot find Message_Body in page"}
                                i1 += 25;

                                i2 = strTemp.indexOf('</td>',i1);

                                strNotice = strTemp.slice(i1,i2);
                                GiftItem    = '<b>Mafia Wars Accept Energy:</b><table>'+strNotice+'</table>';
                                LogPush(GiftItem);
                                NextRequest(aParams[0],aParams[1]);
                            }

                        } catch(err) {
                            GM_log('Error: MW_AcceptEnergy DoStep 4 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }

            function doStep5(_myUrl, _myParms, _GiftItem) {

                var iCurrentJob, iWatchDog;
                var i1,i2,strHost;

                GM_log('MW_AcceptEnergy doStep 5');

                i1 = _myUrl.indexOf('http://')+7;
                i2 = _myUrl.indexOf('/',i1);
                strHost = _myUrl.slice(i1,i2);

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep5(_myUrl,_myParms, _GiftItem);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':  'en-us,en;q=0.5',
                        'Content-Type':     'application/x-www-form-urlencoded'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp, strTemp2;

                            var aTemp;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                            // get form data array
                            i1       =  strTemp.indexOf('PlatformInvite.sendInvitation');
                            if (i1 == -1) throw {message:"Cannot find PlatformInvite.sendInvitation in page"}
                             i1 = strTemp.indexOf('&quot;request_form',i1);
                            i2 = strTemp.indexOf('&#125;);');

                            strTemp2 = '{'+strTemp.slice(i1,i2)+'}'
                            strTemp2 = strTemp2.replace(/&quot;/g,'"')

                            aTemp = JSON.parse(strTemp2);

                            // start URL
                            myUrl        =  'http://www.connect.facebook.com/fbml/ajax/prompt_send.php?__a=1';

                            myParms      =  'app_id='     +aTemp["app_id"];
                            myParms     +=  '&to_ids[0]='   +aTemp["prefill"];
                            myParms     +=  '&request_type='  +escape(aTemp["request_type"]);
                            myParms     +=  '&invite='      +aTemp["invite"];

			    i1		 =  strTemp.indexOf(' action="');
                            i1           =  strTemp.indexOf('content="',i1);
                            if (i1 == -1) {GM_log(strTemp);throw {message:"Cannot find  content=\\ in page"};}
                            i1          +=  9;
                            i2           =  strTemp.indexOf('"',i1)-1;

                            strTemp2    =   eval('"'+strTemp.slice(i1,i2)+'"');
                            myParms     +=  '&content='     +encodeURIComponent(strTemp2);

                            myParms     +=  '&preview=false';
                            myParms     +=  '&is_multi='    +aTemp["is_multi"];
                            myParms     +=  '&is_in_canvas='  +aTemp["is_in_canvas"];
                            myParms     +=  '&form_id='     +aTemp["request_form"];
                            myParms     +=  '&include_ci='    +aTemp["include_ci"];

                            myParms     +=  '&prefill=true&message=&donot_send=false&__d=1';

                            i1          =   strTemp.indexOf('name="post_form_id" value="');
                            if (i1 == -1) throw {message:'Cannot find name="post_form_id" value=" in page'}
                            i1         += 27
                            i2          =   strTemp.indexOf('"',i1);
                            myParms    +=  '&post_form_id='+strTemp.slice(i1,i2)

                            i1          =   strTemp.indexOf('fb_dtsg:"',i1);
                            if (i1 == -1) throw {message:'Cannot find fb_dtsg:" in page'}
                            i1         += 9;
                            i2          =   strTemp.indexOf('"',i1);
                            myParms     +=  '&fb_dtsg='+strTemp.slice(i1,i2);

                            myParms     +=  '&post_form_id_source=AsyncRequest';

                            doStep6(myUrl,myParms,_GiftItem);

                        } catch(err) {
                            GM_log('Error: MW_AcceptEnergy DoStep 5 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }

            function doStep6(_myUrl, _myParms, _GiftItem) {

                var iCurrentJob, iWatchDog;

                GM_log('MW_AcceptEnergy doStep 6');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep6(_myUrl,_myParms, _GiftItem);
                    } else {
                        LogPush(_GiftItem);
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
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
                            var strTemp, strTemp2;


                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;

                            GM_log(strTemp);

                            if (strTemp.indexOf('Sorry, you have run out of requests to send with this application')!=-1) {

                                MW_SendThanksDelay = getCurrentTime() + 12*60;

                                GM_log('MW_AcceptEnergy aborting Adding Thank you - Limit reached');
                                LogPush(_GiftItem );
                            } else {
                                GM_log('MW_AcceptEnergy Adding Thank you');
                                LogPush(_GiftItem +'<br>Thank you Energy Pack Sent');
                            }

                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            LogPush(_GiftItem);
                            GM_log('Error: MW_AcceptEnergy DoStep 6 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }


            try {
                GM_log('accept MW Energy');
                iErrorCount =0 ;
                GM_log('Action FB request');
                doStep1(strBase,Self.Parms);
            } catch(err) {
                GM_log('Error: Request Accept MW Energy main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }

        }


        // FarmVille Code

        function FV_AcceptGift() {

            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 1');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep1(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:    _myUrl,
                    data:   _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            if (oDetails.payload.msg == null) {
                                myUrl = "";
                                for (var i=0;i<oDetails.onload.length;i++) {
                                    if (oDetails.onload[i].indexOf('goURI')!=-1) {
                                        eval("myUrl = " + oDetails.onload[i].slice(6,-2))
                                    }
                                }
                                if (myUrl == "") throw {message:"Cannot find goURI in page"}

                                doStep2(myUrl,'');

                            } else {
                               // and error has occured while trying to process the request.
                                GM_log('Msg = '+oDetails.payload.msg);

                                strDetails  = '<b>FarmVille Accept Gift:</b><br>'
                                strDetails += oDetails.payload.msg;

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }

                        } catch(err) {
                            GM_log('Error: Request Accept FV DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep2(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 2');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep2(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:  _myUrl,
                    headers: {
                        'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':  'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myUrl2, myParms;
                            var strTemp,strTemp2;
                            var GiftItem;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}


                            strTemp =   _responseDetails.responseText;

                            GiftItem = "<b>FarmVille Accept Gift:</b>";

                            if (strTemp.indexOf('<div class="giftLimit">')!=-1) {

                                i1          = strTemp.indexOf('<div class="giftLimit">');
                                i2          = strTemp.indexOf('</div>',i1);

                                // a little testing
                                if (strTemp.indexOf('You have already accepted this gift') != -1) {
                                    GiftItem += '<br>'+strTemp.slice(i1+23,i2);
                                } else if (strTemp.indexOf('The gift you tried to accept was LIMITED EDITION and is no longer available') != -1) {
                                    GiftItem += '<br>'+strTemp.slice(i1+23,i2);
                                } else {
                                    GiftItem += '<br>'+strTemp.slice(i1+23,i2)+'<br>FV Gift Accepting is being turned off for Two (2) Hour.  Please accept some of your FV gifts.';
                                    FV_accept_ignore    = Math.floor(new Date().valueOf()/1000) + 120*60;
                                }

                                LogPush(GiftItem);
                                NextRequest(aParams[0],aParams[1]);
                                return;

                            } else if (strTemp.indexOf('<div class="giftConfirm_name">')!=-1) {

                                i1          = strTemp.indexOf('<div class="giftConfirm_name">');
                                i2          = strTemp.indexOf('</div>',i1);
                                GiftItem   += '<br>You just accepted a '+strTemp.slice(i1+30,i2);

                                i1          = strTemp.indexOf('<div class="giftFrom_name">');
                                if (i1 == -1) throw {message:'Cannot find <div class="giftFrom_name"> in page'}
                                i2          = strTemp.indexOf('</div>',i1);
                                GiftItem   += ' from '+strTemp.slice(i1+27,i2);

                                i1          = strTemp.indexOf('<div class="giftConfirm_img">');
                                if (i1 == -1) throw {message:'Cannot find <div class="giftConfirm_img"> in page'}
                                i2          = strTemp.indexOf('</div>',i1);
                                GiftItem   += '<br>'+strTemp.slice(i1+29,i2);

                                // check for thank you gift
                                i1      = strTemp.indexOf('<div class="thank_you_gift">');
                                if (i1==-1) {
                                    // no thank you gift
                                    LogPush(GiftItem);
                                    NextRequest(aParams[0],aParams[1]);
                                    return;

                                } else {
                                    // found the thank you gift

                                    myUrl        =  'http://apps.facebook.com/fbml/ajax/prompt_send.php?__a=1';

                                    myParms      =  'app_id=102452128776';
                                    i1           =  strTemp.indexOf('giftRecipient=',i1)
                                    if (i1 == -1) throw {message:'Cannot find giftRecipient= in page'}
                                    i1          +=  14;
                                    i2           =  strTemp.indexOf('&',i1)
                                    myParms     +=  '&to_ids[0]='+strTemp.slice(i1,i2);
                                    myParms     +=  '&request_type=FarmVille%20Gift&invite=false';

                                    i1           =  strTemp.indexOf('content="',i1)+9;
                                    if (i1 == -1) throw {message:'Cannot find  in page'}
                                    i1          +=  9;
                                    i2           =  strTemp.indexOf('"',i1);

                                    strTemp2    =   strTemp.slice(i1,i2)

                                    strTemp2    =   strTemp2.replace(/&quot;/g,'"');
                                    strTemp2    =   strTemp2.replace(/%/g,"%25");
                                    strTemp2    =   strTemp2.replace(/\$/g,"%24");
                                    strTemp2    =   strTemp2.replace(/</g,"%3C");
                                    strTemp2    =   strTemp2.replace(/>/g,"%3E");
                                    strTemp2    =   strTemp2.replace(/"/g,"%22");
                                    myParms     +=  '&content=' + codeStrings(strTemp2);

                                    myParms     +=  '&preview=false&is_multi=false&is_in_canvas=true'
                                    i1          =   strTemp.indexOf('id="',i1);
                                    if (i1 == -1) throw {message:'Cannot find id=" in page'}
                                    i1          +=  4
                                    i2          =   strTemp.indexOf('"',i1);
                                    myParms     +=  '&form_id='+strTemp.slice(i1,i2);

                                    myParms     +=  '&prefill=true&message=&donot_send=false&__d=1'
                                    i1          =   strTemp.indexOf('post_form_id:"')
                                    if (i1 == -1) throw {message:'Cannot post_form_id:" in page'}
                                    i1          +=  14;
                                    i2          =   strTemp.indexOf('"',i1);
                                    myParms     +=  '&post_form_id='+strTemp.slice(i1,i2)

                                    i1          =   strTemp.indexOf('fb_dtsg:"',i1)
                                    if (i1 == -1) throw {message:'Cannot find fb_dtsg:" in page'}
                                    i1          +=  9;
                                    i2          =   strTemp.indexOf('"',i1);
                                    myParms     +=  '&fb_dtsg='+strTemp.slice(i1,i2);
                                    myParms     +=  '&post_form_id_source=AsyncRequest';

                                    //next url
                                    i1          =   strTemp.indexOf('<form action="')
                                    if (i1 == -1) throw {message:'Cannot find <form action=" in page'}
                                    i1          +=  14;
                                    i2          =   strTemp.indexOf('"',i1);

                                    myUrl2      =   strTemp.slice(i1,i2);
                                    myUrl2      =   myUrl2.replace(/&amp;/g,'&');

                                    doStep3(myUrl, myParms, myUrl2, GiftItem);
                                }
                            } else {
                                GiftItem += '<br>An error occured while accepting this FarmVille gift. The gift data was not found.  Please remember to accept each gift right away.';
                                LogPush(GiftItem);
                                NextRequest(aParams[0],aParams[1]);
                                return;

                            }
                        } catch(err) {
                            GM_log('Error: Request Accept FV DoStep 2 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep3(_myUrl, _myParms, _myUrl2, _GiftItem) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 3');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep3(_myUrl, _myParms, _myUrl2, _GiftItem);
                    } else {
                        LogPush(_GiftItem);
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
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
                            var i1,i2, myUrl, myParms;
                            var strTemp;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            LogPush(_GiftItem +'<br>Thank you gift Sent');
                            doStep4(_myUrl2,'');

                        } catch(err) {
                            GM_log('Error: Request Accept FV DoStep 3 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep4(_myUrl, _myParms ) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 4');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep4(_myUrl, _myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':  'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp = _responseDetails.responseText;
                            i1      = strTemp.indexOf('<div class="morePending_bttn">');
                            if (i1 == -1) throw {message:'Cannot find <div class="morePending_bttn"> in page'}
                            i1      = strTemp.indexOf('http:',i1);
                            i2      = strTemp.indexOf('"',i1);

                            myUrl   = strTemp.slice(i1,i2);
                            myUrl   = strTemp.replace(/&amp;/g,'&');
                            doStep5(myUrl, '');

                        } catch(err) {
                            GM_log('Error: Request Accept FV DoStep 4 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }

            function doStep5(_myUrl, _myParms ) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 5');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep5(_myUrl, _myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'HEAD',
                    url:  _myUrl,
                    data: _myParms,
                    headers: {
                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':  'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}
                            GM_log('fv gift sent');
                            NextRequest(aParams[0],aParams[1]);
                        } catch(err) {
                            GM_log('Error: Request Accept FV DoStep 5 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }



            try {
                GM_log('FarmVille Accept Gift');

                iErrorCount =0 ;

                GM_log('Action FB request');
                doStep1(strBase,Self.Parms);
            } catch(err) {
                GM_log('Error: Request Accept FV Main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }

        }

        function FV_SendGift() {

            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 1');



                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep1(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:    _myUrl,
                    data:   _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            if (oDetails.payload.msg == null) {
                                myUrl = "";
                                for (var i=0;i<oDetails.onload.length;i++) {
                                    if (oDetails.onload[i].indexOf('goURI')!=-1) {
                                        eval("myUrl = " + oDetails.onload[i].slice(6,-2))
                                    }
                                }
                                if (myUrl == "") throw {message:"Cannot find goURI in page"}

                                doStep2(myUrl,'');

                            } else {
                               // and error has occured while trying to process the request.
                                GM_log('Msg = '+oDetails.payload.msg);

                                strDetails  = '<b>FarmVille Send Gift:</b><br>'
                                strDetails += oDetails.payload.msg;

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }
                        } catch(err) {
                            GM_log('Error: Request FV Send DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }

            function doStep2(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 2');



                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep2(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:    _myUrl,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;
                            var strName, strValue;
                            var strNotice;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp   =   _responseDetails.responseText;
                            i1 = strTemp.indexOf('<div class="main_giftConfirm_cont">');
                            if (i1 == -1) throw {message:'Cannot find <div class="main_giftConfirm_cont"> in page'}
                            i1 = strTemp.indexOf('<h3',i1);
                            i1 = strTemp.indexOf('>',i1)+1;
                            i2 = strTemp.indexOf('</h3',i1);

                            strNotice = strTemp.slice(i1,i2);
                            LogPush('<b>FarmVille Send Gift</b><br><table>' + strNotice + '</table>');
                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            GM_log('Error: Request FV Send DoStep 2 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }


            try {
                GM_log('FV Send gift');
                iErrorCount =0 ;

                GM_log('Action FB request');
                doStep1(strBase,Self.Parms);
            } catch(err) {
                GM_log('Error: Request Join FV Send main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }


        }

        function FV_Join() {

            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 1');



                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep1(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:    _myUrl,
                    data:   _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            if (oDetails.payload.msg == null) {
                                myUrl = "";
                                for (var i=0;i<oDetails.onload.length;i++) {
                                    if (oDetails.onload[i].indexOf('goURI')!=-1) {
                                        eval("myUrl = " + oDetails.onload[i].slice(6,-2))
                                    }
                                }
                                if (myUrl == "") throw {message:"Cannot find goURI in page"}

                                doStep2(myUrl,'');

                            } else {
                               // and error has occured while trying to process the request.
                                GM_log('Msg = '+oDetails.payload.msg);

                                strDetails  = '<b>FarmVille Join Gift:</b><br>'
                                strDetails += oDetails.payload.msg;

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }
                        } catch(err) {
                            GM_log('Error: Request Join FV DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }

            function doStep2(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 2');



                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep2(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:    _myUrl,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;
                            var strName, strValue;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp   =   _responseDetails.responseText;

                            LogPush('<b>FarmVille Join</b><br>You have accepted a FarmVille Neighbour request.');
                            NextRequest(aParams[0],aParams[1])

                        } catch(err) {
                            GM_log('Error: Request Join FV DoStep 2 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }


            try {
                GM_log('FV Join');
                iErrorCount =0 ;

                GM_log('Action FB request');
                doStep1(strBase,Self.Parms);
            } catch(err) {
                GM_log('Error: Request Join FV Main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }
        }

        function FV_ClaimBonus() {

            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 1');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep1(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'POST',
                    url:    _myUrl,
                    data:   _myParms,
                    headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            if (oDetails.payload.msg == null) {
                                myUrl = "";
                                for (var i=0;i<oDetails.onload.length;i++) {
                                    if (oDetails.onload[i].indexOf('goURI')!=-1) {
                                        eval("myUrl = " + oDetails.onload[i].slice(6,-2))
                                    }
                                }
                                if (myUrl == "") throw {message:"Cannot find goURI in page"}

                                doStep2(myUrl,'');

                            } else {
                               // and error has occured while trying to process the request.
                                GM_log('Msg = '+oDetails.payload.msg);

                                strDetails  = '<b>FarmVille Claim Bonus:</b><br>'
                                strDetails += oDetails.payload.msg;

                                LogPush(strDetails);
                                NextRequest(aParams[0],aParams[1]);
                            }

                        } catch(err) {
                            GM_log('Error: Request Bonus FV DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });
            }

            function doStep2(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 2');



                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep2(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:    _myUrl,
                    headers: {
                        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language': 'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;
                            var strName, strValue;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}


                            strTemp   =   _responseDetails.responseText;

                            if (strTemp.indexOf('<div class="alreadyReceivedStimulusContent">')!=-1) {
                                LogPush('<strong>FarmVille Bonus Claimed</strong><br>Howdy Partner! You have already claimed your bonus package.');
                                NextRequest(aParams[0],aParams[1]);

                            } else {

                                i1 = strTemp.indexOf('<div class="chooseStimulusGiftContainer">');
                                if (i1 == -1) throw {message:'Cannot find <div class="chooseStimulusGiftContainer"> in page'}
                                for (var i=0;i<aParams[3005];i++)
                                    i1 = strTemp.indexOf('<form action="',i1)+14;
                                i2 = strTemp.indexOf('"',i1);

                                myUrl = strTemp.slice(i1,i2);

                                myParms = '';
                                i1 = strTemp.indexOf('<input type="hidden"',i1);
                                if (i1 == -1) throw {message:'Cannot find <input type="hidden" in page'}
                                i2 = strTemp.indexOf('<input type="submit"',i1);
                                strTemp = strTemp.slice(i1,i2);

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
                                        if (strName == 'fb_sig_ext_perms') strValue = codeStrings(strValue);
                                        if (i>0) myParms += '&';
                                        myParms += strName +'='+strValue;
                                    }
                                } while (true)

                                doStep3(myUrl, myParms);
                            }

                        } catch(err) {
                            GM_log('Error: Request Bonus FV DoStep 2 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }

                    }
                });

            }

            function doStep3(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('doStep 3');



                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;

                    if (iErrorCount <3) {
                        doStep3(_myUrl,_myParms);
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);


                iCurrentJob = GM_xmlhttpRequest({
                    method: 'GET',
                    url:  _myUrl,
                    headers: {
                        'Accept':           'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':  'en-us,en;q=0.5'
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;
                            var GiftItem;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            strTemp   =   _responseDetails.responseText;
                            i1 = strTemp.indexOf('transparent url("')+17;
                            if (i1 == -1) throw {message:'Cannot find transparent url(" in page'}
                            i2 = strTemp.indexOf('"');
                            GiftItem = strTemp.slice(i1,i2);

                            LogPush('<strong>FarmVille Bonus Claimed</strong><br><img width=50% src="'+GiftItem+'"');
                            NextRequest(aParams[0],aParams[1]);
                        } catch(err) {
                            GM_log('Error: Request Bonus FV DoStep 3 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }

            try {
                GM_log('FV Claim Bonus');
                iErrorCount =0 ;
                doStep1(strBase,Self.Parms);
            } catch(err) {
                GM_log('Error: Request Bonus FV Main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }

        }

        // FaceBook Code
        function FB_accept_friend() {
            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('FB Friend Add Step 1');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;
                    GM_log('WatchDog - FB: '+iErrorCount);

                    if (iErrorCount <3) {
                        doStep1(_myUrl, _myParms)
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl, myParms;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            GM_log('Msg = '+oDetails.payload.msg);

                            strDetails  = '<strong>FaceBook Friend Invitation:</strong><br>';
                            strDetails += oDetails.payload.msg;

                            LogPush(strDetails);
                            
                            myUrl = "http://www.facebook.com/friends/ajax/lists.php?__a=1"
                            
                            // Code to move friend into selected group
                            if (Self.Gifttype == 'friend_connect') {
                                if (aParams[1001]!=0) {
                                    i1     = oDetails.payload.msg.indexOf('id=')+3;
                                    i2     = oDetails.payload.msg.indexOf('"',i1);
                                    myParms 	 =	"flid="+aParams[1001];
		                            myParms 	+=	"&id="+ oDetails.payload.msg.slice(i1,i2);
				                    myParms		+=	"&quick=true&add=1&post_form_id="+Post_form_id;
        				            myParms		+=	"&fb_dtsg="+FB_dtsg;
                				    myParms		+=	"&lsd&post_form_id_source=AsyncRequest"

                                    doStep2(myUrl,myParms);

                                } else {
                                     NextRequest(aParams[0],aParams[1]);
                                }

                            } else {
	                            if (aParams[1003]!=0) {
                                    i1     = oDetails.payload.msg.indexOf('id=')+3;
                                    i2     = oDetails.payload.msg.indexOf('"',i1);
                                    myParms 	 =	"flid="+aParams[1003];
		                            myParms 	+=	"&id="+ oDetails.payload.msg.slice(i1,i2);
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
                            GM_log('Error: Request FB Ignroe DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }

            function doStep2(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('FB Friend Add Step 2');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;
                    GM_log('WatchDog - FB: '+iErrorCount);

                    if (iErrorCount <3) {
                        doStep2(_myUrl, _myParms)
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                        'Accept':             	'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':    	'en-us,en;q=0.5',
                        'Content-Type':		  	'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':             unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            GM_log('Error: Request FB Ignroe DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }


            try {
                GM_log('FB Accept Friend');
                iErrorCount =0 ;
                doStep1(strBase,Self.Parms+'&post_form_id_source=AsyncRequest')
            } catch(err) {
                GM_log('Error: FB Accept Friend Main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }
        }

        function FB_ignore(){

            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('FB Ignore Step 1');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;
                    GM_log('WatchDog - FB: '+iErrorCount);

                    if (iErrorCount <3) {
                        doStep1(_myUrl, _myParms)
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            GM_log('Msg = '+oDetails.payload.msg);

                            strDetails  = '<strong>FaceBook Request Ignore:</strong><br>';
                            strDetails += oDetails.payload.msg;

                            LogPush(strDetails);

                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            GM_log('Error: Request FB Ignroe DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });

            }

            try {
                GM_log('FB Ignore Request');
                iErrorCount =0 ;
                doStep1(strBase,strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
            } catch(err) {
                GM_log('Error: FB Ignore Request Main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }
        }

        function FB_removeEvent() {
            function doStep1(_myUrl, _myParms) {

                var iCurrentJob, iWatchDog;

                GM_log('FB Ignore Step 1');

                // start the WatchDog Timer to catch hung requests. 15 seconds.
                iWatchDog = setTimeout(function (e) {
                    // abort the current job;
                    iCurrentJob.abort();

                    // increase the error count
                    iErrorCount += 1;
                    GM_log('WatchDog - FB: '+iErrorCount);

                    if (iErrorCount <3) {
                        doStep1(_myUrl, _myParms)
                    } else {
                        NextRequest(aParams[0],aParams[1]);
                    }

                }, 30000);

                iCurrentJob = GM_xmlhttpRequest({
                     method: 'POST',
                     url:  _myUrl,
                     data: _myParms,
                     headers: {
                        'Accept':              'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'Accept-Language':     'en-us,en;q=0.5',
                        'Content-Type':        'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-SVN-Rev':            unsafeWindow.Env.svn_rev
                    },
                    onload: function(_responseDetails) {
                        try {
                            var i1,i2, myUrl;
                            var strTemp;
                            var strDetails;
                            var oDetails;

                            clearTimeout(iWatchDog);
                            iErrorCount = 0;

                            strTemp = _responseDetails.responseText;

                            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."}

                            i1 = strTemp.indexOf('{')
                            oDetails = JSON.parse(strTemp.slice(i1));

                            GM_log('Msg = '+oDetails.payload.msg);

                            strDetails  = '<strong>FaceBook Request Ignore:</strong><br>';
                            strDetails += oDetails.payload.msg;

                            LogPush(strDetails);

                            NextRequest(aParams[0],aParams[1]);

                        } catch(err) {
                            GM_log('Error: Request FB Remove Event DoStep 1 - '+err.message);
                            NextRequest(aParams[0],aParams[1]);
                        }
                    }
                });
            }

            try {
                GM_log('FB Remove Event');
                iErrorCount =0 ;
                doStep1(strBase,Self.Parms+'&post_form_id_source=AsyncRequest');
            } catch(err) {
                GM_log('Error: FB Remove Event Main - '+err.message);
                NextRequest(aParams[0],aParams[1]);
            }
        }


        // Main Code

        var iHoldEvent;
        var Self;
        var i1,i2,i3,i4;
        var strTemp;

        var aCat;
        var xmlhttp;
        var myURL;

        var iErrorCount;

        Self = this;
        iHoldEvent = iRequestCurrent;

        // stop processing if autorun turned off
        if (bAutoRun) {
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
                                NextRequest(aParams[0],aParams[1]);
                            } else if (Self.Action.indexOf('accept_energy_req') != -1) {
                                //Energy
                                GM_log('MW Energy');
                                MW_AcceptEnergy();
                            } else if (Self.Action.indexOf('accept_boost') != -1) {
                                GM_log('MW 2X Boost');
                                if (getCurrentTime()> MW_2XBoostDelay){
                                    MW_AcceptGift()
                                } else {
                                    NextRequest(aParams[0],aParams[1]);
                                }
                            } else if (Self.Action.indexOf('accept_') != -1) {
                                GM_log('MW Accept Gift');
                                //Super Pignata Test
                                if (MW_FreeGiftsDelay>getCurrentTime()) {
                                    GM_log('skip accept free gifts.  limit reached');
                                    NextRequest(10,10);
                                } else if (Self.Action.indexOf('Capsule') != -1) {
                                    GM_log('found super pig')
                                    if ((getCurrentTime() > MW_SuperPigDelay)||(aParams[2024]!=2)){
                                        GM_log('accept pig');
                                        MW_AcceptGift()
                                    } else {
                                        GM_log('skip pig');
                                        NextRequest(aParams[0],aParams[1]);
                                    }
                                } else if (Self.Action.indexOf('Secret%2BDrop') != -1) {
                                    if (getCurrentTime()> MW_SecretDropDelay || aParams[2025]!=2) {
                                        GM_log('Accept Secret Drop');
                                        MW_AcceptGift()
                                	} else {
	                                	GM_log('Skip Secret Drop');
                                        NextRequest(aParams[0],aParams[1]);
                                    }
                                } else if (Self.Action.indexOf('ztrack_subcategory=1841_Rack') != -1) {
                                    if (getCurrentTime()> MW_RackOfChipDelay) {
                                        GM_log('Accept Rack of Chips');
                                        MW_AcceptGift()
                                    } else {
                                        GM_log('Skip Rack of Chips');
                                        NextRequest(aParams[0],aParams[1]);
                                    }
                                } else {
                                    MW_AcceptGift();
                                }
                            } else if (Self.Action.indexOf('safehouse') != -1) {
                                GM_log('MW Send Respect');
                                MW_SendGift();
                            } else if (Self.Action.indexOf('socialmission') != -1) {
                                GM_log('MW Accept Mission Respect');
                                MW_AcceptMission();
                            } else if (Self.Action.indexOf('recruit') != -1) {
                                GM_log('MW Join');
                                MW_Join();
                            }
                            break;

                        case '102452128776':
                            // FarmVille
                            if (Self.Action.indexOf('giftaccept') != -1) {
                                GM_log('FarmVille Accept Gift');
                                if (aParams[3000]==2) {
                                    if ( FV_accept_ignore < (Math.floor(new Date().valueOf()/1000))) {
                                        FV_AcceptGift();
                                    } else {
                                        GM_log('Skipped Delay');
                                        NextRequest(1,aParams[1]);
                                    }

                                } else {
                                    FV_AcceptGift();
                                }
                            } else if ((Self.Action.indexOf('sendmats') != -1) || (Self.Action.indexOf('sendcredits')!=-1)) {
                                GM_log('FV Send Gifts');
                                FV_SendGift();
                            } else if (Self.Action.indexOf('stimulus') != -1) {
                                GM_log('FV Claim Bonus');
                                FV_ClaimBonus();
                            } else {
                                GM_log('FV Joins');
                                FV_Join();
                            }
                            break;
                        default:
                            GM_log('Ignoring Other Request');

                            if (aParams[4000]==1) {
                                FB_ignore()
                            } else {
                                LogPush('Skipping Other Request');
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
                case 'FVMessage':
                    switch (aCat[1]) {
                        case '4':
                            FV_AcceptGift();
                            break;
                        case '6':
                            FV_SendGift();
                            break;
                        case '5':
                            FV_Join();
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
    LogPush('<span style="color:green"><strong>Starting Automatic Request processing</strong></span>');

    bAutoRun = true;
    iRequestNum = 0;

    oRespectList.Erase();
    oWallList.Erase();
    oRequestList.Erase();

    if (aParams[1] == null) aParams[1] = 0;
    if (aParams[3] == null) aParams[3] = 0;
    if (aParams[6] == null) aParams[6] = 0;


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
    if( aParams[6] > 0) {
        GM_log('dispatching Event ActionRespect');
        EventSpan.dispatchEvent(ActionRespect);
    } else {
        LogPush('Respect Processing is Disabled');
    }

}

function StopProcessing() {

    bAutoRun = false;
    clearTimeout(iRespectCurrent);
    clearTimeout(iRequestCurrent);
    clearTimeout(iWallCurrent);

    LogPush('<span style="color:red"><strong>Stopping Automatic Request Processing</strong></span>');
}

/*** Start section to read in items from MW and FV  ****/

//Read Respect
function ReadRespect() {

    var myUrl, myParms;
    var iHoldEvent, iWatchDog;

    iHoldEvent = iRespectCurrent;

    // stop processing if autorun turned off
    if (bAutoRun) {

        oRespectList.Erase();

        if (xw_sig_valid == false) {
            GM_log('About Read Respect.  MW does not appear to be working');
            LogPush('<strong>Ignoring Crime Spree Gifts.  Mafia Wars does not appear to be working.  Checking again in '+aParams[6]+' minutes.</strong>');
            iRespectCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRespect);},getRandRange(aParams[6]*50000,aParams[6]*70000));
            if (iRespectCurrent < iHoldEvent) {
                // The browser has reset.  Cancel runaway jobs;
                clearTimeout(iRespectCurrent);
            }
        } else {
            GM_log('start');

            myUrl     =  'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=safehouse&xw_action=view&xw_city=1';
            myParms   =  'skip_req_frame=1&first_load=1';
            myParms  +=  '&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;

            // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
            iWatchDog = setTimeout(function (e) {
                iCurrentJob.abort();
                GM_log('WatchDog timer killing Read Respect job.');

                //zero out the found list
                FirstRespect    = null;
                LastRespect     = null;

                LogPush('<strong>Finished processing crime spree gifts.  Checking again in '+aParams[6]+' minutes.</strong>');
                iRespectCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRespect);},getRandRange(aParams[6]*50000,aParams[6]*70000));
                if (iRespectCurrent < iHoldEvent) {
                    // The browser has reset.  Cancel runaway jobs;
                    clearTimeout(iRespectCurrent);
                }
            }, 30000);

            // check for respect
            iCurrentJob = GM_xmlhttpRequest({
                method: 'POST',
                url:  myUrl,
                data: myParms,
                headers: {
                    'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-us,en;q=0.5',
                    'Content-Type':    'application/x-www-form-urlencoded'
                },
                onload: function(_responseDetails) {
                    try {

                        var strTemp;
                        var i1,i2;
                        var oDiv,oButton, oSnapShot;

                        var oRespect;

                        // clear watch dog timer
                        clearTimeout(iWatchDog);

                        if (_responseDetails.status != 200) {
                            GM_log('Error checking for crime spree gifts');
                        } else {
                            oDiv = document.createElement('div');

                            strTemp = _responseDetails.responseText;

                            i1 = strTemp.indexOf('<div class="gift_safehouse_giftbox_cont">');
                            i2 = strTemp.indexOf('<script type="text/javascript">',i1);

                            oDiv.innerHTML = strTemp.slice(i1,i2);

                            //oSnapShot = getSnapshot('.//div[@class="gift_safehouse_open_link"]/a',oDiv);
                            oSnapShot = getSnapshot('.//div[@class="gift_safehouse_open_link"]/a/span/span[text()="Open Safe"]//parent::*//parent::a',oDiv);

                            if(oSnapShot.snapshotLength>0) {
                                LogPush('<strong>Found '+oSnapShot.snapshotLength+' crime spree gifts</strong>');

                                for (var i=0;i<oSnapShot.snapshotLength;i++) {
                                    oButton         =   oSnapShot.snapshotItem(oSnapShot.snapshotLength-1-i);
                                    oRespect        =   new RespectItem();
                                    oRespect.Action =   oButton.href;
                                    oRespectList.Append(oRespect);
                                }
                            }

                            // start processing the requests

                            if (oRespectList.First != null) {
                                 iRespectCurrent = setTimeout(function (e) {EventSpan.dispatchEvent(ActionRespect);}, getRandRange(aParams[5]*750,aParams[5]*1250));
                            } else {
                                LogPush('<strong>Finished processing crime spree gifts.  Checking again in '+aParams[6]+' minutes.</strong>');
                                iRespectCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRespect);}, getRandRange(aParams[6]*50000,aParams[6]*70000));
                            }
                            if (iRespectCurrent < iHoldEvent) {
                                // The browser has reset.  Cancel runaway jobs;
                                clearTimeout(iRespectCurrent);
                            }

                       }
                    } catch(err) {
                        GM_log('Error: Read Respect - '+err.message);
                        LogPush('<strong>Error in Crime Spree Gifts.  Checking again in '+aParams[6]+' minutes.</strong>');
                        iRespectCurrent = setTimeout(function (e) { oRespectList.Erase(); EventSpan.dispatchEvent(ActionRespect);},getRandRange(aParams[6]*50000,aParams[6]*70000));
                        if (iRespectCurrent < iHoldEvent) {
                            // The browser has reset.  Cancel runaway jobs;
                            clearTimeout(iRespectCurrent);
                        }

                    }
                }
            });
        }
    } else {
        GM_log('Abort read request.  Switch is off');
    }
}



//Read Wall Posting
function ReadWall() {

    var myUrl;
    var iHoldEvent, iWatchDog;
    var iNewNow

    iHoldEvent = iWallCurrent;
    iNewNow = Math.floor(new Date().valueOf()/1000);
    var maxstories = 100;
    if (astrWallLast.length>0) maxstories = 50
    // stop processing if autorun turned off
    if (bAutoRun) {

        oWallList.Erase();

        myUrl           =   'http://www.facebook.com/ajax/apps/app_stories.php?__a=1&newest='+iNow+'&app_ids=10979261223_102452128776&max_stories='+maxstories+'&show_hidden=true&ignore_self=true&use_primer=1&request_type=1';

        // Note:  It will work for the following Apps (apps_ids=   )
        // 10979261223      Mafia Wars
        // 102452128776     FarmVill


        // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
        iWatchDog = setTimeout(function (e) {
            iCurrentJob.abort();
            GM_log('WatchDog timer killing Read Wall job.');
            LogPush('<strong>Finished processing Wall Notices.  Checking again in '+aParams[3]+' seconds.</strong>');
            iWallCurrent    = setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);},getRandRange(aParams[3]*750,aParams[3]*1250));
                if (iWallCurrent < iHoldEvent) {
                // The browser has reset.  Cancel runaway jobs;
                clearTimeout(iWallCurrent);
            }
        }, 30000);

        // check for wall notifications
        iCurrentJob = GM_xmlhttpRequest({
            method: 'GET',
            url:  myUrl,
            headers: {
                'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-us,en;q=0.5',
                'X-SVN-Rev':        unsafeWindow.Env.svn_rev
            },
            onload: function(_responseDetails) {

               try {
                    var i1, i2, iNumStories, iWallNum;
                    var strTemp, strHTML;
                    var oDom, oDiv, oSnap;
                    var oButton, oActorName, oAttachmentTitle;
                    var oUl, oLi;
                    var oDetail;
                    var link_data;
                    var myImg;
                    var bSkipItem;

                    var iWallTest;
                    var astrWallTest;

    		    var now    = new Date();
    		    var hour   = now.getHours() + now.getTimezoneOffset()/60;
		    if (hour >= 24) hour -= 24

                    // clear watch dog timer
                    clearTimeout(iWatchDog);

                    strTemp = _responseDetails.responseText;

                    iWallNum        = 0;

                    i1 = strTemp.indexOf('{')
                    oDetails = JSON.parse(strTemp.slice(i1));

                    if (oDetails.payload == null) {

                        //GM_log(oDetails.onafterload[0]);

                        //Bootloader.loadComponents(["live-timer"], function(){ LiveTimer.restart(1286467875); });
                        i1      = oDetails.onafterload[0].indexOf('LiveTimer.restart(');
                        i2      = oDetails.onafterload[0].indexOf(')',i1);

                        iNow    = oDetails.onafterload[0].slice(i1+18,i2);

                        i1      = oDetails.onload[1].indexOf('HTML(')+5;
                        i2      = oDetails.onload[1].indexOf('));',i1);

                        oDom = document.createElement('div');

                        eval('oDom.innerHTML ='+oDetails.onload[1].slice(i1,i2));

                        oUl = oDom.childNodes[0];

                        //test from Viper to stop duplicate wall notifications.
                        //this is an issue with the story method of reading notifications
                        iWallTest = 1
                        astrWallTest = new Array();
                        astrWallTest = astrWallLast.slice();
			astrWallLast.clear;

                        for (var i=0;i<oUl.childNodes.length;i++){

                            // stop the loop if duplicates found
                            if (iWallTest==2) {GM_log('Stop Wall Read Dup Wall Notifications'); break;}

                            // get one wall notification
                            oLi = oUl.childNodes[i];

                            link_data = oLi.getAttribute('data-ft');
                            if (link_data == null) {
                                if (oLi.innerHTML.indexOf('10979261223')!=-1) { 
                                    link_data = '{"app_id":10979261223}';
                                } else if (oLi.innerHTML.indexOf('102452128776')!=-1) { 
                                    link_data = '{"app_id":102452128776}';
                                }
                            }
                            if (link_data != null) {

                                eval('link_data = '+link_data);

                                oLi.id = "Ignore";

                                //Get image from LI if it exists
                                oSnap       = getSnapshot('.//div[contains(@class,"UIImageBlock")]/a/img',oLi)
                                if (oSnap.snapshotLength == 0) {
                                    myImg = ""
                                } else {
                                    myImg = oSnap.snapshotItem(0).src
                                }

                                //Find the Buttons (Accept, Ignore, Etc)
                                oButton     		= getSnapshot('.//span[contains(@class,"UIActionLinks UIActionLinks_bottom")]/a',oLi).snapshotItem(0);
                                oActorName			= getSnapshot('.//div[contains(@class,"actorName")]',oLi).snapshotItem(0);
                                oAttachmentTitle	= getSnapshot('.//div[contains(@class,"uiAttachmentTitle")]',oLi).snapshotItem(0)
                                	
                                oWall           =   new WallItem();

                                //Cycle through each LI and look for Application specific keys
                                for (var name in Wall_Data[link_data.app_id]) {
                                    // stop the loop if duplicates found
                                    if (iWallTest==2) {GM_log('Stop Wall Read Dup Wall Notifications'); break;}

                                    if( (Wall_Data[link_data.app_id][name]['testURL'].test(oButton.href)) && (Wall_Data[link_data.app_id][name]['testIMG'].test(myImg))){
	
                                        oWall.Type      		=   name
                                        oWall.Action    		=   oButton.href;
                                        oWall.BName     		=   oButton.text;
                                        oWall.ActorName 		=	(oActorName===null?'':oActorName.innerHTML);
                                        oWall.AttachmentTitle	=   (oAttachmentTitle===null?'':oAttachmentTitle.innerHTML);

                                        oWall.AppId     		=   link_data.app_id;
                                        oWall.srcImg    		=   myImg;

                                        // test to see if we should process them
                                        bSkipItem = true;

                                        // again Viper code to remove stop dup wall notications
					for (var j=0;j<astrWallTest.length;j++) {
					    if (oWall.Action==astrWallTest[j]) {
						iWallTest = 2;
						break;
					    }
					}
                                        if (iWallTest == 2) break;
					astrWallLast[i] = oWall.Action;
                                        switch (oWall.AppId) {
                                            case 10979261223:
                                                // Mafia Wars
                                                GM_log('Mafia Wars');
                                                if (xw_sig_valid == false) {
                                                    GM_log('Ignoring MW Wall notice.  Mafia Wars does not appear to be working.');
                                                    LogPush('Ignoring MW Wall Notice.  Mafia Wars does not appear to be working.');
                                                } else if(oWall.Action.indexOf(local_xw_user_id.slice(2))!=-1) {
						    GM_log('Ignoring MW Wall notice.  Cannot process own feeds.');
                                                } else {
                                                    //Ignore some types of jobs based on settings
                                                    switch (oWall.Type) {
                                                        case 'Ignore':
                                                            bSkipItem = true;
                                                            break;
                                                        case 'MW_SoccerFan':
                                                            if (aParams[2016]==true) bSkipItem = false //else LogPush('MW: Skipping Need Help notice');
                                                            break;
                                                        case 'MW_VegasSlots':
                                                            if (aParams[2015]==true) bSkipItem = false //else LogPush('MW: Skipping Need Help notice');
                                                            break;
                                                        case 'MW_NeedHelp_NY':
                                                        case 'MW_NeedHelp_Cuba':
                                                        case 'MW_NeedHelp_Moscow':
                                                        case 'MW_NeedHelp_Bangkok':
                                                        case 'MW_NeedHelp_Vegas':
                                                        case 'MW_NeedHelp_Italy':
                                                            if (aParams[2004]==true) bSkipItem = false //else LogPush('MW: Skipping Need Help notice');
                                                            break;
                                                        case 'MW_FriendofFriend':
                                                            if (aParams[2005]==true) bSkipItem = false //else LogPush('MW: Skipping Help Friend of Friend notice');
                                                            break;
                                                        case 'MW_NextTarget':
                                                            if (aParams[2006]==true) bSkipItem = false //else LogPush('MW: Skipping Next Target notice');
                                                            break;
                                                        case 'MW_Bounty':
                                                            if (aParams[2007]==true) bSkipItem = false //else LogPush('MW: Skipping Bounty notice');
                                                            break;
                                                        case 'MW_LaunderMoney':
                                                            if (aParams[2009]==true) bSkipItem = false //else LogPush('MW: Skipping Money Laundering notice');
                                                            break;
                                                        case 'MW_SupplyEnergy':
                                                        case 'MW_SupplyParts':
                                                            if (aParams[2010]==true) bSkipItem = false //else LogPush('MW: Skipping Supply Parts notice');
                                                            break;
                                                        case 'MW_WarHelp':
                                                            if (aParams[2011]==true) bSkipItem = false //else LogPush('MW: Skipping War Help Notice');
                                                            break;
                                                        case 'MW_BossBonus':
                                                          if (aParams[2013]==true) bSkipItem = false //else LogPush('MW: Skipping Boss Bonus');
                                                            break;
                                                        case 'MW_IcedBonus':
                                                          if (aParams[2008]==true) {
                                                              if (getCurrentTime()>MW_IcedBonusDelay) {
                                                                  bSkipItem = false //else LogPush('MW: Skipping Bonus/Reward/Stash/Burner notice');
                                                              } else {
                                                                  LogPush('MW Iced Bonus skipped: Daily limit reached');
                                                              }
                                                          }
                                                          break;
                                                        case 'MW_FreeGift':
                                                        case 'MW_Achievement':
                                                        case 'MW_LevelUp':
                                                        case 'MW_Fight_Event':
                                                        case 'MW_BonusLoot':
                                                        case 'MW_HolidayBonus':
                                                        case 'MW_WeaponsDepot':
                                                        case 'MW_ChopShop':
                                                        case 'MW_Armory':
							case 'MW_Zoo':
                                                        case 'MW_Robbing':
                                                        case 'MW_Burner':
                                                        case 'MW_LootDropEvent':
                                                        case 'MW_ShareRewardEvent':
                                                            if (aParams[2008]==true) bSkipItem = false //else LogPush('MW: Skipping Bonus/Reward/Stash/Burner notice');
                                                            break;
                                                        case 'MW_Secret_Reward':
							    if (aParams[2008]==true) {
                                                        	i1 = oWall.Action.indexOf('feed_target=')+12;
                                                        	i2 = oWall.Action.indexOf('&ref=nf',i1);
								if (oWall.Action.slice(i1,i2) == FB_user_id) bSkipItem = false;
							    }
							    break;
                                                        case 'MW_WeaponsDepot':
                                                        case 'MW_ChopShop':
                                                        case 'MW_Armory':
							case 'MW_XMasJunk':
                                                            if (oWall.Action.indexOf('help_initial') != -1) {
                                                                if (aParams[2010]==true) bSkipItem = false //else LogPush('MW: Skipping initial Armory/CS/WD Parts send');
                                                                break;
                                                            } else if (aParams[2008]==true) {
                                                                bSkipItem = false
                                                            }
                                                            break;
                                                        case 'MW_Stash':
                                                            if (aParams[2014]==true) {
                                                                if (aParams[2049]==true || hour < 7) {
                                                                    bSkipItem = false;
                                                                    break;
                                                                }
                                                                i3 = oLi.innerHTML.indexOf('secret stash of "');
                                                                i4 = oLi.innerHTML.indexOf('" in Mafia Wars!',i3);
                                                                strTemp = oLi.innerHTML.slice(i3+17,i4);
                                                                //alert(strTemp);

                                                                for (var s=2050;s<2081;s++) {
                                                                    if ((strTemp == MW_StashList[s].test) && ((aParams[s]==true))) bSkipItem = false;
                                                                }
                                                                if (bSkipItem==true) LogPush('MW Secret Stash skipped: ' +strTemp);
                                                            }
                                                            break;

                                                        case 'MW_Missions':
                                                            if ((aParams[2021]==2)||(aParams[2021]==3)) bSkipItem = false;
                                                            break;
                                                    }
                                                    GM_log('bSkipItem = '+bSkipItem);
                                                }
                                                break;
                                            case 102452128776:
                                                // FarmVille
                                                // Ignore some types of jobs based on settings
                                                switch (oWall.Type) {
                                                    //rewards
                                                    case 'Ignore':
                                                        bSkipItem = true;
                                                        break;
                                                    case 'FV_Ignore':
                                                        bSkipItem = true;
                                                        break;
                                                    case 'FV_MasteryFriendRewad':
                                                    case 'FV_HorseStableFriendReward':
                                                    case 'FV_FertilizeThankFriendReward':
                                                    case 'FV_SocialMissionShareBonusFriendReward':
                                                    case 'FV_AchievementFriendReward':
                                                    case 'FV_TuscanWeddingRedeemFriendReward':
                                                    case 'FV_TuscanWeddingFriendReward':
                                                    case 'FV_WanderingStallionFriendReward':
                                                    case 'FV_StorageExpansionFriendReward':
                                                    case 'FV_FuelDiscoveryFriendReward':
                                                    case 'FV_ConstructionBuildingFriendReward':
                                                        if (aParams[oWall.Type]==true){ bSkipItem = false } else { LogPush('FV: Skipping '+oWall.Type) }
                                                        break;
                                                    default:
                                                        GM_log('FV MyImg = '+myImg);
                                                        GM_log('oWall.Type = '+oWall.Type);

                                                        if (myImg=="") {
                                                            // no image = process the item
                                                            bSkipItem = false
                                                        } else {

                                                            switch (oWall.Type) {
                                                                //flowers
                                                                case 'FV_FlowerFriendReward':
                                                                    for (var id in FV_flowers) { if (FV_flowers[id].img_test(myImg)){ bSkipItem = !aParams[id] } else { LogPush('FV: Skipping '+FV_flowers[id].text) }; break; };
                                                                    break;
                                                                //bushels
                                                                case 'FV_BushelFriendReward':
                                                                case 'FV_StallThankYouFriendReward':
                                                                    GM_log('img= '+myImg);
                                                                    for (var id in FV_bushels) { if (FV_bushels[id].img_test(myImg)){ bSkipItem = !aParams[id] } else { LogPush('FV: Skipping '+FV_bushels[id].text) }; break; };
                                                                    break;
                                                                //adopt
                                                                case 'FV_lonely_cow':
                                                                case 'FV_FoalFriendReward':
                                                                case 'FV_NurseryBuildingFriendReward':
                                                                      for (var id in FV_animals) { if (FV_animals[id].img_test(myImg)){ bSkipItem = !aParams[id] } else { LogPush('FV: Skipping '+FV_animals[id].text) }; break; };
                                                                      break;
                                                                    //Hatch an Egg
                                                                    case 'FV_EggFriendReward':
                                                                      for (var id in FV_eggs) { if (FV_eggs[id].img_test(myImg)){ bSkipItem = !aParams[id] } else { LogPush('FV: Skipping '+FV_eggs[id].text) }; break; };
                                                                      break;
                                                                    //Collections
                                                                    case 'FV_CollectionsFriendReward':
                                                                      if (oWall.BName.indexOf('Find a collectible')!=-1) {
                                                                        for (var id in FV_collectables) { if (FV_collectables[id].img_test(myImg)){ bSkipItem = !aParams[id] } else { LogPush('FV: Skipping '+FV_collectables[id].text) }; break; };
                                                                      } else {
                                                                        bSkipItem  =  !aParams[oWall.Type]
                                                                      }
                                                                      break;
                                                            }
                                                        }

                                                }
                                                break;
                                        }

                                        // end test section

                                        if (!bSkipItem) {

                                            if (name != "MW_WarHelp" && name != "MW_Missions") {
                                                //add to bottom
                                                oWallList.Append(oWall);
                                            } else {
                                                //add to top
                                                oWallList.Insert(oWall);
                                            }
                                            GM_log('iWallNum = '+iWallNum);
                                            iWallNum        =   iWallNum + 1;
                                        }


                                    }
                                }

                            } else {
                                    GM_log('link data is null');
                            }
                        }

                    } else {
                        GM_log('Error');
                    }
                    for (var m=0;m<aMissionRetry[0].length;m++) {
                    	if (aMissionRetry[1][m] < getCurrentTime() && ((aParams[2021]==2)||(aParams[2021]==3))) { 
                            //pulls out items from the queue to re-process
                            oWallList.Insert(aMissionRetry[0][m]);
                            iWallNum++;
                            aMissionRetry[0].splice(m,1);
                            aMissionRetry[1].splice(m,1);
                            m--;
                        }
                    }
                    if (bAutoRun) {
                      if (oWallList.First != null) {
                          LogPush('<strong>'+iWallNum +' wall notification(s) have been found and will be processed</strong>');
                          iWallCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, getRandRange(aParams[2]*750,aParams[2]*1250));
                      } else {
                          iWallCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, getRandRange(aParams[3]*750,aParams[3]*1250));
                      }
                      if (iWallCurrent < iHoldEvent) {
                          // The browser has reset.  Cancel runaway jobs;
                          clearTimeout(iWallCurrent);
                      }
                    }
                } catch(err) {
                  if (bAutoRun) {
                      GM_log('Error: Read Wall - '+err.message);
                      if (strTemp!=undefined) GM_log('Error: Read Wall 2 - '+strTemp.slice(0,100));
                      LogPush('<strong>Error Reading Wall Notices.  Checking again in '+aParams[3]+' seconds.</strong>');
                      iWallCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionWall);}, getRandRange(aParams[3]*750,aParams[3]*1250));
                      if (iRespectCurrent < iHoldEvent) {
                          // The browser has reset.  Cancel runaway jobs;
                          clearTimeout(iRespectCurrent);
                      }
                    }
                }
            }
        })
    } else {
        GM_log('Abort read request.  Switch is off');
    }
}


// Read Request from FB

function Read_FB_Requests(){

    var iHoldEvent, iCurrentJob;
    var iWatchDog;

    var myUrl;

    iRequestNum = 0;
    var iNumPigs = 0;
    var iNumDrops = 0;
    /*var iNumTemp1 = 0;
    var iNumTemp2 = 0;
    var iNumTemp3 = 0;*/
    var iNum = new Array();
    for (var name in spamItems) {
	iNum[name] = 0;
    }

    iHoldEvent = iRequestCurrent;

    GM_log('Read_FB_Requests');

    if (bAutoRun) {

        oRequestList.Erase();

        // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
        iWatchDog = setTimeout(function (e) {
            iCurrentJob.abort();
            GM_log('WatchDog timer killing Read_FB_Requests');

            if (oRequestList.First != null) {
                LogPush('<strong>'+iRequestNum +' request(s) have been found and will be processed</strong>');
                iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[0]*750,aParams[0]*1250));
            } else {
                iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[1]*750,aParams[1]*1250));
            }
            if (iWallCurrent < iHoldEvent) {
                // The browser has reset.  Cancel runaway jobs;
                clearTimeout(iRequestCurrent);
            }

        }, 30000);

        myUrl    =   'http://www.facebook.com/reqs.php';

        iCurrentJob = GM_xmlhttpRequest({
        method: 'GET',
        url:  myUrl,
        headers: {
            //'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            //'Accept-Language': 'en-us,en;q=0.5',
            //'Content-Type':    'application/x-www-form-urlencoded; charset=UTF-8'
            'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        onload: function(_responseDetails) {
        try {
            var i1,i2, myUrl, myUrl2;
            var oDOM, oForms, oForm, oFormInputs, oFormInput, oInputs, oInput, oRequest;
            var oSpan;
            var strTemp, strTempGift;
            var iButtons;
            var aCat;
            var oFormId;

            clearTimeout(iWatchDog);

            if (_responseDetails.status != 200) {
                GM_log('Error Read message from MW page');
            } else {

                strTemp = _responseDetails.responseText

                i1 = strTemp.indexOf('<div id="contentArea');
                if (i1 == -1) {
                    GM_log('no Request have been found');
                    return
                } else {
                    i2 = strTemp.indexOf('<div id="bottomContent',i1);
                    
                    oDOM = document.createElement('div');
                    oDOM.innerHTML = strTemp.slice(i1,i2);

                    // Step 1 - find all the Friend Add Requests

                    if (aParams[1002]>0) {
                        oForms = getSnapshot(strConfirmBoxes1, oDOM);
                        GM_log('Friend Requests Found = '+oForms.snapshotLength );

                            for(i=0; i < oForms.snapshotLength; i++) {
                                oForm       =   oForms.snapshotItem(i);
                                oFormInputs =   getSnapshot(strFormInputs, oForm);
                                oRequest            =   new RequestItem();
                                oRequest.Gifttype   =   'friend_connect';

                                for ( j=0; j<oFormInputs.snapshotLength; j++) {
                                    oFormInput      =   oFormInputs.snapshotItem(j);

                                    switch (oFormInput.type) {
                                        case 'hidden':
                                            // grab the parameters need to action the item
                                            oRequest.Parms += "&"+oFormInput.name+"="+escape(oFormInput.value)
                                            break;
                                        case 'submit':
                                            // grab the name of what we are actioning, and the http action request
                                            // remove payload and hard code
                                    }
                                }

                                switch (aParams[1002]) {
                                    case '2': oRequest.Parms += '&actions[accept]=Confirm'; break;
                                    case '1': oRequest.Parms += '&actions[reject]=Delete%20Request'; break;
                                    case '3': oRequest.Parms += '&actions[hide]=Not%20Now'; break;
                                }

                                oRequestList.Append(oRequest);
                                iRequestNum                 =   iRequestNum + 1;
                            }

                        } else {
                            GM_log('Skipping Friend Request');
                        }

                        // Find all the traditional Requests (ie Non Game Requests)

                        oForms = getSnapshot(strConfirmBoxes2, oDOM);

                        GM_log('oForms.snapshotLength = '+oForms.snapshotLength );

                        for(i=0; i < oForms.snapshotLength; i++) {

                            oForm               =   oForms.snapshotItem(i);
                            oFormId             =   getSnapshot(strFormId,oForm).snapshotItem(0).id;
                            aCat                =   oFormId.split('_');

                            oFormInputs         =   getSnapshot(strFormInputs, oForm);
                            oRequest            =   new RequestItem();
                            oRequest.Gifttype   =   oFormId;

                            switch (aCat[0]) {
                                case 'friend':
                                    switch (aCat[1]) {
                                        case 'suggestion':
                                            if (aParams[1000]>0) {
                                                for ( j=0; j<oFormInputs.snapshotLength; j++) {
                                                    oFormInput          =   oFormInputs.snapshotItem(j);
                                                    switch (oFormInput.type) {
                                                        case 'hidden':
                                                            // grab the parameters need to action the item
                                                            oRequest.Parms += "&"+oFormInput.name+"="+escape(oFormInput.value);
                                                            break;
                                                        case 'submit':
                                                            // Remove this stuff and hard code
                                                    }
                                                }
                                                if (aParams[1000]==2)
                                                    oRequest.Parms += "&actions[accept]=Add%20as%20friend"
                                                else
                                                    oRequest.Parms += "&actions[reject]=Ignore"

                                                oRequest.Parms += "&lsd&post_form_id_source=AsyncRequest";

                                                oRequestList.Append(oRequest);
                                                iRequestNum   =   iRequestNum + 1;
                                            } else {
                                                GM_log('Skipping Friend Suggestion');
                                            }
                                            break;
                                    }
                                    break;

                                case 'event':
                                    if (aParams[1004]>0) {
                                        oRequest.Parms  =   '&ok=Okay&__d=1&action=remove';

                                        for ( k=0; k < oFormInputs.snapshotLength; k++) {
                                            oFormInput      =   oFormInputs.snapshotItem(k);
                                            if (oFormInput.type == 'hidden') {
                                                switch (oFormInput.name) {
                                                    case 'id':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                    case 'type':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                    case 'status_div_id':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
                                                    case 'post_form_id':oRequest.Parms += "&"+oFormInput.name+"="+oFormInput.value; break;
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

                        GM_log('Step 4');

                        // find all GAME requests

                        oForms = getSnapshot(strConfirmBoxes3, oDOM);

                        GM_log('oForms.snapshotLength = '+oForms.snapshotLength );

                        for(i=0; i < oForms.snapshotLength; i++) {

                            oForm                 =   oForms.snapshotItem(i);
                            oFormId           =   getSnapshot(strFormId,oForm).snapshotItem(0).id
                            aCat                  =   oFormId.split('_');

                            oFormInputs           =   getSnapshot(strFormInputs, oForm);
                            oRequest            =   new RequestItem();
                            oRequest.Gifttype   =   oFormId;

                            iButtons = 0;

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
                                        }

                                }
                            }

                            oRequest.Parms += '';

                            GM_log('Mafia Wars Request - '+ aCat[1]);
                            if (aCat[1] == '10979261223') {

                                //GM_log('Action = '+oRequest.Action);
                                if (oRequest.Action.indexOf('accept_energy_req')!=-1) {

                                    if (aParams[2020]==0) {
                                        GM_log('Skipping Mafia Wars Accept Energy Request');
                                    } else if (aParams[2020]==1) {
                                        GM_log('Ignoring Mafia Wars Accept Energy Request');
                                        oRequest.Parms += oRequest.Reject;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else {
                                        GM_log('Adding Mafia Wars Accept Energy Request');
                                        oRequest.Parms += oRequest.Action;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    }
                                } else if (oRequest.Action.indexOf('accept_boost')!=-1) {
                                    if (aParams[2000]==0) {
                                        GM_log('Skipping Mafia Wars Accept Boost Request');
                                    } else if (aParams[2000]==1) {
                                        GM_log('Ignoring Mafia Wars Accept Boost Request');
                                        oRequest.Parms += oRequest.Reject;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else if (getCurrentTime()> MW_2XBoostDelay){
                                        GM_log('Adding Mafia Wars Accept Gift Request');
                                        oRequest.Parms += oRequest.Action;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else {
                                        GM_log('Skipping Mafia Wars Accept Boost Request - Reached Limit');
                                    }
                                } else if (oRequest.Action.indexOf('accept_')!=-1) {//
                                    if (MW_FreeGiftsDelay>getCurrentTime()) {
                                        GM_log('Skipping Mafia Wars Accept Gift Request - Max daily limit reached');
                                    /*} else if (oRequest.Action.indexOf(spamItems['item1'].giftID) != -1) {
					iNumTemp1++;
                                        if (aParams[2030]==0) {
                                           GM_log('Skipping Mafia Wars Accept Spam Gift Request');
                                        } else if (aParams[2030]==1) {
                                            GM_log('Ignoring Mafia Wars Accept Spam Gift Request');
                                            oRequest.Parms += oRequest.Reject;
                                            oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            oRequestList.Append(oRequest);
                                            iRequestNum =   iRequestNum + 1;
                                        } else if (aParams[2030]==2) {
                                            GM_log('Adding Mafia Wars Accept Spam Gift Request');
                                            oRequest.Parms += oRequest.Action;
                                            oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            oRequestList.Append(oRequest);
                                            iRequestNum =   iRequestNum + 1;
					} else if (aParams[2030]==3 && iNumTemp1>aParams[2031]) {
                                            GM_log('Adding Mafia Wars Accept Spam Gift Request');
                                            oRequest.Parms += oRequest.Action;
                                            oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            oRequestList.Append(oRequest);
                                            iRequestNum =   iRequestNum + 1;
					}
                                    } else if (oRequest.Action.indexOf(spamItems['item2'].giftID) != -1) {
					iNumTemp2++;
					if (aParams[2032]==0) {
                                           GM_log('Skipping Mafia Wars Accept Spam Gift Request');
                                        } else if (aParams[2032]==1) {
                                            GM_log('Ignoring Mafia Wars Accept Spam Gift Request');
                                            oRequest.Parms += oRequest.Reject;
                                            oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            oRequestList.Append(oRequest);
                                            iRequestNum =   iRequestNum + 1;
                                        } else if (aParams[2032]==2) {
                                            GM_log('Adding Mafia Wars Accept Spam Gift Request');
                                            oRequest.Parms += oRequest.Action;
                                            oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            oRequestList.Append(oRequest);
                                            iRequestNum =   iRequestNum + 1;
					} else if (aParams[2032]==3 && iNumTemp2>aParams[2033]) {
                                            GM_log('Adding Mafia Wars Accept Spam Gift Request');
                                            oRequest.Parms += oRequest.Action;
                                            oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            oRequestList.Append(oRequest);
                                            iRequestNum =   iRequestNum + 1;
					}
                                    } else if (oRequest.Action.indexOf(spamItems['item3'].giftID) != -1) {
					iNumTemp3++;
                                        if (aParams[2034]==0) {
                                           GM_log('Skipping Mafia Wars Accept Spam Gift Request');
                                        } else if (aParams[2034]==1) {
                                            GM_log('Ignoring Mafia Wars Accept Spam Gift Request');
                                            oRequest.Parms += oRequest.Reject;
                                            oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            oRequestList.Append(oRequest);
                                            iRequestNum =   iRequestNum + 1;
                                        } else if (aParams[2034]==2) {
                                            GM_log('Adding Mafia Wars Accept Spam Gift Request');
                                            oRequest.Parms += oRequest.Action;
                                            oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            oRequestList.Append(oRequest);
                                            iRequestNum =   iRequestNum + 1;
					} else if (aParams[2034]==3 && iNumTemp3>aParams[2035]) {
                                            GM_log('Adding Mafia Wars Accept Spam Gift Request');
                                            oRequest.Parms += oRequest.Action;
                                            oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            oRequestList.Append(oRequest);
                                            iRequestNum =   iRequestNum + 1;
					}*/
                                    } else if (oRequest.Action.indexOf('Capsule') != -1) {
                                	   GM_log('Time Capsules Found: ' + ++iNumPigs);
                                        if (aParams[2024]==0) {
                                           GM_log('Skipping Mafia Wars Accept Gift Time Capsule Request');
                                        } else if (aParams[2024]==1) {
                                            GM_log('Ignoring Mafia Wars Accept Gift Time Capsule Request');
                                            oRequest.Parms += oRequest.Reject;
                                            oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            oRequestList.Append(oRequest);
                                            iRequestNum =   iRequestNum + 1;
                                        } else if (aParams[2024]==3) {
                                           GM_log('Adding Mafia Wars Accept Gift Request');
                                            oRequest.Parms += oRequest.Action;
                                            oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            oRequestList.Append(oRequest);
                                            iRequestNum =   iRequestNum + 1;
                                        } else if (aParams[2024]==2) {
                                          if (getCurrentTime() > MW_SuperPigDelay) {
                                                GM_log('Adding Mafia Wars Accept Gift Request');
                                                oRequest.Parms += oRequest.Action;
                                                oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                                oRequestList.Append(oRequest);
                                                iRequestNum =   iRequestNum + 1;
                                            } else {
                                                GM_log('Skipping Mafia Wars Accept Gift Time Capsule Request');
                                            }
	                                    } else if (aParams[2024]==4 && iNumPigs>5) {
	                                        GM_log('Adding Mafia Wars Accept Gift Request');
	                                        oRequest.Parms += oRequest.Action;
	                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
	                                        oRequestList.Append(oRequest);
	                                        iRequestNum =   iRequestNum + 1; 
	                                    }
		                                
	                                } else if (oRequest.Action.indexOf('Secret%2BDrop') != -1) {
                                	    GM_log('Secret Drops Found: ' + ++iNumDrops);
		                                if (aParams[2025]==0) {
			                               GM_log('Skipping Mafia Wars Accept Gift Secret Drop Request');
	                                    } else if (aParams[2025]==1) {
	                                        GM_log('Ignoring Mafia Wars Accept Gift Secret Drop Request');
	                                        oRequest.Parms += oRequest.Reject;
	                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
	                                        oRequestList.Append(oRequest);
	                                        iRequestNum =   iRequestNum + 1;
	                                    } else if (aParams[2025]==3) {
			                               GM_log('Adding Mafia Wars Accept Gift Request');
	                                        oRequest.Parms += oRequest.Action;
	                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
	                                        oRequestList.Append(oRequest);
	                                        iRequestNum =   iRequestNum + 1; 
	                                    } else if (aParams[2025]==2) {
		                                  if (getCurrentTime() > MW_SecretDropDelay) {
				                                GM_log('Adding Mafia Wars Accept Gift Request');
		                                        oRequest.Parms += oRequest.Action;
		                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
		                                        oRequestList.Append(oRequest);
		                                        iRequestNum =   iRequestNum + 1;
			                                } else {
				                                GM_log('Skipping Mafia Wars Accept Gift Secret Drop Request');
			                                }  
	                                    } else if (aParams[2025]==4 && iNumDrops>3) {
	                                        GM_log('Adding Mafia Wars Accept Gift Request');
	                                        oRequest.Parms += oRequest.Action;
	                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
	                                        oRequestList.Append(oRequest);
	                                        iRequestNum =   iRequestNum + 1; 
	                                    }
				    } else {
					var bSkipItem = false;
					for (var name in spamItems) {
				            if (oRequest.Action.indexOf(spamItems[name].giftID) != -1) {
					    	iNum[name]++;
                                            	if (aParams[name]==0) {
                                                    GM_log('Skipping Mafia Wars Accept Spam Gift Request');
                                            	} else if (aParams[name]==1) {
                                                    GM_log('Ignoring Mafia Wars Accept Spam Gift Request');
                                                    oRequest.Parms += oRequest.Reject;
                                                    oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                                    oRequestList.Append(oRequest);
                                            	    iRequestNum =   iRequestNum + 1;
                                            	} else if (aParams[name]==2) {
                                            	    GM_log('Adding Mafia Wars Accept Spam Gift Request');
                                            	    oRequest.Parms += oRequest.Action;
                                            	    oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            	    oRequestList.Append(oRequest);
                                            	    iRequestNum =   iRequestNum + 1;
					    	} else if (aParams[name]==3 && iNum[name]>aParams[name+'keepx']) {
                                            	    GM_log('Adding Mafia Wars Accept Spam Gift Request');
                                            	    oRequest.Parms += oRequest.Action;
                                            	    oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                            	    oRequestList.Append(oRequest);
                                            	    iRequestNum =   iRequestNum + 1;
					    	}
						bSkipItem = true;
					    	break;
					    }
					}
					if (!bSkipItem) {
                                    	    if (aParams[2000]==0) {
                                        	GM_log('Skipping Mafia Wars Accept Gift Request');
                                    	    } else if (aParams[2000]==1) {
                                        	GM_log('Ignoring Mafia Wars Accept Gift Request');
                                        	oRequest.Parms += oRequest.Reject;
                                        	oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        	oRequestList.Append(oRequest);
                                        	iRequestNum =   iRequestNum + 1;
                                    	    } else {
                                        	GM_log('Adding Mafia Wars Accept Gift Request');
                                        	oRequest.Parms += oRequest.Action;
                                        	oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        	oRequestList.Append(oRequest);
                                        	iRequestNum =   iRequestNum + 1;
                                    	    }
					}
				    }
                                } else if (oRequest.Action.indexOf('safehouse')!=-1) {
                                    if (aParams[2001]==0) {
                                        GM_log('Skipping Mafia Wars Send Gift Request');
                                    } else if (aParams[2001]==1) {
                                        GM_log('Ignoring Mafia Wars Send Gift Request');
                                        oRequest.Parms += oRequest.Reject;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else {
                                        GM_log('Adding Mafia Wars Send Gift Request');
                                        oRequest.Parms += oRequest.Action;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    }
                                } else if (oRequest.Action.indexOf('socialmission')!=-1) {
                                    if (aParams[2021]==0) {
                                        GM_log('Skipping Mafia Wars Mission Request');
                                    } else if (aParams[2021]==1) {
                                        GM_log('Ignoring Mafia Mission Request');
                                        oRequest.Parms += oRequest.Reject;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else  if ((aParams[2021]==2)||(aParams[2021]==4)) {
                                        GM_log('Adding Mafia Wars Mission Request');
                                        oRequest.Parms += oRequest.Action;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    }
                                }else if (oRequest.Action.indexOf('recruit')!=-1) {
                                    if (aParams[2003]==0) {
                                        GM_log('Skipping Mafia Wars Join Request');
                                    } else if (aParams[2003]==1) {
                                        GM_log('Ignoring Mafia Wars Join Request');
                                        oRequest.Parms += oRequest.Reject;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else {
                                        GM_log('Adding Mafia Wars Join Request');
                                        oRequest.Parms += oRequest.Action;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    }
                                }

                            } else if (aCat[1] == '102452128776') {
                                if (oRequest.Action.indexOf('giftaccept')!=-1) {
                                    if (aParams[3000]==0) {
                                        GM_log('Skipping FarmVille Accept Gift Request');
                                    } else if (aParams[3000]==1) {
                                        GM_log('Ignoring FarmVille Accept Gift Request');
                                        oRequest.Parms += oRequest.Reject;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else {
                                        GM_log('Adding FarmVille Accept Gift Request');
                                        oRequest.Parms += oRequest.Action;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    }
                                } else if ((oRequest.Action.indexOf('sendcredits')!=-1) || (oRequest.Action.indexOf('sendmats')!=-1)) {
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
                                } else if (oRequest.Action.indexOf('stimulus')!=-1) {
                                    if (aParams[3004]==0) {
                                        GM_log('Skipping FarmVille Claim Bonus Request');
                                    } else if (aParams[3004]==1) {
                                        GM_log('Ignoring FarmVille Claim Bonus Request');
                                        oRequest.Parms += oRequest.Reject;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else {
                                        GM_log('Adding FarmVille Claim Bonus Request');
                                        oRequest.Parms += oRequest.Action;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    }
                                } else if (oRequest.Action.indexOf('addneighbor')!=-1) {
                                    if (aParams[3003]==0) {
                                        GM_log('Skipping FarmVille Join Request');
                                    } else if (aParams[3003]==1) {
                                        GM_log('Ignoring FarmVille Join Request');
                                        oRequest.Parms += oRequest.Reject;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    } else {
                                        GM_log('Adding FarmVille Join Request');
                                        oRequest.Parms += oRequest.Action;
                                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                                        oRequestList.Append(oRequest);
                                        iRequestNum =   iRequestNum + 1;
                                    }
                                }

                            } else {
                                if (aParams[4000]==0) {
                                    GM_log('Skipping Other Request');
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

                      }

                      GM_log('done: ' +iRequestNum);
		      var strNotice = '<b>Spam Event Items:</b> ';
		      for (var name in spamItems) {
			strNotice += spamItems[name].text + ': ' + iNum[name] + ', ';
		      }
		      LogPush(strNotice);

                      if (bAutoRun) {

                        if (oRequestList.First != null) {
                            LogPush('<strong>'+iRequestNum +' request(s) have been found and will be processed</strong>');
                            iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[0]*750,aParams[0]*1250));
                        } else {
                            iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[1]*50000,aParams[1]*70000));
                        }
                        if (iRequestCurrent < iHoldEvent) {
                            // The browser has reset.  Cancel runaway jobs;
                            GM_log('test4');
                            clearTimeout(iRequestCurrent);
                        }
                      }

                  }
              } catch(err) {
                if (bAutoRun) {
                    GM_log('Error done: ' +iRequestNum);
                    GM_log('Error: Read FB Requests - '+err.message);
                    if (oRequestList.First != null) {
                        LogPush('<strong>'+iRequestNum +' request(s) have been found and will be processed</strong>');
                        iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[0]*750,aParams[0]*1250));
                    } else {
                        iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[1]*50000,aParams[1]*70000));
                    }
                    if (iWallCurrent < iHoldEvent) {
                        // The browser has reset.  Cancel runaway jobs;
                        clearTimeout(iRequestCurrent);
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

            // get a current xw_sig if Mafia Wars is open
            MW_xw_sig_update();

            break;

        case 'FaceBook':

            // create lists
            oRespectList    = new List(ReadRespect);
            oWallList       = new List(ReadWall);
            oRequestList    = new List(Read_FB_Requests);


            // Set up Event handling
            EventSpan = document.createElement('span');

            EventSpan.addEventListener("FBAA-ActionRespect",    function(evt) {oRespectList.Run()}, false);
            EventSpan.addEventListener("FBAA-ActionWall",       function(evt) {oWallList.Run()}, false);
            EventSpan.addEventListener("FBAA-ActionRequest",    function(evt) {oRequestList.Run()}, false);

            ActionRespect   = document.createEvent("Events"); ActionRespect.initEvent("FBAA-ActionRespect", false, false);
            ActionWall      = document.createEvent("Events"); ActionWall.initEvent("FBAA-ActionWall", false, false);
            ActionRequest   = document.createEvent("Events"); ActionRequest.initEvent("FBAA-ActionRequest", false, false);

            //set Up Log File

            oLogDiv = document.createElement('div');
            oLogDiv.setAttribute('style','width: 770px; height: 250px; overflow: auto; border: 1px solid rgb(204, 204, 204); padding-bottom: 2px; background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_log.jpg");');

            oLogDiv.innerHTML = GM_getValue('LogDiv','');
            GM_setValue('LogDiv',oLogDiv.innerHTML);

            //set the time for wall processing (go back 3 hours);
            iNow = Math.floor(new Date().valueOf()/1000)-60*60*3;

            //set up the FV Delay timer
            FV_accept_ignore = 0;

            // fb user id
            if(unsafeWindow.self.Env.user == undefined)
                FB_user_id = GM_getvalue('FB_user_id',0)
            else
                FB_user_id = unsafeWindow.self.Env.user;

            GM_setValue('FB_user_id',FB_user_id+'');
            GM_log('FB_user_id = '+FB_user_id);

            //get Save Set
            strSaveSet = GM_getValue('FBAA-SaveSet','A');
            GM_setValue('FBAA-SaveSet',strSaveSet);

            //set up the group Names
            strGroups       =   '<option value="0">-</option>';
            getGroupNames();

            // start a routine to keep the xw_sig current
            xw_sig_valid = false;
            local_xw_user_id=''

            //get updated NW credentials
            FB_xw_sig_update();
            // refresh every 4 minutes
            iFB_XW_Timer = setInterval(FB_xw_sig_update, 240000 );


            bAutoRun    = GM_getValue('bAutoRun',false);
            bShowLog    = GM_getValue('bShowLog',false);

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
                GM_log(strPara);
                eval('aParams = '+strPara);
                GM_log(aParams[2005]);
            } catch (ierr) {
                aParams.length = 0;
                aParams = {};
                GM_setValue('FBAA-Settings-'+strSaveSet,'{}');
            }

            // fix Mission selection
            if (aParams[2021]== undefined) aParams[2021]==0;
            if (aParams[2024]== undefined) aParams[2024]==0;
            if (aParams[2025]== undefined) aParams[2025]==0;

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

            if (bAutoRun) iRequestCurrent = setTimeout(function (e) { StartProcessing();}, 30000)

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
	    // don't show the UI on the search page.
	    return
    } else if (oDom) {
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
                        oImg = document.createElement('img');
                        oImg.setAttribute('height','18px');
                        oImg.src = imgLogo;
                    oH.appendChild(oImg);
                    oH.appendChild(document.createTextNode("  PS Wall Scrubber (FBAA)"));
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
                        oTd.setAttribute('width',"200px");
                            oFont = document.createElement('font');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 13px; font-weight: normal;");
                            oFont.appendChild(document.createTextNode("Auto Process: "));
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
                        oTd.setAttribute('width',"200px");
                            oFont = document.createElement('font');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 13px; font-weight: normal;");
                            oFont.appendChild(document.createTextNode("Log: "));
                                oSpan = document.createElement('span');
                                oSpan.id = strLogShow;
                                oSpan.addEventListener("click", click_ShowLog(1), false);
                                if (bShowLog)
                                    oSpan.innerHTML= '<b>Show</b>'
                                else
                                    oSpan.innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Show</a> </font>';
                            oFont.appendChild(oSpan);
                            oFont.appendChild(document.createTextNode(" / "));
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
                        oTd.setAttribute('width',"120px");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="color: rgb(59, 89, 152); font-size: 13px; font-weight: normal; cursor: pointer;"><a>Settings</a></font>';
                            oSpan.addEventListener("click",  click_ShowSetting, false);
                        oTd.appendChild(oSpan);
                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute('width',"120px");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="color: rgb(59, 89, 152); font-size: 13px; font-weight: normal; cursor: pointer;"><a>Check Updates</a></font>';
                            oSpan.addEventListener("click",  function() { updateCheck(true);}, false);
                        oTd.appendChild(oSpan);
                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                            oFont = document.createElement('font');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 13px; font-weight: normal;");
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
        oDom.setAttribute('style',"display:none; -moz-border-radius: 10px; border: 5px solid rgb(104, 104, 104); padding: 5px; overflow: auto; margin-top: -30px; margin-left: 20px; background-color: white; width: 600px; height: 360px; position: absolute; z-index: 100;");
            oDiv = document.createElement('div');
                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                //oTable.setAttribute('style','border-bottom:1px solid black');
                    oTbody = document.createElement('tbody');
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.innerHTML = '<div><h1 class="uiHeaderTitle">PSFBAA - Settings</h1></div>';
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
                                oDiv1.setAttribute('style','border: 0px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 110px; height: 280px;');
                                    oUl = document.createElement('ul');
                                    oUl.setAttribute('class',"uiSideNav");
                                    oUl.appendChild(addMenu("General",0));
                                    oUl.appendChild(addMenu("FaceBook", 1));
                                    oUl.appendChild(addMenu("Mafia Wars", 2));
                                    oUl.appendChild(addMenu("FarmVille", 3));
                                    oUl.appendChild(addMenu("Others", 4));
                                oDiv1.appendChild(oUl);
                            oTd.appendChild(oDiv1);
                        oTr.appendChild(oTd);
                            oTd = document.createElement('td');
                                oTd.appendChild(CreateGeneralTab(0));
                                oTd.appendChild(CreateFaceBookTab(1));
                                oTd.appendChild(CreateMafiaWarsTab(2));
                                oTd.appendChild(CreateFarmVilleTab(3));
                                oTd.appendChild(CreateOtherTab(4));

                                GM_log('oTd.innerHTML = '+oTd.innerHTML );
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
        oDom.setAttribute('style','display: ;');
        oDom.id = strFBAALog;
            oP = document.createElement('p');
            oP.setAttribute('style',"text-align: right;");
                oFont = document.createElement('font');
                oFont.setAttribute('style',"color: rgb(59, 89, 152); font-size: 13px; font-weight: normal; cursor: pointer;");
                    oButton = document.createElement('a');
                    oButton.textContent = "View Mission Queue";
                    oButton.addEventListener("click", click_MissionQueue, false);
                oFont.appendChild(oButton);
            oP.appendChild(oFont);
                oFont = document.createElement('font');
                oFont.setAttribute('style',"color: rgb(255, 255, 255); font-size: 13px; font-weight: normal; cursor: normal;");
		oFont.innerHTML = '..........';
            oP.appendChild(oFont);
                oFont = document.createElement('font');
                oFont.setAttribute('style',"color: rgb(59, 89, 152); font-size: 13px; font-weight: normal; cursor: pointer;");
                    oButton = document.createElement('a');
                    oButton.textContent = "Clear Log";
                    oButton.addEventListener("click", click_ClearLog, false);
                oFont.appendChild(oButton);
            oP.appendChild(oFont);
        oDom.appendChild(oP);
            oDiv = document.createElement('div');
            oDiv.setAttribute('style','width: 770px; height: 250px; overflow: auto; border: 1px solid rgb(204, 204, 204); padding-bottom: 2px; background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_log.jpg")');
        oDom.appendChild(oDiv);
        oHeader.appendChild(oDom);

        oDom.replaceChild(oLogDiv,oDiv);
        if (bShowLog)
            oLogDiv.parentNode.style.display = ""
        else
            oLogDiv.parentNode.style.display = "none"

    }

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
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto;background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_bg.jpg"); width: 480px; height: 280px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_bg.jpg"); width: 480px; height: 280px;');

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
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 0,'Processing Interval','1 seconds;2 seconds;3 seconds;4 seconds;5 seconds;6 seconds;7 seconds;8 seconds;9 seconds;10 seconds','1;2;3;4;5;6;7;8;9;10');
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
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2,'Processing Interval','1 seconds;2 seconds;3 seconds;4 seconds;5 seconds;6 seconds;7 seconds;8 seconds;9 seconds;10 seconds','1;2;3;4;5;6;7;8;9;10');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 3,'Cycle Period','DISABLE;5 seconds;10 seconds;15 seconds;20 seconds;25 seconds;30 seconds','0;5;10;15;20;25;30');
                    oTbody.appendChild(oTr);
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
                        createDropDownList(oTr, 6,'Cycle Period','DISABLE; 1 minute;5 minutes;15 mintues;30 minutes;1 hour;3 hours;6 hours;12 hours;1 day','0;1;5;15;30;60;180;360;720;1440');
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
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto;background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_bg.jpg"); width: 480px; height: 280px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_bg.jpg"); width: 480px; height: 280px;');

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
                oTable.appendChild(oTbody)
             oForm.appendChild(oTable)
         oDom.appendChild(oForm);

        return oDom;
    }

    function CreateMafiaWarsTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd, oHr ;
        oDom = document.createElement('div');
        if (_id==0)
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_bg.jpg"); width: 480px; height: 280px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_bg.jpg"); width: 480px; height: 280px;');

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
                        createDropDownList(oTr, 2000,'Accept Gifts','Confirm;Ignore;Do Nothing','2;1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2020,'Accept Energy','Confirm;Ignore;Do Nothing','2;1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2024,'Accept Time Capsule','Confirm-Keep5;Confirm-NL;Confirm-L;Ignore;Do Nothing','4;3;2;1;0');
                        createDropDownList(oTr, 2025,'Accept Secret Drops','Confirm-Keep3;Confirm-NL;Confirm-L;Ignore;Do Nothing','4;3;2;1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2001,'Send Crime Spree Gift','Confirm;Ignore;Do Nothing','2;1;0');
                        createDropDownList(oTr, 2002,'Reward','Experience;Energy;Stamina','1;2;3');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2003,'Join','Confirm;Ignore;Do Nothing','2;1;0');
                    oTbody.appendChild(oTr);

                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Spam Event Gifts";
	                    oHr = document.createElement('hr');
	                        oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    	oTbody.appendChild(oTr);
			var iKeepX = '0'
			for (var x=1; x<61; x++) {
		   	    iKeepX = x + ';' + iKeepX;
			}
			for (var name in spamItems) {
			    oTr = document.createElement('tr');
                            createDropDownList(oTr, name,spamItems[name].text,'Confirm-KeepX;Confirm-All;Ignore;Do Nothing','3;2;1;0');
                            createDropDownList(oTr, name+'keepx','KeepX',iKeepX,iKeepX);
                    	    oTbody.appendChild(oTr);
			}
                       /* oTr = document.createElement('tr');
                        createDropDownList(oTr, 2030,spamItems['item1'].text,'Confirm-KeepX;Confirm-All;Ignore;Do Nothing','3;2;1;0');
                        createDropDownList(oTr, 2031,'KeepX',iKeepX,iKeepX);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2032,spamItems['item2'].text,'Confirm-KeepX;Confirm-All;Ignore;Do Nothing','3;2;1;0');
                        createDropDownList(oTr, 2033,'KeepX',iKeepX,iKeepX);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2034,spamItems['item3'].text,'Confirm-KeepX;Confirm-All;Ignore;Do Nothing','3;2;1;0');
                        createDropDownList(oTr, 2035,'KeepX',iKeepX,iKeepX);
                    oTbody.appendChild(oTr);*/

                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Mission Settings (Request and Wall)";
	                           	oHr = document.createElement('hr');
	                        oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2021,'Accept Mission','Confirm-R;Confirm-W;Confirm-RW;Ignore;Do Nothing','4;3;2;1;0');
                        createDropDownList(oTr, 2023,'Type','Energy;Stamina;Both','energy;stamina;both');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2026,'Max Open Slots','1;2;3;4;5;6;7','2;3;4;5;6;7;8');
                        createDropDownList(oTr, 2027,'Queue Until Slots Fill','Yes;No','true;false');
                    oTbody.appendChild(oTr);
	                    oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "Secret Missions";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,MW_SecretMissions);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Wall Settings";
	                           	oHr = document.createElement('hr');
	                        oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
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
                            oTh.textContent = "Stashes to Collect";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,MW_StashList);
                    oTbody.appendChild(oTr);
	                    oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "War Rewards to Collect";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,MW_WarList);
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);
            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    };

    function CreateFarmVilleTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd ;
        oDom = document.createElement('div');
        if (_id==0)
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_bg.jpg"); width: 480px; height: 280px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_bg.jpg"); width: 480px; height: 280px;');

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
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 3000,'Accept Gifts','Confirm;Ignore;Do Nothing','2;1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 3001,'Send Gifts','Confirm;Ignore;Do Nothing','2;1;0');
                        createDropDownList(oTr, 3002,'Reward','No Reward','1');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 3004,'Claim Bonus','Confirm;Ignore;Do Nothing','2;1;0');
                        createDropDownList(oTr, 3005,'Reward','10x Stable Parts;3x Puppy Kibble;10x Spring Eggs','1;2;3');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 3003,'Join','Confirm;Ignore;Do Nothing','2;1;0');
                    oTbody.appendChild(oTr);
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
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "Hatch an Egg";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,FV_eggs);
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "Bouquet or Perfect Bunch";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,FV_flowers);
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "Adopt an Animal";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,FV_animals);
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "Get a Bushel";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,FV_bushels);
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "Find a Collectable";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,FV_collectables);
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);
                    oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "Decoration and Building Materials";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,FV_decorations);
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);

            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    };

    function CreateOtherTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd ;
        oDom = document.createElement('div');
        if (_id==0)
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_bg.jpg"); width: 480px; height: 280px;')
        else
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url("http://www.playerscripts.co.uk/images/fbaa/psfbaa_bg.jpg"); width: 480px; height: 280px;');

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
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 4000,'Everyting','Ignore;Do Nothing','1;0');
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody);

            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    };

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

/**** Main Loop ****/

function MainLoop(){

    if (!bInitialized) {
        if (document.getElementById('login_form')==null) {

            // start things up once they are logged into facebook;
            bInitialized = true;
            Initialize();
        }
    } else {
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
};

/**** DOM Notify and Change Code ****/

function notifyChange() {
    if (notify_count == change_count) MainLoop();
    if (notify_count != change_count) {
        schedNotify();
        return;
    }
    scheduled = false;
};

function schedNotify() {
    scheduled = true;
    notify_count = change_count;
    iOnloadEvent = setTimeout(function (e) {
        notifyChange();
    },
    250);
};


/**** Start Main Code ****/

// FB and MW Detection
// We are only worried about the URL detection because of the excludes

if (self.location.href.indexOf('www.facebook.com')!=-1) {
    strFrameId  = 'FaceBook';
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
            clearTimeout(iRespectCurrent);
            clearTimeout(iRequestCurrent);
            clearTimeout(iWallCurrent);
            clearTimeout(iMW_XW_Timer);
            clearTimeout(iFB_XW_Timer);
            GM_log('Scripts are unloading.  Frame = '+strFrameId);
        } catch(_errObj) {
            GM_log('Something bad has happend - '+_errObj.message);
        }
    },
    false);
} else {

    // for MW window when it opens

    Initialize();
}

/****  xw_sig Update Routines  ****/

function MW_xw_sig_update() {
    //removed not needed
}

function FB_xw_sig_update(_val) {
  function doStep1(_myUrl, _myParms) {

      GM_log('FB_xw_sig_update: do Step 1');

      GM_xmlhttpRequest({
            method: 'GET',
            url:  _myUrl,
            headers: {
                'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-us,en;q=0.5'
            },
            onload: function(_responseDetails) {
                try {

                    var i1, i2, strTemp, myUrl;

                    if (_responseDetails.status != 200) {
                        GM_log('Error FB_xw_sig_update: do Step 1');
                        LogPush('Cannot Update Mafia Wars credentials<br>Attempting again in 5 minutes');
                        xw_sig_valid        = false;
                        local_xw_time       = 0;

                    } else {
	                    
	                    //find the mafiawars iframe
                        strTemp = _responseDetails.responseText.match(/<iframe(.)*name="mafiawars"(.)*<\/iframe>/g);
                        
                        if (strTemp) {
	                        myUrl = "";
	                        i1 = strTemp[0].indexOf('src="',i1);
                            i2 = strTemp[0].indexOf('"',i1+5);
                            myUrl = strTemp[0].slice(i1+5,i2);
                            myUrl = myUrl.replace(/&amp;/g,'&');
                            
                            doStep1b(myUrl,'');
	                    	   
                        } else {
	                        GM_log('doStep1 - Cannot find Mafia Wars iFrame');
                            LogPush('Cannot Update Mafia Wars credentials<br>Attempting again in 5 minutes');
                            xw_sig_valid        = false;
                            local_xw_time       = 0;
	                        
                    	}
                        
                    }
                } catch(err) {
                    GM_log('Error FB_xw_sig_update: do Step 1 - '+err.message);
                    LogPush('Cannot Update Mafia Wars credentials<br>Attempting again in 5 minutes');
                    xw_sig_valid        = false;
                    local_xw_time       = 0;
                }
            }
        });
    };

    function doStep1b(_myUrl, _myParms) {
        GM_log('FB_xw_sig_update: do Step 1b');

        GM_xmlhttpRequest({
            method: 'GET',
            url:  _myUrl,
            headers: {
                'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-us,en;q=0.5'
            },
            onload: function(_responseDetails) {
                try {

                    var i1, i2, strTemp, myUrl, myParms;

                    if (_responseDetails.status != 200) {
                        GM_log('Error FB_xw_sig_update: do Step 1b');
                        LogPush('Cannot Update Mafia Wars credentials<br>Attempting again in 5 minutes');
                        xw_sig_valid        = false;
                        local_xw_time       = 0;

                    } else {
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
                            doStep2(myUrl,myParms);
                        } else {
                          GM_log('Error FB_xw_sig_update: do Step 1b');
                          LogPush('Cannot Update Mafia Wars credentials<br>Attempting again in 5 minutes');
                          xw_sig_valid        = false;
                          local_xw_time       = 0;
                        }
                    }
                } catch(err) {
                    GM_log('Error FB_xw_sig_update: do Step 1b - '+err.message);
                    LogPush('Cannot Update Mafia Wars credentials<br>Attempting again in 5 minutes');
                    xw_sig_valid        = false;
                    local_xw_time       = 0;
                }
            }
        });
    };

    function doStep2(_myUrl, _myParms) {
        GM_log('FB_xw_sig_update: do Step 2');

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
                    var i1, i2, strTemp, myUrl;
                    var re;
                    re = /de_DE|en_US|es_ES|es_MX|fr_FR|id_ID/i

                    if (_responseDetails.status != 200) {
                        GM_log('FB_xw_sig_update: doStep2 - Error loading FB/Mafia Wars Page');
                        LogPush('Cannot Update Mafia Wars credentials<br>Attempting again in 5 minutes');
                        xw_sig_valid        = false;
                        local_xw_time       = 0;

                    } else {

                        strTemp = _responseDetails.responseText;
                        i1 = strTemp.indexOf("var local_xw_sig = '");
                        if (i1 !=-1) {
                            i2 = strTemp.indexOf("';",i1);
                            local_xw_sig        = strTemp.slice(i1+20,i2);
                            local_xw_time       = getCurrentTime();
                            xw_sig_valid        = true;

                            // Extract 'sf_xw_user_id' at the same time

                            i1 = strTemp.indexOf('sf_xw_user_id=');
                            if (i1!=-1) {
                                i2 = strTemp.indexOf('&',i1);
                                local_xw_user_id = strTemp.slice(i1+14,i2)
                            }



                            GM_log('local_xw_sig = '+local_xw_sig+', local_xw_user_id = '+local_xw_user_id+', local_xw_time = '+local_xw_time);

                            LogPush('Mafia Wars credentials have been successfully renewed');

                        } else {
                            GM_log('FB_xw_sig_update: doStep2 - Mafia War does not appear to be working');
                            LogPush('Cannot Update Mafia Wars credentials.  Mafia Wars may be down<br>Attempting again in 5 minutes');
                            xw_sig_valid        = false;
                            local_xw_time       = 0;
                        }
                    }
                } catch(err) {
                    GM_log('Error FB_xw_sig_update: do Step 2 - '+err.message);
                    LogPush('Cannot Update Mafia Wars credentials<br>Attempting again in 5 minutes');
                    xw_sig_valid        = false;
                    local_xw_time       = 0;
                }
            }
        });
    };

    function doStep10(myUrl, myParms) {

    GM_xmlhttpRequest({
      method: 'POST',
      url:  myUrl,
      data: myParms,
      headers: {
          'Content-Type':    'application/x-www-form-urlencoded',
          'Accept':          '*/*',
          'Accept-Language': 'en-us,en;q=0.5',
          'X-Requested-With':'XMLHttpRequest'
      },
      onload: function(_responseDetails) {


          var strTemp;
          var i1, i2;

          strTemp = _responseDetails.responseText;

          if (_responseDetails.status == 200) {
              if (strTemp.indexOf('local_xw_sig') != -1) {
                  i1 = strTemp.indexOf('local_xw_sig')
                  i2 = strTemp.indexOf("';",i1)

                  local_xw_sig      = strTemp.slice(i1+16,i2);
                  local_xw_time     = getCurrentTime();
                  xw_sig_valid    = true;

                  GM_log('local_xw_sig = '+local_xw_sig+', local_xw_user_id = '+local_xw_user_id+', local_xw_time = '+local_xw_time);

              } else {
                  xw_sig_valid        = false;
                  local_xw_time       = 0;

                  GM_log('Error renewing XW_SIG');
              }

          } else {
              xw_sig_valid        = false;
              local_xw_time       = 0;

              GM_log('Error renewing XW_SIG');
          }
      }
    });
    }

    // doStep1 and doStep2 will get a brand new set ofcredentials
    // dostep10 will renew the credentials

    function doDone() {
        // in FF this is empty.

    }

    GM_log('FF UPDATE - xw_sig_update');
    var iHoldEvent, myUrl, myParms;

    // check the age of the xw_sig

    if (((getCurrentTime()-local_xw_time) > 10) || (local_xw_user_id=='')) {
        myUrl       = 'http://apps.facebook.com/inthemafia/?zy_link=appage';
        myParms     = '';
        LogPush('<strong>Mafia Wars credentials are out of date.  Attempting to refresh</strong>');
        GM_log('FB_xw_sig_update: Attempting to get a new set of MW Credentials');
        doStep1(myUrl, myParms);
    } else {
        myUrl     = 'http://facebook.mafiawars.com/mwfb/sf_updater.php';
        myParms   = 'sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig+'&skip_req_frame=1';
        LogPush('<strong>Updating Mafia Wars credentials.</strong>');
        GM_log('FB_xw_sig_update: Attempting to renew set of MW Credentials');
        doStep10(myUrl, myParms);
    }

}


/**** Utility functions ****/

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


function getGroupNames(){

    // we are looging to build this
    // &params[lists]=[%22100423413310424%3AMafia%20Wars%22]
    // "100423413310424=Mafia Wars"

    strGroups       =   '<option value="0">-</option>';

    GM_xmlhttpRequest({
        url:"http://www.facebook.com/friends/edit/",
        method:'get',
        onload: function(resp){
            var i1, i2, i3, i4;
            var strTemp, strDiv, strId, strName, strParms;


            strTemp = resp.responseText;
            //get formID
            i1 = strTemp.indexOf('post_form_id:"');
            if (i1!=-1) {
	            i1 	+= 14
	            i2 	 = strTemp.indexOf('"',i1);
	            Post_form_id = strTemp.slice(i1,i2);
	            i1	 = strTemp.indexOf('fb_dtsg:"',i2);
	            i1 	+= 9;
	            i2 	 = strTemp.indexOf('"',i1);	            
	            FB_dtsg = strTemp.slice(i1,i2);
            }
            
            i1 = 0;
            do {
                i1 = strTemp.indexOf('<li class="key-fl_', i1);

                if (i1!= -1) {
                    i1      += 18
                    i2       = strTemp.indexOf('"',i1);
                    strId    = strTemp.slice(i1,i2);
                    i1       = strTemp.indexOf('<span class="linkWrap">',i2);
                    i2       = strTemp.indexOf('</span>',i1+23);
                    strName  = strTemp.slice(i1+23,i2);

                    //strGroups       +=  '<option value="';
                    //strGroups       +=  '%22'+codeStrings(strId+'='+strName)+'%22';
                    //strGroups       +=  '">'+strName+'</option>';
                    
                    strGroups       +=  '<option value="'+ strId + '">'+strName+'</option>';

                    i1=i2;
                }
            } while (i1 != -1)

            // reset the selected group in saved parameter if it does not exsist.
            if (strGroups.indexOf(aParams[1001]) == -1) aParams[1001] = 0
            if (strGroups.indexOf(aParams[1004]) == -1) aParams[1003] = 0

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

        for (var i=0;i<5;i++) {
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

            for (var i=0;i<5;i++) {
                oForm = document.forms.namedItem('FBAA-Form'+i);
                for (var j=0; j<oForm.length; j++) {
                    oItem = oForm[j]
                    if (oItem != undefined ) {
                      if (oItem.type == 'checkbox') {
                            aParams[oItem.name.split('-')[2]]    = oItem.checked;
                        } else {
                            aParams[oItem.name.split('-')[2]]    = oItem.value;
                        }
                    }
                }
            }

          // Bonus type awards where to rewards can vary
      aParams['FV_MasteryFriendRewad']          = aParams[3050];
      aParams['FV_HorseStableFriendReward']         = aParams[3050];
      aParams['FV_FertilizeThankFriendReward']      = aParams[3050];
      aParams['FV_SocialMissionShareBonusFriendReward']   = aParams[3050];
      aParams['FV_AchievementFriendReward']         = aParams[3050];
      aParams['FV_TuscanWeddingRedeemFriendReward']     = aParams[3050];
      aParams['FV_TuscanWeddingFriendReward']       = aParams[3050];

      // Wandering Stallion
      //aParams['FV_WanderingStallionFriendReward']     = aParams[3055];
      aParams['FV_WanderingStallionFriendReward']     = false;

      // Barn Raising
      aParams['FV_StorageExpansionFriendReward']      = aParams[3056];

      // Free Fuel
      aParams['FV_FuelDiscoveryFriendReward']       = aParams[3052];

      //flowers
      aParams['FV_FlowerFriendReward']          = false;
      for (var id in FV_flowers)
        if (aParams[id]==true)
          aParams['FV_FlowerFriendReward']      = true;

      //bushels
      aParams['FV_BushelFriendReward']          = false;
      aParams['FV_StallThankYouFriendReward']       = false;
      for (var id in FV_bushels)
        if (aParams[id]==true)  {
          aParams['FV_BushelFriendReward']      = true;
          aParams['FV_StallThankYouFriendReward']   = true;
        }

      //adopt
      aParams['FV_lonely_cow']              = false;
      aParams['FV_FoalFriendReward']            = false;
      aParams['FV_NurseryBuildingFriendReward']     = false;
      for (var id in FV_animals)
        if (aParams[id]==true)  {
          aParams['FV_lonely_cow']          = true;
          aParams['FV_FoalFriendReward']        = true;
          aParams['FV_NurseryBuildingFriendReward'] = true;
        }

      //Hatch an Egg
      aParams['FV_EggFriendReward']           = false;
      for (var id in FV_eggs)
        if (aParams[id]==true)
          aParams['FV_EggFriendReward']       = true;

      //Collections
      aParams['FV_CollectionsFriendReward']       = false;
      for (var id in FV_collectables)
        if (aParams[id]==true)
          aParams['FV_CollectionsFriendReward']   = true;

      //Build Supplies
      aParams['FV_ConstructionBuildingFriendReward']    = false;
      for (var id in FV_decorations)
        if (aParams[id]==true){
          aParams['FV_ConstructionBuildingFriendReward']  = true;
          aParams['FV_TuscanWeddingRedeemFriendReward'] = true;
        }


      if (strSaveSet == 'A')
        strSaveSet = 'B'
      else
        strSaveSet = 'A'
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


function click_ShowLog(iButton) {
    return function () {
        var iBC, oButtons, oButton, iButtons, ODOM;
        var oSpan;

        GM_log('the following button was pushed ' + iButton);

        if (iButton == 1) {
            document.getElementById(strLogShow).innerHTML= '<b>Show</b>';
            document.getElementById(strLogHide).innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Hide</a> </font>';
            bShowLog = true;
            GM_setValue('bShowLog',bShowLog);
            oLogDiv.parentNode.style.display = ""
        } else {
            document.getElementById(strLogHide).innerHTML= '<b>Hide</b>';
            document.getElementById(strLogShow).innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Show</a> </font>';
            bShowLog = false;
            GM_setValue('bShowLog',bShowLog);
            oLogDiv.parentNode.style.display = "none"
        }
    }
}

function click_ClearLog() {
    oLogDiv.innerHTML = "";

    GM_setValue('LogDiv',oLogDiv.innerHTML);

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

    // plug in saved values;
    for (var i=0;i<5;i++) {
        oForm = document.forms.namedItem('FBAA-Form'+i);
        for (var j=0; j<oForm.length; j++) {
            oItem = oForm[j]
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

    oDiv = document.getElementById(strFBAASettings);
    oDiv.style.display="";

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
                                    window.location.href = 'http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js';
                                } catch (err) {
                                };
                                GM_setValue('SUC_current_version', remote_version);
                            }
                        } else if (forced) {
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

function click_MissionQueue() {
    for (i=0;i<aMissionRetry[0].length;i++) {
	var iNextTry = aMissionRetry[1][i] - getCurrentTime();
	LogPush('<b>Mission Queue Slot '+i+': '+ aMissionRetry[0][i].AttachmentTitle+'</b> ('+ aMissionRetry[0][i].ActorName +') next retry in '+iNextTry+' mins');
    }
}