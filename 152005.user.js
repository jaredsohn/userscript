/**
* This program is copyright PlayerScripts.com, a division of TinHat Software Ltd.
* We grant you a license for personal, private and non-commercial use only.
* Please refer to playerscripts.com for further information.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/

// ==UserScript==
// @name        Face Book Mafia Gift Acceptor
// @description PlayerScripts News Feed Scanner for Mafia Wars
// @namespace   MafiaWars
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @match      http://www.facebook.com/* 
// @match      https://www.facebook.com/*
// @exclude    http://www.facebook.com/groups/*
// @exclude    http://www.facebook.com/messages/*
// @exclude     http://apps.facebook.com/*
// @exclude     http://www.facebook.com/extern/*
// @exclude     http://www.facebook.com/connect/*
// @exclude     http://www.facebook.com/plugins/*
// @exclude     http://www.facebook.com/login.php*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*
// @version     0.10.364
// @author      Shrubber
// @contributor rwaldan, Bubba123, Weckl, s1lv3rw0lf, viper67857, Bryan Boyle, slava_se, lee, Simony, Dr Squirrel, DutchKingCobra
// ==/UserScript==
if(typeof(unsafeWindow)=='undefined'){ var div = document.createElement("div"); div.setAttribute("onclick", "return window;");  unsafeWindow = div.onclick(); }
var aMissionRetry    = new Array();
    aMissionRetry[0] = new Array();
    aMissionRetry[1] = new Array();

var gvar = {};

// Variables for Event trigger
var pass                = 0,
    change_count        = 0,
    notify_count        = 0,
    scheduled           = false;

// Process Variables
var script_version      = "0.10.364",
    SUC_script_num      = 70459,
    strAutoOn           = 'PSNFS-AutoOn',
    strPSNFSLog         = 'PSNFS-Log',
    strAutoOff          = 'PSNFS-AutoOff',
    strLogShow          = 'PSNFS-LogShow',
    strLogHide          = 'PSNFS-LogHide',
    strPSNFSSetTabs     = 'PSNFS-SettingTab',
    strPSNFSSetDivs     = 'PSNFS-SettingDiv',
    strFBAutoAccept     = 'PSNFS-Header',
    strPSNFSSettings    = 'PSNFS-Settings';

var iNewsFeedCurrent        = 0,
    iMW_XW_Timer        = 0,
    iFB_XW_Timer        = 0,
    iRequestCurrent     = 0,
    FV_accept_ignore    = 0,
    MW_FreeGiftsDelay   = 0,
    MW_IcedBonusDelay   = 0,
    MW_SendThanksDelay  = 0,
    MW_SecretDropDelay  = 0,
    MW_LootLadderDelay  = 0;

var delayList = new Array(); // To store item delays
var lastLink = '';
var lastLinkCount = 0;

var bAutoRun            = false,
    bShowLog            = false,
    bAutoRunHold        = false,
    bInitialized        = false;

var aParams             = new Array(),
    aNewsFeedNotificationId = new Array();

var oLogDiv, FB_dtsg, oNewsFeedList, strGroups,
    EventSpan, strSaveSet, FB_user_id, strFrameId,
    ActionNewsFeed, iRequestNum, local_xw_sig, Post_form_id,
    xw_sig_valid, oRequestList, local_xw_time,
    ActionRequest, local_xw_user_id;

/**** Icons ****/
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
        4:  'data:image/gif;base64,'+
            'R0lGODlhEAAQAPMKAAAAABlLGShjKH5+fo5DAMheAESMRHq0eviwFfrybwAAAAAAAAAAAAAAAAAA'+
            'AAAAACH5BAEAAAoALAAAAAAQABAAAARZUMmpCko0z3GRzpyVeJ80WGIpAYRIlgB6KUYm3KxrBDUF'+
            'BAFZIvDhBVqXgsFwoPCWBISFsGNKeADAEoXlXQWKgbb1VPyuE62BagADwBl12fwRV4mq8A9PiQAA'+
            'Ow==',
        3:  'data:image/gif;base64,'+
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

/**** Start of Link List Header ****/
List = function(_cycle) {
  var Self   = this;
  this.First = null;
  this.Last  = null;
  // empty list
  this.Erase = function() {
    var pointer = this.First;
    var hold;
    while (pointer != null) {
        hold    = pointer.Next;
        pointer = null;
        pointer = hold;
    }
    this.Next = null;
    this.First = null;
    this.Last  = null;
  }

  // Start to action the data elements in the list
  this.Run = function() {
    var oHold;
    if (this.First == null) {
        // Load List
        _cycle();
    } else {
        // Remove the top element from the list and action it
        oHold = this.First;
        this.First = oHold.Next;
        oHold.Process();
    }
  }

  // Add to the bottom of the list
  this.Append = function(_data) {
    if (this.First == null) {
        this.First = _data;
        this.Last  = _data;
    } else {
        this.Last.Next = _data;
        this.Last      = _data;
    }
  }

  // Add to the top of the list
  this.Insert = function(_data) {
    if (this.First == null) {
        this.First = _data;
        this.Last  = _data;
    } else {
        _data.Next = this.First;
        this.First = _data;
    }
  }
}
/**** End of Link List Header ****/

/**** Engine for Processing News Feed posting, Application Requests, and Respect ****/
// Regex search items
var strConfirmBoxes1   = './/div[@class="requestStatus UIImageBlock_Content UIImageBlock_SMALL_Content"]//form',
    strConfirmBoxes2   = './/li[contains(@class,"uiListItem  uiListHorizontalItemBorder  uiListHorizontalItem")]//form',
    strConfirmBoxes3   = './/li[contains(@class,"uiListItem  uiListVerticalItemBorder")]//form',
    strFormInputs      = './/input',
    strFormId          = './/div',
    strReqTypes        = './/span[contains(@id,"_label")]',
    strReqTypes1       = './/span[contains(@id,"confirm_")]',
    strWarBetray       = './/span[contains(text(),"Betray")]/parent::*',
    strWarAttackBetray = './/div[contains(@style,"position: absolute")]/a',
    strWarAttack       = './/a';

var strBase            = document.location.protocol + '//www.facebook.com/ajax/reqs.php?__a=1',
    strAccept          = '&actions[accept]=Confirm',
    strReject          = '&actions[reject]=Ignore';

// Regex for News Feed data
var NewsFeedData = {
    // Mafia Wars
    10979261223: {
      MW_WarHelp:         {text:'MW War Help',                testURL:/next_controller=war&next_action=view&zy_track=feed&sendkey=.{0,}/i,                                                                                                                                                                                                        testIMG:/\B|./i},
      MW_FriendofFriend:  {text:'MW Help Friend of Friend',   testURL:/next_controller=story&next_action=give_help(.)*request_job_help_friend|next_controller=job&next_action=give_help(.)*request_job_help_friend/i,                                                                                                                             testIMG:/\B|./i},
      MW_BossBonus:       {text:'MW Boss Bonus',              testURL:/next_controller=story&next_action=claim_boss_bonus|next_controller=map&next_action=mapboss_reward_claim/i,                                                                                                                                                                 testIMG:/\B|./i},
      MW_IcedBonus:       {text:'MW Iced Bonus',              testURL:/next_controller=index&next_action=iced_boost_claim|next_controller=iceevent&next_action=iced_event_boost_claim/i,                                                                                                                                                          testIMG:/\B|./i},
      MW_JobHelp: {text:'Job Help',testURL:/next_controller=job&(next|xw)_action=(give_help|accept_city_crew)|next_controller=index&next_action=socialmission_respond|next_controller=story&next_action=give_help_social/i,testIMG:/\B|./i},
      MW_Property: {text:'MW Property',testURL:/next_controller=propertyV2&next_action=(cs_help_final|cs_help_initial|PropertyV2EventAskFeed|getCustomer)/i,testIMG:/\B|./i},
      MW_SupplyParts: {text:'MW Supply Part', testURL:/next_controller=bossfightv2&next_action=ask_feed_click|next_controller=limitedTimeProperty&next_action=upgradeBragFeed|next_controller=index&next_action=(power_pack_get|send_energy_mbox)|next_controller=propertyV2&next_action=(cs_help_item|one_click_get|cs_redeem_special_item_feed|itemFeedHelp|visit|getBoost)|next_controller=ClanProperty&next_action=getPartsFromFeed/i, testIMG:/\B|./i},
      MW_LimitedProps:     {text:'Limited Properties',        testURL:/next_controller=limitedTimeProperty&next_action=(addPropertyPart|addAnyPropertyPart)/i,                                                                                                                                                                                                                 testIMG:/\B|./i},      
      MW_Bonus: {text:'MW Bonus',testURL:/next_controller=(robbingSpree|ArenaPremarket)&next_action=feed_accept|next_controller=Travel&next_action=getLondonItemFromFeed|next_controller=fight&next_action=send_boost_from_feed|next_controller=launder&next_action=give_help|next_controller=robbing&next_action=(call_for_help_get_phone|mastery_bonus)|next_controller=Epicclanboss&next_action=ask_feed_click|next_controller=index&next_action=(ach_celeb|levelup_boost_claim|fight_event_feed_reward|holiday_feed_reward|loot_drop_feed_accept|loot_drop_event_feed_reward|crm_levelup_claim|city_shutdown_vegas_feed)|next_controller=job&next_action=(mastery_feed_claim|sd_boost_get)|next_controller=quest&next_action=questFeedReward|next_controller=war&next_action=share_reward_feed_click|next_controller=socialmission&next_action=rewardBrag|next_controller=(FeedOfTheDay|craftersChoice)&next_action=feed_accept|next_controller=MafiaPoker&next_action=askCardFeed/i,testIMG:/\B|./i},
      MW_NextTarget:      {text:'MW Next Target',             testURL:/next_controller=fight&next_action=social_attack/i,                                                                                                                                                                                                                         testIMG:/\B|./i},
      MW_Bounty:          {text:'MW Bounty',                  testURL:/next_controller=hitlist&next_action=feed_hit/i,                                                                                                                                                                                                                            testIMG:/\B|./i},
      MW_Missions:        {text:'MW Social Missions',         testURL:/next_controller=socialmission&next_action=joinMission/i,                                                                                                                                                   testIMG:/\B|./i},
      MW_VegasSlots:      {text:'MW Vegas Slots',             testURL:/next_controller=stats&next_action=view(.)*vegasslots|next_controller=stats&next_action=view(.)*playslots/i,                                                                                                                                                                testIMG:/\B|./i},
      MW_FreeGift: {text:'MW Free Gift',testURL:/next_controller=freegifts&next_action=(acceptGiftEvent|view)/i,testIMG:/\B|./i},
      MW_LootLadder:      {text:'MW Loot Ladder',             testURL:/next_controller=lootladderevent&next_action=share_feed_click|next_controller=lootladderevent&next_action=ask_feed_click|next_controller=lootladderevent&next_action=brag_feed_click/i,                                                                                     testIMG:/\B|./i},
      MW_DailyTakeListV3:     {text:'Daily Take',                 testURL:/next_controller=DailyTakeV3&next_action=collect_stake/i,                                                                                                                                                                                                                 testIMG:/\B|./i},      
      MW_LevelUp:     {text:'Level Up Bonus',                 testURL:/next_controller=index&next_action=levelUpBonusClaim/i,                                                                                                                                                                                                                 testIMG:/\B|./i},      
      MW_FanBlast:        {text:'Zynga Fan Blast',            testURL:/next_controller=index&next_action=fan_blast/i,                                                                                                                                                                        testIMG:/\B|./i}
      
    }
  }

var MW_GeneralList = {
    2004: {text:"Help on Jobs"},
    2005: {text:"Friend of a Friend"},
    2006: {text:"Next Target"},
    2007: {text:"HitList Bounty"},
    2008: {text:"Bonus, Loot, or Reward"},
    2019: {text:"Levelup Bonus"} ,   
    2013: {text:"Boss Bonus"},
    2010: {text:"Supply Parts or Energy"},
    2009: {text:"Limited Properties"},
    2011: {text:"War - Help"},
    2012: {text:"War - Betray Friends"},
    2015: {text:"Vegas Slots"},
    2018: {text:"Daily Take"},
    2020: {text:"Zynga Fan Blast"}
}

var MW_WarRewardList = {
    2200: {text:"All War Reward Tiers (Overrides others)", test:""},
    22086: {text:"WR18 Silver-Twins. A:156,   D:113", test:"Silver-Twins"},
    22085: {text:"WR18 King's Helm. A:156,   D:116", test:"King's Helm"},
    22084: {text:"WR18 Western Australian Kangaroo. A:115,   D:158", test:"Western Australian Kangaroo"},
    22083: {text:"WR18 Wing Man. A:114,   D:157", test:"Wing Man"},
    22082: {text:"WR18 Giant Emu. A:157,   D:114", test:"Giant Emu"},
    22081: {text:"WR18 Beetel Bus. A:107,   D:145", test:"Beetel Bus"},
    22080: {text:"WR18 King's Legplates. A:147,   D:108", test:"King's Legplates"},
    22079: {text:"WR18 Black Wasp. A:105,   D:142", test:"Black Wasp"},
    22078: {text:"WR18 Black Death. A:106,   D:145", test:"Black Death"},
    22077: {text:"WR18 Nightblade. A:144,   D:105", test:"Nightblade"},
    22076: {text:"WR17 Real Steel. A:105,   D:142", test:"Real Steel"},
    22075: {text:"WR17 Bonobo. A:144,   D:107", test:"Bonobo"},
    22074: {text:"WR17 Sabatons. A:144,   D:107", test:"Sabatons"},
    22073: {text:"WR17 Duckling. A:106,   D:143", test:"Duckling"},
    22072: {text:"WR17 Hand-bang. A:142,   D:105", test:"Hand-bang"},
    22071: {text:"WR17 Brain n Brawn. A:97,   D:131", test:"Brain n Brawn"},
    22070: {text:"WR17 Bascinet. A:99,   D:132", test:"Bascinet"},
    22069: {text:"WR17 Lady Amherst Pheasant. A:131,   D:99", test:"Lady Amherst Pheasant"},
    22068: {text:"WR17 Shine. A:98,   D:131", test:"Shine"},
    22067: {text:"WR17 Chained Ecstasy. A:130,   D:97", test:"Chained Ecstasy"},
    22066: {text:"WR16 Laser Security. A:103,   D:140", test:"Laser Security"},
    22065: {text:"WR16 In-Tox. A:105,   D:142", test:"In-Tox"},
    22064: {text:"WR16 Gjermundbu. A:141,   D:104", test:"Gjermundbu"},
    22063: {text:"WR16 Tuatara. A:104,   D:141", test:"Tuatara"},
    22062: {text:"WR16 Powder Blue. A:140,   D:103", test:"Powder Blue"},
    22061: {text:"WR16 Eye in the Water. A:128,   D:95", test:"Eye in the Water"},
    22060: {text:"WR16 Desert Camos. A:97,   D:130", test:"Desert Camos"},
    22059: {text:"WR16 Bandicoot. A:129,   D:97", test:"Bandicoot"},
    22058: {text:"WR16 Dual Crusher. A:129,   D:96", test:"Dual Crusher"},
    22057: {text:"WR16 Hybrid Routemaster. A:95,   D:128", test:"Hybrid Routemaster"},
    22056: {text:"WR15 Padded Up. A:138,   D:103", test:"Padded Up"},
    22055: {text:"WR15 Olm. A:101,   D:140", test:"Olm"},
    22054: {text:"WR15 Spiked Lash. A:103,   D:139", test:"Spiked Lash"},
    22053: {text:"WR15 Albino Wallaby. A:139,   D:102", test:"Albino Wallaby"},
    22052: {text:"WR15 Pen-dent. A:138,   D:101", test:"Pen-dent"},
    22051: {text:"WR15 Canoe. A:95,   D:126", test:"Canoe"},
    22050: {text:"WR15 Get A Grip. A:128,   D:94", test:"Get A Grip"},
    22049: {text:"WR15 May Fly. A:127,   D:93", test:"May Fly"},
    22048: {text:"WR15 Historic Hack. A:94,   D:127", test:"Historic Hack"},
    22047: {text:"WR15 Futura Ace. A:126,   D:93", test:"Futura Ace"},
    22037: {text:"WR14 Hydro Wing	A:125	D:92", test:"Hydro Wing"},
    22038: {text:"WR14 Sliver	A:91	D:124", test:"Sliver"},
    22039: {text:"WR14 Kerivoula	A:124	D:91", test:"Kerivoula"},
    22040: {text:"WR14 You Nailed It	A:93	D:126", test:"You Nailed It"},
    22041: {text:"WR14 Lunch Box	A:126	D:93", test:"Lunch Box"},
    22042: {text:"WR14 Fully Loaded	A:100	D:136", test:"Fully Loaded"},
    22043: {text:"WR14 Desert Mole Rat	A:137	D:101", test:"Desert Mole Rat"},
    22044: {text:"WR14 Chestcoff	A:101	D:137", test:"Chestcoff"},
    22045: {text:"WR14 Roma	A:138	D:99", test:"Roma"},
    22046: {text:"WR14 Peddler on the Roof	A:99	D:138", test:"Peddler on the Roof"},
    22027: {text:"WR13 Raptorize	A:120	D:90", test:"Raptorize"},
    22028: {text:"WR13 Suffocation Pillow	A:90	D:120", test:"Suffocation Pillow"},
    22029: {text:"WR13 Sao Tome Shrew	A:121	D:89", test:"Sao Tome Shrew"},
    22030: {text:"WR13 Shinical	A:89	D:121", test:"Shinical"},
    22031: {text:"WR13 Sled-hammer	A:122	D:90", test:"Sled-hammer"},
    22032: {text:"WR13 Jump Starter	A:98	D:133", test:"Jump Starter"},
    22033: {text:"WR13 Malaysian Exploding Ant	A:133	D:98", test:"Malaysian Exploding Ant"},
    22034: {text:"WR13 Bearneccessities	A:99	D:134", test:"Bearneccessities"},
    22035: {text:"WR13 Lonesome George	A:134	D:99", test:"Lonesome George"},
    22036: {text:"WR13 Armorella	A:100	D:135", test:"Armorella"},
    22017: {text:"WR12 Teardrop	A:118	D:88", test:"Teardrop"},
    22018: {text:"WR12 Pitchfork	A:88	D:119", test:"Pitchfork"},
    22019: {text:"WR12 Tarsier	A:119	D:89", test:"Tarsier"},
    22020: {text:"WR12 Rafting Vest	A:89	D:120", test:"Rafting Vest"},
    22021: {text:"WR12 Chopcycle	A:118	D:90", test:"Chopcycle"},
    22022: {text:"WR12 Flying Claw	A:97	D:128", test:"Flying Claw"},
    22023: {text:"WR12 Okapi	A:128	D:97", test:"Okapi"},
    22024: {text:"WR12 SkateX Racing Gloves	A:97	D:129", test:"SkateX Racing Gloves"},
    22025: {text:"WR12 Marmalade	A:129	D:98", test:"Marmalade"},
    22026: {text:"WR12 Skele-Blow	A:98	D:130", test:"Skele-Blow"},
    22007: {text:"WR11 Formula Car.	A:112 D:87", test:"Formula Car"},
    22008: {text:"WR11 Smooth Killer.	A:86 D:113", test:"Smooth Killer"},
    22009: {text:"WR11 False Killer Whale.	A:115 D:88", test:"False Killer Whale"},
    22010: {text:"WR11 Radio Scanner.	A:87 D:114", test:"Radio Scanner"},
    22011: {text:"WR11 Prism Proto Boat.	A:115 D:88", test:"Prism Proto Boat"},
    22012: {text:"WR11 Night Watch X6.	A:95 D:124", test:"Night Watch X6"},
    22013: {text:"WR11 Mallomys Giant Rat.	A:123 D:94", test:"Mallomys Giant Rat"},
    22014: {text:"WR11 Electromagnetic Shield.	A:95 D:124", test:"Electromagnetic Shield"},
    22015: {text:"WR11 Clockwork Trike.	A:125 D:96", test:"Clockwork Trike"},
    22016: {text:"WR11 Gemini Scythe.	A:95 D:126", test:"Gemini Scythe"},
    2297: {text:"WR10 Chacma Baboon.	A:83 D:111", test:"Chacma Baboon"},
    2298: {text:"WR10 Aviator Helm.	A:109 D:84", test:"Aviator Helm"},
    2299: {text:"WR10 Raft Boat.	A:86 D:110", test:"Raft Boat"},
    22000: {text:"WR10 Grip Kicker.	A:111 D:84", test:"Grip Kicker"},
    22001: {text:"WR10 Fangtooth Fish.	A:85 D:112", test:"Fangtooth Fish"},
    22002: {text:"WR10 Flash Gloves.	A:120 D:90", test:"Flash Gloves"},
    22003: {text:"WR10 Hyper Jet Ski.	A:91 D:121", test:"Hyper Jet Ski"},
    22004: {text:"WR10 Clipper Pistol.	A:119 D:90", test:"Clipper Pistol"},
    22005: {text:"WR10 Giant Arapaima.	A:92 D:120", test:"Giant Arapaima"},
    22006: {text:"WR10 Cut Boots.	A:121	D:91", test:"Cut Boots"},
    2287: {text:"WR9 4-Wheel Bike.	A:105 D:82", test:"4-Wheel Bike"},
    2288: {text:"WR9 Shock Dart.	A:81 D:106", test:"Shock Dart"},
    2289: {text:"WR9 Binturong.	A:107 D:83", test:"Binturong"},
    2290: {text:"WR9 Stream Splitter	Helm. A:82 D:108", test:"Stream Splitter Helm"},
    2291: {text:"WR9 3-Wheel Scooter.	A:109 D:83", test:"3-Wheel Scooter"},
    2292: {text:"WR9 Electric Automatic.	A:89 D:116", test:"Electric Automatic"},
    2293: {text:"WR9 Sand Python.	A:117 D:90", test:"Sand Python"},
    2294: {text:"WR9 Molle pack.	A:91 D:115", test:"Molle pack"},
    2295: {text:"WR9 Double Fin.	A:116 D:91", test:"Double Fin"},
    2296: {text:"WR9 Corroded Blade.	A:90 D:117", test:"Corroded Blade"},
    2277: {text:"WR8 Blue Jay.	A:99, D:79", test:"Blue Jay"}, 
    2278: {text:"WR8 Wasp Wing Mask.	A:85, D:100", test:"Wasp Wing Mask"}, 
    2279: {text:"WR8 Green Rider.	A:77, D:100", test:"Green Rider"}, 
    2280: {text:"WR8 M41 Official Issue.	A:100, D:80", test:"M41 Official Issue"}, 
    2281: {text:"WR8 Armadillo.	A:101, D:77", test:"Armadillo"}, 
    2282: {text:"WR8 Blazer.	A:86, D:106", test:"Blazer"}, 
    2283: {text:"WR8 Penalty Stick.	A:105, D:85", test:"Penalty Stick"}, 
    2284: {text:"WR8 Mortis.	A:82, D:107", test:"Mortis"}, 
    2285: {text:"WR8 Ringtail Cat.	A:83, D:106", test:"Ringtail Cat"}, 
    2286: {text:"WR8 FE Lime Guard.	A:82, D:108", test:"FE Lime Guard"},    
    2267: {text:"WR7 Outrunner.	A:78, D:97", test:"Outrunner"}, 
    2268: {text:"WR7 Lungfish.	A:98, D:85", test:"Lungfish"}, 
    2269: {text:"WR7 Collar Guard.	A:98, D:76", test:"Collar Guard"}, 
    2270: {text:"WR7 Stealth Shooter.	A:79, D:98", test:"Stealth Shooter"}, 
    2271: {text:"WR7 Neon Cruiser.	A:77, D:99", test:"Neon Cruiser"}, 
    2272: {text:"WR7 Moon Boots.	A:104, D:84", test:"Moon Boots"}, 
    2273: {text:"WR7 Hyacinth Macaw.	A:83, D:103", test:"Hyacinth Macaw"}, 
    2274: {text:"WR7 Detective Special.	A:105, D:83", test:"Detective Special"}, 
    2275: {text:"WR7 Ojibwa Snowshoes.	A:104, D:83", test:"Ojibwa Snowshoes"}, 
    2276: {text:"WR7 Bullet Truck.	A:106, D:82", test:"Bullet Truck"}, 
    2257: {text:"WR6 Zebra.	A:95,   D:75", test:"Zebra"}, 
    2258: {text:"WR6 Gas Line.	A:74,   D:96", test:"Gas Line"}, 
    2259: {text:"WR6 Minding Mines.	A:75,   D:96", test:"Minding Mines"}, 
    2260: {text:"WR6 Phobos Phaser.	A:96,   D:78", test:"Phobos Phaser"}, 
    2261: {text:"WR6 Wrist Watcher.	A:97,   D:77", test:"Wrist Watcher"}, 
    2262: {text:"WR6 Subporpoise.	A:83,   D:102", test:"Subporpoise"}, 
    2263: {text:"WR6 Flex Help.	A:101,  D:83", test:"Flex Help"}, 
    2264: {text:"WR6 Mantis Flyby.	A:83,   D:103", test:"Mantis Flyby"}, 
    2265: {text:"WR6 Chuck Pistol.	A:82,   D:102", test:"Chuck Pistol"}, 
    2266: {text:"WR6 Beisa Oryx.	A:81,   D:104", test:"Beisa Oryx"},
    2247: {text:"WR5 Speak Quietly.	A:75,   D:90", test:"Speak Quietly"},
    2248: {text:"WR5 Personal Shield.	A:92,   D:72", test:"Personal Shield"},
    2249: {text:"WR5 Offwhite Rabbit.	A:90,   D:73", test:"Offwhite Rabbit"},
    2250: {text:"WR5 Rhino Lifter.	A:76,   D:91", test:"Rhino Lifter"},
    2251: {text:"WR5 Emu.	A:75,   D:92", test:"Emu"},
    2252: {text:"WR5 Hybrid Flight.	A:98,   D:81", test:"Hybrid Flight"},
    2253: {text:"WR5 Sloth Bear.	A:82,   D:97", test:"Sloth Bear"},
    2254: {text:"WR5 Shark Saw.	A:99,   D:81", test:"Shark Saw"},
    2255: {text:"WR5 Penguin Tux.	A:98,   D:80", test:"Penguin Tux"},
    2256: {text:"WR5 Paraglider.	A:100,  D:79", test:"Paraglider"},
    2237: {text:"WR4 Deimos Dagger.	A:78,   D:65", test:"Deimos Dagger"},
    2238: {text:"WR4 Leg Up.	A:80,   D:61", test:"Leg Up"},
    2239: {text:"WR4 Mud Crawler.	A:60,   D:81", test:"Mud Crawler"},
    2240: {text:"WR4 Zorse.	A:81,   D:66", test:"Zorse"},
    2241: {text:"WR4 Orangutan.	A:82,   D:68", test:"Orangutan"},
    2242: {text:"WR4 Night on the Town.	A:72,   D:88", test:"Night on the Town"},
    2243: {text:"WR4 Huntsman.	A:75,   D:89", test:"Huntsman"},
    2244: {text:"WR4 Beluga Jumbo Jet.	A:90,   D:70", test:"Beluga Jumbo Jet"},
    2245: {text:"WR4 Longhorn Limo.	A:91,   D:75", test:"Longhorn Limo"},
    2246: {text:"WR4 Kaka.	A:79,   D:92", test:"Kaka"},
    2227: {text:"WR3 Curled Horn Helm.	A:71,   D:51", test:"Curled Horn Helm"},
    2228: {text:"WR3 Force Fire.	A:52,   D:70", test:"Force Fire"},
    2229: {text:"WR3 Roadster Rage.	A:53,   D:72", test:"Roadster Rage"},
    2230: {text:"WR3 Scottish Wild Cat.	A:71,   D:50", test:"Scottish Wild Cat"},
    2231: {text:"WR3 Snow Crawler.	A:54,   D:72", test:"Snow Crawler"},
    2232: {text:"WR3 Juggernaut.	A:65,   D:79", test:"Juggernaut"},
    2233: {text:"WR3 King Cobra.	A:80,   D:62", test:"King Cobra"},
    2234: {text:"WR3 Pisces Harpoon Gun.	A:64,   D:78", test:"Pisces Harpoon Gun"},
    2235: {text:"WR3 Sheet Metal Blade.	A:79,   D:63", test:"Sheet Metal Blade"},
    2236: {text:"WR3 Tlingit Parka. 	A:64,   D:81", test:"Tlingit Parka"},
    2217: {text:"WR2 Growler Firearm.	A:58,   D:45", test:"Growler Firearm"},
    2218: {text:"WR2 Simian Safeguard.	A:43,   D:58", test:"Simian Safeguard"},
    2219: {text:"WR2 Heat Seeker.	A:46,   D:60", test:"Heat Seeker"},
    2220: {text:"WR2 Bayou Trike.	A:61,   D:48", test:"Bayou Trike"},
    2221: {text:"WR2 California Condor.	A:42,   D:62", test:"California Condor"},
    2222: {text:"WR2 Hook Sword.	A:72,   D:51", test:"Hook Sword"},
    2223: {text:"WR2 Amur River Boat.	A:69,   D:50", test:"Amur River Boat"},
    2224: {text:"WR2 Rhino Helmet.	A:71,   D:49", test:"Rhino Helmet"},
    2225: {text:"WR2 Rhinoceros Beetle.	A:52,   D:72", test:"Rhinoceros Beetle"},
    2226: {text:"WR2 Juvenile Tiger.	A:70,   D:51", test:"Juvenile Tiger"},
    2201: {text:"WR1 Canonazo.	A:42,   D:22", test:"Canonazo"},
    2202: {text:"WR1 Big Bad Wolf.	A:42,   D:25", test:"Big Bad Wolf"},
    2203: {text:"WR1 Tanto.	A:43,   D:28", test:"Tanto"},
    2204: {text:"WR1 String of Firecrackers.	A:33,   D:46", test:"String of Firecrackers"},
    2205: {text:"WR1 Raed Armored Sedan.	A:30,   D:47", test:"Raed Armored Sedan"},
    2206: {text:"WR1 Deadly Impression.	A:28,   D:47", test:"Deadly Impression"},
    2207: {text:"WR1 Cataclysmic.	A:53,   D:26", test:"Cataclysmic"},
    2208: {text:"WR1 Savanna Baboon.	A:25,   D:54", test:"Savanna Baboon"},
    2209: {text:"WR1 Snapping Turtle.	A:56,   D:25", test:"Snapping Turtle"},
    2210: {text:"WR1 Duster.	A:27,   D:56", test:"Duster"},
    2211: {text:"WR1 Spiked Baton.	A:58,   D:28", test:"Spiked Baton"},
    2212: {text:"WR1 Armored Biker Boots.	A:27,   D:59", test:"Armored Biker Boots"},
    2213: {text:"WR1 Contender.	A:33,   D:63", test:"Contender"},
    2214: {text:"WR1 Galapagos Hawk. 	A:64,   D:32", test:"Galapagos Hawk"},
    2215: {text:"WR1 Growler.	A:33,   D:65", test:"Growler"},
    2216: {text:"WR1 Hack N Slash.	A:65,   D:35", test:"Hack N Slash"}
}

var MW_OperationsList = {
    2301: {text:"Truck Hijacking (Easy)",               test:"Truck Hijacking"},
    2302: {text:"Bribe A Contact (Easy)",               test:"Bribe A Contact"},
    2311: {text:"Narco Trafficking (Easy)",             test:"Narco Trafficking"},
    2315: {text:"Assassinate The Witness (Easy)",       test:"Assassinate The Witness"}, 
    2303: {text:"Bank Robbery (Medium)",                test:"Bank Robbery"},
    2356: {text:"Kidnap the Governor's Daughter",      test:"Kidnap the Governor's Daughter"},
    2304: {text:"Fight Off A Rival Mafia (Medium)",     test:"Fight Off A Rival Mafia"},
    2305: {text:"Bribe A Government Official (Medium)", test:"Bribe A Government Official"},
    2310: {text:"Hijack An Ocean Liner (Medium)",       test:"Hijack An Ocean Liner"},
    2316: {text:"Take Over Airport Control (Medium)",   test:"Take Over Airport Control"},
    2306: {text:"Steal A Dockyard Shipment (Hard)",     test:"Steal A Dockyard Shipment"},
    2307: {text:"Take Out A Rival Operation (Hard)",    test:"Take Out A Rival Operation"},
    2308: {text:"Transport Stolen Uranium (Hard)",      test:"Transport Stolen Uranium"},
    2309: {text:"Evade The Coast Guard (Hard)",         test:"Evade The Coast Guard"},
    2312: {text:"Frame a Rival Don (Medium)",           test:"Frame a Rival Don"},
    2313: {text:"Steal Government Research (Hard)",     test:"Steal Government Research"}, 
    2314: {text:"Fix the Triple Crown (Hard)",          test:"Fix the Triple Crown"},
    2350: {text:"Crash the Mayor's Halloween Party",    test:"Crash the Mayor"},
    2351: {text:"Holiday Traffic (Thanksgiving)",       test:"Holiday Traffic"},
    2352: {text:"Stuff The Bird",                       test:"Stuff The Bird"},
    2353: {text:"Secret Santa",                         test:"Secret Santa"},
    2354: {text:"Secure Rudolph (Medium)",              test:"Secure Rudolph"},
    2355: {text:"Steal The Ball",                       test:"Steal The Ball"},
    2399: {text:"Unknown(new or limited) Operations"}
  }
var MW_DailyTakeList = {
    
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
    2428: {text:"Energy Refill",  test:"Energy Refill"},
    2429: {text:"2X Mastery Boost", test:"2X Mastery Boost"},
    2430: {text:"Clams", test:"Clams"},
    2431: {text:"Power Tool", test:"Power Tool"},
    2432: {text:"Gun Drill", test:"Gun Drill"},
    2433: {text:"Aquariam", test:"Aquariam"},
    2434: {text:"Anvil", test:"Anvil"},
    2435: {text:"Bird Cage", test:"Bird Cage"},
    2436: {text:"Hammer", test:"Hammer"},
    2437: {text:"Concrete", test:"Concrete"},
    2438: {text:"Reinforced Steel", test:"Reinforced Steel"},
    2439: {text:"Set of Terracotta Tiles", test:"Set of Terracotta Tiles"},
    2440: {text:"Italian Hardwood", test:"Italian Hardwood"},
    2441: {text:"Marble Slab", test:"Marble Slab"},
    2442: {text:"Cooked Book", test:"Cooked Book"},
    2443: {text:"Smart Phone", test:"Smart Phone"},
    2444: {text:"Satchel Charge", test:"Satchel Charge"},
    2444: {text:"Brazilian Timber", test:"Brazilian Timber"},
    2445: {text:"Construction Worker", test:"Construction Worker"},
    2446: {text:"Unwanted Evidence", test:"Unwanted Evidence"},
    2447: {text:"Hired Guns", test:"Hired Guns"},
    2448: {text:"Car Key Copy", test:"Car Key Copy"},
    2449: {text:"Hotel Security Key Card", test:"Hotel Security Key Card"},
    2450: {text:"Hot Tip", test:"Hot Tip"},
    2451: {text:"Local Informant", test:"Local Informant"},
    2452: {text:"Hollow Point", test:"Hollow Point"},
    2453: {text:"Rifle Round", test:"Rifle Round"},
    2454: {text:"Backstab", test:"Backstab"},
    2455: {text:"Crowbar Swing", test:"Crowbar Swing"},
    2456: {text:"Street Panth (90/45)", test:"Street Panth"},
    2457: {text:"Brown Sugar (160/96)", test:"Brown Sugar"},
    2458: {text:"Nimble Suit (96/160)", test:"Nimble Suit"},
    2459: {text:"Personal Trainer (160/96)", test:"Personal Trainer"},
    2460: {text:"Kudu (96/160)", test:"Kudu"},
    2461: {text:"Sun Deck (160/96)", test:"Sun Deck"}
}
/* Generic Logging Code */
function PSNFS_log(_myLog){
    if (aParams[9] == 1){
        GM_log(_myLog);    
    } else if (aParams[9] == 2){
        GM_log(_myLog);
        LogPush(_myLog + '<br>');
    }
}

// Generic Facebook Functions
function doFBParse(_myResponse){
    /* Generic FB Parse Function, to grab the remote url, and parameters */
    /* No sense doing the same thing in multiple places */
    var i1, i2, i1b, i1c, i1d, myUrl, myParms;
    var strTemp;
    
    // While we're changing this for the facebook changes, simplify this loop.
    var PhaseSearch = [
        '<script>bigPipe.onPageletArrive({"content":{"pagelet_canvas_content"',
        '<script>bigPipe.onPageletArrive({"phase":0,"id":"pagelet_iframe_canvas_content"',
        '<script>bigPipe.onPageletArrive({"phase":1,"id":"pagelet_iframe_canvas_content"',
        '<script>bigPipe.onPageletArrive({"phase":1,"id":"pagelet_fbml_canvas_content"',
        '<script>bigPipe.onPageletArrive({"phase":0,"id":"pagelet_fbml_canvas_content"'
    ];
    for (var i=0;i<PhaseSearch.length;i++){
        i1 = _myResponse.indexOf(PhaseSearch[i]);
        if (i1>0){
            i1 = _myResponse.indexOf('{',i1);
            i2 = _myResponse.indexOf(')</script>',i1);
            eval('strTemp = '+_myResponse.slice(i1,i2)+';');
            break;
        }
    }
    // strTemp should be an object here..
    if (strTemp.content.pagelet_iframe_canvas_content){
        if (strTemp.content.pagelet_iframe_canvas_content.container_id){
            i1 = _myResponse.indexOf('<code class="hidden_elem" id="'+strTemp.content.pagelet_iframe_canvas_content.container_id+'">');
            if (i1>0){
                i2 = _myResponse.indexOf('</code>', i1);
                strTemp = _myResponse.slice(i1,i2);
            }            
        } else {
            strTemp = strTemp.content.pagelet_iframe_canvas_content;
        }
        
    } else if (strTemp.content.pagelet_fbml_canvas_content){
        if (strTemp.content.pagelet_fbml_canvas_content.container_id){
            i1 = _myResponse.indexOf('<code class="hidden_elem" id="'+strTemp.content.pagelet_fbml_canvas_content.container_id+'">');
            if (i1>0){
                i2 = _myResponse.indexOf('</code>', i1);
                strTemp = _myResponse.slice(i1,i2);
            }            
        } else {
            strTemp = strTemp.content.pagelet_fbml_canvas_content;
        }
        
    } else {
        strTemp = _myResponse;
    }
    i1 = strTemp.indexOf('<form action="http://facebook.mafiawars.zynga.com/mwfb/');
    if (i1==-1){
        i1 = strTemp.indexOf('<form action="https://facebook.mafiawars.zynga.com/mwfb/');
    }
    if (i1!=-1){
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
function doFBGiftForm (_myResponse, v_app_id, v_post_form_id, v_fb_dtsg){
    // Used to process the gift fbml form
    var strTempForm, myUrl, myParms,v_to_id, i1, i2;
    myParms      =  'app_id='  +v_app_id;
    i1 = _myResponse.indexOf('FB.init({');
    if (i1 == -1) {
        // Farmville forms are slightly different
        i1 = _myResponse.indexOf('<div fb_protected="true" class="fb_protected_wrapper"><form action="http://apps.facebook.com/onthefarm/gifts_send.php');
        if (i1 == -1){
            PSNFS_log(_myResponse);
            throw {message:"Cannot find FB.Init or FV gift_send form on page"};    
        }
        i2 = _myResponse.indexOf('</form>', i1);
    } else {
        i1      =  _myResponse.indexOf('<fb:fbml>', i1);
        if (i1 == -1) throw {message:"Cannot find FB form in page"};
        i2 = _myResponse.indexOf('</fb:fbml>',i1);
    }
    // Isolate the form.
    strTempForm = _myResponse.slice(i1,i2);
    // What is the action URL, aka the url we redirect to after posting the ajax
    i1 = strTempForm.indexOf(' action="');
    if (i1 == -1) throw {message:"Cannot find action in page"};
    i1+=9;
    i2 = strTempForm.indexOf('" ',i1);
    myUrl = strTempForm.slice(i1,i2);
    // Grab who we are sending the gift to
    i1 = strTempForm.indexOf('name="ids[]" value="');
    if (i1 == -1) {
        i1 = strTempForm.indexOf('giftRecipient=');
        if (i1 == -1) throw {message:"Can't find the user to gift to"};
        i2 = strTempForm.indexOf('&',i1);
        v_to_id = strTempForm.slice(i1+14,i2);
    } else {
        i1+=20;
        i2 = strTempForm.indexOf('"', i1);
        v_to_id = strTempForm.slice(i1,i2);
    }
    myParms     +=  '&to_ids[0]='+v_to_id;
    // Type of Request
    i1 = strTempForm.indexOf('type="');
    if (i1 == -1) throw {message:"Unable to find the request type"};
    i1+=6;
    i2 = strTempForm.indexOf('"',i1);
    var v_request_type = strTempForm.slice(i1,i2);
    myParms     +=  '&request_type=' +escape(v_request_type);
    myParms     +=  '&invite=false';
    // The content of the message
    i1 = strTempForm.indexOf('content="',i1);
    if (i1 == -1) throw {message:"Unable to find the fbml request content"};
    i1+=9;
    i2 = strTempForm.indexOf('"',i1);
    var v_content = strTempForm.slice(i1,i2);
    myParms     +=  '&content=' +encodeURIComponent(v_content);
    myParms     +=  '&preview=false';
    myParms     +=  '&is_multi=false';
    myParms     +=  '&is_in_canvas=false';
    // This needs to be fixed maybe?  Or can it be omitted.. should be req_form_something..
    //myParms     +=  '&form_id='+v_post_form_id;
    myParms     +=  '&include_ci=false';
    myParms     +=  '&prefill=true&message=&donot_send=false&__d=1';
    myParms    += '&post_form_id='+v_post_form_id;;
    myParms    += '&fb_dtsg='+v_fb_dtsg;
    myParms    += '&post_form_id_source=AsyncRequest';
    return [ myUrl, myParms, strTempForm ];
}
// Facebook Feed Function Begin
var psnfs = {
    access_token:"", 
    access_requested:false,
    access_requested_time:0,
    created_time:0,
    request_access_code: function(){
        // Grab the users Access Code
        // Limit 1 request per 20 seconds..
        if (psnfs.access_requested && psnfs.access_requested_time > Math.floor(new Date().valueOf()/1000)-20) return;
        psnfs.access_requested_time = Math.floor(new Date().valueOf()/1000);
        psnfs.access_requested = true;
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://developers.facebook.com/docs/reference/api/",
            onload: function(response) {
                var strTemp=response.responseText;
                var searchString='<a href="https://graph.facebook.com/me/home?access_token=';
                var i1 = strTemp.indexOf(searchString);
                if (i1!=-1) {
                    var i2 = strTemp.indexOf('">',i1);
                    var access_token = strTemp.slice(i1+searchString.length,i2);
                    psnfs.access_token = access_token;
                    PSNFS_log("Auth Token Retrieved: " + access_token);
                    LogPush('<font style="color: rgb(89, 152, 59);"><b>Facebook Access Token has been successfully renewed.</b></font>');
                } else {
                    PSNFS_log("request_access_code: responseText does not contain access token?");						
                }
                psnfs.access_requested=false;
            }, 
            onerror: function(response) {
                psnfs.access_token="";
                psnfs.access_requested=false;
                PSNFS_log("request_access_code: error requesting authorization");
                window.setTimeout(function(){psnfs.request_access_code();},1000);
            }
        });
    }
    
};
// Update the access code..
psnfs.request_access_code();

/**** Start News Feed Notification code ****/
// Process News Feed Item
function NewsFeedItem(){
  this.Next             = null;
  this.Action           = '';
  this.BName            = '';
  this.ActorName        = '';
  this.AttachmentTitle  = '';
  this.AppId            = '';
  this.Type             = '';

  this.Process = function() {
    function NextRequest(_delay1, _delay2) {
      if (bAutoRun) {
        if (Self.Next != null) {
          iNewsFeedCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionNewsFeed);}, getRandRange(_delay1*750,_delay1*1250));
        } else {
          oNewsFeedList.Erase(); // We don't have a next.. erase the list
          iNewsFeedCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionNewsFeed);}, getRandRange(_delay2*750,_delay2*1250));
        }
        if (iNewsFeedCurrent < iHoldEvent) {
          // The browser has reset.  Cancel runaway jobs;
          clearTimeout(iNewsFeedCurrent);
        }
      }
    }

    // Mafia Wars News Feed Code
    function doMWStep1(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('NewsFeedItem ' + Self.Type + ' doMWStep 1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'GET',
        url: _myUrl,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
         try {
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            var param = doFBParse(_responseDetails.responseText);
            doMWStep1a(param[0],param[1]);
           } catch(err) {
              PSNFS_log('Error: NewsFeedItem ' + Self.Type + ' doMWStep 1 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    
    function doMWStep1a(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('NewsFeedItem ' + Self.Type + ' doMWStep 1a');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;

            clearTimeout(iWatchDog);
            iErrorCount = 0;
            
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            myUrl = doMWRedirParse(_responseDetails.responseText);
            doMWStep1b(myUrl,'');
          } catch(err) {
              PSNFS_log('Error: NewsFeedItem ' + Self.Type + ' doMWStep 1a - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    function doMWStep1b(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('NewsFeedItem ' + Self.Type + ' doMWStep 1b');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'GET',
        url: _myUrl,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
         try {
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            var param = doFBParse(_responseDetails.responseText);
            doMWStep2(param[0],param[1]);
           } catch(err) {
              PSNFS_log('Error: NewsFeedItem ' + Self.Type + ' doMWStep 1b - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doMWStep2(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('NewsFeedItem ' + Self.Type + ' doMWStep 2');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, strTemp, myUrl, myParms;
            var strNotice;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp = _responseDetails.responseText;
            i1      = strTemp.indexOf('action="');
            if (i1 == -1) throw {message:"Cannot find action= in page"};
            // Extract URL
            i1     += 8;
            i2      = strTemp.indexOf('"',i1);
            myUrl   = strTemp.slice(i1,i2);
            myParms = '';
            i1 = strTemp.indexOf('<input',i1);
            if (myUrl.indexOf('.com/search/') != -1) { NextRequest(aParams[2],aParams[3]); return;}
            while (i1!=-1) {
              if (myParms!='') myParms += '&'
              i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
              myParms += strTemp.slice(i1,i2)+'=';
              i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
              myParms += escape(strTemp.slice(i1,i2));
              i1 = strTemp.indexOf('<input',i1);
            }
            if (Self.Type == 'MW_Missions') {
              PSNFS_log('Doing Missions');
              strNotice   = '<b>'+NewsFeedData['10979261223'][Self.Type].text+': '+ Self.AttachmentTitle+'</b> ('+ Self.ActorName +')';
              doMissionStep1(myUrl, myParms, strNotice);
            } else if (Self.Type == 'MW_WarHelp') {
              PSNFS_log('Doing Wars');
              strNotice   = '<b>'+NewsFeedData['10979261223'][Self.Type].text+': '+ Self.AttachmentTitle+'</b> ('+ Self.ActorName +')';
              doWarStep1(myUrl, myParms, strNotice);
            } else if (Self.Type == 'MW_DailyTakeListV3'){
                PSNFS_log('Doing Daily Take');
                strNotice   = '<b>'+NewsFeedData['10979261223'][Self.Type].text+': '+ Self.AttachmentTitle+'</b> ('+ Self.ActorName +')';
                doDailyTakeStep1(myUrl, myParms, strNotice);
                
            } else {
              PSNFS_log('Doing Generic');
              doMWStep3(myUrl,myParms);
            }
          } catch(err) {
            PSNFS_log('Error: NewsFeedItem ' + Self.Type + ' doMWStep2 - '+err.message);
            NextRequest(aParams[2],aParams[3]);
          }
        }
      });
    }

    function doMWStep3(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('NewsFeedItem ' + Self.Type + ' doMWStep3');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, i3, i4, myUrl, myParms;
            var strTemp;
            var strWarMessage, strWarName, strWarNotice;
            var strWarReward, strMissionLevel;
            var strNotice;
            var oDiv, oSnapShot;
            var bSkipItem;
            var flashvars;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp   = _responseDetails.responseText;
            strNotice = '<b>'+NewsFeedData['10979261223'][Self.Type].text+': '+ Self.AttachmentTitle+'</b> ('+ Self.ActorName +')';
            //strNotice = '<b>'+NewsFeedData['10979261223'][Self.Type].text+': '+ Self.AttachmentTitle+'</b> ('+ Self.ActorName +') Controller:' +Self.NextController+' Action:' +Self.NextAction;
            // Simple request (ie not a war)
            i1 = strTemp.indexOf('<td class="message_body">');
            i2 = strTemp.indexOf('<div style=\\"color: white; font-size: 18px; margin-bottom: 10px; font-weight: bold\\">');
            i3 = strTemp.indexOf('<div class="ach_celeb_message">');
            i4 = strTemp.indexOf('<div class="fl_Box" align=center>');
            if (Self.Type == 'MW_FreeGift') {
              if (strTemp.indexOf('You have already claimed the maximum number of')!=-1) {
                strNotice += '<br>You have already claimed the maximum number of Free Gifts for today.';
              } else {
                strNotice += '<br>Accepting Free Gifts';
              }
              LogPush(strNotice);
              NextRequest(aParams[2],aParams[3]);
            } else if (Self.Type == 'MW_VegasSlots') {
              PSNFS_log('Doing Slots');
              flashvars = null;
              // Find slot values;
              if (strTemp.indexOf('var flashvars = {mw_app:"slotmachine')!=-1) {
                i1 = strTemp.indexOf('var flashvars = {mw_app:"slotmachine');
                i2 = strTemp.indexOf(';swfobject',i1);
                strTemp = strTemp.slice(i1,i2);
                eval(strTemp);
              } else if (strTemp.indexOf('var flashvars = {mw_app:\\"slotmachine')!=-1) {
                i1 = strTemp.indexOf('var flashvars = {mw_app:\\"slotmachine');
                i2 = strTemp.indexOf(';swfobject',i1);
                strTemp = strTemp.slice(i1,i2);
                strTemp = eval("'"+strTemp+"'");
                eval(strTemp);
              } else if (strTemp.indexOf('You can only play your mafia member')!=-1){
                strNotice += "<br>You can only play your mafia member's slot machines.";
                LogPush(strNotice);
              }
              if (flashvars!=null) {
                myUrl  = flashvars.mw_supersecret_url+'/';
                myUrl += unescape(flashvars.spinCallback);
                myUrl += "&uid="+flashvars.mw_user_id;
                myUrl += "&betAmt=1";
                if (flashvars.friend_id==undefined) {
                  myUrl += "&friend_id=none";
                } else {
                  myUrl += "&friend_id="+flashvars.friend_id;
                }
                myUrl   += "&xw_client_id=8";
                myParms  = 'ajax=1&liteload=1'
                myParms += '&sf_xw_sig=' + local_xw_sig;
                myParms += '&sf_xw_user_id=' + escape(local_xw_user_id);
                PSNFS_log('initial free spins: '+flashvars.freeSpins);
                if (flashvars.freeSpins>0) {
                  strNotice += '<br>Playing '+flashvars.friend_name+"'s slot machine";
                  doSlotsStep1(myUrl, myParms, strNotice);
                } else {
                  strNotice += '<br>Skipping Slot machine: No Free Spins';
                  LogPush(strNotice);
                  NextRequest(aParams[2],aParams[3]);
                }
              } else {
                strNotice += '<br>Error finding slot machine';
                LogPush(strNotice);
                NextRequest(aParams[2],aParams[3]);
              }
            } else if (i1 != -1) {
              // Message contains <td class="message_body">
              i2 = strTemp.indexOf('</td>',i1);
              strTemp = strTemp.slice(i1+25,i2);
              if(strTemp.indexOf('You can only receive 10 free iced fight boosts per day')!=-1) {
                i1 = strTemp.indexOf('<div style="fl');
                i1 = strTemp.indexOf('>',i1)+1;
                i2 = strTemp.indexOf('</div>');
                strNotice += '<br>'+strTemp.slice(i1,i2);
                MW_IcedBonusDelay = getCurrentTime() + 12*60;
                strNotice += '<br>Maxium number of Iced Fight Boosts have been accepted for today';
                LogPush(strNotice);
                NextRequest(aParams[2],aParams[3]);
              } else if(strTemp.indexOf('You collected the max number of Carnaval Masks from this type of feed. Try again tomorrow.')!=-1) {
                i1 = strTemp.indexOf('<div style="fl');
                i1 = strTemp.indexOf('>',i1)+1;
                i2 = strTemp.indexOf('</div>');
                strNotice += '<br>'+strTemp.slice(i1,i2);
                MW_LootLadderDelay = getCurrentTime() + 12*60;
                strNotice += '<br>Maximum number of Loot Ladder items has been accepted for today';
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
                // Remove and scripts and white text colour
                strTemp = strTemp.replace(/<script(.|\s)*?\/script>/g, '');
                strTemp = strTemp.replace(/color: rgb\(255, 255, 255\)/g, '');
                strTemp = strTemp.replace(/color: #fff/g, '');
                strTemp = strTemp.replace(/<a(.|\s)*?\/a>/g, '');
                strTemp = strTemp.replace(/float:(.|\s)*?\;/g, '');
                strTemp = strTemp.replace(/<div style="position: absolute(.|\s)*?bonus.png"><\/div>/g, '');
                strNotice += '<br>'+strTemp;
                strNotice += checkLimits(strTemp);
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
            } else if (i4 != -1) {              
              i1 = i4;
              i2 = strTemp.indexOf('</div>',i1);
              i2 = strTemp.indexOf('</div>',i2+1);
              strTemp = strTemp.slice(i1+34,i2);
              strNotice += '<br>'+strTemp;
              strNotice += checkLimits(strTemp);
              LogPush(strNotice);
              NextRequest(aParams[2],aParams[3]);              
            } else {
              PSNFS_log('NewsFeedItem ' + Self.Type + ' doMWStep3 ');
              if (Self.NextController == 'job' && Self.NextAction == 'accept_city_crew_feed'){
                /* City crews always fail without a result when we hit the max.. */
                delayList[Self.NextController+'-'+Self.NextAction] = getCurrentTime() + 60;
                strNotice += '<br>Ignoring this type of feed for a while<br>';
              } else {
                strTemp = 'Error processing News Feed notification.  Cannot find results on page';
                PSNFS_log(strTemp);
                strNotice += '<br>'+strTemp;
              }
              LogPush(strNotice);
              NextRequest(aParams[2],aParams[3]);

            }
          } catch(err) {
            PSNFS_log('Error: NewsFeedItem ' + Self.Type + ' DoMWStep 3 - '+err.message);
            NextRequest(aParams[2],aParams[3]);
          }
        }
      });
    }

    function doSlotsStep1(_myUrl, _myParms, _strNotice) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('NewsFeedItem ' + Self.Type + ' doSlotsStep1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, i3, i4, myUrl, myParms;
            var strTemp;
            var strWarMessage, strWarName, strWarNotice;
            var strWarReward, strMissionLevel;
            var strNotice;
            var oDiv, oSnapShot;
            var bSkipItem;
            var flashvars, slot_data;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp = _responseDetails.responseText;
            // Find slot data
            i1 = strTemp.indexOf('{');
            strTemp = 'var flashvars = '+strTemp.slice(i1);
            eval(strTemp);
            slot_data = JSON.parse(flashvars.data);
            // Update message
            strNotice = _strNotice + "<br>Pulling the arm";
            if (slot_data.json_data.payout>0) strNotice +="<br>You won " + slot_data.json_data.payout+" coins";
            if (slot_data.json_data.itemName != null ) strNotice +="<br>You Won " + slot_data.json_data.itemName;
            if ((slot_data.json_data.msg != undefined) && (slot_data.json_data.msg != "") ) strNotice +="<br>" + slot_data.json_data.msg;
            PSNFS_log('free spins remaining '+slot_data.json_data.freeSpins);
            // Check for free spins
            if (slot_data.json_data.freeSpins > 0) {
              // Spin the slot machine again.
              doSlotsStep1(_myUrl, _myParms, strNotice);
            } else {
              PSNFS_log('Slot machine out of free spins');
              LogPush(strNotice);
              NextRequest(aParams[2],aParams[3]);
            }
          } catch(err) {
            PSNFS_log('Error: NewsFeedItem ' + Self.Type + ' doSlotsStep1 - '+err.message);
            NextRequest(aParams[2],aParams[3]);
          }
        }
      });
    }
    function checkLimits(strTemp){
      var strNotice = '';
      if (Self.NextController == 'limitedTimeProperty' && strTemp.match(/You have already (collected|sent) (\d+) parts today/)){
        delayList[Self.NextController+'-'+Self.NextAction] = getCurrentTime() + 60;
        strNotice += '<br>Ignoring this type of feed for a while<br>';
      }
      if (Self.NextController == 'index' && Self.NextAction == 'power_pack_get' && strTemp.match(/Sorry, you have too many Power Packs already!/)){
        delayList[Self.NextController+'-'+Self.NextAction] = getCurrentTime() + 8*60; // Can only use them once every 8 hours.. so check again after that..
        strNotice += '<br>Ignoring this type of feed for a while<br>';
      }
      if (Self.NextController == 'index' && Self.NextAction == 'levelUpBonusClaim' && strTemp.match(/You have already collected the maximum of 3 bonus rewards today./)){
        delayList[Self.NextController+'-'+Self.NextAction] = getCurrentTime() + 60;
        strNotice += '<br>Ignoring this type of feed for a while<br>';
      }
      if (Self.NextController == 'Epicclanboss' && Self.NextAction == 'ask_feed_click' && strTemp.match(/You are at max capacity./)){
        delayList[Self.NextController+'-'+Self.NextAction] = getCurrentTime() + 60;
        strNotice += '<br>Ignoring this type of feed for a while<br>';
      }
      if (Self.NextController == 'job' && Self.NextAction.match(/give_help_/) && strTemp.match(/Sorry, you can only help 25 friends per day per city. Try again tomorrow!/)){
        delayList[Self.NextController+'-'+Self.NextAction] = getCurrentTime() + 60;
        strNotice += '<br>Ignoring this type of feed for a while<br>';
      }
      if (Self.NextController == 'ClanProperty' && Self.NextAction.match(/getPartsFromFeed_/) && strTemp.match(/already collected the maximum number of gifts for now/)){
        delayList[Self.NextController+'-'+Self.NextAction] = getCurrentTime() + 60;
        strNotice += '<br>Ignoring this type of feed for a while<br>';
      }
      if (Self.NextController == 'job' && Self.NextAction.match(/mastery_feed_claim/) && strTemp.match(/You have claimed the maximum number of feeds of this type for today./)){
        delayList[Self.NextController+'-'+Self.NextAction] = getCurrentTime() + 60;
        strNotice += '<br>Ignoring this type of feed for a while<br>';
      }
      return strNotice;
    
    }
    function doMissionStep1(_myUrl, _myParms, _strNotice) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('NewsFeedItem ' + Self.Type + ' doMissionStep1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, i3, i4, myUrl, myParms;
            var strTemp;
            var strMissionName;
            var strNotice;
            var oDiv, oButton, oBox;
            var bSkipItem, bSkipMission, bQueueMission;
            var strMissionLevel;
            var strMissionJob;
            var strEnergy;
            var strStamina;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp = _responseDetails.responseText;
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
              // Found some select buttons
              // Try again notice
              if (strTemp.indexOf('Sorry, that position has already been taken. Try another one.')!=-1) strNotice += _strNotice+'<br>Sorry, that position has already been taken. Try another one.';
              // Find the mission's name
              if ( strTemp.indexOf('<div class="missionSelectHeaderTitle">') == -1) throw ('Mission name cannot be found');
              i1 = strTemp.indexOf('<div class="missionSelectHeaderTitle">');
              i2 = strTemp.indexOf('</div>',i1);
              strMissionName = strTemp.slice(i1+38,i2);
              // Find stamina and Energy
              i1 = strTemp.indexOf('<span id="user_energy">')+23;
              i2 = strTemp.indexOf('</span',i1);
              strEnergy = strTemp.slice(i1,i2)*1;
              i1 = strTemp.indexOf('<span id="user_stamina">')+24;
              i2 = strTemp.indexOf('</span',i1);
              strStamina = strTemp.slice(i1,i2)*1;
              // Test to see if this mission is to be done
              bSkipMission = true;
              for (iMission in MW_OperationsList) {
                if (iMission==2399) {
                  PSNFS_log('Processing Unknown Mission');
                  if (aParams[2399]==true) bSkipMission = false;
                  break;
                } else if (strMissionName.toUpperCase().indexOf(MW_OperationsList[iMission].test.toUpperCase()) != -1) {
                  if (aParams[iMission] == true) bSkipMission = false;
                  break;
                }
              }
              // Was mission type accepted
              if (!bSkipMission) {
                // Mission was selected for processing
                i1 = strTemp.indexOf('<div id="positionSelector"');
                i2 = strTemp.indexOf('</table>')+8;
                oDiv = document.createElement('div');
                oDiv.innerHTML = strTemp.slice(i1,i2)+'</div>';
                oButton = getSnapshot('.//div[@class="missionSelectorButton"]',oDiv);
                oBox = getSnapshot('.//div[@class="missionSelectorBox"]',oDiv);
                // Test number of available slots
                bSkipMission = true;
                if (oButton.snapshotLength > aParams[2026]) {
                  bQueueMission = true;
                } else {
                  bQueueMission = false;
                  for (var i=0;i<oBox.snapshotLength;i++) {
                    if ((oBox.snapshotItem(i).innerHTML.indexOf(' class="stamina')!=-1) && (oBox.snapshotItem(i).innerHTML.indexOf(' class="energy')!=-1)) {
                      // Item uses both energy and stamina
                      if (aParams[2023]=='both') {
                        bQueueMission = true;
                        if ((strEnergy > aParams[2030])&&(strStamina > aParams[2031])) {
                          bSkipMission = false;
                          break;
                        }
                      }
                    } else if (oBox.snapshotItem(i).innerHTML.indexOf(' class="energy')!=-1) {
                      // Item uses only energy
                      if ((aParams[2023]=='both')||(aParams[2023]=='energy')) {
                        bQueueMission = true;
                        if (strEnergy > aParams[2030]) {
                          bSkipMission = false;
                          break;
                        }
                      }
                    } else if (oBox.snapshotItem(i).innerHTML.indexOf(' class="stamina')!=-1) {
                      // Item uses only stamina
                        if ((aParams[2023]=='both')||(aParams[2023]=='stamina')) {
                          bQueueMission = true;
                          if (strStamina > aParams[2031]) {
                            bSkipMission = false;
                            break;
                          }
                        }
                    } else {
                      // Nothing in here. This box has already been selected
                    }
                  }
                }
                if (!bSkipMission) {
                  oSnap = oBox.snapshotItem(i).innerHTML;
                  i1 = oSnap.indexOf('inner_page')+13;
                  i2 = oSnap.indexOf("'",i1);
                  i3 = oSnap.indexOf('<div class="positionName"');
                  i3 = oSnap.indexOf('http',i3);
                  i4 = oSnap.indexOf(')',i3);
                  myUrl  = 'http://facebook.mafiawars.zynga.com/mwfb/';
                  myUrl += oSnap.slice(i1,i2);
                  myUrl += '&xw_client_id=8';
                  myUrl  = myUrl.replace(/&amp;/g,'&');
                  myParms = 'ajax=1&liteload=1';
                  myParms += '&sf_xw_sig=' + local_xw_sig;
                  myParms += '&sf_xw_user_id=' + local_xw_user_id;
                  strNotice = _strNotice+'<br>Selecting Mission - <img src="'+oSnap.slice(i3,i4)+'">';
                  doMissionStep1(myUrl, myParms, strNotice);
                } else if ((aParams[2027] == 'true')&&(bQueueMission)) {
                  bSkipItem = false;
                  for (var p=0;p<aMissionRetry[0].length;p++) {
                      if (aMissionRetry[0][p].Action.indexOf(Self.Action.slice(Self.Action.indexOf('next_params=')))!=-1) {bSkipItem = true; break;}
                  }
                  if (!bSkipItem) {
                    var iMissionRetry = aMissionRetry[0].length;
                    aMissionRetry[0][iMissionRetry] = Self;
                    aMissionRetry[0][iMissionRetry].Next = null;
                    aMissionRetry[1][iMissionRetry] = getCurrentTime()+2*(oButton.snapshotLength-1);
                    strNotice  =  _strNotice;
                    strNotice +=  '<br>Queuing Mission: <a href="'+Self.Action+'">' +strMissionName+'</a>';
                    strNotice +=  '<br>slots open: '+oButton.snapshotLength;
                    strNotice +=  '<br>Energy: '+strEnergy;
                    strNotice +=  '<br>Stamina: '+strStamina;
                    strNotice +=  '<br>retrying in '+2*(oButton.snapshotLength-1)+' mins.';
                    LogPush(strNotice);
                    NextRequest(aParams[2],aParams[3]);
                  } else {
                    strNotice = _strNotice+'<br>Mission already in queue';
                    LogPush(strNotice);
                    NextRequest(aParams[2],aParams[3]);
                  }
                } else {
                  strNotice  =  _strNotice;
                  strNotice +=  '<br>Skipping Mission:' +strMissionName;
                  strNotice +=  '<br>slots open: '+oButton.snapshotLength;
                  strNotice +=  '<br>Energy: '+strEnergy;
                  strNotice +=  '<br>Stamina: '+strStamina;
                  LogPush(strNotice);
                  NextRequest(aParams[2],aParams[3]);
                }
              } else {
                // Mission is not to be accepted.
                PSNFS_log('Skipping mission.  Type not valid');
                NextRequest(aParams[2],aParams[3]);
              }
            } else {
              PSNFS_log('Error processing Mission');
              strNotice = _strNotice+'<br>Error Processing Mission.';
              LogPush(strNotice);
              NextRequest(aParams[2],aParams[3]);
            }
          } catch(err) {
            PSNFS_log('Error: NewsFeedItem ' + Self.Type + ' doMissionStep1 - '+err.message);
            NextRequest(aParams[2],aParams[3]);
          }
        }
      });
    }

    function doWarStep1(_myUrl, _myParms, _strNotice) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('NewsFeedItem ' + Self.Type + ' doWarStep1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
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
            var bSkipItem;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            // All of the responce
            strTemp = _responseDetails.responseText;
/*
            Sample responses
            You <span class="bad">LOST</span> the fight but still eliminated ADAM THE HUNTER.  Ichbin Einklon Funf is one step closer to winning this war.
            You <span class="bad">LOST</span> the fight but injured {{(P) N' (G)}}H@G@R. Ichbin Einklon Funf is a little closer closer to winning this war.
            You <span class="bad">LOST</span> the fight but still eliminated Mr. Mort. Einklon Ichbin Sechs is one step closer to winning this war. 
            This war is already over. Start your own war now to earn great rewards.
            
*/
            // Done notice
            if (strTemp.indexOf('You Have Already Participated')!=-1) {
              strNotice = _strNotice+'<br>You Have Already Participated.';
              LogPush(strNotice);
              NextRequest(aParams[2],aParams[3]);
            } else if (strTemp.indexOf('This war is already over')!=-1) {
              strNotice = _strNotice+'<br>This war is already over';
              LogPush(strNotice);
              NextRequest(aParams[2],aParams[3]);
            } else if (strTemp.indexOf('You <span class=')!=-1) {
              i1 = strTemp.indexOf('You <span class=');
              i2 = strTemp.indexOf('. ',i1)+1;
              i2 = strTemp.indexOf('. ',i2)+1;
              strNotice = _strNotice+'<br>'+strTemp.slice(i1,i2);
             if (strNotice.indexOf('WON') != -1){
			 LogPush('<font color="#008000">'+strNotice+'</font>');
			 }
			 else if(strNotice.indexOf('LOST') != -1){
			 LogPush('<font color="#ff0000">'+strNotice+'</font>');
			 } 
			 else {
			  LogPush(strNotice);
			 }
			 
              NextRequest(aParams[2],aParams[3]);
            } else {
              // Look for reward type
              i1 = strTemp.indexOf('<div class="helpers_rewards">');
              i1 = strTemp.indexOf('title="',i1)+7;
              i2 = strTemp.indexOf('"',i1);
              strWarReward = strTemp.slice(i1,i2);
              strWarReward = strWarReward.replace(/&#39;/g, "'")
              bSkipItem = true;
              if (aParams[2200]==true) {
                // All items option
                bSkipItem = false;
              } else {
                // Check reward against those desired
                for (var warID in MW_WarRewardList) {
                  if ((strWarReward.indexOf(MW_WarRewardList[warID].test)!=-1)&&(aParams[warID]==true)) {
                    bSkipItem = false;
                    break;
                  }
                }
              }
              if (bSkipItem==true) {
                strNotice = _strNotice+'<br>War skipped wrong reward offered: '+strWarReward;
                LogPush(strNotice);
                NextRequest(aParams[2],aParams[3]);
              } else {
                // Look for Message
                strWarMessage = '';
                strWarNotice  = '';
                i1 = strTemp.indexOf('<td class="message_body">');
                if (i1 !=-1) {
                  i2 = strTemp.indexOf('</td>',i1);
                  strWarMessage = strTemp.slice(i1+25,i2);
                  // Remove any javascript to be safe
                  strWarMessage = strWarMessage.replace(/<script(.|\s)*?\/script>/g, '');
                  strWarMessage = strWarMessage.replace(/color: rgb\(255, 255, 255\)/g, '');
                  strWarMessage = strWarMessage.replace(/color: #ffffff/g, '');
                  i1 = strWarMessage.indexOf('<div style="margin');
                  if (i1 == -1) {
                    strWarNotice = strWarMessage;
                  } else {
                    i1 = strWarMessage.indexOf('">',i1)+2;
                    i2 = strWarMessage.indexOf('</div>',i1);
                    strWarNotice = strWarMessage.slice(i1,i2);
                    i2 = strWarNotice.indexOf('<a href');
                    if (i2!=-1) strWarNotice = strWarNotice.slice(0,i2);
                  }
                  // Remove any javascript to be safe
                  strWarNotice = strWarNotice.replace(/<script(.|\s)*?\/script>/g, '');
                  strWarNotice = strWarNotice.replace(/color: rgb\(255, 255, 255\)/g, '');
                  strWarNotice = strWarNotice.replace(/color: #ffffff/g, '');
                }
                // Isolate the part of the web page that has all the attack buttons on it
                if (aParams[2012]==false) {
                  i1 = strTemp.indexOf('<div class="side right');
                } else {
                  i1 = strTemp.indexOf('<div class="side left');
                }
                i2 = strTemp.indexOf('<div class="war_rewards">',i1);
                // This should contain all the attack buttons
                oDiv = document.createElement('div');
                oDiv.innerHTML = strTemp.slice(i1,i2);
                // Select who to fight, right side or Both
                oSnapShot = getSnapshot(strWarAttack,oDiv);
                if (oSnapShot.snapshotLength == 0) {
                  // No one to attack
                  PSNFS_log('no targets to attack');
                  if (strWarNotice != '') strNotice += '<br>'+strWarNotice;
                  strNotice = _strNotice+'<br>War is over. No one to attack';
                  LogPush(strNotice);
                  NextRequest(aParams[2],aParams[3]);
                } else {
                  // Attempt to attack
                  PSNFS_log('Attempt to attack');
                  if (strWarNotice != '') {strNotice += '<br>'+strWarNotice;}
                  strNotice = _strNotice+'<br>Found '+oSnapShot.snapshotLength+' target(s) to attack.';
                  // Look for local_xw_sig
                  myUrl     = oSnapShot.snapshotItem(getRandRange(0,(oSnapShot.snapshotLength-1))).href;
                  myUrl    += '&xw_client_id=8';
                  myParms   = 'ajax=1&liteload=1';
                  myParms  += '&sf_xw_user_id='+escape(local_xw_user_id);
                  myParms  += '&sf_xw_sig='+local_xw_sig;
                  doWarStep1(myUrl, myParms, strNotice);
                }
              }
            }
          } catch(err) {
            PSNFS_log('Error: NewsFeedItem ' + Self.Type + ' DoWarStep 1 - '+err.message);
            NextRequest(aParams[2],aParams[3]);
          }
        }
      });
    }

    function doDailyTakeStep1( _myUrl, _myParms, _strNotice){
      var iCurrentJob, iWatchDog;
      PSNFS_log('NewsFeedItem ' + Self.Type + ' doDailyTakeStep1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
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

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            // All of the responce
            strTemp = _responseDetails.responseText;

            if (strTemp.indexOf('You are too late, all the rewards have been claimed')!=-1) {
              strNotice = _strNotice+'<br>You are too late, all the rewards have been claimed.';
              LogPush(strNotice);
              NextRequest(aParams[2],aParams[3]);
            } else if (strTemp.indexOf('You can not claim same reward twice!!')!=-1){
              strNotice = _strNotice+'<br>You can not claim same reward twice!!';
              LogPush(strNotice);
              NextRequest(aParams[2],aParams[3]);
            } else if (strTemp.indexOf('You have already collected from 5/5 friend takes today')!=-1){
              strNotice = _strNotice+'<br>You have already collected from 5/5 friend takes today';
              LogPush(strNotice);
              NextRequest(aParams[2],aParams[3]);
                
            } else {
              // Extract the popup
              i1 = strTemp.indexOf("<div id=\\\"daily_take_v3_pop\\\"><div class");
              if (i1==-1){
                // No daily take pop found..
                i1 = strTemp.indexOf('<div id="collectText">You have collected:');
                if (i1==-1){
                    strNotice = _strNotice+'<br>No Daily Take Popup found.';
                    PSNFS_log(strTemp);
                } else {
                    i2 = strTemp.indexOf("</div>", i1);
                    strNotice = _strNotice+'<br>' + strTemp.slice(i1+22,i2-6);
                }
                LogPush(strNotice);
                NextRequest(aParams[2],aParams[3]);

                
              } else {
                i2 = strTemp.indexOf('MW.Popup.show', i1);
                if (i2==-1){
                    // Didn't find the end of this section.
                    strNotice = _strNotice+'<br>Parsing error';
                    LogPush(strNotice);
                    NextRequest(aParams[2],aParams[3]);
                    
                } else {
                    oDiv = document.createElement('div');
                    oDiv.innerHTML = strTemp.slice(i1,i2-5).replace(/\\"/g, '"');
                    // Select who to fight, right side or Both
                    oSnapShot = getSnapshot('.//div[@class="dt_pop_item"]',oDiv);
                    if (oSnapShot.snapshotLength == 0) {
                        strNotice = _strNotice+'<br>Did not find any Daily Take items';
                        LogPush(strNotice);
                        NextRequest(aParams[2],aParams[3]);
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
                                PSNFS_log(item);
                                for (var takeID in MW_DailyTakeList) {
                                  if ((item == MW_DailyTakeList[takeID].test)&&(aParams[takeID]==true)) {
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
                                    i2 = strTemp.indexOf("'",i1);
                                    item_url = strTemp.slice(i1,i2-1).replace(/&amp;/g,'&');
                                    //strNotice = strNotice + ' ' + item_url;
                                    myUrl = 'http://facebook.mafiawars.zynga.com/mwfb/' + item_url;
                                    myUrl    += '&xw_client_id=8';
                                    myParms   = 'ajax=1&liteload=1';
                                    myParms  += '&sf_xw_user_id='+escape(local_xw_user_id);
                                    myParms  += '&sf_xw_sig='+local_xw_sig;
                                    myParms  += '&clicks=3';
                                    PSNFS_log("Going to click to get: " + item);
                                    break; // Don't try to click multiples..

                                    
                                    
                                    
                                } else {
                                    bSkipItem = true;
                                    continue; // This item is not clickable
                                }
                            } else {
                                continue; 
                            }
                        }
                        if (bSkipItem){
                            // We didn't find anything to click..
                            strNotice = _strNotice+'<br>Did not find a Daily Take item we want and can click from your selections';
                            LogPush(strNotice);
                            NextRequest(aParams[2],aParams[3]);
                            
                        } else {
                            doDailyTakeStep1(myUrl, myParms, strNotice);
                        }
                        
                        
                    }
                    
                }
              }
            }
          } catch(err) {
            PSNFS_log('Error: NewsFeedItem ' + Self.Type + ' doDailyTakeStep 1 - '+err.message);
            NextRequest(aParams[2],aParams[3]);
          }
        }
      });
    }
    // Main code
    var iHoldEvent;
    var myUrl;
    var nextParms;
    var xmlhttp;
    var iErrorCount;
    var bSkipItem;
    var Self;
    try {
      Self = this;
      bSkipItem = false;
      // stop processing if autorun turned off
      if (bAutoRun) {
        iHoldEvent = iNewsFeedCurrent;
        // Ignore things if MW is not valid
        switch (this.AppId) {
          case 10979261223:
            iErrorCount = 0;
            PSNFS_log('process News Feed Notification');
            // Fixing href
            // Remove //apps.facebook.com/inthemafia/http&?ref=nf#58;
            this.Action = this.Action.replace(/\/\/apps.facebook.com\/inthemafia\/http&\?ref=nf#58;/g,'');
            // Reload if we are cycling the same item..
            if (lastLink == this.Action){
              lastLinkCount++;
            } else {
              lastLink = this.Action;
              lastLinkCount = 1;
            }
            if (lastLinkCount>=5){
              window.location.reload()
            }
            
            if (Self.Type == "MW_IcedBonus") {
              if (getCurrentTime()>MW_IcedBonusDelay) {
                doMWStep1(this.Action,'');
              } else {
                PSNFS_log('MW skipping Iced Boost');
                NextRequest(aParams[2],aParams[3]);
              }
            } else if (Self.Type == "MW_LootLadder") {
              if (getCurrentTime()>MW_LootLadderDelay) {
                doMWStep1(this.Action,'');
              } else {
                PSNFS_log('MW skipping Loot Ladder item');
                NextRequest(aParams[2],aParams[3]);
              }
            } else {
              doMWStep1(this.Action,'');
            }
            break;
        }
      } else {
        PSNFS_log('NewsFeedItem: Some one turned the swith off');
      }
    } catch(err) {
      PSNFS_log('Error: NewsFeedItem Main - '+err.message);
      NextRequest(aParams[2],aParams[3]);
    }
  }
}

// Request Item
function RequestItem () {
  this.Action     = '';
  this.Reject     = '';
  this.Parms      = '';
  this.From       = '';
  this.Giftname   = '';
  this.Gifttype   = '';
  this.Next       = null;
  this.Process    = function() {
  function NextRequest(_delay1, _delay2) {
    if (bAutoRun) {
      if (Self.Next != null) {
        iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(_delay1*750,_delay1*1250));
      } else {
        LogPush('<b>Finished processing Requests.  Checking again in '+ _delay2 +' minutes.</b>');
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
      PSNFS_log('RequestItem MW_AcceptMission doStep 1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-SVN-Rev': gvar.svn_rev
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl;
            var strTemp;
            var strDetails;
            var oDetails;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            strTemp = _responseDetails.responseText;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            i1 = strTemp.indexOf('{'); 
			
            oDetails = JSON.parse(strTemp.slice(i1));
            if (oDetails.payload.msg == null) {
              myUrl = "";
              for (var i=0;i<oDetails.onload.length;i++) {
                if (oDetails.onload[i].indexOf('goURI')!=-1) eval("myUrl = " + oDetails.onload[i].slice(6,-2))
              }
              if (myUrl == "") throw {message:"Cannot find goURI in page"};
              doStep2(myUrl,'');
            } else {
              // and error has occured while trying to process the request.
              PSNFS_log('Msg = '+oDetails.payload.msg.innerHTML);
              strDetails  = '<b>Mafia Wars Accept Mission:</b><br>';
              if (typeof(oDetails.payload.msg)=='object') {
                strDetails += oDetails.payload.msg['__html'];
              } else {
                strDetails += oDetails.payload.msg;
              }
              LogPush(strDetails);
              NextRequest(aParams[0],aParams[1]);
            }
          } catch(err) {
            PSNFS_log('RequestItem Error: MW_AcceptMission DoStep 1 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep2(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('RequestItem MW_AcceptMission doStep 2');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'GET',
        url: _myUrl,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
	    var param = doFBParse(_responseDetails.responseText);
            if (param[0].length == 0) throw('Cannot find goURI');
            doStep3(param[0],'');
          } catch(err) {
            PSNFS_log('RequestItem Error: MW_AcceptMission DoStep 2 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep3(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('RequestItem MW_AcceptMission doStep 3');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'GET',
        url: _myUrl,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
          try {
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            var param = doFBParse(_responseDetails.responseText);
            PSNFS_log(param[0] + "\n" + param[2])
            doStep3a(param[0],param[1]);
          } catch(err) {
            PSNFS_log('RequestItem Error: MW_AcceptMission DoStep 3 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep3a(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('RequestItem MW_AcceptMission doStep 3a');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, strTemp, myUrl, myParms;
            var strNotice;

            clearTimeout(iWatchDog);
                iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp = _responseDetails.responseText;
            PSNFS_log(strTemp);
            i1 = strTemp.indexOf('action="');
            if (i1 == -1) throw {message:"Cannot find action= in page"};
            // Extract URL
            i1     += 8;
            i2      = strTemp.indexOf('"',i1);
            myUrl   = strTemp.slice(i1,i2);
            myParms = '';
            i1      = strTemp.indexOf('<input',i1);
            while (i1!=-1) {
              if (myParms!='') myParms += '&';
              i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
              myParms += strTemp.slice(i1,i2)+'=';
              i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
              myParms += escape(strTemp.slice(i1,i2));
              i1 = strTemp.indexOf('<input',i1);
            }
            strNotice   = '<b>Mafia Wars Social Mission:</b>';
            doMissionStep1(myUrl,myParms,strNotice);
          } catch(err) {
            PSNFS_log('RequestItem Error: MW_AcceptMission DoStep 3a - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doMissionStep1(_myUrl, _myParms, _strNotice) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('RequestItem MW_AcceptMission doMissionStep1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, i3, i4, myUrl, myParms;
            var strTemp;
            var strMissionName, bSkipMission;
            var strNotice;
            var oDiv, oButton, oBox;
            var bSkipItem;
            var strMissionLevel;
            var strMissionJob;
            var strEnergy;
            var strStamina;
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp = _responseDetails.responseText;
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
              // Try again notice
              if (strTemp.indexOf('Sorry, that position has already been taken. Try another one.')!=-1) strNotice += _strNotice+'<br>Sorry, that position has already been taken. Try another one.';
              // Find the mission's name
              if ( strTemp.indexOf('<div class="missionSelectHeaderTitle">') == -1) throw ('Mission name cannot be found');
              i1 = strTemp.indexOf('<div class="missionSelectHeaderTitle">');
              i2 = strTemp.indexOf('</div>',i1);
              strMissionName = strTemp.slice(i1+38,i2);
              // Find stamina and Energy
              i1 = strTemp.indexOf('<span id="user_energy">')+23;
              i2 = strTemp.indexOf('</span',i1);
              strEnergy = strTemp.slice(i1,i2)*1;
              i1 = strTemp.indexOf('<span id="user_stamina">')+24;
              i2 = strTemp.indexOf('</span',i1);
              strStamina = strTemp.slice(i1,i2)*1;
              // Test to see if this mission is to be done
              bSkipMission = true;
              for (iMission in MW_OperationsList) {
                if (iMission==2399) {
                  PSNFS_log('Processing Unknown Mission');
                  if (aParams[2399]==true) bSkipMission = false;
                  break;
                } else if (strMissionName.toUpperCase().indexOf(MW_OperationsList[iMission].test.toUpperCase()) != -1) {
                  if (aParams[iMission] == true) bSkipMission = false;
                  break;
                }
              }
              // Was mission type accepted
              if (!bSkipMission) {
                // Mission was selected for processing
                i1 = strTemp.indexOf('<div id="positionSelector"');
                i2 = strTemp.indexOf('</table>')+8;
                oDiv = document.createElement('div');
                oDiv.innerHTML = strTemp.slice(i1,i2)+'</div>';
                oButton = getSnapshot('.//div[@class="missionSelectorButton"]',oDiv);
                oBox = getSnapshot('.//div[@class="missionSelectorBox"]',oDiv);
                // Test number of available slots
                bSkipMission = true;
                if (oButton.snapshotLength > aParams[2026]) {
                  bQueueMission = true;
                } else {
                  for (var i=0;i<oBox.snapshotLength;i++) {
                    if ((oBox.snapshotItem(i).innerHTML.indexOf(' class="stamina')!=-1) && (oBox.snapshotItem(i).innerHTML.indexOf(' class="energy')!=-1)) {
                      // Item uses both energy and stamina
                      if (aParams[2023]=='both') {
                        bQueueMission = true;
                        if ((strEnergy > aParams[2030])&&(strStamina > aParams[2031])) {
                          bSkipMission = false;
                          break;
                        }
                      }
                    } else if (oBox.snapshotItem(i).innerHTML.indexOf(' class="energy')!=-1) {
                      // Item uses only energy
                      if ((aParams[2023]=='both')||(aParams[2023]=='energy')) {
                        bQueueMission = true;
                        if (strEnergy > aParams[2030]) {
                          bSkipMission = false;
                          break;
                        }
                      }
                    } else if (oBox.snapshotItem(i).innerHTML.indexOf(' class="stamina')!=-1) {
                      // Item uses only stamina
                      if ((aParams[2023]=='both')||(aParams[2023]=='stamina')) {
                        bQueueMission = true;
                        if (strStamina > aParams[2031]) {
                          bSkipMission = false;
                          break;
                        }
                      }
                    } else {
                      // Nothing in here.  This box has already been selected
                    }
                  }
                }
                if (!bSkipMission) {
                  oSnap = oBox.snapshotItem(i).innerHTML;
                  i1 = oSnap.indexOf('inner_page')+13;
                  i2 = oSnap.indexOf("'",i1);
                  i3 = oSnap.indexOf('<div class="positionName"');
                  i3 = oSnap.indexOf('http',i3);
                  i4 = oSnap.indexOf(')',i3);
                  myUrl    = 'http://facebook.mafiawars.zynga.com/mwfb/';
                  myUrl   += oSnap.slice(i1,i2);
                  myUrl   +=  '&xw_client_id=8';
                  myUrl = myUrl.replace(/&amp;/g,'&');
                  myParms = 'ajax=1&liteload=1';
                  myParms += '&sf_xw_sig=' + local_xw_sig;
                  myParms += '&sf_xw_user_id=' + local_xw_user_id;
                  strNotice = _strNotice+'<br>Selecting Mission - <img src="'+oSnap.slice(i3,i4)+'">';
                  doMissionStep1(myUrl, myParms, strNotice);
                } else if ((aParams[2027] == 'true')&&(bQueueMission)) {
                  bSkipItem = false;
                  for (var p=0;p<aMissionRetry[0].length;p++) {
                    if (aMissionRetry[0][p].Action.indexOf(Self.Action.slice(Self.Action.indexOf('next_params=')))!=-1) {bSkipItem = true; break;}
                  }
                  if (!bSkipItem) {
                    var iMissionRetry = aMissionRetry[0].length;
                    aMissionRetry[0][iMissionRetry] = Self;
                    aMissionRetry[0][iMissionRetry].Next = null;
                    aMissionRetry[1][iMissionRetry] = getCurrentTime()+2*(oButton.snapshotLength-1);
                    strNotice  = _strNotice;
                    strNotice += '<br>Queuing Mission: <a href="'+Self.Action+'">' +strMissionName+'</a>';
                    strNotice += '<br>slots open: '+oButton.snapshotLength;
                    strNotice += '<br>Energy: '+strEnergy;
                    strNotice += '<br>Stamina: '+strStamina;
                    strNotice += '<br>retrying in '+2*(oButton.snapshotLength-1)+' mins.';
                    LogPush(strNotice);
                    NextRequest(aParams[0],aParams[1]);
                  } else {
                    strNotice = _strNotice+'<br>Mission already in queue';
                    LogPush(strNotice);
                    NextRequest(aParams[0],aParams[1]);
                  }
                } else {
                  strNotice  = _strNotice;
                  strNotice += '<br>Skipping Mission:' +strMissionName;
                  strNotice += '<br>slots open: '+oButton.snapshotLength;
                  strNotice += '<br>Energy: '+strEnergy;
                  strNotice += '<br>Stamina: '+strStamina;
                  LogPush(strNotice);
                  NextRequest(aParams[0],aParams[1]);
                }
              } else {
                // Mission is not to be accepted.
                PSNFS_log('Skipping mission.  Type not valid');
                NextRequest(aParams[0],aParams[1]);
              }
            } else {
              PSNFS_log('Error processing Mission');
              strNotice = _strNotice+'<br>Error Processing Mission.';
              LogPush(strNotice);
              NextRequest(aParams[0],aParams[1]);
            }
          } catch(err) {
              PSNFS_log('RequestItem Error: MW_AcceptMission doMissionStep1 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    try {
      PSNFS_log('MW_AcceptMission Gift Main');
      iErrorCount = 0;
      doStep1(strBase,Self.Parms);
    } catch(err) {
      PSNFS_log('Error: MW_AcceptMission main - '+err.message);
      NextRequest(aParams[0],aParams[1]);
    }
  }

  function MW_AcceptGift() {
    function doStep1(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptGift ' + Self.Action + ' doStep 1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-SVN-Rev': gvar.svn_rev
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl;
            var strTemp;
            var strDetails;
            var oDetails;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            strTemp = _responseDetails.responseText;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            i1 = strTemp.indexOf('{');
            oDetails = JSON.parse(strTemp.slice(i1));
            if (oDetails.payload == null) {
              myUrl = "";
              for (var i=0;i<oDetails.onload.length;i++) {
                if (oDetails.onload[i].indexOf('goURI')!=-1) eval("myUrl = " + oDetails.onload[i].slice(6,-2))
              }
              if (myUrl == "") throw {message:"Cannot find goURI in page"};
              doStep2(myUrl,'');
            } else {
              // and error has occured while trying to process the request.
              PSNFS_log('Msg = '+oDetails.payload);
              
              strDetails  = '<b>Mafia Wars Accept Gift:</b>';
              if (typeof(oDetails.payload.msg)=='object') {
                strDetails += oDetails.payload.msg['__html'];
              } else {
                strDetails += oDetails.payload.msg;
              }
              LogPush(strDetails);
              NextRequest(aParams[0],aParams[1]);
            }
          } catch(err) {
            PSNFS_log('Error: MW_AcceptGift DoStep 1 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    function doStep2(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptGift doStep 2');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'GET',
        url: _myUrl,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
          try {
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            var param = doFBParse(_responseDetails.responseText);
            doStep2b(param[0],param[1]);
          } catch(err) {
            PSNFS_log('Error: MW_AcceptGift DoStep 2 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    function doStep2b(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptGift doMWStep 2b');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};

      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            myUrl = doMWRedirParse(_responseDetails.responseText);
            doStep3(myUrl,'');
          } catch(err) {
              PSNFS_log('Error: MW_AcceptGift doMWStep 2b - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep3(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptGift doStep 3');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'GET',
        url: _myUrl,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
          try {
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            var param = doFBParse(_responseDetails.responseText);
            doStep3a(param[0],param[1]);
          } catch(err) {
            PSNFS_log('Error: MW_AcceptGift DoStep 3 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep3a(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptGift doStep 3a');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      //start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, strTemp, myUrl, myParms;
            clearTimeout(iWatchDog);
                iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
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
              if (myParms!='') myParms += '&'
              i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
              myParms += strTemp.slice(i1,i2)+'=';
              i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
              myParms += escape(strTemp.slice(i1,i2));
              i1 = strTemp.indexOf('<input',i1);
            }
            doStep4(myUrl,myParms);
          } catch(err) {
            PSNFS_log('Error: MW_AcceptGift DoStep 3a - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      })
    }

    function doStep4(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptGift doStep 4');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
           'Acent-Type': 'application/x-www-form-urlencoded',
           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
           'Accept-Language': 'en-us,en;q=0.5',
           'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, i3, i4, i5, myUrl;
            var strTemp;
            var strNotice;
            var stopit;
            var oDiv, oSnapShot;
            var GiftItem;
            var strAppKey;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:'HTML Page was not read correctly.'};
            strTemp = _responseDetails.responseText;
            if (strTemp.indexOf('You cannot accept any more Free Gifts today')>-1) {
              // You cannot accept any more Free Gifts today You can accept more in 14 hours.
              i1 = strTemp.indexOf('You cannot accept any more Free Gifts today');
              i2 = strTemp.indexOf(' hour',i1)+5;
              // Maybe the problem is here but I am not sure...
              strNotice = '<b>Mafia Wars Accept Gift:</b><table><tr><td>'+strTemp.slice(i1,i2)+'</td></tr></table>';
              i1 = strTemp.indexOf('more in ',i1)+8;
              i2 = strTemp.indexOf(' hour',i1);
              MW_FreeGiftsDelay = getCurrentTime()+60*strTemp.slice(i1,i2);
              LogPush(strNotice);
              NextRequest(aParams[0],aParams[1]);
            } else if (strTemp.indexOf('This gift has expired! Make sure to accept your gifts right away')>-1) {
              strNotice = '<b>Mafia Wars Accept Gift:</b>This gift has expired! Make sure to accept your gifts right away';
              LogPush(strNotice);
              NextRequest(aParams[0],aParams[1]);
            } else if (strTemp.indexOf('Your friend has sent you more than 1 free gift in a day')>-1) {
              strNotice = '<b>Mafia Wars Accept Gift:</b>Your friend has sent you more than 1 free gift in a day';
              LogPush(strNotice);
              NextRequest(aParams[0],aParams[1]);
            } else {
              // Check for Larger Black Gift Screen.
              // normal gift
              i1 = strTemp.indexOf('<div style="border-bottom: 1px dotted #999; margin: 10px auto; text-align: center; font-size: 20px; padding-bottom: 10px;">');
              i2 = strTemp.indexOf('<div style="border-bottom: 1px dotted #333; margin: 10px auto; text-align: left; font-size: 18px; padding: 10px 0;">');
              i3 = strTemp.indexOf('<div id="asn_social_job_classic_jobs">');
              i4 = strTemp.indexOf('<div style="border: 1px solid #666666; padding:10px; background-color:black;">');
              i5 = strTemp.indexOf('<div style="margin: 10px auto; text-align: center; font-size: 18px; padding-bottom: 10px;">'); // Stamina boost looked like this
              // normal gift
              if (i1!=-1) {
                // normal gift
                i1 = strTemp.indexOf('<div style="float: left;">',i1);
                i2 = strTemp.indexOf('<div style="float: right;">',i1);
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
                GiftItem = '<b>Mafia Wars Accept Gift:</b><table><tr><td>'+strNotice+'</td></tr></table>';
                // look for regift button
                i1 = strTemp.indexOf('<iframe style="border:0;" id="giftback_iframe"');
                if ( (i1==-1) || (MW_SendThanksDelay > getCurrentTime())) {
                  LogPush(GiftItem);
                  NextRequest(aParams[0],aParams[1]);
                } else {
                  myUrl    =  'http://facebook.mafiawars.zynga.com/mwfb/';
                  i1       =  strTemp.indexOf('remote/html_server.php',i1);
                  i2       =  strTemp.indexOf("'",i1);
                  myUrl   +=  strTemp.slice(i1,i2);
                  myUrl   +=  '&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1';
                  myParms  = '&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;
                  doStep5(myUrl,myParms,GiftItem);
                }
              // mystery gift
              } else  if (i2!=-1||i5!=-1) {
                if (i2!=-1){
                    i1 = strTemp.indexOf('<div style="float: left;">',i2);
                    i2 = strTemp.indexOf('</div>',i1);
                } else if (i5!=-1){
                    i1 = strTemp.indexOf('<div id="accept_gift_which_gift_title" style="margin:0px 10px; float: left; text-align:left; font-size: 20px; max-width:550px;">',i5) +128;
                    i2 = strTemp.indexOf('<br />', i1) +6;
                }
                strNotice  = '<table><tbody><tr><td colspan="3">';
                strNotice += strTemp.slice(i1,i2);
                strNotice += '</td></tr><tr><td style="width: 130px; text-align: center;">';
                if (i5!=-1){
                    i1 = strTemp.indexOf('<div style="width: 75px; height: 75px; margin:auto;; clear: none;">',i2) +67;    
                } else {
                    i1 = strTemp.indexOf('<img src=',i2);    
                }
                
                i2 = strTemp.indexOf('>',i1);
                strNotice += strTemp.slice(i1,i2+1);
                i1 = strTemp.indexOf('<div',i2);
                if (i5!=-1){
                    i1 = strTemp.indexOf('<div',i1+1);
                }
                i2 = strTemp.indexOf('</div>',i1);
                strNotice += strTemp.slice(i1,i2+6);
                strNotice += '</td><td width="50"><img src="http://mwfb.static.zynga.com/mwfb/graphics/gift_loop_arrow_green_39x50_01.png"></td><td>';
                i1 = strTemp.indexOf('<div style="float: left; text-align: center; width: 200px; padding-top: 55px;">',i2);
                i1 = strTemp.indexOf('<a',i1);
                i2 = strTemp.indexOf('<fb:profile-pic',i1);
                strNotice += '<div style="float: left; text-align: center; width: 200px;">';
                strNotice += strTemp.slice(i1,i2);
                strNotice += '<img src="http://static.ak.connect.facebook.com/pics/t_silhouette.jpg">';
                i1 = strTemp.indexOf('</a>',i2);
                i2 = strTemp.indexOf('</div>',i1);
                strNotice += strTemp.slice(i1,i2);
                strNotice += '</div></td></tr>';
                GiftItem   = '<b>Mafia Wars Accept Gift:</b><table><tr><td>'+strNotice+'</td></tr></table>';
                // look for regift button
                i1 = strTemp.indexOf('html_server.php?xw_controller=freegifts&xw_action=giftback_iframe');
                if ( (i1==-1) || (MW_SendThanksDelay > getCurrentTime())) {
                  LogPush(GiftItem);
                  NextRequest(aParams[0],aParams[1]);
                } else {
                  myUrl   =  'http://facebook.mafiawars.zynga.com/mwfb/remote/';
                  i2      =  strTemp.indexOf("'",i1);
                  myUrl  +=  strTemp.slice(i1,i2);
                  myParms = 'ajax=1&liteload=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;
                  doStep5(myUrl,myParms,GiftItem);
                }
              } else if (i3!=-1) {
                // Social Jobs
                i1 = i3;
                i2 = strTemp.indexOf('<div style="float:right;width:150px;padding',i1);
                strNotice = strTemp.slice(i1,i2);
                GiftItem  = '<b>Mafia Wars Accept Gift:</b><table><tr><td>'+strNotice+'</td></tr></table>';
                LogPush(GiftItem);
                NextRequest(aParams[0],aParams[1]);
              } else if (i4!=-1) {
                i1 = strTemp.indexOf('>',i4)+1;
                i2 = strTemp.indexOf('<div style=', i1);
                strNotice = strTemp.slice(i1,i2);
                GiftItem  = '<b>Mafia Wars Accept Gift:</b><table><tr><td>'+strNotice+'</td></tr></table>';
                // test limit on super pignats
                if (strNotice.indexOf("You've reached your limit for Secret Drops today") !=-1) {
                  PSNFS_log('Start Delay for accepting Secret Stashes');
                  // Look again in 24 hours
                  MW_SecretDropDelay = getCurrentTime()+24*60;
                  GiftItem += '<br>Maxium number of Secret Drops have been accepted for today';
                }
                LogPush(GiftItem);
                NextRequest(aParams[0],aParams[1]);
              } else {
                i1 = strTemp.indexOf('<td class="message_body">');
                if (i1 == -1) throw {message:"Cannot find Message_Body in page"};
                i1 += 25;
                i2 = strTemp.indexOf('</td>',i1);
                strNotice = strTemp.slice(i1,i2);
                GiftItem  = '<b>Mafia Wars Accept Gift:</b><table><tr><td>'+strNotice+'</td></tr></table>';
                LogPush(GiftItem);
                NextRequest(aParams[0],aParams[1]);
              }
            }
          } catch(err) {
            PSNFS_log('Error: MW_AcceptGift DoStep 4 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep5(_myUrl, _myParms, _GiftItem, _formParams) {
      var iCurrentJob, iWatchDog;
      var i1, i2, myUrl, myParms;
      PSNFS_log('MW_AcceptGift doStep 5');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            // get form data array
            var param = doFBGiftForm(_responseDetails.responseText,v_app_id, v_post_form_id, v_fb_dtsg);
	    myUrl=document.location.protocol+'//apps.facebook.com/fbml/ajax/prompt_send.php?__a=1';
	    doStep6(myUrl,param[1],_GiftItem, param[0]);
          } catch(err) {
            PSNFS_log('Error: MW_AcceptGift DoStep 5 - '+err.message);
            LogPush(_GiftItem);
            NextRequest(aParams[0],aParams[1]);
          }
          }
      });
    }
    function doStep6(_myUrl, _myParms, _GiftItem, _actionURL) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptGift doStep 6');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
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

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            doStep7(_actionURL,'',_GiftItem);
          } catch(err) {
            LogPush(_GiftItem);
            PSNFS_log('Error: MW_AcceptGift DoStep 6 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    function doStep7(_myUrl, _myParms, _GiftItem) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptGift doStep 7');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
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

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp = _responseDetails.responseText;
            if (strTemp.indexOf('Sorry, you have run out of requests to send with this application. Please try again tomorrow')!=-1) {
              MW_SendThanksDelay = getCurrentTime()+12*60;
              PSNFS_log('MW_AcceptGift aborting Adding Thank you - Limit reached');
              LogPush(_GiftItem );
            } else {
              PSNFS_log('MW_AcceptGift Adding Thank you');
              LogPush(_GiftItem +'<br>Thank you gift Sent');
            }
            NextRequest(aParams[0],aParams[1]);
          } catch(err) {
            LogPush(_GiftItem);
            PSNFS_log('Error: MW_AcceptGift DoStep 7 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    try {
      PSNFS_log('MW_AcceptGift Gift Main');
      iErrorCount = 0;
      doStep1(strBase,Self.Parms);
    } catch(err) {
      PSNFS_log('Error: MW_AcceptGift main - '+err.message);
      NextRequest(aParams[0],aParams[1]);
    }
  }

function MW_Join() {
    function doStep1(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_Join doStep 1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-SVN-Rev': gvar.svn_rev
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl;
            var strTemp;
            var strDetails;
            var oDetails;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            strTemp = _responseDetails.responseText;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            i1 = strTemp.indexOf('{')
            oDetails = JSON.parse(strTemp.slice(i1));
            if (oDetails.payload.msg == null) {
              myUrl = "";
              for (var i=0;i<oDetails.onload.length;i++) {
                if (oDetails.onload[i].indexOf('goURI')!=-1) eval("myUrl = " + oDetails.onload[i].slice(6,-2))
              }
              if (myUrl == "") throw {message:"Cannot find goURI in page"};
              doStep2(myUrl,'');
            } else {
              // and error has occured while trying to process the request.
              PSNFS_log('Msg = '+oDetails.payload.msg);
              strDetails  = '<b>Mafia Wars Accept Gift:</b>'
              if (typeof(oDetails.payload.msg)=='object') {
                  strDetails += oDetails.payload.msg['__html'];
              } else {
                  strDetails += oDetails.payload.msg;
              }
              LogPush(strDetails);
              NextRequest(aParams[0],aParams[1]);
            }
          } catch(err) {
              PSNFS_log('Error: MW_Join DoStep 1 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      })
    }
    function doStep2(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptMission doStep 2');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'GET', 
        url: _myUrl,
        headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
	    var param = doFBParse(_responseDetails.responseText);
            if (param[0].length==0) throw('Cannot find goURI');
            doStep3(param[0],'');
          } catch(err) {
            PSNFS_log('Error: MW_AcceptMission DoStep 2 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep3(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_Join doStep 3');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'GET', 
        url: _myUrl,
        headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
          try {
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            var param = doFBParse(_responseDetails.responseText);
            doStep3a(param[0],param[1]);
          } catch(err) {
              PSNFS_log('Error: MW_Join DoStep 3 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep3a(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_Join doStep 3a');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
          method: 'POST',
          url: _myUrl,
          data: _myParms,
          headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, strTemp, myUrl, myParms;
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
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
              if (myParms!='') myParms += '&';
                i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
                myParms += strTemp.slice(i1,i2)+'=';
                i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
                myParms += escape(strTemp.slice(i1,i2));
                i1 = strTemp.indexOf('<input',i1);
            }
            doStep4(myUrl,myParms);
          } catch(err) {
            PSNFS_log('Error: MW_Join DoStep 3a - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      })
    }

    function doStep4(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_Join doStep 4');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, i3, i4, myUrl, myParms;
            var strTemp;
            var strNotice;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp = _responseDetails.responseText;
            i1 = strTemp.indexOf('<ul class="incoming_requests clearfix">');
            if (i1 == -1) {
              LogPush('<b>MW Join</b><br>Could not find user.  Possibly already joined');
              throw {message:'Cannot find <ul class="incoming_requests clearfix"> in page'};
            }
            i2 = strTemp.indexOf('</ul>',i1);
            strTemp = strTemp.slice(i1,i2);
            i1 = 0;
            do {
              i1 = strTemp.indexOf('<li>',i1);
              if (i1!=-1) {
                strNotice = '<b>Mafia Wars Join:</b><table><tr><td>';
                i1 = i1+1;
                // get user's picture
                i3 = strTemp.indexOf('<span ',i1);
                i4 = strTemp.indexOf('[<a href',i3);
                strNotice += strTemp.slice(i3,i4) + '</td></tr></table>';
                i3 = strTemp.indexOf('<a href="',i1);
                i4 = strTemp.indexOf('" onclick=',i3);
                myUrl       = strTemp.slice(i3+9,i4)+'&xw_client_id=8';
                myParms     = 'ajax=1&liteload=1&sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig;
                if (myUrl.indexOf(Join_id) != -1) {
                  PSNFS_log('Found Member to add to mafia');
                  doStep5(myUrl,myParms,strNotice);
                  // stop the loop
                  break;
                }
              } else {
                PSNFS_log('MW_Join Could not find user to Join');
                LogPush('<b>MW Join</b><br>Could not find user.  Possibly already joined');
                NextRequest(aParams[0],aParams[1]);
              }
            } while (i1 != -1);
          } catch(err) {
            PSNFS_log('Error: MW_Join DoStep 4 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      })
    }

    function doStep5(_myUrl, _myParms, _strDetails) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_Join doStep 5');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': '*/*',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl, myParms;
            var strTemp;
            var strDetails;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp     = _responseDetails.responseText;
            i1          = strTemp.indexOf('<td class="message_body">');
            if (i1 == -1) throw {message:"Cannot find Message_Body in page"};
            i2          = strTemp.indexOf('</td>',i1);
            strDetails  = _strDetails + strTemp.slice(i1+25,i2);
            LogPush(strDetails);
            PSNFS_log('MW Join sucessfull');
            NextRequest(aParams[0],aParams[1]);
          } catch(err) {
              PSNFS_log('Error: MW_Join DoStep 5 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    try {
      PSNFS_log('Send MW Join');
      var Join_id;
      var i1,i2;
      i1 = Self.Parms.indexOf('[from_id]=')+10;
      i2 = Self.Parms.indexOf('&',i1);
      Join_id = Self.Parms.slice(i1,i2);
      iErrorCount = 0;
      PSNFS_log('Action FB request');
      doStep1(strBase,Self.Parms);
    } catch(err) {
      PSNFS_log('Error: Request Join MW Main');
      NextRequest(aParams[0],aParams[1]);
    }
  }
  
  function MW_AcceptEnergy() {
    function doStep1(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptEnergy doStep 1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-SVN-Rev': gvar.svn_rev
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl;
            var strTemp;
            var strDetails;
            var oDetails;
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            strTemp = _responseDetails.responseText;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            i1 = strTemp.indexOf('{');
            oDetails = JSON.parse(strTemp.slice(i1));
            if (oDetails.payload.msg == null) {
              myUrl = "";
              for (var i=0;i<oDetails.onload.length;i++) {
                  if (oDetails.onload[i].indexOf('goURI')!=-1) eval("myUrl = " + oDetails.onload[i].slice(6,-2))
              }
              if (myUrl == "") throw {message:"Cannot find goURI in page"};
              doStep2(myUrl,'');
            } else {
              // and error has occured while trying to process the request.
              PSNFS_log('Msg = '+oDetails.payload.msg);
              strDetails  = '<b>Mafia Wars Accept Gift:</b>';
              if (typeof(oDetails.payload.msg)=='object') {
                  strDetails += oDetails.payload.msg['__html'];
              } else {
                  strDetails += oDetails.payload.msg;
              }
              LogPush(strDetails);
              NextRequest(aParams[0],aParams[1]);
            }
          } catch(err) {
              PSNFS_log('Error: MW_AcceptEnergy DoStep 1 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep2(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptEnergy doStep 2');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
          method: 'GET',
          url: _myUrl,
          headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
          try {
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            var param = doFBParse(_responseDetails.responseText);
            doStep2b(param[0],param[1]);
          } catch(err) {
            PSNFS_log('Error: MW_AcceptEnergy DoStep 2 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    function doStep2b(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptEnergy DoStep 2b');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};

      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[2],aParams[3]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl, myParms;
            var strTemp, strTemp_all;
            var strDetails;

            clearTimeout(iWatchDog);
            iErrorCount = 0;
            
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            myUrl = doMWRedirParse(_responseDetails.responseText);
            doStep3(myUrl,'');
          } catch(err) {
              PSNFS_log('MW_AcceptEnergy DoStep 2b - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep3(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptEnergy doStep 3');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
          method: 'GET',
          url: _myUrl,
          headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5'
        },
        onload: function(_responseDetails) {
          try {
            clearTimeout(iWatchDog);
            iErrorCount = 0;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            var param = doFBParse(_responseDetails.responseText);
            doStep3a(param[0], param[1]);
          } catch(err) {
            PSNFS_log('Error: MW_AcceptEnergy DoStep 3 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep3a(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptEnergy doStep 3a');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, strTemp, myUrl, myParms;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
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
              if (myParms!='') myParms += '&';
              i1 = strTemp.indexOf('name="',i1)+6; i2 = strTemp.indexOf('"',i1);
              myParms += strTemp.slice(i1,i2)+'=';
              i1 = strTemp.indexOf('value="',i1)+7; i2 = strTemp.indexOf('"',i1);
              myParms += escape(strTemp.slice(i1,i2));
              i1 = strTemp.indexOf('<input',i1);
            }
            doStep4(myUrl,myParms);
          } catch(err) {
            PSNFS_log('Error: MW_AcceptEnergy DoStep 3a - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep4(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptEnergy doStep 4');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
         method: 'POST',
         url: _myUrl,
         data: _myParms,
         headers: {
           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
           'Accept-Language': 'en-us,en;q=0.5',
           'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, i3, i4, myUrl, myParms;
            var strTemp;
            var strNotice;
            var GiftItem;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp = _responseDetails.responseText;
            // Check for energy popup.
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
              i1 = strTemp.indexOf('<a',i1);
              i2 = strTemp.indexOf('<fb:profile-pic',i1);
              strNotice += '<div style="float: left; text-align: center; width: 200px;">';
              strNotice += strTemp.slice(i1,i2);
              strNotice += '<img src="http://static.ak.connect.facebook.com/pics/t_silhouette.jpg">';
              i1 = strTemp.indexOf('</a>',i2);
              i2 = strTemp.indexOf('</div>',i1);
              strNotice += strTemp.slice(i1,i2);
              strNotice += '</div></td></tr>';
              GiftItem   = '<b>Mafia Wars Accept Energy:</b><table><tr><td>'+strNotice+'</td></tr></table>';
              // look for button to send energy back
              i1 = strTemp.indexOf('<fb:request-form style=');
              if ( (i1==-1) || (MW_SendThanksDelay > getCurrentTime())) {
                LogPush(GiftItem);
                NextRequest(aParams[0],aParams[1]);
              } else {
                myUrl    =  document.location.protocol+'//www.connect.facebook.com/widgets/serverfbml.php';
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
               GiftItem    = '<b>Mafia Wars Accept Energy:</b><table><tr><td>'+strNotice+'</td></tr></table>';
               LogPush(GiftItem);
               NextRequest(aParams[0],aParams[1]);
            } else if (i4!=-1) {
               i1 = strTemp.indexOf('>',i4)+1;
               i2 = strTemp.indexOf('<div style=', i1);
               strNotice = strTemp.slice(i1,i2);
               GiftItem    = '<b>Mafia Wars Accept Energy:</b><table><tr><td>'+strNotice+'</td></tr></table>';
               LogPush(GiftItem);
               NextRequest(aParams[0],aParams[1]);
            } else {
              i1 = strTemp.indexOf('<td class="message_body">');
              if (i1 == -1) throw {message:"Cannot find Message_Body in page"};
              i1 += 25;
              i2 = strTemp.indexOf('</td>',i1);
              strNotice = strTemp.slice(i1,i2);
              GiftItem    = '<b>Mafia Wars Accept Energy:</b><table><tr><td>'+strNotice+'</td></tr></table>';
              LogPush(GiftItem);
              NextRequest(aParams[0],aParams[1]);
            }
          } catch(err) {
              PSNFS_log('Error: MW_AcceptEnergy DoStep 4 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep5(_myUrl, _myParms, _GiftItem) {
      var iCurrentJob, iWatchDog;
      var i1, i2;
      PSNFS_log('MW_AcceptEnergy doStep 5');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
          method: 'POST',
          url: _myUrl,
          data: _myParms,
          headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl, myParms;
            var strTemp, strTemp2;
            var aTemp;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            strTemp = _responseDetails.responseText;
            // get form data array
            i1 =  strTemp.indexOf('PlatformInvite.sendInvitation');
            if (i1 == -1) throw {message:"Cannot find PlatformInvite.sendInvitation in page"};
            i1 = strTemp.indexOf('&quot;request_form',i1);
            i2 = strTemp.indexOf('});');
            strTemp2 = '{'+strTemp.slice(i1,i2)+'}';
            strTemp2 = strTemp2.replace(/&quot;/g,'"');
            aTemp = JSON.parse(strTemp2);
            // start URL
            myUrl       = document.location.protocol+'//www.connect.facebook.com/fbml/ajax/prompt_send.php?__a=1';
            myParms     = 'app_id='+aTemp["app_id"];
            myParms    += '&to_ids[0]='+aTemp["prefill"];
            myParms    += '&request_type='+escape(aTemp["request_type"]);
            myParms    += '&invite='+aTemp["invite"];
            i1          = strTemp.indexOf(' action="');
            i1          = strTemp.indexOf('content="',i1);
            if (i1 == -1) {PSNFS_log(strTemp);throw {message:"Cannot find content=\\ in page"};}
            i1         += 9;
            i2          = strTemp.indexOf('"',i1)-1;
            strTemp2    = eval('"'+strTemp.slice(i1,i2)+'"');
            myParms    += '&content='+encodeURIComponent(strTemp2);
            myParms    += '&preview=false';
            myParms    += '&is_multi='+aTemp["is_multi"];
            myParms    += '&is_in_canvas='+aTemp["is_in_canvas"];
            myParms    += '&form_id='+aTemp["request_form"];
            myParms    += '&include_ci='+aTemp["include_ci"];
            myParms    += '&prefill=true&message=&donot_send=false&__d=1';
            i1          = strTemp.indexOf('name="post_form_id" value="');
            if (i1 == -1) throw {message:'Cannot find name="post_form_id" value=" in page'};
            i1         += 27;
            i2          = strTemp.indexOf('"',i1);
            myParms    += '&post_form_id='+strTemp.slice(i1,i2);
            i1          = strTemp.indexOf('fb_dtsg:"',i1);
            if (i1 == -1) throw {message:'Cannot find fb_dtsg:" in page'};
            i1         += 9;
            i2          = strTemp.indexOf('"',i1);
            myParms    += '&fb_dtsg='+strTemp.slice(i1,i2);
            myParms    += '&post_form_id_source=AsyncRequest';
            doStep6(myUrl,myParms,_GiftItem);
          } catch(err) {
            PSNFS_log('Error: MW_AcceptEnergy DoStep 5 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep6(_myUrl, _myParms, _GiftItem) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('MW_AcceptEnergy doStep 6');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
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

              clearTimeout(iWatchDog);
              iErrorCount = 0;

              if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
              strTemp = _responseDetails.responseText;
              PSNFS_log(strTemp);
              if (strTemp.indexOf('Sorry, you have run out of requests to send with this application')!=-1) {
                MW_SendThanksDelay = getCurrentTime()+12*60;
                PSNFS_log('MW_AcceptEnergy aborting Adding Thank you - Limit reached');
                LogPush(_GiftItem );
              } else {
                PSNFS_log('MW_AcceptEnergy Adding Thank you');
                LogPush(_GiftItem +'<br>Thank you Energy Pack Sent');
              }
              NextRequest(aParams[0],aParams[1]);
          } catch(err) {
            LogPush(_GiftItem);
            PSNFS_log('Error: MW_AcceptEnergy DoStep 6 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    try {
      PSNFS_log('Accept MW Energy');
      iErrorCount = 0;
      PSNFS_log('Action FB request');
      doStep1(strBase,Self.Parms);
    } catch(err) {
      PSNFS_log('Error: Request Accept MW Energy main - '+err.message);
      NextRequest(aParams[0],aParams[1]);
    }
  }


  // FaceBook Code
  function FB_accept_friend() {
    function doStep1(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('RequestItem FB_accept_friend Add Step 1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
         method: 'POST',
         url: _myUrl,
         data: _myParms,
         headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-SVN-Rev': gvar.svn_rev
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl, myParms;
            var strTemp;
            var strDetails;
            var oDetails;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            strTemp = _responseDetails.responseText;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            i1 = strTemp.indexOf('{');
            oDetails = JSON.parse(strTemp.slice(i1));
            strDetails  = '<b>Facebook Friend Invitation:</b><br>';
            if (typeof(oDetails.payload.msg)=='object') {
              strTemp = oDetails.payload.msg['__html'];
            } else {
              strTemp = oDetails.payload.msg;
            }
            strDetails += strTemp;
            LogPush(strDetails);
            myUrl = document.location.protocol + "//www.facebook.com/friends/ajax/lists.php?__a=1";
            // Code to move friend into selected group
            if (Self.Gifttype == 'friend_connect') {
              if (aParams[1001]!=0) {
                PSNFS_log('aParams[1001] = '+aParams[1001]);
                i1    = strTemp.indexOf('id=')+3;
                i2    = strTemp.indexOf('"',i1);
                myParms    =  "flid="+aParams[1001];
                myParms   +=  "&id="+ strTemp.slice(i1,i2);
                myParms   +=  "&quick=true&add=1&post_form_id="+Post_form_id;
                myParms   +=  "&fb_dtsg="+FB_dtsg;
                myParms   +=  "&lsd&post_form_id_source=AsyncRequest";
                doStep2(myUrl,myParms);
              } else {
                NextRequest(aParams[0],aParams[1]);
              }
            } else {
              if (aParams[1003]!=0) {
                PSNFS_log('aParams[1003] = '+aParams[1003]);
                i1    = strTemp.indexOf('id=')+3;
                i2    = strTemp.indexOf('"',i1);
                myParms    =  "flid="+aParams[1001];
                myParms   +=  "&id="+ strTemp.slice(i1,i2);
                myParms   +=  "&quick=true&add=1&post_form_id="+Post_form_id;
                myParms   +=  "&fb_dtsg="+FB_dtsg;
                myParms   +=  "&lsd&post_form_id_source=AsyncRequest";
                doStep2(myUrl,myParms);
              } else {
                 NextRequest(aParams[0],aParams[1]);
              }
            }
            // NextRequest(aParams[0],aParams[1]);
          } catch(err) {
              PSNFS_log('RequestItem FB_accept_friend Error: Request FB Ignore DoStep 1 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }

    function doStep2(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('RequestItem FB_accept_friend Step 2');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
         method: 'POST',
         url: _myUrl,
         data: _myParms,
         headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-SVN-Rev': gvar.svn_rev
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl;
            var strTemp;
            var strDetails;
            var oDetails;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            strTemp = _responseDetails.responseText;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            NextRequest(aParams[0],aParams[1]);
          } catch(err) {
              PSNFS_log('RequestItem FB_accept_friend Error: Request FB Ignore DoStep 2 - '+err.message);
              NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    try {
      PSNFS_log('FB Accept Friend');
      iErrorCount = 0;
      doStep1(strBase,Self.Parms+'&post_form_id_source=AsyncRequest');
    } catch(err) {
      PSNFS_log('Error: FB Accept Friend Main - '+err.message);
      NextRequest(aParams[0],aParams[1]);
    }
  }

  function FB_ignore(){
    function doStep1(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('RequestItem FB Ignore Step 1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
        method: 'POST',
        url: _myUrl,
        data: _myParms,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-SVN-Rev': gvar.svn_rev
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl;
            var strTemp;
            var strDetails;
            var oDetails;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            strTemp = _responseDetails.responseText;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            i1 = strTemp.indexOf('{');
            oDetails = JSON.parse(strTemp.slice(i1));
            strDetails  = '<b>Application Request Ignore:</b><br>';
            if (typeof(oDetails.payload.msg)=='object') {
              strDetails += oDetails.payload.msg['__html'];
            } else {
              strDetails += oDetails.payload.msg;
            }
            LogPush(strDetails);
            NextRequest(aParams[0],aParams[1]);
          } catch(err) {
            PSNFS_log('RequestItem Error: Request Application Request Ignore DoStep 1 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    try {
      PSNFS_log('Application Request-Ignore Request');
      iErrorCount = 0;
      doStep1(strBase,strReject+Self.Parms+'&post_form_id_source=AsyncRequest');
    } catch(err) {
      PSNFS_log('Error: Application Request-Ignore Request Main - '+err.message);
      NextRequest(aParams[0],aParams[1]);
    }
  }

  function FB_removeEvent() {
    function doStep1(_myUrl, _myParms) {
      var iCurrentJob, iWatchDog;
      PSNFS_log('RequestItem FB_removeEvent Step 1');
      if (_myUrl == null || _myUrl == '') throw {message:"Url Not Passed in"};
      // start the WatchDog Timer to catch hung requests. 15 seconds.
      iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); NextRequest(aParams[0],aParams[1]); }, 15000);
      iCurrentJob = GM_xmlhttpRequest({
         method: 'POST',
         url: _myUrl,
         data: _myParms,
         headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-SVN-Rev': gvar.svn_rev
        },
        onload: function(_responseDetails) {
          try {
            var i1, i2, myUrl;
            var strTemp;
            var strDetails;
            var oDetails;

            clearTimeout(iWatchDog);
            iErrorCount = 0;

            strTemp = _responseDetails.responseText;
            if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
            i1 = strTemp.indexOf('{');
            oDetails = JSON.parse(strTemp.slice(i1));
            PSNFS_log('Msg = '+oDetails.payload.msg);

            strDetails  = '<b>Application Request Ignore:</b><br>';
            if (typeof(oDetails.payload.msg)=='object') {
              strDetails += oDetails.payload.msg['__html'];
            } else {
              strDetails += oDetails.payload.msg;
            }
            LogPush(strDetails);
            NextRequest(aParams[0],aParams[1]);
          } catch(err) {
            PSNFS_log('RequestItem FB_removeEvent Error: Request FB Remove Event DoStep 1 - '+err.message);
            NextRequest(aParams[0],aParams[1]);
          }
        }
      });
    }
    try {
      PSNFS_log('FB Remove Event');
      iErrorCount = 0;
      doStep1(strBase,Self.Parms+'&post_form_id_source=AsyncRequest');
    } catch(err) {
      PSNFS_log('Error: FB Remove Event Main - '+err.message);
      NextRequest(aParams[0],aParams[1]);
    }
  }

  // Main Code
  var iHoldEvent;
  var Self;
  var i1, i2, i3, i4;
  var strTemp;
  var aCat;
  var xmlhttp;
  var myURL;
  var iErrorCount;
  /* Form vars scoped to this request */
  var v_fb_dtsg;
  var v_post_form_id;
  var v_post_req_form;
  var v_app_id;
  
  Self = this;
  iHoldEvent = iRequestCurrent;
  // stop processing if autorun turned off
  if (bAutoRun) {
  //alert(Self.Gifttype);
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

    aCat    = Self.Gifttype.split('_');
    switch (aCat[0]) {
      case 'friend':
        switch (aCat[1]) {
          case 'suggestion':
            PSNFS_log('Found Friend Suggestion');
            FB_accept_friend();
            break;
          case 'connect':
            PSNFS_log('Found Friend Connect');
            FB_accept_friend();
            break;
        }
        break;
      case 'event':
        FB_removeEvent();
        break;
      case 'fbpage':
        FB_ignore();
        break;
      case 'group':
        FB_ignore();
        break;
      case 'app':
        switch (aCat[1]) {
          case '10979261223':
            // Mafiawars
            if (xw_sig_valid == false) {
              LogPush('Skipping Mafia Wars item.  Mafia wars does not appear to be working.');
              NextRequest(aParams[0],aParams[1]);
            } else if (Self.Action.indexOf('accept_energy_req') != -1) {
              // Energy
              PSNFS_log('MW Energy');
              MW_AcceptEnergy();
            } else if ((Self.Action.indexOf('accept_')!=-1)||(Self.Action.indexOf('secret_stash_help')!=-1)) {
              PSNFS_log('MW Accept Gift');
              // Super Pignata Test
              if (MW_FreeGiftsDelay>getCurrentTime()) {
                PSNFS_log('skip accept free gifts.  limit reached');
                NextRequest(10,10);
              } else if (Self.Action.indexOf('Secret%2BDrop') != -1) {
                if (getCurrentTime()> MW_SecretDropDelay || aParams[2025]!=2) {
                  PSNFS_log('Accept Secret Drop');
                  MW_AcceptGift();
                } else {
                  PSNFS_log('Skip Secret Drop');
                  NextRequest(aParams[0],aParams[1]);
                }
              } else {
                MW_AcceptGift();
              }
            } else if (Self.Action.indexOf('socialmission') != -1) {
              PSNFS_log('MW Accept Mission Respect');
              MW_AcceptMission();
            } else if (Self.Action.indexOf('recruit') != -1) {
              PSNFS_log('MW Join');
              MW_Join();
            }
            break;
          default:
            PSNFS_log('Ignoring Other Application Request(s)');
            if (aParams[4000]==1) {
              FB_ignore();
            } else {
              LogPush('Skipping Other Application Request(s)');
              NextRequest(1,aParams[1]);
            }
            break;
        }
        break;
      }
    } else {
      PSNFS_log('Some one turn the switch off');
    }
  }
}
/**** End News Feed Notification code ****/

function StartProcessing() {
  LogPush('<span style="color:green"><b>Starting Application Request processing</b></span>');
  bAutoRun = true;
  iRequestNum = 0;
  oNewsFeedList.Erase();
  oRequestList.Erase();

  if (aParams[1] == null) aParams[1] = 0;
  if (aParams[3] == null) aParams[3] = 0;
  if (aParams[6] == null) aParams[6] = 0;
  if (aParams[7] == null) aParams[7] = 1;
  if (aParams[8] == null) aParams[8] = 1;
  if (aParams[9] == null) aParams[9] = 1;

  if( aParams[1] > 0) {
    EventSpan.dispatchEvent(ActionRequest);
  } else {
    LogPush('Application Request Processing is Disabled');
  }
  if( aParams[3] > 0) {
    EventSpan.dispatchEvent(ActionNewsFeed);
  } else {
    LogPush('News Feed Processing is Disabled');
  }
}

function StopProcessing() {
  bAutoRun = false;
  clearTimeout(iRequestCurrent);
  clearTimeout(iNewsFeedCurrent);

  LogPush('<span style="color:red"><b>Stopping Application Request Processing</b></span>');
}

/*** Start section to read in items from MW and FV  ****/
// Read News Feed Posting
function ReadNewsFeed() {
  var myUrl;
  var iHoldEvent, iWatchDog, iCurrentJob;
  var iNewNow;
  var maxstories, app_ids;
  var bNewsFeedTest;
  iHoldEvent = iNewsFeedCurrent;
  // stop processing if autorun turned off
  if (!psnfs.access_token){
    LogPush('<b>API Access code not retrieved yet</b>');
    psnfs.request_access_code();
    if (bAutoRun) {
      iNewsFeedCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionNewsFeed);}, getRandRange(aParams[3]*750,aParams[3]*1250));
      if (iNewsFeedCurrent < iHoldEvent) {
        clearTimeout(iNewsFeedCurrent);
      }
    }
    return;
  }
  if (bAutoRun && (aParams[7]==1||aParams[8]==1)) {
    oNewsFeedList.Erase();
   if (psnfs.created_time == 0) {
    myUrl = "https://graph.facebook.com/me/home?date_format=U&access_token="+psnfs.access_token;  
   } else {
    myUrl = "https://graph.facebook.com/me/home?date_format=U&since="+psnfs.created_time+"&access_token="+psnfs.access_token;
  }
   
  
/*
    Note: It will work for the following Apps (apps_ids= )
    10979261223  -> Mafia Wars
    102452128776 -> FarmVille
*/
    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
    iWatchDog = setTimeout(function (e) {
        iCurrentJob.abort();
        PSNFS_log('WatchDog timer killing ReadNewsFeed job. Checking again in '+aParams[3]+' seconds.');
        if (typeof( gvar.svn_rev ) == 'undefined') {
          LogPush('<b>News Feed Read Error. Please Report Env.svn_rev = '+gvar.svn_rev+' </b>');
        }
        iNewsFeedCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionNewsFeed);},getRandRange(aParams[3]*750,aParams[3]*1250));
        if (iNewsFeedCurrent < iHoldEvent) clearTimeout(iNewsFeedCurrent);
    }, 15000);
    // check for News Feed notifications
    iCurrentJob = GM_xmlhttpRequest({
      method: 'GET',
      url: myUrl,
      headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-us,en;q=0.5',
          'X-SVN-Rev': gvar.svn_rev
      },
      onload: function(_responseDetails) {
        try {
          var i1, i2, iNumStories, iNewsFeedNum;
          var strTemp, strHTML;
          var oDom, oDiv, oSnap;
          var oButton, oActorName, oAttachmentTitle;
          var oUl, oLi;
          var oDetail;
          var link_data;
          var myImg;
          var bSkipItem;
          var ZyngaRe = /(http:\/\/(?:zynga.tm)[^\/]*\/[^\s]+)/g;
          var now   = new Date();
          var hour  = now.getHours()+now.getTimezoneOffset()/60;
          if (hour >= 24) hour -= 24;
          // clear watch dog timer
          clearTimeout(iWatchDog);
            var newsfeeddata = JSON.parse(_responseDetails.responseText);
            if (newsfeeddata.error && newsfeeddata.error.type == 'OAuthException'){
                // Auth Exception lets get a new one..
                psnfs.access_token = '';
                psnfs.request_access_code();
                if (bAutoRun) {
                  iNewsFeedCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionNewsFeed);}, getRandRange(aParams[3]*750,aParams[3]*1250));
                  if (iNewsFeedCurrent < iHoldEvent) {
                    clearTimeout(iNewsFeedCurrent);
                  }
                }
                return;
            }
            if (!newsfeeddata.data){
                PSNFS_log("No News Feed data found yet" + _responseDetails.responseText);
                if (bAutoRun) {
                  iNewsFeedCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionNewsFeed);}, getRandRange(aParams[3]*750,aParams[3]*1250));
                  if (iNewsFeedCurrent < iHoldEvent) {
                    clearTimeout(iNewsFeedCurrent);
                  }
                }
                return;
            }
            iNewsFeedNum = 0;
            PSNFS_log("Checking: " +newsfeeddata.data.length+ " posts");
			var starttime = psnfs.created_time;
            for (var i=0; i < newsfeeddata.data.length; i++){
                // Skip non application posts..
                bNewsFeedTest = false;
                // So we don't view duplicate posts..
                if (newsfeeddata.data[i].created_time > psnfs.created_time){
                    psnfs.created_time = newsfeeddata.data[i].created_time;
                }
                if (!newsfeeddata.data[i].application ){
                    continue;
                }
                if (!ZyngaRe.test(newsfeeddata.data[i].message)&&!(newsfeeddata.data[i].application.id == 10979261223)){
                    // We should skip this item..
                    PSNFS_log("Skipping News Feed item from "+ newsfeeddata.data[i].application.name + ". App ID:" +newsfeeddata.data[i].application.id );
                    continue;
                } else if (ZyngaRe.test(newsfeeddata.data[i].message)){
                    if(!aParams[2020]==true){
                        // Skip these..
                        continue;
                    }
                    
                    // Zynga Daily Rewards..
                    var link = '';
                    var longlink = '';
                    var linkname = '';
                    var wd_name = newsfeeddata.data[i].from.name;
                    var wd_id = newsfeeddata.data[i].from.id;
                    while ( (link_info=ZyngaRe.exec(newsfeeddata.data[i].message)) ) {
                        link = link_info[1];// lets keep the last zyn.ga link, haven't seen more than 1 in a message
                    }
                    if (link != ''){
                        LogPush("Trying to open Link: " + link);
                        var tmpUrl = 'http://api.longurl.org/v2/expand?url='+link+'&format=json';
                        var TinyJob;
                        var TinyWatchDog = setTimeout(function (e) {
                            TinyJob.abort();
                            PSNFS_log('WatchDog timer killing unshorten job.');
                        }, 15000);
                        TinyJob = GM_xmlhttpRequest({
                            method: "GET",
                            url: tmpUrl,
                            synchronous: true, // Don't continue on until this is done..
                            onload: function(response) {
                                try {
                                    clearTimeout(TinyWatchDog);
                                    var urldata = JSON.parse(response.responseText);
                                    if (urldata['long-url']){
                                        urldata['long-url'] = eval("'"+urldata['long-url']+"'");
                                        if (urldata['long-url'].indexOf('apps.facebook.com/inthemafia/track.php')!=-1 && NewsFeedData[10979261223]['MW_FanBlast']['testURL'].test(urldata['long-url'])){
                                            for (j=0; j < aNewsFeedNotificationId.length; j++) {
                                              if (urldata['long-url'] == aNewsFeedNotificationId[j]) {
                                                bNewsFeedTest = true;
                                                break;
                                              }
                                            }
                                            if (bNewsFeedTest){
                                                //continue;
                                            } else {
                                                longlink = urldata['long-url']; // Set the link..
                                                PSNFS_log("Received longurl: " + urldata['long-url']);
                                                LogPush("Received longurl: " + urldata['long-url']);
                                                oNewsFeed = new NewsFeedItem();
                                                oNewsFeed.Type            = 'MW_FanBlast';
                                                oNewsFeed.Action          = longlink;
                                                oNewsFeed.BName           = 'Mafia Wars Fan Blast';
                                                oNewsFeed.ActorName       = '<a target="_blank" href="http://www.facebook.com/profile.php?id='+wd_id+'">' + wd_name + '</a>';
                                                oNewsFeed.AttachmentTitle = '<a target="_blank" href="'+longlink+'">Fan Blast Link</a>';
                                                oNewsFeed.AppId           = 10979261223;
                                                oNewsFeed.srcImg          = ''; 
                                                oNewsFeed.text            = 'Fan Blast';
                                                aNewsFeedNotificationId.unshift(longlink);
                                                if (aNewsFeedNotificationId.length>300) aNewsFeedNotificationId.length = 300;
                                                oNewsFeedList.Append(oNewsFeed);
                                                iNewsFeedNum = iNewsFeedNum+1;

                                            }
                                        } else {
                                            LogPush("Received non mafiawars url: " + response.responseText);
                                        }
                                    } else {
                                        LogPush("Received non mafiawars url: " + response.responseText);
                                    }
                                } catch(err) {
                                    LogPush("Error Parsing UnShorten Result: "+err.message);
                                }
                            }, 
                            onerror: function(response) {
                                 LogPush("Error Retrieving UnShorten URL");
                            }
                        });                        
                        
                        
                    } else {
                        LogPush("No FanBlast Urls Found,  2..");
                    }
                    continue;    
                }
                for (j=0; j < aNewsFeedNotificationId.length; j++) {
                  if (newsfeeddata.data[i].link == aNewsFeedNotificationId[j]) {
                    bNewsFeedTest = true;
                    break;
                  }
                }
                if (bNewsFeedTest){
                    continue;
                }
                oNewsFeed = new NewsFeedItem();
              for (var name in NewsFeedData[newsfeeddata.data[i].application.id]) {
                if( (NewsFeedData[newsfeeddata.data[i].application.id][name]['testURL'].test(newsfeeddata.data[i].link)) ){
                    oNewsFeed.Type            = name;
                    oNewsFeed.Action          = newsfeeddata.data[i].link;
                    oNewsFeed.BName           = newsfeeddata.data[i].actions[2].name;
                    oNewsFeed.ActorName       = '<a target="_blank" href="http://www.facebook.com/profile.php?id='+newsfeeddata.data[i].from.id+'">' + newsfeeddata.data[i].from.name + '</a>';
                    oNewsFeed.AttachmentTitle = '<a target="_blank" href="'+newsfeeddata.data[i].link+'">'+ newsfeeddata.data[i].name + '</a>';
                    oNewsFeed.AppId           = parseInt(newsfeeddata.data[i].application.id);
                    oNewsFeed.srcImg          = (newsfeeddata.data[i].picture===null?'':newsfeeddata.data[i].picture); ; 
                    oNewsFeed.text            = (newsfeeddata.data[i].description===null?'':newsfeeddata.data[i].description); 
                    oNewsFeed.NextController  = newsfeeddata.data[i].link.match(/next_controller=(.*?)&/)[1];
                    oNewsFeed.NextAction      = newsfeeddata.data[i].link.match(/next_action=(.*?)&/)[1];
                    if (oNewsFeed.NextController == 'job' && oNewsFeed.NextAction == 'give_help'){
                      var tmp = newsfeeddata.data[i].link.match(/cityId=(.*?)&/)[1];
                      if (tmp){oNewsFeed.NextAction = oNewsFeed.NextAction + '_' + tmp;}
                    }
                    if (oNewsFeed.NextController == 'ClanProperty' && oNewsFeed.NextAction == 'getPartsFromFeed'){
                      var tmp = newsfeeddata.data[i].link.match(/item_id%22%3A%22(\d+)%22/)[1];
                      if (tmp){oNewsFeed.NextAction = oNewsFeed.NextAction + '_' + tmp;}
                    }

                    bSkipItem = true; // Reset it for this loop
                    //if (bNewsFeedTest) {
                    if (1==2){
                      bSkipItem = true;
                    } else {
                     // Not sure why its empty above?
                     if (!oNewsFeed.text){
                        oNewsFeed.text = '';
                     }
                    switch (oNewsFeed.AppId) {
                      case 10979261223:
                        // Mafia Wars
                        if (xw_sig_valid == false) {
                          PSNFS_log('Ignoring MW News Feed notice. Mafia Wars does not appear to be working.');
                          LogPush('Ignoring MW News Feed Notice. Mafia Wars does not appear to be working.');
                        } else if(oNewsFeed.Action.indexOf(local_xw_user_id.slice(2))!=-1) {
                          PSNFS_log('Ignoring MW News Feed notice. Cannot process own feeds.');
                        } else {
                          // Ignore some types of jobs based on settings
                          if( oNewsFeed.NextController+"-"+oNewsFeed.NextAction in delayList  && getCurrentTime() <  delayList[oNewsFeed.NextController+"-"+oNewsFeed.NextAction] ) {
                            break; // We are supposed to skip this..
                          }
                          switch (oNewsFeed.Type) {
                            case 'Ignore':
                              bSkipItem = true;
                              break;
                            case 'MW_VegasSlots':
                              if (aParams[2015]==true) { bSkipItem = false; } //else LogPush('MW: Skipping Need Help notice');
                              break;
                            case 'MW_LevelUp':
                              if (aParams[2019]==true) { bSkipItem = false; } //else LogPush('MW: Skipping Need Help notice');
                              break;
                            case 'MW_LimitedProps':
                              if (aParams[2009]==true) { bSkipItem = false; } //else LogPush('MW: Skipping Need Help notice');
                              break;
                            case 'MW_DailyTakeListV3':
                              if (aParams[2018]==true) { bSkipItem = false; } //else LogPush('MW: Skipping Need Help notice');
                              break;
                            case 'MW_JobHelp':
                              if (aParams[2004]==true) { bSkipItem = false; } //else LogPush('MW: Skipping Need Help notice');
                              break;
                            case 'MW_FriendofFriend':
                              if (aParams[2005]==true) { bSkipItem = false; } //else LogPush('MW: Skipping Help Friend of Friend notice');
                              break;
                            case 'MW_NextTarget':
                              if (aParams[2006]==true) { bSkipItem = false; } //else LogPush('MW: Skipping Next Target notice');
                              break;
                            case 'MW_Bounty':
                              if (aParams[2007]==true) { bSkipItem = false; } //else LogPush('MW: Skipping Bounty notice');
                              break;
                            case 'MW_SupplyParts':
                              if (aParams[2010]==true) { bSkipItem = false; } //else LogPush('MW: Skipping Supply Parts notice');
                              break;
                            case 'MW_WarHelp':
                              if (aParams[2011]==true) { bSkipItem = false; } //else LogPush('MW: Skipping War Help Notice');
                              break;
                            case 'MW_BossBonus':
                              if (aParams[2013]==true) { bSkipItem = false; } //else LogPush('MW: Skipping Boss Bonus');
                              break;
                            case 'MW_IcedBonus':
                              if (aParams[2008]==true) {
                                if (getCurrentTime()>MW_IcedBonusDelay) {
                                  bSkipItem = false //else LogPush('MW: Skipping Bonus/Reward/Stash/Burner notice');
                                } else {
                                //LogPush('MW Iced Bonus skipped: Daily limit reached');
                                }
                              }
                              break;
                            case 'MW_FreeGift':
                            case 'MW_Bonus':
                              if (aParams[2008]==true) { bSkipItem = false; } //else LogPush('MW: Skipping Bonus/Reward/Stash/Burner notice');
                              break;
                            case 'MW_Secret_Reward':
                              if (aParams[2008]==true) {
                                i1 = oNewsFeed.Action.indexOf('feed_target=')+12;
                                i2 = oNewsFeed.Action.indexOf('&ref=nf',i1);
                                if (oNewsFeed.Action.slice(i1,i2) == FB_user_id) { bSkipItem = false; }
                              }
                              break;
                            case 'MW_LootLadder':
                              if (oNewsFeed.Action.indexOf('help_initial') != -1) {
                                if (aParams[2008]==true) {
                                  if (getCurrentTime() > MW_LootLadderDelay ) {
                                    bSkipItem = false;
                                  } else {
                                  //LogPush('MW Loot Ladder skipped: Daily limit reached');
                                  }
                                }
                              } else if (aParams[2008]==true) {
                                if (getCurrentTime() >  MW_LootLadderDelay) {
                                  bSkipItem = false;
                                } else {
                                //LogPush('MW Loot Ladder skipped: Daily limit reached');
                                }
                              }
                              break;
                            case 'MW_Property':
                              if (oNewsFeed.Action.indexOf('help_initial') != -1) {
                                if (aParams[2010]==true) { bSkipItem = false; } //else LogPush('MW: Skipping initial Armory/CS/WD Parts send');
                                  break;
                                } else if (aParams[2008]==true) {
                                  bSkipItem = false;
                                }
                              break;
                            case 'MW_Missions':
                              if (aParams[2022]==2) { bSkipItem = false; }
                              break;
                          }
                        }
                        break;
                    }
                  }
                  // end test section
                  if (!bSkipItem) {
                    aNewsFeedNotificationId.unshift(oNewsFeed.Action);
                    if (aNewsFeedNotificationId.length>300) aNewsFeedNotificationId.length = 300;
                    if (name != "MW_WarHelp" && name != "MW_Missions") {
                      // add to bottom
                      oNewsFeedList.Append(oNewsFeed);
                    } else {
                      // add to top
                      oNewsFeedList.Insert(oNewsFeed);
                    }
                    iNewsFeedNum = iNewsFeedNum+1;
                  }
                }
              //}
              if (!oNewsFeed.Type && oNewsFeed.AppId == 10979261223 ){
                 LogPush("URL Not Found: " + oButton.href);
              }
              
            }
          }
		  if (starttime == psnfs.created_time){psnfs.created_time++;} // To keep us from requesting the same thing over and over..
          // adding Queued Mission data back
          for (var m=0;m<aMissionRetry[0].length;m++) {
            if (aMissionRetry[1][m] < getCurrentTime() && ((aParams[2021]==2)||(aParams[2022]==2))) {
              // pulls out items from the queue to re-process
              oNewsFeedList.Insert(aMissionRetry[0][m]);
              iNewsFeedNum++;
              aMissionRetry[0].splice(m,1);
              aMissionRetry[1].splice(m,1);
              m--;
            }
          }
          if (bAutoRun) {
            if (oNewsFeedList.First != null) {
              LogPush('<b>'+iNewsFeedNum+' News Feed notification(s) found.</b><br>');
              iNewsFeedCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionNewsFeed);}, getRandRange(aParams[2]*750,aParams[2]*1250));
            } else {
              oNewsFeedList.Erase(); // Lets make sure this is empty..
              iNewsFeedCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionNewsFeed);}, getRandRange(aParams[3]*750,aParams[3]*1250));
            }
            if (iNewsFeedCurrent < iHoldEvent) {
              // The browser has reset.  Cancel runaway jobs;
              clearTimeout(iNewsFeedCurrent);
            }
          }
        } catch(err) {
          if (bAutoRun) {
            PSNFS_log('Error: Read News Feed - '+err.message);
            if (strTemp!=undefined) PSNFS_log('Error: Read News Feed 2 - '+strTemp);
            LogPush('<b>Error Reading News Feed Notices. Checking again in '+aParams[3]+' seconds.</b><br>REPORT THIS: '+err.message);
            iNewsFeedCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionNewsFeed);}, getRandRange(aParams[3]*750,aParams[3]*1250));
            if (iNewsFeedCurrent < iHoldEvent) {
              // The browser has reset.  Cancel runaway jobs;
              clearTimeout(iNewsFeedCurrent);
            }
          }
        }
      } // End of try
    })
  } else {
    PSNFS_log('Abort read request. Switch is off');
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
  iHoldEvent = iRequestCurrent;
  PSNFS_log('Read_FB_Requests');
  if (bAutoRun) {
    oRequestList.Erase();
    // start the WatchDog Timer to catch hung requests.  15 seconds maximum.
    iWatchDog = setTimeout(function (e) {
      iCurrentJob.abort();
      PSNFS_log('WatchDog timer killing Read_FB_Requests');
      iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[1]*750,aParams[1]*1250));
      if (iRequestCurrent < iHoldEvent) {
        // The browser has reset.  Cancel runaway jobs;
        PSNFS_log('Killed by the Requests Watchdog');
        clearTimeout(iRequestCurrent);
      }
    }, 15000);
    myUrl = document.location.protocol + '//www.facebook.com/reqs.php';
    iCurrentJob = GM_xmlhttpRequest({
      method: 'GET',
      url: myUrl,
      headers: {
      //'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      //'Accept-Language': 'en-us,en;q=0.5',
      //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      onload: function(_responseDetails) {
        try {
          var i1, i2, myUrl, myUrl2;
          var oDOM, oForms, oForm, oFormInputs,
              oFormInput, oInputs, oInput, oRequest, oRequest2;
          var oSpan;
          var strTemp, strTempGift;
          var iButtons;
          var aCat;
          var oFormId;

          clearTimeout(iWatchDog);

          if (_responseDetails.status != 200) {
            PSNFS_log('Error Read message from MW page');
          } else {
            strTemp = _responseDetails.responseText;
            if (strTemp.indexOf('<div id="contentArea')==-1) throw {message:"No Application Requests have been found"};
            i1 = strTemp.indexOf('<div id="contentArea');
            i2 = strTemp.indexOf('<div id="bottomContent',i1);
            oDOM = document.createElement('div');
            oDOM.innerHTML = strTemp.slice(i1,i2);
            // Step 1 - find all the Friend Add Requests
            oForms = getSnapshot(strConfirmBoxes1, oDOM);
            PSNFS_log('Friend Requests Found = '+oForms.snapshotLength );
            for(i=0; i < oForms.snapshotLength; i++) {
              oForm       =   oForms.snapshotItem(i);
              oFormInputs =   getSnapshot(strFormInputs, oForm);
              oRequest    =   new RequestItem();
              for ( j=0; j < oFormInputs.snapshotLength; j++) {
                oFormInput = oFormInputs.snapshotItem(j);
                switch (oFormInput.type) {
                  case 'hidden':
                    // grab the parameters need to action the item
                    oRequest.Parms += "&"+oFormInput.name+"="+escape(oFormInput.value);
                    break;
                  case 'submit':
                    // grab the name of what we are actioning, and the http action request
                    if (oFormInput.name == 'actions[hide]')   oRequest.Gifttype = 'friend_connect';
                    if (oFormInput.name == 'actions[reject]') oRequest.Gifttype = 'friend_suggestion';
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
            PSNFS_log('oForms.snapshotLength = '+oForms.snapshotLength );
            for(i=0; i < oForms.snapshotLength; i++) {
              oForm             = oForms.snapshotItem(i);
              oFormId           = getSnapshot(strFormId,oForm).snapshotItem(0).id;
              aCat              = oFormId.split('_');
              oFormInputs       = getSnapshot(strFormInputs, oForm);
              oRequest          = new RequestItem();
              oRequest.Gifttype = oFormId;
              switch (aCat[0]) {
                case 'event':
                  if (aParams[1004]>0) {
                    oRequest.Parms = '&ok=Okay&__d=1&action=remove';
                    for ( k=0; k < oFormInputs.snapshotLength; k++) {
                      oFormInput = oFormInputs.snapshotItem(k);
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
                    oRequestList.Append(oRequest);
                    iRequestNum = iRequestNum + 1;
                  } else {
                    PSNFS_log('Skipping Event');
                  }
                  break;
                case 'group':
                case 'fbpage':
                  iButtons = 0;
                  for ( j=0; j<oFormInputs.snapshotLength; j++) {
                    oFormInput = oFormInputs.snapshotItem(j);
                    switch (oFormInput.type) {
                      case 'hidden':
                        // grab the parameters need to action the item
                        oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
                        break;
                      case 'submit':
                        if (oFormInput.name == 'actions[reject]')
                        oRequest.Reject = "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
                        iButtons += 1;
                    }
                  }
                  oRequest.Parms += '';
                  if (iButtons<2) {
                    PSNFS_log('Ignoring malformed gift request. (no Accept button)');
                    oRequest = undefined;
                  } else if (aCat[0]=='fbpage' ) {
                    if (aParams[1005]==0 ) {
                      PSNFS_log('Skipping fbpage Invitation');
                    } else {
                      oRequest.Parms += "&actions[accept]=Ignore";
                      oRequest.Parms += "&nctr[_mod]=fbpage_fan_confirm&lsd&post_form_id_source=AsyncRequest";
                      oRequestList.Append(oRequest);
                      iRequestNum = iRequestNum + 1;
                    }
                  } else if (aCat[0]=='group' ) {
                    if (aParams[1006]==0 ) {
                      PSNFS_log('Skipping Group Invitation');
                    } else {
                      oRequest.Parms += "&actions[accept]=Ignore";
                      oRequest.Parms += "&lsd&post_form_id_source=AsyncRequest";
                      oRequestList.Append(oRequest);
                      iRequestNum = iRequestNum + 1;
                    }
                  }
                  break;
                  // End read in general postings
              }
              // End Switch
            }
            // end loop
            PSNFS_log('Step 4');
            // find all GAME requests
            oForms = getSnapshot(strConfirmBoxes3, oDOM);
            PSNFS_log('oForms.snapshotLength = '+oForms.snapshotLength );
            for(i=0; i < oForms.snapshotLength; i++) {
              oForm             = oForms.snapshotItem(i);
              oFormId           = getSnapshot(strFormId,oForm).snapshotItem(0).id
              aCat              = oFormId.split('_');
              oFormInputs       = getSnapshot(strFormInputs, oForm);
              oRequest          = new RequestItem();
              oRequest.Gifttype = oFormId;
              iButtons = 0;
              for ( j=0; j<oFormInputs.snapshotLength; j++) {
                oFormInput = oFormInputs.snapshotItem(j);
                switch (oFormInput.type) {
                  case 'hidden':
                    // grab the parameters need to action the item
                    oRequest.Parms += "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
                    break;
                  case 'submit':
                    // grab the name of what we are actioning, and the http action request
                    iButtons += 1;
                    if (oFormInput.name == 'actions[reject]') {
                      oRequest.Reject = "&"+oFormInput.name+"="+encodeURI(oFormInput.value);
                    } else {
                      oRequest.Action = "&"+oFormInput.name.slice(0,8)+encodeURIComponent(oFormInput.name.slice(8,-1))+oFormInput.name.slice(-1)+"="+encodeURI(oFormInput.value);
                    }
                }
              }
              oRequest.Parms += '';
              if (aCat[1] == '10979261223' && aParams[7]==1) {
                if (oRequest.Action.indexOf('accept_energy_req')!=-1) {
                  if (aParams[2020]==0) {
                    PSNFS_log('Skipping Mafia Wars Accept Energy Request');
                  } else if (aParams[2020]==1) {
                    PSNFS_log('Ignoring Mafia Wars Accept Energy Request');
                    oRequest.Parms += oRequest.Reject;
                    oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                    oRequestList.Append(oRequest);
                    iRequestNum = iRequestNum + 1;
                  } else {
                    PSNFS_log('Adding Mafia Wars Accept Energy Request');
                    oRequest.Parms += oRequest.Action;
                    oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                    oRequestList.Append(oRequest);
                    iRequestNum = iRequestNum + 1;
                  }
                } else if ((oRequest.Action.indexOf('accept_')!=-1)||(oRequest.Action.indexOf('secret_stash_help')!=-1)) {
                  if (MW_FreeGiftsDelay>getCurrentTime()) {
                  } else if (oRequest.Action.indexOf('Secret%2BDrop') != -1) {
                    PSNFS_log('Secret Drops Found: ' + ++iNumDrops);
                    if (aParams[2025]==0) {
                      PSNFS_log('Skipping Mafia Wars Accept Gift Secret Drop Request');
                    } else if (aParams[2025]==1) {
                      PSNFS_log('Ignoring Mafia Wars Accept Gift Secret Drop Request');
                      oRequest.Parms += oRequest.Reject;
                      oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                      oRequestList.Append(oRequest);
                      iRequestNum = iRequestNum + 1;
                    } else if (aParams[2025]==3) {
                      PSNFS_log('Adding Mafia Wars Accept Gift Request');
                      oRequest.Parms += oRequest.Action;
                      oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                      oRequestList.Append(oRequest);
                      iRequestNum = iRequestNum + 1;
                    } else if (aParams[2025]==2) {
                      if (getCurrentTime() > MW_SecretDropDelay) {
                        PSNFS_log('Adding Mafia Wars Accept Gift Request');
                        oRequest.Parms += oRequest.Action;
                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                        oRequestList.Append(oRequest);
                        iRequestNum = iRequestNum + 1;
                      } else {
                        PSNFS_log('Skipping Mafia Wars Accept Gift Secret Drop Request');
                      }
                    } else if (aParams[2025]==4 && iNumDrops>3) {
                      PSNFS_log('Adding Mafia Wars Accept Gift Request');
                      oRequest.Parms += oRequest.Action;
                      oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                      oRequestList.Append(oRequest);
                      iRequestNum = iRequestNum + 1;
                    }
                  } else {
                    var bSkipItem = false;
                     if (!bSkipItem) {
                      if (aParams[2000]==0) {
                        PSNFS_log('Skipping Mafia Wars Accept Gift Request');
                      } else if (aParams[2000]==1) {
                        PSNFS_log('Ignoring Mafia Wars Accept Gift Request');
                        oRequest.Parms += oRequest.Reject;
                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                        oRequestList.Append(oRequest);
                        iRequestNum = iRequestNum + 1;
                      } else {
                        PSNFS_log('Adding Mafia Wars Accept Gift Request');
                        oRequest.Parms += oRequest.Action;
                        oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                        oRequestList.Append(oRequest);
                        iRequestNum = iRequestNum + 1;
                      }
                    }
                  }
                } else if (oRequest.Action.indexOf('socialmission')!=-1) {
                  if (aParams[2021]==0) {
                    PSNFS_log('Skipping Mafia Wars Mission Request');
                  } else if (aParams[2021]==1) {
                    PSNFS_log('Ignoring Mafia Mission Request');
                    oRequest.Parms += oRequest.Reject;
                    oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                    oRequestList.Append(oRequest);
                    iRequestNum = iRequestNum + 1;
                  } else  if (aParams[2021]==2) {
                    PSNFS_log('Adding Mafia Wars Mission Request');
                    oRequest.Parms += oRequest.Action;
                    oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                    oRequestList.Append(oRequest);
                    iRequestNum = iRequestNum + 1;
                  }
                } else if (oRequest.Action.indexOf('recruit')!=-1) {
                  if (aParams[2003]==0) {
                    PSNFS_log('Skipping Mafia Wars Join Request');
                  } else if (aParams[2003]==1) {
                    PSNFS_log('Ignoring Mafia Wars Join Request');
                    oRequest.Parms += oRequest.Reject;
                    oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                    oRequestList.Append(oRequest);
                    iRequestNum = iRequestNum + 1;
                  } else {
                    PSNFS_log('Adding Mafia Wars Join Request');
                    oRequest.Parms += oRequest.Action;
                    oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                    oRequestList.Append(oRequest);
                    iRequestNum = iRequestNum + 1;
                  }
                }
              } else if (aCat[1] == '176611639027113 ') {
                // Rewardville...
                PSNFS_log(oRequest.Action);
                PSNFS_log(oRequest.Gifttype);
                PSNFS_log(oRequest.Parms);
                
                
                
              } else {
                if (aParams[4000]==0) {
                  // Skip
                } else {
                  PSNFS_log('Ignoring Other Request');
                  oRequest.Parms += oRequest.Reject;
                  oRequest.Parms += '&lsd&post_form_id_source=AsyncRequest';
                  oRequestList.Append(oRequest);
                  iRequestNum = iRequestNum + 1;
                }
              }
            }
            // end loop
            PSNFS_log('done: ' +iRequestNum);
            if (bAutoRun) {
              if (oRequestList.First != null) {
                  LogPush('<b>'+iRequestNum +' Application Request(s) have been found and will be processed</b>');
                  iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[0]*750,aParams[0]*1250));
              } else {
                LogPush('<b>No Application Requests have been found.  Checking again in '+ aParams[1] +' minutes. </b>');
                  iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[1]*50000,aParams[1]*70000));
              }
              if (iRequestCurrent < iHoldEvent) {
                  // The browser has reset.  Cancel runaway jobs;
                  PSNFS_log('test4');
                  clearTimeout(iRequestCurrent);
              }
            }
          }
        } catch(err) {
          if (bAutoRun) {
            PSNFS_log('Error done: ' +iRequestNum);
            PSNFS_log('Error: Read FB Requests - '+err.message);
            if (oRequestList.First != null) {
              LogPush('<b>'+iRequestNum +' Application Request(s) have been found and will be processed</b>');
              iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[0]*750,aParams[0]*1250));
            } else {
              LogPush('<b>No Application Requests have been found.  Checking again in '+ aParams[1] +' minutes. </b>');
              iRequestCurrent = setTimeout(function (e) { EventSpan.dispatchEvent(ActionRequest);}, getRandRange(aParams[1]*50000,aParams[1]*70000));
            }
            if (iRequestCurrent < iHoldEvent) {
                // The browser has reset.  Cancel runaway jobs;
                clearTimeout(iRequestCurrent);
            }
          }
        }
      }
    });
  } else {
    PSNFS_log('Read Request stopped');
  }
}

/**** Initialization Routine ****/
function Initialize() {
  var oDom, oDiv, oButton, oText;
  var strGMList,strPara;
  var aTempPara = new Array();
  // Case Specific Initialization
  switch (strFrameId) {
    case 'MafiaWars':
      // nothing in here right now.
      break;
    case 'Facebook':
      // create lists
      oNewsFeedList    = new List(ReadNewsFeed);
      oRequestList = new List(Read_FB_Requests);
      // Set up Event handling
      EventSpan = document.createElement('span');
      EventSpan.addEventListener("PSNFS-ActionNewsFeed",    function(evt) {oNewsFeedList.Run()}, false);
      EventSpan.addEventListener("PSNFS-ActionRequest", function(evt) {oRequestList.Run()}, false);
      ActionNewsFeed    = document.createEvent("Events"); ActionNewsFeed.initEvent("PSNFS-ActionNewsFeed", false, false);
      ActionRequest = document.createEvent("Events"); ActionRequest.initEvent("PSNFS-ActionRequest", false, false);
      //set Up Log File
      oLogDiv = document.createElement('div');
      oLogDiv.setAttribute('style','width: 770px; height: 250px; overflow-x: hidden;overflow-y: auto; border: 1px solid rgb(204, 204, 204); padding-bottom: 2px; background-image: url("");');      
      oLogDiv.innerHTML = GM_getValue('LogDiv','');
      GM_setValue('LogDiv',oLogDiv.innerHTML);
      //set the time for News Feed processing (go back 6 hours);
      iNow = Math.floor(new Date().valueOf()/1000)-60*60*6;
      // set up the FV Delay timer
      FV_accept_ignore = 0;
      // fb user id
      FB_user_id = getFBID();
      GM_setValue('FB_user_id',FB_user_id+'');
      PSNFS_log('FB_user_id = '+FB_user_id);
      // get Save Set
      strSaveSet = GM_getValue('PSNFS-SaveSet','A');
      GM_setValue('PSNFS-SaveSet',strSaveSet);
      // set up the group Names
      strGroups = '<option value="0">-</option>';
      getGroupNames();
      // start a routine to keep the xw_sig current
      xw_sig_valid = false;
      local_xw_user_id='';
      // get updated NW credentials
      FB_xw_sig_update();
      // refresh every 5 minutes
      iFB_XW_Timer = setInterval(FB_xw_sig_update, 300000);
      bAutoRun = GM_getValue('bAutoRun',false);
      bShowLog = GM_getValue('bShowLog',false);
      // check for old settings
      var keys = GM_listValues();
      for (var ID in keys) {
        if (keys[ID] == 'PSNFS-Settings') {
          GM_setValue('PSNFS-Settings-'+strSaveSet,GM_getValue(keys[ID]));
          GM_deleteValue(keys[ID]);
        }
      }
      // read running parameters
      strPara = GM_getValue('PSNFS-Settings-'+strSaveSet,'{)');
      try {
        aParams.length = 0;
        eval('aParams = '+strPara);
        PSNFS_log(aParams[2005]);
      } catch (ierr) {
        aParams.length = 0;
        aParams = {};
        GM_setValue('PSNFS-Settings-'+strSaveSet,'{}');
      }
//****Set PSNFS Defaults****/
if (aParams[0] == undefined) {
	// Application Request Timer
	// Delay Between Actions
		aParams[0] = 10;
	// Scan Frequency
		aParams[1] = 5;
	// News Feed Notification Timer
	// Delay Between Actions
		aParams[2] = 10;
	// Scan Frequency
		aParams[3] = 30;
	// Log Length
		aParams[4] = 25;
	// FB Friend Suggestions
		aParams[1000] = 0;
	// FB Friend Request
		aParams[1002] = 0;
	// FB Event Invitations
		aParams[1004] = 0;
	// FB Page Suggestions
		aParams[1005] = 0;
	// FB Group Invitations
		aParams[1006] = 0;
	// MW Accept Gifts
		aParams[2000] = 2;
	// MW Accept Energy
		aParams[2020] = 2;
	// MW Accept Secret Drops
		aParams[2025] = 0;
	// MW Join Mafia
		aParams[2003] = 2;
	// Request Mission
		aParams[2021] = 0;
	// News Feed Mission
		aParams[2022] = 0;
	// Mission Type
		aParams[2023] = "both";
	// Minimum Energy
		aParams[2030] = 0;
	// Minimum Stamina
		aParams[2031] = 0;
	// Maximum Open Positions
		aParams[2026] = 1;
	// Requeue
		aParams[2027] = "true";
	// Other App Request Settings
		aParams[4000] = 0;
	// War Rewards To Collect (all)
		aParams[2200] = "true";
	// General Rewards and Help
		for (var zz in MW_GeneralList) {
			aParams[zz] = "true"
		}
	// War Rewards to Collect(individual)
		for (var zz in MW_WarRewardList) {
			aParams[zz] = "true"
		}
	// Daily Take Rewards to Collect
		for (var zz in MW_DailyTakeList) {
			aParams[zz] = "true"
		}
	// Operations to Join
		for (var zz in MW_OperationsList) {
			aParams[zz] = "true"
		}
      }
      // fix Mission selection
      if (aParams[2021] == undefined) aParams[2021]=0;
      if (aParams[2022] == undefined) aParams[2022]=0;
      if (aParams[2023] == undefined) aParams[2023]=0;
      if (aParams[2030] == undefined) aParams[2030]=0;
      if (aParams[2031] == undefined) aParams[2031]=0;
      GM_setValue('bAutoRun',bAutoRun);
      GM_getValue('bShowLog',bShowLog);
      if (bAutoRun) iRequestCurrent = setTimeout(function (e) { StartProcessing(); }, 15000);
      // setup display
      createDisplay();
      break;
  }
}

/**** Create Auto Accept Display ****/
function createDisplay() {
    var oDom, oDom1, oDom2;
    var oDiv, oDiv1, oDiv2, oTable, oTr, oTh, oTd, oForm, oInput, oImg, oH, oP, oUl;
    var oHeader;
    oDom  = document.getElementById('contentCol');
    if (document.getElementById(strFBAutoAccept)) {
      // skip UI is already in place
      return;
    } else if (document.getElementById('editProfileForm')) {
      // don't show the UI on the edit profile form
      return;
    } else if (document.getElementById('pagelet_search_header')) {
      // don't show the UI on the search page.
      return;
    } else if (document.getElementById('pagelet_header_personal')) {
      // don't show the UI on the personal page.
      return;
    } else if (document.getElementById('pagelet_groups')) {
      // don't show the UI on the Groups page.
      return;
    } else if ((document.getElementById('pagelet_friends'))&&(!document.getElementById('pagelet_requests'))) {
      // don't show the UI on the friends page.
      return;
    } else if (document.getElementById('editFriendsHeader')) {
      // don't show the UI on the friends header page.
      return;
    } else if (oDom) {
      // adjust the group display header hight
      if (document.getElementById('headerArea')!= null) {
        document.getElementById('headerArea').setAttribute('style','margin-top:25px; padding-bottom:5px')
      }

      // put the display on any page that uses the column format
        PSNFS_log('create Display');
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
                    oH.appendChild(document.createTextNode("PlayerScripts News Feed Scanner (PSNFS): RX6 MWAP Edition"));
                oDiv2.appendChild(oH);
            oDiv1.appendChild(oDiv2);
        oDiv.appendChild(oDiv1);
        oHeader.appendChild(oDiv);

        // Create Buttons for Header
        oDiv = document.createElement('div');
        oDiv.setAttribute('style',"border-bottom: 1px solid rgb(204, 204, 204); padding-bottom:2px");
            oTable = document.createElement('table');
                oTbody = document.createElement('tbody');
                    oTr = document.createElement('tr');
                        oTd = document.createElement('td');
                        oTd.setAttribute('width',"200px");
                            oFont = document.createElement('font');
                            oFont.setAttribute('style',"color: rgb(0, 0, 0); font-size: 13px; font-weight: normal;");
                            oFont.appendChild(document.createTextNode("Scanning: "));
                                oSpan = document.createElement('span');
                                oSpan.id = strAutoOn;
                                oSpan.addEventListener("click", click_AutoRun(1), false);
                                if (bAutoRun) {
                                    oSpan.innerHTML= '<b>On</b>';
                                } else {
                                    oSpan.innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>On</a> </font>';
                                }
                            oFont.appendChild(oSpan);
                            oFont.appendChild(document.createTextNode(" / "));
                                oSpan = document.createElement('span');
                                oSpan.id = strAutoOff;
                                oSpan.addEventListener("click", click_AutoRun(0), false);
                                if (!bAutoRun) {
                                    oSpan.innerHTML= '<b>Off</b>';
                                } else {
                                    oSpan.innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Off</a> </font>';
                                }
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
                                if (bShowLog) {
                                    oSpan.innerHTML= '<b>Show</b>';
                                } else {
                                    oSpan.innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Show</a> </font>';
                                }
                            oFont.appendChild(oSpan);
                            oFont.appendChild(document.createTextNode(" / "));
                                oSpan = document.createElement('span');
                                oSpan.id = strLogHide;
                                oSpan.addEventListener("click", click_ShowLog(0), false);
                                if (!bShowLog) {
                                    oSpan.innerHTML= '<b>Hide</b>';
                                } else {
                                    oSpan.innerHTML= '<font style="color: rgb(59, 89, 152); cursor: pointer;"> <a>Hide</a> </font>';
                                }
                            oFont.appendChild(oSpan);
                        oTd.appendChild(oFont);
                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute('width',"120px");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="color: rgb(59, 89, 152); font-size: 13px; font-weight: normal; cursor: pointer;"><a>Settings</a></font>';
                            oSpan.addEventListener("click",  click_ShowSetting(), false);
                        oTd.appendChild(oSpan);
                    oTr.appendChild(oTd);
                        oTd = document.createElement('td');
                        oTd.setAttribute('width',"120px");
                            oSpan = document.createElement('span');
                            oSpan.innerHTML = '<font style="color: rgb(59, 89, 152); font-size: 13px; font-weight: normal; cursor: pointer;"><a>Check for Script Update</a></font>';
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
        oDom.id = strPSNFSSettings;
        oDom.setAttribute('style',"display:none; -moz-border-radius: 10px; border: 5px solid rgb(104, 104, 104); padding: 5px; overflow: auto; margin-top: -30px; margin-left: 20px; background-color: white; width: 610px; height: 380px; position: absolute; z-index: 100;");
            oDiv = document.createElement('div');
                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                    oTbody = document.createElement('tbody');
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.innerHTML = '<div><h1 class="uiHeaderTitle">PlayerScripts News Feed Scanner (PSNFS): RX6 MWAP Edition - Settings</h1></div>';
                            oTh.setAttribute('style',"padding-bottom: 10px;");
                            oTh.setAttribute('colspan',"2");
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.innerHTML = 'Category';
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
                                oDiv1.setAttribute('style','border: 0px solid rgb(204, 204, 204); overflow: auto; background-color: white; width: 110px; height: 300px;');
                                    oUl = document.createElement('ul');
                                    //oUl.setAttribute('class',"uiSideNav");
                                    oUl.appendChild(addMenu("General",0));
                                    oUl.appendChild(addMenu("Facebook", 1));
                                    oUl.appendChild(addMenu("Mafia Wars", 2));
                                    oUl.appendChild(addMenu("Others", 3));
                                oDiv1.appendChild(oUl);
                            oTd.appendChild(oDiv1);
                        oTr.appendChild(oTd);
                            oTd = document.createElement('td');
                                oTd.appendChild(CreateGeneralTab(0));
                                oTd.appendChild(CreateFaceBookTab(1));
                                oTd.appendChild(CreateMafiaWarsTab(2));
                                oTd.appendChild(CreateOtherTab(3));
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

        // Create Log Window
        oDom = document.createElement('div');
        oDom.setAttribute('style','display: ;');
        oDom.id = strPSNFSLog;
          oP = document.createElement('p');
          oP.setAttribute('style',"text-align: left;");
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
          oDiv.setAttribute('style','width: 770px; height: 250px; overflow-x: hidden;overflow-y: auto; border: 1px solid rgb(204, 204, 204); padding-bottom: 2px; background-image: url("")');
        oDom.appendChild(oDiv);
        var mwapiFrame = makeElement('iframe', oDom, {'id':'mwapiFrame','src':'','scrolling':'no','frameborder':'0','style':'margin:0px auto;padding:0px; border:none; overflow:hidden; width:770px; height:180px;','allowTransparency':'false'});        
        
        oHeader.appendChild(oDom);
        oDom.replaceChild(oLogDiv,oDiv);
        if (bShowLog) {
            oLogDiv.parentNode.style.display = "";
        } else {
            oLogDiv.parentNode.style.display = "none"
        }
    }

    function addMenu( _text, _index) {
        var oLi, oSpan, oImg, oButton, oTxt;
        oLi = document.createElement('li')
        oLi.setAttribute('id',strPSNFSSetTabs+_index);
        if (_index==0) {
            oLi.setAttribute('class','selected');
        } else {
            oLi.setAttribute('class','');
        }
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
            oInput.name = "PSNFS-Para-"+_iPar;
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
          oTd.setAttribute('colspan','3');
              oUl = document.createElement('ul');
              oUl.setAttribute('style','border: 1px solid rgb(204, 204, 204); height: 88px; list-style: none outside none; overflow: auto;');
              for (var ID in _oList ) {
                      oLi = document.createElement('li');
                          oInput = document.createElement('input');
                          oInput.name   = "PSNFS-Para-"+ID;
                          oInput.id   = "PSNFS-Para-"+ID;
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
              oSpan.innerHTML = 'Select All';
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
              oSpan.innerHTML = 'Clear All';
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
            oSelect.name = "PSNFS-Para-"+_iPar;
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
        if (_id==0) {
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(""); width: 480px; height: 300px;');
        } else {
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(""); width: 480px; height: 300px;');
        }
        oDom.id = strPSNFSSetDivs+_id;
            oForm = document.createElement('form');
                oForm.name = 'PSNFS-Form'+_id;
                // create layout;
                oTable = document.createElement('table');
                oTable.setAttribute('width','100%');
                    oTbody = document.createElement('tbody');
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Debug Options";
                              oHr = document.createElement('hr');
                          oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 9,'Debug','No*;Yes (console log);Yes(console log & PSNFS log)','0;1;2');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Scan Application Requests";
                              oHr = document.createElement('hr');
                          oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 0,'Delay Between Actions','Short (1 sec);Normal (5 sec);Long (10 sec)*','1;5;10');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 1,'Scan Frequency','Never (disabled);Fast (1 min);Normal (5 min)*;Slow (15 min);Very Slow (1 hour)','0;1;5;15;60');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Scan News Feed";
                              oHr = document.createElement('hr');
                          oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2,'Delay Between Actions','Short (1 sec);Normal (5 sec);Long (10 sec)*','1;5;10');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 3,'Scan Frequency','Never (disabled);Very Fast (5 seconds);Fast (15 seconds);Normal (30 seconds)*;Slow (1 minute)','0;5;15;30;60');
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
                        createDropDownList(oTr, 4,'Log Length','25 items*; 50 items; 100 items; 150 items; 200 items; 400 items; 800 items; 1600 items; 3200 items','25;50;100;150;200;400;800;1600;3200');
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody)
             oForm.appendChild(oTable)
         oDom.appendChild(oForm);
        return oDom;
    }

    function CreateFaceBookTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd, oHr ;
        oDom = document.createElement('div');
        if (_id==0) {
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(""); width: 480px; height: 300px;');
        } else {
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(""); width: 480px; height: 300px;');
        }
        oDom.id = strPSNFSSetDivs+_id;
            oForm = document.createElement('form');
                oForm.name = 'PSNFS-Form'+_id;
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
                        createDropDownList(oTr, 1000,'Suggestions','Confirm;Ignore;Do Nothing*','2;1;0');
                            oTd = document.createElement('td');
                            oTd.setAttribute('style',"width: 120px; text-align: right;");
                            oTd.textContent = "Add to List:";
                        oTr.appendChild(oTd);
                            oTd = document.createElement('td');
                            oTd.setAttribute('style',"width: 120px;");
                                oSelect = document.createElement('select');
                                oSelect.name = "PSNFS-Para-1001";
                                oSelect.setAttribute('style',"width: 120px;");
                                oSelect.innerHTML = strGroups;
                            oTd.appendChild(oSelect);
                        oTr.appendChild(oTd);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 1002,'Invitation','Confirm;Ignore;Do Nothing*','2;1;0');
                            oTd = document.createElement('td');
                            oTd.setAttribute('style',"width: 120px; text-align: right;");
                            oTd.textContent = "Add to List:";
                        oTr.appendChild(oTd);
                            oTd = document.createElement('td');
                            oTd.setAttribute('style',"width: 120px;");
                                oSelect = document.createElement('select');
                                oSelect.name = "PSNFS-Para-1003";
                                oSelect.setAttribute('style',"width: 120px;");
                                oSelect.innerHTML = strGroups;
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
                        createDropDownList(oTr, 1004,'Event Invitations','Remove;Do Nothing*','1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 1005,'Page Suggestions','Ignore;Do Nothing*','1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 1006,'Group Invitations','Ignore;Do Nothing*','1;0');
                    oTbody.appendChild(oTr);
                oTable.appendChild(oTbody)
             oForm.appendChild(oTable)
         oDom.appendChild(oForm);
        return oDom;
    }

    function CreateMafiaWarsTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd, oHr ;
        oDom = document.createElement('div');
        if (_id==0) {
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(""); width: 480px; height: 300px;');
        } else {
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(""); width: 480px; height: 300px;');
        }
            oDom.id = strPSNFSSetDivs+_id;
            oForm = document.createElement('form');
                oForm.name = 'PSNFS-Form'+_id;
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
                        createDropDownList(oTr, 2000,'Accept Gifts','Confirm*;Ignore;Do Nothing','2;1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2020,'Accept Energy','Confirm*;Ignore;Do Nothing','2;1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2025,'Accept Secret Drops','Confirm-Keep3;Confirm-NL;Confirm-L;Ignore;Do Nothing*','4;3;2;1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2003,'Join Mafia','Confirm*;Ignore;Do Nothing','2;1;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "Operations Settings (from App Requests and News Feed)";
                              oHr = document.createElement('hr');
                          oTh.appendChild(oHr);
                        oTr.appendChild(oTh);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2021,'App Request Operations','Confirm;Ignore;Do Nothing*','2;1;0');
                        createDropDownList(oTr, 2022,'News Feed Operatons','Confirm;Do Nothing*','2;0');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2023,'Type','Energy;Stamina;Both*','energy;stamina;both');
                    oTbody.appendChild(oTr);
                        var strMReq = '0'; for (var x=1; x<1000; x++) strMReq = strMReq + ';'+x;
                        oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2030,'Min Energy',strMReq,strMReq);
                        createDropDownList(oTr, 2031,'Min Stamina',strMReq,strMReq);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                        createDropDownList(oTr, 2026,'Max Open Slots','1*;2;3;4;5;6;7','1;2;3;4;5;6;7');
                        createDropDownList(oTr, 2027,'ReQueue','Yes*;No','true;false');
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "Operations to Join";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,MW_OperationsList);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"4");
                            oTh.textContent = "News Feed Settings";
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
                        createCheckBoxList(oTr,MW_GeneralList);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "War Rewards to Collect";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,MW_WarRewardList);
                    oTbody.appendChild(oTr);
                        oTr = document.createElement('tr');
                            oTh = document.createElement('th');
                            oTh.setAttribute('style',"");
                            oTh.setAttribute('colspan',"1");
                            oTh.textContent = "Daily Take Rewards to Collect";
                        oTr.appendChild(oTh);
                        createCheckBoxList(oTr,MW_DailyTakeList);
                    oTbody.appendChild(oTr);
                    
                oTable.appendChild(oTbody);
            oForm.appendChild(oTable);
        oDom.appendChild(oForm);
        return oDom;
    }
    function CreateOtherTab(_id) {
        var oDom, oForm, oTable, oTbody, oTr, oTh, oTd ;
        oDom = document.createElement('div');
        if (_id==0) {
            oDom.setAttribute('style','display: ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(""); width: 480px; height: 300px;');
        } else {
            oDom.setAttribute('style','display:none ;border: 1px solid rgb(204, 204, 204); overflow: auto; background-image: url(""); width: 480px; height: 300px;');
        }
        oDom.id = strPSNFSSetDivs+_id;
            oForm = document.createElement('form');
                oForm.name = 'PSNFS-Form'+_id;

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
                        createDropDownList(oTr, 4000,'Everything','Ignore;Do Nothing*','1;0');
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
    // get the facebook SVN_rev number
    gvar.svn_rev = getSVNRev();
    if (document.getElementById('login_form')!=null) {
      // they've logged out of facebook
      StopProcessing();
      bInitialized = false;
    } else if (document.getElementById('contentCol') != null ) {
      createDisplay();
    } else {
      PSNFS_log('Ignore this Window');
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
function track_Analytics(){
  var newScript = 'try { var pageTracker = _gat._getTracker("UA-3078135-23"); pageTracker._trackPageview(); } catch(err) { }';
  makeElement('script', document.getElementsByTagName('head')[0], {'type':'text/javascript'}).appendChild(document.createTextNode(newScript));
}

function build_Analytics(){
  function GM_wait() {
    if(typeof unsafeWindow._gat == 'undefined') { window.setTimeout(GM_wait,250); }
    else { track_Analytics(); }
  }

  if(!document.getElementById('mwapAnalytics')){
    var gaJsHost = (('https:' == document.location.protocol) ? 'https://ssl.' : 'http://www.');
    var newScript = gaJsHost + 'google-analytics.com/ga.js';
    var extElt = makeElement('script', document.getElementsByTagName('head')[0], {'id':'mwapAnalytics', 'type':'text/javascript'});
    extElt.src = newScript;
    extElt.id = 'mwapAnalytics';
    GM_wait();
  }
}

// FB and MW Detection
// We are only worried about the URL detection because of the excludes
if (self.location.href.indexOf('www.facebook.com')!=-1) {
  strFrameId  = 'Facebook';
} else {
  strFrameId  = 'MafiaWars';
}
bInitialized = false;
build_Analytics();
// add event listners for load and unload
if ( strFrameId == "Facebook") {
  document.addEventListener("DOMNodeInserted", function (e) {
    change_count++;
    if (!scheduled && change_count > 2 ) schedNotify();
  },
  false);
  window.addEventListener("unload", function (e) {
    try {
      bAutoRun = false;
      clearTimeout(iRequestCurrent);
      clearTimeout(iNewsFeedCurrent);
      clearTimeout(iMW_XW_Timer);
      clearTimeout(iFB_XW_Timer);
      PSNFS_log('Scripts are unloading.  Frame = '+strFrameId);
    } catch(_errObj) {
      PSNFS_log('Something bad has happend - '+_errObj.message);
    }
  },
  false);
} else {

  // for MW window when it opens
  Initialize();
}

/**** xw_sig Update Routines ****/
function FB_xw_sig_update(_val) {
  function doStep1(_myUrl, _myParms) {
    var iCurrentJob, iWatchDog;
    PSNFS_log('FB_xw_sig_update doStep 1');
    // start the WatchDog Timer to catch hung requests. 15 seconds.
    iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); }, 15000);
    iCurrentJob = GM_xmlhttpRequest({
      method: 'GET',
      url: _myUrl,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5'
      },
      onload: function(_responseDetails) {
        try {
          clearTimeout(iWatchDog);
          if (_responseDetails.status != 200) throw('Status 200 error');
          var param = doFBParse(_responseDetails.responseText);
          doStep2(param[0],param[1]);
        } catch(err) {
          PSNFS_log('Error FB_xw_sig_update: do Step 1 - '+err.message);
          LogPush('Cannot Update Mafia Wars credentials 1<br>Attempting again in 5 minutes');
          xw_sig_valid  = false;
          local_xw_time = 0;
        }
      }
    });
  }

  function doStep1a(_myUrl, _myParms) {
    var iCurrentJob, iWatchDog;
    PSNFS_log('FB_xw_sig_update doStep 1a');
    // start the WatchDog Timer to catch hung requests. 15 seconds.
    iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); }, 15000);
    iCurrentJob = GM_xmlhttpRequest({
      method: 'GET',
      url: _myUrl,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5'
      },
      onload: function(_responseDetails) {
        try {
          var i1, i2, myUrl, myParms;
          var strTemp;
          var strDetails;

          clearTimeout(iWatchDog);

          if (_responseDetails.status != 200) throw {message:"HTML Page was not read correctly."};
          strTemp = _responseDetails.responseText;
          i1 = strTemp.indexOf('document.location.replace("');
          if (i1 == -1) { PSNFS_log(strTemp); throw {message:'Cannot find document.location.replace'};}
          i1 += 27;
          i2 = strTemp.indexOf('"',i1);
          eval("myUrl = " + strTemp.slice(i1-1,i2+1));
          doStep2(myUrl,'');
        } catch(err) {
          PSNFS_log('Error: FB_xw_sig_update DoStep 1a - '+err.message);
          NextRequest(aParams[0],aParams[1]);
        }
      }
    });
  }
  
  function doStep2(_myUrl, _myParms) {
    var iCurrentJob, iWatchDog;
    PSNFS_log('FB_xw_sig_update doStep2');
    // start the WatchDog Timer to catch hung requests. 15 seconds.
    iWatchDog = setTimeout(function (e) { iCurrentJob.abort(); }, 15000);
    iCurrentJob = GM_xmlhttpRequest({
      method: 'POST',
      url: _myUrl,
      data: _myParms,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      onload: function(_responseDetails) {
        try {
          var i1, i2, strTemp;

          clearTimeout(iWatchDog);

          if (_responseDetails.status != 200) throw('Status 200 error');
          strTemp = _responseDetails.responseText;
          i1 = strTemp.indexOf('name="sf_xw_user_id"');
          if (i1==-1) throw ('cannot find sf_xw_user_id');
          i1 = strTemp.indexOf('value="',i1)+7;
          i2 = strTemp.indexOf('"',i1);
          local_xw_user_id = strTemp.slice(i1,i2);
          i1 = strTemp.indexOf('name="sf_xw_sig"');
          if (i1==-1) throw ('cannot find sf_xw_sig');
          i1 = strTemp.indexOf('value="',i1)+7;
          i2 = strTemp.indexOf('"',i1);
          local_xw_sig  = strTemp.slice(i1,i2);
          local_xw_time = getCurrentTime();
          xw_sig_valid  = true;
          PSNFS_log('local_xw_sig = '+local_xw_sig+', local_xw_user_id = '+local_xw_user_id+', local_xw_time = '+local_xw_time);
          LogPush('<font style="color: rgb(89, 152, 59);"><b>Mafia Wars credentials have been successfully renewed.</b></font>');
        } catch(err) {
          PSNFS_log('Error FB_xw_sig_update: do Step 2 - '+err.message);
          LogPush('<font style="color: rgb(152, 89, 59);"><b>Cannot Update Mafia Wars credentials 2<br>Attempting again in 5 minutes.</b></font>');
          xw_sig_valid  = false;
          local_xw_time = 0;
        }
      }
    });
  }

  function doStep10(myUrl, myParms) {
    var iCurrentJob, iWatchDog;
    // start the WatchDog Timer to catch hung requests. 15 seconds.
    iWatchDog   = setTimeout(function (e) { iCurrentJob.abort(); }, 15000);
    iCurrentJob = GM_xmlhttpRequest({
      method: 'POST',
      url: myUrl,
      data: myParms,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Accept-Language': 'en-us,en;q=0.5',
        'X-Requested-With':'XMLHttpRequest'
      },
      onload: function(_responseDetails) {
        var strTemp;
        var i1, i2;
        clearTimeout(iWatchDog);
        strTemp = _responseDetails.responseText;
        if (_responseDetails.status == 200) {
          if (strTemp.indexOf('local_xw_sig') != -1) {
            i1 = strTemp.indexOf('local_xw_sig');
            i2 = strTemp.indexOf("';",i1);
            local_xw_sig  = strTemp.slice(i1+16,i2);
            local_xw_time = getCurrentTime();
            xw_sig_valid  = true;
            PSNFS_log('local_xw_sig = '+local_xw_sig+', local_xw_user_id = '+local_xw_user_id+', local_xw_time = '+local_xw_time);
          } else {
            xw_sig_valid  = false;
            local_xw_time = 0;
            PSNFS_log('Error renewing XW_SIG');
          }
        } else {
          xw_sig_valid  = false;
          local_xw_time = 0;
          PSNFS_log('Error renewing XW_SIG');
        }
      }
    });
  }
  // doStep1 and doStep2 will get a brand new set of credentials
  // dostep10 will renew the credentials

  function doDone() {
      // in FF this is empty.
  }
  PSNFS_log('FF UPDATE - xw_sig_update');
  var iHoldEvent, myUrl, myParms;
  // check the age of the xw_sig
  if (((getCurrentTime()-local_xw_time) > 10) || (local_xw_user_id=='')) {
    myUrl   = document.location.protocol + '//apps.facebook.com/inthemafia/?zy_link=appage';
  //myUrl   = 'http://apps.facebook.com/inthemafia/?zy_link=appage&ref=bookmarks';
    myParms = '';
    LogPush('<b>Mafia Wars credentials are out of date. Attempting to refresh</b>');
    PSNFS_log('FB_xw_sig_update: Attempting to get a new set of MW Credentials');
    doStep1(myUrl, myParms);
  } else {
    myUrl   = 'http://facebook.mafiawars.zynga.com/mwfb/sf_updater.php';
    myParms = 'sf_xw_user_id='+escape(local_xw_user_id)+'&sf_xw_sig='+local_xw_sig+'&skip_req_frame=1';
    LogPush('<b>Updating Mafia Wars credentials.</b>');
    PSNFS_log('FB_xw_sig_update: Attempting to renew set of MW Credentials');
    doStep10(myUrl, myParms);
  }
  psnfs.request_access_code(); // Refresh the facebook token every so often..
}

/**** Utility functions ****/
// gets the current timestamp in minutes
function getCurrentTime() {
  // returns time in minutes
  return Math.round(new Date().getTime()/1000/60);
}

// gets a random num within a range
function getRandRange(_iLow, _iHigh) {
  return Math.floor((_iHigh - _iLow)*Math.random())+_iLow;
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
  strTemp= strTemp.replace(/\?/g, '%3F');
  strTemp= strTemp.replace(/=/g,  '%3D');
  strTemp= strTemp.replace(/&/g,  '%26');
  strTemp= strTemp.replace(/,/g,  '%2C');

  return strTemp;
}

function decodeStrings(_str) {
  var strTemp = _str;
  strTemp= strTemp.replace(/%20/g, ' ');
  strTemp= strTemp.replace(/%22/g, '"');
  strTemp= strTemp.replace(/%25/g, '%');
  strTemp= strTemp.replace(/%26/g, '&');
  strTemp= strTemp.replace(/%2C/g, ',');
  strTemp= strTemp.replace(/%2F/g, '/');
  strTemp= strTemp.replace(/%3A/g, ':');
  strTemp= strTemp.replace(/%3D/g, '=');
  strTemp= strTemp.replace(/%3F/g, '?');
  strTemp= strTemp.replace(/%5B/g, '[');
  strTemp= strTemp.replace(/%5D/g, ']');
  strTemp= strTemp.replace(/%7B/g, '{');
  strTemp= strTemp.replace(/%7D/g, '}');
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
  oSnapShot = getSnapshot('//script[contains(text(),"Env")]');
  if (oSnapShot.snapshotLength != 0) {
    strText = oSnapShot.snapshotItem(0).innerHTML;
    i1 = strText.indexOf('{user:') + 6;
    if (i1!=-1) {
      i2 = strText.indexOf(',',i1);
      return strText.slice(i1,i2);
    } else {
      return strText;
    }
  } else {
    return strText;
  }
}

function getSVNRev() {
  var oSnapShot, strText;
  var i1, i2;
  oSnapShot = getSnapshot('//script[contains(text(),"svn")]');
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
    // Friend list group names.
    strGroups = '<option value="0">-</option>';
    if (!psnfs.access_token) {
        
        psnfs.request_access_code();
        return;
    }
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://graph.facebook.com/me/friendlists?&access_token="+psnfs.access_token,
        onload: function(_responseDetails) {
            var newsfeeddata = JSON.parse(_responseDetails.responseText);
            if (newsfeeddata.error && newsfeeddata.error.type == 'OAuthException'){
                // Auth Exception lets get a new one..
                psnfs.access_token = '';
                psnfs.request_access_code();
                return;
            }
            if (!newsfeeddata.data){
                PSNFS_log("No groups found" + _responseDetails.responseText);
                return;
            }
            for (var i=0; i < newsfeeddata.data.length; i++){
                if (newsfeeddata.data[i].list_type != "user_created"){
                    continue;
                }
                strGroups += '<option value="'+ newsfeeddata.data[i].id + '">'+newsfeeddata.data[i].name+'</option>';
                
            }
            if (strGroups.indexOf(aParams[1001]) == -1) aParams[1001] = 0;
            if (strGroups.indexOf(aParams[1003]) == -1) aParams[1003] = 0;
            // try to update display
            oForm = document.forms.namedItem('PSNFS-Form1');
            if (oForm != null) {
              oForm.elements.namedItem('PSNFS-Para-1001').innerHTML = strGroups;
              oForm.elements.namedItem('PSNFS-Para-1001').value = aParams[1001];
              oForm.elements.namedItem('PSNFS-Para-1003').innerHTML = strGroups;
              oForm.elements.namedItem('PSNFS-Para-1003').value = aParams[1003];
            }            
        }, 
        onerror: function(response) {
            PSNFS_log("getGroupNames: error fetching groups");
        }
    });

}

/**** Listner ****/
function click_MissionQueue() {
  var iNextTry;
  for (i=0;i<aMissionRetry[0].length;i++) {
    iNextTry = aMissionRetry[1][i] - getCurrentTime();
    LogPush('<b>Mission Queue Slot '+i+': '+ aMissionRetry[0][i].AttachmentTitle+'</b> ('+ aMissionRetry[0][i].ActorName +') next retry in '+iNextTry+' mins');
  }
}

function click_AutoRun(iButton) {
  return function () {
    var oSpan;
    PSNFS_log('the following button was pushed ' + iButton);
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
  }
}

function click_ShowSettingsTab(iButton) {
  return function () {
    var oLi, oDiv;
    for (var i=0;i<5;i++) {
      oLi = document.getElementById(strPSNFSSetTabs+i);
      oDiv = document.getElementById(strPSNFSSetDivs+i);
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
      for (var i=0;i<4;i++) {
        oForm = document.forms.namedItem('PSNFS-Form'+i);
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
        strSaveSet = 'B';
      else
        strSaveSet = 'A';
      GM_setValue('PSNFS-Settings-'+strSaveSet, ArraytoString(aParams));
      GM_setValue('PSNFS-SaveSet',strSaveSet);
      oDiv = document.getElementById(strPSNFSSettings);
      oDiv.style.display="none";
    } else {
      oDiv = document.getElementById(strPSNFSSettings);
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
    PSNFS_log('the following button was pushed ' + iButton);
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

function click_ClearLog() {
  oLogDiv.innerHTML = "";
  GM_setValue('LogDiv',oLogDiv.innerHTML);
}

function click_List_Accept_all(_oList) {
  return function () {
      for (var id in _oList) {
    //aParams[id] = true;
      document.getElementById('PSNFS-Para-'+id).checked = true;
    }
  }
}

function click_List_Cancel_all(_oList) {
  return function () {
    for (var id in _oList) {
    //aParams[id] = false;
      document.getElementById('PSNFS-Para-'+id).checked = false;
    }
  }
}

function click_ShowSetting() {
  return function () {
    var oDiv;
    var oForm, oItem;
    bAutoRunHold = bAutoRun;
    // stop processing
    if (bAutoRun) StopProcessing();
    // get Names
    getGroupNames();
    // put in group Names
    oForm = document.forms.namedItem('PSNFS-Form1');
    oForm.elements.namedItem('PSNFS-Para-1001').innerHTML = strGroups;
    oForm.elements.namedItem('PSNFS-Para-1003').innerHTML = strGroups;
    PSNFS_log(oForm.elements.namedItem('PSNFS-Para-1001').innerHTML);
    try{
      // plug in saved values;
      for (var i=0;i<5;i++) {
        //PSNFS_log('i = '+i);
          oForm = document.forms.namedItem('PSNFS-Form'+i);
          //PSNFS_log('oForm.length = '+oForm.length);
          for (var j=0; j<oForm.length; j++) {
            //PSNFS_log('j = '+j);
            //PSNFS_log('oForm = '+oForm);
            //PSNFS_log('oForm[j] = '+oForm.elements[j]);
              oItem = oForm.elements[j];
              if (oItem != undefined) {
                if (oItem.type == 'checkbox') {
                  oItem.checked   = aParams[oItem.name.split('-')[2]];
                } else {
                  oItem.value     = aParams[oItem.name.split('-')[2]];
                }
              } else {
                if (oItem.type == 'checkbox') {
                  oItem.checked   = false;
                } else {
                  oItem.value     = 0;
                }
              }
          }
       }
    } catch(err) {
      PSNFS_log('Settings ERROR :'+err.message);
    }

    oDiv = document.getElementById(strPSNFSSettings);
    oDiv.style.display="";
  }
}

// Script Update Update Code
function updateCheck(forced) {
  // Checks once a day (24 h * 60 m * 60 s * 1000 ms) unless forced
  if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) {
    try {
      // read the script page on the USERSCRIPT.ORG web page
      GM_xmlhttpRequest( {
        method: 'GET',
        url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
        headers: {'Cache-Control': 'no-cache'},
        onload: function(resp) {
          var local_version, remote_version, rt, script_name;
          rt = resp.responseText;
          // set the time of the last successful update
          GM_setValue('SUC_last_update', new Date().getTime()+'');
          // get the remote version number and save the scripts name
          //remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
          remote_version=/@version\s*(.*?)\s*$/m.exec(rt)[1];
          script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
          // get the local version number
          //local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
          if(script_version!=-1) {
            // test to see if a new version is available
            if (remote_version != script_version) {
              if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
                if (window.chrome == null) {
                  window.location.href = 'http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js';
                } else {
                  window.open('http://userscripts.org/scripts/show/'+SUC_script_num,'_newtab');
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
      if (forced) alert('An error occurred while checking for updates:\n'+err);
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

/**** Extend Array functions *****/
ArraytoString = function(_aTemp) {
  var tmp, bstart;
  tmp = '{';
  bstart  = false;
  for (var name in _aTemp) {
    if (bstart) tmp += ',';
    bstart = true;
    tmp += "'"+name+"'";
    tmp += ":";
    if (typeof(_aTemp[name])=='string') {
      tmp += "'"+_aTemp[name] +"'"
    } else {
      tmp += _aTemp[name];
    }
  }
  tmp += '}';
  return tmp;
}

function makeElement(type, appendto, attributes, checked, chkdefault) {
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) { element.setAttribute(i, attributes[i]); }
  }
  if (checked != null) {
    if (GM_getValue(checked, chkdefault) == 'checked') { element.setAttribute('checked', 'checked'); }
  }
  if (appendto) { appendto.appendChild(element); }
  return element;
}
